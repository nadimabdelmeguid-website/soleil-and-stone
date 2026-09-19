import {
  eventRecapLinks
} from "../data/eventRecapLinks.cms";


export function getEventRecapUrl(
  eventId: string
) {

  return (
    eventRecapLinks[
      eventId as keyof typeof eventRecapLinks
    ] ??
    null
  );

}
