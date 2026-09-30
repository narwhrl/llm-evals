import * as THREE from 'three';
import { mesh, boltBatch } from './common.js';

export function buildRibs(ctx, parent, materials) {
  const pos = [], uv = [], bolts = [];
  const emit = (a, b, c, d) => {
    for (const p of [a, b, c, a, c, d]) { pos.push(...p); uv.push(p[0] * 2, p[1] * 2); }
  };
  const keep = (x, p) => !ctx.portholes.some(h =>
    Math.hypot(x - h.x, p.y - h.y) < h.radius + (h.id === 'big' ? 0.215 : 0.12));
  for (let x = -3; x <= 3; x++) {
    const pts = ctx.profile.PROFILE;
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i], q = pts[i + 1];
      if (!keep(x, p) || !keep(x, q)) continue;
      const point = (s, side, front) => [x + side * 0.03,
        s.y + s.ny * front, s.z + s.nz * front];
      const a = point(p, -1, 0.004), b = point(p, 1, 0.004);
      const c = point(q, 1, 0.004), d = point(q, -1, 0.004);
      const e = point(p, -1, 0.046), f = point(p, 1, 0.046);
      const g = point(q, 1, 0.046), h = point(q, -1, 0.046);
      emit(e, f, g, h); emit(a, e, h, d); emit(f, b, c, g);
      if (i % 4 === 1) bolts.push([x, p.y + p.ny * 0.053,
        p.z + p.nz * 0.053, Math.atan2(-p.ny, p.nz)]);
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2)); geo.computeVertexNormals();
  mesh(parent, geo, materials.rim, 'circumferential-ring-frames');
  boltBatch(parent, materials.steel, bolts, 0.011);
}
