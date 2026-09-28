// CT spawn (south): police cordon. Barriers and shields up front, police van
// on the left, concrete overwatch platform with searchlight on the right,
// badge + warning wall behind, gear crates.
import * as THREE from 'three';
import { Chunk, mesh, decalMesh } from '../core/toon.js';
import { badgeTexture, textDecal, policeStripeTexture } from '../core/textures.js';
import {
  subChunk,
  crate,
  jerseyBarrier,
  plasticBarrier,
  policeShield,
  gearCrate,
  sandbags,
  tireStack,
  cardboardPile,
  barbedWire,
  trafficCone,
} from './props.js';

function policeVan(chunk, x, y, z, ry = 0) {
  const c = subChunk(chunk, x, y, z, ry);
  // wheels + chassis
  for (const [wx, wz] of [[-0.8, -1.5], [0.8, -1.5], [-0.8, 1.5], [0.8, 1.5]]) {
    c.cyl('tire', 0.36, 0.36, 0.24, 10, wx, 0.04, wz, { rz: Math.PI / 2 });
  }
  c.box('metalDark', 1.8, 0.3, 4.6, 0, 0.4, 0);
  // body: van box + hood + cab
  c.box('vanWhite', 2.1, 1.9, 3.4, 0, 0.55, 0.55);
  c.box('vanWhite', 2.0, 1.25, 1.1, 0, 0.55, -1.75);
  c.box('vanWhite', 1.9, 0.5, 0.7, 0, 0.45, -2.45);
  c.box('windowDark', 1.8, 0.5, 0.06, 0, 1.32, -2.28); // windshield
  c.box('windowDark', 0.06, 0.45, 0.8, -1.0, 1.28, -1.7);
  c.box('windowDark', 0.06, 0.45, 0.8, 1.0, 1.28, -1.7);
  // rear doors
  c.box('metalDark', 2.0, 1.7, 0.06, 0, 0.62, 2.28);
  c.box('vanWhite', 0.9, 1.55, 0.04, -0.5, 0.68, 2.32);
  c.box('vanWhite', 0.9, 1.55, 0.04, 0.5, 0.68, 2.32);
  // bumpers
  c.box('metalDark', 2.0, 0.28, 0.15, 0, 0.3, -2.82);
  c.box('metalDark', 2.0, 0.28, 0.15, 0, 0.3, 2.36);
}

export function buildRegionCT(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();

  // --- rear wall (z=35) + side walls ------------------------------------------
  chunk.box('wallA', 28.8, 3.4, 0.6, 0, 0, 35);
  chunk.box('wallA', 0.6, 2.8, 10, -14, 0, 30);
  chunk.box('wallA', 0.6, 2.8, 10, 14, 0, 30);
  barbedWire(chunk, 0, 3.45, 35, 28);
  // hazard stripe along wall base
  // (thin painted curb boxes)
  chunk.box('curbPaint', 28, 0.25, 0.15, 0, 0, 34.6);

  // --- defensive line at the front edge ----------------------------------------
  plasticBarrier(chunk, -2.6, 0, 26.6, 0.15);
  plasticBarrier(chunk, 2.6, 0, 26.6, -0.2);
  jerseyBarrier(chunk, -6.5, 0, 26.2, 0.3);
  jerseyBarrier(chunk, 6.5, 0, 26.4, -0.25);
  policeShield(chunk, -1.2, 0, 27.2, 0.3);
  policeShield(chunk, -0.6, 0, 27.35, 0.1);
  policeShield(chunk, 1.3, 0, 27.2, -0.35);
  sandbags(chunk, 4.3, 0, 27.6, 0.15);
  trafficCone(chunk, -4.6, 0, 26.0, 0.3);
  trafficCone(chunk, -5.4, 0, 27.1, 1.2);
  trafficCone(chunk, 0.4, 0, 26.9, 2.1);
  trafficCone(chunk, 3.9, 0, 25.8, 0.7);

  // --- police van (left) ---------------------------------------------------------
  policeVan(chunk, -8.4, 0, 29.6, 0.42);
  const stripe = decalMesh(policeStripeTexture(), 3.3, 0.8, { opacity: 0.95 });
  stripe.position.set(-7.35, 1.45, 30.35);
  stripe.rotation.y = 0.42 + Math.PI / 2;
  // place on the van's visible flank: compute from van transform
  stripe.position.set(-8.4 + Math.sin(0.42 + Math.PI / 2) * 1.08, 1.45, 29.6 + Math.cos(0.42 + Math.PI / 2) * 1.08);
  stripe.rotation.y = 0.42 + Math.PI / 2;
  g.add(stripe);

  // --- overwatch platform (right) with stairs + searchlight -----------------------
  chunk.box('concrete', 7, 2.4, 6, 8.5, 0, 30);
  chunk.box('concreteDark', 7.2, 0.18, 6.2, 8.5, 2.4, 30);
  // stairs on the west face, highest step adjacent to the platform
  for (let i = 0; i < 6; i++) {
    chunk.box('concrete', 0.42, 2.4 - 0.4 * i, 1.8, 5.11 - 0.42 * i, 0, 30);
  }
  // railing on platform north edge
  for (let i = 0; i <= 6; i++) chunk.box('metalDark', 0.05, 0.85, 0.05, 5.4 + i, 2.58, 27.15);
  chunk.box('metalDark', 6.6, 0.06, 0.06, 8.4, 3.43, 27.15);
  // sandbag nest on platform front
  sandbags(chunk, 7.2, 2.58, 27.8, 0.1, 2);
  // searchlight (dynamic sweep): drum axis along z, lens facing -z (north/mid)
  const search = new THREE.Group();
  const sbase = mesh(new THREE.CylinderGeometry(0.3, 0.38, 0.35, 10), mats.metalDark);
  sbase.position.y = 0.18;
  const yoke = mesh(new THREE.BoxGeometry(0.08, 0.55, 0.08), mats.metalDark);
  yoke.position.set(-0.32, 0.6, 0);
  const yoke2 = mesh(new THREE.BoxGeometry(0.08, 0.55, 0.08), mats.metalDark);
  yoke2.position.set(0.32, 0.6, 0);
  const drum = mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.62, 12), mats.metal);
  drum.rotation.x = Math.PI / 2 - 0.18; // slight downward pitch
  drum.position.y = 0.85;
  const lens = mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.05, 12), mats.lampCold, { outline: false });
  lens.rotation.x = Math.PI / 2 - 0.18;
  lens.position.set(0, 0.85 - Math.sin(0.18) * 0.33, -Math.cos(0.18) * 0.33);
  search.add(sbase, yoke, yoke2, drum, lens);
  search.position.set(9.5, 2.58, 29);
  g.add(search);
  ctx.searchlight = search;
  ctx.tickers.push((t) => {
    search.rotation.y = Math.sin(t * 0.35) * 0.5; // sweep across the mid entrance
  });

  // --- gear crates + spare equipment ----------------------------------------------
  gearCrate(chunk, -10.2, 0, 33.6, 0.2);
  gearCrate(chunk, -8.8, 0, 33.9, -0.3);
  crate(chunk, 12.2, 0, 33.4, 1.1, 0.1);
  policeShield(chunk, 12.0, 1.1, 33.55, 0.05);
  tireStack(chunk, 5.2, 0, 33.6, 2);
  cardboardPile(chunk, -12.6, 0, 33.2, 1.9);

  // --- badge + warnings on rear wall ------------------------------------------------
  const badge = decalMesh(badgeTexture(), 2.6, 2.6, { opacity: 0.95 });
  badge.position.set(0, 1.9, 34.67);
  badge.rotation.y = Math.PI;
  g.add(badge);
  const keepOut = decalMesh(textDecal('KEEP OUT', { color: '#c8ccd4', size: 56, seed: 41 }), 3.6, 1.0, { opacity: 0.85 });
  keepOut.position.set(-8, 1.7, 34.67);
  keepOut.rotation.y = Math.PI;
  g.add(keepOut);
  const cordon = decalMesh(textDecal('POLICE LINE — DO NOT CROSS', { color: '#d8b23a', size: 30, seed: 42 }), 4.6, 0.6, { opacity: 0.9 });
  cordon.position.set(8, 1.0, 34.67);
  cordon.rotation.y = Math.PI;
  g.add(cordon);
  const ctSpray = decalMesh(textDecal('CT', { color: '#5a86c8', size: 100, seed: 43 }), 2.0, 2.0);
  ctSpray.position.set(-13.67, 1.5, 28);
  ctSpray.rotation.y = Math.PI / 2;
  g.add(ctSpray);

  g.add(chunk.build(mats));
  scene.add(g);

  // van light bar: alternating red/blue (slow, distant-police feel)
  const barR = mesh(new THREE.BoxGeometry(0.34, 0.14, 0.2), mats.lampRed, { outline: false });
  const barB = mesh(new THREE.BoxGeometry(0.34, 0.14, 0.2), mats.lampBlue, { outline: false });
  const vanPos = new THREE.Vector3(-8.4, 2.62, 29.6);
  const cos = Math.cos(0.42);
  const sin = Math.sin(0.42);
  barR.position.set(vanPos.x - 0.4 * cos, vanPos.y, vanPos.z + 0.4 * sin);
  barB.position.set(vanPos.x + 0.4 * cos, vanPos.y, vanPos.z - 0.4 * sin);
  barR.rotation.y = barB.rotation.y = 0.42;
  g.add(barR, barB);
  ctx.tickers.push((t) => {
    const phase = Math.sin(t * 2.2);
    barR.visible = phase > 0;
    barB.visible = phase <= 0;
  });
  ctx.vanLightAnchor = { red: barR.position.clone(), blue: barB.position.clone() };
}
