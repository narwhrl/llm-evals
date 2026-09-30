import * as THREE from 'three';
import { mesh, box, boltBatch } from './common.js';
import { serviceTexture, labelTexture, surfaceTexture } from '../textures/structure.js';

function label(parent, text, sub, x, y, width, bg = '#d8dcd1', fg = '#334e52') {
  const material = new THREE.MeshStandardMaterial({ map: labelTexture(text, sub, bg, fg),
    roughness: 0.98, metalness: 0 });
  const plate = mesh(parent, new THREE.PlaneGeometry(width, width / 4), material);
  plate.position.set(x, y, -1.884); return plate;
}

function servicePanel(parent, materials, type, number, x, y, width, height) {
  box(parent, materials.dark, width + 0.028, height + 0.028, 0.018, x, y, -1.917);
  const material = new THREE.MeshStandardMaterial({ map: serviceTexture(type, number),
    roughness: 0.94, metalness: 0.07 });
  const plate = mesh(parent, new THREE.BoxGeometry(width, height, 0.026), material);
  plate.position.set(x, y, -1.897);
  const bolts = [];
  for (const dx of [-1, 1]) for (const dy of [-1, 1]) {
    bolts.push([x + dx * (width / 2 - 0.028), y + dy * (height / 2 - 0.03), -1.876, 0, 0, 0.8]);
  }
  boltBatch(parent, materials.steel, bolts, 0.012);
  if (type === 'vent') {
    for (let yy = y - height * 0.25; yy <= y + height * 0.2; yy += height * 0.1) {
      box(parent, materials.steel, width * 0.79, 0.009, 0.028, x, yy, -1.868);
    }
  } else {
    box(parent, materials.steel, width * 0.22, 0.016, 0.025, x, y - height * 0.22, -1.867);
  }
}

function indicator(ctx, parent, materials, x, y, color, period, phase) {
  const map = surfaceTexture(color, phase * 10 + 50, 'foam');
  const material = new THREE.MeshStandardMaterial({ map, emissiveMap: map, emissive: color,
    emissiveIntensity: 1.7, roughness: 0.83, metalness: 0 });
  const collar = mesh(parent, new THREE.CylinderGeometry(0.021, 0.023, 0.018, 12), materials.dark);
  collar.rotation.x = Math.PI / 2; collar.position.set(x, y, -1.826);
  const bulb = mesh(parent, new THREE.SphereGeometry(0.014, 10, 6), material);
  bulb.scale.z = 0.55; bulb.position.set(x, y, -1.813);
  ctx.registry.addUpdatable((_dt, t) => {
    const cycle = (t / period + phase) % 1;
    material.emissiveIntensity = cycle < 0.17 ? 2.2 : cycle < 0.26 ? 0.7 : 0.18;
  });
}

function equipment(ctx, parent, materials, x, y, w, h, name) {
  box(parent, materials.dark, w, h, 0.046, x, y, -1.904, name);
  box(parent, materials.rim, w - 0.023, h - 0.023, 0.02, x, y, -1.871);
  const header = label(parent, 'DC BUS 28V', 'POWER / NOMINAL', x, y + h * 0.29, w * 0.85);
  header.position.z = -1.848;
  const screenMap = labelTexture('101.3', 'kPa   O₂ 21.0%   22°C', '#1c343b', '#acd0bb');
  const screenMat = new THREE.MeshStandardMaterial({ map: screenMap, emissiveMap: screenMap,
    emissive: '#a4bead', emissiveIntensity: 0.22, roughness: 0.92 });
  const screen = mesh(parent, new THREE.PlaneGeometry(w * 0.74, h * 0.23), screenMat);
  screen.position.set(x, y + 0.005, -1.853);
  for (let i = 0; i < 4; i++) {
    indicator(ctx, parent, materials, x + (i - 1.5) * w * 0.175, y - h * 0.22,
      i === 2 ? '#f2ad54' : i === 3 ? '#9fc8dc' : '#a8d594',
      1.4 + i * 0.73 + x * 0.1, i * 0.19);
  }
  for (const xx of [-1, 1]) box(parent, materials.dark, 0.025, h * 0.3, 0.015,
    x + xx * w * 0.42, y - h * 0.21, -1.846);
}

export function buildDetails(ctx, parent, materials) {
  // Service bays avoid the sleeping bag, plant rack, nets, drawings and medical supplies.
  const panels = [
    ['vent', '07', -2.61, 0.31, 0.49, 0.33], ['vent', 'O₂', -0.66, 2.32, 0.47, 0.22],
    ['vent', '11', 3.55, 0.38, 0.36, 0.31], ['vent', '04', 2.86, 2.32, 0.67, 0.22],
    ['access', '02', -2.6, 1.96, 0.47, 0.24], ['access', '03', -1.15, 1.96, 0.46, 0.22],
    ['access', '05', -0.46, 1.35, 0.37, 0.26], ['access', '08', 3.02, 1.3, 0.33, 0.23],
    ['access', '09', 3.58, 2.31, 0.31, 0.22],
  ];
  for (const spec of panels) servicePanel(parent, materials, ...spec);
  equipment(ctx, parent, materials, -0.37, 0.53, 0.46, 0.54, 'equipment-panel-a');
  equipment(ctx, parent, materials, 2.73, 0.8, 0.45, 0.68, 'equipment-panel-b');
  const labels = [
    ['ZONE B', 'CREW / 04', -3.51, 2.28, 0.55],
    ['CAUTION', 'PRESSURE SHELL', -3.8, 0.2, 0.27, '#ceb65d', '#343c37'],
    ['04', 'CABIN 01', -3.79, 1.17, 0.18],
    ['O₂', 'SUPPLY 21.0%', -2.55, 1.03, 0.25],
    ['CO₂ SCRUB', 'FLOW 4.6 L / MIN', -1.91, 2.31, 0.43],
    ['CAUTION', 'PRESSURIZED', -0.94, 0.98, 0.29, '#ceb65d', '#343c37'],
    ['N₂ PURGE', 'VALVE 07', -0.51, 0.95, 0.34],
    ['HANDHOLD', '←', -0.47, 1.57, 0.29],
    ['11', 'PORT 03', -1.19, 0.88, 0.18],
    ['28 V', 'DC BUS', 0.38, 0.34, 0.24],
    ['CAUTION', 'DO NOT COVER', 2.72, 1.34, 0.34, '#ceb65d', '#343c37'],
    ['07', 'AIR RETURN', 3.54, 1.13, 0.18],
    ['ZONE B', 'QUIET HOURS 22–06', 3.21, 2.07, 0.46],
  ];
  for (const spec of labels) label(parent, ...spec);
}
