import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
} from "@shikijs/transformers";
import tailwind from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { remarkReadingTime } from "./src/utils/remark-reading-time";

export default defineConfig({
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",
  output: "server",
  adapter: vercel({
    staticHeaders: true,
  }),
  prefetch: true,
  experimental: {
    contentIntellisense: true,
  },

  site: "https://lylehmann.com",
  image: {
    remotePatterns: [],
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-inter",
      weights: ["400 900"],
    },
    {
      provider: fontProviders.google(),
      name: "Outfit",
      cssVariable: "--font-outfit",
      weights: ["400 900"],
    },
  ],

  integrations: [
    sitemap(),
    mdx({ remarkPlugins: [remarkReadingTime] }),
    preact({ compat: true }),
  ],

  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      transformers: [
        transformerNotationDiff(),
        transformerNotationErrorLevel(),
        transformerNotationFocus(),
        transformerNotationHighlight(),
      ],
    },
  },

  vite: {
    plugins: [tailwind()],
    resolve: {
      alias: {
        fs: "node:fs",
        "fs/promises": "node:fs/promises",
        path: "node:path",
        url: "node:url",
        os: "node:os",
        stream: "node:stream",
        child_process: "node:child_process",
        constants: "node:constants",
        events: "node:events",
        util: "node:util",
        crypto: "node:crypto",
        module: "node:module",
        assert: "node:assert",
        tty: "node:tty",
        worker_threads: "node:worker_threads",
        string_decoder: "node:string_decoder",
      },
    },
    build: {
      rollupOptions: {
        external: [
          "fs",
          "fs/promises",
          "path",
          "url",
          "os",
          "stream",
          "child_process",
          "constants",
          "events",
          "util",
          "crypto",
          "module",
          "assert",
          "tty",
          "worker_threads",
          "string_decoder",
          "node:fs",
          "node:fs/promises",
          "node:path",
          "node:url",
          "node:stream",
          "node:child_process",
          "node:os",
          "node:constants",
          "node:events",
          "node:util",
          "node:crypto",
          "node:module",
          "node:assert",
          "node:tty",
          "node:worker_threads",
          "node:string_decoder",
        ],
        onwarn(warning, warn) {
          // Silence known internal Astro 6.x / Vite unused import warnings
          if (
            warning.code === "UNUSED_EXTERNAL_IMPORT" &&
            warning.message.includes("matchHostname")
          ) {
            return;
          }

          warn(warning);
        },
      },
    },
  },
});
