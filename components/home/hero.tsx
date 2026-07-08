import { profile } from "@/content/profile";

type HeroLink = { label: string; href: string; arrow: boolean };

const links: HeroLink[] = [
  ...profile.socials.map((s) => ({
    label: s.label,
    href: s.href,
    arrow: s.href.startsWith("http"),
  })),
  { label: "Resume", href: profile.resumeUrl, arrow: true },
];

export function Hero() {
  return (
    <section className="pb-[68px] pt-[76px]">
      <h1
        className="fade-up mb-5 font-serif text-[clamp(38px,6vw,54px)] font-normal leading-[1.08] tracking-[-0.025em] [text-wrap:balance]"
        style={{ animationDelay: "0.05s" }}
      >
        {profile.name}
      </h1>

      <p
        className="fade-up mb-7 max-w-[540px] font-mono text-[12.5px] leading-[1.65] text-muted"
        style={{ animationDelay: "0.15s" }}
      >
        {profile.tagline}
      </p>

      <p
        className="fade-up mb-9 max-w-[580px] text-[14.5px] leading-[1.8] text-ink opacity-[0.82] [text-wrap:pretty]"
        style={{ animationDelay: "0.25s" }}
      >
        {profile.bio}
      </p>

      <div
        className="fade-up flex flex-wrap"
        style={{ animationDelay: "0.35s" }}
      >
        {links.map((link) => {
          const external = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="mb-2 mr-5 font-mono text-[12.5px] text-muted no-underline transition-colors hover:text-ink"
            >
              {link.label}
              {link.arrow && <span aria-hidden> ↗</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}
