# Voxel Waterfall (grok-bot)

Minecraft-like voxel nature scene built with **Three.js + React + Vite**:
mountains with a main peak and secondary ridges, cascading waterfall(s) into a foothill pool,
mid-mountain clouds that peaks pierce through, optional vegetation, and dawn/dusk lighting.

Terrain footprint defaults to **200×200** voxels.

## Requirements

- Node.js 20+ (18+ likely fine)
- npm 9+

## Install

```bash
cd tasks/voxel-waterfall/solution
npm install
```

## Develop

```bash
npm run dev
```

Open the printed local URL. The scene loads immediately with auto-orbit; drag to look around.
Use the right-hand panel for fog, waterfall speed, time of day, clouds, seed, etc.

## Production build

```bash
npm run build
npm run preview
```

Output lands in `dist/`.

## Gallery / deploy build

Matches the repo gallery builder (`deploy/build.mjs`):

```bash
npm run build -- --base=/voxel-waterfall/grok-bot/ --outDir=<absolute-or-relative-out> --emptyOutDir
```

## Controls (panel)

| Control | Effect |
| --- | --- |
| Time of day | Dawn → noon → dusk coloring + sun angle |
| Fog / density | Exponential mist |
| Waterfall speed | Cascade animation rate |
| Water opacity | Pool + waterfall transparency |
| Cloud layer / density / height | Mid-mountain cloud band (peaks pierce) |
| Mountain height / seed | Regenerates terrain |
| Vegetation | Trees & bushes on foothills |
| Auto-orbit | Slow camera orbit |
| Regenerate | Bumps seed and rebuilds |

## Tech notes

- Surface-shell voxelization via `InstancedMesh` (per material) for framerate
- Procedural heightmap: fBm + ridged noise + multi-peak Gaussians
- Waterfall carved along steepest-descent path from the main peak
