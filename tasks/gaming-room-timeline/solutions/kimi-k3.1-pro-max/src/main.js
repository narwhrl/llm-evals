import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Room } from './room.js';
import { ERAS, OBJECTS, eraForYear } from './data.js';
import { screenMarkup, bindScreen } from './screens.js';

const $ = selector => document.querySelector(selector);
const slider = $('#year-slider');
const playButton = $('#play-button');
const detailDialog = $('#detail-dialog');
const infoDialog = $('#info-dialog');
let year = 2005;
let playing = false;
let lastTime = 0;
let cameraTransition = null;
let hovered = null;
let screenDialog = null;
let currentView = 'room';
let lastEraIndex = -1;

const room = new Room($('#room-canvas'), openObject);
const controls = new OrbitControls(room.camera, room.canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.065;
controls.minDistance = 3.2;
controls.maxDistance = 24;
controls.maxPolarAngle = Math.PI / 2.05;
controls.minPolarAngle = 0.2;
controls.panSpeed = 0.6;
controls.rotateSpeed = 0.65;
controls.zoomSpeed = 0.8;
controls.target.set(0, 1.15, -0.45);
room.camera.position.set(10.6, 8.4, 11.4);
controls.update();

function resize() {
  const container = $('#scene-container');
  room.resize(container.clientWidth, container.clientHeight);
}
new ResizeObserver(resize).observe($('#scene-container'));
resize();

function setPlaying(value) {
  playing = value;
  playButton.classList.toggle('playing', value);
  playButton.setAttribute('aria-pressed', String(value));
  playButton.setAttribute('aria-label', value ? '暂停自动播放' : '自动播放时间');
  $('#play-status').textContent = value ? '时间流动中 · 点击暂停' : '自由探索';
  lastTime = performance.now();
}

function updateEraPanel() {
  const era = eraForYear(year);
  const index = ERAS.indexOf(era);
  if (index === lastEraIndex) return;
  lastEraIndex = index;
  $('#era-label').textContent = era.label;
  $('#year-display').textContent = era.year;
  $('#era-title').textContent = era.title;
  $('#era-description').textContent = era.description;
  $('#era-tags').replaceChildren(...era.tags.map(tag => {
    const span = document.createElement('span'); span.textContent = tag; return span;
  }));
  $('#room-caption').textContent = era.caption;
  $('#featured-name').textContent = era.featured;
  $('#featured-icon').textContent = era.icon;
  $('#featured-object').dataset.object = era.featuredId;
  $('#note-index').textContent = `${String(index + 1).padStart(2, '0')} / 06`;
  document.querySelectorAll('[data-year]').forEach(button => button.classList.toggle('current', Number(button.dataset.year) === era.year));
}

function setYear(value) {
  year = Math.max(2005, Math.min(2025, Number(value)));
  slider.value = year;
  slider.style.setProperty('--progress', `${(year - 2005) / 20 * 100}%`);
  slider.setAttribute('aria-valuetext', `${Math.floor(year)} 年，${eraForYear(year).label}`);
  $('#scene-year').textContent = Math.floor(year);
  room.setYear(year);
  updateEraPanel();
  if (hovered) hideHint();
}

slider.addEventListener('input', event => { setPlaying(false); setYear(event.target.value); });
document.querySelectorAll('[data-year]').forEach(button => button.addEventListener('click', () => { setPlaying(false); setYear(button.dataset.year); }));
playButton.addEventListener('click', () => {
  if (!playing && year >= 2025) setYear(2005);
  setPlaying(!playing);
});

function moveCamera(view) {
  currentView = view;
  $('#view-room').classList.toggle('active', view === 'room');
  $('#view-desk').classList.toggle('active', view === 'desk');
  cameraTransition = {
    start: performance.now(),
    fromPosition: room.camera.position.clone(),
    fromTarget: controls.target.clone(),
    toPosition: view === 'desk' ? new THREE.Vector3(3.35, 3.65, 2.5) : new THREE.Vector3(10.6, 8.4, 11.4),
    toTarget: view === 'desk' ? new THREE.Vector3(0.6, 1.95, -2.0) : new THREE.Vector3(0, 1.15, -0.45),
  };
}
$('#view-room').addEventListener('click', () => moveCamera('room'));
$('#view-desk').addEventListener('click', () => moveCamera('desk'));
$('#reset-view').addEventListener('click', () => moveCamera('room'));
controls.addEventListener('start', () => { cameraTransition = null; hideHint(); });

function showInfo() { infoDialog.showModal(); }
$('#about-button').addEventListener('click', showInfo);
$('#help-button').addEventListener('click', showInfo);
document.querySelectorAll('.dialog-close').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
for (const dialog of [detailDialog, infoDialog]) {
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
}

function openObject(id) {
  setPlaying(false);
  if (id === 'monitor') { openScreen(); return; }
  const object = OBJECTS[id] || OBJECTS.keepsakes;
  const era = eraForYear(year);
  $('#detail-content').innerHTML = `<div class="detail-visual"><span class="detail-symbol">${object.symbol}</span><span class="detail-year">${era.year} / OBJECT ARCHIVE</span></div><div class="detail-body"><span class="detail-kicker">ROOM MEMORY · ${era.label}</span><h2>${object.name}</h2><p>${object.note}</p><div class="detail-quote">${object.memory}</div></div>`;
  detailDialog.showModal();
}
$('#featured-object').addEventListener('click', event => openObject(event.currentTarget.dataset.object));

function openScreen() {
  if (screenDialog) screenDialog.close();
  const era = eraForYear(year);
  screenDialog = document.createElement('dialog');
  screenDialog.className = 'screen-dialog';
  screenDialog.innerHTML = `<button class="dialog-close" aria-label="关闭电脑屏幕">×</button><div class="screen-window-bar"><span>PLAYER'S COMPUTER / ${era.year}</span><span>${era.game}</span></div><div class="screen-content">${screenMarkup(year)}</div><div class="screen-footer"><span>本地互动演示 · 非完整游戏</span><button id="screen-memory">关于这台电脑 ↗</button></div>`;
  document.body.append(screenDialog);
  screenDialog.querySelector('.dialog-close').addEventListener('click', () => screenDialog.close());
  screenDialog.querySelector('#screen-memory').addEventListener('click', () => {
    screenDialog.close();
    const object = OBJECTS.computer;
    $('#detail-content').innerHTML = `<div class="detail-visual"><span class="detail-symbol">▱</span><span class="detail-year">${era.year} / COMPUTER ARCHIVE</span></div><div class="detail-body"><span class="detail-kicker">${era.game}</span><h2>${era.year === 2005 ? object.name : '桌上的另一片世界'}</h2><p>${object.note}</p><div class="detail-quote">${era.caption}</div></div>`;
    detailDialog.showModal();
  });
  screenDialog.addEventListener('close', () => {
    if (screenDialog?._screenKeyHandler) screenDialog.removeEventListener('keydown', screenDialog._screenKeyHandler);
    screenDialog?.remove();
    screenDialog = null;
  }, { once: true });
  screenDialog.showModal();
  bindScreen(screenDialog, year);
}

function hideHint() {
  $('#object-hint').classList.remove('visible');
  room.canvas.style.cursor = 'grab';
  hovered = null;
}
let downPosition = null;
room.canvas.addEventListener('pointerdown', event => { downPosition = { x: event.clientX, y: event.clientY }; hideHint(); });
room.canvas.addEventListener('pointerup', event => {
  if (!downPosition || Math.hypot(event.clientX - downPosition.x, event.clientY - downPosition.y) > 5) return;
  const hit = room.pick(event.clientX, event.clientY);
  if (hit) openObject(hit.id);
  downPosition = null;
});
room.canvas.addEventListener('pointermove', event => {
  if (event.buttons) { hideHint(); return; }
  const hit = room.pick(event.clientX, event.clientY);
  if (!hit) { hideHint(); return; }
  hovered = hit;
  const point = room.project(hit.point);
  const hint = $('#object-hint');
  $('#hint-name').textContent = (OBJECTS[hit.id] || OBJECTS.keepsakes).name;
  hint.style.left = `${Math.min(point.x, room.canvas.clientWidth - 170)}px`;
  hint.style.top = `${Math.max(70, Math.min(point.y, room.canvas.clientHeight - 65))}px`;
  hint.classList.add('visible');
  room.canvas.style.cursor = 'pointer';
});
room.canvas.addEventListener('pointerleave', hideHint);

document.addEventListener('keydown', event => {
  if (event.code === 'Space' && !document.querySelector('dialog[open]') && event.target.tagName !== 'INPUT' && event.target.tagName !== 'BUTTON') {
    event.preventDefault();
    if (!playing && year >= 2025) setYear(2005);
    setPlaying(!playing);
  }
});

function animate(time) {
  requestAnimationFrame(animate);
  const delta = Math.min((time - lastTime) / 1000, 0.1);
  if (playing) {
    lastTime = time;
    setYear(year + delta * 0.85);
    if (year >= 2025) setPlaying(false);
  }
  if (cameraTransition) {
    const progress = Math.min((time - cameraTransition.start) / 1100, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    room.camera.position.lerpVectors(cameraTransition.fromPosition, cameraTransition.toPosition, eased);
    controls.target.lerpVectors(cameraTransition.fromTarget, cameraTransition.toTarget, eased);
    if (progress === 1) cameraTransition = null;
  }
  controls.update();
  room.render();
}
setYear(2005);
requestAnimationFrame(animate);
requestAnimationFrame(() => $('#loading').classList.add('done'));

window.addEventListener('pagehide', () => {
  setPlaying(false);
  room.renderer.dispose();
});
