# Result Report — voxel-waterfall / swe-2

## Candidate

- Model: `magpie/devin/swe-2`
- Baseline `main` commit: `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`

## Verification actually run

| Command / check | Result |
|---|---|
| `npm install` | OK (react 19.2.0, three 0.180.0, vite 7.1.9) |
| `npm run build` | OK — vite build succeeded, dist emitted |
| `npm run preview -- --host 127.0.0.1 --port 4333` | served for visual acceptance |
| Headless screenshot (default load) | `evidence/01-overview.png` — 5 peaks, cloud deck with piercing, waterfall trace |
| Headless screenshot (mid view) | `evidence/02-quarters.png` — cloud band + mountains + forest |
| Headless screenshot (waterfall close) | `evidence/03-waterfall.png` — water channel, plunge foam, mist |
| `window.__voxels` count | 1,237,938 voxels (≫ 200×200 requirement) |
| `window.__voxelBuildMs` | 3.3 s to rebuild full field |
| Requirement checklist | mountain range w/ main+secondary peaks ✔; waterfall follows terrain into pool+river ✔; cloud deck with peaks piercing ✔; foothill vegetation ✔; dawn lighting + shadows ✔; ≥200×200 voxels ✔; React+Vite ✔; opens on full view ✔; adjustable options (water/clouds/snow/density) ✔ |

## Known limitations

- The waterfall is a surface channel rather than a free-falling cascade along most
  of its length; a steeper hero drop reads as a fall at the crest.
- Cloud voxels are chunky 2×2 columns — reads correctly at scene scale but clouds
  are not smooth wisps.
- Rebuild is synchronous (~3 s); toggling options blocks the UI briefly. Acceptable
  for a gallery piece.

## Human intervention required

None.
