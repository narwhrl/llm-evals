import * as THREE from 'three';
import { Batch, PALETTE as P } from './voxel.js';
import { pyramidRoof, eaves, pillars } from './parts.js';

// 场地：地面铺装、中轴御道、庭院、围墙、角楼、石狮、香炉、树木与水景。

export const SITE = {
  half: 46,
  wall: 42,
};

export function buildGround() {
  const b = new Batch();
  const h = SITE.half;

  // 草地基底
  b.plate(P.grass, -h, h, 0, -h, h);
  // 草色斑点，避免整片死板
  for (let i = 0; i < 2600; i += 1) {
    const x = ((i * 73) % (h * 2 + 1)) - h;
    const z = ((i * 131) % (h * 2 + 1)) - h;
    const y = 1;
    if (Math.abs(x) <= 3 && z > -40) continue;
    b.add(i % 3 === 0 ? P.grassLight : P.grass, x, y, z);
  }

  // 土路
  b.plate(P.dirt, -4, 4, 1, 36, h);
  b.plate(P.dirt, -h, h, 1, 36, 41);

  // 中轴御道：山门 → 主殿
  for (let z = 12; z <= 40; z += 1) {
    const band = Math.abs(z % 6) < 3;
    b.plate(band ? P.pavingLight : P.paving, -4, 4, 1, z, z);
  }
  // 御道两侧牙石
  for (let z = 12; z <= 40; z += 1) {
    b.add(P.marbleDark, -5, 1, z);
    b.add(P.marbleDark, 5, 1, z);
  }

  // 主殿前的月台铺装
  b.plate(P.paving, -16, 16, 1, -14, 12);
  b.plate(P.pavingDark, -16, 16, 1, -14, -14);
  for (let x = -16; x <= 16; x += 1) {
    b.add(P.marbleDark, x, 1, 12);
  }

  // 两侧配殿前场地
  b.plate(P.pavingDark, 15, 31, 1, -8, 8);
  b.plate(P.pavingDark, -31, -15, 1, -8, 8);

  // 塔院铺装
  b.plate(P.paving, -10, 10, 1, -40, -20);

  // 庭院方砖：交替棋盘格
  for (let x = -14; x <= 14; x += 1) {
    for (let z = 14; z <= 34; z += 1) {
      const checker = (Math.floor((x + 14) / 2) + Math.floor((z - 14) / 2)) % 2 === 0;
      b.add(checker ? P.paving : P.pavingDark, x, 1, z);
    }
  }

  return { batch: b };
}

export function buildWall() {
  const b = new Batch();
  const w = SITE.wall;
  const height = 4;

  // 围墙：红墙灰瓦
  for (let x = -w; x <= w; x += 1) {
    for (const z of [-w, w]) {
      b.fill(P.wallRed, x, x, 1, height, z, z);
      b.add(P.tileGreyDark, x, height + 1, z);
      b.add(P.tileGrey, x, height + 2, z);
    }
  }
  for (let z = -w; z <= w; z += 1) {
    for (const x of [-w, w]) {
      b.fill(P.wallRed, x, x, 1, height, z, z);
      b.add(P.tileGreyDark, x, height + 1, z);
      b.add(P.tileGrey, x, height + 2, z);
    }
  }

  // 墙角与墙帽压顶
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.fill(P.marbleDark, sx * w, sx * w, 1, height + 2, sz * w, sz * w);
    }
  }

  // 四座角楼
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const cx = sx * (w - 2);
      const cz = sz * (w - 2);
      b.shell(P.wallRed, cx - 2, cx + 2, 1, 7, cz - 2, cz + 2);
      b.fill(P.plaster, cx - 1, cx + 1, 2, 6, cz - 1, cz + 1);
      pillars(b, cx - 2, cx + 2, 1, 7, cz - 2, cz + 2, 2);
      eaves(b, cx - 3, cx + 3, 8, cz - 3, cz + 3);
      pyramidRoof(b, {
        cx,
        cz,
        half: 4,
        y: 9,
        color: P.tileGrey,
        dark: P.tileGreyDark,
        finial: P.gold,
      });
    }
  }

  return { batch: b };
}

export function buildProps() {
  const b = new Batch();

  // 石狮一对，守在山门前
  for (const sx of [-1, 1]) {
    const cx = sx * 7;
    const cz = 44;
    b.fill(P.stoneDark, cx - 1, cx + 1, 1, 2, cz - 1, cz + 1);
    b.fill(P.lion, cx - 1, cx + 1, 3, 4, cz - 1, cz + 1);
    b.add(P.lion, cx - 1, 5, cz + 1);
    b.add(P.lion, cx + 1, 5, cz + 1);
    b.add(P.stoneDark, cx, 5, cz + 1);
    b.add(P.lion, cx, 5, cz - 1);
  }

  // 香炉：三层方鼎
  const fx = 0;
  const fz = 16;
  b.fill(P.stoneDark, fx - 2, fx + 2, 1, 1, fz - 2, fz + 2);
  b.fill(P.stone, fx - 2, fx + 2, 2, 3, fz - 2, fz + 2);
  b.fill(P.tileGreyDark, fx - 1, fx + 1, 4, 4, fz - 1, fz + 1);
  b.fill(P.gold, fx, fx, 5, 6, fz, fz);

  // 御道两侧的灯笼柱
  for (const sx of [-1, 1]) {
    for (const z of [20, 26, 32]) {
      const x = sx * 6;
      b.fill(P.woodDark, x, x, 1, 4, z, z);
      b.add(P.gold, x, 5, z);
    }
  }

  // 松树
  const trees = [
    [-24, 20],
    [-28, 26],
    [24, 20],
    [28, 26],
    [-20, -22],
    [20, -22],
    [-34, -34],
    [34, -34],
    [-34, 34],
    [34, 34],
    [-12, 34],
    [12, 34],
  ];
  for (const [tx, tz] of trees) {
    const height = 5 + (Math.abs(tx + tz) % 3);
    b.fill(P.trunk, tx, tx, 1, 2, tz, tz);
    for (let i = 0; i < height; i += 1) {
      const r = Math.max(0, 3 - Math.floor(i / 2));
      for (let dx = -r; dx <= r; dx += 1) {
        for (let dz = -r; dz <= r; dz += 1) {
          if (Math.abs(dx) + Math.abs(dz) > r + 1) continue;
          b.add((dx + dz + i) % 3 === 0 ? P.pineLight : P.pine, tx + dx, 3 + i, tz + dz);
        }
      }
    }
  }

  // 庭院两侧的水池
  for (const sx of [-1, 1]) {
    const cx = sx * 22;
    b.plate(P.water, cx - 4, cx + 4, 1, 12, 18);
    for (let x = cx - 5; x <= cx + 5; x += 1) {
      b.add(P.stoneLight, x, 1, 11);
      b.add(P.stoneLight, x, 1, 19);
    }
  }

  return { batch: b };
}
