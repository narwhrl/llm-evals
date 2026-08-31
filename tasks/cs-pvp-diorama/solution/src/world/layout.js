import { Vector3 } from 'three';

/** Square plinth edge length. All architecture stays on the top face. */
export const BASE = 12;
export const PAD = 5.25;
export const PLINTH_H = 0.72;

export const hooks = {
  drips: [],
  vents: [],
  glasses: [],
  puddles: [],
  shutter: null,
  searchlight: null,
  searchlightTarget: null,
  searchHead: null,
  policeBar: null,
  streetLamp: null,
  streetLampHalo: null,
  warehouseLamps: [],
  bombMarks: [],
};

export function drip(x, y, z) {
  hooks.drips.push(new Vector3(x, y, z));
}

export function vent(x, y, z) {
  hooks.vents.push(new Vector3(x, y, z));
}

export function clampPad(v) {
  return Math.max(-PAD, Math.min(PAD, v));
}

/** Named anchors used by more than one region. */
export const A = {
  tYard: { x: 0.1, z: 4.55 },
  truck: { x: -1.55, z: 4.52 },
  containers: { x: 1.62, z: 4.58 },
  ramp: { x: 0, z: 3.05 },
  aHouse: { x: -3.42, z: 2.58 },
  aDoor: { x: -3.05, z: 1.28 },
  midGate: { x: 0, z: 0.32 },
  midDrain: { x: 0, z: -0.15 },
  bHouse: { x: 3.92, z: 3.08 },
  bSite: { x: 3.05, z: 1.82 },
  lamp: { x: 2.22, z: 0.92 },
  ctYard: { x: -0.15, z: -4.35 },
  van: { x: -1.48, z: -4.32 },
  platform: { x: 2.28, z: -3.55 },
  search: { x: 2.35, z: -2.72 },
};
