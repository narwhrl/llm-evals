// Street props: vending machine, bicycle, umbrella stand, trash bins,
// streetlight, utility pole + sagging wires, notice board, AC unit in the
// alley, alley walls, distant background buildings.
import * as THREE from 'three';
import { toon, flat, glow, box, cyl, planeGeo, boxGeo, cylGeo, at } from './toon.js';
import { vendingTexture, posterTexture } from './textures.js';

export function buildProps(scene) {
  const g = new THREE.Group();
  const WALK = 0.34; // sidewalk top

  // ---------- vending machine (front-left of store) ----------
  const vend = new THREE.Group();
  const vBody = box(1.1, 1.9, 0.75, toon(0xd84040, { steps: 3 }), { thickness: 0.03 });
  vBody.position.y = 0.95;
  const vFace = new THREE.Mesh(planeGeo(1.02, 1.82),
    new THREE.MeshBasicMaterial({ map: vendingTexture() }));
  vFace.position.set(0, 0.96, 0.383);
  const vGlow = new THREE.Mesh(planeGeo(1.5, 2.3), glow(0xfff0c8, 0.1));
  vGlow.position.set(0, 1.0, 0.45);
  const vLight = new THREE.PointLight(0xfff0c8, 8, 5, 2);
  vLight.position.set(0, 1.2, 0.9);
  vend.add(vBody, vFace, vGlow, vLight);
  vend.position.set(-11.2, WALK, 4.2);
  g.add(vend);
  // recycle bin next to vending machine
  const rec = box(0.6, 0.8, 0.6, toon(0x3a6fc2, { steps: 3 }), { thickness: 0.04 });
  at(rec, -12.3, WALK + 0.4, 4.2);
  const recHole = new THREE.Mesh(planeGeo(0.4, 0.18), flat(0x1a2a4a));
  recHole.position.set(-12.3, WALK + 0.66, 4.51);
  g.add(rec, recHole);

  // ---------- bicycle (parked at bike rack near parking) ----------
  const bike = new THREE.Group();
  const frameMat = toon(0x4a8fc2, { steps: 3 });
  const wheelGeo = new THREE.TorusGeometry(0.34, 0.045, 8, 20);
  const wheelMat = flat(0x22262e);
  const w1 = new THREE.Mesh(wheelGeo, wheelMat);
  const w2 = new THREE.Mesh(wheelGeo, wheelMat);
  w1.position.set(-0.52, 0.36, 0);
  w2.position.set(0.52, 0.36, 0);
  // spokes suggestion: inner disc
  const hubMat = flat(0x9aa2b8);
  for (const w of [w1, w2]) {
    const hub = new THREE.Mesh(cylGeo(0.05, 0.05, 0.08, 8), hubMat);
    hub.rotation.x = Math.PI / 2;
    w.add(hub);
  }
  const bar1 = cyl(0.035, 0.035, 1.0, frameMat, 8);
  bar1.rotation.z = Math.PI / 2 - 0.18;
  bar1.position.set(0, 0.62, 0);
  const bar2 = cyl(0.035, 0.035, 0.62, frameMat, 8);
  bar2.rotation.z = 0.5;
  bar2.position.set(-0.42, 0.55, 0);
  const bar3 = cyl(0.035, 0.035, 0.5, frameMat, 8);
  bar3.position.set(-0.62, 0.62, 0);
  const seat = box(0.24, 0.07, 0.16, flat(0x22262e));
  seat.position.set(-0.62, 0.9, 0);
  const handlebar = cyl(0.03, 0.03, 0.42, frameMat, 8);
  handlebar.rotation.x = Math.PI / 2;
  handlebar.position.set(0.55, 0.95, 0);
  const stem = cyl(0.03, 0.03, 0.5, frameMat, 8);
  stem.rotation.z = 0.35;
  stem.position.set(0.5, 0.75, 0);
  const basketF = box(0.3, 0.22, 0.26, toon(0xc8ccd4, { steps: 3 }), { thickness: 0.05 });
  basketF.position.set(0.62, 0.98, 0);
  bike.add(w1, w2, bar1, bar2, bar3, seat, handlebar, stem, basketF);
  bike.position.set(-12.9, WALK, 1.4);
  bike.rotation.y = Math.PI / 2 + 0.12;
  g.add(bike);

  // ---------- umbrella stand by the door ----------
  const stand = new THREE.Group();
  const sPot = cyl(0.22, 0.18, 0.5, toon(0x8a5a3a, { steps: 3 }), 12, { thickness: 0.06 });
  sPot.position.y = 0.25;
  stand.add(sPot);
  const umbCols = [0xc23a5e, 0x3a6fc2, 0xd9a13b, 0x40b8b0, 0x555c6c];
  for (let i = 0; i < 5; i++) {
    const u = cyl(0.035, 0.05, 0.85, toon(umbCols[i], { steps: 3 }), 8);
    const a = (i / 5) * Math.PI * 2;
    u.position.set(Math.cos(a) * 0.09, 0.75, Math.sin(a) * 0.09);
    u.rotation.set(Math.sin(a) * 0.14, 0, Math.cos(a) * 0.14);
    stand.add(u);
  }
  stand.position.set(-6.6, WALK, 2.75);
  g.add(stand);

  // ---------- trash bins (pair) near corner ----------
  const bin1 = box(0.55, 0.75, 0.55, toon(0x3f8f4f, { steps: 3 }), { thickness: 0.05 });
  at(bin1, 1.8, WALK + 0.375, 5.6);
  const bin2 = box(0.55, 0.75, 0.55, toon(0x8a8f9c, { steps: 3 }), { thickness: 0.05 });
  at(bin2, 2.5, WALK + 0.375, 5.6);
  g.add(bin1, bin2);

  // ---------- streetlight (cool white cone over the corner) ----------
  const lamp = new THREE.Group();
  const lPole = cyl(0.09, 0.12, 5.6, toon(0x4a5268, { steps: 3 }), 10, { thickness: 0.04 });
  lPole.position.y = 2.8;
  const lArm = box(1.6, 0.1, 0.1, toon(0x4a5268, { steps: 3 }));
  lArm.position.set(-0.75, 5.55, 0);
  const lHead = box(0.7, 0.16, 0.3, flat(0xfff4d8));
  lHead.position.set(-1.5, 5.5, 0);
  const lGlowMesh = new THREE.Mesh(planeGeo(2.6, 1.6), glow(0xfff0c0, 0.14));
  lGlowMesh.position.set(-1.5, 5.2, 0);
  const lSpot = new THREE.SpotLight(0xfff0c8, 90, 18, 0.55, 0.5, 1.6);
  lSpot.position.set(-1.5, 5.45, 0);
  lSpot.target.position.set(-1.5, 0, 0);
  lamp.add(lPole, lArm, lHead, lGlowMesh, lSpot, lSpot.target);
  lamp.position.set(8.3, 0, 6.3);
  g.add(lamp);

  // ---------- utility pole + wires ----------
  const pole = new THREE.Group();
  const pPole = cyl(0.14, 0.18, 8.4, toon(0x6a5a48, { steps: 3 }), 10, { thickness: 0.03 });
  pPole.position.y = 4.2;
  const cross1 = box(2.2, 0.12, 0.12, toon(0x5a4c3c, { steps: 3 }));
  cross1.position.y = 7.6;
  const cross2 = box(1.6, 0.12, 0.12, toon(0x5a4c3c, { steps: 3 }));
  cross2.position.y = 7.0;
  const drum = cyl(0.35, 0.35, 0.7, toon(0x8a8f9c, { steps: 3 }), 12, { thickness: 0.05 });
  drum.position.set(0, 6.4, 0.3);
  pole.add(pPole, cross1, cross2, drum);
  pole.position.set(14.5, 0, 12.8);
  g.add(pole);
  // sagging wires: pole -> store roof corner, pole -> off-base edge
  const wireMat = new THREE.LineBasicMaterial({ color: 0x141824 });
  function wire(a, b, sag) {
    const mid = a.clone().lerp(b, 0.5); mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const pts = curve.getPoints(24);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    g.add(new THREE.Line(geo, wireMat));
  }
  wire(new THREE.Vector3(14.5, 7.6, 12.8), new THREE.Vector3(0.6, 5.6, 2.2), 0.9);
  wire(new THREE.Vector3(14.5, 7.6, 12.8), new THREE.Vector3(21.8, 6.8, 1.0), 0.7);
  wire(new THREE.Vector3(14.5, 7.0, 12.8), new THREE.Vector3(-4.5, 5.9, 2.1), 1.3);
  wire(new THREE.Vector3(14.5, 7.6, 12.8), new THREE.Vector3(14.0, 7.2, -14.5), 1.1);

  // ---------- notice / poster board (掲示板) near alley ----------
  const board = new THREE.Group();
  const bdBody = box(1.8, 1.4, 0.12, toon(0x8a6a4a, { steps: 3 }), { thickness: 0.03 });
  bdBody.position.y = 1.5;
  const bdRoof = box(2.0, 0.08, 0.5, toon(0x4a505f, { steps: 3 }), { thickness: 0.05 });
  bdRoof.position.y = 2.3;
  const bdLegL = box(0.1, 0.9, 0.1, toon(0x5a4c3c, { steps: 3 }));
  bdLegL.position.set(-0.7, 0.45, 0);
  const bdLegR = bdLegL.clone(); bdLegR.position.x = 0.7;
  const bdFace = new THREE.Mesh(planeGeo(1.6, 1.1),
    new THREE.MeshBasicMaterial({ map: posterTexture('festival') }));
  bdFace.position.set(0, 1.5, 0.07);
  board.add(bdBody, bdRoof, bdLegL, bdLegR, bdFace);
  board.position.set(-13.8, WALK, -1.6);
  board.rotation.y = Math.PI / 2 - 0.2;
  g.add(board);

  // ---------- alley: two flanking buildings + wall AC + crates ----------
  const alleyMat1 = toon(0x3a4054, { steps: 3 });
  const alleyL = box(3.2, 6.0, 12, alleyMat1, { thickness: 0.008 });
  at(alleyL, -12.0, 3.0, -8);
  const alleyMat2 = toon(0x46425a, { steps: 3 });
  const alleyR = box(2.6, 6.2, 9, alleyMat2, { thickness: 0.008 });
  at(alleyR, 2.8, 3.1, -9.5);
  g.add(alleyL, alleyR);
  // small lit windows on alley buildings
  const winWarm = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
  const winCool = new THREE.MeshBasicMaterial({ color: 0x9fc8e8 });
  const winSpecs = [
    [-10.35, 2.6, -5.0, winWarm], [-10.35, 4.4, -7.5, winCool], [-10.35, 5.4, -4.0, winCool],
    [1.5, 2.2, -7.0, winWarm], [1.5, 4.0, -10.0, winCool], [-10.35, 3.6, -11.0, winWarm],
  ];
  for (const [x, y, z, m] of winSpecs) {
    const wMesh = new THREE.Mesh(planeGeo(0.5, 0.65), m);
    wMesh.position.set(x, y, z);
    wMesh.rotation.y = x < -5 ? Math.PI / 2 : -Math.PI / 2;
    g.add(wMesh);
  }
  // wall-mounted AC unit in the alley
  const acWall = box(0.8, 0.55, 0.35, toon(0xb8bcc8, { steps: 3 }), { thickness: 0.05 });
  at(acWall, -9.9, 2.0, -3.4);
  const acFan = new THREE.Mesh(cylGeo(0.16, 0.16, 0.05, 12), flat(0x555c70));
  acFan.rotation.z = Math.PI / 2;
  acFan.rotation.y = Math.PI / 2;
  acFan.position.set(-9.7, 2.0, -3.4);
  g.add(acWall, acFan);
  // alley crates + bottles
  const crate = box(0.6, 0.4, 0.6, toon(0xc2a03a, { steps: 3 }), { thickness: 0.05 });
  at(crate, 1.4, WALK + 0.2, -5.6);
  const crate2 = box(0.6, 0.4, 0.6, toon(0x8a4a3a, { steps: 3 }), { thickness: 0.05 });
  at(crate2, 1.4, WALK + 0.6, -5.7, 0.3);
  g.add(crate, crate2);
  // pipes on alley wall
  const pipe = cyl(0.06, 0.06, 5.4, toon(0x7a8494, { steps: 3 }), 8);
  at(pipe, -9.95, 2.7, -9.5);
  g.add(pipe);

  // ---------- distant background silhouette buildings (on base edges) ----------
  const bgMat = toon(0x1e2538, { steps: 2 });
  const bgSpecs = [
    [-16, 5.5, -16, 8, 11, 6], [-4, 3.5, -18, 7, 7, 5], [8, 6.5, -17, 6, 13, 5],
    [-19, 3.5, -4, 5, 7, 8], [20, 4.5, -8, 4, 9, 7],
  ];
  for (const [x, y, z, w, h, d] of bgSpecs) {
    const b = box(w, h, d, bgMat, { thickness: 0.006, color: 0x0a0c14 });
    b.position.set(x, y, z);
    g.add(b);
    // sparse lit windows
    for (let i = 0; i < Math.floor(w * h / 12); i++) {
      const ww = new THREE.Mesh(planeGeo(0.4, 0.5),
        Math.random() > 0.5 ? winWarm : winCool);
      ww.position.set(
        x + (Math.random() - 0.5) * (w - 1),
        1 + Math.random() * (h - 2),
        z + (d / 2 + 0.01) * (z < -10 || x > 15 ? 1 : 0) + (z < -10 || x > 15 ? 0 : (Math.abs(x) > 14 ? 0 : d / 2 + 0.01)),
      );
      if (Math.abs(x) > 14 && Math.abs(z) < 12) { ww.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2; ww.position.z = z + (Math.random() - 0.5) * (d - 1); ww.position.x = x - Math.sign(x) * (w / 2 + 0.01); }
      g.add(ww);
    }
  }

  scene.add(g);
  return { group: g, lamp };
}
