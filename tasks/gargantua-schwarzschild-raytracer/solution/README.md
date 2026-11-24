# GARGANTUA — Schwarzschild Black Hole Raytracer

Full-screen real-time relativistic black hole raytracer built with **React**, **Vite**, **ES Modules**, and a locally vendored **Three.js (`0.174.0`)** ESM build. Every pixel numerically integrates null geodesics in Schwarzschild spacetime inside a custom full-screen WebGL2 Fragment Shader—producing the event horizon shadow, critical capture boundary, photon ring, curved-path multiple accretion disk crossings, relativistic Doppler beaming and gravitational redshift, animated Keplerian turbulence, and a procedurally generated gravitationally lensed starfield and Milky Way.

All assets, shaders, procedural audio, and Three.js modules are 100% local. No backend, API keys, CDN links, or remote files are required at runtime.

## Prerequisites

- Node.js `>= 18` and npm `>= 9`

## Commands

Run all commands inside `tasks/gargantua-schwarzschild-raytracer/solution/`:

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

```bash
npm run dev
```

Starts the Vite dev server (default `http://localhost:5173`).

### 3. Production Build

```bash
npm run build
```

Vite's `--base` and `--outDir` CLI flags are supported directly for subpath or custom output directory builds:

```bash
npm run build -- --base /gargantua/ --outDir dist-subpath
```

### 4. Static Preview Server

Serve the built `dist/` bundle locally via Vite's static preview server:

```bash
npm run preview
```

This serves `dist/` at `http://127.0.0.1:4173/`. You may also serve `dist/` with any static HTTP server (e.g. `npx serve dist` or Python's `http.server`).

## Interactive Controls & Shortcuts

- **Mouse / Touch:** Drag to orbit (`OrbitControls`), scroll wheel or pinch to zoom. Manual interaction smoothly pauses the cinematic camera loop without losing control.
- **`0`–`9`:** Switch between final composite (`0`) and 9 live diagnostic debug views (`1`–`9`).
- **`Shift + 1`–`4`:** Switch between the 4 camera presets (*Gargantua Hero*, *Photon Ring Grazing*, *Polar Vortex*, *Einstein Wide Field*).
- **`Space`:** Play / pause the cinematic camera orbit loop.
- **`H`:** Show / hide the full HUD.
- **`Q`:** Cycle rendering quality (`Standard` → `High` → `Cinematic`).
- **`R`:** Reset all 21 parameters, quality, preset, debug mode, and persisted `localStorage` state to defaults.
- **`M`:** Toggle optional 100% procedural Web Audio deep-space ambient drone (muted by default).

## Deterministic Capture URL & Automation Interface

Example reproducible capture URL:

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1`: Disables the cinematic loop, freezes simulation time at `time` (finite non-negative seconds, default `0`), and disables optional audio before the first capture-ready frame.
- `quality`: `standard` | `high` | `cinematic` (invalid values fall back to `high`).
- `preset`: integer `0`–`3` (invalid values fall back to `0`).
- `debug`: integer `0`–`9` (invalid values fall back to `0`).
- `hud`: `0` (hidden) | `1` (visible).
- Once shader compilation, URL state application, and initial rendering complete, `document.documentElement.dataset.gargantuaReady` is set to `"true"`, and `window.__GARGANTUA__` exposes:
  - `ready` (read-only boolean)
  - `getState()`
  - `setQuality(level)`
  - `setPreset(index)`
  - `setDebug(index)`
  - `setTime(seconds)`
  - `setHud(visible)`

## Architecture Overview

- `vendor/three/`: Locally vendored `three@0.174.0` ESM build (`three.module.js`, `three.core.js`) and `OrbitControls.js` addon (see [`vendor/README.md`](vendor/README.md)).
- `src/shaders/schwarzschild.glsl.js`: Full-screen GLSL3 Schwarzschild null-geodesic RK4 raytracer, Hermite-refined multi-crossing volumetric accretion disk radiative transfer, Doppler/gravitational shift, procedural starfield & Milky Way, and 10 diagnostic debug views.
- `src/shaders/postprocess.glsl.js`: Soft-knee Karis HDR Bloom prefilter, 13-tap downsample, 9-tap tent upsample, and ACES filmic composite with subtle chromatic aberration, vignette, and deterministic film grain.
- `src/engine/GargantuaEngine.js`: Three.js pipeline, `OrbitControls` uniform bridge, quality-budget scaling, resize/DPR handling, and `webglcontextlost`/`webglcontextrestored` resource rebuild.
- `src/state/storage.js` & `src/state/urlContract.js`: Versioned `localStorage` persistence (`version: 1`) and strict URL contract parser.
