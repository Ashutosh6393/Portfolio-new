// The external links for a project: source code and/or live "visit".
// Rendered beside the title on the list rows and in the case-study header.
// Each link only appears when its URL is present.
function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline transition-colors hover:text-ink"
    >
      {label}
      <span aria-hidden> ↗</span>
    </a>
  );
}

export function ProjectLinks({
  repo,
  demo,
  className = "",
}: {
  repo?: string;
  demo?: string;
  className?: string;
}) {
  if (!repo && !demo) return null;

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap font-mono text-[12px] text-muted ${className}`}
    >
      {repo && <ExternalLink href={repo} label="source code" />}
      {repo && demo && (
        <span aria-hidden className="text-border">
          ·
        </span>
      )}
      {demo && <ExternalLink href={demo} label="visit" />}
    </span>
  );
}
