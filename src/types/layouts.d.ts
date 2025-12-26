export type DivideLayoutProps = {
  children: React.ReactNode[];
  direction?: "horizontal" | "vertical";
  width?: string;
  animated?: boolean;
  animateFrom?: "left" | "right" | "bottom" | "top";
};
