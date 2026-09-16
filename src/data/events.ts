import syncedEvents from "./events.synced";

export interface EventSpeaker {
  name: string;
  title?: string;
  company: string;
}

export interface SiteEvent {
  id: string;

  title: string;

  role:
    | "hosted"
    | "attending";

  participation:
    | "hosted"
    | "co-organized"
    | "exhibitor"
    | "attending";

  communityId?: string;

  startDate: string;

  endDate?: string;

  venue?: string;

  city?: string;

  description?: string;

  url: string;

  buttonLabel?: string;

  typeLabel?: string;

  showOnHome?: boolean;

  registrations?: number;

  sponsors?: string[];

  partners?: string[];

  speakers?: EventSpeaker[];

  organizers?: string[];

  address?: string;

  image?: string;

  eventType?:
    | "trade-show"
    | "community"
    | "startup"
    | "technical"
    | "professional"
    | "industry";
}

export type SyncedEventPatch = Partial<
  Pick<
    SiteEvent,
    | "title"
    | "startDate"
    | "endDate"
    | "venue"
    | "city"
    | "address"
    | "image"
    | "registrations"
    | "speakers"
    | "sponsors"
    | "organizers"
    | "description"
  >
>;


export const eventSeeds: SiteEvent[] = [
  // =====================================================
  // 2027
  // =====================================================


  // =====================================================
  // JANUARY 2027
  // =====================================================

  {
    id:
      "ces-2027",

    title:
      "CES 2027",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2027-01-06",

    endDate:
      "2027-01-09",

    venue:
      "Las Vegas Convention Center",

    city:
      "Las Vegas",

    description:
      "Exhibiting at CES across consumer electronics, embedded technologies, acoustics, sensing and hardware commercialization.",

    url:
      "https://www.ces.tech/",

    buttonLabel:
      "View CES",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  },



  // =====================================================
  // 2026
  // =====================================================


  // =====================================================
  // NOVEMBER 2026
  // =====================================================

  {
    id:
      "aems-2026",

    title:
      "Anaheim Electronics & Manufacturing Show 2026",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2026-11-10",

    endDate:
      "2026-11-11",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Exhibiting at AEMS across electronics, manufacturing, components, medical technology and product-development technologies.",

    url:
      "https://www.anaheimshow.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  },


  {
    id:
      "san-diego-startup-week-2026",

    title:
      "San Diego Startup Week",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-11-02",

    endDate:
      "2026-11-06",

    city:
      "San Diego",

    description:
      "Founder, investor, startup and ecosystem programming across San Diego.",

    url:
      "https://sandiegostartupweek.org/",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Ecosystem Event",

    showOnHome:
      true
  },



  // =====================================================
  // OCTOBER 2026
  // =====================================================

  {
    id:
      "la-tech-week-2026",

    title:
      "LA Tech Week",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-10-12",

    endDate:
      "2026-10-18",

    venue:
      "Various Venues",

    city:
      "Los Angeles",

    description:
      "A week of founder, investor and technology events across the Los Angeles innovation ecosystem.",

    url:
      "https://www.tech-week.com/",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Ecosystem Event",

    showOnHome:
      true
  },



  // =====================================================
  // SEPTEMBER 2026
  // =====================================================

  {
    id:
      "embedded-world-na-2026",

    title:
      "embedded world North America",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-09-22",

    endDate:
      "2026-09-24",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Embedded systems, electronics, IoT, hardware and software exhibition and technical conference.",

    url:
      "https://embedded-world-na.com/",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Trade Show",

    showOnHome:
      true
  },


 {
  id: "startup-mixer-sep-2026",
  title: "San Diego County Startup Mixer",
  role: "hosted",
  participation: "hosted",
  communityId: "startup-mixer",
  startDate: "2026-09-14",
  venue: "Harland Brewing Co. - Bay Park",
  city: "San Diego",

  description:
    "Monthly gathering connecting founders, tech professionals, investors and people interested in the growing San Diego startup ecosystem.",

  url:
    "https://eventship.com/event/san-diego-county-startup-mixer-5",

  buttonLabel: "View Event",
  typeLabel: "Hosted Community Event",
  registrations: 127,
  showOnHome: true
},


  {
    id:
      "astra-commons-san-diego-2026",

    title:
      "Astra Commons: San Diego",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-09-13",

    venue:
      "Caffè Calabria",

    city:
      "San Diego",

    description:
      "Builder gathering connecting developers, founders, students and community members around AI and software development.",

    url:
      "https://luma.com/tasj011w?tk=E8RFCm",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Builder Event",

    showOnHome:
      true
  },


  {
    id:
      "vibecraft-sep-2026",

    title:
      "VibeCraft",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-09-09",

    city:
      "San Diego",

    description:
      "Builder and startup showcase within San Diego's technology community.",

    url:
      "https://eventship.com/event/vibecraft-slopathon-compete-for-a-chance-to-win-big?code=VIBE20",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Builder Event",

    showOnHome:
      true
  },



  // =====================================================
  // AUGUST 2026
  // =====================================================

  {
    id:
      "founders-fire-aug-2026",

    title:
      "Founders Fire Daytime Demo Day",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-08-29",

    city:
      "San Diego",

    description:
      "Founder demo day and showcase for startups, builders and makers across the San Diego ecosystem.",

    url:
      "https://eventship.com/event/founders-fire-daytime-demo-day",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Startup Event",

    showOnHome:
      true
  },


  {
    id:
      "howl-house-aug-2026",

    title:
      "Howl House | End of Summer Party",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-08-27",

    city:
      "San Diego",

    description:
      "Technology and startup community gathering bringing together founders, operators and ecosystem participants.",

    url:
      "https://eventship.com/event/howl-house-san-diego-s-top-tech-party",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Ecosystem Event",

    showOnHome:
      true
  },


  {
    id:
      "insider-series-aug-2026",

    title:
      "The Insider Series: U.S. Workplace Culture",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-08-15",

    city:
      "San Diego",

    description:
      "Professional-development and networking session focused on workplace culture and navigating professional environments in the United States.",

    url:
      "https://eventship.com/event/the-insider-series-u-s-workplace-culture-confidence-for-international-professionals",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Professional Event",

    showOnHome:
      true
  },


  {
    id:
      "startup-mixer-aug-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-08-10",

    venue:
      "Harland Brewing Co. - Bay Park",

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering focused on low-pressure networking, new connections and sharing what people are building across San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-4",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    registrations:
      58,

    showOnHome:
      true
  },



  // =====================================================
  // JULY 2026
  // =====================================================

  {
    id:
      "startup-mixer-jul-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-07-13",

    venue:
      "Harland Brewing Co. - Bay Park",

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering focused on making useful connections across San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-2",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    registrations:
      97,

    showOnHome:
      true
  },


  {
    id:
      "founder-fridays-jul-2026",

    title:
      "Founder Fridays",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-07-10",

    city:
      "Solana Beach",

    description:
      "Founder gathering centered on peer learning, introductions and startup resource sharing.",

    url:
      "https://eventship.com/event/founder-fridays-6",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Founder Event",

    showOnHome:
      true
  },



  // =====================================================
  // JUNE 2026
  // =====================================================

  {
    id:
      "hardware-meetup-jun-2026",

    title:
      "10th San Diego Hardware Meetup | The Road to Scale: San Diego's Zero-to-One Hardware Story",

    role:
      "hosted",

    participation:
      "co-organized",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-06-25",

    venue:
      "Pure Project Vista",

    city:
      "Vista",

    description:
      "Co-organized hardware community program focused on the path from ideation and prototyping through manufacturing, commercialization and scale.",

    url:
      "https://luma.com/5nonbesc",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

    registrations:
      87,

    sponsors: [
      "SEACOMP"
    ],

    speakers: [
      {
        name:
          "Alex Cordeiro",

        title:
          "Industrial Designer & Founder",

        company:
          "dip"
      },

      {
        name:
          "Derek Jackson",

        title:
          "VP of Sales",

        company:
          "SEACOMP"
      },

      {
        name:
          "Aliasgar Morbi, Ph.D.",

        title:
          "Co-Founder",

        company:
          "Velavu"
      }
    ],

    showOnHome:
      true
  },


  {
    id:
      "infocomm-2026",

    title:
      "InfoComm 2026",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-06-13",

    endDate:
      "2026-06-19",

    venue:
      "Las Vegas Convention Center",

    city:
      "Las Vegas",

    description:
      "Professional AV trade show spanning audio, video, conferencing, digital signage, AV networking, live events, integration and connected technologies.",

    url:
      "https://www.infocommshow.org/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
  id:
    "startup-mixer-jun-2026",

  title:
    "San Diego County Startup Mixer",

  role:
    "hosted",

  participation:
    "hosted",

  communityId:
    "startup-mixer",

  startDate:
    "2026-06-08",

  venue:
    "Harland Brewing Co. - Bay Park",

  city:
    "San Diego",

  description:
    "Monthly founder and startup ecosystem gathering focused on networking, potential co-founder connections and sharing what people are building across San Diego.",

  url:
    "https://eventship.com/event/san-diego-county-startup-mixer-3",

  buttonLabel:
    "View Event",

  typeLabel:
    "Hosted Community Event",

  registrations:
    73,

  showOnHome:
    true
},



  // =====================================================
  // MAY 2026
  // =====================================================

  {
    id:
      "startup-mixer-may-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-05-11",

    venue:
      "Harland Brewing Co. - Bay Park",

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering focused on low-pressure networking, co-founder matching and sharing what people are building in San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-copy",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    registrations:
      93,

    showOnHome:
      true
  },



  // =====================================================
  // APRIL 2026
  // =====================================================

  {
    id:
      "hardware-meetup-apr-2026",

    title:
      "9th San Diego Hardware Meetup | Medtech - Pathway to Patient-Ready",

    role:
      "hosted",

    participation:
      "co-organized",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-04-30",

    venue:
      "Expertise Engineering",

    city:
      "San Diego",

    description:
      "Co-organized hardware meetup focused on medical technology, industrial design, product development and the path toward patient-ready hardware.",

    url:
      "https://luma.com/5j00ovnt",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

    registrations:
      57,

    sponsors: [
      "Expertise Engineering"
    ],

    speakers: [
      {
        name:
          "Kaheawai Kaonohi",

        title:
          "Founder & CEO",

        company:
          "The Disabled Soloist"
      },

      {
        name:
          "Young Lee",

        title:
          "Lead Industrial Designer",

        company:
          "Dexcom"
      },

      {
        name:
          "Brian Coullahan",

        title:
          "Director, Regional Market Development",

        company:
          "Element Biosciences"
      }
    ],

    showOnHome:
      true
  },


  {
    id:
      "startup-mixer-apr-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-04-13",

    venue:
      "Harland Brewing Co. - Bay Park",

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering focused on low-pressure networking, potential co-founder matching and sharing what people are building in San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-1",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    registrations:
      53,

    showOnHome:
      true
  },



  // =====================================================
  // MARCH 2026
  // =====================================================

  {
    id:
      "isc-west-2026",

    title:
      "ISC West 2026",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-03-23",

    endDate:
      "2026-03-27",

    venue:
      "The Venetian Expo",

    city:
      "Las Vegas",

    description:
      "Security-industry trade show spanning physical security, access control, surveillance, connected systems, public safety and emerging security technologies.",

    url:
      "https://www.discoverisc.com/west/en-us.html",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "medtech-mixer-mar-2026",

    title:
      "San Diego Medtech Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-03-19",

    city:
      "San Diego",

    description:
      "San Diego medical technology ecosystem gathering connecting founders, engineers, clinicians and investors.",

    url:
      "https://eventship.com/event/san-diego-medtech-mixer-2",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Medtech Event",

    showOnHome:
      true
  },


  {
    id:
      "iwce-2026",

    title:
      "IWCE 2026",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-03-18",

    endDate:
      "2026-03-19",

    venue:
      "Las Vegas Convention Center",

    city:
      "Las Vegas",

    description:
      "Critical communications and connectivity trade show covering wireless systems, public safety communications, infrastructure, networking and connected technologies.",

    url:
      "https://iwceexpo.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "north-county-startup-mixer-mar-2026",

    title:
      "North County SD Startup Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-03-17",

    city:
      "Encinitas",

    description:
      "Regional startup ecosystem gathering for founders, investors, builders and community supporters.",

    url:
      "https://eventship.com/event/hussein-s-north-county-sd-startup-mixer-march-2026",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Startup Event",

    showOnHome:
      true
  },


  {
    id:
      "startup-mixer-mar-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-03-16",

    venue:
      "Harland Brewing Co. - Bay Park",

    city:
      "San Diego",

    description:
      "The return of the San Diego County Startup Mixer series, bringing together founders, tech professionals, investors and people interested in the local startup ecosystem.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    registrations:
      85,

    showOnHome:
      true
  },



  // =====================================================
  // FEBRUARY 2026
  // =====================================================
{
  id:
    "ieee-deepwater-exploration-feb-2026",

  title:
    "Cheers Oceaneers! Feb: DWE - DeepWater Exploration",

  role:
    "attending",

  participation:
    "attending",

  startDate:
    "2026-02-17",

  venue:
    "Quantum Brewing",

  city:
    "San Diego",

  description:
    "IEEE San Diego technical meetup focused on deep-water exploration, subsea systems, sensing, communications, autonomy, power systems and ocean-engineering technologies.",

  url:
    "https://www.meetup.com/san-diego-ieee-meetup/events/312492316/",

  buttonLabel:
    "View Event",

  typeLabel:
    "Attending Engineering Event",

  showOnHome:
    true
},
  {
    id:
      "hardware-meetup-feb-2026",

    title:
      "8th San Diego Hardware Meetup | Hardware for Defense",

    role:
      "hosted",

    participation:
      "co-organized",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-02-26",

    venue:
      "Downtown Works - Mission Valley",

    city:
      "San Diego",

    description:
      "Co-organized hardware meetup focused on defense and dual-use technologies, bringing together founders, engineers and technical product builders.",

    url:
      "https://luma.com/l61iif8f",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

    registrations:
      44,

    sponsors: [
      "Downtown Works"
    ],

    partners: [
      "informal"
    ],

    speakers: [
      {
        name:
          "Tom Cotton",

        title:
          "Lead Product Engineer",

        company:
          "Motive Labs"
      },

      {
        name:
          "Clayton Karmel",

        title:
          "Founder",

        company:
          "Dronekyll"
      },

      /*
       * Ryan Roberts was identified in the
       * event material you provided.
       */
      {
        name:
          "Ryan Roberts",

        title:
          "CEO",

        company:
          "QHR"
      }
    ],

    showOnHome:
      true
  },


  {
    id:
      "hardtech-seattle-feb-2026",

    title:
      "Hardtech in Seattle: Funding & Traction Before You Can Build",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-02-20",

    venue:
      "Virtual",

    city:
      "Seattle",

    description:
      "Hardtech founder discussion focused on funding, pilots, letters of intent and commercial traction before full product build.",

    url:
      "https://luma.com/13fmeea7?tk=KQfQmu",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Hardtech Event",

    showOnHome:
      true
  },


  {
    id:
      "north-county-startup-mixer-feb-2026",

    title:
      "North County SD Startup Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-02-17",

    city:
      "Encinitas",

    description:
      "Regional startup ecosystem gathering for founders, investors, builders and supporters.",

    url:
      "https://eventship.com/event/hussein-s-north-county-sd-startup-mixer-feb-2026",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Startup Event",

    showOnHome:
      true
  },


  {
    id:
      "mdm-west-2026",

    title:
      "MD&M West 2026",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-02-03",

    endDate:
      "2026-02-05",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Advanced manufacturing and medical-device trade show spanning medtech, automation, plastics, packaging, design engineering and manufacturing technologies.",

    url:
      "https://www.mdmwest.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "founder-fridays-feb-2026",

    title:
      "Founder Fridays",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-02-06",

    city:
      "Solana Beach",

    description:
      "Founder-led startup community gathering centered on peer learning, introductions and resource sharing.",

    url:
      "https://eventship.com/event/founder-fridays-1",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Founder Event",

    showOnHome:
      true
  },



  // =====================================================
  // JANUARY 2026
  // =====================================================

  {
    id:
      "hardware-open-house-jan-2026",

    title:
      "Hardware Open House | Expertise Engineering",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-01-30",

    venue:
      "Expertise Engineering",

    city:
      "San Diego",

    description:
      "Hardware product-development open house featuring prototyping, engineering and production-oriented product development.",

    url:
      "https://eventship.com/event/in-n-out-cookout-open-house",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Hardware Event",

    showOnHome:
      true
  },


  {
    id:
      "north-county-startup-mixer-jan-2026",

    title:
      "North County SD Startup Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-01-21",

    city:
      "Encinitas",

    description:
      "Regional startup gathering connecting founders, investors, builders and community supporters.",

    url:
      "https://eventship.com/event/hussein-s-north-county-sd-startup-mixer-jan-2026",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Startup Event",

    showOnHome:
      true
  },


  {
    id:
      "namm-show-2026",

    title:
      "The NAMM Show 2026",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-01-20",

    endDate:
      "2026-01-24",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Global music-products and professional-audio trade show spanning musical instruments, audio technology, live sound, entertainment technology and product innovation.",

    url:
      "https://www.namm.org/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "medtech-mixer-jan-2026",

    title:
      "San Diego Medtech Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-01-15",

    city:
      "San Diego",

    description:
      "Medical technology ecosystem gathering connecting founders, engineers, clinicians and investors.",

    url:
      "https://eventship.com/event/san-diego-medtech-mixer",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Medtech Event",

    showOnHome:
      true
  },


  {
    id:
      "voler-networking-ces-2026",

    title:
      "Voler Systems Networking Stravaganza at CES",

    role:
      "hosted",

    participation:
      "hosted",

    startDate:
      "2026-01-07",

    venue:
      "Seltech Hospitality Suite at The Palazzo",

    city:
      "Las Vegas",

    description:
      "Industry networking event hosted during CES, connecting professionals across device design, medtech, wearables, robotics, IoT and embedded systems.",

    url:
      "https://info.volersystems.com/voler-systems-networking-tour-2026-vegas?hs_preview=yXGGYDiG-201589438253",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Industry Event",

    registrations:
      203,

    partners: [
      "Voler Systems",
      "Seltech",
      "Innovobot Labs",
      "Sonical",
      "Pisco"
    ],

    showOnHome:
      true
  },


  {
    id:
      "ces-2026",

    title:
      "CES 2026",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2026-01-06",

    endDate:
      "2026-01-09",

    venue:
      "Las Vegas Convention Center",

    city:
      "Las Vegas",

    description:
      "Exhibited with Seltech across consumer electronics, sensing, acoustics, embedded systems and hardware product development.",

    url:
      "https://www.ces.tech/",

    buttonLabel:
      "View CES",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  },



  // =====================================================
  // 2025
  // =====================================================


  // =====================================================
  // NOVEMBER 2025
  // =====================================================

  {
    id:
      "life-sciences-tea-chat-nov-2025",

    title:
      "Life Sciences Tea Chat",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-11-21",

    city:
      "San Diego",

    description:
      "Life sciences and health technology gathering focused on innovators, entrepreneurs and local experts.",

    url:
      "https://eventship.com/event/11-21-25-a-tea-chat-for-life-sciences-maggie-teske-the-invention-of-tarragon",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Life Sciences Event",

    showOnHome:
      true
  },


  {
    id:
      "business-networking-nov-2025",

    title:
      "San Diego Business Networking Group",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-11-20",

    city:
      "San Diego",

    description:
      "Regional professional networking gathering connecting business owners, professionals and local operators.",

    url:
      "https://eventship.com/event/11-20-25-san-diego-s-fastest-growing-business-networking-group",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Professional Event",

    showOnHome:
      true
  },


  {
    id:
      "medtech-mixer-nov-2025",

    title:
      "San Diego Medtech Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-11-13",

    city:
      "San Diego",

    description:
      "Medical technology ecosystem gathering connecting founders, engineers, clinicians and investors.",

    url:
      "https://eventship.com/event/11-13-25-san-diego-medtech-mixer",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Medtech Event",

    showOnHome:
      true
  },



  // =====================================================
  // OCTOBER 2025
  // =====================================================

  {
  id:
    "startups-in-action-oct-2025",

  title:
    "Startups in Action: Present Your Idea. Pitch. Network and More.",

  role:
    "attending",

  participation:
    "attending",

  startDate:
    "2025-10-29",

  venue:
    "SURF Incubator",

  city:
    "Seattle",

  description:
    "Startup ecosystem event focused on MVP showcases, pitch practice, product validation, co-founder search, fundraising, peer feedback and founder support.",

  url:
    "https://www.meetup.com/startups-and-action/events/310961895/",

  buttonLabel:
    "View Event",

  typeLabel:
    "Attending Startup Event",

  showOnHome:
    true
},
  {
    id:
      "iacp-2025",

    title:
      "IACP 2025 Annual Conference and Exposition",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-10-18",

    endDate:
      "2025-10-21",

    city:
      "Denver",

    description:
      "Public-safety and law-enforcement conference and exposition covering communications, safety technologies, operational systems, equipment and emerging public-safety solutions.",

    url:
      "https://www.theiacpconference.org/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "westec-2025",

    title:
      "WESTEC 2025",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-10-07",

    endDate:
      "2025-10-09",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Manufacturing technology trade show focused on machining, automation, production equipment, advanced manufacturing and industrial technologies.",

    url:
      "https://west.mtseries.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    eventType:
      "trade-show",

    showOnHome:
      true
  },


  {
    id:
      "simbiosyx-oct-2025",

    title:
      "Seamless Connections: AI-Powered Matchmaking Between Startups and Experts",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-10-07",

    venue:
      "Aquillius",

    city:
      "San Diego",

    description:
      "Innovation ecosystem event exploring AI-powered matchmaking between startups and technical, scientific, regulatory and commercialization experts.",

    url:
      "https://eventship.com/event/10-07-25-seamless-connections-ai-powered-matchmaking-between-startups-and-experts",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Innovation Event",

    showOnHome:
      true
  },



  // =====================================================
  // SEPTEMBER 2025
  // =====================================================

  {
    id:
      "aems-2025",

    title:
      "Anaheim Electronics & Manufacturing Show 2025",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2025-09-24",

    endDate:
      "2025-09-25",

    venue:
      "Anaheim Convention Center",

    city:
      "Anaheim",

    description:
      "Exhibited with Seltech across electronics, manufacturing, components and product-development technologies.",

    url:
      "https://www.anaheimshow.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  },


 {
  id:
    "cedia-expo-2025",

  title:
    "CEDIA Expo 2025",

  role:
    "attending",

  participation:
    "attending",

  startDate:
    "2025-09-03",

  endDate:
    "2025-09-06",

  venue:
    "Colorado Convention Center",

  city:
    "Denver",

  description:
    "Industry engagement across smart-home technology, professional audio, connected devices and product integration.",

  url:
    "https://cediaexpo.com/",

  buttonLabel:
    "View Show",

  typeLabel:
    "Attending Trade Show",

  showOnHome:
    true
},



  // =====================================================
  // JULY 2025
  // =====================================================

  {
    id:
      "north-county-startup-mixer-jul-2025",

    title:
      "North County SD Startup Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-07-16",

    city:
      "Encinitas",

    description:
      "Startup ecosystem gathering bringing together founders, investors, builders and community supporters.",

    url:
      "https://eventship.com/event/07-16-25-hussein-s-startup-mixer-july-2025",

    buttonLabel:
      "View Event",

    typeLabel:
      "Attending Startup Event",

    showOnHome:
      true
  },



  // =====================================================
  // JUNE 2025
  // =====================================================

  {
    id:
      "sensors-converge-2025",

    title:
      "Sensors Converge 2025",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2025-06-24",

    endDate:
      "2025-06-26",

    venue:
      "Santa Clara Convention Center",

    city:
      "Santa Clara",

    description:
      "Exhibited with Seltech at an industry event spanning sensing, electronics, embedded systems and connected technologies.",

    url:
      "https://www.sensorsconverge.com/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  },



  // =====================================================
  // MARCH 2025
  // =====================================================

  {
    id:
      "verticon-2025",

    title:
      "VERTICON 2025",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2025-03-10",

    endDate:
      "2025-03-13",

    venue:
      "Kay Bailey Hutchison Convention Center",

    city:
      "Dallas",

    description:
      "Industry engagement at the global vertical-aviation conference and trade show.",

    url:
      "https://verticon.org/",

    buttonLabel:
      "View Show",

    typeLabel:
      "Attending Trade Show",

    showOnHome:
      true
  },



  // =====================================================
  // JANUARY 2025
  // =====================================================

  {
    id:
      "ces-2025",

    title:
      "CES 2025",

    role:
      "attending",

    participation:
      "exhibitor",

    startDate:
      "2025-01-07",

    endDate:
      "2025-01-10",

    venue:
      "Las Vegas Convention Center",

    city:
      "Las Vegas",

    description:
      "Exhibited with Kickmaker across consumer electronics, robotics, embedded systems and emerging hardware technologies.",

    url:
      "https://www.ces.tech/",

    buttonLabel:
      "View CES",

    typeLabel:
      "Exhibitor",

    showOnHome:
      true
  }

];

function hasItems<T>(
  value:
    | T[]
    | undefined
): value is T[] {
  return (
    Array.isArray(
      value
    ) &&
    value.length > 0
  );
}

function mergeSyncedEvent(
  event: SiteEvent
): SiteEvent {
  const synced =
    (
      syncedEvents as Record<
        string,
        SyncedEventPatch
      >
    )[event.id];

  if (!synced) {
    return event;
  }

  return {
    ...event,

    title:
      synced.title ??
      event.title,

    startDate:
      synced.startDate ??
      event.startDate,

    endDate:
      synced.endDate ??
      event.endDate,

    venue:
      synced.venue ??
      event.venue,

    city:
      synced.city ??
      event.city,

    address:
      synced.address ??
      event.address,

    image:
      synced.image ??
      event.image,

    registrations:
      synced.registrations ??
      event.registrations,

    speakers:
      hasItems(
        synced.speakers
      )
        ? synced.speakers
        : event.speakers,

    sponsors:
      hasItems(
        synced.sponsors
      )
        ? synced.sponsors
        : event.sponsors,

    organizers:
      hasItems(
        synced.organizers
      )
        ? synced.organizers
        : event.organizers,

    // Keep your curated description whenever one exists.
    description:
      event.description ??
      synced.description
  };
}

export const events: SiteEvent[] =
  eventSeeds.map(
    mergeSyncedEvent
  );
