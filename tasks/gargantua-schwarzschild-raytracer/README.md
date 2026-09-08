# GARGANTUA — Schwarzschild Black Hole Raytracer Evaluation

## Task Record

- Task ID: `gargantua-schwarzschild-raytracer`
- Canonical candidate path: `tasks/gargantua-schwarzschild-raytracer/solution/`
- Candidate result report: `tasks/gargantua-schwarzschild-raytracer/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: Prepared on `main`; no evaluation round or candidate branch has started.

## Shared Inputs

This task intentionally provides no starter project, implementation, golden image, or fixed executable test. Shader architecture, numerical integration formulation, UI construction, post-processing architecture, local asset/vendoring strategy, and quality strategy are evaluated parts of the response. Every candidate must receive the same baseline, prompt, permissions, browser/runtime, viewport matrix, and review procedure.

The candidate must use React/Vite and a locally vendored Three.js ESM build at the canonical candidate path. Runtime must not fetch visual, audio, or library assets from a network. The required URL capture contract makes visual inspection reproducible without prescribing an art-direction clone or a particular Schwarzschild coordinate chart.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline. Create every `llm/gargantua-schwarzschild-raytracer/<model-id>` worktree from that exact SHA and require the full SHA in every candidate's `RESULTS.md`.
2. In each worktree, inspect `solution/` for the documented React/Vite source, lockfile, local `vendor/` contents, vendor provenance/licensing note, README, and result report. Verify that no candidate source is imported from another model branch.
3. Install according to the candidate's documented command, run its documented production build, and serve the produced static files with its documented static-server command. Record exact commands, exit codes, package-install failures, network requests, browser console output, and asset-loading failures.
4. Use a clean desktop browser profile at `1440 × 900` and a mobile profile at `390 × 844` with device scale factor `2`. Start at the base URL, wait for the documented ready condition, and confirm a stable full scene appears before any interaction.
5. Inspect both source and runtime integrity. The visible main image must originate from the custom full-screen fragment shader; source must contain a numerical Schwarzschild null-geodesic integration path, event-horizon termination, curved-path disk intersections, and ordered multiple-crossing contribution logic. Reject a solution that replaces these with a black sphere, ordinary disk mesh, static image, video, screenshot, cubemap, panorama, remote asset, or one-pass flat-ring effect.
6. At the desktop viewport, exercise orbit drag, wheel/pinch zoom, touch-equivalent camera input where available, each of four presets, cinematic loop pause/resume, HUD toggle, parameter reset, quality switching, and all `0`–`9` debug modes. Check that controls change the shader's actual view/state rather than only UI labels.
7. Change representative camera, disk, background, post-processing, and quality controls; reload and verify versioned persisted state. Then use the visible reset control and verify defaults return. Inspect all 21 required parameter controls for labels, usable ranges, and observable or state-reported effect.
8. Load the URL capture matrix with `capture=1`, `hud=0`, a fixed `time`, each `preset=0`–`3`, and each `debug=0`–`9`. Confirm query values apply before the first capture-ready frame; invalid values recover to defaults; `document.documentElement.dataset.gargantuaReady` becomes `true`; and `window.__GARGANTUA__` exposes the documented state methods without unhandled errors.
9. Verify the three quality profiles produce a meaningful quality-budget change while retaining a readable event horizon, photon ring, and lensed disk on desktop and mobile. Check resize, Retina DPR handling, mobile HUD usability, and no persistent black screen.
10. Where the browser exposes `WEBGL_lose_context`, induce a context loss and restoration after initial render. Verify that rendering pauses with a recoverable indication, state survives, renderer resources rebuild, and the final image returns without a page reload. If the environment cannot expose the extension, record that limitation rather than crediting an untested claim.
11. Recycle every development/static server after inspection. Preserve observed screenshots, browser behavior, console output, build results, and known limitations consistently across all candidates.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Rendering integrity:** a local Three.js full-screen fragment shader numerically follows Schwarzschild null geodesics per pixel; all visible black-hole phenomena arise from that path rather than prohibited geometry or prerecorded visual substitutes.
- **Relativistic image structure:** a genuinely dark event horizon, sharp photon-ring/critical behavior, lensed procedural stars and galaxy, primary and higher-order disk crossings, gravitational redshift, Doppler beaming, and animated disk turbulence are simultaneously legible.
- **Cinematic image quality:** HDR range, Bloom, ACES tone mapping, restrained vignette/grain/chromatic aberration, hot disk emission, and stable contrast reinforce rather than conceal the physical structure.
- **Interactive camera and HUD:** OrbitControls feed shader camera uniforms; cinematic loop and four distinct presets work; the full-screen HUD remains readable without occluding the subject; every required shortcut is discoverable and functional.
- **Parameter, debug, and state behavior:** at least 21 meaningful controls persist and reset correctly; all ten debug modes provide distinct useful diagnostic views; quality profiles affect real rendering cost/quality.
- **Automation and resilience:** the fixed URL capture contract, ready signal, state interface, invalid-query recovery, mobile/Retina behavior, and WebGL context-restoration path work without console errors or black screens.
- **Packaging and reproducibility:** React/Vite build succeeds, the static runtime works without a backend or runtime remote assets, local vendor provenance is clear, commands/results are accurately reported, and no servers remain running after delivery.

Do not infer quality from shader length, mesh count, package count, claims in `RESULTS.md`, or a single attractive still. Comparison conclusions require source inspection, observed browser behavior, capture-matrix evidence, and path-aligned candidate diffs from the same baseline.
