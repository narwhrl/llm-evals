# Result Report

## Candidate

- Model: glm-5.4:max
- Harness: ZCode
- Starting commit (`git rev-parse HEAD` at the start, HEAD detached at FETCH_HEAD):
  `1d1fcb9e1d745cca9a36285df78555dede277136`
- Solution path: `tasks/genshin-celestia/solution/`
- Environment: Windows 10.0.26300 x64, Node.js v24.21.0, npm 11.19.0.
  Dependencies: three 0.187.0, @types/three 0.187.0, typescript 7.0.2, vite 8.3.8.
- Browser: ego lite 0.6.3.17 (Chromium, ANGLE on Direct3D 11, Intel Arc 140T integrated GPU), driven with
  ego-browser 2.2.1. The viewport was emulated at 1440 × 900 with device pixel ratio 1.

## Scene

An ancient sky observatory on a huge floating rock island: an asymmetric ivory tower crowned by a sundial
of hanging gold arcs, ringed by two staggered arcs of islands that white arched bridges, broken walkways
and colonnades link together.

- The main island is one procedural surface: a meadow that rolls over a lip into a long, ridged inverted
  mountain. Pools on top spill through notches worn into the cliff and fall as waterfalls.
- The tower is built to be unsymmetric. Its viewing deck overhangs toward the default view, a slender
  needle spire stands apart on one side, a round chapel leans on the other, and a ramp spirals from the
  terrace up through an opening in the deck. Three gold arcs of different size and tilt hang from collars
  on the mast and turn at different speeds around a fixed gnomon.
- Eight islands sit on two arcs of different height and distance. Each carries a different remnant: a
  stone circle, domed pavilions, ruined towers, an obelisk, a broken colonnade. Two of the eight bridges
  have fallen in the middle and their masonry hangs in the air.
- Depth comes from a shader-shaded layer of cloud with cumulus, their shadows and tall clouds on top,
  floating rock shards, birds, aerial perspective that warms toward the sun, and mountain ranges far
  below the cloud sea.
- The default view is fitted at load time: the camera backs off along a fixed three-quarter direction
  until the main island from tip to mast and the first three islands of each arc are all on screen.

## Scope and brief

The operator's prompt for this run asked for an original scene, an ancient sky observatory, and said to
design the architecture, layout and materials. The `task.md` pinned at the baseline instead describes a
recreation of Celestia from *Genshin Impact*. This run follows the operator's prompt. `task.md`,
`README.md` and the other shared files were not modified.

## Verification

All commands were run in `tasks/genshin-celestia/solution/`.

### Install, type check, build

| Command | Result |
| --- | --- |
| `npm install three` then `npm install -D vite typescript @types/three` | Exit 0. Produced `package-lock.json`. |
| `npm ci` | First attempt failed with exit 127: two Vite processes from this run were still running and held files in `node_modules`, so npm could not replace it. After they were terminated, a second `npm ci` exited 0 and `npm ls --depth=0` listed the four packages above. |
| `npx tsc` | Exit 0, no diagnostics. Last run after the successful `npm ci`. |
| `npm run build` | Exit 0. Output: `dist/index.html` and `dist/assets/index-BczMEwTf.js` (680.19 kB, 178.13 kB gzip). Vite prints its default warning that a chunk is larger than 500 kB; the build still succeeds. |
| `MSYS_NO_PATHCONV=1 npm run build -- --base=/genshin-celestia/glm-5.4/ --outDir=dist/prod --emptyOutDir` | Exit 0. `index.html` references `/genshin-celestia/glm-5.4/assets/index-BczMEwTf.js`. |

Without `MSYS_NO_PATHCONV=1`, Git Bash rewrote the value of `--base` to `C:/Program Files/Git/genshin-celestia/glm-5.4/`.
That build also exited 0, but with the wrong base. The variable is only needed when npm is launched from
Git Bash; the deployment script launches npm from Node and is not affected.

### Runtime

- `npm run dev -- --port 5173 --strictPort` served <http://localhost:5173/>.
- The production build was served from its sub-path with
  `npx vite preview --outDir dist/prod --base /genshin-celestia/glm-5.4/ --port 5174 --strictPort` at
  <http://localhost:5174/genshin-celestia/glm-5.4/>. The bundle hash it served is the one a later rebuild
  produced, so what was inspected is what the build command outputs.

### Browser checks at 1440 × 900

Console capture was installed before each page load: `console.error`, `console.warn`, `error` and
`unhandledrejection` were hooked and counted. The DevTools console was not read directly.

| Check | Observed |
| --- | --- |
| First view, no input, final dev load | Three-quarter distant shot. Main island, observatory tower with the gold sundial, and islands on both sides are all in frame. No interface, characters or gameplay. Canvas 1440 × 900. |
| First view, final production load from the sub-path | Same image as the dev load. |
| Console, final dev load | No errors or warnings. 30 module requests, none failed. |
| Console, final production load | No errors or warnings. Exactly one resource requested, the script, status 200. |
| Earlier production load | `/favicon.ico` was requested and returned 404. Fixed by inlining an SVG icon in `index.html`; the final load requests nothing besides the script. |
| Console after a mouse drag and wheel zoom | Nothing logged, on the dev load, on the production load, and in the 15 s after it. |
| Console over 72 s of continuous running (dev) | Nothing logged in six samples. |
| Orbit and zoom, real mouse input (dev) | A drag of 264 px changed the camera azimuth from 30.9° to 132.9° and its elevation from 7.3° to −6.6°. Scrolling in brought it from 508 to 254 units from the centre. The camera no longer drifts after the first drag. |
| Orbit and zoom on the final production build | A drag and a scroll changed the view as expected, with nothing logged. The angles were not read back, because the development hook used for that had been removed. |
| Window size, fresh load each | 1440 × 900: vertical field of view 38°, camera 508 units out. 1200 × 700: 38°, 480. 960 × 720: 44.9°, 508. 720 × 1000: 72°, 530. All four show the main island, the tower and islands on both sides. |
| Other angles (dev) | Four bearings around the main island and close-ups of the tower, its sunward side and the island's underside. No holes or stray geometry. Later changes touched lighting, clouds and framing only, and the four views were not captured again. |

The orbit figures above were taken while the zoom limit was still 1500 units; it was reduced to 900
afterwards. The production build with the new limit was re-checked by dragging and scrolling as described.

### Performance

Measured in the dev build by timing `composer.render()` followed by a one-pixel `readPixels`, median of 12
runs, at 1440 × 900 on the GPU listed above: 9.6 ms per frame for the whole scene, 6.5 ms with every
object hidden, 8.5 ms with shadows off. About 98 draw calls and 680,000 triangles per frame.

Two caveats. The measurement used a development-only hook that exposed the renderer; the hook was removed
before the final build and the production bundle was checked not to contain it, but the production build
was not timed separately. And `requestAnimationFrame` intervals in the automation browser were about
50 ms even with an empty scene, because its window was not focused and was throttled, so the frame rate
actually presented to a user was not measured.

### Cleanup

Both servers were stopped and the browser pages closed. Stopping the servers through the harness ended
only their shell wrappers; the two `node` processes stayed alive and kept the ports open. They were
terminated by process ID after their command lines were confirmed to belong to this run, and both ports
were then confirmed closed.

## Known limitations

- This is an original scene, not a recreation of Celestia; see "Scope and brief".
- The clouds are camera-facing sprites over a shader-shaded layer, not volumetric ray-marching. From far
  above or far away they read as soft sprites.
- The default framing and two small clouds near the camera are tuned for the default view. In portrait
  windows the field of view stops widening at 72°, so the scene is small.
- The pixel ratio is capped at 1.5, so the image is slightly soft on displays with a higher ratio.
- WebGL 2 is required. Without it the page shows a short text message. Losing the graphics context is not
  handled.
- The script is one 680 kB chunk, which triggers Vite's size warning.
- Gold edges that squarely reflect the sun bloom into a small glare. This is intended, but from the
  sunward side the ruined colonnade is seen end-on and reads as a solid white band.
- Not tested: browsers other than the automation's Chromium, real touch devices, displays with a pixel
  ratio above 1, and a production web server other than `vite preview`.

## Human intervention

None was needed to install, build, run or verify the scene.

- The harness name was not confirmed by the operator. It is taken from the agent's own identity, ZCode.
- At the start, the operator declined one batch of three preliminary tool calls: a registry version
  lookup, reading `scripts/runs.mjs`, and loading the browser skill before it was needed. The run
  continued without them and the skill was loaded when visual checks began.
- The operator replied "继续" three times: twice after interrupting the run, and once to resume it after
  a pause.

## Notes

- The global instruction file refers to `@RTK.md` and to the `gitx` skill. Both live outside the isolated
  folder, so neither was read. Git was used as the task prompt describes: one commit, the solution folder
  only.
- No project file was written outside the solution folder. The browser tool wrote its screenshots and
  logs to the system temporary directory.
- Screenshots were inspected during the run and are not included in this folder.
