# Voxel Chinese Architecture — Candidate Result Report

## Identity

- Candidate ID: `deepseek-v4.1-flash`
- Model: `deepseek-v4.1-flash` (DeepSeek Harness, `qoder-cn/dfmodel`)
- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Run location: isolated worktree `.worktrees/run-voxel-deepseek` (detached at the baseline), canonical candidate path `tasks/voxel-chinese-architecture/solution/`

The scene was written from the task prompt alone; no archived candidate was read.

## What It Is

A voxel-built Chinese temple compound rendered with three.js. Every element is a unit cube accumulated per colour and emitted as one `InstancedMesh` per colour, so roughly 47,000 voxels collapse into ~104 draw calls.

- **Ensemble:** main hall (double-eaved wudian roof, tallest platform), east and west side halls (xieshan), mountain gate at the south entrance, bell tower and drum tower (cuanjian), and a seven-storey pagoda behind the main hall.
- **Layout:** strict mid-axis symmetry; mountain gate → imperial way and checkered courtyard → main hall → pagoda yard; side halls flank the main hall, bell/drum towers flank the courtyard, corner towers sit on the perimeter wall.
- **Classical form:** layered roofs that step inward with a drip-tile eave ring, upturned corner blocks, ridge and finial ornaments, dougong brackets under every eave, red walls, glazed-gold and grey tile roofs, wood-coloured beams, lattice doors and windows.
- **Details:** lanterns with warm point lights, stone lions at the gate, a bronze incense burner, pines, water basins, paving and grass with per-tile colour variation.
- **Lighting:** dusk directional sun with 2048² shadow map, sky/ground hemisphere fill, cool counter-fill, two warm point lights under the eaves.

## Verification

| Command | Result |
| --- | --- |
| `npm install` | completed |
| `npm run build` | succeeded: `dist/index.html` 0.7 kB, `index-*.css` 0.7 kB, `index-*.js` 499.6 kB |
| `npx vite --port 5205 --strictPort` | dev server returned 200 and rendered the scene |

Browser verification (Kimi Browser Extension, real Chrome, focus emulation enabled, 1440×900):

- First frame already shows the whole compound: perimeter wall, mountain gate with stone lions, courtyard, both side halls, bell and drum towers, double-eaved main hall and the pagoda.
- Orbit and zoom checked from the default three-quarter view, a low axis-aligned elevation, and a rear view toward the pagoda; nothing clips the ground, the perimeter stays intact from every angle.
- Renderer stats at the default view: 104 draw calls, ~640,000 triangles, 2 geometries, 105 instanced meshes.
- Voxel budget per part (console log): site 14,642 / wall 3,512 / props 1,967 / main hall 18,944 / side halls 2,228 each / gate 2,735 / bell and drum towers 1,123 each / pagoda 4,701.

## Known Limitations

- The bell and drum towers read as compact pavilions; their second storey is shallow at voxel scale, so the bell and drum are suggested rather than fully modelled interiors.
- Roof tile bands use two close golds to avoid a striped look; at extreme zoom the alternating groove pattern is still visible.
- No animation: the scene is a static diorama by design (the prompt asks for an immediately visible ensemble, not motion).
- three.js is bundled whole, so the build prints Vite's 500 kB chunk warning.

## Human Intervention

None.
