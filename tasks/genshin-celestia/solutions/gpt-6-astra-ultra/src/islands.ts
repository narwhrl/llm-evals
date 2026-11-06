import * as THREE from 'three';

const TAU = Math.PI * 2;

function random(seed: number) {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function outline(angle: number, seed: number) {
  return 1 + Math.sin(angle * 3 + seed) * 0.11
    + Math.sin(angle * 7 - seed * 2) * 0.065
    + Math.cos(angle * 11 + seed) * 0.035;
}

type Island = { x: number; z: number; y: number; rx: number; rz: number; depth: number; seed: number };

export function createIslands(): { group: THREE.Group; update: (elapsed: number) => void } {
  const group = new THREE.Group();
  group.name = 'Floating land and falling water';
  const rockMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95, flatShading: true });
  const grassMaterial = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.98, flatShading: true });
  const stoneColor = new THREE.Color();
  const position = new THREE.Vector3();
  const rotation = new THREE.Euler();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const matrix = new THREE.Matrix4();
  const islands: Island[] = [{ x: 0, z: 0, y: 1.2, rx: 58, rz: 49, depth: 102, seed: 2.1 }];
  for (let i = 0; i < 8; i++) {
    const angle = i * TAU / 8 + 0.12;
    const radius = 15 + random(i + 22) * 7;
    islands.push({
      x: Math.cos(angle) * 110,
      z: Math.sin(angle) * 110,
      y: 2 + Math.sin(angle * 2) * 5,
      rx: radius,
      rz: radius * (0.78 + random(i + 71) * 0.25),
      depth: 27 + random(i + 60) * 22,
      seed: i * 2.3 + 5,
    });
  }

  function makeLand(island: Island) {
    const { x, z, y, rx, rz, depth, seed } = island;
    const central = rx > 40;
    const segments = central ? 58 : 32;
    const levels = [0, 0.035, 0.15, 0.34, 0.57, 0.79, 1];
    const shoulder = random(seed * 13);
    const widths = central
      ? [1, 1.025, 0.99, 0.94, 0.76, 0.43, 0.025]
      : [1, 1.025, 0.94, 0.75 + shoulder * 0.16, 0.44 + shoulder * 0.22, 0.18 + shoulder * 0.2, 0.018];
    const vertices: THREE.Vector3[][] = [];
    for (let level = 0; level < levels.length; level++) {
      const ring: THREE.Vector3[] = [];
      for (let j = 0; j < segments; j++) {
        const a = j / segments * TAU;
        const irregular = outline(a, seed);
        const ridge = 1 + (random(j * 9 + seed) - 0.5) * 0.24;
        const t = levels[level];
        const asymmetry = 1 + t * (Math.sin(a * 2 + seed) * 0.19 + Math.cos(a * 5 - seed) * 0.08);
        const radius = irregular * widths[level] * (level > 1 ? ridge * asymmetry : 1);
        const offset = level > 1 ? (random(j + level * 91 + seed) - 0.5) * depth * 0.065 + Math.sin(a * 3 + seed) * t * depth * 0.045 : 0;
        ring.push(new THREE.Vector3(
          x + Math.cos(a) * rx * radius + t * t * rx * (central ? 0.24 : Math.sin(seed) * 0.3),
          y - t * depth + offset,
          z + Math.sin(a) * rz * radius + t * t * rz * (central ? -0.27 : Math.cos(seed) * 0.28),
        ));
      }
      vertices.push(ring);
    }
    const positions: number[] = [];
    const colors: number[] = [];
    function rockTriangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, level: number, index: number) {
      const variation = random(index * 11 + level * 73 + seed);
      stoneColor.setHSL(0.56 + variation * 0.035, 0.12 + variation * 0.07, 0.31 + variation * 0.13 - level * 0.016);
      if (level === 0) stoneColor.setHSL(0.16, 0.16, 0.5 + variation * 0.12);
      for (const p of [a, b, c]) {
        positions.push(p.x, p.y, p.z);
        colors.push(stoneColor.r, stoneColor.g, stoneColor.b);
      }
    }
    for (let l = 0; l < levels.length - 1; l++) {
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        rockTriangle(vertices[l][j], vertices[l][next], vertices[l + 1][j], l, j);
        rockTriangle(vertices[l][next], vertices[l + 1][next], vertices[l + 1][j], l, j + 20);
      }
    }
    const rockGeometry = new THREE.BufferGeometry();
    rockGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    rockGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    rockGeometry.computeVertexNormals();
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.castShadow = true;
    rock.receiveShadow = true;
    group.add(rock);

    const grassPositions: number[] = [];
    const grassColors: number[] = [];
    const grassRings = 5;
    const topRings: THREE.Vector3[][] = [];
    for (let r = 0; r <= grassRings; r++) {
      const ring: THREE.Vector3[] = [];
      const distance = r / grassRings;
      for (let j = 0; j < segments; j++) {
        const angle = j / segments * TAU;
        const radius = outline(angle, seed) * distance;
        ring.push(new THREE.Vector3(
          x + Math.cos(angle) * rx * radius,
          y + 0.18 + Math.sin(distance * Math.PI) * (distance < 0.5 ? 0 : random(j + seed * 20) * 1.7),
          z + Math.sin(angle) * rz * radius,
        ));
      }
      topRings.push(ring);
    }
    function grassTriangle(a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, j: number, r: number) {
      const v = random(seed + j * 7 + r * 24);
      stoneColor.setHSL(0.27 + v * 0.035, 0.38 + v * 0.12, 0.30 + v * 0.1);
      for (const p of [a, b, c]) {
        grassPositions.push(p.x, p.y, p.z);
        grassColors.push(stoneColor.r, stoneColor.g, stoneColor.b);
      }
    }
    for (let r = 0; r < grassRings; r++) {
      for (let j = 0; j < segments; j++) {
        const next = (j + 1) % segments;
        grassTriangle(topRings[r][j], topRings[r][next], topRings[r + 1][j], j, r);
        grassTriangle(topRings[r][next], topRings[r + 1][next], topRings[r + 1][j], j + 17, r);
      }
    }
    const grassGeometry = new THREE.BufferGeometry();
    grassGeometry.setAttribute('position', new THREE.Float32BufferAttribute(grassPositions, 3));
    grassGeometry.setAttribute('color', new THREE.Float32BufferAttribute(grassColors, 3));
    grassGeometry.computeVertexNormals();
    const grass = new THREE.Mesh(grassGeometry, grassMaterial);
    grass.receiveShadow = true;
    group.add(grass);
  }
  islands.forEach(makeLand);

  const shardGeometry = new THREE.DodecahedronGeometry(1, 0);
  const shardMaterial = new THREE.MeshStandardMaterial({ color: '#c6c9c7', roughness: 0.98, flatShading: true });
  const ridges: { island: Island; angle: number; length: number; width: number; offset: number }[] = [];
  for (const island of islands) {
    const count = island.rx > 40 ? 40 : 11;
    for (let j = 0; j < count; j++) {
      ridges.push({
        island, angle: j / count * TAU,
        length: island.depth * (0.15 + random(j * 4 + island.seed) * 0.21),
        width: island.rx * (0.04 + random(j + island.seed * 4) * 0.035),
        offset: random(j * 71 + island.seed),
      });
    }
  }
  const ridgeMesh = new THREE.InstancedMesh(shardGeometry, shardMaterial, ridges.length);
  ridges.forEach(({ island, angle, length, width, offset }, i) => {
    const r = (0.62 + offset * 0.26) * outline(angle, island.seed);
    position.set(island.x + Math.cos(angle) * island.rx * r, island.y - length * 0.9 - offset * island.depth * 0.13, island.z + Math.sin(angle) * island.rz * r);
    quaternion.setFromEuler(rotation.set(0.06 * Math.sin(angle), angle, 0.08 * Math.cos(angle)));
    matrix.compose(position, quaternion, scale.set(width, length, width * 1.2));
    ridgeMesh.setMatrixAt(i, matrix);
    ridgeMesh.setColorAt(i, stoneColor.setHSL(0.55 + random(i) * 0.03, 0.1, 0.43 + random(i + 14) * 0.13));
  });
  ridgeMesh.castShadow = true;
  ridgeMesh.receiveShadow = true;
  group.add(ridgeMesh);

  const treeLocations: { x: number; y: number; z: number; height: number; seed: number }[] = [];
  for (const island of islands) {
    const count = island.rx > 40 ? 52 : 9;
    for (let j = 0; j < count; j++) {
      const a = random(j * 4.1 + island.seed * 37) * TAU;
      const r = 0.53 + random(j * 6.7 + island.seed) * 0.3;
      treeLocations.push({
        x: island.x + Math.cos(a) * island.rx * r,
        z: island.z + Math.sin(a) * island.rz * r,
        y: island.y + 0.4,
        height: (island.rx > 40 ? 3.4 : 2.5) + random(j * 81 + island.seed) * 5.5,
        seed: j + island.seed * 23,
      });
    }
  }
  const trunks = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.45, 0.7, 1, 5),
    new THREE.MeshStandardMaterial({ color: '#676650', roughness: 1 }),
    treeLocations.length,
  );
  const leaves = new THREE.InstancedMesh(
    new THREE.ConeGeometry(1, 1, 7, 1),
    new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.94, flatShading: true }),
    treeLocations.length * 3,
  );
  treeLocations.forEach((tree, i) => {
    position.set(tree.x, tree.y + tree.height * 0.25, tree.z);
    quaternion.identity();
    matrix.compose(position, quaternion, scale.set(tree.height * 0.08, tree.height * 0.5, tree.height * 0.08));
    trunks.setMatrixAt(i, matrix);
    for (let layer = 0; layer < 3; layer++) {
      position.set(tree.x + Math.sin(tree.seed) * layer * 0.08, tree.y + tree.height * (0.39 + layer * 0.22), tree.z);
      quaternion.setFromEuler(rotation.set(0, tree.seed + layer, 0.025 * Math.sin(tree.seed)));
      const width = tree.height * (0.29 - layer * 0.065);
      matrix.compose(position, quaternion, scale.set(width, tree.height * (0.62 - layer * 0.07), width * 0.85));
      leaves.setMatrixAt(i * 3 + layer, matrix);
      leaves.setColorAt(i * 3 + layer, stoneColor.setHSL(0.33 + random(tree.seed) * 0.06, 0.33, 0.23 + random(tree.seed + layer * 12) * 0.1));
    }
  });
  trunks.castShadow = true;
  leaves.castShadow = true;
  leaves.receiveShadow = true;
  group.add(trunks, leaves);

  const fragments = new THREE.InstancedMesh(shardGeometry, shardMaterial, 75);
  for (let i = 0; i < fragments.count; i++) {
    const a = random(i * 17 + 5) * TAU;
    const radius = 43 + random(i * 7) * 93;
    const size = 0.6 + random(i + 33) * 2.6;
    position.set(Math.cos(a) * radius, -20 - random(i * 2 + 61) * 85, Math.sin(a) * radius);
    quaternion.setFromEuler(rotation.set(random(i) * 3, random(i + 1) * 3, random(i + 2) * 3));
    matrix.compose(position, quaternion, scale.set(size, size * (1.4 + random(i + 7)), size * 0.8));
    fragments.setMatrixAt(i, matrix);
    fragments.setColorAt(i, stoneColor.setHSL(0.55, 0.12, 0.36 + random(i + 8) * 0.17));
  }
  fragments.castShadow = true;
  group.add(fragments);

  const waterUniforms = { uTime: { value: 0 } };
  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: waterUniforms,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      #include <fog_pars_vertex>
      void main() {
        vUv = uv;
        vec3 p = position;
        p.x += sin(uv.y * 22.0 + uTime * 1.3) * (1.0 - uv.y) * 0.24;
        vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      #include <fog_pars_fragment>
      void main() {
        float strands = sin(vUv.x * 58.0 + sin(vUv.y * 16.0 - uTime * 1.5) * 1.7);
        float streak = pow(max(0.0, strands), 9.0);
        float flow = sin(vUv.y * 93.0 + uTime * 8.0 + vUv.x * 29.0) * 0.5 + 0.5;
        float edge = pow(max(0.0, sin(vUv.x * 3.14159265)), 0.45);
        float tail = smoothstep(0.0, 0.32, vUv.y);
        float alpha = edge * tail * (0.52 + streak * 0.4 + flow * 0.07);
        vec3 color = mix(vec3(0.45, 0.79, 0.88), vec3(0.91, 1.0, 0.98), 0.25 + streak * 0.75);
        gl_FragColor = vec4(color, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }
    `,
    fog: true,
  });
  waterMaterial.uniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.fog, waterUniforms]);
  const mistPositions: number[] = [];
  function waterfall(island: Island, angle: number, width: number, length: number) {
    const radius = outline(angle, island.seed);
    const x = island.x + Math.cos(angle) * island.rx * radius;
    const z = island.z + Math.sin(angle) * island.rz * radius;
    const geometry = new THREE.PlaneGeometry(width, length, 10, 32);
    const attribute = geometry.attributes.position;
    for (let i = 0; i < attribute.count; i++) {
      const descent = length / 2 - attribute.getY(i);
      const t = descent / length;
      const widening = 1 + t * 0.65;
      attribute.setXYZ(i, attribute.getX(i) * widening, -descent, 0.4 + Math.sin(t * Math.PI * 0.5) * 4 + t * t * 5);
    }
    geometry.computeVertexNormals();
    const fallingWater = new THREE.Mesh(geometry, waterMaterial);
    fallingWater.position.set(x, island.y + 0.45, z);
    fallingWater.rotation.y = Math.PI / 2 - angle;
    group.add(fallingWater);
    const riverGeometry = new THREE.PlaneGeometry(width * 0.95, 8, 4, 4);
    const river = new THREE.Mesh(riverGeometry, new THREE.MeshStandardMaterial({ color: '#8bc9bd', roughness: 0.25, metalness: 0.1, transparent: true, opacity: 0.78, side: THREE.DoubleSide }));
    river.rotation.set(-Math.PI / 2, 0, angle - Math.PI / 2);
    river.position.set(x - Math.cos(angle) * 3.8, island.y + 0.3, z - Math.sin(angle) * 3.8);
    group.add(river);
    for (let i = 0; i < 14; i++) {
      const t = random(i + x);
      mistPositions.push(x + Math.cos(angle) * (5 + t * 4) + (random(i * 5 + z) - 0.5) * width * 3, island.y - length * (0.7 + t * 0.3), z + Math.sin(angle) * (5 + t * 4) + (random(i * 9 + z) - 0.5) * width * 3);
    }
  }
  waterfall(islands[0], 0.72, 4.5, 105);
  waterfall(islands[0], 1.65, 2.8, 83);
  waterfall(islands[0], 3.35, 3.2, 82);
  waterfall(islands[1], 0.5, 2.6, 63);
  waterfall(islands[3], 1.8, 2.4, 59);
  waterfall(islands[6], 3.6, 2, 66);

  const mistSize = 32;
  const mistData = new Uint8Array(mistSize * mistSize * 4);
  for (let y = 0; y < mistSize; y++) {
    for (let x = 0; x < mistSize; x++) {
      const r = Math.hypot((x + 0.5) / mistSize * 2 - 1, (y + 0.5) / mistSize * 2 - 1);
      const index = (y * mistSize + x) * 4;
      mistData[index] = 210;
      mistData[index + 1] = 242;
      mistData[index + 2] = 246;
      mistData[index + 3] = Math.round(Math.max(0, 1 - r) ** 2 * 48);
    }
  }
  const mistTexture = new THREE.DataTexture(mistData, mistSize, mistSize);
  mistTexture.needsUpdate = true;
  const mistGeometry = new THREE.BufferGeometry();
  mistGeometry.setAttribute('position', new THREE.Float32BufferAttribute(mistPositions, 3));
  const mist = new THREE.Points(mistGeometry, new THREE.PointsMaterial({ color: '#e1ffff', map: mistTexture, size: 9, transparent: true, opacity: 0.65, depthWrite: false, sizeAttenuation: true }));
  group.add(mist);

  return {
    group,
    update(elapsed: number) {
      waterMaterial.uniforms.uTime.value = elapsed;
      mist.position.x = Math.sin(elapsed * 0.12) * 0.8;
      mist.position.z = Math.cos(elapsed * 0.09) * 0.6;
    },
  };
}
