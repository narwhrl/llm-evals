import * as THREE from 'three';
import { P } from '../palette.js';
import {
  make, slab, BOX, CYL, PLANE, toon, flat, textured,
  signTexture, bladeTexture, posterTexture, runoffTexture, glowTexture, canvasTexture,
} from '../kit.js';

// The convenience store. Front wall faces +Z (the east–west road), the east
// wall faces the alley. The front is mostly glass so the interior reads.
export const STORE = {
  x0: -5.5, x1: 1.5,
  z0: -8.5, z1: -1.5,
  wallTop: 3.4,
  floorTop: 0.16,
  glassBottom: 0.5,
  glassTop: 2.62,
  doorX0: -0.6,
  doorX1: 1.2,
  fasciaY0: 3.66,
  fasciaY1: 4.5,
};

export function buildStore(scene) {
  const group = new THREE.Group();
  group.name = 'store';

  const { x0, x1, z0, z1, wallTop } = STORE;
  const glassMat = flat(0xbcd8f2, { transparent: true, opacity: 0.14, side: THREE.DoubleSide, depthWrite: false });
  const runoffMap = runoffTexture();
  const frameMat = toon(P.frame);

  // ---- shell -------------------------------------------------------------
  group.add(slab(x0, x1, 0, wallTop, z0, z0 + 0.24, toon(P.wallBack), { cast: true, receive: true })); // back
  group.add(slab(x0, x0 + 0.24, 0, wallTop, z0, z1, toon(P.wallSide), { cast: true, receive: true })); // west
  group.add(slab(x1 - 0.24, x1, 0, wallTop, z0, z1, toon(P.wallAlley), { cast: true, receive: true })); // east (alley)

  // Front: kick panel, glazing, door opening, header.
  group.add(slab(x0, x1, 0, STORE.glassBottom, z1 - 0.22, z1, toon(P.kick), { receive: true }));
  group.add(slab(x1 - 0.3, x1, 0, wallTop, z1 - 0.22, z1, toon(P.wall), { cast: true }));
  group.add(slab(x0, x1, STORE.glassTop, wallTop, z1 - 0.22, z1, toon(P.wall), { cast: true }));

  // Glazing in three bays, split by slim mullions.
  const bays = [x0, -3.4, -1.9, STORE.doorX0];
  for (let i = 0; i < bays.length - 1; i += 1) {
    const bx0 = bays[i];
    const bx1 = bays[i + 1];
    group.add(slab(bx0 + 0.04, bx1 - 0.04, STORE.glassBottom + 0.04, STORE.glassTop - 0.04, z1 - 0.1, z1 - 0.07, glassMat, { outline: false }));
    if (i > 0) group.add(slab(bx0 - 0.05, bx0 + 0.05, STORE.glassBottom, STORE.glassTop, z1 - 0.16, z1 - 0.02, frameMat));
  }
  group.add(slab(x0, x1, STORE.glassBottom, STORE.glassBottom + 0.09, z1 - 0.16, z1 - 0.02, frameMat));
  group.add(slab(x0, x1, STORE.glassTop - 0.09, STORE.glassTop, z1 - 0.16, z1 - 0.02, frameMat));

  // Runoff film: a second sheet that scrolls downward to sell the wet glass.
  const runoffMat = textured(runoffMap, { transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
  const runoffSheets = [];
  for (let i = 0; i < bays.length - 1; i += 1) {
    const w = bays[i + 1] - bays[i] - 0.12;
    const sheet = make(PLANE(w, STORE.glassTop - STORE.glassBottom - 0.14), runoffMat, {
      pos: [(bays[i] + bays[i + 1]) / 2, (STORE.glassBottom + STORE.glassTop) / 2, z1 - 0.05],
      outline: false,
    });
    group.add(sheet);
    runoffSheets.push(sheet);
  }

  // ---- automatic door ----------------------------------------------------
  const doorGroup = new THREE.Group();
  const panelW = (STORE.doorX1 - STORE.doorX0) / 2 + 0.04;
  const doorH = STORE.glassTop - STORE.floorTop;
  const doorY = (STORE.glassTop + STORE.floorTop) / 2;
  const leaves = [];
  for (const side of [-1, 1]) {
    const leaf = new THREE.Group();
    const cx = (STORE.doorX0 + STORE.doorX1) / 2 + side * panelW * 0.5;
    leaf.position.set(cx, doorY, z1 - 0.1);
    leaf.add(slab(-panelW / 2, panelW / 2, -doorH / 2, doorH / 2, -0.015, 0.015, glassMat, { outline: false }));
    leaf.add(slab(-panelW / 2, panelW / 2, -doorH / 2, -doorH / 2 + 0.07, -0.04, 0.04, frameMat));
    leaf.add(slab(-panelW / 2, panelW / 2, doorH / 2 - 0.07, doorH / 2, -0.04, 0.04, frameMat));
    leaf.add(slab(-panelW / 2, -panelW / 2 + 0.07, -doorH / 2, doorH / 2, -0.04, 0.04, frameMat));
    leaf.add(slab(panelW / 2 - 0.07, panelW / 2, -doorH / 2, doorH / 2, -0.04, 0.04, frameMat));
    // Warm safety stripe across the glass.
    leaf.add(slab(-panelW / 2, panelW / 2, -0.34, -0.24, 0.0, 0.035, flat(P.paintWarm, { opacity: 0.75 })));
    doorGroup.add(leaf);
    leaves.push({ node: leaf, side, home: cx });
  }
  group.add(doorGroup);
  group.add(slab(STORE.doorX0 - 0.09, STORE.doorX0, STORE.floorTop, STORE.glassTop, z1 - 0.18, z1 - 0.02, frameMat));
  group.add(slab(STORE.doorX1, STORE.doorX1 + 0.09, STORE.floorTop, STORE.glassTop, z1 - 0.18, z1 - 0.02, frameMat));
  group.add(slab(STORE.doorX0, STORE.doorX1, STORE.glassTop, STORE.glassTop + 0.1, z1 - 0.18, z1 - 0.02, frameMat));
  // Door header sensor.
  group.add(slab(STORE.doorX0 + 0.1, STORE.doorX1 - 0.1, STORE.glassTop + 0.1, STORE.glassTop + 0.2, z1 - 0.24, z1 - 0.16, toon(0x2a3140)));

  // Threshold and entrance mat.
  group.add(slab(STORE.doorX0 - 0.1, STORE.doorX1 + 0.1, 0, 0.06, z1 - 0.2, z1 + 0.1, toon(0x9aa3b2), { receive: true }));
  group.add(slab(0.0, 1.6, 0.06, 0.11, z1 - 0.95, z1 - 0.1, toon(0x3a4354), { receive: true }));
  group.add(slab(0.08, 1.52, 0.11, 0.125, z1 - 0.88, z1 - 0.17, toon(0x5b6577), { outline: false }));

  // ---- roof, fascia and signage -----------------------------------------
  group.add(slab(x0 - 0.22, x1 + 0.22, wallTop, wallTop + 0.26, z0 - 0.22, z1 + 0.22, toon(P.roof), { cast: true }));
  group.add(slab(x0 - 0.3, x1 + 0.3, wallTop + 0.26, wallTop + 0.4, z0 - 0.3, z1 + 0.3, toon(0x3d4a5e)));

  // Rooftop plant. Seen from any high orbit angle, so the roof is dressed
  // rather than left as a blank plane: extract fans, an air-handler box and
  // the small water tank every Japanese shop roof carries.
  for (const [vx, vz, r] of [[-4.2, -6.6, 0.42], [-1.4, -6.6, 0.42], [-4.2, -3.4, 0.34]]) {
    group.add(make(CYL(r, r, 0.34, 14), toon(0x8f97a4), { pos: [vx, wallTop + 0.57, vz], cast: true }));
    group.add(make(CYL(r * 0.78, r * 0.78, 0.05, 14), toon(0x5c6474), { pos: [vx, wallTop + 0.76, vz] }));
  }
  group.add(slab(-0.9, 0.9, wallTop + 0.4, wallTop + 1.05, -5.4, -4.0, toon(0x99a1ae), { cast: true }));
  group.add(slab(-0.95, 0.95, wallTop + 1.05, wallTop + 1.14, -5.45, -3.95, toon(0x5c6474)));
  group.add(make(CYL(0.46, 0.46, 0.5, 14), toon(0xa8b0bc), { pos: [0.4, wallTop + 0.65, -7.4], cast: true }));
  group.add(make(CYL(0.5, 0.5, 0.06, 14), toon(0x5c6474), { pos: [0.4, wallTop + 0.93, -7.4] }));
  // Roof-edge safety rail on the alley side.
  for (let i = 0; i < 4; i += 1) {
    group.add(slab(-4.6 + i * 1.9, -4.55 + i * 1.9, wallTop + 0.4, wallTop + 0.86, z0 - 0.26, z0 - 0.2, toon(0x6f7787), { outline: false }));
  }
  group.add(slab(-4.7, 1.2, wallTop + 0.82, wallTop + 0.88, z0 - 0.27, z0 - 0.19, toon(0x6f7787), { outline: false }));

  // Fascia sign. The lit face uses a flat material so it can be driven by the
  // flicker in weather.js without touching the toon lighting response.
  const signMap = signTexture();
  const signFaceMat = flat(0xffffff);
  signFaceMat.map = signMap;
  const signGlowMat = new THREE.MeshBasicMaterial({ color: P.signGlow, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false });
  group.add(slab(x0 - 0.1, x1 + 0.1, STORE.fasciaY0, STORE.fasciaY1, z1 + 0.02, z1 + 0.16, toon(P.wall), { cast: true }));
  const signFace = make(PLANE(x1 - x0 + 0.2, STORE.fasciaY1 - STORE.fasciaY0), signFaceMat, {
    pos: [(x0 + x1) / 2, (STORE.fasciaY0 + STORE.fasciaY1) / 2, z1 + 0.17],
    outline: false,
  });
  group.add(signFace);
  group.add(make(PLANE(x1 - x0 + 0.2, STORE.fasciaY1 - STORE.fasciaY0), signGlowMat, {
    pos: [(x0 + x1) / 2, (STORE.fasciaY0 + STORE.fasciaY1) / 2, z1 + 0.19],
    outline: false,
  }));
  // Sign spill onto the wet pavement in front of the shop.
  const spillMap = canvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, 'rgba(150,240,220,0.85)');
    g.addColorStop(0.5, 'rgba(120,220,205,0.30)');
    g.addColorStop(1, 'rgba(120,220,205,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  const spill = make(PLANE(9, 4.4), textured(spillMap, { blending: THREE.AdditiveBlending, opacity: 0.55 }), {
    pos: [(x0 + x1) / 2, 0.115, z1 + 2.0],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  });
  group.add(spill);

  // Perpendicular blade sign at the corner end of the fascia.
  const bladeMap = bladeTexture();
  const bladeMat = flat(0xffffff);
  bladeMat.map = bladeMap;
  group.add(slab(1.16, 1.32, 2.42, 3.62, z1, z1 + 0.62, toon(P.wall), { cast: true }));
  group.add(make(PLANE(0.56, 1.14), bladeMat, { pos: [1.36, 3.02, z1 + 0.3], rot: [0, Math.PI / 2, 0], outline: false }));
  group.add(make(PLANE(0.56, 1.14), bladeMat, { pos: [1.12, 3.02, z1 + 0.3], rot: [0, -Math.PI / 2, 0], outline: false }));
  group.add(slab(1.1, 1.38, 2.36, 2.44, z1 + 0.04, z1 + 0.58, toon(P.trimDeep)));
  group.add(slab(1.1, 1.38, 3.6, 3.68, z1 + 0.04, z1 + 0.58, toon(P.trimDeep)));

  // Clerestory strip above the awning. Without it the band between the canopy
  // and the fascia reads as a blank slab from street level. It has to sit
  // proud of the wall face, not inside it.
  const clerestoryMat = flat(0x18232f, { opacity: 0.92 });
  group.add(slab(x0 + 0.2, x1 - 0.2, 2.86, 3.26, z1 + 0.005, z1 + 0.045, clerestoryMat, { outline: false }));
  for (let i = 0; i < 6; i += 1) {
    const cx = x0 + 0.32 + i * ((x1 - x0 - 0.64) / 5);
    group.add(slab(cx - 0.035, cx + 0.035, 2.86, 3.26, z1 + 0.0, z1 + 0.07, toon(P.frame), { outline: false }));
  }
  group.add(slab(x0 + 0.16, x1 - 0.16, 2.8, 2.86, z1 - 0.02, z1 + 0.08, toon(P.frame), { outline: false }));
  group.add(slab(x0 + 0.16, x1 - 0.16, 3.26, 3.32, z1 - 0.02, z1 + 0.08, toon(P.frame), { outline: false }));

  // ---- awning ------------------------------------------------------------
  // Kept shallow and high so it shelters the doorway without hiding the
  // glazed front from an orbiting third-person camera.
  const awning = new THREE.Group();
  const awnLen = 0.66;
  const awnY0 = 2.74;
  const awnY1 = 2.5;
  const awn = new THREE.Mesh(BOX(x1 - x0 + 0.5, 0.08, awnLen), toon(P.awning));
  awn.position.set((x0 + x1) / 2, (awnY0 + awnY1) / 2, z1 + awnLen / 2);
  awn.rotation.x = Math.atan2(awnY0 - awnY1, awnLen);
  awn.castShadow = true;
  awning.add(awn);
  // Two accent bands along the canopy. A plain slab at this size reads as a
  // blown-out white wedge and pulls the eye off the fascia it is meant to
  // shelter; the banding gives it a direction and a scale.
  for (const band of [[-3.4, -2.86, P.trim], [0.4, 0.94, P.orange]]) {
    const stripe = new THREE.Mesh(BOX(band[1] - band[0], 0.09, awnLen + 0.012), toon(band[2]));
    stripe.position.set((band[0] + band[1]) / 2, (awnY0 + awnY1) / 2, z1 + awnLen / 2);
    stripe.rotation.x = awn.rotation.x;
    awning.add(stripe);
  }
  // Scalloped valance at the leading edge.
  group.add(slab(x0 - 0.25, x1 + 0.25, awnY1 - 0.3, awnY1 - 0.02, z1 + awnLen - 0.06, z1 + awnLen, toon(P.awningTrim)));
  for (let i = 0; i < 11; i += 1) {
    const cx = x0 - 0.15 + i * ((x1 - x0 + 0.3) / 10);
    group.add(make(BOX(0.22, 0.1, 0.05), toon(P.awning), { pos: [cx, awnY1 - 0.36, z1 + awnLen - 0.03], outline: false }));
  }
  // Awning support brackets.
  for (const bx of [x0 + 0.2, (x0 + x1) / 2, x1 - 0.2]) {
    group.add(slab(bx - 0.04, bx + 0.04, 2.54, 2.76, z1 + 0.08, z1 + 0.6, toon(P.frame)));
  }
  group.add(awning);

  // ---- alley wall dressing ----------------------------------------------
  // Service door and a weak wall lamp on the east elevation.
  group.add(slab(x1, x1 + 0.06, 0, 2.1, -7.6, -6.7, toon(P.wallAlley), { outline: false }));
  group.add(slab(x1 + 0.04, x1 + 0.1, 0.06, 2.06, -7.56, -6.74, toon(0xb6bfcd), { outline: false }));
  group.add(make(CYL(0.13, 0.13, 0.1, 10), toon(0x8f97a6), { pos: [x1 + 0.14, 1.1, -6.75], rot: [0, 0, Math.PI / 2] }));
  const alleyLamp = flat(0xfff0c0);
  group.add(slab(x1 + 0.02, x1 + 0.2, 2.3, 2.44, -5.2, -4.6, toon(0x6d7684)));
  group.add(slab(x1 + 0.14, x1 + 0.24, 2.26, 2.4, -5.14, -4.66, alleyLamp, { outline: false }));

  // Drainpipe running down the alley corner.
  group.add(make(CYL(0.08, 0.08, 3.4, 8), toon(0x7d8695), { pos: [x1 + 0.1, 1.7, z0 + 0.35] }));
  group.add(slab(x1 + 0.02, x1 + 0.22, 3.3, 3.42, z0 + 0.25, z0 + 0.45, toon(0x6d7684)));

  // ---- east elevation detail ---------------------------------------------
  // The alley flank is the largest unbroken surface the default orbit sees, so
  // it carries the detail a real shop side has: panel seams, a high strip
  // window, a bracketed condenser, a louvred vent and pipe brackets.
  const seamMat = toon(0xa4aebe);
  for (const sy of [1.22, 2.48]) {
    group.add(slab(x1, x1 + 0.028, sy, sy + 0.055, z0 + 0.3, z1 - 0.15, seamMat, { outline: false }));
  }
  group.add(slab(x1, x1 + 0.028, 0, wallTop, -5.05, -4.99, seamMat, { outline: false }));
  group.add(slab(x1, x1 + 0.028, 0, wallTop, -2.35, -2.29, seamMat, { outline: false }));

  // High strip window, lit from inside by the stockroom.
  group.add(slab(x1, x1 + 0.05, 2.02, 2.58, -4.45, -2.6, toon(0x2a3444), { outline: false }));
  group.add(slab(x1 + 0.05, x1 + 0.075, 2.07, 2.53, -4.4, -2.65, flat(0xffd9a0, { opacity: 0.42, transparent: true }), { outline: false }));
  for (let m = 1; m <= 2; m += 1) {
    const mz = -4.4 + m * 0.585;
    group.add(slab(x1 + 0.02, x1 + 0.1, 2.02, 2.58, mz - 0.03, mz + 0.03, toon(P.frame), { outline: false }));
  }
  group.add(slab(x1 + 0.02, x1 + 0.12, 1.95, 2.02, -4.5, -2.55, toon(0x8b939f)));
  group.add(slab(x1 + 0.02, x1 + 0.12, 2.58, 2.64, -4.5, -2.55, toon(0x8b939f), { outline: false }));
  // Warm glow from the stockroom window, cast onto the alley floor.
  group.add(make(PLANE(2.6, 2.2), textured(glowTexture(0xffcf90), { blending: THREE.AdditiveBlending, opacity: 0.3 }), {
    pos: [x1 + 1.5, 0.14, -3.5],
    rot: [-Math.PI / 2, 0, 0],
    outline: false,
  }));

  // Condenser unit on brackets.
  group.add(slab(x1 + 0.1, x1 + 0.64, 1.32, 1.94, -3.35, -2.5, toon(P.ac), { cast: true }));
  group.add(slab(x1 + 0.64, x1 + 0.68, 1.39, 1.87, -3.29, -2.56, toon(0x6b7383), { outline: false }));
  for (let f = 0; f < 4; f += 1) {
    const fy = 1.44 + f * 0.12;
    group.add(slab(x1 + 0.66, x1 + 0.69, fy, fy + 0.05, -3.26, -2.59, toon(0x8f97a4), { outline: false }));
  }
  for (const bz of [-3.28, -2.57]) {
    group.add(slab(x1, x1 + 0.13, 1.24, 1.33, bz - 0.035, bz + 0.035, toon(0x6d7684), { outline: false }));
  }

  // Louvred vent low on the flank.
  group.add(slab(x1, x1 + 0.055, 0.5, 1.04, -8.0, -7.05, toon(0x59616f), { outline: false }));
  for (let i = 0; i < 6; i += 1) {
    const ly = 0.56 + i * 0.077;
    group.add(slab(x1 + 0.05, x1 + 0.085, ly, ly + 0.034, -7.95, -7.1, toon(0x8b939f), { outline: false }));
  }
  // Small stencilled bay number beside the service door.
  {
    const mat = flat(0xffffff);
    mat.map = canvasTexture(96, 96, (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(214,226,244,0.9)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 52px sans-serif';
      ctx.fillText('2', w / 2, h / 2 + 3);
    });
    group.add(make(PLANE(0.3, 0.3), mat, { pos: [x1 + 0.02, 1.72, -6.24], rot: [0, Math.PI / 2, 0], outline: false }));
  }

  // ---- rear elevation detail ---------------------------------------------
  // Only visible from high or rear orbits, but a blank back wall is exactly
  // what makes a diorama look unfinished when the camera swings round.
  group.add(slab(x0 + 0.2, x1 - 0.2, 2.3, 2.86, z0 - 0.05, z0 - 0.02, toon(0x2a3444), { outline: false }));
  group.add(slab(x0 + 0.25, x1 - 0.25, 2.35, 2.81, z0 - 0.08, z0 - 0.05, flat(0x7f93b4, { opacity: 0.3, transparent: true }), { outline: false }));
  for (let m = 0; m < 5; m += 1) {
    const mx = x0 + 0.2 + m * ((x1 - x0 - 0.4) / 4);
    group.add(slab(mx - 0.035, mx + 0.035, 2.3, 2.86, z0 - 0.09, z0 - 0.02, toon(P.frame), { outline: false }));
  }
  group.add(slab(x0 + 0.15, x1 - 0.15, 2.22, 2.3, z0 - 0.11, z0 - 0.02, toon(0x8b939f)));
  // Rear wall seams and a wall-mounted meter cabinet.
  for (const sy of [1.18, 2.44]) {
    group.add(slab(x0 + 0.3, x1 - 0.3, sy, sy + 0.055, z0 - 0.028, z0, seamMat, { outline: false }));
  }
  group.add(slab(x0 + 0.5, x0 + 1.2, 0.95, 1.55, z0 - 0.12, z0, toon(0x7d8695), { cast: true }));
  group.add(slab(x0 + 0.56, x0 + 1.14, 1.02, 1.48, z0 - 0.14, z0 - 0.12, flat(0x39424f), { outline: false }));
  // Rear vent louvres.
  group.add(slab(x1 - 2.2, x1 - 0.6, 1.5, 2.0, z0 - 0.05, z0, toon(0x59616f), { outline: false }));
  for (let i = 0; i < 5; i += 1) {
    const ly = 1.55 + i * 0.08;
    group.add(slab(x1 - 2.15, x1 - 0.65, ly, ly + 0.035, z0 - 0.08, z0 - 0.05, toon(0x8b939f), { outline: false }));
  }

  // A single small sticker low in the leftmost bay. The rest of the glazing is
  // deliberately left clear so the interior reads from the street.
  {
    const mat = flat(0xffffff);
    mat.map = posterTexture('coffee');
    group.add(make(PLANE(0.44, 0.56), mat, { pos: [x0 + 0.62, 0.86, z1 - 0.16], outline: false }));
  }

  scene.add(group);

  return {
    group,
    doorLeaves: leaves,
    doorPanelWidth: panelW,
    runoffMap,
    signMaterials: [signFaceMat, signGlowMat],
    spillMaterial: spill.material,
  };
}
