import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence'); await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const errors = [], requests = [], samples = [];
page.on('pageerror', e => errors.push(e.stack || e.message));
page.on('console', e => { if (e.type() === 'error') errors.push(e.text()); });
page.on('request', r => { if (/^https?:/.test(r.url()) && !r.url().startsWith(new URL(base).origin)) requests.push(r.url()); });
try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#duration').selectOption('2');
  await page.locator('#start-button').click();
  await page.waitForFunction(() => window.__shipTest?.snapshot().phase === 'playing');
  await page.evaluate(() => {
    window.__frameTimes = []; let last = 0;
    requestAnimationFrame(function record(now) { if (last) window.__frameTimes.push(now - last); last = now; if (window.__frameTimes.length < 15000) requestAnimationFrame(record); });
  });
  const started = Date.now();
  while (Date.now() - started < 300000) {
    await page.waitForTimeout(10000);
    const sample = await page.evaluate(() => {
      const s = window.__shipTest.snapshot();
      return { phase: s.phase, time: s.now, remaining: s.remaining, score: s.score,
        bots: s.actors.filter(a => a.ai).map(a => ({ id: a.id, x: a.x, z: a.z, kills: a.kills, deaths: a.deaths, lane: a.ai.lane, stuck: a.ai.stuckTime })),
        renderer: { calls: window.__shipTest.renderer.renderer.info.render.calls, geometries: window.__shipTest.renderer.renderer.info.memory.geometries, textures: window.__shipTest.renderer.renderer.info.memory.textures } };
    });
    samples.push(sample);
    console.log(`t=${sample.time.toFixed(1)} score=${sample.score.red}-${sample.score.blue} phase=${sample.phase}`);
    if (sample.phase === 'ended') break;
  }
  const final = await page.evaluate(() => {
    const times = window.__frameTimes || [];
    const sorted = [...times].sort((a, b) => a - b);
    const pick = p => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * p))];
    return { snapshot: window.__shipTest.snapshot(), frameStats: { count: times.length, meanFps: times.length ? 1000 / (times.reduce((a, b) => a + b, 0) / times.length) : null, medianMs: pick(.5), p95Ms: pick(.95), p99Ms: pick(.99) }, heap: performance.memory?.usedJSHeapSize ?? null };
  });
  await page.screenshot({ path: resolve(evidence, 'match-result.png') });
  const report = { base, viewport: '1440x900', browser: await browser.version(), renderer: 'headless Chromium SwiftShader', samples, final, errors, externalRequests: requests };
  await writeFile(resolve(evidence, 'match-run.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ final: final.snapshot.phase, score: final.snapshot.score, frames: final.frameStats, errors: errors.length, external: requests.length }, null, 2));
  if (final.snapshot.phase !== 'ended' || final.snapshot.score.red + final.snapshot.score.blue < 2 || errors.length || requests.length) process.exitCode = 1;
} finally { await browser.close(); }
