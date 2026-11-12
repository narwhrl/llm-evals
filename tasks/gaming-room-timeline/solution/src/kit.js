// Small building kit: cached materials, primitives whose y is the bottom face, canvas textures.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const mats = new Map();
export function mat(color, opts) {
  if (color?.isMaterial) return color;
  const key = color + (opts ? JSON.stringify(opts) : '');
  let m = mats.get(key);
  if (!m) mats.set(key, (m = new THREE.MeshStandardMaterial({ color, roughness: 0.78, ...opts })));
  return m;
}
export const glow = (color, k = 1) => mat(color, { emissive: color, emissiveIntensity: k, roughness: 0.4 });

const BOX = new THREE.BoxGeometry(1, 1, 1);
function put(mesh, x, y, z) {
  mesh.position.set(x, y, z);
  mesh.castShadow = mesh.receiveShadow = true;
  return mesh;
}
export function box(w, h, d, m, x = 0, y = 0, z = 0) {
  const o = put(new THREE.Mesh(BOX, mat(m)), x, y + h / 2, z);
  o.scale.set(w, h, d);
  return o;
}
export function rbox(w, h, d, m, x = 0, y = 0, z = 0, r = 0.02) {
  const g = new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2.01, h / 2.01, d / 2.01));
  return put(new THREE.Mesh(g, mat(m)), x, y + h / 2, z);
}
export function cyl(r, h, m, x = 0, y = 0, z = 0, rTop = r, seg = 20) {
  return put(new THREE.Mesh(new THREE.CylinderGeometry(rTop, r, h, seg), mat(m)), x, y + h / 2, z);
}
export function ball(r, m, x = 0, y = 0, z = 0) {
  return put(new THREE.Mesh(new THREE.SphereGeometry(r, 20, 14), mat(m)), x, y, z);
}
export function plane(w, h, m, x = 0, y = 0, z = 0) {
  const o = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat(m));
  o.position.set(x, y, z);
  o.receiveShadow = true;
  return o;
}
export function group(...kids) {
  const g = new THREE.Group();
  kids.flat(3).forEach((k) => k && g.add(k));
  return g;
}
export function at(o, x, y, z, ry = 0, rx = 0, rz = 0) {
  o.position.set(x, y, z);
  o.rotation.set(rx, ry, rz);
  return o;
}

export function rng(seed) {
  return () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
}

export function canvasTex(w, h, draw, repeat) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}
export const texMat = (map, opts) => new THREE.MeshStandardMaterial({ map, roughness: 0.8, ...opts });

const memo = new Map();
function once(key, make) {
  if (!memo.has(key)) memo.set(key, make());
  return memo.get(key);
}

export function woodMat(base, dark, repeat = [1, 1], planks = 5) {
  return once(`wood${base}${dark}${repeat}${planks}`, () =>
    texMat(
      canvasTex(512, 512, (g, w, h) => {
        const r = rng(base.length * 97 + planks);
        g.fillStyle = base;
        g.fillRect(0, 0, w, h);
        const pw = w / planks;
        for (let i = 0; i < planks; i++) {
          g.fillStyle = `rgba(40,20,0,${r() * 0.1})`;
          g.fillRect(i * pw, 0, pw, h);
          g.fillStyle = dark;
          g.fillRect(i * pw, 0, 2, h);
          g.fillRect(i * pw, r() * h, pw, 2);
        }
        g.strokeStyle = dark;
        g.globalAlpha = 0.2;
        for (let i = 0; i < 170; i++) {
          const x = r() * w, y = r() * h, l = 40 + r() * 140;
          g.beginPath();
          g.moveTo(x, y);
          g.bezierCurveTo(x + r() * 6 - 3, y + l / 3, x + r() * 6 - 3, y + (l * 2) / 3, x, y + l);
          g.stroke();
        }
      }, repeat),
      { roughness: 0.62 },
    ),
  );
}

export function plaidMat(a, b, c, repeat = [3, 3]) {
  return once(`plaid${a}${b}${c}${repeat}`, () =>
    texMat(
      canvasTex(128, 128, (g, w) => {
        g.fillStyle = a;
        g.fillRect(0, 0, w, w);
        g.globalAlpha = 0.55;
        g.fillStyle = b;
        g.fillRect(0, 20, w, 36);
        g.fillRect(20, 0, 36, w);
        g.fillStyle = c;
        g.fillRect(0, 84, w, 10);
        g.fillRect(84, 0, 10, w);
      }, repeat),
      { roughness: 0.95 },
    ),
  );
}

// Speckled cloth / carpet / old wall paint.
export function grainMat(base, speck, repeat = [2, 2], amount = 0.12) {
  return once(`grain${base}${speck}${repeat}${amount}`, () =>
    texMat(
      canvasTex(256, 256, (g, w, h) => {
        const r = rng(7);
        g.fillStyle = base;
        g.fillRect(0, 0, w, h);
        g.fillStyle = speck;
        for (let i = 0; i < 5000; i++) {
          g.globalAlpha = r() * amount;
          g.fillRect(r() * w, r() * h, 1 + r() * 2, 1 + r() * 2);
        }
      }, repeat),
      { roughness: 0.95 },
    ),
  );
}

// A row of book / game-case spines standing along x, starting at x = 0.
export function spines(width, palette, hMin, hMax, depth, seed, tMin = 0.012, tMax = 0.03) {
  const r = rng(seed), g = new THREE.Group();
  for (let x = 0; x < width - tMax; ) {
    const t = tMin + r() * (tMax - tMin), h = hMin + r() * (hMax - hMin);
    const b = box(t - 0.002, h, depth - r() * 0.02, palette[(r() * palette.length) | 0], x + t / 2, 0, 0);
    if (r() > 0.9) b.rotation.z = -0.12;
    g.add(b);
    x += t;
  }
  return g;
}

export function label(w, h, draw, pw = 256) {
  return new THREE.MeshStandardMaterial({ map: canvasTex(pw, Math.round((pw * h) / w), draw), roughness: 0.7 });
}
