// 外围围墙 + 三条攻防路线 + 街区街面：把整座沙盘围成一块被切出的雨夜街区。
// 只使用 ctx 暴露的 API 与 propRegistry 中的道具 key；layout 的少量微调以本文件内常量表达。
import { LAYOUT } from './layout.js';

const P = LAYOUT.perimeter;
const R = LAYOUT.routes;

// ---- 本文件内常量 ----------------------------------------------------------
const PAD = 0.06;                  // 街面铺装带厚度
const INSET = 0.01;                // 贴花离表面的偏移
const RAIL_SEG = 2.2;              // 与 railingSegment 道具长度一致
const PLAT_Y = R.platform.height;  // 高台面高度 1.6
const STAIR_STEPS = 8;
const STAIR_Z0 = R.platform.maxZ;                  // 楼梯顶步贴高台南边
const STAIR_Z1 = STAIR_Z0 + R.platformStairs.run;  // 楼梯脚 19.4
const ALLEY = R.leftAlley;
const GATE_Z = -2.5;               // 左巷巷口（接西街）
const CUL = R.culvert;
const CUL_X = (CUL.minX + CUL.maxX) / 2;
const CUL_CZ = (CUL.fromZ + CUL.toZ) / 2;
const CUL_LEN = CUL.toZ - CUL.fromZ;
const CUL_SLAB = 0.2;              // 顶盖板厚度（顶面 y = 1.45）
const CUL_WALL_H = CUL.height - CUL_SLAB;
const CUL_IN_X0 = CUL.minX + CUL.wall;
const CUL_IN_X1 = CUL.maxX - CUL.wall;
const HEAD_H = 2.3;                // 两端洞口端墙高度
const HEAD_T = 0.35;
const HEAD_HOLE_W = 1.0;
const HEAD_HOLE_H = 1.2;
const CAT = R.catwalk;
const CAT_DECK_X0 = CAT.minX;
const CAT_DECK_X1 = CAT.maxX - 0.06;                       // 避开高台台面板外挑
const CAT_LEN = CAT_DECK_X1 - CAT_DECK_X0;
const CAT_CX = (CAT_DECK_X0 + CAT_DECK_X1) / 2;
const CAT_STATIONS = [7.6, 11.4, 15.2, 19.0];              // 天桥支撑立柱站位

export function buildRoutes(ctx) {
  buildPerimeter(ctx);
  buildLeftAlley(ctx);
  buildNorthCorridor(ctx);
  buildWestStreet(ctx);
  buildCulvert(ctx);
  buildEastStreet(ctx);
  buildEastYard(ctx);
  buildPlatform(ctx);
  buildSouthStreet(ctx);
  buildLitter(ctx);
  buildWaterSources(ctx);
}

// 沿一条直线摆护栏段：(x, z) 为起点，length 沿局部 +X（rotY 旋转后的世界方向）。
function railRun(ctx, x, z, length, rotY, y) {
  const count = Math.max(1, Math.floor(length / RAIL_SEG));
  const span = Math.min(count * RAIL_SEG, length);
  const dx = Math.cos(rotY);
  const dz = -Math.sin(rotY);
  const first = (length - span) / 2 + RAIL_SEG / 2;
  for (let i = 0; i < count; i += 1) {
    const t = first + i * RAIL_SEG;
    ctx.prop('railingSegment', x + dx * t, y, z + dz * t, { rotY, wet: true });
  }
}

// ---- 1. 外围围墙 ----------------------------------------------------------
function buildPerimeter(ctx) {
  ctx.region('routes/perimeter');
  const mat = 'concreteWall';
  // 南北墙夹在东西墙之间、东西墙包住四角，避免角部出现同向共面
  ctx.wall({ x: -31.2, z: P.north.z, length: 62.4, height: P.north.height, thickness: P.north.thickness, material: mat });
  ctx.wall({ x: -31.2, z: P.south.z, length: 62.4, height: P.south.height, thickness: P.south.thickness, material: mat });
  ctx.wall({ x: P.west.x, z: -32, length: 64, height: P.west.height, thickness: P.west.thickness, rotY: -Math.PI / 2, material: mat });
  ctx.wall({ x: P.east.x, z: -32, length: 64, height: P.east.height, thickness: P.east.thickness, rotY: -Math.PI / 2, material: mat });

  // 压顶：concreteDark，比墙身窄 0.08 以免侧面共面
  const cap = ctx.mb('concreteDark');
  cap.box(62.4, 0.25, 0.72, 0, P.north.height, P.north.z, { anchor: 'bottom' });
  cap.box(62.4, 0.25, 0.72, 0, P.south.height, P.south.z, { anchor: 'bottom' });
  cap.box(0.72, 0.25, 63.9, P.west.x, P.west.height, 0, { anchor: 'bottom' });
  cap.box(0.72, 0.25, 63.9, P.east.x, P.east.height, 0, { anchor: 'bottom' });
  cap.finish();

  // 北墙：6 处 graffiti / freight，内面（朝 +Z，rotX 0 / rotY 0）与外面（朝 -Z）都有痕迹
  const nzIn = P.north.z + P.north.thickness / 2 + INSET;
  const nzOut = P.north.z - P.north.thickness / 2;
  ctx.decal('graffiti', -24.0, 1.45, nzIn, { rotX: 0, rotY: 0, rotZ: -0.03, w: 2.0, h: 1.5 });
  ctx.decal('freight', -16.5, 2.15, nzIn, { rotX: 0, rotY: 0, rotZ: 0.02, w: 1.9, h: 1.0 });
  ctx.decal('graffiti', -9.5, 1.80, nzIn, { rotX: 0, rotY: 0, rotZ: 0.04, w: 1.6, h: 1.6 });
  ctx.decal('graffiti', 12.0, 1.90, nzIn, { rotX: 0, rotY: 0, rotZ: -0.05, w: 1.7, h: 1.6 });
  ctx.decal('graffiti', -13.0, 1.60, nzOut, { rotX: 0, rotY: Math.PI, w: 1.8, h: 1.5 });
  ctx.decal('freight', 14.0, 1.90, nzOut, { rotX: 0, rotY: Math.PI, w: 1.7, h: 0.9 });

  // 西墙内侧面（朝 +X）
  const wxIn = P.west.x + P.west.thickness / 2 + INSET;
  ctx.decal('graffiti', wxIn, 1.45, 15.0, { rotX: 0, rotY: Math.PI / 2, rotZ: 0.03, w: 1.6, h: 1.4 });

  // 东墙内侧面（朝 -X）：高台以上才露出来，贴花抬高
  const exIn = P.east.x - P.east.thickness / 2 - INSET;
  ctx.decal('graffiti', exIn, 2.35, 2.0, { rotX: 0, rotY: -Math.PI / 2, rotZ: -0.02, w: 1.8, h: 1.4 });
  ctx.decal('graffiti', exIn, 2.20, 8.0, { rotX: 0, rotY: -Math.PI / 2, rotZ: 0.03, w: 1.6, h: 1.5 });
  ctx.decal('freight', exIn, 1.70, 22.0, { rotX: 0, rotY: -Math.PI / 2, w: 1.7, h: 0.9 });
  // 南墙内侧面留给 CT 模块贴警徽，本模块只起墙与压顶。
}

// ---- 2. 左侧小巷（T → A 绕后） --------------------------------------------
function buildLeftAlley(ctx) {
  ctx.region('routes/alley');
  const cx = (ALLEY.minX + ALLEY.maxX) / 2;
  const cz = (ALLEY.fromZ + ALLEY.toZ) / 2;
  const pad = ctx.mb('concreteDark');
  pad.box(ALLEY.maxX - ALLEY.minX, PAD, ALLEY.toZ - ALLEY.fromZ, cx, 0, cz, { anchor: 'bottom' });
  pad.finish();

  // 沿西墙由北向南排布：垃圾箱、木箱堆、托盘、木板、油桶
  // （z ≈ -9.5 处是空中电线模块的次级电杆基座，0.5 半径，这里整段留空）
  ctx.prop('dumpster', -30.60, PAD, -20.30, { rotY: Math.PI / 2, wet: true });
  // 斜靠西墙的木板：绕 X 倾 1.2 后最低点下沉约 1.03，故抬到 y = 1.09
  ctx.prop('plank', -31.06, PAD + 1.03, -18.00, { rotX: -1.2, rotY: Math.PI / 2, wet: true });
  ctx.prop('woodCrate', -30.55, PAD, -16.10, { rotY: 0.08, wet: true });
  ctx.prop('woodCrate', -30.55, PAD, -15.28, { rotY: -0.06, wet: true });
  ctx.prop('woodCrate', -30.55, PAD + 0.75, -15.69, { rotY: 0.20, wet: true });
  ctx.prop('pallet', -30.55, PAD, -13.40, { rotY: 0.10, wet: true });
  ctx.prop('pallet', -30.55, PAD + 0.15, -13.40, { rotY: -0.12, wet: true });
  ctx.prop('woodCrate', -30.60, PAD, -12.45, { rotY: 0.42, wet: true });
  ctx.prop('barrelRust', -30.70, PAD, -11.45, { rotY: 0.30, wet: true });
  ctx.prop('woodCrate', -30.50, PAD, -8.30, { rotY: 0.12, wet: true });
  ctx.prop('woodCrate', -30.50, PAD + 0.75, -8.30, { rotY: -0.28, wet: true });
  ctx.prop('plank', -30.50, PAD, -6.60, { rotY: 1.15, wet: true });
  ctx.prop('pallet', -30.35, PAD, -4.90, { rotY: 0.20, wet: true });

  // 巷口门垛：两根 0.4 柱 + 顶部横梁
  const gate = ctx.mb('concrete');
  gate.box(0.4, 2.6, 0.4, -31.0, 0, GATE_Z, { anchor: 'bottom' });
  gate.box(0.4, 2.6, 0.4, -29.25, 0, GATE_Z, { anchor: 'bottom' });
  gate.box(2.15, 0.35, 0.45, -30.125, 2.6, GATE_Z, { anchor: 'bottom' });
  gate.finish();

  // 巷内暖黄壁灯：自发光灯罩 + 本模块第 1 盏真实光源（预算 2 盏，另一盏在高台）
  const fixture = ctx.mb('darkMetal');
  fixture.box(0.30, 0.06, 0.06, -31.05, 2.36, -11.60, { anchor: 'bottom' });
  fixture.box(0.06, 0.06, 2.40, -31.16, 2.44, -12.70, { anchor: 'bottom' });
  fixture.box(0.32, 0.14, 0.32, -30.95, 2.22, -11.60, { anchor: 'bottom' });
  fixture.finish();
  const glow = ctx.mb('lampWarm');
  glow.box(0.26, 0.08, 0.26, -30.95, 2.14, -11.60, { anchor: 'bottom' });
  glow.finish({ castShadow: false, receiveShadow: false });
  ctx.light({
    kind: 'point',
    position: [-30.95, 2.10, -11.60],
    color: 0xffb257,
    intensity: 12,
    distance: 12,
    anim: 'flickerSoft',
    rate: 0.9,
  });

  const wxIn = P.west.x + P.west.thickness / 2 + INSET;
  ctx.decal('graffiti', wxIn, 1.35, -16.50, { rotX: 0, rotY: Math.PI / 2, rotZ: 0.03, w: 1.7, h: 1.4 });
  ctx.decal('graffiti', wxIn, 1.50, -7.50, { rotX: 0, rotY: Math.PI / 2, rotZ: -0.04, w: 1.5, h: 1.5 });
  ctx.decal('bullets', wxIn, 1.90, -17.40, { rotX: 0, rotY: Math.PI / 2, w: 0.9, h: 0.9 });
  ctx.decal('bullets', wxIn, 1.40, -6.40, { rotX: 0, rotY: Math.PI / 2, w: 0.8, h: 0.8 });
}

// ---- 3. 北侧走廊（T 出生点西端 → 左巷） ------------------------------------
function buildNorthCorridor(ctx) {
  ctx.region('routes/north-corridor');
  const rect = R.northCorridor;
  const pad = ctx.mb('gravel');
  pad.box(rect.maxX - rect.minX, PAD, rect.maxZ - rect.minZ, (rect.minX + rect.maxX) / 2, 0, (rect.minZ + rect.maxZ) / 2, { anchor: 'bottom' });
  pad.finish();

  // 沿 A 仓库北墙的空调外机、通风管、垃圾桶
  ctx.prop('ventPipe', -27.60, PAD, -19.75, { rotY: 0.20, wet: true });
  ctx.prop('ventPipe', -20.80, PAD, -19.75, { rotY: -0.15, wet: true });
  ctx.prop('acUnit', -24.40, PAD, -19.80, { rotY: 0.08, wet: true });
  ctx.prop('trashCan', -22.60, PAD, -19.70, { rotY: 0.50, wet: true });
  ctx.prop('trashCan', -18.40, PAD, -19.70, { rotY: -0.40, wet: true });
  ctx.prop('cardboardBox', -26.00, PAD, -19.80, { rotY: 0.35, wet: true });

  // 仓库北墙外侧（朝 -Z）的弹痕
  const wallZ = -19 - INSET;
  ctx.decal('bullets', -25.50, 1.70, wallZ, { rotX: 0, rotY: Math.PI, w: 0.9, h: 0.9 });
  ctx.decal('bullets', -21.50, 1.30, wallZ, { rotX: 0, rotY: Math.PI, w: 0.8, h: 0.8 });
}

// ---- 4. 西街（A 侧街道） --------------------------------------------------
function buildWestStreet(ctx) {
  ctx.region('routes/west-street');
  const rect = R.westStreet;
  // 铺装带在方涵处断开，让涵洞内的积水落在底座地面上
  const culvertEdge = CUL.minX - 0.05;
  const pad = ctx.mb('concreteDark');
  pad.box(culvertEdge - rect.minX, PAD, rect.maxZ - rect.minZ, (rect.minX + culvertEdge) / 2, 0, (rect.minZ + rect.maxZ) / 2, { anchor: 'bottom' });
  // 方涵南洞口以南的窄条，供中路墙根两只轮胎落脚
  pad.box(rect.maxX - culvertEdge, PAD, rect.maxZ - CUL.toZ, (culvertEdge + rect.maxX) / 2, 0, (CUL.toZ + rect.maxZ) / 2, { anchor: 'bottom' });
  pad.finish();

  ctx.prop('pallet', -11.60, PAD, 8.20, { rotY: 0.10, wet: true });
  ctx.prop('pallet', -11.60, PAD + 0.15, 8.20, { rotY: -0.15, wet: true });
  ctx.prop('pallet', -11.55, PAD, 6.00, { rotY: 0.55, wet: true });
  ctx.prop('woodCrate', -11.65, PAD, 12.40, { rotY: 0.10, wet: true });
  ctx.prop('woodCrate', -11.65, PAD + 0.75, 12.40, { rotY: -0.20, wet: true });
  ctx.prop('woodCrate', -10.95, PAD, 13.15, { rotY: 0.35, wet: true });
  ctx.prop('woodCrate', -11.70, PAD, -3.20, { rotY: 0.15, wet: true });
  ctx.prop('dumpster', -11.75, PAD, 3.00, { rotY: Math.PI / 2, wet: true });
  ctx.prop('barrelBlue', -9.85, PAD, 10.45, { rotY: 0.30, wet: true });
  ctx.prop('barrelRust', -9.20, PAD, 11.30, { rotY: 0.00, wet: true });
  ctx.prop('roadSign', -8.90, PAD, 7.40, { rotY: 0.45, wet: true });
  ctx.prop('bicycle', -11.90, PAD, 0.60, { rotY: Math.PI / 2, wet: true });
  ctx.prop('cardboardBox', -10.90, PAD, 14.60, { rotY: 0.60, wet: true });
  ctx.prop('cardboardBox', -11.30, PAD, 15.40, { rotY: -0.25, wet: true });
  // 涵洞以南的中路墙根
  ctx.prop('tire', -6.10, PAD, 14.20, { rotY: 0.40, wet: true });
  ctx.prop('tire', -5.95, PAD, 15.05, { rotY: 1.10, wet: true });

  // 仓库东墙外（朝 +X）的涂鸦与货运编号
  const wallX = -13 + INSET;
  ctx.decal('graffiti', wallX, 1.60, 1.50, { rotX: 0, rotY: Math.PI / 2, rotZ: 0.02, w: 1.8, h: 1.5 });
  ctx.decal('graffiti', wallX, 1.50, 9.50, { rotX: 0, rotY: Math.PI / 2, rotZ: -0.03, w: 1.6, h: 1.4 });
  ctx.decal('freight', wallX, 2.30, 6.00, { rotX: 0, rotY: Math.PI / 2, w: 1.8, h: 0.95 });
}

// ---- 5. 下水道方涵（T 斜坡下方 → CT 侧翼） --------------------------------
function buildCulvert(ctx) {
  ctx.region('routes/culvert');
  // 侧墙 1.25 高 + 顶盖板 0.2，总高 1.45、顶面 y = 1.45（与 layout 的 culvert.height 一致）
  const body = ctx.mb('concreteWall');
  body.box(CUL.wall, CUL_WALL_H, CUL_LEN, CUL_IN_X0 - CUL.wall / 2, 0, CUL_CZ, { anchor: 'bottom' });
  body.box(CUL.wall, CUL_WALL_H, CUL_LEN, CUL_IN_X1 + CUL.wall / 2, 0, CUL_CZ, { anchor: 'bottom' });
  body.box(CUL_IN_X1 - CUL_IN_X0, CUL_SLAB, CUL_LEN, CUL_X, CUL_WALL_H, CUL_CZ, { anchor: 'bottom' });
  body.finish();

  // 两端端墙：留 1.0 × 1.2 洞口（朝 Z 方向），洞口上方为雨篷檐口
  const eave = ctx.mb('concreteDark');
  for (const hz of [CUL.fromZ, CUL.toZ]) {
    ctx.wall({
      x: CUL.minX,
      z: hz,
      length: CUL.maxX - CUL.minX,
      height: HEAD_H,
      thickness: HEAD_T,
      material: 'concreteWall',
      holes: [{ at: (CUL.maxX - CUL.minX - HEAD_HOLE_W) / 2, width: HEAD_HOLE_W, from: 0, height: HEAD_HOLE_H }],
    });
    const outward = hz < 0 ? -1 : 1;
    eave.box(1.7, 0.1, 0.55, CUL_X, 1.26, hz + outward * (HEAD_T / 2 + INSET + 0.275), { anchor: 'bottom', rotX: 0.14 });
  }
  eave.finish();

  // 洞内沿内壁的锈铁横向管道
  const pipes = ctx.mb('rustMetal');
  pipes.cyl(0.09, 0.09, 29.8, 8, CUL_IN_X0 + 0.1, 0.42, CUL_CZ, { rotX: Math.PI / 2, anchor: 'center' });
  pipes.cyl(0.09, 0.09, 29.8, 8, CUL_IN_X1 - 0.1, 0.95, CUL_CZ, { rotX: Math.PI / 2, anchor: 'center' });
  pipes.finish();

  // 洞内积水：两段静止水面
  ctx.water(CUL_X, 0.03, -13.2, 1.0, 7.2, { time: 0.35 });
  ctx.water(CUL_X, 0.03, 6.2, 1.0, 13.2, { time: 1.15 });

  // 洞内格栅与倒下的油桶
  ctx.prop('gratePanel', -6.60, 0.01, -8.60, { rotY: 0.02, wet: true });
  ctx.prop('gratePanel', -6.70, 0.01, -7.50, { rotY: -0.03, wet: true });
  ctx.prop('barrelFallen', -6.55, 0, -3.20, { rotY: 0.50, wet: true });

  // 顶盖上：2 个木箱 + 1 块木板，读作有人从上方走过
  ctx.prop('woodCrate', -7.00, CUL.height, -6.00, { rotY: 0.15, wet: true });
  ctx.prop('woodCrate', -6.30, CUL.height, -5.10, { rotY: -0.40, wet: true });
  ctx.prop('plank', CUL_X, CUL.height, 3.00, { rotY: 0.60, wet: true });

  // 南侧洞口：洞口上方 graffiti、洞口两侧 bullets
  const headZOut = CUL.toZ + HEAD_T / 2 + INSET;
  ctx.decal('graffiti', CUL_X, 1.78, headZOut, { rotX: 0, rotY: 0, rotZ: -0.02, w: 1.4, h: 0.8 });
  ctx.decal('bullets', CUL_IN_X0 - 0.025, 0.62, headZOut, { rotX: 0, rotY: 0, w: 0.45, h: 0.45 });
  ctx.decal('bullets', CUL_IN_X1 + 0.025, 0.62, headZOut, { rotX: 0, rotY: 0, w: 0.45, h: 0.45 });
}

// ---- 6. 东街（B 侧街道） --------------------------------------------------
function buildEastStreet(ctx) {
  ctx.region('routes/east-street');
  const rect = R.eastStreet;
  const pad = ctx.mb('concreteDark');
  // 西边探入中路墙体 0.05，避免铺装带边缘与墙面共面
  pad.box(rect.maxX - rect.minX + 0.05, PAD, rect.maxZ - rect.minZ, (rect.minX - 0.05 + rect.maxX) / 2, 0, (rect.minZ + rect.maxZ) / 2, { anchor: 'bottom' });
  pad.finish();

  ctx.prop('pallet', 12.90, PAD, 2.20, { rotY: 0.20, wet: true });
  ctx.prop('pallet', 12.90, PAD + 0.15, 2.20, { rotY: -0.10, wet: true });
  ctx.prop('woodCrate', 12.60, PAD, 4.10, { rotY: 0.12, wet: true });
  ctx.prop('woodCrate', 12.60, PAD + 0.75, 4.10, { rotY: -0.30, wet: true });
  ctx.prop('woodCrate', 13.15, PAD, 5.05, { rotY: 0.40, wet: true });
  ctx.prop('barrelRust', 7.20, PAD, 12.40, { rotY: 0.20, wet: true });
  ctx.prop('barrelRust', 6.50, PAD, 13.60, { rotY: 0.90, wet: true });
  ctx.prop('concreteBlock', 10.60, PAD, 14.00, { rotY: Math.PI / 2, wet: true });
  ctx.prop('trashCan', 8.40, PAD, 10.60, { rotY: 0.30, wet: true });
  ctx.prop('tire', 6.40, PAD, 3.20, { rotY: 0.50, wet: true });
  ctx.prop('tire', 7.00, PAD, 4.40, { rotY: 1.20, wet: true });
  ctx.prop('cableSpool', 9.00, PAD, 16.20, { rotY: 0.35, wet: true });

  // 中路东墙外侧（朝 +X）
  const wallX = R.eastStreet.minX + INSET;
  ctx.decal('graffiti', wallX, 1.75, 6.50, { rotX: 0, rotY: -Math.PI / 2, rotZ: 0.03, w: 1.8, h: 1.5 });
  ctx.decal('graffiti', wallX, 1.50, 11.50, { rotX: 0, rotY: -Math.PI / 2, rotZ: -0.02, w: 1.6, h: 1.4 });
  ctx.decal('bullets', wallX, 2.20, 9.00, { rotX: 0, rotY: -Math.PI / 2, w: 0.9, h: 0.9 });
  ctx.decal('bullets', wallX, 1.15, 14.20, { rotX: 0, rotY: -Math.PI / 2, w: 0.8, h: 0.8 });
}

// ---- 7. 东侧院子 ----------------------------------------------------------
// 院子北段（z > -8）是 B 包点的空地与掩体，道具一律放在 z > 0 的南段。
function buildEastYard(ctx) {
  ctx.region('routes/east-yard');
  ctx.prop('containerBlue', 18.00, 0, 11.60, { rotY: 0, wet: true });
  ctx.prop('pipeStack', 16.90, 0, 3.60, { rotY: 0.22, wet: true });
  ctx.prop('pipeStack', 18.90, 0, 9.40, { rotY: -0.18, wet: true });
  ctx.prop('woodCrate', 15.60, 0, 1.10, { rotY: 0.10, wet: true });
  ctx.prop('woodCrate', 16.40, 0, 1.55, { rotY: -0.25, wet: true });
  ctx.prop('woodCrate', 16.00, 0.75, 1.32, { rotY: 0.60, wet: true });
  ctx.prop('dumpster', 15.90, 0, 16.20, { rotY: Math.PI / 2, wet: true });
  ctx.prop('roadSignFallen', 20.40, 0, 7.00, { rotY: 0.80, wet: true });
  ctx.prop('cardboardBox', 20.80, 0, 14.60, { rotY: 0.50, wet: true });
  ctx.prop('cardboardBox', 20.20, 0, 15.40, { rotY: -0.35, wet: true });

  ctx.decal('freight', 18.00, 0.02, 8.00, { rotX: -Math.PI / 2, rotZ: 0.40, w: 2.0, h: 1.6, opacity: 0.85 });
}

// ---- 8. 右侧高台 + 天桥（CT → B 侧翼） ------------------------------------
function buildPlatform(ctx) {
  ctx.region('routes/platform');
  const rect = R.platform;
  const cx = (rect.minX + rect.maxX) / 2;
  const cz = (rect.minZ + rect.maxZ) / 2;
  const w = rect.maxX - rect.minX;
  const d = rect.maxZ - rect.minZ;

  // 台体（侧面 concreteWall）+ 台面板（concreteFloor，四周外挑 0.08）
  const body = ctx.mb('concreteWall');
  body.box(w, PLAT_Y - 0.06, d, cx, 0, cz, { anchor: 'bottom' });
  body.finish();
  const deck = ctx.mb('concreteFloor');
  deck.box(w + 0.16, 0.06, d + 0.16, cx, PLAT_Y - 0.06, cz, { anchor: 'bottom' });
  deck.finish();

  // 台面四周护栏：天桥接口（z -3.2..0）与楼梯口（x 23.3..25.8）留空
  railRun(ctx, 22.2, -5.8, 3.0, -Math.PI / 2, PLAT_Y);
  railRun(ctx, 22.2, -0.4, 16.2, -Math.PI / 2, PLAT_Y);
  railRun(ctx, 30.3, -5.8, 21.6, -Math.PI / 2, PLAT_Y);
  railRun(ctx, 22.2, -5.8, 8.1, 0, PLAT_Y);
  railRun(ctx, 25.8, 15.8, 4.5, 0, PLAT_Y);
  ctx.prop('railingSegment', 22.75, PLAT_Y, 15.8, { rotY: 0, scale: [0.5, 1, 1], wet: true });

  // 8 级踏步 + 两侧扶手（扶手高出台面 1.05）
  const stair = ctx.mb('concrete');
  const stepRise = PLAT_Y / STAIR_STEPS;
  const stepRun = R.platformStairs.run / STAIR_STEPS;
  for (let i = 0; i < STAIR_STEPS; i += 1) {
    const top = stepRise * (i + 1);
    const zc = STAIR_Z0 + (STAIR_STEPS - 0.5 - i) * stepRun;
    stair.box(2.2, top, stepRun, R.platformStairs.x, 0, zc, { anchor: 'bottom' });
  }
  const rail = ctx.mb('paintedMetalGray');
  for (const px of [R.platformStairs.x - 1.1, R.platformStairs.x + 1.1]) {
    rail.ramp(0.08, px, 1.25, STAIR_Z1, px, PLAT_Y + 1.05, STAIR_Z0);
    // 立柱长度 = 该处扶手标高 − 所在踏步顶面标高
    for (const [pz, stepTop] of [[18.2, 0.60], [17.0, 1.20]]) {
      const railY = 1.25 + ((STAIR_Z1 - pz) / R.platformStairs.run) * (PLAT_Y + 1.05 - 1.25);
      rail.box(0.07, railY - stepTop, 0.07, px, stepTop, pz, { anchor: 'bottom' });
    }
  }
  rail.finish();

  // 台面掩体
  ctx.prop('sandbag', 25.20, PLAT_Y, -4.60, { rotY: 0.20, wet: true });
  ctx.prop('sandbag', 26.00, PLAT_Y, -4.20, { rotY: -0.30, wet: true });
  ctx.prop('sandbag', 25.60, PLAT_Y, -3.70, { rotY: 0.80, wet: true });
  ctx.prop('woodCrate', 28.40, PLAT_Y, 2.00, { rotY: 0.15, wet: true });
  ctx.prop('woodCrate', 28.40, PLAT_Y + 0.75, 2.00, { rotY: -0.35, wet: true });
  ctx.prop('barrelBlue', 28.60, PLAT_Y, -4.20, { rotY: 0.40, wet: true });
  ctx.prop('ventPipe', 29.70, PLAT_Y, 9.00, { rotY: 0.50, wet: true });
  ctx.prop('tireStack', 28.90, PLAT_Y, 12.40, { rotY: 0.20, wet: true });

  // 挡土立面（x = 22，朝 -X）上的涂鸦
  ctx.decal('graffiti', rect.minX - INSET, 0.90, 6.00, { rotX: 0, rotY: -Math.PI / 2, rotZ: 0.02, w: 1.9, h: 1.1 });

  // ---- 天桥：台面 (x = 22) 到中路东墙 (x = 5.6) ----
  const plate = ctx.mb('checkeredPlate');
  plate.box(CAT_LEN, 0.1, CAT.width, CAT_CX, CAT.y - 0.1, CAT.z, { anchor: 'bottom' });
  plate.finish();
  // 两侧边梁（兼作涂鸦载体），避免与台面板共面
  const fascia = ctx.mb('corrugated');
  fascia.box(CAT_LEN, 0.4, 0.08, CAT_CX, CAT.y - 0.5, CAT.z - CAT.width / 2 + 0.04, { anchor: 'bottom' });
  fascia.box(CAT_LEN, 0.4, 0.08, CAT_CX, CAT.y - 0.5, CAT.z + CAT.width / 2 - 0.04, { anchor: 'bottom' });
  fascia.finish();
  ctx.decal('graffiti', 13.0, 1.30, CAT.z - CAT.width / 2 - INSET, { rotX: 0, rotY: Math.PI, rotZ: 0.02, w: 1.7, h: 0.34 });
  ctx.decal('graffiti', 15.6, 1.30, CAT.z + CAT.width / 2 + INSET, { rotX: 0, rotY: 0, rotZ: -0.02, w: 1.7, h: 0.34 });

  // 支撑立柱 + 横向加强梁
  const frame = ctx.mb('darkMetal');
  for (const px of CAT_STATIONS) {
    for (const pz of [CAT.z - 0.6, CAT.z + 0.6]) {
      frame.box(0.16, CAT.y - 0.1, 0.16, px, 0, pz, { anchor: 'bottom' });
    }
    frame.box(0.14, 0.14, 1.4, px, CAT.y - 0.24, CAT.z, { anchor: 'center' });
  }
  frame.finish();

  railRun(ctx, 5.9, CAT.z - CAT.width / 2 + 0.09, 15.8, 0, CAT.y);
  railRun(ctx, 5.9, CAT.z + CAT.width / 2 - 0.09, 15.8, 0, CAT.y);

  // 立柱根部的杂物（东街铺装带上）
  ctx.prop('trashCan', 7.55, PAD, -0.30, { rotY: 0.50, wet: true });
  ctx.prop('cardboardBox', 8.30, PAD, 0.35, { rotY: 0.70, wet: true });

  // 高台暖黄灯：照亮天桥与侧翼
  const lamp = ctx.mb('darkMetal');
  lamp.box(0.40, 0.06, 0.40, 22.70, PLAT_Y, -3.60, { anchor: 'bottom' });
  lamp.cyl(0.055, 0.070, 2.36, 8, 22.70, PLAT_Y + 0.06, -3.60, { anchor: 'bottom' });
  lamp.box(0.06, 0.06, 1.50, 22.70, 3.92, -2.90, { anchor: 'bottom' });
  lamp.box(0.34, 0.16, 0.34, 22.70, 3.74, -2.20, { anchor: 'bottom' });
  lamp.finish();
  const lampGlow = ctx.mb('lampWarm');
  lampGlow.box(0.26, 0.08, 0.26, 22.70, 3.66, -2.20, { anchor: 'bottom' });
  lampGlow.finish({ castShadow: false, receiveShadow: false });
  ctx.light({
    kind: 'point',
    position: [22.70, 3.60, -2.20],
    color: 0xffb257,
    intensity: 14,
    distance: 16,
    anim: 'flickerSoft',
    rate: 0.7,
  });
}

// ---- 9. 南街（西南街区建筑与 CT 之间） ------------------------------------
function buildSouthStreet(ctx) {
  ctx.region('routes/south-street');
  const rect = R.southStreet;
  const pad = ctx.mb('concreteDark');
  // 北边探入西南街区 0.05，避免铺装带边缘与建筑立面共面
  pad.box(rect.maxX - rect.minX, PAD, rect.maxZ - rect.minZ + 0.05, (rect.minX + rect.maxX) / 2, 0, (rect.minZ - 0.05 + rect.maxZ) / 2, { anchor: 'bottom' });
  pad.finish();

  ctx.prop('woodCrate', -24.00, PAD, 13.20, { rotY: 0.10, wet: true });
  ctx.prop('woodCrate', -24.00, PAD + 0.75, 13.20, { rotY: -0.25, wet: true });
  ctx.prop('woodCrate', -21.50, PAD, 16.60, { rotY: 0.40, wet: true });
  ctx.prop('woodCrate', -14.00, PAD, 13.40, { rotY: 0.15, wet: true });
  ctx.prop('barrelRust', -18.50, PAD, 16.80, { rotY: 0.30, wet: true });
  ctx.prop('barrelRust', 7.00, PAD, 13.20, { rotY: 0.60, wet: true });
  ctx.prop('dumpster', -10.00, PAD, 16.80, { rotY: 0, wet: true });
  ctx.prop('cardboardBox', -6.40, PAD, 13.00, { rotY: 0.20, wet: true });
  ctx.prop('cardboardBox', -7.60, PAD, 14.60, { rotY: -0.50, wet: true });
  ctx.prop('trafficCone', -2.00, PAD, 16.40, { rotY: 0.30, wet: true });

  // 西南街区南立面（朝 +Z）
  const wallZ = rect.minZ + INSET;
  ctx.decal('graffiti', -23.00, 1.60, wallZ, { rotX: 0, rotY: 0, rotZ: 0.03, w: 1.8, h: 1.5 });
  ctx.decal('graffiti', -19.00, 1.45, wallZ, { rotX: 0, rotY: 0, rotZ: -0.03, w: 1.6, h: 1.4 });
}

// ---- 10. 街面零散氛围 ------------------------------------------------------
function buildLitter(ctx) {
  ctx.region('routes/litter');
  // 东院没有铺装带，那里的散落物直接落在底座地面上
  ctx.prop('tireStack', -11.90, PAD, -4.00, { rotY: 0.30, wet: true });
  ctx.prop('paintBucket', -10.90, PAD, 11.60, { rotY: 0.80, wet: true });
  ctx.prop('hoseCoil', 11.60, PAD, 8.40, { rotY: 0.20, wet: true });
  ctx.prop('newsPile', 16.80, 0, 6.20, { rotY: 1.10, wet: true });
  ctx.prop('bucket', -30.15, PAD, -3.20, { rotY: 0.60, wet: true });
  ctx.prop('cardboardBox', 12.60, PAD, 11.00, { rotY: -0.40, wet: true });
  ctx.prop('plank', -23.50, PAD, 15.20, { rotY: 1.20, wet: true });
  ctx.prop('tire', 6.20, PAD, -3.40, { rotY: 0.70, wet: true });
  ctx.prop('bucket', 20.80, 0, 2.40, { rotY: 0.30, wet: true });
  ctx.prop('newsPile', -30.30, PAD, -4.30, { rotY: 0.40, wet: true });

  // 地面弹痕与地面涂鸦：分散在各条街道
  ctx.decal('bullets', -30.20, PAD + INSET, -13.20, { rotX: -Math.PI / 2, rotZ: 0.30, w: 0.8, h: 0.8 });
  ctx.decal('bullets', -21.00, PAD + INSET, -20.40, { rotX: -Math.PI / 2, rotZ: -0.20, w: 0.9, h: 0.9 });
  ctx.decal('bullets', -9.20, PAD + INSET, 9.00, { rotX: -Math.PI / 2, rotZ: 0.55, w: 0.85, h: 0.85 });
  ctx.decal('bullets', 10.40, PAD + INSET, 6.20, { rotX: -Math.PI / 2, rotZ: 1.10, w: 0.85, h: 0.85 });
  ctx.decal('bullets', 18.60, 0.02, 12.40, { rotX: -Math.PI / 2, rotZ: -0.40, w: 0.9, h: 0.9 });
  ctx.decal('bullets', -16.40, PAD + INSET, 15.00, { rotX: -Math.PI / 2, rotZ: 0.75, w: 0.8, h: 0.8 });
  ctx.decal('bullets', 26.60, PLAT_Y + INSET, -3.20, { rotX: -Math.PI / 2, rotZ: 0.25, w: 0.8, h: 0.8 });
  ctx.decal('bullets', 19.80, 0.02, 0.60, { rotX: -Math.PI / 2, rotZ: -0.90, w: 0.9, h: 0.9 });
  ctx.decal('graffiti', -8.60, PAD + INSET, 14.20, { rotX: -Math.PI / 2, rotZ: 1.95, w: 1.5, h: 1.5, opacity: 0.9 });
  ctx.decal('graffiti', 15.60, 0.02, 8.80, { rotX: -Math.PI / 2, rotZ: 2.60, w: 1.4, h: 1.4, opacity: 0.9 });
  ctx.decal('graffiti', -12.60, PAD + INSET, 14.40, { rotX: -Math.PI / 2, rotZ: 0.85, w: 1.5, h: 1.5, opacity: 0.9 });
  ctx.decal('graffiti', -25.60, PAD + INSET, -20.30, { rotX: -Math.PI / 2, rotZ: 2.10, w: 1.3, h: 1.3, opacity: 0.9 });
}

// ---- 11. 滴水与白汽 --------------------------------------------------------
function buildWaterSources(ctx) {
  ctx.region('routes/water');
  const drips = [
    [6.00, P.north.height, -31.15, 1.5],     // 北墙顶
    [-14.00, P.north.height, -31.15, 1.1],   // 北墙顶
    [-31.15, P.west.height, -15.00, 1.3],    // 西墙顶（左巷段）
    [-31.15, P.west.height, -8.50, 1.7],     // 西墙顶（左巷段）
    [31.15, P.east.height, 3.00, 1.2],       // 东墙顶
    [-10.00, P.south.height, 31.15, 1.0],    // 南墙顶
    [22.05, PLAT_Y, 8.00, 1.6],              // 高台边缘
    [13.00, 1.45, -1.60, 1.8],               // 天桥底面
    [18.00, 1.45, -1.60, 1.4],               // 天桥底面
    [-30.10, 2.95, GATE_Z, 0.9],             // 左巷门垛顶
  ];
  for (const [x, y, z, rate] of drips) {
    ctx.fx.drip(x, y, z, { rate, length: 0.31, width: 0.05, splash: true });
  }
  // 涵洞南洞口外的白汽
  ctx.fx.steam(CUL_X, 1.35, CUL.toZ + 0.6, { size: 0.9, rate: 0.25, rise: 0.25, drift: [0.08, 0.4], life: 4.5 });
}
