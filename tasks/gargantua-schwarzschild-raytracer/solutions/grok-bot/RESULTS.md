# RESULTS — gargantua-schwarzschild-raytracer / grok-bot

- **Model id:** `grok-bot`
- **Baseline main SHA:** `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- **Branch:** `llm/gargantua-schwarzschild-raytracer/grok-bot`
- **Worktree:** `/home/box/workspace/llm-evals/.worktrees/gargantua-schwarzschild-raytracer/grok-bot`
- **Recorded (Asia/Shanghai):** 2026-09-22 01:28:26 CST

## Commands actually run

### Install
```bash
cd tasks/gargantua-schwarzschild-raytracer/solution
npm install --no-audit --no-fund
```
**Result:** exit 0 (lockfile `package-lock.json` generated; React 18 + Vite 5 + three@0.170.0 as build-time vendor source).

### Vendor Three.js
Copied `node_modules/three/build/three.module.js` → `vendor/three.module.js`, OrbitControls → `vendor/addons/controls/OrbitControls.js` (import rewritten to local ESM), MIT `LICENSE`, provenance in `vendor/README.md`.

### Production build
```bash
npm run build
```
**Result:** exit 0. Emits `dist/index.html` + hashed assets (~662 KB JS).

### Gallery-style build
```bash
npm run build -- --base=/gargantua-schwarzschild-raytracer/grok-bot/ --outDir=../../../deploy/public/gargantua-schwarzschild-raytracer/grok-bot --emptyOutDir
```
**Result:** exit 0; `index.html` produced under that outDir (build artifact removed afterward; not committed).

### Static preview smoke
```bash
./node_modules/.bin/vite preview --host 127.0.0.1 --port 4173 --strictPort
```
Then headless Chromium (puppeteer-core + system `google-chrome-stable`, SwiftShader WebGL) loaded:

```text
http://127.0.0.1:4173/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

**Observed:**
- `document.documentElement.dataset.gargantuaReady === "true"`
- `window.__GARGANTUA__` present with `ready`, `getState`, `setQuality`, `setPreset`, `setDebug`, `setTime`
- Invalid `setQuality('nope')` → `{ ok: false }` (no throw)
- Capture freezes time at `12.5`, HUD collapsed, cinematic paused
- Canvas `1440×900`, Three.js r170
- Screenshots of presets 0–3 show event horizon shadow, lensed primary+secondary disk, procedural starfield, bloom/grain
- Console: no pageerrors; SwiftShader performance warnings only; favicon 404 addressed with data-URI icon

Preview server was stopped after smoke (no leftover servers intended at delivery).

## Browser / environment notes

- Headless GPU path used software WebGL (SwiftShader). Visual structure verified; native desktop GPU may look sharper/faster.
- `WEBGL_lose_context` restoration path is implemented in `GargantuaRenderer` (banner + rebuild targets/materials without reload). Not exercised end-to-end in this headless environment (extension/behavior limited under SwiftShader); treat as code-complete, runtime-limited verification.

## Known limitations

- Schwarzschild chart uses the standard real-time null reduction `dv/dλ = −(3/2)|h|²x/r⁵` with `rs=1` (documented in shader comments), not a full Christoffel RK4 in Boyer–Lindquist tetrads.
- Optional ambience music (`M`) not implemented (explicitly optional in task).
- Mobile viewport exercised only via responsive CSS + DPR caps in quality budgets; physical device not available in this run.
- Very high `Cinematic` step counts are expensive on software WebGL.

## Human intervention

None required beyond starting the evaluation worktree.
