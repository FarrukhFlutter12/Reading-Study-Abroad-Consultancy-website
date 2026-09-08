/**
 * Single source of truth for every photographic slot on the site.
 *
 * The files themselves may not exist yet. <SmartImage> checks at build time and
 * falls back to a branded navy→gold gradient block, so a missing photo never
 * shows a broken image — it just looks like a deliberate brand panel. Drop the
 * real file in at the path below and it appears automatically, no code change.
 *
 * See IMAGES-NEEDED.md for the sourcing checklist and search queries.
 *
 * RULES
 * - Local files only. Never hotlink an external image URL: it breaks when the
 *   source removes the file and leaks referrer data to a third party.
 * - Unsplash and Pexels only (both allow commercial use with no attribution).
 * - No university logos, crests or branded signage — that implies a partnership
 *   the consultancy cannot yet evidence.
 * - No recognisable faces in success-story slots. See data/testimonials.ts.
 * - Prefer South Asian and visibly diverse students: the audience is Pakistani,
 *   and an all-Northern-European hero reads as a template.
 */

export type ImageSlot = {
  /** Path under /public. */
  src: string;
  /** Descriptive, keyword-natural. Never "image" or "photo". */
  alt: string;
  /** What makes a good pick — used to generate IMAGES-NEEDED.md. */
  brief: string;
  /** Target intrinsic size, for the sourcing checklist. */
  size: string;
  /** Rough budget once converted to WebP q80. */
  maxKb: number;
};

const dest = (slug: string, name: string, landmark: string) => ({
  hero: {
    src: `/images/destinations/${slug}.jpg`,
    alt: `${landmark} — study in ${name} from Pakistan`,
    brief: `Recognisable ${name} landmark or university campus, daylight, wide crop with room for a headline overlay on the left.`,
    size: "1600×900",
    maxKb: 150,
  } satisfies ImageSlot,
  card: {
    src: `/images/destinations/${slug}-card.jpg`,
    alt: `${landmark}, ${name}`,
    brief: `Same subject as the hero but a tighter, punchier crop that still reads at 400px wide.`,
    size: "800×600",
    maxKb: 80,
  } satisfies ImageSlot,
});

export const images = {
  hero: {
    main: {
      src: "/images/hero/main-hero.jpg",
      alt: "International students walking together on a university campus",
      brief:
        "Diverse group of university students walking on campus in natural daylight, genuinely happy — not stock-posed. Must include South Asian students. Leave the left third uncluttered so the headline sits cleanly.",
      size: "1920×1080",
      maxKb: 250,
    } satisfies ImageSlot,
    mobile: {
      src: "/images/hero/hero-mobile.jpg",
      alt: "International students walking together on a university campus",
      brief:
        "Tighter portrait-safe crop of the same scene. Subject centred so nothing important is lost on a narrow screen.",
      size: "1080×1350",
      maxKb: 200,
    } satisfies ImageSlot,
  },

  about: {
    officeTeam: {
      src: "/images/about/office-team.jpg",
      alt: "A counsellor reviewing application documents with a student at a desk",
      brief:
        "Counsellor at a desk with a student, documents visible, warm office lighting. Should read as an advice session, not a sales meeting.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    counselling: {
      src: "/images/about/counselling-session.jpg",
      alt: "One-to-one study abroad counselling session with a laptop open",
      brief:
        "One-on-one counselling, laptop open, engaged conversation. Both faces visible and relaxed.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    officeExterior: {
      src: "/images/about/office-exterior.jpg",
      alt: "Reading Study Abroad office in Basharat Market, Hayatabad, Peshawar",
      brief:
        "CLIENT PHOTO REQUIRED — the real Hayatabad office frontage with signage. Never use stock for this: it is a factual claim about a real place.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
  },

  sections: {
    studentsGroup: {
      src: "/images/sections/students-group.jpg",
      alt: "Students studying together on a campus lawn",
      brief:
        "Students studying together in a library or on a campus lawn. Collaborative and relaxed.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    graduation: {
      src: "/images/sections/graduation.jpg",
      alt: "Graduates throwing their caps in the air on graduation day",
      brief:
        "Graduation caps in the air, celebratory, wide shot. Faces should not be individually identifiable — this sits near student stories.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    visaDocuments: {
      src: "/images/sections/visa-documents.jpg",
      alt: "Passport, visa application forms and a pen laid out on a desk",
      brief:
        "Passport, forms and a pen on a clean desk. Check carefully that no real names, numbers or personal data are legible.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    lectureHall: {
      src: "/images/sections/lecture-hall.jpg",
      alt: "A lecturer teaching students in a university lecture hall",
      brief:
        "Professor teaching, students attentive. NO university logos, crests or identifiable branded signage anywhere in frame.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    airportDeparture: {
      src: "/images/sections/airport-departure.jpg",
      alt: "A student with luggage at an airport departure terminal",
      brief:
        "Student with luggage at an airport terminal. Hopeful rather than lonely in tone.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
    ieltsStudy: {
      src: "/images/sections/ielts-study.jpg",
      alt: "A student preparing for an English language test with headphones and study materials",
      brief:
        "Person studying with headphones and test-prep materials. Avoid any visible IELTS/PTE branding.",
      size: "1200×800",
      maxKb: 150,
    } satisfies ImageSlot,
  },

  destinations: {
    uk: dest("uk", "the United Kingdom", "Big Ben and the Houses of Parliament"),
    cyprus: dest("cyprus", "Cyprus", "Mediterranean coastline"),
    bulgaria: dest("bulgaria", "Bulgaria", "Alexander Nevsky Cathedral, Sofia"),
    italy: dest("italy", "Italy", "The Colosseum, Rome"),
    lithuania: dest("lithuania", "Lithuania", "Vilnius old town"),
    malta: dest("malta", "Malta", "Valletta harbour"),
    "south-korea": dest("south-korea", "South Korea", "Seoul skyline"),
    hungary: dest("hungary", "Hungary", "The Hungarian Parliament, Budapest"),
    france: dest("france", "France", "The Eiffel Tower, Paris"),
    turkey: dest("turkey", "Turkey", "The Blue Mosque, Istanbul"),
  } as Record<string, { hero: ImageSlot; card: ImageSlot }>,
} as const;

/** Flattened list, used to generate the sourcing checklist. */
export function allImageSlots(): ImageSlot[] {
  const out: ImageSlot[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if ("src" in (node as ImageSlot) && "brief" in (node as ImageSlot)) {
      out.push(node as ImageSlot);
      return;
    }
    Object.values(node as Record<string, unknown>).forEach(walk);
  };
  walk(images);
  return out;
}
