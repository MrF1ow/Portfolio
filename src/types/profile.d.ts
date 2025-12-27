/**
 * Available profile presentation modes.
 *
 * - "engineer" → professional / technical focus
 * - "personal" → casual or personal focus
 */
export type ProfileMode = "engineer" | "personal";

/**
 * Shape of the ProfileMode React context.
 * Controls which profile mode is currently active.
 */
export type ProfileModeContextType = {
  /**
   * Currently active profile mode.
   */
  mode: ProfileMode;

  /**
   * Toggles between available profile modes.
   */
  toggleMode: () => void;

  /**
   * Explicitly sets the profile mode.
   */
  setMode: (mode: ProfileMode) => void;
};
