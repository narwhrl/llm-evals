# Voxel Waterfall Evaluation

## Round Record

- Task ID: `voxel-waterfall`
- Original shared baseline: `5945154ab7bd4a9e080f50f4efa4bbef472f7f4d`
- Canonical candidate path: `tasks/voxel-waterfall/solution/`
- Archive: Sixteen candidates on `llm/voxel-waterfall` at `tasks/voxel-waterfall/solutions/<candidate-id>/`. Historical source commits and trees are recorded in [`migration/2026-09-28.json`](../../migration/2026-09-28.json); later imports are recorded in [`imports.json`](imports.json).
- Status: `glm-5.3-flash` was produced from the `8409ab9` baseline in an isolated clone and imported with a result report (RESULTS.md). `swe-2` was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/swe2-voxel-waterfall`), tagged `candidate/voxel-waterfall/swe-2` at commit `175da47fd5205da25684a55bbb399f011402ccb3` (tree `fcefaf92a1184e19e07619da8976831f609fa99f`), and imported with a result report (RESULTS.md).
- Status: `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/voxel-waterfall`), tagged `candidate/voxel-waterfall/minimax-m3.1-flash` at commit `b174dfc` (tree `14e7dff`), and imported with a result report (RESULTS.md).
- Status: `deepseek-v4.1-flash` (`deepseek-v4.1-flash (DeepSeek Harness, qoder-cn/dfmodel)`) was produced from the `091c801` baseline in an isolated worktree (`.worktrees/run-voxel-waterfall-deepseek`), tagged `candidate/voxel-waterfall/deepseek-v4.1-flash-2026-10` at commit `39ba51e` (tree `67f4bae`), and imported with a result report (RESULTS.md).

| Retired branch | Model | Original candidate commit |
| --- | --- | --- |
| `llm/voxel-waterfall/gpt-5.6-sol` | GPT-5.6-SOL | `d20eeecec9f67dfe12464e7598aaa1e3494a0a55` |
| `llm/voxel-waterfall/grok-4.6` | Grok 4.6 | `ca10235699c41814f71ee4d44198eb0f08b0c7fa` |

The original candidate histories remain available through `candidate/voxel-waterfall/<candidate-id>` tags.

## Reproducibility Status

The task prompt and acceptance criteria are now preserved in [`task.md`](task.md). They were added after the original baseline, which also lacked starter code and fixed executable tests; the original execution therefore cannot be reproduced from the recorded baseline SHA alone.

Before starting another round for this task, commit all shared inputs, starter code, fixed tests, and evaluation configuration in this directory, then record the resulting `main` SHA as the new baseline.
