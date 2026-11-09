#!/usr/bin/env node
// 把 origin 上每个 llm/<task-id> 分支的 solutions/<candidate-id>/ 构建两份：deploy/public/ 给 Cloudflare Worker（根路径），
// deploy/pages/ 给 GitHub Pages（/llm-evals/ 子路径）。用法：
//   node deploy/build.mjs                 # 构建全部
//   node deploy/build.mjs ui-ux-design/kimi-k3 [其他 task/model ...]   # 只构建指定候选
//   BUILD_CONCURRENCY=2 node deploy/build.mjs

import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEPLOY_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(DEPLOY_DIR, "..");
const PUBLIC_DIR = join(DEPLOY_DIR, "public");
// 每个站点一份产物：作品的 Vite base 带上站点前缀，画廊页只用相对链接，两边内容相同。
const SITES = [
  { dir: PUBLIC_DIR, base: "/" },
  { dir: join(DEPLOY_DIR, "pages"), base: "/llm-evals/" },
];
const TMP_ROOT = join(REPO_ROOT, ".worktrees", ".deploy-tmp");
const CONCURRENCY = Math.max(1, Number(process.env.BUILD_CONCURRENCY ?? 4));
// 画廊自身的静态资源；任务 id 以字母或数字开头，不会与它重名。
const ASSET_DIR = "_gallery";
const TIME_ZONE = "Asia/Shanghai";

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

// 一次 git cat-file --batch 读完所有报告，避免逐个启动 git。
function readBlobs(specs) {
  if (!specs.length) return [];
  const res = spawnSync("git", ["cat-file", "--batch"], { cwd: REPO_ROOT, input: `${specs.join("\n")}\n`, maxBuffer: 1 << 28 });
  if (res.status !== 0) throw new Error(`git cat-file 失败：${res.stderr}`);
  const out = res.stdout;
  let pos = 0;
  return specs.map((spec) => {
    const end = out.indexOf(10, pos);
    const [, type, size] = out.toString("utf8", pos, end).split(" ");
    if (type !== "blob") throw new Error(`读不到 ${spec}`);
    pos = end + 1 + Number(size) + 1;
    return out.toString("utf8", end + 1, end + 1 + Number(size));
  });
}

// RESULTS.md 没有统一格式：只在“实现/概念/概述”类小节里找第一段像样的正文或列表项，
// 跳过“Model: …”这类标签行、路径开头的行、“From …:”这类引导句和带查询串的测试记录；找不到就不放摘要。
const META_SECTION = /模型|候选|身份|基线|输入|验证|环境|命令|局限|限制|测试|检查|截图|证据|复现|安装|构建|浏览器|预览|观察|人工|介入|备注|使用|model|candidate|identification|baseline|input|verification|environment|command|limitation|test|check|screenshot|evidence|reproduc|install|build|browser|preview|observ|review|status|intervention|note|usage|how to/i;
const SUMMARY_SECTION = /实现|概念|概述|简介|作品|设计|场景|核心|交付|内容|what was built|deliverable|summary|overview|concept|approach|implementation|design|scene|idea|about/i;
const META_LINE = /^[^:：。.]{0,24}(candidate|prompt|task|model|identifier|viewport|build tool|command|baseline|main|commit|branch|path|produced|inspect|verif|check|模型|标识|候选|题面|基线|命令|视口|分支|路径|起始)[^:：。.]{0,40}[:：]/i;
// “Stack: …”“Human intervention: none”这类短字段也算元数据。
const SHORT_FIELD = /^[^:：。.]{1,24}[:：].{0,60}$/;
const CJK_END = /[\u3000-\u9fff\uff00-\uffef]$/;

function excerpt(markdown) {
  const sections = [{ level: 0, heading: "", blocks: [] }];
  let block = null;
  let fence = false;
  const flush = () => {
    if (block) sections.at(-1).blocks.push(block.reduce((joined, part) => joined + (CJK_END.test(joined) ? "" : " ") + part));
    block = null;
  };
  for (const line of markdown.split(/\r?\n/)) {
    const text = line.trim();
    if (text.startsWith("```")) {
      fence = !fence;
      flush();
      continue;
    }
    if (fence) continue;
    const heading = text.match(/^(#{1,6})\s+(.*)/);
    const item = text.match(/^(?:[-*+]|\d+\.)\s+(.*)/);
    if (heading) {
      flush();
      sections.push({ level: heading[1].length, heading: heading[2], blocks: [] });
    } else if (!text || /^[|><!]/.test(text)) flush();
    else if (item) {
      flush();
      block = [item[1]];
    } else (block ??= []).push(text);
  }
  flush();

  const clean = (text) =>
    text
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/`([^`]*)`/g, "$1")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  const usable = (text) =>
    text.length >= 12 &&
    !/^[a-z]/.test(text) &&
    !/[:：]$/.test(text) &&
    !/[?&]\w+=|__\w+__/.test(text) &&
    !META_LINE.test(text) &&
    !SHORT_FIELD.test(text);
  const pick = (test) => sections.filter(test).flatMap((section) => section.blocks.map(clean)).find(usable);
  const plain = pick((s) => s.level > 1 && SUMMARY_SECTION.test(s.heading) && !META_SECTION.test(s.heading)) ?? "";
  if (plain.length <= 160) return plain;
  const cut = plain.slice(0, 160);
  const space = cut.lastIndexOf(" ");
  return `${space > 120 ? cut.slice(0, space) : cut}…`;
}

// 每个任务分支读一次：候选目录、是否可构建、是否有 RESULTS.md、imports.json 记录，
// 再从候选标签取完成时间、从 RESULTS.md 取摘要。
function loadArchive() {
  const repoUrl = run("git remote get-url origin", REPO_ROOT, true).trim().replace(/\.git$/, "");
  const tagTimes = new Map(
    spawnSync("git", ["for-each-ref", "--format=%(refname:strip=2) %(*committerdate:unix)%(committerdate:unix)", "refs/tags/candidate/"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    })
      .stdout.split("\n")
      .filter(Boolean)
      .map((line) => {
        const [tag, time] = line.split(" ");
        return [tag, Number(time)];
      }),
  );
  const reports = [];
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
    for (const [model, candidate] of candidates) {
      candidate.time = tagTimes.get(records.get(model)?.archiveTag ?? `candidate/${task}/${model}`) ?? 0;
      if (candidate.hasReport) reports.push([candidate, `${ref}:${root}${model}/RESULTS.md`]);
    }

    const readme = join(REPO_ROOT, "tasks", task, "README.md");
    const title = existsSync(readme)
      ? readFileSync(readme, "utf8").split(/\r?\n/)[0].replace(/^#\s+/, "").replace(/\s+Evaluation$/, "")
      : task;
    tasks.set(task, { ref, title, short: title.split(" — ")[0], candidates, records });
  }
  readBlobs(reports.map(([, spec]) => spec)).forEach((text, i) => (reports[i][0].excerpt = excerpt(text)));
  return { repoUrl, tasks };
}

// 运行指南的命令和提示词以 README 的 Running a Model 一节为准，画廊只负责展示。
function loadRunGuide() {
  const readme = readFileSync(join(REPO_ROOT, "README.md"), "utf8").replace(/\r\n/g, "\n");
  const section = readme.match(/<!-- run-guide -->([\s\S]*?)<!-- \/run-guide -->/)?.[1] ?? "";
  const blocks = [...section.matchAll(/```\w*\n([\s\S]*?)\n```/g)].map((match) => match[1]);
  if (blocks.length !== 4) throw new Error("README.md 的 run-guide 一节应有 4 个代码块：目录结构、开跑前命令、提示词、跑完后命令");
  return blocks;
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
  const outDirs = SITES.map((site) => join(site.dir, task, model));

  rmSync(tmp, { recursive: true, force: true });
  for (const outDir of outDirs) {
    rmSync(outDir, { recursive: true, force: true });
    mkdirSync(outDir, { recursive: true });
  }
  run(`git worktree add --detach --force ${quote(fwd(tmp))} ${ref}`);

  try {
    const solution = join(tmp, "tasks", task, "solutions", model);
    const install = existsSync(join(solution, "package-lock.json"))
      ? "npm ci --no-audit --no-fund"
      : "npm install --no-audit --no-fund";
    run(install, solution);
    SITES.forEach((site, i) => {
      run(`npm run build -- --base=${site.base}${task}/${model}/ --outDir=${quote(fwd(outDirs[i]))} --emptyOutDir`, solution);
      if (!existsSync(join(outDirs[i], "index.html"))) throw new Error("构建后没有生成 index.html");
    });
    const { bytes, files } = dirSize(outDirs[0]);
    return { ref, task, model, ok: true, bytes, files };
  } finally {
    try {
      run(`git worktree remove --force ${quote(fwd(tmp))}`);
    } catch (error) {
      console.error(`清理临时 worktree 失败：${error.message}`);
    }
  }
}

// 已从归档删除的候选不再部署。
function prunePublished(archive, siteDir) {
  for (const task of readdirSync(siteDir, { withFileTypes: true })) {
    if (!task.isDirectory() || task.name === ASSET_DIR) continue;
    const meta = archive.tasks.get(task.name);
    for (const model of readdirSync(join(siteDir, task.name))) {
      if (meta?.candidates.has(model)) continue;
      rmSync(join(siteDir, task.name, model), { recursive: true, force: true });
      console.log(`移除已不在归档中的产物 ${fwd(join(siteDir, task.name, model))}`);
    }
    if (!meta) rmSync(join(siteDir, task.name), { recursive: true, force: true });
  }
}

function collectPublished(siteDir) {
  const published = [];
  for (const task of readdirSync(siteDir, { withFileTypes: true })) {
    if (!task.isDirectory()) continue;
    for (const model of readdirSync(join(siteDir, task.name), { withFileTypes: true })) {
      if (model.isDirectory() && existsSync(join(siteDir, task.name, model.name, "index.html"))) {
        published.push({ task: task.name, model: model.name });
      }
    }
  }
  return published;
}

const EFFORTS = ["minimal", "low", "medium", "high", "xhigh", "max", "ultra"];
// 按 model id 首段识别厂商：[首段, 厂商, 品牌名, 品牌与版本号之间的连接符]。
const VENDORS = [
  ["claude", "Anthropic", "Claude"],
  ["deepseek", "DeepSeek", "DeepSeek"],
  ["gemini", "Google", "Gemini"],
  ["glm", "Z.ai", "GLM", "-"],
  ["gpt", "OpenAI", "GPT", "-"],
  ["grok", "xAI", "Grok"],
  ["hy4", "Tencent", "Hunyuan 4"],
  ["kimi", "Moonshot AI", "Kimi"],
  ["mimo", "Xiaomi", "MiMo"],
  ["minimax", "MiniMax", "MiniMax"],
  ["qoduck", "Stealth", "Qoduck"],
  ["swe", "Cognition", "SWE", "-"],
];
// 不符合 <model-id>[-<effort>] 约定的历史候选 id。
const ALIASES = {
  "opus-5.5": { model: "claude-opus-5.5" },
  "cursor-kimi-k3": { model: "kimi-k3", variant: "Cursor" },
  "hy4free-high": { model: "hy4-high", variant: "Free" },
  "cursor-c343": { vendor: "Stealth", name: "cursor-c343", variant: "Cursor" },
  "space-bunny-free": { vendor: "Stealth", name: "Space Bunny Free" },
  "zcode-harness": { vendor: "多模型组合", name: "ZCode Harness" },
  "omp-gpt-6-sol-minimax-m3": { vendor: "多模型组合", name: "OMP: GPT-6 Sol + MiniMax M3" },
};
// 候选 id 不带思考程度时按这里的档位显示，未列出的都是 max；MiMo 和 MiniMax M3 没有档位，只有思考开关。
const DEFAULT_EFFORTS = { gemini: "high", "grok-4.7": "xhigh", mimo: "思考开启", "minimax-m3": "思考开启" };
const defaultEffort = (modelId) => DEFAULT_EFFORTS[modelId] ?? DEFAULT_EFFORTS[modelId.split("-")[0]] ?? "max";
const UNCLASSIFIED = "未归类";
const TRAILING_GROUPS = ["多模型组合", "Stealth", UNCLASSIFIED];

function identify(candidate) {
  const alias = ALIASES[candidate] ?? {};
  const variant = alias.variant ?? "";
  if (alias.name) return { vendor: alias.vendor, modelId: candidate, name: alias.name, effort: defaultEffort(candidate), variant };
  const tokens = (alias.model ?? candidate).split("-");
  const suffix = tokens.length > 1 && EFFORTS.includes(tokens.at(-1)) ? tokens.pop() : "";
  const modelId = tokens.join("-");
  const effort = suffix || defaultEffort(modelId);
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
const effortRank = (effort) => EFFORTS.indexOf(effort) + 1;
// 思考程度统一写成 模型名:思考程度；candidate id 里仍用连字符，因为 Git 引用名和 Windows 路径不允许冒号。
const modelEffort = (item) => `${item.modelId}:${item.effort}`;

const DAY_FORMAT = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit" });
const CLOCK_FORMAT = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, hour: "2-digit", minute: "2-digit" });
const dayKey = (seconds) => DAY_FORMAT.format(new Date(seconds * 1000));
const dayLabel = (key) => key.slice(5).split("-").map(Number).join(" 月 ") + " 日";
const addDays = (key, days) => new Date(Date.parse(`${key}T00:00:00Z`) + days * 86400000).toISOString().slice(0, 10);
const weekdayOf = (key) => new Date(`${key}T00:00:00Z`).getUTCDay();
const weekStart = (key) => addDays(key, -((weekdayOf(key) + 6) % 7));

// 厂商与模型 logo 来自 @lobehub/icons-static-svg 1.97.0（MIT，见 deploy/assets/logos/LICENSE），商标归各自所有者。
// 模型 logo 按 model id 首段取；没有 logo 的模型用名字首字母。小米 MiMo 的 logo 是两行文字，缩小后认不出，所以不用。
const VENDOR_LOGOS = { Anthropic: "anthropic", Cognition: "devin", DeepSeek: "deepseek-color", Google: "google-color", MiniMax: "minimax-color", "Moonshot AI": "moonshot", OpenAI: "openai", xAI: "xai", "Z.ai": "zai" };
const MODEL_LOGOS = { claude: "claude-color", deepseek: "deepseek-color", gemini: "gemini-color", glm: "zai", gpt: "openai", grok: "grok", kimi: "kimi-color", minimax: "minimax-color", swe: "devin-color" };
const logoSrc = (name) => `${ASSET_DIR}/logos/${name}.svg`;
const avatar = (item, size) => {
  const logo = MODEL_LOGOS[item.modelId.split("-")[0]];
  return `<span class="avatar ${size}" aria-hidden="true">${logo ? `<img src="${logoSrc(logo)}" alt="" decoding="async" />` : escapeHtml(item.name[0])}</span>`;
};
const vendorLogo = (vendor) =>
  VENDOR_LOGOS[vendor] ? `<img class="vendor-logo" src="${logoSrc(VENDOR_LOGOS[vendor])}" alt="" width="18" height="18" decoding="async" />` : "";

const ICONS = {
  feed: '<path d="M4 5h16M4 12h16M4 19h10"/>',
  grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
  models: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c2 .8 3.2 2.5 3.5 5.2"/>',
  github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
  book: '<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5zM4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 5 5"/>',
  play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor" stroke="none"/>',
};
const icon = (name) => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

function groupRows(entries) {
  const rows = new Map();
  for (const entry of entries) {
    const key = `${entry.vendor}\n${entry.modelId}`;
    if (!rows.has(key)) rows.set(key, { key, vendor: entry.vendor, modelId: entry.modelId, name: entry.name, efforts: new Map() });
    const row = rows.get(key);
    if (!row.efforts.has(entry.effort)) row.efforts.set(entry.effort, []);
    row.efforts.get(entry.effort).push(entry);
  }
  for (const row of rows.values()) row.effortList = [...row.efforts.keys()].sort((a, b) => effortRank(a) - effortRank(b));
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

// 多个思考程度时，分段按钮切换同一作用域里的 data-effort 层。
function effortSwitch(row) {
  if (row.effortList.length < 2) return "";
  const buttons = row.effortList
    .map((effort, i) => `<button type="button" data-effort-choice="${escapeHtml(effort)}" aria-pressed="${i === 0}">${escapeHtml(effort)}</button>`)
    .join("");
  return `<span class="seg" role="group" aria-label="思考程度">${buttons}</span>`;
}
const effortLayer = (row, effort) => `data-effort="${escapeHtml(effort)}"${effort === row.effortList[0] ? "" : " hidden"}`;

// 字体自托管在 assets/fonts/（OFL）。
// shortcut: Noto Sans SC 只截取了本文件里出现的汉字（目前 358 个），标题出现新汉字时会回退到系统字体，届时按新字表重新下载子集。
const STYLE = `
      @font-face { font-family: Figtree; src: url("${ASSET_DIR}/fonts/figtree-latin.woff2") format("woff2"); font-weight: 400 800; font-display: swap; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
      @font-face { font-family: "JetBrains Mono"; src: url("${ASSET_DIR}/fonts/jetbrains-mono-latin.woff2") format("woff2"); font-weight: 400 500; font-display: swap; unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
      @font-face { font-family: "Noto Sans SC Heading"; src: url("${ASSET_DIR}/fonts/noto-sans-sc-heading.woff2") format("woff2"); font-weight: 700 800; font-display: swap; }
      :root { color-scheme: light; --ink: #16161a; --ink-2: #2b2b31; --ink-3: #3f3f46; --muted: #6b6b74; --line: #ececef; --line-2: #dcdce2; --soft: #f4f4f6; --soft-2: #fafafb; --tile: #f7f7f9; --blue: #2a5ff0; --blue-ink: #1d4ed8; --blue-soft: #eaf0ff; --red: #dc2f24; --green: #157a41; --green-soft: #e7f6ed; --navy: #121527; --navy-ink: #8c93b3; --bar: #d9d9e0; --shadow: 0 1px 2px rgb(22 22 26 / 0.04), 0 10px 28px rgb(22 22 26 / 0.06); --lift: 0 1px 2px rgb(22 22 26 / 0.06), 0 6px 16px rgb(22 22 26 / 0.08); --ease: cubic-bezier(0.22, 1, 0.36, 1); --mono: "JetBrains Mono", ui-monospace, "Cascadia Mono", monospace; --sans: Figtree, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; --display: Figtree, "Noto Sans SC Heading", "PingFang SC", "Microsoft YaHei", sans-serif; }
      * { box-sizing: border-box; }
      html { scrollbar-color: #cfcfd6 transparent; scrollbar-width: thin; }
      body { margin: 0; color: var(--ink); background: #fff; font: 15px/1.6 var(--sans); -webkit-font-smoothing: antialiased; caret-color: var(--blue); }
      ::selection { background: #dbe5ff; color: var(--ink); }
      h1, h2, h3, p, ul, blockquote { margin: 0; }
      ul { padding: 0; list-style: none; }
      a { color: inherit; text-decoration: none; }
      button, input { font: inherit; color: inherit; }
      button { cursor: pointer; }
      img { display: block; }
      [hidden] { display: none !important; }
      :focus-visible { outline: 2px solid var(--blue); outline-offset: 2px; border-radius: 10px; }
      h1:focus { outline: none; }
      h1, .post-title, .rail-head, .group-head, .ch-head h2, .model-head h3, .tiles b, .vendor th { font-family: var(--display); }
      .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
      .icon { width: 20px; height: 20px; flex: none; fill: none; stroke: currentColor; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
      .pill, .tag, .lcard, .task, .nav a, .play, .stop, .seg button, .sub-link, .mark, .least a, .work-name, .wk i { transition: background-color 0.2s var(--ease), border-color 0.2s var(--ease), box-shadow 0.2s var(--ease), color 0.2s var(--ease), transform 0.2s var(--ease); }

      .app { display: grid; grid-template-columns: clamp(248px, 21vw, 300px) minmax(0, 1fr) clamp(320px, 26.4vw, 380px); min-height: 100vh; }
      .side { position: sticky; top: 0; height: 100vh; overflow-y: auto; display: flex; flex-direction: column; padding: 26px 18px; border-right: 1px solid var(--line); }
      .me { padding: 0 12px 22px; }
      .me b { display: block; font-size: 22px; font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; }
      .nav { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2px; }
      .nav a { display: flex; align-items: center; gap: 12px; height: 44px; padding: 0 12px; border-radius: 14px; font-weight: 500; }
      .nav a:hover { background: var(--tile); }
      .nav a[aria-current] { background: var(--soft); }
      .nav a[aria-current] { font-weight: 700; }
      .label { margin: 12px 12px 10px; padding-top: 14px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; font-weight: 500; }
      .tasks { display: flex; flex-wrap: wrap; gap: 6px; padding: 0 6px; }
      .task { position: relative; display: inline-flex; align-items: center; gap: 7px; height: 36px; padding: 0 15px; border: 1px solid var(--line); border-radius: 999px; background: #fff; font-size: 14px; font-weight: 600; white-space: nowrap; }
      .task:hover { border-color: var(--line-2); background: var(--soft-2); box-shadow: 0 1px 2px rgb(22 22 26 / 0.06); }
      .task[aria-current] { border-color: transparent; background: var(--soft); box-shadow: none; }
      .task .n { color: var(--muted); font-weight: 500; font-variant-numeric: tabular-nums; }
      .new { position: absolute; top: -2px; right: -2px; width: 10px; height: 10px; border: 2px solid #fff; border-radius: 50%; background: var(--red); }
      .bottom { margin-top: auto; padding-top: 16px; }

      .main { min-width: 0; padding: 28px clamp(24px, 3.9vw, 56px) 64px; border-right: 1px solid var(--line); }
      .column { max-width: 640px; container-type: inline-size; }
      .topbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; }
      .updated { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }
      .search { display: flex; align-items: center; gap: 8px; width: min(100%, 280px); height: 40px; padding: 0 8px 0 14px; border: 1px solid transparent; border-radius: 999px; background: var(--soft); color: var(--muted); transition: background-color 0.2s var(--ease), box-shadow 0.2s var(--ease), border-color 0.2s var(--ease); }
      .search:hover { background: #efeff2; }
      .search:focus-within { border-color: var(--line-2); background: #fff; box-shadow: 0 0 0 4px var(--blue-soft); }
      .search .icon { width: 18px; height: 18px; }
      .search input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; color: var(--ink); font-weight: 500; }
      .search input::placeholder { color: var(--muted); }
      .search kbd { display: grid; place-items: center; min-width: 24px; height: 24px; border: 1px solid var(--line-2); border-radius: 8px; background: #fff; color: var(--muted); font: 500 12px var(--mono); }
      .search:focus-within kbd { visibility: hidden; }

      .view { animation: view-in 0.4s var(--ease); }
      @keyframes view-in { from { opacity: 0; transform: translateY(6px); } }
      .view-head { margin: 24px 0 4px; }
      h1 { font-size: 44px; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; }
      .meta { margin-top: 4px; color: var(--muted); font-size: 14px; font-variant-numeric: tabular-nums; }
      .view-head .pill { margin-top: 14px; }
      .pill { display: inline-flex; align-items: center; gap: 6px; height: 36px; padding: 0 16px; border: 1px solid transparent; border-radius: 999px; background: var(--soft); font-size: 14px; font-weight: 600; white-space: nowrap; }
      .pill:hover { background: #ebebef; }
      .pill .icon { width: 16px; height: 16px; }
      .pill.sm { height: 32px; padding: 0 14px; border-color: var(--line); background: #fff; font-size: 13px; }
      .pill.sm:hover { border-color: var(--line-2); background: var(--soft-2); box-shadow: 0 1px 2px rgb(22 22 26 / 0.06); }
      .empty { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 32px; padding: 18px 20px; border: 1px dashed var(--line-2); border-radius: 18px; color: var(--muted); }

      .day { margin-top: 36px; }
      .day-head { display: flex; align-items: center; gap: 10px; color: var(--muted); font-size: 13px; font-weight: 600; }
      .day-head span { font-weight: 500; font-variant-numeric: tabular-nums; }
      .day-head::after { content: ""; flex: 1; height: 1px; background: var(--line); }
      .post { display: grid; grid-template-columns: 52px minmax(0, 1fr); gap: 16px; margin-top: 24px; }
      .avatar { display: grid; place-items: center; flex: none; border: 1px solid var(--line); border-radius: 30%; background: #fff; color: var(--ink-3); font-weight: 800; }
      .avatar img { width: 58%; height: 58%; }
      .avatar.lg { width: 44px; height: 44px; font-size: 18px; }
      .avatar.md { width: 36px; height: 36px; font-size: 15px; }
      .avatar.sm { width: 28px; height: 28px; font-size: 13px; }
      .vendor-logo { display: inline-block; width: 18px; height: 18px; margin-right: 8px; vertical-align: -3px; }
      .who { display: flex; align-items: center; gap: 12px; min-width: 0; }
      .post-body { min-width: 0; container-type: inline-size; }
      .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
      .tag { display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 10px; border-radius: 999px; background: var(--soft); color: var(--ink-3); font-size: 12.5px; font-weight: 600; }
      a.tag:hover { background: #e8e8ed; }
      .tag.id { font: 500 12px var(--mono); }
      .tag.ok { background: var(--green-soft); color: var(--green); }
      .tag.ok::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
      .post-title { font-size: 22px; font-weight: 700; line-height: 1.35; text-wrap: balance; word-break: keep-all; }
      .excerpt p { margin-top: 6px; color: var(--ink-2); font-size: 16px; line-height: 1.75; }

      .stage { position: relative; height: 220px; margin-top: 16px; overflow: hidden; border-radius: 20px; background: var(--navy); transition: height 0.5s var(--ease); }
      .stage.wide { height: 280px; margin-top: 22px; }
      .stage.running { display: flex; flex-direction: column; height: calc(62.5cqw + 48px); }
      .stage.wide.running { height: min(calc(62.5cqw + 48px), 78vh); }
      .stage-idle { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; height: 100%; padding: 24px; text-align: center; }
      .play { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 18px; border: 0; border-radius: 999px; background: #fff; color: var(--ink); font-weight: 700; }
      .play .icon, .run .icon { width: 14px; height: 14px; }
      .play:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgb(0 0 0 / 0.35); }
      .path { color: var(--navy-ink); font: 12px var(--mono); overflow-wrap: anywhere; }
      .hint { color: var(--navy-ink); font-size: 14px; }
      .stage-frame { position: relative; flex: 1; }
      .stage-frame::before { content: "正在载入…"; position: absolute; inset: 0; display: grid; place-items: center; color: var(--navy-ink); font-size: 14px; }
      .stage-frame iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; opacity: 0; transition: opacity 0.4s var(--ease); }
      .stage-frame iframe.ready { opacity: 1; }
      .stage-bar { display: flex; align-items: center; gap: 14px; height: 48px; padding: 0 10px 0 16px; color: var(--navy-ink); font-size: 13px; }
      .now { flex: 1; min-width: 0; overflow: hidden; color: #d5d8e6; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
      .stage-bar a { color: var(--navy-ink); font-weight: 600; }
      .stage-bar a:hover { color: #fff; }
      .stop { height: 30px; padding: 0 14px; border: 0; border-radius: 999px; background: #fff; color: var(--ink); font-size: 13px; font-weight: 700; }
      .stop:hover { background: #e9ecf8; }

      .facts { margin-top: 22px; padding-top: 14px; border-top: 1px solid var(--line); }
      .field { margin-bottom: 10px; color: var(--muted); font-weight: 700; }
      .quote { padding: 14px 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--soft-2); color: var(--ink-3); font: 13px/1.6 var(--mono); overflow-wrap: anywhere; }
      .links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; }
      .lcard { flex: 0 1 240px; padding: 12px 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--soft-2); }
      .lcard:hover { border-color: var(--line-2); background: #fff; box-shadow: var(--lift); }
      .lcard span { display: block; color: var(--muted); font: 12px/1.6 var(--mono); }
      .lcard b { display: block; font-size: 15px; font-weight: 600; }
      .foot { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 16px; }
      .status { display: inline-flex; align-items: center; gap: 8px; margin-right: auto; color: var(--muted); font-size: 14px; }
      .status::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--green); }

      .seg { display: inline-flex; padding: 3px; border-radius: 999px; background: var(--soft); vertical-align: middle; }
      .seg button { padding: 0 10px; border: 0; border-radius: 999px; background: none; color: var(--muted); font-size: 12px; font-weight: 600; line-height: 22px; }
      .seg button:hover { color: var(--ink); }
      .seg button[aria-pressed="true"] { background: #fff; color: var(--ink); box-shadow: 0 1px 3px rgb(22 22 26 / 0.12); }
      .variant { color: var(--muted); font-size: 11px; font-weight: 600; }

      .matrix-wrap { margin-top: 24px; padding: 6px; overflow-x: auto; border: 1px solid var(--line); border-radius: 20px; }
      .matrix { width: 100%; min-width: 560px; table-layout: fixed; border-collapse: collapse; }
      .matrix thead th { padding: 12px 2px 10px; border-bottom: 1px solid var(--line); vertical-align: bottom; }
      .matrix thead th:first-child { width: 36%; }
      .matrix thead a { display: inline-block; max-inline-size: 118px; padding: 8px 6px; border-radius: 10px; color: var(--ink-3); font-size: 12.5px; font-weight: 600; line-height: 1.25; text-align: left; writing-mode: vertical-rl; transform: rotate(180deg); }
      .matrix thead a:hover { background: var(--tile); color: var(--ink); }
      .vendor th { padding: 16px 16px 6px; font-size: 13px; font-weight: 700; text-align: left; }
      .vendor span, .group-head span { margin-left: 8px; color: var(--muted); font-size: 13px; font-weight: 500; }
      tbody + tbody .vendor th { border-top: 1px solid var(--line); }
      .model-row th { padding: 6px 8px 6px 16px; font-size: 14px; font-weight: 500; text-align: left; }
      .model-row td { padding: 6px 2px; text-align: center; }
      .model-row:hover { background: var(--soft-2); }
      .model-name { display: block; }
      .model-row th .seg { display: flex; width: max-content; margin-top: 4px; }
      .layer { display: flex; justify-content: center; align-items: center; gap: 4px; min-height: 22px; }
      .layer:empty::before { content: ""; width: 5px; height: 5px; border-radius: 50%; background: #d4d4da; }
      .mark { flex: none; width: 22px; height: 22px; border-radius: 7px; background: var(--blue); }
      .mark:hover { background: var(--blue-ink); transform: scale(1.1); }

      .group { margin-top: 32px; }
      .group-head { margin-bottom: 10px; font-size: 18px; font-weight: 800; }
      .model-card { margin-top: 10px; padding: 14px 16px 6px; border: 1px solid var(--line); border-radius: 18px; }
      .model-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 8px 16px; margin-bottom: 4px; }
      .model-head h3 { font-size: 16px; font-weight: 700; }
      .model-head code { color: var(--muted); font: 12px var(--mono); }
      .work { display: grid; grid-template-columns: minmax(0, 1fr) auto auto auto; align-items: center; gap: 12px; padding: 8px 0; border-top: 1px solid var(--line); }
      .work:first-child { border-top: 0; }
      .work-name { font-size: 14.5px; font-weight: 600; }
      .work-name .variant { margin-left: 6px; }
      .work-name:hover { color: var(--blue-ink); }
      .date { color: var(--muted); font: 12px var(--mono); }
      .sub-link { color: var(--ink-3); font-size: 13px; font-weight: 600; }
      a.sub-link:hover { color: var(--blue-ink); }
      .sub-link.off { color: var(--muted); font-weight: 500; }
      .entries { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; }
      .entry { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px; padding: 10px 12px 10px 16px; border-top: 1px solid var(--line); transition: background-color 0.2s var(--ease); }
      .entry:first-child { border-top: 0; }
      .entry:has(.run[aria-pressed="true"]) { background: var(--blue-soft); }
      .entry-main { flex: 1; min-width: 180px; }
      .entry-main b { display: block; font-size: 14.5px; font-weight: 600; }
      .entry-main span { color: var(--muted); font-size: 12.5px; }
      .run[aria-pressed="true"] { border-color: var(--blue); background: var(--blue); color: #fff; }

      .rail { position: sticky; top: 0; align-self: start; max-height: 100vh; overflow-y: auto; padding: 28px 32px 28px 28px; }
      .card { padding: 18px 20px 14px; border: 1px solid var(--line); border-radius: 22px; box-shadow: var(--shadow); }
      .ch-head { margin-bottom: 10px; line-height: 1.45; }
      .ch-head h2 { font-size: 16px; font-weight: 700; white-space: nowrap; }
      .ch-head h2 span, .ch-head p { color: var(--muted); font-size: 13px; font-weight: 500; }
      .note { display: flex; justify-content: flex-end; margin-bottom: 10px; }
      .note.left { justify-content: flex-start; }
      .note span { display: inline-flex; align-items: center; height: 24px; padding: 0 10px; border-radius: 999px; background: var(--blue); color: #fff; font-size: 12px; font-weight: 700; transition: opacity 0.15s; }
      .card:has(.wk:is(:hover, :focus-visible)) .note span { opacity: 0; }
      .bars { display: grid; grid-template-columns: repeat(10, 1fr); gap: 8px; height: 104px; }
      .wk { position: relative; display: flex; align-items: flex-end; border-radius: 6px; }
      .wk i { width: 100%; height: max(var(--h), 3px); border-radius: 5px 5px 2px 2px; background: var(--bar); }
      .wk:hover i, .wk:focus-visible i { background: #b9b9c4; }
      .wk.hot i { background: var(--blue); }
      .wk.hot::before { content: ""; position: absolute; top: -10px; bottom: calc(var(--h) + 4px); left: 50%; border-left: 1.5px dashed var(--blue); }
      .wk::after { content: attr(data-tip); position: absolute; bottom: calc(100% + 8px); left: 50%; z-index: 2; padding: 4px 8px; border-radius: 8px; background: var(--ink); color: #fff; font-size: 12px; font-weight: 600; white-space: nowrap; opacity: 0; pointer-events: none; transform: translate(var(--tx, -50%), 4px); transition: opacity 0.15s, transform 0.15s; }
      .wk:nth-child(-n + 2)::after { left: 0; --tx: 0; }
      .wk:nth-last-child(-n + 2)::after { left: auto; right: 0; --tx: 0; }
      .wk:hover::after, .wk:focus-visible::after { opacity: 1; transform: translate(var(--tx, -50%), 0); }
      .axis { display: grid; grid-template-columns: repeat(10, 1fr); gap: 8px; margin-top: 6px; color: var(--muted); font: 11.5px var(--mono); }
      .axis span { display: flex; justify-content: center; white-space: nowrap; }
      .axis span:first-child { justify-content: flex-start; }
      .axis span:last-child { justify-content: flex-end; }
      .rail-head { margin: 28px 0 12px; font-size: 22px; font-weight: 800; }
      .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .tiles p { padding: 14px 18px; border: 1px solid var(--line); border-radius: 18px; background: var(--tile); color: var(--muted); font-size: 13px; }
      .tiles b { display: block; color: var(--ink); font-size: 30px; font-weight: 800; line-height: 1.2; font-variant-numeric: tabular-nums; }
      .least li { border-bottom: 1px solid var(--line); }
      .least a { display: flex; align-items: center; gap: 14px; margin: 4px -8px; padding: 10px 8px; border-radius: 14px; }
      .least a:hover { background: var(--tile); }
      .least small { display: block; color: var(--muted); font-size: 12.5px; }
      .least b { display: block; font-size: 15px; }
      .page-foot { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; }
      .diagnostics summary { cursor: pointer; }
      .diagnostics ul { display: grid; gap: 6px; margin-top: 10px; }
      .diagnostics code { margin-right: 10px; color: var(--ink); font: 12px var(--mono); }

      .step { margin-top: 32px; }
      .step > p { max-width: 62ch; color: var(--ink-2); }
      .step code { padding: 1px 6px; border-radius: 6px; background: var(--soft); font: 13px var(--mono); }
      .code { position: relative; margin-top: 12px; border: 1px solid var(--line); border-radius: 16px; background: var(--soft-2); }
      .code pre { margin: 0; padding: 16px 92px 16px 18px; overflow-x: auto; color: var(--ink-2); font: 13px/1.7 var(--mono); white-space: pre-wrap; overflow-wrap: anywhere; }
      .code pre code { padding: 0; background: none; font: inherit; }
      .code.prose pre { font: 14.5px/1.8 var(--sans); }
      .code.tree pre { padding-right: 18px; white-space: pre; }
      .copy { position: absolute; top: 10px; right: 10px; }
      .guide-source { margin-top: 28px; color: var(--muted); font-size: 13px; }
      .guide-source a { color: var(--ink-3); text-decoration: underline; text-underline-offset: 3px; }

      @media (max-width: 1199px) {
        .app { grid-template-columns: clamp(232px, 24vw, 280px) minmax(0, 1fr); }
        .side { grid-row: 1 / span 2; }
        .main { border-right: 0; }
        .rail { position: static; display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0 28px; max-width: calc(640px + 2 * clamp(24px, 3.9vw, 56px)); max-height: none; overflow: visible; padding: 32px clamp(24px, 3.9vw, 56px) 56px; border-top: 1px solid var(--line); }
        .rail > .card { grid-column: 1 / -1; }
      }
      @media (max-width: 820px) {
        .app { display: block; }
        .side { position: static; gap: 12px; height: auto; overflow: visible; padding: 16px 16px 14px; border-right: 0; border-bottom: 1px solid var(--line); }
        .me { padding: 0; }
        .nav, .tasks { display: flex; gap: 6px; margin: 0 -16px; padding: 0 16px; overflow-x: auto; scrollbar-width: none; }
        .nav a { flex: none; height: 38px; padding: 0 14px; border: 1px solid var(--line); border-radius: 999px; }
        .nav a[aria-current] { border-color: transparent; }
        .label { display: none; }
        .tasks { flex-wrap: nowrap; padding: 3px 16px; }
        .task { flex: none; }
        .bottom { padding-top: 0; }
        .main { padding: 16px 16px 40px; border-right: 0; }
        .topbar { flex-wrap: wrap; gap: 10px; }
        .search { order: -1; width: 100%; }
        .search kbd { display: none; }
        .view-head { margin-top: 16px; }
        h1 { font-size: 32px; }
        .post { grid-template-columns: 36px minmax(0, 1fr); gap: 12px; }
        .avatar.lg { width: 36px; height: 36px; font-size: 15px; }
        .post-title { font-size: 20px; }
        .stage { height: 180px; }
        .stage.wide { height: 220px; }
        .lcard { flex: 1 1 200px; }
        .work { gap: 10px; }
        .matrix-wrap { padding: 4px; }
        .matrix { min-width: 0; }
        .matrix thead th:first-child { width: 34%; }
        .matrix thead a { max-inline-size: none; padding: 6px 3px; font-size: 12px; white-space: nowrap; }
        .vendor th { padding: 14px 8px 4px; }
        .model-row th { padding: 6px 4px 6px 8px; font-size: 13px; }
        .mark { width: 18px; height: 18px; border-radius: 6px; }
        .rail { padding: 8px 16px 40px; border-top: 1px solid var(--line); }
        .code pre { padding-right: 18px; }
        .copy { position: static; margin: 0 0 10px 14px; }
      }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
`;

// 客户端脚本：hash 路由、搜索、思考程度切换、就地运行（同一时间只运行一份作品）。
const SCRIPT = `
      (() => {
        const search = document.querySelector("#search");
        const items = [...document.querySelectorAll("[data-item]")];
        const groups = [...document.querySelectorAll("[data-group]")];
        const views = new Map([...document.querySelectorAll("[data-view]")].map((view) => [view.dataset.view, view]));
        const routes = [...document.querySelectorAll("[data-route]")];
        const calm = matchMedia("(prefers-reduced-motion: reduce)");
        let live = null;

        const stop = () => {
          if (!live) return;
          live.stage.classList.remove("running");
          live.stage.replaceChildren(...live.idle);
          if (live.button.hasAttribute("aria-pressed")) live.button.setAttribute("aria-pressed", "false");
          live = null;
        };
        const start = (button) => {
          const stage = button.dataset.target ? document.getElementById(button.dataset.target) : button.closest("[data-stage]");
          stop();
          const idle = [...stage.childNodes];
          const frameBox = document.createElement("div");
          frameBox.className = "stage-frame";
          const frame = document.createElement("iframe");
          frame.src = button.dataset.run;
          frame.title = button.dataset.title;
          frame.allow = "fullscreen; autoplay; gamepad; xr-spatial-tracking";
          frame.addEventListener("load", () => frame.classList.add("ready"), { once: true });
          frameBox.append(frame);
          const bar = document.createElement("div");
          bar.className = "stage-bar";
          const now = document.createElement("span");
          now.className = "now";
          now.textContent = button.dataset.title;
          const open = document.createElement("a");
          open.href = button.dataset.run;
          open.target = "_blank";
          open.rel = "noopener";
          open.textContent = "新窗口打开";
          const close = document.createElement("button");
          close.type = "button";
          close.className = "stop";
          close.textContent = "停止运行";
          close.addEventListener("click", () => {
            stop();
            button.focus({ preventScroll: true });
          });
          bar.append(now, open, close);
          stage.replaceChildren(frameBox, bar);
          stage.classList.add("running");
          if (button.hasAttribute("aria-pressed")) button.setAttribute("aria-pressed", "true");
          live = { stage, idle, button };
          if (!button.isConnected) close.focus({ preventScroll: true });
          if (stage.hasAttribute("data-shared")) stage.scrollIntoView({ block: "nearest", behavior: calm.matches ? "auto" : "smooth" });
        };

        const route = () => {
          const name = decodeURIComponent(location.hash.slice(1));
          const current = views.has(name) ? name : "recent";
          stop();
          for (const [key, view] of views) view.hidden = key !== current;
          for (const link of routes) {
            if (link.dataset.route === current) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
          }
          const heading = views.get(current).querySelector("h1");
          document.title = current === "recent" ? "LLM Evals" : heading.textContent.trim() + " · LLM Evals";
          return heading;
        };

        const apply = () => {
          const query = search.value.trim().toLocaleLowerCase();
          for (const item of items) item.hidden = Boolean(query) && !item.dataset.search.includes(query);
          for (const group of groups) {
            const visible = group.querySelectorAll("[data-item]:not([hidden])").length;
            const count = group.querySelector("[data-count]");
            group.hidden = !visible;
            if (count) count.textContent = visible + " " + count.dataset.count;
          }
          for (const view of views.values()) {
            const empty = view.querySelector("[data-empty]");
            if (empty) empty.hidden = Boolean(view.querySelector("[data-item]:not([hidden])"));
          }
          if (live && live.stage.closest("[data-item][hidden]")) stop();
          const params = new URLSearchParams(location.search);
          if (query) params.set("q", search.value.trim());
          else params.delete("q");
          const next = params.toString();
          history.replaceState(null, "", location.pathname + (next ? "?" + next : "") + location.hash);
        };

        document.addEventListener("click", (event) => {
          const run = event.target.closest("[data-run]");
          if (run) {
            if (live && live.button === run) stop();
            else start(run);
            return;
          }
          const choice = event.target.closest("[data-effort-choice]");
          if (choice) {
            const scope = choice.closest("[data-effort-scope]");
            for (const other of scope.querySelectorAll("[data-effort-choice]")) other.setAttribute("aria-pressed", String(other === choice));
            for (const layer of scope.querySelectorAll("[data-effort]")) layer.hidden = layer.dataset.effort !== choice.dataset.effortChoice;
            return;
          }
          if (event.target.closest("[data-clear]")) {
            search.value = "";
            apply();
            search.focus();
          }
          const copy = event.target.closest("[data-copy]");
          if (copy) {
            navigator.clipboard
              .writeText(copy.parentElement.querySelector("pre").textContent)
              .then(
                () => (copy.textContent = "已复制"),
                () => (copy.textContent = "复制失败，请手动选择"),
              )
              .finally(() => setTimeout(() => (copy.textContent = "复制"), 1600));
          }
        });
        addEventListener("keydown", (event) => {
          const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
          if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            search.focus();
          } else if (event.key === "Escape" && document.activeElement === search && search.value) {
            search.value = "";
            apply();
          }
        });
        addEventListener("hashchange", () => {
          route().focus({ preventScroll: true });
          scrollTo(0, 0);
        });
        search.addEventListener("input", apply);
        search.value = new URLSearchParams(location.search).get("q") || "";
        route();
        apply();
      })();
`;

function renderGallery(published, archive, { generatedAt, failed, skipped, guide }) {
  const generated = Date.parse(generatedAt) / 1000;
  const today = dayKey(generated);
  const weekAgo = addDays(today, -6);
  const promptUrl = (task) => `${archive.repoUrl}/blob/main/tasks/${task}/task.md`;
  const sourceUrl = (entry) => `${archive.repoUrl}/tree/llm/${entry.task}/tasks/${entry.task}/solutions/${entry.model}`;
  const reportUrl = (entry) => `${archive.repoUrl}/blob/llm/${entry.task}/tasks/${entry.task}/solutions/${entry.model}/RESULTS.md`;
  // 相对链接：同一个画廊页既在根路径也在 /llm-evals/ 下提供。
  const workUrl = (entry) => `${encodeURIComponent(entry.task)}/${encodeURIComponent(entry.model)}/`;

  const entries = published
    .map((entry) => {
      const meta = archive.tasks.get(entry.task);
      const candidate = meta?.candidates.get(entry.model) ?? {};
      return {
        ...entry,
        ...identify(entry.model),
        record: meta?.records.get(entry.model),
        time: candidate.time ?? 0,
        day: candidate.time ? dayKey(candidate.time) : "",
        hasReport: Boolean(candidate.hasReport),
        excerpt: candidate.excerpt ?? "",
      };
    })
    .sort((a, b) => b.time - a.time || a.task.localeCompare(b.task) || a.model.localeCompare(b.model));
  const isFresh = (entry) => entry.day && entry.day >= weekAgo;

  const tasks = [...new Set(entries.map((entry) => entry.task))].sort().map((task) => {
    const meta = archive.tasks.get(task) ?? { title: task, short: task };
    const list = entries.filter((entry) => entry.task === task);
    return {
      task,
      title: meta.title,
      short: meta.short,
      subtitle: meta.title.slice(meta.short.length).replace(/^\s*—\s*/, ""),
      list,
      latest: list[0]?.day ?? "",
      fresh: list.filter(isFresh).length,
      models: new Set(list.map((entry) => `${entry.vendor}\n${entry.modelId}`)).size,
    };
  });
  const taskById = new Map(tasks.map((task) => [task.task, task]));
  const vendors = groupRows(entries);
  const rows = vendors.flatMap(([, list]) => list);
  const tasksDone = (row) => new Set([...row.efforts.values()].flat().map((entry) => entry.task)).size;
  const gaps = rows.length * tasks.length - rows.reduce((sum, row) => sum + tasksDone(row), 0);
  const latestDay = entries[0]?.day ?? "";
  const dayText = (day) => (day ? dayLabel(day) : "日期未知");

  const searchText = (...parts) => escapeHtml(parts.filter(Boolean).join(" ").toLocaleLowerCase());
  const entrySearch = (entry) => searchText(entry.name, entry.modelId, entry.model, entry.vendor, entry.variant, taskById.get(entry.task).title);
  const runLabel = (entry) =>
    `${modelEffort(entry)}${entry.variant ? `（${entry.variant}）` : ""}：${taskById.get(entry.task).title}`;
  const reportLink = (entry) =>
    entry.hasReport ? `<a class="sub-link" href="${escapeHtml(reportUrl(entry))}">报告</a>` : `<span class="sub-link off">无报告</span>`;
  const empty = `<p class="empty" data-empty hidden>没有匹配的作业。<button class="pill sm" type="button" data-clear>清除搜索</button></p>`;
  const viewHead = (title, meta, extra = "") => `<header class="view-head">
          <h1 tabindex="-1">${escapeHtml(title)}</h1>
          <p class="meta">${meta}</p>${extra}
        </header>`;

  const tags = (entry) => `<div class="tags">
              <a class="tag" href="#${escapeHtml(entry.task)}">${escapeHtml(taskById.get(entry.task).short)}</a>
              <span class="tag id">${escapeHtml(modelEffort(entry))}</span>
              ${entry.variant ? `<span class="tag">${escapeHtml(entry.variant)}</span>` : ""}
              ${entry.hasReport ? `<span class="tag ok">有报告</span>` : `<span class="tag">无报告</span>`}
            </div>`;
  const post = (entry) => `<article class="post" data-item data-search="${entrySearch(entry)}">
          ${avatar(entry, "lg")}
          <div class="post-body">
            ${tags(entry)}
            <h3 class="post-title">${escapeHtml(entry.name)} 交了 ${escapeHtml(taskById.get(entry.task).short)}</h3>
            ${entry.excerpt ? `<blockquote class="excerpt" cite="${escapeHtml(reportUrl(entry))}"><p>${escapeHtml(entry.excerpt)}</p></blockquote>` : ""}
            <div class="stage" data-stage>
              <div class="stage-idle">
                <button class="play" type="button" data-run="${escapeHtml(workUrl(entry))}" data-title="${escapeHtml(runLabel(entry))}">${icon("play")}在这里运行</button>
                <code class="path">${escapeHtml(workUrl(entry))}</code>
              </div>
            </div>
            <div class="facts">
              ${entry.record?.model ? `<p class="field">模型标识</p><p class="quote">${escapeHtml(entry.record.model)}</p>` : ""}
              <div class="links">
                <a class="lcard" href="${escapeHtml(sourceUrl(entry))}"><b>查看源码</b><span>github.com</span></a>
                ${entry.hasReport ? `<a class="lcard" href="${escapeHtml(reportUrl(entry))}"><b>结果报告</b><span>RESULTS.md</span></a>` : ""}
              </div>
            </div>
            <div class="foot">
              <span class="status">${entry.day ? `${dayLabel(entry.day)}完成` : "完成日期未知"}</span>
              <a class="pill sm" href="${escapeHtml(workUrl(entry))}" target="_blank" rel="noopener">新窗口打开</a>
              <a class="pill sm" href="#${escapeHtml(entry.task)}">同题对比</a>
            </div>
          </div>
        </article>`;

  const WEEKDAY_NAMES = "日一二三四五六";
  const days = new Map();
  for (const entry of entries) {
    if (!days.has(entry.day)) days.set(entry.day, []);
    days.get(entry.day).push(entry);
  }
  const feed = [...days]
    .map(
      ([day, list]) => `<section class="day" data-group>
        <h2 class="day-head">${day ? `${dayLabel(day)} 周${WEEKDAY_NAMES[weekdayOf(day)]}` : "日期未知"}<span data-count="份">${list.length} 份</span></h2>
        ${list.map(post).join("\n        ")}
      </section>`,
    )
    .join("\n      ");
  const recentView = `<section class="view" data-view="recent" aria-label="最近完成">
        ${viewHead("最近完成", `最近一次 ${dayText(latestDay)} · 近 7 天 ${entries.filter(isFresh).length} 份 · 共 ${entries.length} 份`)}
        ${feed}
        ${empty}
      </section>`;

  const header = tasks
    .map(
      (task) =>
        `<th scope="col"><a href="#${escapeHtml(task.task)}">${escapeHtml(task.short)}</a></th>`,
    )
    .join("");
  const coverageRow = (row) => {
    const cells = tasks
      .map((task) => {
        const layers = row.effortList
          .map((effort) => {
            const marks = row.efforts
              .get(effort)
              .filter((entry) => entry.task === task.task)
              .map(
                (entry) =>
                  `<a class="mark" href="${escapeHtml(workUrl(entry))}" aria-label="${escapeHtml(runLabel(entry))}" title="${escapeHtml(entry.model)}"></a>`,
              )
              .join("");
            return `<span class="layer" ${effortLayer(row, effort)}>${marks}</span>`;
          })
          .join("");
        return `<td>${layers}</td>`;
      })
      .join("");
    const ids = [...row.efforts.values()].flat().map((entry) => entry.model);
    return `<tr class="model-row" data-item data-effort-scope data-search="${searchText(row.name, row.modelId, row.vendor, ...ids)}"><th scope="row"><span class="model-name">${escapeHtml(row.name)}</span>${effortSwitch(row)}</th>${cells}</tr>`;
  };
  const matrix = vendors
    .map(
      ([vendor, list]) => `<tbody data-group>
            <tr class="vendor"><th scope="rowgroup" colspan="${tasks.length + 1}">${vendorLogo(vendor)}${escapeHtml(vendor)}<span data-count="个模型">${list.length} 个模型</span></th></tr>
            ${list.map(coverageRow).join("\n            ")}
          </tbody>`,
    )
    .join("\n          ");
  const coverageView = `<section class="view" data-view="coverage" aria-label="覆盖情况" hidden>
        ${viewHead("覆盖情况", `${rows.length} 个模型 × ${tasks.length} 道题 · 空缺 ${gaps} 格 · 点方块打开作品`)}
        <div class="matrix-wrap">
          <table class="matrix">
            <thead><tr><th scope="col"><span class="sr-only">模型</span></th>${header}</tr></thead>
          ${matrix}
          </table>
        </div>
        ${empty}
      </section>`;

  const workRow = (entry) => `<li class="work">
                <a class="work-name" href="${escapeHtml(workUrl(entry))}">${escapeHtml(taskById.get(entry.task).short)}${entry.variant ? `<span class="variant">${escapeHtml(entry.variant)}</span>` : ""}</a>
                <span class="date">${entry.day ? entry.day.slice(5) : "—"}</span>
                <a class="sub-link" href="${escapeHtml(sourceUrl(entry))}">源码</a>
                ${reportLink(entry)}
              </li>`;
  const modelCard = (row) => {
    const ids = [...row.efforts.values()].flat().map((entry) => entry.model);
    const lists = row.effortList
      .map(
        (effort) =>
          `<ul class="works" ${effortLayer(row, effort)}>${[...row.efforts.get(effort)]
            .sort((a, b) => a.task.localeCompare(b.task))
            .map(workRow)
            .join("")}</ul>`,
      )
      .join("");
    return `<div class="model-card" data-item data-effort-scope data-search="${searchText(row.name, row.modelId, row.vendor, ...ids)}">
            <div class="model-head"><div class="who">${avatar(row, "md")}<div><h3>${escapeHtml(row.name)}</h3><code>${escapeHtml(row.modelId)}</code></div></div>${effortSwitch(row)}</div>
            ${lists}
          </div>`;
  };
  const modelsView = `<section class="view" data-view="models" aria-label="全部模型" hidden>
        ${viewHead("全部模型", `${rows.length} 个模型 · 按厂商分组`)}
        ${vendors
          .map(
            ([vendor, list]) => `<section class="group" data-group>
          <h2 class="group-head">${vendorLogo(vendor)}${escapeHtml(vendor)}<span data-count="个模型">${list.length} 个模型</span></h2>
          ${list.map(modelCard).join("\n          ")}
        </section>`,
          )
          .join("\n        ")}
        ${empty}
      </section>`;

  const entryRow = (task, entry) => `<li class="entry" data-item data-search="${entrySearch(entry)}">
              ${avatar(entry, "sm")}<div class="entry-main"><b>${escapeHtml(entry.name)}</b><span>${escapeHtml(modelEffort(entry))}${entry.variant ? ` · ${escapeHtml(entry.variant)}` : ""} · ${dayText(entry.day)}</span></div>
              <button class="pill sm run" type="button" data-run="${escapeHtml(workUrl(entry))}" data-title="${escapeHtml(runLabel(entry))}" data-target="stage-${escapeHtml(task.task)}" aria-pressed="false">${icon("play")}运行</button>
              <a class="sub-link" href="${escapeHtml(workUrl(entry))}" target="_blank" rel="noopener">新窗口</a>
              <a class="sub-link" href="${escapeHtml(sourceUrl(entry))}">源码</a>
              ${reportLink(entry)}
            </li>`;
  const taskView = (task) => {
    const groups = groupRows(task.list)
      .map(
        ([vendor, list]) => `<section class="group" data-group>
          <h2 class="group-head">${vendorLogo(vendor)}${escapeHtml(vendor)}</h2>
          <ul class="entries">
            ${list
              .flatMap((row) => row.effortList.flatMap((effort) => row.efforts.get(effort)))
              .map((entry) => entryRow(task, entry))
              .join("\n            ")}
          </ul>
        </section>`,
      )
      .join("\n        ");
    const meta = `${task.subtitle ? `${escapeHtml(task.subtitle)} · ` : ""}${task.list.length} 份 · ${task.models} / ${rows.length} 个模型做过`;
    return `<section class="view" data-view="${escapeHtml(task.task)}" aria-label="${escapeHtml(task.title)}" hidden>
        ${viewHead(task.short, meta, `<a class="pill" href="${escapeHtml(promptUrl(task.task))}">${icon("book")}查看题面</a>`)}
        <div class="stage wide" id="stage-${escapeHtml(task.task)}" data-stage data-shared>
          <div class="stage-idle"><p class="hint">从下面任选一份，在这里运行</p></div>
        </div>
        ${groups}
        ${empty}
      </section>`;
  };

  const weeks = Array.from({ length: 10 }, (_, i) => addDays(weekStart(today), (i - 9) * 7));
  const weekCounts = weeks.map((start) => entries.filter((entry) => entry.day >= start && entry.day < addDays(start, 7)).length);
  const inWindow = entries.filter((entry) => entry.day >= weeks[0]);
  const perDay = new Map();
  for (const entry of inWindow) perDay.set(entry.day, (perDay.get(entry.day) ?? 0) + 1);
  const [busyDay, busyCount] = [...perDay].sort((a, b) => b[1] - a[1] || b[0].localeCompare(a[0]))[0] ?? ["", 0];
  const busyModels = [...new Set(inWindow.filter((entry) => entry.day === busyDay).map((entry) => entry.name))];
  const note = !busyDay
    ? ""
    : busyModels.length === 1
      ? `${dayLabel(busyDay)} · ${busyModels[0]} 一天交 ${busyCount} 份`
      : `${dayLabel(busyDay)} · 一天 ${busyCount} 份，来自 ${busyModels.length} 个模型`;
  const busyWeek = busyDay ? weeks.indexOf(weekStart(busyDay)) : -1;
  const peak = Math.max(1, ...weekCounts);
  const bars = weeks
    .map((start, i) => {
      const tip = `${dayLabel(start)}起一周 · ${weekCounts[i]} 份`;
      return `<span class="wk${i === busyWeek ? " hot" : ""}" style="--h:${((weekCounts[i] / peak) * 100).toFixed(1)}%" tabindex="0" data-tip="${tip}" aria-label="${tip}"><i></i></span>`;
    })
    .join("");
  const axis = weeks.map((start, i) => `<span>${[0, 5, 9].includes(i) ? start.slice(5) : ""}</span>`).join("");
  const least = [...tasks].sort((a, b) => a.models - b.models || a.short.localeCompare(b.short)).slice(0, 3);
  const rail = `<aside class="rail" aria-label="概况">
      <section class="card">
        <div class="ch-head"><h2>完成动态<span> · 近 10 周</span></h2><p>每周平均 ${(inWindow.length / 10).toFixed(1)} 份</p></div>
        ${note ? `<p class="note${busyWeek < 5 ? " left" : ""}"><span>${escapeHtml(note)}</span></p>` : ""}
        <div class="bars">${bars}</div>
        <div class="axis">${axis}</div>
      </section>
      <section>
        <h2 class="rail-head">概况</h2>
        <div class="tiles"><p><b>${entries.length}</b>份作业</p><p><b>${rows.length}</b>个模型</p><p><b>${tasks.length}</b>道题</p><p><b>${gaps}</b>个空缺</p></div>
      </section>
      <section>
        <h2 class="rail-head">做的人最少</h2>
        <ul class="least">
          ${least
            .map(
              (task) =>
                `<li><a href="#${escapeHtml(task.task)}"><span><b>${escapeHtml(task.short)}</b><small>${task.models} / ${rows.length} 个模型做过</small></span></a></li>`,
            )
            .join("\n          ")}
        </ul>
      </section>
    </aside>`;

  const navLink = (route, name, label) => `<a href="#${route === "recent" ? "" : route}" data-route="${route}">${icon(name)}${label}</a>`;
  const side = `<aside class="side">
      <div class="me"><b>LLM Evals</b></div>
      <nav class="nav" aria-label="视图">${navLink("recent", "feed", "最近完成")}${navLink("coverage", "grid", "覆盖情况")}${navLink("models", "models", "全部模型")}</nav>
      <h2 class="label">题目</h2>
      <nav class="tasks" aria-label="题目">
        ${tasks
          .map(
            (task) =>
              `<a class="task" href="#${escapeHtml(task.task)}" data-route="${escapeHtml(task.task)}">${escapeHtml(task.short)}<span class="n">${task.list.length}<span class="sr-only"> 份</span></span>${task.fresh ? `<span class="sr-only">，近 7 天新增 ${task.fresh} 份</span><i class="new" title="近 7 天新增 ${task.fresh} 份" aria-hidden="true"></i>` : ""}</a>`,
          )
          .join("\n        ")}
      </nav>
      <nav class="nav bottom" aria-label="仓库"><a href="${escapeHtml(archive.repoUrl)}">${icon("github")}GitHub 仓库</a><a href="#guide" data-route="guide">${icon("book")}运行指南</a></nav>
    </aside>`;

  const diagnosticEntries = [
    ...failed.map((entry) => ({ label: `${entry.task}/${entry.model}`, detail: `构建失败：${entry.reason}` })),
    ...skipped.map((label) => ({ label, detail: "没有 package.json，未构建" })),
  ];
  const diagnostics = diagnosticEntries.length
    ? `<details class="diagnostics">
          <summary>构建诊断（${diagnosticEntries.length} 项）</summary>
          <ul>
            ${diagnosticEntries.map((entry) => `<li><code>${escapeHtml(entry.label)}</code>${escapeHtml(entry.detail)}</li>`).join("\n            ")}
          </ul>
        </details>`
    : "";
  const updated = `${dayLabel(today)} ${CLOCK_FORMAT.format(new Date(generated * 1000))}`;

  const [layout, before, prompt, after] = guide;
  const codeBlock = (text, className = "") =>
    `<div class="code${className}"><pre><code>${escapeHtml(text)}</code></pre><button class="pill sm copy" type="button" data-copy>复制</button></div>`;
  const guideView = `<section class="view" data-view="guide" aria-label="运行指南" hidden>
        ${viewHead("运行指南", "每个模型一个独立文件夹 · 同一轮的模型发同一段提示词，只换尖括号里的值")}
        <section class="step">
          <p>两个文件夹并排放：第 1、3 步在 <code>llm-evals/</code> 里执行，第 2 步在模型自己的运行文件夹里。</p>
          <div class="code tree"><pre><code>${escapeHtml(layout)}</code></pre></div>
        </section>
        <section class="step">
          <h2 class="group-head">1. 开跑前</h2>
          <p>在 <code>llm-evals/</code> 里执行。命令会给每个 candidate-id 建一个运行文件夹 <code>llm-runs/&lt;task-id&gt;/&lt;candidate-id&gt;/</code>，并打印它的完整路径；可以一次建多个、同时跑。candidate-id 写成“模型名”或“模型名-思考程度”，比如 <code>gpt-6.1-sol</code>、<code>grok-4.6-high</code>。文件夹名和 Git 标签不能带冒号，所以这里用连字符；画廊里显示成 <code>grok-4.6:high</code>。不带思考程度时按该模型的默认档位显示，多数是 max。</p>
          ${codeBlock(before)}
        </section>
        <section class="step">
          <h2 class="group-head">2. 发给模型的提示词</h2>
          <p>进入第 1 步打印的那个文件夹，在里面启动模型，让它的工作目录就是 <code>llm-runs/&lt;task-id&gt;/&lt;candidate-id&gt;/</code>，然后发下面这段。第 2 条把实现位置统一到 <code>solution/</code>，题面里写的位置以它为准。</p>
          ${codeBlock(prompt, " prose")}
        </section>
        <section class="step">
          <h2 class="group-head">3. 跑完后</h2>
          <p>等模型提交以后，回到 <code>llm-evals/</code> 里执行：收回作品并推送，然后只构建这一份、重新部署，首页会按全部作品重新生成。</p>
          ${codeBlock(after)}
        </section>
        <p class="guide-source">命令和提示词取自仓库 <a href="${escapeHtml(archive.repoUrl)}#running-a-model">README 的 Running a Model 一节</a>，改那里即可。</p>
      </section>`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ffffff" />
    <title>LLM Evals</title>
    <link rel="icon" href="${ASSET_DIR}/favicon.svg" type="image/svg+xml" />
    <link rel="preload" href="${ASSET_DIR}/fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin />
    <style>${STYLE}    </style>
  </head>
  <body>
    <div class="app">
    ${side}
    <main class="main">
      <div class="column">
        <div class="topbar">
          <p class="updated">更新于 <time datetime="${escapeHtml(generatedAt)}">${updated}</time></p>
          <label class="search">${icon("search")}<span class="sr-only">搜索模型或题目</span><input id="search" type="search" placeholder="搜索模型或题目" autocomplete="off" spellcheck="false" /><kbd aria-hidden="true">/</kbd></label>
        </div>
      ${recentView}
      ${coverageView}
      ${modelsView}
      ${guideView}
      ${tasks.map(taskView).join("\n      ")}
      ${diagnostics ? `<footer class="page-foot">${diagnostics}</footer>` : ""}
      </div>
    </main>
    ${rail}
    </div>
    <script>${SCRIPT}    </script>
  </body>
</html>
`;
}

async function main() {
  const filter = process.argv.slice(2);
  for (const site of SITES) mkdirSync(site.dir, { recursive: true });
  mkdirSync(TMP_ROOT, { recursive: true });
  run("git fetch --all --prune");

  const archive = loadArchive();
  const guide = loadRunGuide();
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
  // 画廊页按各站点目录里实际存在的产物生成，部分重建不会漏掉其他候选。
  const generatedAt = new Date().toISOString();
  const sites = SITES.map((site) => {
    prunePublished(archive, site.dir);
    // 先清空再复制，已从 deploy/assets/ 删除的文件不再随站点发布。
    rmSync(join(site.dir, ASSET_DIR), { recursive: true, force: true });
    cpSync(join(DEPLOY_DIR, "assets"), join(site.dir, ASSET_DIR), { recursive: true });
    return { ...site, published: collectPublished(site.dir) };
  });
  const published = sites[0].published;
  for (const model of new Set(published.map((entry) => entry.model))) {
    if (identify(model).vendor === UNCLASSIFIED) console.warn(`未识别厂商：${model}，请在 deploy/build.mjs 的 VENDORS 或 ALIASES 中补充`);
  }
  for (const { task, model } of published) {
    if (!archive.tasks.get(task)?.candidates.get(model)?.time) console.warn(`没有找到 ${task}/${model} 的候选标签，画廊里它的完成日期会显示为未知`);
  }
  for (const site of sites) {
    if (site.published.length !== published.length) console.warn(`${fwd(site.dir)} 有 ${site.published.length} 份作品，${fwd(PUBLIC_DIR)} 有 ${published.length} 份；全量构建一次可以补齐`);
    writeFileSync(join(site.dir, "index.html"), renderGallery(site.published, archive, { generatedAt, failed, skipped, guide }), "utf8");
  }

  console.log("\n================ 构建汇总 ================");
  for (const r of results) {
    console.log(`${r.ok ? "OK  " : "FAIL"}  ${`${r.task}/${r.model}`.padEnd(52)} ${r.ok ? `${r.files} 个文件 ${(r.bytes / 1024 / 1024).toFixed(1)} MB` : r.reason}`);
  }
  console.log(`成功 ${results.length - failed.length} / ${results.length}，输出目录：${SITES.map((site) => site.dir).join("、")}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
