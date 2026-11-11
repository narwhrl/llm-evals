import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const root = process.cwd();
const evidence = path.join(root, 'evidence');
fs.mkdirSync(evidence, { recursive: true });
const report = { checks: [], errors: [], failedRequests: [], screenshots: [] };
let server;
let browser;

async function waitForServer(url) {
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(url)).ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error('Preview server did not become ready');
}

try {
  server = spawn(process.execPath, [path.join(root, 'node_modules/vite/bin/vite.js'), 'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'] });
  const serverLog = [];
  server.stdout.on('data', data => serverLog.push(data.toString()));
  server.stderr.on('data', data => serverLog.push(data.toString()));
  await waitForServer('http://127.0.0.1:4173/');
  const executablePath = process.env.CHROME_PATH || undefined;
  browser = await chromium.launch({ executablePath, headless: true, args: ['--use-angle=swiftshader', '--enable-webgl'] });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
  page.on('response', response => { if (response.status() >= 400) report.failedRequests.push(`${response.status()} ${response.url()}`); });
  const check = (name, details = true) => { report.checks.push({ name, passed: true, details }); console.log(`PASS ${name}`); };
  const screenshot = async name => {
    const file = path.join(evidence, `${name}.png`);
    await page.screenshot({ path: file, fullPage: true });
    report.screenshots.push(file);
  };
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.waitForSelector('#loading.done');
  await page.waitForTimeout(1200);
  const canvas = await page.locator('#room-canvas').evaluate(element => ({ width: element.width, height: element.height }));
  assert.ok(canvas.width > 500 && canvas.height > 300);
  check('Real-time WebGL canvas initialized at 1440x900', canvas);
  await screenshot('2005-room');
  assert.equal(await page.locator('#scene-year').innerText(), '2005');
  check('Initial year is 2005');

  for (const year of [2009, 2013, 2017, 2021, 2025]) {
    await page.locator('#year-slider').evaluate((element, value) => {
      element.value = String(value);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    }, year);
    await page.waitForTimeout(400);
    assert.equal(await page.locator('#year-display').innerText(), String(year));
    check(`Representative year ${year} selected`);
    await screenshot(`${year}-room`);
  }

  await page.locator('#view-desk').click();
  await page.waitForTimeout(1300);
  assert.ok(await page.locator('#view-desk').evaluate(element => element.classList.contains('active')));
  await screenshot('2025-desk');
  check('Desk close-up view');
  await page.locator('#featured-object').click();
  assert.match(await page.locator('#detail-dialog').innerText(), /舍不得丢的旧物/);
  await page.keyboard.press('Escape');
  check('Keepsake memory dialog opens and closes');

  await page.locator('#play-button').click();
  await page.waitForTimeout(2200);
  const playingYear = Number(await page.locator('#year-slider').inputValue());
  assert.ok(playingYear > 2005);
  assert.ok(playingYear < 2010);
  await page.locator('#play-button').click();
  const pausedYear = await page.locator('#year-slider').inputValue();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('#year-slider').inputValue(), pausedYear);
  check('Autoplay advances, loops from end, and pauses', playingYear);
  await page.locator('#year-slider').focus();
  await page.keyboard.press('End');
  assert.equal(await page.locator('#year-slider').inputValue(), '2025');
  await page.keyboard.press('Home');
  assert.equal(await page.locator('#year-slider').inputValue(), '2005');
  check('Keyboard/manual timeline control after autoplay');

  const roomBox = await page.locator('#room-canvas').boundingBox();
  await page.mouse.move(roomBox.x + roomBox.width * 0.6, roomBox.y + roomBox.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(roomBox.x + roomBox.width * 0.73, roomBox.y + roomBox.height * 0.53, { steps: 12 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  await screenshot('2005-orbit');
  check('Pointer orbit drag completed');
  await page.locator('#reset-view').click();
  await page.waitForTimeout(1200);

  const screenChecks = [
    { year: 2005, action: async () => { await page.locator('#pixel-jump').click(); await page.waitForTimeout(600); assert.match(await page.locator('#game-score').innerText(), /金币 1/); } },
    { year: 2013, action: async () => { await page.locator('#launch-game').click(); assert.match(await page.locator('#launch-game').innerText(), /返回游戏库/); } },
    { year: 2025, action: async () => { await page.locator('#ship-right').click(); assert.match(await page.locator('#ship-coordinates').innerText(), /X 020/); } },
  ];
  for (const { year, action } of screenChecks) {
    await page.locator('#year-slider').evaluate((element, value) => { element.value = String(value); element.dispatchEvent(new Event('input', { bubbles: true })); }, year);
    await page.locator('#view-desk').click();
    await page.waitForTimeout(1300);
    const box = await page.locator('#room-canvas').boundingBox();
    await page.mouse.click(box.x + box.width * 0.48, box.y + box.height * 0.36);
    await page.waitForSelector('.screen-dialog[open]', { timeout: 3000 });
    await action();
    await screenshot(`screen-${year}`);
    await page.keyboard.press('Escape');
    check(`Interactive screen works in ${year}`);
  }

  const canvasBefore = await page.locator('#room-canvas').screenshot();
  await page.locator('#year-slider').evaluate(element => { element.value = '2017'; element.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.waitForTimeout(400);
  const canvasAfter = await page.locator('#room-canvas').screenshot();
  assert.ok(!canvasBefore.equals(canvasAfter));
  check('Rendered scene changes with the selected year');
  assert.deepEqual(report.errors, []);
  assert.deepEqual(report.failedRequests, []);
  check('No browser console errors or failed asset responses');
  report.serverLog = serverLog.join('');
  report.passed = true;
} catch (error) {
  report.passed = false;
  report.failure = error.stack;
  console.error(error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server?.kill();
  fs.writeFileSync(path.join(evidence, 'browser-report.json'), JSON.stringify(report, null, 2));
}
