# Voxel Waterfall

A procedural Three.js landscape built with React and Vite. The scene is generated in the browser: a 200 × 200 terrain grid is sampled into a layered voxel mountain, with three stepped water courses, translucent cloud bands, a valley pool, and a small forest edge.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal. The production build can be checked with:

```bash
npm run build
npm run preview
```

## Controls

- Drag the scene to orbit and scroll to zoom.
- Use the viewfinder to move between the overview, waterfall, ridge, and valley camera positions.
- Adjust light study, cloud cover, and water flow from the atmosphere panel.
- Toggle forest edge, cloud veil, auto orbit, and voxel edge rendering.

All geometry and lighting are procedural; no external scene assets or runtime API keys are required.

## Evaluation record

- Model: `opencode/space-bunny-free`
- Starting `main`: `48447fcd82c65abb929e051e61b94d6031aa81ba`
- `npm ci`: passed with 0 vulnerabilities.
- `npm run build`: passed with Vite 8.3.1. Vite reports a non-failing bundle-size warning for the Three.js chunk.
- Browser runtime check: passed in Chromium at desktop and mobile sizes; the scene reported a `200 × 200` grid, controls and camera presets responded, and no page or console errors were observed.
- Known limitations: a WebGL-capable browser is required. No human intervention is required for local use.
- Verification note: the first `npm ci` attempt hit a Windows `EPERM` because the dev server still held Vite's native binding; after stopping the server, a clean `npm ci` completed successfully.

The dev server used for verification was stopped before delivery.
