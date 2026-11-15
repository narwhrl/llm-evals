# RESULTS — GARGANTUA Schwarzschild Raytracer

- Model identifier: `magpie/opencode-go/hy4:high`
- Harness: `ZCode`
- Starting `main` commit: `1d1fcb9e1d745cca9a36285df78555dede277136`
  (`git rev-parse HEAD` executed in the run folder)
- Run date: 2026-11-15
- Environment: Windows 11 (win32 10.0.26300 x64), Node v24.21.0, npm 11.19.0,
  Chrome 157.0.8103.52, headless WebGL2 via ANGLE D3D11 (Intel Arc 140T GPU).
  `EXT_color_buffer_float` and `WEBGL_lose_context` are available. SwiftShader
  (`--use-angle=swiftshader`) was also probed and supports WebGL2, half-float
  render targets and `WEBGL_lose_context`.

## Commands actually executed

| Command | Exit | Observed result |
| --- | --- | --- |
| `git rev-parse HEAD` | 0 | `1d1fcb9e1d745cca9a36285df78555dede277136` |
| `npm install --no-audit --no-fund` | 0 | 150 packages added; `package-lock.json` written/updated. npm 11.19 printed an `install-scripts` warning that `esbuild@0.28.2`'s postinstall is not on its allow-list; `esbuild` resolves its platform binary and every build/lint/verify step succeeds (see limitations). |
| `npm ci --no-audit --no-fund` | 0 | Clean reinstall from the lockfile (150 packages), then `npm run build` succeeded again. |
| `npm run vendor` | 0 | `vendor/` regenerated from pinned `three@0.180.0`; `OrbitControls.js` import rewritten to `./three.module.js`. |
| `npm run build` | 0 | `dist/index.html` (0.96 kB), `dist/assets/index-*.css` (8.88 kB), `dist/assets/index-*.js` (~739 kB, gzip ~201 kB). Vite prints an informational `chunks larger than 500 kB` warning because Three.js is bundled by design. |
| `npm run lint` | 0 | ESLint flat config over `src/` and `scripts/`: 0 errors, 0 warnings. |
| `npm run check` | 0 | 35 static integrity checks, `ALL CHECKS PASSED` (packaging, offline vendor, shader physics/architecture, 21 wired parameters, quality budgets, automation contract). |
| `npm run dev` (Vite, port 5199) | 0 | `http://127.0.0.1:5199/` → 200; `/src/main.jsx` → 200 `text/javascript`. Server stopped. |
| `npm run preview` (Vite preview, port 4174) | 0 | `/` → 200; built `assets/index-*.js` → 200 `text/javascript`. Server stopped. |
| `npm run serve` (used by verify on port 4187) | 0 | Dependency-free `node:http` static server: `/` → 200 with local hashed assets, no remote URLs. Server stopped by the verify script. |
| `npm run verify` | 0 | `ALL BROWSER CHECKS PASSED` — 39 assertions, 0 console/page errors, 0 remote requests. Full log: `evidence/verify-log.txt`, machine-readable: `evidence/verify-report.json`. |

Full build, static-server, dev-server, lint, check and verify commands were run
again after the final source edits; the results above are from that final run.

## Browser acceptance

- **Desktop 1440 × 900, DPR 1, clean context.** `data-gargantua-ready="true"`
  and `window.__GARGANTUA__.ready === true` after shader compile, first render
  and URL application. First frame is a stable full scene (no black screen, no
  stuck loading overlay): `sampleFrame()` mean luminance 67.8, std 64.3,
  dark fraction 0.086, bright fraction 0.096. HDR half-float pipeline active,
  internal buffer 1267 × 792. Screenshot: `evidence/desktop-1440x900.png`.
- **HUD.** 21 range sliders, 4 preset buttons, 3 quality buttons, 10 debug
  buttons and 7 shortcut rows present. Right-side panel leaves the central
  photon ring / shadow unobstructed.
- **Interactions.** Orbit drag changed azimuth 2.19° → −30.54° and cleared the
  active preset; wheel zoom changed distance 14.05 → 11.58; `Shift+1`…`Shift+4`
  applied all four presets; `Space` toggled the cinematic loop; `H` toggled the
  HUD; `Q` cycled quality; all `0`–`9` debug views applied and produced distinct
  non-uniform diagnostics; `R` restored defaults.
- **State.** Invalid API inputs (`setDebug(99)`, `setQuality('bogus')`,
  `setPreset(7)`, `setTime(-1)`, `setTime(NaN)`) were rejected without
  exceptions; `setTime(12.5)` and `setDebug(4)` were accepted. Quality tiers
  reported distinct budgets (`maxSteps` 120 / 190 / 280, plus distinct
  renderScale, diskSamples, bloomLevels). Changed parameters, quality, debug
  and HUD survived a reload from versioned `localStorage`
  (`gargantua.state.v3`, `version === 3`); visible reset returned defaults.
- **Mobile 390 × 844, DPR 2, touch enabled.** Ready, DPR capped at 1.25 for
  the `standard` tier, internal buffer 341 × 738, non-black structured frame
  (mean 73.7, std 62.8). HUD starts as a collapsed drawer and opens from the
  tab. One-finger CDP touch drag changed azimuth 1.99° → 3.11° (OrbitControls
  touch path). Resize to 500 × 900 rebuilt render targets (341 → 437).
  Screenshot: `evidence/mobile-390x844.png`.
- **Console / network.** 0 `console.error`, 0 uncaught page errors, 0 failed
  requests, 0 requests to non-local hosts. The favicon is an inline SVG data
  URI, so no 404 is produced.

## Capture URL checks

- `?capture=1&quality=high&preset=P&debug=0&time=12.5&hud=0` for P = 0…3:
  ready before capture, `capture === true`, `frozen === true`, exact `time =
  12.5`, `cinematicPlaying === false`, correct preset/quality/debug/HUD state,
  non-black frames, and **bit-identical statistics across two consecutive
  renders** (mean/std equal within 1e-6). Screenshots:
  `evidence/capture-preset-0.png`, `evidence/capture-preset-1.png`.
- `?capture=1&quality=standard&preset=0&debug=D&time=3&hud=0` for D = 0…9:
  every debug index applied, each produced a distinct non-uniform frame
  (std 12.8 … 65.9). Example: `evidence/capture-debug-3.png` shows ordered
  primary/secondary/higher-order disk images in distinct colours.
- Invalid query
  `?capture=1&quality=bogus&preset=99&debug=42&hud=x&time=-5` fell back to
  `quality=high`, `preset=0`, `debug=0`, `hudOpen=true`, `time=0`, reported all
  five `invalidKeys`, stayed ready and rendered a valid frame.
- `?capture=1` without `time` froze at `0`. `window.__GARGANTUA__` setters
  (`setDebug(4)`, `setQuality('cinematic')`, `setPreset(2)`, `setTime(7.25)`)
  validated and updated state; `ready` is a read-only getter.

## WebGL context recovery

`WEBGL_lose_context` is exposed in this environment, so the recovery path was
actually exercised (not merely claimed):

1. `simulateContextLoss()` → `loseContext()` → `webglcontextlost`: the render
   loop paused, `getState().contextLost === true`, and the recoverable overlay
   `#context-overlay` became visible.
2. `restoreContext()` → `webglcontextrestored`: materials, render targets and
   geometry were rebuilt, persisted state reloaded, shader programs
   recompiled, and rendering resumed **without a page reload**.
   Frames advanced 2 → 4, recovered frame std 66.2, ready stayed true, quality
   / preset / debug and `storageOk` survived. Screenshot:
   `evidence/context-restored.png`.
3. No console errors were produced by the loss/restore cycle.

## Issues found and fixed during this run

- Two browser checks failed on the first full `npm run verify`:
  `Shift+1`…`Shift+4` presets were cleared by leftover OrbitControls damping
  `change` events, and the context-lost overlay stayed visible because the
  engine emitted `'restored'` while the HUD only hid it on `'ok'`. Both were
  fixed at the root cause (flush damping on programmatic camera changes; move
  `preset = null` to the controls `start` event; map `'restored'` to `'ok'`).
  The final verification run has 0 failures.
- Visual tuning: initial renders had an over-dominant smooth galaxy band and a
  visible value-noise lattice on the disk. Fixed with quintic interpolation,
  per-octave rotated fBm domains, finer integration steps, more disk
  sub-samples, and rebalanced emission/turbulence/galaxy defaults. A favicon
  data URI removed the only 404.

## Known limitations, failures and human intervention

- **No functional failures remain.** No human intervention is required.
- `npm 11.19.0` prints an `install-scripts` warning that `esbuild`'s
  postinstall is not on its allow-list in this sandbox. `esbuild` works through
  its platform package; install, build, lint and verify all succeed. This is an
  environment policy warning, not a code failure.
- Vite reports an informational chunk-size warning (>500 kB) because the
  vendored Three.js ESM build is bundled into one chunk. No code splitting was
  added; it is not a build error.
- HDR uses half-float render targets when `EXT_color_buffer_float` is present.
  Without that extension the pipeline falls back to LDR targets and reports
  `hdr: "unsigned-byte"` plus a warning in `getState()`; bloom/ACES still run
  but with clipped highlights.
- The integrator follows the exact spatial curve of Schwarzschild null
  geodesics; `λ` is a path parameter rather than a physical affine parameter.
  The disk is an optically thin emissive slab (2–4 sub-samples per crossing),
  not a full radiative-transfer solution. Bloom uses a fixed small Gaussian
  pyramid; ACES is the explicit Narkowicz filmic fit.
- Optional procedural ambience is off by default, created only on a user
  gesture, disabled in capture mode, and was not exercised by the automated
  acceptance run (audio is optional per the task).
- Verification used hardware ANGLE D3D11 WebGL2; SwiftShader was probed as a
  compatible fallback. On a GPU-less host, first-frame times will be longer,
  but the same WebGL2 features are available.
- All dev servers, static servers, preview servers and browser pages started
  during verification were stopped. Ports 4173, 4174, 4187–4192 and 5199 were
  checked closed after the run.
