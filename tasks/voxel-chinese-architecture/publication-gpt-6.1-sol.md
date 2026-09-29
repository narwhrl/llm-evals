# GPT-6.1-Sol Gallery Publication

- Candidate model: `new-provider/gpt-6.1-sol`
- Baseline main: `595fb2780259cfd4a46451102012ce1b7d57cce4`
- Original candidate commit: `f1521ff47fc71fd24a75375c58aebabd35156a74`
- Immutable tag: `candidate/voxel-chinese-architecture/gpt-6.1-sol`
- Initial archive import commit: `b15bd95`
- Source and archived solution tree: `d438f7e818362cbef9a30658bf5ad2468af4a174`, verified equal before import commit. This publication note is outside the candidate directory and does not change that tree.
- Live candidate: <https://llm-evals-result.narwh.dev/voxel-chinese-architecture/gpt-6.1-sol/>
- Gallery: <https://llm-evals-result.narwh.dev/>

## Executed Publication

1. `git push --atomic origin HEAD:refs/heads/llm/voxel-chinese-architecture refs/tags/candidate/voxel-chinese-architecture/gpt-6.1-sol` from the curator worktree: passed, branch and tag pushed together.
2. `node deploy/build.mjs voxel-chinese-architecture/gpt-6.1-sol`: passed, 1 / 1 candidate. Installed using its lockfile and built with `--base=/voxel-chinese-architecture/gpt-6.1-sol/`; generated three candidate files and refreshed the existing gallery index without rebuilding or removing other candidates. The temporary build worktree was cleaned up by the script.
3. `npm exec --yes --package=wrangler@4.144.0 -- wrangler whoami`: confirmed the existing authenticated publishing account. No credential values were added to the repository.
4. `npm exec --yes --package=wrangler@4.144.0 -- wrangler deploy --config deploy/wrangler.jsonc --dry-run`: passed; read 880 existing asset-directory files. No deployment configuration changes.
5. `npm exec --yes --package=wrangler@4.144.0 -- wrangler deploy --config deploy/wrangler.jsonc`: passed, uploaded the three new candidate files plus the updated root index, retaining the other gallery assets. Published Worker `llm-evals-gallery` to its existing `llm-evals-result.narwh.dev` custom domain.

Published Cloudflare version ID: `755e2633-b77b-4597-b0f1-75b5dbd53d19`.

There was no locally installed Wrangler dependency. The repository's documented npx deployment approach was followed using an explicit pinned CLI version, without adding a second package or changing shared configuration. An initial `npx --no-install wrangler --version` probe failed because the package was not already installed. A documentation lookup of the old `/commands/deploy/` URL returned 404; the command index and installed `deploy --help` provided the supported syntax.

## Live Acceptance

The same model personally inspected the deployed page through Kimi WebBridge. Actual desktop CSS viewport was verified as `1440 × 900`; the full ensemble was visible. `window.__temple.stats()` reported seven buildings, 32,296 voxels, 11 sampled framebuffer colors, WebGL error `0`, and all projected site bounds inside the frame. The pre-initialization page-error collector reported no errors. The deployed JavaScript and CSS returned HTTP 200, and fetching the gallery root returned HTTP 200 with the candidate link present.

`publication-gpt-6.1-sol-1440.png` is the verified standard desktop publication screenshot. `publication-gpt-6.1-sol.png` preserves an initial online check at `960 × 600` CSS viewport before the final standard-view correction.

Local development and production-preview processes were stopped; no candidate listeners remain on 5178 or 4178. Browser network capture and focus emulation were disabled after final acceptance. The user's browser tab group was left open because closure is user-initiated. The permanent root checkout remained on main and its pre-existing untracked plan file was preserved.

The candidate's build-size warning and variable background-automation frame rate remain documented in its immutable `RESULTS.md`; this publication does not imply uniform comparison with candidates from other baselines.
