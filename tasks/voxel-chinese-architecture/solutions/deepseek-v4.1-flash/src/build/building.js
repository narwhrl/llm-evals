import { P } from "../core/palette.js";
import { buildRoof } from "./roof.js";
import { column, dougongRing, latticeBay, lantern, plinth, plaque, stairs, wall } from "./parts.js";

/** 面阔柱位：明间居中（8 格），返回右半的柱位偏移。bays 必须是奇数。 */
export function bayOffsets(bays) {
  if (bays % 2 === 0) throw new Error("开间数必须是奇数，明间才能落在中轴上");
  const count = (bays + 1) / 2;
  const offsets = [];
  for (let k = 0; k < count; k++) offsets.push(4 + 8 * k);
  return offsets;
}

/** 券门：下部矩形门洞 + 上部按圆弧逐层收窄的拱券，depth 是墙体厚度。 */
export function archDoor(world, { x0, z0, w, h, y0, depth }) {
  const r = (w - 1) / 2;
  world.clearBox(x0, y0, z0, w, h, depth);
  for (let i = 1; i <= r; i++) {
    const half = Math.max(0, Math.min(r, Math.round(Math.sqrt(r * r - i * i))));
    world.clearBox(x0 + r - half, y0 + h + i - 1, z0, 2 * half + 1, 1, depth);
  }
}

/** 菱花格心：在竖直墙面（沿 z 走向）上做出实格与凹格交替的窗。 */
function latticePanel(world, { x, y0, z0, w, h, backing = P.doorWood, frame = P.latticeWood, centered, cx }) {
  for (let dz = 0; dz < w; dz++) {
    const z = z0 + dz;
    for (let dy = 0; dy < h; dy++) {
      const edge = dz === 0 || dz === w - 1 || dy === 0 || dy === h - 1;
      const grid = dz % 2 === 0 || dy % 2 === 0;
      const xw = x;
      if (centered && xw < 0) continue;
      world.set(xw, y0 + dy, z, edge || grid ? frame : backing);
    }
  }
}

/**
 * 参数化殿堂，主殿与配殿共用。正面朝 +z。
 * cx = 0 表示中轴建筑：只写右半，左半由世界镜像生成；
 * cx > 0 表示偏轴建筑：整座写在 +x 一侧，镜像自动生成对面那一座。
 */
export function buildHall(world, opts = {}) {
  const {
    cx = 0,
    cz,
    bays = 5,
    depthBays = 3,
    y0 = 2,
    plinthH = 4,
    plinthOut = 6,
    columnH = 10,
    eaveOut = 5,
    roofType = "wudian",
    double = true,
    upturn = 3,
    tileA = P.tileA,
    tileB = P.tileB,
    ridgeBlock = P.glazedRidge,
    eaveBlock = P.tileC,
    bodyWall = P.wallRed,
    fascia = P.paintingGreen,
    lanternCount = 2,
    withPlaque = true,
    stairsRun = 2,
    upperInset = 7,
    upperColumnH = 8,
  } = opts;

  const centered = cx === 0;
  const box = (xlo, ylo, zlo, xhi, yhi, zhi, block) => {
    const lo = centered ? Math.max(0, xlo) : xlo;
    if (xhi < lo || yhi < ylo || zhi < zlo) return;
    world.box(lo, ylo, zlo, xhi - lo + 1, yhi - ylo + 1, zhi - zlo + 1, block);
  };

  const offsets = bayOffsets(bays);
  const halfW = offsets[offsets.length - 1];
  const rows = depthBays >= 3 ? [12, 4] : depthBays === 2 ? [8, 0] : [6];
  const halfD = rows[0];
  const columnXs = (centered ? offsets : offsets.flatMap((o) => [-o, o])).map((o) => cx + o);
  const columnZs = rows.flatMap((r) => (r === 0 ? [cz] : [cz - r, cz + r]));

  const plinthTop = y0 + plinthH;
  const bodyTop = plinthTop + columnH;
  const eaveY = bodyTop + 4;
  const front = cz + halfD;
  const back = cz - halfD;
  const px0 = cx - halfW - plinthOut;
  const pz1 = front + plinthOut;

  plinth(world, { x0: px0, z0: back - plinthOut, w: 2 * (halfW + plinthOut) + 1, d: 2 * (halfD + plinthOut) + 1, y0, h: plinthH });
  box(cx - halfW, plinthTop, back, cx + halfW, plinthTop, front, P.pavingB);

  for (const x of columnXs) {
    for (const z of columnZs) column(world, { x, z, y0: plinthTop, h: columnH + 1 });
  }

  // 后墙与两山墙（山墙上开菱花窗）
  const wallTop = bodyTop - 1;
  box(cx - halfW, plinthTop, back, cx + halfW, wallTop, back, bodyWall);
  for (const xw of [cx - halfW, cx + halfW]) {
    box(xw, plinthTop, back, xw, wallTop, front, bodyWall);
    for (const wz of [cz - 5, cz + 5]) {
      if (wz - 2 > back + 1 && wz + 2 < front - 1) {
        latticePanel(world, { x: xw, y0: plinthTop + 3, z0: wz - 2, w: 5, h: 6, centered, cx });
      }
    }
  }

  // 前檐：逐间安隔扇门
  const edges = centered
    ? [0, ...offsets]
    : [cx - halfW, ...offsets.flatMap((o) => [cx - o, cx + o]), cx + halfW];
  const sorted = [...new Set(edges)].sort((a, b) => a - b);
  for (let i = 0; i + 1 < sorted.length; i++) {
    const a = sorted[i];
    const b = sorted[i + 1];
    if (b - a < 3) continue;
    latticeBay(world, { x0: a, y0: plinthTop, z0: front, w: b - a + 1, h: columnH, backing: P.doorWood });
  }

  // 额枋与斗拱
  const fx0 = cx - halfW - 1;
  const fx1 = cx + halfW + 1;
  const fz0 = back - 1;
  const fz1 = front + 1;
  box(fx0, bodyTop, fz0, fx1, bodyTop, fz0, fascia);
  box(fx0, bodyTop, fz1, fx1, bodyTop, fz1, fascia);
  box(fx0, bodyTop, fz0, fx0, bodyTop, fz1, fascia);
  box(fx1, bodyTop, fz0, fx1, bodyTop, fz1, fascia);
  dougongRing(world, { x0: fx0, z0: fz0, w: fx1 - fx0 + 1, d: fz1 - fz0 + 1, y0: bodyTop + 1, step: 4, out: 1 });

  const roofX0 = cx - halfW - eaveOut;
  const roofZ0 = back - eaveOut;
  const roofW = 2 * (halfW + eaveOut) + 1;
  const roofD = 2 * (halfD + eaveOut) + 1;

  if (double) {
    buildRoof(world, { x0: roofX0, z0: roofZ0, w: roofW, d: roofD, y0: eaveY, type: "wudian", height: 4, upturn: 2, tileA, tileB, ridgeBlock, eaveBlock });

    const uh = halfW - upperInset;
    const ud = halfD - (upperInset - 2);
    const uBase = eaveY + 5;
    const uTop = uBase + upperColumnH;
    box(cx - uh, uBase, cz - ud, cx + uh, uTop, cz + ud, bodyWall);
    // 上层檐下的菱花窗：四面各一条木色格心带
    const bandLo = uBase + 3;
    const bandHi = uTop - 2;
    for (let x = cx - uh; x <= cx + uh; x++) {
      if (centered && x < 0) continue;
      for (let y = bandLo; y <= bandHi; y++) {
        const grid = x % 2 === 0 || (y - uBase) % 2 === 0;
        world.set(x, y, cz + ud, grid ? P.latticeWood : P.doorWood);
        world.set(x, y, cz - ud, grid ? P.latticeWood : P.doorWood);
      }
    }
    for (let z = cz - ud + 1; z <= cz + ud - 1; z++) {
      for (let y = bandLo; y <= bandHi; y++) {
        const grid = z % 2 === 0 || (y - uBase) % 2 === 0;
        for (const xs of [cx - uh, cx + uh]) {
          if (centered && xs < 0) continue;
          world.set(xs, y, z, grid ? P.latticeWood : P.doorWood);
        }
      }
    }
    // 平座栏杆
    for (const x of [cx - uh - 1, cx + uh + 1]) {
      box(x, uBase, cz - ud - 1, x, uBase, cz + ud + 1, P.stoneLight);
    }
    for (const z of [cz - ud - 1, cz + ud + 1]) {
      box(cx - uh - 1, uBase, z, cx + uh + 1, uBase, z, P.stoneLight);
    }

    box(cx - uh - 1, uTop, cz - ud - 1, cx + uh + 1, uTop, cz - ud - 1, fascia);
    box(cx - uh - 1, uTop, cz + ud + 1, cx + uh + 1, uTop, cz + ud + 1, fascia);
    box(cx - uh - 1, uTop, cz - ud - 1, cx - uh - 1, uTop, cz + ud + 1, fascia);
    box(cx + uh + 1, uTop, cz - ud - 1, cx + uh + 1, uTop, cz + ud + 1, fascia);
    dougongRing(world, { x0: cx - uh - 1, z0: cz - ud - 1, w: 2 * uh + 3, d: 2 * ud + 3, y0: uTop + 1, step: 4, out: 1 });
    buildRoof(world, {
      x0: cx - uh - eaveOut,
      z0: cz - ud - eaveOut,
      w: 2 * (uh + eaveOut) + 1,
      d: 2 * (ud + eaveOut) + 1,
      y0: uTop + 4,
      type: roofType,
      upturn,
      tileA,
      tileB,
      ridgeBlock,
      eaveBlock,
    });
    if (withPlaque) {
      plaque(world, { x0: cx - 6, y0: uTop - 5, z0: cz + ud, w: 13, h: 4, frame: P.gold, board: P.plaqueBoard });
    }
    if (lanternCount > 0) {
      lantern(world, { x: 0, y: uTop - 4, z: cz + ud + 2, size: 2, yTop: uTop + 3 });
      for (const x of [cx - 12, cx + 12]) {
        if (!centered || x > 0) lantern(world, { x, y: uTop - 4, z: cz + ud + 2, size: 2, yTop: uTop + 3 });
      }
    }
  } else {
    buildRoof(world, { x0: roofX0, z0: roofZ0, w: roofW, d: roofD, y0: eaveY, type: roofType, upturn, tileA, tileB, ridgeBlock, eaveBlock });
    if (withPlaque) {
      plaque(world, { x0: cx - 6, y0: bodyTop - 5, z0: front, w: 13, h: 4, frame: P.gold, board: P.plaqueBoard });
    }
    if (lanternCount > 0) {
      for (const x of [cx - 10, cx + 10]) {
        if (!centered || x > 0) lantern(world, { x, y: bodyTop - 5, z: front + 2, size: 2, yTop: eaveY - 1 });
      }
    }
  }

  // 正面踏跺（含御路）
  stairs(world, {
    x0: centered ? 0 : cx - 9,
    z0: pz1,
    w: centered ? 10 : 19,
    y0,
    h: plinthH,
    run: stairsRun,
    inward: -1,
    rails: centered ? "right" : "both",
    ramp: 7,
  });

  return { halfW, halfD, plinthTop, bodyTop, eaveY, front: pz1 };
}

/**
 * 山门：厚墙 + 三券门 + 歇山顶。中轴建筑，只写右半。门洞打通整堵墙。
 */
export function buildGate(world, opts = {}) {
  const {
    cz,
    w = 41,
    d = 13,
    y0 = 2,
    plinthH = 2,
    plinthOut = 4,
    columnH = 9,
    eaveOut = 5,
    tileA = P.tileA,
    tileB = P.tileB,
    ridgeBlock = P.glazedRidge,
    eaveBlock = P.tileC,
    wallBlock = P.wallRed,
    upturn = 3,
    sideDoor = 13,
  } = opts;

  // 与 buildHall 同一套写法：区间用 [lo, hi] 闭区间，便于对照平立面。
  const box = (xlo, ylo, zlo, xhi, yhi, zhi, block) =>
    world.box(xlo, ylo, zlo, xhi - xlo + 1, yhi - ylo + 1, zhi - zlo + 1, block);

  const halfW = (w - 1) / 2;
  const halfD = (d - 1) / 2;
  const plinthTop = y0 + plinthH;
  const bodyTop = plinthTop + columnH;
  const eaveY = bodyTop + 4;
  const zBack = cz - halfD;
  const zFront = cz + halfD;

  plinth(world, { x0: -halfW - plinthOut, z0: zBack - plinthOut, w: 2 * (halfW + plinthOut) + 1, d: 2 * (halfD + plinthOut) + 1, y0, h: plinthH });

  box(0, plinthTop, zBack, halfW, bodyTop - 1, zFront, wallBlock);
  box(0, plinthTop, zBack, halfW, plinthTop, zFront, P.stoneBase);
  box(0, bodyTop - 1, zBack, halfW, bodyTop, zFront, P.stoneLight);

  const doorH = columnH - 3;
  archDoor(world, { x0: -5, z0: zBack, w: 11, h: doorH, y0: plinthTop + 1, depth: 2 * halfD + 1 });
  archDoor(world, { x0: sideDoor - 4, z0: zBack, w: 9, h: doorH - 2, y0: plinthTop + 1, depth: 2 * halfD + 1 });
  // 门道地面
  box(-5, plinthTop, zBack, 5, plinthTop, zFront, P.pavingB);

  const fx1 = halfW + 1;
  box(0, bodyTop, zBack - 1, fx1, bodyTop, zBack - 1, P.paintingGreen);
  box(0, bodyTop, zFront + 1, fx1, bodyTop, zFront + 1, P.paintingGreen);
  dougongRing(world, { x0: -fx1, z0: zBack - 1, w: 2 * fx1 + 1, d: 2 * (halfD + 1) + 1, y0: bodyTop + 1, step: 4, out: 1 });

  buildRoof(world, {
    x0: -halfW - eaveOut,
    z0: zBack - eaveOut,
    w: 2 * (halfW + eaveOut) + 1,
    d: 2 * (halfD + eaveOut) + 1,
    y0: eaveY,
    type: "xieshan",
    upturn,
    tileA,
    tileB,
    ridgeBlock,
    eaveBlock,
  });

  plaque(world, { x0: -6, y0: bodyTop - 5, z0: zFront, w: 13, h: 4, frame: P.gold, board: P.plaqueBoard });
  lantern(world, { x: sideDoor, y: bodyTop - 5, z: zFront + 2, size: 2, yTop: eaveY - 1 });

  stairs(world, { x0: 0, z0: zFront + plinthOut, w: 10, y0, h: plinthH, run: 2, inward: -1, rails: "right", ramp: 5, rampBlock: P.imperial });
  return { halfW, halfD, plinthTop, bodyTop, eaveY, zFront };
}
