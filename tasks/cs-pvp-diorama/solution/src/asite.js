// A 炸弹安放区 — the big half-open warehouse: half-rolled shutter, boarded
// windows, inward side door, center peek pillar, 5-layer shelves, forklift,
// mezzanine loft with iron ladder, red-lit deep door, exterior service props.
import * as THREE from 'three';
import { box, cyl, decal, ladder, noOutline, put, rnd, bulletHoles } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

// Warehouse footprint x -26..-10, z -22..-8. Walls h5, thickness 0.5.
const X0 = -26, X1 = -10, Z0 = -22, Z1 = -8, H = 5;

function shell(g) {
  const t = 0.5;
  // north wall (z=Z0) full
  box(X1 - X0, H, t, M.concreteWall, { x: (X0 + X1) / 2, y: H / 2, z: Z0, parent: g });
  // west wall
  box(t, H, Z1 - Z0, M.concreteWall, { x: X0, y: H / 2, z: (Z0 + Z1) / 2, parent: g });
  // south wall (z=Z1) with boarded windows at x=-21,-17.5 and side door at x=-14
  const winW = 1.5, winY0 = 2.6, winY1 = 3.5;
  const segs = [[X0, -21.9], [-20.1, -18.4], [-16.6, -15.2], [-12.8, X1]];
  for (const [a, b] of segs) {
    if (b > a) box(b - a, H, t, M.concreteWall, { x: (a + b) / 2, y: H / 2, z: Z1, parent: g });
  }
  for (const wx of [-21, -17.5]) {
    box(winW, winY0, t, M.concreteWall, { x: wx, y: winY0 / 2, z: Z1, parent: g });
    box(winW, H - winY1, t, M.concreteWall, { x: wx, y: (winY1 + H) / 2, z: Z1, parent: g });
    // dark interior + boards
    box(winW - 0.1, winY1 - winY0 - 0.05, 0.2, M.darkInside, { x: wx, y: (winY0 + winY1) / 2, z: Z1, parent: g, cast: false });
    for (let i = 0; i < 3; i++) {
      box(winW + 0.5, 0.26, 0.08, M.woodDark, { x: wx + rnd(-0.08, 0.08), y: 2.75 + i * 0.38, z: Z1 - 0.08, rz: rnd(-0.16, 0.16), parent: g });
    }
  }
  // side door (内开式) at x=-14 — door swung inward
  box(1.3, 2.4, 0.3, M.darkInside, { x: -14, y: 1.2, z: Z1, parent: g, cast: false });
  const dleaf = box(0.06, 2.3, 1.1, M.woodDark, { x: -14.55, y: 1.15, z: Z1 - 0.55, parent: g });
  dleaf.rotation.y = -0.6;
  box(1.6, 0.5, 0.4, M.concreteWall, { x: -14, y: 2.65, z: Z1, parent: g });
  // east wall (x=X1) with roll-door opening z -19..-13 (opening height to y2.0)
  box(t, H, Z0 - Z0 + 3.0, M.concreteWall, { x: X1, y: H / 2, z: -20.5, parent: g }); // z -22..-19
  box(t, H, 3.0, M.concreteWall, { x: X1, y: H / 2, z: -11.5, parent: g }); // z -13..-10
  box(t, H - 3.5, 6, M.concreteWall, { x: X1, y: 3.5 + (H - 3.5) / 2, z: -16, parent: g }); // lintel band above opening
  box(t, H, 3.0, M.concreteWall, { x: X1, y: H / 2, z: -20.5, parent: g }); // z -22..-19
  box(X1 - X0 + 0.6, 0.3, Z1 - Z0 + 0.6, M.concreteDark, { x: (X0 + X1) / 2, y: H + 0.15, z: (Z0 + Z1) / 2, parent: g });
  box(X1 - X0 + 0.6, 0.4, 0.25, M.concreteDark, { x: (X0 + X1) / 2, y: H + 0.5, z: Z0 - 0.1, parent: g, cast: false });
  box(X1 - X0 + 0.6, 0.4, 0.25, M.concreteDark, { x: (X0 + X1) / 2, y: H + 0.5, z: Z1 + 0.1, parent: g, cast: false });
  // roof vents
  for (const [vx, vz] of [[-16, -19], [-22, -12]]) {
    box(0.9, 0.5, 0.9, M.steelDark, { x: vx, y: H + 0.55, z: vz, parent: g });
    cyl(0.16, 0.16, 0.5, M.rustHeavy, { x: vx, y: H + 1.0, z: vz, parent: g, cast: false });
  }
}

function rollDoor(g, ctx) {
  const dg = new THREE.Group();
  // housing drum
  box(0.55, 0.7, 6.4, M.steelDark, { x: X1 - 0.1, y: 3.35, z: -16, parent: dg });
  cyl(0.34, 0.34, 6.2, M.rustHeavy, { rx: Math.PI / 2, x: X1 - 0.1, y: 3.35, z: -16, parent: dg, cast: false });
  // half-unrolled slab: hangs from drum down to y1.5, passable gap below
  const slab = box(0.1, 1.55, 5.9, M.slatDoor, { x: X1 - 0.12, y: 2.32, z: -16, parent: dg });
  // side channels
  box(0.3, 3.4, 0.24, M.steelDark, { x: X1 - 0.1, y: 1.7, z: -13.05, parent: dg });
  box(0.3, 3.4, 0.24, M.steelDark, { x: X1 - 0.1, y: 1.7, z: -18.95, parent: dg });
  decal(T.codeStencil('MAX 3M', { size: 40 }), 1.4, 0.5, { x: X1 - 0.2, y: 2.2, z: -16.9, ry: -Math.PI / 2, parent: dg });
  g.add(dg);
  ctx.shutter = slab;
  ctx.drips.push(new THREE.Vector3(X1 - 0.35, 1.55, -15.2), new THREE.Vector3(X1 - 0.35, 1.55, -17.1));
  // bullet holes across the slab
  const holeMat = noOutline(new THREE.MeshBasicMaterial({ map: T.bulletHoleTexture(), transparent: true, depthWrite: false }));
  const bh = bulletHoles(9, 0.9, null, holeMat, { x: X1 - 0.2, y: 2.4, z: -16.2, ry: -Math.PI / 2 });
  g.add(bh);
}

function loft(g) {
  // NE mezzanine x -13..-10, z -21.5..-18.5, floor y3.4
  box(3.0, 0.2, 3.0, M.woodDark, { x: -11.5, y: 3.3, z: -20, parent: g });
  for (const [px, pz] of [[-12.8, -21.3], [-10.2, -21.3], [-10.2, -18.7]]) {
    box(0.14, 3.3, 0.14, M.steelDark, { x: px, y: 1.65, z: pz, parent: g });
  }
  // railing
  box(3.0, 0.06, 0.06, M.steelDark, { x: -11.5, y: 4.3, z: -18.55, parent: g, cast: false });
  box(3.0, 0.05, 0.05, M.steelDark, { x: -11.5, y: 3.95, z: -18.55, parent: g, cast: false });
  for (let i = 0; i < 4; i++) box(0.05, 0.95, 0.05, M.steelDark, { x: -12.9 + i, y: 3.85, z: -18.55, parent: g, cast: false });
  // vertical iron ladder on the east wall up to the loft
  ladder(0.8, 3.35, M.steelDark, { x: -10.35, y: 0, z: -19.2, ry: Math.PI / 2, parent: g });
  // loft window (overlooks site + main entrance)
  box(1.1, 0.9, 0.3, M.darkInside, { x: -10.3, y: 4.0, z: -20, parent: g, cast: false });
  box(1.3, 0.08, 0.35, M.steelDark, { x: -10.3, y: 3.52, z: -20, parent: g, cast: false });
  // crate + lamp on the loft
  const c = P.woodCrate({ w: 1.0, h: 0.85, d: 1.0 });
  put(c, -12.2, 3.4, -20.9, 0.3);
  g.add(c);
}

function interior(g, ctx) {
  // 承重柱 — the classic peek pillar.
  box(0.85, H, 0.85, M.concreteDark, { x: -18, y: H / 2, z: -15, parent: g });
  // 五层重型货架 along the west wall.
  const sh = P.shelfUnit({ w: 3.4, h: 2.7, layers: 5 });
  put(sh, -24.6, 0, -17.5, Math.PI / 2);
  g.add(sh);
  const sh2 = P.shelfUnit({ w: 2.6, h: 2.2, layers: 4 });
  put(sh2, -24.6, 0, -11.5, Math.PI / 2);
  g.add(sh2);
  // 手动叉车.
  const fl = P.forklift();
  put(fl, -13.8, 0, -17.6, 0.7);
  g.add(fl);
  // 木箱堆 + 麻袋包 near the site.
  const cs = P.crateStack({ cols: 2, rows: 2, base: 1.25 });
  put(cs, -21.5, 0, -11.8, 0.25);
  g.add(cs);
  const cs2 = P.crateStack({ cols: 1, rows: 2, base: 1.3 });
  put(cs2, -15.8, 0, -18.9, -0.2);
  g.add(cs2);
  const sk = P.sackPile({ n: 5 });
  put(sk, -20.8, 0, -19.2, 0.4);
  g.add(sk);
  const sk2 = P.sackPile({ n: 3 });
  put(sk2, -14.8, 0, -10.5, 1.1);
  g.add(sk2);
  // 分拣台 + 破损快递箱.
  const tb = P.desk();
  put(tb, -23.5, 0, -20.8, 0.15);
  g.add(tb);
  const cb = P.cardboardPile();
  put(cb, -21.9, 0, -20.9, 0.8);
  g.add(cb);
  // floor litter: packaging straps + old newspaper
  decal(T.newspaperTexture(), 0.9, 0.65, { x: -16.5, y: 0.012, z: -13.2, rx: -Math.PI / 2, ry: 0.6, parent: g });
  decal(T.newspaperTexture(), 0.8, 0.6, { x: -19.6, y: 0.012, z: -12.1, rx: -Math.PI / 2, ry: -0.4, parent: g });
  // cold emergency ceiling lamps (fixtures; light sources live in lighting.js)
  for (const [lx, lz] of [[-14.5, -12.5], [-21.5, -18]]) {
    box(1.4, 0.12, 0.3, M.steelDark, { x: lx, y: 4.55, z: lz, parent: g, cast: false });
    box(1.2, 0.06, 0.22, M.coldGlow, { x: lx, y: 4.47, z: lz, parent: g, cast: false, recv: false });
  }
  // 深处后场门半掩 — faint red light through the seam.
  box(1.5, 2.6, 0.3, M.darkInside, { x: -12.5, y: 1.3, z: Z0 + 0.3, parent: g, cast: false });
  const leaf = box(0.06, 2.5, 1.3, M.steelDark, { x: -13.15, y: 1.25, z: Z0 + 0.75, parent: g });
  leaf.rotation.y = 0.75;
  const seam = box(0.06, 2.2, 0.3, M.redGlow, { x: -12.5, y: 1.3, z: Z0 + 0.5, parent: g, cast: false, recv: false });
  ctx.redSeam = seam;
  ctx.steams.push(new THREE.Vector3(-16, H + 1.1, -19), new THREE.Vector3(-22, H + 1.1, -12));
}

export function buildASite(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'asite';

  shell(g);
  rollDoor(g, ctx);
  loft(g);
  interior(g, ctx);

  // Bomb site A paint.
  const sm = T.siteMarkTexture('A');
  const paint = decal(sm, 9, 9, { x: -17.5, y: 0.013, z: -14.5, rx: -Math.PI / 2, ry: 0.06, parent: g });
  // Route arrow in the A connector.
  decal(T.arrowTexture('A', 'right'), 1.5, 1.5, { x: -8, y: 0.05, z: -14, rx: -Math.PI / 2, ry: -Math.PI / 2, parent: g });

  // Exterior service props on the east wall.
  const ac1 = P.acUnit(); put(ac1, -9.4, 0, -10.6, 0.1); g.add(ac1);
  const ac2 = P.acUnit(); put(ac2, -9.4, 0, -9.2, -0.15); g.add(ac2);
  const tb1 = P.trashBin(); put(tb1, -9.3, 0, -12.4, 0); g.add(tb1);
  const tb2 = P.trashBin(); put(tb2, -9.3, 0, -13.4, 0.2); g.add(tb2);
  decal(T.signTexture(['CARGO BAY 4'], { w: 320, h: 96 }), 1.8, 0.55, { x: -9.7, y: 2.6, z: -12.9, ry: Math.PI / 2, parent: g });
  // downspouts on outer corners
  const ds1 = P.downspout(5.2); put(ds1, -26.3, 0, -8.3, 0); g.add(ds1);
  const ds2 = P.downspout(5.2); put(ds2, -26.3, 0, -21.7, 0); g.add(ds2);
  const ds3 = P.downspout(5.2); put(ds3, -9.7, 0, -21.7, 0); g.add(ds3);
  ctx.drips.push(new THREE.Vector3(-26.3, 0.4, -8.3), new THREE.Vector3(-26.3, 0.4, -21.7), new THREE.Vector3(-9.7, 0.4, -21.7));

  // 狭窄通道 — low wall forming the south passage toward the west alley.
  box(6.4, 1.15, 0.4, M.concreteDark, { x: -23, y: 0.575, z: -5.6, parent: g });
  const pal3 = P.palletLean(); put(pal3, -25.2, 0, -5.0, -1.4); g.add(pal3);
  const tir = P.tireStack({ n: 3 }); put(tir, -20.6, 0, -4.9, 0); g.add(tir);

  // Wall art: faded freight stencil + faction spray.
  decal(T.codeStencil('DANGER 4.5T', { size: 44, w: 320, h: 80 }), 2.8, 0.7, { x: -18, y: 3.6, z: Z1 + 0.28, parent: g });
  decal(T.graffitiTexture('tFaction'), 2.6, 2.6, { x: -22.6, y: 2.2, z: Z1 + 0.28, parent: g, opacity: 0.8 });
  decal(T.graffitiTexture('glhf'), 2.0, 2.0, { x: -18, y: 1.9, z: Z0 - 0.28, ry: Math.PI, parent: g, opacity: 0.7 });

  scene.add(g);
  return g;
}
