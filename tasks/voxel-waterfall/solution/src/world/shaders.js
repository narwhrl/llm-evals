export const waterVertex = `
varying vec3 vPos;
varying vec3 vNormal;
varying float vFlow;

attribute float aFlow;

void main() {
  vPos = (modelMatrix * vec4(position, 1.0)).xyz;
  vNormal = normalize(normalMatrix * normal);
  vFlow = aFlow;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const waterFragment = `
varying vec3 vPos;
varying vec3 vNormal;
varying float vFlow;

uniform float uTime;
uniform float uSpeed;
uniform vec3 uDeep;
uniform vec3 uFoam;

void main() {
  float flow = vFlow;
  float scroll = fract(vPos.y * 0.42 - uTime * uSpeed * (0.45 + flow));
  float ribbon = smoothstep(0.0, 0.12, scroll) * smoothstep(0.62, 0.22, scroll);
  float ripple = sin(vPos.x * 6.2 + vPos.z * 5.4 + uTime * (1.2 + flow * 2.0)) * 0.5 + 0.5;
  float sparkle = pow(abs(sin(vPos.x * 9.0 + vPos.z * 7.0 + uTime * 3.4)), 10.0);
  float foam = ribbon * flow + sparkle * 0.22 + (1.0 - flow) * ripple * 0.15;
  vec3 col = mix(uDeep, uFoam, clamp(foam, 0.0, 1.0));
  float fresnel = pow(1.0 - abs(vNormal.y), 1.6);
  col = mix(col, uFoam, fresnel * 0.28);
  gl_FragColor = vec4(col, mix(0.78, 0.9, flow));
}
`;

export const skyVertex = `
varying vec3 vDir;
void main() {
  vec4 world = modelMatrix * vec4(position, 1.0);
  vDir = world.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const skyFragment = `
varying vec3 vDir;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uBottom;
uniform vec3 uSunDir;
uniform vec3 uSunColor;

void main() {
  vec3 dir = normalize(vDir);
  float h = dir.y;
  vec3 col = mix(uHorizon, uTop, smoothstep(0.0, 0.72, h));
  col = mix(uBottom, col, smoothstep(-0.25, 0.08, h));
  float sun = pow(max(0.0, dot(dir, normalize(uSunDir))), 72.0);
  float glow = pow(max(0.0, dot(dir, normalize(uSunDir))), 8.0);
  col += uSunColor * (sun * 1.15 + glow * 0.22);
  gl_FragColor = vec4(col, 1.0);
}
`;
