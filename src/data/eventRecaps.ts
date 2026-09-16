export interface EventRecapSection {
  heading: string;

  body: string[];
}


export interface EventRecapCredit {
  label?: string;

  name: string;

  url?: string;
}


export interface EventRecap {
  slug: string;

  /*
   * Must exactly match the event id
   * from src/data/events.ts.
   */
  eventId: string;

  title: string;

  eyebrow?: string;

  published: string;

  excerpt: string;

  readingMinutes: number;

  tags?: string[];

  stats?: Array<{
    value: string;
    label: string;
  }>;

  sections: EventRecapSection[];

  /*
   * Optional credit displayed when photos exist.
   *
   * Example:
   *
   * photoCredit: {
   *   label: "Photography",
   *   name: "Berg",
   *   url: "https://bergitup.com"
   * }
   */
  photoCredit?: EventRecapCredit;

  draft?: boolean;
}


/*
 * =========================================================
 * EVENT RECAPS
 * =========================================================
 *
 * ADDING A NEW RECAP
 *
 * 1. Add one recap object below.
 *
 * 2. eventId must exactly match the id in events.ts.
 *
 * 3. Give the recap a unique slug.
 *
 * 4. Create:
 *
 *    public/event-recaps/<slug>/
 *
 * 5. Add photos using:
 *
 *    cover.jpg
 *    01.jpg
 *    02.jpg
 *    03.jpg
 *    04.jpg
 *
 * Supported:
 *
 *    .jpg
 *    .jpeg
 *    .png
 *    .webp
 *
 * Images are discovered automatically.
 *
 * No image paths need to be entered here.
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

      photoCredit:
        {
          label:
            "Photography",

          name:
            "Berg",

          url:
            "https://bergitup.com"
        },

      sections:
        [

          {
            heading:
              "What stood out",

            body:
              [
                "This edition of the San Diego County Startup Mixer brought 127 registrations and more than 80 people through the venue over the course of the evening.",

                "The most consistent feedback I heard was about the low-pressure format. People had room to circulate, meet several different groups and have longer conversations without feeling like they needed to pitch themselves or compete for attention."
              ]
          },


          {
            heading:
              "What I heard from attendees",

            body:
              [
                "I spoke with both first-time attendees and people who have supported the mixer over multiple editions. The common theme was that the no-pitch atmosphere makes the room more approachable, especially for people who are less comfortable with large networking events.",

                "That feedback is useful because it clarifies what should not change as the community grows."
              ]
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
              ]
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
