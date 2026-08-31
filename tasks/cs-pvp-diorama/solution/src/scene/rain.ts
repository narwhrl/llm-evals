import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  ShaderMaterial,
  Group,
  AdditiveBlending,
  Color,
} from 'three';

export interface RainSystem {
  group: Group;
  update: (dt: number) => void;
}

// Rain particles — thin angled streaks falling through a column above the base.
// ~2000 particles, custom shader for slanted line look.
export function buildRain(count = 2000, baseHalf = 5.5, top = 7): RainSystem {
  const group = new Group();
  group.name = 'rain';

  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 2 * baseHalf;
    positions[i * 3 + 1] = Math.random() * top;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2 * baseHalf;
    speeds[i] = 4 + Math.random() * 3.5;
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(positions, 3));

  const mat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uColor: { value: new Color(0xa8c4d8) },
      uLength: { value: 0.18 },
    },
    vertexShader: /* glsl */ `
      uniform float uLength;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float dist = -mv.z;
        gl_PointSize = max(1.0, 6.0 * uLength * (10.0 / max(dist, 1.0)));
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      void main() {
        vec2 uv = gl_PointCoord;
        // streak: bright center, fade vertical
        float horiz = 1.0 - smoothstep(0.3, 0.5, abs(uv.x - 0.5));
        float vert = smoothstep(0.0, 0.5, uv.y) * smoothstep(1.0, 0.6, uv.y);
        float a = horiz * vert;
        if (a < 0.02) discard;
        gl_FragColor = vec4(uColor, a * 0.65);
      }
    `,
  });

  const points = new Points(geo, mat);
  points.frustumCulled = false;
  group.add(points);

  function update(dt: number): void {
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      arr[idx + 1] -= speeds[i] * dt;
      // small lateral drift (wind)
      arr[idx + 0] -= 0.6 * dt;
      if (arr[idx + 1] < 0) {
        arr[idx + 1] = top;
        arr[idx + 0] = (Math.random() - 0.5) * 2 * baseHalf;
        arr[idx + 2] = (Math.random() - 0.5) * 2 * baseHalf;
      }
      if (arr[idx + 0] < -baseHalf) arr[idx + 0] += 2 * baseHalf;
    }
    geo.attributes.position.needsUpdate = true;
  }

  return { group, update };
}