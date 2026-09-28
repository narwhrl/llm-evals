import * as THREE from 'three';
import { box, cylinder } from '../core/geom.js';

/**
 * Vehicles.
 *
 * Only two exist on the map — a dead box truck at T and a police van at CT —
 * and both double as cover, so they are built from hard-surface boxes with
 * flat faces that the toon outline can bite into.
 */

function place(x, z, rotY, lx, lz) {
  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  return [x + lx * cos + lz * sin, z - lx * sin + lz * cos];
}

function wheels(b, x, y, z, rotY, axles, track, radius, { flat = false } = {}) {
  for (const lx of axles) {
    for (const side of [-1, 1]) {
      const [wx, wz] = place(x, z, rotY, lx, side * track);
      b.add(cylinder(radius, radius, 0.34, 12, 1.0), 'rubber', {
        position: [wx, y + (flat ? radius * 0.7 : radius), wz],
        rotation: [0, rotY, Math.PI / 2],
      });
      b.add(cylinder(radius * 0.5, radius * 0.5, 0.36, 8, 1.4), 'metalDark', {
        position: [wx, y + (flat ? radius * 0.7 : radius), wz],
        rotation: [0, rotY, Math.PI / 2],
        outline: false,
      });
    }
  }
}

/** Derelict box truck: cargo box, cab, dead lights. */
export function boxTruck(b, x, y, z, rotY) {
  let p = place(x, z, rotY, -0.7, 0);
  b.add(box(4.3, 2.35, 2.35, 0.5), 'corrugated', {
    position: [p[0], y + 1.72, p[1]],
    rotation: [0, rotY, 0],
  });
  p = place(x, z, rotY, 0.15, 0);
  b.add(box(1.9, 1.75, 2.2, 0.6), 'corrugatedDark', {
    position: [p[0], y + 1.42, p[1]],
    rotation: [0, rotY, 0],
  });
  p = place(x, z, rotY, 1.32, 0);
  b.add(box(0.42, 1.0, 2.02, 1.2), 'glass', {
    position: [p[0], y + 1.74, p[1]],
    rotation: [0, rotY, 0],
    outline: false,
  });
  p = place(x, z, rotY, 1.72, 0);
  b.add(box(0.8, 0.6, 2.08, 1.0), 'corrugatedDark', {
    position: [p[0], y + 0.98, p[1]],
    rotation: [0, rotY, 0],
  });
  p = place(x, z, rotY, 2.1, 0);
  b.add(box(0.22, 0.8, 1.98, 1.2), 'metalDark', {
    position: [p[0], y + 0.72, p[1]],
    rotation: [0, rotY, 0],
  });

  wheels(b, x, y, z, rotY, [-1.75, 1.45], 1.12, 0.52, { flat: false });
  wheels(b, x, y, z, rotY, [-1.75], -1.12, 0.52, { flat: false });

  p = place(x, z, rotY, -2.9, 0);
  b.add(box(0.2, 0.32, 2.16, 1.4), 'metalDark', {
    position: [p[0], y + 0.5, p[1]],
    rotation: [0, rotY, 0],
    outline: false,
  });
  for (const side of [-1, 1]) {
    p = place(x, z, rotY, -2.86, side * 0.72);
    b.add(box(0.1, 0.18, 0.28, 1.6), 'lampBroken', {
      position: [p[0], y + 1.15, p[1]],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  // Side mirrors, one bent.
  for (const side of [-1, 1]) {
    p = place(x, z, rotY, 1.5, side * 1.25);
    b.add(box(0.08, 0.42, 0.16, 1.6), 'metalDark', {
      position: [p[0], y + 2.1, p[1]],
      rotation: [0, rotY, side * 0.3],
      outline: false,
    });
  }
}

/** CT police van. Returns the roof lightbar anchor for the animated beacon. */
export function policeVan(b, x, y, z, rotY) {
  b.add(box(4.6, 1.9, 2.1, 0.5), 'corrugated', {
    position: [x, y + 1.35, z],
    rotation: [0, rotY, 0],
  });
  let p = place(x, z, rotY, 1.85, 0);
  b.add(box(1.3, 1.35, 2.0, 0.7), 'corrugatedDark', {
    position: [p[0], y + 1.12, p[1]],
    rotation: [0, rotY, 0],
  });
  p = place(x, z, rotY, 2.52, 0);
  b.add(box(0.3, 0.85, 1.86, 1.2), 'glass', {
    position: [p[0], y + 1.5, p[1]],
    rotation: [0, rotY, 0],
    outline: false,
  });
  // Blue checker band along the flanks.
  for (const side of [-1, 1]) {
    p = place(x, z, rotY, -0.3, side * 1.06);
    b.add(box(3.9, 0.34, 0.05, 1.2), 'bluePaint', {
      position: [p[0], y + 1.05, p[1]],
      rotation: [0, rotY, 0],
      outline: false,
    });
  }
  wheels(b, x, y, z, rotY, [-1.5, 1.5], 1.02, 0.44);

  // Lightbar base; the emissive halves are driven at runtime.
  p = place(x, z, rotY, 0.4, 0);
  b.add(box(0.24, 0.12, 1.5, 1.6), 'metalDark', {
    position: [p[0], y + 2.34, p[1]],
    rotation: [0, rotY, 0],
    outline: false,
  });

  const cos = Math.cos(rotY);
  const sin = Math.sin(rotY);
  return {
    left: new THREE.Vector3(p[0] + sin * 0.38, y + 2.5, p[1] + cos * 0.38),
    right: new THREE.Vector3(p[0] - sin * 0.38, y + 2.5, p[1] - cos * 0.38),
  };
}
