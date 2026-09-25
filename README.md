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
| `ui-ux-design` | [`tasks/ui-ux-design/`](tasks/ui-ux-design/) | Prepared; no candidate branches yet |
| `cs-pvp-diorama` | [`tasks/cs-pvp-diorama/`](tasks/cs-pvp-diorama/) | Prepared; no candidate branches yet |
| `voxel-chinese-architecture` | [`tasks/voxel-chinese-architecture/`](tasks/voxel-chinese-architecture/) | Prepared; no candidate branches yet |
| `gargantua-schwarzschild-raytracer` | [`tasks/gargantua-schwarzschild-raytracer/`](tasks/gargantua-schwarzschild-raytracer/) | Prepared; no candidate branches yet |
| `cf-transport-ship` | [`tasks/cf-transport-ship/`](tasks/cf-transport-ship/) | Prepared; no candidate branches yet |

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
├── deploy/                             # candidate gallery build and deployment
│   ├── build.mjs                       # builds every llm/* branch into public/
│   ├── wrangler.jsonc                  # Worker, static assets, custom domain
│   └── public/                         # generated gallery output (ignored)
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

## Candidate Gallery

Every pushed candidate branch is built and published to one Cloudflare Worker, so all implementations can be viewed side by side at predictable paths.

- Live site: <https://llm-evals-result.narwh.dev/>
- URL layout: `https://llm-evals-result.narwh.dev/<task-id>/<model-id>/`
- `/` serves a generated index page that links every published candidate.

### Publish or Update

Prerequisites: Node.js with npm, and an authenticated Wrangler session (`npx wrangler login`) on an account that owns the `narwh.dev` zone. Run both commands from the repository root:

```bash
node deploy/build.mjs              # build every candidate branch into deploy/public/
cd deploy && npx wrangler deploy   # upload and publish
```

Rebuild a subset while iterating; `BUILD_CONCURRENCY` (default `4`) controls how many candidates build at once:

```bash
node deploy/build.mjs ui-ux-design/kimi-k3 voxel-waterfall/grok-4.6
```

To publish a new candidate, push its `llm/<task-id>/<model-id>` branch and run both commands again. Branches are discovered from `origin`, so no configuration change is needed; any branch without `tasks/<task-id>/solution/package.json` is skipped and listed in the summary.

### How the Build Works

`deploy/build.mjs`:

1. Fetches `origin` and selects every `llm/<task-id>/<model-id>` branch that has a `tasks/<task-id>/solution/package.json`.
2. Creates a temporary detached worktree under `.worktrees/.deploy-tmp/`, runs `npm ci` (or `npm install` when the branch has no `package-lock.json`), then `npm run build -- --base=/<task-id>/<model-id>/ --outDir=<repository>/deploy/public/<task-id>/<model-id> --emptyOutDir`, and removes the temporary worktree again.
3. Regenerates `deploy/public/index.html` from every candidate directory present in `deploy/public/`, so a partial rebuild still lists everything that would be deployed.
4. Prints a per-candidate summary and exits non-zero if any candidate failed to build.

The `--base` flag is a hosting adaptation applied at build time only: it rewrites asset URLs so an app works under its path prefix, and it never modifies a candidate's tracked files. Evaluation conclusions must still be based on each candidate's own build; this step only decides where the built files are served from.

`deploy/public/` and `deploy/.wrangler/` are ignored, so build output is never committed. Deployment settings live in `deploy/wrangler.jsonc`: static assets from `./public`, `html_handling: auto-trailing-slash` (so `/<task-id>/<model-id>` redirects to the trailing-slash form), and the `llm-evals-result.narwh.dev` custom domain route.

The gallery is public, with no authentication gate. Unknown paths return 404 — there is no single-page-application fallback, because candidates are single-page apps without client-side routing.

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
