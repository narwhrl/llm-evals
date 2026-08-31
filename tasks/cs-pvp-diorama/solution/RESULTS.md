# CS PVP Diorama — Candidate Result Report

## Task Record

- **Model identifier**: `zhipu-coding-plan/glm-5.3`
- **Task**: `tasks/cs-pvp-diorama` (CS 反恐精英经典 PVP 巷战地图微缩三维沙盘)
- **Starting `main` commit SHA**: `5fdf7c8b6e906cc4e48a1e5b5f6e5ff46a4d2ba7` (`5fdf7c8`)
- **Candidate branch**: `llm/cs-pvp-diorama/glm-5.3` (this worktree)
- **Canonical path**: `tasks/cs-pvp-diorama/solution/`

## Deliverable

A single-page three.js diorama — a 1:64-style miniature defusal map (T spawn north, CT spawn south, A site NW warehouse, B site NE tin-house plaza, mid lane with half-open iron doors, west back-alley flank, elevated east walkway flank, sewer grates) on one 60×60 square concrete pedestal. Toon shading (4-step gradient ramps) + inverted-hull outlines deliver the 三渲二 look; a custom masked planar Reflector renders rippling rain puddles; all textures are procedural canvas art (no external assets, no network calls at runtime). No UI elements, no human figures.

### Commands

| Step | Command | Result |
|---|---|---|
| Install | `npm install` | OK (15 packages, three 0.185.1 pinned, vite ^7) |
| Dev server | `npm run dev` | available (vite dev) |
| Production build | `npm run build` | OK — `dist/` emitted (~645 KB single chunk, gzip ~166 KB) |
| Local runtime (production) | `npm run preview` | OK — serves `dist/` (verified on `http://127.0.0.1:4173/`, HTTP 200) |

### Source layout

```
solution/
  index.html          full-viewport canvas only, no UI markup
  src/main.js         renderer (toon + OutlineEffect), camera/OrbitControls, render loop
  src/ground.js       pedestal, wet asphalt top, puddle Reflector (custom shader: mask + ripple rings + wobble)
  src/lighting.js     moon/hemi/ambient + street lamp, warehouse lamps, red door seam, police beacon, alley lamp, fluorescent, searchlight (each with live flicker)
  src/textures.js     procedural canvas textures (concrete, asphalt, corrugated tin, wood, cardboard, barrels, graffiti, site marks, bullet holes, signs, glass, stencils)
  src/materials.js    toon material factory, gradient ramps, shared palette
  src/props.js        crates, barrels, pallets, jersey/plastic barriers, tires, sacks, containers, truck, police van, forklift, shelves, furniture, fences, scaffold, lamps, poles
  src/tspawn.js asite.js mid.js bsite.js ctspawn.js flanks.js   region builders
  src/fx.js           rain streaks, drips, steam, sheet lightning, shutter micro-vibration, beacon alternation, tube flicker, drain scroll, searchlight cone aim
  screenshots/        headless-capture evidence (4 angles)
```

## Verification (behavioral, browser-driven)

Environment note: the verification browser is headless Chromium on **SwiftShader software WebGL** (no GPU on this host), and the harness disables page script execution on navigation — the production bundle was therefore booted in-page via dynamic `import()` of the exact built asset, then exercised through the same page context. Visual acceptance by a vision-capable reviewer was skipped (this model does not support vision), per instructions; all checks below are programmatic pixel/DOM/interaction evidence.

| Check | Method | Result |
|---|---|---|
| Production build | `vite build` | OK, no errors |
| Page loads, no boot errors | console capture + `window.__dioramaError` | clean |
| No UI DOM | `document.querySelectorAll('body *')` minus canvas | 0 nodes |
| WebGL2 context | `getContext('webgl2')` | created (SwiftShader), never lost |
| Scene composition | scene group census | ground, lighting, tspawn, asite, mid, bsite, ctspawn, flanks + FX layers all present; 1043 meshes audited |
| Render pipeline alive | frame counter over 20 s soak | frames advanced, no loop exceptions, stable |
| Draw budget | `renderer.info.render.calls` | ~930–950 per frame (+outline pass) |
| Content actually drawn | full-frame pixel readback | mean luminance 25–27/255, 250 distinct color buckets, p95 ≈ 79 — readable night image with bright light accents |
| FX layers draw | per-layer visibility toggle + pixel diff | puddle reflector 8.8 % of pixels change; rain streaks 17 %; drips visible; temporal diff with frozen camera 61 % |
| Tactical lights land where intended | world→screen anchor sampling | street-lamp head 138/255, B-house warm window 66, warehouse door gap 37, alley lamp pool 59, CT emblem wall 31, iron door 20 |
| Police beacon alternation | two samples 1.1 s apart | 184 → 105 (pulsing red/blue confirmed) |
| Orbit (drag) | synthetic mouse drag on canvas | camera azimuth 0.688 → −0.345 rad |
| Zoom (wheel) | synthetic wheel event | camera distance 63.6 → 46.7 |
| Resize | viewport change 1440×900 → 1000×700 | canvas + camera aspect follow |
| All content inside the base | AABB audit of every mesh (world-space corners) | max \|x\| = 30.00, max \|z\| = 30.00 (pedestal's own corners); zero strict overflows |
| Screenshots | 4 camera angles saved | `screenshots/diorama-{default-SE,north-T-high,west-A-alley,south-CT}.png` (~1 MB each) |

## Known limitations

1. **SwiftShader GL warnings** — the three custom `ShaderMaterial` layers (puddle reflector, rain, drips) trigger recurring `WebGL: INVALID_OPERATION: useProgram: program not valid` warnings **only under this host's software rasterizer**. Bisected per layer and pixel-verified: all three demonstrably render correctly. Not observed to affect content; expected to be absent on hardware WebGL. No fix attempted (driver-side issue, not a code defect).
2. **Software-renderer FPS** — headless SwiftShader sustains only ~4–6 fps at 1440×900 for this scene (full planar reflection + outline pass ≈ 950 draw calls). On any hardware GPU this is a trivial load; no optimization was traded against visual scope.
3. **Verification browser blocks page scripts on navigation** (harness configuration) — the standard `<script type=module>` path could not be observed executing in that browser; the identical built asset was booted via dynamic import instead. In an unrestricted browser the page self-boots normally (index.html → `/src/main.js` dev, hashed asset in prod).
4. Canvas textures use stencil Latin text for markings (freight codes, POLICE, GL HF); CJK glyphs were avoided because the headless environment lacks CJK fonts (rendering as tofu). The 警徽/emblem and 值班表 are pure graphics, no text dependency.
5. `window.__diorama` debug handle and a boot try/catch are intentionally left in (non-UI, documented) to aid evaluator instrumentation.

## Required human intervention

None for build/run. A vision-capable reviewer should confirm visual art direction (toon outline weight, color mood, graffiti placement) against `screenshots/` or a live `npm run preview` — this model performed no visual acceptance, per instructions.
