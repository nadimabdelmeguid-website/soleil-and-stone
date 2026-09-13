/*
  SOLEIL & STONE
  EVENT TEMPLATE

  Copy this object into:

  src/data/events.ts

  Then modify the fields you need.

  Keep events.ts ordered:
  NEWEST → OLDEST
*/


{
  /*
    Must be unique.

    Recommended format:
    event-name-month-year

    Examples:
    startup-mixer-oct-2026
    embedded-world-na-2026
  */

  id:
    "event-name-oct-2026",


  /*
    Name shown on the website.
  */

  title:
    "Event Name",


  /*
    Use:
    "hosted"
    or
    "attending"
  */

  role:
    "attending",


  /*
    Only use communityId when this event belongs
    to one of your communities.

    Options:

    "startup-mixer"
    "hardware-meetup"

    Delete this field for unrelated events.
  */

  communityId:
    "startup-mixer",


  /*
    Format:
    YYYY-MM-DD
  */

  startDate:
    "2026-10-01",


  /*
    Optional.

    Only use for multi-day events.

    Delete if it is a one-day event.
  */

  endDate:
    "2026-10-03",


  /*
    Optional venue.
  */

  venue:
    "Venue Name",


  /*
    City shown on the event card.
  */

  city:
    "San Diego",


  /*
    Short description.

    Keep this to roughly 1–2 sentences.
  */

  description:
    "A short explanation of the event and why it matters.",


  /*
    External registration / event page.

    Delete if there is no useful external link.
  */

  url:
    "https://example.com",


  /*
    Button text.

    Examples:

    View Event
    Register
    Learn More
  */

  buttonLabel:
    "View Event",


  /*
    Optional label for attending events.

    Examples:

    Attending Event
    Attending Trade Show
    Hosted Event
  */

  typeLabel:
    "Attending Event",


  /*
    true:
    show this event in the homepage calendar.

    false:
    keep it in your historical event database,
    but hide it from the homepage.

    Historical hosted events should generally
    remain in events.ts because they contribute
    to community metrics.
  */

  showOnHome:
    true
},
