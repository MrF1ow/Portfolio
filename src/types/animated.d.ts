import type React from "react";

export type AnimateFromDirection = "left" | "right" | "bottom" | "top";

/**
 * Props for animated wrapper components that enter the viewport
 * from a specific direction.
 */
export type AnimatedProps = {
  /**
   * React elements to be animated.
   * Typically text or layout blocks.
   */
  children: React.ReactNode;

  /**
   * Direction the element animates in from.
   *
   * - `"left"`   → slides in from the left
   * - `"right"`  → slides in from the right
   * - `"top"`    → slides in from the top
   * - `"bottom"` → slides in from the bottom
   */
  animateFrom: AnimateFromDirection;
};
