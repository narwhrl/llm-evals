import { C, Voxels } from './voxel.js';

/* 布局（x 右，z+ 为南/前）：山门(0,32) → 钟鼓楼(±19,19) → 配殿(±19,2) → 主殿(0,-18) → 宝塔(0,-40) */

// ---------- 通用构件 ----------

function ringBeam(v, x, z, hw, hd, y, color) {
  v.fill(x - hw, x + hw, y, y, z - hd, z - hd, color);
  v.fill(x - hw, x + hw, y, y, z + hd, z + hd, color);
  if (hd > 1) {
    v.fill(x - hw, x - hw, y, y, z - hd + 1, z + hd - 1, color);
    v.fill(x + hw, x + hw, y, y, z - hd + 1, z + hd - 1, color);
  }
}

// 斗拱层：沿檐口交替出小块
function dougong(v, x, z, hw, hd, y) {
  let i = 0;
  for (let xi = x - hw; xi <= x + hw; xi += 2, i++) {
    const c = i % 2 ? C.BEAM : C.TILE_T;
    v.box(xi, y, z - hd, 1, 1, 2, c);
    v.box(xi, y, z + hd, 1, 1, 2, c);
  }
  let j = 0;
  for (let zi = z - hd + 2; zi <= z + hd - 2; zi += 2, j++) {
    const c = j % 2 ? C.BEAM : C.TILE_T;
    v.box(x - hw, y, zi, 2, 1, 1, c);
    v.box(x + hw, y, zi, 2, 1, 1, c);
  }
}

// 庑殿顶：四面收分；收至 hd===0 时结金色屋脊；四角飞檐翘角
export function hipRoof(v, cx, cz, yB, w, d, tile, opt = {}) {
  const ridge = opt.ridge ?? C.RIDGE;
  const ov = opt.overhang ?? 2;
  let hw = Math.floor(w / 2) + ov;
  let hd = Math.floor(d / 2) + ov;
  const hw0 = hw;
  const hd0 = hd;
  let y = yB;
  let layers = 0;
  const cap = opt.cap ?? 0;
  for (;;) {
    if (hw < 0 || hd < 0) break;
    if (cap && layers >= cap) break;
    if (hd === 0) {
      v.fill(cx - hw, cx + hw, y, y, cz, cz, ridge);
      v.box(cx - hw - 1, y + 0.5, cz, 1, 2, 1, ridge); // 脊兽（吻）
      v.box(cx + hw + 1, y + 0.5, cz, 1, 2, 1, ridge);
      y++;
      break;
    }
    v.fill(cx - hw, cx + hw, y, y, cz - hd, cz + hd, tile);
    hw--;
    hd--;
    y++;
    layers++;
  }
  if (opt.lift !== false) {
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        for (let k = 1; k <= 3; k++) {
          v.add(cx + sx * (hw0 + k), yB + k - 1, cz + sz * (hd0 + k), tile);
        }
      }
    }
  }
  return y;
}

// 攒尖顶：方形收分至金顶
export function pyramidRoof(v, cx, cz, yB, halfW, tile, opt = {}) {
  const ridge = opt.ridge ?? C.RIDGE;
  const ov = opt.overhang ?? 1;
  let h = halfW + ov;
  let y = yB;
  let guard = 0;
  while (h > 0 && guard++ < 60) {
    v.fill(cx - h, cx + h, y, y, cz - h, cz + h, tile);
    h--;
    y++;
  }
  v.box(cx, y, cz, 2, 1, 2, ridge); // 金顶
  y++;
  if (opt.lift !== false) {
    const h0 = halfW + ov;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        for (let k = 1; k <= 2; k++) {
          v.add(cx + sx * (h0 + k), yB + k - 1, cz + sz * (h0 + k), tile);
        }
      }
    }
  }
  return y;
}

// ---------- 殿堂 ----------

export function hall(v, o) {
  const { x, z, w = 15, d = 9, colH = 6, tile = C.TILE_T, tiers = 3 } = o;
  const doubleEave = !!o.doubleEave;
  const gable = !!o.gable;
  const doors = o.doors ?? 1;
  const hw = Math.floor(w / 2);
  const hd = Math.floor(d / 2);

  // 台基
  const over = [6, 4, 2];
  for (let t = 0; t < tiers; t++) {
    const s = over[t] ?? 2;
    v.box(x, t, z, w + s, 1, d + s, t === tiers - 1 ? C.MARBLE : C.MARBLE_D);
  }
  // 南向台阶
  const zEdge = z + (d + over[0]) / 2;
  const stW = doors === 3 ? 11 : 7;
  for (let s = 0; s < tiers; s++) {
    v.box(x, tiers - 1 - s, zEdge + 1 + s * 2, stW, 1, 2, C.MARBLE_D);
  }
  if (o.backSteps) {
    const zEdgeN = z - (d + over[0]) / 2;
    for (let s = 0; s < tiers; s++) {
      v.box(x, tiers - 1 - s, zEdgeN - 1 - s * 2, stW, 1, 2, C.MARBLE_D);
    }
  }

  const y0 = tiers;
  const y1 = y0 + colH - 1;

  // 柱网（深红，略出墙面以显影）
  for (let xi = x - hw; xi <= x + hw; xi += 3) {
    v.fill(xi, xi, y0, y1, z - hd, z - hd, C.COL);
    v.fill(xi, xi, y0, y1, z + hd, z + hd, C.COL);
  }
  for (let zi = z - hd + 3; zi <= z + hd - 3; zi += 3) {
    v.fill(x - hw, x - hw, y0, y1, zi, zi, C.COL);
    v.fill(x + hw, x + hw, y0, y1, zi, zi, C.COL);
  }

  // 墙体（实心红墙，门窗以贴面表现）
  v.fill(x - hw, x + hw, y0, y1, z - hd, z + hd, C.WALL);

  // 门（南立面）
  const doorXs = doors === 3 ? [-5, 0, 5] : [0];
  const doorW = doors === 3 ? 3 : 4;
  for (const dx of doorXs) {
    const cy = y0 + (colH - 1) / 2;
    v.box(x + dx, cy, z + hd + 0.15, doorW + 1.4, colH, 0.4, C.BEAM); // 门框
    v.box(x + dx, cy, z + hd + 0.3, doorW, colH - 1, 0.5, C.DOOR); // 门扇
    v.box(x + dx, cy + 0.5, z + hd + 0.55, doorW - 1, 0.5, 0.2, C.TRIM); // 金饰
  }
  // 匾额
  v.box(x, y1 + 1, z + hd + 0.4, 5.6, 2, 0.3, C.TRIM);
  v.box(x, y1 + 1, z + hd + 0.55, 5, 1.5, 0.35, C.PLAQUE);

  // 窗（南立面门间 + 东西山墙 + 北墙）
  const winY = y0 + 3;
  const winXs = doors === 3 ? [] : [-hw + 3, hw - 3];
  for (const wx of winXs) {
    latticeWin(v, wx, winY, z + hd, 0);
  }
  for (let i = -1; i <= 1; i++) {
    latticeWin(v, x + i * Math.max(4, Math.floor(hw / 2)), winY, z - hd, 2);
  }
  const nz = Math.max(1, Math.floor((d - 4) / 5));
  for (let i = 0; i < nz; i++) {
    const wz = z - hd + 3 + i * 5;
    if (wz > z + hd - 2) break;
    latticeWin(v, x - hw, winY, wz, 3);
    latticeWin(v, x + hw, winY, wz, 1);
  }

  // 檐部：阑额 + 斗拱 + 檐板
  ringBeam(v, x, z, hw, hd, y1 + 1, C.BEAM);
  dougong(v, x, z, hw, hd, y1 + 2);
  ringBeam(v, x, z, hw + 1, hd + 1, y1 + 3, C.BEAM);
  let yB = y1 + 4;

  // 歇山顶山花（东西两面三角形封山墙）
  if (gable) {
    for (let j = 0; j <= 3; j++) {
      const dz = 3 - j;
      v.fill(x - hw, x - hw, yB - 1 + j, yB - 1 + j, z - dz, z + dz, C.WALL);
      v.fill(x + hw, x + hw, yB - 1 + j, yB - 1 + j, z - dz, z + dz, C.WALL);
    }
  }

  if (doubleEave) {
    // 下檐三层 + 红色 clerestory + 上檐
    yB = hipRoof(v, x, z, yB, w + 2, d + 2, tile, { overhang: 3, cap: 3 });
    v.fill(x - hw + 2, x + hw - 2, yB, yB + 1, z - hd + 2, z + hd - 2, C.WALL);
    for (const wx of [-4, 0, 4]) {
      v.box(x + wx, yB + 0.5, z + hd - 1.5, 2, 1.5, 0.4, C.PAPER);
    }
    yB = hipRoof(v, x, z, yB + 2, w - 2, d - 2, tile, { overhang: 2 });
  } else {
    yB = hipRoof(v, x, z, yB, w + 2, d + 2, tile, { overhang: 2 });
  }
  return yB;
}

// 方格窗贴面：face 0南 1东 2北 3西
function latticeWin(v, wx, wy, wz, face) {
  const dx = face === 1 ? 1 : face === 3 ? -1 : 0;
  const dz = face === 0 ? 1 : face === 2 ? -1 : 0;
  const fx = wx + dx * 0.15;
  const fz = wz + dz * 0.15;
  const px = wx + dx * 0.3;
  const pz = wz + dz * 0.3;
  const bx = wx + dx * 0.45;
  const bz = wz + dz * 0.45;
  if (dx !== 0) {
    v.box(fx, wy, wz, 0.3, 3, 3, C.BEAM);
    v.box(px, wy, wz, 0.35, 2, 2, C.PAPER);
    v.box(bx, wy, wz, 0.2, 2.2, 0.3, C.BEAM);
    v.box(bx, wy, wz, 0.2, 0.3, 2.2, C.BEAM);
  } else {
    v.box(wx, wy, fz, 3, 3, 0.3, C.BEAM);
    v.box(wx, wy, pz, 2, 2, 0.35, C.PAPER);
    v.box(wx, wy, bz, 0.3, 2.2, 0.2, C.BEAM);
    v.box(wx, wy, bz, 2.2, 0.3, 0.2, C.BEAM);
  }
}

// ---------- 钟鼓楼 ----------

export function tower(v, o) {
  const { x, z, kind } = o; // 'bell' | 'drum'
  const s = 4;
  // 台基两层 + 台阶
  v.box(x, 0, z, 11, 1, 11, C.MARBLE_D);
  v.box(x, 1, z, 9, 1, 9, C.MARBLE);
  v.box(x, 0, z + 6.5, 5, 1, 2, C.MARBLE_D);
  const y0 = 2;
  const colH = 6;
  const y1 = y0 + colH - 1;
  // 8 柱（开敞厅）
  for (const [cx, cz] of [
    [-s, -s], [0, -s], [s, -s],
    [-s, s], [0, s], [s, s],
    [-s, 0], [s, 0],
  ]) {
    v.fill(x + cx, x + cx, y0, y1, z + cz, z + cz, C.COL);
  }
  // 栏杆
  ringBeam(v, x, z, s, s, y0 + 1, C.BEAM);
  // 悬挂层横梁 + 钟/鼓
  v.box(x, y1, z, 2 * s + 1, 1, 1, C.BEAM);
  if (kind === 'bell') {
    v.box(x, y1 - 2, z, 2, 3, 2, C.BRONZE);
    v.box(x, y1, z, 1, 1, 1, C.BRONZE);
  } else {
    v.box(x - 1, y1 - 2, z, 1, 3, 1, C.BEAM);
    v.box(x + 1, y1 - 2, z, 1, 3, 1, C.BEAM);
    v.box(x, y1 - 2, z, 3, 2, 2, C.DRUM);
    v.box(x, y1 - 2, z, 3.2, 0.5, 2.2, C.TRIM);
  }
  // 檐 + 攒尖顶
  ringBeam(v, x, z, s, s, y1 + 1, C.BEAM);
  dougong(v, x, z, s, s, y1 + 2);
  const yT = pyramidRoof(v, x, z, y1 + 3, s + 1, C.TILE_T, { overhang: 2 });
  v.box(x, yT + 1, z, 1, 2, 1, C.RIDGE); // 宝顶
  return yT + 2;
}

// ---------- 宝塔（五层） ----------

export function pagoda(v, o) {
  const { x, z, stories = 5 } = o;
  v.box(x, 0, z, 13, 1, 13, C.MARBLE_D);
  v.box(x, 1, z, 11, 1, 11, C.MARBLE);
  let y = 2;
  let halfW = 4;
  for (let s = 0; s < stories; s++) {
    const bh = 3;
    v.fill(x - halfW, x + halfW, y, y + bh - 1, z - halfW, z + halfW, C.WALL);
    // 每面开窗/门
    v.box(x, y + 1, z + halfW + 0.3, 2, 2, 0.5, C.DOOR);
    v.box(x, y + 1, z - halfW - 0.3, 1.5, 1.5, 0.5, C.PAPER);
    v.box(x - halfW - 0.3, y + 1, z, 0.5, 1.5, 1.5, C.PAPER);
    v.box(x + halfW + 0.3, y + 1, z, 0.5, 1.5, 1.5, C.PAPER);
    // 平座栏杆
    ringBeam(v, x, z, halfW + 1, halfW + 1, y + bh, C.BEAM);
    y = pyramidRoof(v, x, z, y + bh + 1, halfW, C.TILE_T, { overhang: 2 });
    halfW -= 1;
    if (halfW < 1) halfW = 1;
  }
  // 金刹
  v.box(x, y + 0.5, z, 3, 2, 3, C.RIDGE);
  v.box(x, y + 2, z, 2, 1, 2, C.RIDGE);
  v.box(x, y + 4, z, 1, 3, 1, C.RIDGE);
  v.box(x, y + 6, z, 2, 1, 2, C.RIDGE);
  return y + 6;
}

// ---------- 院墙 ----------

export function courtyardWall(v) {
  const X = 34;
  const ZN = -30;
  const ZS = 42;
  const H = 4;
  const wall = (x0, x1, z) => {
    v.fill(x0, x1, 0, H - 1, z, z, C.WALL);
    v.box((x0 + x1) / 2, H, z, x1 - x0 + 2, 1, 2, C.MARBLE_D); // 墙帽
  };
  wall(-X, -10, ZS);
  wall(10, X, ZS);
  wall(-X, X, ZN);
  for (let z = ZN; z <= ZS; z++) {
    v.fill(-X, -X, 0, H - 1, z, z, C.WALL);
    v.fill(X, X, 0, H - 1, z, z, C.WALL);
  }
  v.box(-X, H, (ZN + ZS) / 2, 2, 1, ZS - ZN + 1, C.MARBLE_D);
  v.box(X, H, (ZN + ZS) / 2, 2, 1, ZS - ZN + 1, C.MARBLE_D);
  // 四角角楼墩
  for (const [cx, cz] of [[-X, ZN], [X, ZN], [-X, ZS], [X, ZS]]) {
    v.fill(cx - 1, cx + 1, 0, H + 1, cz - 1, cz + 1, C.WALL);
    pyramidRoof(v, cx, cz, H + 2, 1, C.MARBLE_D, { overhang: 1, lift: false, ridge: C.MARBLE_D });
  }
}

// ---------- 廊 ----------

export function corridor(v, sx) {
  // 短廊：x=sx，z 12..30
  const z0 = 12;
  const z1 = 30;
  const zm = (z0 + z1) / 2;
  const len = z1 - z0 + 1;
  v.fill(sx, sx, 0, 2, z0, z1, C.WALL);
  for (let z = z0; z <= z1; z += 6) {
    v.fill(sx, sx, 0, 3, z, z, C.COL);
  }
  v.box(sx, 3, zm, 1.5, 1, len, C.BEAM);
  v.box(sx, 4, zm, 4, 1, len, C.TILE_T); // 廊顶
  v.box(sx, 5, zm, 2, 1, len, C.TILE_T);
}

// ---------- 植物 / 器物 ----------

export function pine(v, x, z, s = 1) {
  const th = 2 + s;
  v.fill(x, x, 0, th, z, z, C.TRUNK);
  const L = (half, y, c) => v.fill(x - half, x + half, y, y, z - half, z + half, c);
  L(2, th + 1, C.LEAF_D);
  L(2, th + 2, C.LEAF);
  L(1, th + 3, C.LEAF);
  L(1, th + 4, C.LEAF_D);
  v.add(x, th + 5, z, C.LEAF);
}

export function lantern(v, x, z) {
  v.fill(x, x, 0, 3, z, z, C.BEAM);
  v.box(x, 4, z, 1.4, 2, 1.4, C.LAMP);
  v.box(x, 5.2, z, 1.8, 0.4, 1.8, C.TRIM);
  v.box(x, 2.8, z, 1.6, 0.3, 1.6, C.TRIM);
}

export function lion(v, x, z, dir = 1) {
  v.box(x, 0, z, 3, 1, 4, C.STONE); // 须弥座
  v.box(x, 2, z - dir * 0.5, 2, 2, 3, C.STONE); // 躯干
  v.box(x, 4, z + dir * 1, 2, 2, 2, C.STONE); // 头
  v.box(x, 3, z - dir * 1, 2.4, 1, 1, C.MARBLE_D); // 鬃
  v.box(x - 0.7, 5.2, z + dir * 1, 0.6, 0.6, 0.6, C.STONE); // 耳
  v.box(x + 0.7, 5.2, z + dir * 1, 0.6, 0.6, 0.6, C.STONE);
  v.box(x, 1, z + dir * 1.5, 1, 1, 1, C.STONE); // 前爪
}

export function clouds(v) {
  const puff = (x, y, z, w, d) => v.box(x, y, z, w, 1.5, d, C.CLOUD);
  puff(-30, 56, -30, 14, 6);
  puff(-24, 57.5, -28, 8, 4);
  puff(28, 60, -10, 16, 7);
  puff(34, 61.5, -8, 8, 4);
  puff(0, 62, 25, 15, 6);
  puff(-38, 58, 20, 10, 5);
}

// ---------- 地面 ----------

export function ground(v) {
  v.box(0, -1, 2, 132, 2, 116, C.GRASS);
  // 草地色斑（确定性伪随机）
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < 60; i++) {
    const px = Math.floor((rnd() - 0.5) * 120);
    const pz = Math.floor((rnd() - 0.5) * 104) + 2;
    const w = 2 + Math.floor(rnd() * 5);
    v.box(px, 0.05, pz, w, 0.15, 2 + Math.floor(rnd() * 3), C.GRASS_D);
  }
  // 前庭铺装 / 主庭铺装
  v.box(0, 0.1, 20, 52, 0.2, 20, C.PAVE);
  v.box(0, 0.1, -2, 52, 0.2, 20, C.PAVE);
  // 御道（两段，避开山门台基）
  v.box(0, 0.15, 11, 5, 0.3, 38, C.ROAD);
  v.box(0, 0.15, 43, 7, 0.3, 4, C.ROAD);
  v.box(-3, 0.15, 11, 0.6, 0.32, 38, C.ROADC);
  v.box(3, 0.15, 11, 0.6, 0.32, 38, C.ROADC);
  // 门外广场 + 塔前小路
  v.box(0, 0.1, 47, 34, 0.2, 12, C.PAVE);
  v.box(0, 0.1, -35, 8, 0.2, 10, C.PAVE);
}

// ---------- 整场装配 ----------

export function buildScene() {
  const v = new Voxels();
  ground(v);
  courtyardWall(v);
  corridor(v, -27);
  corridor(v, 27);

  hall(v, { x: 0, z: 32, w: 15, d: 7, colH: 5, tiers: 2, doors: 3, backSteps: true, tile: C.TILE_T }); // 山门
  tower(v, { x: -19, z: 19, kind: 'bell' }); // 钟楼
  tower(v, { x: 19, z: 19, kind: 'drum' }); // 鼓楼
  hall(v, { x: -19, z: 2, w: 13, d: 9, colH: 6, gable: true, tile: C.TILE_T }); // 东配殿（歇山）
  hall(v, { x: 19, z: 2, w: 13, d: 9, colH: 6, gable: true, tile: C.TILE_T }); // 西配殿（歇山）
  hall(v, { x: 0, z: -18, w: 25, d: 14, colH: 7, doubleEave: true, doors: 3, tile: C.TILE_Y }); // 主殿（重檐庑殿，黄瓦）

  const pag = pagoda(v, { x: 0, z: -40, stories: 5 }); // 宝塔

  // 石狮：山门前一对、主殿前一对
  lion(v, -6, 41, 1);
  lion(v, 6, 41, 1);
  lion(v, -6, -4, 1);
  lion(v, 6, -4, 1);

  // 华灯：御道两侧 + 广场
  for (const z of [24, 16, 8, 0]) {
    lantern(v, -4, z);
    lantern(v, 4, z);
  }
  lantern(v, -8, 46);
  lantern(v, 8, 46);

  // 松柏行道 + 点缀
  for (const z of [26, 18, 10, 2, -4]) {
    pine(v, -7, z, 1);
    pine(v, 7, z, 1);
  }
  pine(v, -25, -14, 2);
  pine(v, 25, -14, 2);
  pine(v, -25, -22, 1);
  pine(v, 25, -22, 1);
  pine(v, -12, -38, 1);
  pine(v, 12, -38, 1);
  pine(v, -28, 36, 1);
  pine(v, 28, 36, 1);

  const c = new Voxels();
  clouds(c);
  return { voxels: v, clouds: c, pagodaTop: pag };
}
