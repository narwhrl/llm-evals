# Result Report: rainy-konbini-diorama / claude-opus-5.5

## Identity and Baseline

- Model identifier: `anthropic/claude-opus-5-5`, run in the ZCode agent harness. Candidate ID: `claude-opus-5.5`.
- Starting `main` commit: `087676f533866018deb19bd8e51ef5db3287719c`.
- Clone: `.runs/rainy-konbini-diorama/claude-opus-5.5`, created with `git clone --no-local --single-branch --branch main --no-tags`, detached at the baseline, `origin` removed.
- Human intervention: none after the initial prompt. No subagents or other models were used.

## Implementation

A Vite + three.js (`0.186.1`) scene, built from code only. It has no external assets or network requests, and every sign, poster, and road marking is drawn at runtime on a canvas.

- **Base and layout:** One 18 m × 18 m square base on a wooden display plinth with a brass nameplate. A two-lane main road turns into a side street at a corner. There are raised paver sidewalks with rounded curbs, a parking lot with two bays, a back alley, a liquor shop with a snack bar upstairs, and a two-storey apartment block. All content stays on the base.
- **Store (つきみマート):** Lit fascia signs on two sides, a canopy with a valance and downlights, broad glazing on the front and side, and a two-leaf automatic sliding door with a sensor LED. Also a welcome mat, window posters, an umbrella stand, two vending machines, three sorted bins, a bicycle, side-wall AC units with piping, rooftop condensers, and a back staff door.
- **Interior:** Counter with two registers, coffee machine, oden pot, and hot-snack warmer. A lit cigarette wall, a hanging menu lightbox, and an open chilled case with bento, onigiri, and sandwiches. Five glass-door drink coolers, two gondola islands with product rows, promotional end caps and POP cards, a magazine rack, an ice-cream chest freezer, hanging signs, queue footprints and floor arrows, and a STAFF ONLY back-room door. Warm point lights inside contrast with the cool hemisphere and moon light outside.
- **Street:** Three utility poles with crossarms, insulators, transformers, sagging wires, and service drops. A streetlight with a shadowed spotlight, a guardrail, zebra crosswalks, a stop line and 止まれ marking, a stop sign, a speed-limit sign, a crossing sign, pedestrian signals, a distant vehicle signal, drain grates, manholes, a mailbox, a pylon sign, a community notice board, and hydrangeas.
- **Rendering:** Three-band `MeshToonMaterial` cel shading. A screen-space ink outline pass uses the Laplacian of reciprocal depth plus normal discontinuities, so flat ground at grazing angles does not produce false edges. After that come HDR bloom, neutral tone mapping, and FXAA. Static geometry is merged per material and repeated products are instanced.
- **Motion:** 7,000 GPU rain streaks that stop on roofs, awnings, and sidewalks and brighten near light sources. There are splash rings, eave drips that bead, fall, and leave a ring, and procedural rain ripples in the wet-ground reflection. The glass has runoff rivulets and beaded drops. The fascia sign stutters now and then, and the neon sign flickers. The automatic door opens every 9–20 s. The signal cycle is green 14 s, yellow 3 s, red 17 s, with a blinking pedestrian signal.
- **Interaction:** OrbitControls with damping. Drag orbits, wheel or pinch zooms from 9 to 55 m, the polar angle is clamped above the base, and panning is disabled. The page has no UI.

## Verification (actually run)

| Command | Result |
| --- | --- |
| `npm ci` | Pass, 0 vulnerabilities |
| `npm run build` | Pass, `dist/assets/index-*.js` 692 kB (181 kB gzip). Vite warns that the chunk is larger than 500 kB, which is the size of three.js. |
| `npx vite preview --port 4317 --strictPort` | Served at `http://localhost:4317/`. Stopped after verification. |

Browser checks used Playwright-core 1.63.0 with Chromium 1243 (ANGLE/D3D11), headless, at a 1440 × 900 viewport. The harness lived in a scratch directory outside the candidate.

- About 60 fps measured over 2 s after load, in both the default and zoomed views.
- The initial view shows the full square base with the store at the center and no UI.
- I checked a close zoom, an orbit to the front-left, an eye-level view, the rear/alley, a top-down view, and the street corner. Everything stays on the base, and the interior reads through the front and side glass.
- A 42 s pixel-diff series of the zoomed storefront measured the door region. It stayed at 0.5–1.3 mean difference while closed and rose to 20–22 while open. That showed two opening cycles about 28 s apart.
- Frames taken 7 s apart over 56 s showed the distant signal changing from green to red.
- Console: no errors, and no failed requests after an inline favicon was added. ANGLE prints compile warnings X3595 and X4000, which come from three.js's built-in FXAA shader.

## Known Limitations

- The scene depends on WebGL2 with half-float render targets. It was verified only in Chromium on Windows, not in Firefox, Safari, or on mobile hardware.
- Japanese text uses system fonts through a CSS font stack. On a system without CJK fonts, a fallback font will render the signs.
- The door opens on random timers, not on a sensor. There are no people, as the task requires.
- Reflections come from one planar reflector at road level. Raised sidewalks get wet shading but no mirrored reflections.
- Shadow maps are rendered once at startup, because nothing that casts shadows moves.
