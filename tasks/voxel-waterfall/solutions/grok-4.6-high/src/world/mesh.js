import * as THREE from 'three';
import { BLOCK, BLOCK_COLOR, varyColor } from '../lib/palette.js';
import { surfaceType } from './generate.js';
import { waterFragment, waterVertex } from './shaders.js';

const FACES = [
  { n: [0, 1, 0], corners: [[0, 1, 0], [0, 1, 1], [1, 1, 1], [1, 1, 0]], shade: 1 },
  { n: [0, -1, 0], corners: [[0, 0, 1], [0, 0, 0], [1, 0, 0], [1, 0, 1]], shade: 0.42 },
  { n: [1, 0, 0], corners: [[1, 0, 0], [1, 1, 0], [1, 1, 1], [1, 0, 1]], shade: 0.78 },
  { n: [-1, 0, 0], corners: [[0, 0, 1], [0, 1, 1], [0, 1, 0], [0, 0, 0]], shade: 0.66 },
  { n: [0, 0, 1], corners: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], shade: 0.88 },
  { n: [0, 0, -1], corners: [[1, 0, 0], [0, 0, 0], [0, 1, 0], [1, 1, 0]], shade: 0.58 },
];

function createArrays() {
  return { pos: [], nrm: [], col: [], flow: [] };
}

function addQuad(buf, x, y, z, face, rgb, flow) {
  const [c0, c1, c2, c3] = face.corners;
  const verts = [c0, c1, c2, c0, c2, c3];
  for (const c of verts) {
    buf.pos.push(x + c[0], y + c[1], z + c[2]);
    buf.nrm.push(face.n[0], face.n[1], face.n[2]);
    buf.col.push(rgb[0] * face.shade, rgb[1] * face.shade, rgb[2] * face.shade);
    if (flow !== undefined) buf.flow.push(flow);
  }
}

function neighborHeight(height, size, x, z) {
  if (x < 0 || z < 0 || x >= size || z >= size) return 0;
  return height[z * size + x];
}

export function buildTerrainMesh(world, origin) {
  const { size, height, worldMax } = world;
  const buf = createArrays();

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      const top = height[z * size + x];
      if (top <= 0) continue;
      const wx = x + origin;
      const wz = z + origin;

      const topType = surfaceType(top, top, worldMax);
      const topRgb = varyColor(BLOCK_COLOR[topType], x, z, world.seed, 0.1);
      addQuad(buf, wx, top, wz, FACES[0], topRgb);

      const neighbors = [
        [1, 0, 2],
        [-1, 0, 3],
        [0, 1, 4],
        [0, -1, 5],
      ];
      for (const [dx, dz, faceIndex] of neighbors) {
        const nh = neighborHeight(height, size, x + dx, z + dz);
        if (nh >= top) continue;
        for (let y = nh; y < top; y++) {
          const type = surfaceType(y + 1, top, worldMax);
          const rgb = varyColor(BLOCK_COLOR[type], x, y + z, world.seed, 0.07);
          addQuad(buf, wx, y, wz, FACES[faceIndex], rgb);
        }
      }
    }
  }

  return makeColorMesh(buf);
}

export function buildWaterMesh(world, origin) {
  const buf = createArrays();
  const seen = new Set();
  const { size, height, waterfall, waterMask } = world;

  for (const cell of waterfall.cells) {
    const key = `${cell.x},${cell.y},${cell.z}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const rgb = BLOCK_COLOR[BLOCK.WATER];
    const y = cell.y + 0.12;
    addQuad(buf, cell.x + origin, y, cell.z + origin, FACES[0], rgb, cell.flow);
    addQuad(buf, cell.x + origin, y, cell.z + origin, FACES[2], rgb, cell.flow);
    addQuad(buf, cell.x + origin, y, cell.z + origin, FACES[3], rgb, cell.flow);
    addQuad(buf, cell.x + origin, y, cell.z + origin, FACES[4], rgb, cell.flow);
    addQuad(buf, cell.x + origin, y, cell.z + origin, FACES[5], rgb, cell.flow);
  }

  for (let z = 0; z < size; z++) {
    for (let x = 0; x < size; x++) {
      if (waterMask[z * size + x] !== 2) continue;
      const y = height[z * size + x];
      const key = `${x},${y},${z}`;
      if (seen.has(key)) continue;
      seen.add(key);
      addQuad(buf, x + origin, y + 0.08, z + origin, FACES[0], BLOCK_COLOR[BLOCK.WATER], 0.18);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(buf.pos, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(buf.nrm, 3));
  geometry.setAttribute('aFlow', new THREE.Float32BufferAttribute(buf.flow, 1));
  geometry.computeBoundingSphere();

  const material = new THREE.ShaderMaterial({
    vertexShader: waterVertex,
    fragmentShader: waterFragment,
    uniforms: {
      uTime: { value: 0 },
      uSpeed: { value: 1.2 },
      uDeep: { value: new THREE.Color(0x1378c8) },
      uFoam: { value: new THREE.Color(0xecf8ff) },
    },
    transparent: true,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = 2;
  return mesh;
}

export function buildVegetationMesh(world, origin) {
  const buf = createArrays();
  const { plants } = world;

  for (const tree of plants.trees) {
    const trunkH = tree.kind === 'pine' ? 4 : 3;
    for (let i = 0; i < trunkH; i++) {
      addCube(buf, tree.x + origin, tree.y + 1 + i, tree.z + origin, BLOCK_COLOR[BLOCK.WOOD], 0.06, tree.x + i);
    }
    if (tree.kind === 'pine') {
      for (let layer = 0; layer < 4; layer++) {
        const y = tree.y + 3 + layer;
        const r = 3 - layer;
        for (let oz = -r; oz <= r; oz++) {
          for (let ox = -r; ox <= r; ox++) {
            if (Math.abs(ox) + Math.abs(oz) > r + (layer === 0 ? 1 : 0)) continue;
            addCube(buf, tree.x + origin + ox, y, tree.z + origin + oz, BLOCK_COLOR[BLOCK.LEAF], 0.1, tree.x + ox);
          }
        }
      }
    } else {
      for (let oy = 0; oy < 3; oy++) {
        const r = oy === 2 ? 1 : 2;
        for (let oz = -r; oz <= r; oz++) {
          for (let ox = -r; ox <= r; ox++) {
            if (Math.abs(ox) === r && Math.abs(oz) === r && oy > 0) continue;
            addCube(
              buf,
              tree.x + origin + ox,
              tree.y + 3 + oy,
              tree.z + origin + oz,
              BLOCK_COLOR[BLOCK.LEAF],
              0.1,
              tree.z + oz,
            );
          }
        }
      }
    }
  }

  for (const g of plants.grass) {
    addCube(buf, g.x + origin, g.y + 1, g.z + origin, [0.22, 0.68, 0.18], 0.12, g.x + g.z);
  }

  return makeColorMesh(buf);
}

function addCube(buf, x, y, z, rgb, vary, salt) {
  const tinted = varyColor(rgb, salt | 0, (y * 13) | 0, 99, vary);
  for (const face of FACES) addQuad(buf, x, y, z, face, tinted);
}

export function buildCloudMesh(world, origin, opacity) {
  const clouds = world.clouds;
  const geometry = new THREE.BoxGeometry(1.35, 0.95, 1.35);
  const material = new THREE.MeshLambertMaterial({
    color: 0xf7f9ff,
    transparent: true,
    opacity,
    depthWrite: true,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, Math.max(1, clouds.length));
  mesh.frustumCulled = false;
  const dummy = new THREE.Object3D();
  const tint = new THREE.Color();
  clouds.forEach((c, i) => {
    dummy.position.set(c.x + origin + 0.5, c.y + 0.35, c.z + origin + 0.5);
    dummy.rotation.set(0, ((c.x * 17 + c.z * 13) % 12) * 0.04, 0);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    const shade = 0.88 + ((c.x * 3 + c.z) % 7) * 0.016;
    tint.setRGB(shade, shade, Math.min(1, shade + 0.04));
    mesh.setColorAt(i, tint);
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.renderOrder = 1;
  mesh.userData.count = clouds.length;
  return mesh;
}

function makeColorMesh(buf) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(buf.pos, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(buf.nrm, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(buf.col, 3));
  geometry.computeBoundingSphere();
  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    flatShading: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

export function createSpray(world, origin) {
  const points = [];
  let count = 0;
  for (const cell of world.waterfall.cells) {
    if (cell.flow < 0.9 || count > 280) continue;
    points.push(cell.x + origin + 0.5, cell.y + 0.4, cell.z + origin + 0.5);
    count += 1;
  }
  const pool = world.waterfall.poolCenter;
  for (let i = 0; i < 28; i++) {
    const a = (i / 28) * Math.PI * 2;
    const r = 1.4 + (i % 5) * 0.3;
    points.push(
      pool.x + origin + Math.cos(a) * r,
      world.waterfall.poolLevel + 1.1,
      pool.z + origin + Math.sin(a) * r,
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
  const material = new THREE.PointsMaterial({
    color: 0xe8f6ff,
    size: 0.3,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const spray = new THREE.Points(geometry, material);
  spray.renderOrder = 3;
  spray.userData.base = new Float32Array(points);
  return spray;
}
