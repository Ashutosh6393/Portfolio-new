import { SectionLabel } from "@/components/site/section-label";
import { ProjectRow } from "@/components/ui/project-row";
import { ViewAllLink } from "@/components/ui/view-all-link";
import { getProjects } from "@/lib/content";

export async function ProjectsSection() {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.show);

  return (
    <section id="projects" className="scroll-mt-16 py-14">
      <SectionLabel>Projects</SectionLabel>
      <div className="flex flex-col">
        {featured.map((project, i) => (
          <ProjectRow
            key={project.slug}
            project={project}
            last={i === featured.length - 1}
          />
        ))}
      </div>
      <ViewAllLink href="/projects">all projects</ViewAllLink>
    </section>
  );
}
