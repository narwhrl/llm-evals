import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ERAS, YEAR_MAX, YEAR_MIN, eraIndexFor } from './eras.js';
import { buildProps } from './props.js';
import { buildRoom } from './room.js';
import { createScreen, createSideScreenTexture, hitScreen, setEra, tickScreen } from './screens.js';
import { createTimeline } from './timeline.js';

const canvas = document.getElementById('scene');
const loading = document.getElementById('loading');

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
} catch (error) {
  loading.textContent = `无法初始化 WebGL：${error.message}`;
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(6.2, 4.5, 8.0);

const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1.15, -0.5);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 1.5;
controls.maxDistance = 17;
controls.minPolarAngle = 0.18;
controls.maxPolarAngle = Math.PI * 0.49;
controls.minAzimuthAngle = -1.3;
controls.maxAzimuthAngle = 1.3;
controls.enablePan = false;

const room = buildRoom(scene);
const screen = createScreen();
const sideTexture = createSideScreenTexture();
const props = buildProps(scene, screen.texture, sideTexture);
const timeline = createTimeline(props.timelineItems);

// ------------------------------------------------------------------ UI

const $ = (id) => document.getElementById(id);
const yearEl = $('year');
const eraNameEl = $('era-name');
const eraDescEl = $('era-desc');
const slider = $('slider');
const playBtn = $('play');
const speedBtn = $('speed');
const notes = $('notes');
const notesEra = $('notes-era');
const notesTitle = $('notes-title');
const notesBody = $('notes-body');
const notesTag = $('notes-tag');
const screenHint = $('screen-hint');
const help = $('help');
const ticksEl = $('ticks');

const SPEEDS = [2, 4, 8];
let year = YEAR_MIN;
let currentEra = -1;
let playing = false;
let speedIndex = 0;

ERAS.forEach((era, index) => {
  const tick = document.createElement('div');
  tick.className = 'tick';
  tick.dataset.index = String(index);
  tick.style.left = `${((era.year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100}%`;
  tick.textContent = String(era.year);
  ticksEl.appendChild(tick);
});
const tickEls = [...ticksEl.children];

function applyYear(next) {
  year = Math.min(YEAR_MAX, Math.max(YEAR_MIN, next));
  timeline.apply(year);
  const index = eraIndexFor(year);
  if (index !== currentEra) {
    currentEra = index;
    setEra(screen, index);
  }
  yearEl.textContent = String(Math.round(year));
  eraNameEl.textContent = ERAS[index].name;
  eraDescEl.textContent = ERAS[index].desc;
  slider.value = year.toFixed(2);
  tickEls.forEach((tick, i) => tick.classList.toggle('current', i === index));
}

function updatePlayButton() {
  playBtn.innerHTML = playing ? '⏸<span>暂停</span>' : '▶<span>自动播放</span>';
  playBtn.classList.toggle('active', playing);
}

function setPlaying(on) {
  playing = on;
  updatePlayButton();
}

playBtn.addEventListener('click', () => setPlaying(!playing));
slider.addEventListener('input', () => {
  setPlaying(false);
  applyYear(parseFloat(slider.value));
});
speedBtn.addEventListener('click', () => {
  speedIndex = (speedIndex + 1) % SPEEDS.length;
  speedBtn.textContent = `${SPEEDS[speedIndex] / 2}×`;
});

const PRESETS = {
  overview: { pos: [6.2, 4.5, 8.0], target: [0, 1.15, -0.5] },
  desk: { pos: [0.55, 2.15, 1.15], target: [-0.25, 1.25, -1.9] },
  keepsakes: { pos: [3.4, 2.2, 3.4], target: [2.0, 0.55, 1.3] },
};
const KEEPSAKE_VIEWS = {
  mug: { pos: [0.9, 1.5, -0.2], target: [0.5, 0.85, -1.5] },
  dino: { pos: [-1.0, 2.0, 0.4], target: [-2.08, 1.4, -2.0] },
  photo: { pos: [-0.7, 2.2, 0.6], target: [-1.0, 1.6, -2.2] },
};

let tween = null;
function goTo(pos, target) {
  tween = {
    fromPos: camera.position.clone(),
    fromTarget: controls.target.clone(),
    toPos: new THREE.Vector3(...pos),
    toTarget: new THREE.Vector3(...target),
    t: 0,
  };
}
controls.addEventListener('start', () => { tween = null; });

document.querySelectorAll('#viewbar [data-view]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('#viewbar [data-view]').forEach((b) => b.classList.toggle('active', b === button));
    const preset = PRESETS[button.dataset.view];
    goTo(preset.pos, preset.target);
  });
});

function showNote(data) {
  notesEra.textContent = data.era || '';
  notesTitle.textContent = data.title;
  notesBody.textContent = data.memories ? data.memories[currentEra] : data.body;
  notesTag.textContent = data.tag || '';
  notes.classList.remove('hidden');
  const key = data.title.includes('马克杯') ? 'mug'
    : data.title.includes('恐龙') ? 'dino'
      : data.title.includes('合影') || data.title.includes('照片') ? 'photo' : null;
  document.querySelectorAll('.legend-items span').forEach((span) => {
    span.classList.toggle('lit', key !== null && span.dataset.keepsake === key);
  });
}

function hideNote() {
  notes.classList.add('hidden');
  document.querySelectorAll('.legend-items span').forEach((span) => span.classList.remove('lit'));
}

function noteForKeepsake(key) {
  const object = key === 'mug' ? props.keepsakes.mug
    : key === 'dino' ? props.keepsakes.dino : props.keepsakes.photo;
  return object.userData.note;
}

document.querySelectorAll('.legend-items span').forEach((span) => {
  span.addEventListener('click', () => {
    const key = span.dataset.keepsake;
    goTo(KEEPSAKE_VIEWS[key].pos, KEEPSAKE_VIEWS[key].target);
    showNote(noteForKeepsake(key));
  });
});

$('notes-close').addEventListener('click', hideNote);
$('help-btn').addEventListener('click', () => help.classList.toggle('hidden'));
$('help-close').addEventListener('click', () => help.classList.add('hidden'));
window.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault();
    setPlaying(!playing);
  } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
    setPlaying(false);
    applyYear(year + (event.code === 'ArrowRight' ? 1 : -1));
  }
});

// --------------------------------------------------------------- picking

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let pointerDown = null;

function visibleChain(object) {
  let current = object;
  while (current) {
    if (!current.visible) return false;
    current = current.parent;
  }
  return true;
}

function findNote(object) {
  let current = object;
  while (current && current !== scene) {
    if (current.userData.note) return current.userData.note;
    current = current.parent;
  }
  return null;
}

function pick(event) {
  const rect = canvas.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects([room.root, props.root], true);
  for (const hit of hits) {
    if (!visibleChain(hit.object)) continue;
    const material = Array.isArray(hit.object.material) ? hit.object.material[0] : hit.object.material;
    if (material && material.opacity < 0.3) continue;
    if (hit.object.userData.isScreen && hit.uv) {
      hitScreen(screen, currentEra, hit.uv.x, hit.uv.y);
      return;
    }
    const data = findNote(hit.object);
    if (data) {
      showNote(data);
      return;
    }
    break;
  }
  hideNote();
}

canvas.addEventListener('pointerdown', (event) => {
  pointerDown = { x: event.clientX, y: event.clientY };
});
canvas.addEventListener('pointerup', (event) => {
  if (!pointerDown) return;
  const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
  pointerDown = null;
  if (moved < 5) pick(event);
});

// ------------------------------------------------------------- main loop

const deskFocus = new THREE.Vector3(-0.25, 1.2, -1.9);
const clock = new THREE.Clock();
let firstFrame = true;

function frame() {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (playing) {
    let next = year + dt * SPEEDS[speedIndex];
    if (next > YEAR_MAX) next = YEAR_MIN;
    applyYear(next);
  }
  if (tween) {
    tween.t = Math.min(1, tween.t + dt * 1.6);
    const e = tween.t * tween.t * (3 - 2 * tween.t);
    camera.position.lerpVectors(tween.fromPos, tween.toPos, e);
    controls.target.lerpVectors(tween.fromTarget, tween.toTarget, e);
    if (tween.t >= 1) tween = null;
  }
  tickScreen(screen, currentEra, dt);
  controls.update();
  screenHint.style.opacity = camera.position.distanceTo(deskFocus) < 4.4 ? '1' : '0';
  renderer.render(scene, camera);
  if (firstFrame) {
    firstFrame = false;
    loading.classList.add('done');
    window.setTimeout(() => loading.remove(), 800);
  }
  requestAnimationFrame(frame);
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
});

// Read-only handle for console inspection and automated verification.
window.__room = {
  camera, scene, screen, timeline, props,
  get year() { return year; },
  get era() { return currentEra; },
  get playing() { return playing; },
};

applyYear(YEAR_MIN);
screenHint.classList.remove('hidden');
screenHint.style.opacity = '0';
updatePlayButton();
frame();
