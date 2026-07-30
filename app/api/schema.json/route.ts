// The contract between this site and the MCP server: what a valid post looks
// like. Generated from the same zod schemas the site's types come from, so the
// two can't drift.

import { z } from "zod";
import { projectMetaSchema, writingMetaSchema } from "@/lib/schema";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    writing: z.toJSONSchema(writingMetaSchema),
    project: z.toJSONSchema(projectMetaSchema),
  });
}
