import { box, plane, plateWithHoles } from '../kit.js';
import { SEWER, DRAIN, HALF } from '../config.js';

/**
 * The sandbox itself: one square concrete slab, the painted map floor, the
 * sewer mouths punched through it and the grated mid-lane drain.
 */
export function buildBase(b) {
  const H = HALF;

  // slab body: bottom plate + perimeter rim
  b.add(box(H * 2, 0.4, H * 2), 'slab', { pos: [0, -1.4, 0], outline: false });
  const rim = 0.5;
  b.add(box(H * 2, 1.2, rim), 'slab', { pos: [0, -0.6, -H + rim / 2], outline: false });
  b.add(box(H * 2, 1.2, rim), 'slab', { pos: [0, -0.6, H - rim / 2], outline: false });
  b.add(box(rim, 1.2, H * 2 - rim * 2), 'slab', { pos: [-H + rim / 2, -0.6, 0], outline: false });
  b.add(box(rim, 1.2, H * 2 - rim * 2), 'slab', { pos: [H - rim / 2, -0.6, 0], outline: false });

  // map floor with the two sewer mouths and the mid-lane drain cut out
  const floor = plateWithHoles(
    { x0: -H + rim, x1: H - rim, z0: -H + rim, z1: H - rim },
    [...SEWER, DRAIN],
    0,
  );
  b.add(floor, 'floor', { outline: false, receive: true });

  // sewer shafts
  for (const s of SEWER) {
    const w = s.x1 - s.x0, d = s.z1 - s.z0, cx = (s.x0 + s.x1) / 2, cz = (s.z0 + s.z1) / 2;
    const depth = 1.2;
    b.add(box(w, depth, 0.16), 'concreteDark', { pos: [cx, -depth / 2, s.z0 + 0.08] });
    b.add(box(w, depth, 0.16), 'concreteDark', { pos: [cx, -depth / 2, s.z1 - 0.08] });
    b.add(box(0.16, depth, d - 0.32), 'concreteDark', { pos: [s.x0 + 0.08, -depth / 2, cz] });
    b.add(box(0.16, depth, d - 0.32), 'concreteDark', { pos: [s.x1 - 0.08, -depth / 2, cz] });
    // arch mouth
    b.add(box(w + 0.5, 0.3, 0.4), 'concrete', { pos: [cx, -0.15, s.z0 + 0.05] });
    b.add(box(w + 0.5, 0.3, 0.4), 'concrete', { pos: [cx, -0.15, s.z1 - 0.05] });
    // dark water at the bottom
    b.add(plane(w - 0.3, d - 0.3), 'water', { pos: [cx, -depth + 0.1, cz], rot: [-Math.PI / 2, 0, 0], outline: false, shadow: false });
  }

  // drain channel: rusted iron grating over standing water
  const dw = DRAIN.x1 - DRAIN.x0, dd = DRAIN.z1 - DRAIN.z0;
  const dcx = (DRAIN.x0 + DRAIN.x1) / 2, dcz = (DRAIN.z0 + DRAIN.z1) / 2;
  b.add(box(dw, DRAIN.depth, 0.08), 'concreteDark', { pos: [dcx, -DRAIN.depth / 2, DRAIN.z0 + 0.04] });
  b.add(box(dw, DRAIN.depth, 0.08), 'concreteDark', { pos: [dcx, -DRAIN.depth / 2, DRAIN.z1 - 0.04] });
  b.add(box(0.08, DRAIN.depth, dd - 0.16), 'concreteDark', { pos: [DRAIN.x0 + 0.04, -DRAIN.depth / 2, dcz] });
  b.add(box(0.08, DRAIN.depth, dd - 0.16), 'concreteDark', { pos: [DRAIN.x1 - 0.04, -DRAIN.depth / 2, dcz] });
  b.add(plane(dw - 0.16, dd - 0.16), 'water', {
    pos: [dcx, -DRAIN.depth + 0.06, dcz], rot: [-Math.PI / 2, 0, 0], outline: false, shadow: false,
  });
  // grating bars
  const bars = Math.round(dd / 0.32);
  for (let i = 0; i < bars; i++) {
    const z = DRAIN.z0 + 0.18 + i * 0.32;
    if (z > DRAIN.z1 - 0.1) break;
    b.add(box(dw - 0.06, 0.06, 0.16), 'rust', { pos: [dcx, 0.02, z], outline: false });
  }
  b.add(box(0.1, 0.08, dd), 'rust', { pos: [DRAIN.x0 + 0.05, 0.02, dcz], outline: false });
  b.add(box(0.1, 0.08, dd), 'rust', { pos: [DRAIN.x1 - 0.05, 0.02, dcz], outline: false });
}

/**
 * Rusted sheet-metal gutters running along wall feet, with a lip that drips.
 */
export function gutter(b, x, z, len, rot = 0, y = 0) {
  const c = Math.cos(rot), s = Math.sin(rot);
  b.add(box(len, 0.16, 0.22), 'rustHeavy', { pos: [x, y + 0.08, z], rot: [0, rot, 0] });
  b.add(box(len, 0.06, 0.3), 'rust', { pos: [x, y + 0.16, z], rot: [0, rot, 0] });
  const n = Math.max(2, Math.round(len / 1.6));
  for (let i = 0; i <= n; i++) {
    const t = (i / n - 0.5) * len;
    b.add(box(0.05, 0.14, 0.2), 'rust', { pos: [x + c * t, y + 0.05, z - s * t], rot: [0, rot, 0] });
  }
}
