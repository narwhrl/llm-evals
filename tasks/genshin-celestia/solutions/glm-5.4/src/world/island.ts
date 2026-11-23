import * as THREE from 'three';
import { SimplexNoise, fbm, smoothstep, wrapAngle } from '../core/noise';
import { applyShaders, atmosphereHook, surfaceDetailHook } from '../core/atmosphere';
import { TAU } from '../core/builder';

/** A hollow in the meadow that fills with water, so its rim can spill into a waterfall. */
export interface Basin {
  angle: number;
  /** Where its centre sits, as a fraction of the distance from the island centre to the cliff edge. */
  reach: number;
  radius: number;
  depth: number;
}

/** A V-shaped cut in the cliff edge, for water to leave the island as a waterfall. */
export interface Notch {
  angle: number;
  /** Angular half-width in radians. */
  width: number;
  depth: number;
}

export interface IslandOptions {
  radius: number;
  depth: number;
  seed: number;
  /** Radius of the level ground in the middle, where buildings stand. */
  flatRadius?: number;
  basins?: readonly Basin[];
  notches?: readonly Notch[];
  /** Multiplier for the meadow colour, so sibling islands do not share one green. */
  meadow?: THREE.ColorRepresentation;
}

export interface Island {
  readonly mesh: THREE.Mesh;
  readonly radius: number;
  readonly depth: number;
  /** Distance from the centre to the cliff edge at `angle`. */
  outline(angle: number): number;
  /** Height of the ground at a local point. */
  heightAt(x: number, z: number): number;
  /** Local-space point on the cliff edge at `angle`. */
  rimPoint(angle: number): THREE.Vector3;
}

export function createTerrainMaterial(detail: THREE.Texture): THREE.MeshStandardMaterial {
  const material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.94, metalness: 0 });
  return applyShaders(material, atmosphereHook, surfaceDetailHook(detail, { scale: 0.5, strength: 0.7, strata: 0.3 }));
}

const MEADOW_LIGHT = new THREE.Color(0x8fbc45);
const MEADOW_DARK = new THREE.Color(0x4f8a30);
const MEADOW_DRY = new THREE.Color(0xb5c058);
const SOIL_LIGHT = new THREE.Color(0x8a6a48);
const SOIL_DARK = new THREE.Color(0x5a4430);
const ROCK_LIGHT = new THREE.Color(0xa89578);
const ROCK_MID = new THREE.Color(0x746657);
const ROCK_DEEP = new THREE.Color(0x514c5e);
const MOSS = new THREE.Color(0x3f7530);

/**
 * A floating island: a gently rolling meadow with an irregular outline that rolls over a lip into a long,
 * ridged inverted mountain. Built as one indexed surface in rings from the top centre to the tip.
 */
export function createIsland(options: IslandOptions, material: THREE.Material): Island {
  const R = options.radius;
  const D = options.depth;
  const noise = new SimplexNoise(options.seed);
  const outlineNoise = new SimplexNoise(options.seed + 101);
  const flatRadius = options.flatRadius ?? 0;
  const basins = options.basins ?? [];
  const notches = options.notches ?? [];
  const elongationAngle = (options.seed * 1.618) % TAU;
  const leanAngle = (options.seed * 2.4) % TAU;
  const rimOut = R * 0.03;

  // Sampled on the unit circle, so both are periodic in the angle and the seam never shows.
  const outline = (angle: number): number => {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const broad = fbm(outlineNoise, c * 1.15 + 5.2, s * 1.15 + 1.3, 0.37, 3);
    const fine = outlineNoise.noise3(c * 3.3 + 9.1, s * 3.3 + 4.7, 2.2);
    return R * (1 + 0.12 * Math.cos(2 * (angle - elongationAngle))) * (1 + 0.2 * broad + 0.06 * fine);
  };

  const basinCentres = basins.map((basin) => {
    const distance = basin.reach * outline(basin.angle);
    return [distance * Math.cos(basin.angle), distance * Math.sin(basin.angle)] as const;
  });

  const heightAt = (x: number, z: number): number => {
    const distance = Math.hypot(x, z);
    const angle = Math.atan2(z, x);
    const edge = distance / outline(angle);
    let height =
      R * 0.032 * fbm(noise, x * 0.028 + 3.1, 0.5, z * 0.028 + 7.7, 3) +
      R * 0.009 * noise.noise3(x * 0.14, 1.9, z * 0.14) +
      R * 0.03 * (1 - Math.min(1, edge * edge));
    if (flatRadius > 0) height *= smoothstep(flatRadius * 0.8, flatRadius * 1.35, distance);
    for (const [index, basin] of basins.entries()) {
      const [cx, cz] = basinCentres[index];
      height -= basin.depth * (1 - smoothstep(0.5, 1, Math.hypot(x - cx, z - cz) / basin.radius));
    }
    for (const notch of notches) {
      const offset = wrapAngle(angle - notch.angle) / notch.width;
      height -= notch.depth * Math.exp(-(offset * offset)) * smoothstep(0.7, 1, edge);
    }
    return height;
  };

  const segments = Math.max(40, Math.round(R * 2));
  const plateauRings = Math.max(8, Math.round(R * 0.36));
  const rimRings = Math.max(3, Math.round(R * 0.08));
  const underRings = Math.max(16, Math.round(R * 0.85));
  const ringCount = 1 + plateauRings + rimRings + underRings + 1;

  const cos = new Float32Array(segments);
  const sin = new Float32Array(segments);
  const edgeAt = new Float32Array(segments);
  const rimAt = new Float32Array(segments);
  const rimDrop = new Float32Array(segments);
  // Where water leaves the island it has worn a chute: the lip and the cliff below it are drawn in.
  const chute = new Float32Array(segments);
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * TAU;
    cos[i] = Math.cos(angle);
    sin[i] = Math.sin(angle);
    edgeAt[i] = outline(angle);
    rimAt[i] = heightAt(edgeAt[i] * cos[i], edgeAt[i] * sin[i]);
    rimDrop[i] = R * 0.07 * (0.8 + 0.25 * noise.noise3(cos[i] * 3.1 + 2.2, 5.5, sin[i] * 3.1 + 8.1));
    for (const notch of notches) {
      const offset = wrapAngle(angle - notch.angle) / notch.width;
      chute[i] = Math.max(chute[i], notch.depth * 2.2 * Math.exp(-(offset * offset)));
    }
  }

  const positions = new Float32Array(ringCount * segments * 3);
  // Rim height for every vertex; colouring is decided by how far below its own rim a vertex sits.
  const rimLevel = new Float32Array(ringCount * segments);
  const put = (ring: number, i: number, x: number, y: number, z: number): void => {
    const v = ring * segments + i;
    positions[v * 3] = x;
    positions[v * 3 + 1] = y;
    positions[v * 3 + 2] = z;
    rimLevel[v] = rimAt[i];
  };

  const centre = heightAt(0, 0);
  for (let i = 0; i < segments; i++) put(0, i, 0, centre, 0);

  // Meadow: rings bunch toward the edge, where the surface starts to curve.
  for (let k = 1; k <= plateauRings; k++) {
    const rho = Math.sin((k / plateauRings) * Math.PI * 0.5);
    for (let i = 0; i < segments; i++) {
      const x = rho * edgeAt[i] * cos[i];
      const z = rho * edgeAt[i] * sin[i];
      put(k, i, x, heightAt(x, z), z);
    }
  }

  // Lip: a quarter round from level ground to a vertical cliff face.
  for (let k = 1; k <= rimRings; k++) {
    const phi = (k / rimRings) * Math.PI * 0.5;
    const ring = 1 + plateauRings + k - 1;
    for (let i = 0; i < segments; i++) {
      const r = edgeAt[i] + (rimOut - chute[i]) * Math.sin(phi);
      put(ring, i, r * cos[i], rimAt[i] - rimDrop[i] * (1 - Math.cos(phi)), r * sin[i]);
    }
  }

  // Underside: steep at first, then tapering to a tip that leans off-centre. Ridged noise carves a few
  // deep buttresses; their amplitude fades out at both the lip and the tip to keep the surface continuous.
  const lean = R * 0.22;
  for (let k = 1; k < underRings; k++) {
    const ring = 1 + plateauRings + rimRings + k - 1;
    const u = (k / underRings) ** 0.85;
    const taper = (1 - u ** 1.6) ** 0.72;
    const taperScale = 1 + 0.08 * Math.sin(Math.PI * u);
    const lobe = Math.sin(Math.PI * Math.min(1, u * 1.15)) ** 0.8;
    const shift = lean * u ** 1.7;
    for (let i = 0; i < segments; i++) {
      const ridge = 1 - Math.abs(fbm(noise, cos[i] * 2.3 + 11.7, u * 1.5 + 3.3, sin[i] * 2.3 + 7.9, 4));
      const crag = fbm(noise, cos[i] * 6.5 + 21.3, u * 5.5 + 13.1, sin[i] * 6.5 + 1.7, 3);
      const r =
        (edgeAt[i] + rimOut) * taper * taperScale * (1 + lobe * (0.38 * (ridge * ridge - 0.45) + 0.14 * crag)) -
        chute[i] * (1 - smoothstep(0.06, 0.5, u));
      const y =
        -rimDrop[i] -
        D * u ** 1.08 +
        D * 0.035 * fbm(noise, cos[i] * 2.9 + 4.4, u * 3.1 + 8.8, sin[i] * 2.9 + 0.9, 2) * (1 - u);
      put(ring, i, r * cos[i] + Math.cos(leanAngle) * shift, y, r * sin[i] + Math.sin(leanAngle) * shift);
    }
  }
  for (let i = 0; i < segments; i++) {
    put(ringCount - 1, i, Math.cos(leanAngle) * lean, -rimDrop[i] - D, Math.sin(leanAngle) * lean);
  }

  // Each band between two rings is a strip of quads. Both triangles wind so the normal faces outward;
  // the strips next to a pole only keep the one triangle that is not degenerate.
  const indices = new Uint32Array(((ringCount - 1) * 6 - 6) * segments);
  let cursor = 0;
  for (let k = 0; k < ringCount - 1; k++) {
    const upper = k * segments;
    const lower = upper + segments;
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments;
      if (k < ringCount - 2) {
        indices[cursor++] = upper + i;
        indices[cursor++] = lower + next;
        indices[cursor++] = lower + i;
      }
      if (k > 0) {
        indices[cursor++] = upper + i;
        indices[cursor++] = upper + next;
        indices[cursor++] = lower + next;
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  const normals = geometry.getAttribute('normal');

  // Surface colour from the top down: meadow, a band of soil, moss that hangs below the lip, then rock
  // that turns from sun-warmed stone to cool shadow toward the tip.
  const colors = new Float32Array(ringCount * segments * 3);
  const rock = new THREE.Color();
  const cover = new THREE.Color();
  const meadow = new THREE.Color(options.meadow ?? 0xffffff);
  for (let v = 0; v < ringCount * segments; v++) {
    const x = positions[v * 3];
    const y = positions[v * 3 + 1];
    const z = positions[v * 3 + 2];
    const below = rimLevel[v] - y;
    const patch = fbm(noise, x * 0.045 + 31.7, 7.3, z * 0.045 + 12.9, 3) * 0.5 + 0.5;
    const grain = noise.noise3(x * 0.21 + 3.3, 2.2, z * 0.21 + 8.8) * 0.5 + 0.5;
    const fringe = noise.noise3(x * 0.09 + 13.3, 5.1, z * 0.09 + 2.8) * 0.5 + 0.5;

    rock
      .copy(ROCK_LIGHT)
      .lerp(ROCK_MID, smoothstep(0, D * 0.3, below))
      .lerp(ROCK_DEEP, smoothstep(D * 0.25, D * 0.95, below))
      .multiplyScalar(0.86 + 0.28 * patch);

    cover.copy(SOIL_LIGHT).lerp(SOIL_DARK, grain);
    rock.lerp(cover, 1 - smoothstep(0.02 * R, 0.11 * R, below + (patch - 0.5) * 0.04 * R));

    const moss =
      (1 - smoothstep(0.03 * R, 0.2 * R, below + (fringe - 0.5) * 0.16 * R)) * smoothstep(-0.01 * R, 0.03 * R, below);
    rock.lerp(MOSS, moss * 0.8);

    cover
      .copy(MEADOW_DARK)
      .lerp(MEADOW_LIGHT, patch)
      .lerp(MEADOW_DRY, smoothstep(0.6, 0.85, grain) * 0.55)
      .multiply(meadow);
    const grass =
      smoothstep(0.72, 0.9, normals.getY(v)) * (1 - smoothstep(0.012 * R, 0.05 * R, below + (grain - 0.5) * 0.02 * R));
    rock.lerp(cover, grass);

    colors[v * 3] = rock.r;
    colors[v * 3 + 1] = rock.g;
    colors[v * 3 + 2] = rock.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  const rimPoint = (angle: number): THREE.Vector3 => {
    const r = outline(angle);
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    return new THREE.Vector3(x, heightAt(x, z), z);
  };

  return { mesh, radius: R, depth: D, outline, heightAt, rimPoint };
}
