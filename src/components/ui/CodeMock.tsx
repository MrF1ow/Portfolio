import type { Project } from "@/types/project";

export const ProjectCode = ({ project }: { project: Project }) => {
  switch (project.language) {
    case "typescript":
      return (
        <div className="d-mockup-browser d-glass w-full border border-base-300 h-80">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-warning p-4">
            <code className="text-primary font-semibold">const </code>
            <code className="text-neutral">project</code>
            <code className="text-warning"> = </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-primary font-semibold">title</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">description</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">tools</code>
              <code className="text-warning">: </code>
              <code className="text-neutral">[</code>
              {project.tags.map((t, i) => (
                <span key={i}>
                  <code className="text-accent">"</code>
                  <code className="text-neutral">{t}</code>
                  <code className="text-accent">"</code>
                  {i < project.tags.length - 1 && (
                    <code className="text-neutral">, </code>
                  )}
                </span>
              ))}
              <code className="text-neutral">]</code>
            </div>
            <code className="text-neutral">{"}"}</code>
            <code className="text-warning">;</code>
          </div>
        </div>
      );

    case "python":
      return (
        <div className="d-mockup-browser d-glass w-full border border-base-300 h-80">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-primary p-4">
            <code className="text-primary font-semibold">project</code>
            <code className="text-warning">: </code>
            <code className="text-accent font-semibold">dict </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-primary font-semibold">title</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">description</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">tools</code>
              <code className="text-warning">: </code>
              <code className="text-neutral">[</code>
              {project.tags.map((t, i) => (
                <span key={i}>
                  <code className="text-accent">"</code>
                  <code className="text-neutral">{t}</code>
                  <code className="text-accent">"</code>
                  {i < project.tags.length - 1 && (
                    <code className="text-neutral">, </code>
                  )}
                </span>
              ))}
              <code className="text-neutral">]</code>
            </div>
            <code className="text-neutral">{"}"}</code>
          </div>
        </div>
      );

    case "c":
      return (
        <div className="d-mockup-browser d-glass w-full border border-base-300 h-80">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-primary p-4">
            <code className="text-accent font-semibold">struct </code>
            <code className="text-primary font-semibold">Project </code>
            <code className="text-neutral">project</code>
            <code className="text-warning"> = </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-primary font-semibold">.title</code>
              <code className="text-warning"> = </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">.description</code>
              <code className="text-warning"> = </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-primary font-semibold">.tools</code>
              <code className="text-warning"> = </code>
              <code className="text-neutral">{"{"}</code>
              {project.tags.map((t, i) => (
                <span key={i}>
                  <code className="text-accent">"</code>
                  <code className="text-neutral">{t}</code>
                  <code className="text-accent">"</code>
                  {i < project.tags.length - 1 && (
                    <code className="text-neutral">, </code>
                  )}
                </span>
              ))}
              <code className="text-neutral">{"}"}</code>
            </div>
            <code className="text-neutral">{"}"}</code>
            <code className="text-warning">;</code>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export const UserCode = ({ user }: { user: PersonalInfo }) => {
  return (
    <div className="d-mockup-browser w-full bg-black/35 border border-neutral">
      <div className="d-mockup-browser-toolbar" />
      <div className="border-t border-neutral p-4">
        <code className="text-warning font-semibold">const </code>
        <code className="text-neutral">engineer</code>
        <code className="text-neutral"> = </code>
        <code className="text-neutral">{"{"}</code>
        <div className="ml-4">
          <code className="text-warning font-semibold">name</code>
          <code className="text-warning">: </code>
          <code className="text-accent">"</code>
          <code className="text-neutral">
            {user.firstName} {user.lastName}
          </code>
          <code className="text-accent">"</code>
          <code className="text-warning">,</code>
        </div>
        <div className="ml-4">
          <code className="text-warning font-semibold">title</code>
          <code className="text-warning">: </code>
          <code className="text-accent">"</code>
          <code className="text-neutral">{user.titles[0]}</code>
          <code className="text-accent">"</code>
          <code className="text-warning">,</code>
        </div>

        {/* university */}
        <div className="ml-4">
          <code className="text-warning font-semibold">university</code>
          <code className="text-warning">: </code>
          <code className="text-accent">"</code>
          <code className="text-neutral">{user.university}</code>
          <code className="text-accent">"</code>
          <code className="text-warning">,</code>
        </div>

        {/* degree */}
        <div className="ml-4">
          <code className="text-warning font-semibold">degree</code>
          <code className="text-warning">: </code>
          <code className="text-accent">"</code>
          <code className="text-neutral">{user.degree}</code>
          <code className="text-accent">"</code>
          <code className="text-warning">,</code>
        </div>

        {/* graduationYear */}
        <div className="ml-4">
          <code className="text-warning font-semibold">graduated</code>
          <code className="text-warning">: </code>
          <code className="text-accent">"</code>
          <code className="text-neutral">{user.graduated}</code>
          <code className="text-accent">"</code>
          <code className="text-warning">,</code>
        </div>

        {/* traits array */}
        <div className="ml-4">
          <code className="text-warning font-semibold">traits</code>
          <code className="text-warning">: </code>
          <code className="text-neutral">[</code>
          {user.traits.map((t: string, i: number) => (
            <span key={i}>
              <code className="text-accent">"</code>
              <code className="text-neutral">{t}</code>
              <code className="text-accent">"</code>
              {i < user.traits.length - 1 && (
                <code className="text-neutral">, </code>
              )}
            </span>
          ))}
          <code className="text-neutral">]</code>
        </div>
        <code className="text-neutral">{"}"}</code>
      </div>
    </div>
  );
};
