# Result Report — ui-ux-design / swe-2

- **Model**: `magpie/devin/swe-2` (candidate id `swe-2`)
- **Baseline `main` commit**: `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
- **Solution path**: `tasks/ui-ux-design/solution/`
- **Stack**: React 19 + Vite + a hand-rolled Canvas 2D ink engine. No WebGL, no
  animation libraries — the whole effect is a `<canvas>` annotation layer over
  typeset prose.

---

## 1. Core concept (<200 chars, written before coding)

> **You don't read this portfolio — you mark it up.** It is a draft of how I
> work, and you are holding the red pen. Every cursor move, press, and scroll
> leaves ink in the margins; the manuscript is only finished once *you* have
> annotated it.

The concept governs everything: the paper, the vermilion ink, the hand font for
marginalia, the pen nib that follows the cursor, the section notes that stamp
themselves as you scroll, and a colophon that counts what *you* left behind —
so the piece ends by describing the reader, not the author.

## 2. Visitor journey

1. **Arrive** — a masthead set like a title page; the nib hovers at the cursor
   and the first line ("I write in the margins…") sets the contract.
2. **First mark** — the hint invites a press-and-drag; the stroke lands as real
   ink, teaching the rule: *this page can be edited.*
3. **Read down** — each section that crosses the reading line gets the author's
   own margin note stamped beside it, so the manuscript accumulates annotation
   in reading order.
4. **Discover** — pressing a wavy phrase underlines it; holding still draws a
   thinking-circle; a double-click stamps a fresh aside + circle. These are the
   hidden layers.
5. **Colophon** — the page turns the pen back on you: ink laid down, underlines,
   circles, notes. A manuscript is only finished once it's been read.

## 3. Visual & interaction principles

- **Editorial over decorative**: one typeface family, two inks (vermilion for
  the pen, graphite for structure), ruled laid paper. No neon, no glass, no
  particle field — restraint as a deliberate choice.
- **Ink has physics**: stroke width thins with speed and swells with pressure;
  underlines sag; circles wobble. Marks are in document space so they scroll
  *with* the prose, never floating like a HUD.
- **Feedback is causal**: the colophon's counters are driven by the same marks
  you made. Reading and marking are the same act.
- **Progress is a drawn line**: the left ribbon fills with ink as you read —
  the manuscript's spine, not a scrollbar.

## 4. Three things I deliberately did *not* do

- **No WebGL / 3D hero.** A 3D scene would have been spectacle for its own
  sake; the concept lives in a 2D annotation layer, so canvas ink is the honest
  medium.
- **No skill bars / project grid.** Listing competencies would break the
  manuscript metaphor; the *behaviour* of the page is the evidence.
- **No scroll-jacking or reveal-on-scroll batching.** `translateY + opacity`
  reveals would fight the conceit that the page is a stable, physical draft —
  so the prose is static and the *ink* is what moves.

## 5. Creative-director self-review (7 axes)

| Axis | Verdict |
| ---- | ------- |
| Concept贯穿 | ✅ Margin/annotation drives visuals, copy, interaction, and the colophon |
| 模板感 | ✅ None — no card grid, no stock hero, no typewriter effect |
| 无意义动效 | ✅ Every motion is the pen doing work; nothing animates for show |
| 记忆点 | ✅ "The portfolio you annotate" + the colophon that grades the reader |
| 信息易懂 | ✅ Four short sections + a colophon; contact is one line |
| 移动端/可访问性 | ✅ `pointer-events:none` canvas so text stays selectable; reduced-motion disables fade-ins; `aria-label`s on sections; pen nib hidden on touch |
| 性能 | ✅ Single 2D canvas, marks redrawn only on change; no heavy libs |

### Revision applied after the review

- Ink was initially too faint under a `mix-blend-mode: multiply` wash and a
  speed-scaled width that bottomed out near invisible; I raised the floor and
  dropped the blend so the pen reads as vermilion.
- Section marginalia was moved from `IntersectionObserver` (unreliable under the
  headless acceptance driver) to a scroll-position stamp keyed on the reading
  line, which fires deterministically as each heading crosses mid-viewport.
- Added the pressure/speed stroke model and the hold-to-circle hidden layer so
  the interaction rewards exploration rather than just decorating scroll.

## Verification actually run

| Command / check | Result |
| --------------- | ------ |
| `npm install` | clean (esbuild postinstall warned but not required) |
| `npx vite build` | `dist/` built, ~204 kB JS gzip 65 kB, no errors |
| `vite preview --host 127.0.0.1:4331` | served, HTTP 200 |
| Visual acceptance (WebBridge, 1440×900) | `evidence/01–05` — hero, ink stroke, section, margin note, colophon |
| Ink engine | stroke / underline / circle / note marks all render in document space and scroll with the page; stats feed the colophon live |
| No remote assets | zero external requests at runtime |

## Known limitations

- The `Caveat` webfont is not bundled (no remote fetch allowed), so marginalia
  falls back to the system cursive — intentional, and noted.
- Strokes are thinnest at high pointer speed by design; on a very fast flick a
  stroke can read as hairline. Acceptable — it reads as a quick pen flick.
- Touch devices get the full reading experience but a lighter pen (the nib is
  hidden on `hover:none`); marking still works via touch pointer events.

## Human intervention

None. Visual acceptance performed by the candidate via WebBridge screenshots
and in-page `evaluate` driving the ink layer (`window.__ink`).
