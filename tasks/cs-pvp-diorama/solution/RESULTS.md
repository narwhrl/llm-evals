# CS PVP Diorama — Result Report

- **Model identifier:** `magpie/minimax-code/MiniMax-M3.1-Flash:max`
- **Harness:** ZCode
- **Starting commit (baseline):** `1d1fcb9e1d745cca9a36285df78555dede277136`
- **Implementation path:** `tasks/cs-pvp-diorama/solution/`

## What was built

A browser-rendered CS-style defusal map presented as a collectible miniature
diorama: one square concrete slab, a rainy freight yard at night, cel shaded
with crisp ink outlines, no UI and no characters. Drag orbits, the wheel
zooms, right-drag pans; the target is clamped so the model cannot be lost.

Scene content: T spawn (raised yard, barbed wire, box truck, three stacked
containers, ramp with a breach in its side wall), A site (half-open warehouse,
half-rolled shutter, boarded plank windows, inward-opening side door, support
column, five-tier racking, forklift, sheet-metal mezzanine with iron ladder,
red glow behind the back door), mid lane (concrete flanks with high shooting
holes and flanking platforms, half-open iron gate, grated drain over standing
water, guard booths, low cover wall), B site (two-storey sheet-metal guard
house, fire escape to the balcony, painted bomb marking, sodium street lamp,
corner shortcut), CT spawn (barricades, shields, van with alternating beacon,
concrete platform with a searchlight, badge wall), plus the west service alley,
the east raised flank walkway, overhead power lines, wet floor, puddles, rain,
drips, steam and lightning.

Every texture, the environment map and the whole map are generated procedurally
at runtime, so the build ships no binary assets and nothing can 404.

## Commands actually run

All commands were run from `tasks/cs-pvp-diorama/solution/`.

| Command | Result |
| --- | --- |
| `npm install` | exit 0 — `three@0.187.0`, `vite@8.3.8` installed, `package-lock.json` written |
| `npm run build` | exit 0 — `dist/index.html` + `dist/assets/index-*.js` (671 kB, 171 kB gzip), built in ~0.2 s |
| `npm run build -- --base=/cs-pvp-diorama/minimax-m3.1-flash-max/ --outDir=dist-deploy-test --emptyOutDir` | exit 0 — gallery-style build with `--base`/`--outDir`/`--emptyOutDir` works; the temporary output directory was deleted afterwards |
| `npm run dev` | exit 0 — dev server on `http://127.0.0.1:5183/`, used for iteration, stopped at the end |
| `npm run preview` | exit 0 — production build served on `http://127.0.0.1:4183/`, used for the final browser checks, stopped at the end |

Browser verification was done with headless Chrome driven over CDP
(`Page.navigate`, `Runtime.evaluate`, `Input.dispatchMouseEvent`,
`Page.captureScreenshot`) against the **production build** at a
`1440 x 900` viewport.

Observed in the browser:

- Scene renders from a clean session, no UI elements in the DOM besides the
  canvas, no people in the scene.
- Console: no errors and no failed requests. The only messages were the Vite
  dev-server connect log during development and a
  `GPU stall due to ReadPixels` performance warning caused by the screenshot
  capture itself.
- Drag orbits the camera (camera position moved from `[28, 27, 30]` to
  `[35, 34.6, -1.4]` around the target) and the wheel zooms (distance 49 → 43).
- The diorama was inspected from the default three-quarter view, after an
  orbit to the opposite side, from a near top-down view, and at close range in
  the A site, B site, mid lane, T spawn and CT spawn.
- Frame rate on the GPU path (Intel Arc 140T, ANGLE/D3D11, 1418 x 802): median
  frame delta 6 ms, i.e. well above 60 fps.
- Scene cost: 67 draw calls, 37,740 triangles, 55 geometries, 47 textures,
  32 shader programs (static geometry is merged per material and the outlines
  are one merged inverted-hull mesh).

## Known limitations and things a human may want to change

- The model is deliberately **dark**. On a bright monitor the unlit floor of the
  A site interior and the west alley read close to black; raising the moon or
  hemisphere intensity in `src/lighting.js` is a one-line change.
- The lightning flash brightens the whole frame for roughly 0.3 s. During the
  flash the diorama reads noticeably bluer and brighter than the steady state.
- Reflections in the puddles are a single planar mirror pass (900 x 900) with a
  ripple distortion; they are convincing at grazing angles but do not show
  screen-space reflections of the rain streaks.
- The cel banding comes from a four-step gradient map on `MeshToonMaterial`.
  Surfaces that need a wet specular response (the drain water, the slab rim)
  use `MeshStandardMaterial`; the toon materials cannot receive an env map,
  because three's toon shader has no `envmap` chunk.
- The rain is a fixed set of 3,800 line segments in a box over the slab; very
  strong camera positions inside that box will show the streaks close up.
- No sound, no loading screen and no fallback message: if WebGL is missing the
  page stays blank, which was considered acceptable for a no-UI deliverable.
- The evaluation procedure mentions a `1440 x 900` desktop viewport; the scene
  was verified at exactly that size. The camera limit (`maxPolarAngle` 1.40 rad)
  stops slightly above the horizon so the slab is never seen from underneath.
