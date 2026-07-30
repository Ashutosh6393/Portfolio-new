# Spec — what the `portfolio` repo must build

Source: [`design/adr-for-mcp.md`](../../design/adr-for-mcp.md), "Slice 0 — site prep".

This repo is **not** the MCP server. It is the thing the server reads from. Our whole
job here is a handful of read-only JSON routes plus one shared schema, so the server
never has to parse MDX or guess what a valid post looks like.

---

## Scope

**In:** five JSON routes under `/api`, one schema file that both this site and the
server trust.

**Out:** the server itself, the `workshop` repo, drafts, PRs, auth, skills. Nothing
in this repo writes anything.

---

## Why these routes exist

The server needs two things it cannot get from git alone:

1. **What is already published** — so `save_draft` can refuse a slug that is taken,
   and `list_content` can show the real site.
2. **What counts as valid** — so `publish` fails with a fixable message instead of a
   red Vercel build.

Both come from this site, because this site is the only place that already knows.

---

## Naming decision: `writing`, not `writings`

The ADR writes `api/writings/...`. The site's own route is `/writing/[slug]` and the
folder is `content/writing`. Three spellings for one thing is a bug waiting to happen.

**We use `/api/writing/...` and `/api/projects/...`** — matching the site exactly. The
server is not built yet, so this costs nothing. Update the ADR table when you touch it.

---

## The routes

All are plain App Router route handlers (`app/api/**/route.ts`). No auth — everything
they return is already visible on the public site. They are static at build time, so
they refresh when Vercel rebuilds after a merge. That is the same moment the post goes
live, so the server never sees a stale list.

### 1. `GET /api/writing/content.json`

Every published post, newest first (same sort as the site).

```json
[
  {
    "slug": "how-mcp-works",
    "title": "How MCP actually works",
    "date": "2026-07-25",
    "readingTime": "14 min",
    "summary": "A from-scratch walk through the Model Context Protocol…"
  }
]
```

A bare array. No `{ count, items }` wrapper — the length is `.length`.

### 2. `GET /api/projects/content.json`

Every project, sorted by `order` ascending (same as the site).

```json
[
  {
    "slug": "yapper",
    "title": "Yapper",
    "summary": "A collaborative note app on a hand-rolled local-first sync engine…",
    "stack": ["Local-first", "CRDT", "Sync engine", "Realtime", "Turborepo"],
    "status": "shipped",
    "repo": "https://github.com/Ashutosh6393/Yapper/",
    "demo": "https://yapper.ashutoshverma.dev/",
    "show": true,
    "order": 2
  }
]
```

`show` and `order` **are** included here on purpose — see "The show/order trap" below.
Optional keys that are unset stay absent.

### 3. `GET /api/writing/{slug}` and 4. `GET /api/projects/{slug}`

```json
{
  "slug": "how-mcp-works",
  "metadata": { "title": "…", "date": "…", "readingTime": "…", "summary": "…" },
  "body": "Every AI chatbot has the same blind spot.\n\n…"
}
```

- `metadata` comes from importing the MDX module — the object is already parsed by
  the bundler, so nobody writes a JS parser.
- `body` is the raw file **with the `export const metadata = {…};` block removed**,
  leading blank lines trimmed. The server pastes this straight back under a freshly
  generated metadata block, so a round trip must not change the prose.
- Unknown slug → HTTP 404, `{ "error": "not found" }`. Never a 500, never an empty
  200 — the server turns the body into a message the model reads.

**How the metadata block gets stripped:** one regex that matches `export const
metadata = {` through the next `};` sitting at the start of a line. Every file in
`content/` is written that way, by hand or by the server's template. Mark it with a
`ponytail:` comment naming the ceiling: if a post ever needs a second top-level
export, this needs a real parser instead.

### 5. `GET /api/schema.json`

The contract. Two JSON Schemas in one object:

```json
{ "writing": { "$schema": "…", "type": "object", … },
  "project": { "$schema": "…", "type": "object", … } }
```

The server fetches this and validates before opening a PR.

---

## One source for the schema

Right now `lib/content.ts` has hand-written TypeScript types (`PostMeta`,
`ProjectMeta`) and nothing checks them at runtime. If we hand-write a JSON Schema too,
we have two definitions that will drift — the exact thing the ADR says this route
exists to prevent.

**Decision: add `zod` (v4) as the single definition.**

- `z.infer` replaces the hand-written types in `lib/content.ts`.
- `z.toJSONSchema()` is built into Zod 4 — it generates `/api/schema.json`. No second
  dependency, no build step, no committed generated file.

One new dependency, one definition, both outputs. Schemas live in `lib/schema.ts`.

**`additionalProperties: false` on both schemas.** This is what enforces the ADR's
hard rule — a tool physically cannot set `show` or `order`, because those keys are not
in the write schema and unknown keys fail validation.

### Metadata shapes

**Writing** — this closes ADR open item #1. The site has no tag pages and nothing
reads a tag, so there are **no tags**. Add them the day something renders them.

| Key | Type | Required |
|---|---|---|
| `title` | string, non-empty | yes |
| `date` | string, `YYYY-MM-DD` | yes |
| `readingTime` | string, e.g. `"8 min"` | yes |
| `summary` | string, non-empty | yes |

**Project**

| Key | Type | Required |
|---|---|---|
| `title` | string, non-empty | yes |
| `summary` | string, non-empty | yes |
| `stack` | string[], at least one | yes |
| `status` | `"shipped"` \| `"wip"` | no |
| `repo` | URL | no |
| `demo` | URL | no |
| `show` | boolean | **not in the write schema** |
| `order` | number | **not in the write schema** |

Optional keys must be **absent**, never `""`. `repo: ""` renders a dead link on the
live site. The schema rejects empty strings so the mistake dies at validation.

### The show/order trap

`show` and `order` are banned from the write schema but present in `content.json`.
That is deliberate, and there is a hazard the ADR does not cover:

> `publish({ revise: true })` on a featured project regenerates the metadata block from
> tool arguments. Since the tool cannot pass `show`/`order`, a naive serializer drops
> them — and the project silently vanishes from the homepage.

The fix belongs in the server, but it only works because of a choice made here: the
server reads the current `show`/`order` from `content.json` and carries them over.
**Do not remove those two keys from `content.json`.** Leave this note for whoever
builds `publish`.

---

## Already done

- **OG images.** `app/opengraph-image.tsx`, `app/writing/[slug]/opengraph-image.tsx`,
  `app/projects/[slug]/opengraph-image.tsx`, all sharing `lib/og.tsx` on `next/og`
  (which is `@vercel/og`). Generated from title + stack, no uploaded assets. The ADR
  bullet is satisfied — nothing to build.

---

## Success check

One script the server author can run against a deployed URL:

1. `content.json` for both kinds returns an array whose length equals the file count
   in `content/`.
2. For one known slug: fetch `/api/writing/{slug}`, re-attach a metadata block built
   from the returned `metadata`, and diff against the file on disk. It must match.
3. `/api/writing/does-not-exist` returns 404 with a JSON error body.
4. Every object in `content.json` validates against the matching schema from
   `/api/schema.json` (minus `show`/`order`, which the write schema excludes).

Test 2 is the one that matters. It is the whole round trip in one assertion.

---

## Still open

1. **`readingTime` is hand-written.** A tool will have to guess it. Computing it from
   word count is one line and one fewer field for the model to get wrong — but it
   changes the metadata shape. Decide when `save_draft` gets built, not now.
2. **Cache headers.** The routes are static, so Vercel's CDN handles it. Revisit only
   if the server starts reading stale data after a merge.
