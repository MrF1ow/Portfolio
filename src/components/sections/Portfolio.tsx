/* Type Imports */
import type { JSX } from "react";

/* Package Imports */
import Lottie from "lottie-react";

/* Component Imports */
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import { ProjectCard } from "@/components/ui/Card";

/* Data Imports */
import webCoding from "@/assets/lotties/web-coding.json";
import { projects } from "@/utils/data/projects";

/*
 * Portfolio
 *
 * This component renders the Projects/Portfolio section of the page.
 * It sorts project data, maps each project to a ProjectCard, and
 * displays the content using nested DivideLayout components with
 * optional animations and a Lottie illustration.
 *
 * @returns {JSX.Element} - The Portfolio section component.
 *
 * */
export default function Portfolio(): JSX.Element {
  const sorted = [...projects].sort((a, b) => a.id - b.id);

  const projectCards = sorted.map((proj) => (
    <ProjectCard key={proj.title + proj.id} project={proj} />
  ));
  return (
    <section id="projects">
      <DivideLayout direction="vertical">
        <SectionTitle title="Projects" />
        <DivideLayout direction="horizontal">
          <Lottie animationData={webCoding} />
          <DivideLayout direction="vertical" width="w-full" animated={true}>
            {projectCards}
          </DivideLayout>
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
