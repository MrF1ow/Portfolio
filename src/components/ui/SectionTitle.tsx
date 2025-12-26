import type { SectionTitleProps } from "@/types/section";

export default function SectionTitle({ title, color }: SectionTitleProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <h2
        className={`font-bold tracking-wide text-neutral text-5xl flex ${
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
