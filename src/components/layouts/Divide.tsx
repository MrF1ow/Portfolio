import type { DivideLayoutProps } from "@/types/layouts";

export default function DivideLayout({
  children,
  direction = "horizontal",
  width,
}: DivideLayoutProps) {
  const flexDirection =
    direction === "horizontal" ? "flex-col md:flex-row" : "flex-col";

  return (
    <div className={`flex ${flexDirection} flex-wrap gap-4 items-center`}>
      {children.map((child, index) => (
        <div key={index} className={`${width} md:flex-1 min-w-0`}>
          {child}
        </div>
      ))}
    </div>
  );
}
