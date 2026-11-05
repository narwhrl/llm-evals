// Shared materials and a geometry accumulator that bakes static parts into one mesh per material.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { noiseTexture, roofTexture, stoneTexture, grainTexture } from './textures.js';

// Texture repeats per board unit for each material kind.
const UV_SCALE = { paint: 1.6, roof: 2.4, stone: 1.3, wood: 0.9, metal: 1, glass: 1, glow: 1 };

export function createMaterials() {
  const paper = noiseTexture(256, 2);
  const roof = roofTexture();
  const stone = stoneTexture();
  const grain = grainTexture();
  const std = (o) => new THREE.MeshStandardMaterial({ vertexColors: true, ...o });
  return {
    paint: std({ roughness: 0.8, bumpMap: paper, bumpScale: 0.5 }),
    roof: std({ map: roof, bumpMap: roof, bumpScale: 1.2, roughness: 0.72 }),
    stone: std({ map: stone, bumpMap: stone, bumpScale: 1.0, roughness: 0.9 }),
    wood: std({ map: grain, roughness: 0.66 }),
    metal: std({ roughness: 0.36, metalness: 0.75 }),
    glass: std({ roughness: 0.12, metalness: 0.3 }),
    // Lamps and lit windows; emissiveIntensity follows the time of day.
    glow: std({ roughness: 0.45, emissive: new THREE.Color('#ffc477'), emissiveIntensity: 0 }),
  };
}

const _p = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();

export function mat(x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
  return new THREE.Matrix4().compose(_p.set(x, y, z), _q.setFromEuler(_e.set(rx, ry, rz, 'YXZ')), _s.set(sx, sy, sz));
}
export const mul = (a, b) => new THREE.Matrix4().multiplyMatrices(a, b);

// Planar box projection per triangle so texel density matches across parts.
function boxUV(g, scale) {
  const p = g.attributes.position;
  const uv = new Float32Array(p.count * 2);
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  for (let i = 0; i < p.count; i += 3) {
    a.fromBufferAttribute(p, i);
    b.fromBufferAttribute(p, i + 1);
    c.fromBufferAttribute(p, i + 2);
    const n = b.sub(a).cross(c.sub(a));
    const [ax, ay, az] = [Math.abs(n.x), Math.abs(n.y), Math.abs(n.z)];
    for (let k = i; k < i + 3; k++) {
      const [x, y, z] = [p.getX(k), p.getY(k), p.getZ(k)];
      const [u, v] = ay >= ax && ay >= az ? [x, z] : ax >= az ? [z, y] : [x, y];
      uv[k * 2] = u * scale;
      uv[k * 2 + 1] = v * scale;
    }
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
}

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const cache = new Map();
const cached = (key, make) => cache.get(key) ?? cache.set(key, make()).get(key);
const roundedBox = (w, h, d, r = 0.03) =>
  cached(`rb${w.toFixed(3)},${h.toFixed(3)},${d.toFixed(3)},${r}`, () => new RoundedBoxGeometry(w, h, d, 2, Math.min(r, w / 2, h / 2, d / 2)));
const cylinder = (rt, rb, h, seg = 12) =>
  cached(`cy${rt},${rb},${h},${seg}`, () => new THREE.CylinderGeometry(rt, rb, h, seg));

const _c = new THREE.Color();

export class Kit {
  parts = {};

  add(kind, geometry, color, matrix, localUV = false) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    if (localUV) boxUV(g, UV_SCALE[kind]);
    if (matrix) g.applyMatrix4(matrix);
    if (!localUV) boxUV(g, UV_SCALE[kind]);
    _c.set(color);
    const n = g.attributes.position.count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) col.set([_c.r, _c.g, _c.b], i * 3);
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    (this.parts[kind] ??= []).push(g);
  }

  // Box of size w,h,d centred at (x,y,z) in `frame`.
  box(kind, color, frame, w, h, d, x, y, z, ry = 0, rx = 0, rz = 0) {
    this.add(kind, unitBox, color, mul(frame, mat(x, y, z, ry, rx, rz, w, h, d)));
  }

  rbox(kind, color, frame, w, h, d, x, y, z, ry = 0, r = 0.03) {
    this.add(kind, roundedBox(w, h, d, r), color, mul(frame, mat(x, y, z, ry)));
  }

  cyl(kind, color, frame, rt, rb, h, x, y, z, seg = 12, rx = 0, rz = 0, ry = 0) {
    this.add(kind, cylinder(rt, rb, h, seg), color, mul(frame, mat(x, y, z, ry, rx, rz)));
  }

  // Thin member between two points, for trusses and bracing.
  beam(kind, color, frame, a, b, t, t2 = t) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = dir.length();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(1, 0, 0), dir.normalize());
    const m = new THREE.Matrix4().compose(new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5), q, new THREE.Vector3(len, t, t2));
    this.add(kind, unitBox, color, mul(frame, m));
  }

  build(materials, shadows = true) {
    const group = new THREE.Group();
    for (const [kind, list] of Object.entries(this.parts)) {
      const mesh = new THREE.Mesh(mergeGeometries(list), materials[kind]);
      mesh.castShadow = shadows;
      mesh.receiveShadow = true;
      mesh.name = kind;
      group.add(mesh);
      for (const g of list) g.dispose();
    }
    this.parts = {};
    return group;
  }
}

export function shade(hex, f) {
  return '#' + new THREE.Color(hex).multiplyScalar(f).getHexString();
}
