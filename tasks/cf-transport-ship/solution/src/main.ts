import './style.css';
import { Game } from './game';
import { GameRenderer } from './render';
import { AudioEngine } from './audio';
import { UI, loadSettings } from './ui';
import { type WeaponId } from './config';

const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
const root = document.querySelector<HTMLElement>('#ui-root')!;
const settings = loadSettings();
let renderer: GameRenderer;
try { renderer = new GameRenderer(canvas, settings.quality); }
catch (error) {
  root.innerHTML = `<div style="position:absolute;inset:0;display:grid;place-items:center;background:#0a2029;color:#f2eee5;font:17px Segoe UI,sans-serif;text-align:center;padding:30px"><div><h1>无法启动 3D 画面</h1><p>请使用已启用 WebGL 的桌面浏览器并更新显卡驱动。</p><pre style="white-space:pre-wrap;font-size:12px;color:#c1d1d4">${String(error).replace(/[<>]/g, '')}</pre><button onclick="location.reload()">重试</button></div></div>`;
  throw error;
}
const game = new Game(710283), ui = new UI(root, settings), audio = new AudioEngine(settings);
renderer.camera.position.set(27, 22, -42); renderer.camera.lookAt(0, 0, 0);
renderer.resize(innerWidth, innerHeight, settings.quality);
const held = new Set<string>(); let pointerRequested = false, scoreboardHeld = false, lastFrame = performance.now(), accumulator = 0, endShown = false;
const testMode = new URLSearchParams(location.search).has('test');

function clearInput() {
  held.clear(); game.input.fire = false; game.input.jump = false; game.input.ads = false;
  game.input.forward = 0; game.input.strafe = 0; game.input.crouch = false; game.input.quiet = false;
  scoreboardHeld = false; ui.setScoreboard(false);
}
function requestLock() {
  pointerRequested = true;
  canvas.requestPointerLock().then(() => { audio.init().then(() => audio.resume()).catch(() => ui.toast('音频无法启动，画面和操作仍可用。')); })
    .catch(() => { pointerRequested = false; game.pause(); ui.showPause(); ui.toast('无法锁定鼠标。请点击页面并允许浏览器的指针锁定。'); });
}
function startMatch() {
  clearInput(); renderer.reset(settings.fov);
  game.start(ui.team, ui.primary, ui.difficulty, ui.practiceMinutes);
  endShown = false; accumulator = 0; ui.resetMatchFeedback(); ui.showGame(); requestLock();
}
ui.onStart = (team, primary, difficulty, minutes) => { ui.team = team; ui.primary = primary; ui.difficulty = difficulty; ui.practiceMinutes = minutes; startMatch(); };
ui.onResume = () => { if (game.phase === 'paused') requestLock(); };
ui.onRestart = () => { if (game.phase === 'playing' || game.phase === 'paused' || game.phase === 'ended') startMatch(); };
ui.onNextPrimary = id => { if (game.actors.length && !game.player.alive) game.setPrimaryForNextSpawn(id); };
ui.onSettings = updated => { audio.setSettings(updated); renderer.setQuality(updated.quality); };

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === canvas) { pointerRequested = false; if (game.phase === 'paused') game.resume(); ui.showGame(); audio.resume(); }
  else if (!pointerRequested && game.phase === 'playing') { clearInput(); game.pause(); ui.showPause(); audio.pause(); }
});
document.addEventListener('pointerlockerror', () => { pointerRequested = false; game.pause(); ui.showPause(); ui.toast('浏览器未授予鼠标锁定权限。'); });
window.addEventListener('blur', () => { clearInput(); if (game.phase === 'playing') { game.pause(); ui.showPause(); if (document.pointerLockElement) document.exitPointerLock(); audio.pause(); } });
document.addEventListener('visibilitychange', () => { if (document.hidden) { clearInput(); if (game.phase === 'playing') { game.pause(); ui.showPause(); if (document.pointerLockElement) document.exitPointerLock(); audio.pause(); } } });
document.addEventListener('contextmenu', e => { if (e.target === canvas) e.preventDefault(); });
window.addEventListener('resize', () => renderer.resize(innerWidth, innerHeight, settings.quality));

document.addEventListener('keydown', e => {
  if (['Space', 'Tab', 'ArrowUp', 'ArrowDown'].includes(e.code) || (document.pointerLockElement === canvas && ['Digit1','Digit2','Digit3','Digit4','KeyQ','KeyG','KeyR'].includes(e.code))) e.preventDefault();
  if (e.code === 'Tab') { scoreboardHeld = true; if (game.actors.length && game.phase === 'playing') ui.setScoreboard(true); return; }
  if (e.code === 'Escape') { clearInput(); if (document.pointerLockElement) document.exitPointerLock(); else if (game.phase === 'playing') { game.pause(); ui.showPause(); } return; }
  if (game.phase !== 'playing') return;
  if (e.repeat && ['KeyQ','KeyG','KeyR','Digit1','Digit2','Digit3','Digit4'].includes(e.code)) return;
  held.add(e.code);
  const p = game.player;
  switch (e.code) {
    case 'Space': game.input.jump = true; break;
    case 'KeyR': game.reload(p); break;
    case 'Digit1': game.switchWeapon(p, p.primary); break;
    case 'Digit2': game.switchWeapon(p, 'revolver'); break;
    case 'Digit3': game.switchWeapon(p, 'knife'); break;
    case 'Digit4': game.cycleGrenade(p); break;
    case 'KeyQ': game.switchWeapon(p, p.previous); break;
    case 'KeyG': {
      const prev = p.selected;
      if (prev !== 'grenade') game.switchWeapon(p, 'grenade');
      game.attack(p);
      if (prev !== 'grenade') game.switchWeapon(p, prev);
      break;
    }
    case 'F1': case 'F2': case 'F3': case 'F4': {
      if (!p.alive) {
        const weapons: WeaponId[] = ['vandal','sentinel','vector','longshot'];
        const choice = weapons[Number(e.code.slice(1)) - 1]; game.setPrimaryForNextSpawn(choice); ui.setNextPrimary(choice);
        ui.toast(`下次出生：${choice === 'vandal' ? 'AR-47' : choice === 'sentinel' ? 'M4' : choice === 'vector' ? 'K9' : 'M90'}`);
      }
      break;
    }
  }
});
document.addEventListener('keyup', e => { held.delete(e.code); if (e.code === 'Tab') { scoreboardHeld = false; ui.setScoreboard(false); } });
canvas.addEventListener('mousemove', e => {
  if (document.pointerLockElement !== canvas || game.phase !== 'playing' || !game.player.alive) return;
  const p = game.player, factor = p.ads ? settings.scopeSensitivity : 1;
  p.yaw -= e.movementX * settings.sensitivity * factor;
  p.pitch = Math.max(-1.43, Math.min(1.43, p.pitch + e.movementY * settings.sensitivity * factor * (settings.invertY ? 1 : -1)));
});
canvas.addEventListener('mousedown', e => {
  if (document.pointerLockElement !== canvas || game.phase !== 'playing' || !game.player.alive) return;
  if (e.button === 0) { game.input.fire = true; game.attack(game.player); }
  if (e.button === 2) { game.input.ads = true; if (game.player.selected === 'knife') game.attack(game.player, true); }
});
document.addEventListener('mouseup', e => { if (e.button === 0) game.input.fire = false; if (e.button === 2) game.input.ads = false; });
canvas.addEventListener('wheel', e => {
  if (document.pointerLockElement !== canvas || game.phase !== 'playing') return;
  e.preventDefault(); const p = game.player;
  const order: (WeaponId | 'grenade')[] = [p.primary, 'revolver', 'knife', 'grenade'];
  const index = order.indexOf(p.selected), next = order[(index + (e.deltaY > 0 ? 1 : 3)) % 4];
  game.switchWeapon(p, next);
}, { passive: false });

function frame(now: number) {
  const elapsed = Math.min(.12, Math.max(0, (now - lastFrame) / 1000)); lastFrame = now;
  if (game.phase === 'playing') {
    game.input.forward = (held.has('KeyW') ? 1 : 0) - (held.has('KeyS') ? 1 : 0);
    game.input.strafe = (held.has('KeyD') ? 1 : 0) - (held.has('KeyA') ? 1 : 0);
    game.input.crouch = held.has('ControlLeft') || held.has('ControlRight') || held.has('KeyC');
    game.input.quiet = held.has('ShiftLeft') || held.has('ShiftRight');
    accumulator += elapsed;
    let steps = 0;
    while (accumulator >= 1 / 60 && steps < 7 && game.phase === 'playing') {
      game.update(1 / 60); accumulator -= 1 / 60; steps++;
      renderer.processEvents(game.events, game); ui.consume(game.events, game); audio.handle(game.events, game); game.events.length = 0;
    }
    if (steps === 7) accumulator = 0;
  } else accumulator = 0;
  renderer.render(game, settings, innerWidth, innerHeight, elapsed);
  if (game.actors.length) ui.update(game, renderer.aimProgress);
  if (game.phase === 'ended' && !endShown) { endShown = true; ui.showEnd(game); clearInput(); if (document.pointerLockElement) document.exitPointerLock(); audio.pause(); }
  if (scoreboardHeld && game.phase !== 'playing') ui.setScoreboard(false);
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

if (testMode) {
  Object.assign(window, { __shipTest: {
    game,
    snapshot: () => game.stateSnapshot(),
    pose: (x: number, y: number, z: number, yaw: number, pitch: number) => { const p = game.player; p.body.x = x; p.body.y = y; p.body.z = z; p.yaw = yaw; p.pitch = pitch; },
    start: (minutes = 10) => { ui.practiceMinutes = minutes; startMatch(); },
    forcePause: () => { game.pause(); ui.showPause(); },
    settings,
    renderer
  } });
}
