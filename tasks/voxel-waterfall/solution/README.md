# Voxel Waterfall — swe-2

A Three.js + React + Vite voxel landscape: a mountain range with a waterfall and a
cloud deck that the peaks pierce. ~1.24 M voxels over a 200 × 200 footprint.

## Scene

- **Mountains** — five Gaussian-blended peaks (h ≈ 34–74) with fBm detail, rolling
  foothills, elevation banding (meadow → earth → rock → snow).
- **Waterfall** — a ridge channel follows a sinuous spine down the main massif,
  widens at a hero drop, ends in a plunge pool with foam and rising mist, then runs
  on as a meandering river to the map edge.
- **Clouds** — a patchy fBm cloud deck at y ≈ 42–50; cells under terrain are culled
  so the highest peaks break through. A thin upper veil hugs the summit.
- **Vegetation** — conifers and shrubs scattered on low foothills.
- **Light** — warm low sun with 4k soft shadows, violet hemisphere bounce, cool
  rim light; dawn-graded sky with distance fog.

## Controls

Top-left panel toggles waterfall, cloud deck, and snowline, and exposes a cloud-
density slider. Orbit with drag, zoom with scroll, pan with right-drag. The scene
opens on a full-compound view — no input needed.

## Run

```sh
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview
```

`window.__voxels` reports the voxel count; `__scene` / `__cam` are exposed for
inspection.
