// Connective tissue: west alley + narrow passage walls, east elevated flank
// walkway with stairs, shooting-hole platforms, perimeter walls, utility
// poles with sagging wires, and ambient junk.
import * as THREE from 'three';
import { Chunk, decalMesh } from '../core/toon.js';
import { textDecal, freightSignTexture, bulletHoleTexture } from '../core/textures.js';
import {
  subChunk,
  crate,
  barrel,
  cardboardPile,
  container,
  dumpster,
  tireStack,
  pallet,
  poleWithCrossarm,
  wire,
  trashBin,
  trafficCone,
} from './props.js';

function stairs(chunk, key, x, y, z, width, rise, run, steps, ry = 0) {
  // ascends toward +x before rotation
  const c = subChunk(chunk, x, y, z, ry);
  for (let i = 0; i < steps; i++) {
    c.box(key, run, (rise / steps) * (i + 1), width, i * run + run / 2, 0, 0);
  }
}

function railing(chunk, x0, z0, x1, z1, y, h = 0.95) {
  const dx = x1 - x0;
  const dz = z1 - z0;
  const len = Math.hypot(dx, dz);
  const ry = Math.atan2(dz, dx) * -1;
  const c = subChunk(chunk, (x0 + x1) / 2, y, (z0 + z1) / 2, ry);
  const posts = Math.max(2, Math.round(len / 1.6) + 1);
  for (let i = 0; i < posts; i++) {
    c.box('metalDark', 0.05, h, 0.05, -len / 2 + (i / (posts - 1)) * len, 0, 0);
  }
  c.box('metalDark', len, 0.06, 0.06, 0, h - 0.03, 0);
  c.box('metalDark', len, 0.05, 0.05, 0, h * 0.5, 0);
}

export function buildLinks(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();

  // --- perimeter walls ---------------------------------------------------------
  chunk.box('wallB', 0.6, 2.6, 72, -35.6, 0, 0); // west
  chunk.box('wallB', 0.6, 2.6, 72, 35.6, 0, 0); // east
  chunk.box('wallB', 72, 3.0, 0.6, 0, 0, 35.6); // south (behind CT)
  chunk.box('wallB', 24.5, 3.0, 0.6, -24, 0, -35.6); // north-west of T rear wall
  chunk.box('wallB', 24.5, 3.0, 0.6, 24, 0, -35.6); // north-east of T rear wall

  // --- alley east wall (x=-30), with passage junction opening z -25..-23 -------
  chunk.box('wallB', 0.5, 2.4, 45, -30, 0, -0.5 + 0); // z -23..22
  // passage west wall is the warehouse; passage north cap connects to alley
  // narrow passage floor junk
  barrel(chunk, -29, 0, -18.5, 'barrelRust');
  cardboardPile(chunk, -29.2, 0, -14.5, 0.3);

  // --- fences sealing the dead strip north of the alley link -------------------
  chunk.box('rust', 0.15, 2.2, 6.8, -12, 0, -31.9); // x=-12, z -35.3..-28.5
  chunk.box('rust', 23.2, 2.2, 0.15, -23.5, 0, -28.7); // z=-28.7, x -35..-11.9

  // --- alley props --------------------------------------------------------------
  dumpster(chunk, -32.6, 0, -3.5, 0.05);
  cardboardPile(chunk, -31.4, 0, -1.8, 0.7);
  tireStack(chunk, -33.8, 0, 8.5, 2);
  trashBin(chunk, -31.2, 0, 12.5);
  crate(chunk, -32.8, 0, 18.5, 1.0, 0.3);
  barrel(chunk, -31.4, 0, 20.3);
  // junk in the enclosed corners (behind the warehouse; SW pocket behind CT)
  dumpster(chunk, -17, 0, -31.5, 1.57);
  tireStack(chunk, -21, 0, -33, 3);
  crate(chunk, -15, 0, -33.2, 0.9, 0.8);
  container(chunk, -27, 0, 30, 'contRed', 0.35);
  dumpster(chunk, -19, 0, 31.5, 0.1);
  tireStack(chunk, -23.5, 0, 33, 2);
  pallet(chunk, -31, 0, 32, 0.9);

  // --- T south boundary walls (flanking the ramp + exits) -------------------------
  chunk.box('concreteDark', 4.4, 1.3, 0.4, -9.9, 0, -25.5); // west of connector opening
  chunk.box('concreteDark', 3.2, 1.3, 0.4, 5.9, 0, -25.5); // east partial cover

  // --- east elevated flank walkway --------------------------------------------------
  const deckY = 1.6;
  // deck
  chunk.box('grate', 4.0, 0.14, 44, 32, deckY - 0.14, 0);
  // support posts
  for (let z = -20; z <= 20; z += 5.5) {
    chunk.cyl('metalDark', 0.09, 0.11, deckY - 0.14, 6, 30.4, 0, z);
    chunk.cyl('metalDark', 0.09, 0.11, deckY - 0.14, 6, 33.6, 0, z);
    chunk.box('metalDark', 3.4, 0.1, 0.1, 32, deckY - 0.35, z);
  }
  // railings both sides
  railing(chunk, 30.1, -22, 30.1, 22, deckY);
  railing(chunk, 33.9, -22, 33.9, 22, deckY);
  // north stairs: ascend from the B approach yard (z=-25.7) southward to deck
  stairs(chunk, 'metalDark', 32, 0, -25.7, 2.6, deckY, 0.45, 4, -Math.PI / 2);
  chunk.box('grate', 2.6, 0.12, 1.4, 32, deckY - 0.12, -22.4);
  // south stairs: ascend from CT east yard (z=25.7) northward to deck
  stairs(chunk, 'metalDark', 32, 0, 25.7, 2.6, deckY, 0.45, 4, Math.PI / 2);
  chunk.box('grate', 2.6, 0.12, 1.4, 32, deckY - 0.12, 22.4);
  // mid stairs: ascend from the B yard (x=27.2) eastward to the deck
  stairs(chunk, 'metalDark', 27.2, 0, -6.9, 2.4, deckY, 0.45, 4, 0);
  chunk.box('grate', 1.4, 0.12, 2.4, 29.6, deckY - 0.12, -6.9);

  // --- shooting-hole platforms -------------------------------------------------------
  // west platform beside mid wall (deck y 2.6), stairs south to A yard
  chunk.box('grate', 3.5, 0.12, 5.0, -6.25, 2.6, -5.5);
  for (const [px, pz] of [[-7.9, -7.9], [-4.6, -7.9], [-7.9, -3.1], [-4.6, -3.1]]) {
    chunk.cyl('metalDark', 0.08, 0.1, 2.6, 6, px, 0, pz);
  }
  stairs(chunk, 'metalDark', -6.25, 0, -0.2, 1.6, 2.6, 0.4, 7, Math.PI / 2);
  railing(chunk, -8, -8, -8, -3, 2.72);
  railing(chunk, -8, -8, -4.5, -8, 2.72);
  // east platform beside mid wall, stairs south
  chunk.box('grate', 3.5, 0.12, 5.0, 6.25, 2.6, 5.5);
  for (const [px, pz] of [[4.6, 3.1], [7.9, 3.1], [4.6, 7.9], [7.9, 7.9]]) {
    chunk.cyl('metalDark', 0.08, 0.1, 2.6, 6, px, 0, pz);
  }
  stairs(chunk, 'metalDark', 6.25, 0, 10.8, 1.6, 2.6, 0.4, 7, Math.PI / 2);
  railing(chunk, 8, 3, 8, 8, 2.72);
  railing(chunk, 4.5, 8, 8, 8, 2.72);

  // --- shortcut corridor walls ----------------------------------------------------------
  chunk.box('wallB', 0.4, 1.5, 23.5, 10, 0, 10.25); // west side x=10, z -1.5..22
  chunk.box('rust', 0.15, 1.6, 20, 13.5, 0, 12); // east fence x=13.5, z 2..22
  // corridor props
  trashBin(chunk, 11, 0, 15.5);
  cardboardPile(chunk, 12.4, 0, 4.5, 1.2);
  trafficCone(chunk, 11.2, 0, 6.5, 0.5);
  trafficCone(chunk, -7.6, 0, -10.2, 1.9);
  barrel(chunk, -9.8, 0, -5.5, 'barrelRust');
  pallet(chunk, -6.2, 0, -16.8, 1.2);

  // --- CT east yard enclosure (between shortcut and flank) -------------------------------
  chunk.box('wallB', 16.5, 2.2, 0.4, 22.2, 0, 22); // north wall of east yard
  pallet(chunk, 18, 0, 24, 0.4);
  crate(chunk, 24.5, 0, 23.8, 1.0, 0.5);
  dumpster(chunk, 20.5, 0, 24.2, -0.15);
  barrel(chunk, 27.5, 0, 23.6);
  barrel(chunk, 28.3, 0, 24.1, 'barrelRust');
  crate(chunk, 16.2, 0, 24.3, 0.85, 0.9);
  cardboardPile(chunk, 22.8, 0, 24.1, 2.2);

  // --- B approach north boundary (east of house) -------------------------------------------
  chunk.box('wallB', 8.2, 2.4, 0.4, 32, 0, -25.5);

  // --- utility poles + sagging wires ----------------------------------------------------------
  const poles = [
    [-33, -20], [-33, 12], [-6, -2.5], [13.8, -2.6], [33, -18], [33, 16], [-18, 24], [8, 24.5],
  ];
  for (const [px, pz] of poles) poleWithCrossarm(chunk, px, 0, pz, 6.5);
  const top = (px, pz, o = 0) => new THREE.Vector3(px + o, 6.5 - 0.7, pz);
  wire(chunk, top(-33, -20, 0.7), top(-6, -2.5, -0.7), 0.9);
  wire(chunk, top(-33, 12, 0.7), top(-18, 24, 0.6), 0.8);
  wire(chunk, top(-6, -2.5, 0.7), top(13.8, -2.6, -0.7), 0.7);
  wire(chunk, top(33, -18, -0.7), top(33, 16, -0.6), 0.9);
  wire(chunk, top(13.8, -2.6, 0.6), top(8, 24.5, -0.6), 0.85);
  wire(chunk, top(-18, 24, 0.6), top(8, 24.5, 0.6), 0.7);
  // drops to rooftops
  wire(chunk, top(-6, -2.5, 0), new THREE.Vector3(-14, 7.0, -9), 0.5);
  wire(chunk, top(13.8, -2.6, 0), new THREE.Vector3(17, 6.9, -12), 0.5);

  // --- graffiti / markings ---------------------------------------------------------------------
  const g1 = decalMesh(textDecal('NORTH DOCK', { color: '#93a0b4', size: 44, seed: 51 }), 4.2, 1.0, { opacity: 0.7 });
  g1.position.set(-35.28, 1.5, -8);
  g1.rotation.y = Math.PI / 2;
  g.add(g1);
  const g2 = decalMesh(textDecal('GOOSE', { color: '#b06a3a', size: 60, seed: 52, angle: -0.08 }), 2.6, 1.0, { opacity: 0.75 });
  g2.position.set(-35.28, 1.2, 16);
  g2.rotation.y = Math.PI / 2;
  g.add(g2);
  const g3 = decalMesh(textDecal('FR-2084', { color: '#c3c9d4', size: 52, seed: 53 }), 2.8, 0.9, { opacity: 0.8 });
  g3.position.set(35.28, 1.6, -8);
  g3.rotation.y = -Math.PI / 2;
  g.add(g3);
  const holes = decalMesh(bulletHoleTexture(), 1.8, 1.8);
  holes.position.set(10.2, 0.9, 8);
  holes.rotation.y = -Math.PI / 2;
  g.add(holes);
  // freight sign at the A passage entrance
  const sign = decalMesh(freightSignTexture(), 2.2, 1.1, { opacity: 0.95 });
  sign.position.set(-29.9, 1.9, -5.2);
  sign.rotation.y = Math.PI / 2;
  g.add(sign);

  g.add(chunk.build(mats));
  scene.add(g);
}
