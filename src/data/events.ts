export interface SiteEvent {
  id: string;

  title: string;

  role:
    | "hosted"
    | "attending";

  communityId?: string;

  startDate: string;

  endDate?: string;

  venue?: string;

  city?: string;

  description?: string;

  url?: string;

  buttonLabel?: string;

  typeLabel?: string;

  showOnHome?: boolean;
}


export const events: SiteEvent[] = [
{
  id:
    "astra-commons-san-diego-2026",

  title:
    "Astra Commons: San Diego",

  role:
    "attending",

  startDate:
    "2026-09-13",

  venue:
    "Caffè Calabria",

  city:
    "San Diego",

  description:
    "A casual builder meetup bringing together developers, students, founders and community members around the launch of GPT-6 Astra.",

  url:
    "https://luma.com/tasj011w?tk=E8RFCm",

  buttonLabel:
    "View Event",

  typeLabel:
    "Attending Community Event",

  showOnHome:
    true
},
  {
    id: "mixer-2026-03-16",
    title: "San Diego County Startup Mixer",
    role: "hosted",
    communityId: "startup-mixer",
    startDate: "2026-03-16",
    showOnHome: false
  },

  {
    id: "mixer-2026-04-13",
    title: "San Diego County Startup Mixer",
    role: "hosted",
    communityId: "startup-mixer",
    startDate: "2026-04-13",
    showOnHome: false
  },

  {
    id: "mixer-2026-05-11",
    title: "San Diego County Startup Mixer",
    role: "hosted",
    communityId: "startup-mixer",
    startDate: "2026-05-11",
    showOnHome: false
  },

  {
    id: "mixer-2026-06-08",
    title: "San Diego County Startup Mixer",
    role: "hosted",
    communityId: "startup-mixer",
    startDate: "2026-06-08",
    showOnHome: false
  },

  {
    id: "mixer-2026-07-13",
    title: "San Diego County Startup Mixer",
    role: "hosted",
    communityId: "startup-mixer",
    startDate: "2026-07-13",
    showOnHome: false
  },

  {
    id: "mixer-2026-08-10",

    title:
      "San Diego County Startup Mixer",

    role: "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-08-10",

    venue:
      "Harland Brewing Co.",

    city:
      "San Diego, CA",

    description:
      "Monthly startup gathering connecting local founders, engineers, investors and startup talent.",

    url:
      "https://eventship.com/host/nadim-abdel-meguid",

    buttonLabel:
      "View Event",

    showOnHome: true
  },

  {
    id: "mixer-2026-09-14",

    title:
      "San Diego County Startup Mixer",

    role: "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-09-14",

    venue:
      "Harland Brewing Co.",

    city:
      "San Diego, CA",

    description:
      "Monthly casual networking event connecting local entrepreneurs, engineers, and investors across the San Diego startup ecosystem.",

    url:
      "https://eventship.com/host/nadim-abdel-meguid",

    buttonLabel:
      "Register",

    showOnHome: true
  },

  {
    id:
      "hardware-2026-02-26",

    title:
      "San Diego Hardware Meetup",

    role: "hosted",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-02-26",

    showOnHome:
      false
  },

  {
    id:
      "hardware-2026-04-30",

    title:
      "San Diego Hardware Meetup",

    role: "hosted",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-04-30",

    showOnHome:
      false
  },

  {
    id:
      "hardware-2026-06-25",

    title:
      "San Diego Hardware Meetup",

    role: "hosted",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-06-25",

    showOnHome:
      false
  },

  {
    id:
      "vibecraft-2026",

    title:
      "VibeCraft Slopathon & Project Showcase",

    role:
      "attending",

    startDate:
      "2026-09-09",

    venue:
      "Ansir Innovation Center",

    city:
      "San Diego, CA",

    description:
      "Interactive builder competition and showcase connecting San Diego engineers and project creators.",

    showOnHome:
      true
  },

  {
    id:
      "embedded-world-2026",

    title:
      "Embedded World North America",

    role:
      "attending",

    typeLabel:
      "Attending Trade Show",

    startDate:
      "2026-09-22",

    endDate:
      "2026-09-24",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim, CA",

    description:
      "Attending the embedded systems exhibition and conference in Anaheim. Open to connecting on site with hardware engineers and component builders.",

    url:
      "https://embedded-world-na.com/",

    buttonLabel:
      "Event Information",

    showOnHome:
      true
  },

  {
    id:
      "la-tech-week-2026",

    title:
      "LA Tech Week",

    role:
      "attending",

    startDate:
      "2026-10-12",

    endDate:
      "2026-10-18",

    venue:
      "Various Venues",

    city:
      "Los Angeles, CA",

    description:
      "Attending the annual ecosystem gathering connecting founders, investors and innovators across Los Angeles.",

    url:
      "https://www.tech-week.com/calendar/la",

    buttonLabel:
      "Tech Week Calendar",

    showOnHome:
      true
  },

  {
    id:
      "sd-startup-week-2026",

    title:
      "San Diego Startup Week",

    role:
      "attending",

    startDate:
      "2026-11-02",

    endDate:
      "2026-11-06",

    city:
      "San Diego, CA",

    description:
      "Participating in San Diego's flagship annual innovation gathering.",

    showOnHome:
      true
  }
];
