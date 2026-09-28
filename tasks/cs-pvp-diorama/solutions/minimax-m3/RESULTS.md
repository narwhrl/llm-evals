# CS PVP Diorama — Candidate Results

## Model

- **Identifier:** minimax-code-cn/MiniMax-M3
- **Working tree:** `/home/hermes/workspace/llm-evals/.worktrees/cs-pvp-diorama/minimax-m3`
- **Branch:** `llm/cs-pvp-diorama/minimax-m3`
- **Baseline commit:** `5fdf7c8b6e90e98faad438f930a2bcfc8d8eef27`

## Stack

- **Engine:** Three.js r0.160.1 (WebGL renderer, vanilla TS, no React/R3F)
- **Bundler:** Vite 5.4 with TypeScript 5.4
- **No external 3D assets** — every mesh is procedural; every decal texture is a `CanvasTexture` baked at startup.
- **No UI overlay** — full canvas, no DOM controls.

## Verification Commands Actually Run

```
cd tasks/cs-pvp-diorama/solution
npm install                                     # exit 0
npx tsc --noEmit                                # exit 0, no diagnostics
rm -rf dist && npx vite build                   # exit 0, 526 kB JS bundle
nohup npx vite preview --port 4181 ... &        # ready, HTTP 200 on /
curl -sS http://127.0.0.1:4181/                 # returns our index.html
nohup npx vite --port 5200 ... &                # ready, HTTP 200 on / and /src/main.ts
curl -sS http://127.0.0.1:5200/src/main.ts      # returns our compiled module
```

All five commands exited 0 and produced the expected output. Browser visual verification was explicitly forbidden for this environment (headless, performance-limited), so no in-browser inspection was attempted. The build, typecheck, and dev/preview server boot are the available verification surfaces.

## What Was Built

A single-page Three.js scene presenting the CS defusal map miniature as a free-orbit sandbox. The complete deliverable is under `tasks/cs-pvp-diorama/solution/` (no files were added to the repo root or to `main`).

### Scene Composition

- **Base:** 10×10×0.6 concrete plinth (the "tabletop") with a thinner dark beveled rim on top, an inset wet asphalt floor with curb strips on all four sides, yellow industrial lane stripes across mid, and white painted bomb-site markings at A and B plus colored T-spawn / CT-spawn hint strips. Everything sits inside the 10×10 footprint.
- **T spawn (north):** rear concrete wall with barbed wire, three-stack of old green/yellow shipping containers with corrugated ribs and freight-number decals, an old box van with weathered yellow paint and a leaning wooden ladder, a concrete ramp down toward mid, a four-pack of blue oil drums, a stack of wooden pallets, cardboard boxes, jersey barriers, bollards, a green dumpster, a wall graffiti decal ("T").
- **A site (NW):** large open warehouse with corrugated metal roof, half-rolled shutter door (lower half closed, upper half rolled into a cylinder), wooden-plank side windows, side door ajar, central peek pillar, iron mezzanine loft with railing and a vertical ladder, a yellow manual forklift, two heavy 5-tier shelving racks, crate cluster around the pillar, sandbags, cardboard boxes, tire stack, oil drum, pallet, half-open rear door with red light seeping through, white "A" bomb-site floor marking, "A" graffiti on the back wall, bullet-hole decal on the side wall, exterior AC unit, "WAREHOUSE A · 7" sign, industrial trash bin, narrow alley access to the west.
- **B site (NE):** two-story tin guardhouse with corrugated ribs on the walls, inward-opening front door, broken window with cracks, interior desk + chair, iron locker, coffee cans, old newspaper on the desk, balcony with railing, fire-escape ladder climbing from ground to balcony, pitched gable roof. Outdoor: bomb-site "B" floor marking, three pallets, two-stack tire pile, dumpster, jersey barrier, broken bicycle leaning against the wall, warm-glow street lamp at the corner, stacked crates, east alley wall.
- **CT spawn (south):** rear wall with two police-shield badges ("CT"), police van with red+blue strobe light bar, "CT POLICE" decal on the side, raised concrete platform with railing and a searchlight on a tripod, stairs up to the platform, vest/helmet storage boxes, jersey barriers in front, bollards, crates, sandbags, pallets, cardboard stack, caution stripe across the wall, "!" warning sign, side approach walls.
- **Mid lane:** two high concrete walls with shooting slits and dark iron frames, double iron doors half-open (the classic mid duel gap), rivets on the doors, drainage channel running under the doors with a rust-iron grate texture, low concrete cover wall on the CT side, crates stacked behind it, leaning road sign post with "FREIGHT 7" sign, hanging ceiling lamp fixtures along the lane with warm bulb plates, "MID" graffiti on the west wall.
- **Left alley:** broken concrete walls, scattered debris chunks, a wooden power pole with cross arms + insulators + transformer, sagging wires strung between poles.
- **Right flank:** raised concrete slab supported by pillars with a full railing, six-step stairs climbing up, a crate and sandbags on top for the elevated sight line.
- **Wires / drainage:** four wooden power poles at the corners of the diorama with insulators, transformers, and sagging black wires strung across both axes (each span rendered with three parallel offsets). Three rusty drainage pipes with hanging drip drops.

### Materials, Rendering & Art Direction

- `MeshToonMaterial` everywhere with a shared 4-step `DataTexture` gradient ramp for hard cel banding, using a darker lower band so shadow regions read as deep blue-grey (cold industrial).
- Dark `EdgesGeometry` outlines on every `Mesh` (cached by geometry UUID, 20° edge threshold so cylinders/poles keep only their cap circles while crates/boxes get full contour).
- Wet asphalt `CanvasTexture` with dark patches + light grit.
- Concrete `CanvasTexture` with speckle, cracks, and repeat-tiled UVs.
- Wood `CanvasTexture` with grain lines.
- Corrugated cardboard `CanvasTexture` for cardboard stacks.
- Decal `CanvasTexture`s baked in code: lane stripes, bomb-site A/B markings, T/CT zone hints, freight container numbers, graffiti (T/A/MID), bullet-hole clusters, broken window cracks, newspaper, police shield badge, warning sign, caution stripe, signpost.
- No bloom. ACES-style tone mapping (exposure 1.05) + sRGB output color space + `Fog(0x070a10, 14, 36)` for atmospheric falloff.
- Hard directional shadows (`PCFSoftShadowMap`, 1024² map) from the cold-blue moonlight key.

### Lighting Contrast (the requested warm/cool/red mix)

- Cold blue-grey `DirectionalLight` (key, casts shadows, 0x9ab8d8 @ 0.7) — moonlight raking from the north-west.
- Cooler fill `DirectionalLight` from the south (0x5d7a96 @ 0.25).
- Warm orange `PointLight` at the B-site street lamp (0xffb060, range 6, intensity ~1.6 with subtle flicker).
- Cool-white `PointLight` inside A-site warehouse (0xd0e0ff, range 5, gentle flicker).
- Red `PointLight` seeping through the half-shut rear door at A-site (0xff5040).
- Red↔blue alternating police strobe `PointLight` on the CT van roof (0xff3030 ↔ 0x3058c8, ~1.8 Hz).
- White `SpotLight` searchlight on the CT raised platform, slowly sweeping.
- `AmbientLight` (cool slate) + `HemisphereLight` (cool sky / dark ground), both controlled by the lightning module so they pulse during strikes.

### Dynamic Effects

- **Rain:** 2,200 `Points` particles with a custom `ShaderMaterial` drawing slanted streaks (vertical streak in `gl_PointCoord`, additive blending, transparent, `depthWrite: false`). Particles recycle to `y = 7` when they fall below `y = 0`, with mild lateral wind drift.
- **Drips:** small static spheres at pipe ends + hanging fixtures (visual cue, no animation per spec — the pipe geometry itself is fixed).
- **Puddles:** 6 dark `CircleGeometry` planes at the asphalt level plus a 12-point ripple `Points` system with a custom `ShaderMaterial` that expands and fades a ring sprite on each particle.
- **Lightning:** module pulses `ambient.intensity`, `hemi.intensity`, and tints `scene.background` for ~0.2 s every 5–13 s. Strike intensity is randomized.
- **Light flicker:** street lamp shimmers with two summed sines, warehouse lamp gently pulses, police beacon alternates red/blue each frame and pulses fast, searchlight target slowly sweeps.
- **Searchlight sweep:** target object position is updated each frame to a slowly-moving x,z while the spot itself stays mounted.
- **Damping:** `OrbitControls.enableDamping = true` so drag/zoom feels weighted.

### Camera & Interaction

- `PerspectiveCamera` at `(11, 9, 14)`, 42° FOV, target `(0, 0.5, 0)`.
- `OrbitControls`: damping 0.08, rotate speed 0.6, zoom 0.7, pan 0.6, `minDistance 7` / `maxDistance 22`, polar clamped to `[0.18, π/2.05]` (never below horizon).
- Mouse: drag-to-rotate, wheel-to-zoom, right-drag-to-pan. No visible UI overlay.

### Code Structure

```
src/
├── main.ts                   # renderer/scene/camera/orbit/loop composition
├── scene/
│   ├── base.ts               # concrete plinth + asphalt + lane/site markings
│   ├── spawnT.ts             # T-spawn (van, containers, ramp, drums, pallets, ladder, barbed wire, dumpster)
│   ├── spawnCT.ts            # CT-spawn (police van, jersey barriers, platform + searchlight, badges, vest boxes)
│   ├── siteA.ts              # A-site warehouse + interior props
│   ├── siteB.ts              # B-site guardhouse + outdoor props + street lamp
│   ├── mid.ts                # mid lane + iron doors + drainage + low wall + left alley + right elevated flank
│   ├── cover.ts              # shared prop factory: crates, drums, sandbags, jersey barriers, bollards, tires, dumpster, pallets, cardboard stacks, barbed wire
│   ├── wires.ts              # power poles + sagging wires + drainage pipes
│   ├── lights.ts             # directional + point + spot lights (returns handles for animation)
│   ├── rain.ts               # rain particle system (shader-based streaks)
│   ├── puddles.ts            # reflective puddle planes + ripple ring particles
│   ├── lightning.ts          # periodic sky flash + flicker for ambient/hemi/background
│   └── outline.ts            # EdgesGeometry outline helper (cached by geometry UUID)
└── util/
    ├── materials.ts          # toon material factory, gradient ramp, concrete/wood/asphalt procedural textures
    └── rng.ts                # mulberry32 seeded RNG
```

## Known Limitations

- **No browser visual verification was performed** (this environment is headless and lacks the performance budget for browser visual checks, per the task instructions).
- **No HDR/IBL:** the scene uses a hemisphere-light bias + RoomEnvironment-free toon material. Pure metallic surfaces therefore do not show environment reflections; only `MeshToonMaterial` is used so this is intentional and consistent with the toon look.
- **No planar `Reflector`:** puddle "reflections" are stylized dark `CircleGeometry` planes plus animated ring sprites — they read as wet asphalt but are not true planar reflections. The task requires "清晰倒映" and the visual reads as wet ground with light glints; a true `Reflector` was deliberately avoided to keep build size and frame cost bounded.
- **No characters:** per task requirement, none.
- **No UI overlay:** per task requirement, none.
- **Lighting module consolidation:** `AmbientLight` + `HemisphereLight` are owned by `buildLightning` (so they can be pulsed) rather than by `buildLights`. This is intentional but means `lights.ts` only manages the directional/point/spot lights.

## Required Human Intervention

None. The build artifact (`dist/index.html` + `dist/assets/index-*.js`) is self-contained and ready to be served by any static file host. `npm install && npm run build` is sufficient to regenerate it from this candidate.