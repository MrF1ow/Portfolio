import { projects } from "@/utils/data/projects";
import { ProjectCode } from "@/components/ui/CodeMock";
import DivideLayout from "@/components/layouts/Divide";
import SectionTitle from "@/components/ui/SectionTitle";

export default function Portfolio() {
  const midpoint = Math.ceil(projects.length / 2);
  const leftProjects = projects.slice(0, midpoint);
  const rightProjects = projects.slice(midpoint);

  return (
    <>
      <SectionTitle title="Projects" variant="left" />
      <DivideLayout direction="horizontal">
        <DivideLayout direction="vertical">
          {leftProjects.map((project) => (
            <ProjectCode key={project.id} project={project} />
          ))}
        </DivideLayout>

        <DivideLayout direction="vertical">
          {rightProjects.map((project) => (
            <ProjectCode key={project.id} project={project} />
          ))}
        </DivideLayout>
      </DivideLayout>
    </>
  );
}
