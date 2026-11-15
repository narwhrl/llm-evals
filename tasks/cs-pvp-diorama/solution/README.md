# CS PVP Diorama

A collectible-scale CS-style defusal map rendered in the browser: one square
concrete slab, a rainy freight yard at night, cel-shaded with crisp ink
outlines. Drag to orbit, scroll to zoom, drag with right button to pan.
There is no UI and no character in the scene.

## Run

```bash
npm install
npm run dev      # development server on http://127.0.0.1:5183/
npm run build    # production build into dist/
npm run preview  # serve the production build on http://127.0.0.1:4183/
```

`npm run build` accepts the usual Vite flags, so the gallery build works
unchanged:

```bash
npm run build -- --base=/cs-pvp-diorama/<candidate-id>/ --outDir=<target> --emptyOutDir
```

## Layout

The slab is 32 x 32 world units with north at `-Z`.

| Region | Where | What is there |
| --- | --- | --- |
| T spawn | north strip, raised yard | barbed wire perimeter, box truck, three stacked containers, ramp down to mid with a breach in its side wall |
| A site | north-west | half-open warehouse, half-rolled shutter, boarded plank windows, inward-opening side door, support column, five-tier racking, forklift, sheet-metal mezzanine with iron ladder, red glow behind the back door |
| Mid lane | centre column | concrete flanks with high shooting holes and flanking platforms, half-open iron gate, grated drain over standing water, guard booths, low cover wall near CT |
| B site | north-east | two-storey sheet-metal guard house, fire escape to the balcony, bomb marking on the ground, sodium street lamp, shortcut low wall |
| CT spawn | south | police barricades and shields, van with alternating beacon, concrete platform with a searchlight, badge wall |
| West alley | west edge | tight service alley linking T to CT behind the warehouse |
| East walkway | east edge | raised concrete flank route overlooking mid and the B courtyard |

## Code map

```
src/config.js      layout constants, puddle field, palette
src/textures.js    every surface, painted procedurally on a canvas
src/materials.js   cel material library and the outline material
src/kit.js         geometry batching, inverted-hull outlines, floor plate
src/props.js       reusable prop builders
src/world/*.js     the map regions
src/lighting.js    moon key, sodium lamp, warehouse strip, beacons, sky
src/fx/weather.js  rain, drips, steam, lightning
src/fx/puddles.js  planar reflection masked to the puddle field
src/pipeline.js    HDR target, bloom, filmic grade, vignette
```

No binary assets are loaded: every texture and the environment map are drawn
at runtime, so the build is self contained.
