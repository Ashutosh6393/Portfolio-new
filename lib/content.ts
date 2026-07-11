// Server-only helpers that read the MDX content directories and pull each
// file's exported `metadata`. Used by the /writing and /projects indexes and
// their [slug] routes. Runs at build time (Server Components), never client.

import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";

export type PostMeta = {
  title: string;
  date: string; // ISO date, e.g. "2026-06-14"
  readingTime: string; // e.g. "8 min"
  summary: string;
};

export type ProjectMeta = {
  title: string;
  summary: string;
  stack: string[];
  status?: "shipped" | "wip";
  repo?: string; // source-code link, if public
  demo?: string; // live / "visit" link, if any
  show?: boolean; // when true, featured on the homepage; the /projects index shows all
  order?: number; // controls list order (ascending); defaults to end
};

const WRITING_DIR = path.join(process.cwd(), "content", "writing");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function slugsIn(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function writingSlugs(): string[] {
  return slugsIn(WRITING_DIR);
}

export function projectSlugs(): string[] {
  return slugsIn(PROJECTS_DIR);
}

export type Heading = { id: string; text: string };

// Pull the h2 headings from a raw .mdx file for the table of contents. Slugs are
// generated with github-slugger so they match the ids rehype-slug writes at
// build time. Fenced code blocks are skipped so a commented `## ...` never leaks
// into the TOC.
export function getHeadings(type: "writing" | "projects", slug: string): Heading[] {
  const dir = type === "writing" ? WRITING_DIR : PROJECTS_DIR;
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return [];

  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (!match) continue;
    // Strip inline markdown (`code`, **bold**, *italic*) to plain label text.
    const text = match[1]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/\*([^*]+)\*/g, "$1")
      .trim();
    headings.push({ id: slugger.slug(text), text });
  }
  return headings;
}

export type Post = PostMeta & { slug: string };
export type Project = ProjectMeta & { slug: string };

export async function getWritingPosts(): Promise<Post[]> {
  const posts = await Promise.all(
    writingSlugs().map(async (slug) => {
      const { metadata } = (await import(`@/content/writing/${slug}.mdx`)) as {
        metadata: PostMeta;
      };
      return { slug, ...metadata };
    }),
  );
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(
    projectSlugs().map(async (slug) => {
      const { metadata } = (await import(`@/content/projects/${slug}.mdx`)) as {
        metadata: ProjectMeta;
      };
      return { slug, ...metadata };
    }),
  );
  return projects.sort(
    (a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER),
  );
}
