// Terrain + waterfall + cloud voxel field generation.
// Pure data module: fills a sparse Map of "x,y,z" -> colorKey, no three.js deps.

// deterministic hash noise → [0,1)
function hash2(x, z, seed) {
  let h = (x * 374761393 + z * 668265263 + seed * 69069) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// smooth value noise
function vnoise(x, z, seed) {
  const xi = Math.floor(x), zi = Math.floor(z);
  const xf = x - xi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash2(xi, zi, seed), b = hash2(xi + 1, zi, seed);
  const c = hash2(xi, zi + 1, seed), d = hash2(xi + 1, zi + 1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x, z, seed, oct = 4) {
  let amp = 1, freq = 1, sum = 0, norm = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * vnoise(x * freq, z * freq, seed + i * 97);
    norm += amp;
    amp *= 0.5; freq *= 2;
  }
  return sum / norm;
}

export const PAL = {
  snow:    { c: 0xf2f4f7, r: 0.95 },
  snowSh:  { c: 0xd9dee7, r: 0.95 },
  rock:    { c: 0x6d665e, r: 1.0 },
  rockD:   { c: 0x554f47, r: 1.0 },
  rockW:   { c: 0x5a626e, r: 1.0 },   // wet rock beside water
  earth:   { c: 0x7a6a4d, r: 1.0 },
  grass:   { c: 0x5d8a3c, r: 1.0 },
  grassD:  { c: 0x4a7230, r: 1.0 },
  moss:    { c: 0x6f9a4a, r: 1.0 },
  trunk:   { c: 0x5d4430, r: 1.0 },
  leaf:    { c: 0x3d7030, r: 1.0 },
  leafL:   { c: 0x548c3a, r: 1.0 },
  water:   { c: 0x3f9ad4, r: 0.35, e: 0x1a4a6a, ei: 0.35 },
  waterD:  { c: 0x2f7ab0, r: 0.4,  e: 0x123a55, ei: 0.3 },
  foam:    { c: 0xeaf6fb, r: 0.5,  e: 0x9ac8de, ei: 0.5 },
  mist:    { c: 0xdcecf4, r: 1.0, e: 0xbcd8e6, ei: 0.55 },
  cloud:   { c: 0xf4f2ee, r: 1.0, e: 0xcfd4e0, ei: 0.22 },
  cloudSh: { c: 0xd9d7e2, r: 1.0, e: 0xa8aec8, ei: 0.18 },
};

const N = 200;                 // footprint 200x200
const H = 78;                  // max elevation

// ridge profile shared by height + waterfall carving
function ridgeX(z) {
  return Math.round(10 * Math.sin(z * 0.05) + 6 * Math.sin(z * 0.11 + 1.3));
}

// peak centers — main + secondaries
const PEAKS = [
  { x: 24, z: 30,  h: 74, rx: 40, rz: 46 },   // main peak, pierces cloud
  { x: -52, z: -14, h: 55, rx: 34, rz: 34 },  // secondary, crown above cloud
  { x: 58, z: -42, h: 46, rx: 30, rz: 30 },   // mid peak, top in cloud
  { x: -20, z: 62, h: 40, rx: 30, rz: 26 },   // low ridge
  { x: 74, z: 44,  h: 34, rx: 24, rz: 26 },   // foothill
];

function gauss(x, z, p) {
  const dx = (x - p.x) / p.rx, dz = (z - p.z) / p.rz;
  return Math.exp(-(dx * dx + dz * dz) * 1.6);
}

// raw mountain height (before waterfall carving)
export function rawHeight(x, z) {
  let h = 0;
  for (const p of PEAKS) h = Math.max(h, p.h * gauss(x, z, p));
  // rolling foothills so edges never hit zero harshly
  h += 10 + 14 * fbm(x * 0.045 + 9, z * 0.045 - 4, 31);
  // ridge line modulation
  const ridge = Math.abs(x - ridgeX(z));
  h += Math.max(0, 16 - ridge * 0.55) * fbm(z * 0.08, x * 0.02, 77);
  // fine rock detail
  h += 3.2 * (fbm(x * 0.2, z * 0.2, 55) - 0.5);
  return Math.min(H, Math.max(1, h));
}

// is (x,z) inside the waterfall chute?
export function inChute(x, z, half = 2.4) {
  return Math.abs(x - ridgeX(z)) <= half && z > -30 && z < 74;
}

// final terrain height: carve a channel where the waterfall falls
export function terrainHeight(x, z) {
  let h = rawHeight(x, z);
  const d = Math.abs(x - ridgeX(z));
  if (d <= 3 && z > -30 && z < 74) {
    // carve a V channel; deeper high up, shallowing toward the plunge pool
    const t = Math.min(1, Math.max(0, (z + 30) / 104));
    const cut = (3 - d) * (3.2 + 5.5 * t);
    h -= cut;
  }
  // plunge pool basin at chute exit
  const pd = Math.hypot(x - ridgeX(66), z - 66);
  if (pd < 13) h = Math.min(h, 12 + (pd - 4) * 0.8);
  return Math.min(H, Math.max(1, Math.round(h)));
}

// pick surface voxel color for column top at (x,z,h)
function surfaceColor(x, z, h) {
  const d = Math.abs(x - ridgeX(z));
  const nearWater = inChute(x, z, 4.5) || Math.hypot(x - ridgeX(66), z - 66) < 15;
  const n = fbm(x * 0.15, z * 0.15, 91);
  if (h >= 52) return n > 0.45 ? 'snow' : 'snowSh';
  if (h >= 40) return n > 0.5 ? 'snowSh' : 'rock';
  if (nearWater) return 'rockW';
  if (h >= 30) return n > 0.55 ? 'rock' : 'rockD';
  if (h >= 16) return n > 0.45 ? 'grass' : 'grassD';
  return n > 0.6 ? 'moss' : 'grass';
}

// Build the whole scene into a Map("x,y,z" -> colorKey).
// opts: { water (bool), clouds (bool), cloudDensity (0..2), snow (bool) }
export function buildVoxels(opts = {}) {
  const { water = true, clouds = true, cloudDensity = 1, snow = true } = opts;
  const map = new Map();
  const put = (k, x, y, z) => map.set(x + ',' + y + ',' + z, k);
  const has = (x, y, z) => map.has(x + ',' + y + ',' + z);

  const HGT = new Int16Array(N * N);
  const X0 = -100, Z0 = -100;
  const Hidx = (x, z) => (x - X0) + (z - Z0) * N;

  // ---- terrain columns -----------------------------------------------
  for (let x = X0; x < X0 + N; x++) {
    for (let z = Z0; z < Z0 + N; z++) {
      const h = terrainHeight(x, z);
      HGT[Hidx(x, z)] = h;
      const surf = snow ? surfaceColor(x, z, h) : surfaceColor(x, z, Math.min(h, 40));
      // top voxel
      put(surf, x, h, z);
      // fill down to 1 — expose banding: earth under grass, rock under rock
      const band = h >= 30 ? 'rockD' : h >= 16 ? 'earth' : 'earth';
      for (let y = h - 1; y >= 1; y--) {
        put(y > h - 4 ? band : 'rockD', x, y, z);
      }
    }
  }

  // ---- vegetation on low slopes --------------------------------------
  const trees = [];
  for (let x = X0 + 6; x < X0 + N - 6; x += 4) {
    for (let z = Z0 + 6; z < Z0 + N - 6; z += 4) {
      const h = HGT[Hidx(x, z)];
      if (h < 7 || h > 26) continue;                    // only foothills
      if (inChute(x, z, 7)) continue;                   // keep waterfall clear
      const r = hash2(x, z, 7);
      if (r < 0.34) {
        trees.push({ x, z, h });
        const th = 3 + Math.floor(r * 7);
        for (let i = 1; i <= th; i++) put('trunk', x, h + i, z);
        // conifer tiers
        for (let ty = th - 1; ty <= th + 2; ty++) {
          const rr = ty === th + 2 ? 0 : ty === th + 1 ? 1 : 2;
          for (let dx = -rr; dx <= rr; dx++)
            for (let dz = -rr; dz <= rr; dz++) {
              if (Math.abs(dx) === rr && Math.abs(dz) === rr && rr === 2) continue;
              if (dx || dz) put(ty > th ? 'leafL' : 'leaf', x + dx, h + ty, z + dz);
            }
          put('leafL', x, h + th + 3, z);
        }
      } else if (r < 0.5) {
        // bushes
        put('leaf', x, h + 1, z);
        put('leafL', x, h + 2, z);
      }
    }
  }

  // ---- waterfall + river + pool --------------------------------------
  if (water) {
    // chute water: hug terrain inside the channel
    for (let z = -30; z <= 66; z++) {
      const rx = ridgeX(z);
      for (let dx = -2; dx <= 2; dx++) {
        const x = rx + dx;
        const h = HGT[Hidx(x, z)];
        if (h < 5) continue;
        const k = Math.abs(dx) <= 1 ? 'waterD' : 'water';
        put(k, x, h + 1, z);
        // foam streaks where slope drops sharply
        const hz2 = HGT[Hidx(x, Math.min(X0 + N - 1, z + 1))];
        if (h - hz2 >= 3 && hash2(x, z, 13) > 0.3) put('foam', x, h + 2, z);
      }
    }
    // big vertical drop where the ridge crest falls (hero drop)
    const crestZ = 18;
    for (let z = crestZ; z <= crestZ + 6; z++) {
      const rx = ridgeX(z);
      const top = HGT[Hidx(rx, z)] + 1;
      const base = HGT[Hidx(rx, Math.min(X0 + N - 1, z + 8))];
      for (let dx = -2; dx <= 2; dx++) {
        for (let y = top; y > base; y--) {
          if (!has(rx + dx, y, z + 6)) {
            const k = hash2(dx, y, 3) > 0.75 ? 'foam' : (dx === 0 ? 'waterD' : 'water');
            put(k, rx + dx, y, z + 6);
          }
        }
      }
    }
    // plunge pool + mist + outflow river to south edge
    const px = ridgeX(66), pz = 66;
    for (let x = px - 14; x <= px + 14; x++) {
      for (let z = pz - 12; z <= pz + 14; z++) {
        const d = Math.hypot(x - px, z - pz);
        const h = HGT[Hidx(x, z)];
        if (d < 11 && h <= 16) {
          put(d < 5 ? 'waterD' : 'water', x, 15, z);
          if (d < 4 && hash2(x, z, 21) > 0.4) put('foam', x, 16, z);
        } else if (d >= 8 && d < 13 && hash2(x, z, 23) > 0.55) {
          put('mist', x, 16 + Math.floor(hash2(x, z, 24) * 3), z);
        }
      }
    }
    // river runs south from pool to map edge, 3 wide with foam edges
    for (let z = pz + 8; z < Z0 + N; z++) {
      const rx = px + Math.round(3 * Math.sin(z * 0.09));
      for (let dx = -2; dx <= 2; dx++) {
        const x = rx + dx;
        const h = HGT[Hidx(x, z)];
        put(Math.abs(dx) === 2 ? 'foam' : 'waterD', x, Math.min(h + 1, 15), z);
      }
    }
  }

  // ---- cloud deck -----------------------------------------------------
  // deck at y=42-52, patchy fbm coverage; peaks above ~50 pierce through
  if (clouds) {
    for (let x = X0; x < X0 + N; x += 3) {
      for (let z = Z0; z < Z0 + N; z += 3) {
        const n = fbm(x * 0.05, z * 0.05, 200);
        const density = 0.5 * cloudDensity;
        if (n < density) {
          const y = 42 + Math.floor(fbm(x * 0.08, z * 0.08, 210) * 9);
          // skip cells where terrain pierces through (peak pops out of cloud)
          const h = HGT[Hidx(Math.min(X0 + N - 1, x), Math.min(X0 + N - 1, z))];
          if (h > y - 5) continue;
          const th = 1 + Math.floor(hash2(x, z, 220) * 2);
          for (let i = 0; i < th; i++) {
            put(hash2(x + i, z, 230) > 0.7 ? 'cloudSh' : 'cloud', x, y + i, z);
          }
        }
      }
    }
    // wispy high veil around the summit of the main peak (below the crest)
    const mp = PEAKS[0];
    for (let x = mp.x - 26; x <= mp.x + 26; x += 2) {
      for (let z = mp.z - 26; z <= mp.z + 26; z += 2) {
        const d = Math.hypot(x - mp.x, z - mp.z);
        const h = HGT[Hidx(x, z)];
        const y = 54 + Math.floor(hash2(x, z, 240) * 4);
        if (d > 12 && d < 26 && h < y - 3 && hash2(x, z, 250) < 0.3 * cloudDensity) {
          put('cloud', x, y, z);
        }
      }
    }
  }

  return map;
}
