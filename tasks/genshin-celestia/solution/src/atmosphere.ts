import * as THREE from 'three';

const noiseGLSL = /* glsl */ `
  uniform sampler2D atmosphericNoise;
  float fbm(vec2 p) {
    return texture2D(atmosphericNoise, mat2(0.8, -0.6, 0.6, 0.8) * p * 0.0625).r;
  }
`;

function randomGenerator(seed: number) {
  return () => {
    seed = Math.imul(1664525, seed) + 1013904223;
    return (seed >>> 0) / 4294967296;
  };
}

function atmosphericNoiseTexture() {
  const size = 512;
  const values = new Float32Array(size * size);
  const random = randomGenerator(71829);
  for (let octave = 0; octave < 5; octave++) {
    const period = 16 << octave;
    const mask = period - 1;
    const grid = Float32Array.from({ length: period * period }, random);
    const amplitude = 0.5 ** (octave + 1);
    for (let y = 0; y < size; y++) {
      const py = (y + 0.5) * period / size;
      const iy = Math.floor(py);
      const fy = py - iy;
      const ty = fy * fy * (3 - 2 * fy);
      const row0 = (iy & mask) * period, row1 = ((iy + 1) & mask) * period;
      for (let x = 0; x < size; x++) {
        const px = (x + 0.5) * period / size;
        const ix = Math.floor(px);
        const fx = px - ix;
        const tx = fx * fx * (3 - 2 * fx);
        const x0 = ix & mask, x1 = (ix + 1) & mask;
        const top = grid[row0 + x0] * (1 - tx) + grid[row0 + x1] * tx;
        const bottom = grid[row1 + x0] * (1 - tx) + grid[row1 + x1] * tx;
        values[y * size + x] += (top * (1 - ty) + bottom * ty) * amplitude;
      }
    }
  }
  const pixels = Uint8Array.from(values, value => Math.round(value * 255));
  const texture = new THREE.DataTexture(pixels, size, size, THREE.RedFormat);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.LinearFilter;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function cloudTexture(seed: number) {
  const random = randomGenerator(seed);
  const canvas = document.createElement('canvas');
  canvas.width = 384;
  canvas.height = 192;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not create the procedural cloud texture.');
  const pixels = context.createImageData(canvas.width, canvas.height);
  const lobes = Array.from({ length: 17 }, (_, i) => ({
    x: 0.16 + (i / 16) * 0.68,
    y: 0.5 + Math.sin(i * 0.7) * 0.08 + random() * 0.07,
    rx: 0.06 + random() * 0.075,
    ry: 0.13 + random() * 0.16,
  }));
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const u = x / canvas.width, v = y / canvas.height;
      let density = 0, gradientY = 0, gradientX = 0;
      for (const lobe of lobes) {
        const dx = (u - lobe.x) / lobe.rx, dy = (v - lobe.y) / lobe.ry;
        const contribution = Math.exp(-2 * (dx * dx + dy * dy));
        density += contribution;
        gradientX += contribution * -4 * dx / lobe.rx;
        gradientY += contribution * -4 * dy / lobe.ry;
      }
      const micro = Math.sin(x * 0.21 + Math.sin(y * 0.15) * 3) *
        Math.sin(y * 0.19 + Math.sin(x * 0.073) * 4);
      density *= 1 + micro * 0.06;
      const edge = THREE.MathUtils.smoothstep(Math.min(u, 1 - u), 0.012, 0.11) *
        THREE.MathUtils.smoothstep(Math.min(v, 1 - v), 0.012, 0.12);
      const alpha = THREE.MathUtils.smoothstep(density, 0.18, 0.95) * edge;
      const shade = THREE.MathUtils.clamp(0.76 + Math.tanh(gradientY * 0.035) * 0.16 +
        Math.tanh(gradientX * 0.025) * 0.05 + density / (density + 1) * 0.04, 0, 1);
      const i = (y * canvas.width + x) * 4;
      pixels.data[i] = 141 + shade * 114;
      pixels.data[i + 1] = 183 + shade * 70;
      pixels.data[i + 2] = 214 + shade * 37;
      pixels.data[i + 3] = alpha * 238;
    }
  }
  context.putImageData(pixels, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createAtmosphere(): {
  group: THREE.Group;
  update: (elapsed: number, camera: THREE.Camera) => void;
} {
  const group = new THREE.Group();
  group.name = 'The sky above Teyvat';
  const random = randomGenerator(27182);
  const atmosphericNoise = { value: atmosphericNoiseTexture() };
  const skyMaterial = new THREE.ShaderMaterial({
    uniforms: {
      atmosphericNoise,
      zenith: { value: new THREE.Color('#3188d2') },
      horizon: { value: new THREE.Color('#a8d9f0') },
      below: { value: new THREE.Color('#679dbd') },
      sunDirection: { value: new THREE.Vector3(-250, 300, -300).normalize() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDirection;
      void main() {
        vDirection = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vDirection;
      uniform vec3 zenith, horizon, below, sunDirection;
      ${noiseGLSL}
      void main() {
        vec3 ray = normalize(vDirection);
        vec3 sky = mix(horizon, zenith, smoothstep(-0.42, 0.24, ray.y));
        sky = mix(sky, below, (1.0 - smoothstep(-0.92, -0.4, ray.y)) * 0.7);
        float sun = max(dot(ray, sunDirection), 0.0);
        sky += vec3(1.0, 0.79, 0.46) * pow(sun, 22.0) * 0.2;
        sky += vec3(1.0, 0.91, 0.71) * pow(sun, 180.0) * 0.38;
        sky += vec3(1.0, 0.91, 0.71) * smoothstep(0.9993, 0.99975, sun) * 2.5;
        vec2 highUv = ray.xz / max(0.1, ray.y + 0.12);
        float cirrus = fbm(highUv * vec2(1.0, 4.0) + 13.7);
        cirrus = smoothstep(0.59, 0.8, cirrus) * smoothstep(0.05, 0.4, ray.y);
        sky = mix(sky, vec3(0.9, 0.96, 1.0), cirrus * 0.21);
        gl_FragColor = vec4(sky, 1.0);
        #include <colorspace_fragment>
      }
    `,
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    toneMapped: false,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(2200, 48, 24), skyMaterial);
  sky.renderOrder = -1000;
  sky.frustumCulled = false;
  group.add(sky);

  const cloudSheets: THREE.ShaderMaterial[] = [];
  for (let layer = 0; layer < 2; layer++) {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        atmosphericNoise,
        time: { value: 0 },
        layer: { value: layer },
        lightCloud: { value: new THREE.Color('#fff9e8') },
        darkCloud: { value: new THREE.Color('#75a7cf') },
        haze: { value: new THREE.Color('#aed4e9') },
      },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main() {
          vWorld = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * viewMatrix * vec4(vWorld, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        varying vec3 vWorld;
        uniform float time, layer;
        uniform vec3 lightCloud, darkCloud, haze;
        ${noiseGLSL}
        void main() {
          vec2 p = vWorld.xz * 0.0043 + vec2(time * 0.002, layer * 17.7);
          float mass = fbm(p);
          float detail = fbm(p * 3.1 + 8.2);
          float clouds = mass * 0.8 + detail * 0.2;
          float coverage = smoothstep(0.27, 0.6, clouds);
          float light = fbm(p + vec2(-0.055, -0.07));
          float relief = clamp(0.66 + (light - mass) * 7.0 + detail * 0.3, 0.0, 1.0);
          vec3 color = mix(darkCloud, lightCloud, relief);
          float distanceToEye = length(cameraPosition.xz - vWorld.xz);
          color = mix(color, haze, smoothstep(450.0, 2200.0, distanceToEye) * 0.83);
          float alpha = coverage * (0.72 - layer * 0.12);
          alpha *= 1.0 - smoothstep(1600.0, 2900.0, distanceToEye);
          gl_FragColor = vec4(color, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const sheet = new THREE.Mesh(new THREE.PlaneGeometry(7800, 7800), material);
    sheet.rotation.x = -Math.PI / 2;
    sheet.position.y = -148 - layer * 35;
    sheet.renderOrder = -50 + 3 - layer;
    group.add(sheet);
    cloudSheets.push(material);
  }

  const cloudGroups: { group: THREE.Group; x: number }[] = [];
  const cloudMaterials = [17, 247, 847, 3417].map(seed => new THREE.SpriteMaterial({
    map: cloudTexture(seed),
    transparent: true,
    opacity: 0.86,
    depthWrite: false,
    fog: false,
    toneMapped: false,
  }));
  for (let i = 0; i < 66; i++) {
    const angle = random() * Math.PI * 2;
    const distance = i < 52 ? 280 + random() * 1450 : 1450 + random() * 500;
    const bank = new THREE.Group();
    bank.position.set(Math.cos(angle) * distance, -165 - random() * 75 + (i >= 52 ? 65 : 0), Math.sin(angle) * distance);
    const scale = i < 52 ? 145 + random() * 240 : 310 + random() * 330;
    const cloud = new THREE.Sprite(cloudMaterials[i % cloudMaterials.length]);
    cloud.scale.set(scale, scale * ((i < 52 ? 0.3 : 0.23) + random() * 0.12), 1);
    cloud.renderOrder = -30;
    bank.add(cloud);
    group.add(bank);
    cloudGroups.push({ group: bank, x: bank.position.x });
  }

  const terrain = new THREE.PlaneGeometry(2800, 2100, 80, 60);
  terrain.rotateX(-Math.PI / 2);
  const vertices = terrain.getAttribute('position');
  const colors: number[] = [];
  const mountainColor = new THREE.Color();
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i), z = vertices.getZ(i);
    const ridges = Math.sin(x * 0.006 + Math.cos(z * 0.004) * 2) * Math.sin(z * 0.007 - x * 0.002);
    const edge = Math.max(0, 1 - Math.pow(x / 1450, 4) - Math.pow(z / 1100, 4));
    const height = Math.pow(Math.max(0, ridges), 2.7) * 110 * edge;
    vertices.setY(i, height - (1 - edge) * 60);
    mountainColor.set('#598d9e').lerp(new THREE.Color('#a3bbc1'), Math.min(1, height / 120));
    colors.push(mountainColor.r, mountainColor.g, mountainColor.b);
  }
  terrain.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  terrain.computeVertexNormals();
  const continent = new THREE.Mesh(terrain, new THREE.ShaderMaterial({
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vColor;
      void main() {
        vUv = uv;
        vColor = color;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      varying vec3 vColor;
      void main() {
        vec2 edge = min(vUv, 1.0 - vUv);
        float alpha = smoothstep(0.0, 0.24, edge.x) * smoothstep(0.0, 0.24, edge.y);
        gl_FragColor = vec4(vColor, alpha * 0.13);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    fog: false,
  }));
  continent.position.set(-300, -400, -650);
  continent.rotation.y = -0.45;
  continent.renderOrder = -80;
  group.add(continent);

  const shaftMaterial = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform float time;
      void main() {
        float edge = pow(max(0.0, sin(vUv.x * 3.14159265)), 3.0);
        float taper = smoothstep(0.0, 0.2, vUv.y) * (1.0 - smoothstep(0.58, 1.0, vUv.y));
        float shimmer = 0.9 + sin(vUv.y * 14.0 - time * 0.16) * 0.1;
        gl_FragColor = vec4(1.0, 0.88, 0.62, edge * taper * shimmer * 0.032);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const shafts: { mesh: THREE.Mesh; start: THREE.Vector3; end: THREE.Vector3; width: number }[] = [];
  for (let i = 0; i < 4; i++) {
    const start = new THREE.Vector3(-205 + i * 68, 270 + i * 12, -210 + i * 33);
    const end = start.clone().add(new THREE.Vector3(305, -495, 365));
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(12), 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, 1, 0, 0, 1, 1, 1], 2));
    geometry.setIndex([0, 1, 2, 2, 1, 3]);
    const mesh = new THREE.Mesh(geometry, shaftMaterial);
    mesh.frustumCulled = false;
    mesh.renderOrder = 8;
    group.add(mesh);
    shafts.push({ mesh, start, end, width: 12 + i * 5 });
  }

  const sight = new THREE.Vector3(), axis = new THREE.Vector3(), side = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  return {
    group,
    update(elapsed, camera) {
      sky.position.copy(camera.position);
      for (const material of cloudSheets) material.uniforms.time.value = elapsed;
      shaftMaterial.uniforms.time.value = elapsed;
      for (let i = 0; i < cloudGroups.length; i++) {
        cloudGroups[i].group.position.x = cloudGroups[i].x + Math.sin(elapsed * 0.013 + i) * 3;
      }
      for (const shaft of shafts) {
        axis.subVectors(shaft.end, shaft.start).normalize();
        sight.subVectors(camera.position, shaft.start).normalize();
        side.crossVectors(axis, sight).normalize().multiplyScalar(shaft.width);
        const positions = shaft.mesh.geometry.getAttribute('position');
        vertex.copy(shaft.start).sub(side);
        positions.setXYZ(0, vertex.x, vertex.y, vertex.z);
        vertex.copy(shaft.start).add(side);
        positions.setXYZ(1, vertex.x, vertex.y, vertex.z);
        vertex.copy(shaft.end).addScaledVector(side, -1.5);
        positions.setXYZ(2, vertex.x, vertex.y, vertex.z);
        vertex.copy(shaft.end).addScaledVector(side, 1.5);
        positions.setXYZ(3, vertex.x, vertex.y, vertex.z);
        positions.needsUpdate = true;
      }
    },
  };
}
