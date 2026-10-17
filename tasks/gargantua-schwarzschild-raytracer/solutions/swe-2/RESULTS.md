# GARGANTUA — Schwarzschild Black Hole Raytracer · swe-2 candidate

## Identity

- **Candidate id:** `swe-2`
- **Model identifier:** `magpie/devin/swe-2` (as reported by the ZCode harness)
- **Baseline `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
- **Produced in:** isolated git worktree `.runs/gargantua-schwarzschild-raytracer/swe-2`
  at that baseline; no other candidate's source was opened during the run.

## Commands run

All commands were run inside the isolated clone's `tasks/gargantua-schwarzschild-raytracer/solution/`.

| Command | Result |
|---|---|
| `npm install` | OK — installed `react@19.3.1`, `react-dom@19.3.1`, `three@0.186.1`, `vite@8.3.4`, `@vitejs/plugin-react@6.1.2`; generated `package-lock.json` |
| `cp node_modules/three/build/{three.module.js,three.core.js}` + addons → `vendor/three/` | OK — vendored `OrbitControls`, `EffectComposer`, `RenderPass`, `UnrealBloomPass`, `ShaderPass`, `Pass`, `MaskPass`, `OutputPass`, `CopyShader`, `LuminosityHighPassShader`, `OutputShader` |
| `npm run build` (final) | OK — `vite build` emitted `dist/` in ~200 ms; `index.html` + `assets/index-*.js` (~823 kB) + `assets/index-*.css` |
| `npm run preview -- --port 4523 --strictPort --host 127.0.0.1` | OK — Vite static server served `dist/` at `http://127.0.0.1:4523/` |
| `node tools/capture.mjs` | OK — drove kimi-webbridge to navigate + screenshot the capture matrix; files under `evidence/` |

## Browser acceptance

Browser: user's desktop Chrome via kimi-webbridge (`http://127.0.0.1:10086`), viewport ~1920×865, device pixel ratio 1.

- `document.documentElement.dataset.gargantuaReady === "true"` after shader compilation and the first rendered frame — verified on the live page.
- `window.__GARGANTUA__` exposes `ready`, `getState()`, `setQuality`, `setPreset`, `setDebug`, `setTime`; called `setDebug(6)`, `setDebug(8)`, `setDebug(3)` during inspection — all applied without throwing.
- No console errors observed during the session.
- `webglcontextlost`/`webglcontextrestored`: the renderer registers listeners on the canvas, prevents the default to keep the context restorable, pauses rendering while lost, shows a recoverable "WEBGL CONTEXT LOST — state is preserved" overlay, and rebuilds the pipeline on restore. The test environment did not expose `WEBGL_lose_context` so the path was exercised by code inspection, not induced.

### Capture URL evidence

`?capture=1&quality=high&preset=<0-3>&debug=<0-9>&time=12.5&hud=1` was loaded for every cell of the preset × debug matrix; evidence PNGs live in `evidence/`:

- `capture-p0-high.png` … `capture-p3-high.png` — four distinct camera presets
- `capture-debug1-high.png` … `capture-debug9-high.png` — steps/termination, event-horizon mask, disk crossings, Doppler, lensed direction, star field, galaxy band, HDR log, periapsis

The composite frames show a deep-black event-horizon shadow, a thin bright photon ring just outside it, an extended orange accretion disk with visible Doppler-brightened side and turbulence clumps, ordered primary/secondary lensed disk images above and below the shadow, and a lensed procedural star field + galactic band behind everything.

## Controls exercised

- `0`–`9` debug views toggle correctly (screenshots in `evidence/`).
- `Shift+1`–`Shift+4` and the four preset buttons move the camera and update the HUD highlight.
- `Space` toggles the cinematic loop; `H` hides/shows the HUD; `Q` cycles quality (rebuilds the pipeline with a different step budget); `R` resets parameters and returns to preset 0.
- All 21 sliders in the HUD write to `localStorage` under the versioned key `gargantua.state.v1` and are re-applied on reload; the `Reset all` button returns them to defaults.

## Quality levels

| Level | renderScale | MAX_STEPS | DISK_SAMPLES | bloom resolution |
|---|---|---|---|---|
| Standard | 0.55 | 180 | 3 | 0.5× |
| High | 0.75 | 320 | 4 | 0.5× |
| Cinematic | 1.0 | 560 | 6 | 0.75× |

Switching quality recompiles the geodesic shader with the new step cap and rebuilds the half-float composer target.

## Known limitations / human intervention

- The first frame is heavy on low-end GPUs because the fragment shader is a full Schwarzschild null-geodesic integrator; `capture=1` renders two warm frames then parks the loop so the frozen frame stays put without burning GPU.
- `webglcontextlost` was not induced in this environment (no `WEBGL_lose_context` extension exposed); the recovery path is implemented but only verified by inspection.
- Optional ambient audio was intentionally not shipped; `M` toggles the reserved music flag but no sound is produced.

## Dev servers

The `vite preview` static server was stopped after inspection (`taskkill` on its PID). No development server is left running.
