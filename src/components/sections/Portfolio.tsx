import { projects } from "@/data/projects";
import type { Project } from "@/types/project";

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col justify-between p-6 sm:p-8 bg-bg-alt border border-border transition-colors duration-300 hover:bg-dark hover:border-border-dark ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3
            className={`font-sans font-medium tracking-tight text-text group-hover:text-dark-text transition-colors duration-300 ${
              project.featured ? "text-2xl sm:text-3xl" : "text-xl"
            }`}
          >
            {project.title}
          </h3>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="shrink-0 text-text-faint group-hover:text-dark-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M5 15L15 5M15 5H8M15 5v7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <p
          className={`font-mono text-text-muted group-hover:text-dark-muted leading-relaxed transition-colors duration-300 ${
            project.featured ? "text-sm sm:text-base max-w-lg" : "text-sm"
          }`}
        >
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-2.5 py-1 bg-text/5 text-text-faint group-hover:bg-dark-text/10 group-hover:text-dark-muted transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-sm tracking-widest uppercase text-text-faint mb-4">Portfolio</p>
        <h2 className="font-sans text-3xl md:text-4xl font-medium tracking-tight text-text mb-12">
          Things I've built
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="https://github.com/MrF1ow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-7 py-3 font-mono text-sm tracking-wide bg-transparent text-text border border-text hover:bg-text/5 transition-colors"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
}
