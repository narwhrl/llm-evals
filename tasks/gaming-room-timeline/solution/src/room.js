import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { buildSetup } from './furniture.js';
import { createScreen } from './screen.js';
import { getEra } from './eras.js';

export function createRoom(container, callbacks) {
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  container.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = .065;
  controls.minDistance = 2.1;
  controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI * .48;
  controls.minPolarAngle = .15;
  controls.target.set(0, 1.05, 0);
  controls.rotateSpeed = .65;
  controls.zoomSpeed = .8;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const unitBox = new THREE.BoxGeometry(1, 1, 1);
  const geometries = new Map();
  const mat = (color, roughness = .7, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });

  function box(parent, w, h, d, x, y, z, material, radius = .025) {
    const key = `${w}:${h}:${d}:${radius}`;
    let geo = geometries.get(key);
    if (!geo) {
      geo = radius ? new RoundedBoxGeometry(w, h, d, 2, Math.min(radius, w / 3, h / 3, d / 3)) : unitBox;
      geometries.set(key, geo);
    }
    const mesh = new THREE.Mesh(geo, material);
    if (!radius) mesh.scale.set(w, h, d);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cyl(parent, rTop, rBottom, height, x, y, z, material, segments = 24) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, height, segments), material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function tube(parent, points, radius, material) {
    const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, radius, 6, false), material);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function texture(draw, w = 512, h = 512) {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    draw(canvas.getContext('2d'), w, h);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    return tex;
  }
  function label(parent, text, w, h, x, y, z, bg = '#ebe4cc', fg = '#535d4e') {
    const tex = texture((ctx, cw, ch) => {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, cw, ch);
      ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.font = `500 ${Math.min(90, cw / Math.max(text.length, 1) * 1.5)}px Georgia, serif`;
      ctx.fillText(text, cw / 2, ch / 2, cw * .88);
    }, 512, Math.max(64, Math.round(512 * h / w)));
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: tex, roughness: .9, side: THREE.DoubleSide }));
    mesh.position.set(x, y, z); parent.add(mesh); return mesh;
  }
  const helpers = { box, cyl, tube, mat, label };
  const woodMap = texture((ctx, w, h) => {
    ctx.fillStyle = '#b28c5e'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 140; i++) {
      const y = (i * 43.77) % h;
      ctx.strokeStyle = `rgba(${i % 3 ? '83,49,25' : '235,201,146'},${.03 + (i % 5) * .013})`;
      ctx.lineWidth = .5 + i % 3;
      ctx.beginPath(); ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * .3, y + Math.sin(i) * 12, w * .7, y - Math.cos(i) * 11, w, y + 2); ctx.stroke();
    }
  });
  const fabricMap = texture((ctx, w, h) => {
    ctx.fillStyle = '#d8d9c8'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < w; i += 3) {
      ctx.fillStyle = i % 2 ? '#b9bfad32' : '#ffffff39'; ctx.fillRect(i, 0, 1, h); ctx.fillRect(0, i, w, 1);
    }
  });
  const wood = mat('#e3c599'); wood.map = woodMap;
  const darkWood = mat('#aa8260'); darkWood.map = woodMap;
  const trim = mat('#e5d9ba');
  const wall = mat('#e9e5d2');
  const green = mat('#9da68a');
  const cloth = mat('#82958a'); cloth.map = fabricMap;
  const dark = mat('#454a41');
  const white = mat('#eee9d7');

  const hemi = new THREE.HemisphereLight('#eef5ff', '#ac8458', 2.1); scene.add(hemi);
  const sun = new THREE.DirectionalLight('#fff1d1', 4.1);
  sun.position.set(-3.5, 8, 5); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -6, right: 6, top: 6, bottom: -6, near: .5, far: 25 });
  sun.shadow.bias = -.0004; sun.shadow.normalBias = .025; sun.shadow.radius = 4; scene.add(sun);
  const fill = new THREE.DirectionalLight('#dbe7eb', 1.1); fill.position.set(5, 5, 2); scene.add(fill);
  const deskLight = new THREE.PointLight('#ffcf88', .6, 5, 2); deskLight.position.set(-.65, 2.6, -1.7); scene.add(deskLight);
  const screenLight = new THREE.PointLight('#8ac2e0', .12, 3, 2); screenLight.position.set(.7, 2, -.9); scene.add(screenLight);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ color: '#62523b', opacity: .16 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.38; ground.receiveShadow = true; scene.add(ground);
  const room = new THREE.Group(); scene.add(room);
  box(room, 7.28, .28, 5.88, 0, -.17, 0, mat('#d5c4a3'), .09);
  box(room, 7.09, .11, 5.7, 0, .015, 0, darkWood, .035);
  // Individually laid boards preserve the grain and the slight irregularity of an old floor.
  for (let row = 0; row < 17; row++) {
    for (let col = 0; col < 4; col++) {
      const start = -3.5 + col * 1.75;
      const m = wood.clone(); m.color.setHSL(.095, .27 + (row % 4) * .012, .62 + ((row * 7 + col * 3) % 9) * .012);
      box(room, 1.74, .055, .326, start + .875, .089, -2.64 + row * .331, m, .007);
    }
  }
  const backWall = new THREE.Group(); room.add(backWall);
  box(backWall, 7.12, 3.7, .14, 0, 1.96, -2.85, wall, .025);
  box(backWall, 7.04, 1.02, .035, 0, .64, -2.755, green, .006);
  box(backWall, 7.05, .055, .09, 0, 1.17, -2.72, trim, .008);
  box(backWall, 7.05, .13, .1, 0, .19, -2.7, trim, .01);
  box(backWall, 7.14, .07, .2, 0, 3.83, -2.85, trim, .01);
  const leftWall = new THREE.Group(); room.add(leftWall);
  // The window is an actual opening assembled from four pieces of wall.
  box(leftWall, .14, 3.7, 1.13, -3.56, 1.96, -2.285, wall, .02);
  box(leftWall, .14, 3.7, 2.3, -3.56, 1.96, 1.7, wall, .02);
  box(leftWall, .14, 1.45, 2.27, -3.56, .835, -.585, wall, .02);
  box(leftWall, .14, .57, 2.27, -3.56, 3.525, -.585, wall, .02);
  box(leftWall, .035, 1.02, 5.6, -3.465, .64, 0, green, .006);
  box(leftWall, .09, .055, 5.6, -3.43, 1.17, 0, trim, .008);
  box(leftWall, .1, .13, 5.65, -3.42, .19, 0, trim, .01);
  box(leftWall, .2, .07, 5.75, -3.56, 3.83, 0, trim, .01);
  const sky = texture((ctx, w, h) => {
    const grad = ctx.createLinearGradient(0, 0, 0, h); grad.addColorStop(0, '#b6cace'); grad.addColorStop(.7, '#e8dfb9'); grad.addColorStop(1, '#b4b89a'); ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#fff5cf'; ctx.beginPath();ctx.arc(340, 115, 55, 0, Math.PI * 2);ctx.fill();
    for(let i=0;i<12;i++){ctx.fillStyle=i%2?'#97a48f':'#aeb69d';ctx.fillRect(i*51,310-(i*31)%80,36,220);}
  });
  const windowGlass = new THREE.Mesh(new THREE.PlaneGeometry(2.14, 1.64), new THREE.MeshBasicMaterial({ map: sky, side: THREE.DoubleSide }));
  windowGlass.rotation.y = Math.PI / 2; windowGlass.position.set(-3.56, 2.39, -.585); leftWall.add(windowGlass);
  for (const z of [-1.72, .55]) box(leftWall, .21, 1.85, .09, -3.44, 2.39, z, white, .018);
  for (const y of [1.49, 3.29]) box(leftWall, .21, .1, 2.36, -3.44, y, -.585, white, .015);
  box(leftWall, .12, 1.7, .055, -3.4, 2.39, -.585, white, .008);
  box(leftWall, .12, .055, 2.24, -3.4, 2.45, -.585, white, .008);
  box(leftWall, .37, .1, 2.55, -3.33, 1.49, -.585, trim, .025);
  tube(leftWall, [[-3.28,3.45,-1.95],[-3.28,3.45,.8]], .035, darkWood);
  const curtainMat = mat('#d5cdb5'); curtainMat.map = fabricMap;
  for (const edge of [-1.77,.6]) for(let i=0;i<5;i++) {
    const mesh = cyl(leftWall, .065,.07,1.93,-3.25,2.44,edge + (i-2)*.073,curtainMat,12);
    mesh.scale.x = .6;
  }
  for(let i=0;i<7;i++) box(leftWall,.12,.56,.12,-3.28,.62,-1.1+i*.17,mat('#d4d0b9'),.035);

  // A bed and an aging shelf stay in the same place throughout the twenty years.
  box(room, 1.63, .33, 2.6, -2.35, .39, .87, darkWood, .045);
  box(room, 1.68, .88, .12, -2.35, .65, -.48, wood, .035);
  box(room, 1.55, .22, 2.5, -2.35, .67, .87, white, .09);
  box(room, 1.57, .14, 2.02, -2.35, .83, 1.1, cloth, .08);
  box(room, 1.57, .19, .42, -2.35, .85, .2, cloth, .06);
  const pillow = box(room, 1.12, .2, .53, -2.35, .89, -.05, mat('#e7debd'), .095); pillow.rotation.y = -.06;
  for(let i=0;i<10;i++) {
    box(room, .015,.008,1.85,-3.02+i*.15,.906,1.15,mat(i%2?'#b6beb0':'#9cae9b'),.003);
  }
  box(room, 1.59,.05,.66,-2.35,.94,1.81,mat('#bc9c6e'),.02);
  for(let i=0;i<8;i++) box(room,.009,.008,.65,-3.02+i*.18,.972,1.81,mat('#e1c89c'),.002);
  // Small stitched companion, older than every computer in the room.
  const bear = new THREE.Group(); bear.position.set(-2.82,1.08,-.03); room.add(bear);
  function sphere(parent, r, x,y,z, material, scale=[1,1,1]){
    const mesh=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),material);mesh.position.set(x,y,z);mesh.scale.set(...scale);mesh.castShadow=true;parent.add(mesh);return mesh;
  }
  const bearMat=mat('#b58e60'); sphere(bear,.15,0,0,0,bearMat,[1,1.2,.8]);sphere(bear,.12,0,.2,0,bearMat);
  sphere(bear,.045,-.085,.29,0,bearMat);sphere(bear,.045,.085,.29,0,bearMat);
  sphere(bear,.013,-.039,.22,.108,dark);sphere(bear,.013,.039,.22,.108,dark);sphere(bear,.024,0,.18,.113,mat('#e3c392'));
  sphere(bear,.07,-.1,-.12,.05,bearMat);sphere(bear,.07,.1,-.12,.05,bearMat);

  const shelf = new THREE.Group(); shelf.position.set(2.87,0,-2.18); room.add(shelf);
  box(shelf,.92,2.47,.08,0,1.37,-.3,mat('#a48e6a'),.008);
  for(const x of [-.46,.46]) box(shelf,.07,2.5,.68,x,1.37,0,wood,.014);
  for(const y of [.16,.87,1.58,2.3,2.64]) box(shelf,.99,.07,.72,0,y,0,wood,.012);
  const bookColors=['#af6c45','#6d8272','#e1d6b3','#6b7782','#b39957','#9b6350','#bdbb98'];
  function books(parent, x,y,z, count, scale=1){
    for(let i=0;i<count;i++){
      const h=(.33+(i*7%6)*.035)*scale;
      const b=box(parent,.06*scale,h,.27*scale,x+i*.075*scale,y+h/2,z,mat(bookColors[i%bookColors.length]),.004);
      if(i===count-1)b.rotation.z=-.08;
      box(parent,.043*scale,.012,.005,x+i*.075*scale,y+h*.76,z+.137*scale,trim,.001);
    }
  }
  books(shelf,-.33,.91,.02,8);
  books(shelf,-.34,1.62,.02,5,.95);
  label(shelf,'SAVE / 01',.26,.04,.24,1.78,.165,'#ebe4cc','#665a42');
  box(shelf,.3,.2,.36,.22,1.72,-.03,mat('#bcab83'),.018);
  box(shelf,.75,.45,.5,0,.42,0,mat('#bcab83'),.018);
  label(shelf,'2005—',.31,.1,0,.48,.254,'#e5dbbf','#7e715a');

  function plant(parent, x,y,z,size=1){
    const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(size);parent.add(g);
    cyl(g,.15,.11,.25,0,.125,0,mat('#b27250'));
    cyl(g,.137,.137,.02,0,.25,0,mat('#605640'));
    for(let i=0;i<7;i++){
      const a=i*2.4;const h=.32+(i%3)*.1;
      tube(g,[[0,.23,0],[Math.cos(a)*.07,.35,Math.sin(a)*.07],[Math.cos(a)*.16,h+.16,Math.sin(a)*.16]],.009,mat('#6a7851'));
      const leaf=sphere(g,.12,Math.cos(a)*.17,h+.12,Math.sin(a)*.17,mat(i%2?'#7c8f60':'#576e4e'),[.5,1.5,.25]);leaf.rotation.z=Math.cos(a)*.7;leaf.rotation.y=a;
    }
    return g;
  }
  plant(leftWall,-3.23,1.55,.08,.7);
  plant(shelf,.05,2.68,0,1.1);

  const photoMap=texture((ctx,w,h)=>{
    ctx.fillStyle='#d3c7a6';ctx.fillRect(0,0,w,h);ctx.fillStyle='#879c9a';ctx.fillRect(20,20,w-40,h-70);
    ctx.fillStyle='#c1c3a0';ctx.fillRect(20,h*.5,w-40,h*.35);
    for(let i=0;i<3;i++){ctx.fillStyle=['#98664d','#6a776a','#ad8d60'][i];ctx.fillRect(72+i*133,150,90,145);ctx.fillStyle='#d6b793';ctx.beginPath();ctx.arc(117+i*133,130,39,0,Math.PI*2);ctx.fill();ctx.fillStyle='#4b4a40';ctx.beginPath();ctx.arc(117+i*133,117,39,Math.PI,Math.PI*2);ctx.fill();}
    ctx.fillStyle='#6b705b';ctx.font='22px Georgia';ctx.fillText('SUMMER, 2005',125,h-24);
  },512,384);
  const photoGroup=new THREE.Group();photoGroup.position.set(-1.18,2.5,-2.72);backWall.add(photoGroup);
  box(photoGroup,.71,.57,.045,0,0,0,darkWood,.016);
  const photo=new THREE.Mesh(new THREE.PlaneGeometry(.63,.48),new THREE.MeshStandardMaterial({map:photoMap,roughness:.9}));photo.position.z=.025;photoGroup.add(photo);photoGroup.rotation.z=-.04;

  const posterMap = texture((ctx,w,h)=>{
    ctx.fillStyle='#d8b77c';ctx.fillRect(0,0,w,h);
    ctx.fillStyle='#8e5b40';ctx.beginPath();ctx.arc(w*.52,h*.4,w*.3,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#333f39';ctx.beginPath();ctx.moveTo(0,h*.74);ctx.lineTo(w*.25,h*.38);ctx.lineTo(w*.43,h*.59);ctx.lineTo(w*.67,h*.32);ctx.lineTo(w,h*.7);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
    ctx.fillStyle='#e5d4a3';ctx.textAlign='center';ctx.font='48px Georgia';ctx.fillText('ANOTHER',w/2,h*.84);ctx.font='65px Georgia';ctx.fillText('WORLD',w/2,h*.94);
    ctx.font='17px monospace';ctx.fillStyle='#685039';ctx.fillText('PRESS START TO WANDER',w/2,43);
  },512,700);
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(.88,1.2),new THREE.MeshStandardMaterial({map:posterMap,roughness:1}));poster.position.set(-2.58,2.55,-2.762);poster.rotation.z=.025;backWall.add(poster);
  for(const x of [-2.9,-2.27]){const tape=box(backWall,.14,.06,.007,x,3.15,-2.749,mat('#d9cba3'),.001);tape.rotation.z=.15;}

  const clockFace=texture((ctx,w,h)=>{
    ctx.fillStyle='#e9e2ca';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#5a6150';ctx.lineWidth=7;
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ctx.beginPath();ctx.moveTo(w/2+Math.sin(a)*190,h/2-Math.cos(a)*190);ctx.lineTo(w/2+Math.sin(a)*215,h/2-Math.cos(a)*215);ctx.stroke();}
    ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(256,130);ctx.lineTo(256,256);ctx.lineTo(355,310);ctx.stroke();
  });
  const clockBody=cyl(backWall,.23,.23,.06,2.83,3.3,-2.72,darkWood,48);clockBody.rotation.x=Math.PI/2;
  const clockFront=new THREE.Mesh(new THREE.CircleGeometry(.205,48),new THREE.MeshStandardMaterial({map:clockFace}));clockFront.position.set(2.83,3.3,-2.682);backWall.add(clockFront);

  const rugMat=mat('#c2ad83');rugMat.map=fabricMap;
  box(room,2.65,.018,1.82,.25,.125,.72,rugMat,.015);
  for(const z of [-.09,1.52])box(room,2.55,.004,.025,.25,.138,z,mat('#a68b5e'),.002);
  for(let i=0;i<25;i++)for(const z of [-.24,1.67])box(room,.012,.012,.14,-1+i*.103,.126,z,mat('#c9b891'),.001);

  const screen = createScreen(THREE);
  const setups = new Map();
  let activeSetup=null, year=2005, currentEra=0, night=false, view='room', animation=null;
  const memoryAnchors = { photo:new THREE.Vector3(-1.18,2.53,-2.62), bear:new THREE.Vector3(-2.82,1.35,.03) };
  const sharedMemories = new THREE.Group();room.add(sharedMemories);
  const mug=new THREE.Group();mug.position.set(-.67,1.53,-1.38);sharedMemories.add(mug);
  const red=mat('#a64431',.3);cyl(mug,.095,.078,.18,0,.09,0,red,32);cyl(mug,.085,.085,.008,0,.183,0,mat('#f1dfb8'),32);cyl(mug,.07,.07,.009,0,.189,0,mat('#5e4230'),32);
  const handle=new THREE.Mesh(new THREE.TorusGeometry(.065,.018,8,24),red);handle.position.set(.105,.1,0);mug.add(handle);
  label(mug,'★',.06,.07,0,.09,.086,'#a64431','#efe1ba');
  const mugChip=box(mug,.025,.013,.006,.021,.174,.086,mat('#e3d2ad'),.003);
  memoryAnchors.mug=new THREE.Vector3(-.67,1.8,-1.38);
  function makeDisc(parent,x,y,z){
    const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);
    box(g,.34,.024,.32,0,0,0,mat('#747f75',.3),.009);
    const disc=new THREE.Mesh(new THREE.RingGeometry(.025,.133,40),mat('#c7c6b6',.22,.45));disc.rotation.x=-Math.PI/2;disc.position.y=.014;g.add(disc);
    const band=new THREE.Mesh(new THREE.RingGeometry(.055,.07,40),mat('#b5aea6',.25,.5));band.rotation.x=-Math.PI/2;band.position.y=.016;g.add(band);
    return g;
  }
  const disc=makeDisc(sharedMemories,-.55,1.55,-1.8);

  function decorate(g, era){
    const newer=era>=2015;
    const lamp=new THREE.Group();lamp.position.set(newer?2.03:-.68,1.53,newer?-2.38:-2.26);g.add(lamp);
    const lampMat=mat(newer?'#b1a37c':'#789075',.45);
    cyl(lamp,.14,.17,.045,0,.024,0,lampMat);
    tube(lamp,[[0,.05,0],[0,.3,0],[.11,.49,0],[.23,.52,0]],.023,lampMat);
    const shade=cyl(lamp,.055,.14,.13,.23,.48,0,lampMat);shade.rotation.z=-.25;
    const lampInner=cyl(lamp,.115,.115,.006,.245,.415,0,new THREE.MeshStandardMaterial({color:'#ffdfa4',emissive:'#ffc16b',emissiveIntensity:1.6}));lampInner.rotation.z=-.25;
    if(era<2015){
      books(g,-1.42,.14,-1.8,4,1.1);
      box(g,.6,.35,.53,-1.2,.29,-2.32,mat('#a9966c'),.01);
      label(g,'DISCS',.35,.12,-1.2,.34,-2.046,'#dfd2af','#86714c');
      for(let i=0;i<3;i++){const book=box(g,.43,.04,.53,1.78,1.56+i*.046,-1.72,mat(bookColors[i]),.006);book.rotation.y=.05+i*.06;}
      box(g,.44,.014,.32,.2,1.55,-1.23,mat('#e2dabd'),.005);
      for(let i=0;i<5;i++) box(g,.32,.003,.003,.2,1.559,-1.33+i*.035,mat('#97a38c'),0);
      tube(g,[[.3,1.55,-1.2],[.31,1.56,-1.1],[.5,1.55,-1.04]],.013,mat('#3f635f'));
      label(backDecor,'LEVEL UP!',.9,.23,.7,3.1,-2.757,'#d0b87f','#626b47');
    } else {
      plant(g,2.11,.13,.4,1.8);
      box(g,.52,.08,.38,2.75,1.67,-2.14,mat('#ded5b8'),.01);
      label(g,'FIELD NOTES',.35,.05,2.75,1.68,-1.945,'#ded5b8','#646650');
      // The old tower and discs are kept, rather than erased by an upgrade.
      box(g,.42,.55,.49,-1.15,.4,-2.23,mat('#b5b3a1'),.035);
      box(g,.32,.035,.012,-1.15,.59,-1.978,mat('#7e8175'),.005);
      box(g,.57,.16,.48,-1.15,.77,-2.23,mat('#baa883'),.012);
      label(g,'OLD FRIENDS',.42,.065,-1.15,.77,-1.985,'#dfd4b5','#82724e');
      const panel=box(backDecor,1.7,.67,.055,.5,2.93,-2.74,mat('#b1a17d'),.02);
      for(let i=0;i<3;i++){
        const note=label(backDecor,['KEEP PLAYING','ONE MORE?','SAT / 21:00'][i],.42,.24,-.06+i*.55,2.94,-2.701,['#d6bd82','#ded6ac','#bdc3a4'][i],'#6f6b50');note.rotation.z=(i-1)*.04;
      }
      if(era>=2020){
        const notebookX=era===2025?1.48:1.86;
        box(g,.4,.025,.54,notebookX,1.55,-1.53,mat('#c3b18a'),.012);
        label(g,'OFFLINE IS OK',.32,.07,notebookX,1.571,-1.53,'#c3b18a','#6d684e').rotation.x=-Math.PI/2;
        tube(g,[[.12,.2,-1.7],[.18,.17,-1.3],[.5,.16,-1.18]],.015,mat('#615f50'));
        const slippers=mat('#c6b498');box(g,.19,.08,.39,-1.22,.18,.4,slippers,.07).rotation.y=-.2;box(g,.19,.08,.39,-1.46,.18,.44,slippers,.07).rotation.y=-.35;
      }
    }
    for(let i=0;i<(era-2005)/5+1;i++) box(g,.35,.035,.34,2.65,2.36+i*.04,-2.13,mat(bookColors[(i+2)%7]),.005).rotation.y=(i%3)*.08;
  }
  let backDecor = new THREE.Group();backWall.add(backDecor);
  const fades = new Map();
  function isolateMaterials(group){
    const copies=new Map();
    group.traverse(object=>{
      if(!object.isMesh)return;
      const copy=material=>{if(!copies.has(material))copies.set(material,material.clone());return copies.get(material);};
      object.material=Array.isArray(object.material)?object.material.map(copy):copy(object.material);
    });
  }
  isolateMaterials(backWall);
  isolateMaterials(leftWall);
  function setOpacity(group, opacity){
    group.traverse(o=>{if(o.isMesh){const materials=Array.isArray(o.material)?o.material:[o.material];for(const m of materials){if(m.userData.originalOpacity===undefined)m.userData.originalOpacity=m.opacity;m.transparent=opacity<.999 || m.userData.originalOpacity<1;m.opacity=m.userData.originalOpacity*opacity;}}});
  }
  function setYear(nextYear){
    year=nextYear;
    const era=getEra(year).year;
    screen.setYear(year);
    if(era===currentEra)return;
    if(activeSetup){fades.set(activeSetup.group,{from:activeSetup.group.userData.alpha??1,to:0,start:performance.now()});fades.set(activeSetup.decor,{from:1,to:0,start:performance.now()});}
    if(!setups.has(era)){
      const setup=buildSetup(THREE,helpers,era,screen.texture);
      room.add(setup.group);
      backDecor=new THREE.Group();backWall.add(backDecor);
      decorate(setup.group,era);setup.decor=backDecor;
      isolateMaterials(setup.group);
      setups.set(era,setup);
    }
    activeSetup=setups.get(era);activeSetup.group.visible=true;activeSetup.decor.visible=true;
    fades.set(activeSetup.group,{from:0,to:1,start:performance.now()});fades.set(activeSetup.decor,{from:0,to:1,start:performance.now()});
    currentEra=era;
    mugChip.visible=era>=2015;
    memoryAnchors.screen=new THREE.Vector3(...activeSetup.anchors.screen);
    memoryAnchors.computer=new THREE.Vector3(...activeSetup.anchors.computer);
    if(era<2015){disc.position.set(-.55,1.56,-1.8);memoryAnchors.disc=new THREE.Vector3(-.55,1.71,-1.8);}else{disc.position.set(-1.15,.87,-2.23);memoryAnchors.disc=new THREE.Vector3(-1.15,1.04,-2.23);}
    if(view==='desk')setView('desk');
  }
  function roomPosition(){return window.innerWidth<701?new THREE.Vector3(11.4,9.6,13.6):new THREE.Vector3(10,8.2,11.9);}
  function setView(nextView, immediate=false){
    view=nextView;
    const target=nextView==='desk'?new THREE.Vector3(.5,1.99,-1.8):new THREE.Vector3(0,1.27,0);
    const position=nextView==='desk'?new THREE.Vector3(.8,3.5,3.7):roomPosition();
    if(immediate||reducedMotion){camera.position.copy(position);controls.target.copy(target);controls.update();animation=null;return;}
    animation={start:performance.now(),fromPos:camera.position.clone(),fromTarget:controls.target.clone(),position,target};
  }
  controls.addEventListener('start',()=>{animation=null;});
  const raycaster=new THREE.Raycaster();const pointer=new THREE.Vector2();let down=null;
  renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY};});
  renderer.domElement.addEventListener('pointerup',e=>{
    if(!down||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6)return;
    const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);
    raycaster.setFromCamera(pointer,camera);
    const hits=raycaster.intersectObjects([activeSetup.group,sharedMemories,bear,photoGroup],true);
    if(!hits.length)return;
    const hit=hits[0];
    if(hit.object===activeSetup.screenMesh){
      if(view!=='desk'){callbacks.onSelect('screen');return;}
      screen.click(hit.uv.x,hit.uv.y);return;
    }
    let p=hit.object;
    while(p){if(p===mug){callbacks.onSelect('mug');return;}if(p===disc){callbacks.onSelect('disc');return;}if(p===bear){callbacks.onSelect('bear');return;}if(p===photoGroup){callbacks.onSelect('photo');return;}p=p.parent;}
    if(hit.point.distanceTo(memoryAnchors.computer)<.8)callbacks.onSelect('computer');
  });

  function setNight(value){night=value;}
  function resize(){
    const {width,height}=container.getBoundingClientRect();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);
  }
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);
  setView('room',true);setYear(2005);resize();
  let last=performance.now(),frame=0,lightBlend=0;
  const resumeClock=()=>{last=performance.now();};
  document.addEventListener('visibilitychange',resumeClock);
  const projected=new THREE.Vector3();
  const frameData={};
  function render(now){
    frame=requestAnimationFrame(render);
    const dt=Math.max((now-last)/1000,0);last=now;
    if(document.hidden)return;
    if(animation){
      const t=Math.min((now-animation.start)/1000,1);const ease=1-Math.pow(1-t,3);
      camera.position.lerpVectors(animation.fromPos,animation.position,ease);controls.target.lerpVectors(animation.fromTarget,animation.target,ease);
      if(t===1)animation=null;
    }
    controls.update();
    for(const [group,fade]of fades){
      const t=reducedMotion?1:Math.min((now-fade.start)/450,1);const alpha=THREE.MathUtils.lerp(fade.from,fade.to,t*t*(3-2*t));setOpacity(group,alpha);group.userData.alpha=alpha;
      if(t===1){group.visible=fade.to>0;fades.delete(group);}
    }
    lightBlend=THREE.MathUtils.damp(lightBlend,night?1:0,4,dt);
    hemi.intensity=2.1-lightBlend*1.2;sun.intensity=4.1-lightBlend*3.7;fill.intensity=1.1-lightBlend*.55;
    deskLight.intensity=.6+lightBlend*3;screenLight.intensity=.12+lightBlend*.7;
    windowGlass.material.color.setRGB(1-lightBlend*.68,1-lightBlend*.65,1-lightBlend*.52);
    renderer.toneMappingExposure=1.2-lightBlend*.1;
    // Cutaway walls become transparent from behind so a full orbit remains useful.
    const backOpacity=camera.position.z < -2.8?.12:1;
    const leftOpacity=camera.position.x < -3.5?.12:1;
    if(backWall.userData.opacity!==backOpacity){setOpacity(backWall,backOpacity);backWall.userData.opacity=backOpacity;}
    if(leftWall.userData.opacity!==leftOpacity){setOpacity(leftWall,leftOpacity);leftWall.userData.opacity=leftOpacity;}
    screen.update(dt);
    const rect=container.getBoundingClientRect();
    for(const [id,anchor]of Object.entries(memoryAnchors)){
      projected.copy(anchor).project(camera);
      frameData[id]={x:(projected.x*.5+.5)*rect.width+container.offsetLeft,y:(-projected.y*.5+.5)*rect.height+container.offsetTop,visible:projected.z<1&&projected.z>0&&(view!=='desk'||id==='screen'||id==='mug')};
    }
    callbacks.onFrame(frameData,dt);
    renderer.render(scene,camera);
  }
  frame=requestAnimationFrame(render);
  return {setYear,setView,setNight,screen,getState:()=>({year,era:currentEra,view,night,screen:screen.getState(),meshes:renderer.info.render.calls}),destroy(){cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',resumeClock);resizeObserver.disconnect();controls.dispose();renderer.dispose();}};
}
