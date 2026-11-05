import * as THREE from 'three';
import { box, cyl, sph, plane, mesh, grp, mat, tmat, glow, glass, cable, rng } from './kit.js';
import { poster, fabric, rugTex, paint, FONT } from './textures.js';
import {
  C, WOOD, screenMat, crt, flat, ultrawide, laptop, keyboard, KB, mouse, pad, gamepad, headset, tower,
  woodChair, officeChair, gamingChair, meshChair, books, cases, stack, can, bottle, frame, pleatedCurtain, leafGeo,
} from './builders.js';
import { presence, placement, ym, E08, E12, E16, E20, WFH, E25 } from './timeline.js';
import { WINDOW } from './room.js';

const ALWAYS = [[-1e4, 1e4]];
const PI = Math.PI;
// Desk anchors: local offsets to world positions.
const A = (x, y, z) => [-1.75 + x, y, -1.675 + z];
const N = (x, y, z) => [1.8 + x, y, -0.42 + z];
const R = (x, y, z) => [1.8 + x, y, -1.675 + z];
const B = (x, y, z) => [-1.63 + x, y, -1.65 + z];
const D = (x, y, z) => [-1.5 + x, y, -1.625 + z];
const WALL = -1.993;
// the display cabinet arrives a while after the renovation; until then the keepsakes wait in boxes
const VIT = ym(2021, 6);

export function buildItems(scene, room) {
  const items = [];
  const item = (d) => {
    d.group = new THREE.Group();
    d.group.userData.item = d;
    d.life ??= ALWAYS;
    d.at ??= [0, 0, 0];
    (d.parent ? d.parent.group : scene).add(d.group);
    d.group.position.set(...d.at);
    d.group.rotation.set(0, d.ry ?? 0, d.rz ?? 0);
    d.build?.(d.group, d);
    items.push(d);
    return d;
  };
  const prop = (life, at, build, ry) => item({ life, at, build, ry });

  // ================= furniture =================

  const deskA = item({
    id: 'deskA', name: '旧写字台', keep: true,
    track: [{ t: 0, p: A(0, 0, 0) }, { t: E16, p: N(0, 0, 0), lift: 0.3 }, { t: E20, p: R(0, 0, 0), lift: 0.3 }],
    memories: [
      [2005, '初一开学前买的写字台。作业和游戏轮流占领它，右边抽屉锁着游戏光盘。'],
      [2012, '抽屉里还压着高考准考证。左边的小书架，从课本换成了游戏盒。'],
      [2016, '新书桌进门那天，它被挤到床尾，上面堆满了纸箱。'],
      [2020, '翻新时没舍得扔。擦干净放进角落，配上 CRT 和 PS2，成了怀旧角。'],
    ],
    build(g) {
      const m = WOOD.maple;
      box(g, 1.3, 0.03, 0.65, m, 0, 0.73, 0, { r: 0.006 });
      box(g, 0.025, 0.73, 0.6, m, -0.635, 0, -0.01);
      box(g, 0.36, 0.73, 0.6, m, 0.46, 0, -0.01);
      for (let i = 0; i < 3; i++) {
        box(g, 0.34, 0.2, 0.015, m, 0.46, 0.05 + i * 0.22, 0.295, { r: 0.004 });
        box(g, 0.08, 0.012, 0.016, C.silver, 0.46, 0.18 + i * 0.22, 0.31);
      }
      box(g, 0.9, 0.4, 0.015, m, -0.17, 0.33, -0.31);
      // hutch on the left end
      box(g, 0.32, 0.015, 0.26, m, -0.49, 1.295, -0.195);
      for (const x of [-0.6425, -0.3375]) box(g, 0.015, 0.535, 0.26, m, x, 0.76, -0.195);
      box(g, 0.29, 0.012, 0.25, m, -0.49, 1.02, -0.195);
      box(g, 0.32, 0.535, 0.01, m, -0.49, 0.76, -0.32);
    },
  });
  // gooseneck study lamp stays with the old desk all twenty years
  const lampA = item({
    id: 'lampA', name: '护眼台灯', parent: deskA, at: [0.52, 0.76, -0.22],
    info: { when: '2005—2025', text: '“护眼”两个字是妈妈挑它的唯一理由。灯泡换过四次，灯罩上还留着初中贴的贴纸。' },
    build(g, d) {
      cyl(g, 0.07, 0.075, 0.025, C.white, 0, 0, 0, { seg: 24 });
      cable(g, [[0, 0.02, 0], [0, 0.2, 0], [0, 0.34, 0.03], [0, 0.39, 0.11]], 0.009, C.white);
      cyl(g, 0.03, 0.075, 0.08, mat('#f0ece2', 0.4), 0, 0.33, 0.15, { seg: 24 });
      sph(g, 0.024, glow('#ffe0a6', 2.5), 0, 0.34, 0.15);
      box(g, 0.03, 0.025, 0.002, mat('#4fa3d9', 0.5), 0.0, 0.37, 0.188, { rx: -0.45, cast: false });
      d.light = new THREE.PointLight('#ffcf8f', 0, 2.4, 2);
      d.light.position.set(0, 0.28, 0.15);
      g.add(d.light);
    },
    update(t, v, d) {
      const on = t < E16 ? 1 : t < E20 ? 0 : 0.7;
      d.light.intensity = 1.6 * on * v;
    },
  });

  const deskB = item({
    id: 'deskB', name: '第一张自己买的书桌', life: [[E16, E20]], at: B(0, 0, 0),
    info: { when: '2016—2019', text: '第一份年终奖买的胡桃木色书桌，一米五。终于放得下两块屏幕和一张大鼠标垫。' },
    build(g) {
      box(g, 1.5, 0.03, 0.7, WOOD.walnut, 0, 0.72, 0, { r: 0.006 });
      for (const x of [-0.71, 0.71]) for (const z of [-0.31, 0.31]) box(g, 0.04, 0.72, 0.04, C.steel, x, 0, z);
      for (const x of [-0.71, 0.71]) box(g, 0.03, 0.05, 0.62, C.steel, x, 0.66, 0);
      box(g, 1.38, 0.05, 0.03, C.steel, 0, 0.66, -0.31);
    },
  });

  const deskC = item({
    id: 'deskC', name: '电动升降桌', life: [[E20, 1e4]], at: D(0, 0, 0),
    info: { when: '2019—', text: '翻新时换的一米八升降桌。白天站着开会，晚上坐下打游戏。' },
    build(g) {
      box(g, 1.8, 0.035, 0.75, WOOD.oak, 0, 0.705, 0, { r: 0.008 });
      for (const x of [-0.78, 0.78]) {
        box(g, 0.07, 0.62, 0.05, C.black, x, 0.06, 0.0);
        box(g, 0.07, 0.04, 0.68, C.black, x, 0.0, 0.0, { r: 0.01 });
        box(g, 0.06, 0.03, 0.62, C.black, x, 0.675, 0);
      }
      box(g, 1.5, 0.05, 0.04, C.black, 0, 0.64, 0.0);
      box(g, 0.08, 0.02, 0.05, C.black, 0.7, 0.68, 0.38);
      box(g, 0.9, 0.06, 0.12, C.black, 0, 0.62, -0.28);
    },
  });
  item({
    id: 'ledStrip', parent: deskC, name: '桌后灯带', life: [[E25, 1e4]], at: [0, 0.69, -0.37],
    info: { when: '2024—', text: '只调成了暖白。小满说想要彩虹色，于是周末可以调一次。' },
    build(g, d) {
      box(g, 1.7, 0.008, 0.008, glow('#ffc98a', 2.2), 0, 0, 0, { cast: false });
      d.light = new THREE.PointLight('#ffbe7a', 0, 1.6, 2);
      d.light.position.set(0, 0.25, 0.05);
      g.add(d.light);
    },
    update(t, v, d) { d.light.intensity = 0.9 * v; },
  });

  item({
    id: 'bookshelf', name: '书架', life: [[-1e4, E16]], at: [-0.15, 0, -1.84],
    info: { when: '2005—2015', text: '从课本、漫画到游戏杂志和正版大盒，书架的每一层都换过主人。' },
    build(g) {
      const m = mat('#e9dfcb', 0.6);
      for (const x of [-0.39, 0.39]) box(g, 0.02, 1.8, 0.32, m, x, 0, 0);
      box(g, 0.8, 1.8, 0.01, m, 0, 0, -0.155);
      for (const y of [0, 0.36, 0.72, 1.08, 1.44, 1.78]) box(g, 0.78, 0.02, 0.31, m, 0, y, 0);
    },
  });

  item({
    id: 'cubeShelf', name: '格子柜', life: [[E16, 1e4]], at: [-0.15, 0, -1.825],
    info: { when: '2016—', text: '组装了一整晚，少了一颗螺丝。游戏机、卡带盒和漫画在这里各占一格。' },
    build(g) {
      const m = mat('#f1eee7', 0.55);
      for (const x of [-0.38, 0, 0.38]) box(g, 0.02, 1.47, 0.35, m, x, 0, 0);
      for (const y of [0, 0.3675, 0.735, 1.1025, 1.45]) box(g, 0.78, 0.02, 0.35, m, 0, y, 0);
      box(g, 0.78, 1.47, 0.008, m, 0, 0, -0.171);
    },
  });

  item({
    id: 'vitrine', name: '展示柜', life: [[VIT, 1e4]], at: [0.67, 0, -1.8],
    info: { when: '2019—', text: '翻新时专门留给旧东西的位置。小霸王、GBA、PSP，按年份从下往上摆。' },
    build(g, d) {
      const m = mat('#3a2a1e', 0.5);
      for (const x of [-0.265, 0.265]) for (const z of [-0.18, 0.18]) box(g, 0.02, 1.6, 0.02, m, x, 0, z);
      box(g, 0.55, 0.1, 0.38, m, 0, 0, 0);
      box(g, 0.55, 0.03, 0.38, m, 0, 1.57, 0);
      box(g, 0.53, 1.5, 0.006, mat('#d9cbb0', 0.8), 0, 0.1, -0.185);
      for (const y of [0.45, 0.8, 1.15]) { const s = box(g, 0.51, 0.008, 0.34, glass, 0, y, 0); s.castShadow = false; }
      for (const x of [-0.27, 0.27]) { const s = box(g, 0.004, 1.47, 0.34, glass, x, 0.1, 0); s.castShadow = false; }
      const front = box(g, 0.51, 1.47, 0.004, glass, 0, 0.1, 0.19); front.castShadow = false;
      box(g, 0.45, 0.006, 0.01, glow('#ffd8a0', 2), 0, 1.555, 0.12, { cast: false });
      d.light = new THREE.PointLight('#ffd2a0', 0, 1.2, 2);
      d.light.position.set(0, 1.45, 0.1);
      g.add(d.light);
    },
    update(t, v, d) { d.light.intensity = 0.35 * v; },
  });

  const bed = item({
    id: 'bed', name: '单人床', life: [[-1e4, E20]], at: [1.45, 0, -1.425],
    info: { when: '2005—2019', text: '从初一睡到二十七岁的单人床，一米二宽。床头那块木板被我用圆珠笔写满了游戏密码。' },
    build(g) {
      const m = WOOD.pine;
      for (const x of [-0.97, 0.97]) for (const z of [-0.55, 0.55]) box(g, 0.06, 0.1, 0.06, m, x, 0, z);
      box(g, 2.0, 0.2, 1.15, m, 0, 0.1, 0, { r: 0.01 });
      box(g, 0.04, 0.85, 1.15, m, 0.99, 0, 0, { r: 0.008 });
      box(g, 0.04, 0.45, 1.15, m, -0.99, 0, 0, { r: 0.008 });
      box(g, 1.92, 0.16, 1.1, mat('#efe8dc', 0.9), 0, 0.3, 0, { r: 0.03 });
      box(g, 0.34, 0.1, 0.62, mat('#f6f1e6', 0.95), 0.72, 0.46, 0.05, { r: 0.045, ry: 0.06 });
    },
  });
  item({ parent: bed, life: [[-1e4, E12]], build: (g) => box(g, 1.45, 0.07, 1.16, tmat(fabric('#3d6fb6', 'stars', 6), 0.95), -0.22, 0.44, 0.0, { r: 0.03 }) });
  item({ parent: bed, life: [[E12, E20]], build: (g) => box(g, 1.4, 0.08, 1.16, tmat(fabric('#5d6f7e', 'plaid', 7), 0.95), -0.26, 0.44, 0.0, { r: 0.035, rz: 0.01 }) });

  // chairs
  const woodChairItem = item({
    id: 'woodChair', name: '餐厅木椅', life: [[-1e4, E08], [E20, 1e4]],
    track: [{ t: 0, p: A(0.03, 0, 0.55), r: [0, 0.08, 0] }, { t: E20, p: R(-0.1, 0, 0.62), r: [0, -0.2, 0] }],
    memories: [
      [2005, '本来是餐厅的椅子，被我搬进房间就再没还回去。坐久了屁股疼，妈妈缝了个坐垫。'],
      [2008, '换了转椅以后，它回到了餐桌边。'],
      [2020, '爸妈回老家时把它留给了我。现在是怀旧角的专座，坐垫还是那块。'],
    ],
    build: (g) => woodChair(g),
  });
  const officeChairItem = item({ id: 'officeChair', name: '黑色转椅', life: [[E08, E16]], at: A(0.05, 0, 0.63), ry: 0.35,
    info: { when: '2008—2015', text: '家具城一百二十块买的转椅。转得太多，扶手的皮全磨掉了。' }, build: (g) => officeChair(g) });
  item({ id: 'gamingChair', name: '电竞椅', life: [[E16, E20]], at: B(0.1, 0, 0.68), ry: -0.2,
    info: { when: '2016—2019', text: '赛车座椅造型，红黑配色，当年觉得帅极了。坐了三年腰更疼了。' }, build: (g) => gamingChair(g) });
  item({ id: 'meshChair', name: '人体工学椅', life: [[E20, 1e4]], at: D(0.08, 0, 0.75), ry: 0.3,
    info: { when: '2019—', text: '居家办公前一个月买的。三十岁之后，买椅子先看腰托。' }, build: (g) => meshChair(g) });
  // school uniform over the chair back, 2005–2011
  const uniform = (g) => {
    box(g, 0.42, 0.3, 0.05, tmat(fabric('#2f5fa8', 'stripes', 3), 0.95), 0, 0, 0, { r: 0.02 });
    box(g, 0.43, 0.06, 0.055, C.white, 0, 0.2, 0, { r: 0.02 });
  };
  item({ id: 'uniform', name: '校服', parent: woodChairItem, life: [[-1e4, E08]], at: [0, 0.72, 0.2],
    info: { when: '2005—2011', text: '蓝白校服，袖口被圆珠笔画满了。每天回家第一件事：脱校服，开机。' }, build: uniform });
  item({ id: 'uniform2', name: '校服', parent: officeChairItem, life: [[E08, E12]], at: [0, 0.72, 0.29],
    info: { when: '2005—2011', text: '高中换了套红白的，还是被我搭在椅背上，妈妈每周收走一次。' }, build: uniform });

  item({ id: 'kidStool', name: '小满的小板凳', life: [[ym(2023, 9), 1e4]], at: R(0.42, 0, 0.7), ry: 0.4,
    info: { when: '2023—', text: '小满自己从客厅搬来的，就摆在怀旧角旁边。坐上去刚好够得着 PS2 手柄。' },
    build(g) {
      const m = mat('#f2b632', 0.5);
      box(g, 0.26, 0.03, 0.22, m, 0, 0.2, 0, { r: 0.012 });
      for (const x of [-0.1, 0.1]) box(g, 0.03, 0.2, 0.2, m, x, 0, 0, { r: 0.008 });
    } });

  item({ id: 'beanbag', name: '懒人沙发', life: [[E20, 1e4]], at: [0.5, 0, -0.45],
    info: { when: '2019—', text: '床搬走后空出来的位置。午睡、看书、陪小满玩掌机，都在这里。' },
    build(g) {
      const m = tmat(fabric('#c48a5a', 'weave', 14), 0.95);
      const profile = [[0, 0], [0.34, 0.01], [0.4, 0.08], [0.38, 0.2], [0.3, 0.3], [0.18, 0.34], [0.12, 0.31], [0, 0.3]].map(([x, y]) => new THREE.Vector2(x, y));
      mesh(g, new THREE.LatheGeometry(profile, 28), m, 0, 0, 0, { s: [1, 1, 0.9] });
      sph(g, 0.26, m, 0, 0.3, -0.2, { s: [1.1, 0.95, 0.55], rx: -0.3 });
    } });

  item({ id: 'rugRound', name: '圆地毯', life: [[E12, E20]], at: [-0.5, 0.003, -0.5],
    info: { when: '2012—2019', text: '大学室友送的编织地毯，冬天光脚踩上去很暖。' },
    build: (g) => cyl(g, 0.72, 0.72, 0.012, tmat(rugTex('round'), 0.95), 0, 0, 0, { seg: 48, cast: false }) });
  item({ id: 'rugBig', name: '羊毛地毯', life: [[E20, 1e4]], at: [-0.35, 0.003, -0.45],
    info: { when: '2019—', text: '翻新后铺的大地毯。小满在上面学会了走路，也在上面打翻过一整杯果汁。' },
    build: (g) => box(g, 2.7, 0.014, 1.75, tmat(rugTex('rect'), 0.95), 0, 0, 0, { cast: false }) });

  item({ id: 'floorLamp', name: '落地灯', life: [[E20, 1e4]], at: [2.05, 0, 0.6],
    info: { when: '2019—', text: '纸灯罩的落地灯，晚上只开它和屏幕，房间刚好暗得舒服。' },
    build(g, d) {
      cyl(g, 0.13, 0.14, 0.02, C.steel, 0, 0, 0, { seg: 24 });
      cyl(g, 0.01, 0.01, 1.35, C.steel, 0, 0.02, 0);
      cyl(g, 0.16, 0.2, 0.26, new THREE.MeshStandardMaterial({ color: '#f3e3c3', emissive: '#ffbf73', emissiveIntensity: 0.55, roughness: 0.9, side: THREE.DoubleSide }), 0, 1.3, 0, { seg: 24, cast: false });
      d.light = new THREE.PointLight('#ffc27a', 0, 3.5, 2);
      d.light.position.set(0, 1.4, 0);
      g.add(d.light);
    },
    update(t, v, d) { d.light.intensity = 2.2 * v; },
  });

  // air conditioners
  item({ id: 'acOld', name: '老空调', life: [[-1e4, E20]], at: [1.45, 2.0, -1.9],
    info: { when: '2005—2019', text: '一开就“咔哒”响的老空调。夏天只许开到 26 度，电费单贴在冰箱上。' },
    build(g) {
      box(g, 0.82, 0.27, 0.2, mat('#e7dfcc', 0.5), 0, 0, 0, { r: 0.03 });
      for (let i = 0; i < 6; i++) box(g, 0.7, 0.006, 0.02, mat('#cfc4ad', 0.6), 0, 0.03 + i * 0.012, 0.1);
      box(g, 0.12, 0.03, 0.005, mat('#4a7b6b', 0.4), 0.28, 0.2, 0.101);
    } });
  item({ id: 'acNew', name: '新空调', life: [[E20, 1e4]], at: [1.45, 2.02, -1.9],
    info: { when: '2019—', text: '翻新时换的变频空调，安静到要看指示灯才知道开着。' },
    build(g) {
      box(g, 0.86, 0.26, 0.18, C.white, 0, 0, 0, { r: 0.05 });
      box(g, 0.8, 0.012, 0.02, mat('#d8d4cc', 0.5), 0, 0.03, 0.085);
      sph(g, 0.005, glow('#7fd4ff', 2), 0.3, 0.13, 0.091);
    } });

  // curtains
  const curtainGeo = pleatedCurtain(0.3, 1.5, 4, 0.025);
  const curtains = (texture) => (g) => {
    const m = tmat(texture, 0.95, { side: THREE.DoubleSide });
    for (const z of [WINDOW.z0 - 0.12, WINDOW.z1 + 0.12]) mesh(g, curtainGeo, m, 0, 0, z, { ry: PI / 2 });
    cyl(g, 0.012, 0.012, 1.7, C.silver, 0.02, 0.78, (WINDOW.z0 + WINDOW.z1) / 2, { rx: PI / 2, c: true });
  };
  item({ id: 'curtainOld', name: '碎花窗帘', life: [[-1e4, E20]], at: [-2.44, 1.55, 0],
    info: { when: '2005—2019', text: '妈妈挑的碎花窗帘。夏天下午阳光从缝里照在显示器上，只能把窗帘拉上一半。' },
    build: curtains(fabric('#efe3c8', 'floral', 21)) });
  item({ id: 'curtainNew', name: '亚麻窗帘', life: [[E20, 1e4]], at: [-2.44, 1.55, 0],
    info: { when: '2019—', text: '换成了遮光的亚麻窗帘，白天开会时拉上，屏幕不反光。' },
    build: curtains(fabric('#b9ad94', 'weave', 22)) });

  // ================= computers and displays =================

  const screens = [];
  const screen = (d, mesh, mode) => { screens.push({ item: d, mesh, mode }); mesh.userData.screen = d; };

  const crtItem = item({
    id: 'crt', name: '17 寸 CRT 显示器', keep: true,
    track: [
      { t: 0, p: A(0, 0.76, -0.07) },
      { t: E08, p: [1.95, 0.34, -0.42], r: [0, -0.25, 0] },
      { t: E16, p: N(0.02, 0.76, -0.07), lift: 0.4 },
      { t: E20, p: R(0.02, 0.76, -0.07), lift: 0.4 },
    ],
    memories: [
      [2005, '爸爸托人从电脑城扛回来的，比我的书包还沉。开机会“嗡”的一声，屏幕上有静电。'],
      [2008, '换了液晶屏后，它被抬到床尾的纸箱上，盖了一块枕巾，一盖就是好几年。'],
      [2016, '旧写字台挪到床尾，它也跟了过去，偶尔接上 PS2 怀旧一下。'],
      [2020, '翻新后它成了怀旧角的主角。老游戏还是在 CRT 上最好看。'],
      [2024, '小满第一次玩游戏，就是在这台显示器上。'],
    ],
    build(g, d) { screen(d, crt(g, screenMat()), (t) => (t < E08 ? 'os' : t >= E20 - 0.05 ? 'retro' : 'off')); },
  });
  item({ parent: crtItem, life: [[E08 + 0.1, E16]], at: [0, 0.42, 0.04],
    build: (g) => box(g, 0.44, 0.012, 0.36, tmat(fabric('#e9d9b8', 'stripes', 8), 0.95), 0, 0, 0, { r: 0.006, rz: 0.04 }) });
  const boxLabel = tmat(paint(256, 128, (c, w, h) => {
    c.fillStyle = '#c49a68'; c.fillRect(0, 0, w, h);
    c.fillStyle = '#2a2a2a'; c.font = `bold 52px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('旧物 勿扔', w / 2, h / 2);
  }), 0.9);
  const carton = (g, w, h, d, x, y, z, ry) => {
    box(g, w, h, d, C.card, x, y, z, { ry });
    box(g, 0.06, 0.002, d + 0.01, C.tape, x, y + h, z, { ry, cast: false });
    plane(g, w * 0.55, w * 0.27, boxLabel, x + Math.sin(ry) * (d / 2 + 0.002), y + h * 0.55, z + Math.cos(ry) * (d / 2 + 0.002), { ry });
  };
  item({ id: 'oldBox', name: '旧物纸箱', life: [[E08, E16]], at: [1.95, 0, -0.42], ry: -0.25,
    info: { when: '2008—2015', text: '箱子上写着“旧物 勿扔”。里面是小学课本、游戏光盘和一台拆下来的光驱。' },
    build(g) {
      carton(g, 0.5, 0.34, 0.45, 0, 0, 0, 0);
      carton(g, 0.44, 0.24, 0.4, -0.55, 0, 0.05, 0.2);
    } });
  item({ id: 'movingBoxes', name: '还没拆的纸箱', life: [[E20, VIT]], at: [0.68, 0, -1.72],
    info: { when: '2019—2021', text: '翻新后还没拆完的纸箱：奖状、课本、那块米色键盘，还有一摞 CD。后来它们都有了位置。' },
    build(g) {
      carton(g, 0.52, 0.36, 0.46, 0, 0, 0, 0.1);
      carton(g, 0.42, 0.26, 0.38, 0.02, 0.36, 0.0, -0.15);
    } });

  item({ id: 'lcd19', name: '19 寸宽屏液晶', life: [[E08, E12]], at: A(0, 0.76, -0.12),
    info: { when: '2008—2011', text: '攒了三年压岁钱换的宽屏。和 CRT 比，桌面一下子空出了一半。' },
    build(g, d) { screen(d, flat(g, screenMat(), { w: 0.44, h: 0.29, chin: 0.02, b: 0.014 }), () => 'os'); } });

  item({ id: 'led24', name: '24 寸 LED 显示器', life: [[E12, E20]],
    track: [{ t: 0, p: A(0, 0.76, -0.12) }, { t: E16, p: B(-0.52, 0.75, -0.14), r: [0, 0.38, 0] }],
    info: { when: '2012—2019', text: '大学第一笔奖学金买的 1080p。后来成了副屏，专门放直播和聊天窗口。' },
    build(g, d) { screen(d, flat(g, screenMat(), { w: 0.56, h: 0.34, b: 0.01, col: C.black, base: 'rect' }), (t) => (t < E16 ? 'os' : 'stream')); } });

  const m27 = item({ id: 'm27', name: '27 寸 144Hz', life: [[E16, 1e4]],
    track: [{ t: 0, p: B(0.13, 0.75, -0.12) }, { t: E20, p: [-2.13 + 0.285, 1.1, -1.86], r: [0, 0, PI / 2], lift: 0.1 }],
    info: { when: '2016—', text: '第一次体验 144Hz，鼠标指针都顺滑了。现在竖着挂在支架上看攻略和聊天。' },
    build(g, d) { screen(d, flat(g, screenMat(), { w: 0.62, h: 0.37, b: 0.008, col: C.black, base: 'none' }), (t) => (t < E20 ? 'os' : 'chat')); } });
  item({ parent: m27, life: [[-1e4, E20]], build(g) {
    box(g, 0.035, 0.012, 0.22, C.black, -0.09, 0, -0.03, { ry: 0.55 });
    box(g, 0.035, 0.012, 0.22, C.black, 0.09, 0, -0.03, { ry: -0.55 });
    box(g, 0.05, 0.22, 0.025, C.red, 0, 0.005, -0.08, { rx: -0.08 });
  } });
  item({ id: 'monitorArm', name: '显示器支架', life: [[E20, 1e4]], at: [-2.13, 0.74, -1.97],
    info: { when: '2019—', text: '一根杆子挂起竖屏，桌面终于能看见木纹了。' },
    build(g) {
      box(g, 0.08, 0.03, 0.08, C.steel, 0, 0, 0);
      cyl(g, 0.016, 0.016, 0.42, C.steel, 0, 0.03, 0);
      box(g, 0.035, 0.035, 0.1, C.steel, 0, 0.34, 0.05);
    } });

  item({ id: 'ultrawide', name: '34 寸带鱼屏', life: [[E20, 1e4]], at: D(0.05, 0.74, -0.2),
    info: { when: '2019—', text: '白天能并排开三个工作窗口，晚上是赛车和 RPG 的全景视野。' },
    build(g, d) { screen(d, ultrawide(g, screenMat()), () => 'os'); } });
  item({ id: 'lightbar', name: '屏幕挂灯', parent: null, life: [[E20, 1e4]], at: D(0.05, 1.2, -0.21),
    info: { when: '2019—', text: '挂在屏幕上的灯条，只照桌面不照屏幕。眼睛终于不那么累了。' },
    build(g) {
      box(g, 0.45, 0.025, 0.03, C.steel, 0, 0, 0, { r: 0.01 });
      box(g, 0.43, 0.004, 0.018, glow('#fff1d6', 1.6), 0, -0.002, 0.003, { cast: false });
    } });
  item({ id: 'webcam', name: '摄像头', life: [[WFH, 1e4]], at: D(-0.1, 1.225, -0.2),
    info: { when: '2020—', text: '2020 年 2 月抢不到，托朋友从外地寄来的。开会时总有人问我身后那台 CRT 是什么。' },
    build(g) {
      box(g, 0.09, 0.03, 0.03, C.black, 0, 0, 0, { r: 0.012 });
      cyl(g, 0.01, 0.01, 0.005, mat('#203050', 0.1, 0.5), 0, 0.015, 0.016, { rx: PI / 2, c: true });
    } });
  item({ id: 'laptop', name: '公司笔记本', life: [[WFH, E25]], at: D(0.66, 0.74, -0.1), ry: -0.35,
    info: { when: '2020—2024', text: '公司配的笔记本，贴着资产编号。五点五十九分准时合上。' },
    build(g, d) {
      box(g, 0.24, 0.012, 0.2, C.silver, 0, 0, 0);
      box(g, 0.24, 0.1, 0.012, C.silver, 0, 0, -0.09, { rx: 0.5 });
      const l = grp(g, 0, 0.09, 0.0);
      l.rotation.x = 0.28;
      screen(d, laptop(l, screenMat(), C.grey, 1.95), () => 'sheet');
    } });

  // towers under the desk
  const TOWER = [-2.12, 0, -1.72];
  item({ id: 'towerBeige', name: '米色组装机', life: [[-1e4, E08]], at: TOWER,
    info: { when: '2005—2007', text: '赛扬 D、256MB 内存、GeForce MX440。开机要等一分半，风扇比我还吵。' }, build: (g) => tower(g, 'beige') });
  item({ id: 'towerBlack', name: '黑色机箱', life: [[E08, E12]], at: TOWER,
    info: { when: '2008—2011', text: '和表哥一起去电脑城挑的，前面一圈蓝光风扇。半夜被妈妈发现亮着灯。' }, build: (g) => tower(g, 'black08') });
  item({ id: 'towerWindow', name: '侧透机箱', life: [[E12, E16]], at: TOWER,
    info: { when: '2012—2015', text: '自己装的第一台机器，侧板是透明的，于是开始在意走线。' }, build: (g) => tower(g, 'window12') });
  item({ id: 'towerRgb', name: 'RGB 主机', life: [[E16, E25]], at: TOWER,
    info: { when: '2016—2023', text: '三把彩色风扇，玻璃侧板。光污染开了一周，后来一直调成同一个颜色。' }, build: (g) => tower(g, 'rgb16') });
  item({ id: 'towerWood', name: '木纹机箱', life: [[E25, 1e4]], at: TOWER,
    info: { when: '2024—', text: '前面板是胡桃木条，放在桌下像件家具。不再追求灯光，只要安静。' }, build: (g) => tower(g, 'wood25') });
  item({ id: 'sub08', name: '2.1 低音炮', life: [[E08, E12]], at: [-1.86, 0, -1.8],
    info: { when: '2008—2011', text: '低音炮一开，楼下就来敲门。后来只敢在周末下午开。' },
    build(g) {
      box(g, 0.2, 0.25, 0.24, WOOD.walnut, 0, 0, 0, { r: 0.01 });
      cyl(g, 0.06, 0.06, 0.01, C.black, 0, 0.12, 0.121, { rx: PI / 2, c: true });
    } });

  // cables: messy early, tidy later
  const cableMat = mat('#2c2c2c', 0.7), beigeCable = mat('#cfc5ad', 0.7);
  prop([[-1e4, E08]], [0, 0, 0], (g) => {
    cable(g, [[-2.07, 0.36, -1.9], [-1.95, 0.2, -1.97], [-1.85, 0.5, -1.98], [-1.78, 0.79, -1.93], [-1.75, 0.9, -1.88]], 0.007, beigeCable);
    cable(g, [[-2.07, 0.3, -1.88], [-1.9, 0.02, -1.9], [-1.4, 0.01, -1.94], [-1.3, 0.01, -1.6], [-1.0, 0.01, -1.85]], 0.006, cableMat);
    cable(g, [[-1.75, 0.77, -1.42], [-1.72, 0.8, -1.55], [-1.58, 0.76, -1.95], [-1.6, 0.4, -1.98], [-2.05, 0.35, -1.9]], 0.004, beigeCable);
  });
  prop([[-1e4, E20]], [-1.3, 0, -1.92], (g) => {
    box(g, 0.32, 0.04, 0.06, C.white, 0, 0, 0, { r: 0.01 });
    sph(g, 0.005, glow('#ff4a3a', 2), 0.13, 0.04, 0);
  });
  prop([[E08, E16]], [0, 0, 0], (g) => {
    cable(g, [[-2.05, 0.4, -1.92], [-1.9, 0.1, -1.96], [-1.6, 0.02, -1.9], [-1.4, 0.02, -1.6], [-1.3, 0.02, -1.92]], 0.005, cableMat);
    cable(g, [[-1.86, 0.25, -1.8], [-1.7, 0.4, -1.97], [-1.75, 0.79, -1.95]], 0.005, cableMat);
  });

  // ================= input devices =================

  item({ id: 'kb05', name: '米色键盘', life: [[-1e4, E08], [ym(2023, 1), 1e4]],
    track: [{ t: 0, p: A(0, 0.76, 0.22) }, { t: ym(2023, 1), p: [1.8, 1.5, -1.968], r: [PI / 2, 0, 0] }],
    memories: [
      [2005, '第一块键盘。W、A、S、D 四个键的字很快就磨没了。'],
      [2023, '收拾纸箱时翻出来，洗干净装进了画框。字母磨掉的那几个键，比任何奖状都像奖状。'],
    ],
    build: (g) => keyboard(g, { body: C.beige, top: KB.y2005, tilt: 0 }) });
  item({ id: 'kbFrame', life: [[ym(2023, 1), 1e4]], at: [1.8, 1.5, -1.99],
    build(g) {
      box(g, 0.56, 0.26, 0.012, tmat(fabric('#2f3a48', 'weave', 44), 0.95), 0, 0, 0, { c: true });
      for (const [w, h, x, y] of [[0.6, 0.025, 0, 0.14], [0.6, 0.025, 0, -0.14], [0.025, 0.3, 0.29, 0], [0.025, 0.3, -0.29, 0]])
        box(g, w, h, 0.06, mat('#2a1e16', 0.5), x, y, 0.025, { c: true });
    } });
  prop([[-1e4, E08]], A(0.42, 0.76, 0.2), (g) => {
    pad(g, 0.22, 0.18, tmat(paint(256, 210, (c, w, h) => {
      const gr = c.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#7fb2e5'); gr.addColorStop(1, '#bfe3a0');
      c.fillStyle = gr; c.fillRect(0, 0, w, h);
      c.fillStyle = '#5c8c3f'; c.beginPath(); c.ellipse(w * 0.4, h, w * 0.7, h * 0.45, 0, 0, 7); c.fill();
    }), 0.9), 0, 0, 0);
    mouse(g, C.beige, 0.02, 0.004, 0.02, 0.1);
  });
  prop([[-1e4, E08]], A(0, 0.76, 0), (g) => {
    for (const x of [-0.275, 0.27]) {
      box(g, 0.09, 0.17, 0.1, C.beige, x, 0, -0.1, { r: 0.01 });
      cyl(g, 0.03, 0.03, 0.005, C.beige2, x, 0.09, -0.049, { rx: PI / 2, c: true });
    }
  });
  item({ id: 'headset05', name: '耳麦', life: [[-1e4, E08]], at: A(0.24, 1.16, -0.14), ry: 0.4, rz: -0.3,
    info: { when: '2005—2007', text: '十五块钱的耳麦，左耳有时没声音，要捏着线才行。' },
    build: (g) => headset(g, C.black, C.grey, 0, -0.06, 0, 0, true) });

  prop([[E08, E12]], A(0, 0.76, 0.2), (g) => keyboard(g, { body: C.gloss, top: KB.y2008, tilt: 0.04 }));
  item({ id: 'mouse08', name: '游戏鼠标', life: [[E08, E12]], at: A(0.42, 0.76, 0.2),
    info: { when: '2008—2011', text: '人生第一只“游戏鼠标”，侧键到现在都不知道干什么用的。' },
    build(g) { pad(g, 0.26, 0.21, mat('#20232a', 0.95), 0, 0, 0); mouse(g, mat('#3a3d45', 0.4, 0.3), 0.03, 0.004, 0.02, 0.15, 0.12); } });
  prop([[E08, E12]], A(0, 0.76, 0), (g) => {
    for (const x of [-0.29, 0.29]) {
      box(g, 0.08, 0.15, 0.09, C.black, x, 0, -0.14, { r: 0.012 });
      cyl(g, 0.026, 0.026, 0.005, mat('#333', 0.4), x, 0.08, -0.094, { rx: PI / 2, c: true });
    }
  });
  item({ id: 'headset08', name: '头戴耳麦', life: [[E08, E12]], at: A(-0.45, 0.775, 0.17), ry: 0.5,
    info: { when: '2008—2011', text: '和同学在 YY 里开黑必备。麦克风总被我咬得变形。' },
    build: (g) => { const h = headset(g, C.black, mat('#2c4fb0', 0.5), 0, 0, 0, 0, true); h.rotation.x = -PI / 2; } });

  prop([[E12, E16]], A(0, 0.76, 0.21), (g) => keyboard(g, { body: C.black, top: KB.y2012, h: 0.035, tilt: 0.05 }));
  prop([[E12, E16]], A(0.43, 0.76, 0.17), (g) => { pad(g, 0.32, 0.26, mat('#151517', 0.95), 0, 0, 0); mouse(g, C.black, 0.02, 0.004, 0.0, 0.05, 0.125); });
  item({ id: 'phones12', name: '监听耳机', life: [[E12, E16]], at: A(0.66, 0.6, 0.12), ry: PI / 2,
    info: { when: '2012—2015', text: '大学打工三个月换的耳机，挂在桌边一个夹子上。' },
    build(g) {
      box(g, 0.03, 0.17, 0.05, C.silver, 0, 0.0, -0.015);
      headset(g, mat('#2a2a2a', 0.4), mat('#8a6a4a', 0.6), 0, -0.04, 0.0, 0, false);
    } });

  prop([[E16, E20]], B(0.13, 0.75, 0.18), (g) => {
    pad(g, 0.9, 0.32, mat('#16161a', 0.95), 0.05, 0, 0.02);
    keyboard(g, { w: 0.36, body: C.black, top: KB.y2016, h: 0.035, x: -0.06, y: 0.004 });
    mouse(g, mat('#202024', 0.4), 0.28, 0.004, 0.0, 0, 0.125);
    box(g, 0.02, 0.003, 0.03, glow('#ff3d6e', 1.5), 0.28, 0.035, 0.03, { cast: false });
  });
  item({ id: 'headset16', name: '电竞耳机', life: [[E16, E20]], at: B(0.6, 0.75, -0.14),
    info: { when: '2016—2019', text: '7.1 声道，听脚步声。耳罩上有一圈会呼吸的灯，只有我自己看不到。' },
    build(g) {
      box(g, 0.1, 0.012, 0.1, C.black, 0, 0, 0, { r: 0.01 });
      cyl(g, 0.01, 0.01, 0.26, C.black, 0, 0.01, 0);
      headset(g, C.black, mat('#191919', 0.5), 0, 0.2, 0, 0, true);
    } });

  prop([[E20, 1e4]], D(0.03, 0.74, 0.2), (g) => {
    pad(g, 1.0, 0.3, mat('#5f6a55', 0.98), 0.05, 0, 0);
    keyboard(g, { w: 0.33, d: 0.13, body: mat('#c9c2b2', 0.5), top: KB.y2020, h: 0.035, x: -0.1, y: 0.004 });
    mouse(g, mat('#efebe3', 0.45), 0.32, 0.004, 0.0, 0, 0.12);
  });
  item({ id: 'phones20', name: '耳机架', life: [[E20, 1e4]], at: D(-0.78, 0.74, 0.12),
    info: { when: '2019—', text: '开放式耳机挂在木头耳机架上。开会戴耳麦，打游戏换它。' },
    build(g) {
      box(g, 0.1, 0.015, 0.1, WOOD.walnut, 0, 0, 0, { r: 0.01 });
      cyl(g, 0.012, 0.012, 0.26, WOOD.walnut, 0, 0.015, 0);
      headset(g, mat('#3a3633', 0.5), mat('#9a7b5a', 0.6), 0, 0.21, 0, 0, false);
    } });
  item({ id: 'micArm', name: '麦克风悬臂', life: [[E25, 1e4]], at: D(0.86, 0.74, -0.33),
    info: { when: '2024—', text: '本来想直播，最后只在周五和老朋友语音时用。' },
    build(g) {
      box(g, 0.05, 0.05, 0.05, C.black, 0, 0, 0);
      cable(g, [[0, 0.05, 0], [0, 0.35, 0.05], [-0.12, 0.42, 0.22], [-0.2, 0.36, 0.33]], 0.008, C.black);
      cyl(g, 0.025, 0.025, 0.13, mat('#2a2a2a', 0.35, 0.6), -0.2, 0.3, 0.33, { rx: 0.3 });
    } });
  item({ id: 'handheld', name: '掌机', life: [[E25, 1e4]], at: D(0.66, 0.74, -0.22), ry: -0.2,
    info: { when: '2024—', text: '出差带着它。小满更喜欢展示柜里那台 GBA。' },
    build(g) {
      box(g, 0.14, 0.04, 0.06, C.black, 0, 0, 0, { r: 0.01 });
      box(g, 0.28, 0.12, 0.022, mat('#2b2b2e', 0.5), 0, 0.03, 0.0, { rx: -0.25, r: 0.02 });
      box(g, 0.16, 0.095, 0.002, glow('#6b8fbf', 0.8), 0, 0.0995, 0.013, { rx: -0.25, c: true, cast: false });
    } });

  // ================= keepsakes =================

  const mug = item({
    id: 'mug', name: '妈妈的马克杯', keep: true,
    track: [{ t: 0, p: A(0.37, 0.76, -0.26) }, { t: E16, p: B(0.63, 0.75, -0.27) }, { t: E20, p: D(0.79, 0.74, 0.2) }],
    memories: [
      [2005, '妈妈每晚十点端来一杯热牛奶，放下就说：再玩十分钟。'],
      [2008, '牛奶换成了速溶咖啡。杯沿那个小缺口，是中考前一晚磕的。'],
      [2012, '上大学没带走它。放假回来，它被洗得干干净净，摆在原处。'],
      [2016, '工作后很少用笔了，它还是插满了笔，守在显示器右边。'],
      [2020, '居家办公那年，它重新装起了咖啡，一天三杯。'],
      [2025, '现在里面插着小满的蜡笔。缺口还在。'],
    ],
    build(g) {
      const m = mat('#f3ece0', 0.35);
      cyl(g, 0.04, 0.037, 0.095, m, 0, 0, 0, { seg: 24 });
      mesh(g, new THREE.TorusGeometry(0.026, 0.007, 8, 16), m, 0.045, 0.05, 0, { rz: 0 });
      cyl(g, 0.0405, 0.0405, 0.018, mat('#d9534f', 0.4), 0, 0.05, 0, { seg: 24 });
      box(g, 0.012, 0.008, 0.004, mat('#a99b85', 0.6), 0, 0.09, 0.039, { cast: false });
    },
  });
  const fill = (col) => (g) => cyl(g, 0.036, 0.036, 0.004, mat(col, 0.2), 0, 0.085, 0, { seg: 20, cast: false });
  const mugFill = (life, build) => item({ parent: mug, life, build });
  mugFill([[-1e4, E08]], fill('#f7f3ea'));
  mugFill([[E08, E12], [E20, E25]], fill('#4a2c1a'));
  mugFill([[E16, E20]], (g) => {
    const r = rng(9);
    for (let i = 0; i < 6; i++) cyl(g, 0.004, 0.004, 0.15, mat(['#1d3f8c', '#111', '#c62828', '#f2f2f2'][i % 4], 0.5), (r() - 0.5) * 0.04, 0.03, (r() - 0.5) * 0.04, { rz: (r() - 0.5) * 0.4, rx: (r() - 0.5) * 0.4, seg: 6 });
  });
  mugFill([[E25, 1e4]], (g) => {
    const r = rng(4);
    for (let i = 0; i < 7; i++) cyl(g, 0.0045, 0.0045, 0.12, mat(['#e53935', '#fdd835', '#43a047', '#1e88e5', '#8e24aa', '#fb8c00', '#6d4c41'][i], 0.6), (r() - 0.5) * 0.045, 0.03, (r() - 0.5) * 0.045, { rz: (r() - 0.5) * 0.5, rx: (r() - 0.5) * 0.5, seg: 6 });
  });

  const photoTex = paint(400, 300, (g, w, h) => {
    const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#9fc2d9'); gr.addColorStop(1, '#e9d9b4');
    g.fillStyle = gr; g.fillRect(0, 0, w, h);
    g.fillStyle = '#6b4b3a'; g.fillRect(0, h * 0.18, w, h * 0.22);
    g.fillStyle = '#f2d36b'; g.font = `bold 30px ${FONT}`; g.fillText('星际网吧', w * 0.3, h * 0.33);
    const kids = [['#d9534f', 0.2], ['#3e7cc4', 0.4], ['#f0ad4e', 0.6], ['#5cb85c', 0.8]];
    for (const [c, x] of kids) {
      g.fillStyle = '#f1c9a5'; g.beginPath(); g.arc(w * x, h * 0.55, 22, 0, 7); g.fill();
      g.fillStyle = '#2a2a2a'; g.beginPath(); g.arc(w * x, h * 0.53, 22, PI, 0); g.fill();
      g.fillStyle = c; g.fillRect(w * x - 26, h * 0.63, 52, h * 0.4);
    }
    g.fillStyle = 'rgba(255,240,200,0.15)'; g.fillRect(0, 0, w, h);
    g.fillStyle = '#ff9a3a'; g.font = `18px monospace`; g.fillText("'05 7 16", w * 0.74, h * 0.94);
  });
  item({
    id: 'photo', name: '网吧门口的合照', keep: true,
    track: [{ t: 0, p: A(-0.43, 1.31, -0.2), r: [0, 0.15, 0] }, { t: E16, p: B(-0.62, 0.75, 0.14), r: [0, 0.5, 0] }, { t: E20, p: [-1.0, 1.52, -1.92], r: [0, -0.1, 0] }],
    memories: [
      [2005, '小学毕业的暑假，四个人在“星际网吧”门口拍的，一人一瓶冰红茶。'],
      [2008, '四个人分在三所高中，周六还是约在老位置。'],
      [2012, '在四个城市上大学。照片里的我们还没长高。'],
      [2016, '阿伟结婚那天，我们把这张照片放大，摆在了签到台上。'],
      [2020, '居家那年，四个人每晚在语音里见面，像回到了网吧。'],
      [2025, '三座城市，周五晚上十点，还是会上线一小时。'],
    ],
    build(g) {
      const f = grp(g, 0, 0.06, 0);
      f.rotation.x = -0.18;
      frame(f, 0.16, 0.12, tmat(photoTex, 0.6), mat('#7a5232', 0.5), 0.015);
      box(g, 0.02, 0.11, 0.01, mat('#7a5232', 0.5), 0, 0, -0.04, { rx: 0.35 });
    },
  });

  // the pothos cutting that grows for twenty years
  const plantTrack = [
    { t: 0, p: [-2.42, 0.95, -0.62] },
    { t: ym(2009, 9), p: [0.12, 1.8, -1.86], lift: 0.2 },
    { t: E16, p: [0.08, 1.47, -1.86] },
  ];
  item({
    id: 'plant', name: '一段绿萝', keep: true, track: plantTrack,
    memories: [
      [2005, '妈妈从客厅那盆绿萝上剪下一段，插进水瓶：对着电脑，多看看绿色。'],
      [2008, '它在水里长出了白色的根，叶子多了几片。'],
      [2010, '换进了小花盆，搬到书架顶上。我不在家的日子，爸妈替我浇水。'],
      [2016, '藤垂下来，挡住了半排游戏盒。舍不得剪。'],
      [2020, '翻新时换了大盆。它是这个房间里唯一没被换掉的“家具”。'],
      [2025, '藤已经垂到地面。小满说，这是房间的头发。'],
    ],
    build(g, d) {
      const POT = ym(2009, 9);
      d.pots = [
        item({ parent: d, life: [[-1e4, POT]], build: (p) => {
          cyl(p, 0.04, 0.045, 0.16, glass, 0, 0, 0, { seg: 18 }).castShadow = false;
          cyl(p, 0.038, 0.042, 0.1, new THREE.MeshStandardMaterial({ color: '#cfe3d0', transparent: true, opacity: 0.35, roughness: 0.1 }), 0, 0.005, 0, { seg: 18, cast: false });
        } }),
        item({ parent: d, life: [[POT, E20]], build: (p) => {
          cyl(p, 0.07, 0.055, 0.11, mat('#b8643f', 0.8), 0, 0, 0, { seg: 20 });
          cyl(p, 0.075, 0.075, 0.02, mat('#a8583a', 0.8), 0, 0.1, 0, { seg: 20 });
          cyl(p, 0.066, 0.066, 0.005, mat('#3b2a1e', 1), 0, 0.105, 0, { seg: 20, cast: false });
        } }),
        item({ parent: d, life: [[E20, 1e4]], build: (p) => {
          cyl(p, 0.11, 0.085, 0.17, mat('#e8e0d0', 0.35), 0, 0, 0, { seg: 28 });
          cyl(p, 0.1, 0.1, 0.005, mat('#3b2a1e', 1), 0, 0.165, 0, { seg: 20, cast: false });
        } }),
      ];
      const geo = leafGeo();
      const greens = [mat('#3f7d3a', 0.5), mat('#5c9a46', 0.5), mat('#86b356', 0.55)];
      const r = rng(77);
      d.vines = [2004.9, 2005.3, 2009.5, 2012, 2015.5, 2019.5].map((start, v) => ({
        start, ang: -0.95 + v * 0.34 + (r() - 0.5) * 0.2,
        leaves: Array.from({ length: 36 }, (_, i) => {
          const l = mesh(g, geo, greens[(v + i) % 3], 0, 0, 0);
          l.userData.jit = [r(), r(), r()];
          return l;
        }),
      }));
      d.stems = d.vines.map(() => mesh(g, new THREE.BufferGeometry(), mat('#5f7f3c', 0.7), 0, 0, 0, { cast: false }));
    },
    update(t, v, d) {
      const POT = ym(2009, 9);
      const jar = t < POT;
      const top = jar ? 0.15 : t < E20 ? 0.11 : 0.17, rim = jar ? 0.02 : t < E20 ? 0.06 : 0.09;
      const floorY = -d.group.position.y + 0.01;
      d.vines.forEach((vine, vi) => {
        const age = t - vine.start;
        const len = jar ? Math.min(0.22, 0.08 + age * 0.03) : Math.min(2, age * 0.095);
        const count = age <= 0 || (jar && vi > 1) ? 0 : Math.floor(len / (jar ? 0.04 : 0.055)) + 1;
        const dir = new THREE.Vector3(Math.sin(vine.ang), 0, Math.cos(vine.ang));
        const pts = [];
        vine.leaves.forEach((l, i) => {
          l.visible = i < count && (!jar || vi < 2);
          if (!l.visible) return;
          const s = i * (jar ? 0.04 : 0.055);
          const [j0, j1, j2] = l.userData.jit;
          let x, y, z;
          if (jar) {
            x = dir.x * 0.012 * i; z = dir.z * 0.012 * i; y = top + 0.03 + s * 0.8;
          } else {
            const out = 0.22, h = Math.min(s, out);
            const drop = Math.max(0, s - out);
            y = top - drop * 0.95 + Math.sin(h / out * PI) * 0.03;
            const ext = y < floorY ? floorY - y : 0;
            y = Math.max(y, floorY);
            x = dir.x * (rim + h + ext) + Math.sin(s * 9 + vi) * 0.015;
            z = dir.z * (rim + h + ext) + Math.cos(s * 7 + vi) * 0.015;
          }
          l.position.set(x, y, z);
          l.rotation.set((j0 - 0.5) * 0.8, vine.ang + (j1 - 0.5) * 2.2, (j2 - 0.5) * 0.8);
          const tip = Math.min(1, (count - i) / 3);
          l.scale.setScalar((jar ? 0.8 : 1.05) * (0.45 + 0.55 * tip) * (0.85 + j0 * 0.3));
          pts.push(new THREE.Vector3(x, y + 0.005, z));
        });
        const stem = d.stems[vi];
        stem.visible = pts.length > 1;
        const key = `${pts.length}|${top}|${floorY.toFixed(2)}`;
        if (stem.visible && vine.key !== key) {
          vine.key = key;
          stem.geometry.dispose();
          stem.geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, top - 0.02, 0), ...pts]), pts.length * 3, 0.0025, 4);
        }
      });
    },
  });

  item({ id: 'calendar', name: '储蓄所送的挂历', keep: true,
    memories: [
      [2005, '每年元旦前，妈妈都会从储蓄所领一本挂历，挂在这颗钉子上。'],
      [2012, '我不在家的时候，妈妈在挂历上圈出我放假回来的日子。'],
      [2020, '爸妈回老家以后，挂历改成每年快递寄来。钉子还是那颗。'],
    ],
    build: (g) => g.add(room.calMesh) });
  item({ id: 'marks', name: '门边的身高线', keep: true,
    memories: [
      [2005, '每年生日靠墙站好，妈妈用铅笔画一道。13 岁，152。'],
      [2010, '画到 176 就停了。妈妈说：不长了，留着吧。'],
      [2020, '翻新刷墙时，特意绕开了这一小块。'],
      [2022, '红色的那列是小满，从 76 厘米开始。'],
    ],
    build: (g) => g.add(room.marksMesh) });

  // ================= game collection =================

  // bookshelf rows (world y = shelf top)
  const S = (x, y, z) => [-0.15 + x, y, -1.84 + z];
  prop([[-1e4, E16]], S(-0.2, 0.02, 0), (g) => {
    box(g, 0.32, 0.12, 0.22, mat('#f2c230', 0.6), 0, 0, 0);
    box(g, 0.3, 0.05, 0.002, mat('#c0392b', 0.6), 0, 0.05, 0.111, { cast: false });
  });
  item({ id: 'xbw', name: '小霸王学习机', life: [[-1e4, E16]], at: S(-0.2, 0.14, 0),
    info: { when: '1998—', text: '小学时的“学习机”，其实只学会了魂斗罗。卡带里有一盒“999 合 1”。' },
    build: (g) => cases(g, { x: 0, y: 0, z: 0, n: 4, w: 0.05, h: 0.012, d: 0.08, palette: ['#c9302c', '#eaeaea', '#f2c230'] }) });
  prop([[-1e4, E16]], S(0.2, 0.02, 0), (g) => books(g, { x: 0, y: 0, z: 0, width: 0.32, hMin: 0.25, hMax: 0.3, depth: 0.24, seed: 30, palette: ['#6b3a2a', '#2f4f4f', '#8b6b3a'] }));
  prop([[-1e4, E12]], S(0, 0.38, 0), (g) => books(g, { x: 0, y: 0, z: 0, width: 0.72, seed: 31, hMin: 0.2, hMax: 0.26 }));
  item({ id: 'pcBoxes', name: '正版游戏大盒', life: [[E12, E16]], at: S(0, 0.38, 0),
    info: { when: '2012—2015', text: '大学时开始买正版。盒子比游戏本身还占地方，舍不得扔。' },
    build(g) {
      for (let i = 0; i < 6; i++) box(g, 0.05, 0.27, 0.2, mat(['#20304f', '#7a2a1a', '#2d4a2a', '#4a2d5a', '#1a1a1a', '#b88a2a'][i], 0.4), -0.3 + i * 0.055, 0, 0, { rz: i === 5 ? -0.2 : 0 });
    } });
  item({ id: 'comics', name: '漫画单行本', life: [[-1e4, E08]], at: S(0, 0.74, 0.03),
    info: { when: '2005—2007', text: '一本五块，和同学轮流买、轮流看。最后一本永远找不到。' },
    build: (g) => books(g, { x: 0, y: 0, z: 0, width: 0.72, seed: 32, hMin: 0.17, hMax: 0.18, depth: 0.12, palette: ['#e74c3c', '#f1c40f', '#3498db', '#ecf0f1', '#2ecc71', '#e67e22'] }) });
  item({ id: 'dvds', name: '游戏光盘', life: [[E08, E16]], at: S(0, 0.74, 0.03),
    info: { when: '2008—2015', text: '一排游戏光盘，盘面上用记号笔写着“勿借”。借出去的那几张，现在还没还。' },
    build: (g) => cases(g, { x: 0, y: 0, z: 0, n: 30, seed: 4 }) });
  item({ id: 'jewel', name: 'CD 光盘', life: [[-1e4, E12]], at: S(-0.22, 1.1, 0),
    info: { when: '2005—2011', text: '电脑报附赠的光盘、同学刻的“合集”，还有一张正版《仙剑》。' },
    build: (g) => stack(g, { x: 0, y: 0, z: 0, n: 12, w: 0.14, d: 0.125, t: 0.011, seed: 8, palette: ['#d6d9df', '#c7e1f2', '#efe7c9'] }) });
  item({ id: 'fuwa', name: '福娃', life: [[E08, E16], [VIT, 1e4]],
    track: [{ t: 0, p: S(0.12, 1.1, 0.04) }, { t: VIT, p: [0.67, 1.158, -1.78] }],
    info: { when: '2008—', text: '奥运那年集齐的五个福娃。翻新后放进了展示柜最上层。' },
    build(g) {
      ['#2a7fd4', '#111', '#e64a19', '#3a9c3a', '#e2b33c'].forEach((c, i) => {
        sph(g, 0.022, mat(c, 0.7), (i - 2) * 0.05, 0.022, 0);
        sph(g, 0.02, mat('#f6e7d0', 0.8), (i - 2) * 0.05, 0.058, 0);
        sph(g, 0.014, mat(c, 0.7), (i - 2) * 0.05, 0.075, -0.004);
      });
    } });
  prop([[E12, E16]], S(0.2, 1.1, 0.02), (g) => {
    box(g, 0.08, 0.012, 0.08, C.black, 0, 0, 0);
    box(g, 0.05, 0.1, 0.03, mat('#e8e8ea', 0.4), 0, 0.012, 0);
    box(g, 0.07, 0.06, 0.035, mat('#2a5ab8', 0.4), 0, 0.11, 0);
    sph(g, 0.02, mat('#e8e8ea', 0.4), 0, 0.19, 0);
    box(g, 0.02, 0.1, 0.02, mat('#c62828', 0.4), 0.05, 0.08, 0, { rz: 0.4 });
  });
  item({ id: 'globe', name: '地球仪', life: [[-1e4, E12]], at: S(-0.2, 1.8, 0),
    info: { when: '2005—2011', text: '地理课要用的地球仪。被我转得太快，中国那块磨得最亮。' },
    build(g) {
      cyl(g, 0.05, 0.06, 0.02, mat('#7a5232', 0.5), 0, 0, 0);
      cyl(g, 0.006, 0.006, 0.1, C.silver, 0, 0.02, 0);
      sph(g, 0.08, tmat(poster('map', 256, 128), 0.5), 0, 0.17, 0, { rz: 0.4 });
    } });
  prop([[-1e4, E12]], S(0.2, 1.46, 0), (g) => {
    sph(g, 0.06, mat('#f19bb0', 0.4), 0, 0.06, 0, { s: [1.2, 1, 1] });
    sph(g, 0.02, mat('#f19bb0', 0.4), 0.075, 0.06, 0);
  });
  prop([[E08, E16]], S(-0.2, 1.46, 0), (g) => {
    box(g, 0.1, 0.03, 0.07, WOOD.walnut, 0, 0, 0);
    cyl(g, 0.008, 0.008, 0.08, mat('#d4af37', 0.3, 0.8), 0, 0.03, 0);
    cyl(g, 0.035, 0.015, 0.06, mat('#d4af37', 0.3, 0.8), 0, 0.11, 0);
  });

  // cube shelf cells: col x -0.34 / 0.04, cell floors y 0.02 / 0.3875 / 0.755 / 1.1225
  const Q = (c, r, dz = 0) => [c ? 0.04 : -0.34, [0.02, 0.3875, 0.755, 1.1225][r], -1.825 + dz];
  item({ id: 'ps4', name: '主机（2014）', life: [[E16, ym(2020, 11)]], at: Q(0, 0, 0.02),
    info: { when: '2016—2020', text: '工作后买的第一台主机，和同事周末联机。后来换代时卖给了表弟。' },
    build(g) {
      box(g, 0.3, 0.05, 0.28, C.gloss, 0, 0, 0, { r: 0.004 });
      box(g, 0.3, 0.004, 0.02, glow('#4a8cff', 1.4), 0, 0.03, 0.135, { cast: false });
      gamepad(g, C.black, 0, 0.05, 0.04);
    } });
  item({ id: 'toys', name: '小满的玩具筐', life: [[ym(2022, 9), 1e4]], at: Q(0, 0, 0.02),
    info: { when: '2022—', text: '格子柜最下面一格让给了小满。积木、绘本和一辆少了轮子的小车。' },
    build(g) {
      box(g, 0.32, 0.2, 0.28, tmat(fabric('#c9b18a', 'stripes', 40), 0.95), 0, 0, 0, { r: 0.02 });
      for (const [c, x] of [['#e53935', -0.06], ['#fdd835', 0.04], ['#1e88e5', 0.1]]) box(g, 0.05, 0.05, 0.05, mat(c, 0.5), x, 0.18, 0, { ry: x * 10 });
    } });
  prop([[E16, 1e4]], Q(1, 0, 0.02), (g) => stack(g, { x: 0, y: 0, z: 0, n: 4, w: 0.3, d: 0.28, t: 0.06, seed: 12, palette: ['#3b6e8f', '#b85c38', '#e0c068', '#5a8a5a'], jitter: 0.01 }));
  item({ id: 'consoleGames', name: '主机游戏盒', life: [[E16, 1e4]], at: Q(0, 1, 0.03),
    info: { when: '2016—', text: '每一盒都记得在哪买的。有几盒是生日礼物，塑封还没拆。' },
    build: (g) => cases(g, { x: 0, y: 0, z: 0, n: 14, w: 0.016, h: 0.17, d: 0.135, seed: 13, palette: ['#1f4fa8', '#1f4fa8', '#d32f2f', '#1a1a1a'] }) });
  prop([[E16, 1e4]], Q(1, 1, 0.02), (g) => books(g, { x: 0, y: 0, z: 0, width: 0.33, seed: 33, hMin: 0.17, hMax: 0.19, depth: 0.12 }));
  item({ id: 'figures', name: '手办', life: [[ym(2017, 6), 1e4]], at: Q(0, 2, 0.02),
    info: { when: '2017—', text: '每通关一个喜欢的游戏，就买一个小手办。没有一个超过两百块。' },
    build(g) {
      ['#c62828', '#f9a825', '#2e7d32', '#6a1b9a', '#1565c0'].forEach((c, i) => {
        const x = -0.13 + i * 0.065;
        cyl(g, 0.025, 0.025, 0.008, C.black, x, 0, 0);
        cyl(g, 0.012, 0.016, 0.05, mat(c, 0.5), x, 0.008, 0);
        sph(g, 0.018, mat('#f3d2b3', 0.6), x, 0.075, 0);
        sph(g, 0.019, mat(c, 0.6), x, 0.085, -0.003, { s: [1, 0.7, 1] });
      });
    } });
  item({ id: 'switch', name: '掌机底座', life: [[ym(2018, 1), 1e4]], at: Q(1, 2, 0.02),
    info: { when: '2017—', text: '通勤路上玩，回家插上底座接电视。翻新后电视没了，它就一直待在格子里。' },
    build(g) {
      box(g, 0.18, 0.11, 0.05, mat('#2a2a2c', 0.5), 0, 0, 0, { r: 0.008 });
      box(g, 0.035, 0.09, 0.012, mat('#00b4d8', 0.5), -0.11, 0.04, 0.02, { r: 0.006 });
      box(g, 0.035, 0.09, 0.012, mat('#ff4554', 0.5), 0.11, 0.04, 0.02, { r: 0.006 });
    } });
  item({ id: 'collector', name: '典藏版铁盒', life: [[E12, 1e4]],
    track: [{ t: 0, p: S(-0.18, 1.8, 0) }, { t: E16, p: Q(0, 3, 0.02) }],
    info: { when: '2012—', text: '吃了一个月泡面换来的典藏版。里面的设定集翻得最多。' },
    build(g) {
      box(g, 0.26, 0.2, 0.18, mat('#4a4f57', 0.35, 0.6), 0, 0, 0, { r: 0.006 });
      box(g, 0.2, 0.08, 0.002, mat('#c9a54a', 0.3, 0.7), 0, 0.07, 0.091, { cast: false });
    } });
  item({ id: 'ps5', name: '主机（2020）', life: [[ym(2020, 11), 1e4]], at: [0.33, 0, -1.84],
    info: { when: '2020—', text: '2020 年冬天抢了三次才买到。它太高了，只能立在格子柜旁边。' },
    build(g) {
      box(g, 0.1, 0.39, 0.26, mat('#f2f2f0', 0.4), 0, 0, 0, { r: 0.03 });
      box(g, 0.05, 0.37, 0.24, C.black, 0, 0.01, 0, { r: 0.01 });
    } });

  // vitrine shelves (world): base top 0.1, glass shelves 0.45 / 0.8 / 1.15
  const V = (x, y) => [0.67 + x, y, -1.78];
  item({ id: 'xbwVitrine', name: '小霸王与卡带', life: [[VIT, 1e4]], at: V(0, 0.1),
    info: { when: '1998—', text: '纸箱里翻出来的小霸王，接上 CRT 居然还能开机。' },
    build(g) {
      box(g, 0.26, 0.06, 0.16, mat('#f2c230', 0.55), -0.06, 0, 0, { r: 0.01 });
      box(g, 0.08, 0.05, 0.012, mat('#c9302c', 0.5), -0.06, 0.06, 0, { r: 0.004 });
      cases(g, { x: 0.15, y: 0, z: 0, n: 3, w: 0.012, h: 0.07, d: 0.09, palette: ['#c9302c', '#f2c230', '#eaeaea'] });
    } });
  item({ id: 'cdWallet', name: 'CD 包', life: [[-1e4, E08], [VIT, 1e4]],
    track: [{ t: 0, p: [1.25, 0.515, -1.0], r: [0, 0.3, 0] }, { t: VIT, p: V(-0.08, 0.458), r: [0, 0.1, 0] }],
    info: { when: '2005—', text: '拉链 CD 包，能装 24 张光盘。我的第一份“游戏收藏”，现在还装着。' },
    build(g) {
      box(g, 0.17, 0.035, 0.16, mat('#2b4f8f', 0.8), 0, 0, 0, { r: 0.015 });
      box(g, 0.17, 0.004, 0.005, C.silver, 0, 0.018, 0.08, { cast: false });
    } });
  item({ id: 'gba', name: 'GBA SP', life: ALWAYS,
    track: [
      { t: 0, p: [0.95, 0.515, -1.15], r: [0, 0.6, 0] },
      { t: E12, p: S(0.15, 1.46, 0.04) },
      { t: E16, p: Q(1, 3, 0.04) },
      { t: VIT, p: V(-0.05, 0.808) },
      { t: ym(2024, 6), p: [0.48, 0.42, -0.36], r: [0, -0.4, 0] },
    ],
    info: { when: '2004—', text: '十二岁生日礼物，翻盖“咔哒”一声最好听。现在是小满的了，存档里还有我当年的宝可梦。' },
    build(g) {
      box(g, 0.085, 0.012, 0.085, mat('#3b5cc4', 0.4), 0, 0, 0, { r: 0.008 });
      const lid = grp(g, 0, 0.012, -0.042);
      lid.rotation.x = -1.9;
      box(lid, 0.085, 0.085, 0.01, mat('#3b5cc4', 0.4), 0, 0, 0, { r: 0.008 });
      plane(lid, 0.06, 0.04, glow('#a5c87a', 0.5), 0, 0.045, 0.006);
    } });
  item({ id: 'psp', name: 'PSP', life: [[E08, E12], [VIT, 1e4]],
    track: [{ t: 0, p: [1.45, 0.515, -1.3], r: [0, -0.3, 0] }, { t: VIT, p: V(0.12, 0.808) }],
    info: { when: '2008—', text: '高中时偷偷在课桌下玩，被没收过一次，期末考进前十才还回来。' },
    build(g) {
      box(g, 0.17, 0.022, 0.075, C.gloss, 0, 0, 0, { r: 0.01 });
      plane(g, 0.09, 0.05, glow('#406080', 0.4), 0, 0.023, 0, { rx: -PI / 2 });
    } });
  item({ id: 'xpad', name: '有线手柄', life: [[ym(2010, 10), E16], [VIT, 1e4]],
    track: [{ t: 0, p: A(-0.5, 0.76, 0.0), r: [0, 0.25, 0] }, { t: VIT, p: V(0.1, 0.458) }],
    info: { when: '2010—', text: '第一次在电脑上用手柄玩动作游戏，线长三米，可以躺在床上玩。' },
    build: (g) => gamepad(g, mat('#e9e9e6', 0.45), 0, 0.012, 0) });
  item({ id: 'ps2', name: 'PS2', life: [[E20, 1e4]], at: R(0.42, 0.76, 0.06),
    info: { when: '2019—', text: '二手市场两百块淘的，和 CRT 是绝配。小满最爱玩里面那张赛车游戏。' },
    build(g) {
      box(g, 0.3, 0.075, 0.18, mat('#1c1c22', 0.45), 0, 0, 0, { r: 0.006 });
      box(g, 0.3, 0.004, 0.18, mat('#2a2a33', 0.4), 0, 0.037, 0, { cast: false });
      sph(g, 0.004, glow('#4caf50', 2), 0.12, 0.05, 0.091);
      gamepad(g, mat('#1c1c22', 0.45), -0.36, 0.012, 0.19, 0.3);
      cable(g, [[-0.12, 0.03, 0.09], [-0.2, 0.002, 0.15], [-0.3, 0.002, 0.17]], 0.003, C.black);
    } });
  prop([[E20, 1e4]], R(-0.49, 0.772, -0.19), (g) => cases(g, { x: 0, y: 0, z: 0, n: 14, w: 0.017, h: 0.19, d: 0.135, seed: 6, palette: ['#111', '#1a1a2a', '#202020'] }));

  // ================= walls =================

  const wallPoster = (id, name, life, kind, w, h, at, info, o = {}) => item({
    id, name, life, at: o.track ? undefined : at, track: o.track, info, rz: o.rz,
    build(g) {
      const tex = poster(kind, 512, Math.round((512 * h) / w));
      if (o.framed) frame(g, w, h, tmat(tex, 0.6), mat('#2a1e16', 0.5));
      else {
        plane(g, w, h, tmat(tex, 0.85));
        for (const [x, y] of [[-w / 2 + 0.02, h / 2 - 0.01], [w / 2 - 0.02, h / 2 - 0.01]]) plane(g, 0.04, 0.018, C.tape, x, y, 0.001, { rz: x > 0 ? -0.6 : 0.6 });
      }
    },
  });
  wallPoster('timetable', '课程表', [[-1e4, E12]], 'timetable', 0.34, 0.24, [-1.75, 1.43, WALL],
    { when: '2005—2011', text: '课程表贴在显示器正上方，妈妈说：抬头就能看见该干嘛。' });
  wallPoster('award', '奖状', [[-1e4, E20]], 'award', 0.36, 0.26, [-2.08, 1.88, WALL],
    { when: '2005—2019', text: '初一的三好学生。爸妈不许我揭，说留着给以后的孩子看。' });
  wallPoster('award2', '奖状', [[ym(2007, 7), E20]], 'award', 0.36, 0.26, [-1.66, 1.88, WALL],
    { when: '2007—2019', text: '初三又拿了一张。这是最后一张，后来墙上只剩游戏海报。' });
  wallPoster('fantasy', '游戏海报', [[E08, E16]], 'fantasy', 0.4, 0.56, [-0.83, 1.55, WALL],
    { when: '2008—2015', text: '杂志附赠的海报。四个角的胶带换了三次。' });
  wallPoster('landscape', '游戏原画', [[E16, 1e4]], 'landscape', 0.44, 0.33, [-0.83, 1.62, -1.985],
    { when: '2016—', text: '最喜欢的游戏的一张原画，裱了框。十年后的游戏都会过时，这张画不会。' }, { framed: true });
  wallPoster('map', '世界地图', [[-1e4, E12]], 'map', 0.8, 0.5, [1.05, 1.45, WALL],
    { when: '2005—2011', text: '玩策略游戏玩出来的地理成绩。红点是我们家。' });
  wallPoster('basketball', '篮球海报', [[-1e4, E08]], 'basketball', 0.4, 0.56, [1.95, 1.5, WALL],
    { when: '2005—2007', text: '那时候以为自己会长到一米九。' });
  wallPoster('olympic', '奥运海报', [[E08, E12]], 'olympic', 0.4, 0.56, [1.95, 1.5, WALL],
    { when: '2008—2011', text: '2008 年夏天，全班在教室里看开幕式。' });
  wallPoster('band', '演唱会海报', [[E12, E16]], 'band', 0.4, 0.56, [1.05, 1.45, WALL],
    { when: '2012—2015', text: '大二暑假和室友坐了六小时火车去看的演唱会。' });
  wallPoster('lan', '网吧联赛冠军', [[E12, 1e4]], 'lan', 0.42, 0.3, null,
    { when: '2011—', text: '城南网吧联赛冠军，奖品是三百小时网费。四个人一人一份，一直没用完。' },
    { track: [{ t: 0, p: [1.95, 1.5, WALL] }, { t: VIT, p: [0.67, 1.95, WALL] }] });
  wallPoster('kidArt', '小满的画', [[ym(2024, 9), 1e4]], 'kid', 0.28, 0.2, [2.25, 1.42, WALL],
    { when: '2024—', text: '“我的家”。房子、我们，还有趴在窗台上的橘子。屏幕被画成了一个大方块。' }, { rz: 0.06 });

  item({ id: 'panels', name: '吸音板', life: [[E25, 1e4]], at: [-1.98, 1.95, -1.98],
    info: { when: '2024—', text: '晚上语音不吵到隔壁的小满。颜色是从客厅沙发上取的。' },
    build(g) {
      const cols = ['#7d8a6a', '#c48a5a', '#e2d6bd', '#5b5f63'];
      for (let i = 0; i < 4; i++) box(g, 0.36, 0.36, 0.04, tmat(fabric(cols[i], 'weave', 50 + i), 0.98), (i % 2) * 0.4 - 0.2, Math.floor(i / 2) * 0.4 - 0.2, 0, { c: true, r: 0.01 });
    } });
  item({ id: 'pegboard', name: '洞洞板', life: [[E25, 1e4]], at: [-2.49, 1.52, -1.72], ry: PI / 2,
    info: { when: '2024—', text: '手柄、耳机和小满的贴纸都挂在这里。每个钩子上的东西都有固定位置。' },
    build(g) {
      box(g, 0.46, 0.62, 0.015, tmat(paint(256, 344, (c, w, h) => {
        c.fillStyle = '#d9d2bf'; c.fillRect(0, 0, w, h);
        c.fillStyle = '#7d7666';
        for (let y = 12; y < h; y += 22) for (let x = 12; x < w; x += 22) { c.beginPath(); c.arc(x, y, 3.5, 0, 7); c.fill(); }
        c.fillStyle = '#f2b632'; c.beginPath(); c.arc(w * 0.75, h * 0.86, 16, 0, 7); c.fill();
      }), 0.8), 0, 0, 0.0075, { c: true });
      for (const [col, x] of [[mat('#e9e9e6', 0.45), -0.1], [C.black, 0.1]]) gamepad(g, col, x, 0.14, 0.04).rotation.x = PI / 2;
      headset(g, mat('#3a3633', 0.5), mat('#9a7b5a', 0.6), 0, -0.2, 0.05, 0, false);
    } });

  item({ id: 'wallShelf', name: '墙上的置物板', life: [[E20, 1e4]], at: [-1.12, 1.5, -1.9],
    info: { when: '2019—', text: '合照、小摆件和一张旧的网吧会员卡，都放在抬头能看到的地方。' },
    build(g) {
      box(g, 0.75, 0.022, 0.2, WOOD.oak, 0, 0, 0);
      box(g, 0.055, 0.004, 0.085, mat('#c62828', 0.4), -0.25, 0.022, 0.03, { ry: 0.3 });
      cyl(g, 0.035, 0.03, 0.06, mat('#e8e0d0', 0.4), 0.28, 0.022, 0.0);
      sph(g, 0.03, mat('#5f8a4f', 0.7), 0.28, 0.1, 0.0, { s: [1, 0.8, 1] });
    } });

  // ================= daily life =================

  item({ id: 'bag', name: '书包', life: [[-1e4, E12]], at: [-0.92, 0, -1.3], ry: -0.4,
    info: { when: '2005—2011', text: '书包一扔就开机。作业做没做完，看书包有没有拉开就知道。' },
    build(g) {
      box(g, 0.3, 0.38, 0.14, mat('#2f4f7c', 0.85), 0, 0, 0, { r: 0.04, rx: -0.15 });
      box(g, 0.24, 0.14, 0.05, mat('#24406a', 0.85), 0, 0.05, 0.08, { r: 0.02, rx: -0.15 });
    } });
  item({ id: 'ball', name: '篮球', life: [[-1e4, E12]], at: [0.3, 0.12, -0.45],
    info: { when: '2005—2011', text: '周末上午打球，下午打游戏。后来只剩下午了。' },
    build: (g) => sph(g, 0.12, tmat(paint(256, 128, (c, w, h) => {
      c.fillStyle = '#d8692c'; c.fillRect(0, 0, w, h);
      c.strokeStyle = '#2a1408'; c.lineWidth = 4;
      for (const x of [w / 4, w / 2, (3 * w) / 4]) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, h); c.stroke(); }
      c.beginPath(); c.moveTo(0, h / 2); c.lineTo(w, h / 2); c.stroke();
    }), 0.8), 0, 0, 0) });
  item({ id: 'homework', name: '作业本', life: [[-1e4, E08]], at: A(-0.46, 0.76, 0.12), ry: 0.2,
    info: { when: '2005—2007', text: '数学练习册压在键盘下面。妈妈进门前，要先把它翻到写了一半的那页。' },
    build(g) {
      box(g, 0.26, 0.006, 0.19, C.paper, 0, 0, 0);
      box(g, 0.13, 0.008, 0.19, mat('#3a6fb0', 0.8), -0.065, 0, 0);
      box(g, 0.19, 0.028, 0.06, mat('#d9534f', 0.5), 0.02, 0.008, -0.04, { r: 0.012, ry: 0.4 });
    } });
  prop([[-1e4, E12]], A(0.44, 0.76, -0.02), (g) => stack(g, { x: 0, y: 0, z: 0, n: 5, w: 0.19, d: 0.2, t: 0.018, seed: 14, palette: ['#e8dcc2', '#3a6fb0', '#c0392b', '#f0c419'] }));
  prop([[-1e4, E12]], A(-0.56, 1.31, -0.2), (g) => {
    cyl(g, 0.045, 0.045, 0.03, mat('#d9534f', 0.4), 0, 0.045, 0, { rx: PI / 2, c: true, seg: 24 });
    plane(g, 0.07, 0.07, mat('#f8f4ea', 0.5), 0, 0.045, 0.016);
    for (const x of [-0.025, 0.025]) sph(g, 0.012, C.silver, x, 0.09, 0);
  });
  prop([[-1e4, E12]], A(-0.49, 0.772, -0.19), (g) => books(g, { x: 0, y: 0, z: 0, width: 0.27, seed: 34, hMin: 0.2, hMax: 0.24, depth: 0.2, lean: false }));

  item({ id: 'magazines', name: '游戏杂志', life: [[E08, E16]], at: [-0.83, 0, -1.78],
    info: { when: '2008—2015', text: '每月一本，攒了七年。卖废品时称了四十斤，最后还是留下了一半。' },
    build(g, d) {
      d.stacks = [0, 1, 2].map((i) => {
        const s = grp(g, (i - 1) * 0.09, 0, i * 0.02, i * 0.2);
        stack(s, { x: 0, y: 0, z: 0, n: 40, w: 0.21, d: 0.285, t: 0.007, seed: 20 + i, palette: ['#e74c3c', '#2c3e50', '#f1c40f', '#ecf0f1', '#16a085'] });
        return s;
      });
      d.stacks.forEach((s, i) => s.children.forEach((c, k) => (c.userData.k = k + i * 13)));
    },
    update(t, v, d) {
      const n = Math.floor((t - E08) * 10);
      for (const s of d.stacks) for (const c of s.children) c.visible = c.userData.k < n;
    } });
  prop([[E08, E12]], A(0.6, 0.76, 0.02), (g) => {
    bottle(g, new THREE.MeshPhysicalMaterial({ color: '#2a1408', roughness: 0.15, transmission: 0, transparent: true, opacity: 0.85 }), 0, 0, 0, 0.25);
    box(g, 0.09, 0.05, 0.002, C.red, 0, 0.09, 0.046, { cast: false });
  });
  item({ id: 'noodles', name: '泡面', life: [[E08, E12]], at: A(0.28, 0.76, 0.02),
    info: { when: '2008—2011', text: '周末爸妈不在家的标准午饭。叉子插在盖子上，边泡边等复活。' },
    build(g) {
      cyl(g, 0.055, 0.045, 0.1, mat('#f3efe6', 0.6), 0, 0, 0, { seg: 20 });
      cyl(g, 0.056, 0.056, 0.03, mat('#d84315', 0.5), 0, 0.06, 0, { seg: 20 });
      box(g, 0.004, 0.13, 0.008, C.white, 0.02, 0.1, 0, { rz: 0.3 });
    } });
  item({ id: 'suitcase', name: '行李箱', life: [[E12, E16]], at: [0.75, 0, -0.55], ry: 0.5,
    info: { when: '2012—2015', text: '大学四年，每个假期都是它先进门。贴纸越来越多，拉杆越来越松。' },
    build(g) {
      box(g, 0.4, 0.58, 0.24, mat('#2b5c7e', 0.45), 0, 0.04, 0, { r: 0.03 });
      for (const x of [-0.14, 0.14]) cyl(g, 0.025, 0.025, 0.03, C.rubber, x, 0.025, 0.08, { rz: PI / 2, c: true });
      box(g, 0.2, 0.03, 0.03, C.black, 0, 0.62, 0);
      box(g, 0.09, 0.07, 0.002, mat('#f2c230', 0.5), -0.08, 0.35, 0.121, { rz: 0.2, cast: false });
      box(g, 0.08, 0.08, 0.002, mat('#e8eef2', 0.5), 0.1, 0.2, 0.121, { rz: -0.1, cast: false });
    } });
  prop([[E12, E16]], A(0.5, 0.76, -0.12), (g) => { can(g, mat('#1e3c8c', 0.35, 0.5), 0, 0, 0); can(g, mat('#1e3c8c', 0.35, 0.5), 0.08, 0, 0.05); box(g, 0.06, 0.007, 0.12, C.black, -0.25, 0, 0.07, { ry: 0.3 }); });
  item({ id: 'takeout', name: '外卖和奶茶', life: [[E16, E20]], at: B(0.58, 0.75, 0.2),
    info: { when: '2016—2019', text: '加班到九点，外卖到了才开机。奶茶永远是三分糖。' },
    build(g) {
      box(g, 0.16, 0.06, 0.12, C.white, -0.05, 0, 0, { r: 0.008 });
      box(g, 0.165, 0.008, 0.125, mat('#d9d4c8', 0.5), -0.05, 0.06, 0);
      cyl(g, 0.04, 0.034, 0.15, mat('#e8d3b0', 0.3), 0.1, 0, -0.02, { seg: 16 });
      cyl(g, 0.004, 0.004, 0.09, mat('#222', 0.4), 0.11, 0.14, -0.02, { rz: 0.15 });
    } });
  item({ id: 'hoodie', name: '扔在床上的卫衣', life: [[E16, E20]], parent: bed, at: [-0.5, 0.52, 0.1],
    info: { when: '2016—2019', text: '下班回来往床上一扔，第二天早上再穿走。' },
    build(g) {
      const m = tmat(fabric('#7a8a6f', 'weave', 41), 0.95);
      box(g, 0.42, 0.04, 0.34, m, 0, 0, 0, { r: 0.018, ry: 0.4 });
      box(g, 0.3, 0.035, 0.08, m, 0.18, 0, 0.2, { r: 0.015, ry: -0.5 });
    } });
  prop([[E16, E20]], [0.6, 0, -0.62], (g) => {
    for (const z of [0, 0.14]) {
      cyl(g, 0.012, 0.012, 0.26, C.steel, 0, 0.045, z, { rz: PI / 2, c: true });
      for (const x of [-0.1, 0.1]) cyl(g, 0.045, 0.045, 0.04, C.black, x, 0.045, z, { rz: PI / 2, c: true, seg: 8 });
    }
  });
  item({ id: 'cat', name: '橘猫“橘子”', life: [[ym(2017, 9), 1e4]],
    track: [{ t: 0, p: [1.15, 0.52, -1.3], r: [0, 0.4, 0] }, { t: E20, p: [-2.4, 0.955, -0.85], r: [0, 0, 0], lift: 0.4 }],
    memories: [
      [2017, '2017 年秋天从小区楼下抱回来的。第一晚就占了我的枕头。'],
      [2020, '床搬走以后，它搬去了窗台。开会时偶尔会走过摄像头。'],
      [2025, '小满画画，第一个画的就是它。'],
    ],
    build(g) {
      const fur = tmat(fabric('#d98b45', 'stripes', 42), 0.95), white = mat('#f4ece0', 0.9);
      sph(g, 0.12, fur, 0, 0.07, 0, { s: [0.9, 0.6, 1.25] });
      sph(g, 0.06, fur, 0.0, 0.11, 0.15);
      sph(g, 0.03, white, 0.0, 0.09, 0.2, { s: [1, 0.7, 0.7] });
      for (const s of [-1, 1]) cyl(g, 0, 0.022, 0.04, fur, s * 0.032, 0.16, 0.14, { rz: -s * 0.3 });
      mesh(g, new THREE.TorusGeometry(0.11, 0.018, 6, 16, PI * 0.9), fur, 0, 0.03, -0.02, { rx: PI / 2, rz: -0.3 });
      for (const s of [-1, 1]) sph(g, 0.022, white, s * 0.04, 0.02, 0.2);
    } });
  prop([[WFH, ym(2023, 1)]], D(-0.56, 0.74, 0.27), (g) => {
    box(g, 0.19, 0.09, 0.1, mat('#e3eef4', 0.6), 0, 0, 0);
    box(g, 0.14, 0.02, 0.002, mat('#3a7bc8', 0.5), 0, 0.05, 0.051, { cast: false });
  });
  item({ id: 'badge', name: '工牌', life: [[WFH, E25]], at: D(0.52, 0.745, 0.3), ry: 0.6,
    info: { when: '2020—2024', text: '居家那两年，工牌挂在显示器支架上积灰。' },
    build(g) {
      box(g, 0.055, 0.003, 0.085, C.white, 0, 0, 0, { cast: false });
      box(g, 0.012, 0.003, 0.2, mat('#2a6fd0', 0.6), 0, 0.001, -0.14, { cast: false });
    } });
  item({ id: 'thermos', name: '保温杯', life: [[E25, 1e4]], at: D(0.62, 0.74, 0.12),
    info: { when: '2024—', text: '保温杯里泡枸杞。十三岁的我要是看到，大概会笑出声。' },
    build(g) {
      cyl(g, 0.034, 0.034, 0.2, mat('#3d5a4a', 0.35, 0.3), 0, 0, 0, { seg: 20 });
      cyl(g, 0.035, 0.035, 0.04, C.silver, 0, 0.2, 0, { seg: 20 });
    } });
  item({ id: 'toyCar', name: '玩具小车', life: [[ym(2024, 1), 1e4]], at: [0.08, 0.017, -0.12], ry: 0.7,
    info: { when: '2023—', text: '小满的车开到哪，橘子就追到哪。' },
    build(g) {
      box(g, 0.12, 0.035, 0.06, mat('#e53935', 0.4), 0, 0.015, 0, { r: 0.01 });
      box(g, 0.06, 0.03, 0.05, mat('#e53935', 0.4), -0.01, 0.045, 0, { r: 0.01 });
      for (const x of [-0.04, 0.04]) for (const z of [-0.03, 0.03]) cyl(g, 0.014, 0.014, 0.01, C.black, x, 0.014, z, { rx: PI / 2, c: true, seg: 10 });
    } });

  return { items, screens };
}

const tmp = { p: [0, 0, 0], r: [0, 0, 0], lift: 0 };
export function applyItems(items, t) {
  for (const d of items) {
    const v = presence(d.life, t);
    const g = d.group;
    d.v = v;
    g.visible = v > 0.003;
    if (!g.visible) continue;
    if (d.track) {
      placement(d.track, t, tmp);
      g.position.set(tmp.p[0], tmp.p[1] + tmp.lift, tmp.p[2]);
      g.rotation.set(tmp.r[0], tmp.r[1], tmp.r[2]);
    } else g.position.set(d.at[0], d.at[1], d.at[2]);
    if (v < 1) g.position.y += (1 - v) * 0.12;
    g.scale.setScalar(Math.max(0.001, v));
    d.update?.(t, v, d);
  }
}
