/**
 * Partner / representable universities.
 *
 * Leave empty until the client supplies the verified list (CONTENT-NEEDED.md,
 * item 5). Do NOT add a university here unless the consultancy genuinely
 * represents it or can evidence the partnership — claiming an association that
 * does not exist is a legal exposure, not a marketing shortcut.
 */

export type University = {
  id: string;
  name: string;
  country: string; // must match a slug from data/countries.ts
  city?: string;
  logo?: string; // /universities/name.png
  website?: string;
  note?: string; // e.g. "Direct application partner"
};

export const universities: University[] = [];
