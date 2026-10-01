# gpt-6.1-sol gallery publication receipt

## Preserved candidate

- Model: `new-provider/gpt-6.1-sol` (single model, no subagents).
- Pinned baseline: `3b8d6817086aebaad6f7850226ab50f88f5ca01b`.
- Original source commit: `7d722c7a57ce45ff4fe5fc5c839cb0ddc50d4c3f`.
- Immutable tag: `candidate/blackhole-hero-react/gpt-6.1-sol`.
- Import commit: `b516e7c` on `llm/blackhole-hero-react`.
- Source `solution/` and imported `solutions/gpt-6.1-sol/` Git tree: `1466acce528fd65e554144c2a144465e09351109`, verified identical before publication.
- Main tracking commit: `63a46c3` (`docs: record gpt-6.1-sol blackhole hero import`). The permanent checkout remained on `main` with no candidate source on that branch.

This receipt and its supplementary browser evidence are curator metadata outside the candidate directory. The preserved source/imported solution trees have not been modified.

## Build and deployment

Executed from the permanent repository root:

```bash
git push --atomic origin main llm/blackhole-hero-react refs/tags/candidate/blackhole-hero-react/gpt-6.1-sol
node deploy/build.mjs blackhole-hero-react/gpt-6.1-sol
npx wrangler deploy --config deploy/wrangler.jsonc --dry-run
npx wrangler@4.145.0 deploy --config deploy/wrangler.jsonc
```

All commands exited 0. The gallery builder installed the archived candidate with `npm ci --no-audit --no-fund`, then ran the real Vite build with `--base=/blackhole-hero-react/gpt-6.1-sol/` and the gallery output directory. It reported 1/1 successful candidates and generated three deployment files (HTML 0.70 kB, CSS 12.59 kB, JavaScript 247.89 kB). The temporary detached build worktree was removed by the existing builder.

The existing repository uses `deploy/wrangler.jsonc`; no CLI migration or unrelated deployment configuration change was made. Local CLI help and `wrangler whoami` were inspected before deployment. Wrangler 4.145.0 authenticated against the existing Narwhrl account. It warned about proxy environment variables and, during `whoami`, missing unrelated `k2` OAuth scopes; the actual static-asset dry run and deployment completed successfully without refreshing credentials.

Before publishing, a script compared the existing live gallery links with the locally regenerated index: **84 existing live candidates, 85 local candidates, zero missing previous candidates**. Thus this was an additive partial build, not a replacement of earlier entries.

Deployment output:

```text
Read 923 files from the assets directory
Found 4 new or modified static assets to upload
+ /blackhole-hero-react/gpt-6.1-sol/index.html
+ /blackhole-hero-react/gpt-6.1-sol/assets/index-BOkB_6bN.js
+ /blackhole-hero-react/gpt-6.1-sol/assets/index-B84cqPxL.css
+ /index.html
Success! Uploaded 4 files (734 already uploaded)
Uploaded llm-evals-gallery
Deployed llm-evals-gallery triggers
llm-evals-result.narwh.dev (custom domain)
Current Version ID: 60f8dd58-42a0-497f-bd09-beb3635c90ba
```

Live candidate: <https://llm-evals-result.narwh.dev/blackhole-hero-react/gpt-6.1-sol/>

Filtered gallery: <https://llm-evals-result.narwh.dev/?q=blackhole-hero-react&task=blackhole-hero-react>

## Post-publication checks

The implementing model performed these checks itself with Kimi WebBridge, in the same Chrome 153 / Intel Arc renderer as candidate evaluation; no visual judge or other model was used.

- Production desktop at 1440 × 900: WebGL 2 ready, 1440 × 720 canvas, focus `[0.72, 0.54]` in bottom-origin shader coordinates, left scrim, no overflow, `gl.getError()=0`, no captured console errors or unhandled exceptions.
- Resized production mobile at 390 × 844: 390 × 776 canvas, focus `[0.5, 0.24]`, top scrim, no overflow, live frames resumed, no captured errors.
- Candidate HTML returned HTTP 200. Its JavaScript and CSS were served successfully; the network record includes HTTP 304 cache validation while Resource Timing reports the successful cached response as 200.
- Live gallery filtering returned exactly this entry and status `显示 1 / 85 个作品`.
- Both live PNGs were opened and visually inspected: readable original copy and links, dark shadow, luminous diagonal disc, and lensed upper/lower disc images; desktop copy/art separation and mobile top/bottom arrangement match the supplied demo. Both passed self visual acceptance.
- After the immutable candidate commit, `npm run dev -- --port 5176 --strictPort` was also actually executed. Development React StrictMode rendering completed with `@react-refresh` and the development JSX runtime, no context loss/shader error, successful local resource requests, and an active frame count. This supplements the production fixture checks; a production build alone does not exercise development StrictMode's extra effect cycle.

The detailed observations are in:

- `gpt-6.1-sol-development-check.json`
- `gpt-6.1-sol-live-check.json`
- `gpt-6.1-sol-live-desktop.png`
- `gpt-6.1-sol-live-mobile.png`

### Hosting-only analytics distinction

The Cloudflare host injects a request to `https://static.cloudflareinsights.com/beacon.min.js/...`, which is not in the candidate source or local production build. The first live verification script treated its Resource Timing status 0 as a candidate asset failure and exited 1. Network capture established that this was a separate hosting analytics request with `completed:false`, while candidate HTML/CSS/JavaScript loaded and WebGL rendered without errors. The rerun explicitly records candidate resources and infrastructure resources separately; it does **not** claim that the optional analytics request completed successfully. No analytics/account setting was changed. The candidate does not require that request to render.

## Cleanup and retention

All local production previews and the later development server were stopped, including their Windows child processes. Verification tabs were closed and focus emulation disabled. Candidate evidence is retained by the immutable source tag and exact imported tree; temporary candidate/archive worktrees are removed after this receipt is committed and pushed. The isolated `.runs/blackhole-hero-react/gpt-6.1-sol` clone is retained without an active worktree or server so the run's source history remains locally available. The user's pre-existing untracked `.zcode/plans/` note was left untouched.
