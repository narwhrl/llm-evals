import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createMaterialLibrary } from './materials.js';
import { buildCoreMap } from './regions.js';
import { buildEnvironmentalDetails } from './details.js';
import { createAtmosphere } from './atmosphere.js';

function createMoonLight() {
  const light = new THREE.DirectionalLight(0xa8d6eb, 3.15);
  light.name = 'cold-rain-night-key-light';
  light.position.set(-13, 25, 12);
  light.castShadow = true;
  light.shadow.mapSize.set(1024, 1024);
  light.shadow.camera.left = -24;
  light.shadow.camera.right = 24;
  light.shadow.camera.top = 24;
  light.shadow.camera.bottom = -24;
  light.shadow.camera.near = 1;
  light.shadow.camera.far = 58;
  light.shadow.bias = -0.00035;
  light.shadow.normalBias = 0.025;
  return light;
}

function tacticalLight(color, intensity, distance, position, name) {
  const light = new THREE.PointLight(color, intensity, distance, 1.65);
  light.name = name;
  light.position.set(...position);
  return light;
}

const SHADOW_CASTER = /(?:plinth|wall|roof|platform|container.*shell|truck.*(?:cab|box)|guardhouse|warehouse|central-peek-column|cover-crate|iron-door)-surface$/;

function optimizeStaticScene(root) {
  root.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = SHADOW_CASTER.test(object.name);
    }
    if (object.isSpotLight) object.castShadow = false;
  });
  root.updateMatrixWorld(true);
  root.traverse((object) => {
    object.matrixAutoUpdate = false;
    object.matrixWorldAutoUpdate = false;
  });
}

export function createWorld({ scene, renderer }) {
  const materials = createMaterialLibrary();
  const root = buildCoreMap(materials);
  root.add(buildEnvironmentalDetails(materials));
  root.name = 'cs-pvp-rain-night-diorama';
  root.userData = {
    baseShape: 'square',
    scale: '1:64',
    people: 0,
    coreRegions: ['t-spawn', 'ct-spawn', 'a-site', 'b-site'],
    routes: ['mid', 'left-flank', 'right-elevated-flank'],
  };
  scene.add(root);

  const environmentGenerator = new THREE.PMREMGenerator(renderer);
  const environment = environmentGenerator.fromScene(new RoomEnvironment(), 0.03).texture;
  environmentGenerator.dispose();
  scene.environment = environment;
  scene.environmentIntensity = 0.32;

  const hemisphere = new THREE.HemisphereLight(0x7198ad, 0x071117, 1.45);
  hemisphere.name = 'cold-overcast-hemisphere';
  const ambient = new THREE.AmbientLight(0x315262, 0.58);
  ambient.name = 'blue-industrial-fill';
  const moon = createMoonLight();
  const aLight = tacticalLight(0xbfe9ff, 24, 15, [-11.5, 7, -7.8], 'a-site-cold-emergency-light');
  const bLight = tacticalLight(0xffb75e, 26, 15, [10.7, 6.2, -6.3], 'b-site-warm-street-light');
  const ctRed = tacticalLight(0xff3531, 16, 10, [-1.7, 3.2, 14.1], 'ct-red-police-light');
  const ctBlue = tacticalLight(0x3484ff, 17, 10, [1.5, 3.2, 14.1], 'ct-blue-police-light');
  root.add(hemisphere, ambient, moon, aLight, bLight, ctRed, ctBlue);
  optimizeStaticScene(root);
  const lights = { moon, aLight, bLight, ctRed, ctBlue };
  const atmosphere = createAtmosphere({
    root,
    materials,
    lights,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
  root.add(atmosphere.group);
  atmosphere.group.updateMatrixWorld(true);

  return {
    root,
    materials,
    lights,
    update(elapsed) {
      atmosphere.update(elapsed);
    },
    dispose() {
      scene.environment = null;
      environment.dispose();
      atmosphere.dispose();
      materials.dispose();
    },
  };
}
