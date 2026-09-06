# Voxel Chinese Architecture Evaluation

## Task Record

- Task ID: `voxel-chinese-architecture`
- Canonical candidate path: `tasks/voxel-chinese-architecture/solution/`
- Candidate result report: `tasks/voxel-chinese-architecture/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: Prepared on `main`; no evaluation round or candidate branch has started.

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Scene architecture, voxel construction method, framework choice (React or vanilla), camera presentation, and asset strategy are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The deliverable must run locally in a browser and support a production build without services that require credentials. Candidate code and its result report belong under the canonical candidate path; model identity belongs only in the candidate branch and worktree path.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each candidate branch and linked worktree from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session and wait for its documented initialization path. Confirm that the first view already shows the full architectural ensemble without requiring user input.
5. Inspect the scene from the default framing and, if orbit/zoom controls exist, from multiple angles and elevations. Confirm axial courtyard composition, circulation, building hierarchy, roof forms, structural members, color system, ground treatment, and lighting.
6. Run the candidate's documented production build command and local runtime command. Record the exact commands, results, browser observations, console failures, and any asset-loading failures. Recycle any leftover development servers after verification.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Ensemble hierarchy:** at least five buildings; the main hall is the largest mass on the central axis; side halls sit symmetrically beside it; a mountain gate marks the front entrance; one or two pagodas or bell/drum towers are present and readable.
- **Axial courtyard layout:** mid-axis symmetry, courtyard spacing large enough for roads and yards at voxel scale, and a clear circulation path of mountain gate → courtyard → main hall.
- **Classical Chinese form:** flying eaves and upturned corners; identifiable roof types such as xieshan, wudian, or cuanjian; dougong, columns, and steps; red walls, glazed or grey tiles, and wood-colored members.
- **Voxel craft and detail:** Minecraft-like block assembly rather than smooth mesh architecture; doors, windows, lanterns, stone lions, or equivalent details increase density without collapsing the silhouette.
- **Ground and lighting:** paving and/or grass meet building footprints; a directional light with shadows produces readable depth; optional dawn/dusk grading supports atmosphere if used.
- **Runtime quality:** the page opens directly into a full-scene view, the production build succeeds, assets load without credentials or a backend, and the scene remains stable during inspection.

Do not infer quality from dependency count, voxel count claims, source size, or nominal feature lists. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
