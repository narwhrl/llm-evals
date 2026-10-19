# Voxel Chinese Architecture — swe-2

A Three.js voxel-style classical Chinese temple compound (~31,000 voxels), rendered as a
dawn-lit axial courtyard layout.

## Layout

Central axis (south → north along -z → +z):

- **山门 Mountain gate** at the south entrance — gold hip roof, stone lions, passage
- **庭院 Courtyard** — stone processional path, lantern posts, incense burner
- **大雄宝殿 Main hall** — largest massing, two-tier marble platform, double-eaved
  roof (teal skirt + gold upper), red walls and columns
- **配殿 Side halls** ×2 — symmetric east/west, teal hip roofs
- **宝塔 Pagoda** (east rear) — five tapering storeys, teal roofs, gold spire
- **钟楼 Bell tower** (west rear) — open column base, gold bell, gold roof

Details: dougong bracket courses under every eave, upturned flying-eave corner tips,
ridge finials, door/window openings, lanterns, pine trees, checkerboard grass ground.

## Run

```sh
npm install
npm run dev       # http://localhost:5173
npm run build && npm run preview   # production build
```

Orbit with drag, zoom with scroll. The scene opens on a full-compound view — no
interaction needed to see everything.

## Tech notes

- All geometry is `InstancedMesh` batches — one `BoxGeometry(1,1,1)` per palette color,
  so the whole ~31k-voxel scene renders in ~15 draw calls.
- Dawn lighting: warm directional sun (2048px shadow map), violet hemisphere bounce,
  cool rim light.
- `window.__voxels` (count), `__scene`, `__cam` are exposed for inspection.
