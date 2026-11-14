#!/usr/bin/env node
// 模型运行的隔离工作区，放在仓库目录之外（默认 ../llm-runs/<task-id>/<candidate-id>/）。用法：
//   node scripts/runs.mjs new <task-id> <candidate-id> [...]      每个候选一个只含 main 基线提交的独立仓库：无历史、无其他 ref
//   node scripts/runs.mjs collect <task-id> <candidate-id> [...] --harness <harness>
//                                                                收回候选提交：打 candidate 标签，导入 llm/<task-id>，校验树哈希，记下运行所在的 harness

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RUNS_ROOT = resolve(REPO_ROOT, "..", "llm-runs");
const ID = /^[a-z0-9][a-z0-9.-]*$/;

function git(args, { cwd = REPO_ROOT, input, env, allowFail = false } = {}) {
  const res = spawnSync("git", args, { cwd, input, encoding: "utf8", env: env && { ...process.env, ...env } });
  if (res.status !== 0) {
    if (allowFail) return null;
    throw new Error(`git ${args.join(" ")} 失败：${(res.stderr || res.stdout).trim()}`);
  }
  return res.stdout.trim();
}

function parseArgs(rest) {
  const [task, ...candidates] = rest;
  if (!task || !candidates.length) throw new Error("用法：node scripts/runs.mjs <new|collect> <task-id> <candidate-id> [...]");
  for (const id of [task, ...candidates]) if (!ID.test(id)) throw new Error(`非法 id：${id}`);
  return { task, candidates };
}

function newRuns(task, candidates) {
  const baseline = git(["rev-parse", "main"]);
  const inputTree = git(["rev-parse", `${baseline}:tasks/${task}`]);
  for (const candidate of candidates) {
    const dir = join(RUNS_ROOT, task, candidate);
    if (existsSync(dir)) throw new Error(`已存在，不覆盖：${dir}`);
  }
  for (const candidate of candidates) {
    const dir = join(RUNS_ROOT, task, candidate);
    mkdirSync(dir, { recursive: true });
    git(["init", "-q"], { cwd: dir });
    git(["fetch", "-q", "--depth", "1", pathToFileURL(REPO_ROOT).href, baseline], { cwd: dir });
    git(["checkout", "-q", "--detach", "FETCH_HEAD"], { cwd: dir });
    console.log(`${task}/${candidate}  ${dir}`);
  }
  console.log(`基线 ${baseline}，题目指纹 ${inputTree}。模型在 tasks/${task}/solution/ 下作答并提交。`);
}

// 同一 llm/<task-id> 的本地与 origin 取较新者；两边分叉时停下，交给人处理。
function archiveTip(task) {
  git(["fetch", "-q", "origin"]);
  const local = git(["rev-parse", "-q", "--verify", `refs/heads/llm/${task}`], { allowFail: true });
  const remote = git(["rev-parse", "-q", "--verify", `refs/remotes/origin/llm/${task}`], { allowFail: true });
  if (!local || !remote || local === remote) return local || remote;
  if (git(["merge-base", "--is-ancestor", remote, local], { allowFail: true }) !== null) return local;
  if (git(["merge-base", "--is-ancestor", local, remote], { allowFail: true }) !== null) return remote;
  throw new Error(`llm/${task} 本地与 origin 已分叉，先手动合并`);
}

function collect(task, candidates, harness) {
  if (!harness?.trim()) throw new Error('collect 需要 --harness <harness>，写模型运行所在的客户端，例如 --harness "Codex CLI"');
  const branch = `refs/heads/llm/${task}`;
  const before = git(["rev-parse", "-q", "--verify", branch], { allowFail: true }) ?? "";
  let tip = archiveTip(task);
  const indexFile = join(git(["rev-parse", "--absolute-git-dir"]), `runs-${process.pid}.idx`);
  const env = { GIT_INDEX_FILE: indexFile };

  try {
    for (const candidate of candidates) {
      const dir = join(RUNS_ROOT, task, candidate);
      const solution = `tasks/${task}/solution`;
      const destination = `tasks/${task}/solutions/${candidate}`;
      const tag = `candidate/${task}/${candidate}`;

      const head = git(["rev-parse", "HEAD"], { cwd: dir });
      const baseline = git(["rev-list", "--max-parents=0", "HEAD"], { cwd: dir });
      if (head === baseline) throw new Error(`${candidate}：还没有候选提交`);
      if (git(["status", "--porcelain", "--", solution], { cwd: dir })) throw new Error(`${candidate}：${solution}/ 有未提交改动`);
      const sourceTree = git(["rev-parse", `HEAD:${solution}`], { cwd: dir });
      const outside = git(["diff", "--name-only", baseline, head], { cwd: dir })
        .split("\n")
        .filter((p) => p && !p.startsWith(`${solution}/`));
      if (outside.length) console.warn(`警告 ${candidate}：改动了 solution/ 以外的文件，不会导入，需在 RESULTS.md 中说明：\n  ${outside.join("\n  ")}`);

      git(["fetch", "-q", dir, "HEAD"]);
      if (git(["rev-parse", "FETCH_HEAD"]) !== head) throw new Error(`${candidate}：取回的提交与运行目录不一致`);
      const tagged = git(["rev-parse", "-q", "--verify", `refs/tags/${tag}^{commit}`], { allowFail: true });
      // shortcut: 同名标签已指向别的提交时直接停下，修订版（-r2 等）仍按 README 手工导入。
      if (tagged && tagged !== head) throw new Error(`${tag} 已指向 ${tagged}，修订版请手工导入`);
      if (!tagged) git(["tag", tag, head]);

      if (tip) git(["read-tree", tip], { env });
      else git(["read-tree", "--empty"], { env });
      if (git(["ls-files", "--", destination], { env })) throw new Error(`${destination} 已存在，修订版请手工导入`);
      git(["read-tree", `--prefix=${destination}/`, sourceTree], { env });

      const imports = tip && git(["cat-file", "-e", `${tip}:tasks/${task}/imports.json`], { allowFail: true }) !== null
        ? JSON.parse(git(["show", `${tip}:tasks/${task}/imports.json`]))
        : { schema: 1, taskId: task, candidates: [] };
      const hasResults = git(["cat-file", "-e", `${head}:${solution}/RESULTS.md`], { allowFail: true }) !== null;
      imports.candidates.push({
        candidateId: candidate,
        harness: harness.trim(),
        baselineMain: baseline,
        inputTree: git(["rev-parse", `${baseline}:tasks/${task}`]),
        sourceRef: `run:${relative(REPO_ROOT, dir).replaceAll("\\", "/")}`,
        sourceCommit: head,
        sourceTree,
        archiveTag: tag,
        destination,
        ...(hasResults && { resultReport: `${destination}/RESULTS.md` }),
      });
      const blob = git(["hash-object", "-w", "--stdin"], { input: `${JSON.stringify(imports, null, 2)}\n` });
      git(["update-index", "--add", "--cacheinfo", `100644,${blob},tasks/${task}/imports.json`], { env });

      const tree = git(["write-tree"], { env });
      const commit = git(["commit-tree", tree, ...(tip ? ["-p", tip] : []), "-m", `feat: import ${candidate} ${task} candidate`]);
      if (git(["rev-parse", `${commit}:${destination}`]) !== sourceTree) throw new Error(`${candidate}：导入后的树哈希不一致`);
      tip = commit;
      console.log(`${candidate}  ${tag} -> ${head.slice(0, 7)}，树 ${sourceTree.slice(0, 7)} 已导入`);
    }
    git(["update-ref", branch, tip, before]);
  } finally {
    rmSync(indexFile, { force: true });
  }
  console.log(`llm/${task} -> ${tip.slice(0, 7)}。确认后推送：git push origin llm/${task} ${candidates.map((c) => `candidate/${task}/${c}`).join(" ")}`);
}

try {
  const [command, ...rest] = process.argv.slice(2);
  const at = rest.indexOf("--harness");
  const harness = at < 0 ? undefined : rest.splice(at, 2)[1];
  const { task, candidates } = parseArgs(rest);
  if (command === "new") newRuns(task, candidates);
  else if (command === "collect") collect(task, candidates, harness);
  else throw new Error(`未知命令：${command}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
