import * as THREE from 'three';
import { DESK } from './desk.js';
import { add, box, cyl, group, note, plane, sphere } from './kit.js';

const CHAIR = { x: DESK.x, z: -0.62 };

function starBase(g, M, armMat, wheelMat) {
  add(g, cyl(0.05, 0.05, 0.06, M.metalDark, 12), 0, 0.06, 0);
  for (let i = 0; i < 5; i++) {
    const leg = group('chair-leg');
    add(leg, box(0.3, 0.025, 0.05, armMat), 0.14, 0.05, 0);
    add(leg, sphere(0.035, wheelMat), 0.29, 0.035, 0);
    leg.rotation.y = (i / 5) * Math.PI * 2;
    g.add(leg);
  }
  add(g, cyl(0.035, 0.035, 0.42, M.metal, 10), 0, 0.29, 0);
}

function woodenChair(g, M) {
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      add(g, box(0.045, 0.45, 0.045, M.woodLight), sx * 0.22, 0.225, sz * 0.2);
    }
  }
  add(g, box(0.5, 0.05, 0.46, M.woodLight), 0, 0.47, 0);
  for (const sx of [-1, 1]) add(g, box(0.045, 0.5, 0.045, M.woodLight), sx * 0.22, 0.72, 0.2);
  for (const y of [0.66, 0.86]) add(g, box(0.48, 0.07, 0.035, M.woodLight), 0, y, 0.2);
  add(g, box(0.3, 0.02, 0.28, M.clothRed), 0, 0.5, 0);
}

function officeChair(g, M, era) {
  const shell = era === 1 ? M.clothGrey : era === 2 ? M.blueDark : era === 3 ? M.redDark : era === 4 ? M.clothGrey : M.clothCream;
  const accent = era === 3 ? M.red : era === 5 ? M.woodLight : M.plastic;
  starBase(g, M, M.metalDark, M.rubber);
  add(g, box(0.5, 0.09, 0.48, shell), 0, 0.53, 0);
  const backH = era === 1 ? 0.52 : 0.82;
  add(g, box(0.48, backH, 0.07, shell), 0, 0.55 + backH / 2, 0.22);
  if (era >= 2) {
    add(g, box(0.36, 0.1, 0.05, accent), 0, 0.55 + backH - 0.06, 0.19);
    for (const sx of [-1, 1]) add(g, box(0.06, backH * 0.72, 0.07, accent), sx * 0.23, 0.55 + backH * 0.4, 0.2);
  }
  if (era >= 3) add(g, box(0.28, 0.12, 0.08, shell), 0, 0.55 + backH + 0.08, 0.2);
  for (const sx of [-1, 1]) {
    add(g, box(0.05, 0.05, 0.3, M.plastic), sx * 0.29, 0.68, -0.02);
    add(g, box(0.05, 0.16, 0.05, M.metalDark), sx * 0.29, 0.61, 0.05);
  }
  if (era === 4) add(g, box(0.3, 0.09, 0.04, M.metal), 0, 0.75, 0.19);
}

export function buildChairs(M) {
  const titles = ['写作业的木椅', '网布办公椅', '高背布椅', '第一把电竞椅', '人体工学椅', '还是那把工学椅'];
  const bodies = [
    '从书桌那头搬来的，坐垫上垫了件旧衣服。轮子是后装的，转起来会响。',
    '第一次为「久坐」花钱。能调高度，但不能调腰，坐一晚上还是得站起来。',
    '靠背终于高过肩膀。那时候开始打联赛，一坐就是五六个小时。',
    '黑红配色，买的时候觉得有点夸张。头枕上后来贴了一张 2005 年的贴纸。',
    '换掉电竞椅那年说的原话是「腰比胜负重要」。网面、腰托、扶手都能调。',
    '没再换。坐垫磨出一点光泽，扶手高度停在二十年来最顺手的那一档。',
  ];
  return titles.map((title, era) => {
    const g = group(`chair-${era}`);
    if (era === 0) woodenChair(g, M);
    else officeChair(g, M, era);
    g.position.set(CHAIR.x, 0, CHAIR.z);
    g.rotation.y = (era % 2 ? 0.06 : -0.05);
    note(g, { title, era: ['2005', '2009', '2013', '2017', '2021', '2025'][era], body: bodies[era], tag: '椅子' });
    return g;
  });
}

function bed(g, M) {
  const frame = M.metalDark;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) add(g, box(0.045, 0.32, 0.045, frame), sx * 0.48, 0.16, sz * 0.92);
  }
  for (const sx of [-1, 1]) add(g, box(0.045, 0.04, 1.9, frame), sx * 0.48, 0.32, 0);
  for (const sz of [-1, 1]) add(g, box(1.0, 0.04, 0.045, frame), 0, 0.32, sz * 0.92);
  add(g, box(1.02, 0.55, 0.05, frame), 0, 0.45, -0.95);
  add(g, box(0.96, 0.16, 1.86, M.clothBlue), 0, 0.4, 0);
  add(g, box(0.62, 0.1, 0.34, M.clothCream), 0, 0.53, -0.68);
  add(g, box(0.98, 0.07, 1.02, M.clothRed), 0, 0.51, 0.38);
  add(g, box(0.3, 0.02, 0.22, M.paper), 0.28, 0.56, 0.05, 0, 0.2);
  const book = group('comic');
  note(book, { title: '床上的漫画', era: '2005', body: '等下载的时候翻的。同一本翻了二十遍，书脊用胶带粘过。', tag: '生活' });
  g.add(book);
  note(g, {
    title: '单人床', era: '2005 — 2010',
    body: '房间本来是卧室。桌子挤在床和窗之间，转个身就碰到床架。同学来打游戏只能坐床上。',
    tag: '生活的痕迹',
  });
}

function sofa(g, M) {
  add(g, box(1.25, 0.3, 0.62, M.clothGrey), 0, 0.26, 0);
  add(g, box(1.25, 0.52, 0.16, M.clothGrey), 0, 0.56, -0.25);
  for (const sx of [-1, 1]) add(g, box(0.14, 0.42, 0.62, M.clothGrey), sx * 0.61, 0.42, 0);
  for (const sx of [-1, 1]) add(g, box(0.52, 0.1, 0.5, M.clothCream), sx * 0.29, 0.44, 0.02);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(g, box(0.05, 0.12, 0.05, M.woodDark), sx * 0.52, 0.06, sz * 0.24);
  // low table with a console pad and a game case
  const table = group('coffee-table');
  add(table, box(0.6, 0.04, 0.42, M.woodMid), 0, 0.36, 0);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) add(table, box(0.04, 0.34, 0.04, M.woodDark), sx * 0.25, 0.18, sz * 0.16);
  add(table, box(0.2, 0.03, 0.14, M.plastic), -0.12, 0.395, 0);
  add(table, box(0.14, 0.19, 0.028, M.spine('WII', '#4a3a52')), 0.16, 0.475, 0);
  table.position.set(-0.05, 0, 1.02);
  g.add(table);
  note(g, {
    title: '一张小沙发', era: '2011 — 2016',
    body: '床搬走之后换的。周末有人来，挤着看比赛；没人来的时候，堆的是外套和没拆的游戏。',
    tag: '生活的痕迹',
  });
}

function displayCabinet(g, M) {
  const frame = M.woodMid;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) add(g, box(0.05, 1.68, 0.05, frame), sx * 0.21, 0.84, sz * 0.56);
  }
  for (const y of [0.04, 0.42, 0.86, 1.3, 1.66]) add(g, box(0.46, 0.03, 1.2, frame), 0, y, 0);
  add(g, box(0.012, 1.58, 1.12, M.glass), -0.238, 0.84, 0);
  for (let i = 0; i < 3; i++) {
    const f = group('shelf-figure');
    add(f, cyl(0.06, 0.06, 0.02, M.black, 12), 0, 0.01, 0);
    add(f, sphere(0.045, [M.cream, M.red, M.blue][i]), 0, 0.09, 0);
    add(f, box(0.06, 0.1, 0.05, [M.blue, M.cream, M.amber][i]), 0, 0.04, 0);
    f.position.set(-0.02, 0.44 + (i === 2 ? 0.44 : 0), -0.38 + i * 0.36);
    g.add(f);
  }
  const trophy = group('cabinet-trophy');
  add(trophy, cyl(0.05, 0.06, 0.03, M.metalDark, 12), 0, 0.015, 0);
  add(trophy, cyl(0.045, 0.025, 0.12, M.amber, 12), 0, 0.09, 0);
  trophy.position.set(-0.02, 0.88, 0.3);
  g.add(trophy);
  add(g, box(0.26, 0.1, 0.2, M.plastic), -0.02, 0.92, -0.32);
  add(g, box(0.14, 0.19, 0.028, M.spine('CS', '#2b3a52')), -0.02, 1.41, 0.3);
  note(g, {
    title: '玻璃展示柜', era: '2017 — 2025',
    body: '手办、奖杯、第一台游戏主机，还有一张 2005 年的光盘。柜门一直没锁，只是不再天天打开。',
    tag: '收藏',
  });
}

export function buildRestArea(M) {
  const bedG = group('bed');
  bed(bedG, M);
  bedG.position.set(1.85, 0, 0.55);

  const sofaG = group('sofa');
  sofa(sofaG, M);
  sofaG.position.set(1.75, 0, 0.35);

  const cabinetG = group('display-cabinet');
  displayCabinet(cabinetG, M);
  cabinetG.position.set(2.62, 0, -0.55);
  const rug = plane(1.9, 1.6, M.carpet);
  add(cabinetG, rug, -0.9, 0.006, 1.15, -Math.PI / 2);
  const bean = sphere(0.34, M.clothRed);
  bean.scale.set(1, 0.58, 1);
  add(cabinetG, bean, -0.95, 0.2, 1.2);
  note(bean, { title: '豆袋沙发', era: '2017 — 2025', body: '柜子搬进来那年买的，本来是给朋友坐的，最后多半用来放外套。', tag: '生活的痕迹' });
  return [bedG, sofaG, cabinetG];
}

function shelfPlanks(g, M, ys, mat) {
  for (const y of ys) add(g, box(0.38, 0.04, 1.12, mat), 0, y, 0);
  for (const z of [-0.56, 0.56]) add(g, box(0.38, ys[ys.length - 1] + 0.06, 0.04, mat), 0, (ys[ys.length - 1] + 0.06) / 2, z);
}

function gameCases(g, M, ys, names, color, count) {
  for (let i = 0; i < count; i++) {
    const y = ys[i % ys.length];
    const z = -0.44 + (i % Math.ceil(count / ys.length)) * 0.15;
    const c = box(0.03, 0.18, 0.13, [M.spine(names[i % names.length], color), M.spine(names[i % names.length], color), M.plastic, M.plastic, M.plastic, M.plastic]);
    add(g, c, 0.12, y + 0.11, z, 0, 0.03 * (i % 3));
  }
}

export function buildShelves(M) {
  const names = ['CS', 'WC3', 'NFS', 'WOW', 'LOL', 'DOTA', 'SC2', 'MINECRAFT', 'GTA', 'HALO'];
  const groups = [];

  const s0 = group('shelf-2005');
  add(s0, box(0.5, 0.44, 0.7, M.cardboard), 0, 0.22, -0.2);
  add(s0, box(0.44, 0.34, 0.6, M.cardboard), 0, 0.61, -0.2);
  add(s0, box(0.34, 0.5, 0.46, M.cream), 0, 0.25, 0.38);
  for (let i = 0; i < 5; i++) add(s0, box(0.022, 0.16, 0.13, M.spine(names[i], '#2b3a52')), 0.13, 0.33, 0.2 + i * 0.075);
  s0.position.set(-2.62, 0, -0.8);
  note(s0, { title: '纸箱和 CD 架', era: '2005 — 2008', body: '游戏按借来的顺序插着，盒脊上写名字。纸箱是搬家剩下的，一直没扔。', tag: '收藏' });
  groups.push(s0);

  const s1 = group('shelf-2009');
  shelfPlanks(s1, M, [0.42, 0.86, 1.3], M.woodMid);
  gameCases(s1, M, [0.42, 0.86], names, '#3a2c4a', 12);
  add(s1, box(0.3, 0.24, 0.3, M.cardboard), -0.02, 1.42, 0.3);
  s1.position.set(-2.62, 0, -0.8);
  note(s1, { title: '双层木书架', era: '2009 — 2012', body: '第一件专门为游戏买的家具。最下面一层留给课本，后来也塞满了盒子。', tag: '收藏' });
  groups.push(s1);

  const s2 = group('shelf-2013');
  shelfPlanks(s2, M, [0.36, 0.78, 1.2], M.metalDark);
  gameCases(s2, M, [0.36, 0.78], names.slice(2), '#2a2150', 12);
  for (let i = 0; i < 2; i++) {
    const f = group('figure-on-shelf');
    add(f, cyl(0.055, 0.055, 0.02, M.black, 12), 0, 0.01, 0);
    add(f, sphere(0.04, i ? M.red : M.cream), 0, 0.08, 0);
    f.position.set(-0.02, 1.22, -0.3 + i * 0.6);
    s2.add(f);
  }
  s2.position.set(-2.62, 0, -0.8);
  note(s2, { title: '三层金属架', era: '2013 — 2016', body: '盒子从一层变成两层，最上面开始放手办。书早就不在这儿了。', tag: '收藏' });
  groups.push(s2);

  const s3 = group('pegboard');
  add(s3, box(0.04, 1.2, 1.3, M.dark), 0, 0, 0);
  for (let iy = 0; iy < 8; iy++) {
    for (let iz = 0; iz < 10; iz++) {
      add(s3, box(0.006, 0.02, 0.02, M.metalDark), 0.022, -0.5 + iy * 0.14, -0.58 + iz * 0.13);
    }
  }
  add(s3, box(0.26, 0.035, 0.9, M.woodDark), 0.15, -0.3, 0);
  for (let i = 0; i < 2; i++) {
    const p = group('hanging-pad');
    add(p, box(0.16, 0.05, 0.1, M.plastic), 0, 0, 0);
    add(p, sphere(0.03, M.metalDark), -0.05, 0.03, 0);
    p.position.set(0.12, 0.08, -0.32 + i * 0.42);
    s3.add(p);
  }
  s3.position.set(-2.99, 1.75, -0.8);
  note(s3, { title: '洞洞板', era: '2017 — 2020', body: '手柄、耳机、线都挂上墙，桌面第一次空出来。钉孔打多了两个，一直没补。', tag: '收藏' });
  groups.push(s3);

  const s4 = group('shelf-2021');
  const frame = M.woodMid;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) add(s4, box(0.045, 1.6, 0.045, frame), sx * 0.19, 0.8, sz * 0.52);
  }
  for (const y of [0.04, 0.45, 0.9, 1.34, 1.58]) add(s4, box(0.42, 0.03, 1.1, frame), 0, y, 0);
  add(s4, box(0.012, 1.5, 1.04, M.glass), 0.218, 0.8, 0);
  for (let i = 0; i < 4; i++) {
    const f = group('figure-in-case');
    add(f, cyl(0.05, 0.05, 0.02, M.black, 12), 0, 0.01, 0);
    add(f, sphere(0.038, [M.cream, M.red, M.blue, M.amber][i]), 0, 0.075, 0);
    f.position.set(0, 0.47 + Math.floor(i / 2) * 0.45, -0.3 + (i % 2) * 0.6);
    s4.add(f);
  }
  add(s4, box(0.14, 0.19, 0.028, M.spine('CS', '#2b3a52')), 0, 1.45, 0.34);
  s4.position.set(-2.75, 0, -0.8);
  note(s4, { title: '带玻璃门的柜子', era: '2021 — 2025', body: '终于舍得给收藏装一扇门。那张 2005 年的光盘摆在最高一层，谁也没再借走过。', tag: '收藏' });
  groups.push(s4);

  return groups;
}
