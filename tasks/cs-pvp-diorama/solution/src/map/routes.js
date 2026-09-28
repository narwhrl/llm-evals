import * as THREE from 'three';
import { Kit } from '../core/kit.js';
import { solid, dripLine, ANIMATED } from '../fx/registry.js';
import { addLight } from '../fx/lights.js';
import { tireStack, barrelQuad, sandbags, crateStack, cardboardPile, concreteBlock } from '../props/basic.js';
import { stairs, railing } from '../props/structures.js';
import { graffiti, wetWall } from './common.js';

// Right flank: an elevated concrete deck from the B yard down to the CT high platform.
const DY = 3.2;
const DX0 = 21;
const DX1 = 31;

function deck(k) {
  k.span('concrete', DX0, DY - 0.35, -4, DX1, DY, 18, { tint: 0xb2b2ac });
  k.span('concrete', DX0, DY - 0.6, -4, DX0 + 0.3, DY - 0.35, 18, { tint: 0x9a9a94 });
  solid(DX0, -4, DX1, 18, DY);
  for (let z = -3; z <= 16; z += 4.5) {
    for (const x of [DX0 + 0.6, 26, DX1 - 0.8]) k.span('concrete', x - 0.3, 0, z - 0.3, x + 0.3, DY - 0.35, z + 0.3, { tint: 0xa0a09a });
  }
  railing(k, [DX0 + 0.1, DY, -1.2], [DX0 + 0.1, DY, 18]);
  railing(k, [DX1 - 0.2, DY, -4], [DX1 - 0.2, DY, 18]);
  railing(k, [23, DY, -3.9], [DX1 - 0.2, DY, -3.9]);
  dripLine([DX0, DY - 0.35, -3], [DX0, DY - 0.35, 17], 12);
  wetWall(k, '-x', DX0, DY - 0.6, 7, 22, 0.6);
  graffiti(k, '-x', DX0 + 0.28, 1.4, 5.25, 0.6, 'bullets');
  graffiti(k, '-x', DX0 + 0.28, 1.6, 9.75, 0.6, 'tSpray');
  // stair down to the B yard at the deck's north end
  stairs(k, 22.2, 0, -8.5, 0, 1.6, DY);
  // clutter in the dark space under the deck
  tireStack(k, 27.5, 0, 2, 4);
  barrelQuad(k, 29.4, 0, 9, 0.2);
  cardboardPile(k, 24.5, 0, 13.5, 0.4, 5);
  // cover up on the deck
  sandbags(k, 25.5, DY, -2.5, 0, 3.4, 3);
  crateStack(k, 29.3, DY, 6.5, 0.1, [[0, 0, 0], [0, 1, 0], [1, 0, 0]]);
  concreteBlock(k, 23, DY, 10, 0.2);
}

function ctPlatform(k, dynamic) {
  const Y = DY;
  k.span('concrete', 17, 0, 18, 31, Y, 30.4, { tint: 0xb4b4ae });
  k.span('concrete', 16.9, Y - 0.2, 17.9, 31, Y, 30.5, { tint: 0x9e9e98 });
  solid(17, 18, 31, 30.4, Y);
  graffiti(k, '-x', 16.88, 1.6, 21.5, 2.0, 'ctEmblem');
  graffiti(k, '-z', 20.5, 1.5, 17.88, 1.6, 'bullets');
  graffiti(k, '-z', 25, 1.4, 17.88, 1.8, 'tagDust');
  wetWall(k, '-z', 24, 0, 17.9, 14, Y);
  wetWall(k, '-x', 16.9, 0, 24, 12, Y);
  // exterior stair up the west face from the spawn
  stairs(k, 12.8, 0.1, 27.4, Math.PI / 2, 1.5, Y - 0.1);
  railing(k, [17.2, Y, 18.1], [17.2, Y, 26.4]);
  railing(k, [17.2, Y, 18.1], [DX0 - 0.1, Y, 18.1]);
  sandbags(k, 19.8, Y, 19.1, 0, 3.0, 3);
  crateStack(k, 29.6, Y, 28.8, 0, [[0, 0, 0], [0, 1, 0]]);
  dripLine([17, Y, 18], [31, Y, 18], 8);

  // searchlight on the platform's corner, sweeping the mid entrance
  const base = [19.2, Y, 21.4];
  k.cyl('darkMetal', base, 0.35, 0.3, { seg: 12 });
  k.cyl('darkMetal', [base[0], Y + 0.3, base[2]], 0.08, 1.1, { seg: 8 });
  for (const s of [-1, 1]) k.box('darkMetal', [base[0] + s * 0.42, Y + 1.2, base[2]], [0.07, 0.6, 0.12]);
  const hk = new Kit();
  hk.cyl('darkMetal', [0, 0, -0.45], 0.36, 0.9, { rot: [Math.PI / 2, 0, 0], seg: 16 });
  hk.cyl('darkMetal', [0, 0, 0.45], 0.4, 0.08, { rot: [Math.PI / 2, 0, 0], seg: 16, tint: 0x6a6a68 });
  hk.cyl('lampSearch', [0, 0, 0.53], 0.33, 0.02, { rot: [Math.PI / 2, 0, 0], seg: 16 });
  const head = hk.build('searchlight');
  const pivot = new THREE.Vector3(base[0], Y + 1.45, base[2]);
  head.position.copy(pivot);
  head.rotation.order = 'YXZ';
  dynamic.add(head);

  const aim = new THREE.Vector3(0.5, 0, 9).sub(pivot);
  const baseYaw = Math.atan2(aim.x, aim.z);
  const basePitch = Math.atan2(-aim.y, Math.hypot(aim.x, aim.z));
  const L = addLight({
    pos: pivot.toArray(), color: 0xeef4ff, intensity: 140, distance: 42, decay: 1.2, kind: 'spot',
    target: [0.5, 0, 9], angle: 0.16, penumbra: 0.45, glow: 2.2, glowOpacity: 0.9, lamp: 'lampSearch', mode: 'search',
    beam: { length: 16, radius: 2.0, strength: 0.13 },
  });
  const dir = new THREE.Vector3();
  const DOWN = new THREE.Vector3(0, -1, 0);
  ANIMATED.push((t) => {
    const yaw = baseYaw + Math.sin(t * 0.21) * 0.42 + Math.sin(t * 0.53) * 0.06;
    const pitch = basePitch + Math.sin(t * 0.37) * 0.05;
    head.rotation.set(pitch, yaw, 0);
    dir.set(Math.sin(yaw) * Math.cos(pitch), -Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch));
    const lensPos = pivot.clone().addScaledVector(dir, 0.55);
    L.light.target.position.copy(pivot).addScaledVector(dir, 25);
    L.light.target.updateMatrixWorld();
    L.sprite.position.copy(lensPos);
    L.beam.position.copy(lensPos);
    L.beam.quaternion.setFromUnitVectors(DOWN, dir);
  });
}

export function buildRoutes(k, dynamic) {
  deck(k);
  ctPlatform(k, dynamic);
}
