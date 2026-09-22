import * as THREE from 'three';
import { COLORS, LIGHT_COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import {
  concreteTexture, rustTexture, paintTexture, woodTexture,
  zoneMarkTexture, paperTexture, dutyScheduleTexture,
} from '../textures.js';
import { box, plane, card, group, addBulletHoleCluster } from './helpers.js';
import {
  crateStack, crate, pallet, trashBin, bike, streetLamp, graffitiCard,
  bulletMat, cardboardPile, glowSprite,
} from './props.js';

// B site: NE后街 — two-storey sheet-metal building (guard room + balcony),
// open bomb site in front, street lamp at the corner, shortcut wall to CT.
export function buildBSite(ctx) {
  const { group: g, rng } = ctx;
  const sheetTex = toonMap(paintTexture('#54606a', { key: 'sheet' }), {});
  sheetTex.map.repeat.set(3, 1.5);
  const sheet = sheetTex;
  const rustMat = toonMap(rustTexture('#6a5a4e', 'brust'), {});
  const trim = toon(COLORS.steelDark);
  const floorMat = toonMap(concreteTexture('#777d84', 'bfloor'), {});

  // ---------- Building shell: x 11..24, z -22..-14 ----------
  // Ground floor (guard room), h 0..3
  g.add(box(0.4, 3, 8, sheet, 11, 1.5, -18)); // west wall
  // south wall with front door (x 16.4..18)
  g.add(box(5.4, 3, 0.4, sheet, 13.7, 1.5, -14));
  g.add(box(6.0, 3, 0.4, sheet, 21.0, 1.5, -14));
  g.add(box(1.6, 0.8, 0.4, sheet, 17.2, 2.6, -14)); // door header
  // north wall with back door (x 13.4..15)
  g.add(box(2.4, 3, 0.4, sheet, 12.2, 1.5, -22));
  g.add(box(9.0, 3, 0.4, sheet, 19.5, 1.5, -22));
  g.add(box(1.6, 0.8, 0.4, sheet, 14.2, 2.6, -22));
  // east wall ground floor
  g.add(box(0.4, 3, 8, sheet, 24, 1.5, -18));

  // Front/back doors (ajar)
  const frontDoor = new THREE.Group();
  frontDoor.add(box(1.5, 2.2, 0.08, toonMap(paintTexture('#4a5a66', { key: 'bdoor' }), {}), 0.75, 1.1, 0));
  frontDoor.position.set(16.4, 0, -14);
  frontDoor.rotation.y = -0.7;
  g.add(frontDoor);
  const backDoor = new THREE.Group();
  backDoor.add(box(1.5, 2.2, 0.08, toonMap(paintTexture('#4a5a66', { key: 'bdoor2' }), {}), 0.75, 1.1, 0));
  backDoor.position.set(13.4, 0, -22);
  backDoor.rotation.y = 0.5;
  g.add(backDoor);

  // Ground-floor windows (dark recess + rainy glass)
  const glass = new THREE.MeshBasicMaterial({
    color: 0x8aa2c4, transparent: true, opacity: 0.24, depthWrite: false,
  });
  const voidM = new THREE.MeshBasicMaterial({ color: 0x0c1018 });
  // south windows
  for (const wx of [12.6, 14.9]) {
    g.add(card(1.4, 1.1, voidM, wx, 1.8, -14.23, 0, Math.PI));
    g.add(card(1.4, 1.1, glass, wx, 1.8, -13.76, 0, 0));
  }
  // east window
  g.add(card(1.5, 1.1, voidM, 24.23, 1.8, -16.5, 0, Math.PI / 2));
  g.add(card(1.5, 1.1, glass, 23.76, 1.8, -16.5, 0, Math.PI / 2));

  // ---------- Floor slab / second storey (y 3) ----------
  g.add(box(13, 0.2, 8, floorMat, 17.5, 3.0, -18));
  g.add(plane(12.4, 7.4, floorMat, 17.5, 0.06, -18, -Math.PI / 2)); // guard-room floor

  // Second-storey walls, y 3..6.2, door to balcony (x 20..21.6)
  g.add(box(9.0, 3.2, 0.4, sheet, 15.5, 4.6, -14)); // south west segment
  g.add(box(2.4, 3.2, 0.4, sheet, 22.8, 4.6, -14)); // south east segment
  g.add(box(1.6, 1.0, 0.4, sheet, 20.8, 5.7, -14)); // header over balcony door
  g.add(box(13, 3.2, 0.4, sheet, 17.5, 4.6, -22)); // north wall
  g.add(box(0.4, 3.2, 8, sheet, 11, 4.6, -18)); // west wall
  // east wall with window (z -19.5..-16.5)
  g.add(box(0.4, 3.2, 2.5, sheet, 24, 4.6, -20.75));
  g.add(box(0.4, 3.2, 2.5, sheet, 24, 4.6, -15.25));
  g.add(box(0.4, 1.2, 3.0, sheet, 24, 3.6, -18));
  g.add(box(0.4, 0.8, 3.0, sheet, 24, 5.8, -18));
  g.add(card(3.0, 1.8, voidM, 24.23, 4.8, -18, 0, Math.PI / 2));
  g.add(card(3.0, 1.8, glass, 23.76, 4.8, -18, 0, Math.PI / 2));
  // second-storey south windows
  g.add(card(1.5, 1.4, voidM, 13.4, 4.6, -14.23, 0, Math.PI));
  g.add(card(1.5, 1.4, glass, 13.4, 4.6, -13.76, 0, 0));
  g.add(card(1.5, 1.4, voidM, 17.4, 4.6, -14.23, 0, Math.PI));
  g.add(card(1.5, 1.4, glass, 17.4, 4.6, -13.76, 0, 0));
  // balcony door open onto the balcony
  const bDoor = new THREE.Group();
  bDoor.add(box(1.5, 2.2, 0.08, toonMap(paintTexture('#4a5a66', { key: 'bdoor3' }), {}), 0.75, 1.1, 0));
  bDoor.position.set(20.0, 3.1, -14);
  bDoor.rotation.y = -0.9;
  g.add(bDoor);

  // Roof + parapet
  g.add(box(13.4, 0.3, 8.4, rustMat, 17.5, 6.35, -18));
  g.add(box(13.4, 0.35, 0.25, rustMat, 17.5, 6.55, -14.1));
  g.add(box(13.4, 0.35, 0.25, rustMat, 17.5, 6.55, -21.9));
  g.add(box(0.25, 0.35, 8.4, rustMat, 10.9, 6.55, -18));
  g.add(box(0.25, 0.35, 8.4, rustMat, 24.1, 6.55, -18));

  // ---------- Balcony (south, y 3.05) + fire escape (east) ----------
  g.add(box(13.4, 0.15, 1.8, floorMat, 18.7, 2.975, -12.9));
  // railing: west, south, east edges
  g.add(box(0.06, 0.08, 1.8, trim, 12.05, 3.95, -12.9));
  g.add(box(13.4, 0.08, 0.06, trim, 18.7, 3.95, -12.05));
  g.add(box(0.06, 0.08, 1.8, trim, 25.35, 3.95, -12.9));
  g.add(box(13.4, 0.05, 0.05, trim, 18.7, 3.5, -12.05));
  for (let i = 0; i < 9; i++) {
    g.add(box(0.05, 0.9, 0.05, trim, 12.5 + i * 1.5, 3.5, -12.05));
  }
  // fire-escape stair: climbs south along the east wall up to the balcony
  for (let i = 0; i < 10; i++) {
    const h = 0.3 * (i + 1);
    g.add(box(1.2, h, 0.32, rustMat, 24.9, h / 2, -15.8 + i * 0.32));
  }
  g.add(box(0.06, 0.8, 4.2, trim, 25.5, 1.8, -14.2)); // escape railing

  // ---------- Guard-room interior ----------
  // desk + radio + coffee can + newspaper
  const deskMat = toonMap(woodTexture('desk'), {});
  g.add(box(2.2, 0.08, 1.0, deskMat, 14.5, 0.78, -19.5));
  for (const [lx, lz] of [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]]) {
    g.add(box(0.08, 0.74, 0.08, toon(COLORS.woodDark), 14.5 + lx, 0.4, -19.5 + lz));
  }
  g.add(box(0.4, 0.22, 0.3, toon(0x2a2e33), 14.0, 0.93, -19.5)); // walkie-talkie
  g.add(box(0.05, 0.35, 0.05, trim, 14.0, 1.2, -19.42));
  g.add(cylCan(15.1, 0.94, -19.4)); // empty coffee can
  g.add(card(0.5, 0.4, toonMap(paperTexture(), {}), 15.5, 0.86, -19.2, -Math.PI / 2, 0.5));
  // overturned office chair
  const chair = group();
  chair.add(box(0.5, 0.08, 0.5, toon(0x30343a), 0, 0.3, 0));
  chair.add(box(0.5, 0.55, 0.08, toon(0x30343a), 0, 0.55, -0.25));
  chair.add(box(0.08, 0.3, 0.08, trim, 0, 0.15, 0));
  chair.position.set(16.2, 0.3, -19.0);
  chair.rotation.z = Math.PI / 2.2; // tipped over
  chair.rotation.y = 0.7;
  g.add(chair);
  // duty schedule on the north wall (interior face)
  g.add(card(0.7, 0.9, new THREE.MeshBasicMaterial({ map: dutyScheduleTexture(), transparent: true }), 17.5, 1.7, -21.77, 0, 0));
  // metal locker in the corner
  g.add(box(0.9, 1.9, 0.5, toonMap(paintTexture('#4a6a5a', { key: 'locker' }), {}), 11.6, 0.95, -20.8));
  // broken fluorescent fixture + warm point light (flickers)
  const fluoroMat = new THREE.MeshBasicMaterial({ color: 0xffd9a0 });
  const fluoro = box(1.6, 0.08, 0.22, fluoroMat, 16, 2.72, -18.5, 0.2);
  g.add(fluoro);
  const warm = new THREE.PointLight(LIGHT_COLORS.guardhouse, 55, 13, 2);
  warm.position.set(16, 2.5, -18.5);
  g.add(warm);
  g.add(glowSprite(0xffc880, 2.4, 16, 2.6, -18.5, 0.35));
  ctx.flickerLights.push({ light: warm, mesh: fluoro, base: 55, mode: 'fluoro' });
  // dim second-storey fill
  const up = new THREE.PointLight(0x9fb4d8, 25, 10, 2);
  up.position.set(17, 5.4, -18);
  g.add(up);

  // ---------- Open bomb site in front ----------
  const zoneB = plane(5, 5, new THREE.MeshBasicMaterial({
    map: zoneMarkTexture('B'), transparent: true, depthWrite: false,
  }), 17.5, 0.07, -7.5, -Math.PI / 2);
  zoneB.rotation.z = -0.18;
  g.add(zoneB);

  // irregular cover: pallets, bins, bike, overturned café furniture, crates
  g.add(pallet(13.5, 0, -6.5, 0.4));
  g.add(pallet(14.3, 0, -5.6, 1.1));
  g.add(trashBin(21.5, -5.5, 0.4));
  g.add(trashBin(12.2, -9.8, -0.3));
  g.add(bike(20.2, -10.2, 1.2));
  g.add(crateStack(15.8, 0, -4.2, 2, -0.4));
  g.add(crateStack(22.8, 0, -8.6, 1, 0.6));
  // overturned iron table + chairs
  const ironMat = toon(0x2c3238);
  const table = group();
  table.add(box(1.4, 0.07, 1.4, ironMat, 0, 0.7, 0));
  for (const [lx, lz] of [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]]) {
    table.add(box(0.07, 0.7, 0.07, ironMat, lx, 0.35, lz));
  }
  table.position.set(18.8, 0.35, -6.0);
  table.rotation.z = Math.PI / 2.1;
  table.rotation.y = 0.9;
  g.add(table);
  for (const [cx, cz, r] of [[17.7, -5.2, 0.4], [19.8, -7.0, -0.9]]) {
    const ch = group();
    ch.add(box(0.45, 0.06, 0.45, ironMat, 0, 0.42, 0));
    ch.add(box(0.45, 0.5, 0.06, ironMat, 0, 0.65, -0.22));
    for (const [lx, lz] of [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]]) {
      ch.add(box(0.05, 0.42, 0.05, ironMat, lx, 0.21, lz));
    }
    ch.position.set(cx, 0.2, cz);
    ch.rotation.z = Math.PI / 2;
    ch.rotation.y = r;
    g.add(ch);
  }
  g.add(cardboardPile(23.2, -12.0, -0.4));
  g.add(barrelBlue(11.8, -5.2));

  // ---------- Old street lamp at the corner ----------
  const lamp = streetLamp(5.6);
  lamp.position.set(8.5, 0, -4);
  lamp.rotation.y = 0; // arm points east over the yard
  g.add(lamp);
  const lampLight = new THREE.PointLight(LIGHT_COLORS.lampWarm, 70, 16, 2);
  lampLight.position.set(9.85, 4.95, -4);
  g.add(lampLight);
  g.add(glowSprite(0xffa050, 3.6, 9.85, 4.9, -4, 0.5));
  ctx.flickerLights.push({ light: lampLight, base: 70, mode: 'lamp' });

  // ---------- Corner low wall: shortcut toward CT ----------
  g.add(box(1.0, 1.2, 0.4, floorMat, 14.5, 0.6, 0));
  g.add(box(8.0, 1.2, 0.4, floorMat, 20.6, 0.6, 0)); // gap x 15..16.6 = shortcut
  g.add(box(9.6, 0.12, 0.5, toon(COLORS.concreteDark), 19.8, 1.24, 0));

  // graffiti & bullet scars
  g.add(graffitiCard('B RUSH', '#8fbf5a', 3.2, 1.6, 14.6, 2.2, -13.74, 0));
  g.add(graffitiCard('47', '#4fa8b8', 1.6, 1.4, 22.5, 4.8, -13.74, 0));
  addBulletHoleCluster(g, bulletMat(), 19.5, 1.5, -13.74, 0, 5, rng);
  addBulletHoleCluster(g, bulletMat(), 13.0, 1.6, -13.74, 0, 4, rng);
  addBulletHoleCluster(g, bulletMat(), 23.74, 1.4, -20, -Math.PI / 2, 3, rng);

  // wet streaks + drips + steam
  ctx.streaks.push({ w: 4, h: 3.0, x: 21, y: 4.8, z: -13.73, ry: 0 });
  ctx.streaks.push({ w: 3.5, h: 3.0, x: 12.5, y: 4.8, z: -13.73, ry: 0 });
  for (let x = 12.5; x <= 24.5; x += 1.6) {
    ctx.drips.push({ x, y: 3.0, z: -12.1 }); // balcony edge
  }
  for (let x = 11.5; x <= 24; x += 2.0) {
    ctx.drips.push({ x, y: 6.3, z: -13.9 }); // roof eaves
  }
  ctx.steamVents.push({ x: 21.5, y: 6.7, z: -19.5 });
}

// tiny helpers kept local
function cylCan(x, y, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 10), toon(0x8a9098));
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}
function barrelBlue(x, z) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.1, 12), toonMap(paintTexture('#33587e', { key: 'drumb' }), {}));
  m.position.set(x, 0.55, z);
  m.castShadow = true;
  return m;
}
