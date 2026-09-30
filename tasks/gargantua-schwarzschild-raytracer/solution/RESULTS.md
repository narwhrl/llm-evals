# Candidate results

- Model: `new-provider/gpt-6.1-sol`; candidate ID: `gpt-6.1-sol`.
- Pinned starting main: `a7bd9a780ded8c8a22c9186a045c834455835496`.
- Generated sequentially in an isolated main-only clone's detached worktree; current model only. No subagents, no other model calls and no other candidate sources.
- Human intervention: initial request only.

## Actual commands and results

- `npm install --no-audit --no-fund`: exit 0; npm's esbuild install-script approval notice observed.
- `node tools/vendor.mjs`: exit 0; local Three.js 0.180.0 ESM, core, OrbitControls and MIT license supplied.
- `npm run build`: exit 0, repeatedly after source changes. The bundle exceeds Vite's advisory 500 kB threshold.
- `npm run preview -- --port 4172 --strictPort`: production static dist successfully accessed by the browser.
- `npm run test:e2e`: exit 0. 1440 × 900 desktop and 390 × 844 mobile DPR 2; initial shader compilation and first frame; all 21 controls present; actual capture-URL matrix for four presets × ten debug outputs; three meaningful internal scales/step counts; representative exposure change and reload persistence; reset; shortcuts; orbit input cancels movie mode; same-origin resources; invalid URL values recover; no console errors.
- WebGL resilience: `WEBGL_lose_context.loseContext()` induced the recoverable status and ready=false; `restoreContext()` rebuilt resources and returned ready=true without navigation/reload. Passed in the real browser.
- `node tools/physics.mjs`: exit 0. Impact b=2.5 captured, b=2.6 escaped with 9.861 radians of bending, b=2.8 escaped with 5.327 radians. This numerically checks the known Schwarzschild critical value `3 sqrt(3)/2`.
- `npm run build -- --base=/gargantua-schwarzschild-raytracer/gpt-6.1-sol/ --outDir=dist-subpath`: first Git Bash invocation rewrote base to a Windows path; rerun with `MSYS_NO_PATHCONV=1` passed with the correct base. This shell behavior is recorded, not attributed to application code.

## Visual inspection

The current model directly read actual PNGs. An initial read found a degrees/radians overwrite in FOV synchronization; corrected and the full browser suite rerun. The final equatorial view contains the full lensed disk, dark captured-ray core, critical ring and lower secondary image. Polar and near-equatorial presets have clearly different structures. Debug 3 distinguishes first and multiple disk crossings. Mobile field of view was adjusted to retain the full physical structure in portrait orientation. HUD is scrollable and collapsible; capture hud=0 hides all overlays. The test bridge draws a focus-emulation border in PNGs; that border is not website content.

## Limitations and provenance

Original shaders and procedural sky/thermal/turbulence fields; no image, cube map, prerecorded frame, audio, API or runtime remote dependency. Three.js and Vite: MIT; React: MIT. Vendor provenance is documented separately.

The exact Schwarzschild orbital equation is integrated, but radiative transfer is a thin equatorial disk approximation; the thickness control changes crossing optical depth rather than tracing a full emitting volume. The solver has finite angular steps and can alias the narrowest high-order rings. Bloom is a bounded 24-tap screen-space kernel. Thermal color is an approximate black-body palette rather than spectral integration. There is no audio. GPU performance is device-dependent; quality budgets are 240/420/640 RK4 steps at .5/.7/1 internal scale. No head-to-head comparison with candidates using other baselines is claimed.
