/* Type Imports */
import type { JSX } from "react";

/* Package Imports */
import { motion } from "framer-motion";

/*
 * Description
 *
 * This component displays a block of text with a fade-in and upward
 * motion animation using Framer Motion.
 *
 * @param {string} content - The text content to display.
 *
 * @returns {JSX.Element} - The Description component.
 *
 * */
export default function Description({
  content,
}: {
  content: string;
}): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full">
      <motion.p
        className="text-xl w-full md:w-3/4 lg:w-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {content}
      </motion.p>
    </div>
  );
}
