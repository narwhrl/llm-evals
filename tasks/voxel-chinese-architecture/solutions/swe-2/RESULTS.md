# Result Report — voxel-chinese-architecture / swe-2

## Candidate

- Model: `magpie/devin/swe-2`
- Baseline `main` commit: `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`

## Verification actually run

| Command / check | Result |
|---|---|
| `npm install` | OK (three 0.180.0, vite 7.1.9) |
| `npm run build` | OK — vite build succeeded, dist emitted |
| `npm run preview -- --host 127.0.0.1 --port 4332` | served for visual acceptance |
| Headless browser screenshot (overview) | `evidence/01-overview.png` — 6+ buildings readable, axial layout visible |
| Headless browser screenshot (quarter view) | `evidence/02-quarter.png` — all buildings + compound |
| Headless browser screenshot (main-hall close-up) | `evidence/03-main-hall.png` — dougong course, eaves, red walls, platform |
| `window.__voxels` count | 31,342 voxels |
| Requirement checklist | ≥5 buildings (gate + main + 2 side halls + pagoda + bell tower) ✔; axis gate→courtyard→main hall ✔; flying eaves/dougong/columns/steps ✔; red walls + glazed teal/gold roofs ✔; paved courtyard + grass ✔; sun + shadows + dawn tone ✔; opens on full view ✔ |

## Known limitations

- Door/window openings are voxel gaps (no inset joinery), consistent with the voxel idiom.
- Dougong are stylized three-tier bracket voxels, not full interlocking sets — reads
  correctly at scene scale.
- From the default camera the pagoda partially overlaps the main hall roofline;
  orbiting resolves the overlap. Deliberate trade-off for a single establishing frame.

## Human intervention required

None.
