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
