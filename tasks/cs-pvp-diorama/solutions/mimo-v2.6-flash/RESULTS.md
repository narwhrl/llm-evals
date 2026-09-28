# Candidate Result Report — cs-pvp-diorama

## Identity

- Model identifier: `xiaomi/mimo-v2.6-flash`
- Candidate branch: `llm/cs-pvp-diorama/mimo-v2.6-flash`
- Starting `main` commit SHA: `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- Canonical candidate path: `tasks/cs-pvp-diorama/solution/`

## What was built

A browser-runnable miniature diorama of a classic CS-style defusal map on a
square concrete base, rendered with Three.js:

- Toon shading (`MeshToonMaterial` + 4-band gradient map) with a full-screen
  depth-discontinuity outline post pass (`src/post.js`).
- Procedural geometry for the four core regions (T spawn, CT spawn, A site,
  B site) and the three route families (central duel lane, west flanking
  alley, east elevated flank), plus interior dressing, tactical cover props,
  graffiti/freight markings, bullet impacts, utility poles with crossing wires.
- Real-time puddle reflections via a masked planar Reflector updated once per
  frame from the animation loop; rain streaks, edge drips, puddle ripples,
  vent steam, distant lightning, light flicker, searchlight sway, police
  strobes, rolling-shutter vibration, scrolling wall wetness.
- Damped `OrbitControls` (drag/wheel/right-drag); no visible UI, no people,
  no geometry outside the square base.
- All textures are generated at runtime with offscreen canvases; no network
  assets and no credentialed services.

## Verification actually run

| Command / check | Result |
| --- | --- |
| `npm install` (in `solution/`) | Success, `found 0 vulnerabilities` |
| `npm run build` | Success (`vite v7.3.6`); emits `dist/index.html` + one ~600 kB JS chunk; only a chunk-size warning (Three.js single bundle), no errors |
| `npm run preview -- --port 5188 --strictPort` | Serves `dist/` with HTTP 200 (port 4173 was already occupied by an unrelated process in this environment, so 5188 was used) |
| Headless Chrome (`--headless=new`, software WebGL/SwiftShader, `--window-size=1440,900`, fresh `--user-data-dir`, `--virtual-time-budget=2500`) loading `http://localhost:5188/` | Exit 0; console capture contains **0** shader errors, **0** uncaught exceptions, **0** failed resource loads; screenshots written for the default camera and a second (north-west) camera position |
| Pixel-region sampling of the 1440×900 screenshots (PowerShell/System.Drawing) | Cool night palette with readable mid-tones: sky avg `17/26/41`, warehouse wall `81/94/115`, CT platform `73/93/126`, mid lane `106/109/126`, B building `54/58/68`; global avg `32/43/61` |
| Puddle-mask output check (debug build, constant-color fragment tests during development) | Mask texture samples white in blob regions and black elsewhere; reflection shader executes; reflector mesh draws |
| Static review of controls/interaction path | `OrbitControls` with damping, distance clamp 24–140, polar-angle clamp 1.46 rad; resize handler updates camera/renderer/post target |

Note on method: image previews used during development had unreliable color
rendering, so brightness/colour judgements above are based on direct pixel
sampling of the PNG screenshots rather than visual preview inspection.

## Known limitations / failures / human intervention

- Interactive pointer drag/zoom was not exercised by a human in this
  environment; interaction was verified through the standard `OrbitControls`
  configuration and by rendering the scene from two camera positions (the
  second position was taken with a temporary camera override that is **not**
  present in the committed code).
- Rendering was verified only under headless Chrome software WebGL
  (SwiftShader). Frame-rate on real GPUs was not measured.
- The sewer connection is represented by entrance/exit headwalls and covered
  iron grates on the surface; there is no excavated underground tube because
  the square base is a solid slab by design.
- The reflection pass re-renders the whole scene once per frame (1024²,
  no MSAA); this is the main runtime cost after the base scene draw.
- Lightning is expressed as sky/light modulation only — no geometry exists
  off the base, per the evaluation rules.
- No bloom/glow post-processing beyond additive sprites; emissive fixtures
  rely on halo sprites for their light bloom.
- Environment quirk (not a code failure): TCP port 4173 was occupied by an
  unrelated listener, so verification used port 5188. No human intervention
  was required for install, build, or run.
