# Candidate Results

## Identity and isolation

- Task: `orbital-habitat-diorama`.
- Model / candidate identifier requested by the user: `gpt-6-astra`. The session does not expose a verifiable backend build identifier; no unobserved version suffix is claimed.
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`.
- Implementation lives exclusively in `tasks/orbital-habitat-diorama/solution/` in an isolated, main-only clone and its `codex/orbital-habitat-gpt-6-astra` worktree.
- No subagents, other-model calls, candidate implementations, or model-generated images were used. Shared task inputs and fixed evaluation files are unchanged.

## Executed verification

Commands ran in the candidate solution directory on Windows:

| Command / check | Observed result |
| --- | --- |
| `npm install` | Completed after elevated network access; exact dependency versions and lockfile present. |
| `npm test` | 2 tests passed: orbit periods / scrub continuity, click threshold / disjoint floating-object envelopes. |
| `npm run build` | Passed for the root base path. |
| `npm run build -- --base=/orbital-habitat-diorama/gpt-6-astra/ --outDir=.preview/site --emptyOutDir` | Passed, including after the final night-cruise lighting adjustment. Final JavaScript: 570.45 kB, gzip 151.68 kB. |
| `npm run dev -- --port 5177 --strictPort` | Served the development scene for initial visual inspection. |
| `npm run preview -- --base=/orbital-habitat-diorama/gpt-6-astra/ --outDir=.preview/site --port 5178 --strictPort` | Served the production subpath used for final screenshots and interaction checks. |
| Image dimensions | All three Earth JPEGs are 2048 x 1024; the five evidence PNGs are 1440 x 900. |
| Production network / console | The JavaScript and three Earth textures returned HTTP 200 from the local subpath. No remote runtime asset requests. Final browser console warning/error query returned an empty list. |

Builds used a process-local `TEMP` and `TMP` pointing to `.preview/temp`; see the README. The existing test result remains applicable because the subsequent change only gates grow-light rendering during night cruise, not the tested orbit module.

## Visual and interaction inspection

Inspected the actual WebGL scene in Chrome, with a 1440 x 900 desktop viewport. All five required PNGs are unaltered screenshots of the final production build, not independent renders or screenshot-only replacements:

| Evidence | Observed state |
| --- | --- |
| `evidence/01-day.png` | Home isometric view; daylight 1.0, visible Earth land/clouds, atmospheric rim and sharp elliptical floor projection. |
| `evidence/02-night.png` | Home view; daylight 0, golden city belts, cool window rim and warm interior strips. |
| `evidence/03-focus-workstation.png` | Actual workbench click; focus `workstation`, zoom approximately 2.4. Screen curves, papers, pen, cup and surface textures are visible. |
| `evidence/04-night-cruise.png` | Actual strip click; cruise enabled on the night side, both main strips and grow light dark. Reading light, screen, indicators and Earth rim remain visible. |
| `evidence/05-fast-forward.png` | Actual window click; fast mode enabled, daylight approximately 0.993 and sunlight crossing the floor. |

- Default automatic operation was sampled from elapsed 25.32 to 217.19 seconds without fast mode or scrubbing: more than two 90-second periods. Night, daylight return, second night and the following transition were inspected. This is sampled observation, not a recorded video or continuous performance benchmark.
- Fast-mode samples at elapsed 3.18 / phase 0.07030 and elapsed 29.13 / phase 0.80036 agree with a 15-second period (predicted phase 0.80030, allowing rounded timestamps). A second window click restored normal speed.
- Actual horizontal Earth drag moved phase from approximately 0.68480 to 0.43398, incremented the scrub count and left fast mode false. Phase continued increasing after release.
- Workbench, sleeping bag, garden, chair, bike and storage all focused. Same-object click, empty-space click and Escape returned to the home composition.
- Grow-light off/on, night-cruise off/on and restoration of the saved grow-light state were operated and visually checked. During night cruise the grow light is suspended even when its saved switch is on.
- Mouse movement near the pen produced a small displacement; clicking the visible pen increased its spin count from 0 to 1 and changed its orientation rapidly. Separate pen and grow-light inspection captures were reviewed during testing.
- Dragging to both rotation bounds yielded approximately `(azimuth 0.20, elevation 0.90)` and `(1.15, 0.32)` while keeping the interior visible. Wheel zoom and home reset worked.
- A 390 x 844 mobile emulation showed the whole miniature without horizontal overflow. A real two-pointer CDP touch gesture increased zoom above 1.65. This is browser emulation, not a physical-phone test.
- Inspected the floor grille, fabric weave, paper printing, leaf veins/water droplets, panel seams, labels, hatches and bundled wiring in overview and close-up captures. Floating objects occupied separate regions; no collision was seen during the sampled run.
- Day and night maps share continental alignment. Inspected their equirectangular images, repeat-wrapped longitude and polar bands; no obvious seam or polar spike appeared in the tested window views. The full globe is not exposed by the cabin camera, so this is not an exhaustive all-angle planet inspection.

## Local assets and permissions

| Asset | Source / generation | License |
| --- | --- | --- |
| `public/textures/earth-day.jpg` | Solar System Scope / INOVE, unchanged [2K Earth day map](https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `public/textures/earth-night.jpg` | Solar System Scope / INOVE, unchanged [2K Earth night map](https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg) | CC BY 4.0 |
| `public/textures/earth-clouds.jpg` | Solar System Scope / INOVE, unchanged [2K Earth clouds](https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg) | CC BY 4.0 |
| Surface maps, labels, leaf map, photos, note, book pages, live display and light halo | Original deterministic Canvas artwork in `src/textures.js`; generated locally, no image service or downloaded font | Original candidate-generated assets; no third-party artwork license applies. No separate license is granted beyond the repository's applicable terms. |
| Cabin geometry, fixtures, planet and atmosphere | Original Three.js geometry and shaders in this candidate | Original candidate code; Three.js itself is MIT, Vite is MIT. Dependency notices remain in installed packages / the production bundle. |

The Earth source catalog is [Solar System Scope textures](https://www.solarsystemscope.com/textures/). Attribution also ships in `public/textures/ATTRIBUTION.txt`. The application changes lighting and map blending, not the downloaded source JPEGs. The catalog request returned HTTP 403 during this run and a later browser attempt timed out; the source downloads themselves succeeded. No claim is made that the catalog page was freshly retrieved successfully.

## Limitations and environment failures

- WebGL2 is required; startup or context loss is reported visibly rather than replaced by a fake scene. Only Chrome desktop and its mobile emulation were exercised, not Safari, Firefox, physical mobile hardware or accessibility assistive devices.
- This is a stylized miniature. Scale, sunlight projection, illumination and motion are art-directed approximations, not an orbital or rigid-body physics simulation. Collision avoidance uses separated motion envelopes, not general collision detection.
- Vite reports a JavaScript chunk larger than 500 kB. The warning is retained, not suppressed. There is no backend or remote runtime asset dependency.
- Sandbox installation initially failed with `ENOTFOUND`; elevated installation succeeded. Sandboxed builds encountered `EPERM`; the host's system temporary directory also denied esbuild access. Elevated builds with a workspace-local temporary directory succeeded without changing machine settings.
- The browser inspection connection was interrupted once. That incomplete pass was not counted; inspection resumed on the production preview. Background-tab throttling caused a camera-settle wait to expire at about 1 FPS. Bringing the test tab to the foreground yielded approximately 104 FPS in one two-second sample; this is environment-specific, not a performance guarantee.
- Some inspection waits timed out because a click landed beside the bike mesh or the next fast-mode daylight interval was outside the wait window. Retargeting the visible saddle and sampling the next daylight interval verified the intended states. These were inspection failures, not ignored application errors.
- No manual scene editing, external code contribution or credential entry was required. Publishing uses the repository's existing authenticated Git and gallery deployment workflow, outside the isolated candidate implementation.
