export interface SiteEvent {
  id: string;

  title: string;

  role:
    | "hosted"
    | "attending";

  participation?:
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

  /**
   * REQUIRED:
   * Every calendar event must point somewhere.
   */
  url: string;

  buttonLabel?: string;

  typeLabel?: string;

  showOnHome?: boolean;

  /**
   * Add only when you have a registration
   * number you can substantiate.
   */
  registrations?: number;
}


export const events: SiteEvent[] = [

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
      "Exhibiting at CES with a focus on consumer electronics, embedded technologies, acoustics, sensing and hardware commercialization.",

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
      "Exhibiting at AEMS across electronics, manufacturing, automation, components and product-development technologies.",

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
    id:
      "startup-mixer-sep-2026",

    title:
      "San Diego County Startup Mixer",

    role:
      "hosted",

    participation:
      "hosted",

    communityId:
      "startup-mixer",

    startDate:
      "2026-09-14",

    venue:
      "Harland Brewing",

    city:
      "San Diego",

    description:
      "Monthly gathering connecting founders, engineers, investors and operators across the San Diego startup ecosystem.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-5",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    showOnHome:
      true
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
      "Attending Community Event",

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
      "Professional-development and networking session focused on workplace culture and navigating professional environments in the U.S.",

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
      "Harland Brewing",

    city:
      "San Diego",

    description:
      "Monthly gathering connecting founders, engineers, investors and operators across the San Diego startup ecosystem.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-4",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

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

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering in San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-2",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

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
      "San Diego Hardware Meetup | The Road to Scale",

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
      "Co-organized hardware community event focused on the journey from ideation and prototyping through manufacturing and scale.",

    url:
      "https://luma.com/5nonbesc",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

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

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering in San Diego.",

    url:
      "https://eventship.com/host/nadim-abdel-meguid",

    buttonLabel:
      "View Events",

    typeLabel:
      "Hosted Community Event",

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

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering in San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-copy",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

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
      "San Diego Hardware Meetup | Medtech",

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
      "Co-organized hardware meetup focused on medical technology, product design and the path toward patient-ready hardware.",

    url:
      "https://luma.com/5j00ovnt",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

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

    city:
      "San Diego",

    description:
      "Monthly founder and startup ecosystem gathering in San Diego.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer-1",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    showOnHome:
      true
  },


  // =====================================================
  // MARCH 2026
  // =====================================================

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

    city:
      "San Diego",

    description:
      "First event in the recurring San Diego County Startup Mixer series.",

    url:
      "https://eventship.com/event/san-diego-county-startup-mixer",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Community Event",

    showOnHome:
      true
  },


  // =====================================================
  // FEBRUARY 2026
  // =====================================================

  {
    id:
      "hardware-meetup-feb-2026",

    title:
      "San Diego Hardware Meetup | Hardware for Defense",

    role:
      "hosted",

    participation:
      "co-organized",

    communityId:
      "hardware-meetup",

    startDate:
      "2026-02-26",

    venue:
      "Downtown Works Mission Valley",

    city:
      "San Diego",

    description:
      "Co-organized hardware meetup focused on defense and dual-use technologies, with founders and technical product builders.",

    url:
      "https://luma.com/l61iif8f",

    buttonLabel:
      "View Event",

    typeLabel:
      "Co-Organized Hardware Event",

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
      "Hardtech founder discussion focused on funding, pilots, LOIs and commercial traction before full product build.",

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
      "Hardware product-development open house featuring labs, prototyping, engineering and production-ready product development.",

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
      "medtech-mixer-jan-2026",

    title:
      "San Diego Medtech Mixer",

    role:
      "attending",

    participation:
      "attending",

    startDate:
      "2026-01-08",

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
      "Hosted during CES with Voler Systems, Seltech, Innovobot Labs, Sonical and Pisco, bringing together professionals across device design, medtech, wearables, robotics, IoT and embedded systems.",

    url:
      "https://info.volersystems.com/voler-systems-networking-tour-2026-vegas?hs_preview=yXGGYDiG-201589438253",

    buttonLabel:
      "View Event",

    typeLabel:
      "Hosted Industry Event",

    registrations:
      200,

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
      "simbiosyx-oct-2025",

    title:
      "Simbiosyx: Startup & Expert Matching",

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
      "Startup and expert matchmaking event focused on connecting early-stage companies with technical, scientific and commercialization expertise.",

    url:
      "https://eventship.com/event/simbiosyx-matching-startups-with-verified-experts-to-fuel-innovation-1",

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
      "2025-09-04",

    endDate:
      "2025-09-06",

    venue:
      "Colorado Convention Center",

    city:
      "Denver",

    description:
      "Industry engagement across smart-home technology, audio, connected devices and product integration.",

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
      "Exhibited with Seltech at a major sensing, electronics and embedded-systems industry event.",

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
