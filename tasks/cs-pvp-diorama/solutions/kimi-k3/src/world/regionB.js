// B bombsite (northeast): two-story sheet-metal house with a guard room,
// fire ladder to the second-floor balcony, open yard with improvised cover,
// the corner street lamp, and the low-wall shortcut toward CT.
import * as THREE from 'three';
import { Chunk, mesh, decalMesh } from '../core/toon.js';
import { bombsiteTexture, scheduleTexture, textDecal, bulletHoleTexture } from '../core/textures.js';
import {
  subChunk,
  wallSeg,
  crate,
  barrel,
  pallet,
  trashBin,
  bicycle,
  ironTableSet,
  ladder,
  downspout,
} from './props.js';
import { B } from '../layout.js';

export function buildRegionB(ctx) {
  const { scene, mats } = ctx;
  const g = new THREE.Group();
  const chunk = new Chunk();
  const T = 0.35;
  const { xMin, xMax, zMin, zMax } = B; // 16..28, -22..-11
  const FH = B.floorH; // 3.4
  const H = FH * 2; // wall top 6.8

  // --- south face (zMax): door + 3 windows on 1F, 3 windows on 2F -----------
  wallSeg(chunk, 'sheetMetal', true, zMax, xMin, xMax, 0, H, T, [
    { a: 18.5, b: 19.5, y0: 0, y1: 2.1 }, // front door
    { a: 21.3, b: 22.7, y0: 1.1, y1: 2.3 }, // window 1
    { a: 23.3, b: 24.7, y0: 1.1, y1: 2.3 }, // window 2
    { a: 25.3, b: 26.7, y0: 1.1, y1: 2.3 }, // window 3
    { a: 18.2, b: 19.4, y0: 4.6, y1: 5.8 }, // 2F windows
    { a: 21.7, b: 22.9, y0: 4.6, y1: 5.8 },
    { a: 25.2, b: 26.4, y0: 4.6, y1: 5.8 },
  ]);
  // --- north face (zMin): back door ------------------------------------------
  wallSeg(chunk, 'sheetMetal', true, zMin, xMin, xMax, 0, H, T, [
    { a: 23.5, b: 24.5, y0: 0, y1: 2.1 },
    { a: 17.5, b: 18.7, y0: 4.6, y1: 5.8 },
    { a: 26.0, b: 27.2, y0: 4.6, y1: 5.8 },
  ]);
  // --- west face (xMin) --------------------------------------------------------
  wallSeg(chunk, 'sheetMetal', false, xMin, zMin, zMax, 0, H, T, [
    { a: -19.5, b: -18.3, y0: 4.6, y1: 5.8 },
    { a: -14.5, b: -13.3, y0: 1.1, y1: 2.3 },
  ]);
  // --- east face (xMax) --------------------------------------------------------
  wallSeg(chunk, 'sheetMetal', false, xMax, zMin, zMax, 0, H, T, [
    { a: -17.2, b: -16.0, y0: 4.6, y1: 5.8 },
  ]);

  // glass panes + frames in the 1F south windows; dark glass on 2F
  for (const wx of [22.0, 24.0, 26.0]) {
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.1), mats.glass);
    glass.position.set(wx, 1.7, zMax + 0.02);
    g.add(glass);
    chunk.box('metalDark', 1.5, 0.08, 0.1, wx, 2.26, zMax);
    chunk.box('metalDark', 1.5, 0.08, 0.1, wx, 1.06, zMax);
  }
  for (const [wx, wz, ry] of [
    [18.8, zMax, 0], [22.3, zMax, 0], [25.8, zMax, 0],
    [18.1, zMin, 0], [26.6, zMin, 0],
  ]) {
    const dark = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mats.windowDark);
    dark.position.set(wx, 5.2, wz + (wz === zMax ? 0.02 : -0.02));
    if (wz === zMin) dark.rotation.y = Math.PI;
    g.add(dark);
  }
  {
    const darkW = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mats.windowDark);
    darkW.position.set(xMin - 0.02, 5.2, -18.9);
    darkW.rotation.y = -Math.PI / 2;
    g.add(darkW);
    // one dim warm window on 2F east face
    const warm = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mats.windowWarm);
    warm.position.set(xMax + 0.02, 5.2, -16.6);
    warm.rotation.y = Math.PI / 2;
    g.add(warm);
    const dark1FW = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mats.glass);
    dark1FW.position.set(xMin - 0.02, 1.7, -13.9);
    dark1FW.rotation.y = -Math.PI / 2;
    g.add(dark1FW);
  }

  // doors (front ajar, back closed)
  {
    const front = mesh(new THREE.BoxGeometry(0.95, 2.05, 0.07), mats.metalDark);
    front.position.set(19.15, 1.02, zMax + 0.35);
    front.rotation.y = 0.75;
    g.add(front);
    const back = mesh(new THREE.BoxGeometry(0.95, 2.05, 0.07), mats.rust);
    back.position.set(24, 1.02, zMin + 0.05);
    g.add(back);
  }

  // horizontal band between floors + corner posts + parapet roof
  chunk.box('sheetMetal2', xMax - xMin + 0.2, 0.35, zMax - zMin + 0.2, (xMin + xMax) / 2, FH - 0.17, (zMin + zMax) / 2);
  for (const [cx, cz] of [[xMin, zMin], [xMax, zMin], [xMin, zMax], [xMax, zMax]]) {
    chunk.box('rust', 0.28, H, 0.28, cx, 0, cz);
  }
  // roof slab + parapet + clutter
  chunk.box('roofTin', xMax - xMin, 0.16, zMax - zMin, (xMin + xMax) / 2, H, (zMin + zMax) / 2);
  chunk.box('sheetMetal2', xMax - xMin, 0.45, 0.18, (xMin + xMax) / 2, H + 0.16, zMin + 0.09);
  chunk.box('sheetMetal2', xMax - xMin, 0.45, 0.18, (xMin + xMax) / 2, H + 0.16, zMax - 0.09);
  chunk.box('sheetMetal2', 0.18, 0.45, zMax - zMin, xMin + 0.09, H + 0.16, (zMin + zMax) / 2);
  chunk.box('sheetMetal2', 0.18, 0.45, zMax - zMin, xMax - 0.09, H + 0.16, (zMin + zMax) / 2);
  // roof vent (steam source) + pipe
  chunk.box('metalDark', 1.0, 0.7, 1.0, 20, H + 0.16, -18);
  chunk.cyl('rust', 0.12, 0.12, 1.1, 8, 25.5, H + 0.16, -19);
  chunk.cyl('rust', 0.2, 0.2, 0.25, 8, 25.5, H + 1.26, -19);
  ctx.steamPoints.push(new THREE.Vector3(20, H + 0.95, -18));
  const dripB = downspout(chunk, xMax + 0.35, H - 0.1, -12.2);
  ctx.drips.push({ from: dripB, to: 0.09 });

  // --- balcony on the south face (2F) + fire ladder ---------------------------
  {
    const c = subChunk(chunk, 22, 0, zMax + 0.65, 0);
    c.box('metalDark', 11, 0.12, 1.3, 0, FH - 0.12, 0);
    // railing
    for (let i = -5; i <= 5; i++) c.box('metalDark', 0.05, 0.9, 0.05, i, FH, 0.6);
    c.box('metalDark', 11, 0.06, 0.06, 0, FH + 0.9, 0.6);
    c.box('metalDark', 0.06, 0.9, 1.3, -5.5, FH, 0);
    c.box('metalDark', 0.06, 0.9, 1.3, 5.5, FH, 0);
    // support brackets
    for (const bx of [-4, 0, 4]) c.box('metalDark', 0.1, 0.5, 0.1, bx, FH - 0.65, 0.35, { rx: 0.6 });
    // balcony clutter
    c.box('cardboard', 0.5, 0.4, 0.4, -4.5, FH, 0.1, { ry: 0.3 });
  }
  ladder(chunk, 26.9, 0, zMax + 0.45, FH + 0.9, 0, 0); // fire ladder to balcony

  // --- guard room interior (1F) ------------------------------------------------
  {
    const c = subChunk(chunk, 22, 0, -16.5, 0);
    // desk against west wall
    c.box('deskWood', 1.8, 0.08, 0.8, -3.0, 0.72, -1.0);
    c.box('deskWood', 0.5, 0.72, 0.8, -3.55, 0, -1.0);
    c.box('deskWood', 0.08, 0.72, 0.8, -2.2, 0, -1.0);
    // desktop: radio, coffee cans, newspaper
    c.box('metalDark', 0.34, 0.16, 0.2, -3.1, 0.8, -1.15, { ry: 0.3 });
    c.cyl('plasticWhite', 0.05, 0.05, 0.12, 8, -2.7, 0.8, -0.8);
    c.cyl('plasticRed', 0.05, 0.05, 0.11, 8, -2.55, 0.8, -0.95);
    c.box('paper', 0.5, 0.02, 0.35, -3.0, 0.8, -0.6, { ry: -0.2 });
    // overturned office chair
    c.box('metalDark', 0.5, 0.08, 0.5, -1.6, 0.35, 0.6, { rz: Math.PI / 2 - 0.15 });
    c.box('metalDark', 0.5, 0.55, 0.08, -1.28, 0.12, 0.6, { rz: 0 });
    c.cyl('metalDark', 0.03, 0.03, 0.5, 6, -1.85, 0.02, 0.6, { rz: 1.3 });
    // metal locker in corner
    c.box('shelfMetal', 0.8, 2.0, 0.5, 3.2, 0, -3.2);
    c.box('metalDark', 0.06, 1.9, 0.45, 2.82, 0.05, -3.2);
  }
  // duty schedule decal on inner north wall
  const sched = decalMesh(scheduleTexture(), 0.9, 1.15, { opacity: 0.95 });
  sched.position.set(21, 1.6, zMin + 0.19);
  g.add(sched);
  // hanging broken fluorescent (dynamic sway + flicker) — built in lights.js? keep mesh here, animate via tickers
  const fluorGroup = new THREE.Group();
  const wire1 = mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.5, 4), mats.metalDark, { outline: false });
  wire1.position.set(0, -0.25, 0);
  const tube = mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.1, 6), mats.lampWarm, { outline: false });
  tube.rotation.z = Math.PI / 2;
  tube.position.set(0, -0.55, 0);
  fluorGroup.add(wire1, tube);
  fluorGroup.position.set(22, FH - 0.05, -15.5);
  g.add(fluorGroup);
  ctx.tickers.push((t) => {
    fluorGroup.rotation.z = Math.sin(t * 1.7) * 0.06 + Math.sin(t * 4.3) * 0.02;
    const flick = Math.sin(t * 13) > -0.85 ? 1 : 0.35;
    tube.material = flick > 0.5 ? mats.lampWarm : mats.windowDark;
  });

  // --- yard: bombsite marking + improvised cover --------------------------------
  const mark = decalMesh(bombsiteTexture('B'), 4.4, 4.4);
  mark.rotation.x = -Math.PI / 2;
  mark.rotation.z = 0.3;
  mark.position.set(20.5, 0.06, -7.2);
  g.add(mark);
  pallet(chunk, 16.2, 0, -8.2, 0.25);
  pallet(chunk, 16.3, 0.19, -8.1, -0.12);
  pallet(chunk, 16.2, 0.38, -8.25, 0.4);
  trashBin(chunk, 25.6, 0, -6.6);
  trashBin(chunk, 26.5, 0, -6.9, 0.5);
  bicycle(chunk, 14.0, 0, -4.9, 2.25);
  ironTableSet(chunk, 23.5, 0, -9.3, 0.7);
  crate(chunk, 27.2, 0, -9.8, 1.0, 0.35);
  barrel(chunk, 12.8, 0, -8.8, 'barrelRust');
  const holes = decalMesh(bulletHoleTexture(), 1.6, 1.6);
  holes.position.set(17.5, 1.5, zMax + 0.19);
  g.add(holes);
  const bTag = decalMesh(textDecal('B', { color: '#c8452e', size: 150, seed: 91 }), 3.0, 3.0);
  bTag.position.set(25.2, 3.0, zMax + 0.19);
  g.add(bTag);

  // --- corner low wall + street lamp ---------------------------------------------
  // low wall along z=-1.5 with the shortcut gap at x 13..14.8
  wallSeg(chunk, 'concrete', true, -1.5, 12, 20, 0, 1.05, 0.45, [{ a: 13, b: 14.8, y0: 0, y1: 1.05 }]);
  chunk.box('concreteDark', 8, 0.12, 0.55, 16, 1.05, -1.5);
  // old street lamp at the corner (slightly bent)
  {
    const c = subChunk(chunk, 13.3, 0, -3.1, 0);
    c.cyl('metalDark', 0.09, 0.13, 4.6, 8, 0, 0, 0, { rz: 0.04 });
    c.box('metalDark', 1.1, 0.08, 0.08, 0.5, 4.55, 0);
    c.box('metalDark', 0.34, 0.22, 0.24, 1.0, 4.42, 0);
  }
  const lampHead = mesh(new THREE.BoxGeometry(0.26, 0.12, 0.18), mats.lampWarm, { outline: false });
  lampHead.position.set(14.28, 4.4, -3.1);
  g.add(lampHead);

  // graffiti on house north + east faces
  const nTag = decalMesh(textDecal('02', { color: '#aeb6c2', size: 80, seed: 92 }), 1.6, 1.2, { opacity: 0.7 });
  nTag.position.set(20, 1.8, zMin - 0.19);
  nTag.rotation.y = Math.PI;
  g.add(nTag);

  g.add(chunk.build(mats));
  scene.add(g);
}
