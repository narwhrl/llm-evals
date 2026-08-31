// Bootstrap: renderer, camera, orbit controls, sky dome, main loop.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { makeMaterials } from './core/materials.js';
import { buildBase } from './world/base.js';
import { buildRegionT } from './world/regionT.js';
import { buildRegionA } from './world/regionA.js';
import { buildRegionMid } from './world/regionMid.js';
import { buildRegionB } from './world/regionB.js';
import { buildRegionCT } from './world/regionCT.js';
import { buildLinks } from './world/links.js';
import { buildLights } from './world/lights.js';
import { buildFX } from './world/fx.js';

const app = document.getElementById('app');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NoToneMapping;
app.appendChild(renderer.domElement);

// Software rasterizers (headless CI, SwiftShader/llvmpipe) get a reduced load
// so the scene stays inspectable; hardware GL gets full quality.
const glInfo = (() => {
  try {
    const gl = renderer.getContext();
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    return String(ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '');
  } catch {
    return '';
  }
})();
const SOFT_GL = /swiftshader|llvmpipe|software/i.test(glInfo);
const QUALITY = SOFT_GL
  ? { shadow: 256, reflect: 256, rain: 600, pixelRatio: 0.5 }
  : { shadow: 2048, reflect: 1024, rain: 2600, pixelRatio: Math.min(window.devicePixelRatio, 2) };
renderer.setPixelRatio(QUALITY.pixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x060a12);
scene.fog = new THREE.FogExp2(0x0a1018, 0.0055);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
camera.position.set(16, 17.5, 46);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, -2);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 10;
controls.maxDistance = 110;
controls.maxPolarAngle = 1.45;
controls.screenSpacePanning = false;
controls.update();

// Gradient sky dome (very dark rainy night; brightens with lightning).
function makeSky() {
  const geo = new THREE.SphereGeometry(180, 24, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      cTop: { value: new THREE.Color(0x0a1220) },
      cBottom: { value: new THREE.Color(0x04060a) },
      uFlash: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 cTop;
      uniform vec3 cBottom;
      uniform float uFlash;
      varying vec3 vPos;
      void main() {
        float h = clamp( normalize( vPos ).y * 0.5 + 0.5, 0.0, 1.0 );
        vec3 col = mix( cBottom, cTop, pow( h, 1.4 ) );
        col += vec3( 0.45, 0.52, 0.7 ) * uFlash * pow( h, 0.8 );
        gl_FragColor = vec4( col, 1.0 );
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const dome = new THREE.Mesh(geo, mat);
  dome.renderOrder = -10;
  return dome;
}
const sky = makeSky();
scene.add(sky);

// Shared context passed to every builder.
const mats = makeMaterials();
const tickers = [];
const ctx = { scene, mats, tickers, renderer, camera, drips: [], steamPoints: [], quality: QUALITY, softGL: SOFT_GL };

const { reflector } = buildBase(ctx);
buildRegionT(ctx);
buildRegionA(ctx);
buildRegionMid(ctx);
buildRegionB(ctx);
buildRegionCT(ctx);
buildLinks(ctx);
const lightRig = buildLights(ctx);
const fx = buildFX(ctx, { sky, rig: lightRig });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.__diorama = { scene, renderer, camera, controls, fx };
let prevMs = performance.now();
let elapsed = 0;
let lastRender = 0;
renderer.setAnimationLoop(() => {
  const nowMs = performance.now();
  const rawDt = (nowMs - prevMs) / 1000;
  prevMs = nowMs;
  // software GL: render sparsely so the page stays responsive for inspection
  if (SOFT_GL && nowMs / 1000 - lastRender < 0.5) return;
  lastRender = nowMs / 1000;
  const dt = Math.min(rawDt, 0.05);
  elapsed += rawDt;
  const t = elapsed;
  controls.update();
  // keep the pan target on the diorama
  controls.target.x = THREE.MathUtils.clamp(controls.target.x, -22, 22);
  controls.target.z = THREE.MathUtils.clamp(controls.target.z, -22, 22);
  controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0, 8);
  for (const fn of tickers) fn(t, dt);
  lightRig.update(t, dt);
  fx.update(t, dt);
  renderer.render(scene, camera);
});
