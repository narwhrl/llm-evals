# RESULTS — gargantua-schwarzschild-raytracer

- Full model: `magpie/opencode-go/muse-spark-1.3-contributor:xhigh`
- Candidate display ID: `muse-spark-1.3`
- Reasoning level: xhigh
- Baseline `main` SHA: `9ec1360f064c8cef28862671c58bc40ecfb1bd75`
- No subagents, no Task/Agent delegation, no other models, no other model
  APIs, no fallback: the required selector was confirmed present with xhigh
  support in `omp models` before starting, and all work was done directly in
  this worker session.

## Commands and results

All run inside
`tasks/gargantua-schwarzschild-raytracer/solution/` (exit 0 unless noted).

| Command | Result |
|---|---|
| `npm install --no-audit --no-fund` | 63 packages, `three@0.170.0` pinned, `package-lock.json` written |
| `npx vite build` (`npm run build`) | success, `dist/` in ~0.8 s (652 KiB JS, includes local Three.js bundle) |
| `npx vite preview --port 4173 --strictPort` | served production `dist/` statically (HTTP 200, IPv6 loopback here) |
| headless Chromium sweep (`run.mjs`, playwright-core 1.65.1) | **18/18 checks passed**, zero console errors, zero page errors |

## Browser verification (headless Chromium, SwiftShader software WebGL 2.0)

- Flags: `--no-proxy-server --enable-unsafe-swiftshader`; contexts:
  desktop `1440×900`, mobile `390×844 @2x`.
- Base page: `gargantuaReady === "true"`, `window.__GARGANTUA__` exposes
  `ready/getState/setQuality/setPreset/setDebug/setTime`; mean luminance
  0.370, dark fraction 4.4% (not a black screen).
- Capture contract
  `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`: state applies
  exactly (`time` frozen at 12.5 across frames, HUD hidden, loop paused),
  ready fires, frame mean luminance 0.374.
- Matrix: `setDebug(0–9)` → 9 distinct diagnostics (+ final composite);
  `setPreset(1–3)` → three distinct viewpoints; screenshots in `evidence/`.
- Invalid query (`quality=ultra&preset=9&debug=99&hud=7&time=-5`) and invalid
  setter inputs (`ultra/9/-1/-3`) fall back / return `false`, no exceptions,
  no black screen.
- Keys verified live: `0–9` debug, `h` HUD hide/show, `q` quality cycle
  (→ `cinematic`), `Space` loop pause/resume, `0` back to composite.
- Mobile: scene renders (mean 0.335), HUD present as bottom drawer.
- WebGL context: forced `loseContext` pauses with a visible recoverable
  overlay; `restoreContext` rebuilds all GL objects from preserved
  camera/time/params state and resumes (mean 0.371, no reload).
- Persistence: `localStorage` key `gargantua.v1`; reload keeps state;
  HUD reset returns to defaults.
- `evidence/` (git-ignored): 17 screenshots + `summary.json` with per-check
  results.

## Defects found and fixed (root causes)

- Camera basis vectors never computed (uniforms `uRight/uUp` stayed zero) →
  every ray identical → all-black frame. Restored the two cross-product lines.
- `Number(null) === 0` made a plain base URL force `hud=0`. Query parsing
  now checks key presence before coercion.
- Capture/query preset used `{dist,azim,elev}` keys against
  `{camDist,camAzim,camElev}` state → preset view silently not applied.
  `presetView()` now returns state keys; `setPreset` spreads it.
- Patch collisions deleted `renderFrame`, `st`, `getDebug`, `togglePlay`,
  `hudVisible` at various points; the app shell was rewritten whole to end
  that, and every path above re-verified after the rewrite.

## Known limitations / human intervention needed

- No physical GPU in this environment: verification used SwiftShader software
  rendering (slow frames, generous timeouts). Behavior on real GPUs should be
  confirmed by the curator; the shaders use only WebGL2-core GLSL.
- Headless ANGLE prints a benign `X4008 division by zero` program-info
  warning (D3D compiler, software path); it is a warning, not an error, and
  the console-error check is clean.
- Audio intentionally omitted (spec-optional; avoids autoplay failure modes).
- Touch gestures not physically exercised; OrbitControls touch input and the
  mobile drawer layout are enabled and were screenshot-verified.
- One D3D/SwiftShader-only environment: Retina `devicePixelRatio` handling
  verified at DPR 2 in the mobile context only.

## Cleanup

- Static preview server stopped; no dev servers running.
- Scratch harness in system TEMP removed; `node_modules/`, `dist/`,
  `evidence/` stay on disk but are git-ignored and uncommitted.
- The final `git status` shows only the intended `solution/` source files;
  no secrets were introduced (no network, no keys, no `.env`).
