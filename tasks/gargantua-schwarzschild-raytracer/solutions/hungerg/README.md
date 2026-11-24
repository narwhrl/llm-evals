# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen React + Vite experience that renders a Schwarzschild black hole, accretion disk, photon ring, lensed star field, and Milky Way with a local Three.js fragment shader. There is no backend, account, API key, CDN, remote texture, or runtime network dependency.

## Run

From this directory:

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

## Production build and static preview

```bash
npm run build
npm run preview
```

`dist/` is a static site and can also be served by any static file server. The built page uses relative asset URLs.

## Controls

- Drag to orbit, scroll or pinch to zoom.
- `0`–`9`: switch diagnostic views.
- `Shift+1`–`Shift+4`: select a viewpoint.
- `Space`: play or pause the cinematic camera.
- `H`: show or hide the HUD.
- `R`: reset all controls.
- `Q`: cycle `Standard`, `High`, and `Cinematic` quality.

The HUD exposes four viewpoints, three quality levels, ten diagnostic views, and 21 live parameters. Quality changes the internal render scale, device-pixel-ratio cap, geodesic step budget, bloom resolution, and blur sample count. Settings are versioned in `localStorage` under `gargantua.state.v1`.

## Deterministic capture

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

Capture mode freezes simulation time and the cinematic camera before the first frame. Invalid URL values fall back safely. When shader compilation and the first rendered frame succeed, the page sets:

```js
document.documentElement.dataset.gargantuaReady === "true"
```

and exposes `window.__GARGANTUA__` with `ready`, `getState()`, `getDiagnostics()`, `setQuality(level)`, `setPreset(index)`, `setDebug(index)`, and `setTime(seconds)`.

## Rendering model

The visible scene is produced entirely by the full-screen fragment shader in `src/shaders.js`. It numerically integrates Schwarzschild null geodesics in the orbital plane using Binet's equation:

```text
u'' + u = (3/2) r_s u²,  u = 1/r,  r_s = 1
```

Adaptive RK4 steps advance the ray in azimuth. The event horizon is a hard termination boundary; escaping rays sample a procedural, gravitationally lensed sky. Disk crossings are detected along the integrated curved path and composited in path order, including higher-order images. Disk emission includes gravitational redshift, orbital Doppler shifting, a temperature gradient, and animated procedural turbulence.

HDR radiance is stored in half-float render targets, thresholded and blurred for bloom, then combined with exposure, ACES tone mapping, vignette, film grain, and slight chromatic dispersion.

## Offline Three.js

`vendor/` contains the exact Three.js `0.170.0` ESM build and `OrbitControls` addon imported by the source. See `vendor/README.md` for provenance and license. `node_modules/` is not vendored or committed.

## Verification

See `RESULTS.md` for the commands, browser environment, visual checks, deterministic capture hash, and WebGL context-recovery results actually observed.
