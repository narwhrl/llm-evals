// Evening sun and night moon share one shadow-casting light; `apply(n)` blends every light-dependent value.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const EVENING = {
  sun: '#ff9a52', sunI: 3.6, dir: [-0.66, 0.36, 0.66],
  sky: '#8e9cc2', ground: '#4a3a2a', hemiI: 0.62,
  env: 0.22, top: '#4f6390', horizon: '#de9a6e', exposure: 0.95,
  glow: 0.06, pools: 0.05, lamps: 0, head: 0, signs: 0, bloom: 0.14,
};
const NIGHT = {
  sun: '#86a0ff', sunI: 0.95, dir: [0.42, 0.78, -0.46],
  sky: '#3d5590', ground: '#161b2a', hemiI: 0.75,
  env: 0.1, top: '#0a1023', horizon: '#1c2846', exposure: 1.1,
  glow: 2.2, pools: 0.75, lamps: 1, head: 7, signs: 0.7, bloom: 0.7,
};

export function createLighting({ scene, renderer, sky, materials, pools, signs, headlight, bloom }) {
  const sun = new THREE.DirectionalLight();
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  Object.assign(sun.shadow.camera, { left: -31, right: 31, top: 31, bottom: -31, near: 1, far: 150 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 2;
  scene.add(sun, sun.target);
  const hemi = new THREE.HemisphereLight();
  scene.add(hemi);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();
  scene.fog = new THREE.Fog('#000', 120, 360);

  // A few real point lights where light falls on facades: canopy, plaza, avenue, river road and park.
  const lamps = [
    [-7.0, 0.95, 6.42], [-2.8, 0.95, 6.42], [-4.9, 0.95, 3.1], [-4.9, 0.95, -3.0],
    [-9.4, 0.95, -1.0], [0.6, 0.95, -2.2], [10.4, 0.75, 2.6], [-6.0, 0.9, 11.4],
  ].map(([x, y, z]) => {
    const l = new THREE.PointLight('#ffbf73', 0, 5.5, 1.4);
    l.position.set(x, y, z);
    scene.add(l);
    return l;
  });

  const a = new THREE.Color();
  const b = new THREE.Color();
  const mix = (ka, kb, n) => a.set(EVENING[ka] ?? ka).lerp(b.set(NIGHT[kb] ?? kb), n);
  const lerp = (k, n) => EVENING[k] + (NIGHT[k] - EVENING[k]) * n;
  const dir = new THREE.Vector3();

  return function apply(n) {
    sun.color.copy(mix('sun', 'sun', n));
    sun.intensity = lerp('sunI', n);
    dir.fromArray(EVENING.dir).lerp(new THREE.Vector3().fromArray(NIGHT.dir), n).normalize();
    sun.position.copy(dir).multiplyScalar(70);
    hemi.color.copy(mix('sky', 'sky', n));
    hemi.groundColor.copy(mix('ground', 'ground', n));
    hemi.intensity = lerp('hemiI', n);
    scene.environmentIntensity = lerp('env', n);
    sky.material.uniforms.top.value.copy(mix('top', 'top', n));
    sky.material.uniforms.horizon.value.copy(mix('horizon', 'horizon', n));
    scene.fog.color.copy(sky.material.uniforms.horizon.value);
    renderer.toneMappingExposure = lerp('exposure', n);
    materials.glow.emissiveIntensity = lerp('glow', n);
    pools.material.opacity = lerp('pools', n);
    for (const l of lamps) l.intensity = lerp('lamps', n) * 4;
    headlight.intensity = lerp('head', n);
    for (const s of signs) s.material.emissiveIntensity = lerp('signs', n);
    bloom.strength = lerp('bloom', n);
  };
}
