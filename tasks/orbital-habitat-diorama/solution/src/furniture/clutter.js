import { paperTexture, photoTexture, paintedTexture, labelTexture } from '../textures/props.js';

export function buildClutter(k, root, workstation) {
  const { ctx, THREE, materials: m, box, cyl, face, bar, group, mount } = k;
  const g = group(root, 'livedInClutter');
  // Fabric silhouettes conform to the lip instead of intersecting it as tangent boxes.
  const shirt = [[-.18,-.18],[.18,-.18],[.18,.035],[.29,.015],[.34,.12],
    [.17,.20],[.065,.20],[.045,.135],[-.045,.135],[-.065,.20],[-.17,.20],
    [-.34,.12],[-.29,.015],[-.18,.035]];
  const shorts = [[-.25,-.17],[-.025,-.17],[0,-.045],[.025,-.17],[.25,-.17],
    [.23,.17],[-.23,.17]];
  const sock = [[-.08,-.15],[.065,-.15],[.105,-.105],[.07,-.055],[.015,-.055],
    [.015,.17],[-.08,.17]];
  function fabric(parent, outline, x, s, material, inset = .115) {
    const shape = new THREE.Shape(outline.map(([a,b]) => new THREE.Vector2(a,b)));
    const geo = new THREE.ShapeGeometry(shape);
    // Subdivision follows the 0.30 m curve, so no garment chord disappears into the hull.
    const subdivided = new THREE.BufferGeometry();
    const points = [], uvs = [];
    const source = geo.index ? geo.toNonIndexed() : geo;
    const a = new THREE.Vector2(), b = new THREE.Vector2(), c = new THREE.Vector2();
    function triangle(v0,v1,v2,depth) {
      if (depth) {
        const ab=v0.clone().add(v1).multiplyScalar(.5), bc=v1.clone().add(v2).multiplyScalar(.5), ca=v2.clone().add(v0).multiplyScalar(.5);
        triangle(v0,ab,ca,depth-1); triangle(ab,v1,bc,depth-1);
        triangle(ca,bc,v2,depth-1); triangle(ab,bc,ca,depth-1); return;
      }
      for (const v of [v0,v1,v2]) {
        const p=ctx.profile.wallPoint(x+v.x,s+v.y,inset); points.push(p.x,p.y,p.z);
        uvs.push((v.x+.34)/.68,(v.y+.20)/.40);
      }
    }
    const vertices=source.attributes.position;
    for(let i=0;i<vertices.count;i+=3) {
      a.set(vertices.getX(i),vertices.getY(i)); b.set(vertices.getX(i+1),vertices.getY(i+1)); c.set(vertices.getX(i+2),vertices.getY(i+2)); triangle(a,b,c,3);
    }
    subdivided.setAttribute('position',new THREE.Float32BufferAttribute(points,3));
    subdivided.setAttribute('uv',new THREE.Float32BufferAttribute(uvs,2)); subdivided.computeVertexNormals();
    const piece=k.mesh(parent,subdivided,material,[1,1,1],[0,0,0]); piece.castShadow=false;
    if(source!==geo)source.dispose(); geo.dispose(); return piece;
  }
  const clothes=group(g,'ceilingClothes');
  const fabricMaterials=[m.teal,m.orange,m.white].map(material=>{const copy=material.clone();copy.side=THREE.DoubleSide;return copy;});
  // Velcro anchors remain on the lip; fabric is folded flat across its wall junction.
  fabric(clothes,shirt.map(([x,s])=>[x,-s]),-2.40,2.16,fabricMaterials[0],.19);
  const collar = [[-.065,-.19],[.065,-.19],[.065,-.17],[.045,-.13],[-.045,-.13],[-.065,-.17]];
  fabric(clothes,collar,-2.40,2.16,m.webbing,.192);
  fabric(clothes,shorts,-1.46,2.16,fabricMaterials[1],.19);
  for(const x of [-.80,-.58])fabric(clothes,sock,x,2.16,fabricMaterials[2],.19);
  for(const x of [-2.60,-2.20,-1.65,-1.27,-.85,-.63]) {
    fabric(clothes,[[-.027,-.045],[.027,-.045],[.027,.045],[-.027,.045]],x,2.245,m.webbing,.197);
    const anchor=ctx.profile.wallPoint(x,2.245,.008), tab=ctx.profile.wallPoint(x,2.245,.19);
    bar(clothes,anchor.toArray(),tab.toArray(),.018,m.webbing);
  }
  const notes = [
    [-2.45, .91, 'WATER', ['pH 6.2', 'Roots OK', 'DAY 183']],
    [-2.60, 1.97, 'HOME', ['Call Sunday', '19:00 UTC', 'Love, Mei']],
    [-.73, 1.17, 'REMEMBER', ['Fresh tea', 'Filter A', 'every Friday']],
    [2.75, 1.35, 'BREATHE', ['Slow down', 'Look outside', 'You are home']],
    [3.68, 1.68, 'DAY 183', ['24 min ride', 'Drink water', 'Sleep well']],
  ];
  for (let i = 0; i < notes.length; i++) {
    const [x, y, title, lines] = notes[i];
    const n = face(g, .18, .20, [0, 0, 0], paperTexture(title, lines, { color: i % 2 ? '#d8c596' : '#bfd0ba', hand: true }));
    mount(n, x, y, .025); n.rotation.z = .08 * Math.sin(i * 4);
    box(g, [.075, .021, .008], [x, y + .099, n.position.z + .006], m.tape);
    const magnet = cyl(g, .018, .013, [x + .055, y + .066, n.position.z + .015], m.orange); magnet.rotation.x = Math.PI / 2;
  }
  const tinyPhoto = face(g, .15, .19, [0, 0, 0], photoTexture(1)); mount(tinyPhoto, 2.96, 2.04, .022);
  box(g, [.09, .018, .005], [2.96, 2.131, -1.919], m.tape);
  const deskItems = group(workstation, 'deskItems');
  // These authored positions predate the desk shift; keep them on the moved desktop.
  deskItems.position.x = .8;
  deskItems.userData.keepFocus = true;
  const notebook = box(deskItems, [.18, .027, .22], [.65, .816, -1.40], m.teal, true);
  const cover = face(deskItems, .16, .19, [.65, .831, -1.40], labelTexture('LOG 183', 'MEI / ORBITAL HOME')); cover.rotation.x = -Math.PI / 2;
  box(deskItems, [.014, .010, .18], [.61, .840, -1.40], m.webbing);
  // A small mug with a real open mouth and tea surface, held by a restraint loop.
  const mug = group(deskItems, 'teaMug'); mug.position.set(.0, .804, -1.62);
  cyl(mug, .037, .085, [0, .043, 0], m.cream);
  k.torus(mug, .035, .005, [0, .087, 0], m.cream).rotation.x = Math.PI / 2;
  cyl(mug, .031, .002, [0, .086, 0], k.mat(paintedTexture('#79634b')));
  k.torus(mug, .020, .006, [.045, .049, 0], m.cream).rotation.y = Math.PI / 2;
  box(mug, [.095, .006, .092], [0, .001, 0], m.webbing);
  // Wall-stowed spanners and a food pouch fill the bay without occupying floater boxes.
  for (let i = 0; i < 2; i++) {
    const x = 3.68 + i * .115;
    bar(g, [x, .57, -1.90], [x, .81, -1.90], .012, m.metal);
    k.torus(g, .027, .007, [x, .82, -1.90], m.metal);
    box(g, [.055, .035, .018], [x, .67, -1.881], m.webbing);
  }
  return {};
}
