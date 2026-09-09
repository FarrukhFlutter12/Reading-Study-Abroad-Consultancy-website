// GENERATED FILE — do not edit by hand.
// Regenerate with: npm run images:manifest  (runs automatically on prebuild)
//
// Maps every photographic slot to the file that is actually present in /public,
// or null when none is. SmartImage reads this instead of touching the
// filesystem, so it works in both server and client components.
//
// The value may differ from the key's extension: the Pexels pipeline writes
// .webp, while a hand-supplied file might be .jpg.

export const imageManifest: Record<string, string | null> = {
  "/images/about/counselling-session.jpg": "/images/about/counselling-session.webp",
  "/images/about/office-exterior.jpg": null,
  "/images/about/office-team.jpg": "/images/about/office-team.webp",
  "/images/destinations/bulgaria-card.jpg": "/images/destinations/bulgaria-card.webp",
  "/images/destinations/bulgaria.jpg": "/images/destinations/bulgaria.webp",
  "/images/destinations/cyprus-card.jpg": "/images/destinations/cyprus-card.webp",
  "/images/destinations/cyprus.jpg": "/images/destinations/cyprus.webp",
  "/images/destinations/france-card.jpg": "/images/destinations/france-card.webp",
  "/images/destinations/france.jpg": "/images/destinations/france.webp",
  "/images/destinations/hungary-card.jpg": "/images/destinations/hungary-card.webp",
  "/images/destinations/hungary.jpg": "/images/destinations/hungary.webp",
  "/images/destinations/italy-card.jpg": "/images/destinations/italy-card.webp",
  "/images/destinations/italy.jpg": "/images/destinations/italy.webp",
  "/images/destinations/lithuania-card.jpg": "/images/destinations/lithuania-card.webp",
  "/images/destinations/lithuania.jpg": "/images/destinations/lithuania.webp",
  "/images/destinations/malta-card.jpg": "/images/destinations/malta-card.webp",
  "/images/destinations/malta.jpg": "/images/destinations/malta.webp",
  "/images/destinations/south-korea-card.jpg": "/images/destinations/south-korea-card.webp",
  "/images/destinations/south-korea.jpg": "/images/destinations/south-korea.webp",
  "/images/destinations/turkey-card.jpg": "/images/destinations/turkey-card.webp",
  "/images/destinations/turkey.jpg": "/images/destinations/turkey.webp",
  "/images/destinations/uk-card.jpg": "/images/destinations/uk-card.webp",
  "/images/destinations/uk.jpg": "/images/destinations/uk.webp",
  "/images/hero/hero-mobile.jpg": "/images/hero/hero-mobile.webp",
  "/images/hero/main-hero.jpg": "/images/hero/main-hero.webp",
  "/images/sections/airport-departure.jpg": "/images/sections/airport-departure.webp",
  "/images/sections/graduation.jpg": "/images/sections/graduation.webp",
  "/images/sections/ielts-study.jpg": "/images/sections/ielts-study.webp",
  "/images/sections/lecture-hall.jpg": "/images/sections/lecture-hall.webp",
  "/images/sections/students-group.jpg": "/images/sections/students-group.webp",
  "/images/sections/visa-documents.jpg": "/images/sections/visa-documents.webp",
};

/** The real file to render for this slot, or null if it has not been supplied. */
export function resolveImage(src: string): string | null {
  return imageManifest[src] ?? null;
}
