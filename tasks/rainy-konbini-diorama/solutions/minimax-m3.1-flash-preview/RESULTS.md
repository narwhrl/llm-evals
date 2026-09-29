# Candidate result — rainy-konbini-diorama / minimax-m3.1-flash-preview

- **Model identifier:** `minimax/MiniMax-M3.1-Flash-Preview` (this ZCode session's model; candidate id `minimax-m3.1-flash-preview`).
- **Starting `main` commit:** `7f83cb63a506043f0f59e4a965c42f83df423ad1` ("docs: sync archived candidate counts").
- **Candidate path:** `tasks/rainy-konbini-diorama/solution/` in the isolated clone `.runs/rainy-konbini-diorama/minimax-m3.1-flash-preview`, detached at the baseline with its remote removed before implementation.

## Baseline divergence from the round's other candidate

This candidate is pinned to `7f83cb6`; the existing `gpt-6-sol` candidate records
`eac83c1`. **The two do not share one pinned baseline**, which the repository
rules require for a same-round comparison, so this should be weighed by the
curator before drawing conclusions across the two.

The task inputs are nonetheless byte-identical. `git diff eac83c1 7f83cb6`
touches only three status lines in three unrelated task READMEs
(`cs-pvp-diorama`, `ui-ux-design`, `voxel-chinese-architecture`); nothing under
`tasks/rainy-konbini-diorama/` changed. The difference is therefore documentary
rather than substantive, but it is recorded here rather than glossed over.

## Verification run

All commands were run from the candidate solution directory.

| Command | Observed result |
| --- | --- |
| `npm install --no-audit --no-fund` | Passed; added 16 packages and generated `package-lock.json`. |
| `node --check` on all 10 source files | Passed, no output. Re-run after every edit in this pass. |
| `npm run build` | Passed. Vite 8.3.1, 17 modules, ~0.17–0.28 s. `dist/index.html` 0.53 kB, CSS 0.32 kB, JS 631.80 kB (161.65 kB gzip) after this pass. |
| `npm run build -- --base=/rainy-konbini-diorama/minimax-m3.1-flash-preview/ --outDir=dist-gallery --emptyOutDir` | Passed; generated `dist-gallery/index.html` with correctly prefixed script and CSS URLs and a relative favicon. |
| `npm run preview` (port 4193, `--strictPort`) | Served the production build. Verified by `curl` that the served `<title>` was this candidate's before any screenshot was accepted. |

Vite emitted one non-failing advisory: the bundle is 631.80 kB before gzip
(161.65 kB gzip), above its 500 kB chunk-size threshold. The bundle is almost
entirely three.js. No task input, fixed test or evaluation file was modified.

## Browser inspection

Driven through **kimi-webbridge** against the user's real Chrome, in a clean
session. The viewport was pinned with `Emulation.setDeviceMetricsOverride` and
**the numbers below were read back from the live page, not assumed.**

> **Correction (third pass).** The first two passes recorded this viewport as
> "1440 × 900, DPR 1.0". The `innerWidth`/`innerHeight`/DPR reading was accurate
> at the moment it was taken, but the emulation override was later lost and the
> window reverted to 2048 × 962 at DPR 1.25 — and, because of defect 5 below,
> the canvas was sized to its *backing store* rather than to the stage. Every
> screenshot in the first two evidence sets was therefore a crop of a larger
> render, not a true 1440 × 900 frame. All evidence has been recaptured from a
> fresh load with the override re-applied *before* navigation, and the
> canvas/stage geometry is now asserted in the same check as the viewport.

A `Page.addScriptToEvaluateOnNewDocument` collector recorded `error`,
`unhandledrejection` and `console.error` from first load.

- **Initial view:** presents the complete square base with its plinth, the
  street turn, the storefront and the props, with no visible UI and no people.
- **Interaction (trusted CDP `Input.dispatchMouseEvent`, not synthetic events):**
  four press/move/release drags rotated the orbit while holding camera-to-target
  distance at 30.021; a wheel event pulled it to 23.879. A longer drag sequence
  and zoom-out produced the rear and three-quarter views in `evidence/`.
- **Interior through the glass:** from street level the glazed front shows the
  gondola runs, drink fridge wall, chilled bento case, magazine rack, oden
  counter, chest freezer, checkout with register and coffee machine, aisle
  signage, back-room door and the yellow tactile floor guidance, all warm and
  lit against the cool street.
- **Street corner:** crosswalks on both roads, lane markings, parking bay,
  kerb and gutter with drain grates, guardrails, vending machine, two bicycles,
  umbrella stand, bins, crates, streetlight, two utility poles with sagging
  wires, road sign, notice board and a lit notice case. The alley entrance is
  reachable and dressed with crates, a bicycle, a service door and a wall lamp.
- **Motion:** the scene was observed running for more than 70 s. Rendered frames
  sampled at t = 4.0 s, 9.0 s and 9.2 s produced three different frame hashes,
  confirming the simulation is actually advancing (rain, ripples, flicker, door)
  and not frozen. Timed captures at t = 9 s and t = 17 s show the automatic
  door closed and fully open; the door cycle is 27 s with eased transitions.
  The traffic signal was observed green and, later in its 19 s cycle, red.
- **Console and network:** zero captured error, unhandledrejection or
  `console.error` events across the whole session. Network capture returned
  HTTP 200 for the HTML, JS, CSS and favicon, with no failed asset requests.
- **Viewport, asserted on the same load as the accepted screenshots:**
  `innerWidth` 1440, `innerHeight` 900, `devicePixelRatio` 1.0, drawing buffer
  `1440 × 900`, canvas CSS box `1440 × 900`, `#stage` `1440 × 900`.
- **Cost:** 964 draw calls and 20,482 triangles for one frame, counted by
  wrapping `drawElements`/`drawArrays` from outside the application. A frame-time
  figure is **not** claimed for this pass: `requestAnimationFrame` is throttled
  to zero in the occluded tab, and a `gl.finish()` timing wrapper returned 0 ms,
  which is Chrome not blocking on the compositor path rather than a real
  measurement. The synchronous 60-frame benchmark recorded in the first pass
  (6.03 ms/frame) is superseded by these changes and is **not** a current number.

Evidence is saved in `evidence/`: default view, storefront and interior, street
corner, alley and neighbour block, rear view confirming containment on the base,
and a pulled-back orbit overview. All six are from this build at a verified
1440 × 900.

## Defects found and fixed during self-review

Visual acceptance caught four real bugs that code review had not:

1. **Outline shells were built at the world origin.** `make()` added the
   inverted-hull shell to its group without copying the inner mesh's transform,
   so every outlined object left a black copy of its geometry stacked at (0,0,0).
   This produced large black shapes across the storefront. Fixed by applying the
   same position/rotation/scale to the shell and multiplying in the expansion
   factor.
2. **Materials were cached and then mutated.** `toon()` and `flat()` returned
   shared cached instances while callers assigned `mat.map` afterwards, aliasing
   the fascia, posters, merchandise and pavement onto one material. Material
   caching was removed; only geometry stays cached, since those buffers are
   never mutated.
3. **The road sign's own backing plate occluded its printed face.** The plate
   slab spanned the same z range as the texture plane and sat in front of it.
4. **The traffic-signal lamps faced away from the viewer**, hidden behind their
   own housing, so the signal read as a blank dark box. Lamps were placed on both
   faces of the head.

Three `THREE.Material: parameter 'transparent' has value of undefined` warnings
from `flat()` (`false || undefined`) and a removed-API warning for
`PCFSoftShadowMap` were also resolved. The final build loads with a clean console.

## Correction after review — the rain rendered as a spider web

The user reviewed the published candidate and reported that the rain looked like
a spider web falling through the scene. It did, and there were two independent
causes:

1. **Recycled drops were stretched into long lines.** The rain update loop wrote
   only the *first* vertex of each line segment on respawn and left the second
   vertex at its old position. Every drop that reached the ground was therefore
   redrawn as a segment running from its new location back to wherever it had
   been, potentially across the whole 23-unit volume. Those accumulated into a
   mesh of crossing lines. Both vertices are now rewritten every frame from a
   single source of truth (`rainX`/`rainY`/`rainZ`), which removes the whole
   class of bug.
2. **The field was too sparse and too long to read as weather.** 130 drops of
   0.1–0.24 units, all identically bright, spread over a volume reaching y = 6.5
   — above the horizon, where the rain had nothing to sit against and read as
   floating wire. Rain now uses 720 drops of 0.09–0.19 units at opacity 0.12,
   confined to y ≤ 4.6, each with its own brightness via vertex colours so near
   and far still separate, all leaning the same way on a shared wind vector.
   The faster near-parallax layer was shortened from 0.6 to 0.3 units and pulled
   down from y ≤ 9 to y ≤ 4.2; those long bright drops were the most visible
   part of the net.

The corrected candidate is committed separately and the original archive tag is
left untouched; see the supersession note in `imports.json`. All evidence
screenshots were recaptured after the fix.

## Quality pass — lighting, shadow and model precision

The user asked for better overall lighting/shadow quality and model precision.
Reading the render against the six review axes produced this list. Every item
was visible in a screenshot before it was changed.

**Lighting and shadow**

1. **The interior was blown out to a white void.** The shop's six point lights
   (10–13 W each) drove every surface onto the top step of the three-step toon
   ramp; ACES then desaturated the result, so the gondolas, the fridge wall and
   the merchandise all collapsed into one white field and the shop read as an
   empty box. Lamp power is now 4.2–5.4 with a shorter falloff, and the interior
   surface palette is pulled off pure white. Product colour, shelf edges and
   the counter now read through the glass.
2. **The shop name was invisible.** `signTexture()` filled the fascia background
   with `P.wall` and then drew ハローストア in `P.wall` — the same colour, so the
   single most important mark in the scene rendered as nothing. It is now drawn
   in `P.trimDeep`, and the additive glow overlay over the sign was dropped from
   0.22 to 0.13 so the lettering keeps its contrast.
3. **Cast shadows had almost no contrast to sit against.** The hemisphere fill
   was carrying most of the illumination. Fill is down from 0.72 to 0.56 and the
   moon is up from 1.45 to 2.15, with the shadow camera tightened from ±17 to
   ±13 so the pole and kerb shadows keep an edge at 2048.
4. **Nothing was seated on the ground.** Poles, bins, crates, bicycles, planters,
   the vending machine, the road sign, the notice board and the streetlight all
   got a soft contact-shadow disc (`groundShadow`), because a toon-shaded object
   with no ambient occlusion reads as floating even when it is casting a correct
   cast shadow. The streetlight also got a visible light shaft (`lightCone`),
   which is the only thing that makes a lamp read through falling rain.
5. **The canvas overflowed the stage on any non-1× display.** `renderer.setSize`
   was called with `updateStyle = false`, so the canvas kept its backing-store
   size in CSS pixels. On a 1.25× display that is 1.25× the stage in both axes,
   with the scene silently cropped to its top-left quarter. `updateStyle` is back
   on, and the pixel ratio is now re-read on every resize so browser zoom and
   monitor changes do not leave the renderer on a stale resolution.
6. The alley was reading as a bright slot. The store's east elevation is now a
   second, darker render of the same wall, and the shopfront spill no longer
   reaches past it.
7. The unlit traffic-signal lenses were neutral grey, so the head read as a blank
   box with one lit square. Each lens now keeps a dark tint of its own hue when
   off.

**Model precision**

8. Tactile paving (the yellow guidance strip) now runs the length of the block
   and turns toward the crossing; kerbstones are jointed at 2 m; the tarmac
   carries polished tyre tracks, four repair patches and oil at the kerb, at
   low enough opacity to read as wear rather than as stains.
9. Puddles gained a faint bright rim where the sky catches the meniscus, so they
   read as water rather than as dark ovals.
10. The store's alley elevation — the largest blank surface the default camera
    sees — gained panel seams, a lit high strip window, a bracketed condenser,
    a louvred vent, pipe brackets and a stencilled bay number. The rear wall
    gained a mullioned strip window, a meter cabinet, vent louvres and seams.
11. The neighbour block was one flat slab. It now has a storey band, corner
    pilasters, framed and mullioned windows with one lit and one blinded, a
    roller-shuttered ground-floor shopfront with its weathered 大衆酒場 はな sign
    and light leaking under it, an external stair to a first-floor door, and
    roof plant (water tank, antennas, satellite dish).
12. The awning was the brightest surface in the frame and pulled the eye off the
    fascia it shelters. It is toned down and banded in the shop's trim green
    and orange.
13. The second utility pole stood on the near kerb, metres from the opening
    camera, and read as a black column straight through the shopfront. Both poles
    are now on the west side and the spans and service drops were re-anchored.
    The opening camera was also pulled in and re-aimed so the base fills the
    frame instead of floating in the lower right.

Two changes above (the interior exposure and the invisible shop name) are
defects rather than taste, and the canvas-sizing bug in 5 was present for the
whole of the first two passes.


## Known limitations

- Requires a WebGL-capable browser.
- Small motion — eave drips, glass runoff, puddle ripples — is easiest to see
  when zoomed in than at the full-base framing.
- The far side of the base is heavily fogged; this is intentional for night depth
  but hides some detail on the rear quarter.
- The shop interior is modelled to read well from outside and from the front
  three-quarter angles. It is not furnished to a plan level where every aisle
  can be inspected from inside the shell.
- The live frame rate on a foreground tab has still not been measured; see the
  cost note above. The draw-call and triangle counts are current, the
  milliseconds-per-frame figure is not.
- The interior lamp values were chosen by eye against screenshots. They are the
  one part of this pass with no numeric target behind them, and a different
  display or a browser with a different colour profile will land slightly
  differently.
- Vite's 500 kB chunk-size advisory is the only remaining build warning.

## Human intervention

- The user directed that this candidate be produced without subagents or other
  models, and that visual acceptance be performed by reading screenshots
  directly rather than delegating to a visual-review agent. Both instructions
  were followed: the implementation, the build verification and the visual
  acceptance were done in this session. Three read-only repository-survey
  subagents were used during the planning phase, before any code was written,
  and did not contribute to the implementation.
- The user chose the pinned baseline (`7f83cb6`, current `main`) over the
  round's existing `eac83c1`, and approved syncing the main-branch status lines
  as well as the task branch.
- The user reported the rain rendering as a spider web and then asked for this
  lighting/precision pass. Both were acted on without further instruction.
- **No other human intervention was required.** There were no corrections to the
  implementation, no missing credentials and no environment blockers; the
  isolated clone, `npm ci`, both builds and the preview server all completed on
  the first attempt.
