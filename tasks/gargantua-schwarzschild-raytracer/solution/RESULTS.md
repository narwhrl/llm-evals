# RESULTS — gargantua-schwarzschild-raytracer / opus-5.5

- Model: `anthropic/claude-opus-5-5`, run in ZCode with no subagents or other models
- Starting `main` commit: `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`. The isolated clone at `.runs/gargantua-schwarzschild-raytracer/opus-5.5` was detached here with its remote removed. `main` later advanced to `5fa8bce`, but `git diff --stat 8409ab9 5fa8bce` touches only `README.md`, `migration/`, and `tasks/cf-transport-ship/`. None of those are inputs for this task, and `glm-5.3-flash` used the same baseline.
- Date: 2026-09-28. Platform: Windows 11 (win32 10.0.26200 x64), Git Bash, Node v24.21.0 / npm 11.19.0 (fnm).

## Human intervention

- The user rejected the first plan and instructed: "浏览器验证使用 kimi-webbridge 技能" (use the kimi-webbridge skill for browser verification). All browser checks below ran through the Kimi WebBridge daemon v2.0.22 and extension 2.0.22, which drive the user's real Chrome. There were no other prompts or corrections.
- When this run started, the clone already contained `package.json`, `package-lock.json`, `node_modules/`, and `vendor/three/` from an earlier session. I kept these after checking them (see Vendor). I did not create them, so I cannot say which session produced them.

## Commands and results

| Command (in `solution/`) | Result |
| --- | --- |
| `npm view three@0.186.0 dist.integrity dist.tarball` | `sha512-cr/fIM2d…/HHkQ==`, identical to the local tarball's `openssl dgst -sha512` |
| `cmp` vendor files against the tarball | `three.module.js`, `three.core.js`, and `LICENSE` identical. `OrbitControls.js` differs only at line 12 (import path). |
| `npm ci` (first run, and again after `rm -rf node_modules dist`) | exit 0, 0 vulnerabilities |
| `npm run build` | First attempt exit 1: a backtick inside a GLSL comment ended the template literal. Fixed, and every later build exited 0. Final build: `dist/assets/index-DRaemCG-.js` 809.08 kB (gzip 219.66 kB), CSS 5.79 kB. |
| `npx vite preview --port 4317 --strictPort` | Served `dist/` at http://127.0.0.1:4317/ |
| Bundle string scan `grep -oE "https?://…" dist/assets/*.js` | Only XML namespace constants, `react.dev/errors`, and a jcgt.org comment URL. No fetch targets. |

One mistake to record: I started a second preview server while the first was still running. The second exited with "Port 4317 is already in use", and the original server (PID 37548, whose command line I confirmed) kept serving. I stopped it with `taskkill`, restarted on a free port, and repeated the final smoke check on the clean build. At the end I stopped the last server (PID 9104). `netstat` showed no listener on 4317, and no `node.exe` process referencing this clone was left running.

## Browser acceptance

Environment: Chrome with the WebBridge extension, session `gargantua-opus-verify`. The viewport was set with CDP `Emulation.setDeviceMetricsOverride`: desktop `1440×900`, and mobile `390×844` at DPR 2 with `mobile:true` and touch emulation. The user's browser applies its own zoom, so the effective desktop DPR was 1.1 in the first run and 1.21 in the capture runs. Every capture screenshot was checked by reading the image and by pixel statistics from local Pillow/NumPy scripts.

- **First load (`/`)**: `gargantuaReady="true"` within about 3 s. The full black hole, lensed disk, and HUD are visible, and the cinematic loop starts. No errors from the injected `console.error`/`error`/`unhandledrejection` collector.
- **Network**: WebBridge `network list` shows only `/`, `assets/index-*.js`, and `assets/index-*.css`, all from `127.0.0.1:4317`. It also lists the extension's own `chrome-extension://…/injected.js`, which the page did not request. `performance.getEntriesByType('resource')` returns the same two same-origin assets.
- **Capture matrix**: `capture=1&hud=0&time=12.5` for `preset=0–3 × debug=0`, `preset=0 × debug=1–9`, and `preset=1–3 × debug=2/4/5`. Every URL reached ready. Loading `preset=0 debug=0` twice gave a mean absolute difference of 0.007/255 and a max of 4/255 (grain dither), which is deterministic. `time=40` differs by 3.1/255 because the turbulence moves.
- **Physics visible in the final image (preset 0, High)**: a deep-black shadow (centre luminance 0.04), with a thin photon ring and the far side of the disk lensed over the top and under the bottom of the shadow. Debug statistics:
  - Step budget exhausted: 0.00%. Horizon capture: 6.9%, and views 2 and 3 agree.
  - Disk crossings: 24.1% of pixels see the primary image, 1.52% see a secondary image only, and 0.001% see third order or higher.
  - Doppler: in the disk band, the approaching left half has mean grey 163.9 and the receding right half 84.9. Debug 5 shows 7.4% of pixels with g > 1 and 13.0% with g < 1.
- **Debug 0–9**: each view is distinct and matches its HUD description: step heat map, termination classes, horizon mask, crossing order, g-factor, lensed sky grid, sky only, disk temperature, and log HDR luminance. Keys `Digit0`–`Digit9` update both `debug` and the `.debug-desc` text.
- **Keyboard**: `Shift+1–4` apply the four preset cameras and stop the loop. `Space` resumes the loop, the camera moves about 30° in elevation over 1.2 s, and a second `Space` pauses it. `Q` cycles high → cinematic → standard → high. `H` removes the HUD DOM and restores it. `R` and the reset button both restore defaults and clear the saved values.
- **Pointer**: a CDP mouse drag changed azimuth from 62 to 9.2 and elevation from 38 to 32.7. Five wheel steps changed distance from 30 to 22.68. On the mobile viewport, a CDP single-finger touch drag changed azimuth from −124.6 to −161.4 and stopped the cinematic loop. **Two-finger pinch was not tested.**
- **All 21 parameters**: each slider was set through its real `<input type=range>` in capture mode, and I measured the mean absolute canvas difference:
  - Largest changes: FOV 49.7, distance 107.6, azimuth 17.9, elevation 79.8, disk inner 16.7, disk outer 39.9, exposure 43.4, bloom threshold 22.4.
  - Smallest changes: half-thickness 3.0, turbulence 1.6, turbulence speed 1.5, vignette 4.2, chromatic 3.7.
  - Time scale shows 0 in capture mode, where time is frozen. Outside capture it advanced simulation time 3.00 s per wall-clock second at `3×`, versus 1.02 s at `1×`.
- **Persistence**: after changing FOV, disk outer, disk temperature, galaxy, bloom, chromatic, quality, and debug, a reload restored all of them from `gargantua.state` `{version:1}`. Reset returned everything to defaults.
- **Invalid query**: `?capture=1&quality=ultra&preset=7&debug=abc&time=-5&hud=2` rendered a normal image at defaults (high/0/0/t=0/HUD on), with `rejectedQuery` = quality, preset, debug, hud, time, and no errors.
- **`__GARGANTUA__`**: all 15 valid and invalid calls returned `{ok}` without throwing, and invalid ones included an error message. Assigning `ready = false` had no effect.
- **Quality**: render targets measured 1045×653 (Standard), 1481×926 (High), and 1742×1089 (Cinematic), with 160/300/520 steps, 2/3/4 crossings, and 4/5/6 bloom mips. Side-by-side crops show visibly finer photon-ring and turbulence detail at the higher levels. On this GPU every level holds 16.7 ms frames with vsync on, so **the frame-time cost difference could not be observed**. My GPU timer-query attempt ran while the tab was throttled in the background, so I do not treat those numbers as evidence.
- **Mobile 390×844@2**: the High profile caps DPR to a 683×1477 drawing buffer and renders internally at 581×1255. The HUD collapses to title, chips, a preset strip, and a bottom tab drawer, and an opened drawer covers the lower half without hiding the black hole. Standard captures of presets 0 and 2 show the horizon, ring, and lensed disk.
- **WebGL context loss** (`WEBGL_lose_context` available): `loseContext()` fired `webglcontextlost`, `contextLost` became true, and the recoverable-status overlay appeared. `restoreContext()` fired `webglcontextrestored`. Materials and targets were rebuilt, the overlay disappeared, and state was unchanged (high, preset 1, 7800 K). The same image returned without a reload and with no errors.

## Known limitations

- The disk is geometrically thin. It is shaded at each interpolated equatorial crossing with an optical-depth model, not integrated volumetrically. Half-thickness therefore affects opacity only, not geometry.
- Beyond r = 90 the remaining bend uses a weak-field analytic correction instead of further integration.
- The desktop checks ran under the user's browser zoom (effective DPR 1.1–1.21, not 1.0). The mobile checks used CDP emulation, not a physical device.
- Optional music (`M`) is not implemented.
