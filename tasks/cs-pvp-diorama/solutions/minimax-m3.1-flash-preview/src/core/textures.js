import * as THREE from 'three';

/**
 * Every surface in the diorama is painted at load time on a 2D canvas, so the
 * build ships with no binary assets and nothing can 404 at runtime. Textures
 * are cached by key because the same material is reused across dozens of props.
 */

const cache = new Map();

/** Deterministic PRNG so the scene looks identical on every load. */
function makeRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createCanvas(size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function toTexture(canvas, { repeat = true, aniso = 8 } = {}) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.wrapT = repeat ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = aniso;
  texture.needsUpdate = true;
  return texture;
}

/** Soft blotches are the backbone of every weathered surface here. */
function blotches(ctx, size, { count, min, max, colors, alpha, seed }) {
  const random = makeRandom(seed);
  for (let i = 0; i < count; i += 1) {
    const radius = min + random() * (max - min);
    const x = random() * size;
    const y = random() * size;
    const color = colors[(random() * colors.length) | 0];
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(${color},${alpha})`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function speckle(ctx, size, { count, seed, dark = '0,0,0', light = '255,255,255', alpha = 0.18 }) {
  const random = makeRandom(seed);
  for (let i = 0; i < count; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const dot = 0.5 + random() * 1.6;
    const tint = random() > 0.5 ? dark : light;
    ctx.fillStyle = `rgba(${tint},${alpha * (0.4 + random())})`;
    ctx.beginPath();
    ctx.arc(x, y, dot, 0, Math.PI * 2);
    ctx.fill();
  }
}

function streaks(ctx, size, { count, seed, color = '0,0,0', alpha = 0.16 }) {
  const random = makeRandom(seed);
  for (let i = 0; i < count; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const length = size * (0.12 + random() * 0.45);
    const width = 1 + random() * 3;
    const gradient = ctx.createLinearGradient(x, y, x, y + length);
    gradient.addColorStop(0, `rgba(${color},${alpha})`);
    gradient.addColorStop(1, `rgba(${color},0)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, width, length);
  }
}

/* ------------------------------------------------------------------ */
/* Surface textures                                                    */
/* ------------------------------------------------------------------ */

function paintConcrete(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8e9096';
  ctx.fillRect(0, 0, size, size);

  blotches(ctx, size, {
    count: 90,
    min: size * 0.04,
    max: size * 0.22,
    colors: ['126,130,136', '104,106,112', '150,150,152'],
    alpha: 0.5,
    seed: 11,
  });
  // Form-tie holes and shuttering seams give the walls a poured-concrete read.
  const random = makeRandom(27);
  ctx.strokeStyle = 'rgba(70,72,78,0.5)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    const y = random() * size;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
  for (let i = 0; i < 26; i += 1) {
    const x = random() * size;
    const y = random() * size;
    ctx.fillStyle = 'rgba(64,66,72,0.55)';
    ctx.beginPath();
    ctx.arc(x, y, 2 + random() * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  streaks(ctx, size, { count: 22, seed: 31, color: '48,50,56', alpha: 0.2 });
  speckle(ctx, size, { count: 2600, seed: 41, alpha: 0.14 });
  return canvas;
}

function paintAsphalt(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  // Mid-dark, not black. The yard is the largest surface in the frame: if it
  // goes too dark the whole miniature loses its floor and the dark outlines
  // have nothing to read against.
  ctx.fillStyle = '#4c515a';
  ctx.fillRect(0, 0, size, size);
  blotches(ctx, size, {
    count: 70,
    min: size * 0.05,
    max: size * 0.26,
    colors: ['40,44,52', '86,92,102', '62,67,76'],
    alpha: 0.5,
    seed: 71,
  });
  speckle(ctx, size, { count: 4200, seed: 73, alpha: 0.2 });

  // Hairline cracks wandering across the yard.
  const random = makeRandom(79);
  ctx.strokeStyle = 'rgba(28,31,38,0.7)';
  for (let i = 0; i < 9; i += 1) {
    ctx.lineWidth = 0.8 + random() * 1.6;
    ctx.beginPath();
    let x = random() * size;
    let y = random() * size;
    ctx.moveTo(x, y);
    for (let step = 0; step < 14; step += 1) {
      x += (random() - 0.5) * size * 0.16;
      y += (random() - 0.5) * size * 0.16;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  blotches(ctx, size, {
    count: 14,
    min: size * 0.06,
    max: size * 0.18,
    colors: ['30,33,40', '38,42,50'],
    alpha: 0.4,
    seed: 83,
  });
  return canvas;
}

function paintRust(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#75747a';
  ctx.fillRect(0, 0, size, size);
  blotches(ctx, size, {
    count: 110,
    min: size * 0.02,
    max: size * 0.2,
    colors: ['146,88,48', '168,110,62', '116,66,34', '104,60,30'],
    alpha: 0.5,
    seed: 101,
  });
  blotches(ctx, size, {
    count: 44,
    min: size * 0.01,
    max: size * 0.08,
    colors: ['184,124,68', '92,54,28'],
    alpha: 0.4,
    seed: 103,
  });
  streaks(ctx, size, { count: 40, seed: 107, color: '112,62,30', alpha: 0.28 });
  speckle(ctx, size, { count: 2000, seed: 109, alpha: 0.18 });
  return canvas;
}

function paintCorrugated(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8b939c';
  ctx.fillRect(0, 0, size, size);

  // Vertical ribs of a tin shed / shipping container wall. Deliberately few
  // ribs per tile: at diorama scale a physically accurate rib pitch turns
  // into flat grey once the camera pulls back.
  const rib = size / 7;
  for (let x = 0; x < size; x += rib) {
    const gradient = ctx.createLinearGradient(x, 0, x + rib, 0);
    gradient.addColorStop(0, 'rgba(30,34,40,0.5)');
    gradient.addColorStop(0.35, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.6, 'rgba(255,255,255,0.08)');
    gradient.addColorStop(1, 'rgba(30,34,40,0.46)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, rib, size);
  }
  // Rust is present but restrained: this is a cold night yard, not a scrapyard.
  blotches(ctx, size, {
    count: 34,
    min: size * 0.015,
    max: size * 0.14,
    colors: ['132,84,52', '150,102,64', '110,72,44'],
    alpha: 0.26,
    seed: 131,
  });
  streaks(ctx, size, { count: 26, seed: 137, color: '118,80,50', alpha: 0.2 });
  speckle(ctx, size, { count: 1600, seed: 139, alpha: 0.14 });
  return canvas;
}

function paintWood(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#8a6a45';
  ctx.fillRect(0, 0, size, size);

  // Four planks with visible gaps and slightly different tones.
  const plank = size / 4;
  const random = makeRandom(151);
  for (let i = 0; i < 4; i += 1) {
    const shade = 120 + random() * 40;
    ctx.fillStyle = `rgb(${shade | 0},${(shade * 0.76) | 0},${(shade * 0.52) | 0})`;
    ctx.fillRect(0, i * plank + 2, size, plank - 4);

    // Grain.
    ctx.strokeStyle = 'rgba(70,48,28,0.35)';
    ctx.lineWidth = 1;
    for (let g = 0; g < 22; g += 1) {
      const y = i * plank + 4 + random() * (plank - 8);
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= size; x += 16) {
        ctx.lineTo(x, y + Math.sin((x / size) * Math.PI * 4 + g) * 2.2);
      }
      ctx.stroke();
    }
    // Seam.
    ctx.fillStyle = 'rgba(38,24,12,0.85)';
    ctx.fillRect(0, i * plank, size, 3);
  }
  // Nail heads.
  for (let i = 0; i < 4; i += 1) {
    for (const x of [10, size - 14]) {
      const y = i * plank + plank / 2;
      ctx.fillStyle = 'rgba(60,60,64,0.9)';
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  blotches(ctx, size, {
    count: 34,
    min: size * 0.02,
    max: size * 0.12,
    colors: ['44,28,14', '120,92,58'],
    alpha: 0.35,
    seed: 157,
  });
  speckle(ctx, size, { count: 1400, seed: 163, alpha: 0.16 });
  return canvas;
}

function paintCardboard(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#9c7c52';
  ctx.fillRect(0, 0, size, size);
  blotches(ctx, size, {
    count: 60,
    min: size * 0.02,
    max: size * 0.16,
    colors: ['128,100,62', '74,54,32', '150,120,78'],
    alpha: 0.4,
    seed: 181,
  });
  // Damp, rain-soaked patches; cardboard that has been out in a storm.
  blotches(ctx, size, {
    count: 22,
    min: size * 0.04,
    max: size * 0.2,
    colors: ['62,46,28', '86,64,38'],
    alpha: 0.42,
    seed: 191,
  });
  ctx.strokeStyle = 'rgba(58,42,24,0.35)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i += 1) {
    const y = (i / 6) * size + 10;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y + 6);
    ctx.stroke();
  }
  speckle(ctx, size, { count: 1800, seed: 197, alpha: 0.14 });
  return canvas;
}

function paintMetalPlate(size = 512) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#5d6674';
  ctx.fillRect(0, 0, size, size);
  blotches(ctx, size, {
    count: 70,
    min: size * 0.02,
    max: size * 0.2,
    colors: ['44,52,62', '104,116,132', '72,82,94'],
    alpha: 0.5,
    seed: 211,
  });
  speckle(ctx, size, { count: 2400, seed: 223, alpha: 0.2 });
  streaks(ctx, size, { count: 26, seed: 227, color: '32,38,46', alpha: 0.3 });
  return canvas;
}

function paintPaintBlue(size = 256) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2f5f92';
  ctx.fillRect(0, 0, size, size);
  blotches(ctx, size, {
    count: 70,
    min: size * 0.02,
    max: size * 0.16,
    colors: ['26,52,80', '58,104,150', '120,64,34'],
    alpha: 0.4,
    seed: 233,
  });
  streaks(ctx, size, { count: 24, seed: 239, color: '110,58,26', alpha: 0.3 });
  speckle(ctx, size, { count: 1200, seed: 241, alpha: 0.18 });
  return canvas;
}

function paintShippingContainer(size, tint, seed) {
  const canvas = createCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = tint;
  ctx.fillRect(0, 0, size, size);
  // Corrugated side ribs plus top/bottom rails, the real container profile.
  const rib = size / 7;
  for (let x = 0; x < size; x += rib) {
    const gradient = ctx.createLinearGradient(x, 0, x + rib, 0);
    gradient.addColorStop(0, 'rgba(12,16,20,0.5)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.16)');
    gradient.addColorStop(1, 'rgba(12,16,20,0.45)');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, 0, rib, size);
  }
  ctx.fillStyle = 'rgba(10,13,17,0.55)';
  ctx.fillRect(0, 0, size, size * 0.07);
  ctx.fillRect(0, size * 0.93, size, size * 0.07);
  blotches(ctx, size, {
    count: 80,
    min: size * 0.015,
    max: size * 0.18,
    colors: ['136,82,46', '110,64,32'],
    alpha: 0.32,
    seed,
  });
  streaks(ctx, size, { count: 30, seed: seed + 6, color: '112,66,34', alpha: 0.24 });
  speckle(ctx, size, { count: 1100, seed: seed + 12, alpha: 0.16 });
  return canvas;
}

function paintContainerGreen(size = 256) {
  return paintShippingContainer(size, '#3f6152', 251);
}

function paintContainerBlue(size = 256) {
  return paintShippingContainer(size, '#3a5570', 271);
}

/* ------------------------------------------------------------------ */
/* Decals — transparent overlays used as small quads on walls and floor */
/* ------------------------------------------------------------------ */

function decalCanvas(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  return canvas;
}

function paintBombMarking(letter) {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  const random = makeRandom(letter === 'A' ? 401 : 409);

  ctx.strokeStyle = 'rgba(236,238,232,0.92)';
  ctx.fillStyle = 'rgba(236,238,232,0.92)';
  ctx.lineWidth = 16;

  // Plant-site square with an inner cross, the classic defusal marking.
  ctx.strokeRect(52, 132, size - 104, size - 264);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(52, 190);
  ctx.lineTo(size - 52, 190);
  ctx.moveTo(52, size - 190);
  ctx.lineTo(size - 52, size - 190);
  ctx.stroke();

  ctx.font = 'bold 190px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, size / 2, 100);

  // Worn-away paint: scrub holes through everything.
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 900; i += 1) {
    const x = random() * size;
    const y = random() * size;
    const r = 1 + random() * 9;
    ctx.fillStyle = `rgba(0,0,0,${0.25 + random() * 0.75})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintGraffiti(text, color) {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  const random = makeRandom(text.length * 977 + 13);

  ctx.save();
  ctx.translate(size / 2, size / 2);
  ctx.rotate(-0.06);
  ctx.font = 'bold 118px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 20;
  ctx.strokeStyle = 'rgba(10,10,12,0.75)';
  ctx.strokeText(text, 0, 0);
  ctx.fillStyle = color;
  ctx.fillText(text, 0, 0);
  ctx.restore();

  // A drips-and-tags pass so it reads as spray paint, not printed text.
  ctx.strokeStyle = color;
  for (let i = 0; i < 22; i += 1) {
    const x = 60 + random() * (size - 120);
    ctx.lineWidth = 2 + random() * 5;
    ctx.beginPath();
    ctx.moveTo(x, size * 0.55);
    ctx.lineTo(x, size * 0.55 + 30 + random() * 90);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1400; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.2 + random() * 0.8})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintFreightNumber(text) {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.font = 'bold 118px "Courier New", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(228,230,226,0.8)';
  ctx.fillText(text, size / 2, size / 2);
  ctx.strokeStyle = 'rgba(228,230,226,0.55)';
  ctx.lineWidth = 7;
  ctx.strokeRect(38, size / 2 - 84, size - 76, 168);

  const random = makeRandom(text.length * 613 + 7);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1700; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.3 + random() * 0.7})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintWarningSlogan(text, sub) {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(226,228,224,0.86)';
  ctx.fillRect(0, 150, size, 210);
  ctx.fillStyle = '#1d222b';
  ctx.font = 'bold 64px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, size / 2, 220);
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.fillText(sub, size / 2, 300);

  const random = makeRandom(text.length * 331 + 29);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1500; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.25 + random() * 0.75})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 9, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintBulletHoles() {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  const random = makeRandom(881);

  const cluster = (cx, cy, spread, count, sizeMin, sizeMax) => {
    for (let i = 0; i < count; i += 1) {
      const x = cx + (random() - 0.5) * spread;
      const y = cy + (random() - 0.5) * spread;
      const r = sizeMin + random() * (sizeMax - sizeMin);

      // Fresh pockmark: bright chipped rim around a dark hole.
      const rim = ctx.createRadialGradient(x, y, r * 0.4, x, y, r * 1.9);
      rim.addColorStop(0, 'rgba(196,198,196,0.5)');
      rim.addColorStop(1, 'rgba(196,198,196,0)');
      ctx.fillStyle = rim;
      ctx.beginPath();
      ctx.arc(x, y, r * 1.9, 0, Math.PI * 2);
      ctx.fill();

      const hole = ctx.createRadialGradient(x, y, 0, x, y, r);
      hole.addColorStop(0, 'rgba(8,8,10,0.96)');
      hole.addColorStop(0.7, 'rgba(24,24,28,0.85)');
      hole.addColorStop(1, 'rgba(24,24,28,0)');
      ctx.fillStyle = hole;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();

      // Radial cracks.
      if (random() > 0.55) {
        ctx.strokeStyle = 'rgba(40,42,46,0.55)';
        ctx.lineWidth = 1.1;
        for (let c = 0; c < 3; c += 1) {
          const a = random() * Math.PI * 2;
          const len = r * (2 + random() * 3);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
          ctx.stroke();
        }
      }
    }
  };

  cluster(size * 0.32, size * 0.36, 120, 34, 2.4, 5.2);
  cluster(size * 0.7, size * 0.6, 90, 22, 2, 4.4);
  cluster(size * 0.52, size * 0.82, 70, 12, 1.6, 3.4);
  return canvas;
}

function paintPoliceBadge() {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(226,228,224,0.82)';

  // Simple shield crest.
  ctx.beginPath();
  ctx.moveTo(256, 92);
  ctx.lineTo(400, 156);
  ctx.lineTo(400, 300);
  ctx.quadraticCurveTo(400, 400, 256, 448);
  ctx.quadraticCurveTo(112, 400, 112, 300);
  ctx.lineTo(112, 156);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#1d222b';
  ctx.beginPath();
  ctx.arc(256, 236, 62, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = 'bold 92px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CT', 256, 240);
  ctx.font = 'bold 34px Arial, sans-serif';
  ctx.fillText('SPECIAL UNIT', 256, 330);

  const random = makeRandom(613);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1200; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.3 + random() * 0.7})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintDutyRoster() {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(226,224,212,0.9)';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#22262c';
  ctx.font = 'bold 40px Arial, sans-serif';
  ctx.fillText('DUTY ROSTER  09-28', 26, 56);
  ctx.font = '26px "Courier New", monospace';
  const rows = ['A  01:00  R. VANCE', 'A  05:00  D. HOLT', 'B  09:00  M. SOTO', 'B  13:00  K. IDRIS', 'A  17:00  T. NGUYEN', 'B  21:00  P. LARSEN'];
  rows.forEach((row, i) => ctx.fillText(row, 26, 110 + i * 42));
  ctx.strokeStyle = 'rgba(34,38,44,0.5)';
  ctx.lineWidth = 3;
  for (let i = 0; i < 6; i += 1) {
    ctx.beginPath();
    ctx.moveTo(20, 126 + i * 42);
    ctx.lineTo(size - 20, 126 + i * 42);
    ctx.stroke();
  }

  const random = makeRandom(727);
  blotches(ctx, size, {
    count: 40,
    min: size * 0.01,
    max: size * 0.07,
    colors: ['120,96,54', '92,74,44'],
    alpha: 0.55,
    seed: 729,
  });
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 900; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.2 + random() * 0.7})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 10, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintRoadSign() {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2b5a3c';
  ctx.beginPath();
  ctx.roundRect(20, 150, size - 40, 200, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(232,234,230,0.9)';
  ctx.lineWidth = 8;
  ctx.stroke();
  ctx.fillStyle = 'rgba(232,234,230,0.9)';
  ctx.font = 'bold 76px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FREIGHT', size / 2, 220);
  ctx.font = 'bold 52px Arial, sans-serif';
  ctx.fillText('YARD 4-B', size / 2, 296);

  const random = makeRandom(313);
  blotches(ctx, size, {
    count: 60,
    min: size * 0.01,
    max: size * 0.1,
    colors: ['120,66,30', '70,80,70'],
    alpha: 0.5,
    seed: 317,
  });
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1100; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.25 + random() * 0.75})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

function paintTeamSpray(color, letter) {
  const size = 512;
  const canvas = decalCanvas(size);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.font = 'bold 300px "Arial Black", Impact, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(letter, size / 2, size / 2 + 16);

  ctx.strokeStyle = color;
  ctx.lineWidth = 26;
  ctx.beginPath();
  ctx.moveTo(70, size - 110);
  ctx.lineTo(size - 70, size - 110);
  ctx.stroke();

  const random = makeRandom(letter.charCodeAt(0) * 991);
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 1300; i += 1) {
    ctx.fillStyle = `rgba(0,0,0,${0.3 + random() * 0.7})`;
    ctx.beginPath();
    ctx.arc(random() * size, random() * size, 1 + random() * 12, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

const PAINTERS = {
  concrete: paintConcrete,
  asphalt: paintAsphalt,
  rust: paintRust,
  corrugated: paintCorrugated,
  wood: paintWood,
  cardboard: paintCardboard,
  metal: paintMetalPlate,
  bluePaint: paintPaintBlue,
  containerGreen: paintContainerGreen,
  containerBlue: paintContainerBlue,
};

const DECALS = {
  bombA: () => paintBombMarking('A'),
  bombB: () => paintBombMarking('B'),
  graffitiOne: () => paintGraffiti('STRAAT', '#c8d24a'),
  graffitiTwo: () => paintGraffiti('LOSERS', '#d0563f'),
  graffitiThree: () => paintGraffiti('CS 1.6', '#4fb0c8'),
  freightCode: () => paintFreightNumber('MSKU 4471'),
  freightCodeTwo: () => paintFreightNumber('TGHU 9032'),
  warningOne: () => paintWarningSlogan('KEEP OUT', 'RESTRICTED AREA'),
  warningTwo: () => paintWarningSlogan('DANGER', 'HIGH VOLTAGE'),
  warningThree: () => paintWarningSlogan('STOP', 'NO ENTRY'),
  bulletHoles: paintBulletHoles,
  policeBadge: paintPoliceBadge,
  dutyRoster: paintDutyRoster,
  roadSign: paintRoadSign,
  sprayT: () => paintTeamSpray('#d8a53a', 'T'),
  sprayCT: () => paintTeamSpray('#4a86c8', 'CT'),
};

/** Surfaces: tiling, wrap around. */
export function surface(name) {
  const key = `surface:${name}`;
  if (!cache.has(key)) {
    cache.set(key, toTexture(PAINTERS[name]()));
  }
  return cache.get(key);
}

/** Decals: transparent, clamped, one quad each. */
export function decal(name) {
  const key = `decal:${name}`;
  if (!cache.has(key)) {
    cache.set(key, toTexture(DECALS[name](), { repeat: false }));
  }
  return cache.get(key);
}

export function allTextureNames() {
  return { surfaces: Object.keys(PAINTERS), decals: Object.keys(DECALS) };
}
