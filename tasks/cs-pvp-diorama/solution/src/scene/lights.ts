import {
  DirectionalLight,
  Group,
  PointLight,
  SpotLight,
} from 'three';

export interface SceneLights {
  group: Group;
  streetLamp: PointLight;
  warehouseLamp: PointLight;
  policeBeacon: PointLight;
  searchlight: SpotLight;
  doorRed: PointLight;
}

// Setup scene lights: cool ambient, cool key directional (moon), warm street lamp,
// cool warehouse interior, red police beacon, CT searchlight.
export function buildLights(): SceneLights {
  const group = new Group();

  group.name = 'lights';


  // ambient + hemi are owned by buildLightning (it controls flicker + tint).

  const key = new DirectionalLight(0x9ab8d8, 0.7);

  key.position.set(-6, 10, -4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -8;
  key.shadow.camera.right = 8;
  key.shadow.camera.top = 8;
  key.shadow.camera.bottom = -8;
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 30;
  key.shadow.bias = -0.0005;
  group.add(key);

  const fill = new DirectionalLight(0x5d7a96, 0.25);
  fill.position.set(4, 6, 6);
  group.add(fill);

  const streetLamp = new PointLight(0xffb060, 1.6, 6, 1.6);
  streetLamp.position.set(4.4, 1.85, -2.5);
  group.add(streetLamp);

  const warehouseLamp = new PointLight(0xd0e0ff, 1.4, 5, 1.5);
  warehouseLamp.position.set(-3.4, 1.6, -3.0);
  group.add(warehouseLamp);

  const doorRed = new PointLight(0xff5040, 1.0, 3.5, 1.8);
  doorRed.position.set(-3.4, 0.6, -3.6);
  group.add(doorRed);

  const policeBeacon = new PointLight(0xff3030, 1.6, 3.0, 2);
  policeBeacon.position.set(-2.4, 1.78, 4.05);
  group.add(policeBeacon);

  const searchlight = new SpotLight(0xfff0d0, 2.2, 8, Math.PI / 5, 1.0, 1.5);
  searchlight.position.set(2.4, 1.95, 4.0);
  searchlight.target.position.set(0, 0.5, 1.5);
  group.add(searchlight);
  group.add(searchlight.target);

  return { group, streetLamp, warehouseLamp, policeBeacon, searchlight, doorRed };
}