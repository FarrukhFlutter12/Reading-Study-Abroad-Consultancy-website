/**
 * Single source of truth for business details.
 * Anything still set to "REPLACE_ME" is hidden at render time (see lib/utils.ts → isReady).
 * See CONTENT-NEEDED.md for the full list the client must supply.
 */

export const site = {
  name: "Reading Study Abroad",
  legalName: "Reading Study Abroad",
  tagline: "Read the World with Reading Study Abroad",
  description:
    "Study abroad consultants in Peshawar helping Pakistani students secure admissions and student visas for the UK, Europe, Turkey and South Korea.",
  url: "https://readingstudyabroad.pk",
  address: {
    street: "Basharat Market, Phase 03",
    city: "Hayatabad, Peshawar",
    region: "Khyber Pakhtunkhwa",
    country: "Pakistan",
    mapsQuery: "Basharat Market Phase 3 Hayatabad Peshawar",
  },
  phones: ["+923149659005", "+923160189304"],
  phonesDisplay: ["+92 314 9659005", "+92 316 0189304"],
  whatsapp: "923149659005",
  email: "readingstudyabroad.pk@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/ReadingStudyAbroad.PK/",
    instagram: "REPLACE_ME", // client se handle lena hai
    tiktok: "REPLACE_ME", // client se handle lena hai
  },
  officeHours: "REPLACE_ME", // e.g. "Mon – Sat, 10:00 AM – 6:00 PM"
  foundedYear: "REPLACE_ME",
  stats: {
    studentsPlaced: "REPLACE_ME",
    visaSuccessRate: "REPLACE_ME",
    partnerUniversities: "REPLACE_ME",
    countries: "10",
  },
  /**
   * Logo files. Drop the client's artwork into /public and swap these two
   * values from REPLACE_ME to the paths ("/logo.png", "/logo-white.png").
   * Until then the header/footer render the text lockup automatically.
   */
  logo: {
    onLight: "REPLACE_ME", // e.g. "/logo.png"
    onDark: "REPLACE_ME", // e.g. "/logo-white.png"
  },
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};

/** Labels for the stats band — keys must match site.stats. */
export const statLabels: Record<keyof typeof site.stats, string> = {
  studentsPlaced: "Students Guided",
  visaSuccessRate: "Visa Success Rate",
  partnerUniversities: "Partner Universities",
  countries: "Study Destinations",
};

/** Legal line shown in the footer and on every form. */
export const disclaimer =
  "Reading Study Abroad provides educational counselling and application support. Final admission and visa decisions rest solely with the respective universities and embassies.";

export type SiteConfig = typeof site;
