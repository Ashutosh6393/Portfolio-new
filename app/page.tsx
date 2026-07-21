import { Container } from "@/components/site/container";
import { Hero } from "@/components/home/hero";
import { WorkSection } from "@/components/home/work-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { useId } from "react";

import { WritingSection } from "@/components/home/writing-section";

// The hairline stripe COLOR lives on background-color (which can tween), while
// the diagonal stripe SHAPE is a static alpha mask (which never changes with
// the theme). This keeps the divider fading in sync with the body's 0.22s
// background transition instead of snapping — gradient color-stops can't tween.
function Divider() {
   const uid = useId();
  const hatch = `hatch-${uid}`;
  const fade = `fade-${uid}`;
  const mask = `mask-${uid}`;

  return (
    <svg className="h-4 w-full text-muted" aria-hidden>
      <defs>
        <pattern id={hatch} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="9" stroke="currentColor" strokeWidth="2" />
        </pattern>
        <linearGradient id={fade} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.15" stopColor="#fff" />
          <stop offset="0.85" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={mask}>
          <rect width="100%" height="100%" fill={`url(#${fade})`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${hatch})`} mask={`url(#${mask})`} />
    </svg>
  );

  // return (
  //   <div className="h-4 bg-border transition-[background-color] duration-[220ms] ease-[ease] [-webkit-mask:repeating-linear-gradient(60deg,transparent_0px,transparent_8px,#000_8px,#000_9px)] [mask:repeating-linear-gradient(60deg,transparent_0px,transparent_8px,#000_8px,#000_9px)]"></div>
  // );
}

export default function Home() {
  return (
    <Container>
      <Hero />
      <Divider />
      <ProjectsSection />
      <Divider />
      <WorkSection />
      <Divider />
      <WritingSection />
    </Container>
  );
}
