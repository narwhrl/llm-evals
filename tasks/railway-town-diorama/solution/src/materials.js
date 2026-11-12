import * as THREE from 'three';

function grainCanvas(base, streak, vertical = false) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 128, 128);
  g.strokeStyle = streak;
  g.globalAlpha = 0.35;
  for (let i = 0; i < 40; i++) {
    const p = (i * 37) % 128;
    const wobble = 2 + ((i * 13) % 4);
    g.lineWidth = 0.6 + ((i * 7) % 3) * 0.4;
    g.beginPath();
    if (vertical) {
      g.moveTo(p, 0);
      g.bezierCurveTo(p + wobble, 42, p - wobble, 86, p + wobble * 0.5, 128);
    } else {
      g.moveTo(0, p);
      g.bezierCurveTo(42, p + wobble, 86, p - wobble, 128, p + wobble * 0.5);
    }
    g.stroke();
  }
  return c;
}

function speckleCanvas(base, dots, count = 700) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < count; i++) {
    const x = (i * 73) % 128;
    const y = (i * 41 + ((i * i) % 17)) % 128;
    g.fillStyle = dots[i % dots.length];
    g.globalAlpha = 0.25 + ((i * 29) % 50) / 200;
    const r = 0.6 + ((i * 11) % 5) * 0.35;
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

function stripesCanvas(base, stripe, step = 10) {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const g = c.getContext('2d');
  g.fillStyle = base;
  g.fillRect(0, 0, 128, 128);
  g.strokeStyle = stripe;
  g.globalAlpha = 0.5;
  g.lineWidth = 2;
  for (let p = step; p < 128; p += step) {
    g.beginPath();
    g.moveTo(p, 0);
    g.lineTo(p, 128);
    g.stroke();
  }
  return c;
}

function tex(canvas, repeatX = 1, repeatY = 1) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeatX, repeatY);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

export function createMaterials() {
  const woodTop = tex(grainCanvas('#8a6138', '#6e4a26'), 4, 3);
  const woodSide = tex(grainCanvas('#7a5330', '#5c3d20', true), 6, 1);
  const plasterTex = tex(speckleCanvas('#ffffff', ['#e8e2d4', '#d8d0bc'], 500), 2, 2);
  const roofTex = tex(stripesCanvas('#ffffff', '#00000022', 9), 2, 1);
  const roadTex = tex(speckleCanvas('#6f6a62', ['#5c5750', '#7f7a70'], 900), 6, 1);
  const platformTex = tex(speckleCanvas('#b3a68f', ['#9c8f78', '#c4b8a2'], 800), 4, 1);

  const m = {};
  m.baseWood = new THREE.MeshStandardMaterial({ map: woodSide, roughness: 0.8 });
  m.baseTop = new THREE.MeshStandardMaterial({ map: woodTop, roughness: 0.85 });
  m.baseEdge = new THREE.MeshStandardMaterial({ color: 0x5a3d22, roughness: 0.7 });
  m.terrain = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 });
  m.earthCut = new THREE.MeshStandardMaterial({ color: 0x6d5a42, roughness: 1 });
  m.rock = new THREE.MeshStandardMaterial({ color: 0x8d867c, roughness: 0.9 });
  m.water = new THREE.MeshStandardMaterial({
    color: 0x2f6d88,
    transparent: true,
    opacity: 0.86,
    roughness: 0.12,
    metalness: 0.55,
    emissive: 0x1a4257,
    emissiveIntensity: 0.2,
  });
  m.rail = new THREE.MeshStandardMaterial({ color: 0x9aa2a8, roughness: 0.35, metalness: 0.85 });
  m.sleeper = new THREE.MeshStandardMaterial({ color: 0x54402c, roughness: 0.95 });
  m.ballast = new THREE.MeshStandardMaterial({ color: 0x8a8378, roughness: 1 });
  m.bridgeWood = new THREE.MeshStandardMaterial({ color: 0x7a4f2e, roughness: 0.85 });
  m.bridgePaint = new THREE.MeshStandardMaterial({ color: 0x51615a, roughness: 0.6, metalness: 0.4 });
  m.road = new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.98 });
  m.platform = new THREE.MeshStandardMaterial({ map: platformTex, roughness: 0.9 });
  m.stationWall = new THREE.MeshStandardMaterial({ color: 0xe8d8b0, map: plasterTex, roughness: 0.9 });
  m.stationRoof = new THREE.MeshStandardMaterial({ color: 0x3f5a4a, roughness: 0.8 });
  m.trunk = new THREE.MeshStandardMaterial({ color: 0x6b4a2e, roughness: 0.95 });
  m.fence = new THREE.MeshStandardMaterial({ color: 0xd9d2c2, roughness: 0.85 });
  m.door = new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0.8 });
  m.chimney = new THREE.MeshStandardMaterial({ color: 0x9c6b52, roughness: 0.9 });
  m.metalDark = new THREE.MeshStandardMaterial({ color: 0x3b3f45, roughness: 0.5, metalness: 0.6 });
  m.lampPost = new THREE.MeshStandardMaterial({ color: 0x2f3338, roughness: 0.5, metalness: 0.7 });
  m.lampBulb = new THREE.MeshStandardMaterial({
    color: 0xf2e9d8,
    emissive: 0xffd9a0,
    emissiveIntensity: 0,
  });
  m.window = new THREE.MeshStandardMaterial({
    color: 0xbcd2dd,
    roughness: 0.2,
    metalness: 0.4,
    emissive: 0xffbf72,
    emissiveIntensity: 0,
  });
  m.stationWindow = m.window.clone();
  m.windowLit = m.window.clone();
  m.crossing = new THREE.MeshStandardMaterial({ color: 0xdcd7c8, roughness: 0.8 });
  m.crossingStripe = new THREE.MeshStandardMaterial({ color: 0xa03a30, roughness: 0.7 });
  m.bush = new THREE.MeshStandardMaterial({ color: 0x4f7a35, roughness: 0.95 });
  m.dock = new THREE.MeshStandardMaterial({ color: 0x86674a, roughness: 0.9 });
  m.harvest = new THREE.MeshStandardMaterial({ color: 0xd9a545, roughness: 0.95 });
  m.field = new THREE.MeshStandardMaterial({ color: 0xb99a55, roughness: 1 });
  m.fieldGreen = new THREE.MeshStandardMaterial({ color: 0x7d9a4a, roughness: 1 });
  m.whitewash = new THREE.MeshStandardMaterial({ color: 0xf4efe2, roughness: 0.9 });
  m.lighthouseRed = new THREE.MeshStandardMaterial({ color: 0xb8453a, roughness: 0.8 });
  m.beacon = new THREE.MeshStandardMaterial({
    color: 0xfff3d8,
    emissive: 0xffe9b8,
    emissiveIntensity: 0.35,
  });
  m.roofTexMap = roofTex;

  return m;
}

const HOUSE_WALLS = [0xe8d8b0, 0xd9e4e0, 0xe6c9b0, 0xcfd8c4, 0xe3d3c0, 0xd6c8e0];
const HOUSE_ROOFS = [0xb0543e, 0x3f5a4a, 0x6b4a3a, 0x506b7d, 0x8a5a40, 0x74586b];

export function housePalette(i) {
  return {
    wall: HOUSE_WALLS[i % HOUSE_WALLS.length],
    roof: HOUSE_ROOFS[(i * 2 + 1) % HOUSE_ROOFS.length],
  };
}

export function plasterMaterial(m, color) {
  return new THREE.MeshStandardMaterial({ color, map: m.stationWall.map, roughness: 0.9 });
}

export function roofMaterial(m, color) {
  return new THREE.MeshStandardMaterial({ color, map: m.roofTexMap, roughness: 0.85 });
}
