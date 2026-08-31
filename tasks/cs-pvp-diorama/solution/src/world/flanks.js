import { drip } from './layout.js';
import { box, group } from './kit.js';
import {
  barbedFence,
  bollard,
  cardboardStack,
  crate,
  crateStack,
  industrialBin,
  pole,
  tireStack,
} from './props.js';
import {
  CatmullRomCurve3,
  Mesh,
  MeshBasicMaterial,
  TubeGeometry,
  Vector3,
} from 'three';

function wire(parent, a, b, sag = 0.35) {
  const mid = a.clone().lerp(b, 0.5);
  mid.y -= sag;
  const curve = new CatmullRomCurve3([a, mid, b]);
  const geo = new TubeGeometry(curve, 16, 0.012, 5, false);
  const mat = new MeshBasicMaterial({ color: 0x111214 });
  mat.userData.outlineParameters = { visible: false, keepAlive: true };
  const mesh = new Mesh(geo, mat);
  parent.add(mesh);
  return mesh;
}

export function addFlanks(root, mats) {
  const g = group(root, 0, 0, 0);

  box(g, mats.wall, 0.14, 1.25, 8.6, -5.18, 0.62, 0.55);
  box(g, mats.wall, 0.18, 0.85, 0.18, -4.72, 0.42, 3.85);
  box(g, mats.wall, 0.18, 0.85, 0.18, -4.72, 0.42, 0.25);
  box(g, mats.wall, 0.18, 0.85, 0.18, -4.72, 0.42, -2.15);
  crate(g, mats, -4.85, 0, 1.55, 0.2, 0.2);
  industrialBin(g, mats, -4.82, 0, -0.85, true, 0.3);
  cardboardStack(g, mats, -4.88, 0, -1.55, 2);
  barbedFence(g, mats, -5.05, 0, -3.15, 1.4, 0, 0.5);

  box(g, mats.concrete, 0.72, 0.55, 3.15, 2.48, 0.28, -1.15);
  box(g, mats.concrete, 0.78, 0.08, 3.2, 2.48, 0.58, -1.15);
  crateStack(g, mats, 2.55, 0.58, -0.15, 2, 0.18, 0.1);
  crate(g, mats, 2.62, 0.58, -1.85, 0.18, 0.2);
  bollard(g, mats, 2.95, 0, 0.15);
  bollard(g, mats, 3.15, 0, -2.15);
  tireStack(g, mats, 3.55, 0, -1.15, 3);

  box(g, mats.wall, 0.14, 1.35, 3.4, 5.18, 0.67, -1.4);
  box(g, mats.wall, 1.4, 1.15, 0.12, 4.55, 0.57, -5.18);

  const p1 = pole(g, mats, -5.0, 0, 5.05, 2.05);
  const p2 = pole(g, mats, 5.0, 0, 5.05, 2.12);
  const p3 = pole(g, mats, 5.0, 0, -2.05, 2.0);
  const p4 = pole(g, mats, -5.0, 0, -2.15, 1.92);
  const p5 = pole(g, mats, 0.15, 0, 2.85, 1.85);
  void p1;
  void p2;
  void p3;
  void p4;
  void p5;

  wire(g, new Vector3(-5.0, 1.95, 5.05), new Vector3(0.15, 1.75, 2.85), 0.42);
  wire(g, new Vector3(0.15, 1.75, 2.85), new Vector3(5.0, 2.02, 5.05), 0.38);
  wire(g, new Vector3(5.0, 2.02, 5.05), new Vector3(5.0, 1.88, -2.05), 0.55);
  wire(g, new Vector3(-5.0, 1.95, 5.05), new Vector3(-5.0, 1.8, -2.15), 0.48);
  wire(g, new Vector3(-5.0, 1.8, -2.15), new Vector3(0.2, 1.55, -0.2), 0.32);
  wire(g, new Vector3(5.0, 1.88, -2.05), new Vector3(2.2, 1.55, 0.9), 0.22);

  drip(-5.0, 2.0, 5.05);
  drip(5.0, 2.05, -2.05);
  return g;
}
