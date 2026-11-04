precision highp float;

varying vec2 vUv;

// One shader, three post-processing modes (full-screen quad each time):
//   uMode 0 = HDR bright-pass prefilter (threshold + 4-tap downsample)
//   uMode 1 = separable 9-tap Gaussian blur (direction in uBlurDir)
//   uMode 2 = composite: scene + Bloom -> ACES -> vignette / grain / CA
uniform sampler2D uScene;
uniform sampler2D uBloom;
uniform int   uMode;
uniform vec2  uTexel;
uniform vec2  uBlurDir;
uniform float uBloomThreshold;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChromatic;
uniform float uTime;
uniform int   uDebug;

// ACES filmic tone mapping (Narkowicz 2015 fitted approximation of the ACES
// RRT+ODT). Explicit implementation, no renderer-side implicit tone mapping.
vec3 acesFilmic(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  if (uMode == 0) {
    vec3 c = vec3(0.0);
    c += texture2D(uScene, vUv + vec2(-1.0, -1.0) * uTexel).rgb;
    c += texture2D(uScene, vUv + vec2( 1.0, -1.0) * uTexel).rgb;
    c += texture2D(uScene, vUv + vec2(-1.0,  1.0) * uTexel).rgb;
    c += texture2D(uScene, vUv + vec2( 1.0,  1.0) * uTexel).rgb;
    c *= 0.25;
    float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
    float k = max(l - uBloomThreshold, 0.0) / max(l, 1e-4);
    gl_FragColor = vec4(c * k, 1.0);
    return;
  }

  if (uMode == 1) {
    vec3 c = texture2D(uScene, vUv).rgb * 0.227027;
    c += texture2D(uScene, vUv + uBlurDir * uTexel * 1.384615).rgb * 0.316216;
    c += texture2D(uScene, vUv - uBlurDir * uTexel * 1.384615).rgb * 0.316216;
    c += texture2D(uScene, vUv + uBlurDir * uTexel * 3.230769).rgb * 0.070270;
    c += texture2D(uScene, vUv - uBlurDir * uTexel * 3.230769).rgb * 0.070270;
    gl_FragColor = vec4(c, 1.0);
    return;
  }

  // Diagnostic views bypass post-processing so the raw data stays legible.
  if (uDebug != 0) {
    vec3 c = texture2D(uScene, vUv).rgb;
    c = c / (1.0 + 0.5 * c);                 // soft HDR compression
    gl_FragColor = vec4(pow(clamp(c, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
    return;
  }

  // Restrained chromatic aberration on the HDR scene only.
  vec2 ca = vec2(uChromatic * 0.004, 0.0);
  vec3 scene;
  scene.r = texture2D(uScene, vUv + ca).r;
  scene.g = texture2D(uScene, vUv).g;
  scene.b = texture2D(uScene, vUv - ca).b;

  vec3 bloom = texture2D(uBloom, vUv).rgb;
  vec3 hdr = (scene + bloom * uBloomStrength) * uExposure;
  vec3 col = acesFilmic(hdr);

  vec2 q = vUv - 0.5;
  col *= clamp(1.0 - uVignette * dot(q, q) * 1.6, 0.0, 1.0);

  float g = hash2(vUv * vec2(1024.0, 768.0) + fract(uTime) * 91.7) - 0.5;
  col += g * uGrain;

  // ShaderMaterial output is not auto-converted; encode sRGB explicitly.
  gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}
