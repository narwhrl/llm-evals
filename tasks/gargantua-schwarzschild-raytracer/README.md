# GARGANTUA — Schwarzschild Black Hole Raytracer Archive

Candidates for `gargantua-schwarzschild-raytracer`. Task inputs and the evaluation procedure are on `main` at [`tasks/gargantua-schwarzschild-raytracer/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/gargantua-schwarzschild-raytracer).

- `solutions/<candidate-id>/` is the exact `tasks/gargantua-schwarzschild-raytracer/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records imports after the 2026-09-28 migration; migrated candidates are recorded in [`migration/2026-09-28.json`](https://github.com/narwhrl/llm-evals/blob/main/migration/2026-09-28.json) on `main`.
- `inputTree` in a record is the `tasks/gargantua-schwarzschild-raytracer` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.
- `notes/` keeps the agent session plans recorded for some runs.

## Provenance

- `cursor-c343` has no confirmed model ID or result report.
- `glm-5.3-flash` and `opus-5.5` were produced from the `8409ab9` baseline in isolated clones and imported with result reports.
- The `deepseek-v4.1-flash` rerun from the `63a46c3` baseline superseded the earlier `703a8da` revision at the same path, whose tag remains available for audit; the current record is in [`imports.json`](imports.json).
- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/gargantua-schwarzschild-raytracer`), tagged `candidate/gargantua-schwarzschild-raytracer/minimax-m3.1-flash` at commit `2cbeadd` (tree `cc15752`), and imported with a result report (RESULTS.md).
- `kimi-k3.1-pro` (`Kimi-K3.1-Pro`) was produced from the `b4585b3` baseline in isolated clone `.runs/gargantua-schwarzschild-raytracer/kimi-k3.1-pro`, tagged `candidate/gargantua-schwarzschild-raytracer/kimi-k3.1-pro` at commit `6fb01ee` (tree `7aec369`), and imported with a result report (RESULTS.md).
