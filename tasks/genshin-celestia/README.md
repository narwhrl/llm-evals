# Genshin Celestia Evaluation

## Task Record

- Task ID: `genshin-celestia`
- Canonical candidate path: `tasks/genshin-celestia/solution/`
- Candidate result report: `tasks/genshin-celestia/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)

## Shared Inputs

This task intentionally provides no starter project, fixed executable tests, or reference images. Scene construction, rendering approach, and asset strategy are part of the evaluated response. Every candidate must receive the same repository baseline, task prompt, tool permissions, runtime conditions, browser viewport, and review procedure.

The prompt asks for a faithful rendition of Celestia as it appears in *Genshin Impact*. Runs are offline and may not search the web, so each candidate works from its own knowledge of that appearance; reviewers judge recognizability against the in-game distant view.

The original prompt also asked for the final delivery to be a single HTML file. That requirement was removed so every candidate delivers the same kind of project and is built and served the same way.

The deliverable must run locally in a browser and support a production build without services that require credentials. Each model writes its code and result report under the canonical candidate path in its isolated clone; the curator archives the completed tree under that model's candidate ID.

## Evaluation Procedure

Before starting a round:

1. Designate the current `main` commit as the shared baseline and record its full SHA in every candidate result report.
2. Create each isolated model clone from that exact SHA according to the repository workflow.
3. Evaluate every candidate in the same browser/runtime at a `1440 × 900` desktop viewport.
4. Load the scene from a clean browser session and wait for its documented initialization path. Confirm that the first view, without any input, is a cinematic three-quarter distant shot of the whole island with no characters, gameplay, or UI.
5. Judge the overall silhouette before inspecting details: a giant central rock island, a ring of roughly seven or eight floating islets joined by white arched bridges, ring roads, and colonnades, a very tall white multi-tier spire, and a large armillary of interlocking gold rings on its top. Record whether it reads as Celestia rather than a generic floating island or Greek temple.
6. Inspect the central island's grass, trees, and white buildings, and the huge inverted rock face beneath it with faintly visible ancient structures. Inspect vegetation, suspended waterfalls, broken stone bridges, ruined spires, and floating debris between the islands.
7. Inspect the sky: sea of clouds, soft golden sunlight, volumetric light shafts, aerial perspective, and a distant Teyvat continent faintly visible below the clouds. Check that vertical drop and layered depth convey extreme scale.
8. If the candidate provides camera controls or animation, inspect other angles and observe the running scene for at least 60 seconds.
9. Run the candidate's documented production build command and local runtime command. Record the exact commands, results, browser observations, console failures, and any asset-loading failures. Recycle any development server after verification.

Each candidate result report must also include the complete model identifier, known limitations or failures, and any required human intervention, as required by the repository rules.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Celestia recognizability:** the default shot is immediately identifiable as Celestia through its signature silhouette of central rock island, outer ring of islets and bridges, tall white spire, and gold armillary.
- **Central island and sanctum:** the irregular main rock and its spire dominate the scene; the spire has a refined pinnacle, arcades, columns, and stacked tiers; the gold armillary is built from several interlocking rings; the inverted underside is massive and rugged.
- **Ring structure:** roughly seven or eight floating islets of varied size are linked by grand white arched bridges, ring roads, and colonnades into a readable ring outline.
- **Architectural language:** ivory stone, pale-gold ornament, slender spires, complex arched bridges, and sacred geometry in a refined anime-fantasy style, avoiding Greek-temple or science-fiction cities.
- **Nature, ruins, and atmosphere:** greenery, suspended waterfalls, broken bridges, ruined spires, and floating debris convey age; the sky has a sea of clouds, golden light, volumetric shafts, aerial perspective, and a distant Teyvat continent; vertical drop and layered distance convey extreme scale.
- **Rendering quality:** *Genshin Impact*-style toon fantasy rendering with clear colors, detailed architecture, soft lighting, and real three-dimensional volume.
- **Runtime quality:** the project uses Three.js with TypeScript, the page opens directly into the default shot, the production build succeeds, assets load without credentials or a backend, and the scene remains stable during inspection.

Do not infer quality from dependency count, mesh count, source size, or nominal feature claims. Comparison conclusions require observed browser behavior, build evidence, and path-aligned candidate diffs from the same baseline.
