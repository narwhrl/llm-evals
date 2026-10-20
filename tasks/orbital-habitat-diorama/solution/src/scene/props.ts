import * as THREE from "three";
import { PALETTE, TextureSet, standardMaterial } from "./textures";
import { FLOOR_HALF_DEPTH } from "./capsule";

/**
 * Everything in the cabin.
 *
 * The rule for the density: the wall is never a blank plate. Every metre of
 * it carries panels, labels, cable runs, vents or something hung on it, and
 * the small things on the floor are the ones that say somebody has lived
 * here for half a year.
 */

export interface PropRefs {
  group: THREE.Group;
  /** Things that can be clicked to focus the camera on them. */
  focusTargets: { name: string; object: THREE.Object3D; position: THREE.Vector3 }[];
  /** The pen that drifts and dodges the cursor. */
  pen: THREE.Object3D;
  /** The plant lamp that can be switched off. */
  plantLamp: THREE.Object3D;
  plantLight: THREE.PointLight;
  /** The floor strip that switches to night cruise. */
  strip: THREE.Object3D;
  /** The laptop screen, whose canvas is redrawn every frame. */
  screen: ScreenCanvas;
  /** Things that drift in the air. */
  floaters: { object: THREE.Object3D; spin: number; bob: number; phase: number }[];
  /** The zipper pull on the sleeping bag. */
  zipper: THREE.Object3D;
  /** The blinking indicator lamps. */
  indicators: { mesh: THREE.Mesh; period: number; offset: number; colour: number }[];
}

export class ScreenCanvas {
  readonly canvas: HTMLCanvasElement;
  readonly texture: THREE.CanvasTexture;
  private ctx: CanvasRenderingContext2D;
  private offset = 0;

  constructor(width = 512, height = 320) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d")!;
    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
  }

  /** The telemetry display on the laptop. The traces scroll. */
  update(delta: number) {
    this.offset = (this.offset + delta * 26) % 512;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.fillStyle = "#050d12";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(80,220,200,0.10)";
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const traces = [
      { colour: "#3fe0c8", seed: 1.3, amp: 26, freq: 0.021 },
      { colour: "#49b6ff", seed: 4.1, amp: 18, freq: 0.033 },
      { colour: "#ffd166", seed: 7.9, amp: 12, freq: 0.047 },
    ];
    for (const trace of traces) {
      ctx.strokeStyle = trace.colour;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const t = (x + this.offset) * trace.freq + trace.seed;
        const y =
          h * 0.42 +
          Math.sin(t) * trace.amp +
          Math.sin(t * 2.7 + 1.3) * trace.amp * 0.45 +
          Math.sin(t * 6.1) * trace.amp * 0.2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    ctx.fillStyle = "#9fe9dd";
    ctx.font = "13px monospace";
    ctx.fillText("ORBIT  400.2 km   VEL  7.67 km/s", 12, 20);
    ctx.fillText("PITCH  -51.6   NODE  02:14   SUN  00:00", 12, h - 14);
    ctx.fillStyle = "#3fe0c8";
    ctx.fillText("O2 96.4%   CO2 0.31%   P 101.3 kPa", 12, 40);
    ctx.fillStyle = "#ff7b6b";
    ctx.fillText("GYRO DRIFT 0.0042", w - 168, 40);

    this.texture.needsUpdate = true;
  }
}

/* -------------------------------------------------------------------------- */
/*  Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function box(
  size: [number, number, number],
  material: THREE.Material,
  position: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function cylinder(
  radius: number,
  height: number,
  material: THREE.Material,
  position: [number, number, number],
  segments = 16,
): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, segments), material);
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function decal(
  texture: THREE.Texture,
  width: number,
  height: number,
  position: [number, number, number],
  rotation: [number, number, number],
): THREE.Mesh {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.85,
      metalness: 0,
      side: THREE.DoubleSide,
    }),
  );
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.receiveShadow = true;
  return mesh;
}

/* -------------------------------------------------------------------------- */
/*  The cabin                                                                  */
/* -------------------------------------------------------------------------- */

export function buildProps(textures: TextureSet): PropRefs {
  const group = new THREE.Group();
  const focusTargets: PropRefs["focusTargets"] = [];
  const floaters: PropRefs["floaters"] = [];
  const indicators: PropRefs["indicators"] = [];

  const enamel = standardMaterial(PALETTE.enamel, { roughness: 0.72, metalness: 0.12 });
  const steel = standardMaterial(PALETTE.steel, { roughness: 0.42, metalness: 0.68 });
  const dark = standardMaterial(PALETTE.graphite, { roughness: 0.55, metalness: 0.35 });
  const rubber = standardMaterial(PALETTE.rubber, { roughness: 0.95, metalness: 0 });
  const copper = standardMaterial(PALETTE.copper, { roughness: 0.38, metalness: 0.75 });
  const wallZ = -FLOOR_HALF_DEPTH + 0.02;

  /* ====================================================================== */
  /*  SLEEPING AREA — the left end                                            */
  /* ====================================================================== */

  const sleepGroup = new THREE.Group();
  sleepGroup.position.set(-3.25, 0, wallZ + 0.12);
  group.add(sleepGroup);

  // The bag hangs from a bracket and opens towards the room.
  const bagMaterial = standardMaterial(0xffffff, {
    map: textures.bagFabric,
    roughness: 0.92,
    metalness: 0,
  });
  const bag = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 1.15, 6, 14), bagMaterial);
  bag.position.set(0, 1.05, 0.3);
  bag.rotation.z = Math.PI / 2;
  bag.rotation.y = 0.06;
  bag.scale.set(1, 1, 0.72);
  bag.castShadow = true;
  sleepGroup.add(bag);

  // The opening, showing the pillow inside.
  const opening = new THREE.Mesh(
    new THREE.CircleGeometry(0.2, 20),
    standardMaterial(0x1b2026, { roughness: 0.95 }),
  );
  opening.position.set(0.62, 1.05, 0.3);
  opening.rotation.y = Math.PI / 2;
  sleepGroup.add(opening);

  const pillow = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 12, 10),
    standardMaterial(0xe8e2d4, { roughness: 0.95 }),
  );
  pillow.position.set(0.66, 1.05, 0.3);
  pillow.scale.set(1.1, 0.7, 0.8);
  sleepGroup.add(pillow);

  // The half-open zip and its pull.
  const zip = new THREE.Mesh(
    new THREE.BoxGeometry(0.9, 0.012, 0.02),
    steel,
  );
  zip.position.set(0.15, 1.19, 0.46);
  zip.rotation.y = 0.06;
  sleepGroup.add(zip);
  const zipper = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.022, 0.012), copper);
  zipper.position.set(0.52, 1.19, 0.46);
  sleepGroup.add(zipper);

  // The bracket the bag hangs from.
  sleepGroup.add(box([0.5, 0.04, 0.04], steel, [0, 1.72, 0.16]));
  sleepGroup.add(box([0.04, 0.6, 0.04], steel, [-0.2, 1.42, 0.16]));
  sleepGroup.add(box([0.04, 0.6, 0.04], steel, [0.2, 1.42, 0.16]));

  // The small partition with the photographs and the note.
  const partition = box([0.62, 0.78, 0.02], enamel, [0.72, 1.1, 0.06]);
  sleepGroup.add(partition);
  const memo = decal(textures.memo, 0.54, 0.54, [0.72, 1.12, 0.08], [0, 0, 0]);
  sleepGroup.add(memo);

  // The reading lamp: a small warm lamp on a stalk.
  const lampArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 0.36, 8),
    steel,
  );
  lampArm.position.set(-0.42, 1.62, 0.2);
  lampArm.rotation.x = 0.5;
  sleepGroup.add(lampArm);
  const lampHead = new THREE.Mesh(
    new THREE.ConeGeometry(0.075, 0.1, 14, 1, true),
    standardMaterial(0x8a7a5c, { roughness: 0.5, metalness: 0.4, side: THREE.DoubleSide }),
  );
  lampHead.position.set(-0.42, 1.47, 0.32);
  lampHead.rotation.x = Math.PI + 0.5;
  sleepGroup.add(lampHead);
  const lampBulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 8, 8),
    new THREE.MeshStandardMaterial({
      color: 0xffe6bd,
      emissive: new THREE.Color(0xffcf8a),
      emissiveIntensity: 3.2,
    }),
  );
  lampBulb.position.set(-0.42, 1.45, 0.33);
  sleepGroup.add(lampBulb);
  const readingLight = new THREE.PointLight(0xffcf8a, 1.6, 3.0, 2);
  readingLight.position.set(-0.42, 1.42, 0.36);
  sleepGroup.add(readingLight);

  focusTargets.push({
    name: "Sleeping bay",
    object: sleepGroup,
    position: new THREE.Vector3(-3.25, 1.0, -1.6),
  });

  /* ====================================================================== */
  /*  PLANT CORNER — between the two small portholes                          */
  /* ====================================================================== */

  const plantGroup = new THREE.Group();
  plantGroup.position.set(-2.4, 0, wallZ + 0.3);
  group.add(plantGroup);

  const shelfMaterial = standardMaterial(PALETTE.steel, { roughness: 0.38, metalness: 0.72 });
  for (let level = 0; level < 3; level++) {
    const y = 0.42 + level * 0.42;
    const tray = box([1.12, 0.05, 0.34], shelfMaterial, [0, y, 0]);
    plantGroup.add(tray);
    // The nutrient channel along the front of the tray.
    plantGroup.add(box([1.12, 0.06, 0.03], dark, [0, y + 0.03, 0.17]));
    // The legs.
    plantGroup.add(box([0.03, 0.44, 0.03], shelfMaterial, [-0.52, y - 0.24, -0.1]));
    plantGroup.add(box([0.03, 0.44, 0.03], shelfMaterial, [0.52, y - 0.24, -0.1]));

    // The plants: leaves on short stalks.
    const leafMaterial = new THREE.MeshStandardMaterial({
      map: textures.leaf,
      transparent: true,
      alphaTest: 0.35,
      side: THREE.DoubleSide,
      roughness: 0.78,
    });
    for (let i = 0; i < 5; i++) {
      const px = -0.42 + i * 0.21 + (level % 2) * 0.05;
      const stalk = cylinder(0.008, 0.1, standardMaterial(0x4d7a33, { roughness: 0.9 }), [px, y + 0.07, 0], 6);
      plantGroup.add(stalk);
      for (let k = 0; k < 3; k++) {
        const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.26), leafMaterial);
        leaf.position.set(px + (k - 1) * 0.05, y + 0.15 + k * 0.03, (k - 1) * 0.05);
        leaf.rotation.set(-0.5 + k * 0.3, k * 1.1, 0.2 * (k - 1));
        leaf.castShadow = true;
        plantGroup.add(leaf);
      }
    }
  }

  // The grow lamps on top of the rack.
  const plantLamp = new THREE.Group();
  plantLamp.position.set(0, 1.76, 0.06);
  plantGroup.add(plantLamp);
  const lampBar = box([1.06, 0.05, 0.08], dark, [0, 0, 0]);
  plantLamp.add(lampBar);
  const lampStripMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb0f0,
    emissive: new THREE.Color(PALETTE.plantLight),
    emissiveIntensity: 1.9,
  });
  for (let i = 0; i < 3; i++) {
    const strip = box([0.3, 0.02, 0.05], lampStripMaterial, [-0.34 + i * 0.34, -0.035, 0]);
    plantLamp.add(strip);
  }
  const plantLight = new THREE.PointLight(PALETTE.plantLight, 1.7, 3.0, 2);
  plantLight.position.set(0, 1.62, 0.14);
  plantGroup.add(plantLight);

  focusTargets.push({
    name: "Plant corner",
    object: plantGroup,
    position: new THREE.Vector3(-2.4, 1.0, -1.6),
  });

  /* ====================================================================== */
  /*  WORK AREA — under the big porthole                                      */
  /* ====================================================================== */

  const deskGroup = new THREE.Group();
  deskGroup.position.set(1.05, 0, wallZ + 0.42);
  group.add(deskGroup);

  // A folding desk against the wall.
  const deskTop = box([1.7, 0.04, 0.62], standardMaterial(0xffffff, {
    map: textures.desk,
    roughness: 0.68,
    metalness: 0.05,
  }), [0, 0.74, 0]);
  deskGroup.add(deskTop);
  deskGroup.add(box([1.7, 0.06, 0.05], steel, [0, 0.7, -0.29]));
  for (const side of [-1, 1]) {
    deskGroup.add(box([0.04, 0.72, 0.04], steel, [side * 0.8, 0.36, -0.24]));
    deskGroup.add(box([0.04, 0.72, 0.04], steel, [side * 0.8, 0.36, 0.24]));
    deskGroup.add(box([0.03, 0.03, 0.5], steel, [side * 0.8, 0.16, 0]));
  }

  // The laptop, screen lit.
  const laptopBase = box([0.4, 0.02, 0.3], dark, [-0.42, 0.77, 0.02]);
  deskGroup.add(laptopBase);
  const laptopLid = box([0.4, 0.28, 0.015], dark, [-0.42, 0.91, -0.12]);
  laptopLid.rotation.x = -0.22;
  deskGroup.add(laptopLid);

  const screen = new ScreenCanvas();
  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.37, 0.24),
    new THREE.MeshBasicMaterial({ map: screen.texture }),
  );
  screenMesh.position.set(-0.42, 0.913, -0.105);
  screenMesh.rotation.x = -0.22;
  deskGroup.add(screenMesh);
  const screenLight = new THREE.PointLight(0x7fc4e8, 0.7, 1.5, 2);
  screenLight.position.set(-0.42, 0.95, 0.05);
  deskGroup.add(screenLight);

  // Headphones hanging from a hook.
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.008, 6, 12), steel);
  hook.position.set(-0.66, 1.42, -0.26);
  hook.rotation.y = Math.PI / 2;
  deskGroup.add(hook);
  const headphones = new THREE.Group();
  headphones.position.set(-0.66, 1.28, -0.24);
  deskGroup.add(headphones);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.014, 6, 18, Math.PI), dark);
  band.rotation.y = Math.PI / 2;
  headphones.add(band);
  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.035, 12), dark);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(0, -0.02, side * 0.11);
    headphones.add(cup);
  }

  // The thermos, held down by a strip of hook and loop.
  const thermos = cylinder(0.045, 0.19, standardMaterial(0x2f4a5c, { roughness: 0.5, metalness: 0.3 }), [0.62, 0.86, 0.02], 14);
  deskGroup.add(thermos);
  const thermosCap = cylinder(0.048, 0.035, steel, [0.62, 0.97, 0.02], 14);
  deskGroup.add(thermosCap);
  const velcro = box([0.14, 0.02, 0.03], standardMaterial(0x1e1e22, { roughness: 1 }), [0.62, 0.9, -0.03]);
  deskGroup.add(velcro);

  // A mug, a stack of notes, a pencil.
  deskGroup.add(cylinder(0.045, 0.09, standardMaterial(0xd8d2c4, { roughness: 0.7 }), [0.05, 0.805, 0.16], 14));
  deskGroup.add(box([0.2, 0.012, 0.28], standardMaterial(0xe8e2d2, { roughness: 0.9 }), [0.36, 0.768, 0.14]));
  deskGroup.add(box([0.2, 0.012, 0.28], standardMaterial(0xe0d8c4, { roughness: 0.9 }), [0.37, 0.782, 0.15]));

  // The drawings clipped to the wall above the desk.
  const blueprint = decal(textures.blueprint, 0.62, 0.62, [0.06, 1.42, wallZ + 0.09], [0, 0, 0.04]);
  group.add(blueprint);
  const clip = box([0.05, 0.02, 0.03], steel, [0.06, 1.7, wallZ + 0.12]);
  group.add(clip);
  const blueprint2 = decal(textures.blueprint, 0.42, 0.42, [-0.45, 1.34, wallZ + 0.09], [0, 0, -0.06]);
  group.add(blueprint2);

  focusTargets.push({
    name: "Work station",
    object: deskGroup,
    position: new THREE.Vector3(1.05, 0.9, -1.5),
  });

  /* ====================================================================== */
  /*  THE SEAT IN FRONT OF THE WINDOW                                         */
  /* ====================================================================== */

  const seatGroup = new THREE.Group();
  seatGroup.position.set(1.3, 0, wallZ + 1.05);
  seatGroup.rotation.y = -0.1;
  group.add(seatGroup);

  const seatFrame = standardMaterial(PALETTE.steel, { roughness: 0.4, metalness: 0.7 });
  const seatPad = standardMaterial(0x3d4a56, { roughness: 0.85 });
  // The pedestal and the foot.
  seatGroup.add(cylinder(0.16, 0.06, seatFrame, [0, 0.03, 0], 18));
  seatGroup.add(cylinder(0.07, 0.42, seatFrame, [0, 0.25, 0], 12));
  // The seat pan, tipped up at the front.
  const pan = box([0.56, 0.1, 0.52], seatPad, [0, 0.5, 0.04]);
  pan.rotation.x = -0.22;
  seatGroup.add(pan);
  // The back, reclined.
  const back = box([0.54, 0.72, 0.09], seatPad, [0, 0.86, -0.28]);
  back.rotation.x = 0.28;
  seatGroup.add(back);
  // Headrest and a strap.
  seatGroup.add(box([0.3, 0.16, 0.08], seatPad, [0, 1.24, -0.38]));
  seatGroup.add(box([0.06, 0.7, 0.02], standardMaterial(0x2b3238, { roughness: 0.9 }), [0, 0.88, -0.22]));
  // Armrests.
  for (const side of [-1, 1]) {
    seatGroup.add(box([0.06, 0.05, 0.46], seatFrame, [side * 0.31, 0.68, 0.0]));
    seatGroup.add(box([0.04, 0.22, 0.04], seatFrame, [side * 0.31, 0.57, -0.16]));
  }
  // The control panel on the right armrest.
  const panel = box([0.14, 0.03, 0.22], dark, [0.31, 0.72, 0.06]);
  seatGroup.add(panel);
  const buttonColours = [0x63ff9a, 0xffb347, 0x6fd3ff, 0xff6f6f];
  for (let i = 0; i < 4; i++) {
    const button = new THREE.Mesh(
      new THREE.CircleGeometry(0.018, 10),
      new THREE.MeshStandardMaterial({
        color: buttonColours[i],
        emissive: new THREE.Color(buttonColours[i]),
        emissiveIntensity: 2.4,
      }),
    );
    button.rotation.x = -Math.PI / 2;
    button.position.set(0.31, 0.737, -0.01 + i * 0.05);
    seatGroup.add(button);
  }
  indicators.push({ mesh: buttonColours.length ? seatGroup.children[seatGroup.children.length - 1] as THREE.Mesh : new THREE.Mesh(), period: 2.4, offset: 0, colour: 0x63ff9a });

  focusTargets.push({
    name: "Window seat",
    object: seatGroup,
    position: new THREE.Vector3(1.3, 0.7, -0.9),
  });

  /* ====================================================================== */
  /*  FITNESS CORNER — the right end                                         */
  /* ====================================================================== */

  const bikeGroup = new THREE.Group();
  bikeGroup.position.set(3.15, 0, wallZ + 0.55);
  bikeGroup.rotation.y = 0.25;
  group.add(bikeGroup);

  const bikeFrame = standardMaterial(PALETTE.graphite, { roughness: 0.45, metalness: 0.55 });
  // The base rails and the stabilisers.
  bikeGroup.add(box([0.52, 0.06, 0.12], bikeFrame, [0, 0.05, 0.28]));
  bikeGroup.add(box([0.52, 0.06, 0.12], bikeFrame, [0, 0.05, -0.28]));
  for (const side of [-1, 1]) {
    bikeGroup.add(box([0.1, 0.04, 0.7], bikeFrame, [side * 0.2, 0.05, 0]));
  }
  // The flywheel housing.
  const flywheel = cylinder(0.24, 0.16, standardMaterial(0x39424b, { roughness: 0.5, metalness: 0.4 }), [0, 0.34, 0.06], 20);
  flywheel.rotation.z = Math.PI / 2;
  bikeGroup.add(flywheel);
  bikeGroup.add(cylinder(0.09, 0.18, steel, [0, 0.34, 0.06], 16).rotateZ(Math.PI / 2));
  // The column and the handlebars.
  const column = box([0.07, 1.0, 0.07], bikeFrame, [0, 0.6, -0.26]);
  column.rotation.x = -0.2;
  bikeGroup.add(column);
  const bars = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.52, 10), steel);
  bars.rotation.z = Math.PI / 2;
  bars.position.set(0, 1.08, -0.36);
  bikeGroup.add(bars);
  for (const side of [-1, 1]) {
    const grip = new THREE.Mesh(
      new THREE.CylinderGeometry(0.028, 0.028, 0.14, 10),
      standardMaterial(0x2a2f34, { roughness: 1 }),
    );
    grip.rotation.z = Math.PI / 2;
    grip.position.set(side * 0.19, 1.08, -0.36);
    bikeGroup.add(grip);
  }
  // The saddle.
  const saddle = box([0.11, 0.06, 0.3], rubber, [0, 0.72, 0.24]);
  bikeGroup.add(saddle);
  // The towel over the wall behind it.
  const towel = decal(textures.towelFabric, 0.42, 0.66, [3.15, 1.42, wallZ + 0.06], [0, 0, 0.03]);
  towel.material = new THREE.MeshStandardMaterial({
    map: textures.towelFabric,
    roughness: 0.98,
    side: THREE.DoubleSide,
  });
  group.add(towel);
  bikeGroup.add(box([0.06, 0.05, 0.05], steel, [0, 1.72, -0.28]));

  focusTargets.push({
    name: "Exercise bike",
    object: bikeGroup,
    position: new THREE.Vector3(3.15, 0.7, -1.4),
  });

  /* ====================================================================== */
  /*  STORAGE AND THE SMALL LIVING THINGS                                     */
  /* ====================================================================== */

  // The net pockets on the wall between the plant corner and the desk.
  const netMaterial = new THREE.MeshStandardMaterial({
    map: textures.net,
    transparent: true,
    alphaTest: 0.18,
    side: THREE.DoubleSide,
    roughness: 0.9,
  });
  for (let i = 0; i < 3; i++) {
    const x = -0.85 + i * 0.5;
    const pocket = new THREE.Mesh(new THREE.PlaneGeometry(0.44, 0.4), netMaterial);
    pocket.position.set(x, 1.34, wallZ + 0.05);
    group.add(pocket);
    // What is in the pockets.
    if (i === 0) {
      const bagItem = box([0.14, 0.2, 0.08], standardMaterial(0xb9b2a0, { roughness: 0.9 }), [x - 0.08, 1.3, wallZ + 0.09]);
      group.add(bagItem);
    } else if (i === 1) {
      const cube = box([0.1, 0.1, 0.1], standardMaterial(0xc2453a, { roughness: 0.6 }), [x + 0.08, 1.32, wallZ + 0.09]);
      group.add(cube);
    } else {
      const tool = box([0.05, 0.26, 0.03], steel, [x, 1.3, wallZ + 0.08]);
      group.add(tool);
    }
  }

  // The clothes hung from the upper wall on hook and loop.
  for (let i = 0; i < 2; i++) {
    const shirt = box([0.3, 0.52, 0.05], standardMaterial(i === 0 ? 0x5a6b7c : 0x8a4a3c, { roughness: 0.95 }), [-0.2 + i * 0.42, 1.48, wallZ + 0.14]);
    group.add(shirt);
  }

  // The fire extinguisher and the first aid box.
  const extinguisher = cylinder(0.075, 0.4, standardMaterial(0xb03a2a, { roughness: 0.45, metalness: 0.2 }), [2.35, 0.62, wallZ + 0.12], 14);
  group.add(extinguisher);
  group.add(box([0.12, 0.1, 0.02], dark, [2.35, 0.86, wallZ + 0.12]));
  const aidBox = box([0.28, 0.2, 0.1], standardMaterial(0xe8e6df, { roughness: 0.6 }), [-1.35, 1.5, wallZ + 0.1]);
  group.add(aidBox);
  group.add(box([0.1, 0.03, 0.01], standardMaterial(0x2f7a3a, { roughness: 0.6 }), [-1.35, 1.5, wallZ + 0.16]));
  group.add(box([0.03, 0.1, 0.01], standardMaterial(0x2f7a3a, { roughness: 0.6 }), [-1.35, 1.5, wallZ + 0.16]));

  // A crate of spares lashed down to the floor.
  const crate = box([0.44, 0.3, 0.34], standardMaterial(0x4a5a52, { roughness: 0.8, metalness: 0.1 }), [-0.15, 0.15, -0.52]);
  crate.rotation.y = 0.18;
  group.add(crate);
  group.add(box([0.46, 0.02, 0.05], steel, [-0.15, 0.3, -0.52]));
  group.add(box([0.05, 0.32, 0.36], steel, [-0.15, 0.16, -0.52]));

  // A toolbox and a coiled cable, out in the open.
  const toolbox = box([0.34, 0.16, 0.2], standardMaterial(0xa2452f, { roughness: 0.65, metalness: 0.2 }), [2.35, 0.08, -0.62]);
  toolbox.rotation.y = -0.3;
  group.add(toolbox);
  group.add(box([0.36, 0.02, 0.03], steel, [2.35, 0.17, -0.62]));
  const coil = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.022, 6, 18), standardMaterial(0x2c3238, { roughness: 0.9 }));
  coil.rotation.x = Math.PI / 2;
  coil.position.set(1.9, 0.03, -0.3);
  group.add(coil);

  // A mat by the seat.
  const mat = decal(textures.net, 0.6, 0.42, [1.3, 0.015, -0.45], [-Math.PI / 2, 0, 0]);
  mat.material = new THREE.MeshStandardMaterial({
    map: textures.net,
    color: 0x3d4a52,
    transparent: true,
    alphaTest: 0.2,
    roughness: 0.95,
    side: THREE.DoubleSide,
  });
  group.add(mat);

  // A folded blanket left on the floor by the sleep station.
  const blanket = box([0.56, 0.11, 0.4], standardMaterial(0x4c5a63, { roughness: 0.97 }), [-2.35, 0.055, -0.62]);
  blanket.rotation.y = 0.12;
  group.add(blanket);
  group.add(box([0.54, 0.03, 0.38], standardMaterial(0x5d6c74, { roughness: 0.97 }), [-2.35, 0.12, -0.62]));

  // A pair of shoes, toes pointing at the wall.
  for (let i = 0; i < 2; i++) {
    const shoe = box([0.1, 0.07, 0.23], standardMaterial(0x2f3439, { roughness: 0.95 }), [-1.5 + i * 0.15, 0.035, -0.78]);
    shoe.rotation.y = 0.25 - i * 0.5;
    group.add(shoe);
  }

  // A water bottle on its side.
  const bottle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.035, 0.035, 0.2, 12),
    new THREE.MeshPhysicalMaterial({ color: 0x9fd4e0, roughness: 0.2, metalness: 0, transparent: true, opacity: 0.55 }),
  );
  bottle.rotation.z = Math.PI / 2;
  bottle.position.set(-0.95, 0.035, -0.95);
  group.add(bottle);
  const bottleCap = new THREE.Mesh(new THREE.CylinderGeometry(0.037, 0.037, 0.03, 12), dark);
  bottleCap.rotation.z = Math.PI / 2;
  bottleCap.position.set(-0.84, 0.035, -0.95);
  group.add(bottleCap);

  // A cable run clipped along the floor.
  for (let i = 0; i < 5; i++) {
    const clipBox = box([0.05, 0.04, 0.06], dark, [-3.0 + i * 0.62, 0.02, -0.18]);
    group.add(clipBox);
  }
  const floorCable = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.022, 3.0, 8),
    standardMaterial(0x1e2226, { roughness: 0.85 }),
  );
  floorCable.rotation.z = Math.PI / 2;
  floorCable.position.set(-1.8, 0.03, -0.18);
  group.add(floorCable);

  // The slippers, stuck to the floor with hook and loop.
  for (let i = 0; i < 2; i++) {
    const slipper = box([0.11, 0.05, 0.24], standardMaterial(0x4a5560, { roughness: 0.95 }), [-0.6 + i * 0.16, 0.03, -0.3]);
    slipper.rotation.y = 0.2 - i * 0.4;
    group.add(slipper);
  }

  /* ====================================================================== */
  /*  THE OPEN FLOOR                                                         */
  /* ====================================================================== */

  // The exercise mat, rolled up and stood on edge.
  const matRoll = new THREE.Mesh(
    new THREE.CylinderGeometry(0.11, 0.11, 0.72, 16),
    standardMaterial(0x4a6a5c, { roughness: 0.9 }),
  );
  matRoll.position.set(-3.35, 0.12, -0.55);
  matRoll.rotation.x = Math.PI / 2 - 0.12;
  matRoll.castShadow = true;
  group.add(matRoll);
  for (const y of [-0.18, 0.18]) {
    const strap = new THREE.Mesh(
      new THREE.TorusGeometry(0.115, 0.012, 6, 16),
      standardMaterial(0x2f3a34, { roughness: 0.95 }),
    );
    strap.position.set(-3.35, 0.12 + y, -0.55);
    strap.rotation.x = Math.PI / 2 - 0.12;
    group.add(strap);
  }

  // A pair of work boots, toes towards the room.
  for (let i = 0; i < 2; i++) {
    const boot = box([0.14, 0.16, 0.3], standardMaterial(0x3c3226, { roughness: 0.95 }), [-2.55 + i * 0.2, 0.08, -0.42]);
    boot.rotation.y = 0.18 - i * 0.36;
    group.add(boot);
    const sole = box([0.15, 0.03, 0.31], standardMaterial(0x22201d, { roughness: 1 }), [-2.55 + i * 0.2, 0.015, -0.42]);
    sole.rotation.y = 0.18 - i * 0.36;
    group.add(sole);
  }

  // A stack of magazines that never made it to the shelf.
  for (let i = 0; i < 3; i++) {
    const magazine = box([0.28, 0.02, 0.21], standardMaterial(0xb8b0a0, { roughness: 0.85 }), [-1.85 + i * 0.01, 0.012 + i * 0.021, -0.34 + i * 0.012]);
    magazine.rotation.y = 0.22 - i * 0.16;
    group.add(magazine);
  }

  // A floor cushion by the seat.
  const cushion = box([0.42, 0.11, 0.42], standardMaterial(0x6b5140, { roughness: 0.98 }), [0.4, 0.055, -0.5]);
  cushion.rotation.y = 0.3;
  group.add(cushion);

  // A bin for the rubbish, with a bag over the rim.
  group.add(cylinder(0.15, 0.34, standardMaterial(0x707a80, { roughness: 0.6, metalness: 0.25 }), [2.62, 0.17, -0.3], 16));
  const binBag = new THREE.Mesh(
    new THREE.SphereGeometry(0.13, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
    standardMaterial(0x2a2f33, { roughness: 0.7 }),
  );
  binBag.position.set(2.62, 0.33, -0.3);
  group.add(binBag);

  // The cable runs along the wall, held down with clips.
  for (let i = 0; i < 7; i++) {
    const x = -3.6 + i * 1.15;
    const run = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 1.05, 8),
      standardMaterial(0xffffff, { map: textures.cable, roughness: 0.85 }),
    );
    run.rotation.z = Math.PI / 2;
    run.position.set(x, 0.24, wallZ + 0.07);
    group.add(run);
    group.add(box([0.03, 0.09, 0.05], dark, [x - 0.5, 0.24, wallZ + 0.09]));
  }

  // Equipment panels with blinking lamps.
  for (let i = 0; i < 3; i++) {
    const panelBox = box([0.3, 0.22, 0.06], dark, [2.55, 0.92 + i * 0.25, wallZ + 0.08]);
    group.add(panelBox);
    for (let k = 0; k < 3; k++) {
      const led = new THREE.Mesh(
        new THREE.CircleGeometry(0.012, 8),
        new THREE.MeshStandardMaterial({
          color: 0x66ff9c,
          emissive: new THREE.Color(0x66ff9c),
          emissiveIntensity: 2.6,
        }),
      );
      led.position.set(2.48 + k * 0.05, 0.92 + i * 0.25, wallZ + 0.115);
      group.add(led);
      indicators.push({ mesh: led, period: 1.4 + i * 0.7 + k * 0.23, offset: k * 0.4, colour: 0x66ff9c });
    }
  }

  // A vent grille.
  const vent = box([0.42, 0.26, 0.04], steel, [-1.15, 1.12, wallZ + 0.08]);
  group.add(vent);
  for (let i = 0; i < 6; i++) {
    group.add(box([0.38, 0.02, 0.02], dark, [-1.15, 1.01 + i * 0.04, wallZ + 0.11]));
  }

  // A clipboard with the day's checklist, next to the big window.
  const clipboard = box([0.2, 0.28, 0.012], standardMaterial(0x6b5236, { roughness: 0.85 }), [2.28, 1.3, wallZ + 0.05]);
  clipboard.rotation.z = -0.07;
  group.add(clipboard);
  const checklist = decal(textures.memo, 0.17, 0.24, [2.28, 1.29, wallZ + 0.062], [0, 0, -0.07]);
  group.add(checklist);
  group.add(box([0.07, 0.03, 0.015], steel, [2.28, 1.42, wallZ + 0.07]));

  // The fire blanket pouch, with its pull tag.
  const blanketPouch = box([0.24, 0.3, 0.08], standardMaterial(0xa8332c, { roughness: 0.7 }), [2.3, 0.95, wallZ + 0.09]);
  group.add(blanketPouch);
  group.add(box([0.05, 0.09, 0.012], standardMaterial(0xe8e4dc, { roughness: 0.8 }), [2.3, 1.02, wallZ + 0.135]));
  group.add(box([0.02, 0.05, 0.01], copper, [2.3, 0.76, wallZ + 0.1]));

  // A mug hanging on a hook by the exercise corner.
  const mugHook = new THREE.Mesh(new THREE.TorusGeometry(0.035, 0.007, 6, 12), steel);
  mugHook.position.set(2.78, 1.24, wallZ + 0.05);
  mugHook.rotation.y = Math.PI / 2;
  group.add(mugHook);
  const hungMug = cylinder(0.042, 0.1, standardMaterial(0xd8d2c4, { roughness: 0.55 }), [2.78, 1.14, wallZ + 0.09], 14);
  group.add(hungMug);
  const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 6, 12), standardMaterial(0xd8d2c4, { roughness: 0.55 }));
  mugHandle.position.set(2.83, 1.14, wallZ + 0.09);
  mugHandle.rotation.y = Math.PI / 2;
  group.add(mugHandle);

  /* ====================================================================== */
  /*  THE THINGS THAT FLOAT                                                   */
  /* ====================================================================== */

  // The pen over the desk.
  const pen = new THREE.Group();
  const penBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.011, 0.009, 0.15, 10),
    standardMaterial(0x1f2a33, { roughness: 0.45 }),
  );
  pen.add(penBody);
  const penTip = new THREE.Mesh(
    new THREE.ConeGeometry(0.009, 0.03, 8),
    standardMaterial(PALETTE.copper, { roughness: 0.4, metalness: 0.7 }),
  );
  penTip.position.y = -0.09;
  penTip.rotation.x = Math.PI;
  pen.add(penTip);
  pen.position.set(1.05, 1.18, -0.85);
  group.add(pen);
  floaters.push({ object: pen, spin: 0.5, bob: 0.06, phase: 0 });

  // The open manual, drifting.
  const manual = new THREE.Group();
  const manualPages = decal(textures.book, 0.42, 0.31, [0, 0, 0], [0, 0, 0]);
  manual.add(manualPages);
  manual.add(decal(textures.book, 0.42, 0.31, [0, 0, 0.002], [0, Math.PI, 0]));
  const manualSpine = box([0.02, 0.3, 0.02], standardMaterial(0x6a5b4a, { roughness: 0.9 }), [0, 0, 0.01]);
  manual.add(manualSpine);
  manual.position.set(0.55, 1.28, -0.55);
  manual.rotation.set(0.4, 0.6, 0.2);
  group.add(manual);
  floaters.push({ object: manual, spin: 0.22, bob: 0.05, phase: 1.7 });

  // The headphones, drifting.
  const driftingHeadphones = new THREE.Group();
  const band2 = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.013, 6, 16, Math.PI), dark);
  band2.rotation.y = Math.PI / 2;
  driftingHeadphones.add(band2);
  for (const side of [-1, 1]) {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.033, 12), dark);
    cup.rotation.z = Math.PI / 2;
    cup.position.set(0, -0.02, side * 0.1);
    driftingHeadphones.add(cup);
  }
  driftingHeadphones.position.set(-0.3, 1.42, -0.7);
  group.add(driftingHeadphones);
  floaters.push({ object: driftingHeadphones, spin: 0.34, bob: 0.07, phase: 3.1 });

  // A droplet off the plant rack.
  const droplet = new THREE.Mesh(
    new THREE.SphereGeometry(0.022, 10, 8),
    new THREE.MeshPhysicalMaterial({
      color: 0xbfe4f0,
      roughness: 0.05,
      metalness: 0,
      transparent: true,
      opacity: 0.7,
    }),
  );
  droplet.position.set(-2.35, 1.02, -1.2);
  group.add(droplet);
  floaters.push({ object: droplet, spin: 0.1, bob: 0.09, phase: 4.4 });

  // A crumb of biscuit.
  const crumb = new THREE.Mesh(
    new THREE.TetrahedronGeometry(0.022),
    standardMaterial(0xc79a5b, { roughness: 0.95 }),
  );
  crumb.position.set(0.15, 0.6, -0.65);
  group.add(crumb);
  floaters.push({ object: crumb, spin: 0.8, bob: 0.04, phase: 5.6 });

  focusTargets.push({
    name: "The porthole",
    object: group,
    position: new THREE.Vector3(1.3, 1.2, -1.7),
  });

  return {
    group,
    focusTargets,
    pen,
    plantLamp,
    plantLight,
    strip: group,
    screen,
    floaters,
    zipper,
    indicators: indicators.filter((entry) => entry.mesh !== undefined),
  };
}
