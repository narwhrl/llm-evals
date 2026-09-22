import type { HatchTarget } from "./field";

export interface HatchOptions {
  /** 拓印区域的尺寸（CSS px），字会被缩放到这个框里 */
  boxWidth: number;
  boxHeight: number;
  /** 目标记号数：质量档位决定，越低越省 */
  desiredCount: number;
}

/**
 * 把访客写的字栅格化成拓印目标：先量出墨的面积，
 * 再按面积分配记号密度，最后用 alpha 梯度估出笔画方向，
 * 让记号顺着笔画排列，而不是一堆随机点。
 */
export function wordTargets(text: string, options: HatchOptions): HatchTarget[] {
  const glyphs = [...text].slice(0, 6).join("").trim();
  if (!glyphs) return [];

  const width = Math.max(80, Math.round(options.boxWidth));
  const height = Math.max(60, Math.round(options.boxHeight));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];

  const { font, size } = fitFont(ctx, glyphs, width, height);
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  ctx.fillText(glyphs, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  const alphaAt = (x: number, y: number): number => {
    if (x < 0 || y < 0 || x >= width || y >= height) return 0;
    return data[(y * width + x) * 4 + 3];
  };

  let inkPixels = 0;
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (alphaAt(x, y) > 128) {
        inkPixels += 1;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (inkPixels === 0) return [];

  // 让记号数接近目标：记号覆盖面积 ≈ spacing²
  const spacing = Math.max(2.6, Math.sqrt(inkPixels / Math.max(60, options.desiredCount)));
  const markSize = Math.min(size * 0.34, spacing * 2.35);
  const targets: HatchTarget[] = [];
  const jitter = spacing * 0.24;

  for (let y = minY; y <= maxY; y += spacing) {
    for (let x = minX; x <= maxX; x += spacing) {
      const px = Math.round(x);
      const py = Math.round(y);
      if (alphaAt(px, py) < 150) continue;
      // 梯度方向 → 笔画方向（与梯度垂直）
      const gx = alphaAt(px + 2, py) - alphaAt(px - 2, py);
      const gy = alphaAt(px, py + 2) - alphaAt(px, py - 2);
      let angle = Math.atan2(gy, gx) + Math.PI / 2;
      if (gx === 0 && gy === 0) angle = -0.62;
      // 手绘感：每个记号都略有偏差
      const wobble = (hash01(px, py) - 0.5) * 0.26;
      const jitterX = (hash01(px + 17, py - 9) - 0.5) * jitter;
      const jitterY = (hash01(px - 31, py + 23) - 0.5) * jitter;
      targets.push({
        x: px + jitterX,
        y: py + jitterY,
        angle: angle + wobble,
        size: markSize * (0.86 + hash01(px + 5, py + 11) * 0.34),
      });
    }
  }

  // 打散顺序：拓印时看起来是"从整片纸上一起搬家"，不是从上往下扫
  return shuffle(targets);
}

function fitFont(
  ctx: CanvasRenderingContext2D,
  glyphs: string,
  width: number,
  height: number,
): { font: string; size: number } {
  const stack = getComputedStyle(document.body).getPropertyValue("--cjk").trim();
  const family = stack || "sans-serif";
  let size = Math.min(height * 0.78, width / Math.max(1, glyphs.length) * 1.02);
  for (let i = 0; i < 8; i += 1) {
    ctx.font = `600 ${size}px ${family}`;
    const measured = ctx.measureText(glyphs).width;
    if (measured <= width * 0.96) break;
    size *= (width * 0.96) / measured;
  }
  return { font: `600 ${size}px ${family}`, size };
}

function hash01(x: number, y: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function shuffle<T>(items: T[]): T[] {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(hash01(i, 7919 + i) * (i + 1));
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
  }
  return items;
}
