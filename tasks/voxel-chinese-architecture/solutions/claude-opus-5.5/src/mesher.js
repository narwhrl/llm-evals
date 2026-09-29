import { BufferAttribute, BufferGeometry } from 'three';
import { COLORS, JITTER, SURFACE } from './palette.js';
import { hash3 } from './voxel.js';

// Growable typed buffer so meshing never boxes numbers into JS arrays.
class Buf {
  constructor(Type, n = 1 << 16) {
    this.Type = Type;
    this.a = new Type(n);
    this.n = 0;
  }
  reserve(k) {
    if (this.n + k <= this.a.length) return;
    let len = this.a.length * 2;
    while (len < this.n + k) len *= 2;
    const b = new this.Type(len);
    b.set(this.a.subarray(0, this.n));
    this.a = b;
  }
  view() {
    return this.a.slice(0, this.n);
  }
}

class Sink {
  constructor() {
    this.pos = new Buf(Float32Array);
    this.nrm = new Buf(Int8Array);
    this.col = new Buf(Float32Array);
    this.idx = new Buf(Uint32Array);
    this.verts = 0;
  }
}

const AO_CURVE = [0.5, 0.68, 0.84, 1];

// Six face directions: axis, sign.
const FACES = [
  [0, 1], [0, -1], [1, 1], [1, -1], [2, 1], [2, -1],
];

// Culled-face mesher with per-vertex ambient occlusion. Produces one geometry
// per surface class so matte, glazed and glowing voxels get separate materials.
export function meshGrid(grid, surfaceCount) {
  const sinks = [];
  for (let i = 0; i < surfaceCount; i++) sinks.push(new Sink());

  const { sx, sy, sz, cells, minX, minY, minZ, strideY, strideZ } = grid;
  const stride = [1, strideY, strideZ];
  const size = [sx, sy, sz];
  const p = [0, 0, 0];
  const q = [0, 0, 0];
  const w = [0, 0, 0];
  const ao = [0, 0, 0, 0];

  // Occupancy test in grid-local coordinates.
  const solid = (x, y, z) =>
    x >= 0 && y >= 0 && z >= 0 && x < sx && y < sy && z < sz && cells[x + z * strideZ + y * strideY] !== 0;

  for (let y = 0; y < sy; y++) {
    for (let z = 0; z < sz; z++) {
      let i = z * strideZ + y * strideY;
      for (let x = 0; x < sx; x++, i++) {
        const c = cells[i];
        if (c === 0) continue;
        p[0] = x; p[1] = y; p[2] = z;
        const sink = sinks[SURFACE[c]];
        const base = COLORS[c];
        const j = 1 + JITTER[c] * (hash3(x + minX, y + minY, z + minZ) * 2 - 1);

        for (let f = 0; f < 6; f++) {
          const a = FACES[f][0];
          const s = FACES[f][1];
          const na = p[a] + s;
          if (na >= 0 && na < size[a] && cells[i + s * stride[a]] !== 0) continue;

          const u = (a + 1) % 3;
          const v = (a + 2) % 3;
          // Neighbour layer the face looks into.
          q[0] = p[0]; q[1] = p[1]; q[2] = p[2];
          q[a] = na;
          for (let k = 0; k < 4; k++) {
            const du = k === 1 || k === 2 ? 1 : -1;
            const dv = k >= 2 ? 1 : -1;
            q[u] += du;
            const s1 = solid(q[0], q[1], q[2]) ? 1 : 0;
            q[v] += dv;
            const cr = solid(q[0], q[1], q[2]) ? 1 : 0;
            q[u] -= du;
            const s2 = solid(q[0], q[1], q[2]) ? 1 : 0;
            q[v] -= dv;
            ao[k] = s1 && s2 ? 0 : 3 - (s1 + s2 + cr);
          }

          const pos = sink.pos, nrm = sink.nrm, col = sink.col, idx = sink.idx;
          pos.reserve(12); nrm.reserve(12); col.reserve(12); idx.reserve(6);
          const off = s > 0 ? 1 : 0;
          for (let k = 0; k < 4; k++) {
            const cu = k === 1 || k === 2 ? 1 : 0;
            const cv = k >= 2 ? 1 : 0;
            w[a] = p[a] + off;
            w[u] = p[u] + cu;
            w[v] = p[v] + cv;
            pos.a[pos.n++] = w[0] + minX;
            pos.a[pos.n++] = w[1] + minY;
            pos.a[pos.n++] = w[2] + minZ;
            nrm.a[nrm.n++] = a === 0 ? s * 127 : 0;
            nrm.a[nrm.n++] = a === 1 ? s * 127 : 0;
            nrm.a[nrm.n++] = a === 2 ? s * 127 : 0;
            const shade = j * AO_CURVE[ao[k]];
            col.a[col.n++] = base[0] * shade;
            col.a[col.n++] = base[1] * shade;
            col.a[col.n++] = base[2] * shade;
          }
          const b = sink.verts;
          // Flip the diagonal where occlusion is anisotropic, and keep CCW
          // winding when viewed from outside the face.
          const flip = ao[0] + ao[2] < ao[1] + ao[3];
          const r = flip ? 1 : 0;
          const i0 = b + r, i1 = b + ((1 + r) & 3), i2 = b + ((2 + r) & 3), i3 = b + ((3 + r) & 3);
          const ia = idx.a;
          let n = idx.n;
          if (s > 0) {
            ia[n++] = i0; ia[n++] = i1; ia[n++] = i2;
            ia[n++] = i0; ia[n++] = i2; ia[n++] = i3;
          } else {
            ia[n++] = i0; ia[n++] = i2; ia[n++] = i1;
            ia[n++] = i0; ia[n++] = i3; ia[n++] = i2;
          }
          idx.n = n;
          sink.verts += 4;
        }
      }
    }
  }

  return sinks.map((sink) => {
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(sink.pos.view(), 3));
    g.setAttribute('normal', new BufferAttribute(sink.nrm.view(), 3, true));
    g.setAttribute('color', new BufferAttribute(sink.col.view(), 3));
    g.setIndex(new BufferAttribute(sink.idx.view(), 1));
    g.computeBoundingSphere();
    return { geometry: g, faces: sink.verts / 4 };
  });
}
