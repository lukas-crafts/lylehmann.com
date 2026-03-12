#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

echo "🚀 Normalizing Azulverdoso image filenames and imports"

BACKUP_DIR="/tmp/azul_backup_$(date +%Y%m%d%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup any matching files (no-op if none)
cp -v public/assets/images/Azulverdoso* "$BACKUP_DIR/" 2>/dev/null || true
cp -v src/assets/images/Azulverdoso* "$BACKUP_DIR/" 2>/dev/null || true

# Ensure git treats case changes
git config core.ignorecase false || true

# Remove tracked capitalized variants from the index (ignore if not present)
git rm --cached --ignore-unmatch src/assets/images/Azulverdoso-blog-hero.png 2>/dev/null || true
git rm --cached --ignore-unmatch src/assets/images/Azulverdoso-home-hero.png 2>/dev/null || true
git rm --cached --ignore-unmatch public/assets/images/Azulverdoso-blog-hero.png 2>/dev/null || true
git rm --cached --ignore-unmatch public/assets/images/Azulverdoso-home-hero.png 2>/dev/null || true

# Delete untracked capitalized files from working tree (keep lowercase)
rm -f public/assets/images/Azulverdoso-blog-hero.png || true
rm -f src/assets/images/Azulverdoso-blog-hero.png || true
rm -f public/assets/images/Azulverdoso-home-hero.png || true
rm -f src/assets/images/Azulverdoso-home-hero.png || true
rm -f src/assets/images/Azulverdoso-blog-hero.* 2>/dev/null || true
rm -f src/assets/images/Azulverdoso-home-hero.* 2>/dev/null || true

# Restore canonical lowercase files from backup if missing
[ -f src/assets/images/azulverdoso-blog-hero.png ] || \
  ( [ -f "$BACKUP_DIR/Azulverdoso-blog-hero.png" ] && mv -v "$BACKUP_DIR/Azulverdoso-blog-hero.png" src/assets/images/ )
[ -f src/assets/images/azulverdoso-home-hero.png ] || \
  ( [ -f "$BACKUP_DIR/Azulverdoso-home-hero.png" ] && mv -v "$BACKUP_DIR/Azulverdoso-home-hero.png" src/assets/images/ )
[ -f public/assets/images/azulverdoso-blog-hero.png ] || \
  ( [ -f "$BACKUP_DIR/Azulverdoso-blog-hero.png" ] && cp -v src/assets/images/azulverdoso-blog-hero.png public/assets/images/ || true )
[ -f public/assets/images/azulverdoso-home-hero.png ] || \
  ( [ -f "$BACKUP_DIR/Azulverdoso-home-hero.png" ] && cp -v src/assets/images/azulverdoso-home-hero.png public/assets/images/ || true )

# Normalize imports in MDX/Markdown (replace Azulverdoso- -> azulverdoso-)
perl -pi -e 's/Azulverdoso-/azulverdoso-/g' src/content/**/*.mdx src/content/**/*.md 2>/dev/null || true

# Add canonical files if present
git add -A src/assets/images/azulverdoso* public/assets/images/azulverdoso* || true

# Commit only if there are changes
if ! git diff --staged --quiet; then
  git commit -m "chore: normalize Azulverdoso image filenames and imports (lowercase)"
  git push
else
  echo "No tracked changes to commit (index clean)."
fi

# Force a rebuild on remote by pushing an empty commit
git commit --allow-empty -m "rebuild: force Vercel cache clear"
git push

# restore git case behavior
git config --unset core.ignorecase || true

echo "✨ Done. Trigger a Vercel redeploy (or redeploy with cleared cache in the dashboard) and check logs."