import { P } from './palette.js';

export const YELLOW = { t: P.tileY, d: P.tileYDark, e: P.tileYEdge, r: P.ridgeY };
export const GREY = { t: P.tileG, d: P.tileGDark, e: P.tileGEdge, r: P.ridgeG };

const NONE = -32768;

// Voxel roof built from a heightfield over the eave outline [-W, W] x [-D, D]
// in the frame's (u, v) plane. All heights are relative to the frame origin.
//
//   type    'wudian'   hip roof, ridge along u (W >= D)
//           'xieshan'  hip-and-gable: hipped below the gable line, gabled above
//           'cuanjian' pyramidal roof (W == D) with a finial
//           'skirt'    only the outer ring (distance to eave <= ring): the
//                      lower eave of a double-eave roof
//   y       eave height, H rise at the innermost cell
//   lift    corner upturn in voxels, spread over liftR cells from the corner
//
// The profile f(d) = a*d + b*d^2 is shallow at the eave and steep at the top,
// approximating the concave section of a Chinese roof.
export function roof(fr, o) {
  const { W, D, y, H, type, tiles } = o;
  const lift = o.lift ?? 3;
  const liftR = o.liftR ?? Math.max(4, Math.round(D * 0.6));
  const ring = o.ring ?? D;
  const gable = o.gable ?? Math.round(D * 0.45);
  // span: distance over which the profile rises by H (a skirt uses its ring).
  const span = o.span ?? D;
  const a = (0.3 * H) / span;
  const b = (0.7 * H) / (span * span);
  const f = (d) => a * d + b * d * d;
  const hGable = y + f(gable);

  const nu = 2 * W + 1;
  const top = new Int16Array(nu * (2 * D + 1)).fill(NONE);
  const at = (u, v) => u + W + (v + D) * nu;
  const get = (u, v) => (u < -W || u > W || v < -D || v > D ? NONE : top[at(u, v)]);

  for (let v = -D; v <= D; v++) {
    for (let u = -W; u <= W; u++) {
      const eu = W - Math.abs(u);
      const ev = D - Math.abs(v);
      const dm = Math.min(eu, ev);
      if (type === 'skirt' && dm > ring) continue;
      const h = type === 'xieshan' && eu >= gable ? f(ev) : f(dm);
      const t = Math.max(0, 1 - Math.max(eu, ev) / liftR);
      top[at(u, v)] = y + Math.round(h + lift * t * t);
    }
  }

  for (let v = -D; v <= D; v++) {
    for (let u = -W; u <= W; u++) {
      const ty = top[at(u, v)];
      if (ty === NONE) continue;
      const eu = W - Math.abs(u);
      const ev = D - Math.abs(v);
      const dm = Math.min(eu, ev);

      let lo = ty - 1;
      for (let k = 0; k < 4; k++) {
        const n = get(u + (k === 0 ? 1 : k === 1 ? -1 : 0), v + (k === 2 ? 1 : k === 3 ? -1 : 0));
        if (n !== NONE && n < lo) lo = n;
      }
      if (type === 'skirt' && dm === ring) lo = y;

      const gableFace = type === 'xieshan' && eu >= gable;
      let c;
      if (dm === 0) c = tiles.e;
      else if (ev === D && (type === 'wudian' ? eu >= D : gableFace)) c = tiles.r;
      else if (type === 'xieshan' && eu === gable && ty > hGable) c = tiles.e;
      else if (eu === ev && !gableFace) c = tiles.r;
      else c = (ev <= eu ? u : v) & 1 ? tiles.d : tiles.t;
      fr.set(u, ty, v, c);

      for (let yy = lo; yy < ty; yy++) {
        let uc = dm > 1 ? P.woodDark : (u + v) & 1 ? P.rafterA : P.rafterB;
        if (type === 'xieshan' && eu === gable && yy >= hGable) uc = P.gable;
        fr.set(u, yy, v, uc);
      }
      // Ridges stand one voxel proud of the tiles.
      if (c === tiles.r && dm > 1) fr.set(u, ty + 1, v, tiles.r);
    }
  }

  // Flying corner tips continue the upturn past the outline.
  const tip = o.tip ?? 2;
  const cornerTop = get(W, D);
  for (let k = 1; k <= tip; k++) {
    for (let s = 0; s < 4; s++) {
      const su = s & 1 ? -1 : 1;
      const sv = s & 2 ? -1 : 1;
      fr.set(su * (W + k), cornerTop + k, sv * (D + k), tiles.r);
      fr.set(su * (W + k), cornerTop + k - 1, sv * (D + k), P.rafterA);
    }
  }

  const peakY = y + Math.round(f(D));
  if (type === 'wudian' || type === 'xieshan') {
    // Chiwen finials at both ends of the main ridge.
    const end = type === 'wudian' ? W - D : W - gable;
    for (const s of [-1, 1]) {
      const u = s * end;
      fr.box(u, peakY + 1, 0, u, peakY + 4, 0, tiles.r);
      fr.set(u - s, peakY + 4, 0, tiles.r);
      fr.set(u - s, peakY + 5, 0, tiles.r);
      fr.set(u + s, peakY + 3, 0, tiles.r);
    }
    fr.box(0, peakY + 2, 0, 0, peakY + 3, 0, P.gold);
  }
  if (type === 'cuanjian') {
    const py = peakY + 1;
    fr.box(-1, py, -1, 1, py, 1, tiles.r);
    fr.box(0, py + 1, 0, 0, py + 5, 0, P.gold);
    fr.box(-1, py + 2, 0, 1, py + 2, 0, P.gold);
    fr.box(0, py + 2, -1, 0, py + 2, 1, P.gold);
    fr.box(-1, py + 4, 0, 1, py + 4, 0, P.gold);
    fr.box(0, py + 4, -1, 0, py + 4, 1, P.gold);
  }
  return { peakY, innerY: y + Math.round(f(ring)) };
}
