// Materials: MeshStandardMaterial with mild roughness; emissive only where
// the screen/lamp genuinely glows. Everything is built from primitives.

import * as THREE from "three";

export function std(color: number, rough = 0.75, metal = 0.05,
  emissive = 0, ei = 0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color, roughness: rough, metalness: metal,
    emissive, emissiveIntensity: ei,
  });
}

export function emis(color: number, intensity = 1): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x111111, roughness: 0.9, metalness: 0,
    emissive: color, emissiveIntensity: intensity,
  });
}

export function box(w: number, h: number, d: number, mat: THREE.Material,
  x = 0, y = 0, z = 0, name = ""): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  if (name) m.name = name;
  return m;
}

export function cyl(rt: number, rb: number, h: number, mat: THREE.Material,
  x = 0, y = 0, z = 0, seg = 20): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function plane(w: number, h: number, mat: THREE.Material,
  x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  m.position.set(x, y, z);
  m.receiveShadow = true;
  return m;
}

export function group(...children: THREE.Object3D[]): THREE.Group {
  const g = new THREE.Group();
  children.forEach(c => g.add(c));
  return g;
}

// ---------- CRT (2005-2010, then retired to the corner clutter) ----------
export function crtMonitor(): THREE.Group {
  const g = new THREE.Group();
  const beige = std(0xd8cfb8, 0.85);
  const dark = std(0x8a826e, 0.9);
  g.add(box(0.36, 0.30, 0.34, beige, 0, 0.20, 0));
  g.add(box(0.30, 0.24, 0.02, dark, 0, 0.21, 0.175));
  g.add(box(0.26, 0.19, 0.005, std(0x0a0f14, 0.2, 0.9, 0x24404f, 0.4), 0, 0.215, 0.186));
  g.add(box(0.22, 0.05, 0.22, dark, 0, 0.035, 0));
  g.add(box(0.30, 0.03, 0.24, beige, 0, 0.06, 0));
  g.userData.screen = { w: 0.26, h: 0.19, y: 0.215, z: 0.189 };
  return g;
}

// ---------- LCD 19" (2011-2015) ----------
export function lcd19(): THREE.Group {
  const g = new THREE.Group();
  const black = std(0x23262b, 0.6);
  g.add(box(0.44, 0.28, 0.035, black, 0, 0.30, 0));
  g.add(box(0.40, 0.24, 0.01, std(0x0c1216, 0.15, 0.9, 0x2a5f7a, 0.55), 0, 0.305, 0.019));
  g.add(cyl(0.02, 0.03, 0.16, std(0x2e3138, 0.7), 0, 0.10, 0));
  g.add(box(0.20, 0.02, 0.14, std(0x2e3138, 0.7), 0, 0.01, 0));
  g.userData.screen = { w: 0.40, h: 0.24, y: 0.305, z: 0.024 };
  return g;
}

// ---------- 27" IPS (2016-2020) ----------
export function ips27(): THREE.Group {
  const g = new THREE.Group();
  const slim = std(0x1c1e22, 0.45, 0.2);
  g.add(box(0.56, 0.32, 0.028, slim, 0, 0.36, 0));
  g.add(box(0.53, 0.29, 0.008, std(0x0a0e12, 0.1, 0.95, 0x2f6f9a, 0.65), 0, 0.365, 0.015));
  g.add(cyl(0.015, 0.02, 0.20, std(0x33363c, 0.55, 0.3), 0, 0.12, 0));
  g.add(box(0.26, 0.018, 0.18, std(0x33363c, 0.55, 0.3), 0, 0.01, 0));
  g.userData.screen = { w: 0.53, h: 0.29, y: 0.365, z: 0.019 };
  return g;
}

// ---------- 34" ultrawide (2021-) ----------
export function uw34(): THREE.Group {
  const g = new THREE.Group();
  const slim = std(0x191b1f, 0.4, 0.3);
  g.add(box(0.78, 0.32, 0.03, slim, 0, 0.37, 0));
  g.add(box(0.75, 0.29, 0.008, std(0x080b10, 0.08, 0.95, 0x2f7fae, 0.7), 0, 0.375, 0.016));
  const arm = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.012, 8, 12, Math.PI),
    std(0x3a3d44, 0.5, 0.5));
  arm.rotation.x = -Math.PI / 2;
  arm.position.set(0, 0.02, -0.02);
  arm.castShadow = true;
  g.add(arm);
  g.add(cyl(0.012, 0.018, 0.18, std(0x3a3d44, 0.5, 0.5), 0, 0.10, -0.14));
  g.userData.screen = { w: 0.75, h: 0.29, y: 0.375, z: 0.02 };
  return g;
}

// ---------- PC towers ----------
export function towerBeige(): THREE.Group {
  const g = new THREE.Group();
  const beige = std(0xd0c8b2, 0.8);
  g.add(box(0.20, 0.44, 0.42, beige, 0, 0.22, 0));
  g.add(box(0.17, 0.10, 0.02, std(0xbdb5a0, 0.85), 0, 0.36, 0.212));
  g.add(box(0.06, 0.02, 0.01, std(0x6a6455, 0.8), 0, 0.38, 0.222));
  g.add(box(0.16, 0.20, 0.01, std(0xc4bca6, 0.85), 0, 0.14, 0.212));
  return g;
}

export function towerBlack(): THREE.Group {
  const g = new THREE.Group();
  const dark = std(0x23262b, 0.55);
  g.add(box(0.20, 0.44, 0.44, dark, 0, 0.22, 0));
  g.add(box(0.18, 0.40, 0.015, std(0x2c2f36, 0.6), 0, 0.22, 0.222));
  g.add(box(0.15, 0.015, 0.01, emis(0x3a86ff, 0.8), 0, 0.40, 0.23));
  return g;
}

export function towerRgb(): THREE.Group {
  const g = new THREE.Group();
  const dark = std(0x1e2126, 0.45);
  g.add(box(0.21, 0.46, 0.46, dark, 0, 0.23, 0));
  // tempered glass side with subtle inner glow
  g.add(box(0.005, 0.40, 0.40,
    new THREE.MeshStandardMaterial({ color: 0x88aabb, transparent: true, opacity: 0.25, roughness: 0.1 }),
    0.108, 0.23, 0));
  g.add(box(0.16, 0.10, 0.36, emis(0xff7a2a, 0.5), 0.05, 0.12, 0));
  for (let i = 0; i < 3; i++)
    g.add(cyl(0.035, 0.035, 0.005, emis(i === 0 ? 0xff4d4d : i === 1 ? 0x4dff6a : 0x4da0ff, 0.9),
      0.06, 0.32 - i * 0.01, -0.12 + i * 0.12, 14));
  g.add(box(0.18, 0.02, 0.01, emis(0xffffff, 0.4), 0, 0.44, 0.232));
  return g;
}

export function towerSilent(): THREE.Group {
  const g = new THREE.Group();
  const dark = std(0x24272d, 0.5);
  g.add(box(0.22, 0.46, 0.47, dark, 0, 0.23, 0));
  g.add(box(0.19, 0.42, 0.01, std(0x2e3138, 0.6), 0, 0.23, 0.237));
  g.add(box(0.17, 0.006, 0.005, emis(0xffffff, 0.3), 0, 0.42, 0.243));
  return g;
}

// ---------- Keyboards ----------
export function kbPs2(): THREE.Group {
  const g = new THREE.Group();
  const beige = std(0xd8d0bd, 0.85);
  g.add(box(0.36, 0.025, 0.14, beige, 0, 0.013, 0));
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 12; c++)
      g.add(box(0.024, 0.012, 0.024, std(0xe8e0cd, 0.9), -0.165 + c * 0.03, 0.028, -0.05 + r * 0.033));
  return g;
}

export function kbMech(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.36, 0.03, 0.15, std(0x24262b, 0.5), 0, 0.015, 0));
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 12; c++)
      g.add(box(0.026, 0.018, 0.026, std(c === 0 && r === 0 ? 0xff7a2a : 0x3a3d44, 0.7),
        -0.165 + c * 0.03, 0.033, -0.055 + r * 0.035));
  return g;
}

export function kbCustom(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.32, 0.03, 0.13, std(0x2e2a33, 0.5), 0, 0.015, 0));
  const palette = [0xd8cfc0, 0xb8d8c0, 0xd8b8c0, 0xc0c8d8];
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 11; c++)
      g.add(box(0.024, 0.016, 0.024, std(palette[(r + c) % 4], 0.8),
        -0.145 + c * 0.029, 0.03, -0.048 + r * 0.032));
  return g;
}

// ---------- Mice ----------
export function mouseOpt(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.05, 0.03, 0.09, std(0xd8d0bd, 0.8), 0, 0.015, 0));
  g.add(box(0.01, 0.005, 0.03, std(0x8a8272, 0.8), 0, 0.032, 0.02));
  return g;
}

export function mouseGaming(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.055, 0.035, 0.10, std(0x22242a, 0.45), 0, 0.018, 0));
  g.add(box(0.008, 0.008, 0.025, emis(0xff4d4d, 0.7), -0.028, 0.02, 0.02));
  g.add(box(0.008, 0.008, 0.025, emis(0xff4d4d, 0.7), 0.028, 0.02, 0.02));
  return g;
}

export function mouseWireless(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.05, 0.032, 0.095, std(0x2c2e34, 0.35), 0, 0.016, 0));
  g.add(box(0.008, 0.004, 0.03, emis(0xffffff, 0.35), 0, 0.033, 0.02));
  return g;
}

// ---------- Desks & chairs ----------
export function deskSmall(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0x9a7a52, 0.85);
  g.add(box(0.90, 0.04, 0.55, wood, 0, 0.72, 0));
  for (const [x, z] of [[-0.42, -0.24], [0.42, -0.24], [-0.42, 0.24], [0.42, 0.24]])
    g.add(box(0.04, 0.70, 0.04, std(0x7a6242, 0.9), x, 0.36, z));
  g.add(box(0.30, 0.12, 0.48, std(0x8a6c48, 0.9), -0.30, 0.60, 0));
  return g;
}

export function deskStd(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0xa8845c, 0.8);
  g.add(box(1.20, 0.04, 0.62, wood, 0, 0.74, 0));
  for (const [x, z] of [[-0.56, -0.27], [0.56, -0.27], [-0.56, 0.27], [0.56, 0.27]])
    g.add(box(0.05, 0.72, 0.05, std(0x8a6c48, 0.9), x, 0.37, z));
  return g;
}

export function deskBig(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0x8a6a4a, 0.75);
  g.add(box(1.60, 0.05, 0.70, wood, 0, 0.75, 0));
  for (const [x, z] of [[-0.74, -0.30], [0.74, -0.30], [-0.74, 0.30], [0.74, 0.30]])
    g.add(box(0.05, 0.72, 0.05, std(0x3a3d44, 0.5, 0.4), x, 0.37, z));
  return g;
}

export function chairWood(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0x8a6242, 0.9);
  g.add(box(0.38, 0.04, 0.38, wood, 0, 0.46, 0));
  g.add(box(0.38, 0.42, 0.04, wood, 0, 0.68, -0.19));
  for (const [x, z] of [[-0.16, -0.16], [0.16, -0.16], [-0.16, 0.16], [0.16, 0.16]])
    g.add(box(0.04, 0.46, 0.04, wood, x, 0.23, z));
  return g;
}

export function chairOffice(): THREE.Group {
  const g = new THREE.Group();
  const fabric = std(0x3a4a5c, 0.9);
  g.add(box(0.44, 0.07, 0.42, fabric, 0, 0.50, 0));
  g.add(box(0.42, 0.46, 0.06, fabric, 0, 0.78, -0.20));
  g.add(cyl(0.03, 0.04, 0.46, std(0x33363c, 0.6), 0, 0.24, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    g.add(box(0.05, 0.03, 0.20, std(0x33363c, 0.6), Math.sin(a) * 0.14, 0.04, Math.cos(a) * 0.14));
  }
  return g;
}

export function chairGaming(): THREE.Group {
  const g = new THREE.Group();
  const black = std(0x1e2024, 0.55);
  const red = std(0xa02020, 0.6);
  g.add(box(0.46, 0.09, 0.44, black, 0, 0.52, 0));
  g.add(box(0.44, 0.55, 0.07, black, 0, 0.85, -0.21));
  g.add(box(0.40, 0.10, 0.08, red, 0, 1.05, -0.21));
  g.add(box(0.08, 0.30, 0.40, red, -0.23, 0.66, 0));
  g.add(box(0.08, 0.30, 0.40, red, 0.23, 0.66, 0));
  g.add(cyl(0.035, 0.045, 0.48, std(0x33363c, 0.5), 0, 0.25, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    g.add(box(0.05, 0.03, 0.22, std(0x33363c, 0.5), Math.sin(a) * 0.15, 0.04, Math.cos(a) * 0.15));
  }
  return g;
}

export function chairErgo(): THREE.Group {
  const g = new THREE.Group();
  const mesh = new THREE.MeshStandardMaterial({ color: 0x4a5560, roughness: 0.9 });
  g.add(box(0.46, 0.07, 0.44, mesh, 0, 0.50, 0));
  g.add(box(0.42, 0.50, 0.04, mesh, 0, 0.82, -0.22));
  g.add(box(0.30, 0.12, 0.05, std(0x3a4a5c, 0.9), 0, 1.06, -0.22));
  g.add(box(0.10, 0.30, 0.34, mesh, -0.26, 0.62, 0));
  g.add(box(0.10, 0.30, 0.34, mesh, 0.26, 0.62, 0));
  g.add(cyl(0.03, 0.04, 0.46, std(0x33363c, 0.55), 0, 0.24, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    g.add(box(0.05, 0.03, 0.20, std(0x33363c, 0.55), Math.sin(a) * 0.14, 0.04, Math.cos(a) * 0.14));
  }
  return g;
}

// ---------- Bed ----------
export function bed(): THREE.Group {
  const g = new THREE.Group();
  const frame = std(0x8a6242, 0.85);
  g.add(box(0.95, 0.20, 2.00, frame, 0, 0.22, 0));
  g.add(box(0.90, 0.14, 1.90, std(0xe8e0d0, 0.95), 0, 0.40, 0));
  g.add(box(0.92, 0.50, 0.05, frame, 0, 0.45, -1.0));
  g.add(box(0.88, 0.10, 0.55, std(0xa0c0d8, 0.9), 0, 0.50, 0.55));
  g.add(box(0.40, 0.12, 0.30, std(0xf0e8dc, 0.95), -0.2, 0.50, -0.6));
  return g;
}

// ---------- Shelf / storage ----------
export function shelfSmall(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0x9a7a52, 0.85);
  g.add(box(0.60, 1.10, 0.24, wood, 0, 0.55, 0));
  for (let i = 0; i < 3; i++) g.add(box(0.56, 0.02, 0.22, wood, 0, 0.28 + i * 0.28, 0.01));
  return g;
}

export function shelfDouble(): THREE.Group {
  const g = new THREE.Group();
  const wood = std(0x8a6c48, 0.8);
  g.add(box(1.20, 1.60, 0.28, wood, 0, 0.80, 0));
  for (let i = 0; i < 4; i++) g.add(box(1.16, 0.02, 0.26, wood, 0, 0.40 + i * 0.36, 0.01));
  return g;
}

export function shelfDisplay(): THREE.Group {
  const g = new THREE.Group();
  const frame = std(0x8a7a64, 0.85);
  const dark = std(0x5a5148, 0.75);
  g.add(box(1.40, 1.80, 0.30, frame, 0, 0.90, 0));
  for (let i = 0; i < 5; i++)
    g.add(box(1.36, 0.02, 0.28, dark, 0, 0.34 + i * 0.34, 0.01));
  // contents: small figures/books so it doesn't read as a black void
  const cols = [0xd8a03a, 0x5a8ad8, 0xa04a4a, 0x4aa06a, 0x8a6ad8];
  for (let i = 0; i < 5; i++)
    for (let j = 0; j < 3; j++)
      g.add(box(0.10, 0.16, 0.10, std(cols[(i + j) % 5], 0.7),
        -0.5 + j * 0.42, 0.46 + i * 0.34, 0.05));
  g.add(box(1.36, 0.004, 0.28, emis(0xffe0a0, 0.35), 0, 1.70, 0.01));
  return g;
}

// ---------- Game collection ----------
export function discSpindle(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.075, 0.075, 0.02, std(0xd8d0bd, 0.8), 0, 0.01, 0));
  for (let i = 0; i < 12; i++)
    g.add(cyl(0.068, 0.068, 0.008, std(0xc0d8e8 - i * 4, 0.3), 0, 0.03 + i * 0.008, 0, 16));
  g.add(cyl(0.078, 0.078, 0.11, new THREE.MeshStandardMaterial({
    color: 0xd8e8f0, transparent: true, opacity: 0.4, roughness: 0.2 }), 0, 0.08, 0));
  return g;
}

export function discCases(): THREE.Group {
  const g = new THREE.Group();
  const colors = [0xd84040, 0x3a86d8, 0x3aa05a, 0xd8a03a, 0x8a5ad8, 0x40c8c8];
  for (let i = 0; i < 8; i++)
    g.add(box(0.015, 0.14, 0.12, std(colors[i % 6], 0.7), i * 0.022, 0.07, 0));
  return g;
}

export function steelbooks(): THREE.Group {
  const g = new THREE.Group();
  const colors = [0x4a4f56, 0x6a3a3a, 0x3a5a4a, 0x4a4a6a];
  for (let i = 0; i < 5; i++)
    g.add(box(0.018, 0.16, 0.13, std(colors[i % 4], 0.4, 0.6), i * 0.026, 0.08, 0));
  return g;
}

export function discsFew(): THREE.Group {
  const g = new THREE.Group();
  const colors = [0x4a4f56, 0x6a5a3a, 0x3a4a6a];
  for (let i = 0; i < 3; i++)
    g.add(box(0.018, 0.16, 0.13, std(colors[i % 3], 0.4, 0.6), i * 0.026, 0.08, 0));
  return g;
}

// ---------- Posters (plane on wall; front faces -x in room coords) ----------
export function posterCs(): THREE.Group {
  const g = new THREE.Group();
  const m = plane(0.55, 0.75, std(0xd8d0c0, 0.95));
  g.add(m);
  g.add(plane(0.50, 0.70, std(0x3a5a2a, 0.95), 0, 0, 0.002));
  g.add(plane(0.20, 0.28, std(0x2a3a20, 0.95), -0.10, 0.08, 0.004));
  g.add(plane(0.14, 0.20, std(0xd8d0c0, 0.95), 0.14, 0.06, 0.004));
  g.add(plane(0.36, 0.08, std(0xa03030, 0.95), 0, -0.20, 0.004));
  g.add(plane(0.30, 0.03, std(0xf0e8dc, 0.95), 0, -0.26, 0.004));
  return g;
}

export function posterWow(): THREE.Group {
  const g = new THREE.Group();
  g.add(plane(0.55, 0.75, std(0x2a3a5a, 0.95)));
  g.add(plane(0.40, 0.30, std(0x8a6fd8, 0.95), 0, 0.08, 0.002));
  g.add(plane(0.30, 0.05, std(0xffd77a, 0.95), 0, -0.22, 0.002));
  return g;
}

export function posterDota(): THREE.Group {
  const g = new THREE.Group();
  g.add(plane(0.55, 0.75, std(0x1e2024, 0.95)));
  g.add(plane(0.44, 0.34, std(0xa02020, 0.95), 0, 0.05, 0.002));
  g.add(plane(0.20, 0.20, std(0x22242a, 0.95), 0, 0.05, 0.004));
  g.add(plane(0.10, 0.10, std(0xd8a03a, 0.95), 0, 0.05, 0.006));
  return g;
}

export function posterCollage(): THREE.Group {
  const g = new THREE.Group();
  const tiles: [number, number, number][] = [
    [-0.18, 0.16, 0x3a5a2a], [0.16, 0.18, 0x2a3a5a],
    [-0.16, -0.16, 0xa02020], [0.18, -0.14, 0x8a6a3a],
  ];
  for (const [x, y, c] of tiles)
    g.add(plane(0.24, 0.30, std(c, 0.95), x, y, 0));
  return g;
}

export function posterFramed(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.62, 0.82, 0.02, std(0x3a3d44, 0.5), 0, 0, 0));
  g.add(plane(0.56, 0.76, std(0xf0e8dc, 0.9), 0, 0, 0.011));
  g.add(plane(0.40, 0.50, std(0x5a7a9a, 0.9), 0, 0.02, 0.013));
  return g;
}

// ---------- Keepsakes ----------
export function plushShark(): THREE.Group {
  const g = new THREE.Group();
  const body = std(0x8aa8b8, 0.95);
  const belly = std(0xe8f0f0, 0.95);
  const b = new THREE.Mesh(new THREE.SphereGeometry(0.10, 14, 10), body);
  b.scale.set(1.4, 0.9, 0.9);
  b.castShadow = true;
  g.add(b);
  const bl = new THREE.Mesh(new THREE.SphereGeometry(0.085, 12, 8), belly);
  bl.scale.set(1.3, 0.7, 0.75);
  bl.position.y = -0.03;
  g.add(bl);
  const fin = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 8), body);
  fin.position.set(0.02, 0.09, 0);
  fin.castShadow = true;
  g.add(fin);
  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.10, 8), body);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-0.15, 0.02, 0);
  g.add(tail);
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), std(0x1a1a1a, 0.4));
  eye.position.set(0.10, 0.02, 0.06);
  g.add(eye);
  return g;
}

export function trophy(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.10, 0.03, 0.10, std(0x4a3a2a, 0.8), 0, 0.015, 0));
  g.add(cyl(0.015, 0.02, 0.10, std(0xd8b03a, 0.3, 0.9), 0, 0.08, 0));
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.02, 0.07, 14),
    std(0xd8b03a, 0.3, 0.9));
  cup.position.y = 0.16;
  cup.castShadow = true;
  g.add(cup);
  return g;
}

export function gameboySP(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.09, 0.015, 0.09, std(0x4a5a8a, 0.5), 0, 0.008, 0));
  g.add(box(0.085, 0.012, 0.085, std(0x6a7aae, 0.5), 0, 0.022, -0.045));
  g.rotation.x = -0.6;
  return g;
}

export function mug(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.04, 0.035, 0.10, std(0xd8e0e8, 0.6), 0, 0.05, 0));
  const h = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.008, 8, 12), std(0xd8e0e8, 0.6));
  h.position.set(0.045, 0.05, 0);
  g.add(h);
  return g;
}

// ---------- Peripherals & misc ----------
export function deskLamp(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.07, 0.08, 0.02, std(0x3a5a4a, 0.7), 0, 0.01, 0));
  g.add(cyl(0.012, 0.012, 0.30, std(0x3a5a4a, 0.7), 0, 0.17, 0));
  const head = box(0.10, 0.06, 0.07, std(0x3a5a4a, 0.7), 0, 0.33, 0);
  head.rotation.z = -0.5;
  g.add(head);
  g.add(box(0.08, 0.04, 0.05, emis(0xffe0a0, 0.8), 0.02, 0.30, 0));
  return g;
}

export function screenBar(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.40, 0.015, 0.02, std(0x2c2f36, 0.5), 0, 0, 0));
  g.add(box(0.38, 0.006, 0.008, emis(0xffd8a0, 0.6), 0, -0.01, 0.005));
  return g;
}

export function routerAdsl(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.16, 0.04, 0.11, std(0xd0c8b2, 0.8), 0, 0.02, 0));
  g.add(box(0.01, 0.008, 0.01, emis(0x4dff6a, 0.9), -0.05, 0.02, 0.056));
  g.add(box(0.01, 0.008, 0.01, emis(0xffa03a, 0.9), -0.03, 0.02, 0.056));
  return g;
}

export function routerWifi(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.18, 0.035, 0.12, std(0x2c2f36, 0.6), 0, 0.018, 0));
  for (const x of [-0.06, 0.06])
    g.add(cyl(0.004, 0.004, 0.16, std(0x2c2f36, 0.6), x, 0.09, -0.04));
  g.add(box(0.01, 0.006, 0.01, emis(0x4da0ff, 0.9), 0, 0.018, 0.061));
  return g;
}

export function routerMesh(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.10, 0.12, 0.10, std(0xe8e8e8, 0.5), 0, 0.06, 0));
  g.add(box(0.02, 0.005, 0.02, emis(0x4dff6a, 0.7), 0, 0.125, 0));
  return g;
}

export function headset(): THREE.Group {
  const g = new THREE.Group();
  const a = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.012, 8, 14, Math.PI), std(0x24262b, 0.6));
  a.position.y = 0.10;
  g.add(a);
  for (const s of [-1, 1]) {
    const c = cyl(0.04, 0.04, 0.03, std(0x24262b, 0.7), s * 0.09, 0.10, 0);
    c.rotation.z = Math.PI / 2;
    g.add(c);
  }
  g.add(box(0.01, 0.10, 0.01, std(0x24262b, 0.6), 0.09, 0.05, 0.03));
  return g;
}

export function micArm(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.04, 0.04, 0.02, std(0x2c2f36, 0.6), 0, 0.01, 0));
  g.add(cyl(0.008, 0.008, 0.35, std(0x2c2f36, 0.6), 0, 0.20, 0));
  const mic = cyl(0.035, 0.035, 0.14, std(0x3a3d44, 0.5), 0.10, 0.40, 0);
  mic.rotation.z = 0.4;
  g.add(mic);
  return g;
}

export function webcam(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.07, 0.025, 0.025, std(0x2c2f36, 0.5), 0, 0, 0));
  g.add(cyl(0.012, 0.012, 0.008, std(0x101418, 0.2), 0, 0, 0.015, 12));
  return g;
}

export function plant(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.07, 0.05, 0.10, std(0xa06040, 0.9), 0, 0.05, 0));
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), std(0x4a8a4a, 0.9));
    leaf.scale.set(0.5, 1.6, 0.5);
    leaf.position.set(Math.sin(a) * 0.05, 0.16, Math.cos(a) * 0.05);
    leaf.rotation.z = Math.sin(a) * 0.4;
    g.add(leaf);
  }
  return g;
}

export function airCon(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.80, 0.22, 0.20, std(0xe8e8e8, 0.7), 0, 0, 0));
  g.add(box(0.72, 0.04, 0.02, std(0xd0d0d0, 0.7), 0, -0.06, 0.10));
  return g;
}

export function ups(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.14, 0.30, 0.20, std(0x2c2f36, 0.6), 0, 0.15, 0));
  g.add(box(0.01, 0.01, 0.01, emis(0x4dff6a, 0.8), -0.04, 0.26, 0.101));
  return g;
}

export function curtain(color: number): THREE.Group {
  const g = new THREE.Group();
  const mat = std(color, 0.95);
  for (let i = 0; i < 6; i++) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.10, 1.55, 0.02), mat);
    w.position.set(0, -0.78, Math.sin(i * 1.2) * 0.03);
    w.castShadow = true;
    g.add(w);
  }
  return g;
}

// ---------- Clutter ----------
export function homeworkPile(): THREE.Group {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++)
    g.add(box(0.20, 0.008 + i * 0.002, 0.28, std(0xf0ead8 - i * 8, 0.95),
      0.01 * i, 0.02 + i * 0.008, 0.01 * i));
  g.add(box(0.16, 0.01, 0.22, std(0xe8e0cc, 0.95), 0.06, 0.03, -0.03));
  return g;
}

export function noodleCup(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.05, 0.04, 0.08, std(0xe8d8a8, 0.9), 0, 0.04, 0));
  g.add(cyl(0.052, 0.052, 0.01, std(0xd84a3a, 0.9), 0, 0.085, 0));
  return g;
}

export function clothesPile(): THREE.Group {
  const g = new THREE.Group();
  const colors = [0x5a6a8a, 0x8a5a5a, 0x4a6a5a];
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.10, 8, 6), std(colors[i % 3], 0.95));
    m.scale.set(1.3, 0.5, 1);
    m.position.set(0.08 * i - 0.1, 0.05, 0.04 * i);
    g.add(m);
  }
  return g;
}

export function cableMess(): THREE.Group {
  const g = new THREE.Group();
  const mat = std(0x2a2a2a, 0.9);
  for (let i = 0; i < 4; i++) {
    const t = new THREE.Mesh(new THREE.TorusGeometry(0.10 + i * 0.02, 0.008, 6, 12), mat);
    t.rotation.x = Math.PI / 2;
    t.rotation.z = i * 0.7;
    t.position.y = 0.01 + i * 0.004;
    g.add(t);
  }
  return g;
}

export function canCluster(): THREE.Group {
  const g = new THREE.Group();
  const colors = [0xd84a3a, 0x3a86d8, 0x3aa05a];
  for (let i = 0; i < 4; i++)
    g.add(cyl(0.028, 0.028, 0.10, std(colors[i % 3], 0.5, 0.5),
      0.06 * i - 0.05, 0.05, 0.03 * (i % 2)));
  return g;
}

export function movingCrate(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.35, 0.28, 0.35, std(0xa8845c, 0.9), 0, 0.14, 0));
  g.add(box(0.30, 0.04, 0.30, std(0xf0e8dc, 0.9), 0, 0.30, 0));
  return g;
}

export function coffeeGear(): THREE.Group {
  const g = new THREE.Group();
  g.add(cyl(0.05, 0.04, 0.12, std(0xd8d0c0, 0.6), 0, 0.06, 0));
  g.add(box(0.06, 0.02, 0.02, std(0x4a3a2a, 0.7), 0.06, 0.10, 0));
  g.add(cyl(0.04, 0.04, 0.008, std(0x3a2a1a, 0.5), 0.02, 0.125, 0));
  return g;
}

export function dockables(): THREE.Group {
  const g = new THREE.Group();
  g.add(box(0.12, 0.03, 0.07, std(0x2c2f36, 0.6), 0, 0.015, 0));
  g.add(box(0.10, 0.008, 0.05, emis(0x4da0ff, 0.3), 0, 0.032, 0));
  g.add(cyl(0.015, 0.015, 0.06, std(0x8a5ad8, 0.6), 0.08, 0.03, 0));
  return g;
}

export function oldCrtCorner(): THREE.Group {
  const g = crtMonitor();
  g.rotation.y = 0.9;
  g.rotation.z = 0.12;
  return g;
}

export function oldTowerCorner(): THREE.Group {
  const g = towerBeige();
  g.rotation.y = -0.6;
  g.rotation.z = -0.1;
  return g;
}
