import * as THREE from 'three';
import { mesh, palette, seededRandom } from './palette';

function createSky(scene: THREE.Scene): void {
  const sky = new THREE.Mesh(new THREE.SphereGeometry(3000, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      zenith: { value: new THREE.Color('#4b94c2') },
      horizon: { value: new THREE.Color('#d0e5e8') },
      lower: { value: new THREE.Color('#7aa9c0') },
    },
    vertexShader: `varying vec3 vWorld; void main() { vWorld = (modelMatrix * vec4(position, 1.0)).xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec3 vWorld;
      uniform vec3 zenith;
      uniform vec3 horizon;
      uniform vec3 lower;
      void main() {
        float h = normalize(vWorld).y;
        vec3 c = h > 0.0 ? mix(horizon, zenith, pow(h, 0.65)) : mix(horizon, lower, min(1.0, -h * 2.0));
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  }));
  scene.add(sky);
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  gradient.addColorStop(0, 'rgba(255,248,213,1)');
  gradient.addColorStop(0.08, 'rgba(255,246,214,0.95)');
  gradient.addColorStop(0.24, 'rgba(255,232,183,0.35)');
  gradient.addColorStop(1, 'rgba(255,220,170,0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, 128, 128);
  const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  sun.position.set(-620, 450, -850);
  sun.scale.set(400, 400, 1);
  scene.add(sun);
}

function createCloudSea(scene: THREE.Scene): void {
  const random = seededRandom(82748);
  const cloudMaterial = new THREE.MeshLambertMaterial({ color: '#f1f3e9', transparent: true, opacity: 0.62, depthWrite: false, flatShading: false });
  const cloudGeometry = new THREE.IcosahedronGeometry(1, 2);
  const clouds = new THREE.InstancedMesh(cloudGeometry, cloudMaterial, 560);
  const dummy = new THREE.Object3D();
  const color = new THREE.Color();
  for (let i = 0; i < 560; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 270 + Math.pow(random(), 0.6) * 1600;
    const size = 24 + random() * 75;
    dummy.position.set(Math.cos(angle) * radius, -190 - random() * 115, Math.sin(angle) * radius);
    dummy.scale.set(size * (1.3 + random()), size * (0.32 + random() * 0.22), size * (1 + random()));
    dummy.rotation.set(0, random() * Math.PI, 0);
    dummy.updateMatrix();
    clouds.setMatrixAt(i, dummy.matrix);
    color.setHSL(0.54 + random() * 0.03, 0.12 + random() * 0.10, 0.83 + random() * 0.14);
    clouds.setColorAt(i, color);
  }
  clouds.renderOrder = -1;
  scene.add(clouds);
  const highClouds = new THREE.InstancedMesh(cloudGeometry, new THREE.MeshLambertMaterial({ color: '#edf5f1', transparent: true, opacity: 0.15, depthWrite: false }), 12);
  for (let i = 0; i < 12; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 800 + random() * 1200;
    dummy.position.set(Math.cos(angle) * radius, 110 + random() * 150, -650 - random() * 800);
    dummy.scale.set(130 + random() * 170, 8 + random() * 16, 50 + random() * 90);
    dummy.updateMatrix();
    highClouds.setMatrixAt(i, dummy.matrix);
  }
  scene.add(highClouds);
}

function createDistantWorld(scene: THREE.Scene): void {
  const world = new THREE.Group();
  world.position.set(-90, -330, -690);
  const shape = new THREE.Shape();
  shape.moveTo(-440, -100);
  const points = [[-410, 40], [-320, 120], [-230, 130], [-140, 190], [-20, 160], [90, 210], [180, 145], [290, 160], [410, 70], [460, -60], [300, -150], [140, -170], [-10, -130], [-180, -190], [-340, -150]];
  points.forEach(([x, y]) => shape.lineTo(x, y));
  shape.closePath();
  const continent = mesh(new THREE.ExtrudeGeometry(shape, { depth: 17, bevelEnabled: false }), new THREE.MeshLambertMaterial({ color: '#779b94' }));
  continent.rotation.x = -Math.PI / 2;
  world.add(continent);
  const random = seededRandom(5236);
  for (let i = 0; i < 45; i++) {
    const mountain = mesh(new THREE.ConeGeometry(12 + random() * 28, 25 + random() * 75, 5), palette.distantRock);
    mountain.position.set((random() - 0.5) * 690, 30, (random() - 0.5) * 220);
    world.add(mountain);
  }
  scene.add(world);
  for (let i = 0; i < 14; i++) {
    const angle = i * 2.4;
    const radius = 430 + (i % 5) * 115;
    const distant = mesh(new THREE.ConeGeometry(18 + (i % 3) * 9, 90 + (i % 4) * 35, 7), palette.distantRock);
    distant.rotation.z = Math.PI;
    distant.position.set(Math.cos(angle) * radius, -190 - (i % 4) * 24, Math.sin(angle) * radius - 170);
    scene.add(distant);
  }
}

function createLightShafts(scene: THREE.Scene): void {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { tint: { value: new THREE.Color('#ffe5b0') } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 tint;
      void main() {
        float edge = pow(sin(vUv.x * 3.14159265), 2.0);
        float fade = smoothstep(0.0, 0.24, vUv.y) * smoothstep(0.0, 0.35, 1.0 - vUv.y);
        gl_FragColor = vec4(tint, edge * fade * 0.032);
      }
    `,
  });
  for (let i = 0; i < 7; i++) {
    const shaft = new THREE.Mesh(new THREE.ConeGeometry(23 + i * 3, 440, 24, 1, true), material);
    shaft.position.set(-180 + i * 49, 136, -150 - i * 30);
    shaft.rotation.z = -0.27;
    shaft.renderOrder = 3;
    scene.add(shaft);
  }
}

function createMotes(scene: THREE.Scene): THREE.Points {
  const random = seededRandom(947);
  const positions: number[] = [];
  for (let i = 0; i < 240; i++) {
    const angle = random() * Math.PI * 2;
    const radius = 45 + random() * 145;
    positions.push(Math.cos(angle) * radius, -35 + random() * 135, Math.sin(angle) * radius);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const motes = new THREE.Points(geometry, new THREE.PointsMaterial({ color: '#fff0c3', size: 0.42, transparent: true, opacity: 0.52, depthWrite: false, sizeAttenuation: true }));
  scene.add(motes);
  return motes;
}

export function createAtmosphere(scene: THREE.Scene): (time: number) => void {
  createSky(scene);
  createCloudSea(scene);
  createDistantWorld(scene);
  createLightShafts(scene);
  const motes = createMotes(scene);
  return (time: number) => { motes.rotation.y = time * 0.003; };
}
