import * as THREE from 'three';
import { SimplexNoise, clamp01, createRng, smoothstep } from './noise';

/**
 * Isotropic fractal simplex noise in [0, 1], centred on 0.5 with its spread normalised. Tiled copies
 * are cross-faded at the borders so the result wraps without a seam.
 */
function fractalNoise(size: number, seed: number, octaves: number, cells: number, tileable: boolean): Float32Array {
  const noise = new SimplexNoise(seed);
  const field = new Float32Array(size * size);
  let amplitude = 1;
  let total = 0;
  for (let octave = 0; octave < octaves; octave++) {
    const period = cells << octave;
    const scale = period / size;
    const depth = octave * 7.31;
    for (let y = 0; y < size; y++) {
      const v = y * scale;
      for (let x = 0; x < size; x++) {
        const u = x * scale;
        let value = noise.noise3(u, v, depth);
        if (tileable) {
          // Bilinear blend of four shifted copies, so opposite edges of the tile agree.
          const wrapU = u / period;
          const wrapV = v / period;
          value =
            value * (1 - wrapU) * (1 - wrapV) +
            noise.noise3(u - period, v, depth) * wrapU * (1 - wrapV) +
            noise.noise3(u, v - period, depth) * (1 - wrapU) * wrapV +
            noise.noise3(u - period, v - period, depth) * wrapU * wrapV;
        }
        field[y * size + x] += amplitude * value;
      }
    }
    total += amplitude;
    amplitude *= 0.5;
  }
  let mean = 0;
  for (let i = 0; i < field.length; i++) mean += field[i];
  mean /= field.length;
  let variance = 0;
  for (let i = 0; i < field.length; i++) variance += (field[i] - mean) ** 2;
  const deviation = Math.sqrt(variance / field.length) || 1;
  for (let i = 0; i < field.length; i++) field[i] = clamp01(0.5 + ((field[i] - mean) / deviation) * 0.2);
  return field;
}

function dataTexture(red: Float32Array, green: Float32Array, alpha: Float32Array, size: number): THREE.DataTexture {
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < red.length; i++) {
    data[i * 4] = Math.round(Math.min(1, Math.max(0, red[i])) * 255);
    data[i * 4 + 1] = Math.round(Math.min(1, Math.max(0, green[i])) * 255);
    data[i * 4 + 2] = Math.round(Math.min(1, Math.max(0, green[i])) * 255);
    data[i * 4 + 3] = Math.round(Math.min(1, Math.max(0, alpha[i])) * 255);
  }
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

/** Neutral noise used for rock detail and shader effects. */
export function createNoiseTexture(size = 256): THREE.DataTexture {
  const field = fractalNoise(size, 7, 5, 4, true);
  const alpha = new Float32Array(size * size).fill(1);
  return dataTexture(field, field, alpha, size);
}

/**
 * One soft cloud. Red carries baked lighting (lit from the upper left) and alpha the silhouette.
 * A cloud is the union of a few round lobes; `softness` near 1 flattens it into a single wide mist.
 */
export function createPuffTexture(size: number, seed: number, softness: number): THREE.DataTexture {
  const random = createRng(seed);
  const lobes: [number, number, number, number][] = [];
  for (let i = 0; i < (softness > 0.6 ? 1 : 7); i++) {
    const angle = random() * Math.PI * 2;
    const spread = random() * 0.5 * (1 - softness);
    const radius = 0.3 + random() * 0.3;
    lobes.push([Math.cos(angle) * spread, Math.sin(angle) * spread * 0.7 + 0.05, radius, radius * (0.72 + random() * 0.25)]);
  }
  const billow = fractalNoise(size, seed, 3, 3, false);

  const field = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    const v = ((y + 0.5) / size) * 2 - 1;
    for (let x = 0; x < size; x++) {
      const u = ((x + 0.5) / size) * 2 - 1;
      let density = -1;
      for (const [cx, cy, rx, ry] of lobes) {
        density = Math.max(density, 1 - ((u - cx) / rx) ** 2 - ((v - cy) / ry) ** 2);
      }
      field[y * size + x] = density + (billow[y * size + x] - 0.5) * (0.8 - softness * 0.7);
    }
  }

  const light = new Float32Array(size * size);
  const alpha = new Float32Array(size * size);
  const relief = 0.25 * (1 - softness * 0.6);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const left = field[y * size + ((x - 1 + size) % size)];
      const right = field[y * size + ((x + 1) % size)];
      const below = field[((y - 1 + size) % size) * size + x];
      const above = field[((y + 1) % size) * size + x];
      // Treat the density as a height field and light its slope from the upper left.
      const nx = -(right - left) * (size / 4) * relief;
      const ny = -(above - below) * (size / 4) * relief;
      const facing = Math.max(0, (-0.45 * nx + 0.8 * ny + 0.4) / Math.hypot(nx, ny, 1));
      light[i] = 0.3 + 0.75 * facing;
      alpha[i] = smoothstep(-0.1, 0.3 + softness * 0.6, field[i]);
    }
  }
  return dataTexture(light, light, alpha, size);
}

/** Paved plaza with a pale-gold sundial inlay, for the disc the observatory stands on. */
export function createPlazaTexture(size = 1024): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is unavailable');
  const c = size / 2;

  ctx.fillStyle = '#efe6d3';
  ctx.fillRect(0, 0, size, size);

  const ring = (radius: number, stroke: string, width: number): void => {
    ctx.beginPath();
    ctx.arc(c, c, radius * c, 0, Math.PI * 2);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  };
  const spoke = (from: number, to: number, angle: number, stroke: string, width: number): void => {
    ctx.beginPath();
    ctx.moveTo(c + Math.cos(angle) * from * c, c + Math.sin(angle) * from * c);
    ctx.lineTo(c + Math.cos(angle) * to * c, c + Math.sin(angle) * to * c);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  // Faint joints of the paving.
  for (let r = 0.14; r < 0.98; r += 0.105) ring(r, 'rgba(122,106,84,0.14)', 2);
  for (let i = 0; i < 48; i++) spoke(0.12, 0.98, (i / 48) * Math.PI * 2, 'rgba(122,106,84,0.12)', 2);

  // Gold inlay: rings, day-lines and a sixteen-point sun at the centre.
  const gold = 'rgba(214,174,88,0.9)';
  for (const [r, w] of [[0.975, 7], [0.93, 3], [0.74, 4], [0.5, 6], [0.3, 3]] as const) ring(r, gold, w);
  for (let i = 0; i < 24; i++) spoke(0.3, i % 6 === 0 ? 0.975 : 0.74, (i / 24) * Math.PI * 2, gold, i % 6 === 0 ? 6 : 2.5);
  ctx.beginPath();
  for (let i = 0; i < 32; i++) {
    const radius = (i % 2 === 0 ? 0.2 : 0.085) * c;
    const angle = (i / 32) * Math.PI * 2;
    ctx.lineTo(c + Math.cos(angle) * radius, c + Math.sin(angle) * radius);
  }
  ctx.closePath();
  ctx.fillStyle = gold;
  ctx.fill();
  ring(0.05, '#fff6dc', 5);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Two frames of a gliding bird, wings raised on the left and lowered on the right. */
export function createBirdTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is unavailable');
  const frame = (cx: number, raised: boolean): void => {
    ctx.beginPath();
    ctx.ellipse(cx, 34, 4, 2.4, 0, 0, Math.PI * 2);
    for (const side of [-1, 1]) {
      ctx.moveTo(cx, 33);
      ctx.quadraticCurveTo(cx + side * 12, raised ? 14 : 38, cx + side * 29, raised ? 4 : 42);
      ctx.lineTo(cx + side * 27, raised ? 9 : 46);
      ctx.quadraticCurveTo(cx + side * 12, raised ? 22 : 45, cx, 37);
    }
    ctx.fill();
  };
  ctx.fillStyle = 'rgba(34,36,46,1)';
  frame(32, true);
  frame(96, false);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
