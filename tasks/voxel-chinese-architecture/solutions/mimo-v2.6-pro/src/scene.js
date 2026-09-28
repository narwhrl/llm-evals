import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function createSky() {
  const geometry = new THREE.SphereGeometry(360, 32, 16);
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x2a2450) },
      midColor: { value: new THREE.Color(0x8a5a72) },
      bottomColor: { value: new THREE.Color(0xf0a868) },
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition).y;
        float t = clamp(h * 1.15 + 0.15, 0.0, 1.0);
        vec3 col = t < 0.5
          ? mix(bottomColor, midColor, t / 0.5)
          : mix(midColor, topColor, (t - 0.5) / 0.5);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  return mesh;
}

export function createScene(container) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xd08a6a, 140, 340);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.5, 800);
  camera.position.set(38, 40, 138);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  container.appendChild(renderer.domElement);

  scene.add(createSky());

  const hemi = new THREE.HemisphereLight(0x8a7aaa, 0x6a5a48, 1.15);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0x6a6080, 0.7);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffc896, 2.0);
  sun.position.set(-35, 95, 130);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -95;
  sun.shadow.camera.right = 95;
  sun.shadow.camera.top = 95;
  sun.shadow.camera.bottom = -95;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 320;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  scene.add(sun.target);
  sun.target.position.set(0, 0, -8);

  const fill = new THREE.DirectionalLight(0x9aa8d8, 1.15);
  fill.position.set(70, 60, 95);
  scene.add(fill);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 6, -8);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 18;
  controls.maxDistance = 260;
  controls.maxPolarAngle = Math.PI * 0.49;
  controls.update();

  const resize = () => {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
  };
  resize();
  window.addEventListener("resize", resize);

  return { scene, camera, renderer, controls, resize };
}
