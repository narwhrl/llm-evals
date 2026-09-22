import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright-core';

const url = process.env.SCENE_URL || 'http://localhost:5173/';
const screenshotDir = process.env.SCREENSHOT_DIR;
const errors = [];

async function capture(page, name) {
  const png = await page.screenshot();
  if (screenshotDir) {
    await mkdir(screenshotDir, { recursive: true });
    await writeFile(join(screenshotDir, `${name}.png`), png);
  }
  return png.toString('base64');
}

async function pixels(page, first, second = null) {
  return page.evaluate(async ([a, b]) => {
    async function read(base64) {
      const img = new Image();
      img.src = `data:image/png;base64,${base64}`;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, img.width, img.height).data;
    }
    const one = await read(a);
    const two = b ? await read(b) : null;
    let colored = 0;
    let changed = 0;
    for (let i = 0; i < one.length; i += 16) {
      if (Math.abs(one[i] - 10) + Math.abs(one[i + 1] - 16) + Math.abs(one[i + 2] - 21) > 40) colored++;
      if (two && Math.abs(one[i] - two[i]) + Math.abs(one[i + 1] - two[i + 1]) + Math.abs(one[i + 2] - two[i + 2]) > 65) changed++;
    }
    const sampled = one.length / 16;
    return { colored: colored / sampled, changed: changed / sampled };
  }, [first, second]);
}

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader'],
});

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  desktop.on('pageerror', error => errors.push(error.message));
  desktop.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await desktop.goto(url);
  await desktop.waitForTimeout(1800);
  assert.equal(await desktop.locator('canvas').count(), 1);
  assert.equal(await desktop.locator('body').innerText(), '');
  const initial = await capture(desktop, 'desktop-initial');
  const initialPixels = await pixels(desktop, initial);
  assert.ok(initialPixels.colored > .15, 'desktop canvas is blank or too small');

  await desktop.mouse.move(700, 480);
  await desktop.mouse.down();
  await desktop.mouse.move(1000, 570, { steps: 20 });
  await desktop.mouse.up();
  await desktop.waitForTimeout(600);
  const turned = await capture(desktop, 'desktop-orbit');
  const orbitPixels = await pixels(desktop, initial, turned);
  assert.ok(orbitPixels.changed > .08, 'drag did not visibly orbit the scene');

  await desktop.mouse.wheel(0, -535);
  await desktop.waitForTimeout(650);
  const zoomed = await capture(desktop, 'desktop-zoom');
  const zoomPixels = await pixels(desktop, turned, zoomed);
  assert.ok(zoomPixels.changed > .08, 'wheel did not visibly zoom the scene');
  await desktop.close();

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  mobile.on('pageerror', error => errors.push(error.message));
  mobile.on('response', response => {
    if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
  });
  await mobile.goto(url, { waitUntil: 'domcontentloaded' });
  await mobile.waitForTimeout(1400);
  const mobileShot = await capture(mobile, 'mobile-initial');
  const mobilePixels = await pixels(mobile, mobileShot);
  assert.ok(mobilePixels.colored > .08, 'mobile canvas is blank or clipped');
  assert.deepEqual(errors, []);
  console.log(JSON.stringify({ desktopColored: initialPixels.colored, mobileColored: mobilePixels.colored, orbitChanged: orbitPixels.changed, zoomChanged: zoomPixels.changed, errors }));
} finally {
  await browser.close();
}
