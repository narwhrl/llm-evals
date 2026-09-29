# ハローストア — Rainy Konbini Diorama

A toon-shaded miniature of a Japanese convenience-store corner on a rainy night,
built as a self-contained Three.js scene. Every mesh, texture and sign is
generated at runtime in the browser — there are no external assets and no
network calls after the page loads.

## Run locally

```sh
npm ci
npm run dev
```

Open the URL Vite prints. Drag to orbit, scroll to zoom. The scene has no
visible controls and no people.

## Production build

```sh
npm run build
npm run preview
```

Output goes to `dist/`. The build accepts Vite's `--base` and `--outDir`, so it
can be served from a path prefix (the repository gallery does exactly this).

## Layout

| Path | Purpose |
| --- | --- |
| `src/main.js` | Renderer, camera, `OrbitControls`, animation loop |
| `src/world.js` | Lighting, sky, assembly, `update(t)` entry point |
| `src/kit.js` | Geometry cache, toon materials, outlines, canvas textures |
| `src/palette.js` | Night colour tokens (cool street, warm shop) |
| `src/parts/` | `base`, `store`, `interior`, `street`, `props`, `weather` |

## Rendering notes

- **三渲二 toon look:** `MeshToonMaterial` with a three-step gradient map, plus
  inverted-hull outline shells scaled to a constant world-space thickness so
  line weight stays even from a 22-unit base down to a 0.2-unit shelf lip.
- **Warm/cool contrast:** cool hemisphere + moon outside; the shop interior is
  lit by its own short-range warm point lights and emissive ceiling panels, so it
  stays bright and golden when seen through the glass.
- **Wet surfaces:** the tarmac carries a low-opacity cool sheen, and coloured
  reflection smears plus expanding ripple rings stand in for a real reflector —
  cheaper, and closer to the anime convention.
- **Performance:** shared geometry buffers, instanced merchandise, one
  `LineSegments` rain volume that wraps, and no per-frame allocation in
  `update()`.
