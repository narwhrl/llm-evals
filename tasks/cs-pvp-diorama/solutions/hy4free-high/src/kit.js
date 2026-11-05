import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Toon gradient: four hard lighting bands give the "三渲二" cel-shaded look.
// ---------------------------------------------------------------------------
function gradientMap() {
  const data = new Uint8Array([64, 120, 190, 255]);
  const t = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  t.minFilter = THREE.NearestFilter;
  t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
}
export const GRADIENT = gradientMap();

// One shared dark outline material for every hard-surface edge.
export const OUTLINE = new THREE.LineBasicMaterial({ color: 0x0a1018, transparent: true, opacity: 0.92 });

// ---------------------------------------------------------------------------
// Procedural canvas textures (no external assets, all generated at runtime).
// ---------------------------------------------------------------------------
function makeCanvas(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  return c;
}
function toTex(c, { repeat = [1, 1], srgb = true, clamp = false } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  return t;
}
function paint(w, h, draw) {
  return toTex(makeCanvas(w, h, (g) => { g.clearRect(0, 0, w, h); draw(g, w, h); }), { clamp: true });
}
function weather(g, w, h, n = 180) {
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < n; i++) {
    g.globalAlpha = Math.random() * 0.55;
    g.fillRect(Math.random() * w, Math.random() * h, 1 + Math.random() * 3, 1 + Math.random() * 2);
  }
  g.globalAlpha = 1;
  g.globalCompositeOperation = 'source-over';
}
function noise(base, lightTint, darkTint, opts = {}) {
  const { dots = 2600, blotches = 32, repeat = [1, 1], grainLines = 0, lineColor = 'rgba(0,0,0,.28)' } = opts;
  return toTex(makeCanvas(256, 256, (g, w, h) => {
    g.fillStyle = base; g.fillRect(0, 0, w, h);
    for (let i = 0; i < blotches; i++) {
      const x = Math.random() * w, y = Math.random() * h, r = 12 + Math.random() * 48;
      const rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, Math.random() < 0.5 ? lightTint : darkTint);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    for (let i = 0; i < dots; i++) {
      g.fillStyle = Math.random() < 0.5 ? lightTint : darkTint;
      const s = 0.6 + Math.random() * 2.2;
      g.fillRect(Math.random() * w, Math.random() * h, s, s);
    }
    if (grainLines) {
      g.strokeStyle = lineColor; g.lineWidth = 1;
      for (let i = 0; i < grainLines; i++) {
        const x = Math.random() * w;
        g.beginPath(); g.moveTo(x, 0); g.lineTo(x + (Math.random() - 0.5) * 10, h); g.stroke();
      }
    }
  }), { repeat });
}

function siteMark(letter) {
  return paint(512, 512, (g, w, h) => {
    g.strokeStyle = '#e7edf2'; g.lineWidth = 15;
    for (const r of [198, 164]) { g.beginPath(); g.arc(256, 256, r, 0, Math.PI * 2); g.stroke(); }
    g.lineWidth = 9;
    for (let i = 0; i < 4; i++) {
      const a = i * Math.PI / 2;
      g.beginPath(); g.moveTo(256 + Math.cos(a) * 205, 256 + Math.sin(a) * 205);
      g.lineTo(256 + Math.cos(a) * 244, 256 + Math.sin(a) * 244); g.stroke();
    }
    g.fillStyle = '#e7edf2'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 188px Arial'; g.fillText(letter, 256, 226);
    g.font = 'bold 30px Arial'; g.fillText('BOMB SITE', 256, 408);
    weather(g, w, h, 260);
  });
}
function policeBadge() {
  return paint(512, 512, (g) => {
    const shield = (inset, fill) => {
      g.fillStyle = fill; g.beginPath();
      g.moveTo(256, 40 + inset); g.lineTo(440 - inset, 120 + inset / 2);
      g.lineTo(440 - inset, 300);
      g.quadraticCurveTo(440 - inset, 430 - inset / 2, 256, 480 - inset);
      g.quadraticCurveTo(72 + inset, 430 - inset / 2, 72 + inset, 300);
      g.lineTo(72 + inset, 120 + inset / 2); g.closePath(); g.fill();
    };
    shield(0, '#dfe7ef'); shield(30, '#1b2735');
    g.fillStyle = '#dfe7ef'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = 'bold 60px Arial'; g.fillText('POLICE', 256, 200);
    g.font = 'bold 30px Arial'; g.fillText('RESTRICTED ZONE', 256, 262);
    g.font = 'bold 24px Arial'; g.fillText('POLICE LINE - KEEP OUT', 256, 340);
    weather(g, 512, 512, 150);
  });
}
function stencilText(main, sub, color = '#d8dee4', size = 86) {
  return paint(512, 256, (g, w, h) => {
    g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `bold ${size}px Arial`; g.fillText(main, 256, sub ? 104 : 128);
    if (sub) { g.font = 'bold 30px Arial'; g.fillText(sub, 256, 186); }
    weather(g, w, h, 150);
  });
}
function graffiti(color) {
  return paint(512, 256, (g) => {
    g.strokeStyle = color; g.lineWidth = 20; g.lineCap = 'round'; g.lineJoin = 'round';
    g.beginPath(); g.moveTo(40, 170);
    g.bezierCurveTo(120, 40, 190, 220, 270, 90);
    g.bezierCurveTo(340, -10, 410, 210, 478, 110); g.stroke();
    g.lineWidth = 10; g.beginPath(); g.moveTo(60, 220); g.lineTo(460, 210); g.stroke();
    weather(g, 512, 256, 130);
  });
}
function bulletHoles() {
  return paint(256, 256, (g) => {
    for (let i = 0; i < 16; i++) {
      const x = 24 + Math.random() * 208, y = 24 + Math.random() * 208, r = 3 + Math.random() * 5;
      const rg = g.createRadialGradient(x, y, 0, x, y, r * 2.3);
      rg.addColorStop(0, 'rgba(4,7,11,.96)'); rg.addColorStop(0.55, 'rgba(10,15,21,.82)');
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = rg; g.beginPath(); g.arc(x, y, r * 2.3, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(180,195,210,.28)';
      g.beginPath(); g.arc(x - r * 0.4, y - r * 0.4, r * 0.5, 0, Math.PI * 2); g.fill();
    }
  });
}
function dutyRoster() {
  return paint(256, 320, (g, w, h) => {
    g.fillStyle = '#cfd6c2'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#2a3a2a'; g.textAlign = 'center';
    g.font = 'bold 26px Arial'; g.fillText('DUTY ROSTER', 128, 34);
    g.strokeStyle = '#4a5a48'; g.lineWidth = 2;
    for (let y = 56; y < h; y += 40) { g.beginPath(); g.moveTo(12, y); g.lineTo(w - 12, y); g.stroke(); }
    for (let x = 90; x < w; x += 78) { g.beginPath(); g.moveTo(x, 56); g.lineTo(x, h - 8); g.stroke(); }
    g.fillStyle = '#33452f'; g.font = '18px Arial';
    for (let y = 82; y < h; y += 40) g.fillText('SHIFT  ' + String((y - 42) / 40), 50, y - 4);
    weather(g, w, h, 120);
  });
}
function grate() {
  return toTex(makeCanvas(256, 64, (g, w, h) => {
    g.fillStyle = 'rgba(16,22,28,.94)'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#59636d'; g.lineWidth = 3;
    for (let x = 0; x <= w; x += 16) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, h); g.stroke(); }
    g.strokeStyle = '#232a31'; g.lineWidth = 4; g.strokeRect(1, 1, w - 2, h - 2);
  }), { repeat: [10, 1] });
}
function waterStreak() {
  return toTex(makeCanvas(128, 256, (g, w, h) => {
    g.clearRect(0, 0, w, h);
    for (let i = 0; i < 28; i++) {
      const x = Math.random() * w;
      g.strokeStyle = 'rgba(175,208,236,' + (0.05 + Math.random() * 0.13) + ')';
      g.lineWidth = 0.6 + Math.random() * 1.6;
      g.beginPath(); g.moveTo(x, Math.random() * h * 0.28);
      g.lineTo(x + (Math.random() - 0.5) * 5, h * (0.55 + Math.random() * 0.45)); g.stroke();
    }
  }), { repeat: [1, 1] });
}
function softBlob(inner, outer) {
  return toTex(makeCanvas(128, 128, (g, w, h) => {
    const rg = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    rg.addColorStop(0, inner); rg.addColorStop(1, outer);
    g.fillStyle = rg; g.fillRect(0, 0, w, h);
  }), { clamp: true, srgb: false });
}
function cautionStripes(a, b) {
  return toTex(makeCanvas(128, 128, (g, w, h) => {
    g.fillStyle = a; g.fillRect(0, 0, w, h);
    g.strokeStyle = b; g.lineWidth = 20;
    for (let i = -h; i < w + h; i += 38) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i + h, h); g.stroke(); }
  }), { repeat: [1, 1] });
}

export const T = {
  concrete: noise('#697079', 'rgba(220,230,240,.06)', 'rgba(0,0,0,.18)', { repeat: [6, 6] }),
  asphalt: noise('#222a32', 'rgba(120,155,190,.05)', 'rgba(0,0,0,.26)', { repeat: [12, 12] }),
  rust: noise('#7c4a2b', 'rgba(200,120,55,.28)', 'rgba(28,14,8,.35)', { repeat: [2, 2] }),
  wood: noise('#7a5836', 'rgba(190,150,95,.18)', 'rgba(30,20,10,.32)', { grainLines: 26, repeat: [1, 1] }),
  cardboard: noise('#9a8158', 'rgba(215,195,145,.16)', 'rgba(55,42,22,.26)', { repeat: [1, 1] }),
  metal: noise('#4e5862', 'rgba(185,205,220,.10)', 'rgba(8,14,20,.30)', { repeat: [2, 2] }),
  siteA: siteMark('A'),
  siteB: siteMark('B'),
  police: policeBadge(),
  freight: stencilText('CS-64', 'CARGO 07', '#cdd6de', 88),
  danger: stencilText('DANGER', 'FREIGHT YARD', '#d8b14a', 78),
  fragile: stencilText('FRAGILE', 'KEEP DRY', '#c9d2da', 74),
  noEntry: stencilText('NO ENTRY', 'AUTHORIZED ONLY', '#d8664f', 74),
  graffitiA: graffiti('#3f7fb0'),
  graffitiB: graffiti('#a8503f'),
  graffitiC: graffiti('#7a8f4a'),
  bullets: bulletHoles(),
  duty: dutyRoster(),
  grate: grate(),
  water: waterStreak(),
  shadow: softBlob('rgba(0,0,0,.5)', 'rgba(0,0,0,0)'),
  steam: softBlob('rgba(225,238,248,.34)', 'rgba(225,238,248,0)'),
  caution: cautionStripes('#c9852f', '#e7e2d4'),
};

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------
const toon = (color, opts = {}) => new THREE.MeshToonMaterial({ color, gradientMap: GRADIENT, ...opts });
export const M = {
  concrete: toon(0xffffff, { map: T.concrete }),
  concreteDark: toon(0x39424c),
  wall: toon(0x79828c),
  wallLight: toon(0x959ea8),
  wallDark: toon(0x444d57),
  asphalt: toon(0xffffff, { map: T.asphalt }),
  rust: toon(0xffffff, { map: T.rust }),
  steel: toon(0xffffff, { map: T.metal }),
  steelDark: toon(0x2b333c),
  blue: toon(0x2f6a9c),
  blueDark: toon(0x1f4768),
  wood: toon(0xffffff, { map: T.wood }),
  woodDark: toon(0x4a3520),
  cardboard: toon(0xffffff, { map: T.cardboard }),
  tape: toon(0x6f6450),
  sandbag: toon(0x8a8264),
  rubber: toon(0x1b2127),
  orange: toon(0xc06a2a),
  orangeDark: toon(0x7a3f1c),
  white: toon(0xd7dde3),
  red: toon(0x9c352c),
  yellow: toon(0xc9a13b),
  green: toon(0x3f6a4a),
  caution: toon(0xffffff, { map: T.caution }),
  glass: new THREE.MeshStandardMaterial({ color: 0x7fa2b6, metalness: 0.25, roughness: 0.18, transparent: true, opacity: 0.45, side: THREE.DoubleSide }),
  water: new THREE.MeshBasicMaterial({ color: 0x9ab8cf, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }),
  drip: new THREE.MeshBasicMaterial({ color: 0xbcd6e8, transparent: true, opacity: 0.7 }),
  glowWarm: toon(0xffd58a, { emissive: 0xffae46, emissiveIntensity: 1.5 }),
  glowCool: toon(0xd4ecff, { emissive: 0x8ec8ff, emissiveIntensity: 1.35 }),
  glowRed: toon(0xff6a55, { emissive: 0xff2a18, emissiveIntensity: 1.7 }),
  glowBlue: toon(0x6ab0ff, { emissive: 0x2a7bff, emissiveIntensity: 1.7 }),
  glowFaint: toon(0xb7c9d8, { emissive: 0x5f7d96, emissiveIntensity: 0.6 }),
};

// ---------------------------------------------------------------------------
// Geometry helpers — shared unit geometry + dark outline edges.
// ---------------------------------------------------------------------------
const UBOX = new THREE.BoxGeometry(1, 1, 1);
const UBOX_E = new THREE.EdgesGeometry(UBOX, 25);
const UCYL = new THREE.CylinderGeometry(0.5, 0.5, 1, 16, 1);
const UCYL_E = new THREE.EdgesGeometry(UCYL, 25);
const UCONE = new THREE.ConeGeometry(0.5, 1, 12);
const UCONE_E = new THREE.EdgesGeometry(UCONE, 25);
const USPHERE = new THREE.SphereGeometry(0.5, 12, 8);

function solid(geo, material, outline, shadow, edges) {
  const g = new THREE.Group();
  const m = new THREE.Mesh(geo, material);
  m.castShadow = shadow; m.receiveShadow = true;
  g.add(m);
  if (outline) g.add(new THREE.LineSegments(edges || new THREE.EdgesGeometry(geo, 25), OUTLINE));
  return g;
}
export function box(w, h, d, material, { outline = true, shadow = true } = {}) {
  const g = solid(UBOX, material, outline, shadow, UBOX_E);
  g.scale.set(w, h, d);
  return g;
}
export function cyl(r, h, material, { outline = true, shadow = true } = {}) {
  const g = solid(UCYL, material, outline, shadow, UCYL_E);
  g.scale.set(r * 2, h, r * 2);
  return g;
}
export function cone(r, h, material, { outline = true, shadow = true } = {}) {
  const g = solid(UCONE, material, outline, shadow, UCONE_E);
  g.scale.set(r * 2, h, r * 2);
  return g;
}
export function sphere(r, material, { outline = false, shadow = true } = {}) {
  const g = solid(USPHERE, material, outline, shadow, null);
  g.scale.setScalar(r * 2);
  return g;
}
export function mesh(geo, material, { outline = false, shadow = true } = {}) {
  return solid(geo, material, outline, shadow, null);
}
export function plane(w, h, material, opts = {}) {
  return mesh(new THREE.PlaneGeometry(w, h), material, opts);
}
export function torus(R, tube, material, { flat = false, outline = true } = {}) {
  const g = mesh(new THREE.TorusGeometry(R, tube, 8, 20), material, { outline });
  if (flat) g.rotation.x = -Math.PI / 2;
  return g;
}

export function group(...objs) {
  const g = new THREE.Group();
  objs.forEach((o) => o && g.add(o));
  return g;
}
export function put(parent, obj, x = 0, y = 0, z = 0, ry = 0) {
  obj.position.set(x, y, z);
  obj.rotation.y = ry;
  parent.add(obj);
  return obj;
}
export function decal(texture, w, h, { x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, opacity = 0.9, color = 0xffffff } = {}) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, opacity, color, side: THREE.DoubleSide })
  );
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.renderOrder = 3;
  return m;
}
export function contact(w, d, x = 0, z = 0, opacity = 0.6) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshBasicMaterial({ map: T.shadow, transparent: true, depthWrite: false, opacity, color: 0x0a1018, side: THREE.DoubleSide })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.set(x, 0.04, z);
  m.renderOrder = 1;
  return m;
}

// A cylinder spanning two arbitrary points (wires, pipes, ladder rails, rungs).
const UP = new THREE.Vector3(0, 1, 0);
export function rod(p1, p2, r, material, { outline = false } = {}) {
  const a = new THREE.Vector3(...p1), b = new THREE.Vector3(...p2);
  const dir = new THREE.Vector3().subVectors(b, a);
  const len = dir.length();
  const g = cyl(r, len, material, { outline, shadow: false });
  g.position.copy(a).addScaledVector(dir, 0.5);
  g.quaternion.setFromUnitVectors(UP, dir.clone().normalize());
  return g;
}
export function wire(p1, p2, sag, r = 0.025, material = M.steelDark) {
  const mid = [(p1[0] + p2[0]) / 2, Math.min(p1[1], p2[1]) - sag, (p1[2] + p2[2]) / 2];
  return group(rod(p1, mid, r, material), rod(mid, p2, r, material));
}
export function ladder(w, h, steps, material) {
  const g = group();
  g.add(rod([-w / 2, 0, 0], [-w / 2, h, 0], 0.05, material));
  g.add(rod([w / 2, 0, 0], [w / 2, h, 0], 0.05, material));
  for (let i = 1; i <= steps; i++) {
    const y = (h / (steps + 1)) * i;
    g.add(rod([-w / 2, y, 0], [w / 2, y, 0], 0.04, material));
  }
  return g;
}

// ---------------------------------------------------------------------------
// Composite props
// ---------------------------------------------------------------------------
export function crate(s = 1.5, material = M.wood) {
  const g = group(box(s, s, s, material));
  const t = 0.12;
  for (const sy of [-1, 1]) {
    put(g, box(s * 0.97, t, t, M.woodDark, { outline: false, shadow: false }), 0, sy * s * 0.3, s / 2 + 0.01);
    put(g, box(s * 0.97, t, t, M.woodDark, { outline: false, shadow: false }), 0, sy * s * 0.3, -s / 2 - 0.01);
  }
  return g;
}
export function barrel(material = M.blue) {
  const g = group(cyl(0.55, 1.5, material));
  for (const sy of [-0.55, 0.55]) put(g, cyl(0.585, 0.1, M.steelDark, { outline: false, shadow: false }), 0, sy, 0);
  put(g, cyl(0.5, 0.04, M.steelDark, { outline: false, shadow: false }), 0, 0.76, 0);
  return g;
}
export function cardboardBox(w = 1.2, h = 1.0, d = 1.0) {
  const g = group(box(w, h, d, M.cardboard));
  put(g, box(w * 0.16, 0.02, d + 0.03, M.tape, { outline: false, shadow: false }), 0, h / 2 + 0.01, 0);
  return g;
}
export function pallet() {
  const g = group();
  for (const x of [-0.55, 0, 0.55]) put(g, box(0.18, 0.16, 1.7, M.woodDark, { outline: false }), x, 0.08, 0);
  for (const z of [-0.72, -0.24, 0.24, 0.72]) put(g, box(1.7, 0.09, 0.34, M.wood, { outline: false }), 0, 0.2, z);
  return g;
}
export function barrier(material = M.concreteDark) {
  const g = group(box(2.2, 0.9, 0.55, material));
  put(g, box(2.4, 0.12, 0.62, M.concrete, { outline: false }), 0, -0.42, 0);
  return g;
}
export function tire({ flat = false } = {}) {
  const g = group();
  const t = torus(0.55, 0.2, M.rubber, { flat });
  g.add(t);
  const hub = cyl(0.3, 0.12, M.steelDark, { outline: false, shadow: false });
  if (!flat) hub.rotation.x = Math.PI / 2;
  g.add(hub);
  return g;
}
export function sandbag(w = 1.1) {
  return box(w, 0.32, 0.5, M.sandbag, { outline: false });
}
export function trafficCone() {
  const g = group(cone(0.28, 0.8, M.orange));
  put(g, box(0.7, 0.06, 0.7, M.orangeDark, { outline: false, shadow: false }), 0, -0.4, 0);
  put(g, cyl(0.2, 0.1, M.white, { outline: false, shadow: false }), 0, 0.06, 0);
  return g;
}
export function fencePost(h = 2.6) {
  const g = group(box(0.16, h, 0.16, M.steelDark));
  put(g, box(0.5, 0.1, 0.5, M.steel, { outline: false }), 0, h / 2, 0);
  return g;
}
