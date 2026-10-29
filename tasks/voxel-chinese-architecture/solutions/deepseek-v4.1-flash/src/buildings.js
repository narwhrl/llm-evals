import * as THREE from 'three';
import { Batch, PALETTE as P } from './voxel.js';
import { roof, pyramidRoof, eaves, pillars, latticeWindow, lampMesh } from './parts.js';

// 建筑群全部以“局部坐标 + 平移到世界”的方式构建：
// 每座建筑先在自己的局部坐标里搭，再统一抬升到台基上，
// 这样中轴对称只需让两侧的局部坐标镜像即可。

const lamps = [];

function addLamp(x, y, z, scale = 1) {
  lamps.push({ x, y, z, scale });
}

/* ------------------------------------------------------------------ */
/* 台基与踏步                                                          */
/* ------------------------------------------------------------------ */

function platform(batch, { x0, x1, z0, z1, height, color = P.marble }) {
  // 须弥座：上宽下窄两层，边缘一圈压边石
  batch.fill(P.marbleDark, x0 - 1, x1 + 1, 0, height - 2, z0 - 1, z1 + 1);
  batch.fill(color, x0, x1, height - 1, height - 1, z0, z1);
  batch.fill(color, x0, x1, height, height, z0, z1);
  for (let x = x0; x <= x1; x += 1) {
    batch.add(P.marbleDark, x, height, z0 - 1);
    batch.add(P.marbleDark, x, height, z1 + 1);
  }
  for (let z = z0; z <= z1; z += 1) {
    batch.add(P.marbleDark, x0 - 1, height, z);
    batch.add(P.marbleDark, x1 + 1, height, z);
  }
}

function stairs(batch, { cx, width, fromZ, toZ, topY, color = P.marble }) {
  const half = Math.floor(width / 2);
  const steps = Math.abs(toZ - fromZ);
  for (let i = 0; i <= steps; i += 1) {
    const z = fromZ + Math.sign(toZ - fromZ) * i;
    const y = Math.max(0, topY - Math.floor((i / steps) * topY));
    for (let x = cx - half; x <= cx + half; x += 1) {
      batch.add(color, x, y, z);
      if (y > 0) batch.add(P.marbleDark, x, y - 1, z);
    }
  }
}

/* ------------------------------------------------------------------ */
/* 主殿：重檐庑殿顶                                                     */
/* ------------------------------------------------------------------ */

export function mainHall() {
  const b = new Batch();
  const x0 = -13;
  const x1 = 13;
  const z0 = -9;
  const z1 = 9;
  const base = 3;

  platform(b, { x0: x0 - 2, x1: x1 + 2, z0: z0 - 3, z1: z1 + 3, height: base });
  stairs(b, { cx: 0, width: 11, fromZ: z1 + 9, toZ: z1 + 4, topY: base });

  // 台基上的栏板与望柱
  for (let x = x0 - 2; x <= x1 + 2; x += 1) {
    b.add(P.marble, x, base + 1, z0 - 3);
    b.add(P.marble, x, base + 1, z1 + 3);
    if (x % 4 === 0) {
      b.add(P.marbleLight, x, base + 2, z0 - 3);
      b.add(P.marbleLight, x, base + 2, z1 + 3);
    }
  }

  const floorY = base + 1;

  // 殿身：红墙 + 木柱 + 隔扇门
  b.fill(P.plaster, x0 + 1, x1 - 1, floorY, floorY + 8, z0 + 1, z1 - 1);
  b.shell(P.wallRed, x0, x1, floorY, floorY + 8, z0, z1);
  pillars(b, x0, x1, floorY, floorY + 9, z0, z1, 4);

  // 正面隔扇门与窗
  latticeWindow(b, -10, -2, floorY + 1, floorY + 7, z1 + 1);
  latticeWindow(b, 2, 10, floorY + 1, floorY + 7, z1 + 1);
  b.fill(P.woodDark, -1, 1, floorY, floorY + 7, z1 + 1);
  b.fill(P.gold, 0, 0, floorY + 4, floorY + 4, z1 + 1);
  // 侧面窗
  for (let z = z0 + 2; z <= z1 - 2; z += 5) {
    latticeWindow(b, z, z + 2, floorY + 2, floorY + 6, x0 - 1, { axis: 'z' });
    latticeWindow(b, z, z + 2, floorY + 2, floorY + 6, x1 + 1, { axis: 'z' });
  }

  // 额枋与斗拱层
  eaves(b, x0 - 1, x1 + 1, floorY + 9, z0 - 1, z1 + 1);

  // 下檐
  roof(b, {
    x0: x0 - 4,
    x1: x1 + 4,
    z0: z0 - 4,
    z1: z1 + 4,
    y: floorY + 10,
    layers: 3,
    step: 2,
    color: P.tileGold,
    dark: P.tileGoldDark,
    ridgeColor: P.gold,
    hip: true,
    ridgeAxis: 'x',
  });

  // 上层殿身
  const upperY = floorY + 13;
  b.shell(P.wallRed, x0 - 5, x1 + 5, upperY, upperY + 5, z0 - 5, z1 + 5);
  b.fill(P.plaster, x0 - 4, x1 + 4, upperY + 1, upperY + 4, z0 - 4, z1 - 4);
  pillars(b, x0 - 5, x1 + 5, upperY, upperY + 6, z0 - 5, z1 + 5, 5);
  latticeWindow(b, -7, 7, upperY + 1, upperY + 4, z1 + 6);
  eaves(b, x0 - 6, x1 + 6, upperY + 6, z0 - 6, z1 + 6);

  // 上檐
  roof(b, {
    x0: x0 - 9,
    x1: x1 + 9,
    z0: z0 - 9,
    z1: z1 + 9,
    y: upperY + 7,
    layers: 6,
    step: 2,
    color: P.tileGold,
    dark: P.tileGoldDark,
    ridgeColor: P.gold,
    hip: true,
    ridgeAxis: 'x',
  });

  // 檐下灯笼
  for (const x of [-11, -4, 4, 11]) addLamp(x, floorY + 8.2, z1 + 5.4, 1.5);
  addLamp(-14.4, floorY + 8.2, z1 - 2, 1.2);
  addLamp(14.4, floorY + 8.2, z1 - 2, 1.2);

  return { batch: b, lamps, name: '主殿' };
}

/* ------------------------------------------------------------------ */
/* 配殿：单檐歇山顶，左右镜像                                          */
/* ------------------------------------------------------------------ */

export function sideHall(side = 1) {
  const b = new Batch();
  const s = side;
  const x0 = 18 * s;
  const x1 = 26 * s;
  const z0 = -6;
  const z1 = 6;
  const base = 2;

  platform(b, { x0: Math.min(x0, x1), x1: Math.max(x0, x1), z0: z0 - 2, z1: z1 + 2, height: base });
  stairs(b, { cx: 22 * s, width: 7, fromZ: z1 + 6, toZ: z1 + 3, topY: base });

  const floorY = base + 1;
  b.fill(P.plaster, Math.min(x0, x1) + 1, Math.max(x0, x1) - 1, floorY, floorY + 6, z0 + 1, z1 - 1);
  b.shell(P.wallRed, Math.min(x0, x1), Math.max(x0, x1), floorY, floorY + 6, z0, z1);
  pillars(b, Math.min(x0, x1), Math.max(x0, x1), floorY, floorY + 7, z0, z1, 4);

  latticeWindow(b, Math.min(x0, x1) + 2, Math.max(x0, x1) - 2, floorY + 1, floorY + 5, z1 + 1);
  b.fill(P.woodDark, 22 * s - 1, 22 * s + 1, floorY, floorY + 5, z1 + 1);
  b.fill(P.gold, 22 * s, 22 * s, floorY + 3, floorY + 3, z1 + 1);

  eaves(b, Math.min(x0, x1) - 1, Math.max(x0, x1) + 1, floorY + 7, z0 - 1, z1 + 1);

  // 歇山顶：正脊沿 x 向，两侧山花退进
  roof(b, {
    x0: Math.min(x0, x1) - 3,
    x1: Math.max(x0, x1) + 3,
    z0: z0 - 3,
    z1: z1 + 3,
    y: floorY + 8,
    layers: 4,
    step: 1,
    color: P.tileGreen,
    dark: P.tileGreenDark,
    ridgeColor: P.gold,
    hip: true,
    ridgeAxis: 'x',
  });

  addLamp(22 * s - 3, floorY + 6.4, z1 + 4.4, 1.2);
  addLamp(22 * s + 3, floorY + 6.4, z1 + 4.4, 1.2);

  return { batch: b, lamps, name: side > 0 ? '东配殿' : '西配殿' };
}

/* ------------------------------------------------------------------ */
/* 山门：三开间，单檐歇山                                           */
/* ------------------------------------------------------------------ */

export function mountainGate() {
  const b = new Batch();
  const x0 = -8;
  const x1 = 8;
  const z0 = 30;
  const z1 = 36;
  const base = 2;

  platform(b, { x0, x1, z0, z1, height: base });
  stairs(b, { cx: 0, width: 9, fromZ: z1 + 7, toZ: z1 + 2, topY: base });
  stairs(b, { cx: 0, width: 9, fromZ: z0 - 7, toZ: z0 - 2, topY: base });

  const floorY = base + 1;
  // 三开间：中间为门洞，两侧为墙体
  b.shell(P.wallRed, x0, x1, floorY, floorY + 6, z0, z1);
  b.fill(P.plaster, x0 + 1, x1 - 1, floorY, floorY + 6, z0 + 1, z1 - 1);

  // 门洞：打通中轴
  b.fill(P.black, -3, 3, floorY, floorY + 5, z0, z1);
  for (let y = floorY; y <= floorY + 5; y += 1) {
    for (let z = z0; z <= z1; z += 1) {
      b.add(P.woodDark, -3, y, z);
      b.add(P.woodDark, 3, y, z);
    }
  }
  b.fill(P.woodDark, -3, 3, floorY + 6, floorY + 6, z0, z1);
  b.fill(P.gold, -1, 1, floorY + 6, floorY + 6, z1);

  pillars(b, x0, x1, floorY, floorY + 7, z0, z1, 4);
  // 两侧开间做成窗
  latticeWindow(b, -7, -4, floorY + 1, floorY + 5, z1 + 1);
  latticeWindow(b, 4, 7, floorY + 1, floorY + 5, z1 + 1);

  eaves(b, x0 - 1, x1 + 1, floorY + 7, z0 - 1, z1 + 1);

  roof(b, {
    x0: x0 - 3,
    x1: x1 + 3,
    z0: z0 - 3,
    z1: z1 + 3,
    y: floorY + 8,
    layers: 3,
    step: 1,
    color: P.tileGrey,
    dark: P.tileGreyDark,
    ridgeColor: P.gold,
    hip: true,
    ridgeAxis: 'x',
  });

  addLamp(-5, floorY + 6.4, z1 + 4.4, 1.3);
  addLamp(5, floorY + 6.4, z1 + 4.4, 1.3);

  return { batch: b, lamps, name: '山门' };
}

/* ------------------------------------------------------------------ */
/* 钟楼与鼓楼：方形两层，攒尖顶                                        */
/* ------------------------------------------------------------------ */

export function bellTower(side = 1) {
  const b = new Batch();
  const cx = 15 * side;
  const cz = 22;
  const half = 3;
  const base = 2;

  platform(b, { x0: cx - half, x1: cx + half, z0: cz - half, z1: cz + half, height: base });
  stairs(b, { cx, width: 5, fromZ: cz + half + 5, toZ: cz + half + 1, topY: base });

  const floorY = base + 1;
  // 一层：砖石台身
  b.shell(P.wallRed, cx - half, cx + half, floorY, floorY + 4, cz - half, cz + half);
  b.fill(P.plaster, cx - half + 1, cx + half - 1, floorY, floorY + 4, cz - half + 1, cz + half - 1);
  b.fill(P.woodDark, cx - 1, cx + 1, floorY, floorY + 3, cz + half);
  pillars(b, cx - half, cx + half, floorY, floorY + 4, cz - half, cz + half, 3);

  // 腰檐
  eaves(b, cx - half - 1, cx + half + 1, floorY + 5, cz - half - 1, cz + half + 1);
  roof(b, {
    x0: cx - half - 2,
    x1: cx + half + 2,
    z0: cz - half - 2,
    z1: cz + half + 2,
    y: floorY + 6,
    layers: 2,
    step: 1,
    color: P.tileGreen,
    dark: P.tileGreenDark,
    ridgeColor: P.gold,
    hip: true,
  });

  // 二层：木构敞廊
  const upY = floorY + 8;
  pillars(b, cx - half + 1, cx + half - 1, upY, upY + 3, cz - half + 1, cz + half - 1, 2, P.woodDark);
  b.fill(P.wood, cx - half + 1, cx + half - 1, upY, upY + 1, cz - half + 1, cz + half - 1);
  // 栏杆
  for (let x = cx - half + 1; x <= cx + half - 1; x += 1) {
    b.add(P.wallRed, x, upY + 1, cz + half - 1);
    b.add(P.wallRed, x, upY + 1, cz - half + 1);
  }
  for (let z = cz - half + 1; z <= cz + half - 1; z += 1) {
    b.add(P.wallRed, cx - half + 1, upY + 1, z);
    b.add(P.wallRed, cx + half - 1, upY + 1, z);
  }

  // 钟 / 鼓
  if (side > 0) {
    b.fill(P.gold, cx - 1, cx + 1, upY + 2, upY + 3, cz - 1, cz + 1);
    b.fill(P.tileGoldDark, cx - 1, cx + 1, upY + 4, upY + 4, cz - 1, cz + 1);
  } else {
    b.fill(P.woodDark, cx - 1, cx + 1, upY + 2, upY + 3, cz - 1, cz + 1);
    b.fill(P.lantern, cx - 1, cx + 1, upY + 4, upY + 4, cz - 1, cz + 1);
  }

  // 攒尖顶
  eaves(b, cx - half, cx + half, upY + 5, cz - half, cz + half);
  pyramidRoof(b, {
    cx,
    cz,
    half: half + 2,
    y: upY + 6,
    color: P.tileGrey,
    dark: P.tileGreyDark,
    finial: P.gold,
  });

  addLamp(cx - 2.5, floorY + 4.6, cz + half + 1.6, 1.1);
  addLamp(cx + 2.5, floorY + 4.6, cz + half + 1.6, 1.1);

  return { batch: b, lamps, name: side > 0 ? '钟楼' : '鼓楼' };
}

/* ------------------------------------------------------------------ */
/* 宝塔：七级密檐，攒尖顶                                              */
/* ------------------------------------------------------------------ */

export function pagoda() {
  const b = new Batch();
  const cx = 0;
  const cz = -30;
  const base = 3;

  platform(b, { x0: cx - 6, x1: cx + 6, z0: cz - 6, z1: cz + 6, height: base });
  stairs(b, { cx, width: 7, fromZ: cz + 12, toZ: cz + 7, topY: base });

  let y = base + 1;
  let half = 5;
  for (let level = 0; level < 7; level += 1) {
    const h = level === 0 ? 5 : 3;
    // 塔身
    b.shell(P.wallRed, cx - half, cx + half, y, y + h, cz - half, cz + half);
    b.fill(P.plaster, cx - half + 1, cx + half - 1, y, y + h, cz - half + 1, cz + half - 1);
    // 每层四面开龛
    for (const [dx, dz] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ]) {
      const wx = cx + dx * half;
      const wz = cz + dz * half;
      b.add(P.window, wx, y + 1, wz);
      b.add(P.window, wx, y + 2, wz);
      b.add(P.gold, wx, y + 3, wz);
    }
    // 角柱
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        b.fill(P.woodDark, cx + sx * half, cx + sx * half, y, y + h, cz + sz * half, cz + sz * half);
      }
    }

    y += h + 1;
    // 密檐：每层一圈出檐
    eaves(b, cx - half - 1, cx + half + 1, y, cz - half - 1, cz + half + 1);
    for (let x = cx - half - 2; x <= cx + half + 2; x += 1) {
      for (let z = cz - half - 2; z <= cz + half + 2; z += 1) {
        const edge = Math.abs(x - cx) >= half + 1 || Math.abs(z - cz) >= half + 1;
        if (!edge) continue;
        b.add((x + z) % 2 === 0 ? P.tileGrey : P.tileGreyDark, x, y + 1, z);
        if (Math.abs(x - cx) === half + 2 && Math.abs(z - cz) === half + 2) {
          b.add(P.gold, x, y + 2, z);
        }
      }
    }
    y += 2;
    if (half > 3) half -= 1;
  }

  // 塔刹
  pyramidRoof(b, { cx, cz, half: 4, y, color: P.tileGrey, dark: P.tileGreyDark, finial: P.gold });
  b.fill(P.gold, cx, cx, y + 5, y + 8, cz, cz);
  b.add(P.tileGoldDark, cx, y + 9, cz);

  return { batch: b, lamps, name: '宝塔' };
}
