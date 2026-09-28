# GARGANTUA — Schwarzschild Black Hole Raytracer

React + Vite + ES Modules + **locally vendored** Three.js (r170). A fullscreen custom fragment shader numerically integrates Schwarzschild null geodesics (geometric units `rs = 1`, photon sphere at `r = 1.5`) and composites accretion-disk crossings, a procedural lensed starfield/galaxy, HDR bloom, and ACES tonemapping.

## Requirements

- Node.js 18+ (tested with 20.x)
- npm 9+

## Install

```bash
cd tasks/gargantua-schwarzschild-raytracer/solution
npm ci --no-audit --no-fund
```

If `npm ci` is unavailable in your environment, use:

```bash
npm install --no-audit --no-fund
```

## Development

```bash
npm run dev
```

Open the printed local URL (default `http://127.0.0.1:5173/`).

## Production build

```bash
npm run build
```

Gallery / deploy build (example):

```bash
npm run build -- --base=/gargantua-schwarzschild-raytracer/grok-bot/ --outDir=../../../deploy/public/gargantua-schwarzschild-raytracer/grok-bot --emptyOutDir
```

## Static preview

```bash
npm run build
npm run preview
```

Then visit `http://127.0.0.1:4173/`.

Capture automation example:

```text
http://127.0.0.1:4173/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

Ready signal: `document.documentElement.dataset.gargantuaReady === "true"`.  
API: `window.__GARGANTUA__` (`ready`, `getState`, `setQuality`, `setPreset`, `setDebug`, `setTime`).

## Vendor

See [`vendor/README.md`](vendor/README.md). Runtime imports resolve only under `vendor/` (Three.js ESM + OrbitControls). No CDN assets.

## Physics notes

- Chart: Schwarzschild geometric units with event horizon `r = rs = 1`, mass `M = 0.5`.
- Null geodesic state `(x, v)` with angular momentum `h = x × v` and acceleration `dv/dλ = −(3/2)|h|² x / |x|⁵` (standard real-time Schwarzschild null reduction).
- Disk: ordered equatorial crossings accumulate primary + higher-order images with gravitational redshift, orbital Doppler beaming, temperature gradient, and animated FBM turbulence.
- Background: hash/FBM procedural stars + galactic band, sampled on the **deflected** escape direction (no cubemaps/HDRI/images).

## Controls

| Input | Action |
|-------|--------|
| Drag / touch | OrbitControls |
| Wheel / pinch | Zoom |
| Space | Cinematic camera play/pause |
| H | HUD toggle |
| R | Reset (clears localStorage) |
| Q | Cycle quality Standard → High → Cinematic |
| 0–9 | Debug views |
| Shift+1…4 | Named view presets |

Parameters (≥21) persist to `localStorage` key `gargantua.schwarzschild.v1`.
