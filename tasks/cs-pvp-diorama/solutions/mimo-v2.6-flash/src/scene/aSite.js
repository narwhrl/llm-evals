import * as THREE from 'three';
import { COLORS, LIGHT_COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import {
  concreteTexture, rustTexture, paintTexture, woodTexture,
  zoneMarkTexture, paperTexture,
} from '../textures.js';
import { box, plane, card, group, ladder, addBulletHoleCluster } from './helpers.js';
import {
  crateStack, crate, trashBin, acUnit, graffitiCard, bulletMat,
  cardboardPile, glowSprite,
} from './props.js';

function boardWindow(w, h, x, y, z, ry, parent) {
  // Surface-mounted boarded window: dark recess + crossed planks.
  parent.add(card(w, h, new THREE.MeshBasicMaterial({ color: 0x0a0d12 }), x, y, z, 0, ry));
  const plank = toonMap(woodTexture('bw'), {});
  const nx = Math.sin(ry);
  const nz = Math.cos(ry);
  for (let i = -1; i <= 1; i++) {
    const p = box(w * 1.06, 0.18, 0.06, plank, x + nx * 0.04, y + i * h * 0.3, z + nz * 0.04, ry);
    p.rotation.z = i === 0 ? 0 : 0.12 * i;
    parent.add(p);
  }
}

export function buildASite(ctx) {
  const { group: g, rng } = ctx;
  const wallTex = toonMap(concreteTexture('#83888f', 'wh'), {});
  wallTex.map.repeat.set(3, 1.5);
  const wallMat = wallTex;
  const trim = toon(COLORS.steelDark);

  // ---- Warehouse shell: x -24..-7, z -22..-9, walls h 7.5 ----
  // West wall
  g.add(box(0.4, 7.5, 13, wallMat, -24, 3.75, -15.5));
  // North wall with ajar back door (x -10.8..-9.2, h 2.3)
  g.add(box(13.2, 7.5, 0.4, wallMat, -17.4, 3.75, -22));
  g.add(box(2.2, 7.5, 0.4, wallMat, -8.1, 3.75, -22));
  g.add(box(1.6, 5.2, 0.4, wallMat, -10, 4.9, -22));
  // Back door, half open (hinged on west jamb)
  const doorHinge = new THREE.Group();
  const doorMat = toonMap(paintTexture('#5a6a5a', { key: 'backdoor' }), {});
  doorHinge.add(box(1.5, 2.3, 0.08, doorMat, 0.75, 1.15, 0));
  doorHinge.position.set(-10.8, 0, -22);
  doorHinge.rotation.y = -0.55; // ajar
  g.add(doorHinge);
  // Red light leaking through the crack
  g.add(card(0.5, 2.1, new THREE.MeshBasicMaterial({ color: COLORS.emergencyRed }), -9.5, 1.15, -22.28, 0, 0));
  const redLamp = new THREE.PointLight(LIGHT_COLORS.redGlow, 14, 7, 2);
  redLamp.position.set(-9.6, 1.3, -22.7);
  g.add(redLamp);
  g.add(glowSprite(LIGHT_COLORS.redGlow, 1.6, -9.6, 1.3, -22.6, 0.4));

  // East wall (faces mid) with side door (z -13..-11) + high loft window
  g.add(box(0.4, 7.5, 9, wallMat, -7, 3.75, -17.5)); // z -22..-13
  g.add(box(0.4, 7.5, 2, wallMat, -7, 3.75, -10)); // z -11..-9
  g.add(box(0.4, 5.1, 2, wallMat, -7, 4.95, -12)); // header over side door
  // East wall front portion with loft window (x -12.5..-7 on south wall handled below)
  // Side door swinging inward
  const sideHinge = new THREE.Group();
  sideHinge.add(box(1.9, 2.4, 0.08, toonMap(paintTexture('#6a6a58', { key: 'sidedoor' }), {}), 0, 1.2, 0.95));
  sideHinge.position.set(-7.2, 0, -13);
  sideHinge.rotation.y = -1.15; // swings inward (west, into the warehouse)
  g.add(sideHinge);
  // Two breakable plank windows on the east (mid-facing) wall
  boardWindow(1.7, 1.5, -6.78, 2.5, -16.5, Math.PI / 2, g);
  boardWindow(1.7, 1.5, -6.78, 2.5, -19.6, Math.PI / 2, g);

  // South (front) wall: rolling shutter half raised, high window over east segment
  g.add(box(5.5, 7.5, 0.4, wallMat, -21.25, 3.75, -9)); // x -24..-18.5
  g.add(box(6, 3.5, 0.4, wallMat, -15.5, 5.75, -9)); // header over shutter opening
  // east segment pieces with loft window (x -12.5..-7)
  g.add(box(1.5, 7.5, 0.4, wallMat, -11.75, 3.75, -9));
  g.add(box(1.5, 7.5, 0.4, wallMat, -7.75, 3.75, -9));
  g.add(box(2.5, 5.0, 0.4, wallMat, -9.75, 2.5, -9)); // below window
  g.add(box(2.5, 1.0, 0.4, wallMat, -9.75, 7.0, -9)); // above window
  // loft window void + glass
  g.add(card(2.5, 1.5, new THREE.MeshBasicMaterial({ color: 0x0b0f16 }), -9.75, 5.75, -9.0, 0, 0));
  const glassMat = new THREE.MeshBasicMaterial({
    color: 0x7f97b8, transparent: true, opacity: 0.18, depthWrite: false,
  });
  g.add(card(2.5, 1.5, glassMat, -9.75, 5.75, -8.82, 0, 0));

  // Half-raised rolling shutter (animated) + roll above it
  const shutterMat = toonMap(rustTexture('#7a6a5a', 'shut'), {});
  shutterMat.map.repeat.set(3, 1);
  const shutter = box(6, 2.0, 0.1, shutterMat, -15.5, 3.0, -8.98);
  g.add(shutter);
  ctx.shutterMesh = shutter;
  const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 6.1, 10), toonMap(rustTexture('#8a7a66', 'roll'), {}));
  roll.rotation.z = Math.PI / 2;
  roll.position.set(-15.5, 4.3, -8.98);
  roll.castShadow = true;
  g.add(roll);
  // dark interior visible through the 2m gap
  g.add(card(6, 2.0, new THREE.MeshBasicMaterial({ color: 0x090c11 }), -15.5, 1.0, -9.3, 0, 0));

  // ---- Roof (semi-open): slab A full width north, slab B partial SW ----
  const roofMat = toonMap(rustTexture('#565e66', 'roof'), {});
  g.add(box(17.8, 0.35, 8.4, roofMat, -15.5, 7.68, -18.2)); // z -22.4..-14
  g.add(box(10.4, 0.35, 4.6, roofMat, -19.2, 7.68, -11.7)); // z -14..-9.4 west part
  // open sky section: x -14..-6.6, z -14..-9.4
  // roof edge beams over the open section
  g.add(box(7.6, 0.2, 0.2, trim, -10.2, 7.5, -14));
  g.add(box(0.2, 0.2, 4.8, trim, -14, 7.5, -11.6));

  // ---- Interior ----
  const floorMat = toonMap(concreteTexture('#95999f', 'whfloor'), {});
  floorMat.map.repeat.set(4, 3);
  g.add(plane(16.2, 12.2, floorMat, -15.5, 0.05, -15.5, -Math.PI / 2));

  // White spray bomb-site marker
  const zoneA = plane(5, 5, new THREE.MeshBasicMaterial({
    map: zoneMarkTexture('A'), transparent: true, depthWrite: false,
  }), -14, 0.07, -13.8, -Math.PI / 2);
  zoneA.rotation.z = 0.25;
  g.add(zoneA);

  // Central load-bearing column (classic peek angle)
  g.add(box(1.4, 7.5, 1.4, wallMat, -16.5, 3.75, -16));

  // Five-level heavy rack along west wall
  const rackMat = toon(0x8a5a30);
  const rackZ = [-20, -17.3, -14.7, -12];
  for (const rz of rackZ) {
    g.add(box(0.16, 6, 0.16, rackMat, -23.1, 3, rz));
    g.add(box(0.16, 6, 0.16, rackMat, -21.5, 3, rz));
  }
  for (let s = 0; s < 5; s++) {
    const y = 0.6 + s * 1.35;
    g.add(box(1.8, 0.1, 8.6, rackMat, -22.3, y, -16));
    // stock boxes on shelves
    if (s < 4) {
      const n = 2 + ((rng() * 2) | 0);
      for (let i = 0; i < n; i++) {
        const c = crate(0.8 + rng() * 0.3, rng());
        c.position.set(-22.3 + (rng() - 0.5) * 0.7, y + 0.05, -19.5 + i * (6 / n) + rng());
        g.add(c);
      }
    }
  }

  // Manual forklift near the side door
  const fork = group();
  const forkYellow = toonMap(paintTexture('#b8922a', { key: 'fork' }), {});
  fork.add(box(1.6, 0.9, 1.1, forkYellow, 0, 0.85, 0));
  fork.add(box(1.1, 0.5, 1.0, toon(0x2a2e34), -0.2, 1.5, 0)); // seat block
  fork.add(box(0.1, 2.6, 0.12, trim, 0.85, 1.6, -0.4));
  fork.add(box(0.1, 2.6, 0.12, trim, 0.85, 1.6, 0.4));
  fork.add(box(0.9, 0.08, 0.14, trim, 1.3, 0.16, -0.35));
  fork.add(box(0.9, 0.08, 0.14, trim, 1.3, 0.16, 0.35));
  for (const [wx, wz] of [[-0.55, -0.5], [-0.55, 0.5], [0.55, -0.5], [0.55, 0.5]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.2, 10), toon(COLORS.tire));
    w.rotation.x = Math.PI / 2;
    w.position.set(wx, 0.28, wz);
    w.castShadow = true;
    fork.add(w);
  }
  fork.position.set(-9.2, 0.05, -11.5);
  fork.rotation.y = -0.7;
  g.add(fork);

  // Crates, sacks, sorting table, debris
  g.add(crateStack(-12, 0.05, -20, 3, 0.4));
  g.add(crateStack(-20, 0.05, -10.6, 2, -0.3));
  g.add(crateStack(-11.5, 0.05, -10.2, 2, 0.8));
  const sackMat = toon(0x9a8a66);
  const sackPos = [[0, 0], [0.95, 0.2], [0.5, 0.9], [1.3, 1.0], [0.7, 0.55]];
  for (let i = 0; i < sackPos.length; i++) {
    const s = box(0.95, 0.5, 0.7, sackMat, -21.4 + sackPos[i][0], 0.3 + (i > 3 ? 0.5 : 0), -10.6 + sackPos[i][1], rng());
    g.add(s);
  }
  // sorting table NW corner
  const tableMat = toonMap(woodTexture('sort'), {});
  g.add(box(2.2, 0.1, 1.1, tableMat, -22, 0.95, -20.6));
  for (const [lx, lz] of [[-1, -0.4], [1, -0.4], [-1, 0.4], [1, 0.4]]) {
    g.add(box(0.1, 0.9, 0.1, toon(COLORS.woodDark), -22 + lx, 0.5, -20.6 + lz));
  }
  g.add(cardboardPile(-20.4, -21.2, 0.7));
  g.add(card(0.5, 0.4, toonMap(paperTexture(), {}), -18.6, 0.06, -12.4, -Math.PI / 2, 0.4));
  g.add(card(0.5, 0.4, toonMap(paperTexture('p2'), {}), -13.2, 0.06, -17.6, -Math.PI / 2, -0.8));
  // packing straps on the floor
  for (let i = 0; i < 4; i++) {
    g.add(box(1.3, 0.03, 0.07, toon(0xb84a4a), -17 + rng() * 5, 0.09, -11 - rng() * 3, rng() * 3));
  }

  // ---- Loft (upper-right corner) with vertical ladder ----
  g.add(box(4.6, 0.15, 4, toonMap(woodTexture('loft'), {}), -9.7, 4.8, -19.6));
  // railings (south + west edges)
  g.add(box(4.6, 0.08, 0.08, trim, -9.7, 5.7, -17.65));
  g.add(box(4.6, 0.06, 0.06, trim, -9.7, 5.25, -17.65));
  for (let i = 0; i < 5; i++) g.add(box(0.07, 0.9, 0.07, trim, -11.8 + i * 1.05, 5.3, -17.65));
  g.add(box(0.08, 0.08, 4, trim, -12, 5.7, -19.6));
  g.add(ladder(trim, trim, 4.8, -12.3, 0.05, -19.6, Math.PI / 2));
  g.add(crate(1.0, 0.2));
  g.children[g.children.length - 1].position.set(-8.4, 4.88, -20.6);
  g.add(box(0.5, 0.3, 0.35, toon(0x3a4a3a), -8.5, 5.15, -18.6)); // field radio

  // ---- Interior lighting: cold white emergency fixtures ----
  const fixMat = new THREE.MeshBasicMaterial({ color: 0xe8f2ff });
  g.add(box(1.8, 0.12, 0.4, fixMat, -15.5, 6.9, -15.5));
  g.add(box(1.4, 0.1, 0.3, fixMat, -21, 6.9, -19));
  const cold = new THREE.PointLight(LIGHT_COLORS.warehouse, 160, 24, 2);
  cold.position.set(-15.5, 6.5, -15.5);
  g.add(cold);
  const cold2 = new THREE.PointLight(LIGHT_COLORS.warehouse, 60, 14, 2);
  cold2.position.set(-21, 6.4, -19);
  g.add(cold2);
  g.add(glowSprite(0xd8e8ff, 3.2, -15.5, 6.8, -15.5, 0.35));

  // ---- Exterior props ----
  g.add(acUnit(-7.5, 2.4, -8.6, 0));
  // freight sign beside the east passage
  g.add(box(0.08, 2.2, 0.08, trim, -6.3, 1.1, -10.6));
  g.add(box(1.2, 0.7, 0.06, toonMap(paintTexture('#3a4a5a', { key: 'fsign' }), {}), -6.3, 2.3, -10.6));
  g.add(graffitiCard('CS-4711', '#e8ecf2', 1.1, 0.5, -6.3, 2.3, -10.63, 0));
  g.add(trashBin(-6.4, -16.5, 0.3));
  g.add(crateStack(-6.5, 0, -8.4, 1, 0.9));

  // Graffiti & bullet impacts on outer faces
  g.add(graffitiCard('A LONG', '#c45a8a', 3.6, 1.8, -20.5, 2.8, -8.76, 0));
  g.add(graffitiCard('GO A', '#8fbf5a', 2.6, 1.4, -6.77, 2.6, -15.5, Math.PI / 2));
  addBulletHoleCluster(g, bulletMat(), -18, 1.6, -8.76, 0, 5, rng);
  addBulletHoleCluster(g, bulletMat(), -10.4, 1.4, -8.76, 0, 4, rng);
  addBulletHoleCluster(g, bulletMat(), -6.77, 1.5, -18, Math.PI / 2, 4, rng);

  // Wet streaks on the south face
  ctx.streaks.push({ w: 4, h: 5, x: -22, y: 4.2, z: -8.75, ry: 0 });
  ctx.streaks.push({ w: 3, h: 4, x: -12.5, y: 4.4, z: -8.75, ry: 0 });
  ctx.streaks.push({ w: 5, h: 5.5, x: -6.75, y: 4, z: -14, ry: Math.PI / 2 });

  // Roof steam vent + eave drips
  g.add(box(0.7, 0.5, 0.7, trim, -18, 8.1, -20));
  ctx.steamVents.push({ x: -18, y: 8.4, z: -20 });
  ctx.steamVents.push({ x: -17.6, y: 8.4, z: -19.6 });
  for (let x = -23; x <= -8; x += 2.2) {
    ctx.drips.push({ x, y: 7.5, z: -9.1 });
  }
  for (let x = -13; x <= -8; x += 1.6) {
    ctx.drips.push({ x, y: 2.0, z: -9.05 }); // shutter bottom edge
  }
  ctx.drips.push({ x: -24.2, y: 6, z: -12 });
  ctx.drips.push({ x: -24.2, y: 3.5, z: -16 });
}
