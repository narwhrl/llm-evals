// A bombsite (northwest): big half-open warehouse. Roller shutter half-raised
// on the south face, boarded windows + side door on the east face, red-lit
// rear door on the north face, loft with ladder, shelves, forklift, central
// peek column, bombsite marking, and the narrow passage to the west alley.
import * as THREE from 'three';
import { Chunk, mesh, decalMesh } from '../core/toon.js';
import { textDecal, bombsiteTexture, bulletHoleTexture } from '../core/textures.js';
import {
  subChunk,
  crate,
  barrel,
  pallet,
  cardboardPile,
  sandbags,
  shelfUnit,
  forklift,
  ladder,
  trashBin,
  acUnit,
  jerseyBarrier,
  downspout,
} from './props.js';

export function buildRegionA(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();
  const T = 0.4; // wall thickness
  const H = 7;

  const x0 = -28;
  const x1 = -12;
  const z0 = -25;
  const z1 = -7;

  // --- south wall (z1) with roller shutter opening x -24..-18, h 4.5 ------
  chunk.box('wallA', -24 - x0, H, T, (x0 + -24) / 2, 0, z1); // left
  chunk.box('wallA', x1 - -18, H, T, (-18 + x1) / 2, 0, z1); // right
  chunk.box('wallA', 6, H - 4.5, T, -21, 4.5, z1); // lintel

  // --- east wall (x1) with 2 windows + side door ---------------------------
  const ez = [
    [-25, -19.6], [-18, -15.55], [-14.45, -11.6], [-10, -7],
  ];
  for (const [a, b] of ez) chunk.box('wallA', T, H, b - a, x1, 0, (a + b) / 2);
  for (const [a, b] of [[-19.6, -18], [-11.6, -10]]) {
    chunk.box('wallA', T, 1.4, b - a, x1, 0, (a + b) / 2);
    chunk.box('wallA', T, H - 2.8, b - a, x1, 2.8, (a + b) / 2);
  }
  chunk.box('wallA', T, H - 2.2, 1.1, x1, 2.2, -15); // over door
  // boarded windows (crossed planks)
  for (const wz of [-18.8, -10.8]) {
    const c = subChunk(chunk, x1 + 0.05, 0, wz, Math.PI / 2);
    c.box('woodDark', 1.7, 0.18, 0.05, 0, 1.45, 0, { rz: 0.28 });
    c.box('woodDark', 1.7, 0.18, 0.05, 0, 1.9, 0, { rz: -0.22 });
    c.box('woodDark', 1.7, 0.16, 0.05, 0, 2.35, 0, { rz: 0.12 });
  }
  // side door (inward-opening, ajar)
  {
    const door = mesh(new THREE.BoxGeometry(0.06, 2.16, 1.06), mats.metalDark);
    door.position.set(x1 - 0.32, 1.08, -15.42);
    door.rotation.y = 0.65;
    g.add(door);
    // door frame + step
    chunk.box('metalDark', T + 0.14, 0.1, 1.3, x1, 2.2, -15);
    chunk.box('concrete', 1.0, 0.14, 1.5, x1 + 0.5, 0, -15);
    // small canopy
    chunk.box('roofTin', 1.8, 0.1, 1.6, x1 + 0.6, 2.6, -15, { rz: -0.1 });
  }

  // --- north wall (z0) with rear door x -26.6..-25.4 -----------------------
  chunk.box('wallA', -26.6 - x0, H, T, (x0 + -26.6) / 2, 0, z0);
  chunk.box('wallA', x1 - -25.4, H, T, (-25.4 + x1) / 2, 0, z0);
  chunk.box('wallA', 1.2, H - 2.3, T, -26, 2.3, z0);
  {
    // dark rear nook + red glow slit + half-open door
    chunk.box('windowDark', 1.3, 2.3, 1.6, -26, 0, z0 - 1.0);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 2.1), mats.glowRedDim);
    glow.position.set(-26, 1.15, z0 - 0.45);
    g.add(glow);
    const door = mesh(new THREE.BoxGeometry(1.14, 2.24, 0.07), mats.rust);
    door.position.set(-26.55, 1.12, z0 + 0.28);
    door.rotation.y = 0.5;
    g.add(door);
  }

  // --- west wall (x0), solid ------------------------------------------------
  chunk.box('wallA', T, H, z1 - z0, x0, 0, (z0 + z1) / 2);

  // --- roof: gable + gable-end triangles ------------------------------------
  const rise = 2.4;
  const slope = Math.atan2(rise, 8.4);
  const ridgeX = -20;
  const slopeLen = Math.hypot(8.4, rise) + 0.15;
  chunk.box('roofTin', slopeLen, 0.14, z1 - z0 + 0.9, ridgeX + 4.2, H + rise / 2, (z0 + z1) / 2, { rz: -slope });
  chunk.box('roofTin', slopeLen, 0.14, z1 - z0 + 0.9, ridgeX - 4.2, H + rise / 2, (z0 + z1) / 2, { rz: slope });
  for (const gz of [z0 + T / 2, z1 - T / 2]) {
    const shape = new THREE.Shape();
    shape.moveTo(x0, H);
    shape.lineTo(x1, H);
    shape.lineTo(ridgeX, H + rise);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: T, bevelEnabled: false });
    const m = new THREE.Matrix4().setPosition(0, 0, gz - T / 2);
    chunk.add(geo, m, 'wallA');
  }
  // eave gutters + downspouts
  chunk.box('rust', 0.22, 0.12, z1 - z0 + 0.9, x1 + 0.45, H - 0.06, (z0 + z1) / 2);
  chunk.box('rust', 0.22, 0.12, z1 - z0 + 0.9, x0 - 0.45, H - 0.06, (z0 + z1) / 2);
  const drip1 = downspout(chunk, x1 + 0.5, H - 0.1, -9);
  const drip2 = downspout(chunk, x0 - 0.5, H - 0.1, -23);
  // roof clutter: vents, pipe, skylight frame (seated on the raised slopes)
  chunk.box('metalDark', 1.2, 0.7, 1.2, -24.5, 8.1, -20);
  chunk.cyl('rust', 0.1, 0.1, 1.2, 6, -24.5, 8.8, -20);
  chunk.box('metal', 1.6, 0.5, 0.9, -15.6, 8.1, -12.5);
  chunk.cyl('rust', 0.14, 0.14, 0.9, 6, -16.4, 7.95, -17.5);
  chunk.box('metalDark', 2.0, 0.22, 1.4, -16.2, 7.95, -19.5); // skylight frame
  chunk.box('glass', 1.8, 0.1, 1.2, -16.2, 8.1, -19.5);

  // --- interior -------------------------------------------------------------
  // central peek column
  chunk.box('concrete', 0.95, H, 0.95, -20.5, 0, -15);
  chunk.box('concreteDark', 1.25, 0.5, 1.25, -20.5, 0, -15);
  // shelves along north wall + west wall
  shelfUnit(chunk, -24.5, 0, -23.9, 3.6, 0);
  shelfUnit(chunk, -19.5, 0, -23.9, 3.6, 0);
  shelfUnit(chunk, -26.9, 0, -18, 3.4, Math.PI / 2);
  // forklift angled near shutter
  forklift(chunk, -17.2, 0, -10.6, -2.1);
  // crate + sack clusters
  crate(chunk, -16.4, 0, -17.5, 1.15, 0.2);
  crate(chunk, -16.2, 0, -16.1, 0.9, -0.3);
  crate(chunk, -16.5, 1.15, -17.4, 0.75, 0.5);
  sandbags(chunk, -23.5, 0, -13.5, 0.4);
  sandbags(chunk, -15.2, 0, -21.5, 1.2, 2);
  pallet(chunk, -14.2, 0, -13.2, 0.15);
  // sorting table corner + broken boxes
  {
    const c = subChunk(chunk, -26.3, 0, -9.3, 0.1);
    c.box('metalDark', 2.0, 0.08, 0.9, 0, 0.85, 0);
    for (const [sx, sz] of [[-0.9, -0.35], [0.9, -0.35], [-0.9, 0.35], [0.9, 0.35]]) {
      c.box('metalDark', 0.07, 0.85, 0.07, sx, 0, sz);
    }
    c.box('cardboard', 0.55, 0.4, 0.45, -0.4, 0.93, 0, { ry: 0.3 });
    c.box('cardboard', 0.5, 0.3, 0.4, 0.35, 0.93, 0.05, { ry: -0.5 });
  }
  cardboardPile(chunk, -24.6, 0, -8.6, 0.8);
  // loft (sheet-metal attic) in the NE interior corner
  {
    const c = subChunk(chunk, -13.6, 0, -22.5, 0);
    c.box('sheetMetal2', 2.5, 0.14, 4.4, 0, 4.2, 0); // deck
    for (const [sx, sz] of [[-1.15, -2.05], [1.15, -2.05], [-1.15, 2.05], [1.15, 2.05]]) {
      c.box('metalDark', 0.14, 4.2, 0.14, sx, 0, sz);
    }
    // half-walls with a lookout window facing south (over site + shutter)
    c.box('sheetMetal2', 2.5, 0.42, 0.1, 0, 4.34, 2.13);
    c.box('sheetMetal2', 0.72, 1.1, 0.1, -0.89, 4.34, 2.13);
    c.box('sheetMetal2', 0.72, 1.1, 0.1, 0.89, 4.34, 2.13);
    c.box('sheetMetal2', 2.5, 0.35, 0.1, 0, 5.45, 2.13);
    c.box('sheetMetal2', 0.1, 1.1, 4.4, -1.2, 4.34, 0); // west rail
    // crates on the loft
    c.box('wood', 0.7, 0.7, 0.7, 0.5, 4.34, -1.4, { ry: 0.3 });
  }
  ladder(chunk, -14.5, 0, -20.6, 4.35, 0, 0); // vertical iron ladder to loft
  // hanging cold-white fixtures
  for (const fz of [-12, -20]) {
    chunk.cyl('metalDark', 0.02, 0.02, 1.0, 4, -20, 6.0, fz);
    chunk.box('metalDark', 1.3, 0.09, 0.24, -20, 5.92, fz);
    chunk.box('lampCold', 1.2, 0.05, 0.16, -20, 5.87, fz);
  }

  // --- bombsite marking + floor litter --------------------------------------
  const mark = decalMesh(bombsiteTexture('A'), 4.6, 4.6);
  mark.rotation.x = -Math.PI / 2;
  mark.rotation.z = 0.15;
  mark.position.set(-17.6, 0.07, -13.2);
  g.add(mark);
  const paper1 = decalMesh(textDecal('////', { color: '#b9b4a4', size: 60, seed: 61 }), 1.6, 0.8, { opacity: 0.85 });
  paper1.rotation.x = -Math.PI / 2;
  paper1.rotation.z = 1.2;
  paper1.position.set(-18.5, 0.07, -13);
  g.add(paper1);
  const holes = decalMesh(bulletHoleTexture(), 1.6, 1.6);
  holes.position.set(-20.02, 1.5, -15);
  holes.rotation.y = Math.PI / 2;
  g.add(holes);
  const holes2 = decalMesh(bulletHoleTexture(), 1.9, 1.9);
  holes2.position.set(-16.5, 1.7, z1 - 0.21);
  holes2.rotation.y = Math.PI;
  g.add(holes2);

  // --- wall vent (steams) on the east face --------------------------------------
  chunk.box('metalDark', 0.5, 0.7, 0.9, x1 + 0.2, 3.3, -13);
  for (let i = 0; i < 4; i++) chunk.box('metal', 0.1, 0.08, 0.8, x1 + 0.42, 3.42 + i * 0.14, -13);
  ctx.steamPoints.push(new THREE.Vector3(x1 + 0.7, 3.55, -13));

  // --- west narrow passage props (AC, freight sign, trash) -------------------
  acUnit(chunk, -28.75, 1.15, -10.5);
  chunk.box('metalDark', 1.0, 0.08, 0.5, -28.75, 1.02, -10.5);
  trashBin(chunk, -29.1, 0, -8.2);
  pallet(chunk, -29, 0, -21.5, 0.9);
  barrel(chunk, -29.1, 0, -12.3, 'barrelRust');

  // --- yard cover -------------------------------------------------------------
  jerseyBarrier(chunk, -14.2, 0, -4.4, 0.12);
  crate(chunk, -24.8, 0, -4.2, 1.1, -0.1);
  crate(chunk, -24.9, 1.1, -4.1, 0.8, 0.25);
  barrel(chunk, -13.2, 0, -2.2);
  barrel(chunk, -12.5, 0, -3.0, 'barrelRust');

  // yard graffiti: big A on the yard ground + tag on south wall exterior
  const gA = decalMesh(textDecal('A', { color: '#c8452e', size: 150, seed: 71 }), 3.2, 3.2);
  gA.rotation.x = -Math.PI / 2;
  gA.rotation.z = -0.2;
  gA.position.set(-19, 0.06, -3.4);
  g.add(gA);
  const tag = decalMesh(textDecal('EAGLE', { color: '#7d89a8', size: 64, seed: 72 }), 3.0, 1.1, { opacity: 0.8 });
  tag.position.set(-21, 1.5, z1 + 0.21);
  g.add(tag);

  // freight sign board at the passage entrance
  {
    const c = subChunk(chunk, -29, 0, -5.8, Math.PI / 2);
    c.box('metalDark', 0.08, 2.2, 0.08, -0.8, 0, 0);
    c.box('metalDark', 0.08, 2.2, 0.08, 0.8, 0, 0);
    c.box('metalDark', 2.2, 1.1, 0.06, 0, 1.7, 0);
  }

  // work-lamp fixture above the shutter
  chunk.box('metalDark', 0.5, 0.18, 0.3, -21, 5.55, z1 + 0.28);
  chunk.box('lampCold', 0.4, 0.06, 0.22, -21, 5.44, z1 + 0.32);

  g.add(chunk.build(mats));
  scene.add(g);

  // --- dynamic: half-raised roller shutter (vibrates occasionally) ----------
  const shutter = new THREE.Group();
  const slatH = 0.32;
  const slatCount = 8; // spans y 2.3..4.86 hanging from the lintel
  for (let i = 0; i < slatCount; i++) {
    const slat = mesh(new THREE.BoxGeometry(5.9, slatH - 0.03, 0.09), mats.metal, { outlineWidth: 0.03 });
    slat.position.set(-21, 2.3 + slatH / 2 + i * slatH, z1 + 0.12);
    shutter.add(slat);
  }
  const housing = mesh(new THREE.BoxGeometry(6.4, 0.6, 0.7), mats.rust);
  housing.position.set(-21, 4.75, z1 + 0.2);
  shutter.add(housing);
  scene.add(shutter);
  ctx.drips.push(
    { from: new THREE.Vector3(-23.5, 2.28, z1 + 0.2), to: 0.09 },
    { from: new THREE.Vector3(-19.0, 2.28, z1 + 0.2), to: 0.09 },
    { from: drip1, to: 0.09 },
    { from: drip2, to: 0.09 }
  );
  ctx.tickers.push((t) => {
    // brief rattle every ~7 s
    const phase = t % 7;
    const amp = phase < 0.6 ? Math.sin(phase * 90) * 0.012 * (1 - phase / 0.6) : 0;
    shutter.position.y = amp;
  });

  return { dripPoints: [drip1, drip2] };
}
