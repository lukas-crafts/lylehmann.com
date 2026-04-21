# AGENTS.md

## Quick Commands

```bash
bun run dev      # Dev server (localhost:4321)
bun run build    # Production build
bun run check   # Full check: astro check && biome check && vitest run
bun run fix     # Auto-fix lint: biome check --write
bun run test    # Run tests once
```

## Key Facts

- **Runtime**: Bun (not npm/pnpm), Node 22.x
- **Framework**: Astro 6 + Vite + Tailwind CSS 4 + Preact
- **Path alias**: `~/*` → `./src/*`
- **Checker**: Biome (NOT ESLint/Prettier)
- **Testing**: Vitest
- **Adapter**: Vercel (server-side rendering with static fallback)
- **Output mode**: `server` (not static)

## Run Single Test

```bash
bun test -- <pattern>   # e.g., bun test -- Header
```

## Accessibility First

This is an accessibility-focused starter (WCAG guidelines). Always prioritize semantic HTML and ARIA compliance.