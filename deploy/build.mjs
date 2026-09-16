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
          const accent = cardIndex++ % 4;
          const cardNumber = String(cardIndex).padStart(2, "0");
          return `<li class="work-card accent-${accent}" data-work-card data-task="${escapeHtml(entry.task)}" data-search="${escapeHtml(entry.searchText)}">
          <a class="work-link" href="${escapeHtml(entry.href)}">
            <span class="card-mark" aria-hidden="true"><span>${cardNumber}</span><i></i></span>
            <span class="card-copy">
              <span class="card-kicker">${escapeHtml(taskLabel)}</span>
              <strong class="model">${escapeHtml(entry.model)}</strong>
              <span class="meta">静态构建 · ${entry.files} 个文件 · ${escapeHtml(formatBytes(entry.bytes))}</span>
            </span>
            <span class="card-arrow" aria-hidden="true">↗</span>
          </a>
        </li>`;
        })
        .join("\n          ");
      return `<section class="task-section" data-task-section data-task="${escapeHtml(task)}">
        <header class="section-heading">
          <div>
            <p class="section-index">COLLECTION ${String(sectionIndex + 1).padStart(2, "0")}</p>
            <h2>${escapeHtml(taskLabel)}</h2>
            <p class="section-slug"><code>${escapeHtml(task)}</code></p>
          </div>
          <p class="section-count"><strong>${taskItems.length}</strong><span>作品</span></p>
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
    <meta name="theme-color" content="#f4f3ef" />
    <title>LLM Evals — 候选作品画廊</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f4f3ef;
        --surface: rgba(255, 255, 255, .72);
        --surface-strong: #fff;
        --text: #1c1d1a;
        --muted: #73746e;
        --faint: #a8a9a1;
        --line: rgba(28, 29, 26, .12);
        --line-strong: rgba(28, 29, 26, .22);
        --accent: #4f5f44;
        --danger: #a04432;
        --shadow: 0 18px 50px rgba(39, 42, 33, .07);
      }
      @media (prefers-color-scheme: dark) {
        :root {
          color-scheme: dark;
          --bg: #191a18;
          --surface: rgba(34, 36, 32, .82);
          --surface-strong: #252722;
          --text: #f0f0e9;
          --muted: #a7a99f;
          --faint: #74776d;
          --line: rgba(240, 240, 233, .12);
          --line-strong: rgba(240, 240, 233, .25);
          --accent: #b6c99e;
          --danger: #e0826d;
          --shadow: 0 18px 50px rgba(0, 0, 0, .2);
        }
      }
      * { box-sizing: border-box; }
      html { background: var(--bg); scroll-behavior: smooth; }
      body {
        min-width: 320px;
        margin: 0;
        color: var(--text);
        background: var(--bg);
        font: 16px/1.55 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      body::before {
        position: fixed;
        z-index: -1;
        inset: 0;
        pointer-events: none;
        content: "";
        opacity: .5;
        background: radial-gradient(circle at 8% 0%, rgba(126, 143, 104, .14), transparent 28rem);
      }
      a { color: inherit; }
      button, input, select { font: inherit; }
      button, a, select, input { -webkit-tap-highlight-color: transparent; }
      [hidden] { display: none !important; }
      .shell { width: min(100% - 40px, 1180px); margin: 0 auto; }
      .topbar { display: flex; align-items: center; justify-content: space-between; padding: 26px 0; color: var(--muted); font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; }
      .brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text); }
      .brand-mark { width: 15px; height: 15px; display: inline-block; border: 1px solid currentColor; border-radius: 50%; box-shadow: inset 0 0 0 3px var(--bg), inset 0 0 0 4px currentColor; }
      .topbar time { letter-spacing: .04em; text-transform: none; }
      .hero { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 48px; align-items: end; padding: 76px 0 64px; border-bottom: 1px solid var(--line); }
      .eyebrow, .section-index { margin: 0 0 18px; color: var(--accent); font-size: .72rem; font-weight: 750; letter-spacing: .16em; text-transform: uppercase; }
      h1, h2, p { margin-top: 0; }
      h1 { max-width: 760px; margin-bottom: 20px; font-size: clamp(2.8rem, 7vw, 6.4rem); font-weight: 560; letter-spacing: -.075em; line-height: .94; }
      .lede { max-width: 560px; margin: 0; color: var(--muted); font-size: clamp(1rem, 1.7vw, 1.18rem); }
      .hero-stats { display: grid; grid-template-columns: repeat(2, minmax(100px, 1fr)); gap: 1px; min-width: 250px; border: 1px solid var(--line); background: var(--line); box-shadow: var(--shadow); }
      .stat { display: grid; gap: 4px; padding: 18px 20px; background: var(--surface); }
      .stat strong { font-size: 1.65rem; font-weight: 550; letter-spacing: -.05em; }
      .stat span { color: var(--muted); font-size: .74rem; letter-spacing: .08em; text-transform: uppercase; }
      .toolbar { position: sticky; z-index: 5; top: 12px; display: grid; gap: 12px; margin: 28px 0 72px; padding: 12px; border: 1px solid var(--line); background: color-mix(in srgb, var(--bg) 84%, transparent); box-shadow: var(--shadow); backdrop-filter: blur(18px); }
      .filter-form { display: grid; grid-template-columns: minmax(220px, 1fr) minmax(190px, auto) auto; gap: 8px; }
      .field { display: flex; align-items: center; min-height: 48px; border: 1px solid var(--line); background: var(--surface); }
      .field:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent); }
      .search-field { gap: 10px; padding: 0 14px; }
      .search-icon { flex: none; width: 17px; height: 17px; color: var(--muted); }
      .field input, .field select { width: 100%; min-width: 0; border: 0; outline: 0; color: var(--text); background: transparent; }
      .field input::placeholder { color: var(--faint); }
      .select-field { padding: 0 12px; }
      .select-field select { cursor: pointer; }
      .clear-button { min-height: 48px; padding: 0 16px; border: 1px solid var(--line-strong); color: var(--text); background: transparent; cursor: pointer; }
      .clear-button:hover { border-color: var(--accent); color: var(--accent); }
      .results-status { margin: 0 2px; color: var(--muted); font-size: .82rem; }
      .task-section { margin-bottom: 82px; }
      .section-heading { display: flex; align-items: end; justify-content: space-between; gap: 20px; padding-bottom: 18px; border-bottom: 1px solid var(--line-strong); }
      .section-index { margin-bottom: 10px; color: var(--faint); font-size: .68rem; }
      h2 { margin-bottom: 5px; font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 530; letter-spacing: -.055em; line-height: 1; }
      .section-slug { margin: 0; color: var(--muted); font-size: .76rem; }
      code { font: .9em ui-monospace, SFMono-Regular, Consolas, monospace; }
      .section-count { display: grid; gap: 0; margin: 0; color: var(--muted); text-align: right; }
      .section-count strong { color: var(--text); font-size: 2.2rem; font-weight: 500; letter-spacing: -.08em; line-height: 1; }
      .section-count span { font-size: .74rem; }
      .work-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 255px), 1fr)); gap: 12px; margin: 18px 0 0; padding: 0; list-style: none; }
      .work-card { min-width: 0; border: 1px solid var(--line); background: var(--surface); box-shadow: 0 4px 16px rgba(39, 42, 33, .025); transition: border-color .25s ease, box-shadow .25s ease, transform .25s ease; }
      .work-card:hover { border-color: var(--line-strong); box-shadow: var(--shadow); transform: translateY(-3px); }
      .work-link { display: grid; grid-template-columns: 54px minmax(0, 1fr) 20px; align-items: center; gap: 15px; min-height: 164px; padding: 19px; text-decoration: none; }
      .work-link:focus-visible, .clear-button:focus-visible, .field:focus-within { outline: 3px solid color-mix(in srgb, var(--accent) 55%, transparent); outline-offset: 3px; }
      .card-mark { position: relative; display: grid; place-items: center; width: 54px; height: 54px; overflow: hidden; border-radius: 50%; color: #273126; background: #c9d5bd; font: .72rem ui-monospace, SFMono-Regular, Consolas, monospace; }
      .card-mark i { position: absolute; width: 70px; height: 18px; border: 1px solid currentColor; border-radius: 50%; transform: rotate(-35deg); opacity: .55; }
      .accent-1 .card-mark { color: #403e2d; background: #d8cda9; }
      .accent-2 .card-mark { color: #343f48; background: #b9ccd2; }
      .accent-3 .card-mark { color: #46313a; background: #d6bfc7; }
      .card-copy { display: grid; min-width: 0; gap: 5px; }
      .card-kicker { overflow: hidden; color: var(--muted); font-size: .7rem; text-overflow: ellipsis; white-space: nowrap; }
      .model { overflow-wrap: anywhere; font-size: 1.05rem; font-weight: 600; letter-spacing: -.025em; line-height: 1.2; }
      .meta { color: var(--muted); font-size: .73rem; font-variant-numeric: tabular-nums; }
      .card-arrow { align-self: start; color: var(--muted); font-size: 1.25rem; line-height: 1; transition: color .25s ease, transform .25s ease; }
      .work-card:hover .card-arrow { color: var(--accent); transform: translate(2px, -2px); }
      .empty-state { margin: 0 0 82px; padding: 64px 20px; border: 1px dashed var(--line-strong); color: var(--muted); text-align: center; }
      .empty-state strong { display: block; margin-bottom: 6px; color: var(--text); font-size: 1.15rem; font-weight: 550; }
      .diagnostics { margin: 0 0 48px; border-top: 1px solid var(--line); color: var(--muted); }
      .diagnostics summary { display: flex; justify-content: space-between; gap: 16px; padding: 17px 0; cursor: pointer; list-style: none; }
      .diagnostics summary::-webkit-details-marker { display: none; }
      .diagnostics summary::before { content: "+"; width: 1.2em; color: var(--danger); }
      .diagnostics[open] summary::before { content: "−"; }
      .diagnostic-count { color: var(--faint); font-size: .8rem; }
      .diagnostics ul { display: grid; gap: 8px; margin: 0 0 20px; padding: 0; list-style: none; }
      .diagnostics li { display: flex; flex-wrap: wrap; gap: 10px; padding: 10px 12px; border-left: 2px solid var(--danger); background: var(--surface); font-size: .82rem; }
      .diagnostics li code { color: var(--text); overflow-wrap: anywhere; }
      .footer { display: flex; justify-content: space-between; gap: 20px; padding: 22px 0 40px; border-top: 1px solid var(--line); color: var(--faint); font-size: .75rem; }
      .footer p { margin: 0; }
      .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
      @media (max-width: 720px) {
        .shell { width: min(100% - 28px, 560px); }
        .topbar { padding: 19px 0; }
        .topbar time { display: none; }
        .hero { grid-template-columns: 1fr; gap: 28px; padding: 54px 0 42px; }
        h1 { font-size: clamp(2.8rem, 16vw, 4.7rem); }
        .hero-stats { width: 100%; min-width: 0; }
        .toolbar { top: 8px; margin: 18px 0 54px; }
        .filter-form { grid-template-columns: 1fr; }
        .task-section { margin-bottom: 58px; }
        .section-heading { align-items: start; }
        .work-grid { grid-template-columns: 1fr; }
        .footer { display: grid; gap: 6px; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
      }
    </style>
  </head>
  <body>
    <div class="shell">
      <header class="topbar">
        <span class="brand"><i class="brand-mark" aria-hidden="true"></i>LLM Evals</span>
        <time datetime="${escapeHtml(generatedAt)}">更新于 ${escapeHtml(displayDate)}</time>
      </header>
      <main data-gallery>
        <section class="hero" aria-labelledby="page-title">
          <div>
            <p class="eyebrow">A living index of experiments</p>
            <h1 id="page-title">候选作品<br />画廊</h1>
            <p class="lede">同一组创作命题，由不同模型各自完成。按任务浏览，或搜索一个你想先打开的名字。</p>
          </div>
          <div class="hero-stats" aria-label="画廊统计">
            <div class="stat"><strong>${total}</strong><span>作品</span></div>
            <div class="stat"><strong>${taskCount}</strong><span>任务</span></div>
          </div>
        </section>
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
          <p class="results-status" id="gallery-status" aria-live="polite">显示 ${total} 个作品</p>
        </section>
        <div id="gallery-results">
          ${sections}
        </div>
        <div class="empty-state" id="gallery-empty" hidden>
          <strong>没有找到匹配的作品</strong>
          换一个关键词，或清除当前筛选条件。
        </div>
        ${diagnostics}
      </main>
      <footer class="footer">
        <p>静态构建 · 不预加载作品页面</p>
        <p><code>/${escapeHtml("<task-id>")}/${escapeHtml("<model-id>")}/</code></p>
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
