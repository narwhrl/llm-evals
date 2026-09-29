// Dense voxel grid addressed in world coordinates. One byte per cell holds a
// palette index (0 = empty).
export class VoxelGrid {
  constructor(minX, maxX, minY, maxY, minZ, maxZ) {
    this.minX = minX;
    this.minY = minY;
    this.minZ = minZ;
    this.sx = maxX - minX + 1;
    this.sy = maxY - minY + 1;
    this.sz = maxZ - minZ + 1;
    this.strideZ = this.sx;
    this.strideY = this.sx * this.sz;
    this.cells = new Uint8Array(this.sx * this.sy * this.sz);
  }

  index(x, y, z) {
    const ix = x - this.minX;
    const iy = y - this.minY;
    const iz = z - this.minZ;
    if (ix < 0 || iy < 0 || iz < 0 || ix >= this.sx || iy >= this.sy || iz >= this.sz) return -1;
    return ix + iz * this.strideZ + iy * this.strideY;
  }

  get(x, y, z) {
    const i = this.index(x, y, z);
    return i < 0 ? 0 : this.cells[i];
  }

  set(x, y, z, c) {
    const i = this.index(x, y, z);
    if (i >= 0) this.cells[i] = c;
  }

  // Inclusive axis-aligned box; bounds may be given in either order.
  box(x0, y0, z0, x1, y1, z1, c) {
    const ax = Math.min(x0, x1), bx = Math.max(x0, x1);
    const ay = Math.min(y0, y1), by = Math.max(y0, y1);
    const az = Math.min(z0, z1), bz = Math.max(z0, z1);
    for (let y = ay; y <= by; y++)
      for (let z = az; z <= bz; z++)
        for (let x = ax; x <= bx; x++) this.set(x, y, z, c);
  }
}

// Local building frame: u runs along the facade, v runs front(+)/back(-),
// y is up. rot (0..3) turns the frame in 90° steps so a building can face
// south (0), west (1), north (2) or east (3).
export class Frame {
  constructor(grid, ox, oy, oz, rot = 0) {
    this.grid = grid;
    this.ox = ox;
    this.oy = oy;
    this.oz = oz;
    this.rot = rot & 3;
  }

  wx(u, v) {
    switch (this.rot) {
      case 0: return this.ox + u;
      case 1: return this.ox - v;
      case 2: return this.ox - u;
      default: return this.ox + v;
    }
  }

  wz(u, v) {
    switch (this.rot) {
      case 0: return this.oz + v;
      case 1: return this.oz + u;
      case 2: return this.oz - v;
      default: return this.oz - u;
    }
  }

  set(u, y, v, c) {
    this.grid.set(this.wx(u, v), this.oy + y, this.wz(u, v), c);
  }

  get(u, y, v) {
    return this.grid.get(this.wx(u, v), this.oy + y, this.wz(u, v));
  }

  box(u0, y0, v0, u1, y1, v1, c) {
    const au = Math.min(u0, u1), bu = Math.max(u0, u1);
    const av = Math.min(v0, v1), bv = Math.max(v0, v1);
    const ay = Math.min(y0, y1), by = Math.max(y0, y1);
    for (let y = ay; y <= by; y++)
      for (let v = av; v <= bv; v++)
        for (let u = au; u <= bu; u++) this.set(u, y, v, c);
  }

  // Box mirrored across u = 0.
  boxSym(u0, y0, v0, u1, y1, v1, c) {
    this.box(u0, y0, v0, u1, y1, v1, c);
    this.box(-u0, y0, v0, -u1, y1, v1, c);
  }

  sub(du, dy, dv) {
    return new Frame(this.grid, this.wx(du, dv), this.oy + dy, this.wz(du, dv), this.rot);
  }

  // Same origin, rotated by r quarter turns (2 = facing backwards).
  turn(r) {
    return new Frame(this.grid, this.ox, this.oy, this.oz, this.rot + r);
  }
}

// Stable per-cell hash in [0, 1).
export function hash3(x, y, z) {
  let h = (x * 374761393 + y * 668265263 + z * 2147483647) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
