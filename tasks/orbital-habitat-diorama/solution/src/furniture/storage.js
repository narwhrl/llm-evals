import { labelTexture, paintedTexture } from '../textures/props.js';
import { canvasTexture } from '../textures/canvas.js';

export function buildStorage(k, root) {
  const { ctx, THREE, materials: m, box, cyl, face, bar, group, mount } = k;
  const g = group(root, 'storage');
  const netMap = canvasTexture(256, 256, (c, w, h) => {
    c.clearRect(0, 0, w, h); c.strokeStyle = '#8b9782'; c.lineWidth = 3;
    for (let i = -256; i < 512; i += 25) {
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i + 256, 256); c.stroke();
      c.beginPath(); c.moveTo(i, 0); c.lineTo(i - 256, 256); c.stroke();
    }
  });
  const netMaterial = k.mat(netMap, '#ffffff', { transparent: true, alphaTest: .4, side: THREE.DoubleSide });
  for (let i = 0; i < 3; i++) {
    const net = group(g, `nylonNet${i}`); mount(net, -.45 + i * .30, 1.80, .09);
    box(net, [.285, .40, .025], [0, 0, -.065], m.webbing, true);
    for (let item = 0; item < 3; item++) {
      const pouch = box(net, [.105, .23, .073], [-.075 + item * .072, -.01 + item * .018, .012],
        item === 1 ? m.orange : m.cream, true);
      pouch.rotation.z = (item - 1) * .1;
      face(net, .10, .09, [-.075 + item * .072, .015 + item * .018, .053],
        labelTexture(['SOUP', 'RICE', 'TEA'][item], `DAY ${183 + i}`));
      box(net, [.11, .012, .077], [-.075 + item * .072, .105 + item * .018, .013], m.tape);
    }
    const netFace = k.mesh(net, k.plane, netMaterial, [.275, .36, 1], [0, -.015, .095]);
    netFace.castShadow = false;
    for (const x of [-.14, .14]) bar(net, [x, -.195, .03], [x, .195, .02], .008, m.webbing);
    bar(net, [-.14, .19, .04], [.14, .19, .04], .012, m.webbing);
  }
  const cube = group(g, 'rubiksCube'); mount(cube, .12, 1.77, .17); cube.rotation.set(.1, .28, -.12);
  box(cube, [.135, .135, .135], [0, 0, 0], m.dark, true);
  const colors = ['#ce9c52', '#b7684f', '#7da09b', '#b2bfa1', '#cfbd74', '#9cb5ba'];
  const tileMaterials = colors.map((color) => k.mat(paintedTexture(color)));
  for (let side = 0; side < 3; side++) {
    const sideGroup = group(cube, 'tiles'); if (side === 1) sideGroup.rotation.y = Math.PI / 2;
    if (side === 2) sideGroup.rotation.x = -Math.PI / 2;
    for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) {
      box(sideGroup, [.039, .039, .003], [(col - 1) * .043, (row - 1) * .043, .068],
        tileMaterials[(row + col + side * 2) % 6], true);
    }
  }
  const tool = group(g, 'netTools'); mount(tool, -.44, 1.86, .19);
  bar(tool, [0, -.11, 0], [0, .13, 0], .012, m.metal);
  box(tool, [.028, .10, .025], [0, -.085, 0], m.orange, true);
  for (const x of [-.027, .027]) bar(tool, [0, .13, 0], [x, .15, 0], .012, m.metal);
  const extinguisher = group(root, 'fireExtinguisher'); mount(extinguisher, -.91, .52, .10);
  cyl(extinguisher, .083, .41, [0, 0, 0], k.mat(paintedTexture('#bb6850')));
  cyl(extinguisher, .045, .05, [0, .225, 0], m.dark);
  box(extinguisher, [.16, .026, .048], [.033, .26, 0], m.dark, true);
  for (const y of [-.14, .13]) box(extinguisher, [.18, .04, .012], [0, y, .087], m.webbing);
  k.label(extinguisher, 'FIRE', 'CO₂ / PULL', .11, .14, [0, 0, .086]);
  bar(extinguisher, [.04, .23, 0], [.10, .16, .025], .014);
  bar(extinguisher, [.10, .16, .025], [.09, -.09, .025], .014);
  const caution = face(root, .17, .06, [0, 0, 0], labelTexture('CAUTION', 'FIRE SUPPRESSION', '#dcc36e'));
  mount(caution, -.91, .815, .016);
  const kit = box(root, [.37, .26, .11], [0, 0, 0], m.cream, true, 'firstAidKit'); mount(kit, 2.60, 1.70, .07);
  const crossMat = k.mat(paintedTexture('#a3634e'));
  box(root, [.034, .135, .006], [2.60, 1.70, -1.818], crossMat);
  box(root, [.135, .034, .006], [2.60, 1.70, -1.814], crossMat);
  const aidLabel = face(root, .29, .036, [2.60, 1.598, -1.819], labelTexture('FIRST AID', 'CREW MEDICAL'));
  for (const x of [2.48, 2.72]) box(root, [.025, .29, .017], [x, 1.70, -1.803], m.webbing);
  k.focus(g, 'storage', [-.15, 1.8, -1.8], 2.8, { azimuth: .24, elevation: .35 });
  return {};
}
