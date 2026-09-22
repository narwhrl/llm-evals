# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, real-time black hole renderer. Every pixel of the image is produced by
numerically integrating a Schwarzschild null geodesic inside one custom fragment shader:
the black-hole shadow, the photon ring, the lensed accretion disk (primary **and** higher-order
images), the gravitational redshift and Doppler beaming, the procedural starfield and the
Milky Way that is bent around the hole are all consequences of that integration — there is no
black sphere, no disk mesh, no texture, no cubemap and no video anywhere in the project.

React + Vite + a locally vendored Three.js ESM build. No backend, no accounts, no runtime
network access: serve `dist/` from any static file server and the scene works offline.

---

## Requirements

- Node.js ≥ 20 (developed and verified on Node 24.21.0 / npm 11.19.0)
- Any WebGL2-capable browser (verified on Chrome 153)
- Nothing else. Three.js is vendored in `vendor/` (see below), so no CDN, no remote fonts,
  no remote images or audio are ever requested.

## Commands

```bash
npm install      # installs the locked dev/build toolchain (vite, @vitejs/plugin-react, react)
npm run dev      # Vite dev server, http://localhost:5173/
npm run build    # production build into dist/
npm run preview  # serves the built dist/ (http://localhost:4173/ by default)
```

Any static file server works for the built output, for example:

```bash
npx serve dist
```

`package-lock.json` pins the toolchain; `three` stays in `package.json` only to document and
lock the provenance of the vendored copy (application code never resolves `node_modules/three`
at build or runtime — see [Vendor](#vendor)).

## URL capture contract

The site supports a stable, same-origin query contract so that screenshots can be produced
deterministically without any human interaction:

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

| Key | Accepted values | Behaviour |
| --- | --- | --- |
| `capture` | `0` \| `1` | `1` freezes the simulation clock at `time`, disables the cinematic loop and hands camera control to the client, so successive frames are identical |
| `quality` | `standard` \| `high` \| `cinematic` | Selects the quality tier |
| `preset` | integer `0`–`3` | Applies a camera preset (pose + FOV) before the first frame |
| `debug` | integer `0`–`9` | Selects a diagnostic view |
| `time` | finite non-negative seconds | Frozen simulation time in capture mode (`0` when absent) |
| `hud` | `0` \| `1` | `0` renders **no** overlay at all, so captures are free of UI pixels |

Invalid values never throw and never black-screen: each one falls back to its documented
default (`quality=high`, `preset=0`, `debug=0`, `hud=1`, `time=0`). Integer parsing rejects
`0x3`, `3abc`, `1.5`, `+7`, ` 7` and out-of-range numbers. Parsing happens exactly once,
before the WebGL renderer exists, and outranks any value restored from `localStorage`.

Examples:

```text
http://localhost:4173/?capture=1&quality=cinematic&preset=3&debug=0&time=42&hud=0
http://localhost:4173/?capture=1&quality=high&preset=1&debug=9&time=12.5&hud=0
http://localhost:4173/?capture=1&quality=nope&preset=9&debug=abc&hud=7&time=-3   # → all defaults
```

### Ready signal and automation interface

After the shader has compiled, the first composed frame has been drawn without a GL error and
the URL state has been applied, the page sets:

```js
document.documentElement.dataset.gargantuaReady === 'true'
```

`window.__GARGANTUA__` is installed early (with `ready === false`) and exposes:

| Member | Behaviour |
| --- | --- |
| `ready` | read-only boolean; only becomes `true` once the shader actually compiled and rendered |
| `getState()` | frozen snapshot: `{ quality, preset, debug, hud, time, cinemaPlaying, userHasTakenControl, contextLost, capture, params }` |
| `setQuality(level)` | `'standard' \| 'high' \| 'cinematic'` (case-insensitive); returns the new snapshot, `null` if invalid |
| `setPreset(index)` | integer `0`–`3`; applies the pose; returns the snapshot or `null` |
| `setDebug(index)` | integer `0`–`9`; returns the snapshot or `null` |
| `setTime(seconds)` | finite number ≥ 0; returns the snapshot or `null` |
| `setCinema(playing)` | boolean; returns the snapshot or `null` |
| `whenReady(ms)` | promise resolving `true`/`false` instead of polling the flag |

No method ever throws: invalid input returns `null`, and every body is wrapped so an internal
failure is logged and reported rather than propagated.

## Controls

### Keyboard

| Keys | Action |
| --- | --- |
| `0` – `9` | Debug views (see below) |
| `Shift` + `1` – `4` | Camera presets |
| `Space` | Play / pause the cinematic camera loop |
| `H` | Show / hide the whole HUD |
| `R` | Reset everything (all 21 parameters, quality, preset, debug, HUD, stored state) |
| `Q` | Cycle quality tier |

Keys are ignored while focus is inside an input or text area. No audio is implemented
(so there is no `M` shortcut and no autoplay risk).

### Camera presets

| # | Name | Pose | Intent |
| --- | --- | --- | --- |
| 1 | Equatorial Vista | az 0.65, el 0.28, d 24, fov 55° | Textbook view: front and back disk plus a strongly lensed sky |
| 2 | Photon Ring Edge | az 1.9, el 0.045, d 12, fov 45° | Near edge-on; secondary and higher-order arcs stack up around the ring |
| 3 | Deep Field | az 4.2, el 0.45, d 55, fov 62° | Distant wide shot; the system floating in a lensed starfield |
| 4 | Polar Crown | az 5.4, el 1.15, d 20, fov 50° | High inclination; the disk reads as a ring with a lensed underside |

Presets are clickable in the HUD and reachable with `Shift`+`1`…`4`; applying one hands camera
control to the user and pauses the cinematic loop.

### Parameters (21, all live)

| Group | Parameter | Default | Range | Effect |
| --- | --- | --- | --- | --- |
| Camera | Field of view | 55° | 25 – 100 | Shader ray cone (`uTanHalfFov`) and `PerspectiveCamera.fov` |
| Camera | Orbit distance | 24 M | 8 – 80 | Camera radius handed to the shader |
| Camera | Azimuth | 0.65 rad | 0 – 2π | Camera position; also fed back from OrbitControls |
| Camera | Elevation | 0.30 rad | −1.35 – 1.35 | Camera inclination |
| Camera | Time scale | 1.0× | 0 – 4 | Simulation-time rate driving disk turbulence |
| Disk | Inner radius | 6 M | 3 – 24 | Inner edge of the annulus (6 M = ISCO) |
| Disk | Outer radius | 18 M | 8 – 48 | Outer edge; always kept > inner + 1 M |
| Disk | Half thickness | 0.5 M | 0.05 – 2.5 | Vertical Gaussian scale height of the slab |
| Disk | Peak temperature | 7200 K | 2500 – 14000 | Scale of the Novikov-Thorne temperature profile |
| Disk | Emission intensity | 1.4× | 0.1 – 6 | Multiplies the emission integral |
| Disk | Orbital speed | 1.0× | 0 – 2.5 | Scales Ω(r), hence turbulence shear and the Doppler factor |
| Disk | Turbulence amount | 0.55 | 0 – 1.5 | fbm amplitude modulation of density (0 = smooth disk) |
| Disk | Turbulence speed | 1.0× | 0 – 3 | Rate at which the turbulent field churns |
| Background | Star density | 1.0× | 0 – 3 | Star count and brightness of the three hash grids |
| Background | Galaxy brightness | 0.9× | 0 – 3 | Milky Way band, clouds and dust lanes |
| Post | Bloom strength | 0.55 | 0 – 2 | `UnrealBloomPass.strength` (forced to 0 in debug views) |
| Post | Bloom threshold | 0.85 | 0 – 2 | `UnrealBloomPass.threshold` |
| Post | Exposure | 1.15× | 0.2 – 3 | Linear exposure before ACES |
| Post | Vignette | 0.35 | 0 – 1 | Corner falloff starting at 0.55 of the corner radius |
| Post | Film grain | 0.06 | 0 – 0.5 | Animated hash grain, time-seeded |
| Post | Chromatic aberration | 0.15 | 0 – 1 | Radial RGB separation, zero in debug views |

Double-clicking a slider label (or its track) restores that single default; **Reset all**
(`R`) restores every parameter and app field at once and clears the stored state.

### Quality tiers

| Tier | Internal render scale | DPR cap | Geodesic steps | Step scale | Bloom resolution |
| --- | --- | --- | --- | --- | --- |
| Standard | 0.75 | 1.0 | 160 | 1.25 | 0.5× |
| High (default) | 1.0 | 1.5 | 320 | 1.0 | 1.0× |
| Cinematic | 1.0 | 2.0 | 480 | 0.85 | 1.0× |

These change real work: the drawing-buffer size (`renderer.setPixelRatio(min(devicePixelRatio,
cap) * renderScale)`), the geodesic step budget and step length, and the bloom target size. On a
1440×900 viewport at DPR 1 the canvas is 1080×675 on Standard versus 1440×900 on High.

### Debug views

| # | Name | What it shows |
| --- | --- | --- |
| 0 | Final image | Composed HDR radiance through bloom, ACES, vignette, grain and chromatic aberration |
| 1 | Geodesic steps | Step count per pixel (sqrt-scaled heat ramp) coloured by termination class: blue = captured by the horizon, red = step budget exhausted |
| 2 | Horizon mask | White where the ray ends inside r_s; orange rim for rays that graze the horizon; cyan where the closest approach touches the photon sphere r = 3 M |
| 3 | Disk crossings / order | Transmittance-weighted emission per image order: **green = primary, cyan = secondary, magenta = higher-order**, i.e. the ordered crossing map |
| 4 | Doppler / redshift g | `g = δ·√(1−r_s/ρ)` at the deepest recorded disk crossing, heat-mapped over 0.4 – 2.0; background pixels dark grey |
| 5 | Lensed sky direction | Final ray direction encoded as RGB (`dir·0.5+0.5`): the gravitational lens map itself |
| 6 | Stars / galaxy only | Procedural background alone (lensed, Reinhard-mapped) with the disk removed |
| 7 | Raw HDR radiance | Pre-bloom linear radiance through a fixed-white-point log curve instead of ACES |
| 8 | Disk temperature | Novikov-Thorne temperature at the deepest crossing radius, 1000 – 15000 K heat ramp |
| 9 | Impact parameter | `b` normalised by the critical `b_c = 3√3 M` as a heat ramp, with the critical curve drawn in white |

All ten are produced inside the same fragment shader from the same geodesic integration — a
debug view never replaces the physics, it only re-colours its intermediate results. In any
non-zero view bloom strength is forced to 0 and the final pass bypasses exposure, vignette,
grain and chromatic aberration, so diagnostic colours reach the screen unmodified (view 7 is
the exception: it needs a presentation curve to make HDR values visible at all).

## Vendor

`vendor/three/` holds a verbatim copy of three.js **0.186.0** (MIT, © 2010-2026 three.js
authors: `vendor/three/LICENSE`) — the upstream ESM build plus exactly the addons this project
imports: `OrbitControls`, `EffectComposer`, `RenderPass`, `ShaderPass`, `UnrealBloomPass`,
`Pass`, `MaskPass`, `CopyShader`, `LuminosityHighPassShader`. `MaskPass` is included because
`EffectComposer` imports it; `OutputPass` is deliberately absent because this project performs
its own ACES tone mapping and sRGB encode.

`vite.config.js` maps the specifiers so that neither the application nor the vendored addons
ever resolve `node_modules/three`:

```js
{ find: /^three$/,                  replacement: '<abs>/vendor/three/build/three.module.js' }
{ find: /^three\/addons\/(.*)$/,    replacement: '<abs>/vendor/three/examples/jsm/$1' }
```

Regular expressions (not plain prefixes) are used so the relative imports inside the copied
addon files — including their own bare `from 'three'` — resolve inside `vendor/` as well.
`vendor/README.md` records the upstream version, the tarball URL, the license, the copied file
list with SHA-256 hashes, and why each file is required.

## Architecture

```text
index.html
src/
  main.jsx                     installs the bridge, restores state, applies the URL contract,
                               creates the canvas, mounts React
  App.jsx                      HUD + context-lost overlay; creates the RendererManager once
  styles.css                   hand-written dark sci-fi HUD styling (system fonts only)
  state/
    store.js                   single mutable store, 21 param defs, quality tiers, listener set,
                               immutable snapshots for React, throttled camera notifications,
                               debounced versioned localStorage, reset
    url.js                     URL capture contract parsing (one-shot, validated, non-throwing)
    bridge.js                  window.__GARGANTUA__ + the ready signal
    presets.js                 the four camera presets
  render/
    RendererManager.js         WebGLRenderer, full-screen quad, OrbitControls, EffectComposer
                               chain, per-frame uniform upload, cinematic loop, context loss
    shaders/raytracer.vert.glsl  full-screen pass-through vertex shader
    shaders/raytracer.frag.glsl  the geodesic integration + disk + background + debug views
    shaders/final.frag.glsl      chromatic aberration, exposure, ACES, vignette, grain, sRGB
  ui/
    Hud.jsx  ParamSlider.jsx  shortcuts.js  debugMeta.js
```

### Geodesic integration

Geometric units, `G = c = M = 1`, so the horizon is at `r = 2`, the unstable photon orbit at
`r = 3` and the critical impact parameter at `b_c = 3√3 ≈ 5.196`. The spatial coordinates are
the Cartesian Schwarzschild chart (`|x| = r`), in which a null geodesic satisfies exactly

```
d²x/dλ² = −(3/2)·h²·x / r⁵ ,        h² = |x × dx/dλ|²  (conserved)
```

the vector form of the orbit equation `d²u/dφ² + u = 3M u²` with `u = 1/r`. `h²` is evaluated
once at the camera and is then a constant of the motion (see `nullGeoAccel` in
`raytracer.frag.glsl`). The state `(pos, vel)` is advanced with an adaptive affine step by
**velocity Verlet** (kick–drift–kick, second order), with

```
dl = uStepScale · clamp(0.35·r, 0.05, 2.5)
```

shrunk inside the disk annulus (so the thin slab is resolved) and additionally capped at half
the remaining distance to the disk plane (so a steeply inclined ray can never step clean over a
thin slab). Termination is per ray: `r < 2` → captured (the pixel stays black behind whatever
disk emission it collected); `r > 80` with `dx/dλ·x > 0` → escaped, the sky is sampled along
`normalize(vel)`; step budget exhausted inside the photon sphere → treated as captured.
Each pixel starts its ray at the camera position from the OrbitControls-driven
`PerspectiveCamera` (position, orthonormal basis and FOV all upload as uniforms every frame).

### Accretion disk

The disk is a Gaussian slab in the world XZ plane (`|y| ≤ h`, normal +Y) that the *bent* ray
marches through with emission–absorption accumulation:

- density `= exp(−3(y/h)²) · radialProfile(ρ) · turbulence`, with a smooth-edged `r⁻²`
  radial profile peaking near the inner edge;
- a Novikov-Thorne-like temperature `T(ρ) ∝ (r_in/ρ)^{3/4}·(1−√(r_in/ρ))^{1/4}`;
- three-octave value-noise fbm sampled in the **co-rotating frame**, so the differential
  rotation Ω(ρ) = ρ^{−3/2} shears it into churning spiral filaments (driven by
  `uTurbAmp`/`uTurbSpeed`/`uTime`);
- the observed temperature `g·T` is turned into linear sRGB by a Planckian-locus fit (Kim et
  al. cubic chromaticity approximations through the sRGB primaries);
- emission `= colour(g·T) · g⁴ · intensity · density · dl`, absorbed with
  `transmittance *= exp(−σ·density·dl)`, and composited front-to-back.

**Ordered multiple crossings.** The sign of `y` is tracked between steps; when it flips, the
piercing point is interpolated and, if it lands inside the annulus, recorded in a small
fixed-size table and the image-order counter is advanced. Emission accumulated *before* the
first piercing is the primary image; the segment between piercings 1 and 2 is the secondary
image, and so on. Contributions are bucketed per order, so the final image is a sum over image
orders rather than a single flat ring — that is what produces the lensed arc above and below
the shadow (debug view 3 shows the buckets directly).

Gravitational redshift and Doppler beaming come from `g = δ·√(1−r_s/ρ)` with
`δ = 1/(γ(1−β·n̂))`, `β = v_orb·φ̂`, `v_orb = √(M/(ρ−2M))` (0.5 c at the ISCO, clamped below 0.99 c)
and `n̂` the emitter-to-observer direction — which is why one side of the disk is bright and
blue and the other dim and red.

### Background

Stars are one jittered point per cell of three cube-face hash grids (power-law magnitude
distribution, blackbody colour temperature), and the Milky Way is a fbm-broken band around a
tilted galactic normal with dust lanes and a bright core direction. Both are sampled along the
*escaped* ray direction, so gravitational lensing of the background is implicit and complete —
no cubemap, panorama or image is involved.

### Post-processing

`EffectComposer` (half-float HDR targets) → `RenderPass` (the geodesic shader) →
`UnrealBloomPass` → a custom final `ShaderPass` doing radial chromatic aberration, exposure,
**ACES tone mapping (Narkowicz 2015 analytic fit)**, a restrained vignette whose falloff starts
at 0.55 of the corner radius (so it never eats the photon ring), time-seeded film grain, and the
linear→sRGB encode. `renderer.toneMapping` is `NoToneMapping` so the tone curve lives in exactly
one place. Debug views bypass all camera effects.

### State, persistence, resilience

One mutable store is the single source of truth. React reads it through
`useSyncExternalStore` and only re-renders when the state actually changes; the animation loop
reads the mutable objects directly and never triggers a React render per frame. Camera changes
that originate from OrbitControls are written back into the same parameters and notify React at
most four times per second. Resolution is two-way: moving the FOV/distance/azimuth/elevation
sliders moves the camera, and dragging or zooming the view updates the sliders, without
feedback loops.

All configurable state (21 parameters, quality tier, preset, debug view, HUD visibility,
cinematic state) is persisted to `localStorage['gargantua.state.v1']` as
`{ version: 1, ... }`, debounced by 300 ms and clamped on load; corrupt JSON, a missing key or a
different version silently falls back to the defaults. `R` / **Reset all** restores the defaults
and removes the stored key.

`webglcontextlost` is intercepted (`preventDefault`, the RAF loop stops, a readable overlay
appears) and `webglcontextrestored` rebuilds the render targets and material programs, re-applies
size/DPR/quality, keeps the persisted state and resumes rendering — with no page reload and no
swallowed events.

### Cinematic loop

By default the camera drifts along a parametric path (slow azimuth drift, gentle elevation
sine, ±8 % distance breathing). Any pointer, wheel or touch input on the canvas hands control
to the user permanently and stops playback; `Space` (or the HUD button) starts it again and
clears the manual flag. Manual control is never stolen back.

See [`RESULTS.md`](RESULTS.md) for the exact commands run and the observed browser behaviour.
