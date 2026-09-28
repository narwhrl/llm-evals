import * as THREE from 'three';
import { C } from './palette.js';

/** 大草地平面（体素层 y=0 的底面贴在其上）。 */
export function addGrass(scene) {
  const geo = new THREE.PlaneGeometry(1600, 1600);
  const mat = new THREE.MeshLambertMaterial({ color: 0x6f9e58 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.5;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

/**
 * 铺装：一层的石板甬道与庭院，串起山门 → 庭院 → 主殿的动线，
 * 并有支路通向东西配殿、钟鼓楼、回廊与后部宝塔。
 */
export function buildPaving(w) {
  const P = C.stoneGrey;
  w.box(-15, 0, 6, 15, 0, 44, P);            // 前庭大院
  w.box(-4, 0, 45, 3, 0, 56, P);             // 大院 → 山门
  w.box(-4, 0, 75, 3, 0, 84, P);             // 山门外甬道
  w.box(-4, 0, -4, 3, 0, 5, P);              // 大院 → 大阶
  for (const s of [-1, 1]) {
    const bx = (a, b) => [Math.min(s * a, s * b), Math.max(s * a, s * b)];
    let [x0, x1] = bx(16, 58);
    w.box(x0, 0, 28, x1, 0, 31, P);          // 横路：大院 → 钟鼓楼 → 回廊
    [x0, x1] = bx(5, 32);
    w.box(x0, 0, -16, x1, 0, -13, P);        // 横路：大阶两侧 → 配殿
    [x0, x1] = bx(29, 32);
    w.box(x0, 0, -23, x1, 0, -13, P);        // 配殿前小广场引道
    [x0, x1] = bx(55, 58);
    w.box(x0, 0, -58, x1, 0, 56, P);         // 东西回廊甬道
  }
  w.box(-54, 0, -58, 53, 0, -55, P);         // 后部横路
  w.box(-4, 0, -54, 3, 0, -50, P);           // 后横路 → 宝塔
}
