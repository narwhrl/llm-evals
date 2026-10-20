# Results — cs-pvp-diorama

## Identification

- **Model:** `magpie/minimax-code/MiniMax-M3.1-Flash` (MiniMax M3.1 Flash, served by the
  `magpie/minimax-code` provider).
- **Mode:** single model, no subagents, no other models consulted, no reference to any
  other candidate's source.
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
  (`docs: record gpt-6.1-sol blackhole hero import`).
- **Working copy:** local worktree
  `.worktrees/minimax-m3.1-flash/cs-pvp-diorama` on branch
  `run/cs-pvp-diorama/minimax-m3.1-flash`, created from that commit.
- **Toolchain:** Node v24.21.0, npm 11.19.0.

## What was built

A React + Vite + Three.js miniature of a rain-soaked CS defusal map, built entirely from
boxes at runtime. No image, model, font or audio file is fetched.

- **Base** — one complete 14 × 14 square concrete plinth with a recessed side band and a
  maker plate on the front edge. Every building, prop, light and piece of terrain stands
  inside it; the wet ground film and the mirror beneath it are clipped to the same
  footprint.
- **Topology** — a terrorist spawn in the north, a counter-terrorist spawn in the south,
  bomb sites A (north-west, inside a warehouse) and B (north-east, in front of a tin
  shed), tied together by a central duel lane, a left flanking alley and a right
  elevated flank, with a sewer running under mid from the terrorist ramp to the
  counter-terrorist side.
- **Cel shading** — every form is a box. Lit surfaces use `MeshToonMaterial` with a
  four-step gradient map, and each mesh is duplicated as a slightly expanded shell drawn
  back-face-first in near-black, which gives every silhouette a drawn contour.
- **Weather** — rain streaks are computed entirely in the vertex shader from a single
  clock, eave drips are a separate particle system, puddles are shader discs with
  expanding rings, and the wet ground is a real `Reflector` with a translucent film of
  asphalt over it, so lamps, signs and building outlines reflect in the standing water.
- **Motion** — continuous rain, eave drips, puddle ripples, lamp and searchlight
  flicker, alternating police light bar, a shutter that shivers now and then, drifting
  steam, and distant lightning that lifts the ambient for a moment.

## Verification actually run

All commands were executed in the candidate worktree; the results below are what was
observed.

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0, 9 direct dependencies resolved (react 19.2.9, react-dom 19.2.9, three 0.186.1, vite 7.3.7, typescript 5.9.3, @types/three 0.186.0, @types/react 19.2.7, @types/react-dom 19.2.3, @vitejs/plugin-react 5.2.0) |
| `npx tsc --noEmit` | exit 0, no diagnostics |
| `npm run build` | exit 0 — `dist/index.html` 0.86 kB, CSS 0.32 kB, JS 798.10 kB (214.44 kB gzip) |
| `npm run dev` (Vite) | served on `http://127.0.0.1:5176/`, page loaded with HTTP 200 and no blocked request |

The production bundle was also served from `dist/` and loaded in the same browser; the
screenshots below are from the development server, which renders the identical scene.

## Browser observations

Rendered in headless Chromium (Playwright, ANGLE/Intel Arc 140T, WebGL 2.0) at a
1440 × 900 viewport, the documented `1440 × 900` review size.

- **Console, page and network:** no console errors, no uncaught exceptions, no failed
  requests on load, in every capture below.
- **Composition:** the whole square plinth is inside the frame in the default view, and
  the T spawn, A site, B site, mid lane and CT spawn are all readable at once. The
  silhouette is compact: the warehouse is the tallest mass, the tin shed the second,
  and the lamp posts and fences break the skyline.
- **Regional legibility:** the A bomb mark is visible as a white sprayed rectangle on
  the warehouse floor through the open loading bay; the B bomb mark is visible on the
  apron in front of the tin shed; the mid gate reads as a half-open double iron gate
  between two high walls; the CT cordon reads as a police line of barriers, a van, a
  patrol car, cones and tape.
- **Interiors:** the warehouse interior (five-tier shelving, the central column, the
  forklift, cartons, sacks, the mezzanine and its ladder, the red glow from the back
  door), the B gatehouse (desk, toppled chair, duty roster, locker, broken fluorescent)
  and the mid guard posts (dead consoles, dirty glass) are all visible and lit
  differently from the exterior.
- **Art direction:** outlines are crisp, materials are restrained hard surfaces, the
  ambience is cold blue night light, and the tactical lights (sodium lamps, the cold
  warehouse tubes, the warm gatehouse tube, the red back-room glow, the red and blue
  light bar) supply the warm/cool/red contrast.
- **Dynamic atmosphere:** rain, drips, puddle ripples and reflections, lamp flicker,
  the alternating police light, the shaking shutter, steam and occasional lightning are
  all present; the scene stays stable under inspection.
- **Interaction:** left-drag orbits, the wheel zooms, right-drag pans. Measured during
  the acceptance run: the camera moved from `(13.354, 19.264, 18.085)` to
  `(-15.558, 10.785, 22.686)` after a left drag, to `(-11.858, 8.268, 16.972)` after a
  wheel zoom, and the orbit target moved to `(-1.461, 1.349, -2.141)` after a right
  drag pan.
- **No UI, no people:** the document body contains the mount element and one canvas
  only, `document.body.innerText` is empty, and no figure is placed in the scene.

## Evidence

Captured in headless Chromium at 1440 × 900, stored in `evidence/`:

| File | View |
| --- | --- |
| `evidence/01-overview.png` | the default camera, the whole plinth and all three routes |
| `evidence/02-a-site.png` | the A warehouse from the south, open loading bay and bomb mark |
| `evidence/03-b-site.png` | the B site, tin shed, balcony, fire escape and bomb mark |
| `evidence/04-mid.png` | the mid duel lane, the half-open gate, the ramp and the guard post |
| `evidence/05-ct-spawn.png` | the CT cordon, the police van, the platform and the probe light |

## Known limitations and required human intervention

- **The A site is only fully readable from the south or from above.** The warehouse
  keeps its full-height west, north and east walls, so an orbit that looks at the A
  site from the east puts the east wall in front of the bomb mark. The front is an
  open loading bay specifically so that the default view and any overhead view see in.
- **The B site fire escape and the ladder on the T spawn truck read as strongly
  orange** under the sodium lamps. This is the rust palette lit by warm light, not an
  error, but it is the most saturated thing in the frame.
- **The CT spawn pad is the flattest area of the model.** The parking bay lines, the
  tape, the cones, the van, the patrol car and the platform break it up, but from
  directly above it still reads as a large grey rectangle.
- **Geometry is axis aligned.** Nothing is rotated except the crates and chairs that
  use the `oriented` helper, which only swaps the two horizontal axes. This is a
  deliberate consequence of the box-only cel approach, but it means no surface is
  skewed and some props read as slightly stiff.
- **No shadow contact for very small props.** The shadow map is a single 2048 px
  directional light over the whole 14 unit plinth, so crates and cones cast very short
  shadows; only the large masses read as grounded.
- **The rain volume is a cylinder 16.4 units across, centred on the plinth.** It is
  slightly wider than the 14 unit base so that rain is not clipped at the edge, but it
  does mean a few streaks fall just outside the plinth footprint.
- **Required human intervention: none.** The project installs, type-checks, builds and
  runs with no credentials, no network access and no external assets.
