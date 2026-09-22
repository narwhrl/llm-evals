import * as THREE from 'three';
import { mat, label, random } from './materials.js';

const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x1b292e, transparent: true, opacity: .64 });

export function box(parent, material, x, y, z, w, h, d, outline = true) {
  const geometry = new THREE.BoxGeometry(w, h, d);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  mesh.castShadow = h > .12;
  mesh.receiveShadow = true;
  parent.add(mesh);
  if (outline && w > .12 && h > .12 && d > .12) {
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), edgeMaterial);
    mesh.add(edges);
  }
  return mesh;
}

export function cylinder(parent, material, x, y, z, radius, height, sides = 12) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, sides), material);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

export function tube(parent, material, start, end, radius = .04, sides = 6) {
  const a = new THREE.Vector3(...start);
  const b = new THREE.Vector3(...end);
  const delta = b.clone().sub(a);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, delta.length(), sides), material);
  mesh.position.copy(a.add(b).multiplyScalar(.5));
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  mesh.castShadow = radius > .035;
  parent.add(mesh);
  return mesh;
}

export function floorMark(parent, text, x, z, w, h, color = '#e1d5b9', size = 92) {
  const mark = label(text, w, h, { color, size });
  mark.rotation.x = -Math.PI / 2;
  mark.position.set(x, .145, z);
  parent.add(mark);
  return mark;
}

export function sign(parent, text, x, y, z, w, h, options = {}) {
  const { rotation = 0, background = '#394d51', color = '#e5dfce', size = 82 } = options;
  const panel = label(text, w, h, { background, color, size });
  panel.rotation.y = rotation;
  panel.position.set(x, y, z);
  parent.add(panel);
  return panel;
}

export function crate(parent, x, z, size = 1, height = size, y = .13) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  parent.add(root);
  box(root, mat.wood, 0, height / 2, 0, size, height, size);
  const offset = size * .41;
  for (const s of [-1, 1]) {
    box(root, mat.darkWood, s * offset, height / 2, size / 2 + .011, .065, height, .035, false);
    box(root, mat.darkWood, 0, height / 2, s * offset, size, .065, .035, false);
  }
  for (let i = -1; i <= 1; i += 2) {
    box(root, mat.darkWood, 0, height * (.5 + i * .32), size / 2 + .018, size, .055, .035, false);
  }
  return root;
}

export function barrel(parent, x, z, y = .15, color = mat.blueSteel) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  parent.add(root);
  cylinder(root, color, 0, .44, 0, .34, .85, 16);
  for (const level of [.15, .42, .73]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(.343, .023, 5, 16), mat.steel);
    band.rotation.x = Math.PI / 2;
    band.position.y = level;
    root.add(band);
  }
  cylinder(root, mat.dark, 0, .875, 0, .27, .02, 16);
  return root;
}

export function pallet(parent, x, z, angle = 0, y = .14) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = angle;
  parent.add(root);
  for (const dx of [-.53, 0, .53]) box(root, mat.darkWood, dx, .085, 0, .14, .16, 1.28, false);
  for (const dz of [-.52, -.26, 0, .26, .52]) box(root, mat.wood, 0, .19, dz, 1.45, .07, .2, false);
  return root;
}

export function sandbags(parent, x, z, count = 4, angle = 0) {
  const root = new THREE.Group();
  root.position.set(x, .15, z);
  root.rotation.y = angle;
  parent.add(root);
  for (let i = 0; i < count; i++) {
    for (let layer = 0; layer < (i % 2 ? 2 : 1); layer++) {
      const bag = new THREE.Mesh(new THREE.SphereGeometry(.42, 8, 5), mat.sandbag);
      bag.scale.set(1.1, .34, .55);
      bag.position.set((i - (count - 1) / 2) * .63, .12 + layer * .24, 0);
      bag.castShadow = true;
      root.add(bag);
    }
  }
  return root;
}

export function tire(parent, x, y, z, radius = .42, rotation = 0) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, .15, 7, 14), mat.rubber);
  mesh.position.set(x, y, z);
  mesh.rotation.y = rotation;
  mesh.castShadow = true;
  parent.add(mesh);
  const hub = cylinder(parent, mat.steel, x, y, z, .075, .08, 10);
  hub.rotation.x = Math.PI / 2;
  return mesh;
}

export function container(parent, x, y, z, w, h, d, color, code, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = rotation;
  parent.add(root);
  box(root, color, 0, h / 2, 0, w, h, d);
  for (let u = -w / 2 + .22; u < w / 2; u += .35) {
    box(root, mat.dark, u, h / 2, d / 2 + .01, .026, h - .13, .025, false);
    box(root, mat.dark, u, h / 2, -d / 2 - .01, .026, h - .13, .025, false);
  }
  for (const dx of [-w / 2 + .12, w / 2 - .12]) {
    box(root, mat.rust, dx, h / 2, d / 2 + .025, .09, h, .05, false);
  }
  sign(root, code, 0, h * .72, d / 2 + .052, Math.min(w * .68, 2.8), .38, { background: null, color: '#c8d0cb', size: 55 });
  return root;
}

export function barrier(parent, x, z, angle = 0, police = false) {
  const root = new THREE.Group();
  root.position.set(x, .13, z);
  root.rotation.y = angle;
  parent.add(root);
  const m = police ? mat.blueSteel : mat.concrete;
  box(root, m, 0, .45, 0, 1.65, .8, .36);
  box(root, mat.yellow, 0, .84, 0, 1.55, .08, .4, false);
  for (const s of [-1, 1]) box(root, mat.dark, s * .63, .45, .192, .19, .32, .02, false);
  return root;
}

export function lamp(parent, x, z, height = 5.5, warm = true) {
  const root = new THREE.Group();
  root.position.set(x, .13, z);
  parent.add(root);
  cylinder(root, mat.dark, 0, height / 2, 0, .095, height, 10);
  tube(root, mat.steel, [0, height - .2, 0], [.85, height - .2, 0], .075);
  box(root, mat.dark, .85, height - .34, 0, .58, .25, .52);
  box(root, new THREE.MeshBasicMaterial({ color: warm ? 0xffd498 : 0xceeaf2 }), .85, height - .47, 0, .46, .035, .42, false);
  const light = new THREE.PointLight(warm ? 0xffbc6d : 0xb5e4f6, warm ? 22 : 16, 10, 2);
  light.position.set(.85, height - .5, 0);
  root.add(light);
  return light;
}

export function vehicle(parent, x, z, police = false, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, .18, z);
  root.rotation.y = rotation;
  parent.add(root);
  const body = police ? mat.white : mat.greenSteel;
  box(root, mat.dark, 0, .64, 0, 2.05, 1.05, police ? 3.5 : 4.1);
  box(root, body, 0, 1.28, police ? -.35 : -.55, 1.95, 1.25, police ? 2.35 : 2.65);
  box(root, body, 0, .86, police ? 1.22 : 1.45, 1.88, .88, police ? .95 : 1.05);
  box(root, mat.glass, 0, 1.55, police ? .89 : 1.05, 1.65, .64, .05, false);
  box(root, mat.dark, 0, .73, police ? 1.76 : 2.05, 1.66, .19, .08);
  for (const s of [-1, 1]) {
    for (const zz of [-1.1, 1.2]) {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(.43, .43, .23, 14), mat.rubber);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(s * 1.02, .43, zz);
      root.add(wheel);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(.2, .2, .24, 10), mat.steel);
      hub.rotation.z = Math.PI / 2;
      hub.position.copy(wheel.position);
      root.add(hub);
    }
    box(root, mat.yellow, s * .65, .87, police ? 1.76 : 2.05, .33, .17, .05, false);
  }
  if (police) {
    box(root, mat.blueSteel, 0, 1.94, -.4, 1.65, .12, 1.8, false);
    box(root, mat.blue, -.32, 1.99, -.42, .5, .16, .3, false);
    box(root, mat.red, .32, 1.99, -.42, .5, .16, .3, false);
    sign(root, 'POLICE', 0, 1.25, -1.55, 1.5, .32, { background: null, size: 70, color: '#263a49' });
  } else {
    sign(root, 'NORTHLINE', 0, 1.5, -1.91, 1.6, .32, { background: null, size: 55 });
  }
  return root;
}

export function bulletScars(parent, x, y, z, count = 8, rotation = 0) {
  const root = new THREE.Group();
  root.position.set(x, y, z);
  root.rotation.y = rotation;
  parent.add(root);
  for (let i = 0; i < count; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(.025, .045 + random() * .025, 6), mat.dark);
    ring.position.set((random() - .5) * 1.1, (random() - .5) * .75, 0);
    root.add(ring);
  }
}
