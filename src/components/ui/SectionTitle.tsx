/* Type Imports */
import type { JSX } from "react";
import type { SectionTitleProps } from "@/types/section";

/*
 * SectionTitle
 *
 * This component displays a section title with individual letters
 * that animate on hover. An optional color can be applied to the text.
 *
 * @param {string} title - The text of the section title.
 * @param {string} [color] - Optional Tailwind color class to apply to the title.
 *
 * @returns {JSX.Element} - The SectionTitle component.
 *
 * */
export default function SectionTitle({
  title,
  color,
}: SectionTitleProps): JSX.Element {
  return (
    <div className="w-full flex items-center justify-center">
      <h2
        className={`font-bold tracking-wide text-neutral text-4xl md:text-5xl flex ${
          color || ""
        }`}
      >
        {title.split("").map((char, index) => (
          <span
            key={index}
            className="
              inline-block
              transition-transform
              duration-300
              ease-out
              hover:scale-125
              hover:text-warning
              cursor-pointer
            "
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h2>
    </div>
  );
}
