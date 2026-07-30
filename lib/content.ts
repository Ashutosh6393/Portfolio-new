// Server-only helpers that read the MDX content directories and pull each
// file's exported `metadata`. Used by the /writing and /projects indexes and
// their [slug] routes. Runs at build time (Server Components), never client.

import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { PostMeta, ProjectMeta } from "@/lib/schema";

// Shapes live in lib/schema.ts, where the same zod definition also generates
// /api/schema.json. Re-exported here so existing call sites keep importing from
// "@/lib/content".
export type { PostMeta, ProjectMeta };

export type ContentType = "writing" | "projects";

const WRITING_DIR = path.join(process.cwd(), "content", "writing");
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function dirFor(type: ContentType): string {
  return type === "writing" ? WRITING_DIR : PROJECTS_DIR;
}

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
export function getHeadings(type: ContentType, slug: string): Heading[] {
  const file = path.join(dirFor(type), `${slug}.mdx`);
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

// --- Single documents, for the /api/{kind}/{slug} routes -------------------

// Matches the `export const metadata = {...};` block at the top of every content
// file, up to the closing brace sitting at the start of a line.
// ponytail: a regex, not a JS parser. Every file in content/ is written to this
// one template, by hand or by the MCP server. A post that needs a second
// top-level export is the signal to reach for a real parser.
const META_BLOCK = /^export const metadata = \{[\s\S]*?^\};\s*/m;

// The file with its metadata block stripped — raw MDX, prose only. The server
// pastes a freshly generated block back on top of this, so a read/write round
// trip has to leave the text byte-identical.
export function getBody(type: ContentType, slug: string): string | null {
  const file = path.join(dirFor(type), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return fs.readFileSync(file, "utf8").replace(META_BLOCK, "").trimStart();
}

export type ContentDoc = {
  slug: string;
  metadata: PostMeta | ProjectMeta;
  body: string;
};

// Metadata comes from importing the module — the bundler has already parsed the
// object literal, so nothing here reads JS out of a file. Returns null for an
// unknown slug; the route turns that into a 404 the model can read.
export async function getDoc(
  type: ContentType,
  slug: string,
): Promise<ContentDoc | null> {
  const body = getBody(type, slug);
  if (body === null) return null;

  const mod =
    type === "writing"
      ? ((await import(`@/content/writing/${slug}.mdx`)) as { metadata: PostMeta })
      : ((await import(`@/content/projects/${slug}.mdx`)) as { metadata: ProjectMeta });

  return { slug, metadata: mod.metadata, body };
}
