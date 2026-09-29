# Qinglan Temple / 青岚寺

A self-contained Three.js voxel courtyard with seven buildings: a double-eaved golden main hall, two mirrored side halls, a rear hall, the mountain gate, and twin bell/drum towers. Architecture, tiled roofs, brackets, columns, carved-looking stone lions, trees, lotus ponds, bridges and paving are generated locally from instanced boxes. No external models, images, fonts, credentials or backend are required.

## Run

Requires Node.js 22.12+ or 24+, npm, and a browser with WebGL 2.

```bash
npm ci
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173/`. The complete ensemble appears immediately after synchronous scene generation. Drag to orbit, scroll or pinch to zoom, and use the icon controls for resetting the full view, the plan view, automatic orbit, and dusk lighting. The same scene automatically fits portrait screens. Automatic orbit is off initially.

## Verify and Build

```bash
npm test
npm run build
npm run preview -- --port 4173
```

Open `http://127.0.0.1:4173/` for the production build. Stop the development or preview server with Ctrl+C after verification. The build output is `dist/`; serve it with any static HTTP server. Opening source HTML with `file://` is not supported because it uses ES modules.

For the repository gallery's path-prefixed hosting:

```bash
npm run build -- --base=/voxel-chinese-architecture/gpt-6.1-sol/
```

The candidate's focused tests check hierarchy, symmetry, roof profiles, deterministic valid instance geometry and the unobstructed gate opening. They are supplementary candidate tests, not shared evaluation tests. Visual acceptance still requires the browser.

## Structure

- `src/temple.js`: deterministic voxel construction and scene layout.
- `src/main.js`: Three.js renderer, lighting, responsive orthographic camera and OrbitControls.
- `src/style.css`: restrained responsive overlay.
- `tests/temple.test.js`: scene invariants.
- `RESULTS.md`: baseline, actual verification results, limitations and browser evidence.

`window.__temple.stats()` provides read-only renderer diagnostics and sampled framebuffer colors for runtime acceptance. It does not replace visual review. The scene uses two instanced box meshes and five locally generated text plaques. The world is static; only camera movement and light changes are interactive.
