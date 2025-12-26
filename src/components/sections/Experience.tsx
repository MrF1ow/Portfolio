import DivideLayout from "@/components/layouts/Divide";
import Lottie from "@/components/ui/Lottie";
import SectionTitle from "@/components/ui/SectionTitle";

import { experiences } from "@/utils/data/experience";
import { WorkCard } from "@/components/ui/Card";
import businessMan from "@/assets/lotties/business-man.json";

export default function Experience() {
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
          <DivideLayout direction="vertical" width="w-full">
            {workCards}
          </DivideLayout>
        </DivideLayout>
      </DivideLayout>
    </section>
  );
}
