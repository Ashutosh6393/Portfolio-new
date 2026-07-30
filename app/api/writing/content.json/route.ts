// Every published post, newest first — the same list and order the /writing
// index renders.

import { getWritingPosts } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getWritingPosts());
}
