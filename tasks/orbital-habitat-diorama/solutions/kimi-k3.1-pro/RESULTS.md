# Orbital Habitat Diorama — Result Report

## Candidate

- Candidate ID: `kimi-k3.1-pro`
- Complete model identifier: `magpie/kimi-code-cn/k3.1-pro`
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Initial implementation: isolated detached worktree `.worktrees/orbital-kimi-k3.1-pro`, created from that exact baseline; original candidate commit `3f7d317e797354bc27e7af5893dce386c0e4fc97` and tag `candidate/orbital-habitat-diorama/kimi-k3.1-pro` remain unchanged.
- Structural revision: isolated detached worktree `.worktrees/orbital-kimi-k3.1-pro-revision`, created from the immutable original candidate commit.
- Implementation path: `tasks/orbital-habitat-diorama/solution/`
- Runtime: Vite 7.1.7, Three.js 0.180.0; Node.js 24.21.0 and npm 11.19.0 on Windows.
- No subagent, other model, other candidate source, or reference implementation was used.

## Structure and deliverables

- Orthographic cut-away habitat with three real wall apertures, two end hatches, thick floor and shell sections.
- NASA / ESA references and the construction relationships adopted from them are documented in [`STRUCTURE.md`](STRUCTURE.md). The main porthole has a separate barrel, seals, flange, circumferential fasteners and external shutter hardware; structural members do not cross its viewing aperture. End frames attach to the hatch caps, and the thin roof arc represents the cut shell rather than a beam over the window.
- The main aperture is `1.64 m` in scene scale, matching the task's approximate `1.5 m`; cabin height is `2.55 m`. The surrounding shell has room for the window flange and outboard hardware.
- Sleeping, work, viewing, plant, fitness and storage zones, with generated fabric, paper, metal, screen and label textures. Wall seams, handholds, inspection panels and restrained utility routing follow the documented visual references.
- One real Three.js Earth sphere with local day, night and cloud maps and a separate atmosphere shader. Each porthole uses a perspective camera aimed at that same sphere and renders it into a local texture; the cabin camera is orthographic.
- Actual-time 90-second orbit and 15-second fast-forward, day/night material blending, city lights, a moving sharp sunlight patch, cool window rim and warm local lights.
- Drag rotation, zoom, five major fixture focus/return interactions, porthole scrubbing and click toggles, pen avoidance/spin, plant light and night-cruise toggles.
- Five real production-browser screenshots under `evidence/`, each 1440 × 900 pixels. No screenshot-only model, overlay image, compositing or postprocessing is used.
- Locked dependencies, local assets, root and subpath production builds, and operating instructions in `README.md`.

## Verification commands

Run from repository root unless noted otherwise.

| Command | Result |
| --- | --- |
| `git worktree add --detach .worktrees/orbital-kimi-k3.1-pro 091c801b98342f2e778bd356e0c55b7372398541` | Passed for the initial candidate; the original commit and tag are preserved. |
| `git worktree add --detach .worktrees/orbital-kimi-k3.1-pro-revision candidate/orbital-habitat-diorama/kimi-k3.1-pro` | Passed; isolated structural-revision worktree created from the original candidate. |
| `npm --prefix .worktrees/orbital-kimi-k3.1-pro-revision/tasks/orbital-habitat-diorama/solution ci --no-audit --no-fund` | Passed; 15 packages installed from the lockfile. |
| `npm --prefix .worktrees/orbital-kimi-k3.1-pro-revision/tasks/orbital-habitat-diorama/solution run build` | Passed on the final source; Vite built the root production bundle. |
| `MSYS_NO_PATHCONV=1 npm --prefix .worktrees/orbital-kimi-k3.1-pro-revision/tasks/orbital-habitat-diorama/solution run build -- --base=/orbital-habitat-diorama/kimi-k3.1-pro/ --outDir=.preview --emptyOutDir` | Passed on the final source; JS and CSS use the requested subpath. |
| `node .worktrees/orbital-preview-revision.mjs` | Served the production subpath at `http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/`; test tooling is outside the deliverable. |
| `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/` | HTTP 200. |
| `curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4176/orbital-habitat-diorama/kimi-k3.1-pro/assets/earth-day.jpg` | HTTP 200. |
| `git -C .worktrees/orbital-kimi-k3.1-pro-revision diff --check` | Passed. |
| `node -e <PNG header inspection>` | All five final evidence files are exactly 1440 × 900. |

## Production browser acceptance

Kimi WebBridge controlled the real browser. Pointer interactions were dispatched through CDP to the application's canvas; `window.__habitat` was used only to read state and projected coordinates, never to set scene state. The viewport was 1440 × 900. Timed observations used the actual active tab, with live animation frames confirmed; hidden or browser-throttled samples were not accepted as timing evidence.

The final state-driven production regression completed all 29 checks:

- Clean load has `OrthographicCamera`, local textures, no visible UI, `fastForward=false`, `plantOn=true`, `stripOn=true`.
- Workstation, sleep, plants, chair and bike clicks focus the corresponding object; second clicks return to the overview after the camera settles.
- Pen click produces an impulse and focuses the pen. Mouse proximity drives its avoidance offset.
- Plant and floor-strip lights toggle independently and restore correctly.
- Porthole dragging changes orbital time without toggling fast-forward, and time advances again after release.
- Porthole click toggles 15-second fast-forward and restores the 90-second orbit. A foreground in-page measurement recorded `duration=3.0044 s`, `cycles=0.2005733`, `animation=3.0086 s`, consistent with the 15-second cycle.
- Camera drag and wheel input change the view, and the final camera/projection values are finite.
- Captured `error` and `unhandledrejection` lists were empty.

## Visual acceptance

All images below were inspected directly from the final production run:

- `01-day.png`: complete large-window aperture, day Earth and clouds, visible floor sunlight patch, window flange and outboard hardware clear of the shell, and no cross-window beam.
- `02-night.png`: golden city lights, cool window rim, warm reading and plant lights, readable cabin shadows and three consistent Earth views.
- `03-focus-workstation.png`: captured after an actual workstation click and a confirmed settled `activeFocus="workstation"`, `zoom=2.6`; readable telemetry, keyboard, cup, notebook, paper and window fasteners. An earlier screenshot taken during a transition was discarded, not retained as final evidence.
- `04-night-cruise.png`: captured with `stripOn=false` and `daylight=0`; main strip is off while reading, screen, plant and indicator lights remain.
- `05-fast-forward.png`: captured with `fastForward=true` and `daylight=1`, with a visible sunlight patch.

## Timed cycle observation

The validated foreground observation ran a nominal 182-second frame-driven sampling loop in `184.5947` seconds of wall time. Per-frame phase unwrapping measured `2.051062` orbital cycles. Both full day and full night were observed, with `daylightMin=0`, `daylightMax=1`, `hiddenSamples=0`, and `errors=[]`. One one-second sampling interval had less than `0.5 s` of animation progress; the maximum frame gap was `1.6296 s`. These scheduling pauses are recorded rather than described as a completely unthrottled run.

## Network and console

- Production HTML, bundled JS/CSS, `earth-day.jpg`, `earth-night.jpg`, and `earth-clouds.jpg` all returned HTTP 200 from the local subpath in the final network capture. The only additional request was the browser extension's own support script, which is not an application dependency.
- Runtime art does not depend on remote resources. Browser-extension support scripts are outside the application.
- During revision, a bulk edit accidentally made `wallAngle` recursive and produced a blank production page. The root cause was fixed, the page was reloaded successfully, and the final browser regression had no runtime errors.
- A cached-shadow experiment did not improve the observed frame rate and was reverted. Subsequent frame traces showed the slow samples came from browser background throttling: `Page.bringToFront` restored approximately 8–9 ms frames and correct time progression. No timing or rendering workaround was added to the application.
- Intermediate harness runs that read a moving camera, a throttled frame, or a transition-blocked click were rejected as acceptance evidence. The final harness waits for actual focus/camera state and confirms the active tab before timing.

## Asset provenance

Full Earth texture attribution and license references are in `public/assets/LICENSE.md`.

- Solar System Scope `2k_earth_daymap.jpg`, `2k_earth_nightmap.jpg`, `2k_earth_clouds.jpg`, downloaded unmodified on 2026-10-26.
- Source: https://www.solarsystemscope.com/textures/
- License: Creative Commons Attribution 4.0 International. Attribution: Earth textures by Solar System Scope (https://www.solarsystemscope.com).
- All other geometry and textures are generated by this project. Family photos are geometric illustrations, not real photographs. No external model, font, stock image or icon pack is used.
- NASA / ESA photographs are structural references only, linked in `STRUCTURE.md`; they are not bundled or used as runtime textures.

## Known limitations and environment notes

- This is a stylized miniature informed by real module photographs, not a verified pressure-vessel design or physically scaled orbital-optics simulation. The photographs establish visual construction relationships, not engineering certification.
- Earth views are live perspective renders of the same sphere, composited into real porthole apertures while the main cabin remains orthographic.
- The sunlight patch is a shader-driven effect coordinated with the orbit, not a ray-traced window caustic. Shutter hardware is static, as shutter interaction was not requested.
- Camera transitions reject new object pointer presses until they settle.
- Browser background tabs may throttle animation; the intended timing is evaluated in a visible, active tab.
- Human intervention: none. The model researched, implemented, inspected, corrected, verified and reported the revision autonomously.

## Final observation status

Final foreground production observation passed the two-cycle acceptance: `durationSeconds=184.5947`, `cycles=2.051062`, `daylightMin=0`, `daylightMax=1`, `night=true`, `day=true`, `hiddenSamples=0`, `stalledSamples=1`, `maxFrameGap=1629.6 ms`, `errors=[]`. The final camera remained at the isometric overview with finite position, target and zoom values. All final evidence images are 1440 × 900 and were personally inspected.
