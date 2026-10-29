import * as THREE from 'three';
import { toon, glow, outlined, box, cyl, syncOutline, additive } from './core.js';
import { STORE, PALETTE } from './store.js';

// 街景：底座、路面、人行道、街角道具、小巷、电线杆与路灯。
// 底座 20x20，所有内容都限制在底座范围内。

export const BASE_HALF = 10;
export const WET_Y = 0.2;

export function buildStreet(registry) {
  const street = new THREE.Group();
  const outlinedParts = [];
  const track = (g) => {
    if (g.userData.mesh) outlinedParts.push(g);
    return g;
  };

  // ---- 底座 -------------------------------------------------------------
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(BASE_HALF * 2, 1.4, BASE_HALF * 2), toon(0x1c1a27));
  plinth.position.y = -0.7;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  street.add(plinth);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(BASE_HALF * 2 + 0.3, 0.16, BASE_HALF * 2 + 0.3), toon(0x2a2839));
  rim.position.y = 0.08;
  rim.receiveShadow = true;
  street.add(rim);

  // 地面（沥青）
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(BASE_HALF * 2 - 0.16, BASE_HALF * 2 - 0.16), toon(0x46485c));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.16;
  ground.receiveShadow = true;
  street.add(ground);

  // 人行道
  const pavementMat = toon(0x666a82);
  const pavement = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.14, 2.6), pavementMat);
  pavement.position.set(-3.3, 0.23, 2.55);
  pavement.receiveShadow = true;
  street.add(pavement);
  const sidePavement = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.14, 8.6), pavementMat);
  sidePavement.position.set(3.95, 0.23, -3.3);
  sidePavement.receiveShadow = true;
  street.add(sidePavement);
  // 街角弧形人行道
  const corner = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.14, 20, 1, false, 0, Math.PI / 2), pavementMat);
  corner.position.set(3.0, 0.23, 3.85);
  corner.receiveShadow = true;
  street.add(corner);

  // 铺装缝
  const seamMat = toon(0x4b4e62);
  for (let i = 0; i < 13; i += 1) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.02, 2.6), seamMat);
    seam.position.set(-9.3 + i * 0.98, 0.305, 2.55);
    street.add(seam);
  }
  for (let i = 0; i < 3; i += 1) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.02, 0.05), seamMat);
    seam.position.set(-3.3, 0.305, 1.75 + i * 0.82);
    street.add(seam);
  }

  // 路缘石
  track(street.add(box(12.6, 0.16, 0.2, toon(0x62657c), -3.3, 0.16, 3.83)));
  track(street.add(box(0.2, 0.16, 8.6, toon(0x62657c), 4.98, 0.16, -3.3)));

  // 主路 + 辅路
  const roadMat = toon(0x30323f);
  const mainRoad = new THREE.Mesh(new THREE.BoxGeometry(BASE_HALF * 2 - 0.16, 0.02, 5.9), roadMat);
  mainRoad.position.set(0, 0.17, 6.85);
  mainRoad.receiveShadow = true;
  street.add(mainRoad);
  const sideRoad = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.022, BASE_HALF * 2 - 0.16), roadMat);
  sideRoad.position.set(7.4, 0.171, 0);
  sideRoad.receiveShadow = true;
  street.add(sideRoad);

  // 斑马线
  const stripeMat = toon(0xdfe2ee);
  for (let i = 0; i < 6; i += 1) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.012, 3.7), stripeMat);
    s.position.set(1.0 + i * 0.8, 0.19, 6.8);
    s.receiveShadow = true;
    street.add(s);
  }
  for (let i = 0; i < 5; i += 1) {
    const s = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.012, 0.48), stripeMat);
    s.position.set(7.4, 0.19, 2.6 + i * 0.78);
    s.receiveShadow = true;
    street.add(s);
  }

  // 中心线 + 停车位线
  const lineMat = toon(0xc0c4d2);
  for (let i = 0; i < 6; i += 1) {
    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.012, 0.14), lineMat);
    dash.position.set(-8.8 + i * 2.6, 0.19, 6.85);
    street.add(dash);
  }
  for (let i = 0; i < 3; i += 1) {
    const l = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.012, 2.2), lineMat);
    l.position.set(-8.4 + i * 2.2, 0.19, 5.0);
    street.add(l);
  }

  // 排水沟 + 格栅
  const gutter = new THREE.Mesh(new THREE.BoxGeometry(BASE_HALF * 2 - 0.3, 0.03, 0.38), toon(0x15161f));
  gutter.position.set(0, 0.185, 4.02);
  street.add(gutter);
  for (let i = 0; i < 24; i += 1) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.03, 0.38), toon(0x41455a));
    bar.position.set(-9.2 + i * 0.8, 0.2, 4.02);
    street.add(bar);
  }

  // ---- 街角道具 ---------------------------------------------------------
  const props = new THREE.Group();
  street.add(props);

  // 自动贩卖机
  const vending = (x, z, rotY) => {
    const g = new THREE.Group();
    g.add(box(1.0, 1.9, 0.66, toon(0xe4ebf2), 0, 0, 0));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 1.0), glow(0xc8ecff));
    face.position.set(0, 1.24, 0.34);
    g.add(face);
    for (let r = 0; r < 3; r += 1) {
      for (let c = 0; c < 4; c += 1) {
        const item = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.2), glow(PALETTE[(r * 4 + c) % PALETTE.length]));
        item.position.set(-0.28 + c * 0.19, 0.9 + r * 0.28, 0.345);
        g.add(item);
      }
    }
    g.add(box(0.46, 0.2, 0.05, toon(0x585f70), 0, 0.3, 0.34, { thickness: 0.01 }));
    const glowPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.6), additive(0x9fe2ff, 0.1));
    glowPlane.position.set(0, 1.1, 0.6);
    g.add(glowPlane);
    g.position.set(x, 0.3, z);
    g.rotation.y = rotY;
    props.add(g);
    return g;
  };
  vending(-8.2, 3.0, 0.06);
  vending(4.0, -1.6, -Math.PI / 2);

  // 自行车
  const bicycle = (x, z, rotY) => {
    const g = new THREE.Group();
    const frameMat = toon(0x53718f);
    const wheelGeo = new THREE.TorusGeometry(0.34, 0.042, 5, 14);
    for (const dx of [-0.48, 0.48]) {
      const wheel = outlined(wheelGeo, toon(0x20222c), { thickness: 0.014 });
      wheel.position.set(dx, 0.34, 0);
      wheel.rotation.y = Math.PI / 2;
      g.add(wheel);
    }
    g.add(box(0.95, 0.055, 0.055, frameMat, 0, 0.53, 0, { thickness: 0.014 }));
    g.add(box(0.28, 0.08, 0.15, toon(0x25272f), -0.32, 0.6, 0, { thickness: 0.01 }));
    g.add(box(0.055, 0.28, 0.4, frameMat, 0.4, 0.6, 0, { thickness: 0.012 }));
    g.add(box(0.32, 0.24, 0.28, toon(0x93a0b0), 0.48, 0.6, 0, { thickness: 0.012 }));
    g.position.set(x, 0.3, z);
    g.rotation.y = rotY;
    props.add(g);
  };
  bicycle(-7.2, 3.3, 0.1);
  bicycle(-6.0, 3.35, -0.05);

  // 雨伞架
  props.add(box(0.46, 0.86, 0.46, toon(0x5d6474), -4.7, 0.3, 2.75));
  for (let i = 0; i < 4; i += 1) {
    const color = [0xd94f6a, 0x4f7fd9, 0x2f9a7a, 0xe0b23c][i];
    const umb = box(0.09, 1.1, 0.09, toon(color), -4.86 + (i % 2) * 0.28, 0.46, 2.64 + Math.floor(i / 2) * 0.24, { thickness: 0.008 });
    umb.rotation.z = (i - 1.5) * 0.05;
    props.add(umb);
  }

  // 垃圾桶
  const bin = outlined(new THREE.CylinderGeometry(0.3, 0.26, 0.8, 12), toon(0x434c5e), { thickness: 0.016 });
  bin.position.set(-3.6, 0.7, 3.15);
  props.add(bin);
  const lid = outlined(new THREE.CylinderGeometry(0.32, 0.32, 0.07, 12), toon(0x5c6577), { thickness: 0.012 });
  lid.position.set(-3.6, 1.13, 3.15);
  props.add(lid);

  // 路灯
  const streetLamp = (x, z, height, dir = 1) => {
    const g = new THREE.Group();
    const pole = outlined(new THREE.CylinderGeometry(0.085, 0.11, height, 8), toon(0x2e3341), { thickness: 0.016 });
    pole.position.y = height / 2;
    g.add(pole);
    g.add(box(0.95, 0.08, 0.08, toon(0x2e3341), 0.42 * dir, height - 0.08, 0, { thickness: 0.014 }));
    const head = outlined(new THREE.ConeGeometry(0.28, 0.22, 10), toon(0x353b4d), { thickness: 0.012 });
    head.position.set(0.88 * dir, height - 0.14, 0);
    g.add(head);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), glow(0xffd49a));
    bulb.position.set(0.88 * dir, height - 0.27, 0);
    g.add(bulb);
    const cone = new THREE.Mesh(
      new THREE.ConeGeometry(2.0, 4.2, 16, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xffc87a,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    cone.position.set(0.88 * dir, height - 2.4, 0);
    g.add(cone);
    g.position.set(x, 0.3, z);
    props.add(g);
    return g;
  };
  streetLamp(-9.2, 3.6, 5.4, 1);
  streetLamp(4.7, -8.2, 5.0, -1);

  // 电线杆 + 电线
  const poleMat = toon(0x35323f);
  const utility = outlined(new THREE.CylinderGeometry(0.15, 0.19, 7.4, 8), poleMat, { thickness: 0.016 });
  utility.position.set(-9.5, 4.0, -8.5);
  props.add(utility);
  for (let i = 0; i < 3; i += 1) {
    props.add(box(1.6, 0.08, 0.08, poleMat, -9.5, 6.1 + i * 0.4, -8.5, { thickness: 0.014 }));
  }
  props.add(box(0.5, 0.66, 0.5, toon(0x4d4a5b), -9.5, 4.5, -8.15));

  const wireMat = new THREE.MeshBasicMaterial({ color: 0x15161e });
  const wire = (pts, sag) => {
    const curve = new THREE.CatmullRomCurve3(
      pts.map((p, i) => {
        const v = new THREE.Vector3(...p);
        if (i > 0 && i < pts.length - 1) v.y -= sag;
        return v;
      }),
    );
    const geo = new THREE.TubeGeometry(curve, 26, 0.02, 4, false);
    props.add(new THREE.Mesh(geo, wireMat));
  };
  wire([[-9.5, 6.6, -8.5], [-4.5, 6.3, -9.3], [2.0, 6.7, -9.1], [9.4, 6.1, -9.5]], 0.7);
  wire([[-9.5, 6.2, -8.5], [-3.5, 5.8, -8.2], [3.0, 6.1, -7.4], [9.4, 5.6, -8.0]], 0.6);
  wire([[-9.5, 6.6, -8.5], [-9.7, 6.0, -3.0], [-9.6, 5.6, 3.0]], 0.35);
  wire([[-9.5, 6.0, -8.5], [-5.5, 4.6, -8.6]], 0.15);

  // 路牌
  const signPole = outlined(new THREE.CylinderGeometry(0.055, 0.055, 3.1, 6), toon(0x4f5364), { thickness: 0.012 });
  signPole.position.set(-2.0, 1.85, 3.5);
  props.add(signPole);
  props.add(box(1.4, 0.32, 0.06, toon(0x2f4f8a), -1.3, 3.05, 3.5, { thickness: 0.012 }));
  const signStripe = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 0.08), glow(0xdff1ff));
  signStripe.position.set(-1.3, 3.16, 3.54);
  props.add(signStripe);

  // 护栏
  const guardrail = (x, z, rotY, length) => {
    const g = new THREE.Group();
    for (let i = 0; i <= 2; i += 1) {
      const post = outlined(new THREE.CylinderGeometry(0.045, 0.045, 0.78, 6), toon(0x707792), { thickness: 0.012 });
      post.position.set(-length / 2 + (i * length) / 2, 0.39, 0);
      g.add(post);
    }
    g.add(box(length, 0.06, 0.06, toon(0x707792), 0, 0.7, 0, { thickness: 0.014 }));
    g.add(box(length, 0.045, 0.045, toon(0x5c6377), 0, 0.5, 0, { thickness: 0.012 }));
    g.position.set(x, 0.3, z);
    g.rotation.y = rotY;
    props.add(g);
  };
  guardrail(-6.0, 4.35, 0, 3.8);
  guardrail(4.6, 3.2, 0.34, 2.8);

  // 空调外机
  const acUnit = (x, y, z, rotY) => {
    const g = new THREE.Group();
    g.add(box(0.85, 0.6, 0.4, toon(0xbfc3cd), 0, 0, 0));
    const fan = outlined(new THREE.TorusGeometry(0.2, 0.035, 5, 12), toon(0x737a8a), { thickness: 0.01 });
    fan.position.set(0, 0.3, 0.22);
    g.add(fan);
    const grille = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), new THREE.MeshBasicMaterial({ color: 0x2c303a }));
    grille.position.set(0, 0.3, 0.215);
    g.add(grille);
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    props.add(g);
  };
  acUnit(-9.1, 0.75, -2.4, Math.PI / 2);
  acUnit(-9.1, 0.75, 0.0, Math.PI / 2);
  acUnit(3.3, 0.7, -6.4, -Math.PI / 2);

  // 公告栏
  const board = new THREE.Group();
  board.add(box(1.6, 1.05, 0.07, toon(0x8d7558), 0, 0, 0));
  for (let i = 0; i < 4; i += 1) {
    const poster = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.58), glow([0xffe9b8, 0xffc4d6, 0xc4e9ff, 0xd6ffc4][i]));
    poster.position.set(-0.36 + (i % 2) * 0.72, 0.24 + Math.floor(i / 2) * 0.02, 0.04);
    board.add(poster);
  }
  board.position.set(-9.25, 1.7, 1.4);
  board.rotation.y = Math.PI / 2;
  props.add(board);
  props.add(box(0.06, 1.25, 0.06, toon(0x5f4d3a), -9.25, 0.3, 0.75, { thickness: 0.01 }));
  props.add(box(0.06, 1.25, 0.06, toon(0x5f4d3a), -9.25, 0.3, 2.05, { thickness: 0.01 }));

  // 停车挡车器
  props.add(box(1.3, 0.11, 0.16, toon(0x8f94a3), -7.3, 0.2, 5.9, { thickness: 0.012 }));
  props.add(box(1.3, 0.11, 0.16, toon(0x8f94a3), -5.1, 0.2, 5.9, { thickness: 0.012 }));

  // 巷口（便利店左侧）
  const alley = new THREE.Group();
  alley.add(box(0.45, 4.4, 4.0, toon(0x3c3749), -9.6, 0.3, -5.9));
  const alleyFloor = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 4.0), toon(0x26262f));
  alleyFloor.rotation.x = -Math.PI / 2;
  alleyFloor.position.set(-9.0, 0.31, -5.9);
  alley.add(alleyFloor);
  const alleyLamp = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), glow(0xffca86));
  alleyLamp.position.set(-9.1, 3.4, -4.3);
  alley.add(alleyLamp);
  const alleyCone = new THREE.Mesh(
    new THREE.ConeGeometry(1.2, 2.9, 12, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xffb877,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );
  alleyCone.position.set(-9.1, 2.1, -4.3);
  alley.add(alleyCone);
  alley.add(box(0.45, 0.65, 0.45, toon(0x6f6150), -9.35, 0.3, -7.0));
  alley.add(box(0.36, 0.38, 0.55, toon(0x585c6e), -8.9, 0.3, -7.4));
  street.add(alley);

  // 交通信号灯
  const traffic = new THREE.Group();
  const tPole = outlined(new THREE.CylinderGeometry(0.06, 0.06, 2.9, 6), toon(0x2d3140), { thickness: 0.012 });
  tPole.position.set(8.7, 1.75, 3.5);
  traffic.add(tPole);
  traffic.add(box(0.24, 0.68, 0.24, toon(0x24272f), 8.7, 3.1, 3.5));
  const lampRed = new THREE.Mesh(new THREE.CircleGeometry(0.07, 10), glow(0xff5b5b));
  lampRed.position.set(8.7, 3.6, 3.63);
  traffic.add(lampRed);
  const lampAmber = new THREE.Mesh(new THREE.CircleGeometry(0.07, 10), glow(0xffc75b));
  lampAmber.position.set(8.7, 3.44, 3.63);
  traffic.add(lampAmber);
  const lampGreen = new THREE.Mesh(new THREE.CircleGeometry(0.07, 10), glow(0x5bff9c));
  lampGreen.position.set(8.7, 3.28, 3.63);
  traffic.add(lampGreen);
  street.add(traffic);

  // 街角绿植
  street.add(box(0.7, 0.36, 0.7, toon(0x6d5c4b), 1.6, 0.3, 3.2));
  for (let i = 0; i < 5; i += 1) {
    const blob = outlined(new THREE.IcosahedronGeometry(0.24 + (i % 3) * 0.05, 0), toon(0x2f6b4f), { thickness: 0.012 });
    blob.position.set(1.6 + ((i % 3) - 1) * 0.16, 0.86 + Math.floor(i / 3) * 0.22, 3.2 + (((i * 2) % 3) - 1) * 0.14);
    street.add(blob);
  }

  registry.street = street;
  registry.streetOutlines = outlinedParts;
  registry.traffic = { lampRed, lampAmber, lampGreen };
  registry.sync = () => {
    for (const g of outlinedParts) syncOutline(g);
  };

  return street;
}
