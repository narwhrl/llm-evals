import { noise2, TAU, lerp, clamp, nearWeight } from './noise';
import { CHAPTERS, AMBIENT_CHARS, type ChapterDef, type StanzaSize } from './text';

interface Glyph {
  ch: string;
  pendingCh: string | null;
  x: number;
  y: number;
  vx: number;
  vy: number;
  hx: number;
  hy: number;
  /** 夜章印床：归一化格点偏移（-1..1），乘以印床半边长得目标。 */
  sealX: number;
  sealY: number;
  slot: number;
  size: number;
  ink: number;
  seed: number;
}

interface Slot {
  ch: string;
  dx: number;
  dy: number;
  size: number;
  red: boolean;
}

interface Params {
  flow: number;
  mist: number;
  radius: number;
  ink: [number, number, number];
  anchorFree: number;
  yHi: number;
}

const CJK_RE = /[一-鿿々]/;
const FONT_STACK = '"Noto Serif SC", "Songti SC", "STSong", serif';
const CINNABAR: [number, number, number] = [178, 58, 42];

/**
 * InkEngine —— 全站唯一核心装置。
 * 一条由文字构成的河：流场驱动字粒漂移（墨），注意力窗内的字粒被弹簧
 * 拉回各自的"字位"凝聚成句（形）。滚动只改变章节氛围参数，装置逻辑不变。
 */
export class InkEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private glyphs: Glyph[] = [];
  private slots: Slot[] = [];
  private raf = 0;
  private running = false;
  private last = 0;
  private t = 0;
  private lens = { x: 0, y: 0 };
  private anchor = { x: 0, y: 0 };
  private pointer = { x: 0, y: 0 };
  private lastPointerAt = -1e9;
  private chapter = 0;
  private chapterProgress = 0;
  private cur: Params;
  /** 夜章汇聚度 0..1：河字沉向印床。 */
  private seal = 0;
  /** 静止致意 0..1：访客停下时，河也慢下来。 */
  private calm = 0;
  private calmTarget = 0;
  private dwellMap = new Map<string, number>();
  private widthCache = new Map<string, number>();
  private fontCache = new Map<number, string>();
  private fillCache = new Map<string, string>();
  private injectQueue: string[] = [];
  private reduced: boolean;
  private frameCost = 16;
  private perfWindow: number[] = [];
  private disposed = false;
  private onVisibility: () => void;

  constructor(canvas: HTMLCanvasElement, reduced: boolean) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) throw new Error('Canvas 2D unavailable');
    this.ctx = ctx;
    this.reduced = reduced;
    this.cur = this.paramsOf(CHAPTERS[0]);
    this.resize();
    this.lens = { x: this.w / 2, y: this.h * 0.46 };
    this.anchor = { x: this.w / 2, y: this.h * 0.46 };
    this.pointer = { ...this.lens };
    this.spawnGlyphs();
    this.layoutSlots();
    this.assignGlyphs();
    if (this.reduced) this.renderStatic();
    this.onVisibility = () => {
      if (document.hidden) this.stop();
      else this.start();
    };
    document.addEventListener('visibilitychange', this.onVisibility);
  }

  private paramsOf(def: ChapterDef): Params {
    return {
      flow: def.flow,
      mist: def.mist,
      radius: def.radius,
      ink: def.ink,
      anchorFree: def.anchorFree,
      yHi: def.yHi,
    };
  }

  // ---- 公共 API ----

  setReduced(reduced: boolean): void {
    if (this.reduced === reduced) return;
    this.reduced = reduced;
    if (reduced) {
      this.stop();
      this.renderStatic();
    } else {
      this.start();
    }
  }

  setPointer(x: number, y: number): void {
    this.pointer.x = x;
    this.pointer.y = y;
    this.lastPointerAt = performance.now();
  }

  setChapter(index: number, progress: number): void {
    if (index !== this.chapter && index >= 0 && index < CHAPTERS.length) {
      this.chapter = index;
      this.layoutSlots();
      this.assignGlyphs();
      if (this.reduced) this.renderStatic();
    }
    this.chapterProgress = progress;
  }

  /** 字体加载完成后重测字宽并重排（避免回退字体宽度被永久缓存）。 */
  refreshFonts(): void {
    this.widthCache.clear();
    this.layoutSlots();
    this.assignGlyphs();
    if (this.reduced) this.renderStatic();
  }

  /** 静止致意：访客无操作时，全站装置随批注一起静下来。 */
  setCalm(calm: boolean): void {
    this.calmTarget = calm ? 1 : 0;
  }

  /** 把访客续写的文字注入河床：最暗的环境字粒依次换墨成这些字。 */
  injectText(text: string): void {
    this.injectQueue.push(...Array.from(text).slice(0, 120));
  }

  /** 外部（章节驻留）兜底：给某段文字的字加权，供钤印选字。 */
  noteExternalDwell(text: string, weight: number): void {
    for (const ch of Array.from(text)) {
      if (!CJK_RE.test(ch)) continue;
      this.dwellMap.set(ch, (this.dwellMap.get(ch) ?? 0) + weight);
    }
  }

  /** 驻留最久的 n 个汉字（钤印用字）。 */
  getDwellChars(n: number): string[] {
    return Array.from(this.dwellMap.entries())
      .filter(([ch, w]) => CJK_RE.test(ch) && w > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, n)
      .map(([ch]) => ch);
  }

  resize(): void {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, vw < 700 ? 1.5 : 1.75);
    this.w = vw;
    this.h = vh;
    this.canvas.width = Math.round(vw * this.dpr);
    this.canvas.height = Math.round(vh * this.dpr);
    this.canvas.style.width = `${vw}px`;
    this.canvas.style.height = `${vh}px`;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    if (this.glyphs.length) {
      this.layoutSlots();
      this.assignGlyphs();
    }
    if (this.reduced) this.renderStatic();
  }

  start(): void {
    if (this.running || this.reduced || this.disposed || document.hidden) return;
    this.running = true;
    this.last = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      this.raf = requestAnimationFrame(loop);
      this.frame(now);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop(): void {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose(): void {
    this.disposed = true;
    this.stop();
    document.removeEventListener('visibilitychange', this.onVisibility);
  }

  // ---- 字粒与字位 ----

  private glyphBudget(): number {
    const base = Math.round((this.w * this.h) / 1900);
    return clamp(base, this.w < 700 ? 240 : 420, this.w < 700 ? 360 : 820);
  }

  private spawnGlyphs(): void {
    const n = this.glyphBudget();
    this.glyphs = [];
    const cols = Math.ceil(Math.sqrt(n));
    for (let i = 0; i < n; i++) {
      const x = Math.random() * this.w;
      const y = Math.random() * this.h;
      // 印床格点：带抖动的网格，归一化到 -1..1。
      const gx = (i % cols) / cols;
      const gy = Math.floor(i / cols) / cols;
      this.glyphs.push({
        ch: AMBIENT_CHARS[Math.floor(Math.random() * AMBIENT_CHARS.length)],
        pendingCh: null,
        x,
        y,
        vx: 0,
        vy: 0,
        hx: x,
        hy: y,
        sealX: (gx - 0.5) * 1.9 + (Math.random() - 0.5) * 0.06,
        sealY: (gy - 0.5) * 1.9 + (Math.random() - 0.5) * 0.06,
        slot: -1,
        size: 12 + Math.random() * 6,
        ink: 0.1,
        seed: Math.random() * 1000,
      });
    }
  }

  private sizeFor(s: StanzaSize): number {
    const m = this.w < 700;
    switch (s) {
      case 'xl': return Math.min(this.w * 0.17, 96);
      case 'lg': return m ? 26 : 30;
      case 'md': return m ? 18 : 22;
      case 'sm': return m ? 14 : 16;
    }
  }

  private measure(ch: string, size: number): number {
    const key = `${ch}@${size}`;
    let wdt = this.widthCache.get(key);
    if (wdt === undefined) {
      this.ctx.font = this.fontFor(size);
      wdt = this.ctx.measureText(ch).width;
      this.widthCache.set(key, wdt);
    }
    return wdt;
  }

  private fontFor(size: number): string {
    let f = this.fontCache.get(size);
    if (!f) {
      f = `600 ${size}px ${FONT_STACK}`;
      this.fontCache.set(size, f);
    }
    return f;
  }

  private layoutSlots(): void {
    const def = CHAPTERS[this.chapter];
    const pageW = Math.min(this.w * (this.w < 700 ? 0.88 : 0.76), 640);
    const lines = def.stanza.map((l) => ({ ...l, px: this.sizeFor(l.size) }));
    const lineHs = lines.map((l) => l.px * (l.size === 'xl' ? 1.35 : l.size === 'sm' ? 2.0 : 2.1));
    const total = lineHs.reduce((a, b) => a + b, 0);
    const slots: Slot[] = [];
    let dy = -total / 2;
    for (let li = 0; li < lines.length; li++) {
      const line = lines[li];
      dy += lineHs[li] / 2;
      const chars = Array.from(line.text);
      const widths = chars.map((c) => Math.max(this.measure(c, line.px), line.px * 0.32));
      const tw = Math.min(widths.reduce((a, b) => a + b, 0), pageW);
      let dx = -tw / 2;
      for (let ci = 0; ci < chars.length; ci++) {
        slots.push({
          ch: chars[ci],
          dx: dx + widths[ci] / 2,
          dy,
          size: line.px,
          red: line.red?.includes(ci) ?? false,
        });
        dx += widths[ci];
      }
      dy += lineHs[li] / 2;
    }
    this.slots = slots;
  }

  private morphUntil = 0;

  private assignGlyphs(): void {
    const byChar = new Map<string, Glyph[]>();
    for (const g of this.glyphs) {
      g.slot = -1;
      const arr = byChar.get(g.ch);
      if (arr) arr.push(g);
      else byChar.set(g.ch, [g]);
    }
    const filled = new Array<boolean>(this.slots.length).fill(false);
    this.slots.forEach((slot, i) => {
      const arr = byChar.get(slot.ch);
      if (arr && arr.length > 0) {
        arr.pop()!.slot = i;
        filled[i] = true;
      }
    });
    const rest = this.glyphs.filter((g) => g.slot < 0).sort((a, b) => a.ink - b.ink);
    let ri = 0;
    this.slots.forEach((slot, i) => {
      if (filled[i]) return;
      const g = rest[ri++];
      if (!g) return;
      g.slot = i;
      g.pendingCh = slot.ch;
    });
    // 转场窗口：章节切换后 0.9s 内允许亮处换墨，避免"错字高亮"死锁。
    this.morphUntil = this.t + 0.9;
    // 释出的字粒解散旧居：亮者就地化入河流（保留"上章文字流入河中"的因果），
    // 暗者随机归位，防止整团漂移。
    for (const g of this.glyphs) {
      if (g.slot >= 0) continue;
      if (g.ink > 0.3) {
        g.hx = g.x;
        g.hy = g.y;
      } else {
        g.hx = Math.random() * this.w;
        g.hy = Math.random() * this.h;
      }
    }
  }

  // ---- 主循环 ----

  private frame(now: number): void {
    const dtMs = clamp(now - this.last, 4, 50);
    this.last = now;
    const dtF = dtMs / 16.667;
    this.t += dtMs / 1000;

    // 性能自适应：帧耗 EMA 超预算则削减环境字粒。
    this.frameCost = this.frameCost * 0.95 + dtMs * 0.05;
    this.perfWindow.push(dtMs);
    if (this.perfWindow.length >= 90) {
      this.perfWindow.length = 0;
      if (this.frameCost > 26 && this.glyphs.length > 260) {
        let cut = Math.floor(this.glyphs.length * 0.2);
        for (let i = this.glyphs.length - 1; i >= 0 && cut > 0; i--) {
          if (this.glyphs[i].slot < 0) {
            this.glyphs.splice(i, 1);
            cut--;
          }
        }
      }
    }

    // 章节氛围参数平滑过渡（转场的连续性来源）。
    const def = CHAPTERS[this.chapter];
    const target = this.paramsOf(def);
    if (this.chapter === 3) target.radius = lerp(150, 92, this.chapterProgress);
    const k = 0.04 * dtF;
    this.cur.flow = lerp(this.cur.flow, target.flow, k);
    this.cur.mist = lerp(this.cur.mist, target.mist, k);
    this.cur.radius = lerp(this.cur.radius, target.radius, k);
    this.cur.anchorFree = lerp(this.cur.anchorFree, target.anchorFree, k);
    this.cur.yHi = lerp(this.cur.yHi, target.yHi, k);
    for (let i = 0; i < 3; i++) this.cur.ink[i] = lerp(this.cur.ink[i], target.ink[i], k);
    // 夜章汇聚随章内进度推进；静止致意全局生效。
    const sealTarget = this.chapter === 4 ? clamp(this.chapterProgress * 1.5, 0, 1) : 0;
    this.seal = lerp(this.seal, sealTarget, 0.03 * dtF);
    this.calm = lerp(this.calm, this.calmTarget, 0.05 * dtF);

    // 目光：指针活跃 8s 内跟随指针，否则自主游移（无人操作也有生命）。
    const pointerActive = now - this.lastPointerAt < 8000;
    let tx: number;
    let ty: number;
    if (pointerActive) {
      tx = this.pointer.x;
      ty = this.pointer.y;
    } else {
      tx = this.w / 2 + this.w * 0.3 * Math.sin(this.t * 0.32) + this.w * 0.06 * Math.sin(this.t * 0.9 + 1.7);
      ty = this.h * 0.46 + this.h * 0.24 * Math.cos(this.t * 0.24) + this.h * 0.05 * Math.cos(this.t * 0.77);
    }
    const lensK = (pointerActive ? 0.14 : 0.03) * dtF;
    this.lens.x = lerp(this.lens.x, tx, lensK);
    this.lens.y = lerp(this.lens.y, ty, lensK);

    // 页面锚点：跟随目光，或（夜）锚定中心。
    // 钳制在上半纸面——下半页留给 DOM 散文与表单，避免装置文本压扁阅读区。
    const ax = lerp(this.w / 2, this.lens.x, this.cur.anchorFree);
    const ay = lerp(this.h / 2, this.lens.y, this.cur.anchorFree);
    const yHi = this.h * this.cur.yHi * (this.w < 700 ? 0.55 : 1);
    this.anchor.x = lerp(this.anchor.x, clamp(ax, this.w * 0.2, this.w * 0.8), 0.045 * dtF);
    this.anchor.y = lerp(this.anchor.y, clamp(ay, this.h * 0.16, yHi), 0.045 * dtF);

    // 注入的访客文字：找最暗的环境字粒换墨。
    let injectBudget = 3;
    const ctx2d = this.ctx;
    ctx2d.clearRect(0, 0, this.w, this.h);
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';

    const { radius } = this.cur;
    const flow = this.cur.flow * (1 - 0.82 * this.calm);
    const mist = this.cur.mist * (1 - 0.45 * this.calm);
    const inkC = this.cur.ink;
    const lensX = this.lens.x;
    const lensY = this.lens.y;
    const anchorX = this.anchor.x;
    const anchorY = this.anchor.y;
    const tSec = this.t;

    for (const g of this.glyphs) {
      // 流场目标：主导流向（向左缓行的河）+ 噪声扰动。
      const a = Math.PI + (noise2(g.hx * 0.0021, g.hy * 0.0021 + tSec * 0.05) - 0.5) * TAU * 0.85;
      const drift = 26 + 14 * noise2(g.seed, tSec * 0.1);
      let ftx = g.hx + Math.cos(a) * drift;
      let fty = g.hy + Math.sin(a) * drift - 8;

      let wgt = 0;
      let sx = 0;
      let sy = 0;
      let slotSize = g.size;
      let red = false;
      if (g.slot >= 0) {
        const s = this.slots[g.slot];
        sx = anchorX + s.dx;
        sy = anchorY + s.dy;
        slotSize = s.size;
        red = s.red;
        // 椭圆阅读带：横向舒展、纵向收紧——目光按行阅读，不是按点。
        const ndx = (sx - lensX) / (radius * 1.85);
        const ndy = (sy - lensY) / (radius * 0.92);
        wgt = nearWeight(Math.hypot(ndx, ndy), 0.62, 1);
        // 页籍字粒的"河流"只是字位邻域内的徘徊：偏移有界，保证平衡位置收敛到字位。
        // 纵向幅度刻意小于横向——行距 38px，纵摆过大会撞行。
        const ox = clamp(ftx - sx, -38, 38) + (noise2(g.seed + tSec * 0.15, 3.7) - 0.5) * 20;
        const oy = clamp(fty - sy, -18, 18) + (noise2(g.seed, tSec * 0.15 + 11.3) - 0.5) * 9;
        ftx = sx + ox;
        fty = sy + oy;
      } else if (this.seal > 0.01) {
        // 夜：河字沉向视口中心的印床——河流收束为印章的底。边缘格点权重渐弱，印床成晕染的方形。
        const half = Math.min(this.w, this.h) * 0.21;
        const edge = 1 - 0.42 * Math.max(Math.abs(g.sealX), Math.abs(g.sealY));
        const sw = this.seal * edge;
        ftx = lerp(ftx, this.w / 2 + g.sealX * half, sw);
        fty = lerp(fty, this.h / 2 + g.sealY * half, sw);
      }

      // 位置权重做二次 smoothstep：半成形环带收窄，读感更干净。
      const w2 = wgt * wgt * (3 - 2 * wgt);
      // 到位度：飞行途中保持轻墨，抵达字位才落浓。
      const conv = g.slot >= 0 ? nearWeight(Math.hypot(g.x - sx, g.y - sy), 40, 260) : 0;
      const form = w2 * conv;
      // 弹簧：窗内收紧（提按），窗外松弛（漂移）；字位目标随权重去掉漂移分量。
      const jitter = 0.85 + 0.3 * noise2(g.seed, 7.3);
      const kk = (0.016 + w2 * 0.1) * jitter * dtF;
      const damp = Math.pow(0.84, dtF);
      g.vx = (g.vx + (lerp(ftx, sx, w2) - g.x) * kk) * damp;
      g.vy = (g.vy + (lerp(fty, sy, w2) - g.y) * kk) * damp;
      g.x += g.vx * dtF;
      g.y += g.vy * dtF;

      // 墨量：锐化窗权重 × 到位度。
      const mistHere = mist * (0.55 + 0.45 * noise2(g.seed * 3.1, tSec * 0.13));
      const inkTarget = g.slot >= 0 ? lerp(mistHere, 1, form) : lerp(mistHere, 0.17, this.seal);
      g.ink = lerp(g.ink, inkTarget, 0.08 * dtF);

      // 换墨：暗处随时可换；转场窗口内亮处也允许（章节切换的整体重排）。
      if (g.pendingCh !== null && (g.ink < 0.22 || tSec < this.morphUntil)) {
        g.ch = g.pendingCh;
        g.pendingCh = null;
      }

      // 环境字粒的家漂移 + 边界环绕
      if (g.slot < 0) {
        g.hx += Math.cos(a) * flow * 0.5 * dtF;
        g.hy += (Math.sin(a) * 0.7 - 0.12) * flow * 0.5 * dtF;
        if (g.hx < -60) g.hx = this.w + 50;
        else if (g.hx > this.w + 60) g.hx = -50;
        if (g.hy < -60) g.hy = this.h + 50;
        else if (g.hy > this.h + 60) g.hy = -50;
        // 注入文字的宿主选择
        if (injectBudget > 0 && this.injectQueue.length > 0 && g.ink < 0.13) {
          const ch = this.injectQueue.shift()!;
          g.ch = ch;
          injectBudget--;
        }
      }

      // 驻留记录：真正成形（到位且入窗）的字才算"被读过"。
      if (g.slot >= 0 && form > 0.6 && g.ink > 0.5 && CJK_RE.test(g.ch)) {
        this.dwellMap.set(g.ch, (this.dwellMap.get(g.ch) ?? 0) + dtMs * g.ink);
      }

      // 绘制
      if (g.ink < 0.02) continue;
      // 环绕重生的字粒在纸缘淡入，藏起瞬移。
      let edgeFade = 1;
      if (g.slot < 0) {
        const ex = Math.min(g.x, this.w - g.x);
        const ey = Math.min(g.y, this.h - g.y);
        edgeFade = clamp(Math.min(ex, ey) / 90, 0, 1);
      }
      const rSize = Math.max(6, Math.round(lerp(g.size, slotSize, form)));
      ctx2d.font = this.fontFor(rSize);
      const rgb = red && form > 0.45 ? CINNABAR : inkC;
      const alpha = Math.round(clamp(g.ink * edgeFade, 0, 1) * 20) / 20;
      ctx2d.fillStyle = this.fillFor(rgb, alpha);
      if (g.slot < 0 && wgt === 0) {
        const rot = clamp(Math.atan2(g.vy, g.vx) * 0.22, -0.5, 0.5);
        if (Math.abs(rot) > 0.04) {
          ctx2d.save();
          ctx2d.translate(g.x, g.y);
          ctx2d.rotate(rot);
          ctx2d.fillText(g.ch, 0, 0);
          ctx2d.restore();
          continue;
        }
      }
      ctx2d.fillText(g.ch, g.x, g.y);
    }
  }

  private fillFor(rgb: [number, number, number], alpha: number): string {
    const key = `${rgb[0]},${rgb[1]},${rgb[2]},${alpha}`;
    let f = this.fillCache.get(key);
    if (!f) {
      f = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
      this.fillCache.set(key, f);
    }
    return f;
  }

  /** reduced-motion：静态构图。全部诗句成形于中心，雾静止。 */
  private renderStatic(): void {
    const ctx2d = this.ctx;
    ctx2d.clearRect(0, 0, this.w, this.h);
    ctx2d.textAlign = 'center';
    ctx2d.textBaseline = 'middle';
    const inkC = CHAPTERS[this.chapter].ink;
    for (let i = 0; i < this.glyphs.length; i++) {
      const g = this.glyphs[i];
      if (g.slot >= 0 || i % 2 === 1) continue;
      ctx2d.font = this.fontFor(Math.round(g.size));
      ctx2d.fillStyle = this.fillFor(inkC, 0.06);
      ctx2d.fillText(g.ch, g.hx, g.hy);
    }
    const ax = this.w / 2;
    const yHi = CHAPTERS[this.chapter].yHi * (this.w < 700 ? 0.55 : 1);
    const ay = Math.min(this.h / 2, this.h * yHi);
    for (const s of this.slots) {
      ctx2d.font = this.fontFor(s.size);
      ctx2d.fillStyle = this.fillFor(s.red ? CINNABAR : inkC, 1);
      ctx2d.fillText(s.ch, ax + s.dx, ay + s.dy);
    }
  }
}
