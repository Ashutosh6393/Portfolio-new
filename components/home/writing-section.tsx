import Link from "next/link";
import { SectionLabel } from "@/components/site/section-label";
import { WritingRow } from "@/components/ui/writing-row";
import { getWritingPosts } from "@/lib/content";
import { postMeta } from "@/lib/format";

const MAX_ON_HOME = 5;

export async function WritingSection() {
  const posts = await getWritingPosts();
  const recent = posts.slice(0, MAX_ON_HOME);
  const hasMore = posts.length > recent.length;

  return (
    <section id="writing" className="scroll-mt-16 pb-20 pt-14">
      <SectionLabel>Writing</SectionLabel>
      <div className="flex flex-col">
        {recent.map((post, i) => (
          <WritingRow
            key={post.slug}
            href={`/writing/${post.slug}`}
            title={post.title}
            meta={postMeta(post.date, post.readingTime)}
            last={!hasMore && i === recent.length - 1}
          />
        ))}
      </div>
      {hasMore && (
        <Link
          href="/writing"
          className="mt-6 inline-block font-mono text-[12px] text-muted no-underline transition-colors hover:text-ink"
        >
          All writing →
        </Link>
      )}
    </section>
  );
}
