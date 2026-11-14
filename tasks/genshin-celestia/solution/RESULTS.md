# Results

- Model: `gpt-6.1-terra`
- Candidate ID: `gpt-6.1-terra`
- Reasoning: `max`
- Speed: `fast`
- Harness: Codex CLI (`codex` v0.169.0)
- Starting baseline: `f0b766a5c2fde437b4dae88afc6606c2aa8b0a18`

## Verification

- `npm install` — passed; 24 packages installed, 0 vulnerabilities reported.
- `npm run build` — passed; `tsc` and `vite build` completed successfully. Vite emitted a chunk-size warning for the Three.js bundle.
- `npm run dev -- --host 127.0.0.1` — passed; loaded `http://127.0.0.1:5173/` in Google Chrome on Windows. The default view rendered the full central rock, sanctum, outer ring, bridges, clouds, and armillary. A pointer drag rotated the OrbitControls camera successfully.
- `npm run preview -- --host 127.0.0.1` — passed; loaded `http://127.0.0.1:4173/` in the same Chrome session and observed the production scene render.

Browser acceptance used the local desktop Google Chrome window (the available screenshot was approximately 1708×887; it was not resized by the harness to 1440×900). No visible asset-loading or runtime error appeared during the observed runs. The scene is procedural, so it has no network asset failure mode; the default camera is intentionally a distant three-quarter shot and the page contains no gameplay or UI.

## Limitations and intervention

The geometry is stylized procedural low-poly art rather than a 1:1 game asset reconstruction. Fine stone textures, true volumetric clouds, and a distant Teyvat terrain mesh are approximated with generated materials and meshes. No human intervention was required.

No subagents, other models, model fallback, or external model APIs were used. The model switch was confirmed in Codex CLI with `/model gpt-6.1-terra --reasoning=max --speed=fast`. Development and preview servers were stopped after browser verification and the Chrome acceptance tab was closed. `node_modules`, `dist`, temporary scripts, and caches were removed before delivery.
