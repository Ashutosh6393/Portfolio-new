import Link from "next/link";
import type { Project } from "@/lib/content";

// A project entry on the homepage / projects index. The title links to the
// case-study page; the WIP badge marks unshipped work.
export function ProjectRow({ project }: { project: Project }) {
  return (
    <div>
      <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
        <Link
          href={`/projects/${project.slug}`}
          className="text-[15px] font-medium tracking-[-0.01em] no-underline transition-opacity hover:opacity-60"
        >
          {project.title}
        </Link>
        {project.status === "wip" && (
          <span className="rounded-[4px] border border-border px-[7px] py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            wip
          </span>
        )}
      </div>
      <p className="mb-3.5 max-w-[540px] text-[14px] leading-[1.75] text-ink opacity-[0.78]">
        {project.summary}
      </p>
      <p className="font-mono text-[11.5px] text-muted">
        {project.stack.join(" · ")}
      </p>
    </div>
  );
}
