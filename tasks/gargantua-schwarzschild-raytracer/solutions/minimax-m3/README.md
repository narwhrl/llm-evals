# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, GPU-accelerated Schwarzschild geodesic raytracer built with
React, Vite, and a locally vendored Three.js. The visible scene is produced
by a custom fragment shader that numerically integrates null geodesics in
the O'Neil / Hartle geometric form, accumulates ordered multiple disk-plane
crossings along each curved ray, samples a procedural starfield + galaxy,
and post-processes through bloom, ACES tone mapping, vignette, film grain,
and chromatic aberration. Everything runs offline — there is no runtime
fetch against any CDN, HDR repository, font, audio service, or API.

## Stack

- React 18 + React DOM (UI / HUD)
- Vite 5 (build + dev server)
- Three.js 0.160.1, locally vendored under `vendor/` and mirrored into
  `public/vendor/three/` for static serving

No backend, no remote services.

## Commands

All commands are run from the project root (`solution/`):

```bash
npm install                  # install React / Vite toolchain
npm run dev                  # Vite dev server on http://127.0.0.1:5173
npm run build                # production build → dist/
npm run preview              # Vite preview (defaults to port 4173)
npm run serve                # same as preview, explicit host/port flags
```

Open `http://127.0.0.1:4173/` after `npm run preview` for the static-built
runtime.

## URL Capture Contract

For reproducible screenshots the page accepts a stable query string:

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1` — freeze cinematic loop, freeze time at `time`
- `quality` — `standard` | `high` | `cinematic`
- `preset` — `0`..`3`
- `debug` — `0`..`9`
- `hud` — `0` | `1`
- `time` — finite non-negative seconds (default 0)

Illegal values fall back silently to defaults; no exception is thrown.

After the first valid frame, the document element receives
`dataset.gargantuaReady = "true"` and `window.__GARGANTUA__` is exposed
with `ready`, `getState()`, `setQuality()`, `setPreset()`, `setDebug()`,
`setTime()`, and `describe()`.

## Controls

- Drag, wheel, touch — orbit / dolly via `OrbitControls`
- `Shift+1..4` — switch camera presets
- `Space` — toggle cinematic camera motion
- `H` — toggle HUD
- `R` — reset all parameters
- `Q` — cycle quality profiles
- `M` — toggle audio (disabled by default)
- `0`..`9` — debug views

All parameter changes are persisted under `localStorage` key
`gargantua-state-v1`.

## Directory

```
solution/
├── index.html
├── package.json
├── vite.config.js
├── vendor/
│   ├── README.md              # provenance, SHA-256, MIT license
│   └── three/                # mirror under src/ consumed via Vite alias
├── public/
│   └── vendor/three/         # served statically for vendored three module
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── Scene.js              # WebGL pipeline (raytracer + composite)
│   ├── HUD.jsx               # React UI
│   ├── state.js              # controller + persistence
│   ├── url.js                # capture-URL parser
│   ├── styles.css
│   ├── vendor/three.js       # local copy used by Vite alias
│   └── shader/
│       ├── raytracer.glsl.js
│       └── composite.glsl.js
└── RESULTS.md
```