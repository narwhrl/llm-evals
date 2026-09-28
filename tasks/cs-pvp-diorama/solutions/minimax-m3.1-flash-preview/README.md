# CS PVP Diorama

A rainy-night Counter-Strike defusal map rendered as a collectible miniature
on a single square concrete plinth. Toon shading with crisp inverted-hull
outlines, standing water with real planar reflections, and no interface of any
kind — drag to orbit, wheel to zoom.

## Run it

```bash
npm install
npm run dev        # http://127.0.0.1:5180
```

## Build it

```bash
npm run build      # -> dist/
npm run preview
```

The gallery build appends `--base=<prefix>/ --outDir=<path> --emptyOutDir`,
which `vite build` accepts directly; no configuration changes are needed.

## Layout

| Region | Where |
| --- | --- |
| T spawn | North edge, raised terrace behind barbed wire |
| A site | Northwest, half-open freight warehouse |
| B site | Northeast, two-storey tin guard house and back alley |
| CT spawn | South edge, police cordon and observation platform |
| Mid lane | Central axis, gate and grated drain |
| West alley | Flank from A down to the CT side |
| East walkway | Raised flank from the B balcony to CT |

## Source map

```
src/
  main.js              assembly, frame loop, verification hook
  core/
    stage.js           renderer, camera, orbit limits, scene lighting
    materials.js       toon ramps, material table, outline material
    builder.js         geometry batching + inverted hull generation
    reflection.js      mirrored-camera planar reflection for the water
    textures.js        every surface and decal, painted on canvas at load
    geom.js            geometry helpers with uniform texel density
  world/
    layout.js          all map coordinates in one place
    base.js            plinth, yard surface, drainage channel, sewer mouths
    tspawn.js asite.js bsite.js ctspawn.js mid.js routes.js
    props.js decals.js vehicles.js
  fx/
    rain.js            rain curtain and eave drips (GPU, one draw call each)
    water.js           puddle mask, ripples, reflections, light streaks
    steam.js glow.js
```

No binary assets: all textures are generated at runtime, so the build is a
single JS bundle and nothing can fail to load.

## Verification

See [`RESULTS.md`](RESULTS.md) for the commands actually run, the browser
evidence, and the known limitations.
