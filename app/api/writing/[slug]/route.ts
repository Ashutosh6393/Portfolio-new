// One post: its metadata as JSON, plus the raw MDX body with the metadata block
// removed. Known slugs are prerendered at build; anything else falls through to
// request time and 404s.

import { getDoc, writingSlugs } from "@/lib/content";

export function generateStaticParams() {
  return writingSlugs().map((slug) => ({ slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const doc = await getDoc("writing", slug);
  if (!doc) return Response.json({ error: "not found" }, { status: 404 });
  return Response.json(doc);
}
