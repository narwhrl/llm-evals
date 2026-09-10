import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';
import { TextureGenerator } from '../textures/TextureGenerator';

export class BSiteZone {
  public group: THREE.Group;
  public streetLampLight: THREE.PointLight | null = null;
  public streetLampSpot: THREE.SpotLight | null = null;
  public guardhouseLight: THREE.PointLight | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(8.5, 0, -4.5);
    this.buildTwoStorySheetMetalBuilding();
    this.buildBombSiteFloorTarget();
    this.buildIrregularTacticalCover();
    this.buildVintageStreetLamp();
    this.buildShortcutWallToCT();
  }

  /**
   * 2-Story Sheet Metal Building / Guardhouse with 1F Office & 2F Balcony Fire Escape
   */
  private buildTwoStorySheetMetalBuilding(): void {
    const bldGroup = new THREE.Group();
    bldGroup.position.set(2.2, 0, -1.8);

    const sheetMat = ToonMaterials.getRustedShutterMaterial();
    const concreteMat = ToonMaterials.getConcreteWallMaterial('#4a525c');
    const steelMat = ToonMaterials.getDarkSteelMaterial();
    const glassMat = ToonMaterials.getGlassWindowMaterial();

    const bWidth = 6.0;
    const bDepth = 5.2;
    const f1Height = 3.0;
    const f2Height = 2.6;
    const totalHeight = f1Height + f2Height;

    // 1. First Floor Walls (Guardhouse office)
    const f1WallGeom = new THREE.BoxGeometry(bWidth, f1Height, bDepth);
    const f1Wall = new THREE.Mesh(f1WallGeom, concreteMat);
    f1Wall.position.y = f1Height / 2;
    f1Wall.castShadow = true;
    f1Wall.receiveShadow = true;
    bldGroup.add(f1Wall);

    // 1F Front Door & Glass Window cutouts
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.3, 0.2), new THREE.MeshBasicMaterial({ color: '#0b0f14' }));
    doorFrame.position.set(-1.2, 1.15, bDepth / 2 + 0.05);
    bldGroup.add(doorFrame);

    // 1F Window
    const win1 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.2, 0.1), glassMat);
    win1.position.set(1.4, 1.6, bDepth / 2 + 0.05);
    bldGroup.add(win1);

    // 2. Second Floor Sheet Metal Upper Level
    const f2WallGeom = new THREE.BoxGeometry(bWidth - 0.4, f2Height, bDepth - 0.4);
    const f2Wall = new THREE.Mesh(f2WallGeom, sheetMat);
    f2Wall.position.y = f1Height + f2Height / 2;
    f2Wall.castShadow = true;
    f2Wall.receiveShadow = true;
    bldGroup.add(f2Wall);

    // 2F Roof with slant
    const roofGeom = new THREE.BoxGeometry(bWidth + 0.4, 0.15, bDepth + 0.4);
    const roof = new THREE.Mesh(roofGeom, sheetMat);
    roof.position.y = totalHeight + 0.08;
    roof.rotation.x = 0.06;
    roof.castShadow = true;
    bldGroup.add(roof);

    // 3. 2F Balcony & Exterior Fire Escape Stairs (Overlooking B Site)
    const balconyGeom = new THREE.BoxGeometry(bWidth + 0.8, 0.15, 1.6);
    const balcony = new THREE.Mesh(balconyGeom, steelMat);
    balcony.position.set(0, f1Height, bDepth / 2 + 0.8);
    balcony.receiveShadow = true;
    bldGroup.add(balcony);

    // Balcony handrail
    const railGeom = new THREE.BoxGeometry(bWidth + 0.8, 0.9, 0.06);
    const rail = new THREE.Mesh(railGeom, steelMat);
    rail.position.set(0, f1Height + 0.45, bDepth / 2 + 1.6);
    bldGroup.add(rail);

    // Fire escape metal stairs leading from ground to 2F balcony
    const stairSteps = 10;
    const sWidth = 0.9;
    const sStepH = f1Height / stairSteps;
    const sStepD = 0.28;
    for (let i = 0; i < stairSteps; i++) {
      const stepMesh = new THREE.Mesh(new THREE.BoxGeometry(sWidth, sStepH, sStepD), steelMat);
      stepMesh.position.set(-bWidth / 2 - 0.5, (i + 0.5) * sStepH, bDepth / 2 - 0.4 + i * sStepD);
      stepMesh.castShadow = true;
      bldGroup.add(stepMesh);
    }

    // 4. Guardhouse 1F Interior Furnishings
    const deskMat = ToonMaterials.createToonStandardMaterial({ color: '#54412f', roughness: 0.7 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.75, 0.7), deskMat);
    desk.position.set(0.6, 0.375, 0.2);
    desk.castShadow = true;
    bldGroup.add(desk);

    // Overturned office chair
    const chairMat = ToonMaterials.createToonStandardMaterial({ color: '#1e242b', roughness: 0.8 });
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.7, 0.5), chairMat);
    chair.position.set(1.4, 0.35, 0.2);
    chair.rotation.z = Math.PI / 2.2; // Overturned
    bldGroup.add(chair);

    // Metal locker in corner
    const lockerMat = ToonMaterials.createToonStandardMaterial({ color: '#3d4852', roughness: 0.5, metalness: 0.6 });
    const locker = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.9, 0.5), lockerMat);
    locker.position.set(-2.0, 0.95, -1.8);
    bldGroup.add(locker);

    // Flickering broken yellow fluorescent tube overhead
    const tubeMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 6), new THREE.MeshBasicMaterial({ color: '#ffe57f' }));
    tubeMesh.position.set(0, 2.7, 0);
    tubeMesh.rotation.z = Math.PI / 2 + 0.15; // Slanted hanging
    bldGroup.add(tubeMesh);

    this.guardhouseLight = new THREE.PointLight(0xffd54f, 2.2, 8, 2.0);
    this.guardhouseLight.position.set(0, 2.5, 0);
    bldGroup.add(this.guardhouseLight);

    this.group.add(bldGroup);
  }

  /**
   * Floor Bomb Site "B" Target Decal
   */
  private buildBombSiteFloorTarget(): void {
    const decalMat = ToonMaterials.getDecalMaterial(TextureGenerator.getBombSiteBTexture(), 0.95);
    const decalGeom = new THREE.PlaneGeometry(3.6, 3.6);
    decalGeom.rotateX(-Math.PI / 2);
    const decal = new THREE.Mesh(decalGeom, decalMat);
    decal.position.set(-1.8, 0.02, 1.6);
    decal.receiveShadow = true;
    this.group.add(decal);
  }

  /**
   * Irregular tactical cover: pallets, dumpsters, abandoned bicycle, overturned table/chairs
   */
  private buildIrregularTacticalCover(): void {
    // 1. Stacked wooden freight pallets
    const pallet1 = TacticalProps.createWoodenPallet();
    pallet1.position.set(-3.2, 0, 0.5);
    this.group.add(pallet1);

    const pallet2 = TacticalProps.createWoodenPallet();
    pallet2.position.set(-3.2, 0.14, 0.5);
    pallet2.rotation.y = 0.15;
    this.group.add(pallet2);

    // 2. Blue industrial dumpster
    const dumpster = TacticalProps.createIndustrialDumpster('#1b4965');
    dumpster.position.set(-3.6, 0, 3.2);
    dumpster.rotation.y = -0.3;
    this.group.add(dumpster);

    // 3. Abandoned vintage bicycle leaning against building wall
    const bikeGroup = new THREE.Group();
    bikeGroup.position.set(0.2, 0, 2.8);
    bikeGroup.rotation.y = 0.25;
    bikeGroup.rotation.z = 0.15; // Leaning

    const steelMat = ToonMaterials.getDarkSteelMaterial();
    const wheelGeom = new THREE.TorusGeometry(0.32, 0.025, 6, 16);

    const wFront = new THREE.Mesh(wheelGeom, steelMat);
    wFront.position.set(-0.6, 0.32, 0);
    bikeGroup.add(wFront);

    const wRear = new THREE.Mesh(wheelGeom, steelMat);
    wRear.position.set(0.6, 0.32, 0);
    bikeGroup.add(wRear);

    const frameGeom = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6);
    frameGeom.rotateZ(Math.PI / 3);
    const frame = new THREE.Mesh(frameGeom, steelMat);
    frame.position.set(0, 0.45, 0);
    bikeGroup.add(frame);

    this.group.add(bikeGroup);

    // 4. Overturned vintage wrought-iron table and chairs
    const ironTable = new THREE.Group();
    ironTable.position.set(-1.2, 0.25, 3.4);
    ironTable.rotation.x = Math.PI / 2.1; // Overturned

    const topGeom = new THREE.CylinderGeometry(0.45, 0.45, 0.04, 12);
    const tableTop = new THREE.Mesh(topGeom, steelMat);
    ironTable.add(tableTop);

    const legGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 6);
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const leg = new THREE.Mesh(legGeom, steelMat);
      leg.position.set(Math.cos(angle) * 0.35, -0.32, Math.sin(angle) * 0.35);
      ironTable.add(leg);
    }
    this.group.add(ironTable);
  }

  /**
   * Vintage street lamp casting warm yellow light with hazy rain glow
   */
  private buildVintageStreetLamp(): void {
    const lamp = TacticalProps.createStreetLamp();
    lamp.group.position.set(-4.2, 0, 4.8);
    lamp.group.rotation.y = -Math.PI / 4;
    this.group.add(lamp.group);

    this.streetLampLight = lamp.light;
    this.streetLampSpot = lamp.spotLight;
  }

  /**
   * Low corner wall leading to CT spawn shortcut
   */
  private buildShortcutWallToCT(): void {
    const wallMat = ToonMaterials.getConcreteWallMaterial('#5d6872');
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.4, 4.8), wallMat);
    wall.position.set(-5.2, 0.7, 4.2);
    wall.castShadow = true;
    wall.receiveShadow = true;
    this.group.add(wall);

    // Wall outline
    const outline = new THREE.Mesh(wall.geometry, ToonMaterials.getOutlineMaterial(0.025));
    outline.position.copy(wall.position);
    this.group.add(outline);
  }
}
