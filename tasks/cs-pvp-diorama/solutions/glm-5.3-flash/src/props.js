import * as THREE from "three";
import { C, toon, std, containerTex, barrierTex, woodTex, cardboardTex, corrugatedTex } from "./palette.js";
import { outline, UNIT_BOX } from "./outline.js";

// 共享道具材质
export const MAT = {
  wood: toon(0xffffff, { map: woodTex() }),
  woodDark: toon(0x5e4326),
  cardboard: toon(0xffffff, { map: cardboardTex() }),
  barrelBlue: toon(C.barrelBlue),
  barrelRust: toon(C.barrelRust),
  rust: toon(C.rust),
  metal: toon(0x556068),
  metalDark: toon(0x31383f),
  concrete: toon(0x798087),
  concreteDark: toon(0x565c63),
  tin: toon(0xffffff, { map: corrugatedTex(9, "#667078") }),
  tinRust: toon(0xffffff, { map: corrugatedTex(13, "#6e5a44") }),
  barrier: toon(0xffffff, { map: barrierTex() }),
  plastic: toon(0xb8402f),
  plasticBlue: toon(0x2c5a8c),
  tire: toon(0x1c1e22),
  sack: toon(0x9a8a68),
  glass: std(C.glass, { roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.32 }),
  dark: toon(0x23272d),
  red: toon(C.accentRed),
  police: toon(C.police),
  white: toon(0xc2c8cd),
};

// 木箱
export function crate(kit, x, y, z, s = 1, ry = 0) {
  const m = kit.box(s, s * 0.82, s, MAT.wood, x, y, z, { ry });
  return m;
}

export function crateStack(kit, x, y, z, ry = 0) {
  crate(kit, x, y, z, 1.1, ry);
  crate(kit, x + 0.15, y + 0.9, z - 0.08, 0.92, ry + 0.5);
  crate(kit, x - 0.75, y, z + 0.5, 0.95, ry - 0.7);
}

// 油桶（带箍）
export function barrel(kit, x, y, z, ry = 0, mat = MAT.barrelBlue) {
  const g = kit.group(x, y, z);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.92, 14, 1), mat);
  body.position.y = 0.46;
  body.castShadow = body.receiveShadow = true;
  outline(body, { hull: true });
  g.add(body);
  for (const ry2 of [0.22, 0.68]) {
    const rib = new THREE.Mesh(new THREE.CylinderGeometry(0.385, 0.385, 0.05, 14, 1), MAT.metalDark);
    rib.position.y = ry2;
    rib.castShadow = true;
    g.add(rib);
  }
  g.rotation.y = ry;
  kit.end();
  return g;
}

export function barrelCluster(kit, x, y, z, ry = 0) {
  barrel(kit, x, y, z, 0, MAT.barrelBlue);
  barrel(kit, x + 0.78, y, z + 0.15, 0.5, MAT.barrelRust);
  barrel(kit, x + 0.35, y, z - 0.72, 1.2, MAT.barrelBlue);
  const tipped = barrel(kit, x + 1.35, y, z - 0.5, 0, MAT.barrelRust);
  tipped.rotation.z = Math.PI / 2;
  tipped.rotation.y = ry;
  tipped.position.y = y + 0.36;
}

// 瓦楞纸箱堆
export function cardboardPile(kit, x, y, z, seed = 0) {
  const g = kit.group(x, y, z);
  const add = (w, h, d, px, py, pz, ryy) => {
    const b = new THREE.Mesh(UNIT_BOX, MAT.cardboard);
    b.scale.set(w, h, d);
    b.position.set(px, py + h / 2, pz);
    b.rotation.y = ryy;
    b.castShadow = b.receiveShadow = true;
    outline(b);
    g.add(b);
  };
  add(0.9, 0.62, 0.7, 0, 0, 0, 0.3 + seed * 0.1);
  add(0.7, 0.5, 0.6, 0.1, 0.62, -0.05, 0.9 + seed * 0.2);
  add(0.55, 0.42, 0.5, -0.68, 0, 0.3, 1.6);
  kit.end();
  return g;
}

// 塑料拒马路障
export function barrier(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  const body = kit.box(0.5, 1.05, 1.9, MAT.barrier, 0, 0, 0, {});
  body.position.set(0, 0.52, 0);
  const top = kit.box(0.56, 0.12, 1.9, MAT.barrier, 0, 1.05, 0);
  kit.box(0.44, 0.3, 0.5, MAT.barrier, 0, 0, 0.5, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 水泥隔离墩
export function jerseyBarrier(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(0.62, 0.32, 1.8, MAT.concrete, 0, 0, 0);
  kit.box(0.4, 0.55, 1.8, MAT.concrete, 0, 0.32, 0);
  kit.box(0.28, 0.25, 1.8, MAT.concrete, 0, 0.87, 0);
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 废弃轮胎
export function tire(kit, x, y, z, ry = 0) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.14, 8, 16), MAT.tire);
  m.position.set(x, y + 0.14, z);
  m.rotation.x = Math.PI / 2;
  m.rotation.z = ry;
  m.castShadow = m.receiveShadow = true;
  outline(m, { hull: true });
  kit.root.add(m);
  return m;
}

export function tireStack(kit, x, y, z) {
  tire(kit, x, y, z, 0.4);
  tire(kit, x + 0.1, y + 0.26, z - 0.05, 1.9);
  tire(kit, x - 0.05, y, z + 0.75, 2.6);
}

// 木质货运托盘
export function pallet(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  for (let i = 0; i < 3; i++) {
    kit.box(1.1, 0.05, 0.24, MAT.wood, -0.37 + i * 0.37, 0.1, 0, { outline: false });
  }
  for (let i = 0; i < 2; i++) {
    kit.box(1.1, 0.1, 0.12, MAT.woodDark, 0, 0, -0.42 + i * 0.84, { outline: false });
  }
  kit.box(1.14, 0.04, 0.98, MAT.woodDark, 0, 0.02, 0, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

export function palletStack(kit, x, y, z, ry = 0) {
  pallet(kit, x, y, z, ry);
  pallet(kit, x, y + 0.16, z, ry + 0.12);
  pallet(kit, x, y + 0.32, z, ry - 0.1);
}

// 工业垃圾桶（带盖）
export function dumpster(kit, x, y, z, ry = 0, color = 0x3d6248) {
  const g = kit.group(x, y, z);
  kit.box(1.6, 1.1, 0.9, toon(color), 0, 0.12, 0);
  const lid = kit.box(1.64, 0.08, 0.94, toon(color), 0.02, 1.24, 0);
  lid.rotation.z = 0.12;
  kit.box(1.5, 0.14, 0.06, MAT.metalDark, 0, 0.05, 0.44, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 轮式垃圾桶
export function wheelieBin(kit, x, y, z, ry = 0, color = 0x3a6a4f) {
  const g = kit.group(x, y, z);
  const b = kit.box(0.62, 0.85, 0.55, toon(color), 0, 0.1, 0);
  b.scale.set(0.62, 0.85, 0.55);
  const lid = kit.box(0.64, 0.06, 0.57, toon(color), 0.02, 0.97, 0);
  lid.rotation.z = -0.16;
  kit.box(0.5, 0.06, 0.03, MAT.metalDark, 0, 0.55, 0.28, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 翻倒的自行车（简化）
export function fallenBike(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  const wheelGeo = new THREE.TorusGeometry(0.28, 0.045, 6, 14);
  for (const dx of [-0.48, 0.48]) {
    const w = new THREE.Mesh(wheelGeo, MAT.metalDark);
    w.position.set(dx, 0.08, 0);
    w.rotation.y = Math.PI / 2;
    w.rotation.x = Math.PI / 2;
    outline(w, { hull: true });
    w.castShadow = true;
    g.add(w);
  }
  kit.box(0.9, 0.05, 0.05, MAT.rust, 0, 0.16, 0, { outline: false });
  kit.box(0.05, 0.05, 0.34, MAT.metalDark, 0.2, 0.2, 0.1, { rx: 0.5, outline: false });
  g.rotation.y = ry;
  g.rotation.z = 1.35;
  g.position.y += 0.1;
  kit.end();
  return g;
}

// 翻倒铁艺桌椅
export function tableChairs(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  const top = kit.box(0.9, 0.06, 0.9, MAT.metalDark, 0, 0.62, 0);
  for (const [dx, dz] of [[-0.38, -0.38], [0.38, -0.38], [-0.38, 0.38], [0.38, 0.38]]) {
    kit.box(0.05, 0.62, 0.05, MAT.metalDark, dx, 0, dz, { outline: false });
  }
  const chair = kit.group(1.0, 0, 0.2);
  kit.box(0.42, 0.05, 0.42, MAT.metalDark, 0, 0.42, 0, { outline: false });
  kit.box(0.42, 0.5, 0.05, MAT.metalDark, 0, 0.45, -0.19, { outline: false });
  for (const [dx, dz] of [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]]) {
    kit.box(0.04, 0.42, 0.04, MAT.metalDark, dx, 0, dz, { outline: false });
  }
  chair.rotation.z = 1.5;
  chair.position.y = 0.24;
  kit.end();
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 电线杆 + 横担，返回杆顶点供拉线
export function utilityPole(kit, x, y, z, h = 7) {
  kit.box(0.24, h, 0.24, toon(0x4a4038), x, y, z);
  kit.box(1.7, 0.09, 0.09, toon(0x3a332c), x, y + h - 0.5, z);
  kit.box(1.2, 0.08, 0.08, toon(0x3a332c), x, y + h - 1.15, z);
  for (const dx of [-0.6, 0.6]) {
    kit.box(0.09, 0.14, 0.09, toon(0x2e343a), x + dx, y + h - 0.38, z, { outline: false });
  }
  return new THREE.Vector3(x, y + h - 0.45, z);
}

// 悬垂电线
export function wires(kit, points, sag = 0.9, mat = toon(0x14171b)) {
  const pts = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i], b = points[i + 1];
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.y -= sag;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.022, 5), mat);
    tube.castShadow = false;
    tube.receiveShadow = false;
    kit.root.add(tube);
    pts.push(tube);
  }
  return pts;
}

// 厢式货运卡车
export function boxTruck(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  // 底盘
  kit.box(2.3, 0.32, 6.4, MAT.metalDark, 0, 0.42, 0, { outline: false });
  // 车头
  kit.box(2.2, 1.5, 1.7, toon(0x9aa2ab), 0, 0.74, 2.15);
  const ws = kit.box(2.0, 0.62, 0.06, MAT.glass, 0, 1.55, 2.95, { outline: false });
  ws.rotation.x = -0.18;
  kit.box(2.24, 0.5, 0.5, toon(0x8a929b), 0, 1.75, 2.1, { outline: false });
  // 货厢
  kit.box(2.35, 2.3, 4.4, toon(0xffffff, { map: containerTex("#5c6670", "GX-8842") }), 0, 0.74, -0.9);
  // 车轮
  const wheelGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.3, 12);
  const place = (px, pz) => {
    for (const s of [-1, 1]) {
      const w = new THREE.Mesh(wheelGeo, MAT.tire);
      w.position.set(px * s, 0.42, pz);
      w.rotation.x = Math.PI / 2;
      w.castShadow = true;
      outline(w, { hull: true });
      g.add(w);
    }
  };
  place(1.05, 2.2);
  place(1.05, 0.4);
  place(1.05, -1.6);
  // 保险杠与车灯
  kit.box(2.1, 0.18, 0.16, MAT.metalDark, 0, 0.5, 3.06, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 海运集装箱
export function container(kit, x, y, z, ry = 0, color = "#3a5872", code = "CA-1042", w = 6.1) {
  const m = kit.box(2.5, 2.6, w, toon(0xffffff, { map: containerTex(color, code) }), x, y, z, { ry });
  // 角柱
  const g = kit.group(x, y, z);
  g.rotation.y = ry;
  for (const [dx, dz] of [[-1.18, -w / 2 + 0.1], [1.18, -w / 2 + 0.1], [-1.18, w / 2 - 0.1], [1.18, w / 2 - 0.1]]) {
    kit.box(0.16, 2.62, 0.16, toon(new THREE.Color(color).multiplyScalar(0.7).getHex()), dx, 0, dz, { outline: false });
  }
  kit.end();
  return m;
}

// 木梯
export function ladder(kit, x, y, z, h = 3.2, ry = 0, lean = 0.32) {
  const g = kit.group(x, y, z);
  for (const s of [-1, 1]) {
    kit.box(0.07, h, 0.07, MAT.woodDark, s * 0.26, 0, 0, { outline: false });
  }
  const rungs = Math.floor(h / 0.36);
  for (let i = 1; i < rungs; i++) {
    kit.box(0.52, 0.05, 0.05, MAT.wood, 0, i * 0.36, 0, { outline: false });
  }
  g.rotation.y = ry;
  g.rotation.x = -lean;
  kit.end();
  return g;
}

// 重型货架（五层）
export function rack(kit, x, y, z, ry = 0, w = 3.6) {
  const g = kit.group(x, y, z);
  const postMat = toon(0xa05a28);
  for (const s of [-1, 1]) {
    for (const dz of [-w / 2, w / 2]) {
      kit.box(0.1, 2.6, 0.1, postMat, s * 0.55, 0, dz, { outline: false });
    }
  }
  for (let i = 0; i < 5; i++) {
    const yy = 0.1 + i * 0.55;
    kit.box(1.2, 0.06, w, MAT.woodDark, 0, yy, 0, { outline: false });
    if (i < 4) {
      // 货物
      kit.box(0.8, 0.36, 1.0, MAT.cardboard, -0.08, yy + 0.06, -0.7, { outline: false });
      kit.box(0.5, 0.3, 0.7, MAT.wood, 0.1, yy + 0.06, 0.8, { outline: false });
      if (i % 2 === 0) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), MAT.sack);
        s.scale.set(1.3, 0.7, 0.9);
        s.position.set(0, yy + 0.28, 0.1);
        s.castShadow = true;
        g.add(s);
      }
    }
  }
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 手动叉车
export function forklift(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(1.0, 0.8, 1.7, toon(0x8a6a2a), 0, 0.25, 0.1);
  kit.box(0.9, 0.5, 0.5, toon(0x33383e), 0, 1.05, 0.45, { outline: false });
  kit.box(0.08, 2.0, 0.12, MAT.metalDark, -0.42, 0.25, -0.75, { outline: false });
  kit.box(0.08, 2.0, 0.12, MAT.metalDark, 0.42, 0.25, -0.75, { outline: false });
  kit.box(0.9, 0.08, 0.5, MAT.metalDark, 0, 0.18, -1.15, { outline: false });
  kit.box(0.14, 0.5, 0.1, MAT.metalDark, -0.3, 0.68, -0.72, { outline: false });
  const wheelGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.16, 10);
  for (const [px, pz] of [[-0.5, 0.6], [0.5, 0.6], [-0.42, -0.6], [0.42, -0.6]]) {
    const w = new THREE.Mesh(wheelGeo, MAT.tire);
    w.position.set(px, 0.22, pz);
    w.rotation.x = Math.PI / 2;
    w.castShadow = true;
    g.add(w);
  }
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 麻袋包
export function sacks(kit, x, y, z, n = 4) {
  const g = kit.group(x, y, z);
  for (let i = 0; i < n; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.3, 8, 6), MAT.sack);
    s.scale.set(1.35, 0.62, 0.95);
    const layer = Math.floor(i / 3);
    s.position.set(((i % 3) - 1) * 0.5, 0.2 + layer * 0.4, (i % 2 ? 0.25 : -0.2) + layer * 0.1);
    s.rotation.y = i * 1.3;
    s.castShadow = s.receiveShadow = true;
    g.add(s);
  }
  kit.end();
  return g;
}

// 老式路灯（暖黄）
export function streetLamp(kit, x, y, z, softDot) {
  const g = kit.group(x, y, z);
  kit.cyl(0.09, 0.13, 4.6, 8, MAT.metalDark, 0, 0, 0);
  const arm = kit.box(1.3, 0.09, 0.09, MAT.metalDark, 0.62, 4.5, 0);
  arm.rotation.z = 0.12;
  const head = kit.box(0.5, 0.16, 0.3, MAT.metalDark, 1.2, 4.56, 0);
  const bulb = kit.box(0.4, 0.06, 0.22, toon(0xffe2b0, { emissive: 0xffb45c, emissiveIntensity: 2.2 }), 1.2, 4.46, 0, { outline: false });
  const halo = kit.halo(C.lampWarm, 2.6, 1.2, 4.35, 0, softDot, 0.4);
  g.rotation.y = -Math.PI / 2;
  kit.end();
  return { group: g, bulb, halo };
}

// 铁皮排水沟（檐沟）
export function gutter(kit, x, y, z, len, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(0.3, 0.14, len, MAT.rust, 0, 0, 0, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 空调外机
export function acUnit(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(0.8, 0.8, 0.34, toon(0x9aa2ab), 0, 0, 0);
  const fan = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.06, 12), MAT.metalDark);
  fan.rotation.x = Math.PI / 2;
  fan.position.set(0, 0.42, 0.18);
  g.add(fan);
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 破损路牌
export function roadSign(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(0.07, 2.3, 0.07, MAT.metalDark, 0, 0, 0);
  const plate = kit.box(0.9, 0.42, 0.05, toon(0x4a6a52), 0.1, 2.05, 0);
  plate.rotation.z = 0.22;
  g.rotation.y = ry;
  g.rotation.x = 0.08;
  kit.end();
  return g;
}

// 警用盾牌（斜靠）
export function riotShield(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  const s = kit.box(0.55, 1.15, 0.06, MAT.police, 0, 0, 0);
  kit.box(0.3, 0.14, 0.02, MAT.glass, 0, 0.36, 0.045, { outline: false });
  g.rotation.y = ry;
  g.rotation.x = -0.3;
  g.position.y += 0.56;
  kit.end();
  return g;
}

// 铁皮储物柜
export function locker(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(1.0, 1.9, 0.5, toon(0x4c5a66), 0, 0, 0);
  for (const dx of [-0.24, 0.24]) {
    kit.box(0.4, 1.7, 0.03, toon(0x43505b), dx, 0.1, 0.26, { outline: false });
  }
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 办公桌 + 翻倒办公椅
export function officeSet(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(1.5, 0.07, 0.7, MAT.woodDark, 0, 0.68, 0);
  kit.box(0.06, 0.68, 0.6, MAT.metalDark, -0.68, 0, 0, { outline: false });
  kit.box(0.06, 0.68, 0.6, MAT.metalDark, 0.68, 0, 0, { outline: false });
  // 桌面杂物
  kit.box(0.22, 0.1, 0.14, MAT.metalDark, -0.4, 0.75, 0.1, { outline: false });
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.12, 8), toon(0x8a8f96));
  can.position.set(0.3, 0.78, -0.1);
  g.add(can);
  kit.box(0.34, 0.03, 0.24, toon(0xb8bcc2), 0.05, 0.725, 0.16, { ry: 0.4, outline: false });
  // 翻倒的椅子
  const chair = kit.group(0.6, 0, 0.9);
  kit.box(0.44, 0.06, 0.44, MAT.metalDark, 0, 0.4, 0, { outline: false });
  kit.box(0.44, 0.52, 0.06, MAT.metalDark, 0, 0.44, -0.2, { outline: false });
  chair.rotation.z = 1.45;
  chair.position.y = 0.2;
  g.add(chair);
  kit.end();
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 分拣台
export function sortTable(kit, x, y, z, ry = 0) {
  const g = kit.group(x, y, z);
  kit.box(2.0, 0.08, 0.8, MAT.metal, 0, 0.78, 0);
  kit.box(1.8, 0.6, 0.6, toon(0x4e5860), 0, 0.1, 0, { outline: false });
  g.rotation.y = ry;
  kit.end();
  return g;
}

// 带刺铁丝网卷
export function razorCoil(kit, x, y, z, ry = 0, n = 3) {
  const g = kit.group(x, y, z);
  const geo = new THREE.TorusGeometry(0.3, 0.02, 4, 20);
  for (let i = 0; i < n; i++) {
    const t = new THREE.Mesh(geo, MAT.metalDark);
    t.position.set(0, 0.32 + i * 0.24, 0);
    t.rotation.y = ry + i * 0.4;
    t.castShadow = true;
    g.add(t);
  }
  kit.end();
  return g;
}
