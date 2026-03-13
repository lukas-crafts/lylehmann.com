# Project Overview: lylehmann.com

This is a personal website and portfolio built with **Astro 6.x**, utilizing the **AstroWind** template with a strong focus on **accessibility** and performance. It serves as a modern, SEO-friendly, and highly customizable starter for building personal brands or content-heavy sites.

## Tech Stack
- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Content:** Markdown & MDX with Content Collections
- **Icons:** Lucide Icons via `astro-icon` and `lucide-astro`
- **Testing:** [Vitest](https://vitest.dev/)
- **Linting/Formatting:** ESLint, Prettier, and [Biome](https://biomejs.dev/)
- **Monitoring:** Sentry

## Directory Structure
- `src/pages/`: File-based routing for the website.
- `src/components/`: Reusable Astro and UI components.
- `src/layouts/`: Base and page-specific layouts.
- `src/content/`: Managed content collections (blog posts, portfolio items, etc.).
- `src/assets/`: Static assets like images and global styles.
- `src/utils/`: Helper functions and logic.
- `vendor/`: Local integrations (e.g., `astrowind`).

## Building and Running

| Command | Action |
| :--- | :--- |
| `bun install` | Install project dependencies |
| `bun dev` | Start the development server at `localhost:4321` |
| `bun build` | Build the production site to `dist/` |
| `bun preview` | Preview the production build locally |
| `bun check` | Run type-checking, linting, and formatting checks |
| `bun fix` | Automatically fix linting and formatting issues |
| `bun test` | Run tests via Vitest |

## Development Conventions
- **Accessibility (a11y):** All UI components should adhere to WCAG AA standards. Use semantic HTML and appropriate ARIA roles.
- **Path Aliases:** Use the `~` alias to refer to the `src/` directory (e.g., `import Component from '~/components/Component.astro'`).
- **Styling:** Prefer Tailwind utility classes. Global styles are managed in `src/assets/styles/`.
- **Content:** Use Content Collections in `src/content/` for structured data.
- **Icons:** Use `astro-icon` for consistent icon rendering.
- **Performance:** Optimize images using Astro's built-in `<Image />` component and avoid heavy client-side JavaScript where possible.
