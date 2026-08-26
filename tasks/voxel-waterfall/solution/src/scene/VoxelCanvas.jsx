import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { WATER_COLOR, WATERFALL_COLOR } from './constants.js';
import { generateWorld } from './generateWorld.js';
import { sampleLighting } from './lighting.js';
import { meshSolid, meshWater } from './mesher.js';

function SkyDome({ top, bottom }) {
  const mat = useRef();
  const geom = useMemo(() => new THREE.SphereGeometry(280, 32, 18), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          topColor: { value: new THREE.Color(top) },
          bottomColor: { value: new THREE.Color(bottom) },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 world = modelMatrix * vec4(position, 1.0);
            vWorldPosition = world.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y;
            float t = smoothstep(-0.2, 0.58, h);
            gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
          }
        `,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => {
    material.uniforms.topColor.value.set(top);
    material.uniforms.bottomColor.value.set(bottom);
  }, [top, bottom, material]);

  useEffect(
    () => () => {
      geom.dispose();
      material.dispose();
    },
    [geom, material],
  );

  return <mesh ref={mat} geometry={geom} material={material} />;
}

function Lights({ light, shadows }) {
  return (
    <>
      <ambientLight color={light.ambient} intensity={light.ambientIntensity} />
      <hemisphereLight
        args={[light.hemiSky, light.hemiGround, light.hemiIntensity]}
      />
      <directionalLight
        color={light.sunColor}
        intensity={light.sunIntensity}
        position={light.sunPos}
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={10}
        shadow-camera-far={260}
        shadow-camera-left={-90}
        shadow-camera-right={90}
        shadow-camera-top={90}
        shadow-camera-bottom={-90}
        shadow-bias={-0.0008}
      />
      <mesh position={light.sunPos}>
        <sphereGeometry args={[2.4, 16, 16]} />
        <meshBasicMaterial color={light.sunColor} />
      </mesh>
    </>
  );
}

function Terrain({ world, shadows }) {
  const geometry = useMemo(
    () => meshSolid(world),
    [world],
  );
  const material = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        vertexColors: true,
      }),
    [],
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  return <mesh geometry={geometry} material={material} castShadow={shadows} receiveShadow={shadows} />;
}

function WaterMesh({ world }) {
  const lake = useMemo(
    () => world.water.filter((v) => v.kind !== 'fall'),
    [world],
  );
  const fall = useMemo(
    () => world.water.filter((v) => v.kind === 'fall'),
    [world],
  );
  const lakeGeo = useMemo(
    () => meshWater(lake, world.size, WATER_COLOR, world.height),
    [lake, world.size, world.height],
  );
  const fallGeo = useMemo(
    () => meshWater(fall, world.size, WATERFALL_COLOR, world.height),
    [fall, world.size, world.height],
  );
  const lakeMat = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        depthWrite: true,
      }),
    [],
  );
  const fallMat = useMemo(
    () =>
      new THREE.MeshLambertMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.86,
        emissive: new THREE.Color('#2c6d80'),
        emissiveIntensity: 0.22,
        depthWrite: true,
      }),
    [],
  );

  useFrame(({ clock }) => {
    const pulse = 0.2 + Math.sin(clock.elapsedTime * 2.1) * 0.05;
    fallMat.emissiveIntensity = pulse;
  });

  useEffect(
    () => () => {
      lakeGeo.dispose();
      fallGeo.dispose();
      lakeMat.dispose();
      fallMat.dispose();
    },
    [lakeGeo, fallGeo, lakeMat, fallMat],
  );

  return (
    <group>
      <mesh geometry={lakeGeo} material={lakeMat} />
      <mesh geometry={fallGeo} material={fallMat} />
    </group>
  );
}

function CloudLayer({ world }) {
  const group = useRef();
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const slabs = world.clouds;

  useEffect(() => {
    const inst = mesh.current;
    if (!inst) return;
    for (let i = 0; i < slabs.length; i += 1) {
      const s = slabs[i];
      dummy.position.set(s.x - world.size / 2, s.y + s.sy / 2, s.z - world.size / 2);
      dummy.scale.set(s.sx, s.sy, s.sz);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  }, [dummy, slabs, world.size]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.position.x = Math.sin(t * 0.04) * 5;
    group.current.position.z = Math.cos(t * 0.03) * 2.5;
  });

  if (!slabs.length) return null;

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, slabs.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial color="#f4f6fa" transparent opacity={0.9} depthWrite />
      </instancedMesh>
    </group>
  );
}

function WaterfallDroplets({ path, speed }) {
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = Math.min(140, Math.max(40, Math.floor(path.length * 0.35)));

  useFrame(({ clock }) => {
    const inst = mesh.current;
    if (!inst || path.length < 2) return;
    const t = clock.elapsedTime * speed;
    for (let i = 0; i < count; i += 1) {
      const u = (i / count + t * 0.12) % 1;
      const idx = Math.floor(u * (path.length - 1));
      const p = path[idx];
      dummy.position.set(p.wx + ((i % 5) - 2) * 0.18, p.wy, p.wz);
      const s = 0.42 + (i % 4) * 0.08;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    }
    inst.instanceMatrix.needsUpdate = true;
  });

  if (path.length < 2) return null;

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1.15, 1]} />
      <meshLambertMaterial
        color="#b7f3ff"
        transparent
        opacity={0.7}
        emissive="#4aa0b8"
        emissiveIntensity={0.28}
      />
    </instancedMesh>
  );
}

function SceneRig({ settings, onReady, onStats }) {
  const worldKey = `${settings.seed}|${settings.mountainScale}|${settings.vegetation}|${settings.cloudDensity}|${settings.cloudHeight}`;
  const world = useMemo(
    () =>
      generateWorld({
        seed: settings.seed,
        mountainScale: settings.mountainScale,
        vegetation: settings.vegetation,
        cloudDensity: settings.cloudDensity,
        cloudHeight: settings.cloudHeight,
      }),
    [worldKey],
  );
  const light = useMemo(() => sampleLighting(settings.timeOfDay), [settings.timeOfDay]);
  const { gl } = useThree();

  useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = light.exposure;
  }, [gl, light.exposure]);

  useEffect(() => {
    onStats?.(world.stats);
    onReady?.();
  }, [world, onReady, onStats]);


  return (
    <>
      <fog attach="fog" args={[light.fog, 90, 90 + (1 / Math.max(0.002, settings.fogDensity)) * 1.35]} />
      <SkyDome top={light.skyTop} bottom={light.skyBottom} />
      <Lights light={light} shadows={settings.shadows} />
      <Terrain world={world} shadows={settings.shadows} />
      <WaterMesh world={world} />
      <CloudLayer world={world} />
      <WaterfallDroplets path={world.dropletPath} speed={settings.waterfallSpeed} />
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.06}
        autoRotate={settings.autoRotate}
        autoRotateSpeed={settings.rotateSpeed}
        target={[0, 22, -10]}
        minDistance={28}
        maxDistance={230}
        maxPolarAngle={Math.PI / 2.04}
      />
    </>
  );
}

export function VoxelCanvas({ settings, onReady, onStats }) {
  return (
    <Canvas
      shadows={settings.shadows}
      dpr={1}
      camera={{ position: [82, 40, 104], fov: 46, near: 0.4, far: 700 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.shadowMap.type = THREE.BasicShadowMap;
      }}
    >
      <SceneRig settings={settings} onReady={onReady} onStats={onStats} />
    </Canvas>
  );
}
