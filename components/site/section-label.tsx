import type { ReactNode } from "react";

// The uppercase mono marker that names a content zone (WORK / PROJECTS / WRITING).
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-9 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-muted">
      {children}
    </p>
  );
}
