import path from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import playformCompress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import type { AstroIntegration } from "astro";
import { defineConfig, fontProviders } from "astro/config";
// import icon from "astro-icon"; // Removed due to compatibility issues
import purgecss from "astro-purgecss";
import robotsTxt from "astro-robots-txt";
import {
  lazyImagesRehypePlugin,
  readingTimeRemarkPlugin,
  responsiveTablesRehypePlugin,
} from "./src/utils/frontmatter";
import astrowind from "./vendor/integration";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (
  items: (() => AstroIntegration) | (() => AstroIntegration)[] = [],
) =>
  hasExternalScripts
    ? Array.isArray(items)
      ? items.map((item) => item())
      : [items()]
    : [];

export default defineConfig({
  build: {
    inlineStylesheets: "never",
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.fontsource(),
    },
  ],
  output: "static",

  site: "https://lylehmann.com",

  trailingSlash: "never",

  integrations: [
    vercel(),
    react({
      include: [
        "**/react/*",
        "**/*.jsx",
        "**/*.tsx",
        "**/components/**/*.tsx",
        "**/components/**/*.jsx",
      ],
    }),
    sitemap({
      // configuration options
    }),
    mdx(),
    // Removed astro-icon due to compatibility issues - using lucide-astro instead
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ["dataLayer.push"] },
      }),
    ),
    astrowind({
      config: "./src/config.yaml",
    }),
    playformCompress({
      CSS: true,
      HTML: true,
      Image: false,
      JavaScript: true,
      SVG: false,
    }),
    robotsTxt(),
    purgecss({
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: [
        "dark",
        "light",
        /^data-/,
        /^astro-/,
        /^transition-/,
        /^swiper/,
        /^radix/,
      ],
      content: [
        process.cwd() + "/src/**/*.{astro,tsx,jsx,ts,js,md,mdx}",
        process.cwd() + "/dist/**/*.html",
      ],
      extractors: [
        {
          extractor: (content: string) => {
            // Enhanced extractor for Tailwind CSS and custom classes
            const matches =
              content.match(/[^<>"'`\s.(){}[\]#:]*[^<>"'`\s.(){}[\]#:]/g) || [];
            // Also extract from class= attributes specifically
            const classMatches =
              content.match(/class(?:Name)?=["']([^"']*)["']/g) || [];
            const classContent = classMatches
              .map((match: string) =>
                match.replace(/class(?:Name)?=["']([^"']*)["']/, "$1"),
              )
              .join(" ");
            const classTokens = classContent.split(/\s+/).filter(Boolean);
            return [...matches, ...classTokens];
          },
          extensions: ["astro", "html", "tsx", "jsx"],
        },
      ],
    }),
  ],

  image: {
    remotePatterns: [{ hostname: "cdn.pixabay.com" }, { hostname: "images.pexels.com" }],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "astrowind:config": path.resolve(
          __dirname,
          "src/generated/astrowind-config.ts",
        ),
      },
    },
    esbuild: {
      target: "es2022",
      tsconfigRaw: {
        compilerOptions: {
          useDefineForClassFields: false,
        },
      },
    },
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      exclude: ["@tailwindcss/vite", "lightningcss", "sharp"],
    },
    build: {
      target: "es2022",
      rollupOptions: {
        external: ["node:child_process", "node:fs", "node:path", "node:url"],
        output: {
          assetFileNames: (assetInfo) => {
            let name = assetInfo.originalFileName || assetInfo.name || "";
            // Remove path from name if it exists to avoid nested assets/src/...
            const basename = name.split('/').pop() || name;
            return `assets/${basename.toLowerCase()}`;
          },
          chunkFileNames: (chunkInfo) => {
            return `assets/${chunkInfo.name.toLowerCase()}.[hash].js`;
          },
          entryFileNames: (chunkInfo) => {
            return `assets/${chunkInfo.name.toLowerCase()}.[hash].js`;
          },
        },
      },
    },
  },
});
