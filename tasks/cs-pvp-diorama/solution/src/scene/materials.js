import {
  Color,
  CubeTexture,
  FrontSide,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshToonMaterial,
  SRGBColorSpace,
  Vector2,
} from 'three';
import { buildTextures } from './textures.js';

function nightEnv() {
  const faces = ['#1a3048', '#0d1520', '#243044', '#121820', '#2a3a50', '#0a1016'];
  const images = faces.map((hex) => {
    const c = document.createElement('canvas');
    c.width = 16;
    c.height = 16;
    const ctx = c.getContext('2d');
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 16, 16);
    return c;
  });
  const cube = new CubeTexture(images);
  cube.needsUpdate = true;
  cube.colorSpace = SRGBColorSpace;
  return cube;
}

function toon(texs, color, map, extras = {}) {
  const mat = new MeshToonMaterial({
    color,
    gradientMap: extras.warm ? texs.toonWarm : texs.toon,
    map: map ?? null,
    transparent: extras.transparent ?? false,
    opacity: extras.opacity ?? 1,
    side: extras.side ?? FrontSide,
    depthWrite: extras.depthWrite ?? true,
  });
  if (map) map.colorSpace = SRGBColorSpace;
  mat.userData.outlineParameters = {
      thickness: extras.outline ?? 0.0052,
    color: [0.03, 0.035, 0.045],
    alpha: extras.outlineAlpha ?? 0.92,
    visible: extras.outline !== 0,
    keepAlive: true,
  };
  if (extras.emissive) {
    mat.emissive = new Color(extras.emissive);
    mat.emissiveIntensity = extras.emissiveIntensity ?? 0.8;
  }
  return mat;
}

export function buildMaterials() {
  const tex = buildTextures();
  const env = nightEnv();

  const mats = {
    tex,
    plinth: toon(tex, 0xc8ccd2, tex.plinth, { outline: 0.0028 }),
    plinthEdge: toon(tex, 0xa8acb2, tex.concrete, { outline: 0.0024 }),
    asphalt: toon(tex, 0x6c727c, tex.asphalt, { outline: 0.0018 }),
    concrete: toon(tex, 0xb0b4ba, tex.concrete, { outline: 0.0036 }),
    darkConcrete: toon(tex, 0x7a8088, tex.concrete, { outline: 0.0034 }),
    wall: toon(tex, 0x9aa0a8, tex.concrete, { outline: 0.0038 }),
    wood: toon(tex, 0x8a6a48, tex.wood, { warm: true, outline: 0.0034 }),
    cardboard: toon(tex, 0x9a8458, tex.cardboard, { warm: true, outline: 0.003 }),
    rust: toon(tex, 0x8a5a3c, tex.rust, { warm: true, outline: 0.0032 }),
    tin: toon(tex, 0x6e747c, tex.tin, { outline: 0.003 }),
    blue: toon(tex, 0x3a5f8c, tex.rustBlue, { outline: 0.0032 }),
    orange: toon(tex, 0xc46a32, tex.rustOrange, { warm: true, outline: 0.003 }),
    teal: toon(tex, 0x2f6d6a, tex.rustTeal, { outline: 0.003 }),
    red: toon(tex, 0x8a3030, tex.rustRed, { outline: 0.003 }),
    police: toon(tex, 0x243c5c, tex.police, { outline: 0.003 }),
    rubber: toon(tex, 0x222226, tex.rubber, { outline: 0.003 }),
    plastic: toon(tex, 0xc8b24a, null, { outline: 0.003 }),
    barrier: toon(tex, 0xd8c24a, null, { outline: 0.003 }),
    sand: toon(tex, 0x8a7a56, tex.cardboard, { warm: true, outline: 0.0028 }),
    black: toon(tex, 0x1a1c20, null, { outline: 0.0026 }),
    cloth: toon(tex, 0x3a4036, null, { outline: 0.0028 }),
    glass: toon(tex, 0x8aa0aa, tex.glass, {
      transparent: true,
      opacity: 0.38,
      outline: 0,
      depthWrite: false,
    }),
    rainGlass: new MeshPhysicalMaterial({
      color: 0x7d8f98,
      map: tex.glass,
      transparent: true,
      opacity: 0.42,
      roughness: 0.18,
      metalness: 0.05,
      transmission: 0.08,
      thickness: 0.02,
      alphaMap: tex.rainGlass,
      depthWrite: false,
    }),
    puddle: new MeshPhysicalMaterial({
      color: 0x2a4050,
      roughness: 0.08,
      metalness: 0.45,
      envMap: env,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 0.82,
      normalMap: tex.ripple,
      normalScale: new Vector2(0.7, 0.7),
    }),
    water: new MeshPhysicalMaterial({
      color: 0x244850,
      roughness: 0.06,
      metalness: 0.4,
      envMap: env,
      envMapIntensity: 1.6,
      transparent: true,
      opacity: 0.78,
      normalMap: tex.ripple,
    }),
    emissiveWarm: toon(tex, 0xffc56a, null, {
      emissive: 0xffb24a,
      emissiveIntensity: 1.4,
      outline: 0,
    }),
    emissiveCold: toon(tex, 0xc8d8e8, null, {
      emissive: 0xa8c4dc,
      emissiveIntensity: 1.1,
      outline: 0,
    }),
    emissiveRed: toon(tex, 0xff3355, null, {
      emissive: 0xff2244,
      emissiveIntensity: 1.6,
      outline: 0,
    }),
    paper: toon(tex, 0xc9c2ad, tex.news, { outline: 0.002 }),
    unlit: new MeshBasicMaterial({ color: 0x0a0c10 }),
  };

  mats.rainGlass.userData.outlineParameters = { visible: false, keepAlive: true };
  mats.puddle.userData.outlineParameters = { visible: false, keepAlive: true };
  mats.water.userData.outlineParameters = { visible: false, keepAlive: true };
  mats.glass.userData.outlineParameters = { visible: false, keepAlive: true };

  return mats;
}
