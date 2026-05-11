import { useState } from "react";

interface SkillCategory {
  id: string;
  label: string;
  description: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    id: "backend",
    label: "Backend",
    description: "Server-side systems and data layers",
    skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "MySQL", "Docker", "AWS", "Go"],
  },
  {
    id: "frontend",
    label: "Frontend",
    description: "Interfaces and client-side architecture",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind"],
  },
  {
    id: "systems",
    label: "Systems & Networking",
    description: "Infrastructure and tooling",
    skills: ["Linux", "Git", "Docker", "CI/CD", "Networking", "Shell Scripting"],
  },
  {
    id: "personal",
    label: "Personal",
    description: "How I work with people",
    skills: ["Problem Solving", "Team Collaboration", "Communication", "Adaptability", "Leadership"],
  },
  {
    id: "life",
    label: "Life",
    description: "What drives me outside of code",
    skills: ["Faith", "Family", "Hiking", "Continuous Learning", "Community"],
  },
];

function SkillCard({
  category,
  expanded,
  onToggle,
}: {
  category: SkillCategory;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className={`text-left w-full md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)] p-6 bg-dark border transition-all duration-300 cursor-pointer ${
        expanded ? "border-accent/40 border-l-accent border-l-2" : "border-border-dark hover:border-border-dark/80"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-sans text-lg font-medium tracking-tight text-dark-text">
            {category.label}
          </h3>
          <p className="font-mono text-xs text-dark-muted mt-1">
            {category.description}
          </p>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 text-dark-muted transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className={`grid transition-all duration-300 ${
          expanded ? "grid-rows-[1fr] mt-5 opacity-100" : "grid-rows-[0fr] mt-0 opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill, i) => (
              <span
                key={skill}
                className="font-mono text-xs px-2.5 py-1 bg-dark-text/10 text-dark-muted transition-opacity duration-300"
                style={{
                  transitionDelay: expanded ? `${i * 50}ms` : "0ms",
                  opacity: expanded ? 1 : 0,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function Skills() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">
          Skills
        </p>
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text mb-12">
          What I bring to the table
        </h2>

        <div className="flex flex-wrap justify-center gap-4 items-start">
          {categories.map((cat) => (
            <SkillCard
              key={cat.id}
              category={cat}
              expanded={expanded === cat.id}
              onToggle={() =>
                setExpanded(expanded === cat.id ? null : cat.id)
              }
            />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
