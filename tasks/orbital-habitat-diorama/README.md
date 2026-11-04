# Orbital Habitat Diorama Archive

Candidates for `orbital-habitat-diorama`. Task inputs and the evaluation procedure are on `main` at [`tasks/orbital-habitat-diorama/`](https://github.com/narwhrl/llm-evals/tree/main/tasks/orbital-habitat-diorama).

- `solutions/<candidate-id>/` is the exact `tasks/orbital-habitat-diorama/solution/` tree of the candidate tag named in its record.
- [`imports.json`](imports.json) records every import.
- `inputTree` in a record is the `tasks/orbital-habitat-diorama` tree at its baseline; candidates with the same `inputTree` received identical task inputs.
- Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.

## Provenance

- `zcode-harness` (ZCode multi-agent harness, `7b2f86c` baseline) is recorded in [`migration/2026-09-30.json`](../../migration/2026-09-30.json).
- `swe-2` (`magpie/devin/swe-2`) was produced from the `63a46c3` baseline.
- `minimax-m3.1-flash` (`magpie/minimax-code/MiniMax-M3.1-Flash`) was produced from the `63a46c3` baseline in an isolated worktree (`.worktrees/minimax-m3.1-flash/orbital-habitat-diorama`), tagged `candidate/orbital-habitat-diorama/minimax-m3.1-flash` at commit `586d885` (tree `7728291`), and imported with a result report (RESULTS.md).
- `kimi-k3.1-pro` (`magpie/kimi-code-cn/k3.1-pro`) was produced from the `091c801b98342f2e778bd356e0c55b7372398541` baseline in an isolated worktree. Its original commit `3f7d317e797354bc27e7af5893dce386c0e4fc97` and tree `a16f007bef5d76466c807d1689f4252742e9955a` remain preserved by `candidate/orbital-habitat-diorama/kimi-k3.1-pro`. The displayed candidate is the structural revision recorded in `imports.json`, preserved by `candidate/orbital-habitat-diorama/kimi-k3.1-pro-r2`. Reference-informed window assemblies and hatch-edge frames replace the unsupported cross-window arcs; `STRUCTURE.md` records the public NASA/ESA sources.
- `deepseek-v4.1-flash` (`magpie/devin/deepseek-v4.1-flash`) was produced from the `091c801b98342f2e778bd356e0c55b7372398541` baseline in the isolated worktree `.worktrees/orbital-deepseek-v4.1-flash` (detached at that SHA). Its commit `e332c46750cdf8cf82340c9ad3428bd211c25d9d` is preserved by `candidate/orbital-habitat-diorama/deepseek-v4.1-flash`; the imported `solution/` tree `e96a704f99adc0cb249180e122967c1d6f5e48b4` matches the source tree byte for byte. The run used no sub-agents and no other model's code; the only agent call was a read-only visual review of this candidate's own evidence images.
