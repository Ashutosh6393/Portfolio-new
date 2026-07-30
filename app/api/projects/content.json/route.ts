// Every project, in homepage order. `show` and `order` are included on purpose:
// no tool may write them, but `publish({ revise: true })` has to read them here
// and carry them over, or a featured project quietly drops off the homepage.

import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getProjects());
}
