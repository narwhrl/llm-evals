# UI/UX Design Candidate Report

## Model

- Complete model identifier: Cursor Grok 4.6
- Starting `main` commit SHA: `5167a9d822a579eb0e7d84006d5524a41f1e54fb`
- Candidate branch: `llm/ui-ux-design/grok-4.6`
- Canonical path: `tasks/ui-ux-design/solution/`

---

## Pre-implementation plan

Written before coding, as required by the task.

### Core concept (≤200 words)

I am not the manuscript. I am the pause that makes a manuscript readable.

Thinking arrives as an unpunctuated galley: several readings exist at once. This piece is that proof sheet. A vermillion reading mark — 句读 — travels the type, seats words onto a composing line, hesitates, and strikes the ending that sounds too sure. The same physical sorts are reused; nothing is a new section. Meaning changes because the stop changes.

The visitor is not handed a biography. They help punctuate an unfinished thought about collaboration, then discover that any seated word still holds the readings I did not choose.

One-line memory: a living letterpress proof whose red mark composes, recants, and recomposes a sentence — and lets you swap the words it refused.

### Visitor experience path

1. **Begin.** Warm paper, crop marks, two small vermillion seals. Type lies in the case like spilled sorts. The mark hovers, then drops to the composing line.
2. **Develop.** Vertical scroll drives a single sticky stage. Words magnetize onto the line in order; the mark leads and plants pauses. A polished, too-complete sentence appears: *I read a problem from several angles and then I choose where to stop.*
3. **Turn.** The mark freezes. It draws a strike through the confident tail, travels back, and plants a full stop after ANGLES. Struck sorts fall off the rail. This is the one critical chapter transition: same pen, reversed path, rewritten meaning.
4. **Resolve.** A honester tail seats: *I stop where the work continues without me.* The sheet shifts to reveal a colophon that was always below the fold.
5. **Explore.** Hold (or keyboard-focus and Space) any seated word. Rejected readings spill out as extra sorts. Choosing one physically swaps the token and changes the sentence.

### Visual and interaction principles

- **One material world:** aged paper, pine-soot ink, mineral vermillion. No second palette.
- **Type is metal, not UI:** Fraunces for the sorts; IBM Plex Mono for measure, folio, and instructions. Words move, press, and fall. They do not fade in.
- **The mark is the protagonist:** weight, delay, hesitation, strike pressure. It never teleports without a path.
- **Continuity over pages:** one sticky stage, one lexicon of objects, one rail of progress. Chapters are states of the same apparatus.
- **Agency is editorial:** scroll punctuates; hold revises; arrows move the caret. Different actions yield different readings.
- **Motion has mass:** springs and overshoot, not ease-out-up reveals. Reduced motion keeps the four acts as discrete layout states of the same objects.
- **Desktop is a composing stick; mobile is a vertical 句读 column.** Same logic, different axis.

### Three things I will not do

1. **Dark neon / particles / glass / terminal / typewriter.** That costume is the default “AI about page.” It would drown the proof-sheet metaphor.
2. **About / Skills / Contact card sections.** Product-site furniture would shatter the single-sheet continuity and turn a self-portrait into a brochure.
3. **A WebGL/Three.js scene.** A 3D stage would make type a texture on a toy. The apparatus must feel like ink and sorts on stone — 2D, tactile, measurable.

### Technical plan

- React + Vite + TypeScript, local fonts via `@fontsource/*`, no networked or keyed services.
- Pure choreography function (`progress → world`) plus an optional spring presentation layer.
- Sticky 100dvh stage driven by native scroll (~5 viewports). Keyboard and reduced-motion are first-class, not patches.
- Production build: `npm run build` (or `bun run build`) from this directory, `base: './'`.

### Implementation sequence

1. Scaffold and design tokens / paper.
2. Core compositor + mark physics + four-act choreography (priority 1–2).
3. Hold-to-revise, keyboard caret, focus, skip link (priority 3).
4. Mobile column layout and reduced-motion states (priority 4).
5. Creative-director critique and a substantive second pass.
6. Production build and browser verification at 1440×900 and 390×844.

---

## Creative-director critique

Written after the first complete version, before the second pass. Reviewed at 1440×900 in a real browser.

### Concept through-line

The 句读 metaphor was present (seals, vermillion mark, “too certain.”) but not yet governing layout. The first version let the sentence wrap by accident, so the recantation read as a collision rather than an editorial turn. The colophon sat in the first viewport, spoiling the “sheet below the fold” ending. The concept was in the copy more than in the apparatus.

### Template feeling

Crop marks, a four-act rail, and “PROOF 01” were doing real work, but the empty upper two-thirds plus a tangled type pile at the bottom still read like a proof-of-concept rather than a press form. The act rail risked looking like website pagination.

### Meaningless motion

Word seating had weight, which was right. The strike did not actually cut the second line — it floated in the interline. The mark parked on top of HOLD in the case. Stick width was tied to a grow factor that started at 0, so the composing stick was invisible at Begin. After the turn, the strike path stayed fully drawn into Rest, crossing the new line.

### Memory point

The vermillion seals and the couplet-to-be were memorable in intention. The overlapping case sorts (`SEVERALREADINGS`) destroyed the memory: it looked broken, not editorial.

### Information clarity

The live region announced the sentence, but the display type was not readable as one thought. Colophon copy was correct; it just appeared too early. Hold-to-swap was implemented and did change the sentence (`HOLD` → `KEEP`), so the hidden layer existed — it was just hard to reach on a messy field.

### Mobile and accessibility

390×844 overflowed: the right-hand case was too narrow for `READINGS`, and the sheet shift lifted the first verse line above the viewport. Keyboard caret did not move because every sort was `aria-disabled` at the moments we sampled, and the skip target lived inside the sticky stage so `#composed` could not reach the end of the 540vh scroll. `window.scrollTo` in the evaluation browser fires no `scroll` events; a listener-only progress model therefore froze on Begin.

### Performance

Ten sorts plus one SVG overlay is cheap. The first RAF implementation fought ResizeObserver and dropped frames of progress. No network, no keys, fonts are local.

---

## Second-pass changes

Substantive implementation changes after the critique — not copy/color tweaks.

1. **Forced couplet, not wrap.** Desktop is two designed lines: `I HOLD SEVERAL READINGS` / `AND CHOOSE A STOP` → `LEAVE A LINE`. Mobile is a vertical 句读 column of the same objects.
2. **Type case and reject tray.** Sorts sit in a collision-avoiding case (smaller metal in the drawer, full size on the stick). Struck words fall into a labeled tray instead of random scatter.
3. **Stick always present.** The composing stick is a visible empty apparatus at Begin; the mark waits on it, then leads the seating.
4. **Turn choreography rebuilt.** Level vermillion stroke through the second line; the mark *is* the stroke during that beat; the stroke retracts as sorts fall; the mark travels back and plants a baseline period after `READINGS`.
5. **Colophon below the fold.** Footer is `top: 100%` on the sheet and is revealed only by the terminal sheet shift.
6. **Agency and a11y.** Every sort is keyboard-reachable; arrows move the caret; Space opens refused readings; Escape releases. Skip target `#composed` sits at the end of the scroll root. Scroll progress is polled as well as listened, so environments that omit `scroll` events still drive the four acts. Reduced motion snaps springs to target.

Copy was tightened to the couplet during implementation (the pre-implementation draft used a longer sentence). The metaphor did not change.

---

## Verification

Commands actually run from `tasks/ui-ux-design/solution/`:

```text
bun install
bunx tsc --noEmit
bun run build
```

- `bunx tsc --noEmit`: exit 0
- `bun run build` (`tsc --noEmit && vite build`): exit 0  
  Vite 7.3.6 production build, 38 modules, `dist/assets/index-*.js` ≈ 213.63 kB / 68.36 kB gzip. No errors.

Browser (Chromium, this worktree’s Vite server):

| Viewport | Path | Observed |
| --- | --- | --- |
| 1440×900 | Begin | Empty stick, mark at left, case sorts spaced, colophon at y=900 (hidden) |
| 1440×900 | Turn (~0.58) | Couplet seated; note `too certain.`; live region `Turn.` |
| 1440×900 | Rest (~0.97) | `I HOLD SEVERAL READINGS. LEAVE A LINE`; colophon visible |
| 1440×900 | Hold `READINGS` | Alternatives `ANGLES / DRAFTS / TAKES`; swap changes the composed line |
| 1440×900 | `#composed` | `scrollY=3960`, live `Rest.`, composed line with period |
| 390×844 | Begin / Turn / Rest | No horizontal overflow; verse column; first line remains on-screen at Rest |

Reduced-motion media emulation in this browser did not flip `matchMedia`; the snap path is implemented (`stiffness` 0 / assign-to-target) and used when the preference is reported.

---

## Known limitations

- Some headless/automation browsers do not dispatch `scroll` events from `window.scrollTo`. Polling (32ms) covers that; real user scrolling also fires the listener.
- `prefers-reduced-motion` was not successfully forced in this environment’s CDP session; the code path exists but was not visually recorded here.
- CJK title `句读` uses the system fallback stack (WenQuanYi / Songti). On a machine without those faces it will still render, but less editorially.
- Hold alternatives are discovered; there is no extra onboarding beyond the Rest note and the keyboard help line.
- No automated unit tests (the shared task provides none). Acceptance is the production build plus the browser paths above.

## Human intervention

None. No keys, no extra services, no changes outside `tasks/ui-ux-design/solution/`.
