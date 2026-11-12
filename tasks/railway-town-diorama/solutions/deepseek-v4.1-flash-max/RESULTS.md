# Results

## Candidate

- Model identifier: `workbuddy/deepseek-v4.1-flash:max`
- Runtime model: `workbuddy/deepseek-v4.1-flash` through the local magpie
  provider in the Codex CLI
- Reasoning effort: `max`
- Permissions: Full permission (`ask-for-approval=never`,
  `sandbox=danger-full-access`)
- Starting `main` commit:
  `d16fa111d3b6651e11d7c38e8773f7228b4edeb6`
- Solution path: `tasks/railway-town-diorama/solution/`
- Environment: Windows, Node.js `v24.21.0`, npm `11.19.0`, Vite `6.4.6`,
  Three.js `0.170.0`, Chrome `157.0.8103.39`

The implementation, debugging, verification, and report were completed in one
Codex CLI session. No subagents, delegated workers, nested agent sessions,
other model APIs, or image-generation models were used.

## Verification

The following commands were run from the run directory unless noted otherwise.

### Baseline and installation

```sh
git rev-parse HEAD
# d16fa111d3b6651e11d7c38e8773f7228b4edeb6

cd tasks/railway-town-diorama/solution
npm install
# up to date, audited 16 packages; found 0 vulnerabilities
```

The current npm installation reports that the `esbuild` postinstall script is
not automatically covered by `allowScripts`. The dependency installation and
all builds succeeded with the locked Windows binary dependency.

### Production builds

```sh
npm run build
# 13 modules transformed; built successfully in 747 ms

npm run build -- --base /railway-town-diorama/ --outDir dist-test
# 13 modules transformed; built successfully in 741 ms
```

Both builds emitted the JavaScript bundle `603.76 kB` (`158.68 kB` gzip) and
reported only Vite's non-fatal chunk-size warning for bundles above 500 kB.
The subpath build's HTML references `/railway-town-diorama/assets/`, and the
acceptance server loaded the application and every asset from that prefix
without failed responses or requests.

### Development server

```sh
npm run dev -- --host 127.0.0.1 --port 4181 --strictPort
node evidence/dev-smoke.mjs
```

The dev server became ready at `http://127.0.0.1:4181/`. The browser smoke check
received HTTP 200, observed `window.__diorama.getState().ready === true`,
confirmed the loading screen was hidden, and recorded no page errors or failed
requests. The only console messages were Vite's expected debug connection
messages. The server was stopped after the check.

### Production smoke and interaction acceptance

```sh
node evidence/smoke.mjs
node evidence/acceptance.mjs
node evidence/viewport-smoke.mjs
```

The production smoke check received HTTP 200 and observed the default running
state, speed `1`, dusk theme, hidden loading screen, zero console errors, zero
page errors, and zero failed requests.

The viewport check loaded the production build below
`/railway-town-diorama/` at `1280x720` and `1024x768`, waited for the scene to
become ready, and captured both views. Visual inspection confirmed that each
viewport shows the complete board and the running train without clipping.

The interaction acceptance run is recorded in
`evidence/acceptance-final.json`. All 13 checks passed:

1. Initial state
2. Pause while running freezes the train
3. Resume continues the train
4. Pause while dwelling freezes the countdown
5. Automatic departure after dwell
6. Speed controls change the actual travel rate
7. Orbit and zoom change the camera
8. Reset restores the camera
9. Two continuous laps
10. Pause after laps freezes the train
11. Night lighting transition
12. Reset restores all interaction state
13. Browser console and network

Observed motion values included `55.143` track length, two complete laps over
`31.611 s`, two station arrivals, `0.687` maximum adjacent vehicle position
step, `0.329 rad` maximum yaw step, and `1.878`--`1.925` vehicle spacing. The
dwell countdown froze while paused and automatically resumed; departure began
after approximately `1.99 s`. The `0.5x` and `2x` travel-rate samples were
approximately `1.003` and `4.134`, a ratio of `4.116`.

The run used headless Chrome at `1440x900` with
`--ignore-gpu-blocklist`. Final Dusk, Night, and reset screenshots were
inspected at full size. The default camera shows the complete board, its
foreground rim and plaque, the track, bridge, station, town, and train. Night
shows illuminated station and street lamps, lit windows, and readable terrain.

## Evidence

Evidence is stored in the run's ignored `evidence/` directory:

- `acceptance-final.json`: final acceptance stdout with all 13 checks
- `acceptance.json`: final structured acceptance result
- `lap-samples.json`: sampled vehicle positions and timings
- `smoke-result.json`: final production smoke result
- `dev-smoke.json`: development-server smoke result
- `initial-dusk.png`: final default view
- `acceptance-night.png`: final Night view
- `acceptance-reset-dusk.png`: final state after Reset
- `dev-dusk.png`: development-server screenshot
- `viewport-1280x720.png`: subpath production view at `1280x720`
- `viewport-1024x768.png`: subpath production view at `1024x768`

## Failures and Limitations

An earlier interaction run used SwiftShader software WebGL at roughly 4 FPS
and timed out against wall-clock assumptions; its departure check was also too
strict. This was a test-environment issue rather than a product failure. The
final run used headless Chrome hardware WebGL and corrected waits, and all 13
checks passed.

Visual inspection of the first framing found that the display base's foreground
edge was outside the viewport. The initial camera and orbit target were adjusted
to frame the complete board, after which the build, smoke test, and full
acceptance run were repeated successfully.

Verification covers Chrome on Windows at a desktop viewport. Firefox, Safari,
and mobile viewport behavior were not separately tested. The over-500-kB
bundle-size warning remains non-fatal and does not prevent loading or running
the scene. No human intervention is required for the delivered candidate.
