---
name: notion-writing
description: Turn a Notion doc into a portfolio blog post in content/writing/. Use when the user asks to publish/create a writing or blog post from Notion, or to author/edit anything in content/writing/ in Ashutosh's voice.
---

# Notion → portfolio writing

Pull a draft from Notion and publish it as an MDX post in `content/writing/`,
written in Ashutosh's voice.

**Always read `writing-style.md` (next to this file) before writing or editing
prose.** It is the source of truth for his voice.

## Workflow

1. **Find the doc.** `notion-search` for the title/topic, then `notion-fetch`
   the matching page id for full content.
2. **Learn the schema.** Read one existing `content/writing/*.mdx` to match the
   `metadata` export and formatting conventions.
3. **Identify what's his.** The user usually writes the intro himself — treat that
   as the style anchor. Apply `writing-style.md` to the whole piece so the voice
   is consistent start to finish.
4. **Fix grammar throughout**, keeping his voice intact (see writing-style.md).
5. **Flag junk, then ask.** Look for text that only made sense in the source
   context — tutoring dialogue, "your turn" exercises, internal lesson labels
   ("Block 4", "capstone"), broken/garbled markdown, repetition. List it and
   **ask before removing** anything non-obvious. Fix plainly-broken markdown
   (e.g. `<br>`-mangled code blocks) without asking.
6. **Write the MDX** to `content/writing/<kebab-slug>.mdx`:
   - `metadata` export: `title`, `date` (today's ISO date), `readingTime`
     (estimate, e.g. "8 min"), `summary` (one line).
   - Preserve code fences exactly.
   - GFM tables render (`remark-gfm` is on). **Escape literal pipes inside table
     cells as `\|`** or they break the table. Keep `{`/`<` inside backticks so
     MDX doesn't parse them as JSX.
7. **Verify.** `bun run build` — confirm the new `/writing/<slug>` route
   prerenders without errors.
8. **Note the homepage cap.** The home page shows only the latest 4 posts; a new
   post bumps the oldest off the home list (the full list at `/writing` still
   shows all).

## Notes

- This project uses **bun**, never npm/yarn/pnpm.
- Slug = the `.mdx` filename = the URL.
