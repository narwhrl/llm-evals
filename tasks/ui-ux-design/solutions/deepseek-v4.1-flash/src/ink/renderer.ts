import { makeNib, makeFiberTile, type Nib } from "./stamps";
import { PALETTE, rgba } from "./palette";
import type { StampBuffer } from "./stroke";

const LAYER_CLASS = "ink-layer";

interface Layer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

/**
 * 三层画布：纸（只在改变尺寸时重画）、已经干在纸上的墨（只追加）、
 * 此刻正在写的墨（每帧重画）。分层让"墨越积越脏"这件事零成本。
 */
export class Renderer {
  readonly root: HTMLDivElement;
  private readonly paper: Layer;
  private readonly archive: Layer;
  private readonly live: Layer;
  private readonly nibs: Nib[] = [];
  private readonly fibers: HTMLCanvasElement;

  width = 0;
  height = 0;
  dpr = 1;
  private detail = true;

  constructor(container: HTMLElement) {
    this.root = document.createElement("div");
    this.root.className = "ink-stage";
    this.root.setAttribute("aria-hidden", "true");
    this.paper = this.makeLayer("paper");
    this.archive = this.makeLayer("archive");
    this.live = this.makeLayer("live");
    container.appendChild(this.root);

    this.fibers = makeFiberTile(180, 0x9a11);
    this.buildNibs(1);
  }

  /** 每种颜色 × 每种笔尖一枚印章：顺序必须与 COLOR_INDEX / NIB_INDEX 对齐 */
  private buildNibs(dpr: number): void {
    this.nibs.length = 0;
    const colors = [PALETTE.ink, PALETTE.ghost, PALETTE.vermilion];
    for (const color of colors) {
      this.nibs.push(makeNib("wet", color, dpr));
      this.nibs.push(makeNib("dry", color, dpr));
      this.nibs.push(makeNib("ghost", color, dpr));
      this.nibs.push(makeNib("hard", color, dpr));
    }
  }

  private makeLayer(name: string): Layer {
    const canvas = document.createElement("canvas");
    canvas.className = LAYER_CLASS;
    canvas.dataset.layer = name;
    this.root.appendChild(canvas);
    const ctx = canvas.getContext("2d", { alpha: name !== "paper" });
    if (!ctx) throw new Error(`无法创建 ${name} 画布上下文`);
    return { canvas, ctx };
  }

  resize(width: number, height: number, maxDpr: number, detail: boolean): void {
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    this.width = width;
    this.height = height;
    this.dpr = dpr;

    const sameSize =
      this.paper.canvas.width === Math.round(width * dpr) &&
      this.paper.canvas.height === Math.round(height * dpr);
    if (sameSize) {
      // 尺寸不变时只更新材质细节，纸张不需要重画
      if (detail !== this.detail) {
        this.detail = detail;
        this.paintPaper();
      }
      return;
    }
    this.detail = detail;

    const snapshot = document.createElement("canvas");
    let hasArchive = false;
    if (this.archive.canvas.width > 0) {
      snapshot.width = this.archive.canvas.width;
      snapshot.height = this.archive.canvas.height;
      const snapshotCtx = snapshot.getContext("2d");
      if (snapshotCtx) {
        snapshotCtx.drawImage(this.archive.canvas, 0, 0);
        hasArchive = true;
      }
    }

    for (const layer of [this.paper, this.archive, this.live]) {
      layer.canvas.width = Math.round(width * dpr);
      layer.canvas.height = Math.round(height * dpr);
    }

    // 重新生成按新 DPR 渲染的笔尖
    this.buildNibs(dpr);

    this.paintPaper();

    if (hasArchive) {
      // 尺寸变化（例如旋转屏幕）保留已经写下的墨，按比例贴合
      this.archive.ctx.save();
      this.archive.ctx.setTransform(
        this.archive.canvas.width / snapshot.width,
        0,
        0,
        this.archive.canvas.height / snapshot.height,
        0,
        0,
      );
      this.archive.ctx.drawImage(snapshot, 0, 0);
      this.archive.ctx.restore();
    }
  }

  paintPaper(): void {
    const ctx = this.paper.ctx;
    const { width: w, height: h } = this.paper.canvas;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = PALETTE.paper;
    ctx.fillRect(0, 0, w, h);

    // 大尺度的陈旧与不匀
    const washes: Array<[number, number, number, number]> = [
      [0.16, 0.1, 0.62, 0.05],
      [0.88, 0.26, 0.5, 0.04],
      [0.42, 0.94, 0.66, 0.05],
      [0.72, 0.62, 0.44, 0.03],
    ];
    for (const [px, py, pr, alpha] of washes) {
      const radius = Math.max(w, h) * pr;
      const gradient = ctx.createRadialGradient(w * px, h * py, 0, w * px, h * py, radius);
      gradient.addColorStop(0, rgba(PALETTE.paperShade, alpha));
      gradient.addColorStop(1, rgba(PALETTE.paperShade, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    if (this.detail) {
      const pattern = ctx.createPattern(this.fibers, "repeat");
      if (pattern) {
        ctx.globalAlpha = 0.55;
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, w, h);
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.translate(w * 0.37, h * 0.19);
        ctx.scale(1.63, 1.63);
        ctx.fillRect(0, 0, w / 1.63, h / 1.63);
        ctx.restore();
      }
    }

    // 纸的边：靠近边缘略微变暗，像被翻过很多次
    const vignette = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.32, w / 2, h / 2, Math.max(w, h) * 0.8);
    vignette.addColorStop(0, rgba("#6b6250", 0));
    vignette.addColorStop(1, rgba("#6b6250", 0.1));
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;
  }

  /** 把永久墨写进纸（只追加、不重画）；调用后缓冲区由调用方清空。 */
  drawPaint(buffer: StampBuffer): void {
    if (buffer.count === 0) return;
    this.stamp(this.archive.ctx, buffer);
    buffer.clear();
  }

  /** 每帧重画正在运动的墨（下坠的墨滴、飞向拓印目标的记号）。 */
  drawLive(buffer: StampBuffer): void {
    const ctx = this.live.ctx;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, this.live.canvas.width, this.live.canvas.height);
    if (buffer.count > 0) this.stamp(ctx, buffer);
    buffer.clear();
  }

  clearAll(): void {
    for (const layer of [this.archive, this.live]) {
      layer.ctx.setTransform(1, 0, 0, 1, 0, 0);
      layer.ctx.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
    }
    this.paintPaper();
  }

  destroy(): void {
    this.root.remove();
  }

  private stamp(ctx: CanvasRenderingContext2D, buffer: StampBuffer): void {
    // 先画墨、再挖除：同一帧里刀口必须落在这一帧刚写下的墨之后
    this.stampPass(ctx, buffer, 0);
    if (this.hasErase(buffer)) this.stampPass(ctx, buffer, 1);
  }

  private hasErase(buffer: StampBuffer): boolean {
    for (let i = 0; i < buffer.count; i += 1) {
      if (buffer.mode[i] === 1) return true;
    }
    return false;
  }

  private stampPass(ctx: CanvasRenderingContext2D, buffer: StampBuffer, mode: number): void {
    ctx.globalCompositeOperation = mode === 1 ? "destination-out" : "source-over";
    let lastAlpha = -1;
    for (let i = 0; i < buffer.count; i += 1) {
      if (buffer.mode[i] !== mode) continue;
      const nib = this.nibs[buffer.color[i] * 4 + buffer.nib[i]];
      if (!nib) continue;
      const radius = buffer.size[i];
      if (radius <= 0.05) continue;
      const k = radius / nib.radius;
      const angle = buffer.angle[i];
      const cos = Math.cos(angle) * k;
      const sin = Math.sin(angle) * k;
      const alpha = buffer.alpha[i];
      if (alpha !== lastAlpha) {
        ctx.globalAlpha = alpha < 0 ? 0 : alpha > 1 ? 1 : alpha;
        lastAlpha = alpha;
      }
      ctx.setTransform(cos, sin, -sin, cos, buffer.x[i] * this.dpr, buffer.y[i] * this.dpr);
      const size = nib.canvas.width;
      ctx.drawImage(nib.canvas, -size / 2, -size / 2);
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}
