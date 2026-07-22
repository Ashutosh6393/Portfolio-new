import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/site/container";
import { BackLink } from "@/components/site/back-link";
import { ProjectLinks } from "@/components/ui/project-links";
import { ShareButton } from "@/components/ui/share-button";
import { Toc } from "@/components/ui/toc";
import { getHeadings, projectSlugs, type ProjectMeta } from "@/lib/content";
import { profile } from "@/content/profile";

type ProjectModule = { default: ComponentType; metadata: ProjectMeta };

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as ProjectModule;
  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      url: `/projects/${slug}`,
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Project, metadata } = (await import(
    `@/content/projects/${slug}.mdx`
  )) as ProjectModule;
  const headings = getHeadings("projects", slug);

  return (
    <Container className="pb-24 pt-[76px]">
      <Toc headings={headings} />
      <BackLink href="/projects">Projects</BackLink>
      <header className="mb-12 mt-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-[clamp(30px,5vw,44px)] font-normal leading-[1.12] tracking-[-0.02em] [text-wrap:balance]">
            {metadata.title}
          </h1>
          {metadata.status === "wip" && (
            <span className="rounded-[4px] border border-border px-[7px] py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              wip
            </span>
          )}
        </div>
        <p className="font-mono text-[11.5px] text-muted">
          {metadata.stack.join(" · ")}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <ProjectLinks
            repo={metadata.repo}
            demo={metadata.demo}
            className="text-[12.5px]"
          />
          {(metadata.repo || metadata.demo) && (
            <span aria-hidden className="font-mono text-[12px] text-border">
              ·
            </span>
          )}
          <ShareButton title={metadata.title} />
        </div>
      </header>
      <article className="prose">
        <Project />
      </article>
    </Container>
  );
}
