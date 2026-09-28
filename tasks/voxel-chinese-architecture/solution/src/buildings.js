import { C } from './palette.js';
import { steppedRoof, dougongBand, lattice } from './roofs.js';

/**
 * 场馆布局（体素坐标，1 体素 = 1 单位）：
 *   x 东西（+东），z 南北（+南）。中轴 x=0，南入口在 +z。
 *   山门 z≈57..74 → 中央甬道/庭院 → 主殿（z=-49..-13 台基）
 *   东西配殿 x=±33..53，钟鼓楼 x=±43 z=30，宝塔 (0,-67)。
 */

/** 围墙：红墙灰帽，四角墩台，南面由山门断开。 */
export function buildWalls(w) {
  const X = 66, ZS = 70, ZN = -84;
  const wall = (x0, z0, x1, z1) => {
    w.box(x0, 0, z0, x1, 3, z1, C.wallRed);
    w.box(x0, 4, z0, x1, 4, z1, C.tileGreyDark);
  };
  // 南墙两段（山门占 x=-15..15）
  wall(-X, ZS - 1, -16, ZS);
  wall(16, ZS - 1, X, ZS);
  // 北墙 / 东西墙
  wall(-X, ZN, X, ZN + 1);
  wall(X - 1, ZN, X, ZS);
  wall(-X, ZN, -X + 1, ZS);
  // 四角墩台（比墙高出一点，灰帽）
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const x0 = Math.min(sx * 65, sx * 68), x1 = Math.max(sx * 65, sx * 68);
      w.box(x0, 0, sz > 0 ? ZS - 1 : ZN - 2, x1, 5, sz > 0 ? ZS + 2 : ZN + 1, C.wallRedDark);
      w.box(x0, 5, sz > 0 ? ZS - 1 : ZN - 2, x1, 5, sz > 0 ? ZS + 2 : ZN + 1, C.tileGreyDark);
    }
  }
}

/** 山门：城台式门座 + 门楼，中央门洞贯通南北。 */
export function buildGate(w) {
  w.box(-15, 0, 57, 15, 0, 74, C.stoneGrey);          // 城台基座
  w.box(-15, 1, 57, 15, 6, 74, C.wallRed);            // 城台
  // 中央门洞贯通
  for (let x = -3; x <= 3; x++)
    for (let y = 1; y <= 5; y++)
      for (let z = 57; z <= 74; z++) w.clear(x, y, z);
  // 门洞金框（南北两向）
  for (const z of [57, 74]) {
    w.box(-4, 1, z, -4, 5, z, C.woodGold);
    w.box(4, 1, z, 4, 5, z, C.woodGold);
    w.box(-4, 6, z, 4, 6, z, C.woodGold);
  }
  // 侧面小门龛（南北立面各一对）
  for (const xs of [[-10, -8], [8, 10]]) {
    for (const [zOut, zIn] of [[74, 72], [57, 59]]) {
      for (let x = xs[0]; x <= xs[1]; x++)
        for (let y = 1; y <= 4; y++)
          for (let z = Math.min(zOut, zIn); z <= Math.max(zOut, zIn); z++) w.clear(x, y, z);
      for (let x = xs[0]; x <= xs[1]; x++)
        for (let y = 1; y <= 4; y++) w.set(x, y, zIn, C.windowDark);
    }
  }
  // 匾额
  w.box(-3, 7, 75, 3, 8, 75, C.windowDark);
  w.box(-2, 7, 75, 2, 8, 75, C.woodGold);
  // 平座与门楼
  w.ring(-13, 7, 58, 13, 7, 73, C.woodBeam);
  w.box(-11, 7, 60, 11, 10, 71, C.wallRed);
  lattice(w, 's', -9, 9, 8, 9, 60, C.windowDark, C.woodBeam);
  lattice(w, 'n', -9, 9, 8, 9, 71, C.windowDark, C.woodBeam);
  lattice(w, 'w', 62, 69, 8, 9, -11, C.windowDark, C.woodBeam);
  lattice(w, 'e', 62, 69, 8, 9, 11, C.windowDark, C.woodBeam);
  dougongBand(w, -13, 13, 58, 73, 11, C.woodDark, C.woodGold);
  steppedRoof(w, -17, 17, 56, 75, 12, C.glazedYellow, {
    shrinkX: 2, shrinkZ: 2, ridgeX: 5, ridgeZ: 0, ridgeColor: C.glazedYellowDark, tips: 3,
  });
}

/**
 * 主殿：三层汉白玉台基 + 重大的红墙大殿 + 歇山黄琉璃顶。
 * 全场体量最大，坐北朝南，南面为柱廊与格扇。
 */
export function buildMainHall(w) {
  // 台基三层
  w.box(-32, 0, -49, 32, 1, -19, C.stoneWhite);
  w.box(-29, 2, -46, 29, 3, -16, C.stoneWhite);
  w.box(-26, 4, -43, 26, 5, -13, C.stoneWhite);
  // 台基栏板
  w.ring(-32, 2, -49, 32, 2, -19, C.stoneWhiteDark);
  w.ring(-29, 4, -46, 29, 4, -16, C.stoneWhiteDark);
  w.ring(-26, 6, -43, 26, 6, -13, C.stoneWhiteDark);
  // 中央大阶（五踏，从庭院直上台顶）
  for (let k = 1; k <= 5; k++) {
    const zA = -6 - 2 * (k - 1), zB = -5 - 2 * (k - 1);
    w.box(-4, 0, zA, 4, k, zB, C.stoneWhite);
  }
  for (let x = -4; x <= 4; x++) w.clear(x, 6, -13);   // 阶口断开栏板

  // 殿身
  w.box(-23, 6, -41, 23, 14, -23, C.wallRed);
  // 前后檐柱（外凸一拍）
  for (let x = -20; x <= 20; x += 4) {
    for (let y = 6; y <= 14; y++) {
      w.set(x, y, -22, C.columnRed);
      w.set(x, y, -42, C.columnRed);
    }
  }
  // 两山角柱与檐柱
  for (const sx of [-1, 1]) {
    for (let z = -38; z <= -26; z += 4) {
      for (let y = 6; y <= 14; y++) w.set(sx * 24, y, z, C.columnRed);
    }
    for (const z of [-42, -22])
      for (let y = 6; y <= 14; y++) w.set(sx * 24, y, z, C.columnRed);
  }
  // 前檐明间大门（龛式内凹）
  for (let x = -3; x <= 3; x++)
    for (let y = 6; y <= 11; y++) {
      w.clear(x, y, -23);
      w.set(x, y, -24, C.windowDark);
    }
  for (let y = 6; y <= 12; y++) {
    w.set(-4, y, -22, C.woodGold);
    w.set(4, y, -22, C.woodGold);
  }
  w.box(-4, 12, -22, 4, 12, -22, C.woodGold);
  // 匾额
  w.box(-3, 13, -22, 3, 13, -22, C.windowDark);
  w.box(-2, 13, -22, 2, 13, -22, C.woodGold);
  // 前檐次间 / 梢间格扇窗
  lattice(w, 's', -19, -8, 8, 11, -23, C.windowDark, C.woodBeam);
  lattice(w, 's', 8, 19, 8, 11, -23, C.windowDark, C.woodBeam);
  // 两山与后檐窗
  for (const sx of [-1, 1]) lattice(w, sx < 0 ? 'w' : 'e', -38, -26, 8, 11, sx * 23, C.windowDark, C.woodBeam);
  lattice(w, 'n', -14, -6, 8, 11, -41, C.windowDark, C.woodBeam);
  lattice(w, 'n', 6, 14, 8, 11, -41, C.windowDark, C.woodBeam);

  // 斗拱带
  dougongBand(w, -25, 25, -43, -21, 15, C.woodDark, C.woodGold);
  // 歇山顶：下檐四面坡，六层后 x 向停止收分成山花
  steppedRoof(w, -26, 26, -44, -20, 16, C.glazedYellow, {
    xStop: 6, ridgeX: 10, ridgeZ: 0, ridgeColor: C.glazedYellowDark, tips: 3,
  });
}

/** 配殿（s=-1 西 / +1 东）：单层红墙硬朗小殿，青瓦庑殿顶。 */
export function buildSideHall(w, s) {
  const bx = (a, b) => [Math.min(s * a, s * b), Math.max(s * a, s * b)];
  let [x0, x1] = bx(33, 53);
  w.box(x0, 0, -44, x1, 1, -24, C.stoneWhite);        // 台基
  w.ring(x0, 2, -44, x1, 2, -24, C.stoneWhiteDark);
  [x0, x1] = bx(35, 51);
  w.box(x0, 2, -41, x1, 8, -27, C.wallRed);           // 殿身
  // 前檐柱
  for (let x = 37; x <= 49; x += 3)
    for (let y = 2; y <= 8; y++) w.set(s * x, y, -26, C.columnRed);
  for (const x of [35, 51])
    for (let y = 2; y <= 8; y++) w.set(s * x, y, -26, C.columnRed);
  // 明间门 + 格扇窗
  for (let x = -2; x <= 2; x++)
    for (let y = 2; y <= 6; y++) {
      w.clear(s * 43 + x, y, -27);
      w.set(s * 43 + x, y, -28, C.windowDark);
    }
  // 正面格扇窗（带符号 x 写）
  for (let x = 37; x <= 40; x++)
    for (let y = 4; y <= 6; y++) {
      const t = x % 3 === 0 || y % 2 === 1 ? C.woodBeam : C.windowDark;
      w.set(s * x, y, -27, t);
    }
  for (let x = 46; x <= 49; x++)
    for (let y = 4; y <= 6; y++) {
      const t = x % 3 === 0 || y % 2 === 1 ? C.woodBeam : C.windowDark;
      w.set(s * x, y, -27, t);
    }
  // 两山窗
  const zf = s < 0 ? 'w' : 'e';
  lattice(w, zf, -39, -29, 4, 6, s * 51, C.windowDark, C.woodBeam);
  dougongBand(w, s * 34, s * 52, -42, -26, 9, C.woodDark, C.woodGold);
  let [rx0, rx1] = bx(34, 52);
  steppedRoof(w, rx0, rx1, -44, -24, 10, C.tileGrey, {
    shrinkZ: 2, ridgeX: 3, ridgeZ: 0, ridgeColor: C.tileGreyDark, tips: 2,
  });
}

/** 钟楼 / 鼓楼（s=-1 西 / +1 东）：两层方塔，绿琉璃攒尖顶。 */
export function buildTower(w, s, kind) {
  const bx = (a, b) => [Math.min(s * a, s * b), Math.max(s * a, s * b)];
  let [x0, x1] = bx(36, 50);
  w.box(x0, 0, 23, x1, 0, 37, C.stoneGrey);           // 基座
  [x0, x1] = bx(37, 49);
  w.box(x0, 1, 24, x1, 6, 36, C.wallRed);             // 一层
  for (let x = 39; x <= 47; x++)
    for (let z = 26; z <= 34; z++)
      for (let y = 1; y <= 6; y++) w.clear(s * x, y, z);   // 掏空内部
  // 四向券门
  for (let x = 41; x <= 45; x++)
    for (let y = 1; y <= 4; y++)
      for (const z of [24, 25, 35, 36]) w.clear(s * x, y, z);
  for (let z = 28; z <= 32; z++)
    for (let y = 1; y <= 4; y++)
      for (const x of [37, 38, 48, 49]) w.clear(s * x, y, z);
  // 楼内钟 / 鼓
  if (kind === 'bell') {
    w.box(s * 42, 5, 29, s * 44, 5, 31, C.woodDark);   // 悬梁
    w.box(s * 42, 3, 29, s * 44, 4, 31, C.gold);       // 金钟
  } else {
    w.box(s * 42, 1, 29, s * 44, 2, 31, C.woodBeam);   // 鼓架
    w.box(s * 42, 2, 29, s * 44, 3, 31, C.bannerRed);  // 大鼓
  }
  // 平座腰檐
  [x0, x1] = bx(35, 51);
  w.ring(x0, 7, 22, x1, 7, 38, C.woodBeam);
  [x0, x1] = bx(38, 48);
  w.box(x0, 8, 25, x1, 12, 35, C.wallRed);            // 二层
  // 二层四向格窗（带符号写法）
  for (let x = 40; x <= 46; x++)
    for (let y = 9; y <= 11; y++) {
      const t = x % 3 === 0 || y % 2 === 1 ? C.woodBeam : C.windowDark;
      w.set(s * x, y, 25, t);
      w.set(s * x, y, 35, t);
    }
  for (let z = 27; z <= 33; z++)
    for (let y = 9; y <= 11; y++) {
      const t = z % 3 === 0 || y % 2 === 1 ? C.woodBeam : C.windowDark;
      w.set(s * 38, y, z, t);
      w.set(s * 48, y, z, t);
    }
  dougongBand(w, s * 35, s * 51, 22, 38, 13, C.woodDark, C.woodGold);
  [x0, x1] = bx(35, 51);
  const top = steppedRoof(w, x0, x1, 22, 38, 14, C.glazedGreen, {
    ridgeX: 0, ridgeZ: 0, ridgeColor: C.glazedGreenDark, tips: 2, ornaments: false,
  });
  w.set(s * 43, top + 1, 30, C.gold);
  w.set(s * 43, top + 2, 30, C.gold);
}

/** 宝塔：七层青砖塔，逐层收分，塔刹攒尖。 */
export function buildPagoda(w) {
  const CX = 0, CZ = -67;
  w.box(CX - 8, 0, CZ - 8, CX + 8, 1, CZ + 8, C.stoneWhite);   // 塔基
  w.ring(CX - 8, 2, CZ - 8, CX + 8, 2, CZ + 8, C.stoneWhiteDark);
  const widths = [6, 6, 5, 5, 4, 4, 3];
  for (let t = 0; t < widths.length; t++) {
    const hw = widths[t];
    const yb = 2 + t * 5;
    w.box(CX - hw, yb, CZ - hw, CX + hw, yb + 2, CZ + hw, C.stoneGrey);
    // 塔身窗（南面）
    const wz = CZ + hw;
    if (t === 0) {
      w.box(CX - 1, yb, wz, CX + 1, yb + 1, wz, C.windowDark);   // 底层塔门
    } else {
      w.set(CX, yb + 1, wz, C.windowDark);
      if (hw >= 5) {
        w.set(CX - 2, yb + 1, wz, C.windowDark);
        w.set(CX + 2, yb + 1, wz, C.windowDark);
      }
    }
    // 檐子（两层挑出的叠涩）
    w.box(CX - hw - 1, yb + 3, CZ - hw - 1, CX + hw + 1, yb + 3, CZ + hw + 1, C.tileGrey);
    w.box(CX - hw, yb + 4, CZ - hw, CX + hw, yb + 4, CZ + hw, C.tileGreyDark);
    // 檐角翘起
    for (const sx of [-1, 1])
      for (const sz of [-1, 1]) {
        w.set(CX + sx * (hw + 1), yb + 4, CZ + sz * (hw + 1), C.tileGrey);
        w.set(CX + sx * (hw + 2), yb + 5, CZ + sz * (hw + 2), C.tileGrey);
      }
  }
  // 塔刹
  const topY = 2 + 7 * 5;
  const fin = steppedRoof(w, CX - 3, CX + 3, CZ - 3, CZ + 3, topY, C.tileGreyDark, {
    ridgeX: 0, ridgeZ: 0, ridgeColor: C.ridgeDark, tips: 0, ornaments: false,
  });
  w.set(CX, fin + 1, CZ, C.gold);
  w.set(CX, fin + 2, CZ, C.gold);
  w.set(CX, fin + 3, CZ, C.gold);
}
