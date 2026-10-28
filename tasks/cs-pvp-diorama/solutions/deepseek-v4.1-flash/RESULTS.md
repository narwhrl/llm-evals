# Result Report — cs-pvp-diorama / deepseek-v4.1-flash

## Model

- Complete model identifier: `deepseek-v4.1-flash` (candidate id `deepseek-v4.1-flash`; this session's harness model slug is `qoder-cn/dfmodel`).

## Baseline

- Starting `main` commit: `091c801b98342f2e778bd356e0c55b7372398541`
- Run location: isolated worktree `.worktrees/run-cs-pvp-deepseek` detached at that commit; implementation written only under `tasks/cs-pvp-diorama/solution/`.
- Fair-run note: from-zero re-run. Neither the previous `deepseek-v4.1-flash` candidate for this task nor any other model's archived candidate was opened while implementing.

## Shared inputs

- Prompt [`../task.md`](../task.md), round record [`../README.md`](../README.md). No starter code and no fixed executable tests exist for this task, so verification is build + real browser runtime, as the round record prescribes.

## Commands actually run

| Command | Result |
| --- | --- |
| `npm install --no-audit --no-fund` | Installed `three` + `vite`. npm warns that `esbuild@0.21.5`'s postinstall script is not covered by its `allowScripts` policy; the installed esbuild binary nevertheless works, as every following build shows. |
| `npm run build` (×4, after each fix) | Success each time; final `vite build` in 1.53s, 14 modules, `dist/assets/*.js` ≈558 kB (144 kB gzip — mostly Three.js), `dist/index.html` 0.42 kB. Vite warns about the >500 kB chunk. |
| `npm run dev -- --port 5181 --strictPort` | Ready in ~1.1s; used for browser verification, then terminated. |

Environment note (host, not project): `TMP`/`TEMP` must point inside the workspace, because esbuild's transpile step is denied permission to delete its file under the system temp directory. The dev-server watcher also needed `server.watch.ignored` for editor temp artefacts, which otherwise crash chokidar with `EBUSY` on Windows.

## Browser verification

Real Chrome tab (Kimi Browser Extension), viewport forced to the documented **1440 × 900** desktop size via CDP device metrics.

- **No UI, no people**: DOM probe returns only `CANVAS#scene` + the module script, `document.body.innerText` empty, 15 elements total. No humanoid geometry exists in the scene.
- **Square base, content contained**: a world-space bounding audit over every mesh traverses all eight corners of each geometry after `updateMatrixWorld`; with the fix below it reports **0 offenders** outside `|x|,|z| ≤ 31`, `y ∈ [-4.2, 12.5]`. Before the fix it had reported 18 offenders.
- **Opening framing**: solved numerically against the four base corners; at camera `(47, 36, 56)` → target `(0, 4.5, 0)` all corners project inside NDC with ≥6 % margin (`allInside: true`).
- **Orbit / zoom / pan**: real `PointerEvent` drag (`pointerdown` → 12 × `pointermove` → `pointerup`) rotated the camera 30.9° about the target; a `WheelEvent` reduced the orbit radius from 74.4 to 63.8. Interaction stays responsive with damping.
- **Cel look with sharp outlines**: measured ink coverage by rendering twice with the ink weight at 0 and 1 — 5.82 % of pixels darken by >12/255 and 1.12 % by >60/255, i.e. continuous lines along silhouettes, creases and occlusion breaks rather than uniform darkening.
- **Wet reflections**: the mirror target is sampled back (`readRenderTargetPixels`) at mean 64.7, so the planar reflection is genuinely being rendered and consumed by the street shader; puddle mask and scrolling ripple normal confine and distort it.
- **Dynamic effects**, driven over simulated frames:
  - police beacon cross-fades (red/blue material colours change),
  - searchlight sways (yaw 0.143 → 0.493 rad) with spot intensity modulating 739 → 659,
  - street lamp 154 → 100 and warehouse light 206 → 218 candela,
  - back-room red seep 0.91 → 0.50,
  - dead office tube over 20 s: 201 frames lit / 999 dark (strikes, not a steady on),
  - roller-shutter rattle reaches ±0.02 units,
  - lightning over ~66 s: 90 flash frames, peak normalised 0.87,
  - rain/drip uniforms advance and drive the vertex shaders.
- **Stability**: a 150-frame stress pass running lighting, lightning, rain, drips, steam, the mirror pass and the composite recorded **0 errors** (hooked `window.onerror` and `console.error`), and `gl.getError()` stays 0.
- **Performance**: after合批, 179 draw calls / 28,558 triangles per scene pass. Full pipeline (mirror + colour + normal + composite) measured 29.6 ms per frame worst case — mirror every frame — i.e. ≈34 FPS, and the shipped loop refreshes the mirror every second frame.

## Defects found and fixed during verification

All of these were reproduced through the acceptance path first, then confirmed fixed on the same path:

1. Composite pass produced a pure-black canvas: the full-screen quad sits exactly on the ortho camera's near plane and was frustum-culled → `frustumCulled = false`.
2. Composite still under-exposed: the intermediate target is sRGB-encoded, so the pass must decode on read and encode on write → added `<colorspace_fragment>`.
3. Whole scene near-black initially: lights were authored with legacy magnitudes while Three r155+ uses physical units → candela-scale practicals.
4. Geometry in the wrong place: `razorFence`, `catwalk` and `drainage` used `atan2(dx, dz)` while their decks are laid along local +X, so they ran perpendicular to their endpoints; base chamfer strips had width/depth swapped and overran the plinth. Fixed with a single `yawTo(dx, dz) = atan2(-dz, dx)` helper.
5. Guard booths positioned their glazing and consoles with world coordinates inside an already-translated group, throwing them ~17 units off.
6. "Half-open" buildings looked destroyed because openings were made by deleting an entire wall face; replaced with a real punched-opening wall builder (jambs, sill, lintel).
7. `~6` FPS: 1,249 individual meshes × three scene passes. Fixed by sharing palette material instances and merging static geometry; also replaced `MeshPhysicalMaterial` transmission glazing, which forces an extra full-scene render per frame, with a flat transparent cel material.

## Known limitations

- Review judgement came from screenshots plus programmatic probes driven by the same model that built the scene; a second human reviewer inspecting more orbit angles would still add value, which the round record's procedure anticipates.
- At close oblique range the compound reads dense; rooflines and catwalk decks can look like detached beams from low angles. The layout is legible from the documented overview and elevated angles, less so pressed against the ground.
- Outlines are post-processed from a normal+depth buffer, so very thin props (fence wires, ladder stiles) get soft rather than crisp ink, and lines thicken slightly at grazing distances.
- Reflections are a single planar pass at half resolution refreshed on alternate frames; fast camera moves show one frame of lag, and nothing above the street plane reflects off vertical wet surfaces.
- Shadows come from one directional light with a fixed 2048 map fitted to the base, so contact shadows soften towards the plinth edge.
- Water is stylised: the pool/street reflect and ripple, but there is no fluid simulation, foam shading or refraction.
- No automated tests ship with the task; correctness rests on the build plus the browser evidence above.

## Required human intervention

- None for the delivered functionality. On this host, re-running a build needs `TMP`/`TEMP` pointed at a writable directory (see environment note), and `npm` must be allowed to execute the esbuild binary.
