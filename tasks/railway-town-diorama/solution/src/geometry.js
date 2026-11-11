import * as THREE from "three";

export function createRibbonGeometry(
  curve,
  width,
  segments = 320,
  {
    yOffset = 0,
    lateralOffset = 0,
    closed = true,
    uvRepeat = 1,
  } = {},
) {
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();
  const vertexCount = closed ? segments : segments + 1;

  for (let index = 0; index < vertexCount; index += 1) {
    const u = (index % segments) / segments;
    curve.getPointAt(u, point);
    curve.getTangentAt(u, tangent);
    side.set(-tangent.z, 0, tangent.x).normalize();
    for (const sign of [-1, 1]) {
      const vertex = point
        .clone()
        .addScaledVector(side, lateralOffset + (sign * width) / 2);
      vertex.y += yOffset;
      positions.push(vertex.x, vertex.y, vertex.z);
      normals.push(0, 1, 0);
      uvs.push((index / segments) * uvRepeat, sign > 0 ? 1 : 0);
    }
  }

  const quadCount = segments;
  for (let index = 0; index < quadCount; index += 1) {
    const next = closed ? (index + 1) % vertexCount : index + 1;
    const a = index * 2;
    const b = index * 2 + 1;
    const c = next * 2;
    const d = next * 2 + 1;
    indices.push(a, b, c, b, d, c);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

export function createProfileRibbonGeometry(
  curve,
  profile,
  segments = 360,
  { closed = true, uStart = 0, uEnd = 1 } = {},
) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const side = new THREE.Vector3();
  const vertexCount = closed ? segments : segments + 1;

  for (let index = 0; index < vertexCount; index += 1) {
    const localFraction = index / segments;
    const u = closed
      ? uStart + (uEnd - uStart) * localFraction
      : uStart + (uEnd - uStart) * localFraction;
    const wrappedU = ((u % 1) + 1) % 1;
    curve.getPointAt(wrappedU, point);
    curve.getTangentAt(wrappedU, tangent);
    side.set(-tangent.z, 0, tangent.x).normalize();
    for (const sample of profile) {
      const vertex = point.clone().addScaledVector(side, sample.offset);
      vertex.y = sample.y;
      positions.push(vertex.x, vertex.y, vertex.z);
      uvs.push(localFraction * 12, sample.uv ?? 0);
    }
  }

  for (let index = 0; index < segments; index += 1) {
    const next = closed ? (index + 1) % vertexCount : index + 1;
    for (let strip = 0; strip < profile.length - 1; strip += 1) {
      const a = index * profile.length + strip;
      const b = index * profile.length + strip + 1;
      const c = next * profile.length + strip;
      const d = next * profile.length + strip + 1;
      indices.push(a, b, c, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function findCurveIntersections(curveA, curveB, samplesA = 960, samplesB = 720) {
  const pointsA = [];
  const pointsB = [];
  for (let index = 0; index < samplesA; index += 1) {
    pointsA.push(curveA.getPointAt(index / samplesA));
  }
  for (let index = 0; index < samplesB; index += 1) {
    pointsB.push(curveB.getPointAt(index / samplesB));
  }

  const intersections = [];
  for (let indexA = 0; indexA < samplesA; indexA += 1) {
    const a1 = pointsA[indexA];
    const a2 = pointsA[(indexA + 1) % samplesA];
    for (let indexB = 0; indexB < samplesB - 1; indexB += 1) {
      const b1 = pointsB[indexB];
      const b2 = pointsB[indexB + 1];
      const denominator =
        (a2.x - a1.x) * (b2.z - b1.z) - (a2.z - a1.z) * (b2.x - b1.x);
      if (Math.abs(denominator) < 1e-8) continue;

      const t =
        ((b1.x - a1.x) * (b2.z - b1.z) - (b1.z - a1.z) * (b2.x - b1.x)) /
        denominator;
      const s =
        ((b1.x - a1.x) * (a2.z - a1.z) - (b1.z - a1.z) * (a2.x - a1.x)) /
        denominator;
      if (t < 0 || t > 1 || s < 0 || s > 1) continue;

      const point = new THREE.Vector3(
        a1.x + (a2.x - a1.x) * t,
        0,
        a1.z + (a2.z - a1.z) * t,
      );
      intersections.push({
        point,
        aU: (indexA + t) / samplesA,
        bU: (indexB + s) / samplesB,
      });
    }
  }

  return intersections;
}

export function wrap(value, length) {
  return ((value % length) + length) % length;
}

export function nearestCurveU(curve, target, samples = 800) {
  let bestU = 0;
  let bestDistance = Infinity;
  const point = new THREE.Vector3();
  for (let index = 0; index < samples; index += 1) {
    const u = index / samples;
    curve.getPointAt(u, point);
    const distance = point.distanceToSquared(target);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestU = u;
    }
  }
  return bestU;
}
