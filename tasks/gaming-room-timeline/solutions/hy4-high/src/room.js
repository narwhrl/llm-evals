import * as THREE from 'three';
import { add, box, cyl, group, note, plane, sphere, std } from './kit.js';
import { cardboardTexture, fabricTexture, seeded, wallTexture, woodTexture } from './textures.js';

function windowTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext('2d');
  const rand = seeded(2025);
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0, '#6d7194');
  g.addColorStop(0.45, '#b5877d');
  g.addColorStop(0.72, '#e5ab72');
  g.addColorStop(1, '#6c5b63');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = 'rgba(255,224,170,0.5)';
  ctx.beginPath();
  ctx.arc(186, 104, 24, 0, Math.PI * 2);
  ctx.fill();
  for (let layer = 0; layer < 3; layer++) {
    ctx.fillStyle = ['rgba(52,48,64,0.5)', 'rgba(44,40,55,0.7)', 'rgba(30,27,38,0.9)'][layer];
    let x = 0;
    while (x < 256) {
      const w = 14 + rand() * 30;
      const h = 26 + rand() * (50 + layer * 28);
      ctx.fillRect(x, 256 - h - layer * 6, w, h);
      if (layer > 0 && rand() > 0.45) {
        ctx.fillStyle = 'rgba(255,208,130,0.75)';
        for (let wy = 256 - h + 8; wy < 250; wy += 12) {
          for (let wx = x + 4; wx < x + w - 3; wx += 9) {
            if (rand() > 0.55) ctx.fillRect(wx, wy, 3, 4);
          }
        }
        ctx.fillStyle = ['rgba(52,48,64,0.5)', 'rgba(44,40,55,0.7)', 'rgba(30,27,38,0.9)'][layer];
      }
      x += w + 3;
    }
  }
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function buildRoom(scene) {
  const root = group('room');

  const floorWood = woodTexture('#a98055', '#5b3f28', 3, 3, 2.2);
  const wallPaper = wallTexture();
  const curtain = fabricTexture('#b9765a', 44);
  const outer = std('#191411', { roughness: 1 });
  const trim = std('#6d5138', { roughness: 0.72 });
  const darkWood = std('#4d3a2b', { roughness: 0.68 });

  // base plinth: the room reads as a miniature sitting on a dark surface
  const ground = plane(40, 40, std('#15110e', { roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.2;
  root.add(ground);

  const plinth = box(6.5, 0.2, 4.9, outer);
  add(root, plinth, 0, -0.1, 0);
  const floor = box(6.2, 0.04, 4.6, std('#ffffff', { map: floorWood, roughness: 0.78 }));
  add(root, floor, 0, -0.005, 0);
  floor.castShadow = false;

  const wallMat = std('#ffffff', { map: wallPaper, roughness: 0.95 });
  const backWall = box(6.2, 3.2, 0.14, wallMat);
  add(root, backWall, 0, 1.6, -2.3);
  const leftWall = box(0.14, 3.2, 4.6, wallMat);
  add(root, leftWall, -3.1, 1.6, 0);

  // The right side stays open: a miniature room is viewed from the front-right.
  const skirtMat = std('#8b7458', { roughness: 0.8 });
  add(root, box(6.2, 0.16, 0.045, skirtMat), 0, 0.08, -2.21);
  add(root, box(0.045, 0.16, 4.6, skirtMat), -3.01, 0.08, 0);
  add(root, box(0.045, 0.16, 4.6, skirtMat), 3.01, 0.08, 0);
  add(root, box(6.2, 0.09, 0.06, trim), 0, 3.15, -2.2);
  add(root, box(0.06, 0.09, 4.6, trim), -3.02, 3.15, 0);

  // window on the back wall, left of the desk
  const win = group('window');
  const frameMat = std('#e7dcc6', { roughness: 0.6 });
  const glass = plane(1.42, 1.32, new THREE.MeshBasicMaterial({ map: windowTexture(), toneMapped: false }));
  add(win, glass, -2.08, 2.02, -2.215);
  add(win, box(1.58, 0.09, 0.09, frameMat), -2.08, 2.71, -2.19);
  add(win, box(1.58, 0.1, 0.12, frameMat), -2.08, 1.32, -2.19);
  add(win, box(0.09, 1.42, 0.09, frameMat), -2.83, 2.02, -2.19);
  add(win, box(0.09, 1.42, 0.09, frameMat), -1.33, 2.02, -2.19);
  add(win, box(0.055, 1.32, 0.07, frameMat), -2.08, 2.02, -2.18);
  add(win, box(1.42, 0.05, 0.07, frameMat), -2.08, 2.02, -2.18);
  add(win, box(1.72, 0.07, 0.16, trim), -2.08, 1.27, -2.12);
  const curtainMat = std('#ffffff', { map: curtain, roughness: 1, side: THREE.DoubleSide });
  const leftCurtain = plane(0.38, 1.46, curtainMat);
  add(win, leftCurtain, -2.72, 2.04, -2.1, 0, 0, 0.05);
  const rightCurtain = plane(0.34, 1.46, curtainMat);
  add(win, rightCurtain, -1.45, 2.04, -2.1, 0, 0, -0.04);
  add(win, box(1.72, 0.045, 0.05, std('#8a7a63', { metalness: 0.5, roughness: 0.4 })), -2.08, 2.79, -2.11);
  note(win, {
    title: '朝西的窗',
    era: '2005 — 2025',
    body: '窗帘二十年没换过。下午的光会斜着压到键盘上，早期要拉上帘子才看得清 CRT；后来屏幕亮了，帘子就一直敞着。',
    tag: '房间的格局',
  });
  root.add(win);

  // door on the right side of the back wall
  const door = group('door');
  add(door, box(1.02, 2.24, 0.06, trim), 2.18, 1.12, -2.2);
  add(door, box(0.9, 2.12, 0.055, darkWood), 2.18, 1.06, -2.16);
  for (const y of [0.62, 1.5]) {
    add(door, box(0.72, 0.035, 0.012, std('#3d2d21')), 2.18, y, -2.128);
  }
  add(door, cyl(0.045, 0.045, 0.03, std('#c9a25f', { metalness: 0.75, roughness: 0.3 }), 12), 2.68, 1.02, -2.11, Math.PI / 2);
  add(door, box(0.18, 0.2, 0.012, std('#7c3b32')), 2.18, 1.82, -2.125);
  note(door, {
    title: '那扇门',
    era: '2005 — 2025',
    body: '妈妈敲门前会先喊一声。后来门上贴过战队贴纸、挂过耳机，现在只剩一块褪色的「在比赛中」。',
    tag: '房间的格局',
  });
  root.add(door);

  // sockets and the cable running along the skirting
  const socket = std('#e9e2d2', { roughness: 0.6 });
  add(root, box(0.16, 0.12, 0.02, socket), 1.12, 0.3, -2.215);
  add(root, box(0.16, 0.12, 0.02, socket), -2.55, 0.3, -2.215);
  const cableMat = std('#3a3733', { roughness: 0.9 });
  add(root, box(2.6, 0.018, 0.018, cableMat), 0.1, 0.2, -2.2, 0, 0, 0.01);

  // ceiling lighting fixture (a plain paper shade, kept all twenty years)
  const shade = group('ceiling-lamp');
  add(shade, cyl(0.02, 0.02, 0.5, cableMat, 8), 0.15, 3.02, -0.5);
  add(shade, cyl(0.16, 0.42, 0.24, std('#f2e2c4', { roughness: 0.9, side: THREE.DoubleSide }), 20), 0.15, 2.7, -0.5);
  add(shade, sphere(0.085, new THREE.MeshBasicMaterial({ color: '#ffdfa8' })), 0.15, 2.58, -0.5);
  root.add(shade);

  // a cardboard box left in the corner from the very first move-in
  const boxMat = std('#ffffff', { map: cardboardTexture(), roughness: 0.95 });
  const oldBox = box(0.72, 0.5, 0.56, boxMat);
  note(oldBox, {
    title: '没扔过的纸箱',
    era: '2005 — 2025',
    body: '搬家时装的是光盘和手柄。后来装旧键盘、旧线材、退役的显卡，最后停在墙角，成了放旧物的地方。',
    tag: '旧物角',
  });
  add(root, oldBox, 2.62, 0.25, 1.85, 0, -0.18);
  add(root, box(0.74, 0.018, 0.58, std('#c8b394', { roughness: 0.9 })), 2.62, 0.505, 1.85, 0, -0.18);

  scene.add(root);

  // warm, stable lighting: era change is carried by objects, not by coloured light
  const ambient = new THREE.AmbientLight('#ffdcb0', 0.5);
  const hemi = new THREE.HemisphereLight('#ffe7c4', '#43362b', 0.62);
  const key = new THREE.DirectionalLight('#ffd8a4', 2.1);
  key.position.set(5.2, 7.4, 5.6);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -7;
  key.shadow.camera.right = 7;
  key.shadow.camera.top = 7;
  key.shadow.camera.bottom = -7;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 24;
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.025;
  const ceiling = new THREE.PointLight('#ffc886', 7, 7, 2);
  ceiling.position.set(0.15, 2.55, -0.5);
  const deskLamp = new THREE.PointLight('#ffb96a', 5, 3.4, 2);
  deskLamp.position.set(-1.0, 1.28, -1.55);
  scene.add(ambient, hemi, key, ceiling, deskLamp);

  scene.background = new THREE.Color('#15110d');
  return { root, lights: { key, ceiling, deskLamp } };
}
