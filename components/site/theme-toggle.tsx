"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  // Label names the theme you'll switch TO.
  const nextLabel = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${nextLabel} theme` : "Toggle theme"}
      className="relative -mr-1.5 inline-flex h-9 w-9 items-center justify-center rounded-[5px] text-muted transition-colors hover:text-ink"
    >
      {/* Sun and Moon stacked; they crossfade and rotate past each other on
          toggle. Both stay hidden until mounted so the pre-hydration render
          never flashes the wrong icon. */}
      <Sun
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-all duration-300 ease-out ${
          mounted && !isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
      />
      <Moon
        size={16}
        strokeWidth={1.75}
        className={`absolute transition-all duration-300 ease-out ${
          mounted && isDark ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}
