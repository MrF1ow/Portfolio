/**
 * Represents a single project or portfolio entry.
 */
export type Project = {
  /**
   * Unique identifier for the project.
   * Used for sorting
   */
  id: number;

  /**
   * Title of the project.
   */
  title: string;

  /**
   * Brief description of the project.
   * Should summarize goals, technologies, or outcomes.
   */
  description: string;

  /**
   * Keywords or technologies associated with the project.
   * (e.g., ["React", "TypeScript", "Tailwind CSS"])
   */
  tags: string[];

  /**
   * URL or path to a live demo, repository, or source file.
   * Can be relative or absolute depending on usage.
   */
  src: string;
};
