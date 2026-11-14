import * as THREE from 'three';
import { createCelestiaPalette, SUN_DIRECTION } from '../core/materials';
import { createCentralIsland } from './centralIsland';
import { createCentralSanctum } from './centralSanctum';
import { createNatureAndEffects } from './natureAndEffects';
import { createOuterRing } from './outerRing';
import { createSkyAndWorld } from './skyAndWorld';

export interface CelestiaScene {
  scene: THREE.Scene;
  update: (elapsed: number) => void;
  dispose: () => void;
}

export function createCelestiaScene(): CelestiaScene {
  const scene = new THREE.Scene();

  // Lighting: Genshin Impact high-altitude golden sun + azure sky dome + warm cloud-sea bounce
  const sunLight = new THREE.DirectionalLight('#fff1cf', 3.05);
  sunLight.position.copy(SUN_DIRECTION).multiplyScalar(1450);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -640;
  sunLight.shadow.camera.right = 640;
  sunLight.shadow.camera.top = 620;
  sunLight.shadow.camera.bottom = -560;
  sunLight.shadow.camera.near = 250;
  sunLight.shadow.camera.far = 2850;
  sunLight.shadow.bias = -0.00035;
  sunLight.shadow.normalBias = 0.65;
  scene.add(sunLight);

  const hemiLight = new THREE.HemisphereLight('#7bb3fc', '#ffdfa8', 1.25);
  scene.add(hemiLight);

  const skyBounceFill = new THREE.DirectionalLight('#8cb6f5', 0.58);
  skyBounceFill.position.set(580, 210, -480);
  scene.add(skyBounceFill);

  const palette = createCelestiaPalette();

  // 1. Boundless azure sky, golden solar halo, sea of clouds & distant Teyvat continent below
  const skyAndWorld = createSkyAndWorld();
  scene.add(skyAndWorld.group);

  // World root with subtle 3.2-degree regal celestial poise (signature Celestia floating tilt!)
  const celestiaRoot = new THREE.Group();
  celestiaRoot.name = 'CelestiaArchipelago';
  celestiaRoot.rotation.set(0.035, 0, -0.042);
  scene.add(celestiaRoot);

  // 2. Central irregular floating rock island, emerald meadows & embedded underside ruins
  const centralIsland = createCentralIsland(palette);
  celestiaRoot.add(centralIsland.group);

  // 3. Towering multi-tier ivory Central Sanctum + colossal 6-ring Golden Armillary
  const centralBaseY = centralIsland.getSurfaceY(0, 0);
  const centralSanctum = createCentralSanctum(palette, centralBaseY);
  celestiaRoot.add(centralSanctum.group);

  // Radiant golden point light inside the Armillary core
  const armillaryLight = new THREE.PointLight('#ffd880', 220, 260, 1.35);
  armillaryLight.position.copy(centralSanctum.armillaryCenter);
  celestiaRoot.add(armillaryLight);

  // 4. Outer ring of 8 varied floating islets, curved white viaducts, colonnades, broken bridges & ruined spires
  const outerRing = createOuterRing(palette, centralIsland);
  celestiaRoot.add(outerRing.group);

  // 5. Lush Genshin trees, suspended waterfalls dissolving into mist, floating debris & volumetric sunbeams
  const allTreeSpots = [...centralIsland.treeSpots, ...outerRing.treeSpots];
  const allWaterfalls = [...centralIsland.waterfallAnchors, ...outerRing.waterfallAnchors];
  const natureAndEffects = createNatureAndEffects(
    palette,
    allTreeSpots,
    allWaterfalls,
    outerRing.bridgeDebrisSeeds,
  );
  celestiaRoot.add(natureAndEffects.group);

  return {
    scene,
    update: (elapsed: number) => {
      skyAndWorld.update(elapsed);
      centralSanctum.update(elapsed);
      natureAndEffects.update(elapsed);
    },
    dispose: () => {
      skyAndWorld.dispose();
      centralIsland.dispose();
      centralSanctum.dispose();
      outerRing.dispose();
      natureAndEffects.dispose();
      palette.dispose();
    },
  };
}
