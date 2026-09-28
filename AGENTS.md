# Repository Instructions

This file applies to the repository root and every subdirectory. It keeps model runs isolated while collecting completed candidates by task.

## Branch Invariants

- `main` is the shared baseline. It contains shared tasks, starter code, documentation, tests, test data, and evaluation configuration, but no model-specific solutions.
- Each completed task has one permanent `llm/<task-id>` branch. It collects candidates at `tasks/<task-id>/solutions/<candidate-id>/` and records their source commits in `migration/2026-09-28.json` for the migrated round. Record future imports in the task branch as well.
- Run every model in its own isolated clone created from the same pinned `main` commit for that evaluation round. During generation, each clone writes to `tasks/<task-id>/solution/`. Commit the completed candidate there before importing it into the task branch.
- Preserve each original candidate commit with an immutable `candidate/<task-id>/<candidate-id>` tag. Import its `solution/` Git tree into the task branch without changing its files; verify that the imported and source tree hashes match.
- Changes to tasks, fixed tests, or evaluation standards first become a new baseline commit on `main`. Apply the same rules to every model in a round.

## Worktree Invariants

- `llm-evals/` is the permanent `main` checkout. Shared task inputs live under `tasks/<task-id>/`.
- Run installation, generation, build, and verification in that model's isolated clone. Give every model the same pinned baseline, task text, permissions, and evaluation commands. Keep other candidates out of the clone.
- Each model writes to the same path, `tasks/<task-id>/solution/`, during its run. Only the completed task branch uses candidate-specific archive directories under `solutions/`.
- Keep the repository root on `main`. Preserve generated and ignored files in their original clone until its evidence has been accounted for.

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
- Commit model-generated code and required notes in its isolated clone. Preserve that commit with a candidate tag, then import the exact solution tree into `llm/<task-id>`. Never place candidate code on `main`.
- Before committing, review the change scope, verification results, and sensitive information. Do not mix unrelated formatting or refactoring into the commit.

## Result Report

Every candidate implementation must record at least:

- The complete model identifier.
- The starting `main` commit SHA.
- The verification commands actually run and their results.
- Known limitations, failures, and required human intervention.

Comparison conclusions may be based only on evidence collected with the same baseline, task, permissions, and evaluation standards.
For historical imports lacking a result report, record the missing evidence explicitly; do not invent it.
