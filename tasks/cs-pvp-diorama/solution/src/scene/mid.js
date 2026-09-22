// 中路主通道：贯通 T（北）/ CT（南）的中轴对枪走廊——混凝土高墙与高位射击孔、双开厚重铁门、
// 中轴排水沟（路缘 + 水面 + 铁格栅）、CT 侧矮墙掩体、南端 5 宽出口。
import { LAYOUT } from './layout.js';

const M = LAYOUT.mid;

// LAYOUT.mid 锚点到量体尺寸的换算（本地常量，不改动共享蓝图）。
const WALL_CX = Math.abs(M.minX) + M.wallThickness / 2; // 5.3：墙内表面贴 x = ±5
const WALL_LEN = M.toZ - M.fromZ; // 30
const WALL_MID_Z = (M.fromZ + M.toZ) / 2;
const SLIT_Z0 = M.slit.z - M.slit.width / 2; // -2.3

const GATE_W = M.maxX - M.minX;
const DOOR_MIN_X = -3.6; // 关着的门板覆盖 -3.6 ~ -0.9
const DOOR_MAX_X = M.gate.opening.maxX; // 1.5
const DOOR_GAP_CX = (M.gate.opening.minX + M.gate.opening.maxX) / 2;
const DOOR_HEIGHT = 2.9;
const DOOR_PLANE_Z = M.gate.z + 0.1; // 门板所在平面
const CLOSED_LEAF_W = -M.gate.opening.minX - DOOR_MIN_X; // 2.7
const OPEN_LEAF_W = DOOR_MAX_X - M.gate.opening.minX; // 2.4
const OPEN_LEAF_YAW = Math.PI + (Math.PI * 75) / 180; // 关门朝 -X，绕东侧铰链向南张开 75°

const CHANNEL_CZ = (M.channel.fromZ + M.channel.toZ) / 2;
const CHANNEL_LEN = M.channel.toZ - M.channel.fromZ;
const CURB_X = M.channel.maxX + 0.06; // 0.12 宽路缘夹出 1.1 宽水槽
const WATER_Y = 0.05;
const GRATE_COUNT = 12;
const GRATE_FROM_Z = -13.5;
const GRATE_TO_Z = 11.5;

const LOW_W = M.lowWall.maxX - M.lowWall.minX;
const LOW_CX = (M.lowWall.minX + M.lowWall.maxX) / 2;

const SOUTH_Z = M.ctDoor.z + 0.1;
const SOUTH_HALF = M.ctDoor.width / 2;
const SOUTH_POST_H = 3.2;

const LAMP_Z = 9.4; // 冷白壁灯位于矮墙南侧墙面
const LAMP_Y = 2.45;

// 铁门门板：以铰链为原点，d 为沿门宽方向到铰链的距离，n 为沿门板法向的偏移。
function buildDoorLeaf(builder, { hingeX, hingeZ, yaw, width, height, thickness }) {
  const cos = Math.cos(yaw);
  const sin = Math.sin(yaw);
  const half = thickness / 2;
  const toWorld = (d, n) => ({ x: hingeX + d * cos + n * sin, z: hingeZ - d * sin + n * cos });
  const box = (w, h, depth, d, y, n, options = {}) => {
    const p = toWorld(d, n);
    builder.box(w, h, depth, p.x, y, p.z, { rotY: yaw, ...options });
  };

  box(width, height, thickness, width / 2, 0, 0); // 门板
  for (const face of [-1, 1]) {
    for (const y of [0.5, 1.3, 2.1]) {
      box(width - 0.18, 0.1, 0.05, width / 2, y, face * (half + 0.025)); // 两面各 3 条加强筋
    }
  }
  for (const d of [0.2, width - 0.2]) {
    for (const y of [0.32, 0.98, 1.66, 2.42]) {
      const p = toWorld(d, half + 0.03);
      builder.sphere(0.035, p.x, y, p.z); // 边沿铆钉 8 颗
    }
  }
  const bar = toWorld(width - 0.3, half + 0.07);
  builder.cyl(0.028, 0.028, 0.5, 8, bar.x, 1.15, bar.z, { anchor: 'center' }); // 自由边把手
  for (const y of [0.92, 1.38]) {
    box(0.06, 0.06, 0.12, width - 0.3, y, half + 0.06, { anchor: 'center' });
  }
}

export function buildMid(ctx) {
  ctx.region('mid');

  // ---- 1. 两侧混凝土高墙 + 各一处高位射击孔 ---------------------------------
  const slitHole = {
    at: SLIT_Z0 - M.fromZ,
    width: M.slit.width,
    from: M.slit.from,
    height: M.slit.height,
  };
  for (const side of [-1, 1]) {
    ctx.wall({
      x: side * WALL_CX,
      z: M.fromZ,
      length: WALL_LEN,
      height: M.wallHeight,
      thickness: M.wallThickness,
      rotY: -Math.PI / 2,
      material: 'concreteWall',
      holes: [slitHole],
    });
  }

  // 深色金属件统一进一个构建器：射击孔窗套、门框、壁灯支架。
  const dark = ctx.mb('darkMetal');

  // 射击孔窗套：墙内表面一圈深色窗框 + 孔内衬板，形成内凹的高位射击口。
  const slitTop = M.slit.from + M.slit.height;
  const slitFaceX = M.maxX - 0.06;
  for (const side of [-1, 1]) {
    dark.box(0.12, 0.1, M.slit.width + 0.24, side * slitFaceX, slitTop + 0.05, M.slit.z);
    dark.box(0.16, 0.09, M.slit.width + 0.24, side * slitFaceX, M.slit.from - 0.045, M.slit.z);
    dark.box(0.12, M.slit.height, 0.12, side * slitFaceX, M.slit.from, SLIT_Z0 - 0.06);
    dark.box(0.12, M.slit.height, 0.12, side * slitFaceX, M.slit.from, SLIT_Z0 + M.slit.width + 0.06);
    dark.box(0.5, 0.05, M.slit.width, side * WALL_CX, slitTop - 0.025, M.slit.z, { anchor: 'center' });
    dark.box(0.5, 0.05, M.slit.width, side * WALL_CX, M.slit.from + 0.025, M.slit.z, { anchor: 'center' });
  }

  // ---- 2. 无洞墙段：南端收口墙、门楣、CT 侧矮墙 ------------------------------
  const walls = ctx.mb('concreteWall');
  const returnW = M.maxX - SOUTH_HALF; // 2.5：收口到 5 宽出口
  for (const side of [-1, 1]) {
    walls.box(returnW, SOUTH_POST_H, M.wallThickness, side * (SOUTH_HALF + returnW / 2), 0, SOUTH_Z);
  }
  walls.box(GATE_W, M.wallHeight - SOUTH_POST_H, M.wallThickness, 0, SOUTH_POST_H, SOUTH_Z); // 出口门楣
  walls.box(LOW_W, M.lowWall.height, M.lowWall.thickness, LOW_CX, 0, M.lowWall.z); // 矮墙掩体
  walls.finish();

  // ---- 3. 墙顶与矮墙顶压顶条 ------------------------------------------------
  const coping = ctx.mb('concreteDark');
  for (const side of [-1, 1]) {
    coping.box(M.wallThickness + 0.1, 0.25, WALL_LEN, side * WALL_CX, M.wallHeight, WALL_MID_Z);
  }
  coping.box(GATE_W, 0.25, M.wallThickness + 0.12, 0, M.gate.structureHeight, M.gate.z);
  coping.box(GATE_W, 0.25, M.wallThickness, 0, M.wallHeight, SOUTH_Z);
  coping.box(LOW_W, 0.1, M.lowWall.thickness + 0.12, LOW_CX, M.lowWall.height, M.lowWall.z);
  coping.finish();

  // ---- 4. 双开厚铁门：门框墙段 + 一关一半开两扇门板 ---------------------------
  ctx.wall({
    x: M.minX,
    z: M.gate.z,
    length: GATE_W,
    height: M.gate.structureHeight,
    thickness: M.wallThickness,
    material: 'concreteWall',
    holes: [{ at: DOOR_MIN_X - M.minX, width: DOOR_MAX_X - DOOR_MIN_X, from: 0, height: DOOR_HEIGHT }],
  });

  dark.box(0.14, DOOR_HEIGHT, 0.22, DOOR_MIN_X - 0.07, 0, DOOR_PLANE_Z); // 西门框
  dark.box(0.14, DOOR_HEIGHT, 0.22, DOOR_MAX_X + 0.07, 0, DOOR_PLANE_Z); // 东门框
  dark.box(DOOR_MAX_X - DOOR_MIN_X + 0.28, 0.14, 0.22, DOOR_GAP_CX, DOOR_HEIGHT + 0.07, DOOR_PLANE_Z);

  const rustLeaf = ctx.mb('rustMetal');
  buildDoorLeaf(rustLeaf, {
    hingeX: DOOR_MIN_X,
    hingeZ: DOOR_PLANE_Z,
    yaw: 0,
    width: CLOSED_LEAF_W,
    height: DOOR_HEIGHT,
    thickness: 0.16,
  });
  rustLeaf.finish();

  const grayLeaf = ctx.mb('paintedMetalGray');
  buildDoorLeaf(grayLeaf, {
    hingeX: DOOR_MAX_X,
    hingeZ: DOOR_PLANE_Z,
    yaw: OPEN_LEAF_YAW,
    width: OPEN_LEAF_W,
    height: DOOR_HEIGHT,
    thickness: 0.16,
  });
  grayLeaf.finish();

  // 门楣下沿的吊灯：道具灯体 + 自发光灯罩（真实点光见第 8 节）。
  ctx.prop('hangingLamp', DOOR_GAP_CX, DOOR_HEIGHT - 0.02, M.gate.z, { wet: true });
  const warmGlow = ctx.mb('lampWarm');
  warmGlow.sphere(0.09, DOOR_GAP_CX, DOOR_HEIGHT - 0.55, M.gate.z);
  warmGlow.finish();

  // ---- 5. 中轴排水沟：混凝土路缘 + 水面 + 铁格栅 -----------------------------
  const roadwork = ctx.mb('concrete');
  for (const side of [-1, 1]) {
    roadwork.box(0.12, M.channel.curbHeight, CHANNEL_LEN, side * CURB_X, 0, CHANNEL_CZ); // 沿 Z 通长路缘
    roadwork.box(0.4, SOUTH_POST_H, 0.4, side * (SOUTH_HALF + 0.2), 0, SOUTH_Z - 0.5); // 出口混凝土门柱
  }
  roadwork.finish();

  ctx.water(0, WATER_Y, CHANNEL_CZ, 1.0, CHANNEL_LEN);

  for (let i = 0; i < GRATE_COUNT; i += 1) {
    const z = GRATE_FROM_Z + ((GRATE_TO_Z - GRATE_FROM_Z) * i) / (GRATE_COUNT - 1);
    ctx.prop('gratePanel', 0, M.channel.curbHeight, z, {
      rotY: ctx.rng.range(-0.04, 0.04), // 长边横跨沟槽，轻微错位
      scale: [1.12, 1, 1],
      wet: true,
    });
  }

  // ---- 6. 矮墙后的掩体道具 --------------------------------------------------
  ctx.prop('woodCrate', -3.5, 0, 6.9, { rotY: 0.22, wet: true });
  ctx.prop('woodCrate', -3.42, 0.75, 6.98, { rotY: 0.5, wet: true });
  ctx.prop('woodCrate', -2.55, 0, 7.55, { rotY: -0.4, wet: true });
  ctx.prop('roadSignFallen', -1.6, 0, 7.9, { rotY: 1.35, wet: true });

  // ---- 7. 冷白壁灯（矮墙附近，配第 8 节的冷白点光） --------------------------
  dark.box(0.36, 0.06, 0.06, -(M.maxX - 0.18), LAMP_Y, LAMP_Z, { anchor: 'center' });
  dark.box(0.06, 0.3, 0.26, -(M.maxX - 0.03), LAMP_Y - 0.03, LAMP_Z, { anchor: 'center' });
  const coolGlow = ctx.mb('lampCool');
  coolGlow.cyl(0.16, 0.09, 0.16, 12, -(M.maxX - 0.34), LAMP_Y - 0.12, LAMP_Z, { anchor: 'center' });
  coolGlow.finish();

  dark.finish();

  // ---- 8. 灯光：门洞暖黄主光（1 盏真实光源，矮墙冷白壁灯只保留自发光灯罩） ----
  ctx.light({
    kind: 'point',
    position: [DOOR_GAP_CX, DOOR_HEIGHT - 0.55, M.gate.z + 0.3],
    color: 0xffb257,
    intensity: 18,
    distance: 16,
    decay: 1.5,
    anim: 'flicker',
    rate: 0.6,
  });

  // ---- 9. 墙面与地面贴花：铁门附近弹孔最密 ----------------------------------
  const wallFaceX = M.maxX - 0.015;
  for (const [z, y, size] of [[-8.4, 1.45, 1.1], [-7.1, 1.95, 0.9], [-5.6, 1.05, 1.2], [-3.3, 1.6, 1.0]]) {
    ctx.decal('bullets', -wallFaceX, y, z, { rotX: 0, rotY: Math.PI / 2, w: size, h: size });
  }
  for (const [z, y, size] of [[-8, 1.7, 1.0], [-6.4, 1.15, 1.15], [-4.8, 1.85, 0.9], [-2.6, 1.35, 1.05]]) {
    ctx.decal('bullets', wallFaceX, y, z, { rotX: 0, rotY: -Math.PI / 2, w: size, h: size });
  }
  // 门体两侧墙面再补两处，形成最密弹着区
  ctx.decal('bullets', -4.2, 1.5, M.gate.z + M.wallThickness / 2 - 0.015, { rotX: 0, w: 1.2, h: 1.2 });
  ctx.decal('bullets', 3.3, 2, M.gate.z + M.wallThickness / 2 - 0.015, { rotX: 0, rotY: 0.2, w: 1, h: 1 });
  ctx.decal('graffiti', -wallFaceX, 1.45, 2.4, { rotX: 0, rotY: Math.PI / 2, w: 2.4, h: 1.5 });
  ctx.decal('graffiti', wallFaceX, 1.35, 10.6, { rotX: 0, rotY: -Math.PI / 2, w: 2.2, h: 1.4 });
  ctx.decal('freight', wallFaceX, 1.95, -9.8, { rotX: 0, rotY: -Math.PI / 2, w: 1.5, h: 1 });
  // 铁门附近地面的大片弹痕
  ctx.decal('bullets', 1.8, 0.012, -4.4, { rotX: -Math.PI / 2, rotY: 0.5, w: 2.8, h: 2.8, opacity: 0.9 });
  // 矮墙顶部弹痕
  for (const x of [-3.8, -1.7, 0.4]) {
    ctx.decal('bullets', x, M.lowWall.height + 0.11, M.lowWall.z, { w: 0.8, h: 0.8, rotZ: ctx.rng.range(0, 3.14) });
  }

  // ---- 10. 滴水与水汽 -------------------------------------------------------
  ctx.fx.drip(1.05, DOOR_HEIGHT - 0.04, M.gate.z + 0.15, { rate: 1.6, length: 0.3, splash: true }); // 门楣下缘
  ctx.fx.drip(0.05, 1.5, -7.8, { rate: 1.8, length: 0.3, groundY: WATER_Y, splash: true }); // 沟面上方
  ctx.fx.drip(-0.05, 1.2, 5.6, { rate: 1.8, length: 0.3, groundY: WATER_Y, splash: true });
  for (const side of [-1, 1]) {
    ctx.fx.drip(side * (M.maxX - 0.02), M.wallHeight + 0.2, side < 0 ? 3.4 : -2.2, {
      rate: 1.6,
      length: 0.35,
      splash: true,
    });
  }
  ctx.fx.steam(-0.2, 0.3, -7.6, { size: 0.9, rate: 0.3, rise: 0.3 }); // 排水沟水汽
}
