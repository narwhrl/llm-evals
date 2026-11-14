import * as THREE from 'three';
import { add, box, cyl, group, note, plane, sphere, std } from './kit.js';

export const DESK = { x: -0.25, y: 0.75, z: -1.72 };

const SCREENS = [
  { w: 0.60, h: 0.375, cy: 0.42 },
  { w: 0.84, h: 0.525, cy: 0.49 },
  { w: 0.92, h: 0.575, cy: 0.52 },
  { w: 1.30, h: 0.8125, cy: 0.62 },
  { w: 1.05, h: 0.65625, cy: 0.55 },
  { w: 1.42, h: 0.8875, cy: 0.66 },
];

function screenMesh(g, M, w, h, x, y, z, screenMeshes, isMain = true) {
  const mesh = plane(w, h, isMain ? M.screen : M.sideScreen);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  add(g, mesh, x, y, z);
  if (isMain) {
    mesh.userData.isScreen = true;
    screenMeshes.push(mesh);
  }
  return mesh;
}

function tube(g, M, points, radius = 0.006) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 18, radius, 5, false), M.rubber);
  mesh.castShadow = true;
  g.add(mesh);
  return mesh;
}

function caseBox(g, M, x, y, z, text, color, w = 0.14, h = 0.19, d = 0.028) {
  const plain = M.plastic;
  const spine = M.spine(text, color);
  const mesh = box(w, h, d, [spine, spine, plain, plain, plain, plain]);
  add(g, mesh, x, y, z);
  return mesh;
}

function keyboard(g, M, x, z, w, d, material, tilt = 0) {
  const kb = group('keyboard');
  const body = box(w, 0.028, d, M.plastic);
  add(kb, body, 0, 0, 0);
  const top = plane(w - 0.02, d - 0.02, material);
  top.castShadow = false;
  add(kb, top, 0, 0.015, 0, -Math.PI / 2);
  kb.position.set(x, DESK.y + 0.018, z);
  kb.rotation.x = tilt;
  g.add(kb);
  return kb;
}

function mouse(g, M, x, z, color, wired, era) {
  const m = group('mouse');
  add(m, sphere(0.045, color), 0, 0.03, 0);
  add(m, box(0.055, 0.025, 0.085, color), 0, 0.018, 0.01);
  add(m, box(0.006, 0.004, 0.03, M.black), 0, 0.047, -0.02);
  if (era >= 2) add(m, box(0.004, 0.002, 0.018, M.ledCool), 0, 0.05, 0.012);
  if (era === 0) add(m, sphere(0.016, M.metalDark), 0, 0.006, 0.02);
  m.position.set(x, DESK.y + 0.003, z);
  g.add(m);
  if (wired) {
    tube(g, M, [[x, DESK.y + 0.03, z], [x + 0.02, DESK.y + 0.06, z + 0.12], [x - 0.1, DESK.y + 0.01, z + 0.3], [x - 0.18, DESK.y - 0.05, z + 0.42]], 0.005);
  }
  return m;
}

function pad(g, M, w, d, x, z, material) {
  const p = plane(w, d, material);
  p.castShadow = false;
  add(g, p, x, DESK.y + 0.004, z, -Math.PI / 2);
  return p;
}

function drink(g, M, x, z, color, label) {
  const can = group('drink');
  add(can, cyl(0.035, 0.035, 0.12, color, 12), 0, 0.06, 0);
  add(can, cyl(0.036, 0.036, 0.012, M.metal, 12), 0, 0.122, 0);
  add(can, cyl(0.034, 0.034, 0.035, M.paper, 12), 0, 0.065, 0);
  can.position.set(x, DESK.y, z);
  g.add(can);
  if (label) note(can, { title: label[0], era: label[1], body: label[2], tag: '桌面' });
  return can;
}

function figure(g, M, x, z, size = 1) {
  const f = group('figure');
  const base = cyl(0.075 * size, 0.075 * size, 0.018 * size, M.black, 14);
  add(f, base, 0, 0.009 * size, 0);
  add(f, sphere(0.052 * size, M.cream), 0, 0.105 * size, 0);
  add(f, sphere(0.038 * size, M.red), 0, 0.035 * size, 0);
  add(f, box(0.02 * size, 0.07 * size, 0.02 * size, M.blue), -0.05 * size, 0.055 * size, 0);
  add(f, box(0.02 * size, 0.07 * size, 0.02 * size, M.blue), 0.05 * size, 0.055 * size, 0);
  f.position.set(x, DESK.y, z);
  g.add(f);
  return f;
}

function plant(g, M, x, z) {
  const p = group('plant');
  add(p, cyl(0.055, 0.045, 0.09, M.ceramicShade, 12), 0, 0.045, 0);
  add(p, cyl(0.05, 0.05, 0.012, M.woodDark, 12), 0, 0.095, 0);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const leaf = box(0.025, 0.11, 0.045, M.greenDark);
    add(p, leaf, Math.cos(a) * 0.04, 0.16, Math.sin(a) * 0.04, 0.1 * Math.cos(a), a, 0.35);
  }
  p.position.set(x, DESK.y, z);
  g.add(p);
  return p;
}

// ---------------------------------------------------------------- tables

function table(g, M, era) {
  const widths = [1.9, 2.0, 2.15, 2.25, 2.3, 2.4];
  const depths = [0.68, 0.72, 0.76, 0.8, 0.82, 0.85];
  const w = widths[era];
  const d = depths[era];
  const topMats = [M.woodLight, M.woodMid, M.black, M.woodDark, M.white, M.woodMid];
  const top = box(w, 0.06, d, topMats[era]);
  add(g, top, DESK.x, DESK.y - 0.03, DESK.z);

  if (era <= 1) {
    const legMat = era === 0 ? M.woodLight : M.woodDark;
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        add(g, box(0.055, 0.69, 0.055, legMat), DESK.x + sx * (w / 2 - 0.08), 0.345, DESK.z + sz * (d / 2 - 0.08));
      }
    }
    add(g, box(w - 0.2, 0.05, 0.04, legMat), DESK.x, 0.18, DESK.z - d / 2 + 0.08);
    // a shallow drawer under the right side
    add(g, box(0.5, 0.16, d - 0.12, legMat), DESK.x + w / 2 - 0.35, 0.6, DESK.z);
    add(g, box(0.16, 0.02, 0.02, M.metal), DESK.x + w / 2 - 0.35, 0.6, DESK.z + d / 2 - 0.055);
  } else if (era === 2) {
    for (const sx of [-1, 1]) {
      add(g, box(0.05, 0.69, 0.05, M.metalDark), DESK.x + sx * (w / 2 - 0.1), 0.345, DESK.z - d / 2 + 0.1);
      add(g, box(0.05, 0.69, 0.05, M.metalDark), DESK.x + sx * (w / 2 - 0.1), 0.345, DESK.z + d / 2 - 0.1);
    }
    add(g, box(w - 0.2, 0.04, 0.04, M.metalDark), DESK.x, 0.24, DESK.z);
    add(g, plane(w - 0.04, d - 0.04, M.glass), DESK.x, DESK.y + 0.002, DESK.z, -Math.PI / 2);
  } else {
    for (const sx of [-1, 1]) {
      add(g, box(0.07, 0.68, 0.1, M.metalDark), DESK.x + sx * (w / 2 - 0.16), 0.36, DESK.z);
      add(g, box(0.1, 0.035, d - 0.12, M.metalDark), DESK.x + sx * (w / 2 - 0.16), 0.02, DESK.z);
    }
    add(g, box(0.12, 0.06, d - 0.2, M.metalDark), DESK.x, 0.66, DESK.z);
    if (era >= 4) add(g, box(0.5, 0.02, 0.05, M.plastic), DESK.x + w / 2 - 0.35, 0.7, DESK.z + d / 2 - 0.06);
  }

  if (era === 0) {
    // stickers and a scratch on the cheap first desk
    const s1 = plane(0.12, 0.08, M.orange);
    add(g, s1, DESK.x - w / 2 + 0.16, DESK.y + 0.003, DESK.z + d / 2 - 0.12, -Math.PI / 2);
    const s2 = plane(0.09, 0.06, M.blue);
    add(g, s2, DESK.x - w / 2 + 0.33, DESK.y + 0.003, DESK.z - d / 2 + 0.13, -Math.PI / 2);
    add(g, box(0.22, 0.002, 0.004, M.woodDark), DESK.x + 0.2, DESK.y + 0.003, DESK.z + 0.12);
  }
  if (era >= 3) pad(g, M, w - 0.12, d - 0.1, DESK.x, DESK.z, era >= 5 ? M.deskMatLate : M.deskMat);
  else pad(g, M, 0.36, 0.26, 0.02, -1.52, era === 0 ? M.clothBlue : M.rubber);
  return g;
}

// ------------------------------------------------------------- monitors

function crt(g, M, screenMeshes) {
  // shell tapers towards the back, like a real tube monitor
  const shell = box(0.78, 0.62, 0.42, M.cream);
  add(g, shell, 0, 0.42, -0.02);
  add(g, box(0.56, 0.44, 0.2, M.creamShade), 0, 0.38, -0.3);
  const bezel = [
    [-0.34, 0.42, 0.195, 0.10, 0.62], [0.34, 0.42, 0.195, 0.10, 0.62],
    [0, 0.68, 0.195, 0.78, 0.1], [0, 0.16, 0.195, 0.78, 0.1],
  ];
  for (const [x, y, z, w, h] of bezel) add(g, box(w, h, 0.03, M.creamShade), x, y, z);
  screenMesh(g, M, SCREENS[0].w, SCREENS[0].h, 0, SCREENS[0].cy, 0.212, screenMeshes);
  add(g, cyl(0.018, 0.018, 0.012, M.creamShade, 10), 0.24, 0.12, 0.215, Math.PI / 2);
  add(g, box(0.1, 0.012, 0.008, M.orange), -0.24, 0.12, 0.215);
  add(g, box(0.44, 0.06, 0.34, M.creamShade), 0, 0.07, -0.02);
  add(g, box(0.16, 0.12, 0.16, M.cream), 0, 0.14, -0.02);
  const sticker = plane(0.14, 0.07, M.orange);
  add(g, sticker, 0.26, 0.66, 0.196, 0, 0, -0.1);
  note(g, {
    title: '大屁股 CRT', era: '2005 — 2009',
    body: '17 寸，占掉半张桌子，开机有一声「咚」。2009 年换了宽屏，没舍得扔，先塞到床底下，后来搬进了墙角。',
    tag: '后来收进了旧物角',
  });
}

function lcd(g, M, screenMeshes) {
  add(g, box(0.98, 0.6, 0.05, M.black), 0, 0.49, 0);
  add(g, box(0.98, 0.06, 0.052, M.plasticSoft), 0, 0.215, 0.002);
  screenMesh(g, M, SCREENS[1].w, SCREENS[1].h, 0, SCREENS[1].cy, 0.028, screenMeshes);
  add(g, box(0.1, 0.12, 0.08, M.plastic), 0, 0.29, -0.03);
  add(g, cyl(0.16, 0.18, 0.02, M.plastic, 18), 0, 0.01, 0);
  add(g, box(0.012, 0.012, 0.006, M.ledCool), 0.42, 0.215, 0.031);
  note(g, {
    title: '第一块宽屏', era: '2009 — 2012',
    body: '攒了半年，16:10。第一次发现游戏里能看见更多东西，也第一次觉得桌子不够宽了。',
    tag: '设备升级',
  });
}

function dual(g, M, screenMeshes) {
  const main = group('main-monitor');
  add(main, box(1.06, 0.65, 0.045, M.plastic), 0, 0.52, 0);
  screenMesh(main, M, SCREENS[2].w, SCREENS[2].h, 0, SCREENS[2].cy, 0.026, screenMeshes);
  add(main, box(0.08, 0.16, 0.07, M.metalDark), 0, 0.24, -0.03);
  add(main, cyl(0.15, 0.17, 0.02, M.metalDark, 18), 0, 0.01, 0);
  main.position.set(-0.55, DESK.y, -1.95);
  g.add(main);
  const side = group('side-monitor');
  add(side, box(0.8, 0.5, 0.04, M.plastic), 0, 0.42, 0);
  screenMesh(side, M, 0.66, 0.4125, 0, 0.43, 0.024, screenMeshes, false);
  add(side, box(0.06, 0.14, 0.06, M.metalDark), 0, 0.2, -0.02);
  add(side, cyl(0.12, 0.13, 0.02, M.metalDark, 16), 0, 0.01, 0);
  side.position.set(0.48, DESK.y, -1.97);
  side.rotation.y = -0.22;
  g.add(side);
  note(g, {
    title: '双屏', era: '2013 — 2016',
    body: '左边打游戏，右边挂战绩和聊天。为这两块屏换过桌子和椅子，那把旧木椅终于退休。',
    tag: '设备升级',
  });
}

function bigScreen(g, M, screenMeshes) {
  add(g, box(1.46, 0.9, 0.06, M.black), 0, 0.62, 0);
  add(g, box(1.48, 0.05, 0.065, M.metalDark), 0, 0.16, 0);
  screenMesh(g, M, SCREENS[3].w, SCREENS[3].h, 0, SCREENS[3].cy, 0.033, screenMeshes);
  add(g, box(0.1, 0.2, 0.09, M.metalDark), 0, 0.27, -0.04);
  add(g, cyl(0.24, 0.26, 0.022, M.metalDark, 20), 0, 0.012, 0);
  add(g, box(0.5, 0.012, 0.01, M.ledWarm), 0, 0.17, 0.036);
  note(g, {
    title: '一整块大屏', era: '2017 — 2020',
    body: '桌面第一次完全属于游戏。床搬走那年买的，装好后第一件事是把 2005 年的存档拷进来。',
    tag: '设备升级',
  });
}

function armScreen(g, M, screenMeshes, era) {
  const w = era === 4 ? SCREENS[4].w : SCREENS[5].w;
  const h = era === 4 ? SCREENS[4].h : SCREENS[5].h;
  const cy = era === 4 ? SCREENS[4].cy : SCREENS[5].cy;
  const px = era === 4 ? -0.38 : -0.32;
  const main = group('main-monitor');
  add(main, box(w + 0.09, h + 0.08, 0.035, M.plastic), 0, cy, 0);
  screenMesh(main, M, w, h, 0, cy, 0.02, screenMeshes);
  // clamp-on arm behind the panel
  add(main, box(0.09, 0.09, 0.1, M.metal), 0, cy, -0.07);
  add(main, box(0.06, 0.62, 0.06, M.metal), 0, cy - 0.32, -0.12);
  add(main, box(0.12, 0.06, 0.22, M.metalDark), 0, 0.01, -0.18);
  main.position.set(px, DESK.y, -1.95);
  g.add(main);
  // vertical companion screen
  const vw = era === 4 ? 0.4 : 0.46;
  const vh = era === 4 ? 0.66 : 0.74;
  const side = group('side-monitor');
  add(side, box(vw + 0.05, vh + 0.05, 0.03, M.plastic), 0, cy - 0.04, 0);
  const sidePane = plane(vw, vh, M.dark);
  sidePane.castShadow = false;
  add(side, sidePane, 0, cy - 0.04, 0.017);
  for (let i = 0; i < 7; i++) {
    add(side, box(vw - 0.06, 0.012, 0.004, i % 3 === 0 ? M.ledCool : M.grey), 0, cy - 0.04 + vh / 2 - 0.12 - i * (vh / 9), 0.021);
  }
  add(side, box(0.05, 0.34, 0.05, M.metal), 0, 0.18, -0.1);
  side.position.set(0.72, DESK.y, -1.97);
  g.add(side);
  note(g, {
    title: era === 4 ? '显示器臂和竖屏' : '最后一块屏', era: era === 4 ? '2021 — 2024' : '2025',
    body: era === 4
      ? '桌子终于空出来了：两支臂把屏幕吊起，竖屏放聊天和弹幕。补光灯亮起来的时候，房间像个小演播室。'
      : '更宽、更薄，支架还是那两支。屏幕里留着 2005 年那个文件夹，偶尔点开打一局。',
    tag: '设备升级',
  });
}

export function buildMonitors(M, screenMeshes) {
  const groups = [];
  const builders = [crt, lcd, dual, bigScreen,
    (g, m, s) => armScreen(g, m, s, 4), (g, m, s) => armScreen(g, m, s, 5)];
  const positions = [
    [DESK.x, DESK.y, -1.92], [DESK.x, DESK.y, -1.95], [0, 0, 0],
    [DESK.x, DESK.y, -1.96], [0, 0, 0], [0, 0, 0],
  ];
  builders.forEach((build, i) => {
    const g = group(`monitor-${i}`);
    build(g, M, screenMeshes);
    g.position.set(...positions[i]);
    groups.push(g);
  });
  return groups;
}

// -------------------------------------------------------------- towers

function tower(g, M, era) {
  const specs = [
    { x: 0.78, y: 0.28, z: -1.72, w: 0.28, h: 0.56, d: 0.5, mat: M.cream, tray: [M.creamShade, M.cream] },
    { x: 0.85, y: 0.3, z: -1.7, w: 0.3, h: 0.6, d: 0.55, mat: M.black, tray: [M.plastic, M.metalDark] },
    { x: 0.92, y: 0.33, z: -1.66, w: 0.34, h: 0.66, d: 0.6, mat: M.plastic, tray: [M.metalDark, M.black] },
    { x: 1.02, y: 0.36, z: -1.6, w: 0.32, h: 0.72, d: 0.58, mat: M.black, tray: [M.glass, M.metalDark] },
    { x: 1.18, y: 0.3, z: -1.5, w: 0.26, h: 0.56, d: 0.42, mat: M.white, tray: [M.white, M.metal] },
    { x: 1.15, y: 0.36, z: -1.45, w: 0.3, h: 0.7, d: 0.5, mat: M.white, tray: [M.glass, M.metal] },
  ];
  const s = specs[era];
  const t = group('tower');
  add(t, box(s.w, s.h, s.d, s.mat), 0, 0, 0);
  // front panel details differ by generation
  if (era === 0) {
    add(t, box(s.w - 0.06, 0.03, 0.008, M.creamShade), 0, 0.16, s.d / 2 + 0.005);
    add(t, box(s.w - 0.06, 0.02, 0.008, M.creamShade), 0, 0.09, s.d / 2 + 0.005);
    add(t, cyl(0.018, 0.018, 0.008, M.metal, 10), 0.08, -0.2, s.d / 2 + 0.006, Math.PI / 2);
    add(t, box(0.08, 0.04, 0.006, M.orange), -0.06, -0.2, s.d / 2 + 0.005);
  } else if (era === 1) {
    for (let i = 0; i < 3; i++) add(t, box(s.w - 0.06, 0.022, 0.008, s.tray[1]), 0, 0.18 - i * 0.06, s.d / 2 + 0.005);
    add(t, cyl(0.02, 0.02, 0.008, M.ledCool, 10), 0.09, -0.24, s.d / 2 + 0.006, Math.PI / 2);
  } else if (era === 2) {
    add(t, box(0.008, s.h - 0.1, s.d - 0.1, s.tray[0]), -s.w / 2 - 0.001, 0, 0);
    for (let i = 0; i < 3; i++) add(t, cyl(0.075, 0.075, 0.012, M.ledCool, 14), 0, 0.16 - i * 0.16, s.d / 2 + 0.008, Math.PI / 2);
  } else if (era === 3) {
    add(t, box(s.w - 0.05, s.h - 0.08, 0.008, s.tray[0]), -s.w / 2 - 0.002, 0, 0, 0, Math.PI / 2);
    add(t, box(0.008, s.h - 0.12, 0.02, M.ledWarm), -0.005, 0, s.d / 2 + 0.008);
    for (let i = 0; i < 2; i++) add(t, cyl(0.08, 0.08, 0.01, M.metalDark, 14), 0, 0.14 - i * 0.18, s.d / 2 + 0.008, Math.PI / 2);
  } else {
    add(t, box(0.005, s.h - 0.12, s.d - 0.08, s.tray[0]), -s.w / 2 - 0.001, 0, 0);
    add(t, box(0.006, s.h - 0.16, 0.012, M.ledCool), 0.005, 0, s.d / 2 + 0.008);
    add(t, cyl(0.026, 0.026, 0.008, M.metal, 10), 0.08, -s.h / 2 + 0.08, s.d / 2 + 0.006, Math.PI / 2);
  }
  t.position.set(s.x, s.y, s.z);
  g.add(t);
  note(t, {
    title: ['米白立式机箱', '黑色塔式机箱', '侧透机箱', '中塔机箱', '白色小机箱', '静音主机'][era],
    era: ['2005', '2009', '2013', '2017', '2021', '2025'][era],
    body: [
      '软驱还在，风扇声比游戏声大。夏天得把侧板拆下来散热，螺丝一直放在笔筒里。',
      '第一台自己挑配置的机器，光驱位留了三个。半夜下载补丁，机箱灯亮一整晚。',
      '第一次有了侧透，里面装了会亮的风扇。那时候觉得这就是「电竞」两个字的意思。',
      '风扇换了静音的，灯只剩一条。玩得久了，反而开始嫌吵、嫌亮。',
      '机器小到能放在桌上，桌子底下终于空了。搬家时最先装箱的也是它。',
      '二十年里最安静的一台。性能早就用不完了，只是习惯开机时听一声。',
    ][era],
    tag: '主机',
  });
  return t;
}

// ------------------------------------------------------------ desk sets

function clutter(g, M, era, screenMeshes) {
  // keyboard / mouse / pad handled by table(); add the objects that date the desk
  const kbMats = [M.keycapCream, M.keycap, M.keycap, M.keycap, M.keycapCream, M.keycap];
  const kb = keyboard(g, M, -0.3, -1.5, era >= 3 ? 0.44 : 0.52, era >= 3 ? 0.15 : 0.18, kbMats[era], era === 0 ? 0.03 : 0);
  note(kb, {
    title: ['薄膜键盘', '黑色薄膜键盘', '第一把机械键盘', '紧凑机械键盘', '无线键盘', '客制化键盘'][era],
    era: ['2005', '2009', '2013', '2017', '2021', '2025'][era],
    body: [
      '按键按下去会塌一块，WASD 磨得发亮。空格键里全是饼干屑。',
      '跟着宽屏一起买的，键帽字体是那种很正的宋体感。',
      '攒钱买的第一把机械，青轴，夜里打字全家都听得见。',
      '换成了 75%，桌面留出一大块给鼠标。手终于不用架在桌沿上。',
      '无线之后桌上少了两根线，反而有点不习惯。',
      '自己换的键帽，右上角留了一个 2005 年的旧键帽。',
    ][era],
    tag: '外设',
  });
  mouse(g, M, 0.08, -1.48, era === 0 ? M.cream : era >= 4 ? M.white : M.plastic, era <= 3, era);

  if (era === 0) {
    // stacked jewel cases, sticky notes, a wired gamepad and a pencil cup
    for (let i = 0; i < 4; i++) {
      add(g, box(0.15, 0.022, 0.19, M.spine(['CS', 'WC3', 'NFS', 'DIABLO'][i], '#2b3a52')), -0.72, DESK.y + 0.012 + i * 0.023, -1.82, 0, 0.12 * (i % 2));
    }
    const cases = group('cd-stack');
    note(cases, { title: '光盘盒', era: '2005', body: '每张盘都写了名字，怕和同学换混了。后来有了下载，它们就一直躺在纸箱里。', tag: '收藏' });
    g.add(cases);
    const notePlane = plane(0.13, 0.13, M.note);
    add(g, notePlane, -0.92, DESK.y + 0.004, -1.55, -Math.PI / 2, 0, 0.1);
    const pad2 = group('gamepad');
    add(pad2, box(0.16, 0.045, 0.09, M.grey), 0, 0.02, 0);
    add(pad2, sphere(0.032, M.black), -0.05, 0.045, 0);
    add(pad2, sphere(0.02, M.red), 0.05, 0.045, 0);
    pad2.position.set(-0.62, DESK.y, -1.46);
    g.add(pad2);
    tube(g, M, [[-0.62, DESK.y + 0.03, -1.44], [-0.5, DESK.y + 0.02, -1.34], [-0.3, DESK.y - 0.02, -1.3]], 0.005);
    note(pad2, { title: '有线手柄', era: '2005', body: '线太长，总被椅子轮子压住。2025 年它还挂在旧物角的纸箱边。', tag: '后来收进了旧物角' });
    drink(g, M, 0.55, -1.83, M.blue, ['玻璃瓶汽水', '2005', '桌上永远有一瓶，瓶盖拿来当筹码。']);
    add(g, cyl(0.045, 0.045, 0.11, M.creamShade, 12), -1.02, DESK.y + 0.055, -1.9);
  } else if (era === 1) {
    for (let i = 0; i < 3; i++) caseBox(g, M, -0.86 + i * 0.055, DESK.y + 0.098, -1.85, ['MW2', 'NFS', 'FIFA'][i], '#3a2c4a');
    const gp = group('gamepad');
    add(gp, box(0.17, 0.05, 0.1, M.black), 0, 0.025, 0);
    add(gp, sphere(0.03, M.metalDark), -0.05, 0.05, 0);
    add(gp, sphere(0.018, M.ledCool), 0.05, 0.05, 0);
    gp.position.set(-0.66, DESK.y, -1.48);
    g.add(gp);
    note(gp, { title: '主机手柄', era: '2009', body: '客厅那台主机搬进卧室之后，周五晚上就不用抢电视了。', tag: '外设' });
    drink(g, M, 0.58, -1.82, M.red, ['罐装能量饮料', '2009', '第一次通宵，靠它撑到天亮。']);
    add(g, box(0.075, 0.012, 0.14, M.plastic), -1.0, DESK.y + 0.008, -1.6);
    add(g, plane(0.07, 0.13, M.ledCool), -1.0, DESK.y + 0.015, -1.6, -Math.PI / 2);
  } else if (era === 2) {
    for (let i = 0; i < 4; i++) caseBox(g, M, -1.0 + i * 0.055, DESK.y + 0.098, -1.86, ['S3', 'DOTA', 'LOL', 'SC2'][i], '#2a2150');
    figure(g, M, -0.95, -1.5, 0.8);
    const hp = group('headphones');
    add(hp, cyl(0.012, 0.012, 0.3, M.metalDark, 8), 0, 0.15, 0);
    add(hp, box(0.09, 0.09, 0.04, M.red), -0.05, 0.3, 0);
    add(hp, box(0.09, 0.09, 0.04, M.red), 0.05, 0.3, 0);
    hp.position.set(0.68, DESK.y, -1.9);
    g.add(hp);
    note(hp, { title: '第一副游戏耳机', era: '2013', body: '戴上它就没听见妈妈敲门。后来换成挂架上的那副，这副收进了抽屉。', tag: '外设' });
    drink(g, M, 0.62, -1.55, M.orange);
  } else if (era === 3) {
    figure(g, M, -1.02, -1.55, 1.2);
    plant(g, M, 0.82, -1.88);
    const trophy = group('trophy');
    add(trophy, cyl(0.055, 0.07, 0.03, M.metalDark, 12), 0, 0.015, 0);
    add(trophy, cyl(0.02, 0.02, 0.08, M.amber, 10), 0, 0.07, 0);
    add(trophy, cyl(0.06, 0.035, 0.09, M.amber, 12), 0, 0.16, 0);
    trophy.position.set(-0.88, DESK.y, -1.52);
    g.add(trophy);
    note(trophy, { title: '小奖杯', era: '2017', body: '城市赛的第七名。奖杯不大，但它是这间房第一次为「游戏」专门腾出位置。', tag: '收藏' });
    drink(g, M, 0.86, -1.52, M.blue);
  } else if (era === 4) {
    // microphone on a boom arm and a ring light for streaming
    const mic = group('microphone');
    add(mic, cyl(0.04, 0.04, 0.16, M.plastic, 14), 0, 0.12, 0, Math.PI / 2);
    add(mic, box(0.09, 0.02, 0.02, M.metal), 0, 0.2, 0);
    add(mic, box(0.02, 0.28, 0.02, M.metalDark), -0.16, 0.34, 0);
    add(mic, box(0.26, 0.02, 0.02, M.metalDark), -0.08, 0.48, 0);
    mic.position.set(-1.02, DESK.y, -1.72);
    g.add(mic);
    note(mic, { title: '麦克风和悬臂', era: '2021', body: '开始直播那年装的。第一次开麦时紧张得把水杯碰倒，杯子还是那只旧杯子。', tag: '桌面' });
    const ring = group('ring-light');
    add(ring, cyl(0.12, 0.14, 0.03, M.metalDark, 14), 0, 0.015, 0);
    add(ring, cyl(0.015, 0.015, 1.2, M.metalDark, 8), 0, 0.62, 0);
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.014, 8, 24), M.bulb);
    add(ring, ringMesh, 0, 1.3, 0);
    ring.position.set(1.22, 0, -1.7);
    g.add(ring);
    figure(g, M, -0.95, -1.55, 1.1);
    plant(g, M, 0.95, -1.52);
    drink(g, M, 0.7, -1.5, M.greenDark);
  } else {
    const mic = group('microphone');
    add(mic, cyl(0.045, 0.045, 0.18, M.metalDark, 14), 0, 0.12, 0, Math.PI / 2);
    add(mic, box(0.02, 0.3, 0.02, M.metal), -0.16, 0.34, 0);
    mic.position.set(-1.1, DESK.y, -1.74);
    g.add(mic);
    const dock = group('charging-dock');
    add(dock, box(0.14, 0.02, 0.1, M.metalDark), 0, 0.01, 0);
    add(dock, box(0.07, 0.008, 0.13, M.plastic), 0, 0.025, 0, -0.25);
    dock.position.set(0.9, DESK.y, -1.5);
    g.add(dock);
    note(dock, { title: '充电底座', era: '2025', body: '手机、手柄、耳机都有了自己的位置。桌上的线比 2005 年少了一大半。', tag: '桌面' });
    figure(g, M, -1.0, -1.58, 1.15);
    plant(g, M, 1.0, -1.86);
    add(g, box(0.14, 0.022, 0.19, M.spine('CS', '#2b3a52')), -0.78, DESK.y + 0.012, -1.84, 0, 0.1);
  }
}

export function buildDesks(M, screenMeshes) {
  const groups = [];
  for (let era = 0; era < 6; era++) {
    const g = group(`desk-${era}`);
    table(g, M, era);
    tower(g, M, era);
    clutter(g, M, era, screenMeshes);
    note(g, {
      title: ['贴着贴纸的小书桌', '换了一张深木桌', '金属电脑桌', '大桌面', '升降桌', '还是那张升降桌'][era],
      era: ['2005', '2009', '2013', '2017', '2021', '2025'][era],
      body: [
        '原来写作业用的桌子，抽屉里还留着课本。桌角被椅子磕掉一块漆。',
        '为了放宽屏换的，宽了十厘米。抽屉里换成光盘和手柄。',
        '黑色玻璃面，指纹永远擦不干净。桌下第一次走得进两根腿。',
        '床搬走之后，桌子终于能横过来放。桌垫盖住了原来那块磕痕。',
        '电动升降，坐累了就站起来。木头桌面是后换的，说想看得到纹路。',
        '桌没再换，只换了桌面。二十年前那条划痕，被桌垫压在下面。',
      ][era],
      tag: '桌子',
    });
    groups.push(g);
  }
  return groups;
}

// Items that outlive their era: the little speakers and the clamp lamp.
export function buildCarryOver(M) {
  const speakers = group('old-speakers');
  speakers.position.set(-0.25, DESK.y, -1.88);
  for (const x of [-0.63, 0.63]) {
    const s = group('speaker');
    add(s, box(0.12, 0.2, 0.11, M.cream), 0, 0.1, 0);
    add(s, cyl(0.035, 0.035, 0.006, M.creamShade, 12), 0, 0.14, 0.058, Math.PI / 2);
    add(s, cyl(0.018, 0.018, 0.006, M.grey, 10), 0, 0.055, 0.058, Math.PI / 2);
    s.position.set(x, 0, 0);
    speakers.add(s);
  }
  note(speakers, {
    title: '一对塑料小音箱', era: '2005 — 2025',
    body: '2005 年跟着 CRT 一起买的。2013 年换成耳机后没扔，挪到窗台上接着放歌，音量旋钮早就不太灵了。',
    tag: '一直在用',
  });

  const lamp = group('clamp-lamp');
  add(lamp, box(0.09, 0.05, 0.09, M.metalDark), 0, 0.02, 0);
  add(lamp, cyl(0.012, 0.012, 0.3, M.metal, 8), 0.03, 0.18, 0, 0, 0, -0.25);
  add(lamp, cyl(0.012, 0.012, 0.22, M.metal, 8), 0.11, 0.34, -0.02, 0, 0, 0.75);
  const shade = cyl(0.06, 0.11, 0.1, M.creamShade, 14);
  add(lamp, shade, 0.2, 0.36, -0.08, Math.PI / 2, 0, 0.3);
  add(lamp, sphere(0.035, M.bulb), 0.22, 0.33, -0.02);
  lamp.position.set(-1.12, DESK.y, -1.86);
  note(lamp, {
    title: '夹式台灯', era: '2005 — 2016',
    body: '写作业时的灯，后来照键盘。2017 年换成屏幕挂灯，它被擦干净放进纸箱，灯泡还亮。',
    tag: '后来收进了旧物角',
  });
  return { speakers, lamp };
}
