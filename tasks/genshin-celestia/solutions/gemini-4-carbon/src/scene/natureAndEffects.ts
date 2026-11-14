import * as THREE from 'three';
import { CelestiaPalette, SUN_DIRECTION } from '../core/materials';
import { composeMatrix, fbm3, mergeParts, mulberry32, preparePart } from '../core/math';
import { WaterfallAnchor } from './centralIsland';
import { FloatingDebrisSeed } from './outerRing';

export interface NatureAndEffectsHandle {
  group: THREE.Group;
  update: (elapsed: number) => void;
  dispose: () => void;
}

function buildTreesAndFoliage(
  palette: CelestiaPalette,
  treeSpots: THREE.Vector3[],
): { group: THREE.Group; disposables: THREE.BufferGeometry[] } {
  const group = new THREE.Group();
  const rand = mulberry32(55109);

  const trunkParts: THREE.BufferGeometry[] = [];
  const lushCanopyMatrices: THREE.Matrix4[] = [];
  const sunlitCanopyMatrices: THREE.Matrix4[] = [];
  const blossomCanopyMatrices: THREE.Matrix4[] = [];

  for (let i = 0; i < treeSpots.length; i++) {
    const spot = treeSpots[i];
    const scale = 0.78 + rand() * 0.68;
    const isSacredTree = i % 11 === 0;
    const trunkH = (isSacredTree ? 12.5 : 9.2) * scale;

    // Graceful curved anime trunk + 2 main branches
    const leanX = (rand() - 0.5) * 2.2 * scale;
    const leanZ = (rand() - 0.5) * 2.2 * scale;
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(spot.x, spot.y - 0.8, spot.z),
      new THREE.Vector3(spot.x + leanX * 0.5, spot.y + trunkH * 0.52, spot.z + leanZ * 0.5),
      new THREE.Vector3(spot.x + leanX, spot.y + trunkH, spot.z + leanZ),
    ]);
    const trunkGeo = new THREE.TubeGeometry(curve, 5, 0.58 * scale, 6, false);
    trunkParts.push(preparePart(trunkGeo));
    trunkGeo.dispose();

    const crownX = spot.x + leanX;
    const crownY = spot.y + trunkH;
    const crownZ = spot.z + leanZ;

    // Layered multi-puff anime tree crown
    const puffCount = isSacredTree ? 6 : 4;
    for (let p = 0; p < puffCount; p++) {
      const pa = (p / puffCount) * Math.PI * 2 + rand() * 0.6;
      const pr = p === 0 ? 0 : (2.2 + rand() * 1.8) * scale;
      const py = crownY + (p === 0 ? 2.2 : (rand() - 0.2) * 2.1) * scale;
      const rad = (p === 0 ? 4.4 : 3.2 + rand() * 1.2) * scale;

      const mat = composeMatrix(
        crownX + Math.cos(pa) * pr,
        py,
        crownZ + Math.sin(pa) * pr,
        rand() * 0.4,
        rand() * Math.PI * 2,
        rand() * 0.4,
        rad * 1.15,
        rad * 0.78,
        rad * 1.1,
      );

      if (isSacredTree) {
        blossomCanopyMatrices.push(mat);
      } else if (p === 0 || rand() > 0.52) {
        sunlitCanopyMatrices.push(mat);
      } else {
        lushCanopyMatrices.push(mat);
      }
    }
  }

  // Add lush emerald cliffside bushes & meadow shrubs
  for (let i = 0; i < treeSpots.length; i += 2) {
    const spot = treeSpots[i];
    const bx = spot.x + (rand() - 0.5) * 9;
    const bz = spot.z + (rand() - 0.5) * 9;
    const s = 1.6 + rand() * 1.8;
    lushCanopyMatrices.push(
      composeMatrix(bx, spot.y + s * 0.35, bz, 0, rand() * Math.PI, 0, s * 1.3, s * 0.72, s * 1.2),
    );
  }

  const trunkMerged = mergeParts(trunkParts);
  const trunkMesh = new THREE.Mesh(trunkMerged, palette.treeBark);
  trunkMesh.castShadow = true;
  trunkMesh.receiveShadow = true;
  group.add(trunkMesh);

  // Sculpted stylized puff sphere for anime foliage
  const puffGeo = new THREE.IcosahedronGeometry(1, 2);
  const pAttr = puffGeo.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < pAttr.count; i++) {
    const x = pAttr.getX(i);
    const y = pAttr.getY(i);
    const z = pAttr.getZ(i);
    const n = 1 + fbm3(x * 2.2, y * 2.2, z * 2.2, 2) * 0.16;
    pAttr.setXYZ(i, x * n, y * n, z * n);
  }
  puffGeo.computeVertexNormals();

  const makeCanopyInstanced = (matrices: THREE.Matrix4[], mat: THREE.Material) => {
    const inst = new THREE.InstancedMesh(puffGeo, mat, matrices.length);
    for (let i = 0; i < matrices.length; i++) {
      inst.setMatrixAt(i, matrices[i]);
    }
    inst.instanceMatrix.needsUpdate = true;
    inst.castShadow = true;
    inst.receiveShadow = true;
    return inst;
  };

  group.add(
    makeCanopyInstanced(lushCanopyMatrices, palette.foliageLush),
    makeCanopyInstanced(sunlitCanopyMatrices, palette.foliageSunlit),
    makeCanopyInstanced(blossomCanopyMatrices, palette.sacredBlossom),
  );

  return { group, disposables: [trunkMerged, puffGeo] };
}

function buildSuspendedWaterfalls(anchors: WaterfallAnchor[]): {
  group: THREE.Group;
  waterMaterial: THREE.ShaderMaterial;
  mistMaterial: THREE.ShaderMaterial;
  mistMesh: THREE.InstancedMesh;
  mistSeeds: { basePos: THREE.Vector3; scale: number; speed: number; phase: number }[];
  disposables: THREE.BufferGeometry[];
} {
  const group = new THREE.Group();
  const ribbonParts: THREE.BufferGeometry[] = [];
  const mistSeeds: { basePos: THREE.Vector3; scale: number; speed: number; phase: number }[] = [];
  const rand = mulberry32(31415);

  for (let aIdx = 0; aIdx < anchors.length; aIdx++) {
    const wf = anchors[aIdx];
    const wSegs = 10;
    const hSegs = 28;
    const positions: number[] = [];
    const uvs: number[] = [];
    const normals: number[] = [];
    const indices: number[] = [];

    const right = new THREE.Vector3(-wf.outwardDir.z, 0, wf.outwardDir.x).normalize();

    for (let ih = 0; ih <= hSegs; ih++) {
      const v = ih / hSegs; // 0 = top spillway, 1 = mid-air mist tip
      // Smooth spillway arc over cliff lip in first 12% of drop, then vertical sky cascade
      const outCurve = v < 0.14 ? Math.sin((v / 0.14) * Math.PI * 0.5) * 9.5 : 9.5 + (v - 0.14) * 3.5;
      const dropY = -Math.pow(v, 1.08) * wf.dropLength;
      // Gentle fanning out as water atomizes into mist
      const widthScale = 1 + Math.pow(v, 1.6) * 0.65;

      for (let iw = 0; iw <= wSegs; iw++) {
        const u = iw / wSegs;
        const lateral = (u - 0.5) * wf.width * widthScale;
        const bulge = Math.sin(u * Math.PI) * 1.8;

        const px = wf.position.x + wf.outwardDir.x * (outCurve + bulge) + right.x * lateral;
        const py = wf.position.y + dropY;
        const pz = wf.position.z + wf.outwardDir.z * (outCurve + bulge) + right.z * lateral;

        positions.push(px, py, pz);
        uvs.push(u, v);
        normals.push(wf.outwardDir.x, 0.18, wf.outwardDir.z);
      }
    }

    const stride = wSegs + 1;
    for (let ih = 0; ih < hSegs; ih++) {
      for (let iw = 0; iw < wSegs; iw++) {
        const a = ih * stride + iw;
        const b = a + 1;
        const c = a + stride;
        const d = c + 1;
        indices.push(a, c, b, b, c, d);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    ribbonParts.push(preparePart(geo));
    geo.dispose();

    // Add mist spray puffs at cliff spillway and mid-air evaporation zone
    for (let m = 0; m < 14; m++) {
      const isTop = m < 4;
      const vPos = isTop ? 0.04 + rand() * 0.08 : 0.62 + rand() * 0.42;
      const spread = (rand() - 0.5) * wf.width * (isTop ? 1.1 : 2.2);
      const outDist = isTop ? 7 + rand() * 4 : 11 + rand() * 8;
      mistSeeds.push({
        basePos: new THREE.Vector3(
          wf.position.x + wf.outwardDir.x * outDist + right.x * spread,
          wf.position.y - vPos * wf.dropLength,
          wf.position.z + wf.outwardDir.z * outDist + right.z * spread,
        ),
        scale: (isTop ? 5.5 : 9.5) + rand() * 7.5,
        speed: 0.7 + rand() * 0.6,
        phase: rand() * Math.PI * 2 + aIdx,
      });
    }
  }

  const waterGeo = mergeParts(ribbonParts);
  const waterMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uSunDir: { value: SUN_DIRECTION },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uSunDir;
      varying vec2 vUv;
      varying vec3 vWorldPos;

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
        // Fast downward scrolling anime waterfall foam streaks
        vec2 flowUv1 = vec2(vUv.x * 6.5, vUv.y * 5.0 - uTime * 1.45);
        vec2 flowUv2 = vec2(vUv.x * 13.0 + 2.1, vUv.y * 9.0 - uTime * 2.15);
        float n1 = noise(flowUv1);
        float n2 = noise(flowUv2);
        float streaks = n1 * 0.62 + n2 * 0.38;

        float edgeFade = sin(vUv.x * 3.14159265);
        edgeFade = smoothstep(0.0, 0.35, edgeFade);

        // Evaporate gracefully into glowing sky mist in mid-air!
        float topFoam = 1.0 - smoothstep(0.0, 0.14, vUv.y);
        float bottomDissolve = 1.0 - smoothstep(0.54, 1.0, vUv.y + (1.0 - streaks) * 0.24);

        vec3 aquaCore = vec3(0.42, 0.84, 0.98);
        vec3 whiteFoam = vec3(0.98, 0.99, 1.00);
        float foamMask = smoothstep(0.46, 0.72, streaks + topFoam * 0.45);
        vec3 col = mix(aquaCore, whiteFoam, foamMask);

        float alpha = edgeFade * bottomDissolve * (0.68 + foamMask * 0.30);
        gl_FragColor = vec4(pow(max(col, vec3(0.0)), vec3(2.2)), clamp(alpha, 0.0, 0.95));
      }
    `,
  });

  const waterMesh = new THREE.Mesh(waterGeo, waterMaterial);
  waterMesh.renderOrder = 2;
  group.add(waterMesh);

  // Soft billowing waterfall mist puffs
  const mistGeo = new THREE.SphereGeometry(1, 18, 14);
  const mistMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec3 vNormalView;
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = vec4(position, 1.0);
        vec3 wn = normal;
        #ifdef USE_INSTANCING
          wp = instanceMatrix * wp;
          wn = mat3(instanceMatrix) * wn;
        #endif
        vWorldPos = (modelMatrix * wp).xyz;
        vNormalView = normalize(normalMatrix * wn);
        gl_Position = projectionMatrix * modelViewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormalView;
      varying vec3 vWorldPos;
      void main() {
        float rim = pow(clamp(abs(vNormalView.z), 0.0, 1.0), 3.4);
        float wispy = 0.75 + 0.25 * sin(vWorldPos.x * 0.25 + vWorldPos.y * 0.18);
        vec3 col = pow(vec3(0.92, 0.97, 1.0), vec3(2.2));
        gl_FragColor = vec4(col, rim * wispy * 0.22);
      }
    `,
  });

  const mistMesh = new THREE.InstancedMesh(mistGeo, mistMaterial, mistSeeds.length);
  mistMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mistMesh.renderOrder = 3;
  group.add(mistMesh);

  return {
    group,
    waterMaterial,
    mistMaterial,
    mistMesh,
    mistSeeds,
    disposables: [waterGeo, mistGeo],
  };
}

function buildFloatingDebrisAndMotes(
  palette: CelestiaPalette,
  bridgeDebrisSeeds: FloatingDebrisSeed[],
): {
  group: THREE.Group;
  rockInstanced: THREE.InstancedMesh;
  ivoryInstanced: THREE.InstancedMesh;
  rockSeeds: FloatingDebrisSeed[];
  ivorySeeds: FloatingDebrisSeed[];
  motesMaterial: THREE.ShaderMaterial;
  disposables: THREE.BufferGeometry[];
} {
  const group = new THREE.Group();
  const rand = mulberry32(88321);

  const rockSeeds: FloatingDebrisSeed[] = [];
  const ivorySeeds: FloatingDebrisSeed[] = [...bridgeDebrisSeeds];

  // Generate ~240 floating rock shards & ancient fragments swirling between the islands and underside abyss
  for (let i = 0; i < 240; i++) {
    const zone = i < 110 ? 0 : i < 195 ? 1 : 2;
    let ang = rand() * Math.PI * 2;
    let rad = 0;
    let y = 0;
    let baseScale = 1;

    if (zone === 0) {
      // Chasm between central island and outer ring islets
      rad = 225 + rand() * 215;
      y = -55 + rand() * 95;
      baseScale = 1.4 + rand() * 3.1;
    } else if (zone === 1) {
      // Swirling debris trail around the massive inverted underside rock
      rad = 55 + rand() * 185;
      y = -445 + rand() * 340;
      baseScale = 1.8 + rand() * 4.2;
    } else {
      // High-altitude celestial pebbles around the outer ring perimeter
      rad = 465 + rand() * 135;
      y = -35 + rand() * 95;
      baseScale = 1.5 + rand() * 3.4;
      ang += 0.2;
    }

    const seed: FloatingDebrisSeed = {
      basePos: new THREE.Vector3(Math.cos(ang) * rad, y, Math.sin(ang) * rad),
      scale: new THREE.Vector3(
        baseScale * (0.48 + rand() * 0.45),
        baseScale * (0.95 + rand() * 1.45),
        baseScale * (0.48 + rand() * 0.45),
      ),
      rot: new THREE.Euler(rand() * Math.PI, rand() * Math.PI, rand() * Math.PI),
      bobAmp: 1.5 + rand() * 3.2,
      bobSpeed: 0.35 + rand() * 0.55,
      phase: rand() * Math.PI * 2,
      isIvory: i % 9 === 0,
    };

    if (seed.isIvory) {
      ivorySeeds.push(seed);
    } else {
      rockSeeds.push(seed);
    }
  }

  // Faceted angular rock splinter geometry with warm limestone vertex colors
  const shardGeo = new THREE.OctahedronGeometry(1, 0);
  const sPos = shardGeo.attributes.position as THREE.BufferAttribute;
  const sCols = new Float32Array(sPos.count * 3);
  for (let i = 0; i < sPos.count; i++) {
    const shade = 0.88 + ((i * 17) % 8) * 0.02;
    sCols[i * 3] = shade;
    sCols[i * 3 + 1] = shade * 0.98;
    sCols[i * 3 + 2] = shade * 0.95;
  }
  shardGeo.setAttribute('color', new THREE.BufferAttribute(sCols, 3));
  shardGeo.computeVertexNormals();

  const ivoryBlockGeo = new THREE.OctahedronGeometry(1, 0);

  const rockInstanced = new THREE.InstancedMesh(shardGeo, palette.cliffRock, rockSeeds.length);
  rockInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  rockInstanced.castShadow = true;

  const ivoryInstanced = new THREE.InstancedMesh(
    ivoryBlockGeo,
    palette.ancientRuinStone,
    ivorySeeds.length,
  );
  ivoryInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  ivoryInstanced.castShadow = true;

  group.add(rockInstanced, ivoryInstanced);

  // Subtle golden celestial dust motes drifting through the holy sanctuary air
  const moteCount = 260;
  const motePositions = new Float32Array(moteCount * 3);
  const moteSeeds = new Float32Array(moteCount);
  for (let i = 0; i < moteCount; i++) {
    const a = rand() * Math.PI * 2;
    const r = 25 + Math.pow(rand(), 0.7) * 440;
    motePositions[i * 3] = Math.cos(a) * r;
    motePositions[i * 3 + 1] = -60 + rand() * 460;
    motePositions[i * 3 + 2] = Math.sin(a) * r;
    moteSeeds[i] = rand() * Math.PI * 2;
  }
  const motesGeo = new THREE.BufferGeometry();
  motesGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  motesGeo.setAttribute('aSeed', new THREE.BufferAttribute(moteSeeds, 1));

  const motesMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 } },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.45 + aSeed) * 4.5;
        p.x += cos(uTime * 0.30 + aSeed * 1.7) * 3.0;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = clamp(2400.0 / -mvPosition.z, 1.5, 5.5);
        vAlpha = 0.35 + 0.35 * sin(uTime * 1.1 + aSeed * 3.1);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: /* glsl */ `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        float glow = smoothstep(0.5, 0.05, d);
        gl_FragColor = vec4(1.0, 0.91, 0.65, glow * vAlpha);
      }
    `,
  });

  const motesPoints = new THREE.Points(motesGeo, motesMaterial);
  group.add(motesPoints);

  return {
    group,
    rockInstanced,
    ivoryInstanced,
    rockSeeds,
    ivorySeeds,
    motesMaterial,
    disposables: [shardGeo, ivoryBlockGeo, motesGeo],
  };
}

/**
 * Builds golden volumetric light shafts (`柔和金色阳光、体积光束`) streaming diagonally
 * along SUN_DIRECTION across Celestia's spire, bridges, and clouds!
 */
function buildVolumetricLightShafts(): {
  group: THREE.Group;
  material: THREE.ShaderMaterial;
  disposables: THREE.BufferGeometry[];
} {
  const group = new THREE.Group();
  const rayGeo = new THREE.CylinderGeometry(1.0, 1.55, 1, 32, 1, true);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        vWorldNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPos;

      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        // Ultra-smooth high-order Fresnel radial falloff + sine longitudinal taper -> zero straight edges!
        float radial = pow(clamp(abs(dot(normalize(vWorldNormal), viewDir)), 0.0, 1.0), 4.2);
        float longitudinal = pow(clamp(sin(vUv.y * 3.14159265), 0.0, 1.0), 2.1);
        float shimmer = 0.90 + 0.10 * sin(uTime * 0.55 + vUv.x * 12.566);

        float nearFade = smoothstep(180.0, 480.0, length(cameraPosition - vWorldPos));

        float alpha = radial * longitudinal * shimmer * nearFade * 0.13;
        vec3 rayColor = pow(mix(vec3(1.0, 0.86, 0.52), vec3(1.0, 0.95, 0.80), vUv.y), vec3(2.2));
        gl_FragColor = vec4(rayColor, alpha);
      }
    `,
  });

  // Orient each volumetric light shaft strictly along SUN_DIRECTION!
  const up = new THREE.Vector3(0, 1, 0);
  const rayQuat = new THREE.Quaternion().setFromUnitVectors(up, SUN_DIRECTION);

  const shaftSpecs = [
    { center: new THREE.Vector3(-90, 240, 40), radius: 58, length: 1180 },
    { center: new THREE.Vector3(35, 195, -20), radius: 52, length: 1120 },
    { center: new THREE.Vector3(165, 125, -75), radius: 54, length: 1080 },
    { center: new THREE.Vector3(-240, 140, 110), radius: 64, length: 1140 },
    { center: new THREE.Vector3(260, 70, 95), radius: 50, length: 1020 },
    { center: new THREE.Vector3(-45, 310, 15), radius: 44, length: 1060 },
    { center: new THREE.Vector3(-340, 85, -40), radius: 56, length: 1040 },
    { center: new THREE.Vector3(110, -40, 155), radius: 62, length: 1080 },
  ];

  for (const spec of shaftSpecs) {
    const mesh = new THREE.Mesh(rayGeo, material);
    mesh.position.copy(spec.center);
    mesh.quaternion.copy(rayQuat);
    mesh.scale.set(spec.radius, spec.length, spec.radius);
    mesh.renderOrder = 6;
    group.add(mesh);
  }

  return { group, material, disposables: [rayGeo] };
}

export function createNatureAndEffects(
  palette: CelestiaPalette,
  treeSpots: THREE.Vector3[],
  waterfallAnchors: WaterfallAnchor[],
  bridgeDebrisSeeds: FloatingDebrisSeed[],
): NatureAndEffectsHandle {
  const group = new THREE.Group();
  group.name = 'NatureAndEffects';

  const trees = buildTreesAndFoliage(palette, treeSpots);
  const waterfalls = buildSuspendedWaterfalls(waterfallAnchors);
  const debris = buildFloatingDebrisAndMotes(palette, bridgeDebrisSeeds);
  const shafts = buildVolumetricLightShafts();

  group.add(trees.group, waterfalls.group, debris.group, shafts.group);

  const dummy = new THREE.Object3D();

  const updateDynamic = (elapsed: number) => {
    waterfalls.waterMaterial.uniforms.uTime.value = elapsed;
    waterfalls.mistMaterial.uniforms.uTime.value = elapsed;
    debris.motesMaterial.uniforms.uTime.value = elapsed;
    shafts.material.uniforms.uTime.value = elapsed;

    for (let i = 0; i < waterfalls.mistSeeds.length; i++) {
      const m = waterfalls.mistSeeds[i];
      const cycle = ((elapsed * m.speed * 0.25 + m.phase) % 1 + 1) % 1;
      dummy.position.set(
        m.basePos.x + Math.sin(elapsed * 0.8 + m.phase) * 2.5,
        m.basePos.y - cycle * 16,
        m.basePos.z + Math.cos(elapsed * 0.7 + m.phase) * 2.5,
      );
      const sc = m.scale * (0.75 + Math.sin(cycle * Math.PI) * 0.55);
      dummy.scale.set(sc * 1.2, sc * 0.85, sc * 1.2);
      dummy.rotation.set(0, elapsed * 0.2 + m.phase, 0);
      dummy.updateMatrix();
      waterfalls.mistMesh.setMatrixAt(i, dummy.matrix);
    }
    waterfalls.mistMesh.instanceMatrix.needsUpdate = true;

    const updateDebrisList = (
      seeds: FloatingDebrisSeed[],
      inst: THREE.InstancedMesh,
    ) => {
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        dummy.position.set(
          s.basePos.x,
          s.basePos.y + Math.sin(elapsed * s.bobSpeed + s.phase) * s.bobAmp,
          s.basePos.z,
        );
        dummy.rotation.set(
          s.rot.x + elapsed * 0.06,
          s.rot.y + elapsed * 0.09,
          s.rot.z,
        );
        dummy.scale.copy(s.scale);
        dummy.updateMatrix();
        inst.setMatrixAt(i, dummy.matrix);
      }
      inst.instanceMatrix.needsUpdate = true;
    };

    updateDebrisList(debris.rockSeeds, debris.rockInstanced);
    updateDebrisList(debris.ivorySeeds, debris.ivoryInstanced);
  };

  updateDynamic(0);

  return {
    group,
    update: updateDynamic,
    dispose: () => {
      for (const d of trees.disposables) d.dispose();
      for (const d of waterfalls.disposables) d.dispose();
      waterfalls.waterMaterial.dispose();
      waterfalls.mistMaterial.dispose();
      for (const d of debris.disposables) d.dispose();
      debris.motesMaterial.dispose();
      for (const d of shafts.disposables) d.dispose();
      shafts.material.dispose();
    },
  };
}
