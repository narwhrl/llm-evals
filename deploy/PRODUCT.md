# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The repository owner, who runs coding models on shared tasks and curates the results. The gallery is their own workbench; they occasionally send a link to someone else.

## Product Purpose

The gallery is the browsable index of every archived candidate in the LLM Evals benchmark. A candidate is one model's independent, built implementation of one task. The gallery lets the owner open, compare, and keep track of candidates without checking out branches. Success means any candidate is two clicks away and coverage gaps are visible at a glance.

## Positioning

One prompt, many independent implementations, all built and served side by side at predictable paths. The gallery shows only facts recorded in the archive; it never ranks or scores.

## Operating Context

- Candidates are imported into `llm/<task-id>` branches. `deploy/build.mjs` builds every candidate and generates the index into `deploy/public/`, deployed to `llm-evals-result.narwh.dev` with Wrangler.
- Recurring sessions, all confirmed: checking the newest candidates after a run, opening every candidate of one task to compare them, checking which models have not done which tasks, and finding one model's candidates.
- Candidate URLs are `/<task-id>/<candidate-id>/`. Source and `RESULTS.md` links point at GitHub.

## Capabilities and Constraints

- Static HTML generated at build time; no backend and no authentication; the site is public.
- Facts available per candidate: task, candidate ID, vendor and model (derived from the ID), reasoning effort (ID suffix), the harness when `imports.json` records it, the built work, its source tree, whether a `RESULTS.md` exists, the recorded model identifier when `imports.json` has one, and the original candidate commit date from its tag.
- Seven tasks, 26 models, and 97 candidates today; all three counts grow.
- UI copy is Chinese; model and task names keep their original form.

## Brand Commitments

- Visual direction pinned by the owner on 2026-11-04: Soft Minimalist SaaS Dashboard, combining Notion's content typography, Linear's refined restraint, and shadcn/ui's component language. Pure white background, light gray containers, low-contrast thin borders, soft shadows, and medium-to-large radii. A fixed left sidebar with a modular content layout, clear hierarchy, and comfortable whitespace. A modern sans-serif with bold headings, line icons for navigation only, and a few status accent colors. No emoji or illustrations: the owner dropped them on 2026-11-05, so tasks are identified by name. Pill buttons, soft hover states, and light transitions, for a relaxed, warm, professional "cozy productivity" feel.

## Evidence on Hand

- Real data only: the archive branches, their `imports.json` records, and the `candidate/*` tags.
- No scores, rankings, verdicts, screenshots, or thumbnails exist. Do not invent them.

## Product Principles

1. Facts, not judgments: show what was produced and where to inspect it; never score.
2. Every candidate is reachable in two clicks from the index.
3. Coverage is information: a missing candidate is shown as missing.
4. The index absorbs more models and tasks without a redesign.
