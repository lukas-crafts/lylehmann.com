# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `pnpm dev` or `pnpm start` - Start development server at `localhost:4321`
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally

### Code Quality
- `pnpm check` - Run all checks (Astro + Biome)
- `pnpm check:astro` - Run Astro type checking
- `pnpm check:biome` - Run Biome linting/formatting checks
- `pnpm fix` or `pnpm fix:biome` - Auto-fix Biome issues

### Testing
- `pnpm test` - Run tests with Vitest
- `pnpm test:ui` - Run tests with Vitest UI
- `pnpm coverage` - Generate test coverage report

## Architecture

### Project Structure
- **Astro 5.11+** - Modern static site generator with SSR capabilities
- **TypeScript** - Strict type checking with path aliases
- **Tailwind CSS 4** - Utility-first CSS framework with custom design tokens
- **React 19** - For interactive components (TSX files)
- **Radix UI** - Accessible component primitives (`@radix-ui/themes`)
- **Biome** - Fast formatter and linter (replacing ESLint/Prettier)
- **Vitest** - Test runner with jsdom environment
- **MDX** - Markdown with React components support
- **Lucide** - Icon set via `lucide-astro` and `lucide-react`
- **Sentry** - Error tracking and performance monitoring

### Key Directories
- `src/components/` - Reusable Astro/React components organized by type
  - `blog/` - Blog-specific components
  - `common/` - Shared utility components
  - `ui/` - UI building blocks
  - `widgets/` - Page section components
- `src/pages/` - File-based routing (Astro, MDX, Markdown)
- `src/layouts/` - Page layout templates
- `src/content/` - Content collections
- `src/data/` - Static data and case studies
- `src/utils/` - Utility functions and helpers
- `src/assets/` - Static assets (images, styles, fonts)

### Configuration Files
- `astro.config.mjs` - Astro configuration with integrations (React, MDX, Sitemap, RSS, Tailwind)
- `tailwind.config.ts` - Tailwind CSS configuration with custom design tokens and dark mode
- `tsconfig.json` - TypeScript configuration with path aliases
- `biome.json` - Biome formatter and linter configuration
- `vitest.config.ts` - Test configuration with jsdom environment
- `src/config.yaml` - Site-wide configuration (metadata, blog settings, analytics)
- `src/content.config.mjs` - Content collections schema (projects/blog posts)
- `src/navigation.ts` - Site navigation structure (header, footer, social links)
- `sentry.config.ts` - Sentry error tracking configuration
- `vendor/` - AstroWind integration utilities (future template update system)

## Development Guidelines

### Styling
- Use Tailwind CSS 4 with custom CSS variables for theming
- Design tokens defined in CSS variables (`--aw-color-*` for colors, `--aw-font-*` for fonts)
- Custom Tailwind plugin for `intersect` variant
- Dark mode via `class` strategy (system preference detection)
- Responsive design with mobile-first approach
- Accessibility-first styling with WCAG compliance focus

### Components
- Astro components (`.astro`) for static/server-rendered content
- React components (`.tsx`) for interactive client-side features
- Radix UI for accessible component primitives
- Lucide icons via `lucide-astro` (Astro) and `lucide-react` (React)
- Follow existing widget/component organization patterns

### Content & Blog System
- Portfolio/blog system configured via `src/config.yaml`
- Content collections use Astro's loader system (glob-based)
- Projects/posts use MDX format with comprehensive frontmatter schema
- Blog configured as "portfolio" (`/portfolio` path)
- Permalinks: `/portfolio/%slug%` for posts
- Related posts: 4 posts shown, 6 posts per page
- Navigation structure centralized in `src/navigation.ts`

### Path Aliases
- `~/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`
- `astrowind:config` → `src/generated/astrowind-config.ts` (generated config)

### Testing & QA
- Test files in `src/components/__tests__/`
- Global test setup in `vitest.setup.ts`
- JSDOM environment for component testing
- JUnit reporting to `./junit.xml`
- Always run `pnpm check` before committing

### Code Quality
- **Biome** for formatting and linting (not ESLint/Prettier)
- Use `pnpm check:biome` to validate
- Use `pnpm fix:biome` to auto-fix issues
- TypeScript strict mode with nullChecks enabled
- Accessibility focus throughout the codebase

## Important Architecture Notes

### AstroWind Template
This project is based on the AstroWind template with customizations:
- Template utilities in `vendor/` directory (future integration system)
- Generated config via `src/generated/astrowind-config.ts`
- Custom navigation and site structure
- Portfolio-focused rather than general blog

### Content Organization
- Blog posts are called "projects" and use the "portfolio" path
- All posts are MDX files in `src/content/projects/`
- Content schema uses `.passthrough()` to allow flexible frontmatter fields
- Images optimized via Astro's built-in optimization

### Accessibility Features
- Built with WCAG compliance in mind
- Uses Atkinson Hyperlegible font for readability (if configured)
- Accessible components from `accessible-astro-components`
- Color contrast system with CSS variables
- Prefers-reduced-motion support
