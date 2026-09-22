import { Rand, fbm2 } from "../engine/rand";
import { clamp01, easeInOutCubic, lerp } from "../engine/spring";
import { COLOR_INDEX, NIB_INDEX, StampBuffer, Stroke, StrokePool, StrokeState } from "./stroke";

export interface FieldParams {
  temperature: number;
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  originX: number;
  originY: number;
  maxStrokes: number;
  /** 环境产墨强度 0..1：章节决定此刻纸上是安静还是喧嚣 */
  ambient: number;
  /** 光标吸附强度 */
  attract: number;
}

export interface HatchTarget {
  x: number;
  y: number;
  angle: number;
  /** 这一个拓印记号的长度（CSS px） */
  size: number;
}

const MARK_CAPACITY = 1600;
const MIGRANT_CAPACITY = 2400;
const MAX_DRIPS = 160;
const GRAVITY = 900;
const TERMINAL = 210;
/** 低温时书写的格线间隔：一行行写下去 */
const ROW_SPACING = 42;

/**
 * 墨迹场：整件作品只有这一个场。章节不重建它，只改参数。
 *
 * 墨一落笔就直接写进纸里（只增不减，像真的墨），所以每一枚印章只画一次；
 * 只有"还在动的东西"——下坠的墨滴、飞向拓印目标的记号——走每帧重画的活层。
 * 纯 TypeScript，无 DOM 依赖，因此"静置呈现"可以离线烘焙。
 */
export class Field {
  /** 永久墨：只追加，画布上不重画 */
  readonly paint = new StampBuffer();
  /** 活墨：每帧清空重画，只放正在运动的东西 */
  readonly live = new StampBuffer();

  private readonly pool = new StrokePool();
  private readonly strokes: Stroke[] = [];
  private readonly rand = new Rand(0x5eed);

  /** 已经落在纸上的墨：只为终章保留轻量记号（中心、方向、长度） */
  private readonly markX = new Float32Array(MARK_CAPACITY);
  private readonly markY = new Float32Array(MARK_CAPACITY);
  private readonly markAngle = new Float32Array(MARK_CAPACITY);
  private readonly markExtent = new Float32Array(MARK_CAPACITY);
  private markCount = 0;

  // 终章：被召回的墨点。结构化数组，热循环不产生垃圾。
  private readonly mx0 = new Float32Array(MIGRANT_CAPACITY);
  private readonly my0 = new Float32Array(MIGRANT_CAPACITY);
  private readonly mtx = new Float32Array(MIGRANT_CAPACITY);
  private readonly mty = new Float32Array(MIGRANT_CAPACITY);
  private readonly mAngle0 = new Float32Array(MIGRANT_CAPACITY);
  private readonly mAngle1 = new Float32Array(MIGRANT_CAPACITY);
  private readonly mDelay = new Float32Array(MIGRANT_CAPACITY);
  private readonly mEase = new Float32Array(MIGRANT_CAPACITY);
  private readonly mSize = new Float32Array(MIGRANT_CAPACITY);
  private readonly mLanded = new Uint8Array(MIGRANT_CAPACITY);
  private migrantCount = 0;

  private readonly dripX = new Float32Array(MAX_DRIPS);
  private readonly dripY = new Float32Array(MAX_DRIPS);
  private readonly dripV = new Float32Array(MAX_DRIPS);
  private readonly dripR = new Float32Array(MAX_DRIPS);
  private readonly dripLife = new Float32Array(MAX_DRIPS);
  private readonly dripTtl = new Float32Array(MAX_DRIPS);
  private dripCount = 0;

  private spawnAccum = 0;
  /** 书写游标：当前写到第几行；配合 rowPass 实现"写满一栏再从顶上重来" */
  private rowY = -1;
  private rowPass = 0;

  abandoned = 0;
  spawned = 0;
  cuts = 0;

  hatchActive = false;
  hatchDone = false;
  hatchPlaced = 0;
  hatchTotal = 0;
  private hatchElapsed = 0;
  private hatchDuration = 3.6;

  constructor(
    public width: number,
    public height: number,
  ) {}

  resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  clear(): void {
    for (const stroke of this.strokes) this.pool.release(stroke);
    this.strokes.length = 0;
    this.markCount = 0;
    this.migrantCount = 0;
    this.dripCount = 0;
    this.spawnAccum = 0;
    this.rowY = -1;
    this.rowPass = 0;
    this.abandoned = 0;
    this.spawned = 0;
    this.cuts = 0;
    this.hatchActive = false;
    this.hatchDone = false;
    this.hatchPlaced = 0;
    this.hatchTotal = 0;
    this.hatchElapsed = 0;
    this.paint.clear();
    this.live.clear();
  }

  get liveCount(): number {
    return this.strokes.length;
  }

  get archiveCount(): number {
    return this.markCount;
  }

  /**
   * 截断线扫过：把刀口画成一条真实的裂口，斩断已经被线划过的笔迹，
   * 断口以下的墨被抹掉（连同它自己的痕迹），化成下坠的墨滴。
   */
  cutSweep(clipY: number, selective = true): number {
    let severed = 0;
    for (let i = this.strokes.length - 1; i >= 0; i -= 1) {
      const stroke = this.strokes[i];
      if (selective && stroke.headY <= clipY) continue;
      if (stroke.count > 1 || stroke.travel > 4) {
        this.erasePathBelow(stroke, clipY);
        if (stroke.headY - clipY > 6 && this.dripCount < MAX_DRIPS) this.addDrip(stroke.headX, clipY, stroke.width);
        severed += 1;
        this.abandoned += 1;
      }
      this.retire(stroke);
      this.strokes.splice(i, 1);
    }
    if (severed > 0) this.drawCut(clipY);
    this.cuts += 1;
    return severed;
  }

  /** 访客写字：在他写字的地方落下朱红的湿墨，笔尖朝下。 */
  writeAt(x: number, y: number, energy = 1): void {
    const stroke = this.pool.acquire();
    stroke.seed = (this.rand.next() * 0xffff) | 0;
    stroke.color = COLOR_INDEX.vermilion;
    stroke.nib = "wet";
    stroke.width = this.rand.range(2.2, 3);
    stroke.curl = this.rand.range(0.06, 0.26);
    stroke.speed = this.rand.range(58, 96);
    stroke.reservoir = this.rand.range(110, 220) * energy;
    stroke.spacing = this.rand.range(0.85, 1.3);
    stroke.attract = 0;
    const angle = Math.PI / 2 - 0.32 + this.rand.range(-0.42, 0.42);
    stroke.dirX = Math.cos(angle);
    stroke.dirY = Math.sin(angle);
    stroke.headX = x + this.rand.range(-3, 3);
    stroke.headY = y + this.rand.range(-3, 3);
    stroke.alpha = 1;
    stroke.pushPoint(stroke.headX, stroke.headY);
    this.strokes.push(stroke);
    this.spawned += 1;
  }

  /**
   * 终章：把纸上的墨召回到拓印目标上。
   * 分波次错峰，保证同一时刻在飞的墨点是有限且可控的。
   */
  startHatch(targets: readonly HatchTarget[], marksPerTarget = 2): void {
    this.hatchActive = true;
    this.hatchDone = false;
    this.hatchPlaced = 0;
    this.hatchElapsed = 0;

    const wanted = Math.min(MIGRANT_CAPACITY, targets.length * marksPerTarget);
    const count = Math.min(wanted, Math.max(targets.length, this.markCount * marksPerTarget));
    this.migrantCount = 0;
    if (count === 0 || targets.length === 0) {
      this.hatchTotal = 0;
      this.hatchDone = true;
      return;
    }

    const spread = 2.5;
    for (let i = 0; i < count; i += 1) {
      const target = targets[i % targets.length];
      const sourceIndex = this.markCount > 0 ? (i * 7 + 3) % this.markCount : -1;
      const mark = this.migrantCount;
      this.mx0[mark] = sourceIndex >= 0 ? this.markX[sourceIndex] : this.width / 2;
      this.my0[mark] = sourceIndex >= 0 ? this.markY[sourceIndex] : this.height / 2;
      this.mtx[mark] = target.x + this.rand.range(-1.4, 1.4);
      this.mty[mark] = target.y + this.rand.range(-1.4, 1.4);
      this.mAngle0[mark] = sourceIndex >= 0 ? this.markAngle[sourceIndex] : 0;
      this.mAngle1[mark] = target.angle + this.rand.range(-0.22, 0.22);
      this.mDelay[mark] = (i / count) * spread + this.rand.range(0, 0.08);
      this.mEase[mark] = this.rand.range(0.72, 1.05);
      this.mSize[mark] = target.size * this.rand.range(0.82, 1.24);
      this.mLanded[mark] = 0;
      this.migrantCount += 1;
    }
    this.hatchTotal = this.migrantCount;
    this.hatchDuration = spread + 1.05;
  }

  /** 静置呈现：不为动效花时间，直接把拓印结果写进纸里 */
  bakeHatch(): void {
    if (!this.hatchActive) return;
    for (let i = 0; i < this.migrantCount; i += 1) {
      if (!this.mLanded[i]) this.land(i);
    }
    this.hatchPlaced = this.hatchTotal;
    this.hatchDone = true;
  }

  update(dt: number, params: FieldParams): void {
    // 同时进行多少笔：低温是"一支笔在写"，高温是"很多句话一起说"
    const spawnRate = lerp(0.7, 20, params.temperature * params.temperature) * params.ambient;
    this.spawnAccum += dt * spawnRate;
    while (this.spawnAccum >= 1) {
      this.spawnAccum -= 1;
      this.spawn(params);
    }

    for (let i = this.strokes.length - 1; i >= 0; i -= 1) {
      const stroke = this.strokes[i];
      // 墨尽的笔迹会在 grow 内当场收进纸里并从队列移除
      if (stroke.state === StrokeState.Live) this.grow(stroke, dt, params);
    }

    this.updateDrips(dt);
    if (this.hatchActive) this.updateMigrants(dt);
  }

  private spawn(params: FieldParams): void {
    if (this.strokes.length >= params.maxStrokes) {
      const oldest = this.oldestLive();
      if (oldest) {
        // 注意力只有这么多：最老的那条被迫结束，成为纸上的灰
        this.abandoned += 1;
        this.retire(oldest);
        this.strokes.splice(this.strokes.indexOf(oldest), 1);
      }
    }

    const temperature = params.temperature;
    const stroke = this.pool.acquire();
    stroke.seed = (this.rand.next() * 0xffff) | 0;
    stroke.color = COLOR_INDEX.ink;
    stroke.nib = this.rand.next() < 0.08 + temperature * 0.08 ? "dry" : "wet";
    stroke.width = lerp(2.4, 3.4, this.rand.next()) * lerp(0.88, 1.1, temperature);
    // curl 是"曲率上限"（1/最小转弯半径）：温度越高，笔越散
    stroke.curl = (1 / lerp(560, 110, temperature)) * this.rand.range(0.8, 1.25);
    stroke.speed = lerp(70, 130, this.rand.next()) * lerp(0.9, 1.2, temperature);
    stroke.spacing = this.rand.range(0.85, 1.5);
    stroke.attract = params.attract;

    const parent = this.pickParent(temperature);
    const continues =
      parent !== null && parent.state === StrokeState.Live && parent.headX <= this.rowEnd(params);
    if (parent && continues) {
      this.continueFrom(stroke, parent, temperature);
    } else {
      this.begin(stroke, parent, params, temperature);
    }

    stroke.pushPoint(stroke.headX, stroke.headY);
    this.strokes.push(stroke);
    this.spawned += 1;
  }

  /** 接着上一笔写：位置接住，方向只偏一点，浓淡也接着——同一次沾墨的延续。 */
  private continueFrom(stroke: Stroke, parent: Stroke, temperature: number): void {
    const fork = lerp(0.05, 0.34, temperature) * this.rand.sign() * this.rand.range(0.5, 1.2);
    const cos = Math.cos(fork);
    const sin = Math.sin(fork);
    stroke.dirX = parent.dirX * cos - parent.dirY * sin;
    stroke.dirY = parent.dirX * sin + parent.dirY * cos;
    stroke.headX = parent.headX;
    stroke.headY = parent.headY;
    stroke.alpha = Math.max(0.4, Math.min(0.95, parent.alpha * this.rand.range(0.9, 1.02)));
    stroke.ramp = 0;
    // 分叉只是把这一句接着说下去，不是另开一条无限长的线
    stroke.reservoir = Math.max(150, parent.reservoir * this.rand.range(0.72, 1.05));
  }

  /**
   * 起笔：要么另起一行接着写（低温：纸上有格线，一行行写下去），
   * 要么在纸上散开一笔（高温：想的事情太多，写不成行）。
   */
  private begin(stroke: Stroke, parent: Stroke | null, params: FieldParams, temperature: number): void {
    stroke.reservoir = this.rand.range(220, 520) * lerp(1, 0.62, temperature);
    stroke.alpha = this.rand.range(0.5, 0.95);

    if (this.rand.next() < clamp01((temperature - 0.45) * 1.6)) {
      const angle = this.rand.range(-1.05, 1.05);
      stroke.dirX = Math.cos(angle);
      stroke.dirY = Math.sin(angle);
      stroke.headX = params.originX + this.rand.range(-0.34, 0.34) * this.width;
      stroke.headY = params.originY + this.rand.range(-0.3, 0.3) * this.height;
      return;
    }

    if (parent) this.advanceRow(parent.headY, params);
    else if (this.rowY < 0) this.rowY = this.rowTop(params);
    stroke.headY = this.rowY;
    stroke.headX = this.rowStart(params) + this.rand.range(-8, 8) + (this.rowPass % 6) * 9;
    const slope = lerp(0.005, 0.06, this.rand.next());
    stroke.dirX = Math.cos(slope);
    stroke.dirY = Math.sin(slope);
    stroke.speed *= 0.92;
  }

  /** 换行：写完一行往下挪一格，写到这一栏底再从顶上重来（每一遍都错开一点）。 */
  private advanceRow(fromY: number, params: FieldParams): void {
    const next = Math.round(fromY / ROW_SPACING) * ROW_SPACING + ROW_SPACING;
    if (next > this.rowBottom(params)) {
      this.rowY = this.rowTop(params);
      this.rowPass += 1;
      return;
    }
    this.rowY = Math.max(this.rowTop(params), next);
  }

  private rowTop(params: FieldParams): number {
    return Math.max(30, Math.round((params.originY - 150) / ROW_SPACING) * ROW_SPACING);
  }

  private rowBottom(params: FieldParams): number {
    return Math.min(this.height - 46, this.rowTop(params) + ROW_SPACING * 15);
  }

  private rowLength(): number {
    return Math.min(460, this.width * 0.46);
  }

  private rowStart(params: FieldParams): number {
    const length = this.rowLength();
    return Math.max(28, Math.min(params.originX - length * 0.5, this.width - length - 28));
  }

  private rowEnd(params: FieldParams): number {
    return this.rowStart(params) + this.rowLength();
  }

  /**
   * 挑一支笔继续写。温度低时总是从刚刚那一笔接着写（像一行行写下去的笔），
   * 温度高时在纸上的候选里随机挑一条分叉（想着的句子互相打断）。
   */
  private pickParent(temperature: number): Stroke | null {
    if (this.strokes.length === 0) return null;
    if (this.rand.next() > temperature) {
      const last = this.strokes[this.strokes.length - 1];
      return last && last.state === StrokeState.Live ? last : null;
    }
    return this.strokes[(this.rand.next() * this.strokes.length) | 0] ?? null;
  }

  private oldestLive(): Stroke | null {
    let oldest: Stroke | null = null;
    for (const stroke of this.strokes) {
      if (stroke.state !== StrokeState.Live) continue;
      if (!oldest || stroke.life > oldest.life) oldest = stroke;
    }
    return oldest;
  }

  private grow(stroke: Stroke, dt: number, params: FieldParams): void {
    stroke.life += dt;
    if (stroke.travel >= stroke.reservoir) {
      this.settle(stroke);
      return;
    }

    const micro = stroke.spacing;
    let travel = stroke.speed * dt + stroke.debt;

    while (travel >= micro) {
      travel -= micro;
      stroke.travel += micro;

      const nf = 0.0026;
      // 两种尺度的抖动：长波是"行笔的方向"（温度驱动），短波是手抖（与温度无关）
      const tremor = fbm2(stroke.headX * 0.021, stroke.headY * 0.021, stroke.seed + 31) * 0.0035;
      const turn =
        (fbm2(stroke.headX * nf, stroke.headY * nf, stroke.seed) * stroke.curl + tremor) * micro * 1.15;
      const cos = Math.cos(turn);
      const sin = Math.sin(turn);
      const dirX = stroke.dirX * cos - stroke.dirY * sin;
      const dirY = stroke.dirX * sin + stroke.dirY * cos;
      stroke.dirX = dirX;
      stroke.dirY = dirY;

      if (params.pointerActive && stroke.attract > 0) {
        const dx = params.pointerX - stroke.headX;
        const dy = params.pointerY - stroke.headY;
        const dist = Math.hypot(dx, dy);
        if (dist > 8 && dist < 360) {
          const pull = (stroke.attract * micro * 0.016) / dist;
          stroke.dirX += dx * pull;
          stroke.dirY += dy * pull;
          const norm = Math.hypot(stroke.dirX, stroke.dirY) || 1;
          stroke.dirX /= norm;
          stroke.dirY /= norm;
        }
      }

      stroke.headX += stroke.dirX * micro;
      stroke.headY += stroke.dirY * micro;
      stroke.micro += 1;
      if (stroke.micro % stroke.pathEvery === 0) stroke.pushPoint(stroke.headX, stroke.headY);

      const progress = clamp01(stroke.travel / stroke.reservoir);
      // 钢笔：整条线粗细稳定，只在起收笔处略轻；接着上一笔写的那一截不重新起笔
      const taper = Math.min(1, (stroke.travel + stroke.ramp) / 14);
      // 按压力：笔画的粗细与浓淡沿途轻微起伏，不是一条均匀的线；
      // 笔锋离开纸面时收细，所以最后几像素要收笔
      const exit = Math.min(1, Math.max(0, stroke.reservoir - stroke.travel) / 7);
      const pressure = 0.85 + fbm2(stroke.travel * 0.019, stroke.seed * 0.0013, stroke.seed + 71) * 0.21;
      const width = stroke.width * taper * lerp(1, 0.74, progress) * pressure * (0.45 + exit * 0.55);
      const nib = progress > 0.78 ? "dry" : stroke.nib;
      const jitter = fbm2(stroke.headX * 0.03, stroke.headY * 0.03, stroke.seed + 5) * 0.16;
      this.paint.push(
        stroke.headX,
        stroke.headY,
        width,
        Math.atan2(stroke.dirY, stroke.dirX) + jitter,
        stroke.alpha * lerp(1, 0.72, progress) * (0.86 + pressure * 0.16),
        stroke.color,
        NIB_INDEX[nib],
      );

      if (stroke.travel >= stroke.reservoir) break;
    }

    stroke.debt = travel;

    const margin = 110;
    if (
      stroke.headX < -margin ||
      stroke.headX > this.width + margin ||
      stroke.headY < -margin ||
      stroke.headY > this.height + margin
    ) {
      this.abandoned += 1;
      this.retire(stroke);
      this.strokes.splice(this.strokes.indexOf(stroke), 1);
    }
  }

  /** 墨尽：这条线从此就写在纸上了，纸上的墨已经一次画好，不需要再补。 */
  private settle(stroke: Stroke): void {
    this.retire(stroke);
    this.strokes.splice(this.strokes.indexOf(stroke), 1);
  }

  private updateMigrants(dt: number): void {
    this.hatchElapsed += dt;
    let landed = 0;
    const total = this.migrantCount;

    for (let i = 0; i < total; i += 1) {
      if (this.mLanded[i]) {
        landed += 1;
        continue;
      }
      const local = (this.hatchElapsed - this.mDelay[i]) / this.mEase[i];
      if (local < 0) continue;
      if (local >= 1) {
        this.land(i);
        landed += 1;
        continue;
      }

      const eased = easeInOutCubic(local);
      const x = lerp(this.mx0[i], this.mtx[i], eased);
      const y = lerp(this.my0[i], this.mty[i], eased);
      // 飞行的墨点被拉长：速度感来自笔迹本身
      const stretch = lerp(0.5, 0.16, eased);
      const angle = lerp(this.mAngle0[i], this.mAngle1[i], eased);
      const size = this.mSize[i] * lerp(0.75, 1, eased);
      const alpha = lerp(0.5, 0.95, eased);
      this.live.push(x, y, size * 0.5, angle, alpha, COLOR_INDEX.ink, NIB_INDEX.wet);
      if (stretch > 0.3) {
        const sx = x - Math.cos(angle) * size * stretch;
        const sy = y - Math.sin(angle) * size * stretch;
        this.live.push(sx, sy, size * 0.28, angle, alpha * 0.5, COLOR_INDEX.ghost, NIB_INDEX.ghost);
      }
      landed += 1;
    }

    this.hatchPlaced = landed;
    if (this.hatchElapsed >= this.hatchDuration) {
      for (let i = 0; i < total; i += 1) if (!this.mLanded[i]) this.land(i);
      this.hatchPlaced = this.migrantCount;
      this.hatchDone = true;
    }
  }

  /** 落墨：永久写进纸里，并留下一圈渗开的湿痕 */
  private land(index: number): void {
    const x = this.mtx[index];
    const y = this.mty[index];
    const angle = this.mAngle1[index];
    const size = this.mSize[index];
    this.mLanded[index] = 1;
    this.paint.push(x, y, size * 0.5, angle, 1, COLOR_INDEX.ink, NIB_INDEX.wet);
    this.paint.push(
      x + this.rand.range(-1.2, 1.2),
      y + this.rand.range(-1.2, 1.2),
      size * 0.32,
      angle,
      0.42,
      COLOR_INDEX.ink,
      NIB_INDEX.ghost,
    );
  }

  private addDrip(x: number, y: number, width: number): void {
    const i = this.dripCount;
    this.dripX[i] = x;
    this.dripY[i] = y;
    this.dripV[i] = 40 + this.rand.range(0, 60);
    this.dripR[i] = width * this.rand.range(2.2, 4.2);
    this.dripLife[i] = 0;
    this.dripTtl[i] = this.rand.range(0.5, 1.25);
    this.dripCount += 1;
  }

  private updateDrips(dt: number): void {
    for (let i = this.dripCount - 1; i >= 0; i -= 1) {
      this.dripLife[i] += dt;
      this.dripV[i] = Math.min(TERMINAL, this.dripV[i] + GRAVITY * dt * 0.35);
      this.dripY[i] += this.dripV[i] * dt;
      const t = clamp01(this.dripLife[i] / this.dripTtl[i]);
      const radius = this.dripR[i] * lerp(1, 2.9, t);
      const alpha = lerp(0.5, 0.06, t);
      this.live.push(this.dripX[i], this.dripY[i], radius, 0, alpha, COLOR_INDEX.ghost, NIB_INDEX.ghost);

      if (t >= 1 || this.dripY[i] > this.height + 40) {
        // 被纸吸干：留下一小块渗开的灰
        this.paint.push(
          this.dripX[i],
          Math.min(this.dripY[i], this.height + 6),
          radius * 1.45,
          0,
          0.11,
          COLOR_INDEX.ghost,
          NIB_INDEX.ghost,
        );
        const last = this.dripCount - 1;
        if (i !== last) {
          this.dripX[i] = this.dripX[last];
          this.dripY[i] = this.dripY[last];
          this.dripV[i] = this.dripV[last];
          this.dripR[i] = this.dripR[last];
          this.dripLife[i] = this.dripLife[last];
          this.dripTtl[i] = this.dripTtl[last];
        }
        this.dripCount -= 1;
      }
    }
  }

  /** 把断口以下的墨抹掉：用 destination-out 记号挖出纸面，像真的被割掉。 */
  private erasePathBelow(stroke: Stroke, clipY: number): void {
    if (stroke.count < 2) return;
    const spacing = Math.max(1.4, stroke.spacing);
    for (let i = 0; i < stroke.count - 1; i += 1) {
      const x0 = stroke.x[i];
      const y0 = stroke.y[i];
      const dx = stroke.x[i + 1] - x0;
      const dy = stroke.y[i + 1] - y0;
      const len = Math.hypot(dx, dy);
      if (len < 0.001) continue;
      const steps = Math.max(1, Math.round(len / spacing));
      for (let s = 0; s <= steps; s += 1) {
        const t = s / steps;
        const px = x0 + dx * t;
        const py = y0 + dy * t;
        if (py <= clipY) continue;
        this.paint.pushErase(px, py, stroke.width * 1.6, Math.atan2(dy, dx), 1);
      }
    }
    // 还在长的那一截没有中心线点，也要抹掉
    if (stroke.headY > clipY) {
      this.paint.pushErase(stroke.headX, stroke.headY, stroke.width * 1.6, 0, 1);
    }
  }

  /** 刀口：一条被手撕开一样的裂口，横着穿过整张纸。 */
  private drawCut(clipY: number): void {
    const step = 5;
    for (let x = -10; x < this.width + 10; x += step) {
      const wobble = fbm2(x * 0.02, clipY * 0.02, 91) * 2.6;
      this.paint.pushErase(x, clipY + wobble, 1.9, 0, 0.94);
    }
  }

  /** 记下这条墨的摘要，然后把笔迹对象还给池子：纸上的灰不需要几何。 */
  private retire(stroke: Stroke): void {
    if (this.markCount >= MARK_CAPACITY) {
      this.markX.copyWithin(0, 1);
      this.markY.copyWithin(0, 1);
      this.markAngle.copyWithin(0, 1);
      this.markExtent.copyWithin(0, 1);
      this.markCount -= 1;
    }
    const dx = stroke.headX - stroke.x[0];
    const dy = stroke.headY - stroke.y[0];
    this.markX[this.markCount] = stroke.centroidX;
    this.markY[this.markCount] = stroke.centroidY;
    this.markAngle[this.markCount] = Math.atan2(dy, dx);
    this.markExtent[this.markCount] = Math.max(1, Math.hypot(dx, dy));
    this.markCount += 1;
    stroke.state = StrokeState.Archived;
    this.pool.release(stroke);
  }
}
