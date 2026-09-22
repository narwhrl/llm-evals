import { FrameMonitor, initialProfile, type QualityProfile } from "../engine/quality";
import { Field, type FieldParams } from "./field";
import { Renderer } from "./renderer";

export interface EngineSnapshot {
  temperature: number;
  live: number;
  abandoned: number;
  archive: number;
  spawned: number;
  cuts: number;
  tier: QualityProfile["tier"];
  workMs: number;
  fps: number;
  hatchPlaced: number;
  hatchTotal: number;
  hatchDone: boolean;
  mode: EngineMode;
}

export type EngineMode = "live" | "still";

export const DEFAULT_PARAMS: FieldParams = {
  temperature: 0.34,
  pointerX: 0,
  pointerY: 0,
  pointerActive: false,
  originX: 0,
  originY: 0,
  maxStrokes: 220,
  ambient: 1,
  attract: 6,
};

const POINTER_IDLE_MS = 2600;

/**
 * 画布引擎：场 + 三层渲染 + 帧循环。
 * 只做"这一刻纸上的墨"，不关心章节怎么排——章节通过 params 与显式调用驱动它。
 */
export class InkEngine {
  readonly field: Field;
  readonly renderer: Renderer;
  params: FieldParams;
  mode: EngineMode = "live";

  /** 每帧结束后调用（快照 + 本帧时长），用于需要逐帧同步的编排 */
  onFrame: ((snapshot: EngineSnapshot, dt: number) => void) | null = null;

  private profile: QualityProfile;
  private readonly monitor: FrameMonitor;
  private raf = 0;
  private last = 0;
  private lastPointerMove = -Infinity;
  private running = false;
  private dirty = false;
  private workMs = 0;
  private fps = 60;
  private width: number;
  private height: number;
  private readonly observer: ResizeObserver;

  constructor(
    private readonly container: HTMLElement,
    overrides: Partial<FieldParams> = {},
  ) {
    this.width = Math.max(320, container.clientWidth || window.innerWidth);
    this.height = Math.max(320, container.clientHeight || window.innerHeight);

    this.renderer = new Renderer(container);
    this.field = new Field(this.width, this.height);
    this.profile = initialProfile(this.width, this.height, navigator.hardwareConcurrency ?? 4);
    this.monitor = new FrameMonitor(this.profile, 8);
    this.params = {
      ...DEFAULT_PARAMS,
      ...overrides,
      originX: this.width / 2,
      originY: this.height * 0.32,
      maxStrokes: this.profile.maxStrokes,
    };

    this.renderer.resize(this.width, this.height, this.profile.maxDpr, this.profile.paperDetail);

    this.observer = new ResizeObserver(() => this.handleResize());
    this.observer.observe(container);
    document.addEventListener("visibilitychange", this.handleVisibility);
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.last = 0;
    window.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", this.handlePointerLeave, { passive: true });
    this.raf = requestAnimationFrame(this.frame);
  }

  stop(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    window.removeEventListener("pointermove", this.handlePointerMove);
    window.removeEventListener("pointerleave", this.handlePointerLeave);
  }

  destroy(): void {
    this.stop();
    this.observer.disconnect();
    document.removeEventListener("visibilitychange", this.handleVisibility);
    this.renderer.destroy();
  }

  /** 让下一帧一定重画（静置模式下用来响应章节切换） */
  invalidate(): void {
    this.dirty = true;
    if (!this.running) this.renderOnce();
  }

  /**
   * 离线烘焙：按固定步长把一段时间一次跑完，中途分批把墨写进纸里
   * （印章缓冲区是有上限的队列，攒太久会丢墨）。静置呈现与调试样张都走这条路。
   */
  bake(seconds: number, step = 1 / 60, chunk = 8): void {
    const steps = Math.max(1, Math.round(seconds / step));
    for (let i = 0; i < steps; i += 1) {
      this.field.update(step, this.params);
      if ((i + 1) % chunk === 0) this.renderer.drawPaint(this.field.paint);
    }
    this.renderer.drawPaint(this.field.paint);
    this.renderer.drawLive(this.field.live);
  }

  snapshot(): EngineSnapshot {
    return {
      temperature: this.params.temperature,
      live: this.field.liveCount,
      abandoned: this.field.abandoned,
      archive: this.field.archiveCount,
      spawned: this.field.spawned,
      cuts: this.field.cuts,
      tier: this.profile.tier,
      workMs: this.workMs,
      fps: this.fps,
      hatchPlaced: this.field.hatchPlaced,
      hatchTotal: this.field.hatchTotal,
      hatchDone: this.field.hatchDone,
      mode: this.mode,
    };
  }

  private renderOnce(): void {
    this.field.update(0, this.params);
    this.renderer.drawPaint(this.field.paint);
    this.renderer.drawLive(this.field.live);
  }

  private frame = (now: number): void => {
    if (!this.running) return;
    this.raf = requestAnimationFrame(this.frame);

    const interval = this.last ? now - this.last : 16.7;
    this.fps += ((1000 / Math.max(1, interval)) - this.fps) * 0.08;
    const dt = this.last ? Math.min(0.05, interval / 1000) : 1 / 60;
    this.last = now;

    const still = this.mode === "still";
    if (!still || this.dirty) {
      this.dirty = false;
      const started = performance.now();
      this.field.update(dt, this.params);
      this.renderer.drawPaint(this.field.paint);
      this.renderer.drawLive(this.field.live);
      this.workMs += (performance.now() - started - this.workMs) * 0.1;
    }

    const tier = this.monitor.sample(this.workMs);
    if (tier) {
      this.profile = tier;
      this.params.maxStrokes = tier.maxStrokes;
      this.renderer.resize(this.width, this.height, tier.maxDpr, tier.paperDetail);
    }

    this.onFrame?.(this.snapshot(), dt);
  };

  private handlePointerMove = (event: PointerEvent): void => {
    this.params.pointerX = event.clientX;
    this.params.pointerY = event.clientY;
    this.params.pointerActive = true;
    this.lastPointerMove = performance.now();
  };

  private handlePointerLeave = (): void => {
    this.params.pointerActive = false;
  };

  private handleVisibility = (): void => {
    if (document.hidden) {
      if (this.raf) cancelAnimationFrame(this.raf);
      this.raf = 0;
      this.last = 0;
      return;
    }
    if (this.running && !this.raf) this.raf = requestAnimationFrame(this.frame);
  };

  private handleResize(): void {
    const width = Math.max(320, this.container.clientWidth || window.innerWidth);
    const height = Math.max(320, this.container.clientHeight || window.innerHeight);
    if (Math.abs(width - this.width) < 2 && Math.abs(height - this.height) < 2) return;
    this.width = width;
    this.height = height;
    this.field.resize(width, height);
    this.renderer.resize(width, height, this.profile.maxDpr, this.profile.paperDetail);
    if (this.params.pointerActive && performance.now() - this.lastPointerMove > POINTER_IDLE_MS) {
      this.params.pointerActive = false;
    }
    this.invalidate();
  }
}
