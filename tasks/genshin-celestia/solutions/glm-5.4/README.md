# Sky Observatory — Floating Sanctum

An original 3D scene built with Three.js, TypeScript and WebGL: an ancient sky observatory standing on a
large, irregular floating rock island, with smaller islands set on two staggered arcs around it and
joined by white arched bridges, broken walkways and colonnades. Waterfalls drop off the cliffs into a sea
of clouds; rock shards drift between the islands.

Everything is generated when the page loads. Geometry, textures and the sky are procedural, so the scene
needs no backend, no credentials and no remote assets.

## Requirements

- Node.js and npm (tested with Node.js 24.21.0 and npm 11.19.0).
- A browser with WebGL 2.

## Install

```bash
npm install
```

`npm ci` installs the same versions from `package-lock.json`.

## Run

```bash
npm run dev
```

Then open the URL Vite prints (by default <http://localhost:5173>). The page opens straight onto the
scene: a cinematic three-quarter distant shot with the main island, the observatory tower and islands on
both sides in frame at 1440 × 900. There is no interface, no characters and no gameplay.

- Drag to orbit, scroll or pinch to zoom.
- Until you interact, the camera stays on the default view and drifts almost imperceptibly. Resizing the
  window re-frames it; after the first drag the camera is yours.
- The view widens on narrower windows so the side islands stay in frame.

## Build

```bash
npm run build
```

This type-checks with `tsc` and builds into `dist/`. Vite's `--base` and `--outDir` options are passed
through, for hosting under a sub-path:

```bash
npm run build -- --base=/genshin-celestia/glm-5.4/ --outDir=dist/out --emptyOutDir
```

In Git Bash on Windows, prefix the command with `MSYS_NO_PATHCONV=1`; otherwise MSYS rewrites the leading
slash of `--base` into a Windows path.

`npm run preview` serves the last build.

## How it is put together

- `src/main.ts` creates the renderer, the post-processing chain, the default framing and the camera
  controls.
- `src/core/` holds what the rest builds on: seeded noise, the aerial-perspective shader hook, the
  geometry builder that merges many primitives into a few meshes, and the procedural textures.
- `src/world/` is the scene. `realm.ts` lays out the islands and assembles everything else: `sky`,
  `island`, `stonework` and `architecture`, `sundial`, `bridges`, `vegetation`, `water`, `clouds`,
  `farLands`, `debris`, `birds`.
- `src/post/grade.ts` is the finishing pass: a little saturation, cool shadows against warm light, and a
  vignette.
