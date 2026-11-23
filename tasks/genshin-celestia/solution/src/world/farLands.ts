import * as THREE from 'three';
import { SimplexNoise, fbm, smoothstep } from '../core/noise';
import { applyShaders, atmosphereHook } from '../core/atmosphere';

const LOWLAND = new THREE.Color(0x5f7a9e);
const UPLAND = new THREE.Color(0x9fb4cc);
const SNOW = new THREE.Color(0xeef3f7);

interface Range {
  x: number;
  z: number;
  width: number;
  depth: number;
  amplitude: number;
  frequency: number;
}

/** Mountain country far below the cloud sea: separate ridges so parallax reads between them. */
const RANGES: Range[] = [
  { x: 700, z: 2500, width: 5200, depth: 2200, amplitude: 780, frequency: 0.0009 },
  { x: -3200, z: 1400, width: 4400, depth: 2100, amplitude: 660, frequency: 0.0011 },
  { x: 3600, z: -900, width: 4600, depth: 2400, amplitude: 720, frequency: 0.001 },
  { x: -1500, z: -3400, width: 5200, depth: 2000, amplitude: 600, frequency: 0.0012 },
  { x: 2400, z: 5400, width: 7200, depth: 3200, amplitude: 940, frequency: 0.0007 },
  { x: -5400, z: -2300, width: 6200, depth: 3000, amplitude: 840, frequency: 0.0008 },
];

const BASE = -1050;

/**
 * The land seen through gaps in the cloud sea and on the horizon. Each range is a displaced grid,
 * faded to nothing at its borders so its edges never show, with the tallest peaks rising above the
 * cloud layer. A hazy floor closes the view underneath.
 */
export function createFarLands(noise: SimplexNoise): THREE.Group {
  const group = new THREE.Group();
  const material = applyShaders(new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 }), atmosphereHook);
  const color = new THREE.Color();

  for (const range of RANGES) {
    const geometry = new THREE.PlaneGeometry(range.width, range.depth, 72, 40).rotateX(-Math.PI / 2).toNonIndexed();
    const position = geometry.getAttribute('position');
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const z = position.getZ(i);
      const nx = (2 * x) / range.width;
      const nz = (2 * z) / range.depth;
      const envelope = Math.max(0, (1 - nx * nx) * (1 - nz * nz));
      const ridge = 1 - Math.abs(fbm(noise, x * range.frequency + range.x * 1e-4, 4.2, z * range.frequency + range.z * 1e-4, 4));
      position.setY(i, BASE + range.amplitude * envelope ** 0.7 * (0.18 + 0.82 * ridge * ridge));
    }
    geometry.computeVertexNormals();

    const normal = geometry.getAttribute('normal');
    const colors = new Float32Array(position.count * 3);
    for (let i = 0; i < position.count; i++) {
      color
        .copy(LOWLAND)
        .lerp(UPLAND, smoothstep(BASE + 200, BASE + range.amplitude * 0.72, position.getY(i)))
        .lerp(SNOW, smoothstep(-520, -380, position.getY(i)) * smoothstep(0.55, 0.85, normal.getY(i)))
        .multiplyScalar(0.9 + 0.2 * (normal.getY(i) * 0.5 + 0.5));
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(range.x, 0, range.z);
    group.add(mesh);
  }

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(15000, 64).rotateX(-Math.PI / 2),
    applyShaders(new THREE.MeshStandardMaterial({ color: 0x7f97b6, roughness: 1 }), atmosphereHook),
  );
  floor.position.y = BASE - 30;
  group.add(floor);
  return group;
}
