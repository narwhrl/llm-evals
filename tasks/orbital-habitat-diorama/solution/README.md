# Orbital Habitat Diorama — swe-2 candidate

An orthographic-isometric cutaway of a lived-in space-station cabin, built with
Three.js. A 8 m capsule section is sliced open toward the viewer: you look
straight through the large round porthole in the rear wall at a 3D Earth that
fills the frame, while the cabin drifts through a 90-second day/night cycle.

## Run

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # production bundle into dist/
npm run preview    # serve dist/ locally
npm run typecheck  # (no TS; plain JS — see RESULTS.md)
```

No remote assets are fetched at runtime: every texture is generated on the fly
on `<canvas>` in `src/textures.js`.

## Controls

| Action | Effect |
| ------ | ------ |
| Drag | Orbit the model (azimuth/polar clamped to keep the interior readable) |
| Scroll | Zoom |
| Click a fixture (sleeping bag, desk, seat, bike) | Ease-focus that zone |
| Click empty space | Release focus |
| Click the porthole glass | Toggle fast-forward (90 s → 15 s day cycle) |
| Drag the porthole glass | Scrub the day/night clock |
| Click the floor light strip | Night-cruise mode (cabin lights dim) |
| Click the plant rack | Toggle the grow light |
| Click the drifting pen | Spin it |
| Hover near the pen | It dodges the cursor |

## Layout

- Rear wall (arched silhouette, real circular aperture) carries the hero
  porthole at the right third and two small portholes on the left.
- Left end: hanging sleep bag, photo board, reading lamp, hydroponics rack.
- Centre: folding desk + telemetry laptop under the porthole, viewing seat.
- Right end: exercise bike, towel, hatch.
- Ceiling rails, cargo nets, cable runs, extinguisher/first-aid, slippers,
  drifting pen/manual/earbuds/droplet/crumb fill out the "lived-in" density.

See `RESULTS.md` for the verification record and asset provenance.
