import * as THREE from 'three';
import { mulberry32, hash3 } from './rng.js';

const tmpMatrix = new THREE.Matrix4();
const tmpColor = new THREE.Color();
const tmpQuat = new THREE.Quaternion();
const tmpScale = new THREE.Vector3();
const tmpPos = new THREE.Vector3();

// Steepest-descent flow path from a spring near a peak down to the plain.
// Allows spilling out of shallow pits so the stream always reaches the foot.
export function findFlowPath(heights, size, sx, sz) {
  const path = [];
  const visited = new Set();
  let x = sx;
  let z = sz;
  for (let step = 0; step < 900; step++) {
    const h = heights[z * size + x];
    path.push({ x, z, y: h });
    visited.add(x + ',' + z);
    if (h <= 2) break;
    let best = null;
    let bestH = Infinity;
    for (let dz = -1; dz <= 1; dz++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dz) continue;
        const nx = x + dx;
        const nz = z + dz;
        if (nx < 1 || nz < 1 || nx >= size - 1 || nz >= size - 1) continue;
        if (visited.has(nx + ',' + nz)) continue;
        const nh = heights[nz * size + nx];
        if (nh < bestH) {
          bestH = nh;
          best = { x: nx, z: nz };
        }
      }
    }
    if (!best) break;
    x = best.x;
    z = best.z;
  }
  return path;
}

// Diagonal steps only touch at a corner, which reads as a gap in the stream;
// insert the lower of the two orthogonal intermediate cells to bridge them.
function densifyPath(path, heights, size) {
  const out = [];
  for (let i = 0; i < path.length; i++) {
    const c = path[i];
    out.push(c);
    const n = path[i + 1];
    if (!n) break;
    if (Math.abs(n.x - c.x) + Math.abs(n.z - c.z) === 2) {
      const h1 = heights[c.z * size + n.x];
      const h2 = heights[n.z * size + c.x];
      const mid = h1 <= h2 ? { x: n.x, z: c.z, y: h1 } : { x: c.x, z: n.z, y: h2 };
      out.push(mid);
    }
  }
  return out;
}

// Picks up to `count` distinct springs near the tallest peaks and returns
// one flow path per waterfall.
export function planWaterfalls({ heights, size, peaks, seed, count }) {
  const rng = mulberry32(seed ^ 0x5eed5);
  const sorted = [...peaks].sort((a, b) => b.h - a.h);
  const paths = [];
  const used = new Set();
  for (let i = 0; i < sorted.length && paths.length < count; i++) {
    const p = sorted[i];
    // bias the main waterfall toward the default camera quadrant (+x, +z)
    // so the signature fall is visible in the opening view
    const ang = paths.length === 0 ? 0.73 + (rng() - 0.5) * 0.8 : rng() * Math.PI * 2;
    const dist = 3 + Math.floor(rng() * 4);
    const sx = Math.max(2, Math.min(size - 3, Math.round(p.x + Math.cos(ang) * dist)));
    const sz = Math.max(2, Math.min(size - 3, Math.round(p.z + Math.sin(ang) * dist)));
    if (used.has(sx + ',' + sz)) continue;
    used.add(sx + ',' + sz);
    const path = densifyPath(findFlowPath(heights, size, sx, sz), heights, size);
    if (path.length > 12) paths.push(path);
  }
  return paths;
}

// Carves the terrain along each flow path into a descending watercourse:
// gentle steps most of the way, one or two tall ledges for the vertical drop,
// and a depressed basin at the foot for the plunge pool. Mutates heights and
// rewrites each path cell's y. Must run before terrain/water mesh building.
export function carveWatercourses({ heights, size, paths, seed }) {
  const rng = mulberry32(seed ^ 0xca7e5);
  for (let pi = 0; pi < paths.length; pi++) {
    const path = paths[pi];
    const ledges = new Set();
    const lo = Math.floor(path.length * 0.15);
    const hi = Math.max(lo + 1, Math.floor(path.length * 0.6));
    // the main (first) waterfall always gets two tall ledges for a bold drop
    const nLedge = pi === 0 ? 2 : 1 + Math.floor(rng() * 2);
    while (ledges.size < nLedge) ledges.add(lo + Math.floor(rng() * (hi - lo)));

    let prev = heights[path[0].z * size + path[0].x];
    for (let i = 0; i < path.length; i++) {
      const c = path[i];
      const idx = c.z * size + c.x;
      let target;
      if (i === 0) target = prev;
      else if (ledges.has(i)) target = prev - (4 + Math.floor(rng() * 4));
      else target = prev - (rng() < 0.6 ? 1 : 0);
      const nh = Math.min(heights[idx], Math.max(2, target));
      heights[idx] = nh;
      c.y = nh;
      prev = nh;
    }

    const end = path[path.length - 1];
    for (let dz = -2; dz <= 2; dz++) {
      for (let dx = -2; dx <= 2; dx++) {
        if (dx * dx + dz * dz > 5) continue;
        const nx = end.x + dx;
        const nz = end.z + dz;
        if (nx < 1 || nz < 1 || nx >= size - 1 || nz >= size - 1) continue;
        const idx = nz * size + nx;
        if (heights[idx] <= end.y + 2) heights[idx] = Math.min(heights[idx], end.y);
      }
    }
  }
}

// Builds water voxels (surface flow, vertical falls, plunge pools) plus a
// rising mist particle cloud at each pool. Returns meshes and an update()
// that animates flow bands and mist.
export function buildWaterfalls({ heights, size, paths }) {
  const cells = new Map(); // key -> {x,y,z,kind}
  const wetSet = new Set();
  const sandSet = new Set();
  const pools = [];

  const put = (x, y, z, kind) => {
    const key = x + ',' + y + ',' + z;
    if (!cells.has(key)) cells.set(key, { x, y, z, kind });
  };

  for (const path of paths) {
    for (let i = 0; i < path.length; i++) {
      const c = path[i];
      put(c.x, c.y + 1, c.z, 0);
      wetSet.add(c.x + ',' + c.z);
      // widen gentle sections sideways so the stream reads at distance
      const ref = path[i + 1] || path[i - 1];
      if (ref) {
        const dx = Math.sign(ref.x - c.x);
        const dz = Math.sign(ref.z - c.z);
        for (const [px, pz] of [[-dz, dx], [dz, -dx]]) {
          if (!px && !pz) continue;
          const sx = c.x + px;
          const sz = c.z + pz;
          if (sx < 1 || sz < 1 || sx >= size - 1 || sz >= size - 1) continue;
          const sh = heights[sz * size + sx];
          if (sh <= c.y && sh >= c.y - 1) {
            put(sx, c.y + 1, sz, 0);
            wetSet.add(sx + ',' + sz);
          }
        }
      }
      if (i + 1 < path.length) {
        const n = path[i + 1];
        for (let y = n.y + 2; y <= c.y + 1; y++) put(n.x, y, n.z, 1);
      }
    }
    const end = path[path.length - 1];
    pools.push(end);
    for (let dz = -3; dz <= 3; dz++) {
      for (let dx = -3; dx <= 3; dx++) {
        if (dx * dx + dz * dz > 8) continue;
        const nx = end.x + dx;
        const nz = end.z + dz;
        if (nx < 1 || nz < 1 || nx >= size - 1 || nz >= size - 1) continue;
        const nh = heights[nz * size + nx];
        if (nh <= end.y + 1) {
          put(nx, end.y + 1, nz, 2);
          wetSet.add(nx + ',' + nz);
        } else if (nh <= end.y + 3) {
          sandSet.add(nx + ',' + nz);
        }
      }
    }
  }

  const list = [...cells.values()];
  const geo = new THREE.BoxGeometry(1, 1, 1);
  const mat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.88,
    depthWrite: false,
    emissive: 0x1e4a68,
  });
  const mesh = new THREE.InstancedMesh(geo, mat, list.length);
  mesh.frustumCulled = false;
  mesh.renderOrder = 5;

  const base = new Float32Array(list.length * 3);
  const phase = new Float32Array(list.length);
  const waterScale = new THREE.Vector3();
  const waterPos = new THREE.Vector3();
  for (let i = 0; i < list.length; i++) {
    const c = list[i];
    waterPos.set(c.x, c.y, c.z);
    waterScale.setScalar(c.kind === 1 ? 1.22 : 1.14);
    tmpMatrix.compose(waterPos, tmpQuat, waterScale);
    mesh.setMatrixAt(i, tmpMatrix);
    const j = hash3(c.x, c.y, c.z);
    if (c.kind === 1) tmpColor.setHex(0xd8f0fc); // falling water, foamy white
    else if (c.kind === 2) tmpColor.setHex(0x5cb6ec); // pool
    else tmpColor.setHex(0x74c2f2); // surface stream
    if (j > 0.82) tmpColor.lerp(new THREE.Color(0xffffff), 0.5); // foam flecks
    tmpColor.offsetHSL(0, 0, (j - 0.5) * 0.06);
    base[i * 3] = tmpColor.r;
    base[i * 3 + 1] = tmpColor.g;
    base[i * 3 + 2] = tmpColor.b;
    phase[i] = -c.y * 0.85 + j * 1.7;
    mesh.setColorAt(i, tmpColor);
  }
  mesh.instanceMatrix.needsUpdate = true;
  mesh.instanceColor.needsUpdate = true;

  // Mist: small white voxels rising above each plunge pool.
  const perPool = 22;
  const mistCount = pools.length * perPool;
  const mistGeo = new THREE.BoxGeometry(1, 1, 1);
  const mistMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.42,
    depthWrite: false,
  });
  const mist = new THREE.InstancedMesh(mistGeo, mistMat, Math.max(1, mistCount));
  mist.frustumCulled = false;
  mist.renderOrder = 11;
  const mistMeta = [];
  {
    const rng = mulberry32(0x4d6973);
    for (const pool of pools) {
      for (let k = 0; k < perPool; k++) {
        mistMeta.push({
          x: pool.x + (rng() - 0.5) * 2.6,
          z: pool.z + (rng() - 0.5) * 2.6,
          y0: pool.y + 1.2,
          phase: rng(),
          speed: 0.5 + rng() * 0.7,
          size: 0.2 + rng() * 0.3,
        });
      }
    }
  }
  if (mistCount === 0) mist.count = 0;

  const update = (t, flowSpeed, showMist) => {
    for (let i = 0; i < list.length; i++) {
      const s = 0.88 + 0.2 * Math.sin(t * 2.6 * flowSpeed + phase[i]);
      tmpColor.setRGB(base[i * 3] * s, base[i * 3 + 1] * s, base[i * 3 + 2] * s);
      mesh.setColorAt(i, tmpColor);
    }
    mesh.instanceColor.needsUpdate = true;

    mist.visible = showMist && mistCount > 0;
    if (mist.visible) {
      for (let i = 0; i < mistMeta.length; i++) {
        const m = mistMeta[i];
        const cycle = (t * m.speed * 0.45 + m.phase) % 1;
        const rise = cycle * 3.4;
        const s = m.size * (0.4 + Math.sin(cycle * Math.PI) * 1.1);
        tmpPos.set(m.x + Math.sin(t * 1.3 + m.phase * 9) * 0.35, m.y0 + rise, m.z);
        tmpScale.setScalar(Math.max(0.05, s));
        tmpMatrix.compose(tmpPos, tmpQuat, tmpScale);
        mist.setMatrixAt(i, tmpMatrix);
      }
      mist.instanceMatrix.needsUpdate = true;
    }
  };

  return { mesh, mist, update, wetSet, sandSet, pools, count: list.length };
}
