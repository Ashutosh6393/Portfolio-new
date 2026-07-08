import { SectionLabel } from "@/components/site/section-label";
import { work } from "@/content/work";

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-16 py-14">
      <SectionLabel>Work</SectionLabel>
      <div className="flex flex-col gap-11">
        {work.map((entry) => (
          <div key={`${entry.company}-${entry.period}`}>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-1">
              <span className="text-[15px] font-medium tracking-[-0.01em]">
                {entry.role}
              </span>
              <span className="font-mono text-[11.5px] text-muted">
                {entry.period}
              </span>
            </div>
            <p className="mb-5 font-mono text-[12.5px] text-muted">
              {entry.company}
            </p>
            <ul className="flex flex-col gap-2.5">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="relative pl-[18px] text-[14px] leading-[1.7] text-ink opacity-[0.82]"
                >
                  <span className="absolute left-0 text-muted" aria-hidden>
                    —
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
