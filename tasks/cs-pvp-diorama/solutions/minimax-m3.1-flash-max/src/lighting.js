import * as THREE from 'three';

/**
 * Cold rain-night lighting with warm tactical accents: a blue moon key, warm
 * sodium lamp, cold warehouse emergency strip, red back-room glow and the
 * police beacon alternating on the van.
 */
export function createLighting(scene, renderer) {
  const hemi = new THREE.HemisphereLight(0x3a5a8c, 0x0d1219, 1.25);
  scene.add(hemi);

  const moon = new THREE.DirectionalLight(0xa9c6ff, 4.4);
  moon.position.set(-15, 26, -13);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  const sc = moon.shadow.camera;
  sc.left = -24; sc.right = 24; sc.top = 24; sc.bottom = -24;
  sc.near = 1; sc.far = 80;
  moon.shadow.bias = -0.0006;
  moon.shadow.normalBias = 0.035;
  moon.target.position.set(0, 0, 0);
  scene.add(moon, moon.target);

  // warm fill from the south so the CT side keeps some shape
  const fill = new THREE.DirectionalLight(0x7f93c4, 0.95);
  fill.position.set(14, 12, 20);
  scene.add(fill);

  const lamp = new THREE.PointLight(0xffb257, 62, 22, 2);
  lamp.position.set(5.75, 3.9, -6.2);
  scene.add(lamp);

  const warehouse = new THREE.PointLight(0xd2e2ff, 48, 18, 2);
  warehouse.position.set(-10.4, 3.9, -9.6);
  scene.add(warehouse);

  const warehouse2 = new THREE.PointLight(0xc7d8ff, 18, 12, 2);
  warehouse2.position.set(-8.6, 2.9, -12.0);
  scene.add(warehouse2);

  const backGlow = new THREE.PointLight(0xff2f22, 12, 8, 2);
  backGlow.position.set(-11.9, 1.1, -12.8);
  scene.add(backGlow);

  const guard = new THREE.PointLight(0xffc074, 22, 11, 2);
  guard.position.set(11.6, 2.3, -8.7);
  scene.add(guard);

  const beaconRed = new THREE.PointLight(0xff3020, 0, 18, 2);
  beaconRed.position.set(-4.15, 2.6, 13.6);
  scene.add(beaconRed);

  const beaconBlue = new THREE.PointLight(0x3f7dff, 0, 18, 2);
  beaconBlue.position.set(-3.55, 2.6, 13.6);
  scene.add(beaconBlue);

  const search = new THREE.SpotLight(0xd9e8ff, 170, 34, 0.36, 0.5, 1.5);
  search.position.set(5.4, 3.7, 12.4);
  search.target.position.set(-1.5, 0, -1.5);
  scene.add(search, search.target);

  const alley = new THREE.PointLight(0x7fa0d8, 16, 16, 2);
  alley.position.set(-14.6, 3.2, 0.4);
  scene.add(alley);

  const BASE = {
    hemi: hemi.intensity,
    moon: moon.intensity,
    lamp: lamp.intensity,
    warehouse: warehouse.intensity,
    search: search.intensity,
  };

  const state = {
    hemi, moon, lamp, warehouse, backGlow, guard, beaconRed, beaconBlue, search,
    flash: 0,
  };

  state.update = (t, dt) => {
    // sodium lamp flicker
    const flick = 1 + Math.sin(t * 7.3) * 0.035 + Math.sin(t * 21.7) * 0.02;
    lamp.intensity = BASE.lamp * flick;

    // warehouse strip stutters faintly
    warehouse.intensity = BASE.warehouse * (1 + Math.sin(t * 3.1 + 1.2) * 0.06);

    // police beacon alternates
    const phase = (t * 0.9) % 2;
    const redOn = phase < 1 ? Math.max(0, Math.sin(phase * Math.PI)) : 0;
    const blueOn = phase >= 1 ? Math.max(0, Math.sin((phase - 1) * Math.PI)) : 0;
    beaconRed.intensity = redOn * 34;
    beaconBlue.intensity = blueOn * 30;

    // searchlight sweeps slowly across mid
    const sweep = Math.sin(t * 0.22);
    search.target.position.set(-1.5 + sweep * 3.2, 0, -1.5 - sweep * 2.4);
    search.intensity = BASE.search * (1 + Math.sin(t * 5.4) * 0.05);

    // lightning
    state.flash = Math.max(0, state.flash - dt * 3.4);
    const f = state.flash;
    hemi.intensity = BASE.hemi + f * 3.6;
    moon.intensity = BASE.moon + f * 5.0;
    scene.fog.color.setRGB(0.04 + f * 0.14, 0.055 + f * 0.16, 0.08 + f * 0.22);
  };

  state.strike = (amount = 1) => { state.flash = amount; };

  return state;
}

/**
 * Night sky dome with a city glow band; the lightning uniform brightens it.
 */
export function createSky(scene) {
  const geo = new THREE.SphereGeometry(420, 32, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      uTop: { value: new THREE.Color(0x02040a) },
      uHorizon: { value: new THREE.Color(0x0a1220) },
      uGlow: { value: new THREE.Color(0x18202f) },
      uFlash: { value: 0 },
    },
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `,
    fragmentShader: /* glsl */`
      uniform vec3 uTop, uHorizon, uGlow;
      uniform float uFlash;
      varying vec3 vDir;
      void main() {
        vec3 d = normalize( vDir );
        float h = clamp( d.y * 0.5 + 0.5, 0.0, 1.0 );
        vec3 c = mix( uHorizon, uTop, pow( h, 0.55 ) );
        c += uGlow * pow( max( 0.0, 1.0 - abs( d.y ) ), 7.0 ) * 0.38;
        c += uFlash * ( 0.25 + 0.75 * pow( max( d.y, 0.0 ), 0.4 ) ) * vec3( 0.7, 0.78, 1.0 );
        gl_FragColor = vec4( c, 1.0 );
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;
  scene.add(mesh);
  return {
    mesh,
    material: mat,
    update(flash) { mat.uniforms.uFlash.value = flash; },
  };
}

/**
 * Procedural night environment map: a gradient with a warm city band near the
 * horizon, giving wet surfaces something to reflect.
 */
export function createEnvironment(renderer) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#050810');
  g.addColorStop(0.42, '#0d1626');
  g.addColorStop(0.52, '#24324a');
  g.addColorStop(0.56, '#3a3a44');
  g.addColorStop(0.62, '#131a26');
  g.addColorStop(1.0, '#070a10');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 256);
  // a few warm window lights on the horizon
  const rnd = (() => { let s = 7; return () => (s = (s * 16807) % 2147483647) / 2147483647; })();
  for (let i = 0; i < 90; i++) {
    const x = rnd() * 512;
    const y = 118 + rnd() * 26;
    ctx.fillStyle = `rgba(${220 + rnd() * 30},${170 + rnd() * 60},${110 + rnd() * 60},${0.25 + rnd() * 0.5})`;
    ctx.fillRect(x, y, 1 + rnd() * 3, 1 + rnd() * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}
