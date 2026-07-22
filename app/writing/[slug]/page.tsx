import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Container } from "@/components/site/container";
import { BackLink } from "@/components/site/back-link";
import { ShareButton } from "@/components/ui/share-button";
import { Toc } from "@/components/ui/toc";
import { getHeadings, writingSlugs, type PostMeta } from "@/lib/content";
import { postMeta } from "@/lib/format";
import { profile } from "@/content/profile";

type PostModule = { default: ComponentType; metadata: PostMeta };

export function generateStaticParams() {
  return writingSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { metadata } = (await import(`@/content/writing/${slug}.mdx`)) as PostModule;
  return {
    title: metadata.title,
    description: metadata.summary,
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      url: `/writing/${slug}`,
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
    },
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { default: Post, metadata } = (await import(
    `@/content/writing/${slug}.mdx`
  )) as PostModule;
  const headings = getHeadings("writing", slug);

  return (
    <Container className="pb-24 pt-[76px]">
      <Toc headings={headings} />
      <BackLink href="/writing">Writing</BackLink>
      <header className="mb-12 mt-8">
        <h1 className="mb-4 font-serif text-[clamp(30px,5vw,44px)] font-normal leading-[1.12] tracking-[-0.02em] [text-wrap:balance]">
          {metadata.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] text-muted">
          <p>{postMeta(metadata.date, metadata.readingTime)}</p>
          <span aria-hidden className="text-border">
            ·
          </span>
          <ShareButton title={metadata.title} />
        </div>
      </header>
      <article className="prose">
        <Post />
      </article>
    </Container>
  );
}
