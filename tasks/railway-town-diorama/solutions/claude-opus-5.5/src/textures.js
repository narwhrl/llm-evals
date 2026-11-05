// Procedural canvas textures: nothing is downloaded at runtime.
import * as THREE from 'three';
import { BOARD, ROADS, PAVED, PATHS, FIELDS, RIVER, TRACK_PTS, mulberry32 } from './layout.js';

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')];
}

function toTexture(canvas, { srgb = true, repeat = false } = {}) {
  const t = new THREE.CanvasTexture(canvas);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// Tileable value noise, grayscale. Used for paper, flock and water ripples.
export function noiseTexture(size = 256, seed = 1, octaves = [[8, 0.5], [32, 0.3], [128, 0.2]]) {
  const rng = mulberry32(seed);
  const [c, g] = makeCanvas(size, size);
  const img = g.createImageData(size, size);
  const field = new Float32Array(size * size);
  for (const [cells, amp] of octaves) {
    const lattice = Array.from({ length: cells * cells }, rng);
    const at = (i, j) => lattice[((j + cells) % cells) * cells + ((i + cells) % cells)];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const fx = (x / size) * cells;
        const fy = (y / size) * cells;
        const i = Math.floor(fx);
        const j = Math.floor(fy);
        const u = fx - i;
        const v = fy - j;
        const su = u * u * (3 - 2 * u);
        const sv = v * v * (3 - 2 * v);
        const a = at(i, j) + (at(i + 1, j) - at(i, j)) * su;
        const b = at(i, j + 1) + (at(i + 1, j + 1) - at(i, j + 1)) * su;
        field[y * size + x] += (a + (b - a) * sv) * amp;
      }
    }
  }
  for (let i = 0; i < field.length; i++) {
    const v = Math.max(0, Math.min(255, field[i] * 255));
    img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
    img.data[i * 4 + 3] = 255;
  }
  g.putImageData(img, 0, 0);
  return toTexture(c, { srgb: false, repeat: true });
}

// Normal map derived from a height field of soft ripples, for the water surface.
export function rippleNormalTexture(size = 256) {
  const noise = noiseTexture(size, 9, [[6, 0.5], [12, 0.35], [24, 0.15]]);
  const src = noise.image.getContext('2d').getImageData(0, 0, size, size).data;
  const [c, g] = makeCanvas(size, size);
  const img = g.createImageData(size, size);
  const h = (x, y) => src[(((y + size) % size) * size + ((x + size) % size)) * 4] / 255;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = (h(x + 1, y) - h(x - 1, y)) * 3;
      const dy = (h(x, y + 1) - h(x, y - 1)) * 3;
      const len = Math.hypot(dx, dy, 1);
      const i = (y * size + x) * 4;
      img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return toTexture(c, { srgb: false, repeat: true });
}

// Light grayscale wood grain, tinted by vertex colour or material colour.
export function grainTexture(w = 512, h = 512, seed = 3, contrast = 1) {
  const rng = mulberry32(seed);
  const [c, g] = makeCanvas(w, h);
  g.fillStyle = '#e6e6e6';
  g.fillRect(0, 0, w, h);
  for (let i = 0; i < 260; i++) {
    const y0 = rng() * h;
    const amp = 2 + rng() * 6;
    const freq = 0.004 + rng() * 0.01;
    const phase = rng() * 10;
    g.strokeStyle = `rgba(${rng() < 0.5 ? '90,70,50' : '255,250,240'},${(0.06 + rng() * 0.16) * contrast})`;
    g.lineWidth = 0.6 + rng() * 2.4;
    g.beginPath();
    for (let x = -4; x <= w + 4; x += 8) {
      const y = y0 + Math.sin(x * freq + phase) * amp + Math.sin(x * freq * 3.1 + phase) * amp * 0.3;
      if (x < 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.stroke();
  }
  return toTexture(c, { repeat: true });
}

// Rows of clay tiles; v runs down the roof slope.
export function roofTexture() {
  const s = 256;
  const rng = mulberry32(5);
  const [c, g] = makeCanvas(s, s);
  g.fillStyle = '#f2f2f2';
  g.fillRect(0, 0, s, s);
  const rows = 8;
  const rh = s / rows;
  for (let r = 0; r < rows; r++) {
    const y = r * rh;
    const cols = 10;
    const cw = s / cols;
    for (let k = 0; k < cols; k++) {
      const x = k * cw + (r % 2 ? cw / 2 : 0);
      const v = 205 + rng() * 50;
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.fillRect(x + 1, y + 1, cw - 2, rh - 3);
      g.fillRect(x + 1 - s, y + 1, cw - 2, rh - 3);
    }
    const grd = g.createLinearGradient(0, y + rh - 7, 0, y + rh);
    grd.addColorStop(0, 'rgba(0,0,0,0)');
    grd.addColorStop(1, 'rgba(40,30,25,0.55)');
    g.fillStyle = grd;
    g.fillRect(0, y + rh - 7, s, 7);
  }
  return toTexture(c, { repeat: true });
}

// Ashlar courses for bridges, abutments and plinths.
export function stoneTexture() {
  const s = 256;
  const rng = mulberry32(11);
  const [c, g] = makeCanvas(s, s);
  g.fillStyle = '#8a8580';
  g.fillRect(0, 0, s, s);
  const rows = 6;
  const rh = s / rows;
  for (let r = 0; r < rows; r++) {
    let x = r % 2 ? -rng() * 40 : 0;
    while (x < s) {
      const bw = 34 + rng() * 40;
      const v = 190 + rng() * 55;
      g.fillStyle = `rgb(${v},${v - 4},${v - 8})`;
      g.fillRect(x + 2, r * rh + 2, bw - 4, rh - 4);
      if (x + bw > s) g.fillRect(x + 2 - s, r * rh + 2, bw - 4, rh - 4);
      x += bw;
    }
  }
  return toTexture(c, { repeat: true });
}

// Ballast: speckled stone chips.
export function gravelTexture() {
  const s = 256;
  const rng = mulberry32(21);
  const [c, g] = makeCanvas(s, s);
  g.fillStyle = '#7b7368';
  g.fillRect(0, 0, s, s);
  for (let i = 0; i < 5200; i++) {
    const v = 70 + rng() * 120;
    g.fillStyle = `rgb(${v + 12},${v + 6},${v})`;
    const r = 0.8 + rng() * 2.2;
    g.beginPath();
    g.arc(rng() * s, rng() * s, r, 0, Math.PI * 2);
    g.fill();
  }
  return toTexture(c, { repeat: true });
}

// Radial falloff for lamp light pools and halos.
export function glowTexture() {
  const s = 128;
  const [c, g] = makeCanvas(s, s);
  const grd = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.35, 'rgba(255,255,255,0.45)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, s, s);
  return toTexture(c);
}

export function signTexture(text, { w = 512, h = 128, bg = '#f4efe2', fg = '#2b3a4a', border = '#2b3a4a', font = 'bold 76px' } = {}) {
  const [c, g] = makeCanvas(w, h);
  g.fillStyle = bg;
  g.fillRect(0, 0, w, h);
  g.strokeStyle = border;
  g.lineWidth = 10;
  g.strokeRect(5, 5, w - 10, h - 10);
  g.fillStyle = fg;
  g.font = `${font} "Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", sans-serif`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2 + 4);
  return toTexture(c);
}

export function stripeTexture(a = '#d8322b', b = '#f3efe6', n = 6) {
  const [c, g] = makeCanvas(256, 16);
  for (let i = 0; i < n; i++) {
    g.fillStyle = i % 2 ? b : a;
    g.fillRect((i * 256) / n, 0, 256 / n + 1, 16);
  }
  return toTexture(c);
}

// The painted board surface: grass, fields, roads, plaza paving and river banks.
export function groundTexture(width = 3072) {
  const [hx, hz] = BOARD.inner;
  const k = width / (hx * 2);
  const height = Math.round(hz * 2 * k);
  const [c, g] = makeCanvas(width, height);
  const rng = mulberry32(17);
  const P = (x, z) => [(x + hx) * k, (z + hz) * k];
  const line = (pts, w, style, dash) => {
    g.beginPath();
    pts.forEach(([x, z], i) => (i ? g.lineTo(...P(x, z)) : g.moveTo(...P(x, z))));
    g.lineWidth = w * k;
    g.strokeStyle = style;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.setLineDash(dash ? dash.map((d) => d * k) : []);
    g.stroke();
    g.setLineDash([]);
  };

  g.fillStyle = '#7d9a4e';
  g.fillRect(0, 0, width, height);
  const greens = ['#6c8b40', '#8ba957', '#73903f', '#9aa75a', '#5f7d39', '#86a04f'];
  for (let i = 0; i < 700; i++) {
    const [x, y] = [rng() * width, rng() * height];
    const r = (0.4 + rng() * 2.2) * k;
    const grd = g.createRadialGradient(x, y, 0, x, y, r);
    const col = greens[Math.floor(rng() * greens.length)];
    grd.addColorStop(0, col + '66');
    grd.addColorStop(1, col + '00');
    g.fillStyle = grd;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const specks = ['#55702f', '#97b35f', '#6f8a3c', '#a3a35a', '#7b6a43', '#b7c27a'];
  for (let i = 0; i < 90000; i++) {
    g.fillStyle = specks[Math.floor(rng() * specks.length)];
    g.globalAlpha = 0.25 + rng() * 0.35;
    const s = 1 + rng() * 2.5;
    g.fillRect(rng() * width, rng() * height, s, s);
  }
  g.globalAlpha = 1;

  const crops = [
    ['#7a5a3b', '#5f442b'],
    ['#6f8f3c', '#4f6f2a'],
    ['#c9a85a', '#a98a44'],
  ];
  for (const f of FIELDS) {
    g.save();
    g.translate(...P(f.x, f.z));
    g.rotate(-f.rot);
    const [base, row] = crops[f.crop];
    g.fillStyle = base;
    g.fillRect((-f.w / 2) * k, (-f.d / 2) * k, f.w * k, f.d * k);
    g.fillStyle = row;
    for (let x = -f.w / 2 + 0.08; x < f.w / 2; x += 0.22) g.fillRect(x * k, (-f.d / 2) * k, 0.08 * k, f.d * k);
    g.strokeStyle = 'rgba(70,55,35,0.6)';
    g.lineWidth = 0.06 * k;
    g.strokeRect((-f.w / 2) * k, (-f.d / 2) * k, f.w * k, f.d * k);
    g.restore();
  }

  for (const p of PATHS) line(p, 0.36, '#b49a72');

  // Ballast shoulder spill so the bed blends into the grass.
  line([...TRACK_PTS, TRACK_PTS[0], TRACK_PTS[1]], 1.75, 'rgba(98,88,70,0.7)');

  for (const road of ROADS) {
    if (road.id === 'front') {
      line(road.pts, road.width + 0.12, '#8d7a5c');
      line(road.pts, road.width - 0.1, '#a8946f');
      continue;
    }
    line(road.pts, road.width + 0.36, '#b7ae9c');
  }
  for (const p of PAVED) {
    const [x0, y0] = P(p.x0 - 0.12, p.z0 - 0.12);
    const [x1, y1] = P(p.x1 + 0.12, p.z1 + 0.12);
    g.fillStyle = '#b7ae9c';
    g.fillRect(x0, y0, x1 - x0, y1 - y0);
  }
  for (const road of ROADS) if (road.id !== 'front') line(road.pts, road.width, '#5e5c5a');
  for (const p of PAVED) {
    const [x0, y0] = P(p.x0, p.z0);
    const [x1, y1] = P(p.x1, p.z1);
    g.fillStyle = '#c9b996';
    g.fillRect(x0, y0, x1 - x0, y1 - y0);
    g.strokeStyle = 'rgba(120,105,80,0.45)';
    g.lineWidth = 1.2;
    for (let x = x0; x <= x1; x += 0.22 * k) g.strokeRect(x, y0, 0, y1 - y0);
    for (let y = y0; y <= y1; y += 0.22 * k) g.strokeRect(x0, y, x1 - x0, 0);
  }
  for (const id of ['avenue', 'river']) {
    line(ROADS.find((r) => r.id === id).pts, 0.04, 'rgba(235,228,205,0.85)', [0.28, 0.24]);
  }

  // River banks follow the same distance bands as the carved terrain.
  line(RIVER.points, RIVER.bank * 2 + 0.15, '#8f7d58');
  line(RIVER.points, RIVER.bank * 2 - 0.25, '#a8926a');
  line(RIVER.points, 2.55, '#6f6448');
  line(RIVER.points, 1.7, '#3d4a43');

  return toTexture(c);
}
