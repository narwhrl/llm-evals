import * as THREE from 'three';

let seed = 731941;
export function random() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 4294967296;
}

function noiseTexture(base, flecks, lines = false) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < flecks; i++) {
    const c = Math.floor(28 + random() * 120);
    ctx.fillStyle = `rgba(${c},${c + 7},${c + 9},${0.025 + random() * 0.075})`;
    const s = 0.5 + random() * 3;
    ctx.fillRect(random() * 256, random() * 256, s, s);
  }
  if (lines) {
    for (let i = 0; i < 35; i++) {
      ctx.strokeStyle = `rgba(10,17,20,${0.04 + random() * 0.08})`;
      ctx.beginPath();
      const x = random() * 256;
      const y = random() * 256;
      ctx.moveTo(x, y);
      ctx.lineTo(x + 20 + random() * 80, y + (random() - .5) * 8);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

const asphaltMap = noiseTexture('#364249', 18000, true);
asphaltMap.repeat.set(8, 8);
const concreteMap = noiseTexture('#8c9290', 19000, true);
concreteMap.repeat.set(5, 5);
const plasterMap = noiseTexture('#a9aaa1', 8500, true);
plasterMap.repeat.set(2, 2);
const woodMap = noiseTexture('#9a7553', 5000, true);
woodMap.repeat.set(2, 2);

export const mat = {
  asphalt: new THREE.MeshStandardMaterial({ map: asphaltMap, color: 0x9caeb7, roughness: .43, metalness: .08 }),
  concrete: new THREE.MeshStandardMaterial({ map: concreteMap, color: 0xb4bec0, roughness: .9 }),
  plaster: new THREE.MeshStandardMaterial({ map: plasterMap, color: 0xa3b2b0, roughness: .92 }),
  wood: new THREE.MeshStandardMaterial({ map: woodMap, color: 0xc5a077, roughness: .88 }),
  darkWood: new THREE.MeshStandardMaterial({ color: 0x493b35, roughness: .9 }),
  steel: new THREE.MeshStandardMaterial({ color: 0x45525a, metalness: .78, roughness: .35 }),
  blueSteel: new THREE.MeshStandardMaterial({ color: 0x335563, metalness: .72, roughness: .38 }),
  greenSteel: new THREE.MeshStandardMaterial({ color: 0x4c625d, metalness: .65, roughness: .42 }),
  rust: new THREE.MeshStandardMaterial({ color: 0x985f49, metalness: .57, roughness: .64 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x202c31, metalness: .3, roughness: .66 }),
  rubber: new THREE.MeshStandardMaterial({ color: 0x161d20, roughness: .96 }),
  glass: new THREE.MeshPhysicalMaterial({ color: 0x8fc3cc, metalness: .25, roughness: .18, transparent: true, opacity: .42, side: THREE.DoubleSide }),
  paper: new THREE.MeshStandardMaterial({ color: 0x8c8270, roughness: 1 }),
  sandbag: new THREE.MeshStandardMaterial({ color: 0x787968, roughness: 1 }),
  white: new THREE.MeshStandardMaterial({ color: 0xd5d9d2, roughness: .65 }),
  yellow: new THREE.MeshStandardMaterial({ color: 0xd9ac62, roughness: .6 }),
  red: new THREE.MeshStandardMaterial({ color: 0xa3433e, roughness: .62 }),
  blue: new THREE.MeshStandardMaterial({ color: 0x3f7385, roughness: .6 }),
  puddle: new THREE.MeshPhysicalMaterial({ color: 0x172d35, metalness: .72, roughness: .12, clearcoat: 1, clearcoatRoughness: .04, transparent: true, opacity: .88, depthWrite: false, side: THREE.DoubleSide }),
};

export function textTexture(text, options = {}) {
  const { background = null, color = '#e2e6de', size = 92, width = 512, height = 160, align = 'center', weight = 800 } = options;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (background) {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px Arial, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, align === 'left' ? 18 : width / 2, height / 2, width - 30);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function label(text, width, height, options = {}) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshBasicMaterial({ map: textTexture(text, options), transparent: !options.background, depthWrite: false, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2 }),
  );
  return mesh;
}
