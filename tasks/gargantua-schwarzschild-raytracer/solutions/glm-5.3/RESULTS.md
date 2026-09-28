# RESULTS — glm-5.3 (independent rewrite)

## Candidate record

- **Model**: `zhipuai-coding-plan/glm-5.3` (GLM-5.3)
- **Starting `main` commit SHA (round baseline)**: `830739e3c4aad4b7ee072c121860b7a9ee87b7e`
  (= merge-base of this branch with `main`; task `docs: add Gargantua raytracer evaluation task`)
- **Provenance of this rewrite**: at the operator's request, the previous
  glm-5.3 candidate was fully deleted (commit `0054abc`, `chore: clear previous
  glm-5.3 candidate for independent rewrite`) and re-implemented from scratch
  from the shared task inputs only. Neither the previous implementation nor any
  other model branch was read or referenced. Note: an intermediate snapshot of
  the rewrite was committed out-of-band by the local operator as `89ed524`
  (`feat: rewrite Schwarzschild raytracer candidate`); the bug fixes found
  during verification were committed on top of it and are documented below.
- **Branch**: `llm/gargantua-schwarzschild-raytracer/glm-5.3`

## Commands actually run (all in the candidate worktree)

| Command | Result |
| --- | --- |
| `npm install --save-exact react@18.3.1 react-dom@18.3.1 three@0.180.0` | exit 0 |
| `npm install --save-dev vite@^5.4.0 @vitejs/plugin-react@^4.3.4 typescript@^5.5.4 @types/react@^18.3.8 @types/react-dom@^18.3.0 @types/node@^20.16.0` | exit 0 (2 npm-audit advisories in the dev toolchain, esbuild/vite transitive; no runtime impact) |
| `npm install --save-dev @types/three@0.180.0` | exit 0 |
| `npm run vendor` | exit 0 — copied `three.module.js`, `three.core.js`, `addons/controls/OrbitControls.js`, LICENSE from `node_modules/three@0.180.0`; regenerated `vendor/README.md` |
| `npm run build` (`tsc && vite build`) | exit 0 — 45 modules, `dist/` produced (675 kB JS / 4.9 kB CSS; single-chunk size warning only) |
| `npm run preview -- --port 4173 --strictPort --host 127.0.0.1` | served `dist/` at `http://127.0.0.1:4173/` during verification; stopped before delivery |

Bugs found by verification and fixed before delivery:

1. Composite shader used a sampler **array indexed by a loop variable** —
   illegal in GLSL ES 1.00 (`array index for samplers must be constant integral
   expressions`); the composite pass failed to compile and the canvas rendered
   black. Fixed by binding the bloom pyramid as named samplers with constant
   indices. Re-verified: 0 console errors, full scene visible.
2. `favicon.ico` 404 — replaced with an inline `data:` icon link.
3. `webglcontextrestored` initially disposed render targets whose GL objects
   died with the lost context, emitting
   `INVALID_OPERATION: delete: object does not belong to this context`
   warnings. Fixed: the restore path skips disposal of dead objects and
   recreates the fallback texture. Re-verified: 0 console warnings.

## Browser acceptance

Desktop browser tools were not connected to this session (no desktop app
browser), so verification used a zero-dependency Chrome DevTools Protocol
harness (Node 24 built-in WebSocket) driving the local Chrome 153.0.8010.53
against the production `vite preview` server. Full logs: `report.json` and
`screenshots` referenced below are kept (untracked) in `solution/.shots/`.

### Ready signal & console

- Desktop 1440×900, base URL: `document.documentElement.dataset.gargantuaReady`
  became `"true"` after 1.2 s (cold profile; ~0–20 ms warm via Chrome's shader
  cache), `window.__GARGANTUA__.getState()` returns the documented fields,
  measured ≈135 fps at `high`.
- **Console: 0 errors, 0 warnings** across the entire run (base load, capture
  matrix, interactions, persistence reloads, mobile, context loss/restore).

### Capture matrix (`capture=1`, `time=12.5`)

- `preset=0..3` (with `quality=high&debug=0&hud=0`): all ready, state reports
  `preset=N`, `time=12.5`, `hudCollapsed=true`, `cinematic=false`; screenshots
  `02-preset0..3.png` show four clearly distinct framings (mean luminance
  0.13 / 0.22 / 0.31 / 0.26), each with a dark horizon, bright disk and lensed
  background.
- `debug=0..9` (with `preset=1`): all ready and state reports `debug=N`;
  screenshots `03-debug0..9.png` are mutually distinct and meaningful (e.g.
  background-only view is 84 % dark with visible stars; closest-approach map is
  dominated by the photon-sphere heat band; disk-crossing view encodes 0–4
  crossings with black where the ray misses the disk).
- **Invalid values** (`quality=bogus&preset=99&debug=42&time=-5&hud=9`): page
  ready, no exception, state falls back to defaults (`quality=high`,
  `debug=0`, `preset=0`), screenshot renders normally.
- Pixel-statistics audit (Chrome-decoded, 6×6 grid + global measures) confirms
  the required structure in the default view: near-black event-horizon core,
  warm disk with Doppler asymmetry (receding side dim red, approaching side
  bright white), lensed arc above the shadow, and star field with hundreds of
  point sources.

### Interactions (desktop)

- Keys `5`/`0`: debug switched to 5 and back to 0. `Shift+1`/`Shift+3`:
  preset switched to 0 / 2. `Space` toggled cinematic off, then on. `H` hid
  and restored the HUD. `Q` cycled quality `standard → high`. `M` toggled the
  procedural ambience state (no autoplay error; audio is WebAudio-synthesised
  only after the key gesture).
- API rejection contract: `setQuality("nope")`, `setPreset(-1)`,
  `setDebug(11)`, `setTime(-3)` each returned `{ ok: false, error }` without
  throwing.
- Orbit drag (synthetic mouse): azimuth moved −3.2° → −29.6°, preset marked
  custom (`-1`). Wheel zoom: camera distance 5.20 → 4.74 r_s.
- Parameter slider (曝光度/exposure set to 2.1 via native input event):
  `getState().params.exposure === 2.1`.

### Persistence & reset

- After setting quality/preset/debug/exposure and reloading the page: state
  restored (`quality=high`, `preset=2`, `exposure=2.1`).
- `R` reset to defaults and cleared storage; after another reload defaults
  persisted (`preset=0`, `exposure=1.15`).

### Mobile

- 390×844 @ deviceScaleFactor 2: ready, full scene rendered
  (`06-mobile.png`); synthetic touch drag moved the azimuth 34.3° → 10.8°
  (`07-mobile-after-touch.png`); HUD renders as a bottom drawer.

### WebGL context loss / restoration

- `WEBGL_lose_context.loseContext()` after initial render: rendering paused and
  the overlay “WebGL 上下文丢失 — 已暂停渲染，等待设备恢复上下文后自动重建并
  继续……” appeared (`08-context-lost.png`).
- `restoreContext()`: overlay cleared, targets/programs rebuilt, rendering
  resumed at ≈144 fps without a page reload (`09-context-restored.png`).

## Known limitations

- Verification was performed with headless Chrome via CDP instead of a
  human-operated desktop browser (desktop browser tools were not connected to
  this session). All checks are scripted/observed programmatically; no manual
  aesthetic review of the image was performed — visual conclusions rely on the
  pixel-statistics audit described above.
- Chrome 153 CDP rejects synthetic `touchEnd` events ("Touch points must be
  between 1 and 16"), so the mobile drag was verified through the touch moves
  only; the touch-up path itself was not exercised by the harness.
- The optional ambience was verified for state toggling and absence of console
  errors; its sound was not audibly reviewed.
- Dev-server (`npm run dev`) was not part of acceptance; the production
  build + static preview path was exercised instead (as required by the task).
- `npm audit` reports 2 advisories in the dev toolchain (esbuild/vite
  transitive); none affect the shipped static site.

## Required human intervention

None. (Optional: a manual desktop-browser pass over `solution/.shots/` or a
live `npm run preview` session for aesthetic confirmation.)

## Delivery state

No dev or preview server was left running; the preview process used for
verification was stopped after the run. Screenshots and the harness report are
kept untracked under `solution/.shots/` for evidence.
