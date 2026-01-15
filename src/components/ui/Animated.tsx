/* Type Imports */
import type { JSX } from "react";
import type React from "react";
import type { AnimatedProps } from "@/types/animated";

/* Package Imports */
import { isValidElement, Children, cloneElement } from "react";

/* Hook Imports */
import { useInView } from "@/hooks/useInView";

/*
 * AnimatedCardContainer
 *
 * This component wraps its children in a Framer Motion container
 * that applies staggered animations to child elements when they
 * come into view.
 *
 * @param {React.ReactNode} children - The elements to animate.
 * @param {number} [stagger=0.2] - The stagger delay between child animations in seconds.
 *
 * @returns {JSX.Element} - The AnimatedCardContainer component.
 *
 * */
export const AnimatedCardContainer = ({
  children,
  stagger = 0.2,
}: {
  children: React.ReactNode;
  stagger?: number;
}): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  // We inject the stagger delay into children using CSS variables
  return (
    <div ref={ref} className={isInView ? "in-view" : ""}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement<any>, {
            style: {
              "--stagger-delay": `${index * stagger}s`,
            } as React.CSSProperties,
          });
        }
        return child;
      })}
    </div>
  );
};

/*
 * AnimatedCard
 *
 * This component wraps its children in a Framer Motion element
 * that animates them from a specified direction when entering view.
 *
 * @param {React.ReactNode} children - The elements to animate.
 * @param {"right" | "left" | "top" | "bottom"} [animateFrom="right"] - The direction from which the animation originates.
 *
 * @returns {JSX.Element} - The AnimatedCard component.
 *
 * */
export const AnimatedCard = ({
  children,
  animateFrom = "right",
  style,
}: AnimatedProps & { style?: React.CSSProperties }) => {
  const directionClass = `from-${animateFrom}`;

  return (
    <div className={`w-full animate-card ${directionClass}`} style={style}>
      {children}
    </div>
  );
};

/*
 * AnimatedLine
 *
 * This component is used to manage the line for experience percent.
 *
 * @param {value} percent - The percentage of experience.
 *
 * @returns {JSX.Element} - The AnimatedLine component.
 *
 * */
export const AnimatedLine = ({ value }: { value: number }): JSX.Element => {
  const { ref, isInView } = useInView(0.4);

  return (
    <div ref={ref} className={isInView ? "in-view" : ""}>
      <div
        className="h-[5px] bg-neutral rounded animate-line"
        style={{ "--line-width": `${value}%` } as React.CSSProperties}
      />
    </div>
  );
};