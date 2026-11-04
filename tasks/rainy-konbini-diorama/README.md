# Rainy Konbini Diorama Archive

Candidates for `rainy-konbini-diorama`. Task inputs and the evaluation procedure are on `main` at [`tasks/rainy-konbini-diorama/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/rainy-konbini-diorama).

- `solutions/<candidate-id>/` is the exact `tasks/rainy-konbini-diorama/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records every import.
- `inputTree` in a record is the `tasks/rainy-konbini-diorama` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.
- `notes/` keeps the agent session plans recorded for some runs.

## Provenance

- `gpt-6-sol`, `minimax-m3.1-flash-preview`, `claude-opus-5.5`, `glm-5.3`, `mimo-v2.6-flash`, `kimi-k3`, `gpt-5.6-sol`, `gpt-6.1-sol`, and `swe-2` are pinned to `main` baselines `eac83c1`, `7f83cb6`, `087676f`, `7c210c2`, `7c210c2`, `ac801cf`, `ac801cf`, `a7bd9a7`, and `63a46c3` respectively. The task prompt is byte-identical across all nine, so only the recorded provenance differs.
- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/rainy-konbini-diorama`), tagged `candidate/rainy-konbini-diorama/minimax-m3.1-flash` at commit `268291f` (tree `1da342a`), and imported with a result report (RESULTS.md).
- `kimi-k3.1-pro` (`kimi-code-cn/k3.1-pro`) was produced from the `b4585b3` baseline in an isolated local clone (`.runs/rainy-konbini-diorama/kimi-k3.1-pro`), tagged `candidate/rainy-konbini-diorama/kimi-k3.1-pro` at commit `acf3521` (tree `1cfa5a6`), and imported with a result report (RESULTS.md).
- `deepseek-v4.1-flash` (`deepseek-v4.1-flash`, DeepSeek Harness `devin/deepseek-v4-1-flash-1017`) was produced from the `091c801` baseline in an isolated worktree (`.worktrees/rainy-deepseek-v4.1-flash`), tagged `candidate/rainy-konbini-diorama/deepseek-v4.1-flash` at commit `c207635` (tree `852f9d2`), and imported with a result report (RESULTS.md).
