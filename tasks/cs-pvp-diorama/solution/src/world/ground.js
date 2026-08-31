import {
  CircleGeometry,
  Mesh,
  PlaneGeometry,
  RepeatWrapping,
} from 'three';
import { BASE, hooks } from './layout.js';
import { box, cyl } from './kit.js';

function puddle(parent, mats, w, d, x, z, rot = 0) {
  const mesh = new Mesh(new PlaneGeometry(w, d, 8, 8), mats.puddle);
  mesh.rotation.x = -Math.PI / 2;
  mesh.rotation.z = rot;
  mesh.position.set(x, 0.014, z);
  mesh.receiveShadow = true;
  parent.add(mesh);
  hooks.puddles.push(mesh);
  return mesh;
}

function puddleRound(parent, mats, r, x, z) {
  const mesh = new Mesh(new CircleGeometry(r, 16), mats.puddle);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(x, 0.015, z);
  mesh.receiveShadow = true;
  parent.add(mesh);
  hooks.puddles.push(mesh);
  return mesh;
}

export function addGround(root, mats) {
  const pad = new Mesh(new PlaneGeometry(BASE - 0.28, BASE - 0.28), mats.asphalt);
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = 0.002;
  pad.receiveShadow = true;
  root.add(pad);

  box(root, mats.darkConcrete, 3.4, 0.012, 2.5, -3.4, 0.006, 2.55);
  box(root, mats.darkConcrete, 2.6, 0.01, 2.2, 3.4, 0.006, 2.9);
  box(root, mats.concrete, 4.6, 0.01, 2.0, 0.05, 0.006, -4.35);
  box(root, mats.asphalt, 2.15, 0.008, 5.6, 0, 0.007, -0.2);
  box(root, mats.darkConcrete, 0.62, 0.01, 8.4, -4.95, 0.007, 0.4);
  box(root, mats.darkConcrete, 0.7, 0.012, 3.6, 2.45, 0.018, -1.4);

  puddle(root, mats, 1.15, 0.42, 0.02, -0.1, 0.05);
  puddle(root, mats, 0.7, 0.32, -1.7, 4.4, 0.3);
  puddleRound(root, mats, 0.28, -0.4, 3.9);
  puddle(root, mats, 0.55, 0.28, -3.1, 1.15, -0.2);
  puddleRound(root, mats, 0.22, -4.95, 0.6);
  puddle(root, mats, 0.72, 0.38, 3.05, 1.75, 0.15);
  puddleRound(root, mats, 0.2, 2.15, 0.95);
  puddle(root, mats, 0.6, 0.26, -0.5, -4.2, 0.4);
  puddleRound(root, mats, 0.18, 1.6, -3.1);
  puddle(root, mats, 0.4, 0.22, 4.6, -0.8, 0.6);

  box(root, mats.rust, 0.42, 0.012, 2.85, 0, 0.018, -0.12);
  const water = new Mesh(new PlaneGeometry(0.36, 2.7), mats.water);
  water.rotation.x = -Math.PI / 2;
  water.position.set(0, 0.01, -0.12);
  root.add(water);
  hooks.puddles.push(water);

  const grateBars = 14;
  for (let i = 0; i < grateBars; i += 1) {
    const z = -1.42 + i * 0.2;
    box(root, mats.rust, 0.42, 0.012, 0.03, 0, 0.026, z);
  }
  box(root, mats.rust, 0.03, 0.014, 2.85, -0.2, 0.026, -0.12);
  box(root, mats.rust, 0.03, 0.014, 2.85, 0.2, 0.026, -0.12);

  cyl(root, mats.rust, 0.16, 0.02, -2.2, 0.012, -1.4, 0, 12);
  cyl(root, mats.rust, 0.14, 0.02, 4.35, 0.012, -2.05, 0, 12);
  cyl(root, mats.darkConcrete, 0.12, 0.02, 1.15, 0.012, 2.35, 0, 10);

  mats.tex.ripple.wrapS = RepeatWrapping;
  mats.tex.ripple.wrapT = RepeatWrapping;
}
