import * as THREE from 'three';

const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const BOX_EDGES = new THREE.EdgesGeometry(UNIT_BOX);
const UNIT_CYLINDER = new THREE.CylinderGeometry(1, 1, 1, 10);
const OUTLINE = new THREE.LineBasicMaterial({ color: 0x162136, transparent: true, opacity: 0.72 });
const PALETTE = {
  ink: 0x17263a,
  midnight: 0x18283b,
  road: 0x30465d,
  blueRoad: 0x283f52,
  sidewalk: 0x8797a0,
  sidewalkDark: 0x566c7b,
  warmWhite: 0xf4ebd5,
  ivory: 0xdfded0,
  cream: 0xd4d5ca,
  wall: 0xabbac0,
  teal: 0x2b9b9f,
  neon: 0x84f0e9,
  amber: 0xffb974,
  coral: 0xee7c80,
};

const toonCache = new Map();
const basicCache = new Map();
function toon(color, emissive = 0x000000, intensity = 0) {
  const key = `${color}/${emissive}/${intensity}`;
  if (!toonCache.has(key)) {
    toonCache.set(key, new THREE.MeshToonMaterial({ color, emissive, emissiveIntensity: intensity }));
  }
  return toonCache.get(key);
}
function basic(color, opacity = 1) {
  const key = `${color}/${opacity}`;
  if (!basicCache.has(key)) {
    basicCache.set(key, new THREE.MeshBasicMaterial({ color, transparent: opacity < 1, opacity, depthWrite: opacity === 1 }));
  }
  return basicCache.get(key);
}
function box(parent, size, position, material, outlined = false) {
  const mesh = new THREE.Mesh(UNIT_BOX, material);
  mesh.position.set(...position);
  mesh.scale.set(...size);
  mesh.castShadow = size[1] > 0.2;
  mesh.receiveShadow = true;
  parent.add(mesh);
  if (outlined) {
    const edges = new THREE.LineSegments(BOX_EDGES, OUTLINE);
    edges.scale.setScalar(1.008);
    mesh.add(edges);
  }
  return mesh;
}
function cylinder(parent, radius, height, position, material, segments = 10) {
  const geometry = segments === 10 ? UNIT_CYLINDER : new THREE.CylinderGeometry(1, 1, 1, segments);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.scale.set(radius, height, radius);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function rod(parent, a, b, radius, material) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const mesh = new THREE.Mesh(UNIT_CYLINDER, material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), end.clone().sub(start).normalize());
  mesh.scale.set(radius, start.distanceTo(end), radius);
  mesh.castShadow = true;
  parent.add(mesh);
  return mesh;
}
function disk(parent, radius, position, material, segments = 32) {
  const mesh = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
  mesh.position.set(...position);
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}
function torus(parent, radius, tube, position, material, rotation = [0, 0, 0]) {
  const mesh = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 6, 24), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  parent.add(mesh);
  return mesh;
}
function texture(draw, width = 1024, height = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  draw(ctx, width, height);
  const result = new THREE.CanvasTexture(canvas);
  result.colorSpace = THREE.SRGBColorSpace;
  result.anisotropy = 8;
  return result;
}
function texturedPanel(parent, map, width, height, position, rotationY = 0, transparent = false) {
  const material = new THREE.MeshBasicMaterial({ map, transparent, side: THREE.DoubleSide, toneMapped: false });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  mesh.position.set(...position);
  mesh.rotation.y = rotationY;
  parent.add(mesh);
  return mesh;
}
function textPanel(parent, text, colors, width, height, position, fontSize = 120, rotationY = 0) {
  const map = texture((ctx, w, h) => {
    ctx.fillStyle = colors[0];
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = colors[1];
    ctx.font = `700 ${fontSize}px "Yu Gothic", "Meiryo", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = text.split('\n');
    const spacing = fontSize * 0.86;
    lines.forEach((line, index) => ctx.fillText(line, w / 2, h / 2 + 5 + (index - (lines.length - 1) / 2) * spacing));
  });
  return texturedPanel(parent, map, width, height, position, rotationY);
}

function lightPool(parent, color, width, depth, position, opacity) {
  const map = texture((ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 8, w / 2, h / 2, w * 0.48);
    gradient.addColorStop(0, 'rgba(255,255,255,0.75)');
    gradient.addColorStop(0.34, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }, 256, 256);
  const material = new THREE.MeshBasicMaterial({ map, color, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), material);
  mesh.position.set(...position);
  mesh.rotation.x = -Math.PI / 2;
  parent.add(mesh);
  return mesh;
}

function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0x8eb2d8, 0x273448, 0.95));
  const moon = new THREE.DirectionalLight(0x9dc4e4, 1.05);
  moon.position.set(-5, 13, 10);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -12;
  moon.shadow.camera.right = 12;
  moon.shadow.camera.top = 12;
  moon.shadow.camera.bottom = -12;
  moon.shadow.normalBias = 0.025;
  scene.add(moon);

  const warm = new THREE.PointLight(0xffbd82, 12, 11, 1.65);
  warm.position.set(-0.3, 3.9, -2.5);
  scene.add(warm);
  const storeFront = new THREE.PointLight(0xffd8ab, 5, 7, 1.6);
  storeFront.position.set(-0.8, 3.5, 1.4);
  scene.add(storeFront);
  const cyan = new THREE.PointLight(0x64d9ed, 9, 9, 1.8);
  cyan.position.set(4.8, 5.1, 0.5);
  scene.add(cyan);
  const pink = new THREE.PointLight(0xea72a2, 4, 7, 1.8);
  pink.position.set(-6, 3.5, 0.8);
  scene.add(pink);
}

function makeBase(root) {
  box(root, [16, 0.78, 16], [0, -0.48, 0], toon(0x172537), true);
  box(root, [16.12, 0.1, 16.12], [0, -0.83, 0], toon(0x304258), true);
  box(root, [15.88, 0.065, 15.88], [0, -0.055, 0], toon(0x445565));
  box(root, [16, 0.045, 5.5], [0, 0.005, 5.18], toon(PALETTE.road));
  box(root, [3.6, 0.047, 10.25], [6.15, 0.008, -2.83], toon(PALETTE.road));
  box(root, [10.45, 0.105, 10.18], [-1.93, 0.045, -2.8], toon(PALETTE.sidewalk));
  box(root, [1.7, 0.032, 9.4], [-5.94, 0.116, -2.92], toon(0x394a5a));
  box(root, [8.35, 0.16, 1.35], [-0.37, 0.13, 1.66], toon(0x9babb0));
  box(root, [0.59, 0.16, 10.1], [4.17, 0.13, -2.76], toon(0x9babb0));

  // Fine paving joints and the concrete edge make the model read as one cut-out block.
  for (let x = -6.8; x <= 3.8; x += 1.1) {
    box(root, [0.018, 0.005, 1.2], [x, 0.142, 1.65], basic(0x657987, 0.5));
  }
  for (let z = -7; z <= 1.3; z += 1.3) {
    box(root, [0.018, 0.004, 0.7], [4.17, 0.22, z], basic(0x657987, 0.5));
  }
  for (const x of [-7.5, 7.5]) for (const z of [-7.5, 7.5]) {
    cylinder(root, 0.12, 0.018, [x, -0.012, z], basic(0x9eabb5), 12);
  }
}

function makeSignTexture() {
  return texture((ctx, w, h) => {
    ctx.fillStyle = '#0b5367';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#e9f9e4';
    ctx.fillRect(0, 0, w, 22);
    ctx.fillStyle = '#eea361';
    ctx.fillRect(0, 22, w, 15);
    ctx.fillStyle = '#58d0ce';
    ctx.fillRect(0, h - 20, w, 20);
    ctx.fillStyle = '#fff6dd';
    ctx.textBaseline = 'middle';
    ctx.font = '700 142px "Yu Gothic", "Meiryo", sans-serif';
    ctx.fillText('小雨マート', 74, 144);
    ctx.font = '700 55px sans-serif';
    ctx.fillText('KOSAME MART', 74, 220);
    ctx.font = '700 78px sans-serif';
    ctx.fillText('24H', 820, 160);
  }, 1200, 280);
}

function makeStore(root, animations) {
  const store = new THREE.Group();
  root.add(store);
  const trim = toon(0x526675);
  const wall = toon(PALETTE.wall);
  const lightWall = toon(0xd5d5c8);
  const warm = basic(0xfff3d4);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xc0e9ed, transparent: true, opacity: 0.11, metalness: 0, roughness: 0.08, depthWrite: false, side: THREE.DoubleSide });

  box(store, [7.82, 0.16, 6.86], [-0.39, 0.23, -2.53], toon(0xbeb9a8), true);
  box(store, [7.82, 0.07, 6.86], [-0.39, 0.33, -2.53], toon(0xddd1b8));
  box(store, [7.8, 4.9, 0.19], [-0.39, 2.78, -5.93], lightWall, true);
  box(store, [0.2, 4.9, 6.85], [-4.3, 2.78, -2.53], wall, true);
  box(store, [0.2, 4.9, 6.85], [3.53, 2.78, -2.53], wall, true);
  box(store, [8.1, 0.25, 7.12], [-0.39, 5.28, -2.53], toon(0x2d4858), true);
  box(store, [8.4, 0.12, 7.42], [-0.39, 5.47, -2.53], toon(0x566d78), true);
  box(store, [7.95, 0.06, 0.92], [-0.39, 4.02, 1.15], toon(0x25495a), true);
  box(store, [7.95, 0.07, 0.10], [-0.39, 3.97, 1.59], basic(0x5ce2d6));
  box(store, [7.95, 0.1, 0.12], [-0.39, 4.19, 1.59], toon(0xe6ecdd));

  box(store, [8.1, 1.1, 0.22], [-0.39, 4.67, 1.02], toon(0x0c5669), true);
  texturedPanel(store, makeSignTexture(), 7.75, 0.88, [-0.39, 4.67, 1.142]);
  const signGlow = box(store, [7.55, 0.025, 0.025], [-0.39, 4.08, 1.62], new THREE.MeshBasicMaterial({ color: 0x9affed, transparent: true, opacity: 0.9 }));
  animations.sign = signGlow;

  // The facade is mostly real transparent panes so shelves remain readable while orbiting.
  box(store, [0.13, 3.6, 0.15], [-4.1, 2.16, 0.92], trim);
  box(store, [0.13, 3.6, 0.15], [-1.65, 2.16, 0.92], trim);
  box(store, [0.13, 3.6, 0.15], [0.89, 2.16, 0.92], trim);
  box(store, [0.13, 3.6, 0.15], [3.35, 2.16, 0.92], trim);
  box(store, [7.55, 0.08, 0.16], [-0.39, 3.98, 0.92], trim);
  box(store, [7.55, 0.11, 0.17], [-0.39, 0.38, 0.92], trim);
  box(store, [5.05, 0.052, 0.09], [-1.6, 2.2, 0.98], trim);
  for (const [x, width] of [[-2.88, 2.33], [-0.38, 2.43]]) {
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(width, 3.45), glass);
    pane.position.set(x, 2.17, 0.985);
    store.add(pane);
    box(store, [0.065, 2.95, 0.02], [x - width * 0.32, 2.25, 1.003], basic(0xc8fbff, 0.16));
  }

  const doorGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.94, 3.39), glass);
  const leftDoor = new THREE.Group();
  leftDoor.position.set(1.45, 0, 0);
  leftDoor.add(doorGlass);
  doorGlass.position.set(0.47, 2.16, 0.992);
  box(leftDoor, [0.055, 3.43, 0.09], [0.04, 2.16, 0.99], trim);
  box(leftDoor, [0.055, 3.43, 0.09], [0.93, 2.16, 0.99], trim);
  box(leftDoor, [0.93, 0.045, 0.09], [0.47, 2.5, 0.99], trim);
  box(leftDoor, [0.045, 0.6, 0.07], [0.84, 1.87, 1.06], basic(0xeafdf6));
  store.add(leftDoor);
  const rightDoor = leftDoor.clone(true);
  rightDoor.position.set(2.37, 0, 0);
  store.add(rightDoor);
  animations.doors = [leftDoor, rightDoor];
  box(store, [1.96, 0.12, 0.4], [2.39, 3.98, 0.98], trim);
  box(store, [1.9, 0.08, 0.42], [2.39, 0.43, 0.99], trim);
  box(store, [2.15, 0.025, 0.68], [2.4, 0.242, 1.47], toon(0x37505a), true);
  for (let i = 0; i < 4; i++) box(store, [1.85, 0.008, 0.07], [2.4, 0.257, 1.22 + i * 0.17], basic(0x769a9c));

  // Warm ceiling panels and painted interior guides.
  for (const x of [-2.8, -0.55, 1.7]) {
    box(store, [1.75, 0.055, 0.32], [x, 4.93, -1.55], warm);
    box(store, [1.75, 0.055, 0.32], [x, 4.93, -4.05], warm);
  }
  for (let z = -4.8; z <= -0.1; z += 0.72) {
    box(store, [0.1, 0.008, 0.38], [0.83, 0.375, z], basic(0xd8ad68, 0.86));
  }
  box(store, [1.2, 0.009, 0.12], [1.68, 0.376, -0.03], basic(0xd8ad68));
  box(store, [0.12, 0.009, 0.52], [1.09, 0.376, -0.29], basic(0xd8ad68));
  box(store, [0.12, 0.009, 0.52], [2.27, 0.376, -0.29], basic(0xd8ad68));
  return store;
}

function makeGoods(parent) {
  const colors = [0xe07e78, 0x6bbcc3, 0xe7b56d, 0xa7ba83, 0xd6a5c9, 0xe9e0b6, 0x7797c1, 0xb1d5c6];
  const instances = colors.map(() => []);
  return {
    add(x, y, z, width, height, depth, colorIndex) {
      instances[colorIndex % colors.length].push([x, y, z, width, height, depth]);
    },
    finish() {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      const scale = new THREE.Vector3();
      const rotation = new THREE.Quaternion();
      instances.forEach((items, index) => {
        if (!items.length) return;
        const mesh = new THREE.InstancedMesh(UNIT_BOX, toon(colors[index]), items.length);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        items.forEach(([x, y, z, w, h, d], i) => {
          position.set(x, y, z);
          scale.set(w, h, d);
          matrix.compose(position, rotation, scale);
          mesh.setMatrixAt(i, matrix);
        });
        mesh.instanceMatrix.needsUpdate = true;
        parent.add(mesh);
      });
    },
  };
}

function stockShelf(parent, goods, center, width, depth, height = 1.65, levels = 3) {
  const [x, z] = center;
  const frame = toon(0xe3dcd0);
  const edge = toon(0x798996);
  for (const px of [x - width / 2 + 0.045, x + width / 2 - 0.045]) {
    for (const pz of [z - depth / 2 + 0.04, z + depth / 2 - 0.04]) {
      box(parent, [0.075, height, 0.075], [px, 0.38 + height / 2, pz], edge);
    }
  }
  for (let level = 0; level < levels; level++) {
    const shelfY = 0.54 + level * (height - 0.18) / levels;
    box(parent, [width, 0.065, depth], [x, shelfY, z], frame, true);
    box(parent, [width, 0.05, 0.055], [x, shelfY + 0.055, z + depth / 2], toon(0x5a9ba4));
    const count = Math.floor((width - 0.18) / 0.21);
    for (let row = 0; row < 2; row++) {
      for (let i = 0; i < count; i++) {
        const colorIndex = (i * 3 + level * 2 + row + Math.round((x + 4) * 3)) % 8;
        const h = 0.22 + (i % 3) * 0.04;
        goods.add(x - width / 2 + 0.16 + i * 0.21, shelfY + h / 2 + 0.045, z + (row ? -0.14 : 0.14), 0.155, h, 0.125, colorIndex);
      }
    }
  }
}

function makeFridges(parent, goods) {
  const white = toon(0xe4e4d8);
  const fridgeGlass = new THREE.MeshPhysicalMaterial({ color: 0x96d5db, transparent: true, opacity: 0.2, roughness: 0.07, metalness: 0.14, depthWrite: false });
  for (let k = 0; k < 4; k++) {
    const x = -3.63 + k * 1.03;
    box(parent, [0.99, 3.55, 0.55], [x, 2.2, -5.48], white, true);
    box(parent, [0.79, 3.15, 0.035], [x, 2.25, -5.163], toon(0x426b79));
    for (let level = 0; level < 4; level++) {
      const y = 0.91 + level * 0.74;
      box(parent, [0.76, 0.025, 0.32], [x, y, -5.1], basic(0xc3f5f2));
      for (let i = 0; i < 4; i++) {
        goods.add(x - 0.27 + i * 0.18, y + 0.22, -5.05, 0.12, 0.37, 0.16, i + k + level);
      }
    }
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(0.78, 3.1), fridgeGlass);
    pane.position.set(x, 2.28, -4.86);
    parent.add(pane);
    box(parent, [0.045, 2.95, 0.07], [x + 0.32, 2.26, -4.81], basic(0xeafaf0));
    box(parent, [0.79, 0.045, 0.045], [x, 3.84, -4.82], basic(0xcdfdff));
  }
  textPanel(parent, 'DRINKS  •  飲み物', ['#35616f', '#f6f1dc'], 4.1, 0.31, [-2.1, 4.08, -4.82], 70);
}

function makeInterior(store) {
  const goods = makeGoods(store);
  makeFridges(store, goods);
  stockShelf(store, goods, [-2.85, -2.88], 1.45, 0.73, 1.62, 3);
  stockShelf(store, goods, [-0.9, -2.88], 1.45, 0.73, 1.62, 3);
  stockShelf(store, goods, [-2.8, -4.23], 1.55, 0.65, 1.5, 3);
  stockShelf(store, goods, [-0.8, -4.23], 1.55, 0.65, 1.5, 3);
  stockShelf(store, goods, [-2.75, -0.68], 1.8, 0.55, 1.2, 2);

  // Bento and onigiri case behind the broad left window.
  box(store, [1.35, 1.0, 0.62], [-3.38, 0.82, -0.48], toon(0xf2eee0), true);
  box(store, [1.22, 0.05, 0.58], [-3.38, 1.3, -0.48], basic(0xb8e8e3));
  for (let i = 0; i < 5; i++) {
    goods.add(-3.92 + i * 0.27, 1.36, -0.22, 0.21, 0.075, 0.17, i + 2);
    goods.add(-3.92 + i * 0.27, 1.36, -0.65, 0.21, 0.075, 0.17, i + 5);
  }
  textPanel(store, 'お弁当 · おにぎり', ['#e5c997', '#3d5261'], 1.2, 0.22, [-3.38, 0.9, -0.137], 76);

  // Low freezer has a glazed lid and small meal packages visible from above.
  box(store, [1.3, 0.85, 1.25], [-3.44, 0.78, -4.1], toon(0xe6e7dc), true);
  box(store, [1.15, 0.035, 1.07], [-3.44, 1.22, -4.1], basic(0x86c7d7, 0.58));
  for (let i = 0; i < 4; i++) for (let row = 0; row < 2; row++) {
    goods.add(-3.86 + i * 0.26, 1.24, -4.39 + row * 0.5, 0.2, 0.035, 0.36, i + row + 1);
  }

  // Checkout and coffee corner occupy the right side, leaving an open sightline into the aisles.
  box(store, [1.45, 0.94, 0.7], [2.47, 0.84, -1.13], toon(0xd4e3dd), true);
  box(store, [1.52, 0.08, 0.76], [2.47, 1.34, -1.13], toon(0x4e7380), true);
  box(store, [0.43, 0.13, 0.35], [2.23, 1.48, -1.28], toon(0x263b4c), true);
  box(store, [0.33, 0.29, 0.1], [2.23, 1.69, -1.46], basic(0xb2ebca));
  box(store, [0.32, 0.15, 0.28], [2.85, 1.49, -0.98], toon(0xd0c7b2));
  box(store, [0.64, 0.82, 0.54], [2.8, 0.78, -2.5], toon(0x364b5b), true);
  box(store, [0.5, 0.34, 0.035], [2.8, 0.96, -2.205], basic(0x557a86));
  for (let i = 0; i < 3; i++) cylinder(store, 0.07, 0.12, [2.58 + i * 0.2, 1.27, -2.36], basic(0xeee1c3), 12);
  textPanel(store, 'COFFEE', ['#303f4b', '#fbebcc'], 0.62, 0.14, [2.8, 1.47, -2.19], 74);

  // Small oden warmer with visible skewer shapes.
  box(store, [0.92, 0.76, 0.63], [1.46, 0.76, -2.56], toon(0xe7e4d8), true);
  box(store, [0.85, 0.08, 0.6], [1.46, 1.18, -2.56], toon(0x344c5b), true);
  for (let i = 0; i < 4; i++) {
    cylinder(store, 0.08, 0.055, [1.15 + i * 0.2, 1.25, -2.55], basic(0xd9b88c), 8);
    rod(store, [1.15 + i * 0.2, 1.27, -2.55], [1.15 + i * 0.2, 1.65, -2.61], 0.013, basic(0xc6a16b));
  }
  box(store, [0.73, 0.38, 0.035], [1.46, 1.5, -2.22], basic(0xe6faf4, 0.17));

  // Magazine rack, promo board, back-room door and high interior lightbox.
  box(store, [0.86, 1.16, 0.38], [3.03, 0.94, -4.05], toon(0x8eacb0), true);
  for (let i = 0; i < 4; i++) {
    box(store, [0.65, 0.04, 0.19], [3.03, 0.6 + i * 0.27, -3.82], toon(0xe9e4d4));
    for (let j = 0; j < 3; j++) goods.add(2.8 + j * 0.22, 0.73 + i * 0.27, -3.8, 0.19, 0.23, 0.035, i + j);
  }
  box(store, [1.15, 2.42, 0.06], [2.39, 1.7, -5.79], toon(0x647b82), true);
  box(store, [0.07, 0.28, 0.08], [2.79, 1.64, -5.72], basic(0xe9eddf));
  textPanel(store, 'STAFF ONLY', ['#d4e0d8', '#3e5965'], 0.88, 0.22, [2.39, 2.2, -5.72], 72);
  textPanel(store, '今週のおすすめ', ['#df8c75', '#fff4d9'], 1.37, 0.32, [1.48, 3.58, -5.77], 88);
  textPanel(store, 'ほっと一息', ['#efc185', '#4e5b64'], 0.92, 0.6, [-3.64, 3.6, -5.79], 86);
  textPanel(store, 'あたたかい おでん', ['#e9d3a4', '#46565c'], 1.45, 0.32, [1.15, 3.55, -0.43], 80);
  goods.finish();
}

function roadStripe(root, size, position, color = 0xc3d0ce, opacity = 0.76) {
  return box(root, size, position, basic(color, opacity));
}

function makeRoad(root, animations) {
  // The front and right lanes meet at a deliberately legible right angle.
  for (let i = 0; i < 7; i++) {
    roadStripe(root, [2.42, 0.009, 0.32], [-5.22, 0.049, 2.97 + i * 0.62], 0xe5e3d7, 0.82);
  }
  lightPool(root, 0xffbd82, 6.4, 5.2, [-0.55, 0.047, 2.83], 0.5);
  lightPool(root, 0x6ce2e4, 5.2, 4.6, [3.65, 0.049, 2.35], 0.34);
  lightPool(root, 0xffc69a, 4.4, 5.4, [6.05, 0.052, -2.35], 0.27);
  for (let i = 0; i < 5; i++) {
    roadStripe(root, [2.72, 0.009, 0.25], [6.13, 0.049, -0.18 + i * 0.52], 0xe2e6df, 0.76);
  }
  for (let x = -1.2; x < 3.8; x += 1.5) {
    roadStripe(root, [0.75, 0.007, 0.055], [x, 0.047, 5.7], 0xb4c7c5, 0.45);
  }
  roadStripe(root, [0.052, 0.009, 3.25], [-0.9, 0.052, 5.75]);
  roadStripe(root, [0.052, 0.009, 3.25], [2.95, 0.052, 5.75]);
  roadStripe(root, [3.9, 0.009, 0.055], [1.0, 0.053, 4.12]);
  textPanel(root, 'P', ['#263b4f', '#d3e3dc'], 0.72, 0.72, [1.06, 0.061, 5.95], 178).rotation.x = -Math.PI / 2;
  for (let z = -6.3; z <= -2.5; z += 1.38) {
    roadStripe(root, [0.055, 0.009, 0.72], [6.15, 0.052, z], 0xb3c4c3, 0.42);
  }

  // Drainage channel and individually slotted covers along the curb.
  box(root, [10.05, 0.038, 0.21], [-0.95, 0.068, 2.4], toon(0x435967));
  for (let x = -5.82; x < 3.9; x += 0.37) {
    box(root, [0.23, 0.009, 0.045], [x, 0.092, 2.4], basic(0x9cafae));
  }
  box(root, [0.2, 0.039, 7.9], [4.54, 0.061, -3.55], toon(0x435967));
  for (let z = -7.3; z < 0.3; z += 0.4) {
    box(root, [0.045, 0.009, 0.22], [4.54, 0.087, z], basic(0x9cafae));
  }

  // Soft elongated light marks are visible inside translucent pools, like an anime rain painting.
  const poolMap = texture((ctx, w, h) => {
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.49);
    gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }, 256, 256);
  const puddleMat = new THREE.MeshBasicMaterial({ map: poolMap, color: 0x76b9c9, transparent: true, opacity: 0.28, depthWrite: false });
  const puddles = [
    [-2.1, 4.17, 1.25, 0.46], [1.45, 3.35, 1.3, 0.45], [2.35, 6.22, 0.92, 0.35],
    [-6.18, 5.75, 0.8, 0.35], [6.08, -3.48, 0.75, 1.27], [6.82, -6.14, 0.53, 0.85],
    [6.16, 1.89, 0.82, 0.33], [-6.1, -2.4, 0.35, 0.74],
  ];
  for (const [x, z, rx, rz] of puddles) {
    const pool = disk(root, 1, [x, 0.057, z], puddleMat, 40);
    pool.scale.set(rx, rz, 1);
    const shine = disk(root, 1, [x - rx * 0.1, 0.059, z + rz * 0.08], basic(0x8ce9ea, 0.075), 40);
    shine.scale.set(rx * 0.65, rz * 0.45, 1);
  }
  const reflectionMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x68eff0, transparent: true, opacity: 0.23, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: 0xffbd8e, transparent: true, opacity: 0.18, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: 0xe67da4, transparent: true, opacity: 0.16, depthWrite: false }),
  ];
  for (let i = 0; i < 13; i++) {
    const x = -3.6 + i * 0.56;
    const z = 3.3 + (i % 4) * 0.59;
    const material = reflectionMaterials[i % reflectionMaterials.length];
    const streak = box(root, [0.07 + (i % 3) * 0.08, 0.006, 0.72 + (i % 4) * 0.36], [x, 0.065, z], material);
    streak.rotation.y = -0.11;
    animations.reflections.push(streak);
  }
  for (let i = 0; i < 7; i++) {
    box(root, [0.065 + (i % 2) * 0.07, 0.006, 0.65 + i * 0.13], [6.15 + Math.sin(i * 1.7) * 0.55, 0.065, -1.3 - i * 0.7], reflectionMaterials[i % 3]);
  }
  cylinder(root, 0.44, 0.012, [2.5, 0.059, 6.65], toon(0x536978), 24);
  torus(root, 0.34, 0.014, [2.5, 0.069, 6.65], basic(0x9eafb0), [-Math.PI / 2, 0, 0]);
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    rod(root, [2.5, 0.074, 6.65], [2.5 + Math.cos(angle) * 0.3, 0.074, 6.65 + Math.sin(angle) * 0.3], 0.01, basic(0x9eafb0));
  }
}

function makeAlley(root) {
  const wall = toon(0x627482);
  box(root, [0.38, 3.45, 8.1], [-7.18, 1.84, -3.55], wall, true);
  box(root, [0.44, 0.18, 8.2], [-7.18, 3.6, -3.55], toon(0x324b60));
  box(root, [1.6, 0.021, 0.1], [-5.93, 0.151, 0.5], basic(0x7f9a9d, 0.5));
  for (let z = -6.9; z <= 0.4; z += 0.83) {
    box(root, [1.46, 0.009, 0.026], [-5.96, 0.14, z], basic(0x7e9299, 0.5));
  }
  textPanel(root, '小路  →', ['#d6ddd2', '#3b5966'], 1.13, 0.3, [-7.04, 2.81, -0.3], 82, Math.PI / 2);
  textPanel(root, '雨の日も、いつもの街。', ['#c7c8b5', '#566577'], 1.34, 0.61, [-6.96, 1.77, -3.5], 59, Math.PI / 2);
  box(root, [0.07, 0.09, 7.77], [-7.392, 0.67, -3.55], toon(0x758c92));
  for (const [z, title, bg] of [[-5.66, '夜の散歩', '#d0b9af'], [-3.75, '雨宿り', '#bfd9d1'], [-1.84, '街角便り', '#e2d1ad']]) {
    box(root, [0.06, 1.38, 1.48], [-7.403, 1.96, z], toon(0x708591), true);
    textPanel(root, title, [bg, '#314b5e'], 1.33, 1.17, [-7.439, 1.96, z], 100, -Math.PI / 2);
    box(root, [0.065, 0.04, 1.25], [-7.449, 1.52, z], basic(0xf4ead8, 0.75));
  }
  box(root, [0.06, 1.57, 1.2], [-6.92, 1.69, -5.4], toon(0x3d5565));
  for (let i = 0; i < 3; i++) {
    box(root, [0.07, 0.034, 0.24], [-6.87, 1.32 + i * 0.25, -5.7 + i * 0.28], basic(i === 1 ? 0xe8b17a : 0x95bcc0));
  }
  const backLight = new THREE.PointLight(0x78a3c9, 3, 4);
  backLight.position.set(-5.8, 2.9, -6.4);
  root.add(backLight);
  box(root, [0.62, 0.035, 0.18], [-5.9, 2.87, -6.55], basic(0xb7d9e2));
}

function makeVendingMachine(root) {
  const group = new THREE.Group();
  group.position.set(-4.85, 0.18, 0.19);
  root.add(group);
  box(group, [0.78, 2.38, 0.62], [0, 1.19, 0], toon(0xc44f62), true);
  box(group, [0.62, 1.43, 0.035], [0, 1.52, 0.33], toon(0x253e53), true);
  for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) {
    cylinder(group, 0.053, 0.17, [-0.24 + col * 0.16, 1.01 + row * 0.32, 0.354], basic([0xf6d1ae, 0x8ed4d5, 0xb5cce5, 0xe7a6aa][(row + col) % 4]), 8);
  }
  box(group, [0.62, 0.018, 0.06], [0, 2.22, 0.36], basic(0xf7e7d5));
  box(group, [0.23, 0.24, 0.04], [0.17, 0.64, 0.335], basic(0xf5dfc3));
  box(group, [0.55, 0.13, 0.03], [0, 0.31, 0.337], basic(0x263849));
  textPanel(group, 'HOT  •  COLD', ['#c44f62', '#fff0d9'], 0.63, 0.18, [0, 2.3, 0.345], 78);
  const glow = new THREE.PointLight(0xf08caa, 3, 3.5);
  glow.position.set(-0.2, 1.8, 0.8);
  group.add(glow);
}

function makeBicycle(root) {
  const bicycle = new THREE.Group();
  bicycle.position.set(-5.76, 0.16, 1.63);
  bicycle.rotation.y = -0.28;
  root.add(bicycle);
  const metal = toon(0x385567);
  const rubber = toon(0x1c2b3a);
  for (const x of [-0.59, 0.58]) {
    torus(bicycle, 0.43, 0.045, [x, 0.45, 0], rubber);
    torus(bicycle, 0.33, 0.012, [x, 0.45, 0], basic(0xb5b8ac));
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      rod(bicycle, [x, 0.45, 0], [x + 0.32 * Math.cos(angle), 0.45 + 0.32 * Math.sin(angle), 0], 0.008, basic(0x9ea8a8));
    }
  }
  rod(bicycle, [-0.59, 0.45, 0], [-0.14, 1.12, 0], 0.034, metal);
  rod(bicycle, [-0.14, 1.12, 0], [0.29, 0.46, 0], 0.034, metal);
  rod(bicycle, [0.29, 0.46, 0], [-0.59, 0.45, 0], 0.034, metal);
  rod(bicycle, [0.29, 0.46, 0], [0.58, 0.45, 0], 0.034, metal);
  rod(bicycle, [-0.14, 1.12, 0], [0.31, 1.1, 0], 0.034, metal);
  rod(bicycle, [0.31, 1.1, 0], [0.58, 0.45, 0], 0.034, metal);
  rod(bicycle, [0.27, 1.08, 0], [0.35, 1.48, 0], 0.026, metal);
  rod(bicycle, [0.15, 1.48, 0], [0.57, 1.48, 0], 0.026, metal);
  box(bicycle, [0.42, 0.075, 0.18], [-0.17, 1.16, 0], toon(0x222f3a));
  box(bicycle, [0.34, 0.12, 0.3], [0.48, 1.36, 0], toon(0xb3a183), true);
  rod(bicycle, [-0.2, 1.03, 0], [-0.58, 0.43, -0.3], 0.025, basic(0x7b8e95));
}

function cable(parent, points, color = 0x263d4f) {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.018, 4, false), basic(color));
  parent.add(mesh);
  return mesh;
}

function makeStreetProps(root, animations) {
  makeAlley(root);
  makeVendingMachine(root);
  makeBicycle(root);
  const metal = toon(0x5c7280);
  const dark = toon(0x2b4252);

  // Side facade breaks up the blank wall seen from the street turn.
  box(root, [0.038, 0.14, 6.57], [3.665, 3.44, -2.53], toon(0x0b6470));
  box(root, [0.041, 0.065, 6.57], [3.67, 3.33, -2.53], basic(0xd5e5ce));
  box(root, [0.05, 0.13, 6.57], [3.67, 0.76, -2.53], toon(0x7c9398));
  for (const z of [-1.17, -4.95]) {
    box(root, [0.055, 1.55, 1.31], [3.685, 2.16, z], toon(0x395b69), true);
    box(root, [0.059, 1.37, 1.12], [3.723, 2.16, z], basic(0x8dbac1, 0.78));
    box(root, [0.068, 0.052, 1.23], [3.735, 2.12, z], basic(0xc8e1de));
    box(root, [0.07, 1.43, 0.055], [3.735, 2.16, z], basic(0xc8e1de));
    box(root, [0.069, 0.018, 0.85], [3.75, 2.53, z], basic(0xffffff, 0.34));
  }
  textPanel(root, '小雨マート  •  24H', ['#0b5367', '#f4f2d9'], 2.65, 0.37, [3.724, 4.25, -2.62], 70, Math.PI / 2);
  textPanel(root, 'あたたかいお弁当', ['#e8c58a', '#496374'], 1.65, 0.45, [3.746, 1.3, -2.53], 74, Math.PI / 2);
  rod(root, [3.82, 4.0, 0.72], [3.82, 0.23, 0.72], 0.045, metal);
  rod(root, [3.82, 0.24, 0.72], [4.2, 0.18, 0.72], 0.045, metal);

  // The rear is a compact service elevation, visible when the model is turned over.
  box(root, [1.34, 2.52, 0.075], [-2.45, 1.66, -6.055], toon(0x667c83), true);
  box(root, [1.17, 2.3, 0.079], [-2.45, 1.62, -6.102], toon(0x9dafa9), true);
  box(root, [0.08, 0.2, 0.07], [-1.99, 1.54, -6.16], basic(0xf4ebd2));
  box(root, [1.55, 0.12, 0.45], [-2.45, 0.28, -6.34], toon(0x788d91), true);
  textPanel(root, '従業員入口', ['#526b75', '#f5ead4'], 1.14, 0.26, [-2.45, 3.14, -6.09], 78, Math.PI);
  box(root, [2.08, 1.67, 0.07], [0.42, 1.7, -6.075], toon(0xa7b8b6), true);
  for (let i = 0; i < 8; i++) box(root, [1.88, 0.034, 0.075], [0.42, 1.03 + i * 0.19, -6.12], toon(0x728a91));
  box(root, [2.23, 0.19, 0.16], [0.42, 2.62, -6.02], toon(0x3d6170), true);
  box(root, [0.5, 0.7, 0.1], [2.45, 2.42, -6.07], toon(0x6b8892), true);
  for (let i = 0; i < 6; i++) box(root, [0.37, 0.025, 0.115], [2.45, 2.15 + i * 0.1, -6.14], basic(0xc6d9d5));
  rod(root, [3.15, 4.96, -6.13], [3.15, 0.28, -6.13], 0.046, toon(0x607e88));
  rod(root, [3.15, 2.16, -6.13], [2.84, 2.16, -6.13], 0.041, toon(0x607e88));
  for (const [x, z] of [[-0.85, -6.72], [-0.28, -6.76], [2.35, -6.76]]) {
    box(root, [0.48, 0.43, 0.48], [x, 0.34, z], toon(0x797867), true);
    box(root, [0.5, 0.06, 0.51], [x, 0.58, z], toon(0x9a9377));
    for (let j = 0; j < 3; j++) box(root, [0.04, 0.27, 0.05], [x - 0.13 + j * 0.13, 0.35, z - 0.27], toon(0xb7a888));
  }

  // Roadside light gives the street its characteristic warm pool.
  cylinder(root, 0.075, 5.7, [6.95, 2.95, -2.5], metal);
  rod(root, [6.95, 5.6, -2.5], [6.22, 5.76, -2.5], 0.055, metal);
  box(root, [0.82, 0.15, 0.49], [6.12, 5.73, -2.5], toon(0x374e5d), true);
  box(root, [0.7, 0.029, 0.39], [6.12, 5.63, -2.5], basic(0xffd3a1));
  const lamp = new THREE.PointLight(0xffd0a0, 6, 7, 1.8);
  lamp.position.set(6.12, 5.48, -2.5);
  root.add(lamp);
  cylinder(root, 0.2, 0.13, [6.95, 0.13, -2.5], dark);

  // Utility pole, transformer and sagging wires are all contained over the base.
  cylinder(root, 0.13, 7.38, [-6.75, 3.78, -6.65], toon(0x536879), 12);
  cylinder(root, 0.22, 0.17, [-6.75, 0.18, -6.65], dark);
  rod(root, [-7.45, 6.35, -6.65], [-6.05, 6.35, -6.65], 0.055, dark);
  for (const x of [-7.34, -6.2]) cylinder(root, 0.045, 0.23, [x, 6.57, -6.65], basic(0x9db5b6));
  box(root, [0.48, 0.65, 0.35], [-6.75, 5.16, -6.65], toon(0x798f97), true);
  for (const offset of [-0.13, 0, 0.13]) {
    cable(root, [[-6.75 + offset, 6.54, -6.65], [-2.8 + offset, 5.48, -7.08], [1.2 + offset, 6.02, -6.75], [5.8 + offset, 5.63, -6.57]]);
  }
  cable(root, [[-6.66, 5.1, -6.59], [-4.7, 4.55, -6.21], [-3.65, 4.9, -5.77]], 0x354a58);

  // Guardrail, traffic sign and distant three-light signal define the corner.
  for (const z of [-5.5, -4.2, -2.9, -1.6]) {
    cylinder(root, 0.06, 0.85, [4.86, 0.6, z], metal);
    cylinder(root, 0.095, 0.07, [4.86, 1.03, z], basic(0xadc4c1), 12);
  }
  for (let i = 0; i < 3; i++) {
    rod(root, [4.86, 0.79, -5.5 + i * 1.3], [4.86, 0.79, -4.2 + i * 1.3], 0.045, metal);
  }
  cylinder(root, 0.055, 3.62, [7.19, 1.9, 1.32], metal);
  box(root, [0.62, 0.6, 0.045], [7.19, 3.21, 1.34], toon(0x376f83), true);
  textPanel(root, '止まれ', ['#376f83', '#f6f6e2'], 0.54, 0.43, [7.19, 3.22, 1.374], 90);
  cylinder(root, 0.07, 4.85, [6.77, 2.52, -6.03], dark);
  rod(root, [6.77, 4.92, -6.03], [6.05, 4.92, -6.03], 0.06, dark);
  box(root, [0.36, 1.2, 0.3], [5.94, 4.7, -5.99], toon(0x233849), true);
  animations.traffic = [];
  for (let i = 0; i < 3; i++) {
    const bulb = disk(root, 0.11, [5.94, 5.04 - i * 0.33, -5.82], new THREE.MeshBasicMaterial({ color: [0xf17973, 0xe9ba66, 0x84d9b2][i], transparent: true, opacity: 0.26 }), 20);
    bulb.rotation.x = 0;
    animations.traffic.push(bulb);
  }

  // Umbrellas, bins and a freestanding neighborhood poster board.
  cylinder(root, 0.23, 0.47, [3.84, 0.43, 1.58], toon(0x566a77), 12);
  cylinder(root, 0.27, 0.065, [3.84, 0.66, 1.58], toon(0x324b5c), 12);
  for (let i = 0; i < 4; i++) {
    const x = 3.7 + (i % 2) * 0.17;
    const z = 1.45 + Math.floor(i / 2) * 0.18;
    rod(root, [x, 0.66, z], [x, 1.61 + (i % 2) * 0.12, z], 0.017, basic(0xcad1cb));
    const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 8), toon([0xc9d5cf, 0x7fb4bd, 0xeab5ad, 0xd7b780][i]));
    canopy.position.set(x, 1.57 + (i % 2) * 0.12, z);
    root.add(canopy);
  }
  for (let i = 0; i < 2; i++) {
    const x = 4.04;
    const z = -4.7 + i * 0.76;
    cylinder(root, 0.28, 0.83, [x, 0.54, z], toon(i ? 0x7b9b91 : 0x587b8d), 10);
    cylinder(root, 0.31, 0.075, [x, 0.97, z], toon(0x354f5f), 10);
    box(root, [0.18, 0.13, 0.02], [x, 0.65, z + 0.27], basic(0xcbded9));
  }
  box(root, [0.95, 0.06, 0.7], [-2.75, 0.2, 1.69], toon(0x50697a));
  rod(root, [-3.2, 0.22, 1.48], [-2.99, 1.36, 1.48], 0.03, metal);
  rod(root, [-2.3, 0.22, 1.48], [-2.51, 1.36, 1.48], 0.03, metal);
  box(root, [0.94, 1.06, 0.055], [-2.75, 0.88, 1.48], toon(0xa4b5b4), true);
  textPanel(root, '今夜も営業中\n24 HOURS', ['#d8e7dc', '#4b6b74'], 0.8, 0.8, [-2.75, 0.9, 1.52], 68);

  // External AC condenser and roof equipment add convincing back-of-store details.
  box(root, [0.52, 0.92, 1.1], [3.88, 2.09, -3.66], toon(0xbccbd0), true);
  torus(root, 0.32, 0.025, [4.17, 2.1, -3.66], toon(0x657c89), [0, Math.PI / 2, 0]);
  for (let i = 0; i < 8; i++) {
    const angle = i * Math.PI / 4;
    rod(root, [4.19, 2.1, -3.66], [4.19, 2.1 + Math.cos(angle) * 0.3, -3.66 + Math.sin(angle) * 0.3], 0.01, basic(0x728d97));
  }
  rod(root, [3.66, 2.2, -4.4], [4.35, 1.55, -4.42], 0.03, basic(0x768b8d));
  box(root, [1.2, 0.64, 0.7], [1.7, 5.86, -3.75], toon(0x738e98), true);
  for (let i = 0; i < 6; i++) box(root, [0.045, 0.28, 0.62], [1.23 + i * 0.18, 5.86, -3.75], toon(0xa6bdc0));
  rod(root, [2.3, 5.82, -3.75], [3.1, 5.55, -4.18], 0.034, metal);
  box(root, [0.55, 0.42, 0.52], [-2.95, 5.78, -3.9], toon(0x527183), true);
  for (let x = -4.3; x < 3.5; x += 1.3) {
    box(root, [0.09, 0.12, 0.2], [x, 5.56, 1.02], toon(0x425e70));
  }
}

function makeWeather(root, animations) {
  const count = 1050;
  const rainPositions = new Float32Array(count * 6);
  const rainSeeds = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    rainSeeds[i * 4] = -7.05 + Math.random() * 14.1;
    rainSeeds[i * 4 + 1] = -7.7 + Math.random() * 15.4;
    rainSeeds[i * 4 + 2] = Math.random() * 9.2;
    rainSeeds[i * 4 + 3] = 5.7 + Math.random() * 4.6;
  }
  const rainGeometry = new THREE.BufferGeometry();
  rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const rain = new THREE.LineSegments(rainGeometry, new THREE.LineBasicMaterial({ color: 0xb8def0, transparent: true, opacity: 0.44, depthWrite: false }));
  rain.frustumCulled = false;
  root.add(rain);
  animations.rain = { rainPositions, rainSeeds, rainGeometry, count };

  const dripCount = 30;
  const dripPositions = new Float32Array(dripCount * 6);
  const dripGeometry = new THREE.BufferGeometry();
  dripGeometry.setAttribute('position', new THREE.BufferAttribute(dripPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const drips = new THREE.LineSegments(dripGeometry, new THREE.LineBasicMaterial({ color: 0xc2f1ef, transparent: true, opacity: 0.65, depthWrite: false }));
  drips.frustumCulled = false;
  root.add(drips);
  animations.drips = { dripPositions, dripGeometry, dripCount };

  const runoffCount = 44;
  const runoffPositions = new Float32Array(runoffCount * 6);
  const runoffGeometry = new THREE.BufferGeometry();
  runoffGeometry.setAttribute('position', new THREE.BufferAttribute(runoffPositions, 3).setUsage(THREE.DynamicDrawUsage));
  const runoff = new THREE.LineSegments(runoffGeometry, new THREE.LineBasicMaterial({ color: 0xc5f3f1, transparent: true, opacity: 0.36, depthWrite: false }));
  runoff.frustumCulled = false;
  root.add(runoff);
  animations.runoff = { runoffPositions, runoffGeometry, runoffCount };

  animations.ripples = [];
  const ripplePositions = [[-2.1, 4.17], [1.45, 3.35], [2.35, 6.22], [-6.18, 5.75], [6.08, -3.48], [6.82, -6.14], [6.16, 1.89], [-6.1, -2.4]];
  for (let i = 0; i < 20; i++) {
    const [x, z] = ripplePositions[i % ripplePositions.length];
    const mesh = new THREE.Mesh(new THREE.RingGeometry(0.95, 1.03, 28), new THREE.MeshBasicMaterial({ color: 0xa6eeef, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(x + Math.sin(i * 9.2) * 0.22, 0.079 + i * 0.0002, z + Math.cos(i * 3.7) * 0.13);
    root.add(mesh);
    animations.ripples.push(mesh);
  }
}

function smoothstep(x) {
  const clamped = Math.min(1, Math.max(0, x));
  return clamped * clamped * (3 - 2 * clamped);
}

function updateWeather(animations, time) {
  const { rainPositions, rainSeeds, rainGeometry, count } = animations.rain;
  for (let i = 0; i < count; i++) {
    const offset = i * 4;
    const y = 0.15 + ((rainSeeds[offset + 2] - time * rainSeeds[offset + 3] + 9000) % 9.1 + 9.1) % 9.1;
    const x = rainSeeds[offset] - time * 0.24 % 0.8;
    const z = rainSeeds[offset + 1];
    const index = i * 6;
    rainPositions[index] = x;
    rainPositions[index + 1] = y;
    rainPositions[index + 2] = z;
    rainPositions[index + 3] = x + 0.08;
    rainPositions[index + 4] = y - 0.34;
    rainPositions[index + 5] = z + 0.035;
  }
  rainGeometry.attributes.position.needsUpdate = true;

  const { dripPositions, dripGeometry, dripCount } = animations.drips;
  for (let i = 0; i < dripCount; i++) {
    const phase = ((time * (1.4 + i % 5 * 0.21) + i * 0.29) % 1 + 1) % 1;
    const x = -4.2 + i * 0.26;
    const y = 4.02 - phase * 0.85;
    const index = i * 6;
    dripPositions[index] = x;
    dripPositions[index + 1] = y;
    dripPositions[index + 2] = 1.59;
    dripPositions[index + 3] = x + 0.007;
    dripPositions[index + 4] = y - 0.07;
    dripPositions[index + 5] = 1.59;
  }
  dripGeometry.attributes.position.needsUpdate = true;

  const { runoffPositions, runoffGeometry, runoffCount } = animations.runoff;
  for (let i = 0; i < runoffCount; i++) {
    const x = -3.98 + i * 0.167;
    const phase = ((time * (0.17 + i % 4 * 0.044) + i * 0.137) % 1 + 1) % 1;
    const y = 3.88 - phase * 3.25;
    const index = i * 6;
    runoffPositions[index] = x;
    runoffPositions[index + 1] = y;
    runoffPositions[index + 2] = 1.012;
    runoffPositions[index + 3] = x + 0.026;
    runoffPositions[index + 4] = y - 0.16 - (i % 3) * 0.04;
    runoffPositions[index + 5] = 1.014;
  }
  runoffGeometry.attributes.position.needsUpdate = true;

  animations.ripples.forEach((ripple, i) => {
    const phase = ((time * 0.54 + i * 0.293) % 1 + 1) % 1;
    ripple.scale.setScalar(0.07 + phase * 0.45);
    ripple.material.opacity = (1 - phase) * 0.32;
  });
}

export function createDiorama(scene) {
  const root = new THREE.Group();
  scene.add(root);
  const animations = { reflections: [] };
  addLights(scene);
  makeBase(root);
  makeRoad(root, animations);
  const store = makeStore(root, animations);
  makeInterior(store);
  makeStreetProps(root, animations);
  makeWeather(root, animations);

  return {
    update(time) {
      updateWeather(animations, time);
      const cycle = time % 12.5;
      const opening = smoothstep((cycle - 1.9) / 0.8);
      const closing = 1 - smoothstep((cycle - 5.2) / 0.92);
      const gap = opening * closing * 0.28;
      animations.doors[0].position.x = 1.45 - gap;
      animations.doors[1].position.x = 2.37 + gap;
      animations.sign.material.opacity = 0.84 + 0.13 * Math.sin(time * 2.1) + (Math.sin(time * 13.6) > 0.983 ? -0.27 : 0);
      animations.reflections.forEach((streak, index) => {
        streak.scale.z = (0.72 + index % 4 * 0.36) * (0.96 + 0.04 * Math.sin(time * 1.2 + index));
      });
      const active = Math.floor(time / 15) % 3;
      animations.traffic.forEach((bulb, i) => {
        bulb.material.opacity = i === active ? 0.96 : 0.2;
      });
    },
  };
}
