# Voxel Waterfall

A 3D voxel-style natural landscape scene built with React + Three.js. Mountains, a carved waterfall channel with cascading water droplets, drifting clouds that occlude the peaks, and forested foothills — all generated procedurally and rendered with `InstancedMesh` for stable frame rates.

## Quick start

```bash
npm install
npm run dev        # opens on http://127.0.0.1:5173
```

The dev server is the recommended way to iterate. Stop it with `Ctrl+C` when you're done; the project does not auto-start anything.

For a production build:

```bash
npm run build      # writes static files to dist/
npm run preview    # serves the production bundle locally
```

Open the URL printed by Vite (default `http://127.0.0.1:5173`). The scene loads immediately — no interaction required.

## Controls

- **Drag** — orbit the camera.
- **Wheel** — zoom in/out.
- **Side panel** — adjust seed, peak height, amplitude, voxel size, waterfall flow, cloud density / altitude / thickness, time of day (dawn → noon → dusk), vegetation, auto-orbit. "Randomize" picks a new seed.

## Project layout

```
src/
  main.tsx        React entry; wraps <App/> in <ErrorBoundary>
  App.tsx         Renderer + animation loop + UI panel
  scene.ts        Builds the voxel scene (terrain, water, clouds, lighting)
  terrain.ts      Procedural heightmap + waterfall channel carving
  noise.ts        Deterministic value-noise / fbm
  ErrorBoundary.tsx
  styles.css
index.html
vite.config.ts    Binds dev server to 127.0.0.1:5173
```

## Design notes

- The world is a `128 × 128` column grid; each column's surface voxel and the few voxels beneath it are rendered. A `BoxGeometry` is shared across ten `InstancedMesh`es — one per material (grass, dirt, stone, rock, snow, sand, water, cloud, leaf, trunk) — so the entire scene ships to the GPU in ~13 draw calls regardless of voxel count.
- The terrain uses two octaves of value noise plus three radial mountain profiles (main peak, secondary ridge, foreground knoll) so the silhouette has a clear hierarchy.
- The waterfall channel is carved by walking downhill from near the main peak and dropping the height of nearby columns. Water "droplets" are pre-allocated `InstancedMesh` slots animated each frame.
- Clouds are clusters of 4–9 cubes positioned in a wide band around `cloudAltitude`; their x position drifts over time.
- Vegetation is placed via a deterministic hash; trunks plus spherical leaf crowns sit on grassy, low-altitude columns away from the waterfall channel.
- Lighting combines a directional sun, hemisphere fill, and ambient. "Time of day" sweeps the sun position and lerps the sun/hemi/ambient colors between warm dawn, cool noon, and warm dusk.

## Verification

- `npm run build` produces a clean production bundle.
- Scene construction is exercised under Node (`tsx`) — see the smoke test commands in the round record.