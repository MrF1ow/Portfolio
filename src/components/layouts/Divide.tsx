import type { DivideLayoutProps } from "@/types/layouts";
import { AnimatedCard, AnimatedCardContainer } from "@/components/ui/Animated";

export default function DivideLayout({
  children,
  direction = "horizontal",
  width = "w-full",
  animated = false,
  animateFrom = "right",
}: DivideLayoutProps) {
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
