# LLM Coding Capability Benchmark

This repository provides a reproducible way to compare the coding capabilities of different large language models under the same task, context, tools, and acceptance criteria. `main` stores the shared baseline; each `llm/*` branch stores only the candidate implementation produced by its designated model from that baseline.

## Branching Model

- `main`: The shared baseline, including task descriptions, starter code, fixed tests, test data, evaluation configuration, and repository rules. It must not contain a model-specific candidate solution.
- `llm/<task-id>/<model-id>`: The candidate implementation for one model on one task. Use complete, stable identifiers, for example `llm/voxel-waterfall/gpt-5.6-sol`.
- All model branches in the same evaluation round must start from the same `main` commit. If the task or acceptance criteria change, create a new baseline commit before starting another round.

## Tasks

| Task | Round record | Candidate branches |
| --- | --- | --- |
| `voxel-waterfall` | [`tasks/voxel-waterfall/`](tasks/voxel-waterfall/) | GPT-5.6-SOL, Grok 4.6 |

## Repository and Worktree Layout

`llm-evals/` is the Git repository and permanent `main` worktree. Task inputs are tracked under `tasks/`; linked model worktrees are local-only under the ignored `.worktrees/` directory:

```text
llm-evals/                              # repository root; always main
├── tasks/
│   └── <task-id>/
│       ├── README.md                   # round record and reproducibility status
│       ├── task.md                     # exact prompt and acceptance criteria
│       ├── starter/                    # optional shared starter code
│       └── tests/                      # optional fixed acceptance tests
└── .worktrees/                         # ignored local linked worktrees
    └── <task-id>/
        ├── <model-id>/                 # llm/<task-id>/<model-id>
        └── <other-model-id>/
```

Every candidate branch uses the same tracked implementation path, `tasks/<task-id>/solution/`. Model identity belongs in the branch and local worktree path, not in a model-specific source directory; this keeps candidate diffs path-aligned.

## Standard Evaluation Workflow

1. On `main`, prepare `tasks/<task-id>/` with the prompt, starter code, executable acceptance criteria, fixed tests, and evaluation configuration.
2. Commit that complete baseline and record its SHA before running any model.
3. From the repository root, create every model branch and linked worktree from that exact SHA:

   ```bash
   git worktree add \
     -b llm/<task-id>/<model-id> \
     .worktrees/<task-id>/<model-id> \
     <baseline-sha>
   ```

4. Give every model the same task text, repository contents, tool permissions, and runtime conditions.
5. Run the model only in `.worktrees/<task-id>/<model-id>/`. Commit its implementation at `tasks/<task-id>/solution/` only to `llm/<task-id>/<model-id>`; never import another model's implementation.
6. Run the same tests, builds, static checks, and runtime scenarios in every model worktree, and preserve their exact results.
7. Compare each candidate from the repository root with the recorded baseline and its verification evidence:

   ```bash
   git diff <baseline-sha>...llm/<task-id>/<model-id>
   ```

8. After preserving the candidate commit and evidence, remove only the linked worktree when it is no longer needed:

   ```bash
   git worktree remove .worktrees/<task-id>/<model-id>
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
