/**
 * 手绘笔迹：校对符号不是折线，是有笔压的色带。
 * 所有笔迹由点列 + 宽度剖面填充成带，圆头收笔。
 */

export interface Pt {
  x: number;
  y: number;
}

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 103904223) >>> 0;
    return s / 4294967296;
  };
}

function catmull(pts: Pt[], samples: number): Pt[] {
  if (pts.length < 3) return pts.slice();
  const out: Pt[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const n = i === pts.length - 2 ? samples : samples - 1;
    for (let j = 0; j <= n; j++) {
      const t = j / samples;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push({
        x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  return out;
}

/** 划除线：横穿词框，微微上挑并带手抖 */
export function strikePoints(box: Box, seed: number): Pt[] {
  const rand = mulberry32(seed);
  const y0 = box.y + box.h * 0.54;
  const pts: Pt[] = [];
  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    pts.push({
      x: box.x - box.w * 0.03 + box.w * 1.06 * t,
      y: y0 - box.h * 0.05 * t + (rand() - 0.5) * 2.2,
    });
  }
  return catmull(pts, 6);
}

/** 删除号 dele：一个回环加一道长扫尾，判死整段 */
export function delePoints(box: Box, seed: number): Pt[] {
  const rand = mulberry32(seed);
  const cx = box.x + box.w * 0.12;
  const cy = box.y + box.h * 0.55;
  const r = Math.min(box.h * 0.32, 46);
  const pts: Pt[] = [];
  // 回环（逆时针约 1.25 圈）
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const a = Math.PI * 0.4 + t * Math.PI * 2.5;
    pts.push({
      x: cx + Math.cos(a) * r * (1 - t * 0.25) + (rand() - 0.5) * 2,
      y: cy + Math.sin(a) * r * 0.78 * (1 - t * 0.25) + (rand() - 0.5) * 2,
    });
  }
  // 长扫尾，向右上贯穿全宽
  const tailFrom = pts[pts.length - 1];
  for (let i = 1; i <= 6; i++) {
    const t = i / 6;
    pts.push({
      x: tailFrom.x + (box.x + box.w * 1.04 - tailFrom.x) * t,
      y: tailFrom.y + (box.y + box.h * 0.12 - tailFrom.y) * t + Math.sin(t * Math.PI) * 14,
    });
  }
  return catmull(pts, 5);
}

/**
 * 把点列按笔压剖面填充成色带。
 * progress 0..1 控制写出长度（未写出的点不参与）。
 */
export function ribbon(
  ctx: CanvasRenderingContext2D,
  pts: Pt[],
  progress: number,
  baseWidth: number,
  color: string,
): void {
  const n = Math.max(2, Math.round(pts.length * Math.min(1, Math.max(0, progress))));
  const head = pts.slice(0, n);
  if (head.length < 2) return;

  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < head.length; i++) {
    const t = i / (head.length - 1);
    const p = head[i];
    const q = head[Math.min(head.length - 1, i + 1)];
    const p0 = head[Math.max(0, i - 1)];
    let dx = q.x - p0.x;
    let dy = q.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;
    dx /= len;
    dy /= len;
    // 笔压：起收笔细，中段实
    const w = baseWidth * (0.35 + 0.65 * Math.sin(Math.PI * Math.pow(t, 0.85)));
    left.push({ x: p.x - dy * w * 0.5, y: p.y + dx * w * 0.5 });
    right.push({ x: p.x + dy * w * 0.5, y: p.y - dx * w * 0.5 });
  }

  ctx.beginPath();
  ctx.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < left.length; i++) ctx.lineTo(left[i].x, left[i].y);
  for (let i = right.length - 1; i >= 0; i--) ctx.lineTo(right[i].x, right[i].y);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

export const INK_VERMILION = 'rgba(194, 46, 40, 0.92)';
export const INK_GRAPHITE = 'rgba(74, 95, 122, 0.55)';
