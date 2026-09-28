// 合成 pass：深度+法线 Sobel 描边、程序化夜空、远处雷光与暗角，全部在同一个全屏 pass 内完成。
import * as THREE from 'three';

export function createCompositeShader() {
  return {
    uniforms: {
      tDiffuse: { value: null },
      tNormal: { value: null },
      tDepth: { value: null },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uNear: { value: 0.5 },
      uFar: { value: 320 },
      uThickness: { value: 1.15 },
      uDepthRel: { value: 0.055 },
      uDepthAbs: { value: 0.35 },
      uNormalCos: { value: 0.62 },
      uLineColor: { value: new THREE.Color(0x0a0e14) },
      uLineStrength: { value: 1 },
      uSkyTop: { value: new THREE.Color(0x05080d) },
      uSkyHorizon: { value: new THREE.Color(0x16222c) },
      uSkyGlow: { value: new THREE.Color(0x233240) },
      uFlash: { value: 0 },
      uVignette: { value: 0.42 },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      #include <packing>

      uniform sampler2D tDiffuse;
      uniform sampler2D tNormal;
      uniform sampler2D tDepth;
      uniform vec2 uResolution;
      uniform float uNear;
      uniform float uFar;
      uniform float uThickness;
      uniform float uDepthRel;
      uniform float uDepthAbs;
      uniform float uNormalCos;
      uniform vec3 uLineColor;
      uniform float uLineStrength;
      uniform vec3 uSkyTop;
      uniform vec3 uSkyHorizon;
      uniform vec3 uSkyGlow;
      uniform float uFlash;
      uniform float uVignette;

      varying vec2 vUv;

      float linearDepth(vec2 uv) {
        float depth = texture2D(tDepth, uv).x;
        return -perspectiveDepthToViewZ(depth, uNear, uFar);
      }

      vec3 viewNormal(vec2 uv) {
        return normalize(texture2D(tNormal, uv).xyz * 2.0 - 1.0);
      }

      void main() {
        vec2 texel = uThickness / uResolution;
        float centerDepth = linearDepth(vUv);
        vec3 centerNormal = viewNormal(vUv);

        float depthMax = centerDepth;
        float depthMin = centerDepth;
        float normalEdge = 0.0;

        for (int i = -1; i <= 1; i++) {
          for (int j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) continue;
            vec2 uv = vUv + vec2(float(i), float(j)) * texel;
            float d = linearDepth(uv);
            depthMax = max(depthMax, d);
            depthMin = min(depthMin, d);
            if (d < uFar * 0.99) {
              normalEdge = max(normalEdge, 1.0 - dot(centerNormal, viewNormal(uv)));
            }
          }
        }

        float depthEdge = depthMax - depthMin;
        float relativeEdge = depthEdge / max(centerDepth, 1.0);

        float line = 0.0;
        if (centerDepth < uFar * 0.99) {
          float depthLine = smoothstep(uDepthRel, uDepthRel * 2.0, relativeEdge) * step(uDepthAbs, depthEdge);
          float normalLine = smoothstep(uNormalCos, min(uNormalCos + 0.22, 0.99), normalEdge);
          line = max(depthLine, normalLine * 0.92);
        }

        float skyMask = step(uFar * 0.99, centerDepth);
        vec3 sky = mix(uSkyHorizon, uSkyTop, smoothstep(0.34, 0.96, vUv.y));
        sky = mix(sky, uSkyGlow, smoothstep(0.62, 0.24, vUv.y) * 0.55);
        sky += uFlash * vec3(0.42, 0.5, 0.62);

        vec3 color = mix(texture2D(tDiffuse, vUv).rgb, sky, skyMask);
        color = mix(color, uLineColor, clamp(line, 0.0, 1.0) * uLineStrength);
        color += uFlash * 0.05;

        float vignette = smoothstep(1.25, 0.34, length((vUv - 0.5) * vec2(1.06, 1.0)) * 1.35);
        color *= mix(1.0, vignette, uVignette);

        gl_FragColor = vec4(color, 1.0);
      }
    `,
  };
}
