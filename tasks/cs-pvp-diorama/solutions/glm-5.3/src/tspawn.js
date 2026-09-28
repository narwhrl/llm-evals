// T 阵营出生点 — north loading dock: barbed-wire fence, ramp down to mid,
// box truck west, three-stacked containers east with the high peek spot.
import * as THREE from 'three';
import { box, decal, ladder, put, rnd } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

export function buildTSpawn(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'tspawn';

  // Raised loading dock.
  box(26, 1.35, 8, M.concrete, { y: 0.675, z: -26, parent: g });
  box(26.2, 0.22, 8.2, M.concreteDark, { y: 1.34, z: -25.9, parent: g, cast: false });
  // dock lip wear
  box(26, 0.06, 0.3, M.steelDark, { y: 1.31, z: -22.1, parent: g, cast: false });

  // Ramp from dock down to mid (wedge via rotated slab).
  const rampLen = Math.hypot(6, 1.35);
  const ramp = box(8, 0.28, rampLen, M.concreteDark, { y: 0.675, z: -19 });
  ramp.rotation.x = Math.atan2(1.35, 6);
  g.add(ramp);
  // ramp side retaining walls
  box(0.35, 1.5, 6.3, M.concreteDark, { x: -4.35, y: 0.7, z: -19, parent: g });
  box(0.35, 1.5, 6.3, M.concreteDark, { x: 4.35, y: 0.7, z: -19, parent: g });
  // 破损洞口 — crawl hole in the west retaining wall watching the junction.
  box(1.0, 0.75, 0.5, M.darkInside, { x: -4.35, y: 0.55, z: -16.4, parent: g, cast: false });
  box(1.2, 0.12, 0.55, M.concreteDark, { x: -4.35, y: 0.95, z: -16.4, parent: g, cast: false });

  // Chain-link fence with barbed wire around the dock (gaps: ramp center, west gate).
  const fw = (len, x, z, ry) => {
    const f = P.fenceSpan(len);
    put(f, x, 1.35, z, ry);
    g.add(f);
  };
  fw(9, -13, -21.95, Math.PI / 2);  // front west of ramp (x -13..-4)
  fw(9, 4, -21.95, Math.PI / 2);    // front east of ramp (x 4..13)
  fw(5, -13.05, -27, 0);            // west side, gate gap z -29.5..-27
  fw(8, 13.05, -29.9, 0);          // east side, z -29.9..-21.9
  fw(26, -13, -29.9, Math.PI / 2);  // north boundary fence behind spawn

  // West steps down from the dock.
  for (let i = 0; i < 4; i++) {
    box(1.4, 0.34 * (i + 1), 0.36, M.concreteDark, { x: -12.6, y: (0.34 * (i + 1)) / 2, z: -27.5 + i * 0.36, parent: g });
  }

  // 破旧厢式货运卡车 (west, beside the dock).
  const truck = P.boxTruck({ len: 5.6 });
  put(truck, -19.5, 0, -26, 0.12);
  g.add(truck);
  ctx.drips.push(new THREE.Vector3(-18.2, 2.95, -26), new THREE.Vector3(-20.8, 2.95, -26));

  // 木梯 leaning against the trailer.
  const lad = ladder(0.9, 3.4, M.woodDark, { x: 0, y: 0, z: 0 });
  lad.position.set(-16.6, 0, -24.2);
  lad.rotation.set(0, Math.PI / 2, 0.42);
  g.add(lad);

  // 三层堆叠海运集装箱 — two ground units with a walkable gap + one bridging on top.
  const c1 = P.container({ len: 6, code: 'CSLU 482-61' });
  put(c1, 17, 0, -26, Math.PI / 2);
  const c2 = P.container({ len: 6, code: 'TCLU 907-33' });
  put(c2, 24.1, 0, -26.1, Math.PI / 2);
  const c3 = P.container({ len: 6, code: 'GCLU 118-04' });
  put(c3, 20.5, 2.6, -25.6, Math.PI / 2);
  g.add(c1, c2, c3);
  ctx.drips.push(new THREE.Vector3(19.6, 5.25, -26), new THREE.Vector3(21.4, 5.25, -26), new THREE.Vector3(23.4, 2.62, -26.5));
  const c4 = P.container({ len: 6, code: 'CSLU 511-77' });
  put(c4, 26.6, 0, -26.4, 0.15);
  g.add(c4);
  decal(T.graffitiTexture('cs1337'), 1.8, 1.8, { x: 26.0, y: 1.5, z: -22.62, parent: g, opacity: 0.85 });
  decal(T.codeStencil('HANDLE CARE', { size: 34 }), 2.2, 0.55, { x: -19.5, y: 2.6, z: -23.16, parent: g });

  // 四连装油桶堆 + pallets flanking the ramp.
  const bq = P.barrelQuad();
  put(bq, 6.4, 0, -20.2, 0.3);
  g.add(bq);
  const pal = P.pallet();
  put(pal, -7.2, 0, -19.6, 0.1);
  g.add(pal);
  const pal2 = P.palletLean();
  put(pal2, 7.8, 0, -18.4, 1.2);
  g.add(pal2);

  // A few loose crates on the dock.
  const cr = P.woodCrate({ w: 1.2, h: 1.0, d: 1.2 });
  put(cr, -10.5, 1.35, -28.5, 0.2);
  g.add(cr);
  const cr2 = P.crateStack({ cols: 2, rows: 1, base: 1.1 });
  put(cr2, 10.8, 1.35, -28.2, -0.15);
  g.add(cr2);

  // Route hint painted at the ramp foot.
  decal(T.arrowTexture('A', 'left'), 1.6, 1.6, { x: -5.6, y: 0.05, z: -16.5, rx: -Math.PI / 2, ry: 0, parent: g });

  scene.add(g);
  return g;
}
