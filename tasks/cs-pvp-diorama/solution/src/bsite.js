// B 炸弹安放区 — back-alley bomb site: two-storey tin guard house (ground
// floor enterable with warm fluorescent, first floor with fire-escape balcony),
// outdoor plaza with improvised cover, corner street lamp, shortcut low wall.
import * as THREE from 'three';
import { box, cyl, decal, ladder, noOutline, put, railing, rnd, bulletHoles } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

// House footprint x 18.5..23.5, z -23..-11.
const X0 = 18.5, X1 = 23.5, Z0 = -23, Z1 = -11;
const H1 = 3.0;   // ground floor
const H2 = 2.4;   // upper floor walls
const Y2 = H1;    // upper floor base

function tinHouse(g, ctx) {
  const t = 0.35;
  const tin = M.corrGray;
  const tin2 = M.corrRust;
  // ground floor shell: window band on south face, doors west+east
  box(X1 - X0, H1, t, tin2, { x: (X0 + X1) / 2, y: H1 / 2, z: Z0, parent: g }); // north
  box(t, H1, Z1 - Z0, tin, { x: X0, y: H1 / 2, z: (Z0 + Z1) / 2, parent: g }); // west
  box(t, H1, Z1 - Z0, tin, { x: X1, y: H1 / 2, z: (Z0 + Z1) / 2, parent: g }); // east
  // south face: full-width window + door jamb side
  box(1.2, H1, t, tin2, { x: X0 + 0.6, y: H1 / 2, z: Z1, parent: g });
  box(2.6, 0.8, t, tin2, { x: 22.2, y: 0.4, z: Z1, parent: g }); // below window
  box(2.6, H1 - 2.1, t, tin2, { x: 22.2, y: 2.1 + (H1 - 2.1) / 2, z: Z1, parent: g }); // above window
  box(2.7, 0.1, 0.45, M.steelDark, { x: 22.2, y: 2.1, z: Z1, parent: g, cast: false });
  // rain-streaked window glass (lit from inside)
  const win = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25), noOutline(new THREE.MeshToonMaterial({
    map: T.glassTexture(), transparent: true, opacity: 0.55, depthWrite: false,
    emissive: 0x664d20, emissiveIntensity: 0.6,
  })));
  win.position.set(22.2, 1.45, Z1 - 0.05);
  g.add(win);
  box(0.06, 1.3, 0.06, M.steelDark, { x: 22.2, y: 1.45, z: Z1 - 0.02, parent: g, cast: false });
  box(2.6, 0.06, 0.06, M.steelDark, { x: 22.2, y: 1.45, z: Z1 - 0.02, parent: g, cast: false });
  // doors: west (front, toward plaza) + east (back)
  box(1.0, 2.2, 0.3, M.darkInside, { x: X0 + 0.3, y: 1.1, z: -13.2, parent: g, cast: false });
  const dw = box(0.07, 2.1, 0.95, M.slatDoor, { x: X0 - 0.4, y: 1.05, z: -13.2, parent: g });
  dw.rotation.y = 0.5;
  box(0.9, 2.2, 0.3, M.darkInside, { x: X1 - 0.3, y: 1.1, z: -20.6, parent: g, cast: false });
  const de = box(0.07, 2.1, 0.9, M.slatDoor, { x: X1 + 0.4, y: 1.05, z: -20.6, parent: g });
  de.rotation.y = -0.65;
  // ground floor slab roof
  box(X1 - X0 + 0.5, 0.22, Z1 - Z0 + 0.5, M.corrRust, { x: (X0 + X1) / 2, y: H1 + 0.11, z: (Z0 + Z1) / 2, parent: g });

  // upper floor (smaller, x 19.5..23.5, z -23..-17)
  box(4.0, H2, t, tin, { x: 21.5, y: Y2 + H2 / 2, z: Z0, parent: g });
  box(t, H2, 6.0, tin2, { x: X1, y: Y2 + H2 / 2, z: -20, parent: g });
  box(t, H2, 6.0, tin, { x: 19.5, y: Y2 + H2 / 2, z: -20, parent: g });
  box(4.0, H2, t, tin, { x: 21.5, y: Y2 + H2 / 2, z: -17, parent: g });
  // upper windows facing the plaza (dark)
  for (const wz of [-21.5, -19.5]) {
    box(0.7, 0.9, 0.3, M.darkInside, { x: 19.4, y: Y2 + 1.4, z: wz, parent: g, cast: false });
    box(0.9, 0.07, 0.4, M.steelDark, { x: 19.4, y: Y2 + 0.92, z: wz, parent: g, cast: false });
  }
  box(4.5, 0.24, 6.5, M.corrRust, { x: 21.6, y: Y2 + H2 + 0.12, z: -20, parent: g }); // 2F roof
  // antenna pipe
  cyl(0.04, 0.04, 1.6, M.steelDark, { x: 23, y: Y2 + H2 + 1.0, z: -22.2, parent: g, cast: false });
  // roof vent (steam source)
  box(0.7, 0.4, 0.7, M.steelDark, { x: 21, y: Y2 + H2 + 0.42, z: -19, parent: g });
  ctx.steams.push(new THREE.Vector3(21, Y2 + H2 + 0.9, -19));

  // 阳台 — balcony on the upper west face overlooking the site.
  box(1.6, 0.14, 3.2, M.woodDark, { x: 18.1, y: Y2 + 0.07, z: -19, parent: g });
  railing(M.steelDark, { len: 3.2, h: 0.95, x: 17.35, y: Y2 + 0.14, z: -20.6, ry: Math.PI / 2, parent: g });
  railing(M.steelDark, { len: 1.5, h: 0.95, x: 17.85, y: Y2 + 0.14, z: -17.4, parent: g });
  // 消防梯 — fire escape: flight + landing + flight to the balcony.
  const s1 = box(1.5, 0.1, 3.4, M.steelDark, { x: 16.6, y: 1.55, z: -15.6, rx: 0.42, parent: g });
  for (let i = 0; i < 7; i++) {
    box(1.4, 0.06, 0.5, M.steelDark, { x: 16.6, y: 0.35 + i * 0.21, z: -14.3 - i * 0.44, parent: g, cast: false });
  }
  box(1.6, 0.12, 1.6, M.steelDark, { x: 16.9, y: 1.6, z: -16.8, parent: g }); // landing
  for (let i = 0; i < 7; i++) {
    box(1.4, 0.06, 0.5, M.steelDark, { x: 17.5 + i * 0.12, y: 1.7 + i * 0.21, z: -17.4 + i * 0.18, ry: Math.PI / 2, parent: g, cast: false });
  }
  ctx.drips.push(new THREE.Vector3(18.1, Y2 + 0.2, -17.6), new THREE.Vector3(19, H1 + 0.25, Z1 + 0.2));

  // ------- interior (ground floor guard room, seen through window/doors) ----
  const dk = P.desk(); put(dk, 21.6, 0, -12.2, -0.2); g.add(dk);
  const ch = P.officeChairOverturned(); put(ch, 20.4, 0, -12.8, 2.4); g.add(ch);
  const lk = P.officeLocker(); put(lk, 22.9, 0, -22.2, Math.PI / 2); g.add(lk);
  // desk litter: old radio + coffee cans
  box(0.34, 0.2, 0.14, M.steelDark, { x: 21.2, y: 0.92, z: -12.1, parent: g, cast: false });
  cyl(0.07, 0.07, 0.16, M.steel, { x: 22.1, y: 0.88, z: -12.4, parent: g, cast: false });
  cyl(0.07, 0.07, 0.16, M.steel, { x: 22.3, y: 0.88, z: -12.15, parent: g, cast: false });
  decal(T.newspaperTexture(), 0.8, 0.6, { x: 20.6, y: 0.012, z: -14.2, rx: -Math.PI / 2, ry: 0.9, parent: g });
  // 墙上旧值班表
  decal(T.rosterTexture(), 0.7, 0.9, { x: 21, y: 1.8, z: Z0 + 0.25, ry: 0, parent: g });
  // 破损日光灯 hanging at an angle — flicker target for fx.
  const tube = box(1.3, 0.07, 0.09, M.warmGlow, { x: 21.4, y: 2.55, z: -15.5, ry: 0.25, rz: 0.1, parent: g, cast: false, recv: false });
  const fixture = box(1.45, 0.1, 0.16, M.steelDark, { x: 21.42, y: 2.62, z: -15.5, ry: 0.25, rz: 0.1, parent: g, cast: false });
  ctx.fluoroTube = tube;

  // Bullet holes near the window.
  const holeMat = noOutline(new THREE.MeshBasicMaterial({ map: T.bulletHoleTexture(), transparent: true, depthWrite: false }));
  g.add(bulletHoles(6, 0.4, null, holeMat, { x: 21.2, y: 2.4, z: Z1 + 0.2, ry: 0 }));
}

export function buildBSite(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'bsite';

  tinHouse(g, ctx);

  // Bomb site B paint on the open ground before the house.
  decal(T.siteMarkTexture('B'), 8, 8, { x: 11.5, y: 0.013, z: -10, rx: -Math.PI / 2, ry: -0.08, parent: g });
  decal(T.arrowTexture('B', 'right'), 1.5, 1.5, { x: 6.8, y: 0.05, z: -2.2, rx: -Math.PI / 2, ry: -Math.PI / 2, parent: g });

  // Improvised cover ring: pallets, bins, bicycle, overturned iron furniture.
  const p1 = P.pallet(); put(p1, 8.6, 0, -14.2, 0.3); g.add(p1);
  const p2 = P.palletLean(); put(p2, 8.9, 0, -15.8, 0.8); g.add(p2);
  const p3 = P.pallet(); put(p3, 15.4, 0, -16.8, -0.2); g.add(p3);
  const b1 = P.trashBin(); put(b1, 16.3, 0, -17.6, 0); g.add(b1);
  const b2 = P.trashBin(); put(b2, 9.6, 0, -6.4, 0.3); g.add(b2);
  const bc = P.bicycle(); put(bc, 16.6, 0, -6.6, 0.7); g.add(bc);
  const ir = P.ironSet(); put(ir, 9.2, 0, -12.6, 0.5); g.add(ir);
  const j1 = P.jerseyBarrier({ len: 2.2 }); put(j1, 13.6, 0, -4.4, 0.2); g.add(j1);
  const j2 = P.jerseyBarrier({ len: 2.2 }); put(j2, 16.8, 0, -4.9, -0.3); g.add(j2);
  const cb = P.cardboardPile(); put(cb, 15.9, 0, -14.4, 0.9); g.add(cb);
  const ts = P.tireStack({ n: 3 }); put(ts, 17.6, 0, -9.6, 0); g.add(ts);
  const cr = P.crateStack({ cols: 2, rows: 1, base: 1.15 }); put(cr, 6.9, 0, -16.8, 0.4); g.add(cr);

  // 老式路灯 at the plaza corner (light source in lighting.js).
  const lp = P.lampPost({ h: 4.0 });
  put(lp, 8.2, 0, -4.0, Math.PI); // head arm reaches +z local -> rotated to -z? head toward plaza center
  lp.rotation.y = Math.PI * 0.82;
  g.add(lp);
  ctx.drips.push(new THREE.Vector3(8.2, 3.9, -3.3));

  // 转角矮墙 — corner low wall with the shortcut gap toward CT.
  box(3.2, 1.25, 0.5, M.concreteDark, { x: 10.8, y: 0.625, z: 0.4, parent: g });
  box(0.5, 1.25, 2.6, M.concreteDark, { x: 9.4, y: 0.625, z: 1.9, parent: g });
  decal(T.graffitiTexture('rushB'), 2.4, 2.4, { x: 10.8, y: 0.62, z: 0.68, parent: g, opacity: 0.85 });

  // Graffiti + codes on the house.
  decal(T.graffitiTexture('ctFaction'), 2.4, 2.4, { x: 22.2, y: 1.7, z: Z1 + 0.22, parent: g, opacity: 0.9 });
  decal(T.codeStencil('GATE 02', { size: 40 }), 2.0, 0.55, { x: X1 + 0.2, y: 2.0, z: -14.5, ry: Math.PI / 2, parent: g });
  decal(T.codeStencil('GATE 02', { size: 40 }), 2.0, 0.55, { x: 21.5, y: 2.4, z: Z0 - 0.2, ry: Math.PI, parent: g });

  scene.add(g);
  return g;
}
