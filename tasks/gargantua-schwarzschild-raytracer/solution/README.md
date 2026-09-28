# GARGANTUA — Schwarzschild Black Hole Raytracer

A full-screen, real-time raytracer for a Schwarzschild black hole, built with React 19 + Vite 8 on locally vendored Three.js r186 ([`vendor/README.md`](vendor/README.md)). Every visible pixel comes from one full-screen fragment shader that numerically integrates a null geodesic for that pixel. There is no backend, and the runtime makes no network requests.

## Commands

Node.js 24 / npm 11 were used. From this directory:

```bash
npm install              # or: npm ci  (package-lock.json pins every version)
npm run dev              # development server (Vite)
npm run build            # production build → dist/
npx vite preview --port 4317 --strictPort   # serve dist/ statically at http://127.0.0.1:4317/
```

`dist/` uses relative asset URLs (`base: './'`), so any static file server can host it from any path.

## Rendering

- `src/shaders/blackhole.js` is the geodesic raytracer. Units are G = c = M = 1, so r_s = 2. Each ray starts from a static-observer tetrad at the camera and is integrated with RK4 using the planar form `d²x/dλ² = −3h²x/r⁵`. That form reproduces the Schwarzschild Binet equation `u'' + u = 3u²` exactly. The step length adapts with r. A ray terminates when it crosses the horizon (r < 2.01), escapes to r > 90 with a weak-field correction applied to its asymptotic direction, or exhausts its step budget.
- Accretion disk: every equatorial-plane crossing along the curved path is interpolated. When a crossing lands inside [r_in, r_out], it is shaded and composited front to back in path order, with optical depth and transmittance, for up to 2, 3, or 4 crossings depending on quality. Emission uses a Novikov–Thorne-like temperature profile and blackbody colour. The redshift factor g = 1/(lapse_cam · uᵗ · (1 − Ωℓ)) combines gravitational redshift and Doppler shift, with intensity ∝ g⁴ and colour temperature ∝ g. Turbulence is fbm advected at the local Keplerian rate.
- Sky: procedural stars and a Milky Way band are sampled in the lensed escape direction, and each star's footprint follows the lensing magnification.
- Post-processing (`src/shaders/post.js`): half-float HDR targets, a soft-threshold bloom mip chain, radial chromatic aberration, ACES fitted RRT+ODT, vignette, film grain, and sRGB encoding.

## Controls

| Input | Action |
| --- | --- |
| Drag / wheel / pinch | OrbitControls orbit and zoom. The cinematic loop stops as soon as you take control. |
| `Shift+1`–`Shift+4` | Presets: Gargantua 正面 (front view), 高倾角侧视 (high-inclination side view), 近视界掠射 (near-horizon grazing view), 极轴俯视 (polar top-down view) |
| `0`–`9` | Debug views (listed in the HUD's 调试 (Debug) tab) |
| `Space` | Play/pause the cinematic loop |
| `H` / `R` / `Q` | Toggle HUD / reset all state / cycle Standard → High → Cinematic |

The HUD has 21 sliders, grouped as camera/time, disk, sky, and post-processing. All configurable state is saved under `localStorage["gargantua.state"]` as `{ version: 1, state }`. Choose 重置全部 (Reset all) or press `R` to clear it. No music is implemented; it is optional in the task.

| Quality | Render scale | Max steps | Step scale | Disk crossings | Bloom mips | CA taps | DPR cap |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Standard | 0.60 | 160 | 1.25 | 2 | 4 | 1 | 1.25 |
| High | 0.85 | 300 | 1.00 | 3 | 5 | 3 | 1.75 |
| Cinematic | 1.00 | 520 | 0.70 | 4 | 6 | 5 | 2.00 |

## Automation contract

`?capture=1&quality=high&preset=0&debug=0&time=12.5&hud=0`

- `capture=1` ignores persisted state, disables the cinematic loop, and freezes simulation time at `time`, a finite value ≥ 0 that defaults to 0. Grain is also seeded from `time`.
- Invalid `quality`/`preset`/`debug`/`hud`/`time` values fall back to their defaults, and the rejected names are listed in `getState().rejectedQuery`.
- After the shaders compile and the first frames render, `document.documentElement.dataset.gargantuaReady === "true"`.
- `window.__GARGANTUA__` is frozen and exposes a read-only `ready` flag plus `getState()`, `setQuality(level)`, `setPreset(index)`, `setDebug(index)`, and `setTime(seconds)`. Setters return `{ ok: true, state }`, or `{ ok: false, error, state }` for invalid input, and never throw.

On `webglcontextlost`, rendering pauses and an overlay appears. On `webglcontextrestored`, all materials and render targets are rebuilt from the saved state and rendering resumes without a reload.
