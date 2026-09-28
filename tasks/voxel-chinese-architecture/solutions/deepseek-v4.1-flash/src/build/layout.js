import { VoxelWorld } from "../core/voxels.js";
import { P } from "../core/palette.js";
import { buildGround } from "./ground.js";
import { buildGate, buildHall } from "./building.js";
import { buildPagoda, buildTower } from "./tower.js";
import {
  buildBanner,
  buildEnclosure,
  buildIncenseBurner,
  buildLion,
  buildPine,
  buildBroadLeaf,
  buildRockery,
  buildScreenWall,
  buildStoneBridge,
  buildStoneLamp,
  buildWell,
} from "./scenery.js";

/** 世界范围固定，便于整套配色与合并策略一次定死。 */
export const WORLD_BOUNDS = { minX: -125, minY: 0, minZ: -168, sizeX: 251, sizeY: 100, sizeZ: 317 };

/** 总平面：中轴为 x = 0，+z 为南（正面）。 */
export const SITE = {
  ground: { minX: -125, maxX: 125, minZ: -168, maxZ: 148 },
  wall: { minX: -118, maxX: 118, minZ: -142, maxZ: 126, height: 7 },
  gate: { cz: 125, w: 41, d: 13 },
  tower: { cx: 48, cz: 96, size: 15 },
  sideHall: { cx: 74, cz: 30, bays: 3, depthBays: 2 },
  mainHall: { cz: -34, bays: 5, depthBays: 3 },
  pagoda: { cz: -104, half: 10, tiers: 5 },
  corridor: { x0: 100, width: 9, z0: -60, z1: 110, skip: [14, 48] },
};

/** 机位锚点：相机预设与剖切检查都用它。 */
export const ANCHORS = {
  bounds: { minX: -125, maxX: 125, minY: 0, maxY: 78, minZ: -168, maxZ: 148 },
  // 建筑群本体（不含外围草地），首屏取景即按它反解距离。
  // 数值取自 buildScene() 实测：地面以上（y≥2）的部分为 x ±119、y 2..78、z -155..147。
  ensemble: { minX: -120, maxX: 120, minY: 0, maxY: 79, minZ: -156, maxZ: 148 },
  center: [0, 16, -8],
  gate: { focus: [0, 16, 118], distance: 96, azimuth: 0.44, elevation: 0.3 },
  mainHall: { focus: [0, 24, -34], distance: 128, azimuth: 0.48, elevation: 0.3 },
  pagoda: { focus: [0, 40, -104], distance: 156, azimuth: 0.62, elevation: 0.38 },
  courtyard: { focus: [0, 8, 62], distance: 150, azimuth: 0.3, elevation: 0.22 },
  axis: { focus: [0, 20, -6], azimuth: 0, elevation: 0.2, fit: "ensemble", margin: 1.05 },
  top: { focus: [0, 12, -6], azimuth: 0.002, elevation: 1.34, fit: "ensemble", margin: 1.03 },
  bird: { focus: [0, 16, -6], azimuth: 0.44, elevation: 0.46, fit: "ensemble", margin: 1.06 },
};

function stageGround(world) {
  const g = SITE.ground;
  buildGround(world, {
    minX: g.minX,
    maxX: g.maxX,
    minZ: g.minZ,
    maxZ: g.maxZ,
    courts: [{ x0: -112, z0: -136, w: 225, d: 257 }],
    lawns: [
      { x0: -125, z0: -168, w: 251, d: 34 },
      { x0: -125, z0: 128, w: 251, d: 21 },
      { x0: -125, z0: -168, w: 13, d: 317 },
      { x0: 112, z0: -168, w: 13, d: 317 },
      { x0: -112, z0: -136, w: 225, d: 30 },
    ],
    roads: [
      // 中轴甬道：山门 → 庭院 → 主殿
      { x0: 0, z0: -10, w: 8, d: 130 },
      // 东西向甬道：通往配殿
      { x0: 9, z0: 50, w: 91, d: 9 },
      // 山门内横路：通往钟鼓楼
      { x0: 9, z0: 109, w: 96, d: 7 },
      // 东侧长路
      { x0: 92, z0: -60, w: 8, d: 176 },
      // 后院甬道：主殿 → 宝塔
      { x0: 0, z0: -90, w: 8, d: 36 },
      { x0: 0, z0: -118, w: 8, d: 28 },
    ],
    lawnSeed: 7,
  });
}

function stageGate(world) {
  buildGate(world, { ...SITE.gate, y0: 2, plinthH: 2, columnH: 9, upturn: 3 });
}

function stageTowers(world) {
  buildTower(world, { cx: SITE.tower.cx, cz: SITE.tower.cz, y0: 2, size: SITE.tower.size, tiers: 2, hasBell: true });
  buildTower(world, { cx: SITE.tower.cx, cz: SITE.tower.cz, y0: 2, size: SITE.tower.size, tiers: 2, hasBell: false });
}

function stageSideHalls(world) {
  buildHall(world, {
    cx: SITE.sideHall.cx,
    cz: SITE.sideHall.cz,
    bays: SITE.sideHall.bays,
    depthBays: SITE.sideHall.depthBays,
    y0: 2,
    plinthH: 3,
    plinthOut: 4,
    columnH: 8,
    eaveOut: 4,
    double: false,
    roofType: "xieshan",
    tileA: P.tileA,
    tileB: P.tileB,
    ridgeBlock: P.tileC,
    eaveBlock: P.tileB,
    upturn: 2,
  });
}

function stageMainHall(world) {
  buildHall(world, {
    cz: SITE.mainHall.cz,
    bays: SITE.mainHall.bays,
    depthBays: SITE.mainHall.depthBays,
    y0: 2,
    plinthH: 4,
    plinthOut: 7,
    columnH: 10,
    eaveOut: 6,
    double: true,
    roofType: "wudian",
    tileA: P.glazedA,
    tileB: P.glazedB,
    ridgeBlock: P.glazedRidge,
    eaveBlock: P.goldDark,
    upturn: 3,
  });
}

function stagePagoda(world) {
  buildPagoda(world, { cz: SITE.pagoda.cz, y0: 2, half: SITE.pagoda.half, tiers: SITE.pagoda.tiers });
}

function stageEnclosure(world) {
  const wall = SITE.wall;
  buildEnclosure(world, { minX: wall.minX, maxX: wall.maxX, minZ: wall.minZ, maxZ: wall.maxZ, y0: 2, height: wall.height, gateHalf: 20 });
  buildCorridor(world, SITE.corridor);
}

/** 廊庑：内侧柱列 + 后墙 + 硬山顶，正脊沿 z 走向，两坡向 ±x 下落。 */
function buildCorridor(world, { x0, width, z0, z1, skip }) {
  const y0 = 2;
  const columnH = 8;
  const columnTop = y0 + columnH;
  const xc = x0 + (width >> 1);
  const outer = x0 + width - 1;
  const halfRoof = (width >> 1) + 2;
  // 柱顶正上方 1 格落在屋面上，屋脊再抬高半个廊宽，形成两坡
  const ridgeY = columnTop + 1 + (width >> 1);
  const len = z1 - z0 + 1;

  for (let z = z0; z <= z1; z++) {
    const inGap = skip && z >= skip[0] && z <= skip[1];
    world.box(x0, y0, z, width, 1, 1, P.pavingB);
    if (inGap) continue;
    world.box(outer - 1, y0 + 1, z, 2, columnH, 1, P.wallRed);
    if (z % 4 === 0) world.box(x0, y0 + 1, z, 1, columnH, 1, P.columnRed);
    else world.box(x0, y0 + 1, z, 1, 2, 1, P.stoneBase);
  }

  // 两坡各由 2 格厚的梯级组成：相邻梯级在同一高度上共面，不会出现只靠棱接触的悬空瓦垄。
  for (let k = 0; k <= halfRoof; k++) {
    const top = ridgeY - k;
    const block = k === halfRoof ? P.tileC : k % 2 === 0 ? P.tileA : P.tileB;
    world.box(xc - k, top - 1, z0, 1, 2, len, block);
    world.box(xc + k, top - 1, z0, 1, 2, len, block);
  }
  world.plate(ridgeY, xc - 1, z0, 3, len, P.glazedRidge);
}

function stageProps(world) {
  // 山门前石狮一对（镜像自动生成西侧）
  buildLion(world, { x: 27, z: 139, dir: 1 });
  // 前院铜鼎香炉
  buildIncenseBurner(world, { x: 0, z: 72 });
  // 山门内照壁
  buildScreenWall(world, { x0: 0, z0: 111, w: 23, h: 8 });
  // 中轴御路两侧石灯与幡杆
  buildStoneLamp(world, { x: 16, z: 100 });
  buildBanner(world, { x: 30, z: 84 });
  // 东南角放生池与石桥（镜像生成西南角）
  const pond = { x0: 62, z0: 58, w: 34, d: 22 };
  world.clearBox(pond.x0, 1, pond.z0, pond.w, 1, pond.d);
  world.box(pond.x0, 0, pond.z0, pond.w, 1, pond.d, P.waterDeep);
  world.ring(pond.x0 - 1, 1, pond.z0 - 1, pond.w + 2, 1, pond.d + 2, 1, P.stoneLight);
  buildStoneBridge(world, { x0: pond.x0 + 14, z0: pond.z0 - 2, w: 6, d: pond.d + 4, y: 2, rise: 2 });
  // 后院陈设
  buildWell(world, { x: 34, z: -74 });
  buildRockery(world, { x: 30, z: -120 });
  // 树木：院外林带与后院
  const trees = [
    [70, 140, 13, 1],
    [104, 120, 11, 2],
    [112, -30, 12, 3],
    [104, -100, 13, 4],
    [60, -150, 12, 5],
    [26, -152, 10, 6],
    [96, 142, 11, 7],
    [40, 143, 12, 8],
  ];
  for (const [x, z, h, seed] of trees) {
    if (seed % 2 === 0) buildBroadLeaf(world, { x, z, h: h - 3, seed });
    else buildPine(world, { x, z, h, seed });
  }
  const pines = [
    [22, -84, 12, 11],
    [84, -70, 11, 13],
    [52, 122, 12, 15],
  ];
  for (const [x, z, h, seed] of pines) buildPine(world, { x, z, h, seed });
}

export function createWorld() {
  return new VoxelWorld(WORLD_BOUNDS);
}

/** 分阶段构建：main.js 逐段执行以更新加载进度，探针则一次性跑完。 */
export function buildStages() {
  return [
    { label: "整备场地 · 铺装与草地", run: stageGround },
    { label: "营造山门 · 三券门与歇山顶", run: stageGate },
    { label: "树立钟鼓楼 · 重檐攒尖", run: stageTowers },
    { label: "营造东西配殿 · 歇山顶", run: stageSideHalls },
    { label: "营造主殿 · 重檐庑殿顶", run: stageMainHall },
    { label: "营造宝塔 · 楼阁式五层", run: stagePagoda },
    { label: "围合院墙与廊庑", run: stageEnclosure },
    { label: "布置陈设 · 石狮灯笼树木", run: stageProps },
  ];
}

export function buildScene() {
  const world = createWorld();
  for (const stage of buildStages()) stage.run(world);
  return { world, anchors: ANCHORS, bounds: WORLD_BOUNDS };
}
