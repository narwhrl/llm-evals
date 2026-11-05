import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FullScreenQuad, Pass } from 'three/addons/postprocessing/Pass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SUN_DIR } from './env';

/** Screen-space crepuscular rays from unoccluded sky (depth == 1), plus vignette. */
class SunRaysPass extends Pass {
  readonly uniforms = {
    tDiffuse: { value: null as THREE.Texture | null },
    tDepth: { value: null as THREE.Texture | null },
    sunUV: { value: new THREE.Vector2() },
    sunOn: { value: 0 },
    aspect: { value: 1 },
    time: { value: 0 },
  };
  private quad = new FullScreenQuad(
    new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
      fragmentShader: /* glsl */ `
        uniform sampler2D tDiffuse;
        uniform sampler2D tDepth;
        uniform vec2 sunUV;
        uniform float sunOn;
        uniform float aspect;
        uniform float time;
        varying vec2 vUv;
        float skyAt(vec2 uv) {
          // Off-screen towards the sun is assumed to be open sky.
          if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 1.0;
          return step(0.999999, texture2D(tDepth, uv).r);
        }
        void main() {
          vec3 c = texture2D(tDiffuse, vUv).rgb;
          if (sunOn > 0.0) {
            const int N = 48;
            vec2 delta = (sunUV - vUv) / float(N) * 0.85;
            float jitter = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
            vec2 uv = vUv + delta * jitter;
            float acc = 0.0, w = 1.0, wsum = 0.0;
            for (int i = 0; i < N; i++) {
              acc += skyAt(uv) * w;
              wsum += w;
              w *= 0.975;
              uv += delta;
            }
            acc /= wsum;
            // angular streaks so the haze reads as discrete shafts fanning from the sun
            vec2 rel = (vUv - sunUV) * vec2(aspect, 1.0);
            float ang = atan(rel.y, rel.x);
            float streak = 0.35 + 0.65 * smoothstep(0.25, 0.85, 0.5 + 0.5 * sin(ang * 61.0 + sin(ang * 23.0 + time * 0.05) * 2.5)
              * (0.6 + 0.4 * sin(ang * 17.0 - time * 0.03)));
            float d = length(rel);
            c += vec3(1.0, 0.84, 0.6) * acc * streak * exp(-d * 0.7) * sunOn * 0.75;
          }
          vec2 q = (vUv - 0.5) * vec2(aspect, 1.0);
          c *= mix(1.0, 0.8, smoothstep(0.45, 1.25, length(q)));
          gl_FragColor = vec4(c, 1.0);
        }`,
    }),
  );

  render(renderer: THREE.WebGLRenderer, writeBuffer: THREE.WebGLRenderTarget, readBuffer: THREE.WebGLRenderTarget): void {
    this.uniforms.tDiffuse.value = readBuffer.texture;
    this.uniforms.tDepth.value = readBuffer.depthTexture;
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    this.quad.render(renderer);
  }
}

export function createPost(renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.PerspectiveCamera) {
  const size = renderer.getDrawingBufferSize(new THREE.Vector2());
  const target = new THREE.WebGLRenderTarget(size.x, size.y, {
    type: THREE.HalfFloatType,
    samples: 4,
    depthTexture: new THREE.DepthTexture(size.x, size.y),
  });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  const rays = new SunRaysPass();
  composer.addPass(rays);
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.32, 0.55, 1.15));
  composer.addPass(new OutputPass());

  const v = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const render = (t: number) => {
    rays.uniforms.time.value = t;
    v.copy(camera.position).addScaledVector(SUN_DIR, 50000).project(camera);
    rays.uniforms.sunUV.value.set(v.x * 0.5 + 0.5, v.y * 0.5 + 0.5);
    camera.getWorldDirection(fwd);
    rays.uniforms.sunOn.value = THREE.MathUtils.smoothstep(fwd.dot(SUN_DIR), 0.0, 0.35);
    rays.uniforms.aspect.value = camera.aspect;
    composer.render();
  };
  return { composer, render };
}
