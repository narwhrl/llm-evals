import {
  ACT1_ORDER,
  ACT3_ORDER,
  COPY,
  WORD_BY_ID,
  WORDS,
  type ActName,
} from "./content";
import { clamp, hypot, lerp, mix, remap, smooth, smoother } from "./math";

export const PHASE = {
  wake: 0.07,
  developStart: 0.12,
  developEnd: 0.47,
  hesitateEnd: 0.54,
  strikeEnd: 0.63,
  fallEnd: 0.71,
  returnEnd: 0.77,
  periodEnd: 0.81,
  resolveEnd: 0.92,
  sheetStart: 0.875,
} as const;

export type Point = { x: number; y: number };

export type WordPose = {
  id: string;
  text: string;
  x: number;
  y: number;
  r: number;
  scale: number;
  seated: boolean;
  interactive: boolean;
  struckInk: number;
  width: number;
};

export type MarkPose = {
  x: number;
  y: number;
  angle: number;
  length: number;
  pressure: number;
  mode: "hover" | "tick" | "strike" | "plant" | "rest";
};

export type Box = { x: number; y: number; w: number; h: number };

export type Layout = {
  width: number;
  height: number;
  mobile: boolean;
  fontSize: number;
  wordHeight: number;
  gap: number;
  colophonH: number;
  widths: Record<string, number>;
  caseOf: Record<string, Point & { r: number }>;
  trayOf: Record<string, Point & { r: number }>;
  act1Of: Record<string, Point>;
  act3Of: Record<string, Point>;
  prefixEnd: Point;
  strike: { x1: number; y1: number; x2: number; y2: number; length: number };
  lineY: number;
  stick: Box & { y1: number; y2: number };
  tray: Box;
  caseRect: Box;
};

export type World = {
  act: ActName;
  progress: number;
  sheetY: number;
  words: WordPose[];
  mark: MarkPose;
  period: { x: number; y: number; scale: number };
  strike: { x1: number; y1: number; x2: number; y2: number; t: number; length: number };
  note: string;
  register: number;
  composed: string;
  stickGrow: number;
};

const LINE1 = ["i", "hold", "several", "readings"] as const;
const ACT1_LINE2 = ["and", "choose", "a", "stop"] as const;
const ACT3_LINE2 = ["leave", "a", "line"] as const;

const measureCanvas = typeof document !== "undefined" ? document.createElement("canvas") : null;
const measureCtx = measureCanvas?.getContext("2d") ?? null;

export function measureText(text: string, font: string): number {
  if (!measureCtx) return text.length * 18;
  measureCtx.font = font;
  return measureTextWidth(measureCtx, text);
}

function measureTextWidth(ctx: CanvasRenderingContext2D, text: string): number {
  return ctx.measureText(text).width;
}

function lineWidth(ids: readonly string[], widths: Record<string, number>, gap: number): number {
  return ids.reduce((sum, id, index) => sum + (widths[id] ?? 0) + (index ? gap : 0), 0);
}

function placeLine(
  ids: readonly string[],
  widths: Record<string, number>,
  gap: number,
  left: number,
  y: number,
  slots: Record<string, Point>,
) {
  let x = left;
  for (const id of ids) {
    slots[id] = { x, y };
    x += (widths[id] ?? 0) + gap;
  }
}

function placeCouplet(
  line1: readonly string[],
  line2: readonly string[],
  widths: Record<string, number>,
  fontSize: number,
  gap: number,
  centerX: number,
  originY: number,
): { slots: Record<string, Point>; left: number; y1: number; y2: number; blockW: number; lineHeight: number } {
  const w1 = lineWidth(line1, widths, gap);
  const w2 = lineWidth(line2, widths, gap);
  const blockW = Math.max(w1, w2);
  const left = centerX - blockW / 2;
  const lineHeight = fontSize * 1.42;
  const y1 = originY - lineHeight * 0.42;
  const y2 = originY + lineHeight * 0.58;
  const slots: Record<string, Point> = {};
  placeLine(line1, widths, gap, left, y1, slots);
  placeLine(line2, widths, gap, left, y2, slots);
  return { slots, left, y1, y2, blockW, lineHeight };
}

function placeVerse(
  order: readonly string[],
  _widths: Record<string, number>,
  fontSize: number,
  left: number,
  top: number,
): Record<string, Point> {
  const slots: Record<string, Point> = {};
  let y = top;
  for (const id of order) {
    slots[id] = { x: left, y };
    y += fontSize * 1.46;
  }
  return slots;
}

function placeCase(
  width: number,
  height: number,
  mobile: boolean,
  padX: number,
  widths: Record<string, number>,
  fontSize: number,
): {
  caseOf: Layout["caseOf"];
  trayOf: Layout["trayOf"];
  caseRect: Box;
  tray: Box;
} {
  const caseOf: Layout["caseOf"] = {};
  const trayOf: Layout["trayOf"] = {};
  const cols = mobile ? 3 : 4;
  const rows = Math.ceil(WORDS.length / cols);
  const caseScale = mobile ? 0.56 : 0.7;
  const caseRect: Box = mobile
    ? { x: padX, y: height * 0.62, w: width - padX * 2, h: height * 0.2 }
    : { x: padX, y: height * 0.64, w: width - padX * 2, h: height * 0.2 };
  const cellW = caseRect.w / cols;
  const cellH = caseRect.h / rows;

  WORDS.forEach((word, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const wordW = (widths[word.id] ?? fontSize) * caseScale;
    const inset = Math.max(4, (cellW - wordW) * 0.5);
    const x = caseRect.x + col * cellW + inset;
    const y = caseRect.y + row * cellH + Math.max(4, (cellH - fontSize * caseScale) * 0.4);
    caseOf[word.id] = {
      x: clamp(x, caseRect.x + 2, caseRect.x + caseRect.w - wordW - 2),
      y,
      r: lerp(-8, 9, mix(word.id, "r")),
    };
  });

  const tray: Box = mobile
    ? { x: padX, y: height * 0.82, w: width - padX * 2, h: height * 0.1 }
    : { x: padX, y: height * 0.875, w: width - padX * 2, h: 72 };
  const trayWords = WORDS.filter((word) => word.role === "struck");
  trayWords.forEach((word, index) => {
    const t = (index + 0.5) / trayWords.length;
    trayOf[word.id] = {
      x: lerp(tray.x + 16, tray.x + tray.w - (widths[word.id] ?? 40) - 16, t),
      y: tray.y + (mobile ? 10 : 18),
      r: lerp(-16, 14, mix(word.id, "tr")),
    };
  });
  for (const word of WORDS) {
    if (!trayOf[word.id]) {
      trayOf[word.id] = { ...caseOf[word.id], r: caseOf[word.id].r + 8 };
    }
  }

  return { caseOf, trayOf, caseRect, tray };
}

export function buildLayout(
  width: number,
  height: number,
  substitutions: Record<string, string>,
): Layout {
  const mobile = width < 760;
  const fontSize = mobile
    ? clamp(width * 0.074, 24, 32)
    : clamp(width * 0.038, 42, 58);
  const gap = mobile ? 12 : fontSize * 0.32;
  const font = `600 ${fontSize}px Fraunces, "Times New Roman", serif`;
  const widths: Record<string, number> = {};
  for (const word of WORDS) {
    widths[word.id] = measureText(substitutions[word.id] ?? word.text, font);
  }

  const padX = mobile ? 22 : Math.max(64, width * 0.055);
  const lineY = mobile ? height * 0.28 : height * 0.46;
  const { caseOf, trayOf, caseRect, tray } = placeCase(width, height, mobile, padX, widths, fontSize);

  let act1Of: Record<string, Point>;
  let act3Of: Record<string, Point>;
  let y1: number;
  let y2: number;
  let left: number;
  let blockW: number;
  let lineHeight: number;

  if (mobile) {
    const verseLeft = padX + 28;
    const verseTop = height * 0.2;
    act1Of = placeVerse(ACT1_ORDER, widths, fontSize, verseLeft, verseTop);
    act3Of = placeVerse(ACT3_ORDER, widths, fontSize, verseLeft, verseTop);
    y1 = act1Of.i?.y ?? verseTop;
    y2 = act1Of.and?.y ?? verseTop + fontSize * 5.8;
    left = verseLeft;
    blockW = Math.max(...WORDS.map((word) => widths[word.id] ?? 0));
    lineHeight = fontSize * 1.46;
  } else {
    const couplet1 = placeCouplet(LINE1, ACT1_LINE2, widths, fontSize, gap, width / 2, lineY);
    const couplet3 = placeCouplet(LINE1, ACT3_LINE2, widths, fontSize, gap, width / 2, lineY);
    act1Of = couplet1.slots;
    act3Of = { ...couplet3.slots };
    for (const id of LINE1) act3Of[id] = couplet1.slots[id];
    y1 = couplet1.y1;
    y2 = couplet1.y2;
    left = couplet1.left;
    blockW = Math.max(couplet1.blockW, couplet3.blockW);
    lineHeight = couplet1.lineHeight;
  }

  const lastPrefix = act1Of.readings;
  const prefixEnd = {
    x: (lastPrefix?.x ?? left) + (widths.readings ?? 0) + (mobile ? 8 : 12),
    y: lastPrefix?.y ?? y1,
  };

  const strikeFirst = act1Of.and ?? { x: left, y: y2 };
  const strikeLast = act1Of.stop ?? strikeFirst;
  const x1 = strikeFirst.x - 10;
  const midY = (strikeFirst.y + (act1Of.stop?.y ?? y2)) / 2 + fontSize * 0.5;
  const x2 = strikeLast.x + (widths.stop ?? 0) + 16;
  const y2s = midY + fontSize * 0.04;
  const y1s = midY - fontSize * 0.02;
  const length = hypot(x2 - x1, y2s - y1s) * 1.06;

  const stick: Layout["stick"] = mobile
    ? { x: padX, y: (act1Of.i?.y ?? lineY) - 12, w: 2, h: lineHeight * ACT1_ORDER.length, y1, y2 }
    : {
        x: left - 18,
        y: y1 - fontSize * 0.35,
        w: blockW + 36,
        h: lineHeight + fontSize * 0.85,
        y1,
        y2,
      };

  return {
    width,
    height,
    mobile,
    fontSize,
    wordHeight: fontSize * 1.05,
    gap,
    colophonH: mobile ? 92 : 168,
    widths,
    caseOf,
    trayOf,
    act1Of,
    act3Of,
    prefixEnd,
    strike: { x1, y1: y1s, x2, y2: y2s, length },
    lineY,
    stick,
    tray,
    caseRect,
  };
}

function seatT(index: number, count: number, p: number, start: number, end: number): number {
  const window = 0.5;
  const span = end - start;
  const head = start + (index / Math.max(count - 1, 1)) * span * (1 - window);
  return smoother(head, head + span * window, p);
}

export function actFrom(p: number): ActName {
  if (p < PHASE.developStart) return "begin";
  if (p < PHASE.hesitateEnd) return "develop";
  if (p < PHASE.periodEnd) return "turn";
  return "rest";
}

function noteFrom(p: number): string {
  if (p < PHASE.developStart) return COPY.begin;
  if (p < PHASE.developEnd) return COPY.develop;
  if (p < PHASE.hesitateEnd) return COPY.hesitate;
  if (p < PHASE.fallEnd) return COPY.strike;
  if (p < PHASE.resolveEnd) return COPY.resolve;
  return COPY.rest;
}

function composedLine(substitutions: Record<string, string>, p: number): string {
  const order = p >= PHASE.periodEnd ? ACT3_ORDER : ACT1_ORDER;
  return order
    .map((id) => {
      const word = substitutions[id] ?? WORD_BY_ID[id]?.text ?? "";
      return id === "readings" && p >= PHASE.periodEnd ? `${word}.` : word;
    })
    .join(" ");
}

function writeHead(
  order: readonly string[],
  slots: Record<string, Point>,
  widths: Record<string, number>,
  seatedUntil: number,
): Point {
  const last = order[Math.max(0, seatedUntil)];
  const slot = slots[last];
  if (!slot) return { x: 0, y: 0 };
  return { x: slot.x + (widths[last] ?? 0) + 12, y: slot.y };
}

export function getWorld(
  progress: number,
  layout: Layout,
  substitutions: Record<string, string>,
): World {
  const p = clamp(progress, 0, 1);
  const act = actFrom(p);
  const sheetY = -smoother(PHASE.sheetStart, 0.995, p) * layout.colophonH;
  const strikeDraw = smooth(PHASE.hesitateEnd, PHASE.strikeEnd, p);
  const strikeKeep = 1 - smoother(PHASE.strikeEnd, PHASE.fallEnd + 0.02, p);
  const strikeT = strikeDraw * strikeKeep;
  const fallT = smoother(PHASE.strikeEnd, PHASE.fallEnd, p);
  const periodT = smoother(PHASE.returnEnd, PHASE.periodEnd, p);
  const stickGrow = 1;
  const words: WordPose[] = WORDS.map((def) => {
    const text = substitutions[def.id] ?? def.text;
    const casePose = layout.caseOf[def.id];
    const trayPose = layout.trayOf[def.id];
    const a1 = layout.act1Of[def.id];
    const a3 = layout.act3Of[def.id];
    let x = casePose.x;
    let y = casePose.y;
    let r = casePose.r;
    let seated = false;
    let struckInk = 0;
    let interactive = true;
    let compose = 0;
    const caseScale = layout.mobile ? 0.56 : 0.7;

    if (def.role === "prefix") {
      const index = ACT1_ORDER.indexOf(def.id as (typeof ACT1_ORDER)[number]);
      const t = seatT(index, ACT1_ORDER.length, p, PHASE.developStart, PHASE.developEnd);
      const dest = a3 ?? a1;
      x = lerp(casePose.x, dest.x, t);
      y = lerp(casePose.y, dest.y, t);
      r = lerp(casePose.r, 0, t);
      compose = t;
      seated = t > 0.88;
    } else if (def.role === "struck") {
      const index = ACT1_ORDER.indexOf(def.id as (typeof ACT1_ORDER)[number]);
      const t = seatT(index, ACT1_ORDER.length, p, PHASE.developStart, PHASE.developEnd);
      const seatedX = lerp(casePose.x, a1.x, t);
      const seatedY = lerp(casePose.y, a1.y, t);
      const seatedR = lerp(casePose.r, 0, t);
      x = lerp(seatedX, trayPose.x, fallT);
      y = lerp(seatedY, trayPose.y, fallT);
      r = lerp(seatedR, trayPose.r, fallT);
      compose = t * (1 - fallT);
      seated = t > 0.88 && fallT < 0.18;
      struckInk = strikeT * (1 - fallT);
    } else if (def.role === "reuse") {
      const index = ACT1_ORDER.indexOf(def.id as (typeof ACT1_ORDER)[number]);
      const t = seatT(index, ACT1_ORDER.length, p, PHASE.developStart, PHASE.developEnd);
      const from = {
        x: lerp(casePose.x, a1.x, t),
        y: lerp(casePose.y, a1.y, t),
        r: lerp(casePose.r, 0, t),
      };
      const slide = smoother(PHASE.periodEnd, PHASE.resolveEnd, p);
      x = lerp(from.x, a3.x, slide);
      y = lerp(from.y, a3.y, slide);
      r = lerp(from.r, 0, Math.max(t, slide));
      compose = Math.max(t, slide);
      seated = t > 0.88;
      struckInk = strikeT * (1 - slide);
    } else {
      const index = Math.max(0, ACT3_ORDER.indexOf(def.id as (typeof ACT3_ORDER)[number]) - 4);
      const t = seatT(index, 3, p, PHASE.periodEnd, PHASE.resolveEnd);
      x = lerp(casePose.x, a3.x, t);
      y = lerp(casePose.y, a3.y, t);
      r = lerp(casePose.r, 0, t);
      compose = t;
      seated = t > 0.88;
    }

    return {
      id: def.id,
      text,
      x,
      y,
      r,
      scale: lerp(caseScale, 1, compose),
      seated,
      interactive,
      struckInk,
      width: layout.widths[def.id] ?? layout.fontSize,
    };
  });

  let seatedAct1 = -1;
  for (let index = 0; index < ACT1_ORDER.length; index += 1) {
    if (seatT(index, ACT1_ORDER.length, p, PHASE.developStart, PHASE.developEnd) > 0.68) {
      seatedAct1 = index;
    }
  }
  let seatedAct3 = 3;
  for (let index = 4; index < ACT3_ORDER.length; index += 1) {
    if (seatT(index - 4, 3, p, PHASE.periodEnd, PHASE.resolveEnd) > 0.68) {
      seatedAct3 = index;
    }
  }

  const stickWait = {
    x: layout.stick.x + (layout.mobile ? 18 : 10),
    y: layout.stick.y1,
  };
  const first = layout.act1Of.i ?? { x: layout.width / 2, y: layout.lineY };

  let mark: MarkPose;
  if (p < PHASE.wake) {
    mark = {
      x: stickWait.x,
      y: stickWait.y,
      angle: -12,
      length: layout.fontSize * 1.15,
      pressure: 0.7,
      mode: "hover",
    };
  } else if (p < PHASE.developStart) {
    const t = smoother(PHASE.wake, PHASE.developStart, p);
    mark = {
      x: lerp(stickWait.x, first.x - 18, t),
      y: lerp(stickWait.y, first.y, t),
      angle: lerp(-16, -8, t),
      length: layout.fontSize * 1.15,
      pressure: 0.78,
      mode: "tick",
    };
  } else if (p < PHASE.hesitateEnd) {
    const head = writeHead(ACT1_ORDER, layout.act1Of, layout.widths, Math.max(0, seatedAct1));
    const hesitate = remap(p, PHASE.developEnd, PHASE.hesitateEnd);
    mark = {
      x: head.x,
      y: head.y,
      angle: -7,
      length: layout.fontSize * 1.2,
      pressure: 0.88 - hesitate * 0.16,
      mode: "tick",
    };
  } else if (p < PHASE.strikeEnd) {
    mark = {
      x: lerp(layout.strike.x1, layout.strike.x2, strikeT),
      y: lerp(layout.strike.y1, layout.strike.y2, strikeT),
      angle: -6,
      length: lerp(layout.fontSize * 0.5, layout.strike.length, strikeT),
      pressure: 1,
      mode: "strike",
    };
  } else if (p < PHASE.periodEnd) {
    const back = smoother(PHASE.fallEnd, PHASE.returnEnd, p);
    mark = {
      x: lerp(layout.strike.x2, layout.prefixEnd.x, Math.max(back, remap(p, PHASE.strikeEnd, PHASE.returnEnd))),
      y: lerp(layout.strike.y2, layout.prefixEnd.y, Math.max(back, remap(p, PHASE.strikeEnd, PHASE.returnEnd))),
      angle: lerp(-6, 0, back),
      length: lerp(layout.fontSize * 0.45, layout.fontSize * 0.62, back),
      pressure: 0.92,
      mode: p > PHASE.returnEnd ? "plant" : "tick",
    };
  } else if (p < PHASE.resolveEnd) {
    const head = writeHead(ACT3_ORDER, layout.act3Of, layout.widths, seatedAct3);
    mark = {
      x: head.x,
      y: head.y,
      angle: -6,
      length: layout.fontSize * 1.12,
      pressure: 0.82,
      mode: "tick",
    };
  } else {
    const last = layout.act3Of.line;
    mark = {
      x: (last?.x ?? layout.prefixEnd.x) + (layout.widths.line ?? 0) + 16,
      y: last?.y ?? layout.prefixEnd.y,
      angle: -3,
      length: layout.fontSize * 0.82,
      pressure: 0.48,
      mode: "rest",
    };
  }

  const periodScale = p < PHASE.returnEnd ? 0 : p < PHASE.periodEnd ? lerp(0.2, 1.18, periodT) : 1;

  return {
    act,
    progress: p,
    sheetY,
    words,
    mark,
    period: {
      x: layout.prefixEnd.x + 6,
      y: layout.prefixEnd.y + layout.fontSize * 0.78,
      scale: periodScale,
    },
    strike: {
      x1: layout.strike.x1,
      y1: layout.strike.y1,
      x2: layout.strike.x2,
      y2: layout.strike.y2,
      t: strikeT,
      length: layout.strike.length,
    },
    note: noteFrom(p),
    register: Math.sin(smooth(PHASE.hesitateEnd, PHASE.periodEnd, p) * Math.PI) * 3.2,
    composed: composedLine(substitutions, p),
    stickGrow,
  };
}
