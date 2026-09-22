// Post-processing shaders: bloom prefilter / downsample / upsample and the
// final composite (ACES tone map, exposure, vignette, grain, chromatic
// aberration, sRGB encode). All passes run on a fullscreen triangle.
export const FULLSCREEN_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const BLOOM_PREFILTER_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float uThreshold;

// Unity-style soft-knee threshold; knee is fixed at 0.5 stops of HDR range.
vec3 thresholdColor(vec3 c) {
    const float knee = 0.5;
    float br = max(c.r, max(c.g, c.b));
    float soft = clamp(br - uThreshold + knee, 0.0, 2.0 * knee);
    soft = soft * soft / (4.0 * knee + 1e-4);
    float contrib = max(soft, br - uThreshold) / max(br, 1e-4);
    return c * contrib;
}

void main() {
    gl_FragColor = vec4(thresholdColor(texture2D(tDiffuse, vUv).rgb), 1.0);
}
`;

export const BLOOM_DOWN_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 uTexel;

// 4 bilinear taps at half-texel offsets (box filter).
void main() {
    vec2 d = uTexel * 0.5;
    vec3 s =
        texture2D(tDiffuse, vUv + vec2(-d.x, -d.y)).rgb +
        texture2D(tDiffuse, vUv + vec2( d.x, -d.y)).rgb +
        texture2D(tDiffuse, vUv + vec2(-d.x,  d.y)).rgb +
        texture2D(tDiffuse, vUv + vec2( d.x,  d.y)).rgb;
    gl_FragColor = vec4(s * 0.25, 1.0);
}
`;

export const BLOOM_UP_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform vec2 uTexel;

// 3x3 tent filter; the pass renders with additive blending so the result
// accumulates into the coarser mip already stored in the target.
void main() {
    vec2 d = uTexel;
    vec3 s =
        texture2D(tDiffuse, vUv + vec2(-d.x, -d.y)).rgb * 1.0 +
        texture2D(tDiffuse, vUv + vec2( 0.0, -d.y)).rgb * 2.0 +
        texture2D(tDiffuse, vUv + vec2( d.x, -d.y)).rgb * 1.0 +
        texture2D(tDiffuse, vUv + vec2(-d.x,  0.0)).rgb * 2.0 +
        texture2D(tDiffuse, vUv).rgb * 4.0 +
        texture2D(tDiffuse, vUv + vec2( d.x,  0.0)).rgb * 2.0 +
        texture2D(tDiffuse, vUv + vec2(-d.x,  d.y)).rgb * 1.0 +
        texture2D(tDiffuse, vUv + vec2( 0.0,  d.y)).rgb * 2.0 +
        texture2D(tDiffuse, vUv + vec2( d.x,  d.y)).rgb * 1.0;
    gl_FragColor = vec4(s / 16.0, 1.0);
}
`;

export const COMPOSITE_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D tScene;
uniform sampler2D tBloom;
uniform vec2 uResolution;
uniform float uTime;
uniform float uBloomStrength;
uniform float uExposure;
uniform float uVignette;
uniform float uGrain;
uniform float uChroma;
uniform int uDebug;

// ACES filmic approximation (Narkowicz 2015).
vec3 acesToneMap(vec3 x) {
    return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
}

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

void main() {
    if (uDebug != 0) {
        vec3 d = texture2D(tScene, vUv).rgb;
        if (uDebug == 8) {
            // pre-postprocess HDR: filmic range compress, no bloom / grade
            d = pow(d / (1.0 + d), vec3(1.0 / 2.2));
        }
        gl_FragColor = vec4(d, 1.0);
        return;
    }

    vec2 c = vUv - 0.5;

    // mild lateral chromatic aberration, scaled radially
    vec3 scene;
    scene.r = texture2D(tScene, vUv + c * uChroma * 0.008).r;
    scene.g = texture2D(tScene, vUv).g;
    scene.b = texture2D(tScene, vUv - c * uChroma * 0.008).b;

    vec3 bloom = texture2D(tBloom, vUv).rgb;
    vec3 hdr = (scene + bloom * uBloomStrength) * uExposure;
    vec3 col = acesToneMap(hdr);

    // vignette: keep the photon ring area untouched, darken corners only
    float v = smoothstep(0.85, 0.32, length(c));
    col *= mix(1.0 - uVignette, 1.0, v);

    // animated film grain, strongest in mid-tones (stays off the deep black
    // of the event horizon shadow)
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    float gr = (hash12(vUv * uResolution + fract(uTime * 61.7)) - 0.5) * uGrain;
    col += gr * (0.12 + 1.4 * lum * (1.0 - lum));

    gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}
`;
