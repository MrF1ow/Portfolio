import type { AnimatedProps } from "@/types/animated";
import { motion } from "framer-motion";
import type React from "react";

export const AnimatedCardContainer = ({
  children,
  stagger = 0.2,
}: {
  children: React.ReactNode;
  stagger?: number;
}) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </motion.div>
);

export const AnimatedCard = ({
  children,
  animateFrom = "right",
}: AnimatedProps) => {
  const variants = {
    right: { hidden: { opacity: 0, x: 100 }, show: { opacity: 1, x: 0 } },
    left: { hidden: { opacity: 0, x: -100 }, show: { opacity: 1, x: 0 } },
    bottom: { hidden: { opacity: 0, y: 100 }, show: { opacity: 1, y: 0 } },
    top: { hidden: { opacity: 0, y: -100 }, show: { opacity: 1, y: 0 } },
  };

  return (
    <motion.div variants={variants[animateFrom]} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full">
      {children}
    </motion.div>
  );
};

// export const AnimatedCard = ({
//   children,
//   animateFrom = "right",
// }: AnimatedProps) => {
//   const variants = {
//     right: { initial: { opacity: 0, x: 100 }, animate: { opacity: 1, x: 0 } },
//     left: { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 } },
//     bottom: { initial: { opacity: 0, y: 100 }, animate: { opacity: 1, y: 0 } },
//     top: { initial: { opacity: 0, y: -100 }, animate: { opacity: 1, y: 0 } },
//   };

//   return (
//     <motion.div
//       initial="initial"
//       whileInView="animate"
//       viewport={{ once: true, amount: 0.2 }}
//       variants={{
//         initial: variants[animateFrom].initial,
//         animate: variants[animateFrom].animate,
//       }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="w-full"
//     >
//       {children}
//     </motion.div>
//   );
// };

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
export const AnimatedLine = ({ value }: { value: number }): JSX.Element => {
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
};
