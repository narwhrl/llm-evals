# Results — voxel-chinese-architecture

## Identification

- **Model:** `magpie/minimax-code/MiniMax-M3.1-Flash` (MiniMax M3.1 Flash, served by the
  `magpie/minimax-code` provider).
- **Mode:** single model, no subagents, no other models consulted, no reference to any
  other candidate's source.
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
  (`docs: record gpt-6.1-sol blackhole hero import`).
- **Working copy:** local worktree
  `.worktrees/minimax-m3.1-flash/voxel-chinese-architecture` on branch
  `run/voxel-chinese-architecture/minimax-m3.1-flash`, created from that commit.

## What was built

A React + Vite + Three.js Chinese classical architecture complex in voxel style, laid
out on one north-south axis. Every block is generated in code; no image, model or font
is fetched at runtime.

- **Main hall (大殿)** — the largest building, on the axis at the north end, 46 × 26
  cells, raised on a 4.5-high stone platform with a balustrade and a flight of steps.
  Glazed green **hip-and-gable (歇山)** roof with a raised main ridge, ridge ornaments
  and hip ridges.
- **Side halls (配殿)** — two buildings mirrored across the axis at x = ±42, 26 × 18,
  with **hip (庑殿)** roofs.
- **Mountain gate (山门)** — at the south end of the axis, with an open passage through
  the middle, a lintel over it, a **hip** roof and a flight of steps. Its size is
  adjustable.
- **Pagoda (塔)** — four shrinking storeys, each with its own hip-and-gable roof and
  upturned eaves, capped by a **pyramidal (攒尖)** roof and a gold finial.
- **Bell-and-drum tower (钟鼓楼)** — a tall stone base with four corner columns, a
  balustrade, a drum and a hip-and-gable roof.
- **Enclosure** — a red perimeter wall with a tiled coping and a lowered gate bay,
  stone lions flanking the entrance, bronze censers and stone steles on the axis,
  hanging lanterns along the central path, four small corner pavilions, and clipped
  pines along the wall.
- **Ground** — a single plane with a procedurally drawn texture: a paved courtyard, the
  central axis path, aprons in front of the side halls, stone platforms and grass with
  drier and darker patches.
- **Light** — a gradient sky dome with a sun disc, a directional sun with shadows, a
  hemisphere fill and four presets (dawn, noon, dusk, night), plus fog and ACES tone
  mapping.

### How the roofs are generated

The roof is a height field, not a fixed shape. A hip roof is the intersection of four
half-spaces, which in a height field is the larger of the two slope distances; a
hip-and-gable roof applies the hip constraint only below the break line, so its upper
part ends in a vertical gable; a pyramidal roof has zero ridge length, so the slope is
the larger of the two distances in both directions. The flying eaves are a lift added
afterwards that falls off with the distance to the eave corner and fades as the roof
rises, so the eave line curves up towards the corner in visible steps.

## Verification actually run

All commands were executed in the candidate worktree; the results below are what was
observed.

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0, 77 packages, `package-lock.json` written |
| `npx tsc --noEmit` | exit 0, no diagnostics |
| `npm run build` | exit 0 — `dist/index.html` 0.82 kB, CSS 4.74 kB, JS 987.81 kB (266.94 kB gzip) |
| `npm run build -- --base=/voxel-chinese-architecture/example/ --outDir=dist-subpath` | exit 0 — `dist-subpath/index.html` references `/voxel-chinese-architecture/example/assets/…` |
| `npx vite --host 127.0.0.1 --port 5174` | dev server served the scene; used for the visual pass |
| static server over `dist/` and `dist-subpath/` | both paths returned HTTP 200 and rendered the scene |

Note on the subpath build: under Git Bash, `--base=/…` is rewritten by MSYS path
conversion into a Windows path. The build must be run with `MSYS_NO_PATHCONV=1` there.
The repository gallery builder invokes the same script through `cmd.exe`, where the
conversion does not apply.

### Browser checks (Chrome 153, ANGLE / Intel Arc 140T, WebGL 2.0)

| Check | Result |
| --- | --- |
| Dev server, 1440 × 900 | scene renders, no uncaught exception, no failed request |
| Production build at `/` | renders, 0 console errors, 0 page errors, 0 failed requests |
| Production build at `/voxel-chinese-architecture/example/` | renders, 0 console errors, 0 page errors, 0 failed requests |
| Production build at 390 × 844 | scene fills the viewport; the parameter panel starts collapsed so it does not cover the model |
| Console during the whole pass | clean |
| Frame rate | 120 FPS reported by the in-page counter at 1440 × 900 on this GPU |

Two real defects were found and fixed during the visual pass, both by reading the
rendered frames rather than the code:

1. The camera framings in the panel did nothing. The `presetIndex` prop was never passed
   from `App.tsx` into `World.tsx`, so the effect that applies a framing never ran.
   Fixed by threading the prop through and adding the effect.
2. A large black wedge covered the whole right-hand side of the complex. The pagoda
   passed its accumulated storey height as the `platform` of the next storey, so each
   tier drew a solid block from the ground and a flight of `round(platform)` steps —
   39 steps for the top tier. Fixed by building each storey at the origin and lifting it
   onto the tier below, and by suppressing the steps on the upper tiers.

## Visual review

Screenshots in [`evidence/`](evidence) were captured from the running build at
1440 × 900 and read back one by one.

- `01-axo.png` — the opening framing. The whole complex is in view: the mountain gate
  in the foreground on the axis, the paved courtyard with its lanterns, steles and
  pavilions, the two side halls mirrored left and right, the main hall closing the axis
  at the back, the pagoda on the right and the bell tower on the left, all inside the
  red wall. This is what the page opens on, with no interaction.
- `02-front.png` — the axial view down the courtyard towards the main hall, which is
  the clearest demonstration of the bilateral symmetry.
- `03-hall.png` — the close view of the main hall. Red walls, lattice windows, wooden
  columns on stone bases, the dougong brackets under the eave, the white stone
  balustrade, the steps up to the platform, the glazed green roof with its upturned
  corners and the gold ridge ornaments.
- `04-dusk.png` — the dusk preset. The sun drops behind the range, the sky and fog turn
  orange and the complex falls into warm shadow, which shows the light rig doing real
  work rather than tinting a flat image.
- `05-aerial.png` — the plan view, which shows the courtyard layout, the paths and the
  spacing between the buildings.

Checklist against the brief:

- at least five buildings with a clear hierarchy — main hall, two side halls, mountain
  gate, pagoda, bell-and-drum tower: six;
- the main hall is the largest and sits on the central axis — yes;
- the side halls are mirrored across the axis — yes;
- the mountain gate is at the front of the site — yes;
- one or two pagoda / bell-and-drum towers — one of each;
- spacing leaves room for the paths and the courtyard, and the route mountain gate →
  courtyard → main hall is legible — yes;
- the layout is bilaterally symmetric about the axis — yes;
- roofs use Chinese forms with flying eaves — hip, hip-and-gable, pyramidal and gable
  are all implemented, with upturned corners;
- structure shows dougong, columns and steps — yes;
- red walls, glazed green or grey tiles, wooden members — yes;
- doors, windows, lanterns and stone lions — yes;
- the ground is paved and grassy and meets the buildings — yes;
- a clear light source with shadows and layered light — yes, with dawn, noon, dusk and
  night presets;
- Three.js, a complete project that builds and runs — yes;
- the page opens straight into the scene with the whole complex visible — yes.

## Known limitations and failures

- The walls are red plaster with lattice windows, but the interior of the halls is
  empty. From the axial view you can see into the open passage of the mountain gate,
  which shows the dark interior.
- The roof is generated as a solid mass, so the underside of the overhang is a flat
  surface rather than rafters. The dougong brackets below it carry the detail.
- The grass is a single texture on a single plane rather than voxels, so the ground
  reads at a different fidelity from the buildings. The paving, the axis path and the
  courtyard are drawn into the same texture.
- The `buildTower` helper builds the tower body and then calls the generic hall
  builder, so the tower's platform and steps are emitted twice and overlap. It is not
  visible in any view, but it is redundant geometry.
- `npm install` reports that `esbuild`'s postinstall script was not run under npm
  11.19's `allowScripts` policy. The build and the dev server both work regardless,
  because the platform binary package supplies the executable.
- No texture, model or font is loaded from the network, so nothing in the project
  depends on a third-party asset licence.

## Human intervention required

None. The project installs, type-checks, builds, serves and runs unattended.
