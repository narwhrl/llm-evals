// B 包点（东北后街）：两层瓦楞铁皮屋（一层废弃门卫室 + 二层阳台高台架枪位 + 外侧消防梯）、
// 门前空地不规则掩体、转角老路灯与北侧围栏堆场。全区静态量体，真实光源 2 盏（路灯 + 破损日光灯）。
import { LAYOUT } from './layout.js';

export function buildBSite(ctx) {
  ctx.region('bSite');

  const B = LAYOUT.bSite;
  const H = B.house;
  const FRONT = B.frontDoor;
  const BACK = B.backDoor;
  const BAL = B.balcony;
  const ST = B.fireEscape;

  const HALF = H.wall / 2; // 0.14 半墙厚
  const FLOOR = H.groundY; // 3.1 一层顶板 / 二层楼面
  const ROOF = H.roofY; // 6.3 平屋顶
  const L2 = ROOF - FLOOR; // 3.2 二层高
  const OVER = 0.12; // 楼板带外挑
  const EAVE = 0.16; // 屋顶 / 阳台挑出
  const cx = (H.minX + H.maxX) / 2;
  const cz = (H.minZ + H.maxZ) / 2;
  const innerX0 = H.minX + HALF;
  const innerX1 = H.maxX - HALF;
  const innerZ0 = H.minZ + HALF;
  const innerZ1 = H.maxZ - HALF;
  const shellX0 = H.minX - HALF; // 外墙外皮
  const shellX1 = H.maxX + HALF;
  const shellZ0 = H.minZ - HALF;
  const shellZ1 = H.maxZ + HALF; // 南侧外皮，+Z 为其外法线
  const roofW = shellX1 - shellX0 + EAVE * 2;
  const roofD = shellZ1 - shellZ0 + EAVE * 2;

  const wetCorrugated = ctx.matWet('corrugated');
  const wetConcreteWall = ctx.matWet('concreteWall');

  // 室外表面换成带雨水下淌的湿材质：只换合并网格的材质，draw call 不变。
  const wetWall = (options) => {
    const mesh = ctx.wall(options);
    mesh.material = options.material === 'corrugated' ? wetCorrugated : wetConcreteWall;
    return mesh;
  };

  // ---- 1. 一层门卫室：四面瓦楞铁皮墙，南墙进门，南北与西墙开窗 ----
  const southWins = B.windows.filter((win) => win.facing === 'south');
  const westWins = B.windows.filter((win) => win.facing === 'west');

  wetWall({
    x: H.minX, z: H.maxZ, length: H.maxX - H.minX, height: FLOOR, thickness: H.wall,
    rotY: 0, material: 'corrugated',
    holes: [
      { at: FRONT.x - FRONT.width / 2 - H.minX, width: FRONT.width, from: 0, height: FRONT.height },
      ...southWins.map((win) => ({
        at: win.x - win.width / 2 - H.minX, width: win.width, from: win.sill, height: win.height,
      })),
    ],
  });
  wetWall({
    x: H.minX, z: H.minZ, length: H.maxZ - H.minZ, height: FLOOR, thickness: H.wall,
    rotY: -Math.PI / 2, material: 'corrugated',
    holes: westWins.map((win) => ({
      at: win.z - win.width / 2 - H.minZ, width: win.width, from: win.sill, height: win.height,
    })),
  });
  wetWall({
    x: H.minX, z: H.minZ, length: H.maxX - H.minX, height: FLOOR, thickness: H.wall,
    rotY: 0, material: 'corrugated',
    holes: [{ at: BACK.x - BACK.width / 2 - H.minX, width: BACK.width, from: 0, height: BACK.height }],
  });
  wetWall({
    x: H.maxX, z: H.maxZ, length: H.maxZ - H.minZ, height: FLOOR, thickness: H.wall,
    rotY: Math.PI / 2, material: 'corrugated',
  });

  // 门套 + 门槛（前门朝包点空地，后门朝北侧堆场）
  const doorCases = ctx.mb('rustMetal');
  const thresholds = ctx.mb('concreteDark');
  for (const door of [FRONT, BACK]) {
    const jamb = door.width / 2 + 0.045;
    doorCases.box(0.09, door.height, 0.44, door.x - jamb, 0, door.z);
    doorCases.box(0.09, door.height, 0.44, door.x + jamb, 0, door.z);
    doorCases.box(door.width + 0.27, 0.11, 0.44, door.x, door.height, door.z);
    thresholds.box(door.width + 0.18, 0.07, 0.52, door.x, 0, door.z);
  }
  doorCases.finish();
  thresholds.finish();

  // 墙根 0.3 高锈迹带：绕开门洞，避免整面铁皮过于干净
  const rustBase = ctx.mb('rustMetal');
  const BAND_H = 0.3;
  const BAND_T = H.wall + 0.06;
  const edgeX0 = shellX0 - 0.06;
  const edgeX1 = shellX1 + 0.06;
  const rustAlongX = (z, door) => {
    const gap0 = door.x - door.width / 2 - 0.06;
    const gap1 = door.x + door.width / 2 + 0.06;
    rustBase.box(gap0 - edgeX0, BAND_H, BAND_T, (edgeX0 + gap0) / 2, 0, z);
    rustBase.box(edgeX1 - gap1, BAND_H, BAND_T, (gap1 + edgeX1) / 2, 0, z);
  };
  rustAlongX(H.maxZ, FRONT);
  rustAlongX(H.minZ, BACK);
  for (const x of [H.minX, H.maxX]) {
    rustBase.box(BAND_T, BAND_H, H.maxZ - H.minZ + 0.12, x, 0, cz);
  }
  rustBase.finish();

  // 窗套 + 脏玻璃：facing 决定窗宽沿 X（南墙）还是沿 Z（西墙）
  const frames = ctx.mb('darkMetal');
  const panes = ctx.mb('glassDirty');
  const FRAME_T = 0.08;
  const FRAME_D = 0.42;
  for (const win of B.windows) {
    const y = win.sill;
    if (win.facing === 'south') {
      frames.box(FRAME_T, win.height, FRAME_D, win.x - win.width / 2 - FRAME_T / 2, y, win.z);
      frames.box(FRAME_T, win.height, FRAME_D, win.x + win.width / 2 + FRAME_T / 2, y, win.z);
      frames.box(win.width + FRAME_T * 2, 0.08, FRAME_D + 0.06, win.x, y - 0.08, win.z);
      frames.box(win.width + FRAME_T * 2, 0.08, FRAME_D, win.x, y + win.height, win.z);
      panes.box(win.width, win.height, 0.04, win.x, y, win.z);
    } else {
      frames.box(FRAME_D, win.height, FRAME_T, win.x, y, win.z - win.width / 2 - FRAME_T / 2);
      frames.box(FRAME_D, win.height, FRAME_T, win.x, y, win.z + win.width / 2 + FRAME_T / 2);
      frames.box(FRAME_D + 0.06, 0.08, win.width + FRAME_T * 2, win.x, y - 0.08, win.z);
      frames.box(FRAME_D, 0.08, win.width + FRAME_T * 2, win.x, y + win.height, win.z);
      panes.box(0.04, win.height, win.width, win.x, y, win.z);
    }
  }
  frames.finish();
  panes.finish();

  // ---- 2. 层间楼板带（外挑 0.12）与一层顶板：读得出两层关系 ----
  const ringT = H.wall + OVER + 0.06; // 0.46 带宽
  const ringX0 = shellX0 - OVER;
  const ringX1 = shellX1 + OVER;
  const ringZ0 = shellZ0 - OVER;
  const ringZ1 = shellZ1 + OVER;
  const bandY = FLOOR - 0.2;
  const floorBand = ctx.mb('rustMetal');
  floorBand.box(ringX1 - ringX0, 0.2, ringT, cx, bandY, ringZ0 + ringT / 2);
  floorBand.box(ringX1 - ringX0, 0.2, ringT, cx, bandY, ringZ1 - ringT / 2);
  for (const x of [ringX0 + ringT / 2, ringX1 - ringT / 2]) {
    floorBand.box(ringT, 0.2, ringZ1 - ringZ0 - ringT * 2, x, bandY, cz);
  }
  floorBand.finish();

  const holeX0 = ringX0 + ringT;
  const holeX1 = ringX1 - ringT;
  const holeZ0 = ringZ0 + ringT;
  const holeZ1 = ringZ1 - ringT;
  const ceiling = ctx.mb('rustMetal');
  ceiling.box(holeX1 - holeX0, 0.12, holeZ1 - holeZ0, cx, FLOOR - 0.12, cz);
  ceiling.finish();

  // ---- 3. 二层阁楼：封闭铁皮壳，只在阳台一侧留大开口 ----
  const bay = { x0: 16.6, x1: 27.4, top: 5.5 };
  const upper = ctx.mb('corrugated');
  upper.box(H.wall, L2, H.maxZ - H.minZ, H.minX, FLOOR, cz);
  upper.box(H.wall, L2, H.maxZ - H.minZ, H.maxX, FLOOR, cz);
  upper.box(H.maxX - H.minX - H.wall, L2, H.wall, cx, FLOOR, H.minZ);
  upper.box(bay.x0 - innerX0, L2, H.wall, (innerX0 + bay.x0) / 2, FLOOR, H.maxZ);
  upper.box(innerX1 - bay.x1, L2, H.wall, (bay.x1 + innerX1) / 2, FLOOR, H.maxZ);
  upper.box(bay.x1 - bay.x0, ROOF - bay.top, H.wall, (bay.x0 + bay.x1) / 2, bay.top, H.maxZ);
  upper.finish().material = wetCorrugated;

  // 平屋顶 + 0.2 高翻边 + 两个通风管
  const roof = ctx.mb('corrugated');
  roof.box(roofW, 0.16, roofD, cx, ROOF - 0.16, cz);
  roof.finish().material = wetCorrugated;
  const verge = ctx.mb('rustMetal');
  verge.box(roofW, 0.2, 0.1, cx, ROOF, cz - roofD / 2 + 0.05);
  verge.box(roofW, 0.2, 0.1, cx, ROOF, cz + roofD / 2 - 0.05);
  verge.box(0.1, 0.2, roofD - 0.2, cx - roofW / 2 + 0.05, ROOF, cz);
  verge.box(0.1, 0.2, roofD - 0.2, cx + roofW / 2 - 0.05, ROOF, cz);
  verge.finish();
  ctx.prop('ventPipe', 18.0, ROOF, -20.2);
  ctx.prop('ventPipe', 26.2, ROOF, -13.6);

  // ---- 4. 二层阳台：花纹钢板楼板 + 1.05 高护栏 + 2 根斜撑 ----
  const balZ0 = shellZ1 - 0.02; // 贴南墙外皮
  const balZ1 = balZ0 + BAL.depth; // 阳台外沿
  const balZc = (balZ0 + balZ1) / 2;
  const railY = FLOOR - 0.02; // 阳台面比室内低 2cm，门槛处形成挡水线
  const balcony = ctx.mb('checkeredPlate');
  balcony.box(roofW, 0.16, BAL.depth, cx, railY - 0.16, balZc);
  balcony.finish();

  for (let i = 0; i < 5; i += 1) {
    ctx.prop('railingSegment', 15.4 + i * 2.2, railY, balZ1 - 0.14, { wet: true });
  }
  ctx.prop('railingSegment', shellX0 - 0.12, railY, balZc, {
    rotY: Math.PI / 2, scale: [0.7, 1, 1], wet: true,
  });

  const braces = ctx.mb('rustMetal');
  for (const x of [16.6, 27.9]) {
    braces.ramp(0.14, x, 2.05, balZ0, x, FLOOR - 0.2, balZ1 - 0.06);
  }
  braces.finish();

  // ---- 5. 外侧消防梯：10 级踏步沿 +X 爬升到阳台东段开口 ----
  const STAIR_W = 1.1;
  const STEPS = 10;
  const stepRun = ST.run / STEPS;
  const stepRise = ST.rise / STEPS;
  const stairX0 = ST.x - ST.run / 2;
  const stairZ = balZ1 + 0.06 + STAIR_W / 2;
  const treads = ctx.mb('checkeredPlate');
  for (let i = 0; i < STEPS; i += 1) {
    treads.box(stepRun, 0.05, STAIR_W, stairX0 + stepRun * (i + 0.5), stepRise * (i + 1) - 0.05, stairZ);
  }
  treads.finish();

  // 斜梁与扶手：沿首末级踏面连线（与梯段同坡比），下端不切进地面
  const slope = Math.atan2(ST.rise, ST.run);
  const beamX0 = stairX0 + stepRun / 2;
  const beamX1 = stairX0 + stepRun * (STEPS - 0.5);
  const beamY0 = stepRise;
  const beamY1 = stepRise * STEPS;
  const beamLen = Math.hypot(beamX1 - beamX0, beamY1 - beamY0);
  const beamCx = (beamX0 + beamX1) / 2;
  const beamCy = (beamY0 + beamY1) / 2;
  const RAIL_H = 0.95;
  const steel = ctx.mb('darkMetal');
  for (const side of [-1, 1]) {
    const z = stairZ + side * (STAIR_W / 2 - 0.04);
    steel.box(beamLen, 0.28, 0.06, beamCx, beamCy, z, { rotZ: slope, anchor: 'center' });
    steel.box(beamLen, 0.06, 0.06, beamCx, beamCy + RAIL_H, z, { rotZ: slope, anchor: 'center' });
    for (const i of [0, 4, 9]) {
      steel.box(0.05, RAIL_H - 0.03, 0.05, stairX0 + stepRun * (i + 0.5), stepRise * (i + 1), z);
    }
  }
  steel.finish();
  const stairPad = ctx.mb('concrete');
  stairPad.box(1.5, 0.24, 1.4, stairX0 - 0.25, 0, stairZ);
  stairPad.finish();

  // ---- 6. 门卫室室内：从门窗能看清的废弃陈设 ----
  const floorPlate = ctx.mb('concreteFloor');
  floorPlate.box(innerX1 - innerX0 - 0.04, 0.02, innerZ1 - innerZ0 - 0.04, cx, 0, cz);
  floorPlate.finish();

  ctx.prop('desk', 17.6, 0.02, -14.5);
  ctx.prop('parcelBox', 17.15, 0.8, -14.35, { rotY: 0.3 });
  ctx.prop('officeChair', 19.3, 0.02, -14.55, { rotY: 0.9 });
  ctx.prop('locker', H.maxX - 0.45, 0.02, -19.5, { rotY: Math.PI / 2 });
  ctx.prop('console', 29.2, 0.02, -10.72, { rotY: Math.PI });
  for (let i = 0; i < 3; i += 1) {
    ctx.prop('cardboardBox', 14.55 + i * 0.1, 0.02 + i * 0.5, -23.4 + i * 0.06, { rotY: 0.32 - i * 0.24 });
  }

  const deskLamp = ctx.mb('lampOff');
  deskLamp.cyl(0.09, 0.09, 0.03, 10, 18.25, 0.8, -14.4);
  deskLamp.cyl(0.018, 0.018, 0.34, 6, 18.25, 0.83, -14.4);
  deskLamp.cyl(0.06, 0.15, 0.14, 10, 18.25, 1.15, -14.4, { openEnded: true });
  deskLamp.finish();

  // 破损日光灯：灯壳 + 自发光管体，旁边一根 lampOff 死管做对比
  const tubeY = 2.86;
  const housings = ctx.mb('darkMetal');
  const litTube = ctx.mb('lampWarm');
  const deadTube = ctx.mb('lampOff');
  const fixture = (x, z, glowing) => {
    housings.box(1.34, 0.06, 0.18, x, tubeY + 0.06, z);
    housings.box(1.42, 0.05, 0.06, x, tubeY + 0.11, z);
    (glowing ? litTube : deadTube).cyl(0.052, 0.052, 1.2, 10, x, tubeY, z, {
      anchor: 'center', rotZ: Math.PI / 2,
    });
    ctx.prop('fluorescentTube', x, tubeY, z);
  };
  fixture(17.8, -14.5, true);
  fixture(21.9, -15.4, false);
  housings.finish();
  litTube.finish();
  deadTube.finish();

  // 旧值班表 + 室内涂鸦
  ctx.decal('roster', 14.17, 1.75, -17.6, { rotX: 0, rotY: Math.PI / 2, w: 0.6, h: 0.8 });
  ctx.decal('graffiti', 19.8, 1.6, -23.83, { rotX: 0, w: 1.2, h: 0.9 });

  // 西墙上部通风口（白汽由此排出）
  const louver = ctx.mb('darkMetal');
  louver.box(0.18, 0.34, 0.5, H.minX - HALF + 0.04, 2.4, -19.6);
  louver.finish();

  // ---- 7. 门前空地：围绕包点喷漆的不规则掩体 ----
  ctx.prop('dumpster', 15.55, 0, -8.9, { rotY: 0.06, wet: true });
  ctx.prop('bicycle', 15.35, 0, -6.1, { rotY: -1.15, wet: true });
  ctx.prop('binBag', 16.4, 0, -5.5, { rotY: 0.5 });
  ctx.prop('pallet', 16.6, 0, -7.6, { rotY: 0.3, wet: true });
  ctx.prop('pallet', 21.2, 0, -6.3, { rotY: -0.24, wet: true });
  ctx.prop('tableFlipped', 18.0, 0, -5.5, { rotY: 0.75, wet: true });
  ctx.prop('chairFlipped', 17.1, 0, -5.9, { rotY: 2.3, wet: true });
  ctx.prop('chairFlipped', 19.1, 0, -5.35, { rotY: -0.5, wet: true });
  ctx.prop('gasBottle', 18.3, 0, -9.35, { rotY: 0.2 });
  ctx.prop('barrelRust', 16.9, 0, -9.5, { rotY: 0, wet: true });
  ctx.prop('barrelBlue', 20.9, 0, -9.4, { rotY: 0, wet: true });
  ctx.prop('barrelRust', 22.6, 0, -8.5, { rotY: 0, wet: true });
  ctx.prop('barrelBlue', 23.1, 0, -7.3, { rotY: 0, wet: true });
  ctx.prop('cardboardBox', 24.0, 0, -8.1, { rotY: 0.35 });
  ctx.prop('cardboardBox', 24.2, 0, -9.1, { rotY: -0.2 });
  ctx.prop('tire', 19.7, 0, -6.5, { rotY: 0.6, wet: true });
  ctx.prop('plank', 20.4, 0, -6.9, { rotY: 0.18, wet: true });
  ctx.prop('plank', 21.0, 0, -9.6, { rotY: -0.35, wet: true });
  ctx.prop('binBag', 21.9, 0, -8.9, { rotY: 0.2 });
  ctx.prop('trashCan', 23.4, 0, -6.7, { rotY: 0.3, wet: true });

  // 包点喷漆 + 旁边一小块弹痕 + 地面货运编号
  ctx.decal('siteB', B.siteMark.x, 0.03, B.siteMark.z, { rotX: -Math.PI / 2, w: 4.4, h: 4.4 });
  ctx.decal('bullets', 20.4, 0.035, -6.4, { rotX: -Math.PI / 2, w: 1.2, h: 1.2, rotZ: 0.35 });
  ctx.decal('freight', 21.8, 0.032, -8.9, { rotX: -Math.PI / 2, w: 1.8, h: 1.1, rotZ: -0.3 });

  // 外墙涂鸦 / 货运编号 / 弹痕（南面、西面与阳台下方）
  ctx.decal('graffiti', 20.8, 1.5, shellZ1 + 0.03, { rotX: 0, w: 1.5, h: 1 });
  ctx.decal('freight', 25.6, 1.9, shellZ1 + 0.03, { rotX: 0, w: 1.4, h: 0.9 });
  ctx.decal('graffiti', 16.4, 2.35, shellZ1 + 0.03, { rotX: 0, w: 1.1, h: 0.75 });
  ctx.decal('graffiti', shellX0 - 0.01, 1.4, -19.4, { rotX: 0, rotY: -Math.PI / 2, w: 1.4, h: 1 });
  ctx.decal('bullets', 19.2, 1.9, shellZ1 + 0.03, { rotX: 0, w: 0.9, h: 0.9 });
  ctx.decal('bullets', shellX0 - 0.01, 2.2, -12.6, { rotX: 0, rotY: -Math.PI / 2, w: 0.9, h: 0.9 });
  ctx.decal('bullets', shellX1 + 0.01, 1.7, -13.5, { rotX: 0, rotY: Math.PI / 2, w: 0.9, h: 0.9 });

  // ---- 8. 转角老式路灯：暖黄光晕 + 仪表箱 + 灯下散件 ----
  const LAMP = B.lamp;
  const headX = LAMP.x + 1.3;
  const pole = ctx.mb('darkMetal');
  pole.cyl(0.075, 0.095, 4.5, 10, LAMP.x, 0, LAMP.z);
  pole.box(1.5, 0.09, 0.09, LAMP.x + 0.72, 4.41, LAMP.z);
  pole.ramp(0.07, LAMP.x + 0.08, 3.9, LAMP.z, LAMP.x + 1.0, 4.41, LAMP.z);
  pole.cyl(0.075, 0.3, 0.26, 12, headX, 4.15, LAMP.z, { openEnded: true });
  pole.finish();
  const bulb = ctx.mb('lampWarm');
  bulb.sphere(0.22, headX, 3.98, LAMP.z);
  bulb.sphere(0.11, headX, 4.16, LAMP.z);
  bulb.finish();
  const pedestal = ctx.mb('concrete');
  pedestal.cyl(0.34, 0.36, 0.1, 12, LAMP.x, 0, LAMP.z);
  pedestal.cyl(0.22, 0.24, 0.26, 12, LAMP.x, 0, LAMP.z);
  pedestal.finish();
  const meterBox = ctx.mb('paintedMetalGray');
  meterBox.box(0.34, 0.5, 0.22, LAMP.x + 0.27, 0.45, LAMP.z);
  meterBox.box(0.05, 0.45, 0.05, LAMP.x + 0.12, 0, LAMP.z);
  meterBox.finish();
  ctx.decal('graffiti', LAMP.x + 0.46, 0.72, LAMP.z, { rotX: 0, rotY: Math.PI / 2, w: 0.3, h: 0.22 });
  ctx.prop('trashCan', 10.95, 0, -5.7, { rotY: 0.35, wet: true });
  ctx.prop('newsPile', 10.15, 0, -7.0, { rotY: 0.3 });

  // ---- 9. 转角矮墙：墙后（+Z 侧）留出通往 CT 的通道 ----
  const CW = B.cornerWall;
  wetWall({
    x: CW.minX, z: CW.z, length: CW.maxX - CW.minX, height: CW.height, thickness: CW.thickness,
    rotY: 0, material: 'concreteWall',
  });
  for (const [x, w] of [[10.3, 0.7], [12.1, 0.6]]) {
    ctx.decal('bullets', x, 0.85, CW.z - CW.thickness / 2 - 0.02, { rotX: 0, rotY: Math.PI, w, h: w });
  }
  ctx.prop('bollard', CW.maxX + 0.4, 0, CW.z, { wet: true });

  // ---- 10. 北侧堆场：料堆 + 集装箱，用围栏与后街隔开（留 2.2 宽缺口）----
  ctx.prop('pipeStack', 17.6, 0, -28.5, { rotY: 0, wet: true });
  ctx.prop('pipeStack', 18.3, 0, -27.1, { rotY: 0.14, wet: true });
  ctx.prop('containerGreen', 24.2, 0, -28.0, { rotY: 0, wet: true });
  ctx.prop('woodCrate', 15.5, 0, -26.3, { rotY: 0.22 });
  ctx.prop('woodCrate', 15.5, 0.75, -26.3, { rotY: -0.15 });
  ctx.prop('woodCrate', 16.6, 0, -27.6, { rotY: -0.3 });
  ctx.prop('woodCrateTall', 29.3, 0, -29.6, { rotY: 0.12 });
  ctx.prop('woodCrateLong', 28.9, 0, -25.6, { rotY: 0.4 });
  ctx.prop('cableSpool', 29.0, 0, -26.8, { rotY: 0.5 });
  ctx.prop('roadSign', 22.4, 0, -25.5, { rotY: 0.45, wet: true });
  ctx.prop('barrelRust', 26.6, 0, -25.3, { rotY: 0, wet: true });
  ctx.prop('barrelRust', 27.2, 0, -26.0, { rotY: 0, wet: true });

  const fenceX = H.minX + 0.2; // 堆场西缘围栏线
  for (const z of [-30.4, -29.5, -28.6, -26.4, -25.5, -24.6]) {
    ctx.prop('fencePost', fenceX, 0, z, { rotY: Math.PI / 2, wet: true });
  }
  const fenceWire = ctx.mb('wire');
  for (const zc of [-29.5, -25.5]) {
    fenceWire.box(0.04, 0.04, 1.8, fenceX, 1.62, zc);
    fenceWire.box(0.04, 0.04, 1.8, fenceX, 1.0, zc);
  }
  fenceWire.finish();
  for (const z of [-30.0, -29.1, -25.9, -25.0]) {
    ctx.prop('barbedCoil', fenceX, 1.55, z, { rotZ: Math.PI / 2, wet: true });
  }

  // ---- 11. 灯光：本区仅 2 盏真实光源 ----
  ctx.light({
    kind: 'point',
    position: [headX, 4.05, LAMP.z],
    color: 0xffb257,
    intensity: 22,
    distance: 18,
    decay: 1.5,
    anim: 'flickerSoft',
    rate: 0.8,
  });
  ctx.light({
    kind: 'point',
    position: [17.8, tubeY - 0.12, -14.5],
    color: 0xffd9a0,
    intensity: 14,
    distance: 11,
    decay: 1.5,
    anim: 'flicker',
    rate: 0.75,
  });

  // ---- 12. 湿气与白汽：阳台外沿、梯踏、屋檐、门框上沿滴水 ----
  const drips = [
    [18.4, railY - 0.02, balZ1 + 0.02, 1.4],
    [24.9, railY - 0.02, balZ1 + 0.02, 1.2],
    [stairX0 + stepRun * 2.5, stepRise * 3, stairZ + STAIR_W / 2, 1.1],
    [21.0, ROOF - 0.02, cz + roofD / 2 - 0.02, 1.3],
    [FRONT.x - 0.55, FRONT.height + 0.11, shellZ1 + 0.02, 1.6],
    [BACK.x + 0.5, BACK.height + 0.11, shellZ0 - 0.02, 1.0],
  ];
  for (const [x, y, z, rate] of drips) {
    ctx.fx.drip(x, y, z, { rate, length: 0.3, splash: true });
  }
  ctx.fx.steam(18.0, ROOF + 1.72, -20.2, { size: 1.2, rate: 0.35, rise: 0.4, drift: [0.16, 0.06], life: 5.2 });
  ctx.fx.steam(H.minX - HALF - 0.06, 2.6, -19.6, {
    size: 1.2, rate: 0.35, rise: 0.4, drift: [-0.26, 0.08], life: 5.2,
  });
}
