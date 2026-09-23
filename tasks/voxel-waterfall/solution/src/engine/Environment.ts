// 环境光影与昼夜晨昏系统 (增强版)：更丰富的色调、更真实的地形投射光影

import * as THREE from 'three';

export type TimePreset = 'dawn' | 'noon' | 'sunset' | 'night';

export class EnvironmentSystem {
  public group: THREE.Group;
  public dirLight: THREE.DirectionalLight;
  public hemiLight: THREE.HemisphereLight;
  public ambientLight: THREE.AmbientLight;
  private scene: THREE.Scene;

  private currentPreset: TimePreset = 'noon';

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.group = new THREE.Group();

    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    this.group.add(this.hemiLight);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    this.group.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xffffff, 1.35);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 15;
    this.dirLight.shadow.camera.far = 480;

    const d = 165;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.0005;
    this.dirLight.shadow.normalBias = 0.02;

    this.group.add(this.dirLight);
    this.group.add(this.dirLight.target);

    this.scene.fog = new THREE.FogExp2(0x8ecae6, 0.0020);

    this.applyPreset('noon');
  }

  public applyPreset(preset: TimePreset) {
    this.currentPreset = preset;

    let skyCol = 0x8ecae6;
    let hemiSky = 0xbde0fe;
    let hemiGnd = 0x5a7052;
    let sunCol = 0xfffaed;
    let sunInt = 1.45;
    let ambInt = 0.30;
    let fogDen = 0.0018;

    let elev = 65;
    let azim = 145;

    switch (preset) {
      case 'dawn':
        // 晨曦：东方破晓，暖金穿雾
        skyCol = 0xe4a170;
        hemiSky = 0xfec89a;
        hemiGnd = 0x533e43;
        sunCol = 0xffcf99;
        sunInt = 1.40;
        ambInt = 0.38;
        fogDen = 0.0026;
        elev = 22;
        azim = 68;
        break;

      case 'noon':
        // 晴空正午：艳阳高照，山峦苍翠
        skyCol = 0x72b4eb;
        hemiSky = 0xd8eeff;
        hemiGnd = 0x475e3c;
        sunCol = 0xffffff;
        sunInt = 1.50;
        ambInt = 0.32;
        fogDen = 0.0016;
        elev = 68;
        azim = 145;
        break;

      case 'sunset':
        // 暮色晚霞：落日熔金，崖壁生辉
        skyCol = 0xc75239;
        hemiSky = 0xf07167;
        hemiGnd = 0x3d1c24;
        sunCol = 0xff7b42;
        sunInt = 1.45;
        ambInt = 0.38;
        fogDen = 0.0024;
        elev = 16;
        azim = 245;
        break;

      case 'night':
        // 静谧月夜：星汉灿烂，幽蓝冷光
        skyCol = 0x091428;
        hemiSky = 0x1f3252;
        hemiGnd = 0x0c1524;
        sunCol = 0x93b7f5;
        sunInt = 0.75;
        ambInt = 0.25;
        fogDen = 0.0032;
        elev = 50;
        azim = 210;
        break;
    }

    this.scene.background = new THREE.Color(skyCol);
    if (this.scene.fog) {
      (this.scene.fog as THREE.FogExp2).color.setHex(skyCol);
      (this.scene.fog as THREE.FogExp2).density = fogDen;
    }

    this.hemiLight.color.setHex(hemiSky);
    this.hemiLight.groundColor.setHex(hemiGnd);
    this.hemiLight.intensity = 0.70;

    this.ambientLight.intensity = ambInt;

    this.dirLight.color.setHex(sunCol);
    this.dirLight.intensity = sunInt;

    const phi = THREE.MathUtils.degToRad(90 - elev);
    const theta = THREE.MathUtils.degToRad(azim);
    const radius = 220;

    const lx = 100 + radius * Math.sin(phi) * Math.sin(theta);
    const ly = 25 + radius * Math.cos(phi);
    const lz = 100 + radius * Math.sin(phi) * Math.cos(theta);

    this.dirLight.position.set(lx, ly, lz);
    this.dirLight.target.position.set(100, 20, 100);
  }

  public setSunAngle(elev: number, azim: number) {
    const phi = THREE.MathUtils.degToRad(90 - elev);
    const theta = THREE.MathUtils.degToRad(azim);
    const radius = 220;

    const lx = 100 + radius * Math.sin(phi) * Math.sin(theta);
    const ly = 25 + radius * Math.cos(phi);
    const lz = 100 + radius * Math.sin(phi) * Math.cos(theta);

    this.dirLight.position.set(lx, ly, lz);
  }

  public setFogDensity(density: number) {
    if (this.scene.fog) {
      (this.scene.fog as THREE.FogExp2).density = density;
    }
  }

  public setShadowsEnabled(enabled: boolean) {
    this.dirLight.castShadow = enabled;
  }

  public getCurrentPreset(): TimePreset {
    return this.currentPreset;
  }
}
