import type { Metadata } from "next";
import { Container } from "@/components/site/container";
import { WritingRow } from "@/components/ui/writing-row";
import { getWritingPosts } from "@/lib/content";
import { postMeta } from "@/lib/format";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on building software, AI systems, and the tools around them.",
};

export default async function WritingIndex() {
  const posts = await getWritingPosts();

  return (
    <Container className="pb-24 pt-[76px]">
      <header className="mb-10">
        <h1 className="mb-3 font-serif text-[clamp(30px,5vw,44px)] font-normal leading-[1.12] tracking-[-0.02em]">
          Writing
        </h1>
        <p className="max-w-[540px] font-mono text-[12.5px] leading-[1.65] text-muted">
          Notes on building software, AI systems, and the tools around them.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="py-10 text-[14.5px] text-ink opacity-[0.7]">
          Nothing published yet — check back soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {posts.map((post, i) => (
            <WritingRow
              key={post.slug}
              href={`/writing/${post.slug}`}
              title={post.title}
              meta={postMeta(post.date, post.readingTime)}
              last={i === posts.length - 1}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
