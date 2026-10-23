import * as THREE from 'three';
import {
  basic,
  beam,
  box,
  cylinder,
  emissive,
  instanced,
  materials,
  plane,
  toon,
  unitBox,
} from './lib.js';
import {
  magazineTexture,
  matTexture,
  posterTexture,
  storeSignTexture,
  textTexture,
  textureMaterial,
} from './textures.js';

const productMaterials = [
  toon(0xd77d78),
  toon(0xe7bd69),
  toon(0x72aaa2),
  toon(0x7699bd),
  toon(0xd8d4b5),
  toon(0x9a7ba4),
];

function addProduct(bucket, index, p, s, r) {
  bucket[index % bucket.length].push({ p, s, r });
}

function createDoor(x) {
  const door = new THREE.Group();
  door.position.set(x, 0, 1.13);
  box(door, [1.18, 3.46, 0.045], [0, 2.14, 0], materials.glass, false).castShadow = false;
  box(door, [0.065, 3.62, 0.09], [-0.62, 2.14, 0], materials.darkMetal);
  box(door, [0.065, 3.62, 0.09], [0.62, 2.14, 0], materials.darkMetal);
  box(door, [1.29, 0.075, 0.09], [0, 0.34, 0], materials.darkMetal);
  box(door, [1.29, 0.075, 0.09], [0, 3.94, 0], materials.darkMetal);
  box(door, [1.19, 0.19, 0.055], [0, 1.72, 0.04], materials.mint, false);
  box(door, [0.055, 0.72, 0.08], [x < 1 ? 0.43 : -0.43, 2.05, 0.08], materials.metal, false);
  const decal = textureMaterial(textTexture('自動', 'PUSH  ·  PULL', {
    background: '#d9eee1', color: '#316c6d', accent: '#e69a63',
  }));
  plane(door, [0.47, 0.2], [0, 2.7, 0.04], decal, [0, 0, 0]);
  return door;
}

function buildFridges(group, products, caps) {
  const fridgeLight = emissive(0xd8f0dc, 0.65);
  const coldLabel = textureMaterial(textTexture('COLD DRINKS', 'お飲み物  ·  冷たい', {
    background: '#dcefdc', color: '#397a7d', accent: '#6baaaa',
  }));
  const centers = [-9.65, -7.35, -5.05, -2.75, -0.45];
  centers.forEach((x, fridgeIndex) => {
    box(group, [2.18, 3.65, 0.12], [x, 2.14, -7.13], materials.mintDark);
    box(group, [2.03, 3.28, 0.05], [x, 2.05, -7.04], fridgeLight, false);
    box(group, [0.09, 3.65, 0.72], [x - 1.09, 2.14, -6.8], materials.darkMetal);
    box(group, [0.09, 3.65, 0.72], [x + 1.09, 2.14, -6.8], materials.darkMetal);
    box(group, [2.25, 0.13, 0.75], [x, 0.32, -6.8], materials.darkMetal);
    box(group, [2.25, 0.18, 0.75], [x, 3.97, -6.8], materials.darkMetal);
    plane(group, [1.87, 0.4], [x, 3.73, -6.39], coldLabel, [0, 0, 0]);
    for (let row = 0; row < 4; row += 1) {
      const y = 0.73 + row * 0.72;
      box(group, [2.0, 0.055, 0.59], [x, y - 0.25, -6.69], materials.white, false);
      for (let column = 0; column < 9; column += 1) {
        const px = x - 0.86 + column * 0.215;
        const colorIndex = fridgeIndex + row * 2 + Math.floor(column / 3);
        addProduct(products, colorIndex, [px, y, -6.55], [0.073, 0.41, 0.073]);
        caps.push({ p: [px, y + 0.225, -6.55], s: [0.048, 0.055, 0.048] });
      }
    }
    box(group, [2.04, 3.15, 0.035], [x, 2.04, -6.34], materials.fridgeGlass, false).castShadow = false;
    box(group, [0.055, 3.15, 0.07], [x, 2.04, -6.29], materials.metal, false);
    box(group, [0.045, 0.65, 0.08], [x - 0.12, 2.05, -6.24], materials.metal, false);
    box(group, [0.045, 0.65, 0.08], [x + 0.12, 2.05, -6.24], materials.metal, false);
  });
}

function buildShelves(group, products, tags) {
  const centers = [-8.15, -5.15, -2.15];
  centers.forEach((x, shelfIndex) => {
    box(group, [1.08, 0.18, 4.25], [x, 0.4, -2.8], materials.mintDark);
    box(group, [0.11, 1.55, 4.05], [x, 1.16, -2.8], materials.wallDark);
    for (let level = 0; level < 3; level += 1) {
      const y = 0.63 + level * 0.49;
      box(group, [1.12, 0.07, 4.18], [x, y - 0.19, -2.8], materials.warmWhite, false);
      for (let side = -1; side <= 1; side += 2) {
        for (let item = 0; item < 10; item += 1) {
          const z = -4.55 + item * 0.39;
          addProduct(products, shelfIndex * 2 + level + item + (side > 0 ? 1 : 0),
            [x + side * 0.37, y + 0.055, z], [0.28, 0.37, 0.27],
            [0, side > 0 ? 0.05 : -0.05, 0]);
          tags.push({ p: [x + side * 0.555, y - 0.13, z], s: [0.018, 0.1, 0.21] });
        }
      }
    }
    box(group, [1.08, 1.43, 0.1], [x, 1.15, -0.69], materials.mint);
    for (let item = 0; item < 4; item += 1) {
      addProduct(products, shelfIndex + item, [x - 0.36 + item * 0.24, 1.52, -0.56], [0.2, 0.35, 0.2]);
    }
    const category = textureMaterial(textTexture(['おかし', '食品', '雑貨'][shelfIndex], ['SNACKS', 'DAILY FOOD', 'ESSENTIALS'][shelfIndex], {
      background: '#f0e6c8', color: '#426b6a', accent: '#dd9264',
    }));
    plane(group, [1.5, 0.62], [x, 2.55, -1.0], category, [0, 0, 0]);
    beam(group, [x, 2.85, -1.0], [x, 4.43, -1.0], 0.018, materials.darkMetal, 8);
  });
}

function buildCheckout(group) {
  box(group, [3.25, 0.93, 1.08], [-0.35, 0.77, -0.03], materials.mintDark);
  box(group, [3.4, 0.14, 1.18], [-0.35, 1.3, -0.03], materials.wood);
  box(group, [3.0, 0.1, 0.04], [-0.35, 0.87, 0.53], materials.mint, false);
  box(group, [0.55, 0.16, 0.48], [0.43, 1.44, -0.14], materials.darkMetal);
  const register = box(group, [0.62, 0.5, 0.09], [0.43, 1.75, -0.23], materials.darkMetal);
  register.rotation.x = -0.18;
  const registerScreen = textureMaterial(textTexture('AOI', 'WELCOME', {
    background: '#92c7b3', color: '#244b54', accent: '#e9d49b',
  }));
  plane(group, [0.51, 0.36], [0.43, 1.77, -0.175], registerScreen, [-0.18, 0, 0]);
  box(group, [0.42, 0.12, 0.36], [-0.34, 1.43, 0.13], materials.rubber);
  box(group, [0.24, 0.035, 0.19], [-0.34, 1.51, 0.13], emissive(0x70b7aa, 0.5), false);

  // Oden warmer: four visible metal compartments beside the till.
  box(group, [1.35, 0.93, 0.98], [-2.7, 0.76, 0.0], materials.mintDark);
  box(group, [1.42, 0.13, 1.05], [-2.7, 1.29, 0.0], materials.metal);
  box(group, [1.13, 0.12, 0.76], [-2.7, 1.39, 0.0], materials.darkMetal, false);
  for (let i = 0; i < 4; i += 1) {
    box(group, [0.46, 0.035, 0.29], [-2.98 + (i % 2) * 0.56, 1.47, -0.19 + Math.floor(i / 2) * 0.39],
      toon(i % 2 ? 0xb88b5f : 0xc7a16b), false);
  }
  const hot = textureMaterial(textTexture('HOT', 'おでん  ·  あったかい', {
    background: '#e9a26f', color: '#693e43', accent: '#f7d69b',
  }));
  plane(group, [1.03, 0.43], [-2.7, 0.91, 0.51], hot, [0, 0, 0]);

  // Coffee station with individual controls and cup dispenser.
  box(group, [1.08, 0.95, 0.75], [-4.15, 0.77, -0.05], materials.wallDark);
  box(group, [0.85, 1.02, 0.57], [-4.15, 1.75, -0.12], materials.darkMetal);
  box(group, [0.68, 0.42, 0.035], [-4.15, 1.76, 0.18], materials.rubber, false);
  for (let i = 0; i < 3; i += 1) {
    cylinder(group, 0.055, 0.035, [-4.38 + i * 0.23, 1.86, 0.22], emissive(0xe7a46f, 0.55), 12).rotation.x = Math.PI / 2;
  }
  beam(group, [-4.3, 1.58, 0.23], [-4.3, 1.42, 0.23], 0.035, materials.metal, 8);
  beam(group, [-4.0, 1.58, 0.23], [-4.0, 1.42, 0.23], 0.035, materials.metal, 8);
  cylinder(group, 0.12, 0.3, [-4.14, 1.32, 0.2], materials.paper, 16);
  const coffee = textureMaterial(textTexture('COFFEE', '淹れたて  ¥120', {
    background: '#e9d3aa', color: '#5c4542', accent: '#b87759',
  }));
  plane(group, [0.75, 0.36], [-4.15, 2.08, 0.18], coffee, [0, 0, 0]);
}

function buildFrontDisplays(group) {
  // Refrigerated prepared-food case with triangular onigiri and bento trays.
  box(group, [4.0, 0.72, 0.95], [-6.1, 0.69, 0.15], materials.white);
  box(group, [4.08, 0.1, 1.02], [-6.1, 1.1, 0.15], materials.metal);
  box(group, [3.92, 0.48, 0.035], [-6.1, 1.32, 0.65], materials.fridgeGlass, false).castShadow = false;
  box(group, [3.92, 0.035, 0.88], [-6.1, 1.54, 0.17], materials.fridgeGlass, false).castShadow = false;
  for (let i = 0; i < 8; i += 1) {
    const x = -7.75 + i * 0.47;
    const onigiri = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.18, 3), materials.white);
    onigiri.position.set(x, 1.3, 0.34);
    onigiri.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    group.add(onigiri);
    box(group, [0.14, 0.17, 0.025], [x, 1.25, 0.45], materials.rubber, false);
  }
  for (let i = 0; i < 4; i += 1) {
    box(group, [0.64, 0.1, 0.4], [-7.45 + i * 0.9, 1.22, -0.05], materials.darkMetal, false);
    box(group, [0.53, 0.05, 0.3], [-7.45 + i * 0.9, 1.29, -0.05], i % 2 ? materials.orange : materials.yellow, false);
  }
  const fresh = textureMaterial(textTexture('おにぎり・お弁当', 'FRESH  ·  MADE TODAY', {
    background: '#e9e4c9', color: '#46726c', accent: '#e89a62',
  }));
  plane(group, [3.55, 0.38], [-6.1, 0.73, 0.635], fresh, [0, 0, 0]);

  // Magazine rack: individual covers face the storefront.
  box(group, [2.22, 1.9, 0.32], [-9.55, 1.25, 0.23], materials.mintDark);
  for (let row = 0; row < 3; row += 1) {
    box(group, [2.15, 0.07, 0.45], [-9.55, 0.55 + row * 0.58, 0.39], materials.metal, false);
    for (let column = 0; column < 4; column += 1) {
      const cover = textureMaterial(magazineTexture(row * 4 + column));
      const magazine = plane(group, [0.43, 0.58], [-10.32 + column * 0.51, 0.87 + row * 0.58, 0.43], cover, [-0.12, 0, 0]);
      magazine.castShadow = false;
    }
  }
}

function buildInterior(group) {
  const products = Array.from({ length: productMaterials.length }, () => []);
  const caps = [];
  const tags = [];
  buildFridges(group, products, caps);
  buildShelves(group, products, tags);
  buildCheckout(group);
  buildFrontDisplays(group);

  const bottleGeometry = new THREE.CylinderGeometry(1, 1, 1, 8);
  products.forEach((items, index) => {
    const bottles = items.filter((item) => item.p[2] < -6);
    const packages = items.filter((item) => item.p[2] >= -6);
    instanced(group, bottleGeometry, productMaterials[index], bottles);
    instanced(group, unitBox, productMaterials[index], packages);
  });
  instanced(group, bottleGeometry, materials.white, caps);
  instanced(group, unitBox, materials.paper, tags);

  // Back-room access, lockers, and promotional posters.
  box(group, [1.65, 3.45, 0.11], [2.05, 2.0, -7.25], materials.wallDark);
  box(group, [1.38, 0.4, 0.04], [2.05, 3.35, -7.17], materials.glass, false);
  box(group, [0.08, 0.36, 0.08], [2.63, 1.9, -7.12], materials.metal, false);
  const staff = textureMaterial(textTexture('STAFF', '関係者以外立入禁止', {
    background: '#d5d7c5', color: '#4e5b5d', accent: '#788e87',
  }));
  plane(group, [0.83, 0.35], [2.05, 2.55, -7.16], staff, [0, 0, 0]);
  for (let i = 0; i < 3; i += 1) {
    box(group, [0.48, 1.7, 0.55], [1.08 + i * 0.5, 1.16, -5.93], materials.wallDark);
    box(group, [0.17, 0.025, 0.025], [1.08 + i * 0.5, 1.55, -5.64], materials.metal, false);
  }
  const posterA = textureMaterial(posterTexture('新商品', '秋の味覚  ·  限定', 0));
  plane(group, [1.35, 1.8], [-10.99, 2.75, -3.0], posterA, [0, Math.PI / 2, 0]);
  const posterB = textureMaterial(posterTexture('温かい', 'コーヒーはいかが', 1));
  plane(group, [1.2, 1.6], [3.13, 2.7, -5.25], posterB, [0, -Math.PI / 2, 0]);

  // Warm ceiling panels and pools of interior light.
  const panelMaterial = emissive(0xffe2ae, 1.8);
  [-7.4, -3.3, 0.6].forEach((x) => {
    box(group, [2.6, 0.08, 3.7], [x, 4.48, -2.7], materials.white, false);
    box(group, [2.35, 0.035, 3.45], [x, 4.42, -2.7], panelMaterial, false);
  });
  const lightA = new THREE.PointLight(0xffc982, 48, 13, 2);
  lightA.position.set(-6.5, 3.9, -2.2);
  group.add(lightA);
  const lightB = new THREE.PointLight(0xffd59a, 42, 12, 2);
  lightB.position.set(0.1, 3.8, -2.0);
  group.add(lightB);

  // Floor guidance arrows lead from the entrance into the aisle.
  const arrowShape = new THREE.Shape();
  arrowShape.moveTo(0, 0.52);
  arrowShape.lineTo(0.34, 0.1);
  arrowShape.lineTo(0.13, 0.1);
  arrowShape.lineTo(0.13, -0.45);
  arrowShape.lineTo(-0.13, -0.45);
  arrowShape.lineTo(-0.13, 0.1);
  arrowShape.lineTo(-0.34, 0.1);
  arrowShape.closePath();
  const arrowGeometry = new THREE.ShapeGeometry(arrowShape);
  const arrowMaterial = basic(0x8fc4aa, { transparent: true, opacity: 0.8, side: THREE.DoubleSide });
  [-1.1, -2.35, -3.6].forEach((z) => {
    const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
    arrow.position.set(1.2, 0.305, z);
    arrow.rotation.x = -Math.PI / 2;
    group.add(arrow);
  });
}

export function buildStore(parent) {
  const group = new THREE.Group();
  group.name = 'AOI convenience store';
  parent.add(group);

  // An open storefront, not a solid building cube, keeps the interior inspectable.
  box(group, [14.55, 0.28, 8.55], [-4.0, 0.16, -3.2], materials.wallDark);
  box(group, [14.25, 0.08, 8.25], [-4.0, 0.34, -3.2], materials.warmWhite, false);
  box(group, [14.5, 6.0, 0.22], [-4.0, 3.28, -7.43], materials.wall);
  box(group, [0.22, 6.0, 8.45], [-11.25, 3.28, -3.2], materials.wall);
  box(group, [0.22, 6.0, 3.25], [3.25, 3.28, -5.82], materials.wall);
  box(group, [0.22, 1.65, 4.95], [3.25, 5.42, -1.76], materials.wall);
  box(group, [14.55, 1.58, 0.22], [-4.0, 5.5, 1.02], materials.wall);
  box(group, [14.55, 0.44, 0.28], [-4.0, 0.53, 1.02], materials.mintDark);
  box(group, [14.85, 0.35, 8.8], [-4.0, 6.36, -3.18], materials.navy);
  box(group, [14.95, 0.18, 0.22], [-4.0, 6.63, 1.13], materials.mintDark);
  box(group, [14.95, 0.18, 0.22], [-4.0, 6.63, -7.5], materials.mintDark);
  box(group, [0.22, 0.18, 8.7], [-11.39, 6.63, -3.18], materials.mintDark);
  box(group, [0.22, 0.18, 8.7], [3.39, 6.63, -3.18], materials.mintDark);

  // Interior floor tile grid.
  const tilePoints = [];
  for (let x = -10.5; x <= 2.6; x += 0.72) {
    tilePoints.push(x, 0.385, -7.05, x, 0.385, 0.77);
  }
  for (let z = -7.0; z <= 0.75; z += 0.72) {
    tilePoints.push(-10.9, 0.385, z, 2.9, 0.385, z);
  }
  const tileGeometry = new THREE.BufferGeometry();
  tileGeometry.setAttribute('position', new THREE.Float32BufferAttribute(tilePoints, 3));
  group.add(new THREE.LineSegments(tileGeometry, new THREE.LineBasicMaterial({ color: 0xb4aa91, transparent: true, opacity: 0.28 })));

  buildInterior(group);

  // Broad glass windows with slender, readable frames.
  const windowCenters = [-9.55, -6.85, -4.15, -1.45];
  windowCenters.forEach((x) => {
    box(group, [2.59, 3.79, 0.045], [x, 2.45, 1.055], materials.glass, false).castShadow = false;
    box(group, [0.075, 3.92, 0.12], [x - 1.34, 2.45, 1.08], materials.darkMetal);
    box(group, [2.67, 0.07, 0.12], [x, 4.4, 1.08], materials.darkMetal);
    box(group, [2.67, 0.09, 0.12], [x, 0.52, 1.08], materials.darkMetal);
    box(group, [2.54, 0.16, 0.055], [x, 1.03, 1.1], materials.mint, false);
  });
  box(group, [0.075, 3.92, 0.12], [-0.1, 2.45, 1.08], materials.darkMetal);

  // Alley-side window reveals more of the interior from the initial three-quarter view.
  box(group, [0.045, 3.75, 4.7], [3.27, 2.45, -1.75], materials.glass, false).castShadow = false;
  [-4.12, -1.75, 0.62].forEach((z) => box(group, [0.12, 3.9, 0.075], [3.3, 2.45, z], materials.darkMetal));
  box(group, [0.12, 0.08, 4.82], [3.3, 4.4, -1.75], materials.darkMetal);
  box(group, [0.12, 0.12, 4.82], [3.3, 0.52, -1.75], materials.mintDark);

  const doorLeft = createDoor(0.56);
  const doorRight = createDoor(1.86);
  group.add(doorLeft, doorRight);
  box(group, [2.67, 0.18, 0.2], [1.21, 4.11, 1.1], materials.darkMetal);
  box(group, [0.38, 0.13, 0.16], [1.21, 4.02, 1.24], materials.rubber, false);
  plane(group, [2.35, 1.1], [1.21, 0.39, 1.92], textureMaterial(matTexture()));

  // Deep striped awning and the large backlit konbini sign.
  box(group, [14.95, 0.2, 1.55], [-4.0, 4.73, 1.72], materials.mint);
  for (let i = 0; i < 15; i += 1) {
    box(group, [0.48, 0.23, 0.08], [-10.96 + i * 0.995, 4.59, 2.5], i % 2 ? materials.warmWhite : materials.mint, false);
  }
  box(group, [15.05, 0.12, 0.12], [-4.0, 4.78, 2.5], materials.darkMetal);
  const signMaterial = textureMaterial(storeSignTexture());
  box(group, [14.7, 1.45, 0.28], [-4.0, 5.55, 1.22], emissive(0xe8f0cf, 0.6));
  plane(group, [14.38, 1.28], [-4.0, 5.55, 1.375], signMaterial, [0, 0, 0]);
  const storeGlow = new THREE.PointLight(0xb8e6c4, 28, 12, 2);
  storeGlow.position.set(-3.5, 4.7, 2.8);
  group.add(storeGlow);

  const projectingSign = new THREE.Group();
  projectingSign.position.set(3.65, 5.3, 0.8);
  box(projectingSign, [0.22, 2.15, 1.35], [0, 0, 0], materials.mintDark);
  const openTexture = textureMaterial(textTexture('24', 'OPEN  ·  あおい', {
    background: '#e9f0d5', color: '#2d7773', accent: '#e89661',
  }));
  plane(projectingSign, [1.16, 1.91], [0.121, 0, 0], openTexture, [0, Math.PI / 2, 0]);
  group.add(projectingSign);

  // Rooftop drainage, vents and condenser units strengthen the miniature silhouette.
  box(group, [2.2, 1.0, 1.4], [-7.7, 7.02, -4.8], materials.wallDark);
  cylinder(group, 0.45, 0.06, [-7.7, 7.55, -4.8], materials.darkMetal, 24);
  for (let i = 0; i < 5; i += 1) {
    box(group, [0.065, 0.6, 0.04], [-8.45 + i * 0.36, 7.0, -4.08], materials.metal, false);
  }
  box(group, [1.65, 0.75, 1.25], [-3.9, 6.91, -5.3], materials.metal);
  cylinder(group, 0.39, 0.08, [-3.9, 7.33, -5.3], materials.darkMetal, 24);
  beam(group, [-1.0, 6.5, -6.4], [-1.0, 8.15, -6.4], 0.09, materials.metal, 12);
  beam(group, [-2.1, 8.05, -6.4], [0.1, 8.05, -6.4], 0.035, materials.metal, 8);
  for (let i = 0; i < 6; i += 1) {
    beam(group, [-1.85 + i * 0.36, 8.05, -6.9], [-1.85 + i * 0.36, 8.05, -5.9], 0.018, materials.metal, 6);
  }
  beam(group, [3.45, 0.5, -6.8], [3.45, 6.7, -6.8], 0.1, materials.darkMetal, 10);
  beam(group, [3.45, 6.7, -6.8], [3.45, 6.7, 1.8], 0.1, materials.darkMetal, 10);

  return {
    update(time) {
      const phase = time % 17;
      const doorAmount = phase > 9 && phase < 14
        ? THREE.MathUtils.smoothstep(Math.sin(((phase - 9) / 5) * Math.PI), 0, 1)
        : 0;
      doorLeft.position.x = 0.56 - doorAmount * 0.93;
      doorRight.position.x = 1.86 + doorAmount * 0.93;
      const flickerPhase = time % 23;
      const brightness = flickerPhase > 22.55 ? 0.91 + Math.sin(time * 43) * 0.055 : 0.985 + Math.sin(time * 0.8) * 0.012;
      signMaterial.color.setRGB(brightness, brightness, brightness);
      storeGlow.intensity = 28 * brightness;
    },
  };
}
