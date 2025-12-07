import DivideLayout from "@/components/layouts/Divide";
import WorkCards from "@/components/sections/subsections/WorkCards";
import Lottie from "@/components/ui/Lottie";
import businessMan from "@/assets/lotties/business-man.json";

export default function Experience() {
  return (
    <DivideLayout direction="horizontal">
      <Lottie animationData={businessMan} />
      <WorkCards />
    </DivideLayout>
  );
}
