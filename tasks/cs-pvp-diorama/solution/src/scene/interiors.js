// 室内与岗亭：中路两侧废弃岗亭（控制台、翻倒座椅、雨痕玻璃）与西南角两层混凝土小楼的
// 内部陈设、照明、外墙开口与檐口滴水。静态量体按材质合并，重复道具走实例化批次，无逐帧代码。
import { LAYOUT } from './layout.js';

// ---- 岗亭尺寸：LAYOUT.mid.booths 只给中心与朝向（本地 +Z 为正面，朝中路）----
const BOOTH = {
  body: 2.6,            // 亭身外廓
  height: 2.6,          // 墙高
  wall: 0.16,           // 墙厚
  plinth: 0.16,         // 基座高
  plinthOut: 0.15,      // 基座外扩
  roof: 0.18,           // 平屋顶厚
  roofOut: 0.2,         // 屋檐外挑
  sill: 0.9,            // 窗台高（即窗下墙裙高度）
  windowHeight: 1.45,   // 洞口高
  windowRail: 0.06,     // 窗框料截面
  glass: 0.05,          // 玻璃薄板厚
  post: 0.1,            // 角柱截面
  postOut: 0.04,        // 角柱与踢脚外挑墙面的量
  kick: 0.25,           // 踢脚高
  frontAt: [0.3, 1.35], // 正面两扇窗的洞口起点（沿 2.6 墙长）
  frontWidth: 0.95,
  sideLength: 2.28,     // 侧墙长
  sideAt: 0.49,         // 侧面窗洞起点
  sideWidth: 1.3,
};

// ---- 街区建筑尺寸：外轮廓见 LAYOUT.routes.southWestBlock ----
const BLOCK = {
  wall: 0.5,
  parapet: 0.25,        // 女儿墙高
  deck: 0.16,           // 屋面板厚
  floorY: 0.02,         // 室内地坪
  sill: 1.0,
  windowWidth: 1.4,
  windowHeight: 1.2,
  shutter: { centerZ: 6, width: 3.2, height: 3, openFrom: 2.2, slat: 0.15, gap: 0.01, thickness: 0.22 },
  rollBox: { depth: 0.6, height: 0.3, span: 3.3 },
  door: { centerX: -18.6, width: 1.2, height: 2.2, swing: 0.6, jamb: 0.08, leaf: 0.08 },
  eastWindows: [2.4, 9.6],
  southWindows: [-26.5, -21.5],
  skylight: { minX: -22, maxX: -18, minZ: 3.6, maxZ: 6.6 },  // 4 × 3 天窗洞口
  roofVents: [[-27, 3.1], [-25.6, 9.2]],
  acUnits: [[-20.5, 1.5, 0], [-19.5, 1.5, 0], [-20, 2.5, Math.PI]],
};

// ---- 岗亭本地坐标工具 ----

// 岗亭本地坐标 → 世界坐标。
function boothPoint(booth, lx, lz) {
  const cos = Math.cos(booth.rotY);
  const sin = Math.sin(booth.rotY);
  return { x: booth.x + lx * cos + lz * sin, z: booth.z - lx * sin + lz * cos };
}

// 岗亭本地盒体：rotY 为相对亭身朝向的额外偏转。
function boothBox(builder, booth, w, h, d, lx, y, lz, options = {}) {
  const point = boothPoint(booth, lx, lz);
  return builder.box(w, h, d, point.x, y, point.z, { ...options, rotY: (options.rotY ?? 0) + booth.rotY });
}

// 岗亭本地球体（灯罩）。
function boothSphere(builder, booth, radius, lx, y, lz) {
  const point = boothPoint(booth, lx, lz);
  return builder.sphere(radius, point.x, y, point.z);
}

// 岗亭道具。
function boothProp(ctx, booth, type, lx, y, lz, options = {}) {
  const point = boothPoint(booth, lx, lz);
  return ctx.prop(type, point.x, y, point.z, { ...options, rotY: (options.rotY ?? 0) + booth.rotY });
}

// 岗亭墙：沿本地 X 展开，本地坐标为墙面中心线；rotYOffset = -PI/2 时沿本地 Z 展开。
function boothWall(ctx, booth, { lx, lz, length, rotYOffset = 0, holes = [] }) {
  const point = boothPoint(booth, lx, lz);
  return ctx.wall({
    x: point.x,
    z: point.z,
    length,
    height: BOOTH.height,
    thickness: BOOTH.wall,
    rotY: booth.rotY + rotYOffset,
    material: 'paintedMetalGray',
    anchor: 'center',
    holes,
  });
}

// 窗：darkMetal 细框 + glassDirty 玻璃薄板。frameOrigin 提供朝向、墙厚与坐标换算基准：
// 岗亭传亭身（本地坐标），街区传世界坐标基准轴。
function addWindow(frame, glass, frameOrigin, axis, center, sill, width, height) {
  const alongX = axis === 'x';
  const rotY = frameOrigin.rotY + (alongX ? 0 : -Math.PI / 2);
  const rail = BOOTH.windowRail;
  const depth = frameOrigin.depth ?? BOOTH.wall;
  const put = (builder, w, h, d, offset, y) => {
    const lx = center.lx + (alongX ? offset : 0);
    const lz = center.lz + (alongX ? 0 : offset);
    const point = boothPoint(frameOrigin, lx, lz);
    builder.box(w, h, d, point.x, y, point.z, { rotY });
  };
  put(frame, width, rail, depth, 0, sill);
  put(frame, width, rail, depth, 0, sill + height - rail);
  put(frame, rail, height - rail * 2, depth, -(width - rail) / 2, sill + rail);
  put(frame, rail, height - rail * 2, depth, (width - rail) / 2, sill + rail);
  put(glass, width - rail * 2, height - rail * 2, BOOTH.glass, 0, sill + rail);
}

// 静态量体统一收口：整个模块内每种材质只产生一个合并 Mesh。
function createGroups(ctx) {
  const builders = new Map();
  return {
    of(material) {
      let builder = builders.get(material);
      if (!builder) {
        builder = ctx.mb(material);
        builders.set(material, builder);
      }
      return builder;
    },
    flush() {
      for (const builder of builders.values()) builder.finish();
      builders.clear();
    },
  };
}

// ---- 中路两侧岗亭 ----

function buildBooths(ctx, groups) {
  const shell = groups.of('paintedMetalGray');
  const concrete = groups.of('concrete');
  const plinth = groups.of('concreteBase');
  const metal = groups.of('darkMetal');
  const rust = groups.of('rustMetal');
  const glass = groups.of('glassDirty');
  const deadLamp = groups.of('lampOff');
  const warmLamp = groups.of('lampWarm');
  const coolLamp = groups.of('lampCool');

  const half = BOOTH.body / 2;
  const wallCenter = half - BOOTH.wall / 2;
  const plinthSpan = BOOTH.body + BOOTH.plinthOut * 2;
  const roofSpan = BOOTH.body + BOOTH.roofOut * 2;
  const roofY = BOOTH.height;

  LAYOUT.mid.booths.forEach((booth, index) => {
    const warm = index === 0;
    const frontHoles = BOOTH.frontAt.map((at) => ({
      at,
      width: BOOTH.frontWidth,
      from: BOOTH.sill,
      height: BOOTH.windowHeight,
    }));
    const sideHoles = [{
      at: BOOTH.sideAt,
      width: BOOTH.sideWidth,
      from: BOOTH.sill,
      height: BOOTH.windowHeight,
    }];

    // 混凝土基座 + 后墙 + 平屋顶
    boothBox(plinth, booth, plinthSpan, BOOTH.plinth, plinthSpan, 0, 0, 0);
    boothBox(shell, booth, BOOTH.body, BOOTH.height, BOOTH.wall, 0, 0, -wallCenter);
    boothBox(concrete, booth, roofSpan, BOOTH.roof, roofSpan, 0, roofY, 0);

    // 正面与两侧围墙：洞口下沿 0.9，即玻璃下方的墙裙高度
    boothWall(ctx, booth, { lx: 0, lz: wallCenter, length: BOOTH.body, holes: frontHoles });
    boothWall(ctx, booth, { lx: -wallCenter, lz: 0, length: BOOTH.sideLength, rotYOffset: -Math.PI / 2, holes: sideHoles });
    boothWall(ctx, booth, { lx: wallCenter, lz: 0, length: BOOTH.sideLength, rotYOffset: -Math.PI / 2, holes: sideHoles });

    // 玻璃窗：正面两扇 + 两侧各一扇
    const windowBase = { ...booth, depth: BOOTH.wall };
    for (const at of BOOTH.frontAt) {
      const lx = at + BOOTH.frontWidth / 2 - half;
      addWindow(metal, glass, windowBase, 'x', { lx, lz: wallCenter }, BOOTH.sill, BOOTH.frontWidth, BOOTH.windowHeight);
    }
    for (const lx of [-wallCenter, wallCenter]) {
      addWindow(metal, glass, windowBase, 'z', { lx, lz: 0 }, BOOTH.sill, BOOTH.sideWidth, BOOTH.windowHeight);
    }

    // 四角立柱：外挑 0.04，避免与墙面共面产生闪烁
    const postCenter = half - 0.01;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        boothBox(metal, booth, BOOTH.post, BOOTH.height, BOOTH.post, sx * postCenter, 0, sz * postCenter);
      }
    }

    // 亭身底部一圈锈铁踢脚（四面让开角柱，外表面与角柱齐平）
    const kickCenter = postCenter - BOOTH.post / 2;
    const kickLength = 2 * kickCenter;
    boothBox(rust, booth, kickLength, BOOTH.kick, 0.2, 0, BOOTH.plinth, kickCenter);
    boothBox(rust, booth, kickLength, BOOTH.kick, 0.2, 0, BOOTH.plinth, -kickCenter);
    boothBox(rust, booth, 0.2, BOOTH.kick, kickLength, kickCenter, BOOTH.plinth, 0);
    boothBox(rust, booth, 0.2, BOOTH.kick, kickLength, -kickCenter, BOOTH.plinth, 0);

    // 室内：控制台贴后墙正面朝窗，座椅侧翻，角落水桶与散落纸张
    const floorY = BOOTH.plinth;
    boothProp(ctx, booth, 'console', 0, floorY, -0.85);
    boothProp(ctx, booth, 'officeChair', 0.68, floorY, -0.1, { rotY: 0.9 });
    boothProp(ctx, booth, 'newsPile', 0.15, 1.17, -0.83, { rotX: -0.55 });
    boothProp(ctx, booth, 'newsPile', -0.72, floorY, -0.62, { rotY: 0.4 });
    boothProp(ctx, booth, 'cardboardBoxSmall', 0.95, floorY, -0.95, { rotY: -0.3 });
    boothProp(ctx, booth, 'bucket', 0.95, floorY, 0.9);

    // 顶灯：熄灭的灯盘与灯管，工作灯用自发光灯罩 + 一束吊杆
    boothBox(deadLamp, booth, 1.3, 0.08, 0.2, 0, roofY - 0.1, -0.85);
    boothProp(ctx, booth, 'fluorescentTube', 0, roofY - 0.145, -0.85);
    boothBox(metal, booth, 0.05, 0.14, 0.05, 0, roofY - 0.14, 0.15);
    boothSphere(warm ? warmLamp : coolLamp, booth, 0.09, 0, roofY - 0.23, 0.15);

    // 屋顶通气管与亭外杂物
    boothProp(ctx, booth, 'ventPipe', -0.85, roofY + BOOTH.roof, -0.85, { wet: true });
    boothProp(ctx, booth, 'trashCan', 1.05, 0, 1.95, { wet: true });
    boothProp(ctx, booth, 'pallet', -1.15, 0, 2.15, { wet: true });

    // 玻璃上叠褪色涂鸦与弹孔（弹孔落在侧面玻璃）
    const graffiti = boothPoint(booth, -0.525, wallCenter + BOOTH.postOut + 0.07);
    ctx.decal('graffiti', graffiti.x, 1.6, graffiti.z, { rotX: 0, rotY: booth.rotY, w: 0.8, h: 0.6 });
    const bullets = boothPoint(booth, -(wallCenter + BOOTH.postOut + 0.07), 0);
    ctx.decal('bullets', bullets.x, 1.5, bullets.z, { rotX: 0, rotY: booth.rotY - Math.PI / 2, w: 1, h: 1 });

    // 檐口滴水
    for (const lx of [-1.15, 1.15]) {
      const point = boothPoint(booth, lx, half + BOOTH.roofOut);
      ctx.fx.drip(point.x, roofY + BOOTH.roof, point.z, {
        rate: 0.9,
        length: 0.32,
        groundY: 0,
        width: 0.05,
        splash: true,
      });
    }

    // 室内照明：只保留一盏真实光源（第一座岗亭），第二座以自发光灯罩表现
    const globe = boothPoint(booth, 0, 0.15);
    if (warm) {
      ctx.light({
        kind: 'point',
        position: [globe.x, roofY - 0.23, globe.z],
        color: 0xffd9a0,
        intensity: 14,
        distance: 12,
        anim: 'flicker',
        rate: 0.7,
      });
    }
  });
}

// ---- 西南街区建筑 ----

function buildSouthWestBlock(ctx, groups) {
  const rect = LAYOUT.routes.southWestBlock;
  const { minX, maxX, minZ, maxZ } = rect;
  const height = rect.height;
  const wallX = BLOCK.wall / 2;
  const innerMinX = minX + BLOCK.wall;
  const innerMaxX = maxX - BLOCK.wall;
  const innerMinZ = minZ + BLOCK.wall;
  const innerMaxZ = maxZ - BLOCK.wall;
  const centerX = (minX + maxX) / 2;
  const centerZ = (minZ + maxZ) / 2;
  const spanX = innerMaxX - innerMinX;
  const spanZ = innerMaxZ - innerMinZ;
  const wallMaterial = 'concreteWall';

  const metal = groups.of('darkMetal');
  const rust = groups.of('rustMetal');
  const glass = groups.of('glassDirty');
  const deck = groups.of('concrete');
  const parapet = groups.of('concreteWall');
  const leaf = groups.of('paintedMetalGray');
  const coolLamp = groups.of('lampCool');
  const deadLamp = groups.of('lampOff');

  // 洞口起点 = 目标世界坐标 - 墙起点（东墙自 z = minZ、南墙自 x = innerMinX 起算）。
  const windowHole = (at) => ({
    at,
    width: BLOCK.windowWidth,
    from: BLOCK.sill,
    height: BLOCK.windowHeight,
  });
  const eastHoles = [
    ...BLOCK.eastWindows.map((z) => windowHole(z - BLOCK.windowWidth / 2 - minZ)),
    {
      at: BLOCK.shutter.centerZ - BLOCK.shutter.width / 2 - minZ,
      width: BLOCK.shutter.width,
      from: 0,
      height: BLOCK.shutter.height,
    },
  ];
  const southHoles = [
    ...BLOCK.southWindows.map((x) => windowHole(x - BLOCK.windowWidth / 2 - innerMinX)),
    {
      at: BLOCK.door.centerX - BLOCK.door.width / 2 - innerMinX,
      width: BLOCK.door.width,
      from: 0,
      height: BLOCK.door.height,
    },
  ];

  // 四面外墙：北墙朝西街、东墙与南墙朝街、西墙贴左侧小巷
  ctx.wall({ x: innerMinX, z: minZ + wallX, length: spanX, height, thickness: BLOCK.wall, material: wallMaterial, anchor: 'start' });
  ctx.wall({ x: innerMinX, z: maxZ - wallX, length: spanX, height, thickness: BLOCK.wall, material: wallMaterial, anchor: 'start', holes: southHoles });
  ctx.wall({ x: maxX - wallX, z: minZ, length: maxZ - minZ, height, thickness: BLOCK.wall, material: wallMaterial, anchor: 'start', rotY: -Math.PI / 2, holes: eastHoles });
  ctx.wall({ x: minX + wallX, z: minZ, length: maxZ - minZ, height, thickness: BLOCK.wall, material: wallMaterial, anchor: 'start', rotY: -Math.PI / 2 });

  // 室内地坪
  groups.of('concreteFloor').plane(spanX, spanZ, centerX, BLOCK.floorY, centerZ);

  // 屋面板：四块拼出 4 × 3 的天窗洞口，便于俯视看清室内
  const sky = BLOCK.skylight;
  const deckY = height - BLOCK.deck;
  deck.box(sky.minX - innerMinX, BLOCK.deck, spanZ, (innerMinX + sky.minX) / 2, deckY, centerZ);
  deck.box(innerMaxX - sky.maxX, BLOCK.deck, spanZ, (sky.maxX + innerMaxX) / 2, deckY, centerZ);
  deck.box(sky.maxX - sky.minX, BLOCK.deck, sky.minZ - innerMinZ, (sky.minX + sky.maxX) / 2, deckY, (innerMinZ + sky.minZ) / 2);
  deck.box(sky.maxX - sky.minX, BLOCK.deck, innerMaxZ - sky.maxZ, (sky.minX + sky.maxX) / 2, deckY, (sky.maxZ + innerMaxZ) / 2);

  // 女儿墙：东西两片通长，南北两片让开转角
  parapet.box(BLOCK.wall, BLOCK.parapet, maxZ - minZ, minX + wallX, height, centerZ);
  parapet.box(BLOCK.wall, BLOCK.parapet, maxZ - minZ, maxX - wallX, height, centerZ);
  parapet.box(spanX, BLOCK.parapet, BLOCK.wall, centerX, height, minZ + wallX);
  parapet.box(spanX, BLOCK.parapet, BLOCK.wall, centerX, height, maxZ - wallX);

  // 窗：东墙与南墙各两扇
  const worldAxis = { x: 0, z: 0, rotY: 0, depth: BLOCK.wall };
  const windows = [
    ...BLOCK.eastWindows.map((cz) => ({ axis: 'z', lx: maxX - wallX, lz: cz })),
    ...BLOCK.southWindows.map((cx) => ({ axis: 'x', lx: cx, lz: maxZ - wallX })),
  ];
  for (const window of windows) {
    addWindow(metal, glass, worldAxis, window.axis, { lx: window.lx, lz: window.lz }, BLOCK.sill, BLOCK.windowWidth, BLOCK.windowHeight);
  }

  // 东墙卷帘门：半开的锈铁帘板悬在 2.2 ~ 3.0，上方加卷筒箱
  const shutter = BLOCK.shutter;
  const shutterSlats = Math.round((shutter.height - shutter.openFrom) / (shutter.slat + shutter.gap));
  for (let i = 0; i < shutterSlats; i += 1) {
    rust.box(shutter.thickness, shutter.slat, shutter.width, maxX - wallX, shutter.openFrom + i * (shutter.slat + shutter.gap), shutter.centerZ);
  }
  rust.box(BLOCK.rollBox.depth, BLOCK.rollBox.height, BLOCK.rollBox.span, maxX - wallX, shutter.height - 0.05, shutter.centerZ);

  // 南墙内开门：门套 + 半开门扇（铰链在西侧门垛，向室内摆开）
  const door = BLOCK.door;
  const doorZ = maxZ - wallX;
  metal.box(door.jamb, door.height, BLOCK.wall + 0.06, door.centerX - door.width / 2 + door.jamb / 2, 0, doorZ);
  metal.box(door.jamb, door.height, BLOCK.wall + 0.06, door.centerX + door.width / 2 - door.jamb / 2, 0, doorZ);
  metal.box(door.width - door.jamb * 2, door.jamb, BLOCK.wall + 0.06, door.centerX, door.height - door.jamb * 2, doorZ);
  const hingeX = door.centerX - door.width / 2;
  const leafHalf = door.width / 2;
  leaf.box(door.width, door.height, door.leaf,
    hingeX + leafHalf * Math.cos(door.swing),
    0,
    innerMaxZ - leafHalf * Math.sin(door.swing),
    { rotY: door.swing });

  // 室内陈设：货架沿西墙、木箱堆在卷帘门视线内、天花吊灯
  ctx.prop('shelfUnit', -28.05, BLOCK.floorY, 2.6, { rotY: Math.PI / 2 });
  ctx.prop('shelfUnit', -28.05, BLOCK.floorY, 5.6, { rotY: Math.PI / 2 });
  ctx.prop('sortTable', -24.6, BLOCK.floorY, 9.3, { rotY: 0.22 });
  ctx.prop('locker', -18.4, BLOCK.floorY, 6.4, { rotY: -Math.PI / 2 });
  for (const x of [-20.4, -21.3]) {
    ctx.prop('woodCrate', x, BLOCK.floorY, 6, {});
    ctx.prop('woodCrate', x, BLOCK.floorY + 0.75, 6, { rotY: 0.12 });
  }
  ctx.prop('sack', -27.6, BLOCK.floorY, 9.1, { rotY: 0.5 });
  ctx.prop('sack', -26.4, BLOCK.floorY, 9.6, { rotY: -0.8 });
  ctx.prop('pipeStack', -23, BLOCK.floorY, 1.4, {});
  ctx.prop('barrelRust', -18.3, BLOCK.floorY, 4.2, { rotY: 0.3 });

  // 屋顶设备平台
  for (const [x, z] of BLOCK.roofVents) ctx.prop('ventPipe', x, height, z, { wet: true });
  ctx.prop('cableSpool', -24.6, height, 2, { rotY: 0.4, wet: true });
  for (const [x, z, rotY] of BLOCK.acUnits) ctx.prop('acUnit', x, height, z, { rotY, wet: true });

  // 墙根杂物
  ctx.prop('tire', -16.3, 0, 1.6, { wet: true });
  ctx.prop('cardboardBox', -16.45, 0, 3.1, { rotY: 0.3, wet: true });
  ctx.prop('cardboardBox', -16.5, 0, 3.75, { rotY: -0.5, wet: true });
  ctx.prop('barrelRust', -16.35, 0, 8.5, { wet: true });
  ctx.prop('barrelRust', -16.05, 0, 9.05, { rotY: 0.6, wet: true });
  ctx.prop('dumpster', -16.35, 0, 10.4, { rotY: Math.PI / 2, wet: true });

  // 室内照明：一盏冷白顶灯 + 两个吊灯（其中一个为坏灯）
  const ceilingY = deckY;
  const bulbY = ceilingY - 0.545;
  ctx.prop('hangingLamp', -23, ceilingY, 6, {});
  ctx.prop('hangingLamp', -20.6, ceilingY, 3.2, {});
  coolLamp.sphere(0.055, -23, bulbY, 6);
  deadLamp.sphere(0.055, -20.6, bulbY, 3.2);
  ctx.light({
    kind: 'point',
    position: [-23, ceilingY - 0.6, 6],
    color: 0xcfe4ff,
    intensity: 16,
    distance: 12,
    anim: 'flickerSoft',
  });

  // 北墙外通风口排汽
  rust.cyl(0.09, 0.09, 0.5, 10, -26, 2.35, minZ, { rotX: -Math.PI / 2 });
  rust.box(0.26, 0.26, 0.08, -26, 2.22, minZ - 0.05);
  ctx.fx.steam(-26, 2.4, minZ - 0.55, { size: 1.1, rate: 0.3, rise: 0.35, drift: [0.06, -0.12], life: 4.8 });

  // 外墙涂鸦、货运编号与弹孔
  ctx.decal('graffiti', maxX + 0.03, 1.5, 3.75, { rotX: 0, rotY: Math.PI / 2, w: 1.2, h: 2 });
  ctx.decal('graffiti', maxX + 0.03, 1.8, 8.25, { rotX: 0, rotY: Math.PI / 2, w: 1, h: 1.6 });
  ctx.decal('freight', maxX + 0.03, 4.2, 6, { rotX: 0, rotY: Math.PI / 2, w: 2, h: 1 });
  ctx.decal('bullets', maxX + 0.03, 1.2, 11.2, { rotX: 0, rotY: Math.PI / 2, w: 1.4, h: 1.6 });
  ctx.decal('graffiti', -20, 1.7, maxZ + 0.03, { rotX: 0, w: 1.4, h: 1.5 });

  // 卷帘门下缘与女儿墙滴水
  const dripBase = { rate: 0.7, length: 0.3, groundY: 0, width: 0.05, splash: true };
  ctx.fx.drip(maxX + 0.06, shutter.openFrom, 4.9, dripBase);
  ctx.fx.drip(maxX + 0.06, shutter.openFrom, 7.1, dripBase);
  ctx.fx.drip(maxX + 0.06, height + BLOCK.parapet, 3, dripBase);
  ctx.fx.drip(-24, height + BLOCK.parapet, maxZ + 0.06, dripBase);
}

export function buildInteriors(ctx) {
  ctx.region('interiors');
  const groups = createGroups(ctx);
  buildBooths(ctx, groups);
  buildSouthWestBlock(ctx, groups);
  groups.flush();
}
