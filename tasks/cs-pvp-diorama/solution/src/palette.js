import * as THREE from "three";

// 调色板：冷峻工业雨夜
export const C = {
  outline: 0x0c0f16,
  sky: 0x0a0e18,
  fog: 0x0a0e18,
  baseSide: 0x4b5158,
  baseTop: 0x62686f,
  asphalt: 0x24272e,
  concrete: 0x82888f,
  concreteDark: 0x5c626a,
  wallWarm: 0x8a7f6e,
  rust: 0x7c4327,
  rustLight: 0x9a5c33,
  metalBlue: 0x3a5872,
  metalBlueDark: 0x2c4459,
  metalGreen: 0x40584a,
  tin: 0x6d7880,
  tinDark: 0x525c64,
  wood: 0x77552f,
  woodLight: 0x97744a,
  cardboard: 0x8a6f4d,
  barrelBlue: 0x2d5f8a,
  barrelRust: 0x74432a,
  police: 0x27407c,
  vanWhite: 0xb9c2cb,
  accentRed: 0xa83232,
  glass: 0x9fb9cf,
  lampWarm: 0xffb45c,
  lampCold: 0xd8ecff,
  lampRed: 0xff4646,
  roadMark: 0x9aa2ab,
};

// toon 四阶渐变贴图
export function makeGradientMap() {
  const steps = new Uint8Array([90, 138, 192, 240]);
  const tex = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
  tex.needsUpdate = true;
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

export const gradientMap = makeGradientMap();

const matCache = new Map();

// 共享 toon 材质工厂
export function toon(color, opts = {}) {
  const key = `t:${color}:${opts.map ? opts.map.uuid : ""}:${opts.emissive ?? 0}:${opts.emissiveIntensity ?? 0}:${opts.side ?? 0}`;
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshToonMaterial({
    color,
    gradientMap,
    ...opts,
  });
  matCache.set(key, m);
  return m;
}

// 共享 standard 材质工厂（湿地/玻璃等需要高光的表面）
export function std(color, opts = {}) {
  const key = `s:${color}:${opts.map ? opts.map.uuid : ""}:${opts.roughness ?? 0.9}:${opts.metalness ?? 0}:${opts.transparent ? 1 : 0}:${opts.opacity ?? 1}`;
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({ color, roughness: 0.9, metalness: 0.0, ...opts });
  matCache.set(key, m);
  return m;
}

// ---------- canvas 程序化纹理 ----------

export function canvasTex(w, h, draw, opts = {}) {
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext("2d");
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(cv);
  if (opts.srgb !== false) tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = opts.anisotropy ?? 4;
  if (opts.repeat) {
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(opts.repeat[0], opts.repeat[1]);
  }
  return tex;
}

function rnd(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function speckle(ctx, w, h, n, seed, alpha = 0.12, light = "#ffffff", dark = "#000000") {
  const r = rnd(seed);
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i % 2 ? light : dark;
    ctx.globalAlpha = alpha * (0.4 + r() * 0.6);
    const s = 1 + r() * 2.2;
    ctx.fillRect(r() * w, r() * h, s, s);
  }
  ctx.globalAlpha = 1;
}

function stains(ctx, w, h, n, seed, color = "#000000", aMax = 0.14) {
  const r = rnd(seed);
  for (let i = 0; i < n; i++) {
    const x = r() * w, y = r() * h, rx = 12 + r() * 60, ry = 8 + r() * 40;
    const g = ctx.createRadialGradient(x, y, 2, x, y, Math.max(rx, ry));
    g.addColorStop(0, color);
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.globalAlpha = aMax * (0.4 + r() * 0.6);
    ctx.fillStyle = g;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx / Math.max(rx, ry), ry / Math.max(rx, ry));
    ctx.translate(-x, -y);
    ctx.beginPath();
    ctx.arc(x, y, Math.max(rx, ry), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

// 潮湿沥青 + 积水镂空遮罩（积水处 alpha 低 → 露出镜面）
export function asphaltOverlayTex(worldSize) {
  const S = 1024;
  const k = S / worldSize;
  const toX = (x) => (x + worldSize / 2) * k;
  const toY = (z) => (z + worldSize / 2) * k;
  return canvasTex(S, S, (ctx) => {
    ctx.fillStyle = "#22262d";
    ctx.fillRect(0, 0, S, S);
    stains(ctx, S, S, 42, 11, "#0c0e12", 0.28);
    stains(ctx, S, S, 18, 23, "#39404a", 0.18);
    speckle(ctx, S, S, 5200, 7, 0.16);

    const r = rnd(31);
    // 轮胎磨痕（弯道弧线）
    ctx.strokeStyle = "rgba(8,9,12,0.4)";
    for (let i = 0; i < 7; i++) {
      ctx.lineWidth = 5 + r() * 8;
      ctx.beginPath();
      const cx = toX(-4 + r() * 8), cy = toY(-2 + r() * 10), rad = 60 + r() * 130;
      ctx.arc(cx, cy, rad, r() * 2, r() * 2 + 1.2 + r());
      ctx.stroke();
    }
    // 中路中线虚线（磨损）
    ctx.fillStyle = "rgba(154,162,171,0.34)";
    for (let z = -8; z < 10; z += 1.6) {
      if (r() < 0.22) continue;
      ctx.fillRect(toX(-0.12), toY(z), 0.24 * k, 0.8 * k);
    }
    // 积水洼：低 alpha 深蓝，边缘柔和
    const puddles = [
      [0, 1.6, 2.6, 1.5], [-1.8, 4.8, 1.7, 1.1], [1.6, -4.2, 1.9, 1.2],
      [-8.5, -5.0, 2.1, 1.4], [-10.5, 2.0, 1.6, 1.1], [7.0, -2.6, 2.4, 1.6],
      [10.0, -1.2, 1.5, 1.0], [12.5, 2.8, 1.8, 1.2], [-6.0, 12.2, 2.2, 1.4],
      [2.0, 13.5, 1.8, 1.1], [-13.0, -6.5, 1.6, 1.0], [-15.5, 6.0, 1.5, 1.1],
      [15.6, 6.5, 1.4, 1.0], [5.0, 8.8, 1.6, 1.0], [-2.0, -6.8, 1.4, 0.9],
      [8.0, 14.0, 1.7, 1.0],
    ];
    for (const [px, pz, rx, rz] of puddles) {
      const g = ctx.createRadialGradient(toX(px), toY(pz), 1, toX(px), toY(pz), Math.max(rx, rz) * k);
      g.addColorStop(0, "rgba(10,16,26,0.95)");
      g.addColorStop(0.7, "rgba(10,16,26,0.9)");
      g.addColorStop(0.9, "rgba(10,16,26,0.4)");
      g.addColorStop(1, "rgba(10,16,26,0)");
      // 目标 alpha 低 → 用 destination-out 在不透明底上挖洞
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.translate(toX(px), toY(pz));
      ctx.scale(rx / Math.max(rx, rz), rz / Math.max(rx, rz));
      ctx.translate(-toX(px), -toY(pz));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(toX(px), toY(pz), Math.max(rx, rz) * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // 残留水面蓝黑色（乘回去一层低 alpha）
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.translate(toX(px), toY(pz));
      ctx.scale(rx / Math.max(rx, rz), rz / Math.max(rx, rz));
      ctx.translate(-toX(px), -toY(pz));
      const g2 = ctx.createRadialGradient(toX(px), toY(pz), 1, toX(px), toY(pz), Math.max(rx, rz) * k);
      g2.addColorStop(0, "#0a1220");
      g2.addColorStop(1, "rgba(10,18,32,0)");
      ctx.fillStyle = g2;
      ctx.beginPath();
      ctx.arc(toX(px), toY(pz), Math.max(rx, rz) * k, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // 下水道沟槽区域压暗（世界坐标 x 4.2..5.6, z -7.5..7.5）
    ctx.fillStyle = "rgba(5,6,9,0.75)";
    ctx.fillRect(toX(4.2), toY(-7.5), 1.4 * k, 15 * k);

    // 炸弹安放区白色喷漆标识（画进地面，避免透明层排序问题）
    drawBombZone(ctx, toX, toY, -9.8, -4.6, 3.6, "A", 91);
    drawBombZone(ctx, toX, toY, 7.2, -1.8, 3.4, "B", 97);
  }, { anisotropy: 8 });

  function drawBombZone(ctx, toX, toY, wx, wz, size, letter, seed) {
    const s = size * k;
    const r = rnd(seed);
    ctx.save();
    ctx.translate(toX(wx), toY(wz));
    ctx.strokeStyle = "rgba(236,240,244,0.85)";
    ctx.fillStyle = "rgba(236,240,244,0.85)";
    ctx.lineWidth = Math.max(3, s * 0.035);
    ctx.setLineDash([s * 0.14, s * 0.07]);
    ctx.strokeRect(-s / 2, -s / 2, s, s);
    ctx.setLineDash([]);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.round(s * 0.52)}px Arial Black, Arial, sans-serif`;
    ctx.fillText(letter, 0, -s * 0.04);
    ctx.font = `bold ${Math.round(s * 0.1)}px Consolas, monospace`;
    ctx.fillText(letter === "A" ? "BOMB SITE A" : "BOMB SITE B", 0, s * 0.36);
    // 喷漆磨损
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 500; i++) {
      ctx.globalAlpha = 0.35 * r();
      ctx.fillRect(-s / 2 + r() * s, -s / 2 + r() * s, 1 + r() * 2.4, 1 + r() * 2.4);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

export function concreteTex(seed = 5, base = "#7e848c") {
  return canvasTex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    stains(ctx, w, h, 26, seed, "#111418", 0.2);
    stains(ctx, w, h, 10, seed + 3, "#aab1b8", 0.16);
    speckle(ctx, w, h, 2600, seed + 7, 0.1);
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 2;
    for (let y = 128; y < h; y += 128) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }, { repeat: [1, 1] });
}

export function corrugatedTex(seed = 9, base = "#69747c", vertical = true) {
  return canvasTex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const step = 22;
    for (let i = 0; i < (vertical ? w : h) / step; i++) {
      const p = i * step;
      const g = vertical
        ? ctx.createLinearGradient(p, 0, p + step, 0)
        : ctx.createLinearGradient(0, p, 0, p + step);
      g.addColorStop(0, "rgba(0,0,0,0.34)");
      g.addColorStop(0.45, "rgba(255,255,255,0.14)");
      g.addColorStop(0.7, "rgba(0,0,0,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0.3)");
      ctx.fillStyle = g;
      if (vertical) ctx.fillRect(p, 0, step, h);
      else ctx.fillRect(0, p, w, step);
    }
    stains(ctx, w, h, 16, seed, "#5a3115", 0.4);
    // 锈迹流挂
    const r = rnd(seed + 2);
    for (let i = 0; i < 9; i++) {
      const x = r() * w, y = r() * h * 0.5;
      const g = ctx.createLinearGradient(x, y, x, y + 60 + r() * 120);
      g.addColorStop(0, "rgba(112,58,24,0.5)");
      g.addColorStop(1, "rgba(112,58,24,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x, y, 4 + r() * 10, 180);
    }
    speckle(ctx, w, h, 1400, seed + 5, 0.14);
  });
}

export function containerTex(base, code) {
  return canvasTex(512, 512, (ctx, w, h) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, w, h);
    const step = 32;
    for (let x = 0; x < w; x += step) {
      const g = ctx.createLinearGradient(x, 0, x + step, 0);
      g.addColorStop(0, "rgba(0,0,0,0.3)");
      g.addColorStop(0.5, "rgba(255,255,255,0.1)");
      g.addColorStop(1, "rgba(0,0,0,0.26)");
      ctx.fillStyle = g;
      ctx.fillRect(x, 0, step, h);
    }
    // 竖棱波纹压痕
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    for (let x = 0; x < w; x += step) ctx.fillRect(x, 0, 3, h);
    stains(ctx, w, h, 14, 17, "#3a2013", 0.34);
    speckle(ctx, w, h, 1200, 19, 0.13);
    // 货运编号与标牌
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.fillStyle = "rgba(235,238,240,0.9)";
    ctx.font = "bold 54px Consolas, monospace";
    ctx.fillText(code, 40, 300);
    ctx.font = "bold 26px Consolas, monospace";
    ctx.globalAlpha = 0.6;
    ctx.fillText("MAX GROSS 30480 KG", 40, 350);
    ctx.restore();
    // 边框
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, w - 10, h - 10);
  });
}

export function woodTex() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#7a5a33";
    ctx.fillRect(0, 0, w, h);
    const r = rnd(41);
    for (let y = 0; y < h; y += 42) {
      ctx.fillStyle = `rgba(0,0,0,${0.16 + r() * 0.1})`;
      ctx.fillRect(0, y, w, 3);
      ctx.fillStyle = `rgba(255,235,200,${0.05 + r() * 0.06})`;
      ctx.fillRect(0, y + 4, w, 8);
      for (let i = 0; i < 7; i++) {
        ctx.strokeStyle = `rgba(40,24,8,${0.1 + r() * 0.14})`;
        ctx.lineWidth = 1 + r();
        ctx.beginPath();
        const yy = y + 6 + r() * 32;
        ctx.moveTo(0, yy);
        ctx.bezierCurveTo(w * 0.3, yy + r() * 8 - 4, w * 0.6, yy + r() * 8 - 4, w, yy);
        ctx.stroke();
      }
    }
    // 板条与钉
    speckle(ctx, w, h, 500, 43, 0.12);
  });
}

export function cardboardTex() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.fillStyle = "#8a6f4c";
    ctx.fillRect(0, 0, w, h);
    stains(ctx, w, h, 10, 51, "#4a3820", 0.3);
    speckle(ctx, w, h, 700, 53, 0.1);
    ctx.fillStyle = "rgba(0,0,0,0.18)";
    ctx.fillRect(0, h * 0.48, w, 4);
    ctx.fillStyle = "rgba(200,190,170,0.5)";
    ctx.fillRect(w * 0.3, h * 0.2, 40, h * 0.6);
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.05, h * 0.05, w * 0.9, h * 0.9);
  });
}

export function barrierTex() {
  return canvasTex(256, 128, (ctx, w, h) => {
    ctx.fillStyle = "#c8ccd0";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#b23a30";
    for (let x = -h; x < w + h; x += 48) {
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + 24, 0);
      ctx.lineTo(x + 24 - h, h);
      ctx.lineTo(x - h, h);
      ctx.closePath();
      ctx.clip();
      ctx.fillRect(x - h, 0, h + 24, h);
      ctx.restore();
    }
    stains(ctx, w, h, 8, 61, "#3a3d42", 0.34);
    speckle(ctx, w, h, 400, 63, 0.12);
  });
}

// 喷涂涂鸦（透明底 decal）
export function graffitiTex(text, seed = 71, color = "#c8d4de", size = 256) {
  return canvasTex(size, Math.round(size * 0.5), (ctx, w, h) => {
    const r = rnd(seed);
    ctx.clearRect(0, 0, w, h);
    ctx.font = `bold ${Math.round(h * 0.52)}px Arial Black, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = color;
    ctx.shadowBlur = 10;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.fillText(text, w / 2, h / 2);
    ctx.fillText(text, w / 2, h / 2);
    ctx.shadowBlur = 0;
    // 流挂
    for (let i = 0; i < 10; i++) {
      const x = w * 0.2 + r() * w * 0.6;
      const y = h * 0.55 + r() * h * 0.1;
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.35 * r();
      ctx.fillRect(x, y, 2, 8 + r() * 22);
    }
    ctx.globalAlpha = 1;
  });
}

// 镂空模板喷字
export function stencilTex(text, color = "#dfe5ea", w = 512, h = 128, font = "bold 92px Consolas, monospace") {
  return canvasTex(w, h, (ctx) => {
    ctx.clearRect(0, 0, w, h);
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.88;
    ctx.fillText(text, w / 2, h / 2 + 4);
    // 磨损
    const r = rnd(83);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 900; i++) {
      ctx.globalAlpha = 0.5 * r();
      const s = 1 + r() * 3;
      ctx.fillRect(r() * w, r() * h, s, s);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  });
}

// 炸弹安放区白色喷漆标识
export function bombZoneTex(letter) {
  return canvasTex(512, 512, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(238,242,246,0.92)";
    ctx.lineWidth = 14;
    ctx.setLineDash([46, 20]);
    ctx.strokeRect(24, 24, w - 48, h - 48);
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(238,242,246,0.94)";
    ctx.font = "bold 300px Arial Black, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(letter, w / 2, h / 2 + 14);
    ctx.font = "bold 44px Consolas, monospace";
    ctx.fillText(letter === "A" ? "BOMB SITE A" : "BOMB SITE B", w / 2, h - 70);
    const r = rnd(letter === "A" ? 91 : 97);
    ctx.globalCompositeOperation = "destination-out";
    for (let i = 0; i < 700; i++) {
      ctx.globalAlpha = 0.4 * r();
      const s = 1 + r() * 3;
      ctx.fillRect(r() * w, r() * h, s, s);
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
  });
}

// 弹孔组（透明底 decal）
export function bulletHolesTex(seed = 101, n = 9) {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const r = rnd(seed);
    for (let i = 0; i < n; i++) {
      const x = w * 0.2 + r() * w * 0.6;
      const y = h * 0.2 + r() * h * 0.6;
      const rad = 4 + r() * 8;
      // 放射裂纹
      ctx.strokeStyle = "rgba(18,20,24,0.75)";
      for (let k = 0; k < 5; k++) {
        const a = r() * Math.PI * 2;
        ctx.lineWidth = 1 + r();
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(a) * rad * (1.6 + r() * 1.6), y + Math.sin(a) * rad * (1.6 + r() * 1.6));
        ctx.stroke();
      }
      const g = ctx.createRadialGradient(x, y, 1, x, y, rad);
      g.addColorStop(0, "rgba(5,6,8,0.98)");
      g.addColorStop(0.6, "rgba(20,22,26,0.85)");
      g.addColorStop(1, "rgba(20,22,26,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
  });
}

// 玻璃雨痕 alphaMap（滚动模拟雨水滑落）
export function glassStreakTex() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const r = rnd(113);
    for (let i = 0; i < 42; i++) {
      const x = r() * w;
      const y = r() * h;
      const len = 20 + r() * 90;
      const g = ctx.createLinearGradient(x, y, x, y + len);
      g.addColorStop(0, "rgba(255,255,255,0.5)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(x, y, 1.6 + r() * 2.2, len);
      ctx.beginPath();
      ctx.arc(x + 1.5, y + len, 1.6 + r() * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fill();
    }
  }, { repeat: [2, 2] });
}

// 警徽
export function policeEmblemTex() {
  return canvasTex(256, 256, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(214,226,238,0.92)";
    ctx.beginPath();
    ctx.moveTo(w / 2, 16);
    ctx.lineTo(w - 40, 60);
    ctx.lineTo(w - 40, 140);
    ctx.quadraticCurveTo(w - 40, 210, w / 2, h - 18);
    ctx.quadraticCurveTo(40, 210, 40, 140);
    ctx.lineTo(40, 60);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#27407c";
    ctx.font = "bold 120px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("★", w / 2, h / 2 - 8);
    ctx.font = "bold 30px Arial, sans-serif";
    ctx.fillText("POLICE", w / 2, h - 56);
  });
}

// CT 警戒横幅
export function cordonBannerTex() {
  return canvasTex(1024, 128, (ctx, w, h) => {
    ctx.fillStyle = "#1c2c50";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#e8edf2";
    ctx.font = "bold 64px SimHei, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.92;
    ctx.fillText("警 戒 区 域 · 严 禁 入 内", w / 2, h / 2 + 2);
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#e8b437";
    for (let x = 0; x < w; x += 64) ctx.fillRect(x, 0, 32, 10);
    stains(ctx, w, h, 8, 121, "#0a0d14", 0.3);
  });
}

// 值班表（B 点门卫室内墙）
export function dutyBoardTex() {
  return canvasTex(256, 320, (ctx, w, h) => {
    ctx.fillStyle = "#cfd4d8";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#2c3340";
    ctx.fillRect(10, 10, w - 20, 54);
    ctx.fillStyle = "#e8ecf0";
    ctx.font = "bold 30px SimHei, Microsoft YaHei, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("值 班 表", w / 2, 48);
    const r = rnd(131);
    ctx.strokeStyle = "rgba(60,70,84,0.7)";
    ctx.lineWidth = 2;
    for (let y = 86; y < h - 12; y += 34) {
      ctx.beginPath();
      ctx.moveTo(14, y);
      ctx.lineTo(w - 14, y);
      ctx.stroke();
      for (let x = 14; x <= w - 14; x += (w - 28) / 4) {
        ctx.beginPath();
        ctx.moveTo(x, y - 34 + 12);
        ctx.lineTo(x, y);
        ctx.stroke();
        if (r() < 0.5) {
          ctx.fillStyle = "rgba(40,50,66,0.8)";
          ctx.font = "20px Consolas, monospace";
          ctx.fillText(["早", "中", "晚", "休"][Math.floor(r() * 4)], x + (w - 28) / 8, y - 10);
        }
      }
    }
    stains(ctx, w, h, 6, 133, "#8a8478", 0.4);
  });
}

// 生锈铁格栅 alphaMap（排水沟盖）
export function grateAlphaTex() {
  return canvasTex(128, 128, (ctx, w, h) => {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    for (let x = 6; x < w; x += 20) ctx.fillRect(x, 0, 12, h);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.fillRect(0, 6, w, 6);
    ctx.fillRect(0, h - 12, w, 6);
  });
}

// 软圆点（蒸汽/雨雾精灵）
export function softDotTex() {
  return canvasTex(128, 128, (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,0.85)");
    g.addColorStop(0.4, "rgba(255,255,255,0.32)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}
