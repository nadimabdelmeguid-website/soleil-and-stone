import type {
  SiteEvent
} from "../data/events";


export function parseDate(
  value: string
) {

  return new Date(
    `${value}T12:00:00`
  );

}


export function isPastEvent(
  event: SiteEvent
) {

  const end =
    parseDate(
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


export function completedHostedEventCount(
  events: SiteEvent[],
  communityId: string,
  year: number
) {

  const now =
    new Date();


  return events.filter(
    event => {

      if (
        event.role !== "hosted" ||
        event.communityId !== communityId
      ) {
        return false;
      }


      const date =
        parseDate(
          event.endDate ??
          event.startDate
        );


      return (
        date <= now &&
        date.getFullYear() === year
      );

    }
  ).length;

}
