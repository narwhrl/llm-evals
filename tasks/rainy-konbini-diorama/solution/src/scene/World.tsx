/**
 * The scene.
 *
 * Everything is built from boxes: one geometry for the lit surfaces and a
 * second, slightly expanded copy that is drawn back face first to give every
 * silhouette a drawn contour. The wet road is a real mirror with a
 * translucent film of asphalt over it, so the signs and the shop light are
 * reflected in the tarmac.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { buildKonbini, SHOP } from "./konbini";
import { buildStreet, LAYOUT, SIGNAL } from "./street";
import { buildGeometry, buildOutlineGeometry } from "./voxel";
import {
  celMaterial,
  glowTexture,
  poolMaterial,
  glassMaterial,
  inkMaterial,
  neonMaterial,
  skyMaterial,
} from "./materials";
import { createPuddles, createRain } from "./rain";

const CAMERA = {
  fov: 33,
  azimuth: 0.68,
  elevation: 0.42,
  distance: 30,
  target: new THREE.Vector3(-0.2, 0.7, -0.3),
};

function sphericalPosition(
  target: THREE.Vector3,
  azimuth: number,
  elevation: number,
  distance: number,
): THREE.Vector3 {
  const horizontal = Math.cos(elevation) * distance;
  return new THREE.Vector3(
    target.x + horizontal * Math.sin(azimuth),
    target.y + Math.sin(elevation) * distance,
    target.z + horizontal * Math.cos(azimuth),
  );
}

export function World() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080c14);
    scene.fog = new THREE.Fog(0x0a1018, 26, 62);

    const camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200,
    );
    camera.position.copy(
      sphericalPosition(
        CAMERA.target,
        CAMERA.azimuth,
        CAMERA.elevation,
        CAMERA.distance,
      ),
    );

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(CAMERA.target);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.rotateSpeed = 0.7;
    controls.zoomSpeed = 0.9;
    controls.minDistance = 5;
    controls.maxDistance = 46;
    controls.minPolarAngle = 0.12;
    controls.maxPolarAngle = 1.46;
    controls.update();


    // ------------------------------------------------------------------ sky
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(80, 24, 16),
      skyMaterial(new THREE.Color(0x070a12), new THREE.Color(0x1b2433)),
    );
    sky.renderOrder = -10;
    scene.add(sky);

    // ---------------------------------------------------------------- light
    const moon = new THREE.DirectionalLight(0xa8c4ea, 1.4);
    moon.position.set(8, 19, 12);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -10;
    moon.shadow.camera.right = 10;
    moon.shadow.camera.top = 10;
    moon.shadow.camera.bottom = -10;
    moon.shadow.camera.near = 2;
    moon.shadow.camera.far = 60;
    moon.shadow.bias = -0.0028;
    scene.add(moon);
    scene.add(new THREE.HemisphereLight(0x3d5578, 0x10141d, 1.6));

    const interiorLight = new THREE.PointLight(0xffd6a0, 16, 4.6, 2);
    interiorLight.position.set(-1.8, 1.7, -4.2);
    scene.add(interiorLight);

    // Two more inside, so the far corners of the shop are lit too.
    const counterLight = new THREE.PointLight(0xffdcb0, 9, 3.4, 2);
    counterLight.position.set(1.1, 1.7, -4.1);
    scene.add(counterLight);

    const caseLight = new THREE.PointLight(0xffe2bc, 9, 3.4, 2);
    caseLight.position.set(-3.5, 1.7, -5.0);
    scene.add(caseLight);

    const signLight = new THREE.PointLight(0xfff0d2, 9, 5, 2);
    signLight.position.set(-1.6, 3.24, -2.62);
    scene.add(signLight);

    const vendingLight = new THREE.PointLight(0xcfe4ff, 9, 5, 2);
    vendingLight.position.set(2.3, 1.3, -5.2);
    scene.add(vendingLight);

    const alleyLight = new THREE.PointLight(0xffbe7a, 8, 4.5, 2);
    alleyLight.position.set(-5.15, 2.05, -4.0);
    scene.add(alleyLight);

    // The street lamps are drawn as a glowing bulb and a pool of light on
    // the wet ground rather than as a lamp that lights its own pole.
    const lampGlow = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: glowTexture(),
        color: 0xffd9a0,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    lampGlow.position.set(1.75, 3.78, -1.2);
    lampGlow.scale.set(1.3, 1.3, 1);
    scene.add(lampGlow);

    const parkGlow = lampGlow.clone();
    parkGlow.position.set(-6.65, 3.78, 3.7);
    const cornerGlow = lampGlow.clone();
    cornerGlow.position.set(5.45, 3.78, -1.0);
    const southGlow = lampGlow.clone();
    southGlow.position.set(5.3, 3.78, 5.0);
    scene.add(southGlow);
    scene.add(cornerGlow);
    parkGlow.scale.set(1.4, 1.4, 1);
    scene.add(parkGlow);

    const pool = (x: number, z: number, radius: number, color: number, y = 0.03) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(radius * 2.2, radius * 2.2),
        poolMaterial(
          new THREE.Vector2(x, z),
          radius,
          new THREE.Color(color),
          LAYOUT.half,
          1.6,
        ),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      mesh.renderOrder = 5;
      scene.add(mesh);
    };
    pool(1.75, -1.2, 3.1, 0x9a7440);
    pool(5.45, -1.0, 3.2, 0x9a7440);
    pool(5.3, 4.6, 3.4, 0x9a7440);
    pool(-5.2, 4.6, 4.4, 0xc08a45, 0.17);

    // ------------------------------------------------------- reflective road
    const mirror = new Reflector(new THREE.PlaneGeometry(14.2, 14.2), {
      color: 0x6d7889,
      textureWidth: 1024,
      textureHeight: 1024,
    });
    mirror.rotation.x = -Math.PI / 2;
    mirror.position.y = 0.005;
    mirror.renderOrder = -3;
    scene.add(mirror);

    // ----------------------------------------------------------- the geometry
    const ink = inkMaterial();
    const lit = celMaterial();

    const addSolid = (
      builder: Parameters<typeof buildGeometry>[0],
      material: THREE.Material,
      castsShadow = true,
    ) => {
      const mesh = new THREE.Mesh(buildGeometry(builder), material);
      mesh.castShadow = castsShadow;
      mesh.receiveShadow = true;
      scene.add(mesh);
      const outline = new THREE.Mesh(buildOutlineGeometry(builder), ink);
      outline.renderOrder = 1;
      scene.add(outline);
      return mesh;
    };

    const street = buildStreet();
    addSolid(street.builder, lit);

    // The asphalt is a translucent film over the mirror.
    const wetMaterial = celMaterial({ transparent: true, opacity: 0.52 });
    wetMaterial.depthWrite = false;
    const wetMesh = new THREE.Mesh(buildGeometry(street.wet), wetMaterial);
    wetMesh.renderOrder = 3;
    scene.add(wetMesh);

    const shop = buildKonbini();
    addSolid(shop.shell, lit);

    // The interior is lit from within, so it carries a warm emissive tint.
    // The room carries a warm base of its own, so surfaces that the ceiling
    // blocks from the moon still read instead of going flat black.
    const interiorMaterial = celMaterial({ emissive: 0x5c4220, emissiveIntensity: 1 });
    addSolid(shop.interior, interiorMaterial, false);

    const neon = neonMaterial();
    const neonMesh = new THREE.Mesh(buildGeometry(shop.neon), neon);
    scene.add(neonMesh);

    // ------------------------------------------------------------- the glass
    const glassMaterialFront = glassMaterial(new THREE.Color(0.4, 0.56, 0.68), 0.13, 0);
    const glassMesh = new THREE.Mesh(buildGeometry(shop.glass), glassMaterialFront);
    glassMesh.renderOrder = 6;
    scene.add(glassMesh);

    const doorMaterial = glassMaterial(new THREE.Color(0.42, 0.58, 0.68), 0.12, 3.1);
    const doorLeft = new THREE.Mesh(buildGeometry(shop.doorLeft), doorMaterial);
    const doorRight = new THREE.Mesh(buildGeometry(shop.doorRight), doorMaterial);
    doorLeft.renderOrder = 6;
    doorRight.renderOrder = 6;
    scene.add(doorLeft, doorRight);

    // ------------------------------------------------------- puddles and rain
    const puddles = createPuddles(street.puddles);
    scene.add(puddles.mesh);

    const rain = createRain({ half: 12, height: 14 }, 1300, new THREE.Color(0.72, 0.84, 1.0));
    scene.add(rain.lines, rain.drips);

    // ------------------------------------------------- the traffic signal
    const signalColors = [0xff3b30, 0xffb020, 0x2fe86a];
    const lenses = signalColors.map((color, index) => {
      const material = new THREE.MeshBasicMaterial({ color });
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.03),
        material,
      );
      mesh.position.set(
        SIGNAL.x,
        2.8 - index * 0.18,
        SIGNAL.z + 0.19,
      );
      scene.add(mesh);
      return mesh;
    });

    // ---------------------------------------------------------- the animation
    let doorOpen = 0;
    let doorTarget = 0;
    let doorTimer = 6;
    let signalPhase = 0;
    let signalIndex = 2;
    let flickerTimer = 3;

    const clock = { last: performance.now() / 1000, elapsed: 0 };
    let frame = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now() / 1000;
      const delta = Math.min(0.05, now - clock.last);
      clock.last = now;
      clock.elapsed += delta;
      const elapsed = clock.elapsed;

      // Rain and puddles.
      rain.update(elapsed, delta);
      puddles.update(elapsed);
      glassMaterialFront.uniforms.uTime.value = elapsed;
      doorMaterial.uniforms.uTime.value = elapsed;

      // The automatic door opens now and then.
      doorTimer -= delta;
      if (doorTimer <= 0) {
        doorTarget = doorTarget > 0.5 ? 0 : 1;
        doorTimer = doorTarget > 0.5 ? 4.5 + Math.random() * 3 : 9 + Math.random() * 14;
      }
      doorOpen += (doorTarget - doorOpen) * Math.min(1, delta * 2.4);
      const slide = doorOpen * 0.5;
      doorLeft.position.x = -slide;
      doorRight.position.x = slide;

      // The sign breathes and occasionally stutters.
      flickerTimer -= delta;
      if (flickerTimer <= 0) {
        flickerTimer = 4 + Math.random() * 9;
        neon.uniforms.uBrightness.value = 0.55 + Math.random() * 0.2;
      }
      const breathe = 1 + Math.sin(elapsed * 1.7) * 0.035;
      neon.uniforms.uBrightness.value +=
        (breathe - neon.uniforms.uBrightness.value) * Math.min(1, delta * 6);
      interiorLight.intensity = 24 + Math.sin(elapsed * 0.9) * 1.6;

      // The traffic signal changes over time.
      signalPhase += delta;
      if (signalPhase > 7.5) {
        signalPhase = 0;
        signalIndex = (signalIndex + 1) % 3;
      }
      lenses.forEach((lens, index) => {
        const material = lens.material as THREE.MeshBasicMaterial;
        const on = index === signalIndex;
        const target = on ? 1 : 0.12;
        material.color.setHex(signalColors[index]);
        material.color.multiplyScalar(target * (on ? 0.9 + Math.sin(elapsed * 9) * 0.08 : 1));
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(mount);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      controls.dispose();
      rain.dispose();
      puddles.dispose();
      mirror.dispose();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
      });
      ink.dispose();
      lit.dispose();
      neon.dispose();
      glassMaterialFront.dispose();
      doorMaterial.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="world" ref={mountRef} />;
}

export const SHOP_BOUNDS = SHOP;
export const STREET_BOUNDS = LAYOUT;
