import * as THREE from 'three';
import { P } from '../palette.js';
import { make, slab, BOX, CYL, PLANE, CIRCLE, toon, flat, textured, glowTexture, smearTexture } from '../kit.js';
import { ROAD_A, ROAD_B, WALK } from './base.js';
import { STORE } from './store.js';

// The corner itself: markings, the alley, the neighbour block, guardrails,
// standing water and the distant signal.
export function buildStreet(scene) {
  const group = new THREE.Group();
  group.name = 'street';

  const paintMat = flat(P.paint, { opacity: 0.86 });

  // ---- lane markings ------------------------------------------------------
  for (let x = -10.6; x < 10.8; x += 2.6) {
    group.add(slab(x, x + 1.5, 0.04, 0.055, 6.42, 6.58, paintMat, { outline: false }));
  }
  for (let z = -10.4; z < 2.6; z += 2.6) {
    group.add(slab(8.42, 8.58, 0.04, 0.055, z, z + 1.5, paintMat, { outline: false }));
  }

  // ---- crosswalks ---------------------------------------------------------
  // Reflective paint reads as brighter than the surrounding asphalt, which is
  // what sells "wet" at night.
  const crossMat = flat(0xf4f8ff, { opacity: 0.95 });
  for (let i = 0; i < 5; i += 1) {
    const z = 3.3 + i * 0.34;
    group.add(slab(6.15, 10.85, 0.042, 0.06, z, z + 0.2, crossMat, { outline: false }));
  }
  for (let i = 0; i < 5; i += 1) {
    const x = 6.2 + i * 0.34;
    group.add(slab(x, x + 0.2, 0.042, 0.06, -1.4, 0.5, crossMat, { outline: false }));
  }

  // ---- parking bay --------------------------------------------------------
  const px0 = -7.7;
  const px1 = -3.7;
  const pz0 = 3.25;
  const pz1 = 7.45;
  group.add(slab(px0, px0 + 0.12, 0.04, 0.058, pz0, pz1, paintMat, { outline: false }));
  group.add(slab(px1 - 0.12, px1, 0.04, 0.058, pz0, pz1, paintMat, { outline: false }));
  group.add(slab(px0, px1, 0.04, 0.058, pz1 - 0.12, pz1, paintMat, { outline: false }));
  group.add(slab(px0 + 1.2, px0 + 2.6, 0.04, 0.052, pz0 + 0.4, pz1 - 0.5, flat(0x2c3446, { opacity: 0.5 }), { outline: false }));

  // ---- guardrails ---------------------------------------------------------
  const guardMat = toon(P.guard);
  const postMat = toon(P.guardPost);
  function guardRun(axis, fixed, from, to) {
    const g = new THREE.Group();
    if (axis === 'x') {
      g.add(slab(from, to, 0.62, 0.78, fixed - 0.05, fixed + 0.05, guardMat));
      g.add(slab(from, to, 0.44, 0.56, fixed - 0.04, fixed + 0.04, guardMat, { outline: false }));
      for (let v = from; v <= to + 0.01; v += 1.7) {
        g.add(slab(v - 0.05, v + 0.05, 0.1, 0.66, fixed - 0.06, fixed + 0.06, postMat));
      }
    } else {
      g.add(slab(fixed - 0.05, fixed + 0.05, 0.62, 0.78, from, to, guardMat));
      g.add(slab(fixed - 0.04, fixed + 0.04, 0.44, 0.56, from, to, guardMat, { outline: false }));
      for (let v = from; v <= to + 0.01; v += 1.7) {
        g.add(slab(fixed - 0.06, fixed + 0.06, 0.1, 0.66, v - 0.05, v + 0.05, postMat));
      }
    }
    group.add(g);
  }
  guardRun('x', WALK.z1 - 0.3, -10.6, -1.2);
  guardRun('z', WALK.x1 - 0.3, -8.0, 0.8);

  // ---- alley --------------------------------------------------------------
  const ax0 = STORE.x1 + 0.12;
  const ax1 = 4.6;
  const az0 = -8.5;
  const az1 = STORE.z1;
  const alleyMat = toon(0x4a5265);
  group.add(slab(ax0, ax1, 0.1, 0.13, az0, az1, alleyMat, { receive: true, outline: false }));
  group.add(slab(ax0 - 0.06, ax0, 0.1, 0.9, az0, az1, toon(0x5c6478), { outline: false }));
  group.add(slab(ax1, ax1 + 0.06, 0.1, 0.9, az0, az1, toon(0x5c6478), { outline: false }));
  group.add(slab(ax0 - 0.06, ax1 + 0.06, 0, 0.1, az0 - 0.06, az0, toon(0x3b4356), { outline: false }));
  // Back-of-alley clutter.
  group.add(make(CYL(0.28, 0.28, 0.7, 12), toon(P.crate), { pos: [ax0 + 0.45, 0.48, az0 + 0.6] }));
  group.add(make(CYL(0.28, 0.28, 0.7, 12), toon(P.crate), { pos: [ax0 + 0.45, 1.16, az0 + 0.6] }));
  group.add(slab(ax0 + 0.9, ax1 - 0.4, 0.13, 0.62, az0 + 0.2, az0 + 0.8, toon(0x6a5a44), { cast: true }));
  group.add(slab(ax0 - 0.02, ax0 + 0.06, 0.9, 3.0, az0 + 1.6, az0 + 1.72, toon(0x8b939f), { outline: false }));
  // Alley light spilling from the store's service door.
  const alleyGlow = make(PLANE(2.4, 3.4), textured(glowTexture(0xffcf90), { blending: THREE.AdditiveBlending, opacity: 0.5 }), {
    pos: [(ax0 + ax1) / 2, 0.14, -5.0],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  });
  group.add(alleyGlow);

  // ---- neighbour block forming the alley's far wall ------------------------
  const nx0 = ax1;
  const nx1 = ROAD_B.x0;
  const nz0 = -8.2;
  const nz1 = -1.6;
  group.add(slab(nx0, nx1, 0, 4.4, nz0, nz1, toon(P.neighbour), { cast: true, receive: true }));
  group.add(slab(nx0 - 0.08, nx1 + 0.1, 4.4, 4.62, nz0 - 0.1, nz1 + 0.1, toon(P.neighbourDark), { cast: true }));
  // Windows facing the alley and the street.
  for (let i = 0; i < 3; i += 1) {
    const wz = nz0 + 1.0 + i * 2.0;
    group.add(slab(nx0 - 0.06, nx0 - 0.02, 1.5, 2.5, wz, wz + 0.9, toon(0x2c3446), { outline: false }));
    group.add(slab(nx0 - 0.1, nx0 - 0.04, 1.44, 1.52, wz - 0.08, wz + 0.98, toon(0x8b939f), { outline: false }));
  }
  for (let i = 0; i < 2; i += 1) {
    const wz = nz0 + 1.4 + i * 2.6;
    group.add(slab(nx1 + 0.02, nx1 + 0.06, 2.0, 3.0, wz, wz + 1.1, toon(0x1f2739), { outline: false }));
  }
  // Small balcony with plants.
  group.add(slab(nx0 - 0.7, nx0, 2.6, 2.72, -6.4, -4.8, toon(0x6f7787)));
  group.add(slab(nx0 - 0.72, nx0 - 0.66, 2.72, 3.2, -6.4, -4.8, toon(0x7b8393), { outline: false }));
  for (let i = 0; i < 3; i += 1) {
    group.add(make(CYL(0.13, 0.1, 0.24, 8), toon(P.crate), { pos: [nx0 - 0.35, 2.84, -6.1 + i * 0.6] }));
    group.add(make(new THREE.IcosahedronGeometry(0.2, 0), toon(P.shrubLight), { pos: [nx0 - 0.35, 3.02, -6.1 + i * 0.6], scale: [1, 0.7, 1], outline: false }));
  }
  // Drainpipe and an exterior condenser.
  group.add(make(CYL(0.09, 0.09, 4.3, 8), toon(0x8b939f), { pos: [nx1 + 0.1, 2.15, -2.2] }));
  group.add(slab(nx1 + 0.02, nx1 + 0.42, 1.2, 1.9, -7.0, -6.1, toon(P.ac), { cast: true }));
  group.add(slab(nx1 + 0.42, nx1 + 0.46, 1.26, 1.84, -6.94, -6.16, toon(0x8f97a4), { outline: false }));

  // ---- standing water -----------------------------------------------------
  const puddles = [];
  const puddleMat = toon(0x1b2438, { emissive: 0x0d1526, emissiveIntensity: 0.6 });
  const puddleDefs = [
    [-5.2, 5.2, 1.9, 1.25], [-1.0, 4.1, 1.5, 1.0], [2.6, 5.6, 1.7, 1.1],
    [7.4, 5.0, 1.6, 1.15], [8.6, -3.6, 1.4, 1.0], [9.2, 7.6, 1.5, 1.0],
    [-8.0, 1.5, 1.1, 0.7], [0.4, 1.2, 0.95, 0.6], [3.4, 0.4, 1.0, 0.65],
    [3.0, -4.6, 0.85, 0.55], [-6.6, -0.6, 0.8, 0.5],
  ];
  for (const [x, z, rx, rz] of puddleDefs) {
    const m = make(CIRCLE(1, 26), puddleMat, {
      pos: [x, 0.052, z],
      rot: [-Math.PI / 2, 0, 0],
      scale: [rx, rz, 1],
      outline: false,
    });
    group.add(m);
    puddles.push({ x, z, rx, rz });
  }

  // ---- wet-road reflections -----------------------------------------------
  // Stylised vertical smears rather than a real reflector: cheaper, and it
  // matches the anime convention of light bleeding down a wet surface.
  const smear = (color, x, z, w, d, opacity) => make(PLANE(w, d), textured(smearTexture(color), {
    blending: THREE.AdditiveBlending,
    opacity,
  }), { pos: [x, 0.055, z], rot: [-Math.PI / 2, 0, 0], outline: false });

  group.add(smear(P.signGlow, -2, 3.9, 7.0, 3.2, 0.4));      // shop fascia
  group.add(smear(P.lampWarm, 3.5, 4.4, 1.8, 5.4, 0.5));     // streetlight
  group.add(smear(P.vendingGlowColor, -6.5, 3.6, 1.6, 3.0, 0.32));
  group.add(smear(P.warm, 0.3, 2.2, 2.0, 2.2, 0.3));         // doorway spill
  group.add(smear(P.trafficGreen, 8.6, 7.2, 1.0, 2.6, 0.28));
  group.add(smear(P.warm, 3.0, -2.0, 0.9, 2.4, 0.22));       // alley mouth

  // ---- traffic signal at the far corner ------------------------------------
  const sig = new THREE.Group();
  const sigX = 10.3;
  const sigZ = 9.2;
  sig.add(make(CYL(0.09, 0.11, 4.1, 8), toon(0x4a5265), { pos: [sigX, 2.05, sigZ], cast: true }));
  sig.add(make(BOX(1.9, 0.12, 0.12), toon(0x4a5265), { pos: [sigX - 0.95, 3.95, sigZ] }));
  const head = new THREE.Group();
  head.position.set(sigX - 1.8, 3.6, sigZ);
  head.add(slab(-0.24, 0.24, -0.72, 0.72, -0.2, 0.2, toon(0x2b3140), { cast: true }));
  const lampMats = {};
  const lampOrder = [['red', P.trafficRed, 0.5], ['amber', P.trafficAmber, -0.02], ['green', P.trafficGreen, -0.54]];
  for (const [name, color, y] of lampOrder) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x1b2130 });
    lampMats[name] = mat;
    // Lamps on both faces: the head is seen from any orbit angle, and a real
    // signal shows to both approaches.
    for (const face of [-1, 1]) {
      head.add(make(BOX(0.34, 0.34, 0.05), mat, { pos: [0, y, face * 0.215], outline: false }));
    }
  }
  const signalLight = new THREE.PointLight(P.trafficGreen, 3.2, 6, 1.8);
  signalLight.position.set(sigX - 1.8, 3.6, sigZ - 0.5);
  head.add(signalLight);
  sig.add(head);
  group.add(sig);

  scene.add(group);

  return { group, puddles, signal: { lampMats, order: lampOrder.map((l) => l[0]), light: signalLight } };
}
