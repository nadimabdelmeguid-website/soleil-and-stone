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
          "./src/content/field-notes"
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
          z.enum([
            "Ecosystems & Community",
            "Trade Shows",
            "Hardware & Manufacturing"
          ]),

        categorySlug:
          z.enum([
            "ecosystem",
            "tradeshows",
            "hardware"
          ]),

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

        /*
         * Optional connection between a
         * Field Note and one or more events.
         *
         * Use event IDs from events.ts.
         */
        relatedEvents:
          z.array(
            z.string()
          )
            .default([])

      })

  });


export const collections = {
  fieldNotes
};
