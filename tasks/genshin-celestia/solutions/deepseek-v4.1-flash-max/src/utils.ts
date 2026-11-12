import * as THREE from 'three';

export type Random = () => number;

export function mulberry32(seed: number): Random {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function fractalNoise(x: number, y: number, seed = 0): number {
  const hash = (ix: number, iy: number): number => {
    let n = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(seed, 1442695041);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  };

  const smooth = (t: number): number => t * t * (3 - 2 * t);
  const sample = (px: number, py: number): number => {
    const ix = Math.floor(px);
    const iy = Math.floor(py);
    const fx = smooth(px - ix);
    const fy = smooth(py - iy);
    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);
    return THREE.MathUtils.lerp(
      THREE.MathUtils.lerp(a, b, fx),
      THREE.MathUtils.lerp(c, d, fx),
      fy,
    );
  };

  let total = 0;
  let amplitude = 0.55;
  let frequency = 1;
  let normalizer = 0;
  for (let octave = 0; octave < 5; octave += 1) {
    total += sample(x * frequency, y * frequency) * amplitude;
    normalizer += amplitude;
    amplitude *= 0.5;
    frequency *= 2.07;
  }
  return total / normalizer;
}

export function createToonGradient(): THREE.DataTexture {
  const data = new Uint8Array([42, 92, 145, 198, 238, 255]);
  const texture = new THREE.DataTexture(data, data.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

export function createRadialTexture(
  size = 256,
  inner = 'rgba(255,255,255,1)',
  middle = 'rgba(255,244,206,0.45)',
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2D canvas is unavailable.');
  }
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, inner);
  gradient.addColorStop(0.22, middle);
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createCloudTexture(seed: number, width = 512, height = 256): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2D canvas is unavailable.');
  }
  const random = mulberry32(seed);
  const puffs: Array<{ x: number; y: number; rx: number; ry: number }> = [];
  for (let index = 0; index < 7; index += 1) {
    puffs.push({
      x: width * (0.15 + index * 0.115 + (random() - 0.5) * 0.025),
      y: height * (0.57 + (random() - 0.5) * 0.035),
      rx: width * (0.08 + random() * 0.055),
      ry: height * (0.07 + random() * 0.042),
    });
  }
  for (let index = 0; index < 6; index += 1) {
    puffs.push({
      x: width * (0.23 + index * 0.11 + (random() - 0.5) * 0.045),
      y: height * (0.46 + (random() - 0.5) * 0.05),
      rx: width * (0.07 + random() * 0.07),
      ry: height * (0.085 + random() * 0.07),
    });
  }
  for (let index = 0; index < 5; index += 1) {
    puffs.push({
      x: width * (0.32 + index * 0.09 + (random() - 0.5) * 0.035),
      y: height * (0.35 + (random() - 0.5) * 0.045),
      rx: width * (0.045 + random() * 0.06),
      ry: height * (0.055 + random() * 0.06),
    });
  }
  puffs.push({
    x: width * (0.24 + random() * 0.06),
    y: height * (0.52 + random() * 0.04),
    rx: width * 0.042,
    ry: height * 0.05,
  });

  const buildPath = (offsetY = 0): void => {
    context.beginPath();
    for (const puff of puffs) {
      context.ellipse(
        puff.x,
        puff.y + offsetY,
        puff.rx,
        puff.ry,
        0,
        0,
        Math.PI * 2,
      );
    }
  };

  context.save();
  context.filter = 'blur(5px)';
  context.fillStyle = 'rgba(177, 202, 219, 0.7)';
  buildPath(height * 0.018);
  context.fill();
  context.restore();

  context.save();
  context.filter = 'blur(0.7px)';
  context.fillStyle = '#f9fdff';
  buildPath();
  context.fill();
  context.restore();

  context.save();
  buildPath();
  context.clip();
  const baseGradient = context.createLinearGradient(0, height * 0.22, 0, height * 0.69);
  baseGradient.addColorStop(0, '#fffdfa');
  baseGradient.addColorStop(0.38, '#f8fcff');
  baseGradient.addColorStop(0.72, '#e0edf6');
  baseGradient.addColorStop(1, '#c3d9e9');
  context.fillStyle = baseGradient;
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 22; i += 1) {
    const x = width * (0.2 + random() * 0.6);
    const y = height * (0.31 + random() * 0.3);
    const radius = width * (0.025 + random() * 0.075);
    const glow = context.createRadialGradient(x - radius * 0.25, y - radius * 0.3, 0, x, y, radius);
    glow.addColorStop(0, 'rgba(255, 255, 250, 0.55)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = glow;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  for (let i = 0; i < 10; i += 1) {
    const x = width * (0.25 + random() * 0.5);
    const y = height * (0.52 + random() * 0.1);
    const radius = width * (0.035 + random() * 0.07);
    const shade = context.createRadialGradient(x, y, 0, x, y, radius);
    shade.addColorStop(0, 'rgba(133, 169, 196, 0.2)');
    shade.addColorStop(1, 'rgba(133, 169, 196, 0)');
    context.fillStyle = shade;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  context.globalAlpha = 0.05;
  for (let i = 0; i < 160; i += 1) {
    context.fillStyle = random() > 0.5 ? '#7ca6c4' : '#ffffff';
    context.fillRect(random() * width, random() * height, 1.2, 1.2);
  }
  context.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function createStoneDetailTexture(seed: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2D canvas is unavailable.');
  }
  const image = context.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const warpedY = y * 0.045 + fractalNoise(x * 0.009, y * 0.02, seed) * 10;
      const strata =
        Math.sin(warpedY * 2.9) * 14 +
        Math.sin(warpedY * 8.7 + 1.7) * 6 +
        Math.sin(warpedY * 21.3) * 2.5;
      const grit =
        (fractalNoise(x * 0.06, y * 0.11, seed + 11) - 0.5) * 42 +
        (fractalNoise(x * 0.22, y * 0.31, seed + 27) - 0.5) * 20;
      const value = THREE.MathUtils.clamp(205 + strata + grit, 132, 245);
      const index = (y * size + x) * 4;
      image.data[index] = value;
      image.data[index + 1] = value * 0.985;
      image.data[index + 2] = value * 0.95;
      image.data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  context.globalAlpha = 0.16;
  context.strokeStyle = '#5e5145';
  for (let i = 0; i < 38; i += 1) {
    const random = mulberry32(seed * 97 + i);
    const y = random() * size;
    context.beginPath();
    context.moveTo(0, y);
    for (let x = 0; x <= size; x += 24) {
      context.lineTo(x, y + Math.sin(x * 0.025 + i) * 4 + (random() - 0.5) * 3);
    }
    context.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

export function createGroundDetailTexture(seed: number): THREE.CanvasTexture {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('2D canvas is unavailable.');
  }
  const image = context.createImageData(size, size);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const broad = fractalNoise(x * 0.018, y * 0.022, seed) - 0.5;
      const fine = fractalNoise(x * 0.12, y * 0.16, seed + 31) - 0.5;
      const blades = Math.sin(x * 0.19 + y * 0.07) * Math.sin(y * 0.16) * 6;
      const value = THREE.MathUtils.clamp(205 + broad * 34 + fine * 18 + blades, 160, 242);
      const index = (y * size + x) * 4;
      image.data[index] = value * 0.98;
      image.data[index + 1] = value;
      image.data[index + 2] = value * 0.91;
      image.data[index + 3] = 255;
    }
  }
  context.putImageData(image, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 8;
  return texture;
}

export function smoothNoise(x: number, y: number, seed = 0): number {
  return fractalNoise(x, y, seed);
}

export function setShadows(root: THREE.Object3D, cast = true, receive = true): void {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });
}

export function makeMesh(
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  name?: string,
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  if (name) {
    mesh.name = name;
  }
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}
