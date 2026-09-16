import fs from "node:fs/promises";
import path from "node:path";

import * as cheerio from "cheerio";

import {
  eventSeeds,
  type EventSpeaker,
  type SiteEvent,
  type SyncedEventPatch
} from "../src/data/events";


/* =====================================================
   CONFIG
   ===================================================== */

const OUTPUT =
  path.resolve(
    "src/data/events.synced.ts"
  );


const EVENTSHIP_API_KEY =
  process.env.EVENTSHIP_API_KEY
    ?.trim();


const USER_AGENT =
  "Mozilla/5.0 (compatible; SoleilAndStoneEventSync/1.0; +https://www.soleilandstone.co/)";


const REQUEST_TIMEOUT_MS =
  15000;


/* =====================================================
   BASIC HELPERS
   ===================================================== */

function cleanText(
  value: unknown
): string | undefined {

  if (
    typeof value !==
    "string"
  ) {
    return undefined;
  }


  const clean =
    value
      .replace(
        /\s+/g,
        " "
      )
      .trim();


  return (
    clean ||
    undefined
  );

}


function toDateOnly(
  value: unknown
): string | undefined {

  if (
    typeof value !==
      "string" ||
    !value
  ) {
    return undefined;
  }


  const direct =
    value.match(
      /^(\d{4}-\d{2}-\d{2})/
    );


  if (direct) {
    return direct[1];
  }


  const parsed =
    new Date(
      value
    );


  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return undefined;
  }


  return parsed
    .toISOString()
    .slice(
      0,
      10
    );

}


function uniqueStrings(
  values: Array<
    string | undefined
  >
) {

  const map =
    new Map<
      string,
      string
    >();


  values
    .filter(
      (
        value
      ): value is string =>
        Boolean(
          value
        )
    )
    .forEach(
      (value) => {

        const clean =
          value.trim();


        const key =
          clean
            .toLowerCase();


        if (
          !map.has(
            key
          )
        ) {

          map.set(
            key,
            clean
          );

        }

      }
    );


  return Array.from(
    map.values()
  );

}


function uniqueSpeakers(
  values:
    EventSpeaker[]
) {

  const map =
    new Map<
      string,
      EventSpeaker
    >();


  values.forEach(
    (speaker) => {

      const name =
        speaker.name
          ?.trim();


      if (!name) {
        return;
      }


      const key =
        name
          .toLowerCase();


      if (
        !map.has(
          key
        )
      ) {

        map.set(
          key,
          {
            ...speaker,
            name
          }
        );

      }

    }
  );


  return Array.from(
    map.values()
  );

}


/* =====================================================
   PROVIDERS
   ===================================================== */

function providerFor(
  url: string
) {

  try {

    const host =
      new URL(
        url
      )
        .hostname
        .toLowerCase();


    if (
      host.includes(
        "eventship.com"
      )
    ) {
      return "eventship";
    }


    if (
      host ===
        "luma.com" ||
      host.endsWith(
        ".luma.com"
      )
    ) {
      return "luma";
    }


    if (
      host.includes(
        "meetup.com"
      )
    ) {
      return "meetup";
    }


    return "generic";

  } catch {

    return "generic";

  }

}


/* =====================================================
   URL HELPERS
   ===================================================== */

function absoluteUrl(
  value:
    | string
    | undefined,
  pageUrl: string
):
  string |
  undefined {

  const clean =
    cleanText(
      value
    );


  if (!clean) {
    return undefined;
  }


  try {

    return new URL(
      clean,
      pageUrl
    ).href;

  } catch {

    return undefined;

  }

}


/* =====================================================
   HTTP
   ===================================================== */

async function fetchText(
  url: string
) {

  const controller =
    new AbortController();


  const timeout =
    setTimeout(
      () => {
        controller.abort();
      },
      REQUEST_TIMEOUT_MS
    );


  try {

    const response =
      await fetch(
        url,
        {
          headers: {
            "user-agent":
              USER_AGENT,

            accept:
              "text/html,application/xhtml+xml"
          },

          redirect:
            "follow",

          signal:
            controller.signal
        }
      );


    if (
      !response.ok
    ) {

      throw new Error(
        `${response.status} ${response.statusText}`
      );

    }


    return {
      html:
        await response.text(),

      finalUrl:
        response.url ||
        url
    };

  } finally {

    clearTimeout(
      timeout
    );

  }

}


/* =====================================================
   JSON-LD
   ===================================================== */

function allJsonLd(
  $:
    cheerio.CheerioAPI
):
  any[] {

  const results:
    any[] = [];


  $(
    'script[type="application/ld+json"]'
  ).each(
    (
      _,
      element
    ) => {

      const raw =
        $(element)
          .text()
          .trim();


      if (!raw) {
        return;
      }


      try {

        const parsed =
          JSON.parse(
            raw
          );


        if (
          Array.isArray(
            parsed
          )
        ) {

          results.push(
            ...parsed
          );

        } else {

          results.push(
            parsed
          );

        }

      } catch {

        /*
         * Ignore malformed JSON-LD.
         */

      }

    }
  );


  return results;

}


function findEventJsonLd(
  values: any[]
):
  | any
  | undefined {

  const queue =
    [
      ...values
    ];


  while (
    queue.length
  ) {

    const item =
      queue.shift();


    if (!item) {
      continue;
    }


    if (
      Array.isArray(
        item
      )
    ) {

      queue.push(
        ...item
      );

      continue;

    }


    if (
      typeof item !==
        "object"
    ) {
      continue;
    }


    const type =
      item[
        "@type"
      ];


    const types =
      Array.isArray(
        type
      )
        ? type
        : [
            type
          ];


    if (
      types
        .filter(
          Boolean
        )
        .some(
          (value) =>
            String(
              value
            )
              .toLowerCase() ===
            "event"
        )
    ) {

      return item;

    }


    if (
      item[
        "@graph"
      ]
    ) {

      queue.push(
        item[
          "@graph"
        ]
      );

    }

  }


  return undefined;

}


/* =====================================================
   PEOPLE / ORGANIZATIONS
   ===================================================== */

function personOrOrgNames(
  value: any
):
  string[] {

  if (!value) {
    return [];
  }


  const values =
    Array.isArray(
      value
    )
      ? value
      : [
          value
        ];


  return uniqueStrings(
    values.map(
      (item) => {

        if (
          typeof item ===
            "string"
        ) {

          return cleanText(
            item
          );

        }


        return cleanText(
          item?.name
        );

      }
    )
  );

}


function speakersFromJsonLd(
  eventLd: any
):
  EventSpeaker[] {

  const raw =
    eventLd?.performer ??
    eventLd?.speaker ??
    eventLd?.performers;


  if (!raw) {
    return [];
  }


  const values =
    Array.isArray(
      raw
    )
      ? raw
      : [
          raw
        ];


  return uniqueSpeakers(

    values
      .map(
        (
          item
        ):
          | EventSpeaker
          | null => {

          if (
            typeof item ===
              "string"
          ) {

            return {
              name:
                item,

              company:
                ""
            };

          }


          const name =
            cleanText(
              item?.name
            );


          if (!name) {
            return null;
          }


          return {

            name,

            title:
              cleanText(
                item?.jobTitle
              ),

            company:
              cleanText(
                item
                  ?.worksFor
                  ?.name
              ) ??
              cleanText(
                item
                  ?.affiliation
                  ?.name
              ) ??
              ""

          };

        }
      )
      .filter(
        (
          value
        ):
          value is EventSpeaker =>
          Boolean(
            value
          )
      )

  );

}


/* =====================================================
   PATCH CLEANUP
   ===================================================== */

function compactPatch(
  patch:
    SyncedEventPatch
):
  SyncedEventPatch {

  return Object.fromEntries(

    Object.entries(
      patch
    )
      .filter(
        (
          [
            ,
            value
          ]
        ) =>

          value !==
            undefined &&

          value !==
            null &&

          value !==
            "" &&

          !(
            Array.isArray(
              value
            ) &&
            value.length ===
              0
          )

      )

  ) as SyncedEventPatch;

}


/* =====================================================
   IMAGE EXTRACTION
   ===================================================== */

function extractImage(
  $:
    cheerio.CheerioAPI,
  eventLd: any,
  pageUrl: string
):
  string |
  undefined {

  const imageRaw =
    eventLd
      ?.image;


  let jsonLdImage:
    string |
    undefined;


  if (
    Array.isArray(
      imageRaw
    )
  ) {

    const first =
      imageRaw[
        0
      ];


    if (
      typeof first ===
        "string"
    ) {

      jsonLdImage =
        first;

    } else {

      jsonLdImage =
        first?.url ??
        first?.contentUrl;

    }

  } else if (
    typeof imageRaw ===
      "object" &&
    imageRaw !==
      null
  ) {

    jsonLdImage =
      imageRaw?.url ??
      imageRaw?.contentUrl;

  } else if (
    typeof imageRaw ===
      "string"
  ) {

    jsonLdImage =
      imageRaw;

  }


  const candidates =
    [

      jsonLdImage,

      $(
        'meta[property="og:image:secure_url"]'
      )
        .attr(
          "content"
        ),

      $(
        'meta[property="og:image"]'
      )
        .attr(
          "content"
        ),

      $(
        'meta[name="twitter:image"]'
      )
        .attr(
          "content"
        ),

      $(
        'meta[name="twitter:image:src"]'
      )
        .attr(
          "content"
        )

    ];


  for (
    const candidate
    of candidates
  ) {

    const resolved =
      absoluteUrl(
        candidate,
        pageUrl
      );


    if (
      resolved
    ) {

      return resolved;

    }

  }


  return undefined;

}


/* =====================================================
   PUBLIC HTML → EVENT PATCH
   ===================================================== */

function patchFromPublicHtml(
  html: string,
  provider: string,
  pageUrl: string
):
  SyncedEventPatch {

  const $ =
    cheerio.load(
      html
    );


  const eventLd =
    findEventJsonLd(
      allJsonLd(
        $
      )
    );


  const location =
    eventLd
      ?.location;


  const address =
    location
      ?.address;


  const locationName =
    cleanText(
      location
        ?.name
    );


  const addressText =
    typeof address ===
      "string"

      ? cleanText(
          address
        )

      : cleanText(
          [
            address
              ?.streetAddress,

            address
              ?.addressLocality,

            address
              ?.addressRegion,

            address
              ?.postalCode,

            address
              ?.addressCountry
          ]
            .filter(
              Boolean
            )
            .join(
              ", "
            )
        );


  const city =
    cleanText(
      address
        ?.addressLocality
    );


  const title =
    cleanText(
      eventLd
        ?.name
    ) ??

    cleanText(
      $(
        "h1"
      )
        .first()
        .text()
    ) ??

    cleanText(
      $(
        'meta[property="og:title"]'
      )
        .attr(
          "content"
        )
    );


  const description =
    cleanText(
      eventLd
        ?.description
    ) ??

    cleanText(
      $(
        'meta[name="description"]'
      )
        .attr(
          "content"
        )
    ) ??

    cleanText(
      $(
        'meta[property="og:description"]'
      )
        .attr(
          "content"
        )
    );


  const image =
    extractImage(
      $,
      eventLd,
      pageUrl
    );


  const organizers =
    personOrOrgNames(
      eventLd
        ?.organizer
    );


  const sponsors =
    personOrOrgNames(
      eventLd
        ?.sponsor
    );


  const speakers =
    speakersFromJsonLd(
      eventLd
    );


  const pageText =
    $(
      "body"
    )
      .text()
      .replace(
        /\s+/g,
        " "
      )
      .trim();


  let registrations:
    | number
    | undefined;


  /*
   * Luma often exposes:
   * "123 Went"
   */

  if (
    provider ===
      "luma"
  ) {

    const match =
      pageText.match(
        /\b([\d,]+)\s+Went\b/i
      );


    if (
      match
    ) {

      registrations =
        Number(
          match[
            1
          ]
            .replace(
              /,/g,
              ""
            )
        );

    }

  }


  /*
   * Meetup often exposes:
   * "123 attendees", "123 went" or "123 going"
   */

  if (
    provider ===
      "meetup"
  ) {

    const patterns =
      [
        /\b([\d,]+)\s+attendees?\b/i,
        /\b([\d,]+)\s+went\b/i,
        /\b([\d,]+)\s+going\b/i
      ];


    for (
      const pattern
      of patterns
    ) {

      const match =
        pageText.match(
          pattern
        );


      if (
        match
      ) {

        registrations =
          Number(
            match[
              1
            ]
              .replace(
                /,/g,
                ""
              )
          );


        break;

      }

    }

  }


  const patch:
    SyncedEventPatch = {

    title,

    startDate:
      toDateOnly(
        eventLd
          ?.startDate
      ),

    endDate:
      toDateOnly(
        eventLd
          ?.endDate
      ),

    venue:
      locationName,

    city,

    address:
      addressText,

    image,

    description,

    registrations

  };


  if (
    organizers.length
  ) {

    patch.organizers =
      organizers;

  }


  if (
    sponsors.length
  ) {

    patch.sponsors =
      sponsors;

  }


  if (
    speakers.length
  ) {

    patch.speakers =
      speakers;

  }


  return compactPatch(
    patch
  );

}


/* =====================================================
   EVENTSHIP
   ===================================================== */

function eventshipSlug(
  url: string
) {

  try {

    const pathname =
      new URL(
        url
      )
        .pathname;


    const match =
      pathname.match(
        /\/event\/([^/?#]+)/
      );


    return match?.[
      1
    ];

  } catch {

    return undefined;

  }

}


async function eventshipApi(
  endpoint: string
) {

  if (
    !EVENTSHIP_API_KEY
  ) {

    throw new Error(
      "EVENTSHIP_API_KEY is not configured"
    );

  }


  const response =
    await fetch(
      `https://api.eventship.com${endpoint}`,
      {
        headers: {

          "X-API-Key":
            EVENTSHIP_API_KEY,

          accept:
            "application/json"

        }
      }
    );


  if (
    !response.ok
  ) {

    throw new Error(
      `Eventship API ${response.status}: ${await response.text()}`
    );

  }


  return response.json();

}


function unwrapArray(
  payload: any,
  keys: string[]
):
  any[] {

  if (
    Array.isArray(
      payload
    )
  ) {
    return payload;
  }


  for (
    const key
    of keys
  ) {

    if (
      Array.isArray(
        payload?.[
          key
        ]
      )
    ) {

      return payload[
        key
      ];

    }

  }


  if (
    Array.isArray(
      payload
        ?.data
    )
  ) {

    return payload
      .data;

  }


  return [];

}


async function eventshipRegistrationCount(
  slug: string
):
  Promise<
    number |
    undefined
  > {

  if (
    !EVENTSHIP_API_KEY
  ) {
    return undefined;
  }


  let page =
    1;


  let count =
    0;


  const pageSize =
    200;


  while (
    true
  ) {

    const payload =
      await eventshipApi(
        `/v1/events/${encodeURIComponent(slug)}/attendees?status=confirmed&page=${page}&pageSize=${pageSize}`
      );


    const total =
      payload
        ?.total ??

      payload
        ?.totalCount ??

      payload
        ?.count;


    if (
      typeof total ===
        "number"
    ) {

      return total;

    }


    const attendees =
      unwrapArray(
        payload,
        [
          "attendees",
          "results",
          "items"
        ]
      );


    count +=
      attendees.length;


    if (
      attendees.length <
        pageSize
    ) {

      break;

    }


    page +=
      1;


    /*
     * Safety stop.
     */

    if (
      page >
        100
    ) {

      break;

    }

  }


  return count ||
    undefined;

}


/* =====================================================
   SYNC ONE EVENT
   ===================================================== */

async function syncEvent(
  event:
    SiteEvent
):
  Promise<
    SyncedEventPatch
  > {

  const provider =
    providerFor(
      event.url
    );


  const {
    html,
    finalUrl
  } =
    await fetchText(
      event.url
    );


  const patch =
    patchFromPublicHtml(
      html,
      provider,
      finalUrl
    );


  /*
   * Eventship registration count can optionally come
   * from the API when EVENTSHIP_API_KEY is configured.
   *
   * The featured image still comes directly from the
   * public Eventship event page.
   */

  if (
    provider ===
      "eventship" &&
    EVENTSHIP_API_KEY
  ) {

    const slug =
      eventshipSlug(
        event.url
      );


    if (
      slug
    ) {

      try {

        const registrations =
          await eventshipRegistrationCount(
            slug
          );


        if (
          typeof registrations ===
            "number"
        ) {

          patch.registrations =
            registrations;

        }

      } catch (
        error
      ) {

        console.warn(
          `⚠ Eventship attendee sync failed for "${event.title}".`,
          error instanceof Error
            ? error.message
            : error
        );

      }

    }

  }


  return compactPatch(
    patch
  );

}


/* =====================================================
   SERIALIZE OUTPUT
   ===================================================== */

function buildOutputFile(
  syncedEvents:
    Record<
      string,
      SyncedEventPatch
    >
) {

  const json =
    JSON.stringify(
      syncedEvents,
      null,
      2
    );


  return `import type {
  SyncedEventPatch
} from "./events";

const syncedEvents: Record<
  string,
  SyncedEventPatch
> = ${json};

export default syncedEvents;
`;

}


/* =====================================================
   MAIN SYNC
   ===================================================== */

async function main() {

  console.log(
    `\nSyncing ${eventSeeds.length} Soleil & Stone events...\n`
  );


  const syncedEvents:
    Record<
      string,
      SyncedEventPatch
    > = {};


  let successCount =
    0;


  let failureCount =
    0;


  let imageCount =
    0;


  /*
   * Intentionally sequential.
   *
   * This is friendlier to Eventship, Luma, Meetup and
   * conference websites than hitting every URL at once.
   */

  for (
    const [
      index,
      event
    ] of eventSeeds.entries()
  ) {

    const progress =
      `[${index + 1}/${eventSeeds.length}]`;


    try {

      console.log(
        `${progress} ${event.title}`
      );


      const patch =
        await syncEvent(
          event
        );


      if (
        Object.keys(
          patch
        ).length >
        0
      ) {

        syncedEvents[
          event.id
        ] =
          patch;

      }


      if (
        patch.image
      ) {

        imageCount +=
          1;


        console.log(
          `   ✓ image: ${patch.image}`
        );

      } else {

        console.log(
          "   · no featured image found"
        );

      }


      successCount +=
        1;

    } catch (
      error
    ) {

      failureCount +=
        1;


      console.warn(
        `   ⚠ Could not sync ${event.url}`
      );


      console.warn(
        `     ${
          error instanceof Error
            ? error.message
            : String(
                error
              )
        }`
      );

    }

  }


  const output =
    buildOutputFile(
      syncedEvents
    );


  await fs.writeFile(
    OUTPUT,
    output,
    "utf8"
  );


  console.log(
    "\n----------------------------------------"
  );


  console.log(
    `✓ Synced: ${successCount}`
  );


  console.log(
    `✓ Images found: ${imageCount}`
  );


  console.log(
    `⚠ Failed: ${failureCount}`
  );


  console.log(
    `✓ Wrote: ${OUTPUT}`
  );


  console.log(
    "----------------------------------------\n"
  );

}


/* =====================================================
   RUN
   ===================================================== */

main()
  .catch(
    (error) => {

      console.error(
        "\nEvent sync failed."
      );


      console.error(
        error
      );


      process.exitCode =
        1;

    }
  );
