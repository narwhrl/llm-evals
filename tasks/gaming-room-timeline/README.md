# Gaming Room Timeline Evaluation

## Task Record

- Task ID: `gaming-room-timeline`
- Canonical candidate path: `tasks/gaming-room-timeline/solution/`
- Candidate result report: `tasks/gaming-room-timeline/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Rendering engine, web framework, scene construction, choice of representative years and objects, screen content, and interaction implementation are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The original prompt asked for the delivery to be a single HTML file. That requirement was removed so every candidate delivers the same kind of project and is built and served the same way; the operating notes and network-resource disclosure it asked for move to `solution/README.md`.

The deliverable must run locally in a browser and support a production build without services that require credentials. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session and wait for its documented initialization path. Confirm that the room renders in real time with a 2005–2025 time slider.
5. Drag the slider slowly across the full range and stop at each representative year. Check that the room keeps its basic layout; that computers, monitors, peripherals, desk and chair, game collection, and decor fit each era rather than recoloring one furniture set; that items change in plausible years with natural transitions; and that some old items are stored in a corner or stay in use.
6. Run autoplay across the full range and confirm that it advances and transitions smoothly. Drag the slider during or after autoplay and confirm that manual control still works.
7. Orbit the full room and move close to the desk. Click the clickable objects and read their era notes or owner memories. In several years, check that the computer screen shows an era-appropriate simplified desktop or game interface, and exercise its operable content.
8. Identify the few objects that persist through all twenty years as the emotional thread, and follow them across years.
9. Follow the operating notes in `solution/README.md`. If it declares network resources, confirm that they load; if it declares none, confirm that the scene does not depend on any.
10. Run the candidate's documented production build command and local runtime command. Record the exact commands, results, browser observations, console failures, and any asset-loading failures. Recycle any development server after verification.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Era storytelling:** representative years are well chosen; equipment, furniture, game collection, decor, and signs of daily habits change in era-appropriate ways and tell one person's story from a bedroom computer corner to a full gaming room.
- **Continuity and keepsakes:** the room's layout persists; old items are retired to corners or kept in use; a few objects run through all twenty years as an emotional thread.
- **Timeline control:** the 2005–2025 slider supports manual dragging and autoplay; changes happen in plausible years with natural transitions.
- **Exploration and interaction:** free full-room viewing and close desk inspection work; clicked objects show short era notes or memories; the screen shows an era-appropriate simplified desktop or game interface with a little operable content.
- **Art direction:** a lived-in miniature with real materials, warm light, and moderate detail; early years read cramped and plain, later years mature without every year looking like a new showroom; era change is not carried by RGB lighting alone.
- **Runtime quality:** the operating notes are accurate, network dependencies are disclosed, the production build succeeds, assets load without credentials or a backend, and the scene remains stable during inspection.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
