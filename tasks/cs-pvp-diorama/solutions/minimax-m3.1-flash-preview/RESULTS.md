# Candidate Result Report — cs-pvp-diorama

## Identification

- **Model identifier:** `minimax/MiniMax-M3.1-Flash-Preview`
- **Candidate path:** `tasks/cs-pvp-diorama/solution/`
- **Baseline `main` commit:** `a294b85b790330294719e0b6b0cd5c022dd72073`
- **Clone:** `.runs/cs-pvp-diorama/minimax-m3.1-flash-preview`, detached at the baseline above, no remote.

## Approach

Three.js r170 + Vite 5, no binary assets and no network services. Every surface
(concrete, asphalt, rust, corrugated tin, wood, cardboard, graffiti, freight
stencils, warning slogans, bullet clusters, bomb-site paint, police badge,
duty roster, road sign, team spray) is painted onto a 2D canvas at load time
from a seeded PRNG, so the scene is byte-identical on every load and nothing
can 404.

Rendering is cel-shaded rather than post-processed: `MeshToonMaterial` with a
four-step `NearestFilter` gradient ramp for the banded fill, plus an inverted
hull pass for the outline. The hull vertex shader scales its offset by view
depth, which holds the line at a constant screen width at any zoom without a
composer. Fills and hulls are merged per material, which keeps a scene of
~42.5k triangles at 72 draw calls.

Standing water is a single transparent plane over the yard. The puddle
footprint is fbm noise, a cell-based ripple field drives both the distortion
of a planar reflection (one extra 768px render of the scene from a mirrored
camera, with a clipping plane) and the crest highlights, and the four
brightest practicals are smeared into the surface as vertical streaks.

## Verification performed

All commands were run from
`C:\Users\narwhrl\workspace\llm-evals\.runs\cs-pvp-diorama\minimax-m3.1-flash-preview\tasks\cs-pvp-diorama\solution`.
Node v24.21.0 / npm 11.19.0.

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | 12 packages, exit 0 |
| `npm run build` (`vite build`) | exit 0 — `dist/index.html` 0.65 kB, `dist/assets/index-*.js` 586 kB (gzip 152.7 kB), built in ~0.8 s |
| `node node_modules/vite/bin/vite.js preview <solution> --port 4188 --strictPort --host 127.0.0.1` | serves; `GET /` returns 200, `<title>CS PVP Diorama</title>` |
| `node node_modules/vite/bin/vite.js --port 5180 --strictPort` (dev) | serves; `GET /` returns 200 |
| `node --check` on all 13 source modules | no syntax errors |

Browser verification used the **kimi-webbridge** skill against the production
preview build (`http://127.0.0.1:4188/`).

### Observed in the browser

- **Console / page errors:** `[]` — collected via
  `Page.addScriptToEvaluateOnNewDocument` on every reload. No uncaught errors,
  no unhandled rejections, no `console.error`, no failed asset requests.
- **No UI:** the document contains exactly **1 element** (the `<canvas>`) and
  **0 text nodes**. No buttons, labels, HUD or help text.
- **Containment:** merged-geometry bounds are `x [-23.61, 23.61]`,
  `z [-23.61, 23.61]` — exactly the 47.2-unit plinth half-width. Nothing is
  built outside the square base. (`y [-6.5, 6.5]` is the searchlight beam's
  *local* extent, a light shaft inside the base footprint, not scene content.)
- **Cost:** 72 draw calls, 42,478 triangles, 21 programs, 68 geometries,
  31 textures. Synchronous render benchmark **16.2 ms/frame at 1440×900**
  including the planar reflection pass.
- **Interaction** (OrbitControls' own handlers): drag rotated azimuth
  `0.72 → 0.4623` and polar `1.0 → 1.0387` with distance unchanged at `39.96`
  (a pure orbit); wheel-in moved distance `39.96 → 30.76`; wheel-out moved it
  `30.76 → 61.79`. Controls report `enabled/rotate/zoom/damping = true` with
  distance clamped to `[14, 88]` and polar angle clamped to `[0.14, 1.40]`, so
  the camera cannot flip under the plinth or be lost.
- **Dynamic effects:** rain, drip, steam and water `uTime` uniforms all
  advance with the clock. Over 30 simulated seconds the hemisphere light rose
  from `2.15` to a peak of `3.635` (lightning) and the roller shutter
  displacement moved off its base value (the periodic judder). No errors
  accumulated during the run.

### Bug found and fixed during verification

A geometry-bounds audit found vertices at y = ±19 that no prop should reach.
Cause: `Builder.add` applied `translate` **before** `rotation`, so every
rotated prop was rotated about the world origin after being placed, scattering
crates, tyres and wheels across the map (4,980 stray rubber vertices, 1,296
metal vertices). Fixed by applying scale → rotate → translate in standard TRS
order; the stray-vertex query now returns `[]`. The fix visibly improved prop
placement and is the difference between the earlier and final renders.

## Requirement coverage

| Prompt area | How it is represented |
| --- | --- |
| Square concrete base | 46×46×2.3 plinth on a 47.2 display stand; asphalt field inset with a concrete border; all content inside |
| T spawn (north) | Raised terrace, barbed-wire fence, derelict box truck + leaning ladder, two-high/one-high container stack with a walkable slot, stepped ramp with retaining walls and a crouched breach, drum packs and pallets |
| A site (northwest) | Half-open warehouse: half-rolled rusted shutter with drum and guides, two boarded plywood windows + inward side door, white plant-site spray paint, forklift, 5-tier rack, crates/sacks, thick centre peek column, south-east loft with vertical ladder and viewing slit, sorting table, packing straps and newspapers, AC unit / freight sign / lidded bin on the alley wall |
| Mid lane | Broken wall blocks with a high firing port and stand-on catwalk ledge each side, half-open double iron gate, recessed rusted drain grate with standing water, low cover wall with crates and a leaning road sign, guard posts, sewer mouths under the T ramp and at the CT flank |
| B site (northeast) | Two-storey tin guard house with glazed window, ajar door, desk, overturned chair, locker, hanging broken fluorescent tube and a duty roster; fire escape to a railed balcony; paint marking in front of the door; pallets, bins, bicycles, overturned iron furniture; warm corner street lamp; low wall shortcut to CT |
| CT spawn (south) | Barricades and propped riot shields, police van with alternating red/blue beacons, concrete observation platform with stairs, railings and a swaying searchlight, rear wall with badge and warning slogans, vest/helmet equipment crates |
| Three routes | Mid duel lane; west alley behind A down to the CT flank; east raised walkway from the B balcony down to CT, with piers and a stair |
| Environment | Wet asphalt with old concrete pours, fbm puddles, drainage, power poles with sagging catenary cables, rust, graffiti, freight numbering, warning signs, bullet clusters, crates/drums/tyres/pallets/jersey barriers/dumpsters |
| Art direction | 4-step toon ramp, inverted-hull outlines, cool blue night ambient with warm street lamp, cold warehouse tubes and red/blue beacons |
| Dynamics | Rain curtain, eave/container/shutter drips, puddle ripple rings, water reflections, lamp and tube flicker, swaying searchlight, alternating beacons, vent steam, periodic lightning, shutter judder |
| No UI / no people | Verified: 1 DOM element, 0 text nodes; no character models anywhere |

## Known limitations and required human intervention

1. **Trusted mouse input could not be delivered in this environment.** Chrome
   was occluded (the user was in another application), so
   `Input.dispatchMouseEvent` returned `ok` but delivered nothing — an in-page
   probe counting `pointerdown` / `pointermove` / `pointerup` / `wheel` on the
   canvas recorded 0 for all four, with and without
   `Emulation.setFocusEmulationEnabled` and after `Page.bringToFront`.
   Interaction was therefore verified by dispatching real `PointerEvent` and
   `WheelEvent` objects at OrbitControls with only `setPointerCapture` stubbed
   (it throws on synthetic pointer ids and silently aborts the drag). That
   exercises the same handlers and the same camera maths a mouse would drive,
   but it is **not** a human-input test. A reviewer with the tab in the
   foreground should confirm drag and wheel once by hand.
2. **Viewport was not 1440×900.** `Emulation.setDeviceMetricsOverride` at
   1440×900 was issued after every reload, but the browser window reported
   `innerWidth/innerHeight = 1309×818` with `devicePixelRatio ≈ 1.1`, so all
   captures are 1309×818 CSS px. The 1440×900 requirement is unverified.
3. **Screenshot capture degraded late in the session.** Distinct orbit angles
   and zoom levels were captured and inspected successfully early on (plan
   view; T-spawn container/truck close-up; B-site street lamp close-up; A-site
   overhead; A-site interior with plant-site paint; CT-spawn close-up; hero
   three-quarter view). Later in the session the occluded tab stopped
   compositing new frames — captures repeated the default view even when the
   camera was confirmed numerically to have moved (verified `camera.y = 55.1`
   at polar 0.30 while the image still showed the default angle). The final
   low-angle and plan-view captures are therefore **not** valid evidence.
   Re-run those two angles with the tab in the foreground.
4. **Artistic trade-off:** the A warehouse keeps its roof over the northern
   ~35% and shows bare trusses over the rest, and the B guard house roof is
   pulled back over its rear half. This was a deliberate choice so an orbiting
   camera can read the interiors; from the north side the A interior is
   largely hidden by the remaining roof panels.
5. Only the **production build** was exercised in-browser. The dev server was
   confirmed to serve HTTP 200 but was not visually inspected.
6. No automated test suite exists — this task ships no fixed tests, and the
   checks above were scripted browser probes rather than a committed suite.

## Result

The production build succeeds, the app runs locally with no credentials or
services, loads with zero console errors and zero UI, contains all geometry
inside the square base, responds to orbit and zoom within clamped limits, and
animates every dynamic effect named in the prompt. Deviations from a full
acceptance pass are items 1–3 above, all caused by the browser window being
occluded and therefore requiring a foreground re-check rather than a code
change.
