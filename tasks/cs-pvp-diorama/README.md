# CS PVP Diorama Evaluation

## Task Record

- Task ID: `cs-pvp-diorama`
- Canonical candidate path: `tasks/cs-pvp-diorama/solution/`
- Candidate result report: `tasks/cs-pvp-diorama/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: Prepared on `main`; no evaluation round or candidate branch has started.

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Rendering engine, web framework, asset strategy, scene architecture, and interaction implementation are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The deliverable must run locally in a browser and support a production build without services that require credentials. Candidate code and its result report belong under the canonical candidate path; model identity belongs only in the candidate branch and worktree path.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each candidate branch and linked worktree from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session, wait for its documented initialization path, and inspect it from multiple orbit angles and zoom levels.
5. Exercise pointer drag/orbit and zoom controls; confirm that interaction remains responsive and that no visible UI, people, or geometry outside the square base appears.
6. Inspect the four core regions, three route families, elevated positions, interiors, cover distribution, environmental props, lighting, materials, reflections, and subtle dynamic effects against the prompt.
7. Run the candidate's documented production build command and local runtime command. Record the exact commands, results, browser observations, console failures, and any asset-loading failures.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Diorama composition:** one complete square concrete base, compact balanced silhouette, collectible miniature scale, all scene content contained within the base;
- **Map topology:** readable T spawn, CT spawn, A site, and B site connected by the central duel lane, left flanking alley, and right elevated flank, with credible sightlines and height variation;
- **Regional fidelity:** the major structures, access points, tactical positions, interiors, cover, and signature props specified for every region are visibly represented;
- **Environment detail:** wet asphalt and concrete, puddles, drainage, wires, corrosion, graffiti, freight markings, bullet impacts, and the requested family of tactical props form a coherent abandoned freight-yard streetscape;
- **Art direction:** crisp toon-rendered outlines, restrained hard-surface materials, cool industrial rain-night ambience, and deliberate warm/cool/red tactical light contrast create the requested realistic-cartoon weight;
- **Dynamic atmosphere:** rain, dripping and running water, puddle ripples and reflections, restrained light variation, steam, shutter vibration, and occasional lightning add life without undermining the static miniature presentation;
- **Interaction and runtime quality:** direct full-scene presentation has no visible UI or people, orbit/drag/zoom viewing works across useful ranges, the production build succeeds, assets load reliably, and the scene remains stable during inspection.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
