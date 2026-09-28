import * as THREE from 'three';

// Colour pass (MSAA, HDR) + normal/depth pass, composited with an ink outline and tone mapping.
// Layer 0 = outlined geometry; layer 1 (NO_OUTLINE) = colour only.

const compositeShader = {
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = position.xy * 0.5 + 0.5;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tColor;
    uniform sampler2D tNormal;
    uniform sampler2D tDepth;
    uniform vec2 uTexel;
    uniform float uNear;
    uniform float uFar;
    uniform vec3 uInk;
    varying vec2 vUv;

    float viewZ(vec2 uv) {
      float d = texture2D(tDepth, uv).x;
      float ndc = d * 2.0 - 1.0;
      return 2.0 * uNear * uFar / (uFar + uNear - ndc * (uFar - uNear));
    }
    vec3 nrm(vec2 uv) { return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }

    void main() {
      vec4 col = texture2D(tColor, vUv);
      vec2 dx = vec2(uTexel.x, 0.0);
      vec2 dy = vec2(0.0, uTexel.y);
      // Laplacian of 1/z is ~0 on any plane regardless of slope, so grazing floors stay clean.
      float z = viewZ(vUv);
      float iz = 1.0 / z;
      float zl = 1.0 / viewZ(vUv - dx), zr = 1.0 / viewZ(vUv + dx);
      float zd = 1.0 / viewZ(vUv - dy), zu = 1.0 / viewZ(vUv + dy);
      float lap = abs(zl + zr + zd + zu - 4.0 * iz) / iz;
      float eDepth = smoothstep(0.012, 0.04, lap);
      vec3 n = nrm(vUv);
      float nd = max(max(1.0 - dot(n, nrm(vUv + dx)), 1.0 - dot(n, nrm(vUv - dx))),
                     max(1.0 - dot(n, nrm(vUv + dy)), 1.0 - dot(n, nrm(vUv - dy))));
      float eNormal = smoothstep(0.22, 0.5, nd);
      float edge = max(eDepth, eNormal);
      // thin out ink with distance so the far rim doesn't turn to mush
      edge *= mix(0.95, 0.55, smoothstep(40.0, 130.0, z));
      vec3 c = mix(col.rgb, uInk, edge);
      // gentle vignette keeps the eye on the base
      vec2 q = vUv - 0.5;
      c *= 1.0 - dot(q, q) * 0.55;
      gl_FragColor = vec4(c, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

export function createPipeline(renderer, scene, camera) {
  const size = new THREE.Vector2();
  const colorRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const depthTex = new THREE.DepthTexture(1, 1);
  depthTex.type = THREE.UnsignedIntType;
  const normalRT = new THREE.WebGLRenderTarget(1, 1, { depthTexture: depthTex, depthBuffer: true });
  const normalMat = new THREE.MeshNormalMaterial();
  const normalCam = new THREE.PerspectiveCamera();

  const quadGeo = new THREE.BufferGeometry();
  quadGeo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3));
  const compositeMat = new THREE.ShaderMaterial({
    ...compositeShader,
    uniforms: {
      tColor: { value: colorRT.texture },
      tNormal: { value: normalRT.texture },
      tDepth: { value: depthTex },
      uTexel: { value: new THREE.Vector2() },
      uNear: { value: camera.near },
      uFar: { value: camera.far },
      uInk: { value: new THREE.Color(0x05070c) },
    },
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(quadGeo, compositeMat);
  quad.frustumCulled = false;
  const quadScene = new THREE.Scene();
  quadScene.add(quad);
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const clear = new THREE.Color();

  function resize() {
    renderer.getDrawingBufferSize(size);
    const w = Math.max(1, Math.round(size.x));
    const h = Math.max(1, Math.round(size.y));
    colorRT.setSize(w, h);
    normalRT.setSize(w, h);
    compositeMat.uniforms.uTexel.value.set(1 / w, 1 / h);
    return { w, h };
  }

  function render() {
    renderer.setRenderTarget(colorRT);
    renderer.render(scene, camera);

    normalCam.copy(camera);
    normalCam.layers.set(0);
    const bg = scene.background;
    const fog = scene.fog;
    scene.background = null;
    scene.fog = null;
    scene.overrideMaterial = normalMat;
    renderer.getClearColor(clear);
    const alpha = renderer.getClearAlpha();
    renderer.setClearColor(0x8080ff, 1);
    renderer.setRenderTarget(normalRT);
    renderer.render(scene, normalCam);
    renderer.setClearColor(clear, alpha);
    scene.overrideMaterial = null;
    scene.background = bg;
    scene.fog = fog;

    renderer.setRenderTarget(null);
    renderer.render(quadScene, quadCam);
  }

  return { render, resize };
}
