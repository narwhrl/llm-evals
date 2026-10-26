import * as THREE from "three";
import { ROOM, PORTHOLE, SMALL_PORTHOLES, wallClear } from "./layout.js";
import { box, cyl, group, plane, rbox, sphere, std, mulberry32 } from "./utils.js";
import { labelTexture, cautionTexture, photoTexture, stripeTexture, pouchTexture } from "./textures.js";

const WALL_Z = ROOM.wallZ;

// Every wall fitting goes through this: nothing may cross a porthole in the
// first view.
function fits(x, y, halfW = 0, halfH = 0, z = WALL_Z + 0.06) {
  return wallClear(x, y, halfW, halfH, z);
}

function label(text, options = {}) {
  return new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture(text, options), roughness: 0.88 });
}

// --- Wall fittings ---------------------------------------------------------

function junctionBox(root, materials, { x, y, w = 0.34, h = 0.28, d = 0.09, led = 0x63ffa8 }) {
  if (!fits(x, y, w / 2, h / 2, WALL_Z + d)) return;
  const g = group(root, { x, y, z: WALL_Z + d / 2 });
  g.add(rbox(w, h, d, 0.014, materials.panel, {}));
  g.add(box(w - 0.04, 0.01, 0.012, materials.darkMetal, { y: h / 2 - 0.025, z: d / 2 + 0.002 }));
  g.add(box(w - 0.04, 0.01, 0.012, materials.darkMetal, { y: -h / 2 + 0.025, z: d / 2 + 0.002 }));
  for (const dx of [-w / 2 + 0.05, w / 2 - 0.05]) {
    g.add(box(0.026, 0.05, 0.014, materials.metal, { x: dx, y: 0.015, z: d / 2 + 0.006 }));
  }
  g.add(
    cyl(0.008, 0.008, 0.006, 8, new THREE.MeshStandardMaterial({ color: 0x000000, emissive: led, emissiveIntensity: 2.4 }), {
      x: w / 2 - 0.045,
      y: -h / 2 + 0.05,
      z: d / 2 + 0.004,
      rx: Math.PI / 2,
    }),
  );
  // Stencilled unit number on the door.
  g.add(plane(w * 0.42, h * 0.3, label("J-04", { font: 44, bg: "#e4e0d0" }), { z: d / 2 + 0.002 }));
}

function switchPanel(root, materials, { x, y, count = 3 }) {
  const w = 0.1 + count * 0.06;
  if (!fits(x, y, w / 2, 0.07)) return;
  const g = group(root, { x, y, z: WALL_Z + 0.02 });
  g.add(rbox(w, 0.13, 0.03, 0.008, materials.panelDark, {}));
  for (let i = 0; i < count; i += 1) {
    g.add(box(0.04, 0.062, 0.014, materials.panel, { x: -w / 2 + 0.06 + i * 0.06 }));
  }
  g.add(plane(w * 0.5, 0.026, label("LIGHTS", { font: 30, bg: "#2b3033", fg: "#d8d4c4" }), { y: 0.045, z: 0.017 }));
}

function gauge(root, materials, { x, y, r = 0.072 }) {
  if (!fits(x, y, r, r, WALL_Z + 0.06)) return;
  const g = group(root, { x, y, z: WALL_Z + 0.03 });
  g.add(cyl(r, r, 0.045, 22, materials.metal, { rx: Math.PI / 2 }));
  g.add(cyl(r * 0.84, r * 0.84, 0.008, 22, materials.porcelain, { rx: Math.PI / 2, z: 0.024 }));
  g.add(box(0.005, r * 0.72, 0.004, materials.red, { y: r * 0.2, z: 0.03, rz: 0.7 }));
  for (let i = 0; i < 8; i += 1) {
    const a = (i / 8) * Math.PI * 2;
    g.add(box(0.004, 0.012, 0.003, materials.darkMetal, { x: Math.cos(a) * r * 0.66, y: Math.sin(a) * r * 0.66, z: 0.031, rz: a }));
  }
}

function handrail(root, materials, { x0, x1, y }) {
  const step = 0.08;
  let runStart = null;
  const flush = (end) => {
    if (runStart !== null && end - runStart > 0.22) {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.021, 0.021, end - runStart, 10), materials.metal);
      rail.rotation.z = Math.PI / 2;
      rail.position.set((runStart + end) / 2, y, WALL_Z + 0.13);
      rail.castShadow = true;
      root.add(rail);
      const posts = Math.max(1, Math.round((end - runStart) / 0.95));
      for (let i = 0; i <= posts; i += 1) {
        const x = runStart + ((end - runStart) * i) / posts;
        root.add(box(0.028, 0.028, 0.13, materials.metal, { x, y, z: WALL_Z + 0.065 }));
        root.add(cyl(0.033, 0.033, 0.018, 8, materials.metal, { x, y, z: WALL_Z + 0.008, rx: Math.PI / 2 }));
      }
    }
    runStart = null;
  };
  for (let x = x0; x <= x1; x += step) {
    const ok = fits(x, y, 0.04, 0.04, WALL_Z + 0.13);
    if (ok && runStart === null) runStart = x;
    if (!ok && runStart !== null) flush(x);
  }
  flush(x1);
}

function stowageBin(root, materials, { x, y, w = 0.44, h = 0.24 }) {
  if (!fits(x, y, w / 2, h / 2, WALL_Z + 0.16)) return;
  const bin = group(root, { x, y, z: WALL_Z + 0.09 });
  bin.add(rbox(w, h, 0.15, 0.016, materials.panel, {}));
  bin.add(box(w - 0.06, 0.018, 0.018, materials.darkMetal, { y: h * 0.16, z: 0.08 }));
  bin.add(box(0.05, 0.036, 0.018, materials.metal, { y: 0.0, z: 0.083 }));
  bin.add(plane(w * 0.52, h * 0.28, label("STOW", { font: 34, bg: "#dcd8c8" }), { y: -h * 0.26, z: 0.078 }));
  // Velcro tab.
  bin.add(box(0.07, 0.03, 0.006, std(0x3c4044, { roughness: 1 }), { x: w * 0.3, y: -h * 0.4, z: 0.079 }));
}

function ventGrille(root, materials, { x, y, w = 0.3, h = 0.2 }) {
  if (!fits(x, y, w / 2, h / 2, WALL_Z + 0.05)) return;
  const z = WALL_Z + 0.014;
  const ventMat = std(0x4a4e50, { roughness: 0.7, metalness: 0.3 });
  root.add(box(w + 0.03, h + 0.03, 0.02, materials.metal, { x, y, z: z + 0.01 }));
  root.add(box(w, h, 0.016, ventMat, { x, y, z: z + 0.02 }));
  for (let i = 0; i < 5; i += 1) {
    root.add(box(w - 0.03, 0.012, 0.008, materials.darkMetal, { x, y: y - h / 2 + 0.028 + i * (h / 5.6), z: z + 0.03 }));
  }
}

function pipeRun(root, materials, { y, r, x0, x1, z = WALL_Z + 0.2 }) {
  const mat = std(0x9aa1a6, { roughness: 0.42, metalness: 0.5 });
  const pipe = new THREE.Mesh(new THREE.CylinderGeometry(r, r, x1 - x0, 12), mat);
  pipe.rotation.z = Math.PI / 2;
  pipe.position.set((x0 + x1) / 2, y, z);
  pipe.castShadow = true;
  root.add(pipe);
  const steps = Math.max(2, Math.round((x1 - x0) / 1.25));
  for (let i = 0; i <= steps; i += 1) {
    const clamp = new THREE.Mesh(new THREE.TorusGeometry(r + 0.01, 0.007, 5, 12), materials.darkMetal);
    clamp.rotation.y = Math.PI / 2;
    clamp.position.set(x0 + ((x1 - x0) * i) / steps, y, z);
    root.add(clamp);
  }
}

// A dense, deterministic scatter of magnets, stickers, notes and photos.
function wallClutter(root, materials, seed = 5) {
  const rand = mulberry32(seed);
  const clusters = [
    { x: -0.5, y: 1.5, w: 0.95, h: 0.62 },
    { x: 0.45, y: 1.62, w: 0.5, h: 0.4 },
    { x: -2.1, y: 0.95, w: 0.62, h: 0.5 },
    { x: 2.85, y: 1.34, w: 0.7, h: 0.5 },
    { x: -2.9, y: 1.5, w: 0.5, h: 0.36 },
  ];
  for (const c of clusters) {
    for (let i = 0; i < 6; i += 1) {
      const kind = i % 4;
      const w = kind === 1 ? 0.15 : 0.12;
      const h = kind === 1 ? 0.18 : 0.11;
      const px = c.x + (rand() - 0.5) * c.w;
      const py = c.y + (rand() - 0.5) * c.h;
      const rz = (rand() - 0.5) * 0.26;
      if (!fits(px, py, w / 2, h / 2, WALL_Z + 0.02)) continue;
      if (kind === 1) {
        root.add(plane(w, h, new THREE.MeshStandardMaterial({ color: 0xffffff, map: photoTexture(i % 3), roughness: 0.84 }), { x: px, y: py, z: WALL_Z + 0.014, rz }));
        root.add(
          plane(0.05, 0.022, std(0xd8d2b8, { roughness: 0.9, transparent: true, opacity: 0.72 }), {
            x: px,
            y: py + h / 2 - 0.008,
            z: WALL_Z + 0.017,
            rz,
          }),
        );
      } else if (kind === 2) {
        root.add(plane(w, h, materials.note(["O2 21%", "check"]), { x: px, y: py, z: WALL_Z + 0.014, rz }));
      } else if (kind === 3) {
        root.add(plane(w * 0.9, h * 0.9, label(String(Math.floor(rand() * 90) + 10), { font: 64, bg: "#e4e0d2" }), { x: px, y: py, z: WALL_Z + 0.014, rz }));
      } else {
        root.add(
          cyl(0.02, 0.02, 0.012, 10, std(rand() > 0.5 ? 0xc4573a : 0x4a7ab0, { roughness: 0.55 }), {
            x: px,
            y: py,
            z: WALL_Z + 0.02,
            rx: Math.PI / 2,
          }),
        );
      }
    }
  }
}

export function createDetails(materials) {
  const root = group(null, { name: "details" });

  // --- Rear wall fittings -------------------------------------------------
  junctionBox(root, materials, { x: -0.08, y: 1.26, w: 0.42, h: 0.32, d: 0.1 });
  junctionBox(root, materials, { x: -1.28, y: 0.9, w: 0.3, h: 0.24, d: 0.08, led: 0xffa64d });
  junctionBox(root, materials, { x: 3.62, y: 0.66, w: 0.26, h: 0.22, d: 0.07, led: 0x63ffa8 });
  switchPanel(root, materials, { x: -0.95, y: 1.22, count: 3 });
  switchPanel(root, materials, { x: -2.35, y: 1.02, count: 2 });
  gauge(root, materials, { x: 0.5, y: 1.32 });
  gauge(root, materials, { x: 0.7, y: 1.32, r: 0.052 });
  gauge(root, materials, { x: 2.55, y: 0.86, r: 0.06 });
  handrail(root, materials, { x0: -1.75, x1: 0.1, y: 0.96 });
  handrail(root, materials, { x0: 2.5, x1: 3.5, y: 1.9 });
  handrail(root, materials, { x0: -0.9, x1: 0.2, y: 1.78 });

  for (const [x, y, w, h] of [
    [-3.15, 0.8, 0.32, 0.22],
    [-0.95, 1.58, 0.28, 0.19],
    [0.45, 1.02, 0.24, 0.17],
    [2.45, 1.7, 0.26, 0.19],
    [3.86, 1.14, 0.24, 0.18],
  ]) {
    ventGrille(root, materials, { x, y, w, h });
  }

  // Pipe and cable runs across the upper wall.
  pipeRun(root, materials, { y: 1.86, r: 0.019, x0: -3.9, x1: 0.5 });
  pipeRun(root, materials, { y: 1.94, r: 0.012, x0: -3.9, x1: 0.5 });
  pipeRun(root, materials, { y: 1.72, r: 0.014, x0: 2.6, x1: 3.9 });

  const cableMats = [std(0x2c2f33, { roughness: 0.7 }), std(0x6b4a34, { roughness: 0.8 }), std(0x3d4a56, { roughness: 0.75 })];
  const cablePaths = [
    [[-3.9, 1.46, -1.9], [-2.6, 1.46, -1.9], [-1.4, 1.44, -1.9], [-0.2, 1.42, -1.9], [0.55, 1.4, -1.9]],
    [[3.9, 0.34, -1.88], [2.9, 0.34, -1.88], [1.7, 0.38, -1.88], [0.3, 0.4, -1.88], [-1.2, 0.38, -1.88]],
    [[-3.6, 1.6, -1.9], [-2.9, 1.55, -1.9], [-2.2, 1.6, -1.9]],
  ];
  cablePaths.forEach((path, index) => {
    const curve = new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(...p)));
    const t = new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 0.021 + index * 0.004, 6, false), cableMats[index]);
    t.castShadow = true;
    root.add(t);
    for (let i = 1; i < path.length; i += 1) {
      const p = path[i];
      const tie = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.007, 5, 12), materials.darkMetal);
      tie.rotation.y = Math.PI / 2;
      tie.position.set(p[0], p[1], p[2] + 0.004);
      root.add(tie);
    }
  });

  // Labels and caution plates at eye level.
  const decal = (mat, w, h, x, y, rz = 0) => {
    if (!fits(x, y, w / 2, h / 2, WALL_Z + 0.02)) return;
    root.add(plane(w, h, mat, { x, y, z: WALL_Z + 0.014, rz }));
  };
  decal(new THREE.MeshStandardMaterial({ color: 0xffffff, map: cautionTexture(), roughness: 0.88 }), 0.26, 0.13, -1.75, 1.3, 0.02);
  decal(label("NO SMOKE", { sub: "OXYGEN ATMOSPHERE", bg: "#d8d3c2", font: 28 }), 0.22, 0.11, 0.6, 0.7, -0.03);
  decal(label("E-04", { sub: "EXIT", bg: "#2f6b3a", fg: "#f0f0e4", font: 46 }), 0.2, 0.11, -3.72, 0.94, 0);
  decal(label("O2", { sub: "MANIFOLD", font: 44 }), 0.19, 0.1, 0.02, 1.86, 0.02);
  decal(label("A-17", { sub: "SCRUBBER", font: 38 }), 0.21, 0.11, 3.3, 1.82, 0);
  decal(label("H2O", { sub: "RECLAIM", font: 42 }), 0.19, 0.1, -2.95, 1.22, -0.02);
  decal(label("04", { sub: "BAY", font: 56 }), 0.15, 0.1, -3.05, 0.42, 0);
  decal(label("PWR", { sub: "28V DC", font: 42 }), 0.17, 0.09, 0.72, 1.08, 0);
  decal(label("TEMP", { sub: "21.4 C", font: 34 }), 0.17, 0.1, 0.3, 1.06, 0.02);
  decal(label("LOCK", { sub: "CLOSE BEFORE EVA", bg: "#e0c23c", font: 28 }), 0.22, 0.11, 3.02, 1.04, 0.01);
  decal(label("04", { sub: "SLEEP BAY", font: 54 }), 0.24, 0.13, -3.62, 0.5, 0);
  decal(label("CAUTION", { sub: "MOVING PARTS", bg: "#e8c93c", font: 30 }), 0.22, 0.11, 3.45, 0.62, 0.01);

  // Magnetic tool strip with spanners.
  if (fits(-1.55, 0.8, 0.32, 0.16, WALL_Z + 0.06)) {
    const strip = group(root, { x: -1.55, y: 0.84, z: WALL_Z + 0.05 });
    strip.add(box(0.62, 0.028, 0.02, materials.darkMetal, {}));
    for (let i = 0; i < 4; i += 1) {
      const len = 0.15 + i * 0.022;
      strip.add(box(0.019, len, 0.012, materials.metal, { x: -0.22 + i * 0.145, y: -len / 2 }));
      strip.add(cyl(0.021, 0.021, 0.014, 8, materials.metal, { x: -0.22 + i * 0.145, y: -len + 0.01, rz: Math.PI / 2 }));
    }
  }

  // Wall-mounted checklist tablet.
  if (fits(-2.55, 0.62, 0.18, 0.13, WALL_Z + 0.05)) {
    const tablet = group(root, { x: -2.55, y: 0.64, z: WALL_Z + 0.05 });
    tablet.add(rbox(0.34, 0.24, 0.032, 0.01, materials.panelDark, {}));
    tablet.add(
      plane(
        0.3,
        0.2,
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: 0xffffff,
          emissiveMap: labelTexture("CHECKLIST", { sub: "04 / 07 DONE", bg: "#0d2230", fg: "#7fe3d4", font: 32 }),
          emissiveIntensity: 1.05,
          roughness: 0.4,
        }),
        { z: 0.018 },
      ),
    );
    tablet.add(box(0.05, 0.018, 0.008, materials.metal, { y: -0.14, z: 0.018 }));
  }

  // Stowage bins along the upper wall.
  for (const [x, w] of [
    [-1.65, 0.44],
    [0.2, 0.46],
    [3.05, 0.4],
    [-2.95, 0.36],
  ]) {
    stowageBin(root, materials, { x, y: 1.88, w });
  }

  // A rack of sample canisters near the equipment bay.
  if (fits(-1.05, 1.66, 0.26, 0.12, WALL_Z + 0.12)) {
    const rack = group(root, { x: -1.05, y: 1.66, z: WALL_Z + 0.1 });
    rack.add(box(0.52, 0.02, 0.14, materials.metal, { y: -0.1 }));
    rack.add(box(0.52, 0.02, 0.14, materials.metal, { y: 0.1 }));
    for (let i = 0; i < 4; i += 1) {
      const can = cyl(0.042, 0.042, 0.19, 12, i % 2 ? materials.ceramicBlue : materials.porcelain, { x: -0.18 + i * 0.12, z: 0.01 });
      rack.add(can);
      rack.add(cyl(0.044, 0.044, 0.02, 12, materials.darkMetal, { x: -0.18 + i * 0.12, y: 0.1, z: 0.01 }));
    }
  }

  wallClutter(root, materials);

  // --- Ceiling ------------------------------------------------------------
  // Service runs stay left of the window wall so the porthole stays clear.
  for (const [z, len, cx] of [
    [-1.62, 4.3, -1.75],
    [-1.44, 4.0, -1.9],
  ]) {
    root.add(box(len, 0.026, 0.1, materials.panelDark, { x: cx, y: 2.32, z }));
    for (let i = 0; i < 6; i += 1) {
      root.add(box(0.018, 0.042, 0.12, materials.metal, { x: cx - len / 2 + 0.3 + i * (len / 6), y: 2.35, z }));
    }
  }
  // Bundled cables lying in the tray.
  for (let i = 0; i < 3; i += 1) {
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 4.2, 8), cableMats[i]);
    cable.rotation.z = Math.PI / 2;
    cable.position.set(-1.75, 2.3, -1.6 + i * 0.045);
    root.add(cable);
  }
  // Velcro-held clothing bundles and a stowed tether.
  const rand = mulberry32(19);
  for (const [x, z, w, mat] of [
    [-2.6, -1.15, 0.34, materials.fabricBlue],
    [-1.9, -1.08, 0.28, materials.fabricOlive],
    [-0.7, -1.2, 0.32, materials.fabricBeige],
  ]) {
    const bundle = group(root, { x, y: 2.22, z });
    const cloth = rbox(w, 0.19, 0.24, 0.05, mat, {});
    cloth.rotation.z = (rand() - 0.5) * 0.24;
    bundle.add(cloth);
    bundle.add(box(0.055, 0.018, 0.055, materials.darkMetal, { y: 0.105 }));
  }
  // Ceiling grab handles, each on a visible mounting plate against the shoulder.
  for (const x of [-3.2, -2.1, -0.95, 0.35]) {
    const mount = group(root, { x, y: 2.24, z: -1.1 });
    mount.add(box(0.11, 0.03, 0.11, materials.metal, { y: 0.055 }));
    mount.add(box(0.03, 0.06, 0.03, materials.metal, { y: 0.02 }));
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.011, 6, 16, Math.PI), materials.metal);
    handle.rotation.set(Math.PI / 2, 0, 0);
    handle.position.set(0, 0.0, 0);
    mount.add(handle);
  }
  // A coiled tether clipped to the wall, not floating in the cabin.
  const tetherMount = group(root, { x: -0.3, y: 2.16, z: -1.86 });
  tetherMount.add(box(0.06, 0.06, 0.04, materials.darkMetal, {}));
  const tether = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.014, 6, 24), materials.fabricOlive);
  tether.rotation.set(Math.PI / 2, 0, 0);
  tether.position.set(0, 0.02, 0.11);
  tetherMount.add(tether);

  // --- Floor --------------------------------------------------------------
  const paint = std(0xd8cf9a, { roughness: 0.85 });
  for (const z of [-0.92, 0.92]) {
    root.add(box(6.6, 0.005, 0.045, paint, { x: -0.2, y: 0.004, z }));
  }
  for (const x of [-3.0, -1.0, 1.0, 3.0]) {
    root.add(rbox(0.2, 0.012, 0.2, 0.008, materials.metal, { x, y: 0.008, z: 1.55 }));
    for (const [dx, dz] of [
      [-0.065, -0.065],
      [0.065, -0.065],
      [-0.065, 0.065],
      [0.065, 0.065],
    ]) {
      root.add(cyl(0.013, 0.013, 0.011, 8, materials.darkMetal, { x: x + dx, y: 0.017, z: 1.55 + dz }));
    }
  }
  root.add(rbox(0.5, 0.014, 0.5, 0.008, materials.metal, { x: -2.35, y: 0.008, z: 1.2 }));
  root.add(box(0.38, 0.007, 0.018, materials.darkMetal, { x: -2.35, y: 0.017, z: 1.2 }));
  root.add(cyl(0.028, 0.028, 0.014, 10, materials.darkMetal, { x: -2.21, y: 0.019, z: 1.37 }));

  // Cargo straps stowed flat along the wall base.
  for (let i = 0; i < 3; i += 1) {
    root.add(box(0.46, 0.018, 0.045, materials.fabricOlive, { x: 0.62 + i * 0.02, y: 0.05, z: 1.86 - i * 0.085, ry: 0.06 }));
  }
  // Velcro patches for the slippers.
  for (const x of [-1.3, -1.1]) {
    root.add(box(0.13, 0.005, 0.19, std(0x3c4044, { roughness: 1 }), { x, y: 0.004, z: 0.86 }));
  }

  // --- Loose lived-in clutter --------------------------------------------
  const cup = group(root, { x: 0.95, y: 0.82, z: -1.2 });
  cup.add(cyl(0.043, 0.036, 0.105, 14, materials.porcelain, { y: 0.052 }));
  cup.add(cyl(0.044, 0.044, 0.008, 14, materials.ceramicBlue, { y: 0.11 }));

  const tapeRoll = group(root, { x: -0.55, y: 0.055, z: 1.35 });
  tapeRoll.add(cyl(0.055, 0.055, 0.038, 16, materials.stripe, { rx: Math.PI / 2 }));
  tapeRoll.add(cyl(0.028, 0.028, 0.042, 12, materials.darkMetal, { rx: Math.PI / 2 }));

  const toolbox = group(root, { x: 2.72, y: 0.075, z: 1.34 });
  toolbox.add(rbox(0.32, 0.13, 0.19, 0.014, materials.orange, {}));
  toolbox.add(box(0.28, 0.018, 0.028, materials.darkMetal, { y: 0.085 }));
  toolbox.add(box(0.11, 0.026, 0.018, materials.metal, { y: 0.1 }));

  // A food pouch and a spare canister on the deck near the storage wall.
  const pouch = group(root, { x: -0.85, y: 0.06, z: 1.05, ry: 0.5 });
  pouch.add(rbox(0.14, 0.09, 0.2, 0.02, materials.pouchOlive, {}));
  pouch.add(box(0.1, 0.01, 0.14, std(0x2f3a2c, { roughness: 0.9 }), { y: 0.046 }));

  const spare = group(root, { x: 1.85, y: 0.06, z: 1.62 });
  spare.add(cyl(0.06, 0.06, 0.14, 14, materials.ceramicBlue, { rx: Math.PI / 2 }));
  spare.add(cyl(0.062, 0.062, 0.016, 14, materials.darkMetal, { x: 0.075, rx: Math.PI / 2 }));

  return root;
}
