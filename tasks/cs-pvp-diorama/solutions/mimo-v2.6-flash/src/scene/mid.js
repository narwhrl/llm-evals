import * as THREE from 'three';
import { COLORS } from '../palette.js';
import { toon, toonMap } from '../materials.js';
import { concreteTexture, rustTexture, paintTexture } from '../textures.js';
import { box, card, group, addBulletHoleCluster } from './helpers.js';
import { crateStack, graffitiCard, bulletMat, pallet, crate, barrel, glowSprite } from './props.js';

// Central duel lane: x -4.75..4.75, running north-south; iron gate at z = -2.
export function buildMid(ctx) {
  const { group: g, rng } = ctx;
  const wallTex = toonMap(concreteTexture('#7a8087', 'midw'), {});
  wallTex.map.repeat.set(4, 1.2);
  const wallMat = wallTex;
  const trim = toon(COLORS.steelDark);
  const grateMat = toonMap(rustTexture('#6a5a4a', 'grate'), {});
  const platMat = toonMap(concreteTexture('#888d94', 'midplat'), {});

  // ---- High concrete walls with elevated firing holes (z -8..2, |x| = 5) ----
  function highWall(x) {
    // segments along z: [-8,-3.7], hole zone [-3.7,-2.3], [-2.3,2]
    g.add(box(0.5, 4.6, 4.3, wallMat, x, 2.3, -5.85));
    g.add(box(0.5, 4.6, 4.3, wallMat, x, 2.3, -0.15));
    g.add(box(0.5, 2.75, 1.4, wallMat, x, 1.375, -3)); // below hole (y 0..2.75)
    g.add(box(0.5, 1.35, 1.4, wallMat, x, 3.925, -3)); // above hole (y 3.25..4.6)
    g.add(box(0.42, 0.5, 1.4, toon(0x0a0d12), x, 3.0, -3)); // dark embrasure void
    g.add(box(0.7, 0.18, 10.2, toon(COLORS.concreteDark), x, 4.66, -3)); // cap
  }
  highWall(-5);
  highWall(5);

  // Elevated platforms reaching the holes + stairs from the yard side.
  g.add(box(2.2, 3.0, 3.6, platMat, -6.3, 1.5, -3)); // west deck, top y 3.0
  g.add(box(2.2, 3.0, 3.6, platMat, 6.3, 1.5, -3)); // east deck
  function stairsUp(x, zBottom) {
    const steps = 8;
    const stepH = 0.375;
    const stepD = 0.42;
    for (let i = 0; i < steps; i++) {
      const h = stepH * (i + 1); // solid stringer steps
      g.add(box(2.2, h, stepD, platMat, x, h / 2, zBottom - i * stepD));
    }
  }
  stairsUp(-6.3, 1.95); // top step meets deck south edge (z ≈ -1)
  stairsUp(6.3, 1.95);
  // railings on the outer edges of the decks
  g.add(box(0.06, 0.9, 3.6, trim, -7.4, 3.45, -3));
  g.add(box(0.06, 0.9, 3.6, trim, 7.4, 3.45, -3));
  g.add(box(2.2, 0.06, 0.06, trim, -6.3, 3.9, -4.75));
  g.add(box(2.2, 0.06, 0.06, trim, 6.3, 3.9, -4.75));

  // ---- Double iron gate, half open (z = -2) ----
  const gateMat = toonMap(rustTexture('#5a5048', 'gate'), {});
  // posts flush with the corridor walls
  g.add(box(0.4, 4.8, 0.5, trim, -4.55, 2.4, -2));
  g.add(box(0.4, 4.8, 0.5, trim, 4.55, 2.4, -2));
  g.add(box(9.5, 0.35, 0.5, trim, 0, 4.75, -2)); // lintel over the gate
  function gateLeaf(hingeX, dir, openAngle) {
    const hinge = new THREE.Group();
    const len = 4.3;
    hinge.add(box(len, 4.4, 0.12, gateMat, dir * (len / 2), 2.2, 0));
    const brace = box(len * 1.02, 0.16, 0.16, trim, dir * (len / 2), 2.2, 0.05);
    brace.rotation.z = dir * 1.02;
    hinge.add(brace);
    const brace2 = box(len * 1.02, 0.16, 0.16, trim, dir * (len / 2), 2.2, -0.05);
    brace2.rotation.z = -dir * 1.02;
    hinge.add(brace2);
    hinge.position.set(hingeX, 0, -2);
    hinge.rotation.y = -dir * openAngle; // both leaves swing south
    g.add(hinge);
  }
  gateLeaf(-4.35, 1, 0.38); // west leaf ~22° open
  gateLeaf(4.35, -1, 0.1); // east leaf nearly shut → mid duel gap

  // ---- Drainage ditch with rusty grate along the lane axis ----
  g.add(box(1.4, 0.05, 14, toon(0x0c0e12), 0, 0.04, 1)); // trench strip z -6..8
  for (let z = -6; z <= 8; z += 0.5) {
    g.add(box(1.4, 0.07, 0.14, grateMat, 0, 0.09, z));
  }
  g.add(box(0.1, 0.08, 14.2, grateMat, -0.65, 0.1, 1));
  g.add(box(0.1, 0.08, 14.2, grateMat, 0.65, 0.1, 1));

  // ---- Guard booths flanking the lane (just outside the high walls) ----
  function booth(x, z, ry) {
    const b = group();
    const shell = toonMap(paintTexture('#5a6a72', { key: 'booth' }), {});
    b.add(box(2.2, 2.6, 2.0, shell, 0, 1.3, 0));
    b.add(box(2.5, 0.15, 2.3, trim, 0, 2.68, 0));
    b.add(card(1.5, 1.0, new THREE.MeshBasicMaterial({ color: 0x10161f }), 0, 1.7, 1.02, 0, 0));
    b.add(card(1.5, 1.0, new THREE.MeshBasicMaterial({
      color: 0x8aa2c4, transparent: true, opacity: 0.22, depthWrite: false,
    }), 0, 1.7, 1.04, 0, 0));
    // abandoned console + chair inside
    b.add(box(1.4, 0.5, 0.5, toon(0x2a3038), 0, 0.9, 0.4));
    b.add(box(0.5, 0.1, 0.5, toon(0x3a4a5a), 0, 0.55, -0.35));
    b.add(box(0.5, 0.5, 0.1, toon(0x3a4a5a), 0, 0.8, -0.6));
    b.add(box(1.2, 0.08, 0.08, new THREE.MeshBasicMaterial({ color: 0x7fe8a0 }), 0, 1.15, 0.55));
    b.position.set(x, 0, z);
    b.rotation.y = ry;
    return b;
  }
  g.add(booth(-8.6, 3.4, Math.PI / 2)); // window faces the lane (east)
  g.add(booth(8.6, 3.4, -Math.PI / 2)); // window faces the lane (west)
  g.add(glowSprite(0x7fe8a0, 0.8, -7.5, 1.3, 3.4, 0.25));
  g.add(glowSprite(0x7fe8a0, 0.8, 7.5, 1.3, 3.4, 0.25));

  // ---- CT-side low cover: broken wall + crates + old road sign ----
  g.add(box(4.5, 1.3, 0.45, wallMat, 1.8, 0.65, 9.5));
  g.add(box(0.45, 1.3, 2.2, wallMat, -0.2, 0.65, 8.6));
  g.add(crateStack(3.4, 0, 10.8, 2, 0.3));
  g.add(crateStack(0.6, 0, 11.2, 1, -0.4));
  g.add(box(0.08, 2.4, 0.08, trim, -2.6, 1.2, 10.4));
  g.add(box(1.0, 0.7, 0.06, toonMap(paintTexture('#3a5a4a', { key: 'rsign' }), {}), -2.6, 2.4, 10.4, 0.2));

  // ---- T-side cover near the ramp mouth ----
  g.add(pallet(-3.4, 0, -8.6, 0.7));
  g.add(barrel('blue', 3.6, 0, -8.2));
  const midCrate = crate(1.4, 0.5);
  midCrate.position.set(3.2, 0, -6.4);
  g.add(midCrate);

  // ---- Sewer: entrance headwall under the T ramp + exit at CT flank ----
  const portalMat = toonMap(rustTexture('#4a4a4e', 'portal'), {});
  g.add(box(2.0, 1.5, 0.5, portalMat, 0, 0.75, -10.8));
  g.add(card(1.5, 1.0, new THREE.MeshBasicMaterial({ color: 0x05070a }), 0, 0.55, -10.53, 0, 0));
  for (let x = -0.6; x <= 0.6; x += 0.3) {
    g.add(box(0.06, 1.0, 0.06, grateMat, x, 0.55, -10.5));
  }
  ctx.drips.push({ x: -0.9, y: 1.4, z: -10.6 });
  ctx.drips.push({ x: 0.9, y: 1.4, z: -10.6 });
  // covered run from the headwall down to the main ditch
  for (let z = -10.2; z <= -6.4; z += 0.55) {
    g.add(box(1.1, 0.06, 0.14, grateMat, 0, 0.08, z));
  }
  // exit headwall on the CT spawn flank
  g.add(box(0.5, 1.4, 1.8, portalMat, 5.6, 0.7, 15.6));
  g.add(card(1.0, 0.9, new THREE.MeshBasicMaterial({ color: 0x05070a }), 5.33, 0.5, 15.6, 0, -Math.PI / 2));
  // feeder grates linking the exit to the lane ditch
  for (let z = 9.9; z <= 15; z += 0.55) {
    g.add(box(0.9, 0.06, 0.14, grateMat, 4.4, 0.08, z));
  }
  for (let x = 0.8; x <= 4.4; x += 0.55) {
    g.add(box(0.14, 0.06, 0.9, grateMat, x, 0.08, 9.4));
  }

  // ---- Graffiti & bullet scars ----
  g.add(graffitiCard('MID', '#4fa8b8', 2.4, 1.3, -4.74, 2.0, -6.5, Math.PI / 2));
  g.add(graffitiCard('NO PASS', '#c45a8a', 2.6, 1.2, 4.74, 1.8, 0.6, -Math.PI / 2));
  addBulletHoleCluster(g, bulletMat(), -4.74, 1.4, -5.5, Math.PI / 2, 5, rng);
  addBulletHoleCluster(g, bulletMat(), 4.74, 1.6, -6.2, -Math.PI / 2, 5, rng);
  addBulletHoleCluster(g, bulletMat(), 1.4, 1.0, 9.28, 0, 3, rng);
}
