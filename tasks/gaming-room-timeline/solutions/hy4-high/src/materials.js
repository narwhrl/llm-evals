import * as THREE from 'three';
import { std } from './kit.js';
import {
  cardboardTexture, carpetTexture, deskMatTexture, fabricTexture,
  keyboardTexture, noteTexture, photoTexture, posterTexture,
  spineTexture, tvTexture,
} from './textures.js';

export function createMaterials(screenTexture, sideTexture) {
  const M = {
    cream: std('#e9e1c8', { roughness: 0.62 }),
    creamShade: std('#c9bfa3', { roughness: 0.7 }),
    beige: std('#d6c9ac', { roughness: 0.8 }),
    plastic: std('#33353a', { roughness: 0.55 }),
    plasticSoft: std('#46484e', { roughness: 0.7 }),
    black: std('#17181b', { roughness: 0.48 }),
    dark: std('#24262c', { roughness: 0.65 }),
    metal: std('#9aa0a6', { metalness: 0.78, roughness: 0.34 }),
    metalDark: std('#4b4f55', { metalness: 0.7, roughness: 0.4 }),
    chrome: std('#cdd2d8', { metalness: 0.86, roughness: 0.2 }),
    woodLight: std('#bd915e', { roughness: 0.72 }),
    woodMid: std('#936a45', { roughness: 0.74 }),
    woodDark: std('#513b2b', { roughness: 0.72 }),
    woodRed: std('#734632', { roughness: 0.7 }),
    white: std('#f1ede3', { roughness: 0.6 }),
    red: std('#a84438', { roughness: 0.62 }),
    redDark: std('#6f2c28', { roughness: 0.7 }),
    orange: std('#d9914f', { roughness: 0.65 }),
    amber: std('#e0aa62', { roughness: 0.5 }),
    green: std('#6f9c58', { roughness: 0.9 }),
    greenDark: std('#4c7440', { roughness: 0.92 }),
    blue: std('#3f6b9b', { roughness: 0.75 }),
    blueDark: std('#2a4b73', { roughness: 0.8 }),
    grey: std('#8b8983', { roughness: 0.88 }),
    ceramic: std('#f3eee2', { roughness: 0.28 }),
    ceramicShade: std('#d9d1bf', { roughness: 0.35 }),
    rubber: std('#202125', { roughness: 0.95 }),
    paper: std('#eee5cd', { roughness: 0.95 }),
    clothBlue: std('#ffffff', { map: fabricTexture('#55718c', 21), roughness: 1 }),
    clothRed: std('#ffffff', { map: fabricTexture('#8e4a3f', 23), roughness: 1 }),
    clothGrey: std('#ffffff', { map: fabricTexture('#7c7a72', 24), roughness: 1 }),
    clothCream: std('#ffffff', { map: fabricTexture('#d5c4a4', 25), roughness: 1 }),
    carpet: std('#ffffff', { map: carpetTexture('#8d5b45', 12), roughness: 1 }),
    cardboard: std('#ffffff', { map: cardboardTexture(), roughness: 0.95 }),
    photo: std('#ffffff', { map: photoTexture(), roughness: 0.85 }),
    posters: [0, 1, 2, 3, 4, 5].map((i) => std('#ffffff', { map: posterTexture(i), roughness: 0.9 })),
    postersAlt: [0, 1, 2, 3, 4, 5].map((i) => std('#ffffff', { map: posterTexture(i, true), roughness: 0.9 })),
    keycap: std('#ffffff', { map: keyboardTexture('#2b2b2f'), roughness: 0.75 }),
    keycapCream: std('#ffffff', { map: keyboardTexture('#d9d2bc'), roughness: 0.8 }),
    deskMat: std('#ffffff', { map: deskMatTexture('PLAY', '#242a31'), roughness: 0.95 }),
    deskMatLate: std('#ffffff', { map: deskMatTexture('STILL PLAYING', '#2b2823'), roughness: 0.95 }),
    tv: std('#ffffff', { map: tvTexture(), roughness: 0.5 }),
    note: std('#ffffff', { map: noteTexture(['别熬夜', '记得存盘', '妈']), roughness: 0.95 }),
    noteLate: std('#ffffff', { map: noteTexture(['周五 直播', '备份存档', '2005']), roughness: 0.95 }),
    screen: new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false }),
    sideScreen: new THREE.MeshBasicMaterial({ map: sideTexture, toneMapped: false }),
    glass: std('#b9d2d8', { metalness: 0.15, roughness: 0.08, transparent: true, opacity: 0.17, depthWrite: false }),
    bulb: new THREE.MeshBasicMaterial({ color: '#ffd79a' }),
    ledWarm: new THREE.MeshBasicMaterial({ color: '#ffbd6b' }),
    ledCool: new THREE.MeshBasicMaterial({ color: '#8fd8c8' }),
  };

  const spineCache = new Map();
  M.spine = (text, color) => {
    const key = `${text}:${color}`;
    if (!spineCache.has(key)) {
      spineCache.set(key, std('#ffffff', { map: spineTexture(text, color), roughness: 0.8 }));
    }
    return spineCache.get(key);
  };
  return M;
}
