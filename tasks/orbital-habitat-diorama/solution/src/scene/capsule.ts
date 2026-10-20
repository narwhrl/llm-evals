import * as THREE from "three";
import { PALETTE, TextureSet, standardMaterial } from "./textures";

/**
 * The module itself: a capsule section cut open along its length.
 *
 * The cross-section is 4 m across the floor and 2.5 m to the crown. The near
 * half of the shell is gone, so the room can be looked into, and the cut
 * edge shows what the hull is made of: an outer skin, a quilt of insulation
 * and an inner liner.
 *
 * The wall is built as a grid so that the portholes can be holes in it
 * rather than discs laid on top. The tunnels and the frames hide the edge
 * of the hole.
 */

export const MODULE_LENGTH = 8;
export const HALF_LENGTH = MODULE_LENGTH / 2;
export const FLOOR_HALF_DEPTH = 2;
export const WALL_HEIGHT = 1.35;
export const CROWN = 2.5;
/** How far the shoulder of the hull leans over the room. */
export const OVERHANG = 0.9;
export const WALL_THICKNESS = 0.14;

export const BIG_WINDOW = { x: 1.3, y: 1.05, radius: 0.75 };
export const SMALL_WINDOWS = [
  { x: -3.05, y: 1.15, radius: 0.27 },
  { x: -1.75, y: 1.15, radius: 0.27 },
];

interface ProfilePoint {
  z: number;
  y: number;
  /** The outward normal, in the z-y plane. */
  nz: number;
  ny: number;
  /** The distance travelled along the profile, used for the texture. */
  arc: number;
}

export function buildProfile(): ProfilePoint[] {
  const points: ProfilePoint[] = [];
  let arc = 0;

  // The vertical side wall.
  const verticalSteps = 44;
  for (let i = 0; i <= verticalSteps; i++) {
    const y = (i / verticalSteps) * WALL_HEIGHT;
    if (i > 0) arc += (y - points[points.length - 1].y);
    points.push({ z: -FLOOR_HALF_DEPTH, y, nz: -1, ny: 0, arc });
  }

  // The shoulder, which curves up and leans a little over the room. Keeping
  // the overhang short is what lets the camera see the floor.
  const arcSteps = 64;
  const rise = CROWN - WALL_HEIGHT;
  for (let i = 1; i <= arcSteps; i++) {
    const t = (i / arcSteps) * (Math.PI / 2);
    const z = -FLOOR_HALF_DEPTH + OVERHANG * (1 - Math.cos(t));
    const y = WALL_HEIGHT + rise * Math.sin(t);
    const previous = points[points.length - 1];
    arc += Math.hypot(z - previous.z, y - previous.y);
    const nz = -rise * Math.cos(t);
    const ny = OVERHANG * Math.sin(t);
    const length = Math.hypot(nz, ny);
    points.push({ z, y, nz: nz / length, ny: ny / length, arc });
  }
  return points;
}

interface Hole {
  x: number;
  y: number;
  radius: number;
}

function buildWallGeometry(
  profile: ProfilePoint[],
  holes: Hole[],
  thickness: number,
  columns: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  const rows = profile.length;
  const push = (x: number, z: number, y: number, nx: number, ny: number, nz: number, u: number, v: number) => {
    positions.push(x, y, z);
    normals.push(nx, ny, nz);
    uvs.push(u, v);
    return positions.length / 3 - 1;
  };

  // Two surfaces: the inner liner, which faces into the room, and the
  // outer skin, which faces away from it.
  for (let surface = 0; surface < 2; surface++) {
    const offset = surface === 0 ? 0 : thickness;
    const sign = surface === 0 ? -1 : 1;
    const base = positions.length / 3;
    for (let row = 0; row < rows; row++) {
      const p = profile[row];
      for (let col = 0; col <= columns; col++) {
        const x = -HALF_LENGTH + (col / columns) * MODULE_LENGTH;
        const z = p.z + p.nz * offset;
        const y = p.y + p.ny * offset;
        const u = x / 2.4;
        const v = p.arc / 2.4;
        push(x, z, y, 0, p.ny * sign, p.nz * sign, u, v);
      }
    }
    for (let row = 0; row < rows - 1; row++) {
      for (let col = 0; col < columns; col++) {
        const x = -HALF_LENGTH + ((col + 0.5) / columns) * MODULE_LENGTH;
        const p0 = profile[row];
        const p1 = profile[row + 1];
        // The hole is measured on the surface of the wall: the distance along
        // the profile, not the height, so a porthole that reaches over the
        // shoulder of the hull is still a round hole.
        const cs = (p0.arc + p1.arc) / 2;
        let inside = false;
        for (const hole of holes) {
          if (Math.hypot(x - hole.x, cs - hole.y) < hole.radius) {
            inside = true;
            break;
          }
        }
        if (inside) continue;
        const a = base + row * (columns + 1) + col;
        const b = a + 1;
        const c = a + (columns + 1);
        const d = c + 1;
        // The liner faces into the room, the skin faces away from it, so the
        // two surfaces are wound in opposite directions.
        if (surface === 0) {
          indices.push(a, b, c, b, d, c);
        } else {
          indices.push(a, c, b, b, c, d);
        }
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

/**
 * A raised ring around the outside of the hull.
 *
 * The stiffener is a rectangle in the (length, offset) plane swept along the
 * profile, so it sits on the skin the way a real frame ring does.
 */
function buildRibGeometry(
  profile: ProfilePoint[],
  centre: number,
  halfWidth: number,
  offset: number,
  height: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  // The cross-section of the ring, in (x, offset) space.
  const cross: [number, number][] = [
    [centre - halfWidth, offset],
    [centre + halfWidth, offset],
    [centre + halfWidth, offset + height],
    [centre - halfWidth, offset + height],
  ];

  const start = profile.findIndex((point) => point.ny > 0);
  if (start < 0) return new THREE.BufferGeometry();

  const ring: THREE.Vector3[] = [];
  for (let i = start; i < profile.length; i++) {
    const p = profile[i];
    ring.push(
      new THREE.Vector3(cross[0][0], p.y + p.ny * cross[0][1], p.z + p.nz * cross[0][1]),
      new THREE.Vector3(cross[1][0], p.y + p.ny * cross[1][1], p.z + p.nz * cross[1][1]),
      new THREE.Vector3(cross[2][0], p.y + p.ny * cross[2][1], p.z + p.nz * cross[2][1]),
      new THREE.Vector3(cross[3][0], p.y + p.ny * cross[3][1], p.z + p.nz * cross[3][1]),
    );
  }

  for (let i = 0; i < ring.length / 4 - 1; i++) {
    for (let k = 0; k < 4; k++) {
      const a = ring[i * 4 + k];
      const b = ring[i * 4 + ((k + 1) % 4)];
      const c = ring[(i + 1) * 4 + k];
      const d = ring[(i + 1) * 4 + ((k + 1) % 4)];
      const normal = new THREE.Vector3()
        .subVectors(b, a)
        .cross(new THREE.Vector3().subVectors(c, a))
        .normalize();
      if (normal.lengthSq() < 0.5) continue;
      const base = positions.length / 3;
      for (const point of [a, b, d, c]) {
        positions.push(point.x, point.y, point.z);
        normals.push(normal.x, normal.y, normal.z);
        uvs.push(point.x / 2.4, point.y / 2.4);
      }
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

/** The layered section of the hull, seen at the cut. */
function makeLayerTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const bands: [string, number][] = [
    ["#8f9599", 6],
    ["#d8cdb4", 26],
    ["#a8adb0", 8],
    ["#e2e3de", 24],
  ];
  let y = 0;
  for (const [colour, height] of bands) {
    ctx.fillStyle = colour;
    ctx.fillRect(0, y, 32, height);
    y += height;
  }
  // A few quilting stitches through the insulation.
  ctx.strokeStyle = "rgba(120,105,80,0.5)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 32; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 6);
    ctx.lineTo(i, 32);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  return texture;
}

export interface Porthole {
  group: THREE.Group;
  /** The centre of the aperture, in world space. */
  centre: THREE.Vector3;
  /** The outward normal of the window. */
  normal: THREE.Vector3;
  radius: number;
  /** The light that shines through it. */
  spot: THREE.SpotLight;
}

export interface Capsule {
  group: THREE.Group;
  bigWindow: Porthole;
  smallWindows: Porthole[];
  floorStrip: THREE.Mesh;
  floorStripMaterial: THREE.MeshStandardMaterial;
  stripLights: THREE.PointLight[];
  hatchLeft: THREE.Group;
  hatchRight: THREE.Group;
}

function buildPorthole(
  radius: number,
  wallTexture: THREE.Texture,
  materials: { frame: THREE.Material; tunnel: THREE.Material },
): { group: THREE.Group; aperture: THREE.Mesh; tunnel: THREE.Mesh } {
  const group = new THREE.Group();

  // The tunnel through the hull.
  const tunnel = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, WALL_THICKNESS + 0.02, 32, 1, true),
    materials.tunnel,
  );
  tunnel.rotation.x = Math.PI / 2;
  tunnel.position.z = -WALL_THICKNESS / 2;
  group.add(tunnel);

  // The heavy inner frame, the anchor of the composition.
  const inner = new THREE.Mesh(
    new THREE.TorusGeometry(radius + 0.045, 0.075, 10, 40),
    materials.frame,
  );
  group.add(inner);

  const innerRing = new THREE.Mesh(
    new THREE.CylinderGeometry(radius + 0.13, radius + 0.13, 0.05, 40, 1, true),
    materials.frame,
  );
  innerRing.rotation.x = Math.PI / 2;
  innerRing.position.z = 0.03;
  group.add(innerRing);

  // Bolt heads around the frame.
  const boltGeometry = new THREE.CylinderGeometry(0.022, 0.022, 0.04, 6);
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const bolt = new THREE.Mesh(boltGeometry, materials.frame);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(
      Math.cos(angle) * (radius + 0.115),
      Math.sin(angle) * (radius + 0.115),
      0.05,
    );
    group.add(bolt);
  }

  // The outer collar, seen from outside.
  const collar = new THREE.Mesh(
    new THREE.CylinderGeometry(radius + 0.1, radius + 0.16, 0.09, 32, 1, true),
    materials.frame,
  );
  collar.rotation.x = Math.PI / 2;
  collar.position.z = -WALL_THICKNESS - 0.03;
  group.add(collar);

  // The glass: almost nothing, just a faint sheen.
  const glass = new THREE.Mesh(
    new THREE.CircleGeometry(radius - 0.005, 40),
    new THREE.MeshPhysicalMaterial({
      color: 0x9fc6d8,
      transparent: true,
      opacity: 0.07,
      roughness: 0.12,
      metalness: 0,
      side: THREE.DoubleSide,
      // The pane must not write depth, or it would hide the planet behind it.
      depthWrite: false,
    }),
  );
  glass.position.z = -WALL_THICKNESS * 0.5;
  group.add(glass);

  void wallTexture;
  return { group, aperture: glass, tunnel };
}

export function buildCapsule(textures: TextureSet): Capsule {
  const group = new THREE.Group();
  const profile = buildProfile();
  const holes: Hole[] = [BIG_WINDOW, ...SMALL_WINDOWS];

  const wallGeometry = buildWallGeometry(profile, holes, WALL_THICKNESS, 256);
  const wallInner = standardMaterial(0xb4b8b6, {
    map: textures.wall,
    roughness: 0.74,
    metalness: 0.08,
    side: THREE.FrontSide,
  });
  const wallOuter = standardMaterial(0x5d6462, {
    map: textures.wallOuter,
    roughness: 0.62,
    metalness: 0.18,
  });

  // The inner surface and the outer skin are one geometry with two material
  // groups, so the hull is a single object with one silhouette.
  wallGeometry.clearGroups();
  const half = wallGeometry.index!.count / 2;
  wallGeometry.addGroup(0, half, 0);
  wallGeometry.addGroup(half, half, 1);
  const wall = new THREE.Mesh(wallGeometry, [wallInner, wallOuter]);
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);

  // The layered section at the cut, following the shell from the wall into
  // the shoulder.
  const layerTexture = makeLayerTexture();
  const sectionMaterial = standardMaterial(0xffffff, {
    map: layerTexture,
    roughness: 0.9,
    side: THREE.DoubleSide,
  });
  const crown = profile[profile.length - 1];
  const section = new THREE.Mesh(
    new THREE.PlaneGeometry(MODULE_LENGTH, WALL_THICKNESS),
    sectionMaterial,
  );
  section.position.set(0, crown.y + WALL_THICKNESS / 2, crown.z + 0.002);
  section.castShadow = true;
  section.receiveShadow = true;
  group.add(section);

  // The ring stiffeners that hold the skin together.
  const ribMaterial = standardMaterial(0x8b9296, { roughness: 0.46, metalness: 0.55 });
  for (const centre of [-3.1, -1.55, 0, 1.55, 3.1]) {
    const rib = new THREE.Mesh(
      buildRibGeometry(profile, centre, 0.07, WALL_THICKNESS + 0.004, 0.055),
      ribMaterial,
    );
    rib.castShadow = true;
    rib.receiveShadow = true;
    group.add(rib);
  }

  /* --- the floor ---------------------------------------------------------- */

  const floorMaterial = standardMaterial(0xffffff, {
    map: textures.floor,
    roughness: 0.66,
    metalness: 0.25,
  });
  const floor = new THREE.Mesh(
    new THREE.BoxGeometry(MODULE_LENGTH, 0.14, FLOOR_HALF_DEPTH + 0.16),
    floorMaterial,
  );
  floor.position.set(0, -0.07, -FLOOR_HALF_DEPTH / 2 + 0.08);
  floor.receiveShadow = true;
  floor.castShadow = true;
  group.add(floor);

  // The layered section of the floor at the cut: it sits on the front face of
  // the floor slab, not in the air in front of it.
  const floorSection = new THREE.Mesh(
    new THREE.PlaneGeometry(MODULE_LENGTH, 0.14),
    sectionMaterial,
  );
  floorSection.position.set(0, -0.07, -FLOOR_HALF_DEPTH / 2 + 0.08 + (FLOOR_HALF_DEPTH + 0.16) / 2);
  group.add(floorSection);

  /* --- the warm light strip down the middle of the floor -------------------- */

  // The diffuser is dark on purpose: the strip is lit by its own emission, so
  // it reads as a warm line rather than a white paint mark.
  const stripMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a463f,
    emissive: new THREE.Color(PALETTE.warmLight),
    emissiveIntensity: 0.9,
    roughness: 0.4,
  });
  const floorStrip = new THREE.Mesh(
    new THREE.BoxGeometry(MODULE_LENGTH - 0.4, 0.02, 0.11),
    stripMaterial,
  );
  floorStrip.position.set(0, 0.012, -FLOOR_HALF_DEPTH * 0.48);
  group.add(floorStrip);

  // The channel the strip sits in.
  const channel = new THREE.Mesh(
    new THREE.BoxGeometry(MODULE_LENGTH - 0.3, 0.03, 0.2),
    standardMaterial(PALETTE.graphite, { roughness: 0.5, metalness: 0.4 }),
  );
  channel.position.set(0, 0.005, -FLOOR_HALF_DEPTH * 0.48);
  channel.receiveShadow = true;
  group.add(channel);

  const stripLights: THREE.PointLight[] = [];
  for (let i = 0; i < 4; i++) {
    const light = new THREE.PointLight(PALETTE.warmLight, 3.0, 7.0, 2);
    light.position.set(-3 + i * 2, 1.5, -FLOOR_HALF_DEPTH * 0.48);
    group.add(light);
    stripLights.push(light);
  }

  /* --- the portholes -------------------------------------------------------- */

  const frameMaterial = standardMaterial(PALETTE.frame, { roughness: 0.5, metalness: 0.55 });
  const tunnelMaterial = standardMaterial(PALETTE.darkSteel, {
    roughness: 0.6,
    metalness: 0.35,
    side: THREE.DoubleSide,
  });

  const makeWindow = (spec: Hole): Porthole => {
    const built = buildPorthole(spec.radius, textures.wall, {
      frame: frameMaterial,
      tunnel: tunnelMaterial,
    });
    built.group.position.set(spec.x, spec.y, -FLOOR_HALF_DEPTH);
    group.add(built.group);

    // The light that comes through. It sits just inside the aperture and
    // throws a sharp round pool of light onto the floor.
    const spot = new THREE.SpotLight(0xfff4e2, 0, 16, 0.52, 0.06, 1.5);
    spot.position.set(spec.x, spec.y, -FLOOR_HALF_DEPTH + 0.06);
    spot.castShadow = true;
    spot.shadow.mapSize.set(1024, 1024);
    spot.shadow.camera.near = 0.2;
    spot.shadow.camera.far = 12;
    spot.shadow.bias = -0.0016;
    spot.shadow.normalBias = 0.02;
    group.add(spot);
    group.add(spot.target);

    return {
      group: built.group,
      centre: new THREE.Vector3(spec.x, spec.y, -FLOOR_HALF_DEPTH),
      normal: new THREE.Vector3(0, 0, -1),
      radius: spec.radius,
      spot,
    };
  };

  const bigWindow = makeWindow(BIG_WINDOW);
  const smallWindows = SMALL_WINDOWS.map(makeWindow);

  /* --- the end bulkheads and their hatches ---------------------------------- */

  const makeHatch = (side: number): THREE.Group => {
    const hatch = new THREE.Group();
    // The bulkhead fills the cross-section, so it is the same arch as
    // the shell rather than a rectangle that sticks out of it.
    const bulkheadShape = new THREE.Shape();
    const profile = buildProfile();
    // The shape is drawn in the (z, y) plane and then stood up as the end
    // wall, so the sign of the depth follows the side the hatch is on.
    bulkheadShape.moveTo(side * profile[0].z, -0.14);
    for (const point of profile) bulkheadShape.lineTo(side * point.z, point.y);
    bulkheadShape.lineTo(side * profile[profile.length - 1].z, -0.14);
    bulkheadShape.closePath();

    const bulkhead = new THREE.Mesh(
      new THREE.ShapeGeometry(bulkheadShape),
      standardMaterial(0xffffff, {
        map: textures.wall,
        roughness: 0.76,
        metalness: 0.08,
        side: THREE.DoubleSide,
      }),
    );
    // The shape is drawn in (z, y); stand it up as the end wall.
    bulkhead.rotation.y = side * -Math.PI / 2;
    bulkhead.position.set(side * (HALF_LENGTH - 0.01), 0, 0);
    bulkhead.receiveShadow = true;
    hatch.add(bulkhead);

    const door = new THREE.Mesh(
      new THREE.CylinderGeometry(0.62, 0.62, 0.1, 32),
      standardMaterial(PALETTE.enamelDim, { roughness: 0.5, metalness: 0.35 }),
    );
    door.rotation.z = Math.PI / 2;
    door.position.set(side * (HALF_LENGTH - 0.06), 1.15, -FLOOR_HALF_DEPTH + 0.1);
    door.castShadow = true;
    hatch.add(door);

    const doorRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.66, 0.05, 8, 32),
      standardMaterial(PALETTE.frame, { roughness: 0.45, metalness: 0.6 }),
    );
    doorRing.rotation.y = Math.PI / 2;
    doorRing.position.set(side * (HALF_LENGTH - 0.04), 1.15, -FLOOR_HALF_DEPTH + 0.1);
    hatch.add(doorRing);

    // The small viewport in the door.
    const viewport = new THREE.Mesh(
      new THREE.CircleGeometry(0.16, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x0a1420,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      }),
    );
    viewport.rotation.y = side * -Math.PI / 2;
    viewport.position.set(side * (HALF_LENGTH - 0.005), 1.15, -FLOOR_HALF_DEPTH + 0.1);
    hatch.add(viewport);

    // The wheel that locks it.
    const wheel = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.028, 8, 24),
      standardMaterial(PALETTE.copper, { roughness: 0.45, metalness: 0.7 }),
    );
    wheel.rotation.y = Math.PI / 2;
    wheel.position.set(side * (HALF_LENGTH + 0.02), 1.15, -FLOOR_HALF_DEPTH + 0.1);
    hatch.add(wheel);
    for (let i = 0; i < 4; i++) {
      const spoke = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, 0.38, 6),
        standardMaterial(PALETTE.copper, { roughness: 0.45, metalness: 0.7 }),
      );
      spoke.rotation.set(0, 0, (i / 4) * Math.PI);
      spoke.rotation.y = Math.PI / 2;
      spoke.position.set(side * (HALF_LENGTH + 0.02), 1.15, -FLOOR_HALF_DEPTH + 0.1);
      hatch.add(spoke);
    }
    return hatch;
  };

  const hatchLeft = makeHatch(-1);
  const hatchRight = makeHatch(1);
  group.add(hatchLeft, hatchRight);

  return {
    group,
    bigWindow,
    smallWindows,
    floorStrip,
    floorStripMaterial: stripMaterial,
    stripLights,
    hatchLeft,
    hatchRight,
  };
}
