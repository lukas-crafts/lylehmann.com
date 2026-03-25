import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs";

export default defineConfig({
  srcDir: "./src",
  publicDir: "./public",
  outDir: "./dist",

  site: "https://lylehmann.com",

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

  integrations: [sitemap(), mdx({ remarkPlugins: [remarkReadingTime()] })],

  vite: {
    plugins: [tailwind()],
  },
});
