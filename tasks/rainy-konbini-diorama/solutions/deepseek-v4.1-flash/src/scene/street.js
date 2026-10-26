import * as THREE from 'three';
import { canvasTexture, rng } from '../core/textures.js';
import { toon, glow } from '../core/toon.js';
import { GEO, box, plane, group, cylinder } from '../core/geometry.js';
import {
  BASE_HALF, BASE_EDGE, BASE_TOP, ROAD_Y, WALK_Y, AVENUE, SIDE_STREET,
  STORE, ALLEY, NEIGHBOUR,
} from './layout.js';

/**
 * Everything that dresses the street: streetlight and utility poles, overhead
 * wires, vending machines, bicycle, umbrella stand, bins, guardrail, parking
 * bays, signs, the notice board and the neighbouring building.
 */

// ---------------------------------------------------------------------------
// Artwork
// ---------------------------------------------------------------------------

/** Vending machine front: glowing product rows and a drink selection strip. */
function vendingFaceTexture(scheme) {
  const w = 384;
  const h = 640;
  return canvasTexture(w, h, (ctx) => {
    const base = scheme === 'red' ? '#c8443e' : '#3f6fae';
    const accent = scheme === 'red' ? '#f0d8c0' : '#d8e8ff';
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);

    // Top brand band.
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, w, h * 0.14);
    ctx.fillStyle = base;
    ctx.font = `800 ${Math.round(h * 0.075)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(scheme === 'red' ? 'つめた〜い' : 'あったか〜い', w / 2, h * 0.07);

    // Product display window.
    const winY = h * 0.16;
    const winH = h * 0.44;
    ctx.fillStyle = '#f6fbff';
    ctx.fillRect(w * 0.06, winY, w * 0.88, winH);

    const palette = ['#e8524f', '#3f7fd0', '#f0b53c', '#54a86a', '#e07b3c', '#c75fa8', '#4fbcc4'];
    const cols = 4;
    const rows = 3;
    const cw = (w * 0.88) / cols;
    const rh = winH / rows;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const x = w * 0.06 + c * cw + cw * 0.16;
        const y = winY + r * rh + rh * 0.14;
        const bw = cw * 0.66;
        const bh = rh * 0.62;
        ctx.fillStyle = palette[(r * cols + c) % palette.length];
        ctx.fillRect(x, y, bw, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.fillRect(x + bw * 0.18, y + bh * 0.28, bw * 0.64, bh * 0.18);
        // Price tag under each bottle.
        ctx.fillStyle = 'rgba(40,44,56,0.8)';
        ctx.fillRect(x + bw * 0.1, y + bh + 3, bw * 0.8, rh * 0.1);
      }
      ctx.fillStyle = 'rgba(120,150,180,0.35)';
      ctx.fillRect(w * 0.06, winY + (r + 1) * rh - 3, w * 0.88, 3);
    }

    // Selection buttons and coin slot.
    ctx.fillStyle = '#22262f';
    ctx.fillRect(w * 0.06, h * 0.63, w * 0.88, h * 0.06);
    for (let i = 0; i < 6; i += 1) {
      ctx.fillStyle = i % 2 ? '#7ad0a0' : '#f0c060';
      ctx.fillRect(w * 0.1 + i * w * 0.13, h * 0.645, w * 0.08, h * 0.03);
    }

    // Delivery port.
    ctx.fillStyle = '#1a1d24';
    ctx.fillRect(w * 0.14, h * 0.72, w * 0.72, h * 0.16);
    ctx.fillStyle = '#2c313c';
    ctx.fillRect(w * 0.17, h * 0.735, w * 0.66, h * 0.1);
    ctx.fillStyle = 'rgba(120,200,255,0.35)';
    ctx.fillRect(w * 0.17, h * 0.735, w * 0.66, h * 0.012);
  });
}

/** Notice board with overlapping community flyers. */
function noticeBoardTexture() {
  const w = 384;
  const h = 288;
  return canvasTexture(w, h, (ctx) => {
    const random = rng(6612);
    ctx.fillStyle = '#6a6258';
    ctx.fillRect(0, 0, w, h);

    const papers = [
      { x: 0.06, y: 0.08, w: 0.28, h: 0.36, bg: '#f6f0e0', accent: '#c8543c', text: '町内会' },
      { x: 0.37, y: 0.06, w: 0.26, h: 0.3, bg: '#eef4ff', accent: '#3f76b8', text: '防災' },
      { x: 0.66, y: 0.1, w: 0.28, h: 0.34, bg: '#fff6e0', accent: '#e8862f', text: 'お知らせ' },
      { x: 0.1, y: 0.5, w: 0.3, h: 0.32, bg: '#fdf0f2', accent: '#b84a6a', text: '子育て' },
      { x: 0.44, y: 0.48, w: 0.24, h: 0.28, bg: '#f0f8ee', accent: '#4f8f5c', text: '清掃' },
      { x: 0.7, y: 0.52, w: 0.24, h: 0.3, bg: '#f6f0e0', accent: '#8a6a44', text: '募集' },
    ];
    for (const p of papers) {
      const px = p.x * w;
      const py = p.y * h;
      const pw = p.w * w;
      const ph = p.h * h;
      ctx.save();
      ctx.translate(px + pw / 2, py + ph / 2);
      ctx.rotate((random() - 0.5) * 0.09);
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(-pw / 2 + 3, -ph / 2 + 3, pw, ph);
      ctx.fillStyle = p.bg;
      ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
      ctx.fillStyle = p.accent;
      ctx.fillRect(-pw / 2, -ph / 2, pw, ph * 0.16);
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${Math.round(ph * 0.11)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.text, 0, -ph / 2 + ph * 0.08);
      // Body lines.
      ctx.fillStyle = 'rgba(60,64,76,0.35)';
      for (let i = 0; i < 5; i += 1) {
        ctx.fillRect(-pw * 0.38, -ph * 0.14 + i * ph * 0.09, pw * (0.55 + random() * 0.3), ph * 0.035);
      }
      // Pin.
      ctx.fillStyle = '#c8443e';
      ctx.beginPath();
      ctx.arc(0, -ph / 2 + ph * 0.05, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Board frame.
    ctx.strokeStyle = '#4a443c';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);
  });
}

/** Directional street sign plate. */
function streetSignTexture() {
  const w = 512;
  const h = 128;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#2b4a7a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#f0f4ff';
    ctx.lineWidth = 5;
    ctx.strokeRect(9, 9, w - 18, h - 18);
    ctx.fillStyle = '#f4f8ff';
    ctx.font = `700 ${Math.round(h * 0.42)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('桜坂通り', w * 0.5, h * 0.4);
    ctx.font = `600 ${Math.round(h * 0.2)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('SAKURAZAKA DORI', w * 0.5, h * 0.72);
  });
}

/** Parking bay "P" sign. */
function parkingSignTexture() {
  const w = 128;
  const h = 128;
  return canvasTexture(w, h, (ctx) => {
    ctx.fillStyle = '#2b4a7a';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#f0f4ff';
    ctx.lineWidth = 6;
    ctx.strokeRect(6, 6, w - 12, h - 12);
    ctx.fillStyle = '#f4f8ff';
    ctx.font = `800 ${Math.round(h * 0.62)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('P', w / 2, h * 0.46);
    ctx.font = `700 ${Math.round(h * 0.15)}px "Helvetica Neue", Arial, sans-serif`;
    ctx.fillText('24H', w / 2, h * 0.82);
  });
}

// ---------------------------------------------------------------------------
// Builders
// ---------------------------------------------------------------------------

export function buildStreet({ scene, materials, lighting }) {
  const root = new THREE.Group();
  root.name = 'street';
  scene.add(root);

  const wetMeshes = [];
  const updateables = [];

  // --- Utility pole + wires ---------------------------------------------
  const poleX = AVENUE.xMax - 0.42;
  const poleZ = -2.4;
  const pole = group(root, [poleX, BASE_TOP, poleZ]);
  cylinder(pole, materials.concrete, 0.11, 6.4, [0, 3.2, 0], { geometry: GEO.cylLow });
  // Cross arms and insulators.
  for (const y of [4.6, 5.2, 5.75]) {
    box(pole, materials.metalDark, [1.4, 0.07, 0.07], [0, y, 0], { cast: false });
    for (const dx of [-0.55, -0.2, 0.2, 0.55]) {
      const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.11, 8), materials.plasticGrey);
      insulator.position.set(dx, y + 0.09, 0);
      pole.add(insulator);
    }
  }
  // Transformer drum.
  const transformer = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.62, 14), materials.metalDark);
  transformer.position.set(0.3, 4.0, 0);
  pole.add(transformer);
  // Pole number plate.
  const polePlate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.2, 0.26),
    glow('polePlate', {
      color: 0xffffff,
      map: canvasTexture(128, 160, (ctx, w, h) => {
        ctx.fillStyle = '#f0e8d0';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#2b3140';
        ctx.font = `700 ${Math.round(h * 0.24)}px "Helvetica Neue", Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('桜', w / 2, h * 0.34);
        ctx.fillText('12', w / 2, h * 0.62);
      }),
      transparent: false,
    }),
  );
  polePlate.position.set(0, 1.9, 0.115);
  pole.add(polePlate);

  // --- Second pole on the far side of the avenue ------------------------
  const pole2X = AVENUE.xMin + 0.3;
  const pole2Z = 3.1;
  const pole2 = group(root, [pole2X, BASE_TOP, pole2Z]);
  cylinder(pole2, materials.concrete, 0.095, 5.6, [0, 2.8, 0], { geometry: GEO.cylLow });
  box(pole2, materials.metalDark, [1.2, 0.06, 0.06], [0, 4.4, 0], { cast: false });
  for (const dx of [-0.45, -0.15, 0.15, 0.45]) {
    const insulator = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.1, 8), materials.plasticGrey);
    insulator.position.set(dx, 4.48, 0);
    pole2.add(insulator);
  }

  // --- Overhead wires ---------------------------------------------------
  const wireMat = toon('wire', { color: 0x14161e });
  const makeWire = (a, b, sag, radius = 0.012) => {
    const mid = new THREE.Vector3(
      (a.x + b.x) / 2,
      Math.min(a.y, b.y) - sag,
      (a.z + b.z) / 2,
    );
    const curve = new THREE.CatmullRomCurve3([a, mid, b]);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 14, radius, 4, false), wireMat);
    tube.castShadow = false;
    root.add(tube);
  };

  const poleTop = new THREE.Vector3(poleX, BASE_TOP + 5.75, poleZ);
  const pole2Top = new THREE.Vector3(pole2X, BASE_TOP + 4.48, pole2Z);
  makeWire(
    new THREE.Vector3(poleX - 0.55, BASE_TOP + 4.6, poleZ),
    new THREE.Vector3(BASE_HALF - BASE_EDGE, BASE_TOP + 4.2, poleZ - 0.4),
    0.5,
  );
  makeWire(
    new THREE.Vector3(poleX + 0.55, BASE_TOP + 4.6, poleZ),
    new THREE.Vector3(BASE_HALF - BASE_EDGE, BASE_TOP + 4.0, poleZ + 0.5),
    0.55,
  );
  makeWire(
    new THREE.Vector3(poleX, BASE_TOP + 5.75, poleZ),
    new THREE.Vector3(BASE_HALF - BASE_EDGE, BASE_TOP + 5.2, poleZ + 0.2),
    0.65,
  );
  makeWire(
    new THREE.Vector3(poleX - 0.2, BASE_TOP + 5.2, poleZ),
    pole2Top,
    0.8,
  );
  makeWire(
    new THREE.Vector3(poleX - 0.55, BASE_TOP + 4.6, poleZ),
    new THREE.Vector3(pole2X - 0.15, BASE_TOP + 4.48, pole2Z),
    0.9,
  );
  makeWire(
    new THREE.Vector3(poleX + 0.2, BASE_TOP + 5.2, poleZ),
    new THREE.Vector3(pole2X + 0.15, BASE_TOP + 4.48, pole2Z),
    0.85,
  );
  makeWire(
    new THREE.Vector3(poleX, BASE_TOP + 4.6, poleZ),
    new THREE.Vector3(poleX + 0.2, BASE_TOP + 5.2, poleZ - 0.1),
    0.1,
  );
  // Drop wire to the store.
  makeWire(
    new THREE.Vector3(poleX + 0.55, BASE_TOP + 4.6, poleZ),
    new THREE.Vector3(STORE.xMin - 0.2, STORE.parapetTop - 0.1, poleZ + 1.2),
    0.3,
  );

  // --- Streetlight on the pole -----------------------------------------
  const lampArm = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.06, 0.06), materials.metalDark);
  lampArm.position.set(poleX + 0.52, BASE_TOP + 4.15, poleZ + 0.1);
  root.add(lampArm);

  const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.24, 0.16, 12), materials.metal);
  lampShade.position.set(poleX + 1.02, BASE_TOP + 4.06, poleZ + 0.1);
  root.add(lampShade);

  const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 8), materials.lampGlass);
  lampBulb.position.set(poleX + 1.02, BASE_TOP + 3.94, poleZ + 0.1);
  root.add(lampBulb);

  // Warm pool of light on the wet road under the lamp.
  const poolTex = canvasTexture(128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.5);
    grad.addColorStop(0, 'rgba(255,224,168,0.5)');
    grad.addColorStop(0.45, 'rgba(255,206,140,0.22)');
    grad.addColorStop(1, 'rgba(255,190,120,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
  const poolMat = glow('lampPool', {
    color: 0xffffff, map: poolTex, transparent: true, opacity: 0.85,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), poolMat);
  pool.rotation.x = -Math.PI / 2;
  pool.position.set(poleX + 0.9, ROAD_Y + 0.014, poleZ + 0.1);
  pool.renderOrder = 1;
  root.add(pool);

  // --- Vending machines -------------------------------------------------
  // The alley is only 1.1 wide, so only one machine fits inside it. The second
  // stands on the pavement in front of the neighbouring shop, and both face the
  // side street so their lit fronts read from the corner.
  const vendingSpecs = [
    { x: ALLEY.xMin + 0.46, z: ALLEY.zMax - 0.62, scheme: 'red', accent: 0xff5a4a },
    { x: NEIGHBOUR.xMin + 0.62, z: STORE.zMax + 0.42, scheme: 'blue', accent: 0x6ab0ff },
  ];
  for (const spec of vendingSpecs) {
    const v = group(root, [spec.x, WALK_Y, spec.z]);
    // Body: width runs along X, depth along Z.
    box(v, spec.scheme === 'red' ? materials.red : materials.blue, [0.76, 1.86, 0.7], [0, 0.93, 0]);
    box(v, materials.metalDark, [0.8, 0.1, 0.74], [0, 1.9, 0]);
    // Lit front face, looking south onto the sidewalk.
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 1.72),
      glow(`vendingFace-${spec.scheme}`, {
        color: 0xffffff, map: vendingFaceTexture(spec.scheme), transparent: false,
      }),
    );
    face.position.set(0, 0.95, 0.36);
    v.add(face);
    // Soft glow card in front of the machine.
    const vglow = new THREE.Mesh(
      new THREE.PlaneGeometry(0.74, 1.7),
      glow(`vendingGlowCard-${spec.scheme}`, {
        color: spec.accent, transparent: true, opacity: 0.13,
        blending: THREE.AdditiveBlending, depthWrite: false,
      }),
    );
    vglow.position.set(0, 0.95, 0.44);
    v.add(vglow);
    // Feet.
    box(v, materials.metalDark, [0.7, 0.06, 0.64], [0, 0.03, 0], { cast: false });
  }

  // --- Umbrella stand by the door ---------------------------------------
  const umbrella = group(root, [STORE.xMin + 0.32, WALK_Y, STORE.zMax + 0.4]);
  box(umbrella, materials.metalDark, [0.34, 0.06, 0.34], [0, 0.03, 0]);
  box(umbrella, materials.metal, [0.34, 0.5, 0.03], [0, 0.28, -0.15], { cast: false });
  box(umbrella, materials.metal, [0.34, 0.5, 0.03], [0, 0.28, 0.15], { cast: false });
  // A few umbrellas leaning in the stand.
  const umbrellaColors = [materials.red, materials.blue, materials.plasticWhite];
  umbrellaColors.forEach((mat, i) => {
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.92, 6), materials.metalDark);
    stick.position.set(-0.08 + i * 0.08, 0.5, -0.04 + (i % 2) * 0.08);
    stick.rotation.z = (i - 1) * 0.1;
    umbrella.add(stick);
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.42, 8), mat);
    canopy.position.set(-0.08 + i * 0.08 - (i - 1) * 0.02, 0.72, -0.04 + (i % 2) * 0.08);
    canopy.rotation.z = (i - 1) * 0.1;
    umbrella.add(canopy);
  });

  // --- Bicycle ----------------------------------------------------------
  // Bicycle parked against the storefront's west end, clear of the entrance.
  buildBicycle(root, materials, [STORE.xMin + 0.62, WALK_Y, STORE.zMax + 0.46]);

  // --- Bins -------------------------------------------------------------
  const binGroup = group(root, [STORE.xMax - 0.55, WALK_Y, STORE.zMax + 0.48]);
  const binSpecs = [
    { x: -0.22, mat: materials.blue, label: 'かん' },
    { x: 0.22, mat: materials.green, label: 'ペット' },
  ];
  for (const spec of binSpecs) {
    box(binGroup, spec.mat, [0.34, 0.62, 0.34], [spec.x, 0.31, 0]);
    box(binGroup, materials.metalDark, [0.36, 0.06, 0.36], [spec.x, 0.64, 0], { cast: false });
    // Opening.
    box(binGroup, materials.rubber, [0.2, 0.1, 0.02], [spec.x, 0.5, 0.17], { cast: false });
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.09),
      glow(`binLabel-${spec.label}`, {
        color: 0xffffff,
        map: canvasTexture(128, 56, (ctx, w, h) => {
          ctx.fillStyle = '#f0ece0';
          ctx.fillRect(0, 0, w, h);
          ctx.fillStyle = '#3a3f4c';
          ctx.font = `700 ${Math.round(h * 0.5)}px "Hiragino Sans", sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(spec.label, w / 2, h / 2);
        }),
        transparent: false,
      }),
    );
    label.position.set(spec.x, 0.36, 0.172);
    binGroup.add(label);
  }

  // --- Notice board -----------------------------------------------------
  // A freestanding community board on the avenue pavement, facing the road. The
  // south pavement is too shallow to hold it without covering the storefront.
  const boardGroup = group(root, [AVENUE.xMax + 0.44, WALK_Y, 0.35]);
  boardGroup.rotation.y = -Math.PI / 2;
  box(boardGroup, materials.wood, [0.7, 0.5, 0.05], [0, 0.92, 0]);
  const boardFace = new THREE.Mesh(
    new THREE.PlaneGeometry(0.64, 0.44),
    glow('noticeBoard', { color: 0xffffff, map: noticeBoardTexture(), transparent: false }),
  );
  boardFace.position.set(0, 0.92, 0.03);
  boardGroup.add(boardFace);
  // Posts.
  box(boardGroup, materials.metalDark, [0.04, 0.7, 0.04], [-0.28, 0.35, 0]);
  box(boardGroup, materials.metalDark, [0.04, 0.7, 0.04], [0.28, 0.35, 0]);
  // Little roof.
  box(boardGroup, materials.metalDark, [0.76, 0.03, 0.12], [0, 1.2, 0.02], { cast: false });

  // --- Guardrail along the avenue kerb ----------------------------------
  const railGroup = group(root, [AVENUE.xMax + 0.1, BASE_TOP, 0]);
  for (let i = 0; i < 6; i += 1) {
    const z = -1.2 + i * 0.72;
    cylinder(railGroup, materials.steel, 0.035, 0.62, [0, 0.31, z], { geometry: GEO.cylLow });
  }
  box(railGroup, materials.steel, [0.06, 0.06, 4.1], [0, 0.58, 0.6], { cast: false });
  box(railGroup, materials.steel, [0.05, 0.05, 4.1], [0, 0.36, 0.6], { cast: false });

  // --- Parking bays on the side street ----------------------------------
  const bayTex = canvasTexture(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(232,236,248,0.72)';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h);
    ctx.lineTo(w * 0.1, h * 0.14);
    ctx.moveTo(w * 0.9, h);
    ctx.lineTo(w * 0.9, h * 0.14);
    ctx.moveTo(w * 0.1, h * 0.14);
    ctx.lineTo(w * 0.9, h * 0.14);
    ctx.stroke();
  });
  const bayMat = new THREE.MeshBasicMaterial({
    map: bayTex, transparent: true, opacity: 0.6, depthWrite: false,
  });
  for (let i = 0; i < 2; i += 1) {
    const bay = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.9), bayMat);
    bay.rotation.x = -Math.PI / 2;
    bay.position.set(1.05 + i * 1.5, ROAD_Y + 0.007, SIDE_STREET.zMax - 1.15);
    root.add(bay);
  }

  // Parking sign, standing on the pavement east of the vending machine. The
  // plinth ends at BASE_HALF - BASE_EDGE, so the post has to stay inside it.
  const pSign = group(root, [NEIGHBOUR.xMin + 1.21, WALK_Y, STORE.zMax + 0.36]);
  box(pSign, materials.metal, [0.045, 1.5, 0.045], [0, 0.75, 0]);
  const pPlate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.38, 0.38),
    glow('parkingSign', { color: 0xffffff, map: parkingSignTexture(), transparent: false }),
  );
  pPlate.position.set(0, 1.58, 0.03);
  pSign.add(pPlate);
  const pPlateBack = pPlate.clone();
  pPlateBack.rotation.y = Math.PI;
  pPlateBack.position.z = -0.03;
  pSign.add(pPlateBack);

  // --- Street name sign on the pole -------------------------------------
  const streetSign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 0.24),
    glow('streetSign', { color: 0xffffff, map: streetSignTexture(), transparent: false }),
  );
  streetSign.position.set(poleX + 0.05, BASE_TOP + 3.3, poleZ + 0.12);
  root.add(streetSign);

  // --- Traffic signal on the far corner ---------------------------------
  const signalGroup = group(root, [AVENUE.xMin + 0.45, BASE_TOP, SIDE_STREET.zMin - 0.55]);
  cylinder(signalGroup, materials.metalDark, 0.06, 3.4, [0, 1.7, 0], { geometry: GEO.cylLow });
  // Horizontal signal head facing the avenue.
  box(signalGroup, materials.metalDark, [0.94, 0.3, 0.2], [0.35, 3.28, 0], { cast: false });
  const signalLights = [];
  const signalColors = [
    { color: 0xff4a52, mat: 'redLight' },
    { color: 0xffb347, mat: 'amberLight' },
    { color: 0x54e08a, mat: 'greenLight' },
  ];
  signalColors.forEach((spec, i) => {
    const lightMat = glow(`signal-${i}`, { color: spec.color, transparent: true, opacity: 0.25 });
    const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.085, 14), lightMat);
    bulb.position.set(0.13 + i * 0.22, 3.28, 0.105);
    signalGroup.add(bulb);
    // Hood over each lamp.
    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 12, 1, true), materials.metalDark);
    hood.rotation.x = Math.PI / 2;
    hood.position.set(0.13 + i * 0.22, 3.28, 0.14);
    signalGroup.add(hood);
    signalLights.push(lightMat);
  });

  // Pedestrian signal facing the crosswalk.
  const pedHead = group(signalGroup, [0, 2.35, 0.14]);
  box(pedHead, materials.metalDark, [0.26, 0.46, 0.14], [0, 0, 0], { cast: false });
  const pedRed = glow('pedRed', { color: 0xff4a52, transparent: true, opacity: 0.2 });
  const pedGreen = glow('pedGreen', { color: 0x54e08a, transparent: true, opacity: 0.2 });
  const pedRedMesh = new THREE.Mesh(new THREE.CircleGeometry(0.075, 12), pedRed);
  pedRedMesh.position.set(0, 0.1, 0.075);
  pedHead.add(pedRedMesh);
  const pedGreenMesh = new THREE.Mesh(new THREE.CircleGeometry(0.075, 12), pedGreen);
  pedGreenMesh.position.set(0, -0.1, 0.075);
  pedHead.add(pedGreenMesh);

  // Signal timing state machine.
  const signal = {
    phase: 'green',
    timer: 0,
    cycle: ['green', 'amber', 'red', 'redAmber'],
  };

  updateables.push((dt, elapsed) => {
    signal.timer += dt;
    // 6s green, 2s amber, 7s red, 1.4s red+amber.
    const durations = { green: 6.2, amber: 2.0, red: 7.0, redAmber: 1.4 };
    if (signal.timer > durations[signal.phase]) {
      signal.timer = 0;
      const idx = signal.cycle.indexOf(signal.phase);
      signal.phase = signal.cycle[(idx + 1) % signal.cycle.length];
    }
    const active = signal.phase;
    signalLights[0].opacity = active === 'red' || active === 'redAmber' ? 1 : 0.14;
    signalLights[1].opacity = active === 'amber' || active === 'redAmber' ? 1 : 0.14;
    signalLights[2].opacity = active === 'green' ? 1 : 0.14;
    // Pedestrian signal mirrors the vehicle phase.
    const walk = active === 'green';
    pedGreen.opacity = walk ? 1 : 0.16;
    pedRed.opacity = walk ? 0.16 : 1;
    // A faint glow bleeds onto the wet road.
    signalLights[0].color.setScalar(0.9 + Math.sin(elapsed * 2.1) * 0.1);
  });

  // --- Neighbouring building --------------------------------------------
  buildNeighbour(root, materials);

  // --- Puddles with their own ripples -----------------------------------
  buildPuddleRings(root, materials);

  return {
    root,
    wetMeshes,
    get signalPhase() {
      return signal.phase;
    },
    update(dt, elapsed) {
      for (const fn of updateables) fn(dt, elapsed);
    },
  };
}

/** Simple cel-shaded bicycle: two wheels, a frame, basket and saddle. */
function buildBicycle(root, materials, position) {
  const bike = group(root, position);
  bike.rotation.y = -Math.PI / 2 + 0.18;

  const wheelGeo = new THREE.TorusGeometry(0.26, 0.022, 6, 20);
  const wheelMat = materials.rubber;
  for (const dx of [-0.44, 0.44]) {
    const wheel = new THREE.Mesh(wheelGeo, wheelMat);
    wheel.position.set(dx, 0.27, 0);
    bike.add(wheel);
    // Spokes.
    for (let i = 0; i < 6; i += 1) {
      const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.008, 0.008), materials.steel);
      spoke.position.set(dx, 0.27, 0);
      spoke.rotation.z = (i / 6) * Math.PI;
      bike.add(spoke);
    }
  }

  // Frame tubes.
  const tubeMat = materials.metal;
  const tube = (from, to, radius = 0.018) => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const len = a.distanceTo(b);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 6), tubeMat);
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    bike.add(mesh);
  };
  tube([-0.44, 0.27, 0], [-0.05, 0.5, 0]);
  tube([-0.05, 0.5, 0], [0.3, 0.5, 0]);
  tube([0.3, 0.5, 0], [0.44, 0.27, 0]);
  tube([0.3, 0.5, 0], [0.26, 0.28, 0]);
  tube([0.26, 0.28, 0], [-0.05, 0.5, 0]);
  tube([-0.05, 0.5, 0], [-0.05, 0.72, 0]); // seat post
  tube([0.3, 0.5, 0], [0.32, 0.78, 0]); // handlebar stem

  // Saddle.
  const saddle = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.09), materials.rubber);
  saddle.position.set(-0.07, 0.75, 0);
  bike.add(saddle);

  // Handlebar.
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.4), materials.steel);
  bar.position.set(0.32, 0.8, 0);
  bike.add(bar);

  // Front basket.
  const basket = new THREE.Group();
  basket.position.set(0.42, 0.66, 0);
  bike.add(basket);
  const basketMat = materials.steel;
  const bw = 0.24;
  const bh = 0.18;
  box(basket, basketMat, [bw, 0.012, bw], [0, -bh / 2, 0], { cast: false });
  for (let i = 0; i < 4; i += 1) {
    box(basket, basketMat, [bw, bh, 0.008], [0, 0, -bw / 2 + (i / 3) * bw], { cast: false });
  }
  box(basket, basketMat, [0.008, bh, bw], [-bw / 2, 0, 0], { cast: false });
  box(basket, basketMat, [0.008, bh, bw], [bw / 2, 0, 0], { cast: false });

  // Kickstand lean.
  bike.rotation.z = 0.06;

  return bike;
}

/** Low-rise neighbouring building that frames the alley. */
function buildNeighbour(root, materials) {
  const w = NEIGHBOUR.xMax - NEIGHBOUR.xMin;
  const d = NEIGHBOUR.zMax - NEIGHBOUR.zMin;
  const cx = (NEIGHBOUR.xMin + NEIGHBOUR.xMax) / 2;
  const cz = (NEIGHBOUR.zMin + NEIGHBOUR.zMax) / 2;
  const h = NEIGHBOUR.wallTop - WALK_Y;

  const g = new THREE.Group();
  g.position.set(cx, WALK_Y, cz);
  root.add(g);

  box(g, materials.brick, [w, h, d], [0, h / 2, 0]);
  // Floor band lines.
  for (let i = 1; i < 4; i += 1) {
    box(g, materials.concrete, [w + 0.03, 0.05, d + 0.03], [0, (i / 4) * h, 0], { cast: false });
  }
  // Parapet.
  box(g, materials.concrete, [w + 0.1, 0.1, d + 0.1], [0, h + 0.05, 0]);

  // Lit windows on the south face.
  const winMat = glow('neighbourWindow', { color: 0xffe0a8, transparent: true, opacity: 0.9 });
  const darkWinMat = toon('neighbourDarkWin', { color: 0x1e2432 });
  const winW = 0.42;
  const winH = 0.5;
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 2; col += 1) {
      const lit = (row * 2 + col) % 3 !== 0;
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(winW, winH),
        lit ? winMat : darkWinMat,
      );
      win.position.set(-w / 4 + col * (w / 2), 1.3 + row * 1.05, d / 2 + 0.01);
      g.add(win);
      // Frame.
      box(g, materials.concrete, [winW + 0.06, 0.04, 0.03], [-w / 4 + col * (w / 2), 1.3 + row * 1.05 + winH / 2, d / 2 + 0.02], { cast: false });
      box(g, materials.concrete, [winW + 0.06, 0.04, 0.03], [-w / 4 + col * (w / 2), 1.3 + row * 1.05 - winH / 2, d / 2 + 0.02], { cast: false });
    }
  }

  // West face (facing the alley) gets a fire escape ladder and a small window.
  // The alley is the darkest corner of the diorama, so a bare service bulb above
  // the back door keeps the neighbouring wall from reading as a black slab.
  box(g, materials.metalDark, [0.1, 0.1, 0.1], [-w / 2 - 0.08, 2.62, d * 0.12], { cast: false });
  const bulbShade = new THREE.Mesh(
    new THREE.ConeGeometry(0.13, 0.12, 10),
    materials.metalDark,
  );
  bulbShade.position.set(-w / 2 - 0.12, 2.72, d * 0.12);
  g.add(bulbShade);
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.062, 10, 8),
    glow('alleyBulb', { color: 0xffe0a4, transparent: false }),
  );
  bulb.position.set(-w / 2 - 0.12, 2.62, d * 0.12);
  g.add(bulb);
  // Additive halo so the bulb reads as a light source rather than a pale dot.
  const bulbHalo = new THREE.Mesh(
    new THREE.PlaneGeometry(0.66, 0.66),
    glow('alleyBulbHalo', {
      color: 0xffd79a,
      map: canvasTexture(128, 128, (ctx, w2, h2) => {
        const grad = ctx.createRadialGradient(w2 / 2, h2 / 2, 1, w2 / 2, h2 / 2, w2 * 0.5);
        grad.addColorStop(0, 'rgba(255,222,168,0.62)');
        grad.addColorStop(0.4, 'rgba(255,206,140,0.2)');
        grad.addColorStop(1, 'rgba(255,190,120,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w2, h2);
      }),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  bulbHalo.position.set(-w / 2 - 0.2, 2.62, d * 0.12);
  bulbHalo.rotation.y = Math.PI / 2;
  bulbHalo.renderOrder = 1;
  g.add(bulbHalo);

  box(g, materials.metalDark, [0.06, 2.2, 0.06], [-w / 2 - 0.06, 1.4, -d / 4], { cast: false });
  box(g, materials.metalDark, [0.06, 2.2, 0.06], [-w / 2 - 0.06, 1.4, -d / 4 + 0.5], { cast: false });
  for (let i = 0; i < 7; i += 1) {
    box(g, materials.metalDark, [0.06, 0.03, 0.56], [-w / 2 - 0.06, 0.4 + i * 0.32, -d / 4 + 0.25], { cast: false });
  }

  // Rooftop water tank and antenna.
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.62, 12), materials.plasticGrey);
  tank.position.set(w * 0.15, h + 0.42, -d * 0.1);
  g.add(tank);
  box(g, materials.metalDark, [0.04, 1.1, 0.04], [-w * 0.3, h + 0.55, -d * 0.3], { cast: false });
  box(g, materials.metalDark, [0.5, 0.03, 0.03], [-w * 0.3, h + 0.95, -d * 0.3], { cast: false });

  // Ground-floor shop shutter, closed for the night.
  const shutterTex = canvasTexture(256, 256, (ctx, w2, h2) => {
    ctx.fillStyle = '#5a5f6c';
    ctx.fillRect(0, 0, w2, h2);
    for (let y = 0; y < h2; y += 8) {
      ctx.fillStyle = y % 16 === 0 ? 'rgba(140,148,164,0.5)' : 'rgba(30,34,44,0.4)';
      ctx.fillRect(0, y, w2, 4);
    }
  });
  const shutter = new THREE.Mesh(
    new THREE.PlaneGeometry(w * 0.7, 1.9),
    toon('shutter', { color: 0xffffff, map: shutterTex }),
  );
  shutter.position.set(0, 0.98, d / 2 + 0.02);
  g.add(shutter);
  // Small noren-style sign above the shutter.
  const shopSign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.2, 0.26),
    glow('neighbourSign', {
      color: 0xffffff,
      map: canvasTexture(384, 84, (ctx, w2, h2) => {
        ctx.fillStyle = '#243040';
        ctx.fillRect(0, 0, w2, h2);
        ctx.fillStyle = '#e8c46a';
        ctx.font = `700 ${Math.round(h2 * 0.5)}px "Hiragino Sans", "Yu Gothic", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('すずき商店', w2 / 2, h2 / 2);
      }),
      transparent: false,
    }),
  );
  shopSign.position.set(0, 2.12, d / 2 + 0.03);
  g.add(shopSign);
}

/** Expanding rain rings on the road, drawn as flat additive discs. */
function buildPuddleRings(root, materials) {
  const ringTex = canvasTexture(128, 128, (ctx, w, h) => {
    const grad = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.5);
    grad.addColorStop(0, 'rgba(200,230,255,0)');
    grad.addColorStop(0.72, 'rgba(200,230,255,0.32)');
    grad.addColorStop(0.9, 'rgba(220,240,255,0.12)');
    grad.addColorStop(1, 'rgba(220,240,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });

  const count = 22;
  const rings = [];
  const random = rng(9182);
  for (let i = 0; i < count; i += 1) {
    const mat = glow(`ripple-${i}`, {
      color: 0xd8ecff,
      map: ringTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(
      AVENUE.xMin + 0.4 + random() * (AVENUE.xMax - AVENUE.xMin - 0.6),
      ROAD_Y + 0.012,
      -4 + random() * 6,
    );
    ring.renderOrder = 2;
    root.add(ring);
    rings.push({
      mesh: ring,
      phase: random(),
      speed: 0.45 + random() * 0.4,
      maxScale: 0.5 + random() * 0.55,
    });
  }

  // Some rings on the side street as well.
  for (let i = 0; i < 8; i += 1) {
    const mat = glow(`ripple-street-${i}`, {
      color: 0xd8ecff,
      map: ringTex,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(
      -2 + random() * 6,
      ROAD_Y + 0.012,
      SIDE_STREET.zMin + 0.3 + random() * (SIDE_STREET.zMax - SIDE_STREET.zMin - 0.6),
    );
    ring.renderOrder = 2;
    root.add(ring);
    rings.push({
      mesh: ring,
      phase: random(),
      speed: 0.45 + random() * 0.4,
      maxScale: 0.45 + random() * 0.5,
    });
  }

  return {
    update(dt, elapsed) {
      for (const r of rings) {
        const t = (elapsed * r.speed + r.phase) % 1;
        const scale = 0.12 + t * r.maxScale;
        r.mesh.scale.setScalar(scale);
        r.mesh.material.opacity = Math.sin(t * Math.PI) * 0.4;
      }
    },
  };
}
