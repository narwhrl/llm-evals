# RESULTS · orbital-habitat-diorama · zcode-harness

## Identity and starting point

- Candidate ID: `zcode-harness`. It measures the ZCode multi-agent harness, not a single model.
- Coordinator (lead) model: `anthropic/claude-opus-5-5`, as reported by the ZCode platform.
- Subagent models, as each subagent reported itself:

| Role | Subagent type | Model | Work |
| --- | --- | --- | --- |
| Architecture and skeleton | `architect` | not self-reported | Core modules (`clock`, `controls`, `interaction`, `registry`, `state`, `main`, `profile`, `canvas`) and `docs/DESIGN.md` |
| Asset research | `researcher` | not self-reported | Downloaded and converted the NASA Earth textures |
| Worker A: cabin structure | `impl` | `new-provider/gpt-6.1-sol` | `src/cabin/**`, `src/textures/structure.js` |
| Worker B: furnishings | `impl` | `new-provider/gpt-6.1-sol` | `src/furniture/**`, `src/textures/props.js` |
| Worker C: Earth and lighting | `impl` | `new-provider/gpt-6.1-sol` | `src/earth/**`, `src/lighting/**` |
| Integration polish | `architect` | not self-reported | Sun path, day brightness, porthole coverage |
| Code review | `general-purpose`, read-only | not self-reported | P0–P3 review |
| Review and performance fixes | `impl` | `new-provider/gpt-6.1-sol` | Review findings, batching, shadow fitting |
| Visual-gate round 2 fixes | `impl` | `new-provider/gpt-6.1-sol` | Sun shaft, sun-patch occluder, ceiling clothes |
| Visual acceptance | `documents:visual-judge` | not self-reported | Three rounds on the rendered screenshots |

- Starting `main` commit: `7b2f86cc1643ff70650e668db7f69b1a630efaec`.
- Isolated clone: `.runs/orbital-habitat-diorama/zcode-harness`, created with the README's `git clone --no-local --single-branch --branch main --no-tags`, detached at the baseline, `origin` removed, and no tags present.
- The dedicated `reviewer` subagent failed to start twice with `Provider unavailable (provider-not-found; selection=openai/gpt-6-astra)`. The review ran on a `general-purpose` subagent with read-only instructions. Because its model is not recorded, whether the reviewer and implementers came from different model families (AGENTS.md) is **not verified**.

## Environment

- Windows 10.0.26200 x64, Intel Arc 140T iGPU (ANGLE D3D11)
- Chrome driven through the Kimi WebBridge extension 2.0.22 and CDP
- Node v24.21.0, npm 11.19.0
- Dependencies, pinned exactly with a lockfile: `three` 0.186.1, `vite` 8.3.1 (dev)

## Implementation summary

- Plain Three.js ES modules with no framework. `OrthographicCamera` at a true isometric view (azimuth 45°, elevation 35.264°), with custom damped controls clamped to azimuth 10°–80°, elevation 15°–60° and zoom 0.8–4. Focus moves use eased transitions.
- Cabin: a cut-away shell swept along one cross-section profile, with a layered cut face (skin, insulation, ribs, inner panel) and a layered floor slab. Real openings for the Ø1.5 m porthole and the two Ø0.45 m portholes, with heavy bolted frames. Two closed end hatches, each with an observation window. Ring ribs, zip-tied cable bundles, vents, access panels, labels (`04`, `O₂`, `CAUTION`, `N₂ PURGE`, …) and blinking LEDs.
- Earth: one sphere per porthole, rendered only inside that porthole's stencil mask and kept at a fixed distance behind it. A custom shader blends day and night across the terminator and adds warm city lights, drifting clouds, ocean glint and a Fresnel atmosphere rim. The small portholes show the same Earth from different angles.
- Lighting: a shadowed sun follows the orbital clock. An invisible light-blocking capsule (`colorWrite:false`) lets light in only through the portholes. A soft additive light shaft, a warm floor-strip light, reading lamp, laptop glow, pink-violet grow light and blue Earthshine complete the set. Exposure and bloom rise with sunrise glare.
- Every texture except the three Earth maps is drawn procedurally on a canvas at startup.
- `window.__HABITAT__` exposes references (clock, state, controls, camera, renderer, composer, scene, registry, interaction) for automated verification. It cannot swap models or turn on any rendering mode used only for screenshots.

## Commands actually run (final state)

| Command | Result |
| --- | --- |
| `npm install` (architect, to create the lockfile) | Installed three 0.186.1 and vite 8.3.1 |
| `npm run build` | Passed. `dist/index.html` 0.57 kB; JS about 837 kB (gzip about 222 kB). Vite warns that the chunk exceeds 500 kB (three.js plus the app, in a single chunk) |
| `MSYS_NO_PATHCONV=1 npx vite build --base=/orbital-habitat-diorama/zcode-harness/ --outDir=dist-sub` | Passed. `index.html` references `/orbital-habitat-diorama/zcode-harness/assets/…`, and `dist-sub/textures/` holds the three Earth maps |
| `MSYS_NO_PATHCONV=1 npx vite preview --outDir=dist-sub --base=/orbital-habitat-diorama/zcode-harness/ --port 5341 --strictPort` | Returned 200 at the subpath. Browser network capture showed `index.html`, the JS bundle and all three textures at 200, all on localhost. The only failure was `favicon.ico` at 404 (none is shipped); the only non-local request was the WebBridge extension's own injected script. All 6 Earth materials had their textures loaded, and the error collector stayed empty |
| `npx vite preview --port 5340 --strictPort` | Root-path preview used for acceptance, returned 200 |

Every preview and dev server started during the run was stopped afterwards. `dist/` and `dist-sub/` were deleted.

## Browser verification (1440 × 900, DPR 1, fresh reload, error collector installed before load)

- **Two live cycles** without scrubbing, sampled every second for 184 s. Sunrises came at t = 81.4 s and 171.9 s, **90.5 s apart**. Sun intensity peaked at 23.4 at phase 0.028, the sunrise glare, and was 0 at night. The error count stayed 0.
- **Real CDP pointer input**:
  - A porthole click switched fast-forward on (period ramping toward 15 s) and a second click back to 90 s.
  - A 300 px porthole drag moved the phase 0.2137 → 0.2286, `scrubbing` was false after release, and auto-advance resumed.
  - The floor strip toggled `nightCruise` on and off, and the grow-light bar toggled `plantLight` off and on.
  - Clicks focused the workstation, sleeping bag, plant rack, viewing chair and bike. An empty click, or a second click on the workstation, returned to the home view (target (0, 1.25, 0), zoom 1).
  - The pen's rotation over 20 frames went from 0.039 rad idle to 1.868 rad after a click. A hovering pointer pushed it 0.033 m.
  - Drags and wheel input clamped to azimuth 10°/80°, elevation 15°/60° and zoom 0.8/4.
- The implementation workers also verified: pointer-cancel, lost-capture and blur recovery; drag-out-and-back not registering as a click; chair-base clicks focusing the chair rather than the strip; floaters staying inside non-overlapping motion boxes over 1,200 samples; and DPR capped at 2.
- **Console**: `window.__errs` (errors, warnings, unhandled rejections, resource errors) was `[]` in every run.

## Visual self-check

Screenshots were taken with CDP `Page.captureScreenshot` after hiding the extension's `#kimi-webbridge-agent-visuals` overlay. That overlay draws a glowing border even when the canvas is hidden, so it does not come from the app. Each capture first asserted the camera was at the home view.

- **Round 1** (coordinator): the sun patch was faint and split up by the desk and chair, the day was too dim, and the porthole bore covered part of the Earth. The polish pass fixed these.
- **Visual judge, round 2**: failed sunrise for a floor-strip white-out and a hard-edged amber rectangle from the light shaft over the Earth. Day, noon and sunset failed for a notch in the sun patch, cast by the desk. Every page failed for missing ceiling clothes. An earlier judge pass, run while the camera was accidentally left focused on the chair, was discarded as invalid framing.
- **Visual judge, round 3**: all five phases (sunrise, day, noon, sunset, night) **passed**.
- **Evidence**: all five `evidence/` images **passed** the visual judge.

## Evidence (`evidence/`, captured from the production preview through real clicks)

| File | How it was produced |
| --- | --- |
| `01-day.png` | Home view, orbit held at phase 0.20 |
| `02-night.png` | Home view, orbit held at phase 0.75 |
| `03-focus-workstation.png` | Real click on the laptop at phase 0.30, then `state.focused = workstation` |
| `04-night-cruise.png` | Phase 0.75, then a real click on the floor light strip (`nightCruise = true`) |
| `05-fast-forward.png` | Real click on the big porthole, then the live 15 s cycle captured at phase 0.042 as sunlight sweeps in after sunrise |

The phase holds use the clock's own scrub API (`setPhase` plus `beginScrub`), the same code path as dragging the Earth. No screenshot uses overlays, a separate still image or a model swapped in for capture.

## Asset provenance

| File | Source | Processing | License |
| --- | --- | --- | --- |
| `public/textures/earth_day.jpg` (4096×2048) | NASA Visible Earth record 57752, Blue Marble land surface, shallow water and shaded topography. `https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_8192.tif` | `ffmpeg -i day_8192.tif -vf scale=4096:2048 -q:v 3 earth_day.jpg` | NASA imagery, generally not subject to US copyright ([NASA media usage guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)). Credit: NASA Earth Observatory / Blue Marble |
| `public/textures/earth_night.jpg` (4096×2048) | NASA Visible Earth record 79765, Earth at Night 2012 (Black Marble). `https://eoimages.gsfc.nasa.gov/images/imagerecords/79000/79765/dnb_land_ocean_ice.2012.13500x6750.jpg` | `ffmpeg -i night_13500.jpg -vf scale=4096:2048 -q:v 3 earth_night.jpg` | Same as above. Credit: NASA Earth Observatory / NOAA NGDC, Suomi NPP VIIRS |
| `public/textures/earth_clouds.jpg` (2048×1024) | NASA Visible Earth record 57747, Blue Marble clouds. `https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57747/cloud_combined_2048.jpg` | `ffmpeg -i clouds_2048.jpg -q:v 3 earth_clouds.jpg` | Same as above. Credit: NASA Earth Observatory / Blue Marble |
| All other textures | Generated at runtime on canvas by `src/textures/*.js` and `src/furniture/laptopScreen.js` | None | Original to this candidate |

The researcher subagent checked that day and night continents align, north is up, longitude −180 is on the left, and the seam falls in open Pacific. The exact per-record credit wording could not be confirmed, because `visibleearth.nasa.gov` record pages now redirect to `science.nasa.gov`.

## Known limitations

- **Performance** misses the internal ≤12 ms target on the Intel Arc 140T iGPU. A full composer frame takes about 34–38 ms of blocking GPU time, and the live frame rate is roughly 22–29 fps with Chrome in the foreground and about 86 rAF/s sampled once. The performance pass cut draw calls from 621 to 238, triangles from 257k to 148k, and shadow casters from 551 to 17. The remaining cost is mostly the 4096×2048 sun shadow map plus bloom and FXAA.
- When Chrome is behind another app it throttles rAF to about 1–2 fps. Lights ease in over about 0.4 s of frame time, so captures needed to wait for real frames to settle.
- The Earth offset leaves only a thin sliver of black space in the big porthole.
- During night-cruise the grow light is also dimmed, which the brief doesn't state explicitly; clicking it during cruise brings it back. This is documented in `docs/DESIGN.md` §7.
- Visual acceptance covered the home camera and the workstation focus. The other focus views and extreme rotation angles were checked by the implementation workers only, not by the visual judge.
- The JS bundle is a single chunk of about 837 kB; Vite's size warning was not addressed.

## Human intervention

- The user asked for this run, required heavy use of multi-role subagents, and asked for kimi-webbridge visual acceptance, a push and a gallery update.
- During the run the user typed "继续" (continue) once, after an interrupted subagent launch, and once asked to restart the `reviewer` subagent. The restart hit the provider error above. No other human prompts, corrections or code edits.
