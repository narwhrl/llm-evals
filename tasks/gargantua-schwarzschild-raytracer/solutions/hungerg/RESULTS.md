# GARGANTUA — Verification Results

## Run identity

- Model identifier: `hungerg`
- Harness: ZCode Desktop
- Actual browser client: Chrome `156.0.0.0` on Windows 10, driven through `ego-browser` v2.2.1
- Browser renderer: `ANGLE (Intel, Intel(R) Arc(TM) 140T GPU (48GB) (0x0007D51) Direct3D11 vs_5_0 ps_5_0, D3D11)`
- Starting `main` commit SHA: `1d1fcb9e1d745cca9a36285df78555dede277136`
- Isolated run: `C:/Users/narwhrl/workspace/llm-runs/gargantua-schwarzschild-raytracer/hungerg`

## Commands actually run

All commands below ran from the isolated run. Project commands ran from `tasks/gargantua-schwarzschild-raytracer/solution/`.

| Command | Observed result |
| --- | --- |
| `pwd && cd /c/Users/narwhrl/workspace/llm-runs/gargantua-schwarzschild-raytracer/hungerg && pwd && git rev-parse HEAD` | Confirmed the requested isolated directory; SHA `1d1fcb9e1d745cca9a36285df78555dede277136`. |
| `npm install --no-audit --no-fund` | Exit `0`; installed the pinned React, React DOM, Three.js, and Vite dependencies. npm warned that the esbuild postinstall was not covered by `allowScripts`; the installed binary worked. |
| `npm install --save-dev @vitejs/plugin-react@4.3.4 --no-audit --no-fund` | Exit `0`; added the React plugin and updated `package-lock.json`. |
| `cp node_modules/three/build/three.module.js vendor/three.module.js` and `cp node_modules/three/examples/jsm/controls/OrbitControls.js vendor/addons/controls/OrbitControls.js` | Exit `0`; vendored the exact ESM files used by the source. |
| `cmp vendor/three.module.js node_modules/three/build/three.module.js` and the equivalent addon comparison | Exit `0`; vendored files match installed Three.js `0.170.0`. |
| `grep -RInE 'https?://\|fetch(\|XMLHttpRequest\|WebSocket' src index.html vite.config.js` | No runtime remote references found. |
| `npm run build` | Exit `0`; final production build transformed 36 modules and emitted `dist/index.html`, CSS, and JS. Final JS: `666.48 kB` (`178.73 kB` gzip). |
| `npm ci --no-audit --no-fund && npm run build` | First attempts failed with Windows `EPERM` while unlinking `esbuild.exe` and Rollup native binaries. Root cause was lingering Vite preview/esbuild child processes. After stopping those processes, `npm ci` exited `0` with 63 packages and the following production build exited `0`. No source or lockfile change was needed. |
| `npm run preview -- --port 4173` | Started the production static preview at `http://127.0.0.1:4173/`; stopped after verification. |
| `ego-browser skill` | Printed the installed v2.2.1 guide, ending with `[ego-browser:skill] end of guide`. |
| `ego-browser nodejs` browser scripts | Ran the desktop, mobile, capture, control, debug, persistence, and context-recovery checks summarized below. |

## Verification matrix

Only checks actually executed and observed are marked passed.

| Check | Result | Evidence |
| --- | --- | --- |
| Production build | **Passed** | Final `npm run build` exit `0`. |
| Static preview path | **Passed** | Production `dist/` served by `npm run preview`; page reached `gargantuaReady="true"`. |
| Desktop visual acceptance | **Passed** | Chrome at `1440×900`, DPR `1`; full black hole, front/back disk, secondary disk image, photon ring, lensed sky, and visible bloom observed. HUD stayed on the left and did not cover the central critical structure. |
| Mobile layout and touch | **Passed (emulated)** | Chrome at `390×844`, DPR `3`; bottom drawer collapsed by default and expanded correctly. CDP touch drag changed azimuth `0.58 → 0.4008` and elevation `0.14 → 0.2117`, set preset to custom, and paused cinema. |
| Console errors | **Passed** | Final checks collected `Runtime.exceptionThrown`, error-level `Runtime.consoleAPICalled`, and error-level `Log.entryAdded`; none found. |
| Deterministic capture URL | **Passed** | Two clean loads of `?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0` produced identical canvas PNG SHA-256 `8ef18f950f9afeccbe65c99b75dc1f9e805df060d20ba3d2bc4d42c8c95a476f`. HUD node count was `0`; only same-origin JS/CSS requests appeared. |
| URL validation | **Passed** | `quality=banana&preset=99&debug=99&hud=maybe&time=-5` safely fell back to `high`, preset `0`, debug `0`, HUD on, and time `0`; page remained ready. |
| Public automation API | **Passed** | `ready`, `getState`, `getDiagnostics`, `setQuality`, `setPreset`, `setDebug`, and `setTime` worked. Invalid quality, preset, debug, negative time, and infinite time returned rejection objects without unhandled exceptions or state changes. |
| Quality budgets | **Passed** | At `1440×900`, DPR `1`: Standard `892×558`, 420 steps; High `1180×738`, 760 steps; Cinematic `1440×900`, 1200 steps. Source also changes bloom scale, blur samples, and DPR caps. |
| Four viewpoints | **Passed** | All four preset cameras differed and produced four distinct framebuffer checksums. `Shift+2` selected Face-on in the keyboard check. |
| 21 live parameters | **Passed** | 20 image/camera controls each changed the framebuffer checksum when adjusted and restored. `timeScale=0` held simulation time constant for 500 ms; `timeScale=2` advanced simulation time by `1.201 s` over 600 ms. |
| Ten debug views | **Passed** | Debug `0`–`9` produced ten distinct framebuffer checksums in the final build. Disk-order, redshift/Doppler, HDR, and critical-impact views were also visually inspected. Diagnostic views bypass bloom so pre-tonemap HDR remains unobscured. |
| OrbitControls and cinema | **Passed** | Mouse drag changed azimuth/elevation; wheel changed distance `19 → 16.696`. Cinema time advanced while playing and froze after `Space`. Manual interaction paused cinema and retained camera control. |
| HUD, persistence, reset | **Passed** | `H` hid and restored the HUD. Quality, preset, debug, HUD, and exposure survived reload through `gargantua.state.v1`. `R` restored defaults. |
| WebGL context recovery | **Passed** | `WEBGL_lose_context` moved the page to `context="lost"`, `ready="false"`, and displayed the recovery notice. `restoreContext()` rebuilt renderer targets/materials/programs, returned to `context="live"`, preserved all parameters and frozen time `12.5`, and resumed rendering with no console errors. |
| Offline runtime surface | **Passed** | Source scan found no remote URLs, `fetch`, `XMLHttpRequest`, or WebSocket use. Browser resource entries contained only the same-origin built JS and CSS. |

## Known limitations

- Mobile acceptance used Chrome device emulation and CDP touch events, not a physical phone.
- GPU acceptance used one Chrome/ANGLE/Direct3D11 configuration. Other GPUs and browsers were not tested.
- The geodesic integrator has a finite adaptive step budget. Near-critical rays that exhaust the budget remain dark instead of integrating indefinitely.
- The disk uses curved-path plane crossings with a thickness-dependent optical-depth approximation, not full volumetric radiative transfer.
- The star field and Milky Way are procedural artistic models, not astronomical catalogs.
- No automated unit-test suite exists in this starter task; verification consisted of the production build and the browser scenarios above.
- Optional audio was not implemented.
- The renderer requires WebGL2-capable hardware.

## Human intervention

No intervention is required to install, build, preview, or use the delivered project. A physical mobile-device performance check and a broader GPU/browser sweep are recommended before a public production launch.
