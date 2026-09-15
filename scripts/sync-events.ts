import fs from "node:fs/promises";
import path from "node:path";

import * as cheerio from "cheerio";

import {
  eventSeeds,
  type EventSpeaker,
  type SiteEvent,
  type SyncedEventPatch
} from "../src/data/events";


const OUTPUT =
  path.resolve(
    "src/data/events.synced.ts"
  );


const EVENTSHIP_API_KEY =
  process.env.EVENTSHIP_API_KEY
    ?.trim();


const USER_AGENT =
  "Mozilla/5.0 (compatible; SoleilAndStoneEventSync/1.0; +https://www.soleilandstone.co/)";


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


function providerFor(
  url: string
) {
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
}


async function fetchText(
  url: string
) {
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
          "follow"
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      `${response.status} ${response.statusText}`
    );
  }

  return response.text();
}


function allJsonLd(
  $:
    cheerio.CheerioAPI
): any[] {
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
        // Ignore malformed JSON-LD.
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


function patchFromPublicHtml(
  html: string,
  provider: string
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

  const address =
    eventLd
      ?.location
      ?.address;

  const locationName =
    cleanText(
      eventLd
        ?.location
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
    );

  const imageRaw =
    eventLd
      ?.image;

  const image =
    cleanText(
      Array.isArray(
        imageRaw
      )
        ? imageRaw[
            0
          ]
        : typeof imageRaw ===
            "object"
          ? imageRaw
              ?.url
          : imageRaw
    ) ??
    cleanText(
      $(
        'meta[property="og:image"]'
      )
        .attr(
          "content"
        )
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


function eventshipSlug(
  url: string
) {
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


function unwrapObject(
  payload: any
) {
  return (
    payload
      ?.event ??
    payload
      ?.data ??
    payload
  );
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
) {
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
