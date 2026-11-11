# Celestia · 天空岛

A cinematic Three.js and TypeScript reconstruction of Celestia, the floating sanctuary above Teyvat. The scene is generated procedurally at runtime; it requires no backend, credentials, or external art assets.

## Requirements

- Node.js `^20.19.0 || >=22.12.0` (Vite 8)
- A browser with WebGL 2 support

## Install

```powershell
npm install
```

For a clean install from the committed lockfile:

```powershell
npm ci
```

## Develop

```powershell
npm run dev
```

Open the URL printed by Vite. The page opens directly into a three-quarter distant view of the complete island. Drag with the primary pointer button to orbit the camera, and use the mouse wheel to zoom.

## Build

```powershell
npm run build
```

The command runs `tsc --noEmit` followed by `vite build` and writes the static site to `dist/`.

## Deploy under a subpath

Build and preview under the deployment base used for evaluation:

```powershell
npm run build -- --base=/genshin-celestia/deepseek-v4.1-flash-max/ --outDir=dist
npm run preview -- --base=/genshin-celestia/deepseek-v4.1-flash-max/
```

Change `--base` to the actual deployment prefix, and pass `--outDir` when a different output directory is required. Generated asset URLs are prefixed with the supplied base.
