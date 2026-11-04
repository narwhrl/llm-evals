# UI/UX Design Archive

Candidates for `ui-ux-design`. Task inputs and the evaluation procedure are on `main` at [`tasks/ui-ux-design/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/ui-ux-design).

- `solutions/<candidate-id>/` is the exact `tasks/ui-ux-design/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records imports after the 2026-09-28 migration; migrated candidates are recorded in [`migration/2026-09-28.json`](https://github.com/narwhrl/llm-evals/blob/main/migration/2026-09-28.json) on `main`.
- `inputTree` in a record is the `tasks/ui-ux-design` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.
- `notes/` keeps the agent session plans recorded for some runs.

## Provenance

- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/ui-ux-design`), tagged `candidate/ui-ux-design/minimax-m3.1-flash` at commit `49fee6c` (tree `34c5fa6`), and imported with a result report (RESULTS.md).
