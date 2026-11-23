import * as THREE from 'three';

/**
 * Finishing pass in display space, after tone mapping: a touch more saturation and contrast than the
 * tone curve leaves, cool shadows against warm light, and a lens-style falloff toward the corners.
 */
export const GradeShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uAspect: { value: 1.6 },
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
uniform float uAspect;
varying vec2 vUv;
void main() {
	vec3 color = texture2D(tDiffuse, vUv).rgb;
	float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
	color = mix(vec3(luma), color, 1.14);
	color = (color - 0.5) * 1.04 + 0.5;
	color *= mix(vec3(0.96, 0.99, 1.05), vec3(1.04, 1.0, 0.95), smoothstep(0.2, 0.8, luma));
	vec2 offset = (vUv - 0.5) * vec2(uAspect / 1.6, 1.0);
	color *= 1.0 - smoothstep(0.42, 1.12, length(offset)) * 0.26;
	gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`,
};
