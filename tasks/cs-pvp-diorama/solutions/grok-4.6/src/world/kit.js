import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  PlaneGeometry,
  SphereGeometry,
  Vector3,
} from 'three';

const boxCache = new Map();
const cylCache = new Map();

function key(parts) {
  return parts.map((n) => Number(n).toFixed(3)).join('|');
}

function boxGeo(w, h, d) {
  const k = key([w, h, d]);
  let g = boxCache.get(k);
  if (!g) {
    g = new BoxGeometry(w, h, d);
    boxCache.set(k, g);
  }
  return g;
}

function cylGeo(r, h, seg = 10, rs = 1) {
  const k = key([r, h, seg, rs]);
  let g = cylCache.get(k);
  if (!g) {
    g = new CylinderGeometry(r, r, h, seg, 1, false);
    cylCache.set(k, g);
  }
  return g;
}

export function box(parent, mat, w, h, d, x, y, z, ry = 0, rx = 0, rz = 0) {
  const mesh = new Mesh(boxGeo(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function cyl(parent, mat, r, h, x, y, z, ry = 0, seg = 10) {
  const mesh = new Mesh(cylGeo(r, h, seg), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function sphere(parent, mat, r, x, y, z, seg = 8) {
  const mesh = new Mesh(new SphereGeometry(r, seg, seg), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  parent.add(mesh);
  return mesh;
}

export function plane(parent, mat, w, h, x, y, z, rx = -Math.PI / 2, ry = 0) {
  const mesh = new Mesh(new PlaneGeometry(w, h), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, 0);
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function group(parent, x = 0, y = 0, z = 0, ry = 0) {
  const g = new Group();
  g.position.set(x, y, z);
  g.rotation.y = ry;
  parent.add(g);
  return g;
}

export function ribbedBox(parent, mat, w, h, d, x, y, z, ribs = 6, axis = 'z', ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mat, w, h, d, 0, 0, 0);
  const ribMat = mat;
  if (axis === 'z') {
    const step = w / ribs;
    for (let i = 0; i < ribs; i += 1) {
      const px = -w / 2 + step * (i + 0.5);
      box(root, ribMat, step * 0.42, h + 0.012, d + 0.012, px, 0, 0);
    }
  } else {
    const step = d / ribs;
    for (let i = 0; i < ribs; i += 1) {
      const pz = -d / 2 + step * (i + 0.5);
      box(root, ribMat, w + 0.012, h + 0.012, step * 0.42, 0, 0, pz);
    }
  }
  return root;
}

export function ladder(parent, mats, height, x, y, z, ry = 0, width = 0.2) {
  const root = group(parent, x, y, z, ry);
  const railH = height;
  box(root, mats.rust, 0.018, railH, 0.018, -width / 2, railH / 2, 0);
  box(root, mats.rust, 0.018, railH, 0.018, width / 2, railH / 2, 0);
  const rungs = Math.max(3, Math.round(height / 0.13));
  for (let i = 0; i < rungs; i += 1) {
    const py = 0.06 + (i * (railH - 0.1)) / (rungs - 1);
    box(root, mats.rust, width, 0.012, 0.016, 0, py, 0);
  }
  return root;
}

export function leaningLadder(parent, mats, height, x, y, z, lean = 0.35, ry = 0) {
  const root = group(parent, x, y, z, ry);
  root.rotation.z = -lean;
  ladder(root, mats, height, 0, 0, 0, 0);
  return root;
}

export function steps(parent, mat, count, tread, rise, width, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  for (let i = 0; i < count; i += 1) {
    box(root, mat, width, rise, tread, 0, rise / 2 + i * rise, i * tread);
  }
  return root;
}

export function rail(parent, mat, length, height, x, y, z, ry = 0) {
  const root = group(parent, x, y, z, ry);
  box(root, mat, 0.03, height, 0.03, -length / 2, height / 2, 0);
  box(root, mat, 0.03, height, 0.03, length / 2, height / 2, 0);
  box(root, mat, length, 0.025, 0.025, 0, height, 0);
  box(root, mat, length, 0.016, 0.016, 0, height * 0.5, 0);
  return root;
}

export function lookTarget(x, y, z) {
  return new Vector3(x, y, z);
}
