import * as THREE from "three";

const portalDefinitions = [
  { x: 1.35, y: 1.64, radius: 1.025, opening: 0.57, pitch: 0.025, scale: 2.5 },
  { x: -3.12, y: 1.46, radius: 0.405, opening: 0.47, pitch: -0.18, scale: 2.3 },
  { x: -1.35, y: 1.68, radius: 0.405, opening: 0.53, pitch: 0.10, scale: 2.2 },
];

export function createEnvironment(scene, renderer) {
  const loader = new THREE.TextureLoader();
  const textures = {};
  for (const [key, file] of Object.entries({ day: "earth-day.jpg", night: "earth-night.jpg", clouds: "earth-clouds.jpg" })) {
    textures[key] = loader.load(`${import.meta.env.BASE_URL}assets/${file}`);
    textures[key].colorSpace = key === "clouds" ? THREE.NoColorSpace : THREE.SRGBColorSpace;
    textures[key].anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
  const earthScene = new THREE.Scene();
  earthScene.background = new THREE.Color("#020913");
  const earth = new THREE.Group();
  earth.rotation.set(0.12, -1.60, -0.18);
  earthScene.add(earth);
  const earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      dayMap: { value: textures.day }, nightMap: { value: textures.night }, cloudMap: { value: textures.clouds },
      orbit: { value: 0.18 }, rotation: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * vec4(vPosition, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D dayMap;
      uniform sampler2D nightMap;
      uniform sampler2D cloudMap;
      uniform float orbit;
      uniform float rotation;
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec2 uv = vec2(fract(vUv.x + rotation), vUv.y);
        vec2 cloudUv = vec2(fract(vUv.x + rotation * 1.1 + 0.025), vUv.y);
        vec3 day = texture2D(dayMap, uv).rgb;
        vec3 night = texture2D(nightMap, uv).rgb;
        float clouds = texture2D(cloudMap, cloudUv).r;
        float phase = orbit * 6.28318530718;
        float daylight = smoothstep(-0.28, 0.35, cos(phase));
        vec3 oceanDay = day * vec3(0.48, 0.76, 1.15) + vec3(0.012, 0.045, 0.11);
        vec3 oceanNight = night * vec3(7.2, 5.4, 2.6) + vec3(0.004, 0.010, 0.029);
        vec3 color = mix(oceanNight, oceanDay * 1.1, daylight);
        color += clouds * mix(vec3(0.008, 0.02, 0.04), vec3(0.64, 0.73, 0.78), daylight);
        vec3 viewDir = normalize(-vPosition);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
        color += vec3(0.04, 0.22, 0.54) * fresnel * (0.65 + daylight * 0.55);
        gl_FragColor = vec4(color, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `,
  });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(2.76, 112, 72), earthMaterial);
  earth.add(globe);
  const atmosphere = new THREE.Mesh(
    new THREE.SphereGeometry(2.84, 80, 48),
    new THREE.ShaderMaterial({
      uniforms: { glow: { value: new THREE.Color("#459cdf") } },
      vertexShader: `varying vec3 vNormal; varying vec3 vPosition;
        void main(){vNormal=normalize(normalMatrix*normal);vPosition=(modelViewMatrix*vec4(position,1.)).xyz;gl_Position=projectionMatrix*vec4(vPosition,1.);}`,
      fragmentShader: `uniform vec3 glow; varying vec3 vNormal; varying vec3 vPosition;
        void main(){float f=pow(1.-max(dot(normalize(vNormal),normalize(-vPosition)),0.),3.1);gl_FragColor=vec4(glow,f*.78);}`,
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.FrontSide,
    }),
  );
  earth.add(atmosphere);
  const portalMeshes = portalDefinitions.map((definition) => {
    const renderTarget = new THREE.WebGLRenderTarget(768, 768, { type: THREE.HalfFloatType });
    const portalCamera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    portalCamera.position.set(definition.x * 0.18, definition.y * 0.18, 9);
    portalCamera.lookAt(0, 0, 0);
    const material = new THREE.MeshBasicMaterial({ map: renderTarget.texture, toneMapped: false });
    const object = new THREE.Mesh(new THREE.CircleGeometry(definition.radius * 0.97, 96), material);
    object.name = `Earth portal ${definition.x}`;
    object.position.set(definition.x, definition.y, -2.045);
    object.renderOrder = 2;
    scene.add(object);
    return { object, definition, material, renderTarget, portalCamera };
  });

  const ambient = new THREE.HemisphereLight("#e5eadb", "#253c4c", 1.0);
  scene.add(ambient);
  const key = new THREE.DirectionalLight("#fff0d2", 2.4);
  key.position.set(0.3, 8, -5.5);
  key.target.position.set(0, 0.1, 0.7);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -7; key.shadow.camera.right = 7;
  key.shadow.camera.top = 6; key.shadow.camera.bottom = -5;
  key.shadow.camera.near = 0.1; key.shadow.camera.far = 25;
  key.shadow.bias = -0.00035; key.shadow.normalBias = 0.025; key.shadow.radius = 1;
  scene.add(key, key.target);
  const fill = new THREE.DirectionalLight("#b4d3de", 0.65);
  fill.position.set(-4, 6, 7); scene.add(fill);
  const cabinLight = new THREE.PointLight("#ffe2ad", 3.1, 11, 1.25);
  cabinLight.position.set(0, 3.8, 1.4); scene.add(cabinLight);
  const stripLight = new THREE.PointLight("#ffd9a0", 1.6, 7.5, 1.2);
  stripLight.position.set(0.3, 0.42, 0.48); scene.add(stripLight);
  const earthRim = new THREE.PointLight("#609ee8", 2.5, 5, 1.3);
  earthRim.position.set(1.35, 1.64, -1.89); scene.add(earthRim);
  const floorBounce = new THREE.PointLight("#abc7c4", 0.7, 6, 1.2);
  floorBounce.position.set(0, 1.5, 2.7); scene.add(floorBounce);

  const patchMaterial = new THREE.ShaderMaterial({
    uniforms: { strength: { value: 0 }, warmth: { value: new THREE.Color("#fff0ce") } },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
    fragmentShader: `uniform float strength;uniform vec3 warmth;varying vec2 vUv;
      void main(){float d=length((vUv-.5)*2.);float a=1.-smoothstep(.91,.96,d);gl_FragColor=vec4(warmth,a*strength*.60);}`,
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1,
  });
  const patch = new THREE.Mesh(new THREE.CircleGeometry(0.69, 96), patchMaterial);
  patch.rotation.x = -Math.PI / 2;
  patch.scale.y = 1.34;
  patch.position.set(1.0, 0.049, 0.43);
  scene.add(patch);

  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  let value = 29;
  const rand = () => { value = value * 16807 % 2147483647; return value / 2147483647; };
  for (let i = 0; i < 500; i++) starPositions.push((rand() - 0.5) * 130, (rand() - 0.3) * 80, -30 - rand() * 45);
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: "#82969f", size: 0.035, transparent: true, opacity: 0.58, sizeAttenuation: true }));
  scene.add(stars);
  const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(13, 9), new THREE.ShadowMaterial({ color: "#000308", opacity: 0.24 }));
  shadowPlane.rotation.x = -Math.PI / 2; shadowPlane.position.set(0, -0.43, -0.15); shadowPlane.receiveShadow = true; scene.add(shadowPlane);

  return {
    textures, globe, ambient, key, fill, cabinLight, stripLight, earthRim, portalMeshes,
    update(orbit, elapsed, stripOn) {
      const phase = orbit * Math.PI * 2;
      const daylight = THREE.MathUtils.smoothstep(Math.cos(phase), -0.28, 0.35);
      earthMaterial.uniforms.orbit.value = orbit;
      earthMaterial.uniforms.rotation.value = elapsed * 0.0042;
      earth.rotation.y = -1.60 + elapsed * 0.008;
      ambient.intensity = 0.33 + daylight * 0.85;
      ambient.color.set(daylight > 0.5 ? "#e5eadb" : "#a0b5cb");
      key.intensity = daylight * 3.5;
      fill.intensity = 0.27 + daylight * 0.55;
      cabinLight.intensity = stripOn ? (1.7 + daylight * 1.4) : 0.10;
      stripLight.intensity = stripOn ? 1.65 : 0;
      earthRim.intensity = 1.1 + (1 - daylight) * 2.1;
      floorBounce.intensity = stripOn ? 0.60 : 0.18;
      patchMaterial.uniforms.strength.value = daylight;
      patch.position.z = 0.12 + Math.sin(phase) * 0.65;
      patch.position.x = 0.8 + Math.cos(phase) * 0.45;
      return daylight;
    },
    renderPortals() {
      renderer.setRenderTarget(null);
      for (const { renderTarget, portalCamera } of portalMeshes) {
        renderer.setRenderTarget(renderTarget);
        renderer.render(earthScene, portalCamera);
      }
      renderer.setRenderTarget(null);
    },
  };
}
