# RESULTS

## Candidate identification

- **Model ID:** `omp-gpt-6-sol-minimax-m3`
- **Coding agent:** `minimax-m3-coding`
- **Baseline `main` SHA:** `48447fcd82c65abb929e051e61b94d6031aa81ba`

## Build / install evidence (run by Main in `solution/`)

- `npm ci` — succeeded. Reported "added 18 packages in 5s".
  - npm printed a warning that the postinstall script of `esbuild@0.25.12`
    was not approved by `--allow-script` / `allowScripts`; install
    completed regardless and the dev / build / preview paths below
    functioned.
- `npm run build` — succeeded. Vite `7.1.12`, 38 modules transformed,
  output sizes `js 765.08 kB` / `css 10.51 kB`. Vite emitted a
  `> 500 kB chunk` warning for the produced JS bundle; build succeeded.
- `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort` — static
  preview server started and reported ready on port `4173`.

## Browser evidence — desktop static preview (`1280×720`)

- `document.documentElement.dataset.gargantuaReady === 'true'`.
- Real Schwarzschild black-hole centre, primary accretion disk, and
  lensing ring visible on first frame.
- Console errors: 0.
- Network panel showed only same-origin requests (no third-party fetches,
  no 404s).

## URL / API matrix (static preview, `?capture=1&quality=standard&time=12.5&hud=0`)

- 40 capture URLs = 4 presets × 10 debug views, all rendered `ready=true`
  with `__GARGANTUA__.getState()` matching the URL parameters and
  console clean (errors = 0).
- Two consecutive screenshots of the same URL produced a
  `pixelChangeRatio = 0` (`diffScreenshot`), confirming capture-mode
  determinism.
- Invalid URL field values (out-of-range enum, NaN, Infinity,
  non-integer where integer expected) fell back to defaults without
  disturbing other persisted fields.
- Malformed / non-numeric `localStorage` entries were rejected and the
  store fell back to defaults (no NaN / Infinity leaking into uniforms).
- `window.__GARGANTUA__` API: invalid inputs returned `null` and did not
  mutate state.
- Slider sweep: `diskEmission` 1.2 → 3 visibly changed disk brightness;
  reset returned it to 1.2.
- Keyboard / pointer interaction: `Space` toggled movie, `Q` cycled
  quality, `H` toggled HUD, `Shift+3` selected preset 3, mouse-drag on
  the canvas rotated the camera.

## Browser evidence — mobile (`390×844`, DPR 3)

- Raw Puppeteer `iPhone` emulation profile (`coarse = true`, `touch = 1`).
- Initial quality default = `standard` (coarse-pointer detection in
  `state.js`).
- HUD ships collapsed on first paint.
- Canvas CSS width = 390, backing-store pixel width = 322
  (DPR cap 1.5 × `standard` scale 0.55 — the renderer's coarse-pointer
  cap and quality-budget scale).
- No horizontal document overflow at `390 px` CSS width.
- Touch interaction: tapping the header toggle expanded the HUD, a
  single-finger drag changed the camera azimuth.

## Browser evidence — WebGL context loss / restore (static preview)

- `canvas.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext()`
  flipped `ready → false` and status to `lost`; the amber "WebGL context
  lost — auto-restoring" overlay appeared; the active configuration
  (`preset = 1`, `quality = high`, `time = 12.5`) was preserved.
- `restoreContext()` flipped `ready → true` and status to `ready`; the
  overlay hid; a real new frame was painted.
- `diffScreenshot` before-loss vs after-restore: `pixelChangeRatio = 0`
  (since the captured `time = 12.5` value is pinned and no inputs were
  touched between the two captures).
- Console errors during the cycle: 0.
- Two repeated loss / restore cycles on the dev server passed with the
  same behaviour (idempotent recovery).

## Caveats / known limitations

- Optional audio playback (mentioned in the task as optional) was **not
  implemented**; this is allowed by the task and there is no M-key
  binding in the HUD.
- No verification was performed on a physical mobile device; all mobile
  evidence above comes from Puppeteer `iPhone` emulation only.
- npm emitted an `esbuild@0.25.12` postinstall warning during
  `npm ci` (script not approved via `allowScripts`); install and
  subsequent build / preview succeeded anyway.
- Vite emitted a `> 500 kB chunk` warning for the production JS bundle
  (`js 765.08 kB`); this reflects the vendored Three.js core / WebGL
  pipeline and is informational, not a failure.
- Items intentionally not run by this report: this project's
  `package.json` declares no dedicated `unit-test`, `lint`, or
  `formatter` scripts, so none were executed. The four throwaway
  `tmp/*-test.js` files were removed before this report was written.
- Pre-commit whitespace check: `git diff --cached --check` exited 2 with
  a single report at `vendor/three/three.core.js:48659: space before tab
  in indent`. The vendored Three.js / OrbitControls / LICENSE files were
  byte-compared against the upstream `three@0.181.2` tarball obtained
  from `npm ci` (`cmp` returned exit 0 on all four files); the vendored
  copies are kept verbatim from upstream, and the reported whitespace
  anomaly is therefore not a functional regression in this candidate.

## Verification commands actually executed

- `npm ci`
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`
- `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` (used for
  iterative visual / interaction checks and two recovery cycles
  before the production preview).

Except for the explicitly noted dev-server iterative checks, the
browser / URL / API / mobile / context-loss evidence above was
collected against the static preview produced by the third command.