# Candidate results: blackhole-hero-react/gpt-6.1-sol

## Identity and isolation

- Complete model identifier: `new-provider/gpt-6.1-sol`.
- Candidate ID: `gpt-6.1-sol`.
- Pinned starting `main` commit: `3b8d6817086aebaad6f7850226ab50f88f5ca01b` (`docs: add blackhole hero react evaluation task`).
- The original shared task was uncommitted when this run started. It was first committed on `main`, including the byte-preserved starter, before any implementation was generated.
- Isolated clone: `.runs/blackhole-hero-react/gpt-6.1-sol`, created with `--no-local --single-branch --branch main --no-tags`, detached at the pinned baseline, with `origin` removed.
- Candidate worktree: `.worktree/blackhole-hero-gpt61`, attached to the isolated clone on `run/blackhole-hero-react/gpt-6.1-sol`. The permanent repository checkout remained on `main`; no other candidate solutions were available in the clone.
- All implementation, installation, builds, and verification ran under the worktree's `tasks/blackhole-hero-react/solution/`.
- No subagents or alternative implementation/review models were used. Browser control and screenshot review used Kimi WebBridge locally; the implementing model itself inspected the PNGs.
- Human intervention: zero mid-task prompts, corrections, or manual browser operations. The existing authenticated browser extension and deployment session were available.

## Implementation and source fidelity

React 19.3.0, Vite 8.3.2, TypeScript 7.0.2, Tailwind CSS 4.3.3, and exact dependency versions are locked in `package-lock.json`. The application has matching TypeScript/Vite `@/` aliases, `components.json`, global CSS, a black fallback background, and the supplied demo. No Three.js, image/icon library, remote fonts, API, state manager, or context provider was added.

`node evidence/source-fidelity.mjs` passed:

- `src/demo.tsx` is byte-identical to `starter/demo.tsx`.
- The public props and destructured default values are unchanged.
- All six GLSL strings are unchanged after normalizing CRLF/LF for comparison: vertex, scene, temporal blend, bright extraction, Gaussian blur, and composite.
- Shared task/starter files were not changed during candidate generation.

Necessary component edits, reproduced before fixing:

1. **Static prop updates and pause.** The supplied component checked reduced motion only once and had no render trigger after React updated its props. At a 390 × 844 viewport with reduced motion, its uniforms stayed at desktop `uFocus=[0.72,0.54]`, `uSteps=300`, and `uScrimDir=1` while the text used the mobile layout. The supplied paused loop also continued drawing: at a fixed `uTime=2.674902`, frame count advanced from 280 to 628 and canvas hashes differed. A small effect-to-render callback now redraws/resizes for actual prop changes, uses the same 16-pass still settling, cancels animation while paused/reduced, and resumes the existing simulation clock. Live reduced-motion preference changes are observed. Final pause and reduced-motion screenshots are byte-identical across the observation interval.
2. **Visibility.** Intersection state and document visibility are combined instead of allowing a `visibilitychange` event to mark an offscreen component visible. The real offscreen fixture remained suspended even after the visibility event, and resumed when scrolled into view.
3. **Context restoration.** The first forced-loss test restored the context and displayed the canvas, but frame count remained 209 and `gl.getError()` returned `1282`. Restored contexts reset enabled extensions. Target format/extension setup is now rerun, invalid old target references are cleared, and the original programs/targets are rebuilt. The final forced-loss test hid the canvas, retained copy, restored rendering to 1168 frames, and reported `gl.getError()=0` with no shader errors.
4. Removed the two supplied `any` casts for typed WebGL extension constants. No shader compatibility rewrite was necessary on the tested WebGL 1 and WebGL 2 implementations.

The demo layout, all original copy, both `href="#"` links, responsive parameters, software-renderer quality settings, and render/post-processing stages were retained. An empty local data favicon prevents an unrelated automatic `/favicon.ico` 404.

## Commands actually executed

Commands below were executed against `solution/` (the terminal used `npm --prefix <absolute-solution-path>`). Exit status 0 unless noted.

| Command | Observed result |
| --- | --- |
| `npm install --package-lock-only` | Created the exact lockfile; audited 44 packages; 0 vulnerabilities. |
| `npm ci` | Final clean installation added 43 packages, audited 44 packages, 0 vulnerabilities. |
| `npm run typecheck` | Real `tsc --noEmit`, strict mode, source/config and fixture TypeScript included; no diagnostics. |
| `npm run build` | Vite production build; 17 modules; final HTML 0.62 kB, CSS 12.57 kB, JavaScript 247.89 kB (79.61 kB gzip). |
| `MSYS_NO_PATHCONV=1 npm run build -- --base=/blackhole-hero-react/eval/ --outDir=dist-subpath` | Production build passed; HTML 0.67 kB; asset requests verified under the exact prefix. |
| `npm run build -- --config=evidence/vite.fixture.config.ts --outDir=dist-fixture` | Separate real-component production fixture; 16 modules; not included in normal gallery build. |
| `npm audit --audit-level=low` | 0 vulnerabilities. This is a dependency advisory check, not a full security audit. |
| `node evidence/source-fidelity.mjs` | Six shader hashes, public API, defaults, and demo comparison passed. |
| `npm run preview -- --port 4176 --strictPort` | Served root production output at `http://127.0.0.1:4176/`. |
| `MSYS_NO_PATHCONV=1 npm run preview -- --port 4177 --strictPort --base=/blackhole-hero-react/eval/ --outDir=dist-subpath` | Served subpath production output. |
| `npm run preview -- --port 4178 --strictPort --outDir=dist-fixture` | Served isolated lifecycle fixture. |
| `PROBE_IDENTIFIER=1 node evidence/verify-browser.mjs` | Final run exited 0; 28/28 recorded browser checks passed. |

### Failures, retries, and environment distinctions

- The initial subpath build invocation without `MSYS_NO_PATHCONV=1` exited 0 but was **not valid evidence**: Git Bash rewrote the argument to `--base=C:/Program Files/Git/blackhole-hero-react/eval/`, and Vite warned that `base` should start with a slash. It was rerun with the correct URL prefix, then verified in the browser.
- `git diff --cached --check` on the original shared starter reported CRLF bytes as trailing whitespace because the task explicitly disables line-ending conversion. The original prompt's SHA-256 remained `cbce3834209a4cbaadc6e667c228f61a74286c84866e153d4cbd2a4d70f61584`; no starter bytes were normalized to silence this warning.
- The first browser regression exited 1 with 22/26 passing entries; raw evidence is in `evidence/browser-results-first-pass.json`. The real context-restoration failure also prevented subsequent motion resumption. Two additional reported failures were verification assumptions: successful `dataset.webgl` is the empty string, not `"ready"`, and the actual media-query viewport can be fractional under Windows scaling. These observations were corrected in the local verification script, not by weakening fixed tests (none were supplied).
- At requested width 767, this browser exposes `innerWidth=767` but `visualViewport.width=767.3333129882812`; `(max-width: 767px)` therefore correctly returns false. The original media query was not changed. Explicit 766 and 768 checks confirm both sides of the breakpoint; 390 and 1440 checks confirm the required exact evaluation viewports.
- A repeated `npm ci` while Vite preview was running failed with `EPERM` / errno `-4048` while unlinking `lightningcss.win32-x64-msvc.node`. Windows native modules were in use. Only this run's preview processes were stopped, then the exact clean install and all builds passed without elevated permissions.
- One browser regression was interrupted by a local curl timeout (`curl exited null`), preserved in `evidence/browser-results-timeout.json`. The extension remained connected. Focus emulation plus bringing the owned task tab forward restored timely execution; the full regression was rerun successfully.
- A one-line source comparison initially failed because shell quoting removed a regular-expression escape; the checked-in `source-fidelity.mjs` replaces that one-off and passed. A fixture config initially emitted a future native-config-loader import-extension warning; its `.ts` import was made explicit and later builds had no such warning.

## Browser and runtime evidence

- Browser: Chrome `153.0.0.0`, Windows 10.0 (host Windows 11), using the existing real browser via Kimi WebBridge daemon/extension 2.0.22.
- Renderer: `ANGLE (Intel, Intel(R) Arc(TM) 140T GPU (48GB) (0x00007D51) Direct3D11 vs_5_0 ps_5_0, D3D11)`.
- Primary context: WebGL 2.0, OpenGL ES 3.0 Chromium, half-float HDR targets.
- Device pixel ratio: `1.0000000298023224` under emulation, effectively 1. Desktop canvas 1440 × 720 / scene 1008 × 504; mobile canvas 390 × 776 / scene 234 × 466. The desktop 720px and mobile 92svh heights are the original demo behavior, not a new full-height layout.
- The raw final record is `evidence/browser-results.json`; instrumentation and exact executed browser steps are committed beside it.
- The probe observes the real renderer and installs no replacement canvas/image. PNG capture hid only the extension-injected `#kimi-webbridge-agent-visuals` operator border; application DOM and rendering were unchanged.

Verified scenarios:

1. Root and prefixed production HTML, JavaScript, and CSS load with HTTP 200, no remote runtime assets, no shader compilation errors, no unhandled exceptions, and `gl.getError()=0`.
2. Desktop → mobile → desktop resize, both scrim directions, focus/FOV/steps/resolution updates, canvas size changes, and no horizontal overflow. Additional 766/767/768 observations are recorded with actual media-query state.
3. Live gas animation: sampled framebuffer hashes changed from `1646993667` at simulation time `2.6583` to `730901792` at `4.2251`.
4. Pause, paused prop updates, and resumption. Paused observations both reported 460 frames and simulation time `6.8584`; the actual page screenshot SHA-256 was identical (`f9d7a0fdd1b33261c10a194c7a1809bb66489757b4682cd7624ca07409d3f1ad`).
5. Reduced motion at initial mobile load, reduced-motion viewport swaps, and live preference enable/disable. Frozen observations both had 1201 frames, the same simulation time, and identical PNG SHA-256.
6. Unsupported WebGL was injected only in the test tab; actual app fallback hid the canvas and retained title and links with no exception.
7. Forced WebGL 1 mode compiled and rendered the unchanged GLSL pipeline. An additional disabled-HDR-extension test exercised the real 8-bit packed fallback (`uEncode=1`, `uDecode=1`, `uPack=0.12`).
8. `WEBGL_lose_context` loss/restoration, offscreen rendering suspension, visibility event handling, StrictMode effect cleanup, unmount cleanup, children and DOM attribute/event forwarding.

## Self visual acceptance

The implementing model read all four actual production PNGs directly, with no visual-review subagent:

- `01-desktop.png` — 1440 × 900, root output: **pass**. Title, paragraph and both pill links are left-aligned and readable; the right side contains a clearly visible dark shadow, bright diagonal accretion disc, upper/lower bent disc images, and halo. No text overlap, blank canvas, or clipped black-hole shadow.
- `02-mobile.png` — 390 × 844, resized root output: **pass**. All copy/links fit above the scene; the black-hole shadow remains whole in the lower frame with both lensed arcs visible. The broad outer gas intentionally extends to the horizontal canvas edges, matching the supplied demo; the shadow is not cut off.
- `03-subpath-desktop.png` and `04-subpath-mobile.png` — identical viewport sizes, prefixed output: **pass**, matching composition and readable copy, not an asset-loading fallback.

The backgrounds below the original Hero's minimum height are intentionally black. Screenshots are normal animated production frames, not reduced-motion captures, a static substitute, or a screenshot-specific higher-quality render.

## Known limitations and unverified environments

- The two original links have no business destinations; no extra pages were invented.
- Mobile evidence is a real Chrome page with a 390 × 844 emulated viewport and DPR 1, not a physical mobile device. Safari, Firefox, other GPUs, physical high-DPR mobile performance, and actual operating-system tab occlusion were not independently tested.
- The supplied software-renderer fallback remains unchanged but was not exercised on a real software GPU; all acceptance screenshots use the same Intel hardware renderer. Do not treat these as equivalent to screenshots from SwiftShader.
- There are no supplied fixed executable tests. The checked-in browser harness covers observed acceptance behavior but is not a universal GPU performance or scientific-accuracy certification.
- A public gallery deployment is performed by the curator after the immutable candidate commit; deployment receipts belong on the task branch and do not modify this source tree.

## Local verification cleanup

The local verification tab was closed with Kimi WebBridge `close_tab`, and focus emulation was disabled. All three owned preview servers (4176, 4177, 4178) were stopped, including their Windows child processes. The task's screenshot files and verification records are committed; no `node_modules`, generated build outputs, or transient request bodies are included.
