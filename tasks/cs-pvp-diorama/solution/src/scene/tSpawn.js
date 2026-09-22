import * as THREE from 'three';
import { COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import { paintTexture, concreteTexture } from '../textures.js';
import { box, plane, card, rampZ, group } from './helpers.js';
import {
  crateStack, barrelCluster, pallet, barbedWireRun, graffitiCard, bulletMat,
  ladderProp,
} from './props.js';

function container(w, h, d, color, label, x, y, z, ry = 0) {
  const tex = paintTexture(color, { label, key: label });
  const m = toonMap(tex, {});
  const g = group(box(w, h, d, m, 0, h / 2, 0));
  const trim = toon(COLORS.steelDark);
  g.add(box(w * 1.01, 0.08, d * 1.01, trim, 0, 0.08, 0));
  g.add(box(w * 1.01, 0.08, d * 1.01, trim, 0, h - 0.08, 0));
  // door-end frame
  g.add(box(0.1, h * 0.96, d * 1.02, trim, w / 2 - 0.05, h / 2, 0));
  g.position.set(x, y, z);
  g.rotation.y = ry;
  return g;
}

export function buildTSpawn(ctx) {
  const { group: g } = ctx;
  const platformMat = toonMap(concreteTexture('#7f858c', 'plat'), {});
  platformMat.map.repeat.set(6, 2);

  // Raised卸货平台 (north spawn deck), top at y = 1.
  const deck = box(46, 1.0, 13, platformMat, 0, 0.5, -22.5);
  g.add(deck);
  const deckTop = plane(46, 13, toonMap(concreteTexture('#6e747c', 'decktop'), {}), 0, 1.02, -22.5, -Math.PI / 2);
  g.add(deckTop);

  // Ramp down to mid / A direction (high side meets deck at z = -16).
  const rampMesh = rampZ(6, 5, 1.0, toonMap(concreteTexture('#84898f', 'ramp'), {}), 0, 0, -13.5, Math.PI);
  g.add(rampMesh);

  // Ramp side wall with a breached observation hole (east of the ramp).
  const wallMat = toonMap(concreteTexture('#777c83', 'rampwall'), {});
  g.add(box(0.4, 2.3, 1.4, wallMat, 3.8, 1.15, -15.3)); // z -16..-14.6
  g.add(box(0.4, 2.3, 1.8, wallMat, 3.8, 1.15, -12.2)); // z -13.1..-11.3
  g.add(box(0.4, 0.7, 1.5, wallMat, 3.8, 0.35, -13.85)); // sill under hole
  g.add(box(0.4, 0.7, 1.5, wallMat, 3.8, 1.95, -13.85)); // lintel over hole
  g.add(box(0.3, 1.2, 1.5, toon(0x0a0c10), 3.8, 1.05, -13.85)); // hole void
  g.add(graffitiCard('MID?', '#4fa8b8', 2.2, 1.1, 3.58, 1.5, -15.3, -Math.PI / 2));
  g.add(card(0.3, 0.3, bulletMat(), 3.58, 1.2, -12.4, 0, -Math.PI / 2));

  // Ramp-side supplies: 4-barrel cluster + pallets.
  g.add(barrelCluster(5.6, -17.2, 4));
  g.add(pallet(-5.4, 1.0, -17.4, 0.3));
  g.add(pallet(-6.2, 1.0, -19.6, -0.5));
  g.add(crateStack(-8.5, 1.0, -24.5, 2, 0.2));

  // Left (west): derelict box truck on the deck.
  const truck = group();
  const truckBody = toonMap(paintTexture('#6a7078', { key: 'truck' }), {});
  const truckCab = toonMap(paintTexture('#4a5560', { key: 'truckcab' }), {});
  truck.add(box(6.4, 2.5, 2.4, truckBody, 0.6, 2.05, 0)); // cargo at rear (west)
  truck.add(box(2.0, 1.7, 2.2, truckCab, 4.6, 1.45, 0)); // cab east
  truck.add(box(1.7, 0.9, 2.0, toon(0x1a2028), 5.0, 2.0, 0)); // windshield band
  truck.add(box(8.6, 0.5, 2.0, toon(COLORS.steelDark), 0.8, 0.75, 0)); // chassis
  const wheelMat = toon(COLORS.tire);
  for (const wx of [-2.0, 1.6, 4.4]) {
    for (const wz of [-1.05, 1.05]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.35, 12), wheelMat);
      w.rotation.x = Math.PI / 2;
      w.position.set(wx, 0.55, wz);
      w.castShadow = true;
      truck.add(w);
    }
  }
  // grime + bullet holes on cargo side
  truck.add(card(0.28, 0.28, bulletMat(), -1.2, 2.2, 1.22, 0, 0));
  truck.add(card(0.28, 0.28, bulletMat(), -0.6, 1.8, 1.22, 0, 0));
  truck.position.set(-14.5, 1.0, -23.0);
  truck.rotation.y = 0.06;
  g.add(truck);

  // Wooden ladder leaning against the truck.
  g.add(ladderProp(-11.0, 1.0, -21.4, 3.4, 0.9));

  // Right (east): stacked shipping containers, two firing heights + walk-through gap.
  g.add(container(6, 2.4, 2.4, '#38527a', 'CSX-77', 14, 1.0, -24.0, 0.04));
  g.add(container(6, 2.4, 2.4, '#8a3a32', 'T-01', 14, 3.42, -24.0, 0.04));
  g.add(container(6, 2.4, 2.4, '#47624a', 'FR-19', 14, 5.84, -24.0, 0.04));
  g.add(container(6, 2.4, 2.4, '#8a6a34', 'A-404', 14, 1.0, -18.6, -0.05));
  g.add(container(6, 2.4, 2.4, '#38527a', 'MID', 14, 3.42, -18.6, -0.05));
  // gap between stacks ≈ z -22.8..-19.8 for single-file pass
  g.add(container(4.5, 2.4, 2.4, '#47624a', 'X-12', 20.6, 1.0, -21.5, Math.PI / 2));

  // Barbed-wire enclosure around the spawn (ramp gap left open).
  g.add(barbedWireRun(-23, -16, -3.6, -16));
  g.add(barbedWireRun(3.6, -16, 23, -16));
  g.add(barbedWireRun(-23, -16, -23, -29));
  g.add(barbedWireRun(23, -16, 23, -29));

  // Breach洞口 viewing slit already on ramp wall; deck edge drop rail:
  g.add(box(46, 0.5, 0.3, toon(COLORS.steelDark), 0, 1.25, -16.05));

  // Scattered detail.
  g.add(graffitiCard('RUSH B', '#c45a8a', 3.4, 1.7, -6, 3.6, -16.1, 0));
  ctx.streaks.push({ w: 3.5, h: 4.5, x: -20, y: 3.2, z: -16.1, ry: 0 });
}
