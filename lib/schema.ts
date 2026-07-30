// One definition of "valid metadata", used twice: `z.infer` gives the types the
// site renders with, `z.toJSONSchema` gives /api/schema.json the MCP server
// validates against before it opens a publish PR. Two hand-written definitions
// would drift — stopping that is the whole reason the schema route exists.

import { z } from "zod";

const text = z.string().min(1);

// What a publish tool is allowed to write. `strictObject` becomes
// `additionalProperties: false` in the JSON Schema, which is what turns "a tool
// can never set `show` or `order`" into a rule the schema enforces rather than
// one someone has to remember at 11pm.
export const writingMetaSchema = z.strictObject({
  title: text,
  date: z.iso.date(), // YYYY-MM-DD
  readingTime: text, // e.g. "8 min"
  summary: text,
});

export const projectMetaSchema = z.strictObject({
  title: text,
  summary: text,
  stack: z.array(text).min(1),
  status: z.enum(["shipped", "wip"]).optional(),
  repo: z.url().optional(), // source-code link, if public
  demo: z.url().optional(), // live / "visit" link, if any
});

// The site's own view of a project file: the writable fields plus the two
// homepage controls. `show` and `order` are set by hand in the .mdx and stay out
// of `projectMetaSchema` on purpose, so no tool can reach them.
export const projectFileSchema = projectMetaSchema.extend({
  show: z.boolean().optional(), // when true, featured on the homepage
  order: z.number().optional(), // list order, ascending; defaults to end
});

export type PostMeta = z.infer<typeof writingMetaSchema>;
export type ProjectMeta = z.infer<typeof projectFileSchema>;
