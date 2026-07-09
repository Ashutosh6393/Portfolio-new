import { SectionLabel } from "@/components/site/section-label";
import { ProjectRow } from "@/components/ui/project-row";
import { ViewAllLink } from "@/components/ui/view-all-link";
import { getProjects } from "@/lib/content";

export async function ProjectsSection() {
  const projects = await getProjects();


  return (
    <section id="projects" className="scroll-mt-16 py-14">
      <SectionLabel>Projects</SectionLabel>
      <div className="flex flex-col gap-11">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
      <ViewAllLink href="/projects">all projects</ViewAllLink>
    </section>
  );
}
