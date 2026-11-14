import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.querySelector('#scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
scene.background = new THREE.Color('#0d1017');
scene.fog = new THREE.Fog('#0d1017', 12, 28);
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, 0.1, 50);
camera.position.set(7.6, 5.1, 8.6);
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 1.4, -1.2);
controls.enableDamping = true;
controls.dampingFactor = .06;
controls.minDistance = 3.5;
controls.maxDistance = 15;
controls.maxPolarAngle = Math.PI * .48;
controls.minPolarAngle = .25;

const root = new THREE.Group();
scene.add(root);
const timeline = document.querySelector('#timeline');
const yearLabel = document.querySelector('#year');
const playBtn = document.querySelector('#play');
const infoPanel = document.querySelector('#info');
const infoTitle = document.querySelector('#info-title');
const infoCopy = document.querySelector('#info-copy');
const infoTag = document.querySelector('#info-tag');
const infoMeta = document.querySelector('#info-meta');
const closeInfo = document.querySelector('#close-info');
const screenTip = document.querySelector('#screen-tip');

const palette = {
  ink: '#16151b', wall: '#25252b', wallLight: '#36333a', floor: '#6e4c3a', wood: '#936548', woodLight: '#b68059', metal: '#4a4b50', cream: '#d3c3a8', amber: '#f6c977', green: '#69a88b', blue: '#719ac7', red: '#b85f55', pink: '#ca7195', paper: '#e7dfd0'
};
const mats = {};
function mat(key, color, rough=.72, metalness=0) { mats[key] = new THREE.MeshStandardMaterial({ color, roughness:rough, metalness }); return mats[key]; }
Object.entries(palette).forEach(([key, color]) => mat(key, color));
const matCache = {};
function M(color, rough=.72, metalness=0, emissive=null, intensity=0) { const key = `${color}-${rough}-${metalness}-${emissive}-${intensity}`; if (!matCache[key]) matCache[key] = new THREE.MeshStandardMaterial({ color, roughness:rough, metalness, emissive:emissive || 0x000000, emissiveIntensity:intensity }); return matCache[key]; }
function box(name, size, pos, material, parent=root, opts={}) { const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material); mesh.name = name; mesh.position.set(...pos); if (opts.rotation) mesh.rotation.set(...opts.rotation); mesh.castShadow = opts.cast ?? true; mesh.receiveShadow = opts.receive ?? true; parent.add(mesh); return mesh; }
function cyl(name, radius, height, pos, material, parent=root, opts={}) { const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius * (opts.bottomScale || 1), height, opts.segments || 20), material); mesh.name = name; mesh.position.set(...pos); if (opts.rotation) mesh.rotation.set(...opts.rotation); mesh.castShadow = opts.cast ?? true; mesh.receiveShadow = opts.receive ?? true; parent.add(mesh); return mesh; }
function sphere(name, radius, pos, material, parent=root, opts={}) { const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, opts.w || 20, opts.h || 12), material); mesh.name = name; mesh.position.set(...pos); mesh.castShadow = opts.cast ?? true; mesh.receiveShadow = opts.receive ?? true; parent.add(mesh); return mesh; }
function plane(name, size, pos, material, parent=root, opts={}) { const mesh = new THREE.Mesh(new THREE.PlaneGeometry(...size), material); mesh.name = name; mesh.position.set(...pos); if (opts.rotation) mesh.rotation.set(...opts.rotation); mesh.castShadow = opts.cast ?? false; mesh.receiveShadow = opts.receive ?? true; parent.add(mesh); return mesh; }
function group(name, parent=root) { const g = new THREE.Group(); g.name = name; parent.add(g); return g; }
function setInteractive(mesh, data) { mesh.userData = { interactive:true, ...data }; return mesh; }
function setVisible(groupObj, visible, scale=1) { groupObj.visible = visible; groupObj.scale.setScalar(scale); }

// Room shell: warm, slightly imperfect materials and a fixed layout.
box('Floor', [10, .18, 8], [0, -.1, 0], mats.floor, root, { cast:false });
for (let i=-4; i<=4; i++) box(`plank-${i}`, [10, .025, .03], [0, .012, i*.82], M(i % 2 ? '#79533e':'#855b43', .9), root, { cast:false, receive:true });
box('Back wall', [10, 5.8, .12], [0, 2.9, -4], mats.wall, root, { cast:false });
box('Left wall', [.12, 5.8, 8], [-5, 2.9, 0], mats.wallLight, root, { cast:false });
box('Baseboard', [10, .16, .14], [0, .08, -3.88], M('#17171c', .9), root, { cast:false });
box('Sideboard trim', [.14, .16, 8], [-4.88, .08, 0], M('#17171c', .9), root, { cast:false });

// Area light and moody practicals.
scene.add(new THREE.HemisphereLight('#f0d7bd', '#10141d', 1.5));
const key = new THREE.DirectionalLight('#ffd8aa', 3.6); key.position.set(-4, 8, 5); key.castShadow = true; key.shadow.mapSize.set(2048,2048); key.shadow.camera.left=-8; key.shadow.camera.right=8; key.shadow.camera.top=8; key.shadow.camera.bottom=-6; scene.add(key);
const windowGlow = new THREE.PointLight('#ffd3a2', 5, 12, 2); windowGlow.position.set(-3.5, 3.5, -3.3); scene.add(windowGlow);
const practical = new THREE.PointLight('#e17d5a', 1.4, 6, 2); practical.position.set(2.9, 2.4, -2.7); scene.add(practical);

// Rug and desk anchor the story across every year.
box('Rug', [4.9, .035, 3.15], [0, .025, -.8], M('#2b3541', .95), root, {cast:false});
for (let z=-2.15; z<.7; z+=.35) box('rug-stitch', [4.72,.01,.018], [0,.05,z], M('#394654',1), root, {cast:false});
const desk = group('The desk');
box('desk-top', [4.7,.22,1.18], [0,1.74,-2.72], mats.wood, desk);
box('desk-edge', [4.72,.09,.08], [0,1.62,-3.26], mats.woodLight, desk);
for (const x of [-2.05,2.05]) { box('desk-leg', [.22,1.62,.22], [x,.83,-2.77], M('#3c2d27', .85), desk); box('desk-foot', [.62,.13,.42], [x,.12,-2.77], M('#32272a', .85), desk); }
box('drawer-unit', [1.0,1.15,.93], [1.45,1.03,-2.74], M('#604133', .9), desk);
for (let y=0.74;y<1.55;y+=.34) { box('drawer-line', [.7,.025,.02], [1.45,y,-3.22], M('#a77956'), desk); cyl('drawer-handle', .025,.18,[1.45,y+0.02,-3.28], mats.metal, desk, {rotation:[Math.PI/2,0,0]}); }
const deskMat = setInteractive(box('desk-surface', [4.2,.03,1.04], [0,1.87,-2.72], M('#9c6b4d', .88), desk, {cast:false}), {title:'The desk', tag:'THE CONSTANT', copy:'The first flat-pack desk survived every upgrade. Its left corner still has the pale ring from a 2008 energy drink.', meta:'2005—2025 · original furniture'});

// Desk accessories and chair.
const chair = group('Chair');
box('chair-seat', [1.55,.18,1.45], [0,.95,-.85], M('#343e49', .85), chair);
box('chair-back', [1.55,1.65,.16], [0,1.72,-1.48], M('#27303b', .82), chair, {rotation:[-.07,0,0]});
box('chair-pillow', [1.1,.34,.12], [0,1.63,-1.37], M('#58606a', .8), chair);
cyl('chair-post', .12,.95,[0,.49,-.85], mats.metal, chair);
for(let a=0;a<Math.PI*2;a+=Math.PI/3){ box('chair-wheel', [.72,.07,.1], [Math.cos(a)*.42,.08,-.85+Math.sin(a)*.42], M('#20232a'), chair, {rotation:[0,a,0]}); }
setInteractive(chair.children[1], {title:'The chair', tag:'BODY MEMORY', copy:'By 2015 the chair had a new backrest. The old one became the spare seat for friends and never really left.', meta:'comfort upgrade · 2015'});

// Screen textures are drawn locally, keeping runtime fully offline.
const screenCanvas = document.createElement('canvas'); screenCanvas.width=1024; screenCanvas.height=640; const screenCtx=screenCanvas.getContext('2d');
const screenTexture = new THREE.CanvasTexture(screenCanvas); screenTexture.colorSpace = THREE.SRGBColorSpace; screenTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
function drawScreen(year, mode=0) {
  const t = (year-2005)/20; const y = Math.round(year); const ctx=screenCtx;
  ctx.fillStyle = y < 2010 ? '#6f836e' : y < 2016 ? '#172333' : '#0c121e'; ctx.fillRect(0,0,1024,640);
  if (y < 2010) { ctx.fillStyle='#c8d7bb'; ctx.fillRect(46,40,932,80); ctx.fillStyle='#1b2b2c'; ctx.font='bold 38px monospace'; ctx.fillText('DANIEL\'S DESKTOP',72,91); ctx.fillStyle='#d1ddcd'; ctx.fillRect(48,145,310,430); ctx.fillRect(382,145,594,202); ctx.fillStyle='#293a33'; ctx.font='26px monospace'; ctx.fillText('MY DOCUMENTS',75,196); ctx.fillText('LAN PARTY // 19:42',415,196); ctx.fillStyle='#eed298'; ctx.fillRect(417,250,170,62); ctx.fillStyle='#15343a'; ctx.font='26px monospace'; ctx.fillText('START GAME',438,290); ctx.fillStyle='#213a35'; ctx.font='22px monospace'; ctx.fillText(mode%2 ? '> loading save...' : '> no new messages',75,515); }
  else { const accent = y < 2016 ? '#48c3b1' : '#f6c977'; ctx.fillStyle='#0e1728'; ctx.fillRect(40,38,944,72); ctx.fillStyle=accent; ctx.fillRect(40,38,12,72); ctx.fillStyle='#eef0e4'; ctx.font='bold 34px monospace'; ctx.fillText(y < 2016 ? 'STEAM // LIBRARY' : 'NIGHT SHIFT // DESKTOP',78,85); ctx.fillStyle='#17273a'; ctx.fillRect(40,140,605,420); ctx.fillStyle='#263c57'; ctx.fillRect(674,140,310,420); ctx.fillStyle=accent; ctx.font='24px monospace'; ctx.fillText(y < 2016 ? 'RECENTLY PLAYED' : 'CURRENT SESSION',75,185); ctx.fillStyle='#d9e2df'; ctx.font='32px monospace'; ctx.fillText(mode%2 ? (y < 2016 ? 'PORTAL 2' : 'HADES II') : (y < 2016 ? 'MINECRAFT' : 'BALATRO'),75,270); ctx.font='18px monospace'; ctx.fillText('PLAY  ·  SETTINGS  ·  NOTES',75,334); ctx.fillStyle='#b2bbc5'; ctx.fillText('20 years of saves',706,197); ctx.fillStyle=accent; ctx.fillRect(706,250,220,8); ctx.fillStyle='#8995a4'; ctx.fillText('Last sync  23:48',706,322); ctx.fillText(mode%2 ? 'focus mode: ON' : 'focus mode: OFF',706,372); }
  ctx.fillStyle='rgba(255,255,255,.045)'; for (let i=0;i<640;i+=4) ctx.fillRect(0,i,1024,1);
  screenTexture.needsUpdate=true;
}

drawScreen(2005);
const monitor = group('Monitor');
box('monitor-shell', [2.72,1.76,.22], [-.55,2.76,-2.83], M('#22232a', .62), monitor);
plane('monitor-screen', [2.42,1.48], [-.55,2.76,-2.955], new THREE.MeshStandardMaterial({map:screenTexture, roughness:.45, emissive:'#171b20', emissiveIntensity:.35}), monitor);
box('monitor-bezel-bottom', [2.72,.18,.24], [-.55,1.91,-2.83], M('#25262b', .62), monitor);
box('monitor-neck', [.17,.48,.18], [-.55,1.64,-2.83], mats.metal, monitor);
box('monitor-foot', [.9,.08,.43], [-.55,1.42,-2.83], mats.metal, monitor);
setInteractive(monitor, {type:'screen', title:'The glowing rectangle', tag:'SCREEN LOG', copy:'Click to cycle the desktop. The machine changed three times, but the late-night ritual never did: one more run before bed.', meta:'interactive · era-aware display'});
const crt = group('CRT monitor');
box('crt-shell', [2.35,1.9,1.7], [-.6,2.72,-2.76], M('#bbb39d', .75), crt);
box('crt-face', [1.8,1.42,.12], [-.6,2.78,-3.62], M('#22252b', .55), crt);
plane('crt-screen', [1.58,1.16], [-.6,2.78,-3.69], new THREE.MeshStandardMaterial({map:screenTexture, roughness:.5, emissive:'#6f836e', emissiveIntensity:.4}), crt);
box('crt-base', [1.05,.16,.68], [-.6,1.57,-2.76], M('#8e8979'), crt);

// Keyboard, mouse and little physical evidence.
const keyboard = group('Keyboard');
box('keyboard-body', [1.75,.11,.62], [-.55,1.99,-2.2], M('#d1c7b4', .8), keyboard, {rotation:[-.08,0,0]});
for(let row=0;row<4;row++) for(let col=0;col<12;col++) box('key', [.09,.025,.08], [-1.28+col*.13,2.065,-2.07-row*.11], M(row===0?'#827b70':'#ece2cd', .7), keyboard);
const mouse = setInteractive(sphere('mouse', .13, [.73,2.02,-2.22], M('#292b33', .65), desk), {title:'The mouse', tag:'SMALL UPGRADE', copy:'The clicky ball mouse gave way to an optical one. The old mouse lives in the drawer with a PS/2 adapter, just in case.', meta:'peripheral · 2009'});
const mug = setInteractive(cyl('mug', .18,.3,[-1.78,2.08,-2.25], M('#bb5d4f', .7), desk, {segments:16}), {title:'Red mug', tag:'KEEPSAKE', copy:'A chipped red mug appears in every photo. It has held instant coffee, tea, and once a pocketful of dice.', meta:'present since 2007'});
cyl('mug-inner', .13,.012,[-1.78,2.235,-2.25], M('#25191b', .4), desk, {segments:16});
const cable = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(.6,2.03,-2.24),new THREE.Vector3(1.03,1.95,-2.4),new THREE.Vector3(1.28,1.87,-2.9)]), new THREE.LineBasicMaterial({color:'#1a1b20'})); desk.add(cable);

// PC towers: beige, mid-era and glass modern, all share the under-desk corner.
const towerOld = group('Old beige tower');
box('tower-body', [1.06,1.75,.95], [2.3,.86,-2.74], M('#b8ae98', .82), towerOld);
box('tower-face', [.86,1.5,.03], [2.3,.9,-3.23], M('#8f897b', .8), towerOld);
for(let y=.45;y<1.4;y+=.22) box('tower-slot', [.42,.035,.04], [2.3,y,-3.255], M('#303039', .65), towerOld);
const towerModern = group('Modern tower');
box('glass-tower', [1.2,2.15,1.02], [2.22,1.05,-2.78], M('#1b252d', .3, .25), towerModern);
box('glass-panel', [.03,1.72,.78], [1.59,1.1,-2.78], M('#3d5963', .15, .25), towerModern);
for(let y=.48;y<1.85;y+=.28) box('led-line', [.045,.04,.75], [1.565,y,-2.78], M('#66b0a0', .4, 0, '#2b9380', 1.7), towerModern);
const towerMid = group('Mid tower');
box('mid-tower', [1.15,1.95,.98], [2.25,1,-2.76], M('#293844', .7), towerMid);
box('mid-front', [.88,1.65,.03], [2.25,1.05,-3.27], M('#344b5a', .62), towerMid);
for(let y=.55;y<1.78;y+=.27) box('mid-slot', [.52,.025,.03], [2.25,y,-3.295], M('#6c8792', .5), towerMid);

// Console shelf with games that grow and age into a collection.
const shelf = group('Collection shelf');
for(let y=1.0;y<=3.2;y+=1.1) box('shelf-board', [2.0,.12,.54], [3.72,y,-3.7], M('#493c3a', .85), shelf);
box('shelf-side', [.1,2.7,.58], [2.78,2.1,-3.7], M('#382f32', .85), shelf); box('shelf-side', [.1,2.7,.58], [4.66,2.1,-3.7], M('#382f32', .85), shelf);
const gameColors=['#d46558','#6e8ab8','#d6a65e','#78a47b','#9f75ad','#cd7f8c','#688d9d'];
for(let i=0;i<7;i++){ const caseObj=box(`game-case-${i}`, [.18,.75,.4], [3.0+i*.24,1.42,-3.7], M(gameColors[i], .7), shelf); caseObj.rotation.y=(i%2?.03:-.03); }
for(let i=0;i<6;i++) box(`game-case-top-${i}`, [.19,.72,.4], [3.02+i*.27,2.52,-3.7], M(gameColors[(i+2)%gameColors.length], .7), shelf);
const consoleOld = setInteractive(box('console-old', [1.3,.2,.8], [3.7,3.45,-3.7], M('#d0c0a5', .65), shelf), {title:'The console stack', tag:'COLLECTION', copy:'The first console was bought used, then kept for the games that never got remastered. New boxes filled the shelf around it.', meta:'hardware · 2006—2025'});
for(let i=0;i<5;i++) box('late-case', [.19,.72,.4], [3.05+i*.26,3.62,-3.7], M(gameColors[(i+4)%gameColors.length], .7), shelf);

// Wall memories: corkboard, posters, polaroids, calendar.
const board = group('Memory board');
box('corkboard', [2.1,1.6,.1], [-2.85,2.8,-3.86], M('#8a5a43', .95), board);
for(const [x,y,r] of [[-3.45,3.2,.02],[-2.55,3.55,.04],[-2.18,2.65,.03],[-3.15,2.3,.03]]) cyl('pin', .04,.07,[x,y,-3.95], M(r>.03?'#d16d58':'#7190ae'), board, {rotation:[Math.PI/2,0,0]});
box('photo-a', [.64,.5,.02], [-3.47,3.16,-3.94], M('#d7c8b0', .7), board, {rotation:[0,.0,.08]}); box('photo-b', [.62,.58,.02], [-2.6,2.72,-3.95], M('#d7c8b0', .7), board, {rotation:[0,0,-.12]});
box('calendar', [.85,1.0,.04], [-1.42,3.05,-3.88], M('#d6ccb8', .75), board); for(let y=2.78;y<3.42;y+=.16) box('calendar-line',[.65,.018,.01],[-1.42,y,-3.92],M('#a58d79'),board,{cast:false});
setInteractive(board, {title:'The memory board', tag:'LIFE OUTSIDE THE SCREEN', copy:'Tournament wristbands, a first pay stub, and a photo from the room before it had a name. The board never moved; the paper did.', meta:'12 pinned fragments · updated yearly'});

// Lamp and plant soften the later room, while the lamp persists.
const lamp = group('Desk lamp');
box('lamp-stem', [.06,.9,.06], [-2.95,2.27,-2.74], mats.metal, lamp, {rotation:[0,0,-.35]}); sphere('lamp-joint', .1,[-2.8,2.72,-2.74],mats.metal,lamp); cyl('lamp-shade', .3,.35,[-2.65,2.9,-2.74], M('#c58a56', .65), lamp, {segments:24});
const lampLight = new THREE.PointLight('#ffb66d', 1.9, 4, 2); lampLight.position.set(-2.65,2.65,-2.7); lamp.add(lampLight);
setInteractive(lamp, {title:'The orange lamp', tag:'SAME LIGHT, DIFFERENT ROOM', copy:'Its shade is still bent from the night the PC overheated. Warm light made every version of the room feel like home.', meta:'practical light · always on'});
const plant = group('Plant');
cyl('pot', .27,.35,[4.35,1.2,-2.95], M('#b7664e', .8), plant); for(let i=0;i<7;i++){ const leaf=sphere('leaf',.22,[4.18+(i%3)*.16,1.63+(i%2)*.14,-2.95+(i%2)*.12],M('#47745b',.9),plant,{w:12,h:8}); leaf.scale.set(.6,1.5,.25); leaf.rotation.z=(i-3)*.2; }

// A small box of retired hardware in the corner makes continuity visible.
const archive = group('Retired hardware');
box('archive-box', [1.25,.78,1.0], [-3.88,.42,-2.95], M('#6e5748', .95), archive);
box('archive-label', [.65,.3,.02], [-3.88,.49,-3.46], M('#d0ba92', .8), archive); box('archive-label-line', [.46,.025,.01], [-3.88,.49,-3.475], M('#5b453a'), archive);
setInteractive(archive, {title:'Retired, not gone', tag:'THE CORNER', copy:'A beige tower, a stack of cables, and the first controller live here. Retirement is just another form of keeping.', meta:'stored 2009 · still plugged in'});

// Era-specific décor layers: changes are staged at plausible years.
const eraEarly = group('Early décor');
box('early-poster', [1.25,1.35,.03], [1.55,3.0,-3.9], M('#6b8b9b', .75), eraEarly); box('early-poster-inner',[1.05,1.05,.02],[1.55,3.0,-3.925],M('#c8a25e',.8),eraEarly);
const eraMid = group('Mid décor');
box('mid-poster', [1.35,1.55,.03], [1.55,2.9,-3.9], M('#30496a', .75), eraMid); box('mid-poster-strip',[1.1,.16,.02],[1.55,3.35,-3.93],M('#55b8a7',.7),eraMid); box('mid-poster-strip',[.8,.12,.02],[1.55,2.6,-3.93],M('#d3af61',.7),eraMid);
const eraLate = group('Late décor');
box('late-poster', [1.45,1.55,.03], [1.55,2.9,-3.9], M('#1b2634', .72), eraLate); box('late-poster-glow',[1.2,.08,.02],[1.55,3.45,-3.93],M('#e2835f',.5,0,'#c84f3a',1.2),eraLate); box('late-poster-glow',[.8,.06,.02],[1.55,2.45,-3.93],M('#6cc0b1',.5,0,'#4b998c',1.2),eraLate);

function updateEra(year) {
  const y = Number(year); const earlyT = THREE.MathUtils.clamp((y-2008)/3,0,1); const lateT = THREE.MathUtils.clamp((y-2016)/4,0,1);
  setVisible(crt, y < 2012, 1 - earlyT*.03); setVisible(monitor, y >= 2009, .86 + Math.min(1,earlyT)*.14);
  setVisible(towerOld, y < 2011, 1); setVisible(towerMid, y >= 2010 && y < 2018, 1); setVisible(towerModern, y >= 2016, 1);
  setVisible(eraEarly, y < 2011, 1); setVisible(eraMid, y >= 2010 && y < 2018, 1); setVisible(eraLate, y >= 2016, 1);
  chair.rotation.y = THREE.MathUtils.lerp(-.05,.12,lateT);
  desk.scale.y = 1;
  practical.intensity = THREE.MathUtils.lerp(.3,1.8,lateT);
  lampLight.intensity = THREE.MathUtils.lerp(2.4,1.25,lateT);
  // The late room gains a subtle teal fill without becoming a showroom.
  windowGlow.color.set(y < 2012 ? '#ffd3a2' : y < 2018 ? '#a8c4b5' : '#8ea9dd');
  drawScreen(y, screenMode);
  yearLabel.textContent = String(Math.round(y));
  timeline.style.setProperty('--progress', `${((y-2005)/20)*100}%`);
}
let screenMode = 0;
let isPlaying = false;
let lastTime = 0;

function openInfo(data) { infoTag.textContent=data.tag || 'KEEPSAKE'; infoTitle.textContent=data.title || 'A small story'; infoCopy.textContent=data.copy || ''; infoMeta.textContent=data.meta || ''; infoPanel.classList.add('open'); }
closeInfo.addEventListener('click',()=>infoPanel.classList.remove('open'));
playBtn.addEventListener('click',()=>{ isPlaying=!isPlaying; playBtn.classList.toggle('active',isPlaying); playBtn.innerHTML=isPlaying?'Ⅱ <span>Pause</span>':'▶ <span>Play</span>'; if(isPlaying) lastTime=performance.now(); });
timeline.addEventListener('input',(e)=>{ isPlaying=false; playBtn.classList.remove('active'); playBtn.innerHTML='▶ <span>Play</span>'; updateEra(Number(e.target.value)); });

const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2();
function hitTest(event) { const rect=canvas.getBoundingClientRect(); pointer.x=((event.clientX-rect.left)/rect.width)*2-1; pointer.y=-((event.clientY-rect.top)/rect.height)*2+1; raycaster.setFromCamera(pointer,camera); const hits=raycaster.intersectObjects(root.children,true); const hit=hits.find(h=>h.object.userData.interactive || h.object.parent?.userData.interactive); if(!hit) return; const obj=hit.object.userData.interactive ? hit.object : hit.object.parent; if(obj.userData.type==='screen'){screenMode++; drawScreen(Number(timeline.value),screenMode); screenTip.classList.add('visible'); setTimeout(()=>screenTip.classList.remove('visible'),1400); openInfo(obj.userData);} else openInfo(obj.userData); }
canvas.addEventListener('pointerup',(e)=>{ if(Math.abs(e.clientX-(canvas._downX||e.clientX))<4 && Math.abs(e.clientY-(canvas._downY||e.clientY))<4) hitTest(e); });
canvas.addEventListener('pointerdown',(e)=>{canvas._downX=e.clientX;canvas._downY=e.clientY;});

updateEra(2005);
function animate(time=0) { requestAnimationFrame(animate); if(isPlaying){ const elapsed=(time-lastTime)/1000; lastTime=time; const next=Number(timeline.value)+elapsed*1.5; if(next>=2025){timeline.value=2025;updateEra(2025);isPlaying=false;playBtn.classList.remove('active');playBtn.innerHTML='▶ <span>Play</span>';} else {timeline.value=next;updateEra(next);} } controls.update(); renderer.render(scene,camera); }
animate();
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));});
