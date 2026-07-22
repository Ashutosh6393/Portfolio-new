# Template — convert notes into a portfolio project page

Paste this whole file to Claude along with the source `.md` (README, build notes,
whatever). Output: **one `.mdx` file** to save at
`content/projects/<slug>.mdx`, where `<slug>` is the URL (kebab-case, e.g.
`yapper.mdx` → `/projects/yapper`).

Output the file only. No preamble, no "here's your file".

---

## 1. Metadata (required, top of file, plain JS object — not frontmatter)

```ts
export const metadata = {
  title: "Yapper",                       // required
  summary:                               // required — 1–2 sentences, shown in lists
    "A collaborative note app on a hand-rolled local-first sync engine. Notes render from IndexedDB and reconcile in the background, so editing is instant and works offline.",
  stack: ["Local-first", "CRDT", "Sync engine", "Realtime", "Turborepo"], // required — 3–6 concepts, not every package
  status: "shipped",                     // optional — "shipped" | "wip" (wip renders a badge)
  repo: "https://github.com/...",        // optional — omit the key entirely if none
  demo: "https://...",                   // optional — "visit" link; omit if none
  show: true,                            // optional — true = featured on the homepage
  order: 2,                              // optional — ascending; lower sorts first
};
```

Rules:
- Omit optional keys entirely rather than setting `""`, `null`, or `undefined`.
- `stack` is what the project *is about*, not a dependency list. "Sync engine",
  not "eslint".
- `order` — ask which slot, or use the next free number after the existing files.
- No `date` and no `readingTime`. Those are writing-only.

## 2. Body

Markdown after the metadata block. A blank line separates them.

Shape (drop any section that has nothing real to say):

```
<opening paragraph — no heading. What it is in one sentence, then the interesting part.>

## The problem
## <how it works — name it after the actual idea, e.g. "Two lanes", "The workflow">
## What's in it        ← two-column table: Piece | What it does
## Two decisions worth the space   ← 2 bolded claims, each with why + the failure it avoids
## Outcome             ← what changed, concretely
```

Constraints:
- `##` only for sections — they build the table of contents. `###` is fine
  inside a section; never use `#`.
- Wrap prose at ~80 columns.
- First person, past tense, dry. State what broke and what fixed it. No
  marketing adjectives, no "seamless", no exclamation marks.
- Backtick real identifiers: `rebuild()`, `db.notes`, `/api/sync/pull`.
- Numbers only if the source says them. Never invent a benchmark.

## 3. `<Flow>` diagrams (optional, project pages only)

A flowchart authored as data. Use it where the source describes a pipeline or a
sequence of steps; skip it otherwise. Two or three per page is plenty.

```jsx
<Flow
  title="Two lanes"
  rows={[
    {
      lead: "metadata",                                    // optional lane label on the left
      nodes: [{ label: "Dexie" }, { label: "queue" }, { label: "/api/sync" }],
      note: "push + pull",                                 // optional trailing muted text
    },
    {
      lead: "content",
      nodes: [
        { label: "y-indexeddb" },
        { label: "PUT /content", sub: "private" },         // sub = small qualifier under the label
        { label: "Hocuspocus", sub: "shared", op: "or" },  // op: "or" draws a fork instead of an arrow
        { label: "↺ retry", muted: true },                 // muted = borderless annotation
      ],
    },
  ]}
  caption="Two lanes meet at one note record — title / preview + version bump."
/>
```

Only `rows` is required; `title` and `caption` are optional. `nodes[].label` is
required, `sub` / `op` / `muted` are not. Nodes are joined left-to-right by
arrows by default. Follow every Flow with a paragraph that says what it means —
the diagram is a summary, not the explanation.

## 4. Also available

- Fenced code blocks render in a window frame with a copy button — just use
  normal ```` ```lang ```` fences.
- Markdown tables, blockquotes, `---` rules, links (external ones open in a new tab).
- No other components exist. Don't invent JSX.

---

## Skeleton

```mdx
export const metadata = {
  title: "",
  summary: "",
  stack: [],
  status: "shipped",
  repo: "",
  show: true,
  order: 1,
};

Opening paragraph: what it is, then the part that was actually hard.

## The problem

Prose, or a short list of concrete failures.

## How it works

<Flow rows={[{ nodes: [{ label: "" }, { label: "" }] }]} caption="" />

What the diagram means.

## What's in it

| Piece | What it does |
| --- | --- |
|  |  |

## Two decisions worth the space

**Claim one.** Why, and the failure it avoids.

**Claim two.** Why, and the failure it avoids.

## Outcome

What changed.
```
