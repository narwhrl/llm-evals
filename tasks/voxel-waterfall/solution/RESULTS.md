# Results — voxel-waterfall

## Identification

- **Model:** `magpie/minimax-code/MiniMax-M3.1-Flash` (MiniMax M3.1 Flash, served by the
  `magpie/minimax-code` provider).
- **Mode:** single model, no subagents, no other models consulted, no reference to any
  other candidate's source.
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`
  (`docs: record gpt-6.1-sol blackhole hero import`).
- **Working copy:** local worktree
  `.worktrees/minimax-m3.1-flash/voxel-waterfall` on branch
  `run/voxel-waterfall/minimax-m3.1-flash`, created from that commit.

## What was built

A React + Vite + Three.js voxel landscape. The whole scene is generated at runtime from
an integer seed; no image, model, font or audio file is fetched at runtime.

- **Terrain** — a 224 × 224 voxel height field (50,176 voxels) built from five
  hand-placed massing points plus ridged fractal noise, quantised to whole voxels. The
  main summit sits off centre with four secondary masses around it, and the massing
  fades towards the border so the diorama keeps a low plain frame. Only the visible
  shell is meshed: one top face per cell plus a side face wherever a neighbour sits
  lower, with per-corner ambient occlusion on the tops and a vertical gradient down the
  cliffs. UVs are in world units, so one texture tile is one block.
- **Waterfalls** — a Dijkstra cost-to-outlet field over the height field gives the price
  of the cheapest walk to the plain. Each stream is routed along that field, which
  guarantees it reaches the foot of the mountain and keeps it on the steepest short
  line, i.e. where the cliffs are. A cliff is then cut into the flank where the stream
  has already dropped 45 % of the way, and the falling sheet is built from the real
  height difference between two route cells: a 25-block drop in the ground becomes a
  25-block fall. Plunge pools, ripples, spray and rising mist sit at the base of each
  fall.
- **Clouds** — a deck that only forms where the ground rises into the layer, so it
  wraps the mountain flanks and leaves the valley floor clear. Puffs are clusters of
  overlapping boxes, drifting with a seamless sway.
- **Vegetation** — broadleaf and conifer trees, boulders, ground cover and flowers,
  planted from the height field so nothing grows on cliffs or in the water.
- **Light** — a gradient sky dome with a sun disc, a directional sun with shadows, a
  hemisphere fill and five presets (dawn, morning, noon, dusk, moonlit night), plus
  fog, ACES tone mapping and a vignette.
- **Controls** — a parameter panel for grid size, summit height, ridge sharpness, snow
  line, tree line, number of falls, cloud coverage and altitude, five lighting presets,
  fog density, shadows, auto-rotate and four camera framings.

## Verification actually run

All commands were executed in the candidate worktree; the results below are what was
observed.

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | exit 0, 77 packages, `package-lock.json` written |
| `npx tsc --noEmit` | exit 0, no diagnostics |
| `npm run build` | exit 0 — `dist/index.html` 0.49 kB, CSS 6.04 kB, JS 776.65 kB (210.62 kB gzip) |
| `npm run build -- --base=/voxel-waterfall/example/ --outDir=dist-subpath` | exit 0 — `dist-subpath/index.html` references `/voxel-waterfall/example/assets/…` |
| `npx vite --host 127.0.0.1 --port 5173` | dev server served the scene; used for the visual pass |
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
| Production build at `/voxel-waterfall/example/` | renders, 0 console errors, 0 page errors, 0 failed requests |
| Production build at 390 × 844 | scene fills the viewport; the parameter panel collapses to a bottom sheet so it does not cover the landscape |
| Console during the whole pass | only a `favicon.ico` 404, which was removed by inlining an SVG favicon; after that the console is clean |
| Frame rate | 120 FPS reported by the in-page counter at 1440 × 900 on this GPU |

Two real defects were found and fixed during the visual pass, both by reading the
rendered frames rather than the code:

1. Every quad was emitted with four vertices and no index buffer, so only one of the two
   triangles per face was drawn. The whole scene rendered as a field of loose shards.
   Fixed by generating an index buffer in `scene/voxel.ts` and routing the terrain
   builder through the same emitter.
2. The Dijkstra distance field was stored in a `Float32Array` while the costs are
   float64. The float32 store rounded the cost up, so the relaxation test kept
   re-pushing the same cell and the heap grew without bound (`RangeError: Invalid
   array length`). Fixed by using a `Float64Array`.

## Visual review

Screenshots in [`evidence/`](evidence) were captured from the running build at
1440 × 900 and read back one by one.

- `01-panorama.png` — the opening framing. The main summit with its snow cap is the
  clear focus, secondary peaks step down to the right, the cloud deck wraps the waist
  and the summit breaks through it, forest covers the lower slopes, and the nearest
  fall drops from the cliff into a plunge pool at the foot. This is the shot the page
  opens on, with no interaction.
- `02-waterfall.png` — the "waterfall" camera preset, standing downstream of the lip.
  The sheet of water is wide enough to read as a waterfall rather than a ribbon, the
  cliff face behind it carries the voxel steps, and the treeline gives the scale.
- `03-dawn.png` — the dawn preset. The summit catches warm light while the valley
  stays in cool shadow, and the horizon and fog turn orange, confirming the lighting
  rig is doing real work rather than tinting a flat image.

Checklist against the brief:

- mountain with a main peak and several secondary peaks, natural ridge-and-valley
  silhouette — yes;
- one or more falls running down the surface from high on the mountain to the foot —
  yes, three by default, each routed over a real cliff;
- cloud around the waist with summits poking through and correct front/back occlusion
  — yes;
- vegetation at the foot and natural light, including dawn and dusk tones — yes;
- Three.js, a complete project that builds and runs — yes;
- a reasonable voxel count for a smooth frame — 224 × 224 = 50,176 voxels, ~843k
  triangles, 120 FPS on this machine;
- enough options to adjust the scene — 13 parameters plus 4 camera framings and 5
  lighting presets;
- at least 200 × 200 voxels — 224 × 224;
- the page opens straight into the scene with the whole diorama visible — yes;
- React + Vite — yes.

## Known limitations and failures

- The fog is exponential, so the far edge of the diorama fades into the horizon colour.
  This is intended, but it does soften the border of the terrain bed.
- The cloud deck is a layer of hard-edged voxel boxes. That is consistent with the
  blocky style, but it does not read as volumetric cloud; the deck is also a single
  horizontal sheet rather than a multi-level one.
- The tree canopies are built from a small number of overlapping boxes, so individual
  trees are simple at very close range.
- `npm install` reports that `esbuild`'s postinstall script was not run under npm
  11.19's `allowScripts` policy. The build and the dev server both work regardless,
  because the platform binary package supplies the executable.
- No texture, model or font is loaded from the network, so nothing in the project
  depends on a third-party asset licence.

## Human intervention required

None. The project installs, type-checks, builds, serves and runs unattended.
