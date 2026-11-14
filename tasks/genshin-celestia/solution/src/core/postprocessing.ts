import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export interface PostPipeline {
  composer: EffectComposer;
  setSize: (width: number, height: number, pixelRatio: number) => void;
  render: () => void;
  dispose: () => void;
}

const CelestiaGradeShader = {
  uniforms: {
    tDiffuse: { value: null },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);
      vec3 col = texel.rgb;

      // Crisp Genshin anime clarity: subtle vibrance & gentle cinematic corner framing
      float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
      float satBoost = 1.10;
      col = mix(vec3(luma), col, satBoost);

      vec2 centered = vUv - 0.5;
      float vig = 1.0 - dot(centered, centered) * 0.20;
      col *= clamp(vig, 0.84, 1.0);

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), texel.a);
    }
  `,
};

export function createPostPipeline(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
): PostPipeline {
  const size = renderer.getSize(new THREE.Vector2());
  const pixelRatio = renderer.getPixelRatio();

  const renderTarget = new THREE.WebGLRenderTarget(
    Math.max(1, Math.floor(size.x * pixelRatio)),
    Math.max(1, Math.floor(size.y * pixelRatio)),
    {
      type: THREE.HalfFloatType,
      samples: 4,
    },
  );

  const composer = new EffectComposer(renderer, renderTarget);
  composer.setPixelRatio(pixelRatio);
  composer.setSize(size.x, size.y);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Subtle thresholded bloom so golden armillary, celestial core & solar highlights gleam
  // while keeping ivory stone crisp and detailed
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(size.x, size.y),
    0.26,
    0.55,
    0.92,
  );
  composer.addPass(bloomPass);

  const outputPass = new OutputPass();
  composer.addPass(outputPass);

  const gradePass = new ShaderPass(CelestiaGradeShader);
  composer.addPass(gradePass);

  return {
    composer,
    setSize: (width: number, height: number, pr: number) => {
      composer.setPixelRatio(pr);
      composer.setSize(width, height);
      bloomPass.resolution.set(width * pr, height * pr);
    },
    render: () => {
      composer.render();
    },
    dispose: () => {
      bloomPass.dispose();
      outputPass.dispose();
      gradePass.dispose();
      renderTarget.dispose();
      composer.dispose();
    },
  };
}
