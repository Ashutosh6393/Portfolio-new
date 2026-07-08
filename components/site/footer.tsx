import { Container } from "@/components/site/container";
import { profile } from "@/content/profile";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <Container className="flex items-center justify-between py-[22px]">
        <p className="font-mono text-[11.5px] text-muted">{profile.name}</p>
        <p className="font-mono text-[11.5px] text-muted">© {year}</p>
      </Container>
    </footer>
  );
}
