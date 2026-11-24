# GARGANTUA — Schwarzschild Black Hole Raytracer: Verification & Result Report

## Run Metadata

- **Model Identifier:** `gemini-4-neon:xhigh`
  - *Prompt discrepancy note:* The run header and isolated run directory specify `gemini-4-neon:xhigh`, while a later paragraph of the prompt text contained `glm-5.4:max`. Both are noted transparently here; please confirm with the evaluation curator if a different identifier is expected for downstream indexing.
- **Harness:** Antigravity CLI (`antigravity-cli`, Windows / PowerShell) — *please confirm if the curator uses a different canonical harness label.*
- **Starting `main` Commit SHA:** `1d1fcb9e1d745cca9a36285df78555dede277136`
- **Runtime Environment:** Windows, Node.js `v24.21.0`, npm `11.19.0`, Google Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`, `--headless=new`, WebGL2 + `RGBA16F` `EXT_color_buffer_float`)
- **Candidate Solution Path:** `tasks/gargantua-schwarzschild-raytracer/solution/`

## Local Vendor & Packaging Audit

- Local Three.js ESM files committed under `vendor/three/` (copied verbatim from official `three@0.174.0`, MIT License; see [`vendor/README.md`](vendor/README.md)):
  - `vendor/three/three.module.js` (570,357 bytes)
  - `vendor/three/three.core.js` (1,126,149 bytes)
  - `vendor/three/addons/controls/OrbitControls.js` (32,471 bytes)
  - `vendor/three/LICENSE` (1,081 bytes)
- `three` is not installed in `node_modules/`; `vite.config.js` aliases `three` directly to `vendor/three/three.module.js`, and `GargantuaEngine.js` imports `OrbitControls` directly from `vendor/three/addons/controls/OrbitControls.js`.
- `package-lock.json` is committed cleanly; `node_modules/` and `dist/` are excluded via `.gitignore`.
- Zero remote CDN assets, fonts, textures, HDRIs, audio files, or API requests at runtime (verified via Chrome DevTools Protocol `Network.requestWillBeSent` audit: `externalRequests: []`, `failedRequests: []`).

## Commands Executed & Observed Results

| # | Command | Exit Code | Observed Result |
| --- | --- | --- | --- |
| 1 | `npm --prefix tasks/gargantua-schwarzschild-raytracer/solution install` | `0` | Installed 65 packages (`react`, `react-dom`, `vite`, `@vitejs/plugin-react`), generated `package-lock.json`, 0 vulnerabilities. (Initial sandboxed attempt failed with `ENOTFOUND registry.npmjs.org` due to sandbox network isolation; succeeded outside sandbox.) |
| 2 | `npm pack three@0.174.0 --pack-destination <scratch>` + copy ESM build & `OrbitControls.js` to `vendor/three/` | `0` | Extracted official `three@0.174.0` (`shasum 53f46d6fd27515231b2af321f798f1e0ecf3f905`) into `vendor/three/`. |
| 3 | `npm --prefix tasks/gargantua-schwarzschild-raytracer/solution run build` | `0` | Clean zero-warning Vite production build in `846ms`: `dist/index.html` (`1.03 kB`), `dist/assets/index-Dsz3YWVv.css` (`9.93 kB`), `dist/assets/index-Cqdjfkdc.js` (`333.33 kB`), `dist/assets/vendor-three-CWRh5IER.js` (`462.83 kB`). |
| 4 | `npm --prefix tasks/gargantua-schwarzschild-raytracer/solution run build -- --base /subpath-check/ --outDir dist-subpath-check` | `0` | Built in `850ms`; verified generated `dist-subpath-check/index.html` rewrites module/preload/CSS URLs to `/subpath-check/assets/...`. Temporary output directory deleted after verification. |
| 5 | `npx vite preview --host 127.0.0.1 --port 4173 --strictPort` (started, probed via `fetch('http://127.0.0.1:4173/')`, then killed in the same command) | `0` | Observed `PREVIEW_HTTP_STATUS=200 HAS_TITLE=true`, process cleanly terminated. |
| 6 | Automated headless Chrome CDP verification suite (`scratch/verify.mjs`) serving `dist/` via ephemeral local HTTP server (`127.0.0.1:50798`), inspecting screenshots & closing browser + server on exit | `0` | All automated checks passed with `0` console errors, `0` page errors, `0` external network requests, and `0` failed requests. |

## Browser & Visual Acceptance Results

### 1. Desktop Default First Frame (`1440 × 900`, DPR `1`)
- Loaded base URL cleanly with zero black screen, zero loading stall, and zero console errors.
- `document.documentElement.dataset.gargantuaReady === "true"` and `window.__GARGANTUA__.ready === true`.
- Confirmed WebGL2 HDR `RGBA16F` render pipeline (`1224×765` internal raytrace resolution at `High` quality, `220` RK4 steps, `5` volumetric disk sub-samples, `4` bloom mips, ~48 FPS observed live).
- Visual screenshot inspection verified: pitch-black event horizon core, crisp luminous multi-order photon ring hugging the critical boundary, primary front disk with Doppler brightening on the approaching left side and fiery amber-copper redshift on the receding right side, upper and lower gravitationally lensed disk arches, curved Einstein star arcs, tilted procedural Milky Way band, and non-occluding glass HUD.

### 2. Deterministic Capture URL Contract
- Tested `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` at `1440 × 900`:
  - Applied before the first capture-ready frame: `ready: true`, `capture: true`, `quality: "high"`, `preset: 0`, `debug: 0`, `time: 12.5`, `hudVisible: false`, `cinematicMode: false`, `audioEnabled: false`.
  - Confirmed `.hud-root` is absent from DOM (`hudPresent: false`).
  - Confirmed simulation clock remains strictly frozen (`time: 12.5` after 350ms wait).
  - Confirmed reloading the exact same URL yields bit-identical canvas PNG output (`deterministicPixelIdentical: true`).
- Tested invalid URL fallback `?capture=1&quality=ultra&preset=99&debug=-4&time=-10&hud=nope`:
  - Zero exceptions, `ready: true`, safely recovered to `quality: "high"`, `preset: 0`, `debug: 0`, `time: 0`, `hudVisible: true`.
- Tested invalid calls to `window.__GARGANTUA__` (`setQuality('ultra')`, `setPreset(9)`, `setDebug(-1)`, `setTime(-5)`, `setTime(NaN)`):
  - All cleanly returned `{ ok: false, error, state }` without throwing unhandled exceptions.

### 3. Camera Presets (`0`–`3`) & Diagnostic Debug Views (`0`–`9`)
- Verified all 4 presets (`Gargantua Hero`, `Photon Ring Grazing`, `Polar Vortex`, `Einstein Wide Field`) produce visually distinct compositions via both HUD/`Shift+1..4` and `window.__GARGANTUA__.setPreset(0..3)`.
- Verified all 10 debug modes (`0` Final Composite, `1` RK4 Steps & Termination, `2` Event Horizon & Critical Contours, `3` Curved-Path Disk Crossings & Image Order 1st/2nd/3rd+, `4` Relativistic Frequency Shift `g`, `5` Gravitational Deflection & Winding, `6` Lensed Celestial Coordinates, `7` Procedural Starfield & Milky Way Isolation, `8` Disk Rest-Frame Emission & Turbulence, `9` Pre-Post-Process Linear HDR EV Map) render distinct, physically meaningful diagnostic frames without post-processing corruption on modes `1`–`9`.

### 4. Interactive Controls, 21 Parameters, Quality Tiers & Versioned Persistence
- Confirmed all 21 required parameter sliders exist in DOM (`sliderCount: 21`), are labeled with live numeric values and usable ranges, and directly update camera or shader uniforms.
- Confirmed real `OrbitControls` mouse drag + wheel zoom modifies camera position/spherical parameters (`orbitChangedCamera: true`) and smoothly pauses the cinematic camera loop (`orbitPausedCinematic: true`) without fighting user control.
- Confirmed keyboard shortcuts `Shift+2`, `3`, `0`, `Space`, `Q`, and `H` all execute synchronously and update engine + HUD state.
- Confirmed versioned `localStorage` persistence (`gargantua.raytracer.state`, `version: 1`) preserves modified parameters (`diskTemperature: 9800`, `bloomIntensity: 0.92`, `starDensity: 1.75`, `fov: 58`), `quality: "cinematic"`, and `debug: 4` across full page reload; clicking the visible Reset button restores all defaults (`diskTemperature: 5800`, `quality: "high"`, `debug: 0`) and clears `localStorage`.
- Confirmed real rendering-budget scaling across all three quality tiers at `1440 × 900`:
  - `Standard`: `936×585` (`0.65×`), `140` max RK4 steps, `3` disk sub-samples, `3` bloom mips.
  - `High`: `1224×765` (`0.85×`), `220` max RK4 steps, `5` disk sub-samples, `4` bloom mips.
  - `Cinematic`: `1440×900` (`1.00×`), `320` max RK4 steps, `7` disk sub-samples, `5` bloom mips.

### 5. Mobile & Retina Viewport (`390 × 844`, Device Scale Factor `2`)
- Loaded cleanly with zero console errors; defaults to `Standard` quality (`dpr: 1.5` cap, `585×1266` canvas backing, `380×822` internal HDR raytrace target, ~56–59 FPS observed live).
- HUD drawer starts collapsed (`hudExpanded: false`), leaving the full black hole, photon ring, and sweeping accretion disk centered and unobstructed; tapping the top-right toggle cleanly opens the slide-up controls drawer (`drawerOpened: true`).

### 6. WebGL Context Loss & Restoration (`WEBGL_lose_context`)
- After setting custom live state (`preset: 1`, `diskTemperature: 9200`, `quality: "high"`), invoked `gl.getExtension('WEBGL_lose_context').loseContext()`:
  - Rendering paused cleanly without page reload; `gargantuaReady` flipped to `"false"`, `contextLost: true`, `.context-lost-overlay` displayed preserved state (`preset: 1`, `diskTemperature: 9200`).
- Invoked `restoreContext()`:
  - Engine rebuilt `WebGLRenderer`, fullscreen geometry, all 5 GLSL3 `ShaderMaterial`s, `RGBA16F` HDR scene target, and 4-mip Bloom pyramid; restored preserved camera/disk state (`preset: 1`, `diskTemperature: 9200`), removed the overlay, resumed rendering (`48fps`, non-black restored black hole visually confirmed in screenshot), and set `gargantuaReady = "true"` with zero console errors.

## Known Limitations & Required Human Intervention

- **Touch pinch-zoom gesture testing:** Headless Chrome CDP verified mobile layout (`390×844`, DPR `2`), drawer interaction, and desktop mouse/wheel `OrbitControls`; physical multi-touch pinch gestures on a real mobile touchscreen were not exercised directly (handled natively by upstream Three.js `OrbitControls.js` with `touch-action: none` on the canvas).
- **Audio playback audit:** The optional procedural Web Audio drone (`M` shortcut) defaults to muted to prevent browser autoplay errors and is disabled in `capture=1` mode; audible speaker output verification requires human listening on an audio-enabled host.
- **Metadata confirmation (human curator):** Please confirm (1) whether `RESULTS.md` should keep `gemini-4-neon:xhigh` as the authoritative model identifier (given the prompt's conflicting mention of `glm-5.4:max`), and (2) the canonical harness string if different from `Antigravity CLI`.
- **Clean shutdown:** All verification servers and headless Chrome processes were terminated upon completion; no background dev/preview servers remain running.
