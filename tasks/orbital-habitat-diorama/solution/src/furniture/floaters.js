import { paperTexture, paintedTexture } from '../textures/props.js';

export function buildFloaters(k, root) {
  const { ctx, THREE, materials: m, box, cyl, face, bar, group } = k;
  const objects = [];
  function floater(name, center, amplitude, phase, rate) {
    const g = group(root, name); g.position.set(...center);
    objects.push({ g, center, amplitude, phase, rate }); return g;
  }
  const pen = floater('floatingPen', [.45, 1.21, -1.225], [.03, .015, .009], .3, .16);
  const shaft = cyl(pen, .008, .148, [0, 0, 0], m.orange); shaft.rotation.z = Math.PI / 2;
  const tip = cyl(pen, .004, .015, [-.081, 0, 0], m.metal); tip.rotation.z = Math.PI / 2;
  const cap = cyl(pen, .010, .023, [.067, 0, 0], m.dark); cap.rotation.z = Math.PI / 2;
  bar(pen, [.050, .010, 0], [.080, .010, 0], .0025, m.cream);
  const manual = floater('floatingTechnicalManual', [.0, 1.225, -1.20], [.018, .018, .025], 1.8, .12);
  for (let side = 0; side < 2; side++) {
    const page = group(manual, `manualPage${side}`); page.position.x = side ? .003 : -.003;
    page.rotation.y = side ? -.13 : .13;
    const x = side ? .061 : -.061;
    box(page, [.119, .16, .014], [x, 0, 0], m.cream);
    face(page, .111, .15, [x, 0, .0075], paperTexture(side ? 'CHECKLIST' : 'DOCK / 04',
      side ? ['01 ALIGN', '02 SEAL', '03 LATCH', '04 VERIFY', 'MEI / 183'] : ['FRAME +Z', '28V / OK', 'O₂ 21.1%', 'REV 06', '12 JUN']));
    for (let line = 0; line < 6; line++) box(page, [.117, .001, .010], [x, -.065 + line * .022, -.002], m.white);
  }
  box(manual, [.008, .16, .018], [0, 0, 0], m.teal);
  const earbuds = floater('floatingEarbuds', [-.25, 1.425, -.40], [.08, .025, .07], 3.1, .19);
  const caseBody = box(earbuds, [.10, .04, .061], [0, -.015, 0], m.cream, true);
  box(earbuds, [.095, .020, .061], [0, .022, -.01], m.cream, true).rotation.x = -.6;
  for (const x of [-.034, .034]) {
    k.ball(earbuds, [.012, .017, .011], [x, .058, 0], m.white);
    cyl(earbuds, .006, .023, [x, .039, .002], m.cream);
    k.ball(earbuds, [.006, .006, .004], [x, .06, .009], m.dark);
  }
  const water = floater('floatingWaterDroplet', [-1.65, 1.40, -1.25], [.075, .075, .07], 4.8, .09);
  const waterMap = paintedTexture('#9bc9c0');
  const waterMaterial = k.mat(waterMap, '#ffffff', { roughness: .65, transparent: true, opacity: .83, emissive: '#5da4ad', emissiveIntensity: .18 });
  const drop = k.ball(water, [.028, .032, .028], [0, 0, 0], waterMaterial);
  k.ball(water, [.007, .009, .003], [-.010, .012, .024], m.white);
  const crumb = floater('floatingCookieCrumb', [2.2, 1.4, -1.1], [.075, .033, .045], 6.3, .22);
  const crumbMaterial = k.mat(paintedTexture('#bfa06c'));
  k.ball(crumb, [.026, .022, .023], [0, 0, 0], crumbMaterial);
  for (let i = 0; i < 4; i++) k.ball(crumb, [.004, .004, .003], [.014 * Math.cos(i * 2), .012 * Math.sin(i * 3), .019], m.dark);
  const closest = new THREE.Vector3(), away = new THREE.Vector3();
  const offset = new THREE.Vector3(), velocity = new THREE.Vector3(), desired = new THREE.Vector3();
  let boost = 0, angle = 0;
  ctx.registry.addInteractive(pen, { id: 'pen', priority: 10, onClick: () => { boost = 14; } });
  return { update(dt, t) {
    for (let i = 0; i < objects.length; i++) {
      const o = objects[i], a = o.amplitude, c = o.center, ph = o.phase;
      o.g.position.set(c[0] + a[0] * (.62 * Math.sin(t * .233 + ph) + .38 * Math.sin(t * .371 + ph)),
        c[1] + a[1] * (.57 * Math.sin(t * .179 + ph) + .43 * Math.sin(t * .293 + ph)),
        c[2] + a[2] * (.63 * Math.sin(t * .197 + ph) + .37 * Math.sin(t * .317 + ph)));
      if (i) o.g.rotation.set(t * o.rate * .53, t * o.rate, t * o.rate * .37);
    }
    desired.set(0, 0, 0);
    if (Math.abs(ctx.interaction.pointerNdc.x) <= 1 && Math.abs(ctx.interaction.pointerNdc.y) <= 1) {
      ctx.interaction.pointerWorldRay.closestPointToPoint(pen.position, closest);
      away.copy(pen.position).sub(closest); const distance = away.length();
      if (distance < .25) {
        if (distance < .001) away.set(1, .1, .1); else away.multiplyScalar(1 / distance);
        desired.copy(away).multiplyScalar(.075 * (1 - distance / .25));
        desired.x = THREE.MathUtils.clamp(desired.x, -.065, .065);
        desired.y = THREE.MathUtils.clamp(desired.y, -.015, .015);
        desired.z = THREE.MathUtils.clamp(desired.z, -.012, .012);
      }
    }
    velocity.x += ((desired.x - offset.x) * 22 - velocity.x * 10) * dt;
    velocity.y += ((desired.y - offset.y) * 22 - velocity.y * 10) * dt;
    velocity.z += ((desired.z - offset.z) * 22 - velocity.z * 10) * dt;
    offset.addScaledVector(velocity, dt); pen.position.add(offset);
    boost *= Math.exp(-dt * 4); angle += (.16 + boost) * dt;
    pen.rotation.set(0, angle, .02 * Math.sin(t * .43));
    drop.scale.set(.028 * (1 + .05 * Math.sin(t * .7)), .032 * (1 - .05 * Math.sin(t * .7)), .028);
  } };
}
