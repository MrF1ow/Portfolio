import { skills } from "@/utils/data/skills";
import SectionTitle from "@/components/ui/SectionTitle";
import { SkillCard } from "@/components/ui/Card";

export default function Skills() {
  return (
    <section id="skills">
      <SectionTitle title="Skills" variant="center" />
      <div className="d-stats d-stats-vertical lg:d-stats-horizontal shadow w-full">
        {Object.entries(skills).map(([category, items]) => (
          <div className="d-stat">
            <SkillCard key={category} category={category} items={items} />
          </div>
        ))}
      </div>
    </section>
  );
}
