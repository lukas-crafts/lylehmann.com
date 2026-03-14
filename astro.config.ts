import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  srcDir: './src',
  publicDir: './public',
  outDir: './dist',
  
  site: 'https://lylehmann.com',
  
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['400 900'],
    },
    {
      provider: fontProviders.google(),
      name: 'Outfit',
      cssVariable: '--font-outfit',
      weights: ['400 900'],
    },
  ],
  
  integrations: [
    sitemap(),
    mdx(),
  ],
  
  vite: {
    plugins: [tailwind()],
  },
});
