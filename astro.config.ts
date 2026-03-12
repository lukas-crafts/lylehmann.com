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
import { defineConfig } from "astro/config";
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
        "@astrolib/seo": path.resolve(__dirname, "deps/@astrolib/seo"),
        "lodash.merge": path.resolve(__dirname, "deps/lodash.merge"),
        "html-escaper": path.resolve(__dirname, "deps/html-escaper"),
        "@astrojs/vercel": path.resolve(__dirname, "deps/@astrojs/vercel"),
        "@astrojs/mdx": path.resolve(__dirname, "deps/integration-shim.ts"),
        "@astrojs/sitemap": path.resolve(__dirname, "deps/integration-shim.ts"),
        "@astrojs/partytown": path.resolve(__dirname, "deps/integration-shim.ts"),
        "@astrojs/react": path.resolve(__dirname, "deps/integration-shim.ts"),
        "@playform/compress": path.resolve(__dirname, "deps/integration-shim.ts"),
        "@tailwindcss/vite": path.resolve(__dirname, "deps/integration-shim.ts"),
        "astro-purgecss": path.resolve(__dirname, "deps/integration-shim.ts"),
        "astro-robots-txt": path.resolve(__dirname, "deps/integration-shim.ts"),
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
    build: {
      target: "es2022",
    },
    plugins: [
      tailwindcss(),
    ],
  },
});
