import { projects } from "@/utils/data/projects";
import { ProjectCode } from "@/components/ui/CodeMock";
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";
import webCoding from "@/assets/lotties/web-coding.json";
import Lottie from "lottie-react";

export default function Portfolio() {
  return (
    <section id="projects">
      <SectionTitle title="Projects" />
      <DivideLayout direction="horizontal">
        <Lottie animationData={webCoding} />
        <div>hello</div>
      </DivideLayout>
    </section>
  );
}
