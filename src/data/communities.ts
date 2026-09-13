export interface Community {
  id: string;

  name: string;

  role: string;

  description: string;

  members: number;

  linkedinFollowers?: number;

  primaryUrl: string;

  primaryLabel: string;

  secondaryUrl?: string;

  secondaryLabel?: string;

  focus: string[];
}


export const communities: Community[] = [

  {
    id:
      "startup-mixer",

    name:
      "San Diego County Startup Mixer",

    role:
      "Hosted Since March 2026",

    description:
      "A recurring gathering designed to make it easier for founders, engineers, investors, operators and people exploring the San Diego startup ecosystem to meet in a relaxed, low-pressure setting.",

    members:
      300,

    primaryUrl:
      "https://eventship.com/host/nadim-abdel-meguid",

    primaryLabel:
      "View Upcoming Mixers",

    secondaryUrl:
      "/?type=partnership#contact",

    secondaryLabel:
      "Partner With The Mixer",

    focus: [
      "Founder & operator connections",
      "Thoughtful introductions",
      "Low-pressure networking",
      "Local ecosystem building",
      "Recurring community touchpoints",
      "Cross-industry conversations"
    ]
  },


  {
    id:
      "hardware-meetup",

    name:
      "San Diego Hardware Meetup",

    role:
      "Co-Organized Since January 2026",

    description:
      "A technical community bringing together hardware founders, engineers, designers, manufacturers and product leaders around the challenges of building and scaling physical products.",

    members:
      300,

    linkedinFollowers:
      75,

    primaryUrl:
      "https://luma.com/sd-hardware-meetup",

    primaryLabel:
      "View Hardware Meetup",

    secondaryUrl:
      "/?type=partnership#contact",

    secondaryLabel:
      "Partner With The Meetup",

    focus: [
      "Hardware commercialization",
      "Product development",
      "Design & engineering",
      "Manufacturing & scale",
      "Technical founder conversations",
      "Industry knowledge sharing"
    ]
  }

];
