# CS PVP Diorama — Result Report

## Candidate

- Model: `kimi-code/k3` (Kimi K3)
- Baseline `main` commit: `5fdf7c8b6e90e98faad438f930a2bcfc8d8eef27`
- Candidate path: `tasks/cs-pvp-diorama/solution/`

## Deliverable

A self-contained Three.js + Vite project rendering a cel-shaded (三渲二) miniature
CS defusal map diorama on a square concrete base: T spawn, CT spawn, A and B bomb
sites, central duel lane with half-open iron gate, left flanking alley, right
elevated flank, sunken mid with drainage channel and sewer stubs, plus the full
prop/wire/graffiti dressing requested by the prompt. Rain, drips, steam, puddle
reflections, light flicker/sweep, shutter rattle, and lightning run as subtle
ambient animation. No UI, no people. Orbit drag/rotate/zoom via OrbitControls
(pan clamped to the base, polar angle clamped above ground).

## Verification (all actually executed)

| Command / action | Result |
| --- | --- |
| `npm install` (in `solution/`) | OK — 16 packages |
| `npm run build` | OK — `dist/` (JS bundle 653 kB / 169 kB gzip) |
| `npm run preview` (127.0.0.1:4173) | OK — serves production build |
| Puppeteer harness (headless Chrome 150, 1440×900) | 20+ screenshots across overview/south/north/east/west/low/top/mid/interior angles inspected visually |
| Console during load + inspection | Clean: no errors, no warnings, no asset-load failures |
| Interaction test (mouse drag + wheel via CDP) | Camera moved 34.26 units; orbit/zoom responsive |
| Render stats | ~310 draw calls, ~71 k triangles (production build) |

Screenshots were taken from the production build at 1440×900 from eight orbit
angles plus interior close-ups (A warehouse interior with bombsite marking, B
guard room with desk/schedule/flickering lamp, mid corridor toward the gate,
both spawns). Lightning verified via forced trigger; rain/drips/steam/steam
visible in stills; puddle reflections verified (mirrored lamp/building glow,
ripple distortion).

## Fixed during visual QA

- Reflection render target double color-space conversion (puddles rendered
  white) — isolated with in-shader debug branches, fixed by passing the already
  display-encoded reflection through.
- Missing `vec5` attribute (invalid GLSL) in the drip shader — split into
  vec3+vec2 attributes.
- Lightning rig wiring bug (`rig` undefined) found via module import probe.

## Adaptive quality

On software rasterizers (SwiftShader/llvmpipe) the scene automatically reduces
shadow/reflection resolution, rain density, pixel ratio and frame rate so the
page stays inspectable; hardware WebGL runs full quality. Detection keys off
`UNMASKED_RENDERER_WEBGL`.

## Known limitations

- All verification here ran under software WebGL (SwiftShader) at reduced
  quality; the full-quality hardware path was exercised only through code-path
  review (same code, larger buffers/counts).
- The sewer is represented by its two entrance stubs (T ramp wall mouth, CT
  flank stair pit); the underground segment itself is not traversable/visible.
- Rain splashes are implied by puddle ripple animation; no per-drop particle.
- Debug handle `window.__diorama` is exposed intentionally for inspection.

## Human intervention

None required beyond `npm install`. No credentials or external services needed.
