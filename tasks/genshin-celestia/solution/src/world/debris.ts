import * as THREE from 'three';
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';
import { SimplexNoise, smoothstep } from '../core/noise';
import { applyShaders, atmosphereHook } from '../core/atmosphere';
import { TAU } from '../core/builder';

const ROCK_LIGHT = new THREE.Color(0xb4a48a);
const ROCK_DEEP = new THREE.Color(0x6a6270);
const SOIL = new THREE.Color(0x8a6d4e);
const MEADOW = new THREE.Color(0x74aa42);

interface Piece {
  position: THREE.Vector3;
  scale: THREE.Vector3;
  tilt: THREE.Euler;
  /** Radians per second of slow turning around its vertical axis; ruins do not turn. */
  spin: number;
  /** Phase of its bob, fixed so neighbours do not rise and fall together. */
  phase: number;
}

interface Kind {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  pieces: Piece[];
}

/**
 * Rock with a flat top drawn out to a point underneath, like a splinter knocked off an island.
 * With `meadow` it keeps a cap of turf and soil.
 */
function shard(meadow: boolean, seed: number): THREE.BufferGeometry {
  const noise = new SimplexNoise(seed);
  const geometry = mergeVertices(new THREE.IcosahedronGeometry(1, 2), 1e-3);
  const position = geometry.getAttribute('position');
  const point = new THREE.Vector3();
  for (let i = 0; i < position.count; i++) {
    point.fromBufferAttribute(position, i);
    point.multiplyScalar(1 + 0.26 * noise.noise3(point.x * 1.7 + 3, point.y * 1.7, point.z * 1.7));
    point.y *= point.y < 0 ? 1.9 : 0.55;
    position.setXYZ(i, point.x, point.y, point.z);
  }
  geometry.computeVertexNormals();
  const normal = geometry.getAttribute('normal');
  const color = new THREE.Color();
  const colors = new Float32Array(position.count * 3);
  for (let i = 0; i < position.count; i++) {
    const y = position.getY(i);
    const mottle = 0.86 + 0.28 * (noise.noise3(y * 3.1, 1.7, i * 0.37) * 0.5 + 0.5);
    color.copy(ROCK_DEEP).lerp(ROCK_LIGHT, smoothstep(-1.6, 0.5, y)).multiplyScalar(mottle);
    if (meadow) {
      color.lerp(SOIL, 1 - smoothstep(-0.2, -0.02, y));
      color.lerp(MEADOW, smoothstep(0.45, 0.75, normal.getY(i)) * smoothstep(-0.02, 0.06, y));
    }
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geometry;
}

const TURF_SHARD = 0;
const BARE_SHARD = 1;
export const MASONRY = 2;

export function createDebrisKinds(masonry: THREE.Material): Omit<Kind, 'pieces'>[] {
  const rock = applyShaders(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }), atmosphereHook);
  // The ivory material reads vertex colours, so the blocks must carry a plain white one.
  const block = new THREE.DodecahedronGeometry(1, 0);
  block.setAttribute('color', new THREE.Float32BufferAttribute(new Float32Array(block.getAttribute('position').count * 3).fill(1), 3));
  return [
    { geometry: shard(true, 301), material: rock },
    { geometry: shard(false, 302), material: rock },
    { geometry: block, material: masonry },
  ];
}

/** Loose rock and masonry floating among the islands, each piece bobbing and turning on its own. */
export class FloatingDebris {
  private readonly kinds: Kind[];
  private readonly group = new THREE.Group();
  private readonly matrix = new THREE.Matrix4();
  private readonly quaternion = new THREE.Quaternion();
  private readonly euler = new THREE.Euler();
  private readonly position = new THREE.Vector3();

  constructor(kinds: Omit<Kind, 'pieces'>[]) {
    this.kinds = kinds.map((kind) => ({ ...kind, pieces: [] }));
  }

  /** Scatters shards in a loose shell around a centre, small ones far more common than large. */
  around(centre: THREE.Vector3, radius: number, count: number, random: () => number): void {
    for (let i = 0; i < count; i++) {
      const angle = random() * TAU;
      const reach = radius * (1.15 + random() * 1.2);
      const size = 1.4 + random() * random() * 8;
      const turfy = size > 5 && random() < 0.75;
      this.add(
        turfy ? TURF_SHARD : BARE_SHARD,
        new THREE.Vector3(
          centre.x + Math.cos(angle) * reach,
          centre.y + (random() - 0.62) * radius * 1.5,
          centre.z + Math.sin(angle) * reach,
        ),
        new THREE.Vector3(size * (0.75 + random() * 0.5), size * (0.8 + random() * 0.6), size * (0.75 + random() * 0.5)),
        new THREE.Euler(0, random() * TAU, 0),
        (random() - 0.5) * 0.12,
      );
    }
  }

  /** Chunks hanging exactly where a bridge left them; they only bob. */
  hanging(kind: number, matrices: readonly THREE.Matrix4[]): void {
    const scale = new THREE.Vector3();
    for (const matrix of matrices) {
      matrix.decompose(this.position, this.quaternion, scale);
      this.add(kind, this.position.clone(), scale.clone(), new THREE.Euler().setFromQuaternion(this.quaternion), 0);
    }
  }

  add(kind: number, position: THREE.Vector3, scale: THREE.Vector3, tilt: THREE.Euler, spin: number): void {
    this.kinds[kind].pieces.push({ position, scale, tilt, spin, phase: position.x * 0.37 + position.z * 0.53 + position.y });
  }

  build(): THREE.Group {
    for (const { geometry, material, pieces } of this.kinds) {
      if (pieces.length === 0) continue;
      const mesh = new THREE.InstancedMesh(geometry, material, pieces.length);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.frustumCulled = false;
      this.group.add(mesh);
    }
    this.update(0);
    return this.group;
  }

  update(time: number): void {
    let index = 0;
    for (const { pieces } of this.kinds) {
      if (pieces.length === 0) continue;
      const mesh = this.group.children[index++] as THREE.InstancedMesh;
      for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        const wave = time * 0.45 + piece.phase;
        const bob = Math.sin(wave) * 0.25 * Math.min(piece.scale.x, 9);
        this.position.set(piece.position.x, piece.position.y + bob, piece.position.z);
        this.euler.set(
          piece.tilt.x + Math.sin(wave * 0.6) * 0.1,
          piece.tilt.y + time * piece.spin,
          piece.tilt.z + Math.cos(wave * 0.5) * 0.08,
        );
        this.matrix.compose(this.position, this.quaternion.setFromEuler(this.euler), piece.scale);
        mesh.setMatrixAt(i, this.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
}
