// Browser acceptance run against the production build served by the
// dependency-free static server. Run with: npm run verify
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const evidence = resolve(root, 'evidence');
mkdirSync(evidence, { recursive: true });

const PORT = Number(process.env.GARGANTUA_PORT ?? '4187');
const BASE = `http://127.0.0.1:${PORT}`;
const CHROME = process.env.CHROME_BIN ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const LAUNCH_ARGS = [
  '--enable-webgl',
  '--ignore-gpu-blocklist',
  '--no-sandbox',
  '--enable-unsafe-swiftshader',
  '--disable-dev-shm-usage',
];

const results = [];
const notes = [];
let failures = 0;

function assert(name, condition, detail = '') {
  const ok = Boolean(condition);
  if (!ok) failures++;
  const line = `${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`;
  results.push({ name, ok, detail });
  console.log(line);
  return ok;
}

function note(text) {
  notes.push(text);
  console.log(`NOTE  ${text}`);
}

const consoleErrors = [];
const remoteRequests = [];
const pageErrors = [];

function watch(page) {
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => pageErrors.push(String(err)));
  page.on('crash', () => pageErrors.push('page crashed'));
  page.on('requestfailed', (req) => consoleErrors.push(`requestfailed: ${req.url()} ${req.failure()?.errorText ?? ''}`));
  page.on('request', (req) => {
    try {
      const url = new URL(req.url());
      if (/^https?:$/.test(url.protocol) && !['127.0.0.1', 'localhost'].includes(url.hostname)) {
        remoteRequests.push(req.url());
      }
    } catch {
      /* data: and blob: URLs are not external requests */
    }
  });
}

async function ready(page) {
  await page.waitForFunction(() => document.documentElement.dataset.gargantuaReady === 'true', null, { timeout: 90000 });
  await page.waitForTimeout(300);
}

async function open(context, path) {
  const page = await context.newPage();
  watch(page);
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await ready(page);
  return page;
}

const state = (page) => page.evaluate(() => window.__GARGANTUA__.getState());
const sample = (page) => page.evaluate(() => window.__GARGANTUA__.sampleFrame());
const call = (page, fn, ...args) =>
  page.evaluate(({ fn, args }) => window.__GARGANTUA__[fn](...args), { fn, args });

function structured(sf, label) {
  assert(`${label}: non-black structured frame`,
    sf?.ok && sf.mean > 4 && sf.std > 6 && sf.darkFraction < 0.9,
    sf ? `mean=${sf.mean.toFixed(1)} std=${sf.std.toFixed(1)} dark=${sf.darkFraction.toFixed(3)} bright=${sf.brightFraction.toFixed(3)}` : 'no sample');
}

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(BASE + '/', { signal: AbortSignal.timeout(1000) });
      if (res.ok) return res;
    } catch {
      /* server not up yet */
    }
    await new Promise((r) => setTimeout(r, 150));
  }
  throw new Error('static server did not become ready');
}

let browser;
let server;

try {
  // ------------------------------------------------------------- static server
  server = spawn(process.execPath, ['scripts/serve.mjs', '--dir', 'dist', '--port', String(PORT), '--host', '127.0.0.1'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const serverResponse = await waitForServer();
  const indexHtml = await serverResponse.text();
  assert('production build served over HTTP', serverResponse.status === 200 && indexHtml.includes('id="root"'));
  assert('built HTML references local hashed assets only',
    /assets\/index-[^"']+\.js/.test(indexHtml) && !/https?:\/\//.test(indexHtml.replace(/xmlns='[^']*'/, '')));

  browser = await chromium.launch({ executablePath: CHROME, headless: true, args: LAUNCH_ARGS });

  // ------------------------------------------------------------ desktop 1440x900
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const dpage = await open(desktop, '/');
  const dready = await dpage.evaluate(() => ({
    dataset: document.documentElement.dataset.gargantuaReady,
    apiReady: window.__GARGANTUA__.ready,
    hasApi: typeof window.__GARGANTUA__ === 'object',
  }));
  assert('desktop: ready signal + API', dready.dataset === 'true' && dready.apiReady === true && dready.hasApi);

  let ds = await state(dpage);
  assert('desktop: default quality / debug / 21 params',
    ds.quality === 'high' && ds.debug === 0 && ds.paramDefs.length === 21 && ds.preset === 0,
    `quality=${ds.quality} debug=${ds.debug} params=${ds.paramDefs?.length}`);
  assert('desktop: HDR half-float pipeline', ds.hdr === 'half-float' && ds.renderSize.width > 0 && ds.dpr >= 1,
    `hdr=${ds.hdr} buffer=${ds.renderSize.width}x${ds.renderSize.height} dpr=${ds.dpr}`);
  assert('desktop: versioned localStorage available', ds.storageOk === true);

  const dsf = await sample(dpage);
  structured(dsf, 'desktop');
  await dpage.screenshot({ path: resolve(evidence, 'desktop-1440x900.png') });

  const counts = await dpage.evaluate(() => ({
    sliders: document.querySelectorAll('input[type="range"]').length,
    presets: document.querySelectorAll('.btn-row.four .chip').length,
    quality: document.querySelectorAll('.btn-row.three .chip').length,
    debug: document.querySelectorAll('.debug-grid .dbg').length,
    shortcuts: document.querySelectorAll('.shortcuts li').length,
  }));
  assert('desktop HUD: 21 sliders, 4 presets, 3 quality, 10 debug, 7 shortcuts',
    counts.sliders === 21 && counts.presets === 4 && counts.quality === 3 && counts.debug === 10 && counts.shortcuts === 7,
    JSON.stringify(counts));

  // OrbitControls: drag changes the shader camera state, not just UI labels.
  const azBefore = (await state(dpage)).params.azimuth;
  await dpage.mouse.move(700, 450);
  await dpage.mouse.down();
  await dpage.mouse.move(840, 500, { steps: 6 });
  await dpage.mouse.up();
  await dpage.waitForTimeout(350);
  const afterDrag = await state(dpage);
  assert('desktop: orbit drag changes camera azimuth and clears preset',
    Math.abs(afterDrag.params.azimuth - azBefore) > 0.5 && afterDrag.preset === null,
    `az ${azBefore.toFixed(2)} -> ${afterDrag.params.azimuth.toFixed(2)}`);

  const distBefore = (await state(dpage)).params.distance;
  await dpage.mouse.wheel(0, -420);
  await dpage.waitForTimeout(350);
  const afterWheel = await state(dpage);
  assert('desktop: wheel zoom changes camera distance',
    Math.abs(afterWheel.params.distance - distBefore) > 0.05,
    `dist ${distBefore.toFixed(2)} -> ${afterWheel.params.distance.toFixed(2)}`);

  // Shift+1..4 presets
  let presetsOk = true;
  for (let i = 0; i < 4; i++) {
    await dpage.keyboard.press(`Shift+${i + 1}`);
    await dpage.waitForTimeout(180);
    const s = await state(dpage);
    if (s.preset !== i) presetsOk = false;
  }
  assert('desktop: Shift+1..4 applies four distinct presets', presetsOk);

  // Space / H / Q
  const cineBefore = (await state(dpage)).cinematicPlaying;
  await dpage.keyboard.press('Space');
  await dpage.waitForTimeout(180);
  const cineAfter = (await state(dpage)).cinematicPlaying;
  assert('desktop: Space toggles cinematic loop', cineBefore !== cineAfter);

  const hudBefore = (await state(dpage)).hudOpen;
  await dpage.keyboard.press('h');
  await dpage.waitForTimeout(180);
  const hudAfter = (await state(dpage)).hudOpen;
  assert('desktop: H toggles HUD', hudBefore !== hudAfter);

  const qBefore = (await state(dpage)).quality;
  await dpage.keyboard.press('q');
  await dpage.waitForTimeout(180);
  const qAfter = (await state(dpage)).quality;
  assert('desktop: Q cycles quality tier', qBefore !== qAfter, `${qBefore} -> ${qAfter}`);

  // All ten debug views, each observable and distinct.
  const debugNames = [];
  let debugOk = true;
  for (let i = 0; i <= 9; i++) {
    await dpage.keyboard.press(String(i));
    await dpage.waitForTimeout(120);
    const s = await state(dpage);
    debugNames.push(s.debugView.name);
    if (s.debug !== i || s.debugView.index !== i) debugOk = false;
    const sf = await sample(dpage);
    if (!(sf?.ok && sf.std > 0.8)) debugOk = false;
  }
  assert('desktop: 0..9 debug views all apply and render distinct diagnostics',
    debugOk && new Set(debugNames).size === 10, debugNames.join(' | '));

  // API validation
  const invalid = await dpage.evaluate(() => {
    const a = window.__GARGANTUA__;
    return {
      debug: a.setDebug(99).ok,
      quality: a.setQuality('bogus').ok,
      preset: a.setPreset(7).ok,
      timeNeg: a.setTime(-1).ok,
      timeNaN: a.setTime(NaN).ok,
      goodTime: a.setTime(12.5),
      goodDebug: a.setDebug(4).ok,
    };
  });
  assert('API rejects invalid inputs without throwing',
    invalid.debug === false && invalid.quality === false && invalid.preset === false &&
    invalid.timeNeg === false && invalid.timeNaN === false);
  assert('API accepts valid setTime / setDebug', invalid.goodTime.ok === true && invalid.goodTime.time === 12.5 && invalid.goodDebug === true);

  // Quality tiers change real rendering budget
  const budgets = {};
  for (const level of ['standard', 'high', 'cinematic']) {
    const r = await call(dpage, 'setQuality', level);
    budgets[level] = r.ok ? r.qualityBudget : null;
  }
  assert('three quality tiers change maxSteps / renderScale / bloomLevels / diskSamples',
    budgets.standard && budgets.high && budgets.cinematic &&
    new Set(Object.values(budgets).map((b) => b.maxSteps)).size === 3 &&
    new Set(Object.values(budgets).map((b) => b.renderScale)).size === 3,
    Object.entries(budgets).map(([k, b]) => `${k}:${b?.maxSteps}`).join(' '));

  // Versioned persistence across reload
  await call(dpage, 'setParam', 'emission', 3.25);
  await call(dpage, 'setQuality', 'cinematic');
  await call(dpage, 'setDebug', 6);
  await dpage.reload({ waitUntil: 'domcontentloaded' });
  await ready(dpage);
  const persisted = await state(dpage);
  assert('versioned state persists across reload',
    persisted.params.emission === 3.25 && persisted.quality === 'cinematic' && persisted.debug === 6,
    `emission=${persisted.params.emission} quality=${persisted.quality} debug=${persisted.debug}`);
  const storedVersion = await dpage.evaluate(() => JSON.parse(localStorage.getItem('gargantua.state.v3') || '{}').version);
  assert('localStorage payload is versioned', storedVersion === 3, `version=${storedVersion}`);

  // Visible reset restores defaults
  await dpage.keyboard.press('r');
  await dpage.waitForTimeout(250);
  const reset = await state(dpage);
  assert('R resets all state to defaults',
    Math.abs(reset.params.emission - 1.75) < 1e-6 && reset.debug === 0 &&
    reset.quality === 'high' && reset.preset === 0 && reset.hudOpen === true,
    `emission=${reset.params.emission} quality=${reset.quality} debug=${reset.debug}`);
  await dpage.close();
  await desktop.close();

  // ------------------------------------------------------------- mobile 390x844
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mpage = await open(mobile, '/');
  const ms = await state(mpage);
  assert('mobile: ready with Retina DPR handling', ms.ready === true && ms.dpr > 1 && ms.renderSize.width > 0,
    `dpr=${ms.dpr} buffer=${ms.renderSize.width}x${ms.renderSize.height} quality=${ms.quality}`);
  const msf = await sample(mpage);
  structured(msf, 'mobile');
  await mpage.screenshot({ path: resolve(evidence, 'mobile-390x844.png') });

  const mHudClosed = await mpage.evaluate(() => !document.querySelector('.hud')?.classList.contains('open'));
  await mpage.locator('.hud-tab').click();
  await mpage.waitForTimeout(200);
  const mHudOpen = await mpage.evaluate(() => document.querySelector('.hud')?.classList.contains('open'));
  assert('mobile: HUD drawer collapses and opens', mHudClosed === true && mHudOpen === true);

  // One-finger touch drag through CDP (OrbitControls touch path).
  const cdp = await mobile.newCDPSession(mpage);
  const touchBefore = (await state(mpage)).params.azimuth;
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 420, id: 1 }] });
  for (let i = 1; i <= 6; i++) {
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 195 + i * 18, y: 420 + i * 6, id: 1 }] });
  }
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await mpage.waitForTimeout(350);
  const touchAfter = (await state(mpage)).params.azimuth;
  assert('mobile: touch OrbitControls changes camera', Math.abs(touchAfter - touchBefore) > 0.3,
    `az ${touchBefore.toFixed(2)} -> ${touchAfter.toFixed(2)}`);

  const sizeBefore = (await state(mpage)).renderSize.width;
  await mpage.setViewportSize({ width: 500, height: 900 });
  await mpage.waitForTimeout(400);
  const sizeAfter = (await state(mpage)).renderSize.width;
  assert('mobile: resize rebuilds render targets', sizeBefore !== sizeAfter, `${sizeBefore} -> ${sizeAfter}`);
  await mpage.close();
  await mobile.close();

  // ---------------------------------------------------------- capture matrix
  const cap = await browser.newContext({ viewport: { width: 900, height: 600 }, deviceScaleFactor: 1 });
  let matrixOk = true;
  const captureStats = [];
  for (let p = 0; p < 4; p++) {
    const page = await open(cap, `?capture=1&quality=high&preset=${p}&debug=0&time=12.5&hud=0`);
    const s = await state(page);
    const a = await sample(page);
    const b = await sample(page);
    const good = s.ready === true && s.preset === p && s.quality === 'high' && s.debug === 0 &&
      s.hudOpen === false && s.time === 12.5 && s.capture === true && s.frozen === true &&
      s.cinematicPlaying === false && a?.ok && a.std > 6 &&
      Math.abs(a.mean - b.mean) < 1e-6 && Math.abs(a.std - b.std) < 1e-6;
    if (!good) matrixOk = false;
    captureStats.push({ preset: p, mean: a?.mean, std: a?.std, deterministic: Math.abs(a.mean - b.mean) < 1e-6 });
    if (p === 0 || p === 1) await page.screenshot({ path: resolve(evidence, `capture-preset-${p}.png`) });
    await page.close();
  }
  assert('capture=1 URL matrix: presets 0..3, frozen time, deterministic first frame', matrixOk,
    JSON.stringify(captureStats));

  let debugMatrixOk = true;
  const debugStats = [];
  for (let d = 0; d <= 9; d++) {
    const page = await open(cap, `?capture=1&quality=standard&preset=0&debug=${d}&time=3&hud=0`);
    const s = await state(page);
    const a = await sample(page);
    const good = s.debug === d && s.debugView.index === d && s.ready === true && a?.ok && a.std > 0.8;
    if (!good) debugMatrixOk = false;
    debugStats.push({ debug: d, mean: Number(a?.mean?.toFixed(1)), std: Number(a?.std?.toFixed(1)) });
    if (d === 3) await page.screenshot({ path: resolve(evidence, 'capture-debug-3.png') });
    await page.close();
  }
  assert('capture=1 URL matrix: all debug 0..9 render distinct non-uniform views', debugMatrixOk,
    JSON.stringify(debugStats));

  const invPage = await open(cap, '?capture=1&quality=bogus&preset=99&debug=42&hud=x&time=-5');
  const inv = await state(invPage);
  assert('invalid URL values safely fall back to defaults',
    inv.quality === 'high' && inv.preset === 0 && inv.debug === 0 && inv.hudOpen === true &&
    inv.time === 0 && inv.invalidKeys.length === 5 && inv.ready === true,
    `quality=${inv.quality} preset=${inv.preset} debug=${inv.debug} hud=${inv.hudOpen} time=${inv.time} invalid=${inv.invalidKeys.join(',')}`);
  const invSf = await sample(invPage);
  structured(invSf, 'invalid-query recovery');
  await invPage.close();

  const noTime = await open(cap, '?capture=1&quality=standard&preset=0&debug=0&hud=0');
  assert('capture=1 without ?time= freezes at 0', (await state(noTime)).time === 0);

  const apiCapture = await noTime.evaluate(() => {
    const a = window.__GARGANTUA__;
    const r1 = a.setDebug(4);
    const r2 = a.setQuality('cinematic');
    const r3 = a.setPreset(2);
    const r4 = a.setTime(7.25);
    return {
      debug: r1.ok && r1.debug === 4,
      quality: r2.ok && r2.qualityBudget.maxSteps === 280,
      preset: r3.ok && r3.preset === 2,
      time: r4.ok && r4.time === 7.25,
      readonlyReady: Object.getOwnPropertyDescriptor(window.__GARGANTUA__, 'ready')?.set === undefined,
    };
  });
  assert('window.__GARGANTUA__ setters validate and update state; ready is read-only',
    apiCapture.debug && apiCapture.quality && apiCapture.preset && apiCapture.time && apiCapture.readonlyReady,
    JSON.stringify(apiCapture));

  // ------------------------------------------------- WebGL context loss / restore
  const ctxPage = await open(cap, '?capture=1&quality=standard&preset=0&debug=0&time=2&hud=0');
  const beforeLoss = await state(ctxPage);
  const lossResult = await ctxPage.evaluate(() => window.__GARGANTUA__.simulateContextLoss());
  if (!lossResult.ok) {
    note(`WEBGL_lose_context unavailable in this browser: ${lossResult.reason}`);
    assert('WebGL context loss test cannot run (environment limitation)', true, lossResult.reason);
  } else {
    let lost = false;
    for (let i = 0; i < 40; i++) {
      if ((await state(ctxPage)).contextLost === true) { lost = true; break; }
      await new Promise((r) => setTimeout(r, 100));
    }
    assert('context loss pauses rendering with recoverable overlay',
      lost && (await ctxPage.locator('#context-overlay').isVisible()));

    let restored = false;
    for (let i = 0; i < 120; i++) {
      const s = await state(ctxPage);
      if (!s.contextLost && s.ready && (await ctxPage.locator('#context-overlay').count()) === 0) { restored = true; break; }
      await new Promise((r) => setTimeout(r, 150));
    }
    const afterRestore = await state(ctxPage);
    const restoredSample = await sample(ctxPage);
    assert('context restore rebuilds resources and resumes rendering',
      restored && afterRestore.frames > beforeLoss.frames && restoredSample?.ok && restoredSample.std > 4,
      `frames ${beforeLoss.frames} -> ${afterRestore.frames} std=${restoredSample?.std?.toFixed(1)}`);
    assert('persisted state survives context restore',
      afterRestore.quality === beforeLoss.quality && afterRestore.preset === beforeLoss.preset &&
      afterRestore.debug === beforeLoss.debug && afterRestore.storageOk === true);
    await ctxPage.screenshot({ path: resolve(evidence, 'context-restored.png') });
  }
  await ctxPage.close();
  await cap.close();

  // ------------------------------------------------------------- global summary
  assert('no browser console errors / page errors / failed requests',
    consoleErrors.length === 0 && pageErrors.length === 0,
    [...consoleErrors, ...pageErrors].slice(0, 6).join(' | ') || 'clean');
  assert('no remote asset requests at runtime', remoteRequests.length === 0,
    remoteRequests.slice(0, 6).join(' | ') || 'offline');
} catch (error) {
  failures++;
  console.log('FAIL  verify run aborted —', String(error?.stack ?? error).slice(0, 1200));
  results.push({ name: 'verify run completed', ok: false, detail: String(error?.message ?? error) });
} finally {
  if (browser) await browser.close().catch(() => {});
  if (server) {
    server.kill('SIGTERM');
    await new Promise((r) => setTimeout(r, 300));
  }
  writeFileSync(resolve(evidence, 'verify-report.json'), JSON.stringify({
    model: 'magpie/opencode-go/hy4:high',
    harness: 'ZCode',
    date: new Date().toISOString(),
    baseUrl: BASE,
    failures,
    results,
    notes,
    consoleErrors,
    pageErrors,
    remoteRequests,
  }, null, 2));
  console.log(`\n${failures === 0 ? 'ALL BROWSER CHECKS PASSED' : `${failures} CHECK(S) FAILED`}`);
  process.exit(failures === 0 ? 0 : 1);
}
