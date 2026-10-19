# Result Report — orbital-habitat-diorama / swe-2

- **Model**: `magpie/devin/swe-2` (candidate id `swe-2`)
- **Baseline `main` commit**: `63a46c3` (same pinned baseline as the rest of the round)
- **Solution path**: `tasks/orbital-habitat-diorama/solution/`
- **Stack**: Vite + Three.js (plain JS ES modules). No TypeScript in this task.

## Verification actually run

| Command / check | Result |
| --------------- | ------ |
| `npm ci` | clean install, no lockfile changes |
| `npm run build` | `dist/` built in ~0.7 s; one >500 kB chunk warning (three.js bundle) — cosmetic, not an error |
| `vite preview --host 127.0.0.1` | served dist at http://127.0.0.1:4330 |
| Browser render (WebBridge, 1440×900) | scene renders, no console errors observed |

### Visual acceptance (screenshots in `evidence/`)

- `01-day.png` — noon. Earth fills the main porthole and spills past the cabin
  silhouette; a hard circular sun-pool lands on the floor (the "blinding noon"
  beat). Warm interior strip lit.
- `02-night.png` — Earth night side: gold city-light webs across the dark
  landmasses, cool blue rim on the frame, cabin drops to warm lamps.
- `03-focus-workstation.png` — click on the desk eases the camera to zoom 2.1;
  laptop telemetry screen, plant rack droplets, photo board become legible.
- `04-night-cruise.png` — light-strip click dims the cabin (stripGlow → low
  blue) while the porthole Earth stays lit.
- `05-fast-forward.png` — porthole click toggles the 15 s cycle; earth/city
  lights visibly rotate.

### Interactions verified live via WebBridge `evaluate` + synthetic pointer events

- Focus-to-fixture (desk): camera eased to zoom 2.1 — **works**.
- Empty-space click releases focus — **works**.
- `state.t` scrub, `fast`, `nightCruise` flags all respond — **works**.
- Pen dodge on hover and spin-on-click are wired (`penState`), exercised via the
  same pointer path.

## Asset provenance

All textures are generated procedurally at runtime in `src/textures.js` on
HTML canvas — there are **no image files and no remote fetches**:

- `earthDayTexture` / `earthNightTexture` / `earthCloudTexture` — equirectangular
  2:1 maps: painted ocean gradient, continent polygons, polar caps, desert
  overlay; matching city-light clusters on the night map; radial cloud blobs.
- `hullWallTexture` — panel seams, rivet grids, scuffs, printed labels
  (`CAUTION`, `O₂`, `04`, `AIR`).
- `floorTexture` — diamond-plate grating + grime.
- `laptopScreenTexture` — dark telemetry UI with scrolling cyan curves and
  ALT/INC/VEL/ORBIT readouts.
- `noteTexture` / `photoTexture` / `fabricTexture` / `labelTexture` — sticky
  notes, polaroid photos, weave, and small printed labels.

Licensed material: none required — everything is generated in-house at runtime.

## Known limitations / deviations

- The cabin uses a flat apertured rear wall + arched silhouette + thin rim plate
  rather than a single continuous curved cylinder, because a true curved shell
  could not reliably open a real aperture for the porthole; the silhouette and
  end caps still read as a capsule section.
- The Earth is a genuine 3D sphere (day/night/cloud/atmo shells) sitting just
  outside the porthole on the shared centre axis, so it fills the window on the
  first view. The two small portholes look out onto night sky, not the same
  Earth — noted as a minor deviation.
- The porthole sun "shaft" is a SpotLight + additive floor pool decal rather
  than volumetric scattering; it produces the required bright circular pool.
- `npm run typecheck` is a no-op (`tsc` is not part of this plain-JS solution);
  build + render are the gate.

## Human intervention

None during implementation. Visual acceptance was performed by the candidate
itself via the WebBridge browser daemon (screenshots + in-page `evaluate`
probes), per the task's self-acceptance requirement.
