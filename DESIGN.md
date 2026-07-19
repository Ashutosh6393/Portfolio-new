---
name: The Quiet Specimen
description: A type-specimen portfolio for a full-stack + AI engineer — serif display, monospace margin notes, warm bone ink on charcoal, dual light/dark themes.
colors:
  ink-dark: "#e0ddd6"
  bg-dark: "#0d0d0d"
  muted-dark: "#8a8a8a"
  subtle-dark: "#2a2a2a"
  border-dark: "#1e1e1e"
  tag-bg-dark: "#161616"
  ink-light: "#141414"
  bg-light: "#f5f4f0"
  muted-light: "#8a8a8a"
  subtle-light: "#dddbd5"
  border-light: "#e0ddd8"
  tag-bg-light: "#eceae4"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(38px, 6vw, 54px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Sora, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Sora, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10.5px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.12em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11.5px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "5px"
spacing:
  xs: "8px"
  sm: "10px"
  md: "20px"
  gutter: "24px"
  section: "56px"
components:
  nav-link:
    textColor: "{colors.muted-dark}"
    typography: "{typography.mono}"
  nav-link-hover:
    textColor: "{colors.ink-dark}"
  theme-toggle:
    textColor: "{colors.muted-dark}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "5px 10px"
  theme-toggle-hover:
    textColor: "{colors.ink-dark}"
  item-title:
    textColor: "{colors.ink-dark}"
    typography: "{typography.title}"
  badge-wip:
    textColor: "{colors.muted-dark}"
    typography: "{typography.mono}"
    rounded: "{rounded.sm}"
    padding: "2px 7px"
  section-label:
    textColor: "{colors.muted-dark}"
    typography: "{typography.label}"
---

# Design System: The Quiet Specimen

## 1. Overview

**Creative North Star: "The Quiet Specimen"**

This is a type-specimen sheet reimagined as a portfolio. Every element is placed with the deliberation of a font foundry showing off a typeface: one narrow column of warm bone ink on charcoal, ruled off by hairline dividers, paced by generous vertical silence. The typography is the entire show. There is no accent color, no illustration, no card grid — the composition earns attention through restraint, hierarchy, and the tension between three deliberately-chosen typefaces: a literary serif for the name, a quiet geometric sans for prose, and a monospace for the margin notes an engineer leaves behind.

The register is calm, precise, and confident — the same three words that describe the person. Density is low: content breathes, and a recruiter skimming on mobile grasps who Ashutosh is and what he's shipped inside the first fold. Warmth carries entirely through the palette (bone, not white; charcoal, not black; paper, not gray) and through typography, never through decoration. The system ships two fully-committed themes — a charcoal night surface as the default and a warm-paper day surface — each a complete, considered world rather than an inverted copy.

This system explicitly rejects the generic AI/template portfolio: no uniform project-card grid, no gradient text, no hero-metric stat blocks, no `01 / 02 / 03` numbered section markers. It rejects the overloaded and flashy (no particle fields, no glass everywhere, motion appears once on load and then gets out of the way). It rejects the corporate and soulless (no stock photography, no agency-template energy — this reads as a specific person). And it rejects clutter (the single column and hairline rules make the work impossible to miss).

**Key Characteristics:**
- Single 680px column; hairline (`1px`) horizontal rules separate every section.
- Monochromatic, warm-neutral, dual-theme. No accent hue anywhere.
- Three-typeface system: serif display, sans body, mono labels/metadata.
- Motion is a single staggered load-in on the hero, then stillness.
- Warmth lives in the palette and type, never in decoration.

## 2. Colors

A monochromatic warm-neutral system built on the idea of ink on paper, expressed twice — once as night (charcoal), once as day (warm paper). There is no accent color by doctrine; contrast and hierarchy come from the four-step ink-to-muted ramp within each theme.

### Primary

The "primary" role in this system is the **ink** — the text color that carries the entire brand voice, since there is no accent.

- **Warm Bone** (`#e0ddd6`, dark theme): The default ink. A warm, slightly desaturated off-white — never pure white. Carries the serif name, body prose, and every foreground element on charcoal. The warmth here is the brand.
- **Ink** (`#141414`, light theme): The near-black text on warm paper. Soft charcoal-black, not `#000`, to keep the day theme from feeling harsh.

### Neutral

- **Charcoal** (`#0d0d0d`, dark theme background): The night surface. A near-black with a whisper of warmth, calmer than pure black.
- **Warm Paper** (`#f5f4f0`, light theme background): The day surface. A warm off-white with a paper feel; deliberately not a cool gray-white.
- **Muted** (`#8a8a8a`, both themes): Metadata, monospace notes, section labels, secondary link rest state. The "margin note" gray. On `#0d0d0d` this is 5.63:1 — WCAG AA needs 4.5:1, so `#7a7a7a` is the darkest permissible value. Do not go below it.
- **Subtle** (`#2a2a2a` dark / `#dddbd5` light): The default underline color under links — present but nearly invisible until hover.
- **Border** (`#1e1e1e` dark / `#e0ddd8` light): Every hairline rule, divider, nav border, and badge outline. The connective tissue of the whole layout.
- **Tag Surface** (`#161616` dark / `#eceae4` light): A barely-raised fill for tag/chip backgrounds when a filled treatment is wanted.
- **Nav Veil** (`rgba(13,13,13,0.9)` dark / `rgba(245,244,240,0.9)` light): The translucent nav background, paired with a `14px` backdrop blur so content softly passes beneath.

### Named Rules

**The No-Accent Rule.** There is no accent color, and adding one is forbidden. Emphasis is created by weight, size, the serif/sans/mono switch, and the ink→muted contrast ramp — never by hue. The moment a blue link or a colored highlight appears, the specimen is broken.

**The Warm-Neutral Rule.** Nothing is pure. Never `#ffffff` ink, never `#000000` surface, never a cool gray. Every neutral carries a trace of warmth; that trace is the identity.

**The Code-Block Exception.** Fenced code blocks in long-form writing are the *one* sanctioned break from No-Accent. Two allowances, code blocks only, nowhere else: (1) a macOS-style window frame — an `8px`-radius container with the standard traffic-light dots (`#ff5f56` / `#ffbd2e` / `#27c93f`); and (2) a restrained, warm, low-saturation syntax palette (comment / keyword / string / number tokens tuned per theme). Everything not tokenized stays ink. This exception never leaks into UI chrome, links, or any surface outside a `.code-block`.

## 3. Typography

**Display Font:** Newsreader (with Georgia, serif fallback)
**Body Font:** Sora (with sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with monospace fallback)

**Character:** A three-way conversation. Newsreader is literary and human — used for the name in the hero and, in italic, for the nav wordmark. Sora is a quiet geometric sans that stays out of the way and lets long prose read easily. JetBrains Mono is the engineer's hand: it marks every label, date, tech-stack line, and navigation item, signalling "this person writes code" without a word saying so. The contrast axis (serif ↔ geometric sans ↔ mono) does all the work; the pairing is distinctive precisely because the three families are so different in register.

### Hierarchy
- **Display** (Newsreader, 400, `clamp(38px, 6vw, 54px)`, line-height 1.08, letter-spacing -0.025em): The name in the hero. The single largest gesture on the page. Also used italic at 17px as the nav wordmark.
- **Title** (Sora, 500, 15px, letter-spacing -0.01em): Project names, job titles, any foreground list item that should feel clickable and solid.
- **Body** (Sora, 400, 15px base / 14.5px in prose, line-height 1.75–1.8): The bio and project descriptions. Prose runs at `opacity: 0.78–0.82` against the ink so it reads a touch softer than titles. Capped at `max-width: 540–580px` (~65–75ch).
- **Mono Meta** (JetBrains Mono, 400, 11.5–12.5px, muted): Dates, tech-stack lines, nav links, social links, the hero tagline. The recurring "margin note" texture.
- **Label** (JetBrains Mono, 500, 10.5px, letter-spacing 0.12em, UPPERCASE): The section markers — `WORK`, `PROJECTS`, `WRITING`. One per section, muted, quiet.

### Named Rules

**The Three-Hands Rule.** Serif is the person, sans is the prose, mono is the machine. Never mix these jobs: a date never gets set in Sora, a paragraph never gets set in mono, the name is never anything but Newsreader.

**The One-Serif-Moment Rule.** The serif is precious. It appears at true display scale exactly once (the hero name) and once small and italic (the wordmark). Do not spread Newsreader across headings and subheads — its rarity is what makes the specimen feel composed.

## 4. Elevation

Flat by doctrine. This system has zero drop shadows. Depth is conveyed three ways: hairline `1px` borders in the border color, tonal separation (the barely-lifted tag surface and nav veil), and a single `14px` backdrop blur on the sticky nav so the column appears to slide beneath frosted glass. That blur is the only "material" effect in the entire system, and it is functional (legibility of the sticky bar), not decorative.

### Named Rules

**The No-Shadow Rule.** Shadows are forbidden. If an element needs to feel separated, it gets a hairline border or a tonal fill — never a `box-shadow`. A shadow anywhere on this page is a bug.

**The Hairline Rule.** Every divider, border, and outline is exactly `1px` in the border token. No thick rules, and never a colored side-stripe (`border-left`/`border-right` as an accent) — that pattern is banned outright.

## 5. Components

### Navigation
- **Style:** Sticky top bar, 54px tall, translucent Nav Veil background with a `14px` backdrop blur and a `1px` bottom border. Constrained to the same 680px column as the content.
- **Wordmark:** The name in Newsreader italic, 17px, ink color, no underline.
- **Links:** JetBrains Mono, 12px, lowercase (`work` / `projects` / `writing`), muted at rest, transitioning to ink on hover over 0.15s. No underline.
- **Theme toggle:** A mono pill button, `1px` border, 5px radius, 5px/10px padding, muted text and border at rest. On hover both text and border shift toward ink. Label reads `light` while in dark mode and `dark` while in light mode.

### Links (global)
- **Rest:** Ink text with an underline in the near-invisible Subtle color, 3px underline-offset.
- **Hover:** Underline color animates up to full ink over 0.15s. Interactive list items (project titles, writing rows) instead fade to `opacity: 0.6` on hover rather than shifting underline.

### List Items (Work / Projects / Writing)
- **Work entry:** Title (Sora 500) and date (mono, muted) on a baseline-aligned row, then a mono company line, then dash-led bullets (`—` in muted, absolutely positioned) at 14px/0.82 opacity.
- **Project entry:** Title link (Sora 500, `↗` affix, hover→opacity 0.6), a `max-width: 540px` description at 0.78 opacity, and a mono tech-stack line separated by ` · `.
- **Writing row:** A full-width flex row — title left (14.5px, `text-wrap: pretty`), mono date + read-time right (`no-wrap`) — with a `1px` bottom border and 16px vertical padding. The last row drops its border.

### Badges / Tags
- **WIP badge:** JetBrains Mono, 10px, UPPERCASE, muted text, `1px` border, 4px radius, 2px/7px padding. Used inline beside a project title that isn't shipped yet.

### Section Labels
- **Style:** JetBrains Mono, 10.5px, UPPERCASE, letter-spacing 0.12em, muted. One per section, followed by 36px of space before content. These are structural markers, not decorative eyebrows — they name the three real content zones and nothing more.

### Theme System (signature)
Two complete themes toggled via a `data-theme` attribute on `<html>`, persisted to `localStorage` (`av-portfolio-theme`), defaulting to dark. Background and color cross-fade over 0.22s on switch. Each theme redefines the full token set; components reference tokens only, never raw hex, so both themes stay correct automatically.

## 6. Do's and Don'ts

### Do:
- **Do** keep everything in the single 680px column with a 24px gutter. The narrow measure is the composition.
- **Do** separate sections with a single `1px` `<hr>` in the border token, and nothing heavier.
- **Do** honor the Three-Hands Rule: Newsreader for the name, Sora for prose, JetBrains Mono for every label, date, and tech line.
- **Do** carry warmth through the palette — Warm Bone (`#e0ddd6`) ink, Charcoal (`#0d0d0d`) and Warm Paper (`#f5f4f0`) surfaces. Never pure white or pure black.
- **Do** keep both themes first-class: reference tokens, test every new element in light and dark, and verify body text clears 4.5:1 in both.
- **Do** let motion be a single staggered `fadeUp` on first load, and provide a `prefers-reduced-motion` path that shows content instantly.

### Don't:
- **Don't** ship the generic AI/template portfolio: no uniform project-card grid, no gradient text, no hero-metric stat blocks, no `01 / 02 / 03` numbered section markers.
- **Don't** go overloaded or flashy: no particle backgrounds, no decorative glassmorphism, no motion beyond the one hero load-in.
- **Don't** drift corporate or soulless: no stock photography, no agency-template layouts. This must read as a specific person.
- **Don't** let it get cluttered or hard to scan: protect the vertical silence, keep prose under ~75ch, never bury the work.
- **Don't** introduce an accent color, a drop shadow, or a colored side-stripe border — all three are forbidden by the No-Accent, No-Shadow, and Hairline rules.
- **Don't** set the serif anywhere but the name and wordmark; spreading Newsreader across headings breaks the One-Serif-Moment rule.
