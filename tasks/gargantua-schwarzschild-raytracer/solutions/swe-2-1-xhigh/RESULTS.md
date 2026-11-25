# RESULTS — GARGANTUA Schwarzschild Black Hole Raytracer

## Identity

- **Model identifier**: `swe-2-1:xhigh` (exactly as provided by the operator)
- **Harness**: `omp` (confirmed with the operator; agent runtime with eval/browser tooling)
- **Starting `main` commit SHA**: `77634cacab5cb5e5f725e861d1c53052a16f0b9a`
- **Environment**: Windows 11 (win32 x64), Node.js v24.21.0, npm 11.19.0,
  Chromium browser (omp relay browser) for acceptance

## Commands actually run and their results

| Command | Result |
| --- | --- |
| `npm install` | PASS — 66 packages added, `package-lock.json` generated. One benign npm warning: esbuild postinstall script not yet covered by allowScripts; `node_modules/.bin/esbuild --version` printed `0.28.2`, so the binary works and builds succeed |
| `npm run build` | PASS — `vite build` exits 0; output `dist/index.html` + `dist/assets/index-*.js` (~770 kB, gzip ~210 kB) + `index-*.css`. Run repeatedly during development; final build PASS |
| `npx vite build --base=/sub/ --outDir dist-custom` | PASS — `--base` and `--outDir` honored; assets emitted to `dist-custom/` with correct rewritten paths (directory removed after check) |
| `npx vite preview --port 4191 --strictPort` | PASS — static preview of `dist/` served all acceptance checks below. (Port 4173 was already occupied by an unrelated process on this machine, so 4191 was used.) |
| Browser acceptance base URL `http://localhost:4191/` | PASS — see below |

All checks were run against the **production build** served by the static preview,
never against a dev server.

## Browser acceptance results

### Desktop (default Chromium window, 1349×673 CSS px observed viewport)

- **First paint**: black-hole scene visible immediately; no black screen, no stuck
  loading overlay (there is no loading overlay at all). PASS
- **Console errors / failed requests / page errors**: none observed across repeated
  loads (listeners attached for `console error`, `pageerror`, `requestfailed`). PASS
- **Visual structure**: deep-black shadow interior, thin bright photon ring,
  Doppler-beamed accretion disk (approaching side bright blue-white, receding side
  dim), far-side disk arcs lensed above/below the shadow, turbulent filaments,
  procedural lensed starfield with visible Einstein-ring compression of the
  background. PASS (visually inspected screenshots)
- **OrbitControls**: mouse drag changes azimuth/elevation (−95°, 4° → −36.2°, −25.4°
  after a drag), wheel zoom changes distance (13.5 → 10.55); the shader view updates
  because the camera state feeds the fragment shader uniforms every frame. PASS
- **Presets**: Shift+2 applied Edge-On (preset index 1, camera −95°/4°/13.5 rs);
  all four presets captured via URL matrix are visually distinct. PASS
- **Cinematic loop**: playing by default, camera pose visibly evolves (two frames 3.5 s
  apart differ); any drag ends it and control stays with the user; Space re-enables it. PASS
- **Keys**: `H` hides/shows HUD, `Q` cycles quality (high → cinematic), `R` resets
  parameters (diskTemp 2.0 → 1.0), `Space` toggles cinematic, digits `0`–`9` switch
  debug views, `Shift+1`–`Shift+4` apply presets. All verified via dispatched key
  events with correct `shiftKey` handling. PASS
- **HUD**: shows quality tier, debug view number + description, cinematic state,
  preset name, all shortcuts, 21 sliders each with per-control reset, global reset
  button. PASS
- **Persistence**: `diskTemp` set to 1.8 and camera dragged, reload → values restored;
  reset control returns defaults. PASS
- **Quality tiers**: canvas backing store measured 836×417 (standard) / 1147×572
  (high) / 1349×673 (cinematic) at the same window size; geodesic step budget
  144/208/320 and max disk crossings 2/3/4 wired to uniforms; frame rate ~59–60 fps
  at all three tiers on this machine (vsync-capped). PASS
- **Resize / DPR**: canvas resizes on window changes; `devicePixelRatio` capped at 2
  and multiplied into the internal scale. PASS (code path + mobile emulation below)

### Mobile emulation (390×844, deviceScaleFactor 2, touch, iPhone UA)

- Scene renders correctly; no black screen, no console errors. PASS
- Bottom-drawer HUD: collapsed by default, `☰ controls` button opens it, sliders
  and sections scrollable and usable. PASS
- Touch orbit input goes through OrbitControls' own touch handlers (same code path
  as pointer input verified on desktop). PASS with the caveat that drag emulation
  used mouse events rather than a true touchscreen.

### URL capture contract

- `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`:
  `document.documentElement.dataset.gargantuaReady` becomes `"true"`, `time` reads
  back exactly 12.5, `capture: true`, `cinematic: false`, HUD fully absent (including
  the peek button). PASS
- Determinism: repeated screenshots of the same frozen URL are pixel-identical
  (two screenshots ~1.5 s apart compared equal); capture mode does not write to
  `localStorage` and ignores persisted state entirely. PASS
- Invalid values `quality=bogus&preset=99&debug=42&time=abc`: page still becomes
  ready and renders; state falls back to defaults (`quality: high`, `debug: 0`,
  `time: 0`); no exception, no black screen. PASS
- `window.__GARGANTUA__`: `ready` getter works; `setQuality/setPreset/setDebug/setTime`
  return updated state for valid input (`standard`, preset 2, debug 4, time 7.25
  verified) and `null` without throwing for invalid input (`ultra`, 9, 11, −5). PASS
- API mutations re-render the frozen capture frame (debug 3 screenshot shows the
  crossing-order view after `setDebug(3)`). PASS
- Capture matrix `preset=0..3` at `debug=0, time=12.5, hud=0`: four visually distinct
  screenshots (portrait incline, edge-on, polar, photon-ring closeup). PASS

### Debug views

`0`–`9` all render. Individually verified distinct and meaningful: 3 (crossing count —
green primary/orange secondary/black none), 4 (redshift — blue approaching/red
receding disk halves), 1 (integration cost/termination), 9 (impact parameter), plus
2/5/6/7/8 exercised during development. Diagnostic views attenuate bloom so the
encoding stays legible. PASS

### WebGL context loss / restore

Using the `WEBGL_lose_context` extension (available in the test browser):

- `loseContext()` → rendering pauses, the "WebGL context lost" overlay appears. PASS
- `restoreContext()` → overlay disappears, renderer/composer/materials rebuilt
  in place, persisted+in-memory state survives (`diskTemp` 1.8 intact), final image
  renders again without page reload. PASS

## Known limitations / deviations

1. **No ambient music.** Audio is optional per the task; it was deliberately omitted,
   so there is no `M` key and no autoplay risk of any kind.
2. **Integrator formulation.** The geodesic integration uses the exact planar
   reduction of Schwarzschild null geodesics (Binet-equation-equivalent Cartesian
   force law with conserved h²), not a full 8-component Christoffel integration.
   This is a mathematically traceable, documented coordinate form (documented in
   the shader header) and reproduces the exact photon sphere at 1.5 rs and critical
   impact parameter (3√3/2) rs; the affine reparametrization difference does not
   affect the path geometry the image depends on.
3. **Numerical critical structure.** Rays asymptotically close to the critical
   impact parameter decohere after finite winding because of finite integration
   steps; they terminate on the step budget as the pinch part of the critical
   structure (flagged in debug view 1). This is the expected numerical behavior of
   any explicit integrator, but the infinitely thin ideal photon ring is approached,
   not exact.
4. **Disk model.** The disk is a slab whose mid-plane crossings are exactly
   integrated and bisected along the curved path; emission uses a local-flat
   emitter-frame approximation for Doppler/redshift reconstruction (standard for
   this class of renderer) and a blackbody-inspired (not Planck-exact) color curve.
5. **Mobile acceptance** used Chromium device emulation (390×844, DSF 2) rather
   than a physical phone.
6. **Frame rate** is vsync-capped at ~60 fps at all quality tiers on the test
   machine, so tier cost differences are proven by resolution/step budgets, not by
   fps divergence.

## Human intervention required

None for installation, build, preview, or operation. No accounts, keys, or network
services are involved anywhere in the project.
