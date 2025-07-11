import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';

import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

import playformCompress from '@playform/compress';

import robotsTxt from 'astro-robots-txt';

import purgecss from 'astro-purgecss';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  build: {
    inlineStylesheets: 'never',
  },
  output: 'static',

  site: 'https://lylehmann.com',

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      // configuration options
    }),
    mdx(),
    icon({
      include: {
        tabler: ['*'],
        'flat-color-icons': [
          'template',
          'gallery',
          'approval',
          'document',
          'advertising',
          'currency-exchange',
          'voice-presentation',
          'business-contact',
          'database',
        ],
      },
    }),
    ...whenExternalScripts(() =>
      partytown({
        config: { forward: ['dataLayer.push'] },
      })
    ),
    compress({
      CSS: true,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false,
        },
      },
      Image: false,
      JavaScript: true,
      SVG: false,
      Logger: 1,
    }),
    astrowind({
      config: './src/config.yaml',
    }),
    playformCompress(),
    robotsTxt(),
    purgecss({
      fontFace: true,
      keyframes: true,
      variables: true,
      safelist: ['random', 'yep', 'button', /^nav/],
      blocklist: ['usedClass', /^nav/],
      content: [
        process.cwd() + '/src/**/*.{astro,vue}', // Watching astro and vue sources
        process.cwd() + '/dist/**/*.html', // Include all HTML files in dist directory
        process.cwd() + '/dist/*.html',    // Include root HTML files like 404.html
      ],
      // Custom options to handle special files like 404.html
      options: {
        // Skip purging the 404.html file to avoid errors
        skippedFiles: ['404.html'],
        // Disable looking for files in directories that don't exist
        rejected: false,
        // Only process files that actually exist
        dynamicAttributes: ['data-processed'],
        // Force the inclusion of 404.html in special handling
        variables: {
          specialPages: ['404.html']
        }
      },
      extractors: [
        {
          // Example using a taiwindcss compatible class extractor
          extractor: (content) => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
          extensions: ['astro', 'html'],
        },
      ],
    }),
  ],

  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
