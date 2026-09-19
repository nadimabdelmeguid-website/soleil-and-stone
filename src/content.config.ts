import {
  defineCollection
} from "astro:content";

import {
  glob
} from "astro/loaders";

import {
  z
} from "astro/zod";


const fieldNotes =
  defineCollection({

    loader:
      glob({
        pattern:
          "**/*.md",

        base:
          "./src/content/cms-field-notes"
      }),

    schema:
      z.object({

        title:
          z.string(),

        description:
          z.string(),

        published:
          z.coerce.date(),

        category:
          z.string(),

        categorySlug:
          z.string(),

        featured:
          z.boolean()
            .default(false),

        draft:
          z.boolean()
            .default(false),

        author:
          z.string()
            .default(
              "Nadim Abdel Meguid"
            ),

        readingMinutes:
          z.number()
            .int()
            .positive()
            .optional(),

        heroImage:
          z.string()
            .default(""),

        legacyUrl:
          z.string()
            .default(""),

        relatedEvents:
          z.array(
            z.string()
          )
            .default([])

      })

  });


const eventRecaps =
  defineCollection({

    loader:
      glob({
        pattern:
          "**/*.md",

        base:
          "./src/content/cms-event-recaps"
      }),

    schema:
      z.object({

        title:
          z.string(),

        eventId:
          z.string(),

        eyebrow:
          z.string()
            .default(
              "Event Recap"
            ),

        published:
          z.coerce.date(),

        excerpt:
          z.string(),

        readingMinutes:
          z.number()
            .int()
            .positive()
            .default(1),

        tags:
          z.array(
            z.string()
          )
            .default([]),

        stats:
          z.array(
            z.object({
              value:
                z.string(),

              label:
                z.string()
            })
          )
            .default([]),

        photoCredit:
          z.object({
            label:
              z.string()
                .optional(),

            name:
              z.string(),

            url:
              z.string()
                .optional()
          })
            .nullable()
            .optional(),

        heroImage:
          z.string()
            .default(""),

        seoTitle:
          z.string()
            .default(""),

        seoDescription:
          z.string()
            .default(""),

        draft:
          z.boolean()
            .default(false)

      })

  });


export const collections = {
  fieldNotes,
  eventRecaps
};
