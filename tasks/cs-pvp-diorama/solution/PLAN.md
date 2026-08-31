# CS PVP Diorama — Development Plan

## Goal

Render the requested CS Defusal map miniature diorama as a single-page Three.js (TypeScript) application built with Vite. The viewer is a third-person free-orbit camera around a square concrete base, presenting a toon-rendered rain-night freight-yard streetscape with the four key regions, three attack lanes, environment props, lighting contrast, and subtle dynamics.

## Approach

- **Stack:** Three.js (latest stable, vanilla TS, no React) + Vite. Direct three.js usage gives precise control over toon shading, outlines, and reflectors. React/R3F is unnecessary overhead for a single static scene.
- **Style:** MeshToonMaterial + gradient maps for the toon ramps, EdgesGeometry / inverted-hull outlines for crisp dark contour lines. Tone mapping ACESFilmic, no bloom.
- **Lighting:** Three-light setup: ambient cool fill, directional key (cold blue rain light), and a warm point light (street lamp) + cool-white point light (warehouse) + red point light (door crack). Hemisphere light for sky/ground bias.
- **Reflections:** A small planar `Reflector` plane for puddle reflections — cost-bounded by capping mirror resolution and re-using one Reflector across all puddles via multiple mesh positions is too costly, so use 1 Reflector plane per major puddle (≤3).
- **Rain:** A `Points` system with a custom shader for thin angled streaks, ~2000 particles bounded to a column above the base. Plus a few sprite "drip" particles dripping from rims.
- **Camera:** PerspectiveCamera with `OrbitControls` (drag-to-rotate, wheel-to-zoom, right-drag to pan). Auto-rotate disabled by default. Target the base center. Distance clamps prevent zoom-through.
- **Constraints:** No UI. No human figures. All geometry bounded by the 10×10 concrete base. Disable scroll-zoom-only when over UI (no UI exists, so no issue).

## Scene Layout (top-down, base ~10×10)

```
                  (north, T-spawn)
            ┌───────────────────────┐
            │  T spawn: truck + containers │
            │  ramp → mid              A site
            ├──────────────────────────────┤
            │ mid: heavy iron doors + alley │
   B site ──┤   (central duel lane)         │
            │ mid CT-side low wall          │
            ├──────────────────────────────┤
            │  CT spawn: van + barriers     │
            │  raised platform + searchlight │
            └───────────────────────┘
                  (south, CT-spawn)
```

- T-spawn on the north side (z = -4): rusty van, three-stack containers, ramp down to mid, wooden ladder.
- A site on the north-west (x = -3, z = -3.5): open warehouse with rolling door, central pillar, loft, shelves, forklift.
- Mid central lane (z = 0): double iron doors half-open, drainage channel with grating, high walls with shooting slits, low wall cover.
- B site on the north-east (x = +3, z = -2): two-story tin guardhouse with balcony, fire escape ladder, freight pallets, dumpster.
- CT-spawn on the south side (z = +4): police van, jersey barriers, raised platform with searchlight.

Left flanking alley (x = -4.5) connects A back to T alley via narrow passage.
Right elevated flank (x = +4.5) connects B right side up high.

## Components / Files

```
solution/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.ts                # entry, sets up renderer/scene/camera/loop
│   ├── scene/
│   │   ├── base.ts            # concrete square base + asphalt ground
│   │   ├── spawnT.ts          # T-spawn props
│   │   ├── spawnCT.ts         # CT-spawn props
│   │   ├── siteA.ts           # A warehouse + interior
│   │   ├── siteB.ts           # B guardhouse + balconies
│   │   ├── mid.ts             # central duel lane + iron doors + drainage
│   │   ├── cover.ts           # shared cover-prop factory (crates/barrels/tires)
│   │   ├── wires.ts           # power poles + suspended wires
│   │   ├── graffiti.ts        # canvas-baked textures (graffiti, signs, markings)
│   │   ├── puddles.ts         # reflective puddles + ripples
│   │   ├── lights.ts          # tactical lights (warm/cool/red)
│   │   ├── rain.ts            # rain particle system + drips
│   │   ├── lightning.ts       # occasional sky flash
│   │   └── outline.ts         # utility for toon outlines
│   └── util/
│       ├── materials.ts       # toon material factory
│       ├── geom.ts            # tiny geom helpers (Box, Cylinder, etc.)
│       └── rng.ts             # seeded RNG (Mulberry32) for reproducibility
└── RESULTS.md                  # filled at the end
```

## Implementation Order

1. Vite + three.js scaffolding (package.json, vite.config.ts, tsconfig, index.html, main.ts stub that boots renderer + OrbitControls + a test box).
2. Toon material factory + gradient map + outline helper (EdgesGeometry + LineSegments).
3. Base (10×10 concrete block) + dark asphalt top + 4 puddles with Reflector.
4. T-spawn (van, container stacks, ramp, oil drums, pallet stack).
5. A-site warehouse (rolling door, central pillar, shelves, forklift, loft with ladder).
6. B-site guardhouse (two-story with fire escape, dumpster, pallets, street lamp).
7. CT-spawn (police van, jersey barriers, raised platform with searchlight).
8. Mid lane (iron doors half-open, drainage channel, high walls with slits, low wall cover).
9. Cover props scattered across all regions (barrels, crates, tires, jersey barriers, dumpsters, pallets, sandbags, broken bicycle).
10. Wires / poles / gutters / signage (procedural).
11. Graffiti / freight markings / bomb-site markings (CanvasTexture decals on key meshes).
12. Lights (cool ambient/dir, warm street lamp, cool-white warehouse, red door crack, red police beacon).
13. Rain particles + drips + puddle ripples + lightning.
14. Camera tuning: target base center, distance clamp, damping, FOV.
15. Smoke-test dev server boot + a `vite build` verification.
16. Write `RESULTS.md` with model id, baseline SHA, commands run, results, and known limitations.

## Verification Strategy (Headless)

- Cannot run browser visual verification per environment constraint.
- Verification is limited to:
  - `npm install` succeeds.
  - `vite build` succeeds (proves the code compiles & bundles).
  - Dev server starts cleanly (serve probe via fetch).
  - Source review covers all four regions + three lanes + props + lights + rain + outline.
- This will be stated explicitly in `RESULTS.md`.

## Risk / Tradeoffs

- **Performance vs visual richness:** The task is "compact diorama", so all geometry fits in a 10×10 footprint. Three.js handles this trivially. No LOD or instancing complexity required.
- **Puddle reflections:** `Reflector` is expensive. Plan to use one shared Reflector plane (the central puddle) with a moderate resolution (256×256) and a fake "darker wet floor" for smaller puddles.
- **Outlines:** EdgesGeometry per mesh is fine at this scene scale (<300 meshes). Inverted-hull outlines are skipped to avoid double-pass cost.
- **Rain particles:** Plain `Points` with thin-line shader. No expensive noise textures.
- **No external assets:** Everything procedural (geometry + CanvasTexture decals). No glTF, no HDR — uses `RoomEnvironment` for IBL on metallic accents only.

## Acceptance Criteria

- Boots in browser (renderer + scene + camera + OrbitControls) with no UI overlay.
- All four regions visibly present on a square concrete base.
- Three lanes (mid / left alley / right elevated) connect them.
- Toon shading with crisp dark outline contours.
- Wet asphalt, puddles reflecting, rain falling, drip particles, red/cool/warm light contrast.
- No characters, no UI.
- `npm install && npm run build` exits 0.