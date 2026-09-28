import * as THREE from 'three';
import { COLORS, LIGHT_COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import { concreteTexture, paintTexture, badgeTexture } from '../textures.js';
import { box, plane, card, group, addBulletHoleCluster } from './helpers.js';
import {
  jerseyBarrier, concreteBarrier, graffitiCard, bulletMat, crateStack, tire, glowSprite,
} from './props.js';

// CT spawn: south警用封锁区 — barricade line, police van, elevated platform
// with searchlight, badge wall, two forward routes (left→mid, right→B flank).
export function buildCTSpawn(ctx) {
  const { group: g, rng } = ctx;
  const wallMat = toonMap(concreteTexture('#7d838a', 'ctw'), {});
  wallMat.map.repeat.set(5, 1);
  const trim = toon(COLORS.steelDark);

  // ---- Rear wall with police badge + warning band (z = 28.6) ----
  g.add(box(40, 3.5, 0.5, wallMat, 0, 1.75, 28.6));
  g.add(box(40.6, 0.2, 0.7, toon(COLORS.concreteDark), 0, 3.55, 28.6));
  g.add(card(2.4, 2.4, new THREE.MeshBasicMaterial({ map: badgeTexture(), transparent: true }), 0, 1.9, 28.33, 0, Math.PI));
  // warning band
  g.add(box(40, 0.34, 0.04, toon(COLORS.warnYellow), 0, 3.15, 28.32));
  for (let x = -19; x <= 19; x += 2) {
    g.add(box(0.9, 0.34, 0.05, toon(0x14161a), x, 3.15, 28.31));
  }
  g.add(graffitiCard('警戒区域', '#e8ecf2', 5.5, 1.1, -8, 2.0, 28.33, Math.PI));
  addBulletHoleCluster(g, bulletMat(), 8, 1.5, 28.33, Math.PI, 4, rng);

  // ---- Forward defense line (z ≈ 16.5): barricades + police shields ----
  g.add(jerseyBarrier(-5.5, 16.6, 0.04));
  g.add(jerseyBarrier(-3.0, 16.5, -0.06));
  g.add(jerseyBarrier(2.0, 16.6, 0.05));
  g.add(jerseyBarrier(4.5, 16.5, -0.03));
  g.add(concreteBarrier(-8.5, 16.4, 0.15));
  g.add(concreteBarrier(6.8, 16.6, -0.1));
  // plastic barricades
  const orange = toon(COLORS.barricadeOrange);
  const white = toon(COLORS.plasticWhite);
  for (const [bx, bz, m] of [[-10.5, 16.8, orange], [-0.8, 16.4, white], [8.8, 16.9, orange]]) {
    g.add(box(1.8, 0.9, 0.5, m, bx, 0.45, bz, 0.05));
    g.add(box(1.9, 0.2, 0.55, m, bx, 1.0, bz, 0.05));
  }
  // police shields leaning on the line
  const shieldMat = toon(0xdfe4ea);
  const stripeMat = toon(COLORS.policeBlue);
  for (const [sx, sz, ry] of [[-4.2, 16.1, 0.12], [0.6, 16.0, -0.1], [3.4, 16.15, 0.05]]) {
    const sh = group();
    sh.add(box(0.55, 1.05, 0.1, shieldMat, 0, 0.52, 0));
    sh.add(box(0.55, 0.2, 0.12, stripeMat, 0, 0.72, 0));
    sh.add(box(0.5, 0.12, 0.14, trim, 0, 0.05, 0));
    sh.position.set(sx, 0, sz);
    sh.rotation.x = -0.22; // leaning back against the barricade
    sh.rotation.y = ry;
    g.add(sh);
  }

  // ---- Police van (west side), roof strobes alternating ----
  const van = group();
  const vanBody = toonMap(paintTexture('#d8dce2', { key: 'van' }), {});
  van.add(box(5.2, 1.6, 2.2, vanBody, 0, 1.3, 0)); // main body
  van.add(box(1.6, 1.1, 2.1, vanBody, 3.2, 1.05, 0)); // hood (faces +x / east)
  van.add(box(1.2, 0.7, 1.9, toon(0x141a24), 3.3, 1.7, 0)); // windshield band
  van.add(box(5.2, 0.4, 2.24, toon(COLORS.policeBlue), 0, 1.1, 0)); // blue stripe
  van.add(box(5.6, 0.4, 2.0, toon(COLORS.steelDark), 0.4, 0.55, 0)); // chassis
  const wheelM = toon(COLORS.tire);
  for (const [wx, wz] of [[-1.6, -1.05], [-1.6, 1.05], [2.6, -1.05], [2.6, 1.05]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.32, 12), wheelM);
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.5, wz);
    w.castShadow = true;
    van.add(w);
  }
  // roof light bar
  van.add(box(1.3, 0.12, 0.5, trim, 0.2, 2.16, 0));
  const redLens = box(0.55, 0.16, 0.44, new THREE.MeshBasicMaterial({ color: COLORS.policeRed }), -0.15, 2.28, 0);
  const blueLens = box(0.55, 0.16, 0.44, new THREE.MeshBasicMaterial({ color: COLORS.policeBlueLight }), 0.55, 2.28, 0);
  van.add(redLens, blueLens);
  van.position.set(-10.5, 0, 21.5);
  van.rotation.y = -0.15;
  g.add(van);
  const strobeRed = new THREE.PointLight(LIGHT_COLORS.strobeRed, 0, 10, 2);
  strobeRed.position.set(-10.7, 2.6, 21.5);
  const strobeBlue = new THREE.PointLight(LIGHT_COLORS.strobeBlue, 0, 10, 2);
  strobeBlue.position.set(-10.0, 2.6, 21.5);
  g.add(strobeRed, strobeBlue);
  g.add(glowSprite(LIGHT_COLORS.strobeRed, 1.4, -10.7, 2.6, 21.5, 0.5));
  g.add(glowSprite(LIGHT_COLORS.strobeBlue, 1.4, -10.0, 2.6, 21.5, 0.5));
  ctx.strobes.push({ red: strobeRed, blue: strobeBlue, redMesh: redLens, blueMesh: blueLens });

  // ---- Elevated concrete platform (east) + outdoor stairs + searchlight ----
  g.add(box(10.6, 2.6, 8, wallMat, 13.7, 1.3, 23));
  g.add(plane(10.4, 7.8, toonMap(concreteTexture('#878c93', 'ctdeck'), {}), 13.7, 2.62, 23, -Math.PI / 2));
  g.add(box(10.8, 0.18, 0.4, toon(COLORS.concreteDark), 13.7, 2.7, 19.05)); // edge trim
  // stairs climbing east onto the platform
  for (let i = 0; i < 8; i++) {
    const h = 0.325 * (i + 1);
    g.add(box(0.28, h, 2.6, wallMat, 6.4 + i * 0.28, h / 2, 23));
  }
  g.add(box(0.06, 0.9, 3.0, trim, 6.1, 3.1, 24.6)); // stair rail
  // searchlight on the deck
  const sl = group();
  sl.add(box(0.5, 0.3, 0.5, trim, 0, 0.15, 0));
  sl.add(box(0.16, 1.4, 0.16, trim, 0, 0.9, 0));
  const slHead = new THREE.Group();
  const barrelMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 0.7, 12), toon(COLORS.steel));
  barrelMesh.rotation.x = Math.PI / 2.6;
  barrelMesh.castShadow = true;
  slHead.add(barrelMesh);
  const lens = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.3, 0.06, 12),
    new THREE.MeshBasicMaterial({ color: 0xf2f6ff })
  );
  lens.rotation.x = Math.PI / 2.6;
  lens.position.set(0, 0.3, 0.28);
  slHead.add(lens);
  slHead.position.set(0, 1.6, 0);
  sl.add(slHead);
  sl.position.set(16.5, 2.6, 24.5);
  g.add(sl);
  const spot = new THREE.SpotLight(LIGHT_COLORS.searchlight, 400, 80, 0.3, 0.45, 1.6);
  spot.position.set(16.5, 4.3, 24.5);
  spot.castShadow = false;
  const spotTarget = new THREE.Object3D();
  spotTarget.position.set(-6, 6, -30);
  g.add(spotTarget);
  spot.target = spotTarget;
  g.add(spot);
  g.add(glowSprite(0xeef4ff, 2.6, 16.5, 4.4, 24.5, 0.45));
  ctx.searchlight = { light: spot, head: slHead, target: spotTarget, baseTarget: spotTarget.position.clone() };

  // gear cases + spare helmets by the rear wall
  g.add(box(1.7, 0.7, 0.9, toonMap(paintTexture('#3a4a3a', { key: 'gear' }), {}), -3.5, 0.35, 27.4));
  g.add(box(1.7, 0.7, 0.9, toonMap(paintTexture('#3a4a3a', { key: 'gear2' }), {}), -1.6, 0.35, 27.4, 0.1));
  const helmetM = toon(0x2a3a4a);
  for (let i = 0; i < 3; i++) {
    const hm = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8, 0, Math.PI * 2, 0, Math.PI / 2), helmetM);
    hm.position.set(-3.9 + i * 0.45, 0.7, 27.3);
    hm.castShadow = true;
    g.add(hm);
  }

  // ---- Route dressing: west lane to mid, east lane toward B flank ----
  g.add(crateStack(-13.5, 0, 17.8, 2, -0.5)); // left (west) route cover
  g.add(tire(-15.5, 0, 19.2, 0.6));
  g.add(tire(-14.8, 0, 20.0, -0.4));
  g.add(concreteBarrier(-11.5, 17.2, 0.4)); // right-side marker near east route
  g.add(box(0.08, 2.2, 0.08, trim, 11.5, 1.1, 17.6));
  g.add(box(1.1, 0.6, 0.06, toonMap(paintTexture('#3a4a5a', { key: 'ctsign' }), {}), 11.5, 2.3, 17.6, -0.2));
  g.add(graffitiCard('B →', '#4fa8b8', 1.8, 1.0, 11.5, 2.3, 17.55, -0.2));
  addBulletHoleCluster(g, bulletMat(), -6.5, 1.2, 28.33, Math.PI, 3, rng);
}
