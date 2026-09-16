import {
  publishedEventRecaps
} from "../data/eventRecaps";


export function getEventRecapByEventId(
  eventId: string
) {

  return publishedEventRecaps.find(
    (recap) =>
      recap.eventId ===
        eventId
  );

}


export function getEventRecapUrl(
  eventId: string
) {

  const recap =
    getEventRecapByEventId(
      eventId
    );


  return recap
    ? `/event-recaps/${recap.slug}/`
    : null;

}
