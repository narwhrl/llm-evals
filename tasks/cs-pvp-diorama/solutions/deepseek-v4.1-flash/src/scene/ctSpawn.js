// CT 阵营出生点（地图南侧警用封锁区）：
// 拒马路障 + 警用盾牌阵、左侧警用面包车（车顶红蓝警灯）、右侧混凝土高台（室外楼梯 + 探照灯）、
// 后方围墙细节与贴花、出生点掩体与西→东行进铺装带。
// 坐标：北 = -Z，东 = +X，地面 y = 0，全部内容落在 LAYOUT.ctSpawn.rect 内，且不含任何人物网格。

export function buildCTSpawn(ctx) {
  ctx.region('ctSpawn');

  const CT = ctx.LAYOUT.ctSpawn;
  const VAN = CT.van;
  const P = CT.platform;
  const deckY = P.height;

  // ---- 静态量体按材质分组：同材质合并进同一个 MeshBuilder ----
  const carBody = ctx.mb('paintedMetalWhite'); // 警车车身
  const metal = ctx.mb('paintedMetalGray'); // 车身裙边、台顶护栏、楼梯扶手
  const darkMetal = ctx.mb('darkMetal'); // 保险杠、格栅、通道口灯杆
  const glass = ctx.mb('glassDirty'); // 车窗、前灯罩
  const concrete = ctx.mb('concreteWall'); // 高台台体、室外楼梯踏步
  const paved = ctx.mb('concreteFloor'); // 台顶面、行进铺装带
  const trim = ctx.mb('concreteDark'); // 墙根踢脚、台体西侧凹槽
  const glowCool = ctx.mb('lampCool'); // 探照灯灯罩、通道口灯罩
  const lensRed = ctx.mb('lampRed');
  const lensBlue = ctx.mb('lampBlue');

  // ---- 混凝土高台：侧墙 + 台顶面 + 西侧凹槽装饰带 ----
  const pw = P.maxX - P.minX;
  const pd = P.maxZ - P.minZ;
  const pcx = (P.minX + P.maxX) / 2;
  const pcz = (P.minZ + P.maxZ) / 2;
  concrete.box(pw, deckY - 0.12, pd, pcx, 0, pcz, { anchor: 'bottom' });
  paved.box(pw + 0.08, 0.12, pd + 0.08, pcx, deckY - 0.12, pcz, { anchor: 'bottom' });
  trim.box(0.14, deckY - 0.24, 0.4, P.minX - 0.02, 0.12, 27, { anchor: 'bottom' });

  // 台顶护栏：轴对齐直线段，立柱间距约 1.5，上中两道横杆（栏高 1.05）
  const railing = (x1, z1, x2, z2) => {
    const alongX = Math.abs(x2 - x1) >= Math.abs(z2 - z1);
    const length = alongX ? Math.abs(x2 - x1) : Math.abs(z2 - z1);
    const count = Math.max(2, Math.round(length / 1.5) + 1);
    for (let i = 0; i < count; i += 1) {
      const t = i / (count - 1);
      metal.box(0.075, 1.05, 0.075, x1 + (x2 - x1) * t, deckY, z1 + (z2 - z1) * t, { anchor: 'bottom' });
    }
    const cx = (x1 + x2) / 2;
    const cz = (z1 + z2) / 2;
    metal.box(alongX ? length + 0.07 : 0.07, 0.07, alongX ? 0.07 : length + 0.07, cx, deckY + 1.02, cz, { anchor: 'center' });
    metal.box(alongX ? length : 0.05, 0.05, alongX ? 0.05 : length, cx, deckY + 0.56, cz, { anchor: 'center' });
  };
  railing(P.minX + 0.05, P.minZ + 0.05, P.maxX - 0.05, P.minZ + 0.05); // 北侧（俯瞰中路入口）
  railing(P.maxX - 0.05, P.minZ + 0.05, P.maxX - 0.05, P.maxZ - 0.05); // 东侧
  railing(P.minX + 0.05, P.maxZ - 0.05, P.maxX - 0.05, P.maxZ - 0.05); // 南侧
  railing(P.minX + 0.05, 24.3, P.minX + 0.05, P.maxZ - 0.05); // 西侧（楼梯口以南留空）

  // ---- 室外楼梯：10 级踏步、实心到地，行程 4.4 升高 2.6，顶部与台面齐平 ----
  const steps = 10;
  const stepRise = CT.stairs.rise / steps;
  const stepRun = CT.stairs.run / steps;
  // LAYOUT.stairs 给的是楼梯顶（即高台西缘）；踏步自西向东（+X）升起。
  const footX = CT.stairs.x - CT.stairs.run;
  for (let i = 0; i < steps; i += 1) {
    concrete.box(stepRun, (i + 1) * stepRise, 1.24, footX + stepRun * (i + 0.5), 0, CT.stairs.z, { anchor: 'bottom' });
  }
  // 两侧 0.9 高扶手：立柱落在踏步面上，顶部横杆顺坡度倾斜
  const treadY = (x) => {
    const i = Math.min(steps - 1, Math.max(0, Math.floor((x - footX) / stepRun)));
    return (i + 1) * stepRise;
  };
  for (const side of [-1, 1]) {
    const rz = CT.stairs.z + side * 0.62;
    const xs = [0.15, 1.5, 2.85, 4.2].map((offset) => footX + offset);
    for (const x of xs) metal.cyl(0.035, 0.035, 0.9, 6, x, treadY(x), rz, { anchor: 'bottom' });
    const ya = treadY(xs[0]) + 0.9;
    const yb = treadY(xs[3]) + 0.9;
    metal.box(Math.hypot(xs[3] - xs[0], yb - ya), 0.07, 0.07, (xs[0] + xs[3]) / 2, (ya + yb) / 2, rz, {
      anchor: 'center',
      rotZ: Math.atan2(yb - ya, xs[3] - xs[0]),
    });
  }

  // ---- 探照灯：灯头罩朝中路（-Z），自发光代替近距离补光 ----
  const lampHeadY = CT.searchlight.y + 1.35;
  glowCool.cyl(0.3, 0.3, 0.02, 16, CT.searchlight.x, lampHeadY, CT.searchlight.z - 0.12, { anchor: 'center', rotX: -Math.PI / 2 });
  glowCool.cyl(0.2, 0.2, 0.05, 14, CT.searchlight.x, lampHeadY, CT.searchlight.z - 0.19, { anchor: 'center', rotX: -Math.PI / 2 });

  // ---- 警用面包车：长 4.8 沿 X、宽 2.0 沿 Z、高 2.15，车头朝 -X ----
  // LAYOUT.van.rotY = -PI/2 表示车身本地长轴为 Z；把本地长轴 X 转到世界 X 后即下列世界坐标。
  const vx = VAN.x;
  const vz = VAN.z;
  const roofY = 2.16;
  carBody.box(4.3, 1.44, 2, vx + 0.02, 0.66, vz, { anchor: 'bottom' });
  carBody.box(0.3, 0.86, 1.92, vx - 2.24, 0.66, vz, { anchor: 'bottom' });
  carBody.box(4.34, 0.06, 2.04, vx + 0.02, 2.1, vz, { anchor: 'bottom' });
  metal.box(4.44, 0.32, 1.94, vx, 0.3, vz, { anchor: 'bottom' });
  metal.box(3.6, 0.06, 2.02, vx + 0.5, 1.16, vz, { anchor: 'center' });
  darkMetal.box(4.3, 0.12, 1.5, vx, 0.18, vz, { anchor: 'bottom' });
  darkMetal.box(0.18, 0.26, 2, vx - 2.31, 0.44, vz, { anchor: 'bottom' });
  darkMetal.box(0.18, 0.24, 2, vx + 2.31, 0.44, vz, { anchor: 'bottom' });
  darkMetal.box(0.06, 0.3, 1.5, vx - 2.4, 1.05, vz, { anchor: 'bottom' });
  glass.box(0.06, 0.64, 1.7, vx - 2.02, 1.5, vz, { anchor: 'bottom', rotZ: -0.28 });
  glass.box(0.9, 0.46, 0.05, vx - 1.5, 1.4, vz - 0.99, { anchor: 'bottom' });
  glass.box(0.9, 0.46, 0.05, vx - 1.5, 1.4, vz + 0.99, { anchor: 'bottom' });
  glass.box(0.05, 0.2, 0.36, vx - 2.4, 1.14, vz - 0.62, { anchor: 'bottom' });
  glass.box(0.05, 0.2, 0.36, vx - 2.4, 1.14, vz + 0.62, { anchor: 'bottom' });
  for (const wx of [-1.62, 1.5]) {
    for (const wz of [-0.88, 0.88]) ctx.prop('tire', vx + wx, 0, vz + wz, { wet: true });
  }
  // 车顶警灯：横杆 + 红蓝半球灯罩（自发光交替由 lightRig 驱动）
  ctx.prop('beaconBar', vx, roofY, vz);
  lensRed.sphere(0.11, vx - 0.3, roofY + 0.19, vz, { anchor: 'center' });
  lensBlue.sphere(0.11, vx + 0.3, roofY + 0.19, vz, { anchor: 'center' });
  ctx.registerEmissive(ctx.mat('lampRed'), 'beacon', { index: 0 });
  ctx.registerEmissive(ctx.mat('lampBlue'), 'beacon', { index: 1 });

  // ---- 后方围墙墙根踢脚带（墙体由街道模块建，这里只做贴墙细节）----
  trim.box(25, 0.3, 0.12, -1, 0, CT.backWall.z - 0.3, { anchor: 'bottom' });

  // ---- 中路南端通道口灯杆：细杆 + 悬臂灯头 + 冷白灯罩 ----
  darkMetal.cyl(0.055, 0.055, 2.4, 8, 2.35, 0, 18.15, { anchor: 'bottom' });
  darkMetal.box(0.5, 0.06, 0.06, 2.1, 2.36, 18.15, { anchor: 'bottom' });
  darkMetal.box(0.34, 0.16, 0.3, 1.87, 2.24, 18.15, { anchor: 'bottom' });
  glowCool.box(0.28, 0.06, 0.24, 1.87, 2.18, 18.15, { anchor: 'bottom' });

  // ---- 出生点行进铺装带：连接西侧出口与东侧出口的浅色混凝土带（高 0.05）----
  paved.box(25, 0.05, 1.6, -1.5, 0, 18.8, { anchor: 'bottom' });

  carBody.finish();
  metal.finish();
  darkMetal.finish();
  glass.finish({ castShadow: false, receiveShadow: false });
  concrete.finish();
  paved.finish();
  trim.finish();
  glowCool.finish({ castShadow: false, receiveShadow: false });
  lensRed.finish({ castShadow: false, receiveShadow: false });
  lensBlue.finish({ castShadow: false, receiveShadow: false });

  // ---- 拒马路障阵：沿 barrierZ 前后两排交错成锯齿线，从 barrierFromX 到 barrierToX，
  // 中间 -3.9～-2.3 留 1.6 宽通道（前排 z=20.88、后排 z=21.55，单件长约 1.6）----
  const barrierRowFront = 20.88;
  const barrierRowBack = 21.55;
  const barriers = [
    [-7.66, barrierRowFront, 0.13],
    [-6.69, barrierRowBack, -0.13],
    [-5.72, barrierRowFront, 0.13],
    [-4.74, barrierRowBack, -0.13],
    [-1.46, barrierRowFront, 0.13],
    [-0.49, barrierRowBack, -0.13],
    [0.48, barrierRowFront, 0.13],
    [1.45, barrierRowBack, -0.13],
  ];
  for (const [bx, bz, rotY] of barriers) ctx.prop('barrier', bx, 0, bz, { rotY, wet: true });

  // 前排警用盾牌（盾面朝北 -Z）与盾后沙袋堆
  const shields = [
    [-6.6, 20.16, 0.2],
    [-6.0, 20.1, -0.16],
    [-5.4, 20.18, 0.12],
    [-4.8, 20.12, -0.22],
  ];
  for (const [sx, sz, rotY] of shields) ctx.prop('shield', sx, 0, sz, { rotY });
  for (const [px, pz] of [[-6.6, 22.4], [-5.4, 22.4]]) {
    for (let i = 0; i < 3; i += 1) {
      ctx.prop('sandbag', px - 0.34 + i * 0.34, 0, pz, { rotY: 0.14 * (i - 1) });
    }
    ctx.prop('sandbag', px, 0.13, pz, { rotY: 1.25, scale: 0.9 });
  }
  ctx.prop('trafficCone', -8.9, 0, 21.7);
  ctx.prop('trafficCone', 2.9, 0, 20.5);
  ctx.prop('tire', 2.7, 0, 21.9, { rotY: 0.4 });
  ctx.prop('newsPile', -8.9, 0, 22.3, { rotY: 0.3 });

  // ---- 台顶掩体与设备 ----
  ctx.prop('woodCrate', 4.9, deckY, 25.4, { rotY: 0.3 });
  ctx.prop('woodCrateTall', 5.85, deckY, 26.45, { rotY: -0.15 });
  ctx.prop('sandbag', 9.5, deckY, 22.9, { rotY: 0.2 });
  ctx.prop('sandbag', 9.9, deckY, 23.02, { rotY: -0.3 });
  ctx.prop('console', 10.5, deckY, 26.6, { rotY: -0.5 });
  ctx.prop('searchlightRig', CT.searchlight.x, deckY, CT.searchlight.z, { rotY: Math.PI });

  // ---- 出生点地面掩体与杂物 ----
  ctx.prop('woodCrateLong', -8.4, 0, 23.5, { rotY: 0.35 });
  ctx.prop('pallet', -10.2, 0, 21.9, { rotY: -0.25 });
  ctx.prop('woodCrate', -13.5, 0, 28.7, { rotY: 0.2 });
  ctx.prop('pallet', -1, 0, 26.6, { rotY: 0.9 });
  ctx.prop('woodCrate', 0.8, 0, 27.8, { rotY: -0.45 });
  ctx.prop('woodCrateTall', -2.2, 0, 27.6, { rotY: 0.15 });
  ctx.prop('barrelBlue', -14.6, 0, 20.4, { wet: true });
  ctx.prop('barrelBlue', -14.15, 0, 21.25, { wet: true });
  ctx.prop('dumpster', 10.5, 0, 20.3, { rotY: 0.12, wet: true });
  ctx.prop('trashCan', -7.6, 0, 30.15, { wet: true });
  ctx.prop('trashCan', 3, 0, 19.3, { wet: true });
  ctx.prop('roadSignFallen', -5.3, 0, 24.3, { rotY: 0.65, wet: true });

  // ---- 后方备用防弹衣箱与纸箱 ----
  ctx.prop('armorCrate', CT.armorCrates[0].x, 0, CT.armorCrates[0].z, { rotY: 0.1, wet: true });
  ctx.prop('armorCrate', CT.armorCrates[1].x, 0, CT.armorCrates[1].z, { rotY: -0.12, wet: true });
  ctx.prop('cardboardBox', -5, 0, 29.1, { rotY: 0.5 });
  ctx.prop('cardboardBox', -2.4, 0, 30.1, { rotY: -0.3 });

  // ---- 中路南端半掩通道口：两个水泥隔离墩 + 一个斜置拒马 ----
  ctx.prop('concreteBlock', -1.6, 0, 18.35, { wet: true });
  ctx.prop('concreteBlock', 1.6, 0, 18.35, { wet: true });
  ctx.prop('barrier', 0.2, 0, 18.85, { rotY: 1.35, wet: true });

  // ---- 贴花 ----
  const wallFaceZ = CT.backWall.z - 0.45;
  const wallDecal = { rotX: 0, rotY: Math.PI };
  ctx.decal('graffiti', vx + 0.6, 1.15, vz - 1.02, { ...wallDecal, w: 1.6, h: 1.2 });
  ctx.decal('bullets', vx + 1.7, 1.55, vz - 1.02, { ...wallDecal, w: 0.9, h: 0.9 });
  ctx.decal('graffiti', 6.2, 1.4, P.minZ - 0.06, { ...wallDecal, w: 2, h: 1.4 });
  ctx.decal('bullets', 9.3, 1.8, P.minZ - 0.06, { ...wallDecal, w: 0.9, h: 0.9 });
  ctx.decal('bullets', P.minX - 0.06, 1.5, 25.4, { rotX: 0, rotY: -Math.PI / 2, w: 0.8, h: 0.8 });
  ctx.decal('bullets', -4.6, 0.012, 23.2, { w: 1.3, h: 1.3 });
  ctx.decal('badge', -1.6, 1.75, wallFaceZ, { ...wallDecal, w: 2.4, h: 2 });
  ctx.decal('warning', 2.8, 1.35, wallFaceZ, { ...wallDecal, w: 3, h: 1.4 });
  ctx.decal('freight', -10.6, 1.35, wallFaceZ, { ...wallDecal, w: 2, h: 1.5 });
  ctx.decal('graffiti', -13.4, 1.15, wallFaceZ, { ...wallDecal, w: 1.9, h: 1.3 });
  ctx.decal('graffiti', 7.8, 1.2, wallFaceZ, { ...wallDecal, w: 1.7, h: 1.2 });

  // ---- 灯光：本区域上限 3 盏真实光源（警灯 + 探照灯 + 通道口灯）----
  ctx.light({
    kind: 'point',
    position: [vx, roofY + 0.6, vz],
    color: 0xff2a1c,
    intensity: 4,
    distance: 8,
    decay: 1.8,
    anim: 'beacon',
  });
  ctx.light({
    kind: 'spot',
    position: [CT.searchlight.x, 3.3, CT.searchlight.z],
    color: 0xd8ecff,
    intensity: 45,
    distance: 40,
    angle: 0.42,
    penumbra: 0.6,
    decay: 1.5,
    target: [0, 0, 12],
    anim: 'sweepYaw',
    pivot: [CT.searchlight.x, 3.3, CT.searchlight.z],
    radius: 0.2,
    speed: 0.28,
    span: 0.5,
    targetDistance: 20,
  });
  // 通道口只保留自发光灯具与灯柱，不再单独占用一盏真实光源
  const corridorLamp = ctx.mb('lampCool');
  corridorLamp.cyl(0.2, 0.1, 0.22, 12, 1.9, 2.1, 18.1, { anchor: 'bottom' });
  corridorLamp.finish({ castShadow: false, receiveShadow: false });

  // ---- 滴水与水汽 ----
  const drip = (x, y, z, rate) => ctx.fx.drip(x, y, z, { rate, length: 0.28, groundY: 0, splash: true });
  drip(5.4, deckY, P.minZ + 0.02, 1.3); // 高台北缘
  drip(10.6, deckY, P.minZ + 0.02, 1.1);
  drip(vx - 2.3, roofY, vz - 1, 1.4); // 车顶边缘
  drip(vx + 2.3, roofY, vz - 1, 1.2);
  for (const [bx, bz] of [barriers[0], barriers[6]]) drip(bx, 0.98, bz, 1.5); // 路障顶端
  ctx.fx.steam(vx + 2.36, 0.5, vz + 0.5, { size: 1, rate: 0.3, rise: 0.35, drift: [0.18, 0.42], life: 5.2 });
}
