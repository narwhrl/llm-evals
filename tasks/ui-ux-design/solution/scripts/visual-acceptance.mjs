/**
 * 视觉验收：对生产构建跑真实浏览器截图矩阵与交互路径。
 * 用法：node scripts/visual-acceptance.mjs
 * 可选：ONLY=desktop-normal 只跑一组，便于复核。
 * 产物：scripts/shots/*.png + 同名 .txt（截图瞬间的 DOM 状态旁证，不入库）
 */
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SHOTS = join(ROOT, 'scripts', 'shots');
const PORT = 4180 + Math.floor(Math.random() * 20);
const BASE = `http://localhost:${PORT}/`;
const RUN_ID = new Date().toISOString();

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
].filter(Boolean);

const VIEWPORTS = [
  { id: 'desktop', width: 1440, height: 900 },
  { id: 'mobile', width: 390, height: 844 },
];
const MOTIONS = [
  { id: 'normal', reducedMotion: 'no-preference' },
  { id: 'reduce', reducedMotion: 'reduce' },
];

/** 截图瞬间的 DOM 状态，与 PNG 一一对应，用来排除「图与文件名错位」 */
async function probeState(page) {
  return page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const track = q('[data-track]');
    const total = track ? track.offsetHeight - window.innerHeight : 1;
    const pct = total > 0 ? window.scrollY / total : 0;
    const plate = q('[data-plate]');
    const title = q('.title-block');
    const ghost = q('[data-ghost]');
    const ta = title ? getComputedStyle(title) : null;
    const ga = ghost ? getComputedStyle(ghost) : null;
    return {
      pct: Number(pct.toFixed(4)),
      scrollY: Math.round(window.scrollY),
      plateClass: plate?.className ?? '',
      plateTransform: plate?.style.transform || 'none',
      titleOpacity: ta ? Number(ta.opacity) : null,
      titleFilter: ta?.filter ?? null,
      header: q('[data-header-state]')?.textContent?.trim() ?? '',
      slots: [...document.querySelectorAll('[data-slot]')].map((el) => ({
        id: el.getAttribute('data-slot'),
        text: el.textContent.trim(),
        disabled: el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true',
        label: el.getAttribute('aria-label') ?? '',
      })),
      preview: q('[data-preview]')?.textContent?.trim() ?? '',
      scraps: document.querySelectorAll('[data-scrap]').length,
      ghostText: ghost?.textContent?.trim() ?? '',
      ghostDisplay: ga?.display ?? null,
      ghostOpacity: ga ? Number(ga.opacity) : null,
      final: q('[data-final]')?.textContent?.trim() ?? '',
      count: q('[data-count]')?.textContent?.trim() ?? '',
      sealVisible: !!q('[data-seal]'),
      noteOpen: q('[data-note-body]')?.textContent?.trim() ?? '',
      live: q('[data-live]')?.textContent?.trim() ?? '',
    };
  });
}

/** 把滚动条推到整体进度 p（0..1），与 useScrollProgress 同口径，等稳态后再返回 */
async function scrollToProgress(page, p) {
  await page.evaluate((target) => {
    const track = document.querySelector('[data-track]');
    const total = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: Math.round(total * target), behavior: 'instant' });
  }, p);
  await page
    .waitForFunction(
      (target) => {
        const track = document.querySelector('[data-track]');
        const total = track.offsetHeight - window.innerHeight;
        return total > 0 && Math.abs(window.scrollY / total - target) < 0.004;
      },
      p,
      { timeout: 4000 },
    )
    .catch(() => {});
  // 等压印/笔迹/翻面等按帧动效收住
  await page.waitForTimeout(650);
}

async function strikeSlot(page, id) {
  await page.click(`[data-slot="${id}"]`, { force: true });
  await page.waitForTimeout(780); // 等撕词与砸落收住
}

/** 稳态截图 + 同名 .txt 旁证 */
async function shoot(page, tag, name) {
  await page.waitForTimeout(200);
  const state = await probeState(page);
  state.runId = RUN_ID;
  state.shot = `${tag}-${name}`;
  writeFileSync(join(SHOTS, `${tag}-${name}.txt`), JSON.stringify(state, null, 2));
  await page.screenshot({ path: join(SHOTS, `${tag}-${name}.png`) });
  console.log(
    `shot ${tag}-${name}  pct=${state.pct}  plate=${state.plateTransform}  scraps=${state.scraps}  final=${state.final.slice(0, 18)}`,
  );
  return state;
}

async function resetEdits(page) {
  await page.evaluate(() => {
    document.querySelector('[data-reset]')?.click();
  });
  // 等 React 提交清零（以 live 播报与废稿篓清空为准）
  await page.waitForFunction(() => !document.querySelector('[data-scrap]'), null, { timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(350);
}

async function run() {
  if (!existsSync(join(ROOT, 'dist', 'index.html'))) {
    throw new Error('先跑 npm run build 再验收');
  }
  rmSync(SHOTS, { recursive: true, force: true });
  mkdirSync(SHOTS, { recursive: true });

  const preview = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: 'pipe',
    shell: true,
  });
  preview.stderr.on('data', (d) => process.stderr.write(d));
  preview.stdout.on('data', () => {});
  // 等预览端口真正就绪
  const deadline = Date.now() + 30000;
  for (;;) {
    try {
      const res = await fetch(BASE, { method: 'HEAD' });
      if (res.ok || res.status === 405) break;
    } catch {
      /* 还没起来 */
    }
    if (Date.now() > deadline) {
      preview.kill();
      throw new Error('vite preview 30s 内未就绪');
    }
    await new Promise((r) => setTimeout(r, 300));
  }

  const exe = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!exe) throw new Error('找不到本机 Chrome/Edge');
  const browser = await chromium.launch({ executablePath: exe, headless: true });
  const log = [];
  const only = process.env.ONLY || '';

  try {
    for (const vp of VIEWPORTS) {
      for (const mo of MOTIONS) {
        const tag = `${vp.id}-${mo.id}`;
        if (only && tag !== only) continue;
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          reducedMotion: mo.reducedMotion,
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.waitForTimeout(800);

        // 1. 封面
        await scrollToProgress(page, 0);
        await shoot(page, tag, '1-cover');

        // 2. 起草中
        await scrollToProgress(page, 0.24);
        await shoot(page, tag, '2-drafting');

        // 3. 删改态（未动笔）
        await scrollToProgress(page, 0.5);
        await shoot(page, tag, '3-revise-clean');

        // 4. 删改中：连划三处
        await strikeSlot(page, 's1');
        await strikeSlot(page, 's3');
        await strikeSlot(page, 's5');
        await shoot(page, tag, '4-revise-edited');

        // 5. 后注显形（隐藏层）
        await page.click('[data-note="s1"]', { force: true });
        await page.waitForTimeout(480);
        await shoot(page, tag, '5-note');
        await page.click('[data-note="s1"]', { force: true });
        await page.waitForTimeout(250);

        // 6. 判死瞬间
        await scrollToProgress(page, 0.7);
        await shoot(page, tag, '6-condemned');

        // 7. 翻面中
        await scrollToProgress(page, 0.8);
        await shoot(page, tag, '7-flip');

        // 8. 清样终态
        await scrollToProgress(page, 0.97);
        await shoot(page, tag, '8-final');

        // 9. 回删改：废稿篓取回
        await scrollToProgress(page, 0.5);
        const scrap = await page.$('[data-scrap]');
        if (scrap) {
          await scrap.click({ force: true });
          await page.waitForTimeout(700);
          await shoot(page, tag, '9-restore');
        } else {
          log.push(`${tag}: 废稿篓为空，跳过取回`);
        }

        // 10. 幽灵句：同一词位划满三次
        await resetEdits(page);
        await scrollToProgress(page, 0.5);
        await strikeSlot(page, 's2');
        await strikeSlot(page, 's2');
        await strikeSlot(page, 's2');
        await page.waitForTimeout(2000);
        await shoot(page, tag, '10-ghost');

        // 11. 键盘路径：Tab 到词位 → Enter 划除
        await resetEdits(page);
        await scrollToProgress(page, 0.5);
        await page.focus('[data-slot="s1"]');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(750);
        await shoot(page, tag, '11-keyboard');

        // 12. 空清样兜底：全部划空后看终句
        await resetEdits(page);
        await scrollToProgress(page, 0.5);
        for (const id of ['s1', 's2', 's3', 's4', 's5']) {
          await strikeSlot(page, id);
          await strikeSlot(page, id);
          await strikeSlot(page, id);
        }
        await scrollToProgress(page, 0.97);
        await shoot(page, tag, '12-empty-final');

        log.push(`${tag}: 完成 12 格`);
        await context.close();
      }
    }
  } finally {
    await browser.close().catch(() => {});
    preview.kill();
  }

  for (const line of log) console.log(line);
  console.log(`截图目录：${SHOTS}`);
  // vite preview 的孙进程可能拽住 stdio，这里强制收尾
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
