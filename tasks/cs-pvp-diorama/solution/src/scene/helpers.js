import * as THREE from 'three';

export function box(w, h, d, mat, x = 0, y = 0, z = 0, ry = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function cyl(rt, rb, h, mat, x = 0, y = 0, z = 0, seg = 12) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function plane(w, h, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.x = rx;
  m.rotation.y = ry;
  m.receiveShadow = true;
  return m;
}

// No-shadow plane (decals, glass, glow cards).
export function card(w, h, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.rotation.x = rx;
  m.rotation.y = ry;
  return m;
}

export function group(...children) {
  const g = new THREE.Group();
  for (const c of children) if (c) g.add(c);
  return g;
}

// Triangular prism ramp: rises along +z from 0 to height over run length.
export function ramp(width, run, height, mat, x, y, z, ry = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(-run / 2, 0);
  shape.lineTo(run / 2, 0);
  shape.lineTo(run / 2, height);
  shape.lineTo(-run / 2, 0);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
  geo.translate(0, 0, -width / 2);
  geo.rotateY(Math.PI / 2); // width along x, run along z... re-check below
  const m = new THREE.Mesh(geo, mat);
  // After rotateY(90°): original x (run) → -z? Keep simple: build with run on z:
  m.rotation.y = 0;
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Cleaner ramp: width along x, run along z (z from -run/2 low to +run/2 high).
export function rampZ(width, run, height, mat, x, y, z, ry = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(-run / 2, 0);
  shape.lineTo(run / 2, 0);
  shape.lineTo(run / 2, height);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
  // shape x → run axis, extrude z → width axis. Rotate: shape-x → world-z, extrude-z → world-x.
  geo.rotateY(-Math.PI / 2);
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.rotation.y = ry;
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function stairs(width, steps, stepH, stepD, mat, x, y, z, ry = 0) {
  const g = new THREE.Group();
  for (let i = 0; i < steps; i++) {
    const s = box(width, stepH, stepD, mat, 0, stepH / 2 + i * stepH, -i * stepD);
    g.add(s);
  }
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

export function ladder(rails, rungMat, height, x, y, z, ry = 0) {
  const g = new THREE.Group();
  const halfW = 0.35;
  g.add(box(0.09, height, 0.09, rails, -halfW, height / 2, 0));
  g.add(box(0.09, height, 0.09, rails, halfW, height / 2, 0));
  const n = Math.max(2, Math.floor(height / 0.42));
  for (let i = 0; i < n; i++) {
    g.add(box(halfW * 2, 0.06, 0.07, rungMat, 0, 0.28 + i * ((height - 0.3) / n), 0));
  }
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

export function addBulletHoleCluster(parent, mat, cx, cy, cz, ry, count, rng) {
  for (let i = 0; i < count; i++) {
    const s = 0.18 + rng() * 0.22;
    const h = card(s, s, mat, cx + (rng() - 0.5) * 1.6, cy + (rng() - 0.5) * 1.2, cz, 0, ry);
    // push slightly off the wall along its normal
    const nx = Math.sin(ry);
    const nz = Math.cos(ry);
    h.position.x += nx * 0.02;
    h.position.z += nz * 0.02;
    h.rotation.x = 0;
    parent.add(h);
  }
}
