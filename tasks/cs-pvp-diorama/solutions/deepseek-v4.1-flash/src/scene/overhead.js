// 空中电线网络：主干电线杆、悬垂电线、墙面线缆与断线杂物（暴雨夜货栈上空）。
import * as THREE from 'three';
import { LAYOUT } from './layout.js';

// ---- 本地尺寸常量：layout.js 未覆盖的部分在此定义，不改动共享蓝图 ----
const BASE_H = 0.22;              // 杆底混凝土基座高度
const POLE_H = 7.5;               // shepherdHookPole 杆身高
const MAST_Y = BASE_H + POLE_H;   // 杆顶标高 7.72
const ARM_Y = BASE_H + 7.565;     // 横担端点绝缘子顶 7.785
const MAST_TOP_Y = MAST_Y + 0.2;  // 杆顶绝缘子顶 7.92
const ARM_OFFSET = 0.5;           // 挂点相对杆心的横向偏移（横担半长 0.55）
const WIRE_R = 0.035;             // 电线管半径
const CABLE_R = 0.045;            // 墙面线缆管半径
const WIRE_SEG = 20;              // 每条电线管段数（≈200 三角面）
const CABLE_SEG = 16;
const RADIAL = 5;                 // 管截面边数，微缩尺度够用
const BREAK_Y = 3.2;              // 断线垂落末端高度
const WALL_GAP = 0.1;             // 墙面线缆离墙间隙，取规格区间中值
const SPAN_SAMPLES = 4;           // 悬链线插值段数

// 杆位：主干 4 根直接取自 LAYOUT.overhead.poles，次级 3 根贴外围墙内侧补位。
// rotY 控制横担朝向（横担沿杆件局部 X 轴），yaw 为附件/贴花所朝方向。
const POLES = [
  { id: 'p0', x: LAYOUT.overhead.poles[0].x, z: LAYOUT.overhead.poles[0].z, rotY: 0.2, yaw: 0.79, tank: true, sign: true },
  { id: 'p1', x: LAYOUT.overhead.poles[1].x, z: LAYOUT.overhead.poles[1].z, rotY: 1.4, yaw: -2.5, tank: true, sign: true },
  { id: 'p2', x: LAYOUT.overhead.poles[2].x, z: LAYOUT.overhead.poles[2].z, rotY: 0.1, yaw: -0.79 },
  { id: 'p3', x: LAYOUT.overhead.poles[3].x, z: LAYOUT.overhead.poles[3].z, rotY: 0.35, yaw: 1.571 },
  { id: 's0', x: -30.6, z: -9.5, rotY: 0.1, yaw: 1.571 },
  { id: 's1', x: 30.6, z: -8.0, rotY: 0.15, yaw: -1.571 },
  { id: 's2', x: 6.2, z: -30.6, rotY: 1.5, yaw: 0 },
];

const POLE_BY_ID = new Map(POLES.map((pole) => [pole.id, pole]));

// 屋顶挂点：落在檐口内侧，标高取屋面板之上（A 仓库屋面板顶 5.78、B 铁皮屋 6.3、西南街区女儿墙 6.35）。
const ROOF_ANCHORS = {
  aEast: { x: LAYOUT.aSite.rect.maxX - 0.15, y: LAYOUT.aSite.roofY + 0.5, z: -12.4 },
  aEastNorth: { x: LAYOUT.aSite.rect.maxX - 0.15, y: LAYOUT.aSite.roofY + 0.45, z: -18.2 },
  bWest: { x: LAYOUT.bSite.house.minX + 0.1, y: LAYOUT.bSite.house.roofY + 0.35, z: -19.6 },
  bSouth: { x: 18.5, y: LAYOUT.bSite.house.roofY + 0.3, z: LAYOUT.bSite.house.maxZ - 0.15 },
  swNorth: { x: -22.5, y: LAYOUT.routes.southWestBlock.height + 0.4, z: LAYOUT.routes.southWestBlock.minZ + 0.25 },
};

// 挂点解析：'p0.a' 取横担一端，'p0.b' 取另一端，'p0.c' 取杆顶，其余为屋顶挂点。
function anchorOf(key) {
  const roof = ROOF_ANCHORS[key];
  if (roof) return roof;
  const [id, slot] = key.split('.');
  const pole = POLE_BY_ID.get(id);
  if (slot === 'c') return { x: pole.x, y: MAST_TOP_Y, z: pole.z };
  const offset = slot === 'a' ? ARM_OFFSET : -ARM_OFFSET;
  return {
    x: pole.x + offset * Math.cos(pole.rotY),
    y: ARM_Y,
    z: pole.z - offset * Math.sin(pole.rotY),
  };
}

// 悬链线近似：抛物线垂度 sag + 可选中段横向弓形 bow，避免走线过于笔直。
function spanPoint(a, b, t, sag, bow) {
  const k = 4 * t * (1 - t);
  return new THREE.Vector3(
    a.x + (b.x - a.x) * t + bow[0] * k,
    a.y + (b.y - a.y) * t - sag * k,
    a.z + (b.z - a.z) * t + bow[1] * k,
  );
}

function addTube(builder, points, radius, segments) {
  builder.raw(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), segments, radius, RADIAL, false));
}

function addSpan(builder, a, b, { sag, bow = [0, 0], to = 1 }) {
  const points = [];
  for (let i = 0; i <= SPAN_SAMPLES; i += 1) {
    points.push(spanPoint(a, b, (to * i) / SPAN_SAMPLES, sag, bow));
  }
  addTube(builder, points, WIRE_R, WIRE_SEG);
  return points[points.length - 1];
}

// 断线：主干线走到断点为止，残线自断点微微倾斜垂落到 BREAK_Y。
function addBrokenSpan(builder, a, b, spec) {
  const end = addSpan(builder, a, b, { sag: spec.sag, bow: spec.bow, to: spec.breakAt });
  const tip = new THREE.Vector3(end.x + 0.09, BREAK_Y, end.z + 0.16);
  addTube(builder, [end, new THREE.Vector3(end.x + 0.04, (end.y + BREAK_Y) / 2, end.z + 0.07), tip], WIRE_R, 10);
  return { end, tip };
}

// 走线清单：覆盖西巷、左巷、北路、东路、南街五条街巷，并在建筑屋檐收头。
const WIRES = [
  // ① 西北巷：p0 ↔ s0，从 A 仓库北段屋顶上方掠过
  { from: 'p0.a', to: 's0.a', sag: 0.75 },
  { from: 'p0.b', to: 's0.b', sag: 0.45, bow: [0.22, -0.18] },
  { from: 'p0.c', to: 's0.c', sag: 0.95, bow: [-0.2, 0.24] },
  // ② 左侧小巷纵线：s0 ↔ p3，贴西墙内侧南北走线，其中一条中段断开
  { from: 's0.a', to: 'p3.a', sag: 0.95, bow: [0, 0.3] },
  { from: 's0.b', to: 'p3.b', sag: 0.7, bow: [0.18, 0], breakAt: 0.42 },
  { from: 's0.c', to: 'p3.c', sag: 0.55 },
  // ③ 北路：p0 ↔ s2 ↔ p2，横跨 T 出生场院与集装箱后方，其一断落在场院
  { from: 'p0.a', to: 's2.a', sag: 0.9, breakAt: 0.5 },
  { from: 'p0.b', to: 's2.b', sag: 0.6, bow: [0, 0.25] },
  { from: 's2.a', to: 'p2.a', sag: 0.9 },
  { from: 's2.c', to: 'p2.c', sag: 0.65, bow: [0, -0.28] },
  // ④ 东侧纵线：p2 ↔ s1，贴东墙外扩，掠过 B 铁皮屋东檐
  { from: 'p2.b', to: 's1.b', sag: 0.8, bow: [0.5, 0] },
  { from: 'p2.c', to: 's1.c', sag: 0.5, bow: [0.55, 0] },
  { from: 's1.a', to: 'p1.b', sag: 0.85 },
  // ⑤ 南街：p3 ↔ p1，横跨 CT 出生点与南街
  { from: 'p3.a', to: 'p1.a', sag: 0.9 },
  { from: 'p3.b', to: 'p1.b', sag: 0.6, bow: [0, -0.4] },
  { from: 'p3.c', to: 'p1.c', sag: 0.75 },
  // ⑥ 屋顶落线：收头于 A 仓库、B 铁皮屋、西南街区檐口
  { from: 'p0.b', to: 'aEastNorth', sag: 0.3 },
  { from: 'p0.c', to: 'aEast', sag: 0.35 },
  { from: 'aEast', to: 'p1.c', sag: 0.85 },
  { from: 'aEast', to: 'p1.b', sag: 0.6, bow: [0, -0.5] },
  { from: 'bWest', to: 'p1.a', sag: 0.5 },
  { from: 'swNorth', to: 's0.a', sag: 0.5 },
  { from: 'p2.b', to: 'bWest', sag: 0.3 },
  { from: 'bSouth', to: 'p1.a', sag: 0.5 },
  { from: 'bSouth', to: 's1.c', sag: 0.5 },
];

// 三条外墙的贴墙线缆：每面墙 1 条水平 + 1 条斜走，端点共 3 个接线盒。
// 墙面外皮位置按各建筑模块的实际做法取值：A 仓库外皮贴 rect 东界，B 铁皮屋墙心在轮廓线上，西南街区外皮贴 rect 东界。
const WALL_CABLES = [
  // A 仓库东墙（卷帘门上方）
  { x: LAYOUT.aSite.rect.maxX + WALL_GAP, normal: 1, level: 5.15, drop: 4.65 },
  // B 铁皮屋西墙（避开两扇窗，窗顶约 y=5.4）
  { x: LAYOUT.bSite.house.minX - LAYOUT.bSite.house.wall / 2 - WALL_GAP, normal: -1, level: 5.6, drop: 4.75 },
  // 西南街区东墙（面向西街）
  { x: LAYOUT.routes.southWestBlock.maxX + WALL_GAP, normal: 1, level: 5.5, drop: 4.7 },
];
const WALL_RUNS = {
  aEast: { from: -18.6, to: -5.4, mid: -10.6 },
  bWest: { from: -23.4, to: -11.2, mid: -18.0 },
  swEast: { from: 0.8, to: 11.2, mid: 6.0 },
};
const WALL_KEYS = ['aEast', 'bWest', 'swEast'];

export function buildOverhead(ctx) {
  ctx.region('overhead');

  const wireBuilder = ctx.mb('wire');
  const tankBuilder = ctx.mb('darkMetal');
  const baseBuilder = ctx.mb('concreteDark');
  const signBuilder = ctx.mb('rustMetal');
  let drips = 0;

  // ---- 电线杆：杆身道具 + 杆底基座 + 横担端点绝缘子 ----
  for (const pole of POLES) {
    const { x, z, rotY, yaw } = pole;
    const dirX = Math.sin(yaw);
    const dirZ = Math.cos(yaw);

    baseBuilder.cyl(0.42, 0.5, BASE_H, 10, x, 0, z);
    ctx.prop('shepherdHookPole', x, BASE_H, z, { rotY });

    // 横担两端与杆顶各加一枚绝缘子，电线正好落在绝缘子顶上
    for (const side of [-ARM_OFFSET, 0, ARM_OFFSET]) {
      const px = x + side * Math.cos(rotY);
      const pz = z - side * Math.sin(rotY);
      const py = side === 0 ? MAST_Y : ARM_Y - 0.2;
      tankBuilder.cyl(0.075, 0.05, 0.2, 6, px, py, pz);
    }

    // 杆身小接线盒（挂在附件背面）与引下钢管
    tankBuilder.box(0.3, 0.4, 0.22, x - dirX * 0.25, 2.6, z - dirZ * 0.25, { anchor: 'center', rotY: yaw });
    tankBuilder.cyl(0.045, 0.045, 0.85, 6, x - dirX * 0.22, 3.0, z - dirZ * 0.22);

    if (pole.tank) {
      // 变压器箱 0.7×0.9×0.7 挂在杆身 y≈4.6 的附件侧，配一根斜撑
      tankBuilder.box(0.7, 0.9, 0.7, x + dirX * 0.55, 4.6, z + dirZ * 0.55, { anchor: 'center', rotY: yaw });
      tankBuilder.box(0.12, 0.12, 0.5, x + dirX * 0.32, 4.35, z + dirZ * 0.32, { anchor: 'center', rotY: yaw });
      tankBuilder.ramp(0.09, x + dirX * 0.12, 3.55, z + dirZ * 0.12, x + dirX * 0.82, 4.22, z + dirZ * 0.82);
      if (pole.id === 'p0') {
        // 箱面弹孔
        ctx.decal('bullets', x + dirX * 0.92, 4.6, z + dirZ * 0.92, { rotX: 0, rotY: yaw, w: 0.5, h: 0.5 });
      }
    }

    if (pole.sign) {
      // 杆身挂牌：把 0.9×1.6 的涂鸦贴花贴在板面上（裸杆仅 0.23 宽，贴不住）
      signBuilder.box(0.9, 1.6, 0.06, x + dirX * 0.16, 3.4, z + dirZ * 0.16, { anchor: 'center', rotY: yaw });
      ctx.decal('graffiti', x + dirX * 0.22, 3.4, z + dirZ * 0.22, { rotX: 0, rotY: yaw, w: 0.9, h: 1.5 });
    }
  }

  // 次级杆单独补两处小涂鸦/弹孔，避免主干杆独占细节
  const s2 = POLE_BY_ID.get('s2');
  ctx.decal('graffiti', s2.x + Math.sin(s2.yaw) * 0.13, 3.5, s2.z + Math.cos(s2.yaw) * 0.13, { rotX: 0, rotY: s2.yaw, w: 0.26, h: 0.9 });
  const p3 = POLE_BY_ID.get('p3');
  ctx.decal('bullets', p3.x + Math.sin(p3.yaw) * 0.13, 3.2, p3.z + Math.cos(p3.yaw) * 0.13, { rotX: 0, rotY: p3.yaw, w: 0.24, h: 0.5 });

  // ---- 悬垂电线：全部合进同一个 wire 构建器，最终只有 1 个 draw call ----
  const breaks = [];
  for (const spec of WIRES) {
    const a = anchorOf(spec.from);
    const b = anchorOf(spec.to);
    if (spec.breakAt) {
      breaks.push(addBrokenSpan(wireBuilder, a, b, spec));
    } else {
      addSpan(wireBuilder, a, b, { sag: spec.sag, bow: spec.bow });
    }
  }

  // ---- 墙面线缆：贴墙 0.1 走线，两端与中段进接线盒 ----
  for (let i = 0; i < WALL_CABLES.length; i += 1) {
    const wall = WALL_CABLES[i];
    const run = WALL_RUNS[WALL_KEYS[i]];
    const boxX = wall.x + wall.normal * 0.085;
    const yaw = wall.normal > 0 ? Math.PI / 2 : -Math.PI / 2;
    const boxes = [
      { y: wall.level, z: run.from },
      { y: wall.drop, z: run.mid },
      { y: wall.level, z: run.to },
    ];

    addTube(
      wireBuilder,
      [
        { x: wall.x, y: wall.level, z: run.from },
        { x: wall.x, y: wall.level - 0.05, z: run.from + (run.to - run.from) * 0.25 },
        { x: wall.x, y: wall.level - 0.08, z: (run.from + run.to) / 2 },
        { x: wall.x, y: wall.level - 0.05, z: run.from + (run.to - run.from) * 0.75 },
        { x: wall.x, y: wall.level, z: run.to },
      ].map((point) => new THREE.Vector3(point.x, point.y, point.z)),
      CABLE_R,
      CABLE_SEG,
    );
    // 斜走线：从水平线起点下探到墙中段接线盒
    addTube(
      wireBuilder,
      [
        { x: wall.x, y: wall.level, z: run.from },
        { x: wall.x, y: (wall.level + wall.drop) / 2 - 0.04, z: (run.from + run.mid) / 2 },
        { x: wall.x, y: wall.drop, z: run.mid },
      ].map((point) => new THREE.Vector3(point.x, point.y, point.z)),
      CABLE_R,
      CABLE_SEG,
    );

    for (const box of boxes) {
      tankBuilder.box(0.34, 0.46, 0.17, boxX, box.y, box.z, { anchor: 'center', rotY: yaw });
      tankBuilder.box(0.24, 0.3, 0.06, wall.x + wall.normal * 0.14, box.y, box.z, { anchor: 'center', rotY: yaw });
    }
  }

  // ---- 断线与杂物：在断线正下方摆线盘与胶管 ----
  const DEBRIS = [
    { x: -30.9, z: 2.2 },
    { x: -6.7, z: -27.0 },
  ];
  for (let i = 0; i < breaks.length; i += 1) {
    const spot = DEBRIS[i];
    ctx.prop('cableSpool', spot.x, 0, spot.z, { rotY: 0.4 - i * 0.9 });
    ctx.prop('hoseCoil', spot.x + 0.7, 0, spot.z + 0.6, { rotY: -0.7 + i * 1.3 });
    // 断口滴水：残线末端继续往下滴
    ctx.fx.drip(breaks[i].tip.x, BREAK_Y, breaks[i].tip.z, { rate: 1.2, length: 0.3, splash: true });
    drips += 1;
  }

  // ---- 沿 4 条电线的低垂处滴水 ----
  const DRIP_AT = [
    { from: 'p0.a', to: 's0.a', sag: 0.75, rate: 0.9 },
    { from: 's0.c', to: 'p3.c', sag: 0.55, rate: 1.1 },
    { from: 'aEast', to: 'p1.c', sag: 0.85, rate: 0.8 },
    { from: 's2.c', to: 'p2.c', sag: 0.65, bow: [0, -0.28], rate: 0.7 },
  ];
  for (const drip of DRIP_AT) {
    const low = spanPoint(anchorOf(drip.from), anchorOf(drip.to), 0.5, drip.sag, drip.bow ?? [0, 0]);
    ctx.fx.drip(low.x, low.y, low.z, { rate: drip.rate, length: 0.3, splash: true });
    drips += 1;
  }

  // 细管在阴影贴图上只有一两像素宽，关掉投影避免出现断续条纹
  wireBuilder.finish({ castShadow: false });
  tankBuilder.finish();
  baseBuilder.finish();
  signBuilder.finish();

  return { poles: POLES.length, wires: WIRES.length, wallCables: WALL_CABLES.length * 2, drips };
}
