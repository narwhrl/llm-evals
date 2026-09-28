# Candidate result — GARGANTUA

- Complete model identifier: **gpt-6-astra**.
- Starting main commit: **830739e3c4aade4b7ee072c121860b7a9ee87b7e**.
- Branch: `llm/gargantua-schwarzschild-raytracer/gpt-6-astra`.
- Worktree: `.worktrees/gargantua-schwarzschild-raytracer/gpt-6-astra`.
- Evaluation date: 2026-09-23, Asia/Shanghai.
- Environment: Windows, Node.js 24.21.0, npm 11.19.0, Chrome 153.0.8010.53.
- All candidate changes are inside the canonical `solution/` directory. No other candidate implementation was read or imported. Shared task inputs were unchanged.

## Observed outcome

Production build and all **9 Node tests passed**. The final production-browser harness recorded **39 passing checks, 0 failing checks, 1 explicitly unverified touch/pinch item**. Real browser mouse drag and wheel input were separately verified. WebGL context loss and restoration passed with preserved state and a nonblack restored image.

Visual acceptance used **40 desktop captures** (four presets × ten debug modes, 1440 × 900) and **12 mobile captures** (four presets × three quality profiles, 390 × 844 CSS pixels, actual DPR 2). Additional desktop quality, desktop HUD and mobile drawer captures are included. Every matrix image was inspected in contact sheets; default desktop/mobile views, the drawer and desktop quality endpoints were also inspected at larger size.

The image shows a dark central capture region, luminous front disk, a rear disk lensed above/below it, a thin critical ring and visible approaching/receding asymmetry. Debug 5 separates first and second disk crossings; debug 3 shows a circular capture mask; debug 7 shows the bent celestial coordinates. All four preset masks agree with the analytic critical impact parameter to **less than one pixel in radius** on both axes:

| Preset | Analytic radius (px) | Measured horizontal / vertical radius (px) |
| --- | ---: | ---: |
| 0 | 124.94 | 124 / 124 |
| 1 | 103.45 | 103 / 103 |
| 2 | 94.69 | 94 / 94 |
| 3 | 131.95 | 132 / 132 |

This comparison uses the actual GPU-produced debug-3 screenshots and `sin(alpha)=b_critical sqrt(1-1/r0)/r0`, not a replacement CPU image.

## Commands actually run

All implementation commands below ran in the candidate `solution/` directory. No server or installation was run in another model's worktree.

| Command | Observed result |
| --- | --- |
| `npm install --no-audit --no-fund` | Exit 0; 19 packages installed; exact lockfile generated. |
| `npm run vendor` | Exit 0; official Three.js 0.186.0 ESM builds, OrbitControls and MIT license copied locally. |
| `npm run build` | Initial sandbox attempt failed with `spawn EPERM`. A permitted retry exposed an invalid empty data-URL CSS import; that import was removed. Subsequent builds passed. |
| `npm test` | Initial sandbox attempt failed before tests could launch (`spawn EPERM`). Permitted runs passed all 9 tests, including the final regression run. |
| `npm run preview` | Served production files at `http://127.0.0.1:4186/`; actual Chrome visits and the full acceptance suite used this path. |
| `npm ci --no-audit --no-fund` | First attempt failed because the running Vite preview held Windows' native Rolldown module open (`EPERM unlink`), leaving dependencies partially removed. After stopping that preview, the same command exited 0 and installed all 19 packages. |
| `npm run build` after clean install | Exit 0; 21 modules transformed. Final JS: 795.64 kB, gzip 214.73 kB; CSS: 9.77 kB, gzip 2.96 kB. Vite reports its normal >500 kB chunk-size advisory; no check was disabled. |
| `& ./scripts/verify-evidence.ps1` | Exit 0; validated all 52 matrix screenshot dimensions, checked all four GPU shadow radii and regenerated contact sheets. |
| `git diff --check` | Exit 0 before staging. Staged review found two candidate-file trailing blank lines, which were removed, plus one existing space-before-tab in the unmodified upstream `three.core.js`. The scoped staged check for candidate-authored files passed; upstream vendor bytes were preserved and checked against the installed package. |

The local npm cache is ignored and contained in this worktree. Generated `dist/`, `node_modules/` and caches are not committed. Both preview sessions created for this task are stopped at delivery; no deployment or push was performed.

## Browser evidence

- [`evidence/browser-acceptance.json`](evidence/browser-acceptance.json): final full machine-readable report, with real state snapshots and pixel hashes.
- [`evidence/browser-console.json`](evidence/browser-console.json): captured warnings/errors since the final production bundle was built. The browser tool retains historical logs across reloads; the unfiltered log, including the initial synthetic-touch exception, is preserved in `evidence/browser-console-all-visits.json`. No unhandled application errors were observed in the final run or separate mobile/desktop checks.
- [`evidence/capture-matrix.json`](evidence/capture-matrix.json): all forty desktop capture URLs. Each uses `capture=1&quality=high&preset=N&debug=N&time=12.5&hud=0`; readiness was awaited.
- [`evidence/mobile-matrix.json`](evidence/mobile-matrix.json): twelve mobile states, including observed DPR and actual render dimensions.
- [`evidence/mobile-interaction.json`](evidence/mobile-interaction.json): actual trusted browser drag changed azimuth from 0° to 338.25° and elevation from 8° to 14.40°; wheel changed distance from 24 to 37.87 r_s.
- [`evidence/gpu-shadow-validation.json`](evidence/gpu-shadow-validation.json): analytic versus GPU mask measurements.
- Desktop contact sheets: [`0`](evidence/contact-p0.png), [`1`](evidence/contact-p1.png), [`2`](evidence/contact-p2.png), [`3`](evidence/contact-p3.png). [Mobile contact sheet](evidence/mobile-contact.png).
- [Desktop HUD](evidence/desktop-hud.png), [mobile HUD](evidence/mobile-hud.png), [mobile drawer](evidence/mobile-drawer.png). Individual matrix PNGs are retained beside these images.

The browser harness exercised all 21 sliders through the actual React controls. Twenty changed pixels at fixed simulation time; the time-rate slider correctly does not change a frozen capture, and was separately checked to stop time in normal operation. It also verified ten distinct diagnostic images, four distinct presets, quality budget changes, all required keyboard actions, persistence across a reload, reset, malformed URL recovery, rejected API arguments, deterministic capture, and real context restoration without navigation.

Observed mobile render sizes at DPR 2 were 341 × 738 (Standard), 526 × 1139 (High), and 780 × 1688 (Cinematic). The quality profiles also change integration/crossing/Bloom limits, as documented in the README. Frame-rate telemetry reports observed wall-clock frame intervals; no sustained hardware-independent FPS benchmark or cross-model performance comparison is claimed.

Runtime resource inspection found only same-origin built JS and CSS. No external runtime fetch, image, font, audio or API dependency exists in the source or observed requests. A physical network-disconnect test was not performed.

## Corrections and limitations

- Visual iteration reduced the initial overbright, overly regular disk emission. Mobile inspection reproduced a cropped disk; portrait FOV was adjusted, then all twelve mobile captures were regenerated and inspected with the complete disk visible.
- The initial synthetic touch test produced `NotFoundError` because browser-created synthetic PointerEvents cannot acquire native pointer capture. Its original failed report is preserved in `evidence/browser-acceptance-initial.json`. The final harness records trusted touch/pinch as **unverified**, and does not fabricate or suppress a passing result. A physical touch device or a browser driver with trusted multitouch input is needed for that remaining check. Real mouse drag and wheel behavior passed.
- A fixed 200 ms animation assertion was sensitive to background-tab throttling. The final harness waits for actual simulation-time advancement with a bounded timeout; that check passed. This changes candidate test synchronization, not the task standard.
- The browser screenshot API initially included extra borders and sometimes timed out on DPR-2 clipping. The documented screenshot fallback recovered the captures; final matrix dimensions were checked from PNG files. Mobile images are CSS-sized screenshots of an actual 390 × 844 iframe on a DPR-2 browser, rather than a physical phone screen. No DPR was faked in application state.
- The connected Chrome profile was reused; it was not a newly provisioned clean browser profile. Capture mode ignores persisted configuration, and normal-mode acceptance begins with the visible reset behavior. Results should not be treated as a standardized clean-profile comparison against other candidates.
- The physical ray equation is Schwarzschild; the emitting slab, temperature law and turbulence are illustrative, not an MHD disk simulation. No Kerr spin, emission-time delays or spectral transport beyond the documented RGB approximation is claimed. Finite steps/resolution can alias the thinnest high-order structures, especially at Standard quality. Debug mode 2 exposes integration exhaustion explicitly.
- WebGL2 with floating-point render targets is required. Unsupported devices receive a visible explanation; no fake fallback image is supplied.

User steering was limited to selecting the cinematic instrument-interface style and authorizing implementation of the plan. No manual code changes or external credentials were needed. The only remaining human/device action is the explicitly unverified native touch/pinch test.
