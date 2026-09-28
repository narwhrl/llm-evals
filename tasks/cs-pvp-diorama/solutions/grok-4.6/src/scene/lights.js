import {
  AmbientLight,
  DirectionalLight,
  HemisphereLight,
  PointLight,
  SpotLight,
} from 'three';
import { A, hooks } from '../world/layout.js';

export function addLights(scene) {
  scene.add(new AmbientLight(0x3a4a5c, 0.7));
  const hemi = new HemisphereLight(0x6a88a8, 0x2a241e, 1.35);
  scene.add(hemi);

  const moon = new DirectionalLight(0xc0d4e6, 0.85);
  moon.position.set(-6.5, 11, 4.2);
  moon.castShadow = false;
  moon.shadow.mapSize.set(1024, 1024);
  moon.shadow.camera.near = 2;
  moon.shadow.camera.far = 28;
  moon.shadow.camera.left = -8;
  moon.shadow.camera.right = 8;
  moon.shadow.camera.top = 8;
  moon.shadow.camera.bottom = -8;
  moon.shadow.bias = -0.0007;
  moon.shadow.normalBias = 0.02;
  scene.add(moon);

  const fill = new DirectionalLight(0xffd8b0, 0.42);
  fill.position.set(8.5, 7.5, -6.5);
  fill.castShadow = false;
  scene.add(fill);

  const rim = new DirectionalLight(0x88b8e0, 0.35);
  rim.position.set(2, 6, 10);
  rim.castShadow = false;
  scene.add(rim);

  const street = new PointLight(0xffc56a, 5.2, 6.4, 1.35);
  street.position.set(A.lamp.x, 1.42, A.lamp.z);
  street.castShadow = false;
  scene.add(street);
  hooks.streetLamp = street;

  const warehouse = new PointLight(0xd8e6f2, 3.4, 5.0, 1.45);
  warehouse.position.set(A.aHouse.x + 0.15, 1.38, A.aHouse.z);
  scene.add(warehouse);
  hooks.warehouseLamps.push(warehouse);

  const loft = new PointLight(0xb8c8d4, 0.9, 2.6, 1.8);
  loft.position.set(-4.2, 1.55, 3.2);
  scene.add(loft);

  const rearRed = new PointLight(0xff3344, 1.35, 2.6, 1.6);
  rearRed.position.set(-4.55, 0.55, 3.55);
  scene.add(rearRed);

  const siteA = new PointLight(0xe8f0ff, 2.4, 3.2, 1.5);
  siteA.position.set(A.aHouse.x + 0.35, 1.1, A.aHouse.z);
  scene.add(siteA);
  const siteB = new PointLight(0xffd88a, 2.2, 3.0, 1.5);
  siteB.position.set(A.bSite.x, 1.05, A.bSite.z);
  scene.add(siteB);

  const boothB = new PointLight(0xffe09a, 2.8, 3.8, 1.45);
  boothB.position.set(A.bHouse.x, 0.72, A.bHouse.z);
  scene.add(boothB);

  const midFill = new PointLight(0x8aa8c4, 2.1, 5.4, 1.5);
  midFill.position.set(0, 1.35, 0.2);
  scene.add(midFill);

  const tSodium = new PointLight(0xffb066, 2.2, 4.2, 1.55);
  tSodium.position.set(0.2, 1.5, 4.8);
  scene.add(tSodium);

  const police = new PointLight(0xff3355, 2.2, 3.8, 1.4);
  police.position.set(A.van.x, 0.95, A.van.z);
  scene.add(police);
  hooks.policeBar = police;

  const search = new SpotLight(0xfff4d8, 5.4, 10.5, 0.32, 0.42, 1.05);
  search.position.set(A.search.x, 1.42, A.search.z);
  search.castShadow = false;
  const target = search.target;
  target.position.set(0.1, 0.35, 0.15);
  scene.add(search);
  scene.add(target);
  hooks.searchlight = search;
  hooks.searchlightTarget = target;

  return {
    hemi,
    moon,
    street,
    warehouse,
    boothB,
    police,
    search,
    rearRed,
    helper: null,
  };
}
