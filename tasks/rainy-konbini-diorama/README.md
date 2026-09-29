# Rainy Konbini Diorama Evaluation

## Task Record

- Task ID: `rainy-konbini-diorama`
- Canonical candidate path: `tasks/rainy-konbini-diorama/solution/`
- Candidate result report: `tasks/rainy-konbini-diorama/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Status: Four candidates archived on `llm/rainy-konbini-diorama` at `tasks/rainy-konbini-diorama/solutions/<candidate-id>/`: `gpt-6-sol`, `minimax-m3.1-flash-preview`, `claude-opus-5.5`, and `glm-5.3`. Source commits and trees are recorded in [`imports.json`](imports.json) on the task branch. Each candidate is pinned to a different `main` baseline (`eac83c1`, `7f83cb6`, `087676f`, and `7c210c2`). The task prompt is byte-identical across all four, so only the recorded provenance differs.

## Shared Inputs

This task intentionally provides no starter project or fixed executable tests. Rendering engine, web framework, asset strategy, scene construction, and interaction implementation are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The deliverable must run locally in a browser and support a production build without services that require credentials. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session and wait for its documented initialization path. Confirm that the initial view presents the complete square base and a readable street corner without visible UI or people.
5. Exercise pointer drag, orbit, and zoom. Inspect the street turn, storefront, alley entrance, roads, props, and base from multiple angles and zoom levels; check that all scene elements remain on the base.
6. Inspect the convenience-store interior through its glass storefront. Check that the store is visibly furnished and lit, and that the requested warm indoor and cool rainy outdoor contrast remains legible from useful viewing angles.
7. Observe the running scene for at least 60 seconds to inspect rain, eave drips, puddle ripples and reflections, glass runoff, sign or lightbox flicker, occasional automatic-door movement, and distant traffic-signal variation.
8. Run the candidate's documented production build command and local runtime command. Record exact commands, results, browser observations, console failures, and asset-loading failures. Recycle any development server after verification.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Miniature composition:** one complete square base, all scene content contained on it, a compact and layered collectible-model silhouette, a clear third-person view, and an immediately readable convenience store at the visual center.
- **Street-corner fidelity:** a distinct street turn and small alley; storefront sign, broad glass windows, automatic door, awning, entrance mat, vending machine, bicycle, umbrella stand, bins, streetlight, pole and wires, signs, guardrail, parking area, drainage, wet road, reflective crosswalk, outdoor AC unit, and notice or poster board are represented coherently.
- **Visible store interior:** inspect the density and variety of furnishings visible through the glass against the prompt's examples, including shelves and merchandise, drinks, prepared food and snacks, checkout, coffee, magazines, promotional displays, freezer, oden counter, floor guidance, and storage or back-room access. The combined interior should read as bright, warm, and credible; the examples are illustrative rather than an added checklist of mandatory props.
- **Art direction and lighting:** detailed three-dimensional forms rendered with a two-dimensional anime feel; crisp outlines, clean restrained materials, soft layered neon, wet nighttime reflections, and strong warm-store/cool-street contrast support a quiet, healing urban-night mood.
- **Subtle motion:** continuous rain, eave drips, puddle ripples, water on glass, changing road reflections, restrained sign or lightbox flicker, occasional automatic-door movement, and faint traffic-signal variation animate the otherwise still miniature.
- **Interaction and runtime quality:** drag/orbit/zoom remains responsive over useful viewing ranges; the scene has no visible UI or people; production build succeeds; assets load reliably; and the scene remains stable during inspection.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
