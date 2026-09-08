import { createVoxels } from './voxels.js';
import { createArchitecture } from './architecture.js';
import { createEnvironment } from './environment.js';

export function createWorld() {
  const voxels = createVoxels();
  createEnvironment(voxels);
  const { buildings, plaques } = createArchitecture(voxels);
  const root = voxels.finish();
  root.userData.buildings = buildings;
  root.userData.plaques = plaques;
  return root;
}
