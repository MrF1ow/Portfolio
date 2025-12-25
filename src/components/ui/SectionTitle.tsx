import type { SectionTitleProps } from "@/types/section";

export default function SectionTitle({ title, color }: SectionTitleProps) {
  return (
    <div className="w-full flex items-center justify-center">
      <h2
        className={`font-bold tracking-wide text-neutral text-4xl inline-block ${
          color || ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
