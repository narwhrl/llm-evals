# LLM Coding Capability Benchmark

This repository provides a reproducible way to compare the coding capabilities of different large language models under the same task, context, tools, and acceptance criteria. `main` stores the shared baseline; each `llm/*` branch stores only the candidate implementation produced by its designated model from that baseline.

## Branching Model

- `main`: The shared baseline, including task descriptions, starter code, fixed tests, test data, evaluation configuration, and repository rules. It must not contain a model-specific candidate solution.
- `llm/<model-id>`: The candidate implementation for one model. Use a complete, stable model identifier whenever possible, for example `llm/gpt-5.6-sol`.
- All model branches in the same evaluation round must start from the same `main` commit. If the task or acceptance criteria change, create a new baseline commit before starting another round.

Current experiment branch:

| Branch | Model |
| --- | --- |
| `llm/gpt-5.6-sol` | GPT-5.6-SOL |

## Standard Evaluation Workflow

1. Prepare the task description, starter code, and executable acceptance criteria on `main`.
2. Commit the baseline and record its SHA before running any model.
3. Create each model branch from the same baseline:

   ```bash
   git switch main
   git switch -c llm/<model-id> <baseline-sha>
   ```

4. Give every model the same task text, repository contents, tool permissions, and runtime conditions.
5. Commit the generated code and any required notes only to that model's branch. Do not import implementations from another model branch.
6. Run the same tests, builds, static checks, and runtime scenarios, and preserve their exact results.
7. Compare each candidate with the baseline and its verification evidence:

   ```bash
   git diff <baseline-sha>...llm/<model-id>
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
