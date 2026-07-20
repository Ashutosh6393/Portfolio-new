import { contentOgImage } from "@/lib/og";
import { projectSlugs, type ProjectMeta } from "@/lib/content";

export { size, contentType } from "@/lib/og";
export const alt = "Project";

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = (await import(`@/content/projects/${slug}.mdx`)) as {
    metadata: ProjectMeta;
  };
  return contentOgImage({
    label: "Project",
    title: metadata.title,
    meta: metadata.stack.join(" · "),
  });
}
