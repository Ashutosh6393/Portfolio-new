import Link from "next/link";

// A single writing-list row: title left, mono date + read-time right.
// Reused on the homepage (recent) and the /writing index.
export function WritingRow({
  href,
  title,
  meta,
  last = false,
}: {
  href: string;
  title: string;
  meta: string;
  last?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-baseline justify-between gap-5 py-4 no-underline transition-opacity hover:opacity-60 ${
        last ? "" : "border-b border-border"
      }`}
    >
      <span className="text-[14.5px] leading-[1.5] [text-wrap:pretty]">
        {title}
      </span>
      <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-muted">
        {meta}
      </span>
    </Link>
  );
}
