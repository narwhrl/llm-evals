# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, interactive black-hole renderer. Every visible phenomenon — the
event-horizon shadow, photon ring, primary and higher-order accretion-disk
images, Doppler beaming, gravitational redshift, and the gravitationally lensed
procedural starfield — is evaluated per pixel by one custom full-screen
fragment shader that numerically integrates Schwarzschild null geodesics.

React + Vite (ES Modules) drive the UI; a locally vendored Three.js ESM build
provides `WebGLRenderer`, render targets, the camera, and `OrbitControls`. The
Three.js geometry used by the renderer is only the full-screen quad.

## Requirements

- Node.js `^20.19.0 || >=22.12.0` (Vite 7 requirement), npm 11.
- A browser with WebGL2. `EXT_color_buffer_float` is used for HDR half-float
  render targets; without it the pipeline falls back to LDR targets and reports
  the limitation in `window.__GARGANTUA__.getState().hdr`.
- No backend, account, API key, CDN, remote texture, remote font, or network
  access at runtime.

## Commands

```bash
npm install                       # install pinned dependencies (writes/uses package-lock.json)
npm run dev                       # Vite dev server: http://127.0.0.1:5173/
npm run build                     # production build -> dist/
npm run serve                     # static server for dist/: http://127.0.0.1:4173/
npm run preview                   # alternative static preview via Vite: http://127.0.0.1:4173/
npm run lint                      # ESLint flat config over src/ and scripts/
npm run check                     # static integrity checks (packaging, shader, wiring)
npm run verify                    # headless Chrome acceptance run (build + serve first)
npm run vendor                    # regenerate vendor/ from the pinned three@0.180.0
```

`npm run serve` is a dependency-free `node:http` static server
(`scripts/serve.mjs`). It accepts `--dir`, `--port`, and `--host`. Any static
file server works as long as it serves `dist/` with correct MIME types; the
build uses relative asset paths (`base: './'`).

`npm run verify` needs a local Chrome/Chromium. Set `CHROME_BIN` to override
the default Windows path, and `GARGANTUA_PORT` to change the test port. It
starts and stops its own static server and closes every browser page.

## Physics and rendering

- **Coordinates.** Schwarzschild areal radius `r` in units of `r_s = 2M = 1`,
  expressed in a Cartesian-like embedding frame. The equatorial disk is `y = 0`.
- **Null geodesics.** The exact orbit (Binet) equation
  `d²u/dφ² + u = 3M u²` (`u = 1/r`) is rewritten as the spatial ODE
  `d²p/dλ² = -1.5 r_s h² p / r⁵` with conserved `h² = |p₀ × v₀|²`.
  State `(p, v)` is advanced with **RK4** and an adaptive spatial step
  `ds ≈ 0.062 · r · stepScale`. Termination: `r ≤ 1.002 r_s` (horizon capture,
  no interior emission), `r > 90 r_s` with outward motion (background sample),
  or the per-quality step budget.
- **Disk.** Each integration segment that spends time inside the emitting slab
  `|y| ≤ halfThickness` is integrated with 2–4 sub-samples (quality tier).
  Crossings are accumulated **in path order** with transmittance, producing the
  primary image plus secondary/higher-order rings. Emission includes a
  `T(r) ∝ r^(-3/4)` blackbody colour ramp, `g⁴` intensity boost from
  `g = sqrt(1 - r_s/r) / (γ(1 - β·n̂))`, an animated co-rotating fBm density
  field, spiral arms, and a Gaussian vertical profile.
- **Background.** Multi-scale procedural stars and a dusty Milky Way band are
  sampled from the **deflected** escape direction. No image, cubemap, video,
  screenshot, or environment texture is used.
- **Photon ring.** Near-critical rays accumulate path length while
  `1.28 < r < 1.85`; the resulting `r_min`-weighted emission forms the thin
  bright critical ring without a baked lookup texture.
- **Post-processing.** Half-float HDR target → soft-knee bright pass →
  separable Gaussian bloom pyramid (1–3 levels by quality) → composite with
  exposure, ACES filmic tone mapping (Narkowicz fit), explicit sRGB encode,
  restrained vignette, deterministic film grain, and radial chromatic
  aberration.

## Camera, HUD and state

`OrbitControls` drives a real `PerspectiveCamera`; its position, basis vectors
and `tan(FOV/2)` are fed to the shader as ray inputs. Drag, wheel/pinch zoom
and touch all change the lens view. A pausable cinematic camera loop orbits the
current view; any manual camera control pauses it until `Space` resumes it.

Four presets (`Shift+1`…`Shift+4`), three quality tiers (`Q`), ten debug views
(`0`…`9`), HUD toggle (`H`), reset (`R`), and optional procedural ambience
(`M`, off by default, never autoplays) are available. The collapsible HUD is a
right-side panel on desktop and a bottom drawer on mobile.

Twenty-one controls affect real shader uniforms or camera state. All
configurable state (parameters, quality, preset, debug, HUD, cinematic flag,
time) is versioned in `localStorage` under `gargantua.state.v3` and is
validated/clamped on load. `R` or the visible reset button clears it.

Quality tiers genuinely change the rendering budget: internal render scale,
DPR cap, maximum geodesic steps, disk sub-samples, bloom pyramid levels, and
blur radius. `getState().qualityBudget` exposes the active numbers.

`webglcontextlost` pauses the loop and shows a recoverable overlay;
`webglcontextrestored` rebuilds materials, render targets and geometry,
reloads persisted state, and resumes rendering — no page reload.

## URL capture contract

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

| Parameter | Accepted | Default when absent / invalid |
| --- | --- | --- |
| `capture` | `1` | off |
| `quality` | `standard`, `high`, `cinematic` | `high` |
| `preset` | integer `0`–`3` | `0` |
| `debug` | integer `0`–`9` | `0` |
| `hud` | `0` or `1` | `1` on desktop, `0` on mobile |
| `time` | finite non-negative seconds | `0` |

`capture=1` freezes simulation time at `time`, disables the cinematic loop,
non-deterministic advance and optional audio, and renders only when state
changes. After shader compilation, the first render and URL state application,
`document.documentElement.dataset.gargantuaReady = "true"` and
`window.__GARGANTUA__` exposes read-only `ready`, `getState()`,
`setQuality(level)`, `setPreset(index)`, `setDebug(index)` and
`setTime(seconds)`. Setters validate input and return the updated state or a
rejection; they never throw. Extra diagnostics: `setParam`, `setHud`, `reset`,
`cycleQuality`, `toggleCinematic`, `sampleFrame`, `simulateContextLoss`,
`restoreContextNow`.

## Debug views

`0` final composite · `1` ray steps / termination · `2` horizon mask +
critical band · `3` dominant disk-crossing order · `4` redshift / Doppler `g` ·
`5` lensed sky coordinates · `6` stars / galaxy only · `7` pre-post HDR
luminance · `8` total deflection · `9` minimum radius / photon sphere.

## Vendored dependency

`vendor/three.module.js`, `vendor/three.core.js` and
`vendor/OrbitControls.js` come from `three@0.180.0` (MIT). See
[`vendor/README.md`](vendor/README.md) for provenance and the one import
rewrite. `node_modules/` is never used as vendor.

## Known limitations

- The integrator traces the exact spatial curve of Schwarzschild null
  geodesics; `λ` is a path parameter, not a physical affine parameter, and the
  disk is an optically thin emissive slab rather than a radiative-transfer
  solution.
- Bloom uses a small fixed Gaussian pyramid; very high bloom intensity can
  soften the photon ring (keep the default range for the intended look).
- Optional ambience is generated with WebAudio on an explicit user gesture. It
  is disabled in capture mode and in browsers without WebAudio.
