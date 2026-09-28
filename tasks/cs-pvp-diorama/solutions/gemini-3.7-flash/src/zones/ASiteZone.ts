import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TacticalProps } from '../props/TacticalProps';
import { TextureGenerator } from '../textures/TextureGenerator';

export class ASiteZone {
  public group: THREE.Group;
  public rollUpDoorMesh: THREE.Mesh | null = null;
  public warehouseLight: THREE.PointLight | null = null;
  public rearDoorGlow: THREE.PointLight | null = null;

  constructor() {
    this.group = new THREE.Group();
    this.group.position.set(-8.5, 0, -4.5);
    this.buildWarehouseStructure();
    this.buildBombSiteFloorTarget();
    this.buildInteriorFurnishings();
    this.buildExteriorPerimeter();
  }

  /**
   * Builds the main warehouse structure (semi-open, rolled-up shutter, windows, attic)
   */
  private buildWarehouseStructure(): void {
    const wallMat = ToonMaterials.getConcreteWallMaterial('#545d66');
    const shutterMat = ToonMaterials.getRustedShutterMaterial();
    const steelMat = ToonMaterials.getDarkSteelMaterial();

    const wWidth = 9.5;
    const wLength = 9.0;
    const wHeight = 5.2;

    // 1. Back Wall (North side)
    const backWallGeom = new THREE.BoxGeometry(wWidth, wHeight, 0.4);
    const backWall = new THREE.Mesh(backWallGeom, wallMat);
    backWall.position.set(0, wHeight / 2, -wLength / 2);
    backWall.castShadow = true;
    backWall.receiveShadow = true;
    this.group.add(backWall);

    // 2. West Outer Wall with 2 boarded wooden plank windows & side door
    const westWallGeom = new THREE.BoxGeometry(0.4, wHeight, wLength);
    const westWall = new THREE.Mesh(westWallGeom, wallMat);
    westWall.position.set(-wWidth / 2, wHeight / 2, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    this.group.add(westWall);

    // Boarded window planks on West wall
    const woodMat = ToonMaterials.createToonStandardMaterial({ color: '#7a5433', roughness: 0.8 });
    const plankGeom = new THREE.BoxGeometry(0.08, 0.16, 1.4);
    for (let winZ of [-2.2, 2.2]) {
      // Window frame hole backing
      const holeMat = new THREE.MeshBasicMaterial({ color: '#0d1117' });
      const hole = new THREE.Mesh(new THREE.BoxGeometry(0.45, 1.2, 1.2), holeMat);
      hole.position.set(-wWidth / 2, 2.5, winZ);
      this.group.add(hole);

      // Wooden planks across window with gaps
      for (let py = 2.0; py <= 3.0; py += 0.24) {
        const plank = new THREE.Mesh(plankGeom, woodMat);
        plank.position.set(-wWidth / 2 - 0.22, py, winZ);
        plank.rotation.x = (Math.random() - 0.5) * 0.12;
        this.group.add(plank);
      }
    }

    // Inward-opening side door on West wall
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.4, 1.3), new THREE.MeshBasicMaterial({ color: '#11151a' }));
    doorFrame.position.set(-wWidth / 2, 1.2, 0);
    this.group.add(doorFrame);

    const sideDoor = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.3, 1.15), steelMat);
    sideDoor.position.set(-wWidth / 2 + 0.35, 1.15, -0.2);
    sideDoor.rotation.y = -0.7; // Ajar inward
    this.group.add(sideDoor);

    // 3. Front (South) Wall with Half-Rolled Up Shutter
    const frontWallL = new THREE.Mesh(new THREE.BoxGeometry(2.4, wHeight, 0.4), wallMat);
    frontWallL.position.set(-3.55, wHeight / 2, wLength / 2);
    this.group.add(frontWallL);

    const frontWallR = new THREE.Mesh(new THREE.BoxGeometry(2.4, wHeight, 0.4), wallMat);
    frontWallR.position.set(3.55, wHeight / 2, wLength / 2);
    this.group.add(frontWallR);

    // Top lintel above shutter
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.7, 1.8, 0.4), wallMat);
    lintel.position.set(0, wHeight - 0.9, wLength / 2);
    this.group.add(lintel);

    // Half rolled-up shutter door
    const shutterGeom = new THREE.BoxGeometry(4.6, 1.7, 0.1);
    this.rollUpDoorMesh = new THREE.Mesh(shutterGeom, shutterMat);
    this.rollUpDoorMesh.position.set(0, 3.4, wLength / 2);
    this.rollUpDoorMesh.castShadow = true;
    this.group.add(this.rollUpDoorMesh);

    // Rolled coil drum above door
    const coilGeom = new THREE.CylinderGeometry(0.35, 0.35, 4.7, 12);
    coilGeom.rotateZ(Math.PI / 2);
    const coil = new THREE.Mesh(coilGeom, steelMat);
    coil.position.set(0, 4.35, wLength / 2);
    this.group.add(coil);

    // 4. Industrial Steel Roof Truss & Corrugated Roof
    const roofMat = ToonMaterials.getRustedShutterMaterial();
    const roofL = new THREE.Mesh(new THREE.BoxGeometry(wWidth / 2 + 0.6, 0.12, wLength + 0.6), roofMat);
    roofL.position.set(-wWidth / 4, wHeight + 0.4, 0);
    roofL.rotation.z = -0.12;
    roofL.castShadow = true;
    this.group.add(roofL);

    const roofR = new THREE.Mesh(new THREE.BoxGeometry(wWidth / 2 + 0.6, 0.12, wLength + 0.6), roofMat);
    roofR.position.set(wWidth / 4, wHeight + 0.4, 0);
    roofR.rotation.z = 0.12;
    roofR.castShadow = true;
    this.group.add(roofR);

    // 5. Center Massive Load-Bearing Pillar (Classic Peek Duel Spot)
    const pillarGeom = new THREE.BoxGeometry(1.2, wHeight, 1.2);
    const pillar = new THREE.Mesh(pillarGeom, wallMat);
    pillar.position.set(0, wHeight / 2, 0);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    this.group.add(pillar);

    // Bullet holes on pillar corners
    const bhMat = ToonMaterials.getDecalMaterial(TextureGenerator.getBulletHolesTexture());
    const bh = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), bhMat);
    bh.position.set(0, 1.6, 0.61);
    this.group.add(bh);

    // 6. Sheet Metal Attic Loft (Top-right corner) with Vertical Metal Ladder
    const loftGeom = new THREE.BoxGeometry(3.5, 0.15, 3.2);
    const loft = new THREE.Mesh(loftGeom, steelMat);
    loft.position.set(wWidth / 2 - 1.8, 3.2, -wLength / 2 + 1.7);
    loft.receiveShadow = true;
    this.group.add(loft);

    // Loft handrail
    const loftRail = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 0.05), steelMat);
    loftRail.position.set(wWidth / 2 - 1.8, 3.65, -wLength / 2 + 3.3);
    this.group.add(loftRail);

    // Vertical Iron Ladder leading to loft
    const ladderMat = ToonMaterials.getDarkSteelMaterial();
    const l1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.2, 6), ladderMat);
    l1.position.set(wWidth / 2 - 3.4, 1.6, -wLength / 2 + 3.2);
    this.group.add(l1);

    const l2 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 3.2, 6), ladderMat);
    l2.position.set(wWidth / 2 - 2.9, 1.6, -wLength / 2 + 3.2);
    this.group.add(l2);

    for (let ly = 0.3; ly <= 3.1; ly += 0.35) {
      const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6), ladderMat);
      rung.rotation.z = Math.PI / 2;
      rung.position.set(wWidth / 2 - 3.15, ly, -wLength / 2 + 3.2);
      this.group.add(rung);
    }
  }

  /**
   * Floor Bomb Site "A" Target Spray Marking
   */
  private buildBombSiteFloorTarget(): void {
    const decalMat = ToonMaterials.getDecalMaterial(TextureGenerator.getBombSiteATexture(), 0.95);
    const decalGeom = new THREE.PlaneGeometry(3.6, 3.6);
    decalGeom.rotateX(-Math.PI / 2);
    const decal = new THREE.Mesh(decalGeom, decalMat);
    decal.position.set(1.8, 0.02, 1.2);
    decal.receiveShadow = true;
    this.group.add(decal);
  }

  /**
   * Warehouse Interior Furnishings, Lighting, and Tactical Cover
   */
  private buildInteriorFurnishings(): void {
    // 1. Five-Tier Heavy Pallet Storage Rack along East wall
    const rack1 = TacticalProps.createWarehouseRack();
    rack1.position.set(3.2, 0, -1.8);
    this.group.add(rack1);

    // 2. Manual Pallet Jack / Forklift near site A
    const forklift = TacticalProps.createPalletJack();
    forklift.position.set(2.4, 0, 2.4);
    forklift.rotation.y = 1.1;
    this.group.add(forklift);

    // 3. Stacked Wooden Crates & Burlap Sandbag Cover
    const crateStack = TacticalProps.createCrateStack();
    crateStack.position.set(-2.4, 0, 1.5);
    this.group.add(crateStack);

    const sandbags = TacticalProps.createSandbagWall(2.4);
    sandbags.position.set(-2.0, 0, -1.5);
    sandbags.rotation.y = 0.4;
    this.group.add(sandbags);

    // 4. Sorting desk, parcel boxes, newspapers in corner
    const deskMat = ToonMaterials.createToonStandardMaterial({ color: '#4a3d31', roughness: 0.7 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.85, 0.9), deskMat);
    desk.position.set(-3.6, 0.425, -3.2);
    desk.castShadow = true;
    this.group.add(desk);

    const parcel = TacticalProps.createCardboardStack();
    parcel.scale.set(0.65, 0.65, 0.65);
    parcel.position.set(-3.6, 0.85, -3.2);
    this.group.add(parcel);

    // 5. Interior Cold-White Overhead Emergency Ceiling Light
    const lampFixture = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.15, 1.2),
      ToonMaterials.getDarkSteelMaterial()
    );
    lampFixture.position.set(0, 4.8, 0);
    this.group.add(lampFixture);

    const bulbMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.05, 1.0),
      new THREE.MeshBasicMaterial({ color: '#e3f2fd' })
    );
    bulbMesh.position.set(0, 4.72, 0);
    this.group.add(bulbMesh);

    this.warehouseLight = new THREE.PointLight(0xd0e8ff, 2.5, 12, 1.6);
    this.warehouseLight.position.set(0, 4.5, 0);
    this.warehouseLight.castShadow = true;
    this.warehouseLight.shadow.bias = -0.002;
    this.group.add(this.warehouseLight);

    // 6. Deep rear door half-ajar with faint mysterious red emergency glow
    const rearDoorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.3, 0.4), new THREE.MeshBasicMaterial({ color: '#090c10' }));
    rearDoorFrame.position.set(-1.8, 1.15, -4.4);
    this.group.add(rearDoorFrame);

    const rearDoor = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.2, 0.06), ToonMaterials.getDarkSteelMaterial());
    rearDoor.position.set(-1.4, 1.1, -4.3);
    rearDoor.rotation.y = 0.55;
    this.group.add(rearDoor);

    this.rearDoorGlow = new THREE.PointLight(0xff1744, 2.0, 4.5, 2.0);
    this.rearDoorGlow.position.set(-1.8, 1.2, -4.9);
    this.group.add(this.rearDoorGlow);
  }

  /**
   * Exterior wall fixtures: AC units, freight sign, industrial dumpster, downspout
   */
  private buildExteriorPerimeter(): void {
    // AC outdoor condenser units on wall
    const ac1 = TacticalProps.createACUnit();
    ac1.position.set(-4.95, 2.4, -1.8);
    ac1.rotation.y = Math.PI / 2;
    this.group.add(ac1);

    const ac2 = TacticalProps.createACUnit();
    ac2.position.set(-4.95, 1.2, -1.8);
    ac2.rotation.y = Math.PI / 2;
    this.group.add(ac2);

    // Green industrial dumpster outside warehouse wall
    const dumpster = TacticalProps.createIndustrialDumpster('#245a42');
    dumpster.position.set(-5.6, 0, 2.2);
    dumpster.rotation.y = 0.2;
    this.group.add(dumpster);

    // Downspout on warehouse corner
    const downspout = TacticalProps.createDrainageDownspout(5.2);
    downspout.position.set(-4.7, 0, 4.4);
    this.group.add(downspout);

    // Blue oil drum outside
    const drum = TacticalProps.createOilDrum('#1d5a8a');
    drum.position.set(-3.8, 0.58, 5.2);
    this.group.add(drum);
  }
}
