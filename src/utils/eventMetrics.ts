import type {
  EventSpeaker,
  SiteEvent
} from "../data/events";

export type EventParticipation =
  | "hosted"
  | "co-organized"
  | "exhibitor"
  | "attending";

export function parseMetricDate(
  value: string
) {
  return new Date(
    `${value}T12:00:00`
  );
}

export function isCompletedEvent(
  event: SiteEvent
) {
  const end = parseMetricDate(
    event.endDate ??
      event.startDate
  );

  end.setHours(
    23,
    59,
    59,
    999
  );

  return end < new Date();
}

export function getEventParticipation(
  event: SiteEvent
): EventParticipation {
  return event.participation;
}

export function getParticipationPriority(
  event: SiteEvent
) {
  const participation =
    getEventParticipation(
      event
    );

  if (
    participation === "hosted" ||
    participation === "co-organized"
  ) {
    return 3;
  }

  if (
    participation === "exhibitor"
  ) {
    return 2;
  }

  return 1;
}

export function isLedEvent(
  event: SiteEvent
) {
  const participation =
    getEventParticipation(
      event
    );

  return (
    participation === "hosted" ||
    participation === "co-organized"
  );
}

export function isTradeShow(
  event: SiteEvent
) {
  if (
    event.eventType ===
      "trade-show"
  ) {
    return true;
  }

  if (
    event.participation ===
      "exhibitor"
  ) {
    return true;
  }

  const label =
    event.typeLabel
      ?.toLowerCase() ??
    "";

  return (
    label.includes(
      "trade show"
    ) ||
    label.includes(
      "expo"
    ) ||
    label.includes(
      "exhibitor"
    )
  );
}

function uniqueStrings(
  values: string[]
) {
  const map =
    new Map<
      string,
      string
    >();

  values
    .filter(Boolean)
    .forEach(
      (value) => {
        const clean =
          value.trim();

        if (!clean) {
          return;
        }

        const key =
          clean.toLowerCase();

        if (
          !map.has(key)
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
  speakers: EventSpeaker[]
) {
  const map =
    new Map<
      string,
      EventSpeaker
    >();

  speakers.forEach(
    (speaker) => {
      const key =
        speaker.name
          .trim()
          .toLowerCase();

      if (
        !map.has(key)
      ) {
        map.set(
          key,
          speaker
        );
      }
    }
  );

  return Array.from(
    map.values()
  );
}

export function getCommunityMetrics(
  events: SiteEvent[],
  communityId?: string
) {
  const completedEvents =
    events
      .filter(
        isCompletedEvent
      )
      .filter(
        isLedEvent
      )
      .filter(
        (event) =>
          Boolean(
            event.communityId
          )
      )
      .filter(
        (event) =>
          !communityId ||
          event.communityId ===
            communityId
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
    uniqueSpeakers(
      completedEvents.flatMap(
        (event) =>
          event.speakers ??
          []
      )
    );

  const sponsors =
    uniqueStrings(
      completedEvents.flatMap(
        (event) =>
          event.sponsors ??
          []
      )
    );

  const partners =
    uniqueStrings(
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
        ) === "hosted"
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
        ) === "exhibitor"
    );

  const attended =
    completed.filter(
      (event) =>
        getEventParticipation(
          event
        ) === "attending"
    );

  const ledEvents =
    completed.filter(
      isLedEvent
    );

  const tradeShows =
    completed.filter(
      isTradeShow
    );

  const tradeShowsAttended =
    tradeShows.filter(
      (event) =>
        event.participation ===
          "attending"
    );

  const tradeShowsExhibited =
    tradeShows.filter(
      (event) =>
        event.participation ===
          "exhibitor"
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
        typeof event.registrations ===
          "number"
    ).length;

  const speakers =
    uniqueSpeakers(
      ledEvents.flatMap(
        (event) =>
          event.speakers ??
          []
      )
    );

  const organizations =
    uniqueStrings(
      completed.flatMap(
        (event) => [
          ...(event.organizers ?? []),
          ...(event.sponsors ?? []),
          ...(event.partners ?? []),
          ...(event.speakers ?? [])
            .map(
              (speaker) =>
                speaker.company
            )
        ]
      )
    );

  const sponsors =
    uniqueStrings(
      ledEvents.flatMap(
        (event) =>
          event.sponsors ??
          []
      )
    );

  const partners =
    uniqueStrings(
      ledEvents.flatMap(
        (event) =>
          event.partners ??
          []
      )
    );

  const cities =
    uniqueStrings(
      completed.map(
        (event) =>
          event.city ??
          ""
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

    tradeShows:
      tradeShows.length,

    tradeShowsAttended:
      tradeShowsAttended.length,

    tradeShowsExhibited:
      tradeShowsExhibited.length,

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
