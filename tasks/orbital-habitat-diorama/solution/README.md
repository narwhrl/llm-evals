# 轨道之家 · 空间站生活舱

A no-UI orthographic isometric diorama of a cut-away orbital habitat module, built with Three.js and Vite. A 3D Earth fills the large rear porthole, and the cabin runs a 90-second day/night cycle.

## Requirements

- Node.js 20 or newer (verified with Node 24.21.0 and npm 11)
- A browser with WebGL 2

## Commands

Run all commands from this directory (`tasks/orbital-habitat-diorama/solution/`).

```bash
npm ci                 # install the exact locked versions (three 0.186.1, vite 8.3.1)
npm run dev            # development server, http://localhost:5173/
npm run build          # production build into dist/
npm run preview        # serve dist/ locally, http://localhost:4173/
```

Non-root deployment passes `--base` and `--outDir` through to Vite:

```bash
npm run build -- --base=/some/sub/path/ --outDir=dist-sub
npx vite preview --outDir=dist-sub --base=/some/sub/path/
```

In Git Bash on Windows, set `MSYS_NO_PATHCONV=1` for these two commands. Otherwise the shell rewrites `/some/sub/path/` into a Windows path.

Runtime assets (the three Earth textures in `public/textures/`) are loaded relative to `import.meta.env.BASE_URL`. Every other texture is generated procedurally on a canvas at startup, so the page makes no remote requests.

## Interaction

| Action | Result |
| --- | --- |
| Drag empty space | Rotate within azimuth 10°–80° and elevation 15°–60° |
| Mouse wheel | Zoom 0.8×–4× |
| Click the workstation, sleeping bag, plant rack, viewing chair, bike or storage nets | Smooth focus on that fixture. Click it again or click empty space to return to the isometric overview |
| Drag Earth in the big porthole left or right | Scrub orbital time. Auto-advance resumes on release |
| Click the big porthole | Toggle fast-forward (15-second cycle) and back to 90 seconds |
| Hover near or click the floating pen | It drifts away from the pointer; a click makes it spin fast |
| Click the grow-light bar | Turn the plant light off or on |
| Click the floor light strip | Toggle night-cruise mode |

A drag becomes a scrub or rotation after 6 px of movement. Anything shorter is a click.

## Layout

- `src/main.js`: renderer, post-processing, context wiring and the render loop.
- `src/core/`: orbital clock, camera controls, pointer interaction, state and interactive registry, static batching.
- `src/cabin/`: shell, floor, portholes, hatches, ribs, cables, service details, light strip and the invisible sun-blocking shell.
- `src/furniture/`: furnishings, clutter and floating objects.
- `src/earth/`: stencil-masked Earth globes and shaders.
- `src/lighting/`: all lights, the sun shadow and the light shaft.
- `src/textures/`: procedural canvas textures.
- `docs/DESIGN.md`: coordinates, layout, lighting and module contracts.
- `evidence/`: the five 1440×900 screenshots required by the task.
