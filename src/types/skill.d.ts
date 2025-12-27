/* Type Imports */
import type { IconType } from "react-icons";

/**
 * Represents a single skill or competency.
 */
export type Skill = {
  /**
   * Name of the skill (e.g., "React", "TypeScript").
   */
  title: string;

  /**
   * Proficiency level or score for the skill.
   * Typically a number from 0 to 100, but can follow your own scale.
   */
  value: number;

  /**
   * Icon component representing the skill.
   * Should be a React IconType (e.g., from react-icons).
   */
  icon: IconType;

  /**
   * Optional color for the icon.
   * Should be in Tailwind CSS format
   */
  iconColor?: string;
};
