#!/usr/bin/env node
// 把 origin 上每个 llm/<task-id> 分支的 solutions/<candidate-id>/ 构建到 deploy/public/<task-id>/<candidate-id>/，
// 供单个 Worker 以路径前缀方式托管。用法：
//   node deploy/build.mjs                 # 构建全部
//   node deploy/build.mjs ui-ux-design/kimi-k3 [其他 task/model ...]   # 只构建指定候选
//   BUILD_CONCURRENCY=2 node deploy/build.mjs

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
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

// 每个任务分支读一次：候选目录、是否可构建、是否有 RESULTS.md、imports.json 记录。
function loadArchive() {
  const repoUrl = run("git remote get-url origin", REPO_ROOT, true).trim().replace(/\.git$/, "");
  const refs = run("git for-each-ref --format=%(refname) refs/remotes/origin/llm/", REPO_ROOT, true)
    .trim()
    .split("\n")
    .filter(Boolean);

  const tasks = new Map();
  for (const ref of refs) {
    const task = ref.replace("refs/remotes/origin/llm/", "");
    if (!/^[a-z0-9][a-z0-9-]*$/.test(task)) continue;
    const root = `tasks/${task}/solutions/`;
    const candidates = new Map();
    for (const file of run(`git ls-tree -r --name-only ${ref} ${root}`, REPO_ROOT, true).split("\n")) {
      if (!file.startsWith(root)) continue;
      const [model, ...rest] = file.slice(root.length).split("/");
      if (!/^[a-z0-9][a-z0-9.-]*$/.test(model)) continue;
      if (!candidates.has(model)) candidates.set(model, { hasPackage: false, hasReport: false });
      const path = rest.join("/");
      if (path === "package.json") candidates.get(model).hasPackage = true;
      if (path === "RESULTS.md") candidates.get(model).hasReport = true;
    }
    if (!candidates.size) continue;

    const records = new Map();
    const imports = spawnSync("git", ["show", `${ref}:tasks/${task}/imports.json`], { cwd: REPO_ROOT, encoding: "utf8" });
    if (imports.status === 0) for (const record of JSON.parse(imports.stdout).candidates) records.set(record.candidateId, record);

    const readme = join(REPO_ROOT, "tasks", task, "README.md");
    const title = existsSync(readme)
      ? readFileSync(readme, "utf8").split(/\r?\n/)[0].replace(/^#\s+/, "").replace(/\s+Evaluation$/, "")
      : task;
    tasks.set(task, { ref, title, short: title.split(" — ")[0], candidates, records });
  }
  return { repoUrl, tasks };
}

function selectTargets(archive, filter) {
  const targets = [];
  const skipped = [];
  for (const [task, meta] of archive.tasks) {
    for (const [model, candidate] of meta.candidates) {
      if (filter.length && !filter.includes(`${task}/${model}`)) continue;
      if (candidate.hasPackage) targets.push({ ref: meta.ref, task, model });
      else skipped.push(`${task}/${model}`);
    }
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
    const solution = join(tmp, "tasks", task, "solutions", model);
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

// 已从归档删除的候选不再部署。
function prunePublished(archive) {
  for (const task of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (!task.isDirectory()) continue;
    const meta = archive.tasks.get(task.name);
    for (const model of readdirSync(join(PUBLIC_DIR, task.name))) {
      if (meta?.candidates.has(model)) continue;
      rmSync(join(PUBLIC_DIR, task.name, model), { recursive: true, force: true });
      console.log(`移除已不在归档中的产物 ${task.name}/${model}`);
    }
    if (!meta) rmSync(join(PUBLIC_DIR, task.name), { recursive: true, force: true });
  }
}

function collectPublished() {
  const published = [];
  for (const task of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (!task.isDirectory()) continue;
    for (const model of readdirSync(join(PUBLIC_DIR, task.name), { withFileTypes: true })) {
      if (model.isDirectory() && existsSync(join(PUBLIC_DIR, task.name, model.name, "index.html"))) {
        published.push({ task: task.name, model: model.name });
      }
    }
  }
  return published;
}

const EFFORTS = ["minimal", "low", "medium", "high", "xhigh", "max"];
// 按 model id 首段识别厂商：[首段, 厂商, 品牌名, 品牌与版本号之间的连接符]。
const VENDORS = [
  ["claude", "Anthropic", "Claude"],
  ["deepseek", "DeepSeek", "DeepSeek"],
  ["gemini", "Google", "Gemini"],
  ["glm", "Z.ai", "GLM", "-"],
  ["gpt", "OpenAI", "GPT", "-"],
  ["grok", "xAI", "Grok"],
  ["kimi", "Moonshot AI", "Kimi"],
  ["mimo", "Xiaomi", "MiMo"],
  ["minimax", "MiniMax", "MiniMax"],
  ["swe", "Cognition", "SWE", "-"],
];
// 不符合 <model-id>[-<effort>] 约定的历史候选 id。
const ALIASES = {
  "opus-5.5": { model: "claude-opus-5.5" },
  "cursor-kimi-k3": { model: "kimi-k3", variant: "Cursor" },
  "cursor-c343": { vendor: "未知厂商", name: "cursor-c343", variant: "Cursor" },
  "space-bunny-free": { vendor: "未知厂商", name: "Space Bunny Free" },
  "zcode-harness": { vendor: "多模型组合", name: "ZCode Harness" },
  "omp-gpt-6-sol-minimax-m3": { vendor: "多模型组合", name: "OMP: GPT-6 Sol + MiniMax M3" },
};
const UNCLASSIFIED = "未归类";
const TRAILING_GROUPS = ["多模型组合", "未知厂商", UNCLASSIFIED];

function identify(candidate) {
  const alias = ALIASES[candidate] ?? {};
  const variant = alias.variant ?? "";
  if (alias.name) return { vendor: alias.vendor, modelId: candidate, name: alias.name, effort: "", variant };
  const tokens = (alias.model ?? candidate).split("-");
  const effort = tokens.length > 1 && EFFORTS.includes(tokens.at(-1)) ? tokens.pop() : "";
  const modelId = tokens.join("-");
  const vendor = VENDORS.find(([prefix]) => prefix === tokens[0]);
  if (!vendor) return { vendor: UNCLASSIFIED, modelId, name: modelId, effort, variant };
  const [, vendorName, brand, joiner = " "] = vendor;
  const [version, ...rest] = tokens.slice(1).map((t) => t[0].toUpperCase() + t.slice(1));
  const name = [version ? `${brand}${joiner}${version}` : brand, ...rest].join(" ");
  return { vendor: vendorName, modelId, name, effort, variant };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const byVersionDesc = (a, b) => b.localeCompare(a, "en", { numeric: true });
const effortRank = (effort) => (effort ? EFFORTS.indexOf(effort) + 1 : 0);
const effortLabel = (effort) => effort || "默认";

function groupRows(published) {
  const rows = new Map();
  for (const entry of published) {
    const id = identify(entry.model);
    const key = `${id.vendor}\n${id.modelId}`;
    if (!rows.has(key)) rows.set(key, { vendor: id.vendor, modelId: id.modelId, name: id.name, efforts: new Map() });
    const row = rows.get(key);
    if (!row.efforts.has(id.effort)) row.efforts.set(id.effort, []);
    row.efforts.get(id.effort).push({ ...entry, variant: id.variant });
  }
  const vendors = new Map();
  for (const row of rows.values()) {
    if (!vendors.has(row.vendor)) vendors.set(row.vendor, []);
    vendors.get(row.vendor).push(row);
  }
  const rank = (vendor) => TRAILING_GROUPS.indexOf(vendor);
  return [...vendors.entries()]
    .sort(([a], [b]) => rank(a) - rank(b) || a.localeCompare(b, "en", { sensitivity: "base" }))
    .map(([vendor, list]) => [vendor, list.sort((a, b) => byVersionDesc(a.modelId, b.modelId))]);
}

function renderGallery(published, archive, { generatedAt, failed, skipped }) {
  const tasks = [...new Set(published.map((entry) => entry.task))]
    .sort()
    .map((task) => ({ task, ...(archive.tasks.get(task) ?? { title: task, short: task, records: new Map() }) }));
  const vendors = groupRows(published);
  const modelCount = vendors.reduce((sum, [, rows]) => sum + rows.length, 0);
  const promptUrl = (task) => `${archive.repoUrl}/blob/main/tasks/${task}/task.md`;
  const sourceUrl = (entry) => `${archive.repoUrl}/tree/llm/${entry.task}/tasks/${entry.task}/solutions/${entry.model}`;
  const reportUrl = (entry) => `${archive.repoUrl}/blob/llm/${entry.task}/tasks/${entry.task}/solutions/${entry.model}/RESULTS.md`;
  const workUrl = (entry) => `/${encodeURIComponent(entry.task)}/${encodeURIComponent(entry.model)}/`;

  const header = tasks
    .map(
      (task) =>
        `<th scope="col"><a href="${escapeHtml(promptUrl(task.task))}" title="${escapeHtml(`${task.title} 的题面`)}">${escapeHtml(task.short)}</a></th>`,
    )
    .join("");

  let rowIndex = 0;
  const groups = vendors
    .map(([vendor, rows]) => {
      const body = rows
        .map((row) => {
          rowIndex += 1;
          const detailId = `detail-${rowIndex}`;
          const efforts = [...row.efforts.keys()].sort((a, b) => effortRank(a) - effortRank(b));
          const current = efforts[0];
          const ids = [...row.efforts.values()].flat().map((entry) => entry.model);
          const search = [row.name, row.modelId, row.vendor, ...ids].join(" ").toLocaleLowerCase();
          const segments =
            efforts.length > 1
              ? `<span class="efforts" role="group" aria-label="思考程度">${efforts
                  .map(
                    (effort) =>
                      `<button type="button" data-effort-choice="${escapeHtml(effort)}" aria-pressed="${effort === current}">${escapeHtml(effortLabel(effort))}</button>`,
                  )
                  .join("")}</span>`
              : "";
          const layerAttrs = (effort) => `data-effort="${escapeHtml(effort)}"${effort === current ? "" : " hidden"}`;

          const cells = tasks
            .map((task) => {
              const layers = efforts
                .map((effort) => {
                  const marks = row.efforts
                    .get(effort)
                    .filter((entry) => entry.task === task.task)
                    .map((entry) => {
                      const label = `${row.name}${effort ? `（${effort}）` : ""}：${task.title}${entry.variant ? `（${entry.variant}）` : ""}`;
                      const variant = entry.variant ? `<span class="variant">${escapeHtml(entry.variant)}</span>` : "";
                      return `<a class="mark" href="${escapeHtml(workUrl(entry))}" aria-label="${escapeHtml(label)}" title="${escapeHtml(entry.model)}"><span class="mark-label">${escapeHtml(task.short)}</span></a>${variant}`;
                    })
                    .join("");
                  return `<span class="layer" ${layerAttrs(effort)}>${marks}</span>`;
                })
                .join("");
              return `<td>${layers}</td>`;
            })
            .join("");

          const details = efforts
            .map((effort) => {
              const items = row.efforts
                .get(effort)
                .sort((a, b) => a.task.localeCompare(b.task))
                .map((entry) => {
                  const task = tasks.find((t) => t.task === entry.task);
                  const record = task.records.get(entry.model);
                  const hasReport = archive.tasks.get(entry.task)?.candidates.get(entry.model)?.hasReport;
                  return `<li>
                    <span class="work-task">${escapeHtml(task.title)}${entry.variant ? `（${escapeHtml(entry.variant)}）` : ""}</span>
                    <a href="${escapeHtml(workUrl(entry))}">打开作品</a>
                    <a href="${escapeHtml(sourceUrl(entry))}">源码</a>
                    ${hasReport ? `<a href="${escapeHtml(reportUrl(entry))}">报告</a>` : `<span class="missing">无报告</span>`}
                    <code class="work-id">${escapeHtml(record?.model ?? entry.model)}</code>
                  </li>`;
                })
                .join("");
              return `<ul class="works" ${layerAttrs(effort)}>${items}</ul>`;
            })
            .join("");

          return `<tr class="model-row" data-row data-search="${escapeHtml(search)}">
            <th scope="row"><button class="model-name" type="button" aria-expanded="false" aria-controls="${detailId}">${escapeHtml(row.name)}</button>${segments}</th>
            ${cells}
          </tr>
          <tr class="detail-row" id="${detailId}" hidden><td colspan="${tasks.length + 1}">${details}</td></tr>`;
        })
        .join("\n          ");
      return `<tbody data-group>
          <tr class="vendor"><th scope="rowgroup" colspan="${tasks.length + 1}">${escapeHtml(vendor)}<span class="vendor-count">${rows.length} 个模型</span></th></tr>
          ${body}
        </tbody>`;
    })
    .join("\n        ");

  const diagnosticEntries = [
    ...failed.map((entry) => ({ label: `${entry.task}/${entry.model}`, detail: `构建失败：${entry.reason}` })),
    ...skipped.map((label) => ({ label, detail: "没有 package.json，未构建" })),
  ];
  const diagnostics = diagnosticEntries.length
    ? `<details class="diagnostics">
        <summary>构建诊断（${diagnosticEntries.length} 项）</summary>
        <ul>
          ${diagnosticEntries.map((entry) => `<li><code>${escapeHtml(entry.label)}</code>${escapeHtml(entry.detail)}</li>`).join("\n          ")}
        </ul>
      </details>`
    : "";

  const generatedDate = new Date(generatedAt);
  const displayDate = Number.isNaN(generatedDate.valueOf())
    ? generatedAt
    : generatedDate.toLocaleString("zh-CN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Shanghai" });

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#f3f4f6" />
    <title>LLM Evals</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:wght@500;600&family=IBM+Plex+Sans:wght@400;500;600&display=swap" />
    <style>
      :root { color-scheme: light; --bg: #f3f4f6; --surface: #fff; --hover: #f7f8fa; --ink: #14171d; --muted: #5d6472; --rule: #dde1e7; --accent: #2343d1; --accent-ink: #1a32a3; }
      * { box-sizing: border-box; }
      body { margin: 0; color: var(--ink); background: var(--bg); font: 15px/1.55 "IBM Plex Sans", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; -webkit-font-smoothing: antialiased; }
      a { color: var(--accent-ink); }
      button, input { font: inherit; color: inherit; }
      [hidden] { display: none !important; }
      .page { width: min(100% - 48px, 1240px); margin: 0 auto; padding: 56px 0 40px; }
      .masthead { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 24px 48px; margin-bottom: 28px; }
      h1 { margin: 0; font: 600 48px/1 "IBM Plex Sans Condensed", sans-serif; letter-spacing: -0.02em; }
      .intro { max-width: 48em; margin: 14px 0 0; color: var(--muted); }
      .counts { margin: 4px 0 0; font-variant-numeric: tabular-nums; }
      .search { display: flex; align-items: center; gap: 8px; width: 300px; max-width: 100%; height: 40px; padding: 0 12px; border: 1px solid var(--rule); border-radius: 6px; background: var(--surface); }
      .search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgb(35 67 209 / 0.15); }
      .search svg { flex: none; width: 16px; height: 16px; color: var(--muted); }
      .search input { flex: 1; min-width: 0; border: 0; outline: 0; background: transparent; }
      .matrix { width: 100%; table-layout: fixed; border-collapse: separate; border-spacing: 0; background: var(--surface); border: 1px solid var(--rule); border-radius: 8px; }
      .matrix thead th { position: sticky; top: 0; z-index: 1; padding: 16px 6px 12px; border-bottom: 1px solid var(--rule); background: var(--surface); color: var(--muted); font: 500 13px/1.25 "IBM Plex Sans Condensed", sans-serif; text-align: center; vertical-align: bottom; }
      .matrix thead th:first-child { width: 26%; border-top-left-radius: 8px; }
      .matrix thead th:last-child { border-top-right-radius: 8px; }
      .matrix thead a { color: inherit; text-decoration: none; }
      .matrix thead a:hover { color: var(--ink); text-decoration: underline; text-underline-offset: 3px; }
      .vendor th { padding: 22px 18px 6px; font: 600 16px/1.3 "IBM Plex Sans Condensed", sans-serif; text-align: left; }
      tbody + tbody .vendor th { border-top: 1px solid var(--rule); }
      .vendor-count { margin-left: 10px; color: var(--muted); font: 400 13px "IBM Plex Sans", sans-serif; }
      .model-row th, .model-row td { padding: 7px 6px; }
      .model-row th { padding-left: 18px; font-weight: 500; text-align: left; }
      .model-row td { text-align: center; }
      .model-row:hover > * { background: var(--hover); }
      .model-name { padding: 0; border: 0; background: none; cursor: pointer; font-weight: 500; text-align: left; }
      .model-name::after { content: ""; display: inline-block; width: 5px; height: 5px; margin: 0 0 3px 8px; border: solid var(--muted); border-width: 0 1.5px 1.5px 0; transform: rotate(45deg); transition: transform .15s; }
      .model-name[aria-expanded="true"]::after { margin-bottom: 0; transform: rotate(-135deg); }
      .model-name:hover { color: var(--accent-ink); }
      .efforts { display: inline-flex; margin-left: 10px; padding: 2px; border: 1px solid var(--rule); border-radius: 999px; vertical-align: 1px; }
      .efforts button { padding: 0 9px; border: 0; border-radius: 999px; background: none; color: var(--muted); cursor: pointer; font-size: 12px; line-height: 20px; }
      .efforts button[aria-pressed="true"] { background: var(--ink); color: #fff; }
      .layer { display: flex; justify-content: center; align-items: center; gap: 4px; min-height: 18px; }
      .layer:empty::before { content: ""; width: 4px; height: 4px; border-radius: 50%; background: #c9ced6; }
      .mark { display: inline-block; width: 18px; height: 18px; border-radius: 3px; background: var(--accent); transition: background .12s, transform .12s; }
      .mark:hover { background: var(--accent-ink); transform: scale(1.12); }
      .mark-label { display: none; }
      .variant { color: var(--muted); font-size: 11px; }
      .detail-row td { padding: 4px 18px 18px; background: var(--hover); }
      .works { display: grid; gap: 6px; margin: 0; padding: 12px 0 0; border-top: 1px dashed var(--rule); list-style: none; font-size: 14px; }
      .works li { display: grid; grid-template-columns: minmax(180px, 2.2fr) auto auto 3.5em 3fr; gap: 18px; align-items: baseline; }
      .missing { color: var(--muted); }
      .work-id { color: var(--muted); font-family: inherit; font-size: 13px; overflow-wrap: anywhere; }
      :is(a, button, summary):focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; border-radius: 3px; }
      .empty { margin: 24px 0 0; color: var(--muted); text-align: center; }
      .diagnostics { margin-top: 32px; color: var(--muted); font-size: 13px; }
      .diagnostics summary { cursor: pointer; }
      .diagnostics ul { display: grid; gap: 6px; margin: 12px 0 0; padding: 0; list-style: none; }
      .diagnostics code { margin-right: 12px; color: var(--ink); }
      .footer { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px 24px; margin-top: 32px; color: var(--muted); font-size: 13px; }
      .footer a { color: inherit; }
      .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
      @media (max-width: 860px) {
        .page { width: calc(100% - 32px); padding-top: 32px; }
        h1 { font-size: 38px; }
        .search { width: 100%; }
        .matrix, .matrix tbody, .matrix tr, .matrix th, .matrix td { display: block; }
        .matrix { border: 0; background: none; }
        .matrix thead { display: none; }
        .vendor th { padding: 22px 0 8px; border: 0 !important; }
        .matrix .model-row { display: flex; flex-wrap: wrap; gap: 8px; padding: 12px 14px; border: 1px solid var(--rule); border-radius: 8px 8px 0 0; background: var(--surface); }
        .model-row:has(+ .detail-row[hidden]) { margin-bottom: 8px; border-radius: 8px; }
        .model-row:hover > * { background: none; }
        .model-row th { flex-basis: 100%; padding: 0 0 2px; }
        .model-row td { display: contents; }
        .layer:empty { display: none; }
        .mark { width: auto; height: auto; padding: 2px 8px; color: #fff; font-size: 13px; text-decoration: none; }
        .mark-label { display: inline; }
        .detail-row { margin-bottom: 8px; border: 1px solid var(--rule); border-top: 0; border-radius: 0 0 8px 8px; overflow: hidden; }
        .detail-row td { padding: 0 14px 14px; }
        .works li { display: flex; flex-wrap: wrap; gap: 4px 14px; padding-bottom: 6px; }
        .work-task { flex-basis: 100%; font-weight: 500; }
      }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
    </style>
  </head>
  <body>
    <div class="page">
      <header class="masthead">
        <div>
          <h1>LLM Evals</h1>
          <p class="intro">同一道题交给不同模型，各自独立完成。列标题看题面，方块看作品，点模型名看源码和报告。</p>
          <p class="counts">${tasks.length} 道题，${modelCount} 个模型，${published.length} 份作业</p>
        </div>
        <label class="search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 5 5"></path></svg>
          <span class="sr-only">搜索模型或厂商</span>
          <input id="gallery-search" type="search" placeholder="搜索模型或厂商" autocomplete="off" spellcheck="false" />
        </label>
      </header>
      <main>
        <table class="matrix">
          <thead><tr><th scope="col"><span class="sr-only">模型</span></th>${header}</tr></thead>
        ${groups}
        </table>
        <p class="empty" id="gallery-empty" hidden>没有匹配的模型，换个关键词。</p>
        ${diagnostics}
      </main>
      <footer class="footer">
        <p>构建于 <time datetime="${escapeHtml(generatedAt)}">${escapeHtml(displayDate)}</time></p>
        <p><a href="${escapeHtml(archive.repoUrl)}">仓库与评测规则</a></p>
      </footer>
    </div>
    <script>
      (() => {
        const search = document.querySelector("#gallery-search");
        const empty = document.querySelector("#gallery-empty");
        const rows = [...document.querySelectorAll("[data-row]")].map((row) => {
          const toggle = row.querySelector(".model-name");
          const detail = document.getElementById(toggle.getAttribute("aria-controls"));
          toggle.addEventListener("click", () => {
            const open = toggle.getAttribute("aria-expanded") !== "true";
            toggle.setAttribute("aria-expanded", String(open));
            detail.hidden = !open;
          });
          row.querySelectorAll("[data-effort-choice]").forEach((choice) => {
            choice.addEventListener("click", () => {
              row.querySelectorAll("[data-effort-choice]").forEach((other) => other.setAttribute("aria-pressed", String(other === choice)));
              for (const layer of [...row.querySelectorAll("[data-effort]"), ...detail.querySelectorAll("[data-effort]")]) {
                layer.hidden = layer.dataset.effort !== choice.dataset.effortChoice;
              }
            });
          });
          return { row, toggle, detail };
        });
        const groups = [...document.querySelectorAll("[data-group]")];

        const apply = () => {
          const query = search.value.trim().toLocaleLowerCase();
          let visible = 0;
          for (const { row, toggle, detail } of rows) {
            const match = !query || row.dataset.search.includes(query);
            row.hidden = !match;
            detail.hidden = !match || toggle.getAttribute("aria-expanded") !== "true";
            if (match) visible += 1;
          }
          for (const group of groups) group.hidden = !group.querySelector("[data-row]:not([hidden])");
          empty.hidden = visible !== 0;
          const params = new URLSearchParams(window.location.search);
          if (query) params.set("q", search.value.trim());
          else params.delete("q");
          const next = params.toString();
          window.history.replaceState(null, "", window.location.pathname + (next ? "?" + next : "") + window.location.hash);
        };

        search.value = new URLSearchParams(window.location.search).get("q") || "";
        search.addEventListener("input", apply);
        apply();
      })();
    </script>
  </body>
</html>
`;
}

async function main() {
  const filter = process.argv.slice(2);
  mkdirSync(PUBLIC_DIR, { recursive: true });
  mkdirSync(TMP_ROOT, { recursive: true });
  run("git fetch --all --prune");

  const archive = loadArchive();
  const { targets, skipped } = selectTargets(archive, filter);
  if (!targets.length) throw new Error("没有找到可构建的候选实现");
  console.log(`准备构建 ${targets.length} 个候选实现，并发 ${CONCURRENCY}，已跳过 ${skipped.length} 个缺少 package.json 的目录`);

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
  const failed = results.filter((r) => !r.ok);
  // 画廊页始终按 public/ 里实际存在的产物生成，部分重建不会漏掉其他候选。
  prunePublished(archive);
  const published = collectPublished();
  for (const model of new Set(published.map((entry) => entry.model))) {
    if (identify(model).vendor === UNCLASSIFIED) console.warn(`未识别厂商：${model}，请在 deploy/build.mjs 的 VENDORS 或 ALIASES 中补充`);
  }
  writeFileSync(
    join(PUBLIC_DIR, "index.html"),
    renderGallery(published, archive, { generatedAt: new Date().toISOString(), failed, skipped }),
    "utf8",
  );

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
