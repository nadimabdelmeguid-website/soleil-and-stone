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

  if (
    event.participation
  ) {

    return event.participation;

  }


  const label =
    (
      event.typeLabel ??
      ""
    ).toLowerCase();


  if (
    label.includes(
      "exhibitor"
    )
  ) {

    return "exhibitor";

  }


  if (
    label.includes(
      "co-organized"
    )
  ) {

    return "co-organized";

  }


  if (
    event.role ===
    "hosted"
  ) {

    return "hosted";

  }


  return "attending";

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
   * Only events you led:
   * hosted + co-organized.
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
   * Total registrations across events led.
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
   * Number of led events for which
   * registration data is available.
   */

  const ledEventsWithRegistrationData =
    ledEvents.filter(
      (event) =>
        typeof event.registrations ===
        "number"
    ).length;


  const cities =
    new Set(
      completed
        .map(
          (event) =>
            event.city?.trim()
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

    ledEventsWithRegistrationData,

    cities:
      cities.size

  };

}
