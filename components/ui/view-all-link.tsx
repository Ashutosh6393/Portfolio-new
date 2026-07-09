import Link from "next/link";
import type { ReactNode } from "react";

// The "view all" control under the home Projects / Writing sections.
// Quiet mono text link, muted→ink on hover, with an arrow that nudges right.
export function ViewAllLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group mt-8 inline-flex items-center gap-1.5 font-mono text-[12px] text-muted no-underline transition-colors hover:text-ink"
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-150 ease-out group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
