// The four success tests from design.md, against a running server.
//
//   bun run dev
//   bun specs/mcp-content-api/check.ts               # http://localhost:3000
//   bun specs/mcp-content-api/check.ts https://…     # or a deploy
//
// ponytail: asserts, no test framework. This runs by hand when the routes
// change, and once more by whoever builds the MCP server.

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { projectFileSchema, writingMetaSchema } from "@/lib/schema";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

async function get(route: string) {
  const res = await fetch(`${base}${route}`);
  return { status: res.status, body: await res.json() };
}

function filesIn(dir: string) {
  return fs
    .readdirSync(path.join(process.cwd(), "content", dir))
    .filter((f) => f.endsWith(".mdx"));
}

// 1 — every published file shows up in content.json
const writing = await get("/api/writing/content.json");
const projects = await get("/api/projects/content.json");
assert.equal(writing.body.length, filesIn("writing").length, "writing count");
assert.equal(projects.body.length, filesIn("projects").length, "projects count");

// 2 — the round trip that matters: the body we hand out is the exact tail of the
// file, so re-attaching a metadata block reproduces the original byte for byte.
for (const [kind, dir, list] of [
  ["writing", "writing", writing.body],
  ["projects", "projects", projects.body],
] as const) {
  for (const item of list) {
    const doc = await get(`/api/${kind}/${item.slug}`);
    assert.equal(doc.status, 200, `${kind}/${item.slug} status`);
    const file = fs.readFileSync(
      path.join(process.cwd(), "content", dir, `${item.slug}.mdx`),
      "utf8",
    );
    assert.ok(
      file.startsWith("export const metadata = {"),
      `${item.slug}: metadata block not at the top`,
    );
    assert.ok(doc.body.body.length > 0, `${item.slug}: empty body`);
    assert.ok(file.endsWith(doc.body.body), `${item.slug}: body is not the file's tail`);
    assert.ok(
      !doc.body.body.includes("export const metadata"),
      `${item.slug}: metadata block leaked into the body`,
    );
    assert.equal(doc.body.metadata.title, item.title, `${item.slug}: list/detail disagree`);
  }
}

// 3 — unknown slug is a readable 404, never a 500 or an empty 200
const missing = await get("/api/writing/does-not-exist");
assert.equal(missing.status, 404, "missing slug status");
assert.equal(missing.body.error, "not found", "missing slug body");

// 4 — published metadata still satisfies the schema the server validates with.
// ponytail: validated with the local zod schemas rather than a JSON Schema
// validator — same definition, one fewer dependency. What's checked against the
// live route is that it serves both schemas and keeps them closed.
for (const item of writing.body) {
  const { slug, ...metadata } = item;
  writingMetaSchema.parse(metadata);
  assert.ok(slug, "writing item missing slug");
}
for (const item of projects.body) {
  const { slug, ...metadata } = item;
  projectFileSchema.parse(metadata);
  assert.ok(slug, "project item missing slug");
}

const schema = await get("/api/schema.json");
for (const kind of ["writing", "project"] as const) {
  assert.equal(schema.body[kind].type, "object", `${kind} schema type`);
  assert.equal(
    schema.body[kind].additionalProperties,
    false,
    `${kind} schema must be closed, or a tool could set show/order`,
  );
}
assert.ok(
  !("show" in schema.body.project.properties),
  "show must stay out of the write schema",
);
assert.ok(
  !("order" in schema.body.project.properties),
  "order must stay out of the write schema",
);

console.log(`all checks passed against ${base}`);
