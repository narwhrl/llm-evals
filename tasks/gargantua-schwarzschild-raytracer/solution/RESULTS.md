# GARGANTUA — Verification Results

## Candidate identity

| | |
|---|---|
| Complete model identifier | `deepseek-v4.1-flash` |
| Branch | `llm/gargantua-schwarzschild-raytracer/deepseek-v4.1-flash` |
| Worktree | `.worktrees/gargantua-schwarzschild-raytracer/deepseek-v4.1-flash` |
| Starting `main` commit SHA | `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3` |
| Deliverable path | `tasks/gargantua-schwarzschild-raytracer/solution/` |
| Files touched outside the deliverable | none |

## Verification environment

- Windows, Git Bash; Node.js `v24.21.0`, npm `11.19.0`.
- Browser: Google Chrome `153.0.0.0` (headless), launched with `--enable-gpu --use-angle=d3d11`.
  - `UNMASKED_RENDERER`: `ANGLE (Intel, Intel(R) Arc(TM) 140T GPU, Direct3D11 vs_5_0 ps_5_0)` — real GPU, not SwiftShader.
  - `EXT_color_buffer_float` present, `WEBGL_lose_context` present, `MAX_TEXTURE_SIZE` 16384.
- The verification harness lives **outside** the repository
  (`%TEMP%\gargantua-verify\check.mjs`, Playwright 1.63.0) so it is the evaluator's instrument and
  not part of the candidate source tree. Screenshots are written to `%TEMP%\gargantua-shots\`.

## Commands actually run

All commands were run from `tasks/gargantua-schwarzschild-raytracer/solution/` unless stated.

| # | Command | Result |
|---|---|---|
| 1 | `npm install` | exit 0. React 19.1.1 / react-dom 19.1.1 installed as dependencies, vite 7.1.12 / @vitejs/plugin-react 5.0.4 / three 0.180.0 as build-time devDependencies. Writes the lockfile `package-lock.json`. (npm prints one informational notice about `esbuild`'s postinstall script; not an error.) |
| 2 | `npm run vendor` | exit 0. Re-copied `three@0.180.0` from `node_modules` into `vendor/` and rewrote `vendor/README.md`: `three.core.js` 1403455 B, `three.module.js` 603113 B, `addons/controls/OrbitControls.js` 38703 B, plus `LICENSE.three`. Re-running is byte-stable, and `git status` for `vendor/` stays clean. |
| 3 | `npm run build` | exit 0. `vite v7.1.12 building for production… ✓ 52 modules transformed.` → `dist/index.html` 1.39 kB (gzip 0.73 kB), `dist/assets/index-*.css` 6.44 kB (gzip 1.95 kB), `dist/assets/index-*.js` 751.40 kB (gzip 204.77 kB). No warnings. |
| 4 | `npm run preview` | exit 0 (long-running). `vite preview --port 4173 --strictPort` serving `dist/` on `http://localhost:4173/`. Stopped before delivery; see *Teardown*. |
| 5 | `node check.mjs smoke` | 1 check, 0 console errors. Ready in the served build, `paramCount` 22, quality `standard`, render target 1080×675 at a 1440×900 viewport. |
| 6 | `node check.mjs matrix` | **40/40 checks passed, 0 console errors.** 4 presets × 10 debug views, each on `?capture=1&hud=0&time=12.5&preset=N&debug=D`; every page reported `ready: true` with the requested preset/debug/time applied. 15.9 s total. |
| 7 | `node check.mjs invalid` | **8/8 passed, 0 console errors.** See *Query contract* below. |
| 8 | `node check.mjs api` | 1 check, 0 console errors. All six `window.__GARGANTUA__` members present; every setter validated and none threw. See *Public API* below. |
| 9 | `node check.mjs interactions` | 1 check, 0 console errors. See *Interaction* below. |
| 10 | `node check.mjs persistence` | 1 check, 0 console errors. See *Persistence* below. |
| 11 | `node check.mjs quality` | 3 checks, 0 console errors. See *Quality tiers* below. |
| 12 | `node check.mjs contextloss` | 1 check, `ok: true`, 0 console errors. See *Context loss* below. |
| 13 | `node check.mjs network` | 1 check, `ok: true`, 0 console errors. 3 requests total, all same-origin, **0 external**. |
| 14 | `node resetprobe.mjs` | Camera-ownership regression probe; used to reproduce and then confirm the fix described in *Bugs found*. |
| 15 | `node mobileprobe.mjs` | 390×844 @2 touch profile: preset tap, quality tap, debug step, drawer collapse/expand, HUD hide — all reached the store; 0 console errors. |
| 16 | `node touchprobe.mjs` | Real CDP `Input.dispatchTouchEvent` gestures: one-finger swipe, two-finger pinch. 0 console errors. |
| 17 | `node resizeprobe.mjs` | Viewport 1440×900 → 900×1200 → 2560×1440 plus tier switches; 0 console errors. |
| 18 | `node fpsprobe.mjs` | Steady-state frame rate per tier on desktop and mobile; 0 console errors on both. |

## Visual acceptance

Performed by direct inspection of full-resolution PNGs produced through Playwright, not by a
downsampled preview.

- **Preset 0 — Interstellar** (fov 40, r 20, az 24°, el 8°): edge-on sweep. Deep black shadow,
  clean bright photon ring, the far side of the disk lensed up over and under the shadow, the
  approaching side visibly brighter, and the star field wrapped around the critical curve.
- **Preset 1 — Polar Overlook** (fov 38, r 26, az 62°, el 56°): high inclination. Clean black
  shadow, sharp ring, and the whole annulus visible with turbulent structure sheared into
  concentric bands.
- **Preset 2 — Photon Ring** (fov 34, r 11, az −12°, el 5°): close approach. Shadow dominates the
  frame, thick photon ring, higher-order disk arcs, and a heavily magnified near-side disk.
- **Preset 3 — Wide Field** (fov 62, r 46, az 108°, el −14°): distant. Small shadow with a thin
  photon ring, an Einstein-ring distortion of the background, a rich star field and a visible
  galactic band.

All four are visually distinct at a glance, and each was also inspected as a full-resolution crop
around the shadow to confirm the critical structure is resolved rather than smeared.

**Debug views 0–9** were captured for all four presets in the 40-shot matrix and inspected.
`0` is the graded composite; `1` integration cost coloured by termination class (horizon / escape /
step budget); `2` event-horizon mask with the critical curve marked; `3` disk crossings with image
order as hue and count as brightness; `4` signed redshift and beaming of the first crossing;
`5` escaped-ray direction with a spherical graticule, revealing the lensing of the background
coordinates; `6` the procedural sky alone, still lensed; `7` pre-post linear radiance with
over-exposure marked; `8` total swept φ; `9` impact parameter relative to `b_crit` with the critical
curve marked. Each was checked to be mutually distinguishable, not merely a tint of the composite.

The **desktop HUD** does not cover the critical structure: the info panel occupies the left edge and
the parameter drawer the right edge, leaving the shadow, photon ring and disk unobstructed. The
**mobile HUD** becomes a bottom drawer (52 vh, collapsible) over a scrollable info panel, with the
preset strip as a horizontally scrollable row above it.

## Query contract (`?capture=1&quality=…&preset=…&debug=…&time=…&hud=…`)

Eight malformed queries were driven through the real page; all eight reached `ready`, rendered, and
reported the fallback in `state.rejectedQuery`:

| Query | Result |
|---|---|
| `quality=bogus&preset=99&debug=-3&time=abc&hud=7` | all five rejected → `standard`, `0`, `0`, `0`, hud open |
| `quality=&preset=&debug=&time=&hud=` | all five rejected → defaults |
| `quality=CINEMATIC&preset=3&debug=9&time=0&hud=1` | accepted → `cinematic` / `3` / `9` / `0` / hud open |
| `preset=2.7&debug=4.2` | both rejected as non-integers → `0` / `0` |
| `quality=high&preset=1&debug=5&time=3&hud=0` | accepted → `high` / `1` / `5` / `3` / hud closed |
| `time=-5&preset=-1&debug=10` | all three rejected (negative, negative, out of range) |
| `time=1e9` | accepted (finite, non-negative) |
| `time=Infinity&debug=NaN` | both rejected → `0` / `0` |

No query produced an exception, a black frame, or a stuck boot overlay. `quality=CINEMATIC` is
accepted because the contract's accepted values are matched case-insensitively after trimming;
this is a deliberate leniency, not a fallback failure.

## Public API (`window.__GARGANTUA__`)

`ready` (read-only accessor), `getState()`, `setQuality`, `setPreset`, `setDebug`, `setTime` are all
present. Driving them from the page:

| Call | Outcome |
|---|---|
| `setQuality('cinematic')` | applied |
| `setQuality('bogus')`, `setQuality(42)` | rejected, quality unchanged, `lastCommand.reason` set |
| `setPreset(2)` / `setPreset('1')` | applied (string is parsed) |
| `setPreset(9)` | rejected, preset unchanged |
| `setDebug(7)` / `setDebug(-1)` | applied / rejected |
| `setTime(4.25)` / `setTime(-1)` / `setTime('abc')` / `setTime(NaN)` | applied / rejected / rejected / rejected |

No call threw. Rejections are reported through `lastCommand { name, ok, reason }` and leave the
previous state intact.

## Interaction

Driven against the served build at 1440×900:

- Drag on the canvas: azimuth 24° → −27°, distance unchanged — orbit works and writes the real
  camera back into the parameters.
- Wheel zoom: distance 20.0 → 15.2.
- `0`–`9`: debug view reached `[0,1,2,3,4,5,6,7,8,9]` in order.
- `Shift+1`–`Shift+4`: preset reached `[0,1,2,3]`.
- `Space`: cinematic `true → false → true → false`.
- A manual drag while the loop was playing turned it off (`cinematic true → false`) and it did not
  reclaim control.
- `H`: HUD `false → true`. `Q`: quality cycled `high → cinematic → standard`.

## Persistence

Sliders were driven through the real DOM (`input[type=range]`, by `aria-label`), not through the
store: disk temperature 18500 K, galaxy brightness 1.75, exposure 2.4, bloom strength 1.35, FOV 66°,
plus quality `cinematic` and debug view `6`. After a full page reload every value was restored
exactly (`{quality: cinematic, debug: 6, diskTemperature: 18500, galaxyBrightness: 1.75,
exposure: 2.4, bloomStrength: 1.35, fov: 66}`) from `localStorage` key `gargantua.state.v1`.
Clicking the visible **Reset all** control returned every value to its default
(`standard`, debug 0, 8000 K, 0.6, 1.0, 0.5, FOV 40°, camera distance 20.0 `r_s`).

## Quality tiers

Measured on the same scene (`?capture=1&time=8&preset=2&debug=0&quality=…`), 1440×900 viewport:

| Tier | render target | max RK4 steps | max crossings | bloom mips |
|---|---|---|---|---|
| standard | 1080×675 | 200 | 3 | 3 |
| high | 1440×900 | 360 | 5 | 5 |
| cinematic | 2016×1260 | 620 | 6 | 6 |

The tiers change the actual GPU work (buffer size, per-ray step budget, crossing budget, mip chain),
not only a label.

## Resize and devicePixelRatio

Measured at `deviceScaleFactor: 2` with `?capture=1&quality=standard`:

| Viewport | canvas backing store | render target | dpr used |
|---|---|---|---|
| 1440×900 | 1800×1125 | 1350×844 | 1.25 |
| 900×1200 | 1125×1500 | 844×1125 | 1.25 |
| 2560×1440 | 3200×1800 | 2400×1350 | 1.25 |
| 2560×1440, cinematic | 5120×2880 | 3263×1835 | 2.0 |

The backing store tracks the viewport and the tier's DPR cap, the internal render target tracks
`renderScale`, and the cinematic 2560×1440 case is clamped exactly at the 5.99 M-pixel ceiling
(`MAX_RENDER_PIXELS`) instead of allocating a 28.9 M-pixel target.

## Mobile and touch

390×844 @ DPR 2, `isMobile: true`, `hasTouch: true`:

- Preset strip (horizontally scrollable): tapping `3 Photon Ring` set preset 2 with camera
  `r 11, az −12°, el 5°` and paused the loop.
- Tapping the `High` quality chip moved the render target from 366×791 to 683×1477 and the DPR from
  1.25 to 1.75.
- Tapping the debug `+` control advanced the debug view.
- `Close` / `Open` collapsed and expanded the parameter drawer; `Show HUD` hid the HUD entirely
  (canvas became a full 390×844 bleed).
- Real CDP touch events: a one-finger swipe moved the camera from `az 24°, el 8°` to
  `az 56.5°, el 36°` and paused the loop; a two-finger pinch moved the distance from 20.0 to 5.7
  `r_s`.

## Frame rate

Steady state, sampled over ~3 s after a 6 s warm-up, Intel Arc 140T / D3D11, headless Chrome with
vsync:

| Profile | Tier | render target | FPS |
|---|---|---|---|
| desktop 1440×900 | standard | 1080×675 | 60.0 |
| desktop 1440×900 | high | 1440×900 | 59.9 |
| desktop 1440×900 | cinematic | 2016×1260 | 38.3 |
| mobile 390×844 @2 | standard | 366×791 | 59.9 |
| mobile 390×844 @2 | high | 683×1477 | 60.0 |
| mobile 390×844 @2 | cinematic | 1092×2363 | 26.5 |

## Console errors

Zero `error` and zero `pageerror` entries were recorded in every one of the nine harness modes, in
the mobile and touch probes, in the resize probe and in the frame-rate probe — including the
40-page matrix and the context-loss cycle. See *Known limitations* for the one benign warning.

## WebGL context loss and recovery

`WEBGL_lose_context` was used on the live canvas of the served build:

1. `loseContext()` → `document.documentElement.dataset.gargantuaContext === "lost"`, the
   `[data-testid="context-lost"]` overlay appeared, and the message informs the user that recovery
   is automatic.
2. `restoreContext()` → dataset became `"restored"`, the overlay was removed, and rendering resumed
   (the frame counter advanced again).
3. `window.__pageLifetimeMarker` was identical before and after, and
   `performance.getEntriesByType('navigation').length === 1` — recovery rebuilt the renderer, targets
   and materials in the same page. No reload, no swallowed event.

## Capture-URL check (explicit)

`?capture=1&hud=0&time=12.5&preset=0&debug=0` and the same URL for `preset=1…3` and `debug=0…9`
were each loaded and screenshotted; every page reported `gargantuaReady === "true"`, the requested
`preset`/`debug`/`time`, `hud` closed, and `capture` active (time frozen, no cinematic advance, audio
off). `?quality=high&preset=1&debug=5&time=3&hud=0` (without `capture`) also reported `cinematic:
true` with the loop running, confirming `capture` is what freezes the simulation.

## Bugs found and fixed during verification

1. The cinematic loop owned the camera parameters. Every frame the engine wrote the animated camera
   back into `camDistance` / `camAzimuth` / `camElevation`, so on a fresh load the parameters read
   `21.5 / 24.5 / 8` instead of the authored `20 / 24 / 8`, and `setPreset` / Reset all appeared to
   do nothing to the camera because the next write-back erased them. Reproduced with
   `resetprobe.mjs`; the engine no longer writes the framing back while the loop is running, and
   choosing a preset, moving a framing slider or resetting hands the camera to the user. Re-measured
   afterwards: fresh load `20 / 24 / 8`, `setPreset(1)` `26 / 62° / 56°`, Reset all `20`, reload
   restores the preset exactly.
2. Escaping rays that crossed `u = 0` inside one RK4 step continued on the non-physical branch of the
   Binet equation and returned as false horizon hits, painting faint black arcs over the sky. Found
   by comparing against a CPU port of the integrator; fixed with a relative-change step limiter.
3. `sample` is a reserved word in GLSL ES 3.00 and broke one shader build.
4. The `DiskSample` struct was declared in two shader modules and failed to link.
5. Preset 2 as first written placed the camera at 8.5 `r_s` with a 15° FOV, which puts `b < b_crit`
   on every ray and renders a fully black frame. Re-framed to 11 `r_s` / 34°.
6. Film grain was heavy enough to compete with the photon ring; reduced.
7. A URL `?preset=N` applied the preset index but not the preset's framing.

## Known limitations

- **One benign console warning.** ANGLE's HLSL backend emits
  `warning X4000: use of potentially uninitialized variable (f_traceGeodesic)` (and the same for
  `f_findPlaneCrossings`). The struct is already initialised through its constructor with a comment
  explaining why; the check is a false positive across the shader's `break` statements and does not
  affect output. It is a `console.warn` from `THREE.WebGLProgram`, not an error, and it is the only
  non-clean line in the console.
- **Verification was done on one GPU.** All numbers come from headless Chrome 153 on an Intel Arc
  140T through ANGLE/D3D11 with vsync. Frame rates on other hardware will differ, and the cinematic
  tier is the first to drop below 60 fps.
- **Headless Chrome reports `devicePixelRatio` 1 by default**, so the tier DPR caps were verified
  with an explicit `deviceScaleFactor: 2` context rather than on a real Retina display.
- **The absolute radiometric scale is tuned, not calibrated.** The disk profile, blackbody
  temperature mapping and beaming exponent are physically motivated and controllable, but the
  exposure that makes the frame read well is a look decision, not a derivation.
- **No human intervention was required** and nothing in the deliverable is blocked or incomplete.
- `readPixels` on the live canvas returns zeros when called outside the render loop
  (`preserveDrawingBuffer: false`); all pixel assertions in this run were therefore made from
  screenshot PNGs instead.

## Evidence files

`evidence/` holds the screenshots that back the claims above. They are contact sheets built from the
full-resolution Playwright PNGs, downsampled only to keep the repository small.

| File | Contents |
|---|---|
| `evidence/presets.png` | The four presets, row-major: 0 Interstellar, 1 Polar Overlook, 2 Photon Ring, 3 Wide Field |
| `evidence/debug-views.png` | Preset 0 at debug views 0–9, row-major, five per row |
| `evidence/desktop-hud.png` | Desktop HUD expanded (1440×900, preset 0) |
| `evidence/mobile-hud.png` | Mobile HUD (390×844 @ 2, touch profile) |
| `evidence/context-recovery.png` | WebGL context lost (left) and the same page after `restoreContext()` (right) |

The 40 raw matrix PNGs, the per-mode `*-result.json` files and the probe scripts live outside the
repository in `%TEMP%\gargantua-shots\` and `%TEMP%\gargantua-verify\`.

## Teardown

The preview server started in step 4 was stopped before delivery and port 4173 was confirmed free.
No dev server, watcher, or background process from this run is left alive.
