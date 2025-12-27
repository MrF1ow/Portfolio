/* Type Imports */
import type { JSX } from "react";
import type React from "react";
import type { AnimatedProps } from "@/types/animated";

/* Package Imports */
import { motion } from "framer-motion";

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
}): JSX.Element => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

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
}: AnimatedProps) => {
  const variants = {
    right: { hidden: { opacity: 0, x: 100 }, show: { opacity: 1, x: 0 } },
    left: { hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0 } },
    bottom: { hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0 } },
    top: { hidden: { opacity: 0, y: -100 }, show: { opacity: 1, y: 0 } },
  };

  return (
    <motion.div
      variants={variants[animateFrom]}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
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
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="h-[5px] bg-neutral rounded"
    />
  );
};
