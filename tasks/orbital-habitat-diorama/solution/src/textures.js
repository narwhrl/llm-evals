import * as THREE from 'three';

/* Procedurally generated textures — everything is made locally at runtime,
   so the project has no remote assets and no binary image files to license. */

function canvas(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
function tex(c, repeat) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = 4;
  return t;
}
// deterministic pseudo-random
function mulberry(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

/* ---------- Earth: equirectangular day map (2:1) -------------------------- */
export function earthDayTexture() {
  const W = 1024, H = 512, c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry(7);
  // ocean
  const oc = g.createLinearGradient(0, 0, 0, H);
  oc.addColorStop(0, '#0b2a55'); oc.addColorStop(0.5, '#14408a'); oc.addColorStop(1, '#0b2a55');
  g.fillStyle = oc; g.fillRect(0, 0, W, H);
  // ocean depth variation
  for (let i = 0; i < 5000; i++) {
    g.fillStyle = `rgba(${10 + rnd() * 30},${50 + rnd() * 40},${120 + rnd() * 60},${0.12})`;
    g.fillRect(rnd() * W, rnd() * H, 2 + rnd() * 5, 2 + rnd() * 3);
  }
  // continents — crude but readable landmasses
  const land = (pts, col) => {
    g.fillStyle = col; g.beginPath();
    g.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
    g.closePath(); g.fill();
    // speckle for texture
    for (let i = 0; i < 400; i++) {
      const p = pts[Math.floor(rnd() * pts.length)];
      g.fillStyle = `rgba(${40 + rnd() * 60},${80 + rnd() * 50},${30 + rnd() * 30},${0.35})`;
      g.beginPath(); g.arc(p[0] + (rnd() - 0.5) * 60, p[1] + (rnd() - 0.5) * 40, 1 + rnd() * 5, 0, 7); g.fill();
    }
  };
  // North America
  land([[70,90],[180,70],[260,100],[290,150],[240,200],[190,235],[140,215],[95,180],[60,140]], '#3f7a3a');
  // South America
  land([[230,240],[290,250],[310,300],[285,360],[255,400],[235,360],[220,300]], '#4a8040');
  // Africa
  land([[480,225],[560,225],[600,270],[585,335],[545,380],[505,345],[475,285]], '#a8842f');
  // Eurasia
  land([[470,80],[650,60],[800,75],[880,110],[860,165],[760,185],[660,200],[560,215],[490,190],[450,140]], '#5d8a44');
  // India / SE Asia
  land([[640,210],[700,215],[715,255],[680,275],[655,245]], '#7a8a3a');
  land([[760,200],[820,215],[830,250],[790,270],[755,240]], '#6a9a48');
  // Australia
  land([[760,320],[840,315],[865,345],[840,375],[785,375],[755,350]], '#b0823a');
  // Antarctica strip
  g.fillStyle = '#e8eef2'; g.fillRect(0, H - 42, W, 42);
  g.fillStyle = '#dfe8ee';
  for (let i = 0; i < 300; i++) { g.beginPath(); g.arc(rnd() * W, H - 42 + rnd() * 30, 2 + rnd() * 8, 0, 7); g.fill(); }
  // Arctic cap
  g.fillStyle = '#eef4f7';
  for (let i = 0; i < 200; i++) { g.beginPath(); g.arc(rnd() * W, rnd() * 36, 3 + rnd() * 9, 0, 7); g.fill(); }
  // deserts overlay
  g.fillStyle = 'rgba(180,140,70,0.28)';
  for (let i = 0; i < 160; i++) { g.beginPath(); g.arc(480 + rnd() * 140, 250 + rnd() * 80, 3 + rnd() * 10, 0, 7); g.fill(); }
  return tex(c);
}

/* ---------- Earth: equirectangular night map — same continents, city lights - */
export function earthNightTexture() {
  const W = 1024, H = 512, c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry(7);
  g.fillStyle = '#02050c'; g.fillRect(0, 0, W, H);
  // faint dark ocean
  g.fillStyle = '#060d1c'; g.fillRect(0, 0, W, H);
  // city-light clusters along the same coastlines/population centres
  const clusters = [
    // North America east/west coasts + interior
    [140,150],[170,130],[210,140],[240,160],[200,190],[160,200],[120,170],
    // South America
    [255,270],[275,310],[250,340],
    // Europe
    [470,140],[500,130],[530,140],[555,155],[500,165],[470,170],[540,175],
    // Africa coast + Nile
    [500,240],[540,260],[560,300],[520,340],[500,290],
    // South / East Asia
    [620,230],[660,240],[690,255],[720,210],[760,200],[800,190],[840,180],[780,230],[820,240],[750,150],[820,130],
    // Japan / Korea
    [845,155],[860,165],[830,170],
    // Australia SE
    [815,355],[835,345],
  ];
  for (const [cx, cy] of clusters) {
    const n = 26 + Math.floor(rnd() * 30);
    for (let i = 0; i < n; i++) {
      const x = cx + (rnd() - 0.5) * 44, y = cy + (rnd() - 0.5) * 30;
      const r = 0.6 + rnd() * 2.2;
      const grd = g.createRadialGradient(x, y, 0, x, y, r * 3);
      grd.addColorStop(0, 'rgba(255,200,120,0.9)');
      grd.addColorStop(0.4, 'rgba(255,170,70,0.45)');
      grd.addColorStop(1, 'rgba(255,150,50,0)');
      g.fillStyle = grd; g.beginPath(); g.arc(x, y, r * 3, 0, 7); g.fill();
    }
    // connective "veins" of smaller lights
    for (let i = 0; i < 14; i++) {
      const x = cx + (rnd() - 0.5) * 90, y = cy + (rnd() - 0.5) * 60;
      g.fillStyle = 'rgba(255,190,100,0.5)';
      g.fillRect(x, y, 1.4, 1.4);
    }
  }
  return tex(c);
}

/* ---------- Earth: cloud layer --------------------------------------------- */
export function earthCloudTexture() {
  const W = 1024, H = 512, c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry(13);
  g.clearRect(0, 0, W, H);
  // swirled cloud bands
  for (let i = 0; i < 90; i++) {
    const x = rnd() * W, y = rnd() * H, w = 40 + rnd() * 160, h = 8 + rnd() * 26;
    const grd = g.createRadialGradient(x, y, 0, x, y, w / 2);
    grd.addColorStop(0, 'rgba(255,255,255,0.55)');
    grd.addColorStop(0.6, 'rgba(255,255,255,0.2)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd;
    g.save(); g.translate(x, y); g.rotate((rnd() - 0.5) * 0.8); g.scale(1, h / w); g.beginPath(); g.arc(0, 0, w / 2, 0, 7); g.fill(); g.restore();
  }
  // polar swirls
  for (let i = 0; i < 40; i++) {
    g.fillStyle = 'rgba(255,255,255,0.3)';
    g.beginPath(); g.arc(rnd() * W, rnd() * 50, 6 + rnd() * 20, 0, 7); g.fill();
    g.beginPath(); g.arc(rnd() * W, H - rnd() * 50, 6 + rnd() * 20, 0, 7); g.fill();
  }
  return tex(c);
}

/* ---------- cabin wall: brushed metal panels, rivets, seams, labels -------- */
export function hullWallTexture() {
  const W = 512, H = 512, c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry(21);
  g.fillStyle = '#b9bec4'; g.fillRect(0, 0, W, H);
  // panel grid seams
  g.strokeStyle = 'rgba(90,96,102,0.7)'; g.lineWidth = 2;
  for (let x = 0; x <= W; x += 128) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 0; y <= H; y += 128) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  // per-panel rivets
  g.fillStyle = 'rgba(70,75,82,0.9)';
  for (let px = 0; px < W; px += 128) for (let py = 0; py < H; py += 128) {
    for (let i = 0; i < 8; i++) { g.beginPath(); g.arc(px + 8 + i * 16, py + 8, 2.2, 0, 7); g.fill(); g.beginPath(); g.arc(px + 8 + i * 16, py + 120, 2.2, 0, 7); g.fill(); }
    for (let i = 0; i < 7; i++) { g.beginPath(); g.arc(px + 8, py + 24 + i * 15, 2.2, 0, 7); g.fill(); g.beginPath(); g.arc(px + 120, py + 24 + i * 15, 2.2, 0, 7); g.fill(); }
  }
  // scuffs + wear
  for (let i = 0; i < 380; i++) {
    g.fillStyle = `rgba(${70 + rnd() * 40},${75 + rnd() * 40},${82 + rnd() * 40},${0.12})`;
    g.fillRect(rnd() * W, rnd() * H, 1 + rnd() * 22, 1 + rnd() * 3);
  }
  // a few labels / caution strips
  const labels = [['#c8b400', 'CAUTION'], ['#3a5f9e', 'O₂'], ['#b03030', '04'], ['#3a5f9e', 'AIR']];
  labels.forEach(([col, t], i) => {
    const x = 30 + (i % 2) * 200, y = 60 + Math.floor(i / 2) * 200;
    g.fillStyle = col; g.fillRect(x, y, 84, 30);
    g.fillStyle = '#fff'; g.font = 'bold 17px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(t, x + 42, y + 15);
  });
  return tex(c);
}

/* ---------- floor: anti-slip grating --------------------------------------- */
export function floorTexture() {
  const W = 256, H = 256, c = canvas(W, H), g = c.getContext('2d');
  const rnd = mulberry(31);
  g.fillStyle = '#565b62'; g.fillRect(0, 0, W, H);
  // diamond-plate pattern
  g.fillStyle = '#6a7078';
  for (let y = 0; y < H; y += 24) for (let x = 0; x < W; x += 24) {
    g.save(); g.translate(x + 12, y + 12); g.rotate(Math.PI / 4); g.fillRect(-6, -2, 12, 4); g.restore();
  }
  g.fillStyle = '#4a4f56';
  for (let y = 12; y < H; y += 24) for (let x = 12; x < W; x += 24) {
    g.save(); g.translate(x + 12, y + 12); g.rotate(Math.PI / 4); g.fillRect(-6, -2, 12, 4); g.restore();
  }
  // grime
  for (let i = 0; i < 300; i++) { g.fillStyle = `rgba(20,22,26,${0.1 + rnd() * 0.2})`; g.fillRect(rnd() * W, rnd() * H, 2 + rnd() * 8, 2 + rnd() * 8); }
  return tex(c, [4, 4]);
}

/* ---------- laptop screen: orbital telemetry ------------------------------- */
export function laptopScreenTexture() {
  const W = 256, H = 160, c = canvas(W, H), g = c.getContext('2d');
  g.fillStyle = '#06121c'; g.fillRect(0, 0, W, H);
  g.strokeStyle = 'rgba(40,80,110,0.5)'; g.lineWidth = 1;
  for (let x = 0; x < W; x += 24) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, H); g.stroke(); }
  for (let y = 0; y < H; y += 24) { g.beginPath(); g.moveTo(0, y); g.lineTo(W, y); g.stroke(); }
  // telemetry curve
  g.strokeStyle = '#38e0c8'; g.lineWidth = 2; g.beginPath();
  for (let x = 0; x <= W; x += 4) { const y = 90 + Math.sin(x * 0.05) * 26 - x * 0.06; x ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke();
  g.strokeStyle = '#4aa8ff'; g.lineWidth = 1.5; g.beginPath();
  for (let x = 0; x <= W; x += 4) { const y = 70 + Math.cos(x * 0.04) * 18; x ? g.lineTo(x, y) : g.moveTo(x, y); }
  g.stroke();
  // data readouts
  g.fillStyle = '#7fe8ff'; g.font = 'bold 11px monospace'; g.textAlign = 'left';
  g.fillText('ALT  408.2 km', 10, 18);
  g.fillText('INC   51.6°', 10, 34);
  g.fillText('VEL  7.66 km/s', 10, 50);
  g.fillStyle = '#ffd27f'; g.font = '10px monospace';
  g.fillText('ORBIT 2847', 170, 18);
  g.fillStyle = '#38e0c8'; g.fillRect(170, 28, 70, 8);
  g.fillStyle = '#0a2432'; g.fillRect(172, 30, 66, 4);
  const t = tex(c); return { tex: t, canvas: c };
}

/* ---------- note / photo cards --------------------------------------------- */
export function noteTexture(text, bg = '#f4ecd8', fg = '#3a3a3a') {
  const c = canvas(128, 96), g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, 128, 96);
  g.strokeStyle = 'rgba(0,0,0,0.15)'; g.strokeRect(2, 2, 124, 92);
  g.fillStyle = fg; g.font = 'italic 13px cursive, serif'; g.textAlign = 'center';
  const lines = text.split('\n'); lines.forEach((l, i) => g.fillText(l, 64, 34 + i * 20));
  return tex(c);
}
export function photoTexture(hue) {
  const c = canvas(96, 96), g = c.getContext('2d');
  const rnd = mulberry(hue * 91);
  const grd = g.createLinearGradient(0, 0, 0, 96);
  grd.addColorStop(0, `hsl(${hue},60%,${55 + rnd() * 20}%)`); grd.addColorStop(1, `hsl(${hue + 30},50%,${25 + rnd() * 15}%)`);
  g.fillStyle = grd; g.fillRect(0, 0, 96, 96);
  // little figures / horizon
  g.fillStyle = 'rgba(255,255,255,0.8)';
  g.beginPath(); g.arc(20 + rnd() * 30, 30 + rnd() * 20, 8, 0, 7); g.fill();
  g.fillStyle = 'rgba(30,40,60,0.7)';
  g.fillRect(0, 66 + rnd() * 10, 96, 96);
  g.fillStyle = 'rgba(255,255,255,0.5)'; g.fillRect(4, 4, 88, 88);
  const t = tex(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

/* ---------- fabric: sleeping bag weave ------------------------------------- */
export function fabricTexture(base = '#5a7a8c') {
  const c = canvas(128, 128), g = c.getContext('2d');
  const rnd = mulberry(41);
  g.fillStyle = base; g.fillRect(0, 0, 128, 128);
  g.strokeStyle = 'rgba(255,255,255,0.10)';
  for (let i = 0; i < 128; i += 4) { g.beginPath(); g.moveTo(i, 0); g.lineTo(i, 128); g.stroke(); g.beginPath(); g.moveTo(0, i); g.lineTo(128, i); g.stroke(); }
  for (let i = 0; i < 400; i++) { g.fillStyle = `rgba(0,0,0,${rnd() * 0.12})`; g.fillRect(rnd() * 128, rnd() * 128, 2, 2); }
  return tex(c, [2, 2]);
}

/* ---------- generic small labels -------------------------------------------- */
export function labelTexture(text, bg = '#c8b400', fg = '#1a1a1a', w = 128, h = 40) {
  const c = canvas(w, h), g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, w, h);
  g.fillStyle = fg; g.font = `bold ${Math.floor(h * 0.5)}px monospace`; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText(text, w / 2, h / 2);
  return tex(c);
}
