import DivideLayout from "@/components/layouts/Divide";
import WorkCards from "@/components/sections/subsections/WorkCards";
import Lottie from "@/components/ui/Lottie";
import businessMan from "@/assets/lotties/business-man.json";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Experience() {
  return (
    <>
      <SectionTitle title="Experience" variant="center" />
      <DivideLayout direction="horizontal">
        <Lottie animationData={businessMan} />
        <WorkCards />
      </DivideLayout>
    </>
  );
}
