import * as THREE from 'three';
import { box, cyl, plane, mat, tmat, glass } from './kit.js';
import { canvas, toTex, wood, floorPlanks, plaster, drawCalendar, drawHeights, drawSkyline, drawPlaque } from './textures.js';
import { yearOf, monthOf, eraAt, smooth, E20 } from './timeline.js';

export const ROOM = { x0: -2.5, x1: 2.5, z0: -2, z1: 2, h: 2.6, t: 0.12 };
export const WINDOW = { z0: -1.45, z1: -0.35, y0: 0.95, y1: 2.15 };
export const DOOR = { z0: 0.9, z1: 1.75, h: 2.1 };

const OLD_WALL = new THREE.Color('#ece1cd'), AGED_WALL = new THREE.Color('#ddcaa8'), NEW_WALL = new THREE.Color('#b9bd9f');

// A canvas texture redrawn only when its key changes.
function live(w, h, draw) {
  const [c, g] = canvas(w, h);
  const tex = toTex(c);
  let key;
  return {
    tex,
    set(k, ...args) {
      if (k === key) return;
      key = k;
      draw(g, w, h, ...args);
      tex.needsUpdate = true;
    },
  };
}

export function buildRoom(scene) {
  const { x0, x1, z0, z1, h, t } = ROOM;
  const capMat = mat('#efe3cc', 0.9);
  const walnut = tmat(wood('#5a3a22', '#2a180c', { seed: 9 }), 0.55);
  const plasterTex = plaster();
  const backMat = new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.95 });
  const leftMat = backMat.clone();
  const wallMats = [backMat, leftMat];

  const walled = (m, mats) => { m.material = [mats, mats, capMat, mats, mats, mats]; return m; };

  // plinth and floor
  box(scene, x1 - x0 + 0.5, 0.3, z1 - z0 + 0.45, walnut, -0.06, -0.38, 0.02, { r: 0.02 });
  const floor = box(scene, x1 - x0, 0.08, z1 - z0, capMat, 0, -0.08, 0);
  const planks = tmat(floorPlanks(), 0.62);
  floor.material = [capMat, capMat, planks, capMat, capMat, capMat];

  // back wall
  walled(box(scene, x1 - x0 + t, h, t, backMat, -t / 2, 0, z0 - t / 2), backMat);
  // left wall around the window and door openings
  const lx = x0 - t / 2;
  const seg = (za, zb, ya, yb) => walled(box(scene, t, yb - ya, zb - za, leftMat, lx, ya, (za + zb) / 2), leftMat);
  seg(z0, WINDOW.z0, 0, h);
  seg(WINDOW.z0, WINDOW.z1, 0, WINDOW.y0);
  seg(WINDOW.z0, WINDOW.z1, WINDOW.y1, h);
  seg(WINDOW.z1, DOOR.z0, 0, h);
  seg(DOOR.z0, DOOR.z1, DOOR.h, h);
  seg(DOOR.z1, z1, 0, h);

  // baseboards
  const trim = mat('#d8cbb3', 0.6);
  box(scene, x1 - x0, 0.08, 0.015, trim, 0, 0, z0 + 0.008);
  box(scene, 0.015, 0.08, DOOR.z0 - z0, trim, x0 + 0.008, 0, (z0 + DOOR.z0) / 2);
  box(scene, 0.015, 0.08, z1 - DOOR.z1, trim, x0 + 0.008, 0, (z1 + DOOR.z1) / 2);

  // window: aluminium sliding frame, stone sill, skyline outside
  const alu = mat('#d9d6cf', 0.45, 0.4);
  const wz = (WINDOW.z0 + WINDOW.z1) / 2, ww = WINDOW.z1 - WINDOW.z0, wh = WINDOW.y1 - WINDOW.y0;
  box(scene, 0.06, 0.04, ww, alu, lx, WINDOW.y0, wz);
  box(scene, 0.06, 0.04, ww, alu, lx, WINDOW.y1 - 0.04, wz);
  for (const z of [WINDOW.z0 + 0.02, wz, WINDOW.z1 - 0.02]) box(scene, 0.06, wh, 0.04, alu, lx, WINDOW.y0, z);
  for (const [z, dx] of [[wz - ww / 4, -0.015], [wz + ww / 4, 0.015]]) {
    const g = box(scene, 0.008, wh - 0.08, ww / 2 - 0.04, glass, lx + dx, WINDOW.y0 + 0.04, z);
    g.castShadow = false;
  }
  box(scene, 0.2, 0.03, ww + 0.16, mat('#cfc6b8', 0.35), x0 + 0.04, WINDOW.y0 - 0.03, wz);
  // backdrop card just outside the window, kept below the wall top so it never shows over the wall
  const sky = live(1024, 768, (g, w, hh, yr) => drawSkyline(g, w, hh, yr));
  plane(scene, 2.2, 1.85, new THREE.MeshBasicMaterial({ map: sky.tex, color: '#d8d0c4' }), x0 - 0.35, 1.55, wz, { ry: Math.PI / 2 });

  // door, casing, handle, switch
  const doorWood = tmat(wood('#c9a77c', '#8a6239', { seed: 4 }), 0.6);
  const dz = (DOOR.z0 + DOOR.z1) / 2, dw = DOOR.z1 - DOOR.z0;
  box(scene, 0.04, DOOR.h - 0.02, dw - 0.02, doorWood, lx - 0.02, 0, dz, { r: 0.008 });
  for (const z of [DOOR.z0 - 0.03, DOOR.z1 + 0.03]) box(scene, 0.025, DOOR.h + 0.06, 0.06, doorWood, x0 + 0.012, 0, z);
  box(scene, 0.025, 0.06, dw + 0.12, doorWood, x0 + 0.012, DOOR.h, dz);
  cyl(scene, 0.012, 0.012, 0.1, mat('#b49a64', 0.3, 0.8), x0 + 0.03, 1.0, DOOR.z1 - 0.1, { rx: Math.PI / 2, c: true });
  box(scene, 0.012, 0.08, 0.08, mat('#f4f1ea', 0.5), x0 + 0.006, 1.3, 0.47);
  box(scene, 0.012, 0.06, 0.08, mat('#f4f1ea', 0.5), x0 + 0.006, 0.28, -1.75);
  box(scene, 0.08, 0.06, 0.012, mat('#f4f1ea', 0.5), -0.95, 0.28, z0 + 0.006);

  // wall calendar and pencil height marks
  const cal = live(320, 460, (g, w, hh, yr, mo) => drawCalendar(g, w, hh, yr, mo));
  const calMesh = plane(scene, 0.3, 0.43, tmat(cal.tex, 0.85), x0 + 0.006, 1.38, 0.25, { ry: Math.PI / 2 });
  cyl(scene, 0.004, 0.004, 0.03, mat('#555', 0.4, 0.8), x0 + 0.015, 1.62, 0.25, { rz: Math.PI / 2, c: true });
  const MARK_Y0 = 0.62, MARK_Y1 = 1.86;
  const marks = live(200, 1000, (g, w, hh, yr) => drawHeights(g, w, hh, yr, MARK_Y0, MARK_Y1));
  const marksMesh = plane(scene, 0.22, MARK_Y1 - MARK_Y0, new THREE.MeshStandardMaterial({ map: marks.tex, transparent: true, roughness: 0.9 }),
    x0 + 0.005, (MARK_Y0 + MARK_Y1) / 2, 0.68, { ry: Math.PI / 2 });

  // brass plaque on the plinth
  const plaque = live(640, 180, (g, w, hh, yr, title) => drawPlaque(g, w, hh, yr, title));
  plane(scene, 0.72, 0.2, tmat(plaque.tex, 0.35, { metalness: 0.6 }), 1.55, -0.23, z1 + 0.245);

  return {
    wallMats,
    calMesh,
    marksMesh,
    update(time) {
      const y = yearOf(time);
      const aged = OLD_WALL.clone().lerp(AGED_WALL, smooth((time - 2005) / 14));
      const c = aged.lerp(NEW_WALL, smooth((time - E20 + 0.25) / 0.25));
      for (const m of wallMats) m.color.copy(c);
      sky.set(Math.round(time * 2), time);
      cal.set(`${y}-${monthOf(time)}`, y, monthOf(time));
      marks.set(y, y);
      const era = eraAt(time);
      plaque.set(era.year, era.year, era.title);
    },
  };
}
