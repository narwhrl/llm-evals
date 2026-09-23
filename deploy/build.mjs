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

const TASK_LABELS = {
  "cs-pvp-diorama": "CS PVP Diorama",
  "gargantua-schwarzschild-raytracer": "Gargantua Schwarzschild Raytracer",
  "ui-ux-design": "UI/UX Design",
  "voxel-chinese-architecture": "Voxel Chinese Architecture",
  "voxel-waterfall": "Voxel Waterfall",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function encodePathSegment(value) {
  return encodeURIComponent(String(value ?? ""));
}

function formatTaskLabel(task) {
  if (TASK_LABELS[task]) return TASK_LABELS[task];
  return String(task)
    .split("-")
    .filter(Boolean)
    .map((part) => (part.length <= 3 ? part.toUpperCase() : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join(" ");
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value === 0) return "0 B";
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / 1024 / 1024).toFixed(1)} MB`;
}

function decorateEntry(entry) {
  const taskLabel = formatTaskLabel(entry.task);
  return {
    ...entry,
    taskLabel,
    href: `/${encodePathSegment(entry.task)}/${encodePathSegment(entry.model)}/`,
    searchText: `${entry.task} ${taskLabel} ${entry.model}`.toLocaleLowerCase(),
  };
}

function collectPublished() {
  const published = [];
  for (const task of readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    if (!task.isDirectory()) continue;
    for (const model of readdirSync(join(PUBLIC_DIR, task.name), { withFileTypes: true })) {
      if (!model.isDirectory()) continue;
      const dir = join(PUBLIC_DIR, task.name, model.name);
      if (!existsSync(join(dir, "index.html"))) continue;
      const { bytes, files } = dirSize(dir);
      published.push({ task: task.name, model: model.name, ok: true, bytes, files });
    }
  }
  return published;
}

function renderGallery(entries, { generatedAt, failed, skipped }) {
  const published = entries.filter((entry) => entry.ok).map(decorateEntry);
  const byTask = new Map();
  for (const entry of published) {
    if (!byTask.has(entry.task)) byTask.set(entry.task, []);
    byTask.get(entry.task).push(entry);
  }

  const taskEntries = [...byTask.entries()].sort(([a], [b]) => a.localeCompare(b));
  const taskOptions = taskEntries
    .map(
      ([task, taskItems]) =>
        `<option value="${escapeHtml(task)}">${escapeHtml(formatTaskLabel(task))} · ${taskItems.length}</option>`,
    )
    .join("");
  let cardIndex = 0;
  const sections = taskEntries
    .map(([task, taskItems], sectionIndex) => {
      const taskLabel = formatTaskLabel(task);
      const cards = taskItems
        .map((entry) => {
          cardIndex += 1;
          const cardNumber = String(cardIndex).padStart(2, "0");
          return `<li class="work-card" data-work-card data-task="${escapeHtml(entry.task)}" data-search="${escapeHtml(entry.searchText)}">
          <a class="work-link" href="${escapeHtml(entry.href)}">
            <span class="card-top"><span class="card-number">[${cardNumber}]</span><span class="card-type">IMPLEMENTATION</span><span class="card-arrow" aria-hidden="true">↗</span></span>
            <span class="card-copy">
              <span class="card-kicker">~/ ${escapeHtml(entry.task)}</span>
              <strong class="model">${escapeHtml(entry.model)}</strong>
              <span class="card-bottom"><span class="meta">${entry.files} files <span aria-hidden="true">/</span> ${escapeHtml(formatBytes(entry.bytes))}</span><span class="open-label">打开作品 <span aria-hidden="true">→</span></span></span>
            </span>
          </a>
        </li>`;
        })
        .join("\n          ");
      return `<section class="task-section" data-task-section data-task="${escapeHtml(task)}">
        <header class="section-heading">
          <div>
            <p class="section-index"><span aria-hidden="true">/</span> ${String(sectionIndex + 1).padStart(2, "0")}</p>
            <h2>${escapeHtml(taskLabel)}</h2>
            <p class="section-slug"><code>${escapeHtml(task)}</code></p>
          </div>
          <p class="section-count"><strong>${String(taskItems.length).padStart(2, "0")}</strong><span>作品</span></p>
        </header>
        <ul class="work-grid">
          ${cards}
        </ul>
      </section>`;
    })
    .join("\n      ");

  const diagnosticEntries = [
    ...failed.map((entry) => ({ label: `${entry.task}/${entry.model}`, detail: `构建失败：${entry.reason}` })),
    ...skipped.map((label) => ({ label, detail: "未找到可构建的 package.json，已跳过" })),
  ];
  const diagnostics = diagnosticEntries.length
    ? `<details class="diagnostics">
        <summary><span>构建诊断</span><span class="diagnostic-count">${diagnosticEntries.length} 项</span></summary>
        <ul>
          ${diagnosticEntries
            .map(
              (entry) =>
                `<li><code>${escapeHtml(entry.label)}</code><span>${escapeHtml(entry.detail)}</span></li>`,
            )
            .join("\n          ")}
        </ul>
      </details>`
    : "";

  const total = published.length;
  const taskCount = taskEntries.length;
  const generatedDate = new Date(generatedAt);
  const displayDate = Number.isNaN(generatedDate.valueOf())
    ? generatedAt
    : generatedDate.toLocaleString("zh-CN", { dateStyle: "medium", timeStyle: "short" });

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#fafafa" />
    <title>LLM Evals — 候选作品画廊</title>
    <style>
      :root { color-scheme: light; --bg: #fafafa; --surface: #fff; --text: #171717; --muted: #666; --faint: #757575; --line: #e5e5e5; --accent: #0070f3; }
      * { box-sizing: border-box; }
      html { background: var(--bg); }
      body { min-width: 320px; margin: 0; color: var(--text); background: var(--bg); font: 13px/1.6 "SFMono-Regular", Consolas, "Liberation Mono", "Noto Sans Mono CJK SC", monospace; -webkit-font-smoothing: antialiased; }
      ::selection { color: #fff; background: var(--text); }
      a { color: inherit; }
      button, input, select, code { font: inherit; }
      button, a, select, input { -webkit-tap-highlight-color: transparent; }
      [hidden] { display: none !important; }
      h1, h2, p { margin: 0; }
      .shell { width: min(100% - 96px, 1200px); margin: auto; border-inline: 1px solid var(--line); }
      .topbar { min-height: 76px; display: flex; justify-content: space-between; align-items: center; gap: 24px; padding: 0 32px; border-bottom: 1px solid var(--line); }
      .brand { display: inline-flex; align-items: center; gap: 12px; text-decoration: none; font-size: 15px; font-weight: 700; letter-spacing: -.6px; }
      .brand-mark { display: grid; place-items: center; width: 26px; height: 26px; background: var(--text); color: white; font-size: 14px; font-style: normal; }
      .brand-divider { height: 20px; width: 1px; margin: 0 5px; background: var(--line); transform: rotate(20deg); }
      .brand-context, .topbar-note { color: var(--muted); font-size: 11px; font-weight: 400; letter-spacing: 0; }
      .topbar-note { display: flex; align-items: center; gap: 8px; }
      .status-dot { display: inline-block; width: 6px; height: 6px; background: currentColor; border-radius: 50%; }
      .hero { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 236px; gap: 48px; padding: 72px 40px 64px; border-bottom: 1px solid var(--line); background: var(--surface); }
      .hero::before, .hero::after { content: "+"; position: absolute; bottom: -13px; z-index: 1; color: #a3a3a3; font-size: 18px; line-height: 24px; font-weight: 400; }
      .hero::before { left: -6px; } .hero::after { right: -6px; }
      .eyebrow { margin-bottom: 24px; font-size: 11px; color: var(--muted); }
      .prompt { color: var(--accent); }
      h1 { font-size: clamp(38px, 5.2vw, 66px); line-height: 1.1; letter-spacing: -.065em; font-weight: 500; }
      .cursor { display: inline-block; width: .45em; height: .82em; margin-left: .15em; background: var(--text); vertical-align: -.02em; }
      .lede { max-width: 580px; margin-top: 26px; color: var(--muted); font-size: 12px; line-height: 2; }
      .hero-stats { align-self: end; border: 1px solid var(--line); background: var(--bg); }
      .stats-title { padding: 9px 14px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 10px; }
      .stat { display: flex; justify-content: space-between; align-items: baseline; padding: 12px 14px; }
      .stat + .stat { border-top: 1px dashed var(--line); }
      .stat strong { order: 2; font-size: 24px; font-weight: 400; line-height: 1; letter-spacing: -1px; }
      .stat span { color: var(--muted); font-size: 11px; }
      .workspace { padding: 0 40px 48px; }
      .toolbar { padding: 30px 0 0; }
      .filter-form { display: flex; flex-wrap: wrap; gap: 10px; }
      .field { display: flex; align-items: center; height: 42px; border: 1px solid #d4d4d4; border-radius: 4px; background: var(--surface); }
      .search-field { flex: 1; min-width: 200px; gap: 10px; padding: 0 12px; }
      .search-icon { flex: none; width: 16px; height: 16px; color: var(--muted); }
      .field input, .field select { width: 100%; min-width: 0; border: 0; outline: 0; color: var(--text); background: transparent; font-size: 12px; }
      .field input::placeholder { color: var(--faint); }
      .select-field { width: 270px; max-width: 100%; padding: 0 10px; }
      .select-field select { cursor: pointer; height: 100%; }
      .clear-button { min-height: 42px; padding: 0 12px; border: 1px solid #d4d4d4; border-radius: 4px; color: var(--text); background: white; cursor: pointer; font-size: 12px; }
      .clear-button:hover { background: #f0f0f0; }
      .result-line { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin: 18px 0 4px; color: var(--muted); font-size: 10px; }
      .results-status::before { content: "↳ "; color: var(--faint); }
      .view-label { letter-spacing: .06em; }
      .task-section { padding-top: 34px; }
      .section-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 15px; }
      .section-heading > div { display: grid; grid-template-columns: 38px minmax(0, 1fr); column-gap: 6px; align-items: baseline; }
      .section-index { grid-row: span 2; color: var(--muted); font-size: 11px; }
      .section-index span { color: #a3a3a3; }
      h2 { font-size: 15px; font-weight: 600; line-height: 1.6; letter-spacing: -.4px; overflow-wrap: anywhere; }
      .section-slug { margin-top: 2px; color: var(--faint); font-size: 10px; overflow-wrap: anywhere; }
      .section-count { display: flex; align-items: center; gap: 8px; flex-shrink: 0; color: var(--muted); font-size: 10px; }
      .section-count strong { display: grid; place-items: center; min-width: 25px; height: 23px; border: 1px solid var(--line); font-weight: 400; background: white; }
      .work-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; margin: 0; padding: 1px; list-style: none; background: var(--line); border: 0; }
      .work-card { position: relative; min-width: 0; background: var(--surface); transition: background .15s; }
      .work-card:hover { z-index: 1; background: #fafafa; box-shadow: 0 0 0 1px #a3a3a3; }
      .work-link { display: flex; height: 100%; min-height: 202px; flex-direction: column; padding: 22px; text-decoration: none; }
      .card-top { display: flex; align-items: center; gap: 10px; color: var(--faint); font-size: 10px; }
      .card-number { color: var(--muted); }
      .card-type { font-size: 9px; letter-spacing: .07em; }
      .card-arrow { margin-left: auto; color: var(--muted); font-size: 17px; line-height: 1; transition: transform .15s, color .15s; }
      .card-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; padding-top: 26px; }
      .card-kicker { color: var(--faint); font-size: 9px; overflow-wrap: anywhere; }
      .model { display: block; margin: 7px 0 25px; font-size: 18px; font-weight: 500; line-height: 1.3; letter-spacing: -.7px; overflow-wrap: anywhere; }
      .card-bottom { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px; margin-top: auto; padding-top: 14px; border-top: 1px dashed var(--line); font-size: 10px; }
      .meta { color: var(--muted); } .meta > span { color: #a3a3a3; padding: 0 3px; }
      .open-label { color: var(--muted); }
      .work-card:hover .card-arrow { transform: translate(2px, -2px); color: var(--text); }
      .work-card:hover .open-label { color: var(--accent); }
      :is(a, button, summary):focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
      .field:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
      .empty-state { margin-top: 30px; padding: 64px 20px; border: 1px dashed #d4d4d4; color: var(--muted); text-align: center; font-size: 12px; }
      .empty-state::before { content: "[ no results ]"; display: block; margin-bottom: 16px; font-size: 11px; }
      .empty-state strong { display: block; margin-bottom: 8px; color: var(--text); font-size: 15px; font-weight: 500; }
      .diagnostics { margin-top: 40px; border: 1px solid var(--line); color: var(--muted); background: white; font-size: 11px; }
      .diagnostics summary { display: flex; gap: 10px; padding: 14px 16px; cursor: pointer; list-style: none; }
      .diagnostics summary::-webkit-details-marker { display: none; }
      .diagnostics summary::before { content: "+"; }
      .diagnostics[open] summary::before { content: "−"; }
      .diagnostic-count { margin-left: auto; }
      .diagnostics ul { display: grid; gap: 12px; margin: 0; padding: 16px; border-top: 1px solid var(--line); list-style: none; }
      .diagnostics li { display: grid; gap: 4px; overflow-wrap: anywhere; }
      .diagnostics li code { color: var(--text); }
      .footer { display: flex; justify-content: space-between; gap: 20px; padding: 22px 40px; border-top: 1px solid var(--line); color: var(--muted); font-size: 10px; }
      .footer-label { color: var(--text); }
      .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
      @media (min-width: 1001px) { .work-card:only-child { grid-column: span 2; } }
      @media (max-width: 1000px) {
        .shell { width: calc(100% - 48px); }
        .hero { grid-template-columns: minmax(0, 1fr) 190px; gap: 24px; padding: 56px 28px; }
        .workspace { padding-inline: 28px; }
        .work-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .footer { padding-inline: 28px; }
      }
      @media (max-width: 640px) {
        .shell { width: calc(100% - 32px); }
        .topbar { min-height: 64px; padding: 0 18px; }
        .brand-context, .brand-divider, .topbar-note { display: none; }
        .hero { grid-template-columns: 1fr; padding: 42px 20px 32px; gap: 30px; }
        h1 { font-size: clamp(34px, 8.8vw, 54px); }
        .eyebrow { margin-bottom: 20px; font-size: 10px; }
        .lede { margin-top: 20px; font-size: 11px; }
        .hero-stats { display: grid; grid-template-columns: 1fr 1fr; }
        .stats-title { grid-column: 1 / -1; }
        .stat + .stat { border-top: 0; border-left: 1px solid var(--line); }
        .workspace { padding: 0 16px 32px; }
        .toolbar { padding-top: 24px; }
        .search-field { flex-basis: 100%; min-width: 0; }
        .select-field { flex: 1; width: auto; min-width: 0; }
        .view-label { display: none; }
        .task-section { padding-top: 28px; }
        .section-heading { gap: 10px; align-items: start; }
        .section-heading > div { grid-template-columns: 25px minmax(0, 1fr); }
        h2 { font-size: 13px; } .section-slug { font-size: 9px; }
        .section-count span { display: none; }
        .work-grid { grid-template-columns: 1fr; }
        .work-link { min-height: 190px; padding: 20px; }
        .footer { flex-direction: column; gap: 8px; padding: 20px; font-size: 9px; }
      }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; } }
    </style>
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <a class="brand" href="/" aria-label="LLM Evals 首页"><i class="brand-mark" aria-hidden="true">&gt;_</i>llm/evals<span class="brand-divider" aria-hidden="true"></span><span class="brand-context">gallery</span></a>
        <span class="topbar-note"><span class="status-dot" aria-hidden="true"></span>模型实验 / 作品索引</span>
      </header>
      <main data-gallery>
        <section class="hero" aria-labelledby="page-title">
          <div>
            <p class="eyebrow"><span class="prompt">~ $</span> ls ./experiments</p>
            <h1 id="page-title">One prompt.<br />Many outputs.<span class="cursor" aria-hidden="true"></span></h1>
            <p class="lede">同一道题，不同模型的答案。<br />浏览、运行、比较。让作品自己说话。</p>
          </div>
          <div class="hero-stats" aria-label="画廊统计">
            <p class="stats-title">index / 实验索引</p>
            <div class="stat"><strong>${String(total).padStart(2, "0")}</strong><span>作品 / entries</span></div>
            <div class="stat"><strong>${String(taskCount).padStart(2, "0")}</strong><span>任务 / tasks</span></div>
          </div>
        </section>
        <div class="workspace">
        <section class="toolbar" aria-label="筛选作品">
          <form class="filter-form" id="gallery-filters">
            <label class="field search-field">
              <span class="sr-only">搜索任务或模型</span>
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5"></circle><path d="m16 16 5 5"></path></svg>
              <input id="gallery-search" type="search" placeholder="搜索任务或模型…" autocomplete="off" spellcheck="false" enterkeyhint="search" />
            </label>
            <label class="field select-field">
              <span class="sr-only">按任务筛选</span>
              <select id="gallery-task"><option value="">全部任务 · ${taskCount}</option>${taskOptions}</select>
            </label>
            <button class="clear-button" id="gallery-clear" type="button" hidden>清除筛选</button>
          </form>
          <div class="result-line"><p class="results-status" id="gallery-status" aria-live="polite">显示 ${total} 个作品</p><span class="view-label">INDEX / BY TASK</span></div>
        </section>
        <div id="gallery-results">
          ${sections}
        </div>
        <div class="empty-state" id="gallery-empty" hidden>
          <strong>没有找到匹配的作品</strong>
          换一个关键词，或清除当前筛选条件。
        </div>
        ${diagnostics}
        </div>
      </main>
      <footer class="footer">
        <p><span class="footer-label">llm/evals</span> <span aria-hidden="true">/</span> 相同命题，独立实现。</p>
        <p>最后更新 <time datetime="${escapeHtml(generatedAt)}">${escapeHtml(displayDate)}</time></p>
      </footer>
    </div>
    <script>
      (() => {
        const search = document.querySelector("#gallery-search");
        const task = document.querySelector("#gallery-task");
        const clear = document.querySelector("#gallery-clear");
        const status = document.querySelector("#gallery-status");
        const empty = document.querySelector("#gallery-empty");
        const cards = [...document.querySelectorAll("[data-work-card]")];
        const sections = [...document.querySelectorAll("[data-task-section]")];
        const total = cards.length;

        const readUrlState = () => {
          const params = new URLSearchParams(window.location.search);
          return { query: params.get("q") || "", task: params.get("task") || "" };
        };

        const writeUrlState = () => {
          const params = new URLSearchParams(window.location.search);
          const query = search.value.trim();
          if (query) params.set("q", query);
          else params.delete("q");
          if (task.value) params.set("task", task.value);
          else params.delete("task");
          const queryString = params.toString();
          const next = window.location.pathname + (queryString ? "?" + queryString : "") + window.location.hash;
          window.history.replaceState(null, "", next);
        };

        const applyFilters = (syncUrl = true) => {
          const query = search.value.trim().toLocaleLowerCase();
          let visible = 0;
          cards.forEach((card) => {
            const matchesQuery = !query || card.dataset.search.includes(query);
            const matchesTask = !task.value || card.dataset.task === task.value;
            const matches = matchesQuery && matchesTask;
            card.hidden = !matches;
            if (matches) visible += 1;
          });
          sections.forEach((section) => {
            section.hidden = !section.querySelector("[data-work-card]:not([hidden])");
          });
          empty.hidden = visible !== 0;
          status.textContent = visible === total ? "显示 " + total + " 个作品" : "显示 " + visible + " / " + total + " 个作品";
          clear.hidden = !search.value.trim() && !task.value;
          if (syncUrl) writeUrlState();
        };

        const initial = readUrlState();
        search.value = initial.query;
        task.value = initial.task;
        if (task.value !== initial.task) task.value = "";
        document.querySelector("#gallery-filters").addEventListener("submit", (event) => {
          event.preventDefault();
          applyFilters();
        });
        search.addEventListener("input", () => applyFilters());
        task.addEventListener("change", () => applyFilters());
        clear.addEventListener("click", () => {
          search.value = "";
          task.value = "";
          search.focus();
          applyFilters();
        });
        window.addEventListener("popstate", () => {
          const next = readUrlState();
          search.value = next.query;
          task.value = next.task;
          if (task.value !== next.task) task.value = "";
          applyFilters(false);
        });
        applyFilters(false);
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
  const failed = results.filter((r) => !r.ok);
  // 画廊页始终按 public/ 里实际存在的产物生成，部分重建不会漏掉其他候选。
  const published = collectPublished();
  const listed = new Set(published.map((e) => `${e.task}/${e.model}`));
  const entries = [...published, ...results.filter((r) => !r.ok && !listed.has(`${r.task}/${r.model}`))];
  entries.sort((a, b) => (a.task + a.model).localeCompare(b.task + b.model));
  rmSync(join(PUBLIC_DIR, "index.html"), { force: true });
  writeFileSync(
    join(PUBLIC_DIR, "index.html"),
    renderGallery(entries, { generatedAt: new Date().toISOString(), failed, skipped }),
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
