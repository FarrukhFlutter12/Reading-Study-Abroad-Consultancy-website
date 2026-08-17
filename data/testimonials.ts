/**
 * Add only real, permission-granted student stories.
 *
 * Do NOT add invented names, photos or quotes. Before publishing any entry you
 * must hold the student's written consent to use their name, photo and story
 * (see CONTENT-NEEDED.md, item 6). Every component that reads this file already
 * handles the empty state, so leaving it empty is safe.
 */

export type Testimonial = {
  id: string;
  name: string;
  photo?: string; // /students/name.jpg — only with written consent
  country: string; // must match a slug from data/countries.ts
  university?: string;
  course?: string;
  intake?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [];
