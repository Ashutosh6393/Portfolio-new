// Site-wide profile. Placeholder content — edit freely; layout won't break.

export type SocialLink = {
  label: string;
  href: string;
};

export const profile = {
  name: "Ashutosh Verma",
  role: "Full-stack + AI Engineer",
  // Used for metadataBase / OpenGraph. Swap for the real domain.
  url: "https://ashutoshverma.dev",
  tagline:
    "Full-stack + AI engineer.",
  bio: "Full-stack engineer who ships AI-native products end to end — frontend to backend to deploy. My leverage is architectural: I design the system, use AI aggressively to build it, and get to a working product faster. Comfortable across the stack — TypeScript, React, Node, Python — and equally at home in retrieval systems, agent tooling, and the infra underneath. I learn in public.",
  resumeUrl: "https://drive.google.com/file/d/14zjVDc3Yduy-TwsZ19hKRa2K0HlBpPPH/view?usp=sharing",
  socials: [
    { label: "GitHub", href: "https://github.com/Ashutosh6393" },
    { label: "Twitter", href: "https://x.com/Ashutshv19" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashutoshv19/" },
    { label: "Instagram", href: "https://www.instagram.com/ashutoshv.19/" },
    { label: "Email", href: "mailto:ashutoshv262@gmail.com" },
  ] satisfies SocialLink[],
};
