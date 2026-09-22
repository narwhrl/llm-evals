# Results

- Model: `xai/grok-4.7`
- Baseline `main`: `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- Branch: `llm/voxel-chinese-architecture/grok-4.7`
- Human intervention: none

## Commands

### `npm install --no-audit --no-fund`

Exit 0. Added 15 packages in 14s.

npm warned that the `esbuild` install script was not covered by `allowScripts`. The esbuild binary was present after install, and the production build below completed.

### `npm run build`

Exit 0. Vite 6.4.3 transformed 12 modules and finished in 661ms.

```text
dist/index.html                   0.42 kB │ gzip:   0.28 kB
dist/assets/index-C_r1YwIO.css    0.13 kB │ gzip:   0.13 kB
dist/assets/index-DBKc4i2p.js   510.18 kB │ gzip: 130.21 kB
```

Vite warned that the JavaScript chunk is larger than 500 kB. The build still exited 0. `dist/index.html` was written.

An earlier `npm run build` during framing also exited 0 (585ms). The output above is the build of the delivered source.

### `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort`

First launch: Vite ready in 272ms at `http://127.0.0.1:5173/`. That process later stopped accepting connections while the camera was being adjusted (`curl` exit 7).

Second launch: Vite ready in 274ms at the same URL. This is the server used for the browser check below.

After verification the process tree was stopped with `taskkill`. A following request to `http://127.0.0.1:5173/` failed to connect (HTTP status `000`). No dev server was left running.

## Browser

`http://127.0.0.1:5173/` with the viewport overridden to 1440×900 and device scale factor 1.

Observed:

- `window.innerWidth` × `window.innerHeight`, the canvas CSS size, and the canvas buffer were all 1440×900.
- `gl.getError()` was 0.
- One load wrapped `console.error`, `console.warn`, and `window` `error`. The collected list was empty. That wrapper was removed before the final build.
- After `OrbitControls.update()`, the camera position was `[-24, 80, -112]` and the target was `[0, 14, 58]`, the same values as the authored opening frame. Drag and scroll are available after that frame; they did not move it.

The opening view shows the axial courtyard without input:

- Mountain gate at the south entrance, facing the camera: stone steps, central passage, red piers, wood columns, lanterns, and a grey xieshan roof with upturned corners.
- Stone path from the foreground, up the gate steps, through the passage, across the paved front court, to the main-hall steps.
- Main hall, the largest mass on the axis: double-eave gold hip roof, red walls, wood columns, central door, and lanterns.
- Matching side halls east and west, smaller, with grey roofs.
- Two pagodas east and west of the rear court, shorter than the main hall, with stacked eaves and a pointed finial. The east pagoda is clear. The west pagoda’s upper stories and finial read above the west side hall.
- Rear cloister wall closing the north side.
- Grass meeting stone plinths, with the court and path paved.
- Warm directional sun, cool fill, and a dusk sky/fog. Shadows fall to the east and read on grass, paving, plinths, and walls.
- No overlay on the canvas.

A separate Node check of the voxel volume reported 0 mirror mismatches, 210954 voxels, and roof peaks of hall 46, pagoda 36, gate 30, and side hall 25.

## Limitations

- The stone lions are simplified voxel guardians. They read as a mirrored pair beside the path, not as sculpted animals.
- In the opening three-quarter view the west pagoda is partly behind the west side hall. Its stacked eaves and finial remain visible; the east pagoda is unobstructed.
- Lawn outside the courtyard footprint is a few large boxes on the shared unit cube and grass material, so the horizon stays continuous. Courtyard paving, plinths, and buildings are voxel-meshed.
- The lantern glow pulses slowly. The scene is readable with that pulse ignored.
- Vite’s chunk-size warning is from bundling Three.js in one file.
