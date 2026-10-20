/**
 * Procedurally generated textures. Nothing is loaded from the network: every
 * pixel in the scene is produced at runtime on a 2D canvas.
 */

import * as THREE from "three";
import { mulberry32 } from "./noise";

function makeCanvas(size: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context is unavailable");
  return { canvas, ctx };
}

/**
 * One voxel block of surface grain.
 *
 * The texture is mapped so that a single world unit equals one repetition, so
 * the dark rim of the tile draws the seam between two neighbouring blocks and
 * the noisy interior gives each block its own weathering.
 */
export function createBlockGrainTexture(): THREE.Texture {
  const size = 32;
  const { canvas, ctx } = makeCanvas(size);
  const random = mulberry32(0x5eed1);

  const image = ctx.createImageData(size, size);
  for (let i = 0; i < size * size; i++) {
    const v = 196 + Math.floor(random() * 59);
    image.data[i * 4 + 0] = v;
    image.data[i * 4 + 1] = v;
    image.data[i * 4 + 2] = v;
    image.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);

  // Subtle block seam: darker along the right and bottom edge of the tile.
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = "#000000";
  ctx.fillRect(size - 2, 0, 2, size);
  ctx.fillRect(0, size - 2, size, 2);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Vertical streaks used by the falling water sheets. */
export function createWaterfallTexture(): THREE.Texture {
  const size = 64;
  const { canvas, ctx } = makeCanvas(size);
  const random = mulberry32(0x7a7e5);

  ctx.fillStyle = "#cfe9ff";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 90; i++) {
    const x = Math.floor(random() * size);
    const width = 1 + Math.floor(random() * 3);
    const tone = 150 + Math.floor(random() * 105);
    ctx.fillStyle = `rgba(${tone},${tone + 18},255,${0.25 + random() * 0.5})`;
    ctx.fillRect(x, 0, width, size);
  }
  for (let i = 0; i < 40; i++) {
    const x = Math.floor(random() * size);
    const width = 1 + Math.floor(random() * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.15 + random() * 0.4})`;
    ctx.fillRect(x, 0, width, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Soft radial sprite for the spray particles at the foot of a fall. */
export function createSprayTexture(): THREE.Texture {
  const size = 64;
  const { canvas, ctx } = makeCanvas(size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.35, "rgba(224,242,255,0.55)");
  gradient.addColorStop(1, "rgba(200,230,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Soft haze puff used for the mist that rises where a fall lands. */
export function createMistTexture(): THREE.Texture {
  const size = 64;
  const { canvas, ctx } = makeCanvas(size);
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255,255,255,0.7)");
  gradient.addColorStop(0.45, "rgba(236,246,255,0.32)");
  gradient.addColorStop(1, "rgba(220,238,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Fine leaf speckle for tree canopies. */export function createLeafTexture(): THREE.Texture {
  const size = 32;
  const { canvas, ctx } = makeCanvas(size);
  const random = mulberry32(0x1eaf);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 220; i++) {
    const shade = 150 + Math.floor(random() * 105);
    ctx.fillStyle = `rgba(${shade},${shade},${shade},0.55)`;
    ctx.fillRect(Math.floor(random() * size), Math.floor(random() * size), 2, 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
