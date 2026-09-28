// T spawn (north): freight-yard unloading area enclosed by containers and
// barbed wire, box truck + ladder on the left, container stack on the right,
// ramp ahead toward mid with barrel/pallet cover.
import * as THREE from 'three';
import { Chunk, decalMesh } from '../core/toon.js';
import { textDecal } from '../core/textures.js';
import {
  subChunk,
  crate,
  barrel,
  pallet,
  cardboardPile,
  container,
  barbedWire,
  ladder,
  tireStack,
} from './props.js';

function boxTruck(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  // chassis + wheels
  c.box('metalDark', 1.9, 0.3, 5.6, 0, 0.45, 0);
  for (const [wx, wz] of [[-0.85, -1.9], [0.85, -1.9], [-0.85, 1.6], [0.85, 1.6], [-0.85, 2.2], [0.85, 2.2]]) {
    c.cyl('tire', 0.38, 0.38, 0.25, 10, wx, 0.05, wz, { rz: Math.PI / 2 });
  }
  // box body
  c.box('truckBody', 2.35, 2.5, 4.1, 0, 0.75, 0.65);
  c.box('metal', 2.4, 0.12, 4.15, 0, 3.25, 0.65);
  // rear door frame + rollup lines
  c.box('metalDark', 2.2, 2.3, 0.08, 0, 0.85, 2.73);
  for (let i = 0; i < 5; i++) c.box('metal', 2.16, 0.05, 0.04, 0, 1.0 + i * 0.42, 2.78);
  // cab
  c.box('truckCab', 2.2, 1.5, 1.5, 0, 0.55, -2.05);
  c.box('truckCab', 2.2, 0.75, 0.9, 0, 0.55, -2.95);
  c.box('windowDark', 2.0, 0.55, 0.06, 0, 1.35, -2.83); // windshield
  c.box('windowDark', 0.06, 0.5, 0.9, -1.08, 1.3, -2.05);
  c.box('windowDark', 0.06, 0.5, 0.9, 1.08, 1.3, -2.05);
  c.box('rust', 2.24, 0.3, 0.92, 0, 0.35, -2.95); // rusty bumper/hood lip
  // headlights
  c.box('lampCold', 0.3, 0.18, 0.05, -0.7, 0.62, -3.41);
  c.box('lampCold', 0.3, 0.18, 0.05, 0.7, 0.62, -3.41);
}

export function buildRegionT(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();

  // --- rear (north) wall with loading door --------------------------------
  chunk.box('wallA', 24, 3.2, 0.6, 0, 0, -35);
  chunk.box('rust', 5.2, 2.6, 0.15, -4, 0, -34.65); // closed loading door
  for (let i = 0; i < 6; i++) chunk.box('metalDark', 5.2, 0.05, 0.05, -4, 0.35 + i * 0.4, -34.56);
  chunk.box('concreteDark', 6.0, 0.25, 0.7, -4, 0, -34.4); // dock bumper strip
  // canopy over the dock
  chunk.box('roofTin', 7.0, 0.12, 1.6, -4, 2.9, -34.1, { rx: 0.08 });
  barbedWire(chunk, 0, 3.25, -35, 24);

  // --- west: box truck + leaning ladder -----------------------------------
  boxTruck(chunk, -9.2, 0, -30.6, 0.06);
  ladder(chunk, -7.7, 0, -31.8, 3.4, 0.5, 0.42);

  // --- east: container stack with passable gap -----------------------------
  container(chunk, 7.5, 0, -32.5, 'contBlue', Math.PI / 2);
  container(chunk, 7.5, 0, -25.9, 'contRed', Math.PI / 2);
  container(chunk, 7.5, 2.6, -32.2, 'contGreen', Math.PI / 2);
  // east boundary low wall + wire (south of containers)
  chunk.box('concreteDark', 0.5, 1.1, 3.4, 11.8, 0, -23.7);
  barbedWire(chunk, 11.8, 1.15, -23.7, 3.4, Math.PI / 2);
  // west boundary low wall + wire (south of truck)
  chunk.box('concreteDark', 0.5, 1.1, 2.8, -11.8, 0, -24.2);
  barbedWire(chunk, -11.8, 1.15, -24.2, 2.8, Math.PI / 2);

  // --- ramp-side cover ------------------------------------------------------
  barrel(chunk, 5.3, 0, -23.3);
  barrel(chunk, 6.1, 0, -23.5);
  barrel(chunk, 5.7, 0, -22.5);
  barrel(chunk, 5.7, 0.95, -23.1); // stacked 4th
  pallet(chunk, 7.6, 0, -22.6, 0.2);
  pallet(chunk, 7.6, 0.19, -22.6, -0.1);
  crate(chunk, -5.8, 0, -24.2, 1.1, 0.15);
  crate(chunk, -5.7, 1.1, -24.3, 0.8, -0.2);
  cardboardPile(chunk, -3.4, 0, -33.6, 0.4);
  tireStack(chunk, 1.8, 0, -33.8, 3);

  // --- spawn markings / graffiti -------------------------------------------
  const tSpray = decalMesh(textDecal('T', { color: '#c8a24a', size: 120, seed: 21 }), 2.4, 2.4);
  tSpray.position.set(2.5, 1.6, -34.66);
  g.add(tSpray);
  const num = decalMesh(textDecal('BAY 03', { color: '#9aa2ad', size: 54, seed: 22 }), 3.4, 1.2);
  num.position.set(5.5, 2.0, -34.66);
  g.add(num);
  const cid1 = decalMesh(textDecal('FRT-2211', { color: '#d5dae2', size: 40, seed: 23 }), 3.2, 1.0);
  cid1.position.set(4.48, 1.4, -32.5);
  cid1.rotation.y = -Math.PI / 2;
  g.add(cid1);
  const cid2 = decalMesh(textDecal('CSX-073', { color: '#d5dae2', size: 40, seed: 24 }), 3.2, 1.0);
  cid2.position.set(4.48, 1.4, -25.9);
  cid2.rotation.y = -Math.PI / 2;
  g.add(cid2);

  g.add(chunk.build(mats));
  scene.add(g);
}
