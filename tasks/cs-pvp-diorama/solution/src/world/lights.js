// All scene lighting + practical-light animation (flicker, sweep, flash).
import * as THREE from 'three';
import { glowTexture } from '../core/textures.js';

// Fake volumetric beam: additive cone, bright at the head, fading out.
function beamMesh(color = 0xd8e8ff) {
  const geo = new THREE.ConeGeometry(3.2, 16, 20, 1, true);
  geo.rotateX(Math.PI / 2); // apex +z, base -z
  geo.translate(0, 0, -8); // apex at origin, base 16 units toward -z
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: { uColor: { value: new THREE.Color(color) } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float a = vUv.y * 0.16 * smoothstep( 0.0, 0.15, vUv.y );
        gl_FragColor = vec4( uColor, a );
      }
    `,
  });
  const m = new THREE.Mesh(geo, mat);
  m.renderOrder = 12;
  return m;
}

function glowSprite(scene, tex, color, x, y, z, scale) {
  const mat = new THREE.SpriteMaterial({
    map: tex,
    color,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.85,
  });
  const s = new THREE.Sprite(mat);
  s.position.set(x, y, z);
  s.scale.setScalar(scale);
  s.renderOrder = 13;
  scene.add(s);
  return s;
}

export function buildLights(ctx) {
  const { scene } = ctx;
  const glowTex = glowTexture();

  // --- base ambience: cold rainy night ---------------------------------------
  const hemi = new THREE.HemisphereLight(0x3a4c6e, 0x181c22, 1.9);
  scene.add(hemi);
  const moon = new THREE.DirectionalLight(0x9db8e8, 2.3);
  moon.position.set(24, 48, 34);
  moon.castShadow = true;
  moon.shadow.mapSize.set(ctx.quality.shadow, ctx.quality.shadow);
  moon.shadow.camera.left = -52;
  moon.shadow.camera.right = 52;
  moon.shadow.camera.top = 52;
  moon.shadow.camera.bottom = -52;
  moon.shadow.camera.near = 10;
  moon.shadow.camera.far = 130;
  moon.shadow.bias = -0.0015;
  moon.shadow.normalBias = 0.03;
  scene.add(moon);

  // --- A warehouse: cold white interior + red rear glow ------------------------
  const a1 = new THREE.PointLight(0xcfe4ff, 22, 16, 2);
  a1.position.set(-20, 5.3, -12);
  const a2 = new THREE.PointLight(0xcfe4ff, 18, 16, 2);
  a2.position.set(-20, 5.3, -20);
  const aRed = new THREE.PointLight(0xff2a1e, 4, 6, 2);
  aRed.position.set(-26, 1.4, -24.2);
  scene.add(a1, a2, aRed);

  // cold spill at the warehouse shutter gap + warm spill at the B guard door
  const spillA = glowSprite(scene, glowTex, 0xcfe4ff, -21, 1.6, -7.6, 3.0);
  spillA.material.opacity = 0.28;
  // cold work lamp above the A shutter
  const aWork = new THREE.PointLight(0xd6e8ff, 16, 15, 2);
  aWork.position.set(-21, 5.6, -5.6);
  scene.add(aWork);
  const aWorkHalo = glowSprite(scene, glowTex, 0xd6e8ff, -21, 5.7, -6.2, 1.7);
  aWorkHalo.material.opacity = 0.6;
  const spillB = glowSprite(scene, glowTex, 0xffb85c, 19.2, 1.3, -10.4, 2.2);
  spillB.material.opacity = 0.3;

  // --- B guard room: warm broken fluorescent -----------------------------------
  const bWarm = new THREE.PointLight(0xffb85c, 24, 12, 2);
  bWarm.position.set(22, 2.7, -15.5);
  scene.add(bWarm);
  // faint warm spill from the 2F window
  const bWin = new THREE.PointLight(0xffb85c, 3, 7, 2);
  bWin.position.set(28.8, 5.2, -16.6);
  scene.add(bWin);

  // --- street lamp at the B corner (warm halo in the rain) ----------------------
  const lamp = new THREE.PointLight(0xffab4e, 30, 20, 2);
  lamp.position.set(14.2, 4.25, -3.1);
  scene.add(lamp);
  const lampHalo = glowSprite(scene, glowTex, 0xffab4e, 14.28, 4.35, -3.1, 3.2);

  // --- T spawn floodlight (cold) --------------------------------------------------
  const tFlood = new THREE.PointLight(0xbfd9f2, 26, 24, 2);
  tFlood.position.set(0, 4.4, -32);
  scene.add(tFlood);
  glowSprite(scene, glowTex, 0xbfd9f2, 0, 3.4, -34.2, 2.2);

  // --- CT badge wall cold lamp ------------------------------------------------------
  const ctLamp = new THREE.PointLight(0xbfd9f2, 7, 12, 2);
  ctLamp.position.set(0, 3.3, 33.6);
  scene.add(ctLamp);

  // --- searchlight spot on the CT platform -------------------------------------------
  const spot = new THREE.SpotLight(0xd8e8ff, 55, 46, 0.26, 0.45, 1.6);
  const spotTarget = new THREE.Object3D();
  if (ctx.searchlight) {
    ctx.searchlight.add(spot, spotTarget);
    spot.position.set(0, 0.85, 0);
    spotTarget.position.set(0, 0.55, -12);
    spot.target = spotTarget;
  }
  const spotHalo = glowSprite(scene, glowTex, 0xd8e8ff, 0, 0, 0, 1.6);
  spotHalo.visible = false;
  if (ctx.searchlight) {
    spotHalo.visible = true;
    spotHalo.position.set(0, 0.85, -0.4);
    ctx.searchlight.add(spotHalo);
    // volumetric beam cone, apex at the drum, opening toward -z (the aim)
    const beam = beamMesh();
    beam.rotation.x = -0.18; // match drum pitch
    beam.position.set(0, 0.85, 0);
    ctx.searchlight.add(beam);
  }

  // --- police van light bar: slow alternating red/blue ---------------------------------
  let vanR = null;
  let vanB = null;
  let vanRGlow = null;
  let vanBGlow = null;
  if (ctx.vanLightAnchor) {
    vanR = new THREE.PointLight(0xff3020, 0, 9, 2);
    vanR.position.copy(ctx.vanLightAnchor.red).y += 0.4;
    vanB = new THREE.PointLight(0x3060ff, 0, 9, 2);
    vanB.position.copy(ctx.vanLightAnchor.blue).y += 0.4;
    scene.add(vanR, vanB);
    vanRGlow = glowSprite(scene, glowTex, 0xff3020, vanR.position.x, vanR.position.y, vanR.position.z, 1.4);
    vanBGlow = glowSprite(scene, glowTex, 0x3060ff, vanB.position.x, vanB.position.y, vanB.position.z, 1.4);
  }

  const rig = {
    hemi,
    moon,
    update(t) {
      // street lamp: breathing flicker with rare deep dropout
      const drop = Math.sin(t * 0.61 + 2.0) > 0.994 ? 0.35 : 1;
      lamp.intensity = 30 * (0.86 + 0.14 * Math.sin(t * 7.3) * Math.sin(t * 2.1)) * drop;
      lampHalo.material.opacity = 0.7 * (lamp.intensity / 30);
      // searchlight shimmer
      spot.intensity = 55 * (0.92 + 0.08 * Math.sin(t * 9.7));
      // guard room fluorescent: hard flicker synced feel
      bWarm.intensity = 24 * (Math.sin(t * 13) > -0.85 ? 1 : 0.3);
      // van light bar
      if (vanR) {
        const phase = Math.sin(t * 2.2);
        vanR.intensity = phase > 0 ? 7 : 0;
        vanB.intensity = phase > 0 ? 0 : 7;
        vanRGlow.visible = phase > 0;
        vanBGlow.visible = phase <= 0;
      }
    },
  };
  return rig;
}
