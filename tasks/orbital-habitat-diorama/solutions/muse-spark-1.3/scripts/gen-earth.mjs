// Procedural Earth textures: equirectangular 2:1 day / night / clouds.
// Day and night share one landmask, so continents match during blending.
// No external input: seeded PRNG + value-noise fbm. Writes RGBA PNGs
// with a hand-rolled encoder (node:zlib for deflate).
import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets')

mkdirSync(root, { recursive: true })

function mulberry32 (seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const crcTable = new Int32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  crcTable[n] = c
}
function crc (buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
function chunk (type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
  const td = Buffer.from(type, 'ascii')
  const cd = Buffer.alloc(4); cd.writeUInt32BE(crc(Buffer.concat([td, data])))
  return Buffer.concat([len, td, data, cd])
}
function writePNG (path, w, h, rgba) {
  const raw = Buffer.alloc((w * 4 + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0
    Buffer.from(rgba.subarray(y * w * 4, (y + 1) * w * 4)).copy(raw, y * (w * 4 + 1) + 1)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8; ihdr[9] = 6
  const png = Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ])
  writeFileSync(path, png)
  console.log('wrote', path, `${(png.length / 1024).toFixed(0)} KiB`)
}

// Tileable value noise in x (longitude wraps).
function makeNoise (rand, gw, gh) {
  const lat = new Float32Array(gw * gh)
  for (let i = 0; i < lat.length; i++) lat[i] = rand()
  const at = (x, y) => lat[((y % gh + gh) % gh) * gw + ((x % gw + gw) % gw)]
  const sm = t => t * t * (3 - 2 * t)
  return (u, v) => {
    const x = u * gw, y = v * gh
    const x0 = Math.floor(x), y0 = Math.floor(y)
    const fx = sm(x - x0), fy = sm(y - y0)
    // both axes wrap inside at(); never clamp or seams appear
    const yA = y0
    const a = at(x0, yA) + (at(x0 + 1, yA) - at(x0, yA)) * fx
    const b = at(x0, yA + 1) + (at(x0 + 1, yA + 1) - at(x0, yA + 1)) * fx
    return a + (b - a) * fy
  }
}
function fbm (noises, u, v) {
  let s = 0, amp = 0.5, f = 1
  // NOTE: v must wrap, never clamp: clamping a high octave freezes it
  // along y and smears vertical streaks. makeNoise wraps both axes.
  for (const n of noises) { s += amp * n((((u * f) % 1) + 1) % 1, v * f); amp *= 0.5; f *= 2 }
  return s
}

const W = 2048, H = 1024
const rand = mulberry32(20261114)
const n1 = [makeNoise(rand, 8, 4), makeNoise(rand, 16, 8), makeNoise(rand, 32, 16), makeNoise(rand, 64, 32)]
const n2 = [makeNoise(rand, 6, 3), makeNoise(rand, 12, 6), makeNoise(rand, 24, 12)]
const n3 = [makeNoise(rand, 5, 3), makeNoise(rand, 10, 5), makeNoise(rand, 20, 10), makeNoise(rand, 40, 20)]

const day = new Uint8Array(W * H * 4)
const night = new Uint8Array(W * H * 4)
const land = new Uint8Array(W * H)
const moist = new Float32Array(W * H)

for (let y = 0; y < H; y++) {
  const v = y / H
  const latAbs = Math.abs(v - 0.5) * 2 // 0 equator .. 1 pole
  for (let x = 0; x < W; x++) {
    const u = x / W
    const i = y * W + x
    // domain-warped continent field, damped near poles
    const wx = (fbm(n2, (u + 0.37) % 1, v) - 0.5) * 0.22
    const wv = (fbm(n2, (u + 0.61) % 1, v) - 0.5) * 0.1
    const uu = (((u + wx) % 1) + 1) % 1
    const vv = Math.min(0.999, Math.max(0, v + wv))
    const c = fbm(n1, uu, vv) - 0.42 * latAbs * latAbs * latAbs
    land[i] = c > 0.5 ? 1 : 0
    moist[i] = fbm(n2, (u + 0.37) % 1, v)
  }
}

const lerp = (a, b, t) => a + (b - a) * t

for (let y = 0; y < H; y++) {
  const v = y / H
  const latAbs = Math.abs(v - 0.5) * 2
  for (let x = 0; x < W; x++) {
    const i = y * W + x
    const o = i * 4
    const u = x / W
    const detail = fbm(n3, (u + 0.11) % 1, v)
    if (land[i]) {
      // biome by latitude + moisture, boundaries broken up with noise
      const wob = (detail - 0.5) * 0.22
      const latW = latAbs + wob
      const dryness = (latW > 0.12 && latW < 0.48 ? 1 : 0) * (0.52 - moist[i]) * 4
      const dry = dryness > 0.55
      const green = !dry && moist[i] + wob > 0.44
      let r, g, b
      if (latW > 0.8) { r = 232; g = 238; b = 242 } // ice
      else if (dry) { r = 196; g = 168; b = 112 } // desert
      else if (green) { r = 62; g = 128; b = 66 } // forest
      else { r = 128; g = 142; b = 78 } // steppe
      const d = 0.86 + detail * 0.28
      day[o] = Math.min(255, r * d); day[o + 1] = Math.min(255, g * d); day[o + 2] = Math.min(255, b * d)
      // coasts: lighten rim pixels next to ocean
      day[o + 3] = 255
    } else {
      const depth = 0.75 + detail * 0.5
      day[o] = 18 * depth; day[o + 1] = 62 * depth; day[o + 2] = 128 * depth; day[o + 3] = 255
      if (latAbs > 0.88) { day[o] = 225; day[o + 1] = 233; day[o + 2] = 240 } // sea ice
    }
    // night: dark base + city lights on temperate land
    night[o] = 4; night[o + 1] = 7; night[o + 2] = 16; night[o + 3] = 255
    if (land[i] && latAbs < 0.72) {
      const urban = fbm(n2, (u * 3 + 0.53) % 1, v * 3)
      let glow = Math.max(0, urban - 0.46) * 4.2
      if (glow > 0) {
        glow = Math.min(1, glow) * (0.35 + 0.65 * detail)
        night[o] = lerp(8, 255, glow)
        night[o + 1] = lerp(10, 190, glow)
        night[o + 2] = lerp(24, 110, glow)
      }
    }
  }
}

// soften city glow with one box blur pass on night rgb
{
  const src = night.slice()
  for (let y = 1; y < H - 1; y++) {
    for (let x = 0; x < W; x++) {
      const xm = (x - 1 + W) % W, xp = (x + 1) % W
      const o = (y * W + x) * 4
      for (let k = 0; k < 3; k++) {
        night[o + k] = (src[o + k] * 2 + src[(y * W + xm) * 4 + k] + src[(y * W + xp) * 4 + k] +
          src[((y - 1) * W + x) * 4 + k] + src[((y + 1) * W + x) * 4 + k]) / 6
      }
    }
  }
}

// clouds: alpha from banded fbm swirls
const CW = 512, CH = 256
const cn = [makeNoise(mulberry32(77), 6, 3), makeNoise(mulberry32(78), 12, 6), makeNoise(mulberry32(79), 24, 12)]
const clouds = new Uint8Array(CW * CH * 4)
for (let y = 0; y < CH; y++) {
  const v = y / CH
  for (let x = 0; x < CW; x++) {
    const u = x / CW
    const swirl = 0.08 * Math.sin(u * Math.PI * 2 * 2 + v * 9)
    let c = fbm(cn, (u + swirl) % 1 < 0 ? (u + swirl + 1) % 1 : (u + swirl) % 1, v) - 0.5
    // spiral storm spots
    const dx = u - 0.3, dy = (v - 0.62) * 2
    c += Math.max(0, 0.16 - Math.sqrt(dx * dx + dy * dy)) * 2.2
    const a = Math.max(0, Math.min(1, c * 3.4))
    const o = (y * CW + x) * 4
    const shade = 235 + Math.floor(20 * fbm(cn, u, v))
    clouds[o] = shade; clouds[o + 1] = shade; clouds[o + 2] = 255
    clouds[o + 3] = Math.floor(a * 235)
  }
}

writePNG(join(root, 'earth_day.png'), W, H, day)
writePNG(join(root, 'earth_night.png'), W, H, night)
writePNG(join(root, 'earth_clouds.png'), CW, CH, clouds)
