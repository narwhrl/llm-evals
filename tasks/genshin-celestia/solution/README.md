# Celestia — Genshin Impact Sky Island (Three.js + TypeScript)

A cinematic 3D rendition of Celestia as seen in *Genshin Impact*: a giant
central floating rock island ringed by ~8 smaller islets joined by white
arched bridges, a tall ivory multi-tier sanctum spire, and a golden
armillary sphere at its summit, all suspended above a rolling sea of
clouds with volumetric god-rays.

## Requirements

- Node.js ≥ 18 (developed on v24)
- No external services, assets, or credentials — everything is procedural.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. The scene loads straight into a
cinematic three-quarter distant shot; drag to orbit, scroll to zoom.

## Production build

```bash
npm run build
```

Outputs to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Structure

- `src/main.ts` — renderer, camera, lighting, animation loop.
- `src/world.ts` — scene composition: central island, islet ring, bridges.
- `src/island.ts` — procedural floating-island geometry (grass top, rock under-cone, ivory skirt).
- `src/sanctum.ts` — the central white spire + golden armillary.
- `src/architecture.ts` — bridges, colonnades, gates, arcade walls.
- `src/details.ts` — trees, waterfalls, ruins, floating debris.
- `src/sky.ts` — sky-dome shader, cloud sea, light shafts, distant Teyvat.
- `src/palette.ts` — material palette.
- `src/noise.ts` — deterministic seeded value-noise helpers.
