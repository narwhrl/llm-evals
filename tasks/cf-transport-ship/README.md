# 运输船 Evaluation

## Task Record

- Task ID: `cf-transport-ship`
- Canonical candidate path: `tasks/cf-transport-ship/solution/`
- Candidate result report: `tasks/cf-transport-ship/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: No archived candidates. The task is ready for a new evaluation round from a pinned `main` baseline.

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Map construction, weapon feel, bot behavior, rendering, and asset strategy are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The deliverable must run locally in a browser and support a production build without services that require credentials. Runtime must not depend on remote art or audio. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

The map is a playable reconstruction of the classic PC CrossFire team-deathmatch layout 「运输船」. Candidates select one consistent reference version, document the evidence for routes and sightlines, and mark unsupported details as approximations. Official game assets, trademarks, logos, character models, textures, audio, and extracted data are not allowed. Similarity is judged from spatial routes, sightlines, cover types, and the gunfight, not from copied art.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser at a `1440 × 900` desktop viewport.
4. Inspect the candidate's `docs/MAP_REFERENCE.md` and reference evidence before judging routes, sightlines, or uncertain map details. Check that the selected reference version is consistent and that estimated dimensions are identified as such.
5. Install, run the documented dev command, and play from a clean session. Follow A01–A32 in `task.md`, recording each item as passed, failed, or unverified with its actual steps and evidence. Confirm the documented main and flank routes, collision, jump access, key sightlines, and wood-versus-metal bullet behavior. Require an under-deck connection only if supported by the selected version's evidence.
6. Fight the bots until a kill, a death, a respawn, and a completed match have occurred. Confirm real combat, reload and ammunition limits, weapon differences, grenades, smoke visibility, scoring, and multiple bot routes.
7. Run the documented production build, including a non-root `--base` and `--outDir` build. Serve and play the production output, checking that all runtime assets load locally. Record the exact commands, results, browser observations, console failures, and asset failures. Recycle any development server afterward.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Ship and routes:** a readable cargo ship with two end spawn areas, a documented main firefight lane, confirmed flank routes, and consistent elevations, openings, and cover placement against the selected reference version.
- **Tactical landmarks:** penetrable wood, impenetrable metal, diagonal central cargo, jumpable crate groups, high positions, and documented asymmetry between the camps. Assess any under-deck route against the reference evidence rather than presuming one.
- **Gunfight:** first-person shooting with distinct weapons, recoil and spread, headshots, reload and ammo limits, grenades, smoke that blocks vision, hit feedback, death, and respawn.
- **Opposition:** bots path along the documented routes, acquire visible targets, fire, reload, and create a match that can end on kills or time.
- **Presentation:** deck, hull, sea, and sky read as a ship; characters and viewmodels are recognizable; HUD, minimap, score, and audio make the fight legible at 1440×900.
- **Packaging:** the Vite production build honors `--base` and `--outDir`, dependencies are locked, no credentialed or remote art/audio service is required, and no server is left running.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed play, build evidence, and path-aligned candidate diffs from the same baseline.
