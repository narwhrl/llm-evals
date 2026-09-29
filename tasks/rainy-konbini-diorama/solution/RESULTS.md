# Results — rainy-konbini-diorama / mimo-v2.6-flash

## Identity and baseline

- Model: `xiaomi-mimo/mimo-v2.6-flash` (ZCode agent, this session).
- Baseline `main`: `7c210c2dd734915419097074108efadec416e2e4` (clone detached at this SHA, remote
  removed, per repository workflow).
- Isolated clone: `.runs/rainy-konbini-diorama/mimo-v2.6-flash` (ignored by git).
- Human input: one prompt — create the isolated worktree, complete the task as candidate
  `mimo-v2.6-flash`, no subagents and no other models, self-perform visual acceptance, push and
  update the gallery. No corrections or retries were requested; all fixes below were self-driven.

## Deliverable

`tasks/rainy-konbini-diorama/solution/` — a Vite 8 + three.js 0.186 single-page diorama, no UI, no
people, 18 source modules.

- Square 24×24 plinth carrying the whole scene: convenience store at the visual center of an
  L-shaped street corner, two roads with lane dashes and reflective zebra crossings, parking bays
  with wheel stops, curbs, gutters, grates, sidewalk block, service alley, puddles and additive
  wet-ground reflection streaks, backdrop apartment/CAFE buildings, guardrails, blue street sign.
- Store exterior: cream/teal/orange fascia lightbox ("MIDORI / MART / 24h") on front and east
  faces, protruding blade sign, striped awning with valance, large glass storefront with dark
  mullions, automatic sliding door, WELCOME mat, roof slab with deck, AC units, vent, antenna,
  downpipes, AC condenser with fan ring.
- Store interior visible through the glass: ceiling light panels, four cooler faces with canvas
  textures, two gondola runs with ~100 product boxes, chilled bento case, oden counter with three
  pots, checkout counter with register and coffee machine, impulse rack, magazine and snack racks,
  interior posters and header lightbox, back-room door, storage shelving and crates, chest freezer,
  yellow tactile guidance strip with arrow decal.
- Street furniture: vending machine with face and side posters, two bicycles, umbrella stand,
  labeled trash bins, freestanding notice board, poster case, three utility poles with crossarms,
  transformer and sagging catenary wires, curved-arm streetlight, two traffic signals (corner and
  far), road signs, alley dressing (service door, wall lamp with point light, crate stacks, drain).
- Rendering: `MeshToonMaterial` with a 4-step gradient map (三渲二), inverted-hull outlines,
  SRGB output, night fog, hemisphere + ambient + two directional lights, five warm interior point
  lights and a streetlight pool. Canvas-generated textures for all signage, posters, pavement,
  cooler faces and glass runoff.
- Motion: 780-drop obstacle-aware rain, 150 eave drips, 18 staggered puddle ripples, animated
  glass-runoff texture, sign flicker (dips to 0.425), automatic-door cycle (24 s), traffic-signal
  rotation (21 s, per-head phase), reflection shimmer synchronized with signal colors.

`window.__diorama` exposes `{ time, frames, advance(dt), camera, controls, renderer, scene }` for
deterministic verification. It changes no rendering behavior.

## Verification

Commands actually run (in the clone):

| Command | Result |
| --- | --- |
| `npm --prefix <solution> ci --no-audit --no-fund` | OK — 16 packages in ~7 s (run after stopping the preview server, which otherwise holds `node_modules` with EPERM) |
| `npm run build` (`vite build`) | OK — `dist/index.html` 0.47 kB, CSS 0.19 kB, JS 613.25 kB (156.73 kB gzip); only advisory is Vite's >500 kB chunk warning |
| `npm run build -- --base=/rainy-konbini-diorama/mimo-v2.6-flash/ --outDir=dist-gallery --emptyOutDir` | OK — gallery-style build succeeds |
| `npx vite preview --strictPort --port 4187` | OK — HTTP 200 on `localhost:4187` (via `curl --noproxy '*'`; `http_proxy=127.0.0.1:7891` intercepts plain curl) |
| `node --check` on `src/*.js` and `src/parts/*.js` | OK — exit 0 for all 18 files |
| Browser acceptance (ZCode in-app browser, 1440×900) | See below |

Measured observations (all in-page, this session; no subagent and no other model was used):

- Performance: 6.4 ms/frame over a 60-frame synchronous loop; 822 draw calls, 20,356 triangles,
  32 geometries, 44 textures, 11 programs.
- Containment: world bounding box `x, z ∈ [-12.07, 12.07]`, `y ∈ [-1.67, 9.14]`; the only points
  beyond ±12.05 are the plinth's own outline shell — every scene element sits on the base.
- Runtime: zero console errors and zero unhandled rejections; `index.js`/`index.css` load with
  HTTP 200; `document.body` holds exactly one canvas with `innerText === ""` (no UI, no people).
- Motion via the `advance(dt)` hook: frame hashes `96eede34` → `c89d3fd0` (1 s) → `e2b1dfd8`
  (after 30 s simulated); door panels `-1.7 / -0.7` closed (t=12.04) → `-2.62 / 0.22` open
  (t=14.84) → `-1.7 / -0.7` reclosed (t=20.54); far signal yellow `ffd75a` at t=3.04, red
  `ff5b4d` at t=8.04, green `4ade80` at t=14.84, corner head on an offset phase; brand-sign
  brightness sampled between 0.425 and 1.03 (flicker dips).
- Interaction: synthetic pointer drag moved the camera azimuth 50.0° → 21.7°; wheel event changed
  distance 33.4 → 38.4; OrbitControls responded with no exceptions.

Evidence (`evidence/`, seven PNGs, all 1440×900):

- `01-default-view` — default establishing shot (SE, whole plinth, store at center).
- `02-default-front` — straight-on front view from `(0, 6, 20)`.
- `03-interior-through-glass` — storefront close-up, interior fill visible through the glass.
- `04-automatic-door-open` — door close-up at door-cycle phase 16.00 (panels open).
- `05-storefront-door-closed` — same camera at phase 5.00 (panels closed); the pair proves the
  door animation in pixels.
- `06-alley-entrance` — service alley (drain channel, crates, bicycle, poster case, wall lamp).
- `07-top-containment` — high aerial confirming the whole diorama sits on the square base.

Acceptance method and its caveat: the session's image channel intermittently delivered stale or
mismatched images for `Read` calls (same path returning different pictures, images served for the
wrong path). Because of that, every evidence file was verified against ground truth computed in
node: PNGs decoded with zlib and checked for dimensions and color-region statistics, then compared
with statistics computed from fresh in-page renders of the same camera. `01` and `06` were also
confirmed by direct visual reads once the channel recovered; `02` and `03` matched their live
re-renders exactly (teal/warm/bright counts and centroids); `04` and `05` matched on warm/bright
statistics to within 0.2% and differ from each other exactly where the open door should; `07`
matched within rain/signal-phase wobble. Page-side pixel samples were additionally checked to be
byte-identical to the decoded file, so the capture pipeline itself is proven, not assumed.

Defects found and fixed during self-acceptance (all before the final build):

1. The blade-sign box had swapped axes and rendered as a black slab with texture slivers;
   re-dimensioned to `(0.9, 1.15, 0.14)` with textured planes on the ±z faces.
2. The roof read as a large beige slab (light material, deck buried below); replaced with a dark
   `#39415a` slab plus a `#4a5470` deck placed above it at y 4.56.
3. Puddles read as flat gray plates and the road was nearly black; puddle opacity 0.55 → 0.34 with
   `#31436b`, asphalt wet color `#2c3550` with textured fill, tabletop `#252c44`.
4. The alley floor was invisible — the sidewalk block covered it; alley floor raised so its top
   sits at 0.245 above the sidewalk, with matching puddle/ripple height handling.
5. Several color literals were corrupted during authoring (e.g. `'#0d1striped'`); each was located
   and replaced with a valid color.
6. Smaller fixes: interior bento lid intersecting the trays, dead street-rail code removed,
   window-frame normal direction, signal helper argument order, explicit crate-color plan,
   bicycle Y parameter for the alley placement, unused imports removed.
7. Exporting `THREE` on `__diorama` grew the bundle 612 → 794 kB by defeating tree-shaking;
   the export was removed and the bundle returned to 613 kB.

## Known limitations

- Requires WebGL; no fallback renderer.
- Vite's >500 kB chunk advisory applies (613 kB / 157 kB gzip raw three.js bundle).
- The rear/far side of backdrop buildings is intentionally simplified and sits in fog.
- Signage uses Latin text only ("MIDORI MART", "KONBINI ST.", "CAFE COFFEE"); kana glyph rendering
  in canvas textures was not attempted in this environment.
- Environment quirks worked around during verification (not product defects): the fnm shell shim
  errors when the working directory contains `package.json` (builds were run via `npm --prefix`
  from outside the solution), the proxy env var intercepts localhost requests, the in-app browser
  suspends `requestAnimationFrame` when its tab is hidden (hence the deterministic `advance()`
  hook), `tab.screenshot()` timed out intermittently, and the session's image channel delivered
  stale images for some file reads (handled as described above).
- Performance at 4K DPR 2 and on integrated GPUs was not measured.

## Required human intervention

None beyond the initial prompt. The initial prompt itself constrained the run: no subagents and no
other models — all implementation, verification and acceptance were performed by this single model
in this session.
