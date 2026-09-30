import { paperTexture } from '../textures/props.js';

export function buildFitness(k, root) {
  const { materials: m, box, cyl, bar, group, mount } = k;
  const g = group(root, 'bike'); g.position.set(3.30, 0, -.80);
  for (const z of [-.34, .34]) {
    box(g, [.55, .066, .12], [0, .035, z], m.dark, true);
    for (const x of [-.225, .225]) cyl(g, .022, .012, [x, .075, z], m.cream);
  }
  const wheel = cyl(g, .255, .13, [0, .37, .05], m.cream, 'bikeFlywheel'); wheel.rotation.z = Math.PI / 2;
  const side = cyl(g, .22, .142, [0, .37, .05], m.dark); side.rotation.z = Math.PI / 2;
  const rim = k.torus(g, .226, .02, [.077, .37, .05], m.orange); rim.rotation.y = Math.PI / 2;
  bar(g, [0, .12, .34], [0, .71, .26], .045, m.cream);
  bar(g, [0, .27, .16], [0, .72, -.27], .046, m.cream);
  bar(g, [0, .72, -.27], [0, .20, -.34], .028, m.dark);
  bar(g, [0, .70, .26], [0, .89, .28], .023, m.dark);
  box(g, [.26, .09, .23], [0, .93, .28], m.webbing, true);
  bar(g, [0, .68, -.26], [0, 1.07, -.30], .023, m.dark);
  bar(g, [-.25, 1.07, -.30], [.25, 1.07, -.30], .024, m.dark);
  for (const x of [-.25, .25]) {
    bar(g, [x, 1.07, -.30], [x, 1.12, -.44], .027, m.white);
    for (let i = 0; i < 5; i++) {
      const wrap = cyl(g, .030, .011, [x, 1.075 + i * .009, -.32 - i * .022], m.tape);
      wrap.rotation.x = -1.23;
    }
  }
  bar(g, [-.12, .37, .05], [-.12, .29, .20], .018, m.dark);
  bar(g, [.12, .37, .05], [.12, .45, -.10], .018, m.dark);
  box(g, [.14, .035, .09], [-.18, .28, .20], m.webbing);
  box(g, [.14, .035, .09], [.18, .45, -.10], m.webbing);
  const panel = box(g, [.18, .028, .15], [0, 1.00, -.34], m.dark, true); panel.rotation.x = .42;
  const monitor = k.face(g, .15, .10, [0, 1.016, -.33], paperTexture('EXERCISE', ['24:08', 'POWER 82 W', 'HEART 104'], { color: '#adc5aa' }));
  monitor.rotation.x = -1.1;
  k.label(g, 'CREW CYCLE', 'FLOOR RESTRAINT 02', .12, .045, [.077, .37, .05]);
  const towel = group(root, 'wallTowel'); mount(towel, 3.29, 1.75, .053);
  box(towel, [.40, .46, .033], [0, 0, 0], m.white, true);
  box(towel, [.38, .055, .011], [0, -.165, .024], m.teal);
  for (let i = 0; i < 5; i++) box(towel, [.009, .42, .008], [-.16 + i * .08, -.007, .021], m.white, true);
  bar(root, [3.06, 1.991, -1.89], [3.52, 1.991, -1.89], .012);
  k.focus(g, 'bike', [3.3, .7, -.8], 2.4, { azimuth: .18, elevation: .48 });
  return {};
}
