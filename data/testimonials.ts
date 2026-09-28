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
  city?: string;
  country?: string; // slug from data/countries.ts; other slugs (e.g. "belarus") show as a plain-text tag
  university?: string;
  course?: string;
  intake?: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "israr-nawab",
    name: "Israr Nawab",
    city: "Shangla",
    country: "cyprus",
    quote:
      "I had an excellent experience with Reading Study Abroad. Their team was very friendly, cooperative and always responded on time. They guided me step by step from admission to visa and travel. Highly recommended!",
  },
  {
    id: "alamgeer",
    name: "Alamgeer",
    city: "Peshawar",
    country: "cyprus",
    quote:
      "Reading Study Abroad provided excellent support from start to finish. Their team was always friendly, responsive and cooperative. They guided me step by step and also arranged my accommodation and airport pickup in Cyprus. I'm truly thankful!",
  },
  {
    id: "atiq-ur-rahman",
    name: "Atiq ur Rahman",
    city: "Lower Dir",
    country: "cyprus",
    quote:
      "Reading Study Abroad made my Cyprus study journey much easier. They provided timely guidance, answered all my questions and even helped arrange my accommodation and airport pickup. Excellent service!",
  },
  {
    id: "muhammad-saad",
    name: "Muhammad Saad",
    city: "Swat",
    country: "cyprus",
    quote:
      "I am very satisfied with Reading Study Abroad. Their team is cooperative, helpful and responsive. They guided me throughout the admission and visa process and supported me even after I arrived in Cyprus.",
  },
  {
    id: "saqlain-ali",
    name: "Saqlain Ali",
    city: "Gilgit-Baltistan",
    country: "cyprus",
    quote:
      "From Pakistan to Cyprus, Reading Study Abroad supported me at every step. Their team was professional, friendly and always ready to help. I am really thankful for their services.",
  },
  {
    id: "shahid-ali-khan",
    name: "Shahid Ali Khan",
    city: "Swat",
    country: "cyprus",
    quote:
      "Thank you, Reading Study Abroad, for making my Cyprus journey so smooth. The team was always available, very helpful and supportive throughout the process.",
  },
  {
    id: "muhammad-shiraz-khan",
    name: "Muhammad Shiraz Khan",
    city: "Swat",
    country: "cyprus",
    quote:
      "Reading Study Abroad provided excellent guidance at every stage. From university admission and visa processing to my arrival in Cyprus, their team was always there to help. Thank you for your great support!",
  },
  {
    id: "muhammad-haseeb",
    name: "Muhammad Haseeb",
    city: "Swat",
    country: "cyprus",
    quote:
      "What I liked most about Reading Study Abroad was their quick response and friendly team. They guided me step by step and made the whole process simple and stress-free.",
  },
  {
    id: "afaq-khan",
    name: "Afaq Khan",
    city: "Swat",
    country: "cyprus",
    quote:
      "My experience with Reading Study Abroad was excellent. They helped me with my admission, visa, accommodation and airport pickup in Cyprus. I really appreciate their cooperation and support.",
  },
  {
    id: "anis-khan",
    name: "Anis Khan",
    city: "Swat",
    country: "cyprus",
    quote:
      "A big thank you to Reading Study Abroad for their excellent service. Their step-by-step guidance, quick responses and support with accommodation and airport pickup made my arrival in Cyprus very comfortable.",
  },
  {
    id: "malik-ashter",
    name: "Malik Ashter",
    city: "Gilgit-Baltistan",
    country: "cyprus",
    quote:
      "Choosing Reading Study Abroad was one of my best decisions. Their team supported me from the first application until my arrival in Cyprus. Friendly service, quick response and excellent guidance!",
  },
  {
    id: "muhammad-ihtisham-khalil",
    name: "Muhammad Ihtisham Khalil",
    city: "Peshawar",
    country: "turkey",
    quote:
      "I am very happy with the services of Reading Study Abroad. Whenever I had a question, their team responded quickly and guided me properly. Their support continued even after I reached Turkey. Highly recommended!",
  },
  {
    id: "tahseen-alam-khattak",
    name: "Tahseen Alam Khattak",
    city: "Karak",
    country: "belarus",
    quote:
      "The team at Reading Study Abroad made my Belarus journey very smooth and comfortable. They helped me with every step, from admission and visa to accommodation and airport pickup. Their friendly and professional support was excellent!",
  },
  {
    id: "abu-bakhar-sadiq",
    name: "Abu Bakhar Sadiq",
    city: "Swat",
    country: "belarus",
    quote:
      "A big thank you to Reading Study Abroad for their continuous support. They were always available, cooperative and clear in their guidance. From Pakistan to Belarus, they made sure everything was properly arranged, including my accommodation and airport pickup.",
  },
];
