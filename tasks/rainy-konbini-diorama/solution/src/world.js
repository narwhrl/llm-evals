import * as THREE from "three";

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

const inkColor = 0x0c0a14;

function toon(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, ...opts });
}

// 简单 3 档渐变贴图，让 MeshToonMaterial 呈赛璐璐阶梯感
const gradientMap = (() => {
  const c = document.createElement("canvas");
  c.width = 4;
  c.height = 1;
  const ctx = c.getContext("2d");
  const steps = ["#555", "#aaa", "#ddd", "#fff"];
  steps.forEach((s, i) => {
    ctx.fillStyle = s;
    ctx.fillRect(i, 0, 1, 1);
  });
  const tex = new THREE.CanvasTexture(c);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
})();

function toonMat(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap, ...opts });
}

const lineMat = new THREE.LineBasicMaterial({ color: inkColor, transparent: true, opacity: 0.85 });

function outline(mesh, scale = 1.035, color = inkColor) {
  const g = new THREE.Group();
  const m = mesh.clone();
  m.material = new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
  m.scale.multiplyScalar(scale);
  g.add(m);
  g.add(mesh);
  return g;
}

function box(w, h, d, color, x = 0, y = 0, z = 0, opts = {}) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const mat = opts.flat ? toonMat(color) : toonMat(color, opts.matOpts || {});
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  if (opts.ry) m.rotation.y = opts.ry;
  if (opts.rx) m.rotation.x = opts.rx;
  if (opts.rz) m.rotation.z = opts.rz;
  if (opts.shadow !== false) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  if (opts.outline) return outline(m, opts.outlineScale ?? 1.035);
  return m;
}

function cyl(rt, rb, h, seg, color, x = 0, y = 0, z = 0, opts = {}) {
  const geo = new THREE.CylinderGeometry(rt, rb, h, seg);
  const m = new THREE.Mesh(geo, toonMat(color, opts.matOpts || {}));
  m.position.set(x, y, z);
  if (opts.rx) m.rotation.x = opts.rx;
  if (opts.rz) m.rotation.z = opts.rz;
  if (opts.shadow !== false) {
    m.castShadow = true;
    m.receiveShadow = true;
  }
  if (opts.outline) return outline(m, opts.outlineScale ?? 1.04);
  return m;
}

function plane(w, h, color, x = 0, y = 0, z = 0, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, h);
  const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color, ...opts.matOpts }));
  m.position.set(x, y, z);
  if (opts.rx !== undefined) m.rotation.x = opts.rx;
  if (opts.ry !== undefined) m.rotation.y = opts.ry;
  if (opts.rz !== undefined) m.rotation.z = opts.rz;
  return m;
}

function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/* ------------------------------------------------------------------ */
/* diorama                                                             */
/* ------------------------------------------------------------------ */

export function buildDiorama() {
  const root = new THREE.Group();

  const animated = {
    rain: null,
    drips: [],
    puddles: [],
    doorL: null,
    doorR: null,
    signMat: null,
    lightboxMats: [],
    trafficRed: null,
    trafficGreen: null,
    trafficYellow: null,
    glassStreaks: [],
    vendingGlow: null,
    streetlampGlow: null,
    interiorGlow: null,
    crosswalk: null,
    wetPatches: [],
  };

  /* ---------- base ---------- */
  // 正方形底座（20×20），侧面深色木板框
  const BASE = 20;
  const baseSide = box(BASE + 0.7, 0.9, BASE + 0.7, 0x2b2430, 0, -0.45, 0, { flat: true });
  root.add(outline(baseSide, 1.012));
  const baseTop = box(BASE, 0.35, BASE, 0x2e3440, 0, -0.16, 0, { flat: true });
  root.add(baseTop);

  /* ---------- layout ---------- */
  // 街角：便利店坐落在 L 形人行道内角。两条路分别沿 -Z 边（横街）与 +X 边（竖街），
  // 在东南角交叉。便利店在西北角（左上角），面向东南的十字路口。
  // 坐标约定：店沿 X 轴朝 +Z 开门（front 朝 +Z，即面向南侧街道）。

  const ROAD_W = 5.2;
  const SIDE_W = 2.2;

  // 横街（南侧，东西向）：z ∈ [7.4, 10]
  const roadH = box(BASE, 0.08, 2.6, 0x23262e, 0, 0.01, 8.7, { flat: true });
  root.add(roadH);
  // 竖街（东侧，南北向）：x ∈ [7.4, 10]
  const roadV = box(2.6, 0.08, BASE, 0x23262e, 8.7, 0.01, 0, { flat: true });
  root.add(roadV);

  // 街角转角圆弧：让两条路在东南角汇合
  const corner = cyl(2.6, 2.6, 0.08, 20, 0x23262e, 7.4, 0.01, 7.4, { shadow: false });
  root.add(corner);

  // 人行道（L 形）：店所在的西北大区块 + 沿竖街西侧的窄条
  const side1 = box(14.8, 0.12, BASE - 2.6, 0x8a8f99, -2.6, 0.07, -1.3, { flat: true });
  root.add(side1);
  const side2 = box(4.8, 0.12, 4.8, 0x8a8f99, 5.0, 0.07, 5.0, { flat: true });
  root.add(side2);

  // 路缘石
  const curbMat = toonMat(0xb9bec9);
  const curbH = new THREE.Mesh(new THREE.BoxGeometry(14.8, 0.16, 0.18), curbMat);
  curbH.position.set(-2.6, 0.09, 7.4);
  root.add(curbH);
  const curbV = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 9.8), curbMat);
  curbV.position.set(7.4, 0.09, -2.5);
  root.add(curbV);
  const curbC = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 4.6), curbMat);
  curbC.position.set(7.4, 0.09, 5.1);
  root.add(curbC);
  const curbH2 = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 0.18), curbMat);
  curbH2.position.set(5.0, 0.09, 7.4);
  root.add(curbH2);

  /* ---------- road markings ---------- */
  const markMat = new THREE.MeshBasicMaterial({ color: 0xdfe4ea });
  // 横街中央虚线
  for (let i = -4; i <= 3; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.1), markMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(i * 2.0 + 0.5, 0.055, 8.7);
    root.add(m);
  }
  // 竖街中央虚线
  for (let i = -4; i <= 2; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.9), markMat);
    m.rotation.x = -Math.PI / 2;
    m.position.set(8.7, 0.055, i * 2.0 + 0.4);
    root.add(m);
  }

  // 反光斑马线（横街，东侧路口）
  const zebra = new THREE.Group();
  for (let i = 0; i < 6; i++) {
    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(0.55, 2.2),
      new THREE.MeshStandardMaterial({
        color: 0xf4f7fb,
        roughness: 0.25,
        metalness: 0.35,
        emissive: 0x11141a,
      }),
    );
    p.rotation.x = -Math.PI / 2;
    p.position.set(-0.9 + i * 0.95, 0.06, 8.7);
    zebra.add(p);
  }
  root.add(zebra);
  animated.crosswalk = zebra;

  // 竖街斑马线
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(2.2, 0.5),
      new THREE.MeshStandardMaterial({
        color: 0xeef1f6,
        roughness: 0.3,
        metalness: 0.3,
        emissive: 0x0d1015,
      }),
    );
    p.rotation.x = -Math.PI / 2;
    p.position.set(8.7, 0.06, 3.4 + i * 0.85);
    root.add(p);
  }

  // 排水沟（沿横街路缘）
  const drain = new THREE.Group();
  const dg = new THREE.Mesh(new THREE.BoxGeometry(9.5, 0.05, 0.3), new THREE.MeshBasicMaterial({ color: 0x14171d }));
  dg.position.set(-3.0, 0.055, 7.62);
  drain.add(dg);
  for (let i = 0; i < 22; i++) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 0.3), new THREE.MeshBasicMaterial({ color: 0x3a4150 }));
    bar.position.set(-7.6 + i * 0.42, 0.06, 7.62);
    drain.add(bar);
  }
  root.add(drain);

  /* ---------- 便利店建筑 ---------- */
  const store = new THREE.Group();
  // 店体位于底座西北，front 面向 +Z（南，面向横街与路口）
  // 占地约 x:[-6.6, 2.6], z:[-6.4, 2.2]
  const SW = 9.2;   // 面宽（x）
  const SD = 8.6;   // 进深（z）
  const SH = 3.9;   // 层高
  const SX = -2.0;  // 中心 x
  const SZ = -2.1;  // 中心 z（front 面在 z=+2.2，留给入口人行道）
  store.position.set(SX, 0.13, SZ);
  root.add(store);

  const wallC = 0xf3ead8; // 米白墙体
  // 后侧与左右实体墙
  const backWall = box(SW, SH, 0.3, wallC, 0, SH / 2, -SD / 2 + 0.15, { flat: true });
  store.add(backWall);
  const leftWall = box(0.3, SH, SD, wallC, -SW / 2 + 0.15, SH / 2, 0, { flat: true });
  store.add(leftWall);
  const rightWall = box(0.3, SH, SD, wallC, SW / 2 - 0.15, SH / 2, 0, { flat: true });
  store.add(rightWall);

  // 地板
  const floor = box(SW - 0.6, 0.12, SD - 0.6, 0xe8dcc4, 0, 0.06, 0, { flat: true });
  store.add(floor);
  // 天花
  const ceil = box(SW - 0.6, 0.15, SD - 0.6, 0xf6f1e4, 0, SH - 0.1, 0, { flat: true });
  store.add(ceil);

  /* ---------- 店面正面：招牌带 + 玻璃幕墙 ---------- */
  const frontZ = SD / 2; // 4.3（本地坐标）

  // 顶部招牌带（konbini 标志性横条）：橙绿条纹。放在雨棚下方一点避免被屋顶遮。
  const fasciaH = 0.85;
  const fascia = new THREE.Group();
  const fasciaBg = box(SW, fasciaH, 0.25, 0xffffff, 0, SH - fasciaH / 2 - 0.55, frontZ - 0.13, { flat: true });
  fascia.add(fasciaBg);
  const stripTex = canvasTex(512, 96, (ctx, w, h) => {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#ff8c42"; // 橙
    ctx.fillRect(0, 0, w, 34);
    ctx.fillStyle = "#2fb45c"; // 绿
    ctx.fillRect(0, 34, w, 20);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 54, w, 8);
    ctx.fillStyle = "#173a6b";
    ctx.font = "bold 34px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SOL MART  24h", w / 2, 78);
  });
  const fasciaPanel = new THREE.Mesh(
    new THREE.PlaneGeometry(SW - 0.15, fasciaH - 0.06),
    new THREE.MeshBasicMaterial({ map: stripTex }),
  );
  fasciaPanel.position.set(0, SH - fasciaH / 2 - 0.55, frontZ + 0.001);
  fascia.add(fasciaPanel);
  // 招牌灯箱微光
  const fasciaGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(SW - 0.1, fasciaH + 0.35),
    new THREE.MeshBasicMaterial({
      color: 0xfff2c4,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  fasciaGlow.position.set(0, SH - fasciaH / 2 - 0.55, frontZ + 0.02);
  fascia.add(fasciaGlow);
  animated.signMat = fasciaGlow.material;
  store.add(fascia);

  // 玻璃幕墙区域（正面下部）：立柱 + 大玻璃 + 自动门
  const glassH = SH - fasciaH - 0.15; // ~2.85
  const frameMat = toonMat(0x3a4354);

  // 立柱与横梁
  const beam = new THREE.Mesh(new THREE.BoxGeometry(SW, 0.12, 0.22), frameMat);
  beam.position.set(0, fasciaH + 0.06, frontZ - 0.05);
  store.add(beam);
  const sill = new THREE.Mesh(new THREE.BoxGeometry(SW, 0.18, 0.22), frameMat);
  sill.position.set(0, 0.09, frontZ - 0.05);
  store.add(sill);

  // 竖框柱
  const postXs = [-SW / 2 + 0.15, -SW / 2 + 2.9, -SW / 2 + 5.9, SW / 2 - 0.15];
  postXs.forEach((px) => {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.16, glassH, 0.2), frameMat);
    p.position.set(px, glassH / 2 + 0.09, frontZ - 0.05);
    store.add(p);
  });

  // 玻璃（固定部分）：分三段，中间为自动门开口
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xbfe8ff,
    transparent: true,
    opacity: 0.1,
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.0,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  function glassPane(w, x) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(w, glassH - 0.2), glassMat);
    g.position.set(x, glassH / 2 + 0.1, frontZ - 0.04);
    return g;
  }
  // 左大窗、右大窗
  store.add(glassPane(2.7, -SW / 2 + 1.55));
  store.add(glassPane(2.55, SW / 2 - 1.42));
  // 门两侧的固定小窗（中柱到门框）
  store.add(glassPane(0.9, -SW / 2 + 4.4));
  store.add(glassPane(0.9, SW / 2 - 3.1));

  // 自动门（两扇滑动玻璃门，开口位于正面偏右）
  const doorGroup = new THREE.Group();
  const doorW = 1.15;
  const doorH = glassH - 0.25;
  const doorMat = new THREE.MeshPhysicalMaterial({
    color: 0xcfefff,
    transparent: true,
    opacity: 0.32,
    roughness: 0.08,
    depthWrite: false,
  });
  const doorFrame = toonMat(0x2c3546);
  function doorLeaf() {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.05), doorFrame);
    g.add(frame);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(doorW - 0.16, doorH - 0.16), doorMat);
    glass.position.z = 0.03;
    g.add(glass);
    return g;
  }
  const doorL = doorLeaf();
  const doorR = doorLeaf();
  const doorCenterX = 0.9; // 开口中心（本地 x）
  doorL.position.set(doorCenterX - doorW / 2 + 0.02, doorH / 2 + 0.15, frontZ - 0.02);
  doorR.position.set(doorCenterX + doorW / 2 - 0.02, doorH / 2 + 0.15, frontZ - 0.02);
  doorGroup.add(doorL, doorR);
  // 门上方感应器与横楣
  const header = new THREE.Mesh(new THREE.BoxGeometry(doorW * 2 + 0.3, 0.14, 0.24), frameMat);
  header.position.set(doorCenterX, glassH + 0.04, frontZ - 0.05);
  doorGroup.add(header);
  store.add(doorGroup);
  animated.doorL = doorL;
  animated.doorR = doorR;
  animated.doorBaseX = { l: doorL.position.x, r: doorR.position.x, w: doorW };

  // 门口地垫
  const mat1 = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.9), new THREE.MeshBasicMaterial({ color: 0x4c5a52 }));
  // 门口上方小暖灯（照亮入口）
  const doorLamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffe2a8 }));
  doorLamp.position.set(doorCenterX, glassH + 0.22, frontZ + 0.16);
  store.add(doorLamp);
  const doorGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  doorGlow.position.copy(doorLamp.position);
  store.add(doorGlow);
  const doorLight = new THREE.PointLight(0xffd9a0, 12, 6, 2);
  doorLight.position.set(doorCenterX, glassH + 0.1, frontZ + 0.4);
  store.add(doorLight);
  // 门口右侧小灯箱（立式）
  const lbStand = new THREE.Group();
  const lbBody = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.3, 0.35), toonMat(0xfff3d8));
  lbBody.position.y = 0.65;
  lbStand.add(outline(lbBody, 1.05));
  const lbFace = new THREE.Mesh(
    new THREE.PlaneGeometry(0.45, 1.1),
    new THREE.MeshBasicMaterial({ color: 0xffe9b8 }),
  );
  lbFace.position.set(0, 0.65, 0.18);
  lbStand.add(lbFace);
  const lbTex = canvasTex(64, 128, (ctx, w, h) => {
    ctx.fillStyle = "#ffe9b8";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#d33f3f";
    ctx.font = "bold 18px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("24h", w / 2, h / 2 - 10);
    ctx.fillStyle = "#173a6b";
    ctx.font = "bold 14px sans-serif";
    ctx.fillText("OPEN", w / 2, h / 2 + 14);
  });
  lbFace.material.map = lbTex;
  lbFace.material.needsUpdate = true;
  lbStand.position.set(doorCenterX + 2.2, 0.13, frontZ + 0.35);
  store.add(lbStand);
  mat1.rotation.x = -Math.PI / 2;
  mat1.position.set(doorCenterX, 0.125, frontZ + 0.55);
  store.add(mat1);
  const mat2 = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 0.6), new THREE.MeshBasicMaterial({ color: 0x5d6e63 }));
  mat2.rotation.x = -Math.PI / 2;
  mat2.position.set(doorCenterX, 0.125, frontZ - 0.45);
  store.add(mat2);

  // 屋檐雨棚（正面顶部，向前伸出），贴在招牌带之上
  const awningY = SH - 0.55 + fasciaH / 2 + 0.1;
  const awning = box(SW + 0.6, 0.16, 1.5, 0x3b475c, 0, awningY, frontZ + 0.62, { flat: true });
  store.add(awning);
  const awningLip = box(SW + 0.6, 0.22, 0.1, 0x2c3546, 0, awningY - 0.16, frontZ + 1.34, { flat: true });
  store.add(awningLip);

  /* ---------- 屋顶设备 ---------- */
  const roof = box(SW + 0.4, 0.22, SD + 0.4, 0x323b4d, 0, SH + 0.11, 0, { flat: true });
  store.add(roof);
  // 屋顶空调外机 & 排气口
  store.add(box(1.0, 0.6, 0.7, 0x9aa3ad, -2.6, SH + 0.5, -2.0, { outline: true }));
  store.add(box(0.7, 0.45, 0.7, 0x8b95a1, -1.2, SH + 0.42, -2.4, { outline: true }));
  store.add(cyl(0.16, 0.16, 0.5, 10, 0x707a88, 2.8, SH + 0.45, -2.8));

  /* ---------- 店内陈设 ---------- */
  const interior = new THREE.Group();
  store.add(interior);

  // 冷白暖色混合的店内灯带（天花下两条灯槽）——亮一些以透过玻璃看清
  const lightStripMat = new THREE.MeshBasicMaterial({ color: 0xfff6d8 });
  for (const lz of [-2.6, -0.6, 1.4]) {
    const strip = new THREE.Mesh(new THREE.BoxGeometry(SW - 1.4, 0.05, 0.3), lightStripMat);
    strip.position.set(0, SH - 0.2, lz);
    interior.add(strip);
  }
  // 近窗矮货架（朝向橱窗的小陈列台，让街外一眼看到商品）
  const windowShelf = new THREE.Group();
  const wsBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.4), toonMat(0xd7dde6));
  wsBody.position.y = 0.45;
  windowShelf.add(wsBody);
  const wsTop = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.05, 0.45), toonMat(0xaab6c4));
  wsTop.position.y = 0.92;
  windowShelf.add(wsTop);
  // 顶层小包装零食
  const snackCols = [0xff5b5b, 0xffd166, 0x7bd86b, 0x5bb8ff, 0xff9e6b];
  for (let i = 0; i < 5; i++) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.3), toonMat(snackCols[i]));
    s.position.set(-0.6 + i * 0.3, 1.06, 0);
    windowShelf.add(s);
  }
  windowShelf.position.set(-2.2, 0.12, 2.6);
  interior.add(windowShelf);
  // 门口正对的促销堆头
  const promo = new THREE.Group();
  const promoBase = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.6, 0.9, 12), toonMat(0xd33f3f));
  promoBase.position.y = 0.45;
  promo.add(promoBase);
  const promoTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.1, 0.9), toonMat(0xffffff));
  promoTop.position.y = 0.95;
  promo.add(promoTop);
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2;
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.3, 0.2), toonMat(snackCols[i]));
    c.position.set(Math.cos(a) * 0.28, 1.15, Math.sin(a) * 0.28);
    promo.add(c);
  }
  promo.position.set(0.9, 0.12, 2.5);
  interior.add(promo);

  // 货架单元（靠墙 + 中间双排）
  function shelfUnit(w = 2.4) {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w, 1.7, 0.5), toonMat(0xcfd6de));
    frame.position.y = 0.85;
    g.add(frame);
    // 层板
    for (let i = 0; i < 3; i++) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(w - 0.08, 0.04, 0.46), toonMat(0xaeb7c2));
      p.position.set(0, 0.35 + i * 0.5, 0.01);
      g.add(p);
    }
    // 商品（彩色小盒阵列）
    const palette = [0xe4572e, 0xf3a712, 0x2e86ab, 0xa23b72, 0x59a14f, 0xe9c46a, 0xf4f1de];
    for (let row = 0; row < 3; row++) {
      const n = 6 + ((row * 3) % 4);
      for (let i = 0; i < n; i++) {
        const bw = 0.22 + ((i * 7 + row * 3) % 3) * 0.05;
        const bh = 0.26 + ((i * 5 + row) % 3) * 0.06;
        const c = palette[(i + row * 2) % palette.length];
        const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.3), toonMat(c));
        b.position.set(-w / 2 + 0.25 + i * ((w - 0.5) / (n - 1)) , 0.35 + row * 0.5 + bh / 2 + 0.03, -0.02);
        g.add(b);
      }
    }
    return g;
  }

  // 靠墙货架（背墙一排）
  const wallShelf1 = shelfUnit(2.6);
  wallShelf1.position.set(-3.0, 0.12, -SD / 2 + 0.75);
  interior.add(wallShelf1);
  const wallShelf2 = shelfUnit(2.6);
  wallShelf2.position.set(-0.2, 0.12, -SD / 2 + 0.75);
  interior.add(wallShelf2);

  // 中间双排货架（背靠背）
  const midShelfA = shelfUnit(2.8);
  midShelfA.position.set(-2.6, 0.12, -1.6);
  interior.add(midShelfA);
  const midShelfB = shelfUnit(2.8);
  midShelfB.rotation.y = Math.PI;
  midShelfB.position.set(-2.6, 0.12, -0.9);
  interior.add(midShelfB);
  const midShelfC = shelfUnit(2.8);
  midShelfC.position.set(0.6, 0.12, -1.6);
  interior.add(midShelfC);
  const midShelfD = shelfUnit(2.8);
  midShelfD.rotation.y = Math.PI;
  midShelfD.position.set(0.6, 0.12, -0.9);
  interior.add(midShelfD);

  // 饮料冷藏柜（右侧墙，发光玻璃门）
  const fridge = new THREE.Group();
  const fridgeBody = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.1, 0.75), toonMat(0xe8ecf2));
  fridgeBody.position.y = 1.05;
  fridge.add(fridgeBody);
  const fridgeGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 1.7),
    new THREE.MeshBasicMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.45 }),
  );
  fridgeGlass.position.set(0, 1.1, 0.38);
  fridge.add(fridgeGlass);
  // 内部饮料层架与彩色瓶罐
  for (let r = 0; r < 3; r++) {
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.03, 0.5), toonMat(0xc0c8d4));
    shelf.position.set(0, 0.45 + r * 0.55, 0.1);
    fridge.add(shelf);
    for (let i = 0; i < 7; i++) {
      const bc = [0xff5b5b, 0x5bb8ff, 0x7bd86b, 0xffd166, 0xc77bff, 0xff9e6b, 0x63e6e2][i];
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.32, 8), toonMat(bc));
      bottle.position.set(-1.05 + i * 0.35, 0.62 + r * 0.55, 0.1);
      fridge.add(bottle);
    }
  }
  // 顶部冷柜灯箱
  const fridgeTop = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.28, 0.78), new THREE.MeshBasicMaterial({ color: 0xe8f6ff }));
  fridgeTop.position.y = 2.24;
  fridge.add(fridgeTop);
  fridge.position.set(3.4, 0.12, -SD / 2 + 0.8);
  fridge.rotation.y = Math.PI; // 面向店内 +z
  interior.add(fridge);

  // 收银台（右侧近门口）
  const counter = new THREE.Group();
  const cBody = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.0, 0.7), toonMat(0x9fb3c8));
  cBody.position.y = 0.5;
  counter.add(cBody);
  const cTop = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 0.8), toonMat(0x6b7f96));
  cTop.position.y = 1.04;
  counter.add(cTop);
  // 收银机屏
  const till = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.34, 0.06), toonMat(0x33404f));
  till.position.set(-0.5, 1.28, 0);
  counter.add(till);
  const tillScr = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.2), new THREE.MeshBasicMaterial({ color: 0x9fe8ff }));
  tillScr.position.set(-0.5, 1.28, 0.04);
  counter.add(tillScr);
  // 咖啡机（柜台一角）
  const coffee = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.55, 0.4), toonMat(0x39424f));
  coffee.position.set(0.75, 1.36, 0);
  counter.add(coffee);
  const coffeeLight = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.06), new THREE.MeshBasicMaterial({ color: 0xffd479 }));
  coffeeLight.position.set(0.75, 1.45, 0.21);
  counter.add(coffeeLight);
  counter.position.set(2.4, 0.12, 1.9);
  counter.rotation.y = Math.PI;
  interior.add(counter);

  // 关东煮柜台（收银台旁，带玻璃罩与暖光）
  const oden = new THREE.Group();
  const odenBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 0.55), toonMat(0xc9a86b));
  odenBase.position.y = 0.45;
  oden.add(odenBase);
  const odenGlass = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.5, 0.45),
    new THREE.MeshBasicMaterial({ color: 0xffe3a1, transparent: true, opacity: 0.35 }),
  );
  odenGlass.position.y = 1.15;
  oden.add(odenGlass);
  // 锅内分隔
  for (let i = -1; i <= 1; i++) {
    const cell = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.12, 0.4), toonMat(0x8a6a3f));
    cell.position.set(i * 0.36, 0.95, 0);
    oden.add(cell);
  }
  const odenGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xffc46b, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  odenGlow.position.set(0, 1.15, 0.26);
  oden.add(odenGlow);
  oden.position.set(0.6, 0.12, 1.9);
  oden.rotation.y = Math.PI;
  interior.add(oden);

  // 杂志架 / 宣传海报立牌（左侧墙）
  const mag = new THREE.Group();
  const magBody = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 0.28), toonMat(0xd7dde6));
  magBody.position.y = 0.8;
  mag.add(magBody);
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(0.4, 0.55),
      new THREE.MeshBasicMaterial({ color: [0xff8fa3, 0x8fd3ff, 0xffe08f][i] }),
    );
    m.position.set(-0.45 + i * 0.45, 1.05, 0.15);
    mag.add(m);
  }
  mag.position.set(-3.9, 0.12, 1.8);
  mag.rotation.y = Math.PI / 2;
  interior.add(mag);

  // 便当 / 饭团冷柜（左侧中段）
  const bento = new THREE.Group();
  const bentoBody = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.95, 0.6), toonMat(0xeef1f5));
  bentoBody.position.y = 0.48;
  bento.add(bentoBody);
  const bentoTop = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.35, 0.5),
    new THREE.MeshBasicMaterial({ color: 0xdff3ff, transparent: true, opacity: 0.5 }),
  );
  bentoTop.position.y = 1.1;
  bento.add(bentoTop);
  // 便当盒
  for (let i = 0; i < 5; i++) {
    const bx = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.36), toonMat([0xff9e6b, 0x7bd86b, 0xf4f1de, 0xff8fa3, 0x9fb3c8][i]));
    bx.position.set(-0.6 + i * 0.3, 1.02, 0);
    bento.add(bx);
  }
  bento.position.set(-3.9, 0.12, 0.2);
  bento.rotation.y = Math.PI / 2;
  interior.add(bento);

  // 立式冰柜（左后角）
  const freezer = new THREE.Group();
  const fzBody = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.9, 0.7), toonMat(0xdde5ee));
  fzBody.position.y = 0.95;
  freezer.add(fzBody);
  const fzGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.4), new THREE.MeshBasicMaterial({ color: 0xcfefff, transparent: true, opacity: 0.4 }));
  fzGlass.position.set(0, 1.0, 0.36);
  freezer.add(fzGlass);
  freezer.position.set(-3.9, 0.12, -2.6);
  freezer.rotation.y = Math.PI / 2;
  interior.add(freezer);

  // 储物柜 / 后场门（背墙右侧）
  const backDoor = new THREE.Mesh(new THREE.BoxGeometry(0.95, 2.1, 0.08), toonMat(0x8fa0b5));
  backDoor.position.set(3.6, 1.05, -SD / 2 + 0.2);
  interior.add(backDoor);
  const lockers = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const lk = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.7, 0.35), toonMat(0xaab6c4));
    lk.position.set(i * 0.44 - 0.44, 0.85, 0);
    lockers.add(lk);
    const lv = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.02), new THREE.MeshBasicMaterial({ color: 0x7d8a99 }));
    lv.position.set(i * 0.44 - 0.44, 1.4, 0.19);
    lockers.add(lv);
  }
  lockers.position.set(2.4, 0.12, -SD / 2 + 0.35);
  interior.add(lockers);

  // 店内地面导视（发光导向线）
  const guideMat = new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.55 });
  for (let i = 0; i < 4; i++) {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 0.9), guideMat);
    g.rotation.x = -Math.PI / 2;
    g.rotation.z = Math.PI / 4;
    g.position.set(-1.2 + i * 0.7, 0.13, 0.6);
    interior.add(g);
  }

  // 店内灯箱（墙上两块发光海报）
  const lb1 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.5), new THREE.MeshBasicMaterial({ color: 0xfff0c8 }));
  lb1.position.set(-1.5, 2.1, -SD / 2 + 0.32);
  interior.add(lb1);
  const lb2 = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.3), new THREE.MeshBasicMaterial({ color: 0xffd9e0 }));
  lb2.position.set(1.2, 2.05, -SD / 2 + 0.32);
  interior.add(lb2);
  animated.lightboxMats.push(lb1.material, lb2.material);

  // 店内暖光
  const innerLight = new THREE.PointLight(0xffd9a0, 55, 16, 1.8);
  innerLight.position.set(0, SH - 0.6, 0.6);
  innerLight.castShadow = false;
  store.add(innerLight);
  const innerLight2 = new THREE.PointLight(0xffe4b8, 30, 12, 1.8);
  innerLight2.position.set(-2.8, SH - 0.6, -2.0);
  store.add(innerLight2);
  // 透过玻璃洒出的暖光面
  const spill = new THREE.Mesh(
    new THREE.PlaneGeometry(6.5, 3.2),
    new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  spill.rotation.x = -Math.PI / 2;
  spill.position.set(0.4, 0.135, frontZ + 1.5);
  store.add(spill);
  animated.interiorGlow = spill.material;
  // 店内第三盏补光，让中岛货架更亮
  const innerLight3 = new THREE.PointLight(0xfff0c8, 22, 9, 1.8);
  innerLight3.position.set(0, 3.0, 1.2);
  store.add(innerLight3);

  /* ---------- 街道道具 ---------- */

  // 自动贩卖机（店右侧，临街）
  const vending = new THREE.Group();
  const vBody = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.9, 0.7), toonMat(0xd33f3f));
  vBody.position.y = 0.95;
  vending.add(outline(vBody, 1.05));
  const vFront = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 1.1), new THREE.MeshBasicMaterial({ color: 0xfff3e0 }));
  vFront.position.set(0, 1.15, 0.36);
  vending.add(vFront);
  // 饮料陈列格
  for (let r = 0; r < 2; r++) {
    for (let i = 0; i < 4; i++) {
      const bc = new THREE.Mesh(
        new THREE.PlaneGeometry(0.14, 0.3),
        new THREE.MeshBasicMaterial({ color: [0x5bb8ff, 0xffd166, 0x7bd86b, 0xff8fa3][i] }),
      );
      bc.position.set(-0.28 + i * 0.19, 0.85 + r * 0.5, 0.37);
      vending.add(bc);
    }
  }
  const vGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.9, 1.15),
    new THREE.MeshBasicMaterial({ color: 0xffe9c0, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  vGlow.position.set(0, 1.15, 0.4);
  vending.add(vGlow);
  animated.vendingGlow = vGlow.material;
  vending.position.set(3.6, 0.13, 4.9);
  vending.rotation.y = Math.PI; // 面向街道南侧
  root.add(vending);

  // 自行车（店左侧靠墙）
  const bike = new THREE.Group();
  const wheelG = new THREE.TorusGeometry(0.34, 0.045, 8, 20);
  const wheelM = toonMat(0x2b2f38);
  const w1 = new THREE.Mesh(wheelG, wheelM);
  const w2 = new THREE.Mesh(wheelG, wheelM);
  w1.position.set(-0.55, 0.34, 0);
  w2.position.set(0.55, 0.34, 0);
  bike.add(w1, w2);
  const frame1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.0, 6), toonMat(0x4a90d9));
  frame1.rotation.z = Math.PI / 2.4;
  frame1.position.set(0, 0.55, 0);
  bike.add(frame1);
  const frame2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.7, 6), toonMat(0x4a90d9));
  frame2.rotation.z = -Math.PI / 3;
  frame2.position.set(0.3, 0.55, 0);
  bike.add(frame2);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 6), toonMat(0x2b2f38));
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0.6, 0.95, 0);
  bike.add(handle);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.12), toonMat(0x2b2f38));
  seat.position.set(-0.15, 0.92, 0);
  bike.add(seat);
  bike.position.set(-5.4, 0.13, 4.6);
  bike.rotation.y = Math.PI / 2 + 0.15;
  root.add(bike);

  // 雨伞架（门口左侧）
  const ustand = new THREE.Group();
  const uBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.5, 10), toonMat(0x6b7a8c));
  uBase.position.y = 0.25;
  ustand.add(uBase);
  const uCols = [0x4a90d9, 0xe4572e, 0x59a14f];
  for (let i = 0; i < 3; i++) {
    const um = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.85, 6), toonMat(uCols[i]));
    const a = (i / 3) * Math.PI * 2;
    um.position.set(Math.cos(a) * 0.1, 0.55, Math.sin(a) * 0.1);
    um.rotation.z = 0.12 * (i - 1);
    ustand.add(um);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 6), toonMat(uCols[i]));
    tip.position.set(Math.cos(a) * 0.1 - Math.sin(0.12 * (i - 1)) * 0.4, 0.95, Math.sin(a) * 0.1);
    tip.rotation.z = 0.12 * (i - 1);
    ustand.add(tip);
  }
  ustand.position.set(-1.3, 0.13, 5.0);
  root.add(ustand);

  // 垃圾桶
  const bin = new THREE.Group();
  const binB = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.26, 0.7, 10), toonMat(0x8a94a6));
  binB.position.y = 0.35;
  bin.add(outline(binB, 1.06));
  const binTop = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.08, 10), toonMat(0x5b6572));
  binTop.position.y = 0.72;
  bin.add(binTop);
  bin.position.set(3.0, 0.13, 5.4);
  root.add(bin);

  // 路灯（街角东南角）
  const lamp = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 4.6, 8), toonMat(0x3c4350));
  pole.position.y = 2.3;
  lamp.add(pole);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.1, 6), toonMat(0x3c4350));
  arm.rotation.z = Math.PI / 2;
  arm.position.set(-0.5, 4.55, 0);
  lamp.add(arm);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.22, 8), toonMat(0x2c313c));
  head.position.set(-1.0, 4.5, 0);
  lamp.add(head);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), new THREE.MeshBasicMaterial({ color: 0xfff2b8 }));
  bulb.position.set(-1.0, 4.38, 0);
  lamp.add(bulb);
  const lampGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.55, 12, 12),
    new THREE.MeshBasicMaterial({ color: 0xffe9a8, transparent: true, opacity: 0.28, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  lampGlow.position.set(-1.0, 4.35, 0);
  lamp.add(lampGlow);
  animated.streetlampGlow = lampGlow.material;
  const lampLight = new THREE.PointLight(0xffe9b0, 26, 12, 1.9);
  lampLight.position.set(-1.0, 4.3, 0);
  lamp.add(lampLight);
  lamp.position.set(6.9, 0.13, 6.9);
  lamp.rotation.y = Math.PI / 2;
  root.add(lamp);

  // 电线杆（北侧人行道）+ 电线
  const util = new THREE.Group();
  const uPole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 6.0, 8), toonMat(0x5a5248));
  uPole.position.y = 3.0;
  util.add(uPole);
  const cross1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 0.08), toonMat(0x5a5248));
  cross1.position.y = 5.6;
  util.add(cross1);
  const cross2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.08), toonMat(0x5a5248));
  cross2.position.y = 5.2;
  util.add(cross2);
  const trans = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 8), toonMat(0x6d675f));
  trans.position.set(0.3, 4.8, 0);
  util.add(trans);
  util.position.set(-6.8, 0.13, -5.5);
  root.add(util);

  // 第二根电线杆（东侧）
  const util2 = new THREE.Group();
  const uPole2 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 5.6, 8), toonMat(0x5a5248));
  uPole2.position.y = 2.8;
  util2.add(uPole2);
  const cross3 = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.08), toonMat(0x5a5248));
  cross3.position.y = 5.3;
  util2.add(cross3);
  util2.position.set(6.9, 0.13, -6.5);
  root.add(util2);

  // 电线（样条曲线 sag）
  function wire(x1, y1, z1, x2, y2, z2, sag = 0.5) {
    const mid = new THREE.Vector3((x1 + x2) / 2, Math.min(y1, y2) - sag, (z1 + z2) / 2);
    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(x1, y1, z1), mid, new THREE.Vector3(x2, y2, z2));
    const geo = new THREE.TubeGeometry(curve, 24, 0.022, 5, false);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x0e0a12 }));
    return m;
  }
  // 杆间主电线（两条）
  root.add(wire(-6.8, 5.6, -5.5, 6.9, 5.3, -6.5, 0.7));
  root.add(wire(-6.8, 5.2, -5.5, 6.9, 4.9, -6.5, 0.55));
  // 杆到店的支线
  root.add(wire(-6.8, 5.4, -5.5, SX - 3, SH + 0.3, SZ - 2, 0.4));
  root.add(wire(6.9, 5.1, -6.5, 6.9, 4.9, -6.5, 0.01)); // 短垂线装饰

  // 路牌（路口）
  const sign = new THREE.Group();
  const sPole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 2.6, 6), toonMat(0x707a88));
  sPole.position.y = 1.3;
  sign.add(sPole);
  const sBoard = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.04), toonMat(0x2f6fb3));
  sBoard.position.y = 2.3;
  sign.add(sBoard);
  const sTex = canvasTex(128, 80, (ctx, w, h) => {
    ctx.fillStyle = "#2f6fb3";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#fff";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("一番町", w / 2, h / 2);
  });
  const sFace = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.5), new THREE.MeshBasicMaterial({ map: sTex }));
  sFace.position.set(0, 2.3, 0.025);
  sign.add(sFace);
  sign.position.set(6.2, 0.13, 6.6);
  sign.rotation.y = Math.PI / 4;
  root.add(sign);

  // 街角护栏（转角弧形）
  const rail = new THREE.Group();
  const railMat = toonMat(0xd8b43c);
  for (let i = 0; i < 5; i++) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.75, 6), railMat);
    const a = Math.PI * 0.15 + (i / 4) * Math.PI * 0.5;
    post.position.set(7.4 - Math.cos(a) * 2.3, 0.4, 7.4 - Math.sin(a) * 2.3);
    rail.add(post);
  }
  const railTop = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.05, 6, 16, Math.PI * 0.5), railMat);
  railTop.rotation.x = -Math.PI / 2;
  railTop.rotation.z = Math.PI * 0.15;
  railTop.position.set(7.4, 0.78, 7.4);
  rail.add(railTop);
  root.add(rail);

  // 停车位（店前人行道边的自行车/摩托车位划线）
  const parkMat = new THREE.MeshBasicMaterial({ color: 0xdfe4ea, transparent: true, opacity: 0.7 });
  for (let i = 0; i < 3; i++) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.06, 1.2), parkMat);
    line.rotation.x = -Math.PI / 2;
    line.position.set(-6.3 + i * 0.7, 0.135, 6.3);
    root.add(line);
    const lineS = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.06), parkMat);
    lineS.rotation.x = -Math.PI / 2;
    lineS.position.set(-6.3 + i * 0.7, 0.135, 5.72);
    root.add(lineS);
  }

  // 小巷入口（店左侧与建筑后侧的窄缝，用暗墙与道具暗示）
  const alley = new THREE.Group();
  // 小巷两侧墙
  const alleyW1 = box(0.25, 3.2, 4.5, 0x8a8274, -6.8, 1.6, -4.0, { flat: true });
  alley.add(alleyW1);
  const alleyW2 = box(0.25, 3.0, 4.5, 0x7b7364, -5.2, 1.5, -4.0, { flat: true });
  alley.add(alleyW2);
  // 巷内地面
  const alleyFloor = box(1.4, 0.1, 4.5, 0x3c4048, -6.0, 0.05, -4.0, { flat: true });
  alley.add(alleyFloor);
  // 巷子深处堆放的纸箱与杂物
  alley.add(box(0.5, 0.4, 0.5, 0x9a8468, -6.0, 0.32, -5.6, { flat: true }));
  alley.add(box(0.4, 0.3, 0.4, 0xb09a78, -5.9, 0.3, -5.0, { flat: true }));
  alley.add(box(0.35, 0.7, 0.35, 0x5b6572, -6.2, 0.45, -3.2, { flat: true }));
  // 巷口一盏昏黄小灯
  const alleyLamp = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }));
  alleyLamp.position.set(-6.0, 2.4, -2.2);
  alley.add(alleyLamp);
  const alleyGlow = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffc98a, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthWrite: false }),
  );
  alleyGlow.position.copy(alleyLamp.position);
  alley.add(alleyGlow);
  const alleyLight = new THREE.PointLight(0xffc98a, 10, 5, 2);
  alleyLight.position.copy(alleyLamp.position);
  alley.add(alleyLight);
  root.add(alley);

  // 空调外机（店右侧墙外）
  const ac = new THREE.Group();
  const acBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 0.45), toonMat(0xb9c2cc));
  acBody.position.y = 0.85;
  ac.add(outline(acBody, 1.05));
  const acFan = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.05, 12), toonMat(0x77828e));
  acFan.rotation.x = Math.PI / 2;
  acFan.position.set(0, 0.85, 0.24);
  ac.add(acFan);
  const acLegs = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.5, 0.4), toonMat(0x6d7683));
  acLegs.position.y = 0.25;
  ac.add(acLegs);
  ac.position.set(4.9, 0.13, 1.0);
  ac.rotation.y = Math.PI / 2;
  root.add(ac);

  // 公告栏 / 海报栏（店右侧人行道）
  const board = new THREE.Group();
  const bdFrame = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.6, 0.12), toonMat(0x8a6a4f));
  bdFrame.position.y = 1.2;
  board.add(outline(bdFrame, 1.05));
  const bdLeg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.2, 6), toonMat(0x5b4a3a));
  bdLeg1.position.set(-0.6, 0.6, 0);
  const bdLeg2 = bdLeg1.clone();
  bdLeg2.position.x = 0.6;
  board.add(bdLeg1, bdLeg2);
  const bdFace = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.45), new THREE.MeshBasicMaterial({ color: 0xe8e0cc }));
  bdFace.position.set(0, 1.2, 0.07);
  board.add(bdFace);
  // 贴着的小海报
  const posterCols = [0xff8fa3, 0x8fd3ff, 0xffe08f, 0xb8e6a0];
  for (let i = 0; i < 4; i++) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.42), new THREE.MeshBasicMaterial({ color: posterCols[i] }));
    p.position.set(-0.45 + (i % 2) * 0.6, 1.4 - Math.floor(i / 2) * 0.55, 0.08);
    board.add(p);
  }
  board.position.set(4.6, 0.13, 5.6);
  board.rotation.y = Math.PI;
  root.add(board);

  // 交通信号灯（路口东南）
  const traffic = new THREE.Group();
  const tPole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 3.4, 6), toonMat(0x3c4350));
  tPole.position.y = 1.7;
  traffic.add(tPole);
  const tArm = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.4, 6), toonMat(0x3c4350));
  tArm.rotation.z = Math.PI / 2;
  tArm.position.set(-0.65, 3.3, 0);
  traffic.add(tArm);
  const tHead = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.0, 0.24), toonMat(0x2b2f38));
  tHead.position.set(-1.3, 3.2, 0);
  traffic.add(tHead);
  function lampDot(color, dy) {
    const m = new THREE.Mesh(new THREE.CircleGeometry(0.11, 10), new THREE.MeshBasicMaterial({ color }));
    m.position.set(-1.3, 3.2 + dy, 0.13);
    return m;
  }
  const tRed = lampDot(0x661818, 0.28);
  const tYellow = lampDot(0x66500f, 0.0);
  const tGreen = lampDot(0x1a5c28, -0.28);
  traffic.add(tRed, tYellow, tGreen);
  animated.trafficRed = tRed;
  animated.trafficYellow = tYellow;
  animated.trafficGreen = tGreen;
  traffic.position.set(7.0, 0.13, 4.6);
  traffic.rotation.y = Math.PI / 2;
  root.add(traffic);

  /* ---------- 湿润路面与积水 ---------- */
  // 路面整体反光薄膜（暗蓝湿面）
  const wetMat = new THREE.MeshStandardMaterial({
    color: 0x1a2130,
    roughness: 0.18,
    metalness: 0.55,
    transparent: true,
    opacity: 0.5,
  });
  const wetH = new THREE.Mesh(new THREE.PlaneGeometry(BASE, 2.6), wetMat);
  wetH.rotation.x = -Math.PI / 2;
  wetH.position.set(0, 0.065, 8.7);
  root.add(wetH);
  const wetV = new THREE.Mesh(new THREE.PlaneGeometry(2.6, BASE), wetMat.clone());
  wetV.rotation.x = -Math.PI / 2;
  wetV.position.set(8.7, 0.065, 0);
  root.add(wetV);
  animated.wetPatches.push(wetH, wetV);

  // 积水洼（浅色圆形反光 + 动画波纹）
  const puddleMat = new THREE.MeshStandardMaterial({
    color: 0x2a3752,
    roughness: 0.05,
    metalness: 0.7,
    transparent: true,
    opacity: 0.6,
  });
  function puddle(x, z, r) {
    const g = new THREE.Group();
    const m = new THREE.Mesh(new THREE.CircleGeometry(r, 20), puddleMat.clone());
    m.rotation.x = -Math.PI / 2;
    m.position.set(x, 0.075, z);
    g.add(m);
    // 静态高光
    const hi = new THREE.Mesh(
      new THREE.CircleGeometry(r * 0.55, 14),
      new THREE.MeshBasicMaterial({ color: 0x8fb6d9, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false }),
    );
    hi.rotation.x = -Math.PI / 2;
    hi.position.set(x - r * 0.2, 0.078, z + r * 0.15);
    g.add(hi);
    // 扩散波纹环（动画）
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(r * 0.3, r * 0.36, 24),
      new THREE.MeshBasicMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, 0.082, z);
    g.add(ring);
    root.add(g);
    animated.puddles.push({ ring, r, phase: Math.random() * Math.PI * 2 });
  }
  puddle(-2.0, 8.6, 0.9);
  puddle(2.6, 9.0, 0.65);
  puddle(6.0, 8.3, 0.5);
  puddle(8.8, 2.0, 0.8);
  puddle(8.5, -3.0, 0.55);
  puddle(-5.5, 6.5, 0.7); // 人行道上的积水
  puddle(0.5, 5.2, 0.45);

  /* ---------- 降雨系统 ---------- */
  const RAIN_COUNT = 900;
  const rainGeo = new THREE.BufferGeometry();
  const rainPos = new Float32Array(RAIN_COUNT * 2 * 3);
  const rainData = [];
  for (let i = 0; i < RAIN_COUNT; i++) {
    const x = (Math.random() - 0.5) * (BASE + 4);
    const y = Math.random() * 14 + 1;
    const z = (Math.random() - 0.5) * (BASE + 4);
    const len = 0.45 + Math.random() * 0.35;
    const speed = 9 + Math.random() * 5;
    rainData.push({ x, y, z, len, speed });
  }
  rainGeo.setAttribute("position", new THREE.BufferAttribute(rainPos, 3));
  const rainMat = new THREE.LineBasicMaterial({
    color: 0x9fc2e8,
    transparent: true,
    opacity: 0.42,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  rainLines.frustumCulled = false;
  root.add(rainLines);
  animated.rain = { geo: rainGeo, data: rainData, pos: rainPos };

  // 雨滴溅落的小水花环（地面上随机位置，周期性扩散）
  const SPLASH_COUNT = 60;
  const splashGeo = new THREE.RingGeometry(0.02, 0.05, 8);
  const splashMat = new THREE.MeshBasicMaterial({
    color: 0xbfe0ff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const splashes = new THREE.InstancedMesh(splashGeo, splashMat, SPLASH_COUNT);
  const splashData = [];
  const dummy = new THREE.Object3D();
  for (let i = 0; i < SPLASH_COUNT; i++) {
    splashData.push({
      x: (Math.random() - 0.5) * BASE * 0.95,
      z: (Math.random() - 0.5) * BASE * 0.95,
      t: Math.random(),
      speed: 0.8 + Math.random() * 1.4,
    });
    dummy.position.set(0, -10, 0);
    dummy.updateMatrix();
    splashes.setMatrixAt(i, dummy.matrix);
  }
  splashes.rotation.x = 0;
  root.add(splashes);
  animated.splashes = { mesh: splashes, data: splashData };

  /* ---------- 屋檐滴水 ---------- */
  const dripCount = 36;
  const dripGeo = new THREE.SphereGeometry(0.03, 6, 6);
  const dripMat = new THREE.MeshBasicMaterial({ color: 0xcfe8ff, transparent: true, opacity: 0.85 });
  const drips = new THREE.InstancedMesh(dripGeo, dripMat, dripCount);
  const dripData = [];
  for (let i = 0; i < dripCount; i++) {
    // 沿店雨棚前沿的 x 分布
    const x = SX - (SW + 0.6) / 2 + Math.random() * (SW + 0.6);
    dripData.push({
      x,
      z: SZ + frontZ + 1.36,
      y0: SH + 0.05,
      t: Math.random(),
      speed: 1.6 + Math.random() * 1.6,
    });
    dummy.position.set(0, -10, 0);
    dummy.updateMatrix();
    drips.setMatrixAt(i, dummy.matrix);
  }
  root.add(drips);
  animated.dripMesh = { mesh: drips, data: dripData };

  /* ---------- 玻璃雨水滑痕 ---------- */
  // 每条滑痕：一条细亮片沿玻璃缓慢下滑
  const streakMat = new THREE.MeshBasicMaterial({
    color: 0xdff1ff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const streakGeo = new THREE.PlaneGeometry(0.02, 0.35);
  const STREAK_COUNT = 18;
  const streaks = new THREE.InstancedMesh(streakGeo, streakMat, STREAK_COUNT);
  const streakData = [];
  for (let i = 0; i < STREAK_COUNT; i++) {
    streakData.push({
      x: SX - SW / 2 + 0.4 + Math.random() * (SW - 0.8),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.4,
      len: 0.2 + Math.random() * 0.4,
    });
    dummy.position.set(0, -10, 0);
    dummy.updateMatrix();
    streaks.setMatrixAt(i, dummy.matrix);
  }
  root.add(streaks);
  animated.streakMesh = { mesh: streaks, data: streakData };

  /* ---------- 灯光 ---------- */
  const ambient = new THREE.AmbientLight(0x33415e, 0.85);
  root.add(ambient);
  const moon = new THREE.DirectionalLight(0x7f95c4, 0.5);
  moon.position.set(-8, 14, -6);
  moon.castShadow = true;
  moon.shadow.mapSize.set(1024, 1024);
  moon.shadow.camera.left = -14;
  moon.shadow.camera.right = 14;
  moon.shadow.camera.top = 14;
  moon.shadow.camera.bottom = -14;
  root.add(moon);

  // 路口偏蓝的夜环境补光
  const fill = new THREE.DirectionalLight(0x4a5f8c, 0.25);
  fill.position.set(8, 10, 10);
  root.add(fill);

  /* ---------- update ---------- */
  const dummy2 = new THREE.Object3D();

  function update(t, dt) {
    // 雨：更新每条线的两端
    const pos = animated.rain.pos;
    const data = animated.rain.data;
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      d.y -= d.speed * dt;
      if (d.y < 0) {
        d.y = 13 + Math.random() * 3;
        d.x = (Math.random() - 0.5) * (BASE + 4);
        d.z = (Math.random() - 0.5) * (BASE + 4);
      }
      const j = i * 6;
      pos[j] = d.x;
      pos[j + 1] = d.y;
      pos[j + 2] = d.z;
      pos[j + 3] = d.x;
      pos[j + 4] = d.y + d.len;
      pos[j + 5] = d.z;
    }
    animated.rain.geo.attributes.position.needsUpdate = true;

    // 溅落水花
    const sm = animated.splashes;
    for (let i = 0; i < sm.data.length; i++) {
      const s = sm.data[i];
      s.t += dt * s.speed;
      if (s.t > 1) {
        s.t = 0;
        s.x = (Math.random() - 0.5) * BASE * 0.95;
        s.z = (Math.random() - 0.5) * BASE * 0.95;
      }
      const k = s.t;
      dummy2.position.set(s.x, 0.08, s.z);
      dummy2.scale.setScalar(0.3 + k * 1.6);
      dummy2.rotation.x = -Math.PI / 2;
      dummy2.updateMatrix();
      sm.mesh.setMatrixAt(i, dummy2.matrix);
    }
    sm.mesh.instanceMatrix.needsUpdate = true;
    sm.mesh.material.opacity = 0.4;

    // 屋檐滴水
    const dm = animated.dripMesh;
    for (let i = 0; i < dm.data.length; i++) {
      const d = dm.data[i];
      d.t += dt * d.speed;
      const cycle = 1.4;
      if (d.t > cycle) d.t = 0;
      const k = d.t / cycle;
      dummy2.position.set(d.x, d.y0 - k * (d.y0 - 0.1), d.z);
      const sc = 0.6 + k * 0.9;
      dummy2.scale.set(sc, sc * 1.6, sc);
      dummy2.rotation.set(0, 0, 0);
      dummy2.updateMatrix();
      dm.mesh.setMatrixAt(i, dummy2.matrix);
    }
    dm.mesh.instanceMatrix.needsUpdate = true;

    // 玻璃雨水滑痕
    const smesh = animated.streakMesh;
    for (let i = 0; i < smesh.data.length; i++) {
      const s = smesh.data[i];
      s.t += dt * s.speed;
      const cycle = 2.2;
      if (s.t > cycle) s.t = 0;
      const k = s.t / cycle;
      const glassTop = 0.13 + SH - fasciaH - 0.25;
      dummy2.position.set(s.x, glassTop - k * (glassTop - 0.4), SZ + frontZ - 0.03);
      dummy2.scale.set(1, s.len * 4, 1);
      dummy2.rotation.set(0, 0, 0);
      dummy2.updateMatrix();
      smesh.mesh.setMatrixAt(i, dummy2.matrix);
    }
    smesh.mesh.instanceMatrix.needsUpdate = true;

    // 积水波纹（环扩散 + 淡入淡出）
    for (const p of animated.puddles) {
      const k = (t * 0.6 + p.phase) % 1;
      const r = p.r * (0.3 + k * 0.75);
      p.ring.scale.setScalar(r / 0.34); // ring base outer r=0.36r
      p.ring.material.opacity = 0.4 * (1 - k);
    }

    // 招牌/灯箱闪烁（低频微闪）
    const flicker = 0.94 + Math.sin(t * 30) * 0.02 * (Math.sin(t * 0.7) > 0.9 ? 1 : 0) + Math.sin(t * 2.2) * 0.02;
    animated.signMat.opacity = 0.22 + 0.1 * flicker;
    animated.lightboxMats.forEach((m, i) => {
      const f = 0.92 + Math.sin(t * 3.1 + i * 1.7) * 0.06;
      m.color.setScalar ? null : null;
      m.opacity = 1; // MeshBasicMaterial 保持不透明，用颜色亮度闪烁
      m.color.setHex(i === 0 ? 0xfff0c8 : 0xffd9e0);
      m.color.multiplyScalar(f);
    });
    if (animated.vendingGlow) animated.vendingGlow.opacity = 0.3 + Math.sin(t * 2.7) * 0.05;
    if (animated.streetlampGlow) animated.streetlampGlow.opacity = 0.24 + Math.sin(t * 1.9) * 0.05;
    if (animated.interiorGlow) animated.interiorGlow.opacity = 0.13 + Math.sin(t * 1.3) * 0.03;

    // 湿路面微光呼吸
    animated.wetPatches.forEach((w, i) => {
      w.material.opacity = 0.42 + Math.sin(t * 1.2 + i * 2.1) * 0.08;
    });

    // 斑马线反光微动
    if (animated.crosswalk) {
      animated.crosswalk.children.forEach((p, i) => {
        p.material.emissive.setScalar(0.08 + Math.sin(t * 1.6 + i) * 0.04);
      });
    }

    // 自动门：周期开合（open 1.6s → hold 1.4s → close 1.6s → idle 4.5s）
    const cycle = 9.1;
    const ct = t % cycle;
    let k = 0; // 0 closed, 1 open
    if (ct < 1.6) k = ct / 1.6;
    else if (ct < 3.0) k = 1;
    else if (ct < 4.6) k = 1 - (ct - 3.0) / 1.6;
    else k = 0;
    const ease = k * k * (3 - 2 * k);
    const slide = animated.doorBaseX.w * 0.92;
    animated.doorL.position.x = animated.doorBaseX.l - ease * slide;
    animated.doorR.position.x = animated.doorBaseX.r + ease * slide;

    // 交通灯循环（绿 8s → 黄 1.5s → 红 9s → 绿）
    const tc = t % 18.5;
    let rC = 0x661818, yC = 0x66500f, gC = 0x1a5c28;
    if (tc < 8) gC = 0x3fdc66;
    else if (tc < 9.5) yC = 0xffd23f;
    else rC = 0xff4d4d;
    animated.trafficRed.material.color.setHex(rC);
    animated.trafficYellow.material.color.setHex(yC);
    animated.trafficGreen.material.color.setHex(gC);
  }

  return { root, update };
}
