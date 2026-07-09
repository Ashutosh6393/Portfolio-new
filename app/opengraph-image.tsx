import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { profile } from "@/content/profile";

// Node runtime so we can read the photo off disk with fs.
export const runtime = "nodejs";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const domain = new URL(profile.url).host;
const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

// Load a Google font as a TTF ArrayBuffer for satori. Sending no User-Agent
// makes the css2 endpoint return truetype (a modern UA returns woff/woff2,
// which satori can't parse); the `text` subset keeps the download tiny.
async function loadGoogleFont(family: string, weight: number, text: string) {
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

// The profile photo as a data URI, or null if it isn't present.
async function loadPhoto(): Promise<string | null> {
  const candidates = ["profile-pic.png", "og-photo.png", "og-photo.jpg"];
  for (const file of candidates) {
    try {
      const buffer = await readFile(path.join(process.cwd(), "public", file));
      const mime = file.endsWith(".png") ? "image/png" : "image/jpeg";
      return `data:${mime};base64,${buffer.toString("base64")}`;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

export default async function Image() {
  const photo = await loadPhoto();

  const [serif, mono] = await Promise.all([
    loadGoogleFont("Newsreader", 500, profile.name + initials),
    loadGoogleFont("JetBrains Mono", 400, profile.role + domain),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 76,
          padding: "0 96px",
          background: "#0d0d0d",
          fontFamily: "JetBrains Mono",
        }}
      >
        {photo ? (
          <img
            src={photo}
            width={380}
            height={380}
            style={{
              width: 380,
              height: 380,
              objectFit: "cover",
              borderRadius: 28,
              border: "1px solid #2a2a2a",
            }}
          />
        ) : (
          <div
            style={{
              width: 380,
              height: 380,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 28,
              background: "#161616",
              border: "1px solid #2a2a2a",
              fontFamily: "Newsreader",
              fontSize: 150,
              color: "#e8e5de",
            }}
          >
            {initials}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 82,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "#e8e5de",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 27,
              letterSpacing: "0.01em",
              color: "#9a968d",
            }}
          >
            {profile.role}
          </div>
          <div
            style={{ marginTop: 34, width: 120, height: 1, background: "#2a2a2a" }}
          />
          <div style={{ marginTop: 30, fontSize: 22, color: "#8a867d" }}>
            {domain}
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
