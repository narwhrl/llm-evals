// The konbini building shell: walls, glass storefront, automatic doors,
// awning, sign band, roof, AC units, rear alley walls. Interior is interior.js.
import * as THREE from 'three';
import { toon, flat, glow, box, cyl, planeGeo, outlined, boxGeo, cylGeo, at } from './toon.js';
import { storeSignTexture, openSignTexture, awningTexture } from './textures.js';

// Store footprint: x in [-9.5, 0.5], z in [-8, 2]. Front face z = 2.
export const STORE = { x0: -9.5, x1: 0.5, z0: -8, z1: 2, wallH: 4.2 };

export function buildStore(scene) {
  const s = STORE;
  const g = new THREE.Group();
  const W = s.x1 - s.x0;   // 10
  const D = s.z1 - s.z0;   // 10
  const cx = (s.x0 + s.x1) / 2; // -4.5
  const cz = (s.z0 + s.z1) / 2; // -3

  const wallMat = toon(0xd8cfba, { steps: 4 });       // warm off-white walls
  const wallInMat = toon(0xf0e7cf, { steps: 4 });
  const trimMat = toon(0x37404f, { steps: 3 });

  // ---- Floor & ceiling ----
  const floor = box(W, 0.24, D, toon(0x9aa0ae, { steps: 4 }));
  at(floor, cx, 0.36 + 0.12, cz);
  g.add(floor);
  // interior floor tile layer
  const tile = new THREE.Mesh(planeGeo(W - 0.3, D - 0.3), toon(0xd9d2c0, { steps: 4 }));
  tile.rotation.x = -Math.PI / 2;
  tile.position.set(cx, 0.605, cz);
  g.add(tile);
  const ceiling = box(W, 0.2, D, flat(0xf8f4e6));
  at(ceiling, cx, s.wallH + 0.5, cz);
  g.add(ceiling);

  // ---- Back & side walls ----
  const back = box(W, s.wallH, 0.3, wallMat, { thickness: 0.012 });
  at(back, cx, 0.6 + s.wallH / 2, s.z0 + 0.15);
  const left = box(0.3, s.wallH, D, wallMat, { thickness: 0.012 });
  at(left, s.x0 + 0.15, 0.6 + s.wallH / 2, cz);
  const right = box(0.3, s.wallH, D, wallMat, { thickness: 0.012 });
  at(right, s.x1 - 0.15, 0.6 + s.wallH / 2, cz);
  g.add(back, left, right);

  // Interior wall lining (so inside faces read warm, not outlined dark)
  const backIn = box(W - 0.2, s.wallH - 0.2, 0.06, wallInMat);
  at(backIn, cx, 0.6 + s.wallH / 2, s.z0 + 0.34);
  const leftIn = box(0.06, s.wallH - 0.2, D - 0.2, wallInMat);
  at(leftIn, s.x0 + 0.34, 0.6 + s.wallH / 2, cz);
  const rightIn = box(0.06, s.wallH - 0.2, D - 0.2, wallInMat);
  at(rightIn, s.x1 - 0.34, 0.6 + s.wallH / 2, cz);
  g.add(backIn, leftIn, rightIn);

  // ---- Front face: header band + glass + doors ----
  // Header band above glass (sign fascia)
  const fascia = box(W, 1.0, 0.34, trimMat, { thickness: 0.012 });
  at(fascia, cx, 0.6 + s.wallH - 0.5, s.z1 + 0.02);
  g.add(fascia);

  // Main sign
  const sign = new THREE.Mesh(boxGeo(W - 0.6, 0.86, 0.12),
    new THREE.MeshBasicMaterial({ map: storeSignTexture() }));
  sign.position.set(cx, 0.6 + s.wallH - 0.48, s.z1 + 0.2);
  g.add(sign);
  // soft sign glow card
  const signGlow = new THREE.Mesh(planeGeo(W + 1.2, 1.6), glow(0x59d8e8, 0.16));
  signGlow.position.set(cx, 0.6 + s.wallH - 0.5, s.z1 + 0.3);
  g.add(signGlow);

  // Glass walls either side of the door opening.
  // Front spans x0..x1 at z1. Door opening: x in [-5.9, -3.1] (2.8 wide).
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfe8f2, transparent: true, opacity: 0.18,
    roughness: 0.05, metalness: 0, transmission: 0,
    depthWrite: false, side: THREE.DoubleSide,
  });
  const glassH = s.wallH - 1.0 - 0.3; // under fascia, above kick plate
  const glassY = 0.6 + 0.3 + glassH / 2;
  const segs = [
    [s.x0 + 0.15, -5.9],  // left window
    [-3.1, s.x1 - 0.15],  // right window
  ];
  for (const [gx0, gx1] of segs) {
    const gw = gx1 - gx0;
    const pane = new THREE.Mesh(planeGeo(gw, glassH), glassMat);
    pane.position.set((gx0 + gx1) / 2, glassY, s.z1);
    g.add(pane);
    // kick plate + top rail
    const kick = box(gw, 0.3, 0.12, trimMat);
    at(kick, (gx0 + gx1) / 2, 0.6 + 0.15, s.z1);
    const rail = box(gw, 0.12, 0.12, trimMat);
    at(rail, (gx0 + gx1) / 2, 0.6 + 0.3 + glassH + 0.06, s.z1);
    g.add(kick, rail);
    // thin vertical mullions
    const nM = Math.max(1, Math.round(gw / 2.2));
    for (let i = 1; i < nM; i++) {
      const mx = gx0 + (gw / nM) * i;
      const mull = box(0.08, glassH, 0.1, trimMat);
      at(mull, mx, glassY, s.z1);
      g.add(mull);
    }
  }

  // ---- Automatic sliding doors ----
  const doorFrameMat = toon(0x2c3444, { steps: 3 });
  // frame around opening
  const dfTop = box(3.0, 0.24, 0.2, doorFrameMat, { thickness: 0.04 });
  at(dfTop, -4.5, 0.6 + 2.62, s.z1);
  const dfL = box(0.16, 2.62, 0.2, doorFrameMat, { thickness: 0.04 });
  at(dfL, -5.98, 0.6 + 1.31, s.z1);
  const dfR = box(0.16, 2.62, 0.2, doorFrameMat, { thickness: 0.04 });
  at(dfR, -3.02, 0.6 + 1.31, s.z1);
  g.add(dfTop, dfL, dfR);

  const doorGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0xd8f0f8, transparent: true, opacity: 0.28,
    roughness: 0.06, depthWrite: false, side: THREE.DoubleSide,
  });
  function makeDoor(sideSign) {
    const dg = new THREE.Group();
    const pane = new THREE.Mesh(planeGeo(1.36, 2.34), doorGlassMat);
    pane.position.y = 1.17 + 0.14;
    const frame = box(1.42, 0.1, 0.08, doorFrameMat);
    frame.position.y = 0.19;
    const frameT = box(1.42, 0.1, 0.08, doorFrameMat);
    frameT.position.y = 2.56;
    const edge = box(0.08, 2.4, 0.08, doorFrameMat);
    edge.position.set(-sideSign * 0.68, 1.38, 0);
    dg.add(pane, frame, frameT, edge);
    dg.position.set(-4.5 + sideSign * 0.7, 0.6, s.z1 + (sideSign > 0 ? 0.05 : -0.05));
    return dg;
  }
  const doorL = makeDoor(-1);
  const doorR = makeDoor(1);
  g.add(doorL, doorR);

  // Sensor box above door
  const sensor = box(0.5, 0.16, 0.14, flat(0x222831));
  at(sensor, -4.5, 0.6 + 2.86, s.z1 + 0.06);
  g.add(sensor);

  // ---- Entrance mat ----
  const mat = new THREE.Mesh(boxGeo(3.2, 0.05, 1.4), toon(0x3f5f8f, { steps: 3 }));
  at(mat, -4.5, 0.62, s.z1 + 0.95);
  g.add(mat);
  const matIn = new THREE.Mesh(boxGeo(3.0, 0.03, 1.1), toon(0x7a4a3a, { steps: 3 }));
  at(matIn, -4.5, 0.625, s.z1 - 0.85);
  g.add(matIn);

  // ---- Awning (雨棚) with stripes + drip edge ----
  const awnTex = awningTexture();
  awnTex.repeat.set(3, 1);
  const awn = new THREE.Mesh(boxGeo(W - 0.2, 0.1, 1.7),
    new THREE.MeshToonMaterial({ map: awnTex, gradientMap: null }));
  awn.position.set(cx, 0.6 + s.wallH - 1.12, s.z1 + 0.9);
  awn.rotation.x = 0.1;
  g.add(awn);
  // awning edge lip (drips spawn here)
  const lip = box(W - 0.2, 0.09, 0.09, flat(0x2e6f60));
  at(lip, cx, 0.6 + s.wallH - 1.28, s.z1 + 1.72);
  g.add(lip);

  // ---- Roof slab + parapet + AC outdoor units on roof ----
  // Roof slab + parapet + AC outdoor units on roof.
  // A warm translucent skylight sits over the store so the lit interior reads
  // from the raised default camera (the interior ceiling hides everything else).
  const roof = box(W + 0.6, 0.3, D + 0.6, toon(0x4a5064, { steps: 3 }), { thickness: 0.012 });
  at(roof, cx, 0.6 + s.wallH + 0.25, cz);
  g.add(roof);
  const skylight = new THREE.Mesh(boxGeo(W - 1.6, 0.06, D - 1.8),
    new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
  skylight.position.set(cx - 0.4, 0.6 + s.wallH + 0.43, cz + 0.2);
  g.add(skylight);
  // skylight frame strips
  const skyFrame = toon(0x37404f, { steps: 3 });
  for (let i = 0; i < 4; i++) {
    const fx = box(0.14, 0.1, D - 1.8, skyFrame);
    at(fx, cx - 0.4 - (W - 1.6) / 2 + ((W - 1.6) / 3) * i, 0.6 + s.wallH + 0.46, cz + 0.2);
    g.add(fx);
  }
  const parapetMat = toon(0x59617a, { steps: 3 });
  const p1 = box(W + 0.6, 0.5, 0.18, parapetMat); at(p1, cx, 0.6 + s.wallH + 0.6, s.z1 + 0.21);
  const p2 = box(W + 0.6, 0.5, 0.18, parapetMat); at(p2, cx, 0.6 + s.wallH + 0.6, s.z0 - 0.21);
  const p3 = box(0.18, 0.5, D + 0.6, parapetMat); at(p3, s.x0 - 0.21, 0.6 + s.wallH + 0.6, cz);
  const p4 = box(0.18, 0.5, D + 0.6, parapetMat); at(p4, s.x1 + 0.21, 0.6 + s.wallH + 0.6, cz);
  g.add(p1, p2, p3, p4);

  // Roof AC outdoor unit (plus the wall one in props at back alley)
  const ac = new THREE.Group();
  const acBody = box(1.5, 0.9, 0.6, toon(0xc8ccd4, { steps: 3 }), { thickness: 0.04 });
  acBody.position.y = 0.45;
  const fan = new THREE.Mesh(cylGeo(0.3, 0.3, 0.06, 16), flat(0x555c70));
  fan.rotation.x = Math.PI / 2; fan.position.set(-0.3, 0.45, 0.31);
  const fan2 = fan.clone(); fan2.position.x = 0.35;
  ac.add(acBody, fan, fan2);
  ac.position.set(-7.6, 0.6 + s.wallH + 0.4, -5.4);
  g.add(ac);

  // OPEN neon in the right window
  const openSign = new THREE.Mesh(planeGeo(1.1, 0.55),
    new THREE.MeshBasicMaterial({ map: openSignTexture(), transparent: true }));
  openSign.position.set(-1.4, 0.6 + 2.9, s.z1 - 0.12);
  g.add(openSign);

  // Interior ceiling lightboxes (visible through glass, warm)
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff2d0 });
  for (let i = 0; i < 3; i++) {
    const lb = new THREE.Mesh(boxGeo(1.1, 0.08, 3.4), lightMat);
    lb.position.set(-8 + i * 3.2, 0.6 + s.wallH - 0.28, cz);
    g.add(lb);
  }

  scene.add(g);

  return {
    group: g,
    doorL, doorR,
    signMesh: sign,
    signGlow,
    awningLipY: 0.6 + s.wallH - 1.28,
    awningLipZ: s.z1 + 1.72,
    awningX: [s.x0 + 0.3, s.x1 - 0.3],
    openSign,
    lightMat,
  };
}
