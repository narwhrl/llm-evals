import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';

export class DioramaBase {
  public group: THREE.Group;
  public baseSize: number = 34; // 34m x 34m square bounded model
  public baseHeight: number = 1.6;
  public puddles: THREE.Mesh[] = [];

  constructor() {
    this.group = new THREE.Group();
    this.buildBasePlinth();
    this.buildPuddlesAndCurbs();
    this.buildOverheadWiresAndPoles();
  }

  /**
   * Builds the square concrete collectible pedestal base with bevelled edges
   */
  private buildBasePlinth(): void {
    // 1. Lower pedestal plinth (dark slate concrete)
    const plinthGeom = new THREE.BoxGeometry(this.baseSize + 0.8, this.baseHeight, this.baseSize + 0.8);
    const plinthMat = ToonMaterials.getDioramaPlinthMaterial();
    const plinth = new THREE.Mesh(plinthGeom, plinthMat);
    plinth.position.y = -this.baseHeight / 2;
    plinth.receiveShadow = true;
    this.group.add(plinth);

    // Bevelled trim rim
    const rimGeom = new THREE.BoxGeometry(this.baseSize + 1.2, 0.2, this.baseSize + 1.2);
    const rimMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a1e24',
      roughness: 0.8,
      metalness: 0.2
    });
    const rim = new THREE.Mesh(rimGeom, rimMat);
    rim.position.y = -this.baseHeight;
    this.group.add(rim);

    // 2. Upper surface terrain (Wet Asphalt ground)
    const groundGeom = new THREE.PlaneGeometry(this.baseSize, this.baseSize, 32, 32);
    groundGeom.rotateX(-Math.PI / 2);
    const groundMat = ToonMaterials.getGroundWetAsphaltMaterial();
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.position.y = 0.001;
    ground.receiveShadow = true;
    this.group.add(ground);

    // Plinth Outline for crisp silhouette
    const outlineMat = ToonMaterials.getOutlineMaterial(0.04);
    const plinthOutline = new THREE.Mesh(plinthGeom, outlineMat);
    plinthOutline.position.y = -this.baseHeight / 2;
    this.group.add(plinthOutline);
  }

  /**
   * Builds wet puddles, curbs, and sidewalk elevations
   */
  private buildPuddlesAndCurbs(): void {
    const puddleMat = ToonMaterials.getPuddleWaterMaterial();

    // Key puddle locations across the map
    const puddleConfigs = [
      { x: 0, z: 0, w: 4.5, h: 2.8, r: 0.2 },      // Mid gate center puddle
      { x: -5.5, z: -8.0, w: 3.5, h: 2.2, r: -0.4 }, // A site exterior approach
      { x: 6.2, z: -5.5, w: 4.0, h: 3.0, r: 0.5 },  // B site courtyard puddle
      { x: -3.0, z: 9.0, w: 3.8, h: 2.4, r: 0.1 },  // CT spawn front puddle
      { x: 2.5, z: -11.0, w: 4.2, h: 2.5, r: -0.3 }, // T spawn ramp puddle
      { x: -11.0, z: 0, w: 2.6, h: 4.0, r: 0.0 },   // Left alley puddle
      { x: 10.5, z: 3.0, w: 3.0, h: 2.5, r: 0.6 }    // Right flank puddle
    ];

    puddleConfigs.forEach((cfg) => {
      const pGeom = new THREE.PlaneGeometry(cfg.w, cfg.h, 8, 8);
      pGeom.rotateX(-Math.PI / 2);
      const puddle = new THREE.Mesh(pGeom, puddleMat);
      puddle.position.set(cfg.x, 0.015, cfg.z);
      puddle.rotation.y = cfg.r;
      puddle.receiveShadow = true;
      this.group.add(puddle);
      this.puddles.push(puddle);
    });

    // Sidewalk curbs (elevated concrete pavement along sides)
    const curbMat = ToonMaterials.getConcreteWallMaterial('#858e96');

    // Left sidewalk curb
    const leftCurbGeom = new THREE.BoxGeometry(3.5, 0.14, 30);
    const leftCurb = new THREE.Mesh(leftCurbGeom, curbMat);
    leftCurb.position.set(-14.5, 0.07, 0);
    leftCurb.receiveShadow = true;
    this.group.add(leftCurb);

    // Right sidewalk curb
    const rightCurbGeom = new THREE.BoxGeometry(3.5, 0.14, 30);
    const rightCurb = new THREE.Mesh(rightCurbGeom, curbMat);
    rightCurb.position.set(14.5, 0.07, 0);
    rightCurb.receiveShadow = true;
    this.group.add(rightCurb);
  }

  /**
   * Builds utility power poles and sagging overhead black electric wires across the diorama
   */
  private buildOverheadWiresAndPoles(): void {
    const pole1 = TacticalProps.createUtilityPole(7.5);
    pole1.position.set(-13.5, 0, -11.0);
    this.group.add(pole1);

    const pole2 = TacticalProps.createUtilityPole(7.5);
    pole2.position.set(13.5, 0, -8.0);
    this.group.add(pole2);

    const pole3 = TacticalProps.createUtilityPole(7.5);
    pole3.position.set(-13.5, 0, 11.0);
    this.group.add(pole3);

    const pole4 = TacticalProps.createUtilityPole(7.5);
    pole4.position.set(13.5, 0, 11.0);
    this.group.add(pole4);

    // Overhead black sagging power cables
    const wireMat = new THREE.LineBasicMaterial({ color: '#11151a', linewidth: 2 });

    const wireSpans = [
      { start: new THREE.Vector3(-13.5, 7.0, -11.0), end: new THREE.Vector3(13.5, 7.0, -8.0) },
      { start: new THREE.Vector3(-13.5, 7.0, -11.0), end: new THREE.Vector3(-13.5, 7.0, 11.0) },
      { start: new THREE.Vector3(13.5, 7.0, -8.0), end: new THREE.Vector3(13.5, 7.0, 11.0) },
      { start: new THREE.Vector3(-13.5, 7.0, 11.0), end: new THREE.Vector3(13.5, 7.0, 11.0) }
    ];

    wireSpans.forEach(span => {
      // 3 parallel sagging lines per span
      for (let offset = -0.4; offset <= 0.4; offset += 0.4) {
        const midPoint = new THREE.Vector3()
          .addVectors(span.start, span.end)
          .multiplyScalar(0.5);
        midPoint.y -= 1.2; // Catinary sag

        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(span.start.x + offset, span.start.y, span.start.z),
          midPoint,
          new THREE.Vector3(span.end.x + offset, span.end.y, span.end.z)
        ]);

        const points = curve.getPoints(24);
        const geom = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geom, wireMat);
        this.group.add(line);
      }
    });
  }
}
