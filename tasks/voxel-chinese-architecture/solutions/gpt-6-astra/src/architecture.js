const TILE = 0.6;

// The roof is a height field of individual cubes. A horizontal ridge produces
// a hipped roof; a zero-length ridge produces a pyramidal, gathered-point roof.
function roof(b, width, depth, y, rise, ridge = Math.max(0, width - depth)) {
  const nx = Math.floor(width / TILE / 2);
  const nz = Math.floor(depth / TILE / 2);
  const hw = nx * TILE;
  const hd = nz * TILE;
  for (let ix = -nx; ix <= nx; ix++) {
    for (let iz = -nz; iz <= nz; iz++) {
      const x = ix * TILE;
      const z = iz * TILE;
      const t = Math.min(1, Math.max(Math.abs(z) / hd, Math.max(0, Math.abs(x) - ridge / 2) / (hw - ridge / 2)));
      const corner = 1.15 * (Math.abs(x) / hw) ** 6 * (Math.abs(z) / hd) ** 6;
      const height = y + Math.round((rise * (1 - t) ** 1.6 + corner) * 4) / 4;
      b(ix % 3 === 0 ? 'tileLight' : 'tile', x, height, z, 0.595, 0.7, 0.595);
      if (Math.abs(ix) === nx || Math.abs(iz) === nz) {
        b('gold', x, height - 0.29, z, 0.62, 0.17, 0.62);
        b('wood', x, height - 0.48, z, 0.58, 0.2, 0.58);
      }
    }
  }
  for (let x = -ridge / 2; x <= ridge / 2; x += TILE) {
    b('gold', x, y + rise + 0.48, 0, 0.63, 0.4, 0.55);
    b('tileLight', x, y + rise + 0.76, 0, 0.63, 0.18, 0.35);
  }
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      for (let step = 0; step < 4; step++) {
        b('tileLight', sx * (hw + step * 0.36), y + 1.1 + step * 0.32, sz * (hd + step * 0.36), 0.65, 0.42, 0.65);
        b('gold', sx * (hw + step * 0.36), y + 0.84 + step * 0.32, sz * (hd + step * 0.36), 0.68, 0.14, 0.68);
      }
    }
    if (ridge > 0) {
      // Stepped chiwen silhouettes at both ridge ends.
      for (let step = 0; step < 3; step++) {
        b('gold', sx * (ridge / 2 + step * 0.32), y + rise + 0.8 + step * 0.4, 0, 0.55, 0.55, 0.6);
      }
      b('tileLight', sx * (ridge / 2 + 0.5), y + rise + 2, 0, 0.7, 0.5, 0.5);
    }
  }
}

function railing(b, width, depth, y, entrance = 5) {
  for (const side of [-1, 1]) {
    for (let x = -width / 2; x <= width / 2; x += 2) {
      if (side === 1 && Math.abs(x) < entrance / 2) continue;
      b('marble', x, y + 0.6, side * depth / 2, 0.42, 1.3, 0.42);
      b('marble', x, y + 1.36, side * depth / 2, 0.6, 0.25, 0.6);
      if (x + 2 <= width / 2 && !(side === 1 && Math.abs(x + 1) < entrance / 2)) {
        b('marble', x + 1, y + 0.9, side * depth / 2, 1.65, 0.24, 0.24);
        b('stone', x + 1, y + 0.4, side * depth / 2, 1.65, 0.2, 0.2);
      }
    }
    for (let z = -depth / 2; z <= depth / 2; z += 2) {
      b('marble', side * width / 2, y + 0.6, z, 0.42, 1.3, 0.42);
      b('marble', side * width / 2, y + 1.36, z, 0.6, 0.25, 0.6);
      if (z + 2 <= depth / 2) b('marble', side * width / 2, y + 0.9, z + 1, 0.24, 0.24, 1.65);
    }
  }
}

function terrace(b, width, depth, height, rail = false) {
  b('stoneDark', 0, 0.3, 0, width + 1, 0.6, depth + 1);
  b('stone', 0, height / 2, 0, width, height, depth);
  b('marble', 0, height, 0, width + 0.4, 0.35, depth + 0.4);
  for (const side of [-1, 1]) {
    for (let x = -width / 2 + 0.75; x < width / 2; x += 1.5) {
      for (let y = 0.45; y < height - 0.1; y += 0.55) {
        b('stone', x, y, side * (depth / 2 + 0.03), 1.43, 0.49, 0.12);
      }
    }
  }
  const steps = Math.ceil(height / 0.3);
  for (let s = 0; s < steps; s++) {
    const h = height * (1 - s / steps);
    b('marble', 0, h / 2, depth / 2 + s * 0.5 + 0.3, 5.8, h, 0.53);
    for (const side of [-1, 1]) b('stone', side * 3.1, h / 2 + 0.2, depth / 2 + s * 0.5 + 0.3, 0.5, h + 0.4, 0.53);
  }
  if (rail) railing(b, width - 0.5, depth - 0.5, height + 0.15, 7);
}

function bracket(b, x, y, z) {
  b('gold', x, y, z, 0.85, 0.35, 0.85);
  for (let layer = 0; layer < 3; layer++) {
    const span = 1.1 + layer * 0.55;
    b(layer === 1 ? 'teal' : 'wood', x, y + 0.28 + layer * 0.3, z, span, 0.24, 0.4);
    b(layer === 1 ? 'gold' : 'redLight', x, y + 0.4 + layer * 0.3, z, 0.4, 0.24, span);
    for (const side of [-1, 1]) b('redLight', x + side * span * 0.4, y + 0.5 + layer * 0.3, z, 0.3, 0.35, 0.5);
  }
}

function lantern(b, x, y, z) {
  b('wood', x, y + 0.8, z, 0.1, 0.8, 0.1);
  b('red', x, y, z, 0.8, 1.05, 0.8);
  b('lantern', x, y, z, 0.87, 0.72, 0.87);
  for (const sy of [-1, 1]) b('gold', x, y + sy * 0.52, z, 0.9, 0.16, 0.9);
  b('redLight', x, y - 0.9, z, 0.15, 0.65, 0.15);
}

function windowPanel(b, x, y, z, width, height) {
  b('wood', x, y, z, width, height, 0.32);
  b('dark', x, y + 0.1, z + 0.2, width - 0.25, height - 0.4, 0.12);
  for (let dx = -width / 2 + 0.28; dx < width / 2; dx += 0.42) {
    b('gold', x + dx, y + 0.1, z + 0.29, 0.08, height - 0.4, 0.09);
  }
  for (let dy = -height / 2 + 0.4; dy < height / 2; dy += 0.55) {
    b('redLight', x, y + dy, z + 0.31, width - 0.2, 0.09, 0.1);
  }
  b('gold', x, y - height / 2, z + 0.15, width + 0.15, 0.15, 0.5);
}

function door(b, x, base, z, width, height) {
  b('wood', x, base + height / 2, z, width + 0.3, height + 0.3, 0.45);
  for (const side of [-1, 1]) {
    b('red', x + side * width / 4, base + height / 2, z + 0.28, width / 2 - 0.06, height, 0.22);
    for (let dy = 0.6; dy < height - 0.2; dy += 0.65) {
      for (let dx = 0.28; dx < width / 2 - 0.1; dx += 0.5) b('gold', x + side * dx, base + dy, z + 0.44, 0.12, 0.12, 0.12);
    }
    b('gold', x + side * 0.25, base + height * 0.44, z + 0.5, 0.16, 0.32, 0.12);
  }
}

function hall(b, { width, depth, main = false, gate = false }) {
  const base = main ? 2.4 : 1.2;
  const height = main ? 6.2 : gate ? 4.4 : 4.8;
  const eave = base + height + 1.6;
  terrace(b, width + 4, depth + 4, base, main);
  if (!gate) {
    b('red', 0, base + height / 2, -0.6, width - 1.5, height, depth - 3);
    b('wood', 0, base + 0.4, -0.6, width - 1.35, 0.5, depth - 2.85);
    for (const side of [-1, 1]) {
      b('redLight', side * (width / 2 - 0.72), base + height / 2, -0.7, 0.18, height - 0.5, depth - 3.1);
      for (let z = -depth / 2 + 1.8; z < depth / 2 - 2; z += 1.5) {
        b('wood', side * (width / 2 - 0.6), base + height * 0.62, z, 0.2, height * 0.55, 1.2);
        for (let dz = -0.4; dz <= 0.4; dz += 0.4) b('gold', side * (width / 2 - 0.46), base + height * 0.62, z + dz, 0.13, height * 0.5, 0.08);
      }
    }
    const front = depth / 2 - 2.1;
    door(b, 0, base + 0.25, front, main ? 4.6 : 3.2, height - 0.6);
    for (const side of [-1, 1]) {
      const count = main ? 2 : 1;
      for (let n = 0; n < count; n++) windowPanel(b, side * (4.3 + n * 3), base + height * 0.57, front, 2.35, height * 0.65);
    }
  } else {
    // Open central passage: the axis continues through the gate, not into a wall.
    for (const side of [-1, 1]) {
      b('red', side * (width / 2 - 2), base + height / 2, 0, 3.3, height, depth - 2.4);
      windowPanel(b, side * (width / 2 - 2), base + height * 0.55, depth / 2 - 1.1, 2, 2.8);
      b('wood', side * 2.9, base + 1.9, -0.3, 0.24, 3.8, 2.5);
    }
    b('wood', 0, base + height - 0.25, 0, 6, 0.6, depth - 2.4);
    // The rear steps make the gateway traversable from the courtyard as well.
    for (let s = 0; s < 4; s++) b('marble', 0, (1.2 - s * 0.3) / 2, -depth / 2 - 2.3 - s * 0.5, 5.8, 1.2 - s * 0.3, 0.53);
  }
  const bays = main ? 6 : 4;
  for (const side of [-1, 1]) {
    for (let i = 0; i <= bays; i++) {
      const x = -width / 2 + i * width / bays;
      const z = side * (depth / 2 - 0.35);
      b('stone', x, base + 0.22, z, 1.05, 0.45, 1.05);
      b('red', x, base + height / 2 + 0.2, z, 0.68, height, 0.68);
      b('redLight', x - 0.18, base + height / 2 + 0.2, z + 0.35, 0.17, height - 0.4, 0.05);
      bracket(b, x, base + height, z);
      if (side === 1 && (i === 1 || i === bays - 1)) lantern(b, x, base + height - 1.5, z + 0.65);
    }
    b('wood', 0, base + height - 0.08, side * (depth / 2 - 0.35), width + 1.1, 0.55, 0.75);
    b('teal', 0, base + height + 0.42, side * (depth / 2 - 0.35), width + 1.3, 0.3, 0.85);
    b('gold', 0, base + height + 0.67, side * (depth / 2 - 0.35), width + 1.4, 0.13, 0.9);
  }
  roof(b, width + 4.8, depth + 4.8, eave, main ? 3.7 : 3.1);
  b('gold', 0, base + height - 0.7, depth / 2 + 0.12, main ? 4.8 : 3.5, 1.5, 0.28);
  b('dark', 0, base + height - 0.7, depth / 2 + 0.3, main ? 4.5 : 3.2, 1.23, 0.16);
  if (main) {
    const upper = eave + 3.4;
    b('red', 0, upper + 0.75, 0, width - 3, 1.5, depth - 4);
    for (let x = -width / 2 + 2; x <= width / 2 - 2; x += 2) {
      b('gold', x, upper + 0.8, (depth - 4) / 2 + 0.1, 0.16, 1.3, 0.15);
    }
    roof(b, width + 1.2, depth + 1.2, upper + 1.6, 3.9);
  }
  return { plaque: [0, base + height - 0.7, depth / 2 + 0.4], plaqueWidth: main ? 4.1 : 2.8 };
}

function pagoda(b) {
  terrace(b, 10, 10, 1.2, false);
  let y = 1.35;
  for (let tier = 0; tier < 3; tier++) {
    const width = 7.3 - tier * 1.2;
    const h = 3.2 - tier * 0.25;
    b('red', 0, y + h / 2, 0, width - 1.3, h, width - 1.3);
    for (const side of [-1, 1]) {
      for (const x of [-width / 2 + 0.4, width / 2 - 0.4]) {
        b('redLight', x, y + h / 2, side * (width / 2 - 0.4), 0.5, h, 0.5);
        bracket(b, x, y + h - 0.2, side * (width / 2 - 0.4));
      }
      b('dark', 0, y + h / 2, side * (width / 2 - 0.6), 1.4, h - 0.6, 0.15);
      b('gold', 0, y + h / 2, side * (width / 2 - 0.48), 0.12, h - 0.5, 0.12);
      b('dark', side * (width / 2 - 0.6), y + h / 2, 0, 0.15, h - 0.6, 1.4);
    }
    b('wood', 0, y, 0, width + 1, 0.3, width + 1);
    if (tier > 0) railing(b, width + 0.5, width + 0.5, y + 0.1, 0);
    roof(b, width + 3.2, width + 3.2, y + h + 0.8, 2.1, 0);
    y += h + 2.15;
  }
  for (let i = 0; i < 5; i++) b('gold', 0, y + 1.4 + i * 0.42, 0, 1 - i * 0.16, 0.35, 1 - i * 0.16);
  b('gold', 0, y + 3.8, 0, 0.15, 1.3, 0.15);
}

export function createArchitecture(voxels) {
  const buildings = [
    { id: 'main', name: '栖云殿', kind: '主殿', x: 0, z: -19, width: 24, depth: 14, main: true },
    { id: 'west', name: '听松堂', kind: '配殿', x: -25, z: -1, width: 16, depth: 9, angle: Math.PI / 2 },
    { id: 'east', name: '观澜堂', kind: '配殿', x: 25, z: -1, width: 16, depth: 9, angle: -Math.PI / 2 },
    { id: 'gate', name: '栖云门', kind: '山门', x: 0, z: 29, width: 15, depth: 7, gate: true },
    { id: 'west-tower', name: '西宝塔', kind: '宝塔', x: -29, z: -26, width: 10, depth: 10, tower: true },
    { id: 'east-tower', name: '东宝塔', kind: '宝塔', x: 29, z: -26, width: 10, depth: 10, tower: true },
  ];
  const plaques = [];
  for (const building of buildings) {
    const b = voxels.painter(building.x, building.z, building.angle ?? 0);
    if (building.tower) pagoda(b);
    else plaques.push({ ...building, ...hall(b, building) });
  }
  return { buildings, plaques };
}
