/* Type Imports */
import type { JSX } from "react";

/* Component Imports */
import SectionTitle from "@/components/ui/SectionTitle";
import DivideLayout from "@/components/layouts/Divide";
import { SkillCard } from "@/components/ui/Card";

/* Data Imports */
import { skills } from "@/utils/data/skills";

/*
 * Skills
 *
 * This component renders the Skills section of the page.
 * It displays skill categories and their respective items using
 * SkillCard components within a responsive vertical/horizontal stats layout.
 *
 * @returns {JSX.Element} - The Skills section component.
 *
 * */

export default function Skills(): JSX.Element {
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
