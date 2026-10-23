uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uTime;
uniform float uExposure;
uniform float uBloomStrength;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform int uDebug;
varying vec2 vUv;

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 acesToneMap(vec3 x) {
  return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

void main() {
  vec2 centered = vUv - 0.5;
  bool finalComposite = uDebug == 0;
  float dispersion = finalComposite ? uChromatic : 0.0;
  vec2 offset = centered * (0.0032 * dispersion) * (0.45 + dot(centered, centered) * 2.0);
  vec3 scene;
  vec3 bloom;
  if (dispersion > 0.0001) {
    scene.r = texture2D(tScene, vUv + offset).r;
    scene.g = texture2D(tScene, vUv).g;
    scene.b = texture2D(tScene, vUv - offset).b;
    bloom.r = texture2D(tBloom, vUv + offset).r;
    bloom.g = texture2D(tBloom, vUv).g;
    bloom.b = texture2D(tBloom, vUv - offset).b;
  } else {
    scene = texture2D(tScene, vUv).rgb;
    bloom = texture2D(tBloom, vUv).rgb;
  }

  vec3 hdr = scene + bloom * (finalComposite ? uBloomStrength : 0.0);
  float exposure = (finalComposite || uDebug == 8) ? uExposure : 1.0;
  vec3 color = acesToneMap(hdr * exposure);
  if (finalComposite) {
    float lensRadius = length(centered * vec2(1.0, 0.88));
    float vignette = smoothstep(0.24, 0.72, lensRadius);
    color *= 1.0 - uVignette * 0.68 * vignette;
    float random = grainHash(gl_FragCoord.xy + vec2(fract(uTime * 0.73) * 173.0, fract(uTime * 0.37) * 311.0));
    color += (random - 0.5) * uGrain * 0.026;
  }
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  #include <colorspace_fragment>
}
