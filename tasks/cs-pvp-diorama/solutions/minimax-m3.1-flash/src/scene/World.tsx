/**
 * The map.
 *
 * Everything is built from boxes: one geometry for the lit surfaces and a
 * second, slightly expanded copy that is drawn back face first to give every
 * silhouette a drawn contour. The wet ground is a real mirror with a
 * translucent film of asphalt over it, so the lamps, the signs and the
 * building outlines are reflected in the puddles.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { buildGround } from "./ground";
import { buildAlley, buildTinShed, buildWarehouse } from "./sites";
import { buildCTSpawn, buildMid, buildSewer, buildStreetFurniture, buildTSpawn } from "./corridors";
import { MAP } from "./layout";
import {
  celMaterial,
  glowTexture,
  inkMaterial,
  neonMaterial,
  poolMaterial,
  skyMaterial,
} from "./materials";
import { createPuddles, createRain } from "./rain";
import { buildGeometry, buildOutlineGeometry, type Builder } from "./voxel";

const CAMERA = {
  fov: 32,
  azimuth: 0.62,
  elevation: 0.68,
  distance: 30,
  target: new THREE.Vector3(-0.2, 0.4, -0.9),
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
    renderer.toneMappingExposure = 1.5;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const background = new THREE.Color(0x080b12);
    scene.background = background;
    scene.fog = new THREE.Fog(0x0a0e16, 30, 72);

    const camera = new THREE.PerspectiveCamera(
      CAMERA.fov,
      mount.clientWidth / mount.clientHeight,
      0.1,
      240,
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
    controls.rotateSpeed = 0.65;
    controls.zoomSpeed = 0.9;
    controls.minDistance = 6;
    controls.maxDistance = 52;
    controls.minPolarAngle = 0.12;
    controls.maxPolarAngle = 1.46;
    controls.update();

    // ------------------------------------------------------------------ sky
    const sky = new THREE.Mesh(
      new THREE.SphereGeometry(90, 24, 16),
      skyMaterial(new THREE.Color(0x05070c), new THREE.Color(0x121a28)),
    );
    sky.renderOrder = -10;
    scene.add(sky);

    // ---------------------------------------------------------------- light
    const moon = new THREE.DirectionalLight(0x8fa8cc, 1.55);
    moon.position.set(12, 20, 9);
    moon.castShadow = true;
    moon.shadow.mapSize.set(2048, 2048);
    moon.shadow.camera.left = -11;
    moon.shadow.camera.right = 11;
    moon.shadow.camera.top = 11;
    moon.shadow.camera.bottom = -11;
    moon.shadow.camera.near = 2;
    moon.shadow.camera.far = 60;
    moon.shadow.bias = -0.0026;
    scene.add(moon);

    // A cold rim light from behind, so the silhouette of the plinth separates
    // from the night behind it.
    const rim = new THREE.DirectionalLight(0x5c7fb5, 0.55);
    rim.position.set(-14, 7, -11);
    scene.add(rim);

    const hemi = new THREE.HemisphereLight(0x3d5478, 0x141b26, 1.9);
    scene.add(hemi);

    // The cold emergency lights inside the A warehouse.
    for (let i = 0; i < 3; i++) {
      const light = new THREE.PointLight(0xd6e6ff, 3.6, 7.5, 2);
      light.position.set(-5.6 + i * 1.3, 3.7, -2.85);
      scene.add(light);
    }
    // The warm broken fluorescent in the B gatehouse.
    const gateLight = new THREE.PointLight(0xffd08a, 5, 5.5, 2);
    gateLight.position.set(4.6, 2.3, -2.4);
    scene.add(gateLight);
    // The red glow leaking out of the back door of the warehouse.
    const backLight = new THREE.PointLight(0xff3020, 3, 3.4, 2);
    backLight.position.set(-4.56, 1.2, -4.05);
    scene.add(backLight);
    // The sodium street lamps.
    for (const [lx, lz] of [[-7.0, 2.2], [6.95, 3.0], [-6.95, -3.2], [6.75, -0.25]] as Array<[number, number]>) {
      const light = new THREE.PointLight(0xffb15c, 10, 9, 2);
      light.position.set(lx, 4.2, lz);
      scene.add(light);
    }
    // The searchlight on the counter-terrorist platform.
    const searchLight = new THREE.SpotLight(0xdfe9ff, 15, 18, 0.5, 0.62, 1.4);
    searchLight.position.set(4.8, 3.9, 3.7);
    searchLight.target.position.set(0.6, 0, 0.4);
    scene.add(searchLight, searchLight.target);
    // The lamp over the alley on the west flank.
    const alleyLight = new THREE.PointLight(0xffb15c, 6, 8, 2);
    alleyLight.position.set(-6.2, 2.6, 0.7);
    scene.add(alleyLight);
    // The work light on the counter-terrorist platform.
    const platformLight = new THREE.PointLight(0xffd08a, 7, 8, 2);
    platformLight.position.set(3.36, 3.7, 5.8);
    scene.add(platformLight);

    // The work light over the terrorist spawn.
    const spawnLight = new THREE.PointLight(0xffc070, 9, 9, 2);
    spawnLight.position.set(-1.5, 4.1, -5.4);
    scene.add(spawnLight);
    // A floodlight over the container stack in the terrorist spawn.
    const containerLight = new THREE.PointLight(0xbfd4f0, 8, 9, 2);
    containerLight.position.set(4.6, 4.2, -5.2);
    scene.add(containerLight);

    // The police van's light bar.
    const policeRed = new THREE.PointLight(0xff2a1e, 1.1, 6, 2);
    policeRed.position.set(-4.45, 3.1, 4.8);
    scene.add(policeRed);
    const policeBlue = new THREE.PointLight(0x2a55ff, 1.1, 6, 2);
    policeBlue.position.set(-3.6, 3.1, 4.8);
    scene.add(policeBlue);

    // ------------------------------------------------------- reflective ground
    const mirror = new Reflector(new THREE.PlaneGeometry(14.4, 14.4), {
      color: 0x66707f,
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

    const addSolid = (builder: Builder, material: THREE.Material, castsShadow = true) => {
      const mesh = new THREE.Mesh(buildGeometry(builder), material);
      mesh.castShadow = castsShadow;
      mesh.receiveShadow = true;
      scene.add(mesh);
      const outline = new THREE.Mesh(buildOutlineGeometry(builder), ink);
      outline.renderOrder = 1;
      scene.add(outline);
      return mesh;
    };

    const ground = buildGround();
    addSolid(ground.wet, celMaterial({ transparent: true, opacity: 0.55 }));
    const solid: Builder = ground.builder;
    const neon: Builder = {
      positions: [], normals: [], uvs: [], colors: [],
      oPositions: [], oNormals: [], oColors: [],
    };

    buildWarehouse(solid, neon);
    buildTinShed(solid, neon);
    buildMid(solid);
    buildSewer(solid);
    buildTSpawn(solid, neon);
    buildCTSpawn(solid, neon);
    buildAlley(solid, neon);
    buildStreetFurniture(solid, neon);
    addSolid(solid, lit);

    const neonMesh = new THREE.Mesh(buildGeometry(neon), neonMaterial());
    scene.add(neonMesh);

    // ------------------------------------------------------- puddles and rain
    const puddles = createPuddles(ground.puddles);
    scene.add(puddles.mesh);

    const rain = createRain({ half: 8.2, height: 15 }, 2200, new THREE.Color(0.7, 0.82, 1.0));
    scene.add(rain.lines, rain.drips);

    // ------------------------------------------------------------------ steam
    const steam = new THREE.Group();
    const steamTexture = glowTexture();
    for (const [sx, sy, sz] of [[-2.5, 2.6, -0.4], [6.5, 1.2, -0.3], [-0.6, 0.6, 3.4]] as Array<[number, number, number]>) {
      const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
          map: steamTexture,
          color: 0x9fb0c4,
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
        }),
      );
      sprite.position.set(sx, sy, sz);
      sprite.scale.set(1.2, 1.2, 1);
      steam.add(sprite);
    }
    scene.add(steam);

    // ------------------------------------------------------- the light pools
    const pool = (x: number, z: number, radius: number, color: number, y = 0.03) => {
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(radius * 2.2, radius * 2.2),
        poolMaterial(
          new THREE.Vector2(x, z),
          radius,
          new THREE.Color(color),
          MAP.half,
          1.5,
        ),
      );
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(x, y, z);
      mesh.renderOrder = 5;
      scene.add(mesh);
    };
    pool(-7.0, 2.2, 2.8, 0x8a5a26);
    pool(6.95, 3.0, 2.8, 0x8a5a26);
    pool(-6.95, -3.2, 2.6, 0x8a5a26);
    pool(6.75, -0.25, 2.4, 0x8a5a26);
    pool(0.4, 3.0, 2.2, 0x7a6534);
    pool(4.8, 3.7, 3.4, 0x5a6a80);
    pool(-1.5, -5.4, 2.6, 0x8a5a26, 0.92);
    pool(4.6, -5.2, 2.4, 0x4a5a70, 0.92);
    pool(3.4, 5.8, 1.8, 0x7a6534, 1.53);

    // ---------------------------------------------------------- the animation
    const clock = { last: performance.now() / 1000, elapsed: 0 };
    let frame = 0;
    let lightning = 0;
    let lightningTimer = 6 + Math.random() * 10;
    let policePhase = 0;
    let shutterShake = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const now = performance.now() / 1000;
      const delta = Math.min(0.05, now - clock.last);
      clock.last = now;
      clock.elapsed += delta;
      const elapsed = clock.elapsed;

      rain.update(elapsed, delta);
      puddles.update(elapsed);

      // The lamps sway and flicker with the rain.
      const sway = Math.sin(elapsed * 1.3) * 0.02 + Math.sin(elapsed * 7.1) * 0.008;
      moon.intensity = 1.55 + sway;
      searchLight.intensity = 15 + Math.sin(elapsed * 2.3) * 1.6 + sway * 12;
      gateLight.intensity = 5 + (Math.random() > 0.985 ? -2.6 : 0) + Math.sin(elapsed * 5.3) * 0.3;

      // The police light bar alternates.
      policePhase += delta;
      if (policePhase > 0.55) {
        policePhase = 0;
        const on = Math.random() > 0.5;
        policeRed.intensity = on ? 1.4 : 0.15;
        policeBlue.intensity = on ? 0.15 : 1.4;
      }

      // A distant flash of lightning.
      lightningTimer -= delta;
      if (lightningTimer <= 0) {
        lightningTimer = 8 + Math.random() * 18;
        lightning = 1;
      }
      if (lightning > 0) {
        lightning = Math.max(0, lightning - delta * 3.2);
        const flash = lightning * (0.6 + Math.random() * 0.4);
        hemi.intensity = 1.9 + flash * 2.6;
        background.setRGB(0.031 + flash * 0.12, 0.043 + flash * 0.14, 0.07 + flash * 0.2);
      }

      // The roller door shivers now and then.
      shutterShake = Math.max(0, shutterShake - delta * 2);
      if (Math.random() > 0.997) shutterShake = 1;

      // The steam drifts upward and fades.
      steam.children.forEach((sprite, index) => {
        const s = sprite as THREE.Sprite;
        const t = (elapsed * 0.32 + index * 0.37) % 1;
        s.position.y += 0;
        s.material.opacity = 0.2 * (1 - t) * (0.4 + t);
        const scale = 0.8 + t * 1.8;
        s.scale.set(scale, scale, 1);
        s.position.y = (s.userData.baseY ?? 0) + t * 1.6;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    // Remember where the steam started so it can rise from its vent.
    steam.children.forEach((sprite) => {
      sprite.userData.baseY = sprite.position.y;
    });
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
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="world" ref={mountRef} />;
}
