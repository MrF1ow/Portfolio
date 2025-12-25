import type { Skill } from "@/types/skill";
import AnimatedLine from "./AnimatedLine";
import { personalImages } from "@/utils/images";

export const WorkCard = ({
  company,
  title,
  description,
  tags,
}: {
  company: string;
  title: string;
  description: string[];
  tags: string[];
}) => {
  return (
    <div className="d-card shadow-xl bg-base-100/25">
      <div className="d-card-body items-start">

        <h2 className="d-card-title text-left w-full tracking-widest">{title}</h2>


        <div className="d-badge d-badge-accent">{company}</div>


        <p>{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-start">
          {tags.map((tag) => (
            <div key={tag} className="d-badge d-badge-outline">
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
            <h4 className="">{skill.title}</h4>
            <AnimatedLine value={skill.value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProjectCard = ({
  image,
  title,
  description,
  tags,
}: {
  image: string;
  title: string;
  description: string;
  tags: string[];
}) => {
  return (
    <div className="d-card w-[75%] d-image-full shadow-xl">
      <figure>
        <img
          src={image}
          className="object-cover object-center w-full h-50"
          alt="Project"
        />
      </figure>
      <div className="d-card-body">
        <h2 className="d-card-title">{title}</h2>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 mt-2 w-full justify-start">
          {tags.map((tag) => (
            <div key={tag} className="d-badge d-badge-outline">
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
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
    <div className="d-card bg-base-100/50 w-full md:w-80 shadow-sm">
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
