/* The annotation layer: a full-viewport canvas that behaves like the reader's
 * pen. Strokes have pressure (pointer.pressure or speed-derived), ink pools and
 * feathers like a real ballpoint, and committed marks persist as you scroll.
 *
 * Marks are stored in *document* coordinates (page space), so they scroll with
 * the manuscript instead of floating over it like a HUD. */

export type Point = { x: number; y: number };

export type Mark =
  | { kind: "stroke"; pts: Point[]; widths: number[]; color: string; born: number }
  | { kind: "underline"; x0: number; y0: number; x1: number; color: string; born: number }
  | { kind: "circle"; cx: number; cy: number; r: number; color: string; born: number }
  | { kind: "note"; x: number; y: number; text: string; born: number; rot: number };

const INK = {
  red: "#c1342a",
  graphite: "#3a3a3a",
  blue: "#2f4fa0",
};

export const INK_COLORS = INK;

export class InkLayer {
  private cv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private marks: Mark[] = [];
  private live: Extract<Mark, { kind: "stroke" }> | null = null;
  private liveUnderline: { x0: number; y0: number; x1: number; born: number } | null = null;
  private dpr = 1;
  private reduced = false;

  // stats that feed the colophon
  stats = { strokeLen: 0, underlines: 0, circles: 0, notes: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resize();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cv.width = window.innerWidth * this.dpr;
    this.cv.height = window.innerHeight * this.dpr;
    this.cv.style.width = window.innerWidth + "px";
    this.cv.style.height = window.innerHeight + "px";
    this.redraw();
  }

  beginStroke(p: Point, color = INK.red) {
    this.live = { kind: "stroke", pts: [p], widths: [2.4], color, born: performance.now() };
  }

  extendStroke(p: Point, speed: number, pressure?: number) {
    if (!this.live) return;
    // width thins with speed, swells with pressure — like a ballpoint
    const base = pressure != null && pressure > 0
      ? 1.6 + pressure * 3.4
      : Math.max(1.9, 4.4 - Math.min(2.6, speed * 0.045));
    const w = Math.max(1.4, base);
    const pts = this.live.pts;
    const last = pts[pts.length - 1];
    this.stats.strokeLen += Math.hypot(p.x - last.x, p.y - last.y);
    pts.push(p);
    this.live.widths.push(w);
  }

  endStroke() {
    if (!this.live) return;
    if (this.live.pts.length > 1) this.marks.push(this.live);
    this.live = null;
    this.redraw();
  }

  beginUnderline(x0: number, y0: number) {
    this.liveUnderline = { x0, y0, x1: x0, born: performance.now() };
  }
  extendUnderline(x: number) {
    if (this.liveUnderline) this.liveUnderline.x1 = x;
  }
  endUnderline(color = INK.red) {
    if (!this.liveUnderline) return;
    const u = this.liveUnderline;
    if (Math.abs(u.x1 - u.x0) > 18) {
      this.marks.push({ kind: "underline", x0: Math.min(u.x0, u.x1), y0: u.y0, x1: Math.max(u.x0, u.x1), color, born: u.born });
      this.stats.underlines++;
    }
    this.liveUnderline = null;
    this.redraw();
  }

  addCircle(cx: number, cy: number, r: number, color = INK.red) {
    this.marks.push({ kind: "circle", cx, cy, r, color, born: performance.now() });
    this.stats.circles++;
    this.redraw();
  }

  addNote(x: number, y: number, text: string) {
    this.marks.push({ kind: "note", x, y, text, born: performance.now(), rot: (Math.random() - 0.5) * 0.12 });
    this.stats.notes++;
    this.redraw();
  }

  markCount() { return this.marks.length; }

  /* draw everything, offset by scrollY so marks live in document space */
  redraw(scrollY = window.scrollY) {
    const { ctx, cv, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cv.width / dpr, cv.height / dpr);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const sy = -scrollY;
    const now = performance.now();

    for (const m of this.marks) {
      const age = this.reduced ? 1e9 : now - m.born;
      const appear = Math.min(1, age / 380);
      ctx.globalAlpha = appear;
      if (m.kind === "stroke") this.drawStroke(m.pts, m.widths, m.color, sy);
      else if (m.kind === "underline") this.drawUnderline(m, sy);
      else if (m.kind === "circle") this.drawCircle(m, sy);
      else this.drawNote(m, sy);
    }
    // live marks render at full alpha
    ctx.globalAlpha = 1;
    if (this.live) this.drawStroke(this.live.pts, this.live.widths, this.live.color, sy);
    if (this.liveUnderline) this.drawUnderline({ ...this.liveUnderline, color: INK.red }, sy);
    ctx.globalAlpha = 1;
  }

  private drawStroke(pts: Point[], widths: number[], color: string, sy: number) {
    const { ctx } = this;
    ctx.strokeStyle = color;
    for (let i = 1; i < pts.length; i++) {
      ctx.beginPath();
      ctx.lineWidth = (widths[i] + widths[i - 1]) / 2;
      ctx.moveTo(pts[i - 1].x, pts[i - 1].y + sy);
      ctx.lineTo(pts[i].x, pts[i].y + sy);
      ctx.stroke();
    }
  }

  private drawUnderline(u: { x0: number; y0: number; x1: number; color: string }, sy: number) {
    const { ctx } = this;
    ctx.strokeStyle = u.color;
    ctx.lineWidth = 2.1;
    // a hand underline is never straight — a slight sag and a taper at the tail
    ctx.beginPath();
    ctx.moveTo(u.x0, u.y0 + sy);
    const mid = (u.x0 + u.x1) / 2;
    ctx.quadraticCurveTo(mid, u.y0 + 3 + sy, u.x1, u.y0 + sy - 1);
    ctx.stroke();
  }

  private drawCircle(c: { cx: number; cy: number; r: number; color: string }, sy: number) {
    const { ctx } = this;
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 2;
    // an imperfect hand circle — wobble the radius
    ctx.beginPath();
    for (let a = 0; a <= Math.PI * 2 + 0.3; a += 0.25) {
      const rr = c.r + Math.sin(a * 3.7) * c.r * 0.08;
      const x = c.cx + Math.cos(a) * rr;
      const y = c.cy + Math.sin(a) * rr * 0.82 + sy;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  private drawNote(n: { x: number; y: number; text: string; rot: number }, sy: number) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(n.x, n.y + sy);
    ctx.rotate(n.rot);
    ctx.font = "600 15px 'Caveat', 'Segoe Script', cursive";
    ctx.fillStyle = INK.red;
    ctx.fillText(n.text, 0, 0);
    ctx.restore();
  }
}
