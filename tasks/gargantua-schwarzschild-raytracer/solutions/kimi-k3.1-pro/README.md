# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen React + Three.js raytracer. Every visible black-hole, accretion-disk, star, galaxy, and lensing feature is evaluated per pixel by a custom fragment shader. The only Three.js geometry is the fullscreen quad used by the render and post-processing passes.

## Requirements

- Node.js 22.12+ (Node.js 24 was used for verification)
- A browser with WebGL 2 and half-float render-target support
- No backend, account, API key, CDN, or runtime network service

## Install and run

From this `solution/` directory:

```bash
# Install the locked dependency graph (use npm ci for a clean installation)
npm install

# Development server, bound to loopback only
npm run dev -- --port 5173
# Open http://127.0.0.1:5173/

# Production build into dist/
npm run build

# Serve the production build through Vite's static preview server
npm run preview -- --port 4173
# Open http://127.0.0.1:4173/
```

If a requested port is occupied, use the URL printed by Vite. The generated `dist/` directory can also be hosted by any ordinary static file server. Once installed and built, the application itself needs no network access beyond same-origin static files.

## Rendering model

The integrator uses geometrized units with `G = c = 1` and Schwarzschild radius `rₛ = 2M = 1`. For a null geodesic in its orbital plane, `u = 1/r` satisfies:

```text
d²u/dφ² + u = (3/2) rₛu²
```

The shader integrates the equivalent Cartesian state `x, v` using adaptive RK4:

```text
dx/dλ = v
dv/dλ = -(3/2) rₛ |x × v|² x / |x|⁵
```

The initial local-static-observer ray is converted to a Schwarzschild coordinate direction. Integration stops at the event horizon, on outward escape, or at the selected quality budget. The finite accretion slab is clipped against each curved integration segment. Emission and absorption are composited front-to-back along the path, retaining primary and higher-order crossings.

Disk radiance includes an approximate Planckian temperature spectrum, radial temperature falloff, animated advected turbulence, gravitational redshift, local circular-orbit Doppler shift, and relativistic beaming. Stars and the galactic band are procedural functions of the escaped, lensed direction—not textures.

The post chain is half-float HDR → soft-threshold bright extraction → separable Gaussian bloom → exposure/ACES → restrained dispersion, vignette, and deterministic film grain.

## Controls

- Drag / touch-drag: orbit; wheel / pinch: zoom
- `Shift+1` … `Shift+4`: Gargantua, Photon orbit, Polar sentinel, Eventide
- `0` … `9`: final image and nine distinct diagnostic outputs
- `Space`: play/pause the 120-second cinematic camera loop
- `Q`: cycle Standard / High / Cinematic
- `H`: hide/show HUD; the console also has a separate collapse control
- `R`: reset all state; **RESET ALL** is the visible equivalent

The console contains 21 live parameter controls in Camera, Accretion, Celestial, and Optics groups. Camera interaction stops the cinematic loop and leaves the user in control. Narrow screens receive a wider effective lens to keep the critical shadow readable.

Quality profiles change actual render budgets:

| Profile | Internal scale | DPR cap | Max RK4 steps | Disk regions | Bloom passes |
| --- | ---: | ---: | ---: | ---: | ---: |
| Standard | 0.62 | 1.25 | 112 | 3 | 2 |
| High | 0.82 | 1.5 | 160 | 4 | 3 |
| Cinematic | 1.00 | 2.0 | 224 | 4 | 5 |

All console state is stored in the version-1 envelope at `localStorage["gargantua.schwarzschild.console"]`. Capture mode intentionally starts from defaults and does not overwrite saved preferences.

## Deterministic capture and API

Example:

```text
http://127.0.0.1:4173/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

`capture=1` freezes simulation and camera time, disables optional non-determinism, and prevents preference writes. Accepted query values are `quality=standard|high|cinematic`, integer `preset=0..3`, integer `debug=0..9`, `hud=0|1`, and finite nonnegative `time`. Invalid values fall back safely to defaults.

After shader compilation, URL application, and the first complete render:

```js
document.documentElement.dataset.gargantuaReady === 'true';
window.__GARGANTUA__.ready;          // read-only boolean
window.__GARGANTUA__.getState();     // detached serializable snapshot
window.__GARGANTUA__.setQuality('high');
window.__GARGANTUA__.setPreset(2);
window.__GARGANTUA__.setDebug(0);
window.__GARGANTUA__.setTime(12.5);
```

Valid setters return a fresh state snapshot. Invalid values return `null` without throwing.

## Resilience and local assets

On `webglcontextlost`, animation pauses and a recoverable status panel appears. On restoration, old GPU handles are abandoned, HDR targets are recreated, materials are recompiled, persisted state is reapplied, and rendering resumes without reloading the page.

Three.js r180 and OrbitControls are imported from `vendor/`; see `vendor/README.md` and `vendor/THREE-LICENSE.txt`. `node_modules/` is not used as a vendored runtime asset. No audio is implemented, so there is no autoplay behavior.

## Known limits

This is a finite-budget real-time numerical renderer, not a spectral radiative-transfer solver. Extremely near-critical rays can exhaust the selected step budget; diagnostic view 1 exposes those pixels, and Cinematic provides the largest budget. The monochrome Schwarzschild spacetime assumes a non-spinning black hole and an idealized geometrically thin, emitting/absorbing disk.

See `RESULTS.md` for the exact verification evidence and environment.
