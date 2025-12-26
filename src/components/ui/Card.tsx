import type { Skill } from "@/types/skill";
import AnimatedLine from "./AnimatedLine";
import { personalImages } from "@/utils/images";
import type { Project } from "@/types/project";
import type { Job } from "@/types/experience";

export const WorkCard = ({ job }: { job: Job }) => {
  return (
    <div className="d-card shadow-xl bg-base-100/25">
      <div className="d-card-body items-start">
        <div className="flex flex-col md:flex-row w-full items-center">
          <h2 className="d-card-title text-left w-full tracking-widest">
            {job.position}{" "}
          </h2>
          <div className="text-left md:text-right w-full text-sm italic font-extralight">
            {job.startDate} <span>-</span> {job.endDate}
          </div>
        </div>

        <div className="d-badge d-badge-primary">{job.company}</div>

        <p>{job.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-start">
          {job.tags.map((tag) => (
            <div
              key={tag}
              className="d-badge d-badge-outline hover:bg-warning transition-all"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SkillCard = ({
  category,
  items,
}: {
  category: string;
  items: Skill[];
}) => {
  return (
    <div className="d-card w-full">
      <div className="d-card-body gap-3">
        <h2 className="d-card-title">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        {items.map((skill) => (
          <div id={skill.title}>
            <div className="flex flex-row items-center gap-2">
              <skill.icon
                className="text-lg"
                style={{ color: skill.iconColor }}
              />
              <h4>{skill.title}</h4>
            </div>
            <AnimatedLine value={skill.value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <a href={project.src}>
      <div className="d-card shadow-xl bg-base-100/25 hover:scale-101 transition-all">
        <div className="d-card-body items-start">
          <h2 className="d-card-title text-left w-full tracking-widest">
            {project.title}{" "}
          </h2>

          <p>{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 w-full justify-start">
            {project.tags.map((tag) => (
              <div
                key={tag}
                className="d-badge d-badge-outline hover:bg-warning transition-all"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
};

export const TraitCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) => {
  return (
    <div className="d-card bg-base-100/50 shadow-sm">
      <figure className="h-48 w-full overflow-hidden">
        <img
          src={personalImages({ image: image })!}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="d-card-body">
        <h2 className="d-card-title text-2xl tracking-wider">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};
