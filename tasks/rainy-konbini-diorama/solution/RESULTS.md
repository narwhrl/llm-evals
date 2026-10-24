# Rainy Konbini Diorama — Result Report

## Provenance

- Task: `rainy-konbini-diorama`
- Gallery candidate ID: `kimi-k3.1-pro`
- Complete model identifier: `magpie/kimi-code-cn/k3.1-pro`
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Source tag for this atmosphere revision: `candidate/rainy-konbini-diorama/kimi-k3.1-pro-r20261025-lighting`
- All pre-existing candidate and revision tags were left unchanged. This revision has a new immutable source tag.
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

- `npm install` — passed; 12 packages installed and lockfile generated.
- `npm ci && npm run build` — passed with Node.js `v24.21.0` and npm `11.19.0`. The final atmosphere build transformed 18 modules and emitted a 593.22 kB JS bundle (153.43 kB gzip). Vite reported its non-fatal chunk-size warning.
- `npm run preview -- --port 4173` — served the production build at `http://127.0.0.1:4173/`; the server was stopped after verification.
- Browser review used a `1440 × 900` viewport at device scale factor 1. The initial view contained the complete square base, central store, street turn, and no visible UI or people.
- Pointer drag, wide orbit, wheel zoom-in, and wheel zoom-out were exercised. Storefront, visible interior, side vending area, reverse street corner, alley entrance, roads, roof, and base were inspected at multiple angles and distances.
- Atmosphere-specific inspection covered readable dark areas, neutral-warm interior lighting, broad storefront spill, fragmented cyan/amber wet reflections, selective bloom, and the corrected vending-machine exposure. Reference images are not shipped with the candidate.
- A continuous foreground sample delivered 3922 animation frames over 60005 ms with no captured errors; the page remained visible and focused throughout. A separate controlled foreground sample delivered 520 frames over 5008 ms. Browser occlusion throttling was observed during the review and excluded from these foreground measurements.
- Final browser error capture: `[]`. The final local request capture contained 12 completed responses, all HTTP 200, including the final HTML, JS, and CSS assets. No external asset requests were required by the scene.

## Limitations and Resolved Environment Issues

- Wet-road reflections use art-directed translucent/additive geometry and conventional material specular highlights, not ray-traced reflections.
- The production bundle retains Vite's advisory warning for a chunk larger than 500 kB; the build succeeds and the gallery path uses the same bundle.
- An initial `npm ci` attempt hit Windows `EPERM` because the running preview held Rollup's native module. After stopping that preview, the same clean install and build command passed.
- No known functional failures remain.

## Human Intervention

- Initial and follow-up user prompts: 2.
- Refinement requests: 1.
- Required human interventions: 0.
- No subagents or other models were used. Existing candidate implementations and other models' implementations were not inspected.
