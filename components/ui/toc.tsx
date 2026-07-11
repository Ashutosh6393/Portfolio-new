"use client";

import { useEffect, useState } from "react";
import { List, X } from "lucide-react";
import type { Heading } from "@/lib/content";

// Floating table of contents for long-form pages. On wide screens it sits fixed
// in the left gutter beside the reading column. Below 1240px, where there's no
// gutter, it collapses to a floating button in the bottom-right that expands to
// the same list. h2 only — the list is passed in from the server.
export function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>(headings[0]?.id ?? "");
  const [open, setOpen] = useState(false);

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

  // Close the mobile panel on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (headings.length < 2) return null;

  const items = (onNavigate?: () => void) =>
    headings.map((h) => {
      const isActive = active === h.id;
      return (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            aria-current={isActive ? "location" : undefined}
            onClick={() => {
              setActive(h.id);
              onNavigate?.();
            }}
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
    });

  return (
    <>
      {/* Wide screens: quiet list fixed in the left gutter. */}
      <nav
        aria-label="Table of contents"
        className="fixed left-[calc(50vw-576px)] top-1/2 hidden w-[180px] -translate-y-1/2 min-[1240px]:block"
      >
        <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
          Contents
        </p>
        <ul className="flex max-h-[70vh] flex-col gap-3 overflow-y-auto">
          {items()}
        </ul>
      </nav>

      {/* Small screens: floating minimized launcher + expanding panel. */}
      <div className="min-[1240px]:hidden">
        {/* Tap-outside catcher; only interactive while open. */}
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={`fixed inset-0 z-30 cursor-default bg-transparent transition-opacity ${
            open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        />

        <nav
          id="toc-panel"
          aria-label="Table of contents"
          inert={!open}
          className={`fixed bottom-[76px] right-5 z-40 w-[min(260px,calc(100vw-40px))] origin-bottom-right rounded-[8px] border border-border bg-bg p-4 shadow-none transition-[opacity,transform] duration-200 ease-out ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-1 scale-95 opacity-0"
          }`}
        >
          <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
            Contents
          </p>
          <ul className="flex max-h-[50vh] flex-col gap-3 overflow-y-auto">
            {items(() => setOpen(false))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="toc-panel"
          aria-label={open ? "Close table of contents" : "Open table of contents"}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-[8px] border border-border bg-bg text-muted transition-colors hover:text-ink"
        >
          {open ? <X size={17} strokeWidth={1.75} /> : <List size={17} strokeWidth={1.75} />}
        </button>
      </div>
    </>
  );
}
