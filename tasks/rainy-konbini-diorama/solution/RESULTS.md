# Rainy Konbini Diorama — Result Report

## Provenance

- Task: `rainy-konbini-diorama`
- Gallery candidate ID: `kimi-k3.1-pro`
- Complete model identifier: `magpie/kimi-code-cn/k3.1-pro`
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Source tag for this revision: `candidate/rainy-konbini-diorama/kimi-k3.1-pro-r20261024`
- The pre-existing same-name candidate tag was left unchanged. This rerun uses a revisioned source tag so the original immutable tag remains preserved.

## Run

```bash
npm ci
npm run dev
```

For a production run:

```bash
npm run build
npm run preview -- --port 4173
```

Open the printed local URL. Initialization is synchronous with module evaluation; all geometry and textures are generated locally, with no remote assets, credentials, or initialization UI. Drag to orbit and use the wheel or pinch gesture to zoom.

## Verification Actually Run

- `npm install` — passed; 12 packages installed and lockfile generated.
- `npm ci && npm run build` — passed with Node.js `v24.21.0` and npm `11.19.0`. Final Vite build transformed 8 modules and emitted a 572.68 kB JS bundle (148.96 kB gzip). Vite reported its non-fatal chunk-size warning.
- `npm run preview -- --port 4173` — served the production build at `http://127.0.0.1:4173/`; the server was stopped after verification.
- Browser review used a `1440 × 900` viewport at device scale factor 1. The initial view contained the complete square base, central store, street turn, and no visible UI or people.
- Pointer drag, wide orbit, wheel zoom-in, and wheel zoom-out were exercised. Storefront, visible interior, side vending area, reverse street corner, alley entrance, roads, roof, and base were inspected at multiple angles and distances.
- The foreground animation session was observed for more than 120 seconds. Timed captures verified the automatic-door open phase and traffic-signal color changes; rain, eave drips, puddle ripples, glass runoff, and wet-light reflections remained active during inspection. A final material-only adjustment was then reloaded and visually rechecked.
- Foreground frame delivery measured 563 animation frames over 5001 ms on the review machine. Background-tab throttling was excluded from this measurement.
- Final browser error capture: `[]`. The final local request capture contained 12 completed responses, all HTTP 200, including the final HTML, JS, and CSS assets. No external asset requests were required.

## Limitations and Resolved Environment Issues

- Wet-road reflections use art-directed translucent/additive geometry and conventional material specular highlights, not ray-traced reflections.
- The production bundle retains Vite's advisory warning for a chunk larger than 500 kB; the build succeeds and the gallery path uses the same bundle.
- An initial `npm ci` attempt hit Windows `EPERM` because the running preview held Rollup's native module. After stopping that preview, the same clean install and build command passed.
- No known functional failures remain.

## Human Intervention

- Initial user prompts: 1.
- Corrective user prompts: 0.
- Required human interventions: 0.
- No subagents or other models were used. Existing candidate implementations and other models' implementations were not inspected.
