export interface EventRecapSection {
  heading: string;

  body: string[];

  image?: string;

  imageAlt?: string;

  imageCaption?: string;
}


export interface EventRecap {
  slug: string;

  /*
   * Exact event id from src/data/events.ts.
   *
   * This is what connects a recap to an event.
   */
  eventId: string;

  title: string;

  eyebrow?: string;

  published: string;

  excerpt: string;

  readingMinutes: number;

  coverImage?: string;

  coverAlt?: string;

  tags?: string[];

  stats?: Array<{
    value: string;
    label: string;
  }>;

  sections: EventRecapSection[];

  draft?: boolean;
}


/*
 * =========================================================
 * EVENT RECAPS
 * =========================================================
 *
 * To add a recap:
 *
 * 1. Add ONE object below.
 *
 * 2. Set eventId to the exact event id from events.ts.
 *
 * 3. Give the recap a unique slug.
 *
 * 4. Optionally add images under:
 *
 *    public/event-recaps/<slug>/
 *
 * 5. Rebuild / deploy.
 *
 * The Event Recaps index and individual recap page
 * will be generated automatically.
 * =========================================================
 */

export const eventRecaps:
  EventRecap[] =
  [

    {
      slug:
        "san-diego-county-startup-mixer-september-2026",

      eventId:
        "startup-mixer-sep-2026",

      title:
        "San Diego County Startup Mixer — September 2026",

      eyebrow:
        "Event Recap",

      published:
        "2026-09-15",

      excerpt:
        "127 registrations, more than 80 people through the door, and a useful reminder that low-pressure community events can create meaningful connections without turning into a pitch room.",

      readingMinutes:
        4,

      coverImage:
        "/event-recaps/san-diego-county-startup-mixer-september-2026/cover.jpg",

      coverAlt:
        "Attendees talking during the San Diego County Startup Mixer at Harland Brewing.",

      tags:
        [
          "San Diego",
          "Startup Community",
          "Community Building"
        ],

      stats:
        [

          {
            value:
              "127",

            label:
              "Registrations"
          },


          {
            value:
              "80+",

            label:
              "Attendees"
          },


          {
            value:
              "San Diego",

            label:
              "Community"
          }

        ],

      sections:
        [

          {
            heading:
              "What stood out",

            body:
              [
                "This edition of the San Diego County Startup Mixer brought 127 registrations and more than 80 people through the venue over the course of the evening.",

                "The most consistent feedback I heard was about the low-pressure format. People had room to circulate, meet several different groups and have longer conversations without feeling like they needed to pitch themselves or compete for attention."
              ],

            image:
              "/event-recaps/san-diego-county-startup-mixer-september-2026/room.jpg",

            imageAlt:
              "Several groups of attendees having conversations during the San Diego County Startup Mixer.",

            imageCaption:
              "Multiple conversations happening at once — exactly the kind of room I want the mixer to create."
          },


          {
            heading:
              "What I heard from attendees",

            body:
              [
                "I spoke with both first-time attendees and people who have supported the mixer over multiple editions. The common theme was that the no-pitch atmosphere makes the room more approachable, especially for people who are less comfortable with large networking events.",

                "That feedback is useful because it clarifies what should not change as the community grows."
              ],

            image:
              "/event-recaps/san-diego-county-startup-mixer-september-2026/conversation.jpg",

            imageAlt:
              "A one-on-one conversation during the San Diego County Startup Mixer.",

            imageCaption:
              "The event works best when people have enough space and time for real conversations."
          },


          {
            heading:
              "What I want to improve",

            body:
              [
                "The next question is how to create more value without losing the simplicity that people seem to enjoy.",

                "That means experimenting carefully with better introductions, clearer ways for attendees to find relevant people and stronger follow-up after the event — while keeping the evening itself casual."
              ]
          },


          {
            heading:
              "The setting",

            body:
              [
                "Harland Brewing in Bay Park has given the mixer a setting that feels casual enough for people to settle into conversations naturally."
              ],

            image:
              "/event-recaps/san-diego-county-startup-mixer-september-2026/venue.jpg",

            imageAlt:
              "Harland Brewing Co. exterior in Bay Park.",

            imageCaption:
              "Harland Brewing Co., Bay Park."
          }

        ]
    }

  ];


/*
 * =========================================================
 * PUBLISHED RECAPS
 * =========================================================
 */

export const publishedEventRecaps =
  eventRecaps
    .filter(
      (recap) =>

        !recap.draft &&

        new Date(
          `${recap.published}T12:00:00`
        ) <=
          new Date()
    )
    .sort(
      (a, b) =>

        new Date(
          `${b.published}T12:00:00`
        ).getTime() -

        new Date(
          `${a.published}T12:00:00`
        ).getTime()
    );
