import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence'); await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [], external = [];
page.on('pageerror', e => errors.push(e.stack || e.message));
page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
page.on('request', request => { const url = request.url(); if (/^https?:/.test(url) && !url.startsWith(new URL(base).origin)) external.push(url); });
try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#start-button').waitFor();
  await page.screenshot({ path: resolve(evidence, 'menu.png') });
  await page.locator('#start-button').click();
  await page.waitForFunction(() => window.__shipTest?.snapshot().actors.length === 10, null, { timeout: 15000 });
  await page.waitForTimeout(1600);
  const entered = await page.evaluate(() => ({ phase: window.__shipTest.snapshot().phase, locked: document.pointerLockElement?.id === 'game-canvas', actors: window.__shipTest.snapshot().actors.length }));
  await page.screenshot({ path: resolve(evidence, 'spawn-red.png') });
  const before = await page.evaluate(() => window.__shipTest.snapshot());
  await page.keyboard.down('w'); await page.waitForTimeout(800); await page.keyboard.up('w');
  const afterMove = await page.evaluate(() => window.__shipTest.snapshot());
  await page.mouse.click(720, 450); await page.waitForTimeout(220);
  const afterShot = await page.evaluate(() => window.__shipTest.snapshot());
  await page.screenshot({ path: resolve(evidence, 'first-action.png') });
  await page.keyboard.press('Escape'); await page.waitForTimeout(160);
  const paused = await page.evaluate(() => window.__shipTest.snapshot().phase);
  const report = { base, entered, beforePlayer: before.actors.find(a => a.id === 0), afterMovePlayer: afterMove.actors.find(a => a.id === 0), afterShotPlayer: afterShot.actors.find(a => a.id === 0), paused, errors, external };
  await writeFile(resolve(evidence, 'e2e-smoke.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (entered.phase !== 'playing' || entered.actors !== 10 || paused !== 'paused' || errors.length || external.length) process.exitCode = 1;
} finally { await browser.close(); }
