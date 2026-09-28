// Final composite pass: ACES tone mapping, chromatic aberration, vignette and
// film grain applied to the HDR buffer, then sRGB encoding. Debug views bypass
// the lens effects so diagnostics stay readable.

export const CompositeShader = {
  name: 'GargantuaCompositeShader',
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uDebug: { value: 0 },
    uExposure: { value: 1.0 },
    uVignette: { value: 0.4 },
    uGrain: { value: 0.055 },
    uChroma: { value: 0.8 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    varying vec2 vUv;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform int uDebug;
    uniform float uExposure;
    uniform float uVignette;
    uniform float uGrain;
    uniform float uChroma;

    float hash12(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }

    // ACES filmic curve (Narkowicz 2015 approximation)
    vec3 acesFilmic(vec3 x) {
      return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
    }

    void main() {
      vec2 fromC = vUv - 0.5;
      float r2 = dot(fromC, fromC);
      vec3 col;

      if (uDebug == 0) {
        // chromatic aberration: radial channel separation, strongest at edges
        vec2 off = fromC * uChroma * 0.0035 * (0.35 + 2.2 * r2);
        col.r = texture2D(tDiffuse, vUv + off).r;
        col.g = texture2D(tDiffuse, vUv).g;
        col.b = texture2D(tDiffuse, vUv - off).b;

        col = acesFilmic(col * uExposure);

        // restrained vignette
        float d = length(fromC) * 1.4142;
        col *= 1.0 - uVignette * smoothstep(0.45, 1.22, d);

        // film grain (luminance weighted, animated by simulated time)
        float g = hash12(vUv * 917.0 + fract(uTime * 0.731) * 71.3) - 0.5;
        float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col += g * uGrain * (0.55 + 0.45 * (1.0 - min(lum, 1.0)));
      } else {
        col = texture2D(tDiffuse, vUv).rgb;
      }

      // dither against banding, then encode to sRGB
      col += (hash12(vUv * 517.7) - 0.5) * (1.5 / 255.0);
      col = pow(max(col, vec3(0.0)), vec3(1.0 / 2.2));
      gl_FragColor = vec4(col, 1.0);
    }
  `,
};
