/* Type Imports */
import type { JSX } from "react";

/* Component Imports */
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import Description from "@/components/ui/Description";

/*
 * About
 *
 * This component renders the "About" section of the page.
 * It displays a section title and descriptive text using a
 * vertically stacked DivideLayout.
 *
 * @param {string} about - The content used to describe the subject.
 *
 * @returns {JSX.Element} - The About section component.
 *
 * */
export default function About({ about }: { about: string }): JSX.Element {
  return (
    <section id="about">
      <DivideLayout direction="vertical">
        <SectionTitle title="Who am I?" color="text-warning" />
        <Description content={about} />
      </DivideLayout>
    </section>
  );
}
