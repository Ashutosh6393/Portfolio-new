import Link from "next/link";
import type { ReactNode } from "react";

export function BackLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-block font-mono text-[12px] text-muted no-underline transition-colors hover:text-ink"
    >
      ← {children}
    </Link>
  );
}
