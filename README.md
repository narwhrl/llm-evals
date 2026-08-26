# LLM Coding Capability Benchmark

This repository provides a reproducible way to compare the coding capabilities of different large language models under the same task, context, tools, and acceptance criteria. `main` stores the shared baseline; each `llm/*` branch stores only the candidate implementation produced by its designated model from that baseline.

## Branching Model

- `main`: The shared baseline, including task descriptions, starter code, fixed tests, test data, evaluation configuration, and repository rules. It must not contain a model-specific candidate solution.
- `llm/<model-id>`: The candidate implementation for one model. Use a complete, stable model identifier whenever possible, for example `llm/gpt-5.6-sol`.
- All model branches in the same evaluation round must start from the same `main` commit. If the task or acceptance criteria change, create a new baseline commit before starting another round.

Current experiment branches:

| Branch | Model |
| --- | --- |
| `llm/gpt-5.6-sol` | GPT-5.6-SOL |
| `llm/grok-4.6` | Grok 4.6 |

## Local Workspace Layout

Keep each task in its own directory and each model in a linked worktree:

```text
llm-evals/
└── <task-id>/
    ├── baseline/                 # Git main worktree
    └── worktrees/
        ├── <model-id>/           # llm/<model-id>
        └── <other-model-id>/     # llm/<other-model-id>
```

Keep `baseline/` on `main`. Run candidate installation, generation, builds, and tests only inside the model's linked worktree so untracked files and build artifacts remain isolated.

## Standard Evaluation Workflow

1. Prepare the task description, starter code, and executable acceptance criteria in `baseline/` on `main`.
2. Commit the baseline and record its SHA before running any model.
3. From `baseline/`, create every model branch and linked worktree from that exact SHA:

   ```bash
   git worktree add \
     -b llm/<model-id> \
     ../worktrees/<model-id> \
     <baseline-sha>
   ```

4. Give every model the same task text, repository contents, tool permissions, and runtime conditions.
5. Run the model only in `worktrees/<model-id>/`. Commit its generated code and required notes only to `llm/<model-id>`; never import another model's implementation.
6. Run the same tests, builds, static checks, and runtime scenarios in every model worktree, and preserve their exact results.
7. Compare each candidate from `baseline/` with the baseline and its verification evidence:

   ```bash
   git diff <baseline-sha>...llm/<model-id>
   ```

8. After preserving the candidate commit and evidence, remove only the linked worktree when it is no longer needed:

   ```bash
   git worktree remove ../worktrees/<model-id>
   ```

## Evaluation Criteria

- Functional correctness: Satisfies the task and every acceptance criterion.
- Verification: Passes the required tests, builds, static checks, and runtime scenarios.
- Scope control: Changes only what is necessary to complete the task.
- Code quality: Remains clear, maintainable, robust, and consistent with existing conventions.
- Security: Introduces no credential exposure, unsafe input handling, or dependency risk.
- Performance: Avoids unnecessary allocations, copies, repeated computation, and clearly inefficient paths.
- Autonomy: Records how many human prompts, corrections, and retries were required.

Conclusions must be supported by commit diffs and reproducible command output. Apply the same weights and decision rules to every model; do not adjust standards based on model identity.

## Repository Rules

Every model and contributor must follow [`AGENTS.md`](AGENTS.md). If a task description conflicts with a fixed test, correct the issue in a new shared baseline commit. Never relax the standard only for one model branch.
