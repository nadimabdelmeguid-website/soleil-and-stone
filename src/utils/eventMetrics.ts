import type {
  EventSpeaker,
  SiteEvent
} from "../data/events";


export type EventParticipation =
  | "hosted"
  | "co-organized"
  | "exhibitor"
  | "attending";


/* =========================================================
   DATE HELPERS
   ========================================================= */

export function parseMetricDate(
  value: string
) {

  return new Date(
    `${value}T12:00:00`
  );

}


/* =========================================================
   COMPLETED EVENT
   ========================================================= */

export function isCompletedEvent(
  event: SiteEvent
) {

  const end =
    parseMetricDate(
      event.endDate ??
      event.startDate
    );


  end.setHours(
    23,
    59,
    59,
    999
  );


  return end <
    new Date();

}


/* =========================================================
   PARTICIPATION
   ========================================================= */

export function getEventParticipation(
  event: SiteEvent
): EventParticipation {

  return event.participation;

}


/* =========================================================
   PARTICIPATION PRIORITY

   Used when multiple events share the same date.
   ========================================================= */

export function getParticipationPriority(
  event: SiteEvent
) {

  const participation =
    getEventParticipation(
      event
    );


  if (
    participation ===
      "hosted" ||
    participation ===
      "co-organized"
  ) {

    return 3;

  }


  if (
    participation ===
      "exhibitor"
  ) {

    return 2;

  }


  return 1;

}


/* =========================================================
   LED EVENT

   Hosted + co-organized.
   ========================================================= */

export function isLedEvent(
  event: SiteEvent
) {

  return (
    event.participation ===
      "hosted" ||
    event.participation ===
      "co-organized"
  );

}


/* =========================================================
   COMPLETED LED EVENTS
   ========================================================= */

export function getCompletedLedEvents(
  events: SiteEvent[]
) {

  return events.filter(
    (event) =>
      isCompletedEvent(
        event
      ) &&
      isLedEvent(
        event
      )
  );

}


/* =========================================================
   UNIQUE SPEAKERS
   ========================================================= */

export function getUniqueSpeakers(
  events: SiteEvent[]
) {

  const uniqueSpeakers =
    new Map<
      string,
      EventSpeaker
    >();


  events
    .flatMap(
      (event) =>
        event.speakers ??
        []
    )
    .forEach(
      (speaker) => {

        const key =
          speaker.name
            .trim()
            .toLowerCase();


        if (
          !uniqueSpeakers.has(
            key
          )
        ) {

          uniqueSpeakers.set(
            key,
            speaker
          );

        }

      }
    );


  return Array.from(
    uniqueSpeakers.values()
  );

}


/* =========================================================
   UNIQUE STRINGS

   Used for sponsors / partners / organizations.
   Case-insensitive deduplication.
   ========================================================= */

function getUniqueStrings(
  values: string[]
) {

  const unique =
    new Map<
      string,
      string
    >();


  values
    .filter(
      Boolean
    )
    .forEach(
      (value) => {

        const clean =
          value.trim();

        const key =
          clean.toLowerCase();


        if (
          !unique.has(
            key
          )
        ) {

          unique.set(
            key,
            clean
          );

        }

      }
    );


  return Array.from(
    unique.values()
  );

}


/* =========================================================
   COMMUNITY METRICS

   Aggregate across every completed event that belongs to
   one of the site's communities and was hosted/co-organized.

   This becomes the single source of truth for community.astro.
   ========================================================= */

export function getCommunityMetrics(
  events: SiteEvent[]
) {

  const completedEvents =
    events.filter(
      (event) =>
        Boolean(
          event.communityId
        ) &&
        isCompletedEvent(
          event
        ) &&
        isLedEvent(
          event
        )
    );


  const registrations =
    completedEvents.reduce(
      (
        total,
        event
      ) =>
        total +
        (
          event.registrations ??
          0
        ),
      0
    );


  const speakers =
    getUniqueSpeakers(
      completedEvents
    );


  const sponsors =
    getUniqueStrings(
      completedEvents.flatMap(
        (event) =>
          event.sponsors ??
          []
      )
    );


  const partners =
    getUniqueStrings(
      completedEvents.flatMap(
        (event) =>
          event.partners ??
          []
      )
    );


  return {

    events:
      completedEvents,

    eventsLed:
      completedEvents.length,

    registrations,

    speakers,

    speakerCount:
      speakers.length,

    sponsors,

    sponsorCount:
      sponsors.length,

    partners,

    partnerCount:
      partners.length

  };

}


/* =========================================================
   SINGLE COMMUNITY METRICS

   Used by CommunityCard.astro.

   Example:
   startup-mixer
   hardware-meetup
   ========================================================= */

export function getCommunityMetricsById(
  events: SiteEvent[],
  communityId: string
) {

  const completedEvents =
    events
      .filter(
        (event) =>
          event.communityId ===
            communityId &&
          isCompletedEvent(
            event
          ) &&
          isLedEvent(
            event
          )
      )
      .sort(
        (a, b) =>
          parseMetricDate(
            b.startDate
          ).getTime() -
          parseMetricDate(
            a.startDate
          ).getTime()
      );


  const registrations =
    completedEvents.reduce(
      (
        total,
        event
      ) =>
        total +
        (
          event.registrations ??
          0
        ),
      0
    );


  const speakers =
    getUniqueSpeakers(
      completedEvents
    );


  const sponsors =
    getUniqueStrings(
      completedEvents.flatMap(
        (event) =>
          event.sponsors ??
          []
      )
    );


  const partners =
    getUniqueStrings(
      completedEvents.flatMap(
        (event) =>
          event.partners ??
          []
      )
    );


  return {

    events:
      completedEvents,

    eventsLed:
      completedEvents.length,

    registrations,

    speakers,

    speakerCount:
      speakers.length,

    sponsors,

    sponsorCount:
      sponsors.length,

    partners,

    partnerCount:
      partners.length

  };

}


/* =========================================================
   PROFESSIONAL / FIELDWORK METRICS

   Used by fieldwork.astro.

   All numbers automatically change as soon as an event
   becomes completed.
   ========================================================= */

export function getProfessionalMetrics(
  events: SiteEvent[]
) {

  const completed =
    events.filter(
      isCompletedEvent
    );


  const hosted =
    completed.filter(
      (event) =>
        getEventParticipation(
          event
        ) ===
          "hosted"
    );


  const coOrganized =
    completed.filter(
      (event) =>
        getEventParticipation(
          event
        ) ===
          "co-organized"
    );


  const exhibited =
    completed.filter(
      (event) =>
        getEventParticipation(
          event
        ) ===
          "exhibitor"
    );


  const attended =
    completed.filter(
      (event) =>
        getEventParticipation(
          event
        ) ===
          "attending"
    );


  const ledEvents =
    completed.filter(
      isLedEvent
    );


  const registrationsLed =
    ledEvents.reduce(
      (
        total,
        event
      ) =>
        total +
        (
          event.registrations ??
          0
        ),
      0
    );


  const ledEventsWithRegistrationData =
    ledEvents.filter(
      (event) =>
        typeof
          event.registrations ===
          "number"
    ).length;


  const speakers =
    getUniqueSpeakers(
      ledEvents
    );


  const sponsors =
    getUniqueStrings(
      ledEvents.flatMap(
        (event) =>
          event.sponsors ??
          []
      )
    );


  const partners =
    getUniqueStrings(
      ledEvents.flatMap(
        (event) =>
          event.partners ??
          []
      )
    );


  /*
   * Organizations engaged now considers all completed
   * fieldwork, not just hosted/co-organized events.
   *
   * For attended/exhibited events this will count any
   * sponsor, partner or speaker-company data that exists
   * on the corresponding event record.
   */

  const organizationNames =
    completed.flatMap(
      (event) => [

        ...(
          event.sponsors ??
          []
        ),

        ...(
          event.partners ??
          []
        ),

        ...(
          event.speakers ??
          []
        ).map(
          (speaker) =>
            speaker.company
        )

      ]
    );


  const organizations =
    getUniqueStrings(
      organizationNames
    );


  const cities =
    getUniqueStrings(
      completed
        .map(
          (event) =>
            event.city ??
            ""
        )
        .filter(
          Boolean
        )
    );


  const years =
    new Set(
      completed.map(
        (event) =>
          parseMetricDate(
            event.startDate
          ).getFullYear()
      )
    );


  return {

    total:
      completed.length,

    hosted:
      hosted.length,

    coOrganized:
      coOrganized.length,

    led:
      ledEvents.length,

    exhibited:
      exhibited.length,

    attended:
      attended.length,

    registrationsLed,

    ledEventsWithRegistrationData,

    speakers:
      speakers.length,

    organizationsEngaged:
      organizations.length,

    sponsors:
      sponsors.length,

    partners:
      partners.length,

    cities:
      cities.length,

    yearsActive:
      years.size

  };

}
