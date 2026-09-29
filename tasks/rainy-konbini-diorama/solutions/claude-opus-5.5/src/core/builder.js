import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const unitBox = new THREE.BoxGeometry(1, 1, 1);
const cylCache = new Map();

function cylinder(rTop, rBot, seg) {
  const key = `${rTop}|${rBot}|${seg}`;
  let g = cylCache.get(key);
  if (!g) {
    g = new THREE.CylinderGeometry(rTop, rBot, 1, seg);
    cylCache.set(key, g);
  }
  return g;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _e = new THREE.Euler();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _dir = new THREE.Vector3();

/**
 * Collects static geometry in local coordinates of a transform stack and merges it per
 * material, so a detailed diorama stays at a few dozen draw calls.
 */
export class Builder {
  constructor() {
    this.batches = new Map();
    this.instances = new Map();
    this.stack = [new THREE.Matrix4()];
  }

  get top() {
    return this.stack[this.stack.length - 1];
  }

  /** Push a local frame: translation and optional Y rotation (radians). */
  push(x = 0, y = 0, z = 0, ry = 0) {
    _m.makeRotationY(ry).setPosition(x, y, z);
    this.stack.push(this.top.clone().multiply(_m));
    return this;
  }

  pop() {
    if (this.stack.length > 1) this.stack.pop();
    return this;
  }

  /** Add any geometry with a local matrix; the geometry is cloned and baked. */
  geo(geometry, material, matrix) {
    const g = geometry.index ? geometry.toNonIndexed() : geometry.clone();
    for (const name of Object.keys(g.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
    }
    if (!g.attributes.uv) {
      g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    }
    g.applyMatrix4(_m.copy(this.top).multiply(matrix));
    let list = this.batches.get(material);
    if (!list) this.batches.set(material, (list = []));
    list.push(g);
    return this;
  }

  /** Axis-aligned (in local frame) box by centre and size, optional rotation. */
  box(material, cx, cy, cz, sx, sy, sz, rx = 0, ry = 0, rz = 0) {
    _e.set(rx, ry, rz);
    _q.setFromEuler(_e);
    _m.compose(_p.set(cx, cy, cz), _q, _s.set(sx, sy, sz));
    return this.geo(unitBox, material, _m.clone());
  }

  /** Box by min/max corners. */
  span(material, x0, y0, z0, x1, y1, z1) {
    return this.box(material, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2, x1 - x0, y1 - y0, z1 - z0);
  }

  /** Vertical cylinder standing on (x, y, z). */
  cyl(material, x, y, z, r, h, seg = 10, rTop = r) {
    _m.compose(_p.set(x, y + h / 2, z), _q.identity(), _s.set(1, h, 1));
    return this.geo(cylinder(rTop, r, seg), material, _m.clone());
  }

  /** Cylinder between two points (pipes, rails, rods). */
  rod(material, a, b, r, seg = 6) {
    _dir.subVectors(b, a);
    const len = _dir.length();
    _q.setFromUnitVectors(_up, _dir.normalize());
    _m.compose(_p.addVectors(a, b).multiplyScalar(0.5), _q, _s.set(1, len, 1));
    return this.geo(cylinder(r, r, seg), material, _m.clone());
  }

  /** Register an instance (per-instance colour) for a shared geometry/material. */
  inst(geometry, material, x, y, z, sx, sy, sz, color, ry = 0) {
    const key = geometry.uuid + material.uuid;
    let rec = this.instances.get(key);
    if (!rec) this.instances.set(key, (rec = { geometry, material, mats: [], cols: [] }));
    _q.setFromAxisAngle(_up, ry);
    _m.compose(_p.set(x, y, z), _q, _s.set(sx, sy, sz));
    rec.mats.push(this.top.clone().multiply(_m));
    rec.cols.push(new THREE.Color(color));
    return this;
  }

  /** Merge everything collected so far into meshes under `parent`. */
  flush(parent, { castShadow = true, receiveShadow = true } = {}) {
    for (const [material, list] of this.batches) {
      const mesh = new THREE.Mesh(mergeGeometries(list, false), material);
      mesh.castShadow = castShadow && !material.transparent && !material.isMeshBasicMaterial;
      mesh.receiveShadow = receiveShadow && !material.isMeshBasicMaterial;
      mesh.matrixAutoUpdate = false;
      parent.add(mesh);
      for (const g of list) g.dispose();
    }
    for (const rec of this.instances.values()) {
      const mesh = new THREE.InstancedMesh(rec.geometry, rec.material, rec.mats.length);
      rec.mats.forEach((m, i) => {
        mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, rec.cols[i]);
      });
      mesh.castShadow = false;
      mesh.receiveShadow = true;
      mesh.matrixAutoUpdate = false;
      mesh.computeBoundingSphere();
      parent.add(mesh);
    }
    this.batches.clear();
    this.instances.clear();
    return parent;
  }
}

export { unitBox };
