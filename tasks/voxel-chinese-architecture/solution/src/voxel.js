import * as THREE from "three";

const VOXEL_SIZE = 0.97;
const geometry = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);

function hash3(x, y, z) {
  let n = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  n = (n ^ (n >>> 13)) * 1274126177;
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

export class VoxelWorld {
  constructor() {
    this.cells = new Map();
    this.count = 0;
  }

  set(x, y, z, color) {
    const key = `${x}|${y}|${z}`;
    if (color === undefined || color === null) {
      if (this.cells.delete(key)) this.count -= 1;
      return;
    }
    if (!this.cells.has(key)) this.count += 1;
    this.cells.set(key, { x, y, z, color });
  }

  clear(x, y, z) {
    this.set(x, y, z, null);
  }

  has(x, y, z) {
    return this.cells.has(`${x}|${y}|${z}`);
  }

  fill(x0, y0, z0, x1, y1, z1, color) {
    for (let x = x0; x <= x1; x += 1) {
      for (let y = y0; y <= y1; y += 1) {
        for (let z = z0; z <= z1; z += 1) {
          this.set(x, y, z, color);
        }
      }
    }
  }

  fillXZ(x0, z0, x1, z1, y, color) {
    this.fill(x0, y, z0, x1, y, z1, color);
  }

  fillXY(x0, y0, x1, y1, z, color) {
    this.fill(x0, y0, z, x1, y1, z, color);
  }

  fillYZ(y0, z0, y1, z1, x, color) {
    this.fill(x, y0, z0, x, y1, z1, color);
  }

  ring(x0, z0, x1, z1, y, color) {
    for (let x = x0; x <= x1; x += 1) {
      this.set(x, y, z0, color);
      this.set(x, y, z1, color);
    }
    for (let z = z0 + 1; z <= z1 - 1; z += 1) {
      this.set(x0, y, z, color);
      this.set(x1, y, z, color);
    }
  }

  build() {
    const buckets = new Map();
    for (const cell of this.cells.values()) {
      const key = cell.color;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(cell);
    }

    const group = new THREE.Group();
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (const [hex, list] of buckets) {
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.88,
        metalness: 0.04,
      });
      const mesh = new THREE.InstancedMesh(geometry, material, list.length);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;

      const base = new THREE.Color(hex);
      for (let i = 0; i < list.length; i += 1) {
        const cell = list[i];
        matrix.makeTranslation(cell.x, cell.y, cell.z);
        mesh.setMatrixAt(i, matrix);
        const jitter = 1 + (hash3(cell.x, cell.y, cell.z) - 0.5) * 0.12;
        color.copy(base).multiplyScalar(jitter);
        mesh.setColorAt(i, color);
      }
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      group.add(mesh);
    }

    group.userData.voxelCount = this.count;
    return group;
  }
}
