import * as THREE from '../vendor/three/three.module.js';
import { OrbitControls } from '../vendor/three/OrbitControls.js';
import { QUALITY, PARAMETERS } from './state.js';
import { vertex, rayFragment, bloomFragment, compositeFragment } from './shaders.js';

export class Raytracer {
  constructor(canvas,store,onStatus) {
    this.canvas=canvas;this.store=store;this.onStatus=onStatus;
    this.ready=false;this.disposed=false;this.lost=false;this.dirty=true;this.fps=0;
    this.camera=new THREE.PerspectiveCamera();
    this.controls=new OrbitControls(this.camera,canvas);
    this.controls.enablePan=false;this.controls.enableDamping=false;
    this.controls.minDistance=12;this.controls.maxDistance=60;
    this.controls.minPolarAngle=THREE.MathUtils.degToRad(5);this.controls.maxPolarAngle=THREE.MathUtils.degToRad(175);
    this.controls.rotateSpeed=.6;
    this.controls.addEventListener('start',()=>{this.store.update({playing:false});});
    this.controls.addEventListener('change',()=>{
      if(this.applying)return;
      const p=this.camera.position,s=this.store.get();
      const distance=p.length();
      s.params={...s.params,distance,azimuth:((Math.atan2(p.x,p.z)*180/Math.PI)%360+360)%360,elevation:Math.asin(p.y/distance)*180/Math.PI};
      this.dirty=true;
    });
    this.controls.addEventListener('end',()=>this.store.update({params:{...this.store.get().params}}));
    this.unsubscribe=store.subscribe(()=>{this.syncCamera();this.dirty=true;this.setReady(false);});
    this.onResize=()=>{this.resize();this.dirty=true;this.setReady(false);};
    this.onLost=e=>{e.preventDefault();this.lost=true;this.setReady(false);cancelAnimationFrame(this.raf);onStatus('lost');};
    this.onRestored=()=>{this.lost=false;this.releaseGPU();this.build().catch(e=>this.fail(e));};
    canvas.addEventListener('webglcontextlost',this.onLost);
    canvas.addEventListener('webglcontextrestored',this.onRestored);
    window.addEventListener('resize',this.onResize);
    this.syncCamera();
    this.build().catch(e=>this.fail(e));
  }
  setReady(v){this.ready=v;document.documentElement.dataset.gargantuaReady=String(v);}
  fail(error){this.setReady(false);this.onStatus('error',String(error.message||error));console.error(error);}
  syncCamera(){
    const p=this.store.get().params;
    const az=THREE.MathUtils.degToRad(p.azimuth),el=THREE.MathUtils.degToRad(p.elevation);
    this.applying=true;
    this.camera.position.set(Math.sin(az)*Math.cos(el),Math.sin(el),Math.cos(az)*Math.cos(el)).multiplyScalar(p.distance);
    this.camera.fov=p.fov;this.camera.lookAt(0,0,0);this.camera.updateMatrixWorld();this.controls.update();
    this.applying=false;
  }
  async build(){
    this.onStatus('compiling');this.shaderFailure=null;
    this.renderer=new THREE.WebGLRenderer({canvas:this.canvas,antialias:false,alpha:false,powerPreference:'high-performance'});
    this.renderer.outputColorSpace=THREE.LinearSRGBColorSpace;
    this.renderer.toneMapping=THREE.NoToneMapping;
    this.renderer.debug.onShaderError=(gl,program,vs,fs)=>{this.shaderFailure=[gl.getProgramInfoLog(program),gl.getShaderInfoLog(vs),gl.getShaderInfoLog(fs)].join('\n');};
    if(!this.renderer.extensions.has('EXT_color_buffer_float'))throw new Error('This device needs WebGL2 floating-point render targets. Please enable hardware acceleration.');
    this.geometry=new THREE.BufferGeometry();
    this.geometry.setAttribute('position',new THREE.Float32BufferAttribute([-1,-1,0,3,-1,0,-1,3,0],3));
    const uniforms={resolution:{value:new THREE.Vector2()},cameraOrigin:{value:new THREE.Vector3()},cameraBasis:{value:new THREE.Matrix3()},aspect:{value:1},simTime:{value:0},maxSteps:{value:360},maxCrossings:{value:5},debugMode:{value:0},angularStep:{value:.035}};
    for(const [key] of PARAMETERS)uniforms[key]={value:0};
    this.ray=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:rayFragment,uniforms,depthTest:false,depthWrite:false});
    this.blur=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:bloomFragment,uniforms:{inputTexture:{value:null},texel:{value:new THREE.Vector2()},threshold:{value:1},extract:{value:true}},depthTest:false,depthWrite:false});
    const postUniforms={sceneTexture:{value:null},debugMode:{value:0},simTime:{value:0}};
    for(const k of ['bloom0','bloom1','bloom2','bloom3','bloom4'])postUniforms[k]={value:null};
    for(const k of ['bloom','exposure','vignette','grain','dispersion'])postUniforms[k]={value:0};
    this.post=new THREE.ShaderMaterial({vertexShader:vertex,fragmentShader:compositeFragment,uniforms:postUniforms,depthTest:false,depthWrite:false});
    this.scene=new THREE.Scene();this.quad=new THREE.Mesh(this.geometry,this.ray);this.quad.frustumCulled=false;this.scene.add(this.quad);
    this.screenCamera=new THREE.Camera();
    this.resize();
    for(const material of [this.ray,this.blur,this.post]){this.quad.material=material;await this.renderer.compileAsync(this.scene,this.screenCamera);}
    if(this.disposed||this.lost)return;
    if(this.shaderFailure)throw new Error(this.shaderFailure);
    this.last=performance.now();this.dirty=true;this.tick(this.last);
  }
  resize(){
    if(!this.renderer || this.lost)return;
    const width=this.canvas.clientWidth,height=this.canvas.clientHeight;
    const quality=this.store.get().quality,q=QUALITY[quality];
    const dpr=Math.min(devicePixelRatio||1,q.dpr)*q.scale;
    this.renderer.setPixelRatio(dpr);this.renderer.setSize(width,height,false);
    this.width=Math.max(1,Math.floor(width*dpr));this.height=Math.max(1,Math.floor(height*dpr));
    this.currentQuality=quality;
    this.target?.dispose();this.bloomTargets?.forEach(t=>t.dispose());
    const options={type:THREE.HalfFloatType,format:THREE.RGBAFormat,depthBuffer:false,stencilBuffer:false,minFilter:THREE.LinearFilter,magFilter:THREE.LinearFilter};
    this.target=new THREE.WebGLRenderTarget(this.width,this.height,options);
    this.bloomTargets=Array.from({length:q.bloomLevels},(_,i)=>new THREE.WebGLRenderTarget(Math.max(1,this.width>>i+1),Math.max(1,this.height>>i+1),options));
  }
  draw(material,target){this.quad.material=material;this.renderer.setRenderTarget(target);this.renderer.render(this.scene,this.screenCamera);}
  render(){
    const s=this.store.get(),p=s.params,q=QUALITY[s.quality];
    if(this.currentQuality!==s.quality)this.resize();
    const u=this.ray.uniforms;
    for(const [key]of PARAMETERS)u[key].value=p[key];
    // Preserve horizontal framing on portrait displays without changing stored FOV.
    const aspect=this.canvas.clientWidth/this.canvas.clientHeight;
    u.fov.value=aspect<1?THREE.MathUtils.radToDeg(2*Math.atan(Math.tan(THREE.MathUtils.degToRad(p.fov)/2)*1.6/aspect)):p.fov;
    this.camera.updateMatrixWorld();u.cameraOrigin.value.copy(this.camera.position);u.cameraBasis.value.setFromMatrix4(this.camera.matrixWorld);
    u.aspect.value=aspect;u.resolution.value.set(this.width,this.height);u.simTime.value=s.time%65536;
    u.maxSteps.value=q.steps;u.maxCrossings.value=q.crossings;u.angularStep.value=q.step;u.debugMode.value=s.debug;
    this.draw(this.ray,this.target);
    let source=this.target;
    if(s.debug===0){
      for(let i=0;i<this.bloomTargets.length;i++){
        const bu=this.blur.uniforms;bu.inputTexture.value=source.texture;bu.texel.value.set(1/source.width,1/source.height);bu.extract.value=i===0;bu.threshold.value=p.bloomThreshold;
        this.draw(this.blur,this.bloomTargets[i]);source=this.bloomTargets[i];
      }
    }
    const pu=this.post.uniforms;pu.sceneTexture.value=this.target.texture;pu.debugMode.value=s.debug;pu.simTime.value=s.time%65536;
    for(let i=0;i<5;i++)pu['bloom'+i].value=this.bloomTargets[Math.min(i,this.bloomTargets.length-1)].texture;
    for(const k of ['bloom','exposure','vignette','grain','dispersion'])pu[k].value=p[k];
    this.draw(this.post,null);
    if(this.shaderFailure)throw new Error(this.shaderFailure);
    if(!this.ready){this.setReady(true);this.onStatus('ready');}
  }
  tick(now){
    if(this.disposed||this.lost)return;
    const elapsed=(now-this.last)/1000,delta=Math.min(elapsed,.1);this.last=now;
    const s=this.store.get();
    if(!s.capture){
      s.time+=delta*s.params.timeScale;
      if(s.playing){s.params={...s.params,azimuth:(s.params.azimuth+delta*2.2)%360,elevation:8+5*Math.sin(s.time*.07)};this.syncCamera();}
      if(elapsed>0)this.fps=this.fps*.94+(1/elapsed)*.06;
    }
    try{if(this.dirty||!s.capture){this.render();this.dirty=false;}}catch(e){this.fail(e);return;}
    this.raf=requestAnimationFrame(t=>this.tick(t));
  }
  diagnostics(){return {width:this.width,height:this.height,devicePixelRatio:devicePixelRatio||1,fps:Math.round(this.fps),budget:QUALITY[this.store.get().quality],contextLost:this.lost};}
  releaseGPU(){this.target?.dispose();this.bloomTargets?.forEach(t=>t.dispose());for(const o of [this.ray,this.blur,this.post,this.geometry])o?.dispose();this.renderer?.dispose();}
  dispose(){this.disposed=true;cancelAnimationFrame(this.raf);this.unsubscribe();this.controls.dispose();window.removeEventListener('resize',this.onResize);this.canvas.removeEventListener('webglcontextlost',this.onLost);this.canvas.removeEventListener('webglcontextrestored',this.onRestored);this.releaseGPU();}
}
