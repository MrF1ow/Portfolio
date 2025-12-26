import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import webCoding from "@/assets/lotties/web-coding.json";
import Lottie from "lottie-react";

import { projects } from "@/utils/data/projects";
import { ProjectCard } from "@/components/ui/Card";

export default function Portfolio() {
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
