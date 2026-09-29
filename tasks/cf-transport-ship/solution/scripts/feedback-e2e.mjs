import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence');
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#start-button').click();
  await page.waitForFunction(() => document.pointerLockElement?.id === 'game-canvas' && window.__shipTest?.snapshot().phase === 'playing');
  await page.evaluate(() => {
    const game = window.__shipTest.game;
    game.player.yaw = 0; game.player.pitch = 0;
    for (const actor of game.actors) if (!actor.player) actor.ai = undefined;
    window.__mouseMoves = [];
    document.querySelector('#game-canvas').addEventListener('mousemove', event => window.__mouseMoves.push([event.movementX, event.movementY]));
  });
  await page.mouse.move(720, 450);
  await page.evaluate(() => { window.__shipTest.game.player.yaw = 0; window.__shipTest.game.player.pitch = 0; window.__mouseMoves.length = 0; });
  await page.mouse.move(820, 450);
  const horizontal = await page.evaluate(() => ({ yaw: window.__shipTest.game.player.yaw, moves: window.__mouseMoves.slice() }));
  await page.mouse.move(820, 550);
  const vertical = await page.evaluate(() => ({ pitch: window.__shipTest.game.player.pitch, moves: window.__mouseMoves.slice() }));

  const firstShot = await page.evaluate(() => {
    const game = window.__shipTest.game, target = game.actors.find(actor => actor.team !== game.playerTeam);
    const player = game.player;
    player.yaw = 0; player.pitch = 0; player.moving = 0;
    target.body.x = player.body.x; target.body.y = player.body.y; target.body.z = player.body.z + 2;
    target.protectedUntil = 0;
    const shot = game.attack(player);
    return { at: game.now, damage: shot?.damage, target: shot?.target?.id };
  });
  await page.waitForFunction(() => !document.querySelector('#hit-marker').classList.contains('hidden'));
  const hit = await page.evaluate(() => ({ visible: !document.querySelector('#hit-marker').classList.contains('hidden'), detail: document.querySelector('#hit-detail')?.textContent }));
  await page.screenshot({ path: resolve(evidence, 'feedback-hit.png') });
  await page.waitForTimeout(700);
  const hitExpired = await page.evaluate(() => document.querySelector('#hit-marker').classList.contains('hidden'));

  const finalShot = await page.evaluate(() => {
    const game = window.__shipTest.game, target = game.actors.find(actor => actor.team !== game.playerTeam && actor.alive);
    target.health = 1; target.armor = 0;
    game.player.yaw = 0; game.player.pitch = 0; game.player.gear.vandal.nextFire = 0;
    const shot = game.attack(game.player);
    return { at: game.now, damage: shot?.damage, target: shot?.target?.id };
  });
  await page.waitForFunction(() => !document.querySelector('#kill-marker').classList.contains('hidden'));
  const kill = await page.evaluate(() => ({ visible: !document.querySelector('#kill-marker').classList.contains('hidden'), text: document.querySelector('#kill-marker').textContent, score: window.__shipTest.game.score[window.__shipTest.game.playerTeam] }));
  await page.screenshot({ path: resolve(evidence, 'feedback-kill.png') });
  await page.waitForTimeout(2400);
  const killExpired = await page.evaluate(() => document.querySelector('#kill-marker').classList.contains('hidden'));
  const report = { horizontal, vertical, firstShot, finalShot, hit, hitExpired, kill, killExpired, errors };
  await writeFile(resolve(evidence, 'feedback-e2e.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!(horizontal.moves.some(([x]) => x > 0) && horizontal.yaw < 0 && vertical.pitch < 0 && firstShot.damage > 0 && finalShot.damage > 0 && hit.visible && hit.detail && hitExpired && kill.visible && killExpired && kill.score === 1 && errors.length === 0)) process.exitCode = 1;
} finally { await browser.close(); }
