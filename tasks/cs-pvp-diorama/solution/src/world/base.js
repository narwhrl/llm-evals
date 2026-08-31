// Base slab, ground planes, sunken mid corridor shell, ramps, drainage
// channel, perimeter curb, and the puddle reflection layer.
import * as THREE from 'three';
import { Chunk, scaleUV } from '../core/toon.js';
import { PuddleReflector } from './reflector.js';
import { rippleTexture } from '../core/textures.js';
import { BASE, HALF, MID } from '../layout.js';

function puddleMaskTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, S, S);
  // world (x,z) -> canvas px
  const px = (x) => ((x + HALF) / BASE) * S;
  const pz = (z) => ((z + HALF) / BASE) * S;
  const pr = (r) => (r / BASE) * S;
  const blob = (x, z, r, a = 0.95) => {
    const g = ctx.createRadialGradient(px(x), pz(z), 0, px(x), pz(z), pr(r));
    g.addColorStop(0, `rgba(255,255,255,${a})`);
    g.addColorStop(0.7, `rgba(255,255,255,${a * 0.8})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px(x), pz(z), pr(r), 0, Math.PI * 2);
    ctx.fill();
  };
  // scattered puddles (kept off ramps and the sunken corridor)
  blob(0, -27.5, 3.0);
  blob(-6.5, -31, 2.4);
  blob(7, -29.5, 2.8);
  blob(-8, -12, 2.6);
  blob(-20, -3, 3.6);
  blob(-14, -4.5, 1.8);
  blob(-25.5, -1.8, 2.2);
  blob(-32.5, 5, 2.8, 0.85);
  blob(-32, -15, 2.0, 0.85);
  blob(-32.5, 15, 2.2, 0.85);
  blob(-29, -10, 1.6, 0.8);
  blob(21, -7, 3.0);
  blob(15, -5, 1.9);
  blob(26.5, -5.5, 2.2);
  blob(10, -24, 2.4);
  blob(13.5, -2.8, 2.0);
  blob(-5, 29, 3.0);
  blob(3, 31, 2.0);
  blob(10, 27.5, 1.8);
  blob(20, 23.5, 2.4);
  blob(11.8, 10, 1.9);
  blob(11.8, 18, 1.6);
  blob(-22, 23.8, 2.2);
  blob(32, 0, 2.0, 0.8);
  blob(32, -12, 1.8, 0.8);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

export function buildBase(ctx) {
  const { scene, mats, tickers } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();

  // --- diorama plinth + slab --------------------------------------------
  chunk.box('baseSide', BASE + 2.6, 0.55, BASE + 2.6, 0, -2.15, 0);
  chunk.box('baseSide', BASE + 0.8, 1.6, BASE + 0.8, 0, -1.6, 0);

  // --- ground pieces (leave the sunken corridor + ramps open) -----------
  const ground = new Chunk();
  // west field
  ground.slab('asphalt', HALF + MID.halfWidth, BASE, (-HALF - MID.halfWidth) / 2 - 0.0, 0, 0, { uv: [20, 40] });
  // east field
  ground.slab('asphalt', HALF - MID.halfWidth, BASE, (HALF + MID.halfWidth) / 2 + 0.0, 0, 0, { uv: [20, 40] });
  // north/south strips between corridor walls
  ground.slab('asphalt', MID.halfWidth * 2, HALF - 25.5, 0, 0, -(25.5 + HALF) / 2, { uv: [4, 8] });
  ground.slab('asphalt', MID.halfWidth * 2, HALF - 25.5, 0, 0, (25.5 + HALF) / 2, { uv: [4, 8] });
  const groundMesh = ground.build(mats, { outline: false, castShadow: false });
  g.add(groundMesh);

  // --- zone pads ----------------------------------------------------------
  const pads = new Chunk();
  // T spawn concrete pad
  pads.slab('concrete', 24, 9.5, 0, 0.05, -30.25, { uv: [8, 4] });
  // CT spawn concrete pad
  pads.slab('concrete', 28, 10, 0, 0.05, 30, { uv: [9, 4] });
  // A warehouse floor + yard
  pads.slab('concrete', 16, 18, -20, 0.05, -16, { uv: [6, 7] });
  pads.slab('asphaltLight', 17, 6.5, -19.5, 0.04, -3.75, { uv: [7, 3] });
  // west connector walkway (T <-> A)
  pads.slab('asphaltLight', 6.5, 25, -7.75, 0.04, -13, { uv: [3, 10] });
  // B yard + approach
  pads.slab('asphaltLight', 18, 8, 21, 0.04, -7, { uv: [7, 3] });
  pads.slab('asphaltLight', 26, 3.5, 17, 0.04, -23.75, { uv: [10, 2] });
  // alley asphalt
  pads.slab('asphalt', 5, 47, -32.5, 0.03, -1.5, { uv: [2, 18] });
  // alley south link to CT
  pads.slab('asphaltLight', 21, 3.5, -24.5, 0.04, 23.75, { uv: [8, 2] });
  // B->CT shortcut corridor
  pads.slab('asphaltLight', 3.5, 24, 11.75, 0.04, 10, { uv: [2, 9] });
  // CT east yard
  pads.slab('asphalt', 20, 4, 24, 0.03, 23.5, { uv: [8, 2] });
  // east ground under flank walkway
  pads.slab('asphalt', 6, 48, 32, 0.02, 0, { uv: [2, 18] });
  g.add(pads.build(mats, { outline: false, castShadow: false }));

  // --- sunken mid corridor shell ------------------------------------------
  const mid = new Chunk();
  const wallX = MID.halfWidth + MID.wallThick / 2; // 3.9
  const rampLen = Math.hypot(6, MID.floor * -1) + 0.15;
  const rampAng = Math.atan2(-MID.floor, 6);
  // corridor floor
  mid.slab('asphalt', MID.halfWidth * 2, MID.zMax - MID.zMin, 0, MID.floor, 0, { uv: [3, 16] });
  // retaining faces below grade (taller walls are built by the mid region)
  mid.box('concreteDark', 0.4, -MID.floor, MID.zMax - MID.zMin, -MID.halfWidth - 0.2, MID.floor, 0);
  mid.box('concreteDark', 0.4, -MID.floor, MID.zMax - MID.zMin, MID.halfWidth + 0.2, MID.floor, 0);
  // T ramp (descends southward into the corridor)
  mid.box('asphalt', MID.halfWidth * 2, 0.16, rampLen, 0, MID.floor - 0.08 + 0.4, -22.5, { rx: rampAng });
  // CT ramp (descends northward)
  mid.box('asphalt', MID.halfWidth * 2, 0.16, rampLen, 0, MID.floor - 0.08 + 0.4, 22.5, { rx: -rampAng });
  // ramp side retaining walls (below grade; walls above come from regionMid)
  mid.box('concreteDark', 0.4, -MID.floor, 6.4, -MID.halfWidth - 0.2, MID.floor, -22.5);
  mid.box('concreteDark', 0.4, -MID.floor, 6.4, MID.halfWidth + 0.2, MID.floor, -22.5);
  mid.box('concreteDark', 0.4, -MID.floor, 6.4, -MID.halfWidth - 0.2, MID.floor, 22.5);
  mid.box('concreteDark', 0.4, -MID.floor, 6.4, MID.halfWidth + 0.2, MID.floor, 22.5);
  // corridor end caps under ramps (below grade, hidden) — skip.

  // drainage channel along corridor center
  const drainZ0 = -16;
  const drainZ1 = 16;
  mid.box('concreteDark', 1.6, 0.4, drainZ1 - drainZ0, 0, MID.floor - 0.42, (drainZ0 + drainZ1) / 2);
  mid.box('waterDark', 1.3, 0.06, drainZ1 - drainZ0 - 0.4, 0, MID.floor - 0.3, (drainZ0 + drainZ1) / 2);
  // rusty grate bars (leave two open gaps)
  for (let z = drainZ0 + 0.3; z < drainZ1; z += 0.55) {
    if ((z > -2.2 && z < 2.2) || (z > 8.6 && z < 11.2)) continue;
    mid.box('grate', 1.5, 0.05, 0.34, 0, MID.floor - 0.06, z);
  }
  g.add(mid.build(mats));

  // --- worn lane markings on the main circulation routes --------------------
  const paint = new Chunk();
  const dash = (x, z, ry = 0) => paint.box('paintWorn', 1.3, 0.025, 0.18, x, 0.06, z, { ry });
  for (let z = -22; z <= 20; z += 3.2) dash(-7.75, z, Math.PI / 2); // west connector
  for (let z = 2; z <= 20; z += 3.2) dash(11.75, z, Math.PI / 2); // B-CT shortcut
  for (let x = -32; x <= -16; x += 3.2) dash(x, 23.75); // alley south link
  // parking stall lines on the spawn pads
  for (let x = -11; x <= 0; x += 2.2) paint.box('paintWorn', 0.14, 0.025, 3.4, x, 0.06, 31.2);
  for (let x = -10; x <= -2; x += 2.2) paint.box('paintWorn', 0.14, 0.025, 3.0, x, 0.06, -31.5);
  g.add(paint.build(mats, { outline: false, castShadow: false }));

  // --- perimeter curb ------------------------------------------------------
  const curb = new Chunk();
  const cH = 0.32;
  const cW = 0.5;
  const e = HALF - cW / 2 - 0.05;
  curb.box('curbPaint', BASE, cH, cW, 0, 0, -e);
  curb.box('curbPaint', BASE, cH, cW, 0, 0, e);
  curb.box('curbPaint', cW, cH, BASE, -e, 0, 0);
  curb.box('curbPaint', cW, cH, BASE, e, 0, 0);
  g.add(curb.build(mats, { outlineWidth: 0.035 }));

  g.add(chunk.build(mats));
  scene.add(g);

  // --- puddle reflection layer --------------------------------------------
  const reflector = new PuddleReflector(new THREE.PlaneGeometry(BASE, BASE), {
    textureWidth: ctx.quality.reflect,
    textureHeight: ctx.quality.reflect,
    mask: puddleMaskTexture(),
    ripple: rippleTexture(),
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.09;
  reflector.renderOrder = 2;
  scene.add(reflector);
  tickers.push((t) => {
    reflector.material.uniforms.uTime.value = t;
  });

  return { reflector };
}
