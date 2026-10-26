import { makeCanvas, canvasTexture, mulberry32 } from "./utils.js";

const FONT = '"Segoe UI", "Microsoft YaHei", system-ui, sans-serif';
const MONO = '"Cascadia Mono", "Consolas", monospace';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function noise(ctx, w, h, amount, seed, alpha = 0.5) {
  const rand = mulberry32(seed);
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * amount;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    if (alpha < 1) d[i + 3] = Math.max(0, Math.min(255, d[i + 3] * alpha));
  }
  ctx.putImageData(img, 0, 0);
}

// Matte white painted hull panel: seams, scuffs, faint grime.
export function hullTexture(seed = 3, size = 512) {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#d7d8d1";
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(seed);
  for (let i = 0; i < 900; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.fillStyle = rand() > 0.5 ? "rgba(120,122,118,0.10)" : "rgba(255,255,255,0.16)";
    ctx.fillRect(x, y, 1 + rand() * 3, 1 + rand() * 2);
  }
  // panel seams
  ctx.strokeStyle = "rgba(96,99,96,0.5)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 128);
  ctx.lineTo(size, 128);
  ctx.moveTo(0, 384);
  ctx.lineTo(size, 384);
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, 131);
  ctx.lineTo(size, 131);
  ctx.moveTo(0, 387);
  ctx.lineTo(size, 387);
  ctx.stroke();
  // scratches
  for (let i = 0; i < 26; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.strokeStyle = `rgba(70,72,70,${0.06 + rand() * 0.12})`;
    ctx.lineWidth = 0.8 + rand();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 40, y + (rand() - 0.5) * 8);
    ctx.stroke();
  }
  // grime at the bottom
  const grad = ctx.createLinearGradient(0, size * 0.75, 0, size);
  grad.addColorStop(0, "rgba(60,62,58,0)");
  grad.addColorStop(1, "rgba(60,62,58,0.18)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  noise(ctx, size, size, 10, seed + 7);
  return canvasTexture(canvas, { repeat: [1, 1] });
}

export function fabricTexture(color = "#c9c2ad", seed = 11, size = 256, stripe = null) {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(seed);
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      const v = 0.86 + rand() * 0.28;
      ctx.fillStyle = `rgba(255,255,255,${(v - 0.9) * 0.35 + 0.05})`;
      ctx.fillRect(x, y, 1, 1);
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(x + 1, y + 1, 1, 1);
    }
  }
  if (stripe) {
    ctx.fillStyle = stripe;
    ctx.fillRect(0, size * 0.36, size, size * 0.1);
    ctx.fillRect(0, size * 0.52, size, size * 0.03);
  }
  noise(ctx, size, size, 8, seed + 3);
  return canvasTexture(canvas, { repeat: [1, 1] });
}

export function towelTexture(size = 256) {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e6e1d4";
  ctx.fillRect(0, 0, size, size);
  const rand = mulberry32(5);
  for (let i = 0; i < 2600; i += 1) {
    const x = rand() * size;
    const y = rand() * size;
    ctx.fillStyle = rand() > 0.5 ? "rgba(255,255,255,0.35)" : "rgba(120,118,110,0.12)";
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.fillStyle = "rgba(70,110,150,0.75)";
  ctx.fillRect(0, size * 0.62, size, 10);
  ctx.fillRect(0, size * 0.68, size, 4);
  return canvasTexture(canvas, { repeat: [1, 1] });
}

export function grateTexture(size = 512) {
  const canvas = makeCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#2b2f33";
  ctx.fillRect(0, 0, size, size);
  const step = 32;
  for (let x = 0; x < size; x += step) {
    const grad = ctx.createLinearGradient(x, 0, x + step, 0);
    grad.addColorStop(0, "#6a7076");
    grad.addColorStop(0.32, "#a7adb2");
    grad.addColorStop(0.55, "#868c91");
    grad.addColorStop(1, "#4d5358");
    ctx.fillStyle = grad;
    ctx.fillRect(x + 4, 0, step - 8, size);
  }
  for (let y = 0; y < size; y += 64) {
    ctx.fillStyle = "rgba(178,184,190,0.6)";
    ctx.fillRect(0, y, size, 3);
    ctx.fillStyle = "rgba(0,0,0,0.32)";
    ctx.fillRect(0, y + 3, size, 2);
  }
  noise(ctx, size, size, 12, 21);
  return canvasTexture(canvas, { repeat: [6, 3] });
}

export function labelTexture(text, { sub = "", bg = "#e9e6da", fg = "#22262a", accent = null, w = 256, h = 128, border = true, font = 52, mono = false } = {}) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  if (accent) {
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, w * 0.08, h);
  }
  if (border) {
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 4;
    ctx.strokeRect(3, 3, w - 6, h - 6);
  }
  ctx.fillStyle = fg;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${font}px ${mono ? MONO : FONT}`;
  ctx.fillText(text, w / 2 + (accent ? w * 0.04 : 0), sub ? h * 0.42 : h / 2);
  if (sub) {
    ctx.font = `500 ${Math.round(font * 0.36)}px ${FONT}`;
    ctx.globalAlpha = 0.8;
    ctx.fillText(sub, w / 2, h * 0.75);
    ctx.globalAlpha = 1;
  }
  const tex = canvasTexture(canvas);
  return tex;
}

export function cautionTexture(w = 320, h = 160) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e8c93c";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#1d1d1b";
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, w - 8, h - 8);
  // triangle
  ctx.beginPath();
  ctx.moveTo(56, 108);
  ctx.lineTo(88, 46);
  ctx.lineTo(120, 108);
  ctx.closePath();
  ctx.lineWidth = 6;
  ctx.stroke();
  ctx.fillStyle = "#1d1d1b";
  ctx.font = `700 34px ${FONT}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("CAUTION", 138, 62);
  ctx.font = `500 22px ${FONT}`;
  ctx.fillText("LOW PRESSURE", 138, 98);
  return canvasTexture(canvas);
}

export function stripeTexture(w = 256, h = 64) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1c1c1c";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#d8b62c";
  for (let x = -h; x < w + h; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 20, 0);
    ctx.lineTo(x + 20 - h, h);
    ctx.lineTo(x - h, h);
    ctx.closePath();
    ctx.fill();
  }
  return canvasTexture(canvas);
}

export function photoTexture(kind = 0, w = 192, h = 240) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const rand = mulberry32(31 + kind);
  if (kind === 0) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#bcd6e6");
    sky.addColorStop(0.55, "#e7dcc6");
    sky.addColorStop(1, "#8e9a7c");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#6f7f58";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.62);
    ctx.quadraticCurveTo(w * 0.5, h * 0.5, w, h * 0.66);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
    // three people
    const people = [
      { x: w * 0.3, s: 1.0, c: "#b8574a" },
      { x: w * 0.52, s: 1.16, c: "#3f5f7a" },
      { x: w * 0.72, s: 0.86, c: "#7a6a8e" },
    ];
    for (const p of people) {
      ctx.fillStyle = "#e0b394";
      ctx.beginPath();
      ctx.arc(p.x, h * 0.48, 12 * p.s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.c;
      roundRect(ctx, p.x - 15 * p.s, h * 0.54, 30 * p.s, 46 * p.s, 6);
      ctx.fill();
    }
  } else if (kind === 1) {
    ctx.fillStyle = "#20303c";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 90; i += 1) {
      ctx.fillStyle = `rgba(240,236,214,${0.2 + rand() * 0.7})`;
      ctx.fillRect(rand() * w, rand() * h, 2, 2);
    }
    ctx.fillStyle = "#c8a24a";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.44, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#e8e2cc";
    ctx.font = `500 15px ${FONT}`;
    ctx.textAlign = "center";
    ctx.fillText("HOME", w / 2, h * 0.8);
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#e8b27a");
    sky.addColorStop(0.6, "#c4705c");
    sky.addColorStop(1, "#4a3a52");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "rgba(30,30,40,0.75)";
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w * 0.3, h * 0.5);
    ctx.lineTo(w * 0.55, h * 0.66);
    ctx.lineTo(w * 0.8, h * 0.46);
    ctx.lineTo(w, h * 0.6);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.fill();
    ctx.fillStyle = "rgba(255,240,210,0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.62, h * 0.32, 16, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "#f2efe4";
  ctx.lineWidth = 12;
  ctx.strokeRect(0, 0, w, h);
  noise(ctx, w, h, 8, 44 + kind);
  return canvasTexture(canvas);
}

export function noteTexture(lines = ["记得喝水", "检查 O2"], w = 192, h = 192) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e8d98a";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillRect(0, 0, w, 12);
  ctx.strokeStyle = "rgba(120,100,50,0.35)";
  ctx.lineWidth = 1;
  for (let y = 52; y < h; y += 30) {
    ctx.beginPath();
    ctx.moveTo(12, y);
    ctx.lineTo(w - 12, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#2c3b55";
  ctx.font = `italic 600 24px ${FONT}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  lines.forEach((line, i) => ctx.fillText(line, 16, 40 + i * 30));
  const rand = mulberry32(77);
  for (let i = 0; i < 30; i += 1) {
    ctx.fillStyle = `rgba(150,140,110,${0.05 + rand() * 0.08})`;
    ctx.fillRect(rand() * w, rand() * h, 3, 3);
  }
  return canvasTexture(canvas);
}

export function screenTexture() {
  const w = 512;
  const h = 320;
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const texture = canvasTexture(canvas);
  let phase = 0;
  let last = -1;
  const draw = (t) => {
    if (t - last < 0.09) return;
    last = t;
    phase += 0.09;
    ctx.fillStyle = "#08131c";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#0d2230";
    ctx.fillRect(0, 0, w, 34);
    ctx.fillStyle = "#7fe3d4";
    ctx.font = `700 20px ${MONO}`;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText("ORBITAL OPS  //  ISS-04", 12, 18);
    ctx.fillStyle = "#3f7f7a";
    ctx.font = `500 14px ${MONO}`;
    ctx.fillText("LINK  NOMINAL", 372, 18);
    // grid
    ctx.strokeStyle = "rgba(70,160,170,0.16)";
    ctx.lineWidth = 1;
    for (let x = 16; x < w - 12; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 48);
      ctx.lineTo(x, 200);
      ctx.stroke();
    }
    for (let y = 48; y <= 200; y += 38) {
      ctx.beginPath();
      ctx.moveTo(12, y);
      ctx.lineTo(w - 12, y);
      ctx.stroke();
    }
    // scrolling telemetry
    ctx.strokeStyle = "#39d7c6";
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let x = 12; x < w - 12; x += 2) {
      const u = (x + phase * 46) * 0.035;
      const y = 124 + Math.sin(u) * 26 + Math.sin(u * 2.7) * 9 + Math.sin(u * 0.5) * 14;
      if (x === 12) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.strokeStyle = "rgba(90,210,255,0.65)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let x = 12; x < w - 12; x += 2) {
      const u = (x + phase * 26) * 0.021;
      const y = 168 + Math.cos(u * 1.6) * 18;
      if (x === 12) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // numbers
    ctx.fillStyle = "#8ff0e2";
    ctx.font = `700 21px ${MONO}`;
    ctx.fillText(`ALT 402.6 km`, 16, 232);
    ctx.fillText(`VEL 7.66 km/s`, 16, 262);
    ctx.fillStyle = "#79c8d8";
    ctx.font = `600 17px ${MONO}`;
    ctx.fillText(`INC 51.64°`, 272, 232);
    ctx.fillText(`T+ 04:12:38`, 272, 262);
    // status bars
    ctx.fillStyle = "#123039";
    ctx.fillRect(16, 286, 300, 14);
    ctx.fillStyle = "#39d7c6";
    ctx.fillRect(16, 286, 190 + Math.sin(phase * 0.7) * 40, 14);
    ctx.fillStyle = "#e0a94a";
    ctx.beginPath();
    ctx.arc(462, 240, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6c8f96";
    ctx.font = `500 13px ${MONO}`;
    ctx.fillText("O2 21.0", 432, 276);
    texture.needsUpdate = true;
  };
  draw(0);
  return { texture, update: draw, canvas };
}

export function manualTexture(w = 256, h = 320) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#ece8da";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#b9b3a2";
  ctx.lineWidth = 1;
  for (let y = 40; y < h; y += 18) {
    ctx.beginPath();
    ctx.moveTo(14, y);
    ctx.lineTo(w - 14, y);
    ctx.stroke();
  }
  ctx.fillStyle = "#33352f";
  ctx.font = `700 18px ${FONT}`;
  ctx.textAlign = "left";
  ctx.fillText("ORBITAL MECHANICS", 14, 24);
  ctx.font = `500 11px ${FONT}`;
  ctx.fillStyle = "#5c5e56";
  for (let i = 0; i < 8; i += 1) {
    ctx.fillText("maintenance procedure / check list", 14, 58 + i * 18);
  }
  // diagram
  ctx.strokeStyle = "#3d6f86";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.72, 54, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.72, 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - 74, h * 0.72);
  ctx.lineTo(w * 0.5 + 74, h * 0.72);
  ctx.stroke();
  ctx.fillStyle = "#3d6f86";
  ctx.beginPath();
  ctx.arc(w * 0.5 + 54, h * 0.72, 5, 0, Math.PI * 2);
  ctx.fill();
  return canvasTexture(canvas);
}

export function blueprintTexture(w = 256, h = 256) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#e9e6d8";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#4b7f93";
  ctx.lineWidth = 1.4;
  for (let i = 0; i < 6; i += 1) {
    ctx.strokeRect(24 + i * 6, 30 + i * 4, 170 - i * 12, 120 - i * 8);
  }
  ctx.beginPath();
  ctx.moveTo(24, 190);
  ctx.lineTo(120, 190);
  ctx.moveTo(24, 200);
  ctx.lineTo(120, 200);
  ctx.stroke();
  ctx.fillStyle = "#4b7f93";
  ctx.font = `500 11px ${MONO}`;
  ctx.fillText("SECTION A-A  1:20", 24, 222);
  ctx.fillText("04 / HULL FRAME", 24, 238);
  ctx.strokeStyle = "#8fb8c6";
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 10; i += 1) {
    ctx.beginPath();
    ctx.moveTo(200, 40 + i * 10);
    ctx.lineTo(230, 40 + i * 10);
    ctx.stroke();
  }
  return canvasTexture(canvas);
}

export function netTexture(w = 128, h = 128) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  ctx.strokeStyle = "rgba(232,228,210,0.95)";
  ctx.lineWidth = 2.4;
  for (let i = -h; i < w + h; i += 16) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + h, h);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(i, h);
    ctx.lineTo(i + h, 0);
    ctx.stroke();
  }
  return canvasTexture(canvas);
}

export function leafTexture(w = 128, h = 128) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#4e8a3a");
  grad.addColorStop(0.5, "#6fae4a");
  grad.addColorStop(1, "#3c6e2c");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.04);
  ctx.bezierCurveTo(w * 0.98, h * 0.28, w * 0.92, h * 0.78, w * 0.5, h * 0.98);
  ctx.bezierCurveTo(w * 0.08, h * 0.78, w * 0.02, h * 0.28, w * 0.5, h * 0.04);
  ctx.fill();
  ctx.strokeStyle = "rgba(30,60,24,0.55)";
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.06);
  ctx.lineTo(w * 0.5, h * 0.95);
  ctx.stroke();
  ctx.lineWidth = 0.9;
  for (let i = 1; i < 7; i += 1) {
    const y = h * (0.12 + i * 0.11);
    ctx.beginPath();
    ctx.moveTo(w * 0.5, y);
    ctx.lineTo(w * 0.5 + w * 0.24 * (1 - i / 9), y + h * 0.06);
    ctx.moveTo(w * 0.5, y);
    ctx.lineTo(w * 0.5 - w * 0.24 * (1 - i / 9), y + h * 0.06);
    ctx.stroke();
  }
  // water droplets
  const rand = mulberry32(9);
  for (let i = 0; i < 7; i += 1) {
    const x = w * (0.3 + rand() * 0.4);
    const y = h * (0.2 + rand() * 0.55);
    ctx.fillStyle = "rgba(220,245,255,0.85)";
    ctx.beginPath();
    ctx.arc(x, y, 1.6 + rand() * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.fillRect(x - 1, y - 1.6, 1.2, 1.2);
  }
  return canvasTexture(canvas);
}

export function starTexture(w = 2048, h = 1024) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  const grad = ctx.createRadialGradient(w * 0.62, h * 0.4, 20, w * 0.62, h * 0.4, w * 0.55);
  grad.addColorStop(0, "#0b1420");
  grad.addColorStop(0.5, "#070b12");
  grad.addColorStop(1, "#03050a");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  const rand = mulberry32(2024);
  for (let i = 0; i < 2400; i += 1) {
    const x = rand() * w;
    const y = rand() * h;
    const r = rand() * 1.5 + 0.3;
    const a = 0.15 + rand() * 0.75;
    ctx.fillStyle = rand() > 0.85 ? `rgba(190,215,255,${a})` : `rgba(240,240,230,${a})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // faint nebula wash
  for (let i = 0; i < 5; i += 1) {
    const g = ctx.createRadialGradient(rand() * w, rand() * h, 0, rand() * w, rand() * h, 260);
    g.addColorStop(0, "rgba(40,70,120,0.06)");
    g.addColorStop(1, "rgba(40,70,120,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
  return canvasTexture(canvas);
}

export function controlPanelTexture(w = 256, h = 128) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#2b3034";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#6d747a";
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, w - 8, h - 8);
  ctx.fillStyle = "#1b1f22";
  roundRect(ctx, 14, 14, 100, 44, 4);
  ctx.fill();
  ctx.fillStyle = "#7fe6d8";
  ctx.font = `600 12px ${MONO}`;
  ctx.fillText("VIEW", 20, 30);
  ctx.fillText("MODE 02", 20, 48);
  ctx.fillStyle = "#c9c3ae";
  ctx.font = `500 9px ${FONT}`;
  ctx.fillText("SEAT CTRL", 132, 24);
  for (let i = 0; i < 3; i += 1) {
    ctx.fillStyle = "#141719";
    ctx.beginPath();
    ctx.arc(146 + i * 32, 56, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#565c60";
    ctx.stroke();
  }
  ctx.fillStyle = "#8fe0ff";
  ctx.fillRect(16, 78, 120, 4);
  ctx.fillStyle = "#3a4146";
  ctx.fillRect(16, 88, 120, 4);
  ctx.fillStyle = "#e0a94a";
  ctx.fillRect(16, 98, 70, 4);
  return canvasTexture(canvas);
}

export function foodBagTexture(w = 128, h = 160) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#c9a86a";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#e7dcc0";
  ctx.fillRect(8, 30, w - 16, h - 60);
  ctx.fillStyle = "#7a4a2c";
  ctx.font = `700 16px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("RATIONS", w / 2, 20);
  ctx.fillStyle = "#b4552f";
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.5, 26, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2f2418";
  ctx.font = `600 10px ${FONT}`;
  ctx.fillText("FD-04", w / 2, h * 0.83);
  return canvasTexture(canvas);
}

export function pouchTexture(color = "#7c8a63", w = 128, h = 96) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(0, 0, w, 10);
  ctx.strokeStyle = "rgba(0,0,0,0.25)";
  ctx.strokeRect(3, 3, w - 6, h - 6);
  ctx.fillStyle = "rgba(20,24,20,0.7)";
  ctx.font = `600 12px ${FONT}`;
  ctx.textAlign = "center";
  ctx.fillText("TOOLS", w / 2, h / 2 + 4);
  return canvasTexture(canvas);
}

export function wearTexture(w = 512, h = 512) {
  const canvas = makeCanvas(w, h);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  const rand = mulberry32(303);
  for (let i = 0; i < 70; i += 1) {
    const x = rand() * w;
    const y = rand() * h;
    const r = 8 + rand() * 42;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, `rgba(40,42,40,${0.04 + rand() * 0.07})`);
    g.addColorStop(1, "rgba(40,42,40,0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  for (let i = 0; i < 40; i += 1) {
    ctx.strokeStyle = `rgba(30,32,30,${0.05 + rand() * 0.1})`;
    ctx.lineWidth = 0.7 + rand() * 1.4;
    const x = rand() * w;
    const y = rand() * h;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + (rand() - 0.5) * 60, y + (rand() - 0.5) * 16);
    ctx.stroke();
  }
  return canvasTexture(canvas);
}
