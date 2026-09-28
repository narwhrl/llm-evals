# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen React/Vite site. Three.js renders one full-screen triangle; its fragment shader numerically traces Schwarzschild null geodesics in isotropic coordinates and evaluates the disk, lensed procedural sky, and critical structure along those rays. It needs no backend or runtime network assets.

## Requirements and commands

Use Node.js 20.19+ (tested with Node.js 24.21.0) and npm. From this `solution/` directory:

```bash
npm install
npm run dev
```

For a reproducible install from the lockfile, use `npm ci` instead of `npm install`. To build and serve the actual static output:

```bash
npm run build
npm run preview -- --port 44123 --strictPort
```

Open `http://127.0.0.1:44123/`. Stop the preview server with `Ctrl+C`. The build can also be hosted on any static server; no SPA routing fallback is needed. Vite's `--base` option supports deployment under a path prefix.

## Controls

- Drag or touch to orbit; scroll or pinch to zoom. Direct camera input pauses the cinematic orbit.
- `Shift+1`–`Shift+4` select camera presets; `0`–`9` select final/diagnostic views.
- `Space` plays or pauses cinematic motion; `H` hides or shows HUD; `R` restores defaults; `Q` cycles Standard, High, and Cinematic.
- The HUD contains 21 labeled camera, time, disk, background, and post-processing sliders. On a narrow screen, use **Open controls** for the drawer. Portrait presets widen the view while keeping the actual camera values visible in the sliders.
- The diagnostic panel offers **Test WebGL recovery** when the browser exposes `WEBGL_lose_context`; it briefly loses and restores the context through the same recovery path used for an unexpected loss.

The `gargantua:state:v1` localStorage entry keeps configurable settings. Reset clears previous settings and restores the defaults. If storage is unavailable, the app remains usable without persistence.

## Reproducible capture

For example:

```text
http://127.0.0.1:44123/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

`capture=1` ignores persisted settings, stops camera/time advancement, and freezes the procedural scene at `time` seconds (default 0). `quality` accepts `standard`, `high`, or `cinematic`; `preset` accepts `0`–`3`; `debug` accepts `0`–`9`; `hud` accepts `0` or `1`. Invalid values fall back to defaults. Capture changes are not saved.

After shader compilation and the first rendered frame, `<html>` has `data-gargantua-ready="true"`. `window.__GARGANTUA__` exposes read-only `ready`, `getState()`, `setQuality(level)`, `setPreset(index)`, `setDebug(index)`, and `setTime(seconds)`. Valid setters return a state snapshot; invalid inputs return `{ ok: false, error }`.

## Rendering notes

With (M=1), the isotropic radius is `ρ`, the horizon is at `ρ=0.5`, and the photon sphere is at approximately `ρ=1.866`. The shader integrates `X'=v` and `v'=∇ln(n)−v(v·∇ln(n))`, with `n=(1+1/(2ρ))³/(1−1/(2ρ))`, using a normalized midpoint step. The horizon, escaping sky, and step budget have separate termination diagnostics. The finite-thickness disk is sampled along each curved segment, including repeated crossings, and front-to-back transmittance preserves visible secondary images. Circular orbital speed, gravitational lapse, and the local ray direction determine Doppler and gravitational frequency shifts.

The scene is rendered to an HDR target, blurred into multiple Bloom levels, and mapped to the display with an ACES curve. A packed RGBM target preserves range on devices without half-float color-buffer support. The procedural star and galaxy fields are sampled from the ray's escaped direction, not an environment map. All Three.js runtime source is local under `vendor/`.
