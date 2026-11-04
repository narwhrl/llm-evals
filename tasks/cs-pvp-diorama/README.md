# CS PVP Diorama Archive

Candidates for `cs-pvp-diorama`. Task inputs and the evaluation procedure are on `main` at [`tasks/cs-pvp-diorama/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/cs-pvp-diorama).

- `solutions/<candidate-id>/` is the exact `tasks/cs-pvp-diorama/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records imports after the 2026-09-28 migration; migrated candidates are recorded in [`migration/2026-09-28.json`](https://github.com/narwhrl/llm-evals/blob/main/migration/2026-09-28.json) on `main`.
- `inputTree` in a record is the `tasks/cs-pvp-diorama` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.
- `notes/` keeps the agent session plans recorded for some runs.

## Provenance

- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/cs-pvp-diorama`), tagged `candidate/cs-pvp-diorama/minimax-m3.1-flash` at commit `e08f8c5` (tree `f9653f4`), and imported with a result report (RESULTS.md).
- `deepseek-v4.1-flash` (`deepseek-v4.1-flash (DeepSeek Harness, qoder-cn/dfmodel)`) was produced from the `091c801` baseline in an isolated worktree (`.worktrees/run-cs-pvp-deepseek`), tagged `candidate/cs-pvp-diorama/deepseek-v4.1-flash-2026-10` at commit `0bfd404` (tree `d848485`), and imported with a result report (RESULTS.md).
