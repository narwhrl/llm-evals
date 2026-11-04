#!/usr/bin/env node
// 把 deploy/pages/ 原样提交到 gh-pages 分支并推送，GitHub Pages 从这个分支发布到 https://narwhrl.github.io/llm-evals/。
// 先运行 node deploy/build.mjs。用法：node deploy/pages.mjs

import { spawnSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const DEPLOY_DIR = dirname(fileURLToPath(import.meta.url));
const PAGES_DIR = join(DEPLOY_DIR, "pages");
const BRANCH = "gh-pages";

function git(args, { cwd = DEPLOY_DIR, env, allowFail = false } = {}) {
  const res = spawnSync("git", args, { cwd, encoding: "utf8", env: env && { ...process.env, ...env } });
  if (res.status !== 0) {
    if (allowFail) return null;
    throw new Error(`git ${args.join(" ")} 失败：${(res.stderr || res.stdout).trim()}`);
  }
  return res.stdout.trim();
}

function main() {
  if (!existsSync(join(PAGES_DIR, "index.html"))) throw new Error(`${PAGES_DIR} 里没有 index.html，先运行 node deploy/build.mjs`);
  // _gallery/ 以下划线开头，Jekyll 会跳过它；.nojekyll 让 Pages 原样发布。
  writeFileSync(join(PAGES_DIR, ".nojekyll"), "");

  const gitDir = git(["rev-parse", "--absolute-git-dir"]);
  const index = join(gitDir, "gh-pages-index");
  // 独立的暂存区，不碰当前分支的 index 和工作区；关掉换行转换、忽略规则，保证提交的就是构建产物本身。
  const pages = (args) =>
    git(["-c", "core.autocrlf=false", `--git-dir=${gitDir}`, `--work-tree=${PAGES_DIR}`, ...args], { cwd: PAGES_DIR, env: { GIT_INDEX_FILE: index } });
  rmSync(index, { force: true });
  let tree;
  try {
    pages(["add", "--all", "--force", "."]);
    tree = pages(["write-tree"]);
  } finally {
    rmSync(index, { force: true });
  }

  git(["fetch", "-q", "origin", BRANCH], { allowFail: true });
  const parent = git(["rev-parse", "-q", "--verify", `refs/remotes/origin/${BRANCH}`], { allowFail: true });
  if (parent && git(["rev-parse", `${parent}^{tree}`]) === tree) {
    console.log(`${BRANCH} 已是最新，没有需要发布的变化`);
    return;
  }
  const source = git(["rev-parse", "--short", "HEAD"]);
  const commit = git(["commit-tree", tree, ...(parent ? ["-p", parent] : []), "-m", `chore: publish gallery from ${source}`]);
  git(["push", "-q", "origin", `${commit}:refs/heads/${BRANCH}`]);
  console.log(`${BRANCH} -> ${commit.slice(0, 7)}，GitHub Pages 会在一两分钟内更新 https://narwhrl.github.io/llm-evals/`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
