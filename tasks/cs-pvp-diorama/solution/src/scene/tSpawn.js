// T 阵营出生点（北侧卸货区）：带刺铁丝网围合的出生区、破旧厢式货车、三层海运集装箱堆、
// 通往中路的缓坡通道、油桶与货运托盘堆、西北角堆场。北 = -Z，东 = +X，地面 y = 0。
import { LAYOUT } from './layout.js';

const T = LAYOUT.tSpawn;

// ---- 本区域局部常量（LAYOUT 未给出的尺寸集中在此，便于核对） ----
const FENCE_H = 2.0;                       // 铁丝网净高（fencePost 原型高 1.9，靠缩放补齐）
const POST_SCALE = FENCE_H / 1.9;
const FENCE_WEST_X = -18.7;
const FENCE_EAST_X = 8.0;
const FENCE_POST_STEP = 2.6;
const YARD_FENCE_H = 1.8;
const YARD_POST_SCALE = YARD_FENCE_H / 1.9;
const YARD_FENCE_Z = -23.0;
const YARD_GAP = { minX: -24.2, maxX: -21.7 };   // 堆场围栏上 2.5 宽的通道缺口
const WALL_X = -18.85;                     // 出生区西侧封堵墙：铁丝网西端与堆场围栏都接在这道量体上
const WALL_Z = -22.6;
const WALL_LENGTH = 3.7;
const WALL_H = 2.7;
const DOCK = { minX: -2, maxX: 2, minZ: -28.6, maxZ: -24.2, top: 0.6 };
const TRUCK_BODY = { length: 4.2, width: 2.4, floorY: 0.3, cabLength: 1.95 };
const RAMP = T.ramp;
const RAMP_LENGTH = RAMP.toZ - RAMP.fromZ;
const RAMP_ANGLE = Math.atan2(RAMP.height, RAMP_LENGTH);
const RAMP_CX = (RAMP.minX + RAMP.maxX) / 2;
const RAMP_W = RAMP.maxX - RAMP.minX;
const RAMP_WALL_X = [RAMP.minX + RAMP.wallThickness / 2, RAMP.maxX - RAMP.wallThickness / 2];
const RAMP_WALL_H = 1.0;                   // 护墙高出坡面
const RAMP_DECK_WIDTH = 7.3;               // 坡面板略窄于通道净宽，板边塞进护墙内避免共面闪烁
const RAMP_DECK_LIFT = 0.07;               // 板中心线抬升量，保证板底不低于 y = 0
const RAMP_SLICES = 64;

// 坡面标高：北端 fromZ 为 0，南端 toZ 为 height。
const deckY = (z) => (RAMP.height * (z - RAMP.fromZ)) / RAMP_LENGTH;
// 坡面板顶面标高（板厚 0.12 由 ramp() 固定）。
const deckTop = (z) => deckY(z) + RAMP_DECK_LIFT + 0.0635;

// 沿坡面的一段护墙：底边贴坡面线、顶边与坡面平行（局部 +Z 指向坡道南端）。
// box 的局部原点在底面中点，因此按段落中点摆放。
function slopeWall(builder, x, zA, zB, height) {
  const midZ = (zA + zB) / 2;
  builder.box(RAMP.wallThickness, height, (zB - zA) / Math.cos(RAMP_ANGLE), x, deckY(midZ), midZ, {
    rotX: -RAMP_ANGLE,
    anchor: 'bottom',
  });
}

// 一跨铁丝网：横向网丝 + 竖向网丝 + 一道斜撑，全部并进同一批静态几何。
function fenceBay(mesh, xa, xb, z, height) {
  const width = xb - xa;
  const centerX = (xa + xb) / 2;
  for (let row = 0; row < 5; row += 1) {
    mesh.box(width, 0.028, 0.028, centerX, 0.28 + row * 0.4, z, { anchor: 'center' });
  }
  for (let x = xa; x <= xb + 0.001; x += 0.33) {
    mesh.box(0.024, height - 0.2, 0.024, x, 0.1, z);
  }
  const rise = height - 0.4;
  mesh.box(Math.hypot(width, rise), 0.04, 0.04, centerX, height / 2, z, {
    anchor: 'center',
    rotZ: Math.atan2(rise, width),
  });
}

export function buildTSpawn(ctx) {
  ctx.region('tSpawn');
  buildFence(ctx);
  buildTruck(ctx);
  buildContainerStacks(ctx);
  buildDock(ctx);
  buildRamp(ctx);
  buildSpawnClutter(ctx);
  buildWestYard(ctx);
  buildDecals(ctx);
  buildAtmosphere(ctx);
}

// ---- 1. 带刺铁丝网围出的封闭出生区 -----------------------------------------
function buildFence(ctx) {
  const z = T.fenceZ;
  const gateMinX = T.gate.centerX - T.gate.width / 2;
  const gateMaxX = T.gate.centerX + T.gate.width / 2;

  const posts = [];
  for (let x = FENCE_WEST_X; x <= FENCE_EAST_X + 0.01; x += FENCE_POST_STEP) {
    if (x > gateMinX + 0.05 && x < gateMaxX - 0.05) continue;   // 门洞处不立柱
    posts.push(x);
  }
  posts.push(FENCE_EAST_X);                                     // 东端收口
  for (const x of posts) {
    ctx.prop('fencePost', x, 0, z, { scale: POST_SCALE, wet: true });
  }

  const mesh = ctx.mb('wire');
  const metal = ctx.mb('rustMetal');
  for (let i = 1; i < posts.length; i += 1) {
    const xa = posts[i - 1];
    const xb = posts[i];
    if (xb - xa > FENCE_POST_STEP + 0.2) continue;              // 跨过门洞，不挂网片
    fenceBay(mesh, xa, xb, z, FENCE_H);
    metal.box(xb - xa, 0.07, 0.07, (xa + xb) / 2, 1.96, z, { anchor: 'center' });
  }
  // 门洞两侧加粗立柱（含合页板：大门已被拆走）
  for (const gx of [gateMinX, gateMaxX]) {
    metal.box(0.24, 2.5, 0.24, gx, 0, z);
    metal.box(0.44, 0.08, 0.44, gx, 0, z);
    metal.box(0.09, 0.34, 0.3, gx, 0.5, z - 0.22);
    metal.box(0.09, 0.34, 0.3, gx, 1.32, z - 0.22);
  }
  mesh.finish();
  metal.finish();

  // 顶部蛇腹形刺铁丝：立起来的圈沿网片走向排开
  for (let x = FENCE_WEST_X + 0.33; x <= FENCE_EAST_X - 0.1; x += 0.66) {
    if (x > gateMinX - 0.3 && x < gateMaxX + 0.3) continue;
    ctx.prop('barbedCoil', x, 2.04, z, {
      rotZ: Math.PI / 2,
      rotY: ctx.rng.range(-0.25, 0.25),
      wet: true,
    });
  }
  // 门旁散落的刺铁丝圈
  for (const [x, dz] of [[-5.0, -0.7], [-4.3, -1.3], [0.5, -0.6], [1.3, -1.2]]) {
    ctx.prop('barbedCoil', x, 0, z + dz, { rotY: ctx.rng.range(0, Math.PI * 2), wet: true });
  }
}

// ---- 2. 破旧厢式货运卡车（左侧掩体） ---------------------------------------
function buildTruck(ctx) {
  const x = T.truck.x;
  const zc = T.truck.z;
  const frontZ = zc - TRUCK_BODY.length / 2;    // -28.3，车厢前端（接驾驶室）
  const floorY = TRUCK_BODY.floorY;

  // 车厢：长轴转到 Z 轴，原型 +X 端（车头端）朝北
  ctx.prop('containerTruckBody', x, floorY, zc, { rotY: Math.PI / 2, wet: true });

  // 车底阴影薄板：车身抬高后压住地面，避免悬空感
  const shadow = ctx.mb('concreteDark', { castShadow: false });
  shadow.box(TRUCK_BODY.width + 0.5, 0.03, TRUCK_BODY.length + 2.3, x, 0, zc - 0.6);
  shadow.finish();

  // 驾驶室：后端面对齐 T.truck.cabZ，车头朝北
  const cabBackZ = T.truck.cabZ;
  const cabFrontZ = cabBackZ - TRUCK_BODY.cabLength;
  const cabMidZ = (cabBackZ + cabFrontZ) / 2;
  const cab = ctx.mb('paintedMetalGray');
  cab.box(2.34, 1.7, TRUCK_BODY.cabLength, x, floorY, cabMidZ);
  cab.box(2.26, 0.12, 1.75, x, floorY + 1.7, cabMidZ + 0.05);
  cab.box(2.1, 0.42, 0.85, x, floorY + 1.7, cabBackZ - 0.42);            // 顶部导流罩
  cab.box(2.44, 0.34, 0.28, x, 0.24, cabFrontZ - 0.1);                    // 前保险杠
  cab.box(1.36, 0.12, 0.14, x, floorY + 1.02, cabFrontZ - 0.02);          // 雨檐
  cab.box(2.5, 0.5, 0.5, x, 0.4, frontZ + 0.05);                          // 与车厢之间的连接梁
  for (const sx of [-1, 1]) {
    cab.box(0.1, 0.1, 0.42, x + sx * 1.32, floorY + 1.5, cabFrontZ + 0.35);
    cab.box(0.12, 0.36, 0.08, x + sx * 1.5, floorY + 1.28, cabFrontZ + 0.5);   // 后视镜
  }
  cab.finish();

  const metal = ctx.mb('rustMetal');
  metal.box(1.3, 0.5, 0.08, x, floorY + 0.68, cabFrontZ - 0.02);          // 进气格栅
  metal.box(0.72, 0.2, 0.06, x, floorY + 1.34, cabFrontZ - 0.03);         // 车标板
  metal.cyl(0.085, 0.085, 2.55, 8, x + 1.05, floorY, cabBackZ + 0.05);    // 排气管
  metal.cyl(0.13, 0.13, 0.1, 8, x + 1.05, floorY + 2.55, cabBackZ + 0.05);
  metal.cyl(0.28, 0.28, 1.0, 10, x - 1.35, 0.62, -27.4, { rotX: Math.PI / 2 });   // 油箱
  metal.box(2.0, 0.1, 0.5, x, floorY - 0.06, cabMidZ);                    // 踏板
  metal.box(0.02, 1.1, 1.5, x + 1.19, 0.95, -27.9);                       // 锈斑补板
  metal.box(0.02, 0.7, 1.1, x + 1.19, 0.62, -24.9);
  metal.box(0.16, 0.9, 0.14, x - 1.22, 0.55, cabFrontZ + 0.42);           // 登车扶手
  metal.finish();

  // 驾驶室玻璃与车灯
  const glass = ctx.mb('glassDirty');
  glass.panel(2.0, 0.95, x, floorY + 0.72, cabFrontZ - 0.01, { rotY: Math.PI });
  glass.panel(1.3, 0.78, x - 1.18, floorY + 0.72, cabMidZ, { rotY: -Math.PI / 2 });
  glass.panel(1.3, 0.78, x + 1.18, floorY + 0.72, cabMidZ, { rotY: Math.PI / 2 });
  glass.finish();

  const lamps = ctx.mb('lampOff');
  lamps.box(0.3, 0.22, 0.08, x - 0.85, floorY + 0.85, cabFrontZ - 0.03);
  lamps.box(0.3, 0.22, 0.08, x + 0.85, floorY + 0.85, cabFrontZ - 0.03);
  lamps.box(0.1, 0.08, 0.05, x - 1.0, floorY + 1.72, cabFrontZ - 0.02);
  lamps.box(0.1, 0.08, 0.05, x + 1.0, floorY + 1.72, cabFrontZ - 0.02);
  lamps.finish({ castShadow: false, receiveShadow: false });

  // 轮胎：前轴一对，后轴双联两对
  for (const sx of [-1, 1]) {
    ctx.prop('tire', x + sx * 1.32, 0, -29.3, { rotY: Math.PI / 2, wet: true });
    ctx.prop('tire', x + sx * 1.32, 0, -25.15, { rotY: Math.PI / 2, wet: true });
    ctx.prop('tire', x + sx * 1.32, 0, -25.8, { rotY: Math.PI / 2, wet: true });
  }

  // 车厢侧面斜靠的木梯：梯脚在地面，梯顶搭在车厢东侧板上
  ctx.prop('ladderWood', -11.15, 0, T.ladder.z, { rotY: -Math.PI / 2, wet: true });
}

// ---- 3. 右侧三层堆叠海运集装箱 ---------------------------------------------
function buildContainerStacks(ctx) {
  const levelHeight = LAYOUT.scale.containerHeight;
  const palette = ['container', 'containerBlue', 'containerGreen'];
  const [lower, upper] = T.containerStacks;

  T.containerStacks.forEach((stack, si) => {
    for (let level = 0; level < stack.levels; level += 1) {
      ctx.prop(palette[(si + level) % palette.length], stack.x, level * levelHeight, stack.z, {
        rotY: Math.PI / 2,
        wet: true,
      });
    }
  });

  // 架枪位细节：顶层木箱、油桶与沙袋
  const lowerTop = lower.levels * levelHeight;
  ctx.prop('woodCrate', lower.x + 0.5, lowerTop, lower.z + 1.5, { rotY: 0.3, wet: true });
  ctx.prop('barrelRust', lower.x - 0.6, lowerTop, lower.z - 1.8, { wet: true });
  ctx.prop('sandbag', lower.x - 0.5, lowerTop, lower.z + 2.55, { rotY: 0.4, wet: true });
  ctx.prop('sandbag', lower.x + 0.35, lowerTop, lower.z + 2.6, { rotY: -0.25, wet: true });

  const upperTop = upper.levels * levelHeight;
  ctx.prop('woodCrate', upper.x - 0.4, upperTop, upper.z + 1.2, { rotY: -0.2, wet: true });
  ctx.prop('woodCrate', upper.x + 0.35, upperTop, upper.z - 0.9, { rotY: 0.5, wet: true });

  // 两摞之间的单人缝隙：地面铺一块锈格栅
  ctx.prop('gratePanel', (T.gap.fromX + T.gap.toX) / 2, 0, T.gap.z, { wet: true });

  // 箱脚旁的零散物
  ctx.prop('pallet', T.gap.fromX - 1.2, 0, -22.6, { rotY: 0.4, wet: true });
  ctx.prop('trafficCone', 4.8, 0, -22.6, { wet: true });
}

// ---- 4. 正前方缓坡通道与破损洞口 -------------------------------------------
function buildRamp(ctx) {
  // 坡道实体：阶梯状混凝土基座 + 平滑坡面板
  const mass = ctx.mb('concrete');
  for (let i = 0; i < RAMP_SLICES; i += 1) {
    const z0 = RAMP.fromZ + (RAMP_LENGTH * i) / RAMP_SLICES;
    const z1 = RAMP.fromZ + (RAMP_LENGTH * (i + 1)) / RAMP_SLICES;
    const top = deckY(z0);
    if (top <= 0.03) continue;
    mass.box(RAMP_W, top, z1 - z0 + 0.01, RAMP_CX, 0, (z0 + z1) / 2);
  }
  mass.box(RAMP_W, RAMP.height, 0.4, RAMP_CX, 0, RAMP.toZ - 0.2);              // 南端封头
  for (let i = 0; i < 3; i += 1) {                                            // 北端起步台阶
    mass.box(RAMP_W, 0.045 + i * 0.045, 0.12, RAMP_CX, 0, RAMP.fromZ - 0.3 + i * 0.12);
  }
  mass.finish();

  const deck = ctx.mb('concreteFloor');
  deck.ramp(
    RAMP_DECK_WIDTH,
    RAMP_CX, deckY(RAMP.fromZ) + RAMP_DECK_LIFT, RAMP.fromZ,
    RAMP_CX, deckY(RAMP.toZ) + RAMP_DECK_LIFT, RAMP.toZ,
  );
  deck.finish();

  // 防滑条
  const plate = ctx.mb('checkeredPlate');
  for (let z = RAMP.fromZ + 0.7; z < RAMP.toZ - 0.4; z += 0.9) {
    plate.box(6.9, 0.05, 0.34, RAMP_CX, deckTop(z) - 0.05, z, {
      rotX: -RAMP_ANGLE,
      anchor: 'bottom',
    });
  }
  plate.finish();

  // 两侧护墙：西墙留 rampHole 破损洞口（1.4 宽，洞口下沿取 y = 0.8）
  const holeMinZ = T.rampHole.z - T.rampHole.width / 2;
  const holeMaxZ = T.rampHole.z + T.rampHole.width / 2;
  const walls = ctx.mb('concreteWall');
  slopeWall(walls, RAMP_WALL_X[0], RAMP.fromZ, holeMinZ, RAMP_WALL_H);
  slopeWall(walls, RAMP_WALL_X[0], holeMinZ, holeMaxZ, T.rampHole.from - deckY(holeMinZ));
  slopeWall(walls, RAMP_WALL_X[0], holeMaxZ, RAMP.toZ, RAMP_WALL_H);
  slopeWall(walls, RAMP_WALL_X[1], RAMP.fromZ, RAMP.toZ, RAMP_WALL_H);
  // 北端封头，压住护墙的斜切口
  for (const wx of RAMP_WALL_X) {
    walls.box(RAMP.wallThickness, RAMP_WALL_H, 0.36, wx, 0, RAMP.fromZ - 0.16);
  }
  walls.finish();

  // 破损洞口露出的钢筋
  const bars = ctx.mb('rustMetal');
  bars.box(0.5, 0.045, 0.045, RAMP_WALL_X[0] - 0.25, 0.98, -18.9, { rotZ: 0.35, anchor: 'center' });
  bars.box(0.46, 0.04, 0.04, RAMP_WALL_X[0] - 0.2, 1.22, -18.05, { rotZ: -0.2, anchor: 'center' });
  bars.finish();
}

// ---- 5/6. 卸货月台、油桶堆与卸货区散件 -------------------------------------
function buildDock(ctx) {
  const cx = (DOCK.minX + DOCK.maxX) / 2;
  const cz = (DOCK.minZ + DOCK.maxZ) / 2;
  const w = DOCK.maxX - DOCK.minX;
  const d = DOCK.maxZ - DOCK.minZ;

  const body = ctx.mb('concrete');
  body.box(w, DOCK.top - 0.06, d, cx, 0, cz);
  body.box(1.6, 0.4, 0.28, 1.0, 0, DOCK.maxZ + 0.14);      // 南侧踏步
  body.box(1.6, 0.2, 0.28, 1.0, 0, DOCK.maxZ + 0.42);
  body.finish();

  const deck = ctx.mb('checkeredPlate');
  deck.box(w, 0.06, d, cx, DOCK.top - 0.06, cz);
  deck.box(w + 0.06, 0.12, 0.1, cx, DOCK.top - 0.1, DOCK.maxZ + 0.05);
  deck.finish();

  // 月台设备与台面通风管
  ctx.prop('ventPipe', 0.9, DOCK.top, -28.0, { rotY: 0.2, wet: true });
  ctx.prop('ventPipe', -1.1, DOCK.top, -27.2, { rotY: -0.3, wet: true });

  // 月台西侧的垃圾角
  ctx.prop('dumpster', -3.3, 0, -27.4, { rotY: Math.PI / 2, wet: true });
  ctx.prop('trashCan', -2.7, 0, -25.6, { wet: true });
  ctx.prop('trashCan', -3.5, 0, -24.9, { rotY: 0.6, wet: true });
  ctx.prop('tire', -2.35, 0, -24.6, { rotY: Math.PI / 2, wet: true });
  ctx.prop('tire', 2.5, 0, -22.3, { rotY: Math.PI / 2, wet: true });
  ctx.prop('tireStack', -2.6, 0, -23.4, { wet: true });

  // 月台前的散件
  ctx.prop('cardboardBox', -5.6, 0, -22.4, { rotY: 0.3, wet: true });
  ctx.prop('cardboardBoxSmall', -5.55, 0.5, -22.4, { rotY: 0.8 });
  ctx.prop('cardboardBox', -6.0, 0, -24.1, { rotY: -0.5, wet: true });
  ctx.prop('plank', -4.8, 0, -25.4, { rotY: 0.9, wet: true });
  ctx.prop('plank', -5.6, 0, -26.6, { rotY: 1.25, wet: true });
  ctx.prop('paintBucket', -4.3, 0, -22.7, { wet: true });
  ctx.prop('paintBucket', -4.7, 0, -23.0, { wet: true });
  ctx.prop('woodCrate', 1.9, 0, -22.8, { rotY: -0.35, wet: true });
}

function buildSpawnClutter(ctx) {
  // 斜坡旁四连装油桶堆（2 × 2）
  const bx = T.barrelCluster.x;
  const bz = T.barrelCluster.z;
  const barrels = [[-0.33, -0.33, 'barrelBlue'], [0.33, -0.33, 'barrelRust'],
    [-0.33, 0.33, 'barrelRust'], [0.33, 0.33, 'barrelBlue']];
  for (const [dx, dz, type] of barrels) {
    ctx.prop(type, bx + dx, 0, bz + dz, { rotY: ctx.rng.range(0, Math.PI * 2), wet: true });
  }
  ctx.prop('barrelOpen', -10.2, 0, -21.9, { rotY: 0.7, wet: true });
  ctx.prop('barrelFallen', -8.5, 0, -23.9, { rotY: 1.1, wet: true });

  // 木质货运托盘 + 木箱 + 麻袋
  ctx.prop('pallet', -7.2, 0, -23.4, { rotY: 0.25, wet: true });
  ctx.prop('pallet', -7.14, 0.15, -23.36, { rotY: -0.15, wet: true });
  ctx.prop('woodCrate', -7.1, 0.3, -23.35, { rotY: 0.4, wet: true });
  ctx.prop('woodCrateLong', -9.1, 0, -25.2, { rotY: 1.2, wet: true });
  ctx.prop('sack', -6.3, 0, -22.3, { rotY: 1.2, wet: true });
  ctx.prop('sack', -7.6, 0, -24.6, { rotY: -0.4, wet: true });
  ctx.prop('sack', -8.0, 0, -26.4, { rotY: 0.5, wet: true });
  ctx.prop('bucket', -7.6, 0, -22.15, { rotY: 0.2, wet: true });

  // 出生点中央的零星散件
  ctx.prop('cardboardBox', -6.5, 0, -25.9, { rotY: 1.1, wet: true });
  ctx.prop('paintBucket', -7.0, 0, -26.9, { wet: true });
  ctx.prop('tire', -10.4, 0, -24.2, { rotY: Math.PI / 2, wet: true });
  ctx.prop('tireStack', -10.4, 0, -23.1, { wet: true });
  ctx.prop('trafficCone', -5.9, 0, -21.7, { wet: true });

  // 门洞旁的沙袋掩体
  ctx.prop('sandbag', -1.6, 0, -22.6, { rotY: 0.2, wet: true });
  ctx.prop('sandbag', -2.2, 0, -22.2, { rotY: -0.3, wet: true });
  ctx.prop('sandbag', -1.9, 0.12, -22.4, { rotY: 0.6, wet: true });
}

// ---- 7. 西北角堆场 ----------------------------------------------------------
function buildWestYard(ctx) {
  const yard = T.westYard;

  // 出生区西侧封堵墙：铁丝网西端与堆场围栏都接在这道量体上
  ctx.wall({
    x: WALL_X,
    z: WALL_Z,
    length: WALL_LENGTH,
    height: WALL_H,
    thickness: 0.3,
    rotY: Math.PI / 2,
    material: 'concreteWall',
    anchor: 'center',
  });

  // 堆场南侧 1.8 高铁丝围栏，中间留 2.5 宽通道缺口
  const xPosts = [];
  for (let x = yard.minX; x <= -19.1; x += FENCE_POST_STEP) {
    if (x > YARD_GAP.minX - 0.05 && x < YARD_GAP.maxX + 0.05) continue;
    xPosts.push(x);
  }
  xPosts.push(YARD_GAP.minX, YARD_GAP.maxX, -19.0);   // 缺口边界 + 西墙处收口
  xPosts.sort((a, b) => a - b);
  for (const x of xPosts) {
    ctx.prop('fencePost', x, 0, YARD_FENCE_Z, { scale: YARD_POST_SCALE, wet: true });
  }

  const mesh = ctx.mb('wire');
  const metal = ctx.mb('rustMetal');
  for (let i = 1; i < xPosts.length; i += 1) {
    const xa = xPosts[i - 1];
    const xb = xPosts[i];
    if (xa >= YARD_GAP.minX - 0.01 && xb <= YARD_GAP.maxX + 0.01) continue;   // 通道缺口
    fenceBay(mesh, xa, xb, YARD_FENCE_Z, YARD_FENCE_H);
    metal.box(xb - xa, 0.06, 0.06, (xa + xb) / 2, 1.76, YARD_FENCE_Z, { anchor: 'center' });
  }
  mesh.finish();
  metal.finish();

  for (let x = yard.minX + 0.3; x <= -19.4; x += 0.66) {
    if (x > YARD_GAP.minX - 0.3 && x < YARD_GAP.maxX + 0.3) continue;
    ctx.prop('barbedCoil', x, 1.84, YARD_FENCE_Z, {
      rotZ: Math.PI / 2,
      rotY: ctx.rng.range(-0.25, 0.25),
      wet: true,
    });
  }

  // 平放的绿色集装箱 + 管束 + 电缆盘 + 木箱堆 + 油桶 + 路牌
  ctx.prop('containerGreen', -27.4, 0, -28.2, { wet: true });
  ctx.prop('pipeStack', -21.6, 0, -29.2, { rotY: 0.12, wet: true });
  ctx.prop('pipeStack', -25.4, 0, -24.1, { rotY: -0.25, wet: true });
  ctx.prop('cableSpool', -20.4, 0, -27.6, { rotY: 0.4, wet: true });
  ctx.prop('cableSpool', -19.8, 0, -26.4, { rotY: -0.3, wet: true });
  ctx.prop('woodCrate', -22.15, 0, -25.6, { rotY: 0.15, wet: true });
  ctx.prop('woodCrate', -22.95, 0, -25.6, { rotY: -0.2, wet: true });
  ctx.prop('woodCrate', -22.55, 0.75, -25.6, { rotY: 0.55, wet: true });
  ctx.prop('woodCrateTall', -21.3, 0, -24.9, { rotY: -0.5, wet: true });
  ctx.prop('barrelRust', -30.2, 0, -24.6, { wet: true });
  ctx.prop('barrelBlue', -29.6, 0, -25.4, { wet: true });
  ctx.prop('roadSign', -20.0, 0, -24.6, { rotY: -0.5, wet: true });
  ctx.prop('gratePanel', -23.6, 0, -24.6, { rotY: 0.2, wet: true });
}

// ---- 8. 涂鸦、货运编号与弹孔 -----------------------------------------------
function buildDecals(ctx) {
  const [lower, upper] = T.containerStacks;
  const onFace = (x, y, z, rotY, type, w, h) => {
    ctx.decal(type, x, y, z, { rotX: 0, rotY, rotZ: 0, w, h });
  };

  // 涂鸦：集装箱端面、卡车厢体、月台立面、封堵墙、坡道护墙、堆场集装箱
  onFace(lower.x + 0.1, 1.5, lower.z + 3.04, 0, 'graffiti', 2.0, 1.5);
  onFace(T.truck.x + 1.22, 1.45, -27.3, Math.PI / 2, 'graffiti', 1.9, 1.3);
  onFace(DOCK.minX - 0.02, 0.33, -26.2, -Math.PI / 2, 'graffiti', 2.6, 0.42);
  onFace(WALL_X + 0.17, 1.6, -22.4, Math.PI / 2, 'graffiti', 1.6, 1.2);
  onFace(RAMP_WALL_X[1] - 0.26, 1.5, -17.2, -Math.PI / 2, 'graffiti', 1.5, 0.9);
  onFace(-27.4, 1.5, -26.96, 0, 'graffiti', 2.2, 1.1);

  // 货运编号
  onFace(lower.x - 1.24, 1.45, lower.z - 0.6, -Math.PI / 2, 'freight', 1.7, 0.85);
  onFace(upper.x + 0.2, 1.35, upper.z + 3.04, 0, 'freight', 1.5, 0.75);
  onFace(T.truck.x, 1.3, -24.07, 0, 'freight', 1.8, 0.9);
  onFace(-27.4, 1.3, -26.96, 0, 'freight', 1.4, 0.7);

  // 弹孔簇
  onFace(lower.x + 1.0, 1.9, lower.z + 3.05, 0, 'bullets', 1.1, 1.1);
  onFace(T.truck.x + 1.22, 1.1, -24.3, Math.PI / 2, 'bullets', 0.9, 0.9);
  onFace(DOCK.minX - 0.02, 0.3, -24.9, -Math.PI / 2, 'bullets', 0.8, 0.36);

  // 地面弹痕铺
  ctx.decal('bullets', -6.8, 0.02, -26.2, {
    rotX: -Math.PI / 2,
    rotY: 0.6,
    w: 2.8,
    h: 2.8,
    opacity: 0.9,
  });
}

// ---- 9/10. 灯光、滴水与白汽 -------------------------------------------------
function buildAtmosphere(ctx) {
  const [lower, upper] = T.containerStacks;

  // 唯一一盏真实光源：集装箱堆旁的冷白路灯
  const lampX = 2.3;
  const lampZ = -23.4;
  const headX = lampX - 0.5;
  const pole = ctx.mb('darkMetal');
  pole.cyl(0.06, 0.075, 4.2, 8, lampX, 0, lampZ);
  pole.cyl(0.22, 0.26, 0.12, 10, lampX, 0, lampZ);
  pole.box(0.52, 0.09, 0.09, lampX - 0.26, 4.08, lampZ);
  pole.finish();
  const shade = ctx.mb('lampCool');
  shade.cyl(0.34, 0.1, 0.22, 12, headX, 3.98, lampZ);
  shade.sphere(0.11, headX, 3.94, lampZ, { anchor: 'center' });
  shade.finish({ castShadow: false, receiveShadow: false });

  ctx.light({
    kind: 'point',
    position: [headX, 3.86, lampZ],
    color: 0xbfd8ff,
    intensity: 14,
    distance: 16,
    anim: 'flickerSoft',
    rate: 0.8,
    phase: 2.4,
  });

  // 滴水：集装箱顶沿、卡车车厢顶、月台边、坡道护墙顶
  ctx.fx.drip(lower.x + 1.1, 7.72, lower.z + 2.9, { rate: 1.0, length: 0.35, groundY: 0, splash: true });
  ctx.fx.drip(upper.x + 0.9, 5.13, upper.z + 2.9, { rate: 0.9, length: 0.32, groundY: 0, splash: true });
  ctx.fx.drip(T.truck.x + 1.15, 2.56, -25.0, { rate: 1.2, length: 0.3, groundY: 0, splash: true });
  ctx.fx.drip(T.truck.x, 2.42, -29.9, { rate: 1.1, length: 0.32, groundY: 0, splash: true });
  ctx.fx.drip(DOCK.maxX - 0.15, DOCK.top, DOCK.maxZ + 0.02, { rate: 1.4, length: 0.28, groundY: 0, splash: true });
  ctx.fx.drip(RAMP_WALL_X[0], deckY(-17.2) + RAMP_WALL_H - 0.02, -17.2, {
    rate: 1.0,
    length: 0.3,
    groundY: deckTop(-17.2),
    splash: true,
  });
  ctx.fx.drip(RAMP_WALL_X[1], deckY(-16.6) + RAMP_WALL_H - 0.02, -16.6, {
    rate: 1.0,
    length: 0.3,
    groundY: deckTop(-16.6),
    splash: true,
  });

  // 排气管白汽
  ctx.fx.steam(T.truck.x + 1.05, 2.9, T.truck.cabZ + 0.05, {
    size: 1.1,
    rate: 0.34,
    rise: 0.35,
    drift: [0.1, -0.05],
    life: 5.4,
  });
}
