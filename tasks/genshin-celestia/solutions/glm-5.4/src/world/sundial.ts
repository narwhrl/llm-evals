import * as THREE from 'three';
import { GeometryBuilder, ORIGIN, type V3 } from '../core/builder';
import { GOLD } from './stonework';

const UP = new THREE.Vector3(0, 1, 0);
const DEG = Math.PI / 180;

export interface Sundial {
  readonly object: THREE.Group;
  update(time: number): void;
}

/** Gold rod with its foot at `from`. */
function strut(b: GeometryBuilder, from: V3, to: V3, radius: number): void {
  const start = new THREE.Vector3(...from);
  const direction = new THREE.Vector3(...to).sub(start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 6);
  geometry.translate(0, length / 2, 0);
  geometry.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(UP, direction.normalize()));
  geometry.translate(start.x, start.y, start.z);
  b.place(GOLD, geometry, ORIGIN);
}

/** Flat annular sector lying in the XZ plane, swept `span` radians and centred on +Z. */
function arcRibbon(inner: number, outer: number, span: number, thickness: number): THREE.BufferGeometry {
  const from = Math.PI / 2 - span / 2;
  const shape = new THREE.Shape();
  shape.absarc(0, 0, outer, from, from + span, false);
  shape.absarc(0, 0, inner, from + span, from, true);
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: false, curveSegments: 48 });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

interface ArcOptions {
  /** Height of the collar on the mast this arc hangs from. */
  anchor: number;
  drop: number;
  inner: number;
  outer: number;
  span: number;
  tilt: V3;
  /** Radians per second around the mast. */
  rate: number;
  rods: number;
  ticks?: boolean;
}

/**
 * The sundial crowning the observatory: three gold arcs of different size and tilt, each hung from its
 * own collar on the mast and turning at its own pace, around a fixed gnomon.
 */
export function createSundial(material: THREE.Material, baseY: number): Sundial {
  const object = new THREE.Group();
  object.position.y = baseY;
  const spinners: Array<{ node: THREE.Object3D; rate: number }> = [];

  const hang = (arc: ArcOptions): void => {
    const part = new GeometryBuilder();
    const mid = (arc.inner + arc.outer) / 2;
    const tilt = new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...arc.tilt));
    const centre = new THREE.Vector3(0, -arc.drop, 0);
    const placement = new THREE.Matrix4().makeTranslation(centre.x, centre.y, centre.z).multiply(tilt);
    const onArc = (phi: number): THREE.Vector3 =>
      new THREE.Vector3(mid * Math.cos(phi), 0, mid * Math.sin(phi)).applyMatrix4(tilt).add(centre);

    for (let i = 0; i < arc.rods; i++) {
      const phi = Math.PI / 2 + ((i - (arc.rods - 1) / 2) * arc.span * 0.92) / Math.max(1, arc.rods - 1);
      const foot = onArc(phi);
      strut(part, ORIGIN, [foot.x, foot.y, foot.z], 0.06);
    }
    for (const phi of [Math.PI / 2 - arc.span / 2, Math.PI / 2 + arc.span / 2]) {
      const end = onArc(phi);
      part.sphere(GOLD, 0.3, [end.x, end.y, end.z]);
    }
    part.placeMatrix(GOLD, arcRibbon(arc.inner, arc.outer, arc.span, 0.2), placement);
    // A rim standing on the outer edge, so the arc still reads as a gold band from the side.
    part.placeMatrix(GOLD, arcRibbon(arc.outer - 0.08, arc.outer + 0.08, arc.span, 1.1), placement);

    if (arc.ticks) {
      for (let hour = 0; hour < 12; hour++) {
        const phi = Math.PI / 2 - arc.span / 2 + 0.14 + ((arc.span - 0.28) * hour) / 11;
        part.box(GOLD, arc.outer - arc.inner - 0.3, 0.1, 0.16, [mid * Math.cos(phi), centre.y + 0.15, mid * Math.sin(phi)], [0, -phi, 0]);
      }
    }
    // Collar where the rods meet the mast.
    part.place(GOLD, new THREE.TorusGeometry(0.95, 0.12, 8, 24), ORIGIN, [Math.PI / 2, 0, 0]);

    const node = part.build({ gold: material });
    node.position.y = arc.anchor;
    object.add(node);
    spinners.push({ node, rate: arc.rate });
  };

  hang({ anchor: 10.2, drop: 5.4, inner: 7.3, outer: 9.2, span: 250 * DEG, tilt: [0, 0, 0], rate: 0.03, rods: 4, ticks: true });
  hang({ anchor: 13.4, drop: 4.6, inner: 5.3, outer: 6.7, span: 205 * DEG, tilt: [40 * DEG, 0, 0], rate: -0.05, rods: 3 });
  hang({ anchor: 16.2, drop: 3.4, inner: 3.5, outer: 4.7, span: 160 * DEG, tilt: [0, 0, -58 * DEG], rate: 0.075, rods: 2 });

  // Gnomon: points at the celestial pole and throws its shadow across the lowest arc.
  const gnomon = new GeometryBuilder();
  const polarAxis = new THREE.Vector3(0.5, 0.74, 0.45).normalize();
  const pivot = new THREE.Vector3(0, 2.2, 0);
  const tip = pivot.clone().addScaledVector(polarAxis, 7.5);
  const tail = pivot.clone().addScaledVector(polarAxis, -1.8);
  strut(gnomon, pivot.toArray() as V3, tip.toArray() as V3, 0.12);
  strut(gnomon, pivot.toArray() as V3, tail.toArray() as V3, 0.12);
  gnomon.sphere(GOLD, 0.5, pivot.toArray() as V3);
  gnomon.sphere(GOLD, 0.26, tip.toArray() as V3);
  object.add(gnomon.build({ gold: material }));

  return {
    object,
    update(time: number): void {
      for (const { node, rate } of spinners) node.rotation.y = time * rate;
    },
  };
}
