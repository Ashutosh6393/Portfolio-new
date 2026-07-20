// Shared Open Graph card renderer for content pages (/writing/[slug],
// /projects/[slug]) plus the font loader the site-wide card also uses.

import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Load a Google font as a TTF ArrayBuffer for satori. Sending no User-Agent
// makes the css2 endpoint return truetype (a modern UA returns woff/woff2,
// which satori can't parse); the `text` subset keeps the download tiny.
export async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(
    / /g,
    "+",
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const src = css.match(
    /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
  )?.[1];
  if (!src) throw new Error(`Could not resolve font: ${family}`);
  return (await fetch(src)).arrayBuffer();
}

const domain = new URL(profile.url).host;

export async function contentOgImage({
  label,
  title,
  meta,
}: {
  label: string; // eyebrow, e.g. "Writing" / "Project"
  title: string;
  meta: string; // date · reading time, or the stack
}) {
  const monoText = label + meta + profile.name + domain;
  const [serif, mono] = await Promise.all([
    loadGoogleFont("Newsreader", 500, title),
    loadGoogleFont("JetBrains Mono", 400, monoText),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 84,
          background: "#0d0d0d",
          fontFamily: "JetBrains Mono",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#8a867d",
          }}
        >
          {label}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: title.length > 48 ? 62 : 78,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              color: "#e8e5de",
            }}
          >
            {title}
          </div>
          {meta ? (
            <div style={{ marginTop: 28, fontSize: 24, color: "#9a968d" }}>
              {meta}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%", height: 1, background: "#2a2a2a" }} />
          <div
            style={{
              marginTop: 26,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 22,
              color: "#8a867d",
            }}
          >
            <span>{profile.name}</span>
            <span>{domain}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
