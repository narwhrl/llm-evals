# Black Hole Hero React Integration Evaluation

## Task Record

- Task ID: `blackhole-hero-react`
- Canonical candidate path: `tasks/blackhole-hero-react/solution/`
- Candidate result report: `tasks/blackhole-hero-react/solution/RESULTS.md`
- Prompt: [`task.md`](task.md)
- Original prompt: [`starter/original-prompt.md`](starter/original-prompt.md)
- Status: One candidate archived on `llm/blackhole-hero-react`: `gpt-6.1-sol` (`new-provider/gpt-6.1-sol`), generated from baseline `3b8d6817086aebaad6f7850226ab50f88f5ca01b`. The exact source tree is preserved under `solutions/gpt-6.1-sol/` and tag `candidate/blackhole-hero-react/gpt-6.1-sol`; source commits and tree hashes are recorded in `migration/2026-10-01.json` on the task branch.

## Shared Inputs

This is an existing-component integration task, not a from-scratch black hole renderer task. The baseline supplies the user's full original prompt and two extracted source files:

- [`starter/components/ui/blackhole-hero-section.tsx`](starter/components/ui/blackhole-hero-section.tsx)
- [`starter/demo.tsx`](starter/demo.tsx)

`starter/original-prompt.md` preserves the pasted input byte-for-byte, including the original code fence and file-name markers. Its SHA-256 is `cbce3834209a4cbaadc6e667c228f61a74286c84866e153d4cbd2a4d70f61584`. The two `.tsx` files contain the corresponding source slices without implementation edits; file-name markers and the surrounding Markdown fence are not part of those files. The task-local `.gitattributes` disables Git line-ending conversion for these three files so their bytes remain reproducible across clones. All files under `starter/` are shared task inputs, not a candidate solution.

No configured application, fixed executable tests, or reference images are provided. The canonical prompt makes the otherwise unspecified host application explicit: React + Vite + TypeScript, Tailwind CSS, and a shadcn-compatible project structure. It also defines the repository's canonical output path, desktop and mobile viewports, non-root build verification, screenshots, and result reporting. The supplied component and demo define the props, copy, and responsive behavior; candidates do not need user sign-off during an unattended run. The original template's Unsplash and icon instructions are conditional because the supplied component needs neither.

Runtime must not require credentials or remote assets. Do not add unrelated application features or replace the supplied shader with another renderer. Necessary compatibility or lifecycle fixes must be explained and verified in the candidate's result report. Each model writes under the canonical candidate path in its isolated clone; the curator archives the completed tree under that candidate's ID.

## Evaluation Procedure

Before starting a round:

1. Commit the complete shared inputs on `main`, designate that commit as the baseline, and record its full SHA in every candidate result report. Do not use the task branch or a pre-task baseline for generation.
2. Create each isolated model clone from that exact SHA according to the repository workflow. Give every candidate the same task text, source files, permissions, runtime conditions, and review procedure.
3. In each `solution/`, run `npm ci`, `npm run typecheck`, `npm run build`, and `npm run build -- --base=/blackhole-hero-react/eval/ --outDir=dist-subpath`. Record the exact output and exit status; do not infer a successful type check from a Vite build alone.
4. Serve the production outputs locally. Verify both the root deployment and `/blackhole-hero-react/eval/` deployment, including asset requests and browser console errors.
5. Evaluate every candidate in the same browser at `1440 × 900` desktop and `390 × 844` mobile viewports. Record browser version, WebGL availability, renderer, and device pixel ratio. Confirm that the desktop has left-side copy and a right-side black hole, while mobile has copy above the black hole. The title, paragraph, and both links must remain readable.
6. Resize from desktop to mobile and back across the `767px` breakpoint. Confirm updated framing, scrim direction, and canvas size without a blank frame, horizontal overflow, or text overlap.
7. Observe normal gas animation. Check the component's `paused` prop and a reduced-motion environment without changing shared inputs. Confirm that the reduced-motion render is a still and that an unavailable WebGL context leaves readable copy on a black background. These checks do not require adding a permanent control panel.
8. Where supported, exercise WebGL context loss and restoration. Record a blocked or unavailable check as such rather than a pass. A software renderer's built-in lower-quality settings are permitted; use the same renderer for every candidate and do not compare screenshots taken under different GPU conditions as equivalent evidence.
9. Compare `solution/evidence/01-desktop.png` and `solution/evidence/02-mobile.png` with the running build. Review the actual black hole rendering as well as the surrounding layout; a build result alone is not visual evidence.
10. Stop servers and close pages opened for verification. Review `RESULTS.md` for the complete model identifier, pinned baseline, commands and observed results, necessary edits to supplied code, known limitations or failures, and human intervention.

If the provided input or evaluation standard proves defective, record the evidence and correct the shared baseline before restarting all affected candidates. Do not grant one candidate an undocumented workaround or different acceptance standard.

## Review Axes

Apply the prompt consistently and record observable evidence for:

- **Integration:** actual React rendering, Tailwind styles, TypeScript checking, resolvable imports, and shadcn-compatible paths and `components.json`.
- **Source fidelity:** the supplied component's public API, defaults, shader-based rendering, post-processing, and demo remain intact except for documented integration fixes.
- **Responsive composition:** readable text and links beside the black hole on desktop and above it on mobile, with correct breakpoint changes and no blank canvas or unintended cropping.
- **Runtime robustness:** animation, pause, reduced motion, resize, unsupported WebGL, and context restoration behave as recorded without unhandled errors.
- **Packaging and reproducibility:** locked dependencies, local runtime resources, root and subpath production builds, actual screenshots, setup instructions, and an evidence-backed result report.
- **Scope control:** no unnecessary global state, context providers, assets, icons, backend, business pages, or replacement renderer.

Do not infer quality from shader length, dependency count, or the original component's physics comments. Comparison conclusions require observed behavior and reproducible evidence collected from the same baseline and environment.
