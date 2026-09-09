/**
 * The single source of truth for image search queries and skip rules.
 *
 * Imported by BOTH scripts/fetch-images.mjs and scripts/generate-images-doc.mjs
 * so the checklist a human reads and the queries the fetcher runs can never
 * drift apart.
 *
 * CASTING: the audience is Pakistani students. Queries deliberately bias toward
 * South Asian and visibly diverse subjects — a hero full of only
 * Northern-European faces reads as a template and costs enquiries.
 */

export const DESTINATIONS = [
  ["uk", "the United Kingdom", "Big Ben and the Houses of Parliament"],
  ["cyprus", "Cyprus", "Mediterranean coastline"],
  ["bulgaria", "Bulgaria", "Alexander Nevsky Cathedral, Sofia"],
  ["italy", "Italy", "The Colosseum, Rome"],
  ["lithuania", "Lithuania", "Vilnius old town"],
  ["malta", "Malta", "Valletta harbour"],
  ["south-korea", "South Korea", "Seoul skyline"],
  ["hungary", "Hungary", "The Hungarian Parliament, Budapest"],
  ["france", "France", "The Eiffel Tower, Paris"],
  ["turkey", "Turkey", "The Blue Mosque, Istanbul"],
];

/**
 * Slots that must NEVER be auto-filled with stock photography.
 * Each one would be a factual claim the consultancy cannot back.
 */
export const NEVER_AUTOFILL = {
  "/images/about/office-exterior.jpg":
    "Claims to be the real Hayatabad office. A stock building is a lie — client photo only.",
};

/** Core (non-destination) slots. */
export const CORE_SLOTS = [
  {
    src: "/images/hero/main-hero.jpg",
    query: "happy university students group outdoors campus",
    orientation: "landscape",
    width: 1920,
    height: 1080,
    maxKb: 250,
    note: "Diverse students on campus, daylight, not stock-posed. Left third clear for the headline.",
  },
  {
    src: "/images/hero/hero-mobile.jpg",
    query: "students walking together university campus",
    orientation: "portrait",
    width: 1080,
    height: 1350,
    maxKb: 200,
    note: "Portrait-safe crop of the same scene, subject centred.",
  },
  {
    src: "/images/about/office-team.jpg",
    query: "advisor explaining documents to student office",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "Advice session, not a sales meeting. Documents visible.",
  },
  {
    src: "/images/about/counselling-session.jpg",
    query: "two people discussing paperwork office desk",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "One-to-one, laptop open, both people engaged.",
  },
  {
    src: "/images/about/office-exterior.jpg",
    query: null, // never auto-filled
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "CLIENT PHOTO ONLY — the real office frontage.",
  },
  {
    src: "/images/sections/students-group.jpg",
    query: "diverse students studying together library campus",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "Collaborative and relaxed.",
  },
  {
    src: "/images/sections/graduation.jpg",
    query: "graduates celebrating gowns university",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "Wide shot. Faces should not be individually identifiable — this sits near student stories.",
  },
  {
    src: "/images/sections/visa-documents.jpg",
    query: "passport travel documents desk flat lay",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "No legible names or numbers.",
  },
  {
    src: "/images/sections/lecture-hall.jpg",
    query: "university lecture hall students seated",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "NO university logos, crests or branded signage in frame.",
  },
  {
    src: "/images/sections/airport-departure.jpg",
    query: "young traveller luggage airport terminal departure",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "Hopeful rather than lonely in tone.",
  },
  {
    src: "/images/sections/ielts-study.jpg",
    query: "young adult studying laptop headphones desk",
    orientation: "landscape",
    width: 1200,
    height: 800,
    maxKb: 150,
    note: "No visible IELTS/PTE branding.",
  },
];

/** Destination slots, expanded from DESTINATIONS. */
export const DESTINATION_SLOTS = DESTINATIONS.flatMap(
  ([slug, name, landmark]) => [
    {
      src: `/images/destinations/${slug}.jpg`,
      query: `${landmark}`,
      orientation: "landscape",
      width: 1600,
      height: 900,
      maxKb: 150,
      note: `Wide crop of ${landmark}. Leave the left third clear for the headline.`,
    },
    {
      src: `/images/destinations/${slug}-card.jpg`,
      query: `${name} city landmark travel`,
      orientation: "landscape",
      width: 800,
      height: 600,
      maxKb: 80,
      note: `Tighter crop that still reads at 400 px wide.`,
    },
  ],
);

export const ALL_SLOTS = [...CORE_SLOTS, ...DESTINATION_SLOTS];

/**
 * Photo IDs rejected during human review (`npm run images:sheet`).
 *
 * The alt-text filter below cannot see INSIDE the frame — a university crest on
 * a banner, a law-firm sign on the wall, readable institutional text. Those are
 * exactly the things that create legal exposure, and only a person looking at
 * the picture catches them. When you reject one, add its id here with the
 * reason so the fetcher can never pick it again.
 */
export const EXCLUDE_IDS = new Set([
  6147148,  // main-hero: NYU banner clearly visible — implies a partnership, and the USA is not even a destination we offer
  5668800,  // counselling: "...MSON LAW FIRM" signage + a gavel on the desk — wrong industry entirely
  38846544, // graduation: large conference-centre banner with readable Arabic/French institutional text
  6386301,  // france hero: black-and-white abstract of the Eiffel Tower's underside — unreadable as "France", and mono clashes with the brand
  34431072, // hungary hero: heavy haze, washed out, no contrast for a headline overlay
  11479826, // lithuania hero: empty dusk street, does not read as Vilnius old town
  27919995, // lithuania card: industrial ferris wheel, does not read as Lithuania
  5965582,  // hero-mobile: crop so tight it is hands and torsos, not students on a campus
  6550173,  // ielts-study: the subject is a young child, wrong for university-entry test prep
  7845068,  // office-team: a lone person signing paperwork — no student, so it does not read as counselling
]);

/** Words in a Pexels alt string that mark a candidate as unusable. */
export const REJECT_WORDS = [
  "vintage",
  "retro",
  "grunge",
  "mockup",
  "mock-up",
  "logo",
  "signboard",
  "billboard",
  "text",
  "poster",
  "banner",
  "white background",
  "isolated",
  "studio shot",
];

/** Words that suggest the casting we want for people-based slots. */
export const PREFER_WORDS = [
  "asian",
  "indian",
  "diverse",
  "multiethnic",
  "multi-ethnic",
  "international",
  "group",
  "young",
];
