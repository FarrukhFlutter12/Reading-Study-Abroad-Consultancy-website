/** Navigation structure shared by the header, mobile drawer and footer. */

export type NavLink = { label: string; href: string; desc?: string };

export const resourceLinks: NavLink[] = [
  {
    label: "Universities",
    href: "/universities",
    desc: "Institutions we work with, filterable by destination",
  },
  {
    label: "Scholarships",
    href: "/scholarships",
    desc: "How funding works and what you may be eligible for",
  },
  {
    label: "Test Preparation",
    href: "/test-preparation",
    desc: "IELTS, PTE and Duolingo explained side by side",
  },
  {
    label: "Success Stories",
    href: "/success-stories",
    desc: "Students who have travelled with our support",
  },
  {
    label: "Blog",
    href: "/blog",
    desc: "Guides on visas, budgets and English tests",
  },
  {
    label: "FAQs",
    href: "/faqs",
    desc: "Answers to the questions students ask most",
  },
];

export const primaryLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const quickLinks: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Our Services", href: "/services" },
  { label: "Destinations", href: "/destinations" },
  { label: "Free Assessment", href: "/free-assessment" },
  { label: "Apply Now", href: "/apply" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Test Preparation", href: "/test-preparation" },
  { label: "Blog", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];
