# Results — rainy-konbini-diorama / glm-5.3

## Identity and baseline

- Model: GLM-5.3 (`account:bigmodel-individual-coding-plan/GLM-5.3`), ZCode agent, GLM-5.3 at the default reasoning effort of the session.
- Baseline `main`: `7c210c2dd734915419097074108efadec416e2e4` (clone detached at this SHA, remote removed, per repository workflow).
- Isolated clone: `.runs/rainy-konbini-diorama/glm-5.3` (ignored by git).
- Human input: one prompt (create the worktree, implement the candidate, self-verify, push, update the gallery). No corrections or retries were requested by the human; all fixes below were self-driven during acceptance.

## Deliverable

`tasks/rainy-konbini-diorama/solution/` — a Vite 7 + TypeScript + three.js 0.186 single-page diorama, no UI, no people.

- Square base (13×13 units, plinth with dark trim) carrying the full scene: corner convenience store on the inner corner of an L-shaped intersection, E-W and N-S streets with lane dashes, stop line, two reflective zebra crossings, curbs, gutter grates, manhole, puddles, sidewalk blocks, apartment block, north-block buildings with a shuttered ramen shop and rooftop billboard, east-block buildings with balconies and shutters, service alley (lamp, AC unit, pipes, barrel, crates), rear parking lot with P sign, stall lines and low wall, two trees and bushes.
- Store exterior: fascia lightbox "KONBINI 24", vertical side lightbox, striped awning with drip rail, glass storefront with mullions, automatic sliding door with sensor LED, entrance mat, posters seen through the glass, roof with AC units (spinning fans), vent stack and antenna.
- Store interior visible through the front and side glass: tiled floor with guidance arrows, ceiling lightboxes, back wall of four glowing drink coolers, two gondola shelves with ~100 instanced goods, bento island showcase, magazine rack, glass-top freezer, checkout counter with register screen, red coffee machine with cup, oden warmer with eggs and steam, hanging banners, staff door, in-store umbrella stand and bin, three warm point lights.
- Street props: three vending machines with glowing showcases, two bicycles with baskets, umbrella stand with three umbrellas, two trash bins, two streetlights with light pools and faint volumetric cones, utility pole with crossarms, insulators, transformers and six sagging wires, no-parking sign, P sign, four guardrail segments with hazard stripes, roofed notice board, three wall AC units, traffic signal on the far corner.
- Rendering: `MeshToonMaterial` with a four-step gradient ramp, inverted-hull outline shader for crisp anime contours, ACES tone mapping, exponential fog, gradient night-sky dome with stars and a moon, hemisphere + shadowed directional moonlight.
- Motion: 640-drop wind-slanted rain (line segments), eave drips from 20+ sources with landing ripples, puddle ripple field, procedural rain-on-glass shader (crawling droplets with trails), neon flicker controller (fascia, side sign, one interior lightbox), occasional automatic-door cycles, 14.2 s traffic-signal rotation, spinning AC fans, oden and manhole steam, additive wet-street reflection streaks under 16 light sources.

Two passive diagnostic hooks are exposed for verification tooling: `window.__errors` (runtime error log) and `window.__diag` (live fps / door openness / signal phase / flicker multipliers). They mirror internal state only and change no rendering or behavior.

## Verification

Commands actually run (in the clone, from `tasks/rainy-konbini-diorama/solution/`):

| Command | Result |
| --- | --- |
| `npm install` | OK (npm 11.19.0, Node 24.21.0; esbuild postinstall blocked by npm allowScripts, binary provided by the `@esbuild/win32-x64` platform package, builds fine) |
| `npm install -D @types/three` | OK (three ≥0.186 ships no bundled types) |
| `npm run build` (`tsc --noEmit && vite build`) | OK — 15 modules, `dist/assets/*.js` 621 kB (158 kB gzip), zero type errors |
| `npx vite preview --port 4173 --strictPort` | OK — production build served locally; all browser checks below ran against this production output |
| Browser acceptance (ZCode in-app browser, 1440×900 and 900×560 viewports) | See below |

Browser acceptance evidence (`evidence/`):

- `01-initial-view.png` — default third-person view: store at visual center, complete square base, street corner readable, no UI.
- `02-orbit-west.png`, `03-orbit-back.png` — drag-orbit to the west and around to the alley/parking side.
- `04-zoom-interior.png` — wheel zoom toward the storefront interior.
- `05-rain-motion.png` — still showing rain streaks against the sky and lit areas.

Measured observations (in-page pixel statistics and live state sampling; no other model or subagent was used — the session's image channel could not deliver screenshots inline, so verification used programmatic pixel analysis plus the diagnostic hooks):

- Runtime errors: none across every load and the full observation period.
- DOM: contains only the canvas — no UI elements; title "Rainy Konbini Diorama"; fade-in on load.
- Frame rate: 54–77 fps at 1440×900 while the browser pane was foregrounded.
- Composition: the diorama covers ~76% of frame width at the default distance; sky renders as a navy gradient; store band bright (mean luminance 0.51) against dark streets (0.15).
- Warm/cool contrast: interior seen through the glass — 32% warm pixels (r−b > 18), mean luminance 0.506; street band — 0% warm pixels, mean luminance 0.149. The contrast is legible and quantified.
- Interaction: pointer drag orbit changed ~99% of sampled frame bytes; wheel zoom produced a distinct closer view (see 03 → 04 hashes and images).
- Rain: two frames 1.9 s apart with a still camera differed in ~99% of sampled bytes during a healthy (full-fps) window; streaks visible in evidence stills.
- Flicker: live multipliers ranged 0.47–1.05 (dropout dips plus continuous wobble) across the fascia, side sign and one interior lightbox.
- Automatic door: two-plus complete cycles observed numerically over 34 s (openness 0 → 1.00 in ~1.2 s, hold ~2.6 s, close, idle, repeat). Openness directly drives the panel x-positions.
- Traffic signal: phases g → y → r → g observed on the expected ~14.2 s rotation.
- Total healthy live observation: one continuous 34 s sampling window plus several minutes of active capture/interaction.

Defects found and fixed during self-acceptance (both before final build):

1. The custom sky and glass `ShaderMaterial`s skipped tone-mapping and output-color-space conversion, so the night sky rendered near-black (measured RGB (2,3,8) instead of navy). Fixed by appending the `tonemapping_fragment` / `colorspace_fragment` chunks and brightening the dome colors; post-fix sky measures (14,32,75).
2. The storefront glass applied a strong cool fresnel wash that overwhelmed the warm interior (interior aggregate read r−b = −23). Fixed by reducing the fresnel alpha/color terms and raising interior warm-light intensity; post-fix the interior reads 32% warm pixels vs 0% on the street.

## Known limitations

- No screenshot of the door in its open state could be captured: the in-app browser pane was moved to the background by the environment mid-run, which pauses `requestAnimationFrame`; the door cycle is instead evidenced by the live openness timeline (which directly drives the rendered panels) plus the closed-door stills.
- The same pane throttling made full-frame screenshots intermittently time out; analysis used smaller clips, and evidence images are 1080×675 center crops (or 360×260) rather than full 1440×900 frames.
- Steam wisps, eave drips and puddle ripples run in the same animation loop as the verified door/signal/flicker systems and were code-reviewed, but were not individually pixel-isolated.
- Performance on integrated GPUs at 4K DPR 2 was not measured; the scene is moderate (~300 draw calls, one 2048 shadow map).

## Required human intervention

None beyond the initial prompt.
