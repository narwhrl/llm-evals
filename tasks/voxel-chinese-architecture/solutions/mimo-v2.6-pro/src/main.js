import { VoxelWorld } from "./voxel.js";
import { createScene } from "./scene.js";
import { LAYOUT, buildCompound } from "./landscape.js";
import {
  buildMainHall,
  buildMountainGate,
  buildSideHall,
  buildTower,
} from "./buildings.js";

const container = document.getElementById("app");
const { scene, renderer, controls, camera } = createScene(container);

const world = new VoxelWorld();
buildCompound(world);
buildMountainGate(world, LAYOUT.gate.cx, LAYOUT.gate.cz);
buildMainHall(world, LAYOUT.mainHall.cx, LAYOUT.mainHall.cz);
buildSideHall(world, LAYOUT.sideWest.cx, LAYOUT.sideWest.cz, 1);
buildSideHall(world, LAYOUT.sideEast.cx, LAYOUT.sideEast.cz, 1);
buildTower(world, LAYOUT.bellTower.cx, LAYOUT.bellTower.cz, "bell");
buildTower(world, LAYOUT.drumTower.cx, LAYOUT.drumTower.cz, "drum");

const model = world.build();
scene.add(model);

// 默认镜头：略偏轴线的低视点，完整呈现山门—庭院—主殿
camera.position.set(38, 40, 138);
controls.target.set(0, 9, -3);
controls.update();

// 供无头截图 / 调试定位相机（不影响渲染结果）
globalThis.__voxelScene = { scene, camera, renderer, controls, world };

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

console.info(`[voxel-chinese-architecture] voxels=${world.count}`);
