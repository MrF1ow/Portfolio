/* Type Imports */
import { AnimateFromDirection } from "@/types/animated";

/**
 * Props for the DivideLayout component, which arranges children
 * in a horizontal or vertical layout with optional animation.
 */
export type DivideLayoutProps = {
  /**
   * Child elements to be laid out.
   * Order matters and is preserved.
   */
  children: React.ReactNode[];

  /**
   * Layout direction for dividing children.
   *
   * @default "horizontal"
   */
  direction?: "horizontal" | "vertical";

  /**
   * Width class applied to the layout container.
   * Typically a Tailwind width utility (e.g. "w-full", "max-w-4xl").
   */
  width?: string;

  /**
   * Enables entrance animation for the layout or its children.
   *
   * When true, `animateFrom` should also be provided.
   *
   * @default false
   */
  animated?: boolean;

  /**
   * Direction from which the animation originates.
   *
   * Only used when `animated` is true.
   */
  animateFrom?: AnimateFromDirection;
};
