import { PAL } from "./palette.js";
import { placeLantern, placeStoneLion, placeStoneLantern } from "./buildings.js";

export const LAYOUT = {
  ground: { x0: -68, x1: 68, z0: -78, z1: 92 },
  wall: { x0: -44, x1: 44, z0: -50, z1: 48 },
  gate: { cx: 0, cz: 48 },
  mainHall: { cx: 0, cz: -24 },
  sideWest: { cx: -28, cz: -24 },
  sideEast: { cx: 28, cz: -24 },
  bellTower: { cx: -22, cz: 12 },
  drumTower: { cx: 22, cz: 12 },
};

function hash2(x, z) {
  let n = (x * 374761393 + z * 668265263) | 0;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

/** 地面：草地 + 中轴铺装 + 庭院方砖 */
function buildGround(vox) {
  const { x0, x1, z0, z1 } = LAYOUT.ground;
  const wall = LAYOUT.wall;
  for (let x = x0; x <= x1; x += 1) {
    for (let z = z0; z <= z1; z += 1) {
      const inside =
        x >= wall.x0 - 6 && x <= wall.x1 + 6 && z >= wall.z0 - 6 && z <= wall.z1 + 6;
      const h = hash2(x, z);
      let color = h < 0.33 ? PAL.grass : h < 0.66 ? PAL.grassDeep : PAL.grassLight;
      if (!inside) color = h < 0.5 ? PAL.dirt : PAL.grassDeep;
      vox.set(x, -1, z, color);
    }
  }

  // 中轴大道（山门外 → 主殿）
  for (let x = -3; x <= 3; x += 1) {
    for (let z = -12; z <= 56; z += 1) {
      const color = (x + z) % 2 === 0 ? PAL.paving : PAL.pavingDeep;
      vox.set(x, 0, z, color);
    }
  }
  // 御道中心石
  for (let z = -12; z <= 56; z += 3) {
    vox.set(0, 0, z, PAL.stoneWhite);
  }

  // 前院铺装
  vox.fillXZ(-14, 18, 14, 36, 0, PAL.pavingLight);
  for (let x = -14; x <= 14; x += 2) {
    for (let z = 18; z <= 36; z += 2) {
      if (hash2(x, z) > 0.45) vox.set(x, 0, z, PAL.paving);
    }
  }

  // 主殿前庭院
  vox.fillXZ(-18, -14, 18, 2, 0, PAL.pavingLight);
  for (let x = -18; x <= 18; x += 2) {
    for (let z = -14; z <= 2; z += 2) {
      if (hash2(x, z) > 0.5) vox.set(x, 0, z, PAL.paving);
    }
  }

  // 主殿月台前踏跺衔接
  vox.fillXZ(-6, -12, 6, -8, 0, PAL.stoneWhite);
}

/** 围墙 + 垂花门式墙帽 */
function buildWalls(vox) {
  const { x0, x1, z0, z1 } = LAYOUT.wall;
  const yTop = 3;
  for (let x = x0; x <= x1; x += 1) {
    for (let y = 0; y <= yTop; y += 1) {
      vox.set(x, y, z0, PAL.redWall);
      vox.set(x, y, z1, PAL.redWallDeep);
    }
  }
  for (let z = z0; z <= z1; z += 1) {
    for (let y = 0; y <= yTop; y += 1) {
      vox.set(x0, y, z, PAL.redWall);
      vox.set(x1, y, z, PAL.redWallDeep);
    }
  }
  // 墙帽（山门段开口由山门屋顶覆盖）
  vox.ring(x0 - 1, z0 - 1, x1 + 1, z1 + 1, yTop + 1, PAL.tileGrey);
  vox.ring(x0 - 1, z0 - 1, x1 + 1, z1 + 1, yTop + 2, PAL.tileGreyDeep);
  for (let x = -12; x <= 12; x += 1) {
    vox.clear(x, yTop + 1, z1 + 1);
    vox.clear(x, yTop + 2, z1 + 1);
  }

  // 南墙山门处开口：山门体块占位，此处仅留净空
  for (let x = -11; x <= 11; x += 1) {
    for (let y = 0; y <= yTop + 3; y += 1) {
      vox.clear(x, y, z1);
      vox.clear(x, y, z1 - 1);
    }
  }

  // 角部墩台
  for (const [x, z] of [
    [x0, z0],
    [x1, z0],
    [x0, z1],
    [x1, z1],
  ]) {
    vox.fill(x - 1, 0, z - 1, x + 1, yTop + 3, z + 1, PAL.redWallDeep);
    vox.fill(x - 1, yTop + 4, z - 1, x + 1, yTop + 4, z + 1, PAL.tileGrey);
  }
}

/** 树：体素松 / 柏 */
function placePine(vox, x, z, h = 6) {
  vox.fill(x, 0, z, x, h - 2, z, PAL.bark);
  const layers = 3;
  for (let i = 0; i < layers; i += 1) {
    const y = h - 3 + i * 2;
    const r = 3 - i;
    for (let dx = -r; dx <= r; dx += 1) {
      for (let dz = -r; dz <= r; dz += 1) {
        if (Math.abs(dx) + Math.abs(dz) > r + 1) continue;
        const color = (dx + dz) % 2 === 0 ? PAL.leaf : PAL.leafDeep;
        vox.set(x + dx, y, z + dz, color);
        if (Math.abs(dx) + Math.abs(dz) <= r - 1) {
          vox.set(x + dx, y + 1, z + dz, PAL.leafLight);
        }
      }
    }
  }
  vox.set(x, h + 3, z, PAL.leafDeep);
}

/** 香炉 */
function placeIncenseBurner(vox, x, z, yBase = 0) {
  vox.fill(x - 1, yBase, z - 1, x + 1, yBase + 1, z + 1, PAL.stoneDeep);
  vox.fill(x - 1, yBase + 2, z - 1, x + 1, yBase + 3, z + 1, PAL.incense);
  vox.set(x - 2, yBase + 3, z, PAL.incense);
  vox.set(x + 2, yBase + 3, z, PAL.incense);
  vox.set(x, yBase + 4, z, PAL.smoke);
  vox.set(x, yBase + 5, z, PAL.smoke);
}

/** 组装整个场地 */
export function buildCompound(vox) {
  buildGround(vox);
  buildWalls(vox);

  // 山门前石狮
  placeStoneLion(vox, -8, 56, 0, 1);
  placeStoneLion(vox, 8, 56, 0, 1);

  // 庭院香炉
  placeIncenseBurner(vox, 0, -6);

  // 灯柱（柱身与悬灯分离）
  for (const x of [-10, 10]) {
    for (const z of [16, 4]) {
      vox.fill(x, 0, z, x, 5, z, PAL.woodDark);
      vox.fill(x - 1, 5, z, x + 1, 5, z, PAL.woodBeam);
      placeLantern(vox, x, 6, z - 1);
    }
  }

  // 主殿檐下灯笼
  for (const x of [-12, -6, 6, 12]) {
    placeLantern(vox, x, 12, -12);
  }
  // 山门檐下灯笼
  for (const x of [-8, 8]) {
    placeLantern(vox, x, 11, 53);
  }

  // 石灯
  placeStoneLantern(vox, -20, -6, 0);
  placeStoneLantern(vox, 20, -6, 0);
  placeStoneLantern(vox, -20, 20, 0);
  placeStoneLantern(vox, 20, 20, 0);

  // 松柏
  placePine(vox, -36, 30, 7);
  placePine(vox, 36, 30, 6);
  placePine(vox, -36, -4, 8);
  placePine(vox, 36, -4, 7);
  placePine(vox, -36, -40, 6);
  placePine(vox, 36, -40, 8);
  placePine(vox, -14, -44, 5);
  placePine(vox, 14, -44, 5);

  // 配殿前小径
  for (let z = -28; z <= -20; z += 1) {
    vox.set(-20, 0, z, PAL.paving);
    vox.set(20, 0, z, PAL.paving);
    vox.set(-21, 0, z, PAL.pavingDeep);
    vox.set(21, 0, z, PAL.pavingDeep);
  }
}
