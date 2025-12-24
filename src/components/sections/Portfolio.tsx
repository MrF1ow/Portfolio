import { projects } from "@/utils/data/projects";
import { ProjectCode } from "@/components/ui/CodeMock";
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import webCoding from "@/assets/lotties/web-coding.json";
import Lottie from "lottie-react";

export default function Portfolio() {
  return (
    <section id="projects">
      <SectionTitle title="Projects" variant="center" />
      <DivideLayout direction="horizontal">
        <div>hello</div>
        <Lottie animationData={webCoding} />
      </DivideLayout>
    </section>
  );
}
