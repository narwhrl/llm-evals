import type { NibKind } from "./stamps";

export const MAX_POINTS = 192;
export const STAMP_CAPACITY = 8192;

export const COLOR_INDEX = { ink: 0, ghost: 1, vermilion: 2 } as const;
export type ColorIndex = (typeof COLOR_INDEX)[keyof typeof COLOR_INDEX];
export const NIB_INDEX: Record<NibKind, number> = { wet: 0, dry: 1, ghost: 2, hard: 3 };

export const StrokeState = {
  Live: 0,
  /** 被截断线斩断、正在下坠 */
  Falling: 1,
  /** 已经进入纸上，成为静态墨 */
  Archived: 2,
  /** 终章：从纸上抬起、飞向拓印目标 */
  Migrating: 3,
  /** 墨已用尽或已停住 */
  Spent: 4,
} as const;
export type StrokeStateValue = (typeof StrokeState)[keyof typeof StrokeState];

export class Stroke {
  readonly x = new Float32Array(MAX_POINTS);
  readonly y = new Float32Array(MAX_POINTS);
  count = 0;

  headX = 0;
  headY = 0;
  dirX = 1;
  dirY = 0;

  /** 每帧沿中心线的位移速度（CSS px/s） */
  speed = 70;
  /** 微步长 = 盖章间距（CSS px） */
  spacing = 1.5;
  /** 每多少个微步记录一个中心线点 */
  pathEvery = 4;
  /** 卷曲强度（rad/px），由温度驱动 */
  curl = 0.25;
  /** 笔尖半径（CSS px） */
  width = 1.3;
  alpha = 1;
  /** 吸附到光标的强度 */
  attract = 0;

  seed = 0;
  nib: NibKind = "wet";
  color: ColorIndex = COLOR_INDEX.ink;

  /** 剩余墨量（CSS px 行程）与累计行程 */
  reservoir = 520;
  travel = 0;
  /** 起笔的加粗长度：接着上一笔写的墨不需要重新起笔 */
  ramp = 14;
  /** 微步余量 */
  debt = 0;
  micro = 0;

  life = 0;
  state: StrokeStateValue = StrokeState.Live;

  /** 落点变换：盖印章时应用（默认单位变换） */
  ta = 1;
  tb = 0;
  tc = 0;
  td = 1;
  ttx = 0;
  tty = 0;

  /** 终章迁移：光标沿中心线走过的比例与进度 */
  migrateCursor = 0;
  migrateDelay = 0;
  migrateEase = 1;

  /** 下坠状态（被斩断后） */
  fallVelocity = 0;
  fallX = 0;
  fallY = 0;
  spread = 0;

  reset(): void {
    this.count = 0;
    this.life = 0;
    this.travel = 0;
    this.debt = 0;
    this.micro = 0;
    this.ramp = 14;
    this.alpha = 1;
    this.spread = 0;
    this.fallVelocity = 0;
    this.migrateCursor = 0;
    this.migrateDelay = 0;
    this.migrateEase = 1;
    this.ta = 1;
    this.tb = 0;
    this.tc = 0;
    this.td = 1;
    this.ttx = 0;
    this.tty = 0;
    this.state = StrokeState.Live;
  }

  pushPoint(x: number, y: number): void {
    if (this.count >= MAX_POINTS) return;
    const last = this.count - 1;
    if (last >= 0) {
      const dx = x - this.x[last];
      const dy = y - this.y[last];
      if (dx * dx + dy * dy < 1.2) return;
    }
    this.x[this.count] = x;
    this.y[this.count] = y;
    this.count += 1;
  }

  /** 墨迹用尽的比例：0 = 刚沾墨，1 = 已枯 */
  get dryness(): number {
    return this.reservoir <= 0 ? 1 : Math.min(1, this.travel / this.reservoir);
  }

  get centroidX(): number {
    return this.count ? (this.x[0] + this.headX) / 2 : this.headX;
  }

  get centroidY(): number {
    return this.count ? (this.y[0] + this.headY) / 2 : this.headY;
  }

  /** 中心线两端距离，用作"这支笔有多长" */
  get extent(): number {
    if (this.count < 2) return 1;
    const dx = this.headX - this.x[0];
    const dy = this.headY - this.y[0];
    return Math.max(1, Math.hypot(dx, dy));
  }
}

/** 每帧要绘制的印章集合（结构化数组，热循环零分配）。 */
export class StampBuffer {
  readonly x = new Float32Array(STAMP_CAPACITY);
  readonly y = new Float32Array(STAMP_CAPACITY);
  readonly size = new Float32Array(STAMP_CAPACITY);
  readonly angle = new Float32Array(STAMP_CAPACITY);
  readonly alpha = new Float32Array(STAMP_CAPACITY);
  readonly color = new Uint8Array(STAMP_CAPACITY);
  readonly nib = new Uint8Array(STAMP_CAPACITY);
  /** 0 = 画墨，1 = 用 destination-out 把墨挖掉 */
  readonly mode = new Uint8Array(STAMP_CAPACITY);
  count = 0;

  clear(): void {
    this.count = 0;
  }

  push(
    x: number,
    y: number,
    size: number,
    angle: number,
    alpha: number,
    color: number,
    nib: number,
  ): void {
    if (this.count >= STAMP_CAPACITY) return;
    const i = this.count;
    this.x[i] = x;
    this.y[i] = y;
    this.size[i] = size;
    this.angle[i] = angle;
    this.alpha[i] = alpha;
    this.color[i] = color;
    this.nib[i] = nib;
    this.mode[i] = 0;
    this.count = i + 1;
  }

  /** 挖掉记号：截断线用它把纸面切开。 */
  pushErase(x: number, y: number, size: number, angle: number, alpha: number): void {
    if (this.count >= STAMP_CAPACITY) return;
    const i = this.count;
    this.x[i] = x;
    this.y[i] = y;
    this.size[i] = size;
    this.angle[i] = angle;
    this.alpha[i] = alpha;
    this.color[i] = 0;
    this.nib[i] = NIB_INDEX.hard;
    this.mode[i] = 1;
    this.count = i + 1;
  }
}

/** 笔迹对象池：分叉时反复取用，避免运行中产生垃圾。 */
export class StrokePool {
  private readonly free: Stroke[] = [];
  private readonly busy = new Set<Stroke>();

  acquire(): Stroke {
    const stroke = this.free.pop() ?? new Stroke();
    stroke.reset();
    this.busy.add(stroke);
    return stroke;
  }

  release(stroke: Stroke): void {
    if (!this.busy.delete(stroke)) return;
    if (this.free.length < 400) this.free.push(stroke);
  }

  get live(): number {
    return this.busy.size;
  }
}
