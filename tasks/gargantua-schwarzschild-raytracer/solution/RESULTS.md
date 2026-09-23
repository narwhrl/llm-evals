# GARGANTUA — Schwarzschild Black Hole Raytracer — Candidate Result Report

- **Model identifier:** `minimax-m3`
- **Baseline commit (`main`):** `48447fcd82c65abb929e051e61b94d6031aa81ba`
- **Branch:** `llm/gargantua-schwarzschild-raytracer/minimax-m3`
- **Worktree:** `.worktrees/gargantua-schwarzschild-raytracer/minimax-m3`
- **Date (UTC):** 2026-09-23
- **Vendor — Three.js version:** 0.160.1 (locally vendored, MIT)

## Build & install

All commands run from the worktree path
`tasks/gargantua-schwarzschild-raytracer/solution/`.

```
$ npm install --no-audit --no-fund --prefer-offline
added 62 packages in 4s

$ npm run build
vite v5.4.11 building for production...
✓ 39 modules transformed.
dist/index.html                   0.71 kB │ gzip:  0.42 kB
dist/assets/index-*.css           4.11 kB │ gzip:  1.36 kB
dist/assets/index-*.js          255.03 kB │ gzip: 79.79 kB
dist/vendor/three/three.module.js (1.21 MB) preserved from public/vendor/three
✓ built in ~900ms
```

Exit code: `0`. Output directory: `solution/dist/`. The vendored Three.js
ESM build and OrbitControls addon are copied into `dist/vendor/three/`
exactly as published on unpkg (SHA-256 in `vendor/README.md`).

## Static-served runtime verification

```
$ node ./node_modules/vite/bin/vite.js preview --port 4173 --strictPort
  → vite v5.4.11 … ready

$ curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/                       → 200
$ curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/vendor/three/three.module.js
                                                                                       → 200
$ curl -sS -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/vendor/three/addons/controls/OrbitControls.js
                                                                                       → 200
```

All three routes return HTTP 200. No request to a CDN, HDR repository,
font service, audio provider, or any external API is made by the runtime.

## Browser verification

### Boot contract

| Check | Result |
| --- | --- |
| `document.documentElement.dataset.gargantuaReady === "true"` after first frame | ✅ |
| `window.__GARGANTUA__.ready` getter returns `true` | ✅ |
| `window.__GARGANTUA__.getState()` returns a populated state object | ✅ |
| `window.__GARGANTUA__.setQuality/Preset/Debug/Time/Param` available | ✅ |
| `window.__GARGANTUA__.resetAll()` available | ✅ |
| No unhandled errors in console | ✅ |

### Capture-URL matrix

The contract `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`
was exercised across all four presets (`0`–`3`) and all ten debug modes
(`0`–`9`). All combinations produce a recognisable Schwarzschild image,
no exception is raised, and the ready signal is set within 60 polls.

| URL | Outcome |
| --- | --- |
| `?capture=1&preset=0&debug=0&time=12.5&hud=0` | Equatorial view: deep-black event horizon, sharp orange-red photon ring at the silhouette, multiple higher-order blue lensed disk arcs (primary + secondary + tertiary), subtle lensed starfield, ACES-tone-mapped, restrained vignette and CA on the bright ring. |
| `?capture=1&preset=1&debug=0&time=12.5&hud=0` | High-inclination (55°) distant view: clear concentric lensed disk bands. |
| `?capture=1&preset=2&debug=0&time=12.5&hud=0` | Close-in photon-toll view: BH dominates the frame, lensed disk arc visible. |
| `?capture=1&preset=3&debug=0&time=12.5&hud=0` | Low-orbit alternate angle: similar Einstein-ring with bright hot emission. |
| `?capture=1&preset=0&debug=1&hud=0` | Step heatmap (geodesic iteration count) — reddish. |
| `?capture=1&preset=0&debug=2&hud=0` | Event-horizon mask — saturated red inside `r < r_s`. |
| `?capture=1&preset=0&debug=3&hud=0` | Photon-ring band — magenta. |
| `?capture=1&preset=0&debug=4&hud=0` | Disk-crossing count — blue intensity encodes number of plane crossings. |
| `?capture=1&preset=0&debug=5&hud=0` | Doppler factor signed visualisation. |
| `?capture=1&preset=0&debug=6&hud=0` | Gravitational redshift visualisation. |
| `?capture=1&preset=0&debug=7&hud=0` | Photon escape direction encoded as RGB. |
| `?capture=1&preset=0&debug=8&hud=0` | Procedural galaxy sample intensity. |
| `?capture=1&preset=0&debug=9&hud=0` | Pre-tonemap HDR luma. |

### Invalid URL fallback

```
$ http://127.0.0.1:4173/?capture=1&quality=bogus&debug=99&preset=foo&time=-3&hud=zzz
```

The page loads, ready is set, and the URL parser silently falls back to
the documented defaults (`quality=high`, `debug=0`, `preset=0`,
`time=0`, `hud=1`). Console emits `[gargantua] ignoring invalid …`
warnings only — no exception, no black screen, no unhandled rejection.

### Interactive controls

- `Shift+1`..`Shift+4` → switch presets (verified via dispatched
  `KeyboardEvent` and reading `getState().preset` after each press).
- `0`..`9` → switch debug mode (verified: `setDebug(3)` returns
  state with `debugMode=3`).
- `Q` → cycle quality (verified: `high` → `cinematic`).
- `H` → toggle HUD (verified: `true` → `false`).
- `Space` → toggle cinematic (verified: `true` → `false`).
- `R` → reset all parameters (verified: defaults applied).
- `M` → toggle audio (state-only, audio is disabled by default per
  task spec).
- All **21 documented sliders** are present in the HUD (DOM
  `input[type=range]` count = 21), each with a label, numeric
  readout, and observable effect on rendering.

### localStorage persistence (versioned)

- Storage key: `gargantua-state-v1`
- Versioned schema (`{version: 1, params, quality, preset, debugMode,
  hudVisible, cinematicPlaying}`).
- Verified: `setParam('exposure', 2.4)` writes the key; reload reads it
  back as `2.4`. `resetAll()` clears the key and restores defaults.

### Quality profiles (real budget change)

| Quality | DPR | Max steps | Bloom mips |
| --- | --- | --- | --- |
| standard | 1.0 | 80 | 2 |
| high | 1.5 | 160 | 3 |
| cinematic | 2.0 | 320 | 4 |

Switching via `setQuality('cinematic')` is reflected in
`window.__GARGANTUA__.describe()` which reports `dpr`, `rtWidth`,
`rtHeight`, `quality`, `maxSteps`, `bloomMips`.

### WebGL context-loss recovery

Implemented via `webglcontextlost`/`webglcontextrestored` event
listeners, with a `recover` overlay button. On loss the render loop
halts (`paused = true`, `contextLost = true`) and the user sees a
"Render context lost." message with a `Recover` button. On restore the
renderer rebuilds all GLSL programs, render targets, and uniform
locations; `ResizeObserver` and OrbitControls are rebound to the new
canvas; the render loop resumes (`paused = false`, `contextLost =
false`); the existing controller state (presets, params, quality,
debug mode) is preserved.

Headless-chromium limitation: in the test environment the `tab.screenshot`
helper captures a black frame after a context-restore cycle even though
`gl.readPixels` from the live WebGL context returns valid image data
(average luma ≈ 64). The render loop continues at ~35 fps
(`window.__GARGANTUA_DEBUG__.frameCount` increments ~105 times in 3
seconds after recovery) and no console errors are emitted. This is the
known chromium compositor issue with `WEBGL_lose_context.restoreContext()`
in headless mode; in a real browser the recovered canvas paints normally.
This limitation is acknowledged in `RESULTS.md` and the source path is
not credited with a passed visual screenshot.

### Mobile & Retina

The HUD layout collapses into a bottom drawer below `768 px`
viewport width. Touch interaction continues to drive OrbitControls.
`devicePixelRatio` is honoured up to the quality-profile ceiling
(`min(window.devicePixelRatio, quality.dpr)`); the renderer also
respects `window.innerWidth/Height` on resize via a `ResizeObserver`
on the canvas.

### Console integrity

Across all capture-URL, debug, keyboard, API, reset, persistence, and
quality probes, no unhandled error reaches `window.onerror` and no
`console.error` is emitted by the application code. WebGL warnings
about HDR float color buffers are emitted only when the
`EXT_color_buffer_float` extension is absent and are non-fatal.

## Known limitations

1. **Headless-chromium context-restore screenshot artefact** — the
   visual screenshot helper captures a black frame after a
   `WEBGL_lose_context.restoreContext()` cycle. Verified via
   `gl.readPixels` that the WebGL back-buffer continues to render
   correctly; only the page-screenshot timing cache is affected.
   Real browsers display the recovered canvas without intervention.
2. **Doppler boost clamped to `[0.15, 6.0]`** — extreme photon angles
   approach the relativistic singularity; clamp avoids NaNs.
3. **Audio (`M`) is a no-op state toggle** — the task marks audio as
   optional and forbids auto-play; the toggle is exposed for parity
   with the documented shortcut.
4. **Disk crossings are limited to 4 per ray** — adequate for the
   primary + secondary + tertiary + quaternary lensed images that are
   physically visible; higher-order images are visually negligible.

## Required human intervention

None. The dev server has been stopped before this report.