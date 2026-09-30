import * as T from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Reflector } from 'three/addons/objects/Reflector.js';

const scene = new T.Scene(); scene.background = new T.Color('#101a27');
const renderer = new T.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
renderer.outputColorSpace = T.SRGBColorSpace; renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.38;
document.body.append(renderer.domElement);
const camera = new T.PerspectiveCamera(34, innerWidth / innerHeight, .1, 150); camera.position.set(24, 28, 30);
function fitView(){camera.aspect=innerWidth/innerHeight;camera.fov=camera.aspect<1?T.MathUtils.radToDeg(2*Math.atan(Math.tan(T.MathUtils.degToRad(17))/camera.aspect)):34;camera.updateProjectionMatrix();}fitView();
const controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 1.4, 0); controls.enableDamping = true; controls.minDistance = 14; controls.maxDistance = 58; controls.maxPolarAngle = Math.PI * .46;
scene.add(new T.HemisphereLight('#aac8e9', '#27303c', 2.2));
const moon = new T.DirectionalLight('#9bbcf2', 3.3); moon.position.set(-12, 23, 8); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); Object.assign(moon.shadow.camera, { left: -15, right: 15, top: 15, bottom: -15, far: 65 }); moon.shadow.bias = -.001; scene.add(moon);
const root = new T.Group(); scene.add(root);
let seed = 164; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
function texture(kind) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  x.fillStyle = kind === 'wood' ? '#85633f' : kind === 'metal' ? '#5a6971' : '#68747c'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2700; i++) { x.fillStyle = `rgba(${rand() > .5 ? '255,255,255' : '0,0,0'},${rand() * .14})`; x.fillRect(rand() * 256, rand() * 256, kind === 'wood' ? 1 : 2, kind === 'wood' ? 35 : 2); }
  if (kind === 'metal') { x.strokeStyle = '#34464e'; x.lineWidth = 4; for (let i = 0; i < 256; i += 22) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 256); x.stroke(); } }
  const tex = new T.CanvasTexture(c); tex.colorSpace = T.SRGBColorSpace; return tex;
}
const mats = new Map(); const textures = { wood: texture('wood'), concrete: texture('concrete'), metal: texture('metal') };
function mat(color, kind) { const key = color + kind; if (!mats.has(key)) mats.set(key, new T.MeshToonMaterial({ color, map: textures[kind] || null })); return mats.get(key); }
const dark = new T.LineBasicMaterial({ color: '#101a23', transparent: true, opacity: .65 });
function mesh(geo, material, x, y, z, outline = true, parent = root) {
  const m = new T.Mesh(geo, material); m.position.set(x, y, z); m.castShadow = m.receiveShadow = true; parent.add(m);
  if (outline) m.add(new T.LineSegments(new T.EdgesGeometry(geo, 25), dark)); return m;
}
function box(x,y,z,w,h,d,color,kind, parent=root) { return mesh(new T.BoxGeometry(w,h,d),mat(color,kind),x,y,z,true,parent); }
function cyl(x,y,z,r,h,color,n=12,parent=root) { return mesh(new T.CylinderGeometry(r,r,h,n),mat(color),x,y,z,true,parent); }
function line(points,color='#1a2228',parent=root) { const l = new T.Line(new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p))),new T.LineBasicMaterial({color})); parent.add(l); return l; }
function label(text,x,y,z,w,h,color='#d1d1bc',back='#324550', rotation=0) {
 const c=document.createElement('canvas'); c.width=512;c.height=256;const ctx=c.getContext('2d');ctx.fillStyle=back;ctx.fillRect(0,0,512,256);ctx.strokeStyle=color;ctx.lineWidth=8;ctx.strokeRect(12,12,488,232);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`bold ${text.length>12?34:70}px monospace`;ctx.fillText(text,256,130);
 const tex=new T.CanvasTexture(c);tex.colorSpace=T.SRGBColorSpace;const m=mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,side:T.DoubleSide}),x,y,z,false);m.rotation.y=rotation;return m;
}
function floorMark(text,x,z,size,color) { const m=label(text,x,.065,z,size,size,color,'#35414b');m.rotation.x=-Math.PI/2; return m; }
function crate(x,y,z,s=1) { box(x,y+s/2,z,s,s,s,'#b79665','wood'); for(const k of [-1,1]) {box(x+k*s*.36,y+s/2,z+s*.51,.08,s,.04,'#342d28');box(x,y+s*k*.36+s/2,z+s*.51,s,.08,.04,'#342d28');} const a=box(x,y+s/2,z+s*.53,.07,s*1.17,.05,'#5e4934');a.rotation.z=.73; }
function barrel(x,z,y=0) { cyl(x,y+.49,z,.32,.94,'#42768c');for(const h of [.12,.8])cyl(x,y+h,z,.34,.05,'#26363e'); }
function container(x,y,z,w=3.4,d=1.6,color='#587482') { box(x,y+.78,z,w,1.56,d,color,'metal');for(let a=-w/2+.15;a<w/2;a+=.25)box(x+a,y+.78,z+d/2+.025,.035,1.45,.035,'#253a45');label('CARGO 064',x,y+.8,z+d/2+.05,1.55,.45,'#cbd0be',color); }
function stairs(x,z,w,count,height,depth,dir=1) {for(let i=0;i<count;i++)box(x,.1+height*(i+1)/2,z+dir*i*depth,w,height*(i+1),depth,'#78838b','concrete');}
function lamp(x,z,h=4,color='#ffd697') { cyl(x,h/2,z,.075,h,'#233540');box(x+.32,h,z,.7,.08,.1,'#223847');const bulb=mesh(new T.SphereGeometry(.14,12,8),new T.MeshBasicMaterial({color}),x+.55,h-.12,z,false); const l=new T.PointLight(color,24,7,2);l.position.copy(bulb.position);root.add(l);return l; }
function ladder(x,y,z,h=2.2,rot=0){const g=new T.Group();g.position.set(x,y,z);g.rotation.y=rot;root.add(g);box(-.26,h/2,0,.06,h,.06,'#4e5b5c',null,g);box(.26,h/2,0,.06,h,.06,'#4e5b5c',null,g);for(let k=.15;k<h;k+=.24)box(0,k,0,.56,.04,.06,'#929b92',null,g);return g;}
function vehicle(x,z,police=false){const g=new T.Group();g.position.set(x,0,z);root.add(g);box(0,.65,0,1.6,.78,3.3,police?'#c3cbd0':'#61766b',null,g);box(0,1.28,police?0:.6,1.56,.65,police?2.9:2.1,police?'#b5bdc3':'#8f9787','metal',g);box(0,1.28,-1,1.45,.6,.65,'#668396',null,g);for(const a of [-1,1])for(const b of [-1,1]){const m=cyl(a*.8,.45,b*1.06,.35,.18,'#171d22',12,g);m.rotation.z=Math.PI/2;}box(0,.7,-1.69,1.4,.14,.06,'#172633',null,g);for(const a of [-1,1])box(a*.55,.85,-1.73,.22,.12,.05,'#c5d3be',null,g);if(police){box(0,1.68,0,1.1,.1,.25,'#343d4c',null,g);for(const a of [-1,1])mesh(new T.BoxGeometry(.35,.12,.25),new T.MeshBasicMaterial({color:a<0?'#d85157':'#6aa0fd'}),a*.3,1.77,0,false,g);}return g;}
box(0,-.38,0,20,.75,20,'#777e82','concrete');box(0,.005,0,19.7,.08,19.7,'#455362','concrete');
for(let i=-9;i<=9;i++) { box(i,-.4,10.015,.015,.65,.015,'#4f5a65');box(10.015,-.4,i,.015,.65,.015,'#4f5a65'); }
label('FREIGHT YARD / 1:64',0,-.38,10.03,5,.37,'#c8d5da','#344552');
// Roof cutaways keep the interior and tactical paths visible from the initial orbit.
box(-5.9,1.8,-5.15,.22,3.6,5.9,'#8a9192','concrete');box(-3.5,1.8,-8,5,3.6,.22,'#7b858c','concrete');box(-1.15,1.8,-6.8,.22,3.6,2.3,'#7b858c','concrete');
box(-3.5,.09,-5.15,4.7,.15,5.55,'#788388','concrete');floorMark('A',-3.55,-4,1.5,'#e5dcc4');label('A / WAREHOUSE',-3.5,3.4,-2.17,3.1,.5,'#edd3a5','#394954');
for(const x of [-5.7,-1.35])box(x,1.7,-2.2,.2,3.4,.23,'#889ba2');box(-3.5,3.35,-2.2,4.7,.23,.3,'#738188');
const shutter=box(-3.5,2.87,-2.2,4.3,.65,.14,'#9a9385','metal');box(-3.65,1.6,-5,.25,3.2,.25,'#7b898b');
box(-1.95,2.55,-6.35,1.5,.12,2.55,'#778489','metal');ladder(-1.4,.1,-5.1,2.5);box(-1.9,2.94,-5.05,1.45,.07,.06,'#485f6d');
for(let h=.4;h<2.7;h+=.52){box(-5.35,h,-6.4,.65,.08,2.4,'#777d75');for(let j=0;j<3;j++)crate(-5.4,h+.05,-7.2+j*.72,.48);}for(const z of [-7.5,-5.4])box(-5,1.5,z,.07,3,.08,'#54606c');
crate(-2.9,.1,-6.8,1.15);crate(-2.9,1.25,-6.8,.9);crate(-4.2,.1,-3.7,.9);crate(-2.1,.1,-3.5,.75);
for(let i=0;i<5;i++)mesh(new T.SphereGeometry(.34,8,6),mat('#b1a68d'),-4.5+(i%2)*.55,.3+Math.floor(i/2)*.33,-5.2,false);
box(-4.1,.2,-6,1.2,.2,.7,'#b59c56');box(-4.1,.7,-5.8,.04,1,.05,'#9b9981');line([[-4.1,.8,-5.8],[-4.1,1.1,-5.6],[-3.7,1.1,-5.6]],'#c0b591');
box(-6.7,.7,-3.2,.6,1.3,.6,'#50685b');box(-6.9,1.8,-5,.65,.65,.28,'#949b97');label('EXIT',-4.6,2,-7.86,.65,.3,'#72aeaf','#203b3c');
const aLight=lamp(-4,-4,3.05,'#c4e4f3');
// Northern loading bay, ramp and container nests.
container(3.3,.06,-8.4,3.6,1.65,'#477583');container(3.3,1.62,-8.4,3.6,1.65,'#a08569');container(4.5,3.18,-8.4,2.6,1.65,'#657b77');container(7,.06,-7.8,1.9,2.8,'#758880');
const truck=vehicle(-7.5,-7.25);truck.rotation.y=Math.PI;ladder(-6.5,.1,-7.6,2.1,.3);
for(let x=-9;x<-2;x+=.55){cyl(x,1.2,-9.3,.025,2.4,'#526573');line([[x,2.45,-9.3],[x+.5,2.55,-9.3]],'#778d97');}for(let y=.4;y<2.5;y+=.22)line([[-9,y,-9.3],[-2,y,-9.3]],'#4a6070');
label('T / LOADING',-.1,1.5,-9.25,2.2,.65,'#c9ad82','#4d4d43');
for(let i=0;i<4;i++)barrel(.7+(i%2)*.72,-7+Math.floor(i/2)*.72);box(.2,.2,-5.3,1.5,.35,3,'#758082','concrete').rotation.x=-.15;
for(let z=-6.8;z<-3.8;z+=.24)box(1.1,.75,z,.15,1.4,.2,'#61727a');box(1.1,1.32,-5.4,.16,.2,3,'#61727a');
// Mid doors, high firing openings and an actual cut-through lower tunnel.
for(const x of [-1.9,1.9]){box(x,1.3,.2,1.45,2.6,.3,'#82929c','concrete');box(x,2.8,.2,1.45,.4,.3,'#82929c');}
for(const a of [-1,1]){const door=box(a*.66,1.22,.2,1.24,2.42,.17,'#526e77','metal');door.rotation.y=a*.55;label(a<0?'01':'02',a*.68,1.32,.37,.55,.6,'#b7c5c4','#536d76');}
for(let z=-3;z<6.1;z+=.22){box(0,.06,z,.65,.045,.035,'#26313d');box(.36,.05,z,.045,.05,.2,'#82909c');box(-.36,.05,z,.045,.05,.2,'#82909c');}
box(1.4,.22,3.8,1.7,.45,3.5,'#566873');box(1.4,.75,3.8,1.7,.3,3.5,'#6a7882');box(.5,.4,5.6,.2,.9,.2,'#5f717e');box(2.3,.4,5.6,.2,.9,.2,'#5f717e');label('DRAIN 03',1.4,.42,5.81,1.4,.3,'#8dacae','#152b3a');
box(-1.35,.45,4.5,1.8,.9,.4,'#819297','concrete');crate(-2.2,.1,4.9,.8);stairs(-2.95,1.3,1.4,7,.28,.32,-1);box(-3,2,0,1.6,.2,2,'#899197');
// B guardhouse, furnished lower room and external balcony.
box(6.7,1.7,-3.7,4.5,3.4,.15,'#778a86','metal');box(8.9,1.7,-2.7,.15,3.4,2.1,'#6f8584','metal');box(6.7,1.85,-2.7,4.45,.16,2.2,'#6d7c7a');box(6.7,3.4,-2.7,4.55,.16,2.3,'#566c70');
for(const x of [4.5,6.8,8.9])box(x,.9,-1.6,.08,1.8,.08,'#354c55');box(6.7,1.6,-1.6,4.4,.35,.12,'#90a097');
const glass=new T.MeshPhysicalMaterial({color:'#94bac5',transparent:true,opacity:.19,roughness:.14,depthWrite:false});mesh(new T.PlaneGeometry(1.9,1.25),glass,5.55,.85,-1.59,false);
box(6.3,.8,-2.6,1.5,.12,.8,'#947b60');for(const x of [5.7,6.9])box(x,.4,-2.6,.07,.8,.07,'#676d65');box(6.4,.37,-2.2,.5,.08,.5,'#3f565d');box(6.4,.65,-2.1,.5,.45,.07,'#3f565d').rotation.x=.45;box(8.4,.75,-3.2,.5,1.5,.6,'#637976');label('DUTY / 22:00',7,1.3,-3.6,1,.5,'#d7ceaa','#545849');
label('B',6.6,2.75,-1.52,.8,.8,'#efd197','#4d645e');floorMark('B',6.2,-.3,1.3,'#e8c98c');stairs(8,1.3,1.35,8,.235,.32,-1);box(6.7,2,-.6,4.4,.2,1.7,'#708180');for(const x of [4.6,6.8,8.9])box(x,2.45,.2,.045,.8,.045,'#384f59');box(6.7,2.8,.2,4.4,.055,.055,'#79949b');
for(let z=-.4;z<4;z+=1.2){box(7.8,1.1,z,.35,2.2,.35,'#7a8587');box(8.7,1.9,z,1.6,.12,.15,'#526875');}box(8.2,1.6,2.6,3,.2,4.9,'#7d878c');
crate(5,.1,.7,.65);barrel(7,.5);box(5.6,.22,1.3,1.2,.15,.85,'#826843','wood');for(let i=0;i<5;i++)box(5.6,.32,1.3-.32+i*.16,1.2,.04,.07,'#b29063');
const bLamp=lamp(4.6,1.3,3.6);const bikeGroup=new T.Group();root.add(bikeGroup);for(const z of [.7,1.55]){const wheel=mesh(new T.TorusGeometry(.32,.04,6,20),mat('#263945'),8.8,.4,z,true,bikeGroup);wheel.rotation.y=Math.PI/2;}line([[8.8,.4,.7],[8.8,.9,1.05],[8.8,.4,1.55],[8.8,.4,.7],[8.8,1,1.5],[8.8,.9,1.05]],'#9b7961');
// CT blockade, stairs, searchlight and small occupied-looking equipment details.
box(1.5,.6,9.3,13,1.2,.2,'#6d8390','concrete');label('CT / POLICE LINE',1.7,.7,9.15,3.3,.45,'#c2d8e2','#304c60',Math.PI);vehicle(-6.5,6.7,true);
for(let x=-3;x<4;x+=1.65){box(x,.48,7.3,1.3,.8,.3,'#ced0c0');for(let k=-.45;k<.5;k+=.3)box(x+k,.55,7.46,.14,.62,.03,'#354850').rotation.z=-.3;}
box(6.4,1.1,7,4.1,2.2,3.4,'#788b95','concrete');stairs(4.2,4,1.1,8,.27,.32,1);const search=lamp(7,6.9,3.8,'#bedfff');
const spot=new T.SpotLight('#b9d8ef',95,16,.26,.48,1.4);spot.position.set(7,3.9,6.9);spot.target.position.set(0,0,0);root.add(spot,spot.target);spot.castShadow=true;box(7,3.8,6.9,.45,.4,.65,'#223743');
for(let i=0;i<3;i++) {crate(2+i*.8,.1,8.2,.65);mesh(new T.SphereGeometry(.23,12,6),mat('#374954'),2+i*.8,.93,8.2);}
for(let z=-1;z<6;z+=1.8){barrel(-7.5,z);crate(-8.6,.1,z+.6,.6);}label('A  ←',-5.77,1.35,-.2,1.6,.5,'#ddd0ac','#596967',Math.PI/2);
// Small repeat details: bullet clusters, drains, conduit, cartons, fencing and vapor.
for(let i=0;i<75;i++){const x=rand()*4-5.5,z=-7.85;mesh(new T.CircleGeometry(.025+rand()*.02,7),mat('#273842'),x,.5+rand()*2.5,z,false);}
for(const [x,z] of [[-8,1],[4,4],[5,-6],[-6,-2]]) {box(x,.25,z,.5,.5,.5,'#a28a69','wood');box(x+.4,.18,z+.5,.45,.36,.55,'#867762','wood');}
for(const [x,z] of [[-8.8,3.6],[3.8,-6.1],[8.7,5.5]]) {cyl(x,2.8,z,.07,5.6,'#545e63');box(x,5.35,z,1,.1,.1,'#7f8583');for(const a of [-.35,.35])cyl(x+a,5.5,z,.08,.2,'#8a9c99');}
for(let n=0;n<2;n++){const p=[];for(let i=0;i<=24;i++){const t=i/24;p.push([-8.8+t*12.6,5.35-Math.sin(t*Math.PI)*.65,3.6-t*9.7+n*.2]);}line(p);}
const puddles=[];for(const [x,z,r] of [[0,-3,1.2],[-4,2,1],[-6,6,1],[3,3,.95],[5,5,.8],[3,-5,.6]]){const rfl=new Reflector(new T.CircleGeometry(r,40),{textureWidth:512,textureHeight:512,color:0x778999,clipBias:.004});rfl.rotation.x=-Math.PI/2;rfl.position.set(x,.061,z);root.add(rfl);puddles.push(rfl);}
const ripples=[];for(let i=0;i<20;i++){const p=puddles[i%puddles.length];const m=mesh(new T.RingGeometry(.18,.19,28),new T.MeshBasicMaterial({color:'#a0c5d5',transparent:true,opacity:.3,side:T.DoubleSide,depthWrite:false}),p.position.x+(rand()-.5)*.7,.069,p.position.z+(rand()-.5)*.7,false);m.rotation.x=-Math.PI/2;ripples.push(m);}
const rainCount=1400, rainPos=new Float32Array(rainCount*6),rainSpeed=[];for(let i=0;i<rainCount;i++){const x=rand()*19-9.5,y=rand()*8,z=rand()*19-9.5;rainPos.set([x,y,z,x+.035,y-.22,z+.015],i*6);rainSpeed.push(3+rand()*4);}const rainGeo=new T.BufferGeometry();rainGeo.setAttribute('position',new T.BufferAttribute(rainPos,3));const rain=new T.LineSegments(rainGeo,new T.LineBasicMaterial({color:'#aecddd',transparent:true,opacity:.25}));root.add(rain);
const vapor=[];for(let i=0;i<12;i++){const m=mesh(new T.SphereGeometry(.15,8,6),new T.MeshBasicMaterial({color:'#bdd1d8',transparent:true,opacity:.07,depthWrite:false}),-6.6,1.8+i*.06,-5,false);vapor.push(m);}
const clock=new T.Clock();let elapsed=0,frame=0;let captureTime=null;
const policeGlow=new T.PointLight('#f65564',18,5);policeGlow.position.set(-6.5,1.9,6.7);root.add(policeGlow);
for(const [x,z] of [[-6.1,-4],[8.9,-3.1],[-1.1,-7.1]]){cyl(x,1.4,z,.045,2.8,'#7e6357');for(let k=0;k<3;k++)box(x,1+k*.6,z,.12,.05,.14,'#455764');}
for(const [x,z] of [[-7,4.5],[4.1,1.6],[2,-7.8]]){const tire=mesh(new T.TorusGeometry(.27,.1,8,18),mat('#202c35'),x,.16,z);tire.rotation.x=Math.PI/2;}
for(let i=0;i<3;i++){const shield=box(-2.8+i*.9,.45,6.2,.54,.85,.1,'#354b5d');shield.rotation.x=-.17;box(-2.8+i*.9,.65,6.11,.31,.16,.02,'#7a9ba7');}
for(const x of [-2.5,2.6]){box(x,.9,2.1,1.1,1.8,1,'#778b91');box(x,1.8,2.1,1.3,.12,1.2,'#405965');mesh(new T.PlaneGeometry(.85,.7),glass,x,1.05,2.61,false);box(x,.72,2.05,.7,.1,.45,'#273c49');box(x,.98,1.91,.5,.4,.1,'#2d4556');}
window.__DIORAMA__={getState:()=>({ready:frame>1,time:elapsed, camera:camera.position.toArray(),target:controls.target.toArray(),meshCount:root.children.length}),setTime:t=>{if(Number.isFinite(t)&&t>=0)captureTime=t;},resume:()=>captureTime=null};
function tick(){requestAnimationFrame(tick);const dt=Math.min(clock.getDelta(),.05);elapsed=captureTime??elapsed+dt;const t=elapsed;controls.update();
 for(let i=0;i<rainCount;i++){const p=i*6;rainPos[p+1]-=dt*rainSpeed[i];if(rainPos[p+1]<.12)rainPos[p+1]=8;rainPos[p+4]=rainPos[p+1]-.22;}rainGeo.attributes.position.needsUpdate=true;
 ripples.forEach((m,i)=>{const phase=(t*.65+i*.137)%1;m.scale.setScalar(.15+phase*3);m.material.opacity=(1-phase)*.2;});
 vapor.forEach((m,i)=>{m.position.y=1.7+((t*.16+i*.12)%1.2);m.position.x=-6.6+Math.sin(t+i)*.08;m.scale.setScalar(.5+((t*.16+i*.12)%1.2));});
 policeGlow.intensity=9+Math.sin(t*1.7)*8;bLamp.intensity=65+Math.sin(t*2.3)*2;search.intensity=21+Math.sin(t*1.8)*2;shutter.position.y=2.87+Math.sin(t*2)*.007;moon.intensity=(t%23>22.75)?4:1.8;
 renderer.render(scene,camera);frame++;if(frame===2)document.documentElement.dataset.ready='true';}
tick();addEventListener('resize',()=>{fitView();renderer.setSize(innerWidth,innerHeight);});
