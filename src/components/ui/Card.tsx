export const WorkCard = ({
  company,
  title,
  responsibilities,
  tags,
}: {
  company: string;
  title: string;
  responsibilities: string[];
  tags: string[];
}) => {
  return (
    <div className="d-card w-full shadow-xl d-glass">
      <div className="d-card-body items-start">
        {/* Title */}
        <h2 className="d-card-title text-left w-full">{title}</h2>

        {/* Company badge */}
        <div className="d-badge d-badge-accent">{company}</div>

        {/* Responsibilities */}
        <ul className="list-disc list-inside space-y-1 text-sm mt-2 w-full text-left">
          {responsibilities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

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
  image,
  skill,
}: {
  image: string;
  skill: string;
}) => {
  return (
    <div className="d-card w-full shadow-xl d-glass">
      <div className="d-card-body items-center">
        <img src={image} alt={skill} className="w-16 h-16 mb-4" />
        <h3 className="d-card-title text-center">{skill}</h3>
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
