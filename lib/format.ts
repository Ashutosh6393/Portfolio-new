// Format an ISO date as "Jun 2026".
export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// The right-hand metadata on a writing row: "Jun 2026 · 8 min".
export function postMeta(date: string, readingTime: string): string {
  return `${formatMonthYear(date)} · ${readingTime}`;
}
