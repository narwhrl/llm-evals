# Rainy Konbini Diorama — mimo-v2.6-flash

A three.js 三渲二 (toon-shaded) miniature of a Japanese convenience-store street corner on a rainy
night, built as a single full-screen canvas with no UI elements. Drag to orbit, wheel to zoom.

## Run

```bash
npm ci
npm run dev        # vite dev server
npm run build      # production build -> dist/
npm run preview    # serve dist/ on port 4187
```

Gallery build (the command the curator's deploy script uses):

```bash
npm run build -- --base=/rainy-konbini-diorama/mimo-v2.6-flash/ --outDir=dist-gallery --emptyOutDir
```

## Structure

- `src/main.js` — renderer, camera, OrbitControls, animation loop, `window.__diorama` introspection handle.
- `src/world.js` — lighting rig and scene assembly; returns the `update(time, dt)` tick.
- `src/palette.js` / `src/layout.js` — color tokens and world-space layout constants.
- `src/kit.js` — toon-material helpers, inverted-hull outlines, canvas-texture utilities, deterministic PRNG.
- `src/parts/` — `base` (plinth, roads, crosswalks, puddles, wet reflections), `store` (facade, fascia, awning, automatic door, roof), `interior` (coolers, gondolas, checkout, oden, posters), `street` (backdrop buildings, poles, wires, signals, guardrails), `props` (vending machine, bicycles, bins, notice board, alley dressing), `weather` (rain, eave drips, ripples, glass runoff, flicker, door and signal cycles).
- `evidence/` — seven 1440×900 acceptance screenshots (see `RESULTS.md`).

## Motion

Rain falls continuously with obstacle-aware respawn, eave drips land in ripples, the fascia sign
flickers, the automatic door opens on a 24 s cycle, traffic signals rotate on a 21 s cycle with per-head
phase offsets, and additive ground streaks shimmer under the neon.

`window.__diorama` exposes `{ time, frames, advance(dt), camera, controls, renderer, scene }` so
verification tooling can step the simulation deterministically. It changes no rendering behavior.
