/**
 * The grounds: paving, the enclosing wall, the gate, trees, lanterns and the
 * stone lions.
 *
 * The ground is a single plane with a procedurally drawn texture rather than
 * a field of voxels, which keeps the polygon count for the model itself.
 */

import * as THREE from "three";
import { PALETTE, mixColor, shade } from "./palette";
import type { Box } from "./voxel";

export const GROUND_SIZE = 260;

/**
 * Draws the paving in world coordinates: a stone courtyard, a central axis
 * path, moss in the joints and a few weathered patches.
 */
export function createGroundTexture(): THREE.Texture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2D canvas context is unavailable");

  const toPixel = (world: number) => ((world + GROUND_SIZE / 2) / GROUND_SIZE) * size;

  ctx.fillStyle = "#54663f";
  ctx.fillRect(0, 0, size, size);

  // Broad patches of drier and darker grass.
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 30 + Math.random() * 110;
    const dry = Math.random() > 0.5;
    ctx.fillStyle = dry
      ? `rgba(${118 + Math.random() * 30},${120 + Math.random() * 26},${74 + Math.random() * 20},0.22)`
      : `rgba(${44 + Math.random() * 24},${62 + Math.random() * 28},${38 + Math.random() * 18},0.26)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Grass mottling.
  for (let i = 0; i < 9000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 2 + Math.random() * 8;
    ctx.fillStyle = `rgba(${74 + Math.random() * 44},${96 + Math.random() * 48},${54 + Math.random() * 32},0.34)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Scattered fallen needles and leaves.
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = `rgba(${140 + Math.random() * 40},${110 + Math.random() * 30},${60 + Math.random() * 30},0.22)`;
    ctx.fillRect(x, y, 2 + Math.random() * 5, 2 + Math.random() * 3);
  }

  const drawPaving = (x0: number, x1: number, z0: number, z1: number, slab: number) => {
    const px0 = toPixel(x0);
    const px1 = toPixel(x1);
    const pz0 = toPixel(z0);
    const pz1 = toPixel(z1);
    ctx.fillStyle = "#7b776c";
    ctx.fillRect(px0, pz0, px1 - px0, pz1 - pz0);
    ctx.strokeStyle = "rgba(46,44,38,0.5)";
    ctx.lineWidth = 1.5;
    for (let x = px0; x <= px1; x += (size / GROUND_SIZE) * slab) {
      ctx.beginPath();
      ctx.moveTo(x, pz0);
      ctx.lineTo(x, pz1);
      ctx.stroke();
    }
    for (let y = pz0; y <= pz1; y += (size / GROUND_SIZE) * slab) {
      ctx.beginPath();
      ctx.moveTo(px0, y);
      ctx.lineTo(px1, y);
      ctx.stroke();
    }
    // Moss in the joints.
    for (let i = 0; i < 140; i++) {
      const x = px0 + Math.random() * (px1 - px0);
      const y = pz0 + Math.random() * (pz1 - pz0);
      ctx.fillStyle = `rgba(84,110,60,${0.12 + Math.random() * 0.2})`;
      ctx.fillRect(x, y, 3 + Math.random() * 10, 3 + Math.random() * 8);
    }
  };

  // The courtyard between the gate and the main hall.
  drawPaving(-34, 34, -46, 74, 4);
  // The central axis path, running the whole length of the complex.
  drawPaving(-7, 7, -62, 96, 3);
  // Aprons in front of the side halls.
  drawPaving(-70, -22, -30, 4, 4);
  drawPaving(22, 70, -30, 4, 4);
  // The platform under the main hall.
  drawPaving(-32, 32, -66, -34, 4);
  // The square in front of the gate.
  drawPaving(-22, 22, 74, 96, 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** A stone lion on a plinth, the traditional guardian of a gate. */
export function buildLion(x: number, z: number, facing: number): Box[] {
  const boxes: Box[] = [];
  const s = facing < 0 ? -1 : 1;
  boxes.push({
    min: [x - 1.8, 0, z - 1.8],
    max: [x + 1.8, 1.6, z + 1.8],
    color: PALETTE.stoneLight,
  });
  boxes.push({
    min: [x - 1.4, 1.6, z - 1.4],
    max: [x + 1.4, 2.4, z + 1.4],
    color: PALETTE.stone,
  });
  // Body.
  boxes.push({
    min: [x - 1.1, 2.4, z - 1.9],
    max: [x + 1.1, 4.6, z + 0.9],
    color: PALETTE.stone,
  });
  // Head.
  boxes.push({
    min: [x - 0.95, 4.6, z + 0.4],
    max: [x + 0.95, 6.4, z + 1.9],
    color: PALETTE.stoneLight,
  });
  // Mane.
  boxes.push({
    min: [x - 1.15, 4.4, z + 0.2],
    max: [x + 1.15, 5.2, z + 1.5],
    color: PALETTE.stoneDark,
  });
  // Paws.
  for (const px of [-0.85, 0.85]) {
    boxes.push({
      min: [x + px - 0.4, 2.4, z + 0.3],
      max: [x + px + 0.4, 3.1, z + 1.3],
      color: PALETTE.stoneLight,
    });
  }
  // Tail.
  boxes.push({
    min: [x + s * 0.9 - 0.35, 3.4, z - 2.6],
    max: [x + s * 0.9 + 0.35, 4.4, z - 1.6],
    color: PALETTE.stoneDark,
  });
  // Ball under the paw.
  boxes.push({
    min: [x + s * 0.85 - 0.5, 2.4, z + 1.0],
    max: [x + s * 0.85 + 0.5, 3.4, z + 2.0],
    color: PALETTE.stone,
  });
  return boxes;
}

/** A hanging lantern on a post. */
export function buildLantern(x: number, z: number, height = 5): Box[] {
  const boxes: Box[] = [];
  boxes.push({
    min: [x - 0.3, 0, z - 0.3],
    max: [x + 0.3, height, z + 0.3],
    color: PALETTE.woodDark,
  });
  boxes.push({
    min: [x - 1.3, height, z - 1.3],
    max: [x + 1.3, height + 0.4, z + 1.3],
    color: PALETTE.wood,
  });
  boxes.push({
    min: [x - 0.9, height - 2.2, z - 0.9],
    max: [x + 0.9, height, z + 0.9],
    color: PALETTE.lantern,
  });
  boxes.push({
    min: [x - 1.0, height - 0.2, z - 1.0],
    max: [x + 1.0, height + 0.25, z + 1.0],
    color: PALETTE.goldDark,
  });
  boxes.push({
    min: [x - 1.0, height - 2.4, z - 1.0],
    max: [x + 1.0, height - 2.2, z + 1.0],
    color: PALETTE.goldDark,
  });
  return boxes;
}

/** A stylised pine, the classic tree of a Chinese garden. */
export function buildPine(x: number, z: number, scale: number, salt: number): Box[] {
  const boxes: Box[] = [];
  const trunkHeight = (3.2 + ((salt * 7) % 3)) * scale;
  boxes.push({
    min: [x - 0.45 * scale, 0, z - 0.45 * scale],
    max: [x + 0.45 * scale, trunkHeight, z + 0.45 * scale],
    color: PALETTE.trunk,
  });
  const tiers = 3;
  for (let t = 0; t < tiers; t++) {
    const r = (3.4 - t * 0.9) * scale;
    const y = trunkHeight - 1.2 * scale + t * 1.7 * scale;
    const color = t % 2 === 0 ? PALETTE.leaf : PALETTE.leafDark;
    boxes.push({
      min: [x - r, y, z - r],
      max: [x + r, y + 1.1 * scale, z + r],
      color,
    });
  }
  // A flat cap so the crown reads as a clipped cloud, as in a garden pine.
  const cap = 1.5 * scale;
  boxes.push({
    min: [x - cap, trunkHeight + 2.2 * scale, z - cap],
    max: [x + cap, trunkHeight + 3.0 * scale, z + cap],
    color: PALETTE.leafLight,
  });
  return boxes;
}

/** The red perimeter wall with a tiled coping. */
export function buildWall(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  height: number,
  gateHalf: number,
): Box[] {
  const boxes: Box[] = [];
  const thickness = 1.2;

  const run = (
    axis: "x" | "z",
    from: number,
    to: number,
    fixed: number,
  ) => {
    for (let t = from; t < to; t += 2) {
      const centre = t + 1;
      const inGate: boolean = axis === "x" && Math.abs(centre) < gateHalf;
      const h = inGate ? height * 0.35 : height;
      boxes.push({
        min: axis === "x"
          ? [t, 0, fixed - thickness / 2]
          : [fixed - thickness / 2, 0, t],
        max: axis === "x"
          ? [t + 2, h, fixed + thickness / 2]
          : [fixed + thickness / 2, h, t + 2],
        color: PALETTE.wallRed,
      });
      boxes.push({
        min: axis === "x"
          ? [t, h, fixed - thickness / 2 - 0.5]
          : [fixed - thickness / 2 - 0.5, h, t],
        max: axis === "x"
          ? [t + 2, h + 0.7, fixed + thickness / 2 + 0.5]
          : [fixed + thickness / 2 + 0.5, h + 0.7, t + 2],
        color: PALETTE.tileGreyDark,
      });
    }
  };

  run("x", x0, x1, z0);
  run("x", x0, x1, z1);
  run("z", z0, z1, x0);
  run("z", z0, z1, x1);
  return boxes;
}

/** A ceremonial bronze vessel on the axis in front of the main hall. */
export function buildCenser(x: number, z: number): Box[] {
  const boxes: Box[] = [];
  boxes.push({
    min: [x - 1.8, 0, z - 1.8],
    max: [x + 1.8, 0.9, z + 1.8],
    color: PALETTE.stoneLight,
  });
  boxes.push({
    min: [x - 1.2, 0.9, z - 1.2],
    max: [x + 1.2, 1.7, z + 1.2],
    color: PALETTE.goldDark,
  });
  boxes.push({
    min: [x - 1.35, 1.7, z - 1.35],
    max: [x + 1.35, 3.3, z + 1.35],
    color: PALETTE.gold,
  });
  boxes.push({
    min: [x - 1.5, 3.3, z - 1.5],
    max: [x + 1.5, 3.8, z + 1.5],
    color: PALETTE.goldDark,
  });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      boxes.push({
        min: [x + sx * 1.1 - 0.25, 3.8, z + sz * 1.1 - 0.25],
        max: [x + sx * 1.1 + 0.25, 5.0, z + sz * 1.1 + 0.25],
        color: PALETTE.gold,
      });
    }
  }
  return boxes;
}

/** A stone stele on a tortoise base, the usual marker on a palace axis. */
export function buildStele(x: number, z: number): Box[] {
  const boxes: Box[] = [];
  boxes.push({
    min: [x - 2.0, 0, z - 1.6],
    max: [x + 2.0, 0.8, z + 1.6],
    color: PALETTE.stoneLight,
  });
  boxes.push({
    min: [x - 1.3, 0.8, z - 1.0],
    max: [x + 1.3, 1.7, z + 1.0],
    color: PALETTE.stone,
  });
  boxes.push({
    min: [x - 0.9, 1.7, z - 0.5],
    max: [x + 0.9, 7.2, z + 0.5],
    color: PALETTE.stoneLight,
  });
  boxes.push({
    min: [x - 1.05, 7.2, z - 0.65],
    max: [x + 1.05, 8.0, z + 0.65],
    color: PALETTE.stone,
  });
  return boxes;
}

/** A small open pavilion for the corners of the courtyard. */
export function buildPavilion(x: number, z: number, scale: number): Box[] {
  const boxes: Box[] = [];
  const s = scale;
  boxes.push({
    min: [x - 4 * s, 0, z - 4 * s],
    max: [x + 4 * s, 1.1 * s, z + 4 * s],
    color: PALETTE.stone,
  });
  boxes.push({
    min: [x - 3.4 * s, 1.1 * s, z - 3.4 * s],
    max: [x + 3.4 * s, 1.6 * s, z + 3.4 * s],
    color: PALETTE.stoneLight,
  });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      boxes.push({
        min: [x + sx * 2.7 * s - 0.4 * s, 1.6 * s, z + sz * 2.7 * s - 0.4 * s],
        max: [x + sx * 2.7 * s + 0.4 * s, 6.2 * s, z + sz * 2.7 * s + 0.4 * s],
        color: PALETTE.wood,
      });
    }
  }
  // Roof: a small pyramidal cap.
  for (let tier = 0; tier < 3; tier++) {
    const r = (4.2 - tier * 1.2) * s;
    const y = 6.2 * s + tier * 1.1 * s;
    boxes.push({
      min: [x - r, y, z - r],
      max: [x + r, y + 1.1 * s, z + r],
      color: tier % 2 === 0 ? PALETTE.tileGrey : PALETTE.tileGreyLight,
    });
  }
  boxes.push({
    min: [x - 0.5 * s, 9.5 * s, z - 0.5 * s],
    max: [x + 0.5 * s, 10.8 * s, z + 0.5 * s],
    color: PALETTE.gold,
  });
  return boxes;
}

/** A low balustrade along the edges of the main platform. */
export function buildBalustrade(
  x0: number,
  z0: number,
  x1: number,
  z1: number,
  y: number,
): Box[] {
  const boxes: Box[] = [];
  const run = (axis: "x" | "z", from: number, to: number, fixed: number) => {
    boxes.push({
      min: axis === "x" ? [from, y, fixed - 0.4] : [fixed - 0.4, y, from],
      max: axis === "x" ? [to, y + 0.7, fixed + 0.4] : [fixed + 0.4, y + 0.7, to],
      color: PALETTE.stoneLight,
    });
    const posts = Math.max(2, Math.round((to - from) / 3));
    for (let p = 0; p <= posts; p++) {
      const t = from + ((to - from) * p) / posts;
      boxes.push({
        min: axis === "x" ? [t - 0.35, y, fixed - 0.5] : [fixed - 0.5, y, t - 0.35],
        max: axis === "x" ? [t + 0.35, y + 1.3, fixed + 0.5] : [fixed + 0.5, y + 1.3, t + 0.35],
        color: PALETTE.stone,
      });
    }
  };
  run("x", x0, x1, z0);
  run("x", x0, x1, z1);
  run("z", z0, z1, x0);
  run("z", z0, z1, x1);
  return boxes;
}

export { mixColor, shade };
