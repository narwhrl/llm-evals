import * as THREE from 'three';
import { P } from './palette.js';

// --- toon shading ramp -------------------------------------------------
let _grad = null;
function gradientMap() {
  if (_grad) return _grad;
  const steps = new Uint8Array([56, 128, 200, 255]);
  const tex = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  _grad = tex;
  return tex;
}

const _toon = new Map();
// Cached by colour only. Never mutate a returned material: callers that need
// their own instance create it directly.
export function toon(color) {
  let m = _toon.get(color);
  if (!m) {
    m = new THREE.MeshToonMaterial({ color, gradientMap: gradientMap() });
    _toon.set(color, m);
  }
  return m;
}

const _emis = new Map();
// Toon surface that stays readable at night (walls washed by neon spill).
export function toonLit(color, emissive, intensity) {
  const key = `${color}|${emissive}|${intensity}`;
  let m = _emis.get(key);
  if (!m) {
    m = new THREE.MeshToonMaterial({
      color,
      gradientMap: gradientMap(),
      emissive: new THREE.Color(emissive),
      emissiveIntensity: intensity
    });
    _emis.set(key, m);
  }
  return m;
}

// One-off toon surface carrying a texture; never cached because the texture
// is unique to the caller.
export function toonMap(color, map) {
  return new THREE.MeshToonMaterial({ color, map, gradientMap: gradientMap() });
}

export function glow(color, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity >= 1,
    side: THREE.FrontSide
  });
}

export function glowAdd(color, opacity = 0.6) {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });
}

export function mapped(map, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    map,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity >= 1,
    side: THREE.FrontSide
  });
}

export function glassMat(opacity = 0.16, color = P.glassTint) {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(color),
    transparent: true,
    opacity,
    shininess: 120,
    specular: new THREE.Color('#ffffff'),
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

// --- shared unit geometry ---------------------------------------------
const _unitBox = new THREE.BoxGeometry(1, 1, 1);
const _unitPlane = new THREE.PlaneGeometry(1, 1);
const _unitCyl = new THREE.CylinderGeometry(1, 1, 1, 20, 1);
const _unitSphere = new THREE.SphereGeometry(1, 18, 12);
const _geo = new Map();

export function geo(key, make) {
  let g = _geo.get(key);
  if (!g) {
    g = make();
    _geo.set(key, g);
  }
  return g;
}

const _outlineMat = new THREE.MeshBasicMaterial({
  color: new THREE.Color(P.outline),
  side: THREE.BackSide
});

// Inverted-hull outline sized per axis so the shell keeps a constant
// thickness instead of growing with the object.
export function addOutline(mesh, t = 0.035) {
  const s = mesh.scale;
  const sx = Math.abs(s.x) || 1;
  const sy = Math.abs(s.y) || 1;
  const sz = Math.abs(s.z) || 1;
  const shell = new THREE.Mesh(mesh.geometry, _outlineMat);
  shell.scale.set(1 + (2 * t) / sx, 1 + (2 * t) / sy, 1 + (2 * t) / sz);
  shell.matrixAutoUpdate = false;
  shell.updateMatrix();
  mesh.add(shell);
  return mesh;
}

function place(m, o) {
  if (o.x || o.y || o.z) m.position.set(o.x || 0, o.y || 0, o.z || 0);
  if (o.rx || o.ry || o.rz) m.rotation.set(o.rx || 0, o.ry || 0, o.rz || 0);
  return m;
}

export function box(w, h, d, color, o = {}) {
  const m = new THREE.Mesh(_unitBox, o.mat || toon(color));
  m.scale.set(w, h, d);
  place(m, o);
  if (o.outline) addOutline(m, o.outline);
  return m;
}

export function cyl(r, h, color, o = {}) {
  const m = new THREE.Mesh(o.seg ? geo(`c${o.seg}`, () => new THREE.CylinderGeometry(1, 1, 1, o.seg)) : _unitCyl, o.mat || toon(color));
  m.scale.set(r, h, r);
  place(m, o);
  if (o.outline) addOutline(m, o.outline);
  return m;
}

export function tubeOf(rTop, rBot, h, seg, color, o = {}) {
  const g = geo(`t${rTop}_${rBot}_${h}_${seg}`, () => new THREE.CylinderGeometry(rTop, rBot, h, seg));
  const m = new THREE.Mesh(g, o.mat || toon(color));
  place(m, o);
  if (o.outline) addOutline(m, o.outline);
  return m;
}

export function sphere(r, color, o = {}) {
  const m = new THREE.Mesh(_unitSphere, o.mat || toon(color));
  m.scale.set(r, o.sy || r, r);
  place(m, o);
  if (o.outline) addOutline(m, o.outline);
  return m;
}

export function plane(w, h, o = {}) {
  const m = new THREE.Mesh(_unitPlane, o.mat || glow(o.color || '#ffffff'));
  m.scale.set(w, h, 1);
  place(m, o);
  return m;
}

export function ring(r0, r1, mat, o = {}) {
  const g = geo(`r${r0}_${r1}`, () => new THREE.RingGeometry(r0, r1, 40));
  const m = new THREE.Mesh(g, mat);
  place(m, o);
  return m;
}

export function tube(curve, radius, color, o = {}) {
  const g = geo(`tb_${curve.uuid}_${radius}`, () => new THREE.TubeGeometry(curve, 24, radius, 6, false));
  const m = new THREE.Mesh(g, o.mat || toon(color));
  place(m, o);
  return m;
}

// --- canvas textures ----------------------------------------------------
export function canvasTex(w, h, draw, opts = {}) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (opts.repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  return t;
}

export function fitText(ctx, text, cx, y, maxW, size, weight = '700', family = "'Trebuchet MS', 'Segoe UI', sans-serif") {
  let s = size;
  do {
    ctx.font = `${weight} ${s}px ${family}`;
    if (ctx.measureText(text).width <= maxW) break;
    s -= 2;
  } while (s > 8);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cx, y);
}

// --- transforms ----------------------------------------------------------
export function at(x, y, z) {
  return new THREE.Vector3(x, y, z);
}

export function smooth(t) {
  const u = Math.max(0, Math.min(1, t));
  return u * u * (3 - 2 * u);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

// Deterministic pseudo-random so the scene composes the same way every load.
export function rnd(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
