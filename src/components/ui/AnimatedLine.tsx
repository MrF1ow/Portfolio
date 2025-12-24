/* Package Import */
import { motion } from "framer-motion";
import type { JSX } from "react";

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
export default function AnimatedLine({
  value,
}: {
  value: number;
}): JSX.Element {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        height: "5px",
        backgroundColor: "#ffffff",
        borderRadius: "0.25rem",
      }}
    />
  );
}
