# Railway Town Diorama — Result Report

## Model & environment

- Model identifier: **SWE-2:max** (Codex model ID `devin/swe-2`, routed via the
  magpie provider, reasoning effort `max`)
- Harness: Codex CLI, `ask-for-approval=never`, `sandbox=danger-full-access`
  (full permission), Windows / PowerShell, Node v24.21.0, npm 11.19.0, Chrome
  headless + puppeteer-core for interactive checks
- Baseline `main` commit: `d16fa111d3b6651e11d7c38e8773f7228b4edeb6`
- No sub-agents, no other model APIs, no image-generation models used. All code
  in `tasks/railway-town-diorama/solution/` was written for this task.

## What was built

- Vanilla Three.js + Vite app in `tasks/railway-town-diorama/solution/`.
- ~68×44-unit display board on a raised wooden base with rim; near-isometric
  default camera shows the whole diorama on load.
- Closed CatmullRom track loop (~165 units) with ballast tube, instanced
  sleepers and two offset rails; river enters from the eastern rim and ends in
  the board so the loop crosses it once over a truss bridge with stone piers.
- Town: station platform + canopy + station house, 22 houses, 3 shops, church,
  farm (barn, silo, tilled fields), lighthouse, dock and rowboat, picket fence,
  ~24 trees, bushes, 14 street lamps; ribbon roads connect the station square,
  village centre and farm, with a level crossing.
- Train: locomotive + two coaches, each car sampled independently on the curve
  with fixed coupler offsets (no rigid-body rotation); station dwell ~2.0 s on
  every arrival.
- Controls: run/pause (freezes cars and the dwell timer), speed slider
  0.20–2.50×, day/night toggle (station lamps, street lights, lit windows,
  lighthouse beacon; scene stays readable), orbit/zoom, reset restoring the
  exact initial camera, train position and 1.00× speed.

## Verification actually run

| Command / check | Result |
| --- | --- |
| `npm install` | OK (15 packages) |
| `npm run build` | OK — `dist/` 541.73 kB JS, built in ~0.7 s |
| `npx vite build --base /railway-town-diorama/swe-2-max/ --outDir out` | OK |
| `npm ci --dry-run` | OK |
| Served `out/` under `/railway-town-diorama/swe-2-max/` (local static server) | page + bundle load 200 |
| Chrome headless screenshots (1440×900) | board, evening sun + shadows, running train, night mode verified visually |
| puppeteer-core interactive suite (`.artifacts/e2e/run.mjs`) | **11/11 PASS** |

Interactive suite details (production build, sub-path mount):

- train advances headS while running — PASS (15.0 → 21.5)
- station dwell ≈ 2 s — PASS (2.01 s measured)
- pause freezes cars and dwell timer — PASS (headS 9.54 → 9.54)
- resume continues — PASS
- speed control — PASS (2.5× ≈ 10.8 u/s vs 0.5× ≈ 2.3 u/s)
- night toggle — PASS (background `#12162e`, glow lights on)
- orbit + zoom — PASS
- reset restores camera exactly — PASS (cam 46, 42, 52; speed 1.00×)
- reset deterministic — PASS (headS 8.247 vs 8.282 across two resets)
- two full laps, dwell each lap — PASS (`laps:2, dwells:2, minGap:4.35`)
- console errors — PASS (none; favicon 404 fixed via inline icon)

## Known limitations

- The dusk sky is a flat warm tone + fog rather than a gradient dome.
- Trees/buildings are stylised low-poly primitives, no normal maps or baked AO.
- `npm install` prints an `allowScripts` warning about esbuild's postinstall on
  this machine's npm policy; esbuild ships a prebuilt binary and both
  `npm run build` and the `--base/--outDir` build succeeded regardless.

## Human intervention

None required. Install → `npm run dev` or `npm run build` → open the page.
