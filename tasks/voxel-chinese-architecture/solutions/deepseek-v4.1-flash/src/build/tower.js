import { P } from "../core/palette.js";
import { architrave, balustrade, column, dougongRing, lantern, latticeBay, plinth } from "./parts.js";
import { buildRoof } from "./roof.js";

/** 四面墙圈（对象式参数）：塔身与钟楼都要空心墙身，转调 world.ring。 */
function wallRing(world, { x0, z0, y0, w, d, h, t, block }) {
  world.ring(x0, y0, z0, w, h, d, t, block);
}

/**
 * 券门 / 佛龛：在墙面上挖出内凹的龛，龛底衬深色木板，龛口沿一圈边框。
 * axis 是龛面法向："z" 表示龛开在 ±z 的墙面上、沿 x 展开；face 是朝外方向（±1）；
 * (x0, z0) 是龛口在墙面上的起点（沿展开方向的最小坐标）。券顶逐行收窄成拱。
 * depth 不要超过墙厚，否则龛底衬板背面是空的，会成为悬空体素。
 */
function niche(world, { x0, z0, y0, w, h, axis = "z", face = -1, depth = 2, arch = 2, back = P.doorWood, frame = 0 }) {
  const s0 = axis === "z" ? x0 : z0;
  const put = (a, y, d, block) => {
    if (axis === "z") world.set(a, y, z0 - face * d, block);
    else world.set(x0 - face * d, y, a, block);
  };
  const yArch = y0 + h - arch;
  const spanAt = (y) => {
    const cut = y >= yArch ? y - yArch + 1 : 0;
    return [s0 + cut, s0 + w - 1 - cut];
  };
  for (let y = y0; y < y0 + h; y++) {
    const [a, b] = spanAt(y);
    for (let k = a; k <= b; k++) {
      for (let d = 0; d < depth - 1; d++) put(k, y, d, 0);
      put(k, y, depth - 1, back);
    }
    if (frame) {
      put(a - 1, y, 0, frame);
      put(b + 1, y, 0, frame);
    }
  }
  if (frame) {
    const [at, bt] = spanAt(y0 + h - 1);
    for (let k = at - 1; k <= bt + 1; k++) put(k, y0 + h, 0, frame);
    for (let k = s0 - 1; k <= s0 + w; k++) put(k, y0 - 1, 0, frame);
  }
}

/**
 * 沿 x 方向展开的隔扇。latticeBay 只能沿 z 展开，钟楼朝 ±x 的两面需要旋转写法，
 * 格心规则与 latticeBay 一致（实格与凹格交替）。face 为朝外方向，衬板写在其背面。
 */
function bayX(world, { x, z0, y0, w, h, face = 1, backing = P.doorWood, frame = P.latticeWood, cell = 2 }) {
  world.box(x - face, y0, z0, 1, h, w, backing);
  world.box(x, y0, z0, 1, h, 1, frame);
  world.box(x, y0, z0 + w - 1, 1, h, 1, frame);
  world.box(x, y0, z0, 1, 1, w, frame);
  world.box(x, y0 + h - 1, z0, 1, 1, w, frame);
  for (let z = z0 + 1; z < z0 + w - 1; z++) {
    const vertical = (z - z0 - 1) % cell === 0;
    for (let y = y0 + 1; y < y0 + h - 1; y++) {
      if (vertical || (y - y0 - 1) % cell === 0) world.set(x, y, z, frame);
    }
  }
}

/**
 * 斗拱圈（偏轴版）。parts.js 的 dougongRing 把逐间斗拱沿 x 的间距锚定在全场中轴 x = 0，
 * 只适用于中轴建筑；钟楼在 cx ≈ 45，直接调用会把斗拱从 x = 0 一路排到檐下。
 * 这里沿用同一套坐斗 / 拱 / 昂 / 散斗单元，只把间距改锚到 cx，左右严格对称。
 */
function dougongBand(world, { cx, cz, half, y0, step = 4, out = 1, block = P.dgLight, arm = P.paintingGreen, gold = P.dgGold }) {
  const x0 = cx - half;
  const x1 = cx + half;
  const z0 = cz - half;
  const z1 = cz + half;
  // 沿 z 两条檐口沿线排朵
  for (let k = 0; k <= half; k += step) {
    for (const x of k === 0 ? [cx] : [cx - k, cx + k]) {
      for (const [z, dz] of [[z0, -1], [z1, 1]]) {
        world.box(x, y0, z, 1, 1, 1, block);
        world.box(x - 1, y0 + 1, z, 3, 1, 1, arm);
        world.box(x, y0 + 1, z + dz * out, 1, 1, 1, gold);
        world.box(x, y0 + 2, z + dz * out, 1, 1, 1, block);
      }
    }
  }
  // 沿 x 两条檐口沿线排朵
  for (let k = 0; k <= half; k += step) {
    for (const z of k === 0 ? [cz] : [cz - k, cz + k]) {
      for (const [x, dx] of [[x0, -1], [x1, 1]]) {
        world.box(x, y0, z, 1, 1, 1, block);
        world.box(x, y0 + 1, z - 1, 1, 1, 3, arm);
        world.box(x + dx * out, y0 + 1, z, 1, 1, 1, gold);
        world.box(x + dx * out, y0 + 2, z, 1, 1, 1, block);
      }
    }
  }
  // 转角铺作：拱与昂同时朝两个方向出挑
  for (const x of [x0, x1]) {
    for (const z of [z0, z1]) {
      const dx = x === x0 ? -1 : 1;
      const dz = z === z0 ? -1 : 1;
      world.box(x, y0, z, 1, 1, 1, block);
      world.box(x, y0 + 1, z - 1, 1, 1, 3, arm);
      world.box(x - 1, y0 + 1, z, 3, 1, 1, arm);
      world.box(x + dx * out, y0 + 1, z, 1, 1, 1, gold);
      world.box(x, y0 + 1, z + dz * out, 1, 1, 1, gold);
      world.box(x + dx * out, y0 + 2, z + dz * out, 1, 1, 1, block);
    }
  }
}

/** 屋面逐层填实，从檐口层往上量到该列顶部，就是屋面最高层。 */
function roofTop(world, x, z, yEave, limit) {
  let y = yEave;
  while (y + 1 <= limit && world.get(x, y + 1, z) !== 0) y++;
  return y;
}

/**
 * buildRoof 在 finial:false 时必然补正脊与鸱吻，且全部写在 z = cz 这一条线上。
 * 檐顶之上还要接上层塔身或平座，这些脊饰会露在墙外，接上层之前先清掉。
 */
function clearRidgeDecor(world, { cx, cz, y, half }) {
  for (let i = 0; i < 4; i++) world.clearBox(cx - half, y + i, cz, 2 * half + 1, 1, 1);
}

/** 塔刹：露盘 + 相轮（由大到小、金铜相间）+ 宝珠。y 是屋面平台之上第一层。 */
function spire(world, { cx, cz, y, r = 2 }) {
  const disc = (yy, rr, block) => {
    for (let dx = -rr; dx <= rr; dx++) {
      for (let dz = -rr; dz <= rr; dz++) {
        if (rr > 1 && Math.abs(dx) + Math.abs(dz) > 2 * rr - 1) continue;
        world.set(cx + dx, yy, cz + dz, block);
      }
    }
  };
  disc(y, Math.min(r, 2), P.bronze);
  disc(y + 1, 1, P.goldDark);
  disc(y + 2, 1, P.bronze);
  world.set(cx, y + 3, cz, P.goldDark);
  world.set(cx, y + 4, cz, P.gold);
  world.set(cx, y + 5, cz, P.gold);
}

/**
 * 钟：上小下大的方块堆，钟口朝下。w 是钟口宽度（奇数，取木构内部净宽）。
 * 挂在悬钟梁下面，钟口掏空留出朝下的开口。
 */
function bell(world, { cx, cz, y, w }) {
  const r = (w - 1) >> 1;
  world.box(cx, y + 3, cz, 1, 1, 1, P.bronze); // 钟钮
  const midR = Math.min(1, r); // 钟肩与钟身比钟口收一号
  world.box(cx - midR, y + 1, cz - midR, 1 + 2 * midR, 2, 1 + 2 * midR, P.bronze);
  world.box(cx - r, y, cz - r, w, 1, w, P.bronze); // 钟口
  if (w >= 3) world.box(cx - r + 1, y, cz - r + 1, w - 2, 1, w - 2, 0);
}

/** 鼓：鼓身横置、鼓面朝 ±z，四棱削圆，鼓面四周钉金钉。wi 是木构内部净宽。 */
function drum(world, { cx, cz, y, wi }) {
  const len = Math.min(5, wi);
  const half = (len - 1) >> 1;
  const r = wi >= 3 ? 1 : 0;
  world.box(cx - r, y + 1, cz - half, 1 + 2 * r, 3, len, P.wallRed);
  if (r === 1) {
    for (let z = cz - half; z <= cz + half; z++) {
      for (const yy of [y + 1, y + 3]) {
        world.clear(cx - 1, yy, z);
        world.clear(cx + 1, yy, z);
      }
    }
  }
  for (const z of [cz - half, cz + half]) {
    world.set(cx, y + 1, z, P.gold);
    world.set(cx, y + 3, z, P.gold);
    if (r === 1) {
      world.set(cx - 1, y + 2, z, P.gold);
      world.set(cx + 1, y + 2, z, P.gold);
    }
  }
}

/**
 * 钟楼 / 鼓楼。
 * 形制：台基 → 下层四面红墙（南北券门内凹、四角立柱）→ 平座地板与栏杆、木构开敞的二层
 * （角柱 + 隔扇，内悬钟或鼓）→ 额枋与檐下斗拱 → 攒尖顶收头宝顶。
 * 平面只写 x ≥ 0 的一半（cx 取正数，本项目约 45），全局镜像自动补出西侧的另一座。
 */
export function buildTower(world, opts = {}) {
  const { cx, cz, y0 = 2, size = 15, tiers = 2, hasBell = true, tileA = P.tileA, tileB = P.tileB } = opts;
  if (!Number.isFinite(cx) || !Number.isFinite(cz)) throw new Error("buildTower 需要 cx 与 cz");

  const half = Math.max(4, (size - 1) >> 1);
  const w1 = 2 * half + 1;
  const x0 = cx - half;
  const z0 = cz - half;

  const PLINTH_H = 3; // 台基高
  const PLINTH_OUT = 3; // 台基每边外扩
  const WALL_H = 6; // 下层墙身高
  const WALL_T = 3; // 墙厚
  const RAIL_H = 3; // 平座栏杆高
  const BAY_H = 4; // 每层木构高
  const DG_H = 3; // 斗拱层数（坐斗 / 拱 / 散斗三层，与 dougongRing 的单元同高）
  const DG_STEP = 4; // 逐间斗拱间距
  const INSET = 3; // 上层平面每边内收
  const EAVE_OUT = 3; // 檐口比墙身每边外扩
  const EAVE_H = 6; // 攒尖顶举高：恰好收成 3×3 平台，正好给宝顶落座
  const EAVE_WAIST_H = 3; // 腰檐举高：恰好收成比本层每边大 1 的平台，兼作上层平座
  // 层数上限：平面每上一层每边内收 INSET、再靠腰檐补回 1，收到 2 格以下就收不下去；
  // 同时不能顶破世界高度（这栋楼是要摆进场景里的，宁可少叠一层也不能越界）。
  // 下层墙身 + 带攒尖顶的上层木构是最小形制，所以至少 2 层。
  const STRIDE_UP = BAY_H + DG_H + EAVE_WAIST_H + 1; // 每多一层木构所占层数
  const TOP_SPAN = PLINTH_H + WALL_H + 1 + BAY_H + 1 + DG_H + EAVE_H + 6; // 台基到宝顶
  const storeys = Math.max(
    2,
    Math.min(tiers, 1 + Math.floor((half - INSET) / (INSET - 1)), 1 + Math.floor((world.maxY - y0 - TOP_SPAN) / STRIDE_UP)),
  );
  // cx 太靠中轴时镜像的半座会与本座叠在一起，这不是「四面对称」，直接报错更安全
  if (x0 - PLINTH_OUT < 0) throw new Error(`buildTower 的 cx 太小（${cx}），偏轴建筑请让 cx ≥ ${half + PLINTH_OUT}`);

  plinth(world, { x0: x0 - PLINTH_OUT, z0: z0 - PLINTH_OUT, w: w1 + 2 * PLINTH_OUT, d: w1 + 2 * PLINTH_OUT, y0, h: PLINTH_H });

  // 下层：四面红墙、南北券门、四角立柱
  const yWall = y0 + PLINTH_H;
  wallRing(world, { x0, z0, y0: yWall, w: w1, d: w1, h: WALL_H, t: WALL_T, block: P.wallRed });
  for (const [zf, face] of [[z0, -1], [z0 + w1 - 1, 1]]) {
    niche(world, { x0: cx - 2, y0: yWall, z0: zf, w: 5, h: 5, axis: "z", face, depth: WALL_T, arch: 2 });
  }
  for (const xx of [x0, x0 + w1 - 1]) {
    for (const zz of [z0, z0 + w1 - 1]) column(world, { x: xx, z: zz, y0: yWall, h: WALL_H, block: P.columnRed });
  }

  // 平座：下层墙身顶面铺一层木地板，栏杆沿台明外沿一圈
  let deck = yWall + WALL_H;
  let planHalf = half;
  world.plate(deck, cx - planHalf, cz - planHalf, 2 * planHalf + 1, 2 * planHalf + 1, P.beamWood);

  for (let tier = 1; tier < storeys; tier++) {
    const h2 = planHalf - INSET;
    const bx = cx - h2;
    const bz = cz - h2;
    const bw = 2 * h2 + 1;
    const yBody = deck + 1; // 木构起始：deck 层是平座板
    const yArch = yBody + BAY_H;
    const yDG = yArch + 1;
    const yEave = yDG + DG_H;
    const last = tier === storeys - 1;
    const rail = 2 * planHalf + 1;
    const railOpts = { y0: yBody, length: rail, block: P.latticeWood, post: P.columnRed, h: RAIL_H };

    balustrade(world, { ...railOpts, x0: cx - planHalf, z: cz - planHalf, axis: "x" });
    balustrade(world, { ...railOpts, x0: cx - planHalf, z: cz + planHalf, axis: "x" });
    balustrade(world, { ...railOpts, x0: cx - planHalf, z: cz - planHalf, axis: "z" });
    balustrade(world, { ...railOpts, x0: cx + planHalf, z: cz - planHalf, axis: "z" });

    // 木构：四角立柱 + 四面隔扇，每面中间留一格空当，好从外面看到钟或鼓
    for (const xx of [bx, bx + bw - 1]) {
      for (const zz of [bz, bz + bw - 1]) column(world, { x: xx, z: zz, y0: yBody, h: BAY_H, block: P.columnRed });
    }
    // 每面：两端各一段隔扇、中间留 1 格空当；平面小时隔扇随之变窄
    const bayW = Math.max(1, (bw - 3) >> 1);
    const bayA = bx + 1;
    const bayB = bx + bw - 1 - bayW;
    for (const sx of [bayA, bayB]) {
      latticeBay(world, { x0: sx, y0: yBody, z0: bz + 1, w: bayW, h: BAY_H });
      latticeBay(world, { x0: sx, y0: yBody, z0: bz + bw - 2, w: bayW, h: BAY_H });
    }
    for (const sz of [bz + 1, bz + bw - 1 - bayW]) {
      bayX(world, { x: bx, z0: sz, y0: yBody, w: bayW, h: BAY_H, face: -1 });
      bayX(world, { x: bx + bw - 1, z0: sz, y0: yBody, w: bayW, h: BAY_H, face: 1 });
    }

    // 额枋 + 檐下斗拱
    architrave(world, { x0: bx, z0: bz, w: bw, d: bw, y0: yArch, h: 1 });
    dougongBand(world, { cx, cz, half: h2, y0: yDG, step: DG_STEP, out: 1 });

    if (last) {
      // 悬钟梁，下挂钟或鼓；隔扇与衬板各占一层，内部净宽是 bw - 4
      world.box(bx, yArch, cz, bw, 1, 1, P.beamWood);
      const inner = bw - 4;
      if (hasBell) bell(world, { cx, cz, y: yBody, w: Math.min(5, inner) });
      else drum(world, { cx, cz, y: yBody, wi: inner });

      // 攒尖顶 + 宝顶
      const eh = h2 + EAVE_OUT;
      buildRoof(world, {
        x0: cx - eh,
        z0: cz - eh,
        w: 2 * eh + 1,
        d: 2 * eh + 1,
        y0: yEave,
        type: "cuanjian",
        tileA,
        tileB,
        upturn: 3,
        height: EAVE_H,
        finial: true,
      });
      break;
    }

    // 腰檐：矮檐外套，顶平台比本层每边大 1，正好成为上层的平座
    const eh = h2 + EAVE_OUT;
    buildRoof(world, {
      x0: cx - eh,
      z0: cz - eh,
      w: 2 * eh + 1,
      d: 2 * eh + 1,
      y0: yEave,
      type: "wudian",
      tileA,
      tileB,
      upturn: 2,
      height: EAVE_WAIST_H,
      finial: false,
    });
    const crest = roofTop(world, cx + 1, cz + 1, yEave, yEave + EAVE_WAIST_H);
    clearRidgeDecor(world, { cx, cz, y: crest + 1, half: eh + 1 });
    planHalf = h2 + 1;
    deck = crest;
    world.plate(deck, cx - planHalf, cz - planHalf, 2 * planHalf + 1, 2 * planHalf + 1, P.beamWood);
  }

  // 檐下灯笼：x 向与 z 向各一只，挂钩挂进最上层檐口的底面（半径按最上层檐口取，别挂到檐外）
  const lampR = Math.min(half, planHalf - INSET + EAVE_OUT) - 1;
  const lampY = deck + 4;
  lantern(world, { x: cx + lampR, y: lampY, z: cz - 1, size: 2, cord: 2 });
  lantern(world, { x: cx - 1, y: lampY, z: cz + lampR, size: 2, cord: 2 });
}

/**
 * 楼阁式宝塔，位于中轴线（cx = 0，全局镜像补出西半）。
 * 形制：抹角方形的塔基 → 逐层收分的塔身（四面佛龛、木色边框）→ 每层出檐
 * （矮檐 + 檐椽 + 斗拱）→ 顶层攒尖顶收头，上立塔刹（相轮 + 宝珠）。
 * 每层檐口比该层塔身每边外扩 3，檐高显式取 5，收分正好落在上一层塔身的平面上，
 * 塔身因此像叠起来的一样，不会露出檐顶平台。
 */
export function buildPagoda(world, opts = {}) {
  const { cx = 0, cz, y0 = 2, half = 10, tiers = 5, tileA = P.tileGreen, tileB = P.tileA, body = P.wallRed } = opts;
  if (!Number.isFinite(cz)) throw new Error("buildPagoda 需要 cz");

  const BASE_H = 3; // 塔基高
  const BASE_OUT = 3; // 塔基比塔身每边外扩
  const BASE_CUT = 3; // 四角抹角深度
  const WALL_H = 9; // 层高（塔身）
  const WALL_T = 3; // 塔身墙厚
  const EAVE_OUT = 3; // 檐口比塔身每边外扩
  const EAVE_H = 5; // 檐高：收分恰好 4 格，落在上一层塔身每边小 1 的位置
  const INSET = 1; // 每层塔身平面比下层每边内收
  const NICHE_W = 5; // 佛龛宽
  const NICHE_H = 5; // 佛龛高（含券顶）
  const DG_STEP = 4; // 逐间斗拱间距
  const TOP_H = 7; // 顶层攒尖举高：收成 5×5 平台，塔刹露盘正好落座
  const STRIDE = WALL_H + EAVE_H - 1; // 每层塔身＋出檐所占层数
  const TOP_SPAN = WALL_H + TOP_H + 6; // 顶层塔身＋攒尖＋塔刹
  const be = half + BASE_OUT;
  // 层数上限：平面收分收不下去、或塔尖会顶破世界高度时截断
  const count = Math.max(1, Math.min(tiers, half - 1, 1 + Math.floor((world.maxY - y0 - BASE_H - TOP_SPAN) / STRIDE)));

  // 塔基：抹角方形（四角斜切），下枋外扩、上枋为台明
  plinth(world, { x0: cx - be, z0: cz - be, w: 2 * be + 1, d: 2 * be + 1, y0, h: BASE_H });
  world.quadZ(cz, () => {
    for (let k = 0; k < BASE_CUT; k++) {
      for (let j = 0; j <= k; j++) {
        const xx = cx + be - j;
        const zz = cz + be - (k - j);
        for (let y = y0; y < y0 + BASE_H; y++) world.clear(xx, y, zz);
      }
    }
  });

  let b = y0 + BASE_H;
  for (let tier = 0; tier < count; tier++) {
    const hi = half - INSET * tier;
    const x0 = cx - hi;
    const z0 = cz - hi;
    const w = 2 * hi + 1;
    const yTop = b + WALL_H; // 檐口层
    const yDG = yTop - 3; // 檐下斗拱三层，最上一层与檐椽同层
    const last = tier === count - 1;
    const eh = hi + EAVE_OUT;

    wallRing(world, { x0, z0, y0: b, w, d: w, h: WALL_H, t: WALL_T, block: body });

    // 四面券门 / 佛龛：深色龛底内凹，木色边框
    world.quadZ(cz, () => {
      for (const [zf, face] of [[z0, -1], [z0 + w - 1, 1]]) {
        niche(world, {
          x0: cx - ((NICHE_W - 1) >> 1),
          y0: b,
          z0: zf,
          w: NICHE_W,
          h: NICHE_H,
          axis: "z",
          face,
          depth: WALL_T,
          arch: 2,
          frame: P.latticeWood,
        });
      }
      niche(world, {
        x0: x0 + w - 1,
        z0: cz - ((NICHE_W - 1) >> 1),
        y0: b,
        w: NICHE_W,
        h: NICHE_H,
        axis: "x",
        face: 1,
        depth: WALL_T,
        arch: 2,
        frame: P.latticeWood,
      });
      // 檐下斗拱：中轴建筑用 parts.js 的 dougongRing（它的 x 间距锚定在 x = 0，z 间距锚定 cz，
      // 另一半由 x 镜像与 quadZ 补齐）；偏轴双塔时同一套单元改用按 cx 锚定的 dougongBand。
      if (cx === 0) dougongRing(world, { x0, z0, w, d: w, y0: yDG, step: DG_STEP, out: 1 });
      else dougongBand(world, { cx, cz, half: hi, y0: yDG, step: DG_STEP, out: 1 });
    });

    if (!last) {
      // 每层出檐：显式矮檐，收分落在上一层塔身外沿
      buildRoof(world, {
        x0: cx - eh,
        z0: cz - eh,
        w: 2 * eh + 1,
        d: 2 * eh + 1,
        y0: yTop,
        type: "wudian",
        tileA,
        tileB,
        upturn: 2,
        finial: false,
        height: EAVE_H,
      });
      const crest = roofTop(world, cx + 1, cz + 1, yTop, yTop + EAVE_H);
      clearRidgeDecor(world, { cx, cz, y: crest + 1, half: eh + 1 });
      b = crest; // 檐顶平台就是上一层塔身的落脚层
      continue;
    }

    // 顶层：攒尖顶收头，上看不见正脊，直接用塔刹替代
    buildRoof(world, {
      x0: cx - eh,
      z0: cz - eh,
      w: 2 * eh + 1,
      d: 2 * eh + 1,
      y0: yTop,
      type: "cuanjian",
      tileA,
      tileB,
      upturn: 2,
      finial: false,
      height: TOP_H,
    });
    const crest = roofTop(world, cx + 1, cz + 1, yTop, yTop + TOP_H);
    clearRidgeDecor(world, { cx, cz, y: crest + 1, half: eh + 1 });
    let r = 0;
    while (r < 3 && world.get(cx + r + 1, crest, cz) !== 0) r++;
    spire(world, { cx, cz, y: crest + 1, r });
  }
}
