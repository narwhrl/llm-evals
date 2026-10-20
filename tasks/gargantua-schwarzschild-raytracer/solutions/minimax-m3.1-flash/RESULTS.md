# RESULTS — GARGANTUA (Schwarzschild Black Hole Raytracer)

## Identification

| | |
| --- | --- |
| Task | `gargantua-schwarzschild-raytracer` |
| Candidate | `minimax-m3.1-flash` |
| Model | `magpie/minimax-code/MiniMax-M3.1-Flash` |
| Starting `main` commit | `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1` |
| Worktree | `.worktrees/minimax-m3.1-flash/gargantua-schwarzschild-raytracer` |
| Branch | `run/gargantua-schwarzschild-raytracer/minimax-m3.1-Flash` |
| Environment | Windows 11, Git Bash, Node 24.21.0, npm 11, Chromium 1243 (Playwright), WebGL 2.0 via ANGLE / Intel Arc 140T |

The worktree was created from the pinned `main` commit above and nothing was
copied from any other candidate's work.

## Commands actually run, and what they returned

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0. `added 2 packages` after `@types/node@22.12.0` was added; esbuild's postinstall was skipped by npm's `allowScripts` policy, but the platform package `@esbuild/win32-x64` is present and the build works. |
| `npm run typecheck` (`tsc --noEmit`) | exit 0, no diagnostics. |
| `npx vite build` | exit 0. `dist/index.html` 1.00 kB, `dist/assets/index-*.css` 7.65 kB, `dist/assets/index-*.js` 784.66 kB (211.42 kB gzipped), built in 0.87 s. |
| `npx vite --port 5183` (development) | served on `http://127.0.0.1:5183/`, used during development. |
| `node serve.mjs --root=<solution>/dist --port=8231` | served the production build on `http://127.0.0.1:8231/`, used for every acceptance check below. |
| `node shot.mjs --url=… --eval=…` | Playwright/Chromium screenshots and in-page probes; results below. |
| `node garg-mobile.mjs --url=…` | mobile profile, 390 × 844 at device scale factor 2 with touch. |
| `node garg-network.mjs --url=…` | recorded every network request the built page makes. |

## What the renderer does

The main image is a single full-screen fragment shader. Each pixel fires one
ray and integrates the null-geodesic equations of the Schwarzschild metric
in the plane the ray travels in:

```
(dr/dλ)² = E² − L²(r − 2M)/r³ ,  dφ/dλ = L/r² ,  d²r/dλ² = L²(r − 3M)/r⁴
```

with `M = 1/2` in Schwarzschild radii, integrated with velocity Verlet. The
step length scales with the radius. Capture is decided from the conserved
impact parameter `b = |L|/E` against the critical value `3√3 M`, which is
exact and keeps the shadow edge a clean curve rather than a noisy band.

The disc is a sheet of gas in the plane `z = 0` that the bent path cuts; the
crossings are composited in path order, so the primary, secondary and higher
order images are all the same disc seen through bent light. Each crossing
carries a thin-disc blackbody temperature, the combined gravitational and
Doppler factor `g`, and a procedural turbulence field advected by the local
Keplerian rate. The sky is a procedural cube-grid starfield and a procedural
galactic band, both sampled with the direction the bent ray points at
infinity, so both are lensed.

The post chain is: half-float HDR target → bright pass → bloom mip pyramid
(downsample chain, additive tent upsample) → exposure → ACES film tone curve
→ chromatic dispersion, vignette and film grain.

No mesh, texture, image, video, cubemap or environment map contributes to
the picture. The only geometry is a full-screen triangle.

## Browser acceptance

All checks below were run against the **production build** served by
`serve.mjs` on `http://127.0.0.1:8231/`.

### The capture contract

| URL | Observed |
| --- | --- |
| `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` | `ready="true"`, quality `high`, preset `0`, debug `0`, `time=12.5`, panel absent, no console output, no page errors, no failed requests. |
| `?capture=1&quality=cinematic&preset=2&debug=6&time=12.5&hud=0` | quality `cinematic`, preset `2` (camera moved to fov 44 / 24 rₛ / −58° / 1.5°), debug `6`, `time=12.5`, panel absent, no errors. |
| `?capture=1&quality=ultra&preset=9&debug=42&time=-3&hud=maybe` | every illegal value dropped: quality `high`, preset `0`, debug `0`, `time=0`, `hud` open. Page still rendered, no errors. |
| `?capture=1&quality=standard&preset=0&debug=0&time=notanumber&hud=1` | `time=0` (illegal time rejected), quality `standard`, panel open, no errors. |

`document.documentElement.dataset.gargantuaReady` becomes `"true"` in every
case, including the illegal-value cases.

### The scripting surface

`window.__GARGANTUA__` exposes `ready`, `getState()`, `setQuality`,
`setPreset`, `setDebug`, `setTime`.

- Rejected and returned `null`, without throwing: `setQuality("ultra")`,
  `setPreset(9)`, `setPreset(-1)`, `setDebug(42)`, `setDebug(1.5)`,
  `setTime(-4)`, `setTime(NaN)`, `setTime("12")`.
- Accepted and applied: `setQuality("standard")` → `standard`,
  `setPreset(2)` → `2`, `setDebug(7)` → `7`, `setTime(3.5)` → `3.5`.

### Keyboard

| Key | Observed |
| --- | --- |
| `5` | debug view became `5` |
| `Shift+2` | preset became `1` (Polar) |
| `H` | panel hidden, `H` again → panel shown |
| `Q` | quality `high` → `cinematic` → `standard` |
| `Space` | cinematic loop toggled |
| `R` | everything back to the defaults: quality `high`, preset `0`, debug `0`, fov `40`, distance `26`, emission `1.1` |

### Camera

- A mouse drag of 180 × 60 px on the canvas changed the reported azimuth and
  elevation and moved the picture.
- A wheel gesture of −600 changed the camera distance from `26.02 rₛ` to
  `20.35 rₛ`.
- The sliders follow the camera when it is dragged, so the two never
  disagree.

### Persistence

`localStorage["gargantua.settings"]` holds `{"version": 1, "settings": {…}}`
with the full parameter set. The visible "Reset all" button and the `R` key
both restore the defaults.

### Every parameter control moves the picture

Each of the 24 sliders was moved to a distinctly different value and the
rendered frame was compared by pixel hash before and after. **All 24 changed
the frame**; none were inert. Measured mean frame luminance for a few of
them: `exposure` 22.9 → 52.8, `bloomThreshold` 22.9 → 55.4,
`diskEmission` 22.7 → 38.5, `galaxyBrightness` 22.8 → 41.4,
`vignette` 22.9 → 17.1, `cameraDistance` 19.8 → 47.0.

### Quality tiers

The tiers change the internal render scale, the step budget, the bloom depth
and the noise octaves, and the HUD reports the live numbers. The three tiers
were loaded and each produced a complete, distinct frame with the event
horizon, the photon ring and the lensed disc all present.

### WebGL context loss and recovery

`WEBGL_lose_context` was available and was used:

- Before: mean frame luminance `22.8`, 9551 lit samples.
- During the loss: the overlay **“WebGL context lost”** was visible, the
  render loop was stopped.
- After `restoreContext()`: the overlay was gone, the same state
  (quality `high`, preset `0`, debug `0`, time `5`) was still in place, and
  the frame measured identically (`mean 22.8`, 9551 lit samples) — the same
  picture, not a black canvas.

The float-render extensions are requested again on restore, and the render
targets are dropped rather than deleted (deleting objects that belong to a
lost context produced `INVALID_OPERATION` warnings; the first version of the
restore path did that, and it was fixed). After the fix the console is
silent.

### Desktop and mobile

| Viewport | Observed |
| --- | --- |
| 1440 × 900 | Full scene visible, HUD in the corners and a parameter column on the right; the subject is never behind a panel. ~120 fps at the High tier on the test machine. |
| 390 × 844, dpr 2, touch | The scene fills the screen, the panel starts folded away (it is a drawer along the bottom when opened), the title and the toggle are the only permanent furniture. No console output. |

### Network

The built page made exactly three requests: the document, one JS bundle and
one CSS file, all on `127.0.0.1`. **No remote asset of any kind.**

### Console

Across every check above: no console errors, no uncaught exceptions, no
failed requests.

## Evidence

All screenshots were taken from the production build served by `serve.mjs`.

| File | What it shows |
| --- | --- |
| `evidence/01-iconic.png` | the default view, 1440 × 900 |
| `evidence/02-edge-on.png` | the edge-on preset: halo above and halo below the shadow |
| `evidence/03-polar.png` | the polar preset: the disc seen down the spin axis |
| `evidence/04-skimming.png` | the skimming preset: close and wide, from below the plane |
| `evidence/05-hud.png` | the HUD and the parameter panel |
| `evidence/06..11-debug-*.png` | six diagnostic views, one file each |
| `evidence/12-debug-views.png` | the same six views as one montage |
| `evidence/13-mobile.png` | 390 × 844 at device scale factor 2 |

## Known limitations

1. **The camera elevation exactly 0° is a degenerate case.** An observer
   lying exactly in the disc plane sees rays that travel *in* the plane, so
   the disc has no crossing to find; those rays show no disc. The Edge-on
   preset therefore uses 1.5°, and the picture is continuous through 0°. The
   affected pixels are a single row of the frame.
2. **The third and higher order images are thin.** A ray has to wind around
   the hole more than once to cross the disc three or four times, and the
   step budget decides how many windings are affordable. At the High tier
   the third image is a fine ring around the photon ring; the fourth needs
   the Cinematic tier. This is a budget limit, not a missing feature — the
   crossing count is visible in debug view `3`.
3. **Ambient audio is not implemented.** The task lists it as optional. The
   `M` shortcut therefore does nothing, and there is no autoplay risk.
4. **The `Standard` tier caps the device pixel ratio at 1.** A Retina phone
   rendering at the High or Cinematic tier does use 1.5× and 2×; the
   Standard tier trades sharpness for frame rate on purpose. The live DPR is
   shown in the HUD.
5. **The adaptive resolution scale is heuristic.** It lowers the internal
   scale after four consecutive frames over 55 ms and raises it again after
   twelve frames under 26 ms. It never goes above the tier's own scale and
   is disabled during a capture, so screenshots are stable, but the exact
   scale on a slow machine is not predictable.
6. **Only one addon is vendored.** `OrbitControls` is the only Three.js
   addon the project uses; `vendor/` contains exactly the runtime imports
   and nothing else.

## Human intervention required

None. The build, the static server, the acceptance checks and the recovery
path were all exercised here, and the servers used for this work have been
stopped.
