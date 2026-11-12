import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildRoom } from './room.js';
import { buildTimeline } from './timeline.js';
import { Screens } from './screens.js';
import { ITEMS, STOPS, YEAR0, YEAR1, END, active, chapterAt, noteAt, mainMonitor } from './story.js';

const $ = (id) => document.getElementById(id);
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#2b211b');
scene.fog = new THREE.Fog('#2b211b', 11, 24);
const camera = new THREE.PerspectiveCamera(36, 1, 0.05, 60);
const controls = new OrbitControls(camera, canvas);
Object.assign(controls, { enableDamping: true, minDistance: 0.45, maxDistance: 13, maxPolarAngle: Math.PI / 2 - 0.04 });

// the table the miniature stands on
const table = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.MeshStandardMaterial({ color: '#4a382c', roughness: 0.9 }));
table.rotation.x = -Math.PI / 2;
table.position.y = -0.12;
scene.add(table);

const room = buildRoom(scene);
const screens = new Screens();
const timeline = buildTimeline(scene, room.walls, screens);
const screenGlow = new THREE.PointLight('#8fb4ff', 0.7, 2.6, 1.6);
scene.add(screenGlow);
const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.045), new THREE.MeshBasicMaterial({ color: '#ffb347' }));
marker.visible = false;
scene.add(marker);

// ---------- state ----------
let year = YEAR0, playing = false, holding = false, selected = null, fly = null, hover = null, pointer = null;
const SPEED = 0.55; // years per second while auto-playing
const slider = $('slider'), playBtn = $('play');

function setYear(y) {
  year = THREE.MathUtils.clamp(y, YEAR0, YEAR1);
  slider.value = year;
  const shown = Math.floor(year + 1e-6);
  $('year').textContent = shown;
  const [, title, text] = chapterAt(year);
  if ($('chapter-title').textContent !== title) {
    $('chapter-title').textContent = title;
    $('chapter-text').textContent = text;
  }
  for (const el of $('ticks').children) el.classList.toggle('on', +el.dataset.year === shown);
  if (selected) showCard(selected);
}
function setPlaying(on) {
  playing = on;
  playBtn.textContent = on ? '❚❚' : '▶';
  playBtn.classList.toggle('on', on);
}

// ---------- camera views ----------
const HOME = [[5.15, 4.9, 6.5], [0.1, 0.5, -0.05]];
function flyTo(pos, target) {
  fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: new THREE.Vector3(...pos), t1: new THREE.Vector3(...target), k: 0 };
}
function view(name) {
  if (name === 'room') return flyTo(...HOME);
  if (name === 'desk') return flyTo([0.35, 1.75, 0.55], [-0.7, 0.95, -1.5]);
  // far enough for the whole screen to sit between the side panels, and high enough to look over the chair
  const scr = timeline.byId[mainMonitor(year).id].obj.userData.screen, c = scr.getWorldPosition(new THREE.Vector3());
  const { width, height } = scr.geometry.parameters, d = Math.max(width / 0.58, height / 0.36);
  flyTo([c.x, c.y + 0.33 * d, c.z + d], [c.x, c.y - 0.04 * d, c.z]);
}
for (const b of $('views').children) b.onclick = () => view(b.dataset.view);

// ---------- info card and keepsakes ----------
function showCard(it) {
  if (!active(it, year)) return hideCard();
  selected = it;
  const to = it.to ?? END;
  $('card-tag').textContent = it.keep ? `★ 贯穿二十年 · ${YEAR0} — 至今` : `${Math.floor(it.from)} — ${to >= END ? '至今' : Math.floor(to)}`;
  $('card-title').textContent = it.name;
  $('card-text').textContent = noteAt(it, year);
  $('card').hidden = false;
}
function hideCard() {
  selected = null;
  $('card').hidden = true;
  marker.visible = false;
}
$('card-close').onclick = hideCard;

for (const keep of new Set(ITEMS.filter((it) => it.keep).map((it) => it.keep))) {
  const b = document.createElement('button');
  b.textContent = keep;
  b.onclick = () => {
    const it = ITEMS.find((i) => i.keep === keep && active(i, year));
    showCard(it);
    const c = new THREE.Box3().setFromObject(timeline.byId[it.id].obj).getCenter(new THREE.Vector3());
    flyTo([c.x + 1.25, c.y + 0.95, c.z + 1.6], [c.x, c.y, c.z]);
  };
  $('keepsakes').append(b);
}

// ---------- timeline controls ----------
STOPS.forEach((y) => {
  const el = document.createElement('span');
  el.textContent = y;
  el.dataset.year = y;
  el.style.left = `${((y - YEAR0) / (YEAR1 - YEAR0)) * 100}%`;
  el.onclick = () => setYear(y);
  $('ticks').append(el);
});
slider.addEventListener('input', () => setYear(+slider.value));
slider.addEventListener('pointerdown', () => (holding = true));
for (const type of ['pointerup', 'pointercancel']) addEventListener(type, () => (holding = false));
playBtn.onclick = () => {
  if (!playing && year >= YEAR1) setYear(YEAR0);
  setPlaying(!playing);
};

// ---------- picking ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(ev) {
  const r = canvas.getBoundingClientRect();
  ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(timeline.pickable(), true)[0];
  if (!hit) return null;
  let o = hit.object;
  while (!o.userData.item) o = o.parent;
  const onScreen = hit.object === o.userData.screen && hit.object.material === screens.main.mat;
  return { it: o.userData.item, uv: onScreen ? hit.uv : null };
}
let down = null;
canvas.addEventListener('pointerdown', (ev) => {
  down = [ev.clientX, ev.clientY];
  fly = null;
});
canvas.addEventListener('pointerup', (ev) => {
  if (!down || Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 5) return;
  const p = pick(ev);
  if (p?.uv) screens.click(p.uv.x, p.uv.y);
  else if (p?.it.note) showCard(p.it);
  else hideCard();
});
canvas.addEventListener('pointermove', (ev) => (pointer = ev));
canvas.addEventListener('pointerleave', () => (pointer = null));

function updateHover() {
  const p = pointer && !pointer.buttons ? pick(pointer) : null;
  const text = p?.uv ? '点击操作屏幕' : p?.it.note ? p.it.name : '';
  if (text !== hover) {
    hover = text;
    $('tip').textContent = text;
    $('tip').hidden = !text;
    canvas.style.cursor = text ? 'pointer' : 'grab';
  }
  if (text) Object.assign($('tip').style, { left: pointer.clientX + 'px', top: pointer.clientY + 'px' });
}

// ---------- loop ----------
function resize() {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize);
resize();
camera.position.set(...HOME[0]);
controls.target.set(...HOME[1]);
setYear(YEAR0);

const timer = new THREE.Timer(), box = new THREE.Box3();
renderer.setAnimationLoop(() => {
  timer.update();
  const dt = Math.min(timer.getDelta(), 0.1), time = timer.getElapsed();
  if (playing && !holding) {
    setYear(year + dt * SPEED);
    if (year >= YEAR1) setPlaying(false);
  }
  if (fly) {
    fly.k = Math.min(1, fly.k + dt / 0.9);
    const e = fly.k * fly.k * (3 - 2 * fly.k);
    camera.position.lerpVectors(fly.p0, fly.p1, e);
    controls.target.lerpVectors(fly.t0, fly.t1, e);
    if (fly.k === 1) fly = null;
  }
  controls.update();
  room.update(year, camera);

  const mon = timeline.byId[mainMonitor(year).id].obj;
  const sideAspect = timeline.update(year, dt, time);
  screens.update(year, mon.userData.aspect, sideAspect, time);
  mon.userData.screen.getWorldPosition(screenGlow.position);
  screenGlow.position.z += 0.25;
  screenGlow.color.set(screens.glow);

  if (selected) {
    const obj = timeline.byId[selected.id].obj;
    if (!obj.visible) hideCard();
    else {
      box.setFromObject(obj);
      marker.position.set((box.min.x + box.max.x) / 2, box.max.y + 0.1 + Math.sin(time * 3) * 0.02, (box.min.z + box.max.z) / 2);
      marker.rotation.y = time * 2;
      marker.visible = true;
    }
  }
  updateHover();
  renderer.render(scene, camera);
});
