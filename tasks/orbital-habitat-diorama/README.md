# Orbital Habitat Diorama Evaluation

## Task Record

- Task ID: `orbital-habitat-diorama`
- Canonical candidate path: `tasks/orbital-habitat-diorama/solution/`
- Candidate result report: `tasks/orbital-habitat-diorama/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: No archived candidates. The task is ready for an evaluation round from a pinned `main` baseline.

## Shared Inputs

This task intentionally provides no starter project, fixed executable tests, or reference images. Rendering engine, scene construction, texture and asset strategy, and interaction implementation are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The original prompt referred to a `style_ref.png` style reference and pre-generated `earth_day.png` / `earth_night.png` textures. Those files are not part of the baseline, so the prompt was rewritten to state the composition and density requirements directly and to require candidates to supply their own locally stored Earth textures with recorded provenance. The original's staged user sign-off and mandatory sub-agent split were removed because an isolated, unattended run cannot wait for confirmation and not every model has sub-agents; candidates may still organize their own work that way. The original `/output` folder was replaced by `solution/evidence/` so all deliverables stay under the canonical candidate path.

The deliverable must run locally in a browser and support a production build without services that require credentials. Runtime must not depend on remote art. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session. Confirm an orthographic isometric first view with no visible UI, in which the large porthole on the rear wall and the Earth behind it are directly visible and form the visual focus.
5. Exercise drag rotation and zoom. Confirm rotation is limited to angles that keep the interior readable.
6. Observe at least two full 90-second day/night cycles. Check the sharp sunlight patch and bright day state, the night-side city lights, the cool rim light on the porthole frame, and that warm interior light keeps the night state readable without crushing to black.
7. Exercise every interaction: click-to-focus on each major fixture and return, dragging the Earth to scrub orbital time and releasing it, clicking the porthole to toggle the 15-second fast-forward cycle, pen avoidance and spin, plant-light toggle, and floor-strip night-cruise toggle. Confirm that click and drag on the porthole are distinguished reliably.
8. Compare the five images in `solution/evidence/` against the running build; they must be reproducible from it.
9. Run the candidate's documented production build, including a non-root `--base` and `--outDir` build. Serve the production output and confirm that all assets load locally. Record the exact commands, results, browser observations, console failures, and asset failures. Recycle any development server afterward.

Each candidate result report must also include the complete model identifier, asset provenance, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Composition:** a true orthographic isometric view of a cut-away capsule module with thick wall and floor sections; the large porthole and Earth dominate the first view against the small cabin.
- **Structure and detail density:** curved riveted wall panels, reinforcing rings, two small portholes, grating floor with a warm light strip, two closed end hatches, and no large blank wall areas; labels, cable bundles, vents, wear, and lived-in clutter at overview distance, with finer texture detail on focus.
- **Furnishing:** the sleeping, work, viewing, plant, fitness, and storage areas described in the prompt, placed coherently for one resident.
- **Lighting and Earth:** a textured 3D Earth with day/night blending, clouds, atmospheric glow, and consistent views through all portholes; a legible 90-second cycle with a sharp sunlight patch and a readable warm-versus-cool night state.
- **Materials and style:** low-poly miniature forms with detailed textures and legible text; no toon outlines, glossy realistic PBR, or plastic look.
- **Motion:** continuous non-colliding floating objects, scrolling screen data, breathing plant light, blinking indicators, swaying zipper pull, and Earth motion through the porthole.
- **Interaction and packaging:** smooth focus transitions, reliable time scrubbing and fast-forward, pen, plant-light, and night-cruise toggles; locked dependencies, a production build that honors `--base` and `--outDir`, local assets, and stable runtime.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
