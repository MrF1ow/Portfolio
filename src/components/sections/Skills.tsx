import Marquee from "react-fast-marquee";
import { SkillCard } from "@/components/ui/Card";
import { skillsImage } from "@/utils/skills-image";
import { skills as skillData } from "@/utils/data/skills";

export default function Skills() {
  return (
    <Marquee
      gradient={false}
      speed={50}
      pauseOnHover={true}
      pauseOnClick={true}
      delay={0}
      play={true}
      direction="left"
    >
      {skillData.map((skill) => (
        <div key={skill} className="mx-4">
          <SkillCard image={skillsImage({ skill })!} skill={skill} />
        </div>
      ))}
    </Marquee>
  );
}
