import { EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, Group } from 'three';

// Threshold: 20° catches hard edges (crates/boxes/doors) but skips smooth ones (cylinders/poles get a minimal outline).
const DEFAULT_THRESHOLD_DEG = 20;

const outlineMaterial = new LineBasicMaterial({ color: 0x05080d, transparent: true, opacity: 0.92 });

const outlineCache = new Map<string, LineSegments>();

function key(geo: { uuid: string }, thresholdDeg: number): string {
  return `${geo.uuid}|${thresholdDeg}`;
}

function buildOutline(mesh: Mesh, thresholdDeg: number): LineSegments | null {
  const cached = outlineCache.get(key(mesh.geometry, thresholdDeg));
  if (cached) return cached;
  const edges = new EdgesGeometry(mesh.geometry, thresholdDeg);
  const line = new LineSegments(edges, outlineMaterial);
  line.renderOrder = 1;
  outlineCache.set(key(mesh.geometry, thresholdDeg), line);
  return line;
}

// Attach dark contour outlines to a group of meshes (recurses one level).
// Adds outline as a child of each mesh so it follows transforms.
export function applyOutlines(group: Group, thresholdDeg = DEFAULT_THRESHOLD_DEG): void {
  group.traverse((obj) => {
    if (!(obj instanceof Mesh)) return;
    const outline = buildOutline(obj, thresholdDeg);
    if (!outline) return;
    outline.matrixAutoUpdate = false;
    outline.matrix.identity();
    obj.add(outline);
  });
}