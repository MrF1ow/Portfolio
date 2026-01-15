/* Type Imports */
import type { JSX } from "react";

/* Hook Imports */
import { useInView } from "@/hooks/useInView";

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
  // Trigger when 30% of the text is in view (amount: 0.3)
  const { ref, isInView } = useInView(0.3);

  return (
    <div className="flex items-center justify-center w-full">
      <p
        ref={ref}
        className={`text-xl w-full md:w-7/8 lg:w-3/4 xl:w-1/2 text-center fade-up-text ${
          isInView ? "in-view" : ""
        }`}
      >
        {content}
      </p>
    </div>
  );
}
