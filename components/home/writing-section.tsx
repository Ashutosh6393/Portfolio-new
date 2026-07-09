import { SectionLabel } from "@/components/site/section-label";
import { ViewAllLink } from "@/components/ui/view-all-link";
import { WritingRow } from "@/components/ui/writing-row";
import { getWritingPosts } from "@/lib/content";
import { postMeta } from "@/lib/format";

const MAX_ON_HOME = 4;

export async function WritingSection() {
  const posts = await getWritingPosts();
  const recent = posts.slice(0, MAX_ON_HOME);

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
            last={i === recent.length - 1}
          />
        ))}
      </div>
      <ViewAllLink href="/writing">all writing</ViewAllLink>
    </section>
  );
}
