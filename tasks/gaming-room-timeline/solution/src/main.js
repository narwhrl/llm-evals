import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createScreenEngine, paintSide, ERA_GAMES } from './screen.js';

const YMIN = 2005, YMAX = 2025;
const ERAS = [2005, 2009, 2013, 2017, 2021, 2025];
const ERA_NAMES = ['卧室电脑角', '第一次升级', '主机与收藏', '电竞雏形', '直播与创作', '成熟电竞房'];
const DESK_Y = 0.77; // desktop surface height, shared by all desk variants

/* ---------- renderer / scene ---------- */
const container = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1a130c);
scene.fog = new THREE.Fog(0x1a130c, 15, 28);

const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 60);
camera.position.set(5.2, 3.8, 6.2);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 1.0;
controls.maxDistance = 13;
controls.maxPolarAngle = 1.52;

scene.add(new THREE.HemisphereLight(0xfff2e0, 0x3a2c20, 0.75));
const sun = new THREE.DirectionalLight(0xffdfb0, 1.6);
sun.position.set(-6, 5.5, 2.5);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -4 });
sun.shadow.bias = -0.0004;
scene.add(sun);
const lampLight = new THREE.PointLight(0xffc98a, 12, 9, 1.8);
lampLight.position.set(0.4, 2.25, -0.6);
scene.add(lampLight);

/* ---------- helpers ---------- */
function M(color, o = {}) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.04, ...o });
}
function box(w, h, d, mt, x = 0, y = 0, z = 0, ry = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mt);
  m.position.set(x, y, z); m.rotation.y = ry;
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function cyl(rt, rb, h, mt, x = 0, y = 0, z = 0, seg = 20) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mt);
  m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true;
  return m;
}
const faders = [];
const movers = [];
function registerFade(obj, from, to) {
  const mats = [];
  obj.traverse(n => {
    if (n.isMesh) {
      (Array.isArray(n.material) ? n.material : [n.material])
        .forEach(m => { m.transparent = true; mats.push({ m, base: m.opacity }); });
    }
  });
  obj.visible = false;
  scene.add(obj);
  faders.push({ obj, from, to, mats });
}
function addMover(obj, keys) { scene.add(obj); movers.push({ obj, keys }); }
const sstep = (x, a, b) => THREE.MathUtils.smoothstep(x, a, b);
function windowK(year, from, to, f = 0.9) {
  const a = from <= YMIN - 1 ? 1 : sstep(year, from - f, from + f * 0.4);
  const b = to >= YMAX + 1 ? 1 : 1 - sstep(year, to - f * 0.4, to + f);
  return Math.max(0, Math.min(1, a * b));
}
function applyMovers(year) {
  for (const { obj, keys } of movers) {
    let i = 0;
    while (i < keys.length - 2 && year > keys[i + 1].y) i++;
    const a = keys[i], b = keys[i + 1];
    const t = sstep(year, a.y, b.y);
    obj.position.set(
      a.p[0] + (b.p[0] - a.p[0]) * t,
      a.p[1] + (b.p[1] - a.p[1]) * t,
      a.p[2] + (b.p[2] - a.p[2]) * t);
    obj.rotation.y = (a.ry || 0) + ((b.ry || 0) - (a.ry || 0)) * t;
  }
}
function posterTex(title, sub, bg, fg, lines) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 168;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, 128, 168);
  g.fillStyle = fg;
  (lines || []).forEach((h, i) => g.fillRect(12, 60 + i * 22, 104 - i * 18, 12));
  g.fillStyle = '#fff'; g.font = 'bold 15px sans-serif';
  g.fillText(title, 12, 30); g.font = '11px sans-serif'; g.fillText(sub, 12, 48);
  g.fillStyle = 'rgba(255,255,255,.75)'; g.font = '10px sans-serif';
  g.fillText('省吃俭用购入', 12, 156);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ---------- static shell ---------- */
{
  const floor = box(7.2, 0.1, 6, M(0x9a6b42, { roughness: 0.7 }), 0, -0.05, 0);
  floor.castShadow = false; scene.add(floor);
  for (let i = -3; i <= 3; i++) {
    const g = box(0.02, 0.004, 6, M(0x7d5533), i, 0.002, 0);
    g.castShadow = false; scene.add(g);
  }
  const bw = box(7.2, 3.4, 0.12, M(0xe8d9c2, { roughness: 0.95 }), 0, 1.7, -3.06);
  bw.castShadow = false; scene.add(bw);
  const lw = box(0.12, 3.4, 6, M(0xdfcfae, { roughness: 0.95 }), -3.66, 1.7, 0);
  lw.castShadow = false; scene.add(lw);
  scene.add(box(7.2, 0.09, 0.03, M(0x6b4a2e), 0, 0.045, -2.99));
  // window + sky on left wall
  const skyC = document.createElement('canvas'); skyC.width = 128; skyC.height = 128;
  const sg = skyC.getContext('2d');
  const grad = sg.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0, '#9ec7e8'); grad.addColorStop(0.62, '#f6d9a8'); grad.addColorStop(1, '#f0a96b');
  sg.fillStyle = grad; sg.fillRect(0, 0, 128, 128);
  sg.fillStyle = 'rgba(255,255,255,.85)'; sg.beginPath(); sg.arc(88, 40, 14, 0, 7); sg.fill();
  sg.fillStyle = '#8a9a6a'; sg.fillRect(0, 104, 128, 24);
  const skyT = new THREE.CanvasTexture(skyC); skyT.colorSpace = THREE.SRGBColorSpace;
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 1.4),
    new THREE.MeshBasicMaterial({ map: skyT }));
  sky.rotation.y = Math.PI / 2; sky.position.set(-3.6, 1.7, -0.5); scene.add(sky);
  const frM = M(0x7a5230);
  scene.add(box(0.1, 0.08, 2.06, frM, -3.58, 2.44, -0.5));
  scene.add(box(0.1, 0.08, 2.06, frM, -3.58, 0.96, -0.5));
  scene.add(box(0.1, 1.56, 0.08, frM, -3.58, 1.7, -1.49));
  scene.add(box(0.1, 1.56, 0.08, frM, -3.58, 1.7, 0.49));
  scene.add(box(0.06, 1.4, 0.05, frM, -3.58, 1.7, -0.5));
  scene.add(box(0.06, 0.05, 1.9, frM, -3.58, 1.7, -0.5));
  scene.add(box(0.22, 0.05, 2.2, M(0x8a5f36), -3.5, 0.93, -0.5));
  const curM = M(0xb98d5f, { roughness: 1 });
  scene.add(box(0.14, 1.7, 0.4, curM, -3.5, 1.65, -1.75));
  scene.add(box(0.14, 1.7, 0.4, curM, -3.5, 1.65, 0.75));
  // pendant lamp
  scene.add(cyl(0.015, 0.015, 1.2, M(0x222222), 0.4, 2.9, -0.6, 8));
  scene.add(cyl(0.22, 0.3, 0.22,
    M(0xd9a45b, { emissive: 0xff9d4d, emissiveIntensity: 0.55 }), 0.4, 2.3, -0.6));
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 10),
    new THREE.MeshBasicMaterial({ color: 0xffe2b0 }));
  bulb.position.set(0.4, 2.22, -0.6); scene.add(bulb);
  // bed frame (blankets crossfade separately)
  const bed = new THREE.Group();
  bed.add(box(0.12, 0.9, 1.6, M(0x6e4a2c), 3.44, 0.45, 1.2));
  bed.add(box(1.9, 0.28, 1.5, M(0x7a5230), 2.55, 0.32, 1.2));
  bed.add(box(1.8, 0.16, 1.4, M(0xf2ede2), 2.5, 0.52, 1.2));
  bed.add(box(0.5, 0.12, 0.6, M(0xffffff), 3.0, 0.62, 0.85));
  bed.add(box(0.5, 0.12, 0.6, M(0xffffff), 3.0, 0.62, 1.55));
  bed.userData.note = 'bed';
  scene.add(bed);
}
{ // blankets + rugs
  const old = new THREE.Group();
  old.add(box(1.1, 0.1, 1.42, M(0x7a8ba8), 2.15, 0.58, 1.2));
  old.add(box(1.1, 0.06, 1.42, M(0x94a5c4), 2.15, 0.62, 1.2));
  registerFade(old, 2004, 2017);
  const neu = new THREE.Group();
  neu.add(box(1.15, 0.1, 0.44, M(0x3a4356), 2.12, 0.58, 1.2));
  neu.add(box(0.5, 0.09, 0.5, M(0xd97b4f), 2.3, 0.6, 1.5));
  registerFade(neu, 2017, 2026);
  const rugA = new THREE.Group();
  rugA.add(box(3.2, 0.02, 2.2, M(0xa8442f, { roughness: 1 }), 0.2, 0.012, 0.7));
  rugA.add(box(2.6, 0.024, 1.6, M(0xc97b4a, { roughness: 1 }), 0.2, 0.013, 0.7));
  registerFade(rugA, 2004, 2013);
  const rugB = new THREE.Group();
  rugB.add(box(3.4, 0.02, 2.4, M(0x4a5266, { roughness: 1 }), 0.2, 0.012, 0.7));
  rugB.add(box(2.9, 0.024, 1.9, M(0x39415a, { roughness: 1 }), 0.2, 0.013, 0.7));
  rugB.add(box(2.2, 0.026, 1.3, M(0x5d6a8a, { roughness: 1 }), 0.2, 0.014, 0.7));
  registerFade(rugB, 2013, 2026);
}

/* ---------- desks & chairs ---------- */
function deskUnit(w, topC, legC) {
  const g = new THREE.Group();
  g.add(box(w, 0.06, 0.8, M(topC), 0.7, 0.74, -2.55));
  g.add(box(0.06, 0.71, 0.7, M(legC), 0.7 - w / 2 + 0.05, 0.36, -2.55));
  g.add(box(0.06, 0.71, 0.7, M(legC), 0.7 + w / 2 - 0.05, 0.36, -2.55));
  g.add(box(w - 0.2, 0.05, 0.3, M(legC), 0.7, 0.25, -2.7)); // cable tray / stretcher
  return g;
}
registerFade(deskUnit(1.4, 0xb98a52, 0x8a5f36), 2004, 2010);
registerFade(deskUnit(1.8, 0x6e4a2c, 0x3d2b1a), 2009, 2018);
registerFade(deskUnit(2.2, 0x2e3138, 0x1d1f24), 2017, 2026);

function woodChair() {
  const g = new THREE.Group();
  const wm = M(0x8a5f36);
  g.add(box(0.45, 0.05, 0.42, wm, 0, 0.46, 0));
  [[-0.19, -0.17], [0.19, -0.17], [-0.19, 0.17], [0.19, 0.17]]
    .forEach(([dx, dz]) => g.add(box(0.05, 0.46, 0.05, wm, dx, 0.23, dz)));
  g.add(box(0.42, 0.5, 0.05, wm, 0, 0.75, -0.19));
  const cushion = box(0.4, 0.05, 0.37, M(0x4a6a8a), 0, 0.5, 0);
  cushion.userData.note = 'chair'; g.add(cushion);
  return g;
}
function officeChair(gaming) {
  const g = new THREE.Group();
  const base = gaming ? M(0x22242a) : M(0x3a3f4a);
  const acc = gaming ? M(0xc0392b) : M(0x5a6a8a);
  g.add(cyl(0.04, 0.04, 0.4, M(0x888888, { metalness: 0.7, roughness: 0.35 }), 0, 0.28, 0, 10));
  for (let i = 0; i < 5; i++) {
    const leg = box(0.3, 0.04, 0.06, M(0x555555, { metalness: 0.6, roughness: 0.4 }), 0, 0.06, 0, i * Math.PI * 2 / 5);
    leg.position.x = Math.cos(i * Math.PI * 2 / 5) * 0.15;
    leg.position.z = Math.sin(i * Math.PI * 2 / 5) * 0.15;
    g.add(leg);
  }
  const seat = box(0.5, 0.09, 0.48, base, 0, 0.52, 0);
  seat.userData.note = 'chair'; g.add(seat);
  const back = box(0.48, gaming ? 0.75 : 0.6, 0.09, base, 0, gaming ? 1.0 : 0.9, -0.26);
  back.userData.note = 'chair'; g.add(back);
  if (gaming) {
    const pil = box(0.24, 0.12, 0.06, acc, 0, 1.28, -0.22);
    pil.userData.note = 'chair'; g.add(pil);
    g.add(box(0.46, 0.1, 0.05, acc, 0, 0.72, -0.24));
  }
  g.add(box(0.06, 0.2, 0.3, base, -0.28, 0.66, 0));
  g.add(box(0.06, 0.2, 0.3, base, 0.28, 0.66, 0));
  return g;
}
[[woodChair(), 2004, 2010], [officeChair(false), 2009, 2018], [officeChair(true), 2017, 2026]]
  .forEach(([c, a, b]) => { c.position.set(0.7, 0, -1.5); c.rotation.y = Math.PI; registerFade(c, a, b); });

/* ---------- screens ---------- */
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 512; screenCanvas.height = 320;
const engine = createScreenEngine(screenCanvas);
const screenTex = new THREE.CanvasTexture(screenCanvas);
screenTex.colorSpace = THREE.SRGBColorSpace;
function mainScreen(w, h) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: screenTex }));
  m.userData.note = 'screen';
  return m;
}
function sideScreen(w, h, era) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 160;
  paintSide(c, era);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t }));
  m.userData.note = 'screen';
  return m;
}
function lcdFrame(w, h) {
  const g = new THREE.Group();
  g.add(box(w + 0.06, h + 0.06, 0.05, M(0x1a1c20, { roughness: 0.5 }), 0, 0, -0.01));
  const s = mainScreen(w, h); s.position.z = 0.02; g.add(s);
  g.add(box(0.07, 0.3, 0.06, M(0x1a1c20), 0, -h / 2 - 0.15, -0.02));
  g.add(box(0.4, 0.03, 0.3, M(0x1a1c20), 0, -h / 2 - 0.3, 0.05));
  return g;
}
function keyboard(style) {
  const g = new THREE.Group();
  const base = style === 'beige' ? M(0xd8cfb8) : style === 'mech' ? M(0x2a2d34) : M(0x1d1f24);
  g.add(box(0.46, 0.025, 0.16, base, 0, 0, 0));
  if (style === 'mech') {
    for (let i = 0; i < 6; i++)
      g.add(box(0.05, 0.032, 0.05,
        M([0xc0392b, 0xe67e22, 0xf1c40f, 0x27ae60, 0x2980b9, 0x8e44ad][i]), -0.18 + i * 0.072, 0.004, -0.045));
  }
  return g;
}
function mouse(style) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2),
    style === 'beige' ? M(0xd8cfb8) : M(0x22242a));
  m.scale.set(1, 0.7, 1.35); m.castShadow = true;
  return m;
}
function speakers(color) {
  const g = new THREE.Group();
  [-0.5, 0.5].forEach(dx => {
    g.add(box(0.09, 0.24, 0.1, M(color), dx, 0.12, 0));
    const cone = cyl(0.035, 0.035, 0.02, M(0x111111), dx, 0.1, 0.055, 12);
    cone.rotation.x = Math.PI / 2; g.add(cone);
  });
  return g;
}
function towerPC(style, era) {
  const g = new THREE.Group();
  if (style === 'beige') {
    const t = box(0.22, 0.5, 0.45, M(0xd8cfb8), 0, 0.25, 0);
    t.userData.note = 'tower'; g.add(t);
    g.add(box(0.2, 0.06, 0.02, M(0xb8ad94), 0, 0.38, 0.23));
    g.add(box(0.2, 0.06, 0.02, M(0xb8ad94), 0, 0.3, 0.23));
  } else {
    const t = box(0.22, 0.52, 0.46, M(0x141518, { roughness: 0.4 }), 0, 0.26, 0);
    t.userData.note = 'tower'; g.add(t);
    if (style === 'glass') {
      const fan = new THREE.Mesh(new THREE.CircleGeometry(0.07, 20),
        new THREE.MeshBasicMaterial({ color: era >= 4 ? 0x7fd4ff : 0xff9d4d }));
      fan.position.set(-0.111, 0.3, 0); fan.rotation.y = -Math.PI / 2; g.add(fan);
      const strip = box(0.005, 0.4, 0.02, new THREE.MeshBasicMaterial({
        color: era >= 4 ? 0x7fd4ff : 0xff9d4d,
      }), -0.112, 0.26, 0.15);
      strip.castShadow = false; g.add(strip);
    } else {
      g.add(box(0.02, 0.3, 0.3, M(0x2a2d34), -0.1, 0.26, 0));
    }
  }
  return g;
}

/* ---------- era equipment (crossfading) ---------- */
function placeOnDesk(g, x, z, y = DESK_Y, ry = 0) {
  g.position.x += x; g.position.y += y; g.position.z += z; g.rotation.y = ry;
  return g;
}
{ // 2005: beige keyboard + ball mouse + speakers (CRT separate)
  const g = new THREE.Group();
  g.add(placeOnDesk(keyboard('beige'), 0.7, -2.5));
  const ms = mouse('beige'); ms.position.set(1.05, DESK_Y + 0.02, -2.45); g.add(ms);
  g.add(placeOnDesk(speakers(0xcabf9f), 0.7, -2.75));
  const tw = towerPC('beige'); tw.position.set(1.75, 0, -2.5); g.add(tw);
  g.add(placeOnDesk(box(0.3, 0.06, 0.22, M(0x9a4a3a), -0.0, -2.5), 0.05, -2.5)); // game discs pile
  const cup = cyl(0.035, 0.028, 0.09, M(0xd94f3d), 0.15, DESK_Y + 0.045, -2.35, 12);
  cup.userData.note = 'deskbits'; g.add(cup); // instant noodles
  registerFade(g, 2004, 2009);
}
{ // 2009: first LCD 19 + black tower + laptop slab
  const g = new THREE.Group();
  const mon = lcdFrame(0.42, 0.27); mon.position.set(0.7, DESK_Y + 0.45, -2.72); g.add(mon);
  g.add(placeOnDesk(keyboard('black'), 0.7, -2.45));
  const ms = mouse('black'); ms.position.set(1.05, DESK_Y + 0.02, -2.42); g.add(ms);
  g.add(placeOnDesk(speakers(0x1a1c20), 0.7, -2.78));
  const tw = towerPC('black'); tw.position.set(1.8, 0, -2.5); g.add(tw);
  const lap = box(0.34, 0.025, 0.24, M(0x2a2d34, { roughness: 0.4 }), 0.05, DESK_Y + 0.013, -2.4, 0.3);
  lap.userData.note = 'deskbits'; g.add(lap);
  registerFade(g, 2009, 2013);
}
{ // 2013: 24in + mech keyboard + headset + console on floor
  const g = new THREE.Group();
  const mon = lcdFrame(0.55, 0.34); mon.position.set(0.7, DESK_Y + 0.5, -2.74); g.add(mon);
  g.add(placeOnDesk(keyboard('mech'), 0.7, -2.42));
  const ms = mouse('black'); ms.position.set(1.08, DESK_Y + 0.02, -2.4); g.add(ms);
  const tw = towerPC('black'); tw.position.set(1.85, 0, -2.5); g.add(tw);
  const stand = cyl(0.02, 0.09, 0.26, M(0x22242a), 1.35, DESK_Y + 0.13, -2.7, 12);
  g.add(stand);
  const hs = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.02, 10, 20, Math.PI),
    M(0xc0392b));
  hs.position.set(1.35, DESK_Y + 0.3, -2.7); hs.castShadow = true; g.add(hs);
  const con = box(0.34, 0.09, 0.24, M(0x141518, { roughness: 0.4 }), -0.5, 0.28, -2.5);
  con.userData.note = 'console'; g.add(con);
  const pad = box(0.14, 0.04, 0.1, M(0x2a2d34), -0.5, 0.36, -2.5);
  pad.userData.note = 'console'; g.add(pad);
  registerFade(g, 2013, 2017);
}
{ // 2017: dual 24in + glass tower + lamp
  const g = new THREE.Group();
  const a = lcdFrame(0.55, 0.34); a.position.set(0.42, DESK_Y + 0.5, -2.72); a.rotation.y = 0.12; g.add(a);
  const b = lcdFrame(0.55, 0.34);
  b.position.set(1.02, DESK_Y + 0.5, -2.72); b.rotation.y = -0.12;
  g.add(b);
  g.add(placeOnDesk(keyboard('mech'), 0.62, -2.4));
  const ms = mouse('black'); ms.position.set(1.05, DESK_Y + 0.02, -2.38); g.add(ms);
  g.add(placeOnDesk(box(0.8, 0.005, 0.3, M(0x1d1f24, { roughness: 1 }), 0.68, -2.42), 0, 0, 0)); // pad
  const tw = towerPC('glass', 3); tw.position.set(1.9, 0, -2.45); tw.rotation.y = -0.35; g.add(tw);
  g.add(placeOnDesk(speakers(0x1a1c20), 0.7, -2.78));
  const arm = box(0.04, 0.04, 0.5, M(0x333333), 1.5, DESK_Y + 0.35, -2.6);
  arm.rotation.y = 0.4; g.add(arm);
  const shade = cyl(0.09, 0.13, 0.14, M(0xd9a45b, { emissive: 0xffbe6e, emissiveIntensity: 0.7 }), 1.32, DESK_Y + 0.32, -2.5, 14);
  shade.userData.note = 'deskbits'; g.add(shade);
  registerFade(g, 2017, 2021);
}
{ // 2021: 27in + vertical side + stream mic + strip
  const g = new THREE.Group();
  const mon = lcdFrame(0.62, 0.37); mon.position.set(0.62, DESK_Y + 0.52, -2.74); g.add(mon);
  const side = sideScreen(0.24, 0.4, 4); side.position.set(1.18, DESK_Y + 0.48, -2.7);
  side.rotation.y = -0.3; g.add(side);
  g.add(placeOnDesk(keyboard('mech'), 0.6, -2.4));
  const ms = mouse('black'); ms.position.set(1.0, DESK_Y + 0.02, -2.38); g.add(ms);
  const tw = towerPC('glass', 4); tw.position.set(1.95, 0, -2.45); tw.rotation.y = -0.35; g.add(tw);
  const pole = cyl(0.02, 0.02, 0.5, M(0x222222), 0.05, DESK_Y + 0.25, -2.75, 8);
  g.add(pole);
  const mic = cyl(0.045, 0.045, 0.16, M(0x2a6ad9, { roughness: 0.5 }), 0.05, DESK_Y + 0.52, -2.7, 12);
  mic.userData.note = 'mic'; g.add(mic);
  const hs = box(0.1, 0.26, 0.1, M(0x22242a), 1.5, DESK_Y + 0.13, -2.7);
  hs.userData.note = 'deskbits'; g.add(hs);
  const strip = box(2.0, 0.03, 0.03, new THREE.MeshBasicMaterial({ color: 0xffc98a }), 0.7, DESK_Y - 0.06, -2.93);
  strip.castShadow = false; g.add(strip);
  registerFade(g, 2021, 2023.5);
}
{ // 2025: ultrawide + tablet + tidy desk
  const g = new THREE.Group();
  const uw = lcdFrame(0.85, 0.36); uw.position.set(0.62, DESK_Y + 0.56, -2.74); g.add(uw);
  g.add(box(0.34, 0.02, 0.24, M(0x1d1f24), 0.62, DESK_Y + 0.06, -2.82));
  const tab = sideScreen(0.26, 0.18, 5); tab.position.set(1.25, DESK_Y + 0.3, -2.6);
  tab.rotation.y = -0.45; tab.rotation.x = -0.15; g.add(tab);
  g.add(placeOnDesk(keyboard('low'), 0.6, -2.38));
  const ms = mouse('black'); ms.position.set(1.02, DESK_Y + 0.02, -2.36); g.add(ms);
  const tw = towerPC('glass', 5); tw.position.set(1.95, 0, -2.45); tw.rotation.y = -0.35; g.add(tw);
  const pole = cyl(0.02, 0.02, 0.5, M(0x222222), 0.0, DESK_Y + 0.25, -2.78, 8);
  g.add(pole);
  const mic = cyl(0.045, 0.045, 0.16, M(0xe8e2d4, { roughness: 0.5 }), 0.0, DESK_Y + 0.52, -2.72, 12);
  mic.userData.note = 'mic'; g.add(mic);
  const pot = cyl(0.05, 0.04, 0.09, M(0xb5654a), 1.45, DESK_Y + 0.045, -2.7, 12);
  g.add(pot);
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 6), M(0x4a7a3f));
  leaf.position.set(1.45, DESK_Y + 0.16, -2.7); leaf.castShadow = true; g.add(leaf);
  const strip = box(2.0, 0.03, 0.03, new THREE.MeshBasicMaterial({ color: 0xfff1dd }), 0.7, DESK_Y - 0.06, -2.93);
  strip.castShadow = false; g.add(strip);
  registerFade(g, 2023.5, 2026);
}

/* CRT: desk star 2005-2013, then retired to the corner */
{
  const desk = new THREE.Group();
  const bodyM = M(0xd8cfb8);
  desk.add(box(0.44, 0.36, 0.4, bodyM, 0, 0.18, 0));
  const scr = mainScreen(0.34, 0.26); scr.position.set(0, 0.2, 0.205); desk.add(scr);
  desk.add(box(0.2, 0.06, 0.2, M(0xb8ad94), 0, -0.03, 0.05));
  desk.position.set(0.7, DESK_Y + 0.06, -2.7);
  registerFade(desk, 2004, 2013);
  const corner = new THREE.Group();
  corner.add(box(0.44, 0.36, 0.4, M(0xc4b89e), 0, 0.42, 0));
  const scr2 = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.26),
    new THREE.MeshBasicMaterial({ color: 0x0c0e12 }));
  scr2.position.set(0, 0.44, 0.205); corner.add(scr2);
  corner.add(box(0.5, 0.3, 0.46, M(0xa8824f, { roughness: 1 }), 0, 0.15, 0));
  corner.position.set(-2.9, 0, 1.9); corner.rotation.y = 0.5;
  corner.userData.note = 'crt';
  registerFade(corner, 2013, 2026);
}

/* ---------- keepsakes: alarm, doll, gamepad (movable, always present) ---------- */
const alarm = new THREE.Group();
alarm.add(box(0.12, 0.1, 0.06, M(0x3a6ad9, { roughness: 0.5 }), 0, 0.05, 0));
const alarmFace = cyl(0.035, 0.035, 0.012, M(0xf2ede2), 0, 0.055, 0.032, 16);
alarmFace.rotation.x = Math.PI / 2;
alarm.add(alarmFace);
alarm.add(cyl(0.008, 0.008, 0.05, M(0x888888), -0.05, 0.12, 0, 6));
alarm.add(cyl(0.008, 0.008, 0.05, M(0x888888), 0.05, 0.12, 0, 6));
alarm.userData.note = 'alarm';
addMover(alarm, [
  { y: 2005, p: [0.15, DESK_Y, -2.6], ry: 0.2 },
  { y: 2013, p: [0.15, DESK_Y, -2.6], ry: 0.2 },
  { y: 2017, p: [-2.5, 1.62, -2.7], ry: 0 },
  { y: 2025, p: [-2.5, 1.62, -2.7], ry: 0 },
]);
const doll = new THREE.Group();
{
  const fm = M(0xc98d5f);
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 14, 12), fm);
  b.position.y = 0.1; b.castShadow = true; doll.add(b);
  const h = new THREE.Mesh(new THREE.SphereGeometry(0.06, 14, 12), fm);
  h.position.y = 0.22; h.castShadow = true; doll.add(h);
  doll.add(box(0.05, 0.08, 0.03, M(0x8a4a3a), -0.1, 0.1, 0));
  doll.add(box(0.05, 0.08, 0.03, M(0x8a4a3a), 0.1, 0.1, 0));
  const e1 = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6),
    new THREE.MeshBasicMaterial({ color: 0x222222 }));
  e1.position.set(-0.022, 0.23, 0.05); doll.add(e1);
  const e2 = e1.clone(); e2.position.x = 0.022; doll.add(e2);
  doll.userData.note = 'doll';
}
addMover(doll, [
  { y: 2005, p: [2.9, 0.68, 1.7], ry: -0.4 },
  { y: 2013, p: [2.9, 0.68, 1.7], ry: -0.4 },
  { y: 2017, p: [-1.95, 1.28, -2.7], ry: 0.3 },
  { y: 2021, p: [-1.95, 1.28, -2.7], ry: 0.3 },
  { y: 2025, p: [1.5, DESK_Y, -2.75], ry: -0.3 },
]);
function gamepad(color) {
  const g = new THREE.Group();
  g.add(box(0.16, 0.06, 0.1, M(color, { roughness: 0.5 }), 0, 0.03, 0));
  g.add(box(0.05, 0.09, 0.06, M(color, { roughness: 0.5 }), -0.08, 0.0, 0.02, 0.3));
  g.add(box(0.05, 0.09, 0.06, M(color, { roughness: 0.5 }), 0.08, 0.0, 0.02, -0.3));
  return g;
}
{
  const d = gamepad(0xd8d2c2);
  d.children.forEach(n => n.userData.note = 'gamepad');
  d.position.set(1.3, DESK_Y, -2.5);
  registerFade(d, 2004, 2013);
  const hook = gamepad(0xd8d2c2);
  hook.children.forEach(n => n.userData.note = 'gamepad');
  const nail = box(0.02, 0.02, 0.08, M(0x888888), -1.3, 1.9, -2.96);
  const hg = new THREE.Group(); hg.add(nail); hg.add(hook);
  hook.position.set(-1.3, 1.78, -2.93);
  registerFade(hg, 2013, 2026);
}

/* ---------- shelf + collections ---------- */
const shelfM = M(0x6e4a2c);
{
  const s = new THREE.Group();
  s.add(box(0.05, 1.9, 0.35, shelfM, -3.05, 0.95, -2.7));
  s.add(box(0.05, 1.9, 0.35, shelfM, -1.55, 0.95, -2.7));
  [0.1, 0.62, 1.14, 1.66, 1.92].forEach(y => s.add(box(1.55, 0.05, 0.35, shelfM, -2.3, y, -2.7)));
  scene.add(s);
}
function bookRow(n, w, palette, y, x0) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const h = 0.24 + ((i * 37) % 10) * 0.012;
    g.add(box(0.045, h, 0.2, M(palette[i % palette.length]), x0 + i * 0.052, y + h / 2, -2.7));
  }
  return g;
}
{
  const a = new THREE.Group();
  a.add(bookRow(9, 0, [0x8a4a3a, 0x4a6a8a, 0x6a8a4a, 0xb98a52], 0.125, -2.95));
  for (let i = 0; i < 5; i++)
    a.add(box(0.16, 0.025, 0.16, M(0xd8d2c2), -2.6 + i * 0.02, 0.66 + i * 0.028, -2.7, 0.15 * i));
  a.add(box(0.4, 0.3, 0.3, M(0xa8824f, { roughness: 1 }), -2.7, 1.32, -2.7));
  a.add(box(0.34, 0.24, 0.26, M(0xb08a58, { roughness: 1 }), -2.65, 1.56, -2.7, 0.2));
  a.userData.note = 'collection';
  registerFade(a, 2004, 2013);
  const b = new THREE.Group();
  b.add(bookRow(6, 0, [0x2a4a6a, 0x6a2a4a, 0x2a6a4a], 0.125, -2.95));
  for (let i = 0; i < 8; i++)
    b.add(box(0.03, 0.19, 0.14, M([0xc0392b, 0x2980b9, 0x27ae60, 0xf1c40f][i % 4]), -2.5 + i * 0.035, 0.74, -2.7));
  [[-2.85, 0xc0392b], [-2.6, 0x2980b9], [-2.35, 0x27ae60]].forEach(([x, c]) => {
    b.add(cyl(0.05, 0.06, 0.12, M(c, { roughness: 0.4 }), x, 1.25, -2.7, 10));
    const hd = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 10), M(0xe8c39a));
    hd.position.set(x, 1.35, -2.7); hd.castShadow = true; b.add(hd);
  });
  const cup = cyl(0.05, 0.035, 0.14, M(0xd9a441, { metalness: 0.6, roughness: 0.3 }), -1.95, 1.25, -2.7, 14);
  b.add(cup);
  b.userData.note = 'collection';
  registerFade(b, 2013, 2021);
  const c = new THREE.Group();
  c.add(bookRow(4, 0, [0x39415a, 0x5d6a8a, 0x8a94a8], 0.125, -2.95));
  c.add(box(0.3, 0.22, 0.24, M(0x8a94a8, { roughness: 1 }), -2.4, 0.75, -2.7));
  const frame = box(0.2, 0.15, 0.02, M(0x2a2d34), -2.0, 1.28, -2.62);
  c.add(frame);
  const pot = cyl(0.06, 0.05, 0.1, M(0xb5654a), -2.85, 1.24, -2.7, 12);
  c.add(pot);
  const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), M(0x4a7a3f));
  leaf.position.set(-2.85, 1.38, -2.7); leaf.castShadow = true; c.add(leaf);
  c.userData.note = 'collection';
  registerFade(c, 2021, 2026);
}
function carton(w, h, d, x, y, z, ry = 0) {
  const g = new THREE.Group();
  g.add(box(w, h, d, M(0xa8824f, { roughness: 1 }), 0, h / 2, 0));
  g.add(box(w + 0.005, 0.02, d + 0.005, M(0x8a6a3f), 0, h - 0.01, 0));
  g.position.set(x, y, z); g.rotation.y = ry;
  return g;
}
{
  const pile = new THREE.Group();
  const p1 = carton(0.55, 0.4, 0.5, -2.9, 0, 1.9, 0.2); p1.userData.note = 'boxes'; pile.add(p1);
  const p2 = carton(0.45, 0.32, 0.42, -2.85, 0.4, 1.85, -0.15); p2.userData.note = 'boxes'; pile.add(p2);
  const p3 = carton(0.4, 0.28, 0.38, -2.3, 0, 2.1, 0.5); p3.userData.note = 'boxes'; pile.add(p3);
  registerFade(pile, 2009, 2021);
  const tidy = new THREE.Group();
  const t1 = carton(0.5, 0.35, 0.45, -2.9, 0, 1.95, 0.1); t1.userData.note = 'boxes'; tidy.add(t1);
  const t2 = carton(0.45, 0.3, 0.4, -2.88, 0.35, 1.93, -0.08); t2.userData.note = 'boxes'; tidy.add(t2);
  registerFade(tidy, 2021, 2026);
  const vr = new THREE.Group();
  vr.add(box(0.5, 0.35, 0.4, M(0x2a4a8a, { roughness: 0.8 }), 0, 0.175, 0));
  const vrl = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.15),
    new THREE.MeshBasicMaterial({ map: posterTex('VR', '另一个世界', '#2a4a8a', '#7fd4ff') }));
  vrl.position.set(0, 0.2, 0.205); vr.add(vrl);
  vr.position.set(-0.6, 0, -2.4);
  vr.userData.note = 'console';
  registerFade(vr, 2017, 2023);
  const con = new THREE.Group();
  const cb = box(0.36, 0.09, 0.26, M(0x141518, { roughness: 0.4 }), -0.5, 0.3, -2.5);
  cb.userData.note = 'console'; con.add(cb);
  con.add(box(0.3, 0.18, 0.05, M(0x1d1f24), -0.5, 0.12, -2.55));
  registerFade(con, 2013, 2026);
}

/* ---------- wall decor ---------- */
{
  const paper = new THREE.Group();
  const arts = [
    ['仙剑', '2005 · 李逍遥', '#8a2a2a', '#e8b64c'],
    ['CS', '2005 · de_dust2', '#c9a13b', '#5a3a1a'],
    ['魔兽', '2006 · 联盟', '#2a4a8a', '#9fd4ff'],
  ];
  arts.forEach(([t, s, bg, fg], i) => {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.66),
      new THREE.MeshBasicMaterial({ map: posterTex(t, s, bg, fg, [1, 1]) }));
    p.position.set(-0.7 + i * 0.62, 2.0, -2.99); p.rotation.z = (i - 1) * 0.03;
    p.userData.note = i === 0 ? 'poster' : 'poster2';
    paper.add(p);
  });
  registerFade(paper, 2004, 2013);
  const framed = new THREE.Group();
  const f1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.66),
    new THREE.MeshBasicMaterial({ map: posterTex('仙剑', '2005 · 第一张海报', '#8a2a2a', '#e8b64c', [1, 1]) }));
  f1.position.set(-0.7, 2.0, -2.98); f1.userData.note = 'poster'; framed.add(f1);
  framed.add(box(0.56, 0.72, 0.03, M(0x3a2c1c), -0.7, 2.0, -3.0));
  const f2 = new THREE.Mesh(new THREE.PlaneGeometry(0.56, 0.4),
    new THREE.MeshBasicMaterial({ map: posterTex('冠军', '2016 · 网吧赛', '#2a4a6a', '#f1c40f', [1]) }));
  f2.position.set(0.15, 2.0, -2.98); f2.userData.note = 'poster2'; framed.add(f2);
  framed.add(box(0.62, 0.46, 0.03, M(0x22242a), 0.15, 2.0, -3.0));
  registerFade(framed, 2013, 2026);
  const ac = new THREE.Group();
  for (let i = 0; i < 6; i++)
    ac.add(box(0.4, 0.4, 0.05, M(i % 2 ? 0x39415a : 0x2e3442, { roughness: 1 }),
      2.2 + (i % 3) * 0.44, 1.9 - Math.floor(i / 3) * 0.44, -2.98));
  ac.userData.note = 'acoustic';
  registerFade(ac, 2017, 2026);
  const plant = new THREE.Group();
  plant.add(cyl(0.14, 0.11, 0.24, M(0xb5654a), 3.1, 0.12, -2.5, 14));
  const bush = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), M(0x3f6e38, { roughness: 1 }));
  bush.position.set(3.1, 0.55, -2.5); bush.castShadow = true; plant.add(bush);
  const bush2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), M(0x4a7a3f, { roughness: 1 }));
  bush2.position.set(3.0, 0.8, -2.45); bush2.castShadow = true; plant.add(bush2);
  plant.userData.note = 'plant';
  registerFade(plant, 2021, 2026);
}

/* ---------- notes ---------- */
function eraIdx(year) {
  let bi = 0;
  ERAS.forEach((e, i) => { if (Math.abs(year - e) < Math.abs(year - ERAS[bi])) bi = i; });
  return bi;
}
const NOTES = {
  screen: {
    t: () => '电脑屏幕 ✦', tag: y => `${Math.round(y)} · ${ERA_GAMES[eraIdx(y)]}`,
    b: y => {
      const i = eraIdx(y);
      return [
        '2005 年攒的第一台兼容机，800×600。每天 Canada 干道混战，战绩––但快乐拉满。',
        '上了 19 寸液晶，魔兽世界排队三小时也要等。室友带炒饭，公会开荒。',
        '机械键盘噼啪响，单双排上钻。网吧赛拿了第三，奖品是这块键盘。',
        '双屏：左边打单，右边看直播。吃鸡四排缺一，今晚八点开播。',
        '开始做视频：录像、剪辑、投稿。联机三年的存档，比奖杯更舍不得删。',
        '曲面带鱼屏剪片打单都舒服。186GB 二十年存档全在云里，但这台老显示器还留着。',
      ][i] + '\n\n点击屏幕：在桌面 / 小游戏之间切换。';
    },
  },
  tower: {
    t: () => '主机', tag: y => `${Math.round(y)} · 从兼容机到分体水冷`,
    b: y => [
      '米黄色大头机箱，侧板永远盖不上——因为总在换内存条。',
      '黑色机箱配了 19 寸液晶，开机要先拍一下才转。',
      '侧透机箱，第一次走背线，理线理到半夜两点。',
      '加了玻璃侧板和小夜灯，风扇声是深夜的白噪音。',
      '为了剪视频加的内存和硬盘，机箱里一半是工作，一半是青春。',
      '现在的 Extension：旧主机退役前，把二十年存档全导了出来。',
    ][eraIdx(y)],
  },
  alarm: {
    t: () => '蓝色小闹钟 ✦', tag: () => '2005 — 2025 · 贯穿二十年的信物',
    b: y => y < 2015
      ? '高中时母亲买的，每天六点半叫起床。后来改叫七点——为了抢开服。\n它走时总是快五分钟，像在替我着急。'
      : '搬了三次家，它一直在。电池换了无数次，铃声越来越哑。\n现在它站在书架上，负责提醒：十二点前睡觉。',
  },
  doll: {
    t: () => '旧玩偶 ✦', tag: () => '2005 — 2025 · 贯穿二十年的信物',
    b: y => y < 2015
      ? '表姐送的生日礼物， shelters 在床头。打输了就把它转过去——不许看。'
      : '耳朵缝过两次，肚子里的棉花换过一次。\n朋友说扔了吧，我说：它看过我所有段位。',
  },
  gamepad: {
    t: () => '第一个手柄 ✦', tag: () => '2005 — 2025 · 贯穿二十年的信物',
    b: y => y < 2015
      ? '攒钱三个月买的，摇杆已经有点飘。和发小搓实况的那个暑假，它立了大功。'
      : '退役了，挂在墙上。摇杆的漂移还在，像一句没说完的话。\n新来的精英手柄很精准，但这个最顺手——是手的记忆。',
  },
  poster: {
    t: () => '第一张海报 ✦', tag: () => '2005 — 2025 · 贯穿二十年的信物',
    b: y => y < 2015
      ? '杂志附赠，用胶带贴歪了也不舍得撕。仙剑，李逍遥，2005 年的夏天。'
      : '当年那张纸起边了，找画店花了 80 块装裱。\n旁边是网吧赛的奖状：第三名，也很好。',
  },
  poster2: {
    t: () => '墙上的纸', tag: y => `${Math.round(y)} · 收藏`,
    b: y => '打印的地图、抄的秘籍、比赛的奖状。\n墙面是硬盘之外的第二个存档位。',
  },
  collection: {
    t: () => '书架 / 收藏', tag: y => `${Math.round(y)} · 收藏`,
    b: y => [
      '教科书和游戏碟混放，盗版碟用记号笔写着名字。最宝贝的是那几张正版。',
      '开始买正版和设定集。手办是第一个，是攒了半年钱的生日礼物。',
      '奖杯、设定集、手办：收藏从“玩”变成了“记得”。',
    ][Math.min(2, eraIdx(y) >> 1)],
  },
  boxes: {
    t: () => '角落的纸箱', tag: y => `${Math.round(y)} · 旧物中转站`,
    b: y => y < 2017
      ? '装着旧键盘、旧鼠标、缠在一起的数据线。扔不掉——“万一哪天用得上”。'
      : '搬家时整箱搬走，整箱搬回。\n里面有一张 2005 年的网费收据，和一张写满密码的纸。',
  },
  chair: {
    t: () => '椅子', tag: y => `${Math.round(y)} · 腰的编年史`,
    b: y => [
      '餐椅客串电竞椅，屁股底下垫着棉垫。一坐就是通宵，腰还很好。',
      '网吧同款人体工学椅，二手市场淘的。扶手掉了漆，坐上去吱呀响。',
      '第一把真正的电竞椅。腰不行了，靠枕、脚托、升降桌全配齐。',
    ][Math.min(2, eraIdx(y) >> 1)],
  },
  console: {
    t: () => '游戏机', tag: y => `${Math.round(y)} · 客厅的延伸`,
    b: y => '从 2013 年起，电视进不了卧室，主机就先进来了。\n体感游戏教会了全家人：打游戏也会出汗。',
  },
  mic: {
    t: () => '麦克风', tag: () => '2021 — · 新身份',
    b: () => '2021 年开始直播和做视频，它成了饭碗。\n防喷罩上有口水渍——那是深夜解说的证据。',
  },
  deskbits: {
    t: () => '桌上的小东西', tag: y => `${Math.round(y)} · 生活气息`,
    b: y => y < 2015
      ? '康师傅杯面 + 网吧纸巾。深夜的仪式感：泡面三分钟，正好排一局。'
      : '保温杯代替了杯面，耳机有了自己的架子。\n长大就是：东西都有了固定的家。',
  },
  bed: {
    t: () => '床', tag: y => `${Math.round(y)} · 作息表`,
    b: y => y < 2017
      ? '床和桌子只隔一步：困了就睡，醒了就打。被子是蓝的，和闹钟一个颜色。'
      : '作息表贴在床头：十二点前睡。\n很少做到了，但床单终于换成了深色——耐脏，也耐看。',
  },
  crt: {
    t: () => '大头显示器', tag: () => '2005 — 2013 · 光荣退役',
    b: () => '17 寸球面 CRT，重 15 公斤，开机“嗡”一声。\n退役后在角落吃灰，开机画面还停在 2012 年。\n没扔：它是这个房间的“第一块砖”。',
  },
  acoustic: {
    t: () => '吸音板', tag: () => '2017 — · 认真起来的标志',
    b: () => '开始直播后贴的，楼下再也没敲过暖气管。\n隔音的是声音，隔不断的是热闹。',
  },
  plant: {
    t: () => '绿植', tag: () => '2021 — · 新成员',
    b: () => '朋友乔迁送的，意外地活下来了。\n房间里唯一不需要电、却一直在生长的东西。',
  },
};

/* ---------- year state + UI ---------- */
let year = 2005, playing = false, lastApplied = -1, screenDirty = true;
const slider = document.getElementById('slider');
const yearEl = document.getElementById('year');
const eraEl = document.getElementById('era');
const playBtn = document.getElementById('play');
const info = document.getElementById('info');
const infoTitle = document.getElementById('info-title');
const infoTag = document.getElementById('info-tag');
const infoBody = document.getElementById('info-body');
try {
  const q = new URLSearchParams(location.search).get('year');
  if (q) year = Math.max(YMIN, Math.min(YMAX, parseFloat(q) || 2005));
} catch { /* file:// without query: ignore */ }

function applyYear(y) {
  lastApplied = y;
  for (const f of faders) {
    const k = windowK(y, f.from, f.to);
    f.obj.visible = k > 0.02;
    if (f.obj.visible) f.mats.forEach(({ m, base }) => { m.opacity = base * k; });
  }
  applyMovers(y);
  const t = (y - YMIN) / (YMAX - YMIN);
  sun.intensity = 1.6 - t * 0.25;
  lampLight.intensity = 12 + t * 5;
  const i = eraIdx(y);
  if (i !== engine.state.era) { engine.setEra(i); screenDirty = true; }
  yearEl.textContent = Math.round(y);
  eraEl.textContent = ERA_NAMES[i];
  if (document.activeElement !== slider) slider.value = y;
}
function setPlaying(p) {
  playing = p;
  playBtn.textContent = p ? '⏸' : '▶';
  playBtn.setAttribute('aria-label', p ? '暂停自动播放' : '自动播放');
}
playBtn.addEventListener('click', () => {
  if (!playing && year >= YMAX - 0.01) year = YMIN;
  setPlaying(!playing);
});
slider.addEventListener('input', () => { year = parseFloat(slider.value); setPlaying(false); });
document.querySelectorAll('#ticks span').forEach(s =>
  s.addEventListener('click', () => { year = parseFloat(s.dataset.y); setPlaying(false); }));

let camAnim = null;
function flyTo(px, py, pz, tx, ty, tz) {
  camAnim = {
    t: 0, dur: 1.1,
    fp: camera.position.clone(), tp: new THREE.Vector3(px, py, pz),
    ft: controls.target.clone(), tt: new THREE.Vector3(tx, ty, tz),
  };
}
document.getElementById('btn-wide').addEventListener('click', () => flyTo(5.2, 3.8, 6.2, 0, 1, 0));
document.getElementById('btn-desk').addEventListener('click', () => flyTo(1.9, 1.9, 0.6, 0.65, 1.0, -2.5));
document.getElementById('info-close').addEventListener('click', () => info.classList.remove('show'));
function showNote(id) {
  const n = NOTES[id];
  if (!n) return;
  infoTitle.textContent = n.t();
  infoTag.textContent = n.tag(year);
  infoBody.textContent = n.b(year);
  info.classList.add('show');
}

/* picking (click, not drag) */
const ray = new THREE.Raycaster();
const ptr = new THREE.Vector2();
let downX = 0, downY = 0;
renderer.domElement.addEventListener('pointerdown', e => { downX = e.clientX; downY = e.clientY; });
renderer.domElement.addEventListener('pointerup', e => {
  if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return;
  ptr.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ptr, camera);
  const hits = ray.intersectObjects(scene.children, true);
  for (const h of hits) {
    let o = h.object;
    while (o && !o.userData.note) o = o.parent;
    if (o && o.visible) {
      const id = o.userData.note;
      if (id === 'screen') { engine.toggle(); slider.blur(); screenDirty = true; }
      else showNote(id);
      return;
    }
  }
});
renderer.domElement.addEventListener('pointermove', e => {
  if (engine.state.mode === 'game')
    engine.movePaddle(e.clientX, renderer.domElement.getBoundingClientRect());
});
window.addEventListener('keydown', e => {
  if (engine.state.mode !== 'game') return;
  if (e.code === 'ArrowLeft') { engine.nudge(-1); e.preventDefault(); }
  else if (e.code === 'ArrowRight') { engine.nudge(1); e.preventDefault(); }
  else if (e.code === 'Space') { engine.launch(); screenDirty = true; e.preventDefault(); }
});
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

/* ---------- loop ---------- */
slider.value = year;
applyYear(year);
const clock = new THREE.Clock();
let first = true;
function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.1);
  if (playing) {
    year += dt * 1.4;
    if (year >= YMAX) { year = YMAX; setPlaying(false); }
  }
  if (year !== lastApplied) applyYear(year);
  if (camAnim) {
    camAnim.t += dt;
    const k = sstep(Math.min(camAnim.t / camAnim.dur, 1), 0, 1);
    camera.position.lerpVectors(camAnim.fp, camAnim.tp, k);
    controls.target.lerpVectors(camAnim.ft, camAnim.tt, k);
    if (camAnim.t >= camAnim.dur) camAnim = null;
  }
  controls.update();
  if (engine.state.mode === 'game' || screenDirty) {
    engine.frame(dt);
    screenTex.needsUpdate = true;
    screenDirty = false;
  }
  renderer.render(scene, camera);
  if (first) {
    first = false;
    document.getElementById('loading').style.display = 'none';
  }
}
animate();
