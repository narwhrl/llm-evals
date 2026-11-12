import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import { ERAS } from "./content.js";
import {
  canvasTexture,
  cityPhotoTexture,
  contactShadowTexture,
  drawingTexture,
  fabricTexture,
  gameBoxTexture,
  glowTexture,
  heightChartTexture,
  keyboardTexture,
  labelTexture,
  mousepadTexture,
  mulberry32,
  plaidTexture,
  plasterTexture,
  posterTexture,
  rugTexture,
  skyTexture,
  wallpaperTexture,
  woodTexture,
} from "./textures.js";

const DESK_TOP = 0.75;
const ROOM = { minX: -4.4, maxX: 4.4, minZ: -3.8, maxZ: 3.8, height: 3.35 };

const materials = {
  darkMetal: new THREE.MeshStandardMaterial({ color: 0x252321, roughness: 0.55, metalness: 0.55 }),
  blackPlastic: new THREE.MeshStandardMaterial({ color: 0x161615, roughness: 0.46, metalness: 0.1 }),
  softBlack: new THREE.MeshStandardMaterial({ color: 0x211f1d, roughness: 0.9 }),
  brass: new THREE.MeshStandardMaterial({ color: 0x9b7748, roughness: 0.35, metalness: 0.8 }),
  offWhite: new THREE.MeshStandardMaterial({ color: 0xd7cebc, roughness: 0.72 }),
  paper: new THREE.MeshStandardMaterial({ color: 0xe9e0ce, roughness: 0.88 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: 0x9fbac1,
    roughness: 0.06,
    metalness: 0,
    transparent: true,
    opacity: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  }),
  darkGlass: new THREE.MeshPhysicalMaterial({
    color: 0x6a7f86,
    roughness: 0.08,
    metalness: 0.05,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false,
  }),
};

const textureCache = new Map();
const cached = (key, factory) => {
  if (!textureCache.has(key)) textureCache.set(key, factory());
  return textureCache.get(key);
};

const getWood = (name) => {
  const options = {
    pale: { base: "#c4aa84", dark: "#8b704d", light: "#e1ccaa", seed: 11, contrast: 0.8 },
    oak: { base: "#9b7048", dark: "#624326", light: "#c69b68", seed: 21 },
    walnut: { base: "#563923", dark: "#2e1d12", light: "#8b5c38", seed: 31 },
    dark: { base: "#35271d", dark: "#1b130d", light: "#5b4230", seed: 41 },
    black: { base: "#211d19", dark: "#0d0b09", light: "#3b332b", seed: 51 },
    beige: { base: "#c8b58f", dark: "#9e8a64", light: "#e5d6b5", seed: 61, contrast: 0.55 },
  }[name];
  return cached(`wood-${name}`, () => woodTexture(options));
};

const woodMaterial = (name, repeatX = 1, repeatY = 1, extra = {}) => {
  const texture = getWood(name).clone();
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.66, metalness: 0.02, ...extra });
};

const standard = (options) => new THREE.MeshStandardMaterial({ roughness: 0.72, metalness: 0.02, ...options });

const rounded = (width, height, depth, radius = 0.02, segments = 2) =>
  new RoundedBoxGeometry(width, height, depth, segments, radius);

const mesh = (parent, geometry, material, options = {}) => {
  const object = new THREE.Mesh(geometry, material);
  if (options.position) object.position.set(...options.position);
  if (options.rotation) object.rotation.set(...options.rotation);
  if (options.scale) object.scale.set(...options.scale);
  if (options.castShadow) object.castShadow = true;
  if (options.receiveShadow) object.receiveShadow = true;
  if (options.name) object.name = options.name;
  if (options.renderOrder !== undefined) object.renderOrder = options.renderOrder;
  parent.add(object);
  return object;
};

const box = (parent, size, material, options = {}) =>
  mesh(parent, new THREE.BoxGeometry(...size), material, options);

const cylinder = (parent, radiusTop, radiusBottom, height, material, options = {}) =>
  mesh(parent, new THREE.CylinderGeometry(radiusTop, radiusBottom, height, options.segments ?? 20), material, {
    ...options,
    position: options.position,
  });

const plane = (parent, width, height, material, options = {}) =>
  mesh(parent, new THREE.PlaneGeometry(width, height, options.sx ?? 1, options.sy ?? 1), material, {
    ...options,
    position: options.position,
  });

const group = (parent, position = [0, 0, 0], rotation = [0, 0, 0]) => {
  const object = new THREE.Group();
  object.position.set(...position);
  object.rotation.set(...rotation);
  parent.add(object);
  return object;
};

const shadowPlane = (parent, x, z, width, depth, opacity = 0.35) => {
  const material = new THREE.MeshBasicMaterial({
    map: cached("contact-shadow", contactShadowTexture),
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const object = plane(parent, width, depth, material, {
    position: [x, 0.004, z],
    rotation: [-Math.PI / 2, 0, 0],
  });
  object.renderOrder = 1;
  return object;
};

const screenGeometry = (width, height, curve = 0, segments = 20) => {
  const geometry = new THREE.PlaneGeometry(width, height, segments, segments);
  if (curve > 0) {
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i) / (width / 2);
      const y = position.getY(i) / (height / 2);
      const z = curve * Math.max(0, 1 - x * x) * Math.max(0, 1 - y * y);
      position.setZ(i, z);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  }
  return geometry;
};

const fabricMaterial = (key, colors, repeatX = 1, repeatY = 1, extra = {}) => {
  const texture = cached(`fabric-${key}`, () => fabricTexture(colors)).clone();
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  return standard({ map: texture, roughness: 0.95, ...extra });
};

const plaidMaterial = (key, colors, extra = {}) => {
  const texture = cached(`plaid-${key}`, () => plaidTexture(...colors)).clone();
  return standard({ map: texture, roughness: 0.96, ...extra });
};

const buildScreenTexturePlaceholder = (text, accent = "#7cf0c8") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 512, 320);
  gradient.addColorStop(0, "#081214");
  gradient.addColorStop(1, "#14181a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 320);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fillRect(20, 20, 472, 38);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.22;
  ctx.fillRect(20, 78, 180, 210);
  ctx.globalAlpha = 1;
  ctx.fillStyle = "rgba(230,242,238,0.62)";
  ctx.font = '500 18px "PingFang SC", "Microsoft YaHei", sans-serif';
  ctx.fillText(text, 220, 110);
  ctx.fillStyle = "rgba(200,221,214,0.36)";
  ctx.font = '400 12px "SFMono-Regular", Consolas, monospace';
  ctx.fillText("STARPORT / AUXILIARY DISPLAY", 220, 138);
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.42;
  for (let i = 0; i < 14; i += 1) {
    const h = 5 + ((i * 17) % 38);
    ctx.fillRect(220 + i * 14, 244 - h, 8, h);
  }
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const buildSignTexture = (value, color = "#ffc77e") => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 512, 256);
  ctx.textAlign = "center";
  ctx.font = '600 108px "Songti SC", "STSong", serif';
  ctx.shadowColor = color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = color;
  ctx.fillText(value, 256, 150);
  ctx.globalAlpha = 0.18;
  ctx.fillRect(48, 190, 416, 2);
  ctx.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

const addGlowSprite = (parent, { position, color = 0xffc37a, scale = 1, opacity = 0.4 }) => {
  const material = new THREE.SpriteMaterial({
    map: cached(`glow-${color}`, () => glowTexture(`rgba(${(color >> 16) & 255},${(color >> 8) & 255},${color & 255},0.72)`)),
    color: 0xffffff,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sprite = new THREE.Sprite(material);
  sprite.position.set(...position);
  sprite.scale.set(scale, scale, 1);
  parent.add(sprite);
  return sprite;
};

const addContact = (parent, x, z, width, depth, opacity = 0.3) => shadowPlane(parent, x, z, width, depth, opacity);

const addRug = (era, parent) => {
  const sizes = {
    2005: [2.9, 2.0],
    2010: [3.2, 2.2],
    2015: [3.4, 2.4],
    2020: [3.8, 2.8],
    2025: [4.0, 3.0],
  }[era.year];
  const texture = rugTexture(era.year);
  texture.repeat.set(1, 1);
  const material = standard({ map: texture, roughness: 0.98, metalness: 0 });
  const shape = new THREE.Shape();
  const w = sizes[0];
  const h = sizes[1];
  const r = 0.1;
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  const rug = mesh(parent, new THREE.ShapeGeometry(shape, 8), material, {
    position: [0.1, 0.012, 0.25],
    rotation: [-Math.PI / 2, 0, 0],
    receiveShadow: true,
  });
  rug.name = "rug";
  const fringeMaterial = standard({ color: 0xd4c7ae, roughness: 1 });
  const fringe = new THREE.InstancedMesh(new THREE.BoxGeometry(0.009, 0.004, 0.1), fringeMaterial, 28);
  const fringeDummy = new THREE.Object3D();
  for (let i = 0; i < 14; i += 1) {
    const x = -w / 2 + 0.18 + (i * (w - 0.36)) / 13;
    fringeDummy.position.set(x + 0.1, 0.016, -h / 2 + 0.195);
    fringeDummy.rotation.set(0, 0.06, 0);
    fringeDummy.updateMatrix();
    fringe.setMatrixAt(i, fringeDummy.matrix);
    fringeDummy.position.set(x + 0.1, 0.016, h / 2 + 0.05 + 0.25);
    fringeDummy.rotation.set(0, -0.06, 0);
    fringeDummy.updateMatrix();
    fringe.setMatrixAt(14 + i, fringeDummy.matrix);
  }
  fringe.instanceMatrix.needsUpdate = true;
  parent.add(fringe);
  return rug;
};

const buildCurtains = (era, parent) => {
  const colors = {
    2005: { base: "#8798a6", dark: "#5e6d7c", light: "#a9b7c1" },
    2010: { base: "#b8a88f", dark: "#897b67", light: "#d3c4a9" },
    2015: { base: "#333d4a", dark: "#202831", light: "#53606b" },
    2020: { base: "#b7ad9c", dark: "#8c8171", light: "#d1c5b3" },
    2025: { base: "#8f6d52", dark: "#5d4534", light: "#b18b6d" },
  }[era.year];
  const material = fabricMaterial(`curtain-${era.year}`, colors, 1.4, 2.1, { side: THREE.DoubleSide });
  const rodMaterial = standard({ color: 0x252321, roughness: 0.55, metalness: 0.55 });
  cylinder(parent, 0.018, 0.018, 2.38, rodMaterial, {
    position: [-4.28, 2.72, -1.135],
    rotation: [Math.PI / 2, 0, 0],
    segments: 10,
  });
  const makePanel = (z, width, speed) => {
    const geometry = new THREE.PlaneGeometry(width, 1.62, 18, 10);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i += 1) {
      const x = position.getX(i);
      const y = position.getY(i);
      position.setZ(i, Math.sin((x / width) * Math.PI * 7 + speed) * 0.035 + Math.sin(y * 2.2) * 0.01);
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
    const panel = mesh(parent, geometry, material, {
      position: [-4.245, 1.83, z],
      rotation: [0, Math.PI / 2, 0],
      castShadow: true,
    });
    return panel;
  };
  const pulled = era.year >= 2020;
  makePanel(-2.02, pulled ? 0.32 : 0.62, 0.4);
  makePanel(-0.28, pulled ? 0.32 : 0.62, 1.7);
  const tieMaterial = standard({ color: era.year >= 2020 ? 0x9a795b : 0x6e7a84, roughness: 0.9 });
  if (era.year >= 2015) {
    [2.0, 3.9].forEach((z) => {
      box(parent, [0.04, 0.06, 0.11], tieMaterial, { position: [-4.21, 1.7, -1.135 + (z - 3) * 0.75] });
    });
  }
};

const buildWindowSill = (era, parent) => {
  const potMaterial = standard({ color: 0x9a6244, roughness: 0.9 });
  const leafMaterial = standard({ color: era.year >= 2020 ? 0x4b6441 : 0x6e7b4d, roughness: 0.86, side: THREE.DoubleSide });
  const smallPlant = (x, z, scale = 1) => {
    const p = group(parent, [x, 1.11, z]);
    cylinder(p, 0.055 * scale, 0.042 * scale, 0.09 * scale, potMaterial, { position: [0, 0.045 * scale, 0], segments: 14, castShadow: true });
    const stem = standard({ color: 0x544b32, roughness: 1 });
    cylinder(p, 0.006, 0.009, 0.17 * scale, stem, { position: [0, 0.14 * scale, 0], segments: 6 });
    for (let i = 0; i < 7; i += 1) {
      const leaf = mesh(p, new THREE.SphereGeometry(1, 8, 5), leafMaterial, {
        position: [
          Math.sin(i * 2.1) * 0.07 * scale,
          (0.16 + (i % 3) * 0.035) * scale,
          Math.cos(i * 1.8) * 0.07 * scale,
        ],
        rotation: [0.5 + i * 0.25, i * 0.9, 0.4],
        scale: [0.09 * scale, 0.018 * scale, 0.042 * scale],
        castShadow: true,
      });
      leaf.name = "leaf";
    }
  };
  if (era.year === 2005) {
    smallPlant(-4.2, -0.47, 0.9);
  } else if (era.year === 2010) {
    smallPlant(-4.2, -0.4, 0.85);
    smallPlant(-4.2, -1.75, 0.65);
  } else if (era.year === 2015) {
    smallPlant(-4.2, -0.42, 0.8);
    const bottle = standard({ color: 0x586043, roughness: 0.55 });
    cylinder(parent, 0.035, 0.045, 0.2, bottle, { position: [-4.22, 1.2, -1.8], segments: 12 });
  } else {
    smallPlant(-4.2, -0.37, 1);
    smallPlant(-4.2, -1.85, 0.8);
    if (era.year === 2025) {
      const books = standard({ color: 0x6b5643, roughness: 0.9 });
      box(parent, [0.16, 0.035, 0.03], books, { position: [-4.2, 1.16, -1.25] });
      box(parent, [0.14, 0.03, 0.028], standard({ color: 0x9b8468, roughness: 0.9 }), {
        position: [-4.2, 1.195, -1.25],
      });
    }
  }
};

const buildWindowSky = (era, parent) => {
  const texture = skyTexture(era.year);
  const material = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false });
  const sky = plane(parent, 2.02, 1.43, material, {
    position: [-4.685, 1.82, -1.135],
    rotation: [0, Math.PI / 2, 0],
  });
  sky.name = "window-sky";
  addGlowSprite(parent, {
    position: [-4.5, 2.05, -1.135],
    color: era.year >= 2020 ? 0xffd19a : 0xffe4b8,
    scale: 2.2,
    opacity: era.year >= 2020 ? 0.28 : 0.38,
  });
};

const buildShell = (scene) => {
  const root = group(scene, [0, 0, 0]);
  root.name = "room";
  const plinth = box(root, [9.5, 0.48, 8.6], woodMaterial("dark", 3, 3), {
    position: [0, -0.25, 0],
    receiveShadow: true,
    castShadow: true,
  });
  plinth.name = "plinth";
  const plinthTrim = standard({ color: 0x1c1611, roughness: 0.8, metalness: 0.15 });
  box(root, [9.56, 0.06, 8.66], plinthTrim, { position: [0, -0.49, 0] });
  const plaqueMaterial = new THREE.MeshStandardMaterial({
    map: labelTexture("2005  ·  2025", "#d8c6a5", "#4d3b28"),
    roughness: 0.52,
    metalness: 0.1,
  });
  plane(root, 0.56, 0.14, plaqueMaterial, { position: [0, -0.245, 4.305] });

  const plasterMap = cached("plaster", () => plasterTexture("#c8bda9", 9));
  const wallMaterial = standard({ map: plasterMap, color: 0xd8cdb9, roughness: 0.95 });
  const outerWallMaterial = standard({ color: 0x6e6253, roughness: 0.94 });

  const backWall = mesh(root, new THREE.BoxGeometry(9.0, ROOM.height, 0.22), [outerWallMaterial, outerWallMaterial, outerWallMaterial, outerWallMaterial, wallMaterial, outerWallMaterial], {
    position: [0, ROOM.height / 2, -3.91],
    castShadow: true,
    receiveShadow: true,
  });
  backWall.name = "back-wall";

  const leftWallMaterial = wallMaterial;
  const wallSegment = (z, width, height, y) => {
    const segment = box(root, [0.22, height, width], leftWallMaterial, {
      position: [-4.51, y, z],
      castShadow: true,
      receiveShadow: true,
    });
    segment.name = "left-wall-segment";
    return segment;
  };
  wallSegment(-2.96, 1.68, ROOM.height, ROOM.height / 2);
  wallSegment(1.825, 3.95, ROOM.height, ROOM.height / 2);
  wallSegment(-1.135, 1.97, 1.12, 0.56);
  wallSegment(-1.135, 1.97, 0.83, 2.935);
  const leftWallTopStraight = box(root, [0.22, 0.08, 7.6], outerWallMaterial, {
    position: [-4.51, ROOM.height + 0.03, 0],
  });
  leftWallTopStraight.name = "left-wall-cap";
  const backWallCap = box(root, [9.04, 0.08, 0.26], outerWallMaterial, {
    position: [0, ROOM.height + 0.03, -3.91],
  });
  backWallCap.name = "back-wall-cap";

  const floorMaterials = [
    woodMaterial("oak", 1.2, 2.4, { roughness: 0.7, color: 0xf0d3b0 }),
    woodMaterial("oak", 1.2, 2.4, { roughness: 0.7, color: 0xdcb995 }),
    woodMaterial("pale", 1.2, 2.4, { roughness: 0.75, color: 0xd0b18c }),
    woodMaterial("oak", 1.2, 2.4, { roughness: 0.72, color: 0xbf9b75 }),
  ];
  const random = mulberry32(901);
  const plankBatches = floorMaterials.map(() => []);
  let x = ROOM.minX + 0.25;
  let column = 0;
  while (x < ROOM.maxX) {
    const width = 0.39 + random() * 0.07;
    let z = ROOM.minZ;
    while (z < ROOM.maxZ) {
      const length = Math.min(ROOM.maxZ - z, 1.25 + random() * 1.15);
      const centerZ = z + length / 2;
      const materialIndex =
        ((column + Math.floor(z * 3)) % floorMaterials.length + floorMaterials.length) % floorMaterials.length;
      const geometry = new THREE.BoxGeometry(width - 0.008, 0.045, length - 0.009);
      geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(x + width / 2, -0.0225, centerZ));
      plankBatches[materialIndex].push(geometry);
      z += length + 0.012;
    }
    x += width + 0.008;
    column += 1;
  }
  plankBatches.forEach((geometries, index) => {
    if (!geometries.length) return;
    const merged = mergeGeometries(geometries, false);
    geometries.forEach((geometry) => geometry.dispose());
    mesh(root, merged, floorMaterials[index], { receiveShadow: true });
  });
  const rugUnderlay = standard({ color: 0x33271d, roughness: 1 });
  box(root, [9.0, 0.012, 7.6], rugUnderlay, { position: [0, -0.044, 0], receiveShadow: true });

  const trimMaterial = standard({ color: 0x8b7d69, roughness: 0.7 });
  box(root, [8.96, 0.11, 0.06], trimMaterial, { position: [0, 0.08, -3.78] });
  box(root, [0.06, 0.11, 7.56], trimMaterial, { position: [-4.38, 0.08, 0] });
  box(root, [8.96, 0.055, 0.05], trimMaterial, { position: [0, 3.23, -3.78] });
  box(root, [0.05, 0.055, 7.56], trimMaterial, { position: [-4.38, 3.23, 0] });
  const pendantCord = cylinder(root, 0.007, 0.007, 0.45, materials.darkMetal, {
    position: [0.35, 3.12, 0.45],
    segments: 6,
  });
  pendantCord.name = "pendant-cord";

  const skirtingMaterial = standard({ color: 0xb9a88e, roughness: 0.8 });
  box(root, [8.9, 0.09, 0.035], skirtingMaterial, { position: [0, 0.045, -3.795] });
  box(root, [0.035, 0.09, 7.5], skirtingMaterial, { position: [-4.39, 0.045, 0] });

  // The window frame and sill are part of the shell; each era supplies its own sky.
  const sill = box(root, [0.28, 0.06, 2.2], woodMaterial("oak", 1, 3), {
    position: [-4.23, 1.085, -1.135],
    castShadow: true,
    receiveShadow: true,
  });
  sill.name = "window-sill-static";
  const frameMaterial = standard({ color: 0x8b7d69, roughness: 0.7 });
  for (const z of [-2.085, -0.185]) {
    box(root, [0.12, 1.45, 0.055], frameMaterial, { position: [-4.34, 1.82, z] });
  }
  for (const y of [1.12, 2.52]) {
    box(root, [0.12, 0.055, 1.96], frameMaterial, { position: [-4.34, y, -1.135] });
  }
  box(root, [0.075, 1.4, 0.035], frameMaterial, { position: [-4.335, 1.82, -1.135] });
  box(root, [0.075, 0.035, 1.9], frameMaterial, { position: [-4.335, 1.82, -1.135] });
  const glass = plane(
    root,
    1.98,
    1.39,
    new THREE.MeshPhysicalMaterial({
      color: 0xbdd7da,
      roughness: 0.04,
      metalness: 0,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
    { position: [-4.39, 1.82, -1.135], rotation: [0, Math.PI / 2, 0] }
  );
  glass.name = "window-glass-static";
  return root;
};

const makeClickable = (interactives, parent, id, eraYear, size, position, rotation = [0, 0, 0]) => {
  const material = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
    colorWrite: false,
  });
  const hitbox = mesh(parent, new THREE.BoxGeometry(...size), material, { position, rotation });
  hitbox.name = `hitbox-${id}`;
  const entry = { id, eraYear, mesh: hitbox };
  hitbox.userData.interaction = entry;
  interactives.push(entry);
  return entry;
};

const registerMesh = (interactives, object, id, eraYear) => {
  const entry = { id, eraYear, mesh: object };
  object.userData.interaction = entry;
  interactives.push(entry);
  return entry;
};

export const createWorld = (scene, painters) => {
  const root = buildShell(scene);
  const interactives = [];
  const eraGroups = [];
  const keepsakes = {};
  const spinners = [];
  const random = mulberry32(20050611);

  const eraData = ERAS.map((era) => {
    const groupObject = group(root);
    groupObject.name = `era-${era.year}`;
    const weight = { value: era.year === 2005 ? 1 : 0 };
    const materials = new Set();
    const context = {
      era,
      parent: groupObject,
      weight,
      materials,
      random: mulberry32(era.year * 13),
      spinners,
      register: (id, size, position, rotation) => makeClickable(interactives, groupObject, id, era.year, size, position, rotation),
      registerMesh: (object, id) => registerMesh(interactives, object, id, era.year),
      screen: painters.get(era.year),
    };
    buildEra(context);
    groupObject.traverse((object) => {
      if (!object.isMesh) return;
      object.userData.baseCastShadow = object.castShadow;
      const list = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of list) {
        if (!material || materials.has(material)) continue;
        materials.add(material);
        if (material.userData.baseOpacity === undefined) material.userData.baseOpacity = material.opacity;
        if (material.userData.baseTransparent === undefined) material.userData.baseTransparent = material.transparent;
        if (material.userData.baseDepthWrite === undefined) material.userData.baseDepthWrite = material.depthWrite;
      }
    });
    eraGroups.push({ era, group: groupObject, weight, materials });
    return era;
  });

  buildKeepsakes({ root, interactives, keepsakes });

  const applyWeight = (eraGroup, value) => {
    const w = Math.max(0, Math.min(1, value));
    eraGroup.group.visible = w > 0.002;
    for (const material of eraGroup.materials) {
      const base = material.userData.baseOpacity ?? 1;
      const shouldFade = w < 0.999;
      if (shouldFade && !material.transparent) {
        material.transparent = true;
        material.needsUpdate = true;
      } else if (!shouldFade && material.transparent && !material.userData.baseTransparent) {
        material.transparent = false;
        material.needsUpdate = true;
      }
      material.opacity = base * w;
    }
  };

  const update = ({ dt, eraIndex }) => {
    const target = eraIndex;
    eraGroups.forEach((eraGroup, index) => {
      const goal = index === target ? 1 : 0;
      const current = eraGroup.weight.value;
      const next = current + (goal - current) * Math.min(1, dt * 5.6);
      eraGroup.weight.value = next < 0.001 ? 0 : next > 0.999 ? 1 : next;
      applyWeight(eraGroup, eraGroup.weight.value);
    });
    updateKeepsakes(keepsakes, ERAS[target].year, dt);
    for (const entry of interactives) {
      const eraWeight = entry.eraYear ? eraGroups.find((item) => item.era.year === entry.eraYear)?.weight.value ?? 0 : 1;
      entry.active = eraWeight > 0.55;
    }
    for (const spinner of spinners) spinner.object.rotation.z += spinner.speed * dt;
  };

  const getActiveInteractions = () => interactives.filter((entry) => entry.active && entry.mesh.visible);

  return {
    root,
    eraGroups,
    interactives,
    keepsakes,
    update,
    getActiveInteractions,
    random,
  };
};

const buildCat = (parent) => {
  const cat = group(parent);
  const fur = standard({ color: 0xb76b35, roughness: 0.98 });
  const furDark = standard({ color: 0x8f4e24, roughness: 1 });
  const cream = standard({ color: 0xd6b58e, roughness: 1 });
  const body = mesh(cat, new THREE.SphereGeometry(1, 18, 14), fur, {
    position: [0, 0.15, 0],
    scale: [0.095, 0.145, 0.085],
    castShadow: true,
  });
  body.name = "cat-body";
  mesh(cat, new THREE.SphereGeometry(1, 16, 12), fur, {
    position: [0, 0.292, 0.012],
    scale: [0.088, 0.083, 0.08],
    castShadow: true,
  });
  mesh(cat, new THREE.SphereGeometry(1, 14, 10), cream, {
    position: [0, 0.12, 0.064],
    scale: [0.06, 0.08, 0.025],
  });
  mesh(cat, new THREE.SphereGeometry(1, 12, 8), cream, {
    position: [0, 0.27, 0.079],
    scale: [0.034, 0.024, 0.02],
  });
  const earGeometry = new THREE.ConeGeometry(0.035, 0.075, 4);
  const earLeft = mesh(cat, earGeometry, furDark, {
    position: [-0.048, 0.365, 0.005],
    rotation: [0.08, 0.25, -0.2],
    castShadow: true,
  });
  earLeft.name = "cat-ear";
  const earRight = mesh(cat, earGeometry, furDark, {
    position: [0.05, 0.36, 0.005],
    rotation: [0.06, -0.25, 0.33],
    castShadow: true,
  });
  earRight.name = "cat-ear";
  const eyeMaterial = standard({ color: 0x21140e, roughness: 0.34 });
  mesh(cat, new THREE.SphereGeometry(0.011, 10, 8), eyeMaterial, { position: [-0.033, 0.307, 0.086] });
  mesh(cat, new THREE.SphereGeometry(0.011, 10, 8), eyeMaterial, { position: [0.033, 0.307, 0.086] });
  mesh(cat, new THREE.SphereGeometry(0.0032, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffe3b9 }), {
    position: [-0.03, 0.311, 0.095],
  });
  mesh(cat, new THREE.SphereGeometry(0.0032, 6, 4), new THREE.MeshBasicMaterial({ color: 0xffe3b9 }), {
    position: [0.036, 0.311, 0.095],
  });
  mesh(cat, new THREE.SphereGeometry(0.008, 8, 6), standard({ color: 0x4b2b20, roughness: 0.5 }), {
    position: [0, 0.286, 0.099],
    scale: [1.1, 0.8, 0.8],
  });
  for (const [x, y, z, rot] of [
    [-0.068, 0.035, 0.046, 0.65],
    [0.068, 0.035, 0.046, -0.65],
  ]) {
    mesh(cat, new THREE.SphereGeometry(1, 10, 8), fur, {
      position: [x, y, z],
      rotation: [0, 0, rot],
      scale: [0.035, 0.023, 0.04],
    });
  }
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.065, 0.105, -0.04),
    new THREE.Vector3(0.14, 0.09, -0.075),
    new THREE.Vector3(0.185, 0.048, -0.04),
    new THREE.Vector3(0.155, 0.018, 0.01),
  ]);
  mesh(cat, new THREE.TubeGeometry(tailCurve, 18, 0.018, 6, false), fur, { castShadow: true });
  const stitch = standard({ color: 0x6f4324, roughness: 1 });
  box(cat, [0.002, 0.028, 0.002], stitch, { position: [0.052, 0.23, 0.051], rotation: [0.2, 0, -0.55] });
  box(cat, [0.002, 0.028, 0.002], stitch, { position: [0.058, 0.225, 0.051], rotation: [0.2, 0, -0.55] });
  return cat;
};

const buildMug = (parent) => {
  const mug = group(parent);
  const enamel = standard({ color: 0xe8e4d3, roughness: 0.34, metalness: 0.06 });
  const blue = standard({ color: 0x4b7180, roughness: 0.45, metalness: 0.08 });
  const body = cylinder(mug, 0.052, 0.046, 0.115, enamel, { position: [0, 0.058, 0], segments: 28, castShadow: true });
  body.name = "mug-body";
  cylinder(mug, 0.054, 0.054, 0.011, blue, { position: [0, 0.118, 0], segments: 28 });
  const coffee = new THREE.MeshStandardMaterial({ color: 0x392116, roughness: 0.12, metalness: 0.1 });
  cylinder(mug, 0.046, 0.046, 0.003, coffee, { position: [0, 0.116, 0], segments: 24 });
  const handle = mesh(mug, new THREE.TorusGeometry(0.043, 0.008, 8, 18, Math.PI * 1.25), enamel, {
    position: [0.061, 0.065, 0],
    rotation: [0, 0.15, -0.35],
  });
  handle.name = "mug-handle";
  const chip = mesh(mug, new THREE.SphereGeometry(1, 8, 5), standard({ color: 0x80817a, roughness: 0.75, metalness: 0.2 }), {
    position: [-0.038, 0.122, 0.034],
    scale: [0.011, 0.004, 0.007],
  });
  chip.name = "mug-chip";
  return mug;
};

const buildGameBox = (parent) => {
  const boxObject = group(parent);
  const paper = standard({ color: 0x25211b, roughness: 0.78 });
  const body = box(boxObject, [0.205, 0.27, 0.036], paper, { position: [0, 0.135, 0], castShadow: true });
  body.name = "first-game-box";
  const cover = plane(boxObject, 0.19, 0.255, new THREE.MeshStandardMaterial({ map: gameBoxTexture(2005), roughness: 0.78 }), {
    position: [0, 0.135, 0.0185],
  });
  cover.name = "first-game-cover";
  box(boxObject, [0.205, 0.022, 0.038], standard({ color: 0x66543c, roughness: 0.9 }), { position: [0, 0.012, 0] });
  return boxObject;
};

const KEEPSAKE_LAYOUT = {
  cat: {
    2005: { position: [3.02, 0.72, -2.38], rotation: [0, -0.48, 0] },
    2010: { position: [-2.05, 1.578, -3.58], rotation: [0, 0.28, 0] },
    2015: { position: [-0.68, 0.755, -3.0], rotation: [0, -0.22, 0] },
    2020: { position: [1.12, 0.735, -3.39], rotation: [0, 0.16, 0] },
    2025: { position: [1.1, 0.748, -3.38], rotation: [0, 0.2, 0] },
  },
  mug: {
    2005: { position: [-0.92, 0.756, -3.05], rotation: [0, 0.25, 0] },
    2010: { position: [-0.83, 0.756, -3.08], rotation: [0, -0.18, 0] },
    2015: { position: [-0.66, 0.756, -3.02], rotation: [0, 0.12, 0] },
    2020: { position: [-0.33, 0.756, -2.98], rotation: [0, -0.22, 0] },
    2025: { position: [-0.24, 0.756, -2.95], rotation: [0, 0.2, 0] },
  },
  gamebox: {
    2005: { position: [-2.2, 0.756, -3.0], rotation: [0, 0.24, -0.04] },
    2010: { position: [-2.54, 1.578, -3.58], rotation: [0, 0.15, 0] },
    2015: { position: [-2.55, 1.548, -3.58], rotation: [0, 0.12, 0] },
    2020: { position: [1.67, 0.735, -3.38], rotation: [0, -0.12, 0] },
    2025: { position: [1.55, 0.748, -3.36], rotation: [0, -0.08, 0] },
  },
};

const buildKeepsakes = ({ root, interactives, keepsakes }) => {
  const drawingMaterial = new THREE.MeshStandardMaterial({
    map: drawingTexture(),
    roughness: 0.9,
    emissive: 0x302314,
    emissiveIntensity: 0.08,
  });
  const drawing = plane(root, 0.76, 0.56, drawingMaterial, {
    position: [-1.25, 2.93, -3.782],
  });
  drawing.name = "space-cat-drawing";
  registerMesh(interactives, drawing, "drawing", null);
  makeClickable(interactives, root, "drawing", null, [0.86, 0.66, 0.12], [-1.25, 2.93, -3.72]);
  keepsakes.drawing = { object: drawing };

  const cat = buildCat(root);
  makeClickable(interactives, cat, "cat", null, [0.28, 0.45, 0.28], [0, 0.22, 0.01]);
  keepsakes.cat = { object: cat, layout: KEEPSAKE_LAYOUT.cat };

  const mug = buildMug(root);
  makeClickable(interactives, mug, "mug", null, [0.18, 0.18, 0.18], [0.01, 0.07, 0]);
  keepsakes.mug = { object: mug, layout: KEEPSAKE_LAYOUT.mug };

  const firstBox = buildGameBox(root);
  makeClickable(interactives, firstBox, "gamebox", null, [0.3, 0.34, 0.16], [0, 0.14, 0]);
  keepsakes.gamebox = { object: firstBox, layout: KEEPSAKE_LAYOUT.gamebox };

  for (const item of Object.values(keepsakes)) {
    if (!item.layout) continue;
    const first = item.layout[2005];
    item.object.position.set(...first.position);
    item.object.rotation.set(...first.rotation);
    item.current = { position: new THREE.Vector3(...first.position), rotation: new THREE.Euler(...first.rotation) };
  }
};

const dampValue = (current, target, lambda, dt) => target + (current - target) * Math.exp(-lambda * dt);

const updateKeepsakes = (keepsakes, year, dt) => {
  for (const [id, item] of Object.entries(keepsakes)) {
    if (!item.layout) continue;
    const layout = item.layout[year] ?? item.layout[2025];
    item.object.position.x = dampValue(item.object.position.x, layout.position[0], 7, dt);
    item.object.position.y = dampValue(item.object.position.y, layout.position[1], 7, dt);
    item.object.position.z = dampValue(item.object.position.z, layout.position[2], 7, dt);
    item.object.rotation.x = dampValue(item.object.rotation.x, layout.rotation[0], 7, dt);
    item.object.rotation.y = dampValue(item.object.rotation.y, layout.rotation[1], 7, dt);
    item.object.rotation.z = dampValue(item.object.rotation.z, layout.rotation[2], 7, dt);
  }
};

const SPINE_COLORS = [0x8e4d3d, 0x415d68, 0xa9885b, 0x4c5e46, 0x6f5a76, 0xb5a58a, 0x3e4447, 0x8a6b3e];

const addBooks = (ctx, { x, y, z, width = 0.9, depth = 0.17, height = 0.23, count = 10, leanLast = true }) => {
  const { parent, random } = ctx;
  const books = [];
  let cursor = 0;
  for (let i = 0; i < count; i += 1) {
    const thickness = 0.022 + random() * 0.035;
    if (cursor + thickness > width) break;
    const h = height * (0.72 + random() * 0.36);
    const color = SPINE_COLORS[Math.floor(random() * SPINE_COLORS.length)];
    books.push({
      x: x + cursor + thickness / 2,
      y: y + h / 2,
      z,
      width: thickness,
      height: h,
      depth: depth * (0.76 + random() * 0.2),
      color,
      rotation: i === count - 1 && leanLast ? 0.12 : 0,
    });
    cursor += thickness + 0.003;
  }
  if (!books.length) return;
  const instance = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1, 1, 1),
    standard({ color: 0xffffff, roughness: 0.88 }),
    books.length
  );
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  books.forEach((book, index) => {
    dummy.position.set(book.x, book.y, book.z);
    dummy.rotation.set(0, 0, book.rotation);
    dummy.scale.set(book.width, book.height, book.depth);
    dummy.updateMatrix();
    instance.setMatrixAt(index, dummy.matrix);
    instance.setColorAt(index, color.setHex(book.color));
  });
  instance.instanceMatrix.needsUpdate = true;
  if (instance.instanceColor) instance.instanceColor.needsUpdate = true;
  parent.add(instance);
};

const addCaseRow = (ctx, { x, y, z, width = 0.9, count = 12, vertical = false, height = 0.19 }) => {
  const { parent, random } = ctx;
  const colors = [0x3d5e6b, 0x735141, 0x4b5a42, 0x6a5b74, 0x8c744c, 0x313c44, 0x8e5f4a, 0x4b4b52];
  const cases = [];
  let cursor = 0;
  for (let i = 0; i < count; i += 1) {
    const thickness = 0.014 + random() * 0.014;
    if (cursor + thickness > width) break;
    const h = height * (0.82 + random() * 0.25);
    cases.push({
      x: x + cursor + thickness / 2,
      y: y + h / 2,
      width: thickness,
      height: h,
      color: colors[Math.floor(random() * colors.length)],
    });
    cursor += thickness + 0.002;
  }
  if (cases.length) {
    const instance = new THREE.InstancedMesh(
      new THREE.BoxGeometry(1, 1, 1),
      standard({ color: 0xffffff, roughness: 0.72 }),
      cases.length
    );
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    cases.forEach((item, index) => {
      dummy.position.set(item.x, item.y, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(item.width, item.height, 0.135);
      dummy.updateMatrix();
      instance.setMatrixAt(index, dummy.matrix);
      instance.setColorAt(index, color.setHex(item.color));
    });
    instance.instanceMatrix.needsUpdate = true;
    if (instance.instanceColor) instance.instanceColor.needsUpdate = true;
    parent.add(instance);
  }
  if (vertical) {
    for (let i = 0; i < 3; i += 1) {
      box(parent, [width * 0.9, 0.014, 0.16], standard({ color: SPINE_COLORS[i], roughness: 0.8 }), {
        position: [x + width / 2, y + height + i * 0.022, z],
      });
    }
  }
};

const addFigure = (ctx, { x, y, z, scale = 1, color = 0xc5764c, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const bodyMaterial = standard({ color, roughness: 0.48, metalness: 0.12 });
  const dark = standard({ color: 0x2a2521, roughness: 0.45, metalness: 0.2 });
  const light = standard({ color: 0xd8cbb7, roughness: 0.5 });
  cylinder(g, 0.04 * scale, 0.048 * scale, 0.03, dark, { position: [0, 0.015 * scale, 0], segments: 16 });
  const torso = mesh(g, new THREE.CapsuleGeometry(0.042 * scale, 0.1 * scale, 4, 8), bodyMaterial, {
    position: [0, 0.12 * scale, 0],
    scale: [1, 1, 0.75],
    castShadow: true,
  });
  torso.rotation.z = 0.04;
  mesh(g, new THREE.SphereGeometry(0.045 * scale, 10, 8), light, { position: [0, 0.22 * scale, 0] });
  for (const side of [-1, 1]) {
    mesh(g, new THREE.CapsuleGeometry(0.018 * scale, 0.1 * scale, 3, 6), bodyMaterial, {
      position: [side * 0.055 * scale, 0.12 * scale, 0],
      rotation: [0, 0, side * 0.2],
    });
    mesh(g, new THREE.CapsuleGeometry(0.022 * scale, 0.09 * scale, 3, 6), dark, {
      position: [side * 0.025 * scale, 0.035 * scale, 0],
      rotation: [0, 0, side * 0.05],
    });
  }
  box(g, [0.11 * scale, 0.018 * scale, 0.04 * scale], light, { position: [0, 0.17 * scale, 0.034 * scale] });
  return g;
};

const addController = (ctx, { x, y, z, color = 0x242323, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const plastic = standard({ color, roughness: 0.5 });
  const body = mesh(g, rounded(0.15, 0.035, 0.07, 0.016, 2), plastic, { castShadow: true });
  body.rotation.x = 0;
  for (const side of [-1, 1]) {
    mesh(g, new THREE.CapsuleGeometry(0.028, 0.06, 3, 8), plastic, {
      position: [side * 0.078, -0.012, 0.02],
      rotation: [0.25, 0, side * 0.58],
    });
    cylinder(g, 0.015, 0.015, 0.018, standard({ color: 0x111111, roughness: 0.6 }), {
      position: [side * 0.032, 0.022, 0.022],
      segments: 12,
    });
  }
  for (let i = 0; i < 4; i += 1) {
    mesh(g, new THREE.SphereGeometry(0.0075, 8, 6), standard({ color: i === 0 ? 0xd1a05e : 0x4a4a49, roughness: 0.5 }), {
      position: [0.045 + (i % 2) * 0.018, 0.02, -0.015 + Math.floor(i / 2) * 0.022],
    });
  }
  box(g, [0.03, 0.007, 0.013], standard({ color: 0x0b0b0b, roughness: 0.4 }), { position: [0, 0.019, 0.021] });
  return g;
};

const addHeadphones = (ctx, { x, y, z, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const plastic = standard({ color: 0x1e2021, roughness: 0.5, metalness: 0.16 });
  const pad = standard({ color: 0x4d4037, roughness: 0.86 });
  mesh(g, new THREE.TorusGeometry(0.13, 0.016, 8, 20, Math.PI), plastic, {
    position: [0, 0.25, 0],
    rotation: [0, 0, 0],
  });
  for (const side of [-1, 1]) {
    cylinder(g, 0.065, 0.065, 0.045, plastic, {
      position: [side * 0.13, 0.18, 0],
      rotation: [0, 0, Math.PI / 2],
      segments: 18,
    });
    cylinder(g, 0.049, 0.049, 0.052, pad, {
      position: [side * 0.107, 0.18, 0],
      rotation: [0, 0, Math.PI / 2],
      segments: 18,
    });
  }
  return g;
};

const addPlant = (ctx, { x, y, z, scale = 1, potColor = 0x8c5b43, leaves = 10 }) => {
  const { parent, random } = ctx;
  const g = group(parent, [x, y, z]);
  const pot = standard({ color: potColor, roughness: 0.88 });
  const soil = standard({ color: 0x2b2118, roughness: 1 });
  const leafMaterial = standard({ color: 0x4b683f, roughness: 0.83, side: THREE.DoubleSide });
  const stemMaterial = standard({ color: 0x4e4b30, roughness: 0.9 });
  cylinder(g, 0.11 * scale, 0.085 * scale, 0.18 * scale, pot, { position: [0, 0.09 * scale, 0], segments: 18, castShadow: true });
  cylinder(g, 0.095 * scale, 0.095 * scale, 0.008, soil, { position: [0, 0.181 * scale, 0], segments: 16 });
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.32, 0.05, 0.4, 0.55, 0, 1);
  shape.bezierCurveTo(-0.4, 0.55, -0.32, 0.05, 0, 0);
  const leafGeometry = new THREE.ShapeGeometry(shape, 8);
  const leafMatrices = [];
  const stemGeometries = [];
  const leafDummy = new THREE.Object3D();
  for (let i = 0; i < leaves; i += 1) {
    const angle = (i / leaves) * Math.PI * 2 + random() * 0.4;
    const reach = (0.16 + random() * 0.24) * scale;
    const height = (0.22 + random() * 0.32) * scale;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.17 * scale, 0),
      new THREE.Vector3(Math.cos(angle) * reach * 0.3, height * 0.6, Math.sin(angle) * reach * 0.3),
      new THREE.Vector3(Math.cos(angle) * reach * 0.75, height, Math.sin(angle) * reach * 0.75),
    ]);
    stemGeometries.push(new THREE.TubeGeometry(curve, 8, 0.005 * scale, 4, false));
    leafDummy.position.set(Math.cos(angle) * reach * 0.8, height, Math.sin(angle) * reach * 0.8);
    leafDummy.rotation.set(-0.35 + random() * 0.6, -angle + Math.PI / 2, random() * 0.5 - 0.25);
    leafDummy.scale.set(0.2 * scale, 0.28 * scale, 0.2 * scale);
    leafDummy.updateMatrix();
    leafMatrices.push(leafDummy.matrix.clone());
  }
  const mergedStems = mergeGeometries(stemGeometries, false);
  stemGeometries.forEach((geometry) => geometry.dispose());
  mesh(g, mergedStems, stemMaterial);
  const leafInstances = new THREE.InstancedMesh(leafGeometry, leafMaterial, leafMatrices.length);
  leafMatrices.forEach((matrix, index) => leafInstances.setMatrixAt(index, matrix));
  leafInstances.instanceMatrix.needsUpdate = true;
  leafInstances.name = "leaves";
  g.add(leafInstances);
  return g;
};

const addConsole = (ctx, { x, y, z, variant = 2020, scale = 1, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  if (variant === 2010) {
    const white = standard({ color: 0xd9d7ce, roughness: 0.55 });
    const dark = standard({ color: 0x252626, roughness: 0.52 });
    box(g, [0.42 * scale, 0.07 * scale, 0.28 * scale], white, { position: [0, 0.035 * scale, 0], castShadow: true });
    box(g, [0.38 * scale, 0.045 * scale, 0.2 * scale], dark, { position: [0, 0.085 * scale, 0], castShadow: true });
    cylinder(g, 0.11 * scale, 0.11 * scale, 0.055 * scale, dark, { position: [0.04 * scale, 0.11 * scale, 0], segments: 24 });
    addController(ctx, { x: x + 0.5 * scale, y, z: z + 0.16, color: 0xd2d0c6, rotY: 0.4 });
  } else if (variant === 2015) {
    const white = standard({ color: 0xe1ded4, roughness: 0.58 });
    const dark = standard({ color: 0x252423, roughness: 0.4 });
    box(g, [0.22 * scale, 0.035 * scale, 0.16 * scale], white, { position: [0, 0.018 * scale, 0], castShadow: true });
    box(g, [0.17 * scale, 0.02 * scale, 0.13 * scale], dark, { position: [0, 0.045 * scale, 0], rotation: [0.1, 0, 0] });
    for (const side of [-1, 1]) {
      mesh(g, new THREE.CapsuleGeometry(0.025 * scale, 0.08 * scale, 3, 6), dark, {
        position: [side * 0.1 * scale, 0.035 * scale, 0],
        rotation: [0, 0, Math.PI / 2],
      });
    }
  } else {
    const white = standard({ color: 0xe4e1d8, roughness: 0.55 });
    const dark = standard({ color: 0x1b1b1d, roughness: 0.35 });
    box(g, [0.26 * scale, 0.42 * scale, 0.12 * scale], white, { position: [0, 0.21 * scale, 0], castShadow: true });
    box(g, [0.025 * scale, 0.36 * scale, 0.13 * scale], dark, { position: [0.06 * scale, 0.21 * scale, 0.002] });
    box(g, [0.2 * scale, 0.018 * scale, 0.1 * scale], dark, { position: [0, 0.42 * scale, 0] });
    addController(ctx, { x: x + 0.24 * scale, y, z: z + 0.16, color: 0xdedbd2, rotY: 0.45 });
  }
  ctx.register("console", [0.48 * scale, 0.5 * scale, 0.4 * scale], [x, y + 0.2 * scale, z + 0.02]);
  return g;
};

const addCable = (parent, points, radius = 0.006, color = 0x171615) => {
  const curve = new THREE.CatmullRomCurve3(points.map((point) => new THREE.Vector3(...point)));
  const geometry = new THREE.TubeGeometry(curve, 24, radius, 5, false);
  return mesh(parent, geometry, standard({ color, roughness: 0.72, metalness: 0.05 }));
};

const addPoster = (ctx, { texture, x, y, z = -3.775, width = 0.58, height = 0.8, frame = false, tape = true, rotation = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, 0, rotation]);
  const paperTexture = texture;
  const material = new THREE.MeshStandardMaterial({
    map: paperTexture,
    roughness: 0.88,
    metalness: 0,
    emissive: 0xffffff,
    emissiveMap: paperTexture,
    emissiveIntensity: 0.08,
  });
  plane(g, width, height, material, { position: [0, 0, 0] });
  if (frame) {
    const frameMaterial = standard({ color: 0x4d3b29, roughness: 0.62 });
    const thickness = 0.03;
    box(g, [width + thickness * 2, thickness, 0.03], frameMaterial, { position: [0, height / 2 + thickness / 2, 0.006] });
    box(g, [width + thickness * 2, thickness, 0.03], frameMaterial, { position: [0, -height / 2 - thickness / 2, 0.006] });
    box(g, [thickness, height + thickness * 2, 0.03], frameMaterial, { position: [-width / 2 - thickness / 2, 0, 0.006] });
    box(g, [thickness, height + thickness * 2, 0.03], frameMaterial, { position: [width / 2 + thickness / 2, 0, 0.006] });
    plane(g, width - 0.04, height - 0.04, standard({ color: 0xe9ddc6, roughness: 0.9 }), { position: [0, 0, -0.002] });
  }
  if (tape) {
    const tapeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8cbae,
      roughness: 0.8,
      transparent: true,
      opacity: 0.62,
    });
    for (const [tx, ty, rz] of [
      [-width / 2 + 0.04, height / 2 - 0.02, 0.55],
      [width / 2 - 0.04, height / 2 - 0.02, -0.5],
    ]) {
      plane(g, 0.09, 0.025, tapeMaterial, { position: [tx, ty, 0.008], rotation: [0, 0, rz] });
    }
  }
  return g;
};

const addWallFrame = (ctx, { x, y, width = 0.32, height = 0.25, variant = 0, z = -3.775 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z]);
  const frameMaterial = standard({ color: 0x3a3025, roughness: 0.6, metalness: 0.08 });
  const border = 0.018;
  box(g, [width + border * 2, border, 0.028], frameMaterial, { position: [0, height / 2 + border / 2, 0.006] });
  box(g, [width + border * 2, border, 0.028], frameMaterial, { position: [0, -height / 2 - border / 2, 0.006] });
  box(g, [border, height, 0.028], frameMaterial, { position: [-width / 2 - border / 2, 0, 0.006] });
  box(g, [border, height, 0.028], frameMaterial, { position: [width / 2 + border / 2, 0, 0.006] });
  const photoTexture = cityPhotoTexture(variant);
  plane(g, width, height, new THREE.MeshStandardMaterial({
    map: photoTexture,
    roughness: 0.82,
    emissive: 0xffffff,
    emissiveMap: photoTexture,
    emissiveIntensity: 0.08,
  }), {
    position: [0, 0, 0],
  });
  return g;
};

const DESK_LAYOUTS = {
  2005: { centerX: -1.72, width: 1.85, centerZ: -3.33, depth: 0.78, top: "pale", return: null },
  2010: { centerX: -1.7, width: 1.95, centerZ: -3.33, depth: 0.78, top: "beige", return: null },
  2015: { centerX: -1.65, width: 2.15, centerZ: -3.33, depth: 0.78, top: "dark", return: null },
  2020: { centerX: -1.7, width: 2.4, centerZ: -3.33, depth: 0.78, top: "dark", return: { x: -0.5, z: -3.095, width: 0.9, depth: 1.25 } },
  2025: { centerX: -1.65, width: 2.5, centerZ: -3.33, depth: 0.78, top: "walnut", return: { x: -0.6, z: -3.035, width: 1.15, depth: 1.37 } },
};

const buildDesk = (ctx) => {
  const { era, parent, register } = ctx;
  const layout = DESK_LAYOUTS[era.year];
  const metal = standard({ color: era.year <= 2010 ? 0x8b8172 : 0x1d1c1b, roughness: 0.5, metalness: 0.58 });
  const topMaterial = woodMaterial(layout.top, 2.2, 1.1, { roughness: era.year === 2005 ? 0.78 : 0.55 });
  const thickness = era.year === 2005 ? 0.055 : 0.045;
  const top = mesh(parent, rounded(layout.width, thickness, layout.depth, 0.012, 2), topMaterial, {
    position: [layout.centerX, DESK_TOP - thickness / 2, layout.centerZ],
    castShadow: true,
    receiveShadow: true,
  });
  top.name = "desk-top";
  if (era.year === 2005) {
    box(parent, [layout.width - 0.04, 0.08, 0.03], woodMaterial("pale", 2, 1), {
      position: [layout.centerX, DESK_TOP - 0.085, layout.centerZ - layout.depth / 2 + 0.04],
    });
    box(parent, [layout.width - 0.16, 0.035, 0.5], standard({ color: 0x9d927e, roughness: 0.8 }), {
      position: [layout.centerX, DESK_TOP - 0.14, layout.centerZ - 0.05],
      rotation: [0.03, 0, 0],
    });
  }
  const legPositions = [
    [layout.centerX - layout.width / 2 + 0.07, layout.centerZ - layout.depth / 2 + 0.07],
    [layout.centerX + layout.width / 2 - 0.07, layout.centerZ - layout.depth / 2 + 0.07],
    [layout.centerX - layout.width / 2 + 0.07, layout.centerZ + layout.depth / 2 - 0.07],
    [layout.centerX + layout.width / 2 - 0.07, layout.centerZ + layout.depth / 2 - 0.07],
  ];
  for (const [x, z] of legPositions) {
    if (era.year <= 2010) {
      cylinder(parent, 0.018, 0.022, DESK_TOP - 0.06, metal, { position: [x, (DESK_TOP - 0.06) / 2, z], segments: 8, castShadow: true });
    } else {
      box(parent, [0.055, DESK_TOP - 0.05, 0.055], metal, { position: [x, (DESK_TOP - 0.05) / 2, z], castShadow: true });
    }
  }
  if (era.year >= 2015) {
    box(parent, [layout.width - 0.22, 0.05, 0.05], metal, {
      position: [layout.centerX, DESK_TOP - 0.16, layout.centerZ - layout.depth / 2 + 0.05],
    });
  }
  if (era.year >= 2015) {
    box(parent, [0.9, 0.06, 0.17], standard({ color: 0x211f1d, roughness: 0.9 }), {
      position: [layout.centerX, DESK_TOP - 0.12, layout.centerZ + 0.08],
    });
  }
  if (layout.return) {
    const returnTop = mesh(parent, rounded(layout.return.width, thickness, layout.return.depth, 0.012, 2), topMaterial, {
      position: [layout.return.x + layout.return.width / 2, DESK_TOP - thickness / 2, layout.return.z],
      castShadow: true,
      receiveShadow: true,
    });
    returnTop.name = "desk-return-top";
    const rx = layout.return.x + layout.return.width / 2;
    for (const [x, z] of [
      [layout.return.x + 0.06, layout.return.z + layout.return.depth / 2 - 0.07],
      [layout.return.x + layout.return.width - 0.06, layout.return.z + layout.return.depth / 2 - 0.07],
    ]) {
      box(parent, [0.055, DESK_TOP - 0.05, 0.055], metal, { position: [x, (DESK_TOP - 0.05) / 2, z], castShadow: true });
    }
    if (era.year === 2020 || era.year === 2025) {
      const drawerMaterial = woodMaterial(layout.top, 1.3, 1.2);
      box(parent, [0.5, 0.42, 0.44], drawerMaterial, {
        position: [rx + 0.34, 0.22, layout.return.z - 0.22],
        castShadow: true,
      });
      for (let i = 0; i < 2; i += 1) {
        box(parent, [0.4, 0.005, 0.002], standard({ color: 0x1e1b17, roughness: 0.5 }), {
          position: [rx + 0.34, 0.22 + i * 0.15, layout.return.z - 0.442],
        });
        box(parent, [0.09, 0.012, 0.012], metal, {
          position: [rx + 0.34, 0.16 + i * 0.15, layout.return.z - 0.452],
        });
      }
    }
  }
  if (era.year >= 2020) {
    box(parent, [0.16, 0.025, 0.08], standard({ color: 0x2c2824, roughness: 0.4, metalness: 0.3 }), {
      position: [layout.centerX - layout.width / 2 + 0.14, DESK_TOP - 0.085, layout.centerZ + layout.depth / 2 - 0.1],
    });
  }
  addContact(parent, layout.centerX, layout.centerZ, layout.width * 0.95, layout.depth * 1.1, 0.35);
  register("desk", [layout.width, 0.16, layout.depth], [layout.centerX, DESK_TOP - 0.04, layout.centerZ]);
  if (layout.return) {
    register("desk", [layout.return.width, 0.16, layout.return.depth], [layout.return.x + layout.return.width / 2, DESK_TOP - 0.04, layout.return.z]);
  }
  return layout;
};

const buildChair = (ctx) => {
  const { era, parent, register } = ctx;
  const x = -1.42;
  const z = -2.07;
  const g = group(parent, [x, 0, z]);
  const dark = standard({ color: 0x1f1e1c, roughness: 0.55, metalness: 0.15 });
  const wheelMaterial = standard({ color: 0x11100f, roughness: 0.7 });
  if (era.year === 2005) {
    const wood = woodMaterial("oak", 1, 1);
    const cushion = standard({ color: 0x5c6e78, roughness: 0.95 });
    for (const [sx, sz] of [
      [-0.24, -0.2],
      [0.24, -0.2],
      [-0.24, 0.2],
      [0.24, 0.2],
    ]) {
      box(g, [0.045, 0.44, 0.045], wood, { position: [sx, 0.22, sz], castShadow: true });
    }
    box(g, [0.5, 0.045, 0.47], wood, { position: [0, 0.445, 0], castShadow: true, receiveShadow: true });
    box(g, [0.44, 0.045, 0.42], cushion, { position: [0, 0.475, 0], castShadow: true });
    for (let i = 0; i < 3; i += 1) {
      box(g, [0.42, 0.075, 0.03], wood, { position: [0, 0.72 + i * 0.1, 0.225], castShadow: true });
    }
    box(g, [0.045, 0.5, 0.045], wood, { position: [-0.21, 0.69, 0.225], castShadow: true });
    box(g, [0.045, 0.5, 0.045], wood, { position: [0.21, 0.69, 0.225], castShadow: true });
    addContact(parent, x, z, 0.7, 0.65, 0.28);
  } else {
    const isGaming = era.year === 2015;
    const seatMaterial = isGaming
      ? standard({ color: 0x3b1918, roughness: 0.7 })
      : standard({ color: era.year === 2010 ? 0x2b2b29 : 0x3e3e3b, roughness: 0.78 });
    const accent = isGaming ? standard({ color: 0x8a3d38, roughness: 0.62 }) : dark;
    for (let i = 0; i < 5; i += 1) {
      const angle = (i / 5) * Math.PI * 2;
      const leg = box(g, [0.32, 0.035, 0.045], dark, {
        position: [Math.cos(angle) * 0.17, 0.1, Math.sin(angle) * 0.17],
        rotation: [0, -angle, 0.08],
      });
      leg.name = "chair-leg";
      mesh(g, new THREE.SphereGeometry(0.036, 10, 8), wheelMaterial, {
        position: [Math.cos(angle) * 0.34, 0.035, Math.sin(angle) * 0.34],
        scale: [1, 0.7, 1],
      });
    }
    cylinder(g, 0.055, 0.045, 0.2, dark, { position: [0, 0.19, 0], segments: 12 });
    if (era.year === 2010) {
      box(g, [0.53, 0.075, 0.5], seatMaterial, { position: [0, 0.37, 0], castShadow: true });
      box(g, [0.5, 0.65, 0.08], seatMaterial, {
        position: [0, 0.73, 0.22],
        rotation: [-0.1, 0, 0],
        castShadow: true,
      });
      for (const side of [-1, 1]) {
        box(g, [0.035, 0.03, 0.28], dark, { position: [side * 0.3, 0.52, 0.02] });
        box(g, [0.035, 0.2, 0.035], dark, { position: [side * 0.3, 0.43, 0.02] });
      }
    } else if (isGaming) {
      box(g, [0.55, 0.09, 0.53], seatMaterial, { position: [0, 0.39, 0], castShadow: true });
      box(g, [0.6, 0.18, 0.55], accent, { position: [0, 0.43, 0], castShadow: true });
      box(g, [0.58, 0.8, 0.1], seatMaterial, {
        position: [0, 0.82, 0.235],
        rotation: [-0.12, 0, 0],
        castShadow: true,
      });
      for (const side of [-1, 1]) {
        box(g, [0.08, 0.72, 0.12], accent, {
          position: [side * 0.29, 0.82, 0.21],
          rotation: [-0.08, 0, side * 0.05],
        });
        box(g, [0.04, 0.03, 0.32], dark, { position: [side * 0.34, 0.55, 0.03] });
        box(g, [0.035, 0.18, 0.035], dark, { position: [side * 0.34, 0.46, 0.03] });
      }
      box(g, [0.25, 0.15, 0.075], standard({ color: 0x73322f, roughness: 0.85 }), {
        position: [0, 1.05, 0.21],
        rotation: [-0.08, 0, 0],
      });
    } else {
      box(g, [0.55, 0.085, 0.52], seatMaterial, { position: [0, 0.38, 0], castShadow: true });
      box(g, [0.54, 0.72, 0.07], standard({ color: 0x363633, roughness: 0.55, metalness: 0.18 }), {
        position: [0, 0.79, 0.235],
        rotation: [-0.1, 0, 0],
        castShadow: true,
      });
      box(g, [0.42, 0.28, 0.055], standard({ color: 0x242423, roughness: 0.65 }), {
        position: [0, 0.88, 0.27],
        rotation: [-0.1, 0, 0],
      });
      for (const side of [-1, 1]) {
        box(g, [0.035, 0.03, 0.28], dark, { position: [side * 0.32, 0.5, 0.02] });
        box(g, [0.035, 0.2, 0.035], dark, { position: [side * 0.32, 0.42, 0.02] });
      }
    }
    addContact(parent, x, z, 0.85, 0.8, 0.3);
  }
  register("chair", [0.75, 1.1, 0.75], [x, 0.55, z]);
  return g;
};

const addCRTMonitor = (ctx, { x, z, scale = 1, rotY = 0, dark = false }) => {
  const { era, parent, register } = ctx;
  const g = group(parent, [x, DESK_TOP, z], [0, rotY, 0]);
  const beige = standard({ color: dark ? 0x24221f : 0xc0b49a, roughness: 0.55, metalness: 0.04 });
  const off = standard({ color: 0x3b3934, roughness: 0.42, metalness: 0.05 });
  mesh(g, rounded(0.73 * scale, 0.56 * scale, 0.61 * scale, 0.055 * scale, 3), beige, {
    position: [0, 0.34 * scale, -0.06 * scale],
    castShadow: true,
    receiveShadow: true,
  });
  mesh(g, rounded(0.72 * scale, 0.55 * scale, 0.06 * scale, 0.04 * scale, 2), beige, {
    position: [0, 0.34 * scale, 0.245 * scale],
  });
  mesh(g, rounded(0.61 * scale, 0.455 * scale, 0.02 * scale, 0.028 * scale, 2), off, {
    position: [0, 0.34 * scale, 0.282 * scale],
  });
  const screen = mesh(g, screenGeometry(0.55 * scale, 0.405 * scale, 0.028 * scale, 16), new THREE.MeshBasicMaterial({ map: ctx.screen.texture, toneMapped: false }), {
    position: [0, 0.34 * scale, 0.295 * scale],
  });
  screen.name = "crt-screen";
  mesh(g, rounded(0.5 * scale, 0.04 * scale, 0.4 * scale, 0.03 * scale, 2), beige, {
    position: [0, 0.02 * scale, 0.02 * scale],
  });
  cylinder(g, 0.1 * scale, 0.13 * scale, 0.04 * scale, beige, {
    position: [0, 0.04 * scale, 0.04 * scale],
    segments: 16,
  });
  for (let i = 0; i < 7; i += 1) {
    box(g, [0.22 * scale, 0.009 * scale, 0.006], standard({ color: 0x6e6556, roughness: 0.8 }), {
      position: [0, 0.07 * scale + i * 0.016 * scale, -0.36 * scale],
    });
  }
  for (let i = 0; i < 5; i += 1) {
    box(g, [0.006, 0.075 * scale, 0.17 * scale], standard({ color: 0x6b6252, roughness: 0.75 }), {
      position: [0.36 * scale, 0.25 * scale + i * 0.04 * scale, -0.06 * scale],
    });
  }
  mesh(g, new THREE.SphereGeometry(0.008 * scale, 8, 6), new THREE.MeshBasicMaterial({ color: 0x8fe0a5 }), {
    position: [0.27 * scale, 0.085 * scale, 0.288 * scale],
  });
  box(g, [0.1 * scale, 0.02 * scale, 0.008 * scale], standard({ color: 0x8b806c, roughness: 0.7 }), {
    position: [0.2 * scale, 0.1 * scale, 0.289 * scale],
  });
  const color = new THREE.Color(era.screen.accent);
  addGlowSprite(g, {
    position: [0, 0.35 * scale, 0.46 * scale],
    color: color.getHex(),
    scale: 1.4 * scale,
    opacity: 0.22,
  });
  register("screen", [0.9 * scale, 0.7 * scale, 0.18], [x, DESK_TOP + 0.36 * scale, z + 0.35 * scale]);
  return g;
};

const addLCDMonitor = (ctx, {
  x,
  z,
  width = 0.66,
  height = 0.4,
  standHeight = 0.15,
  y = DESK_TOP,
  vertical = false,
  secondary = false,
  scale = 1,
  arm = false,
}) => {
  const { era, parent, register } = ctx;
  const g = group(parent, [x, y, z]);
  const plastic = standard({ color: era.year === 2025 ? 0x171615 : 0x1e1e1d, roughness: 0.4, metalness: 0.12 });
  const baseMaterial = standard({ color: 0x2b2b29, roughness: 0.34, metalness: 0.35 });
  if (arm) {
    cylinder(g, 0.025, 0.025, 0.34, baseMaterial, { position: [0, 0.17, -0.16], segments: 10 });
    box(g, [0.08, 0.025, 0.08], baseMaterial, { position: [0, 0.012, -0.16] });
    box(g, [0.06, 0.045, 0.32], baseMaterial, { position: [0, 0.34, -0.08], rotation: [0.1, 0, 0] });
  } else {
    mesh(g, rounded(0.3 * scale, 0.025, 0.2 * scale, 0.02, 2), baseMaterial, { position: [0, 0.014, 0] });
    cylinder(g, 0.035, 0.05, standHeight, plastic, { position: [0, 0.025 + standHeight / 2, -0.02], segments: 14 });
    box(g, [0.08, 0.05, 0.1], plastic, { position: [0, 0.03 + standHeight, -0.01] });
  }
  const screenCenterY = 0.34 + (vertical ? 0.05 : 0) + standHeight;
  const bodyHeight = height + 0.045;
  const body = mesh(g, rounded(width + 0.03, bodyHeight, 0.038, 0.012, 2), plastic, {
    position: [0, screenCenterY, 0.008],
    castShadow: true,
  });
  body.name = secondary ? "aux-monitor" : "main-monitor";
  const material = secondary
    ? new THREE.MeshBasicMaterial({ map: buildScreenTexturePlaceholder(era.year < 2015 ? "正在下载…" : "STARPORT AUX", era.screen.accent), toneMapped: false })
    : new THREE.MeshBasicMaterial({ map: ctx.screen.texture, toneMapped: false });
  const screen = mesh(g, screenGeometry(width - 0.018, height - 0.018, 0.006, 1), material, {
    position: [0, screenCenterY, 0.029],
  });
  screen.name = secondary ? "aux-screen" : "main-screen";
  box(g, [0.14, 0.008, 0.004], standard({ color: 0x484844, roughness: 0.4 }), {
    position: [0, screenCenterY - bodyHeight / 2 + 0.014, 0.03],
  });
  mesh(g, new THREE.SphereGeometry(0.004, 8, 6), new THREE.MeshBasicMaterial({ color: 0x7fd5a0 }), {
    position: [width / 2 - 0.02, screenCenterY - bodyHeight / 2 + 0.016, 0.031],
  });
  const accentColor = new THREE.Color(era.screen.accent);
  addGlowSprite(g, {
    position: [0, screenCenterY, 0.18],
    color: accentColor.getHex(),
    scale: Math.max(1.1, width * 2.3),
    opacity: secondary ? 0.1 : 0.18,
  });
  if (!secondary) {
    register("screen", [width + 0.18, height + 0.2, 0.16], [x, y + screenCenterY, z + 0.13]);
  }
  return g;
};

const addKeyboard = (ctx, { x, z, rotY = 0, scale = 1, year = ctx.era.year, rgb = false }) => {
  const { parent } = ctx;
  const g = group(parent, [x, DESK_TOP + 0.006, z], [0, rotY, 0]);
  const bodyColors = {
    2005: 0xbdb39e,
    2010: 0x1d1d1b,
    2015: 0x181817,
    2020: 0xdfd8ca,
    2025: 0x393937,
  };
  const kit = standard({ color: bodyColors[year], roughness: 0.52, metalness: 0.04 });
  const width = (year >= 2015 ? 0.43 : 0.5) * scale;
  const depth = 0.16 * scale;
  mesh(g, rounded(width + 0.025, 0.027, depth + 0.018, 0.009, 2), kit, {
    position: [0, 0.013, 0],
    castShadow: true,
  });
  const map = keyboardTexture(year);
  const keys = plane(g, width, depth, new THREE.MeshStandardMaterial({ map, roughness: 0.58, metalness: 0.03 }), {
    position: [0, 0.0275, 0],
    rotation: [-Math.PI / 2, 0, 0],
  });
  keys.name = "keyboard-keys";
  if (rgb) {
    box(g, [width * 0.96, 0.004, 0.004], new THREE.MeshBasicMaterial({ color: 0x72c9bb }), {
      position: [0, 0.006, depth / 2 - 0.002],
    });
  }
  if (year === 2005) {
    box(g, [width + 0.02, 0.012, 0.012], kit, { position: [0, 0.014, depth / 2 + 0.01] });
  }
  return g;
};

const addMouse = (ctx, { x, z, rotY = 0, year = ctx.era.year, padSize = [0.38, 0.3] }) => {
  const { parent } = ctx;
  const padTexture = mousepadTexture(year);
  const padMaterial = new THREE.MeshStandardMaterial({ map: padTexture, roughness: 0.82 });
  plane(parent, padSize[0], padSize[1], padMaterial, {
    position: [x, DESK_TOP + 0.0065, z],
    rotation: [-Math.PI / 2, 0, 0],
  });
  const g = group(parent, [x + 0.02, DESK_TOP + 0.018, z + 0.01], [0, rotY, 0]);
  const colors = { 2005: 0xcfc4ae, 2010: 0x222220, 2015: 0x171716, 2020: 0xd7d0c1, 2025: 0x2b2b2a };
  const bodyMaterial = standard({ color: colors[year], roughness: 0.44, metalness: 0.06 });
  mesh(g, new THREE.SphereGeometry(1, 16, 10), bodyMaterial, {
    position: [0, 0.012, 0],
    scale: [0.035, 0.021, 0.053],
    castShadow: true,
  });
  box(g, [0.014, 0.008, 0.033], standard({ color: year === 2020 ? 0xd7d0c1 : 0x242422, roughness: 0.4 }), {
    position: [0, 0.027, 0.003],
  });
  cylinder(g, 0.006, 0.006, 0.009, standard({ color: 0x222222, roughness: 0.6 }), {
    position: [0, 0.029, 0.014],
    rotation: [0, 0, Math.PI / 2],
    segments: 10,
  });
  return g;
};

const addSpeakers = (ctx, { x, z }) => {
  const { parent } = ctx;
  const beige = standard({ color: 0xb8ad96, roughness: 0.62 });
  const dark = standard({ color: 0x504b40, roughness: 0.8 });
  for (const side of [-1, 1]) {
    const sx = x + side * 0.46;
    const g = group(parent, [sx, DESK_TOP, z]);
    box(g, [0.13, 0.25, 0.14], beige, { position: [0, 0.125, 0], castShadow: true });
    cylinder(g, 0.038, 0.038, 0.008, dark, { position: [0, 0.17, 0.071], rotation: [Math.PI / 2, 0, 0], segments: 20 });
    cylinder(g, 0.024, 0.024, 0.008, dark, { position: [0, 0.085, 0.071], rotation: [Math.PI / 2, 0, 0], segments: 18 });
  }
};

const addPC = (ctx, { x, z, variant = ctx.era.year, rotY = 0 }) => {
  const { parent, register, spinners } = ctx;
  const g = group(parent, [x, 0, z], [0, rotY, 0]);
  let width;
  let height;
  let depth;
  if (variant === 2005) {
    width = 0.23;
    height = 0.46;
    depth = 0.44;
    const beige = standard({ color: 0xc0b49c, roughness: 0.55 });
    box(g, [width, height, depth], beige, { position: [0, height / 2, 0], castShadow: true, receiveShadow: true });
    for (let i = 0; i < 2; i += 1) {
      box(g, [width - 0.035, 0.04, 0.008], standard({ color: 0x6d6659, roughness: 0.55 }), {
        position: [0, height - 0.09 - i * 0.065, depth / 2 + 0.003],
      });
    }
    box(g, [0.035, 0.014, 0.006], standard({ color: 0x7b7568, roughness: 0.5 }), {
      position: [0.065, height - 0.185, depth / 2 + 0.004],
    });
    for (let i = 0; i < 12; i += 1) {
      box(g, [width * 0.6, 0.004, 0.004], standard({ color: 0x6b655a, roughness: 0.9 }), {
        position: [0, 0.06 + i * 0.016, depth / 2 + 0.003],
      });
    }
    mesh(g, new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshBasicMaterial({ color: 0x92df8c }), {
      position: [width / 2 - 0.03, height - 0.03, depth / 2 + 0.005],
    });
    addContact(parent, x, z, 0.55, 0.65, 0.3);
  } else {
    width = variant >= 2020 ? 0.26 : 0.24;
    height = variant >= 2020 ? 0.5 : 0.46;
    depth = variant >= 2020 ? 0.48 : 0.46;
    const color = variant === 2010 ? 0x202020 : variant === 2015 ? 0x171717 : 0xe1ddd3;
    const bodyMaterial = standard({ color, roughness: 0.36, metalness: 0.25 });
    const dark = standard({ color: 0x111110, roughness: 0.42, metalness: 0.3 });
    const accent = variant === 2010 ? 0x3b75b2 : variant === 2015 ? 0x62b7d8 : 0x7be0c5;
    box(g, [width, height, depth], bodyMaterial, { position: [0, height / 2, 0], castShadow: true });
    box(g, [width * 0.84, height * 0.7, 0.008], new THREE.MeshPhysicalMaterial({
      color: 0x829ca1,
      roughness: 0.05,
      metalness: 0.1,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    }), { position: [0, height * 0.47, depth / 2 + 0.002] });
    for (let i = 0; i < 3; i += 1) {
      const fan = group(g, [0, 0.1 + i * 0.13, depth / 2 - 0.08]);
      for (let blade = 0; blade < 5; blade += 1) {
        const bladeMesh = box(fan, [0.012, 0.07, 0.012], dark, {
          position: [Math.cos((blade / 5) * Math.PI * 2) * 0.035, Math.sin((blade / 5) * Math.PI * 2) * 0.035, 0],
          rotation: [0, 0, (blade / 5) * Math.PI * 2],
        });
        bladeMesh.name = "fan-blade";
      }
      const ring = mesh(g, new THREE.TorusGeometry(0.052, 0.005, 5, 24), new THREE.MeshBasicMaterial({ color: accent }), {
        position: [0, 0.1 + i * 0.13, depth / 2 - 0.06],
      });
      ring.name = "fan-ring";
      spinners.push({ object: fan, speed: 1.4 + i * 0.41 });
    }
    const gpu = box(g, [width * 0.62, 0.08, 0.05], dark, { position: [0, height * 0.42, depth / 2 - 0.16] });
    gpu.name = "gpu";
    if (variant >= 2020) {
      box(g, [0.09, 0.16, 0.09], dark, { position: [0, height * 0.33, 0.02] });
      mesh(g, new THREE.TorusGeometry(0.055, 0.008, 5, 24), new THREE.MeshBasicMaterial({ color: accent }), {
        position: [0, height * 0.33, 0.07],
      });
    }
    box(g, [width - 0.02, 0.012, 0.012], new THREE.MeshBasicMaterial({ color: accent }), {
      position: [0, 0.015, depth / 2 + 0.008],
    });
    addContact(parent, x, z, 0.6, 0.7, 0.3);
  }
  register("pc", [width + 0.25, height + 0.25, depth + 0.25], [x, height / 2 + 0.1, z]);
  return g;
};

const buildBed = (ctx) => {
  const { era, parent, register } = ctx;
  const x = 3.35;
  const z = -2.1;
  const g = group(parent, [x, 0, z]);
  const year = era.year;
  const frameColor = year <= 2010 ? 0x4c3b2b : year === 2015 ? 0x2e2923 : year === 2020 ? 0x4a4439 : 0x694f38;
  const frameMaterial = year === 2005 ? standard({ color: 0x413b34, roughness: 0.48, metalness: 0.5 }) : woodMaterial(year <= 2015 ? "walnut" : "oak", 1, 1.3);
  if (year === 2005) {
    for (const [sx, sz] of [
      [-0.78, -1.1],
      [0.78, -1.1],
      [-0.78, 1.1],
      [0.78, 1.1],
    ]) {
      cylinder(g, 0.022, 0.022, 0.52, frameMaterial, { position: [sx, 0.26, sz], segments: 8, castShadow: true });
    }
    for (const y of [0.2, 0.3]) {
      box(g, [1.59, 0.025, 0.025], frameMaterial, { position: [0, y, -1.15] });
      box(g, [1.59, 0.025, 0.025], frameMaterial, { position: [0, y, 1.15] });
    }
    box(g, [1.62, 0.12, 2.25], standard({ color: 0x6d6251, roughness: 0.9 }), { position: [0, 0.34, 0], castShadow: true });
    for (let i = 0; i < 5; i += 1) {
      cylinder(g, 0.012, 0.012, 0.74, frameMaterial, {
        position: [-0.7 + i * 0.35, 0.65, -1.17],
        segments: 8,
      });
    }
    box(g, [1.56, 0.035, 0.035], frameMaterial, { position: [0, 1.01, -1.17] });
    for (const side of [-1, 1]) {
      cylinder(g, 0.017, 0.017, 0.96, frameMaterial, { position: [side * 0.76, 0.6, -1.17], segments: 8 });
      mesh(g, new THREE.SphereGeometry(0.026, 10, 8), frameMaterial, { position: [side * 0.76, 1.09, -1.17] });
    }
  } else {
    const frameHeight = year >= 2020 ? 0.34 : 0.27;
    box(g, [1.72, frameHeight, 2.3], frameMaterial, { position: [0, frameHeight / 2 + 0.08, 0], castShadow: true });
    box(g, [1.78, 0.75, 0.09], frameMaterial, { position: [0, 0.45, -1.19], castShadow: true });
    if (year >= 2020) {
      box(g, [1.7, 0.7, 0.07], fabricMaterial(`headboard-${year}`, { base: "#6a6152", dark: "#4d463b", light: "#837765" }), {
        position: [0, 0.43, -1.235],
        castShadow: true,
      });
      for (let i = 0; i < 3; i += 1) {
        box(g, [0.01, 0.62, 0.002], standard({ color: 0x534a3d, roughness: 0.9 }), {
          position: [-0.55 + i * 0.55, 0.43, -1.273],
        });
      }
    }
  }
  const mattressMaterial = fabricMaterial(`mattress-${year}`, { base: "#c4bca9", dark: "#9b9281", light: "#ddd5c3" });
  mesh(g, rounded(1.56, 0.18, 2.2, 0.05, 2), mattressMaterial, {
    position: [0, 0.5, 0],
    castShadow: true,
    receiveShadow: true,
  });
  const blanketMaterial =
    year === 2005
      ? plaidMaterial("blue-plaid", ["#526b82", "#293e57", "#9fb0bf", 3])
      : year === 2010
        ? plaidMaterial("dark-plaid", ["#3e4c5b", "#1f2a34", "#737c82", 7])
        : fabricMaterial(
            `duvet-${year}`,
            year === 2015
              ? { base: "#6d7070", dark: "#505351", light: "#909390" }
              : year === 2020
                ? { base: "#a69c8b", dark: "#807665", light: "#c1b7a4" }
                : { base: "#c4b49c", dark: "#a08f76", light: "#d8cab2" },
            2,
            2.2
          );
  const duvet = mesh(g, rounded(1.6, 0.16, 2.08, 0.07, 3), blanketMaterial, {
    position: [0, 0.63, 0.08],
    castShadow: true,
    receiveShadow: true,
  });
  duvet.name = "duvet";
  box(g, [1.58, 0.055, 0.32], standard({ color: year >= 2020 ? 0xe4dccb : 0x8da0af, roughness: 0.95 }), {
    position: [0, 0.715, -0.84],
  });
  const pillowMaterial = fabricMaterial(`pillow-${year}`, {
    base: year === 2005 ? "#7d8e9a" : year === 2015 ? "#6b6a65" : "#d2c9b8",
    dark: year === 2005 ? "#586a76" : "#a99f8f",
    light: "#e6decf",
  });
  const pillowCount = year === 2005 ? 1 : 2;
  for (let i = 0; i < pillowCount; i += 1) {
    mesh(g, rounded(0.7, 0.14, 0.38, 0.07, 3), pillowMaterial, {
      position: [-0.38 + i * 0.76, 0.79, -0.82 + i * 0.02],
      rotation: [0.04, 0.03 * (i === 0 ? 1 : -1), 0],
      castShadow: true,
    });
  }
  if (year === 2025) {
    const throwMaterial = fabricMaterial("throw-2025", { base: "#9b4d31", dark: "#71311e", light: "#bb7153" }, 1.5, 1);
    mesh(g, rounded(1.62, 0.055, 0.55, 0.025, 2), throwMaterial, {
      position: [0, 0.755, 0.7],
      rotation: [0.01, 0, 0],
      castShadow: true,
    });
    const book = box(g, [0.22, 0.035, 0.3], standard({ color: 0x3c4e4e, roughness: 0.8 }), {
      position: [0.38, 0.755, 0.45],
      rotation: [0.03, 0.3, 0.02],
    });
    book.name = "bed-book";
  }
  if (year === 2005) {
    cylinder(g, 0.018, 0.018, 0.05, standard({ color: 0x3b3a38, roughness: 0.6 }), {
      position: [0.66, 0.52, -0.3],
      rotation: [0, 0, Math.PI / 2],
      segments: 10,
    });
    addConsole(ctx, { x: x + 0.65, y: 0.51, z: z - 0.3, variant: 2015, scale: 0.7, rotY: 0.2 });
  }
  if (year === 2015) {
    const bag = standard({ color: 0x3c443f, roughness: 0.92 });
    mesh(g, rounded(0.38, 0.18, 0.28, 0.05, 2), bag, { position: [0.65, 0.72, 0.7], rotation: [0.06, 0.2, 0], castShadow: true });
  }
  if (year === 2005) {
    const boxMaterial = standard({ color: 0x8a6845, roughness: 0.9 });
    box(parent, [0.44, 0.32, 0.4], boxMaterial, { position: [2.78, 0.16, -0.7], rotation: [0, 0.2, 0], castShadow: true });
    box(parent, [0.32, 0.23, 0.3], boxMaterial, { position: [2.68, 0.45, -0.69], rotation: [0, -0.1, 0] });
    box(parent, [0.05, 0.012, 0.3], standard({ color: 0xd6c7aa, roughness: 0.9 }), { position: [2.78, 0.325, -0.7] });
  }
  addContact(parent, x, z, 2.05, 2.7, 0.34);
  register("bed", [1.85, 0.75, 2.5], [x, 0.4, z]);
  return g;
};

const buildWardrobe = (ctx) => {
  const { era, parent } = ctx;
  const year = era.year;
  const g = group(parent, [-4.08, 0, 1.45]);
  const widthZ = 1.62;
  const height = 2.12;
  const depth = 0.48;
  const bodyMaterial =
    year === 2005
      ? woodMaterial("oak", 1, 1.4)
      : year === 2010
        ? standard({ color: 0xd5cec0, roughness: 0.78 })
        : year === 2015
          ? standard({ color: 0xbfb6a6, roughness: 0.82 })
          : year === 2020
            ? standard({ color: 0x333b37, roughness: 0.72 })
            : woodMaterial("walnut", 1, 1.4);
  box(g, [depth, height, widthZ], bodyMaterial, { position: [0, height / 2, 0], castShadow: true, receiveShadow: true });
  const doorMaterial =
    year === 2005
      ? woodMaterial("oak", 1, 1.8)
      : year === 2020
        ? standard({ color: 0x3e4843, roughness: 0.68 })
        : year === 2025
          ? woodMaterial("walnut", 1, 1.8)
          : standard({ color: year === 2010 ? 0xdcd5c7 : 0xc5bcab, roughness: 0.8 });
  for (const side of [-1, 1]) {
    box(g, [0.024, height - 0.13, widthZ / 2 - 0.04], doorMaterial, {
      position: [depth / 2 + 0.012, height / 2, side * (widthZ / 4 + 0.01)],
    });
    box(g, [0.014, 0.06, 0.02], standard({ color: 0x8e7b5c, roughness: 0.4, metalness: 0.6 }), {
      position: [depth / 2 + 0.032, height / 2, side * 0.13],
    });
  }
  box(g, [depth + 0.02, 0.06, widthZ + 0.02], standard({ color: 0x332b23, roughness: 0.7 }), { position: [0, height, 0] });
  if (year === 2005) {
    const sticker = standard({ color: 0xd9b65e, roughness: 0.8 });
    mesh(g, new THREE.CircleGeometry(0.06, 16), sticker, {
      position: [depth / 2 + 0.026, 0.52, -0.38],
      rotation: [0, Math.PI / 2, 0],
    });
    box(g, [0.005, 0.17, 0.12], standard({ color: 0x4b6c83, roughness: 0.8 }), {
      position: [depth / 2 + 0.027, 1.33, 0.34],
    });
  }
  if (year === 2025) {
    plane(g, 0.42, 1.2, new THREE.MeshStandardMaterial({ color: 0x7b8987, roughness: 0.12, metalness: 0.9 }), {
      position: [depth / 2 + 0.027, 1.25, -0.38],
      rotation: [0, Math.PI / 2, 0],
    });
    const mirrorFrame = standard({ color: 0x2f2419, roughness: 0.6 });
    box(g, [0.018, 0.035, 0.47], mirrorFrame, { position: [depth / 2 + 0.028, 1.25 + 0.62, -0.38] });
    box(g, [0.018, 0.035, 0.47], mirrorFrame, { position: [depth / 2 + 0.028, 1.25 - 0.62, -0.38] });
    box(g, [0.018, 1.27, 0.035], mirrorFrame, { position: [depth / 2 + 0.028, 1.25, -0.38 + 0.235] });
    box(g, [0.018, 1.27, 0.035], mirrorFrame, { position: [depth / 2 + 0.028, 1.25, -0.38 - 0.235] });
  }
  addContact(parent, -4.08, 1.45, 0.75, 1.9, 0.28);
  return g;
};

const buildLowCabinet = (ctx) => {
  const { era, parent, register } = ctx;
  const year = era.year;
  const x = 1.25;
  const z = -3.56;
  if (year === 2005) {
    const cardboard = standard({ color: 0x8e6e4e, roughness: 0.94 });
    const box1 = box(parent, [0.62, 0.42, 0.46], cardboard, { position: [1.05, 0.21, z], rotation: [0, 0.06, 0], castShadow: true });
    box(parent, [0.05, 0.012, 0.46], standard({ color: 0xd4c4a7, roughness: 0.9 }), {
      position: [1.05, 0.43, z],
    });
    box(parent, [0.46, 0.3, 0.35], cardboard, { position: [1.45, 0.15, z - 0.01], rotation: [0, -0.15, 0], castShadow: true });
    register("shelf", [1.05, 0.65, 0.6], [1.25, 0.3, z]);
    addContact(parent, 1.25, z, 1.1, 0.7, 0.24);
    return;
  }
  const g = group(parent, [x, 0, z]);
  const material =
    year === 2010
      ? woodMaterial("oak", 1.2, 1)
      : year === 2015
        ? standard({ color: 0x262422, roughness: 0.72 })
        : year === 2020
          ? standard({ color: 0x2d2a25, roughness: 0.66 })
          : woodMaterial("walnut", 1.2, 1);
  box(g, [1.35, 0.7, 0.4], material, { position: [0, 0.35, 0], castShadow: true, receiveShadow: true });
  const front = standard({ color: year === 2015 ? 0x1c1b19 : year === 2020 ? 0x23211e : 0x59422f, roughness: 0.76 });
  for (const side of [-1, 1]) {
    box(g, [0.62, 0.6, 0.018], front, { position: [side * 0.33, 0.35, 0.21] });
    box(g, [0.08, 0.012, 0.012], standard({ color: 0x9b7b51, roughness: 0.5, metalness: 0.4 }), {
      position: [side * 0.1, 0.36, 0.225],
    });
  }
  box(g, [1.4, 0.035, 0.44], standard({ color: 0x1f1c18, roughness: 0.6 }), { position: [0, 0.717, 0] });
  if (year === 2020 || year === 2025) {
    box(g, [1.32, 0.012, 0.012], new THREE.MeshBasicMaterial({ color: year === 2020 ? 0xffb36b : 0xffd9a0 }), {
      position: [0, 0.695, 0.213],
    });
  }
  addContact(parent, x, z, 1.55, 0.55, 0.28);
  register("shelf", [1.5, 0.7, 0.55], [x, 0.35, z]);

  if (year === 2015 || year === 2020 || year === 2025) {
    const shelfY = 1.38;
    const shelfMaterial = woodMaterial(year === 2015 ? "dark" : "walnut", 1.4, 1);
    box(parent, [1.45, 0.04, 0.26], shelfMaterial, { position: [x, shelfY, -3.62], castShadow: true });
    for (const side of [-1, 1]) {
      box(parent, [0.035, 0.16, 0.22], standard({ color: 0x252321, roughness: 0.55, metalness: 0.55 }), { position: [x + side * 0.6, shelfY - 0.1, -3.67] });
    }
    if (year >= 2020) {
      box(parent, [1.3, 0.01, 0.012], new THREE.MeshBasicMaterial({ color: 0xffc888 }), {
        position: [x, shelfY - 0.026, -3.5],
      });
    }
  }

  if (year === 2025) {
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xbfd4d2,
      roughness: 0.04,
      metalness: 0,
      transparent: true,
      opacity: 0.1,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const caseGroup = group(parent, [1.25, 0.735, -3.52]);
    box(caseGroup, [1.2, 0.02, 0.42], standard({ color: 0x261e17, roughness: 0.55 }), { position: [0, 0, 0] });
    const frame = standard({ color: 0x5f472d, roughness: 0.4, metalness: 0.35 });
    for (const xPos of [-0.59, 0.59]) {
      for (const zPos of [-0.2, 0.2]) {
        box(caseGroup, [0.015, 0.62, 0.015], frame, { position: [xPos, 0.32, zPos] });
      }
    }
    box(caseGroup, [1.2, 0.015, 0.42], frame, { position: [0, 0.63, 0] });
    plane(caseGroup, 1.18, 0.6, glassMaterial, { position: [0, 0.32, 0.205] });
    plane(caseGroup, 0.4, 0.6, glassMaterial, { position: [-0.596, 0.32, 0], rotation: [0, Math.PI / 2, 0] });
    plane(caseGroup, 0.4, 0.6, glassMaterial, { position: [0.596, 0.32, 0], rotation: [0, Math.PI / 2, 0] });
    addGlowSprite(parent, { position: [1.25, 1.3, -3.3], color: 0xffd7a2, scale: 0.8, opacity: 0.18 });
  }
};

const addShelf = (ctx, { x, y, width, depth = 0.24, z = -3.61, fill = "books", count = 12 }) => {
  const { parent } = ctx;
  const board = box(parent, [width, 0.045, depth], woodMaterial(ctx.era.year <= 2010 ? "oak" : "walnut", 2, 1), {
    position: [x, y, z],
    castShadow: true,
    receiveShadow: true,
  });
  board.name = "wall-shelf";
  for (const side of [-1, 1]) {
    box(parent, [0.025, 0.13, depth * 0.8], standard({ color: 0x3d3228, roughness: 0.55, metalness: 0.25 }), {
      position: [x + side * (width / 2 - 0.08), y - 0.08, z - 0.02],
    });
  }
  if (fill === "books") {
    addBooks(ctx, { x: x - width / 2 + 0.06, y: y + 0.023, z, width: width * 0.5, height: 0.23, count });
    addCaseRow(ctx, { x: x + width * 0.03, y: y + 0.023, z, width: width * 0.4, count: Math.round(count * 0.9) });
  } else if (fill === "cases") {
    addCaseRow(ctx, { x: x - width / 2 + 0.08, y: y + 0.023, z, width: width * 0.65, count });
    addFigure(ctx, { x: x + width * 0.27, y: y + 0.023, z: z + 0.01, scale: 0.8, color: 0x8d6b4c, rotY: -0.4 });
  } else if (fill === "display") {
    addCaseRow(ctx, { x: x - width / 2 + 0.08, y: y + 0.023, z, width: width * 0.42, count: Math.round(count * 0.7) });
    addFigure(ctx, { x: x + width * 0.2, y: y + 0.023, z: z + 0.015, scale: 1, color: 0x54736f, rotY: 0.5 });
    addFigure(ctx, { x: x + width * 0.35, y: y + 0.023, z: z + 0.005, scale: 0.65, color: 0xb2704e, rotY: -0.3 });
  }
  return board;
};

const addCRTKeepsake = (ctx, { x, y, z, rotY = 0, scale = 0.58, label = "2005.6 —" }) => {
  const { parent, register } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const beige = standard({ color: 0xa99c80, roughness: 0.72 });
  const dark = standard({ color: 0x3a3833, roughness: 0.42 });
  mesh(g, rounded(0.72 * scale, 0.55 * scale, 0.6 * scale, 0.045 * scale, 2), beige, {
    position: [0, 0.3 * scale, -0.04 * scale],
    castShadow: true,
  });
  mesh(g, rounded(0.62 * scale, 0.44 * scale, 0.02 * scale, 0.03 * scale, 2), dark, {
    position: [0, 0.3 * scale, 0.27 * scale],
  });
  const screen = plane(g, 0.54 * scale, 0.37 * scale, new THREE.MeshPhysicalMaterial({
    color: 0x1d2a2b,
    roughness: 0.18,
    metalness: 0.2,
    emissive: 0x1e3936,
    emissiveIntensity: 0.06,
  }), { position: [0, 0.3 * scale, 0.285 * scale] });
  screen.name = "old-crt-screen";
  cylinder(g, 0.18 * scale, 0.18 * scale, 0.05 * scale, beige, {
    position: [0, 0.025 * scale, 0.02 * scale],
    segments: 18,
  });
  const tagTexture = labelTexture(label, "#d7cbb3", "#5c4a34");
  const tag = plane(g, 0.24 * scale, 0.06 * scale, new THREE.MeshStandardMaterial({ map: tagTexture, roughness: 0.85 }), {
    position: [0.06 * scale, 0.17 * scale, 0.29 * scale],
    rotation: [0, 0, 0.06],
  });
  tag.name = "crt-label";
  register("crt", [0.7 * scale, 0.6 * scale, 0.6 * scale], [x, y + 0.3 * scale, z + 0.2 * scale]);
  return g;
};

const addFloorLamp = (ctx, { x, z, year }) => {
  const { parent } = ctx;
  const g = group(parent, [x, 0, z]);
  const metal = standard({ color: 0x2a2520, roughness: 0.45, metalness: 0.5 });
  cylinder(g, 0.17, 0.19, 0.03, metal, { position: [0, 0.015, 0], segments: 20 });
  cylinder(g, 0.014, 0.016, 1.52, metal, { position: [0, 0.78, 0], segments: 10 });
  const shadeMaterial = fabricMaterial(`lamp-shade-${year}`, { base: "#c4a77d", dark: "#9b7f5b", light: "#ddc29a" }, 1.2, 1, {
    side: THREE.DoubleSide,
  });
  const shade = mesh(g, new THREE.CylinderGeometry(0.2, 0.29, 0.34, 24, 1, true), shadeMaterial, {
    position: [0, 1.5, 0],
    castShadow: true,
  });
  shade.name = "lamp-shade";
  mesh(g, new THREE.SphereGeometry(0.055, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffd29b }), {
    position: [0, 1.4, 0],
  });
  addGlowSprite(g, { position: [0, 1.42, 0], color: 0xffc27d, scale: 1.4, opacity: 0.3 });
  return g;
};

const addDeskLamp = (ctx, { x, z, year }) => {
  const { parent } = ctx;
  const metal = standard({ color: year === 2005 ? 0x8d877a : year === 2010 ? 0xd3cbbd : 0x242220, roughness: 0.38, metalness: 0.5 });
  if (year >= 2015) {
    const g = group(parent, [x, DESK_TOP, z]);
    box(g, [0.03, 0.08, 0.03], metal, { position: [0, 0.04, 0] });
    box(g, [0.42, 0.02, 0.025], metal, { position: [0.2, 0.15, 0], rotation: [0, 0, -0.2] });
    box(g, [0.46, 0.018, 0.05], new THREE.MeshBasicMaterial({ color: 0xffd6a1 }), {
      position: [0.46, 0.19, 0],
      rotation: [0, 0, -0.2],
    });
    addGlowSprite(g, { position: [0.46, 0.18, 0.08], color: 0xffc578, scale: 0.8, opacity: 0.25 });
    return g;
  }
  const g = group(parent, [x, DESK_TOP, z]);
  cylinder(g, 0.075, 0.09, 0.025, metal, { position: [0, 0.012, 0], segments: 18 });
  const joint1 = new THREE.Group();
  joint1.position.set(0, 0.03, 0);
  g.add(joint1);
  box(joint1, [0.025, 0.3, 0.025], metal, { position: [0.06, 0.17, 0], rotation: [0, 0, -0.35] });
  const head = group(g, [0.18, 0.33, 0], [0.1, 0, -0.7]);
  cylinder(head, 0.02, 0.07, 0.18, metal, { position: [0, 0.06, 0], segments: 18 });
  mesh(head, new THREE.SphereGeometry(0.035, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffcf93 }), {
    position: [0, -0.01, 0.02],
  });
  addGlowSprite(head, { position: [0, 0.02, 0.05], color: 0xffc07b, scale: 0.55, opacity: 0.25 });
  return g;
};

const addPendant = (ctx) => {
  const { parent, era } = ctx;
  const g = group(parent, [0.35, 0, 0.45]);
  const shadeMaterial =
    era.year <= 2010
      ? fabricMaterial(`pendant-${era.year}`, { base: "#c8b89d", dark: "#9e8d73", light: "#dfd1b9" }, 1, 1, { side: THREE.DoubleSide })
      : era.year === 2015
        ? standard({ color: 0x2f2b26, roughness: 0.55, metalness: 0.3 })
        : fabricMaterial(`pendant-${era.year}`, { base: "#c6ad8c", dark: "#9f8768", light: "#ddc7a7" }, 1, 1, { side: THREE.DoubleSide });
  const shade = mesh(g, new THREE.ConeGeometry(0.34, 0.24, 28, 1, true), shadeMaterial, {
    position: [0, 2.78, 0],
    rotation: [Math.PI, 0, 0],
    castShadow: true,
  });
  shade.name = "pendant-shade";
  cylinder(g, 0.006, 0.006, 0.35, standard({ color: 0x252321, roughness: 0.55, metalness: 0.55 }), { position: [0, 3.07, 0], segments: 6 });
  mesh(g, new THREE.SphereGeometry(0.055, 14, 10), new THREE.MeshBasicMaterial({ color: 0xffd09a }), {
    position: [0, 2.67, 0],
  });
  addGlowSprite(g, { position: [0, 2.65, 0], color: 0xffc07c, scale: 1.1, opacity: 0.38 });
  return g;
};

const addMicrophone = (ctx, { x, z, year }) => {
  const { parent } = ctx;
  const metal = standard({ color: 0x262321, roughness: 0.35, metalness: 0.55 });
  const g = group(parent, [x, DESK_TOP + 0.01, z]);
  if (year >= 2020) {
    box(g, [0.12, 0.025, 0.12], metal, { position: [0, 0.012, 0] });
    const arm1 = box(g, [0.025, 0.55, 0.025], metal, { position: [0, 0.26, 0], rotation: [0.2, 0, -0.5] });
    arm1.name = "mic-arm";
    const head = group(g, [0.25, 0.5, 0.06], [0, 0, -0.2]);
    cylinder(head, 0.04, 0.04, 0.16, standard({ color: 0x1b1a19, roughness: 0.5 }), {
      position: [0, 0, 0],
      rotation: [Math.PI / 2, 0, 0],
      segments: 18,
      castShadow: true,
    });
    mesh(head, new THREE.TorusGeometry(0.07, 0.006, 6, 24), metal, { position: [0, 0, 0.07] });
    mesh(head, new THREE.CylinderGeometry(0.055, 0.055, 0.006, 24), standard({ color: 0x171615, roughness: 0.75 }), {
      position: [0, 0, 0.08],
      rotation: [Math.PI / 2, 0, 0],
    });
    addCable(g, [
      [0.08, 0.05, 0.02],
      [0.22, 0.04, 0.02],
      [0.32, 0.02, 0.12],
    ], 0.004);
  } else {
    const stand = cylinder(g, 0.08, 0.08, 0.015, metal, { position: [0, 0.008, 0], segments: 16 });
    cylinder(g, 0.01, 0.012, 0.26, metal, { position: [0, 0.14, 0], segments: 8 });
    const cup = mesh(g, new THREE.TorusGeometry(0.12, 0.015, 6, 20, Math.PI), metal, {
      position: [0, 0.28, 0],
      rotation: [0, 0, 0.1],
    });
    cup.name = "headphone-stand";
    addHeadphones(ctx, { x: x, y: DESK_TOP + 0.01, z: z + 0.01, rotY: 0.2 });
  }
  return g;
};

const addGuitar = (ctx) => {
  const { parent } = ctx;
  const g = group(parent, [-4.1, 0.52, 0.1], [0, Math.PI / 2, 0.08]);
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.52);
  shape.bezierCurveTo(0.18, 0.52, 0.24, 0.34, 0.17, 0.22);
  shape.bezierCurveTo(0.1, 0.12, 0.22, 0.02, 0.2, -0.18);
  shape.bezierCurveTo(0.18, -0.4, 0.08, -0.5, 0, -0.52);
  shape.bezierCurveTo(-0.08, -0.5, -0.18, -0.4, -0.2, -0.18);
  shape.bezierCurveTo(-0.22, 0.02, -0.1, 0.12, -0.17, 0.22);
  shape.bezierCurveTo(-0.24, 0.34, -0.18, 0.52, 0, 0.52);
  const bodyMaterial = woodMaterial("oak", 1, 1, { color: 0xc18b5a });
  mesh(g, new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: true, bevelSize: 0.012, bevelThickness: 0.012, bevelSegments: 2 }), bodyMaterial, {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    castShadow: true,
  });
  const neck = box(g, [0.07, 0.8, 0.045], standard({ color: 0x3c2b1b, roughness: 0.6 }), {
    position: [0, 0.9, 0.03],
    castShadow: true,
  });
  neck.name = "guitar-neck";
  box(g, [0.11, 0.16, 0.055], standard({ color: 0x2a1f16, roughness: 0.6 }), { position: [0, 1.36, 0.03] });
  for (let i = 0; i < 6; i += 1) {
    cylinder(g, 0.0035, 0.0035, 1.35, standard({ color: 0xc9b28a, roughness: 0.4, metalness: 0.7 }), {
      position: [-0.022 + i * 0.009, 0.78, 0.074],
      segments: 4,
    });
  }
  const soundHole = mesh(g, new THREE.CircleGeometry(0.075, 20), new THREE.MeshStandardMaterial({ color: 0x1e1510, roughness: 0.5 }), {
    position: [0, 0.2, 0.083],
  });
  soundHole.name = "guitar-hole";
  ctx.register("guitar", [0.55, 1.65, 0.32], [-4.1, 0.95, 0.1]);
  return g;
};

const addTrophy = (ctx, { x, y, z }) => {
  const { parent } = ctx;
  const gold = standard({ color: 0xb58a45, roughness: 0.26, metalness: 0.85 });
  const g = group(parent, [x, y, z]);
  box(g, [0.09, 0.025, 0.09], standard({ color: 0x3d2e1f, roughness: 0.65 }), { position: [0, 0.012, 0] });
  box(g, [0.045, 0.06, 0.045], gold, { position: [0, 0.052, 0] });
  mesh(g, new THREE.ConeGeometry(0.065, 0.11, 14, 1, true), gold, {
    position: [0, 0.13, 0],
    rotation: [Math.PI, 0, 0],
  });
  for (const side of [-1, 1]) {
    mesh(g, new THREE.TorusGeometry(0.03, 0.006, 5, 12, Math.PI), gold, {
      position: [side * 0.065, 0.13, 0],
      rotation: [0, side * Math.PI / 2, 0.4],
    });
  }
};

const addCDSpindle = (ctx, { x, y, z }) => {
  const { parent } = ctx;
  const clear = new THREE.MeshPhysicalMaterial({
    color: 0xa9c1c4,
    roughness: 0.1,
    metalness: 0,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  const g = group(parent, [x, y, z]);
  cylinder(g, 0.075, 0.075, 0.12, clear, { position: [0, 0.06, 0], segments: 24 });
  for (let i = 0; i < 9; i += 1) {
    cylinder(g, 0.068, 0.068, 0.003, new THREE.MeshStandardMaterial({
      color: i % 3 === 0 ? 0xcab57f : 0x9eadb0,
      roughness: 0.3,
      metalness: 0.3,
    }), { position: [0, 0.012 + i * 0.008, 0], segments: 24 });
  }
  cylinder(g, 0.03, 0.02, 0.035, standard({ color: 0x787a75, roughness: 0.5 }), { position: [0, 0.135, 0], segments: 12 });
};

const addNoodle = (ctx, { x, y, z }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z]);
  const cup = standard({ color: 0xe2ddce, roughness: 0.78 });
  const band = standard({ color: 0x9c3d30, roughness: 0.8 });
  cylinder(g, 0.048, 0.042, 0.11, cup, { position: [0, 0.055, 0], segments: 20, castShadow: true });
  cylinder(g, 0.049, 0.049, 0.03, band, { position: [0, 0.06, 0], segments: 20 });
  cylinder(g, 0.052, 0.04, 0.006, standard({ color: 0xd7cbb6, roughness: 0.9 }), { position: [0, 0.112, 0], segments: 20 });
  for (const [dx, dz, rz] of [
    [0.006, 0.005, 0.02],
    [0.014, -0.006, 0.03],
  ]) {
    cylinder(g, 0.003, 0.003, 0.15, standard({ color: 0xa98c5f, roughness: 0.95 }), {
      position: [dx, 0.18, dz],
      rotation: [rz, 0, 0.06],
      segments: 5,
    });
  }
};

const addCan = (ctx, { x, y, z, color = 0x5d755d }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z]);
  const metal = standard({ color: 0xc8c5ba, roughness: 0.25, metalness: 0.8 });
  cylinder(g, 0.03, 0.03, 0.11, standard({ color, roughness: 0.5, metalness: 0.2 }), { position: [0, 0.055, 0], segments: 18, castShadow: true });
  cylinder(g, 0.03, 0.03, 0.006, metal, { position: [0, 0.112, 0], segments: 18 });
  cylinder(g, 0.03, 0.03, 0.006, metal, { position: [0, 0.001, 0], segments: 18 });
};

const addBookStack = (ctx, { x, y, z, count = 3 }) => {
  const { parent, random } = ctx;
  let height = 0;
  for (let i = 0; i < count; i += 1) {
    const h = 0.018 + random() * 0.025;
    const w = 0.22 + random() * 0.06;
    const d = 0.15 + random() * 0.04;
    const color = SPINE_COLORS[(i + Math.floor(random() * 4)) % SPINE_COLORS.length];
    box(parent, [w, h, d], standard({ color, roughness: 0.9 }), {
      position: [x + random() * 0.02, y + height + h / 2, z + random() * 0.02],
      rotation: [0, (random() - 0.5) * 0.14, 0],
    });
    height += h;
  }
};

const addPhone = (ctx, { x, y, z, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const body = mesh(g, rounded(0.075, 0.008, 0.145, 0.012, 2), standard({ color: 0x1a1a1a, roughness: 0.35, metalness: 0.2 }), {
    castShadow: true,
  });
  body.name = "phone";
  plane(g, 0.064, 0.13, new THREE.MeshBasicMaterial({ color: 0x7fb3bf }), {
    position: [0, 0.0045, 0],
    rotation: [-Math.PI / 2, 0, 0],
  });
};

const addStandingFan = (ctx, { x, z, rotY = 0.4 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, 0, z], [0, rotY, 0]);
  const plastic = standard({ color: 0xcfc6b2, roughness: 0.62 });
  const dark = standard({ color: 0x5a554b, roughness: 0.6 });
  cylinder(g, 0.2, 0.23, 0.035, dark, { position: [0, 0.018, 0], segments: 20 });
  cylinder(g, 0.018, 0.018, 0.88, plastic, { position: [0, 0.47, 0], segments: 10 });
  const head = group(g, [0, 0.98, 0]);
  mesh(head, new THREE.TorusGeometry(0.21, 0.018, 6, 28), plastic, { position: [0, 0, 0], rotation: [0, 0, 0] });
  for (let i = 0; i < 3; i += 1) {
    const blade = mesh(head, new THREE.SphereGeometry(1, 10, 6), plastic, {
      position: [Math.cos((i / 3) * Math.PI * 2) * 0.09, Math.sin((i / 3) * Math.PI * 2) * 0.09, 0.015],
      rotation: [0, 0, (i / 3) * Math.PI * 2],
      scale: [0.08, 0.035, 0.005],
    });
    blade.name = "fan-blade-static";
  }
  mesh(head, new THREE.CylinderGeometry(0.04, 0.04, 0.035, 16), dark, {
    position: [0, 0, 0.025],
    rotation: [Math.PI / 2, 0, 0],
  });
  box(g, [0.32, 0.04, 0.24], dark, { position: [0, 0.045, 0.04] });
  return g;
};

const addLaundryBasket = (ctx, { x, z, color = 0xa08a6d }) => {
  const { parent, random } = ctx;
  const g = group(parent, [x, 0, z]);
  const wicker = standard({ color, roughness: 0.95 });
  const cloth = standard({ color: 0x6e7a80, roughness: 1 });
  cylinder(g, 0.18, 0.14, 0.34, wicker, { position: [0, 0.17, 0], segments: 18, castShadow: true });
  cylinder(g, 0.165, 0.165, 0.02, standard({ color: 0x3c3329, roughness: 1 }), { position: [0, 0.33, 0], segments: 18 });
  for (let i = 0; i < 4; i += 1) {
    mesh(g, new THREE.SphereGeometry(1, 8, 6), cloth, {
      position: [(random() - 0.5) * 0.16, 0.33 + i * 0.012, (random() - 0.5) * 0.15],
      scale: [0.11, 0.035, 0.1],
      rotation: [0.1, i * 0.6, 0.12],
    });
  }
  return g;
};

const addRecordPlayer = (ctx, { x, y, z }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z]);
  const wood = woodMaterial("walnut", 1, 1);
  box(g, [0.42, 0.06, 0.3], wood, { position: [0, 0.035, 0], castShadow: true });
  cylinder(g, 0.12, 0.12, 0.012, standard({ color: 0x191919, roughness: 0.42 }), { position: [-0.04, 0.071, 0], segments: 24 });
  cylinder(g, 0.1, 0.1, 0.004, standard({ color: 0x6b5e4e, roughness: 0.8 }), { position: [-0.04, 0.08, 0], segments: 24 });
  box(g, [0.012, 0.012, 0.22], standard({ color: 0xb0a68f, roughness: 0.35, metalness: 0.7 }), {
    position: [0.12, 0.085, 0.03],
    rotation: [0, 0.45, 0],
  });
  cylinder(g, 0.006, 0.006, 0.02, standard({ color: 0x1b1b1b, roughness: 0.5 }), { position: [0.05, 0.085, 0.08], segments: 8 });
  mesh(g, new THREE.SphereGeometry(0.006, 8, 6), new THREE.MeshBasicMaterial({ color: 0xffc47e }), {
    position: [0.17, 0.07, 0.12],
  });
  return g;
};

const buildFootChest = (ctx) => {
  const { era, parent, register } = ctx;
  const x = 3.15;
  const z = -0.38;
  const year = era.year;
  const g = group(parent, [x, 0, z]);
  const material =
    year === 2005
      ? woodMaterial("oak", 1.2, 1)
      : year === 2010
        ? standard({ color: 0x3b3530, roughness: 0.8 })
        : year === 2015
          ? standard({ color: 0x282521, roughness: 0.72 })
          : year === 2020
            ? fabricMaterial("chest-2020", { base: "#7b6652", dark: "#5d4b3a", light: "#9c836b" }, 1.2, 1)
            : woodMaterial("walnut", 1.2, 1);
  box(g, [1.16, 0.36, 0.5], material, { position: [0, 0.18, 0], castShadow: true, receiveShadow: true });
  box(g, [1.2, 0.055, 0.54], material, { position: [0, 0.385, 0], castShadow: true });
  if (year <= 2010) {
    const metal = standard({ color: 0x524a3f, roughness: 0.42, metalness: 0.6 });
    for (const side of [-1, 1]) {
      box(g, [0.025, 0.4, 0.505], metal, { position: [side * 0.56, 0.2, 0] });
    }
    box(g, [0.09, 0.03, 0.015], metal, { position: [0, 0.34, 0.253] });
  }
  if (year === 2005) {
    box(g, [0.22, 0.15, 0.01], standard({ color: 0xe2d8c2, roughness: 0.9 }), { position: [0.25, 0.225, 0.251], rotation: [0, 0, 0.04] });
    addBookStack(ctx, { x: x - 0.38, y: 0.41, z: z + 0.03, count: 2 });
  } else if (year === 2010) {
    addBookStack(ctx, { x: x + 0.28, y: 0.41, z: z - 0.03, count: 3 });
    box(g, [0.35, 0.05, 0.3], fabricMaterial("folded-2010", { base: "#5e6e79", dark: "#43515a", light: "#7e8e99" }), { position: [-0.3, 0.435, 0.02], rotation: [0, 0.06, 0] });
  } else if (year === 2015) {
    box(g, [0.68, 0.04, 0.36], standard({ color: 0x3f534f, roughness: 0.9 }), { position: [0.05, 0.43, 0] });
    addController(ctx, { x: x + 0.35, y: 0.44, z: z + 0.09, color: 0x171716, rotY: 0.4 });
  } else if (year === 2020) {
    addBookStack(ctx, { x: x - 0.34, y: 0.41, z: z - 0.05, count: 2 });
    addPlant(ctx, { x: x + 0.33, y: 0.41, z: z - 0.1, scale: 0.36, potColor: 0x5d4b3f, leaves: 5 });
  } else {
    addRecordPlayer(ctx, { x: x + 0.22, y: 0.41, z: z - 0.02 });
    for (let i = 0; i < 4; i += 1) {
      box(g, [0.02, 0.28, 0.29], standard({ color: [0x4a3a2b, 0x6d5a46, 0x2e3335, 0x8b6a45][i], roughness: 0.9 }), {
        position: [-0.43 + i * 0.028, 0.55, -0.04],
        rotation: [0.04, 0.06, 0.04],
      });
    }
  }
  addContact(parent, x, z, 1.4, 0.7, 0.3);
  register("chest", [1.35, 0.7, 0.7], [x, 0.3, z]);
  return g;
};

const buildLounge = (ctx) => {
  const { era, parent, register } = ctx;
  const year = era.year;
  const x = 2.98;
  const z = 1.3;
  const g = group(parent, [x, 0, z], [0, -1.85, 0]);
  if (year <= 2010) {
    const cover =
      year === 2005
        ? plaidMaterial("cushion-2005", ["#697b88", "#3b4d5b", "#a9b5bc", 12])
        : fabricMaterial("bean-2010", { base: "#3f5268", dark: "#2a3747", light: "#667b92" }, 1.6, 1.3);
    mesh(g, new THREE.SphereGeometry(1, 20, 14), cover, {
      position: [0, 0.26, 0],
      scale: [0.58, 0.32, 0.56],
      castShadow: true,
    });
    mesh(g, new THREE.SphereGeometry(1, 18, 12), cover, {
      position: [0.05, 0.46, -0.18],
      scale: [0.46, 0.24, 0.24],
      rotation: [-0.35, 0, 0.08],
      castShadow: true,
    });
    if (year === 2010) {
      box(g, [0.48, 0.035, 0.34], fabricMaterial("hoodie-2010", { base: "#6c6a63", dark: "#4d4c48", light: "#8e8b82" }), {
        position: [0.05, 0.6, -0.2],
        rotation: [0.1, 0, 0.05],
      });
    }
  } else {
    const fabric =
      year === 2015
        ? fabricMaterial("lounge-2015", { base: "#4c5a52", dark: "#35423b", light: "#6c7b70" }, 1.5, 1.2)
        : year === 2020
          ? fabricMaterial("lounge-2020", { base: "#b3a58d", dark: "#8e806b", light: "#cdbfa4" }, 1.5, 1.2)
          : fabricMaterial("lounge-2025", { base: "#6b6250", dark: "#4a4336", light: "#8b8068" }, 1.5, 1.2);
    for (const [lx, lz] of [
      [-0.42, -0.28],
      [0.42, -0.28],
      [-0.42, 0.3],
      [0.42, 0.3],
    ]) {
      cylinder(g, 0.025, 0.032, 0.14, woodMaterial("walnut", 1, 1), {
        position: [lx, 0.07, lz],
        rotation: [0, 0, lx > 0 ? -0.12 : 0.12],
        segments: 8,
      });
    }
    mesh(g, rounded(0.86, 0.16, 0.78, 0.06, 3), fabric, { position: [0, 0.34, 0.02], castShadow: true });
    mesh(g, rounded(0.84, 0.52, 0.14, 0.06, 3), fabric, {
      position: [0, 0.62, -0.34],
      rotation: [-0.16, 0, 0],
      castShadow: true,
    });
    for (const side of [-1, 1]) {
      mesh(g, rounded(0.14, 0.32, 0.7, 0.05, 3), fabric, {
        position: [side * 0.47, 0.46, 0.02],
        castShadow: true,
      });
    }
    if (year >= 2025) {
      const throwMaterial = fabricMaterial("lounge-throw-2025", { base: "#9b4d31", dark: "#74331f", light: "#b87050" }, 1.3, 1);
      mesh(g, rounded(0.7, 0.035, 0.42, 0.02, 2), throwMaterial, {
        position: [0.04, 0.7, -0.08],
        rotation: [0.04, 0.05, 0],
      });
    }
  }
  addContact(parent, x, z, 1.35, 1.3, 0.3);
  register("lounge", [1.15, 0.95, 1.1], [x, 0.45, z]);
  return g;
};

const buildSideTable = (ctx) => {
  const { era, parent } = ctx;
  const x = 1.93;
  const z = 1.78;
  const g = group(parent, [x, 0, z]);
  const year = era.year;
  if (year === 2005) {
    box(g, [0.44, 0.42, 0.38], standard({ color: 0x765b40, roughness: 0.9 }), { position: [0, 0.21, 0], castShadow: true });
    addAlarmClock(ctx, { x, y: 0.42, z: z + 0.03, rotY: 0.2 });
  } else {
    const top = woodMaterial(year === 2010 ? "oak" : "walnut", 1, 1);
    const metal = standard({ color: 0x262321, roughness: 0.45, metalness: 0.5 });
    cylinder(g, 0.27, 0.29, 0.035, top, { position: [0, 0.47, 0], segments: 24, castShadow: true });
    for (let i = 0; i < 3; i += 1) {
      const a = (i / 3) * Math.PI * 2;
      cylinder(g, 0.014, 0.018, 0.45, metal, {
        position: [Math.cos(a) * 0.16, 0.23, Math.sin(a) * 0.16],
        rotation: [Math.sin(a) * 0.12, 0, -Math.cos(a) * 0.12],
        segments: 8,
      });
    }
    if (year === 2010) {
      addBookStack(ctx, { x: x - 0.06, y: 0.49, z: z + 0.04, count: 2 });
      addPhone(ctx, { x: x + 0.08, y: 0.49, z: z - 0.08, rotY: 0.2 });
    } else if (year === 2015) {
      addCan(ctx, { x: x + 0.07, y: 0.49, z: z - 0.04, color: 0x4d5f4a });
    } else {
      addBookStack(ctx, { x: x - 0.04, y: 0.49, z: z + 0.02, count: 2 });
      addPlant(ctx, { x: x + 0.1, y: 0.49, z: z - 0.06, scale: 0.3, potColor: 0x5f4a3b, leaves: 4 });
    }
  }
  addContact(parent, x, z, 0.7, 0.7, 0.24);
  return g;
};

const addSlippers = (ctx) => {
  const { parent } = ctx;
  const material = standard({ color: 0x6f6657, roughness: 0.96 });
  for (let i = 0; i < 2; i += 1) {
    mesh(parent, new THREE.SphereGeometry(1, 12, 8), material, {
      position: [2.22 + i * 0.22, 0.035, -0.34],
      rotation: [0, 0.15, 0],
      scale: [0.11, 0.035, 0.2],
    });
  }
};

const addNeonSign = (ctx, { x, y, z, text = "星港" }) => {
  const { parent } = ctx;
  const texture = buildSignTexture(text, "#ffd19a");
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    toneMapped: false,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const g = group(parent, [x, y, z]);
  box(g, [0.82, 0.38, 0.035], standard({ color: 0x17130f, roughness: 0.54, metalness: 0.25 }), { position: [0, 0, -0.02] });
  plane(g, 0.86, 0.42, material, { position: [0, 0, 0.002] });
  addGlowSprite(g, { position: [0, 0, 0.16], color: 0xffc27d, scale: 0.9, opacity: 0.12 });
};

const addCorkboard = (ctx, { x, y }) => {
  const { parent, random } = ctx;
  const g = group(parent, [x, y, -3.77]);
  box(g, [0.62, 0.46, 0.03], woodMaterial("oak", 1, 1), { position: [0, 0, 0] });
  box(g, [0.58, 0.42, 0.012], standard({ color: 0x9a7654, roughness: 0.95 }), { position: [0, 0, 0.018] });
  for (let i = 0; i < 5; i += 1) {
    const color = [0xe6dfcc, 0xd9cbb5, 0xc9d1ca, 0xe0c9b2][i % 4];
    const paper = plane(g, 0.16 + random() * 0.06, 0.1 + random() * 0.08, standard({ color, roughness: 0.9 }), {
      position: [(random() - 0.5) * 0.36, (random() - 0.5) * 0.26, 0.026],
      rotation: [0, 0, (random() - 0.5) * 0.2],
    });
    paper.name = "cork-note";
  }
  for (let i = 0; i < 3; i += 1) {
    mesh(g, new THREE.SphereGeometry(0.007, 6, 4), new THREE.MeshBasicMaterial({ color: [0xb74b3b, 0x487d9b, 0xd0a83e][i] }), {
      position: [-0.1 + i * 0.1, 0.1, 0.034],
    });
  }
};

const addKeycapTray = (ctx, { x, y, z }) => {
  const { parent, random } = ctx;
  const g = group(parent, [x, y, z]);
  box(g, [0.3, 0.02, 0.19], standard({ color: 0x383432, roughness: 0.65 }), { position: [0, 0.01, 0] });
  const capColors = [0xe4ddcf, 0xcfc4b2, 0xb87955, 0x4d6d6b];
  const caps = new THREE.InstancedMesh(
    new THREE.BoxGeometry(0.036, 0.024, 0.036),
    standard({ color: 0xffffff, roughness: 0.5 }),
    18
  );
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (let i = 0; i < 18; i += 1) {
    dummy.position.set(-0.12 + (i % 6) * 0.047, 0.033, -0.06 + Math.floor(i / 6) * 0.055);
    dummy.rotation.set(0, (random() - 0.5) * 0.12, 0);
    dummy.updateMatrix();
    caps.setMatrixAt(i, dummy.matrix);
    caps.setColorAt(i, color.setHex(capColors[i % capColors.length]));
  }
  caps.instanceMatrix.needsUpdate = true;
  if (caps.instanceColor) caps.instanceColor.needsUpdate = true;
  g.add(caps);
};

const addWaterBottle = (ctx, { x, y, z }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z]);
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x8ca9a2,
    roughness: 0.1,
    metalness: 0,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
  });
  cylinder(g, 0.037, 0.042, 0.24, glass, { position: [0, 0.12, 0], segments: 18, castShadow: true });
  cylinder(g, 0.025, 0.03, 0.03, standard({ color: 0x3f4e45, roughness: 0.5 }), { position: [0, 0.25, 0], segments: 14 });
};

const buildClutter = (ctx) => {
  const { era, parent, random } = ctx;
  const y = DESK_TOP;
  if (era.year === 2005) {
    addNoodle(ctx, { x: -0.92, y, z: -3.43 });
    addBookStack(ctx, { x: -2.53, y, z: -2.82, count: 3 });
    cylinder(parent, 0.03, 0.036, 0.2, standard({ color: 0x6e5a40, roughness: 0.75 }), {
      position: [-2.58, DESK_TOP + 0.1, -3.54],
      segments: 14,
    });
    for (let i = 0; i < 3; i += 1) {
      cylinder(parent, 0.003, 0.003, 0.19, standard({ color: 0xd8b84d, roughness: 0.6 }), {
        position: [-2.58 + i * 0.009, DESK_TOP + 0.23, -3.54],
        rotation: [0, 0, 0.04 * i],
        segments: 4,
      });
    }
    box(parent, [0.3, 0.035, 0.22], standard({ color: 0x8c4c39, roughness: 0.92 }), {
      position: [-0.98, 0.762, -2.86],
      rotation: [0, 0.15, 0],
    });
    addCable(parent, [
      [-2.65, 0.04, -3.28],
      [-2.7, 0.02, -2.95],
      [-2.25, 0.012, -2.8],
      [-1.58, 0.02, -2.83],
    ], 0.006);
    addCable(parent, [
      [-0.55, 0.28, -3.15],
      [-0.82, 0.06, -3.0],
      [-1.12, 0.04, -3.08],
      [-1.4, 0.02, -3.0],
    ], 0.008, 0x5e5a50);
    const bag = standard({ color: 0x435662, roughness: 0.9 });
    mesh(parent, rounded(0.4, 0.45, 0.2, 0.08, 2), bag, {
      position: [2.4, 0.26, -0.62],
      rotation: [0.08, 0.35, 0.06],
      castShadow: true,
    });
    box(parent, [0.04, 0.3, 0.035], standard({ color: 0x303b42, roughness: 0.85 }), {
      position: [2.55, 0.32, -0.55],
      rotation: [0.1, 0.2, 0.1],
    });
  } else if (era.year === 2010) {
    addCan(ctx, { x: -0.94, y, z: -2.93, color: 0x3e5c4a });
    addBookStack(ctx, { x: -2.22, y, z: -2.94, count: 4 });
    addPhone(ctx, { x: -0.84, y: y + 0.004, z: -3.32, rotY: -0.25 });
    addCaseRow(ctx, { x: -2.85, y: 1.55 + 0.023, z: -3.59, width: 0.4, count: 8, height: 0.18 });
    addCRTKeepsake(ctx, { x: -3.58, y: 0, z: -2.62, rotY: 0.55, scale: 0.58 });
    addCable(parent, [
      [-2.78, 0.04, -3.25],
      [-2.95, 0.02, -3.0],
      [-2.6, 0.012, -2.78],
      [-1.7, 0.02, -2.88],
    ], 0.006);
    addCable(parent, [
      [-1.0, 0.25, -3.42],
      [-0.9, 0.03, -3.22],
      [-1.2, 0.02, -3.08],
      [-1.55, 0.012, -3.02],
    ], 0.008);
    for (let i = 0; i < 3; i += 1) {
      box(parent, [0.34, 0.2, 0.28], standard({ color: 0x7e725d, roughness: 0.92 }), {
        position: [-3.55, 0.1 + i * 0.21, -3.18],
        rotation: [0, i * 0.08, 0],
      });
    }
  } else if (era.year === 2015) {
    addCan(ctx, { x: -0.84, y, z: -2.84, color: 0x704234 });
    addBookStack(ctx, { x: 0.05, y: 0.72, z: -2.65, count: 3 });
    addController(ctx, { x: -0.92, y: y + 0.004, z: -2.8, color: 0x232322, rotY: 0.45 });
    addKeycapTray(ctx, { x: -2.35, y, z: -2.92 });
    addPhone(ctx, { x: -0.79, y: y + 0.004, z: -3.28, rotY: 0.1 });
    addHeadphones(ctx, { x: -2.9, y: 1.58, z: -3.57, rotY: 0.4 });
    addCable(parent, [
      [-2.66, 0.03, -3.35],
      [-2.5, 0.012, -3.07],
      [-1.9, 0.02, -2.98],
    ], 0.006);
    addCable(parent, [
      [-0.72, 0.3, -3.2],
      [-0.55, 0.04, -2.96],
      [-0.95, 0.02, -3.05],
      [-1.25, 0.012, -3.0],
    ], 0.009);
    addCRTKeepsake(ctx, { x: 1.67, y: 0.735, z: -3.46, rotY: -0.2, scale: 0.62 });
  } else if (era.year === 2020) {
    addMicrophone(ctx, { x: -0.34, z: -3.2, year: era.year });
    addWaterBottle(ctx, { x: -0.23, y, z: -2.73 });
    addBookStack(ctx, { x: 0.02, y: 0.72, z: -2.74, count: 2 });
    addKeycapTray(ctx, { x: -0.44, y: 0.72, z: -2.52 });
    addPhone(ctx, { x: -0.7, y: y + 0.004, z: -3.27, rotY: 0.22 });
    addController(ctx, { x: -2.55, y: y + 0.004, z: -2.78, color: 0xe2ded3, rotY: 0.3 });
    addPlant(ctx, { x: -2.78, y, z: -3.3, scale: 0.62, potColor: 0x5e5144, leaves: 7 });
    addCable(parent, [
      [-2.75, 0.03, -3.35],
      [-2.55, 0.012, -3.1],
      [-1.96, 0.02, -3.05],
    ], 0.008);
    addCable(parent, [
      [-0.85, 0.3, -3.2],
      [-0.63, 0.05, -2.94],
      [-1.1, 0.02, -3.06],
      [-1.42, 0.012, -3.0],
    ], 0.009);
    addCable(parent, [
      [-0.4, 0.1, -3.55],
      [-0.15, 0.03, -3.25],
      [-0.6, 0.02, -3.1],
    ], 0.005);
    addConsole(ctx, { x: 2.18, y: 0, z: -1.15, variant: 2020, scale: 0.8, rotY: -0.3 });
    addCRTKeepsake(ctx, { x: 1.52, y: 1.403, z: -3.56, rotY: 0.12, scale: 0.55 });
  } else {
    addBookStack(ctx, { x: 0.02, y: 0.72, z: -2.65, count: 2 });
    addKeycapTray(ctx, { x: -0.42, y: 0.72, z: -2.46 });
    addPhone(ctx, { x: -0.65, y: y + 0.004, z: -3.27, rotY: 0.18 });
    addController(ctx, { x: -2.46, y: y + 0.004, z: -2.72, color: 0x1c1b1a, rotY: 0.2 });
    addPlant(ctx, { x: -2.78, y, z: -3.3, scale: 0.7, potColor: 0x6b4c39, leaves: 8 });
    addHeadphones(ctx, { x: -2.92, y: 1.66, z: -3.56, rotY: 0.3 });
    addCable(parent, [
      [-2.8, 0.03, -3.35],
      [-2.6, 0.012, -3.12],
      [-2.05, 0.02, -3.06],
    ], 0.008);
    addCable(parent, [
      [-0.85, 0.3, -3.2],
      [-0.66, 0.05, -2.96],
      [-1.1, 0.02, -3.05],
      [-1.46, 0.012, -3.0],
    ], 0.009);
    addConsole(ctx, { x: 2.18, y: 0, z: -1.15, variant: 2015, scale: 0.8, rotY: -0.2 });
    addCRTKeepsake(ctx, { x: 1.52, y: 1.403, z: -3.56, rotY: 0.12, scale: 0.55, label: "2005.6 —" });
  }
  if (era.year >= 2010) {
    addFloorLamp(ctx, { x: 4.05, z: 2.82, year: era.year });
  }
  if (era.year >= 2015) {
    addGuitar(ctx);
  }
  if (era.year <= 2010) {
    addStandingFan(ctx, { x: -3.18, z: 2.98, rotY: 0.2 });
    addLaundryBasket(ctx, { x: -2.48, z: 3.05, color: era.year === 2005 ? 0x9b8363 : 0x827663 });
  }
  if (era.year >= 2015) {
    addLaundryBasket(ctx, { x: -2.55, z: 3.05, color: 0x8f7d64 });
  }
  if (era.year >= 2020) {
    addPlant(ctx, { x: -3.72, y: 0, z: 2.95, scale: 1.05, potColor: 0x5e4937, leaves: 11 });
  }
};

const buildWallDecor = (ctx) => {
  const { era, parent } = ctx;
  const chartTexture = cached("height-chart", heightChartTexture);
  const chart = plane(parent, 0.3, 1.06, new THREE.MeshStandardMaterial({
    map: chartTexture,
    roughness: 0.9,
    emissive: 0xffffff,
    emissiveMap: chartTexture,
    emissiveIntensity: 0.035,
  }), {
    position: [-4.386, 1.18, 0.32],
    rotation: [0, Math.PI / 2, 0],
  });
  chart.name = "height-chart";
  if (era.year === 2005) {
    addPoster(ctx, { texture: posterTexture("space2005"), x: 0.78, y: 2.3, width: 0.58, height: 0.8, tape: true });
    addCorkboard(ctx, { x: -3.4, y: 2.3 });
    const tape = new THREE.MeshStandardMaterial({ color: 0xcdbd9f, roughness: 0.85, transparent: true, opacity: 0.72 });
    for (const [tx, ty, rz] of [
      [-1.62, 3.18, 0.5],
      [-0.88, 3.18, -0.4],
    ]) {
      plane(parent, 0.1, 0.024, tape, { position: [tx, ty, -3.772], rotation: [0, 0, rz] });
    }
  } else if (era.year === 2010) {
    addPoster(ctx, { texture: posterTexture("space2010"), x: 0.72, y: 2.24, width: 0.58, height: 0.8, tape: false, frame: true });
    addPoster(ctx, { texture: posterTexture("band"), x: 1.63, y: 2.22, width: 0.4, height: 0.58, tape: true });
    const frameMaterial = standard({ color: 0x8a6b47, roughness: 0.65 });
    for (const [w, h, x, y] of [
      [0.86, 0.025, -1.25, 3.21],
      [0.86, 0.025, -1.25, 2.65],
      [0.025, 0.58, -1.67, 2.93],
      [0.025, 0.58, -0.83, 2.93],
    ]) {
      box(parent, [w, h, 0.02], frameMaterial, { position: [x, y, -3.774] });
    }
  } else if (era.year === 2015) {
    addPoster(ctx, { texture: posterTexture("space2015"), x: 0.94, y: 2.25, width: 0.64, height: 0.86, frame: true });
    const photoMaterial = new THREE.MeshStandardMaterial({ map: cityPhotoTexture(0), roughness: 0.82 });
    plane(parent, 0.34, 0.24, photoMaterial, { position: [1.72, 2.25, -3.772] });
    box(parent, [0.38, 0.02, 0.02], standard({ color: 0x352b21, roughness: 0.6 }), { position: [1.72, 2.39, -3.77] });
    box(parent, [0.38, 0.02, 0.02], standard({ color: 0x352b21, roughness: 0.6 }), { position: [1.72, 2.11, -3.77] });
    const frameMaterial = standard({ color: 0x2f2922, roughness: 0.5, metalness: 0.2 });
    for (const [w, h, x, y] of [
      [0.82, 0.018, -1.25, 3.22],
      [0.82, 0.018, -1.25, 2.64],
      [0.018, 0.58, -1.66, 2.93],
      [0.018, 0.58, -0.84, 2.93],
    ]) {
      box(parent, [w, h, 0.018], frameMaterial, { position: [x, y, -3.773] });
    }
  } else if (era.year === 2020) {
    addNeonSign(ctx, { x: 0.9, y: 2.55, z: -3.77, text: "星港" });
    addPoster(ctx, { texture: posterTexture("photo"), x: 1.7, y: 2.24, width: 0.38, height: 0.5, frame: true });
    const foam = standard({ color: 0x2b2c2b, roughness: 0.9 });
    for (let row = 0; row < 2; row += 1) {
      for (let col = 0; col < 3; col += 1) {
        box(parent, [0.22, 0.22, 0.03], foam, {
          position: [-3.62 + col * 0.24, 2.6 - row * 0.24, -3.76],
          rotation: [0, 0, 0],
        });
      }
    }
    addWallFrame(ctx, { x: 1.72, y: 1.9, width: 0.3, height: 0.22, variant: 2 });
    const frameMaterial = standard({ color: 0x2d241c, roughness: 0.5, metalness: 0.18 });
    for (const [w, h, x, y] of [
      [0.84, 0.02, -1.25, 3.23],
      [0.84, 0.02, -1.25, 2.63],
      [0.02, 0.62, -1.67, 2.93],
      [0.02, 0.62, -0.83, 2.93],
    ]) {
      box(parent, [w, h, 0.02], frameMaterial, { position: [x, y, -3.774] });
    }
  } else {
    addWallFrame(ctx, { x: 0.34, y: 2.34, width: 0.3, height: 0.22, variant: 0 });
    addWallFrame(ctx, { x: 0.82, y: 2.5, width: 0.24, height: 0.18, variant: 1 });
    addWallFrame(ctx, { x: 1.2, y: 2.2, width: 0.4, height: 0.28, variant: 2 });
    addWallFrame(ctx, { x: 1.88, y: 2.36, width: 0.3, height: 0.22, variant: 0 });
    addNeonSign(ctx, { x: 2.08, y: 1.9, z: -3.77, text: "HOME" });
    const frameMaterial = standard({ color: 0x241d16, roughness: 0.5, metalness: 0.2 });
    for (const [w, h, x, y] of [
      [0.86, 0.022, -1.25, 3.24],
      [0.86, 0.022, -1.25, 2.62],
      [0.022, 0.62, -1.68, 2.93],
      [0.022, 0.62, -0.82, 2.93],
    ]) {
      box(parent, [w, h, 0.022], frameMaterial, { position: [x, y, -3.775] });
    }
  }
};

const buildShelves = (ctx) => {
  const { era } = ctx;
  if (era.year === 2005) {
    addShelf(ctx, { x: -1.7, y: 1.56, width: 1.86, fill: "books", count: 15 });
    addTrophy(ctx, { x: -2.55, y: 1.585, z: -3.58 });
    addCDSpindle(ctx, { x: -0.86, y: 1.585, z: -3.58 });
    ctx.register("shelf", [1.8, 0.34, 0.3], [-1.7, 1.71, -3.6]);
  } else if (era.year === 2010) {
    addShelf(ctx, { x: -1.7, y: 1.55, width: 1.9, fill: "cases", count: 13 });
    addShelf(ctx, { x: -2.0, y: 1.97, width: 1.4, fill: "books", count: 12 });
    addConsole(ctx, { x: -3.45, y: 1.573, z: -3.58, variant: 2010, scale: 0.45, rotY: 0.15 });
    ctx.register("shelf", [1.86, 0.32, 0.3], [-1.7, 1.7, -3.6]);
    ctx.register("shelf", [1.36, 0.32, 0.3], [-2.0, 2.12, -3.6]);
  } else if (era.year === 2015) {
    addShelf(ctx, { x: -1.65, y: 1.52, width: 2.15, fill: "cases", count: 16 });
    addShelf(ctx, { x: -1.75, y: 1.9, width: 1.85, fill: "display", count: 12 });
    addShelf(ctx, { x: -2.0, y: 2.28, width: 1.4, fill: "books", count: 10 });
    ctx.register("shelf", [2.1, 0.3, 0.3], [-1.65, 1.67, -3.6]);
    ctx.register("shelf", [1.8, 0.3, 0.3], [-1.75, 2.05, -3.6]);
  } else if (era.year === 2020) {
    addShelf(ctx, { x: -1.7, y: 1.58, width: 2.38, fill: "books", count: 16 });
    addShelf(ctx, { x: -1.9, y: 2.0, width: 1.98, fill: "display", count: 12 });
    box(ctx.parent, [2.25, 0.012, 0.012], new THREE.MeshBasicMaterial({ color: 0xffc17e }), {
      position: [-1.7, 1.551, -3.5],
    });
    ctx.register("shelf", [2.34, 0.3, 0.3], [-1.7, 1.73, -3.6]);
    ctx.register("shelf", [1.94, 0.3, 0.3], [-1.9, 2.15, -3.6]);
  } else {
    addShelf(ctx, { x: -1.65, y: 1.64, width: 2.5, fill: "display", count: 10 });
    addShelf(ctx, { x: -1.9, y: 2.06, width: 2.0, fill: "books", count: 13 });
    box(ctx.parent, [2.36, 0.008, 0.01], new THREE.MeshBasicMaterial({ color: 0xffd3a0 }), {
      position: [-1.65, 1.611, -3.5],
    });
    ctx.register("shelf", [2.46, 0.3, 0.3], [-1.65, 1.79, -3.6]);
    ctx.register("shelf", [1.96, 0.3, 0.3], [-1.9, 2.21, -3.6]);
  }
};

const buildWallpaper = (ctx) => {
  const { era, parent } = ctx;
  const texture = wallpaperTexture(era.year).clone();
  texture.repeat.set(3.4, 1.25);
  texture.needsUpdate = true;
  const material = standard({ map: texture, roughness: 0.94, metalness: 0 });
  plane(parent, 8.95, 3.24, material, {
    position: [0, 1.62, -3.793],
    receiveShadow: true,
  });
};

const addAlarmClock = (ctx, { x, y, z, rotY = 0 }) => {
  const { parent } = ctx;
  const g = group(parent, [x, y, z], [0, rotY, 0]);
  const shell = standard({ color: 0xc4b393, roughness: 0.6 });
  mesh(g, rounded(0.13, 0.085, 0.06, 0.02, 2), shell, { position: [0, 0.043, 0], castShadow: true });
  plane(g, 0.09, 0.065, new THREE.MeshBasicMaterial({ color: 0xd9e0d3 }), { position: [0, 0.048, 0.032] });
  for (let i = 0; i < 2; i += 1) {
    cylinder(g, 0.002, 0.002, 0.03, standard({ color: 0x2a2521, roughness: 0.5 }), {
      position: [-0.01 + i * 0.02, 0.049, 0.036],
      rotation: [0, 0, i ? 0.7 : -0.5],
      segments: 4,
    });
  }
  return g;
};

const buildNightstand = (ctx) => {
  const { era, parent } = ctx;
  const x = 2.2;
  const z = -3.32;
  const material =
    era.year === 2005
      ? woodMaterial("oak", 1, 1)
      : era.year === 2010
        ? standard({ color: 0xc9c1b2, roughness: 0.8 })
        : era.year === 2015
          ? standard({ color: 0x302b25, roughness: 0.7 })
          : era.year === 2020
            ? standard({ color: 0x6a5845, roughness: 0.7 })
            : woodMaterial("walnut", 1, 1);
  const g = group(parent, [x, 0, z]);
  box(g, [0.44, 0.5, 0.38], material, { position: [0, 0.25, 0], castShadow: true });
  box(g, [0.37, 0.17, 0.02], standard({ color: era.year <= 2010 ? 0x88765e : 0x1b1917, roughness: 0.75 }), {
    position: [0, 0.34, 0.2],
  });
  box(g, [0.37, 0.17, 0.02], standard({ color: era.year <= 2010 ? 0x88765e : 0x1b1917, roughness: 0.75 }), {
    position: [0, 0.15, 0.2],
  });
  box(g, [0.05, 0.012, 0.012], standard({ color: 0x9b7a50, roughness: 0.45, metalness: 0.5 }), { position: [0, 0.34, 0.217] });
  if (era.year === 2005) {
    addAlarmClock(ctx, { x, y: 0.5, z: z + 0.04, rotY: 0.15 });
    addBookStack(ctx, { x: x - 0.13, y: 0.5, z: z - 0.08, count: 2 });
  } else if (era.year === 2010) {
    addPhone(ctx, { x: x + 0.04, y: 0.5, z: z + 0.05, rotY: 0.2 });
    addCan(ctx, { x: x - 0.14, y: 0.5, z: z - 0.06, color: 0x495949 });
  } else if (era.year === 2015) {
    addAlarmClock(ctx, { x: x - 0.12, y: 0.5, z: z + 0.03, rotY: -0.2 });
    addWallFrame(ctx, { x, y: 0.59, width: 0.2, height: 0.15, variant: 1, z: z + 0.21 });
  } else if (era.year === 2020) {
    addBookStack(ctx, { x: x - 0.05, y: 0.5, z: z + 0.01, count: 2 });
    addPlant(ctx, { x: x + 0.12, y: 0.5, z: z - 0.07, scale: 0.42, potColor: 0x75604c, leaves: 5 });
  } else {
    addAlarmClock(ctx, { x: x - 0.1, y: 0.5, z: z + 0.04, rotY: 0.12 });
    addBookStack(ctx, { x: x + 0.07, y: 0.5, z: z, count: 2 });
    addPlant(ctx, { x: x + 0.15, y: 0.5, z: z - 0.1, scale: 0.42, potColor: 0x6a503c, leaves: 5 });
  }
  addContact(parent, x, z, 0.6, 0.55, 0.26);
};

const buildEra = (ctx) => {
  const { era, parent, register } = ctx;
  buildWallpaper(ctx);
  buildWindowSky(era, parent);
  buildCurtains(era, parent);
  buildWindowSill(era, parent);
  addRug(era, parent);
  buildDesk(ctx);
  buildChair(ctx);

  if (era.year === 2005) {
    addCRTMonitor(ctx, { x: -1.72, z: -3.42, scale: 1 });
    addSpeakers(ctx, { x: -1.72, z: -3.58 });
    addKeyboard(ctx, { x: -1.72, z: -3.02, year: 2005 });
    addMouse(ctx, { x: -1.08, z: -3.04, year: 2005, padSize: [0.26, 0.21] });
    register("keyboard", [0.78, 0.08, 0.34], [-1.42, DESK_TOP + 0.04, -3.03]);
    addPC(ctx, { x: -0.55, z: -3.05, variant: 2005 });
  } else if (era.year === 2010) {
    addLCDMonitor(ctx, { x: -1.7, z: -3.38, width: 0.62, height: 0.35, standHeight: 0.14 });
    addKeyboard(ctx, { x: -1.7, z: -3.03, year: 2010 });
    addMouse(ctx, { x: -1.12, z: -3.04, year: 2010, padSize: [0.36, 0.28] });
    register("keyboard", [0.82, 0.08, 0.38], [-1.4, DESK_TOP + 0.04, -3.03]);
    addPC(ctx, { x: -1.02, z: -3.38, variant: 2010 });
    addConsole(ctx, { x: 1.1, y: 0.735, z: -3.48, variant: 2010, scale: 0.55, rotY: 0.1 });
  } else if (era.year === 2015) {
    addLCDMonitor(ctx, { x: -1.86, z: -3.39, width: 0.7, height: 0.4, standHeight: 0.12 });
    addLCDMonitor(ctx, {
      x: -1.04,
      z: -3.41,
      width: 0.28,
      height: 0.46,
      standHeight: 0.1,
      vertical: true,
      secondary: true,
    });
    addKeyboard(ctx, { x: -1.66, z: -3.02, year: 2015, rgb: true });
    addMouse(ctx, { x: -1.08, z: -3.04, year: 2015, padSize: [0.42, 0.32] });
    register("keyboard", [0.9, 0.08, 0.4], [-1.4, DESK_TOP + 0.04, -3.03]);
    addPC(ctx, { x: -0.75, z: -3.38, variant: 2015 });
  } else if (era.year === 2020) {
    addLCDMonitor(ctx, { x: -1.93, z: -3.42, width: 0.94, height: 0.37, standHeight: 0.14, arm: true });
    addLCDMonitor(ctx, {
      x: -1.06,
      z: -3.43,
      width: 0.29,
      height: 0.48,
      standHeight: 0.1,
      vertical: true,
      secondary: true,
      arm: true,
    });
    addKeyboard(ctx, { x: -1.73, z: -3.02, year: 2020, rgb: true });
    addMouse(ctx, { x: -1.08, z: -3.03, year: 2020, padSize: [0.46, 0.36] });
    register("keyboard", [0.94, 0.08, 0.44], [-1.4, DESK_TOP + 0.04, -3.03]);
    addPC(ctx, { x: -0.85, z: -3.38, variant: 2020 });
  } else {
    addLCDMonitor(ctx, { x: -1.92, z: -3.42, width: 0.82, height: 0.46, standHeight: 0.13, arm: true });
    addLCDMonitor(ctx, {
      x: -1.06,
      z: -3.43,
      width: 0.28,
      height: 0.48,
      standHeight: 0.1,
      vertical: true,
      secondary: true,
      arm: true,
    });
    addKeyboard(ctx, { x: -1.75, z: -3.02, year: 2025, scale: 0.95 });
    addMouse(ctx, { x: -1.12, z: -3.03, year: 2025, padSize: [0.44, 0.34] });
    register("keyboard", [0.92, 0.08, 0.42], [-1.44, DESK_TOP + 0.04, -3.03]);
    addPC(ctx, { x: -0.84, z: -3.38, variant: 2025 });
  }

  buildBed(ctx);
  buildFootChest(ctx);
  buildLounge(ctx);
  buildSideTable(ctx);
  addSlippers(ctx);
  buildWardrobe(ctx);
  buildLowCabinet(ctx);
  buildShelves(ctx);
  buildWallDecor(ctx);
  buildNightstand(ctx);
  addPendant(ctx);
  addDeskLamp(ctx, { x: -2.54, z: -3.4, year: era.year });
  register("lamp", [0.34, 0.4, 0.34], [-2.54, DESK_TOP + 0.24, -3.4]);
  register("window", [0.28, 1.55, 2.1], [-4.3, 1.82, -1.135]);
  buildClutter(ctx);

  if (era.year === 2025) {
    addWallFrame(ctx, { x: -0.15, y: 2.26, width: 0.24, height: 0.17, variant: 2, z: -3.77 });
  }
};
