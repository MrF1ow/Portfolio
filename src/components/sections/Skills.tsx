import { skills } from "@/utils/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";
import { SkillCard } from "@/components/ui/Card";
import DivideLayout from "../layouts/Divide";

export default function Skills() {
  return (
    <section id="skills">
      <DivideLayout direction="vertical" width="w-full">
        <SectionTitle title="Skills" />
        <div className="d-stats d-stats-vertical lg:d-stats-horizontal shadow w-full">
          {Object.entries(skills).map(([category, items]) => (
            <div className="d-stat">
              <SkillCard key={category} category={category} items={items} />
            </div>
          ))}
        </div>
      </DivideLayout>
    </section>
  );
}
