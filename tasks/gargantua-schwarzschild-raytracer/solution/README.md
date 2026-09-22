# GARGANTUA

A local, interactive Schwarzschild black-hole raytracer by **gpt-6-astra**. React owns the instruments; a Three.js full-screen fragment shader traces the image. No image assets, external fonts, audio, APIs or backend.

## Run

Requires Node.js 22.12+ (verified with 24.21.0) and npm. Run all commands from this `solution` directory:

```sh
npm install
npm run dev
```

Reproducible production path:

```sh
npm ci
npm test
npm run build
npm run preview
```

Open http://127.0.0.1:4186/ . Preview serves only the built `dist` files. Stop with Ctrl+C. Alternatively serve `dist` with any static HTTP server. `base: './'` allows a nested hosting path. The Windows sandbox used during evaluation required permission for Vite and Node's test runner to spawn child processes; no elevated OS privilege is intrinsically required by the application. npm cache stays inside `.npm-cache/`.

The committed vendor is used directly at runtime. `npm run vendor` reproduces it from the exactly locked Three.js npm package; see `vendor/README.md`. No install step is needed on a machine merely serving the built files.

## Observation

Drag or touch to orbit. Scroll or pinch to zoom. Panning is disabled so the observer always faces the origin. Manual camera input stops cinematic motion. The 21 parameters are grouped into Camera, Accretion disk, Deep space and Optics. Mobile instruments use a scrollable drawer.

| Key | Action |
| --- | --- |
| 0–9 | Final image and nine diagnostic views |
| Shift+1–4 | The approach, Above the disk, Polar orbit, At the edge |
| Space | Start/pause cinematic camera motion |
| H | Hide/show instruments |
| R | Reset all settings |
| Q | Cycle quality |
| Escape | Close parameter drawer |

Controls have native labels and keyboard support; shortcuts do not steal input from form controls. The default camera is stationary; disk turbulence advances. State is stored under `gargantua.state.v1`. Corrupt/unknown-version storage returns to defaults, and unavailable storage does not prevent use.

## Physics and rendering

Use `G=c=1`, `r_s=2M=1`. Schwarzschild spherical symmetry confines each null geodesic to a plane through the origin. A pixel direction in the observer's static orthonormal frame gives

```text
f0 = 1 - 1/r0
b = r0 sin(alpha) / sqrt(f0)
u = 1/r0
w = du/dphi = -cos(alpha)/b
(du/dphi)^2 = 1/b^2 - u^2 + u^3
d2u/dphi2 = 1.5 u^2 - u
```

The shader advances `(u,w)` with fourth-order Runge–Kutta, an angular cap and a 12% relative radial-change bound. `r(phi) = (e1 cos(phi)+e2 sin(phi))/u` reconstructs the bent path. Radial rays use their exact radial spatial path. Reaching `r <= 1.0001` absorbs the ray; crossing `u=0` yields the asymptotic sky direction. Exhausting the budget is an explicit third termination state, shown in magenta in debug 2, and contributes no invented background. The unstable photon orbit is `r=1.5`, with critical impact parameter `3 sqrt(3)/2`.

Each integrated segment is clipped to the disk slab `|y| <= thickness`, restricted to its radial annulus, and contributes emission and absorption in camera-to-source order. Leaving and reentering the slab creates distinct crossing orders. First and higher-order images result from the same integration. The horizon itself emits nothing; a foreground disk can physically appear across its projected silhouette.

At each disk sample the photon tangent is transformed back into a local static frame. The orbital velocity is `beta = velocityScale / sqrt(2(r-1))`, capped below light speed. The observed frequency factor is

```text
g = sqrt((1-1/r)/(1-1/rObserver)) * sqrt(1-beta^2) / (1-beta dot(orbit,photon))
```

Planck samples at 650/550/450 nm approximate the emission color; temperature falls with radius and brightness includes `g^3`. Advected procedural noise and filaments model turbulence. A periodic procedural star field and 3D-noise galactic band are evaluated along the escaped direction, never with an environment texture. Simulation time is reduced modulo 65536 seconds for safe float uniforms, including extremely large but finite capture times.

Linear half-float targets feed a multilevel bright-pass Bloom, followed by an explicit ACES approximation and sRGB conversion. Vignette, grain and dispersion are restrained and individually adjustable. Grain scales to zero at zero radiance. Debug outputs bypass the decorative effects.

This is an illustrative radiative-transfer model: the geodesic equation is relativistic, while the emitting slab, temperature law and turbulence are procedural rather than hydrodynamic simulations. It models a non-rotating black hole, not Kerr frame dragging, and omits emission-time delays. Finite integration budgets and pixel footprints limit resolvable high-order images.

References: [Tevian Dray, Null Orbits](https://sites.science.oregonstate.edu/physics/coursewikis/GGR/book/ggr/onull.html), [Alain Riazuelo, Seeing relativity I](https://arxiv.org/abs/1511.06025), [Three.js OrbitControls](https://threejs.org/docs/pages/OrbitControls.html).

## Quality and recovery

| Profile | Resolution scale | DPR cap | Maximum RK4 steps | Angular step cap | Disk crossing cap | Bloom levels |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Standard | 0.70 | 1.25 | 200 | 0.055 | 3 | 3 |
| High | 0.90 | 1.50 | 360 | 0.035 | 5 | 4 |
| Cinematic | 1.00 | 2.00 | 640 | 0.022 | 7 | 5 |

Internal dimensions are CSS dimensions × capped DPR × scale. Portrait framing preserves horizontal coverage. Quality is always explicit, not silently changed by a performance heuristic. WebGL2 with `EXT_color_buffer_float` is required; unsupported devices receive an error message. Context loss pauses rendering; restoration recreates the renderer, materials, targets and geometry on the same canvas, preserving camera/configuration/time. No page reload is used.

## Capture and acceptance

```text
http://127.0.0.1:4186/?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

Capture starts from fixed defaults and URL overrides, ignores saved state, freezes simulation and camera, and does not write localStorage. `quality` accepts `standard|high|cinematic`; `preset` accepts integers 0–3; `debug` integers 0–9; `hud` 0 or 1; `time` finite nonnegative seconds. Invalid fields independently fall back to defaults.

Wait for `document.documentElement.dataset.gargantuaReady === 'true'`. The immutable `window.__GARGANTUA__` interface has a read-only `ready` getter, `getState()`, `setQuality(level)`, `setPreset(index)`, `setDebug(index)` and `setTime(seconds)`. Setters return a state snapshot, or `null` for invalid arguments without mutation. A successful change invalidates readiness until the next actual frame. `getState()` also reports internal dimensions, DPR, quality budget, context status and observed frame rate.

`/qa.html` is a separate acceptance harness. Click **Run acceptance checks** to exercise the production app in a visible iframe: pixel changes, capture stability, invalid inputs, all parameters, presets, quality, shortcuts, persistence, context recovery and runtime resources. It is not part of the product HUD. Keep the tab visible during the run. The context test requires `WEBGL_lose_context`. Results and captured screenshots are recorded in `RESULTS.md` and `evidence/`.
