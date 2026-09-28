# Results — cs-pvp-diorama / grok-bot

- **Model id:** `grok-bot`
- **Baseline SHA:** `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- **Branch:** `llm/cs-pvp-diorama/grok-bot`
- **Solution path:** `tasks/cs-pvp-diorama/solution/`

## Verification

Commands run from `tasks/cs-pvp-diorama/solution/`:

```bash
npm install
npm run build -- --base=/cs-pvp-diorama/grok-bot/ --outDir=dist --emptyOutDir
```

**Build result:** success (Vite 8.3.0). Output:

- `dist/index.html` (asset base `/cs-pvp-diorama/grok-bot/`)
- `dist/assets/index-*.js` (~1.19 MB / ~328 KB gzip)

No leftover preview/dev servers left running after smoke checks.

## Implemented

- Square gray concrete pedestal; all geometry contained on the base
- Five zones: T spawn (N), A site NW warehouse, mid (iron door / drains / sewer underpass / high peeks), B site NE alley + guard house balcony, CT spawn (S)
- Three routes: mid duel lane, left west alley, right elevated flank
- OrbitControls (drag rotate / scroll zoom); no on-canvas UI chrome; no characters
- Cel/toon materials (`MeshToonMaterial`) + dark outlines; cool industrial rain-night lighting with warm street lamp, cold warehouse lights, red siren/back-room accents
- Cover props: crates, blue barrels, cardboard stacks, barriers, tires, graffiti, bullet holes, trash bins, ladders
- Dynamics: rain particles, reflective puddles, drips, flickering street/search lights, police siren pulse, shutter vibration, steam vents, occasional lightning

## Limits / deferred

- Building interiors are readable blockouts (warehouse loft/shelves/forklift, guard desk/locker, mid booths), not fully dressed rooms
- Puddles use high-metalness materials rather than real-time planar reflection probes
- Sewer is a visible underpass volume under mid, not a navigable first-person corridor
- No external texture atlases — procedural solid/toon shading only
- Overhead wires are simplified cylinders (light sag), not full catenary curves

## Human intervention

None.
