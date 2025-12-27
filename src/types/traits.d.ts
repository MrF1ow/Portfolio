/**
 * Represents a personal or professional trait/quality.
 */
export type Trait = {
  /**
   * Name of the trait (e.g., "Creativity", "Leadership").
   */
  title: string;

  /**
   * Detailed description of the trait.
   * Can include examples or context.
   */
  description: string;

   /**
   * Path or URL to the trait image.
   * Check utils/images.ts to see how it is used.
   */
  image: string;
};