import * as THREE from 'three';
import { GeometryBuilder, ORIGIN, TAU, type V3 } from '../core/builder';
import { atmosphere, updateAtmosphere, windTime } from '../core/atmosphere';
import { createRng, SimplexNoise } from '../core/noise';
import { createBirdTexture, createNoiseTexture, createPlazaTexture, createPuffTexture } from '../core/textures';
import { createIsland, createTerrainMaterial, type Basin, type Island, type IslandOptions, type Notch } from './island';
import { createFoliageMaterials, createMaterials, createWaterMaterial } from './materials';
import { bakeSkyEnvironment, createSky } from './sky';
import { IVORY, STONE, architrave, column, facing, polar } from './stonework';
import {
  buildBelvedere,
  buildFallenDrums,
  buildObelisk,
  buildObservatory,
  buildPavilion,
  buildRuinedTower,
  buildStoa,
  buildStoneCircle,
  buildWalkway,
} from './architecture';
import { createSundial } from './sundial';
import { buildBridge, type BridgeOptions } from './bridges';
import { Vegetation, scatterPlants } from './vegetation';
import { createPond, createWaterfall, waterfallMist, waterfallTime } from './water';
import { CLOUD_SEA_LEVEL, PuffField, createCloudSea, cumulus, type Puff } from './clouds';
import { createFarLands } from './farLands';
import { FloatingDebris, MASONRY, createDebrisKinds } from './debris';
import { Flock } from './birds';

const DEG = Math.PI / 180;
// Bearings are measured around the zenith, from -Z toward +X.
/** Off to screen-left and in front, so the sun models the architecture instead of flattening it. */
const SUN_BEARING = 95 * DEG;
const SUN_HEIGHT = 27 * DEG;

export interface Realm {
  readonly scene: THREE.Scene;
  /** World-space points the default view has to hold on screen. */
  readonly cameraPoints: THREE.Vector3[];
  /** Where the default view is aimed. */
  readonly target: THREE.Vector3;
  update(time: number, camera: THREE.Camera): void;
}

interface Site {
  readonly island: Island;
  readonly position: THREE.Vector3;
  readonly frame: THREE.Matrix4;
}

/** A pool on an island's meadow and the waterfall that drains it over the cliff edge. */
interface Fall {
  angle: number;
  reach: number;
  radius: number;
  depth: number;
  drop: number;
  width: number;
}

function pools(...falls: Fall[]): Pick<IslandOptions, 'basins' | 'notches'> {
  const basins: Basin[] = [];
  const notches: Notch[] = [];
  for (const { angle, reach, radius, depth } of falls) {
    basins.push({ angle, reach, radius, depth });
    // The notch is cut a good deal wider than the pool, so the sheet of water clears both of its walls.
    notches.push({ angle, width: 0.09 + radius * 0.0022, depth: depth * 0.66 });
  }
  return { basins, notches };
}

export function createRealm(renderer: THREE.WebGLRenderer): Realm {
  const random = createRng(20261123);
  const scene = new THREE.Scene();
  // Only there to switch on the varyings the atmosphere hook relies on (see core/atmosphere.ts). Its
  // range is pushed out of reach so a material without the hook gets no fog rather than solid fog colour.
  scene.fog = new THREE.Fog(0xffffff, 1e6, 1e6 + 1);

  const noiseTexture = createNoiseTexture();
  const materials = createMaterials(noiseTexture, createPlazaTexture());
  const foliage = createFoliageMaterials();
  const water = createWaterMaterial();
  const terrain = createTerrainMaterial(noiseTexture);

  // Sun, with a little sky-coloured fill so shadowed faces stay readable without flattening the light.
  // The sun is kept moderate and exposure makes up the brightness: highlights then stay nearer the
  // bloom threshold, so a gold edge catching the sun sparkles instead of flaring.
  atmosphere.uSunDir.value.set(
    Math.sin(SUN_BEARING) * Math.cos(SUN_HEIGHT),
    Math.sin(SUN_HEIGHT),
    -Math.cos(SUN_BEARING) * Math.cos(SUN_HEIGHT),
  );
  const sun = new THREE.DirectionalLight(0xffdcab, 2.7);
  sun.position.copy(atmosphere.uSunDir.value).multiplyScalar(900);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.camera.near = 300;
  sun.shadow.camera.far = 1800;
  sun.shadow.camera.left = sun.shadow.camera.bottom = -340;
  sun.shadow.camera.right = sun.shadow.camera.top = 340;
  sun.shadow.camera.updateProjectionMatrix();
  sun.shadow.bias = -0.0002;
  sun.shadow.normalBias = 1.0;
  scene.add(sun, sun.target, new THREE.HemisphereLight(0xbcd6ff, 0x7a6a58, 0.3));

  // Sky, also baked into an environment map so stone, water and gold pick up its light. Below the
  // horizon the dome stands in for the bright cloud sea, which is what gold on the tower mirrors.
  const sky = createSky();
  sky.material.uniforms.uGround.value.set(0xcad9ec);
  scene.add(sky.mesh);
  scene.environment = bakeSkyEnvironment(renderer, sky);
  scene.environmentIntensity = 0.35;

  // Islands. The main island carries the observatory; the others sit on two arcs around it.
  const sites: Site[] = [];
  const falls: Array<{ site: Site; fall: Fall }> = [];
  const settle = (options: IslandOptions, x: number, y: number, z: number, spills: Fall[] = []): Site => {
    const island = createIsland({ ...options, ...pools(...spills) }, terrain);
    const position = new THREE.Vector3(x, y, z);
    island.mesh.position.copy(position);
    scene.add(island.mesh);
    const site = { island, position, frame: new THREE.Matrix4().makeTranslation(x, y, z) };
    sites.push(site);
    for (const fall of spills) falls.push({ site, fall });
    return site;
  };

  const main = settle(
    {
      radius: 72,
      depth: 168,
      seed: 11,
      flatRadius: 40,
    },
    0,
    0,
    0,
    [
      { angle: -35 * DEG, reach: 0.86, radius: 13, depth: 5.5, drop: 135, width: 9 },
      { angle: 25 * DEG, reach: 0.88, radius: 8, depth: 4, drop: 105, width: 5 },
      { angle: -120 * DEG, reach: 0.88, radius: 7, depth: 3.5, drop: 90, width: 4 },
    ],
  );
  // East arc: climbs away behind the observatory.
  const eastGate = settle({ radius: 24, depth: 56, seed: 21, meadow: 0xf4ffe0 }, 136, 4, -45);
  const eastGarden = settle({ radius: 15, depth: 38, seed: 22, meadow: 0xeaffd0 }, 170, -6, 56);
  const eastDome = settle({ radius: 28, depth: 68, seed: 23, meadow: 0xf8ffe6 }, 150, 14, 160, [
    { angle: -30 * DEG, reach: 0.84, radius: 7.5, depth: 3.6, drop: 52, width: 4 },
  ]);
  const eastRuin = settle({ radius: 13, depth: 34, seed: 24 }, 81, 30, 240);
  // West arc: lower and nearer, so the two arcs read as staggered.
  const westRuin = settle({ radius: 20, depth: 50, seed: 31, meadow: 0xe8ffd2 }, -163, -8, 41);
  const westGarden = settle({ radius: 26, depth: 64, seed: 32 }, -177, 6, -70, [
    { angle: -60 * DEG, reach: 0.84, radius: 9, depth: 4.2, drop: 46, width: 4.5 },
  ]);
  const westColumns = settle({ radius: 17, depth: 44, seed: 33, meadow: 0xf0ffda }, -136, -4, -170);
  const westIslet = settle({ radius: 11, depth: 30, seed: 34 }, -71, -18, -226);
  // Loose islets that no bridge reaches.
  const islets = [
    settle({ radius: 7, depth: 18, seed: 41 }, 236, -24, 150),
    settle({ radius: 9, depth: 22, seed: 42 }, -64, 48, 258),
    settle({ radius: 6, depth: 16, seed: 43 }, -262, 22, 168),
  ];

  // Everything made of stone goes through one builder and comes out as a few merged meshes.
  const stone = new GeometryBuilder();
  const vegetation = new Vegetation(77);
  const debris = new FloatingDebris(createDebrisKinds(materials.ivory));

  /** A point on a site's ground, at `distance` from its centre. */
  const lawn = (site: Site, angle: number, distance: number): V3 => {
    const x = Math.cos(angle) * distance;
    const z = Math.sin(angle) * distance;
    return [x, site.island.heightAt(x, z), z];
  };
  const clearing = (site: Site, angle: number, distance: number, radius: number): void => {
    vegetation.clear(site.position.x + Math.cos(angle) * distance, site.position.z + Math.sin(angle) * distance, radius);
  };
  const decorate = (site: Site, build: () => void): void => {
    stone.within(site.frame, build);
  };

  // Main island.
  let mastY = 0;
  const belvedereAngle = -100 * DEG;
  const pavilionAngle = -130 * DEG;
  decorate(main, () => {
    mastY = buildObservatory(stone).mastBaseY;
    buildStoa(stone, 45, 0.03, 0.97, 11, main.island.heightAt);
    // Ring road around the plaza, with stretches of paving gone.
    for (let i = 0; i < 30; i++) {
      if (i === 2 || i === 3 || (i >= 13 && i <= 15) || i === 22) continue;
      const angle = (i + 0.5) * (TAU / 30);
      const [x, , z] = polar(angle, 40.5);
      stone.box(STONE, 2 * 40.5 * Math.sin(Math.PI / 30) * 0.95, 0.3, 5, [x, main.island.heightAt(x, z) + 0.02, z], facing(angle), 0.9 + random() * 0.1);
    }
    buildBelvedere(stone, main.island, belvedereAngle);
    const pavilion = lawn(main, pavilionAngle, 34);
    buildPavilion(stone, pavilion, 5.5, { columns: 6, roof: 'dome' });
    buildPavilion(stone, lawn(main, 62 * DEG, 31), 4.5, { columns: 6, roof: 'none', fallen: [2, 3] });
    buildFallenDrums(stone, lawn(main, 22 * DEG, 38), 5, random);
    // Paths: off the terrace steps, out to the belvedere, and across to the pavilion.
    buildWalkway(stone, [lawn(main, -45 * DEG, 29.5), lawn(main, -45 * DEG, 38), lawn(main, -62 * DEG, 45)], 4.4, random);
    buildWalkway(stone, [lawn(main, belvedereAngle, 37), lawn(main, belvedereAngle, 50), lawn(main, belvedereAngle, main.island.outline(belvedereAngle) - 5)], 3.2, random);
    buildWalkway(stone, [lawn(main, pavilionAngle, 38), lawn(main, pavilionAngle, 46), pavilion], 3.2, random);
  });
  const sundial = createSundial(materials.gold, mastY);
  scene.add(sundial.object);
  const plaza = new THREE.Mesh(new THREE.CircleGeometry(37.5, 72).rotateX(-Math.PI / 2), materials.plaza);
  plaza.position.y = 0.12;
  plaza.receiveShadow = true;
  scene.add(plaza);
  clearing(main, 0, 0, 42);
  clearing(main, 28 * DEG, 45, 24);
  clearing(main, pavilionAngle, 34, 10);
  clearing(main, belvedereAngle, main.island.outline(belvedereAngle), 9);
  clearing(main, 62 * DEG, 31, 9);
  clearing(main, 22 * DEG, 38, 7);

  // Side islands, each with a different piece of the old observatory.
  decorate(eastGate, () => buildStoneCircle(stone, ORIGIN, 9));
  clearing(eastGate, 0, 0, 13);
  decorate(eastGarden, () => buildPavilion(stone, lawn(eastGarden, 60 * DEG, 2), 5, { columns: 6, roof: 'dome' }));
  clearing(eastGarden, 60 * DEG, 2, 8);
  decorate(eastDome, () => {
    buildPavilion(stone, lawn(eastDome, 200 * DEG, 9), 6, { columns: 6, roof: 'cone' });
    buildRuinedTower(stone, lawn(eastDome, 20 * DEG, 12), 5.5, 17, random);
    buildWalkway(stone, [lawn(eastDome, -130 * DEG, 23), lawn(eastDome, -150 * DEG, 13), lawn(eastDome, 200 * DEG, 14)], 3.4, random);
  });
  clearing(eastDome, 200 * DEG, 9, 9);
  clearing(eastDome, 20 * DEG, 12, 9);
  decorate(eastRuin, () => buildRuinedTower(stone, ORIGIN, 4.2, 24, random));
  clearing(eastRuin, 0, 0, 8);
  decorate(westRuin, () => {
    buildRuinedTower(stone, lawn(westRuin, 100 * DEG, 7), 5, 19, random);
    buildObelisk(stone, lawn(westRuin, -20 * DEG, 8), 12);
  });
  clearing(westRuin, 100 * DEG, 7, 8);
  clearing(westRuin, -20 * DEG, 8, 4);
  decorate(westGarden, () => {
    buildPavilion(stone, ORIGIN, 6.5, { columns: 8, roof: 'dome' });
    buildObelisk(stone, lawn(westGarden, 150 * DEG, 13), 14);
  });
  clearing(westGarden, 0, 0, 10);
  clearing(westGarden, 150 * DEG, 13, 4);
  decorate(westColumns, () => {
    const row: V3[] = [0, 1, 2, 3].map((i) => lawn(westColumns, 150 * DEG, 3 + i * 3.2));
    row.forEach((point, i) => column(stone, IVORY, point, 7, 0.5, 1, i === 3 ? 0.4 : 0));
    architrave(stone, IVORY, row.slice(0, 3), 7, 1.2, 2.2);
    buildFallenDrums(stone, lawn(westColumns, -40 * DEG, 5), 3, random);
    buildWalkway(stone, [lawn(westColumns, 60 * DEG, 14), lawn(westColumns, 110 * DEG, 5)], 3.2, random);
  });
  clearing(westColumns, 150 * DEG, 8, 7);
  decorate(westIslet, () => buildWalkway(stone, [lawn(westIslet, 0, 0), lawn(westIslet, 80 * DEG, 7)], 3, random));

  // Bridges chain each arc and tie its inner end to the main island. Two have fallen in the middle.
  /** Point on an island's lip, on the side that faces `toward`. */
  const landing = (site: Site, toward: THREE.Vector3): THREE.Vector3 => {
    const angle = Math.atan2(toward.z - site.position.z, toward.x - site.position.x);
    const distance = site.island.outline(angle) - 1.4;
    const rim = site.island.rimPoint(angle);
    return new THREE.Vector3(
      site.position.x + Math.cos(angle) * distance,
      site.position.y + rim.y + 0.2,
      site.position.z + Math.sin(angle) * distance,
    );
  };
  const span = (from: Site, to: Site, options: BridgeOptions = {}, fallen?: [number, number]): void => {
    const start = landing(from, to.position);
    const end = landing(to, from.position);
    const standing: [number, number][] = fallen ? [[0, fallen[0]], [fallen[1], 1]] : [[0, 1]];
    for (const share of standing) debris.hanging(MASONRY, buildBridge(stone, start, end, random, { ...options, standing: share }));
    vegetation.clear(start.x, start.z, 7);
    vegetation.clear(end.x, end.z, 7);
  };
  span(main, eastGate);
  span(eastGate, eastGarden, { colonnade: true });
  span(eastGarden, eastDome);
  span(eastDome, eastRuin, {}, [0.4, 0.6]);
  span(main, westRuin);
  span(westRuin, westGarden);
  span(westGarden, westColumns, {}, [0.34, 0.56]);
  span(westColumns, westIslet);
  scene.add(stone.build(materials));

  // Water: each pool spills over its notch and falls until it turns to spray.
  const mist: Puff[] = [];
  for (const { site, fall } of falls) {
    const rim = site.island.rimPoint(fall.angle);
    const outward = new THREE.Vector3(Math.cos(fall.angle), 0, Math.sin(fall.angle));
    const level = site.position.y - fall.depth * 0.5;
    const origin = new THREE.Vector3(site.position.x + rim.x, level, site.position.z + rim.z).addScaledVector(outward, -0.6);
    const waterfall = createWaterfall(origin, outward, fall.width, fall.drop, random() * 6, noiseTexture);
    scene.add(waterfall.mesh);
    waterfallMist(waterfall, outward, fall.width, mist, random);
    const distance = fall.reach * site.island.outline(fall.angle);
    const pond = new THREE.Vector3(site.position.x + Math.cos(fall.angle) * distance, level, site.position.z + Math.sin(fall.angle) * distance);
    scene.add(createPond(pond, fall.radius * 0.8, water));
    clearing(site, fall.angle, distance, fall.radius * 1.15);
  }

  // Vegetation and loose rock.
  const woodland: Array<[Site, number]> = [
    [main, 46],
    [eastGate, 9],
    [eastGarden, 5],
    [eastDome, 15],
    [eastRuin, 2],
    [westRuin, 8],
    [westGarden, 12],
    [westColumns, 9],
    [westIslet, 1],
    ...islets.map((site): [Site, number] => [site, 2]),
  ];
  woodland.forEach(([site, trees], i) => scatterPlants(vegetation, site.island, site.position, 900 + i * 17, trees));
  scene.add(vegetation.build(foliage));
  debris.around(main.position, 72, 64, random);
  for (const site of sites.slice(1)) debris.around(site.position, site.island.radius, Math.round(site.island.radius * 0.45), random);
  scene.add(debris.build());

  // Clouds. The flat sea is the shaded layer between the cloud tops; cumulus stand on it as bright
  // domes, each throwing a soft shadow across it, which is what gives the sea its depth.
  const sea = createCloudSea(noiseTexture);
  scene.add(sea);
  const cloudPuffs: Puff[] = [];
  const sunward = new THREE.Vector3(Math.sin(SUN_BEARING), 0, -Math.cos(SUN_BEARING));
  const cloudShadow = (centre: THREE.Vector3, size: number): void => {
    cloudPuffs.push({
      position: centre.clone().addScaledVector(sunward, -size * 0.16).setY(CLOUD_SEA_LEVEL + 14),
      width: size * 0.95,
      height: size * 0.2,
      alpha: 0.32,
      drift: new THREE.Vector3(),
      speed: 0,
      phase: 0,
      rotation: 0,
      tint: new THREE.Color(0.34, 0.4, 0.56),
    });
  };
  // Sea of cumulus: denser near the realm, thinning toward the horizon.
  for (let i = 0; i < 110; i++) {
    const angle = random() * TAU;
    const distance = 250 + random() ** 0.8 * 2900;
    const size = 170 + random() * 240 + distance * 0.05;
    const centre = new THREE.Vector3(Math.cos(angle) * distance, CLOUD_SEA_LEVEL + 25 + random() * 40, Math.sin(angle) * distance);
    cumulus(cloudPuffs, centre, size, 5 + Math.floor(random() * 3), 0.8, random);
    cloudShadow(centre, size);
  }
  // A wall of large, hazy cumulus along the horizon.
  for (let i = 0; i < 30; i++) {
    const angle = random() * TAU;
    const distance = 3300 + random() * 3000;
    const size = 520 + random() * 380;
    cumulus(cloudPuffs, new THREE.Vector3(Math.cos(angle) * distance, CLOUD_SEA_LEVEL + 40, Math.sin(angle) * distance), size, 4, 0.7, random);
  }
  // Tall cumulus behind and beyond the ring of islands, high enough to break the horizon line and give
  // the realm something to be smaller than.
  for (const degrees of [150, 190, 222, 254, 288, 322]) {
    const bearing = degrees * DEG;
    const distance = 950 + random() * 650;
    const size = 520 + random() * 220;
    const foot = new THREE.Vector3(Math.sin(bearing) * distance, CLOUD_SEA_LEVEL + 30, -Math.cos(bearing) * distance);
    cumulus(cloudPuffs, foot, size, 6, 0.8, random);
    cumulus(cloudPuffs, foot.clone().add(new THREE.Vector3(0, size * 0.3, 0)), size * 0.7, 4, 0.8, random);
    cumulus(cloudPuffs, foot.clone().add(new THREE.Vector3(0, size * 0.55, 0)), size * 0.42, 2, 0.8, random);
    cloudShadow(foot, size);
  }
  // Thin wisps scattered well outside the ring of islands, at many distances and heights so they never
  // line up into a halo when seen from afar.
  for (let i = 0; i < 24; i++) {
    const angle = random() * TAU;
    const distance = 480 + random() * 1500;
    cumulus(
      cloudPuffs,
      new THREE.Vector3(Math.cos(angle) * distance, -220 + random() * 260, Math.sin(angle) * distance),
      130 + random() * 220,
      3,
      0.16,
      random,
    );
  }
  // Two small clouds just outside the lower corners of the default view (which looks in from bearing
  // 30°): only their soft edges drift into frame, as a near layer in front of the realm.
  for (const [x, y, z] of [[297, -15, -290], [88, -15, -411]]) {
    cumulus(cloudPuffs, new THREE.Vector3(x, y, z), 80, 4, 0.25, random);
  }
  const clouds = new PuffField({ texture: createPuffTexture(256, 3, 0.22), lit: 0xfff6e8, shade: 0x93aacb, renderOrder: 20 });
  cloudPuffs.forEach((puff) => clouds.add(puff));
  scene.add(clouds.build());
  const spray = new PuffField({ texture: createPuffTexture(128, 11, 0.85), lit: 0xffffff, shade: 0xc9d8ea, renderOrder: 31 });
  mist.forEach((puff) => spray.add(puff));
  scene.add(spray.build());

  scene.add(createFarLands(new SimplexNoise(501)));

  const birdTexture = createBirdTexture();
  const flocks = [
    new Flock(14, new THREE.Vector3(0, 62, 0), 58, 0.16, birdTexture, random),
    new Flock(10, new THREE.Vector3(150, 52, 160), 44, -0.14, birdTexture, random),
  ];
  for (const flock of flocks) scene.add(flock.object);

  // Everything the first view has to hold: the whole main island from its tip to the top of the mast,
  // and the first three islands of each arc.
  const cameraPoints: THREE.Vector3[] = [];
  const frameSite = (site: Site, rimPoints: number): void => {
    const { island, position } = site;
    for (let i = 0; i < rimPoints; i++) {
      const rim = island.rimPoint((i / rimPoints) * TAU);
      cameraPoints.push(new THREE.Vector3(position.x + rim.x, position.y + rim.y + 4, position.z + rim.z));
    }
    cameraPoints.push(new THREE.Vector3(position.x, position.y - island.depth * 0.92, position.z));
  };
  frameSite(main, 24);
  cameraPoints.push(new THREE.Vector3(0, mastY + 26, 0));
  for (const site of [eastGate, eastGarden, eastDome, westRuin, westGarden, westColumns]) frameSite(site, 10);

  return {
    scene,
    cameraPoints,
    target: new THREE.Vector3(0, 0, 0),
    update(time: number, camera: THREE.Camera): void {
      updateAtmosphere(camera);
      sky.mesh.position.copy(camera.position);
      waterfallTime.value = time;
      windTime.value = time;
      sea.material.uniforms.uTime.value = time;
      sundial.update(time);
      debris.update(time);
      clouds.update(time, camera);
      spray.update(time, camera);
      for (const flock of flocks) flock.update(time);
    },
  };
}
