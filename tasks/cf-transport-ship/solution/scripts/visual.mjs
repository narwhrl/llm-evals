import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence'); await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = []; page.on('pageerror', e => errors.push(e.message));
try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#start-button').click();
  await page.waitForFunction(() => window.__shipTest?.snapshot().phase === 'playing');
  // Freeze the actual match at a fixed instant so camera comparisons use identical world state.
  await page.evaluate(() => window.__shipTest.game.pause());
  const positions = [
    ['red-exit', 0, 0, -28.4, 0, 0], ['red-fire-lane', -4.8, 0, -20, 0, 0],
    ['starboard-route', 12.1, 0, -8, 0, 0], ['central-diagonal', -5.3, 0, -5.1, Math.PI / 2.8, -.06],
    ['port-route', -12.1, 0, 7, Math.PI, 0], ['high-lookout', -12.05, 2.57, 0, 1.05, -.22],
    ['blue-fire-lane', 4.8, 0, 20, Math.PI, 0], ['blue-exit', 0, 0, 28.4, Math.PI, 0]
  ];
  for (const [name, x, y, z, yaw, pitch] of positions) {
    await page.evaluate(([a, b, c, d, e]) => window.__shipTest.pose(a, b, c, d, e), [x, y, z, yaw, pitch]);
    await page.waitForTimeout(80);
    await page.screenshot({ path: resolve(evidence, `${name}.png`) });
  }
  console.log(JSON.stringify({ screenshots: positions.map(p => `${p[0]}.png`), errors }, null, 2));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
