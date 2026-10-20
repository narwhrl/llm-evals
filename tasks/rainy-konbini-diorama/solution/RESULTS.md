# Results — rainy-konbini-diorama

## Identification

- **Model:** `magpie/minimax-code/MiniMax-M3.1-Flash` (MiniMax M3.1 Flash, served by the
  `magpie/minimax-code` provider).
- **Mode:** single model, no subagents, no other models consulted, no reference to any
  other candidate's source.
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
  (`docs: record gpt-6.1-sol blackhole hero import`).
- **Working copy:** local worktree
  `.worktrees/minimax-m3.1-flash/rainy-konbini-diorama` on branch
  `run/rainy-konbini-diorama/minimax-m3.1-flash`, created from that commit.

## What was built

A React + Vite + Three.js rainy-night convenience-store corner, built entirely from
boxes at runtime. No image, model, font or audio file is fetched.

- **Base and street** — a 14 × 14 square plinth with an L-shaped road around the
  block, so the composition reads as a street turn. The road carries a centre line, a
  stop line, two crosswalks, painted parking bays, a kerb, a drainage channel with a
  grate, and a translucent film of asphalt laid over a real mirror, so the shop's
  light, the signs and the street lamps are reflected in the wet tarmac. Around it:
  a kerbed sidewalk, a car park with three parked cars, a bicycle rank, an alley
  mouth down the western flank with a lamp and a lit sign over it, a waiting shelter
  with a lit advertisement, a bench, a notice board, rubbish bins, an umbrella rack,
  three bicycles, street lamps, a traffic signal, utility poles with sagging wires,
  road signs, guardrails, bushes, a low wall and the neighbouring buildings.
- **The store** — a shell of cream panels with two broad glazed windows and an
  automatic sliding door between them, a striped canopy, a green-and-white lit sign
  band with a wordmark, a projecting corner sign box and rooftop plant (condenser,
  vent pipes, water tank, parapet). The sliding leaves retreat behind the fixed glass
  when they open.
- **The interior** — a real room behind the glass: a floor with a guidance strip down
  the aisle, a ceiling with four warm light boxes, a drink case, a chilled bento
  case, gondola shelving down the middle, a rice-ball and snack shelf, the oden pot
  on its counter, the register counter with a register and a coffee machine, a
  magazine rack, posters, a light box, lockers and a back door at the end of the
  aisle.
- **Cel shading** — every form is a box. Lit surfaces use `MeshToonMaterial` with a
  four-step gradient map, and each mesh is duplicated as a slightly expanded shell
  drawn back-face-first in near-black, which gives every silhouette a drawn contour.
- **Weather** — rain streaks are computed entirely in the vertex shader from a single
  clock, eave drips are a separate particle system, puddles are shader discs with
  expanding rings, and the shop windows carry a glass shader with rain running down
  in columns at different speeds plus static beads.
- **Motion** — continuous rain, eave drips, puddle ripples, glass runoff, a sign
  band that breathes and occasionally stutters, an automatic door that opens now and
  then, and a traffic signal that changes on a timer.

## Verification actually run

All commands were executed in the candidate worktree; the results below are what was
observed.

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0, 77 packages |
| `npx tsc --noEmit` | exit 0, no diagnostics |
| `npm run build` | exit 0 — `dist/index.html`, CSS, and a JS bundle of about 700 kB |
| `npm run build -- --base=/rainy-konbini-diorama/minimax-m3.1-flash/ --outDir=dist-subpath --emptyOutDir` | exit 0 — `dist-subpath/index.html` references the sub-path asset URLs |
| `npx vite --host 127.0.0.1 --port 5174` | dev server served the scene; used for the visual pass |
| headless Chromium at 1440 × 900 and 1200 × 800 | scene rendered, no console errors, no page errors, no failed requests |

## Browser observations

Checked in a clean headless Chromium session at a 1440 × 900 viewport with the WebGL
renderer reported as ANGLE over Direct3D 11.

- The opening view shows the complete square base with the shop at the visual
  centre, the street turning the corner in front of it, the car park to the south and
  the neighbouring block to the east. There is no UI, no overlay and no people.
- Dragging orbits the camera, the wheel zooms between 5 and 46 units, and the model
  stays centred. Every prop remains on the base at every angle inspected.
- Through the glass the interior reads: the drink case and the bento case on the
  left, stocked gondolas down the middle, the rice-ball shelf, the oden pot, the
  register and coffee machine on the right, the magazine rack by the door and the
  back door closing the aisle. The warm interior against the cool blue street is
  legible from the front, from the corner and from the pavement.
- The wet road reflects the shop's sign band, the interior glow and the street lamp.
  The puddles show expanding rings; the rain runs down the window glass.
- Over more than a minute of running the automatic door opened and closed on its own,
  the sign band breathed and stuttered once, and the traffic signal changed colour.

## Defects found and fixed during the visual pass

1. The entrance mat was written with its `z` corners the wrong way round. The box was
   inside out, so its top face was culled and the mat read as a black hole in the
   pavement. Fixed by ordering the corners inside `pushBox`, so a box written back
   to front still faces outwards.
2. The palette was written as sRGB but fed to the renderer as linear values, which
   made the whole street read several stops too bright and washed the shop interior
   out. Fixed by decoding the palette channels to linear in the geometry builder.
3. The ink outline was expanded by zero on some boxes, so the outline shell sat
   exactly on the surface it was outlining and the two z-fought. Fixed with a
   minimum expansion of 0.005.
4. The street lamps were point lights placed inside their own lamp heads, which
   blew the lamp posts out to white. Replaced with a glowing bulb sprite and a pool
   of light on the ground.

## Visual review

Screenshots in [`evidence/`](evidence) were captured from the running scene at
1440 × 900 and read back one by one.

- `01-overview.png` — the opening framing: the whole square base, the shop lit warm
  at the centre of the corner, the wet road with its reflections, the car park and
  the rain.
- `02-storefront.png` — the shop from the corner: the sign band, the awning, the
  corner sign box, the vending machines and the lit interior behind the glass.
- `03-wet-street.png` — low on the pavement at the crosswalk: the reflective road,
  the notice board, the umbrella rack and the shop's sign mirrored in the tarmac.
- `04-alley.png` — the alley mouth down the western flank of the shop.
- `05-interior.png` — the interior seen through the glass: the magazine rack, the
  stocked shelves, the entrance mat and the awning above.

Checklist against the brief:

- complete square base with every element on it — yes;
- compact, layered, collectible-model silhouette — yes;
- convenience store at the visual centre, clearly readable — yes;
- distinct street turn and a small alley — yes;
- sign, broad glazing, automatic door, awning, entrance mat, vending machines,
  bicycles, umbrella stand, bins, street lamp, poles and wires, road signs,
  guardrail, parking, drainage, wet road, reflective crosswalk, outdoor AC unit and a
  notice board — all present;
- a furnished, lit interior readable through the glass — yes;
- cel shading with crisp outlines, restrained materials, layered neon, wet night
  reflections and a strong warm/cool contrast — yes;
- continuous rain, eave drips, puddle ripples, glass runoff, sign flicker, automatic
  door movement and traffic-signal variation — all animated;
- drag, orbit and zoom responsive; no UI; no people — yes;
- production build succeeds; no external assets — yes.

## Known limitations and failures

- The interior is read mostly through the two front windows. From very close to the
  glass the panes carry a visible water veil, so the middle of the shop is hazier
  than the ends.
- The parked cars and the bicycles are built from a few dozen boxes each, so at very
  close range they read as blocky rather than as smooth vehicles.
- The wet asphalt is a translucent film over a mirror rather than a ray-traced
  surface, so reflections are sharp and do not blur with distance.
- The car park is dim, because the only light over it is a single lamp; the cars are
  readable but not bright.
- `npm install` reports that `esbuild`'s postinstall script was not run under npm
  11.19's `allowScripts` policy. The build and the dev server both work regardless,
  because the platform binary package supplies the executable.
- No texture, model or font is loaded from the network, so nothing in the project
  depends on a third-party asset licence.

## Human intervention required

None. The project installs, type-checks, builds, serves and runs unattended.
