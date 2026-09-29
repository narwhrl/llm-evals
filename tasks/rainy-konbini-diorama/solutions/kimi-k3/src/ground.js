// Exterior ground: square base, roads, sidewalk, crosswalk, parking, drainage,
// puddles, curb, guardrail and the dark street beyond the corner.
import * as THREE from 'three';
import { toon, flat, glow, box, cyl, planeGeo, outlined, boxGeo, at } from './toon.js';

export const HALF = 22; // base half-extent; base is 44 x 44

export function buildGround(scene) {
  const g = new THREE.Group();

  // ---- Square base slab (the collectible-model plinth) ----
  const base = box(HALF * 2, 1.6, HALF * 2, toon(0x2c3244, { steps: 3 }), { thickness: 0.012, color: 0x0c0e18 });
  base.position.y = -0.8;
  g.add(base);
  // Slightly lighter rim trim on the plinth edge.
  const rim = new THREE.Mesh(boxGeo(HALF * 2 + 0.24, 0.22, HALF * 2 + 0.24), flat(0x465071));
  rim.position.y = -0.08;
  g.add(rim);

  // ---- Roads: an L around the south + east sides of the corner sidewalk ----
  const roadMat = toon(0x1f2637, { steps: 3 });
  const road1 = box(36, 0.1, 7, roadMat);           // east-west road (south)
  at(road1, -4, 0.05, 18.5);
  const road2 = box(7, 0.1, 30, roadMat.clone());    // north-south road (east)
  at(road2, 18.5, 0.05, 0);
  g.add(road1, road2);

  // Wet sheen overlay on the roads (env reflection comes from scene.environment)
  const sheenMat = new THREE.MeshStandardMaterial({
    color: 0x1a2133, roughness: 0.35, metalness: 0.0,
    transparent: true, opacity: 0.4,
  });
  const sheen1 = new THREE.Mesh(planeGeo(36, 7), sheenMat);
  sheen1.rotation.x = -Math.PI / 2; sheen1.position.set(-4, 0.105, 18.5);
  const sheen2 = new THREE.Mesh(planeGeo(7, 30), sheenMat);
  sheen2.rotation.x = -Math.PI / 2; sheen2.position.set(18.5, 0.105, 0);
  g.add(sheen1, sheen2);

  // ---- Sidewalk block: raised, lighter, with curb edge ----
  const walkMat = toon(0x3d4459, { steps: 3 });
  const walk = box(30, 0.34, 30, walkMat, { thickness: 0.012 });
  at(walk, -7, 0.17, -7);
  g.add(walk);

  // Curb stones along road edges.
  const curbMat = toon(0x59617a, { steps: 3 });
  const curb1 = box(30.2, 0.4, 0.42, curbMat); at(curb1, -7, 0.2, 8.1);
  const curb2 = box(0.42, 0.4, 30.2, curbMat); at(curb2, 8.1, 0.2, -7);
  g.add(curb1, curb2);

  // ---- Reflective crosswalk (zebra) on the south road, near the corner ----
  const zebraMat = new THREE.MeshStandardMaterial({ color: 0xd8dde8, roughness: 0.25, metalness: 0.05 });
  for (let i = 0; i < 6; i++) {
    const bar = new THREE.Mesh(boxGeo(1.1, 0.02, 5.6), zebraMat);
    bar.position.set(10.2 + i * 1.9, 0.115, 18.5);
    g.add(bar);
  }
  // Center dash line on east road.
  const dashMat = flat(0x8d93a8);
  for (let i = 0; i < 8; i++) {
    const dash = new THREE.Mesh(boxGeo(0.24, 0.02, 1.6), dashMat);
    dash.position.set(18.5, 0.115, -12 + i * 3.4);
    g.add(dash);
  }

  // ---- Parking pocket (2 bays) east of the store, on the sidewalk ----
  const parkLine = flat(0xd8dde8);
  const park = new THREE.Group();
  for (let i = 0; i <= 2; i++) {
    const line = new THREE.Mesh(boxGeo(0.14, 0.02, 4.4), parkLine);
    line.position.set(i * 2.6, 0, 0);
    park.add(line);
  }
  const stop = new THREE.Mesh(boxGeo(5.2, 0.02, 0.14), parkLine);
  stop.position.set(2.6, 0, -2.2); park.add(stop);
  park.position.set(-1.5, 0.36, 5.6);
  park.rotation.y = Math.PI / 2;
  g.add(park);
  // Wheel stops
  const stopMat = toon(0x9aa2b8, { steps: 3 });
  for (let i = 0; i < 2; i++) {
    const ws = box(0.24, 0.22, 1.1, stopMat, { thickness: 0.06 });
    at(ws, 5.35, 0.47, 2.2 + i * 2.6);
    g.add(ws);
  }

  // ---- Drainage gutter + grates along the south sidewalk edge ----
  const gutter = box(30, 0.08, 0.5, flat(0x161b2a));
  at(gutter, -7, 0.36, 7.6);
  g.add(gutter);
  const grateMat = toon(0x4a5268, { steps: 3 });
  for (let i = 0; i < 6; i++) {
    const grate = box(1.2, 0.05, 0.44, grateMat);
    at(grate, -19 + i * 5, 0.4, 7.6);
    g.add(grate);
  }

  // ---- Puddles: irregular flattened discs of dark glassy water ----
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x0e1526, roughness: 0.12, metalness: 0.0,
    transparent: true, opacity: 0.88,
  });
  const puddles = [];
  const puddleSpecs = [
    [-14.5, 0.355, 3.2, 2.6, 1.7], [-4.5, 0.355, -0.5, 1.8, 1.2],
    [3.4, 0.115, 17.4, 2.2, 1.3], [17.6, 0.115, 6.4, 1.7, 2.4],
    [-19.4, 0.115, 19.6, 1.9, 1.1], [10.8, 0.355, 4.4, 1.5, 1.0],
  ];
  for (const [x, y, z, rx, rz] of puddleSpecs) {
    const p = new THREE.Mesh(new THREE.CircleGeometry(1, 24), puddleMat);
    p.rotation.x = -Math.PI / 2;
    p.scale.set(rx, rz, 1);
    p.position.set(x, y, z);
    p.renderOrder = 1;
    g.add(p);
    puddles.push(p);
  }

  // ---- Corner guardrail (yellow-black) along the sidewalk corner ----
  const rail = new THREE.Group();
  const postMat = toon(0xd9b13b, { steps: 3 });
  const railMat = toon(0xe8c33f, { steps: 3 });
  for (let i = 0; i < 5; i++) {
    const post = cyl(0.09, 0.09, 1.0, postMat, 8, { thickness: 0.1 });
    at(post, i * 2.4, 0.86, 0);
    rail.add(post);
  }
  const barTop = box(9.8, 0.16, 0.16, railMat, { thickness: 0.1 });
  at(barTop, 4.8, 1.32, 0);
  const barMid = box(9.8, 0.12, 0.12, railMat, { thickness: 0.1 });
  at(barMid, 4.8, 0.86, 0);
  rail.add(barTop, barMid);
  // black stripes on top bar
  for (let i = 0; i < 4; i++) {
    const s = new THREE.Mesh(boxGeo(0.5, 0.18, 0.18), flat(0x1c1c24));
    s.position.set(1.2 + i * 2.4, 1.32, 0);
    s.rotation.z = 0.5;
    rail.add(s);
  }
  rail.position.set(-3.4, 0, 7.55);
  g.add(rail);

  // ---- Street name sign (路牌) at the corner ----
  const signPole = cyl(0.06, 0.06, 3.0, toon(0x8a92a8, { steps: 3 }), 8, { thickness: 0.12 });
  at(signPole, 7.3, 1.85, 7.3);
  const signPlate = box(1.7, 0.5, 0.06, toon(0x2e6f4f, { steps: 3 }), { thickness: 0.08 });
  at(signPlate, 7.3, 3.1, 7.3);
  const signText = new THREE.Mesh(planeGeo(1.55, 0.38), flat(0xffffff));
  signText.position.set(7.3, 3.1, 7.34);
  signText.material = new THREE.MeshBasicMaterial({
    map: makeTextTexture('月ノ岬一丁目', '#ffffff', '#2e6f4f'), transparent: true,
  });
  g.add(signPole, signPlate, signText);

  scene.add(g);
  return { group: g, puddles };
}

function makeTextTexture(text, fg, bg) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, 512, 128);
  ctx.fillStyle = fg; ctx.font = '700 64px "Hiragino Sans","Yu Gothic","Meiryo",sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 68);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
