# LLM Coding Capability Benchmark

This repository compares coding models under the same task, context, tools, and acceptance criteria. `main` stores shared inputs. Each `llm/<task-id>` branch collects the completed candidates for one task.

## Branching Model

- `main`: The shared baseline, including task descriptions, starter code, fixed tests, test data, evaluation configuration, and repository rules. It must not contain a model-specific candidate solution.
- `llm/<task-id>`: Completed candidate collection for one task. Each implementation lives at `tasks/<task-id>/solutions/<candidate-id>/`.
- `candidate/<task-id>/<candidate-id>` tag: The original, unmodified candidate commit, with its implementation at `tasks/<task-id>/solution/`. The tag supports exact historical diffs against that candidate's recorded baseline.
- All model runs in an evaluation round start in separate clones from the same pinned `main` commit. A task branch is an archive and gallery source, not a model's starting point.

## Tasks

| Task | Round record | Candidate branches |
| --- | --- | --- |
| `voxel-waterfall` | [`tasks/voxel-waterfall/`](tasks/voxel-waterfall/) | `llm/voxel-waterfall` |
| `ui-ux-design` | [`tasks/ui-ux-design/`](tasks/ui-ux-design/) | `llm/ui-ux-design` |
| `cs-pvp-diorama` | [`tasks/cs-pvp-diorama/`](tasks/cs-pvp-diorama/) | `llm/cs-pvp-diorama` |
| `rainy-konbini-diorama` | [`tasks/rainy-konbini-diorama/`](tasks/rainy-konbini-diorama/) | `llm/rainy-konbini-diorama` |
| `voxel-chinese-architecture` | [`tasks/voxel-chinese-architecture/`](tasks/voxel-chinese-architecture/) | `llm/voxel-chinese-architecture` |
| `gargantua-schwarzschild-raytracer` | [`tasks/gargantua-schwarzschild-raytracer/`](tasks/gargantua-schwarzschild-raytracer/) | `llm/gargantua-schwarzschild-raytracer` |
| `cf-transport-ship` | [`tasks/cf-transport-ship/`](tasks/cf-transport-ship/) | No archived candidates |
| `orbital-habitat-diorama` | [`tasks/orbital-habitat-diorama/`](tasks/orbital-habitat-diorama/) | No archived candidates |
| `blackhole-hero-react` | [`tasks/blackhole-hero-react/`](tasks/blackhole-hero-react/) | `llm/blackhole-hero-react` |

## Repository and Worktree Layout

`llm-evals/` is the permanent `main` checkout. Task inputs are tracked under `tasks/`. Model runs use isolated, ignored clones under `.runs/`:

```text
llm-evals/                              # repository root; always main
├── tasks/
│   └── <task-id>/
│       ├── README.md                   # round record and reproducibility status
│       ├── task.md                     # exact prompt and acceptance criteria
│       ├── starter/                    # optional shared starter code
│       └── tests/                      # optional fixed acceptance tests
├── deploy/                             # candidate gallery build and deployment
│   ├── build.mjs                       # builds candidates from task branches into public/
│   ├── wrangler.jsonc                  # Worker, static assets, custom domain
│   └── public/                         # generated gallery output (ignored)
├── .runs/                              # ignored isolated model clones
│   └── <task-id>/<model-id>/
└── .worktrees/                         # ignored temporary gallery worktrees
```

Every model first writes to the same `tasks/<task-id>/solution/` path in its isolated clone. The curator imports that completed tree into `solutions/<candidate-id>/` on the task branch. [`migration/2026-09-28.json`](migration/2026-09-28.json) maps migrated candidates to their original refs, commits, tree hashes, and archive tags. `cursor-c343` is a source identifier with an unknown model identity.

## Standard Evaluation Workflow

1. On `main`, prepare `tasks/<task-id>/` with the prompt, starter code, executable acceptance criteria, fixed tests, and evaluation configuration.
2. Commit that complete baseline and record its SHA before running any model.
3. From the repository root, create a separate clone for each model. Expose only `main` and detach it at the pinned baseline:

   ```bash
   git clone --no-local --single-branch --branch main --no-tags . .runs/<task-id>/<model-id>
   git -C .runs/<task-id>/<model-id> checkout --detach <baseline-sha>
   git -C .runs/<task-id>/<model-id> remote remove origin
   ```

4. Give every model the same task text, repository contents, tool permissions, and runtime conditions.
5. Run each model only in its clone. Commit its implementation and result report at `tasks/<task-id>/solution/`. Run the same tests, builds, static checks, and runtime scenarios in every clone, and preserve their exact results.
6. Fetch each completed commit into the main repository, tag it `candidate/<task-id>/<candidate-id>`, and verify the tag points to the original commit. Import only its `solution/` tree into `tasks/<task-id>/solutions/<candidate-id>/` on `llm/<task-id>`; confirm the source and destination Git tree hashes match.
7. Compare the original candidate tag with its recorded baseline and evidence:

   ```bash
   git diff <baseline-sha>...candidate/<task-id>/<candidate-id> -- tasks/<task-id>/solution/
   ```

8. Preserve any needed generated evidence, then remove a completed clone when it is no longer in use.

## Candidate Gallery

Every pushed task branch is built and published to one Cloudflare Worker, so all implementations can be viewed side by side at predictable paths.

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

To publish a new candidate, import it into and push `llm/<task-id>`, then run both commands again. The gallery discovers candidate directories with a `package.json` from the remote task branches.

### How the Build Works

`deploy/build.mjs`:

1. Fetches `origin` and selects every `tasks/<task-id>/solutions/<candidate-id>/package.json` on an `llm/<task-id>` branch.
2. Creates a temporary detached worktree under `.worktrees/.deploy-tmp/`, runs `npm ci` (or `npm install` when the candidate has no `package-lock.json`), then `npm run build -- --base=/<task-id>/<candidate-id>/ --outDir=<repository>/deploy/public/<task-id>/<candidate-id> --emptyOutDir`, and removes the temporary worktree again.
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
