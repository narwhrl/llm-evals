# Rainy Konbini Diorama — Candidate Result Report

## Identity

- Candidate ID: `deepseek-v4.1-flash`
- Model: `deepseek-v4.1-flash` (DeepSeek Harness, `qoder-cn/dfmodel`)
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Run location: isolated worktree `.worktrees/run-rainy-deepseek` (detached at the baseline), canonical candidate path `tasks/rainy-konbini-diorama/solution/`

The implementation was written from the task prompt alone. No archived candidate, other model solution, or earlier `deepseek-v4.1-flash` attempt was read while building it.

## What It Is

A single-page three.js scene (`three` + `vite`, no other runtime dependency) that renders a rainy-night Japanese convenience-store street corner as a collectible miniature:

- `src/core.js` — toon ramp, material caches, inverse-hull outline construction, procedural textures.
- `src/street.js` — square 20×20 base, asphalt roads, pavement, curb, crosswalks, drainage grate, vending machines, bicycles, umbrella stand, bins, streetlights, utility pole and wires, road signs, guardrails, AC units, notice board, parking stops, alley mouth, traffic signal, corner planting.
- `src/store.js` — store shell, glass storefront and side window, automatic sliding door, awning, signboard, and a fully furnished interior (three central shelf runs, wall snack shelves, drinks coolers, bento case, onigiri island, checkout with register/coffee machine/oden counter, magazine rack, posters, floor guidance, back-room door, lockers).
- `src/atmosphere.js` — 2,200-point rain, eave drips, 40 expanding puddle ripples, puddle patches, wet-road light streaks, halo sprites.
- `src/main.js` — renderer, camera, orbit controls, lights, animation loop, read-only `window.__diorama` inspection probe.

Art direction: toon-stepped lighting (`MeshToonMaterial` with a 4-step ramp) plus back-face outline shells, cool blue night exterior against a warm interior, neon sign bands, wet reflections, and rain haze. There is no UI, no text, and no people.

## Verification

All commands were run inside the run worktree.

| Command | Result |
| --- | --- |
| `npm install` | 0 vulnerabilities |
| `npm run build` | succeeded, `dist/index.html` 0.78 kB + `dist/assets/index-*.js` 550.28 kB (140.93 kB gzip) |
| `npx vite --port 5183 --strictPort` | dev server served the scene |
| `npx vite preview --port 4180 --strictPort` | production build served and rendered |

Browser verification (Kimi Browser Extension against the user's real Chrome, focus emulation enabled so the background tab keeps animating):

- Opening view: complete square base, street corner readable, store centred, no UI or people.
- Orbit/zoom/drag: checked at the opening view, a front elevation, a high corner view, a street-level view, and a close interior view; all geometry stays on the base.
- Interior: shelves, merchandise, coolers, bento case, checkout, coffee machine, oden counter, magazines, posters and floor guidance are legible through the glass; warm/cool contrast holds from the front and the corner.
- Motion: rain, eave drips, puddle ripples, glass runoff, sign flicker, automatic door (`window.__diorama.door()` reported `open: 0.9999999, target: 1` after a cycle) and traffic-signal change (`traffic: 2`) all advance.
- Network: only `/assets/index-*.js` and `/favicon.ico` were requested; nothing remote.
- Renderer stats at the opening view: ~2,300 draw calls, ~34,200 triangles, 654 geometries, 5 textures, 14 shader programs, 24.2 ms per `renderer.render` call.

## Known Limitations

- Draw calls are high (~2,300) because every outlined part renders its own outline shell. Instanced-batch outline merging was prototyped and reverted: it produced incorrect silhouettes, so per-object shells were kept.
- Outline thickness is normalised per geometry from its bounding-sphere radius, so very large and very small parts do not share an identical pixel line weight.
- Automatic-door and sign-flicker timings use wall-clock deltas; a tab that is throttled by the browser pauses the animation until it is visible again (expected browser behaviour).
- The build prints Vite's chunk-size warning for the 550 kB bundle (three.js is bundled whole).

## Human Intervention

None. No prompts, corrections, or retries were needed from the user during the run.
