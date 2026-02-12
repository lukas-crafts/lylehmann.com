// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob } from "astro/loaders";

// 3. Define your collection(s)
const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z
    .object({
      publishDate: z.date().optional(),
      title: z.string(),
      excerpt: z.string().optional(),
      image: z.string().optional(),
      ogImage: z.string().optional(),
      cover: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      metadata: z
        .object({
          canonical: z.string().optional(),
        })
        .optional(),
      // Allow for additional fields (e.g., features, stats, steps, faqs, etc.)
    })
    .passthrough(),
});

// 4. Export a single `collections` object to register you collection(s)
export const collections = { projects };
