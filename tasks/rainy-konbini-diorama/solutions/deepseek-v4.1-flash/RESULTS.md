# Rainy Konbini Diorama — Result Report

## Model

- **Candidate ID:** `deepseek-v4.1-flash`
- **Complete model identifier:** `deepseek-v4.1-flash`, deployed by DeepSeek Harness
  (`devin/deepseek-v4-1-flash-1017`).
- **Starting `main` commit:** `091c801b98342f2e778bd356e0c55b7372398541`

The candidate was written from zero in an isolated clone checked out at the baseline
commit above. No starter project, reference implementation, other candidate's code, or
sub-agent was used.

## What was built

A self-contained Vite + three.js scene. Every texture is generated at runtime on a
`<canvas>`, so the deliverable ships no binary art assets and loads nothing from the
network.

- **Stack:** Vite 7.3.7 build, three.js 0.180.0 runtime. Two dependencies total.
- **Cel shading ("三渲二"):** a 64-texel `DataTexture` gradient ramp drives every
  `MeshToonMaterial`, giving four hard bands per surface. Outlines are a screen-space
  Sobel over view-space depth and normals rather than per-object shell meshes, so
  creases and prop/ground contact points get lines too.
- **Wet ground:** a `PlanarReflection` mirror camera renders the scene into a
  half-resolution target; the road, sidewalk and alley materials sample it
  projectively with ripple distortion, a grazing-angle Fresnel boost and per-surface
  tint. Puddle coverage lives in the surface texture's alpha channel, so puddles read
  as water rather than painted white blobs.
- **Post chain:** `RenderPass` → `UnrealBloomPass` → cel outline → colour grade →
  `OutputPass`. The grade cools the shadows and adds a light vignette.
- **Composition:** one square plinth (`10.4 × 10.4`) with a north-south avenue and an
  east-west side street meeting at the south-west corner, the store on the inside
  corner with glazing on both street faces, a service alley, and a neighbouring
  low-rise. `OrbitControls` provides drag/orbit/zoom with damping; there is no UI.
- **Motion:** GPU-driven rain (two layers), awning drip lines, splash sprites, puddle
  ripple rings, scrolling glass runoff, a restrained sign flicker, a cycling automatic
  sliding door, and a four-phase traffic signal with a pedestrian head.

All props named in the prompt are present: fascia and blade signs, broad glazing,
automatic door, awning, entrance mat, two vending machines, bicycle, umbrella stand,
bins, streetlight, utility poles and wires, street-name/parking signs, guardrail,
parking bays, channel drain and gully, wet reflective road and crosswalk, alley
entrance, outdoor AC unit, and a notice board. The interior is furnished with a drinks
cooler bank, two gondola rows, an open chiller, an oden counter with steam, a hot
warmer, a checkout counter with POS, a coffee station, a magazine rack, lightboxes,
hanging banners, floor guidance and tactile paving, and a back-room door.

## Verification

All commands below were actually executed and observed in the isolated clone.

### Build

```
$ npm install --no-audit --no-fund --ignore-scripts --cache "$(pwd)/../.npmcache"
$ npm run build
vite v7.3.7 building client environment for production...
✓ 31 modules transformed.
dist/index.html                         1.15 kB │ gzip:  0.55 kB
dist/assets/three-addons-BfLfedxb.js   37.60 kB │ gzip:  8.57 kB
dist/assets/index-C9C9g1bO.js          76.15 kB │ gzip: 26.27 kB
dist/assets/three-core-D_QYSvbD.js    176.76 kB │ gzip: 48.74 kB
dist/assets/three-CVMjxU7s.js         324.29 kB │ gzip: 78.43 kB
✓ built in 734ms
```

Result: **pass**, no warnings. `--ignore-scripts` is required only because the sandbox
blocks npm's postinstall `spawn`; the esbuild binary is still installed correctly and
the build itself runs normally.

### Runtime and visual acceptance

The production bundle was served with `npx vite preview --host 127.0.0.1 --port 4183
--strictPort` and driven through the Chrome DevTools Protocol at a `1440 × 900`
viewport. Frames are read back from the WebGL canvas inside the page (rather than via
`Page.captureScreenshot`, which intermittently returns black frames in headless
Chrome), so each image below is the scene's true output.

Twelve deterministic camera positions were captured plus the default view. Observed
mean luminance and bright/dark coverage per view (0–255 per channel):

| View | Mean RGB | Bright % | Dark % |
| --- | --- | --- | --- |
| `01-initial` (default) | 32.8 / 31.5 / 42.9 | 11.6 | 65.9 |
| `02-avenue-west` | 38.5 / 37.6 / 48.5 | 14.3 | 60.8 |
| `03-side-street` | 58.4 / 55.8 / 65.8 | 22.2 | 42.8 |
| `04-behind` | 33.7 / 34.5 / 49.3 | 5.0 | 41.9 |
| `05-high` | 30.7 / 29.5 / 42.6 | 8.7 | 61.7 |
| `06-storefront` | 121.5 / 110.7 / 112.8 | 46.0 | 5.2 |
| `07-interior` | 128.7 / 119.7 / 120.7 | 52.9 | 6.4 |
| `08-avenue-low` | 66.9 / 64.8 / 72.9 | 26.5 | 39.9 |
| `09-alley` | 33.5 / 36.5 / 52.1 | 13.4 | 59.2 |
| `10-top` | 29.4 / 30.3 / 47.7 | 5.7 | 45.0 |
| `11-close-street` | 128.3 / 119.7 / 119.9 | 52.6 | 4.2 |
| `12-corner` | 92.0 / 88.4 / 95.6 | 35.9 | 16.7 |

The interior views (`06`, `07`, `11`) are roughly four times brighter than the street
views (`01`, `05`, `10`), which is the warm-interior / cool-street contrast the prompt
asks for.

### Interaction

Real pointer input through CDP, not synthetic camera assignment:

```
before         position [-9.200, 8.400, 12.600]  target [-0.15, 1.15, -0.15]
after drag     position [-12.639, 11.371, -6.198]  moved 19.11 units
after zoom     distance 17.234 → 9.975 (wheel)
```

Result: **pass**. Drag orbits around the target and wheel zoom changes distance while
respecting `minDistance`/`maxDistance` and the polar clamps.

### Motion over 66 seconds

Sampled every 4 s while the scene ran:

```
t=4   fps 92.7  door 1.00  signal green
t=12  fps 89.6  door 0.00  signal red
t=20  fps 89.4  door 0.76  signal green
t=28  fps 74.5  door 0.87  signal red
t=36  fps 71.6  door 1.00  signal green
t=44  fps 70.6  door 0.82  signal red
t=52  fps 69.0  door 0.05  signal green
t=60  fps 65.9  door 1.00  signal red
t=68  fps 73.2  door 0.40  signal green

signal phases observed: green, amber, red, redAmber  (all four)
door states observed:   open ×7, closed ×6, mid-travel ×4
```

Result: **pass**. All four signal phases and full door open/close cycles occurred
within the observation window; rain, drips, ripples and glass runoff animate
continuously (visible in the captured frames).

### Stability

- `Runtime.exceptionThrown`: **none**.
- Console: only `404 /favicon.ico`, which is the absence of a favicon file, not a scene
  error. No shader compile warnings after the fixes described below.
- Failed requests: **none**. All assets are generated in-page.
- GPU resources are flat over 64 s — 273 geometries, 64 textures, 23 programs at every
  sample — so there is no per-frame leak. Frame rate settles around 65 fps once the
  page has warmed up; the initial ~93 fps is the first seconds before the reflection
  and bloom targets are fully resident.

## Defects found and fixed during acceptance

Each of these was reproduced first, then confirmed fixed on the same path.

1. **Whole-frame blackout at low camera heights.** Cameras below roughly y≈3 rendered a
   fully black image while the raycast still hit valid geometry. Bisecting the post
   chain showed `UnrealBloomPass` was amplifying NaN into the entire frame.
2. **NaN from reversed `smoothstep`.** The glass-runoff shader used
   `smoothstep(1.0, 0.94, uv.x)` and `smoothstep(1.0, 0.9, uv.y)`. GLSL leaves
   `smoothstep` undefined when `edge0 > edge1`, and this driver returns NaN — one NaN
   texel was then smeared across the screen by bloom. The same reversed-edge pattern
   existed in the rain sprite fade, the rain streak falloff, the outline distance fade
   and the grade's shadow weighting. All were rewritten as ascending ramps
   (`1.0 - smoothstep(lo, hi, x)`). After the fix, the previously black cameras render
   normally.
3. **Dark pipes hanging off the awning.** The eave drips are thin cylinders; the cel
   outline pass renders the whole scene through `scene.overrideMaterial` into the
   normal/depth buffer, so every drip silhouette got a hard dark outline and the drip
   line read as a row of grey pipes. The normal pass now skips transparent geometry,
   since rain, drips, splashes, rings, glass and additive light cards are decoration
   rather than solid surfaces. Solid-geometry outlines are unaffected.
4. **Second vending machine buried in a wall.** The alley is 1.1 units wide and the
   machines are 0.76 wide, so the second one was placed inside the neighbouring
   building. One machine now stands in the alley mouth, the other on the pavement in
   front of the neighbouring shop.
5. **Props overlapping the storefront.** The notice board and parking sign sat in front
   of the glazing and the parking sign overhung the plinth edge. The notice board moved
   to the avenue pavement facing the road; the parking sign moved clear of both the
   glazing and the plinth edge.
6. **Alley reading as a black slab.** Added a service bulb with an additive halo on the
   neighbouring wall plus a matching point light, so the darkest corner of the diorama
   keeps its wall readable.

## Known limitations

- **Frame rate depends on the host GPU.** The scene renders a mirror pass, a full
  normal/depth pass and a bloom chain per frame. On the verification host it settles
  around 65 fps at `1440 × 900`; on integrated graphics it will be lower. No adaptive
  quality fallback is implemented.
- **Text is canvas-drawn**, so Japanese glyphs depend on the host having a Japanese
  font installed. The font stack asks for `Hiragino Sans`/`Yu Gothic` and falls back to
  `sans-serif`; on a host without any Japanese font the signage would show tofu boxes.
  This was not observed on the verification host.
- **Reflections are planar**, mirrored across a single horizontal plane at the road
  height. Surfaces at other heights reuse that one mirror, so a reflection is
  geometrically exact only for the road itself.
- **The shadow map is baked once** (`shadowMap.autoUpdate = false`) because the light
  rig is static. Animated props therefore do not cast moving shadows; the sliding door
  does not darken the pavement as it opens.
- **No responsive/mobile layout work** beyond the viewport filling the window and
  `touch-action: none`; the scene was only reviewed at a `1440 × 900` desktop viewport,
  which is what the evaluation procedure specifies.

## Required human intervention

None for build or run. Two environment notes apply to reproducing the verification on
this host, and neither affects the deliverable:

- `npm install` needs `--ignore-scripts` here because the sandbox blocks npm's
  postinstall `spawn`. On an unrestricted machine a plain `npm install` works.
- The build must keep every emitted chunk below roughly 1 MiB of unminified code, or
  esbuild switches to a temp-file handoff that this host's temp directory rejects. The
  `manualChunks` split in `vite.config.js` exists for that reason and is documented
  inline.

## Commands to reproduce

```bash
cd tasks/rainy-konbini-diorama/solution
npm install --no-audit --no-fund          # add --ignore-scripts only if the sandbox blocks postinstall
npm run build
npm run preview                           # serves http://127.0.0.1:4183/
```

`npm run dev` serves the same scene on `http://127.0.0.1:5183/` with HMR.
