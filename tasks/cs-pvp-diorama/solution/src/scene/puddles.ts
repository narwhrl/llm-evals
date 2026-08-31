import {
  BufferGeometry,
  CircleGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  AdditiveBlending,
  Color,
  DoubleSide,
} from 'three';

export interface PuddleSystem {
  group: Group;
  update: (t: number) => void;
}

// Planar puddles — flat dark planes with slight metallic look, plus a ripple Points
// overlay for occasional expanding ring sprites.
export function buildPuddles(): PuddleSystem {
  const group = new Group();
  group.name = 'puddles';

  // Puddle planes (positions in world coordinates).
  const puddles: Array<{ x: number; z: number; r: number }> = [
    { x: -3.0, z: 0.5, r: 0.45 },
    { x: 1.4, z: 1.2, r: 0.55 },
    { x: 2.2, z: -2.4, r: 0.4 },
    { x: -1.0, z: -1.5, r: 0.35 },
    { x: 0.2, z: 3.2, r: 0.45 },
    { x: -2.0, z: 3.5, r: 0.4 },
  ];

  for (const p of puddles) {
    const plane = new Mesh(
      new CircleGeometry(p.r, 16),
      new MeshBasicMaterial({
        color: 0x1a2230,
        transparent: true,
        opacity: 0.85,
      }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(p.x, 0.06, p.z);
    group.add(plane);
  }

  // Ripple ring particles
  const ringCount = 12;
  const ringGeo = new BufferGeometry();
  const ringPos = new Float32Array(ringCount * 3);
  const ringPhase = new Float32Array(ringCount);
  for (let i = 0; i < ringCount; i++) {
    const puddle = puddles[i % puddles.length];
    ringPos[i * 3 + 0] = puddle.x + (Math.random() - 0.5) * puddle.r * 0.6;
    ringPos[i * 3 + 1] = 0.07;
    ringPos[i * 3 + 2] = puddle.z + (Math.random() - 0.5) * puddle.r * 0.6;
    ringPhase[i] = Math.random();
  }
  ringGeo.setAttribute('position', new Float32BufferAttribute(ringPos, 3));
  ringGeo.setAttribute('aPhase', new Float32BufferAttribute(ringPhase, 1));

  const ringMat = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new Color(0x88a8c8) } },
    vertexShader: /* glsl */ `
      attribute float aPhase;
      uniform float uTime;
      varying float vAlpha;
      varying float vPhase;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float dist = -mv.z;
        gl_PointSize = max(1.0, 30.0 / max(dist, 1.0));
        float p = mod(uTime * 0.6 + aPhase, 1.0);
        vAlpha = sin(p * 3.14159) * 0.7;
        vPhase = p;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying float vAlpha;
      varying float vPhase;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float r = length(uv);
        float ring = smoothstep(0.45, 0.5, r) * (1.0 - smoothstep(0.5, 0.55, r));
        float a = ring * vAlpha;
        if (a < 0.02) discard;
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });

  const ringPoints = new Points(ringGeo, ringMat);
  ringPoints.frustumCulled = false;
  group.add(ringPoints);

  function update(t: number): void {
    ringMat.uniforms.uTime.value = t;
  }

  return { group, update };
}