#!/usr/bin/env node
/**
 * Generates every texture the diorama uses.
 *
 *   node tools/generate-assets.mjs
 *
 * Nothing here is downloaded. The Earth maps and the surface textures are
 * written from scratch by the code below, so the project carries its own
 * assets and the licence question does not arise: they are outputs of this
 * script, which is committed next to them.
 *
 * The only dependency is Node's own zlib, which does the PNG compression.
 */

import { deflateSync } from "node:zlib";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "..", "public", "assets");

/* -------------------------------------------------------------------------- */
/*  A small PNG encoder                                                        */
/* -------------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let c = 0xffffffff;
  for (let i = 0; i < buffer.length; i++) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([length, body, crc]);
}

/** Encodes an RGBA byte array as a PNG. */
function encodePng(width, height, rgba) {
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(
      raw,
      y * (stride + 1) + 1,
    );
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type: RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* -------------------------------------------------------------------------- */
/*  Noise                                                                      */
/* -------------------------------------------------------------------------- */

function hash3(x, y, z) {
  let h = x * 374761393 + y * 668265263 + z * 2147483647;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

/** Value noise on a 3D lattice. Sampling a sphere in 3D keeps maps seamless. */
function noise3(x, y, z) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const iz = Math.floor(z);
  const fx = smooth(x - ix);
  const fy = smooth(y - iy);
  const fz = smooth(z - iz);
  const lerp = (a, b, t) => a + (b - a) * t;
  const c000 = hash3(ix, iy, iz);
  const c100 = hash3(ix + 1, iy, iz);
  const c010 = hash3(ix, iy + 1, iz);
  const c110 = hash3(ix + 1, iy + 1, iz);
  const c001 = hash3(ix, iy, iz + 1);
  const c101 = hash3(ix + 1, iy, iz + 1);
  const c011 = hash3(ix, iy + 1, iz + 1);
  const c111 = hash3(ix + 1, iy + 1, iz + 1);
  return lerp(
    lerp(lerp(c000, c100, fx), lerp(c010, c110, fx), fy),
    lerp(lerp(c001, c101, fx), lerp(c011, c111, fx), fy),
    fz,
  );
}

function fbm3(x, y, z, octaves, gain = 0.5) {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  let fx = x;
  let fy = y;
  let fz = z;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise3(fx, fy, fz);
    norm += amp;
    amp *= gain;
    fx *= 2.07;
    fy *= 2.03;
    fz *= 2.11;
  }
  return sum / norm;
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const mix = (a, b, t) => a + (b - a) * t;
const smoothstep = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
};

function write(name, width, height, rgba) {
  writeFileSync(join(OUT, name), encodePng(width, height, rgba));
  console.log(`${name}  ${width}x${height}`);
}

/* -------------------------------------------------------------------------- */
/*  The Earth                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The land mask. It is one function of the point on the sphere, so the day
 * map and the night map describe exactly the same continents.
 *
 * A low frequency field makes the continents and a second, higher frequency
 * one raggedges the coastlines. The field is warped first, otherwise the
 * coastlines come out as round blobs.
 */
function landHeightAt(x, y, z) {
  const warpX = fbm3(x * 1.1 + 11.3, y * 1.1 - 4.2, z * 1.1 + 7.7, 2) - 0.5;
  const warpY = fbm3(x * 1.1 - 8.8, y * 1.1 + 2.9, z * 1.1 - 3.1, 2) - 0.5;
  const base = fbm3(x * 1.15 + warpX * 1.2, y * 1.15 + warpY * 1.2, z * 1.15, 3);
  const coast = (fbm3(x * 4.2 - 2.1, y * 4.2 + 6.4, z * 4.2 - 8.8, 3) - 0.5) * 0.055;
  // The polar oceans: the Arctic is water, Antarctica is not.
  const polarOcean = smoothstep(0.60, 0.90, y) * 0.30;
  const antarctic = smoothstep(-0.60, -0.88, y) * 0.30;
  return base + coast - polarOcean + antarctic;
}

function makeEarthMaps(width, height) {
  const day = new Uint8Array(width * height * 4);
  const night = new Uint8Array(width * height * 4);
  const clouds = new Uint8Array(width * height * 4);

  for (let j = 0; j < height; j++) {
    const lat = (0.5 - (j + 0.5) / height) * Math.PI;
    const c = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let i = 0; i < width; i++) {
      const lon = ((i + 0.5) / width) * Math.PI * 2 - Math.PI;
      const x = Math.cos(lon) * c;
      const y = sinLat;
      const z = Math.sin(lon) * c;

      const h = landHeightAt(x, y, z);
      const isLand = h > 0.555;
      const absLat = Math.abs(lat) / (Math.PI / 2);

      const p = (j * width + i) * 4;

      /* --- the day map ---------------------------------------------------- */
      let r;
      let g;
      let b;
      if (isLand) {
        // Latitude drives the biome: tundra, boreal, temperate, desert, tropic.
        const dry = fbm3(x * 4.2 + 3.1, y * 4.2 - 2.2, z * 4.2 + 9.4, 4);
        const desert = smoothstep(0.56, 0.74, dry) * smoothstep(0.52, 0.26, absLat);
        const rock = smoothstep(0.70, 0.84, h) * (1 - smoothstep(0.55, 0.78, absLat));
        const ice = clamp(
          smoothstep(0.78, 0.93, absLat) + smoothstep(0.74, 0.88, h - 0.52) * 0.7,
          0,
          1,
        );

        const forest = [0.22, 0.35, 0.19];
        const steppe = [0.47, 0.46, 0.28];
        const sand = [0.74, 0.63, 0.42];
        const stone = [0.4, 0.38, 0.34];
        let land = forest.map((v, k) => mix(v, steppe[k], smoothstep(0.4, 0.62, dry)));
        land = land.map((v, k) => mix(v, sand[k], desert));
        land = land.map((v, k) => mix(v, stone[k], rock * 0.75));
        r = mix(land[0], 0.93, ice);
        g = mix(land[1], 0.95, ice);
        b = mix(land[2], 0.98, ice);
      } else {
        const depth = clamp((0.555 - h) / 0.555, 0, 1);
        const shallow = [0.13, 0.38, 0.52];
        const deep = [0.02, 0.06, 0.19];
        r = mix(shallow[0], deep[0], depth);
        g = mix(shallow[1], deep[1], depth);
        b = mix(shallow[2], deep[2], depth);
        // Ice at the poles, even over the ocean.
        const seaIce = smoothstep(0.8, 0.93, absLat);
        r = mix(r, 0.86, seaIce);
        g = mix(g, 0.91, seaIce);
        b = mix(b, 0.96, seaIce);
        // A shelf of lighter water along the coasts.
        const shelf = smoothstep(0.34, 0.55, h);
        r = mix(r, 0.12, shelf * 0.6);
        g = mix(g, 0.35, shelf * 0.6);
        b = mix(b, 0.5, shelf * 0.6);
      }
      day[p] = Math.round(clamp(r, 0, 1) * 255);
      day[p + 1] = Math.round(clamp(g, 0, 1) * 255);
      day[p + 2] = Math.round(clamp(b, 0, 1) * 255);
      day[p + 3] = 255;

      /* --- the night map --------------------------------------------------- */
      if (isLand) {
        // Cities cluster: a separate field, sharpened, weighted towards the
        // coast and away from the poles. The land itself is nearly black at
        // night; only the lights carry the continent.
        const cluster = fbm3(x * 8.5 - 5.5, y * 8.5 + 1.7, z * 8.5 + 4.4, 4);
        const sharp = Math.pow(clamp((cluster - 0.5) / 0.26, 0, 1), 1.7);
        const grid = 0.45 + 0.55 * fbm3(x * 30, y * 30, z * 30, 2);
        // The network between the towns: a ridged noise turns into thin
        // filaments, the way a road map does at night.
        const ridge = 1 - Math.abs(fbm3(x * 19 + 3.1, y * 19 - 7.4, z * 19 + 2.2, 3) * 2 - 1);
        const filament = Math.pow(clamp(ridge, 0, 1), 7);
        // The bright cores of the big cities.
        const cores = Math.pow(
          clamp((fbm3(x * 44 - 2.2, y * 44 + 5.5, z * 44 + 1.4, 2) - 0.63) / 0.22, 0, 1),
          1.6,
        );
        const habitable = 1 - smoothstep(0.6, 0.9, Math.abs(lat) / (Math.PI / 2));
        const coastBonus = 1 - smoothstep(0.56, 0.76, h);
        let lights = sharp * grid * habitable * (0.65 + 0.7 * coastBonus) * 1.7;
        lights += (filament * 0.9 + cores * 0.95) * habitable * (0.35 + 0.65 * coastBonus);
        lights = clamp(lights, 0, 1);
        // A warm sodium core with a dim halo around the towns.
        const halo = clamp(sharp * 0.55, 0, 1);
        night[p] = Math.round(255 * clamp(0.035 + 0.93 * lights, 0, 1));
        night[p + 1] = Math.round(255 * clamp(0.03 + 0.68 * Math.pow(lights, 1.35), 0, 1));
        night[p + 2] = Math.round(255 * clamp(0.055 + 0.24 * lights + 0.05 * halo, 0, 1));
      } else {
        night[p] = 0;
        night[p + 1] = 3;
        night[p + 2] = 11;
      }
      night[p + 3] = 255;

      /* --- the cloud layer ------------------------------------------------- */
      const swirl = fbm3(x * 3.4 + 1.1, y * 3.4 - 2.6, z * 3.4 + 4.4, 3) - 0.5;
      const cloudField = fbm3(
        x * 5.2 + swirl * 2.6,
        y * 7.4 + swirl * 2.6,
        z * 5.2 + swirl * 2.6,
        5,
      );
      const band = 0.5 + 0.5 * Math.sin(lat * 6.0); // the equatorial and
      // mid-latitude storm tracks
      const cloud = clamp((cloudField - 0.47) / 0.2, 0, 1) * (0.45 + 0.75 * band);
      const a = clamp(cloud * 1.25, 0, 1);
      clouds[p] = 255;
      clouds[p + 1] = 255;
      clouds[p + 2] = 255;
      clouds[p + 3] = Math.round(a * 235);
    }
  }
  return { day, night, clouds };
}

/* -------------------------------------------------------------------------- */
/*  Surface textures                                                           */
/* -------------------------------------------------------------------------- */

/** Deterministic pseudo random, so regenerating gives the same files. */
function makeRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeWallPanels(size = 1024) {
  const data = new Uint8Array(size * size * 4);
  const rand = makeRandom(20261020);
  const grime = new Float32Array(size * size);

  for (let i = 0; i < size * size; i++) {
    const x = (i % size) / size;
    const y = Math.floor(i / size) / size;
    grime[i] = fbm3(x * 6, y * 6, 0.5, 4);
  }

  const set = (x, y, r, g, b) => {
    const p = (y * size + x) * 4;
    data[p] = clamp(r, 0, 1) * 255;
    data[p + 1] = clamp(g, 0, 1) * 255;
    data[p + 2] = clamp(b, 0, 1) * 255;
    data[p + 3] = 255;
  };

  const base = [0.80, 0.81, 0.80];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const dirt = grime[i];
      // Matte white enamel with a faint warm cast and scattered wear.
      let r = base[0] * (0.93 + 0.12 * dirt);
      let g = base[1] * (0.93 + 0.11 * dirt);
      let b = base[2] * (0.92 + 0.1 * dirt);
      // Fine scratches.
      const scratch = hash3(x * 7, y * 13, 3);
      if (scratch > 0.9975) {
        r -= 0.16;
        g -= 0.16;
        b -= 0.15;
      }
      set(x, y, r, g, b);
    }
  }

  // Panel seams every 128 px, with a darker groove and a highlight below.
  for (let i = 0; i < size; i += 128) {
    for (let t = 0; t < size; t++) {
      for (let k = 0; k < 5; k++) set((i + k) % size, t, 0.30, 0.31, 0.32);
      for (let k = 5; k < 8; k++) set((i + k) % size, t, 0.64, 0.65, 0.65);
      for (let k = 8; k < 11; k++) set((i + k) % size, t, 0.88, 0.88, 0.87);
      for (let k = 0; k < 5; k++) set(t, (i + k) % size, 0.30, 0.31, 0.32);
      for (let k = 5; k < 8; k++) set(t, (i + k) % size, 0.64, 0.65, 0.65);
      for (let k = 8; k < 11; k++) set(t, (i + k) % size, 0.88, 0.88, 0.87);
    }
  }

  // Rivets around the panel edges.
  const rivet = (cx, cy) => {
    for (let dy = -5; dy <= 5; dy++) {
      for (let dx = -5; dx <= 5; dx++) {
        const d = Math.hypot(dx, dy);
        if (d > 5) continue;
        const x = (cx + dx + size) % size;
        const y = (cy + dy + size) % size;
        const shade = 0.72 + 0.3 * (1 - d / 5) - (dx + dy) * 0.02;
        set(x, y, shade, shade * 0.99, shade * 0.95);
      }
    }
  };
  for (let i = 0; i < size; i += 128) {
    for (let t = 14; t < size; t += 34) {
      rivet(i + 11, t);
      rivet((i + 117) % size, t);
      rivet(t, i + 11);
      rivet(t, (i + 117) % size);
    }
  }

  // A few stencilled labels and numbers, the kind that come with the module.
  const text = (str, x, y, scale, colour) => {
    // A 5x7 block font, enough for the stencils used here.
    const font = {
      "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
      "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
      "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
      "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
      "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
      "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
      "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
      "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
      "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
      "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
      A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
      B: ["11110", "10001", "10001", "11110", "10001", "10001", "11110"],
      C: ["01110", "10001", "10000", "10000", "10000", "10001", "01110"],
      D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
      E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
      F: ["11111", "10000", "10000", "11110", "10000", "10000", "10000"],
      G: ["01110", "10001", "10000", "10111", "10001", "10001", "01111"],
      H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
      I: ["01110", "00100", "00100", "00100", "00100", "00100", "01110"],
      K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
      L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
      M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
      N: ["10001", "11001", "10101", "10011", "10001", "10001", "10001"],
      O: ["01110", "10001", "10001", "10001", "10001", "10001", "01110"],
      P: ["11110", "10001", "10001", "11110", "10000", "10000", "10000"],
      R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
      S: ["01111", "10000", "10000", "01110", "00001", "00001", "11110"],
      T: ["11111", "00100", "00100", "00100", "00100", "00100", "00100"],
      U: ["10001", "10001", "10001", "10001", "10001", "10001", "01110"],
      V: ["10001", "10001", "10001", "10001", "10001", "01010", "00100"],
      W: ["10001", "10001", "10001", "10101", "10101", "11011", "10001"],
      X: ["10001", "10001", "01010", "00100", "01010", "10001", "10001"],
      Y: ["10001", "10001", "01010", "00100", "00100", "00100", "00100"],
      Z: ["11111", "00001", "00010", "00100", "01000", "10000", "11111"],
      " ": ["00000", "00000", "00000", "00000", "00000", "00000", "00000"],
      "-": ["00000", "00000", "00000", "11111", "00000", "00000", "00000"],
      ".": ["00000", "00000", "00000", "00000", "00000", "01100", "01100"],
      "/": ["00001", "00010", "00010", "00100", "01000", "01000", "10000"],
      "₂": ["00000", "00100", "01100", "10100", "00100", "00100", "01110"],
    };
    let cx = x;
    for (const ch of str) {
      const glyph = font[ch] ?? font[" "];
      for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 5; col++) {
          if (glyph[row][col] !== "1") continue;
          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const px = (cx + col * scale + sx) % size;
              const py = (y + row * scale + sy) % size;
              set(px, py, colour[0], colour[1], colour[2]);
            }
          }
        }
      }
      cx += 6 * scale;
    }
  };

  const label = (str, x, y, scale, colour) => text(str, x, y, scale, colour);

  label("04", 40, 40, 6, [0.16, 0.18, 0.22]);
  label("O2", 40, 110, 5, [0.12, 0.32, 0.55]);
  label("CAUTION", 420, 44, 4, [0.62, 0.14, 0.1]);
  label("MODULE B", 40, 430, 4, [0.3, 0.32, 0.34]);
  label("PRESS", 470, 430, 3, [0.2, 0.22, 0.24]);
  label("NO STEP", 700, 42, 3, [0.6, 0.5, 0.1]);
  label("07", 820, 430, 6, [0.16, 0.18, 0.22]);
  label("LIFE SUPPORT", 470, 650, 3, [0.25, 0.27, 0.3]);
  label("ID", 700, 650, 3, [0.25, 0.27, 0.3]);

  // A caution stripe and a couple of hazard placards.
  for (let y = 150; y < 186; y++) {
    for (let x = 380; x < 560; x++) {
      const stripe = Math.floor((x + y) / 12) % 2;
      if (stripe === 0) set(x, y, 0.72, 0.55, 0.09);
      else set(x, y, 0.13, 0.13, 0.14);
    }
  }
  for (let y = 700; y < 790; y++) {
    for (let x = 80; x < 200; x++) {
      set(x, y, 0.16, 0.32, 0.2);
      if ((x + y) % 18 < 2) set(x, y, 0.9, 0.9, 0.88);
    }
  }

  // A couple of scuffs and stains to break the flatness.
  for (let n = 0; n < 220; n++) {
    const cx = Math.floor(rand() * size);
    const cy = Math.floor(rand() * size);
    const r = 3 + rand() * 16;
    const strength = 0.05 + rand() * 0.12;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.hypot(dx, dy) > r) continue;
        const p = ((cy + dy + size) % size) * size + ((cx + dx + size) % size);
        const f = 1 - Math.hypot(dx, dy) / r;
        data[p * 4] = clamp(data[p * 4] / 255 - strength * f * 0.5, 0, 1) * 255;
        data[p * 4 + 1] = clamp(data[p * 4 + 1] / 255 - strength * f * 0.45, 0, 1) * 255;
        data[p * 4 + 2] = clamp(data[p * 4 + 2] / 255 - strength * f * 0.3, 0, 1) * 255;
      }
    }
  }

  return data;
}

function makeFloorGrate(size = 512) {
  const data = new Uint8Array(size * size * 4);
  const set = (x, y, r, g, b, a = 255) => {
    const p = ((y % size) * size + (x % size)) * 4;
    data[p] = clamp(r, 0, 1) * 255;
    data[p + 1] = clamp(g, 0, 1) * 255;
    data[p + 2] = clamp(b, 0, 1) * 255;
    data[p + 3] = a;
  };
  // The bars of the grating, with holes between them.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const bx = x % 64;
      const by = y % 64;
      const bar = bx < 26 || by < 26;
      if (bar) {
        const wear = fbm3(x * 0.09, y * 0.09, 2.2, 3);
        const v = 0.52 + 0.18 * wear;
        const edge = bx < 2 || by < 2 ? 0.72 : v;
        set(x, y, edge, edge * 0.99, edge * 0.95);
      } else {
        set(x, y, 0.1, 0.105, 0.115);
      }
    }
  }
  // Highlight on the bar edges.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const bx = x % 64;
      const by = y % 64;
      if (bx === 26 || by === 26) set(x, y, 0.78, 0.77, 0.72);
    }
  }
  return data;
}

function makeFabric(size = 512, hue = [0.24, 0.3, 0.36]) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const warp = Math.sin(x * 1.6) * 0.5 + 0.5;
      const weft = Math.sin(y * 1.6) * 0.5 + 0.5;
      const weave = 0.88 + 0.16 * (warp * 0.5 + weft * 0.5);
      const blotch = fbm3(x * 0.02, y * 0.02, 5.5, 3);
      const p = (y * size + x) * 4;
      data[p] = clamp(hue[0] * weave * (0.85 + 0.3 * blotch), 0, 1) * 255;
      data[p + 1] = clamp(hue[1] * weave * (0.85 + 0.3 * blotch), 0, 1) * 255;
      data[p + 2] = clamp(hue[2] * weave * (0.85 + 0.3 * blotch), 0, 1) * 255;
      data[p + 3] = 255;
    }
  }
  return data;
}

function makeDesk(size = 512) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grain = fbm3(x * 0.012, y * 0.3, 1.7, 4);
      const wear = fbm3(x * 0.05, y * 0.05, 8.3, 3);
      const p = (y * size + x) * 4;
      const v = 0.3 + 0.16 * grain + 0.06 * wear;
      data[p] = clamp(v * 1.18, 0, 1) * 255;
      data[p + 1] = clamp(v * 1.0, 0, 1) * 255;
      data[p + 2] = clamp(v * 0.8, 0, 1) * 255;
      data[p + 3] = 255;
    }
  }
  // Ring stains from cups.
  for (const [cx, cy, r] of [
    [150, 200, 34],
    [360, 330, 26],
  ]) {
    for (let a = 0; a < 360; a += 2) {
      const rad = (a * Math.PI) / 180;
      for (let w = -2; w <= 2; w++) {
        const rr = r + w;
        const x = Math.round(cx + Math.cos(rad) * rr);
        const y = Math.round(cy + Math.sin(rad) * rr);
        const p = ((y % size) * size + (x % size)) * 4;
        data[p] = clamp(data[p] / 255 - 0.07, 0, 1) * 255;
        data[p + 1] = clamp(data[p + 1] / 255 - 0.06, 0, 1) * 255;
        data[p + 2] = clamp(data[p + 2] / 255 - 0.04, 0, 1) * 255;
      }
    }
  }
  return data;
}

/** The memo board: photographs and a handwritten note, taped to a panel. */
function makeMemoBoard(size = 512) {
  const data = new Uint8Array(size * size * 4);
  const set = (x, y, r, g, b) => {
    const p = ((y % size) * size + (x % size)) * 4;
    data[p] = clamp(r, 0, 1) * 255;
    data[p + 1] = clamp(g, 0, 1) * 255;
    data[p + 2] = clamp(b, 0, 1) * 255;
    data[p + 3] = 255;
  };
  // Cork-ish backing.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fbm3(x * 0.08, y * 0.08, 3.3, 4);
      const v = 0.42 + 0.16 * n;
      set(x, y, v * 1.05, v * 0.9, v * 0.68);
    }
  }
  const rand = makeRandom(4242);

  // Photographs: a white border, a sky, a horizon, two figures.
  const photo = (px, py, pw, ph, tint) => {
    for (let y = 0; y < ph; y++) {
      for (let x = 0; x < pw; x++) {
        const gx = px + x;
        const gy = py + y;
        if (gx < 0 || gy < 0 || gx >= size || gy >= size) continue;
        const edge = x < 5 || y < 5 || x > pw - 6 || y > ph - 6;
        if (edge) {
          set(gx, gy, 0.92, 0.91, 0.87);
          continue;
        }
        const h = (y - 5) / (ph - 10);
        if (h < 0.58) {
          const sky = 0.62 + 0.3 * (1 - h);
          set(gx, gy, sky * 0.72 * tint[0], sky * 0.84 * tint[1], sky * 0.95 * tint[2]);
        } else {
          const ground = 0.3 + 0.16 * rand();
          set(gx, gy, ground * 0.8 * tint[0], ground * 0.95 * tint[1], ground * 0.6 * tint[2]);
          // Two small figures on the horizon line.
          const fx = (x / pw) * 2;
          if (Math.abs(fx - 0.38) < 0.045 && h < 0.78) set(gx, gy, 0.16, 0.15, 0.2);
          if (Math.abs(fx - 0.58) < 0.04 && h < 0.75) set(gx, gy, 0.2, 0.16, 0.18);
        }
      }
    }
  };
  photo(28, 26, 140, 108, [1.0, 0.98, 0.94]);
  photo(196, 44, 128, 100, [0.92, 0.96, 1.0]);
  photo(330, 22, 150, 116, [1.0, 0.94, 0.86]);

  // The handwritten note: ruled lines with wobbling strokes.
  const noteX = 40;
  const noteY = 190;
  const noteW = 220;
  const noteH = 180;
  for (let y = noteY; y < noteY + noteH; y++) {
    for (let x = noteX; x < noteX + noteW; x++) {
      const edge = x < noteX + 3 || x > noteX + noteW - 4 || y < noteY + 3 || y > noteY + noteH - 4;
      if (edge) {
        set(x, y, 0.86, 0.83, 0.7);
        continue;
      }
      const stain = fbm3(x * 0.05, y * 0.05, 12.0, 3);
      const v = 0.93 + 0.05 * stain;
      set(x, y, v, v * 0.985, v * 0.9);
    }
  }
  for (let line = 0; line < 6; line++) {
    const y = noteY + 26 + line * 24;
    let x = noteX + 16;
    const words = 4 + Math.floor(rand() * 5);
    for (let w = 0; w < words; w++) {
      const len = 12 + rand() * 26;
      for (let i = 0; i < len; i++) {
        const wob = Math.sin(i * 0.55 + line) * 1.4;
        const px = Math.round(x + i + wob);
        const py = Math.round(y + Math.sin(i * 0.4) * 1.1);
        if (px < noteX || px >= noteX + noteW) continue;
        set(px, py, 0.16, 0.17, 0.24);
        if (rand() > 0.72) set(px, py + 1, 0.3, 0.31, 0.38);
      }
      x += len + 9;
      if (x > noteX + noteW - 40) break;
    }
  }

  // A magnet, a strip of tape, a ticket.
  for (let y = 296; y < 330; y++) {
    for (let x = 296; x < 424; x++) {
      const edge = x < 298 || x > 421 || y < 298 || y > 327;
      set(x, y, edge ? 0.55 : 0.88, edge ? 0.5 : 0.84, edge ? 0.4 : 0.72);
    }
  }
  for (let a = 0; a < 40; a++) {
    const rad = (a / 40) * Math.PI * 2;
    for (let r = 0; r < 12; r++) {
      const x = Math.round(72 + Math.cos(rad) * r);
      const y = Math.round(300 + Math.sin(rad) * r);
      const v = 0.5 + 0.35 * (1 - r / 12);
      set(x, y, v, v * 0.35, v * 0.28);
    }
  }
  for (let y = 356; y < 424; y++) {
    for (let x = 300; x < 470; x++) {
      const edge = x < 302 || x > 467 || y < 358 || y > 421;
      set(x, y, edge ? 0.2 : 0.95, edge ? 0.2 : 0.93, edge ? 0.22 : 0.84);
    }
  }
  for (let i = 0; i < 8; i++) {
    const y = 372 + i * 5;
    for (let x = 316; x < 440 - i * 6; x++) {
      set(x, y, 0.25, 0.26, 0.3);
    }
  }
  return data;
}

/** The open technical manual: printed diagrams, tables and body text. */
function makeBookPages(width = 512, height = 384) {
  const data = new Uint8Array(width * height * 4);
  const set = (x, y, r, g, b) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const p = (y * width + x) * 4;
    data[p] = clamp(r, 0, 1) * 255;
    data[p + 1] = clamp(g, 0, 1) * 255;
    data[p + 2] = clamp(b, 0, 1) * 255;
    data[p + 3] = 255;
  };
  const rand = makeRandom(9911);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const n = fbm3(x * 0.03, y * 0.03, 6.1, 3);
      const v = 0.93 + 0.06 * n;
      set(x, y, v, v * 0.985, v * 0.93);
    }
  }
  // The gutter down the middle.
  for (let y = 0; y < height; y++) {
    for (let x = width / 2 - 7; x < width / 2 + 7; x++) {
      const f = 1 - Math.abs(x - width / 2) / 7;
      set(x, y, 0.55 * (1 - f * 0.5), 0.53 * (1 - f * 0.5), 0.48 * (1 - f * 0.5));
    }
  }
  // Two columns of body text.
  for (const column of [0, 1]) {
    const x0 = column === 0 ? 30 : width / 2 + 20;
    const y0 = 26;
    const w = width / 2 - 60;
    // A heading bar.
    for (let y = y0; y < y0 + 7; y++) {
      for (let x = x0; x < x0 + w * 0.55; x++) set(x, y, 0.16, 0.17, 0.2);
    }
    for (let line = 0; line < 22; line++) {
      const y = y0 + 22 + line * 12;
      let x = x0;
      const words = 4 + Math.floor(rand() * 4);
      for (let k = 0; k < words; k++) {
        const len = 10 + rand() * 30;
        for (let i = 0; i < len; i++) {
          const px = Math.round(x + i);
          const py = y + Math.round(Math.sin(i * 0.6) * 0.6);
          set(px, py, 0.24, 0.25, 0.28);
        }
        x += len + 7;
        if (x > x0 + w) break;
      }
    }
    // A technical diagram with boxes and a leader line.
    const dx = x0 + 20;
    const dy = y0 + 296;
    for (let y = dy; y < dy + 62; y++) {
      for (let x = dx; x < dx + 96; x++) {
        const border = x < dx + 2 || x > dx + 93 || y < dy + 2 || y > dy + 59;
        if (border) set(x, y, 0.22, 0.24, 0.3);
      }
    }
    for (let i = 0; i < 96; i++) set(dx + 8, dy + 12 + Math.round(Math.sin(i * 0.3) * 8), 0.4, 0.42, 0.5);
    for (let i = 0; i < 40; i++) set(dx + 20 + i, dy + 40, 0.4, 0.42, 0.5);
  }
  return data;
}

/** A nylon net: transparent holes with a woven thread. */
function makeNet(size = 256) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const bx = x % 24;
      const by = y % 24;
      const onThread = bx < 4 || by < 4;
      const p = (y * size + x) * 4;
      if (onThread) {
        const v = 0.26 + 0.1 * hash3(x, y, 1);
        data[p] = v * 255;
        data[p + 1] = v * 0.95 * 255;
        data[p + 2] = v * 0.85 * 255;
        data[p + 3] = 255;
      } else {
        data[p] = 0;
        data[p + 1] = 0;
        data[p + 2] = 0;
        data[p + 3] = 0;
      }
    }
  }
  return data;
}

/** A leaf: a rounded blade with a vein, on transparent ground. */
function makeLeaf(size = 256) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const u = (x / size) * 2 - 1;
      const v = (y / size) * 2 - 1;
      // A leaf shape: wide in the middle, pointed at the tip.
      const width = Math.pow(Math.max(0, 1 - v * v), 0.62) * (1 - v * 0.18);
      const inside = Math.abs(u) < width && v > -0.95;
      const p = (y * size + x) * 4;
      if (!inside) {
        data[p + 3] = 0;
        continue;
      }
      const veins = 0.5 + 0.5 * Math.sin(v * 26 + Math.abs(u) * 9);
      const n = fbm3(x * 0.07, y * 0.07, 4.4, 3);
      const g = 0.55 + 0.35 * veins * (1 - Math.abs(u) / Math.max(width, 0.01)) + 0.12 * n;
      data[p] = clamp(0.16 * g, 0, 1) * 255;
      data[p + 1] = clamp(0.45 * g, 0, 1) * 255;
      data[p + 2] = clamp(0.16 * g, 0, 1) * 255;
      // The central vein.
      if (Math.abs(u) < 0.022) {
        data[p] = 0.3 * g * 255;
        data[p + 1] = 0.55 * g * 255;
        data[p + 2] = 0.22 * g * 255;
      }
      data[p + 3] = 255;
    }
  }
  return data;
}

/** A technical drawing clipped to the wall. */
function makeBlueprint(size = 512) {
  const data = new Uint8Array(size * size * 4);
  const set = (x, y, r, g, b) => {
    const p = ((y % size) * size + (x % size)) * 4;
    data[p] = clamp(r, 0, 1) * 255;
    data[p + 1] = clamp(g, 0, 1) * 255;
    data[p + 2] = clamp(b, 0, 1) * 255;
    data[p + 3] = 255;
  };
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grid = (x % 32 < 1 || y % 32 < 1) ? 0.16 : 0.11;
      const n = fbm3(x * 0.02, y * 0.02, 9.1, 3) * 0.05;
      set(x, y, grid + n, grid + n * 1.1, grid + n * 1.4);
    }
  }
  // A section drawing of a module: nested outlines and a dimension line.
  const ellipse = (cx, cy, rx, ry, colour) => {
    for (let a = 0; a < 720; a++) {
      const t = (a / 720) * Math.PI * 2;
      const x = Math.round(cx + Math.cos(t) * rx);
      const y = Math.round(cy + Math.sin(t) * ry);
      set(x, y, colour[0], colour[1], colour[2]);
      set(x + 1, y, colour[0] * 0.6, colour[1] * 0.6, colour[2] * 0.6);
    }
  };
  ellipse(256, 250, 200, 120, [0.72, 0.8, 0.92]);
  ellipse(256, 250, 176, 104, [0.55, 0.68, 0.86]);
  ellipse(256, 250, 70, 42, [0.7, 0.8, 0.9]);
  for (let x = 56; x <= 456; x++) {
    if (x % 9 < 4) set(x, 400, 0.6, 0.72, 0.86);
  }
  for (let x = 56; x <= 456; x += 8) {
    set(x, 394, 0.6, 0.72, 0.86);
    set(x, 406, 0.6, 0.72, 0.86);
  }
  for (let y = 60; y < 120; y++) set(120, y, 0.6, 0.72, 0.86);
  // A title block.
  for (let y = 440; y < 500; y++) {
    for (let x = 300; x < 500; x++) {
      const border = x < 303 || x > 496 || y < 443 || y > 496;
      set(x, y, border ? 0.68 : 0.13, border ? 0.78 : 0.16, border ? 0.92 : 0.22);
    }
  }
  for (let i = 0; i < 4; i++) {
    for (let y = 452 + i * 10; y < 456 + i * 10; y++) {
      for (let x = 312; x < 420 - i * 40; x++) set(x, y, 0.6, 0.7, 0.84);
    }
  }
  return data;
}

/** A cable bundle wrap: a woven sleeve. */
function makeCableWrap(size = 256) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const weave = (Math.sin(x * 0.9) * 0.5 + 0.5) * (Math.sin(y * 0.9) * 0.5 + 0.5);
      const stripe = Math.floor(x / 16) % 2 === 0 ? 1 : 0.72;
      const v = (0.3 + 0.25 * weave) * stripe;
      const p = (y * size + x) * 4;
      data[p] = v * 255;
      data[p + 1] = v * 0.98 * 255;
      data[p + 2] = v * 0.92 * 255;
      data[p + 3] = 255;
    }
  }
  return data;
}

/* -------------------------------------------------------------------------- */
/*  Run                                                                        */
/* -------------------------------------------------------------------------- */

mkdirSync(OUT, { recursive: true });

console.log("earth maps...");
const earth = makeEarthMaps(1024, 512);
write("earth_day.png", 1024, 512, earth.day);
write("earth_night.png", 1024, 512, earth.night);
write("earth_clouds.png", 1024, 512, earth.clouds);

console.log("surface textures...");
write("wall_panels.png", 1024, 1024, makeWallPanels(1024));
write("floor_grate.png", 512, 512, makeFloorGrate(512));
write("fabric_bag.png", 512, 512, makeFabric(512, [0.26, 0.33, 0.4]));
write("fabric_towel.png", 256, 256, makeFabric(256, [0.62, 0.6, 0.55]));
write("desk_top.png", 512, 512, makeDesk(512));
write("memo_board.png", 512, 512, makeMemoBoard(512));
write("book_pages.png", 512, 384, makeBookPages(512, 384));
write("net.png", 256, 256, makeNet(256));
write("leaf.png", 256, 256, makeLeaf(256));
write("blueprint.png", 512, 512, makeBlueprint(512));
write("cable_wrap.png", 256, 256, makeCableWrap(256));

console.log("done");
