import * as THREE from "three";
import { Reflector } from "three/addons/objects/Reflector.js";
import { asphaltOverlayTex } from "../palette.js";

const rippleShader = {
  name: "RippleReflector",
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    uTime: { value: 0 },
  },
  vertexShader: `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    varying vec4 vUv;
    void main() {
      vec2 uv = vUv.xy / vUv.w;
      vec2 p = uv * 13.0;
      vec2 off = vec2(0.0);
      off.x = sin(p.y * 3.1 + uTime * 1.9) * 0.6 + sin(p.y * 7.7 - p.x * 5.3 + uTime * 2.7) * 0.4;
      off.y = sin(p.x * 3.7 - uTime * 1.6) * 0.6 + sin(p.x * 8.9 + p.y * 4.1 + uTime * 2.2) * 0.4;
      float d1 = distance(p, vec2(9.2, 8.4));
      float d2 = distance(p, vec2(4.5, 3.1));
      off.x += sin(d1 * 9.0 - uTime * 3.2) * 0.55 * exp(-d1 * 0.9);
      off.y += sin(d2 * 7.0 - uTime * 2.6) * 0.45 * exp(-d2 * 1.1);
      uv += off * 0.0035;
      vec4 base = texture2D(tDiffuse, uv);
      gl_FragColor = vec4(base.rgb * color, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

// 积水镜面 + 潮湿沥青镂空遮罩层
export function createPuddles(scene, worldSize = 34) {
  const reflector = new Reflector(new THREE.PlaneGeometry(worldSize - 0.4, worldSize - 0.4), {
    clipBias: 0.004,
    textureWidth: 1024,
    textureHeight: 1024,
    color: new THREE.Color(0x7d8896),
    shader: rippleShader,
  });
  reflector.rotation.x = -Math.PI / 2;
  reflector.position.y = 0.005;
  reflector.receiveShadow = false;
  scene.add(reflector);

  const overlayTex = asphaltOverlayTex(worldSize);
  const overlayMat = new THREE.MeshStandardMaterial({
    map: overlayTex,
    transparent: true,
    roughness: 0.24,
    metalness: 0.38,
    envMapIntensity: 0.9,
  });
  const overlay = new THREE.Mesh(new THREE.PlaneGeometry(worldSize, worldSize), overlayMat);
  overlay.rotation.x = -Math.PI / 2;
  overlay.position.y = 0.02;
  overlay.receiveShadow = true;
  scene.add(overlay);

  // 高台顶面湿光（无镜面）
  const plateauWet = new THREE.Mesh(
    new THREE.PlaneGeometry(20.7, 7.2),
    new THREE.MeshStandardMaterial({ color: 0x14181e, transparent: true, opacity: 0.28, roughness: 0.55, metalness: 0.08, envMapIntensity: 0.25 }),
  );
  plateauWet.rotation.x = -Math.PI / 2;
  plateauWet.position.set(-6.5, 1.222, -13.25);
  scene.add(plateauWet);

  return {
    update(t) {
      reflector.material.uniforms.uTime.value = t;
    },
  };
}
