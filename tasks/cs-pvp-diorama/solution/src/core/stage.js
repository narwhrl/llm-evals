// 渲染器与场景舞台：分层约定、雾与相机初始取景。
import * as THREE from 'three';

// 渲染层：不同 pass 用不同掩码，避免特效进入描边、地面反射自身、贴花干扰描边取样。
export const LAYER = { WORLD: 0, FX: 1, GROUND: 2, DECAL: 3 };
export const LAYER_MASK = {
  all: (1 << LAYER.WORLD) | (1 << LAYER.FX) | (1 << LAYER.GROUND) | (1 << LAYER.DECAL),
  normal: (1 << LAYER.WORLD) | (1 << LAYER.GROUND),
  reflection: (1 << LAYER.WORLD) | (1 << LAYER.FX) | (1 << LAYER.DECAL),
};

export const BASE_SIZE = 64;
export const BASE_HALF = BASE_SIZE / 2;
export const BASE_SLAB = 2.4;

export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    stencil: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.info.autoReset = false;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080c12);
  scene.fog = new THREE.FogExp2(0x121c26, 0.0062);

  const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.5, 320);
  camera.position.set(52, 47, 60);
  camera.layers.mask = LAYER_MASK.all;
  camera.updateMatrixWorld();

  return { renderer, scene, camera };
}

export const VIEWS = {
  overview: { position: [52, 47, 60], target: [0, 1, -1] },
  tSpawn: { position: [-4, 16, 6], target: [-6, 1.5, -25] },
  aSite: { position: [8, 17, 10], target: [-21, 1.6, -12] },
  aSiteBay: { position: [-16.6, 1.8, -7.4], target: [-21.2, 0.55, -11.9] },
  mid: { position: [1, 30, 34], target: [0, 0.6, -4] },
  midDoor: { position: [0.2, 2.4, 4], target: [0.1, 1.3, -6.5] },
  bSite: { position: [4, 16, 8], target: [21, 1.8, -16] },
  bSiteYard: { position: [12.8, 2.0, -4.6], target: [19.6, 0.5, -8.6] },
  ctSpawn: { position: [-2, 17, 4], target: [-2, 1.6, 26] },
  elevated: { position: [30, 14, 12], target: [12, 1.5, -4] },
  lowAngle: { position: [10, 2.2, 14], target: [-6, 1.2, -8] },
  routeLeft: { position: [-30.2, 4.5, 2], target: [-30.2, 1.2, -18] },
  routeRight: { position: [24, 12, 20], target: [24, 1.4, -2] },
  sewer: { position: [-6.6, 0.9, 14.2], target: [-6.6, 0.7, -14] },
};
