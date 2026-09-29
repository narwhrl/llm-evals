# Rainy Konbini Diorama — kimi-k3 RESULTS

## Model & Baseline

- **Model ID:** `moonshot-kimi/k3` (Kimi K3)
- **Task:** `rainy-konbini-diorama`
- **Baseline `main` SHA:** `ac801cf8a2e5948209f48055903a94984c20f91d`
- **Run clone:** `.runs/rainy-konbini-diorama/kimi-k3` (detached at baseline)
- **Candidate path:** `tasks/rainy-konbini-diorama/solution/`

## Build & Run

```bash
npm install
npm run build      # vite build → dist/
npm run preview    # vite preview (verified on port 4197)
```

- Build tool: `vite` 7.3.6, `three` 0.180.0.
- Production build: **passes** (`✓ built`, ~573 kB single chunk, gzip ~148 kB; no credentials or external services required).

## Verification (kimi-webbridge, real Chrome, 1440×900 @ DPR 1)

The scene exposes a non-UI debug handle `window.__DIORAMA__` (`stats()`, `setView()`, `step(n, dt)`, `setDoor()`) so verification could be driven deterministically. Screenshots saved under `shots/` in the run clone.

| Check | Method | Result |
|---|---|---|
| Init / stats | `__DIORAMA__.stats()` | 501 meshes, ~7343 tris, no console errors, `innerWidth 1440 × innerHeight 900`, DPR 1.0 |
| Square base + street corner readable | default view screenshot (`16-final-default2.png`) | complete square plinth, L-shaped road, crosswalk, corner guardrail, store at visual center |
| Toon / anime look, sign, awning, interior-through-glass | storefront views (`05-front-v2`, `06-interior`, `15-after-interact`) | 月ノ岬コンビニ sign, striped awning, OPEN neon, visible drinks wall, oden counter, magazine rack, warm interior vs cool street |
| Rain / drips / ripples / runoff | animated in every shot; rain streaks, awning drips, expanding puddle rings, glass-runoff shader | present and animating |
| Automatic door | `setDoor('open')` + step → `doorOpen = 1`, screenshot `10-door-open.png` | both leaves slide apart correctly |
| Traffic signal change | step 15 s → green, step to 23 s → red (`11-signal-t15`, `12-signal-t23`) | red/green alternate confirmed |
| Orbit / zoom | CDP `Input.dispatchMouseEvent` drag + wheel | camera moved `(17,11,25)→(-11.8,2.5,18)`, distance `30.7→19.4`, controls responsive |
| 60 s stability | `step(3600, 1/60)` equivalent driven across door/signal cycles | scene stable, no errors |

## Fixes applied during visual acceptance

1. `store.js` used `cylGeo` without importing it → runtime `ReferenceError`, fixed import.
2. Roof read as a flat blob from the raised default view → added a warm translucent skylight so the lit interior reads from above.
3. Interior too dim vs the wet street → boosted the three warm point lights; darkened road/background materials to restore the warm-store/cool-street contrast.
4. Road sheen/puddles washed out grey-blue under RoomEnvironment → lowered `environmentIntensity` to 0.06, raised sheen roughness/opacity, reduced hemi/moon slightly.
5. Automatic-door driver had an inverted condition that pinned the doors shut → rewrote as an explicit open/hold/close cycle.
6. Distant rain streaks read as scratches against sky → added depth fade in the rain shader.

## Known limitations

- The interior ceiling is opaque; the lit interior is read through the storefront glass and the roof skylight rather than a dollhouse-style open roof.
- Screenshots carry the kimi-webbridge capture's ~5 px bright rim at the frame edge (capture artifact, not scene content).
- `npm run dev` also works but only `build`+`preview` were exercised for verification.

## Human intervention

None beyond the user's standing instruction to verify with kimi-webbridge and to run the model in its own isolated clone.
