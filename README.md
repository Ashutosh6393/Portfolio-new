# Portfolio

A personal portfolio for **Ashutosh Verma** — a full-stack + AI engineer. Minimalist,
typography-led, and content-driven. The design system is *"The Quiet Specimen"*: a
type-specimen sheet reimagined as a portfolio, with a single narrow column, hairline
rules, and dual dark/light themes. See [`DESIGN.md`](./DESIGN.md) for the full system.

## Tech stack

- **[Next.js 16](https://nextjs.org)** (App Router) + **React 19**
- **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** for styling
- **[MDX](https://mdxjs.com)** (`@next/mdx`) — projects and posts are authored as `.mdx`
- **[next-themes](https://github.com/pacocoursey/next-themes)** — dark (default) / light
- **[lucide-react](https://lucide.dev)** — icons (e.g. the theme toggle)
- **Fonts:** Newsreader (serif display), Sora (sans body), JetBrains Mono (mono labels)
- **[Bun](https://bun.sh)** — package manager and runtime
- **ESLint** — linting

## Getting started

This project uses **bun**. Do not use npm, yarn, or pnpm.

```bash
bun install       # install dependencies
bun dev           # start the dev server → http://localhost:3000
bun run build     # production build
bun run start     # serve the production build
bun run lint      # lint
```

## Project structure

```
app/                     App Router routes
  page.tsx               Home (hero + work + projects + writing)
  projects/              /projects index and /projects/[slug] case studies
  writing/               /writing index and /writing/[slug] posts
  layout.tsx             Root layout, fonts, theme provider
  globals.css            Theme tokens + base styles
components/
  site/                  Nav, footer, theme toggle, container, section labels
  home/                  Home-page sections (hero, work, projects, writing)
  ui/                    Reusable rows and links (project-row, writing-row, …)
content/
  projects/*.mdx         One MDX file per project
  writing/*.mdx          One MDX file per post
lib/content.ts           Reads the MDX directories and their exported metadata
DESIGN.md                The "Quiet Specimen" design system
PRODUCT.md               Product context (audience, purpose, principles)
```

## Authoring content

Content lives in `content/` as MDX. Each file exports a `metadata` object; the body
below it is the rendered content. The file name is the URL slug.

### A project — `content/projects/<slug>.mdx`

```ts
export const metadata = {
  title: "Real-time Collaborative Notes",
  summary: "One or two sentences describing the project.",
  stack: ["WebSockets", "Operational Transforms"],
  status: "shipped",        // "shipped" | "wip"  (wip shows a badge)
  repo: "https://…",        // optional — "source code" link
  demo: "https://…",        // optional — "visit" (live) link
  show: true,               // when true, featured on the homepage
  order: 3,                 // ascending sort; lower comes first
};
```

- **`show`** controls the **homepage** only. The `/projects` index always lists every
  project regardless of `show`.
- **`repo`** and **`demo`** each render a link beside the title, and only appear when
  set. Omit either one to hide it.

### A post — `content/writing/<slug>.mdx`

```ts
export const metadata = {
  title: "Loop engineering",
  date: "2026-03-14",       // ISO date
  readingTime: "6 min",
  summary: "One-line summary.",
};
```

The homepage shows the latest 4 posts; the full list lives at `/writing`.

## Theming

Two complete themes (dark default + warm-paper light) are defined as CSS custom
properties in `app/globals.css` and toggled via a `data-theme` attribute on `<html>`,
persisted to `localStorage` under `av-portfolio-theme`. Components reference tokens
(`text-ink`, `text-muted`, `border-border`, …), never raw hex, so both themes stay
correct automatically.

## Deploy

Any Next.js host works ([Vercel](https://vercel.com) is the simplest). Build with
`bun run build`; all routes are statically prerendered.
