import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = process.env.TEST_URL || 'http://127.0.0.1:5173/';
const evidence = resolve('evidence');
await mkdir(evidence, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const aimState = () => page.evaluate(() => {
  const scope = document.querySelector('#scope');
  return { visible: !scope.classList.contains('hidden'), opacity: Number(getComputedStyle(scope).opacity),
    fov: window.__shipTest.renderer.camera.fov, weaponVisible: window.__shipTest.renderer.viewModels.get('longshot').root.visible };
});

try {
  await page.goto(new URL('?test=1', base).href, { waitUntil: 'networkidle' });
  await page.locator('#start-button').click();
  await page.waitForFunction(() => document.pointerLockElement?.id === 'game-canvas' && window.__shipTest?.game.phase === 'playing');
  await page.evaluate(() => {
    const game = window.__shipTest.game;
    for (const actor of game.actors) if (!actor.player) actor.ai = undefined;
    window.__shipTest.pose(0, 0, -33.2, 0, 0);
  });
  await page.waitForFunction(() => window.__shipTest.game.now > .5);
  const beforeD = await page.evaluate(() => window.__shipTest.game.now);
  await page.keyboard.down('d');
  await page.waitForFunction(before => window.__shipTest.game.now > before + .35, beforeD);
  await page.keyboard.up('d');
  const rightX = await page.evaluate(() => window.__shipTest.game.player.body.x);
  await page.waitForFunction(() => window.__shipTest.game.input.strafe === 0);
  await page.evaluate(() => window.__shipTest.pose(0, 0, -33.2, 0, 0));
  const beforeA = await page.evaluate(() => window.__shipTest.game.now);
  await page.keyboard.down('a');
  await page.waitForFunction(before => window.__shipTest.game.now > before + .35, beforeA);
  await page.keyboard.up('a');
  const leftX = await page.evaluate(() => window.__shipTest.game.player.body.x);

  await page.evaluate(() => {
    window.__shipTest.pose(-5.8, 0, -31.5, 0, 0);
    window.__shipTest.game.switchWeapon(window.__shipTest.game.player, 'longshot');
  });
  await page.mouse.down({ button: 'right' });
  await page.waitForFunction(() => window.__shipTest.game.player.ads);
  const aimEarly = await aimState();
  await page.waitForFunction(() => window.__shipTest.renderer.camera.fov < 30 && Number(getComputedStyle(document.querySelector('#scope')).opacity) > .95 && !window.__shipTest.renderer.viewModels.get('longshot').root.visible);
  const aimFull = await aimState();
  await page.screenshot({ path: resolve(evidence, 'scope-aimed.png') });
  await page.mouse.up({ button: 'right' });
  await page.waitForFunction(() => !window.__shipTest.game.player.ads);
  const aimRelease = await aimState();
  await page.screenshot({ path: resolve(evidence, 'scope-closing.png') });
  await page.waitForTimeout(650);
  const aimReleased = await aimState();
  await page.evaluate(() => window.__shipTest.game.switchWeapon(window.__shipTest.game.player, 'vandal'));

  const hit = await page.evaluate(() => {
    const game = window.__shipTest.game, player = game.player, target = game.actors.find(actor => actor.team !== game.playerTeam);
    window.__shipTest.pose(-5.8, 0, -33.2, 0, 0);
    player.yaw = 0; player.pitch = 0; player.moving = 0; player.gear.vandal.nextFire = 0;
    target.body.x = player.body.x; target.body.y = player.body.y; target.body.z = player.body.z + 2;
    target.protectedUntil = 0;
    const shot = game.attack(player);
    return { damage: shot?.damage, target: shot?.target?.id, block: shot?.block, selected: player.selected };
  });
  if (!(hit.damage > 0)) throw new Error(`Hit setup failed: ${JSON.stringify(hit)}`);
  await page.waitForFunction(() => !document.querySelector('#hit-marker').classList.contains('hidden'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.__shipTest.game.phase === 'paused');
  await page.waitForTimeout(850);
  const hitAfterPause = await page.evaluate(() => ({ visible: !document.querySelector('#hit-marker').classList.contains('hidden'), gameNow: window.__shipTest.game.now }));
  await page.locator('#resume-button').click();
  await page.waitForFunction(() => document.pointerLockElement?.id === 'game-canvas' && window.__shipTest.game.phase === 'playing');

  const kill = await page.evaluate(() => {
    const game = window.__shipTest.game, player = game.player, target = game.actors.find(actor => actor.team !== game.playerTeam && actor.alive);
    target.health = 1; target.armor = 0;
    player.yaw = 0; player.pitch = 0; player.gear.vandal.nextFire = 0;
    const shot = game.attack(player);
    return { damage: shot?.damage, target: shot?.target?.id };
  });
  await page.waitForFunction(() => !document.querySelector('#kill-marker').classList.contains('hidden'));
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => window.__shipTest.game.phase === 'paused');
  await page.locator('#restart-button').click();
  await page.waitForFunction(() => document.pointerLockElement?.id === 'game-canvas' && window.__shipTest.game.phase === 'playing' && window.__shipTest.game.now < 1);
  const killAfterRestart = await page.evaluate(() => ({ visible: !document.querySelector('#kill-marker').classList.contains('hidden'), score: window.__shipTest.game.score[window.__shipTest.game.playerTeam] }));
  const report = { rightX, leftX, aimEarly, aimFull, aimRelease, aimReleased, hit, hitAfterPause, kill, killAfterRestart, errors };
  await writeFile(resolve(evidence, 'controls-feedback-e2e.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  if (!(rightX < -.2 && leftX > .2 && aimEarly.visible && aimEarly.opacity < .95 && aimEarly.weaponVisible && aimFull.opacity > .95 && aimFull.fov < 30 && aimRelease.visible && aimRelease.opacity > 0 && aimRelease.opacity < 1 && !aimReleased.visible && hit.damage > 0 && !hitAfterPause.visible && kill.damage > 0 && !killAfterRestart.visible && killAfterRestart.score === 0 && errors.length === 0)) process.exitCode = 1;
} finally { await browser.close(); }
