#!/bin/bash

echo "Step 1: Guaranteeing .cache and WARP.md are ignored by Biome..."
grep -qxF '.cache' .gitignore || echo '.cache' >> .gitignore
grep -qxF 'WARP.md' .gitignore || echo 'WARP.md' >> .gitignore

echo "Step 2: Checking vitest mock config..."
if [ ! -f "src/mocks/astro-assets.ts" ]; then
  mkdir -p src/mocks
  echo 'export const Image = () => "";' > src/mocks/astro-assets.ts
  echo 'export const getImage = () => "";' >> src/mocks/astro-assets.ts
fi

echo "Step 3: Running final checks (Astro, Biome, Vitest)..."
bun check

if [ $? -eq 0 ]; then
  echo "✅ SUCCESS: All errors and linting warnings are 100% resolved."
else
  echo "❌ FAILED: There are still errors."
fi
