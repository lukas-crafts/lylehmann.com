# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server at `localhost:4321`
- `npm run start` - Alternative to `npm run dev`
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality
- `npm run check` - Run all checks (Astro, ESLint, Prettier)
- `npm run check:astro` - Run Astro type checking
- `npm run check:eslint` - Run ESLint linting
- `npm run check:prettier` - Check Prettier formatting
- `npm run fix` - Auto-fix ESLint and Prettier issues
- `npm run fix:eslint` - Auto-fix ESLint issues
- `npm run fix:prettier` - Auto-fix Prettier formatting

### Testing
- `npm run test` - Run tests with Vitest
- `npm run test:ui` - Run tests with Vitest UI
- `npm run coverage` - Generate test coverage report

## Architecture

### Project Structure
- **Astro 5.2.5+** - Modern static site generator with SSR capabilities
- **TypeScript** - Strict type checking with path aliases (`~/*` → `src/*`)
- **Tailwind CSS 4** - Utility-first CSS framework with custom design tokens
- **React** - For interactive components (TSX files)
- **Vitest** - Test runner with jsdom environment
- **MDX** - Markdown with React components support

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
- `astro.config.ts` - Astro configuration with integrations
- `tailwind.config.js` - Tailwind CSS configuration with custom design tokens
- `tsconfig.json` - TypeScript configuration with path aliases
- `vitest.config.ts` - Test configuration
- `.eslintrc.js` - ESLint with accessibility-focused rules
- `src/config.yaml` - Site configuration

## Development Guidelines

### Styling
- Use Tailwind CSS with custom CSS variables for colors
- Design tokens defined in CSS variables (`--aw-color-*`)
- Responsive design with mobile-first approach
- Accessibility-first styling with WCAG compliance

### Components
- Astro components use `.astro` extension
- React components use `.tsx` extension
- Follow existing component patterns in respective directories
- Use TypeScript for all components

### Content
- Blog posts and case studies in MDX format
- Content collections managed through `src/content/config.ts`
- Static data in `src/data/` directory
- Images optimized through Astro's image optimization

### Path Aliases
- `~/*` maps to `src/*`
- `@components` maps to `src/components`
- `@layouts` maps to `src/layouts`
- `@assets` maps to `src/assets`

### Testing & QA
- Test files in `src/components/__tests__/`
- Global test setup in `vitest.setup.ts`
- JSDOM environment for component testing
- JUnit reporting enabled

### Code Quality & Standards
- ESLint with Astro and accessibility plugins
- Prettier for consistent formatting
- TypeScript strict mode enabled
- Accessibility linting with jsx-a11y-strict rules
