import { fbm } from '../core/noise.js';
import { rand, range } from '../core/rng.js';
import { makeCanvas, toTexture, paintPixels, cracks, stains, streaksDown, speckle, scratches } from '../core/canvas.js';

// Tileable world-projected surfaces. Scale in materials.js maps one tile to N metres.

function grey(base, spread, seed, period = 6, fine = 0.08) {
  return (u, v, o) => {
    const n = fbm(u, v, period, 5, seed);
    const g = fbm(u, v, 64, 1, seed + 5);
    const l = base + (n - 0.5) * spread + (g - 0.5) * 255 * fine;
    o[0] = l;
    o[1] = l * 1.01;
    o[2] = l * 1.05;
  };
}

export function concreteWall() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, grey(150, 60, 11));
  // formwork seams and tie holes: tile = 4 m, panels 2 m x 1 m
  x.fillStyle = 'rgba(40,44,50,0.35)';
  for (let i = 0; i < 4; i++) x.fillRect(0, (i * s) / 4, s, 1.5);
  for (let i = 0; i < 2; i++) x.fillRect((i * s) / 2, 0, 1.5, s);
  x.fillStyle = 'rgba(30,32,36,0.55)';
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    x.beginPath();
    x.arc(j * 64 + 16, i * 64 + 32, 2, 0, 7);
    x.arc(j * 64 + 48, i * 64 + 32, 2, 0, 7);
    x.fill();
  }
  streaksDown(x, s, 26, '38,40,44', 0.3, 110);
  stains(x, s, 10, '60,66,58', 0.25, 10, 40);
  cracks(x, s, 5, 'rgba(35,36,40,0.55)');
  return toTexture(c);
}

export function concreteFloor() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, grey(140, 55, 23, 5, 0.12));
  x.fillStyle = 'rgba(40,42,48,0.45)';
  x.fillRect(0, 0, s, 2);
  x.fillRect(0, 0, 2, s);
  stains(x, s, 14, '28,30,34', 0.3, 8, 36);
  speckle(x, s, 900, '30,30,34', 0.5);
  cracks(x, s, 6, 'rgba(30,31,35,0.6)');
  return toTexture(c);
}

export function asphalt() {
  const s = 512;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const n = fbm(u, v, 4, 5, 31);
    const g = fbm(u, v, 128, 1, 37);
    const l = 62 + (n - 0.5) * 40 + (g - 0.5) * 34;
    o[0] = l;
    o[1] = l * 1.02;
    o[2] = l * 1.08;
  });
  speckle(x, s, 5000, '150,150,156', 0.35, 1.4);
  speckle(x, s, 3000, '10,10,12', 0.5, 1.6);
  stains(x, s, 10, '12,12,16', 0.45, 20, 70);
  // patched repairs
  for (let i = 0; i < 4; i++) {
    x.fillStyle = `rgba(${rand() < 0.5 ? '38,39,44' : '82,82,86'},0.5)`;
    x.fillRect(rand() * s, rand() * s, range(30, 90), range(20, 60));
  }
  cracks(x, s, 14, 'rgba(14,14,18,0.8)', 1.4);
  return toTexture(c);
}

export function brick() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  x.fillStyle = '#4a4442';
  x.fillRect(0, 0, s, s);
  const rows = 16;
  const bh = s / rows;
  const bw = s / 8;
  for (let r = 0; r < rows; r++) {
    for (let k = -1; k < 9; k++) {
      const off = r % 2 ? bw / 2 : 0;
      const l = range(0.75, 1.1);
      x.fillStyle = `rgb(${120 * l | 0},${62 * l | 0},${50 * l | 0})`;
      x.fillRect(k * bw + off + 1, r * bh + 1, bw - 2, bh - 2);
    }
  }
  streaksDown(x, s, 20, '20,20,24', 0.35, 120);
  stains(x, s, 8, '60,70,60', 0.3, 10, 30);
  speckle(x, s, 1200, '20,18,18', 0.4);
  return toTexture(c);
}

export function rustMetal() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const n = fbm(u, v, 4, 5, 41);
    const r = fbm(u, v, 8, 4, 43);
    const rust = Math.min(1, Math.max(0, (r - 0.5) * 4));
    const l = 110 + (n - 0.5) * 50;
    o[0] = l * (1 - rust) + 132 * rust;
    o[1] = l * (1 - rust) + 66 * rust;
    o[2] = l * 1.04 * (1 - rust) + 36 * rust;
  });
  scratches(x, s, 60, '200,200,205', 0.35);
  streaksDown(x, s, 18, '110,52,26', 0.4, 90);
  return toTexture(c);
}

export function corrugated() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  // 16 ridges per tile along U, ridges run along V (vertical on walls)
  paintPixels(x, s, s, (u, v, o) => {
    const ridge = 0.5 + 0.5 * Math.sin(u * Math.PI * 2 * 16);
    const n = fbm(u, v, 4, 4, 51);
    const r = fbm(u, v, 6, 4, 53);
    const rust = Math.min(1, Math.max(0, (r - 0.56) * 3.2));
    const l = 150 + ridge * 70 + (n - 0.5) * 50;
    o[0] = l * (1 - rust) + 150 * rust;
    o[1] = l * (1 - rust) + 80 * rust;
    o[2] = l * (1 - rust) + 44 * rust;
  });
  streaksDown(x, s, 30, '120,60,30', 0.45, 140, true);
  scratches(x, s, 30, '240,240,240', 0.3);
  return toTexture(c);
}

export function woodPlanks() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const plank = Math.floor(v * 8);
    const grain = fbm(u * 0.25, v * 4, 8, 4, 61 + plank);
    const l = 0.75 + (grain - 0.5) * 0.5 + ((plank * 37) % 7) * 0.02;
    o[0] = 128 * l;
    o[1] = 92 * l;
    o[2] = 60 * l;
  });
  x.fillStyle = 'rgba(30,20,12,0.7)';
  for (let i = 0; i < 8; i++) x.fillRect(0, (i * s) / 8, s, 1.5);
  speckle(x, s, 300, '30,22,14', 0.6);
  return toTexture(c);
}

export function burlap() {
  const s = 128;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, (u, v, o) => {
    const w = 0.5 + 0.25 * Math.sin(u * Math.PI * 2 * 40) + 0.25 * Math.sin(v * Math.PI * 2 * 40);
    const n = fbm(u, v, 4, 3, 71);
    const l = 0.7 + w * 0.2 + (n - 0.5) * 0.3;
    o[0] = 150 * l;
    o[1] = 128 * l;
    o[2] = 90 * l;
  });
  return toTexture(c);
}

export function paintedMetal() {
  const s = 256;
  const c = makeCanvas(s);
  const x = c.getContext('2d');
  paintPixels(x, s, s, grey(215, 26, 81, 4, 0.04));
  scratches(x, s, 90, '90,90,96', 0.5);
  stains(x, s, 10, '70,60,50', 0.25, 8, 30);
  streaksDown(x, s, 14, '60,50,40', 0.3, 60);
  return toTexture(c);
}
