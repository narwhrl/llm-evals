import * as THREE from 'three';

/**
 * Minimal post pipeline: the scene is rendered into a linear HDR target, a
 * small bloom is extracted for the lamps and beacons, and the composite pass
 * applies the filmic curve, the cool grade and the vignette.
 */
export function createPipeline(renderer, scene, camera) {
  const quadGeo = new THREE.PlaneGeometry(2, 2);
  const quadScene = new THREE.Scene();
  const quadCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const quad = new THREE.Mesh(quadGeo, null);
  quad.frustumCulled = false;
  quadScene.add(quad);

  let width = 1, height = 1;
  let sceneRT = null;
  let bloomA = null;
  let bloomB = null;

  const brightMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      uThreshold: { value: 0.62 },
    },
    vertexShader: VERT,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform float uThreshold;
      varying vec2 vUv;
      void main() {
        vec3 c = texture2D( tDiffuse, vUv ).rgb;
        float lum = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
        float k = smoothstep( uThreshold, uThreshold + 0.55, lum );
        gl_FragColor = vec4( c * k, 1.0 );
      }
    `,
  });

  const blurMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      uDir: { value: new THREE.Vector2(1, 0) },
      uTexel: { value: new THREE.Vector2(1 / 512, 1 / 512) },
    },
    vertexShader: VERT,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform vec2 uDir;
      uniform vec2 uTexel;
      varying vec2 vUv;
      void main() {
        vec2 o = uDir * uTexel;
        vec3 c = texture2D( tDiffuse, vUv ).rgb * 0.2270270270;
        c += texture2D( tDiffuse, vUv + o * 1.3846153846 ).rgb * 0.3162162162;
        c += texture2D( tDiffuse, vUv - o * 1.3846153846 ).rgb * 0.3162162162;
        c += texture2D( tDiffuse, vUv + o * 3.2307692308 ).rgb * 0.0702702703;
        c += texture2D( tDiffuse, vUv - o * 3.2307692308 ).rgb * 0.0702702703;
        gl_FragColor = vec4( c, 1.0 );
      }
    `,
  });

  const compositeMat = new THREE.ShaderMaterial({
    uniforms: {
      tDiffuse: { value: null },
      tBloom: { value: null },
      uBloom: { value: 0.85 },
      uVignette: { value: 0.62 },
      uExposure: { value: 1.3 },
      uTime: { value: 0 },
    },
    vertexShader: VERT,
    fragmentShader: /* glsl */`
      uniform sampler2D tDiffuse;
      uniform sampler2D tBloom;
      uniform float uBloom;
      uniform float uVignette;
      uniform float uExposure;
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vec3 col = texture2D( tDiffuse, vUv ).rgb * uExposure;
        col += texture2D( tBloom, vUv ).rgb * uBloom;

        // filmic roll-off keeps the highlights from clipping flat
        col = ( col * ( 2.51 * col + 0.03 ) ) / ( col * ( 2.43 * col + 0.59 ) + 0.14 );

        // cool industrial grade with a faint warm lift in the shadows
        col *= vec3( 0.94, 1.0, 1.09 );
        col += vec3( 0.012, 0.010, 0.02 ) * ( 1.0 - smoothstep( 0.0, 0.35, length( col ) ) );

        vec2 q = vUv - 0.5;
        float vig = 1.0 - dot( q, q ) * uVignette;
        col *= clamp( vig, 0.0, 1.0 );

        gl_FragColor = vec4( col, 1.0 );
        #include <colorspace_fragment>
      }
    `,
  });

  function setSize(w, h) {
    width = w; height = h;
    if (sceneRT) { sceneRT.dispose(); bloomA.dispose(); bloomB.dispose(); }
    const dpr = renderer.getPixelRatio();
    const pw = Math.floor(w * dpr), ph = Math.floor(h * dpr);
    sceneRT = new THREE.WebGLRenderTarget(pw, ph, {
      type: THREE.HalfFloatType,
      samples: 4,
      depthBuffer: true,
    });
    const bw = Math.max(2, Math.floor(pw / 4));
    const bh = Math.max(2, Math.floor(ph / 4));
    bloomA = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType, depthBuffer: false });
    bloomB = new THREE.WebGLRenderTarget(bw, bh, { type: THREE.HalfFloatType, depthBuffer: false });
    blurMat.uniforms.uTexel.value.set(1 / bw, 1 / bh);
  }

  function blit(material, target) {
    quad.material = material;
    renderer.setRenderTarget(target);
    renderer.clear();
    renderer.render(quadScene, quadCam);
  }

  function render(time) {
    renderer.setRenderTarget(sceneRT);
    renderer.clear();
    renderer.render(scene, camera);

    brightMat.uniforms.tDiffuse.value = sceneRT.texture;
    blit(brightMat, bloomA);

    blurMat.uniforms.tDiffuse.value = bloomA.texture;
    blurMat.uniforms.uDir.value.set(1, 0);
    blit(blurMat, bloomB);

    blurMat.uniforms.tDiffuse.value = bloomB.texture;
    blurMat.uniforms.uDir.value.set(0, 1);
    blit(blurMat, bloomA);

    compositeMat.uniforms.tDiffuse.value = sceneRT.texture;
    compositeMat.uniforms.tBloom.value = bloomA.texture;
    compositeMat.uniforms.uTime.value = time;
    quad.material = compositeMat;
    renderer.setRenderTarget(null);
    renderer.render(quadScene, quadCam);
  }

  setSize(renderer.domElement.width, renderer.domElement.height);
  return {
    render,
    setSize,
    get sceneTarget() { return sceneRT; },
    materials: { composite: compositeMat, bright: brightMat, blur: blurMat },
  };
}

const VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4( position.xy, 0.0, 1.0 );
  }
`;
