# Candidate result — rainy-konbini-diorama / swe-2

- **Model identifier:** `magpie/devin/swe-2` (ZCode agent session, `swe-2` candidate id).
- **Starting `main` commit:** `63a46c3a79afa751a12eaa90f5c0f98b4b7212f1`.
- **Candidate path:** `tasks/rainy-konbini-diorama/solution/` in the isolated clone (worktree `.worktrees/rainy-swe2`, detached HEAD, remote removed — see clone workflow below).

## Implementation summary

Vite + Three.js single-page app; all geometry is procedural. The diorama sits on a 20×20 square base with a dark wood-grain plinth. A corner of a Japanese neighbourhood is arranged around a 24-hour konbini whose lit glass curtain faces the south street / corner crossing:

- Exterior: striped fascia sign ("SOL MART 24h"), broad glass storefront, automatic sliding door with sensor header, eave awning, entrance mats, vending machine, bicycle, umbrella stand, bin, streetlight, two utility poles with sagging wires, street sign "一番町", corner guardrail, marked bicycle parking, drainage grate, wet reflective road with zebra crossings, alley entrance with boxes and a small lamp, outdoor AC unit, and a poster board.
- Interior (visible through the glass): back-wall and island shelves stocked with coloured packages, a lit refrigerated drinks case with bottle rows, checkout counter with till screen and coffee machine, oden counter with glowing glass hood, bento / prepared-food case, magazine stand, upright freezer, back-room door and lockers, lit wall posters, floor guidance arrows, a window-side snack shelf, and a door-side "24h OPEN" standing lightbox.
- Art direction: `MeshToonMaterial` with a 4-step gradient map, `BackSide` outline shells on key props, ACES tone mapping, cool night ambient plus warm interior point lights, additive glow planes on the fascia / lamps / vending face, and a blue-grey wet-road material.
- Animation: instanced rain streaks, eave drips falling from the awning lip, expanding puddle-ripple rings and additive splash rings, water streaks sliding down the storefront glass, fascia / lightbox flicker, an automatic door that slides open and shut on a 9 s cycle, and a red/yellow/green traffic-signal loop.
- No people, no visible UI. Orbit / pan / zoom via `OrbitControls` with damping and distance limits.

## Verification run

All commands below were run from `tasks/rainy-konbini-diorama/solution/` unless noted.

| Command | Observed result |
| --- | --- |
| `node --check src/world.js` and `node --check src/main.js` | Both passed. |
| `npm install --no-audit --no-fund` | Passed; installed 16 packages and produced `package-lock.json`. |
| `npm run build` | Passed; Vite 8.3.1 emitted `index.html` plus hashed JS/CSS assets in `dist/` in ~165 ms. |
| `npm run preview -- --port 4199 --strictPort` | Served the production build locally. Stopped after verification. |

Vite emitted one non-failing advisory: the bundled JS is ~606 kB before gzip (~152 kB gzip), above the 500 kB threshold. No tests, task inputs, or repository rules were modified.

## Browser inspection

Verified through the connected Kimi WebBridge Chrome session, with `Emulation.setDeviceMetricsOverride` set to a measured **1440 × 900** CSS viewport.

- First paint: single canvas, no UI controls, no people; the full square base and street corner read as a miniature diorama, with the konbini at the visual centre.
- Drag / orbit / zoom all respond; rotating exposes the alley, side AC unit, rear wall door, utility poles and wires; zooming in through the glass shows stocked shelves, the drinks cooler, checkout, coffee machine, oden hood, magazine stand, freezer, lockers, guidance arrows, and lightboxes.
- Observed continuously for >60 s: rain, eave drips, puddle ripples and splash rings, glass runoff streaks, lamp glow breathing, fascia / lightbox flicker, and the traffic signal cycling green → yellow → red. Two timed captures show the signal in green and dimmed phases.
- `location.reload()` between checks produced no console errors and no failed asset requests (only HTML, JS, CSS, favicon served by Vite).

Saved visual evidence under `evidence/`: `shot-initial.jpg`, `shot-initial2.jpg`, `shot-rotated.jpg`, `shot-zoom.jpg`, `shot-front.jpg`, `door-A.jpg`, `door-B.jpg`, `shot-storefront.jpg`, `shot-final.jpg`, `shot-60s.jpg`.

## Limitations and intervention

- Requires a WebGL-capable browser. Small drips / glass streaks are easiest to see when zoomed toward the storefront.
- Vite's bundle-size advisory is the only build warning observed.
- **Required human intervention:** none for the candidate itself. The isolated "clone" was realised as a detached `git worktree` under `.worktrees/rainy-swe2` per the repository worktree convention (this avoids the Windows sandbox failure documented in earlier `RESULTS.md` files, where `git clone --no-local` could not create a file mapping). The worktree was detached at baseline `63a46c3`, had no remote configured, and the candidate commit was created there before being fetched into the main repository for tagging and import.
