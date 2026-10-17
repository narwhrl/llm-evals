# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, real-time Schwarzschild black hole rendered per pixel from a
custom Three.js fragment shader. React and Vite provide the application shell,
HUD and React state; the visible image is produced entirely by numerical null
geodesic integration, a procedural accretion disk, a lensed procedural sky,
and an HDR post pipeline.

There is no backend, login, runtime network request, remote texture, remote
font, cubemap, video or pre-rendered frame.

## Quick start

Requirements: Node.js 20 or newer (verified with Node 24.21.0) and npm 10+.

```bash
# Install exactly the versions in package-lock.json
npm ci

# Development server
npm run dev -- --host 127.0.0.1 --port 5173

# Production build -> dist/
npm run build

# Static preview of dist/
npm run preview -- --host 127.0.0.1 --port 4174
```

`dist/` is a self-contained static site. Any static file server can host it;
`vite preview` is only a convenience. The production build was verified with
the commands above.

## Rendering model

The core is `src/render/shaders/scene.frag.glsl`.

- **Units and chart.** Geometric units with `G = c = 1`, mass `M = 1`; the
  horizon is `r_s = 2M`, the photon sphere is `3M`, and the critical impact
  parameter is `b_crit = 3√3 M`.
- **Per-pixel geodesics.** For each camera ray, the plane through the hole is
  found. With `u = 1/r` and `φ` measured in that plane, the exact Schwarzschild
  null orbit equation

  ```text
  d²u/dφ² = -u + 3 M u²
  ```

  is integrated with classical RK4. The step tightens near the hole and is
  also capped by the relative change of `u`; the state is `(u, du/dφ)`.
- **Termination.** A ray is captured when `u >= 1/r_s`, escapes when
  `u < 1/r_escape` (`r_escape = max(90M, 2.2 r_camera)`), or is classified at
  the step budget (inside the photon sphere counts as captured, outside uses
  the current tangent). Captured rays never sample the sky, so the horizon is
  genuinely black.
- **Disk intersections.** Crossings are sign changes of the physical
  equatorial-plane coordinate along the same integrated path, located by
  interpolation in `φ`; they are not a flat ring mesh. Crossings inside the
  radial disk range are composited in path order, front to back, with a
  semi-transparent emissive slab. This produces primary, secondary and higher
  order images.
- **Relativistic emission.** The disk temperature uses a steepened
  Shakura-Sunyaev profile, a Planckian colour approximation, a Keplerian
  orbital velocity, the combined Doppler and gravitational factor
  `g = sqrt(1 - r_s/r) / (γ(1 - β·n_obs))`, and Doppler brightening. Colour is
  evaluated at `T·g`, intensity uses `g^2.6` for a controlled cinematic HDR
  range; this exponent is a deliberate presentation choice, not a claim of
  bolometric `g^4` transfer.
- **Turbulence.** Multi-octave value noise is sampled in a differentially
  rotating disk frame, with spiral lanes and a time-varying flow. Disk
  half-thickness controls the slab chord and opacity.
- **Sky.** Stars, a Milky Way band, dust lanes and nebular accents are
  procedural functions of the escaped ray direction. The same lensed escape
  direction feeds the sky, so arcs and the compressed star ring around the
  shadow are produced by the geodesics.
- **Post.** Half-float scene and bloom targets, a soft-knee threshold, a
  five-level downsample/blur chain, chromatic dispersion, exposure, an
  ACES RRT+ODT fitted tone map, vignette, film grain, dithering and sRGB
  encoding. The final composite is not a static image.

## Interaction and HUD

- `OrbitControls` drives a `PerspectiveCamera`; its position, orientation and
  FOV are uploaded to the shader every frame.
- The opening view is a cinematic orbit. Dragging, zooming or changing a camera
  slider pauses the loop without taking away control. `Space` resumes/pauses.
- Four presets: Observer, Edge-on, Polar, Close pass. Click the preset buttons
  or press `Shift+1` … `Shift+4`.
- HUD: quality, debug view number/name/detail, camera and preset state, frame
  time/FPS, all 21 controls, preset rail and keyboard reference. `H` hides or
  shows it; on mobile it becomes a scrollable bottom drawer.
- Keyboard shortcuts: `0`–`9` debug views, `Shift+1`–`Shift+4` presets,
  `Space` camera loop, `H` HUD, `R` reset, `Q` cycle quality.
- 21 live parameters: FOV, camera distance, azimuth, elevation, time rate,
  disk inner/outer radius, disk half thickness, peak temperature, emission
  gain, orbital velocity, turbulence amplitude/rate, star density, galaxy
  brightness, bloom strength/threshold, exposure, vignette, film grain and
  chromatic dispersion. Each is wired to camera or shader state; none is a
  decorative label.
- Settings persist under `gargantua.state.v1` in `localStorage` (versioned;
  malformed or older payloads fall back to defaults). The reset button,
  "RESET ALL PARAMETERS" and `R` restore defaults and clear the saved payload.

### Debug views

`0` is the final composite. `1` geodesic step count, `2` horizon/escape mask,
`3` ordered disk crossings, `4` redshift/Doppler factor, `5` lensed sky
direction as RGB, `6` stars and galaxy only, `7` disk emission before Doppler,
`8` log-scaled pre-post HDR radiance, `9` impact parameter relative to
`b_crit`. The HUD always names the current view.

### Quality profiles

| Profile | Internal scale | DPR cap | Geodesic steps | Disk crossings | Bloom levels |
| --- | ---: | ---: | ---: | ---: | ---: |
| Standard | 0.62× | 1.25 | 420 | 4 | 3 |
| High | 0.82× | 1.6 | 820 | 6 | 4 |
| Cinematic | 1.00× | 2.0 | 1500 | 10 | 5 |

The profiles change the actual render targets and shader budgets, not only a
label. Resize and `devicePixelRatio` are handled by the engine; the internal
target is capped by the active profile.

## Automation contract

The page applies query parameters before the first capture-ready frame:

```text
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

- `capture=1` disables the cinematic loop, freezes simulation time at `time`
  (default `0`), and suppresses incidental motion. Invalid `quality`, `preset`,
  `debug`, `hud` and `time` values fall back to defaults instead of failing.
- After a successful shader compile, first composite and URL-state application,
  `document.documentElement.dataset.gargantuaReady` is set to `"true"`.
- `window.__GARGANTUA__` exposes `ready`, `getState()`, `setQuality(level)`,
  `setPreset(index)`, `setDebug(index)`, `setTime(seconds)`, plus convenience
  `getTelemetry()`, `setParam(key, value)` and `setHud(open)`.
  The setters validate input, return an updated state snapshot, and return
  `null` for invalid input without throwing.

Capture mode does not replace the renderer with a still image; it only freezes
time and camera motion.

## Local Three.js / vendor

`vendor/three/` contains the exact runtime Three.js ESM build and OrbitControls
addon from `three@0.186.1`; `vendor/README.md` records upstream paths, version
and the MIT licence text location. Vite resolves the bare `three` specifier via
`resolve.alias` to `vendor/three/three.module.js`, so no `node_modules` copy is
bundled. `package.json` and `package-lock.json` pin React 19.3.1, Vite 8.3.4,
the React plugin and Three 0.186.1.

## Layout

```text
index.html
vite.config.js
package.json / package-lock.json
src/
  App.jsx                 React shell, keyboard shortcuts, engine lifecycle
  publicApi.js            window.__GARGANTUA__ automation surface
  state/
    schema.js             parameters, presets, debug views, quality profiles
    store.js              persistence, reset, telemetry
    urlParams.js          capture/query parsing and fallbacks
  render/
    Engine.js             Three renderer, camera, controls, bloom, recovery
    shaders/
      scene.frag.glsl     Schwarzschild geodesics, disk, sky, debug views
      fullscreen.vert.glsl
      threshold.frag.glsl
      downsample.frag.glsl
      blur.frag.glsl
      composite.frag.glsl ACES, bloom combine, lens artifacts, sRGB
  ui/
    Hud.jsx               observation console
    ControlPanel.jsx      21 live parameters
    ParamSlider.jsx
    Overlays.jsx          boot, context-loss and error overlays
  styles.css
vendor/
  three/                  pinned ESM build + OrbitControls
  README.md               provenance / version / licence
evidence/                 final desktop, mobile, debug, preset and recovery
                          captures plus machine-readable acceptance reports
```

## Verification

See [`RESULTS.md`](RESULTS.md) for the exact commands, browser viewports,
checks, console output and known limitations observed during this candidate's
run. The evidence directory contains the final desktop and mobile screenshots,
debug/preset contact sheets, context-loss and recovery captures, and the JSON
reports from the interaction, parameter and recovery suites.
