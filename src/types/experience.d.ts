/**
 * Represents a single job or professional experience entry.
 */
export type Job = {
  /**
   * Unique identifier for the job entry.
   * Typically used as a React key or database ID.
   */
  id: number;

  /**
   * Name of the company or organization.
   */
  company: string;

  /**
   * Job title or role held.
   */
  position: string;

  /**
   * Job location (e.g. "Remote", "Portland, OR").
   */
  location: string;

  /**
   * Start date of employment.
   * Format: `Month - Year` (e.g. "Dec - 2025")
   */
  startDate: string;

  /**
   * End date of employment.
   * Use `"Present"` if currently employed.
   */
  endDate: string;

  /**
   * Description of responsibilities, achievements, or role summary.
   * May contain multiple sentences.
   */
  description: string;

  /**
   * Keywords or technologies associated with the role
   * (e.g. ["React", "TypeScript", "AWS"]).
   */
  tags: string[];
};
