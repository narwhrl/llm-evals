# Little Railway Town

A tabletop miniature railway town built with Three.js. The whole scene is one
handmade-looking diorama on a thick wooden display base: a closed railway loop
around a small town, a river with two railway viaducts and a road bridge, a
station, buildings, trees, roads and street lamps. A locomotive and two coaches
run the loop and stop at the station on every arrival.

The page opens directly into the complete board, in a warm evening with cast
shadows, with the train already running.

## Requirements

- Node.js 18+ and npm
- A browser with WebGL2 (a GPU is recommended for smooth animation)

No backend, credentials, external assets or network services are needed. Every
texture (wood, grass, water, tiles, stone, building facades, signs, lamp glow)
is generated at runtime with a 2D canvas.

## Install and run

```bash
npm install
npm run dev
```

Open <http://127.0.0.1:5173/>.

Production build and local preview:

```bash
npm run build
npm run preview
```

Open <http://127.0.0.1:4173/>. The build output is `dist/`, with relative asset
paths (`base: './'`), so it can also be served from a subpath of any static
file server.

Syntax/static check:

```bash
npm run check
```

## Controls

| Control | Behavior |
| --- | --- |
| `Pause` / `Run` | Stops or resumes the train. While paused, the cars and the station dwell timer both freeze. |
| `Speed` slider | 2–22 world units per second (default 8, shown as a multiplier). |
| `Night` / `Day` | Toggles a moonlit state: station, street lamps, coach windows and a random subset of building windows glow. The scene stays readable. |
| `Reset` | Restores the initial camera and target, the initial train position, default speed, day/evening lighting, and the running state. |
| Drag on the scene | Orbit / rotate the view. |
| Scroll on the scene | Zoom in and out. |

The train stops for about two seconds at the station on each lap. The station
is on the near arc of the loop; the status label in the control panel shows
`Running`, `Paused` or `At station`.

## How the train moves

The track is a closed, arc-length-parameterised `CatmullRomCurve3`. Each of the
three vehicles is positioned at its own distance behind the locomotive
(`0`, `3.9` and `7.8` units), sampled with `getPointAt`, and oriented from the
local tangent (including the gentle rise over the two viaducts). Spacing stays
constant along the curve and each car keeps its own heading through bends; the
train is never rotated as one rigid body. Wheels spin with travelled distance.

## Project layout

```
index.html            page and control panel
src/main.js           renderer, camera, lighting, day/night, controls, run loop
src/layout.js         track curve, river, terrain height, roads, clearances
src/world.js          base, terrain, river, track, bridges, roads, buildings, trees, lamps
src/train.js          locomotive, two coaches, per-car motion
src/textures.js       procedural canvas textures and building facades
src/utils.js          ribbon mesh, rounded boxes, roofs, glow sprites, helpers
src/style.css         control panel and page background
```

`window.__diorama` exposes read-only state and `info()` for diagnostics.
