import { Rand, fbm2 } from "../engine/rand";
import { rgba } from "./palette";

export type NibKind = "wet" | "dry" | "ghost" | "hard";

/** 印章的基准半径（CSS px）；绘制时按笔迹宽度缩放。 */
export const NIB_RADIUS = 10;

export interface Nib {
  canvas: HTMLCanvasElement;
  radius: number;
}

/**
 * 笔尖 = 预渲染的墨点印章。三种笔尖共享一个基准尺寸，
 * 绘制时用一次 setTransform（旋转 + 缩放）盖章，不做 save/restore。
 */
export function makeNib(kind: NibKind, color: string, dpr: number): Nib {
  const size = Math.ceil(NIB_RADIUS * 2 * dpr) + 4;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法创建笔尖画布");

  const c = size / 2;
  const r = NIB_RADIUS * dpr;
  const rand = new Rand(kind === "wet" ? 11 : kind === "dry" ? 23 : kind === "hard" ? 41 : 37);

  const gradient = ctx.createRadialGradient(c, c, r * 0.05, c, c, r);
  if (kind === "ghost") {
    gradient.addColorStop(0, rgba(color, 0.34));
    gradient.addColorStop(0.55, rgba(color, 0.19));
    gradient.addColorStop(1, rgba(color, 0));
  } else if (kind === "dry") {
    gradient.addColorStop(0, rgba(color, 0.6));
    gradient.addColorStop(0.5, rgba(color, 0.42));
    gradient.addColorStop(0.86, rgba(color, 0.12));
    gradient.addColorStop(1, rgba(color, 0));
  } else if (kind === "hard") {
    // 刀口与挖除用：几乎没有羽化，边缘硬
    gradient.addColorStop(0, rgba(color, 1));
    gradient.addColorStop(0.82, rgba(color, 0.99));
    gradient.addColorStop(0.96, rgba(color, 0.72));
    gradient.addColorStop(1, rgba(color, 0));
  } else {
    gradient.addColorStop(0, rgba(color, 0.95));
    gradient.addColorStop(0.42, rgba(color, 0.82));
    gradient.addColorStop(0.74, rgba(color, 0.42));
    gradient.addColorStop(0.92, rgba(color, 0.12));
    gradient.addColorStop(1, rgba(color, 0));
  }
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(c, c, r, 0, Math.PI * 2);
  ctx.fill();

  if (kind === "wet" || kind === "dry") {
    // 鬃毛划痕：沿着笔尖方向的细亮痕，只在墨点内部生效
    ctx.globalCompositeOperation = "source-atop";
    const streaks = kind === "dry" ? 9 : 6;
    for (let i = 0; i < streaks; i += 1) {
      const angle = rand.range(0, Math.PI * 2);
      const offset = rand.range(-r * 0.5, r * 0.5);
      ctx.strokeStyle = rgba("#ffffff", rand.range(0.05, 0.16));
      ctx.lineWidth = Math.max(1, rand.range(0.6, 1.8) * dpr);
      ctx.beginPath();
      ctx.moveTo(c - Math.cos(angle) * r, c - Math.sin(angle) * r + offset);
      ctx.lineTo(c + Math.cos(angle) * r, c + Math.sin(angle) * r + offset);
      ctx.stroke();
    }
  }

  if (kind !== "ghost") {
    // 边缘缺口：让墨点不是标准圆，像纸纤维吸墨不均 / 手撕的边
    ctx.globalCompositeOperation = "destination-out";
    const bites = kind === "dry" ? 26 : kind === "hard" ? 11 : 14;
    for (let i = 0; i < bites; i += 1) {
      const angle = rand.range(0, Math.PI * 2);
      const inner = kind === "dry" ? 0.45 : kind === "hard" ? 0.93 : 0.72;
      const dist = r * rand.range(inner, 1.02);
      const biteSize = kind === "hard" ? rand.range(0.04, 0.11) : rand.range(0.06, kind === "dry" ? 0.26 : 0.17);
      ctx.fillStyle = rgba("#000000", rand.range(0.25, kind === "dry" ? 0.95 : 0.6));
      ctx.beginPath();
      ctx.arc(c + Math.cos(angle) * dist, c + Math.sin(angle) * dist, biteSize * r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
  }

  return { canvas, radius: NIB_RADIUS };
}

/** 纸面纤维贴片：一次生成，平铺使用。 */
export function makeFiberTile(size: number, seed: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法创建纸纹画布");
  const image = ctx.createImageData(size, size);
  const data = image.data;
  const rand = new Rand(seed);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      // 各向异性噪声：横向拉长，像纸张的长纤维
      const n = fbm2(x * 0.035, y * 0.21, seed) * 0.5 + 0.5;
      const speck = rand.next();
      const index = (y * size + x) * 4;
      const dark = Math.max(0, n - 0.52) * 1.5;
      const light = Math.max(0, 0.5 - n) * 1.4;
      const grain = speck > 0.986 ? 0.5 : 0;
      data[index] = dark > light ? 126 : 255;
      data[index + 1] = dark > light ? 110 : 252;
      data[index + 2] = dark > light ? 84 : 243;
      data[index + 3] = Math.round((dark + light + grain) * 46);
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}
