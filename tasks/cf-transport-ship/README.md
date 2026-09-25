# 运输船 Evaluation

## Task Record

- Task ID: `cf-transport-ship`
- Canonical candidate path: `tasks/cf-transport-ship/solution/`
- Candidate result report: `tasks/cf-transport-ship/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: Prepared on `main`. Candidate implementations belong only on `llm/cf-transport-ship/<model-id>` branches.

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Map construction, weapon feel, bot behavior, rendering, and asset strategy are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The deliverable must run locally in a browser and support a production build without services that require credentials. Runtime must not depend on remote art or audio. Candidate code and its result report belong under the canonical candidate path; model identity belongs only in the candidate branch and worktree path.

The map is a playable reconstruction of the publicly documented CrossFire team-deathmatch layout 「运输船」. Official game assets, trademarks, logos, character models, textures, audio, and extracted data are not allowed. Similarity is judged from spatial routes, sightlines, cover types, and the gunfight, not from copied art.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each candidate branch and linked worktree from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser at a `1440 × 900` desktop viewport.
4. Install, run the documented dev command, and play from a clean session. Confirm pointer lock, movement, crouch, jump, and collision against cabins, containers, crates, railings, stairs, and the under-deck passage.
5. Stand in the defender doorway and confirm a clear eye-level sightline to the attacker doorway. Walk both side lanes and confirm a wooden crate blocks view while a rifle round still damages a target behind it. Enter the right-hand flank passage from spawn, reach the raised end, and confirm the overlook does not expose the enemy spawn interior.
6. Check the asymmetric landmarks: extra cabin volume, diagonal cover, splayed green containers, triple-crate jump, high boxes, and the under-deck route.
7. Fight the bots until a kill, a death, and a respawn have all happened. Confirm reload, ammunition limits, headshots, sniper aim, grenades, smoke, the scoreboard, and the minimap. Confirm bots move, shoot back, and use more than one route.
8. Run the documented production build and confirm `index.html` is emitted. Record the exact commands, results, browser observations, console failures, and asset failures. Recycle any development server afterward.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Ship and routes:** a readable cargo ship with inaccessible bow and stern tips, bow and stern spawn cabins, a clear mid sightline, two side lanes joined to mid, and two spawn-side flank passages ending in an overlook.
- **Tactical landmarks:** penetrable wood, impenetrable metal, diagonal cover, splayed green containers, triple-crate and high-box positions, an under-deck passage, and a visible asymmetry between the camps.
- **Gunfight:** first-person shooting with distinct weapons, recoil and spread, headshots, reload and ammo limits, grenades, smoke that blocks vision, hit feedback, death, and respawn.
- **Opposition:** bots path along the documented routes, acquire visible targets, fire, reload, and create a match that can end on kills or time.
- **Presentation:** deck, hull, sea, and sky read as a ship; characters and viewmodels are recognizable; HUD, minimap, score, and audio make the fight legible at 1440×900.
- **Packaging:** the Vite production build honors `--base` and `--outDir`, dependencies are locked, no credentialed or remote art/audio service is required, and no server is left running.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed play, build evidence, and path-aligned candidate diffs from the same baseline.
