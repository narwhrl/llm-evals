# Candidate result — GARGANTUA

- **Complete model identifier:** `gpt-6-sol`
- **Candidate branch:** `llm/gargantua-schwarzschild-raytracer/gpt-6-sol`
- **Starting `main` commit:** `ee2c9f2cc8b9b410ebd55d1c195e96a9cdbd4ce3`
- **Implementation path:** `tasks/gargantua-schwarzschild-raytracer/solution/`

## Commands actually run

| Command | Observed result |
| --- | --- |
| `npm install --no-audit --no-fund` | Exit 1: host npm had `offline=true`; registry metadata was not available in its cache (`ENOTCACHED`). No source defect. |
| `npm install --no-audit --no-fund --offline=false --fetch-retries=0 --fetch-timeout=20000` | Exit 0 after network permission; 18 packages installed. npm warned that the esbuild postinstall script was not covered by its install-script policy. |
| `npm run build` (ordinary sandbox) | Exit 1: local esbuild binary launch was denied with `spawn EPERM`. No compile error was reported. |
| `npm run build` (authorized local binary execution) | Exit 0; Vite 7.3.6 transformed 33 modules. Final app bundle is about 768 kB before gzip (about 206 kB gzip); Vite's >500 kB chunk warning is nonfatal. Repeated successfully after code changes. |
| `npm run preview -- --port 4173 --strictPort` | Exit 1: port was already occupied. |
| `npm run preview -- --port 44123 --strictPort` | Started static production preview at `http://127.0.0.1:44123/`; browser tests below used this server. Stopped after testing. |
| `node --input-type=module -e "…state URL validation…"` | Exit 0: verified 21 control definitions, valid and invalid capture URL parsing, and portrait preset framing. |
| `npm run build -- --base=/gargantua-schwarzschild-raytracer/gpt-6-sol/ --outDir=dist/gallery-test` | Exit 0; gallery path-prefix build generated prefixed asset URLs. |

## Browser acceptance observed

- Chrome static preview opened to a visible scene without a stuck overlay. At native `1920×945` and the requested `1440×900` viewport, the black capture region, narrow critical ring, bent upper/lower disk images, secondary disk detail, and lensed procedural stars were visible. The `1440×900` visual check used Chrome's tab screenshot path; the separate accessibility screenshot path clipped the WebGL layer during viewport emulation even though the tab screenshot rendered the entire canvas.
- At `390×844`, Standard quality showed the full critical boundary and the mobile preset bar; **Open controls** revealed a scrollable drawer containing all 21 sliders and debug buttons. Browser viewport emulation reported DPR 1. DPR 2 and physical touch input could not be set by the available browser control, so those paths were reviewed in source but not runtime-credited.
- The exact `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` contract reached `data-gargantua-ready="true"`. Two repeat captures at the same mobile viewport yielded identical screenshot bytes (FNV-1a hash `c75716b7` both times).
- At `1440×900`, all 40 combinations of `preset=0`–`3` and `debug=0`–`9` with fixed time reached ready. Their 40 screenshot hashes were distinct. The browser console returned no errors or warnings for this matrix. Debug view 3 visibly separated first and secondary disk crossings; debug view 2 showed the circular capture mask.
- Invalid capture values (`quality=bogus&preset=99&debug=-1&time=-2&hud=maybe`) recovered to High, preset 0, debug 0, time 0, and visible HUD without an exception.
- Dragging changed azimuth/elevation and paused the cinematic loop; wheel input changed camera distance. Exposure changed through its slider; camera and exposure changes survived reload. `3`, `Shift+2`, `Q`, `Space`, `H`, and `R` were exercised through browser input and changed the indicated HUD state. Reset returned camera, exposure, debug, and quality to defaults. The full set of four preset and ten debug outputs was exercised through the capture matrix.
- The diagnostic **Test WebGL recovery** button called the browser's `WEBGL_lose_context` extension. A clean browser tab showed the lost-context status, then returned to ready with a visible scene, preserved preset, and no console errors. An earlier iteration incorrectly reported a stale WebGL `1282` error after restoring; this was fixed before the clean-tab pass.
- The DOM loaded only same-origin bundled JavaScript and CSS assets. Runtime source imports local vendored Three.js and has no asset fetches or remote URLs. An actual network-disabled browser session was not run.

## Known limits and human intervention

- The browser control's page evaluation runs in a read-only isolated scope, so the `window.__GARGANTUA__` methods could not be invoked directly through it. Their setter paths were exercised through the matching HUD controls; invalid-input behavior was reviewed in code. Direct API automation remains a useful follow-up.
- DPR 2 and touch gestures were not available in the browser emulation capability. Resize math and OrbitControls touch support are implemented, but those exact device conditions remain unverified here.
- The browser may render slowly at Cinematic quality on weaker GPUs; no broad hardware performance study was run. The app caps internal pixels and exposes lower budgets.
- Human intervention needed for implementation: none. The local install and build needed sandbox permission to fetch pinned packages and launch esbuild; this was granted automatically during the run.
