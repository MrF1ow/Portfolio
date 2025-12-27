/* Type Imports */
import type { Skill } from "@/types/skill";
import type { IconType } from "react-icons";

/**
 * Profile-related display information shown on the site.
 */
export type ProfileInfo = {
  /**
   * List of professional titles or roles
   * (e.g. ["Software Engineer", "Full-Stack Developer"]).
   */
  titles: string[];

  /**
   * Short personal tagline or slogan.
   */
  slogan: string;

  /**
   * Long-form biography or "About Me" content.
   */
  about: string;

  /**
   * Call-to-action or short contact message
   * (e.g. "Let's build something together").
   */
  contact: string;

  /**
   * Path or URL to the profile image.
   * Check utils/images.ts to see how it is used
   */
  image: string;

  /**
   * Icon representing this profile
   */
  icon: IconType;
};

/**
 * General personal and educational information.
 */
export type GeneralInfo = {
  /**
   * Given name.
   */
  firstName: string;

  /**
   * Family name.
   */
  lastName: string;

  /**
   * University or educational institution name.
   */
  university: string;

  /**
   * Degree earned or in progress
   * (e.g. "B.S. Computer Science").
   */
  degree: string;

  /**
   * Graduation year or date
   * (e.g. "2025").
   */
  graduated: string;
};

/**
 * Contact and external profile information.
 */
export type ContactInfo = {
  /**
   * Primary contact email address.
   */
  email: string;

  /**
   * External professional links.
   */
  links: {
    /**
     * GitHub profile URL.
     */
    github: string;

    /**
     * LinkedIn profile URL.
     */
    linkedin: string;
  };
};
