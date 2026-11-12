import * as THREE from 'three';
import { sunDirection } from './materials';
import { createInstancedCloudSea } from './clouds';
import {
  createCloudTexture,
  createRadialTexture,
  fractalNoise,
  makeMesh,
  mulberry32,
} from './utils';

export interface Environment {
  group: THREE.Group;
  update(time: number, delta: number): void;
}

const visualSunDirection = new THREE.Vector3(-0.72, 0.08, -0.69).normalize();

const skyVertexShader = `
  varying vec3 vDirection;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vDirection = normalize(world.xyz - cameraPosition);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const skyFragmentShader = `
  varying vec3 vDirection;
  uniform vec3 uSunDirection;
  uniform float uTime;

  vec3 toLinear(vec3 color) {
    return pow(color, vec3(2.2));
  }

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.55;
    for (int octave = 0; octave < 4; octave++) {
      value += noise(p) * amplitude;
      p = p * 2.07 + vec2(8.3, 3.7);
      amplitude *= 0.48;
    }
    return value;
  }

  void main() {
    vec3 direction = normalize(vDirection);
    float height = clamp(direction.y, -1.0, 1.0);
    vec3 horizon = toLinear(vec3(0.45, 0.74, 0.92));
    vec3 midSky = toLinear(vec3(0.18, 0.52, 0.82));
    vec3 zenith = toLinear(vec3(0.04, 0.20, 0.47));
    vec3 color = mix(horizon, midSky, smoothstep(-0.03, 0.28, height));
    color = mix(color, zenith, smoothstep(0.2, 0.9, height));

    vec2 skyUv = vec2(
      atan(direction.z, direction.x) / 6.2831853 + 0.5,
      asin(clamp(height, -1.0, 1.0)) / 3.1415926 + 0.5
    );
    float highCloud = fbm(skyUv * vec2(8.0, 12.0) + vec2(uTime * 0.0018, 0.0));
    highCloud += fbm(skyUv * vec2(20.0, 24.0) - vec2(uTime * 0.003, 0.0)) * 0.35;
    highCloud = smoothstep(0.68, 1.02, highCloud);
    highCloud *= smoothstep(0.02, 0.2, height) * (1.0 - smoothstep(0.45, 0.85, height));
    color = mix(color, toLinear(vec3(1.0, 0.95, 0.87)), highCloud * 0.22);

    float sunAmount = max(dot(direction, normalize(uSunDirection)), 0.0);
    float wideGlow = pow(sunAmount, 13.0) * 0.34;
    float innerGlow = pow(sunAmount, 90.0) * 0.95;
    float sunDisc = smoothstep(0.9992, 0.99965, sunAmount);
    color += toLinear(vec3(1.0, 0.78, 0.42)) * wideGlow;
    color += toLinear(vec3(1.0, 0.90, 0.64)) * innerGlow;
    color = mix(color, toLinear(vec3(1.0, 0.97, 0.84)), sunDisc);

    float horizonMist = pow(1.0 - abs(height), 10.0);
    color = mix(color, toLinear(vec3(0.72, 0.87, 0.93)), horizonMist * 0.16);
    float warmHorizon = pow(1.0 - abs(height - 0.015), 26.0);
    color = mix(color, toLinear(vec3(0.96, 0.82, 0.61)), warmHorizon * 0.1);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const lightShaftVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    transformed.x += sin(uv.y * 10.0 + uv.x * 4.0) * 2.2;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const lightShaftFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uPhase;

  vec3 toLinear(vec3 color) {
    return pow(color, vec3(2.2));
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  void main() {
    float sideFade = smoothstep(0.0, 0.2, vUv.x) * (1.0 - smoothstep(0.8, 1.0, vUv.x));
    float lengthFade = smoothstep(0.0, 0.3, vUv.y) * (1.0 - smoothstep(0.42, 1.0, vUv.y));
    float shimmer = 0.65 + noise(vec2(vUv.x * 9.0 + uPhase, vUv.y * 5.0 - uTime * 0.03)) * 0.35;
    float alpha = sideFade * lengthFade * shimmer * 0.055;
    vec3 color = toLinear(mix(vec3(1.0, 0.76, 0.39), vec3(1.0, 0.95, 0.75), 0.55));
    gl_FragColor = vec4(color, alpha);
  }
`;

function createSky(): THREE.Mesh {
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uSunDirection: { value: visualSunDirection.clone() },
      uTime: { value: 0 },
    },
    vertexShader: skyVertexShader,
    fragmentShader: skyFragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2600, 64, 40), material);
  sky.renderOrder = -1000;
  sky.name = 'celestial-sky';
  return sky;
}

function createDistantTeyvat(): THREE.Group {
  const group = new THREE.Group();
  const rings = 42;
  const segments = 104;
  const radiusX = 690;
  const radiusZ = 500;
  const positions: number[] = [0, -18, 0];
  const colors: number[] = [];
  const color = new THREE.Color();
  const indices: number[] = [];
  color.setHSL(0.28, 0.24, 0.26, THREE.SRGBColorSpace);
  colors.push(color.r, color.g, color.b);

  for (let ring = 1; ring <= rings; ring += 1) {
    const radial = ring / rings;
    for (let segment = 0; segment < segments; segment += 1) {
      const angle = (segment / segments) * Math.PI * 2;
      const irregularity =
        1 +
        Math.sin(angle * 4 + 0.6) * 0.035 +
        Math.sin(angle * 9 - 1.4) * 0.02 +
        (fractalNoise(
          Math.cos(angle) * 2.4 + 9,
          Math.sin(angle) * 2.4 + 3,
          63,
        ) -
          0.5) *
          0.045;
      const x = Math.cos(angle) * radiusX * radial * irregularity;
      const z = Math.sin(angle) * radiusZ * radial * irregularity;
      const broad = fractalNoise(x * 0.006 + 3.1, z * 0.007 - 2.4, 117);
      const ridges =
        Math.pow(
          Math.max(0, fractalNoise(x * 0.014 - 4.1, z * 0.021, 82) - 0.36),
          1.55,
        ) * 62;
      const valley = Math.sin(x * 0.017 + z * 0.009) * 7 + Math.sin(x * 0.04) * 2.8;
      const coast = 1 - THREE.MathUtils.smoothstep(radial, 0.68, 1);
      const elevation = (broad * 24 + ridges + valley) * coast - Math.pow(radial, 7) * 38;
      positions.push(x, elevation, z);
      const lowland = THREE.MathUtils.smoothstep(elevation, 2, 42);
      color.setHSL(
        0.3 - lowland * 0.045,
        0.26 - lowland * 0.1,
        0.27 + lowland * 0.1 + broad * 0.035,
        THREE.SRGBColorSpace,
      );
      colors.push(color.r, color.g, color.b);
    }
  }

  const vertexAt = (ring: number, segment: number): number =>
    1 + (ring - 1) * segments + (segment % segments);
  for (let segment = 0; segment < segments; segment += 1) {
    indices.push(0, vertexAt(1, segment + 1), vertexAt(1, segment));
  }
  for (let ring = 1; ring < rings; ring += 1) {
    for (let segment = 0; segment < segments; segment += 1) {
      const current = vertexAt(ring, segment);
      const next = vertexAt(ring, segment + 1);
      const above = vertexAt(ring + 1, segment);
      const aboveNext = vertexAt(ring + 1, segment + 1);
      indices.push(current, next, above, next, aboveNext, above);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1,
    metalness: 0,
    flatShading: true,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const land = makeMesh(geometry, material, 'teyvat-below');
  group.add(land);

  group.position.set(190, -212, -880);
  group.rotation.y = -0.08;
  group.name = 'teyvat-lowlands';
  return group;
}

function createCloudBanks(): {
  group: THREE.Group;
  update(time: number): void;
} {
  const group = new THREE.Group();
  group.name = 'cloud-banks';
  const random = mulberry32(19871);
  const textures = [
    createCloudTexture(281, 448, 224),
    createCloudTexture(993, 448, 224),
    createCloudTexture(9137, 448, 224),
  ];
  const banks: Array<{ sprite: THREE.Sprite; baseX: number; baseZ: number; phase: number }> = [];
  for (let i = 0; i < 22; i += 1) {
    const angle = random() * Math.PI * 2;
    const distance = 380 + random() * 520;
    const size = 58 + random() * 145;
    const material = new THREE.SpriteMaterial({
      map: textures[Math.floor(random() * textures.length)],
      color: random() > 0.58 ? 0xfff5df : random() > 0.25 ? 0xdbeaf3 : 0xc3d9e7,
      transparent: true,
      opacity: 0.08 + random() * 0.16,
      depthWrite: false,
      fog: true,
    });
    const sprite = new THREE.Sprite(material);
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    const y = -62 + random() * 118;
    sprite.position.set(x, y, z);
    sprite.scale.set(size * 1.8, size * 0.76, 1);
    sprite.material.rotation = (random() - 0.5) * 0.15;
    group.add(sprite);
    banks.push({ sprite, baseX: x, baseZ: z, phase: random() * Math.PI * 2 });
  }
  return {
    group,
    update(time) {
      banks.forEach((bank, index) => {
        bank.sprite.position.x =
          bank.baseX + Math.sin(time * 0.013 + bank.phase) * (4 + (index % 3) * 3);
        bank.sprite.position.z =
          bank.baseZ + Math.cos(time * 0.009 + bank.phase) * (3 + (index % 4) * 2);
      });
    },
  };
}

function createLightShafts(): {
  group: THREE.Group;
  materials: THREE.ShaderMaterial[];
} {
  const group = new THREE.Group();
  group.name = 'sun-shafts';
  const materials: THREE.ShaderMaterial[] = [];
  const shafts = [
    { x: -300, z: -60, width: 68, height: 500, rotation: 0.34 },
    { x: -240, z: -170, width: 34, height: 480, rotation: 0.38 },
    { x: -350, z: 60, width: 110, height: 540, rotation: 0.3 },
  ];
  shafts.forEach((shaft, index) => {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPhase: { value: index * 2.71 },
      },
      vertexShader: lightShaftVertexShader,
      fragmentShader: lightShaftFragmentShader,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(shaft.width, shaft.height, 1, 1),
      material,
    );
    mesh.position.set(shaft.x, 238, shaft.z);
    mesh.rotation.set(-0.18, shaft.rotation, -0.23);
    mesh.renderOrder = 6;
    group.add(mesh);
    materials.push(material);
  });
  return { group, materials };
}

function createFarParticles(): {
  group: THREE.Group;
  update(time: number): void;
} {
  const random = mulberry32(712773);
  const count = 260;
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i += 1) {
    const radius = 30 + Math.sqrt(random()) * 250;
    const angle = random() * Math.PI * 2;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = -50 + random() * 180;
    positions[i * 3 + 2] = Math.sin(angle) * radius;
    phases[i] = random() * Math.PI * 2;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    map: createRadialTexture(128),
    color: 0xffe8a8,
    size: 1.15,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geometry, material);
  points.name = 'aether-motes';
  const group = new THREE.Group();
  group.add(points);
  return {
    group,
    update(time) {
      points.rotation.y = time * 0.011;
      const attribute = geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < count; i += 1) {
        attribute.setY(i, attribute.getY(i) + Math.sin(time * 0.4 + phases[i]) * 0.0008);
      }
      attribute.needsUpdate = true;
    },
  };
}

export function createWaterfall(
  top: THREE.Vector3,
  outward: THREE.Vector3,
  height: number,
  width: number,
  seed: number,
): THREE.Group {
  const group = new THREE.Group();
  group.name = `waterfall-${seed}`;
  const segments = 52;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const direction = outward.clone().setY(0).normalize();
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const center = top
      .clone()
      .addScaledVector(direction, t * (5.8 + width * 0.35) + Math.sin(t * 4.1) * 0.8);
    center.y -= t * height;
    const tangent = new THREE.Vector3(-direction.z, 0, direction.x);
    const waviness = 1 + Math.sin(t * 9.5 + seed) * 0.13;
    const currentWidth = width * (0.48 + t * 0.75) * waviness;
    for (const side of [-1, 1] as const) {
      const point = center.clone().addScaledVector(tangent, side * currentWidth * 0.5);
      positions.push(point.x, point.y, point.z);
      uvs.push(side < 0 ? 0 : 1, t);
    }
    if (i < segments) {
      const base = i * 2;
      indices.push(base, base + 2, base + 1, base + 1, base + 2, base + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uSeed: { value: seed * 0.37 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float uTime;
      uniform float uSeed;

      vec3 toLinear(vec3 color) {
        return pow(color, vec3(2.2));
      }

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
      }

      void main() {
        vec2 flowUv = vec2(vUv.x * 3.2 + uSeed, vUv.y * 20.0 + uTime * 0.65);
        float threads = noise(flowUv * vec2(5.0, 2.2)) * 0.62 + noise(flowUv * 12.0) * 0.38;
        float edge = smoothstep(0.0, 0.13, vUv.x) * (1.0 - smoothstep(0.87, 1.0, vUv.x));
        float topFade = smoothstep(0.0, 0.035, vUv.y);
        float bottomFade = 1.0 - smoothstep(0.82, 1.0, vUv.y);
        float alpha = edge * topFade * bottomFade * (0.36 + threads * 0.48);
        vec3 color = mix(toLinear(vec3(0.34, 0.72, 0.86)), toLinear(vec3(0.93, 0.99, 0.98)), threads);
        color = mix(color, toLinear(vec3(1.0, 0.96, 0.83)), pow(threads, 4.0) * 0.35);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const sheet = new THREE.Mesh(geometry, material);
  sheet.name = 'flowing-water-ribbon';
  group.add(sheet);

  const foamGeometry = new THREE.BufferGeometry();
  const foamPositions: number[] = [];
  for (let i = 0; i < 24; i += 1) {
    const t = i / 24;
    const center = top.clone().addScaledVector(direction, t * (5.8 + width * 0.35));
    center.y -= t * height;
    const random = mulberry32(seed + i * 17);
    foamPositions.push(
      center.x + (random() - 0.5) * width,
      center.y,
      center.z + (random() - 0.5) * width,
    );
  }
  foamGeometry.setAttribute('position', new THREE.Float32BufferAttribute(foamPositions, 3));
  const foam = new THREE.Points(
    foamGeometry,
    new THREE.PointsMaterial({
      map: createRadialTexture(64),
      color: 0xf8ffff,
      size: 1.4,
      transparent: true,
      opacity: 0.58,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  group.add(foam);

  const mist = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: createRadialTexture(128),
      color: 0xf1fbff,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    }),
  );
  mist.position
    .copy(top)
    .addScaledVector(direction, 9 + width * 0.4)
    .add(new THREE.Vector3(0, -height * 0.9, 0));
  mist.scale.set(width * 5.8, width * 2.2, 1);
  group.add(mist);
  group.userData.waterfallMaterial = material;
  return group;
}

export function createEnvironment(): Environment {
  const group = new THREE.Group();
  group.name = 'celestial-environment';
  const sky = createSky();
  group.add(sky);

  const hemi = new THREE.HemisphereLight(0xb8dcff, 0x96836a, 1.2);
  group.add(hemi);
  const sun = new THREE.DirectionalLight(0xffe0a7, 2.45);
  sun.position.copy(sunDirection).multiplyScalar(380);
  sun.position.y += 35;
  sun.target.position.set(0, 16, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -175;
  sun.shadow.camera.right = 175;
  sun.shadow.camera.top = 175;
  sun.shadow.camera.bottom = -175;
  sun.shadow.camera.near = 20;
  sun.shadow.camera.far = 760;
  sun.shadow.bias = -0.00035;
  sun.shadow.normalBias = 0.14;
  group.add(sun, sun.target);
  const bounce = new THREE.DirectionalLight(0xfff1d2, 0.68);
  bounce.position.set(280, 115, 370);
  bounce.target.position.set(0, 20, 0);
  group.add(bounce, bounce.target);
  const rim = new THREE.DirectionalLight(0xbfe5ff, 0.82);
  rim.position.set(220, 90, -230);
  rim.target.position.set(0, 24, 0);
  group.add(rim, rim.target);

  const cloudBanks = createCloudBanks();
  group.add(cloudBanks.group);
  const cloudSea = createInstancedCloudSea();
  group.add(cloudSea.mesh);
  const teyvat = createDistantTeyvat();
  group.add(teyvat);
  const shafts = createLightShafts();
  group.add(shafts.group);
  const particles = createFarParticles();
  group.add(particles.group);

  const skyMaterial = sky.material as THREE.ShaderMaterial;

  return {
    group,
    update(time, delta) {
      skyMaterial.uniforms.uTime.value = time;
      shafts.materials.forEach((material) => {
        material.uniforms.uTime.value = time;
      });
      cloudBanks.update(time);
      cloudSea.update(time);
      particles.update(time);
      group.traverse((object) => {
        if (object.userData.waterfallMaterial instanceof THREE.ShaderMaterial) {
          object.userData.waterfallMaterial.uniforms.uTime.value = time;
        }
      });
      void delta;
    },
  };
}
