// One project — same shape as /api/writing/[slug].

import { getDoc, projectSlugs } from "@/lib/content";

export function generateStaticParams() {
  return projectSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = await getDoc("projects", slug);
  if (!doc) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(doc);
}
