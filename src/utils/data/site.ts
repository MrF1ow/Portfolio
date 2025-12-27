import type { Section } from "@/types/section";

/*
 * engineerSections
 *
 * Array of navigation sections for the "engineer" profile mode.
 * Each section includes a label and an anchor link to a corresponding page section.
 *
 * @type {Section[]}
 * @property {string} label - The text displayed for the navigation link.
 * @property {string} href - The anchor link pointing to the section ID.
 *
 * */
export const engineerSections: Section[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

/*
 * personalSections
 *
 * Array of navigation sections for the "personal" profile mode.
 * Each section includes a label and an anchor link to a corresponding page section.
 *
 * @type {Section[]}
 * @property {string} label - The text displayed for the navigation link.
 * @property {string} href - The anchor link pointing to the section ID.
 *
 * */
export const personalSections: Section[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Traits", href: "#traits" },
  { label: "Contact", href: "#contact" },
];
