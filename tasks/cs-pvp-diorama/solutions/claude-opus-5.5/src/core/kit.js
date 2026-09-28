import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { MAT } from './materials.js';

const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const cylCache = new Map();
function unitCylinder(seg, open) {
  const k = `${seg}:${open}`;
  if (!cylCache.has(k)) cylCache.set(k, new THREE.CylinderGeometry(0.5, 0.5, 1, seg, 1, open));
  return cylCache.get(k);
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _p = new THREE.Vector3();
const _s = new THREE.Vector3();
const _c = new THREE.Color();
const _n = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

function localMatrix(pos, rot, scale) {
  _e.set(rot?.[0] ?? 0, rot?.[1] ?? 0, rot?.[2] ?? 0, 'YXZ');
  _q.setFromEuler(_e);
  _p.set(pos[0], pos[1], pos[2]);
  _s.set(scale[0], scale[1], scale[2]);
  return new THREE.Matrix4().compose(_p, _q, _s);
}

// World-space planar UVs: pick the plane facing each triangle so tiling stays metric
// across merged parts. Walls map (horizontal, height); floors map (x, z).
function projectUVs(g, scale) {
  const pos = g.attributes.position;
  const uv = g.attributes.uv;
  for (let i = 0; i < pos.count; i += 3) {
    _a.fromBufferAttribute(pos, i + 1).sub(_p.fromBufferAttribute(pos, i));
    _b.fromBufferAttribute(pos, i + 2).sub(_p);
    _n.crossVectors(_a, _b);
    const ax = Math.abs(_n.x);
    const ay = Math.abs(_n.y);
    const az = Math.abs(_n.z);
    for (let k = 0; k < 3; k++) {
      const x = pos.getX(i + k);
      const y = pos.getY(i + k);
      const z = pos.getZ(i + k);
      if (ay >= ax && ay >= az) uv.setXY(i + k, x / scale, z / scale);
      else if (ax >= az) uv.setXY(i + k, z / scale, y / scale);
      else uv.setXY(i + k, x / scale, y / scale);
    }
  }
}

// Accumulates transformed primitives per material key and merges them into one mesh each.
export class Kit {
  constructor() {
    this.parts = new Map();
    this.stack = [new THREE.Matrix4()];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  push(pos = [0, 0, 0], rotY = 0, rotX = 0, rotZ = 0) {
    this.stack.push(this.top.clone().multiply(localMatrix(pos, [rotX, rotY, rotZ], [1, 1, 1])));
    return this;
  }

  pop() {
    this.stack.pop();
    return this;
  }

  // World position of a point given in the current local frame.
  world(x, y, z) {
    return new THREE.Vector3(x, y, z).applyMatrix4(this.top).toArray();
  }

  // Adds geometry (shared or owned) with a local transform; tint is an sRGB hex.
  add(key, geometry, matrix, { tint = 0xffffff, uv } = {}) {
    if (!MAT[key]) throw new Error(`Unknown material ${key}`);
    const g = (geometry.index ? geometry.toNonIndexed() : geometry.clone());
    g.applyMatrix4(_m.multiplyMatrices(this.top, matrix));
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
    }
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    const scale = uv ?? MAT[key].scale;
    if (scale > 0) projectUVs(g, scale);
    _c.set(tint);
    const n = g.attributes.position.count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      col[i * 3] = _c.r;
      col[i * 3 + 1] = _c.g;
      col[i * 3 + 2] = _c.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (!this.parts.has(key)) this.parts.set(key, []);
    this.parts.get(key).push(g);
    return this;
  }

  // Axis-aligned box: [x, yBottom, z] position of the base centre, size [w, h, d].
  box(key, pos, size, opts = {}) {
    const m = localMatrix([pos[0], pos[1] + size[1] / 2, pos[2]], opts.rot, size);
    if (opts.rot) {
      // rotate about the base centre, not the box centre
      const pivot = localMatrix(pos, opts.rot, [1, 1, 1]);
      m.multiplyMatrices(pivot, localMatrix([0, size[1] / 2, 0], null, size));
    }
    return this.add(key, UNIT_BOX, m, opts);
  }

  // Box from min/max corners (world-aligned in the current frame).
  span(key, x0, y0, z0, x1, y1, z1, opts = {}) {
    return this.box(key, [(x0 + x1) / 2, y0, (z0 + z1) / 2], [x1 - x0, y1 - y0, z1 - z0], opts);
  }

  // Upright cylinder with its base at pos.
  cyl(key, pos, radius, height, opts = {}) {
    const seg = opts.seg ?? 14;
    const pivot = localMatrix(pos, opts.rot, [1, 1, 1]);
    const m = pivot.multiply(localMatrix([0, height / 2, 0], null, [radius * 2, height, radius * 2]));
    return this.add(key, unitCylinder(seg, opts.open ?? false), m, opts);
  }

  // Cylinder between two points (pipes, poles, rails).
  rod(key, a, b, radius, opts = {}) {
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const len = va.distanceTo(vb);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
    const m = new THREE.Matrix4().compose(va.add(vb).multiplyScalar(0.5), q, new THREE.Vector3(radius * 2, len, radius * 2));
    return this.add(key, unitCylinder(opts.seg ?? 6, false), m, opts);
  }

  geo(key, geometry, pos = [0, 0, 0], opts = {}) {
    return this.add(key, geometry, localMatrix(pos, opts.rot, opts.scale ?? [1, 1, 1]), opts);
  }

  build(name = 'kit') {
    const group = new THREE.Group();
    group.name = name;
    for (const [key, list] of this.parts) {
      const info = MAT[key];
      const merged = mergeGeometries(list, false);
      list.forEach((g) => g.dispose());
      merged.computeBoundingSphere();
      const mesh = new THREE.Mesh(merged, info.material);
      mesh.name = `${name}:${key}`;
      mesh.castShadow = info.cast;
      mesh.receiveShadow = info.receive;
      mesh.layers.set(info.layer);
      mesh.matrixAutoUpdate = false;
      group.add(mesh);
    }
    this.parts.clear();
    return group;
  }
}
