import type { DeviceCue } from "../content/copy";
import { clamp01, easeInOutCubic, lerp, Spring } from "../engine/spring";
import { InkAudio } from "./audio";
import type { EngineMode, InkEngine } from "./engine";
import type { HatchTarget } from "./field";
import { bakePlate } from "./plates";

export interface DirectorHandles {
  /** 朱红刀线（章节二与「读」共用） */
  line: HTMLElement | null;
  /** 会被震动的纸面容器 */
  sheet: HTMLElement | null;
}

export interface DirectorEvents {
  onRead?: (severed: number) => void;
  onCut?: (severed: number, total: number) => void;
  onHatchLanded?: () => void;
}

interface CutState {
  active: boolean;
  t: number;
  duration: number;
  fromY: number;
  toY: number;
  sweeps: boolean;
}

const ORIGIN_STIFFNESS = 46;
const ORIGIN_DAMPING = 13;

/**
 * 指挥：把章节的意图、访客的动作与时间编在一起。
 * 逐帧的活都在这里，React 只负责挂载与低频状态。
 */
export class Director {
  private cue: DeviceCue = {
    temperature: 0.25,
    ambient: 0.7,
    attract: 6,
    originX: 0.5,
    originY: 0.34,
    plate: { seconds: 24, strokes: 60 },
  };
  private temperature = 0.25;
  private ambient = 0.7;
  private attract = 6;
  private userOffset = 0;
  private mode: EngineMode = "live";
  private cut: CutState = { active: false, t: 0, duration: 0.9, fromY: -0.02, toY: 1.02, sweeps: true };
  private cutUsed = false;
  private readonly shake = new Spring(0, 190, 15);
  private readonly originX = new Spring(0.5, ORIGIN_STIFFNESS, ORIGIN_DAMPING);
  private readonly originY = new Spring(0.34, ORIGIN_STIFFNESS, ORIGIN_DAMPING);
  private handles: DirectorHandles = { line: null, sheet: null };
  private cutSevered = 0;
  private hatchRequested = false;
  private readonly audio = new InkAudio();

  constructor(
    private readonly engine: InkEngine,
    private readonly events: DirectorEvents = {},
  ) {
    this.originX.value = 0.5;
    this.originY.value = 0.34;
    engine.onFrame = (_snapshot, dt) => this.frame(dt);
  }

  attach(handles: Partial<DirectorHandles>): void {
    this.handles = { ...this.handles, ...handles };
  }

  /** 音效必须在用户手势里开启；关掉时立刻安静。 */
  setAudio(enabled: boolean): void {
    if (enabled) this.audio.enable();
    else this.audio.disable();
  }

  get audioEnabled(): boolean {
    return this.audio.enabled;
  }

  setCue(cue: DeviceCue): void {
    this.cue = cue;
    this.originX.target = cue.originX;
    this.originY.target = cue.originY;
    if (this.mode === "still") this.bakeStillPlate();
  }

  /** 访客的调温是"在章节的建议上叠加偏移"，所以章节仍然主导节奏。 */
  setUserTemperature(value: number): void {
    this.userOffset = Math.max(-1, Math.min(1, value - this.cue.temperature));
  }

  setMode(mode: EngineMode): void {
    this.mode = mode;
    if (mode === "still") {
      this.bakeStillPlate();
      return;
    }
    this.engine.invalidate();
  }

  /**
   * 静置呈现：同一套模拟离线跑完这一章的版画，一次性写进纸里。
   * 与完整动效是同一套引擎画出来的，只是不为时间花时间。
   */
  private bakeStillPlate(): void {
    const cue = this.cue;
    this.engine.renderer.clearAll();
    bakePlate(
      this.engine.field,
      {
        temperature: cue.temperature,
        ambient: cue.ambient,
        originX: cue.originX,
        originY: cue.originY,
        seconds: cue.plate.seconds,
        strokes: cue.plate.strokes,
        cut: cue.plate.cut,
      },
      () => this.engine.renderer.drawPaint(this.engine.field.paint),
      this.engine.profileMaxStrokes,
    );
    this.engine.invalidate();
  }

  get temperatureValue(): number {
    return this.temperature;
  }

  /** 章节二的那一刀：从上到下扫过整张纸。 */
  cutSequence(): void {
    if (this.cutUsed) return;
    this.cutUsed = true;
    this.cut = { active: true, t: 0, duration: 0.95, fromY: -0.02, toY: 1.02, sweeps: true };
    this.cutSevered = 0;
    this.shake.velocity -= 240;
    this.handles.line?.setAttribute("data-active", "true");
    this.audio.cut();
    InkAudio.buzz([0, 26, 40, 18]);
  }

  /** 访客按下「读」：在他读的位置切一刀，和章节二用的是同一把刀。 */
  readAt(y: number): void {
    const normalized = y / Math.max(1, this.engine.field.height);
    this.cut = { active: true, t: 0, duration: 0.36, fromY: normalized, toY: normalized, sweeps: false };
    this.handles.line?.setAttribute("data-active", "true");
    this.shake.velocity -= 150;
    const severed = this.engine.field.cutSweep(y, true);
    this.audio.cut();
    this.audio.drop(1.4);
    InkAudio.buzz(18);
    this.events.onRead?.(severed);
  }

  /** 终章：把纸上的墨交给拓印目标。 */
  startHatch(targets: HatchTarget[], marksPerTarget: number): void {
    if (this.hatchRequested) return;
    this.hatchRequested = true;
    this.engine.field.startHatch(targets, marksPerTarget);
    if (this.mode === "still") {
      this.engine.field.bakeHatch();
      this.engine.invalidate();
    }
  }

  get hatchStarted(): boolean {
    return this.hatchRequested;
  }

  private frame(dt: number): void {
    const params = this.engine.params;
    const follow = Math.min(1, dt * 3.4);

    this.temperature = lerp(this.temperature, clamp01(this.cue.temperature + this.userOffset), follow);
    this.ambient = lerp(this.ambient, this.cue.ambient, follow);
    this.attract = lerp(this.attract, this.cue.attract, follow);
    this.originX.update(dt);
    this.originY.update(dt);

    params.temperature = this.mode === "still" ? 0 : this.temperature;
    params.ambient = this.mode === "still" ? 0 : this.ambient;
    params.attract = this.mode === "still" ? 0 : this.attract;
    params.originX = this.originX.value * this.engine.field.width;
    params.originY = this.originY.value * this.engine.field.height;

    if (this.cut.active) {
      this.cut.t += dt;
      const progress = clamp01(this.cut.t / this.cut.duration);
      const eased = easeInOutCubic(progress);
      const y = lerp(this.cut.fromY, this.cut.toY, eased) * this.engine.field.height;
      if (this.cut.sweeps) {
        this.cutSevered += this.engine.field.cutSweep(y, true);
      }
      this.drawKnife(y, progress);
      if (progress >= 1) {
        this.cut.active = false;
        this.handles.line?.setAttribute("data-active", "false");
        if (this.cut.sweeps) this.events.onCut?.(this.cutSevered, this.engine.field.spawned);
      }
    }

    const shakeValue = this.shake.update(dt);
    if (this.handles.sheet && Math.abs(shakeValue) > 0.002) {
      this.handles.sheet.style.transform = `translate3d(${shakeValue.toFixed(2)}px, ${(shakeValue * 0.55).toFixed(2)}px, 0)`;
    } else if (this.handles.sheet && this.handles.sheet.style.transform) {
      this.handles.sheet.style.transform = "";
    }

    if (this.engine.field.hatchDone && !this.hatchLanded) {
      this.hatchLanded = true;
      this.events.onHatchLanded?.();
    }
  }

  private hatchLanded = false;

  private drawKnife(y: number, progress: number): void {
    const line = this.handles.line;
    if (!line) return;
    // 两端收尖：刀的重心在中间
    const taper = 1 - Math.abs(progress - 0.5) * 0.7;
    line.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scaleY(${taper.toFixed(3)})`;
  }
}
