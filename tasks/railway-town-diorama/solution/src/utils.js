import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
}

export function toTexture(canvas, { repeat = [1, 1], srgb = true, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

export function roundedBox(w, h, d, r = 0.08) {
  return new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2.1, h / 2.1, d / 2.1));
}

/**
 * A rectangular ribbon following a 3D polyline. Used for water, ballast,
 * rails, roads, bridge decks and parapets. `points[i].y` is the top surface;
 * the ribbon is extruded downward by `thickness`.
 */
export function makeStrip(points, opts = {}) {
  const {
    halfWidth = 1,
    thickness = 0.12,
    closed = false,
    lateralOffset = 0,
    uvScale = 0.18,
    material = null,
    bottomY = null,
    castShadow = true,
    receiveShadow = true,
  } = opts;

  const n = points.length;
  const segCount = closed ? n : n - 1;
  const pos = [], uv = [], idx = [];
  const dist = [0];
  for (let i = 1; i < n; i++) dist[i] = dist[i - 1] + points[i].distanceTo(points[i - 1]);

  for (let i = 0; i < n; i++) {
    const ia = closed ? (i - 1 + n) % n : Math.max(0, i - 1);
    const ib = closed ? (i + 1) % n : Math.min(n - 1, i + 1);
    const a = points[ia], b = points[ib];
    const tx = b.x - a.x, tz = b.z - a.z;
    const len = Math.hypot(tx, tz) || 1;
    const nx = tz / len, nz = -tx / len;
    const c = points[i];
    const lo = lateralOffset - halfWidth, hi = lateralOffset + halfWidth;
    const lx = c.x + nx * lo, lz = c.z + nz * lo;
    const rx = c.x + nx * hi, rz = c.z + nz * hi;
    const y = c.y, yb = bottomY ? bottomY[i] : c.y - thickness;
    pos.push(lx, y, lz, rx, y, rz, lx, yb, lz, rx, yb, rz);
    const v = dist[i] * uvScale;
    uv.push(0, v, halfWidth * 2 * uvScale, v, 0, v, halfWidth * 2 * uvScale, v);
  }

  for (let i = 0; i < segCount; i++) {
    const j = closed ? (i + 1) % n : i + 1;
    const A = 4 * i, B = 4 * i + 1, C = 4 * j + 1, D = 4 * j;
    const a2 = 4 * i + 2, b2 = 4 * i + 3, c2 = 4 * j + 3, d2 = 4 * j + 2;
    idx.push(A, D, C, A, C, B);             // top, +Y
    idx.push(a2, b2, c2, a2, c2, d2);       // bottom, -Y
    idx.push(A, a2, d2, A, d2, D);          // left side
    idx.push(B, C, c2, B, c2, b2);          // right side
  }
  if (!closed) {
    idx.push(0, 1, 3, 0, 3, 2);
    const e = 4 * (n - 1);
    idx.push(e, e + 2, e + 3, e, e + 3, e + 1);
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, material);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = receiveShadow;
  return mesh;
}

/** Pitched roof: two sloped panels, two gable ends and a ridge cap. */
export function makeGableRoof(w, d, h, roofMat, gableMat, overhang = 0.34) {
  const group = new THREE.Group();
  const run = w / 2 + overhang;
  const slope = Math.hypot(run, h);
  const angle = Math.atan2(h, run);
  const panel = new THREE.BoxGeometry(slope, 0.14, d + overhang * 2);

  const right = new THREE.Mesh(panel, roofMat);
  right.rotation.z = -angle;
  right.position.set(run / 2, h / 2, 0);
  const left = new THREE.Mesh(panel, roofMat);
  left.rotation.z = angle;
  left.position.set(-run / 2, h / 2, 0);
  group.add(right, left);

  const shape = new THREE.Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(0, h);
  shape.closePath();
  const tri = new THREE.ShapeGeometry(shape);
  for (const s of [1, -1]) {
    const m = new THREE.Mesh(tri, gableMat);
    m.position.set(0, 0, s * (d / 2));
    if (s < 0) m.rotation.y = Math.PI;
    group.add(m);
  }

  const ridge = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, d + overhang * 2), roofMat);
  ridge.position.set(0, h, 0);
  group.add(ridge);
  return group;
}

export function makeGlowTexture(inner = 'rgba(255,236,190,1)', outer = 'rgba(255,180,90,0)') {
  const c = makeCanvas(128, 128);
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 62);
  grad.addColorStop(0, inner);
  grad.addColorStop(0.28, 'rgba(255,213,140,0.62)');
  grad.addColorStop(1, outer);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return toTexture(c, { repeat: [1, 1] });
}

export function glowSprite(texture, size, color = 0xffc878) {
  const mat = new THREE.SpriteMaterial({
    map: texture,
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0,
  });
  const s = new THREE.Sprite(mat);
  s.scale.set(size, size, 1);
  return s;
}

export function setShadows(object, cast = true, receive = true) {
  object.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
  return object;
}
