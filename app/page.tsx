import { Container } from "@/components/site/container";
import { Hero } from "@/components/home/hero";
import { WorkSection } from "@/components/home/work-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { WritingSection } from "@/components/home/writing-section";

// The hairline stripe COLOR lives on background-color (which can tween), while
// the diagonal stripe SHAPE is a static alpha mask (which never changes with
// the theme). This keeps the divider fading in sync with the body's 0.22s
// background transition instead of snapping — gradient color-stops can't tween.
function Divider() {
  return (
    <div className="h-4 bg-border transition-[background-color] duration-[220ms] ease-[ease] [-webkit-mask:repeating-linear-gradient(60deg,transparent_0px,transparent_8px,#000_8px,#000_9px)] [mask:repeating-linear-gradient(60deg,transparent_0px,transparent_8px,#000_8px,#000_9px)]"></div>
  );
}

export default function Home() {
  return (
    <Container>
      <Hero />
      <Divider />
      <WorkSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <WritingSection />
    </Container>
  );
}
