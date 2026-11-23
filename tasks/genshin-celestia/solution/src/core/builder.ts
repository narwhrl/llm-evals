import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export type V3 = readonly [number, number, number];

export const ORIGIN: V3 = [0, 0, 0];
export const UPRIGHT: V3 = [0, 0, 0];
export const TAU = Math.PI * 2;

/**
 * Collects many small primitives and merges them into one mesh per material key, so a whole building
 * costs a handful of draw calls. `shade` darkens a part through vertex colour to fake occlusion.
 */
export class GeometryBuilder {
  private readonly parts = new Map<string, THREE.BufferGeometry[]>();
  private frame: THREE.Matrix4 | null = null;
  private readonly matrix = new THREE.Matrix4();
  private readonly euler = new THREE.Euler();

  /** Runs `block` in a local frame: `frame` is its origin and axes in the current frame. */
  within(frame: THREE.Matrix4, block: () => void): this {
    const outer = this.frame;
    this.frame = outer ? new THREE.Matrix4().multiplyMatrices(outer, frame) : frame;
    block();
    this.frame = outer;
    return this;
  }

  /**
   * Adds `geometry` rotated by `rot` (X, Y, Z in radians; applied tilt, roll, then yaw) about its own
   * origin and then moved to `pos`.
   */
  place(key: string, geometry: THREE.BufferGeometry, pos: V3 = ORIGIN, rot: V3 = UPRIGHT, shade = 1): this {
    this.euler.set(rot[0], rot[1], rot[2], 'YZX');
    this.matrix.makeRotationFromEuler(this.euler);
    this.matrix.setPosition(pos[0], pos[1], pos[2]);
    return this.placeMatrix(key, geometry, this.matrix, shade);
  }

  /** Adds `geometry` transformed by an arbitrary local matrix. */
  placeMatrix(key: string, geometry: THREE.BufferGeometry, matrix: THREE.Matrix4, shade = 1): this {
    const part = geometry.index ? geometry.toNonIndexed() : geometry;
    const count = part.getAttribute('position').count;
    if (!part.getAttribute('normal')) part.computeVertexNormals();
    if (!part.getAttribute('uv')) {
      part.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(count * 2), 2));
    }
    for (const name of Object.keys(part.attributes)) {
      if (name !== 'position' && name !== 'normal' && name !== 'uv') part.deleteAttribute(name);
    }

    if (this.frame) this.matrix.multiplyMatrices(this.frame, matrix);
    else this.matrix.copy(matrix);
    part.applyMatrix4(this.matrix);

    const shadeArray = new Float32Array(count * 3).fill(shade);
    part.setAttribute('color', new THREE.BufferAttribute(shadeArray, 3));

    let bucket = this.parts.get(key);
    if (!bucket) {
      bucket = [];
      this.parts.set(key, bucket);
    }
    bucket.push(part);
    return this;
  }

  box(key: string, width: number, height: number, depth: number, pos: V3 = ORIGIN, rot: V3 = UPRIGHT, shade = 1): this {
    return this.place(key, new THREE.BoxGeometry(width, height, depth), pos, rot, shade);
  }

  /** Cylinder standing on `pos`, tapering from `radiusBottom` to `radiusTop`. */
  column(
    key: string,
    radiusTop: number,
    radiusBottom: number,
    height: number,
    segments: number,
    pos: V3 = ORIGIN,
    rot: V3 = UPRIGHT,
    shade = 1,
  ): this {
    const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments);
    geometry.translate(0, height / 2, 0);
    return this.place(key, geometry, pos, rot, shade);
  }

  cone(key: string, radius: number, height: number, segments: number, pos: V3 = ORIGIN, rot: V3 = UPRIGHT, shade = 1): this {
    const geometry = new THREE.ConeGeometry(radius, height, segments);
    geometry.translate(0, height / 2, 0);
    return this.place(key, geometry, pos, rot, shade);
  }

  sphere(key: string, radius: number, pos: V3 = ORIGIN, squash = 1, shade = 1): this {
    const geometry = new THREE.SphereGeometry(radius, 16, 10);
    geometry.scale(1, squash, 1);
    return this.place(key, geometry, pos, UPRIGHT, shade);
  }

  /** Shape in the XY plane, thickened symmetrically along Z. */
  extrude(
    key: string,
    shape: THREE.Shape,
    depth: number,
    pos: V3 = ORIGIN,
    rot: V3 = UPRIGHT,
    shade = 1,
    curveSegments = 12,
  ): this {
    const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments });
    geometry.translate(0, 0, -depth / 2);
    return this.place(key, geometry, pos, rot, shade);
  }

  /** Profile revolved around the Y axis through `pos`. */
  lathe(
    key: string,
    profile: [number, number][],
    segments: number,
    pos: V3 = ORIGIN,
    shade = 1,
    start = 0,
    length = TAU,
  ): this {
    const points = profile.map(([radius, height]) => new THREE.Vector2(radius, height));
    return this.place(key, new THREE.LatheGeometry(points, segments, Math.PI / 2 - start - length / 2, length), pos, UPRIGHT, shade);
  }

  build(materials: Record<string, THREE.Material>): THREE.Group {
    const group = new THREE.Group();
    for (const [key, bucket] of this.parts) {
      const material = materials[key];
      if (!material) throw new Error(`No material named "${key}"`);
      const geometry = bucket.length === 1 ? bucket[0] : mergeGeometries(bucket, false);
      if (!geometry) throw new Error(`Could not merge the "${key}" parts`);
      geometry.computeBoundingSphere();
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
    }
    this.parts.clear();
    return group;
  }
}
