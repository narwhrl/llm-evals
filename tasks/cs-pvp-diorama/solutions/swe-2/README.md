# CS PVP Diorama

A miniature, toon-rendered 3D diorama of a classic CS defusal map — a rainy-night abandoned freight yard and back-street block on a single square concrete base. No UI, no people; the whole scene is a collectible physical model you orbit, drag and zoom.

## Commands

```bash
npm ci                 # install locked dependencies
npm run dev            # dev server
npm run build          # production build → dist/
npm run build -- --base=/cs-pvp-diorama/eval/ --outDir=dist-subpath
npm run preview        # serve the production build
```

(On Git Bash / MSYS, prefix the `--base` build with `MSYS_NO_PATHCONV=1` so the path argument is not rewritten.)

## Scene

- **Layout:** T spawn (north, container stacks + box truck + ramp), A site (north-west, half-open warehouse with a rolled-up shutter, heavy shelving, forklift, mezzanine loft), the central mid lane (half-open steel gate between high walls with firing slots, a drainage trench with a rusted grate, a low CT-side wall), B site (north-east, two-storey tin guard-house with a fire-escape balcony, warm lamp, bomb markings) and CT spawn (south, jersey barriers, riot shields, a police van with a strobing lightbar, a raised searchlight platform, a badge wall). The left alley and the right elevated flank complete the three route families.
- **Art direction:** `MeshToonMaterial` with a 4-step gradient map over every surface, `BackSide` outline shells on the main forms, ACES tone mapping, a cool moonlight/ambient base against warm sodium lamps, cold emergency fluorescents and the red/blue police strobes — the rain-night warm-vs-cool contrast the brief asks for.
- **Environment:** wet asphalt and puddles with expanding ripple rings, sagging power wires, rusted gutters with dripping eaves, graffiti and freight markings, bullet-pock clusters, and the full family of CS props (stacked crates, oil drums, pallets, jersey barriers, tyres).
- **Dynamics:** instanced falling rain, dripping eaves, puddle ripples, a flickering street lamp, a sweeping searchlight, alternating red/blue van strobes, subtle roller-shutter vibration, drifting steam and a rare distant lightning flash.

## Verification

The production build succeeds (`npm run build`) and the page opens directly onto the whole diorama — no interaction is needed to see the full ensemble. Orbit / drag / zoom work through `OrbitControls` with damping and distance clamps. All geometry is procedural; there are no remote assets or credentials at runtime.
