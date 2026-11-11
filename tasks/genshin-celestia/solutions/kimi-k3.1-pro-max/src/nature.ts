import * as THREE from 'three';
import { mesh, palette, seededRandom } from './palette';
import type { Island } from './terrain';

export function createVegetation(scene: THREE.Scene, islands: Island[]): void {
  const random = seededRandom(49419);
  const locations: { x: number; y: number; z: number; scale: number }[] = [];
  islands.forEach((island, index) => {
    const count = index === 0 ? 135 : 17;
    for (let i = 0; i < count; i++) {
      const angle = random() * Math.PI * 2;
      const distance = index === 0 ? 32 + random() * 19 : island.radius * (0.76 + random() * 0.12);
      locations.push({
        x: island.x + Math.cos(angle) * distance,
        y: island.y + 0.35,
        z: island.z + Math.sin(angle) * distance,
        scale: 0.65 + random() * (index === 0 ? 1.2 : 0.7),
      });
    }
  });
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.2, 0.35, 4.8, 6), palette.bark, locations.length);
  const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 1), palette.leaves, locations.length * 3);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  locations.forEach((tree, i) => {
    dummy.position.set(tree.x, tree.y + 2.4 * tree.scale, tree.z);
    dummy.scale.set(tree.scale, tree.scale, tree.scale);
    dummy.rotation.y = random() * Math.PI;
    dummy.updateMatrix();
    trunks.setMatrixAt(i, dummy.matrix);
    for (let j = 0; j < 3; j++) {
      const canopyScale = tree.scale * (2.05 - j * 0.36);
      dummy.position.set(tree.x + (random() - 0.5) * tree.scale, tree.y + tree.scale * (4.2 + j * 1.45), tree.z + (random() - 0.5) * tree.scale);
      dummy.scale.set(canopyScale, canopyScale * (1.2 + j * 0.16), canopyScale);
      dummy.rotation.y = random() * Math.PI;
      dummy.updateMatrix();
      crowns.setMatrixAt(i * 3 + j, dummy.matrix);
      color.setHSL(0.36 + random() * 0.035, 0.20 + random() * 0.12, 0.30 + random() * 0.14);
      crowns.setColorAt(i * 3 + j, color);
    }
  });
  trunks.castShadow = true;
  crowns.castShadow = true;
  crowns.receiveShadow = true;
  scene.add(trunks, crowns);
}

const waterfallMaterial = new THREE.ShaderMaterial({
  transparent: true,
  side: THREE.DoubleSide,
  depthWrite: false,
  uniforms: { time: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    varying vec2 vUv;
    void main() {
      float edge = smoothstep(0.0, 0.14, vUv.x) * smoothstep(0.0, 0.14, 1.0 - vUv.x);
      float streak = sin(vUv.x * 47.0 + vUv.y * 8.0) * 0.18 + sin(vUv.x * 103.0 - vUv.y * 12.0) * 0.1;
      float flow = sin(vUv.y * 35.0 - time * 3.5 + vUv.x * 12.0) * 0.06;
      float fade = smoothstep(0.0, 0.24, vUv.y);
      vec3 color = mix(vec3(0.60, 0.83, 0.90), vec3(0.93, 0.98, 1.0), 0.72 + streak + flow);
      gl_FragColor = vec4(color, edge * fade * (0.54 + streak));
    }
  `,
});

function waterfall(parent: THREE.Object3D, island: Island, angle: number, width: number, length: number): void {
  const group = new THREE.Group();
  const vertices: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const segments = 40;
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = -t * length;
    const outward = Math.sin(t * Math.PI * 0.75) * 5;
    const w = width * (1 + t * 0.55);
    vertices.push(-w / 2, y, outward, w / 2, y, outward);
    uvs.push(0, 1 - t, 1, 1 - t);
    if (i < segments) {
      const n = i * 2;
      indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  const fall = new THREE.Mesh(geometry, waterfallMaterial);
  fall.renderOrder = 2;
  group.add(fall);
  const pool = mesh(new THREE.CircleGeometry(width * 0.92, 32), new THREE.MeshStandardMaterial({ color: '#8dd2da', emissive: '#5599aa', emissiveIntensity: 0.2, roughness: 0.22 }));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.35;
  group.add(pool);
  group.position.set(island.x + Math.cos(angle) * island.radius * 0.86, island.y, island.z + Math.sin(angle) * island.radius * 0.86);
  group.rotation.y = Math.PI / 2 - angle;
  parent.add(group);
}

export function createWaterfalls(scene: THREE.Scene, islands: Island[]): (time: number) => void {
  waterfall(scene, { x: 0, y: 0, z: 0, radius: 57, depth: 114 }, 1.06, 4.4, 108);
  waterfall(scene, { x: 0, y: 0, z: 0, radius: 57, depth: 114 }, 2.35, 2.6, 88);
  waterfall(scene, islands[0], 2.9, 2.8, 68);
  waterfall(scene, islands[3], 0.7, 3.1, 90);
  waterfall(scene, islands[4], 0.25, 3.8, 94);
  waterfall(scene, islands[5], 0.8, 3.2, 83);
  waterfall(scene, islands[6], 1.5, 2.6, 65);
  return (time: number) => { waterfallMaterial.uniforms.time.value = time; };
}
