import * as THREE from 'three';

// Full-screen triangle drawn directly in clip space: the three vertices cover
// the viewport, so a single draw call rasterizes every pixel exactly once and
// all visible imagery is produced per-pixel by the fragment shader.
const FULLSCREEN_VERTEX_SHADER = /* glsl */ `
varying vec2 vNdc;

void main() {
  vNdc = position.xy;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

// Scaffolding preview: proves the vendored Three.js ESM build renders through
// the full-screen path. Replaced by the geodesic fragment shader next.
const PREVIEW_FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying vec2 vNdc;

uniform float uTime;
uniform vec2 uResolution;

void main() {
  vec2 uv = vNdc * 0.5 + 0.5;
  uv.x *= uResolution.x / uResolution.y;
  float glow = length(uv - vec2(0.5, 0.0));
  vec3 color = vec3(1.0, 0.55, 0.18) * 0.12 / (glow * glow + 0.05);
  color += vec3(0.02, 0.03, 0.06) * (1.0 - length(vNdc));
  color *= 0.9 + 0.1 * sin(uTime * 0.5);
  gl_FragColor = vec4(color, 1.0);
}
`;

const MAX_DEVICE_PIXEL_RATIO = 2;

/**
 * Owns the WebGL context, the full-screen shader surface, and the frame loop.
 * Commit 1 wires context lifecycle and resize; the geodesic shader, camera
 * rig, post chain, and debug views attach in later commits.
 */
export class GargantuaRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: 'high-performance',
    });
    this.scene = new THREE.Scene();
    // Identity camera: the full-screen triangle carries its own clip-space
    // positions, so no projection is applied.
    this.camera = new THREE.Camera();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        3,
      ),
    );
    this.material = new THREE.ShaderMaterial({
      vertexShader: FULLSCREEN_VERTEX_SHADER,
      fragmentShader: PREVIEW_FRAGMENT_SHADER,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);

    this.clock = new THREE.Clock();
    this.frameId = 0;
    this.running = false;
    this.render = this.render.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.clock.start();
    this.frameId = requestAnimationFrame(this.render);
  }

  stop() {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  handleResize() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(width, height, false);
    this.material.uniforms.uResolution.value.set(width * dpr, height * dpr);
  }

  render() {
    if (!this.running) return;
    this.material.uniforms.uTime.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
    this.frameId = requestAnimationFrame(this.render);
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.mesh.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  }
}
