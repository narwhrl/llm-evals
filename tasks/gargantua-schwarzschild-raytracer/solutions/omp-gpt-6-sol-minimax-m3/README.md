# GARGANTUA — Schwarzschild Black-Hole Raytracer

A self-contained React + Three.js site that traces null geodesics around a
non-rotating (Schwarzschild) black hole and renders an accretion disk, photon
ring, lensing-mapped starfield and a Doppler-boosted disk emission model in
real time. Everything ships locally: Three.js is vendored, no fonts / images /
network resources are pulled at runtime, and the production build is a single
folder of static assets.

## Quick start

The candidate directory is a normal Vite project that pins exact dependency
versions in `package-lock.json`. `npm install` installs the pinned
dependencies declared in `package.json` — including `three@0.181.2`, kept
for provenance and lockfile integrity — but the runtime code path imports
the vendored Three.js / OrbitControls sources from `vendor/three/`
directly, never `node_modules/three`. The vendored `LICENSE` is shipped
for licence-compliance purposes, not imported.

```sh
# install pinned dependencies
npm install

# development server (Vite HMR, port 5173)
npm run dev -- --host 127.0.0.1 --port 5173 --strictPort

# production build (output: dist/)
npm run build

# static preview of the production build (port 4173 by default;
# pass --port 4174 if 4173 is taken, then update the URL)
npm run preview -- --host 127.0.0.1 --port 4173 --strictPort
```

For bit-for-bit reproducible installs that match the committed lockfile
exactly (no lockfile mutation, faster, intended for CI), use `npm ci`
instead of `npm install`:

```sh
npm ci
```

Open `http://127.0.0.1:5173/` for dev or `http://127.0.0.1:4173/` for the
static preview, wait for `document.documentElement.dataset.gargantuaReady`
to flip to `"true"`, and the HUD is fully usable.

### Project gallery build

The site accepts a custom base path so it can be served under any
`/<task-id>/<model-id>/` subpath:

```sh
npm run build -- --base=/gargantua-schwarzschild-raytracer/<model-id>/ \
  --outDir=<gallery-out> --emptyOutDir
```

The build emits no external requests — the gallery can host it as plain
static files.

## Vendored Three.js

The renderer does **not** import `three` from `node_modules` at runtime.
Instead `vendor/three/` ships the exact files copied from
`three@0.181.2`:

| Source file                                | Vendored to                                       |
| ------------------------------------------ | ------------------------------------------------- |
| `three@0.181.2/build/three.module.js`      | `vendor/three/three.module.js`                    |
| `three@0.181.2/build/three.core.js`        | `vendor/three/three.core.js`                      |
| `three@0.181.2/examples/jsm/controls/OrbitControls.js` | `vendor/three/addons/controls/OrbitControls.js` |
| `three@0.181.2/LICENSE`                    | `vendor/three/LICENSE`                            |

The Vite alias in `vite.config.js` rewrites the bare specifier `three` to
`./vendor/three/three.module.js`, so both dev and the production bundle stay
self-contained. Three.js is MIT-licensed — see `vendor/three/LICENSE` for the
full text and `vendor/README.md` for provenance.

## Controls

| Action                                | Desktop                                       | Mobile / Touch                            |
| ------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| Rotate camera                         | Left-drag                                     | Single-finger drag                        |
| Zoom                                  | Mouse wheel / pinch                           | Two-finger pinch                          |
| Cycle quality                         | `Q`                                           | Quality row in the HUD                    |
| Toggle HUD                            | `H`                                           | Tap `×` / `☰` in the HUD header           |
| Reset everything to defaults          | `R`                                           | "reset all" button in the HUD             |
| Toggle movie playback                 | `Space`                                       | "pause movie" / "play movie" button       |
| Switch presets 1–4                    | `Shift+1` … `Shift+4`                         | Preset buttons in the HUD                 |
| Switch debug view 0–9                 | `0` … `9`                                     | Debug grid buttons in the HUD             |
| Adjust 21 sliders / number inputs     | Sliders in the HUD                            | Same — sliders + numeric inputs           |

Global keyboard shortcuts are suppressed while an `<input>`, `<textarea>`,
`<select>` or `contenteditable` element is focused.

The HUD ships collapsed on portrait / coarse-pointer devices so the canvas
is the dominant element on first paint. Tap `☰` in the header to expand it;
tap `×` to collapse again.

## URL capture contract

`window.location.search` is parsed once at boot, validated against tight
schemas, and overrides the matching field of the persisted configuration
before the first frame is rendered. Invalid values fall back to defaults
without touching unrelated fields.

| Key        | Accepted values                                              |
| ---------- | ------------------------------------------------------------ |
| `capture`  | `1` enables capture mode (movie paused, time frozen)         |
| `quality`  | `standard` \| `high` \| `cinematic`                          |
| `preset`   | `0` … `3`                                                    |
| `debug`    | `0` … `9`                                                    |
| `hud`      | `0` \| `1`                                                   |
| `time`     | Finite number ≥ 0 (seconds)                                  |

Capture-mode URLs never write back into `localStorage`, so taking screenshots
does not corrupt the user's saved configuration.

Example screenshot URL:

```
/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

## Runtime API

After the renderer reports ready, a frozen read-only API is exposed at
`window.__GARGANTUA__`:

```js
window.__GARGANTUA__.ready                          // boolean
window.__GARGANTUA__.getState()                     // full state snapshot or null
window.__GARGANTUA__.setQuality(level)              // 'standard' | 'high' | 'cinematic'
window.__GARGANTUA__.setPreset(index)               // 0..3
window.__GARGANTUA__.setDebug(index)                // 0..9
window.__GARGANTUA__.setTime(seconds)               // finite >= 0
```

Every setter validates its input; invalid calls return `null` and never
mutate state.

## Context-loss recovery

The canvas listens for `webglcontextlost` (preventDefault, cancel rAF, emit
`{ready: false, lost: true}`, tear down only the GPU-bound render targets —
the Three renderer and the entire JS state are preserved) and
`webglcontextrestored` (reallocate render targets, run the pipeline once
to recompile every shader program, restart rAF, emit ready). The page
never reloads, and the persisted configuration (preset / quality / debug /
HUD / time) survives the round-trip unchanged. Repeated loss / restore
cycles are idempotent.

## Files of interest

```
solution/
├── index.html                    # inline data: favicon, viewport meta
├── package.json                  # exact pinned dependencies
├── package-lock.json             # lockfile (npm ci reproducible)
├── vite.config.js                # bare-specifier alias: three → vendor/three/three.module.js
├── vendor/
│   ├── README.md                 # Three.js vendor provenance
│   └── three/                    # three.module.js, three.core.js, OrbitControls.js, LICENSE
└── src/
    ├── main.jsx                  # boot + window.__GARGANTUA__ API
    ├── App.jsx                   # HUD UI (collapsed on portrait)
    ├── renderer.js               # WebGL2 pipeline + context-loss lifecycle
    ├── state.js                  # store: defaults, URL parsing, persistence, presets
    ├── styles.css                # dark theme + responsive HUD
    └── shaders/
        ├── raytrace.glsl         # Schwarzschild null-geodesic raytracer
        ├── bright.glsl           # HDR bright-pass extraction
        ├── blur.glsl             # separable Gaussian blur
        └── composite.glsl        # bloom + ACES + vignette + grain + CA + sRGB
```
