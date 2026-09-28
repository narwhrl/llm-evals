# CS PVP Diorama — grok-bot candidate

Miniature third-person CS-style defusal PVP map diorama built with React, Vite, Three.js, and React Three Fiber. Pure sandbox model: no UI chrome, no characters.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL. Drag to orbit, scroll to zoom.

## Production / gallery build

```bash
npm run build -- --base=/cs-pvp-diorama/grok-bot/ --outDir=dist --emptyOutDir
```

Preview the build:

```bash
npm run preview
```

## Layout (top-down)

| Region | Placement |
| --- | --- |
| T spawn | North (+Z) — fence, truck, stacked containers, ramp |
| A site | Northwest — open warehouse, bomb mark, loft, shelving |
| Mid | Center axis — iron door gap, drain grates, sewer underpass, high peeks |
| B site | Northeast — guard house, balcony, street lamp, alley cover |
| CT spawn | South (−Z) — barricades, police van, searchlight platform |

Attack paths: mid duel lane, left west alley, right elevated flank.

## Tech

- Cel/toon materials (`MeshToonMaterial` + dark `Outlines`)
- Procedural props (crates, blue barrels, cardboard, barriers, tires, graffiti, bullet holes)
- Rain particles, puddle reflections, drips, flickering lamps, siren pulse, shutter buzz, steam, lightning
