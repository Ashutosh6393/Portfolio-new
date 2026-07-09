import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { ProjectRow } from "@/components/ui/project-row";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built at the intersection of full-stack engineering and applied AI.",
};

function Divider() {
  // return (
  //   <div className="h-5 bg-[repeating-linear-gradient(60deg,var(--bg)_0px,var(--bg)_8px,var(--border)_8px,var(--border)_9px)]"></div>
  // );
  return <hr className="border-0 border-t border-border" />;
}

export default async function ProjectsIndex() {
  const projects = await getProjects();

  return (
    <Container className="pb-24 pt-[76px]">
      <header className="mb-12">
        <h1 className="mb-3 font-serif text-[clamp(30px,5vw,44px)] font-normal leading-[1.12] tracking-[-0.02em]">
          Projects
        </h1>
        <p className="max-w-[540px] font-mono text-[12.5px] leading-[1.65] text-muted">
          Things I&apos;ve built at the intersection of full-stack engineering
          and applied AI.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="py-10 text-[14.5px] text-ink opacity-[0.7]">
          Nothing here yet — check back soon.
        </p>
      ) : (
        <div className="flex flex-col gap-11">
          {projects.map((project) => (
            <>
            <ProjectRow key={project.slug} project={project} />
            <Divider/>
            </>
          ))}
        </div>
      )}
    </Container>
  );
}
