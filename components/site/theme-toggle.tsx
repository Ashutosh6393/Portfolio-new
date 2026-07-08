"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  // Label names the theme you'll switch TO (matches the source template).
  const nextLabel = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${nextLabel} theme` : "Toggle theme"}
      className="inline-flex min-w-[46px] items-center justify-center rounded-[5px] border border-border px-2.5 py-[5px] font-mono text-[11px] tracking-[0.06em] text-muted transition-colors hover:border-muted hover:text-ink"
    >
      {/* Empty until mounted to avoid a hydration mismatch on the label. */}
      <span suppressHydrationWarning>{mounted ? nextLabel : ""}</span>
    </button>
  );
}
