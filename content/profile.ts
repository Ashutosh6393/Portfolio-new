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
    "Full-stack + AI engineer. I build products on top of foundation models, from retrieval pipelines to the frontend people actually touch.",
  bio: "I'm a software developer with a year of professional experience and a slightly obsessive interest in the layer where full-stack engineering meets applied AI. Day to day I work in the usual web stack, but my real focus is building AI-native systems — retrieval-augmented generation, agent tooling, and the developer infrastructure around LLMs. I learn in public and treat every project as a chance to go one layer deeper than I strictly need to.",
  resumeUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "Email", href: "mailto:ashutosh@example.com" },
  ] satisfies SocialLink[],
};
