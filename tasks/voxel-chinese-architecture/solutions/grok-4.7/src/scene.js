import * as THREE from "three";
import { plan, addBuildings } from "./buildings.js";
import { addGrounds } from "./grounds.js";
import { Color } from "./palette.js";
import { VoxelVolume, createMeshes } from "./voxels.js";

// Elevated three-quarter from the south-west. North is +Z, so the gate faces the camera.
const FRAME = {
  fov: 42,
  position: [-24, 80, -112],
  target: [0, 14, 58],
};

function addSky(scene) {
  const geometry = new THREE.SphereGeometry(1200, 32, 20);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x243456) },
      horizonColor: { value: new THREE.Color(0xe39a68) },
      groundColor: { value: new THREE.Color(0x6a4034) },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDir;
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 groundColor;
      void main() {
        float h = normalize(vDir).y;
        vec3 color = mix(horizonColor, topColor, smoothstep(0.0, 0.62, h));
        color = mix(groundColor, color, smoothstep(-0.35, 0.08, h));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
  const sky = new THREE.Mesh(geometry, material);
  sky.frustumCulled = false;
  sky.renderOrder = -1;
  scene.add(sky);
  return sky;
}

function addLights(scene) {
  const sun = new THREE.DirectionalLight(0xffc38a, 3.15);
  sun.position.set(-72, 92, -34);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.bias = -0.00018;
  sun.shadow.normalBias = 0.04;
  const shadow = sun.shadow.camera;
  shadow.left = -180;
  shadow.right = 180;
  shadow.top = 180;
  shadow.bottom = -180;
  shadow.near = 8;
  shadow.far = 380;
  const target = new THREE.Object3D();
  target.position.set(8, 4, 64);
  scene.add(target);
  sun.target = target;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0x9eb6d8, 0.38);
  fill.position.set(54, 36, 90);
  scene.add(fill);
  scene.add(new THREE.HemisphereLight(0x8aa4c8, 0x3c4a30, 0.3));
  scene.add(new THREE.AmbientLight(0xfff1e4, 0.08));
  return { sun, target };
}

function addFarLawn(group, geometry, materials) {
  const grass = materials.find((material) => material.color.getHex() === Color.grass);
  const dirt = materials.find((material) => material.color.getHex() === Color.dirt);
  const x0 = plan.ground.x;
  const x1 = plan.ground.x + plan.ground.w;
  const z0 = plan.ground.z;
  const z1 = plan.ground.z + plan.ground.d;
  const far = 860;
  const skirts = [
    { x: x0, z: -far, w: x1 - x0, d: z0 + far },
    { x: x0, z: z1, w: x1 - x0, d: far - z1 },
    { x: -far, z: -far, w: x0 + far, d: far * 2 },
    { x: x1, z: -far, w: far - x1, d: far * 2 },
  ];
  const dummy = new THREE.Object3D();
  for (const [material, y] of [[dirt, -1], [grass, 0]]) {
    const mesh = new THREE.InstancedMesh(geometry, material, skirts.length);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    skirts.forEach((skirt, index) => {
      dummy.position.set(skirt.x + skirt.w / 2, y + 0.5, skirt.z + skirt.d / 2);
      dummy.scale.set(skirt.w, 1, skirt.d);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    group.add(mesh);
  }
}

export function createVolume() {
  const volume = new VoxelVolume();
  addGrounds(volume);
  addBuildings(volume);
  return volume;
}

export function createCourtyard() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe39a68);
  scene.fog = new THREE.Fog(0xe39a68, 260, 560);

  const camera = new THREE.PerspectiveCamera(FRAME.fov, 1440 / 900, 0.4, 1600);
  camera.position.set(FRAME.position[0], FRAME.position[1], FRAME.position[2]);
  const target = new THREE.Vector3(FRAME.target[0], FRAME.target[1], FRAME.target[2]);
  camera.lookAt(target);

  const sky = addSky(scene);
  const lights = addLights(scene);
  const built = createMeshes(createVolume());
  addFarLawn(built.group, built.geometry, built.materials);
  scene.add(built.group);

  return {
    scene,
    camera,
    target,
    update(elapsed) {
      const pulse = 0.72 + Math.sin(elapsed * 1.35) * 0.28;
      for (const material of built.lanterns) {
        material.emissiveIntensity = material.userData.baseIntensity * pulse;
      }
    },
    dispose() {
      built.geometry.dispose();
      for (const material of built.materials) material.dispose();
      sky.geometry.dispose();
      sky.material.dispose();
      scene.remove(lights.sun);
      scene.remove(lights.target);
      scene.clear();
    },
  };
}
