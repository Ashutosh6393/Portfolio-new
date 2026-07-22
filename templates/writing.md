# Template — convert notes into a portfolio writing post

Paste this whole file to Claude along with the source `.md`. Output: **one
`.mdx` file** to save at `content/writing/<slug>.mdx`, where `<slug>` is the URL
(kebab-case, e.g. `how-i-learned-python-in-2-hours.mdx` →
`/writing/how-i-learned-python-in-2-hours`).

Output the file only. No preamble.

---

## 1. Metadata (required, top of file, plain JS object — not frontmatter)

```ts
export const metadata = {
  title: "How I learned Python in 2 hours",
  date: "2026-07-11",        // ISO, YYYY-MM-DD. Sorts the list — newest first.
  readingTime: "14 min",     // rounded, ~200 words/min
  summary:                   // one line, shown in lists and the link preview
    "A first-principles, JavaScript-to-Python speedrun — everything I needed to read and understand Python code, and build a small FastAPI app, in about two hours.",
};
```

All four keys are required. There are no optional ones — no `stack`, no
`status`, no `show`, no `order`. Ask for the date if the source doesn't have one;
don't guess.

## 2. Body

Markdown after the metadata block, separated by a blank line.

- Open with context, no heading — why this was written, what the goal was.
- `##` for top-level sections — they build the table of contents. `###` for
  subsections. Never `#`.
- `---` between major sections is fine (see the Python post).
- Close with a short wrap-up, no heading needed.
- Wrap prose at ~80 columns.

Voice: first person, conversational, direct. Explain by bridging from what the
reader already knows. Keep the asides and the "this trips people up" notes —
they're the point. Cut hype and filler.

## 3. What renders

- Fenced code blocks → window frame with a copy button. Always tag the language
  (```` ```python ````, ```` ```bash ````, ```` ```plain text ```` for trees).
- Markdown tables — the workhorse for X-vs-Y comparisons. Escape pipes inside
  cells as `\|`.
- Blockquotes, bold, inline `code`, links (external ones open in a new tab).
- `<Flow>` exists but is for project pages. Don't use it here.
- No other components. Don't invent JSX.

---

## Skeleton

```mdx
export const metadata = {
  title: "",
  date: "",
  readingTime: "",
  summary: "",
};

Context: why this exists, what you were trying to do.

---

## First section

Prose.

### A subsection

| A | B |
| --- | --- |
|  |  |

```lang
code
```

---

## Second section

Prose.

---

Wrap-up.
```
