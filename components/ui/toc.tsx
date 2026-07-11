"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/content";

// Floating table of contents for long-form pages. Fixed in the left gutter
// beside the reading column, hidden below 1240px where there's no room. Real
// anchor links (keyboard-reachable) plus a scroll-spy that marks the section
// currently in view. h2 only — the list is passed in from the server.
export function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // Track each heading's visibility; the active one is the first (in document
    // order) whose top has crossed into the upper band of the viewport. Only
    // updates when something is in that band, so the last section stays lit at
    // the bottom of the page instead of clearing.
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting);
        }
        const current = headings.find((h) => visible.get(h.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-88px 0px -66% 0px", threshold: 0 },
    );

    for (const el of els) observer.observe(el);
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="fixed left-[calc(50vw-576px)] top-1/2 hidden w-[180px] -translate-y-1/2 min-[1240px]:block"
    >
      <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
        Contents
      </p>
      <ul className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => setActive(h.id)}
                className="group flex items-start gap-2.5 no-underline"
              >
                <span
                  aria-hidden
                  className={`mt-[7px] h-px w-5 shrink-0 origin-left transition-[transform,background-color] duration-300 ease-out ${
                    isActive
                      ? "scale-x-100 bg-ink"
                      : "scale-x-[0.35] bg-border group-hover:scale-x-75 group-hover:bg-ink"
                  }`}
                />
                <span
                  className={`line-clamp-2 font-mono text-[11px] leading-[1.45] transition-colors duration-200 [text-wrap:pretty] ${
                    isActive ? "text-ink" : "text-muted group-hover:text-ink"
                  }`}
                >
                  {h.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
