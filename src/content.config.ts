import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const fieldNotes = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/field-notes"
  }),

  schema: z.object({
    title: z.string(),

    description: z.string(),

    published: z.coerce.date(),

    category: z.enum([
      "Ecosystems & Community",
      "Trade Shows",
      "Hardware & Manufacturing"
    ]),

    categorySlug: z.enum([
      "ecosystem",
      "tradeshows",
      "hardware"
    ]),

    featured: z.boolean().default(false),

    draft: z.boolean().default(false),

    author: z
      .string()
      .default("Nadim Abdel Meguid")
  })
});

export const collections = {
  fieldNotes
};
