# Railway Town Diorama Evaluation

## Task Record

- Task ID: `railway-town-diorama`
- Canonical candidate path: `tasks/railway-town-diorama/solution/`
- Candidate result report: `tasks/railway-town-diorama/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Scene construction, track and train motion, web framework (React or vanilla), material and asset strategy, and control implementation are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The original prompt also asked for an extra single-file HTML build named after the work. That requirement was removed so every candidate delivers the same kind of project and is built and served the same way.

The deliverable must run locally in a browser and support a production build without services that require credentials. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session and wait for its documented initialization path. Confirm that the first view, without any input, shows the whole board on a thick, bordered base from an isometric or near-isometric angle, in a warm evening state with sunlight and shadows, and with the train already running.
5. Observe at least two full laps. Confirm that the track is closed and continuous, that it crosses the river on a plausible bridge, that no building blocks the line, and that the locomotive and both cars each follow the track with steady spacing and correct heading through curves rather than turning as one rigid body. Confirm that the train stops at the station for about two seconds on every arrival.
6. Exercise every control: pause while running and while dwelling at the station, and confirm that the cars and the dwell timer both stop and then resume; change the speed; switch to night and back, and confirm that the station, street lights, and some windows glow while the scene stays readable; rotate and zoom over useful ranges.
7. Change the camera, speed, and train position, then reset. Repeat once from a different state and confirm that both resets restore the same initial camera, train position, and speed.
8. Run the candidate's documented production build command and local runtime command. Record the exact commands, results, browser observations, console failures, and any asset-loading failures. Recycle any development server after verification.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Tabletop composition:** a thick, bordered display base holds the whole town; the default isometric or near-isometric view reads as one complete board; the piece looks like a handmade physical model, not a voxel scene.
- **Town planning:** a station, buildings, a river, and a rail crossing over it are present and recognizable; trees, roads, and street lamps build a layered settlement; roads connect the station to the main building areas, so the town reads as planned rather than as separate models placed on a base. Building count, type, scale, and density are the candidate's choice and are judged by composition, not by quantity.
- **Track and train motion:** the closed loop is continuous; the bridge fits the crossing; the locomotive and two cars each follow the track with stable spacing and heading on curves; station dwell is about two seconds on every arrival; motion stays smooth over repeated laps.
- **Materials and lighting:** the wood base, grass, water, and model-building materials are distinguishable; the default evening has warm sunlight and cast shadows; at night the station, street lights, and some windows glow while the scene remains legible.
- **Controls:** run/pause stops both the cars and the dwell timer; speed control works; the day/night toggle works; rotate and zoom are responsive; reset deterministically restores the initial camera, train position, and speed.
- **Runtime quality:** the page opens directly into the full board in its default running state, the production build succeeds, assets load without credentials or a backend, and the scene remains stable during inspection.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
