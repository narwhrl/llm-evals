# Repository Instructions

This file applies to the repository root and every subdirectory. It keeps model runs isolated while collecting completed candidates by task.

## Branch Invariants

- `main` is the shared baseline. It contains shared tasks, starter code, documentation, tests, test data, evaluation configuration, and tooling, but no model-specific solutions and no archive status. Importing a candidate never changes `main`.
- Each completed task has one permanent `llm/<task-id>` branch that holds only that task's archive: candidates at `tasks/<task-id>/solutions/<candidate-id>/`, their records in `tasks/<task-id>/imports.json`, and an archive README. Candidates migrated on 2026-09-28 are recorded in `migration/2026-09-28.json` on `main`.
- Preserve each original candidate commit with an immutable `candidate/<task-id>/<candidate-id>` tag. Import its `solution/` Git tree into the task branch without changing its files; verify that the imported and source tree hashes match. `node scripts/runs.mjs collect` does both.
- Changes to tasks, fixed tests, or evaluation standards first become a new baseline commit on `main`. Apply the same rules to every model in a round.

## Run Isolation

- `llm-evals/` is the permanent `main` checkout. Shared task inputs live under `tasks/<task-id>/`.
- Run every model in its own folder outside this repository, created with `node scripts/runs.mjs new` from the pinned `main` commit. The folder holds only that commit: no history, branches, tags, or remote. Never run a model in a Git worktree of this repository or in a folder inside it.
- Run installation, generation, build, and verification in that model's folder. Give every model the same pinned baseline, task text, permissions, and evaluation commands. Keep other candidates out of the folder.
- Each model writes to the same path, `tasks/<task-id>/solution/`, during its run, and commits the completed candidate there. Only the task branch uses candidate-specific archive directories under `solutions/`.
- Candidates are comparable when their records share the same `inputTree`, the `tasks/<task-id>` tree at their baseline.
- Keep the repository root on `main`. Preserve generated and ignored files in a run folder until its evidence has been accounted for.

## Implementation Constraints

- Implement only the behavior explicitly required by the current task. Do not expand the feature scope without a request.
- Reuse the repository's existing structure and conventions. Do not introduce a second pattern, unnecessary abstraction, dependency, or configuration for the same problem.
- Unless the task explicitly requires it, do not modify task descriptions, fixed tests, test data, evaluation scripts, or this file.
- Do not manufacture passing results by deleting, skipping, or weakening tests; disabling lint or type checks; hard-coding test answers; swallowing errors; or simulating core behavior.
- Do not submit placeholder implementations, no-ops, fake fallbacks, unfinished `TODO` items, or nonfunctional scaffolding.
- During a model run, read only the pinned `main` baseline and that model's own work. The curator may read completed candidates when importing and comparing them.
- Do not commit passwords, tokens, private keys, `.env` contents, or other sensitive information.
- Changes involving input, authentication, persistence, or external services must use least privilege and fail securely.
- Compiled or performance-sensitive code must avoid unnecessary allocations, copies, repeated I/O, and repeated computation.

## Verification Constraints

- Before delivery, run the minimum sufficient verification that covers the changed behavior. Prefer the repository's existing focused tests, build, type checks, or actual runtime scenarios.
- Bug fixes must reproduce the problem first, then confirm that the same reproduction path no longer fails.
- Do not claim commands or results that were not actually executed and observed. Report failures exactly and distinguish code failures from environmental blockers.
- If a test or task is defective, stop trying to work around the defect. Record the evidence, correct the baseline on `main`, and restart the fair evaluation.

## Commit Constraints

- Each commit must contain one logical change that can be independently explained, verified, and reverted.
- Commit messages use `<type>: <description>`. Common types are `feat`, `fix`, `refactor`, `test`, `docs`, and `chore`.
- Commit model-generated code and required notes in its isolated run folder. Preserve that commit with a candidate tag, then import the exact solution tree into `llm/<task-id>`. Never place candidate code on `main`.
- Before committing, review the change scope, verification results, and sensitive information. Do not mix unrelated formatting or refactoring into the commit.

## Result Report

Every candidate implementation must record at least:

- The complete model identifier.
- The harness the model ran in, such as Codex CLI or Claude Code. If it is unclear, ask the developer; do not guess.
- The starting `main` commit SHA.
- The verification commands actually run and their results.
- Known limitations, failures, and required human intervention.

Comparison conclusions may be based only on evidence collected with the same baseline, task, permissions, and evaluation standards.
For historical imports lacking a result report, record the missing evidence explicitly; do not invent it.
