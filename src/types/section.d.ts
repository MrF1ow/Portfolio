/**
 * Represents a navigable section in the site or application.
 */
export type Section = {
  /**
   * Display label for the section (e.g., "Projects", "Contact").
   */
  label: string;

  /**
   * Anchor link or URL for the section.
   */
  href: string;
};

/**
 * Props for a section title component.
 */
export type SectionTitleProps = {
  /**
   * Text content of the section title.
   */
  title: string;

  /**
   * Optional color for the title text.
   * Should be in Tailwind CSS format
   */
  color?: string;
};
