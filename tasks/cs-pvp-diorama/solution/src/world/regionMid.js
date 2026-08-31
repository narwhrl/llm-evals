// Mid corridor: high concrete walls, half-open double iron gate, shooting
// holes, recessed guard booths with consoles, drainage props, low wall cover,
// and the sewer entrance/exit stubs.
import * as THREE from 'three';
import { Chunk, mesh, decalMesh } from '../core/toon.js';
import { bulletHoleTexture, hazardTexture, roadSignTexture, textDecal } from '../core/textures.js';
import { subChunk, crate, barrel, barbedWire } from './props.js';
import { MID } from '../layout.js';

const F = MID.floor; // -0.8
const TOP = MID.wallTop; // 3.8
const XW = MID.halfWidth + MID.wallThick / 2; // wall center x = 3.9

function gateDoor(sign, ry) {
  // one iron door leaf, hinge at local origin, bars along +x*sign
  const chunk = new Chunk();
  const c = subChunk(chunk, 0, 0, 0, 0);
  const W = 3.1;
  const H = 3.3;
  c.box('gateIron', W, 0.12, 0.1, (sign * W) / 2, 0, 0);
  c.box('gateIron', W, 0.12, 0.1, (sign * W) / 2, H - 0.12, 0);
  c.box('gateIron', W, 0.1, 0.08, (sign * W) / 2, H * 0.5, 0);
  c.box('gateIron', 0.12, H, 0.1, sign * 0.06, 0, 0);
  c.box('gateIron', 0.12, H, 0.1, sign * (W - 0.06), 0, 0);
  for (let i = 1; i < 6; i++) {
    c.box('gateIron', 0.07, H - 0.2, 0.07, sign * (W * i) / 6, 0.1, 0);
  }
  return { chunk, ry };
}

export function buildRegionMid(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();
  const H = TOP - F; // wall height from corridor floor

  // --- west wall segments ----------------------------------------------------
  const westSegs = [
    { z: [-25.5, -23.0] },
    { z: [-21.6, -6.6] },
    { z: [-5.4, -4.0] },
    { z: [-0.8, 19.5] },
  ];
  for (const s of westSegs) {
    const [a, b] = s.z;
    chunk.box('wallB', MID.wallThick, H, b - a, -XW, F, (a + b) / 2);
  }
  // broken crouch hole at the T ramp (z -23..-21.6): sill + lintel
  chunk.box('wallB', MID.wallThick, 0.9 - F, 1.4, -XW, F, -22.3);
  chunk.box('wallB', MID.wallThick, TOP - 0.75, 1.4, -XW, 0.75, -22.3);
  // shooting hole z -6.6..-5.4 at y 2.0..2.9
  chunk.box('wallB', MID.wallThick, 2.0 - F, 1.2, -XW, F, -6.0);
  chunk.box('wallB', MID.wallThick, TOP - 2.9, 1.2, -XW, 2.9, -6.0);

  // --- east wall segments ----------------------------------------------------
  const eastSegs = [
    { z: [-25.5, 0.8] },
    { z: [4.0, 5.4] },
    { z: [6.6, 19.5] },
  ];
  for (const s of eastSegs) {
    const [a, b] = s.z;
    chunk.box('wallB', MID.wallThick, H, b - a, XW, F, (a + b) / 2);
  }
  // shooting hole z 5.4..6.6 at y 2.0..2.9
  chunk.box('wallB', MID.wallThick, 2.0 - F, 1.2, XW, F, 6.0);
  chunk.box('wallB', MID.wallThick, TOP - 2.9, 1.2, XW, 2.9, 6.0);

  // --- booth recesses ---------------------------------------------------------
  // west booth: recess z -4..-0.8, back wall at x -7.4..-6.6
  chunk.box('wallB', MID.wallThick, H, 3.2, -7.0, F, -2.4);
  chunk.box('wallB', 3.1, H, 0.35, -5.05, F, -4.0 + 0.175);
  chunk.box('wallB', 3.1, H, 0.35, -5.05, F, -0.8 - 0.175);
  // east booth: recess z 0.8..4
  chunk.box('wallB', MID.wallThick, H, 3.2, 7.0, F, 2.4);
  chunk.box('wallB', 3.1, H, 0.35, 5.05, F, 0.8 + 0.175);
  chunk.box('wallB', 3.1, H, 0.35, 5.05, F, 4.0 - 0.175);

  for (const side of [-1, 1]) {
    const bx = side * 5.05; // booth interior center x
    const bz = side < 0 ? -2.4 : 2.4;
    const frontX = side * (MID.halfWidth + 0.05); // glass line near corridor
    const c = subChunk(chunk, bx, F, bz, 0);
    // booth floor + ceiling
    c.slab('concreteDark', 3.0, 3.0, 0, 0.01, 0);
    c.box('roofTin', 3.2, 0.12, 3.4, 0, TOP - F, 0);
    // console desk + dark screens + chair
    c.box('metalDark', 1.8, 0.75, 0.5, side * 1.2, 0, 0);
    c.box('windowDark', 0.5, 0.4, 0.06, side * 1.2, 0.78, -0.35, { rx: -0.3 });
    c.box('windowDark', 0.5, 0.4, 0.06, side * 0.6, 0.78, -0.2, { rx: -0.3 });
    c.box('metalDark', 0.45, 0.45, 0.45, side * 0.6, 0, 0.9);
    c.box('metalDark', 0.45, 0.5, 0.08, side * 0.6, 0.45, 1.12);
    // glass front (rainy, dusty) + frame
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.5), mats.glass);
    glass.position.set(frontX, F + 1.65, bz);
    glass.rotation.y = side < 0 ? Math.PI / 2 : -Math.PI / 2;
    g.add(glass);
    chunk.box('metalDark', 0.1, 0.95, 3.0, frontX, F, bz);
    chunk.box('metalDark', 0.1, TOP - (F + 2.4), 3.0, frontX, F + 2.4, bz);
  }

  // --- wall coping strips + vertical panel seams --------------------------------
  chunk.box('concreteDark', 1.0, 0.18, 45.4, -XW, TOP, 0);
  chunk.box('concreteDark', 1.0, 0.18, 45.4, XW, TOP, 0);
  // ribs on the inner faces (skip openings: gate z=0, holes, booth recesses)
  const ribSkip = (z) =>
    Math.abs(z) < 1.2 || // gate
    (z > -7.0 && z < -4.0) || // west shooting hole + booth
    (z > -0.5 && z < 4.5) || // east booth
    (z > 5.0 && z < 7.0) || // east shooting hole
    (z > -23.4 && z < -21.2); // ramp crouch hole
  for (let z = -24.5; z < 19; z += 4.6) {
    if (ribSkip(z)) continue;
    chunk.box('concreteDark', 0.1, H - 0.4, 0.2, -MID.halfWidth + 0.02, F + 0.2, z);
    chunk.box('concreteDark', 0.1, H - 0.4, 0.2, MID.halfWidth - 0.02, F + 0.2, z + 2.3 < 19 ? z + 2.3 : z);
  }

  // --- gate frame + half-open double doors ------------------------------------
  chunk.box('metalDark', 0.5, 4.3, 0.55, -3.35, F, 0);
  chunk.box('metalDark', 0.5, 4.3, 0.55, 3.35, F, 0);
  chunk.box('metalDark', 7.4, 0.45, 0.55, 0, 3.35, 0);
  for (const side of [-1, 1]) {
    const { chunk: doorChunk, ry } = gateDoor(-side, 0);
    const pivot = new THREE.Group();
    const dg = doorChunk.build(mats, { outlineWidth: 0.03 });
    pivot.add(dg);
    pivot.position.set(side * 3.15, F + 0.15, 0);
    pivot.rotation.y = side < 0 ? -0.62 : 0.42; // half open toward T side
    g.add(pivot);
  }

  // --- low wall cover near CT side + crates + fallen road sign -----------------
  chunk.box('concrete', 5.2, 1.1, 0.5, 0, F, 11);
  chunk.box('concreteDark', 5.4, 0.14, 0.6, 0, F + 1.1, 11);
  crate(chunk, -1.6, F, 12.4, 1.0, 0.2);
  crate(chunk, -0.5, F, 12.6, 0.75, -0.35);
  barrel(chunk, 1.7, F, 12.5, 'barrelRust');
  {
    // fallen road sign leaning on the low wall
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6), mats.metalDark);
    pole.position.set(2.3, F + 0.35, 11.9);
    pole.rotation.set(1.2, 0, 0.5);
    pole.castShadow = true;
    g.add(pole);
    const sign = decalMesh(roadSignTexture(), 0.9, 0.9, { lit: true });
    sign.position.set(2.62, F + 0.62, 12.25);
    sign.rotation.set(-0.5, 0.4, 0.15);
    g.add(sign);
  }

  // --- barbed wire on wall tops (CT half) --------------------------------------
  barbedWire(chunk, -XW, TOP + 0.05, 12.75, 15, Math.PI / 2);
  barbedWire(chunk, XW, TOP + 0.05, -12.75, 15, Math.PI / 2);

  // --- sewer entrance below the T ramp (west retaining wall) --------------------
  {
    // arched mouth at x=-3.5 face, z=-24.2
    const c = subChunk(chunk, -3.55, F, -24.2, Math.PI / 2);
    c.box('concreteDark', 1.5, 0.25, 0.5, 0, 0, 0); // threshold step
    // dark stub tunnel heading west
    const stub = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 1.4), mats.windowDark);
    stub.position.set(-4.9, F + 0.35, -24.2);
    g.add(stub);
    // arch frame
    chunk.box('concreteDark', 0.35, 1.5, 0.3, -3.6, F - 0.05, -24.95);
    chunk.box('concreteDark', 0.35, 1.5, 0.3, -3.6, F - 0.05, -23.45);
    chunk.box('concreteDark', 0.35, 0.3, 1.8, -3.6, F + 1.2, -24.2);
    // pipe + trickle water
    chunk.cyl('rust', 0.09, 0.09, 2.6, 6, -4.6, F + 0.9, -24.6, { rz: Math.PI / 2 });
  }
  // --- sewer exit near CT flank: stair pit --------------------------------------
  {
    const c = subChunk(chunk, 6.3, 0, 21.8, 0);
    // pit rim
    c.box('concrete', 2.8, 0.18, 0.3, 0, 0, -1.35);
    c.box('concrete', 2.8, 0.18, 0.3, 0, 0, 1.35);
    c.box('concrete', 0.3, 0.18, 2.4, -1.25, 0, 0);
    c.box('concrete', 0.3, 0.18, 2.4, 1.25, 0, 0);
    // dark interior + tunnel mouth facing north (toward mid)
    const dark = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.9, 2.4), mats.windowDark);
    dark.position.set(6.3, -0.95, 21.8);
    g.add(dark);
    // steps descending southward
    for (let i = 0; i < 5; i++) {
      c.box('concreteDark', 2.0, 0.18, 0.42, 0, -0.28 * (i + 1), -1.0 + i * 0.42);
    }
    // handrail
    c.box('metalDark', 0.05, 0.7, 2.2, 1.1, 0.1, 0);
  }

  // --- wall details: conduit pipes, graffiti, bullet holes -----------------------
  chunk.cyl('rust', 0.05, 0.05, 30, 6, XW + 0.5, 0.6, -2, { rx: Math.PI / 2 });
  const hole1 = decalMesh(bulletHoleTexture(), 1.2, 1.2, { opacity: 0.75 });
  hole1.position.set(-MID.halfWidth - 0.01, F + 1.4, -8.2);
  hole1.rotation.y = Math.PI / 2;
  g.add(hole1);
  const hole2 = decalMesh(bulletHoleTexture(), 1.1, 1.1, { opacity: 0.75 });
  hole2.position.set(MID.halfWidth + 0.01, F + 1.2, 3.4);
  hole2.rotation.y = -Math.PI / 2;
  g.add(hole2);
  const midTag = decalMesh(textDecal('MID', { color: '#8a93a5', size: 70, seed: 81 }), 2.2, 1.0, { opacity: 0.75 });
  midTag.position.set(-MID.halfWidth - 0.01, F + 2.6, -13);
  midTag.rotation.y = Math.PI / 2;
  g.add(midTag);
  // hazard stripes on the gate lintel, both faces
  const hz = hazardTexture();
  hz.repeat.set(6, 1);
  for (const s of [-1, 1]) {
    const hzd = decalMesh(hz, 6.4, 0.42, { opacity: 0.9 });
    hzd.position.set(0, 3.57, s * 0.29);
    if (s < 0) hzd.rotation.y = Math.PI;
    g.add(hzd);
  }

  g.add(chunk.build(mats));
  scene.add(g);
}
