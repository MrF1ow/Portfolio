import DivideLayout from "@/components/layouts/Divide";
import WorkCards from "@/components/sections/subsections/WorkCards";
import Lottie from "@/components/ui/Lottie";
import businessMan from "@/assets/lotties/business-man.json";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Experience() {
  return (
    <section id="experience">
      <DivideLayout direction="vertical">
        <SectionTitle title="Work Experience" />
        <DivideLayout direction="horizontal">
          <Lottie animationData={businessMan} />
          <WorkCards />
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
