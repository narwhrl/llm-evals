import * as THREE from 'three';
import { toon, toonMap } from '../core/materials.js';
import { canvasTexture, text } from '../core/canvas.js';
import { makeGroundTexture, makeWetTexture, makePavingTexture, makeGrateTexture } from './groundTextures.js';
import { buildWetGround } from './wetGround.js';
import { BASE, HALF, CURB, ROAD, SIDE_ROAD, STORE_WALK, RIGHT_WALK, NEAR_WALK, PAL } from './layout.js';

function arc(points, cx, cz, r, a0, a1, steps = 10) {
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    points.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
  }
}

/** Extrude a plan polygon (x, z) upwards by `h`. */
function slab(points, h, materials) {
  // Shape y = -z so that rotating -90° about X maps the extrusion onto +Y.
  const shape = new THREE.Shape(points.map(([x, z]) => new THREE.Vector2(x, -z)));
  const geo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 1 });
  geo.rotateX(-Math.PI / 2);
  const mesh = new THREE.Mesh(geo, materials);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function nameplate() {
  return canvasTexture(1024, 160, (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#d9b772');
    grad.addColorStop(0.5, '#b58e48');
    grad.addColorStop(1, '#8f6c33');
    g.fillStyle = grad;
    g.fillRect(0, 0, w, h);
    g.strokeStyle = '#5c431c';
    g.lineWidth = 6;
    g.strokeRect(10, 10, w - 20, h - 20);
    text(g, '雨夜のコンビニ角', w / 2, 62, 56, '#3b2a10', { weight: 700 });
    text(g, 'RAINY NIGHT KONBINI  ·  1 / 80', w / 2, 118, 32, '#3b2a10', { weight: 600 });
  });
}

export function buildGround(ctx) {
  const { root, b } = ctx;

  // Display plinth.
  b.box(toon(PAL.wood), 0, -0.55, 0, BASE + 0.5, 0.9, BASE + 0.5);
  b.box(toon(PAL.woodLight), 0, -0.1, 0, BASE + 0.62, 0.08, BASE + 0.62);
  b.box(toon(0x1c1412), 0, -0.98, 0, BASE + 0.7, 0.08, BASE + 0.7);
  // Cross-section of the terrain: soil and gravel strata under the road.
  b.box(toon(0x3a3129), 0, -0.035, 0, BASE, 0.07, BASE);
  const plate = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 0.5), toonMap(nameplate()));
  plate.position.set(0, -0.55, HALF + 0.252);
  root.add(plate);

  // Painted asphalt base.
  const groundTex = makeGroundTexture();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(BASE, BASE), toonMap(groundTex, { color: 0xb8c0d8 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);
  ctx.noReflect.push(ground);
  buildWetGround(ctx, makeWetTexture());

  // Raised sidewalks with paving tops and pale curb faces.
  const pave = makePavingTexture();
  const paveMat = toonMap(pave, { color: 0xc4cbe0 });
  const curbMat = toon(PAL.curb);
  const mats = [paveMat, curbMat];
  const h = CURB;

  const storeWalk = [];
  const r = 0.8;
  storeWalk.push([STORE_WALK.x0, ROAD.z0 - 1.0]);
  storeWalk.push([STORE_WALK.xSide, ROAD.z0 - 1.0]);
  storeWalk.push([STORE_WALK.xSide, -HALF]);
  storeWalk.push([SIDE_ROAD.x0, -HALF]);
  storeWalk.push([SIDE_ROAD.x0, ROAD.z0 - r]);
  arc(storeWalk, SIDE_ROAD.x0 - r, ROAD.z0 - r, r, 0, Math.PI / 2);
  storeWalk.push([STORE_WALK.x0, ROAD.z0]);
  root.add(slab(storeWalk, h, mats));

  // Short strip west of the driveway, fronting the parking lot.
  root.add(
    slab(
      [
        [-HALF, ROAD.z0 - 0.7],
        [-4.2, ROAD.z0 - 0.7],
        [-4.2, ROAD.z0],
        [-HALF, ROAD.z0],
      ],
      h,
      mats,
    ),
  );

  const rightWalk = [];
  rightWalk.push([RIGHT_WALK.x0, -HALF]);
  rightWalk.push([HALF, -HALF]);
  rightWalk.push([HALF, ROAD.z0]);
  arc(rightWalk, RIGHT_WALK.x0 + 0.6, ROAD.z0 - 0.6, 0.6, Math.PI / 2, Math.PI);
  root.add(slab(rightWalk, h, mats));

  root.add(
    slab(
      [
        [-HALF, NEAR_WALK.z0],
        [HALF, NEAR_WALK.z0],
        [HALF, HALF],
        [-HALF, HALF],
      ],
      h,
      mats,
    ),
  );

  // Kerb-side drain grates and parking wheel stops.
  const grateMat = toonMap(makeGrateTexture());
  const grateGeo = new THREE.PlaneGeometry(0.9, 0.24);
  const grates = [
    [-2.4, ROAD.z0 - 1.12, 0],
    [0.9, ROAD.z0 - 1.12, 0],
    [-6.6, ROAD.z0 + 0.14, 0],
    [4.25, -2.6, Math.PI / 2],
    [4.25, -6.2, Math.PI / 2],
    [8.15, -1.0, Math.PI / 2],
    [-2.0, NEAR_WALK.z0 - 0.14, 0],
    [5.6, NEAR_WALK.z0 - 0.14, 0],
  ];
  for (const [x, z, ry] of grates) {
    const m = new THREE.Mesh(grateGeo, grateMat);
    m.rotation.set(-Math.PI / 2, 0, ry);
    m.position.set(x, 0.012, z);
    m.receiveShadow = true;
    root.add(m);
    ctx.noReflect.push(m);
  }
  const stop = toon(0xb9bec8);
  for (const x of [-7.6, -5.4]) b.box(stop, x, 0.06, -3.85, 1.3, 0.12, 0.16);
}
