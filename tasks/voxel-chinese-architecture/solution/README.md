# 中轴宫苑 · Voxel Chinese Classical Architecture

A voxel Chinese palace complex built with React, Vite and Three.js: a mountain gate on the
south end of an axis, a paved courtyard, a main hall at the north end, two side halls
mirrored across the axis, a four-storey pagoda and a bell-and-drum tower, all inside a red
enclosure wall.

Every block is generated in code. There is no image, model or font loaded at runtime; the
ground paving and the grass are drawn into a 2D canvas when the page starts.

## Running it

```bash
npm install        # or: npm ci
npm run dev        # development server on http://127.0.0.1:5174/
npm run typecheck  # tsc --noEmit
npm run build      # type check + production build into dist/
npm run preview    # serve the production build on http://127.0.0.1:4174/
```

The page opens straight into the scene: the camera settles onto the axis framing after a
short opening move, so the whole complex is visible without any interaction.

Production builds accept the usual Vite overrides, which the gallery uses to host a
candidate under a path prefix:

```bash
npm run build -- --base=/voxel-chinese-architecture/example/ --outDir=dist-subpath
```

## Project layout

```text
src/
├── main.tsx                 React entry point
├── App.tsx                  Parameter state and layout
├── styles.css               Design system for the shell and the parameter panel
└── scene/
    ├── World.tsx            Renderer, camera rig, rebuild pipeline
    ├── building.ts          Parametric Chinese halls, pagodas and towers
    ├── complex.ts           The layout of the complex
    ├── props.ts             Paving, wall, lions, lanterns, steles, pavilions, pines
    ├── palette.ts           The colour palette
    ├── sky.ts               Sky dome, sun rig and the four lighting presets
    └── voxel.ts             Box and quad emitters, indexed geometry builder
```

## How the buildings are made

A hall is assembled from the same parts every time: a stone platform with a flight of
steps, a ring of wooden columns on stone bases, red walls with lattice windows between
them, bracket sets (dougong) above the columns, and a tiled roof.

The roof carries the style, so it is generated from a height field instead of a fixed
shape:

- **庑殿 (hip)** — the solid is the intersection of four half-spaces, which in a height
  field is simply the larger of the two slope distances.
- **歇山 (hip-and-gable)** — the hip constraint only applies below the break line, so the
  upper part ends in a vertical gable.
- **攒尖 (pyramidal)** — the ridge length is zero, so the slope is the larger of the two
  distances in both directions and the roof is a cone.
- **悬山 (gable)** — the hip constraint is dropped entirely and the ridge runs the full
  length of the roof.

The **flying eaves (飞檐翘角)** are added afterwards: a lift that falls off with the
distance to the eave corner and fades out as the roof rises, so the eave line curves up
towards the corner in steps. The hip ridges (垂脊) run along the diagonal where the roof
turns over the corner, and the main ridge carries an ornament at each end.

The pagoda is a stack of shrinking storeys: each one is built at the origin and then
lifted onto the tier below, so the tiers overlap the way a real pagoda does.

## Controls

Drag to orbit, scroll to zoom, right-drag to pan. The panel on the right switches the
roofs between glazed green tiles and grey ones, resizes the mountain gate, picks one of
four lighting presets (dawn, noon, dusk, night), picks one of four camera framings and
toggles the slow auto-orbit.
