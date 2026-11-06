import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { PerspectiveCamera, Vector3 } from 'three';

const url = process.argv[2] || 'http://127.0.0.1:5173/';
await mkdir('evidence', { recursive: true });
const context = await chromium.launchPersistentContext(resolve('.browsers/verification-profile'), {
  headless: true,
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
  args: ['--enable-unsafe-swiftshader'],
});
const page = context.pages()[0];
page.setDefaultTimeout(15000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
const state = () => page.evaluate(async () => {
  const entry = document.querySelector('script[type="module"][src*="/src/main.js"]').src;
  return (await import(entry)).room.getState();
});
const waitForPaint = () => page.waitForTimeout(1100);

try {
  await page.goto(url);
  await page.locator('#loading.ready').waitFor();
  await waitForPaint();
  assert.equal(await page.locator('#scene-error').isVisible(), false);
  assert.equal(await page.locator('#scene canvas').count(), 1);
  await page.screenshot({ path: 'evidence/desktop-2005.png' });
  const originalAnchor = await page.locator('[data-memory="photo"]').boundingBox();
  await page.mouse.move(1100, 650);
  await page.mouse.down();
  await page.mouse.move(850, 650, { steps: 12 });
  await page.mouse.up();
  await waitForPaint();
  const rotatedAnchor = await page.locator('[data-memory="photo"]').boundingBox();
  assert.ok(Math.abs(rotatedAnchor.x - originalAnchor.x) > 20, 'dragging orbits the room');
  await page.mouse.wheel(0, -180);
  await waitForPaint();
  const zoomedAnchor = await page.locator('[data-memory="photo"]').boundingBox();
  assert.ok(Math.hypot(zoomedAnchor.x - rotatedAnchor.x, zoomedAnchor.y - rotatedAnchor.y) > 5, 'wheel zoom changes the view');
  await page.getByRole('button', { name: '整个房间', exact: true }).click();
  await waitForPaint();
  for (const year of [2010, 2015, 2020, 2025, 2005]) {
    await page.getByRole('button', { name: `回到 ${year} 年` }).click();
    await waitForPaint();
    assert.equal((await state()).era, year);
    assert.equal(await page.locator('#year-display').innerText(), String(year));
    if (year === 2015) await page.screenshot({ path: 'evidence/desktop-2015.png' });
  }
  await page.getByRole('button', { name: '用了二十年的红杯' }).click();
  assert.match(await page.locator('#memory-text').innerText(), /妈妈/);
  await page.getByRole('button', { name: '关闭记忆' }).click();
  await page.getByRole('slider', { name: '选择年份' }).fill('2012');
  assert.equal((await state()).year, 2012);
  assert.equal((await state()).era, 2010);
  await page.getByRole('button', { name: '自动播放二十年' }).click();
  await page.waitForFunction(() => Number(document.querySelector('#year-display').textContent) >= 2013);
  await page.getByRole('button', { name: '暂停时光播放' }).click();
  assert.equal(await page.locator('#play').getAttribute('aria-pressed'), 'false');
  await page.getByRole('button', { name: '回到 2025 年' }).click();
  await waitForPaint();
  await page.screenshot({ path: 'evidence/desktop-2025.png' });
  await page.getByRole('button', { name: '切换夜晚灯光' }).click();
  await waitForPaint();
  assert.equal((await state()).night, true);
  await page.screenshot({ path: 'evidence/night-2025.png' });
  await page.getByRole('button', { name: '坐到桌前', exact: true }).click();
  await waitForPaint();
  const bounds = await page.locator('#scene canvas').boundingBox();
  // Project the visible 2025 monitor to send real mouse clicks through the raycaster.
  const camera = new PerspectiveCamera(34, bounds.width / bounds.height, .1, 80);
  camera.position.set(.8, 3.5, 3.7);
  camera.lookAt(.5, 1.99, -1.8);
  camera.updateMatrixWorld();
  function monitorPoint(u, v) {
    const point = new Vector3(.58 + (u - .5) * 1.95, 2.125 + (v - .5) * .82, -2.083).project(camera);
    return [bounds.x + (point.x + 1) * bounds.width / 2, bounds.y + (1 - point.y) * bounds.height / 2];
  }
  await page.mouse.click(...monitorPoint(173 / 512, 1 - 242 / 320));
  assert.equal((await state()).screen.mode, 'game', 'the rendered monitor launches the game');
  const target = (await state()).screen.target;
  await page.mouse.click(...monitorPoint(target.u, target.v));
  assert.equal((await state()).screen.score, 1, 'a real screen click collects a star');
  await page.screenshot({ path: 'evidence/screen-game.png' });
  await page.mouse.click(...monitorPoint(40 / 512, 1 - 21 / 320));
  assert.equal((await state()).screen.mode, 'desktop');
  await page.getByRole('button', { name: '整个房间', exact: true }).click();
  await page.getByRole('button', { name: '切换白天灯光' }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.locator('#loading.ready').waitFor();
  await waitForPaint();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  await page.getByRole('button', { name: '回到 2025 年' }).click();
  await waitForPaint();
  assert.equal((await state()).era, 2025);
  await page.screenshot({ path: 'evidence/mobile-2025.png', fullPage: true });
  assert.deepEqual(errors, []);
  console.log('PASS: orbit/zoom/reset, five eras, intermediate year, memories, playback, night lighting, real monitor launch/score/back, 390px layout; no console or page errors.');
} catch (error) {
  console.error('Browser errors:', errors);
  await page.screenshot({ path: 'evidence/browser-failure.png', fullPage: true });
  throw error;
} finally {
  await context.close();
}
