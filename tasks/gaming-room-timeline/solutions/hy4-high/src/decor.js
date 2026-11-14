import * as THREE from 'three';
import { DESK } from './desk.js';
import { add, box, cyl, group, note, plane, sphere, std } from './kit.js';

const MUG_MEMORIES = [
  '奶奶买的，杯底印着一朵花。当时嫌它土，用来装汽水。',
  '杯口磕了一个小缺口，还是天天用，位置也没挪过。',
  '外设换了两轮，杯子一直待在桌面右边这一小块。',
  '第一次直播前特意擦了擦杯身上的茶渍。',
  '碰倒过一次，没碎。现在只装白开水。',
  '花早磨没了。二十年里，它一直在同一个位置。',
];
const DINO_MEMORIES = [
  '小学毕业那年从抓娃娃机抓来的，放在窗台看屏幕。',
  '换桌子时差点丢，找回来之后说「它得看着我」。',
  '朝西那半边晒淡了，脸上还有一道圆珠笔印。',
  '床搬走那天，先把它从床头挪回窗台。',
  '直播镜头里总有人问那只恐龙叫什么。',
  '还是坐在窗台中间，朝西，看得到下午的光。',
];
const PHOTO_MEMORIES = [
  '拍立得，暑假最后一夜，两个人挤在 CRT 前。',
  '胶带换过一次，边角卷了起来。',
  '贴在赛程表旁边，没被盖住。',
  '装了个相框，玻璃有点反光。',
  '直播背景里露出一角，老观众都认得。',
  '照片里的人搬走了，照片还挂在原来那颗钉子上。',
];

export function buildKeepsakes(M) {
  const mug = group('keepsake-mug');
  add(mug, cyl(0.046, 0.04, 0.11, M.ceramic, 18), 0, 0.055, 0);
  add(mug, cyl(0.04, 0.04, 0.006, M.ceramicShade, 18), 0, 0.112, 0);
  add(mug, cyl(0.037, 0.037, 0.004, std('#6d4a30', { roughness: 0.4 }), 18), 0, 0.108, 0);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.031, 0.009, 8, 16, Math.PI * 1.6), M.ceramic);
  handle.rotation.z = -Math.PI / 2;
  add(mug, handle, 0.055, 0.06, 0);
  add(mug, cyl(0.047, 0.047, 0.007, M.redDark, 18), 0, 0.042, 0);
  add(mug, cyl(0.047, 0.047, 0.004, M.redDark, 18), 0, 0.078, 0);
  mug.position.set(0.55, DESK.y, -1.5);
  note(mug, {
    title: '褪色的马克杯', era: '2005 — 2025', memories: MUG_MEMORIES,
    body: MUG_MEMORIES[0], tag: '贯穿二十年的旧物',
  });

  const dino = group('keepsake-dino');
  const body = sphere(0.11, M.green);
  body.scale.set(1, 0.9, 1.15);
  add(dino, body, 0, 0.115, 0);
  add(dino, sphere(0.075, M.green), 0, 0.205, 0.065);
  add(dino, box(0.075, 0.05, 0.07, M.green), 0, 0.19, 0.12);
  for (const sx of [-1, 1]) add(dino, sphere(0.012, M.black), sx * 0.032, 0.225, 0.125);
  add(dino, cyl(0.002, 0.045, 0.17, M.green, 10), 0, 0.1, -0.16, 1.1, 0, 0);
  for (const sx of [-1, 1]) add(dino, sphere(0.036, M.greenDark), sx * 0.058, 0.038, 0.02);
  for (let i = 0; i < 3; i++) add(dino, cyl(0.002, 0.016, 0.045, M.greenDark, 8), 0, 0.215 - i * 0.012, -0.03 - i * 0.055, 0.4);
  add(dino, box(0.03, 0.004, 0.004, M.blueDark), 0.02, 0.205, 0.132, 0, 0, 0.5);
  dino.position.set(-2.08, 1.31, -2.06);
  note(dino, {
    title: '绿色小恐龙', era: '2005 — 2025', memories: DINO_MEMORIES,
    body: DINO_MEMORIES[0], tag: '贯穿二十年的旧物',
  });

  const photo = group('keepsake-photo');
  const print = plane(0.24, 0.28, M.photo);
  add(photo, print, 0, 0, 0);
  for (const [x, y] of [[-0.1, 0.12], [0.1, 0.12], [-0.1, -0.12], [0.1, -0.12]]) {
    add(photo, box(0.05, 0.022, 0.004, std('#e7d9b4', { transparent: true, opacity: 0.8 })), x, y, 0.006, 0, 0, x > 0 ? 0.4 : -0.4);
  }
  add(photo, sphere(0.008, M.metalDark), 0, 0.15, 0.008);
  photo.position.set(-1.0, 1.6, -2.215);
  note(photo, {
    title: '拍立得合影', era: '2005 — 2025', memories: PHOTO_MEMORIES,
    body: PHOTO_MEMORIES[0], tag: '贯穿二十年的旧物',
  });

  const frame = group('photo-frame');
  const fm = M.woodMid;
  for (const [x, y, w, h] of [[0, 0.16, 0.32, 0.025], [0, -0.16, 0.32, 0.025], [-0.15, 0, 0.025, 0.34], [0.15, 0, 0.025, 0.34]]) {
    add(frame, box(w, h, 0.02, fm), x, y, 0.004);
  }
  frame.position.set(-1.0, 1.6, -2.208);
  note(frame, { title: '给照片装了个框', era: '2017 — 2025', body: '搬家时玻璃裂过一次，换了一块。钉子还是 2005 年那颗。', tag: '贯穿二十年的旧物' });

  return { mug, dino, photo, frame };
}

function framedPoster(g, M, x, y, z, w, h, material, ry = 0) {
  const p = plane(w, h, material);
  add(g, p, x, y, z, 0, ry);
  const frameMat = M.woodDark;
  const t = 0.018;
  if (ry === 0) {
    for (const [dx, dy, fw, fh] of [[0, h / 2, w + t, t], [0, -h / 2, w + t, t], [-w / 2, 0, t, h], [w / 2, 0, t, h]]) {
      add(g, box(fw, fh, 0.012, frameMat), x + dx, y + dy, z + 0.008);
    }
  } else {
    for (const [dz, dy, fw, fh] of [[0, h / 2, w + t, t], [0, -h / 2, w + t, t], [-w / 2, 0, t, h], [w / 2, 0, t, h]]) {
      add(g, box(0.012, fh, fw, frameMat), x + 0.008, y + dy, z + dz);
    }
  }
  return p;
}

export function buildWallDecor(M) {
  const groups = [];
  for (let era = 0; era < 6; era++) {
    const g = group(`wall-decor-${era}`);
    framedPoster(g, M, 0.3, 2.16, -2.215, 0.6, 0.8, M.posters[era]);
    framedPoster(g, M, -3.005, 2.02, -0.75, 0.64, 0.84, M.postersAlt[era], Math.PI / 2);

    if (era === 0) {
      const calendar = plane(0.34, 0.44, M.note);
      add(g, calendar, 1.55, 2.24, -2.215);
      add(g, box(0.36, 0.02, 0.012, M.red), 1.55, 2.47, -2.21);
      for (let i = 0; i < 5; i++) {
        add(g, box(0.05, 0.05, 0.004, [M.orange, M.blue, M.red, M.green, M.amber][i]), -1.9 + i * 0.12, 2.85, -2.215, 0, 0, i * 0.2);
      }
      note(calendar, { title: '2005 年挂历', era: '2005', body: '圈出来的日子是网吧包夜和期末考。翻到八月就没再撕过。', tag: '墙上' });
    } else if (era === 1) {
      add(g, plane(0.34, 0.24, M.paper), 1.5, 2.2, -2.215);
      add(g, box(0.1, 0.03, 0.006, M.red), 1.5, 2.14, -2.208);
      add(g, cyl(0.045, 0.045, 0.006, M.amber, 14), 1.66, 2.12, -2.205, Math.PI / 2);
      note(g, { title: '一张奖状', era: '2009', body: '校内赛第二名，纸都泛黄了。用图钉钉着，钉孔至今还在。', tag: '墙上' });
    } else if (era === 2) {
      add(g, plane(0.36, 0.48, M.noteLate), -3.005, 1.28, 0.5, 0, Math.PI / 2);
      for (let i = 0; i < 6; i++) {
        const flag = box(0.001, 0.09, 0.07, i % 2 ? M.red : M.blue);
        add(g, flag, -2.99, 2.86 - Math.abs(i - 2.5) * 0.05, -1.9 + i * 0.42, 0, Math.PI / 2);
      }
      note(g, { title: '赛程表和小旗', era: '2013', body: '打印出来的赛程表，输的那场被笔划掉了。小旗是线下观赛带回来的。', tag: '墙上' });
    } else if (era === 3) {
      for (let i = 0; i < 3; i++) {
        const panel = box(0.42, 0.5, 0.035, M.dark);
        add(g, panel, 1.15 + i * 0.08, 2.15 + (i % 2) * 0.12, -2.19, 0, 0, i % 2 ? 0.09 : -0.09);
        for (let k = 0; k < 4; k++) add(g, box(0.36, 0.012, 0.006, M.metalDark), 1.15 + i * 0.08, 2.02 + (i % 2) * 0.12 + k * 0.1, -2.166);
      }
      note(g, { title: '吸音板', era: '2017', body: '开始开麦之后贴的，只贴了三块。邻居说其实还是听得见。', tag: '墙上' });
    } else if (era === 4) {
      for (let i = 0; i < 4; i++) {
        const panel = box(0.44, 0.54, 0.035, M.dark);
        add(g, panel, 0.95 + (i % 2) * 0.5, 1.95 + Math.floor(i / 2) * 0.62, -2.19, 0, 0, i % 2 ? 0.07 : -0.07);
        for (let k = 0; k < 4; k++) add(g, box(0.38, 0.012, 0.006, M.metalDark), 0.95 + (i % 2) * 0.5, 1.82 + Math.floor(i / 2) * 0.62 + k * 0.11, -2.166);
      }
      add(g, cyl(0.09, 0.09, 0.012, M.amber, 16), 1.9, 2.5, -2.2, Math.PI / 2);
      note(g, { title: '奖牌', era: '2021', body: '线上赛的，挂在墙上才发现和 2009 那张奖状隔着十二年。', tag: '墙上' });
    } else {
      add(g, cyl(0.09, 0.09, 0.012, M.amber, 16), 1.9, 2.5, -2.2, Math.PI / 2);
      add(g, cylinderRibbon(M), 1.9, 2.44, -2.19);
      const old = plane(0.3, 0.4, M.posters[0]);
      old.material = M.posters[0];
      add(g, old, -0.65, 2.62, -2.215, 0, 0, 0.08);
      note(old, { title: '没撕掉的旧海报', era: '2025', body: '2005 年那张 LAN PARTY，边角翘着。新海报换过五轮，只有它一直贴在最上面。', tag: '墙上' });
    }
    groups.push(g);
  }
  return groups;
}

function cylinderRibbon(M) {
  const g = group('medal-ribbon');
  add(g, box(0.03, 0.12, 0.006, M.red), -0.025, -0.04, 0, 0, 0, 0.2);
  add(g, box(0.03, 0.12, 0.006, M.blue), 0.025, -0.04, 0, 0, 0, -0.2);
  return g;
}

export function buildOldCorner(M) {
  const g = group('old-corner');

  // a dust cloth draped over the retired CRT
  const cloth = group('dust-cloth');
  add(cloth, box(0.76, 0.022, 0.5, M.clothCream), 0, 0, 0);
  for (const [x, z, w, d] of [[0, 0.25, 0.76, 0.012], [0, -0.25, 0.76, 0.012], [0.38, 0, 0.012, 0.5], [-0.38, 0, 0.012, 0.5]]) {
    add(cloth, box(w, 0.16, d, M.clothCream), x, -0.09, z);
  }
  cloth.position.set(2.0, 0.57, 1.35);
  cloth.rotation.y = -0.45;
  g.add(cloth);
  note(cloth, { title: '盖着布的 CRT', era: '2013 — 2025', body: '没舍得扔，也没地方摆。盖上布之后就成了墙角的一块方形，像件家具。', tag: '旧物角' });

  // old gamepad, jewel cases, keyboard and the retired console
  const pad = group('retired-pad');
  add(pad, box(0.16, 0.045, 0.09, M.grey), 0, 0.022, 0);
  add(pad, sphere(0.03, M.black), -0.05, 0.045, 0);
  add(pad, sphere(0.02, M.red), 0.05, 0.045, 0);
  pad.position.set(2.42, 0.025, 1.2);
  g.add(pad);
  note(pad, { title: '2005 年的手柄', era: '2013 — 2025', body: '线早就缠成一团。摇杆有点松，但按下去的手感还认得。', tag: '旧物角' });

  for (let i = 0; i < 3; i++) {
    add(g, box(0.15, 0.022, 0.19, M.spine(['CS', 'WC3', 'NFS'][i], '#2b3a52')), 2.62, 0.012 + i * 0.023, 1.24, 0, 0.1 * i);
  }
  const kb = group('retired-keyboard');
  add(kb, box(0.5, 0.026, 0.18, M.creamShade), 0, 0, 0);
  add(kb, plane(0.48, 0.16, M.keycapCream), 0, 0.014, 0, -Math.PI / 2);
  kb.position.set(2.62, 0.53, 1.85);
  g.add(kb);
  note(kb, { title: '第一把键盘', era: '2013 — 2025', body: 'WASD 磨得发亮。后来机械键盘来了，它被擦干净放进纸箱，一直搁在箱盖上。', tag: '旧物角' });

  const consoleOld = group('retired-console');
  add(consoleOld, box(0.34, 0.09, 0.26, M.creamShade), 0, 0.045, 0);
  add(consoleOld, box(0.1, 0.012, 0.02, M.black), 0.08, 0.095, 0.1);
  consoleOld.position.set(2.28, 0, 1.78);
  g.add(consoleOld);
  note(consoleOld, { title: '旧游戏主机', era: '2017 — 2025', body: '客厅换代时留下来的。搬进柜子之前，先在墙角待了好几年。', tag: '旧物角' });

  return g;
}
