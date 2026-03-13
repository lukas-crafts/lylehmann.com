import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const metadataDefinition = () =>
  z
    .object({
      title: z.string().optional(),
      ignoreTitleTemplate: z.boolean().optional(),

      canonical: z.string().url().optional(),

      robots: z
        .object({
          index: z.boolean().optional(),
          follow: z.boolean().optional(),
        })
        .optional(),

      description: z.string().optional(),

      openGraph: z
        .object({
          url: z.string().optional(),
          siteName: z.string().optional(),
          images: z
            .array(
              z.object({
                url: z.string(),
                width: z.number().optional(),
                height: z.number().optional(),
              })
            )
            .optional(),
          locale: z.string().optional(),
          type: z.string().optional(),
        })
        .optional(),

      twitter: z
        .object({
          handle: z.string().optional(),
          site: z.string().optional(),
          cardType: z.string().optional(),
        })
        .optional(),
    })
    .optional();

const postCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/data/post' }),
  schema: z.object({
    publishDate: z.date().optional(),
    updateDate: z.date().optional(),
    draft: z.boolean().optional(),

    title: z.string(),
    excerpt: z.string().optional(),
    image: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),

    metadata: metadataDefinition(),
  }),
});

const projectsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/projects' }),
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
    hero: z
      .object({
        title: z.string(),
        subtitle: z.string(),
        image: z.object({
          src: z.string(),
          alt: z.string(),
          width: z.number().optional(),
          height: z.number().optional(),
        }),
      })
      .optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    stats: z.array(z.object({ title: z.string() })).optional(),
    steps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    designElements: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    outcomes: z.array(z.object({ title: z.string() })).optional(),
    insights: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),
    faqs: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  post: postCollection,
  projects: projectsCollection,
};
