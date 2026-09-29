# Candidate: `rainy-konbini-diorama` / `minimax-m3.1-flash-preview`

Model: `minimax/MiniMax-M3.1-Flash-Preview` · Task branch: `llm/rainy-konbini-diorama` · Baseline: `7f83cb6` (current main tip, remote-confirmed)

## 0. Isolation

Create `.runs/rainy-konbini-diorama/minimax-m3.1-flash-preview/` exactly per `README.md` §Standard Evaluation Workflow step 3 — `git clone --no-local --single-branch --branch main --no-tags`, `checkout --detach 7f83cb6`, `remote remove origin`. I write only to `tasks/rainy-konbini-diorama/solution/` inside it. The permanent `main` checkout stays on `main` and is never used for authoring.

**Honesty note:** during planning I used three read-only `Explore` subagents to survey the repo. All candidate authoring, code review, and visual acceptance will be done by me alone, with no subagents and no other models, per your instruction.

## 1. Implementation — my own, from `task.md` only

I will not read or reuse `solutions/gpt-6-sol/`'s source. Built from the prompt: square base, third-person orbit, no UI, no people, 三渲二 anime toon.

**Stack** (matches every diorama candidate in this repo): plain ES modules + Three.js `0.186.1` + Vite `8.3.1`, no React, no external asset service. All textures generated on a `<canvas>` at runtime.

**Layout**

```
tasks/rainy-konbini-diorama/solution/
├── index.html          # canvas host only, zero DOM UI
├── package.json        # dev / build / preview scripts, Vite --base compatible
├── package-lock.json   # committed (gallery build.mjs runs `npm ci`)
├── .gitignore          # node_modules/, dist/, dist-gallery/
├── README.md           # run + build instructions
├── RESULTS.md          # written last, after verification
├── public/favicon.svg
├── evidence/*.jpg      # screenshots I captured during acceptance
└── src/
    ├── main.js         renderer, camera, OrbitControls, loop, resize, visibilitychange
    ├── style.css       full-bleed, cursor grab/grabbing
    ├── palette.js      night colour tokens
    ├── kit.js          toon material + gradient map + inverted-hull outline,
    │                   box/cylinder/rod primitives, canvas texture + text panel
    ├── world.js        assembly + update(t)
    ├── parts/base.js       square plinth, kerb, drainage channel
    ├── parts/store.js      shell, broad glass, auto door, awning, sign, lightbox, mat
    ├── parts/interior.js   shelves, drinks, bento/onigiri, snacks, counter,
    │                       coffee, magazines, promo posters, freezer, oden,
    │                       floor guidance, storage + back-room door
    ├── parts/street.js     road turn, reflective crosswalk, alley, guardrail,
    │                       parking bay, puddles, distant traffic signal
    ├── parts/props.js      vending machine, bicycle, umbrella stand, bins,
    │                       streetlight, pole + wires, road sign, AC unit, notice board
    └── parts/weather.js    rain, eave drips, puddle ripples, glass runoff,
                            sign flicker, auto-door cycle, signal variation
```

**Key rendering decisions**
- *三渲二:* `MeshToonMaterial` with a 3-step `DataTexture` gradient map + inverted-hull `BackSide` outline shells for crisp anime linework.
- *Warm/cool contrast:* cool hemisphere + moon key outside; warm emissive ceiling panels and point lights inside, so the interior reads bright and full through the broad glass.
- *Wet-night reflections:* stylised vertical smear quads of the sign/lightbox colour on the road plus expanding ripple rings on puddle decals — the anime convention, and far cheaper than a real reflector.
- *Performance:* shared geometry/material caches, one `BufferGeometry` `LineSegments` rain volume with wrap-around, no per-frame allocation in `update(t)`.

## 2. Verification — I inspect the screenshots myself

Following the task README's 8-step procedure at a 1440 × 900 viewport, using **kimi-webbridge** against the user's real Chrome (no `visual-judge` subagent, no IAB).

- Build/preview: `node --check` each source file → `npm run build` → `npm run build -- --base=/rainy-konbini-diorama/minimax-m3.1-flash-preview/ --outDir=dist-gallery --emptyOutDir` → `npm run preview` on a **run-unique port 4193** with `--strictPort` (parallel sessions have fought over 4173 before), launched via PowerShell `Start-Process` so it survives wrapper exit.
- Browser: confirm `<title>` over `curl --noproxy '*'` before trusting any shot (a stale server has silently served the wrong app in past runs); `Page.addScriptToEvaluateOnNewDocument` console collector; `cdp Input.dispatchMouseEvent` for drag/wheel; record real `innerWidth/innerHeight` and DPR rather than assuming the override applied.
- Capture: initial framing, interior through glass (wide + zoomed), street turn and alley, side/rear to prove everything sits on the base, timed auto-door open/close pair, and a ≥60 s stability pass.
- **I read every screenshot with the Read tool and judge them myself** against the README's six review axes; brightness checked numerically on the first shot per the night-toon lesson in memory.
- Save accepted shots to `evidence/`, write `RESULTS.md` with model id, baseline `7f83cb6`, exact commands and observed results, limitations, and the human-intervention record.

## 3. Tag, import, sync

1. Commit in the clone: `feat: build rainy konbini diorama candidate`.
2. `git fetch --no-tags .runs/rainy-konbini-diorama/minimax-m3.1-flash-preview <sha>` into the main repo; **annotated** tag `candidate/rainy-konbini-diorama/minimax-m3.1-flash-preview` per the established format.
3. Import in the existing worktree `~/.codex/worktrees/rainy-konbini-archive/llm-evals` (already on `llm/rainy-konbini-diorama` @ `d2f3824`) via `git read-tree --prefix=tasks/rainy-konbini-diorama/solutions/minimax-m3.1-flash-preview/ -u <tag>:tasks/rainy-konbini-diorama/solution`. Verify hashes with `git write-tree` + `rev-parse <tree>:<path>` — `git rev-parse :<path>` misreports on Windows after `read-tree --prefix -u`.
4. Branch commit `feat: import minimax-m3.1-flash-preview rainy konbini candidate`: solution tree + `imports.json` entry (candidateId, model, baselineMain `7f83cb6`, sourceRef, sourceCommit, sourceTree, archiveTag, destination, resultReport) + task README `Status:` line → "Two candidates archived…".
5. `main` docs commit `docs: record minimax-m3.1-flash-preview rainy konbini import`: root README table row `No archived candidates` → `llm/rainy-konbini-diorama`, plus the task README count. **This also closes the pre-existing stale gpt-6-sol gap** — both candidates now show correctly. No candidate code on `main`.
6. Record in `RESULTS.md` that this candidate's baseline `7f83cb6` differs from gpt-6-sol's `eac83c1`, that `git diff eac83c1 7f83cb6` touches only three unrelated task README status lines so the task inputs are byte-identical, and that the two candidates therefore do not share one pinned baseline — a fact the curator should weigh in any comparison.

## 4. Push and gallery

- `git push origin llm/rainy-konbini-diorama` and `git push origin main` (branch first — `deploy/build.mjs` discovers candidates from `origin/llm/*` refs).
- `node deploy/build.mjs rainy-konbini-diorama/minimax-m3.1-flash-preview` — targeted rebuild; `collectPublished()` re-scans `deploy/public/` so the index still lists every previously published candidate.
- `cd deploy && npx wrangler deploy` — publishes to the public gallery at `https://llm-evals-result.narwh.dev/rainy-konbini-diorama/minimax-m3.1-flash-preview/`.
- Then verify the live URL actually serves the candidate before declaring done.

If Wrangler's session is unauthenticated, or anything in the push/deploy step needs a credential I don't have, I'll stop and report rather than work around it.