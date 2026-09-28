// CT 阵营出生点 — south police cordon: barrier line with riot shields,
// police van with alternating beacon, elevated concrete platform with
// searchlight, emblem wall with equipment crates.
import * as THREE from 'three';
import { box, cyl, decal, noOutline, put, rnd } from './utils.js';
import { M } from './materials.js';
import * as T from './textures.js';
import * as P from './props.js';

export function buildCTSpawn(scene, ctx) {
  const g = new THREE.Group();
  g.name = 'ctspawn';

  // 封闭围墙 — back wall with emblem + slogan.
  box(58, 3.8, 0.6, M.concreteWall, { y: 1.9, z: 29.6, parent: g });
  box(58.6, 0.3, 0.9, M.concreteDark, { y: 3.95, z: 29.6, parent: g, cast: false });
  decal(T.policeEmblemTexture(), 2.2, 2.8, { x: 0, y: 2.0, z: 29.28, parent: g });
  decal(T.signTexture(['POLICE LINE', 'KEEP OUT'], { w: 384, h: 128, size: 40 }), 3.4, 1.1, { x: 7.5, y: 2.1, z: 29.28, parent: g });
  decal(T.codeStencil('SECTOR 01', { size: 44 }), 2.6, 0.7, { x: -8, y: 1.4, z: 29.28, parent: g });
  // wall lamps
  for (const lx of [-14, 14]) {
    box(0.5, 0.16, 0.3, M.steelDark, { x: lx, y: 3.2, z: 29.2, parent: g, cast: false });
    box(0.4, 0.06, 0.22, M.coldGlow, { x: lx, y: 3.1, z: 29.15, parent: g, cast: false, recv: false });
  }
  ctx.drips.push(new THREE.Vector3(-10, 3.6, 29.3), new THREE.Vector3(12, 3.6, 29.3));

  // 拒马路障 + 警盾防御阵型 across the cordon.
  for (let i = 0; i < 5; i++) {
    const b = P.plasticBarrier();
    put(b, -11.5 + i * 4.6, 0, 18.6, rnd(-0.08, 0.08));
    g.add(b);
  }
  for (let i = 0; i < 3; i++) {
    const s = P.riotShield();
    put(s, -9.4 + i * 5.2, 0, 18.1, rnd(-0.4, 0.4));
    g.add(s);
  }
  const j1 = P.jerseyBarrier({ len: 2.4 }); put(j1, 11.2, 0, 18.9, 0.15); g.add(j1);

  // 警用面包车 with roof beacon.
  const van = P.policeVan({ len: 5.0 });
  put(van, -19.5, 0, 24.5, 0.08);
  g.add(van);
  ctx.beacons = van.userData.beacons;
  ctx.drips.push(new THREE.Vector3(-18.4, 2.55, 22.4), new THREE.Vector3(-20.6, 2.55, 22.4));

  // 混凝土高台 — elevated platform with outdoor stairs.
  box(13, 2.4, 10, M.concrete, { x: 19.5, y: 1.2, z: 24.5, parent: g });
  box(13.4, 0.2, 10.4, M.concreteDark, { x: 19.5, y: 2.45, z: 24.5, parent: g, cast: false });
  // stairs on the west face (ascending eastward)
  for (let i = 0; i < 8; i++) {
    box(0.34 * (i + 1), 0.32, 3.0, M.concreteDark, { x: 12.6 - i * 0.34, y: 0.16 + i * 0.3, z: 23.4, parent: g });
  }
  // railing along platform west edge
  for (let i = 0; i < 5; i++) {
    box(0.07, 1.0, 0.07, M.steelDark, { x: 13.1, y: 2.95, z: 20.4 + i * 1.9, parent: g, cast: false });
  }
  box(0.08, 0.07, 8.4, M.steelDark, { x: 13.1, y: 3.45, z: 24.2, parent: g, cast: false });

  // 探照灯 — searchlight pedestal + housing (SpotLight in lighting.js).
  cyl(0.09, 0.12, 1.1, M.steelDark, { x: 14.5, y: 2.9, z: 20.2, parent: g });
  const hous = box(0.85, 0.6, 0.7, M.steelDark, { x: 14.5, y: 3.7, z: 20.2, parent: g });
  const lens = cyl(0.3, 0.34, 0.1, M.coldGlow, { rx: Math.PI / 2, x: 14.5, y: 3.7, z: 19.82, parent: g, cast: false, recv: false });
  // visible volumetric cone (aimed each frame by fx)
  const coneGeo = new THREE.ConeGeometry(3.0, 19, 18, 1, true);
  coneGeo.translate(0, -9.5, 0);
  coneGeo.rotateX(-Math.PI / 2);
  const coneMat = noOutline(new THREE.MeshBasicMaterial({
    color: 0xcfe0ff, transparent: true, opacity: 0.075, depthWrite: false,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide, fog: false,
  }));
  const cone = new THREE.Mesh(coneGeo, coneMat);
  cone.position.set(14.5, 3.7, 20.2);
  g.add(cone);
  ctx.searchCone = cone;

  // 备用防弹衣/头盔模型箱 along the back wall.
  const e1 = P.equipCrate('vest'); put(e1, -7.8, 0, 28.2, 0.1); g.add(e1);
  const e2 = P.equipCrate('helmet'); put(e2, -6.1, 0, 28.3, -0.15); g.add(e2);
  const e3 = P.equipCrate('vest'); put(e3, -4.6, 0.8, 28.2, 0.3); g.add(e3); // stacked look

  // Route dressing: west route to mid, east route to B flank.
  const sg = P.roadSign('oneway'); put(sg, 3.2, 0, 16.2, -0.6); sg.rotation.z = -0.12; g.add(sg);
  const ts = P.tireStack({ n: 2 }); put(ts, -12.5, 0, 20.5, 0); g.add(ts);
  const cr = P.crateStack({ cols: 2, rows: 2, base: 1.2 }); put(cr, 26.6, 0, 19.6, 0.5); g.add(cr);
  const dm = P.dumpster({ w: 2.6 }); put(dm, -26.5, 0, 19.8, 0.2); g.add(dm);
  decal(T.arrowTexture('MID', 'left'), 1.7, 1.7, { x: -2.5, y: 0.05, z: 16.8, rx: -Math.PI / 2, ry: Math.PI, parent: g });
  decal(T.codeStencil('CHECKPOINT', { size: 40 }), 2.6, 0.7, { x: 6, y: 1.3, z: 29.28, parent: g });

  scene.add(g);
  return g;
}
