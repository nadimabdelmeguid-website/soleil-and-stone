import type { APIRoute } from "astro";

export const prerender = false;

const SUPABASE_URL =
  import.meta.env.PUBLIC_SUPABASE_URL ??
  "https://szdhkttphzvtmljuhcqs.supabase.co";

const SUPABASE_KEY =
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "sb_publishable_iN7aDql5whleXHRCRVNS-w_Awl-iQez";


const EVENTSHIP_API_KEY =
  import.meta.env.EVENTSHIP_API_KEY ||
  "";


type ImportedSpeaker = {
  name: string;
  title?: string;
  company?: string;
  companyUrl?: string;
};


type ImportedSponsor = {
  name: string;
  url?: string;
};


type ImportedEvent = {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  venue?: string;
  city?: string;
  region?: string;
  country?: string;
  address?: string;
  imageUrl?: string;
  eventType?: string;
  registrations?: number | null;
  organizers?: string[];
  speakers?: ImportedSpeaker[];
  sponsors?: ImportedSponsor[];
  sourceUrl: string;
  sourceHost: string;
};


function json(
  body: unknown,
  status = 200
) {
  return new Response(
    JSON.stringify(body),
    {
      status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    }
  );
}


function cleanText(
  value: unknown
) {
  return String(value ?? "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCharCode(Number(code))
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16))
    )
    .replace(/\s+/g, " ")
    .trim();
}


function firstString(
  value: unknown
): string | undefined {
  if (typeof value === "string") {
    return cleanText(value) || undefined;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const resolved = firstString(item);
      if (resolved) return resolved;
    }
  }

  if (
    value &&
    typeof value === "object"
  ) {
    const object =
      value as Record<string, unknown>;

    return (
      firstString(object.url) ||
      firstString(object.contentUrl) ||
      firstString(object["@id"])
    );
  }

  return undefined;
}


function toDateOnly(
  value: unknown
) {
  const raw =
    firstString(value);

  if (!raw) return undefined;

  const direct =
    raw.match(
      /^(\d{4}-\d{2}-\d{2})/
    );

  if (direct) {
    return direct[1];
  }

  const date =
    new Date(raw);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return undefined;
  }

  return date
    .toISOString()
    .slice(0, 10);
}


function metaContent(
  html: string,
  key: string
) {
  const escaped =
    key.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&"
    );

  const patterns = [
    new RegExp(
      `<meta[^>]+(?:property|name)=["']${escaped}["'][^>]+content=["']([^"']*)["'][^>]*>`,
      "i"
    ),
    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+(?:property|name)=["']${escaped}["'][^>]*>`,
      "i"
    )
  ];

  for (const pattern of patterns) {
    const match =
      html.match(pattern);

    if (match?.[1]) {
      return cleanText(
        match[1]
      );
    }
  }

  return undefined;
}


function pageTitle(
  html: string
) {
  return (
    metaContent(
      html,
      "og:title"
    ) ||
    cleanText(
      html.match(
        /<title[^>]*>([\s\S]*?)<\/title>/i
      )?.[1] ||
      ""
    ) ||
    undefined
  );
}


function uniqueStrings(
  values: Array<string | undefined | null>
) {
  const map =
    new Map<string, string>();

  for (const value of values) {
    const clean =
      cleanText(value);

    if (!clean) continue;

    const key =
      clean.toLowerCase();

    if (!map.has(key)) {
      map.set(
        key,
        clean
      );
    }
  }

  return Array.from(
    map.values()
  );
}


function normalizeType(
  value: unknown
) {
  if (Array.isArray(value)) {
    return value
      .map(
        (item) =>
          String(item).toLowerCase()
      );
  }

  return [
    String(
      value ?? ""
    ).toLowerCase()
  ];
}


function isEventNode(
  value: unknown
): value is Record<string, unknown> {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return false;
  }

  const object =
    value as Record<string, unknown>;

  return normalizeType(
    object["@type"]
  ).some(
    (type) =>
      type === "event" ||
      type.endsWith("event")
  );
}


function flattenJsonLd(
  value: unknown,
  output: Record<string, unknown>[] = []
) {
  if (
    !value
  ) {
    return output;
  }

  if (
    Array.isArray(value)
  ) {
    value.forEach(
      (item) =>
        flattenJsonLd(
          item,
          output
        )
    );

    return output;
  }

  if (
    typeof value === "object"
  ) {
    const object =
      value as Record<string, unknown>;

    output.push(object);

    if (
      Array.isArray(
        object["@graph"]
      )
    ) {
      flattenJsonLd(
        object["@graph"],
        output
      );
    }
  }

  return output;
}


function extractJsonLd(
  html: string
) {
  const nodes:
    Record<string, unknown>[] =
      [];

  const regex =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

  let match:
    RegExpExecArray | null;

  while (
    (
      match =
        regex.exec(html)
    )
  ) {
    const raw =
      match[1]
        .trim()
        .replace(
          /^\s*<!--|-->\s*$/g,
          ""
        );

    if (!raw) continue;

    try {
      const parsed =
        JSON.parse(raw);

      flattenJsonLd(
        parsed,
        nodes
      );
    } catch {
      // Some sites publish malformed JSON-LD.
      // We simply continue to the other sources.
    }
  }

  return nodes;
}


function personFromNode(
  value: unknown
): ImportedSpeaker | null {
  if (
    typeof value === "string"
  ) {
    const name =
      cleanText(value);

    return name
      ? { name }
      : null;
  }

  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }

  const object =
    value as Record<string, unknown>;

  const name =
    cleanText(
      object.name
    );

  if (!name) {
    return null;
  }

  const worksFor =
    object.worksFor ||
    object.affiliation ||
    object.memberOf;

  let company = "";
  let companyUrl = "";

  if (
    typeof worksFor === "string"
  ) {
    company =
      cleanText(worksFor);
  } else if (
    worksFor &&
    typeof worksFor === "object"
  ) {
    const companyObject =
      worksFor as Record<string, unknown>;

    company =
      cleanText(
        companyObject.name
      );

    companyUrl =
      firstString(
        companyObject.url
      ) ||
      "";
  }

  return {
    name,
    title:
      cleanText(
        object.jobTitle ||
        object.description
      ) ||
      undefined,
    company:
      company ||
      undefined,
    companyUrl:
      companyUrl ||
      undefined
  };
}


function organizationFromNode(
  value: unknown
): ImportedSponsor | null {
  if (
    typeof value === "string"
  ) {
    const name =
      cleanText(value);

    return name
      ? { name }
      : null;
  }

  if (
    !value ||
    typeof value !== "object"
  ) {
    return null;
  }

  const object =
    value as Record<string, unknown>;

  const name =
    cleanText(
      object.name
    );

  if (!name) {
    return null;
  }

  return {
    name,
    url:
      firstString(
        object.url
      )
  };
}


function listValues(
  value: unknown
) {
  if (
    value === undefined ||
    value === null
  ) {
    return [];
  }

  return Array.isArray(value)
    ? value
    : [value];
}


function inferEventType(
  title = "",
  description = ""
) {
  const value =
    `${title} ${description}`
      .toLowerCase();

  if (
    /\b(expo|trade show|tradeshow|exhibition|conference|convention)\b/.test(
      value
    )
  ) {
    return "trade-show";
  }

  if (
    /\bmeetup\b/.test(
      value
    )
  ) {
    return "community";
  }

  if (
    /\b(mixer|founder|startup|demo day|pitch)\b/.test(
      value
    )
  ) {
    return "startup";
  }

  if (
    /\b(engineering|hardware|technical|ieee|robotics|embedded)\b/.test(
      value
    )
  ) {
    return "technical";
  }

  return undefined;
}


function findRegistrationCount(
  html: string
) {
  const text =
    cleanText(
      html
        .replace(
          /<script[\s\S]*?<\/script>/gi,
          " "
        )
        .replace(
          /<style[\s\S]*?<\/style>/gi,
          " "
        )
    );

  const patterns = [
    /\b([\d,]+)\s+registrations?\b/i,
    /\b([\d,]+)\s+registered\b/i,
    /\b([\d,]+)\s+attendees?\b/i,
    /\b([\d,]+)\s+going\b/i,
    /\b([\d,]+)\s+went\b/i
  ];

  for (
    const pattern of
      patterns
  ) {
    const match =
      text.match(pattern);

    if (
      match?.[1]
    ) {
      const number =
        Number(
          match[1]
            .replace(
              /,/g,
              ""
            )
        );

      if (
        Number.isFinite(number)
      ) {
        return number;
      }
    }
  }

  return null;
}


function parseAddress(
  location: unknown
) {
  let venue:
    string | undefined;

  let city:
    string | undefined;

  let region:
    string | undefined;

  let country:
    string | undefined;

  let address:
    string | undefined;

  const locationValue =
    Array.isArray(location)
      ? location[0]
      : location;

  if (
    typeof locationValue === "string"
  ) {
    venue =
      cleanText(
        locationValue
      ) ||
      undefined;

    return {
      venue,
      city,
      region,
      country,
      address
    };
  }

  if (
    !locationValue ||
    typeof locationValue !== "object"
  ) {
    return {
      venue,
      city,
      region,
      country,
      address
    };
  }

  const locationObject =
    locationValue as Record<string, unknown>;

  venue =
    cleanText(
      locationObject.name
    ) ||
    undefined;

  const addressValue =
    locationObject.address;

  if (
    typeof addressValue === "string"
  ) {
    address =
      cleanText(
        addressValue
      ) ||
      undefined;
  } else if (
    addressValue &&
    typeof addressValue === "object"
  ) {
    const addressObject =
      addressValue as Record<string, unknown>;

    const street =
      cleanText(
        addressObject.streetAddress
      );

    city =
      cleanText(
        addressObject.addressLocality
      ) ||
      undefined;

    region =
      cleanText(
        addressObject.addressRegion
      ) ||
      undefined;

    const postal =
      cleanText(
        addressObject.postalCode
      );

    const countryValue =
      addressObject.addressCountry;

    if (
      typeof countryValue === "string"
    ) {
      country =
        cleanText(
          countryValue
        ) ||
        undefined;
    } else if (
      countryValue &&
      typeof countryValue === "object"
    ) {
      country =
        cleanText(
          (
            countryValue as
              Record<string, unknown>
          ).name
        ) ||
        undefined;
    }

    address =
      [
        street,
        city,
        region,
        postal,
        country
      ]
        .filter(Boolean)
        .join(", ") ||
      undefined;
  }

  return {
    venue,
    city,
    region,
    country,
    address
  };
}


async function verifyAdmin(
  request: Request
) {
  const authorization =
    request.headers.get(
      "authorization"
    ) ||
    "";

  const token =
    authorization.replace(
      /^Bearer\s+/i,
      ""
    );

  if (!token) {
    return null;
  }

  const userResponse =
    await fetch(
      `${SUPABASE_URL}/auth/v1/user`,
      {
        headers: {
          apikey:
            SUPABASE_KEY,
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  if (
    !userResponse.ok
  ) {
    return null;
  }

  const user =
    await userResponse.json();

  if (!user?.id) {
    return null;
  }

  const membershipResponse =
    await fetch(
      `${SUPABASE_URL}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(user.id)}&select=user_id`,
      {
        headers: {
          apikey:
            SUPABASE_KEY,
          Authorization:
            `Bearer ${token}`,
          Accept:
            "application/json"
        }
      }
    );

  if (
    !membershipResponse.ok
  ) {
    return null;
  }

  const membership =
    await membershipResponse.json();

  return (
    Array.isArray(membership) &&
    membership.length > 0
  )
    ? user
    : null;
}


function validatePublicUrl(
  rawUrl: string
) {
  let url:
    URL;

  try {
    url =
      new URL(rawUrl);
  } catch {
    throw new Error(
      "Enter a valid event URL."
    );
  }

  if (
    ![
      "http:",
      "https:"
    ].includes(
      url.protocol
    )
  ) {
    throw new Error(
      "Only public HTTP or HTTPS event pages can be imported."
    );
  }

  const hostname =
    url.hostname
      .toLowerCase()
      .replace(
        /^\[|\]$/g,
        ""
      );

  const blocked =
    hostname === "localhost" ||
    hostname === "::1" ||
    hostname === "0.0.0.0" ||
    hostname.startsWith("127.") ||
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("169.254.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(
      hostname
    );

  if (blocked) {
    throw new Error(
      "Private or local network URLs cannot be imported."
    );
  }

  return url;
}


async function fetchEventPage(
  url: URL
) {
  const response =
    await fetch(
      url.toString(),
      {
        redirect:
          "follow",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (compatible; SoleilStoneCMS/1.0; +https://soleilandstone.co)",
          Accept:
            "text/html,application/xhtml+xml"
        },
        signal:
          AbortSignal.timeout(
            15_000
          )
      }
    );

  if (
    !response.ok
  ) {
    throw new Error(
      `The event page returned ${response.status}.`
    );
  }

  const contentType =
    response.headers.get(
      "content-type"
    ) ||
    "";

  if (
    !contentType.includes(
      "text/html"
    )
  ) {
    throw new Error(
      "The URL did not return an HTML event page."
    );
  }

  const html =
    await response.text();

  if (
    html.length >
    5_000_000
  ) {
    throw new Error(
      "The event page is too large to import safely."
    );
  }

  return {
    html,
    finalUrl:
      response.url ||
      url.toString()
  };
}



function eventshipSlug(
  url: string
) {
  try {
    const pathname =
      new URL(url)
        .pathname;

    return pathname.match(
      /\/event\/([^/?#]+)/
    )?.[1];
  } catch {
    return undefined;
  }
}


async function eventshipRegistrationCount(
  slug: string
) {
  if (!EVENTSHIP_API_KEY) {
    return undefined;
  }

  let page = 1;
  let count = 0;
  const pageSize = 200;

  while (page <= 100) {
    const response =
      await fetch(
        `https://api.eventship.com/v1/events/${encodeURIComponent(slug)}/attendees?status=confirmed&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            "X-API-Key":
              EVENTSHIP_API_KEY,
            accept:
              "application/json"
          },
          signal:
            AbortSignal.timeout(
              12_000
            )
        }
      );

    if (!response.ok) {
      throw new Error(
        `Eventship API returned ${response.status}.`
      );
    }

    const payload =
      await response.json();

    const total =
      payload?.total ??
      payload?.totalCount ??
      payload?.count;

    if (
      typeof total ===
        "number"
    ) {
      return total;
    }

    const attendees =
      Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.attendees)
          ? payload.attendees
          : Array.isArray(payload?.results)
            ? payload.results
            : Array.isArray(payload?.items)
              ? payload.items
              : Array.isArray(payload?.data)
                ? payload.data
                : [];

    count +=
      attendees.length;

    if (
      attendees.length <
      pageSize
    ) {
      break;
    }

    page += 1;
  }

  return count || undefined;
}


function extractEvent(
  html: string,
  sourceUrl: string
): ImportedEvent {
  const nodes =
    extractJsonLd(html);

  const eventNode =
    nodes.find(
      isEventNode
    );

  const title =
    cleanText(
      eventNode?.name
    ) ||
    pageTitle(html);

  const description =
    cleanText(
      eventNode?.description
    ) ||
    metaContent(
      html,
      "og:description"
    ) ||
    metaContent(
      html,
      "description"
    );

  const {
    venue,
    city,
    region,
    country,
    address
  } =
    parseAddress(
      eventNode?.location
    );

  const imageUrl =
    firstString(
      eventNode?.image
    ) ||
    metaContent(
      html,
      "og:image"
    );

  const organizerValues =
    listValues(
      eventNode?.organizer
    );

  const organizers =
    uniqueStrings(
      organizerValues.map(
        (item) =>
          typeof item === "string"
            ? item
            : cleanText(
                (
                  item as
                    Record<string, unknown>
                )?.name
              )
      )
    );

  const speakerNodes = [
    ...listValues(
      eventNode?.performer
    ),
    ...listValues(
      eventNode?.contributor
    ),
    ...listValues(
      eventNode?.speaker
    )
  ];

  const speakers =
    speakerNodes
      .map(
        personFromNode
      )
      .filter(
        (
          item
        ): item is ImportedSpeaker =>
          Boolean(item?.name)
      )
      .filter(
        (item, index, array) =>
          array.findIndex(
            (candidate) =>
              candidate.name
                .toLowerCase() ===
              item.name.toLowerCase()
          ) === index
      );

  const sponsors =
    listValues(
      eventNode?.sponsor
    )
      .map(
        organizationFromNode
      )
      .filter(
        (
          item
        ): item is ImportedSponsor =>
          Boolean(item?.name)
      )
      .filter(
        (item, index, array) =>
          array.findIndex(
            (candidate) =>
              candidate.name
                .toLowerCase() ===
              item.name.toLowerCase()
          ) === index
      );

  const eventType =
    inferEventType(
      title,
      description
    );

  return {
    title:
      title ||
      undefined,
    startDate:
      toDateOnly(
        eventNode?.startDate
      ),
    endDate:
      toDateOnly(
        eventNode?.endDate
      ),
    description:
      description ||
      undefined,
    venue,
    city,
    region,
    country,
    address,
    imageUrl,
    eventType,
    registrations:
      findRegistrationCount(
        html
      ),
    organizers,
    speakers,
    sponsors,
    sourceUrl,
    sourceHost:
      new URL(sourceUrl)
        .hostname
  };
}


export const POST:
  APIRoute =
    async (
      {
        request
      }
    ) => {
      try {
        const user =
          await verifyAdmin(
            request
          );

        if (!user) {
          return json(
            {
              error:
                "Unauthorized."
            },
            401
          );
        }

        let body:
          {
            url?: string;
          };

        try {
          body =
            await request.json();
        } catch {
          return json(
            {
              error:
                "Invalid request."
            },
            400
          );
        }

        const url =
          validatePublicUrl(
            String(
              body?.url ||
              ""
            )
          );

        const {
          html,
          finalUrl
        } =
          await fetchEventPage(
            url
          );

        const event =
          extractEvent(
            html,
            finalUrl
          );

        if (
          event.sourceHost.endsWith(
            "eventship.com"
          ) &&
          EVENTSHIP_API_KEY
        ) {
          const slug =
            eventshipSlug(
              finalUrl
            );

          if (slug) {
            try {
              const registrations =
                await eventshipRegistrationCount(
                  slug
                );

              if (
                typeof registrations ===
                  "number"
              ) {
                event.registrations =
                  registrations;
              }
            } catch (error) {
              console.warn(
                "Eventship registration import failed:",
                error
              );
            }
          }
        }

        return json({
          event
        });

      } catch (error) {
        console.error(
          "Event import failed:",
          error
        );

        return json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Could not import this event."
          },
          500
        );
      }
    };
