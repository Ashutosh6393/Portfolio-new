import Link from "next/link";
import { Container } from "@/components/site/container";

export default function NotFound() {
  return (
    <Container>
      <section className="flex flex-col items-start gap-4 py-[120px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          404
        </p>
        <h1 className="font-serif text-[clamp(32px,5vw,44px)] font-normal leading-[1.1] tracking-[-0.02em]">
          This page wandered off.
        </h1>
        <p className="max-w-[440px] text-[14.5px] leading-[1.8] text-ink opacity-[0.82]">
          The link may be broken, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-2 font-mono text-[12.5px] text-muted no-underline transition-colors hover:text-ink"
        >
          ← Back home
        </Link>
      </section>
    </Container>
  );
}
