/** The six-step journey shown on the home page and repeated across the site. */

export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  icon: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Free Counselling",
    body: "We assess your academic record, budget and goals, then tell you honestly which destinations fit your profile.",
    icon: "compass",
  },
  {
    number: "02",
    title: "Course & University Selection",
    body: "A shortlist built around entry requirements, total cost and how the course connects to what you have already studied.",
    icon: "search",
  },
  {
    number: "03",
    title: "Application & Offer Letter",
    body: "We prepare and submit your applications, follow up with admissions offices, and review every offer before you accept.",
    icon: "clipboard",
  },
  {
    number: "04",
    title: "Financial Documentation",
    body: "Bank statements, sponsor evidence and affidavits arranged in the exact format your destination requires.",
    icon: "wallet",
  },
  {
    number: "05",
    title: "Visa Filing",
    body: "Forms completed, the file checked for consistency, appointments booked and interview preparation done properly.",
    icon: "shield",
  },
  {
    number: "06",
    title: "Pre-Departure & Post-Arrival",
    body: "Accommodation, travel briefing and a contact you can still reach once you have landed.",
    icon: "plane",
  },
];

/** The five USPs from the brand banner — used in the home page trust bar. */
export const usps = [
  { title: "Expert Counselling", icon: "compass" },
  { title: "Wide Range of Universities", icon: "globe" },
  { title: "Visa Support & Guidance", icon: "fileCheck" },
  { title: "High Visa Success Rate", icon: "award" },
  { title: "Post Arrival Assistance", icon: "users" },
];

/** "Why choose us" cards — capability claims only, no measurable promises. */
export const whyChooseUs = [
  {
    title: "Straight Answers, Not Sales Pitches",
    body: "If a destination does not suit your grades or your budget, we will tell you before you spend a rupee on it.",
    icon: "compass",
  },
  {
    title: "Ten Destinations, One Office",
    body: "The UK, seven European countries, Turkey and South Korea — compared side by side so you can choose properly.",
    icon: "globe",
  },
  {
    title: "End-to-End Case Handling",
    body: "Counselling, applications, documents, visa filing and departure are handled by the same team. Nothing gets lost between people.",
    icon: "clipboard",
  },
  {
    title: "Documentation Done Right",
    body: "Most refusals come from paperwork, not from grades. We check every document against the current requirement before it is submitted.",
    icon: "fileCheck",
  },
  {
    title: "Based in Hayatabad, Peshawar",
    body: "A real office you can walk into, with your family, and ask questions face to face.",
    icon: "mapPin",
  },
  {
    title: "Support After You Land",
    body: "Accommodation guidance, arrival coordination and a contact you can still reach once you are abroad.",
    icon: "heart",
  },
];
