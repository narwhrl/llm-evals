# Voxel Waterfall Archive

Candidates for `voxel-waterfall`. Task inputs and the evaluation procedure are on `main` at [`tasks/voxel-waterfall/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/voxel-waterfall).

- `solutions/<candidate-id>/` is the exact `tasks/voxel-waterfall/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records imports after the 2026-09-28 migration; migrated candidates are recorded in [`migration/2026-09-28.json`](https://github.com/narwhrl/llm-evals/blob/main/migration/2026-09-28.json) on `main`.
- `inputTree` in a record is the `tasks/voxel-waterfall` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.

## Provenance

- Original shared baseline: `5945154ab7bd4a9e080f50f4efa4bbef472f7f4d`.
- `glm-5.3-flash` was produced from the `8409ab9` baseline in an isolated clone and imported with a result report (RESULTS.md). `swe-2` was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/swe2-voxel-waterfall`), tagged `candidate/voxel-waterfall/swe-2` at commit `175da47fd5205da25684a55bbb399f011402ccb3` (tree `fcefaf92a1184e19e07619da8976831f609fa99f`), and imported with a result report (RESULTS.md).
- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/voxel-waterfall`), tagged `candidate/voxel-waterfall/minimax-m3.1-flash` at commit `b174dfc` (tree `14e7dff`), and imported with a result report (RESULTS.md).
- `deepseek-v4.1-flash` (`deepseek-v4.1-flash (DeepSeek Harness, qoder-cn/dfmodel)`) was produced from the `091c801` baseline in an isolated worktree (`.worktrees/run-voxel-waterfall-deepseek`), tagged `candidate/voxel-waterfall/deepseek-v4.1-flash-2026-10` at commit `39ba51e` (tree `67f4bae`), and imported with a result report (RESULTS.md).

| Retired branch | Model | Original candidate commit |
| --- | --- | --- |
| `llm/voxel-waterfall/gpt-5.6-sol` | GPT-5.6-SOL | `d20eeecec9f67dfe12464e7598aaa1e3494a0a55` |
| `llm/voxel-waterfall/grok-4.6` | Grok 4.6 | `ca10235699c41814f71ee4d44198eb0f08b0c7fa` |

The original candidate histories remain available through `candidate/voxel-waterfall/<candidate-id>` tags.
