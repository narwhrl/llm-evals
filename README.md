# LLM Coding Capability Benchmark

This repository compares coding models under the same task, context, tools, and acceptance criteria. `main` stores shared inputs. Each `llm/<task-id>` branch archives the completed candidates for one task.

## Branching Model

- `main`: The shared baseline, including task descriptions, starter code, fixed tests, test data, evaluation configuration, repository rules, and tooling. It contains no candidate solution and no archive status, so importing a candidate never moves it.
- `llm/<task-id>`: The candidate archive for one task. It holds only `tasks/<task-id>/solutions/<candidate-id>/`, the import records in `tasks/<task-id>/imports.json`, and an archive README; it carries no copy of `main`.
- `candidate/<task-id>/<candidate-id>` tag: The original, unmodified candidate commit, with its implementation at `tasks/<task-id>/solution/`. Later revisions use `-r2`, `-r3`, and so on. The tag supports exact historical diffs against that candidate's recorded baseline.
- Models never run inside this repository. Each run gets its own folder outside it that contains only the pinned baseline commit.

## Tasks

| Task | Inputs | Archive |
| --- | --- | --- |
| `cs-pvp-diorama` | [`tasks/cs-pvp-diorama/`](tasks/cs-pvp-diorama/) | `llm/cs-pvp-diorama` |
| `gargantua-schwarzschild-raytracer` | [`tasks/gargantua-schwarzschild-raytracer/`](tasks/gargantua-schwarzschild-raytracer/) | `llm/gargantua-schwarzschild-raytracer` |
| `orbital-habitat-diorama` | [`tasks/orbital-habitat-diorama/`](tasks/orbital-habitat-diorama/) | `llm/orbital-habitat-diorama` |
| `rainy-konbini-diorama` | [`tasks/rainy-konbini-diorama/`](tasks/rainy-konbini-diorama/) | `llm/rainy-konbini-diorama` |
| `ui-ux-design` | [`tasks/ui-ux-design/`](tasks/ui-ux-design/) | `llm/ui-ux-design` |
| `voxel-chinese-architecture` | [`tasks/voxel-chinese-architecture/`](tasks/voxel-chinese-architecture/) | `llm/voxel-chinese-architecture` |
| `voxel-waterfall` | [`tasks/voxel-waterfall/`](tasks/voxel-waterfall/) | `llm/voxel-waterfall` |

## Repository Layout

```text
llm-evals/                              # repository root; always main
├── tasks/
│   └── <task-id>/
│       ├── README.md                   # shared inputs, evaluation procedure, review axes
│       ├── task.md                     # exact prompt and acceptance criteria
│       ├── starter/                    # optional shared starter code
│       └── tests/                      # optional fixed acceptance tests
├── scripts/runs.mjs                    # creates isolated run folders and collects candidates
├── deploy/                             # candidate gallery build and deployment
│   ├── build.mjs                       # builds candidates from task branches into public/
│   ├── wrangler.jsonc                  # Worker, static assets, custom domain
│   └── public/                         # generated gallery output (ignored)
└── migration/2026-09-28.json           # frozen provenance of the migrated candidates

../llm-runs/<task-id>/<candidate-id>/   # one isolated run folder per model, outside the repository
```

[`migration/2026-09-28.json`](migration/2026-09-28.json) maps candidates migrated on 2026-09-28 to their original refs, commits, tree hashes, and archive tags. `cursor-c343` is a source identifier with an unknown model identity.

## Candidate IDs

A candidate ID is the model ID, optionally followed by the reasoning effort used for the run: `<model-id>[-<effort>]`, where `<effort>` is one of `minimal`, `low`, `medium`, `high`, `xhigh`, or `max`. Omit the suffix for the model's default effort, for example `gpt-6.1-sol` or `grok-4.6-high`. The gallery groups candidates by this convention.

## Standard Evaluation Workflow

1. On `main`, prepare `tasks/<task-id>/` with the prompt, starter code, executable acceptance criteria, fixed tests, and evaluation configuration, and commit it.
2. Create one isolated run folder per model:

   ```bash
   node scripts/runs.mjs new <task-id> <candidate-id> [...]
   ```

   Each folder under `../llm-runs/<task-id>/` is a separate Git repository that holds only the current `main` commit: no history, branches, tags, or remote. The command prints the baseline SHA and the task input tree.

3. Give every model the same task text, repository contents, tool permissions, and runtime conditions, and limit each model to its own folder. Never run a model in a Git worktree of this repository or in a folder inside it; both expose every other candidate. Runs may proceed in parallel.
4. Each model commits its implementation and result report at `tasks/<task-id>/solution/`. Run the same tests, builds, static checks, and runtime scenarios for every candidate, and preserve their exact results.
5. Collect the completed runs:

   ```bash
   node scripts/runs.mjs collect <task-id> <candidate-id> [...]
   git push origin llm/<task-id> candidate/<task-id>/<candidate-id> [...]
   ```

   For each candidate, `collect` fetches the run's commit, tags it `candidate/<task-id>/<candidate-id>`, imports its `solution/` tree into `llm/<task-id>`, appends a record to `imports.json`, and verifies that the source and destination tree hashes match. It stops if the tag or destination already exists, so revisions are imported by hand under a `-rN` tag. It warns about changes outside `solution/`, which are not imported.

6. Compare candidates only when their records share the same `inputTree`, the `tasks/<task-id>` tree at their baseline. Review each candidate against its baseline:

   ```bash
   git diff <baseline-sha>...candidate/<task-id>/<candidate-id> -- tasks/<task-id>/solution/
   ```

7. Preserve any needed generated evidence, then delete the run folder.

Candidates imported before `scripts/runs.mjs` ran in clones or worktrees inside the repository; their isolation from other candidates is not verified.

## Candidate Gallery

Every pushed task branch is built and published to one Cloudflare Worker, so all implementations can be viewed side by side at predictable paths.

- Live site: <https://llm-evals-result.narwh.dev/>
- URL layout: `https://llm-evals-result.narwh.dev/<task-id>/<candidate-id>/`
- `/` is a matrix of models, grouped by vendor, against tasks. Each filled cell opens a candidate, each column header opens the task prompt, and expanding a model lists the source, result report, and recorded model identifier of every candidate. A model with candidates at several reasoning efforts gets a switch between them.

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

To publish a new candidate, import it into and push `llm/<task-id>`, then run both commands again. The gallery discovers candidate directories with a `package.json` from the remote task branches.

### How the Build Works

`deploy/build.mjs`:

1. Fetches `origin` and reads each `llm/<task-id>` branch once: its candidate directories, which of them have a `package.json` and a `RESULTS.md`, and the records in `imports.json`.
2. Creates a temporary detached worktree under `.worktrees/.deploy-tmp/`, runs `npm ci` (or `npm install` when the candidate has no `package-lock.json`), then `npm run build -- --base=/<task-id>/<candidate-id>/ --outDir=<repository>/deploy/public/<task-id>/<candidate-id> --emptyOutDir`, and removes the temporary worktree again.
3. Removes build output for candidates no longer in the archive, then regenerates `deploy/public/index.html` from every candidate directory present in `deploy/public/`, so a partial rebuild still lists everything that would be deployed. The vendor and model of each candidate come from its ID: `VENDORS` in `build.mjs` maps the first segment of the model ID to a vendor, and `ALIASES` maps historical IDs that do not follow the [candidate ID convention](#candidate-ids). Unrecognized IDs are listed under 未归类 and reported during the build.
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
