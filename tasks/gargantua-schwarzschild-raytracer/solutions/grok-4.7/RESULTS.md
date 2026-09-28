# Results

- Model: Grok 4.7
- Branch: `llm/gargantua-schwarzschild-raytracer/grok-4.7`
- Starting `main` commit: `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`

## Commands

Run from `tasks/gargantua-schwarzschild-raytracer/solution/`.

| Command | Exit | Result |
| --- | --- | --- |
| `npm install` | 0 | Installed 65 packages. Lockfile written. npm warned that esbuild's install script was outside `allowScripts`; the esbuild binary was still present and the Vite build used it. |
| `npm run build` | 0 | Vite 7.3.6 production build succeeded. Final output: `dist/index.html`, `dist/assets/index-CxgrtOIK.css` (4.22 kB), `dist/assets/index-CgB7hJ0P.js` (801.91 kB). |
| `npm run preview` | running, then stopped | Served the production build at `http://127.0.0.1:4173/`. The process was stopped after browser checks. |

The first build failed because `three.module.js` imports `./three.core.js`. That file was added to `vendor/` and the rebuild succeeded. The final `npm run build` is the one recorded above.

## Browser checks

Browser: Cursor embedded Chrome. No shader-error banner appeared. An error listener installed with `Page.addScriptToEvaluateOnNewDocument` recorded an empty list on the capture URL, the invalid-query URL, reload, reset, and the mobile load.

Desktop viewport `1440 × 900`, device scale factor 1:

- Base URL reached `document.documentElement.dataset.gargantuaReady = "true"`. Canvas backing store was `1440 × 900`.
- Default view shows a dark event horizon, a bright photon ring, the near disk, and the lensed far-side disk below the hole. Stars are visible and concentrated along the lensed rim. Debug view 2 is a white horizon disk with a cyan critical ring. Debug view 3 shows primary crossings in red and secondary crossings in green.
- `window.__GARGANTUA__.setQuality('ultra')`, `setPreset(9)`, `setDebug(-1)`, and `setTime(-2)` each returned `null` and did not throw.
- `setDebug(6)` switched the live diagnostic. Digit `4` set debug view 4. `Q` cycled quality from high to cinematic.
- Quality budgets change the frame cost. On the zenith capture view, two animation frames measured about 15.8 ms at `standard` and 32.9 ms at `cinematic`.
- Capture URL `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`: ready, HUD absent, `getState()` reported `quality: "high"`, `preset: 0`, `debug: 0`, `hud: 0`, `time: 12.5`, `playing: false`, `capture: true`. Resource timing showed no requests outside `127.0.0.1`.
- Invalid URL `?quality=banana&preset=99&debug=20&hud=5&time=-8` fell back to high quality, preset 0, debug 0, HUD shown, and time 0. The page stayed up.
- Zenith preset (`preset=1`, polar 8°, distance 22, FOV 55) is a face-on circular disk, distinct from the inclined equator view.
- Changing exposure to `-0.4`, debug to 4, and quality to cinematic was written to `localStorage` key `gargantua-state-v1` and survived a reload. `R` restored high quality, debug 0, preset 0, exposure `-1.05`, and bloom strength `0.16`.
- `WEBGL_lose_context`: after `loseContext()`, `getState().contextLost` was true, time stayed `3`, and the recovery banner was visible. After `restoreContext()`, `contextLost` returned to false, `gargantuaReady` stayed `"true"`, preset/time survived, and a framebuffer sample at `(400, 500)` was `[180, 180, 193]` rather than black.

Framebuffer samples on the `1440 × 900` canvas were non-black at the right and bottom edges (about `[180, 190, 200]` on the zenith view). The scene covers the canvas.

Mobile viewport `390 × 844`, device scale factor 2, storage cleared first:

- `innerWidth` 390, `devicePixelRatio` 2, canvas buffer `585 × 1266` (mobile DPR cap 1.5).
- Ready became true. Default quality was `standard`. HUD started collapsed, with a single “控制” button.
- Opening that button showed the drawer: 21 sliders and 4 presets. The error list stayed empty.

## Known limitations

- The default composite is cool and pale. Gravitational redshift and Doppler beaming are computed in the shader and are explicit in debug view 4; they are subtle in the beauty pass because the inner disk is already near white.
- Turbulence reads as streaks rather than sharp convective cells.
- No ambient audio, so `M` is not bound.
- `capture=1` ignores saved settings so screenshots stay repeatable. Other URLs still let `localStorage` fill any field the query does not set.
- The preview server was a local static server. No remote texture, font, or script request was observed.
