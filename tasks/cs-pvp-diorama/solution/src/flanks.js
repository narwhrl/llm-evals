// 侧翼路线 — left flank: the west back-alley (dumpsters, graffiti tenement
// wall, flickering wall lamp); right flank: the elevated east freight walkway
// with stairs both ends; plus the overhead pole-and-wire network.
import * as THREE from 'three';
import { box, cyl, decal, noOutline, put, rnd, wire } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

function alleyWall(g, ctx) {
  // West boundary tenement wall x=-29.7, z -6..14, h4.
  const t = 0.6;
  box(t, 4.0, 20, M.concreteWall, { x: -29.7, y: 2.0, z: 4, parent: g });
  // dark windows with sills
  for (const wz of [-2, 2.5, 7, 11.5]) {
    box(0.35, 1.3, 1.2, M.darkInside, { x: -29.5, y: 2.4, z: wz, parent: g, cast: false });
    box(0.5, 0.09, 1.5, M.concreteDark, { x: -29.45, y: 1.72, z: wz, parent: g, cast: false });
  }
  // graffiti pieces + faded stencil
  decal(T.graffitiTexture('skull'), 2.0, 2.0, { x: -29.36, y: 1.9, z: -3.6, ry: Math.PI / 2, parent: g, opacity: 0.85 });
  decal(T.graffitiTexture('cs1337'), 2.4, 2.4, { x: -29.36, y: 2.0, z: 9.2, ry: Math.PI / 2, parent: g, opacity: 0.8 });
  decal(T.codeStencil('ALLEY 3', { size: 44 }), 2.4, 0.7, { x: -29.36, y: 1.1, z: 4.6, ry: Math.PI / 2, parent: g });
  // flickering cold wall lamp
  box(0.3, 0.18, 0.5, M.steelDark, { x: -29.3, y: 3.1, z: 6, parent: g, cast: false });
  const lamp = box(0.24, 0.05, 0.4, M.coldGlow, { x: -29.24, y: 3.0, z: 6, parent: g, cast: false, recv: false });
  ctx.alleyLamp = lamp;
  ctx.drips.push(new THREE.Vector3(-29.4, 3.0, 5.6));
  // downspout
  const ds = P.downspout(4.2); put(ds, -29.35, 0, 13.6, 0); g.add(ds);
}

function westAlley(g, ctx) {
  alleyWall(g, ctx);
  // alley floor props
  const d1 = P.dumpster({ w: 2.4 }); put(d1, -27.9, 0, -2.2, 0.06); g.add(d1);
  const d2 = P.trashBin(); put(d2, -27.6, 0, 0.8, 0.2); g.add(d2);
  const ts = P.tireStack({ n: 4 }); put(ts, -28.0, 0, 7.8, 0); g.add(ts);
  const lt = P.leaningTire(); put(lt, -27.2, 0, 10.6, 1.2); g.add(lt);
  const cr = P.crateStack({ cols: 2, rows: 2, base: 1.2 }); put(cr, -27.6, 0, 12.9, 0.3); g.add(cr);
  const bc = P.barrel(); put(bc, -26.9, 0, 3.6, 0); g.add(bc);
  const j1 = P.jerseyBarrier({ len: 2.0 }); put(j1, -27.4, 0, 15.6, 0.4); g.add(j1);
}

function eastWalkway(g, ctx) {
  const y = 2.7;
  // deck
  box(5.4, 0.24, 32, M.steelDark, { x: 26.7, y: y - 0.12, z: -4, parent: g });
  box(5.4, 0.06, 32, M.corrGray, { x: 26.7, y: y + 0.03, z: -4, parent: g, cast: false });
  // columns
  for (const cz of [-20, -12, -4, 4, 12]) {
    for (const cx of [24.6, 28.8]) {
      box(0.28, y, 0.28, M.steel, { x: cx, y: y / 2, z: cz, parent: g });
    }
    // cross brace
    box(0.08, 0.08, 8.4, M.steel, { x: 24.6, y: y * 0.45, z: cz - 4, rz: 0.62, parent: g, cast: false });
  }
  // railings both edges + ends
  for (const rx of [24.2, 29.2]) {
    for (let i = 0; i < 12; i++) box(0.06, 1.0, 0.06, M.steelDark, { x: rx, y: y + 0.5, z: -20 + i * (32 / 11), parent: g, cast: false });
    box(0.05, 0.07, 32, M.steelDark, { x: rx, y: y + 1.0, z: -4, parent: g, cast: false });
    box(0.05, 0.07, 32, M.steelDark, { x: rx, y: y + 0.55, z: -4, parent: g, cast: false });
  }
  // north stairs (ground at z -24.4 up to deck z -20)
  for (let i = 0; i < 8; i++) {
    box(3.0, 0.34, 0.55, M.steelDark, { x: 26.7, y: 0.02 + i * 0.335, z: -24.1 + i * 0.55, parent: g });
  }
  // south stairs (deck z 12 down to ground z 16)
  for (let i = 0; i < 8; i++) {
    box(3.0, 0.34, 0.55, M.steelDark, { x: 26.7, y: 0.02 + i * 0.335, z: 15.9 - i * 0.55, parent: g });
  }
  // grime + props on deck
  const pk = P.pallet(); put(pk, 28.4, y, -2.5, 0.2); g.add(pk);
  const bk = P.barrel(); put(bk, 24.8, y, 6.4, 0); g.add(bk);
  decal(T.codeStencil('WALK 02', { size: 38 }), 3.2, 0.8, { x: 24.3, y: y + 0.35, z: -8, ry: Math.PI / 2, parent: g });
  // under-walkway yard props
  const uc = P.cardboardPile(); put(uc, 25.8, 0, 5.8, -0.4); g.add(uc);
  const ub = P.barrelQuad(); put(ub, 27.6, 0, -6.5, 0.3); g.add(ub);
  ctx.drips.push(new THREE.Vector3(25.2, y + 0.05, -10), new THREE.Vector3(28.2, y + 0.05, 2));
}

function wires(g) {
  const mat = noOutline(new THREE.MeshBasicMaterial({ color: 0x10131a, fog: true }));
  // poles: NW wood, NE wood, W concrete, SE wood, plus wall-top stubs at mid.
  const p1 = P.wirePole({ h: 9, kind: 'wood' }); put(p1, -28.4, 0, -26.4, 0); g.add(p1);
  const p2 = P.wirePole({ h: 9, kind: 'wood' }); put(p2, 27.6, 0, -27.4, 0); g.add(p2);
  const p3 = P.wirePole({ h: 9, kind: 'concrete' }); put(p3, -28.6, 0, 16.4, 0); g.add(p3);
  const p4 = P.wirePole({ h: 9, kind: 'wood' }); put(p4, 28.4, 0, 15.4, 0); g.add(p4);
  const a1 = new THREE.Vector3(-28.4, 8.2, -26.4);
  const a2 = new THREE.Vector3(27.6, 8.2, -27.4);
  const a3 = new THREE.Vector3(-28.6, 8.2, 16.4);
  const a4 = new THREE.Vector3(28.4, 8.2, 15.4);
  // spans across the diorama
  wire(a1, a2, mat, { sag: 1.1, parent: g });
  wire(new THREE.Vector3(a1.x, 7.6, a1.z), new THREE.Vector3(a2.x, 7.6, a2.z), mat, { sag: 1.5, parent: g });
  wire(a1, a3, mat, { sag: 1.2, parent: g });
  wire(a2, a4, mat, { sag: 1.2, parent: g });
  wire(a3, a4, mat, { sag: 1.1, parent: g });
  // drops toward buildings
  wire(new THREE.Vector3(a1.x, 7.9, a1.z), new THREE.Vector3(-24, 5.6, -22.4), mat, { sag: 0.5, parent: g });
  wire(new THREE.Vector3(a4.x, 7.9, a4.z), new THREE.Vector3(21.6, 5.8, -20), mat, { sag: 0.6, parent: g });
  // small service poles at mid wall tops with a taut span over the doors
  cyl(0.06, 0.07, 1.4, M.woodDark, { x: -5.2, y: 5.1, z: -15.6, parent: g, cast: false });
  cyl(0.06, 0.07, 1.4, M.woodDark, { x: 5.2, y: 5.1, z: 11.6, parent: g, cast: false });
  wire(new THREE.Vector3(-5.2, 5.7, -15.6), new THREE.Vector3(5.2, 5.7, 11.6), mat, { sag: 0.7, parent: g });
}

export function buildFlanks(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'flanks';
  westAlley(g, ctx);
  eastWalkway(g, ctx);
  wires(g);

  // scaffold tower at the mid east slit (inside B connector niche)
  const sc = P.scaffoldTower({ h: 3.6 });
  put(sc, 6.9, 0, 2.2, Math.PI / 2);
  g.add(sc);
  // crate beside the west A-corridor slit access
  const cs = P.crateStack({ cols: 1, rows: 2, base: 1.1 });
  put(cs, -6.9, 0, -8, 0.2);
  g.add(cs);

  // shortcut corridor dressing (B corner -> CT east route)
  const sg = P.roadSign('noentry'); put(sg, 12.6, 0, 6.2, 2.4); sg.rotation.z = 0.08; g.add(sg);
  const pk = P.palletLean(); put(pk, 11.6, 0, 9.5, -1.3); g.add(pk);
  const j = P.jerseyBarrier({ len: 2.0 }); put(j, 10.8, 0, 12.4, 0.5); g.add(j);

  scene.add(g);
  return g;
}
