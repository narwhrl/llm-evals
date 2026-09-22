/**
 * 视觉验收：对生产构建跑真实浏览器截图矩阵与交互路径。
 * 用法：node scripts/visual-acceptance.mjs
 * 产物：scripts/shots/*.png（本地证据，不入库）
 */
import { spawn } from 'node:child_process';
import { mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const SHOTS = join(ROOT, 'scripts', 'shots');
const PORT = 4180 + Math.floor(Math.random() * 20);
const BASE = `http://localhost:${PORT}/`;

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

/** 把滚动条推到整体进度 p（0..1），与 useScrollProgress 同口径 */
async function scrollToProgress(page, p) {
  await page.evaluate((target) => {
    const track = document.querySelector('[data-track]');
    const total = track.offsetHeight - window.innerHeight;
    window.scrollTo(0, Math.round(total * target));
  }, p);
  await page.waitForTimeout(450);
}

async function strikeSlot(page, id) {
  await page.click(`[data-slot="${id}"]`, { force: true });
  await page.waitForTimeout(720); // 等撕词与砸落收住
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

  try {
    for (const vp of VIEWPORTS) {
      for (const mo of MOTIONS) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          reducedMotion: mo.reducedMotion,
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();
        await page.goto(BASE, { waitUntil: 'networkidle' });
        await page.waitForTimeout(700);
        const tag = `${vp.id}-${mo.id}`;

        // 1. 封面
        await scrollToProgress(page, 0);
        await page.screenshot({ path: join(SHOTS, `${tag}-1-cover.png`) });

        // 2. 起草中
        await scrollToProgress(page, 0.24);
        await page.screenshot({ path: join(SHOTS, `${tag}-2-drafting.png`) });

        // 3. 删改态（未动笔）
        await scrollToProgress(page, 0.5);
        await page.screenshot({ path: join(SHOTS, `${tag}-3-revise-clean.png`) });

        // 4. 删改中：连划三处
        await strikeSlot(page, 's1');
        await strikeSlot(page, 's3');
        await strikeSlot(page, 's5');
        await page.screenshot({ path: join(SHOTS, `${tag}-4-revise-edited.png`) });

        // 5. 后注显形（隐藏层）
        await page.click('[data-note="s1"]', { force: true });
        await page.waitForTimeout(420);
        await page.screenshot({ path: join(SHOTS, `${tag}-5-note.png`) });
        await page.click('[data-note="s1"]', { force: true });

        // 6. 判死瞬间
        await scrollToProgress(page, 0.7);
        await page.screenshot({ path: join(SHOTS, `${tag}-6-condemned.png`) });

        // 7. 翻面中
        await scrollToProgress(page, 0.8);
        await page.screenshot({ path: join(SHOTS, `${tag}-7-flip.png`) });

        // 8. 清样终态
        await scrollToProgress(page, 0.97);
        await page.waitForTimeout(500);
        await page.screenshot({ path: join(SHOTS, `${tag}-8-final.png`) });

        // 9. 回删改：废稿篓取回
        await scrollToProgress(page, 0.5);
        const scrap = await page.$('[data-scrap]');
        if (scrap) {
          await scrap.click({ force: true });
          await page.waitForTimeout(650);
          await page.screenshot({ path: join(SHOTS, `${tag}-9-restore.png`) });
        } else {
          log.push(`${tag}: 废稿篓为空，跳过取回`);
        }

        // 10. 幽灵句：同一词位划满三次
        await page.evaluate(() => {
          document.querySelector('[data-reset]')?.click();
        });
        await page.waitForTimeout(300);
        await scrollToProgress(page, 0.5);
        await strikeSlot(page, 's2');
        await strikeSlot(page, 's2');
        await strikeSlot(page, 's2');
        await page.waitForTimeout(1900);
        await page.screenshot({ path: join(SHOTS, `${tag}-10-ghost.png`) });

        // 11. 键盘路径：Tab 到词位 → Enter 划除
        await page.evaluate(() => {
          document.querySelector('[data-reset]')?.click();
        });
        await page.waitForTimeout(300);
        await scrollToProgress(page, 0.5);
        await page.focus('[data-slot="s1"]');
        await page.keyboard.press('Enter');
        await page.waitForTimeout(700);
        await page.screenshot({ path: join(SHOTS, `${tag}-11-keyboard.png`) });

        // 12. 空清样兜底：全部划空后看终句
        await page.evaluate(() => {
          document.querySelector('[data-reset]')?.click();
        });
        await page.waitForTimeout(300);
        await scrollToProgress(page, 0.5);
        for (const id of ['s1', 's2', 's3', 's4', 's5']) {
          await strikeSlot(page, id);
          await strikeSlot(page, id);
          await strikeSlot(page, id);
        }
        await scrollToProgress(page, 0.97);
        await page.waitForTimeout(500);
        await page.screenshot({ path: join(SHOTS, `${tag}-12-empty-final.png`) });

        log.push(`${tag}: 完成 12 格`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
    preview.kill();
  }

  for (const line of log) console.log(line);
  console.log(`截图目录：${SHOTS}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
