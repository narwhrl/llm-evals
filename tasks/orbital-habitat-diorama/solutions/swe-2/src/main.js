import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildWorld } from './world.js';

const app = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04050a);

/* Orthographic isometric camera */
const FR = 6.4;
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 200);
function setFrustum() {
  const a = window.innerWidth / window.innerHeight;
  camera.left = -FR * a; camera.right = FR * a;
  camera.top = FR; camera.bottom = -FR;
  camera.updateProjectionMatrix();
}
setFrustum();
// classic isometric: from the open side, 45° azimuth, ~35.26° elevation
const ISO = new THREE.Vector3(1, 0.82, 1).normalize().multiplyScalar(40);
camera.position.copy(ISO);
camera.lookAt(0, -0.4, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, -0.4, 0);
controls.enablePan = false;
// keep the cabin interior readable — limit how far you can swing under the floor
controls.minPolarAngle = 0.35;
controls.maxPolarAngle = 1.25;
controls.minAzimuthAngle = 0.2;
controls.maxAzimuthAngle = 1.4;
controls.minZoom = 0.6;
controls.maxZoom = 4;

const W = buildWorld(scene);
window.__W = W; window.__cam = camera; window.__scene = scene;   // verification handle

/* ---------------------- day/night cycle --------------------------- */
const DAY_LEN = 90, FAST_LEN = 15;
const sunDir = new THREE.Vector3();
function applyCycle(t) {
  // t in [0,1): 0=sunrise at the porthole, 0.25=noon, 0.5=sunset, 0.75=midnight
  const ang = t * Math.PI * 2;
  // Earth drifts slowly across the porthole
  W.earthG.rotation.y = t * Math.PI * 2 * 0.02;
  W.earth.rotation.y = t * Math.PI * 2 * 0.02;
  W.earthNight.rotation.y = W.earth.rotation.y;
  W.clouds.rotation.y = t * Math.PI * 2 * 0.03;
  // sun swings around: bright when the porthole faces it
  const sunUp = Math.sin(ang);            // +1 = day
  sunDir.set(Math.cos(ang) * 0.4, Math.max(0.15, sunUp), -1).normalize();
  W.sun.position.copy(sunDir).multiplyScalar(30).add(new THREE.Vector3(1.4, 0.4, 0));
  const day = THREE.MathUtils.smoothstep(sunUp, -0.15, 0.35);
  W.sun.intensity = day * 4.2;
  W.sun.color.setHSL(0.09, 0.5, 0.92 - day * 0.04);
  // the hard porthole sun-shaft: swells to blinding at local noon, gone at night
  const noon = Math.pow(Math.max(0, sunUp), 1.6);
  W.shaft.intensity = noon * 60;
  W.pool.material.opacity = noon * 0.5;
  W.pool.scale.setScalar(0.7 + noon * 0.5);
  // night: Earth city lights + cool rim, warm interior lamps stay on
  const night = 1 - day;
  W.earthNight.material.opacity = night * 0.95;
  W.earthshine.intensity = night * 4.5;
  W.sun.target = W.portholeGlass;
}
applyCycle(0.25);

/* ---------------------- interaction ------------------------------- */
const ray = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let downAt = 0, downXY = [0, 0], dragging = false, focusObj = null;
const baseTarget = new THREE.Vector3(0, -0.4, 0);
const focusAnim = { t: 1, from: new THREE.Vector3(), to: new THREE.Vector3(), zoomFrom: 1, zoomTo: 1 };

function pick(e) {
  const r = renderer.domElement.getBoundingClientRect();
  mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  ray.setFromCamera(mouse, camera);
  const hits = ray.intersectObjects(W.interactives.map(i => i.obj), true);
  return hits.length ? hits[0] : null;
}
function interactiveOf(obj) {
  let o = obj;
  while (o) { const f = W.interactives.find(i => i.obj === o || i.obj === o.parent); if (f) return f; o = o.parent; }
  return null;
}

renderer.domElement.addEventListener('pointerdown', (e) => {
  downAt = performance.now(); downXY = [e.clientX, e.clientY]; dragging = false;
  const hit = pick(e);
  const it = hit && interactiveOf(hit.object);
  if (it && it.action === 'porthole') W.state.draggingEarth = true;
});
renderer.domElement.addEventListener('pointermove', (e) => {
  if (W.state.draggingEarth) {
    const dx = e.clientX - downXY[0];
    if (Math.abs(dx) > 6) { dragging = true; W.state.t = (W.state.t + dx * 0.0004 + 1) % 1; downXY[0] = e.clientX; }
    return;
  }
  if (Math.hypot(e.clientX - downXY[0], e.clientY - downXY[1]) > 8) dragging = true;
  // pen dodge — nudge the pen away when the cursor nears it
  const pen = W.penState;
  const sp = pen.m.position.clone().project(camera);
  const sx = (sp.x * 0.5 + 0.5) * renderer.domElement.clientWidth;
  const sy = (-sp.y * 0.5 + 0.5) * renderer.domElement.clientHeight;
  const d = Math.hypot(e.clientX - sx, e.clientY - sy);
  if (d < 90) {
    const push = (90 - d) / 90;
    pen.base.x += (sx > e.clientX ? 1 : -1) * push * 0.006;
    pen.base.y += (sy > e.clientY ? -1 : 1) * push * 0.004;
    pen.base.x = THREE.MathUtils.clamp(pen.base.x, -2.8, 2.8);
    pen.base.y = THREE.MathUtils.clamp(pen.base.y, -1.4, 1.6);
  }
});
renderer.domElement.addEventListener('pointerup', (e) => {
  const wasDrag = dragging || (performance.now() - downAt) > 260;
  if (W.state.draggingEarth) {
    W.state.draggingEarth = false;
    if (!wasDrag) { W.state.fast = !W.state.fast; }   // click on the porthole = fast-forward
    return;
  }
  if (wasDrag) return;
  const hit = pick(e);
  const it = hit && interactiveOf(hit.object);
  if (!it) { focusTo(null); return; }
  if (it.action === 'focus') {
    focusTo(focusObj === it.obj ? null : it.obj);
  } else if (it.action === 'pen') {
    W.penState.spin += 14;
  } else if (it.action === 'plant') {
    W.state.plantOn = !W.state.plantOn;
  } else if (it.action === 'nightcruise') {
    W.state.nightCruise = !W.state.nightCruise;
  }
});

function focusTo(obj) {
  focusObj = obj;
  const box = obj ? new THREE.Box3().setFromObject(obj) : null;
  const target = box ? box.getCenter(new THREE.Vector3()) : baseTarget.clone();
  focusAnim.t = 0;
  focusAnim.from.copy(controls.target);
  focusAnim.to.copy(target);
  focusAnim.zoomFrom = camera.zoom;
  focusAnim.zoomTo = obj ? 2.1 : 1;
}

window.addEventListener('resize', () => { setFrustum(); renderer.setSize(window.innerWidth, window.innerHeight); });

/* ------------------------- animate -------------------------------- */
const clock = new THREE.Clock();
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.getElapsedTime();
  // cycle
  W.state.t = (W.state.t + dt / (W.state.fast ? FAST_LEN : DAY_LEN)) % 1;
  applyCycle(W.state.t);
  // focus easing
  if (focusAnim.t < 1) {
    focusAnim.t = Math.min(1, focusAnim.t + dt * 1.4);
    const e = 1 - Math.pow(1 - focusAnim.t, 3);
    controls.target.lerpVectors(focusAnim.from, focusAnim.to, e);
    camera.zoom = THREE.MathUtils.lerp(focusAnim.zoomFrom, focusAnim.zoomTo, e);
    camera.updateProjectionMatrix();
  }
  // lights follow state
  const night = 1 - THREE.MathUtils.smoothstep(Math.sin(W.state.t * Math.PI * 2), -0.15, 0.35);
  const cruise = W.state.nightCruise ? 0.12 : 1;
  W.strip.material.color.setHex(W.state.nightCruise ? 0x1a2030 : 0xffd9a0);
  W.stripGlow.intensity = 6 * cruise;
  W.keyStrip.intensity = 6 * cruise;
  W.rl.intensity = 5 * cruise;
  W.growLight.intensity = W.state.plantOn ? 3.5 : 0;
  W.growBars.forEach(b => b.material.color.setHex(W.state.plantOn ? 0xff7ad9 : 0x2a2030));
  // floaters — slow tumble and drift, never colliding
  for (const f of W.floaters) {
    f.t += dt * 0.4;
    const m = f.m;
    m.position.set(
      f.base.x + Math.sin(f.t * 0.7) * 0.18,
      f.base.y + Math.sin(f.t * 0.9 + 1) * 0.14,
      f.base.z + Math.cos(f.t * 0.6) * 0.16
    );
    m.rotation.x += dt * (f.spin || 0.15);
    m.rotation.y += dt * (f.spin ? f.spin * 0.7 : 0.12);
  }
  // pen spin decays
  W.penState.spin *= (1 - dt * 1.4);
  for (const f of W.dyn) f(t);
  controls.update();
  renderer.render(scene, camera);
});
