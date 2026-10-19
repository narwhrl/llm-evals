# Candidate result — cs-pvp-diorama / swe-2

- **Model identifier:** `magpie/devin/swe-2` (ZCode agent session, `swe-2` candidate id).
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`.
- **Candidate path:** `tasks/cs-pvp-diorama/solution/` in the isolated clone (detached worktree `.worktrees/swe2-cs-pvp-diorama`).

## Implementation summary

Vite + Three.js single-page app; every mesh is procedural — no models, textures or icons are loaded. The diorama is a single 40×40 square concrete base (`darkConcrete` slab + a slightly inset `wetAsphalt` top). All scene content sits inside that footprint; there are no UI elements and no people.

- **Regions:** T spawn on the north (container stacks forming two sniper levels, a battered box truck and leaning ladder as cover, a ramp toward mid/A, oil-drum and pallet clusters, a breached wall crouch-spot); A site on the north-west (a half-open warehouse — rolled-up shutter, board-up windows, side door, load-bearing column, five-tier shelving, forklift, sack piles, a tin mezzanine loft reached by a ladder with a small overlooking window, plus a painted A-site floor marking, sorting table, AC unit, freight sign and wheelie bin); the central mid lane (a half-open double steel gate leaving the classic peeking slit, high concrete walls with firing slots, a drainage trench with a rusted grate over water, a low CT-side cover wall and a dumped road sign); B site on the north-east (a two-storey tin guard-house with front/back doors and windows, a fire-escape zigzag up to a railed balcony overlooking B and the side alley, a painted B-site ground marking, overturned cafe furniture, a fallen bicycle, bins and a warm street lamp); CT spawn on the south (jersey barriers and riot shields in a cordon, a police van with a strobing red/blue lightbar, a raised concrete searchlight platform reached by steps, and a rear wall with a badge and warning band).
- **Routes:** the central duel lane plus the left alley (two tall side walls with crate cover) and the right elevated concrete flank form the three attack paths.
- **Art direction:** `MeshToonMaterial` + a 4-step `CanvasTexture` gradient map on every surface for the hard cartoon shading, `BackSide` black outline shells on the main forms, ACES tone mapping, exponential fog, and a deliberate warm-vs-cool lighting mix — cool moonlight/ambient/fill against warm sodium lamps, cold-white emergency lights, the warehouse interior fluorescent, the B guard-room lamp and window glow, and the alternating police strobes.
- **Environment detail:** wet reflective asphalt, ten puddles with expanding ripple rings, four power poles with sagging catenary wires, rusted gutters with dripping eaves, graffiti/freight-number/faction-spray decals, bullet-pock clusters, and the requested prop family (stacked crates, oil drums, pallets, jersey barriers, tyres).
- **Dynamics:** 2 400 instanced rain streaks, dripping eaves, puddle ripples, a flickering street lamp, a sweeping searchlight, the van's alternating strobes, a subtle roller-shutter vibration, drifting steam vents, and a rare two-stroke distant lightning flash.

## Verification run

All commands run from `tasks/cs-pvp-diorama/solution/`.

| Command | Observed result |
| --- | --- |
| `node --check src/world.js` / `src/main.js` | Both passed. |
| `npm install --no-audit --no-fund` | Passed; produced `package-lock.json`. npm printed an `allowScripts` advisory skipping `esbuild`'s postinstall; the platform binary was already present so `vite build` still succeeded. |
| `npm run build` | Passed — Vite emitted `index.html` + `assets/index-*.js` (~538 kB, ~136 kB gzip). Vite emitted one non-failing advisory that the bundle exceeds 500 kB before gzip (Three.js is a single dependency); no code-split was needed for a single-canvas scene. |
| `npm run preview -- --port 4320 --strictPort --host 127.0.0.1` | Served the production build locally; stopped after verification. |

No task inputs, tests or repository rules were modified.

## Browser inspection

Verified through the connected Kimi WebBridge Chrome session at a measured **1440 × 900** desktop viewport (`Emulation.setDeviceMetricsOverride`), hardware WebGL.

- **First paint:** the full square base reads as a miniature diorama — T spawn, A warehouse, the mid gate, B guard-house and the CT cordon are all visible at once; no UI, no people, nothing outside the base.
- **Orbit / drag / zoom:** `OrbitControls` responds to pointer drag and wheel zoom across the useful range; rotating exposes the alley, the right flank, the T-side containers and the rear walls.
- **Regional fidelity:** the mid gate's half-open slit, the high walls with firing slots, the drainage trench grate, the CT low wall, the A warehouse shutter/shelving/forklift/loft, the B guard-house balcony + fire escape + warm lamp, and the CT cordon + van + searchlight platform are all visible in the zoomed capture.
- **Dynamics observed:** rain streaks, dripping eaves, expanding puddle ripples, the flickering street lamp, the sweeping searchlight cone, the van's alternating red/blue strobes, the shutter vibration, drifting steam and the rare lightning flash.
- **Network:** all assets (HTML + the bundled JS) returned 200; the only 404 was a missing favicon, which was then added under `public/`.
- **Console:** no errors observed during load, orbit, zoom or the ~60 s observation window.

Saved visual evidence under `evidence/`: `shot-overview.jpg`, `shot-zoom.jpg`, `shot-bsite.jpg`.

## Limitations and intervention

- Requires a WebGL-capable browser. The `MeshToonMaterial` + outline-shell style is a deliberate stylisation, not a defect.
- The single bundle is ~538 kB before gzip because Three.js is not code-split; Vite's chunk-size advisory is the only build note.
- **Required human intervention:** none for the candidate itself. The isolated clone was realised as a detached `git worktree` under `.worktrees/` per the repository worktree convention (the Windows `git clone --no-local` sandbox path is unreliable here, as documented in earlier `RESULTS.md` files).
