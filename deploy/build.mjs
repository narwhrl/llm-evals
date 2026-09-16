#!/usr/bin/env node
// 把 origin 上每个 llm/* 分支的 tasks/<task-id>/solution/ 构建到 deploy/public/<task-id>/<model-id>/，
// 供单个 Worker 以路径前缀方式托管。用法：
//   node deploy/build.mjs                 # 构建全部
//   node deploy/build.mjs ui-ux-design/kimi-k3 [其他 task/model ...]   # 只构建指定候选
//   BUILD_CONCURRENCY=2 node deploy/build.mjs

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEPLOY_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(DEPLOY_DIR, "..");
const PUBLIC_DIR = join(DEPLOY_DIR, "public");
const TMP_ROOT = join(REPO_ROOT, ".worktrees", ".deploy-tmp");
const CONCURRENCY = Math.max(1, Number(process.env.BUILD_CONCURRENCY ?? 4));

const fwd = (p) => p.replace(/\\/g, "/");
const quote = (v) => (/[\s"]/.test(v) ? `"${v.replace(/"/g, '\\"')}"` : v);

function run(cmdline, cwd = REPO_ROOT, capture = false) {
  const res = spawnSync(cmdline, { cwd, shell: true, encoding: "utf8", stdio: capture ? "pipe" : "inherit" });
  if (res.status !== 0) {
    const tail = capture ? `\n${(res.stdout ?? "") + (res.stderr ?? "")}`.split("\n").slice(-25).join("\n") : "";
    throw new Error(`命令失败（退出码 ${res.status}）：${cmdline}${tail}`);
  }
  return res.stdout ?? "";
}

function discoverTargets(filter) {
  const refs = run("git for-each-ref --format=%(refname) refs/remotes/origin/llm/", REPO_ROOT, true)
    .trim()
    .split("\n")
    .filter(Boolean);

  const targets = [];
  const skipped = [];
  for (const ref of refs) {
    const rest = ref.replace("refs/remotes/origin/llm/", "");
    const slash = rest.indexOf("/");
    if (slash < 0) continue;
    const task = rest.slice(0, slash);
    const model = rest.slice(slash + 1);
    if (filter.length && !filter.includes(`${task}/${model}`)) continue;

    const probe = spawnSync(`git cat-file -e ${ref}:tasks/${task}/solution/package.json`, {
      cwd: REPO_ROOT,
      shell: true,
      stdio: "ignore",
    });
    if (probe.status !== 0) {
      skipped.push(`${task}/${model}`);
      continue;
    }
    targets.push({ ref, task, model });
  }
  targets.sort((a, b) => (a.task + a.model).localeCompare(b.task + b.model));
  return { targets, skipped };
}

function dirSize(dir) {
  let bytes = 0;
  let files = 0;
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else {
        bytes += statSync(full).size;
        files += 1;
      }
    }
  };
  walk(dir);
  return { bytes, files };
}

function buildOne({ ref, task, model }) {
  const tmp = join(TMP_ROOT, `${task}--${model}`);
  const outDir = join(PUBLIC_DIR, task, model);
  const base = `/${task}/${model}/`;

  rmSync(tmp, { recursive: true, force: true });
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  run(`git worktree add --detach --force ${quote(fwd(tmp))} ${ref}`);

  try {
    const solution = join(tmp, "tasks", task, "solution");
    const install = existsSync(join(solution, "package-lock.json"))
      ? "npm ci --no-audit --no-fund"
      : "npm install --no-audit --no-fund";
    run(install, solution);
    run(`npm run build -- --base=${base} --outDir=${quote(fwd(outDir))} --emptyOutDir`, solution);

    if (!existsSync(join(outDir, "index.html"))) throw new Error("构建后没有生成 index.html");
    const { bytes, files } = dirSize(outDir);
    return { ref, task, model, base, ok: true, bytes, files };
  } finally {
    try {
      run(`git worktree remove --force ${quote(fwd(tmp))}`);
    } catch (error) {
      console.error(`清理临时 worktree 失败：${error.message}`);
    }
  }
}

function renderGallery(results, skipped) {
  const byTask = new Map();
  for (const result of results) {
    if (!byTask.has(result.task)) byTask.set(result.task, []);
    byTask.get(result.task).push(result);
  }

  const sections = [...byTask.entries()]
    .map(([task, entries]) => {
      const ok = entries.filter((e) => e.ok);
      const failed = entries.filter((e) => !e.ok);
      const items = [
        ...ok.map(
          (e) =>
            `<li><a href="${e.base}"><span class="model">${e.model}</span><span class="meta">${e.files} 个文件 · ${(e.bytes / 1024 / 1024).toFixed(1)} MB</span></a></li>`,
        ),
        ...failed.map(
          (e) =>
            `<li class="failed"><span class="model">${e.model}</span><span class="meta">构建失败：${e.reason}</span></li>`,
        ),
      ].join("\n        ");
      return `<section>
      <h2>${task} <span class="count">${ok.length}/${entries.length}</span></h2>
      <ul>
        ${items}
      </ul>
    </section>`;
    })
    .join("\n    ");

  const skippedNote = skipped.length
    ? `<p class="note">无候选实现、已跳过：${skipped.map((s) => `<code>${s}</code>`).join("、")}</p>`
    : "";

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>LLM Evals — 候选作品画廊</title>
    <style>
      :root { color-scheme: light dark; }
      body { margin: 0 auto; max-width: 62rem; padding: 3rem 1.5rem 5rem; font: 16px/1.6 ui-sans-serif, system-ui, "Segoe UI", sans-serif; }
      h1 { font-size: 1.6rem; margin: 0 0 .25rem; }
      .lede { margin: 0 0 2.5rem; opacity: .7; }
      section { margin-bottom: 2.5rem; }
      h2 { font-size: 1rem; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; border-bottom: 1px solid currentColor; padding-bottom: .5rem; display: flex; justify-content: space-between; gap: 1rem; }
      .count { opacity: .5; font-weight: 400; }
      ul { list-style: none; margin: .75rem 0 0; padding: 0; display: grid; gap: .25rem; grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr)); }
      li a { display: flex; justify-content: space-between; gap: 1rem; padding: .5rem .75rem; text-decoration: none; color: inherit; border-radius: 6px; }
      li a:hover { background: color-mix(in oklab, currentColor 10%, transparent); }
      .meta { opacity: .55; font-size: .85rem; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .failed .meta { color: #b4451f; opacity: 1; }
      .note { margin-top: 3rem; font-size: .85rem; opacity: .7; }
      code { font-size: .85em; }
    </style>
  </head>
  <body>
    <h1>LLM Evals — 候选作品画廊</h1>
    <p class="lede">${results.filter((r) => r.ok).length} 个候选实现，按 <code>/&lt;task-id&gt;/&lt;model-id&gt;/</code> 路径访问。构建于 ${new Date().toISOString()}</p>
    ${sections}
    ${skippedNote}
  </body>
</html>
`;
}

async function main() {
  const filter = process.argv.slice(2);
  mkdirSync(PUBLIC_DIR, { recursive: true });
  mkdirSync(TMP_ROOT, { recursive: true });
  run("git fetch --all --prune");

  const { targets, skipped } = discoverTargets(filter);
  if (!targets.length) throw new Error("没有找到可构建的候选实现");
  console.log(`准备构建 ${targets.length} 个候选实现，并发 ${CONCURRENCY}，已跳过 ${skipped.length} 个空分支`);

  const results = [];
  let cursor = 0;
  const workers = Array.from({ length: Math.min(CONCURRENCY, targets.length) }, async () => {
    while (cursor < targets.length) {
      const target = targets[cursor++];
      const label = `${target.task}/${target.model}`;
      console.log(`\n=== 构建 ${label} ===`);
      try {
        const result = buildOne(target);
        console.log(`=== 完成 ${label}（${result.files} 个文件）===`);
        results.push(result);
      } catch (error) {
        console.error(`=== 失败 ${label}：${error.message.split("\n")[0]} ===`);
        results.push({ ...target, ok: false, reason: error.message.split("\n")[0] });
      }
    }
  });
  await Promise.all(workers);

  results.sort((a, b) => (a.task + a.model).localeCompare(b.task + b.model));
  rmSync(join(PUBLIC_DIR, "index.html"), { force: true });
  writeFileSync(join(PUBLIC_DIR, "index.html"), renderGallery(results, skipped), "utf8");

  const failed = results.filter((r) => !r.ok);
  console.log("\n================ 构建汇总 ================");
  for (const r of results) {
    console.log(`${r.ok ? "OK  " : "FAIL"}  ${`${r.task}/${r.model}`.padEnd(52)} ${r.ok ? `${r.files} 个文件 ${(r.bytes / 1024 / 1024).toFixed(1)} MB` : r.reason}`);
  }
  console.log(`成功 ${results.length - failed.length} / ${results.length}，输出目录：${PUBLIC_DIR}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
