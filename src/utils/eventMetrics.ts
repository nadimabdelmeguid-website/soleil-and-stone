import type {
  SiteEvent
} from "../data/events";


export type EventParticipation =
  | "hosted"
  | "co-organized"
  | "exhibitor"
  | "attending";


/*
 * -------------------------------------------------------
 * DATE HELPERS
 * -------------------------------------------------------
 */

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


  return end <
    new Date();

}


/*
 * -------------------------------------------------------
 * PARTICIPATION
 * -------------------------------------------------------
 */

export function getEventParticipation(
  event: SiteEvent
): EventParticipation {

  return event.participation;

}


/*
 * Calendar viewing priority:
 *
 * 3 = hosted / co-organized
 * 2 = exhibitor
 * 1 = attending
 *
 * If multiple events fall on the same date,
 * the strongest level of involvement controls
 * the calendar color / primary event.
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


/*
 * -------------------------------------------------------
 * PROFESSIONAL METRICS
 * -------------------------------------------------------
 */

export function getProfessionalMetrics(
  events: SiteEvent[]
) {

  /*
   * Metrics intentionally count only completed events.
   *
   * Upcoming events remain visible on the calendar
   * and fieldwork archive but do not inflate the
   * professional track-record metrics.
   */

  const completed =
    events.filter(
      isCompletedEvent
    );


  /*
   * -----------------------------------------------------
   * PARTICIPATION COUNTS
   * -----------------------------------------------------
   */

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
   * Events where you had an organizing /
   * leadership role.
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
   * -----------------------------------------------------
   * REGISTRATIONS
   * -----------------------------------------------------
   *
   * Includes registrations only from completed
   * events you hosted or co-organized.
   *
   * Current documented examples include:
   *
   * - Startup Mixers
   * - Hardware Meetups
   * - Voler CES networking event
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
   * Number of led events for which we have
   * documented registration data.
   */

  const ledEventsWithRegistrationData =
    ledEvents.filter(
      (event) =>
        typeof event.registrations ===
        "number"
    ).length;


  /*
   * -----------------------------------------------------
   * SPEAKERS
   * -----------------------------------------------------
   *
   * Counts documented individual speakers
   * across events you led.
   */

  const speakers =
    ledEvents.flatMap(
      (event) =>
        event.speakers ??
        []
    );


  /*
   * Unique people rather than total appearances.
   *
   * This prevents the metric from becoming inflated
   * if the same speaker returns for another event.
   */

  const uniqueSpeakers =
    new Map<
      string,
      {
        name: string;
        title?: string;
        company: string;
      }
    >();


  speakers.forEach(
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


  /*
   * -----------------------------------------------------
   * ORGANIZATIONS ENGAGED
   * -----------------------------------------------------
   *
   * Only organizations with direct participation
   * in events you hosted / co-organized count.
   *
   * Included:
   * - event sponsors
   * - event partners / collaborators
   * - organizations represented by speakers
   *
   * NOT included:
   * - companies you merely met
   * - companies whose booth you visited
   * - trade-show exhibitors you encountered
   */

  const organizationNames =
    ledEvents.flatMap(
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


  /*
   * Normalize names for deduplication.
   *
   * Example:
   * "SEACOMP" appearing as both sponsor
   * and speaker organization counts once.
   */

  const uniqueOrganizations =
    new Map<
      string,
      string
    >();


  organizationNames
    .filter(Boolean)
    .forEach(
      (organization) => {

        const clean =
          organization.trim();


        const key =
          clean.toLowerCase();


        if (
          !uniqueOrganizations.has(
            key
          )
        ) {

          uniqueOrganizations.set(
            key,
            clean
          );

        }

      }
    );


  /*
   * -----------------------------------------------------
   * SPONSORS
   * -----------------------------------------------------
   */

  const sponsorNames =
    ledEvents.flatMap(
      (event) =>
        event.sponsors ??
        []
    );


  const uniqueSponsors =
    new Set(
      sponsorNames
        .map(
          (sponsor) =>
            sponsor
              .trim()
              .toLowerCase()
        )
        .filter(Boolean)
    );


  /*
   * -----------------------------------------------------
   * PARTNERS / COLLABORATORS
   * -----------------------------------------------------
   */

  const partnerNames =
    ledEvents.flatMap(
      (event) =>
        event.partners ??
        []
    );


  const uniquePartners =
    new Set(
      partnerNames
        .map(
          (partner) =>
            partner
              .trim()
              .toLowerCase()
        )
        .filter(Boolean)
    );


  /*
   * -----------------------------------------------------
   * GEOGRAPHIC FOOTPRINT
   * -----------------------------------------------------
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


  /*
   * -----------------------------------------------------
   * YEARS ACTIVE
   * -----------------------------------------------------
   */

  const years =
    new Set(
      completed.map(
        (event) =>
          parseMetricDate(
            event.startDate
          ).getFullYear()
      )
    );


  /*
   * -----------------------------------------------------
   * RETURN
   * -----------------------------------------------------
   */

  return {

    /*
     * Total completed professional events.
     */
    total:
      completed.length,


    /*
     * Leadership.
     */
    hosted:
      hosted.length,

    coOrganized:
      coOrganized.length,

    led:
      hosted.length +
      coOrganized.length,


    /*
     * Industry participation.
     */
    exhibited:
      exhibited.length,

    attended:
      attended.length,


    /*
     * Measurable community reach.
     */
    registrationsLed,

    ledEventsWithRegistrationData,


    /*
     * External participation.
     */
    speakers:
      uniqueSpeakers.size,

    organizationsEngaged:
      uniqueOrganizations.size,

    sponsors:
      uniqueSponsors.size,

    partners:
      uniquePartners.size,


    /*
     * Geographic / longitudinal activity.
     */
    cities:
      cities.size,

    yearsActive:
      years.size

  };

}
