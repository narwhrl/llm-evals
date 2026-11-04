# Voxel Chinese Architecture Archive

Candidates for `voxel-chinese-architecture`. Task inputs and the evaluation procedure are on `main` at [`tasks/voxel-chinese-architecture/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/voxel-chinese-architecture).

- `solutions/<candidate-id>/` is the exact `tasks/voxel-chinese-architecture/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records imports after the 2026-09-28 migration; migrated candidates are recorded in [`migration/2026-09-28.json`](https://github.com/narwhrl/llm-evals/blob/main/migration/2026-09-28.json) on `main`.
- `inputTree` in a record is the `tasks/voxel-chinese-architecture` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.
- `notes/` keeps the agent session plans recorded for some runs.

## Provenance

- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/voxel-chinese-architecture`), tagged `candidate/voxel-chinese-architecture/minimax-m3.1-flash` at commit `b125186` (tree `e5bb5e6`), and imported with a result report (RESULTS.md).
- Gallery publication evidence for `gpt-6.1-sol` is in [`publication-gpt-6.1-sol.md`](publication-gpt-6.1-sol.md).
