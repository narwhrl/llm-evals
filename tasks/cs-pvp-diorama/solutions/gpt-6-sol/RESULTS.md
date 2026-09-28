# CS PVP Diorama Candidate Result

- Model: OpenAI `gpt-6-sol`
- Candidate branch: `llm/cs-pvp-diorama/gpt-6-sol`
- Starting `main` commit: `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- Runtime: browser-based Three.js scene; no credentials or external assets.

## Run

From `tasks/cs-pvp-diorama/solution/`:

```sh
npm ci
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173/`. Drag to orbit, use the wheel or touch pinch to zoom. The scene intentionally contains no visible interface.

## Verification Performed

| Command or scenario | Observed result |
| --- | --- |
| `npm ci --offline --no-audit --no-fund` | Passed after stopping the Vite server, which had held the Windows `esbuild.exe` file open; installed 16 packages from the lockfile. |
| `npm run build` | Passed; Vite transformed 11 modules and generated `dist/index.html`. |
| `npm run build -- --base=/cs-pvp-diorama/gpt-6-sol/` | Passed after the clean install and final edits; confirms gallery path-prefix compatibility. Vite reported a non-fatal 500 kB chunk-size warning for the Three.js bundle. |
| `npm run dev -- --port 5173 --strictPort` | Served successfully at `http://localhost:5173/`. |
| `npm run verify:browser` | Passed in Chrome at 1440 x 900 and 390 x 844: one canvas, no visible UI text, no page errors or failed resources, nonblank screenshots, visible orbit and zoom responses. |

The final browser pixel check found scene-colored pixels in 24.16% of the desktop screenshot and 14.49% of the mobile screenshot. A drag changed 20.56% of sampled pixels; a wheel zoom changed 36.05%. Manual review of initial, rotated, and zoomed screenshots confirmed the full square base in the initial view, the A warehouse and B signal office, north and south spawns, central gates, side routes, elevated positions, cover, rain, and interior props. The mobile initial view keeps the base in frame.

An initial sandboxed `npm install --offline` could not access npm's cache. The first sandboxed build could not spawn esbuild. Both completed when rerun with the required environment permissions. The first version of the browser check timed out while two WebGL pages ran concurrently; the final script checks them serially and passes.

## Known Limitations

- The sewer route is represented by two recessed grate entrances; the tunnel interior is not exposed in this cutaway model.
- The two largest puddles use live planar reflection. Smaller puddles use glossy shading and animated ripple rings.
- Water runoff is represented by roof-edge drips and rain streaks; detailed surface rivulets are simplified.
- Browser verification requires a locally installed Chrome. The scene itself has no browser automation dependency at runtime.

No human intervention is needed to run the application after installing its dependencies.
