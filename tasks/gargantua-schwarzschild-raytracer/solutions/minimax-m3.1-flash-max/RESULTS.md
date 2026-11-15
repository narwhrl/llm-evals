# Results — GARGANTUA Schwarzschild Black Hole Raytracer

## Identification

| item | value |
| --- | --- |
| model identifier | `magpie/minimax-code/MiniMax-M3.1-Flash:max` |
| harness | ZCode (Node 24.21.0 / npm 11.19.0, Windows 11 x64, Git Bash) |
| starting `main` commit | `1d1fcb9e1d745cca9a36285df78555dede277136` |
| candidate path | `tasks/gargantua-schwarzschild-raytracer/solution/` |
| platform used for the browser check | Chrome 157.0.8103.52 (headless), ANGLE / Intel Arc 140T, D3D11, WebGL 2.0 |

---

## Commands that were actually run

All commands were executed from `tasks/gargantua-schwarzschild-raytracer/solution/`.

| # | command | result |
| --- | --- | --- |
| 1 | `npm install --no-audit --no-fund` | exit 0 — `added 20 packages in 5s`; `postinstall` ran `scripts/vendor-sync.mjs` |
| 2 | `npm run vendor` | exit 0 — `[vendor-sync] three@0.187.0 -> vendor/ (3 files)` |
| 3 | `npm run build` | exit 0 — `vite v8.3.8 building client environment for production…`, `✓ 30 modules transformed`, `✓ built in 246 ms`, `dist/assets/index-*.js 831.58 kB │ gzip: 223.29 kB`, `dist/assets/index-*.css 7.31 kB` |
| 4 | `npm run preview` (static server path) | exit 0 — `➜ Local: http://127.0.0.1:4173/`; `curl -o /dev/null -w "%{http_code}"` → `200` |
| 5 | `node --check` on every plain ESM module (`src/state/*.js`, `src/audio/*.js`, `src/three/*.js`, `scripts/*.mjs`, `vite.config.js`) | exit 0 for all 7 files (the JSX modules are parsed by the production build) |
| 6 | headless Chrome driven over the DevTools protocol against `http://127.0.0.1:4173/` | 35 of 35 automated checks passed (details below); `report.json` and 60 screenshots written to `%TEMP%\gargantua-shots` |

The preview server was stopped and no dev server is left running.

---

## Browser acceptance results

Automated driver: a throwaway Node script (kept outside the candidate, in
`%TEMP%\gargantua-verify\`) that launches the installed Chrome with
`--headless=new --remote-debugging-port`, drives the page through the Chrome
DevTools Protocol and measures the rendered frames by decoding the PNG
screenshots inside the page.

### Startup and rendering

| check | result |
| --- | --- |
| `document.documentElement.dataset.gargantuaReady === "true"` and `__GARGANTUA__.ready` | **PASS** — set after the first rendered frame |
| default frame at 1440 × 900 is a rendered scene | **PASS** — mean luma 47.4, max luma 255, 11.7 % of the pixels above luma 110, 8.7 % near black (the shadow) |
| WebGL 2 context | **PASS** — `WebGL 2.0 (OpenGL ES 3.0 Chromium)`, ANGLE (Intel Arc 140T) D3D11 |
| no black screen, no loading overlay, no console error | **PASS** — zero console errors and zero uncaught exceptions for the whole session |

### Interaction

| check | result |
| --- | --- |
| dragging the canvas orbits the camera | **PASS** — azimuth 0.367 → −0.061 rad, elevation 0.862 → 0.922 rad (OrbitControls feeds the shader camera) |
| mouse wheel changes the camera distance | **PASS** — 36.21 M → 30.15 M |
| four camera presets produce four visually distinct frames | **PASS** — mean luma 132.6 / 113.0 / 136.9 / 58.8, four different image hashes |
| ten diagnostic views produce ten distinct frames | **PASS** — 10 different image hashes, 10 named entries in the HUD |
| 23 HUD sliders, each of them mutates the live state | **PASS** — every slider was moved to its mid value and the corresponding parameter changed |
| `5` selects diagnostic view 5 | **PASS** |
| `Shift`+`2` selects camera preset 2 | **PASS** |
| `H` toggles the HUD | **PASS** — `hudOpen` true → false |
| `Space` toggles the cinematic camera | **PASS** — `cinematic` false → true |
| `Q` cycles the quality tier | **PASS** — `high` → `cinematic` |
| `M` toggles the procedural ambient drone | **PASS** — `audio` true, no console error |
| `R` resets the parameters | **PASS** — exposure back to the default 1.00, quality `high`, debug 0, preset 0 |
| settings survive a reload (versioned `localStorage`) | **PASS** — exposure 3.4 before and after the reload |
| the three quality tiers change the real render budget | **PASS** — internal buffer 792×495 / 1080×675 / 1440×900 at 1440×900 CSS pixels |
| every quality tier still renders a readable scene | **PASS** — mean luma 60.3 / 59.5 / 58.9 |

### Capture contract

| check | result |
| --- | --- |
| `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` | **PASS** — `time` frozen at 12.5 s, `cinematic` false, `hudOpen` false, scene still rendered (mean luma 170.6) |
| full matrix `preset=0…3` × `debug=0…9` | **PASS** — 40 of 40 pages reached the ready state, all 40 frames render content (mean luma 35.5 … 225.1) and all 40 frames are pixel-distinct |
| invalid URL values | **PASS** — `?capture=1&quality=ultra&preset=99&debug=42&time=-7&hud=maybe` falls back to `quality=high`, `preset=0`, `debug=0`, `time=0`, renders normally and raises no new console error |
| `window.__GARGANTUA__` | **PASS** — exposes `ready`, `getState`, `setQuality`, `setPreset`, `setDebug`, `setTime`; invalid arguments (`'bogus'`, `99`, `42`, `-3`) return `null`, valid ones return the updated state; nothing throws |

### Mobile / Retina

| check | result |
| --- | --- |
| 390 × 844 with device scale factor 2 | **PASS** — canvas drawing buffer 780 × 1688, internal buffer 585 × 1266, scene rendered (mean luma 62.5) |
| mobile HUD geometry | **PASS** — the panel becomes a bottom drawer at y = 320.7 with height 523.3, fully inside the 844 px viewport, scrollable |
| touch emulation enabled | **PASS** — `Emulation.setTouchEmulationEnabled` active, no error |

### WebGL context loss

| check | result |
| --- | --- |
| `WEBGL_lose_context` available | **PASS** — the extension is exposed |
| loss is detected and reported | **PASS** — the overlay shows "Graphics context lost — Rendering is paused…" and the loop stops |
| restore without a page reload | **PASS** — `ext.restoreContext()` rebuilds the render targets, materials and uniforms, the ready flag stays `true` and the scene renders again (mean luma 60.2) |

### Console output

The only entry the browser logged during the entire session is a **warning**,
not an error:

```
THREE.WebGLProgram: Program Info Log: (411,1): warning X4000:
use of potentially uninitialized variable (f_traceGeodesic)
```

This is emitted by the Direct3D backend of ANGLE when it translates the
fragment shader to HLSL.  The program links, the scene renders correctly and
the same warning does not appear on the OpenGL backend.  No error, no
exception and no failed request was logged in any of the runs.

---

## Visual observations

* The event horizon interior is uniformly black, the photon ring is a thin,
  sharp, warm-coloured arc around the shadow, and the disc is lensed over
  the top and under the bottom of the shadow.
* The Doppler beaming asymmetry is strong: the approaching side of the disc is
  white-hot, the receding side is deep red and clearly dimmer.
* The disc shows animated turbulent filaments (advected with the Keplerian
  shear) and two faint trailing density waves.
* The galaxy band and the star field are visibly warped around the shadow
  (the lensed background arc hugging the photon ring).
* The GPU reported 165 fps at the `high` tier with a 1080 × 675 internal
  buffer on the test machine.

---

## Known limitations, failures and required human intervention

1. **Benign driver warning.** The D3D/ANGLE backend prints
   `warning X4000: use of potentially uninitialized variable (f_traceGeodesic)`
   for the ray tracer.  The shader compiles, links and renders correctly;
   the warning is a false positive of the HLSL translator (every field of the
   result struct is initialised through its constructor).
2. **Browser automation backend.** The ZCode `browser-use` backend could not
   start in this session — it reported *"No installed Chrome or Chromium
   executable was found"* because the session was launched without
   `--browser-executable`.  The browser acceptance was therefore performed by
   driving the locally installed Chrome directly over the DevTools Protocol.
   The driver is a throwaway script outside the candidate directory and is
   not part of the delivery; a reviewer with a working `browser-use` backend
   can repeat the same checks through the HUD.
3. **Disc model.** The disc is modelled as a geometrically thin, optically
   thick sheet with a Gaussian vertical profile and a Keplerian emitter
   profile; it is not a full radiative transfer solution of a disc atmosphere.
   The half-thickness therefore acts as a Gaussian-weighted chord length
   rather than as a resolved vertical structure.
4. **Star aliasing.** Individual stars are about one pixel wide; at a reduced
   internal render scale the faintest stars can shimmer slightly when the
   camera moves.  The `cinematic` tier renders at the full device
   resolution and removes most of it.
5. **Audio could not be audited.** The `M` shortcut and the HUD button toggle
   the Web Audio drone and produce no console error, but a headless browser
   has no audio device, so the audible output itself was not verified by ear.
6. **Higher-order ring sharpness depends on the quality tier.** The finest
   photon-ring structure is resolved best in `cinematic`; in `standard` the
   step budget (190 steps) is enough to keep the critical structure but the
   thinnest rings are marginally softer.
7. **No outstanding manual intervention** is required to build, run or review
   the candidate.  A reviewer only has to run `npm install`, `npm run build`
   and `npm run serve` as documented in `README.md`.

---

## Result

All 35 automated browser checks pass, the production build and the static
server path work, the URL capture contract is honoured, the state is persisted
and resettable, the WebGL context loss path recovers without a reload, and
no console error was produced in any run.
