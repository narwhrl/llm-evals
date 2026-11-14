# GARGANTUA — Schwarzschild Black Hole Raytracer

Fullscreen interactive black-hole raytracer. React + Vite + ES Modules; the
image is a custom full-screen fragment shader (local Three.js) that numerically
integrates Schwarzschild null geodesics per pixel. No backend, no accounts, no
runtime network fetches of any kind.

## Commands

```sh
npm install          # install pinned dependencies (writes node_modules/, ignored)
npm run dev          # develop at http://localhost:5173/
npm run build        # production build into dist/
npm run preview      # serve the production build statically (http://localhost:4173/)
```

Any static file server works for `dist/`, e.g. `npx serve dist`. Offline: after
`npm run build`, disconnect the network — the served scene is unaffected.

## Layout

- `src/main.jsx`, `src/App.jsx`, `src/styles.css` — React shell, HUD, shortcuts,
  URL capture contract, `localStorage` persistence (`gargantua.v1`), ready signal.
- `src/state.js` — defaults, 4 view presets, 3 quality tiers, debug view names,
  validation/sanitization for state, setters, and query params.
- `src/engine.js` — Three.js renderer, HDR/bloom target chain, OrbitControls
  wiring, resize/DPR, `webglcontextlost/restored` rebuild, quality switching.
- `src/shaders.js` — the physics: RK2 integration of `d2u/dphi2 + u = 3u^2`
  (M=1, horizon rs=2), event-horizon capture, escape sampling, curved-path disk
  crossings composited front-to-back, Doppler + gravitational redshift,
  procedural stars/galaxy, HDR bloom + ACES + vignette/grain/chromatic
  aberration composite, and 10 debug views.
- `vendor/` — runtime Three.js ESM build + OrbitControls, with provenance note.
  This is the only runtime library; React is build-time bundled.

## Controls

Sliders (21, all live): FOV, camera distance/azimuth/elevation, time rate, disk
inner/outer radius, disk half thickness, disk temperature, disk emission,
orbital velocity, turbulence amount/speed, star density, galaxy brightness,
bloom strength/threshold, exposure, vignette, grain, chromatic aberration.

Keys: `0–9` debug views · `Shift+1–4` presets · `Space` cinematic loop ·
`H` HUD · `R` reset (clears persisted state) · `Q` quality cycle.

Capture contract: `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`
freezes the loop/audio-free scene at fixed time; readiness is signalled by
`document.documentElement.dataset.gargantuaReady === "true"` and
`window.__GARGANTUA__` (`ready`, `getState`, `setQuality`, `setPreset`,
`setDebug`, `setTime`; invalid input returns `false`, never throws).
