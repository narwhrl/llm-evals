# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, real-time black hole renderer built with **React + Vite + a
locally vendored Three.js**.  Every visible pixel — the black hole shadow,
the photon ring, the lensed accretion disc, the gravitationally lensed star
field and galaxy — is produced by a single custom fragment shader that
numerically integrates **null geodesics in Schwarzschild spacetime** for each
pixel.  There is no pre-rendered frame, no texture, no cubemap, no black
sphere and no flat ring mesh anywhere in the project.

---

## Commands

```bash
# 1. install the locked dependencies (also refreshes vendor/ from node_modules)
npm install

# 2. development server with hot reload  ->  http://127.0.0.1:5173
npm run dev

# 3. production build into ./dist
npm run build

# 4. static preview of the production build  ->  http://127.0.0.1:4173
npm run serve          # == npm run preview
```

Any static file server can serve `dist/` — the build uses relative asset
paths (`base: './'`), so the folder can be copied to any path and opened
without a backend:

```bash
npx --yes serve dist      # or: python -m http.server -d dist 8080
```

Requirements: Node.js ≥ 20.19 (tested on Node 24.21) and a browser with
WebGL 2 (Chrome/Edge 113+, Firefox 115+, Safari 16+).  No API key, no
account, no runtime network access.

---

## What the shader actually computes

### Coordinates and state

* Schwarzschild spacetime in geometric units (`G = c = M = 1`), so the event
  horizon is at `r = 2M` and the photon sphere at `r = 3M`.
* The black hole sits at the world origin; the accretion disc is the plane
  `y = 0` (the world up axis is `+Y`).
* Spherical symmetry guarantees that a null geodesic stays inside the plane
  spanned by the camera position and the ray direction.  The trajectory is
  therefore integrated in that plane with the **Binet equation** for null
  geodesics in Schwarzschild spacetime:

  ```
  d²u/dφ² + u = 3 M u² ,      u = 1/r
  ```

  which is equivalent to the first integral

  ```
  (du/dφ)² = 1/b² − u² (1 − 2 M u)
  ```

  with `b` the impact parameter and `φ` the Schwarzschild coordinate angle
  measured from the camera's radial direction inside that plane.

* **State:** `u = 1/r` and `v = du/dφ`, advanced with a classical RK4
  integrator.  The 3D position is reconstructed from the plane basis
  `P(φ) = r(φ) · (cos φ · e₁ + sin φ · e₂)`; the orbital plane axis is
  `e₁ × e₂` and gives the sign of the azimuthal angular momentum.

### Initial conditions

For a static observer at radius `r₀` with a local ray direction at angle `α`
to the radial direction:

```
b  = r₀ · sin α / sqrt(1 − 2M/r₀)        (impact parameter)
v₀ = −cos α / b                          (du/dφ at the camera)
```

Rays with `b < 0.02 M` are handled as strictly radial: they have no
deflection at all and either fall straight into the horizon or leave along a
straight line.

### Termination

| condition | meaning |
| --- | --- |
| `r ≤ 2M` | the ray crossed the event horizon — the interior stays perfectly black |
| `r ≥ 60M` | the ray escaped; the background sky is sampled with the asymptotic direction `(cos φ, sin φ)` |
| step budget spent | the ray lingered asymptotically around the photon sphere and never left; it is treated as captured |

### Accretion disc

The disc is an optically thick sheet in the plane `y = 0` with a Gaussian
vertical profile of half thickness `h`.  Every crossing of the disc plane is
detected from the sign change of the height, the crossing point is
interpolated inside the step, and the Gaussian-weighted chord that the ray
cuts through the sheet is derived from the analytic vertical slope at the
crossing.  Because the emission is a smooth function of the crossing point it
is free of sampling artefacts.

Crossings are collected **in path order**, so a single pixel can accumulate
the primary image, the secondary image and the higher order rings of the
disc; the disc is opaque, so a crossing also attenuates everything behind it.

### Redshift and beaming

Every disc element is treated as a circular Keplerian emitter.  The observed
frequency ratio combines the gravitational redshift with the relativistic
Doppler shift of the orbital motion:

```
g = sqrt(1 − 2M/r − r²Ω²) / ( (1 − b·L̂_y·Ω) · sqrt(1 − 2M/r_cam) )
```

with `Ω = sqrt(M/r³)` the Keplerian angular velocity (scaled by the *orbital
speed* control), `L̂_y` the component of the ray's angular momentum along the
disc axis and `b` the impact parameter.  The observed bolometric intensity
scales with `g⁴` (Liouville) and the observed blackbody temperature with `g`,
which produces the classic strong left/right asymmetry of the disc.

### Background

Stars and the galactic band are generated procedurally (hash based cell
star field plus fBm dust lanes) and are sampled with the **escaped**
direction of the ray, so the background is lensed by the same geodesics that
carry the disc light.  There is no image, no cubemap and no environment map.

### Post processing

HDR linear rendering → bloom pyramid (soft-knee prefilter, three levels,
separable Gaussian) → radial chromatic aberration → exposure → **ACES** tone
mapping (the RRT+ODT fit of Stephen Hill, identical to the matrix pair used
by Three.js' `ACESFilmicToneMapping`) → vignette → film grain → sRGB
transfer.

---

## Controls

### Pointer

| action | effect |
| --- | --- |
| drag | orbit the camera (OrbitControls) — the camera position, orientation and field of view are handed to the shader as the observer's ray |
| wheel / pinch | change the camera distance |
| touch | one finger orbits, pinch zooms |

### Keyboard

| key | action |
| --- | --- |
| `0` … `9` | switch the diagnostic view |
| `Shift` + `1` … `4` | jump to a camera preset |
| `Space` | play / pause the cinematic camera |
| `H` | show / hide the HUD |
| `R` | reset every parameter and the camera |
| `Q` | cycle the quality tier |
| `M` | toggle the procedural ambient drone |

### HUD

The HUD is collapsible (`H`) and turns into a bottom drawer on narrow
screens.  It contains

* four camera presets — *Hero Orbit*, *Edge-On Disc*, *Polar Plunge*,
  *Photon Ring*;
* the three quality tiers;
* **23 parameter controls** (the 21 required ones plus *star brightness* and
  *disc opacity*), each of which changes the rendering or the camera;
* the ten diagnostic views;
* the reset / play-pause / sound buttons;
* the keyboard and pointer reference;
* a status line with the quality tier, the active diagnostic view and the
  camera mode.

### Diagnostic views

| id | view |
| --- | --- |
| 0 | final HDR composite with bloom and ACES tone mapping |
| 1 | integration step count and termination reason (red = horizon capture) |
| 2 | event-horizon capture mask, critical curve and total deflection |
| 3 | disc plane crossings and their order along the ray |
| 4 | Doppler plus gravitational redshift factor of the disc hits |
| 5 | background lensing coordinates of the asymptotic escape direction |
| 6 | procedural star field and galactic band without lensing |
| 7 | raw pre-post-processing radiance, log encoded |
| 8 | disc temperature and turbulent density at the first crossing |
| 9 | closest approach radius and the critical photon-sphere structure |

### Quality tiers

The tiers change the real rendering budget, not just a label:

| tier | internal render scale | max geodesic steps | step size | sky octaves | bloom levels |
| --- | --- | --- | --- | --- | --- |
| `standard` | 0.55 | 190 | 0.16 rad | 1 | 2 |
| `high` | 0.75 | 420 | 0.09 rad | 2 | 3 |
| `cinematic` | 1.00 | 900 | 0.05 rad | 3 | 3 |

The internal buffer is additionally capped by a pixel budget (1.1 M / 2.2 M /
4.2 M) so that a Retina display or a high resolution window cannot stall the
frame rate.

---

## URL capture contract

```
?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0
```

* `capture=1` stops the cinematic camera, freezes the simulation clock at
  `time` seconds and disables the optional audio.
* `quality` — `standard` | `high` | `cinematic`
* `preset` — integer `0`…`3`
* `debug` — integer `0`…`9`
* `time` — finite, non-negative seconds (default `0`)
* `hud` — `0` or `1`

A parameter that is present but invalid falls back to its default value; a
parameter that is absent keeps the persisted user setting.  A capture run
never overwrites the saved settings.

When the shaders have compiled, the first frame has been rendered and the
URL state has been applied, the page sets

```js
document.documentElement.dataset.gargantuaReady = 'true';
```

and exposes the automation API:

```js
window.__GARGANTUA__.ready            // read-only boolean
window.__GARGANTUA__.getState()        // current state
window.__GARGANTUA__.setQuality(level) // 'standard' | 'high' | 'cinematic'
window.__GARGANTUA__.setPreset(index)  // 0…3
window.__GARGANTUA__.setDebug(index)   // 0…9
window.__GARGANTUA__.setTime(seconds)  // >= 0
```

The setters validate their input, return the updated state and return
`null` for a rejected argument; they never throw.

---

## Persistence

Parameters, quality tier, camera preset, diagnostic view, HUD state and the
cinematic flag are stored in `localStorage` under `gargantua.settings` with a
version stamp.  A different version, an unknown quality tier or an
out-of-range value falls back to the defaults.  The *Reset all* button and
the `R` key restore the defaults.

---

## Resilience

* `webglcontextlost` is intercepted: rendering is paused and the overlay
  reports that the context was lost.
* `webglcontextrestored` rebuilds the renderer resources (render targets,
  materials, uniforms) and resumes with the persisted state — no page reload.
* Resizing and `devicePixelRatio` changes re-allocate the internal buffer,
  the bloom pyramid and the camera projection.

---

## Project layout

```
solution/
├─ index.html
├─ package.json / package-lock.json      exact, version locked dependencies
├─ vite.config.js                        aliases 'three' onto ./vendor
├─ scripts/vendor-sync.mjs               copies the locked three build into vendor/
├─ vendor/
│  ├─ README.md                          provenance, version and licence
│  ├─ manifest.json
│  └─ three/                             three.module.js, three.core.js, addons/controls/OrbitControls.js
└─ src/
   ├─ main.jsx / App.jsx                 React shell, state, shortcuts, automation API
   ├─ styles.css
   ├─ state/
   │  ├─ config.js                       parameters, presets, quality tiers, debug modes
   │  ├─ storage.js                      versioned localStorage persistence
   │  └─ urlState.js                     capture contract parsing
   ├─ three/
   │  └─ GargantuaRenderer.js            Three.js renderer, passes, OrbitControls, quality, context loss
   ├─ shaders/
   │  ├─ raytrace.frag.glsl              the geodesic ray tracer
   │  ├─ fullscreen.vert.glsl            fullscreen triangle
   │  ├─ bloomPrefilter.frag.glsl        bloom prefilter
   │  ├─ bloomBlur.frag.glsl             separable gaussian
   │  └─ composite.frag.glsl             CA, bloom, exposure, ACES, vignette, grain, sRGB
   ├─ audio/ambient.js                   procedural ambient drone (WebAudio, no files)
   └─ ui/Hud.jsx                         the HUD
```

---

## Provenance of the visuals

Nothing in the scene is an asset: the stars, the galaxy, the disc texture and
the sound are generated procedurally from the shader code and the Web Audio
API.  The only third-party code is Three.js itself, vendored under
`vendor/` (MIT, see `vendor/README.md`).
