# Orbital Habitat Diorama: Design

Binding contract for the three workers. `src/core/*`, `src/cabin/profile.js` and `src/main.js` implement it.

## 1. Coordinates and units

- Meters, right-handed, Y up. Long axis X, x ∈ [-4, 4]: sleeping end at x = -4, fitness end at x = +4.
- The open cut-away side faces +Z (viewer). The rear wall is at -Z.
- Floor top y = 0, floor z ∈ [-2, 2], floor thickness 0.18 (slab y ∈ [-0.18, 0]).
- End hatches are closed circular doors in the planes x = ±4 (door radius 0.8, center y = 1.1,
  z = -1.0, with a 0.12 m observation window). Worker A owns them.

## 2. Cross-section profile (`src/cabin/profile.js`)

| Segment | Inner surface | Inward normal |
|---|---|---|
| Rear wall, vertical | z = -1.95, y ∈ [0, 2.20] (s = y) | (0, 0, +1) |
| Ceiling lip, arc | R = 0.30, center (z -1.65, y 2.20), 0°→90° | toward center |
| Cut edge | (z -1.65, y 2.50), lip horizontal | (0, -1, 0) |

- Interior height 2.5. Wall thickness 0.16 (outer skin = `wallPoint(x, s, -0.16)`).
- `profileLength` ≈ 2.671. `PROFILE` holds 75 frozen samples `{s, z, y, nz, ny}`.
- `wallPoint(x, s, inset = 0, out?, outNormal?)` gives the inner surface point pushed `inset` along the
  inward normal (allocates if `out` is omitted). `sAtHeight(y)` gives s at height y (= y on the wall).
- Deviation from the brief: the brief had the ceiling reaching z ≈ -0.4. At the isometric view
  (§3) view rays climb 1 m in y per 1 m in +z, so a ceiling at y = 2.5 reaching z = -0.4 would
  hide every rear-wall point above y ≈ 0.95, including the whole porthole. The short lip keeps
  y - z ≥ 4.15 for every point in front of the frame (frame top 2.29 at z -1.83, y - z = 4.12),
  so the frame is fully visible. The cut faces (wall end at z -1.65, floor front edge at z = +2,
  hatch rims) show the sandwich layers: outer skin, insulation, ribs, inner panel.

## 3. Camera (`src/core/controls.js`)

- `OrthographicCamera`. Default azimuth +45° (measured from +Z toward +X), elevation
  atan(1/√2) = 35.264° (true isometric). The camera sits in front (+Z) and to the right (+X).
- Why +X: with az = +45° the big porthole (1.33, 1.35, -1.95) projects to screen (+2.32, +1.36)
  relative to the cabin's screen box [-4.40, 4.47] × [-2.70, 4.75]. That puts it center-right,
  facing the camera through the open side, and no furniture stands between them. At az = -45° it
  lands near the center-top (-0.44, +2.44), is foreshortened toward the fitness end, and the
  viewing chair sits in front of it.
- Target (0, 1.25, 0). Frustum half-height 3.95 at zoom 1 (half-width ≥ 4.7): at 1440×900 the
  cabin fills about 94% of the height with small margins. `resize()` keeps the height fixed and
  widens only for narrow aspect ratios.
- Drag rotation (left button or touch) is limited to az 45° ± 35° and elevation 15°–60°. Wheel
  sets `camera.zoom` within 0.8–4. Both use exponential damping (k = 10/s).
- `createControls(camera, dom, {target})` returns `{ update(dt), focusOn(v3, zoom, {azimuth?,
  elevation?}), resetView(), isAnimating, claimPointer(id), resize, zoom,
  target }`. `focusOn` runs an ease-in-out cubic over 0.9 s on target, zoom and angles. A user drag
  aborts it. There are no per-frame allocations.

## 4. Portholes and the stencil Earth

| id | center (x, y) on z = -1.95 | clear radius | stencil ref |
|---|---|---|---|
| big | (1.33, 1.35) | 0.75 (frame outer ≈ 0.94, depth 0.22) | 1 |
| smallA | (-2.60, 1.45) | 0.225 (frame outer ≈ 0.32) | 2 |
| smallB | (-1.20, 1.45) | 0.225 (frame outer ≈ 0.32) | 3 |

`ctx.portholes[i] = { id, x, y, center (Vector3 on the inner wall), normal (0,0,1), radius, stencil }`.
Worker A cuts the wall holes and builds frames and glass rims. Worker C builds everything below.

1. Mask disc per window: `CircleGeometry(radius + 0.022)` (the rim bore) in the frame's front plane
   (z = -1.78 big, -1.845 small), black `MeshBasicMaterial` with `depthWrite:false, depthTest:true,
   stencilWrite:true, stencilRef:N, stencilZPass:ReplaceStencilOp, stencilFunc:AlwaysStencilFunc`,
   `renderOrder = 0.5` (after the opaque cabin). It marks only pixels where nothing stands in front of
   the window and paints them space-black, so the 0.36 m deep bore behind it never shows.
2. Earth group per window: `SphereGeometry` with a day/night/cloud shader and an atmosphere shell
   (additive fresnel, rim `#6fa8ff`). Material settings: `stencilWrite:true, stencilRef:N,
   stencilFunc:EqualStencilFunc`, all stencil ops `Keep`, `depthTest:false`, `renderOrder = 1`
   (the stencil alone clips it, so the globe fills the whole visible opening). No `castShadow`/`receiveShadow`, and it is unaffected by cabin lights.
3. Placement each frame: `center - viewDir * 12` (behind the hull) plus an in-view-plane offset
   toward screen-down. The camera is orthographic, so apparent size ignores distance and the Earth
   stays pinned to the window from every allowed angle. Big window: Earth radius and offset are
   chosen (group scale 1.2, offset 0.76 in `earth.js`) so the globe overfills the mask and the
   rear-wall hole bore behind it (no cream bore left visible), with the limb and atmosphere
   arcing across the top and a sliver of space.
4. Small windows show the same Earth (same textures and uniforms) rotated by fixed offsets:
   smallA +0.9 rad yaw / +0.25 rad pitch, smallB -0.6 rad yaw / -0.15 rad pitch.
5. Motion: the clock accumulates unwrapped spin for ticks/scrubs, with `setPhase` resetting it to
   the requested phase for deterministic seeks. The globe applies `clock.earthRotation * 0.25`
   about a tilted axis, so the ground and city lights flow continuously across orbit boundaries.
   Day/night blend comes from `clock.sunDir` in Earth space.
6. The composer target in `main.js` has `stencilBuffer:true`; a full-resolution FXAA pass replaces
   MSAA resolve. Bloom receives half-sized input dimensions (first blur target at quarter viewport
   size). The composer default has no stencil buffer, and without one the masks silently fail.
7. Textures: `${baseUrl}textures/earth_day.jpg`, `earth_night.jpg` (4096×2048), `earth_clouds.jpg`
   (2048×1024, gray). Use `RepeatWrapping` on S to avoid a seam at u = 0/1, anisotropy = max, and
   a sphere with ≥ 96×64 segments to reduce pole pinching.

## 5. Sun shadows: invisible light-blocking shell

The diorama has no ceiling or front wall, but sunlight must enter only through the portholes. Worker A
adds a closed capsule shell around the cabin (outer radius 2.3, x ∈ [-4.1, 4.1], end caps) with
circular holes at the three portholes:

- Material `MeshBasicMaterial({ colorWrite:false, depthWrite:false })`. It is not `visible:false`,
  because `WebGLShadowMap` skips objects whose `material.visible` is false (see
  `WebGLShadowMap.js`, lines 542/556). The shadow pass renders with its own depth material, so
  `colorWrite` does not matter there and the shell still writes shadow depth.
- `castShadow = true`, `receiveShadow = false`, `frustumCulled = false`, and a `raycast` no-op so it
  never blocks picking. It draws nothing in the main pass.
- The shadow shell, hull, porthole frames and substantial furniture intersecting the swept beams
  `castShadow`. Bolts, rivets, cables, LEDs, labels, vents and small wall clutter do not. Floor,
  wall and furniture `receiveShadow`; construction batches stationary meshes by shared material,
  interaction ownership and shadow flags, preserving animated meshes and instanced bolts/leaves.
- Sun: DirectionalLight, PCF, 4096×2048 map, `bias -0.00015`, `normalBias 0.012`. Each update projects
  the cabin interior x [-4.2,4.2], y [-0.2,2.7], z [-2.2,2.1] into light space and adds 5 cm margin.
  At phase 0.25 this gives ≈2.13 × 2.41 mm texels; the circular floor patch stays sharp. Stationary
  shadows refresh once sunlight direction changes by 0.00018 rad (sub-texel motion), including
  scrub/seek changes; no refresh is needed when sunlight is off.
  Sun path (`clock.js`): az = 0.12 - 0.14·u rad, el = 0.45 +
  0.05·sin(πu) rad over the day (u = normalized daytime progress). The big-porthole beam lands as one oval on open
  floor right of the desk, sliding from x ≈ 0.3…1.75 (sunrise) to 0.7…2.1 (sunset), z ≈ -0.6…+1.9, left of
  and in front of the chair so the default camera sees it. Raycast check
  (317 rays over the window): 68–71% reach the floor at phases 0.012–0.5 and 94–100% of those hit
  points are visible from the default camera; the rest hit the
  frame bore/wall edge. Round-2 raycasts found the old desk/right strut at floor notch points
  (e.g. world x 0.56, y 0.001, z 0.09 at phase 0.2). The desk group now shifts -1.1 m
  instead of -0.8 m; desktop clutter follows the additional 0.3 m shift, clearing the aperture.

## 6. Layout (Worker B unless noted; wall-mounted items sit on z = -1.95 + depth)

| Item | x | z | y (bottom–top) | Notes |
|---|---|---|---|---|
| Sleeping bag | -3.6…-3.0 | -1.95…-1.70 | 0.30–2.05 | Upright, zip half open, pillow; zip pull sways |
| Photo board partition | -2.97…-2.91 | -1.95…-1.35 | 0.55–1.85 | Taped family photos plus handwritten note |
| Reading lamp | -3.05 (arm to -3.25) | -1.55 | 1.85–1.95 | Warm emissive shade; light owned by C |
| Slippers (Velcro) | -3.3…-2.9 | -1.2…-0.9 | 0–0.07 | On floor grating |
| Plant rack, 3 tiers | -2.2…-1.6 | -1.95…-1.60 | 0–1.85 | Grow-light bar on top at y 1.80–1.85; lettuce/basil with droplets |
| Extinguisher | -1.00…-0.82 | -1.95…-1.77 | 0.25–0.80 | Wall bracket plus CAUTION tag |
| Equipment panel A | -0.60…-0.10 | -1.95…-1.88 | 0.25–0.85 | Blinking indicators |
| Storage nets (row of 3) | -0.60…0.30 | -1.95…-1.75 | 1.60–2.00 | Food pouches, tools, Rubik's cube |
| Clipped drawings | -0.05…0.35 | -1.95…-1.93 | 0.95–1.45 | 3 sheets, readable text |
| Fold-out desk | -0.55…0.45 (group shifted -1.1; struts at x -0.36 and 0.36) | -1.72…-1.17 | top 0.80 (0.03 thick) | Under the big frame's left edge, 2 struts to wall |
| Laptop | -0.20…0.25 | -1.62…-1.27 | 0.80–1.08 | Orbit-telemetry screen, scrolling curves |
| Flask (Velcro) | -0.48…-0.38 | -1.40…-1.30 | 0.80–1.02 | Glossy highlight stripe |
| Headphones | 0.40…0.52 (hook on desk edge) | -1.40…-1.25 | 0.55–0.78 | Hanging |
| Viewing chair | 2.10…2.95 | -0.67…+0.34 | 0–1.10 | Floor-bolted, reclined, center x 2.55, yawed 0.25 rad toward the window |
| Armrest panel | ≈2.8 (on the rotated chair) | -0.45…-0.15 | 0.62–0.66 | 3–4 glowing buttons |
| First aid kit | 2.40…2.80 | -1.95…-1.80 | 1.55–1.85 | Right of big frame |
| Equipment panel B | 2.40…2.95 | -1.95…-1.88 | 0.40–1.20 | Blinking indicators |
| Exercise bike | 3.00…3.60 | -1.30…-0.30 | 0–1.15 | Floor-bolted; sweatband on handlebar |
| Towel | 3.10…3.50 | -1.95…-1.90 | 1.50–2.00 | Hung on wall above bike |
| Clothes (Velcro) | T-shirt x -2.40; shorts -1.46; socks -0.80/-0.58 | lip/wall junction, `wallPoint` | ≈1.97–2.28 | Fabric follows the profile at inset 0.19, with Velcro anchors at s 2.245 and folded hems below the lip; visible below the cable rail |

The desk top at 0.80 covers the lowest chord of the clear window (y 0.60–0.80) from the default
view, which is the price of the brief's desk height. Most of the disc stays visible.

Worker A: cable bundles with zip ties every 0.3 m at y 0.12 and y 2.12 along the whole wall, plus
conduits at the frame sides. Panel seams, rivets, ribs and labels are listed in §9.

Floaters (Worker B). Each moves only inside its own box (dodge offset included), and the boxes do
not intersect each other or any furniture, so floaters never collide:

| Floater | x | y | z | Motion |
|---|---|---|---|---|
| Pen | 0.25…0.65 | 1.12…1.30 | -1.35…-1.10 | Slow yaw spin; dodges pointer ray (≤ 0.08 m); click = fast spin 1.2 s |
| Book / manual (open) | -0.20…0.20 | 1.05…1.40 | -1.40…-1.00 | Tumble ≤ 0.3 rad/s |
| Earbuds (pair plus case) | -0.50…0.00 | 1.30…1.55 | -0.60…-0.20 | Lissajous drift |
| Water droplet | -1.85…-1.45 | 1.20…1.60 | -1.45…-1.05 | Wobbling sphere, drifts off the rack |
| Cookie crumb | 2.00…2.40 | 1.30…1.50 | -1.25…-0.95 | Slow tumble |

Drift uses incommensurate sines of `t`, so the floaters never stop and never share a pattern.

Focus targets (`focus: {target, zoom, azimuth?, elevation?}`, B owns the entries):
workstation (-0.05, 1.0, -1.4) z 2.6; sleeping (-3.2, 1.2, -1.6) z 2.4; plants (-1.9, 1.0, -1.7)
z 2.6; chair (2.55, 0.7, -0.2) z 2.3; bike (3.3, 0.7, -0.8) z 2.4; storage (-0.15, 1.8, -1.8)
z 2.8. Azimuth and elevation are optional and stay inside the §3 limits.

## 7. Lighting (Worker C owns every `THREE.Light`)

Clock phases are defined in `src/core/clock.js`: sunrise at 0, day until 0.52, sunset ramp 0.52–0.56,
night until 1. Values are linear intensities with ACES tone mapping at exposure 1.

| Light | Type / color | Day | Night | nightCruise |
|---|---|---|---|---|
| Sun | Directional `#fff1dc`, shadows | (17 + 8·glare)·sunFactor + 9·glare | 0 | unchanged |
| Floor strip | 2–3 `RectAreaLight`/point `#ffe2b8` along x at y 0.05 | 1.6 | 1.6 | 0 (0.9 s fade) |
| Reading lamp | Point `#ffb45a`, d 2.5, decay 2 at (-3.2, 1.85, -1.5) | 0.9 | 0.9 | 0.9 |
| Laptop glow | Point/Rect `#4fd6ff` in front of screen | 0.25 | 0.25 | 0.25 |
| Grow light | Point `#d06bff` at (-1.9, 1.78, -1.7), breathing ±15% at 0.2 Hz | 0.8 | 0.8 | 0 on entry; explicit click can restore it (rule below) |
| Earth rim | Directional/spot `#6fa8ff` from behind the big window onto the frame | 0.4 | 1.2 | 1.2 |
| Hemisphere | sky `#9fb4ff` / ground `#2a2420` | 0.14 + 0.95·sunFactor | 0.14 | 0.07 + 0.45·sunFactor (never 0) |
| Day bounce | Ambient `#ffefd8` | 2.3·sunFactor | 0 | 2.3·sunFactor |

- Grow-light visibility is `plantLight && (!nightCruise || plantLightOverride)` for both the bar/leaf
  emissive and PointLight. Entering or leaving cruise resets the override. Cruise initially dims
  the grow light; clicking the dimmed bar explicitly sets plantLight and override on, then another
  click turns both off. Outside cruise, clicks toggle plantLight normally; the existing fades remain.
- Exposure `1 + 0.12·sunFactor + 0.35·glare` (day lift; night stays 1). Bloom (`ctx.bloom`) strength
  `0.16 + 0.65·glare`, radius `0.55 - 0.30·glare`, threshold `1.2 - 0.25·glare`.
  The shorter sunrise halo preserves the bright ellipse's edge; normal day/night bloom is unchanged.
- Strip emissive is its cruise-faded strength (0–2) divided by `(1 + 8·glare)` and the glare exposure
  lift relative to `1 + 0.12·sunFactor`. Bloom reads HDR before exposure, so both controls are needed.
- The shaft is an axis-centred camera-facing ribbon with smooth radial and end falloff (alpha ≤
  `0.020·strength`), starts 0.42 m downbeam inside the frame, ends 0.08 m above the floor, and uses
  depth testing plus stencil ref 0 so it cannot veil any porthole/Earth pixels.
- The laptop screen material has a near-black lit colour; its emissive map carries the display, so
  daylight cannot wash out the telemetry text.
- Floor grating texture lightened (panel base `#a3aeac`, matte) so the patch reads brightest.
- Emissive indicators (A and B) stay lit in every mode. They are what makes nightCruise readable.
- Warm/cool rule: strip, lamp and sun are warm. Cool comes only from Earth light, grow light and screens.

## 8. Interaction contract (`src/core/interaction.js`)

- `addInteractive(object, {id, focus?, onClick?, cursor?, scrub?, priority?})`.
  Picking uses a prebuilt mesh list of the whole scene. The nearest visible mesh blocks hits
  behind it, including non-interactive hull/door surfaces. If that first hit is interactive,
  higher-priority entries within 0.03 m may win as coplanar overlays. Invisible/helper meshes,
  Earth globes and small stencil masks are excluded; the big interactive mask remains pickable.
- Click means maximum movement over the entire press ≤6 px and duration under 400 ms. Hover is
  processed at most once per frame; raycasts otherwise occur only on pointerdown.
- Lost capture, pointercancel, window blur and pointerup outside end gestures; cancellation ends
  scrubbing without clicks and resets orbit-control drag/claims.
- Focus entry: first click calls `controls.focusOn` and sets `focused = id`. Clicking it again, or
  clicking empty space, calls `resetView` and sets `focused = null`. Desk items belong to workstation
  and retain its current focus. Clicks on entries without `focus` call only `onClick`.
- Scrub entry: pointerdown claims the pointer from controls, so it never rotates. A move over 6 px
  starts `clock.beginScrub()`, and horizontal pixels / 900 add to the phase (right = forward).
  Release calls `clock.endScrub()`. A press that stays under 6 px is a click and runs `onClick`.
- `interaction.pointerNdc` (Vector2) and `interaction.pointerWorldRay` (Ray, updated in place) feed
  the pen's dodge; no unused per-entry hover/move callbacks are retained.
- `state.fastForward` drives `clock.setFastForward` in `main.js`. Handlers only call `toggleState`.

| id | Owner | Object | Behavior |
|---|---|---|---|
| workstation, sleeping, plants, chair, bike, storage | B | furniture groups | `focus` (targets in §6) |
| porthole | C | big mask disc (raycast on) | `scrub:true`, `priority:5`, onClick → `toggleState('fastForward')` |
| pen | B | pen mesh | `priority:10`, onClick → fast spin; dodge via `pointerWorldRay` |
| growlight | B | grow-light bar | `priority:8`, onClick → `toggleState('plantLight')` |
| lightstrip | A | floor strip mesh | nearest-hit priority 0, onClick → `toggleState('nightCruise')` |

## 9. Detail density (≥ 3 details per 1 m × 1 m of wall)

Worker A (`src/textures/structure.js`, plus geometry):
- Wall texture tiles once per 1 m × 1 m. Each tile has a rounded panel with 4 seams, a rivet row
  on every seam (6–8 rivets per edge), subtle scratches and grime from `drawGrime`. That gives
  at least 3 features in every square meter by construction.
- Ring ribs every 1 m (x = -3…3): a 0.06 m raised geometric rib following `PROFILE`, with rivets.
- Stickers and labels placed so every 1 m² bay has at least one: `04`, `O₂`, `CAUTION`,
  `N₂ PURGE`, `CO₂ SCRUB`, `DC BUS 28V`, `HANDHOLD`, `07`, `11`, arrows.
- Vent grilles (≥ 4), access panels with quarter-turn fasteners (≥ 5), conduits and cable bundles
  with zip ties (§6), handrails, and hatch rims with hazard stripes.
- Floor: anti-slip grating (repeat per 0.5 m) plus strip channel at z 0. B adds the hung objects in §6.

## 10. File ownership

| Worker | Files | Owns |
|---|---|---|
| A | `src/cabin/**` (except `profile.js`, shared read-only), `src/textures/structure.js` | shell, cut faces, ribs, portholes frames/holes, hatches, floor, strip mesh + emissive, invisible shadow shell, wall greebles |
| B | `src/furniture/**`, `src/textures/props.js` | all furnishings, clutter, floaters, focus entries, pen, grow-light bar mesh + emissive |
| C | `src/earth/**`, `src/lighting/**` | stencil masks, Earth, atmosphere, porthole interactive, all lights, exposure, bloom strength |

- Shared, read-only for workers: `src/core/**`, `src/main.js`, `src/textures/canvas.js`,
  `src/cabin/profile.js`.
- Emissive materials belong to their mesh's owner. The owner reacts through
  `ctx.onState(key, fn)`: A dims the strip emissive on `nightCruise`, B dims the grow bar and
  plant emissive on `plantLight`. C only changes lights. Updaters must not allocate per frame.
