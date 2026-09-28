import { WebGLRenderer, NoToneMapping, SRGBColorSpace } from 'three';
import { OutlineEffect } from 'three/addons/effects/OutlineEffect.js';

export function createRenderer(canvas) {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    preserveDrawingBuffer: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.setClearColor(0x05070a, 1);
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NoToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = false;

  const outline = new OutlineEffect(renderer, {
    defaultThickness: 0.005,
    defaultColor: [0.025, 0.03, 0.04],
    defaultAlpha: 0.9,
    defaultKeepAlive: true,
  });

  const onResize = () => {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  };
  window.addEventListener('resize', onResize);

  return { renderer, outline, dispose: () => window.removeEventListener('resize', onResize) };
}
