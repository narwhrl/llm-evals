# RESULTS — GARGANTUA (Schwarzschild Black Hole Raytracer)

Everything below was executed and observed on the machine described here. No unexecuted
command or unobserved behaviour is claimed.

## Candidate identification

| Field | Value |
| --- | --- |
| Complete model identifier | `xiaomi/mimo-v2.6-flash` |
| Starting `main` commit SHA | `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3` |
| Worktree | `.worktrees/gargantua-schwarzschild-raytracer/mimo-v2.6-flash` (branch `llm/gargantua-schwarzschild-raytracer/mimo-v2.6-flash`) |
| Candidate path | `tasks/gargantua-schwarzschild-raytracer/solution/` |
| Date of the run | 2026-09-22 |

## Environment

| Item | Value |
| --- | --- |
| OS | Windows (commands run through Git Bash) |
| Node | `v24.21.0` |
| npm | `11.19.0` |
| Browser | Google Chrome `153.0.8010.53` (`chrome.exe --version` is mojibake on this console; the version was confirmed via the registry key `HKLM\SOFTWARE\Wow6432Node\...\Google Chrome\Version` and via Playwright's `browser.version()`, which both report `153.0.8010.53`) |
| Browser automation | Playwright `1.63.0` (`channel: 'chrome'`, headless, system Chrome — no `playwright install` was run) |
| Chrome launch args used | `--enable-unsafe-swiftshader` (allows the software WebGL fallback; `--use-angle=swiftshader` turned out to be unnecessary) |
| Static server | `npx vite preview --port 4173 --strictPort` from `solution/` |
| WebGL reported | `WebGL 2.0 (OpenGL ES 3.0 Chromium)`; `WEBGL_lose_context` available |

## Commands actually run

Every command was executed in the paths shown and the exit code is the real observed one.

### 1. Install

```bash
cd tasks/gargantua-schwarzschild-raytracer/solution
npm install
```

→ exit `0`. Output: `added 20 packages, and audited 21 packages in 23s`, `found 0 vulnerabilities`.
`package-lock.json` was produced and is committed as part of the candidate.

### 2. Lockfile reproducibility

```bash
rm -rf node_modules && npm ci
```

→ exit `0`, `found 0 vulnerabilities`, and the subsequent build produced the identical bundle
hash (`index-D2jrsMQy.js`) — the lockfile fully describes the build toolchain.

### 3. Production build

```bash
npm run build
```

→ exit `0`. Output:

```text
vite v8.3.0 building client environment for production...
✓ 40 modules transformed.
dist/index.html                   1.01 kB │ gzip:   0.61 kB
dist/assets/index-ubOGZjpR.css    7.23 kB │ gzip:   2.08 kB
dist/assets/index-D2jrsMQy.js   839.60 kB │ gzip: 226.73 kB
✓ built in 201ms
```

### 4. Proof that the vendored Three.js is what gets bundled

```bash
mv node_modules/three node_modules/.three-hidden
npm run build
mv node_modules/.three-hidden node_modules/three
```

→ exit `0` **with `node_modules/three` absent**, producing the byte-identical bundle hash
`index-D2jrsMQy.js` (and identical CSS hash `index-ubOGZjpR.css`). The Vite alias really does
resolve `three` and `three/addons/*` into `vendor/three/`, and the application never depends on
`node_modules/three` at build time.

### 5. Static server

```bash
npx vite preview --port 4173 --strictPort     # background
curl -s -o /dev/null -w "%{http_code}" http://localhost:4173/
```

→ server up, `200`, HTML served from `dist/`. The server was stopped after verification
(`kill` of the preview process); no dev or preview server is left running.

### 6. Browser verification harness (throwaway, outside the candidate)

```bash
cd verify
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install    # playwright@1.63.0, exit 0
node smoke.mjs                                     # exit 0
node verify.mjs                                    # exit 0
```

`verify/` sits at the worktree root and is untracked — it is not part of the deliverable.
`node verify.mjs` is the full run whose results are reported below; `node verify.mjs --quick`
skips the 40-load matrix. Raw artefacts: `verify/final-run.log`, `verify/final-report.json`,
`verify/shots/*.png`.

**Result: `=== 49/49 checks passed ===`, process exit code `0`.**

Two further measurements were run with small throwaway scripts in the same directory:

```bash
node measure.mjs    # pixel-level red ("budget exhausted") counting + closest-signature pairs
node budget.mjs     # debug 1 red-pixel fraction for 3 quality tiers x 4 presets = 12 loads
node budget2.mjs    # worst-case config: standard tier, diskInner 3, diskOuter 48, thickness 0.05
node flicker.mjs    # frame-to-frame change versus turbulence speed and time scale
```

→ all exit `0`. Results are used in the capture-matrix table and in limitations 6 and 11 below.

## Browser acceptance results

### Desktop 1440 × 900, base URL

| Item | Observed |
| --- | --- |
| Ready (`dataset.gargantuaReady === 'true'`) | 789 ms after `domcontentloaded` (harness timeout was 120 s) |
| Canvas | `1440×900` buffer, `1440×900` CSS, i.e. High tier = `min(DPR 1, cap 1.5) × 1.0` |
| Frame content | meanLuma 0.2215, 86.9 % of pixels above the black threshold, maxLuma 1.0 — the scene is fully visible, not a black screen or a stuck loading overlay |
| Console errors | 0 |
| Page errors | 0 |
| External network requests | 0 (the harness fails the run if any request leaves `http://localhost:4173`, and also records `requestfailed`) |
| Request failures | 0 |

Visual inspection of `verify/shots/desktop-base.png` and `verify/shots/capture-*.png` confirms:
a genuinely black event-horizon shadow; a thin bright photon ring hugging it (bluish-white on
the approaching side); a hot accretion disk with the near side sweeping in front of the shadow
and the far side lifted over the top (primary + secondary images); strong Doppler asymmetry
(the approaching side is far brighter than the receding side); visible turbulent filaments in
the disk; and a lensed starfield / Milky Way whose structure is stretched into arcs around the
shadow. Debug view 6 (`capture-p0-d6.png`) shows the same lensing of the background with the
disk removed.

### `window.__GARGANTUA__` interface

| Check | Observed |
| --- | --- |
| `ready` | `true` |
| `getState()` keys | `quality, preset, debug, hud, time, cinemaPlaying, userHasTakenControl, contextLost, capture, params` |
| Parameter count in the snapshot | 21 |
| Frozen snapshot | `Object.isFrozen(getState()) === true` |
| Valid setters | `setDebug(3)→3`, `setPreset(2)→2`, `setQuality('cinematic')→'cinematic'`, `setTime(12.5)→12.5` |
| Invalid setters (all returned `null`, none threw) | `setDebug(99)`, `setDebug('abc')`, `setDebug(1.5)`, `setPreset(9)`, `setQuality('nope')`, `setQuality(3)`, `setTime(-1)`, `setTime(NaN)`, `setTime('nope')` |

### Capture matrix — 4 presets × 10 debug views = 40 loads

URL template: `?capture=1&quality=high&preset=P&debug=D&time=12.5&hud=0`

| Metric | Observed |
| --- | --- |
| Loads that satisfied every assertion | **40 / 40** |
| Ready time | min 64 ms, median 99 ms, max 170 ms |
| Console errors / page errors across all 40 | 0 / 0 |
| External requests across all 40 | 0 |
| `getState()` after each load | `quality='high'`, `preset=P`, `debug=D`, `hud=false`, `time===12.5`, `capture=true`, `cinemaPlaying=false`, all five bridge methods present |
| `hud=0` overlay purity | `document.querySelector('.hud') === null` on every load |
| Frames measured from pixels (all 40) | none black: meanLuma range 0.0053 – 0.8681, minimum non-black fraction 0.0118 (that minimum is debug 2, a binary capture mask by design, which is legitimately almost all black) |
| Distinctness of the 10 debug views | 0 duplicates out of 45 pairs; the closest pair (debug 3 vs debug 7) still differs by 0.0417 mean absolute luminance, well above the 0.005 duplicate threshold |
| Distinctness of the 4 presets | 0 duplicates out of 6 pairs; closest pair (preset 0 vs 3) differs by 0.1124 |
| Determinism | two independent loads of the same capture URL produced a signature distance of **0.0000** — frozen `uTime` (turbulence and grain included) is reproducible |

Screenshots saved: all ten debug views at preset 0, plus debug 0 at presets 1–3
(`verify/shots/capture-p*.png`), 36 PNGs in total including the interaction and mobile shots.

### Invalid query recovery

```text
?capture=1&quality=nope&preset=9&debug=abc&hud=7&time=-3
```

| Item | Observed |
| --- | --- |
| Ready | yes, 272 ms |
| Resolved state | `quality='high'`, `preset=0`, `debug=0`, `hud=true`, `time=0`, `capture=true` |
| Console / page errors | 0 / 0 |
| Frame | not black (meanLuma 0.258, 89 % non-black pixels) — no exception, no black screen |

### Mobile 390 × 844, device scale factor 2

| Item | Observed |
| --- | --- |
| Ready | 151 ms |
| Canvas | `585×1266` buffer with a `390×844` CSS box and `devicePixelRatio = 2` — i.e. `min(2, cap 1.5) × 1.0`, DPR handling is real |
| Frame | not black (meanLuma 0.19, 94 % non-black) |
| Bottom drawer | opens via the toggle, full width (390 px), 21 `input[type=range]` present, pointer-events active |
| Touch-equivalent drag | camera azimuth changed (0.836 → 0.287 rad) and `userHasTakenControl` became `true` |
| Console | 0 errors, 0 page errors |

`verify/shots/mobile-base.png`, `mobile-drawer.png` and `mobile-drawer-bottom.png` were
inspected: the brand block shrinks, presets are a horizontal scroll row, and the drawer
scrolled from Camera through Disk, Background, Post to the Reset/Pause buttons with legible
text and no overlap.

### Desktop interaction spot checks

| Check | Observed |
| --- | --- |
| Orbit drag | azimuth 0.724 → 6.191 rad, elevation 0.328 → 0.124, `cinemaPlaying` became `false`, `userHasTakenControl` became `true` |
| Wheel zoom | orbit distance 24.21 → 20.12 M |
| `Space` | pauses (`cinemaPlaying=false`), then resumes and clears the manual flag (`true` / `userHasTakenControl=false`) |
| `3` | selects debug view 3 and the frame changes (measured from pixels) |
| `Shift+2` | applies preset 1: `preset=1`, distance 12.0, fov 45.0 |
| Preset button "Polar Crown" | `preset=3`, elevation 1.15 |
| `H` | HUD removed from the DOM, hint shown; pressing again restores both |
| Slider (`fill`) | `#param-exposure` → `params.exposure = 2.5` |
| Slider (keyboard) | focused `#param-diskTemp` + `ArrowRight` ×2 → 7200 → 7300 K |
| Slider (mouse drag) | `#param-vignette` 0.35 → 0.86 |
| Disk annulus invariant | `diskInner = 20` forced `diskOuter = 21.5` (outer > inner + 1 always holds) |
| Persistence | after a reload `exposure = 2.5` and `diskInner = 20` were restored from `localStorage['gargantua.state.v1']` |
| Quality tiers | canvas buffer `1080×675` (standard) → `1440×900` (high) → `1440×900` (cinematic) at DPR 1; `Q` cycles the tier |
| Reset (`R`) | every parameter back to its default, `quality='high'`, `preset=0`, `debug=0`, `hud=true`, `cinemaPlaying=false`, stored key cleared; the resulting frame is still a valid scene |
| Console during all of the above | 0 errors, 0 page errors |

### Controls actually change the render (measured from pixels)

For each control, the slider was driven through the UI in capture mode (frozen time) and the
frames were compared as 8×8 luminance signatures:

| Control | mean signature delta | largest single-cell delta |
| --- | --- | --- |
| Camera / FOV (55 → 95) | 0.1775 | 0.666 |
| Disk / emission intensity (1.4 → 5) | 0.2194 | 0.608 |
| Disk / turbulence amount (0.55 → 1.5) | 0.0086 | 0.095 |
| Background / star density (1 → 3) | 0.0238 | 0.064 |
| Post / exposure (1.15 → 2.8) | 0.1293 | 0.230 |
| Post / chromatic aberration (0.15 → 1) | 0.0022 | 0.028 |
| Disk / half thickness (0.5 → 2.4) | 0.1625 | 0.475 |

All seven change the image. Turbulence amount and chromatic aberration are the two subtlest
(they are deliberately restrained), which is why the check accepts either a whole-frame change
or a localised one.

### WebGL context loss and restore

`WEBGL_lose_context` was available in this environment, so the loss was induced for real:

| Step | Observed |
| --- | --- |
| `loseContext()` | `getState().contextLost === true`, the full-screen overlay "WEBGL CONTEXT LOST / Rendering is paused…" appeared (`verify/shots/context-lost.png`), the RAF loop stopped |
| `restoreContext()` | within 30 s `contextLost` returned to `false`, the overlay disappeared, render targets and material programs were rebuilt, and the frame came back (meanLuma 0.186, 85 % non-black) **with no page reload** and `ready` still `true` |
| Console during loss + restore | 0 errors, 0 warnings |

## Known limitations

1. **Browser coverage is Chrome-only.** All browser results come from Google Chrome 153
   (`channel: 'chrome'`, headless) driven by Playwright. Firefox and Safari were not exercised;
   them being fine is not claimed. The shader is GLSL ES 1.00 source that three.js compiles as
   GLSL ES 3.00 on WebGL2 (three's standard translation), and it uses runtime indexing of a
   small local array, so it requires WebGL2 — a WebGL1-only browser would fail to compile it.
2. **Mobile results are emulated, not physical.** The 390 × 844 / DPR 2 run used Playwright's
   device emulation with `isMobile`/`hasTouch`. No real phone, tablet, iOS Safari or Android
   Chrome was tested, so genuine touch ergonomics (pinch-zoom feel, momentum, browser chrome
   overlap, thermal throttling) are unverified.
3. **The WebGL backend Chrome actually used is masked.** The renderer string reports
   `WebKit WebGL`, so it could not be established whether rendering ran on the GPU or on
   SwiftShader; `--enable-unsafe-swiftshader` only *permits* the software fallback, it does not
   force it. The observed first-frame latency (56–800 ms at 1440 × 900 with up to 320 geodesic
   steps per pixel) is consistent with hardware acceleration but is not proof. No performance
   figure in this report should be read as a hardware benchmark.
4. **"Offline" was verified at the network layer, not by physically unplugging.** The harness
   asserts that zero requests leave the origin across 40+ page loads and that there are no
   failed requests; the bundle's only absolute URLs are inert string constants (XML namespace
   identifiers, React's `react.dev/errors/` message prefix and a JCGT citation embedded in the
   three.js source). A run on a network-isolated machine was not performed.
5. **Capture-mode determinism is exact only on a fixed pipeline configuration.** Two loads of
   the identical capture URL produced byte-identical frames here. This is not a cross-machine
   guarantee: different GPU/driver/ANGLE versions can differ in the last bit of a floating-point
   transcendental, so cross-machine pixel equality is not claimed.
6. **No budget-exhausted pixels were observed, so the step budget is an untested safety limit
   rather than a measured constraint.** The red "budget exhausted" class of debug view 1
   contains zero pixels in all 12 measured preset × quality combinations (including Standard's
   160-step budget) and also zero in a deliberately worst-case configuration (Standard tier,
   `diskInner = 3`, `diskOuter = 48`, `diskThickness = 0.05`, near-edge-on pose) — verified by
   counting red pixels in the saved debug-1 frames. Rays are still hard-capped at 160/320/480
   steps, so a user can in principle reach the cap with combinations beyond those tested, and no
   configuration in which the cap binds has been characterised. The visible cost of the smaller
   Standard budget is coarser sampling (0.75 render scale, 1.25× step length), not budget
   exhaustion: Standard is visibly softer than High at 1440 × 900.
7. **The disk is a Gaussian-thickness slab, not a vertically resolved disk.** It has no vertical
   structure, no self-shadowing and no irradiation of the outer disk by the hot inner region;
   emission is a single greybody with a Novikov-Thorne-like temperature profile, and the
   background is not beamed by the disk's own motion. Rays travelling almost exactly along the
   midplane accumulate a very long path through the slab, so their brightness is set by the
   absorption term rather than by the step size; rays that only graze it inside the annulus are
   sampled at ~0.35 × thickness per step.
8. **The preset 1 pose puts the camera inside the disk annulus.** `Photon Ring Edge` uses the
   specified pose (az 1.9, el 0.045, distance 12, fov 45°), where the distance is smaller than
   the outer disk radius (18 M) and the camera sits about 0.54 M above the mid-plane — barely
   outside the 0.5 M half-thickness. That is a physically legal configuration and it produces a
   dramatic near-edge-on view (the lower half of the frame is filled by the near-side disk), but
   the camera can end up inside the emitting volume when the thickness slider is raised or the
   elevation slider is lowered. Users who want an unobstructed edge-on shot should raise
   "Orbit distance" above the outer radius.
9. **Turbulence is procedural, not a simulation.** The disk turbulence is a value-noise fbm
   sampled in a co-rotating frame; it shears convincingly but it is not a fluid solver, it has
   no physical spectrum, and there is no magnetic field, jet, or synchrotron emission.
10. **No audio, by design.** There is no soundtrack and therefore no `M` shortcut, so nothing
    about audio autoplay was tested (and nothing can break it).
11. **Turbulence motion is not speed-limited.** Measured frame-to-frame change (8×8 signature
    distance, samples ~0.3 s apart, cinematic camera paused) at `preset 0 / high`:
    default `turbSpeed 1, timeScale 1` → 0.0006; `turbSpeed 0` → 0.0004 (grain only);
    `turbSpeed 3, timeScale 4` → 0.0042–0.0063 with the whole-frame mean luminance wandering
    (0.213 / 0.217 / 0.214). The per-frame change therefore grows roughly tenfold at the maximum
    setting, so at high `turbSpeed` combined with `timeScale > 1` the churn can read as rapid
    shimmer rather than smooth flow; nothing clamps that regime. Conversely `timeScale = 0`
    freezes the entire animation — frame-to-frame distance 0.0000, grain included, because the
    grain hash is seeded by the simulated clock.
12. **No human visual sign-off beyond this report.** The visual conclusions above come from the
    captured screenshots listed under `verify/shots/` plus the pixel statistics in
    `verify/final-report.json`; a human art-direction review was not part of this run.

## Human intervention required

None for the deliverable to run: `npm install && npm run build && npm run preview` needs no
credentials, no network beyond the npm registry, and no manual step. The only items a human
should follow up on are the unverified surfaces listed above (real mobile hardware, browsers
other than Chrome, and any performance claim).
