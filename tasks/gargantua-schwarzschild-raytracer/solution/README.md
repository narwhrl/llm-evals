# GARGANTUA — Schwarzschild Black Hole Raytracer

A fullscreen interactive website that raytraces a Schwarzschild black hole in real time.
Every pixel of the black hole, the accretion disk, the photon ring, and the gravitationally
lensed starfield is evaluated per-frame by a custom fragment shader that numerically
integrates null geodesics — no black-sphere mesh, no skybox, no pre-baked imagery.

React + Vite + ES Modules + locally vendored Three.js (`vendor/`, see `vendor/README.md`).
No backend, no CDN, no remote textures/fonts/HDRI — the site works fully offline.

## Install

Requires Node.js 20+ (developed and verified on Node 24).

```bash
npm install
```

## Development server

```bash
npm run dev
```

Vite prints the local URL (default `http://localhost:5173/`).

## Production build

```bash
npm run build
```

Outputs static files to `dist/`. The build honors Vite's standard flags, e.g.:

```bash
npm run build -- --base=/sub/path/ --outDir dist-custom
```

## Static preview / static hosting

Any static file server can host the build output. Verified commands:

```bash
npm run preview
# → http://localhost:4173/  (vite preview serves dist/)
```

or with any other static server:

```bash
npx serve dist
# or: python -m http.server -d dist 8080
```

## URL capture contract

Deterministic screenshot automation, same-origin URL parameters:

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1` freezes the simulation clock at `time` seconds (finite, non-negative,
  default `0`), disables the cinematic loop and never writes to `localStorage`,
  so identical URLs produce identical frames.
- `quality` accepts only `standard | high | cinematic`; `preset` integer `0–3`;
  `debug` integer `0–9`; `hud` `0 | 1`. Invalid values fall back to defaults safely.
- After shader compilation, first render and URL state application, the page sets
  `document.documentElement.dataset.gargantuaReady = "true"` and exposes
  `window.__GARGANTUA__` with read-only `ready`, `getState()`, `setQuality(level)`,
  `setPreset(index)`, `setDebug(index)`, `setTime(seconds)` (plus a convenience
  `setParam(key, value)`). Setters validate input and return the updated state or
  `null` for invalid input; they never throw.

## Controls

| Input | Action |
| --- | --- |
| Drag / touch-drag / wheel / pinch | OrbitControls camera — feeds the shader every frame |
| `Shift+1` … `Shift+4` | View presets: Portrait, Edge-On, Polar, Photon Ring |
| `0`–`9` | Debug views (`0` = final composite) |
| `Space` | Cinematic camera loop play/pause |
| `H` | HUD show/hide |
| `R` | Reset all parameters to defaults |
| `Q` | Cycle quality tier (Standard → High → Cinematic) |

Any manual camera input ends the cinematic loop; control is never lost. The HUD shows
the quality tier, active debug view, cinematic state and preset, lists all shortcuts,
and offers 21 effective, individually resettable parameter sliders plus a global
reset button. All state persists (versioned) in `localStorage` and restores on reload.

## Rendering notes

- **Geodesics**: planar Schwarzschild null-geodesic reduction. State: Cartesian
  position/velocity plus the conserved squared specific angular momentum h²;
  acceleration `a(x) = −(3/2) h² x̂/|x|³` (the exact Binet-equation dynamics
  u'' + u = (3/2)rs·u² in vector form). Semi-implicit (symplectic) Euler stepping
  with radius-adaptive affine step size. Termination: event horizon capture
  (r < 1 rs → black), escape beyond the sky radius, or step budget for
  near-critical winding rays. See the documented header of
  `src/shaders/raytracer.frag.js`.
- **Disk**: crossings of the disk mid-plane are detected along the curved path,
  refined by bisection, and composited front-to-back in path order — primary,
  secondary, and higher-order lensed images. Emission includes relativistic
  Keplerian orbital velocity, Doppler beaming, gravitational + transverse redshift,
  a T ∝ ρ^−3/4 blackbody temperature gradient, and time-animated fbm turbulence.
- **Background**: procedural octahedral-mapped star grid + fbm milky-way band,
  sampled with the lensed escape direction. No textures anywhere.
- **Post**: HDR half-float pipeline → UnrealBloomPass → finishing pass with
  chromatic aberration (linear HDR), the exact ACES filmic implementation used by
  three.js (Stephen Hill fit), sRGB encode, vignette, and animated film grain.
- **Quality tiers** change real budgets: internal render scale (0.62/0.85/1.0),
  geodesic step budget (144/208/320), max disk crossings (2/3/4), bloom resolution.
- **Context loss**: `webglcontextlost` pauses rendering with a user-visible
  recoverable overlay; `webglcontextrestored` rebuilds renderer, composer and
  materials in place — state survives, no page reload.

## Debug views

| # | View |
| --- | --- |
| 0 | Final composite |
| 1 | Integration cost / termination mode |
| 2 | Event-horizon capture mask |
| 3 | Disk crossing count (order structure) |
| 4 | Redshift / Doppler factor of disk emission |
| 5 | Lensed background coordinates (octahedral) |
| 6 | Lensed sky background only |
| 7 | Procedural star field channel |
| 8 | HDR luminance, log-mapped, pre-postprocessing |
| 9 | Impact parameter relative to the critical value b_crit |

## Layout

```
solution/
  index.html            entry
  package.json          scripts + pinned deps
  package-lock.json     lockfile
  vite.config.js        build config; aliases `three` → vendor/
  vendor/               vendored three.js ESM build + addons (see vendor/README.md)
  src/
    main.jsx            bootstrap, keyboard, capture URL contract, inspection API
    store.js            parameters, quality/preset/debug tables, versioned persistence
    renderer.js         WebGL renderer, composer chain, OrbitControls, quality, context loss
    hud.jsx             HUD panel, sliders, buttons, shortcuts
    style.css           layout, mobile drawer
    shaders/
      raytracer.frag.js the Schwarzschild null-geodesic integrator + disk + sky (the core)
      finish.frag.js    ACES finishing pass
```
