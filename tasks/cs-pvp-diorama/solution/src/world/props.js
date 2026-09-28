import * as THREE from 'three';
import { box, boxOnFloor, cone, cylinder, sphere, torus, wire } from '../core/geom.js';

/**
 * Reusable props.
 *
 * Each helper takes the builder plus a placement and emits merged geometry for
 * one recognisable object. They deliberately take the builder rather than
 * returning meshes: the map is static, and merging is what keeps it cheap.
 */

/* ------------------------------ cover ------------------------------ */

export function crate(b, x, y, z, size = 0.95, rotY = 0, material = 'wood') {
  const g = box(size, size, size, 0.9);
  b.add(g, material, { position: [x, y + size / 2, z], rotation: [0, rotY, 0] });
  // Corner battens so the silhouette is not a bare cube.
  const t = size * 0.12;
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(
        box(t, size * 0.98, t, 1.2),
        'woodDark',
        {
          position: [
            x + Math.cos(rotY) * sx * size * 0.5 + Math.sin(rotY) * sz * size * 0.5,
            y + size / 2,
            z - Math.sin(rotY) * sx * size * 0.5 + Math.cos(rotY) * sz * size * 0.5,
          ],
          rotation: [0, rotY, 0],
        },
      );
    }
  }
}

export function crateStack(b, x, y, z, count = 3, size = 0.95, rotY = 0, jitter = 0.12) {
  let stackY = y;
  for (let i = 0; i < count; i += 1) {
    const tilt = i === 0 ? 0 : (i % 2 ? jitter : -jitter);
    crate(
      b,
      x + (i % 2 ? jitter * 0.6 : -jitter * 0.4),
      stackY,
      z - (i % 2 ? jitter * 0.5 : 0),
      size,
      rotY + tilt,
    );
    stackY += size;
  }
  return stackY;
}

export function blueBarrel(b, x, y, z, rotY = 0, material = 'bluePaint') {
  b.add(cylinder(0.38, 0.38, 1.0, 14, 0.9), material, { position: [x, y + 0.5, z], rotation: [0, rotY, 0] });
  // Rolling hoops.
  for (const dy of [-0.22, 0.22]) {
    b.add(cylinder(0.405, 0.405, 0.09, 14, 1.4), 'metalDark', {
      position: [x, y + 0.5 + dy, z],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  b.add(cylinder(0.4, 0.4, 0.05, 14, 1.4), 'metalDark', {
    position: [x, y + 1.0, z],
    outline: false,
  });
}

export function barrelRack(b, x, y, z, rotY = 0) {
  // Four-pack of drums strapped to a pallet.
  const offsets = [
    [-0.42, -0.42],
    [0.42, -0.42],
    [-0.42, 0.42],
    [0.42, 0.42],
  ];
  pallet(b, x, y, z, rotY, 1.5);
  for (const [ox, oz] of offsets) {
    const cos = Math.cos(rotY);
    const sin = Math.sin(rotY);
    blueBarrel(b, x + ox * cos + oz * sin, y + 0.14, z - ox * sin + oz * cos, rotY);
  }
}

export function tireStack(b, x, y, z, count = 3, rotY = 0) {
  for (let i = 0; i < count; i += 1) {
    const wobble = i % 2 ? 0.12 : -0.09;
    b.add(torus(0.42, 0.16, 7, 14), 'rubber', {
      position: [x + wobble, y + 0.17 + i * 0.3, z],
      rotation: [Math.PI / 2, rotY, wobble],
    });
  }
}

export function pallet(b, x, y, z, rotY = 0, size = 1.2) {
  const w = size;
  const d = size * 0.92;
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  const place = (lx, lz) => [x + lx * cos + lz * sin, z - lx * sin + lz * cos];

  // Three bearers.
  for (const lx of [-w * 0.36, 0, w * 0.36]) {
    const [px, pz] = place(lx, 0);
    b.add(box(w * 0.16, 0.13, d, 1.1), 'woodDark', {
      position: [px, y + 0.065, pz],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  // Top deck boards.
  for (let i = 0; i < 4; i += 1) {
    const lz = -d * 0.36 + (i / 3) * d * 0.72;
    const [px, pz] = place(0, lz);
    b.add(box(w, 0.06, d * 0.16, 1.1), 'wood', {
      position: [px, y + 0.16, pz],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
}

export function sackPile(b, x, y, z, count = 5, rotY = 0) {
  let stackY = y;
  for (let i = 0; i < count; i += 1) {
    const row = Math.floor(i / 2);
    const lx = (i % 2) * 0.52 - 0.26;
    const cos = Math.cos(rotY);
    const sin = Math.sin(rotY);
    b.add(box(0.5, 0.24, 0.42, 1.4), 'sandbag', {
      position: [x + lx * cos, stackY + 0.12, z - lx * sin],
      rotation: [0, rotY + (i % 2 ? 0.08 : -0.06), 0],
    });
    if (i % 2 === 1) stackY += 0.24;
  }
}

export function jerseyBarrier(b, x, y, z, rotY = 0) {
  // Tapered plastic road barrier: wide foot, narrow top.
  b.add(box(2.1, 0.3, 0.78, 1.1), 'paintWhite', {
    position: [x, y + 0.15, z],
    rotation: [0, rotY, 0],
  });
  b.add(box(2.0, 0.52, 0.46, 1.1), 'paintWhite', {
    position: [x, y + 0.56, z],
    rotation: [0, rotY, 0],
  });
  b.add(box(1.85, 0.2, 0.3, 1.1), 'paintWhite', {
    position: [x, y + 0.9, z],
    rotation: [0, rotY, 0],
  });
}

export function concreteBlock(b, x, y, z, rotY = 0) {
  b.add(box(1.85, 0.86, 0.78, 0.9), 'concrete', {
    position: [x, y + 0.43, z],
    rotation: [0, rotY, 0],
  });
}

/* ---------------------------- structures ---------------------------- */

export function shippingContainer(b, x, y, z, rotY = 0, material = 'containerGreen', length = 6.0) {
  const h = 2.5;
  const w = 2.4;
  b.add(box(length, h, w, 0.55), material, {
    position: [x, y + h / 2, z],
    rotation: [0, rotY, 0],
  });
  // Corner castings and door bars at the near end.
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  const endX = x + cos * (length / 2 - 0.06);
  const endZ = z - sin * (length / 2 - 0.06);
  for (const sz of [-1, 1]) {
    for (const sy of [-1, 1]) {
      b.add(box(0.26, 0.26, 0.26, 1.2), 'metalDark', {
        position: [
          endX + sin * sz * (w / 2 - 0.13),
          y + h / 2 + sy * (h / 2 - 0.13),
          endZ + cos * sz * (w / 2 - 0.13),
        ],
        outline: false,
      });
    }
  }
  for (let i = -1; i <= 1; i += 2) {
    b.add(box(0.09, h * 0.86, 0.09, 1.2), 'metalDark', {
      position: [endX + sin * i * (w * 0.22), y + h / 2, endZ + cos * i * (w * 0.22)],
      outline: false,
    });
  }
}

export function ladder(b, x, y, z, height, rotY = 0, material = 'metalDark') {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  const spread = 0.22;
  for (const side of [-1, 1]) {
    b.add(box(0.07, height, 0.07, 1.4), material, {
      position: [x + cos * side * spread, y + height / 2, z - sin * side * spread],
      outline: false,
    });
  }
  const rungs = Math.max(2, Math.floor(height / 0.34));
  for (let i = 1; i < rungs; i += 1) {
    b.add(box(spread * 2, 0.05, 0.05, 1.4), material, {
      position: [x, y + (i / rungs) * height, z],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
}

export function stairs(b, x, y, z, steps, rise, run, rotY = 0, width = 1.6, material = 'concrete') {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  for (let i = 0; i < steps; i += 1) {
    const lz = i * run;
    b.add(box(width, rise * (i + 1), run, 0.9), material, {
      position: [x + sin * lz, y + (rise * (i + 1)) / 2, z + cos * lz],
      rotation: [0, rotY, 0],
      outline: i === 0 || i === steps - 1,
    });
  }
}

export function railing(b, points, y, height = 1.05, material = 'metalDark') {
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x0, z0] = points[i];
    const [x1, z1] = points[i + 1];
    const length = Math.hypot(x1 - x0, z1 - z0);
    const rotY = Math.atan2(x1 - x0, z1 - z0);
    const midX = (x0 + x1) / 2;
    const midZ = (z0 + z1) / 2;
    b.add(box(0.07, height, length, 1.2), material, {
      position: [midX, y + height / 2, midZ],
      rotation: [0, rotY, 0],
      outline: false,
    });
    b.add(box(0.06, 0.06, length, 1.2), material, {
      position: [midX, y + height, midZ],
      rotation: [0, rotY, 0],
      outline: false,
    });
    const posts = Math.max(2, Math.round(length / 1.6));
    for (let p = 0; p <= posts; p += 1) {
      const t = p / posts;
      b.add(box(0.06, height, 0.06, 1.4), material, {
        position: [x0 + (x1 - x0) * t, y + height / 2, z0 + (z1 - z0) * t],
        outline: false,
      });
    }
  }
}

export function drainGrate(b, x, y, z, width, length, rotY = 0) {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  b.add(box(width, 0.08, length, 1.0), 'rustDark', {
    position: [x, y - 0.04, z],
    rotation: [0, rotY, 0],
  });
  const bars = Math.max(3, Math.round(length / 0.34));
  for (let i = 0; i < bars; i += 1) {
    const lz = -length / 2 + ((i + 0.5) / bars) * length;
    b.add(box(width * 0.9, 0.07, 0.09, 1.4), 'rust', {
      position: [x + sin * lz, y + 0.02, z + cos * lz],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
}

export function fenceRun(b, x0, z0, x1, z1, y, height = 2.6, posts = 8) {
  const length = Math.hypot(x1 - x0, z1 - z0);
  const rotY = Math.atan2(x1 - x0, z1 - z0);
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  for (let i = 0; i <= posts; i += 1) {
    const t = i / posts;
    b.add(box(0.12, height, 0.12, 1.2), 'metalDark', {
      position: [x0 + (x1 - x0) * t, y + height / 2, z0 + (z1 - z0) * t],
      rotation: [0, rotY, 0],
      outline: i % 2 === 0,
    });
  }
  // Mesh panels, then the barbed strands that make it read as a spawn fence.
  for (let i = 0; i < posts; i += 1) {
    const t = (i + 0.5) / posts;
    b.add(box(0.05, height * 0.86, length / posts, 0.9), 'metalDark', {
      position: [x0 + (x1 - x0) * t, y + height * 0.46, z0 + (z1 - z0) * t],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  const top = y + height;
  for (let i = 0; i < 3; i += 1) {
    const a = new THREE.Vector3(x0, top + i * 0.17, z0);
    const c = new THREE.Vector3(x1, top + i * 0.17, z1);
    b.add(wire(a, c, 0.05, 0.022, 6), 'metalDark');
  }
}

export function powerPole(b, x, y, z, height = 6.4, rotY = 0) {
  b.add(cylinder(0.13, 0.2, height, 8, 0.6), 'woodDark', { position: [x, y + height / 2, z] });
  for (const [dy, span] of [[height - 0.5, 1.5], [height - 1.15, 1.1]]) {
    b.add(box(0.12, 0.12, span * 2, 1.0), 'woodDark', {
      position: [x, y + dy, z],
      rotation: [0, rotY, 0],
    });
    for (const side of [-1, 1]) {
      b.add(cylinder(0.06, 0.06, 0.24, 6, 1.4), 'lampBroken', {
        position: [
          x + Math.cos(rotY) * side * span,
          y + dy + 0.16,
          z - Math.sin(rotY) * side * span,
        ],
        outline: false,
      });
    }
  }
  return {
    top: new THREE.Vector3(x, y + height - 0.5, z),
    span: 1.5,
    rotY,
  };
}

export function shelfRack(b, x, y, z, levels = 5, width = 3.2, depth = 1.1, rotY = 0) {
  const height = levels * 0.78;
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  const corner = (lx, lz) => [x + lx * cos + lz * sin, z - lx * sin + lz * cos];

  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const [px, pz] = corner(sx * width * 0.5, sz * depth * 0.5);
      b.add(box(0.1, height, 0.1, 1.2), 'metalDark', { position: [px, y + height / 2, pz] });
    }
  }
  for (let level = 0; level < levels; level += 1) {
    const ly = y + 0.22 + level * 0.78;
    b.add(box(width, 0.07, depth, 0.9), 'rust', {
      position: [x, ly, z],
      rotation: [0, rotY, 0],
    });
    // Pallets and cartons so the rack is loaded, not empty.
    const count = level === 0 ? 3 : 2;
    for (let i = 0; i < count; i += 1) {
      const lx = -width * 0.42 + ((i + 0.5) / count) * width * 0.84;
      const [px, pz] = corner(lx, 0);
      if ((level + i) % 3 === 0) {
        crate(b, px, ly + 0.04, pz, 0.62, rotY + i * 0.2, 'cardboard');
      } else {
        b.add(box(0.66, 0.5, 0.7, 1.1), 'cardboard', {
          position: [px, ly + 0.29, pz],
          rotation: [0, rotY + i * 0.15, 0],
        });
      }
    }
  }
}

export function forklift(b, x, y, z, rotY = 0) {
  b.add(box(1.5, 0.62, 2.1, 1.0), 'paintRed', {
    position: [x, y + 0.55, z],
    rotation: [0, rotY, 0],
  });
  b.add(box(1.15, 0.5, 0.85, 1.2), 'metalDark', {
    position: [x - Math.sin(rotY) * 0.35, y + 1.1, z - Math.cos(rotY) * 0.35],
    rotation: [0, rotY, 0],
  });
  // Mast and forks.
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  for (const side of [-1, 1]) {
    b.add(box(0.11, 2.5, 0.16, 1.2), 'metalDark', {
      position: [x + cos * 1.05 + sin * side * 0.42, y + 1.3, z - sin * 1.05 + cos * side * 0.42],
      rotation: [0, rotY, 0],
      outline: false,
    });
    b.add(box(0.9, 0.07, 0.14, 1.4), 'rust', {
      position: [x + cos * 1.5 + sin * side * 0.32, y + 0.09, z - sin * 1.5 + cos * side * 0.32],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  // Roll cage.
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(box(0.07, 1.5, 0.07, 1.4), 'metalDark', {
        position: [
          x + cos * sx * 0.6 + sin * sz * 0.85,
          y + 1.75,
          z - sin * sx * 0.6 + cos * sz * 0.85,
        ],
        outline: false,
      });
    }
  }
  b.add(box(1.35, 0.07, 1.85, 1.0), 'metalDark', {
    position: [x, y + 2.5, z],
    rotation: [0, rotY, 0],
    outline: false,
  });
  for (const sx of [-1, 1]) {
    b.add(cylinder(0.34, 0.34, 0.24, 12, 1.2), 'rubber', {
      position: [x + cos * 0.72 + sin * sx * 0.82, y + 0.32, z - sin * 0.72 + cos * sx * 0.82],
      rotation: [0, 0, Math.PI / 2],
      outline: false,
    });
  }
}

export function dumpster(b, x, y, z, rotY = 0, material = 'containerGreen', withLid = true) {
  b.add(box(1.7, 1.05, 1.05, 1.0), material, {
    position: [x, y + 0.56, z],
    rotation: [0, rotY, 0],
  });
  if (withLid) {
    b.add(box(1.78, 0.09, 1.12, 1.0), 'metalDark', {
      position: [x, y + 1.13, z],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  for (const side of [-1, 1]) {
    b.add(cylinder(0.11, 0.11, 0.1, 8, 1.4), 'metalDark', {
      position: [
        x + Math.cos(rotY) * 0.7 + Math.sin(rotY) * side * 0.46,
        y + 0.11,
        z - Math.sin(rotY) * 0.7 + Math.cos(rotY) * side * 0.46,
      ],
      rotation: [0, 0, Math.PI / 2],
      outline: false,
    });
  }
}

export function acUnit(b, x, y, z, rotY = 0) {
  b.add(box(1.05, 0.85, 0.55, 1.2), 'metal', {
    position: [x, y + 0.5, z],
    rotation: [0, rotY, 0],
  });
  b.add(cylinder(0.3, 0.3, 0.06, 14, 1.4), 'metalDark', {
    position: [x, y + 0.5, z],
    rotation: [Math.PI / 2, 0, 0],
    outline: false,
  });
  for (let i = 0; i < 4; i += 1) {
    b.add(box(0.72, 0.03, 0.04, 1.6), 'metalDark', {
      position: [x, y + 0.5, z],
      rotation: [Math.PI / 2, 0, (i / 4) * Math.PI],
      outline: false,
    });
  }
  b.add(box(1.12, 0.07, 0.62, 1.4), 'metalDark', {
    position: [x, y + 0.94, z],
    rotation: [0, rotY, 0],
    outline: false,
  });
}

export function bicycle(b, x, y, z, rotY = 0, lean = 0.22) {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  const at = (lx) => [x + lx * cos, z - lx * sin];
  for (const lx of [-0.52, 0.52]) {
    const [px, pz] = at(lx);
    b.add(torus(0.34, 0.035, 5, 14), 'metalDark', {
      position: [px, y + 0.36, pz],
      rotation: [0, rotY, lean],
      outline: false,
    });
  }
  b.add(box(1.0, 0.05, 0.05, 1.4), 'rust', {
    position: [x, y + 0.45, z],
    rotation: [0, rotY, lean],
    outline: false,
  });
  b.add(box(0.05, 0.42, 0.05, 1.4), 'metalDark', {
    position: [x + cos * 0.28, y + 0.6, z - sin * 0.28],
    rotation: [0, rotY, lean],
    outline: false,
  });
  b.add(box(0.22, 0.05, 0.34, 1.4), 'rubber', {
    position: [x - cos * 0.3, y + 0.78, z + sin * 0.3],
    rotation: [0, rotY, lean],
    outline: false,
  });
}

export function ironTable(b, x, y, z, rotY = 0, overturned = false) {
  const tilt = overturned ? Math.PI / 2 : 0;
  b.add(box(1.35, 0.07, 0.8, 1.4), 'metalDark', {
    position: [x, y + (overturned ? 0.36 : 0.74), z],
    rotation: [tilt, rotY, 0],
  });
  if (!overturned) {
    for (const sx of [-1, 1]) {
      for (const sz of [-1, 1]) {
        b.add(box(0.06, 0.74, 0.06, 1.6), 'metalDark', {
          position: [x + Math.cos(rotY) * sx * 0.58, y + 0.37, z - Math.sin(rotY) * sx * 0.58],
          rotation: [0, rotY, 0],
          outline: false,
        });
      }
    }
  }
}

export function chair(b, x, y, z, rotY = 0, overturned = false) {
  if (overturned) {
    b.add(box(0.44, 0.05, 0.44, 1.6), 'metalDark', {
      position: [x, y + 0.22, z],
      rotation: [Math.PI / 2, rotY, 0],
    });
    b.add(box(0.44, 0.5, 0.05, 1.6), 'metalDark', {
      position: [x + Math.cos(rotY) * 0.2, y + 0.2, z - Math.sin(rotY) * 0.2],
      rotation: [Math.PI / 2, rotY, 0],
      outline: false,
    });
    return;
  }
  b.add(box(0.44, 0.05, 0.44, 1.6), 'metalDark', {
    position: [x, y + 0.44, z],
    rotation: [0, rotY, 0],
  });
  b.add(box(0.44, 0.5, 0.05, 1.6), 'metalDark', {
    position: [x + Math.sin(rotY) * 0.2, y + 0.7, z + Math.cos(rotY) * 0.2],
    rotation: [0, rotY, 0],
    outline: false,
  });
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      b.add(box(0.05, 0.44, 0.05, 1.8), 'metalDark', {
        position: [
          x + Math.cos(rotY) * sx * 0.17 + Math.sin(rotY) * sz * 0.17,
          y + 0.22,
          z - Math.sin(rotY) * sx * 0.17 + Math.cos(rotY) * sz * 0.17,
        ],
        outline: false,
      });
    }
  }
}

export function vent(b, x, y, z, size = 0.7) {
  b.add(box(size, size * 0.55, size, 1.4), 'metal', { position: [x, y + size * 0.28, z] });
  b.add(cylinder(size * 0.3, size * 0.3, size * 0.5, 10, 1.4), 'metalDark', {
    position: [x, y + size * 0.7, z],
    outline: false,
  });
  return new THREE.Vector3(x, y + size * 0.95, z);
}

export function guardBooth(b, x, y, z, width = 1.5, height = 1.35, depth = 1.4) {
  b.add(box(width, height, depth, 1.1), 'corrugatedDark', { position: [x, y + height / 2, z] });
  b.add(box(width + 0.16, 0.12, depth + 0.16, 1.1), 'metalDark', {
    position: [x, y + height, z],
    outline: false,
  });
  b.add(box(width * 0.72, height * 0.5, 0.05, 1.2), 'glass', {
    position: [x, y + height * 0.66, z + depth / 2 + 0.02],
    outline: false,
  });
}

/** Hollow rectangular wall frame, used for door and window openings. */
export function openingFrame(b, x, y, z, width, height, depth, rotY = 0, material = 'metalDark') {
  const t = 0.14;
  const side = (w, h, dy, dx) => {
    b.add(box(w, h, depth, 1.2), material, {
      position: [
        x + Math.cos(rotY) * dx,
        y + dy,
        z - Math.sin(rotY) * dx,
      ],
      rotation: [0, rotY, 0],
      outline: false,
    });
  };
  side(t, height, height / 2, -width / 2);
  side(t, height, height / 2, width / 2);
  side(width + t, t, height, 0);
  side(width + t, t, 0.02, 0);
}

export function softbox(b, x, y, z, w, h, d, material = 'metalDark') {
  b.add(box(w, h, d, 1.0), material, { position: [x, y + h / 2, z] });
}

export function coneLamp(b, x, y, z, r = 0.34, h = 0.3) {
  b.add(cone(r, h, 12), 'metalDark', {
    position: [x, y - h / 2, z],
    rotation: [Math.PI, 0, 0],
  });
}
