# cs-pvp-diorama — claude-opus-5.5 candidate

- Model: `anthropic/claude-opus-5-5` (ZCode agent), candidate id `claude-opus-5.5`
- Starting `main` commit: `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1` (`docs: align task records with archive layout`), the same baseline as the archived glm-5.3-flash cs-pvp-diorama candidate. `main` was at `eac83c1` when the run finished; `git diff 8409ab9 eac83c1 -- tasks/cs-pvp-diorama AGENTS.md` is empty, so the task text and rules are identical.
- Isolated clone: `.runs/cs-pvp-diorama/claude-opus-5.5` (`git clone --no-local --single-branch --branch main --no-tags`, detached at the baseline, origin removed).

## What was built

A single-page three.js (r170) + Vite (6.3.5) diorama, all geometry and textures procedural (canvas textures, a 4×4 decal atlas; no external assets):

- 64 m square grey concrete plinth; T spawn north (−z) on a raised plateau with ramp, CT spawn south (+z), A warehouse north-west, B guard house north-east, mid door wall on the centre axis, left alley (west) and right deck/high-platform flank (east), sewer from under the T ramp to the CT flank.
- The props, interiors, and lights listed in `task.md`: half-open rattling roller shutter, loft and ladder, five-tier racks, a thick pillar, a red-lit back room, a mid double door with firing slits and booths, a rusty grated drain, a guard house with a broken fluorescent tube, a fire escape and balcony, a warm street lamp, a police van with alternating lights, a sweeping searchlight, and poles and wires.
- Toon shading (4-step gradient) plus a screen-space outline pass (depth Laplacian + normal edges), ACES tone mapping, and baked shadow maps.
- Dynamics: GPU rain streaks with per-drop floor heights, splashes, edge drips, and vent steam; a Reflector wet-ground plane with puddle mask and ripples; glass/wall rain streaks; flickering/humming lights; lightning with sky bolts.
- OrbitControls: drag to rotate, wheel to zoom (distance 14–150), right-drag to pan (target clamped to the plinth). No UI or on-screen text.

## Verification actually run

All commands below were run in the clone's `tasks/cs-pvp-diorama/solution/`, using Node v24.21.0 (fnm) invoked by absolute path.

| Command / check | Result |
| --- | --- |
| `npm install` | installed three 0.170.0, vite 6.3.5; `package-lock.json` generated |
| `node node_modules/vite/bin/vite.js build` | ✓ 34 modules, `dist/assets/index-*.js` 624.44 kB (gzip 166.81 kB); only the >500 kB chunk-size warning |
| `vite preview --port 4187 --strictPort` | served at `http://localhost:4187/`; `<title>` checked with curl |

Browser checks used kimi-webbridge (user's Chrome, CDP device metrics 1440×900, dsf 1, focus emulation, a console/error collector installed via `Page.addScriptToEvaluateOnNewDocument`):

- The page loads with `document.body.dataset.ready === '1'`, 18 shader programs, and zero console errors or unhandled rejections across all reloads and checks.
- Screenshots were taken of the default overview and close-ups of A, mid, B, CT, and T spawn, then analysed with a luminance/hue grid script. The first pass was far too dark (median luminance 0.035). Hemisphere and moon intensity, exposure, fog, sky, and local-light gain were raised, and the moon/hemisphere tint was desaturated. The final close-ups average RGB ≈ 51–84, with warm lamp pools visible at T spawn and B.
- Trusted CDP `Input.dispatchMouseEvent` drag rotated the camera from (52, 64, 72) to (−59.4, 52.1, 75.6) at a constant distance of 107.9. Wheel zoom moved from 107.9 to 50.0 and clamped at 14.
- `__diorama.step(1200, 1/30)` (40 s of scene time): the searchlight target moved, all 8 point lights modulated, lightning fired (hemisphere peak 13.2 vs base 5.5), and no errors were logged.
- Two screenshots 0.15 s apart differ in 9.1% of pixels (11.4% in the ground half), from rain, splashes, and ripples.
- Performance: `__diorama.bench(40)` gave 10.93 ms/frame at 1440×900. The foreground rAF rate was 56.3 fps.

## Known limitations

- Visual review was done through a script-generated ASCII luminance/hue map of the screenshots, because the image viewer available to the agent did not display them inline. Fine details (outline crispness, individual decals, reflection quality) were checked structurally, not by eye.
- Screenshots from the browser capture show a ~5 px bright rim at the frame edge even with the canvas hidden, so it is a capture artifact and not rendered by the app.
- The browser's own zoom may give a devicePixelRatio slightly off 1.0. The renderer caps the pixel ratio at 1.5.
- The JS bundle is a single 624 kB chunk (three.js included); no code splitting.
- Shadows are baked once at startup, so the rattling shutter and sweeping searchlight head do not update their shadows.

## Human intervention

- User instruction: work in an isolated local clone following the repository rules, use no subagents or other models, and do the visual acceptance yourself with kimi-webbridge. There was no other intervention; no code was supplied by the user.
