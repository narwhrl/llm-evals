# Result Report — cs-pvp-diorama / glm-5.3-flash

## Model Identification

- Complete model identifier: `glm-5.3-flash`（ZCode 会话宿主：`account:bigmodel-start-plan/GLM-5.3-Flash`）
- Agent harness: ZCode CLI, plan-approved autonomous run
- Date: 2026-09-28

## Baseline

- Starting `main` commit SHA: `8409ab9ad67e2999707f475ee1e871ebe0f1c7b1`
- The isolated clone `.runs/cs-pvp-diorama/glm-5.3-flash` was detached at that SHA with its remote removed; all work stayed inside `tasks/cs-pvp-diorama/solution/`.
- Verified with `git merge-base --is-ancestor 8409ab9 main` → YES; `git diff --stat 8409ab9..main -- tasks/cs-pvp-diorama/` → empty, i.e. the five later `main` commits (226d02a…ddfa997, all docs/migration records) did not change this task's inputs. Conclusions are therefore comparable against the pinned round baseline.

## What Was Built

A rain-night miniature diorama of a CS defusal map (three.js 0.186.1 + Vite 8.3.1, zero runtime services, zero external asset files — every texture is generated on a canvas at runtime).

- Layout (square concrete base, 34×34 units, everything contained): T spawn on a raised north yard (box truck, 3-stack containers, fence with razor wire, ramp with breached parapet, barrels/pallets), A site NW (warehouse: half-rolled shutter, boarded windows, central pillar, 5-tier racks, forklift, sacks, mezzanine with access ladder, red-glow rear door, white bomb-zone spray), mid lane (double iron door half open, firing slits, two guard booths with consoles, drainage channel with rusty grate, low wall with crates and broken road sign, covered sewer trench with entrances/exits and ladders), B site NE (two-storey tin building with guard room interior, fire escape to balcony, warm broken fluorescent, duty board, bomb-zone spray, street lamp, bins/bike/pallets/table, corner low wall), CT spawn S (cordon wall with police emblem and banner, police van with pulsing beacons, jersey barriers + riot shields, elevated platform with exterior stairs, sweeping searchlight with visible cone, armor crates), west alley with steps down, east flank lane.
- Art direction: MeshToonMaterial with 4-step gradient map, dark edge outlines (EdgesGeometry for hard surfaces, inverted hull for curved shapes), ACES filmic tone mapping, cold blue rain-night ambience with warm street lamp / cold warehouse lights / red-blue police beacons contrast.
- Wet ground: full-base `Reflector` mirror under a transparent asphalt overlay with puddle alpha holes; the reflection shader adds procedural ripple distortion, so lamps, buildings and rain streaks are reflected in real time.
- Dynamics: GPU rain (1500 streaks), gutter drips, roof vent steam, lamp flicker (street lamp, warehouse, broken guard-room tube), slow police beacon alternation, sweeping searchlight with volumetric cone, occasional lightning (exposure + sky flash), rolling-shutter vibration bursts, rain streaks sliding on glass (scrolling alpha map).
- Interaction: OrbitControls (damped drag orbit, wheel zoom 10–72, polar clamp above ground, pan target clamped over the base), short camera ease-in on load then full user control. No DOM UI whatsoever (body contains only the canvas), no people.

## Verification Actually Performed

Environment: Windows 11, Git Bash, Node v24.21.0 (fnm), Chrome via kimi-webbridge daemon (user's real browser, driven with temp-file JSON requests per the skill's Windows rules).

Commands (run in the solution directory; vite invoked through `node …/vite.js <root>` because of a local fnm cd-hook quirk):

| Command | Result |
| --- | --- |
| `npm install --save-exact --no-audit --no-fund three vite` | added 16 packages; three 0.186.1, vite 8.3.1 |
| `vite build` (final) | ✓ built in ~180 ms; `dist/index.html` 0.42 kB, `dist/assets/index-*.js` ~646 kB (three.js); only warning is the >500 kB chunk-size hint |
| `vite preview <root> --port 4187 --strictPort` | served; `curl --noproxy '*' http://localhost:4187/` → 200 with the candidate's index.html |
| kimi-webbridge `Page.reload`, `evaluate window.__ready` | ready flag set by the synchronous first frame on every load |
| kimi-webbridge console collector (`Page.addScriptToEvaluateOnNewDocument`) | `window.__errors` empty across all final loads — no console errors or warnings |
| kimi-webbridge `network list` | every app request 200; the only 404s were the browser's default `/favicon.ico` in earlier iterations (final build embeds a `data:` icon) |
| `window.__dbg.bench(40)` (40 synchronous renders, 1440×900, DPR 1) | 12.7–13.8 ms/frame ≈ 72–79 fps estimate; `renderer.info` ~955 draw calls |
| CDP `Input.dispatchMouseEvent` drag (trusted pointer events) | orbit both directions works, camera stays clamped; wheel zoom in/out works (min/max respected); close-ups down to ~10 units |
| Dynamics check | two frames 6 s apart (`__dbg.step`) show rain displacement, searchlight sweep and beacon phase change; lightning scheduler runs error-free |

Browser observations (1440×900 viewport, `Emulation.setDeviceMetricsOverride` dsf 1): inspected the diorama from SE default, NE, N, S low and top-down angles plus zoomed close-ups of A front/interior, mid gate, B site, CT spawn and T plateau. Confirmed: one complete square base with rim, all geometry within it; no UI, no people; four core regions and three route families readable; elevated positions (CT platform, B balcony, warehouse mezzanine, container tops); interiors lit and furnished; wet reflections visible in puddles (mirrored lamp pools and window lights); graffiti/stencils/bullet holes present.

## Defects Found and Fixed During the Run

1. Builder parent-stack bug: `kit.group()` did not reparent subsequent `kit.box/cyl` calls, piling truck/van/booths/lamp/pallets at the map origin — fixed with a group stack (`kit.end()`), verified by the props appearing at their intended regions.
2. `renderer.setAnimationLoop(tick)` passed the rAF timestamp into `tick`'s optional forced-dt parameter, inflating scene time to ~2.9M s and randomizing all time-driven motion — fixed by wrapping the callback.
3. `refs.bSite`/`refs.b` key mismatch crashed first load (caught by the console collector) — fixed.
4. Deprecated `THREE.Clock` and removed `PCFSoftShadowMap` produced console warnings — replaced with a performance.now clock and `PCFShadowMap`.
5. Bomb-zone spray decals conflicted with the transparent ground overlay draw order — baked into the ground canvas texture instead.
6. Tuning iterations: exposure/hemisphere/fill/rim lighting raised from an initially crushed-black render; searchlight cone opacity/intensity and sweep direction constrained; police light intensity reduced; graffiti decals dimmed; puddle edges hardened; razor wire given a top rail.

## Known Limitations

- Chrome throttles rAF to ~0 for occluded/background tabs, so real-time smoothness cannot be measured while the user works in another app; the first frame is rendered synchronously (screenshots always valid) and fps is reported from a synchronous render bench instead. All dynamics advance correctly when the tab is visible.
- The user's Chrome zoom makes effective DPR ≈ 1.0–1.25 depending on override; verification used dsf 1 at 1440×900. No EffectComposer is used and the Reflector render target is a fixed integer size, so the fractional-DPR framebuffer pitfall seen in an earlier task does not apply.
- Lightning flashes are probabilistic (every 9–17 s); none of the stills happened to catch one, though the scheduler runs error-free.
- Graffiti/stencil text uses basic (unlit) materials by design; opacity was tuned so they read as faded paint rather than lit signs.

## Human Intervention

- The user commissioned this run and instructed that verification use kimi-webbridge in their real browser with self visual acceptance (no subagents, no other models); followed as stated.
- The user approved the plan and chose the run + curator-import scope via one question.
- During browser verification the user was working in another app; Chrome was deliberately left behind it (focus emulation used for input, `Page.bringToFront` once).
- No code corrections or retries were requested by the user beyond the above.

## Autonomy

2 user interactions total (commission + plan approval/scope choice). ~25 build→verify iterations were self-driven; all defects listed above were found and fixed without human help.
