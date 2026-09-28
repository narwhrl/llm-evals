import * as THREE from 'three';

export function mulberry32(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function canvasTexture(canvas, repeatX = 1, repeatY = 1) {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.anisotropy = 4;
  return texture;
}

function makeGradientMap() {
  const data = new Uint8Array([44, 112, 184, 255]);
  const texture = new THREE.DataTexture(data, 4, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  return texture;
}

function makeSurfaceTexture({
  seed,
  base,
  dark,
  light,
  repeat = [1, 1],
  cracks = 14,
  streaks = 8,
  flecks = 900,
}) {
  const random = mulberry32(seed);
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  context.fillStyle = base;
  context.fillRect(0, 0, 256, 256);

  for (let index = 0; index < flecks; index += 1) {
    const alpha = 0.025 + random() * 0.12;
    const size = random() < 0.94 ? 1 : 2;
    context.fillStyle = random() > 0.48
      ? `rgba(255,255,255,${alpha * 0.65})`
      : `rgba(0,0,0,${alpha})`;
    context.fillRect(random() * 256, random() * 256, size, size);
  }

  context.lineCap = 'round';
  for (let index = 0; index < streaks; index += 1) {
    const x = random() * 256;
    const y = random() * 256;
    context.strokeStyle = `rgba(4,10,14,${0.04 + random() * 0.1})`;
    context.lineWidth = 1 + random() * 5;
    context.beginPath();
    context.moveTo(x, y);
    context.bezierCurveTo(
      x + random() * 14 - 7,
      y + 24 + random() * 30,
      x + random() * 18 - 9,
      y + 50 + random() * 45,
      x + random() * 10 - 5,
      y + 75 + random() * 70,
    );
    context.stroke();
  }

  context.lineCap = 'butt';
  for (let index = 0; index < cracks; index += 1) {
    let x = random() * 256;
    let y = random() * 256;
    context.strokeStyle = `rgba(${dark},${0.11 + random() * 0.2})`;
    context.lineWidth = 0.6 + random() * 1.1;
    context.beginPath();
    context.moveTo(x, y);
    const segments = 2 + Math.floor(random() * 4);
    for (let segment = 0; segment < segments; segment += 1) {
      x += random() * 18 - 9;
      y += 4 + random() * 12;
      context.lineTo(x, y);
    }
    context.stroke();
  }

  for (let index = 0; index < 20; index += 1) {
    const x = random() * 256;
    const y = random() * 256;
    context.fillStyle = `rgba(${light},${0.08 + random() * 0.14})`;
    context.beginPath();
    context.arc(x, y, 0.6 + random() * 1.6, 0, Math.PI * 2);
    context.fill();
  }

  return canvasTexture(canvas, repeat[0], repeat[1]);
}

function makeWoodTexture(seed) {
  const random = mulberry32(seed);
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.fillStyle = '#8e6946';
  context.fillRect(0, 0, 256, 256);

  for (let row = 0; row < 18; row += 1) {
    const y = row * 15;
    context.fillStyle = row % 2 ? 'rgba(255,220,163,.07)' : 'rgba(19,11,7,.12)';
    context.fillRect(0, y, 256, 2);
    for (let line = 0; line < 6; line += 1) {
      context.strokeStyle = `rgba(31,18,10,${0.06 + random() * 0.11})`;
      context.lineWidth = 0.5 + random();
      context.beginPath();
      context.moveTo(0, y + 2 + random() * 10);
      context.bezierCurveTo(70, y + random() * 10, 150, y + random() * 12, 256, y + random() * 9);
      context.stroke();
    }
  }

  for (let knot = 0; knot < 7; knot += 1) {
    const x = random() * 256;
    const y = random() * 256;
    context.strokeStyle = 'rgba(28,14,8,.34)';
    for (let ring = 0; ring < 3; ring += 1) {
      context.beginPath();
      context.ellipse(x, y, 3 + ring * 3, 2 + ring * 2, random(), 0, Math.PI * 2);
      context.stroke();
    }
  }

  return canvasTexture(canvas, 1.5, 1.5);
}

function makeRustTexture(seed) {
  const random = mulberry32(seed);
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.fillStyle = '#68777b';
  context.fillRect(0, 0, 256, 256);

  for (let index = 0; index < 120; index += 1) {
    const x = random() * 256;
    const y = random() * 256;
    const radius = 2 + random() * 22;
    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `rgba(129,55,24,${0.18 + random() * 0.3})`);
    gradient.addColorStop(0.5, `rgba(87,45,29,${0.08 + random() * 0.18})`);
    gradient.addColorStop(1, 'rgba(57,65,66,0)');
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
  }

  context.strokeStyle = 'rgba(190,86,35,.18)';
  for (let index = 0; index < 34; index += 1) {
    const x = random() * 256;
    const y = random() * 256;
    context.lineWidth = 1 + random() * 3;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + random() * 8 - 4, y + 15 + random() * 60);
    context.stroke();
  }

  return canvasTexture(canvas, 2, 2);
}

function makeGraffitiTexture(seed, text = 'CARGO') {
  const random = mulberry32(seed);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 512, 256);

  context.save();
  context.translate(256, 144);
  context.rotate(-0.08 + random() * 0.16);
  context.font = '900 112px Impact, Arial Narrow, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.lineJoin = 'round';
  context.lineWidth = 18;
  context.strokeStyle = 'rgba(8,12,15,.78)';
  context.strokeText(text, 0, 0);
  context.fillStyle = random() > 0.5 ? 'rgba(210,63,53,.76)' : 'rgba(62,139,151,.72)';
  context.fillText(text, 0, 0);
  context.restore();

  context.globalCompositeOperation = 'destination-out';
  for (let index = 0; index < 110; index += 1) {
    context.fillStyle = `rgba(0,0,0,${0.25 + random() * 0.65})`;
    context.fillRect(random() * 512, random() * 256, 1 + random() * 18, 1 + random() * 6);
  }

  const texture = canvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function makeTextTexture({
  text,
  width = 512,
  height = 256,
  background = '#172127',
  foreground = '#d7e3de',
  border = '#788b8e',
  subtext = '',
  rotate = 0,
  transparent = false,
}) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, width, height);

  if (!transparent) {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = border;
    context.lineWidth = Math.max(4, width * 0.018);
    context.strokeRect(context.lineWidth, context.lineWidth, width - context.lineWidth * 2, height - context.lineWidth * 2);
  }

  context.save();
  context.translate(width / 2, height * (subtext ? 0.43 : 0.5));
  context.rotate(rotate);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = `900 ${Math.floor(height * (subtext ? 0.34 : 0.46))}px Impact, Arial Narrow, sans-serif`;
  context.lineJoin = 'round';
  context.lineWidth = Math.max(3, height * 0.025);
  context.strokeStyle = 'rgba(0,0,0,.65)';
  context.strokeText(text, 0, 0);
  context.fillStyle = foreground;
  context.fillText(text, 0, 0);
  context.restore();

  if (subtext) {
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = `700 ${Math.floor(height * 0.13)}px Arial, sans-serif`;
    context.fillStyle = foreground;
    context.fillText(subtext, width / 2, height * 0.76);
  }

  const texture = canvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export function makeSiteTexture(letter, tint = '#d8e0d8') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 512, 512);
  context.strokeStyle = tint;
  context.fillStyle = tint;
  context.lineWidth = 22;
  context.globalAlpha = 0.84;
  context.strokeRect(62, 62, 388, 388);
  context.lineWidth = 11;
  context.strokeRect(92, 92, 328, 328);
  context.font = '900 250px Impact, Arial Narrow, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(letter, 256, 274);
  context.lineWidth = 8;
  context.beginPath();
  context.moveTo(118, 405);
  context.lineTo(394, 405);
  context.stroke();

  const random = mulberry32(letter === 'A' ? 18 : 29);
  context.globalCompositeOperation = 'destination-out';
  for (let index = 0; index < 70; index += 1) {
    context.fillStyle = `rgba(0,0,0,${0.25 + random() * 0.5})`;
    context.fillRect(random() * 512, random() * 512, 2 + random() * 24, 1 + random() * 9);
  }

  const texture = canvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function outline(material, thickness = 0.0023, color = [0.012, 0.022, 0.03]) {
  material.userData.outlineParameters = {
    thickness,
    color,
    alpha: 0.92,
    visible: true,
    keepAlive: true,
  };
  return material;
}

function noOutline(material) {
  material.userData.outlineParameters = { visible: false };
  return material;
}

export function createMaterials() {
  const gradientMap = makeGradientMap();
  const concreteMap = makeSurfaceTexture({
    seed: 11,
    base: '#7c8583',
    dark: '13,20,24',
    light: '210,221,219',
    repeat: [3, 3],
    cracks: 20,
    streaks: 15,
  });
  const asphaltMap = makeSurfaceTexture({
    seed: 29,
    base: '#3d484e',
    dark: '3,8,12',
    light: '150,169,177',
    repeat: [5, 7],
    cracks: 24,
    streaks: 4,
    flecks: 1500,
  });
  const wallMap = makeSurfaceTexture({
    seed: 47,
    base: '#7f8780',
    dark: '17,22,22',
    light: '207,213,202',
    repeat: [2.5, 1.5],
    cracks: 18,
    streaks: 28,
  });
  const rustMap = makeRustTexture(73);
  const woodMap = makeWoodTexture(97);
  const cardboardMap = makeSurfaceTexture({
    seed: 109,
    base: '#a9845b',
    dark: '45,28,15',
    light: '244,211,157',
    repeat: [1, 1],
    cracks: 8,
    streaks: 10,
    flecks: 600,
  });

  const toon = (parameters, outlineThickness) => outline(
    new THREE.MeshToonMaterial({ gradientMap, ...parameters }),
    outlineThickness,
  );

  const materials = {
    base: toon({ color: 0xdde2df, map: concreteMap }, 0.0028),
    concrete: toon({ color: 0xe3e6e0, map: concreteMap }, 0.0024),
    concreteDark: toon({ color: 0xaeb9b9, map: concreteMap }, 0.0024),
    asphalt: toon({ color: 0xc7d0d3, map: asphaltMap }, 0.0018),
    wall: toon({ color: 0xd6d6c9, map: wallMap }, 0.0026),
    wallDark: toon({ color: 0x9aa9a8, map: wallMap }, 0.0025),
    metal: toon({ color: 0xb0bcc0, map: rustMap }, 0.0021),
    metalDark: toon({ color: 0x78868b, map: rustMap }, 0.0022),
    rust: toon({ color: 0xc0805c, map: rustMap }, 0.0021),
    blue: toon({ color: 0x1f6074 }, 0.0022),
    blueDark: toon({ color: 0x153e4c }, 0.0022),
    red: toon({ color: 0x8a312d }, 0.0022),
    yellow: toon({ color: 0xc59a38 }, 0.0021),
    wood: toon({ color: 0xe5c69c, map: woodMap }, 0.0022),
    woodDark: toon({ color: 0xa78a6d, map: woodMap }, 0.0022),
    cardboard: toon({ color: 0xe3c49b, map: cardboardMap }, 0.0019),
    sandbag: toon({ color: 0x8b8065 }, 0.0017),
    rubber: toon({ color: 0x151b1c }, 0.0018),
    black: toon({ color: 0x111719 }, 0.0017),
    ivory: toon({ color: 0xd6d6c2 }, 0.0017),
    green: toon({ color: 0x445a50 }, 0.0019),
    orange: toon({ color: 0xb7652f }, 0.0019),
  };

  materials.steel = outline(
    new THREE.MeshStandardMaterial({
      color: 0x819196,
      roughness: 0.32,
      metalness: 0.78,
    }),
    0.0018,
  );
  materials.steelWet = outline(
    new THREE.MeshStandardMaterial({
      color: 0x4d626a,
      roughness: 0.2,
      metalness: 0.82,
    }),
    0.0018,
  );
  materials.glass = noOutline(
    new THREE.MeshPhysicalMaterial({
      color: 0x7ea6b1,
      roughness: 0.16,
      metalness: 0.08,
      transparent: true,
      opacity: 0.38,
      transmission: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  materials.water = noOutline(
    new THREE.MeshPhysicalMaterial({
      color: 0x517889,
      roughness: 0.08,
      metalness: 0.18,
      transparent: true,
      opacity: 0.2,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  materials.warmLight = noOutline(
    new THREE.MeshBasicMaterial({ color: 0xffd27a, toneMapped: false }),
  );
  materials.coldLight = noOutline(
    new THREE.MeshBasicMaterial({ color: 0xbcecff, toneMapped: false }),
  );
  materials.redLight = noOutline(
    new THREE.MeshBasicMaterial({ color: 0xff342f, toneMapped: false }),
  );
  materials.blueLight = noOutline(
    new THREE.MeshBasicMaterial({ color: 0x318cff, toneMapped: false }),
  );
  materials.dark = noOutline(
    new THREE.MeshBasicMaterial({ color: 0x080d10 }),
  );
  materials.line = noOutline(
    new THREE.LineBasicMaterial({ color: 0x10191d, transparent: true, opacity: 0.82 }),
  );
  materials.wire = noOutline(
    new THREE.LineBasicMaterial({ color: 0x0c1214 }),
  );
  materials.rain = noOutline(
    new THREE.LineBasicMaterial({ color: 0x7397a8, transparent: true, opacity: 0.26, depthWrite: false }),
  );
  materials.ripple = noOutline(
    new THREE.MeshBasicMaterial({ color: 0x9cc7d5, transparent: true, opacity: 0.28, depthWrite: false, side: THREE.DoubleSide }),
  );
  materials.steam = noOutline(
    new THREE.SpriteMaterial({ color: 0xc9d8da, transparent: true, opacity: 0.11, depthWrite: false }),
  );

  const graffitiA = noOutline(
    new THREE.MeshBasicMaterial({ map: makeGraffitiTexture(131, 'FREIGHT'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  const graffitiB = noOutline(
    new THREE.MeshBasicMaterial({ map: makeGraffitiTexture(157, 'TACTICAL'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  materials.graffitiA = graffitiA;
  materials.graffitiB = graffitiB;

  materials.signYellow = noOutline(
    new THREE.MeshBasicMaterial({ map: makeTextTexture({ text: 'CAUTION', background: '#b38b2c', foreground: '#171a18', subtext: 'KEEP CLEAR' }), toneMapped: false }),
  );
  materials.signBlue = noOutline(
    new THREE.MeshBasicMaterial({ map: makeTextTexture({ text: 'FREIGHT 07', background: '#244d5c', foreground: '#d5dfd8', subtext: 'AUTHORIZED ONLY' }), toneMapped: false }),
  );
  materials.signPolice = noOutline(
    new THREE.MeshBasicMaterial({ map: makeTextTexture({ text: 'CT UNIT', background: '#17232a', foreground: '#d5e2e1', subtext: 'RESTRICTED SECTOR' }), toneMapped: false }),
  );
  materials.dutyRoster = noOutline(
    new THREE.MeshBasicMaterial({ map: makeTextTexture({ text: 'DUTY', background: '#b7b09a', foreground: '#252a28', subtext: '23:00  /  07:00' }), toneMapped: false }),
  );
  materials.siteA = noOutline(
    new THREE.MeshBasicMaterial({ map: makeSiteTexture('A'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 }),
  );
  materials.siteB = noOutline(
    new THREE.MeshBasicMaterial({ map: makeSiteTexture('B', '#e4c985'), transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -3 }),
  );

  for (const material of [
    materials.steelWet,
    materials.metalDark,
    materials.cardboard,
    materials.sandbag,
    materials.rubber,
    materials.black,
    materials.ivory,
  ]) {
    material.userData.outlineParameters = { visible: false };
  }

  materials.gradientMap = gradientMap;
  return materials;
}
