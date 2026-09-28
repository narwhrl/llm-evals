// Shared low-level helpers: seeded RNG, geometry factories, structural kit parts.
import * as THREE from 'three';

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const rng = mulberry32(20460831);
export const rnd = (a = 0, b = 1) => a + (b - a) * rng();
export const rndInt = (a, b) => Math.floor(rnd(a, b + 1));
export const pick = (arr) => arr[Math.floor(rng() * arr.length)];

// Disable OutlineEffect inversion hull for a material (flat / glow / custom things).
export function noOutline(mat) {
  mat.userData.outlineParameters = { visible: false };
  return mat;
}

export function shadows(mesh, cast = true, receive = true) {
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
}

export function put(obj, x, y, z, ry = 0) {
  obj.position.set(x, y, z);
  obj.rotation.y = ry;
  return obj;
}

export function box(w, h, d, mat, { x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, cast = true, recv = true, parent = null, name = '' } = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.castShadow = cast; m.receiveShadow = recv;
  if (name) m.name = name;
  if (parent) parent.add(m);
  return m;
}

export function cyl(rt, rb, h, mat, { seg = 14, x = 0, y = 0, z = 0, ry = 0, rz = 0, rx = 0, cast = true, recv = true, parent = null } = {}) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.castShadow = cast; m.receiveShadow = recv;
  if (parent) parent.add(m);
  return m;
}

// Lit decal plane (spray paint, posters, signs) attached flush to a surface.
export function decal(tex, w, h, { x = 0, y = 0, z = 0, ry = 0, rx = 0, rz = 0, opacity = 1, mat = null, parent = null } = {}) {
  const material = mat || noOutline(new THREE.MeshToonMaterial({
    map: tex, transparent: true, opacity, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4,
  }));
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
  m.position.set(x, y, z);
  m.rotation.set(rx, ry, rz);
  m.renderOrder = 2;
  if (parent) parent.add(m);
  return m;
}

// Wall-mounted ladder with side rails and rungs. Total height h, width w.
export function ladder(w, h, mat, { x = 0, y = 0, z = 0, ry = 0, parent = null, rungGap = 0.36, depth = 0.14 } = {}) {
  const g = new THREE.Group();
  box(0.07, h, 0.07, mat, { x: -w / 2, y: h / 2, z: depth / 2, parent: g });
  box(0.07, h, 0.07, mat, { x: w / 2, y: h / 2, z: depth / 2, parent: g });
  const n = Math.max(2, Math.floor(h / rungGap));
  for (let i = 1; i <= n; i++) {
    box(w, 0.05, 0.05, mat, { y: (i / (n + 1)) * h, z: depth / 2, parent: g, cast: false });
  }
  g.position.set(x, y, z);
  g.rotation.y = ry;
  if (parent) parent.add(g);
  return g;
}

// Straight stair run ascending toward local -z... ascending toward +z? Steps rise along +z.
// Returns group whose steps start at local origin (first step at z=0) rising to (z = steps*run, y = steps*rise).
export function stairs(mat, { steps = 8, rise = 0.32, run = 0.34, width = 2.4, x = 0, y = 0, z = 0, ry = 0, parent = null } = {}) {
  const g = new THREE.Group();
  for (let i = 0; i < steps; i++) {
    box(width, rise * (i + 1), run, mat, { y: (rise * (i + 1)) / 2, z: i * run + run / 2, parent: g });
  }
  g.position.set(x, y, z);
  g.rotation.y = ry;
  if (parent) parent.add(g);
  return g;
}

// Simple railing: posts + two horizontal bars along local z axis.
export function railing(mat, { len = 6, h = 1.0, x = 0, y = 0, z = 0, ry = 0, parent = null } = {}) {
  const g = new THREE.Group();
  const n = Math.max(2, Math.round(len / 1.5));
  for (let i = 0; i <= n; i++) {
    box(0.06, h, 0.06, mat, { x: 0, y: h / 2, z: (i / n) * len, parent: g, cast: false });
  }
  box(0.05, 0.07, len, mat, { y: h, x: 0, z: len / 2, parent: g, cast: false });
  box(0.05, 0.07, len, mat, { y: h * 0.55, x: 0, z: len / 2, parent: g, cast: false });
  g.position.set(x, y, z);
  g.rotation.y = ry;
  if (parent) parent.add(g);
  return g;
}

// Catenary-ish sagging wire between two points (TubeGeometry along a quadratic curve).
export function wire(a, b, mat, { sag = 0.8, r = 0.022, segs = 20, parent = null } = {}) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.y -= sag;
  const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
  const geo = new THREE.TubeGeometry(curve, segs, r, 4, false);
  const m = new THREE.Mesh(geo, mat);
  m.castShadow = false; m.receiveShadow = false;
  if (parent) parent.add(m);
  return m;
}

// Instanced small disc decal set (bullet holes). pts: [{p:Vector3 normal-facing +z after rot}].
export function bulletHoles(n, area, tex, mat, { x = 0, y = 0, z = 0, ry = 0, parent = null, size = 0.09 } = {}) {
  const geo = new THREE.PlaneGeometry(size, size);
  const inst = new THREE.InstancedMesh(geo, mat, n);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < n; i++) {
    dummy.position.set(rnd(-area, area), rnd(-area * 0.7, area * 0.7), 0);
    dummy.rotation.z = rnd(0, Math.PI * 2);
    dummy.updateMatrix();
    inst.setMatrixAt(i, dummy.matrix);
  }
  inst.position.set(x, y, z);
  inst.rotation.y = ry;
  inst.renderOrder = 3;
  if (parent) parent.add(inst);
  return inst;
}

export function group(name = '') {
  const g = new THREE.Group();
  if (name) g.name = name;
  return g;
}
