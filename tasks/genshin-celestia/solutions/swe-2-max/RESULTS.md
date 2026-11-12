# Results — genshin-celestia

## Model

- **Model:** SWE-2:max — Codex model ID `devin/swe-2`, routed via magpie provider, reasoning effort `max`, Full permission.
- **Baseline `main` commit:** `d16fa111d3b6651e11d7c38e8773f7228b4edeb6`
- **Candidate commit:** single squashed feat commit containing only `tasks/genshin-celestia/solution/` — see `git log` for the recorded SHA.
- **Isolation:** no subagents, no other model APIs/sessions, no image models; all work done by this single Codex CLI session in the isolated run folder.

## Environment

- Node.js `v24.21.0`, npm `11.19.0`, Windows 11, PowerShell.
- three `0.170.0`, typescript `5.9.3`, vite `6.4.6`.
- Reviewed in headless Chrome at `1440×900`.

## Verification

Commands actually run, with observed results:

| Command | Result |
| --- | --- |
| `npm install` | OK — 0 vulnerabilities. |
| `npx tsc` | OK — 0 errors. |
| `npm run build` | OK — `dist/index.html` (1.58 kB) + `dist/assets/index-*.js` (532 kB, gzip 137 kB). |
| `npm run build -- --base /genshin-celestia/swe-2-max/ --outDir dist-sub` | OK — emits `dist-sub/` with `/genshin-celestia/swe-2-max/assets/...` URLs. |
| `npm run dev` → `http://localhost:5199` | OK — page loads, scene renders, no runtime console errors. |
| `npm run preview` → `http://localhost:5198` | OK — production bundle renders the same scene. |
| Static server serving `dist-sub/` under `/genshin-celestia/swe-2-max/` → `http://localhost:5197/genshin-celestia/swe-2-max/` | OK — absolute base asset URLs load, scene renders correctly at the required production sub-path. |
| Headless-Chrome screenshot at 1440×900 after ~6 s | OK — first frame shows the full Celestia silhouette (central rock island, ring of islets + bridges, white spire, gold armillary, sea of clouds, god-rays). |

Visual evidence (screenshots) is in the ignored `evidence/` folder: `dev.png` (dev run), `prod.png` (preview), `subpath.png` (production sub-path).

The only browser console line observed was a `404` for `favicon.ico`,
which is expected for a minimal Vite app with no icon asset.

## Known limitations

- The scene is fully procedural (no textures/models); surface detail is
  stylized low-poly rather than photoreal.
- Waterfalls and debris animate, and the camera slowly auto-orbits;
  camera controls are OrbitControls (no cinematic camera path).
- A handful of islet chords/radial spokes are intentionally left broken
  for the ruined look, as requested.
- Build passes; no automated tests were included (task had none) — the
  evaluation is visual/runtime only.

## Required human intervention

None beyond `npm install`, `npm run dev` / `npm run preview`, and opening
the local URL in a browser.
