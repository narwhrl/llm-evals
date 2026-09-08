import * as THREE from 'three';

const palette = {
  stone: '#c4beaa',
  marble: '#e7e1c9',
  stoneDark: '#868d81',
  paving: '#b6b9a5',
  earth: '#776e54',
  soil: '#4a5140',
  grass: '#849567',
  moss: '#5f7951',
  leaf: '#3f644c',
  leafLight: '#63805a',
  wood: '#50362b',
  red: '#aa4937',
  redLight: '#c36044',
  teal: '#376b62',
  tile: '#376c61',
  tileLight: '#548878',
  gold: '#bd9856',
  dark: '#263d36',
  water: '#689d91',
  ripple: '#aed0b5',
  lotus: '#e3ad94',
  lantern: '#ec9a4a',
};

// One shared cube and one instanced draw per material, not one mesh per voxel.
export function createVoxels() {
  const batches = new Map();
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const root = new THREE.Group();
  root.name = '栖云古院';

  function box(material, x, y, z, w = 1, h = 1, d = 1, rotation = 0) {
    if (!batches.has(material)) batches.set(material, []);
    batches.get(material).push(x, y, z, w, h, d, rotation);
  }

  function painter(x, z, angle = 0) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return (material, px, y, pz, w = 1, h = 1, d = 1) => {
      box(material, x + px * cos + pz * sin, y, z - px * sin + pz * cos, w, h, d, angle);
    };
  }

  function finish() {
    const transform = new THREE.Object3D();
    const tint = new THREE.Color();
    let count = 0;
    for (const [name, data] of batches) {
      const material = new THREE.MeshStandardMaterial({
        color: palette[name],
        roughness: name === 'water' ? 0.35 : name.startsWith('tile') ? 0.6 : 0.95,
        metalness: name === 'gold' ? 0.25 : 0,
        ...(name === 'lantern' ? { emissive: '#ff7018', emissiveIntensity: 0.65 } : {}),
      });
      const mesh = new THREE.InstancedMesh(geometry, material, data.length / 7);
      mesh.name = name;
      mesh.castShadow = !['water', 'ripple', 'grass', 'paving'].includes(name);
      mesh.receiveShadow = true;
      for (let i = 0; i < data.length; i += 7) {
        transform.position.set(data[i], data[i + 1], data[i + 2]);
        transform.scale.set(data[i + 3], data[i + 4], data[i + 5]);
        transform.rotation.set(0, data[i + 6], 0);
        transform.updateMatrix();
        mesh.setMatrixAt(i / 7, transform.matrix);
        // Deterministic, subtle tile-to-tile variation; no image assets or random reloads.
        const hash = Math.sin(data[i] * 12.9898 + data[i + 1] * 39.346 + data[i + 2] * 78.233) * 43758.5453;
        const shade = 0.89 + (hash - Math.floor(hash)) * 0.2;
        tint.setRGB(shade, shade, shade);
        mesh.setColorAt(i / 7, tint);
      }
      mesh.instanceMatrix.needsUpdate = true;
      mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingBox();
      mesh.computeBoundingSphere();
      root.add(mesh);
      count += mesh.count;
    }
    root.userData.voxels = count;
    root.userData.materials = batches.size;
    batches.clear();
    return root;
  }

  return { box, painter, finish };
}
