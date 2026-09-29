import { canvasTexture, dataCanvasTexture, text, rng, JP_FONT } from '../core/canvas.js';
import { HALF, BASE, ROAD, SIDE_ROAD, STORE, MAIN_CROSS, SIDE_CROSS, BLOCK_WALL_Z } from './layout.js';

const RES = 2048;
const S = RES / BASE;
const X = (x) => (x + HALF) * S;
const Z = (z) => (z + HALF) * S;

function rect(g, x0, z0, x1, z1) {
  g.fillRect(X(x0), Z(z0), (x1 - x0) * S, (z1 - z0) * S);
}

function speckle(g, x0, z0, x1, z1, count, colors, seed) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    g.fillStyle = colors[(r() * colors.length) | 0];
    const s = 1 + r() * 2.5;
    g.fillRect(X(x0 + r() * (x1 - x0)), Z(z0 + r() * (z1 - z0)), s, s);
  }
}

function manhole(g, x, z) {
  const cx = X(x);
  const cy = Z(z);
  const r = 0.34 * S;
  g.fillStyle = '#3b4152';
  g.beginPath();
  g.arc(cx, cy, r, 0, Math.PI * 2);
  g.fill();
  g.strokeStyle = '#555c6e';
  g.lineWidth = 3;
  for (let k = 0.3; k < 1; k += 0.22) {
    g.beginPath();
    g.arc(cx, cy, r * k, 0, Math.PI * 2);
    g.stroke();
  }
  g.beginPath();
  g.moveTo(cx - r, cy);
  g.lineTo(cx + r, cy);
  g.moveTo(cx, cy - r);
  g.lineTo(cx, cy + r);
  g.stroke();
}

/** Painted ground: asphalt roads, lot, forecourt, parking lines, crosswalks, road text. */
export function makeGroundTexture() {
  return canvasTexture(RES, RES, (g) => {
    g.fillStyle = '#343a4c';
    g.fillRect(0, 0, RES, RES);
    speckle(g, -HALF, -HALF, HALF, HALF, 26000, ['#2b3040', '#3d4458', '#454c60', '#30364a'], 7);

    // Store forecourt (poured concrete) and alley slab.
    g.fillStyle = '#50586a';
    rect(g, STORE.x0 - 0.2, STORE.z1, 3.4, ROAD.z0 - 1.0);
    rect(g, STORE.x1, -HALF, 3.4, STORE.z1);
    g.fillStyle = '#464d5e';
    rect(g, -HALF, -HALF, 3.4, BLOCK_WALL_Z);
    speckle(g, -HALF, -HALF, 3.4, 2.6, 5000, ['#5a6274', '#434a5a'], 11);
    g.strokeStyle = 'rgba(30,34,46,0.8)';
    g.lineWidth = 2;
    for (let x = STORE.x0; x < 3.4; x += 1.5) {
      g.beginPath();
      g.moveTo(X(x), Z(STORE.z1));
      g.lineTo(X(x), Z(2.6));
      g.stroke();
    }

    // Parking bays.
    g.strokeStyle = '#e9ecf2';
    g.lineWidth = 0.1 * S;
    for (const x of [-8.7, -6.5, -4.3]) {
      g.beginPath();
      g.moveTo(X(x), Z(BLOCK_WALL_Z + 0.25));
      g.lineTo(X(x), Z(-0.4));
      g.stroke();
    }
    g.fillStyle = '#e9ecf2';
    rect(g, -8.2, -2.0, -7.0, -1.9);
    rect(g, -6.0, -2.0, -4.8, -1.9);

    // Main road markings.
    g.fillStyle = '#e8ebf0';
    rect(g, -HALF, ROAD.z0 + 0.18, MAIN_CROSS.x0 - 0.6, ROAD.z0 + 0.28);
    rect(g, MAIN_CROSS.x1 + 0.6, ROAD.z0 + 0.18, SIDE_ROAD.x0 - 0.2, ROAD.z0 + 0.28);
    rect(g, -HALF, ROAD.z1 - 0.28, HALF, ROAD.z1 - 0.18);
    const mid = (ROAD.z0 + ROAD.z1) / 2;
    for (let x = -HALF + 0.3; x < HALF; x += 2.0) {
      if (x + 1.2 > MAIN_CROSS.x0 - 0.8 && x < MAIN_CROSS.x1 + 0.8) continue;
      rect(g, x, mid - 0.06, x + 1.2, mid + 0.06);
    }
    for (let z = ROAD.z0 + 0.45; z < ROAD.z1 - 0.3; z += 0.9) rect(g, MAIN_CROSS.x0, z, MAIN_CROSS.x1, z + 0.45);
    // Diamond "crossing ahead" marks.
    g.strokeStyle = '#e8ebf0';
    g.lineWidth = 0.08 * S;
    for (const [x, z] of [
      [-3.6, mid + 1.0],
      [7.4, mid - 1.0],
    ]) {
      g.beginPath();
      g.moveTo(X(x - 0.9), Z(z));
      g.lineTo(X(x), Z(z - 0.35));
      g.lineTo(X(x + 0.9), Z(z));
      g.lineTo(X(x), Z(z + 0.35));
      g.closePath();
      g.stroke();
    }

    // Side road: crosswalk, stop line, dashed centre line and 止まれ.
    const smid = (SIDE_ROAD.x0 + SIDE_ROAD.x1) / 2;
    for (let x = SIDE_ROAD.x0 + 0.35; x < SIDE_ROAD.x1 - 0.3; x += 0.9) rect(g, x, SIDE_CROSS.z0, x + 0.45, SIDE_CROSS.z1);
    rect(g, smid + 0.1, SIDE_CROSS.z0 - 0.75, SIDE_ROAD.x1 - 0.15, SIDE_CROSS.z0 - 0.45);
    for (let z = -HALF + 0.3; z < SIDE_CROSS.z0 - 1.2; z += 1.8) rect(g, smid - 0.06, z, smid + 0.06, z + 1.0);
    g.save();
    g.translate(X(smid + 0.95), Z(SIDE_CROSS.z0 - 2.3));
    g.rotate(Math.PI);
    g.scale(1, 2.6);
    text(g, '止まれ', 0, 0, 0.62 * S, '#e8ebf0', { weight: 900, font: JP_FONT });
    g.restore();

    manhole(g, -0.6, 5.3);
    manhole(g, smid - 0.9, -3.6);

    // Tyre-polished wheel tracks.
    g.fillStyle = 'rgba(20,24,34,0.35)';
    rect(g, -HALF, ROAD.z0 + 0.7, HALF, ROAD.z0 + 1.2);
    rect(g, -HALF, ROAD.z1 - 1.2, HALF, ROAD.z1 - 0.7);
  });
}

// R: reflectivity, G: standing water.
const PUDDLES = [
  [-0.6, 2.05, 1.7, 0.42],
  [-5.4, -1.2, 1.5, 0.8],
  [-7.6, 1.7, 0.9, 0.5],
  [0.8, 3.86, 2.6, 0.24],
  [-5.0, 7.34, 2.4, 0.24],
  [6.3, 2.1, 0.9, 0.55],
  [6.8, 5.3, 1.5, 0.7],
  [-7.2, 5.6, 1.1, 0.42],
  [0.4, -4.9, 1.3, 0.35],
  [4.7, -2.0, 0.28, 1.6],
  [7.7, -5.4, 0.3, 1.8],
  [2.8, 6.4, 1.0, 0.4],
];

export function makeWetTexture() {
  return dataCanvasTexture(512, 512, (g, w) => {
    const s = w / BASE;
    g.fillStyle = 'rgb(120,0,0)';
    g.fillRect(0, 0, w, w);
    g.fillStyle = 'rgb(80,0,0)';
    g.fillRect(0, 0, (3.4 + HALF) * s, (BLOCK_WALL_Z + HALF) * s);
    g.globalCompositeOperation = 'lighter';
    g.fillStyle = 'rgb(70,0,0)';
    for (let z = ROAD.z0 + 0.45; z < ROAD.z1 - 0.3; z += 0.9) {
      g.fillRect((MAIN_CROSS.x0 + HALF) * s, (z + HALF) * s, (MAIN_CROSS.x1 - MAIN_CROSS.x0) * s, 0.45 * s);
    }
    for (let x = SIDE_ROAD.x0 + 0.35; x < SIDE_ROAD.x1 - 0.3; x += 0.9) {
      g.fillRect((x + HALF) * s, (SIDE_CROSS.z0 + HALF) * s, 0.45 * s, (SIDE_CROSS.z1 - SIDE_CROSS.z0) * s);
    }
    for (const [x, z, rx, rz] of PUDDLES) {
      g.save();
      g.translate((x + HALF) * s, (z + HALF) * s);
      g.scale(rx * s, rz * s);
      const grad = g.createRadialGradient(0, 0, 0, 0, 0, 1);
      grad.addColorStop(0, 'rgba(90,255,0,1)');
      grad.addColorStop(0.62, 'rgba(90,235,0,1)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grad;
      g.beginPath();
      g.arc(0, 0, 1, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  });
}

/** 1 m² of interlocking sidewalk pavers. */
export function makePavingTexture() {
  return canvasTexture(
    256,
    256,
    (g) => {
      g.fillStyle = '#6f778b';
      g.fillRect(0, 0, 256, 256);
      const r = rng(3);
      for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 2; x++) {
          const off = y % 2 ? 64 : 0;
          const shade = 100 + ((r() * 18) | 0);
          g.fillStyle = `rgb(${shade},${shade + 8},${shade + 26})`;
          g.fillRect(((x * 128 + off) % 256) + 3, y * 64 + 3, 122, 58);
          if (off) g.fillRect(-64 + 3, y * 64 + 3, 122, 58);
        }
      }
    },
    { repeat: [1, 1] },
  );
}

export function makeGrateTexture() {
  return canvasTexture(128, 32, (g) => {
    g.fillStyle = '#242833';
    g.fillRect(0, 0, 128, 32);
    g.fillStyle = '#0b0d13';
    for (let x = 6; x < 124; x += 9) g.fillRect(x, 5, 5, 22);
  });
}
