/* Type Imports */
import type { DivideLayoutProps } from "@/types/layouts";
import type { JSX } from "react";

/* Component Imports */
import { AnimatedCard, AnimatedCardContainer } from "@/components/ui/Animated";

/*
 * DivideLayout
 *
 * This component is used to divide child elements into a responsive flex layout.
 * It supports horizontal or vertical layouts and can optionally animate children.
 *
 * @param {React.ReactNode[]} children - The elements to be rendered inside the layout.
 * @param {"horizontal" | "vertical"} direction - Layout direction (responsive when horizontal).
 * @param {string} width - Tailwind width class applied to each child container.
 * @param {boolean} animated - Enables animation wrapping for children and container.
 * @param {"left" | "right" | "top" | "bottom"} animateFrom - Direction animations originate from.
 *
 * @returns {JSX.Element} - The DivideLayout component.
 *
 * */
export default function DivideLayout({
  children,
  direction = "horizontal",
  width = "w-full",
  animated = false,
  animateFrom = "right",
}: DivideLayoutProps): JSX.Element {
  const flexDirection =
    direction === "horizontal" ? "flex-col lg:flex-row" : "flex-col";

  const content = (
    <div className={`flex ${flexDirection} flex-wrap gap-4 items-center`}>
      {children.map((child, index) => (
        <div key={index} className={`${width} md:flex-1 min-w-0`}>
          {animated ? (
            <AnimatedCard animateFrom={animateFrom}>{child}</AnimatedCard>
          ) : (
            child
          )}
        </div>
      ))}
    </div>
  );

  return animated ? (
    <AnimatedCardContainer>{content}</AnimatedCardContainer>
  ) : (
    content
  );
}
