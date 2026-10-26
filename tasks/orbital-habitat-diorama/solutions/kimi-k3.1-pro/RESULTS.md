# Orbital Habitat Diorama — Result Report

## Candidate

- Candidate ID: `kimi-k3.1-pro`
- Complete model identifier: `magpie/kimi-code-cn/k3.1-pro`
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Source: isolated detached worktree `.worktrees/orbital-kimi-k3.1-pro`, created at that exact baseline.
- Implementation path: `tasks/orbital-habitat-diorama/solution/`
- Runtime: Vite 7.1.7, Three.js 0.180.0; Node.js 24.21.0 and npm 11.19.0 on Windows.
- No subagent, other model, other candidate source, or reference implementation was used.

## Deliverables

- Orthographic cut-away habitat with three actual wall apertures, two end hatches, thick floor and structural sections.
- Sleeping, work, viewing, plant, fitness and storage zones, with generated fabric, paper, metal, screen and label textures.
- One real Three.js Earth sphere with local day, night and cloud maps and a separate atmosphere shader. Each porthole uses a perspective camera aimed at that same sphere and renders it into a local texture; the cabin camera is orthographic. These are live rendered views, not static Earth backgrounds.
- Actual-time 90-second orbit and 15-second fast-forward, day/night material blending, city lights, a moving sharp sunlight patch, cool window rim and warm local lights.
- Drag rotation, zoom, five major fixture focus/return interactions, porthole scrubbing and click toggles, pen avoidance/spin, plant light and night-cruise toggles.
- Five real browser screenshots under `evidence/`, each 1440 × 900 pixels. No screenshot-only model, overlay image, compositing or postprocessing is used.
- Locked dependencies, local assets, root and subpath production builds, and operating instructions in `README.md`.

## Verification commands

Run from repository root unless noted otherwise.

| Command | Result |
| --- | --- |
| `git worktree add --detach .worktrees/orbital-kimi-k3.1-pro 091c801b98342f2e778bd356e0c55b7372398541` | Passed; isolated baseline worktree created. |
| `npm --prefix .worktrees/orbital-kimi-k3.1-pro/tasks/orbital-habitat-diorama/solution ci --no-audit --no-fund` | Passed after stopping the candidate's own residual Vite/esbuild processes. 15 packages installed from the lockfile. |
| `npm --prefix .worktrees/orbital-kimi-k3.1-pro/tasks/orbital-habitat-diorama/solution run build` | Passed; Vite built the root production bundle. |
| `MSYS_NO_PATHCONV=1 npm --prefix .worktrees/orbital-kimi-k3.1-pro/tasks/orbital-habitat-diorama/solution run build -- --base=/orbital-habitat-diorama/kimi-k3.1-pro/ --outDir=.preview --emptyOutDir` | Passed; emitted JS and CSS use the requested subpath. `MSYS_NO_PATHCONV` prevents Git Bash from rewriting the Vite option. |
| `node .worktrees/orbital-kimi-k3.1-pro/preview-server.mjs` | Served `.preview` at `http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/` for production acceptance; the script is test tooling outside the deliverable. |
| `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/` | HTTP 200. |
| `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/assets/earth-day.jpg` | HTTP 200. |
| `git -C .worktrees/orbital-kimi-k3.1-pro diff --check` | Passed before candidate packaging. |
| `node -e <PNG header inspection>` | All five evidence files are exactly 1440 × 900. |

## Browser acceptance

Kimi WebBridge controlled the real browser. Pointer interactions were dispatched to the application's canvas; `window.__habitat` was used only to read state and current projected coordinates, not to set state. The acceptance tab used `Emulation.setDeviceMetricsOverride` for 1440 × 900 and focus emulation to keep it visible and animating during screenshots and timed observations.

Observed on the production build:

- Clean load has `OrthographicCamera`, no visible UI, working local textures, and default `fastForward=false`, `plantOn=true`, `stripOn=true`.
- First view directly shows the large porthole and Earth, all furnishings, floor grating and daylight patch. Small portholes show the same rotating Earth from different directions.
- `01-day.png`: inspected personally; day Earth, clouds, readable cabin, sharp circular sunlight patch, structural thickness and no UI.
- `02-night.png`: inspected personally; golden city lights, cool atmospheric rim, warm reading/plant/local light and readable shadow detail.
- `03-focus-workstation.png`: inspected personally; readable orbital telemetry, graph pixels, keyboard, paper, fasteners, cup strap and nearby furnishings.
- `04-night-cruise.png`: inspected personally after verifying `stripOn=false`, `daylight=0`; the main floor strip is off while the reading light, screen, plant light and indicators remain.
- `05-fast-forward.png`: captured after real porthole interaction with `fastForward=true` and a visible daylight patch.
- Workstation, sleep, plants, chair and bike clicks focus their corresponding object; clicking empty space returns toward the isometric overview. A further wait confirms the completed transition after intermediate zoom samples.
- Pen click produces a real `penSpin` impulse and focuses the pen. Mouse proximity drives the pen's small avoidance offset.
- Plant light toggles `plantOn` independently; floor strip toggles `stripOn` independently without disabling local lights.
- Porthole dragging changes `orbitTime` without toggling fast-forward. After release, automatic progression resumes.
- Fast-forward toggles on/off. In a measured three-second sample, `orbitTime` advanced by approximately `0.20029`, matching a 15-second cycle.
- Camera drag changes the orbit angle, wheel input changes zoom, and OrbitControls limits the viewing angles and zoom range.

## Timed cycle observation

A 182-second browser evaluation observed the visible production tab at one-second intervals. It advanced `orbitTime` by `2.028651` cycles, with minimum daylight `0`, maximum daylight `1`, and both full day and night states observed. Its captured `error` and `unhandledrejection` list was empty. No earlier background-tab observation is counted as passing evidence.

## Network and console

- Production HTML, bundled JS/CSS, `earth-day.jpg`, `earth-night.jpg` and `earth-clouds.jpg` loaded with HTTP 200 from the local subpath.
- Runtime art does not depend on remote resources. Browser-extension support scripts are outside the application and are not dependencies.
- The final acceptance run checks `error` and `unhandledrejection` events; results are recorded with the final cycle observation.
- Initial failed candidate initialization, window projection/occlusion issues, hit-priority errors and background-tab timing were fixed or excluded rather than reported as passing. No known failing application console error remains in the final run.
- A browser default favicon 404 encountered before adding the inline icon was addressed. An earlier temporary preview path also returned 404 before its absolute path was corrected; neither is part of the delivered application.

## Asset provenance

Full attribution and license text references are in `public/assets/LICENSE.md`.

- Solar System Scope `2k_earth_daymap.jpg`, `2k_earth_nightmap.jpg`, `2k_earth_clouds.jpg`, downloaded unmodified on 2026-10-26.
- Source: https://www.solarsystemscope.com/textures/
- License: Creative Commons Attribution 4.0 International. Attribution: Earth textures by Solar System Scope (https://www.solarsystemscope.com).
- All other geometry and textures are generated by this project. Family photos are geometric illustrations, not real photographs. No external model, font, stock image or icon pack is used.

## Known limitations and environment notes

- This is a stylized miniature, not a physically scaled orbital optics simulation. Earth views are live perspective renders of the same sphere, composited into real porthole apertures while the main cabin remains orthographic.
- The sunlight patch is an intentional shader-driven lighting effect coordinated with the orbit, not a full physically ray-traced window caustic.
- Camera transitions reject new object pointer presses until they settle, preventing overlapping input while the camera moves.
- Browser background tabs suspend animation; the intended 90-second cycle is evaluated in a visible tab. The timed observation must not be performed in a hidden tab.
- During development, `npm ci` was blocked twice by this candidate's residual Vite/esbuild native processes on Windows. The owned processes were stopped and the locked install subsequently passed. No tests were skipped or weakened.
- Human intervention: none. The model performed implementation, browser inspection, screenshots, corrections, verification and reporting autonomously.

## Final observation status

Final clean-session cycle observation passed: `durationSeconds=182`, `cycles=2.028651`, `daylightMin=0`, `daylightMax=1`, `night=true`, `day=true`, `errors=[]`. The final browser state was a visible production page with finite camera/projection values. After reloading with capture enabled, production HTML, bundled JS/CSS and all three Earth images returned HTTP 200; no failed application asset request was observed.
