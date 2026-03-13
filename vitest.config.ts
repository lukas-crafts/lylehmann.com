/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    reporters: [["junit", { outputFile: "./junit.xml" }]],
  },
  cacheDir: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./.cache/vitest"),
  resolve: {
    alias: {
      "astro:assets": fileURLToPath(new URL("./src/mocks/astro-assets.ts", import.meta.url)),
    },
  },
});
