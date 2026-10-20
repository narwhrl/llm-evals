# 云山飞瀑 · Voxel Waterfall

A real-time voxel landscape built with React, Vite and Three.js: a mountain range with a
main summit and secondary peaks, waterfalls pouring over the cliffs into plunge pools, a
cloud deck wrapping the waist of the range, and forest on the lower slopes.

Everything in the scene is generated at runtime from an integer seed. No image, model or
font is downloaded; the block grain, the water streaks, the spray and the mist are all
drawn into 2D canvases at start-up.

## Running it

```bash
npm install        # or: npm ci
npm run dev        # development server on http://127.0.0.1:5173/
npm run typecheck  # tsc --noEmit
npm run build      # type check + production build into dist/
npm run preview    # serve the production build on http://127.0.0.1:4173/
```

The page opens straight into the scene: the camera settles onto the hero framing after a
short opening move, so the whole diorama is visible without any interaction.

Production builds accept the usual Vite overrides, which the gallery uses to host a
candidate under a path prefix:

```bash
npm run build -- --base=/voxel-waterfall/example/ --outDir=dist-subpath
```

## Project layout

```text
src/
├── main.tsx                 React entry point
├── App.tsx                  Parameter state, layout, title card
├── styles.css               Design system for the shell and the parameter panel
├── scene/
│   ├── params.ts            Parameter defaults and the camera preset list
│   ├── World.tsx            Renderer, camera rig, rebuild pipeline
│   ├── terrain.ts           Height field, stream routing, voxel meshing
│   ├── voxel.ts             Shared box/quad emitters and the indexed geometry builder
│   ├── water.ts             Falling sheets, plunge pools, spray and mist
│   ├── clouds.ts            The cloud deck
│   ├── vegetation.ts        Trees, boulders and ground cover
│   ├── sky.ts               Sky dome, sun rig and the five lighting presets
│   ├── textures.ts          Procedural canvas textures
│   └── noise.ts             Seeded value noise, fBm and ridged fBm
└── ui/
    ├── ControlPanel.tsx     The parameter panel
    └── useDebouncedValue.ts Keeps slider drags from rebuilding every frame
```

## How the scene is built

**Terrain.** A height field of `size × size` cells (224 × 224 by default, so 50,176
voxels) is built from five hand-placed massing points plus ridged fractal noise, then
quantised to whole voxels. Only the visible shell is meshed: one top face per cell plus
a side face wherever a neighbour sits lower, with per-corner ambient occlusion on the
top faces and a vertical gradient down the cliffs. Textures are mapped in world units,
so one texture tile is one block and the seams between blocks stay aligned.

**Water.** A cost-to-outlet field is computed over the height field with Dijkstra, so
every stream knows the cheapest way down. The routes are then walked along that field,
which guarantees they reach the foot of the mountain and keeps them on the steepest
short line — which is where the cliffs are. A cliff is then cut into the flank where
each stream has already dropped a good part of the way, giving the water a lip to pour
over. The falling sheet is a curtain of water built from the real height difference
between two route cells, so a 25-block drop in the ground becomes a 25-block fall.

**Clouds.** The deck is laid out over a coarse grid and only forms where the ground
rises into the layer, so it wraps the mountain flanks and leaves the valley floor clear.
The puffs are clusters of overlapping boxes so the layer reads as drifting cloud rather
than a row of cubes.

## Controls

Drag to orbit, scroll to zoom, right-drag to pan. The panel on the right adjusts the
grid size, summit height, ridge sharpness, snow line, tree line, number of falls, cloud
coverage and altitude, the five lighting presets, fog density, shadows, auto-rotate and
four camera framings.
