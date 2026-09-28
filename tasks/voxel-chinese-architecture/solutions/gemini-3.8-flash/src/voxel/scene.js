import * as THREE from 'three';
import { VoxelWorld } from './VoxelWorld.js';
import { GroundBuilder } from './builders/GroundBuilder.js';
import { BuildingBuilder } from './builders/BuildingBuilder.js';
import { PagodaBuilder } from './builders/PagodaBuilder.js';
import { DetailBuilder } from './builders/DetailBuilder.js';

/**
 * Orchestrates the full 3D Voxel Chinese Classical Architecture Complex
 * Architectural Ensemble:
 * 1. Mountain Gate (山门殿 / 前殿) - Z = -55
 * 2. East Bell Tower (东钟楼) - X = -32, Z = -26
 * 3. West Drum Tower (西鼓楼) - X = 32, Z = -26
 * 4. Center Incense Burner (九龙青铜大香炉) - X = 0, Z = 0
 * 5. West Side Hall (西配殿) - X = -44, Z = 25
 * 6. East Side Hall (东配殿) - X = 44, Z = 25
 * 7. Grand Main Hall (大雄宝殿) - X = 0, Z = 30
 * 8. Multi-Tier Buddhist Pagoda (千佛宝塔) - X = 40, Z = 60
 * Plus: Symmetrical Lotus Ponds with bridges, imperial avenue, perimeter walls,
 *       moon gates, ancient pines, stone lions, and glowing lanterns!
 */
export function buildChineseVoxelScene() {
  const world = new VoxelWorld();

  // 1. Terrain, Courtyards, Lotus Ponds, Walls, and Landscape
  GroundBuilder.buildGroundAndCourtyard(world);

  // 2. Mountain Gate (山门) at Front Entrance
  BuildingBuilder.buildMountainGate(world, 0, -55);

  // 3. Front Courtyard: East Bell Tower & West Drum Tower
  BuildingBuilder.buildTower(world, -32, -26, true);  // Bell Tower
  BuildingBuilder.buildTower(world, 32, -26, false); // Drum Tower

  // 4. Central Courtyard Grand Bronze Incense Burner
  DetailBuilder.buildIncenseBurner(world, 0, 0);

  // 5. Flanking Side Halls (配殿)
  BuildingBuilder.buildSideHall(world, -44, 25, 1);  // West Wing Hall (facing +X towards center)
  BuildingBuilder.buildSideHall(world, 44, 25, -1); // East Wing Hall (facing -X towards center)

  // 6. Central Axis Grand Main Hall (大雄宝殿)
  BuildingBuilder.buildMainHall(world, 0, 30);

  // 7. Multi-Tier Pagoda (千佛宝塔) in the East Rear Garden
  PagodaBuilder.buildPagoda(world, 40, 60);

  // Build optimized InstancedMesh hierarchy
  const { group, totalVoxels, renderedVoxels } = world.buildMeshGroup();

  // Create subtle warm point lights for key focal points (Incense burner embers, Main Hall lanterns)
  const pointLightsGroup = new THREE.Group();
  pointLightsGroup.name = 'VoxelAtmosphericLights';

  // Warm amber light from center incense burner
  const burnerLight = new THREE.PointLight(0xff6622, 18, 25, 1.2);
  burnerLight.position.set(0, 6, 0);
  pointLightsGroup.add(burnerLight);

  // Warm lanterns under Main Hall front eaves
  const hallLightL = new THREE.PointLight(0xff4422, 12, 20, 1.2);
  hallLightL.position.set(-8, 14, 18);
  pointLightsGroup.add(hallLightL);

  const hallLightR = new THREE.PointLight(0xff4422, 12, 20, 1.2);
  hallLightR.position.set(8, 14, 18);
  pointLightsGroup.add(hallLightR);

  // Lantern light at Mountain Gate
  const gateLight = new THREE.PointLight(0xff4422, 10, 18, 1.2);
  gateLight.position.set(0, 11, -55);
  pointLightsGroup.add(gateLight);

  group.add(pointLightsGroup);

  return {
    world,
    group,
    stats: {
      totalVoxels,
      renderedVoxels,
      cullEfficiency: ((1 - renderedVoxels / totalVoxels) * 100).toFixed(1) + '%',
    },
    pointLights: [burnerLight, hallLightL, hallLightR, gateLight],
  };
}
