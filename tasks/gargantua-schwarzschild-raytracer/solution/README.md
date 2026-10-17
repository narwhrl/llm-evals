# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen interactive black-hole raytracer. Every pixel numerically
integrates a null geodesic in the Schwarzschild metric inside a single custom
fragment shader — there is no mesh planet, no pre-baked lensing texture, no
remote asset of any kind.

- React + Vite + ES Modules
- Three.js 0.186.1 vendored locally under `vendor/` (see `vendor/README.md`)
- Works fully offline once installed; no CDN, textures, HDRIs, fonts or APIs

## Install

```bash
npm install        # resolves react / react-dom / three / vite via package-lock.json
```

## Develop

```bash
npm run dev        # vite dev server, default http://localhost:5173
```

## Production build

```bash
npm run build      # emits dist/
```

## Static preview of the build

```bash
npm run preview    # serves dist/ at http://localhost:4173
# or any static server: npx serve dist
```

## URL capture contract (automation)

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

`capture=1` freezes the simulation clock at `time` seconds, disables the
cinematic loop and audio, applies `quality`/`preset`/`debug`/`hud`, and the
page sets `document.documentElement.dataset.gargantuaReady = "true"` once the
first presentable frame has been produced. `window.__GARGANTUA__` exposes
`ready`, `getState()`, `setQuality(level)`, `setPreset(index)`,
`setDebug(index)`, `setTime(seconds)`.

## Controls

- `0`–`9` — debug views (`0` composite; `1`–`9` diagnostics)
- `Shift+1`–`Shift+4` — camera presets
- `Space` — play/pause cinematic loop
- `H` — HUD show/hide
- `R` — reset all state to defaults
- `Q` — cycle quality (Standard / High / Cinematic)
- `M` — music toggle (no audio shipped in this build)

## Implementation notes

- The visible image is produced by `src/shaders/blackhole.frag.glsl`,
  a full-screen `ShaderMaterial` on a single quad. Ray state, adaptive
  leapfrog stepping, event-horizon termination, escape radius, and ordered
  multi-crossing disk compositing are all in that file.
- Three.js `OrbitControls` drives the perspective camera whose position and
  basis are copied to shader uniforms every frame — orbiting/zooming truly
  re-aims the geodesics.
- HDR: raymarch writes linear HDR into a `HalfFloatType` target,
  `UnrealBloomPass` adds bloom, a grade pass applies exposure + ACES +
  vignette + grain, `OutputPass` performs the sRGB transfer.
- State (all sliders, quality, preset, debug, HUD visibility, cinematic
  toggle) persists to `localStorage` under a versioned key.
