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
  // All three confirmed live by the client — these always render.
  socials: {
    facebook: "https://www.facebook.com/ReadingStudyAbroad.PK",
    instagram: "https://www.instagram.com/readingstudyabroad.pk",
    tiktok: "https://www.tiktok.com/@readingstudyabroad.pk",
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
   * Logo assets, named by the BACKGROUND they belong on — not by filename.
   *
   * The rule: dark/purple background -> `onDark` (gold artwork); light, cream or
   * gold background -> `onLight` (purple artwork). Never gold-on-gold, and
   * never white artwork on gold.
   *
   * Every file here is generated from the client's originals in /brand-source
   * by `node scripts/generate-icons.mjs`. Do not edit them by hand — re-run the
   * script instead. lib/brandAssets.ts verifies each file exists at build time.
   */
  logo: {
    onLight: "/logo-on-light.png", // wide lockup, purple + gold artwork
    onDark: "/logo-on-dark.png", // wide lockup, all-gold artwork
    stackedOnLight: "/logo-stacked-on-light.png",
    stackedOnDark: "/logo-stacked-on-dark.png",
    mark: "/logo-mark.png", // icon only, colour
    markOnDark: "/logo-mark-on-dark.png", // icon only, gold
  },
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
