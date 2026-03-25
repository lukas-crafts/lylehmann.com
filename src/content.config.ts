import { defineCollection, type SchemaContext } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Reusable schema factories
const createStatSchema = () =>
  z.object({
    title: z.string().min(1).describe("The main title of the statistic"),
    subtitle: z
      .string()
      .optional()
      .describe("A secondary description or unit for the statistic"),
  });

const createItemSchema = () =>
  z.object({
    title: z.string().min(1).describe("The title of the item"),
    description: z
      .string()
      .min(1)
      .describe("A detailed description of the item"),
    icon: z
      .string()
      .optional()
      .describe("The name of the Lucide icon to display"),
  });

const createMetadataSchema = () =>
  z
    .object({
      title: z
        .string()
        .max(60)
        .optional()
        .describe("The SEO title for the page (optimal: 50-60 characters)"),
      ignoreTitleTemplate: z
        .boolean()
        .optional()
        .describe("If true, the global title template will be ignored"),
      canonical: z
        .string()
        .optional()
        .describe("The canonical URL for this page"),
      robots: z
        .object({
          index: z
            .boolean()
            .optional()
            .describe("Whether robots should index this page"),
          follow: z
            .boolean()
            .optional()
            .describe("Whether robots should follow links on this page"),
        })
        .optional()
        .describe("Robots meta tag configuration"),
      description: z
        .string()
        .max(160)
        .optional()
        .describe("The meta description for SEO (optimal: 120-160 characters)"),
      openGraph: z
        .object({
          url: z.string().optional().describe("The Open Graph URL"),
          siteName: z
            .string()
            .optional()
            .describe("The name of the site for Open Graph"),
          images: z
            .array(
              z.object({
                url: z.string().describe("The URL of the Open Graph image"),
                width: z.number().optional().describe("The width of the image"),
                height: z
                  .number()
                  .optional()
                  .describe("The height of the image"),
              }),
            )
            .optional()
            .describe("Images to be used in Open Graph"),
          locale: z.string().optional().describe("The locale for Open Graph"),
          type: z
            .string()
            .optional()
            .describe("The type of content (e.g., website, article)"),
        })
        .optional()
        .describe("Open Graph metadata configuration"),
      twitter: z
        .object({
          handle: z
            .string()
            .optional()
            .describe("Twitter handle of the content creator"),
          site: z.string().optional().describe("Twitter handle for the site"),
          cardType: z
            .string()
            .optional()
            .describe("The type of Twitter card to display"),
        })
        .optional()
        .describe("Twitter metadata configuration"),
    })
    .optional();

const portfolio = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/portfolio",
  }),
  schema: ({ image }: SchemaContext) =>
    z.object({
      // Core Metadata
      title: z
        .string()
        .min(1)
        .max(100)
        .describe("The main title of the portfolio item"),
      description: z
        .string()
        .min(1)
        .max(200)
        .describe("A short summary of the project (visible on project cards)"),
      excerpt: z
        .string()
        .max(300)
        .optional()
        .describe("An optional shorter summary for project cards"),
      date: z.coerce
        .date()
        .describe("The date this project was published or completed"),
      image: image()
        .optional()
        .describe("The main representative image for the project"),
      imageAlt: z
        .string()
        .optional()
        .describe(
          "Descriptive alternative text for the main representative image",
        ),
      cover: image()
        .optional()
        .describe("The background cover image for the case study header"),
      coverAlt: z
        .string()
        .optional()
        .describe(
          "Descriptive alternative text for the background cover image",
        ),
      ogImage: image()
        .optional()
        .describe("Custom Open Graph image for social sharing"),
      tags: z
        .array(z.string())
        .default([])
        .describe("List of tags associated with the project"),
      category: z
        .string()
        .optional()
        .describe(
          "The broad category of the project (e.g., Development, Design)",
        ),
      draft: z
        .boolean()
        .default(false)
        .describe("If true, this project will not be visible in production"),

      // Project Specifics
      role: z
        .string()
        .optional()
        .describe("The role you played in the project"),
      team: z
        .string()
        .optional()
        .describe("Summary of the team members involved"),
      duration: z
        .string()
        .optional()
        .describe("How long the project took to complete"),
      tools: z
        .array(z.string())
        .default([])
        .describe("Technologies and tools used"),

      // Structured Case Study Blocks (Frontmatter-driven)
      stats: z
        .array(createStatSchema())
        .optional()
        .describe("Key metrics or data points"),
      features: z
        .array(createItemSchema())
        .optional()
        .describe("Main features implemented"),
      steps: z
        .array(createItemSchema())
        .optional()
        .describe("Process steps or project phases"),
      designElements: z
        .array(createItemSchema())
        .optional()
        .describe("UI/UX design considerations"),
      outcomes: z
        .array(z.object({ title: z.string() }))
        .optional()
        .describe("The final results achieved"),
      insights: z
        .array(createItemSchema())
        .optional()
        .describe("Lessons learned and project insights"),
      faqs: z
        .array(z.object({ title: z.string(), description: z.string() }))
        .optional()
        .describe("Frequently asked questions about the project"),

      // SEO
      metadata: createMetadataSchema().describe(
        "SEO metadata for the portfolio item",
      ),
    }),
});

export const collections = {
  portfolio,
};
