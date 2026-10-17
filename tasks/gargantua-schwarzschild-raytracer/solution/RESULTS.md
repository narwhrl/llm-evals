# GARGANTUA — Candidate Result Report

## Identity

| Field | Value |
| --- | --- |
| Candidate | `deepseek-v4.1-flash` |
| Model | `deepseek-v4.1-flash` (harness runtime identifier: `deepseek/deepseek-flash`) |
| Task | `gargantua-schwarzschild-raytracer` |
| Starting `main` commit | `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1` |
| Candidate path | `tasks/gargantua-schwarzschild-raytracer/solution/` |
| Working tree | `.worktrees/gargantua-deepseek-v4.1-flash` (detached at the baseline) |
| Run date | 2026-10-17 |
| Browser | Chrome 153.0.0.0 on Windows 10.0.26200 x64 |
| GPU / host | Intel Arc 140T (48 GB), ANGLE Direct3D11; 16 logical cores; 32 GB RAM |

This report describes only commands and browser scenarios that were actually
executed. The final candidate source commit and archive tag are recorded in
`imports.json` on `llm/gargantua-schwarzschild-raytracer`.

## Commands and observed results

| # | Command | Exit | Result |
| --- | --- | ---: | --- |
| 1 | `npm install --no-audit --no-fund` | 0 | Created the pinned install; 20 packages. |
| 2 | `npm ci --no-audit --no-fund` (first attempt, preview server running) | 1 | `EPERM` unlinking `node_modules/@rolldown/binding-win32-x64-msvc/rolldown-binding.win32-x64-msvc.node`; the running Vite preview process held the native binding open. |
| 3 | Stop the preview server, then `npm ci --no-audit --no-fund` | 0 | `added 20 packages in 4s`; lockfile installs cleanly. |
| 4 | `npm run build` | 0 | `dist/index.html` 1.09 kB, CSS 13.17 kB (gzip 3.58 kB), JS 825.93 kB (gzip 222.09 kB). Vite emitted only its >500 kB chunk advisory (bundled Three.js), no error. |
| 5 | `npm run preview -- --host 127.0.0.1 --port 4174` | 0 | Served the production `dist/` at `http://127.0.0.1:4174/`; used for every browser check; stopped before delivery. |
| 6 | `ffmpeg` PSNR, `time=12.5` vs `time=20` capture | 0 | Average 22.33 dB, confirming the frozen capture time changes the disk turbulence frame. |

The first `npm ci` failure was an environmental Windows file lock, not a
lockfile defect. It disappeared after the preview server was stopped and the
same command then succeeded.

## Browser acceptance

Desktop viewport: `1440 × 900`, device scale factor 1. Mobile viewport:
`390 × 844`, device scale factor 2, touch emulation enabled. Tests ran in a
foreground-chrome tab with focus emulation (`Page.bringToFront`); see the
background-tab limitation below.

### Ready state, console and network

- Base URL loaded with `document.documentElement.dataset.gargantuaReady === "true"`.
- The first composite was visible; the boot overlay was hidden; no stuck loader.
- Console collector across the full interaction run: **0 errors, 0 warnings**.
- Network capture for a clean capture load contained only:
  - `http://127.0.0.1:4174/` (HTML),
  - `.../assets/index-*.js`,
  - `.../assets/index-*.css`,
  - one `chrome-extension://.../injected.js` injected by the browser extension.
- No CDN, remote texture, HDRI, font, audio or API request was observed.

### Interaction suite — 30/30 checks passed

The complete machine-readable run is `evidence/acceptance-report.json`.

- Desktop load at 1440×900: ready, quality `high`, preset `Observer`, debug `0`,
  HUD open, 21 `[data-param]` controls present.
- Cinematic loop advances camera; `Space` pauses it while simulation time keeps
  advancing; `Space` resumes it.
- `H` hides/shows the HUD.
- `Shift+2` selects the Edge-on preset and the camera settles at azimuth 122°,
  elevation 2.5°, distance 25 M, FOV 43°.
- `Q` cycles standard → high → cinematic; measured internal targets were
  893×558 (standard), 1181×738 (high), 1440×900 (cinematic) at a 1440×900
  DPR-1 viewport.
- Mouse orbit changed the camera (azimuth 122° → 98.0°, elevation 2.5° → 14.5°)
  and switched the mode from preset hold to manual (`preset: -1`, playing
  `false`).
- Wheel zoom changed the camera distance from 25.0 M to 20.59 M.
- Representative camera/disk/sky/post changes updated state:
  FOV 60, disk temperature 9000 K, star density 2, bloom 1.5, exposure 1.25.
- Reload restored those parameters from the versioned `localStorage` payload.
- `R` restored all defaults: FOV 48, 5600 K, star density 1, bloom 0.65,
  exposure 0.92, quality high, preset 0, debug 0, HUD open, playing.
- `4` selected the redshift debug view; `0` returned to the final composite.
- Invalid query values (`quality=banana`, `preset=99`, `debug=42`, `hud=7`,
  `time=-5`) fell back to high / preset 0 / debug 0 / HUD open / time 0 with
  capture frozen, without an exception.
- A valid capture URL (`quality=standard&preset=3&debug=9&time=7.25&hud=0`)
  applied before ready: standard, preset 3, debug 9, time 7.25, HUD hidden,
  camera 306° / -9° / 16.5 M / 63°.
- Invalid API inputs returned `null` for `setQuality('ultra')`,
  `setPreset(9)`, `setDebug(12)`, `setTime(-1)`, `setTime('abc')` and an unknown
  parameter key; no unhandled rejection.
- Valid API inputs (`setQuality('cinematic')`, `setPreset(2)`, `setDebug(3)`,
  `setTime(4.5)`) returned the updated ready state.
- Mobile 390×844 DPR 2 rendered with an internal 780×1688 target (cinematic
  profile, DPR cap 2); one-finger touch drag changed the camera and the mobile
  HUD opened with all 21 controls.

### Parameter matrix — 21/21 plus time-rate checks

`evidence/param-matrix.json` records every required control being driven to a
non-default value and read back from state: FOV, distance, azimuth, elevation,
time rate, disk inner/outer radius, half thickness, peak temperature, emission
gain, orbital velocity, turbulence amplitude/rate, star density, galaxy
brightness, bloom strength/threshold, exposure, vignette, film grain and
chromatic dispersion. All 21 matched their requested values.

`timeScale = 0` froze the simulation clock (identical time across 1.2 s);
`timeScale = 1` advanced it (0.5168 s → 1.7418 s). No console errors or
warnings were produced by the matrix.

### Debug views

All ten views were captured at 1440×900, high quality, preset 0 and assembled
into `evidence/debug-contact.png`:

- `0` final composite; `1` step-count heat map (captured rays tinted red);
- `2` horizon mask (red captured, blue escaped, disk crossings tinted);
- `3` ordered disk crossings (colour by crossing order);
- `4` diverging redshift/Doppler map around `g = 1`;
- `5` lensed escape direction as RGB; `6` procedural stars and galaxy only;
- `7` disk emission before Doppler; `8` log-scaled pre-post HDR radiance;
- `9` impact parameter relative to the critical value, with the photon-ring
  ridge.

Each view is visually distinct; the HUD names the active view and explains it.

### Presets

All four presets were captured at 1440×900 in
`evidence/preset-contact.png`: Observer (three-quarter), Edge-on (thin disk
line and lensed halo), Polar (face-on rings) and Close pass (extreme lensing
with a large foreground disk). Their cameras are visibly and numerically
different.

### Persistence and reset

Quality, preset, debug view, HUD state and all parameters are written under
`gargantua.state.v1` and restored after reload. An independent check persisted
`quality=standard`, `preset=2`, `debug=4`, HUD closed and disk inner edge 8 M,
then restored all five after reload. `R` reset them to high / 0 / 0 / open /
6 M and cleared the saved payload before writing defaults.

### WebGL context loss and recovery

`WEBGL_lose_context` was available in Chrome. After the first render:

- `loseContext()` produced the "SIGNAL LOST" overlay, `contextLost: true`, and
  paused rendering; state remained intact.
- `restoreContext()` rebuilt the renderer, render targets, materials and
  controls; `contextLost` returned to `false`, `gargantuaReady` stayed `"true"`,
  and the final image returned without a page reload.
- The visible "RE-ACQUIRE CONTEXT" button was also exercised: it rebuilt the
  renderer immediately and returned to a ready, rendered frame.
- No console errors or warnings were produced.

Evidence: `evidence/context-lost.png`, `evidence/context-restored.png` and
`evidence/context-state.json`.

### Performance observation

With focus emulation active, the HUD telemetry reported approximately 120 fps
at 1440×900 DPR 1 on the high profile (focus emulation removes the display
vsync cap, so this is a render-cost observation rather than a guaranteed
refresh rate). A background tab remains subject to browser RAF throttling; see
the limitation below.

## Visual acceptance

Final default capture: `evidence/final-desktop.png`.
HUD at 1440×900: `evidence/final-desktop-hud.png`.
Mobile render and drawer: `evidence/mobile-390x844.png`,
`evidence/mobile-hud-open.png`.

Observed in the final default frame:

- A genuinely black event-horizon silhouette with a thin, bright photon ring
  and compressed star ring immediately outside it.
- A hot inner disk, a cooler tan/red receding limb, a Doppler-brightened
  white-blue approaching limb, and multiple higher-order disk images looping
  around the shadow.
- Lensed procedural stars, a faint Milky Way band and dust structure; no image,
  cubemap or remote environment map.
- HDR bloom restrained to the hot disk and bright stars; ACES roll-off keeps the
  frame contrast stable; vignette, grain and chromatic dispersion are subtle.
- Desktop HUD does not cover the black hole or critical ring; it is collapsible,
  shows quality/debug/camera status and the 21 controls, and lists every
  required shortcut.

## Known limitations

- **Background-tab throttling:** a hidden tab delays the first RAF and therefore
  the ready signal. Screenshot automation must use a foreground or
  focus-emulated tab, as this run did. This is browser behavior, not a renderer
  bypass.
- **Portrait framing:** at 390×844 the default landscape FOV is retained, so
  the outer disk extends beyond the narrow horizontal viewport; the shadow,
  photon ring and inner disk remain fully readable. The camera can be pulled
  back with the distance control.
- **Browser coverage:** only Chromium 153 on Windows was tested. Firefox and
  Safari were not exercised.
- **Context-loss extension:** the induced loss test relies on
  `WEBGL_lose_context`, which Chromium exposes; other browsers may not.
- **Optional audio:** no ambient audio was implemented. The task makes it
  optional; there is consequently no `M` shortcut.
- **Model choices:** the disk is a semi-transparent emissive slab with ordered
  crossings, not a full radiative-transfer/GRMHD solve. The temperature profile
  is steepened for visible outer-disk colour and Doppler intensity uses
  `g^2.6`; both are documented cinematic choices, while colour uses `T·g` and
  the geodesic integration remains the physical basis.
- **Build advisory:** Vite reports a >500 kB minified chunk because the locally
  vendored Three.js is bundled into the single application asset. The build is
  successful; this is not a test failure.
- **No human intervention was required** for installation, build, visual
  acceptance, or the gallery import. The first `npm ci` attempt required
  stopping a running preview server to release a Windows file lock.

## Evidence index

| File | Contents |
| --- | --- |
| `evidence/final-desktop.png` | Final 1440×900 capture, HUD hidden. |
| `evidence/final-desktop-hud.png` | Final 1440×900 capture with the observation console. |
| `evidence/mobile-390x844.png` | Mobile 390×844 DPR 2, HUD hidden. |
| `evidence/mobile-hud-open.png` | Mobile bottom-drawer HUD. |
| `evidence/debug-contact.png` | All ten debug views. |
| `evidence/preset-contact.png` | All four camera presets. |
| `evidence/context-lost.png` | Context-loss overlay. |
| `evidence/context-restored.png` | Recovered frame after context restore. |
| `evidence/acceptance-report.json` | 30-check interaction/contract suite. |
| `evidence/param-matrix.json` | 21-control matrix and time-rate checks. |
| `evidence/context-state.json` | State before/during/after context loss. |
