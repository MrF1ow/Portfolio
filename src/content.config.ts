import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const stories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/stories" }),
  schema: z.object({
    label: z.string(),
    heading: z.string(),
    order: z.number(),
    blurb: z.string(),
    art: z.string(),
  }),
});

export const collections = { stories };
