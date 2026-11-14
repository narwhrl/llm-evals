import * as THREE from 'three';
import type { Materials } from './materials';
import { range, type Rng } from './random';
import {
  createCloudTexture,
  createSkyGradientTexture,
  createSunGlowTexture,
  createTeyvatTexture,
} from './textures';

const TAU = Math.PI * 2;

export interface SkyDome {
  group: THREE.Group;
  follow(camera: THREE.Camera): void;
}

/** Gradient sky sphere and the low golden sun, kept centred on the camera. */
export function createSkyDome(sunDirection: THREE.Vector3): SkyDome {
  const group = new THREE.Group();
  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(4800, 40, 28),
    new THREE.MeshBasicMaterial({
      map: createSkyGradientTexture(),
      side: THREE.BackSide,
      fog: false,
      depthWrite: false,
    }),
  );
  group.add(dome);

  const glowTexture = createSunGlowTexture();
  const sunPosition = sunDirection.clone().normalize().multiplyScalar(3300);
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  halo.position.copy(sunPosition);
  halo.scale.set(1000, 1000, 1);
  group.add(halo);

  const disc = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xfff4d6,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  disc.position.copy(sunPosition);
  disc.scale.set(240, 240, 1);
  group.add(disc);

  return {
    group,
    follow(camera) {
      group.position.copy(camera.position);
    },
  };
}

export interface CloudSea {
  group: THREE.Group;
  update(elapsed: number, delta: number): void;
}

/** Layered cloud sea, drifting puffs, haze and the faint continent below. */
export function createCloudSea(materials: Materials, rng: Rng): CloudSea {
  const group = new THREE.Group();

  const teyvatMaterial = new THREE.MeshBasicMaterial({
    map: createTeyvatTexture(),
    color: 0xffffff,
    transparent: true,
    opacity: 0.4,
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false,
  });
  const teyvat = new THREE.Mesh(new THREE.PlaneGeometry(7600, 7600), teyvatMaterial);
  teyvat.rotation.x = -Math.PI / 2;
  teyvat.position.y = -610;
  teyvat.renderOrder = 2;
  group.add(teyvat);

  const mountains = new THREE.InstancedMesh(
    new THREE.ConeGeometry(1, 1, 5),
    new THREE.MeshBasicMaterial({
      color: 0xa6c2cf,
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
      fog: true,
    }),
    26,
  );
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 26; i += 1) {
    const a = rng() * TAU;
    const r = 900 + rng() * 2400;
    const height = range(rng, 70, 165);
    dummy.position.set(Math.cos(a) * r, -700 + height * 0.5, Math.sin(a) * r);
    dummy.rotation.set(0, rng() * TAU, 0);
    dummy.scale.set(range(rng, 90, 260), height, range(rng, 90, 260));
    dummy.updateMatrix();
    mountains.setMatrixAt(i, dummy.matrix);
  }
  mountains.instanceMatrix.needsUpdate = true;
  group.add(mountains);

  const seaTexture = createCloudTexture();
  seaTexture.repeat.set(8, 8);
  const seaMaterial = materials.cloud.clone();
  seaMaterial.map = seaTexture;
  seaMaterial.opacity = 0.72;
  seaMaterial.color.setHex(0xc4dbea);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), seaMaterial);
  sea.rotation.x = -Math.PI / 2;
  sea.position.y = -540;
  group.add(sea);

  const hazeMaterial = materials.cloud.clone();
  hazeMaterial.opacity = 0.07;
  hazeMaterial.color.setHex(0xffffff);
  const haze = new THREE.Mesh(new THREE.PlaneGeometry(9500, 9500), hazeMaterial);
  haze.rotation.x = -Math.PI / 2;
  haze.position.y = -500;
  group.add(haze);

  const puffs = new THREE.Group();
  const puffMaterial = materials.cloud.clone();
  puffMaterial.opacity = 0.42;
  const puffCount = 380;
  const puffMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(1, 8, 6), puffMaterial, puffCount);
  for (let i = 0; i < puffCount; i += 1) {
    const a = rng() * TAU;
    const r = 340 + Math.pow(rng(), 0.72) * 2700;
    const radius = range(rng, 42, 155);
    dummy.position.set(
      Math.cos(a) * r,
      range(rng, -610, -430) + radius * 0.16,
      Math.sin(a) * r,
    );
    dummy.rotation.set(0, rng() * TAU, 0);
    dummy.scale.set(radius, radius * range(rng, 0.24, 0.46), radius * range(rng, 0.7, 1.2));
    dummy.updateMatrix();
    puffMesh.setMatrixAt(i, dummy.matrix);
  }
  puffMesh.instanceMatrix.needsUpdate = true;
  puffs.add(puffMesh);
  group.add(puffs);

  return {
    group,
    update(_elapsed, delta) {
      puffs.rotation.y += delta * 0.0035;
      seaTexture.offset.x += delta * 0.0016;
    },
  };
}

export interface LightShafts {
  group: THREE.Group;
  update(elapsed: number, delta: number): void;
}

/** Soft additive god rays slanting down from the sun through the scene. */
export function createLightShafts(rng: Rng, sunDirection: THREE.Vector3): LightShafts {
  const group = new THREE.Group();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: new THREE.Color(0xffe7b8) },
      uIntensity: { value: 0.04 },
    },
    vertexShader: `
      varying float vV;
      void main() {
        vV = uv.y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying float vV;
      void main() {
        float fade = pow(clamp(vV, 0.0, 1.0), 1.6);
        gl_FragColor = vec4(uColor, fade * uIntensity);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const direction = sunDirection.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
  const geometry = new THREE.CylinderGeometry(12, 70, 1150, 10, 1, true);
  for (let i = 0; i < 6; i += 1) {
    const shaft = new THREE.Mesh(geometry, material);
    const a = rng() * TAU;
    const r = 300 + rng() * 750;
    shaft.position.set(Math.cos(a) * r, range(rng, 30, 190), Math.sin(a) * r);
    shaft.quaternion.copy(quaternion);
    shaft.scale.set(range(rng, 0.55, 1.4), 1, range(rng, 0.55, 1.4));
    group.add(shaft);
  }

  return {
    group,
    update(elapsed, _delta) {
      material.uniforms.uIntensity.value = 0.038 + Math.sin(elapsed * 0.35) * 0.008;
    },
  };
}
