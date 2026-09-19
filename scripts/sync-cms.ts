import fs from "node:fs/promises";
import path from "node:path";

const SUPABASE_URL =
  process.env.PUBLIC_SUPABASE_URL?.trim() ||
  "https://szdhkttphzvtmljuhcqs.supabase.co";

const SUPABASE_KEY =
  process.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
  "sb_publishable_iN7aDql5whleXHRCRVNS-w_Awl-iQez";

const DATA_DIR =
  path.resolve("src/data");

const FIELD_NOTES_DIR =
  path.resolve("src/content/cms-field-notes");

const EVENT_RECAPS_DIR =
  path.resolve("src/content/cms-event-recaps");


async function supabaseFetch(
  resource: string,
  query = ""
) {
  const url =
    `${SUPABASE_URL}/rest/v1/${resource}${query ? `?${query}` : ""}`;

  const response =
    await fetch(
      url,
      {
        headers: {
          apikey:
            SUPABASE_KEY,

          Authorization:
            `Bearer ${SUPABASE_KEY}`,

          Accept:
            "application/json"
        }
      }
    );

  if (!response.ok) {
    throw new Error(
      `Supabase ${resource} failed: ${response.status} ${await response.text()}`
    );
  }

  return response.json();
}


function jsonModule(
  prelude: string,
  exportName: string,
  value: unknown,
  typeName?: string
) {
  const typeSuffix =
    typeName
      ? `: ${typeName}`
      : "";

  return `${prelude}

export const ${exportName}${typeSuffix} =
  ${JSON.stringify(value, null, 2)};
`;
}


function yamlString(
  value: unknown
) {
  return JSON.stringify(
    value == null
      ? ""
      : String(value)
  );
}


function dateOnly(
  value: unknown
) {
  if (!value) {
    return "";
  }

  return String(value)
    .slice(0, 10);
}


function categorySlug(
  category: string
) {
  const known: Record<string, string> = {
    "Ecosystems & Community":
      "ecosystem",

    "Hardware & Product Development":
      "hardware",

    "Commercialization & Manufacturing":
      "commercialization",

    "Fieldwork & Trade Shows":
      "tradeshows",

    "Startups & Entrepreneurship":
      "startups",

    "Technology & Innovation":
      "technology",

    "Hardware & Manufacturing":
      "hardware",

    "Trade Shows":
      "tradeshows"
  };

  return (
    known[category] ||
    category
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}


function stringList(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (
        item &&
        typeof item === "object" &&
        "name" in item
      ) {
        return String(
          (item as any).name || ""
        ).trim();
      }

      return "";
    })
    .filter(Boolean);
}


function focusList(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item.trim();
      }

      if (
        item &&
        typeof item === "object"
      ) {
        const title =
          String(
            (item as any).title || ""
          ).trim();

        const text =
          String(
            (item as any).text || ""
          ).trim();

        if (title && text) {
          return `${title}: ${text}`;
        }

        return title || text;
      }

      return "";
    })
    .filter(Boolean);
}


async function cleanDirectory(
  directory: string
) {
  await fs.rm(
    directory,
    {
      recursive:
        true,

      force:
        true
    }
  );

  await fs.mkdir(
    directory,
    {
      recursive:
        true
    }
  );
}


async function main() {
  const [
    events,
    media,
    people,
    organizations,
    eventSpeakers,
    eventSponsors,
    communities,
    fieldNotes,
    eventRecaps,
    communityLogos,
    fieldworkIndustryLogos,
    featuredContent
  ] =
    await Promise.all([
      supabaseFetch(
        "events",
        "select=*&order=start_date.asc"
      ),

      supabaseFetch(
        "media",
        "select=id,public_url,alt_text,file_name"
      ),

      supabaseFetch(
        "people",
        "select=id,name,title,company,website_url,company_url,bio,company_logo_media_id&order=name.asc"
      ),

      supabaseFetch(
        "organizations",
        "select=id,name,website_url,description,logo_media_id&order=name.asc"
      ),

      supabaseFetch(
        "event_speakers",
        "select=event_id,person_id,sort_order&order=sort_order.asc"
      ),

      supabaseFetch(
        "event_sponsors",
        "select=event_id,organization_id,sort_order&order=sort_order.asc"
      ),

      supabaseFetch(
        "communities",
        "select=*&order=sort_order.asc"
      ),

      supabaseFetch(
        "field_notes",
        "select=*&order=published_at.asc"
      ),

      supabaseFetch(
        "event_recaps",
        "select=*&order=published_at.asc"
      ),

      supabaseFetch(
        "community_logo_rollup",
        "select=*&order=community_id.asc,name.asc"
      ),

      supabaseFetch(
        "fieldwork_industry_logo_rollup",
        "select=*&order=start_date.desc"
      ),

      supabaseFetch(
        "public_featured_content",
        "select=*&order=placement.asc,sort_order.asc"
      )
    ]);


  const mediaById =
    new Map(
      media.map(
        (item: any) => [
          item.id,
          item
        ]
      )
    );

  const peopleById =
    new Map(
      people.map(
        (item: any) => [
          item.id,
          item
        ]
      )
    );

  const organizationsById =
    new Map(
      organizations.map(
        (item: any) => [
          item.id,
          item
        ]
      )
    );


  const speakersByEvent =
    new Map<string, any[]>();

  eventSpeakers.forEach(
    (link: any) => {
      const person =
        peopleById.get(
          link.person_id
        );

      if (!person) {
        return;
      }

      const list =
        speakersByEvent.get(
          link.event_id
        ) || [];

      list.push({
        name:
          person.name,

        title:
          person.title || undefined,

        company:
          person.company || "",

        website:
          person.website_url || undefined,

        companyUrl:
          person.company_url || undefined,

        bio:
          person.bio || undefined
      });

      speakersByEvent.set(
        link.event_id,
        list
      );
    }
  );


  const sponsorsByEvent =
    new Map<string, any[]>();

  eventSponsors.forEach(
    (link: any) => {
      const organization =
        organizationsById.get(
          link.organization_id
        );

      if (!organization) {
        return;
      }

      const list =
        sponsorsByEvent.get(
          link.event_id
        ) || [];

      list.push({
        name:
          organization.name,

        website:
          organization.website_url || undefined,

        description:
          organization.description || undefined,

        logo:
          organization.logo_media_id
            ? mediaById.get(
                organization.logo_media_id
              )?.public_url
            : undefined
      });

      sponsorsByEvent.set(
        link.event_id,
        list
      );
    }
  );


  const mappedEvents =
    events.map(
      (event: any) => {
        const participation =
          event.participation || "attending";

        const speakerDetails =
          speakersByEvent.get(
            event.id
          ) || [];

        const sponsorDetails =
          sponsorsByEvent.get(
            event.id
          ) || [];

        return {
          id:
            event.id,

          title:
            event.title,

          role:
            (
              participation === "hosted" ||
              participation === "co-organized"
            )
              ? "hosted"
              : "attending",

          participation,

          communityId:
            event.community_id || undefined,

          startDate:
            dateOnly(
              event.start_date
            ),

          endDate:
            dateOnly(
              event.end_date
            ) || undefined,

          venue:
            event.venue || undefined,

          city:
            event.city || undefined,

          description:
            event.description || undefined,

          url:
            event.url || "#",

          buttonLabel:
            event.button_label || undefined,

          typeLabel:
            event.type_label || undefined,

          showOnHome:
            Boolean(
              event.show_on_home
            ),

          registrations:
            event.registrations ?? undefined,

          sponsors:
            sponsorDetails.map(
              (item) => item.name
            ),

          sponsorDetails,

          partners:
            stringList(
              event.partners
            ),

          speakers:
            speakerDetails.map(
              (item) => ({
                name:
                  item.name,

                title:
                  item.title,

                company:
                  item.company
              })
            ),

          speakerDetails,

          organizers:
            stringList(
              event.organizers
            ),

          address:
            event.address || undefined,

          image:
            event.cover_media_id
              ? mediaById.get(
                  event.cover_media_id
                )?.public_url
              : (
                  event.image_url ||
                  undefined
                ),

          additionalImage:
            event.image_url || undefined,

          communityImage:
            event.community_track_media_id
              ? mediaById.get(
                  event.community_track_media_id
                )?.public_url
              : undefined,

          industryLogo:
            event.industry_logo_media_id
              ? mediaById.get(
                  event.industry_logo_media_id
                )?.public_url
              : undefined,

          eventType:
            event.event_type || undefined
        };
      }
    );


  const mappedCommunities =
    communities.map(
      (community: any) => ({
        id:
          community.id,

        name:
          community.name,

        role:
          community.role || "",

        description:
          community.description || "",

        members:
          community.members || 0,

        linkedinFollowers:
          community.linkedin_followers ?? undefined,

        linkedinUrl:
          community.linkedin_url || undefined,

        primaryUrl:
          community.primary_url || "#",

        primaryLabel:
          community.primary_label || "Learn More",

        secondaryUrl:
          community.secondary_url || undefined,

        secondaryLabel:
          community.secondary_label || undefined,

        pillarsTitle:
          community.pillars_title || undefined,

        focus:
          focusList(
            community.focus
          )
      })
    );


  const mappedCommunityLogos =
    communityLogos.map(
      (item: any) => ({
        communityId:
          item.community_id,

        name:
          item.name,

        url:
          item.website_url || undefined,

        image:
          item.public_url,

        sourceType:
          item.source_type,

        latestEventDate:
          dateOnly(
            item.latest_event_date
          )
      })
    );


  const mappedFieldworkLogos =
    fieldworkIndustryLogos.map(
      (item: any) => ({
        identityKey:
          item.identity_key,

        eventId:
          item.event_id,

        title:
          item.title,

        url:
          item.url || undefined,

        startDate:
          dateOnly(
            item.start_date
          ),

        image:
          item.public_url
      })
    );


  await fs.writeFile(
    path.join(
      DATA_DIR,
      "events.cms.ts"
    ),
    jsonModule(
      'import type { SiteEvent } from "./events";',
      "events",
      mappedEvents,
      "SiteEvent[]"
    ) +
      "\nexport const eventSeeds = events;\n",
    "utf8"
  );


  await fs.writeFile(
    path.join(
      DATA_DIR,
      "communities.cms.ts"
    ),
    jsonModule(
      'import type { Community } from "./communities";',
      "communities",
      mappedCommunities,
      "Community[]"
    ),
    "utf8"
  );


  await fs.writeFile(
    path.join(
      DATA_DIR,
      "logos.cms.ts"
    ),
    `export const communityLogos =
  ${JSON.stringify(mappedCommunityLogos, null, 2)};

export const fieldworkIndustryLogos =
  ${JSON.stringify(mappedFieldworkLogos, null, 2)};
`,
    "utf8"
  );


  await fs.writeFile(
    path.join(
      DATA_DIR,
      "featured.cms.ts"
    ),
    `export const featuredContent =
  ${JSON.stringify(featuredContent, null, 2)};
`,
    "utf8"
  );


  const eventRecapLinks =
    Object.fromEntries(
      eventRecaps.map(
        (recap: any) => [
          recap.event_id,
          "/event-recaps/" + recap.slug + "/"
        ]
      )
    );


  await fs.writeFile(
    path.join(
      DATA_DIR,
      "eventRecapLinks.cms.ts"
    ),
    `export const eventRecapLinks =
  ${JSON.stringify(eventRecapLinks, null, 2)};
`,
    "utf8"
  );

  await cleanDirectory(
    FIELD_NOTES_DIR
  );

  const homeFeaturedFieldNotes =
    new Set(
      featuredContent
        .filter(
          (item: any) =>
            item.placement === "home" &&
            item.content_type === "field_note"
        )
        .map(
          (item: any) =>
            item.content_id
        )
    );

  for (
    const note
    of fieldNotes
  ) {
    const heroImage =
      note.hero_media_id
        ? mediaById.get(
            note.hero_media_id
          )?.public_url
        : undefined;

    const frontmatter =
      [
        "---",
        `title: ${yamlString(note.title)}`,
        `description: ${yamlString(note.excerpt || "")}`,
        `published: ${dateOnly(note.published_at)}`,
        `category: ${yamlString(note.category || "Field Notes")}`,
        `categorySlug: ${yamlString(categorySlug(note.category || "Field Notes"))}`,
        `featured: ${homeFeaturedFieldNotes.has(note.id) ? "true" : "false"}`,
        "draft: false",
        'author: "Nadim Abdel Meguid"',
        `readingMinutes: ${Number(note.reading_minutes || 1)}`,
        `heroImage: ${yamlString(heroImage || "")}`,
        `legacyUrl: ${yamlString(note.legacy_url || "")}`,
        "relatedEvents: []",
        "---",
        ""
      ]
        .join("\n");

    await fs.writeFile(
      path.join(
        FIELD_NOTES_DIR,
        `${note.slug}.md`
      ),
      `${frontmatter}${note.content_markdown || ""}\n`,
      "utf8"
    );
  }


  await cleanDirectory(
    EVENT_RECAPS_DIR
  );

  for (
    const recap
    of eventRecaps
  ) {
    const heroImage =
      recap.hero_media_id
        ? mediaById.get(
            recap.hero_media_id
          )?.public_url
        : undefined;

    const frontmatter =
      [
        "---",
        `title: ${yamlString(recap.title)}`,
        `eventId: ${yamlString(recap.event_id)}`,
        `eyebrow: ${yamlString(recap.eyebrow || "Event Recap")}`,
        `published: ${dateOnly(recap.published_at)}`,
        `excerpt: ${yamlString(recap.excerpt || "")}`,
        `readingMinutes: ${Number(recap.reading_minutes || 1)}`,
        `tags: ${JSON.stringify(Array.isArray(recap.tags) ? recap.tags : [])}`,
        `stats: ${JSON.stringify(Array.isArray(recap.stats) ? recap.stats : [])}`,
        `photoCredit: ${JSON.stringify(recap.photo_credit || null)}`,
        `heroImage: ${yamlString(heroImage || "")}`,
        `seoTitle: ${yamlString(recap.seo_title || "")}`,
        `seoDescription: ${yamlString(recap.seo_description || "")}`,
        "draft: false",
        "---",
        ""
      ]
        .join("\n");

    await fs.writeFile(
      path.join(
        EVENT_RECAPS_DIR,
        `${recap.slug}.md`
      ),
      `${frontmatter}${recap.content_markdown || ""}\n`,
      "utf8"
    );
  }


  console.log(
    [
      `CMS sync complete:`,
      `${mappedEvents.length} events`,
      `${mappedCommunities.length} communities`,
      `${fieldNotes.length} public field notes`,
      `${eventRecaps.length} public event recaps`,
      `${mappedCommunityLogos.length} community logos`,
      `${mappedFieldworkLogos.length} industry logos`
    ].join(" ")
  );
}


main()
  .catch(
    (error) => {
      console.error(
        error
      );

      process.exitCode =
        1;
    }
  );
