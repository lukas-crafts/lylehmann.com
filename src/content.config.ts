import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

// Reusable schemas for case study sections
const statSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
});

const itemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

const metadataSchema = z.object({
  title: z.string().optional(),
  ignoreTitleTemplate: z.boolean().optional(),
  canonical: z.string().optional(),
  robots: z.object({
    index: z.boolean().optional(),
    follow: z.boolean().optional(),
  }).optional(),
  description: z.string().optional(),
  openGraph: z.object({
    url: z.string().optional(),
    siteName: z.string().optional(),
    images: z.array(z.object({
      url: z.string(),
      width: z.number().optional(),
      height: z.number().optional(),
    })).optional(),
    locale: z.string().optional(),
    type: z.string().optional(),
  }).optional(),
  twitter: z.object({
    handle: z.string().optional(),
    site: z.string().optional(),
    cardType: z.string().optional(),
  }).optional(),
}).optional();

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    // Core Metadata
    title: z.string().min(1),
    description: z.string().min(1),
    publishDate: z.coerce.date(),
    image: image().optional(),
    cover: image().optional(),
    ogImage: image().optional(),
    tags: z.array(z.string()).default([]),
    category: z.string().optional(),
    draft: z.boolean().default(false),
    
    // Project Specifics
    role: z.string().optional(),
    team: z.string().optional(),
    duration: z.string().optional(),
    tools: z.array(z.string()).default([]),
    
    // Structured Case Study Blocks (Frontmatter-driven)
    stats: z.array(statSchema).optional(),
    features: z.array(itemSchema).optional(),
    steps: z.array(itemSchema).optional(),
    designElements: z.array(itemSchema).optional(),
    outcomes: z.array(z.object({ title: z.string() })).optional(),
    insights: z.array(itemSchema).optional(),
    faqs: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    
    // SEO
    metadata: metadataSchema,
  }),
});

export const collections = {
  portfolio,
};
