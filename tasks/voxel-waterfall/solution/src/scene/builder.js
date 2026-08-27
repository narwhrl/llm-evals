import * as THREE from 'three';

/**
 * Growable buffer pack for building one indexed BufferGeometry from
 * thousands of quads. Avoids per-quad allocations of Three objects.
 */
export class VoxelBuilder {
  constructor() {
    this.pos = new Float32Array(1 << 16);
    this.nor = new Float32Array(1 << 16);
    this.col = new Float32Array(1 << 16);
    this.idx = new Uint32Array(1 << 16);
    this.vCount = 0; // vertices
    this.iCount = 0; // indices
    this.cCount = 0; // color floats (== vCount * 3)
  }

  _growPositions() {
    const p = new Float32Array(this.pos.length * 2);
    p.set(this.pos);
    this.pos = p;
    const n = new Float32Array(this.nor.length * 2);
    n.set(this.nor);
    this.nor = n;
  }

  _growColors() {
    const c = new Float32Array(this.col.length * 2);
    c.set(this.col);
    this.col = c;
  }

  _growIndices() {
    const i = new Uint32Array(this.idx.length * 2);
    i.set(this.idx);
    this.idx = i;
  }

  /**
   * Append one quad. Vertices a→b→c→d must wind counter-clockwise
   * when viewed from the normal side. `shade[k]` multiplies color of
   * corner k (used for baked ambient occlusion).
   */
  quad(a, b, c, d, nx, ny, nz, r, g, bl, shade) {
    if (this.vCount * 3 + 12 > this.pos.length) this._growPositions();
    if (this.cCount + 12 > this.col.length) this._growColors();
    if (this.iCount + 6 > this.idx.length) this._growIndices();

    let p = this.vCount * 3;
    const P = this.pos, N = this.nor;
    const vs = [a, b, c, d];
    for (let k = 0; k < 4; k++) {
      P[p] = vs[k][0]; P[p + 1] = vs[k][1]; P[p + 2] = vs[k][2];
      N[p] = nx; N[p + 1] = ny; N[p + 2] = nz;
      p += 3;
    }
    const C = this.col;
    let q = this.cCount;
    const s = shade || [1, 1, 1, 1];
    for (let k = 0; k < 4; k++) {
      C[q] = r * s[k]; C[q + 1] = g * s[k]; C[q + 2] = bl * s[k];
      q += 3;
    }
    const v = this.vCount, I = this.idx;
    I[this.iCount] = v; I[this.iCount + 1] = v + 1; I[this.iCount + 2] = v + 2;
    I[this.iCount + 3] = v; I[this.iCount + 4] = v + 2; I[this.iCount + 5] = v + 3;

    this.vCount += 4;
    this.cCount += 12;
    this.iCount += 6;
  }

  /** Axis-aligned box with a flat color on every face. */
  box(x0, y0, z0, x1, y1, z1, r, g, b) {
    this.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], 0, 1, 0, r, g, b); // +y
    this.quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], 0, -1, 0, r, g, b); // -y
    this.quad([x1, y0, z1], [x1, y1, z1], [x1, y1, z0], [x1, y0, z0], 1, 0, 0, r, g, b); // +x
    this.quad([x0, y0, z0], [x0, y1, z0], [x0, y1, z1], [x0, y0, z1], -1, 0, 0, r, g, b); // -x
    this.quad([x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [x0, y0, z1], 0, 0, 1, r, g, b); // +z
    this.quad([x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [x1, y0, z0], 0, 0, -1, r, g, b); // -z
  }

  /** Build the BufferGeometry. `withColor:false` skips the color attribute. */
  build(withColor = true) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(this.pos.subarray(0, this.vCount * 3), 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(this.nor.subarray(0, this.vCount * 3), 3));
    if (withColor) {
      geo.setAttribute('color', new THREE.BufferAttribute(this.col.subarray(0, this.cCount), 3));
    }
    geo.setIndex(new THREE.BufferAttribute(this.idx.subarray(0, this.iCount), 1));
    return geo;
  }

  get quadCount() {
    return this.iCount / 6;
  }
}
