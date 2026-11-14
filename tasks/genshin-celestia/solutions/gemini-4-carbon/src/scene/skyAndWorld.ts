import * as THREE from 'three';
import { SUN_DIRECTION } from '../core/materials';
import { clamp, composeMatrix, fbm2, mergeParts, mulberry32, preparePart, ridgedFbm2, smoothstep } from '../core/math';

export interface SkyAndWorldHandle {
  group: THREE.Group;
  update: (elapsed: number) => void;
  dispose: () => void;
}

function createSkyDome(): { mesh: THREE.Mesh; material: THREE.ShaderMaterial } {
  const geometry = new THREE.SphereGeometry(6800, 64, 48);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uSunDir: { value: SUN_DIRECTION },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldDir;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldDir = normalize(position);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      uniform float uTime;
      varying vec3 vWorldDir;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = rot * p * 2.04;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec3 dir = normalize(vWorldDir);
        float y = dir.y;

        // Genshin daytime sky palette: deep zenith cobalt -> vibrant azure -> luminous horizon mist
        vec3 zenithCol = vec3(0.10, 0.34, 0.76);
        vec3 midSkyCol = vec3(0.30, 0.62, 0.93);
        vec3 horizonCol = vec3(0.83, 0.93, 1.00);
        vec3 nadirCol = vec3(0.56, 0.77, 0.96);

        float upT = clamp(y, 0.0, 1.0);
        vec3 sky = mix(horizonCol, midSkyCol, smoothstep(0.0, 0.28, upT));
        sky = mix(sky, zenithCol, smoothstep(0.22, 0.88, upT));

        // Lower hemisphere blends smoothly into aerial mist over Teyvat
        if (y < 0.0) {
          sky = mix(horizonCol, nadirCol, smoothstep(0.0, -0.42, y));
        }

        // Golden solar scattering & halo
        float sunDot = max(dot(dir, normalize(uSunDir)), 0.0);
        float mieWide = pow(sunDot, 3.2);
        float mieTight = pow(sunDot, 28.0);
        float sunDisc = smoothstep(0.9982, 0.9995, sunDot);

        // Warm golden horizon glow near sun azimuth
        float horizonBand = exp(-abs(y) * 6.5);
        sky += vec3(1.0, 0.84, 0.56) * mieWide * (0.28 + 0.32 * horizonBand);
        sky += vec3(1.0, 0.93, 0.76) * mieTight * 0.62;
        sky += vec3(1.0, 0.98, 0.90) * sunDisc * 2.2;

        // Delicate high-altitude anime cirrus streaks
        if (y > 0.03) {
          vec2 uv = dir.xz / (y + 0.18) * 1.35 + vec2(uTime * 0.003, -uTime * 0.0015);
          float c1 = fbm(uv * vec2(1.4, 3.2));
          float c2 = fbm(uv * vec2(2.8, 1.2) + 4.3);
          float cirrus = smoothstep(0.56, 0.84, c1 * 0.65 + c2 * 0.35);
          cirrus *= smoothstep(0.03, 0.22, y) * (1.0 - smoothstep(0.55, 0.92, y));
          vec3 cirrusCol = mix(vec3(0.95, 0.98, 1.0), vec3(1.0, 0.94, 0.80), mieWide * 0.75);
          sky = mix(sky, cirrusCol, cirrus * 0.36);
        }

        gl_FragColor = vec4(pow(max(sky, vec3(0.0)), vec3(2.2)), 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.renderOrder = -20;
  return { mesh, material };
}

function createDistantTeyvat(): { mesh: THREE.Mesh; material: THREE.ShaderMaterial } {
  const size = 9800;
  const segs = 160;
  const geometry = new THREE.PlaneGeometry(size, size, segs, segs);
  geometry.rotateX(-Math.PI / 2);

  const pos = geometry.attributes.position as THREE.BufferAttribute;
  const heights = new Float32Array(pos.count);

  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const nx = x * 0.00055;
    const nz = z * 0.00055;

    // Winding river channel & Cider-Lake basin visible through cloud rifts
    const riverCurve = Math.sin(nz * 3.1 + fbm2(nx * 2.0, nz * 2.0, 3) * 1.3) * 0.38;
    const riverDist = Math.abs(nx - 0.12 - riverCurve);
    const lakeDist = Math.hypot(nx - 0.36, nz - 0.28);
    const waterMask = clamp(
      Math.min(smoothstep(0.025, 0.11, riverDist), smoothstep(0.14, 0.28, lakeDist)),
      0,
      1,
    );

    // Continental landmass vs outer ocean
    const radial = Math.hypot(nx * 0.82, nz * 0.82);
    const coast = 1 - smoothstep(1.35, 2.25, radial + fbm2(nx * 1.7, nz * 1.7, 3) * 0.35);

    const plains = fbm2(nx * 2.4 + 3.1, nz * 2.4 - 1.7, 4) * 0.5 + 0.5;
    const mountains = ridgedFbm2(nx * 3.2 - 2.4, nz * 3.2 + 4.2, 4);
    const dragonspineMask = smoothstep(0.55, 0.12, Math.hypot(nx + 0.58, nz - 0.15));

    let h = (plains * 55 + Math.pow(mountains, 2.2) * 240 + dragonspineMask * 290) * coast * waterMask;
    if (waterMask < 0.15 || coast < 0.08) {
      h = -8;
    }
    pos.setY(i, h);
    heights[i] = h;
  }

  geometry.setAttribute('aHeight', new THREE.BufferAttribute(heights, 1));
  geometry.computeVertexNormals();

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uSunDir: { value: SUN_DIRECTION },
    },
    vertexShader: /* glsl */ `
      attribute float aHeight;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying float vHeight;
      void main() {
        vHeight = aHeight;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying float vHeight;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec3 n = normalize(vWorldNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float ndotl = clamp(dot(n, normalize(uSunDir)) * 0.65 + 0.35, 0.0, 1.0);

        float biome = noise(vWorldPos.xz * 0.0009 + 5.2);
        // Mondstadt emerald valleys + Liyue golden-amber terraces + mountain slate + snow peaks
        vec3 mondGreen = vec3(0.25, 0.56, 0.34);
        vec3 liyueGold = vec3(0.62, 0.55, 0.30);
        vec3 cliffGrey = vec3(0.42, 0.46, 0.54);
        vec3 snowWhite = vec3(0.92, 0.95, 0.99);

        vec3 landCol = mix(mondGreen, liyueGold, smoothstep(0.38, 0.72, biome));
        landCol = mix(landCol, cliffGrey, smoothstep(85.0, 195.0, vHeight));
        landCol = mix(landCol, snowWhite, smoothstep(235.0, 330.0, vHeight));
        landCol *= mix(vec3(0.58, 0.70, 0.90), vec3(1.06, 0.99, 0.86), ndotl);

        // Rivers, Cider Lake & ocean catching sunlit reflection
        if (vHeight < 1.5) {
          vec3 waterDeep = vec3(0.18, 0.48, 0.76);
          vec3 halfVec = normalize(normalize(uSunDir) + viewDir);
          float spec = pow(max(dot(vec3(0.0, 1.0, 0.0), halfVec), 0.0), 36.0);
          landCol = waterDeep + vec3(1.0, 0.90, 0.68) * spec * 0.95;
        }

        // Heavy high-altitude Rayleigh aerial perspective so Teyvat feels miles below,
        // while keeping rivers, emerald valleys & mountain ridges clearly legible through cloud rifts
        float horizDist = length(vWorldPos.xz);
        float aerial = clamp(0.42 + smoothstep(900.0, 4800.0, horizDist) * 0.52, 0.0, 0.96);
        float sunAlign = pow(max(dot(-viewDir, normalize(uSunDir)), 0.0), 4.0);
        vec3 skyMist = mix(vec3(0.48, 0.73, 0.95), vec3(0.97, 0.90, 0.76), sunAlign * 0.48);

        vec3 finalCol = mix(landCol, skyMist, aerial);
        float edgeAlpha = 1.0 - smoothstep(3400.0, 4750.0, horizDist);
        gl_FragColor = vec4(pow(max(finalCol, vec3(0.0)), vec3(2.2)), edgeAlpha);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = -1420;
  mesh.renderOrder = -15;
  return { mesh, material };
}

function createCloudSeaDeck(
  y: number,
  seedOffset: number,
  opacityScale: number,
): { mesh: THREE.Mesh; material: THREE.ShaderMaterial } {
  const geometry = new THREE.PlaneGeometry(11500, 11500, 1, 1);
  geometry.rotateX(-Math.PI / 2);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uSunDir: { value: SUN_DIRECTION },
      uTime: { value: 0 },
      uSeed: { value: seedOffset },
      uOpacity: { value: opacityScale },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      uniform float uTime;
      uniform float uSeed;
      uniform float uOpacity;
      varying vec3 vWorldPos;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.52;
        mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p = rot * p * 2.03;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = vWorldPos.xz * 0.00068 + vec2(uTime * 0.0045 + uSeed, -uTime * 0.0022 + uSeed * 0.7);
        float base = fbm(p);
        float detail = fbm(p * 2.7 - vec2(uTime * 0.003, 0.0));
        float density = base * 0.72 + detail * 0.28;

        // Carve natural scenic cloud rifts beneath & in front of Celestia so distant Teyvat shines far below
        float rift1 = smoothstep(280.0, 1080.0, length(vWorldPos.xz - vec2(120.0, 220.0)));
        float rift2 = smoothstep(260.0, 920.0, length(vWorldPos.xz - vec2(-460.0, -80.0)));
        float rift3 = smoothstep(220.0, 820.0, length(vWorldPos.xz - vec2(480.0, -240.0)));
        float riftMask = mix(0.32, 1.0, rift1 * rift2 * rift3);

        float cloudAlpha = smoothstep(0.47, 0.78, density * riftMask);

        // Estimate cloud billow normal from noise gradient for painterly Genshin sun/shadow
        float dx = fbm(p + vec2(0.035, 0.0)) - base;
        float dz = fbm(p + vec2(0.0, 0.035)) - base;
        vec3 cloudNorm = normalize(vec3(-dx * 5.5, 1.0, -dz * 5.5));

        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float sunLit = clamp(dot(cloudNorm, normalize(uSunDir)) * 0.65 + 0.45, 0.0, 1.0);
        float forwardScatter = pow(max(dot(-viewDir, normalize(uSunDir)), 0.0), 4.0);

        vec3 shadowCol = vec3(0.64, 0.76, 0.94);
        vec3 midCol = vec3(0.95, 0.96, 0.99);
        vec3 sunTopCol = vec3(1.0, 0.96, 0.86);

        vec3 col = mix(shadowCol, midCol, smoothstep(0.22, 0.58, sunLit));
        col = mix(col, sunTopCol, smoothstep(0.55, 0.88, sunLit));
        // Golden silver-lining rim around cloud edges
        float edgeRim = smoothstep(0.2, 0.65, cloudAlpha) * (1.0 - smoothstep(0.65, 0.95, cloudAlpha));
        col += vec3(1.0, 0.88, 0.62) * (edgeRim * 0.35 + forwardScatter * 0.28);

        // Fade smoothly at extreme horizon
        float distFade = 1.0 - smoothstep(3200.0, 5600.0, length(vWorldPos.xz));
        col = mix(vec3(0.80, 0.90, 0.99), col, distFade);

        gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(2.2)), cloudAlpha * distFade * uOpacity);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = y;
  mesh.renderOrder = y > -600 ? -10 : -12;
  return { mesh, material };
}

interface CloudPuffSeed {
  angle: number;
  radius: number;
  y: number;
  sx: number;
  sy: number;
  sz: number;
  speed: number;
  rotY: number;
}

function createCumulusClusterGeometry(): THREE.BufferGeometry {
  // Multi-lobed painterly anime cumulus cloud built from 7 overlapping spheres
  // with smooth radial-outward normals so lobes blend into one cohesive fluffy cloud!
  const lobes = [
    { x: 0.0, y: 0.18, z: 0.0, r: 0.72 },
    { x: -0.52, y: 0.02, z: 0.12, r: 0.56 },
    { x: 0.54, y: 0.04, z: -0.08, r: 0.58 },
    { x: -0.24, y: 0.28, z: -0.32, r: 0.50 },
    { x: 0.26, y: 0.24, z: 0.34, r: 0.48 },
    { x: -0.82, y: -0.10, z: -0.06, r: 0.40 },
    { x: 0.84, y: -0.08, z: 0.10, r: 0.42 },
  ];

  const parts: THREE.BufferGeometry[] = [];
  for (const l of lobes) {
    const s = new THREE.SphereGeometry(l.r, 18, 14);
    parts.push(preparePart(s, composeMatrix(l.x, l.y, l.z)));
    s.dispose();
  }
  const merged = mergeParts(parts);

  // Recompute unified smooth outward cloud-dome normals across the whole multi-lobe cluster
  const pos = merged.attributes.position as THREE.BufferAttribute;
  const norm = merged.attributes.normal as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.set(pos.getX(i), pos.getY(i) * 1.65 + 0.15, pos.getZ(i)).normalize();
    n.set(norm.getX(i), norm.getY(i), norm.getZ(i));
    n.lerp(v, 0.65).normalize();
    norm.setXYZ(i, n.x, n.y, n.z);
  }
  return merged;
}

function createVolumetricCloudBanks(): {
  mesh: THREE.InstancedMesh;
  material: THREE.ShaderMaterial;
  seeds: CloudPuffSeed[];
} {
  const rand = mulberry32(202609);
  const puffGeo = createCumulusClusterGeometry();

  const count = 135;
  const seeds: CloudPuffSeed[] = [];

  for (let i = 0; i < count; i++) {
    const ring = i < 26 ? 0 : i < 88 ? 1 : 2;
    let radius = 0;
    let y = 0;
    let scaleBase = 1;
    let angle = rand() * Math.PI * 2;

    if (ring === 0) {
      // Soft abyssal mist ring around the deepest tip of the inverted cliff
      radius = 250 + rand() * 320;
      y = -435 - rand() * 135;
      scaleBase = 55 + rand() * 52;
      if (Math.cos(angle - 1.08) > 0.65) {
        angle += 1.4;
      }
    } else if (ring === 1) {
      // Mid-distance sea-of-clouds cumulus ring framing Celestia
      radius = 860 + rand() * 780;
      y = -445 - rand() * 170;
      scaleBase = 95 + rand() * 115;
      // Keep scenic foreground rifts open toward Teyvat below
      if (Math.cos(angle - 1.08) > 0.68 && radius < 1400) {
        angle += 1.35;
      }
    } else {
      // Grand distant horizon cumulus towers
      radius = 1800 + rand() * 1650;
      y = -430 - rand() * 160;
      scaleBase = 185 + rand() * 220;
    }

    seeds.push({
      angle,
      radius,
      y,
      sx: scaleBase * (1.15 + rand() * 0.55),
      sy: scaleBase * (0.58 + rand() * 0.35),
      sz: scaleBase * (1.05 + rand() * 0.50),
      speed: (0.0025 + rand() * 0.004) * (ring === 2 ? 0.45 : 1),
      rotY: rand() * Math.PI * 2,
    });
  }

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uSunDir: { value: SUN_DIRECTION },
    },
    vertexShader: /* glsl */ `
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vLocalPos;
      void main() {
        vLocalPos = position;
        vec4 wp = vec4(position, 1.0);
        vec3 wn = normal;
        #ifdef USE_INSTANCING
          wp = instanceMatrix * wp;
          wn = mat3(instanceMatrix) * wn;
        #endif
        wp = modelMatrix * wp;
        vWorldPos = wp.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * wn);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uSunDir;
      varying vec3 vWorldPos;
      varying vec3 vWorldNormal;
      varying vec3 vLocalPos;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      void main() {
        vec3 n = normalize(vWorldNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        float ndotl = dot(n, normalize(uSunDir)) * 0.5 + 0.5;
        float upFactor = clamp(n.y * 0.5 + 0.5, 0.0, 1.0);

        // Billowing noise detail for feathery painterly cloud edges (zero polygon facets!)
        float billow = noise(vWorldPos.xz * 0.008 + vLocalPos.xy * 2.4) * 0.65
                     + noise(vWorldPos.xz * 0.021 - vLocalPos.zy * 4.1) * 0.35;

        // Genshin anime cumulus ramp: warm cream-gold crowns, periwinkle-azure undersides
        vec3 shadowCol = vec3(0.62, 0.75, 0.95);
        vec3 midCol = vec3(0.94, 0.97, 1.00);
        vec3 litCol = vec3(1.00, 0.96, 0.87);

        float litVal = ndotl * 0.62 + upFactor * 0.38 + (billow - 0.5) * 0.16;
        vec3 col = mix(shadowCol, midCol, smoothstep(0.22, 0.50, litVal));
        col = mix(col, litCol, smoothstep(0.48, 0.72, litVal));

        float viewDot = abs(dot(n, viewDir));
        float sunForward = pow(max(dot(-viewDir, normalize(uSunDir)), 0.0), 4.0);
        col += vec3(1.0, 0.90, 0.68) * ((1.0 - viewDot) * 0.22 + sunForward * 0.22);

        float edgeSoft = smoothstep(0.18, 0.68, viewDot * (0.72 + billow * 0.56));
        float camDist = length(vWorldPos - cameraPosition);
        float nearFade = smoothstep(160.0, 420.0, camDist);
        float distFade = 1.0 - smoothstep(2500.0, 3800.0, camDist);
        gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(2.2)), edgeSoft * nearFade * distFade * 0.72);
      }
    `,
  });

  const mesh = new THREE.InstancedMesh(puffGeo, material, count);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.frustumCulled = false;
  mesh.renderOrder = -8;

  return { mesh, material, seeds };
}

export function createSkyAndWorld(): SkyAndWorldHandle {
  const group = new THREE.Group();
  group.name = 'SkyAndWorld';

  const sky = createSkyDome();
  const teyvat = createDistantTeyvat();
  const deckUpper = createCloudSeaDeck(-525, 1.7, 0.72);
  const deckLower = createCloudSeaDeck(-785, 8.3, 0.82);
  const cloudBanks = createVolumetricCloudBanks();

  group.add(sky.mesh, teyvat.mesh, deckLower.mesh, deckUpper.mesh, cloudBanks.mesh);

  const dummy = new THREE.Object3D();
  const updateBanks = (elapsed: number) => {
    for (let i = 0; i < cloudBanks.seeds.length; i++) {
      const s = cloudBanks.seeds[i];
      const a = s.angle + elapsed * s.speed;
      dummy.position.set(
        Math.cos(a) * s.radius,
        s.y + Math.sin(elapsed * 0.22 + i) * 3.5,
        Math.sin(a) * s.radius,
      );
      dummy.rotation.set(0, s.rotY + elapsed * s.speed * 0.5, 0);
      dummy.scale.set(s.sx, s.sy, s.sz);
      dummy.updateMatrix();
      cloudBanks.mesh.setMatrixAt(i, dummy.matrix);
    }
    cloudBanks.mesh.instanceMatrix.needsUpdate = true;
  };
  updateBanks(0);

  return {
    group,
    update: (elapsed: number) => {
      sky.material.uniforms.uTime.value = elapsed;
      deckUpper.material.uniforms.uTime.value = elapsed;
      deckLower.material.uniforms.uTime.value = elapsed;
      updateBanks(elapsed);
    },
    dispose: () => {
      sky.mesh.geometry.dispose();
      sky.material.dispose();
      teyvat.mesh.geometry.dispose();
      teyvat.material.dispose();
      deckUpper.mesh.geometry.dispose();
      deckUpper.material.dispose();
      deckLower.mesh.geometry.dispose();
      deckLower.material.dispose();
      cloudBanks.mesh.geometry.dispose();
      cloudBanks.material.dispose();
    },
  };
}
