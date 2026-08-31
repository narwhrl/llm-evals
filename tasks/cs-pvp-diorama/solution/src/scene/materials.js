import * as THREE from 'three';

export const PALETTE = Object.freeze({
  ink: 0x071017,
  outline: 0x091116,
  concrete: 0x59656b,
  concreteDark: 0x303b41,
  concreteLight: 0x7d898d,
  asphalt: 0x1d292f,
  asphaltWet: 0x26373f,
  steel: 0x34454d,
  steelDark: 0x18262d,
  rust: 0x7b4632,
  rustLight: 0xa56843,
  blue: 0x1e526d,
  blueLight: 0x347998,
  teal: 0x296366,
  red: 0x7f302d,
  policeBlue: 0x2f78d8,
  warning: 0xd3aa50,
  wood: 0x806143,
  woodLight: 0xa78154,
  cardboard: 0x8c7558,
  rubber: 0x151b1e,
  paint: 0xd9dfdb,
  glass: 0x7399a6,
  warm: 0xffbd68,
  cool: 0xa9e1ff,
});

function seededNoise(size, seed = 9137) {
  const data = new Uint8Array(size * size * 4);
  let state = seed >>> 0;

  for (let index = 0; index < size * size; index += 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const grain = 98 + ((state >>> 24) % 98);
    const offset = index * 4;
    data[offset] = grain;
    data[offset + 1] = grain;
    data[offset + 2] = grain;
    data[offset + 3] = 255;
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 12);
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function standard(color, options = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.04,
    flatShading: true,
    ...options,
  });
}

export function createMaterialLibrary() {
  const grain = seededNoise(96);
  const concrete = standard(PALETTE.concrete, {
    roughness: 0.88,
    bumpMap: grain,
    bumpScale: 0.045,
  });
  const concreteDark = standard(PALETTE.concreteDark, {
    roughness: 0.9,
    bumpMap: grain,
    bumpScale: 0.038,
  });
  const concreteLight = standard(PALETTE.concreteLight, {
    roughness: 0.82,
    bumpMap: grain,
    bumpScale: 0.032,
  });
  const asphalt = standard(PALETTE.asphalt, {
    roughness: 0.66,
    metalness: 0.08,
    bumpMap: grain,
    bumpScale: 0.055,
  });
  const wetAsphalt = standard(PALETTE.asphaltWet, {
    roughness: 0.22,
    metalness: 0.28,
    bumpMap: grain,
    bumpScale: 0.025,
    envMapIntensity: 1.35,
  });
  const steel = standard(PALETTE.steel, {
    roughness: 0.46,
    metalness: 0.72,
  });
  const darkSteel = standard(PALETTE.steelDark, {
    roughness: 0.4,
    metalness: 0.78,
  });
  const rust = standard(PALETTE.rust, {
    roughness: 0.72,
    metalness: 0.48,
    bumpMap: grain,
    bumpScale: 0.035,
  });
  const blueSteel = standard(PALETTE.blue, {
    roughness: 0.52,
    metalness: 0.62,
  });
  const tealSteel = standard(PALETTE.teal, {
    roughness: 0.54,
    metalness: 0.58,
  });
  const redSteel = standard(PALETTE.red, {
    roughness: 0.55,
    metalness: 0.56,
  });
  const yellowSteel = standard(PALETTE.warning, {
    roughness: 0.56,
    metalness: 0.48,
  });
  const wood = standard(PALETTE.wood, {
    roughness: 0.88,
    metalness: 0,
    bumpMap: grain,
    bumpScale: 0.06,
  });
  const lightWood = standard(PALETTE.woodLight, {
    roughness: 0.84,
    metalness: 0,
    bumpMap: grain,
    bumpScale: 0.05,
  });
  const cardboard = standard(PALETTE.cardboard, {
    roughness: 0.96,
    metalness: 0,
  });
  const rubber = standard(PALETTE.rubber, {
    roughness: 0.84,
    metalness: 0.02,
  });
  const paint = standard(PALETTE.paint, {
    roughness: 0.7,
    metalness: 0.03,
  });
  const blackPaint = standard(PALETTE.outline, {
    roughness: 0.75,
    metalness: 0.08,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: PALETTE.glass,
    roughness: 0.16,
    metalness: 0.05,
    transmission: 0.14,
    transparent: true,
    opacity: 0.36,
    clearcoat: 1,
    clearcoatRoughness: 0.18,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const puddle = new THREE.MeshPhysicalMaterial({
    color: 0x182e39,
    roughness: 0.08,
    metalness: 0.18,
    transparent: true,
    opacity: 0.62,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.7,
    depthWrite: false,
  });
  const outline = new THREE.LineBasicMaterial({
    color: PALETTE.outline,
    transparent: true,
    opacity: 0.92,
    toneMapped: false,
  });
  const wire = new THREE.MeshBasicMaterial({ color: 0x05090b, toneMapped: false });
  const emissiveWarm = standard(0xffd69a, {
    emissive: PALETTE.warm,
    emissiveIntensity: 4.2,
    roughness: 0.22,
    toneMapped: false,
  });
  const emissiveCool = standard(0xcdeeff, {
    emissive: PALETTE.cool,
    emissiveIntensity: 3.5,
    roughness: 0.2,
    toneMapped: false,
  });
  const emissiveRed = standard(0xff4d4a, {
    emissive: 0xff302a,
    emissiveIntensity: 4.8,
    toneMapped: false,
  });
  const emissiveBlue = standard(0x66aaff, {
    emissive: PALETTE.policeBlue,
    emissiveIntensity: 5,
    toneMapped: false,
  });

  const library = {
    concrete,
    concreteDark,
    concreteLight,
    asphalt,
    wetAsphalt,
    steel,
    darkSteel,
    rust,
    blueSteel,
    tealSteel,
    redSteel,
    yellowSteel,
    wood,
    lightWood,
    cardboard,
    rubber,
    paint,
    blackPaint,
    glass,
    puddle,
    outline,
    wire,
    emissiveWarm,
    emissiveCool,
    emissiveRed,
    emissiveBlue,
  };

  return Object.assign(library, {
    dispose() {
      grain.dispose();
      for (const material of Object.values(library)) {
        if (material?.isMaterial) material.dispose();
      }
    },
  });
}

function distressCanvas(context, width, height, seed) {
  let state = seed >>> 0;
  context.globalCompositeOperation = 'destination-out';
  for (let index = 0; index < 90; index += 1) {
    state = (state * 1103515245 + 12345) >>> 0;
    const x = (state % width) | 0;
    state = (state * 1103515245 + 12345) >>> 0;
    const y = (state % height) | 0;
    state = (state * 1103515245 + 12345) >>> 0;
    const radius = 1 + (state % 6);
    context.globalAlpha = 0.18 + ((state >>> 24) / 255) * 0.42;
    context.fillRect(x, y, radius * 3, radius);
  }
  context.globalCompositeOperation = 'source-over';
  context.globalAlpha = 1;
}

export function createSignMaterial({
  text,
  detail = '',
  color = '#dce6e2',
  background = 'rgba(12, 24, 29, 0.88)',
  border = '#839196',
  seed = 17,
}) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const context = canvas.getContext('2d');

  context.fillStyle = background;
  context.fillRect(8, 8, 496, 240);
  context.strokeStyle = border;
  context.lineWidth = 10;
  context.strokeRect(12, 12, 488, 232);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = color;
  context.font = '900 118px Impact, sans-serif';
  context.fillText(text, 256, detail ? 105 : 132);

  if (detail) {
    context.font = '700 34px Arial Narrow, sans-serif';
    context.letterSpacing = '5px';
    context.fillText(detail, 256, 194);
  }

  distressCanvas(context, canvas.width, canvas.height, seed);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.08,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    toneMapped: false,
  });
  material.userData.ownedTexture = texture;
  return material;
}

export function createStencilMaterial(letter, color = '#e7ece9', seed = 31) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, 512, 512);
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 22;
  context.beginPath();
  context.arc(256, 256, 196, 0, Math.PI * 2);
  context.stroke();
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.font = '900 320px Impact, sans-serif';
  context.fillText(letter, 256, 270);
  distressCanvas(context, 512, 512, seed);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0.78,
    alphaTest: 0.05,
    depthWrite: false,
    side: THREE.DoubleSide,
    toneMapped: false,
  });
  material.userData.ownedTexture = texture;
  return material;
}
