import { COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import { concreteTexture, rustTexture, paintTexture } from '../textures.js';
import { box, addBulletHoleCluster } from './helpers.js';
import {
  crateStack, barrel, tire, cardboardPile, graffitiCard, bulletMat, pallet, trashBin,
} from './props.js';

// Left flanking alley (west edge) + right elevated flank walkway (east edge).
export function buildAlleyAndFlank(ctx) {
  const { group: g, rng } = ctx;
  const wallMat = toonMap(concreteTexture('#70767e', 'alleyw'), {});
  wallMat.map.repeat.set(1, 6);
  const trim = toon(COLORS.steelDark);
  const rustMat = toonMap(rustTexture('#5e564e', 'flank'), {});

  // ---------------- West alley: x ≈ -28.5..-24.2, z -16..16 ----------------
  g.add(box(0.4, 2.6, 32, wallMat, -28.5, 1.3, 0)); // outer boundary wall
  g.add(box(0.5, 0.16, 32.4, toon(COLORS.concreteDark), -28.5, 2.64, 0)); // wall cap
  // steps down from the T deck's west edge into the alley
  for (let i = 0; i < 3; i++) {
    const h = 1.0 - i * 0.33;
    g.add(box(1.4, h, 0.5, wallMat, -23.6, h / 2, -19.5 + i * 0.5));
  }
  // alley dressing: dumpster, tires, cardboard, barrels, crates
  const dump = box(2.0, 1.3, 1.2, toonMap(paintTexture('#3f5a46', { key: 'dump' }), {}), -27.2, 0.65, 5.2);
  g.add(dump);
  g.add(box(2.1, 0.12, 1.3, toon(0x2f4636), -27.2, 1.36, 5.2, 0.06)); // lid ajar
  g.add(tire(-27.4, 0, 1.5, 0.4));
  g.add(tire(-27.0, 0, 2.3, -0.7));
  g.add(tire(-26.6, 0.4, 1.9, 0.2, false));
  g.add(cardboardPile(-25.4, 8.5, 0.9));
  g.add(barrel('red', -27.3, 0, -4.5));
  g.add(barrel('blue', -26.5, 0, -3.7));
  g.add(crateStack(-25.6, 0, -10.5, 2, 0.5));
  g.add(crateStack(-26.8, 0, 12.5, 1, -0.3));
  g.add(pallet(-27.6, 0, 9.8, 1.2));
  g.add(trashBin(-25.2, 14.2, 0.5));
  // alley graffiti + bullet holes
  g.add(graffitiCard('FLANK', '#c45a8a', 3.0, 1.5, -28.26, 1.6, 3.0, Math.PI / 2));
  g.add(graffitiCard('CT←', '#4fa8b8', 2.2, 1.2, -28.26, 1.4, -8.0, Math.PI / 2));
  addBulletHoleCluster(g, bulletMat(), -28.26, 1.3, -1.5, Math.PI / 2, 4, rng);
  addBulletHoleCluster(g, bulletMat(), -28.26, 1.5, 7.5, Math.PI / 2, 3, rng);
  // wet streaks on the alley wall
  ctx.streaks.push({ w: 3, h: 2.4, x: -28.25, y: 1.4, z: 0.5, ry: Math.PI / 2 });
  ctx.streaks.push({ w: 3, h: 2.4, x: -28.25, y: 1.4, z: -12, ry: Math.PI / 2 });
  // drips from the wall cap
  for (let z = -14; z <= 15; z += 3.5) {
    ctx.drips.push({ x: -28.3, y: 2.6, z });
  }

  // ---------------- Right elevated flank walkway (east edge) ----------------
  // Deck y 3.0, x 24.6..27, z -2..16; stairs down at both ends.
  g.add(box(2.4, 0.18, 18, rustMat, 25.8, 2.91, 7));
  g.add(box(2.4, 0.1, 18, toonMap(concreteTexture('#82878e', 'deckE'), {}), 25.8, 3.04, 7));
  // support pillars
  for (const pz of [-1.4, 2.5, 6.5, 10.5, 14.5, 15.8]) {
    g.add(box(0.5, 2.85, 0.5, toon(COLORS.concreteDark), 25.8, 1.42, pz));
  }
  // railings (both long edges)
  for (const rx of [24.7, 26.9]) {
    g.add(box(0.06, 0.08, 18, trim, rx, 3.95, 7));
    g.add(box(0.06, 0.06, 18, trim, rx, 3.55, 7));
    for (let z = -1.8; z <= 15.8; z += 1.6) {
      g.add(box(0.06, 0.9, 0.06, trim, rx, 3.5, z));
    }
  }
  // north stair: descends toward -z down to the B-yard ground
  for (let i = 0; i < 10; i++) {
    const h = 0.3 * (i + 1);
    g.add(box(2.4, h, 0.32, rustMat, 25.8, h / 2, -5.05 + i * 0.32));
  }
  // south stair: descends toward +z down toward CT
  for (let i = 0; i < 10; i++) {
    const h = 0.3 * (i + 1);
    g.add(box(2.4, h, 0.32, rustMat, 25.8, h / 2, 19.0 - i * 0.32));
  }
  // cover tucked under the walkway
  g.add(barrel('blue', 25.6, 0, 1.0));
  g.add(barrel('red', 26.4, 0, 1.8));
  g.add(tire(25.5, 0, 8.5, 0.3));
  g.add(tire(26.3, 0, 9.2, -0.6));
  g.add(crateStack(25.8, 0, 12.8, 2, 0.4));
  g.add(cardboardPile(26.2, 4.8, 1.4));
  g.add(graffitiCard('UP', '#8fbf5a', 1.8, 1.2, 24.56, 1.5, 3.5, -Math.PI / 2));
  // small warning plate on the walkway start
  g.add(box(0.8, 0.5, 0.06, toonMap(paintTexture('#7a6a34', { key: 'flsign' }), {}), 24.62, 3.6, -1.6, -Math.PI / 2));
}
