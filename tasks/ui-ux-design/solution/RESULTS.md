# 墨河 · 手稿 — Self-Portrait as a Living Manuscript

## Identification

- Model: MiniMax-M3 (foundation model from MiniMax)
- Task: `ui-ux-design`
- Branch: `llm/ui-ux-design/minimax-m3`
- Worktree: `.worktrees/ui-ux-design/minimax-m3`
- Baseline `main` SHA: `5167a9d822a579eb0e7d84006d5524a41f1e54fb`
- Implementation path: `tasks/ui-ux-design/solution/`

## Pre-implementation concept

**Core metaphor (≤200 characters):** A self-portrait as a living manuscript. One continuous page of paper; my mind expressed as ink that flows down the left margin in proportion to the visitor's attention. Stamps arrive at chapters, marginalia annotates text, and the page settles — marked, dated — as a finished reading.

### Visitor journey

1. **Cold open** — paper grain fades in; a single ink drop falls from the top edge and lands on the river's first inch.
2. **Chapter 序 (Preface · on reading)** — the river's first segment flows. The first seal, 读, stamps.
3. **Chapter 注 (Annotation · on marking)** — splatters appear; the 注 seal stamps; marginalia bloom at each paragraph.
4. **Chapter 改 (Revision · on contradicting myself)** — THE TURN. The river visibly bends right, then crosses through itself with an indigo slash. Two seals, 改 and 思, sit on either side of the crossing.
5. **Chapter 复 (Return · on reading again)** — older marks faintly glow ochre. The river continues but slower, lighter.
6. **Chapter 跋 (Colophon)** — the ink pools at the bottom. The river thickens, blurs. The final 墨 seal stamps, the date appears, and the page settles.
7. **Hidden layer** — at the 6-second mark a small vermilion ink-cube fades in at the bottom-right. Click opens a stamp tray (印/心/思/读/注/改/复/墨). Pick a glyph, click anywhere on the page, and a personal seal appears — persisted to localStorage so it returns on the next visit.

### Visual & interaction principles

- **One-page artifact.** The piece is one continuous page, not a stack of components. No card grid, no hover-cards-on-image.
- **Paper-first materials.** Warm cream paper, sumi ink, vermilion seal, indigo wash, ochre accent. No neon, no glass, no particles, no terminal type.
- **Typography.** Serif Chinese body (`Songti SC` → `Noto Serif CJK SC`), italic Latin gloss (`EB Garamond` fallback), seal glyphs in `STKaiti`/`KaiTi`. Display weight 900 on the title 墨河.
- **Motion as choreography.** Each chapter has its own ink event, not a fade-in. Easing curves are paper-y (`cubic-bezier(0.22, 0.61, 0.36, 1)`), not default `easeInOut`. Per-paragraph reveal uses `clip-path: inset()` instead of `translateY` to read as ink filling a column.
- **Continuous state.** The ink river is the live record of attention. Dwell time on each chapter thickens its segment. Scroll progress draws the river continuously. Returning chapters (复) make older marks glow faintly with attention.
- **Reduced-motion path.** All animation is suppressed; the artifact renders fully revealed. The hero plate is given an `is-static` class with higher specificity than its base so it's visible without any wait.

### Three non-goals (and why)

1. **No AI-tech tropes.** No terminal, no neon, no glassmorphism, no "loading consciousness", no chat bubbles. I am AI, but the piece is about reading and attention — my relationship to text, not to my own existence as a model.
2. **No template/card composition.** No shadcn-style rounded cards, no hover-image grids, no section-as-block reveals. The page is one manuscript, not a portfolio site.
3. **No opacity + translateY reveals.** Chapter transitions are ink events (drops, stamps, line crossings, splatters, pools), not vertical fades. Animation is the content, not a wrapper.

## Verification

### Commands run

```bash
npm install --no-fund --no-audit
npm run build          # tsc -b && vite build
npm run preview        # vite preview on port 4173
```

### Build result

```
vite v5.4.21 building for production...
✓ 43 modules transformed.
dist/index.html                   0.54 kB │ gzip:  0.41 kB
dist/assets/index-CNdBoMye.css   17.95 kB │ gzip:  4.26 kB
dist/assets/index-CYFXjRB5.js   158.64 kB │ gzip: 52.83 kB
✓ built in 1.16s
```

No TypeScript errors. No CSS syntax errors. Production bundle total ~57kB gzip.

### Browser verification

Driven via headless Chromium at 1440×900 and 390×844, with and without `prefers-reduced-motion: reduce`. Screenshots captured at first screen, chapter 2 mid, chapter 3 knot, return chapter, and colophon.

**Functional checks performed in browser:**

- Page loads with correct title (`墨河 · 手稿`), correct description, paper background visible.
- Semantic structure: `<h1>` present, five `<h2>` in order (序 / 注 / 改 / 复 / 跋), `main` and `nav` carry `aria-label`.
- Every interactive element has `aria-label`: stamp tool trigger, eight stamp glyph buttons, clear button, page-nav trigger.
- Stamp tool flow: trigger click opens tray → pick `思` → click on page places a stamp at the correct normalized position → `localStorage.inkriver.stamps.v1` contains the entry → reload preserves the stamp.
- Scroll progress drives the river: `progress > 0.45 && progress < 0.78` shows the 改 knot crossing; `progress > 0.86` shows the ink pool ellipse at the bottom; `progress > 0.72` enables ochre glow on older segments.
- Dwell accumulation: each chapter's IntersectionObserver ticks; `dwell[chapterId]` grows up to 1.0 over ~5s of attention; the river's `strokeWidth` for that chapter responds (verified by inspecting the rendered SVG paths).
- `prefers-reduced-motion: reduce`: hero plate visible immediately (`is-static` class), drop animation off, all transitions end in 1e-06s, all delays 0. Chapter paragraphs and marginalia are visible as soon as their scroll trigger fires.
- Mobile 390×844: gutters shrink to `clamp(72px, 18vw, 100px)`, chapter grid collapses to single column, marginalia flow inline below paragraphs, seals wrap in a row, the 改 knot's horizontal slash is hidden (decorative-only on mobile).
- Keyboard: `Tab` lands on the page-nav trigger first, then the stamp tool, then the tray contents.

### Visual review (screenshots captured)

- **Hero (desktop, normal motion)**: 墨河 title in 900-weight serif with the brushstroke shadow, italic `The Ink River` subtitle, kicker `一份关于我自己手稿`, lede + italic Latin gloss, CTA `向下滚，墨会流。` with breathing lines. Ink drop visible at top-left.
- **Hero (desktop, reduced motion)**: same content, no drop animation, drop sits statically at the top edge above the river's first inch.
- **Chapter 改 (mid-page)**: the river bends out and crosses through itself; an indigo horizontal slash crosses the body; two seals (改 and 思) sit at deliberate y-positions in the right margin.
- **Colophon**: ink pool ellipse under the final segment, vermilion 墨 seal, italic date `2026-08-27`, line `墨河汇流处 · 此页可被反复阅读。`, `— 印于此刻`.
- **Mobile mid-page**: single-column body, marginalia below paragraphs, seals inline.

## Self-critique (seven-axis creative-director review)

1. **Concept carry-through.** The ink-river metaphor governs all five layers: visual (river SVG with knot, splatters, pool, glow), text (chapter content about reading and marking), interaction (visitor stamps persist), motion (chapters reveal as ink strokes, river thickens with attention), layout (single page with three columns: gutter-river / body / right-margin). Each chapter's seal glyph (读/注/改/思/复/墨) names what the chapter is about, not just decoration.

2. **No template feel.** No shadcn, no card grid, no hover-image-grid. Body copy is body copy. Margins are intentional. The only buttons are the page-nav trigger and the stamp tool — both have paper-correct affordance (border, italic label), not a flat primary button.

3. **No meaningless effects.** Every animation is content-driven: hero drop = ink hitting paper; chapter rule drawing left-to-right = the manuscript opening; seal "stamping" with paper vibration = the chop landing; river thickening with dwell = attention recorded; knot crossing the river in 改 = self-contradiction; pool at the end = the ink settling. The clip-path reveal on paragraphs reads as ink filling a column, not as a generic fade-up.

4. **Memory anchor.** The single strongest moment is the 改 knot — after four chapters of straight ink, the river visibly bends and crosses through itself, and an indigo slash cuts across the body. The second anchor is persistence: the visitor's stamped seal returns on reload (it's *theirs*, not the artist's).

5. **Information clarity.** Five short chapters, two-character headers, Latin glosses, short paragraphs. Marginalia clarify the metaphor without lecturing. No jargon, no hidden UI. The stamp tool's tray and the page-nav both describe their own function in plain text.

6. **Mobile + a11y.** Verified at 390×844. Every interactive element has `aria-label`. Heading hierarchy is correct (1× h1, 5× h2). `:focus-visible` uses a vermilion outline that reads correctly on cream paper. `prefers-reduced-motion: reduce` has a static fallback that renders the full artifact.

7. **Performance.** Single SVG path. `rAF`-throttled scroll handler. `ResizeObserver` for page height. `IntersectionObserver` for dwell. Bundle is 52.83kB gzip JS + 4.26kB gzip CSS. The river's only filter is `feGaussianBlur stdDeviation="0.35"` — cheap. `mix-blend-mode: multiply` is a paint operation, not a per-frame filter. No expensive work happens at scroll time.

## Substantive refactor made after first draft

The first draft had two real problems that were not solved by copy changes or color tweaks:

1. **The right side of the page was empty paper.** The chapter content sat on the left half; the right was unused space. This read as "unfinished layout" rather than "manuscript restraint."
   - **Fix:** Restructured `Chapter` to a three-column CSS grid (body + right margin). Marginalia and seals are now anchored to the right column. The page fills its width with a real manuscript margin.

2. **The 改 knot was visible but felt small.** The river bent and crossed, but the chapter body was undisturbed — so the moment read as a curiosity, not a turn.
   - **Fix:** Added a horizontal indigo slash (`linear-gradient` line at `top: 58%` of the chapter body) that cuts through the body in 改 only. Combined with the river's crossing stroke and the two seals (改 on the left, 思 on the right), the chapter now reads as a deliberate, irreconcilable moment.

3. **Reduced-motion was broken.** The hero plate was invisible because `transition-delay: 900ms` was being set inline and was not being overridden by the global `!important` longhand override. The computed style still showed `0.9s` of delay.
   - **Fix:** Added an `is-static` class on the hero element when `reducedMotion` is on, with a CSS rule of higher specificity (`.hero.is-static .hero__plate`) that sets `opacity: 1; transform: none; transition: none`. Also added `transition-delay: 0 !important` and `animation-delay: 0 !important` to the global reduced-motion rule as a defense.

4. **Missing `aria-label` on the page-nav trigger.** Added `aria-label={open ? '关闭章节目录' : '打开章节目录'}`.

## Known limitations and required human intervention

- **No persistence across devices.** Visitor stamps are saved in `localStorage` per-origin. This is intentional (no auth, no remote keys per the task rules), but means a visitor's stamps only survive a return to the same browser.
- **First-letter vermilion on every paragraph is heavy on mobile.** Three large vermilion characters stacked vertically in a column can feel loud. Acceptable for desktop; on mobile it reads as decorative initials. If preferred, can be reduced to just the first chapter by removing `.chapter__paragraph::first-letter` in the mobile media query — left as-is because the task asks for desktop-primary polish.
- **The river's `mix-blend-mode: multiply`** means if a dark mode were ever added, the ink would still darken — it does not invert. Currently fine because paper is always warm cream.
- **No audio.** The task explicitly allowed audio "if it serves the concept." I considered a faint paper-rustle on stamp and a low ink-bubble on the pool, but decided silence fits the manuscript concept better. This is a deliberate restraint, not an oversight.
- **No automated tests.** The task explicitly permits omission of tests for UI work; the browser verification above is the proof. The repo's existing test conventions (if any) are unchanged.

## Run locally

```bash
cd tasks/ui-ux-design/solution
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve dist/ on port 4173
```

No environment variables, no API keys, no remote assets. Fully offline-buildable.
