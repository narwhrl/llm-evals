import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildRoom } from './room.js';
import { buildItems, applyItems } from './items.js';
import { createScreens } from './screen.js';
import { T0, T1, ERAS, E20, eraAt, yearOf, monthOf, smooth } from './timeline.js';
import './style.css';

const $ = (id) => document.getElementById(id);

// ---------- renderer, scene, camera ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
$('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.35;

const camera = new THREE.PerspectiveCamera(32, innerWidth / innerHeight, 0.03, 60);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 0.3;
controls.maxDistance = 12;
controls.maxPolarAngle = 1.52;

const hemi = new THREE.HemisphereLight('#ffe7c9', '#4f3f33', 0.75);
const sun = new THREE.DirectionalLight('#ffcf9a', 3.2);
sun.position.set(-7.5, 5.4, 0.9);
sun.target.position.set(-1.0, 0.3, -1.0);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 20 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.02;
sun.shadow.radius = 3;
const fill = new THREE.DirectionalLight('#ffe3c4', 0.35);
fill.position.set(4, 6, 6);
const glowLight = new THREE.PointLight('#a9c8ff', 0, 1.6, 2);
scene.add(hemi, sun, sun.target, fill, glowLight);

// ---------- content ----------
const room = buildRoom(scene);
const { items, screens } = buildItems(scene, room);
const os = createScreens((year) => jumpTo(year, () => setView('screen')));
const byId = Object.fromEntries(items.filter((d) => d.id).map((d) => [d.id, d]));
const crtScreen = screens.find((s) => s.item === byId.crt);
const SEATS = ['woodChair', 'officeChair', 'gamingChair', 'meshChair'].map((id) => byId[id]);
const seat = new THREE.Vector3(), onLine = new THREE.Vector3(), sight = new THREE.Line3();

let t = T0, dirty = true, playing = false, jump = null, fly = null, cardItem = null;

const SUN_EARLY = new THREE.Color('#ffd6a8'), SUN_LATE = new THREE.Color('#ffae6a');
function applyTime() {
  applyItems(items, t);
  room.update(t);
  const k = (t - T0) / (T1 - T0);
  // after-school afternoons early on, late evenings later: the sun sinks as the owner grows up
  sun.intensity = 3.3 - 1.9 * k;
  sun.color.copy(SUN_EARLY).lerp(SUN_LATE, k);
  hemi.intensity = 0.8 - 0.35 * k;
  for (const s of screens) {
    if (!s.item.group.visible) continue;
    const map = os.map(s.mode(t), t);
    if (s.mesh.material.map !== map) {
      s.mesh.material.map = map;
      s.mesh.material.color.set(map ? '#ffffff' : '#141716');
      s.mesh.material.needsUpdate = true;
    }
  }
  const main = mainScreen();
  if (main) {
    main.mesh.getWorldPosition(glowLight.position);
    glowLight.position.add(new THREE.Vector3(0, 0, 0.25).applyQuaternion(main.mesh.getWorldQuaternion(new THREE.Quaternion())));
    glowLight.intensity = 0.5 * main.item.v;
  }
  renderer.shadowMap.needsUpdate = true;
  repick = true;
  updateHud();
  if (cardItem) renderCard(cardItem);
}

const mainScreen = () => screens.find((s) => s.item.v > 0.5 && s.mode(t) === 'os');

// ---------- HUD ----------
const slider = $('slider');
const KEYS = ERAS.map((e) => e.year);
$('ticks').innerHTML = KEYS.map((y) => `<button data-year="${y}" style="left:${((y - T0) / (T1 - T0)) * 100}%">${y}</button>`).join('');
let shownEra = null;
function updateHud() {
  const y = yearOf(t), era = eraAt(t);
  $('year').textContent = y;
  $('month').textContent = `${y} 年 ${monthOf(t)} 月`;
  slider.value = t;
  slider.setAttribute('aria-valuetext', `${y} 年 ${monthOf(t)} 月`);
  if (era !== shownEra) {
    shownEra = era;
    $('age').textContent = era.age;
    $('eraTitle').textContent = era.title;
    $('eraText').textContent = era.text;
  }
  for (const b of $('ticks').children) b.classList.toggle('on', +b.dataset.year === era.year);
}

function setPlaying(on) {
  playing = on;
  $('play').textContent = on ? '❚❚' : '▶';
  $('play').setAttribute('aria-label', on ? '暂停' : '自动播放');
  if (on) { jump = null; if (t >= T1 - 0.01) setT(T0); }
}
function setT(v) { t = Math.min(T1, Math.max(T0, v)); dirty = true; }
function jumpTo(year, after) {
  setPlaying(false);
  jump = { from: t, to: year, start: performance.now(), dur: 500 + Math.min(1400, Math.abs(year - t) * 160), after };
}

slider.addEventListener('input', () => { setPlaying(false); jump = null; setT(+slider.value); });
$('play').addEventListener('click', () => setPlaying(!playing));
$('ticks').addEventListener('click', (e) => { const y = e.target.dataset?.year; if (y) jumpTo(+y); });

// ---------- camera views ----------
const VIEWS = {
  overview: { pos: [5.3, 4.3, 6.6], target: [-0.1, 0.62, -0.45] },
  desk: { pos: [-0.6, 1.62, -0.05], target: [-1.55, 0.98, -1.8] },
  // where retired things end up: the nook at the bed's foot, then the retro corner after the renovation
  corner: () => (t < E20 ? { pos: [0.35, 1.75, 1.35], target: [1.8, 0.45, -0.5] } : { pos: [2.3, 1.8, 0.15], target: [1.72, 0.92, -1.65] }),
};
function flyTo(pos, target, dur = 1100) {
  fly = { p0: camera.position.clone(), t0: controls.target.clone(), p1: new THREE.Vector3(...pos), t1: new THREE.Vector3(...target), start: performance.now(), dur };
}
function screenView() {
  const s = mainScreen();
  if (!s) return null;
  const m = s.mesh;
  m.geometry.computeBoundingBox();
  const size = m.geometry.boundingBox.getSize(new THREE.Vector3());
  const c = m.geometry.boundingBox.getCenter(new THREE.Vector3());
  const center = m.localToWorld(c.clone());
  const q = m.getWorldQuaternion(new THREE.Quaternion());
  const vf = THREE.MathUtils.degToRad(camera.fov) / 2, hf = Math.atan(Math.tan(vf) * camera.aspect);
  const dist = Math.max((size.x * 0.72) / Math.tan(hf), (size.y * 0.82) / Math.tan(vf));
  // aim slightly low so the screen sits in the space above the timeline bar
  const shift = new THREE.Vector3(0, -0.06 * dist * Math.tan(vf), 0).applyQuaternion(q);
  const target = center.clone().add(shift);
  return { pos: target.clone().add(new THREE.Vector3(0, 0, dist).applyQuaternion(q)).toArray(), target: target.toArray(), dist };
}
function focusItem(d) {
  const box = new THREE.Box3().setFromObject(d.group, true);
  const c = box.getCenter(new THREE.Vector3()), r = Math.max(0.12, box.getSize(new THREE.Vector3()).length() / 2);
  const dir = camera.position.clone().sub(controls.target).normalize();
  dir.y = Math.max(dir.y, 0.25);
  flyTo(c.clone().add(dir.normalize().multiplyScalar(r * 3.2 + 0.25)).toArray(), c.toArray());
}
function setView(name) {
  const v = name === 'screen' ? screenView() : name === 'corner' ? VIEWS.corner() : VIEWS[name];
  if (v) flyTo(v.pos, v.target);
  for (const b of document.querySelectorAll('.views button')) b.classList.toggle('on', b.dataset.view === name);
}
document.querySelector('.views').addEventListener('click', (e) => { if (e.target.dataset.view) setView(e.target.dataset.view); });

// ---------- info card ----------
const memoryAt = (d, year) => {
  let m = d.memories[0];
  for (const e of d.memories) if (e[0] <= year) m = e;
  return m;
};
function renderCard(d) {
  const y = yearOf(t);
  $('cardTitle').textContent = d.name;
  if (d.memories) {
    const [my, text] = memoryAt(d, y);
    $('cardWhen').textContent = `${my} · 贯穿二十年的旧物`;
    $('cardText').textContent = text;
    $('cardYears').innerHTML = d.memories.map(([yr]) => `<button data-year="${yr}" class="${yr === my ? 'on' : ''}">${yr}</button>`).join('');
  } else {
    $('cardWhen').textContent = d.info.when;
    $('cardText').textContent = d.info.text;
    $('cardYears').innerHTML = '';
  }
}
function openCard(d) {
  cardItem = d;
  renderCard(d);
  $('card').hidden = false;
}
function closeCard() { cardItem = null; $('card').hidden = true; }
$('cardClose').addEventListener('click', closeCard);
$('cardFocus').addEventListener('click', () => cardItem && focusItem(cardItem));
// keepsakes move between years, so the camera follows once the jump lands
const jumpWithCard = (year) => jumpTo(Math.max(T0, Math.min(T1, year)), () => cardItem && focusItem(cardItem));
$('cardYears').addEventListener('click', (e) => { const y = e.target.dataset?.year; if (y) jumpWithCard(+y); });

const THREADS = [['mug', 'plant', 'photo'], ['crt', 'deskA', 'marks', 'calendar', 'woodChair']];
[$('threadMain'), $('threadMore')].forEach((el, i) => {
  el.innerHTML = THREADS[i].map((id) => `<button data-id="${id}">${byId[id].name}</button>`).join('');
  el.addEventListener('click', (e) => {
    const d = byId[e.target.dataset?.id];
    if (!d) return;
    openCard(d);
    if (d.group.visible) focusItem(d);
    else jumpWithCard((d.track?.at(-1).t ?? d.life.at(-1)[0]) + 0.3);
  });
});

// ---------- picking ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const highlight = new THREE.BoxHelper(undefined, '#ffd27a');
highlight.material.transparent = true;
highlight.material.opacity = 0.55;
highlight.visible = false;
scene.add(highlight);

function shown(o) {
  for (; o; o = o.parent) if (!o.visible) return false;
  return true;
}
function pick(ev) {
  ndc.set((ev.clientX / innerWidth) * 2 - 1, -(ev.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  for (const hit of ray.intersectObjects(scene.children, true)) {
    const m = hit.object;
    if (m === highlight || !m.isMesh || !shown(m)) continue;
    if (m.material.transparent && m.material.opacity < 0.5) continue;
    if (m.userData.screen) return { screen: m.userData.screen, hit };
    for (let o = m; o; o = o.parent) {
      const d = o.userData.item;
      if (d && (d.info || d.memories)) return { item: d, hit };
    }
    return null;
  }
  return null;
}

let down = null, pointer = null, repick = false;
const tip = $('tip');
// objects move with the year and camera, so hover is re-picked from the last pointer position after either changes
function updateHover() {
  const p = pointer && !down ? pick(pointer) : null;
  const d = p?.item ?? p?.screen ?? null;
  highlight.visible = !!d;
  if (d) highlight.setFromObject(d.group);
  renderer.domElement.style.cursor = d ? 'pointer' : '';
  tip.hidden = !d;
  if (d) {
    tip.textContent = p.screen && p.screen === mainScreen()?.item ? `${d.name} · 点击操作屏幕` : d.name;
    tip.style.left = `${pointer.clientX}px`;
    tip.style.top = `${pointer.clientY}px`;
  }
}
controls.addEventListener('change', () => (repick = true));
renderer.domElement.addEventListener('pointerleave', () => { pointer = null; updateHover(); });
renderer.domElement.addEventListener('pointermove', (ev) => {
  pointer = { clientX: ev.clientX, clientY: ev.clientY };
  updateHover();
});
renderer.domElement.addEventListener('pointerdown', (ev) => { down = { x: ev.clientX, y: ev.clientY }; });
renderer.domElement.addEventListener('pointerup', (ev) => {
  const moved = down && Math.hypot(ev.clientX - down.x, ev.clientY - down.y) > 5;
  down = null;
  if (moved) return;
  const p = pick(ev);
  if (!p) { if (ev.button === 0) closeCard(); return; }
  if (p.screen) {
    const main = mainScreen();
    if (main && p.screen === main.item) {
      const v = screenView();
      if (camera.position.distanceTo(new THREE.Vector3(...v.target)) > v.dist * 1.8) { setView('screen'); return; }
      os.click(t, p.hit.uv, ev.button);
      dirty = true;
      return;
    }
  }
  if (ev.button === 0) openCard(p.item ?? p.screen);
});
renderer.domElement.addEventListener('contextmenu', (e) => e.preventDefault());

addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' && e.key !== ' ') return;
  if (e.key === ' ') { e.preventDefault(); setPlaying(!playing); }
  else if (e.key === 'ArrowRight') jumpTo(Math.min(T1, Math.floor(t + 1e-3) + 1));
  else if (e.key === 'ArrowLeft') jumpTo(Math.max(T0, Math.ceil(t - 1e-3) - 1));
  else if (e.key >= '1' && e.key <= '6') jumpTo(KEYS[+e.key - 1]);
  else if (e.key === 'Escape') closeCard();
});

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// ---------- loop ----------
const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);
const BOUND = new THREE.Box3(new THREE.Vector3(-2.6, -0.2, -2.1), new THREE.Vector3(2.6, 2.4, 2.2));
let last = performance.now();
camera.position.set(...VIEWS.overview.pos);
controls.target.set(...VIEWS.overview.target);

function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (playing) {
    const near = Math.min(...KEYS.map((k) => Math.abs(t - k)));
    setT(t + dt * 0.8 * (0.22 + 0.78 * smooth(near / 0.5)));
    if (t >= T1) setPlaying(false);
  } else if (jump) {
    const k = Math.min(1, (now - jump.start) / jump.dur);
    setT(jump.from + (jump.to - jump.from) * ease(k));
    if (k >= 1) { const after = jump.after; jump = null; after?.(); }
  }
  if (dirty) { dirty = false; applyTime(); }
  if (fly) {
    const k = ease(Math.min(1, (now - fly.start) / fly.dur));
    camera.position.lerpVectors(fly.p0, fly.p1, k);
    controls.target.lerpVectors(fly.t0, fly.t1, k);
    if (k >= 1) fly = null;
  }
  controls.target.clamp(BOUND.min, BOUND.max);
  controls.update();
  // a chair between a close-up camera and what it looks at would fill the view, so it steps aside
  const close = camera.position.distanceTo(controls.target) < 3.5;
  sight.set(camera.position, controls.target);
  for (const c of SEATS) {
    if (c.v <= 0.003) continue;
    const p = c.group.position;
    let show = !close || Math.hypot(controls.target.x - p.x, controls.target.z - p.z) < 0.3;
    if (!show) show = [0.6, 0.95, 1.3].every((y) => sight.closestPointToPoint(seat.set(p.x, y, p.z), true, onLine).distanceTo(seat) > 0.42);
    if (c.group.visible !== show) { c.group.visible = show; renderer.shadowMap.needsUpdate = true; }
  }
  // walls between the camera and the room stop drawing but still cast shadows
  const [backMat, leftMat] = room.wallMats;
  for (const [m, hide] of [[backMat, camera.position.z < -2.1], [leftMat, camera.position.x < -2.6]]) {
    m.colorWrite = !hide;
    m.depthWrite = !hide;
  }
  if (repick) { repick = false; updateHover(); }
  os.tick(now, t, crtScreen.item.group.visible && crtScreen.mode(t) === 'retro');
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
applyTime();
renderer.render(scene, camera);
$('loading').classList.add('done');
requestAnimationFrame(frame);
