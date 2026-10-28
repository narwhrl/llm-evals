// Procedural canvas textures. Everything is generated at runtime so the build
// ships no binary assets and the diorama stays a single self-contained page.

import * as THREE from "three";

const cache = new Map();

function make(key, size, draw, opts = {}) {
  if (cache.has(key)) return cache.get(key);
  const canvas = document.createElement("canvas");
  canvas.width = opts.width || size;
  canvas.height = opts.height || size;
  const ctx = canvas.getContext("2d");
  draw(ctx, canvas.width, canvas.height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = opts.data ? THREE.NoColorSpace : THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  if (opts.repeat) tex.repeat.set(opts.repeat, opts.repeat);
  cache.set(key, tex);
  return tex;
}

const rnd = (seed) => {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
};

// Speckled grit used for concrete and asphalt, tinted per surface.
function grit(ctx, w, h, base, speckle, density, seed) {
  const rand = rnd(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < density; i++) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 2.2 + 0.3;
    ctx.fillStyle = speckle[Math.floor(rand() * speckle.length)];
    ctx.globalAlpha = 0.25 + rand() * 0.5;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

// Long stains that read as rain wash running down a wall.
function wash(ctx, w, h, colors, count, seed) {
  const rand = rnd(seed);
  for (let i = 0; i < count; i++) {
    const x = rand() * w;
    const width = 2 + rand() * 10;
    const g = ctx.createLinearGradient(0, 0, 0, h);
    const c = colors[Math.floor(rand() * colors.length)];
    g.addColorStop(0, "rgba(0,0,0,0)");
    g.addColorStop(0.25 + rand() * 0.3, c);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.globalAlpha = 0.1 + rand() * 0.35;
    ctx.fillRect(x, 0, width, h);
  }
  ctx.globalAlpha = 1;
}

export const concreteWall = () =>
  make("concreteWall", 256, (ctx, w, h) => {
    grit(ctx, w, h, "#8d9096", ["#7b7e85", "#9ba0a6", "#6f7278", "#a6aab0"], 2600, 11);
    wash(ctx, w, h, ["rgba(60,66,74,0.9)", "rgba(120,126,132,0.6)"], 14, 23);
    // Form-work seams.
    ctx.strokeStyle = "rgba(60,64,70,0.5)";
    ctx.lineWidth = 2;
    for (let y = 40; y < h; y += 84) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }
  });

export const concreteFloor = () =>
  make("concreteFloor", 256, (ctx, w, h) => {
    grit(ctx, w, h, "#787c83", ["#6a6e75", "#888d94", "#5f636a", "#949aa1"], 3200, 31);
    ctx.strokeStyle = "rgba(48,52,58,0.55)";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(w / 2, 0); ctx.lineTo(w / 2, h); ctx.stroke();
  });

export const asphalt = () =>
  make("asphalt", 256, (ctx, w, h) => {
    grit(ctx, w, h, "#2f333a", ["#22262b", "#3b4048", "#191c21", "#4a5058"], 4200, 41);
    // Patched cracks.
    const rand = rnd(77);
    ctx.strokeStyle = "rgba(18,20,24,0.8)";
    for (let i = 0; i < 12; i++) {
      ctx.lineWidth = 1 + rand() * 2;
      ctx.beginPath();
      let x = rand() * w, y = rand() * h;
      ctx.moveTo(x, y);
      for (let k = 0; k < 5; k++) { x += (rand() - 0.5) * 60; y += (rand() - 0.5) * 60; ctx.lineTo(x, y); }
      ctx.stroke();
    }
  });

export const rustedMetal = () =>
  make("rustedMetal", 256, (ctx, w, h) => {
    grit(ctx, w, h, "#6b533c", ["#4d3a28", "#8a6a4a", "#3a2d20", "#a07c52"], 2200, 53);
    const rand = rnd(91);
    for (let i = 0; i < 40; i++) {
      const x = rand() * w, y = rand() * h, r = 6 + rand() * 34;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(120,64,28,0.75)");
      g.addColorStop(0.6, "rgba(84,48,24,0.35)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
    wash(ctx, w, h, ["rgba(40,26,16,0.8)", "rgba(110,70,38,0.6)"], 10, 17);
  });

export const corrugated = () =>
  make("corrugated", 256, (ctx, w, h) => {
    for (let x = 0; x < w; x += 16) {
      const g = ctx.createLinearGradient(x, 0, x + 16, 0);
      g.addColorStop(0, "#4e5a63");
      g.addColorStop(0.45, "#78848d");
      g.addColorStop(0.55, "#7f8b94");
      g.addColorStop(1, "#3f4a52");
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, 16, h);
    }
    const rand = rnd(131);
    for (let i = 0; i < 26; i++) {
      ctx.fillStyle = `rgba(${110 + rand() * 40 | 0},${60 + rand() * 30 | 0},28,${0.15 + rand() * 0.4})`;
      ctx.fillRect(rand() * w, rand() * h, 8 + rand() * 40, 6 + rand() * 26);
    }
  });

export const wood = () =>
  make("wood", 256, (ctx, w, h) => {
    ctx.fillStyle = "#8a6a44";
    ctx.fillRect(0, 0, w, h);
    const rand = rnd(211);
    for (let i = 0; i < 90; i++) {
      ctx.strokeStyle = `rgba(${70 + rand() * 60 | 0},${50 + rand() * 40 | 0},28,${0.15 + rand() * 0.35})`;
      ctx.lineWidth = 1 + rand() * 3;
      ctx.beginPath();
      const y = rand() * h;
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y + (rand() - 0.5) * 12, w * 0.6, y + (rand() - 0.5) * 12, w, y + (rand() - 0.5) * 8);
      ctx.stroke();
    }
    // Plank gaps of a shipping crate.
    ctx.fillStyle = "rgba(40,26,14,0.85)";
    for (let y = 0; y < h; y += 64) ctx.fillRect(0, y, w, 6);
  });

export const cardboard = () =>
  make("cardboard", 128, (ctx, w, h) => {
    grit(ctx, w, h, "#a8845a", ["#9d7b52", "#b48f63", "#8d6f47"], 900, 307);
    ctx.strokeStyle = "rgba(200,190,175,0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(0, h * 0.5); ctx.lineTo(w, h * 0.5); ctx.stroke();
    ctx.fillStyle = "rgba(60,44,28,0.6)";
    ctx.fillRect(w * 0.12, h * 0.18, w * 0.3, h * 0.12);
  });

// Spray-painted site marks and faction graffiti, used as an overlay decal.
export const graffiti = (variant) =>
  make(`graffiti${variant}`, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const rand = rnd(400 + variant * 37);
    ctx.lineCap = "round";
    if (variant === 0) {
      // Bomb site stencil: letter A in a bracket.
      ctx.strokeStyle = "rgba(232,236,240,0.92)";
      ctx.lineWidth = 12;
      ctx.strokeRect(w * 0.2, h * 0.2, w * 0.6, h * 0.6);
      ctx.font = "bold 120px sans-serif";
      ctx.fillStyle = "rgba(232,236,240,0.92)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("A", w * 0.5, h * 0.54);
    } else if (variant === 1) {
      ctx.strokeStyle = "rgba(226,230,236,0.9)";
      ctx.lineWidth = 12;
      ctx.strokeRect(w * 0.2, h * 0.2, w * 0.6, h * 0.6);
      ctx.font = "bold 120px sans-serif";
      ctx.fillStyle = "rgba(226,230,236,0.9)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("B", w * 0.5, h * 0.54);
    } else if (variant === 2) {
      // Freight number plate.
      ctx.font = "bold 54px monospace";
      ctx.fillStyle = "rgba(228,232,238,0.85)";
      ctx.textAlign = "left";
      ctx.fillText("CS-" + (100 + Math.floor(rand() * 800)), w * 0.1, h * 0.35);
      ctx.font = "bold 34px monospace";
      ctx.fillText("NARS-" + (10 + Math.floor(rand() * 89)), w * 0.1, h * 0.58);
      ctx.fillStyle = "rgba(196,64,52,0.7)";
      ctx.fillRect(w * 0.1, h * 0.68, w * 0.7, 10);
    } else {
      // Tag / crew spray in a hostile hue.
      ctx.strokeStyle = "rgba(196,72,60,0.8)";
      ctx.lineWidth = 10;
      ctx.beginPath();
      let x = w * 0.12, y = h * 0.6;
      ctx.moveTo(x, y);
      for (let i = 0; i < 7; i++) { x += w * 0.11; y = h * (0.4 + rand() * 0.28); ctx.lineTo(x, y); }
      ctx.stroke();
      ctx.strokeStyle = "rgba(74,120,190,0.65)";
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.arc(w * 0.6, h * 0.32, w * 0.14, 0, Math.PI * 1.6); ctx.stroke();
    }
  });

// Bullet impact cluster, alpha-only decal dropped onto walls and crates.
export const bulletHoles = (seed) =>
  make(`bullet${seed}`, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const rand = rnd(600 + seed);
    for (let i = 0; i < 26; i++) {
      const x = 12 + rand() * (w - 24);
      const y = 12 + rand() * (h - 24);
      const r = 1.6 + rand() * 2.2;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);
      g.addColorStop(0, "rgba(14,14,16,0.95)");
      g.addColorStop(0.4, "rgba(40,36,34,0.6)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r * 3, 0, Math.PI * 2); ctx.fill();
    }
  });

// Police crest / warning stencil on the CT back wall.
export const policeSign = () =>
  make("policeSign", 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(214,222,232,0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.42, w * 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(30,44,72,0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.42, w * 0.14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(214,222,232,0.9)";
    ctx.font = "bold 40px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("S.W.A.T", w * 0.5, h * 0.48);
    ctx.font = "bold 26px monospace";
    ctx.fillStyle = "rgba(198,72,58,0.9)";
    ctx.fillText("POLICE LINE", w * 0.5, h * 0.75);
    ctx.fillText("DO NOT CROSS", w * 0.5, h * 0.86);
  });

// Puddle sheet: white where water pools, black on dry pavement.
export const puddleMask = (seed) =>
  make(`puddle${seed}`, 256, (ctx, w, h) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    const rand = rnd(900 + seed);
    for (let i = 0; i < 16; i++) {
      const x = rand() * w, y = rand() * h;
      const rx = 18 + rand() * 70, ry = 12 + rand() * 46;
      const g = ctx.createRadialGradient(x, y, 0, x, y, Math.max(rx, ry));
      g.addColorStop(0, "rgba(255,255,255,0.95)");
      g.addColorStop(0.7, "rgba(255,255,255,0.55)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(1, ry / rx);
      ctx.translate(-x, -y);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rx, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }, { data: true });

// Repeating ripple bumps for the standing water.
export const rippleNormal = () =>
  make("rippleNormal", 256, (ctx, w, h) => {
    ctx.fillStyle = "rgb(128,128,255)";
    ctx.fillRect(0, 0, w, h);
    const rand = rnd(1400);
    for (let i = 0; i < 34; i++) {
      const x = rand() * w, y = rand() * h, r = 4 + rand() * 26;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, "rgba(128,128,255,1)");
      g.addColorStop(0.55, "rgba(150,150,255,1)");
      g.addColorStop(0.75, "rgba(104,104,255,1)");
      g.addColorStop(1, "rgba(128,128,255,1)");
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  }, { data: true });

// Soft radial sprite for lamp glow and lightning bloom.
export const glowSprite = (color) =>
  make(`glow${color}`, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, color);
    g.addColorStop(0.28, color.replace(/[\d.]+\)$/, "0.45)"));
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });

// Three-step cel ramp: hard terminator, no smooth gradient.
export function gradientMap(steps = 4) {
  const key = `grad${steps}`;
  if (cache.has(key)) return cache.get(key);
  const data = new Uint8Array(steps);
  for (let i = 0; i < steps; i++) {
    data[i] = Math.round(255 * Math.pow((i + 1) / steps, 0.85));
  }
  const tex = new THREE.DataTexture(data, steps, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  cache.set(key, tex);
  return tex;
}
