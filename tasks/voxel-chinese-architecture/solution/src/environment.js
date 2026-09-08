function paving(b, x, z, width, depth) {
  const cols = Math.ceil(width / 1.5);
  const rows = Math.ceil(depth / 1.5);
  const w = width / cols;
  const d = depth / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      b((i + j) % 5 === 0 ? 'stone' : 'paving', x - width / 2 + (i + 0.5) * w, 0.23, z - depth / 2 + (j + 0.5) * d, w - 0.055, 0.18, d - 0.055);
    }
  }
}

function pine(b, x, z, height = 8, flip = 1) {
  b('soil', x, 0.22, z, 3.2, 0.25, 3.2);
  for (let y = 0.5; y < height; y += 0.65) {
    b('wood', x + Math.floor(y / 2.6) * 0.28 * flip, y, z, y < 2 ? 0.9 : 0.65, 0.68, 0.7);
  }
  for (let crown = 0; crown < 3; crown++) {
    const cx = x + (crown === 0 ? -1.8 : crown === 1 ? 1.7 : 0.7) * flip;
    const cy = height - 3.8 + crown * 1.8;
    const cz = z + (crown === 1 ? -0.5 : 0.3);
    const radius = crown === 2 ? 2 : 3;
    b('wood', (x + cx) / 2, cy - 0.3, cz, Math.abs(cx - x) + 0.7, 0.5, 0.5);
    for (let ix = -radius; ix <= radius; ix++) {
      for (let iz = -radius; iz <= radius; iz++) {
        if (Math.abs(ix) + Math.abs(iz) > radius * 1.6) continue;
        const top = Math.abs(ix) + Math.abs(iz) < radius ? 2 : 1;
        for (let iy = 0; iy < top; iy++) {
          b((ix + iz + crown) % 3 === 0 ? 'leafLight' : 'leaf', cx + ix * 0.85, cy + iy * 0.65, cz + iz * 0.85, 0.88, 0.7, 0.88);
        }
      }
    }
  }
}

function rock(b, x, z, size = 1) {
  b('stoneDark', x, 0.5 * size, z, 2 * size, size, 1.8 * size);
  b('stone', x - 0.25 * size, 1.3 * size, z - 0.2 * size, 1.4 * size, 0.9 * size, 1.5 * size);
  b('marble', x + 0.15 * size, 1.9 * size, z - 0.25 * size, 0.9 * size, 0.4 * size, size);
  b('moss', x + 0.7 * size, 0.65 * size, z + 0.5 * size, size, 0.35 * size, 0.8 * size);
}

function pond(b, x, z) {
  b('stoneDark', x, 0.26, z, 10.6, 0.35, 8.6);
  b('water', x, 0.46, z, 9.5, 0.2, 7.5);
  for (let dx = -5; dx <= 5; dx++) {
    for (const side of [-1, 1]) b('marble', x + dx, 0.54, z + side * 4, 0.95, 0.55, 0.7);
  }
  for (let dz = -3; dz <= 3; dz++) {
    for (const side of [-1, 1]) b('stone', x + side * 5, 0.54, z + dz, 0.7, 0.55, 0.95);
  }
  for (let i = 0; i < 8; i++) {
    const px = x + Math.sin(i * 5.7) * 3.5;
    const pz = z + Math.cos(i * 3.2) * 2.7;
    b('ripple', px, 0.575, pz, 0.8 + (i % 3) * 0.4, 0.025, 0.09);
    if (i % 2 === 0) {
      b('moss', px, 0.6, pz + 0.6, 0.7, 0.08, 0.7);
      b('lotus', px, 0.78, pz + 0.6, 0.38, 0.22, 0.38);
      b('marble', px, 0.95, pz + 0.6, 0.18, 0.16, 0.18);
    }
  }
}

function stoneLion(b, x, z, side) {
  b('stoneDark', x, 0.25, z, 2.3, 0.5, 2.5);
  b('marble', x, 0.65, z, 2, 0.35, 2.2);
  b('stone', x, 1.3, z - 0.15, 1.2, 1.25, 1.4);
  for (const dx of [-0.42, 0.42]) b('marble', x + dx, 1.06, z + 0.7, 0.45, 0.8, 0.75);
  b('stone', x, 2.15, z + 0.1, 1.45, 1.2, 1.25);
  b('marble', x, 2.14, z + 0.83, 0.85, 0.45, 0.45);
  b('stoneDark', x, 1.98, z + 1.07, 0.7, 0.1, 0.06);
  for (const dx of [-0.43, 0.43]) {
    b('dark', x + dx, 2.39, z + 0.74, 0.14, 0.12, 0.1);
    b('marble', x + dx, 2.83, z + 0.1, 0.45, 0.35, 0.5);
  }
  for (let i = -1; i <= 1; i++) {
    for (let j = 0; j < 3; j++) b('marble', x + i * 0.46, 1.85 + j * 0.4, z - 0.56, 0.33, 0.3, 0.3);
  }
  b('stone', x + side * 0.65, 1.8, z - 0.65, 0.6, 0.4, 0.4);
  b('stone', x + side * 0.68, 1, z + 0.95, 0.65, 0.6, 0.65);
}

function gardenLantern(b, x, z) {
  b('stone', x, 0.22, z, 1.2, 0.4, 1.2);
  b('stoneDark', x, 1, z, 0.5, 1.3, 0.5);
  b('marble', x, 1.6, z, 1, 0.25, 1);
  b('lantern', x, 2.05, z, 0.65, 0.7, 0.65);
  for (const dx of [-0.4, 0.4]) {
    for (const dz of [-0.4, 0.4]) b('wood', x + dx, 2.05, z + dz, 0.14, 0.8, 0.14);
  }
  b('tile', x, 2.6, z, 1.5, 0.3, 1.5);
  b('tileLight', x, 2.85, z, 1, 0.25, 1);
  b('gold', x, 3.07, z, 0.4, 0.2, 0.4);
}

function wall(b, length) {
  for (let x = -length / 2 + 0.75; x < length / 2; x += 1.5) {
    b('stone', x, 0.35, 0, 1.46, 0.7, 1.2);
    b('red', x, 1.65, 0, 1.48, 2, 0.65);
    b('redLight', x, 2.6, 0, 1.5, 0.22, 0.9);
    for (let row = -2; row <= 2; row++) {
      b(row === 0 ? 'tileLight' : 'tile', x, 2.95 - Math.abs(row) * 0.16, row * 0.28, 1.5, 0.23, 0.32);
    }
  }
  for (let x = -length / 2; x <= length / 2; x += 6) {
    b('redLight', x, 1.5, 0, 0.8, 3, 1.1);
    b('tileLight', x, 3.08, 0, 1.2, 0.3, 1.5);
  }
}

export function createEnvironment(voxels) {
  const b = voxels.box;
  b('earth', 0, -1.7, 0, 84, 3.2, 86);
  b('soil', 0, -3.25, 0, 82.5, 0.4, 84.5);
  b('stone', 0, -0.2, 0, 84.8, 0.6, 86.8);
  for (let x = -41; x <= 41; x += 2) {
    for (let z = -42; z <= 42; z += 2) b((x + z) % 7 === 0 ? 'moss' : 'grass', x, 0.08, z, 1.99, 0.22, 1.99);
    for (const side of [-1, 1]) {
      b('marble', x, 0.1, side * 43, 1.95, 0.35, 0.6);
      b('stoneDark', x, -1.5, side * 42.95, 1.92, 1, 0.16);
    }
  }
  for (let z = -42; z <= 42; z += 2) {
    for (const side of [-1, 1]) {
      b('marble', side * 42, 0.1, z, 0.6, 0.35, 1.95);
      b('stoneDark', side * 41.98, -1.5, z, 0.16, 1, 1.92);
    }
  }
  paving(b, 0, 1, 31, 17);
  // Disjoint paving regions share edges instead of stacking coplanar tiles.
  paving(b, 0, 26.25, 7.8, 33.5);
  paving(b, 0, -8.75, 8, 2.5);
  for (const side of [-1, 1]) {
    paving(b, side * 18.75, -1, 6.5, 6);
    for (let z = -8; z < 42; z++) b('marble', side * 4.2, 0.28, z, 0.25, 0.2, 0.95);
    pond(b, side * 13, 17);
    pine(b, side * 33, 19, 8.5, side);
    pine(b, side * 34, 8, 7, -side);
    pine(b, side * 18, -31, 8, side);
    pine(b, side * 34, -14, 7, side);
    pine(b, side * 25, 36, 7, -side);
    rock(b, side * 30, 22, 1.1);
    rock(b, side * 31, 24, 0.65);
    rock(b, side * 18, -34, 1.3);
    for (const z of [9, 23, 38, -5]) gardenLantern(b, side * 5.8, z);
    stoneLion(b, side * 6.1, 36.5, side);
    stoneLion(b, side * 6.1, -6.8, side);
    wall(voxels.painter(side * 39, -4, Math.PI / 2), 68);
    wall(voxels.painter(side * 25, 30), 28);
    paving(b, side * 26, -16, 4, 12);
    for (let i = 0; i < 24; i++) {
      const x = side * (19 + (i % 4) * 0.8);
      const z = 12 + Math.floor(i / 4) * 1.2;
      b('moss', x, 0.5, z, 0.25, 0.8 + (i % 3) * 0.2, 0.25);
      if (i % 3 === 0) b('lotus', x, 1.1, z, 0.35, 0.3, 0.35);
    }
  }
  wall(voxels.painter(0, -38), 78);
  // Courtyard bronze incense burner and an inlaid square, kept below eye level.
  b('stoneDark', 0, 0.35, 0, 4.2, 0.25, 4.2);
  b('marble', 0, 0.5, 0, 3.3, 0.2, 3.3);
  for (const x of [-0.8, 0.8]) {
    for (const z of [-0.65, 0.65]) b('gold', x, 0.9, z, 0.28, 0.7, 0.28);
    b('gold', x * 1.5, 1.7, 0, 0.3, 0.7, 0.8);
  }
  b('teal', 0, 1.35, 0, 2.3, 0.65, 1.7);
  b('gold', 0, 1.75, 0, 2.5, 0.2, 1.9);
  b('soil', 0, 1.86, 0, 2.1, 0.08, 1.5);
  for (const x of [-0.45, 0, 0.45]) {
    b('wood', x, 2.35, 0, 0.08, 1, 0.08);
    b('lantern', x, 2.88, 0, 0.09, 0.12, 0.09);
  }
}
