import * as THREE from 'three';
import { toon, glow, outlined, box, cyl, syncOutline, additive, OUTLINE_WIDTH } from './core.js';

// 便利店本体：外壳、玻璃幕墙、自动门、店招、雨棚，以及透过玻璃可见的完整店内。
// 坐标约定：店面正面朝 +Z（z = 1.2），左侧 x = -9，背面 z = -8，右侧 x = 3。

export const STORE = {
  minX: -9,
  maxX: 3,
  frontZ: 1.2,
  backZ: -8,
  roofY: 4.05,
  glassBottom: 0.42,
  glassTop: 3.12,
  doorX: -1.0,
  doorW: 2.7,
};

export const PALETTE = [
  0xff8a5b, 0xffd166, 0x8ce99a, 0x74c0fc, 0xffa8c5, 0xb197fc, 0xffe066, 0x63e6be, 0xff6b6b, 0xa5d8ff, 0xf8f0dd,
];

function pick(list, i) {
  return list[i % list.length];
}

export function buildStore(registry) {
  const store = new THREE.Group();
  const outlinedParts = [];

  const track = (g) => {
    if (g.userData.mesh) outlinedParts.push(g);
    return g;
  };

  const wallMat = toon(0x4b4557);
  const innerMat = toon(0xd8d0bd);
  const trimMat = toon(0xd9d2c2);
  const floorMat = toon(0xb9b1a0);
  const shelfMat = toon(0xcfc7b6);
  const shelfEdgeMat = toon(0x8c8578);

  // ---- 外壳 -------------------------------------------------------------
  track(store.add(box(12, STORE.roofY, 0.34, wallMat, -3, 0, STORE.backZ + 0.17)));
  track(store.add(box(0.34, STORE.roofY, 9.2, wallMat, STORE.minX + 0.17, 0, -3.4)));

  // 内墙
  const backInner = new THREE.Mesh(new THREE.PlaneGeometry(11.6, STORE.roofY - 0.1), innerMat);
  backInner.position.set(-3, STORE.roofY / 2, STORE.backZ + 0.35);
  backInner.receiveShadow = true;
  store.add(backInner);
  const leftInner = new THREE.Mesh(new THREE.PlaneGeometry(9.1, STORE.roofY - 0.1), innerMat);
  leftInner.rotation.y = Math.PI / 2;
  leftInner.position.set(STORE.minX + 0.35, STORE.roofY / 2, -3.4);
  store.add(leftInner);

  // 店内地面 + 天花板
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 9.1), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(-3, 0.16, -3.4);
  floor.receiveShadow = true;
  store.add(floor);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(11.6, 9.1), toon(0xf6f1e6));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(-3, STORE.roofY - 0.12, -3.4);
  store.add(ceiling);

  // 天花灯板
  const lampMat = glow(0xfff6e2);
  for (let i = 0; i < 4; i += 1) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.05, 0.44), lampMat);
    panel.position.set(-7.6 + i * 2.95, STORE.roofY - 0.18, -2.4);
    store.add(panel);
  }
  for (let i = 0; i < 3; i += 1) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.05, 2.1), lampMat);
    panel.position.set(-6.4 + i * 3.3, STORE.roofY - 0.18, -6.0);
    store.add(panel);
  }

  // 屋顶与檐口
  track(store.add(box(12.6, 0.3, 9.6, toon(0x3a3543), -3, STORE.roofY, -3.4)));
  track(store.add(box(12.9, 0.14, 9.9, toon(0x4d4759), -3, STORE.roofY + 0.3, -3.4)));

  // ---- 正面玻璃幕墙 -----------------------------------------------------
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfeaff,
    transparent: true,
    opacity: 0.14,
    roughness: 0.06,
    metalness: 0,
    transmission: 0.6,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const glassH = STORE.glassTop - STORE.glassBottom;
  const doorL = STORE.doorX - STORE.doorW / 2;
  const doorR = STORE.doorX + STORE.doorW / 2;

  // 门两侧的固定玻璃
  const leftGlass = new THREE.Mesh(new THREE.PlaneGeometry(doorL - STORE.minX - 0.1, glassH), glassMat);
  leftGlass.position.set((STORE.minX + doorL) / 2, STORE.glassBottom + glassH / 2, STORE.frontZ);
  store.add(leftGlass);
  const rightGlass = new THREE.Mesh(new THREE.PlaneGeometry(STORE.maxX - doorR - 0.1, glassH), glassMat);
  rightGlass.position.set((doorR + STORE.maxX) / 2, STORE.glassBottom + glassH / 2, STORE.frontZ);
  store.add(rightGlass);

  // 侧面玻璃（朝辅路）
  const sideGlass = new THREE.Mesh(new THREE.PlaneGeometry(8.6, 2.5), glassMat);
  sideGlass.rotation.y = Math.PI / 2;
  sideGlass.position.set(STORE.maxX, 1.72, -3.4);
  store.add(sideGlass);

  // 竖框、窗台、门框
  const frameParts = [];
  for (const x of [STORE.minX + 0.1, -7.4, -5.2, doorL - 0.08, doorR + 0.08, 1.4, STORE.maxX - 0.1]) {
    frameParts.push(track(store.add(box(0.1, glassH + 0.24, 0.13, trimMat, x, STORE.glassBottom - 0.12, STORE.frontZ + 0.03))));
  }
  track(store.add(box(12.1, 0.26, 0.3, trimMat, -3, 0.06, STORE.frontZ + 0.03)));
  track(store.add(box(12.1, 0.12, 0.18, trimMat, -3, STORE.glassTop, STORE.frontZ + 0.03)));
  for (const z of [-7.9, -3.4, 1.1]) {
    track(store.add(box(0.13, 2.7, 0.1, trimMat, STORE.maxX + 0.02, 0.3, z)));
  }
  track(store.add(box(0.3, 0.24, 8.8, trimMat, STORE.maxX + 0.02, 0.06, -3.4)));

  // 门上方横档
  const transom = new THREE.Mesh(new THREE.PlaneGeometry(STORE.doorW + 0.2, 0.34), glassMat);
  transom.position.set(STORE.doorX, STORE.glassTop + 0.22, STORE.frontZ + 0.01);
  store.add(transom);

  // ---- 自动门（两扇对开）-----------------------------------------------
  const doorMat = new THREE.MeshPhysicalMaterial({
    color: 0xd6efff,
    transparent: true,
    opacity: 0.2,
    roughness: 0.04,
    transmission: 0.55,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const doorGeo = new THREE.BoxGeometry(STORE.doorW / 2 - 0.04, 2.42, 0.06);
  const doorA = new THREE.Mesh(doorGeo, doorMat);
  const doorB = new THREE.Mesh(doorGeo, doorMat);
  doorA.position.set(STORE.doorX - STORE.doorW / 4, 0.42 + 1.21, STORE.frontZ + 0.02);
  doorB.position.set(STORE.doorX + STORE.doorW / 4, 0.42 + 1.21, STORE.frontZ + 0.02);
  store.add(doorA, doorB);
  const doorHome = [doorA.position.x, doorB.position.x];
  // 门框横梁
  track(store.add(box(STORE.doorW + 0.3, 0.14, 0.16, trimMat, STORE.doorX, 0.42 + 2.42, STORE.frontZ + 0.03)));
  // 门边竖条（金属，方便看出门在动）
  const doorBarMat = toon(0xb8b2a4);
  for (const [door, sign] of [[doorA, -1], [doorB, 1]]) {
    const bar = box(0.05, 2.3, 0.09, doorBarMat, sign * (STORE.doorW / 2 - 0.12), 0, 0, { thickness: 0.012 });
    bar.position.set(door.position.x + sign * (STORE.doorW / 2 - 0.12), 0.42 + 1.16, STORE.frontZ + 0.02);
    store.add(bar);
    outlinedParts.push(bar);
    if (sign === -1) registry.doorBarA = bar;
    else registry.doorBarB = bar;
  }

  // 门口地垫
  const mat = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.05, 1.05), toon(0x5b5472));
  mat.position.set(STORE.doorX, 0.145, STORE.frontZ + 0.62);
  mat.receiveShadow = true;
  store.add(mat);

  // ---- 雨棚与店招 -------------------------------------------------------
  track(store.add(box(12.3, 0.2, 1.5, toon(0x2c6a66), -3, STORE.roofY - 0.34, STORE.frontZ + 0.78)));
  track(store.add(box(12.3, 0.3, 0.1, toon(0xeee7d6), -3, STORE.roofY - 0.5, STORE.frontZ + 1.5)));
  // 雨棚底灯带
  const awningStrip = new THREE.Mesh(new THREE.BoxGeometry(11.9, 0.04, 0.08), glow(0xffe6b8));
  awningStrip.position.set(-3, STORE.roofY - 0.42, STORE.frontZ + 1.32);
  store.add(awningStrip);

  track(store.add(box(12.7, 1.0, 0.46, toon(0x4e4a5c), -3, STORE.roofY + 0.42, STORE.frontZ + 0.6)));

  // 店招：白底 + 三色带，三渲二式的平面灯箱
  const signZ = STORE.frontZ + 0.84;
  const signWhite = new THREE.Mesh(new THREE.PlaneGeometry(12.3, 0.84), glow(0xd9d2c0));
  signWhite.position.set(-3, STORE.roofY + 0.92, signZ);
  store.add(signWhite);
  const bands = [0x2fa38b, 0xffa62b, 0xe2536b];
  bands.forEach((color, i) => {
    const band = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.84), glow(color));
    band.position.set(-7.7 + i * 2.6, STORE.roofY + 0.92, signZ + 0.004);
    store.add(band);
  });
  // 招牌上的抽象字块（不依赖字体，纯几何）
  for (let i = 0; i < 4; i += 1) {
    const glyph = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.12), glow(0x4a4550));
    glyph.position.set(0.6 + i * 0.72, STORE.roofY + 0.92, signZ + 0.008);
    store.add(glyph);
  }
  registry.signMats = [signWhite.material, ...store.children.filter((c) => c.material && c.material === undefined).map(() => null).filter(Boolean)];
  registry.signWhiteMat = signWhite.material;
  registry.signBandMats = bands.map((c) => glow(c));

  // 招牌外溢光
  const halo = new THREE.Mesh(new THREE.PlaneGeometry(14.5, 2.4), additive(0xffd9a0, 0.13));
  halo.position.set(-3, STORE.roofY + 0.7, signZ + 0.05);
  store.add(halo);

  // 侧面竖向灯箱
  const sideSign = new THREE.Mesh(new THREE.PlaneGeometry(0.72, 3.0), glow(0xfff1d2));
  sideSign.rotation.y = Math.PI / 2;
  sideSign.position.set(STORE.maxX + 0.22, 2.5, 0.9);
  store.add(sideSign);
  registry.sideSignMat = sideSign.material;

  // ---- 店内陈设 ---------------------------------------------------------
  const interior = new THREE.Group();
  store.add(interior);

  const shelfUnit = (width, height, depth, layers, density, x, z, rotY = 0) => {
    const unit = new THREE.Group();
    unit.add(box(width, height, depth, shelfMat, 0, 0, 0));
    const layerH = (height - 0.12) / layers;
    for (let s = 0; s < layers; s += 1) {
      const y = 0.06 + s * layerH;
      unit.add(box(width - 0.06, 0.04, depth + 0.02, shelfEdgeMat, 0, y, 0, { thickness: 0.01 }));
      const slots = Math.max(2, Math.round((width / 0.2) * density));
      for (let i = 0; i < slots; i += 1) {
        if ((i * 7 + s * 3) % 11 === 0) continue;
        const cw = 0.1 + ((i * 13) % 5) * 0.012;
        const ch = layerH * (0.34 + ((i * 5 + s) % 4) * 0.1);
        const color = pick(PALETTE, i * 3 + s);
        unit.add(box(cw, ch, depth * 0.62, toon(color), -width / 2 + 0.1 + (i / slots) * (width - 0.2), y + 0.04, depth * 0.3, { thickness: 0.012 }));
      }
    }
    unit.position.set(x, 0.16, z);
    unit.rotation.y = rotY;
    interior.add(unit);
    return unit;
  };

  // 中央三排双面货架
  for (let row = 0; row < 3; row += 1) {
    shelfUnit(2.6, 1.42, 0.8, 3, 1, -6.0, -6.2 + row * 2.15);
    interior.add(box(2.6, 1.42, 0.05, shelfEdgeMat, -6.0, 0.16, -6.2 + row * 2.15 - 0.42, { thickness: 0.01 }));
  }
  // 靠左墙的零食架
  for (let row = 0; row < 3; row += 1) {
    shelfUnit(1.6, 1.8, 0.4, 4, 0.75, -8.5, -6.3 + row * 2.05, Math.PI / 2);
  }
  // 靠窗的杂志架（从街上能看见）
  shelfUnit(1.5, 1.24, 0.32, 3, 0.6, 2.0, -0.6, -Math.PI / 2.4);

  // 后墙饮料冷柜
  interior.add(box(6.4, 2.4, 0.6, toon(0xe2e9f0), -5.4, 0.16, -7.5));
  const fridgePaneMat = new THREE.MeshBasicMaterial({
    color: 0xd8f1ff,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  for (let i = 0; i < 5; i += 1) {
    const x = -7.95 + i * 1.28;
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.05), fridgePaneMat);
    pane.position.set(x, 1.35, -7.19);
    interior.add(pane);
    interior.add(box(0.06, 2.15, 0.06, toon(0xc3cbd6), x - 0.58, 0.24, -7.18, { thickness: 0.01 }));
    for (let s = 0; s < 3; s += 1) {
      const y = 0.56 + s * 0.6;
      interior.add(box(1.06, 0.035, 0.38, shelfEdgeMat, x, y, -7.42, { thickness: 0.008 }));
      for (let b = 0; b < 5; b += 1) {
        const color = pick(PALETTE, i * 2 + b + s * 3);
        interior.add(box(0.1, 0.32, 0.1, toon(color), x - 0.42 + b * 0.2, y + 0.035, -7.42, { thickness: 0.008 }));
      }
    }
  }
  const fridgeLight = new THREE.Mesh(new THREE.PlaneGeometry(6.1, 2.1), additive(0xeaf6ff, 0.1));
  fridgeLight.position.set(-5.4, 1.32, -7.21);
  interior.add(fridgeLight);

  // 便当 / 熟食区
  interior.add(box(2.9, 0.92, 0.66, toon(0xf4eee2), -0.5, 0.16, -7.2));
  for (let i = 0; i < 8; i += 1) {
    const color = [0xff9f7a, 0xffd27f, 0xfff0b8, 0xd9885c][i % 4];
    interior.add(box(0.3, 0.13, 0.32, toon(color), -1.6 + (i % 4) * 0.55, 1.14, -7.2, { thickness: 0.01 }));
  }
  const bentoStrip = new THREE.Mesh(new THREE.BoxGeometry(2.9, 0.04, 0.08), glow(0xffd9a0));
  bentoStrip.position.set(-0.5, 1.98, -7.0);
  interior.add(bentoStrip);

  // 饭团 / 零食岛台
  interior.add(box(1.7, 0.78, 0.95, toon(0xf2ece1), -3.4, 0.16, -4.4));
  for (let i = 0; i < 10; i += 1) {
    const color = [0xfdf6e3, 0xffe6a3, 0xffb3b3, 0xb9e8b1][i % 4];
    interior.add(box(0.13, 0.14, 0.13, toon(color), -4.0 + (i % 5) * 0.26, 0.98, -4.65 + Math.floor(i / 5) * 0.44, { thickness: 0.01 }));
  }

  // 收银台 + 收银机 + 咖啡机 + 关东煮
  interior.add(box(3.0, 1.02, 0.78, toon(0xece6d8), -0.7, 0.16, 0.0));
  interior.add(box(3.1, 0.07, 0.88, toon(0xf8f4ea), -0.7, 1.18, 0.0, { thickness: 0.012 }));
  interior.add(box(0.46, 0.3, 0.34, toon(0x6d7484), -0.1, 1.25, 0.0));
  const cashierScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.2), glow(0xa6ecff));
  cashierScreen.position.set(-0.1, 1.5, 0.18);
  interior.add(cashierScreen);
  interior.add(box(0.62, 0.84, 0.5, toon(0x7c8290), -1.7, 1.25, -0.04));
  const coffeeScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.38, 0.14), glow(0xffbb7a));
  coffeeScreen.position.set(-1.7, 1.8, 0.22);
  interior.add(coffeeScreen);
  interior.add(box(1.05, 0.32, 0.66, toon(0xb4593f), -0.75, 1.25, 0.0));
  const soup = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.03, 0.52), glow(0xffb45e));
  soup.position.set(-0.75, 1.58, 0.0);
  interior.add(soup);
  for (let i = 0; i < 8; i += 1) {
    const color = [0xffd9a0, 0xe9c27c, 0xffb3a0, 0xf6e3b0][i % 4];
    interior.add(box(0.09, 0.08, 0.09, toon(color), -1.12 + (i % 4) * 0.24, 1.6, -0.1 + Math.floor(i / 4) * 0.24, { thickness: 0.008 }));
  }

  // 宣传海报 + 店内灯箱
  const posterColors = [0xffd166, 0xff8a5b, 0x8ce99a, 0x74c0fc];
  posterColors.forEach((color, i) => {
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.66, 0.9), glow(color));
    poster.position.set(-7.6 + i * 1.5, 2.6, STORE.backZ + 0.37);
    interior.add(poster);
  });

  // 地贴导视
  const guide = new THREE.Mesh(new THREE.PlaneGeometry(0.42, 1.5), additive(0x8fe6c8, 0.26));
  guide.rotation.x = -Math.PI / 2;
  guide.position.set(-1.0, 0.17, -1.6);
  interior.add(guide);

  // 后场门 + 储物柜
  interior.add(box(1.1, 2.0, 0.08, toon(0xb9b3a5), -7.5, 0.16, -7.68));
  interior.add(box(1.5, 1.62, 0.36, toon(0xcac4b5), -3.0, 0.16, -7.66));

  // ---- 玻璃雨痕 ---------------------------------------------------------
  const droplets = [];
  const dropletGeo = new THREE.PlaneGeometry(0.04, 1);
  const dropletMatBase = new THREE.MeshBasicMaterial({
    color: 0xe4f6ff,
    transparent: true,
    opacity: 0.3,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  for (let i = 0; i < 26; i += 1) {
    const m = new THREE.Mesh(dropletGeo, dropletMatBase.clone());
    m.position.set(STORE.minX + 0.4 + Math.random() * 10.6, STORE.glassBottom + Math.random() * glassH, STORE.frontZ + 0.035);
    m.scale.y = 0.25 + Math.random() * 0.6;
    m.userData.speed = 0.1 + Math.random() * 0.32;
    m.userData.len = 0.25 + Math.random() * 0.6;
    store.add(m);
    droplets.push(m);
  }
  registry.droplets = droplets;
  registry.dropletBase = dropletMatBase;

  registry.store = store;
  registry.storeOutlines = outlinedParts;
  registry.doorA = doorA;
  registry.doorB = doorB;
  registry.doorHome = doorHome;
  registry.sync = () => {
    for (const g of outlinedParts) syncOutline(g);
    for (const g of [registry.doorBarA, registry.doorBarB]) if (g) syncOutline(g);
  };

  return store;
}

export { OUTLINE_WIDTH };
