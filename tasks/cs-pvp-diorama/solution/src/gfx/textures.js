// 程序化贴图库：全部由 Canvas2D 运行时生成，零外部资源；种子固定，构建结果一致。
// 大面 512²、小道具 256²；可平铺表面 RepeatWrapping，贴花/精灵/天空 ClampToEdge。
import * as THREE from 'three';
import { makeRng, fbm2D, clamp, lerp } from './rng.js';
import { createCanvas, fillPixels, toTexture, normalTextureFromCanvas, grain, scratches, blobs } from './canvasTexture.js';

const BIG = 512;
const SMALL = 256;
const REPEAT = THREE.RepeatWrapping;
const CLAMP = THREE.ClampToEdgeWrapping;

// ---------- 内部工具 ----------

// 记忆化：同一张贴图只生成一次
const memo = (factory) => {
  let cached = null;
  return () => (cached || (cached = factory()));
};

const css = (hex, a = 1) => {
  const r = (hex >> 16) & 255;
  const g = (hex >> 8) & 255;
  const b = hex & 255;
  return a >= 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
};

const unit = (hex) => [((hex >> 16) & 255) / 255, ((hex >> 8) & 255) / 255, (hex & 255) / 255];
const mixUnit = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const cssUnit = (c, a = 1) => `rgba(${Math.round(c[0] * 255)},${Math.round(c[1] * 255)},${Math.round(c[2] * 255)},${a})`;

const rect = (ctx, x, y, w, h, style) => { ctx.fillStyle = style; ctx.fillRect(x, y, w, h); };
const disc = (ctx, x, y, r, style) => { ctx.fillStyle = style; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };
const line = (ctx, x0, y0, x1, y1, style, width) => { ctx.strokeStyle = style; if (width !== undefined) ctx.lineWidth = width; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); };

// 多边形：填色 + 可选描边（顺序与手写一致）
function shape(ctx, pts, fill, stroke, width = 1) {
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
}

const radialDisc = (ctx, x, y, r, stops) => {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  for (let i = 0; i < stops.length; i += 1) g.addColorStop(stops[i][0], stops[i][1]);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};

function canvasOf(size, paint, height = size) {
  const { canvas, ctx } = createCanvas(size, height);
  paint(ctx, size, height);
  return canvas;
}

const pixelCanvas = (size, cb, height = size) => canvasOf(size, (ctx, s, h) => fillPixels(ctx, s, h, (x, y) => cb(x, y, s)), height);

// 低频噪声层：半分辨率算 fbm 再放大，斑块柔和且四边仍可平铺
function noiseLayer(size, seed, shade, { octaves = 3, baseFrequency = 3, gain = 0.5 } = {}) {
  const half = Math.max(32, Math.round(size / 2));
  const fbm = fbm2D(seed, { octaves, baseFrequency, gain });
  const small = pixelCanvas(half, (x, y) => shade(fbm(x / half, y / half)));
  return canvasOf(size, (ctx) => {
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(small, 0, 0, size, size);
  });
}

// 先在独立图层画图案，再 3×3 合成：跨边界的形状不破坏平铺
function seamless(ctx, size, paint) {
  const layer = canvasOf(size, paint);
  for (let oy = -1; oy <= 1; oy += 1) for (let ox = -1; ox <= 1; ox += 1) ctx.drawImage(layer, ox * size, oy * size);
}

// 常用输出：颜色图 + 由灰度高度图算出的法线图
function surface(size, seed, paintColor, paintHeight, strength = 2.2) {
  const color = canvasOf(size, (ctx, s) => paintColor(ctx, s, makeRng(seed)));
  const height = canvasOf(size, (ctx, s) => paintHeight(ctx, s, makeRng(seed + 17)));
  return { map: toTexture(color, { anisotropy: 8 }), normalMap: normalTextureFromCanvas(height, strength, 8) };
}

const maskTex = (canvas, anisotropy = 4) => toTexture(canvas, { wrap: REPEAT, srgb: false, anisotropy });
const decalTex = (size, paint, anisotropy = 4) => ({ map: toTexture(canvasOf(size, paint), { wrap: CLAMP, anisotropy, repeat: [1, 1] }) });

// 高度图底：灰底 + 颗粒 + 可选暗斑
function heightBase(ctx, s, rng, g, b) {
  ctx.fillStyle = css(0x808080);
  ctx.fillRect(0, 0, s, s);
  if (g) grain(ctx, s, s, rng, g);
  if (b) blobs(ctx, s, s, rng, b);
}

// 发丝裂纹：先描浅色崩落，再描深色缝隙
function cracks(ctx, size, rng, { count = 6, span = 0.3, width = 1.2 } = {}) {
  ctx.lineCap = 'round';
  for (let i = 0; i < count; i += 1) {
    const pts = [[rng.range(0, size), rng.range(0, size)]];
    let a = rng.range(0, Math.PI * 2);
    const steps = rng.int(4, 9);
    const seg = (size * span) / steps;
    for (let k = 0; k < steps; k += 1) {
      const last = pts[pts.length - 1];
      a += rng.range(-0.75, 0.75);
      pts.push([last[0] + Math.cos(a) * seg, last[1] + Math.sin(a) * seg]);
    }
    const trace = () => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length; k += 1) ctx.lineTo(pts[k][0], pts[k][1]);
      ctx.stroke();
    };
    ctx.strokeStyle = 'rgba(226,224,216,0.10)';
    ctx.lineWidth = width * 2.8;
    trace();
    ctx.strokeStyle = 'rgba(24,24,26,0.36)';
    ctx.lineWidth = width * rng.range(0.6, 1.3);
    trace();
  }
}

// 从某条水平线往下淌的水痕 / 锈痕
function drips(ctx, size, rng, { count = 20, from = [0, 0.6], len = [0.08, 0.42], width = [1.5, 6], alpha = [0.05, 0.15], tone = '18,16,14' } = {}) {
  for (let i = 0; i < count; i += 1) {
    const x = rng.range(0, size);
    const top = size * (from[0] + rng.range(0, from[1]));
    const l = size * rng.range(len[0], len[1]);
    const w = rng.range(width[0], width[1]);
    ctx.fillStyle = `rgba(${tone},${rng.range(alpha[0], alpha[1])})`;
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x + w, top + rng.range(0, w));
    ctx.lineTo(x + w * rng.range(0.35, 1.1), top + l);
    ctx.lineTo(x - w * rng.range(0.05, 0.35), top + l * rng.range(0.65, 1));
    ctx.closePath();
    ctx.fill();
  }
}

// 一团不规则污渍（多个椭圆叠加）
function stain(ctx, size, rng, { x, y, radius, color, parts = 7 }) {
  ctx.fillStyle = color;
  for (let i = 0; i < parts; i += 1) {
    const r = radius * rng.range(0.3, 1);
    const cx = (x + rng.around(0, radius * 0.8)) * size;
    const cy = (y + rng.around(0, radius * 0.8)) * size;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * size, r * size * rng.range(0.55, 1.3), rng.range(0, Math.PI), 0, Math.PI * 2);
    ctx.fill();
  }
}

// 波浪长线：木纹 / 纤维
function wavyLine(ctx, size, rng, { y, amp = 4, color = 'rgba(70,50,32,0.22)', width = 1.2, vertical = false }) {
  const p1 = rng.int(1, 3);
  const p2 = rng.int(2, 5);
  const ph = rng.range(0, Math.PI * 2);
  const a1 = amp * rng.range(0.5, 1);
  const a2 = amp * rng.range(0.2, 0.6);
  const pts = [];
  for (let i = 0; i <= 24; i += 1) {
    const t = i / 24;
    const d = Math.sin(t * Math.PI * 2 * p1 + ph) * a1 + Math.sin(t * Math.PI * 2 * p2 + ph) * a2;
    pts.push(vertical ? [y + d, t * size] : [t * size, y + d]);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.stroke();
}

// 编织布：经纬线交错 + 明暗交替
function weave(ctx, size, rng, { step = 10, warp = 'rgba(0,0,0,0.16)', weft = 'rgba(255,255,255,0.09)' } = {}) {
  const n = Math.max(4, Math.round(size / step));
  ctx.lineWidth = Math.max(1.5, step * 0.24);
  for (let i = 0; i < n; i += 1) {
    const p = i * (size / n) + rng.range(-0.5, 0.5);
    line(ctx, p, 0, p, size, i % 2 === 0 ? warp : weft);
    line(ctx, 0, p, size, p, i % 2 === 0 ? weft : warp);
  }
}

const nail = (ctx, x, y, r) => {
  disc(ctx, x, y, r, 'rgba(32,26,20,0.85)');
  disc(ctx, x - r * 0.3, y - r * 0.3, r * 0.45, 'rgba(232,228,216,0.45)');
};

// 掉漆斑：露出灰金属 + 锈边
function paintChip(ctx, rng, x, y, r) {
  const n = rng.int(5, 8);
  const pts = [];
  for (let i = 0; i < n; i += 1) {
    const a = (i / n) * Math.PI * 2;
    const rr = r * rng.range(0.55, 1.2);
    pts.push([x + Math.cos(a) * rr, y + Math.sin(a) * rr * rng.range(0.7, 1.25)]);
  }
  shape(ctx, pts, 'rgba(122,123,126,0.92)', 'rgba(118,64,28,0.5)', rng.range(1.5, 3.2));
  disc(ctx, x - r * 0.28, y - r * 0.28, r * 0.34, 'rgba(255,255,255,0.10)');
}

// 喷漆散点
function spray(ctx, rng, { x, y, r, color, count = 40, size = 1.8 }) {
  ctx.fillStyle = color;
  for (let i = 0; i < count; i += 1) {
    const a = rng.range(0, Math.PI * 2);
    const d = Math.sqrt(rng.next()) * r;
    const dot = rng.range(0.5, size);
    ctx.fillRect(x + Math.cos(a) * d, y + Math.sin(a) * d, dot, dot);
  }
}

// 磨损斑：destination-out 挖掉颜料，边缘柔和
function worn(ctx, size, rng, { count = 14, radius = [8, 30], strength = 0.85 } = {}) {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < count; i += 1) {
    const x = rng.range(0, size);
    const y = rng.range(0, size);
    const r = rng.range(radius[0], radius[1]);
    radialDisc(ctx, x, y, r, [[0, `rgba(0,0,0,${strength})`], [0.6, `rgba(0,0,0,${strength * 0.6})`], [1, 'rgba(0,0,0,0)']]);
  }
  ctx.restore();
}

// 手写涂鸦线条：分段描边以获得粗细变化
function scribble(ctx, rng, { x, y, w, h, color, width = 10 }) {
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = color;
  const steps = rng.int(6, 11);
  const pts = [];
  for (let i = 0; i <= steps; i += 1) {
    pts.push([x + (w * i) / steps, y + h * (0.5 + rng.range(-0.4, 0.4)) + (i % 2 === 0 ? -h * 0.14 : h * 0.14)]);
  }
  for (let i = 1; i < pts.length; i += 1) {
    line(ctx, pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], color, width * rng.range(0.45, 1.25));
  }
}

// ---------- 表面材质 ----------

export const concrete = memo(() => surface(BIG, 4201, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x8f8e89));
  // 大块明暗 + 骨料细斑
  ctx.drawImage(noiseLayer(s, 4202, (v) => [0.34 + v * 0.5, 0.34 + v * 0.49, 0.33 + v * 0.48, 0.5]), 0, 0);
  grain(ctx, s, s, rng, { count: 9000, minAlpha: 0.05, maxAlpha: 0.16, size: 1.8 });
  grain(ctx, s, s, rng, { count: 4200, minAlpha: 0.05, maxAlpha: 0.13, size: 1.5, dark: false });
  seamless(ctx, s, (lc) => {
    for (let i = 0; i < 18; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.04, 0.13), color: 'rgba(48,52,56,0.14)', parts: 6 });
    cracks(lc, s, rng, { count: 7, span: 0.28 });
    scratches(lc, s, s, rng, { count: 22, alpha: 0.05 });
  });
}, (ctx, s, rng) => {
  heightBase(ctx, s, rng, { count: 12000, minAlpha: 0.1, maxAlpha: 0.32, size: 2 });
  cracks(ctx, s, rng, { count: 7, span: 0.28 });
  blobs(ctx, s, s, rng, { count: 14, radius: [30, 90], color: 'rgba(0,0,0,0.12)' });
}, 1.5));

export const concreteWall = memo(() => surface(BIG, 4301, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x84817a));
  ctx.drawImage(noiseLayer(s, 4302, (v) => [0.36 + v * 0.44, 0.35 + v * 0.43, 0.33 + v * 0.42, 0.55]), 0, 0);
  grain(ctx, s, s, rng, { count: 7000, minAlpha: 0.04, maxAlpha: 0.14, size: 1.8 });
  // 横向模板缝 + 拉杆孔
  const seams = [0.25, 0.5, 0.75];
  for (let i = 0; i < seams.length; i += 1) {
    const y = seams[i] * s;
    rect(ctx, 0, y, s, 2.5, 'rgba(46,44,40,0.42)');
    rect(ctx, 0, y + 2.5, s, 1.6, 'rgba(214,211,202,0.16)');
    for (let k = 0; k < 3; k += 1) {
      const x = (0.2 + k * 0.3 + rng.range(-0.03, 0.03)) * s;
      const hy = y + rng.range(-8, 8);
      disc(ctx, x, hy, rng.range(4, 6), 'rgba(40,38,36,0.5)');
      disc(ctx, x, hy - 1.5, rng.range(2.5, 3.5), 'rgba(206,202,192,0.18)');
    }
  }
  // 顶部往下的雨渍、锈水、湿斑
  seamless(ctx, s, (lc) => {
    drips(lc, s, rng, { count: 26, from: [0, 0.12], len: [0.15, 0.6], width: [2, 9], alpha: [0.05, 0.14], tone: '38,42,44' });
    drips(lc, s, rng, { count: 7, from: [0, 0.05], len: [0.2, 0.75], width: [2, 6], alpha: [0.05, 0.1], tone: '132,72,34' });
    for (let i = 0; i < 10; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.range(0.05, 0.9), radius: rng.range(0.03, 0.1), color: 'rgba(52,56,58,0.14)', parts: 5 });
    cracks(lc, s, rng, { count: 4, span: 0.22 });
  });
  // 四角磕碰
  const corners = [[0, 0, 1], [1, 0, -1], [0, 1, 1], [1, 1, -1]];
  for (let i = 0; i < corners.length; i += 1) {
    const [cx, cy, dir] = corners[i];
    const w = rng.range(20, 46);
    const h = rng.range(14, 34);
    const pts = [[cx * s, cy * s], [cx * s + dir * w, cy * s], [cx * s + dir * rng.range(4, 12), cy * s + h]];
    shape(ctx, pts, 'rgba(196,192,182,0.5)', 'rgba(40,38,34,0.35)', 1.5);
  }
}, (ctx, s, rng) => {
  heightBase(ctx, s, rng, { count: 9000, minAlpha: 0.08, maxAlpha: 0.24, size: 2 });
  cracks(ctx, s, rng, { count: 6, span: 0.24 });
  const seams = [0.25, 0.5, 0.75];
  for (let i = 0; i < seams.length; i += 1) rect(ctx, 0, seams[i] * s, s, 2.5, 'rgba(40,40,40,0.75)');
  blobs(ctx, s, s, rng, { count: 16, radius: [24, 70], color: 'rgba(0,0,0,0.14)' });
}, 2.0));

export const concreteFloor = memo(() => surface(BIG, 4401, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0xa5a49e));
  ctx.drawImage(noiseLayer(s, 4402, (v) => [0.46 + v * 0.36, 0.46 + v * 0.36, 0.44 + v * 0.35, 0.5]), 0, 0);
  // 扫帚拉毛
  ctx.save();
  ctx.translate(s / 2, s / 2);
  ctx.rotate(-0.06);
  ctx.translate(-s / 2, -s / 2);
  for (let i = 0; i < 150; i += 1) {
    const y = rng.range(-20, s + 20);
    line(ctx, -10, y, s + 10, y + rng.range(-6, 6), rng.chance(0.5) ? 'rgba(255,255,255,0.1)' : 'rgba(60,58,54,0.09)', rng.range(0.6, 1.6));
  }
  ctx.restore();
  seamless(ctx, s, (lc) => {
    for (let i = 0; i < 9; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.05, 0.16), color: 'rgba(30,28,26,0.3)', parts: 8 });
    for (let i = 0; i < 5; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.03, 0.08), color: 'rgba(62,58,50,0.2)', parts: 5 });
    // 小磕坑
    for (let i = 0; i < 40; i += 1) {
      const x = rng.range(0, s);
      const y = rng.range(0, s);
      const r = rng.range(1.5, 4);
      disc(lc, x, y, r, 'rgba(52,50,48,0.5)');
      disc(lc, x - r * 0.3, y - r * 0.3, r * 0.5, 'rgba(236,234,226,0.3)');
    }
    scratches(lc, s, s, rng, { count: 30, alpha: 0.06 });
  });
  grain(ctx, s, s, rng, { count: 6000, minAlpha: 0.04, maxAlpha: 0.12, size: 1.6 });
}, (ctx, s, rng) => {
  heightBase(ctx, s, rng, { count: 8000, minAlpha: 0.08, maxAlpha: 0.22, size: 2 }, { count: 18, radius: [20, 60], color: 'rgba(0,0,0,0.1)' });
}, 1.2));

export const asphalt = memo(() => {
  const result = surface(BIG, 4501, (ctx, s, rng) => {
    rect(ctx, 0, 0, s, s, css(0x24262a));
    ctx.drawImage(noiseLayer(s, 4502, (v) => [0.08 + v * 0.22, 0.085 + v * 0.22, 0.095 + v * 0.24, 0.6]), 0, 0);
    seamless(ctx, s, (lc) => {
      // 修补块
      for (let i = 0; i < 3; i += 1) {
        const w = rng.range(0.25, 0.5) * s;
        const h = rng.range(0.15, 0.35) * s;
        lc.save();
        lc.translate(rng.range(0, s), rng.range(0, s));
        lc.rotate(rng.range(-0.06, 0.06));
        lc.fillStyle = rng.chance(0.5) ? 'rgba(54,52,50,0.55)' : 'rgba(28,28,30,0.6)';
        lc.fillRect(-w / 2, -h / 2, w, h);
        lc.strokeStyle = 'rgba(10,10,12,0.65)';
        lc.lineWidth = 3;
        lc.strokeRect(-w / 2, -h / 2, w, h);
        lc.restore();
      }
      // 沥青灌缝
      lc.lineCap = 'round';
      for (let i = 0; i < 6; i += 1) {
        lc.strokeStyle = 'rgba(8,8,10,0.5)';
        lc.lineWidth = rng.range(3, 7);
        let x = rng.range(0, s);
        let y = rng.range(0, s);
        lc.beginPath();
        lc.moveTo(x, y);
        for (let k = 0; k < 5; k += 1) {
          x += rng.range(-0.25, 0.25) * s;
          y += rng.range(-0.25, 0.25) * s;
          lc.lineTo(x, y);
        }
        lc.stroke();
      }
    });
    grain(ctx, s, s, rng, { count: 11000, minAlpha: 0.05, maxAlpha: 0.2, size: 1.7, dark: false });
    grain(ctx, s, s, rng, { count: 9000, minAlpha: 0.06, maxAlpha: 0.22, size: 1.6 });
    scratches(ctx, s, s, rng, { count: 20, alpha: 0.05 });
  }, (ctx, s, rng) => {
    heightBase(ctx, s, rng, { count: 22000, minAlpha: 0.12, maxAlpha: 0.42, size: 2.2 });
    grain(ctx, s, s, rng, { count: 9000, minAlpha: 0.1, maxAlpha: 0.3, size: 1.8, dark: false });
  }, 1.4);
  // 积水倾向遮罩：中频白色斑块 = 易积水处
  const wet = fbm2D(4510, { octaves: 3, baseFrequency: 5, gain: 0.55 });
  const detail = fbm2D(4511, { octaves: 2, baseFrequency: 16 });
  result.wetMask = maskTex(pixelCanvas(SMALL, (x, y, s) => {
    const v = wet(x / s, y / s) * 0.85 + detail(x / s, y / s) * 0.15;
    const t = clamp((v - 0.46) / 0.26, 0, 1);
    const g = t * t * (3 - 2 * t);
    return [g, g, g, 1];
  }));
  return result;
});

export const rustMetal = memo(() => surface(BIG, 4601, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x4a4b4d));
  // 多层阈值锈斑：由暗褐到橙黄
  ctx.drawImage(noiseLayer(s, 4602, (v) => {
    const t = clamp((v - 0.38) / 0.4, 0, 1);
    const c = mixUnit(unit(0x5c3a20), unit(0x9a5c2c), t);
    return [c[0], c[1], c[2], t * 0.82];
  }, { baseFrequency: 4 }), 0, 0);
  ctx.drawImage(noiseLayer(s, 4603, (v) => {
    const t = clamp((v - 0.5) / 0.32, 0, 1);
    const c = mixUnit(unit(0x9a5c2c), unit(0xc08048), t);
    return [c[0], c[1], c[2], t * 0.78];
  }, { baseFrequency: 8, octaves: 4 }), 0, 0);
  ctx.drawImage(noiseLayer(s, 4604, (v) => {
    const t = clamp((v - 0.6) / 0.3, 0, 1);
    const c = unit(0x6b3d1c);
    return [c[0], c[1], c[2], t * 0.7];
  }, { baseFrequency: 14, octaves: 3 }), 0, 0);
  seamless(ctx, s, (lc) => {
    drips(lc, s, rng, { count: 24, from: [0, 0.7], len: [0.1, 0.5], width: [2, 8], alpha: [0.08, 0.22], tone: '120,62,26' });
    for (let i = 0; i < 260; i += 1) disc(lc, rng.range(0, s), rng.range(0, s), rng.range(0.8, 2.6), `rgba(26,18,12,${rng.range(0.3, 0.7)})`);
  });
  // 边缘残留暗金属
  ctx.strokeStyle = 'rgba(56,58,62,0.5)';
  ctx.lineWidth = 26;
  ctx.strokeRect(13, 13, s - 26, s - 26);
  scratches(ctx, s, s, rng, { count: 40, alpha: 0.08, light: true });
  grain(ctx, s, s, rng, { count: 6000, minAlpha: 0.04, maxAlpha: 0.14, size: 1.8 });
}, (ctx, s, rng) => {
  ctx.fillStyle = css(0x808080);
  ctx.fillRect(0, 0, s, s);
  ctx.drawImage(noiseLayer(s, 4605, (v) => [0.3 + v * 0.5, 0.3 + v * 0.5, 0.3 + v * 0.5, 0.8], { baseFrequency: 8 }), 0, 0);
  for (let i = 0; i < 200; i += 1) disc(ctx, rng.range(0, s), rng.range(0, s), rng.range(0.8, 2.4), 'rgba(40,40,40,0.7)');
  grain(ctx, s, s, rng, { count: 9000, minAlpha: 0.1, maxAlpha: 0.3, size: 2 });
}, 2.4));

const paintedCache = new Map();

// 漆面颜色由 hex 决定，按色值分别记忆化
export function paintedMetal(hexColor = 0x3b6ea5) {
  const key = hexColor >>> 0;
  if (!paintedCache.has(key)) paintedCache.set(key, buildPaintedMetal(key));
  return paintedCache.get(key);
}

function buildPaintedMetal(hex) {
  const seed = 4701 + (hex % 97);
  return surface(BIG, seed, (ctx, s, rng) => {
    rect(ctx, 0, 0, s, s, css(hex));
    // 漆面明暗起伏 + 灰尘膜
    ctx.drawImage(noiseLayer(s, seed + 1, (v) => [0.5 + v * 0.5, 0.5 + v * 0.5, 0.5 + v * 0.5, 0.18], { baseFrequency: 6 }), 0, 0);
    ctx.drawImage(noiseLayer(s, seed + 2, (v) => [0.72 + v * 0.16, 0.69 + v * 0.16, 0.62 + v * 0.15, 0.16 * v], { baseFrequency: 12, octaves: 4 }), 0, 0);
    seamless(ctx, s, (lc) => {
      for (let i = 0; i < 30; i += 1) paintChip(lc, rng, rng.range(0, s), rng.range(0, s), rng.range(3, 13));
      drips(lc, s, rng, { count: 16, from: [0, 0.7], len: [0.12, 0.5], width: [2, 7], alpha: [0.04, 0.12], tone: '24,26,28' });
      drips(lc, s, rng, { count: 5, from: [0, 0.4], len: [0.15, 0.45], width: [2, 5], alpha: [0.05, 0.12], tone: '122,64,26' });
    });
    ctx.strokeStyle = 'rgba(150,150,152,0.35)';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, s - 10, s - 10);
    scratches(ctx, s, s, rng, { count: 45, alpha: 0.09, light: true });
    scratches(ctx, s, s, rng, { count: 25, alpha: 0.07 });
    grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.03, maxAlpha: 0.1, size: 1.6 });
  }, (ctx, s, rng) => {
    ctx.fillStyle = css(0x808080);
    ctx.fillRect(0, 0, s, s);
    for (let i = 0; i < 30; i += 1) disc(ctx, rng.range(0, s), rng.range(0, s), rng.range(3, 12), 'rgba(50,50,50,0.6)');
    ctx.strokeStyle = 'rgba(60,60,60,0.5)';
    ctx.lineWidth = 10;
    ctx.strokeRect(5, 5, s - 10, s - 10);
    grain(ctx, s, s, rng, { count: 8000, minAlpha: 0.08, maxAlpha: 0.24, size: 2 });
  }, 1.8);
}

export const corrugated = memo(() => {
  const size = BIG;
  const ribs = 8;
  // 梯形波纹剖面：顶面平、两侧陡，硬表面感强
  const profile = (p) => (p < 0.3 ? p / 0.3 : p < 0.7 ? 1 : (1 - p) / 0.3);
  const color = canvasOf(size, (ctx, s) => {
    const rng = makeRng(4801);
    const tones = [];
    for (let i = 0; i < ribs; i += 1) tones.push(rng.range(-0.04, 0.04));
    fillPixels(ctx, s, s, (x, y) => {
      const u = (x / s) * ribs;
      const h = profile(u - Math.floor(u));
      const base = mixUnit(unit(0x6d7275), unit(0xafb5b8), h * h);
      const t = tones[Math.floor(u) % ribs] - clamp(y / s, 0, 1) * 0.05;
      return [clamp(base[0] + t, 0, 1), clamp(base[1] + t, 0, 1), clamp(base[2] + t, 0, 1), 1];
    });
    // 顶部往下的锈水 + 螺丝行 + 擦痕
    seamless(ctx, s, (lc) => {
      drips(lc, s, rng, { count: 22, from: [0, 0.14], len: [0.12, 0.55], width: [2, 7], alpha: [0.06, 0.18], tone: '126,68,28' });
      for (let i = 0; i < ribs; i += 1) {
        const cx = (i + 0.5) * (s / ribs);
        const ys = [0.05 * s, 0.95 * s];
        for (let k = 0; k < ys.length; k += 1) {
          disc(lc, cx, ys[k], 7, 'rgba(30,30,32,0.8)');
          disc(lc, cx - 2, ys[k] - 2, 3.4, 'rgba(220,220,214,0.25)');
        }
      }
    });
    scratches(ctx, s, s, rng, { count: 40, alpha: 0.08, light: true });
    grain(ctx, s, s, rng, { count: 4000, minAlpha: 0.03, maxAlpha: 0.1, size: 1.6 });
  });
  const height = canvasOf(size, (ctx, s) => {
    fillPixels(ctx, s, s, (x) => {
      const u = (x / s) * ribs;
      const g = 0.25 + profile(u - Math.floor(u)) * 0.7;
      return [g, g, g, 1];
    });
    for (let i = 0; i < ribs; i += 1) {
      const cx = (i + 0.5) * (s / ribs);
      disc(ctx, cx, 0.05 * s, 7, 'rgba(40,40,40,0.9)');
      disc(ctx, cx, 0.95 * s, 7, 'rgba(40,40,40,0.9)');
    }
  });
  return { map: toTexture(color, { anisotropy: 8 }), normalMap: normalTextureFromCanvas(height, 2.6, 8) };
});

export const wood = memo(() => surface(BIG, 4901, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x9a8461));
  const rows = 5;
  const ph = s / rows;
  for (let i = 0; i < rows; i += 1) {
    const y = i * ph;
    rect(ctx, 0, y, s, ph, cssUnit(mixUnit(unit(0x9c8560), unit(0x8a7a63), rng.next()), 0.9));
    // 木纹
    for (let g = 0; g < rng.int(16, 26); g += 1) {
      wavyLine(ctx, s, rng, { y: y + rng.range(2, ph - 2), amp: rng.range(1.5, 5), color: `rgba(74,54,32,${rng.range(0.1, 0.26)})`, width: rng.range(0.8, 2) });
    }
    // 节疤
    if (rng.chance(0.55)) {
      const kx = rng.range(0.15, 0.85) * s;
      const ky = y + rng.range(0.3, 0.7) * ph;
      const kr = rng.range(8, 16);
      for (let ring = 3; ring >= 1; ring -= 1) {
        ctx.strokeStyle = `rgba(70,50,30,${0.14 + ring * 0.06})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.ellipse(kx, ky, kr * ring * 0.45, kr * ring * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(58,40,24,0.7)';
      ctx.beginPath();
      ctx.ellipse(kx, ky, kr * 0.42, kr * 0.26, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // 板缝与钉子
    rect(ctx, 0, y, s, 2.5, 'rgba(46,34,20,0.55)');
    rect(ctx, 0, y + 2.5, s, 1.5, 'rgba(226,214,190,0.14)');
    nail(ctx, rng.range(12, 30), y + ph * 0.5, rng.range(2.6, 3.6));
    nail(ctx, s - rng.range(12, 30), y + ph * 0.5, rng.range(2.6, 3.6));
  }
  // 底部受潮变深：两端归零，保持可平铺
  ctx.drawImage(pixelCanvas(s, (x, y, ss) => {
    const t = clamp((y / ss - 0.55) / 0.45, 0, 1);
    return [0.15, 0.12, 0.09, 0.34 * Math.sin(Math.PI * t) ** 1.4];
  }), 0, 0);
  grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.04, maxAlpha: 0.12, size: 1.6 });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  const rows = 5;
  const ph = s / rows;
  for (let i = 0; i < rows; i += 1) {
    for (let g = 0; g < 12; g += 1) wavyLine(ctx, s, rng, { y: i * ph + rng.range(4, ph - 4), amp: rng.range(1, 3), color: 'rgba(40,40,40,0.22)', width: 1.2 });
    rect(ctx, 0, i * ph, s, 2.5, 'rgba(40,40,40,0.85)');
    nail(ctx, 20, i * ph + ph * 0.5, 3.4);
  }
  grain(ctx, s, s, rng, { count: 8000, minAlpha: 0.08, maxAlpha: 0.24, size: 2 });
}, 2.0));

export const crateWood = memo(() => surface(BIG, 5001, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x8f7852));
  const slats = 5;
  const sw = s / slats;
  for (let i = 0; i < slats; i += 1) {
    const x = i * sw;
    rect(ctx, x, 0, sw, s, cssUnit(mixUnit(unit(0x9a8259), unit(0x7f6b4b), rng.next()), 0.92));
    for (let g = 0; g < 14; g += 1) {
      wavyLine(ctx, s, rng, { y: x + rng.range(2, sw - 2), amp: rng.range(2, 6), vertical: true, color: `rgba(66,48,28,${rng.range(0.12, 0.3)})`, width: rng.range(0.8, 2.2) });
    }
    rect(ctx, x, 0, 2.5, s, 'rgba(40,28,16,0.6)');
  }
  // 上下两道横向压条
  const battens = [0.12, 0.76];
  for (let i = 0; i < battens.length; i += 1) {
    const y = battens[i] * s;
    const bh = 0.12 * s;
    rect(ctx, 0, y, s, bh, cssUnit(mixUnit(unit(0x7e6846), unit(0x8d7550), rng.next()), 0.95));
    for (let g = 0; g < 12; g += 1) {
      wavyLine(ctx, s, rng, { y: y + rng.range(3, bh - 3), amp: rng.range(1.5, 3.5), color: `rgba(60,44,26,${rng.range(0.1, 0.24)})`, width: 1.2 });
    }
    rect(ctx, 0, y, s, 2, 'rgba(44,32,18,0.55)');
    rect(ctx, 0, y + bh - 2, s, 2, 'rgba(44,32,18,0.55)');
    rect(ctx, 0, y + 2, s, 1.5, 'rgba(232,220,196,0.12)');
  }
  // 紧固件
  for (let i = 0; i < slats; i += 1) {
    const x = (i + 0.5) * sw;
    nail(ctx, x + rng.range(-2, 2), 0.18 * s, rng.range(3, 4));
    nail(ctx, x + rng.range(-2, 2), 0.82 * s, rng.range(3, 4));
  }
  // 中间褪色模板印
  ctx.strokeStyle = 'rgba(42,44,42,0.32)';
  ctx.lineWidth = 4;
  ctx.strokeRect(0.31 * s, 0.43 * s, 0.38 * s, 0.15 * s);
  rect(ctx, 0.35 * s, 0.48 * s, 0.3 * s, 5, 'rgba(42,44,42,0.22)');
  rect(ctx, 0.35 * s, 0.5 * s, 0.2 * s, 4, 'rgba(42,44,42,0.22)');
  // 边缘磕碰
  for (let i = 0; i < 26; i += 1) {
    const t = rng.range(0, s);
    const near = rng.chance(0.5) ? 0 : s - rng.range(3, 10);
    const horizontal = rng.chance(0.5);
    rect(ctx, horizontal ? t : near, horizontal ? near : t, rng.range(4, 14), rng.range(2, 5), 'rgba(224,212,188,0.35)');
  }
  grain(ctx, s, s, rng, { count: 6000, minAlpha: 0.04, maxAlpha: 0.13, size: 1.6 });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  const slats = 5;
  const sw = s / slats;
  for (let i = 0; i < slats; i += 1) {
    for (let g = 0; g < 10; g += 1) {
      wavyLine(ctx, s, rng, { y: i * sw + rng.range(3, sw - 3), amp: rng.range(1.5, 3.5), vertical: true, color: 'rgba(40,40,40,0.2)', width: 1.2 });
    }
    rect(ctx, i * sw, 0, 2.5, s, 'rgba(30,30,30,0.85)');
  }
  const battens = [0.12, 0.76];
  for (let i = 0; i < battens.length; i += 1) rect(ctx, 0, battens[i] * s, s, 0.12 * s, 'rgba(210,210,210,0.85)');
  for (let i = 0; i < slats; i += 1) {
    nail(ctx, (i + 0.5) * sw, 0.18 * s, 4);
    nail(ctx, (i + 0.5) * sw, 0.82 * s, 4);
  }
  grain(ctx, s, s, rng, { count: 9000, minAlpha: 0.08, maxAlpha: 0.26, size: 2 });
}, 2.2));

export const cardboard = memo(() => surface(BIG, 5101, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0xbf9463));
  ctx.drawImage(noiseLayer(s, 5102, (v) => [0.6 + v * 0.3, 0.5 + v * 0.28, 0.36 + v * 0.26, 0.42], { baseFrequency: 5 }), 0, 0);
  ctx.drawImage(noiseLayer(s, 5103, (v) => [0.5 + v * 0.5, 0.4 + v * 0.5, 0.28 + v * 0.5, 0.14 * v], { baseFrequency: 14, octaves: 4 }), 0, 0);
  // 瓦楞：竖向细线，中部更明显
  for (let x = 0; x < s; x += 9) {
    const mid = Math.sin((x / s) * Math.PI * 6) * 0.5 + 0.5;
    rect(ctx, x, 0, 2, s, `rgba(126,94,58,${0.1 + mid * 0.08})`);
    rect(ctx, x + 2, 0, 1.6, s, `rgba(236,212,178,${0.08 + mid * 0.08})`);
  }
  rect(ctx, 0, 0.22 * s, s, 0.56 * s, 'rgba(120,88,52,0.12)');
  // 中央斜贴胶带
  ctx.save();
  ctx.translate(s / 2, s / 2);
  ctx.rotate(-0.12);
  rect(ctx, -s, -0.062 * s, s * 2, 0.124 * s, 'rgba(196,178,142,0.55)');
  rect(ctx, -s, -0.062 * s, s * 2, 3, 'rgba(232,220,190,0.35)');
  rect(ctx, -s, 0.056 * s, s * 2, 3, 'rgba(232,220,190,0.35)');
  for (let i = 0; i < 90; i += 1) {
    rect(ctx, rng.range(-s, s), rng.range(-0.05 * s, 0.05 * s), rng.range(6, 26), rng.range(1, 2.4), `rgba(255,252,240,${rng.range(0.05, 0.18)})`);
  }
  ctx.restore();
  // 撕裂口
  ctx.save();
  ctx.translate(0.16 * s, 0.72 * s);
  const pts = [[0, 0]];
  let tx = 0;
  let ty = 0;
  for (let i = 0; i < 9; i += 1) {
    tx += rng.range(6, 16);
    ty += rng.range(-9, 9);
    pts.push([tx, ty]);
  }
  pts.push([tx, ty + rng.range(16, 30)]);
  for (let i = 0; i < 9; i += 1) {
    tx -= rng.range(6, 16);
    ty += rng.range(-6, 6);
    pts.push([tx, ty + rng.range(16, 30)]);
  }
  shape(ctx, pts, 'rgba(58,40,22,0.85)', 'rgba(238,214,180,0.4)', 2);
  ctx.restore();
  // 四角磨脏
  const corners = [[0, 0], [1, 0], [0, 1], [1, 1]];
  for (let i = 0; i < corners.length; i += 1) {
    const [cx, cy] = corners[i];
    const g = ctx.createRadialGradient(cx * s, cy * s, 0, cx * s, cy * s, s * 0.28);
    g.addColorStop(0, 'rgba(96,70,42,0.32)');
    g.addColorStop(1, 'rgba(96,70,42,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  }
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  for (let x = 0; x < s; x += 9) rect(ctx, x, 0, 2, s, 'rgba(230,230,230,0.5)');
  rect(ctx, 0, 0.22 * s, s, 0.56 * s, 'rgba(200,200,200,0.7)');
  grain(ctx, s, s, rng, { count: 7000, minAlpha: 0.06, maxAlpha: 0.2, size: 1.8 });
}, 1.4));

export const sack = memo(() => surface(SMALL, 5201, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x8b7550));
  ctx.drawImage(noiseLayer(s, 5202, (v) => [0.42 + v * 0.5, 0.36 + v * 0.45, 0.26 + v * 0.4, 0.55], { baseFrequency: 4 }), 0, 0);
  weave(ctx, s, rng, { step: 9, warp: 'rgba(38,26,12,0.26)', weft: 'rgba(255,244,214,0.13)' });
  // 底部浸水变深：两端归零，保持可平铺
  ctx.drawImage(pixelCanvas(s, (x, y, ss) => {
    const t = clamp((y / ss - 0.5) / 0.5, 0, 1);
    return [0.14, 0.11, 0.08, 0.4 * Math.sin(Math.PI * t) ** 1.2];
  }), 0, 0);
  seamless(ctx, s, (lc) => {
    for (let i = 0; i < 8; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.06, 0.18), color: 'rgba(44,36,22,0.16)', parts: 6 });
    for (let i = 0; i < 30; i += 1) rect(lc, rng.range(0, s), rng.range(0, s), rng.range(1, 3), rng.range(4, 12), `rgba(246,238,214,${rng.range(0.05, 0.16)})`);
  });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  weave(ctx, s, rng, { step: 9, warp: 'rgba(0,0,0,0.4)', weft: 'rgba(255,255,255,0.3)' });
  grain(ctx, s, s, rng, { count: 6000, minAlpha: 0.08, maxAlpha: 0.26, size: 1.8 });
}, 2.2));

export const rubber = memo(() => surface(SMALL, 5301, (ctx, s, rng) => {
  // 先铺沟槽里的积灰，再盖橡胶胎块，沟槽自然显灰
  rect(ctx, 0, 0, s, s, css(0x5c5b52));
  grain(ctx, s, s, rng, { count: 4000, minAlpha: 0.08, maxAlpha: 0.24, size: 1.8 });
  const rows = 8;
  const rh = s / rows;
  const bw = s / 6;
  for (let r = 0; r < rows; r += 1) {
    for (let c = -1; c <= 6; c += 1) {
      ctx.save();
      ctx.translate(c * bw + (r % 2 === 0 ? 0 : bw * 0.5), r * rh + rh * 0.5);
      ctx.rotate((r % 2 === 0 ? 1 : -1) * 0.6);
      rect(ctx, -bw * 0.34, -rh * 0.38, bw * 0.68, rh * 0.76, rng.chance(0.12) ? css(0x4a4a4c) : css(0x2a2b2e));
      rect(ctx, -bw * 0.34, -rh * 0.38, bw * 0.68, rh * 0.14, 'rgba(255,255,255,0.05)');
      ctx.restore();
    }
  }
  grain(ctx, s, s, rng, { count: 2500, minAlpha: 0.04, maxAlpha: 0.14, size: 1.6 });
  scratches(ctx, s, s, rng, { count: 30, alpha: 0.07, light: true });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x606060));
  const rows = 8;
  const rh = s / rows;
  const bw = s / 6;
  for (let r = 0; r < rows; r += 1) {
    for (let c = -1; c <= 6; c += 1) {
      ctx.save();
      ctx.translate(c * bw + (r % 2 === 0 ? 0 : bw * 0.5), r * rh + rh * 0.5);
      ctx.rotate((r % 2 === 0 ? 1 : -1) * 0.6);
      rect(ctx, -bw * 0.34, -rh * 0.38, bw * 0.68, rh * 0.76, 'rgba(225,225,225,0.9)');
      ctx.restore();
    }
  }
  grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.1, maxAlpha: 0.3, size: 1.8 });
}, 2.4));

export const plasticBarrier = memo(() => surface(SMALL, 5401, (ctx, s, rng) => {
  // 45° 斜条：周期整除边长 → 可平铺且边界依旧锐利
  const period = s / 4;
  fillPixels(ctx, s, s, (x, y) => (((x + y) % period) / period < 0.5 ? [0.72, 0.2, 0.16, 1] : [0.86, 0.84, 0.79, 1]));
  ctx.drawImage(noiseLayer(s, 5402, (v) => [0.5 + v * 0.5, 0.5 + v * 0.5, 0.5 + v * 0.5, 0.14], { baseFrequency: 8 }), 0, 0);
  // 上下模压边
  rect(ctx, 0, 0, s, 0.055 * s, 'rgba(120,32,28,0.9)');
  rect(ctx, 0, s - 0.055 * s, s, 0.055 * s, 'rgba(120,32,28,0.9)');
  rect(ctx, 0, 0.055 * s, s, 3, 'rgba(40,40,44,0.18)');
  rect(ctx, 0, s - 0.055 * s - 3, s, 3, 'rgba(40,40,44,0.18)');
  // 竖向加强筋
  for (let i = 1; i < 5; i += 1) {
    const x = (i / 5) * s;
    rect(ctx, x, 0.055 * s, 4, s - 0.11 * s, 'rgba(255,255,255,0.1)');
    rect(ctx, x + 4, 0.055 * s, 4, s - 0.11 * s, 'rgba(30,30,34,0.14)');
  }
  ctx.drawImage(noiseLayer(s, 5403, (v) => [0.25 + v * 0.2, 0.24 + v * 0.2, 0.22 + v * 0.18, 0.3 * v], { baseFrequency: 6, octaves: 4 }), 0, 0);
  grain(ctx, s, s, rng, { count: 3500, minAlpha: 0.05, maxAlpha: 0.18, size: 1.8 });
  scratches(ctx, s, s, rng, { count: 40, alpha: 0.1 });
  blobs(ctx, s, s, rng, { count: 8, radius: [10, 30], color: 'rgba(36,34,30,0.14)' });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  rect(ctx, 0, 0, s, 0.055 * s, 'rgba(225,225,225,0.85)');
  rect(ctx, 0, s - 0.055 * s, s, 0.055 * s, 'rgba(225,225,225,0.85)');
  for (let i = 1; i < 5; i += 1) rect(ctx, (i / 5) * s, 0.055 * s, 4, s - 0.11 * s, 'rgba(220,220,220,0.5)');
  grain(ctx, s, s, rng, { count: 6000, minAlpha: 0.08, maxAlpha: 0.26, size: 2 });
}, 1.4));

export const sandbag = memo(() => surface(SMALL, 5501, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0xa89b83));
  ctx.drawImage(noiseLayer(s, 5502, (v) => [0.5 + v * 0.42, 0.48 + v * 0.4, 0.42 + v * 0.36, 0.5], { baseFrequency: 6 }), 0, 0);
  weave(ctx, s, rng, { step: 6, warp: 'rgba(60,54,40,0.22)', weft: 'rgba(246,242,226,0.12)' });
  seamless(ctx, s, (lc) => {
    for (let i = 0; i < 9; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.05, 0.16), color: 'rgba(86,88,74,0.2)', parts: 6 });
    scratches(lc, s, s, rng, { count: 24, alpha: 0.07 });
  });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  weave(ctx, s, rng, { step: 6, warp: 'rgba(0,0,0,0.34)', weft: 'rgba(255,255,255,0.26)' });
  grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.08, maxAlpha: 0.24, size: 1.6 });
}, 1.8));

export const tarp = memo(() => surface(SMALL, 5601, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x4d5347));
  ctx.drawImage(noiseLayer(s, 5602, (v) => [0.16 + v * 0.26, 0.18 + v * 0.28, 0.15 + v * 0.24, 0.6], { baseFrequency: 5 }), 0, 0);
  // 折痕：深线 + 相邻亮边
  for (let i = 0; i < 11; i += 1) {
    const x0 = rng.range(-0.2, 1.2) * s;
    const y0 = rng.range(-0.2, 1.2) * s;
    const a = rng.range(-0.5, 0.5) + (rng.chance(0.5) ? 0 : Math.PI / 2);
    const dx = Math.cos(a) * s * 1.4;
    const dy = Math.sin(a) * s * 1.4;
    line(ctx, x0, y0, x0 + dx, y0 + dy, `rgba(12,16,12,${rng.range(0.14, 0.3)})`, rng.range(2, 6));
    line(ctx, x0 + rng.range(3, 9), y0 + rng.range(3, 9), x0 + dx + rng.range(3, 9), y0 + dy + rng.range(3, 9), `rgba(210,216,196,${rng.range(0.05, 0.13)})`, rng.range(1.5, 3.5));
  }
  // 微光泽 + 污渍
  const glow = ctx.createRadialGradient(s * 0.35, s * 0.3, 0, s * 0.35, s * 0.3, s * 0.8);
  glow.addColorStop(0, 'rgba(214,222,206,0.12)');
  glow.addColorStop(1, 'rgba(214,222,206,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, s, s);
  blobs(ctx, s, s, rng, { count: 10, radius: [16, 44], color: 'rgba(20,22,18,0.14)' });
  grain(ctx, s, s, rng, { count: 3000, minAlpha: 0.04, maxAlpha: 0.14, size: 1.6 });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x808080));
  for (let i = 0; i < 11; i += 1) {
    const x0 = rng.range(-0.2, 1.2) * s;
    const y0 = rng.range(-0.2, 1.2) * s;
    const a = rng.range(-0.5, 0.5) + (rng.chance(0.5) ? 0 : Math.PI / 2);
    line(ctx, x0, y0, x0 + Math.cos(a) * s * 1.4, y0 + Math.sin(a) * s * 1.4, 'rgba(30,30,30,0.7)', rng.range(2, 6));
  }
  grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.08, maxAlpha: 0.24, size: 1.8 });
}, 2.0));

export const checkeredPlate = memo(() => surface(BIG, 5701, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x6d7073));
  ctx.drawImage(noiseLayer(s, 5702, (v) => [0.4 + v * 0.28, 0.4 + v * 0.28, 0.41 + v * 0.28, 0.5], { baseFrequency: 6 }), 0, 0);
  // 花纹钢板：交错排列的菱形凸起，两面受光
  const step = s / 10;
  for (let r = 0; r < 10; r += 1) {
    for (let c = -1; c <= 10; c += 1) {
      ctx.save();
      ctx.translate(c * step + (r % 2 === 0 ? 0 : step * 0.5), (r + 0.5) * step);
      ctx.rotate((r % 2 === 0 ? 1 : -1) * 0.7);
      rect(ctx, -step * 0.34, -step * 0.1, step * 0.68, step * 0.2, 'rgba(198,202,204,0.5)');
      rect(ctx, -step * 0.34, 0, step * 0.68, step * 0.1, 'rgba(28,30,32,0.4)');
      ctx.restore();
    }
  }
  // 板缝
  rect(ctx, 0, 0, s, 3, 'rgba(34,36,38,0.5)');
  rect(ctx, 0, 0, 3, s, 'rgba(34,36,38,0.5)');
  seamless(ctx, s, (lc) => {
    for (let i = 0; i < 7; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.05, 0.15), color: 'rgba(26,24,20,0.3)', parts: 7 });
  });
  scratches(ctx, s, s, rng, { count: 60, alpha: 0.08, light: true });
  grain(ctx, s, s, rng, { count: 5000, minAlpha: 0.03, maxAlpha: 0.12, size: 1.6 });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x707070));
  const step = s / 10;
  for (let r = 0; r < 10; r += 1) {
    for (let c = -1; c <= 10; c += 1) {
      ctx.save();
      ctx.translate(c * step + (r % 2 === 0 ? 0 : step * 0.5), (r + 0.5) * step);
      ctx.rotate((r % 2 === 0 ? 1 : -1) * 0.7);
      rect(ctx, -step * 0.34, -step * 0.1, step * 0.68, step * 0.2, 'rgba(240,240,240,0.9)');
      ctx.restore();
    }
  }
  grain(ctx, s, s, rng, { count: 8000, minAlpha: 0.08, maxAlpha: 0.24, size: 2 });
}, 2.2));

export const glassDirty = memo(() => {
  const size = BIG;
  const grime = fbm2D(5801, { octaves: 4, baseFrequency: 5, gain: 0.55 });
  const fine = fbm2D(5802, { octaves: 3, baseFrequency: 22 });
  const runs = fbm2D(5805, { octaves: 2, baseFrequency: 18 }); // 沿 x 的细密雨水痕
  const runBreak = fbm2D(5806, { octaves: 2, baseFrequency: 4 }); // 沿 y 断续
  // 脏污湿膜叠加层（半透明）：污斑 + 竖向雨水流痕
  const mapCanvas = pixelCanvas(size, (x, y, s) => {
    const g = clamp((grime(x / s, y / s) - 0.4) / 0.5, 0, 1);
    const f = fine(x / s, y / s);
    const run = clamp((runs(x / s, 0.5) - 0.5) / 0.2, 0, 1) * clamp(0.5 + runBreak(0.5, y / s) * 0.7, 0, 1);
    const a = g * 0.5 * (0.5 + f * 0.6) + run * 0.34;
    return [0.2 + f * 0.12 + run * 0.18, 0.22 + f * 0.12 + run * 0.2, 0.2 + f * 0.12 + run * 0.22, clamp(a, 0, 1)];
  });
  // 玻璃本体透明度：大面基本不透明，污斑处略透
  const smudge = fbm2D(5803, { octaves: 4, baseFrequency: 6 });
  const alphaCanvas = pixelCanvas(size, (x, y, s) => {
    const a = 0.94 - clamp((smudge(x / s, y / s) - 0.45) / 0.5, 0, 1) * 0.16;
    return [a, a, a, 1];
  });
  // 水膜浮雕：滴珠 + 纵向流痕
  const heightCanvas = canvasOf(size, (ctx, s) => {
    const rng = makeRng(5804);
    rect(ctx, 0, 0, s, s, css(0x808080));
    for (let i = 0; i < 110; i += 1) {
      radialDisc(ctx, rng.range(0, s), rng.range(0, s), rng.range(3, 10), [[0, 'rgba(255,255,255,0.5)'], [1, 'rgba(128,128,128,0)']]);
    }
    for (let i = 0; i < 60; i += 1) {
      const x = rng.range(0, s);
      line(ctx, x, rng.range(0, s * 0.4), x + rng.range(-4, 4), rng.range(s * 0.5, s), `rgba(255,255,255,${rng.range(0.05, 0.16)})`, rng.range(1.5, 5));
    }
  });
  return {
    map: toTexture(mapCanvas, { anisotropy: 8 }),
    normalMap: normalTextureFromCanvas(heightCanvas, 1.4, 8),
    alpha: toTexture(alphaCanvas, { srgb: false, anisotropy: 8 }),
  };
});

export const gravel = memo(() => surface(BIG, 5901, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x4a423a));
  ctx.drawImage(noiseLayer(s, 5902, (v) => [0.2 + v * 0.22, 0.18 + v * 0.2, 0.15 + v * 0.18, 0.7], { baseFrequency: 5 }), 0, 0);
  // 成簇的碎石：亮面 + 暗影
  const pebbles = (lc) => {
    for (let c = 0; c < 14; c += 1) {
      const cx = rng.range(0, s);
      const cy = rng.range(0, s);
      const spread = rng.range(0.05, 0.14) * s;
      const n = rng.int(14, 30);
      for (let i = 0; i < n; i += 1) {
        const x = cx + rng.around(0, spread);
        const y = cy + rng.around(0, spread);
        const r = rng.range(1.8, 5.5);
        lc.fillStyle = cssUnit(mixUnit(unit(0x6a6157), unit(0x8d8474), rng.next()), 0.95);
        lc.beginPath();
        lc.ellipse(x, y, r, r * rng.range(0.6, 1.1), rng.range(0, Math.PI), 0, Math.PI * 2);
        lc.fill();
        disc(lc, x - r * 0.3, y - r * 0.3, r * 0.4, 'rgba(255,252,240,0.14)');
        disc(lc, x + r * 0.35, y + r * 0.35, r * 0.5, 'rgba(18,14,10,0.25)');
      }
    }
  };
  seamless(ctx, s, (lc) => {
    pebbles(lc);
    for (let i = 0; i < 12; i += 1) stain(lc, s, rng, { x: rng.next(), y: rng.next(), radius: rng.range(0.06, 0.18), color: 'rgba(26,22,18,0.28)', parts: 7 });
    grain(lc, s, s, rng, { count: 9000, minAlpha: 0.05, maxAlpha: 0.18, size: 1.8 });
  });
}, (ctx, s, rng) => {
  rect(ctx, 0, 0, s, s, css(0x606060));
  for (let c = 0; c < 14; c += 1) {
    const cx = rng.range(0, s);
    const cy = rng.range(0, s);
    const spread = rng.range(0.05, 0.14) * s;
    const n = rng.int(14, 30);
    for (let i = 0; i < n; i += 1) {
      const x = cx + rng.around(0, spread);
      const y = cy + rng.around(0, spread);
      const r = rng.range(1.8, 5.5);
      ctx.fillStyle = 'rgba(230,230,230,0.85)';
      ctx.beginPath();
      ctx.ellipse(x, y, r, r * rng.range(0.6, 1.1), rng.range(0, Math.PI), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  grain(ctx, s, s, rng, { count: 12000, minAlpha: 0.1, maxAlpha: 0.3, size: 2 });
}, 2.6));

// ---------- 特殊遮罩 / 精灵 ----------

export const puddleMask = memo(() => {
  const size = SMALL;
  const broad = fbm2D(6001, { octaves: 4, baseFrequency: 3, gain: 0.55 });
  const fine = fbm2D(6002, { octaves: 2, baseFrequency: 12 });
  return {
    map: maskTex(pixelCanvas(size, (x, y, s) => {
      const v = broad(x / s, y / s) * 0.84 + fine(x / s, y / s) * 0.16;
      const deep = clamp((v - 0.56) / 0.2, 0, 1);
      const damp = clamp((v - 0.42) / 0.14, 0, 1) * 0.55;
      const g = Math.max(deep, damp);
      return [g, g, g, 1];
    })),
  };
});

export const runoffStreak = memo(() => {
  const size = SMALL;
  const col = fbm2D(6101, { octaves: 3, baseFrequency: 8 }); // 沿 x 的密集竖直细痕
  const row = fbm2D(6102, { octaves: 3, baseFrequency: 3 }); // 沿 y 断续
  const dots = fbm2D(6103, { octaves: 2, baseFrequency: 24 });
  return {
    map: maskTex(pixelCanvas(size, (x, y, s) => {
      const u = x / s;
      const v = y / s;
      const a = clamp((col(u, 0.5) - 0.5) / 0.26, 0, 1) * clamp(0.35 + row(0.5, v) * 0.95, 0, 1) * (0.72 + dots(u, v) * 0.34);
      const g = 0.05 + clamp(a, 0, 1) * 0.95;
      return [g, g, g, 1];
    })),
  };
});

const spriteTex = (w, h, paint, anisotropy = 2) => toTexture(canvasOf(w, paint, h), { wrap: CLAMP, anisotropy, repeat: [1, 1] });

export const rainStreak = memo(() => ({
  map: spriteTex(32, 128, (ctx, s, h) => fillPixels(ctx, s, h, (x, y) => {
    const across = Math.exp(-((((x / (s - 1)) - 0.5) / 0.22) ** 2));
    const along = Math.sin(Math.PI * (y / (h - 1))) ** 0.85;
    return [0.86, 0.9, 0.96, across * along * 0.92];
  })),
}));

export const steamPuff = memo(() => {
  const fbm = fbm2D(6201, { octaves: 4, baseFrequency: 4, gain: 0.55 });
  return {
    map: spriteTex(128, 128, (ctx, s) => fillPixels(ctx, s, s, (x, y) => {
      const wob = fbm(x / s, y / s);
      // 半径被噪声扰动 → 边界不规则
      const r = Math.hypot(x / s - 0.5, y / s - 0.5) * 2.1 * (0.7 + wob * 0.75);
      const a = clamp(1 - r, 0, 1) ** 1.35 * (0.55 + wob * 0.5);
      return [0.94, 0.95, 0.97, clamp(a * 0.8, 0, 1)];
    }), 2),
  };
});

export const dripDroplet = memo(() => ({
  map: spriteTex(32, 64, (ctx, s, h) => fillPixels(ctx, s, h, (x, y) => {
    const u = (x / (s - 1)) * 2 - 1;
    const v = y / (h - 1);
    const rad = 0.16 + 0.74 * v ** 2.2; // 上尖下圆
    const d = Math.abs(u) / rad;
    const body = clamp(1 - d * d, 0, 1);
    const hl = Math.exp(-((((u + 0.34) / 0.2) ** 2) + (((v - 0.78) / 0.16) ** 2)));
    return [
      clamp(0.62 + body * 0.2 + hl * 0.3, 0, 1),
      clamp(0.72 + body * 0.2 + hl * 0.26, 0, 1),
      clamp(0.86 + body * 0.14 + hl * 0.2, 0, 1),
      body ** 0.75 * 0.92,
    ];
  })),
}));

export const skyGradient = memo(() => {
  const size = BIG;
  // 深藏青 → 70% 高度处的蓝绿地平带 → 底部更暗
  const stops = [
    [0, 0x070b16],
    [0.35, 0x0b1220],
    [0.62, 0x14212e],
    [0.7, 0x1d3a44],
    [0.76, 0x182a34],
    [0.88, 0x0d1520],
    [1, 0x070a11],
  ];
  const clouds = fbm2D(6301, { octaves: 4, baseFrequency: 3, gain: 0.55 });
  const canvas = pixelCanvas(size, (x, y, s) => {
    const v = y / s;
    let lo = stops[0];
    let hi = stops[stops.length - 1];
    for (let i = 0; i < stops.length - 1; i += 1) {
      if (v >= stops[i][0] && v <= stops[i + 1][0]) {
        lo = stops[i];
        hi = stops[i + 1];
        break;
      }
    }
    const t = hi[0] === lo[0] ? 0 : (v - lo[0]) / (hi[0] - lo[0]);
    const c = mixUnit(unit(lo[1]), unit(hi[1]), t);
    const cloud = (clouds(x / s, y / s) - 0.5) * 0.05;
    return [clamp(c[0] + cloud, 0, 1), clamp(c[1] + cloud * 1.05, 0, 1), clamp(c[2] + cloud * 1.12, 0, 1), 1];
  });
  return toTexture(canvas, { wrap: CLAMP, anisotropy: 4, repeat: [1, 1] });
});

// ---------- 贴花（背景透明，颜料褪色） ----------

export const graffitiSheet = memo(() => decalTex(BIG, (ctx, s) => {
  const rng = makeRng(6401);
  const palette = [['168,53,47', 0.72], ['46,125,138', 0.64], ['216,213,204', 0.78], ['181,155,58', 0.68]];
  const pa = (p, a) => `rgba(${p[0]},${a})`;
  // 喷漆底斑
  for (let i = 0; i < 7; i += 1) {
    const x = rng.range(0.12, 0.88) * s;
    const y = rng.range(0.12, 0.88) * s;
    const r = rng.range(0.05, 0.13) * s;
    const p = rng.pick(palette);
    radialDisc(ctx, x, y, r, [[0, pa(p, p[1] * 0.9)], [0.7, pa(p, p[1] * 0.35)], [1, 'rgba(0,0,0,0)']]);
    spray(ctx, rng, { x, y, r: r * 1.5, color: pa(p, p[1] * 0.22), count: 70, size: 2.2 });
  }
  // 三处手写标签 + 漆滴
  const tags = [
    { x: 0.1 * s, y: 0.22 * s, w: 0.5 * s, h: 0.12 * s, p: palette[0], wd: 13 },
    { x: 0.28 * s, y: 0.52 * s, w: 0.58 * s, h: 0.16 * s, p: palette[1], wd: 16 },
    { x: 0.08 * s, y: 0.74 * s, w: 0.42 * s, h: 0.1 * s, p: palette[2], wd: 11 },
  ];
  ctx.lineCap = 'round';
  for (let i = 0; i < tags.length; i += 1) {
    const t = tags[i];
    scribble(ctx, rng, { x: t.x, y: t.y, w: t.w, h: t.h, color: pa(t.p, t.p[1]), width: t.wd });
    for (let d = 0; d < 5; d += 1) {
      const dx = t.x + rng.range(0.05, 0.95) * t.w;
      const dy = t.y + t.h * rng.range(0.8, 1.1);
      line(ctx, dx, dy, dx + rng.range(-2, 2), dy + rng.range(0.03, 0.11) * s, pa(t.p, t.p[1] * 0.8), rng.range(2, 5));
    }
  }
  // 模板数字 7
  ctx.save();
  ctx.translate(0.66 * s, 0.3 * s);
  ctx.rotate(0.08);
  ctx.fillStyle = pa(palette[3], palette[3][1]);
  ctx.fillRect(0, 0, 0.15 * s, 0.035 * s);
  ctx.fillRect(0.085 * s, 0.03 * s, 0.038 * s, 0.14 * s);
  ctx.restore();
  // 灰浆洗刷：只落在已有笔迹上
  ctx.globalCompositeOperation = 'source-atop';
  for (let i = 0; i < 26; i += 1) {
    ctx.fillStyle = `rgba(34,36,34,${rng.range(0.06, 0.2)})`;
    ctx.beginPath();
    ctx.ellipse(rng.range(0, s), rng.range(0, s), rng.range(0.04, 0.16) * s, rng.range(0.03, 0.12) * s, rng.range(0, Math.PI), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';
  worn(ctx, s, rng, { count: 18, radius: [18, 54], strength: 0.5 });
}));

export const freightNumber = memo(() => decalTex(BIG, (ctx, s) => {
  const rng = makeRng(6501);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 104px "Arial Black", Impact, sans-serif';
  ctx.fillStyle = 'rgba(235,233,226,0.92)';
  ctx.fillText('CNTR-2049', s * 0.5, s * 0.4);
  ctx.font = 'bold 54px "Arial Black", Impact, sans-serif';
  ctx.fillStyle = 'rgba(235,233,226,0.8)';
  ctx.fillText('MAX 30.48 T', s * 0.5, s * 0.63);
  // 模板漏字缺口
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 14; i += 1) {
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(rng.range(0.1, 0.9) * s, rng.range(0.28, 0.36) * s, rng.range(4, 10), rng.range(18, 34));
  }
  ctx.restore();
  // 褪色与脏污
  ctx.save();
  ctx.globalCompositeOperation = 'source-atop';
  ctx.drawImage(noiseLayer(s, 6502, (v) => [0.35 + v * 0.3, 0.34 + v * 0.3, 0.32 + v * 0.3, 0.35 * (1 - v)]), 0, 0);
  ctx.restore();
  worn(ctx, s, rng, { count: 22, radius: [10, 34], strength: 0.75 });
}));

export const bulletHoles = memo(() => decalTex(BIG, (ctx, s) => {
  const rng = makeRng(6601);
  for (let i = 0; i < 30; i += 1) {
    const x = s * 0.5 + rng.around(0, s * 0.24);
    const y = s * 0.5 + rng.around(0, s * 0.24);
    const r = rng.range(4.5, 11);
    // 飞溅灰环
    radialDisc(ctx, x, y, r * 3.4, [[0, 'rgba(206,204,198,0.28)'], [1, 'rgba(206,204,198,0)']]);
    // 崩裂浅色边
    disc(ctx, x, y, r * 1.5, 'rgba(216,212,204,0.5)');
    ctx.strokeStyle = 'rgba(228,224,216,0.45)';
    ctx.lineWidth = 1.6;
    for (let k = 0; k < 7; k += 1) {
      const a = rng.range(0, Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(x + Math.cos(a) * r * 1.2, y + Math.sin(a) * r * 1.2);
      ctx.lineTo(x + Math.cos(a) * r * rng.range(1.8, 3.1), y + Math.sin(a) * r * rng.range(1.8, 3.1));
      ctx.stroke();
    }
    // 弹孔：中心近黑
    radialDisc(ctx, x, y, r, [[0, 'rgba(10,10,12,0.98)'], [0.7, 'rgba(28,26,24,0.95)'], [1, 'rgba(72,68,62,0.55)']]);
  }
  worn(ctx, s, rng, { count: 10, radius: [14, 40], strength: 0.35 });
}));

const siteMarkCache = new Map();

// 包点喷漆：A / B 两种字样，按字母分别缓存。
export function bombSiteMark(letter = 'A') {
  const key = letter === 'B' ? 'B' : 'A';
  if (!siteMarkCache.has(key)) {
    siteMarkCache.set(
      key,
      decalTex(SMALL, (ctx, s) => {
        const rng = makeRng(key === 'B' ? 6702 : 6701);
        const paint = 'rgba(238,236,228,0.9)';
        const soft = 'rgba(238,236,228,0.16)';
        ctx.save();
        ctx.translate(s * 0.5, s * 0.5);
        ctx.rotate(-0.06);
        ctx.lineCap = 'butt';
        // 方框 + 字母，先画淡边再画实边模拟飞散
        ctx.strokeStyle = soft;
        ctx.lineWidth = 34;
        ctx.strokeRect(-s * 0.33, -s * 0.33, s * 0.66, s * 0.66);
        ctx.strokeStyle = paint;
        ctx.lineWidth = 22;
        ctx.strokeRect(-s * 0.33, -s * 0.33, s * 0.66, s * 0.66);

        const glyph = () => {
          ctx.beginPath();
          if (key === 'A') {
            ctx.moveTo(-s * 0.1, s * 0.2);
            ctx.lineTo(0, -s * 0.18);
            ctx.lineTo(s * 0.1, s * 0.2);
            ctx.moveTo(-s * 0.06, s * 0.06);
            ctx.lineTo(s * 0.06, s * 0.06);
          } else {
            ctx.moveTo(-s * 0.07, s * 0.2);
            ctx.lineTo(-s * 0.07, -s * 0.19);
            ctx.moveTo(-s * 0.07, -s * 0.19);
            ctx.lineTo(s * 0.02, -s * 0.19);
            ctx.quadraticCurveTo(s * 0.13, -s * 0.1, s * 0.02, -s * 0.01);
            ctx.moveTo(-s * 0.07, -s * 0.01);
            ctx.lineTo(s * 0.04, -s * 0.01);
            ctx.quadraticCurveTo(s * 0.15, s * 0.09, s * 0.04, s * 0.2);
          }
        };
        glyph();
        ctx.strokeStyle = soft;
        ctx.lineWidth = 24;
        ctx.stroke();
        glyph();
        ctx.strokeStyle = paint;
        ctx.lineWidth = 16;
        ctx.stroke();
        ctx.restore();
        // 飞散点
        for (let i = 0; i < 420; i += 1) {
          spray(ctx, rng, { x: rng.range(0, s), y: rng.range(0, s), r: rng.range(2, 18), color: 'rgba(238,236,228,0.1)', count: 3, size: 2.4 });
        }
        worn(ctx, s, rng, { count: 20, radius: [10, 34], strength: 0.7 });
      }),
    );
  }
  return siteMarkCache.get(key);
}

export const policeBadge = memo(() => decalTex(SMALL, (ctx, s) => {
  const rng = makeRng(6801);
  const cx = s * 0.5;
  const cy = s * 0.5;
  const w = s * 0.5;
  const h = s * 0.62;
  const shield = () => {
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, cy - h / 2);
    ctx.lineTo(cx + w / 2, cy - h / 2);
    ctx.lineTo(cx + w / 2, cy + h * 0.06);
    ctx.quadraticCurveTo(cx + w * 0.46, cy + h * 0.32, cx, cy + h / 2);
    ctx.quadraticCurveTo(cx - w * 0.46, cy + h * 0.32, cx - w / 2, cy + h * 0.06);
    ctx.closePath();
  };
  shield();
  ctx.save();
  ctx.clip();
  rect(ctx, 0, 0, s, s, 'rgba(222,218,208,0.92)');
  rect(ctx, cx - w / 2, cy - h / 2, w, h * 0.16, 'rgba(44,74,122,0.85)');
  rect(ctx, cx - w / 2, cy + h * 0.2, w, h * 0.5, 'rgba(44,74,122,0.85)');
  // 星徽
  const star = [];
  for (let i = 0; i < 10; i += 1) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const r = i % 2 === 0 ? s * 0.14 : s * 0.062;
    star.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r - s * 0.04]);
  }
  shape(ctx, star, 'rgba(232,230,222,0.9)');
  // 文字条
  rect(ctx, cx - s * 0.12, cy + h * 0.3, s * 0.24, s * 0.02, 'rgba(228,226,218,0.72)');
  rect(ctx, cx - s * 0.08, cy + h * 0.36, s * 0.16, s * 0.016, 'rgba(228,226,218,0.72)');
  ctx.restore();
  // 描边 + 边缘龟裂
  shield();
  ctx.strokeStyle = 'rgba(28,34,44,0.7)';
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 60; i += 1) {
    const a = rng.range(0, Math.PI * 2);
    disc(ctx, cx + Math.cos(a) * w * rng.range(0.45, 0.55), cy + Math.sin(a) * h * rng.range(0.3, 0.52), rng.range(2, 8), 'rgba(0,0,0,0.8)');
  }
  ctx.restore();
  scratches(ctx, s, s, rng, { count: 40, alpha: 0.14, light: true });
  worn(ctx, s, rng, { count: 14, radius: [8, 26], strength: 0.6 });
}));

export const warningSign = memo(() => decalTex(SMALL, (ctx, s) => {
  const rng = makeRng(6901);
  const pad = s * 0.06;
  const w = s - pad * 2;
  rect(ctx, pad, pad, w, w, 'rgba(206,172,58,0.9)');
  ctx.strokeStyle = 'rgba(30,28,24,0.85)';
  ctx.lineWidth = 10;
  ctx.strokeRect(pad + 5, pad + 5, w - 10, w - 10);
  // 中部人字纹带
  const bandY = pad + w * 0.34;
  const bandH = w * 0.3;
  ctx.save();
  ctx.beginPath();
  ctx.rect(pad, bandY, w, bandH);
  ctx.clip();
  rect(ctx, pad, bandY, w, bandH, 'rgba(232,228,214,0.85)');
  const step = w / 4;
  for (let i = -1; i < 5; i += 1) {
    const pts = [
      [pad + i * step, bandY + bandH],
      [pad + i * step + step * 0.5, bandY],
      [pad + i * step + step * 0.7, bandY],
      [pad + i * step + step * 0.2, bandY + bandH],
    ];
    shape(ctx, pts, 'rgba(32,30,26,0.9)');
  }
  ctx.restore();
  // 上下不可读的文字条
  for (let i = 0; i < 4; i += 1) rect(ctx, pad + w * 0.14, pad + w * (0.1 + i * 0.055), w * rng.range(0.4, 0.72), 8, 'rgba(34,32,28,0.8)');
  for (let i = 0; i < 3; i += 1) rect(ctx, pad + w * 0.14, pad + w * (0.72 + i * 0.06), w * rng.range(0.4, 0.7), 9, 'rgba(34,32,28,0.8)');
  scratches(ctx, s, s, rng, { count: 45, alpha: 0.12 });
  grain(ctx, s, s, rng, { count: 3000, minAlpha: 0.04, maxAlpha: 0.16, size: 1.8 });
  worn(ctx, s, rng, { count: 22, radius: [8, 30], strength: 0.7 });
}));

export const rosterPaper = memo(() => decalTex(SMALL, (ctx, s) => {
  const rng = makeRng(7001);
  ctx.save();
  ctx.translate(s * 0.5, s * 0.52);
  ctx.rotate(-0.035);
  const pw = s * 0.66;
  const ph = s * 0.8;
  // 纸张 + 边缘阴影
  rect(ctx, -pw / 2 + 4, -ph / 2 + 6, pw, ph, 'rgba(20,18,16,0.25)');
  rect(ctx, -pw / 2, -ph / 2, pw, ph, 'rgba(228,222,202,0.96)');
  ctx.save();
  ctx.beginPath();
  ctx.rect(-pw / 2, -ph / 2, pw, ph);
  ctx.clip();
  // 标题条与规则线 + 不可读文字条
  rect(ctx, -pw * 0.38, -ph * 0.42, pw * 0.5, 7, 'rgba(58,60,64,0.6)');
  for (let i = 0; i < 13; i += 1) {
    const y = -ph * 0.3 + i * (ph * 0.06);
    rect(ctx, -pw * 0.42, y, pw * 0.84, 1.4, 'rgba(96,104,116,0.35)');
    rect(ctx, -pw * 0.38, y + 3, pw * rng.range(0.2, 0.5), 4, 'rgba(52,54,58,0.5)');
    rect(ctx, pw * 0.08, y + 3, pw * rng.range(0.1, 0.3), 4, 'rgba(52,54,58,0.5)');
  }
  // 咖啡渍环
  ctx.strokeStyle = 'rgba(138,102,62,0.5)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(pw * 0.24, -ph * 0.22, s * 0.09, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(120,88,52,0.28)';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.arc(pw * 0.24, -ph * 0.22, s * 0.092, 0.4, Math.PI * 1.5);
  ctx.stroke();
  disc(ctx, pw * 0.26, ph * 0.28, s * 0.11, 'rgba(148,116,74,0.14)');
  ctx.restore();
  // 撕掉的缺角
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  const torn = [[-pw / 2, ph / 2 - s * 0.16]];
  let tx = -pw / 2;
  let ty = ph / 2 - s * 0.16;
  for (let i = 0; i < 7; i += 1) {
    tx += rng.range(4, 14);
    ty += rng.range(-8, 8);
    torn.push([tx, ty]);
  }
  torn.push([tx, ph / 2], [-pw / 2, ph / 2]);
  shape(ctx, torn, 'rgba(0,0,0,0.96)');
  ctx.restore();
  // 胶带
  rect(ctx, -pw * 0.44, -ph / 2 - s * 0.02, s * 0.16, s * 0.07, 'rgba(214,204,168,0.5)');
  rect(ctx, pw * 0.28, -ph / 2 - s * 0.02, s * 0.16, s * 0.07, 'rgba(214,204,168,0.5)');
  rect(ctx, -pw * 0.44, ph / 2 - s * 0.05, s * 0.16, 3, 'rgba(246,240,216,0.35)');
  rect(ctx, pw * 0.28, ph / 2 - s * 0.05, s * 0.16, 3, 'rgba(246,240,216,0.35)');
  ctx.restore();
  grain(ctx, s, s, rng, { count: 2000, minAlpha: 0.03, maxAlpha: 0.1, size: 1.6 });
}));
