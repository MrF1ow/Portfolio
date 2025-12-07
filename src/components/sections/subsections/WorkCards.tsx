import { experiences } from "@/utils/data/experience";
import { WorkCard } from "@/components/ui/Card";
import DivideLayout from "@/components/layouts/Divide";

export default function WorkCards() {
  const sorted = [...experiences].sort((a, b) => a.id - b.id);

  const workCards = sorted.map((exp) => (
    <WorkCard
      key={exp.company}
      company={exp.company}
      title={exp.position}
      responsibilities={exp.responsibilities}
      tags={exp.tags}
    />
  ));

  return <DivideLayout direction="vertical">{workCards}</DivideLayout>;
}
