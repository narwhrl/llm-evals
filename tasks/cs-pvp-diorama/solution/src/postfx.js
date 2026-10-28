// Rendering pipeline: cel shading plus a post edge pass for the crisp ink line,
// and a planar mirror pass that feeds the wet-street shader.
//
// The outline pass rebuilds view depth from the colour pass depth buffer and
// differences both depth and view normals, so lines follow real silhouette
// edges at any zoom instead of being baked per-object.

import * as THREE from "three";

const QUAD_GEO = new THREE.PlaneGeometry(2, 2);
// The full-screen quad bypasses the matrices in its vertex shader, so it must
// opt out of frustum culling: at z = 0 it falls exactly on this camera's near
// plane and would otherwise be culled, leaving a black canvas.
const ORTHO_CAM = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

export class ToonRenderer {
  constructor(renderer, scene, camera) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;

    this.depthTex = new THREE.DepthTexture(1, 1);
    this.depthTex.type = THREE.UnsignedIntType;

    this.colorRT = new THREE.WebGLRenderTarget(1, 1, { depthTexture: this.depthTex });
    // The scene is tone-mapped and encoded into this target, so the final pass
    // reads display-ready values and must not encode them a second time.
    this.colorRT.texture.colorSpace = THREE.SRGBColorSpace;
    this.normalRT = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false });
    this.normalRT.texture.colorSpace = THREE.NoColorSpace;
    this.mirrorRT = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true });
    this.mirrorRT.texture.colorSpace = THREE.SRGBColorSpace;

    this.normalMat = new THREE.MeshNormalMaterial();

    this.uniforms = {
      uColor: { value: this.colorRT.texture },
      uNormal: { value: this.normalRT.texture },
      uDepth: { value: this.depthTex },
      uNear: { value: 0.1 },
      uFar: { value: 1000 },
      uViewParams: { value: new THREE.Vector2(1, 1) }, // aspect, tan(fov/2)
      uResolution: { value: new THREE.Vector2(1, 1) },
      uOutline: { value: 1.0 },
      uInk: { value: new THREE.Color(0x141a22) },
      uFlash: { value: 0 },
      uTint: { value: new THREE.Color(0x9fc0dd) },
    };

    this.outlineMat = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,
      fragmentShader: /* glsl */`
        uniform sampler2D uColor;
        uniform sampler2D uNormal;
        uniform sampler2D uDepth;
        uniform float uNear;
        uniform float uFar;
        uniform vec2 uViewParams;
        uniform vec2 uResolution;
        uniform float uOutline;
        uniform vec3 uInk;
        uniform float uFlash;
        uniform vec3 uTint;
        varying vec2 vUv;

        // Eye-space distance along -Z, in world units.
        float eyeDepth(vec2 uv) {
          float d = texture2D(uDepth, uv).x;
          float ndc = d * 2.0 - 1.0;
          return (2.0 * uNear * uFar) / (uFar + uNear - ndc * (uFar - uNear));
        }

        vec3 viewNormal(vec2 uv) {
          return normalize(texture2D(uNormal, uv).rgb * 2.0 - 1.0);
        }

        // Ray direction for this pixel in view space, used for the silhouette
        // (facing) term. Reconstructed from the projection parameters.
        vec3 viewDir(vec2 uv) {
          vec2 ndc = uv * 2.0 - 1.0;
          return normalize(vec3(ndc.x * uViewParams.x * uViewParams.y, ndc.y * uViewParams.y, -1.0));
        }

        float inkAmount() {
          vec2 px = 1.0 / uResolution;
          vec3 n = viewNormal(vUv);
          float d = eyeDepth(vUv);
          if (d >= uFar * 0.999) return 0.0; // sky

          // 1) Silhouette: lines where the surface turns away from the eye.
          float facing = abs(dot(n, viewDir(vUv)));
          float rim = 1.0 - smoothstep(0.10, 0.34, facing);

          // 2) Crease: averaged normal difference over the 8 neighbours.
          float crease = 0.0;
          // 3) Occlusion break: only large relative depth jumps, so gently
          //    sloped surfaces never trigger it.
          float jump = 0.0;
          for (int i = -1; i <= 1; i++) {
            for (int j = -1; j <= 1; j++) {
              if (i == 0 && j == 0) continue;
              vec2 o = vUv + vec2(float(i), float(j)) * px;
              crease += 1.0 - abs(dot(n, viewNormal(o)));
              jump = max(jump, abs(eyeDepth(o) - d) / max(d, 1e-3));
            }
          }
          crease /= 8.0;
          float creaseLine = smoothstep(0.02, 0.10, crease);
          float depthLine = smoothstep(0.03, 0.09, jump);

          return clamp(max(rim, max(creaseLine, depthLine)), 0.0, 1.0);
        }

        void main() {
          vec3 col = texture2D(uColor, vUv).rgb;
          float e = inkAmount();
          col = mix(col, uInk, e * uOutline * 0.92);
          // Depth haze keeps the far half of the base reading as rainy air.
          float dist = eyeDepth(vUv);
          float haze = smoothstep(70.0, 210.0, dist);
          col = mix(col, uTint * 0.42, haze * 0.22);
          col += uTint * uFlash * 0.30;
          float vig = smoothstep(0.52, 0.20, length(vUv - 0.5));
          col *= mix(1.0, 0.955, vig);
          gl_FragColor = vec4(col, 1.0);
          // uColor is sRGB-encoded, so three decodes it on read and every mix
          // above runs in linear space; encode once on the way out.
          #include <colorspace_fragment>
        }`,
    });

    this.quad = new THREE.Mesh(QUAD_GEO, this.outlineMat);
    this.quad.frustumCulled = false;
    this.quadScene = new THREE.Scene();
    this.quadScene.add(this.quad);
    this.frustumHelperCam = new THREE.PerspectiveCamera();
  }

  setSize(width, height, near, far) {
    const w = Math.max(2, Math.floor(width));
    const h = Math.max(2, Math.floor(height));
    this.colorRT.setSize(w, h);
    this.normalRT.setSize(w, h);
    this.mirrorRT.setSize(Math.max(2, w >> 1), Math.max(2, h >> 1));
    this.uniforms.uResolution.value.set(w, h);
    this.uniforms.uNear.value = near;
    this.uniforms.uFar.value = far;
  }

  // Render the scene into the mirror target from below the street plane, with
  // the wet street itself hidden so it cannot reflect itself.
  renderMirror(scene, groundMesh, extras, planeY, mirrorMatrixOut) {
    const cam = this.frustumHelperCam;
    cam.copy(this.camera);
    const p = cam.position;
    p.y = 2 * planeY - p.y;
    const target = new THREE.Vector3();
    this.camera.getWorldDirection(target);
    target.y = -target.y;
    cam.up.set(0, -1, 0);
    cam.lookAt(p.clone().add(target));
    cam.near = this.camera.near;
    cam.far = this.camera.far;
    cam.updateProjectionMatrix();
    cam.updateMatrixWorld(true);

    groundMesh.visible = false;
    const hidden = [];
    for (const o of extras) if (o.visible) { o.visible = false; hidden.push(o); }

    this.renderer.setRenderTarget(this.mirrorRT);
    this.renderer.clear();
    this.renderer.render(scene, cam);
    this.renderer.setRenderTarget(null);

    groundMesh.visible = true;
    for (const o of hidden) o.visible = true;

    const bias = new THREE.Matrix4().set(
      0.5, 0.0, 0.0, 0.5,
      0.0, 0.5, 0.0, 0.5,
      0.0, 0.0, 0.5, 0.5,
      0.0, 0.0, 0.0, 1.0,
    );
    const pv = new THREE.Matrix4().multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    mirrorMatrixOut.multiplyMatrices(bias, pv);
    return cam;
  }

  render({ flash = 0, outline = 1 }) {
    const r = this.renderer;
    this.uniforms.uFlash.value = flash;
    this.uniforms.uOutline.value = outline;

    r.setRenderTarget(this.colorRT);
    r.clear();
    r.render(this.scene, this.camera);

    const prev = this.scene.overrideMaterial;
    this.scene.overrideMaterial = this.normalMat;
    r.setRenderTarget(this.normalRT);
    r.clear();
    r.render(this.scene, this.camera);
    this.scene.overrideMaterial = prev;

    r.setRenderTarget(null);
    r.render(this.quadScene, ORTHO_CAM);
  }

  dispose() {
    this.colorRT.dispose();
    this.normalRT.dispose();
    this.mirrorRT.dispose();
    this.normalMat.dispose();
    this.outlineMat.dispose();
    this.depthTex.dispose();
  }
}
