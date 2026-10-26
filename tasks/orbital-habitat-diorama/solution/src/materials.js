import * as THREE from "three";
import {
  hullTexture,
  grateTexture,
  stripeTexture,
  fabricTexture,
  towelTexture,
  netTexture,
  leafTexture,
  screenTexture,
  manualTexture,
  blueprintTexture,
  labelTexture,
  cautionTexture,
  photoTexture,
  noteTexture,
  controlPanelTexture,
  foodBagTexture,
  pouchTexture,
  wearTexture,
} from "./textures.js";

// Layered composite seen in every cut edge: outer skin, honeycomb core,
// insulation blanket, inner liner.
export function cutTexture(size = 256) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const bands = [
    [0.0, 0.1, "#c9cbc4"],
    [0.1, 0.13, "#8d918c"],
    [0.13, 0.55, "#6f7472"],
    [0.55, 0.8, "#b89a5c"],
    [0.8, 0.88, "#8a7043"],
    [0.88, 1.0, "#d5d6cf"],
  ];
  for (const [a, b, color] of bands) {
    ctx.fillStyle = color;
    ctx.fillRect(0, a * size, size, (b - a) * size);
  }
  // honeycomb core hint
  ctx.strokeStyle = "rgba(30,32,32,0.5)";
  ctx.lineWidth = 1;
  const cell = 12;
  for (let y = 0.13 * size; y < 0.55 * size; y += cell * 0.86) {
    for (let x = 0; x < size; x += cell * 1.5) {
      const offset = Math.round(y / (cell * 0.86)) % 2 ? cell * 0.75 : 0;
      ctx.beginPath();
      for (let i = 0; i < 6; i += 1) {
        const angle = (Math.PI / 3) * i;
        const px = x + offset + Math.cos(angle) * cell * 0.5;
        const py = y + Math.sin(angle) * cell * 0.5;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
    }
  }
  // insulation crinkle
  for (let i = 0; i < 90; i += 1) {
    ctx.strokeStyle = `rgba(255,235,180,${0.05 + Math.random() * 0.08})`;
    ctx.beginPath();
    const y = (0.55 + Math.random() * 0.25) * size;
    ctx.moveTo(Math.random() * size, y);
    ctx.lineTo(Math.random() * size, y + Math.random() * 6);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createMaterials() {
  const hullMap = hullTexture(3);
  hullMap.wrapS = hullMap.wrapT = THREE.RepeatWrapping;
  const panelMap = hullTexture(9);
  const wearMap = wearTexture();
  const cutMap = cutTexture();
  cutMap.wrapS = cutMap.wrapT = THREE.RepeatWrapping;

  const screen = screenTexture();

  const materials = {
    hull: new THREE.MeshStandardMaterial({ color: 0xe6e5dc, map: hullMap, roughness: 0.82, metalness: 0.06 }),
    hullOuter: new THREE.MeshStandardMaterial({ color: 0x9aa0a0, roughness: 0.7, metalness: 0.18 }),
    panel: new THREE.MeshStandardMaterial({ color: 0xf0eee3, map: panelMap, roughness: 0.78, metalness: 0.05 }),
    panelDark: new THREE.MeshStandardMaterial({ color: 0x4b5052, roughness: 0.7, metalness: 0.25 }),
    cut: new THREE.MeshStandardMaterial({ color: 0xffffff, map: cutMap, roughness: 0.9, metalness: 0.1 }),
    rib: new THREE.MeshStandardMaterial({ color: 0xbfc1b8, roughness: 0.62, metalness: 0.35 }),
    metal: new THREE.MeshStandardMaterial({ color: 0x8e9498, roughness: 0.55, metalness: 0.55 }),
    darkMetal: new THREE.MeshStandardMaterial({ color: 0x2b3033, roughness: 0.5, metalness: 0.6 }),
    black: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.72, metalness: 0.2 }),
    rubber: new THREE.MeshStandardMaterial({ color: 0x23262a, roughness: 0.95, metalness: 0 }),
    grate: new THREE.MeshStandardMaterial({ color: 0xffffff, map: grateTexture(), roughness: 0.66, metalness: 0.42 }),
    stripe: new THREE.MeshStandardMaterial({ color: 0xffffff, map: stripeTexture(), roughness: 0.8, metalness: 0.1 }),
    fabricBeige: new THREE.MeshStandardMaterial({ color: 0xffffff, map: fabricTexture("#c7bfa8", 11), roughness: 0.96, metalness: 0 }),
    fabricOlive: new THREE.MeshStandardMaterial({ color: 0xffffff, map: fabricTexture("#8d8b6c", 21), roughness: 0.96, metalness: 0 }),
    fabricBlue: new THREE.MeshStandardMaterial({ color: 0xffffff, map: fabricTexture("#7f95ab", 31), roughness: 0.9, metalness: 0 }),
    sleepingBag: new THREE.MeshStandardMaterial({ color: 0xffffff, map: fabricTexture("#5d7361", 41, 256, "rgba(38,52,44,0.75)"), roughness: 0.97, metalness: 0 }),
    towel: new THREE.MeshStandardMaterial({ color: 0xffffff, map: towelTexture(), roughness: 0.98, metalness: 0 }),
    net: new THREE.MeshStandardMaterial({ color: 0xffffff, map: netTexture(), transparent: true, alphaTest: 0.35, side: THREE.DoubleSide, roughness: 1 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0xffffff, map: leafTexture(), side: THREE.DoubleSide, roughness: 0.7, metalness: 0 }),
    stem: new THREE.MeshStandardMaterial({ color: 0x5f7f3c, roughness: 0.85 }),
    screen: new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffffff, emissiveMap: screen.texture, emissiveIntensity: 1.35, roughness: 0.35, metalness: 0.1 }),
    manual: new THREE.MeshStandardMaterial({ color: 0xffffff, map: manualTexture(), roughness: 0.92 }),
    blueprint: new THREE.MeshStandardMaterial({ color: 0xffffff, map: blueprintTexture(), roughness: 0.94 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xe9e5d7, roughness: 0.95 }),
    wear: new THREE.MeshStandardMaterial({ color: 0xffffff, map: wearMap, transparent: true, opacity: 0.55, roughness: 1, depthWrite: false }),
    caution: new THREE.MeshStandardMaterial({ color: 0xffffff, map: cautionTexture(), roughness: 0.85 }),
    controlPanel: new THREE.MeshStandardMaterial({ color: 0xffffff, map: controlPanelTexture(), roughness: 0.6, metalness: 0.25 }),
    foodBag: new THREE.MeshStandardMaterial({ color: 0xffffff, map: foodBagTexture(), roughness: 0.9 }),
    pouchOlive: new THREE.MeshStandardMaterial({ color: 0xffffff, map: pouchTexture("#7c8a63"), roughness: 0.92 }),
    pouchGrey: new THREE.MeshStandardMaterial({ color: 0xffffff, map: pouchTexture("#6c7276"), roughness: 0.92 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: 0xbfe6ff,
      roughness: 0.08,
      metalness: 0,
      transparent: true,
      opacity: 0.13,
      transmission: 0,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    porcelain: new THREE.MeshStandardMaterial({ color: 0xf1ece0, roughness: 0.55, metalness: 0.02 }),
    ceramicBlue: new THREE.MeshStandardMaterial({ color: 0x3f6d86, roughness: 0.5 }),
    orange: new THREE.MeshStandardMaterial({ color: 0xc4642e, roughness: 0.8 }),
    red: new THREE.MeshStandardMaterial({ color: 0xa5322a, roughness: 0.7 }),
    yellow: new THREE.MeshStandardMaterial({ color: 0xd9b23a, roughness: 0.75 }),
    green: new THREE.MeshStandardMaterial({ color: 0x5d7f4a, roughness: 0.85 }),
    skin: new THREE.MeshStandardMaterial({ color: 0xd7a985, roughness: 0.8 }),
    screenTexture: screen,
    wearMap,
    stripLight: new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: new THREE.Color("#ffb45c"),
      emissiveIntensity: 2.4,
      roughness: 1,
      metalness: 0,
    }),
    growLight: new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: new THREE.Color("#ff5bd0"),
      emissiveIntensity: 2.2,
      roughness: 1,
      metalness: 0,
    }),
    readLamp: new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: new THREE.Color("#ffd9a0"),
      emissiveIntensity: 3.2,
      roughness: 1,
      metalness: 0,
    }),
    // The porthole frame picks up a faint cool earthshine at night.
    portholeRim: new THREE.MeshStandardMaterial({
      color: 0x9aa1a6,
      emissive: new THREE.Color("#4f9bff"),
      emissiveIntensity: 0.05,
      roughness: 0.5,
      metalness: 0.45,
    }),
    label(text, options = {}) {
      return new THREE.MeshStandardMaterial({ color: 0xffffff, map: labelTexture(text, options), roughness: 0.86 });
    },
    photo(kind) {
      return new THREE.MeshStandardMaterial({ color: 0xffffff, map: photoTexture(kind), roughness: 0.82 });
    },
    note(lines) {
      return new THREE.MeshStandardMaterial({ color: 0xffffff, map: noteTexture(lines), roughness: 0.95, side: THREE.DoubleSide });
    },
    screenMaterial: null,
  };
  materials.screenMaterial = materials.screen;
  materials.cutMap = cutMap;
  return materials;
}
