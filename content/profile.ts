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
  resumeUrl: "https://drive.google.com/file/d/14zjVDc3Yduy-TwsZ19hKRa2K0HlBpPPH/view?usp=sharing",
  socials: [
    { label: "GitHub", href: "https://github.com/Ashutosh6393" },
    { label: "Twitter", href: "https://x.com/Ashutshv19" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashutoshv19/" },
    { label: "Instagram", href: "https://www.instagram.com/ashutoshv.19/" },
    { label: "Email", href: "mailto:ashutoshv262@gmail.com" },
  ] satisfies SocialLink[],
};
