/**
 * Team members and office photos.
 *
 * Both arrays stay empty until the client supplies real photos and bios
 * (CONTENT-NEEDED.md, items 7 and 8). The About page hides these sections
 * entirely while they are empty — never fill them with stock people.
 */

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  photo?: string; // /team/name.jpg
  bio?: string;
};

export const team: TeamMember[] = [];

export type OfficePhoto = {
  src: string; // /office/1.jpg
  alt: string;
};

export const officePhotos: OfficePhoto[] = [];

/** Mission, vision and values — safe, capability-based copy. */
export const mission =
  "To give every student who walks through our door an honest assessment of where they can study, and then to handle the paperwork properly so a good plan is not lost to a bad file.";

export const vision =
  "A Peshawar where a student's destination is decided by their ability and their plan — not by whoever gave them the loudest advice.";

export const values = [
  {
    title: "Honesty Before Sales",
    body: "If a destination does not fit your grades or your budget, we say so at the first meeting — not after you have paid a processing fee.",
    icon: "eye",
  },
  {
    title: "No Guarantees, Ever",
    body: "Admission and visa decisions belong to universities and embassies. We promise thorough preparation, never an outcome.",
    icon: "shield",
  },
  {
    title: "Documentation Discipline",
    body: "Most refusals come from paperwork, not from grades. Every document is checked against the current requirement before it is submitted.",
    icon: "fileCheck",
  },
  {
    title: "Available After You Land",
    body: "Our work does not end at the airport. Students reach us months after departure, and that is exactly how it should be.",
    icon: "heart",
  },
];
