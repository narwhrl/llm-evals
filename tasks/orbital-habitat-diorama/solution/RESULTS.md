# RESULTS — 轨道之家 · 空间站生活舱

## Identification

| | |
| --- | --- |
| Model | `magpie/minimax-code/MiniMax-M3.1-Flash` |
| Candidate id | `minimax-m3.1-flash` |
| Task | `orbital-habitat-diorama` |
| Baseline `main` commit | `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1` |
| Worktree | `.worktrees/minimax-m3.1-flash/orbital-habitat-diorama` (detached at the baseline) |
| Environment | Windows 11, Git Bash, Node 24.21.0, npm 11.19.0, Chromium 1243 (Playwright), WebGL 2.0 via ANGLE / Intel Arc 140T |

The implementation was written from scratch in that worktree. No other
candidate's code was read, and no other model was used.

## What was built

An isometric cut-away of a capsule module, drawn with Three.js and React.
The shell is cut open along its length, the cabin inside is furnished for one
person, and the Earth hangs outside the big porthole. There is no interface on
the page.

- `src/scene/capsule.ts` — the shell is one swept surface built from a profile, so the portholes are real holes in it rather than discs laid on top. The hole test is done in arc-length space, so the big window reaches over the shoulder and is still round. The cut edge of the hull shows the sandwich of skins and insulation; five ring stiffeners are swept along the same profile.
- `src/scene/props.ts` — the sleeping bay, the work station, the plant rack, the viewing seat, the exercise corner, the storage and the clutter, plus the five objects that drift in the air.
- `src/scene/earth.ts` — a 3D sphere with day, night and cloud maps, a day/night blend, a cloud layer, an atmosphere rim and a terminator glow.
- `src/scene/habitat.ts` — the orthographic camera, the orbit, the light and every interaction.
- `src/App.tsx` — the page and the `window.__HABITAT__` interface used by the acceptance harness.
- `tools/generate-assets.mjs` — the generator for every texture.

## Commands actually run

| Command | Result |
| --- | --- |
| `npm ci` | Exit 0. `found 0 vulnerabilities`. One npm 11 warning: the `esbuild@0.28.2` postinstall script is not in the `allowScripts` list. The platform binary package (`@esbuild/win32-x64`) is installed, so `vite build` works. |
| `npm run typecheck` (`tsc --noEmit`) | Exit 0, no diagnostics. |
| `npm run build` (`tsc --noEmit && vite build`) | Exit 0, built in about 1.0 s. `dist/index.html` 0.99 kB, `dist/assets/index-*.css` 0.28 kB, `dist/assets/index-*.js` 799.60 kB (217.37 kB gzip). `dist/assets/` holds the 14 textures beside the bundle. |
| `npx vite build --base=/gallery/orbital/ --outDir=dist-sub` | Exit 0. The emitted HTML references `/gallery/orbital/assets/index-*.js` and `/gallery/orbital/assets/index-*.css`; the textures are copied to `dist-sub/assets/`. |
| `node serve.mjs --root=dist --port=8241` | `GET /` → 200, `GET /assets/earth_day.png` → 200. |
| `node serve.mjs --root=<tmp> --port=8242` with the build mounted at `/gallery/orbital/` | `GET /gallery/orbital/` → 200, `GET /gallery/orbital/assets/earth_day.png` → 200. |
| `npm run assets` | Regenerates the 14 PNGs deterministically. |
| `npm run dev` (port 5184) | `GET /` → 200, `GET /assets/earth_day.png` → 200. |

## Browser acceptance

Driven with Playwright/Chromium 1243 at a 1440 × 900 viewport against the
**production build** served from `dist/` on `http://127.0.0.1:8241/`. Every
step used the real mouse. Result of the whole pass: **0 console errors, 0 page
errors, 0 failed requests**.

| Step | How it was driven | Observed |
| --- | --- | --- |
| First screen | Load | The module is seen from the standard isometric angle (azimuth 45°, elevation 33°), the wall and the whole floor are visible, and the Earth fills the big porthole. |
| Day | Phase set to 0.02 | `day: true`. The Earth shows its day side; three sharp sunlight patches lie on the floor, the round one through the big window. |
| Night | Phase set to 0.6 | `day: false`. The Earth shows its night side with a network of golden city lights; the cabin falls back on the warm strip, the reading lamp, the screen and the indicator lamps. |
| Click to focus | Clicked the work station at the screen position of the desk | `focus: "Work station"`. The camera eased in over 2.2 s. |
| Back to the overview | Clicked the empty floor | `focus: null`. |
| Night cruise | Clicked the light strip in the floor | `nightCruise: true`. The main lighting went out and the module sank into blue black, with the reading lamp, the screen, the grow lamp and the Earth's light left. |
| Grow lamp | Clicked the lamp on the plant rack | `plantLight: false`, then `plantLight: true` on the second click. The corner darkened and came back. |
| Floating pen | Moved the pointer over the pen, then clicked it | The pen moved 7 px away from the cursor, and `penSpin` was 0.62 after the click, so it spun. |
| Fast forward | Clicked the big porthole | `fastForward: true`, and the orbit ran at 15 s a turn. |
| Scrub the orbit | Pressed on the porthole and dragged 160 px | The phase went from 0.981 to 0.654 and the fast-forward stayed on, so a drag scrubs and does not toggle. |
| Orbit and zoom | Dragged the module, then used the wheel | The view direction changed from `(-0.557, -0.616, -0.557)` to `(-0.04, -0.791, -0.61)` and the camera moved from `(22.54, 25.63, 21.24)` to `(1.85, 32.66, 23.35)`. The rotation is clamped so the cabin stays visible. |
| Resize | Viewport set to 1024 × 768 | The canvas followed: CSS 1024 × 768, drawing buffer 1024 × 768. No errors. |
| WebGL context loss | `WEBGL_lose_context.loseContext()`, then `restoreContext()` | The `webglcontextlost` event fired and the render loop paused. **The browser never restored the context in this headless build**, so the recovery path could not be observed end to end. See the limitations below. |

## Evidence

`solution/evidence/` holds the five stills required by the task, all captured
from the production build at 1440 × 900:

| File | What it shows |
| --- | --- |
| `01-day.png` | The first screen, the Earth's day side, the sunlight patches on the floor. |
| `02-night.png` | The first screen, the Earth's night side with the city lights. |
| `03-focus-workstation.png` | The camera focused on the work station: the laptop screen with the orbit telemetry, the drawings and the stencilled wall labels. |
| `04-night-cruise.png` | Night cruise: the main lighting off, the module in blue black. |
| `05-fast-forward.png` | Fast forward: the sunlight sweeping across the cabin. |

## Assets

Every texture is generated by this project's own generator,
`tools/generate-assets.mjs`, and written to `public/assets/`. Nothing is
fetched at runtime and no third-party artwork is used.

| File | Size | How it is made |
| --- | --- | --- |
| `earth_day.png` | 1024 × 512 | Continents from 3D value noise sampled on the sphere, so the map wraps without a seam and the poles do not smear. Ocean, shelf, ice caps, a height tint. |
| `earth_night.png` | 1024 × 512 | The same continents, nearly black, with city lights: a clustered field, a ridged noise for the network between the towns, and bright cores for the big cities. |
| `earth_clouds.png` | 1024 × 512 | A separate cloud layer, sampled on the sphere and drifting slowly. |
| `wall_panels.png` | 1024 × 1024 | Enamel plate: panel seams, rivet rows, scratches, grime, a caution stripe and stencilled labels (`04`, `O₂`, `CAUTION`, `NO STEP`, `MODULE B`, `LIFE SUPPORT`). |
| `floor_grate.png` | 512 × 512 | The grating bars and the holes between them. |
| `fabric_bag.png`, `fabric_towel.png` | 512², 256² | Woven cloth, warp and weft. |
| `desk_top.png` | 512² | The desk laminate. |
| `memo_board.png` | 512² | Photographs and a handwritten note. |
| `book_pages.png` | 512 × 384 | Open pages with lines of type. |
| `net.png` | 256² | The mesh of the storage pockets, with alpha. |
| `leaf.png` | 256² | A leaf blade with its vein, with alpha. |
| `blueprint.png` | 512² | A section drawing with a dimension line and a title block. |
| `cable_wrap.png` | 256² | The wrap on the cable runs. |

Licence: the textures and the code are the candidate's own work. The
dependencies are `three@0.186.1`, `react@19.2.9`, `react-dom@19.2.9`,
`vite@7.3.7`, `typescript@5.9.3` and their build-time companions, all pinned
in `package-lock.json`; Three.js and React are MIT licensed.

## Known limitations and failures

1. **The two small portholes do not show the Earth.** The task asks for the
   same planet to be visible through them from another angle. With the
   orthographic camera the task also requires, the view rays are parallel, so
   the ray through the big window and the ray through a small window 3.05 m away
   never meet: one sphere cannot be inside both cones unless its radius is
   larger than 1.5 m, and a sphere that large would fill the big window and
   stick out of the module. The small windows therefore look at space, which
   is what an orbital module at 400 km would show. The first-screen
   requirement — the Earth framed by the big porthole as the centre of the
   picture — was given priority.
2. **The cabin is 2.16 m deep, not 4 m.** The task gives the module as about
   8 × 4 m. The module is 8 m long and 2.5 m to the crown, but the floor is
   only 2.16 m deep: the shell is a wall and a shoulder rather than a full
   half-capsule. A deeper room pushed the camera further back and made the
   floor a large empty area, so the shallower section was kept.
3. **The context loss could not be recovered in this environment.** The
   application pauses the render loop when the context is lost and resumes
   when the context comes back, and it also watches for a silent restore. The
   headless Chromium build used here never restored the context, so the
   recovery was not observed. No claim is made about it.
4. **The city lights are procedural.** They read as a network of golden
   clusters across the continents, but they are generated, not taken from
   real night imagery, and they do not match any particular place on Earth.
5. **The Earth's continents are invented.** The day and night maps share one
   set of continents so the blend is clean, but those continents are noise,
   not Earth.
6. **The text on the textures is legible only when the camera is close.** At
   the full view one metre is about 47 pixels, so the stencilled wall labels
   are a few pixels tall. They are readable in the focus shot
   (`03-focus-workstation.png`), which is where the requirement can be met.

## Human intervention needed

None. The build, the static server and every interaction work from the
committed sources. The only thing that needs a person is a machine with a
browser that can restore a lost WebGL context, to confirm the recovery path
described in limitation 3.
