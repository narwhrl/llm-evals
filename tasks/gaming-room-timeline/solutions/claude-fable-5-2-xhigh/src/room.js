// The fixed shell of the room: floor, four walls that hide when the camera is behind them, window, door, lights.
import * as THREE from 'three';
import { box, plane, group, mat, woodMat, grainMat, canvasTex } from './kit.js';

export const ROOM = { x: 2.2, z: 1.8, h: 2.6 };
const WIN = { z: -0.2, w: 1.3, y0: 0.95, y1: 2.15 };

// Dusk sky with the neighbourhood growing taller over the years.
function drawOutside(g, w, h, stage) {
  const sky = g.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#5d6fa3');
  sky.addColorStop(0.55, '#f0a56b');
  sky.addColorStop(1, '#ffd9a0');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  const blocks = [
    [[0, 0.3, 0.3], [0.28, 0.22, 0.24], [0.55, 0.36, 0.3], [0.82, 0.25, 0.2]],
    [[0, 0.3, 0.3], [0.28, 0.5, 0.2], [0.5, 0.36, 0.3], [0.8, 0.62, 0.2]],
    [[0, 0.72, 0.22], [0.2, 0.5, 0.2], [0.42, 0.8, 0.18], [0.62, 0.4, 0.2], [0.8, 0.62, 0.2]],
  ][stage];
  let seed = 3;
  const r = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (const [x, bh, bw] of blocks) {
    g.fillStyle = '#3d3a4c';
    g.fillRect(x * w, h - bh * h, bw * w, bh * h);
    for (let yy = h - bh * h + 8; yy < h - 6; yy += 14)
      for (let xx = x * w + 6; xx < (x + bw) * w - 8; xx += 12) {
        g.fillStyle = r() > 0.55 ? '#ffd98a' : '#4b4860';
        g.fillRect(xx, yy, 6, 8);
      }
  }
}

export function buildRoom(scene) {
  const { x: X, z: Z, h: H } = ROOM;
  const oldWall = new THREE.Color('#eadfc4'), newWall = new THREE.Color('#e9e3d6'), accent = new THREE.Color('#8a9a8c');
  const oldFloor = new THREE.Color('#b9a48f'), newFloor = new THREE.Color('#fff4e2');

  const floorMat = woodMat('#d9b78c', '#9a7448', [3, 2.4], 6).clone();
  const floor = box(X * 2, 0.12, Z * 2, floorMat, 0, -0.12, 0);
  floor.castShadow = false;
  scene.add(floor);
  // Soft blob under the base; real shadows on the table would leak through the hidden walls.
  const blob = canvasTex(128, 128, (g) => {
    const r = g.createRadialGradient(64, 64, 22, 64, 64, 64);
    r.addColorStop(0, 'rgba(20,10,5,0.8)');
    r.addColorStop(1, 'rgba(20,10,5,0)');
    g.fillStyle = r;
    g.fillRect(0, 0, 128, 128);
  });
  const shade = plane(X * 3.4, Z * 3.4, new THREE.MeshBasicMaterial({ map: blob, transparent: true, depthWrite: false }), 0, -0.117, 0);
  shade.rotation.x = -Math.PI / 2;
  scene.add(shade);

  const wallMat = grainMat('#ffffff', '#8a7a60', [3, 2], 0.1).clone();
  const backMat = wallMat.clone();
  const skirt = mat('#efe6d6', { roughness: 0.6 });
  const wall = (w, h, d, m, x, y, z) => {
    const o = box(w, h, d, m, x, y, z);
    o.castShadow = false;
    return o;
  };

  const back = group(wall(X * 2 + 0.2, H, 0.1, backMat, 0, 0, -Z - 0.05), box(X * 2, 0.08, 0.015, skirt, 0, 0, -Z + 0.008));
  const front = group(wall(X * 2 + 0.2, H, 0.1, wallMat, 0, 0, Z + 0.05));
  const right = group(wall(0.1, H, Z * 2, wallMat, X + 0.05, 0, 0), box(0.015, 0.08, Z * 2, skirt, X - 0.008, 0, 0));

  // Left wall is built around the window opening.
  const z0 = WIN.z - WIN.w / 2, z1 = WIN.z + WIN.w / 2, lx = -X - 0.05;
  const outside = canvasTex(256, 256, (g, w, h) => drawOutside(g, w, h, 0));
  const frame = mat('#f3efe6', { roughness: 0.5 });
  const left = group(
    wall(0.1, WIN.y0, Z * 2, wallMat, lx, 0, 0),
    wall(0.1, H - WIN.y1, Z * 2, wallMat, lx, WIN.y1, 0),
    wall(0.1, WIN.y1 - WIN.y0, z0 + Z, wallMat, lx, WIN.y0, (z0 - Z) / 2),
    wall(0.1, WIN.y1 - WIN.y0, Z - z1, wallMat, lx, WIN.y0, (z1 + Z) / 2),
    box(0.015, 0.08, Z * 2, skirt, -X + 0.008, 0, 0),
    box(0.16, 0.04, WIN.w + 0.1, frame, -X - 0.02, WIN.y0 - 0.04, WIN.z),
    box(0.04, WIN.y1 - WIN.y0, 0.04, frame, -X - 0.05, WIN.y0, WIN.z),
    box(0.04, 0.04, WIN.w, frame, -X - 0.05, WIN.y0 + 0.75, WIN.z),
  );
  const pane = plane(WIN.w, WIN.y1 - WIN.y0, new THREE.MeshBasicMaterial({ map: outside }), -X - 0.09, (WIN.y0 + WIN.y1) / 2, WIN.z);
  pane.rotation.y = Math.PI / 2;
  left.add(pane);

  // Door on the back wall, far right.
  const doorMat = woodMat('#c9a574', '#96703f', [1, 1], 3);
  back.add(
    box(0.86, 2.02, 0.03, doorMat, 1.65, 0, -Z + 0.015),
    box(0.06, 2.08, 0.05, frame, 1.19, 0, -Z + 0.02),
    box(0.06, 2.08, 0.05, frame, 2.11, 0, -Z + 0.02),
    box(0.98, 0.06, 0.05, frame, 1.65, 2.02, -Z + 0.02),
    box(0.03, 0.03, 0.09, mat('#b9a26a', { metalness: 0.7, roughness: 0.35 }), 1.3, 1.0, -Z + 0.06),
  );

  const walls = { back, left, right, front };
  const normals = { back: [0, 1, Z], left: [1, 0, X], right: [-1, 0, X], front: [0, -1, Z] };
  scene.add(back, left, right, front);

  scene.add(new THREE.HemisphereLight('#ffe7cc', '#6b5443', 0.6));
  const key = new THREE.DirectionalLight('#ffdcb0', 2.5);
  key.position.set(3.2, 6.5, 4.2);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 1, far: 16 });
  scene.add(key);
  const sun = new THREE.SpotLight('#ffbe85', 12, 7, 0.6, 0.8, 1.4);
  sun.position.set(-X - 1.2, 2.4, WIN.z - 0.4);
  sun.target.position.set(0.2, 0, 0.3);
  scene.add(sun, sun.target);

  let stage = -1;
  return {
    walls,
    update(year, camera) {
      const k = THREE.MathUtils.smoothstep(year, 2016.2, 2016.8);
      wallMat.color.lerpColors(oldWall, newWall, k);
      backMat.color.lerpColors(oldWall, accent, k);
      floorMat.color.lerpColors(oldFloor, newFloor, k);
      const s = year < 2011 ? 0 : year < 2019 ? 1 : 2;
      if (s !== stage) {
        stage = s;
        drawOutside(outside.image.getContext('2d'), 256, 256, s);
        outside.needsUpdate = true;
      }
      // A wall is shown only while the camera is on its inner side.
      for (const name in walls) {
        const [nx, nz, d] = normals[name];
        walls[name].visible = camera.position.x * nx + camera.position.z * nz + d > 0;
      }
    },
  };
}
