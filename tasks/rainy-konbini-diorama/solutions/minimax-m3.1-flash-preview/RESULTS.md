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
| `node --check` on all 10 source files | Passed, no output. |
| `npm run build` | Passed. Vite 8.3.1, 12 modules, ~0.16–0.21 s. `dist/index.html` 0.53 kB, CSS 0.32 kB, JS 620.40 kB (158.44 kB gzip). |
| `npm run build -- --base=/rainy-konbini-diorama/minimax-m3.1-flash-preview/ --outDir=dist-gallery --emptyOutDir` | Passed; generated `dist-gallery/index.html` with correctly prefixed script and CSS URLs and a relative favicon. |
| `npm run preview` (port 4193, `--strictPort`) | Served the production build. Verified by `curl` that the served `<title>` was this candidate's before any screenshot was accepted. |

Vite emitted one non-failing advisory: the bundle is 620.40 kB before gzip
(158.44 kB gzip), above its 500 kB chunk-size threshold. The bundle is almost
entirely three.js. No task input, fixed test or evaluation file was modified.

## Browser inspection

Driven through **kimi-webbridge** against the user's real Chrome, in a clean
session at a measured **1440 × 900 CSS viewport** (`innerWidth` 1440,
`innerHeight` 900, DPR 1.0 after `Emulation.setDeviceMetricsOverride`). A
`Page.addScriptToEvaluateOnNewDocument` collector recorded `error`,
`unhandledrejection`, `console.warn` and `console.error` from first load.

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
- **Console and network:** zero captured error, unhandledrejection,
  `console.warn` or `console.error` events across the whole session. Network
  capture returned HTTP 200 for the HTML, JS, CSS and favicon, with no failed
  asset requests.
- **Cost:** a synchronous 60-frame benchmark measured 6.03 ms/frame (≈166 fps
  headroom) at 758 draw calls, 20,710 triangles, 327 geometries, 33 textures and
  16 programs. `requestAnimationFrame` could not be used to measure live frame
  rate because the tab is backgrounded and rAF is throttled to zero in that
  state; the synchronous benchmark is the substitute, and the live frame rate on
  a foreground tab is therefore **not** directly measured.

Evidence is saved in `evidence/`: default view, interior through the glass,
automatic door open and closed, street corner, alley entrance, rear view
confirming containment on the base, and the orbit/zoom interaction result.

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

## Known limitations

- Requires a WebGL-capable browser.
- Small motion — eave drips, glass runoff, puddle ripples — is easiest to see
  when zoomed in than at the full-base framing.
- The far side of the base is heavily fogged; this is intentional for night depth
  but hides some detail on the rear quarter.
- The shop interior is modelled to read well from outside and from the front
  three-quarter angles. It is not furnished to a plan level where every aisle
  can be inspected from inside the shell.
- The live frame rate on a foreground tab was not measured (see above).
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
- **No other human intervention was required.** There were no corrections to the
  implementation, no missing credentials and no environment blockers; the
  isolated clone, `npm ci`, both builds and the preview server all completed on
  the first attempt.
