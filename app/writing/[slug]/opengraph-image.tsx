import { contentOgImage } from "@/lib/og";
import { postMeta } from "@/lib/format";
import { writingSlugs, type PostMeta } from "@/lib/content";

export { size, contentType } from "@/lib/og";
export const alt = "Writing";

export function generateStaticParams() {
  return writingSlugs().map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = (await import(`@/content/writing/${slug}.mdx`)) as {
    metadata: PostMeta;
  };
  return contentOgImage({
    label: "Writing",
    title: metadata.title,
    meta: postMeta(metadata.date, metadata.readingTime),
  });
}
