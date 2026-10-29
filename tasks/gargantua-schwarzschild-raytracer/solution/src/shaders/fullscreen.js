import { BufferGeometry, BufferAttribute } from 'three';

// 覆盖整个视口的大三角形，比 quad 少一次对角线接缝，且不需要相机。
export function makeFullscreenTriangle() {
  const geometry = new BufferGeometry();
  geometry.setAttribute(
    'position',
    new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
  );
  geometry.setAttribute('uv', new BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
  return geometry;
}

export const fullscreenTriangle = makeFullscreenTriangle();
