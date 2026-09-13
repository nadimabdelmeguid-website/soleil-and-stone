import type {
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


  return end < new Date();

}


export function getEventParticipation(
  event: SiteEvent
): EventParticipation {

  return event.participation;

}


/*
 * Calendar display priority:
 *
 * 3 = hosted / co-organized
 * 2 = exhibitor
 * 1 = attending
 */

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


export function getProfessionalMetrics(
  events: SiteEvent[]
) {

  /*
   * Community metrics intentionally count
   * completed events only.
   */

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
        ) === "co-organized"
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


  /*
   * Events where you had a leadership role.
   */

  const ledEvents =
    completed.filter(
      (event) => {

        const participation =
          getEventParticipation(
            event
          );


        return (
          participation === "hosted" ||
          participation === "co-organized"
        );

      }
    );


  /*
   * Total registrations across
   * hosted / co-organized events.
   */

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


  /*
   * All documented speakers attached
   * to completed events you led.
   */

  const speakers =
    ledEvents.flatMap(
      (event) =>
        event.speakers ??
        []
    );


  /*
   * Unique organizations that directly
   * participated in events you led.
   *
   * Includes:
   * - event sponsors
   * - organizations represented by speakers
   *
   * Duplicate company names are removed.
   */

  const organizationNames =
    ledEvents.flatMap(
      (event) => [

        ...(
          event.sponsors ??
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


  const uniqueOrganizations =
    new Set(
      organizationNames
        .map(
          (organization) =>
            organization
              .trim()
              .toLowerCase()
        )
        .filter(Boolean)
    );


  /*
   * Geographic professional footprint.
   */

  const cities =
    new Set(
      completed
        .map(
          (event) =>
            event.city
              ?.trim()
              .toLowerCase()
        )
        .filter(
          (
            city
          ): city is string =>
            Boolean(city)
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
      hosted.length +
      coOrganized.length,

    exhibited:
      exhibited.length,

    attended:
      attended.length,

    registrationsLed,

    speakers:
      speakers.length,

    organizationsEngaged:
      uniqueOrganizations.size,

    cities:
      cities.size

  };

}
