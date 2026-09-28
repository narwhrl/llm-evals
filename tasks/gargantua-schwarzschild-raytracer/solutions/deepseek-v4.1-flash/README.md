# GARGANTUA — Schwarzschild Black Hole Raytracer

A real-time full-screen fragment shader black hole: the image is produced by numerically integrating null
geodesics of the Schwarzschild metric per pixel, in the browser, with React + Vite and a locally
vendored Three.js.

Everything visible — event horizon, photon ring, accretion disk (including its higher-order images),
lensed starfield and galaxy — is evaluated inside one full-screen fragment shader. Three.js supplies
the renderer, the HDR render targets and `OrbitControls`; it never supplies the scene.

## Requirements

- Node.js 20+ (verified on v24.21.0, npm 11.19.0)
- A WebGL 2 browser. `EXT_color_buffer_float` is used for the HDR render target; when it is missing
  the renderer falls back to 8-bit targets and still renders.

## Commands

```bash
npm install          # installs React, Vite and the build-time three@0.180.0 used by `npm run vendor`
npm run dev          # Vite dev server (defaults to http://localhost:5173/)
npm run build        # production build into dist/
npm run preview      # serves the built dist/ on http://localhost:4173/ (strict port)
npm run vendor       # regenerates vendor/ from node_modules/three and rewrites vendor/README.md
```

`npm run preview` is the path used for the acceptance run recorded in `RESULTS.md`: build first, then
serve `dist/` statically. No dev server is required, and nothing at runtime reaches the network.

## Layout

```
index.html               boot shell + first-paint placeholder
vite.config.js           aliases `three` and `three/addons/*` at vendor/ (never node_modules)
scripts/sync-vendor.mjs  vendor/ regenerator, writes the SHA-256 table in vendor/README.md
vendor/                  the committed Three.js ESM build graph + OrbitControls + MIT licence
src/
  main.jsx               React entry (no StrictMode: a second mount would create a second WebGL context)
  App.jsx                wires store ↔ Engine ↔ HUD, bootstrap/context-loss/no-WebGL overlays, resize
  state/schema.js        ranges, quality tiers, presets, debug views, shortcuts, clamping
  state/store.js         subscription store; the only writer of persisted state
  state/persistence.js   versioned localStorage (key `gargantua.state.v1`)
  state/urlParams.js     the `?capture=1&quality=…` query contract with safe fallback
  publicApi.js           `window.__GARGANTUA__`
  render/Engine.js       renderer, HDR targets, bloom chain, orbit camera, context loss/restore
  render/FullscreenPass.js
  shaders/               noise / blackbody / geodesic / disk / sky / scene / post GLSL modules
  ui/                    HUD, control panel, sliders, shortcut handler, procedural audio
```

## Physics and coordinates

Units are geometric: the Schwarzschild radius is `r_s = 1`, so `M = 0.5`, the horizon is at
`r_h = 1`, the photon sphere at `r_ph = 1.5`, the ISCO at `r_isco = 3`, and the critical impact
parameter is `b_crit = 3√3·M = 2.59807621`.

Each pixel builds an observer ray from the real `PerspectiveCamera` (position, quaternion, FOV,
aspect), then integrates the Binet form of the null geodesic equation in the orbital plane spanned by
the camera position and that ray:

```
u = 1/r          u'' = -u + 3·M·u²        stepped in φ with classical RK4
```

with `u(0) = 1/r_0`, `u'(0) = -dot(direction, e1) / b`, `b = r_0·|perp|`. The in-plane basis is
`e1 = normalize(cameraPos)`, `e2 = normalize(direction - dot(direction, e1)·e1)`, so `φ` increases
monotonically along the ray. The step length is adaptive,
`clamp(min(mix(0.022, 0.20, smoothstep(1.5, 7, r)) · stepScale, 0.35·max(u,ε)/max(|u'|,ε)), 0.0015, 0.45)`,
and is additionally limited so that `u` can never cross zero inside one step — before that limit
existed, escaping rays wrapped onto the non-physical branch of the ODE and came back as false horizon
hits, painting faint black arcs across the sky.

A ray terminates on (1) `r ≤ r_h`, (2) `r ≥ 400` while receding, or (3) the step budget, and each
pixel records the count and the reason so the debug views can show them.

The disk is intersected along the *integrated* path, not as a plane mesh: the shader isolates sign
changes of the orbital-plane height `y(φ)` between step endpoints, refines them by Newton iteration
on the Hermite cubic through `(u, u')`, and falls back to full cubic critical-point isolation when a
thin disk is crossed twice inside one step. Up to `maxCrossings` roots are kept **in path order**, so
first- and second-order images (the far side of the disk bent over the shadow, and the thin arc under
it) are separate composited samples with their own absorption weight
`(1 − exp(−τ)) / (1 − exp(−κ·H_ref))`.

Disk emission uses a Shakura–Sunyaev profile, a blackbody colour at the local Doppler- and
gravitationally-shifted temperature, and emissive turbulence that is advected by the local Keplerian
angular velocity, so the disk is sheared by its own differential rotation. The sky is procedural:
procedural star placement with per-star temperature and a banded galaxy, both sampled through the
escaped-ray direction, i.e. after lensing.

Post-processing is an HDR chain: bright pass → 13-tap downsample → 9-tap additive tent upsample into a
mip chain, then a composite pass doing chromatic aberration → exposure → ACES (Hill RRT+ODT fit) →
vignette → film grain → dither → sRGB. Debug views `1`–`9` bypass every lens effect.

## URL capture contract

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

| Parameter | Accepted | Notes |
|---|---|---|
| `capture` | `1` | freezes time, stops the cinematic loop, disables audio |
| `quality` | `standard` \| `high` \| `cinematic` | anything else falls back to `standard` |
| `preset` | integer `0`–`3` | |
| `debug` | integer `0`–`9` | |
| `time` | finite number ≥ 0, seconds | default `0`; non-finite or negative values are rejected |
| `hud` | `0` \| `1` | |

Rejected values never throw and never black-screen: they are recorded as `rejectedQuery` in
`getState()` and the default is used. Once the shader has compiled and the first frame is presented,
`document.documentElement.dataset.gargantuaReady = "true"` is set and `window.__GARGANTUA__` exposes
`ready`, `getState()`, `setQuality(level)`, `setPreset(index)`, `setDebug(index)` and
`setTime(seconds)`. Each setter validates its argument, returns the updated state, and returns the
unchanged state (with `lastCommand.rejected`) for invalid input instead of throwing.

## Controls

| Keys | Action |
|---|---|
| `0` – `9` | debug view (HUD shows the number and meaning) |
| `Shift + 1` – `4` | camera preset |
| `Space` | play / pause the cinematic camera loop |
| `H` | show / hide HUD |
| `R` | reset all parameters |
| `Q` | cycle quality tier |
| `M` | ambient audio (procedural, started only after a user gesture) |

Dragging orbits, the wheel and pinch zoom, and both write the real camera parameters back into the
store, so the lensed view, the persisted state and the sliders stay in agreement. The cinematic loop
yields permanently to manual control after the first drag.

## Parameters

21 required controls plus `diskOpacity`, which the emission-absorption compositing needs to be
controllable: FOV, camera distance / azimuth / elevation, time scale, disk inner and outer radius,
half-thickness, temperature, emission, opacity, orbital speed scale, turbulence amplitude and speed,
star density, galaxy brightness, bloom strength and threshold, exposure, vignette, film grain and
chromatic aberration. All state — parameters, quality tier, preset, HUD visibility and debug view —
is versioned into `localStorage` under `gargantua.state.v1`, and the HUD's **Reset all** button (or
`R`) restores every default.

## Quality tiers

| | Standard | High | Cinematic |
|---|---|---|---|
| internal render scale | 0.75 | 1.0 | 1.4 |
| max RK4 steps / ray | 200 | 360 | 620 |
| RK4 step scale | 1.7 | 1.0 | 0.62 |
| max disk crossings / ray | 3 | 5 | 6 |
| bloom mip levels | 3 | 5 | 6 |
| devicePixelRatio cap | 1.25 | 1.75 | 2.0 |

Tiers change the actual GPU work, not just the label.

## Licence

Three.js is MIT-licensed; the full text is at `vendor/LICENSE.three`.
