# Repository Instructions

This file applies to the repository root and every subdirectory. Its purpose is to keep candidate implementations from different LLMs isolated, reproducible, and comparable under fair conditions.

## Branch Invariants

- `main` is the shared baseline. It stores only shared tasks, starter code, documentation, tests, test data, and evaluation configuration; it must not contain model-specific solutions.
- Candidate implementations may be written only to their corresponding `llm/<task-id>/<model-id>` branches.
- Model branches in the same evaluation round must start from the same `main` commit. Do not merge, rebase, cherry-pick, or copy candidate implementations from another `llm/*` branch.
- Changes to tasks, fixed tests, or evaluation standards must first become a new baseline commit on `main`. Never change the rules only for one model.

## Worktree Invariants

- `llm-evals/` is the repository root and permanent `main` worktree. Shared task inputs live under `tasks/<task-id>/`.
- Check out each `llm/<task-id>/<model-id>` branch only in `.worktrees/<task-id>/<model-id>/`; run that model's installation, generation, build, and verification commands there.
- Every candidate writes its implementation to the same tracked path, `tasks/<task-id>/solution/`. Do not create model-named source directories.
- Never switch the repository root away from `main` or reuse one physical worktree across models or tasks. Generated and ignored files remain in the worktree that created them.

## Implementation Constraints

- Implement only the behavior explicitly required by the current task. Do not expand the feature scope without a request.
- Reuse the repository's existing structure and conventions. Do not introduce a second pattern, unnecessary abstraction, dependency, or configuration for the same problem.
- Unless the task explicitly requires it, do not modify task descriptions, fixed tests, test data, evaluation scripts, or this file.
- Do not manufacture passing results by deleting, skipping, or weakening tests; disabling lint or type checks; hard-coding test answers; swallowing errors; or simulating core behavior.
- Do not submit placeholder implementations, no-ops, fake fallbacks, unfinished `TODO` items, or nonfunctional scaffolding.
- Do not read, reference, or port implementations from another model branch. Reading the history and contents of `main` and the current branch is allowed.
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
- Model-generated candidate code and its required notes must be committed on that model's branch, never on `main`.
- Before committing, review the change scope, verification results, and sensitive information. Do not mix unrelated formatting or refactoring into the commit.

## Result Report

Every candidate implementation must record at least:

- The complete model identifier.
- The starting `main` commit SHA.
- The verification commands actually run and their results.
- Known limitations, failures, and required human intervention.

Comparison conclusions may be based only on evidence collected with the same baseline, task, permissions, and evaluation standards.
