// Shared material palette: cold industrial night tones, cel-shaded.
import * as THREE from 'three';
import { toonMat } from './toon.js';
import {
  concreteTexture,
  asphaltTexture,
  corrugatedTexture,
  metalTexture,
  woodTexture,
  cardboardTexture,
} from './textures.js';

export function makeMaterials() {
  const concrete = concreteTexture();
  const asphalt = asphaltTexture();
  const corrugated = corrugatedTexture();
  const metal = metalTexture();
  const wood = woodTexture();
  const cardboard = cardboardTexture();

  const mats = {
    // base + ground
    baseSide: toonMat({ color: 0x565b63, map: concrete }),
    concrete: toonMat({ color: 0x83878f, map: concrete }),
    concreteDark: toonMat({ color: 0x5d626b, map: concrete }),
    asphalt: toonMat({ color: 0x40454e, map: asphalt }),
    asphaltLight: toonMat({ color: 0x50555f, map: asphalt }),
    curbPaint: toonMat({ color: 0x9aa0a8, map: concrete }),
    paintWorn: toonMat({ color: 0x8f959d, map: null }),

    // structure
    wallA: toonMat({ color: 0x707680, map: concrete }),
    wallB: toonMat({ color: 0x66626a, map: concrete }),
    sheetMetal: toonMat({ color: 0x5f6e7a, map: corrugated }),
    sheetMetal2: toonMat({ color: 0x6e6258, map: corrugated }),
    roofTin: toonMat({ color: 0x3e4c5c, map: corrugated }),
    metal: toonMat({ color: 0x6b7480, map: metal }),
    metalDark: toonMat({ color: 0x3c424c, map: metal }),
    rust: toonMat({ color: 0x7c4f38, map: metal }),
    gateIron: toonMat({ color: 0x464e58, map: metal }),
    grate: toonMat({ color: 0x33383f, map: metal }),

    // containers
    contBlue: toonMat({ color: 0x3d5f88, map: corrugated }),
    contRed: toonMat({ color: 0x87483a, map: corrugated }),
    contGreen: toonMat({ color: 0x4c6a52, map: corrugated }),

    // wood / soft goods
    wood: toonMat({ color: 0x9c7c50, map: wood }),
    woodDark: toonMat({ color: 0x6f5638, map: wood }),
    cardboard: toonMat({ color: 0xa8895f, map: cardboard }),
    sandbag: toonMat({ color: 0x7d7462, map: concrete }),
    tarp: toonMat({ color: 0x4e5d50, map: cardboard }),

    // props
    barrelBlue: toonMat({ color: 0x2f5a96, map: metal }),
    barrelRust: toonMat({ color: 0x8a5a30, map: metal }),
    tire: toonMat({ color: 0x23262b, map: metal }),
    plasticOrange: toonMat({ color: 0xc76a28, map: null }),
    plasticWhite: toonMat({ color: 0xcfd3d8, map: null }),
    plasticRed: toonMat({ color: 0xa83a32, map: null }),
    truckBody: toonMat({ color: 0x51707a, map: metal }),
    truckCab: toonMat({ color: 0x66838a, map: metal }),
    vanWhite: toonMat({ color: 0xd6dbe2, map: metal }),
    policeBlue: toonMat({ color: 0x2b4373, map: metal }),
    bikeFrame: toonMat({ color: 0x7a3a34, map: metal }),

    // interior
    interiorWall: toonMat({ color: 0x5c6068, map: concrete }),
    shelfMetal: toonMat({ color: 0x556270, map: metal }),
    deskWood: toonMat({ color: 0x7a6448, map: wood }),
    paper: toonMat({ color: 0xc9c5b8, map: null }),

    // water in drains
    waterDark: new THREE.MeshBasicMaterial({ color: 0x0e141c }),

    // glass (rainy, dusty)
    glass: new THREE.MeshToonMaterial({
      color: 0x8fa8bd,
      transparent: true,
      opacity: 0.32,
      side: THREE.DoubleSide,
    }),

    // emissive surfaces (no outline, no lighting influence)
    lampWarm: new THREE.MeshBasicMaterial({ color: 0xffc06a }),
    lampCold: new THREE.MeshBasicMaterial({ color: 0xd6e8ff }),
    lampRed: new THREE.MeshBasicMaterial({ color: 0xff4a3c }),
    lampBlue: new THREE.MeshBasicMaterial({ color: 0x4a76ff }),
    windowWarm: new THREE.MeshBasicMaterial({ color: 0xffbe62 }),
    windowCold: new THREE.MeshBasicMaterial({ color: 0xbfd9f2 }),
    windowDark: new THREE.MeshBasicMaterial({ color: 0x10151d }),
    glowRedDim: new THREE.MeshBasicMaterial({ color: 0x58120e }),
  };
  for (const k of ['lampWarm', 'lampCold', 'lampRed', 'lampBlue', 'windowWarm', 'windowCold', 'windowDark', 'glowRedDim', 'glass', 'waterDark']) {
    mats[k].userData.noOutline = true;
  }
  return mats;
}
