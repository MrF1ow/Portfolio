import type { Project } from "@/types/project";

export const CodeMock = ({ project }: { project: Project }) => {
  const wrapperProps = {
    href: project.src,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "no-underline",
  };
  switch (project.language) {
    case "typescript":
      return (
        <div className="d-mockup-browser bg-base-100 w-full border border-base-300">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-primary p-4">
            <code className="text-primary font-semibold">const </code>
            <code className="text-neutral">project</code>
            <code className="text-warning"> = </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-success font-semibold">title</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">description</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">tools</code>
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
        <div className="d-mockup-browser bg-base-100 w-full border border-base-300">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-primary p-4">
            <code className="text-success font-semibold">project</code>
            <code className="text-warning">: </code>
            <code className="text-accent font-semibold">dict </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-success font-semibold">title</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">description</code>
              <code className="text-warning">: </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">tools</code>
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
        <div className="d-mockup-browser bg-base-100 w-full border border-base-300">
          <div className="d-mockup-browser-toolbar">
            <div className="flex w-full justify-center text-warning font-bold">
              {project.title}
            </div>
          </div>
          <div className="border-t border-primary p-4">
            <code className="text-accent font-semibold">struct </code>
            <code className="text-success font-semibold">Project </code>
            <code className="text-neutral">project</code>
            <code className="text-warning"> = </code>
            <code className="text-neutral">{"{"}</code>
            <div className="ml-4">
              <code className="text-success font-semibold">.title</code>
              <code className="text-warning"> = </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.title}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">.description</code>
              <code className="text-warning"> = </code>
              <code className="text-accent">"</code>
              <code className="text-neutral">{project.description}</code>
              <code className="text-accent">"</code>
            </div>
            <div className="ml-4">
              <code className="text-success font-semibold">.tools</code>
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
