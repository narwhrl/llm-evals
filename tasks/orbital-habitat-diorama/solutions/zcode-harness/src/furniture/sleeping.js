import { paintedTexture, paperTexture, photoTexture } from '../textures/props.js';

export function buildSleeping(k, root) {
  const { ctx, THREE, materials: m, box, cyl, face, bar, group, mount } = k;
  const g = group(root, 'sleeping');
  const bag = group(g, 'uprightSleepingBag'); mount(bag, -3.31, 1.17, .13);
  box(bag, [.57, 1.74, .20], [0, 0, 0], m.teal, true);
  box(bag, [.49, 1.07, .065], [0, -.28, .11], m.olive, true);
  for (let i = 0; i < 6; i++) box(bag, [.50, .013, .018], [0, -.80 + i * .20, .143], m.webbing);
  // The upper zipper is open: soft pillow in a dark recess and two folded fabric lips.
  box(bag, [.44, .47, .012], [0, .48, .109], m.dark, true);
  const pillow = box(bag, [.39, .28, .095], [0, .65, .12], m.white, true);
  pillow.rotation.z = -.07;
  const left = box(bag, [.115, .47, .055], [-.19, .48, .153], m.teal, true); left.rotation.z = -.16;
  const right = box(bag, [.115, .47, .055], [.19, .48, .153], m.teal, true); right.rotation.z = .16;
  box(bag, [.018, .91, .016], [0, -.27, .16], m.cream);
  for (let i = 0; i < 34; i++) box(bag, [.037, .008, .018], [0, -.72 + i * .026, .175], m.metal);
  k.label(bag, 'CREW 01', 'SLEEP / RESTRAINT', .22, .09, [0, -.49, .174]);
  const pull = group(bag, 'zipperPull'); pull.position.set(0, .21, .18);
  k.torus(pull, .019, .006, [0, -.032, .009], m.cream);
  box(pull, [.024, .055, .009], [0, -.073, .01], m.webbing, true);
  for (const y of [-.65, .67]) for (const x of [-.25, .25]) {
    box(bag, [.05, .18, .022], [x, y, -.103], m.webbing);
    box(bag, [.07, .033, .026], [x, y + .03, -.102], m.metal);
  }
  const board = group(g, 'photoPartition');
  mount(board, -2.94, 1.20, .30); board.rotation.y = Math.PI / 2;
  box(board, [.60, 1.30, .045], [0, 0, 0], k.mat(paintedTexture('#a29876')), true);
  for (let i = 0; i < 3; i++) {
    const photo = face(board, .25, .31, [i === 1 ? -.12 : .12, .42 - i * .34, .026], photoTexture(i));
    photo.rotation.z = (i - 1) * .05;
    for (const x of [-.08, .08]) {
      const tape = box(photo, [.075, .030, .002], [x, .147, .003], m.tape);
      tape.rotation.z = x * 1.8;
    }
  }
  const note = face(board, .27, .23, [-.13, -.40, .03], paperTexture('Miss you!', ['Mei + family', 'See you soon', 'Love, Mei ♡'], { hand: true, color: '#e9d99a' }));
  note.rotation.z = -.07; box(note, [.10, .025, .003], [0, .115, .004], m.tape);
  bar(g, [-3.05, 1.91, -1.85], [-3.19, 1.91, -1.54], .018);
  const lampMat = k.mat(paintedTexture('#f1d9a1'), '#ffffff', { emissive: '#ffb45a', emissiveIntensity: 1.8 });
  const lamp = cyl(g, .064, .09, [-3.20, 1.87, -1.53], m.cream, 'readingLamp');
  cyl(lamp, .9, .16, [0, -.53, 0], lampMat);
  for (let i = 0; i < 2; i++) {
    const slipper = box(g, [.14, .045, .28], [-3.24 + i * .24, .027, -1.04], m.webbing, true);
    box(slipper, [.92, .72, .45], [0, .49, -.10], m.orange, true);
    k.label(slipper, '01', 'VELCRO', .55, .35, [0, .70, .14]);
    slipper.rotation.y = i ? -.08 : .12;
  }
  k.focus(g, 'sleeping', [-3.2, 1.2, -1.6], 2.4, { azimuth: .62, elevation: .42 });
  return { update(dt, t) { pull.rotation.z = .13 * Math.sin(t * 1.13); pull.rotation.x = .08 * Math.sin(t * .79); },
    readingPosition: new THREE.Vector3(-3.2, 1.85, -1.5) };
}
