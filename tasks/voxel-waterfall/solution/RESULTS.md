# Result Report — voxel-waterfall / deepseek-v4.1-flash

## Model

- Complete model identifier: `deepseek-v4.1-flash` (the model driving this session; recorded as candidate id `deepseek-v4.1-flash`).

## Baseline

- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Run location: isolated worktree `.worktrees/run-voxel-waterfall-deepseek` detached at that commit; implementation written only under `tasks/voxel-waterfall/solution/`.
- Fair-run note: this is a from-zero re-run. Neither the previous `deepseek-v4.1-flash` candidate for this task nor any other model's archived candidate was opened during implementation.

## Shared inputs

- Task prompt: [`../task.md`](../task.md); round record: [`../README.md`](../README.md).
- The task provides no starter code and no fixed executable tests, so verification is build + real browser runtime, per the round record.

## Commands actually run

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | Added 64 packages. npm reported one install script (`esbuild@0.21.5` postinstall) not covered by its `allowScripts` policy; the build still produced working output, and the same esbuild binary is exercised by every subsequent build. |
| `npm run build` | Success, `vite build` in ~0.8s. `dist/index.html` 0.41 kB, `dist/assets/*.css` 3.66 kB, `dist/assets/*.js` 658.34 kB (176.52 kB gzip). Vite warns that one chunk exceeds 500 kB; the bulk is Three.js itself, which the task requires. |
| `npm run dev -- --port 5178 --strictPort` | Dev server ready in ~0.5s; used for browser verification, then terminated. |
| `npm run preview -- --port 4178 --strictPort` | Served the production bundle; used to verify the built output (not only the dev server), then terminated. |

Environment note: `TMP`/`TEMP` had to be pointed at a directory inside the workspace because the system temp directory denied the file removal esbuild performs during transpile. This is a host permission condition, not a project setting; the commands above are otherwise the project's own scripts.

## Browser verification

Verified with a real browser (Kimi WebBridge-driven Chrome tab) at a desktop viewport, on both the dev server and the production preview build:

- First paint already shows the complete scene — mountain range, tarn on the mesa top, the fall, the plunge pool, and the cloud band — with no user input required.
- Scene contents confirmed by observation and by reading the live renderer: 71,046 terrain voxel instances at the default `200×200` grid (requirement was ≥200×200 columns), 240 cloud puffs, 600 falling water cubes plus 108 spray cubes, one pool disc and one lake disc.
- Draw calls per frame: 6–7; triangles: ~0.87M at default, ~1.38M at the 240×240 maximum. Per-frame CPU cost of the full update+render path measured at 0.74 ms, i.e. the animation is not CPU-bound.
- Main peak reads as the largest mass, the rim is a genuine cliff, and sub-peaks ring it; the cloud layer sits at the waist with the summit above it and passes both in front of and behind the terrain.
- Waterfall continuity: water leaves the tarn through the carved spillway notch, falls the cliff face, and recycles at the pool surface; spray rises from the impact point. Verified over 240 simulated frames plus live page time.
- Interaction: orbit drag, wheel zoom and right-drag pan all respond (pointer/touch via `OrbitControls`, damped).
- All 17 sliders and the time-of-day select are live-wired: setting the grid to 240×240, water to 1400, clouds to 520, sub-peaks to 34, direction to 200° and time to noon rebuilt the scene with zero console errors, zero uncaught exceptions, and the reported instance counts matching.
- Time-of-day presets noon/dusk/dawn/night each repaint sky, fog, sun and terrain palette consistently.
- Console during the session: no errors recorded (`window.__errs` stayed empty after a full parameter sweep).

## Known limitations

- Rendering quality was judged from screenshots at one desktop viewport; the review procedure in the round record additionally asks for multiple orbit angles, which were covered by driving the camera programmatically rather than by a human re-inspecting every angle.
- The scene is a fixed `resolution × resolution` block of terrain, so the world ends at a sheer grid boundary. Camera limits keep the default view inside the composition; zooming far out exposes the edge.
- Shadows are single-directional with a shadow box fitted to the grid; at the largest grid the map stays 2048², so distant contact shadows soften. Toggleable in the panel.
- Water is voxel cubes, not a fluid surface: the fall reads as a continuous sheet but has no refraction or foam shading.
- No automated test suite ships with the task; correctness rests on the build plus the browser observations recorded above.

## Required human intervention

- None for the delivered functionality. Re-running the gallery build on this machine needs the same `TMP`/`TEMP` redirection noted above, or the host's default temp directory must permit file removal by esbuild.
