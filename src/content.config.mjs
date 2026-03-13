import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.string().optional(),
    cover: z.string().optional(),
    ogImage: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    hero: z.object({
      title: z.string(),
      subtitle: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
        width: z.number().optional(),
        height: z.number().optional()
      })
    }).optional(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional(),
    stats: z.array(z.object({ title: z.string() })).optional(),
    steps: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional(),
    designElements: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional(),
    outcomes: z.array(z.object({ title: z.string() })).optional(),
    insights: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string()
    })).optional(),
    faqs: z.array(z.object({
      title: z.string(),
      description: z.string()
    })).optional()
  })
});

export const collections = { projects };
