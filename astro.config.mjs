import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import sentry from "@sentry/astro";

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  site: "https://accessible-astro-starter.incluud.dev",
  integrations: [
    mdx(),
    icon(),
    compress(),
    sentry({
      dsn: "https://8b57e87cb872bb5986980f35e78830e1@o4509649548935168.ingest.de.sentry.io/4509649551097936",
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      sendDefaultPii: true,
      sourceMapsUploadOptions: {
        project: "javascript-astro",
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
    tailwind(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          logger: {
            warn: () => {},
          },
        },
      },
    },
    resolve: {
      alias: {
        "@components": fileURLToPath(
          new URL("./src/components", import.meta.url),
        ),
        "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
        "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
        "@content": fileURLToPath(new URL("./src/content", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@public": fileURLToPath(new URL("./public", import.meta.url)),
        "@post-images": fileURLToPath(
          new URL("./public/posts", import.meta.url),
        ),
        "@project-images": fileURLToPath(
          new URL("./public/projects", import.meta.url),
        ),
      },
    },
    server: {
      headers: {
        "Document-Policy": "js-profiling",
      },
    },
  },
});
