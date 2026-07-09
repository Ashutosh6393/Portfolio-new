import { Container } from "@/components/site/container";
import { Hero } from "@/components/home/hero";
import { WorkSection } from "@/components/home/work-section";
import { ProjectsSection } from "@/components/home/projects-section";
import { WritingSection } from "@/components/home/writing-section";

function Divider() {
  return (
    <div className="h-5 bg-[repeating-linear-gradient(60deg,var(--bg)_0px,var(--bg)_8px,var(--border)_8px,var(--border)_9px)]"></div>
  );
  // return <hr className="border-0 border-t border-border" />;
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
