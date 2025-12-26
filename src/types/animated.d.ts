import type React from "react"

export type AnimatedProps = {
    children: React.ReactNode;
    animateFrom: "left" | "right" | "bottom" | "top";
}