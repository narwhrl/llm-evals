import * as THREE from 'three';
import { ToonMaterials } from '../materials/ToonMaterials';
import { TextureGenerator } from '../textures/TextureGenerator';

export class TacticalProps {
  /**
   * Military Wooden Ammo / Supply Crate
   */
  public static createWoodCrate(size: number = 1.0, label: string = 'CS-ARMAMENT'): THREE.Group {
    const group = new THREE.Group();
    const mat = ToonMaterials.getMilitaryCrateMaterial(label);
    const geom = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Dark outline
    const outlineMat = ToonMaterials.getOutlineMaterial(0.025);
    const outline = new THREE.Mesh(geom, outlineMat);
    group.add(outline);

    return group;
  }

  /**
   * Stack of Wooden Crates
   */
  public static createCrateStack(): THREE.Group {
    const stack = new THREE.Group();
    // Base layer
    const c1 = this.createWoodCrate(1.1, 'CS-ARMAMENT');
    c1.position.set(-0.55, 0.55, 0);
    stack.add(c1);

    const c2 = this.createWoodCrate(1.1, 'EXPLOSIVES');
    c2.position.set(0.55, 0.55, 0);
    c2.rotation.y = Math.PI / 2;
    stack.add(c2);

    // Top layer
    const c3 = this.createWoodCrate(1.0, 'TACTICAL-SUPPLY');
    c3.position.set(0, 1.6, 0);
    c3.rotation.y = 0.15;
    stack.add(c3);

    return stack;
  }

  /**
   * Blue/Rust Metal Oil Drum
   */
  public static createOilDrum(color: string = '#1d5a8a'): THREE.Group {
    const group = new THREE.Group();
    const mat = ToonMaterials.getOilDrumMaterial(color);
    const geom = new THREE.CylinderGeometry(0.38, 0.38, 1.15, 18);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Top/bottom reinforcing rings
    const ringMat = ToonMaterials.getDarkSteelMaterial();
    const ringGeom = new THREE.TorusGeometry(0.39, 0.025, 8, 20);
    ringGeom.rotateX(Math.PI / 2);

    const topRing = new THREE.Mesh(ringGeom, ringMat);
    topRing.position.y = 0.54;
    group.add(topRing);

    const botRing = new THREE.Mesh(ringGeom, ringMat);
    botRing.position.y = -0.54;
    group.add(botRing);

    // Outline
    const outlineMat = ToonMaterials.getOutlineMaterial(0.02);
    const outline = new THREE.Mesh(geom, outlineMat);
    group.add(outline);

    return group;
  }

  /**
   * 4-Barrel Cluster on Wooden Pallet
   */
  public static createOilDrumPalletCluster(): THREE.Group {
    const group = new THREE.Group();
    // Pallet base
    const pallet = this.createWoodenPallet();
    pallet.position.y = 0.08;
    group.add(pallet);

    const offsets = [
      [-0.42, 0.65, -0.42],
      [0.42, 0.65, -0.42],
      [-0.42, 0.65, 0.42],
      [0.42, 0.65, 0.42]
    ];
    const colors = ['#1d5a8a', '#1e6698', '#8a3a1d', '#1d5a8a'];

    offsets.forEach((pos, idx) => {
      const drum = this.createOilDrum(colors[idx]);
      drum.position.set(pos[0], pos[1], pos[2]);
      drum.rotation.y = idx * 1.2;
      group.add(drum);
    });

    return group;
  }

  /**
   * Wooden Shipping Pallet
   */
  public static createWoodenPallet(): THREE.Group {
    const pallet = new THREE.Group();
    const woodMat = ToonMaterials.createToonStandardMaterial({
      color: '#8b6947',
      roughness: 0.6,
      map: TextureGenerator.getWoodCrateTexture('PALLET')
    });

    // 3 bottom runners
    const runnerGeom = new THREE.BoxGeometry(1.4, 0.08, 0.1);
    for (let i = -1; i <= 1; i++) {
      const runner = new THREE.Mesh(runnerGeom, woodMat);
      runner.position.set(0, 0.04, i * 0.55);
      runner.castShadow = true;
      pallet.add(runner);
    }

    // Top deck boards
    const topBoardGeom = new THREE.BoxGeometry(0.14, 0.035, 1.35);
    for (let x = -0.6; x <= 0.6; x += 0.22) {
      const board = new THREE.Mesh(topBoardGeom, woodMat);
      board.position.set(x, 0.1, 0);
      board.castShadow = true;
      board.receiveShadow = true;
      pallet.add(board);
    }

    return pallet;
  }

  /**
   * Cardboard Box Stack
   */
  public static createCardboardStack(): THREE.Group {
    const group = new THREE.Group();
    const mat = ToonMaterials.getCardboardMaterial();

    const b1Geom = new THREE.BoxGeometry(0.75, 0.6, 0.75);
    const b1 = new THREE.Mesh(b1Geom, mat);
    b1.position.set(-0.3, 0.3, 0);
    b1.castShadow = true;
    group.add(b1);

    const b2Geom = new THREE.BoxGeometry(0.7, 0.55, 0.7);
    const b2 = new THREE.Mesh(b2Geom, mat);
    b2.position.set(0.35, 0.275, 0.1);
    b2.rotation.y = 0.2;
    b2.castShadow = true;
    group.add(b2);

    const b3Geom = new THREE.BoxGeometry(0.65, 0.5, 0.65);
    const b3 = new THREE.Mesh(b3Geom, mat);
    b3.position.set(0, 0.85, 0);
    b3.rotation.y = -0.15;
    b3.castShadow = true;
    group.add(b3);

    return group;
  }

  /**
   * Concrete Jersey Barrier (水泥隔离墩)
   */
  public static createJerseyBarrier(length: number = 2.2): THREE.Group {
    const group = new THREE.Group();
    const concreteMat = ToonMaterials.getConcreteWallMaterial('#6c757d');

    // Stepped profile of Jersey barrier
    const shape = new THREE.Shape();
    shape.moveTo(-0.35, 0);
    shape.lineTo(0.35, 0);
    shape.lineTo(0.32, 0.18);
    shape.lineTo(0.14, 0.45);
    shape.lineTo(0.08, 0.95);
    shape.lineTo(-0.08, 0.95);
    shape.lineTo(-0.14, 0.45);
    shape.lineTo(-0.32, 0.18);
    shape.closePath();

    const extrudeSettings = {
      steps: 1,
      depth: length,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    const mesh = new THREE.Mesh(geom, concreteMat);
    mesh.position.y = 0.48;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Hazard orange reflector stripes
    const stripeMat = new THREE.MeshStandardMaterial({ color: '#ff7700', roughness: 0.3 });
    const stripeGeom = new THREE.BoxGeometry(0.2, 0.12, 0.05);
    const stripe1 = new THREE.Mesh(stripeGeom, stripeMat);
    stripe1.position.set(0, 0.65, length * 0.35);
    group.add(stripe1);

    const stripe2 = new THREE.Mesh(stripeGeom, stripeMat);
    stripe2.position.set(0, 0.65, -length * 0.35);
    group.add(stripe2);

    // Outline
    const outlineMat = ToonMaterials.getOutlineMaterial(0.025);
    const outline = new THREE.Mesh(geom, outlineMat);
    outline.position.y = 0.48;
    group.add(outline);

    return group;
  }

  /**
   * Plastic Barricade / Roadblock (塑料拒马路障)
   */
  public static createPlasticBarricade(color: string = '#e63946'): THREE.Group {
    const group = new THREE.Group();
    const plasticMat = ToonMaterials.createToonStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.1
    });

    // Hollow barrier body
    const bodyGeom = new THREE.BoxGeometry(1.6, 0.8, 0.45);
    const body = new THREE.Mesh(bodyGeom, plasticMat);
    body.position.y = 0.4;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // White reflective diagonal stripes
    const stripeMat = new THREE.MeshStandardMaterial({ color: '#f1faee', roughness: 0.3 });
    for (let x = -0.55; x <= 0.55; x += 0.35) {
      const stripeGeom = new THREE.BoxGeometry(0.12, 0.5, 0.46);
      const stripe = new THREE.Mesh(stripeGeom, stripeMat);
      stripe.position.set(x, 0.4, 0);
      stripe.rotation.z = 0.3;
      group.add(stripe);
    }

    // Outline
    const outlineMat = ToonMaterials.getOutlineMaterial(0.02);
    const outline = new THREE.Mesh(bodyGeom, outlineMat);
    outline.position.y = 0.4;
    group.add(outline);

    return group;
  }

  /**
   * Discarded Rubber Tires Stack (废弃橡胶轮胎堆)
   */
  public static createTireStack(): THREE.Group {
    const group = new THREE.Group();
    const rubberMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a1c20',
      roughness: 0.85,
      metalness: 0.05,
      rimColor: '#3a4454'
    });

    const tireGeom = new THREE.TorusGeometry(0.38, 0.14, 10, 20);
    tireGeom.rotateX(Math.PI / 2);

    // Tire 1
    const t1 = new THREE.Mesh(tireGeom, rubberMat);
    t1.position.set(0, 0.14, 0);
    t1.castShadow = true;
    group.add(t1);

    // Tire 2
    const t2 = new THREE.Mesh(tireGeom, rubberMat);
    t2.position.set(0.04, 0.4, 0.02);
    t2.rotation.z = 0.08;
    t2.castShadow = true;
    group.add(t2);

    // Tire 3
    const t3 = new THREE.Mesh(tireGeom, rubberMat);
    t3.position.set(-0.03, 0.66, -0.02);
    t3.rotation.x = -0.06;
    t3.castShadow = true;
    group.add(t3);

    return group;
  }

  /**
   * Burlap Sandbags Stack (麻袋包掩体)
   */
  public static createSandbagWall(width: number = 2.0): THREE.Group {
    const wall = new THREE.Group();
    const burlapMat = ToonMaterials.createToonStandardMaterial({
      color: '#8b7d6b',
      roughness: 0.85,
      metalness: 0.02,
      rimColor: '#5a4d3b'
    });

    const bagGeom = new THREE.CapsuleGeometry(0.18, 0.48, 6, 12);
    bagGeom.rotateZ(Math.PI / 2);

    // 2 rows high, multiple bags wide
    for (let layer = 0; layer < 3; layer++) {
      const y = 0.16 + layer * 0.22;
      const xOffset = (layer % 2 === 0) ? 0 : 0.25;
      const count = Math.floor((width - 0.2) / 0.55);

      for (let i = 0; i < count; i++) {
        const x = -width / 2 + 0.35 + i * 0.55 + xOffset;
        if (x + 0.25 > width / 2) continue;
        const bag = new THREE.Mesh(bagGeom, burlapMat);
        bag.position.set(x, y, (Math.random() - 0.5) * 0.04);
        bag.rotation.y = (Math.random() - 0.5) * 0.15;
        bag.castShadow = true;
        bag.receiveShadow = true;
        wall.add(bag);
      }
    }

    return wall;
  }

  /**
   * Industrial Heavy 5-Tier Pallet Rack (五层重型货架)
   */
  public static createWarehouseRack(): THREE.Group {
    const rack = new THREE.Group();
    const steelMat = ToonMaterials.getDarkSteelMaterial();
    const orangeBeamMat = ToonMaterials.createToonStandardMaterial({
      color: '#d96523',
      roughness: 0.4,
      metalness: 0.5
    });

    const width = 3.6;
    const height = 4.2;
    const depth = 1.2;
    const tiers = 5;

    // Upright steel corner columns
    const colGeom = new THREE.BoxGeometry(0.08, height, 0.08);
    const colPositions = [
      [-width / 2, height / 2, -depth / 2],
      [width / 2, height / 2, -depth / 2],
      [-width / 2, height / 2, depth / 2],
      [width / 2, height / 2, depth / 2],
      [0, height / 2, -depth / 2],
      [0, height / 2, depth / 2]
    ];

    colPositions.forEach(pos => {
      const col = new THREE.Mesh(colGeom, steelMat);
      col.position.set(pos[0], pos[1], pos[2]);
      col.castShadow = true;
      rack.add(col);
    });

    // Horizontal beams and wire mesh decking per tier
    const beamGeom = new THREE.BoxGeometry(width + 0.1, 0.08, 0.05);
    const sideBeamGeom = new THREE.BoxGeometry(0.05, 0.08, depth);
    const deckGeom = new THREE.BoxGeometry(width - 0.1, 0.02, depth - 0.1);
    const deckMat = ToonMaterials.getDrainGrateMaterial();

    for (let t = 1; t <= tiers; t++) {
      const y = t * (height / (tiers + 0.4));

      // Front & back beams
      const frontBeam = new THREE.Mesh(beamGeom, orangeBeamMat);
      frontBeam.position.set(0, y, depth / 2);
      rack.add(frontBeam);

      const backBeam = new THREE.Mesh(beamGeom, orangeBeamMat);
      backBeam.position.set(0, y, -depth / 2);
      rack.add(backBeam);

      // Side cross beams
      const leftBeam = new THREE.Mesh(sideBeamGeom, orangeBeamMat);
      leftBeam.position.set(-width / 2, y, 0);
      rack.add(leftBeam);

      const rightBeam = new THREE.Mesh(sideBeamGeom, orangeBeamMat);
      rightBeam.position.set(width / 2, y, 0);
      rack.add(rightBeam);

      // Deck shelf
      const deck = new THREE.Mesh(deckGeom, deckMat);
      deck.position.set(0, y + 0.04, 0);
      deck.receiveShadow = true;
      rack.add(deck);

      // Add assorted crates and boxes on tiers
      if (t <= 4) {
        if (Math.random() > 0.2) {
          const crate = this.createWoodCrate(0.65, 'LOGISTICS');
          crate.position.set(-width * 0.28, y + 0.36, 0);
          rack.add(crate);
        }
        if (Math.random() > 0.3) {
          const cbox = this.createCardboardStack();
          cbox.scale.set(0.6, 0.6, 0.6);
          cbox.position.set(width * 0.25, y + 0.05, 0);
          rack.add(cbox);
        }
      }
    }

    return rack;
  }

  /**
   * Manual Forklift / Pallet Jack (手动叉车)
   */
  public static createPalletJack(): THREE.Group {
    const group = new THREE.Group();
    const yellowMat = ToonMaterials.createToonStandardMaterial({
      color: '#e5a01a',
      roughness: 0.35,
      metalness: 0.4
    });
    const steelMat = ToonMaterials.getDarkSteelMaterial();

    // Dual fork prongs
    const forkGeom = new THREE.BoxGeometry(0.12, 0.06, 1.25);
    const leftFork = new THREE.Mesh(forkGeom, yellowMat);
    leftFork.position.set(-0.24, 0.08, 0.6);
    leftFork.castShadow = true;
    group.add(leftFork);

    const rightFork = new THREE.Mesh(forkGeom, yellowMat);
    rightFork.position.set(0.24, 0.08, 0.6);
    rightFork.castShadow = true;
    group.add(rightFork);

    // Front small wheels
    const wheelGeom = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 10);
    wheelGeom.rotateZ(Math.PI / 2);
    const fw1 = new THREE.Mesh(wheelGeom, steelMat);
    fw1.position.set(-0.24, 0.04, 1.15);
    group.add(fw1);

    const fw2 = new THREE.Mesh(wheelGeom, steelMat);
    fw2.position.set(0.24, 0.04, 1.15);
    group.add(fw2);

    // Rear hydraulic housing
    const bodyGeom = new THREE.BoxGeometry(0.7, 0.55, 0.4);
    const body = new THREE.Mesh(bodyGeom, yellowMat);
    body.position.set(0, 0.35, -0.15);
    body.castShadow = true;
    group.add(body);

    // Steer handle column
    const handleGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.85, 8);
    const handle = new THREE.Mesh(handleGeom, steelMat);
    handle.position.set(0, 0.85, -0.35);
    handle.rotation.x = -0.35;
    group.add(handle);

    // T-bar grip
    const gripGeom = new THREE.BoxGeometry(0.35, 0.04, 0.04);
    const grip = new THREE.Mesh(gripGeom, steelMat);
    grip.position.set(0, 1.2, -0.5);
    group.add(grip);

    return group;
  }

  /**
   * Old Utility Power Pole with Crossbar & Insulators
   */
  public static createUtilityPole(height: number = 7.5): THREE.Group {
    const pole = new THREE.Group();
    const woodMat = ToonMaterials.createToonStandardMaterial({
      color: '#4e3b2b',
      roughness: 0.8,
      map: TextureGenerator.getWoodCrateTexture('POLE')
    });
    const metalMat = ToonMaterials.getDarkSteelMaterial();

    // Main column
    const colGeom = new THREE.CylinderGeometry(0.14, 0.18, height, 12);
    const col = new THREE.Mesh(colGeom, woodMat);
    col.position.y = height / 2;
    col.castShadow = true;
    pole.add(col);

    // Cross arm near top
    const armGeom = new THREE.BoxGeometry(1.6, 0.1, 0.1);
    const arm = new THREE.Mesh(armGeom, metalMat);
    arm.position.set(0, height - 0.6, 0);
    pole.add(arm);

    // Ceramic insulators
    const insMat = new THREE.MeshStandardMaterial({ color: '#2a5d7c', roughness: 0.2 });
    const insGeom = new THREE.CylinderGeometry(0.04, 0.05, 0.14, 8);
    for (let x = -0.65; x <= 0.65; x += 0.42) {
      const ins = new THREE.Mesh(insGeom, insMat);
      ins.position.set(x, height - 0.48, 0);
      pole.add(ins);
    }

    // Transformer cylinder bucket
    const transGeom = new THREE.CylinderGeometry(0.24, 0.24, 0.7, 12);
    const trans = new THREE.Mesh(transGeom, metalMat);
    trans.position.set(0.28, height - 1.8, 0);
    pole.add(trans);

    return pole;
  }

  /**
   * Vintage Street Lamp with Warm Amber Glow & Light fixture
   */
  public static createStreetLamp(): { group: THREE.Group; light: THREE.PointLight; spotLight: THREE.SpotLight } {
    const group = new THREE.Group();
    const metalMat = ToonMaterials.getDarkSteelMaterial();

    // Base & post
    const baseGeom = new THREE.CylinderGeometry(0.2, 0.28, 0.8, 8);
    const base = new THREE.Mesh(baseGeom, metalMat);
    base.position.y = 0.4;
    group.add(base);

    const postGeom = new THREE.CylinderGeometry(0.08, 0.11, 5.2, 10);
    const post = new THREE.Mesh(postGeom, metalMat);
    post.position.y = 3.3;
    post.castShadow = true;
    group.add(post);

    // Curved gooseneck arm
    const armCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 5.8, 0),
      new THREE.Vector3(0.2, 6.4, 0),
      new THREE.Vector3(0.8, 6.5, 0),
      new THREE.Vector3(1.2, 6.2, 0)
    ]);
    const armGeom = new THREE.TubeGeometry(armCurve, 16, 0.04, 8, false);
    const arm = new THREE.Mesh(armGeom, metalMat);
    group.add(arm);

    // Lamp shade hood
    const hoodGeom = new THREE.ConeGeometry(0.35, 0.2, 12);
    const hood = new THREE.Mesh(hoodGeom, metalMat);
    hood.position.set(1.2, 6.1, 0);
    group.add(hood);

    // Glowing bulb mesh
    const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffe699' });
    const bulbGeom = new THREE.SphereGeometry(0.12, 12, 12);
    const bulb = new THREE.Mesh(bulbGeom, bulbMat);
    bulb.position.set(1.2, 6.0, 0);
    group.add(bulb);

    // Warm amber point light
    const light = new THREE.PointLight(0xffb74d, 2.8, 14, 1.8);
    light.position.set(1.2, 5.85, 0);
    light.castShadow = true;
    light.shadow.bias = -0.002;
    group.add(light);

    // Downward spotlight for rain puddle cone
    const spotLight = new THREE.SpotLight(0xffa726, 4.0, 16, Math.PI / 3.5, 0.5, 1.5);
    spotLight.position.set(1.2, 5.9, 0);
    spotLight.target.position.set(1.2, 0, 0);
    group.add(spotLight);
    group.add(spotLight.target);

    return { group, light, spotLight };
  }

  /**
   * Industrial Air Conditioner Outdoor Compressor Unit
   */
  public static createACUnit(): THREE.Group {
    const group = new THREE.Group();
    const metalMat = ToonMaterials.createToonStandardMaterial({
      color: '#bcc5ce',
      roughness: 0.45,
      metalness: 0.5
    });

    const boxGeom = new THREE.BoxGeometry(0.85, 0.65, 0.35);
    const box = new THREE.Mesh(boxGeom, metalMat);
    box.position.y = 0.325;
    box.castShadow = true;
    group.add(box);

    // Fan grille
    const grilleMat = ToonMaterials.getDarkSteelMaterial();
    const grilleGeom = new THREE.TorusGeometry(0.22, 0.02, 8, 16);
    const grille = new THREE.Mesh(grilleGeom, grilleMat);
    grille.position.set(0.12, 0.325, 0.18);
    group.add(grille);

    return group;
  }

  /**
   * Industrial Dumpster with Hinged Lid (工业垃圾桶)
   */
  public static createIndustrialDumpster(color: string = '#2a6f4e'): THREE.Group {
    const group = new THREE.Group();
    const binMat = ToonMaterials.createToonStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.3
    });
    const lidMat = ToonMaterials.createToonStandardMaterial({
      color: '#1a1d22',
      roughness: 0.7,
      metalness: 0.1
    });

    // Body
    const bodyGeom = new THREE.BoxGeometry(1.4, 0.9, 0.85);
    const body = new THREE.Mesh(bodyGeom, binMat);
    body.position.y = 0.55;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Lid (slightly open)
    const lidGeom = new THREE.BoxGeometry(1.45, 0.08, 0.9);
    const lid = new THREE.Mesh(lidGeom, lidMat);
    lid.position.set(0, 1.05, 0);
    lid.rotation.x = -0.18; // Propped open
    group.add(lid);

    // Wheels
    const wheelMat = ToonMaterials.getDarkSteelMaterial();
    const wGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 10);
    wGeom.rotateZ(Math.PI / 2);

    const wPos = [
      [-0.55, 0.08, -0.32],
      [0.55, 0.08, -0.32],
      [-0.55, 0.08, 0.32],
      [0.55, 0.08, 0.32]
    ];
    wPos.forEach(p => {
      const w = new THREE.Mesh(wGeom, wheelMat);
      w.position.set(p[0], p[1], p[2]);
      group.add(w);
    });

    return group;
  }

  /**
   * Rusted Wall Downspout / Gutter (铁皮排水管)
   */
  public static createDrainageDownspout(height: number = 4.0): THREE.Group {
    const group = new THREE.Group();
    const pipeMat = ToonMaterials.createToonStandardMaterial({
      color: '#5a463a',
      roughness: 0.6,
      metalness: 0.5
    });

    const pipeGeom = new THREE.CylinderGeometry(0.06, 0.06, height, 8);
    const pipe = new THREE.Mesh(pipeGeom, pipeMat);
    pipe.position.y = height / 2;
    group.add(pipe);

    // Bottom discharge elbow
    const elbowGeom = new THREE.CylinderGeometry(0.06, 0.06, 0.35, 8);
    elbowGeom.rotateX(Math.PI / 3.5);
    const elbow = new THREE.Mesh(elbowGeom, pipeMat);
    elbow.position.set(0, 0.12, 0.12);
    group.add(elbow);

    return group;
  }
}
