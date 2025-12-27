/* Type Imports */
import type { JSX } from "react";

/* Package Imports */
import Lottie from "lottie-react";

/* Component Imports */
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import { WorkCard } from "@/components/ui/Card";

/* Data Imports */
import { experiences } from "@/utils/data/experience";
import businessMan from "@/assets/lotties/business-man.json";

/*
 * Experience
 *
 * This component renders the Work Experience section of the page.
 * It sorts experience data, maps each entry to a work card, and
 * displays the content using nested DivideLayout components with
 * optional animations and a Lottie illustration.
 *
 * @returns {JSX.Element} - The Experience section component.
 *
 * */
export default function Experience(): JSX.Element {
  const sorted = [...experiences].sort((a, b) => a.id - b.id);

  const workCards = sorted.map((exp) => (
    <WorkCard key={exp.company + exp.id} job={exp} />
  ));

  return (
    <section id="experience">
      <DivideLayout direction="vertical">
        <SectionTitle title="Work Experience" />
        <DivideLayout direction="horizontal">
          <Lottie animationData={businessMan} />
          <DivideLayout direction="vertical" width="w-full" animated={true}>
            {workCards}
          </DivideLayout>
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
