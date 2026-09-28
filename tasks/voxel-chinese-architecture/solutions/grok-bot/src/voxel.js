import * as THREE from 'three';

/**
 * Sparse voxel grid → InstancedMesh per color.
 * Coordinates are integer block cells; world size = cellSize.
 */
export class VoxelWorld {
  constructor(cellSize = 0.55) {
    this.cellSize = cellSize;
    /** @type {Map<string, number>} */
    this.cells = new Map();
  }

  key(x, y, z) {
    return `${x}|${y}|${z}`;
  }

  set(x, y, z, color) {
    this.cells.set(this.key(x | 0, y | 0, z | 0), color);
  }

  fill(x0, y0, z0, x1, y1, z1, color) {
    const ax = Math.min(x0, x1);
    const bx = Math.max(x0, x1);
    const ay = Math.min(y0, y1);
    const by = Math.max(y0, y1);
    const az = Math.min(z0, z1);
    const bz = Math.max(z0, z1);
    for (let x = ax; x <= bx; x++) {
      for (let y = ay; y <= by; y++) {
        for (let z = az; z <= bz; z++) {
          this.set(x, y, z, color);
        }
      }
    }
  }

  /** Hollow box shell (walls + optional floor/ceiling) */
  box(x0, y0, z0, x1, y1, z1, color, { floor = true, ceiling = false, walls = true } = {}) {
    if (walls) {
      this.fill(x0, y0, z0, x1, y1, z0, color);
      this.fill(x0, y0, z1, x1, y1, z1, color);
      this.fill(x0, y0, z0, x0, y1, z1, color);
      this.fill(x1, y0, z0, x1, y1, z1, color);
    }
    if (floor) this.fill(x0, y0, z0, x1, y0, z1, color);
    if (ceiling) this.fill(x0, y1, z0, x1, y1, z1, color);
  }

  /** Clear a rectangular volume (for doorways / courtyards) */
  clear(x0, y0, z0, x1, y1, z1) {
    const ax = Math.min(x0, x1);
    const bx = Math.max(x0, x1);
    const ay = Math.min(y0, y1);
    const by = Math.max(y0, y1);
    const az = Math.min(z0, z1);
    const bz = Math.max(z0, z1);
    for (let x = ax; x <= bx; x++) {
      for (let y = ay; y <= by; y++) {
        for (let z = az; z <= bz; z++) {
          this.cells.delete(this.key(x, y, z));
        }
      }
    }
  }

  buildGroup() {
    const byColor = new Map();
    for (const [k, color] of this.cells) {
      if (!byColor.has(color)) byColor.set(color, []);
      byColor.get(color).push(k);
    }

    const group = new THREE.Group();
    group.name = 'voxels';
    const geo = new THREE.BoxGeometry(this.cellSize * 0.98, this.cellSize * 0.98, this.cellSize * 0.98);
    const dummy = new THREE.Object3D();
    const s = this.cellSize;

    for (const [color, keys] of byColor) {
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.82,
        metalness: color === 0xeab308 || color === 0xd4a017 || color === 0xf0c14a ? 0.35 : 0.05,
      });
      const mesh = new THREE.InstancedMesh(geo, mat, keys.length);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = `vox_${color.toString(16)}`;

      keys.forEach((k, i) => {
        const [x, y, z] = k.split('|').map(Number);
        dummy.position.set(x * s + s * 0.5, y * s + s * 0.5, z * s + s * 0.5);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      });
      mesh.instanceMatrix.needsUpdate = true;
      group.add(mesh);
    }

    return group;
  }

  get count() {
    return this.cells.size;
  }
}
