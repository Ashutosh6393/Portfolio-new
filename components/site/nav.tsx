import Link from "next/link";
import { Container } from "@/components/site/container";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { profile } from "@/content/profile";

const links = [
  { href: "/#work", label: "work" },
  { href: "/#projects", label: "projects" },
  { href: "/#writing", label: "writing" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-[var(--nav-bg)] backdrop-blur-[14px]">
      <Container className="flex h-[54px] items-center justify-between">
        <Link
          href="/"
          className="font-serif text-[17px] italic tracking-[-0.01em] no-underline"
        >
          {profile.name}
        </Link>
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[12px] tracking-[0.02em] text-muted no-underline transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </Container>
    </nav>
  );
}
