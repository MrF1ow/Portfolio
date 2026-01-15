/* Type Imports */
import type { Skill } from "@/types/skill";
import type { Project } from "@/types/project";
import type { Job } from "@/types/experience";
import type { JSX } from "react";

/* Hook Imports */
import { useInView } from "@/hooks/useInView";

/* Component Imports */
import { AnimatedLine } from "@/components/ui/Animated";

/* Utility Imports */
import { personalImages } from "@/utils/images";

/*
 * WorkCard
 *
 * This component displays a single work experience entry.
 * It shows the job position, company, start/end dates, description,
 * and associated tags, styled as a card with badges.
 *
 * @param {Job} job - The work experience data including position, company, dates, description, and tags.
 *
 * @returns {JSX.Element} - The WorkCard component.
 *
 * */
export const WorkCard = ({ job }: { job: Job }): JSX.Element => {
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

        <p className="tracking-wider">{job.description}</p>

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

/*
 * SkillCard
 *
 * This component displays a skill category with its associated skills.
 * Each skill shows an icon, title, and a progress line indicating proficiency.
 *
 * @param {string} category - The name of the skill category.
 * @param {Skill[]} items - The array of skills in this category, including title, icon, iconColor, and value.
 *
 * @returns {JSX.Element} - The SkillCard component.
 *
 * */
export const SkillCard = ({
  category,
  items,
}: {
  category: string;
  items: Skill[];
}): JSX.Element => {
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

/*
 * ProjectCard
 *
 * This component displays a single project entry as a clickable card.
 * It shows the project title, description, and associated tags,
 * with hover effects for interactivity.
 *
 * @param {Project} project - The project data including title, description, tags, and source link.
 *
 * @returns {JSX.Element} - The ProjectCard component.
 *
 * */
export const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  return (
    <a href={project.src}>
      <div className="d-card shadow-xl bg-base-100/25 border border-transparent hover:border hover:border-primary transition-all">
        <div className="d-card-body items-start">
          <h2 className="d-card-title text-left w-full tracking-widest">
            {project.title}{" "}
          </h2>

          <p className="tracking-wide">{project.description}</p>

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

/*
 * TraitCard
 *
 * This component displays a personal trait as a card with an image,
 * title, and description.
 *
 * @param {string} title - The title of the trait.
 * @param {string} description - A brief description of the trait.
 * @param {string} image - The image file name or path representing the trait.
 *
 * @returns {JSX.Element} - The TraitCard component.
 *
 * */
export const TraitCard = ({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}): JSX.Element => {
  const { ref, isInView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="relative bg-cover bg-center rounded-xl overflow-hidden shadow-xl h-48 md:h-60 lg:h-72 w-full"
      style={{ backgroundImage: `url(${personalImages({ image: image })!})` }}
    >
      <div
        className={`absolute bottom-0 left-0 flex flex-col w-full justify-start bg-base-100/50 p-4 trait-overlay ${
          isInView ? "in-view" : ""
        }`}
      >
        <h2 className="text-2xl tracking-wider trait-text trait-text-title">
          {title}
        </h2>
        <p className="trait-text trait-text-desc">{description}</p>
      </div>
    </div>
  );
};