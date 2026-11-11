import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import {
  createClockTexture,
  createPlasterTexture,
  createRoofTexture,
  createStationSignTexture,
  createStoneTexture,
  seededRandom,
} from "./textures.js";

const sharedGeometry = {
  frame: new THREE.BoxGeometry(1, 1, 1),
  glass: new THREE.PlaneGeometry(1, 1),
  door: new RoundedBoxGeometry(1, 1, 0.07, 2, 0.02),
  cylinder: new THREE.CylinderGeometry(1, 1, 1, 12),
};

function markShadows(object, cast = true, receive = true) {
  object.traverse((child) => {
    if (!child.isMesh) return;
    child.castShadow = cast;
    child.receiveShadow = receive;
  });
}

function setWindowGroup(group, position, rotationY = 0) {
  group.position.copy(position);
  group.rotation.y = rotationY;
  return group;
}

function addBeam(group, start, end, thickness, material, z = 0) {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const length = Math.hypot(deltaX, deltaY);
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(length, thickness, thickness),
    material,
  );
  beam.position.set((start.x + end.x) / 2, (start.y + end.y) / 2, z);
  beam.rotation.z = Math.atan2(deltaY, deltaX);
  group.add(beam);
  return beam;
}

function addTriangleGable(group, x, width, depth, wallHeight, roofHeight, material) {
  const geometry = new THREE.BufferGeometry();
  const halfDepth = depth / 2 + 0.16;
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(
      [
        x, wallHeight, -halfDepth,
        x, wallHeight, halfDepth,
        x, wallHeight + roofHeight, 0,
      ],
      3,
    ),
  );
  geometry.computeVertexNormals();
  const gable = new THREE.Mesh(geometry, material);
  gable.material.side = THREE.DoubleSide;
  group.add(gable);
  return gable;
}

function addWindow(group, architecture, options) {
  const {
    x,
    y,
    z,
    rotationY = 0,
    width = 0.36,
    height = 0.46,
    lit = true,
    shutters = false,
    flowerBox = false,
    trimMaterial = architecture.darkWoodMaterial,
  } = options;
  const windowGroup = new THREE.Group();
  const frame = new THREE.Mesh(sharedGeometry.frame, trimMaterial);
  frame.scale.set(width + 0.1, height + 0.1, 0.045);
  windowGroup.add(frame);

  const glass = new THREE.Mesh(
    sharedGeometry.glass,
    lit ? architecture.litWindowMaterial : architecture.darkWindowMaterial,
  );
  glass.scale.set(width, height, 1);
  glass.position.z = 0.026;
  windowGroup.add(glass);

  const mullionVertical = new THREE.Mesh(sharedGeometry.frame, trimMaterial);
  mullionVertical.scale.set(0.025, height, 0.035);
  mullionVertical.position.z = 0.052;
  windowGroup.add(mullionVertical);

  const mullionHorizontal = new THREE.Mesh(sharedGeometry.frame, trimMaterial);
  mullionHorizontal.scale.set(width, 0.024, 0.035);
  mullionHorizontal.position.z = 0.052;
  windowGroup.add(mullionHorizontal);

  if (shutters) {
    const shutterMaterial = architecture.shutterMaterial;
    for (const side of [-1, 1]) {
      const shutter = new THREE.Mesh(sharedGeometry.frame, shutterMaterial);
      shutter.scale.set(width * 0.32, height * 1.03, 0.045);
      shutter.position.set(side * (width * 0.77), 0, 0.012);
      windowGroup.add(shutter);
      for (let slat = -2; slat <= 2; slat += 1) {
        const groove = new THREE.Mesh(sharedGeometry.frame, architecture.darkWoodMaterial);
        groove.scale.set(width * 0.25, 0.012, 0.02);
        groove.position.set(side * (width * 0.77), slat * height * 0.16, 0.038);
        windowGroup.add(groove);
      }
    }
  }

  if (flowerBox) {
    const box = new THREE.Mesh(sharedGeometry.frame, architecture.planterMaterial);
    box.scale.set(width + 0.12, 0.11, 0.16);
    box.position.set(0, -height / 2 - 0.09, 0.11);
    windowGroup.add(box);
    for (let flower = 0; flower < 5; flower += 1) {
      const bloom = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.035, 1),
        flower % 2 === 0 ? architecture.flowerPinkMaterial : architecture.flowerCreamMaterial,
      );
      bloom.position.set(
        -width * 0.45 + (flower / 4) * width * 0.9,
        -height / 2 - 0.005,
        0.15,
      );
      windowGroup.add(bloom);
    }
  }

  setWindowGroup(windowGroup, new THREE.Vector3(x, y, z), rotationY);
  group.add(windowGroup);
  return windowGroup;
}

function addDoor(group, architecture, options) {
  const {
    x,
    z,
    width = 0.44,
    height = 0.78,
    rotationY = 0,
    colorMaterial = architecture.doorMaterial,
  } = options;
  const doorGroup = new THREE.Group();
  const frame = new THREE.Mesh(sharedGeometry.frame, architecture.darkWoodMaterial);
  frame.scale.set(width + 0.13, height + 0.1, 0.06);
  doorGroup.add(frame);

  const door = new THREE.Mesh(sharedGeometry.door, colorMaterial);
  door.scale.set(width, height, 1);
  door.position.z = 0.055;
  doorGroup.add(door);

  const transom = new THREE.Mesh(sharedGeometry.glass, architecture.litWindowMaterial);
  transom.scale.set(width * 0.64, height * 0.22, 1);
  transom.position.set(0, height * 0.3, 0.1);
  doorGroup.add(transom);

  const knob = new THREE.Mesh(
    new THREE.SphereGeometry(0.027, 8, 6),
    architecture.brassMaterial,
  );
  knob.position.set(width * 0.32, 0, 0.1);
  doorGroup.add(knob);

  const lamp = new THREE.Mesh(
    new THREE.SphereGeometry(0.025, 8, 6),
    architecture.lampMaterial,
  );
  lamp.position.set(width * 0.65, height * 0.46, 0.08);
  doorGroup.add(lamp);

  const step = new THREE.Mesh(sharedGeometry.frame, architecture.stoneMaterial);
  step.scale.set(width + 0.25, 0.08, 0.32);
  step.position.set(0, -height / 2 - 0.055, 0.17);
  doorGroup.add(step);

  doorGroup.position.set(x, height / 2 + 0.13, z);
  doorGroup.rotation.y = rotationY;
  group.add(doorGroup);
  return doorGroup;
}

function addChimney(group, architecture, x, y, z, scale = 1) {
  const chimney = new THREE.Mesh(
    new RoundedBoxGeometry(0.22 * scale, 0.58 * scale, 0.22 * scale, 2, 0.025),
    architecture.stoneMaterial,
  );
  chimney.position.set(x, y, z);
  group.add(chimney);

  const cap = new THREE.Mesh(
    new THREE.BoxGeometry(0.3 * scale, 0.06 * scale, 0.3 * scale),
    architecture.darkStoneMaterial,
  );
  cap.position.set(x, y + 0.31 * scale, z);
  group.add(cap);
}

function addAwning(group, architecture, width, y, z, colorMaterial) {
  const awning = new THREE.Group();
  const slope = 0.35;
  const xSegments = 9;
  for (let index = 0; index < xSegments; index += 1) {
    const strip = new THREE.Mesh(
      new THREE.BoxGeometry(width / xSegments - 0.008, 0.035, 0.5),
      index % 2 === 0 ? colorMaterial : architecture.canvasMaterial,
    );
    strip.position.x = -width / 2 + (index + 0.5) * (width / xSegments);
    strip.position.z = 0.24;
    strip.rotation.x = -0.32;
    awning.add(strip);
  }
  awning.position.set(0, y, z);
  awning.castShadow = true;
  group.add(awning);
  return awning;
}

function addDormer(group, architecture, x, y, z, roofMaterial) {
  const dormer = new THREE.Group();
  const body = new THREE.Mesh(
    new RoundedBoxGeometry(0.45, 0.48, 0.42, 2, 0.035),
    architecture.creamMaterial,
  );
  body.position.y = 0.2;
  dormer.add(body);
  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.055, 0.52),
    roofMaterial,
  );
  roof.position.y = 0.46;
  roof.rotation.x = 0.1;
  dormer.add(roof);
  const tinyWindow = new THREE.Mesh(
    sharedGeometry.glass,
    architecture.litWindowMaterial,
  );
  tinyWindow.scale.set(0.2, 0.21, 1);
  tinyWindow.position.set(0, 0.24, 0.217);
  dormer.add(tinyWindow);
  dormer.position.set(x, y, z);
  group.add(dormer);
}

function addGableTrim(group, architecture, width, wallHeight, roofHeight, depth, material) {
  const halfDepth = depth / 2 + 0.12;
  for (const side of [-1, 1]) {
    addBeam(
      group,
      { x: -width / 2 - 0.15, y: wallHeight },
      { x: 0, y: wallHeight + roofHeight },
      0.055,
      material,
      side * (halfDepth + 0.012),
    );
    addBeam(
      group,
      { x: 0, y: wallHeight + roofHeight },
      { x: width / 2 + 0.15, y: wallHeight },
      0.055,
      material,
      side * (halfDepth + 0.012),
    );
  }
}

function createHouse(architecture, options = {}) {
  const {
    width = 2.4,
    depth = 1.65,
    wallHeight = 1.75,
    roofHeight = 0.78,
    storeys = 2,
    wallMaterial = architecture.creamMaterial,
    roofMaterial = architecture.terracottaMaterial,
    timber = false,
    shutters = true,
    flowerBoxes = true,
    shopfront = false,
    awningMaterial = architecture.awningGreenMaterial,
    sideWindows = true,
    chimney = true,
    dormer = false,
    doorOffset = 0,
  } = options;

  const group = new THREE.Group();
  group.userData.footprint = { width, depth };

  const foundation = new THREE.Mesh(
    new RoundedBoxGeometry(width + 0.15, 0.14, depth + 0.15, 2, 0.025),
    architecture.stoneMaterial,
  );
  foundation.position.y = 0.07;
  group.add(foundation);

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(width, wallHeight, depth, 3, 0.055),
    wallMaterial,
  );
  body.position.y = 0.14 + wallHeight / 2;
  group.add(body);

  const roofHalfSpan = depth / 2 + 0.2;
  const roofAngle = Math.atan2(roofHeight, roofHalfSpan);
  const roofSlopeLength = Math.hypot(roofHeight, roofHalfSpan);
  const roofCenterY = 0.14 + wallHeight + roofHeight / 2;
  for (const side of [-1, 1]) {
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.36, 0.075, roofSlopeLength + 0.16),
      roofMaterial,
    );
    roof.position.set(0, roofCenterY, side * roofHalfSpan * 0.5);
    roof.rotation.x = side * roofAngle;
    group.add(roof);
  }

  const ridge = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.055, width + 0.38, 8),
    architecture.darkStoneMaterial,
  );
  ridge.rotation.z = Math.PI / 2;
  ridge.position.y = 0.14 + wallHeight + roofHeight + 0.025;
  group.add(ridge);

  addTriangleGable(
    group,
    -width / 2 - 0.015,
    width,
    depth,
    0.14 + wallHeight,
    roofHeight,
    wallMaterial,
  );
  addTriangleGable(
    group,
    width / 2 + 0.015,
    width,
    depth,
    0.14 + wallHeight,
    roofHeight,
    wallMaterial,
  );

  const eaveBeamMaterial = timber ? architecture.darkWoodMaterial : architecture.trimMaterial;
  for (const side of [-1, 1]) {
    const fascia = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.44, 0.075, 0.07),
      eaveBeamMaterial,
    );
    fascia.position.set(0, 0.14 + wallHeight + 0.02, side * (depth / 2 + 0.21));
    group.add(fascia);
  }

  if (timber) {
    addGableTrim(
      group,
      architecture,
      width,
      wallHeight,
      roofHeight,
      depth,
      eaveBeamMaterial,
    );
  }

  const frontZ = depth / 2 + 0.034;
  const rowHeight = wallHeight / storeys;
  const hasUpperFloor = storeys > 1;

  if (shopfront) {
    addAwning(group, architecture, width * 0.8, 0.9, frontZ + 0.06, awningMaterial);
    for (const side of [-1, 1]) {
      const shopWindow = addWindow(group, architecture, {
        x: side * width * 0.18,
        y: 0.62,
        z: frontZ,
        width: width * 0.31,
        height: 0.45,
        lit: true,
        flowerBox: false,
      });
      shopWindow.scale.z = 1;
    }
    addDoor(group, architecture, {
      x: doorOffset + width * 0.31,
      z: frontZ,
      width: 0.38,
      height: 0.72,
      colorMaterial: architecture.paintedDoorMaterial,
    });
  } else {
    addDoor(group, architecture, {
      x: doorOffset,
      z: frontZ,
      width: 0.44,
      height: 0.78,
    });
    const availableWidth = width - 0.52;
    const groundWindowCount = width > 2.25 ? 2 : 1;
    for (let index = 0; index < groundWindowCount; index += 1) {
      const fraction = groundWindowCount === 1 ? 1 : index === 0 ? -1 : 1;
      addWindow(group, architecture, {
        x: fraction * availableWidth * 0.39 + doorOffset * 0.2,
        y: 0.66,
        z: frontZ,
        width: width > 2.25 ? 0.39 : 0.34,
        height: 0.45,
        lit: index % 2 === 0,
        shutters,
        flowerBox: flowerBoxes,
      });
    }
  }

  if (hasUpperFloor) {
    const upperCount = width > 2.2 ? 3 : 2;
    for (let index = 0; index < upperCount; index += 1) {
      const fraction = upperCount === 1 ? 0 : index / (upperCount - 1) - 0.5;
      addWindow(group, architecture, {
        x: fraction * (width - 0.52),
        y: 0.14 + rowHeight * (storeys - 1) + rowHeight * 0.5,
        z: frontZ,
        width: 0.34,
        height: 0.43,
        lit: index !== 1,
        shutters,
        flowerBox: flowerBoxes && index === 0,
      });
    }
  }

  if (sideWindows) {
    const perSide = storeys > 1 ? 2 : 1;
    for (const side of [-1, 1]) {
      for (let floor = 0; floor < perSide; floor += 1) {
        addWindow(group, architecture, {
          x: side * (width / 2 + 0.037),
          y: 0.14 + rowHeight * (floor + 0.5),
          z: 0,
          rotationY: side * Math.PI / 2,
          width: 0.3,
          height: 0.39,
          lit: !(side === 1 && floor === 0),
          shutters,
        });
      }
    }
  }

  if (timber) {
    for (let floor = 0; floor <= storeys; floor += 1) {
      const y = 0.14 + Math.min(wallHeight, rowHeight * floor);
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.025, 0.065, 0.065),
        architecture.darkWoodMaterial,
      );
      beam.position.set(0, y, frontZ + 0.015);
      group.add(beam);
    }
    for (const x of [-width / 2 + 0.06, width / 2 - 0.06]) {
      const beam = new THREE.Mesh(
        new THREE.BoxGeometry(0.065, wallHeight, 0.065),
        architecture.darkWoodMaterial,
      );
      beam.position.set(x, 0.14 + wallHeight / 2, frontZ + 0.015);
      group.add(beam);
    }
  }

  if (shopfront) {
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(width * 0.42, 0.27, 0.055),
      architecture.signMaterial,
    );
    sign.position.set(0, 1.16, frontZ + 0.08);
    group.add(sign);
    for (const x of [-0.07, 0.07]) {
      const letterStroke = new THREE.Mesh(
        new THREE.BoxGeometry(0.055, 0.12, 0.01),
        architecture.brassMaterial,
      );
      letterStroke.position.set(x, 1.16, frontZ + 0.115);
      group.add(letterStroke);
    }
  }

  if (chimney) {
    addChimney(
      group,
      architecture,
      -width * 0.27,
      0.14 + wallHeight + roofHeight * 0.72,
      -depth * 0.13,
      1,
    );
  }

  if (dormer) {
    addDormer(
      group,
      architecture,
      width * 0.2,
      0.14 + wallHeight + roofHeight * 0.52,
      depth * 0.27,
      roofMaterial,
    );
  }

  markShadows(group);
  return group;
}

function createChurch(architecture) {
  const group = new THREE.Group();
  const naveWidth = 1.7;
  const naveDepth = 2.8;
  const naveHeight = 1.68;
  const roofHeight = 0.9;

  const plinth = new THREE.Mesh(
    new RoundedBoxGeometry(2.35, 0.18, 3.45, 3, 0.035),
    architecture.stoneMaterial,
  );
  plinth.position.y = 0.09;
  group.add(plinth);

  const nave = new THREE.Mesh(
    new RoundedBoxGeometry(naveWidth, naveHeight, naveDepth, 3, 0.045),
    architecture.churchStoneMaterial,
  );
  nave.position.set(0, 0.18 + naveHeight / 2, -0.15);
  group.add(nave);

  const roofHalf = naveWidth / 2 + 0.14;
  const angle = Math.atan2(roofHeight, roofHalf);
  const slope = Math.hypot(roofHeight, roofHalf);
  for (const side of [-1, 1]) {
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(slope + 0.14, 0.07, naveDepth + 0.32),
      architecture.slateMaterial,
    );
    roof.rotation.z = side * (Math.PI / 2 - angle);
    roof.position.set(side * roofHalf * 0.5, 0.18 + naveHeight + roofHeight / 2, -0.15);
    group.add(roof);
  }

  const tower = new THREE.Mesh(
    new RoundedBoxGeometry(0.84, 2.7, 0.84, 3, 0.03),
    architecture.churchStoneMaterial,
  );
  tower.position.set(0, 1.53, 1.16);
  group.add(tower);

  const towerCornice = new THREE.Mesh(
    new THREE.BoxGeometry(1.03, 0.11, 1.03),
    architecture.darkStoneMaterial,
  );
  towerCornice.position.set(0, 2.9, 1.16);
  group.add(towerCornice);

  const spire = new THREE.Mesh(
    new THREE.ConeGeometry(0.62, 1.35, 8),
    architecture.slateMaterial,
  );
  spire.rotation.y = Math.PI / 8;
  spire.position.set(0, 3.64, 1.16);
  group.add(spire);

  const crossVertical = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 0.35, 0.035),
    architecture.brassMaterial,
  );
  crossVertical.position.set(0, 4.45, 1.16);
  group.add(crossVertical);
  const crossHorizontal = new THREE.Mesh(
    new THREE.BoxGeometry(0.19, 0.035, 0.035),
    architecture.brassMaterial,
  );
  crossHorizontal.position.set(0, 4.49, 1.16);
  group.add(crossHorizontal);

  const archShape = new THREE.Shape();
  archShape.moveTo(-0.16, -0.36);
  archShape.lineTo(-0.16, 0.06);
  archShape.absarc(0, 0.06, 0.16, Math.PI, 0, true);
  archShape.lineTo(0.16, -0.36);
  archShape.closePath();

  const archedWindow = new THREE.ExtrudeGeometry(archShape, {
    depth: 0.035,
    bevelEnabled: false,
    curveSegments: 12,
  });
  for (const z of [-1.02, 0.22]) {
    for (const side of [-1, 1]) {
      const glass = new THREE.Mesh(archedWindow, architecture.litWindowMaterial);
      glass.position.set(side * (naveWidth / 2 + 0.044), 1.25, z);
      glass.rotation.y = side * Math.PI / 2;
      group.add(glass);
    }
  }

  const doorGroup = new THREE.Group();
  const doorway = new THREE.Mesh(archedWindow, architecture.darkDoorMaterial);
  doorway.scale.set(1.1, 1.75, 1);
  doorway.position.y = 0.88;
  doorGroup.add(doorway);
  doorGroup.position.set(0, 0.03, 1.607);
  group.add(doorGroup);

  const roseWindow = new THREE.Mesh(
    new THREE.CircleGeometry(0.21, 20),
    architecture.litWindowMaterial,
  );
  roseWindow.position.set(0, 2.2, 1.596);
  group.add(roseWindow);
  const roseFrame = new THREE.Mesh(
    new THREE.TorusGeometry(0.23, 0.025, 6, 20),
    architecture.darkStoneMaterial,
  );
  roseFrame.position.copy(roseWindow.position);
  group.add(roseFrame);

  const towerWindow = new THREE.Mesh(
    archedWindow,
    architecture.litWindowMaterial,
  );
  towerWindow.scale.set(0.8, 0.85, 1);
  towerWindow.position.set(0, 2.35, 1.588);
  group.add(towerWindow);

  markShadows(group);
  return group;
}

function createWorkshop(architecture) {
  const group = createHouse(architecture, {
    width: 3.25,
    depth: 1.9,
    wallHeight: 1.35,
    roofHeight: 0.9,
    storeys: 1,
    wallMaterial: architecture.barnMaterial,
    roofMaterial: architecture.mossRoofMaterial,
    timber: true,
    shutters: false,
    flowerBoxes: false,
    sideWindows: false,
    chimney: false,
  });

  const frontZ = 0.95 + 0.045;
  const leftDoor = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 0.92, 0.07),
    architecture.darkWoodMaterial,
  );
  leftDoor.position.set(-0.58, 0.57, frontZ);
  group.add(leftDoor);

  const diagonalBrace = new THREE.Mesh(
    new THREE.BoxGeometry(1.02, 0.045, 0.04),
    architecture.trimMaterial,
  );
  diagonalBrace.position.set(-0.58, 0.57, frontZ + 0.045);
  diagonalBrace.rotation.z = 0.73;
  group.add(diagonalBrace);

  const loftDoor = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.55, 0.055),
    architecture.recessMaterial,
  );
  loftDoor.position.set(-0.55, 1.55, frontZ);
  group.add(loftDoor);

  return group;
}

function createStationHouse(architecture) {
  const group = createHouse(architecture, {
    width: 2.9,
    depth: 1.55,
    wallHeight: 1.85,
    roofHeight: 0.72,
    storeys: 2,
    wallMaterial: architecture.ochreMaterial,
    roofMaterial: architecture.slateMaterial,
    timber: false,
    shutters: false,
    flowerBoxes: false,
    sideWindows: true,
    chimney: true,
    dormer: true,
    doorOffset: 0,
  });

  const frontZ = 1.55 / 2 + 0.05;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.35, 0.42),
    new THREE.MeshStandardMaterial({
      map: createStationSignTexture(),
      roughness: 0.68,
      metalness: 0,
    }),
  );
  sign.position.set(0, 2.08, frontZ);
  group.add(sign);

  const clockBacking = new THREE.Mesh(
    new THREE.CylinderGeometry(0.27, 0.27, 0.08, 24),
    architecture.brassMaterial,
  );
  clockBacking.rotation.x = Math.PI / 2;
  clockBacking.position.set(0, 2.67, frontZ - 0.01);
  group.add(clockBacking);

  const clockFace = new THREE.Mesh(
    new THREE.CircleGeometry(0.22, 32),
    new THREE.MeshStandardMaterial({
      map: createClockTexture(),
      roughness: 0.72,
      emissive: new THREE.Color("#f4c87c"),
      emissiveIntensity: 0,
    }),
  );
  clockFace.material.userData.isClockFace = true;
  clockFace.position.set(0, 2.67, frontZ + 0.035);
  group.add(clockFace);
  architecture.clockFaceMaterials.push(clockFace.material);

  const gable = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.72, 0.12),
    architecture.ochreMaterial,
  );
  gable.position.set(0, 2.55, frontZ - 0.11);
  group.add(gable);

  const gableRoof = new THREE.Mesh(
    new THREE.ConeGeometry(0.54, 0.45, 4),
    architecture.slateMaterial,
  );
  gableRoof.rotation.y = Math.PI / 4;
  gableRoof.position.set(0, 3.15, frontZ - 0.1);
  group.add(gableRoof);

  markShadows(group);
  return group;
}

function createBridgeParapet(architecture, length) {
  const group = new THREE.Group();
  const blockCount = Math.max(5, Math.floor(length / 0.42));
  for (const side of [-1, 1]) {
    for (let index = 0; index < blockCount; index += 1) {
      const block = new THREE.Mesh(
        new THREE.BoxGeometry(length / blockCount - 0.025, 0.22, 0.16),
        index % 2 === 0 ? architecture.stoneMaterial : architecture.darkStoneMaterial,
      );
      block.position.set(
        -length / 2 + (index + 0.5) * (length / blockCount),
        0.11,
        side * 0.88,
      );
      group.add(block);
    }
    const coping = new THREE.Mesh(
      new THREE.BoxGeometry(length + 0.1, 0.055, 0.23),
      architecture.darkStoneMaterial,
    );
    coping.position.set(0, 0.245, side * 0.88);
    group.add(coping);
  }
  markShadows(group);
  return group;
}

function createArchitecture(renderer) {
  const plasterMap = createPlasterTexture("#e8d9bb");
  const stoneMap = createStoneTexture();
  const terracottaMap = createRoofTexture("terracotta");
  const slateMap = createRoofTexture("slate");
  const mossRoofMap = createRoofTexture("moss");
  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  for (const texture of [plasterMap, stoneMap, terracottaMap, slateMap, mossRoofMap]) {
    texture.anisotropy = Math.min(8, maxAnisotropy);
  }

  const litWindowMaterial = new THREE.MeshStandardMaterial({
    color: "#6f8790",
    roughness: 0.18,
    metalness: 0.05,
    emissive: new THREE.Color("#ffb45f"),
    emissiveIntensity: 0,
  });
  const darkWindowMaterial = new THREE.MeshStandardMaterial({
    color: "#374a4b",
    roughness: 0.23,
    metalness: 0.08,
    emissive: new THREE.Color("#2c1b10"),
    emissiveIntensity: 0,
  });
  const lampMaterial = new THREE.MeshStandardMaterial({
    color: "#f6d495",
    emissive: new THREE.Color("#ffc76a"),
    emissiveIntensity: 0,
    roughness: 0.28,
  });

  const architecture = {
    litWindowMaterial,
    darkWindowMaterial,
    lampMaterial,
    clockFaceMaterials: [],
    creamMaterial: new THREE.MeshStandardMaterial({
      map: plasterMap,
      color: "#eadbbd",
      roughness: 0.92,
    }),
    ochreMaterial: new THREE.MeshStandardMaterial({
      map: plasterMap,
      color: "#d8b878",
      roughness: 0.92,
    }),
    sageMaterial: new THREE.MeshStandardMaterial({
      map: plasterMap,
      color: "#aebc9d",
      roughness: 0.94,
    }),
    roseMaterial: new THREE.MeshStandardMaterial({
      map: plasterMap,
      color: "#caa08b",
      roughness: 0.94,
    }),
    blueMaterial: new THREE.MeshStandardMaterial({
      map: plasterMap,
      color: "#a9b9b5",
      roughness: 0.93,
    }),
    barnMaterial: new THREE.MeshStandardMaterial({
      color: "#845b43",
      roughness: 0.96,
    }),
    churchStoneMaterial: new THREE.MeshStandardMaterial({
      map: stoneMap,
      color: "#c4b69f",
      roughness: 0.96,
    }),
    stoneMaterial: new THREE.MeshStandardMaterial({
      map: stoneMap,
      color: "#b7aa94",
      roughness: 0.95,
    }),
    darkStoneMaterial: new THREE.MeshStandardMaterial({
      color: "#6e685e",
      roughness: 0.95,
    }),
    darkWoodMaterial: new THREE.MeshStandardMaterial({
      color: "#4e3527",
      roughness: 0.88,
    }),
    trimMaterial: new THREE.MeshStandardMaterial({
      color: "#594637",
      roughness: 0.87,
    }),
    doorMaterial: new THREE.MeshStandardMaterial({
      color: "#5c3a29",
      roughness: 0.78,
    }),
    paintedDoorMaterial: new THREE.MeshStandardMaterial({
      color: "#35584c",
      roughness: 0.72,
    }),
    darkDoorMaterial: new THREE.MeshStandardMaterial({
      color: "#382a22",
      roughness: 0.84,
    }),
    shutterMaterial: new THREE.MeshStandardMaterial({
      color: "#496555",
      roughness: 0.86,
    }),
    planterMaterial: new THREE.MeshStandardMaterial({
      color: "#634331",
      roughness: 0.94,
    }),
    flowerPinkMaterial: new THREE.MeshStandardMaterial({
      color: "#d68186",
      roughness: 0.88,
    }),
    flowerCreamMaterial: new THREE.MeshStandardMaterial({
      color: "#f1d9a5",
      roughness: 0.88,
    }),
    brassMaterial: new THREE.MeshStandardMaterial({
      color: "#be9651",
      roughness: 0.36,
      metalness: 0.7,
    }),
    signMaterial: new THREE.MeshStandardMaterial({
      color: "#2f4a3e",
      roughness: 0.82,
    }),
    recessMaterial: new THREE.MeshStandardMaterial({
      color: "#3b2b22",
      roughness: 0.94,
    }),
    terracottaMaterial: new THREE.MeshStandardMaterial({
      map: terracottaMap,
      color: "#c97554",
      roughness: 0.9,
    }),
    slateMaterial: new THREE.MeshStandardMaterial({
      map: slateMap,
      color: "#717c78",
      roughness: 0.86,
    }),
    mossRoofMaterial: new THREE.MeshStandardMaterial({
      map: mossRoofMap,
      color: "#839077",
      roughness: 0.93,
    }),
    canvasMaterial: new THREE.MeshStandardMaterial({
      color: "#e8dbc2",
      roughness: 0.92,
    }),
    awningGreenMaterial: new THREE.MeshStandardMaterial({
      color: "#426353",
      roughness: 0.9,
    }),
    awningWineMaterial: new THREE.MeshStandardMaterial({
      color: "#7b4642",
      roughness: 0.9,
    }),
  };

  architecture.createHouse = (options) => createHouse(architecture, options);
  architecture.createChurch = () => createChurch(architecture);
  architecture.createWorkshop = () => createWorkshop(architecture);
  architecture.createStationHouse = () => createStationHouse(architecture);
  architecture.createBridgeParapet = (length) => createBridgeParapet(architecture, length);
  architecture.exportNightMaterials = () => ({
    litWindowMaterial,
    lampMaterial,
    clockFaceMaterials: architecture.clockFaceMaterials,
  });

  return architecture;
}

export { createArchitecture, markShadows };
