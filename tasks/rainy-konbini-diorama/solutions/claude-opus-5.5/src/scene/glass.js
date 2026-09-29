import * as THREE from 'three';

// Storefront glass: mostly clear so the interior reads, with a cool sheen and rain
// rivulets that run down in columns plus a scatter of beaded droplets.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vView;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vView = cameraPosition - wp.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * wp;
  }`;

const fragmentShader = /* glsl */ `
  uniform float time;
  uniform vec2 size;
  uniform float seed;
  uniform float wet;
  uniform vec3 tint;
  varying vec2 vUv;
  varying vec3 vView;
  varying vec3 vNormal;

  float hash(float n) { return fract(sin(n * 91.345 + seed * 17.13) * 47453.5453); }
  float hash2(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed) * 43758.5453); }

  void main() {
    vec2 p = vUv * size;
    float water = 0.0;

    // Rivulets: each 6 cm column hosts one drop sliding down with a thin trail above it.
    float colW = 0.06;
    float col = floor(p.x / colW);
    float h = hash(col);
    if (h > 0.45) {
      float speed = 0.18 + hash(col + 3.0) * 0.35;
      float period = size.y + 0.6 + hash(col + 5.0) * 2.5;
      float head = size.y - mod(time * speed + hash(col + 9.0) * period, period);
      float cx = (col + 0.5 + 0.25 * sin(p.y * 7.0 + h * 20.0)) * colW;
      float dx = abs(p.x - cx);
      float dy = p.y - head;
      float drop = smoothstep(0.014, 0.004, length(vec2(dx, max(dy, 0.0) * 0.6 + min(dy, 0.0) * 1.4)));
      float trail = smoothstep(0.006, 0.0015, dx) * step(0.0, dy) * exp(-dy * 1.6) * 0.55;
      water = max(water, max(drop, trail));
    }

    // Beaded droplets on a jittered grid.
    vec2 g = p / 0.045;
    vec2 cell = floor(g);
    float r = hash2(cell);
    if (r > 0.7) {
      vec2 c = cell + 0.5 + (vec2(hash2(cell + 1.3), hash2(cell + 7.1)) - 0.5) * 0.6;
      float d = length(g - c);
      water = max(water, smoothstep(0.32, 0.12, d) * 0.8);
    }

    vec3 V = normalize(vView);
    float fres = pow(1.0 - abs(dot(V, normalize(vNormal))), 3.0);
    float sheen = 0.05 + 0.3 * fres;
    // Diagonal highlight band in the style of anime glass.
    float band = smoothstep(0.08, 0.0, abs(fract((vUv.x * size.x + vUv.y * size.y) * 0.22 + 0.15) - 0.5) - 0.38);
    vec3 col3 = tint * (sheen + band * 0.12) + vec3(0.8, 0.9, 1.0) * water * wet * 0.55;
    float alpha = clamp(sheen + band * 0.1 + water * wet * 0.45, 0.0, 0.8);
    gl_FragColor = vec4(col3, alpha);
  }`;

let seedCounter = 1;

export function glassMaterial(width, height, { wet = 1, tint = 0x9fc4ff } = {}) {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      size: { value: new THREE.Vector2(width, height) },
      seed: { value: seedCounter++ * 1.618 },
      wet: { value: wet },
      tint: { value: new THREE.Color(tint) },
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

/** Adds a glass pane (PlaneGeometry) and registers it for animation and outline exclusion. */
export function addGlass(ctx, parent, width, height, x, y, z, ry = 0, opts) {
  const mat = glassMaterial(width, height, opts);
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.y = ry;
  mesh.renderOrder = 2;
  parent.add(mesh);
  ctx.noOutline.push(mesh);
  ctx.glass.push(mat);
  return mesh;
}
