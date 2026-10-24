# Rainy Konbini Diorama — Result Report

## Provenance

- Task: `rainy-konbini-diorama`
- Gallery candidate ID: `kimi-k3.1-pro`
- Complete model identifier: `magpie/kimi-code-cn/k3.1-pro`
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Source tag for this detail revision: `candidate/rainy-konbini-diorama/kimi-k3.1-pro-r20261025-detail`
- Parent source commit: `89e192894e1a845a4f7b088be7bd5e484b6e72ff`. All pre-existing candidate and revision tags were left unchanged; this revision has a new immutable source tag.
- Visual research and applied references: [`REFERENCES.md`](REFERENCES.md)

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

- `npm install` and `npm ci` — completed during candidate setup; the dependency set is unchanged in this revision.
- `npm test` — passed with Node.js `v24.21.0`: 1 test, 1 pass, 0 failures. The regression test verifies that narrow viewports preserve the wide-view horizontal framing.
- `npm run build` — final build passed with npm `11.19.0`; Vite transformed 20 modules and emitted a 617.68 kB JS bundle (161.34 kB gzip). Vite reported its non-fatal chunk-size warning.
- `npm run dev -- --host 127.0.0.1 --port 4173` — served the final source at `http://127.0.0.1:4173/` for browser acceptance.
- Kimi WebBridge review at `1440 × 1000` and `900 × 900`, device scale factor 1, verified the complete base and all utility poles after responsive framing correction. Static geometry batching improved the measured `1440 × 1000` sample from 29 FPS before batching to 37 FPS after batching.
- Independent Chromium review used a `1440 × 1000` CSS viewport with device scale factor 1.25 and a `1799 × 1249` render buffer. The final default scene delivered 77 FPS over a three-second foreground sample with no captured browser errors.
- Real pointer drag and wheel zoom were exercised for storefront, side, rear, roof, alley, and street-furniture inspection. The rear service wall, vending-machine products, bicycle basket and mudguards, interior shelves, checkout, umbrella stand, notice board, road hardware, and wiring were visibly checked.
- Two timed captures at one fixed camera showed both automatic-door states and the traffic signal's green/red states; rain and puddle animation also changed between captures. Final browser error capture: `[]`.
- Visual defects found and corrected during this review: foreground pole occlusion, square-viewport base clipping, vending-product overexposure, floating/ground-clearance errors, and an unmodeled blank rear facade.

## Limitations and Resolved Environment Issues
- Wet-road reflections use art-directed translucent/additive geometry and conventional material specular highlights, not ray-traced reflections.
- The production bundle retains Vite's advisory warning for a chunk larger than 500 kB; the build succeeds and the gallery path uses the same bundle.
- No known functional failures remain.

## Human Intervention

- Required human interventions: 0.
- No subagents or other models were used. No other candidate implementations were inspected.
