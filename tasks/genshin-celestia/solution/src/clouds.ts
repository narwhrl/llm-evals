import * as THREE from 'three';
import { createCloudTexture, mulberry32 } from './utils';

export function createInstancedCloudSea(): {
  mesh: THREE.Mesh;
  update(time: number): void;
} {
  const random = mulberry32(902711);
  const clusters = 86;
  const puffsPerCluster = 6;
  const textures = [
    createCloudTexture(5531, 512, 256),
    createCloudTexture(8121, 512, 256),
    createCloudTexture(2273, 512, 256),
    createCloudTexture(6781, 512, 256),
  ];
  const offsets: number[] = [];
  const scales: number[] = [];
  const rotations: number[] = [];
  const tints: number[] = [];
  const opacities: number[] = [];
  const variations: number[] = [];
  const tint = new THREE.Color();

  for (let cluster = 0; cluster < clusters; cluster += 1) {
    const isHigh = cluster < 18;
    const isUnderCelestia = cluster >= clusters - 8;
    const angle = random() * Math.PI * 2;
    const distance = isUnderCelestia
      ? 25 + random() * 115
      : isHigh
        ? 520 + random() * 430
        : 230 + random() * 470;
    const centerX = Math.cos(angle) * distance;
    const centerZ = Math.sin(angle) * distance;
    const centerY = isUnderCelestia
      ? -102 + random() * 22
      : isHigh
        ? 18 + random() * 90
        : -90 + random() * 62;
    const clusterSize = isUnderCelestia
      ? 44 + random() * 52
      : isHigh
        ? 110 + random() * 130
        : 78 + random() * 94;
    const baseOpacity = isHigh ? 0.1 + random() * 0.12 : 0.19 + random() * 0.2;

    for (let puff = 0; puff < puffsPerCluster; puff += 1) {
      const spread = clusterSize * 0.78;
      const localAngle = random() * Math.PI * 2;
      const radial = puff === 0 ? 0 : Math.sqrt(random()) * spread;
      offsets.push(
        centerX + Math.cos(localAngle) * radial,
        centerY + (random() - 0.3) * clusterSize * 0.45,
        centerZ + Math.sin(localAngle) * radial * 0.72,
      );
      const width =
        clusterSize * (0.72 + random() * 0.8) * (random() > 0.52 ? 1 : -1);
      const height = Math.abs(width) * (0.52 + random() * 0.34);
      scales.push(width, height);
      rotations.push((random() - 0.5) * 0.12);
      opacities.push(baseOpacity * (0.74 + random() * 0.42));
      variations.push(random());
      tint.setHex(random() > 0.52 ? 0xfff8ea : random() > 0.28 ? 0xeaf5fc : 0xcfe4f3);
      tints.push(tint.r, tint.g, tint.b);
    }
  }

  const geometry = new THREE.InstancedBufferGeometry();
  const quad = new THREE.PlaneGeometry(1, 1);
  geometry.index = quad.index;
  geometry.setAttribute('position', quad.getAttribute('position'));
  geometry.setAttribute('uv', quad.getAttribute('uv'));
  geometry.setAttribute(
    'instanceOffset',
    new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3),
  );
  geometry.setAttribute(
    'instanceScale',
    new THREE.InstancedBufferAttribute(new Float32Array(scales), 2),
  );
  geometry.setAttribute(
    'instanceRotation',
    new THREE.InstancedBufferAttribute(new Float32Array(rotations), 1),
  );
  geometry.setAttribute(
    'instanceTint',
    new THREE.InstancedBufferAttribute(new Float32Array(tints), 3),
  );
  geometry.setAttribute(
    'instanceOpacity',
    new THREE.InstancedBufferAttribute(new Float32Array(opacities), 1),
  );
  geometry.setAttribute(
    'instanceVariation',
    new THREE.InstancedBufferAttribute(new Float32Array(variations), 1),
  );
  geometry.instanceCount = clusters * puffsPerCluster;

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMapA: { value: textures[0] },
      uMapB: { value: textures[1] },
      uMapC: { value: textures[2] },
      uMapD: { value: textures[3] },
      uFogColor: { value: new THREE.Color(0xb8dae7) },
    },
    vertexShader: `
      attribute vec3 instanceOffset;
      attribute vec2 instanceScale;
      attribute float instanceRotation;
      attribute vec3 instanceTint;
      attribute float instanceOpacity;
      attribute float instanceVariation;
      varying vec2 vUv;
      varying vec3 vTint;
      varying float vOpacity;
      varying float vFogDepth;
      varying float vVariation;

      void main() {
        vUv = uv;
        vTint = instanceTint;
        vOpacity = instanceOpacity;
        vVariation = instanceVariation;
        vec4 center = modelViewMatrix * vec4(instanceOffset, 1.0);
        float c = cos(instanceRotation);
        float s = sin(instanceRotation);
        vec2 corner = position.xy;
        vec2 rotated = vec2(corner.x * c - corner.y * s, corner.x * s + corner.y * c);
        center.xy += rotated * instanceScale;
        vFogDepth = -center.z;
        gl_Position = projectionMatrix * center;
      }
    `,
    fragmentShader: `
      uniform sampler2D uMapA;
      uniform sampler2D uMapB;
      uniform sampler2D uMapC;
      uniform sampler2D uMapD;
      uniform vec3 uFogColor;
      varying vec2 vUv;
      varying vec3 vTint;
      varying float vOpacity;
      varying float vFogDepth;
      varying float vVariation;

      void main() {
        vec4 firstPair = mix(
          texture2D(uMapA, vUv),
          texture2D(uMapB, vUv),
          fract(vVariation * 3.17)
        );
        vec4 secondPair = mix(
          texture2D(uMapC, vUv),
          texture2D(uMapD, vUv),
          fract(vVariation * 5.31)
        );
        vec4 cloud = mix(firstPair, secondPair, smoothstep(0.42, 0.58, vVariation));
        vec3 color = pow(cloud.rgb, vec3(2.2)) * vTint;
        float fogAmount = smoothstep(560.0, 1650.0, vFogDepth);
        color = mix(color, uFogColor, fogAmount * 0.62);
        float alpha = cloud.a * vOpacity * (1.0 - fogAmount * 0.42);
        if (alpha < 0.003) discard;
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = 'instanced-cloud-sea';
  mesh.frustumCulled = false;
  mesh.renderOrder = 3;
  mesh.castShadow = false;
  mesh.receiveShadow = false;

  return {
    mesh,
    update(time) {
      mesh.rotation.y = time * 0.00035;
    },
  };
}
