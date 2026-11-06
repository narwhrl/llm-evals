function clothTexture(THREE, color) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 64, 64);
  ctx.strokeStyle = 'rgba(255,255,255,.07)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 64; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 64);
    ctx.moveTo(0, i);
    ctx.lineTo(64, i);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function desktopTexture(THREE, vertical) {
  const canvas = document.createElement('canvas');
  canvas.width = vertical ? 192 : 320;
  canvas.height = vertical ? 320 : 200;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.fillStyle = '#263d45';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#1c3036';
  ctx.fillRect(0, 0, w, 22);
  ctx.fillStyle = '#b4c5c4';
  ctx.font = '9px monospace';
  ctx.fillText(vertical ? 'FRIENDS / ONLINE' : 'EVENING PLAYLIST', 14, 15);
  const colors = ['#d5a16f', '#83b2ac', '#a6b782', '#b9ac96'];
  for (let i = 0; i < (vertical ? 8 : 5); i++) {
    const y = 40 + i * 29;
    ctx.fillStyle = colors[i % 4];
    ctx.fillRect(15, y, 16, 16);
    ctx.fillStyle = '#a9c1bf';
    ctx.fillRect(42, y + 2, 50 + (i % 3) * 14, 3);
    ctx.fillStyle = '#6d898d';
    ctx.fillRect(42, y + 10, 40, 2);
    ctx.fillStyle = '#78aa7b';
    ctx.fillRect(w - 20, y + 6, 4, 4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function buildSetup(THREE, helpers, eraYear, screenTexture) {
  const { box, cyl, mat, label, tube } = helpers;
  const group = new THREE.Group();
  group.name = `setup-${eraYear}`;
  const early = eraYear === 2005;
  const mid = eraYear === 2010;
  const late = eraYear >= 2020;
  const dark = mat('#333c3d', 0.66);
  const graphite = mat('#485051', 0.78);
  const rubber = mat('#22292a', 0.97);
  const ivory = mat('#d6d2bb', 0.72);
  const cream = mat('#ede8d6', 0.64);
  const metal = mat('#727c7b', 0.38, 0.72);
  const oak = mat(early ? '#ae8053' : eraYear === 2025 ? '#b78b62' : '#c09b72', 0.8);
  const walnut = mat('#6f5240', 0.9);
  const paper = mat('#e8debe', 0.94);
  const orange = mat('#c78356', 0.7);
  const turquoise = mat('#67a8a2', 0.6);
  const blue = mat('#557e8c', 0.98);
  blue.map = clothTexture(THREE, '#557e8c');
  const seatMaterial = mat(eraYear === 2015 ? '#414b51' : '#58645f', 0.98);
  seatMaterial.map = clothTexture(THREE, eraYear === 2015 ? '#414b51' : '#58645f');

  function addMesh(geometry, material, x, y, z, parent = group) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function ring(radius, thickness, x, y, z, material, parent = group) {
    return addMesh(new THREE.TorusGeometry(radius, thickness, 6, 24), material, x, y, z, parent);
  }

  function rod(a, b, radius, material, parent = group) {
    const from = new THREE.Vector3(...a);
    const to = new THREE.Vector3(...b);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, from.distanceTo(to), 8), material);
    mesh.position.copy(from).lerp(to, 0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), to.sub(from).normalize());
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function plane(texture, width, height, x, y, z, parent = group) {
    return addMesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }), x, y, z, parent);
  }

  // The desktop surface remains at the same height as the room's persistent mug.
  box(group, 3.1, 0.16, 1.25, 0.65, 1.45, -1.85, oak, 0.035);
  if (early || mid) {
    box(group, 0.62, 1.29, 1.1, 1.8, 0.72, -1.88, oak, 0.018);
    for (let i = 0; i < 3; i++) {
      box(group, 0.54, 0.34, 0.035, 1.8, 0.37 + i * 0.37, -1.31, early ? oak : walnut, 0.01);
      box(group, 0.19, 0.025, 0.025, 1.8, 0.4 + i * 0.37, -1.28, dark, 0.008);
    }
    box(group, 0.10, 1.35, 1.04, -0.77, 0.70, -1.86, oak, 0.012);
    box(group, 2.57, 0.29, 0.07, 0.54, 1.15, -2.36, oak, 0.012);
    if (early) {
      const sticker = label(group, 'PLAY MORE', 0.34, 0.12, 1.76, 0.76, -1.285, '#dfbc72', '#735d43');
      sticker.rotation.z = -0.06;
      box(group, 1.50, 0.06, 0.54, 0.18, 1.26, -1.29, oak, 0.012);
    }
  } else {
    for (const x of [-0.67, 1.98]) {
      box(group, 0.075, 1.31, 0.075, x, 0.73, -2.23, dark, 0.012);
      box(group, 0.075, 1.31, 0.075, x, 0.73, -1.47, dark, 0.012);
      box(group, 0.1, 0.07, 0.99, x, 0.1, -1.85, dark, 0.012);
    }
    box(group, 2.7, 0.055, 0.055, 0.65, 0.39, -2.23, dark, 0.012);
    if (eraYear === 2025) {
      box(group, 0.68, 0.12, 0.91, 1.61, 1.30, -1.86, walnut, 0.02);
      box(group, 0.08, 0.035, 0.04, 1.87, 1.31, -1.37, metal, 0.005);
    }
  }
  for (let i = 0; i < 8; i++) {
    const line = box(group, 0.36 + (i % 3) * 0.2, 0.002, 0.005, -0.5 + i * 0.34, 1.532, -2.35 + (i % 4) * 0.27, walnut, 0);
    line.material = walnut;
  }
  if (eraYear >= 2015) box(group, 1.78, 0.013, 0.52, 0.40, 1.54, -1.58, eraYear === 2025 ? mat('#6e8174', 0.98) : dark, 0.03);

  let screenMesh;
  let screenAnchor;
  function monitor(x, y, z, width, height, texture, main, stand = true) {
    box(group, width + 0.09, height + 0.09, 0.085, x, y, z, dark, 0.025);
    const mesh = plane(texture, width, height, x, y + 0.005, z + 0.047);
    box(group, 0.04, 0.007, 0.006, x + width * 0.38, y - height / 2 - 0.017, z + 0.049, turquoise, 0.003);
    if (stand) {
      box(group, 0.07, y - height / 2 - 1.56, 0.06, x, (y - height / 2 + 1.56) / 2, z - 0.03, metal, 0.01);
      box(group, 0.43, 0.035, 0.28, x, 1.56, z + 0.02, graphite, 0.025);
    }
    if (main) {
      screenMesh = mesh;
      screenAnchor = [x, y, z + 0.047];
    }
  }
  if (early) {
    const x = 0.32;
    box(group, 1.19, 0.98, 0.55, x, 2.075, -1.97, ivory, 0.075);
    box(group, 0.79, 0.73, 0.28, x, 2.075, -2.35, ivory, 0.045);
    box(group, 1.05, 0.78, 0.045, x, 2.12, -1.675, dark, 0.035);
    screenMesh = plane(screenTexture, 0.94, 0.705, x, 2.12, -1.65);
    screenAnchor = [x, 2.12, -1.65];
    cyl(group, 0.21, 0.26, 0.08, x, 1.57, -2.0, ivory);
    box(group, 0.61, 0.055, 0.44, x, 1.555, -1.97, ivory, 0.04);
    for (let i = 0; i < 5; i++) box(group, 0.047, 0.014, 0.01, x + 0.21 + i * 0.055, 1.68, -1.686, graphite, 0.004);
    cyl(group, 0.026, 0.026, 0.012, x - 0.44, 1.68, -1.68, turquoise, 12).rotation.x = Math.PI / 2;
    for (let i = 0; i < 9; i++) box(group, 0.003, 0.19, 0.024, x + 0.6, 2.04, -2.25 + i * 0.045, walnut, 0);
  } else if (mid) {
    monitor(0.40, 2.05, -2.13, 1.29, 0.81, screenTexture, true);
  } else if (eraYear === 2015) {
    monitor(0.12, 2.10, -2.14, 1.30, 0.81, screenTexture, true);
    monitor(1.38, 2.10, -2.17, 0.92, 0.65, desktopTexture(THREE, false), false);
  } else if (eraYear === 2020) {
    monitor(0.22, 2.14, -2.15, 1.42, 0.80, screenTexture, true);
    monitor(1.48, 2.23, -2.16, 0.56, 1.08, desktopTexture(THREE, true), false);
  } else {
    monitor(0.58, 2.12, -2.13, 1.95, 0.82, screenTexture, true, false);
    rod([0.60, 1.55, -2.38], [0.60, 1.86, -2.38], 0.04, metal);
    rod([0.60, 1.86, -2.38], [0.91, 2.01, -2.30], 0.038, metal);
    rod([0.91, 2.01, -2.30], [0.58, 2.12, -2.20], 0.038, metal);
    box(group, 0.64, 0.035, 0.035, 0.58, 2.59, -2.07, graphite, 0.012);
    box(group, 0.57, 0.013, 0.013, 0.58, 2.566, -2.059, mat('#f3d3a0', 0.3), 0.004);
  }
  screenMesh.name = 'interactive-screen';

  const ky = early ? 1.31 : 1.57;
  const kz = early ? -1.22 : -1.47;
  const keyboard = new THREE.Group();
  keyboard.position.set(0.23, ky, kz);
  group.add(keyboard);
  const keyboardBody = early ? ivory : eraYear === 2025 ? cream : graphite;
  box(keyboard, 1.08, 0.055, 0.34, 0, 0, 0, keyboardBody, 0.018);
  const keyMaterial = early ? cream : eraYear === 2025 ? ivory : dark;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 13; col++) {
      const accent = eraYear >= 2015 && (col === 0 && row === 0 || col === 12 && row === 2);
      box(keyboard, 0.054, 0.026, 0.047, -0.459 + col * 0.071, 0.038, -0.116 + row * 0.059, accent ? orange : keyMaterial, 0.005);
    }
  }
  box(keyboard, 0.35, 0.025, 0.038, -0.08, 0.038, 0.121, early ? cream : late ? orange : keyMaterial, 0.005);
  for (let i = 0; i < 3; i++) box(keyboard, 0.009, 0.004, 0.009, 0.37 + i * 0.035, 0.035, -0.14, turquoise, 0);
  const mouse = addMesh(new THREE.SphereGeometry(1, 16, 10), early ? cream : graphite, 1.0, early ? 1.58 : 1.61, -1.49);
  mouse.scale.set(0.096, 0.056, 0.145);
  box(group, 0.01, 0.012, 0.04, 1.0, early ? 1.637 : 1.667, -1.53, rubber, 0.003);
  if (early || mid) {
    box(group, 0.34, 0.009, 0.42, 1.0, 1.535, -1.50, early ? blue : dark, 0.02);
    tube(group, [[1.0, 1.59, -1.63], [1.1, 1.55, -1.96], [0.91, 1.54, -2.35]], 0.009, rubber);
    tube(group, [[0.23, ky, kz - 0.17], [0.12, 1.37, -1.69], [-0.1, 1.57, -2.25]], 0.009, rubber);
  }

  const tx = early ? -0.42 : mid ? -0.42 : 1.65;
  const tz = -2.00;
  const towerHeight = early ? 0.98 : mid ? 1.08 : 1.12;
  const towerMaterial = early ? ivory : dark;
  box(group, 0.47, towerHeight, 0.77, tx, towerHeight / 2 + 0.10, tz, towerMaterial, 0.035);
  box(group, 0.42, towerHeight - 0.08, 0.02, tx, towerHeight / 2 + 0.1, tz + 0.397, early ? cream : graphite, 0.015);
  if (early || mid) {
    for (let i = 0; i < 2; i++) {
      box(group, 0.34, 0.078, 0.012, tx, 0.91 - i * 0.105, tz + 0.414, early ? ivory : dark, 0.005);
      box(group, 0.20, 0.012, 0.014, tx - 0.03, 0.91 - i * 0.105, tz + 0.423, rubber, 0);
    }
    for (let i = 0; i < 6; i++) box(group, 0.29, 0.013, 0.009, tx, 0.29 + i * 0.037, tz + 0.416, dark, 0);
    label(group, early ? 'P4' : 'CORE', 0.09, 0.08, tx - 0.115, 0.56, tz + 0.419, '#527b9a', '#ffffff');
  } else {
    box(group, 0.013, 0.94, 0.63, tx - 0.242, 0.66, tz, mat('#516566', 0.35, 0.3), 0.006);
    for (let i = 0; i < 2; i++) {
      const y = 0.43 + i * 0.4;
      const fan = cyl(group, 0.14, 0.14, 0.023, tx, y, tz + 0.421, rubber, 24);
      fan.rotation.x = Math.PI / 2;
      ring(0.12, 0.012, tx, y, tz + 0.44, eraYear === 2025 ? orange : turquoise);
      cyl(group, 0.034, 0.034, 0.02, tx, y, tz + 0.45, graphite, 16).rotation.x = Math.PI / 2;
      for (let j = 0; j < 5; j++) {
        const blade = box(group, 0.035, 0.10, 0.009, tx + Math.sin(j * 1.256) * 0.063, y + Math.cos(j * 1.256) * 0.063, tz + 0.444, graphite, 0.008);
        blade.rotation.z = -j * 1.256 + 0.5;
      }
    }
  }
  cyl(group, 0.023, 0.023, 0.012, tx + 0.12, towerHeight - 0.1, tz + 0.424, turquoise, 12).rotation.x = Math.PI / 2;
  for (let i = 0; i < 2; i++) box(group, 0.045, 0.018, 0.012, tx - 0.08 + i * 0.07, towerHeight - 0.1, tz + 0.426, rubber, 0.003);
  tube(group, [[tx, 0.8, -2.40], [tx - 0.15, 0.12, -2.57], [0.12, 0.09, -2.60], [-0.1, 1.3, -2.45], [0.30, 1.7, -2.35]], 0.013, rubber);

  if (early || mid || eraYear === 2025) {
    for (const x of early ? [-0.52, 1.15] : mid ? [-0.63, 1.38] : [-0.65, 1.92]) {
      const sy = early ? 1.76 : eraYear === 2025 ? 1.73 : 1.75;
      box(group, 0.21, early ? 0.42 : 0.34, 0.19, x, sy, -2.08, early ? ivory : eraYear === 2025 ? walnut : dark, 0.025);
      cyl(group, 0.061, 0.061, 0.012, x, sy - 0.04, -1.976, rubber, 20).rotation.x = Math.PI / 2;
      ring(0.06, 0.008, x, sy - 0.04, -1.963, early ? graphite : metal);
      cyl(group, 0.023, 0.023, 0.01, x, sy + 0.086, -1.977, rubber, 16).rotation.x = Math.PI / 2;
    }
  }

  if (eraYear >= 2015) {
    const headset = new THREE.Group();
    group.add(headset);
    const hx = eraYear === 2025 ? 1.94 : -0.66;
    const hz = eraYear === 2025 ? -1.65 : -2.03;
    const headband = addMesh(new THREE.TorusGeometry(0.16, 0.025, 8, 24, Math.PI), graphite, hx, 1.88, hz, headset);
    headband.rotation.z = 0;
    for (const offset of [-0.16, 0.16]) box(headset, 0.068, 0.16, 0.13, hx + offset, 1.84, hz, dark, 0.03);
    box(group, 0.027, 0.40, 0.03, hx, 1.77, hz + 0.055, metal, 0.01);
    box(group, 0.24, 0.025, 0.21, hx, 1.55, hz + 0.04, graphite, 0.025);
  }
  if (eraYear === 2020) {
    rod([-0.78, 1.54, -2.12], [-0.77, 2.02, -2.14], 0.019, dark);
    rod([-0.77, 2.02, -2.14], [-0.40, 1.90, -1.70], 0.018, dark);
    cyl(group, 0.048, 0.05, 0.19, -0.40, 1.84, -1.70, graphite, 16);
    box(group, 0.30, 0.018, 0.36, 1.21, 1.55, -1.75, paper, 0.004);
    for (let i = 0; i < 4; i++) box(group, 0.19, 0.002, 0.003, 1.21, 1.563, -1.82 + i * 0.045, graphite, 0);
    box(group, 0.025, 0.023, 0.29, 1.43, 1.56, -1.75, orange, 0.005);
  }
  if (eraYear === 2025) {
    const tablet = new THREE.Group();
    tablet.position.set(-0.63, 1.73, -1.74);
    tablet.rotation.x = -0.24;
    group.add(tablet);
    box(tablet, 0.29, 0.39, 0.027, 0, 0, 0, graphite, 0.018);
    plane(desktopTexture(THREE, true), 0.25, 0.34, 0, 0, 0.016, tablet);
    box(group, 0.14, 0.02, 0.23, -0.63, 1.55, -1.79, metal, 0.02);
  }

  const chair = new THREE.Group();
  chair.position.set(0.65, 0, -0.42);
  chair.rotation.y = early ? -0.18 : 0.15;
  group.add(chair);
  const chairSeat = early ? blue : seatMaterial;
  box(chair, early ? 0.64 : 0.72, 0.15, 0.65, 0, 0.85, 0, chairSeat, 0.08);
  if (early) {
    for (const x of [-0.24, 0.24]) {
      rod([x, 0.78, -0.23], [x * 1.15, 0.08, -0.29], 0.035, walnut, chair);
      rod([x, 0.78, 0.23], [x * 1.15, 0.08, 0.29], 0.035, walnut, chair);
      rod([x, 0.78, 0.25], [x, 1.61, 0.29], 0.032, walnut, chair);
    }
    box(chair, 0.61, 0.37, 0.09, 0, 1.46, 0.29, blue, 0.06);
    rod([-0.26, 0.29, 0.26], [0.26, 0.29, 0.26], 0.023, walnut, chair);
  } else {
    cyl(chair, 0.042, 0.062, 0.58, 0, 0.47, 0, metal, 16);
    for (let i = 0; i < 5; i++) {
      const a = i * Math.PI * 2 / 5;
      const x = Math.sin(a) * 0.44;
      const z = Math.cos(a) * 0.44;
      rod([0, 0.28, 0], [x, 0.23, z], 0.033, dark, chair);
      const wheel = cyl(chair, 0.073, 0.073, 0.07, x, 0.19, z, rubber, 12);
      wheel.rotation.z = Math.PI / 2;
    }
    rod([0, 0.67, 0.19], [0, 1.43, 0.29], 0.042, dark, chair);
    const backHeight = mid ? 0.61 : eraYear === 2015 ? 1.04 : 0.91;
    const backY = mid ? 1.34 : 1.53;
    if (eraYear < 2025) {
      box(chair, eraYear === 2015 ? 0.70 : 0.66, backHeight, 0.15, 0, backY, 0.30, chairSeat, 0.10);
      if (eraYear === 2015) {
        for (const x of [-0.28, 0.28]) box(chair, 0.065, 0.78, 0.04, x, backY, 0.39, orange, 0.02);
        box(chair, 0.33, 0.14, 0.07, 0, 1.89, 0.20, dark, 0.03);
        box(chair, 0.38, 0.15, 0.09, 0, 1.17, 0.17, dark, 0.04);
      }
    } else {
      for (const x of [-0.31, 0.31]) rod([x, 1.06, 0.29], [x * 0.90, 1.92, 0.34], 0.035, graphite, chair);
      rod([-0.28, 1.92, 0.34], [0.28, 1.92, 0.34], 0.038, graphite, chair);
      rod([-0.31, 1.06, 0.29], [0.31, 1.06, 0.29], 0.035, graphite, chair);
      for (let i = 0; i < 10; i++) {
        const y = 1.10 + i * 0.077;
        rod([-0.29, y, 0.31], [0.29, y, 0.31], 0.009, seatMaterial, chair);
      }
      for (let i = 0; i < 8; i++) {
        const x = -0.25 + i * 0.071;
        rod([x, 1.08, 0.31], [x, 1.90, 0.34], 0.006, seatMaterial, chair);
      }
      box(chair, 0.40, 0.16, 0.11, 0, 2.04, 0.35, seatMaterial, 0.06);
      box(chair, 0.38, 0.11, 0.055, 0, 1.27, 0.39, graphite, 0.025);
    }
    for (const x of [-0.40, 0.40]) {
      rod([x, 0.84, 0.12], [x, 1.21, 0.05], 0.024, graphite, chair);
      box(chair, 0.12, 0.055, 0.36, x, 1.22, 0, rubber, 0.035);
    }
  }

  return {
    group,
    screenMesh,
    anchors: {
      screen: screenAnchor,
      keyboard: [0.23, ky + 0.1, kz],
      computer: [tx, towerHeight * 0.65, tz + 0.42],
      chair: [0.65, 1.3, -0.12],
    },
  };
}
