import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence'); await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await context.newPage(), errors = [], external = [];
page.on('pageerror', e => errors.push(e.stack || e.message));
page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
page.on('request', r => { if (/^https?:/.test(r.url()) && !r.url().startsWith(new URL(base).origin)) external.push(r.url()); });
try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#menu-settings').click();
  await page.locator('#fov').focus();
  for (let i = 0; i < 4; i++) await page.keyboard.press('ArrowRight');
  const storedFov = await page.evaluate(() => JSON.parse(localStorage.getItem('transport-ship-settings')).fov);
  await page.locator('#settings-close').click();
  await page.locator('[data-weapon="longshot"]').click();
  await page.locator('#start-button').click();
  await page.waitForFunction(() => window.__shipTest?.snapshot().phase === 'playing' && document.pointerLockElement?.id === 'game-canvas');
  const start = await page.evaluate(() => window.__shipTest.snapshot());
  await page.keyboard.down('w');
  await page.waitForFunction(z => window.__shipTest.snapshot().actors.find(a => a.id === 0).z > z + 1, start.actors.find(a => a.id === 0).z, { timeout: 15000 });
  await page.keyboard.up('w');
  const moved = await page.evaluate(() => window.__shipTest.snapshot());
  await page.mouse.move(720, 450); await page.mouse.down({ button: 'right' });
  await page.waitForTimeout(500);
  const scoped = await page.evaluate(() => ({ visible: !document.querySelector('#scope').classList.contains('hidden'), fov: window.__shipTest.renderer.camera.fov }));
  await page.screenshot({ path: resolve(evidence, 'scope.png') });
  await page.mouse.click(720, 450); await page.waitForTimeout(180);
  const afterShot = await page.evaluate(() => window.__shipTest.snapshot());
  await page.mouse.click(720, 450); await page.waitForTimeout(130);
  const afterBlockedShot = await page.evaluate(() => window.__shipTest.snapshot());
  await page.mouse.up({ button: 'right' });
  await page.keyboard.press('r'); await page.waitForTimeout(190);
  const reload = await page.evaluate(() => ({ finish: window.__shipTest.game.player.gear.longshot.reloadEnd, now: window.__shipTest.game.now }));
  await page.screenshot({ path: resolve(evidence, 'reload.png') });
  await page.keyboard.down('Tab'); await page.waitForTimeout(120);
  const boardVisible = await page.locator('#scoreboard').evaluate(el => !el.classList.contains('hidden'));
  await page.screenshot({ path: resolve(evidence, 'scoreboard.png') });
  await page.keyboard.up('Tab');
  const pauseCycles = [];
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Escape');
    await page.waitForFunction(() => window.__shipTest.snapshot().phase === 'paused');
    const remaining = await page.evaluate(() => window.__shipTest.snapshot().remaining);
    await page.waitForTimeout(230);
    const frozen = await page.evaluate(() => window.__shipTest.snapshot().remaining);
    await page.locator('#resume-button').click();
    await page.waitForFunction(() => window.__shipTest.snapshot().phase === 'playing' && document.pointerLockElement?.id === 'game-canvas');
    pauseCycles.push({ paused: true, frozen: Math.abs(remaining - frozen) < .0001 });
  }
  await page.keyboard.press('2');
  const pistol = await page.evaluate(() => window.__shipTest.game.player.selected);
  await page.keyboard.press('3');
  const knife = await page.evaluate(() => window.__shipTest.game.player.selected);
  await page.keyboard.press('4'); await page.keyboard.press('4');
  const selectedGrenade = await page.evaluate(() => window.__shipTest.game.player.grenadeChoice);
  await page.evaluate(() => window.__shipTest.pose(0, 0, -27, 0, 0));
  await page.keyboard.press('g');
  const smokeInventory = await page.evaluate(() => window.__shipTest.game.player.grenades.smoke);
  await page.waitForFunction(() => window.__shipTest.game.smokes.length > 0, null, { timeout: 25000 });
  await page.screenshot({ path: resolve(evidence, 'smoke.png') });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(150);
  const resize = await page.evaluate(() => ({ width: innerWidth, height: innerHeight, canvasWidth: document.querySelector('#game-canvas').width, crosshair: getComputedStyle(document.querySelector('#crosshair')).left }));
  await page.screenshot({ path: resolve(evidence, 'desktop-1920.png') });
  const restartCycles = [];
  for (let i = 0; i < 5; i++) {
    await page.waitForTimeout(350);
    await page.evaluate(() => document.exitPointerLock());
    await page.waitForFunction(() => window.__shipTest.snapshot().phase === 'paused');
    await page.locator('#restart-button').click();
    await page.waitForFunction(() => window.__shipTest.snapshot().phase === 'playing' && document.pointerLockElement?.id === 'game-canvas');
    await page.waitForTimeout(700);
    restartCycles.push(await page.evaluate(() => ({
      actors: window.__shipTest.snapshot().actors.length,
      score: window.__shipTest.snapshot().score,
      smoke: window.__shipTest.game.smokes.length,
      grenades: window.__shipTest.game.grenades.length,
      geometries: window.__shipTest.renderer.renderer.info.memory.geometries,
      textures: window.__shipTest.renderer.renderer.info.memory.textures
    })));
  }
  await page.route('**/*', route => new URL(route.request().url()).origin === new URL(base).origin ? route.continue() : route.abort());
  await page.reload({ waitUntil: 'networkidle' });
  await page.locator('#menu-settings').click();
  const refreshedFov = Number(await page.locator('#fov').inputValue());
  await page.locator('#settings-close').click();
  await page.locator('#start-button').click();
  await page.waitForFunction(() => window.__shipTest?.snapshot().phase === 'playing' && document.pointerLockElement?.id === 'game-canvas');
  const offlineReload = await page.evaluate(() => ({ actors: window.__shipTest.snapshot().actors.length, canvasWidth: document.querySelector('#game-canvas').width }));
  await page.screenshot({ path: resolve(evidence, 'offline-reload.png') });
  const report = { base, storedFov, startPlayer: start.actors.find(a => a.id === 0), movedPlayer: moved.actors.find(a => a.id === 0), scoped,
    ammoAfterShot: afterShot.actors.find(a => a.id === 0)?.ammo, ammoAfterBlockedShot: afterBlockedShot.actors.find(a => a.id === 0)?.ammo,
    reload, boardVisible, pauseCycles, pistol, knife, selectedGrenade, smokeInventory, resize, restartCycles, refreshedFov, offlineReload, errors, external };
  await writeFile(resolve(evidence, 'interactions.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (storedFov !== 82 || moved.actors.find(a => a.id === 0).z <= start.actors.find(a => a.id === 0).z + 1 || !scoped.visible || scoped.fov >= 82 || !boardVisible || pauseCycles.some(c => !c.frozen) || pistol !== 'revolver' || knife !== 'knife' || selectedGrenade !== 'smoke' || smokeInventory !== 0 || restartCycles.some(c => c.actors !== 10 || c.score.red || c.score.blue || c.smoke || c.grenades) || Math.max(...restartCycles.map(c => c.geometries)) - Math.min(...restartCycles.map(c => c.geometries)) > 10 || refreshedFov !== 82 || offlineReload.actors !== 10 || errors.length || external.length) process.exitCode = 1;
} finally { await browser.close(); }
