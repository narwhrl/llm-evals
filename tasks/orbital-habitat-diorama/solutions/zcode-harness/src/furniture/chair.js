import { paintedTexture, labelTexture } from '../textures/props.js';

export function buildChair(k, root) {
  const { materials: m, box, cyl, bar, group } = k;
  const g = group(root, 'chair'); g.position.set(2.55, 0, -.1); g.rotation.y = .25; // angled at the window, clear of the noon sun patch
  // Facing -Z: the reclined back is on the near side, head and eyes look at the Earth.
  box(g, [.48, .045, .54], [0, .025, 0], m.dark, true);
  cyl(g, .11, .29, [0, .17, 0], m.cream);
  for (const x of [-.20, .20]) for (const z of [-.23, .23]) cyl(g, .017, .015, [x, .053, z], m.cream);
  box(g, [.57, .11, .56], [0, .40, -.06], m.dark, true);
  box(g, [.51, .105, .48], [0, .47, -.06], m.orange, true);
  const back = group(g, 'reclinedBack'); back.position.set(0, .54, .18); back.rotation.x = .30;
  box(back, [.60, .53, .12], [0, .21, 0], m.dark, true);
  box(back, [.51, .46, .13], [0, .21, -.042], m.orange, true);
  box(back, [.37, .14, .13], [0, .46, -.06], m.white, true);
  box(back, [.065, .49, .011], [-.16, .20, -.11], m.webbing);
  box(back, [.065, .49, .011], [.16, .20, -.11], m.webbing);
  box(g, [.045, .017, .46], [0, .529, -.06], m.webbing);
  box(g, [.077, .026, .06], [0, .55, -.06], m.metal, true);
  for (const x of [-.32, .32]) {
    bar(g, [x, .32, .11], [x, .60, .02], .018);
    box(g, [.09, .065, .44], [x, .605, -.16], m.cream, true);
  }
  const panel = box(g, [.10, .023, .30], [.32, .648, -.20], m.dark, true, 'armrestControlPanel');
  const label = k.face(g, .082, .095, [.32, .6605, -.245], labelTexture('VIEW', 'AZ / EL'));
  label.rotation.x = -Math.PI / 2;
  const indicators = [];
  for (let i = 0; i < 4; i++) {
    const mat = k.mat(paintedTexture(['#acd6bd', '#d8ba81', '#b9d7d6', '#b1bb98'][i]), '#ffffff', {
      emissive: ['#b9f6bb', '#ffd294', '#79dddf', '#e4ee8c'][i], emissiveIntensity: 1.3,
    });
    indicators.push(mat); cyl(g, .012, .009, [.32, .667, -.19 + i * .035], mat);
  }
  box(g, [.37, .042, .23], [0, .29, -.43], m.dark, true);
  box(g, [.35, .014, .19], [0, .319, -.44], m.webbing);
  k.focus(g, 'chair', [2.55, .7, -.2], 2.3, { azimuth: .43, elevation: .56 });
  return { update(dt, t) { for (let i = 0; i < indicators.length; i++) indicators[i].emissiveIntensity = .35 + 1.1 * (.5 + .5 * Math.sin(t * (1.17 + i * .43) + i * 2.1)); } };
}
